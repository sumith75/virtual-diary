import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { auth, db } from "../firebase/config";
import { decryptText, encryptText } from "../util/crypto";

import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default function Memories() {

  const [journals, setJournals] = useState([]);
  const [selected, setSelected] = useState(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [mood, setMood] = useState("");

  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [activeMood, setActiveMood] = useState("");
  const [loading, setLoading] = useState(true);

  /* ---------------- DATE FORMAT ---------------- */
  const formatDate = (d) => {
    if (!d) return "";
    return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth()+1)
      .toString().padStart(2,"0")}/${d.getFullYear()}`;
  };

  /* ---------------- MOOD EMOJI ---------------- */
  const emoji = (m) => {
    const v = m || "calm";
    return v === "happy" ? "😊" :
           v === "sad" ? "😔" :
           v === "angry" ? "😡" :
           v === "calm" ? "😌" :
           v === "tired" ? "😴" :
           v === "excited" ? "🤩" : "";
  };

  /* ---------------- FETCH ---------------- */
  const fetchJournals = async () => {
    try {
      const q = query(
        collection(db, "journals"),
        where("uid", "==", auth.currentUser.uid),
        orderBy("createdAt", "desc")
      );

      const snap = await getDocs(q);

      const data = snap.docs.map(d => ({
        id: d.id,
        ...d.data()
      }));

      setJournals(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  /* ---------------- OPEN ---------------- */
  const openJournal = (j) => {
    setSelected(j);
    setTitle(j.title);
    setContent(decryptText(j.content));
    setTags(j.tags || []);
    setFavorite(j.favorite || false);
    setMood(j.mood || "calm");
  };

  /* ---------------- UPDATE ---------------- */
  const handleUpdate = async () => {
    await updateDoc(doc(db, "journals", selected.id), {
      title,
      content: encryptText(content),
      tags,
      favorite,
      mood,
    });

    alert("Updated!");
    fetchJournals();
    setSelected(null);
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async () => {
    if (!confirm("Delete this memory?")) return;

    await deleteDoc(doc(db, "journals", selected.id));
    setSelected(null);
    fetchJournals();
  };

  /* ---------------- FAVORITE ---------------- */
  const toggleFavorite = async () => {
    const v = !favorite;
    setFavorite(v);
    await updateDoc(doc(db, "journals", selected.id), { favorite: v });
    fetchJournals();
  };

  /* ---------------- FILTER ---------------- */
  const filtered = journals.filter(j => {

    const d = j.createdAt?.toDate();
    const dateStr = d ? formatDate(d) : "";

    const matchesSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      decryptText(j.content).toLowerCase().includes(search.toLowerCase()) ||
      dateStr.includes(search);

    const matchesTag =
      !activeTag || (j.tags || []).includes(activeTag);

    const matchesMood =
      !activeMood || j.mood === activeMood;

    return matchesSearch && matchesTag && matchesMood;
  });

  const favorites = filtered.filter(j => j.favorite);
  const normals = filtered.filter(j => !j.favorite);
  const allTags = [...new Set(journals.flatMap(j => j.tags || []))];
  const moods = ["happy","sad","angry","calm","tired","excited"];

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">

      <Navbar />

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 p-10">

        {/* LEFT PANEL */}
        <div>

          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Memories
          </h2>

          <input
            value={search}
            onChange={e=>setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full mb-3 p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />

          {/* MOOD FILTER */}
          <div className="flex flex-wrap gap-2 mb-3">
            {moods.map(m=>(
              <button
                key={m}
                onClick={()=>setActiveMood(m)}
                className={`px-3 py-1 rounded text-sm
                  ${activeMood===m
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-200"
                  }`}
              >
                {emoji(m)} {m}
              </button>
            ))}

            <button
              onClick={()=>setActiveMood("")}
              className="px-3 py-1 rounded bg-red-400 text-white text-sm"
            >
              Clear
            </button>
          </div>

          {/* TAG FILTER */}
          <div className="flex flex-wrap gap-2 mb-4">

            <button
              onClick={()=>setActiveTag("")}
              className={`px-3 py-1 rounded text-sm
                ${activeTag===""
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-200"
                }`}
            >
              All
            </button>

            {allTags.map(t=>(
              <button
                key={t}
                onClick={()=>setActiveTag(t)}
                className={`px-3 py-1 rounded text-sm
                  ${activeTag===t
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-200"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>

          {loading && <p>Loading...</p>}

          {favorites.map(j=>renderItem(j))}
          {normals.map(j=>renderItem(j))}

        </div>

        {/* RIGHT PANEL */}
        <div className="md:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

          {!selected && (
            <p className="text-gray-500">
              Select a memory
            </p>
          )}

          {selected && (
            <>
              <div className="flex justify-between mb-3">

                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {emoji(mood)} {title}
                </h1>

                <button onClick={toggleFavorite}>
                  {favorite ? "⭐" : "☆"}
                </button>

              </div>

              <textarea
                value={content}
                onChange={e=>setContent(e.target.value)}
                rows={12}
                className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              />

              <input
                value={tags.join(",")}
                onChange={e=>setTags(e.target.value.split(","))}
                className="w-full mt-3 p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              />

              <div className="flex gap-4 mt-4">

                <button
                  onClick={handleUpdate}
                  className="px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded"
                >
                  Save
                </button>

                <button
                  onClick={handleDelete}
                  className="px-6 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>

              </div>
            </>
          )}

        </div>

      </div>

      <Footer />

    </div>
  );

  /* ---------------- ITEM RENDER ---------------- */
  function renderItem(j) {

    const d = j.createdAt?.toDate();

    return (
      <div
        key={j.id}
        onClick={()=>openJournal(j)}
        className="bg-white dark:bg-gray-800 p-4 mb-3 rounded shadow cursor-pointer"
      >
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {emoji(j.mood)} {j.title}
        </h3>

        <p className="text-xs text-gray-500">
          {formatDate(d)}
        </p>
      </div>
    );
  }
}

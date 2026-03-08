import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { encryptText } from "../util/crypto";

import { auth, db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Write() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [mood, setMood] = useState("");
  const [saving, setSaving] = useState(false);

  const moods = [
    { label: "Happy", emoji: "😊" },
    { label: "Sad", emoji: "😔" },
    { label: "Angry", emoji: "😡" },
    { label: "Calm", emoji: "😌" },
    { label: "Tired", emoji: "😴" },
    { label: "Excited", emoji: "🤩" },
  ];

  const handleSave = async () => {

    if (!title || !content || !mood) {
      alert("Title, Content and Mood are required");
      return;
    }

    const tags = tagsInput
      .split(",")
      .map(t => t.trim())
      .filter(t => t !== "");

    setSaving(true);

    try {
      await addDoc(collection(db, "journals"), {
        uid: auth.currentUser.uid,
        title,
        content: encryptText(content),
        tags,
        mood,
        favorite: false,
        createdAt: serverTimestamp(),
      });

      setTitle("");
      setContent("");
      setTagsInput("");
      setMood("");

      alert("Journal saved!");

    } catch (err) {
      console.error(err);
      alert("Failed to save journal");
    }

    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">

      <Navbar />

      <div className="flex-1 p-10 max-w-4xl mx-auto w-full">

        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Write Today’s Journal
        </h1>

        {/* TITLE */}
        <input
          placeholder="Title (Mandatory)"
          className="
            w-full mb-4 p-3 rounded-lg
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-white
            outline-none
          "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* MOOD */}
        <p className="mb-2 text-gray-700 dark:text-gray-300">
          How are you feeling?
        </p>

        <div className="flex gap-3 mb-4 flex-wrap">

          {moods.map(m => (
            <button
              key={m.label}
              onClick={() => setMood(m.label.toLowerCase())}
              className={`
                px-4 py-2 rounded-lg border
                transition
                ${mood === m.label.toLowerCase()
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
                }
              `}
            >
              {m.emoji} {m.label}
            </button>
          ))}

        </div>

        {/* TAGS */}
        <input
          placeholder="Tags (comma separated e.g. happy, college)"
          className="
            w-full mb-4 p-3 rounded-lg
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-white
            outline-none
          "
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
        />

        {/* CONTENT */}
        <textarea
          placeholder="Start writing..."
          rows={12}
          className="
            w-full p-4 rounded-lg
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-white
            resize-none outline-none
          "
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* SAVE */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="
            mt-6 px-6 py-3 rounded-lg
            bg-black text-white
            dark:bg-white dark:text-black
            hover:opacity-80
          "
        >
          {saving ? "Saving..." : "Save Entry"}
        </button>

      </div>

      <Footer />

    </div>
  );
}

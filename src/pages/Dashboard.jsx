import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { auth, db } from "../firebase/config";
import useRandomQuote from "../hooks/useRandomQuote";
import { useNavigate } from "react-router-dom";
import { uploadProfileImage } from "../util/cloudinary";
import TodoWidget from "../components/TodoWidget";

import { doc, setDoc, getDoc } from "firebase/firestore";

export default function Dashboard() {

  const { quote, loading } = useRandomQuote();
  const navigate = useNavigate();

  const [photoURL, setPhotoURL] = useState("");

  /* LOAD PROFILE IMAGE */

  useEffect(() => {

    const loadProfile = async () => {

      const ref = doc(db, "users", auth.currentUser.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setPhotoURL(snap.data().photoURL || "");
      }

    };

    loadProfile();

  }, []);

  /* UPLOAD IMAGE */

  const handleUpload = async (e) => {

    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = await uploadProfileImage(file);

    await setDoc(
      doc(db, "users", auth.currentUser.uid),
      { photoURL: imageUrl },
      { merge: true }
    );

    setPhotoURL(imageUrl);
  };

  /* DELETE IMAGE */

  const handleDelete = async () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your profile photo?"
    );

    if (!confirmDelete) return;

    await setDoc(
      doc(db, "users", auth.currentUser.uid),
      { photoURL: "" },
      { merge: true }
    );

    setPhotoURL("");
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 flex flex-col">

      <Navbar />

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 p-12">

        {/* LEFT SIDE */}

        <div className="flex flex-col items-center justify-center gap-6">

          {/* PROFILE IMAGE */}

          <div className="relative">

            <div
              className="
                w-48 h-48 md:w-56 md:h-56
                rounded-full
                bg-gray-300 dark:bg-gray-700
                overflow-hidden
                flex items-center justify-center
              "
            >

              {photoURL ? (
                <img
                  src={photoURL}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-600 dark:text-gray-300 text-center px-6">
                  Add your profile photo
                </span>
              )}

            </div>

            <label
              className="
                absolute bottom-2 right-2
                bg-black text-white
                text-xs px-3 py-1
                rounded cursor-pointer
              "
            >
              Edit
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleUpload}
              />
            </label>

          </div>

          {photoURL && (
            <button
              onClick={handleDelete}
              className="text-sm text-red-500"
            >
              Delete Photo
            </button>
          )}

          {/* WELCOME */}

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center">
            Welcome, {auth.currentUser?.displayName} ✨
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-center max-w-md">
            Your personal space to reflect, write, and remember.
          </p>

          {/* QUOTE */}

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow max-w-md text-center">

            {loading ? (
              <p className="text-gray-400 italic">
                Loading today's quote...
              </p>
            ) : (
              <>
                <p className="text-lg italic text-gray-700 dark:text-gray-200">
                  “{quote.content}”
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                  — {quote.author}
                </p>
              </>
            )}

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="flex flex-col gap-6">

          {/* WRITE JOURNAL */}

          <div
            onClick={() => navigate("/write")}
            className="
              bg-white dark:bg-gray-800
              p-8 rounded-xl shadow
              cursor-pointer
              hover:shadow-lg transition
            "
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              📝 Write Today's Journal
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Capture your thoughts and feelings
            </p>
          </div>

          {/* MEMORIES */}

          <div
            onClick={() => navigate("/memories")}
            className="
              bg-white dark:bg-gray-800
              p-8 rounded-xl shadow
              cursor-pointer
              hover:shadow-lg transition
            "
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              📚 Old Memories
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Revisit your past entries
            </p>
          </div>

          {/* TODO WIDGET */}

          <TodoWidget />

        </div>

      </div>

      <Footer />

    </div>
  );
}
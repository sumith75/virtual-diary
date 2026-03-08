import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import useTheme from "../hooks/useTheme";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Navbar() {

  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsub();
  }, []);

  return (
    <nav
      className="
        w-full px-8 py-4
        flex items-center justify-between
       bg-gray-50 dark:bg-gray-900

        border-b border-gray-200 dark:border-gray-700
      "
    >
      {/* BRAND */}
      <h1 className="text-2xl font-bold tracking-wide font-serif text-black dark:text-white">
        📖 Virtual Diary
      </h1>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

       

        {/* USER NAME */}
        {user && (
          <span className="text-sm text-black dark:text-white">
            {user.displayName}
          </span>
        )}
         {/* THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          className="
            px-3 py-2 rounded-lg
            border border-gray-300 dark:border-gray-600
            text-black dark:text-white
          "
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {/* LOGOUT ONLY IF LOGGED IN */}
        {user && (
          <button
            onClick={() => signOut(auth)}
            className="
              px-4 py-2 rounded-lg
              bg-black text-white
              dark:bg-white dark:text-black
              hover:opacity-80
              transition
              text-sm
            "
          >
            Logout
          </button>
        )}

      </div>
    </nav>
  );
}

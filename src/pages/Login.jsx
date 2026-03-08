import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase/config";

export default function Login() {

  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    try {
      if (isSignup) {
        const res = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await updateProfile(res.user, {
          displayName: name,
        });

      } else {
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      // ✅ GO TO DASHBOARD AFTER SUCCESS
      navigate("/dashboard");

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">

      <Navbar />

      {/* CENTER */}
      <div className="flex-1 flex flex-col items-center justify-center">

        <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
          Welcome to Virtual Diary
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-10">
          A quiet place for your thoughts, feelings, and memories.
        </p>

        {/* AUTH CARD */}
        <div
          className="
            bg-white dark:bg-gray-800
            p-10
            rounded-xl
            shadow
            w-full max-w-md
          "
        >

          <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-6">
            {isSignup
              ? "New here? Create an account"
              : "Already have an account? Login"}
          </p>

          {/* TOGGLE */}
          <div className="flex gap-4 mb-8">

            <button
              onClick={() => setIsSignup(false)}
              className={`
                flex-1 py-2 rounded-lg
                ${!isSignup
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"}
              `}
            >
              Login
            </button>

            <button
              onClick={() => setIsSignup(true)}
              className={`
                flex-1 py-2 rounded-lg
                ${isSignup
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"}
              `}
            >
              Sign Up
            </button>

          </div>

          {/* NAME */}
          {isSignup && (
            <input
              type="text"
              placeholder="Full Name"
              className="
                w-full mb-4 p-3 rounded-lg
                bg-gray-100 dark:bg-gray-700
                text-gray-900 dark:text-white
                outline-none
              "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className="
              w-full mb-4 p-3 rounded-lg
              bg-gray-100 dark:bg-gray-700
              text-gray-900 dark:text-white
              outline-none
            "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            className="
              w-full mb-4 p-3 rounded-lg
              bg-gray-100 dark:bg-gray-700
              text-gray-900 dark:text-white
              outline-none
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm mb-4">
              {error}
            </p>
          )}

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            className="
              w-full py-3 rounded-lg
              bg-black text-white
              dark:bg-white dark:text-black
              hover:opacity-80
            "
          >
            {isSignup ? "Create Account" : "Login"}
          </button>

        </div>

      </div>

      <Footer />
    </div>
  );
}

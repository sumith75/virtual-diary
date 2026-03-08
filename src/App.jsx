import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase/config";
import Write from "./pages/Write";
import Memories from "./pages/Memories";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";




export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/write"
  element={
    <ProtectedRoute user={user}>
      <Write />
    </ProtectedRoute>
  }
/>

<Route
  path="/memories"
  element={
    <ProtectedRoute user={user}>
      <Memories />
    </ProtectedRoute>
  }
/>


        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

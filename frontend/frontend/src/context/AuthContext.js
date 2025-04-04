import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

// ✅ Create AuthContext
const AuthContext = createContext();

// ✅ AuthProvider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);

      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error.message);
        setUser(null);
      } else {
        setUser(data?.session?.user || null);
      }

      setLoading(false);
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth State Changed:", session);
      setUser(session?.user || null);
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  // ✅ Sign in with Email & Password
  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return error.message;
    return null;
  };

  // ✅ Sign in with Google
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) console.error("Google Sign-In Error:", error.message);
  };

  // ✅ Sign in with GitHub
  const signInWithGitHub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (error) console.error("GitHub Sign-In Error:", error.message);
  };

  // ✅ Forgot Password (Reset)
  const resetPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) return error.message;
    return null;
  };

  // ✅ Sign out
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signInWithGoogle, signInWithGitHub, resetPassword, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Custom Hook
export function useAuth() {
  return useContext(AuthContext);
}

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function ProtectedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) navigate("/login"); // Redirect if not logged in
    };
    checkUser();
  }, []);

  return <h1>Welcome to the protected page!</h1>;
}

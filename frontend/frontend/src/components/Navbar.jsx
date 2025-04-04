import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ setShowSignIn, setShowSignUp, triggerResumeUpload }) {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [avatarError, setAvatarError] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const email = user.email;
        const firstName = user.user_metadata?.firstName || "User";
        const lastName = user.user_metadata?.lastName || "";
        const supabaseAvatar = user.user_metadata?.avatar_url || null;
        const gmailAvatar = `https://lh3.googleusercontent.com/a-/AOh14Gg${email} `; // check
        console.warn(supabaseAvatar, " : ",gmailAvatar);
        // Test if Gmail profile pic loads, otherwise use Supabase avatar
        checkImageExists(gmailAvatar)
          .then(() => setUser({ email, firstName, lastName, avatar: gmailAvatar }))
          .catch(() => {
            if (supabaseAvatar) {
              setUser({ email, firstName, lastName, avatar: supabaseAvatar });
            } else {
              setUser({ email, firstName, lastName, avatar: supabaseAvatar });
              // setUser({ email, firstName, lastName, avatar: getPlaceholderAvatar(email) });
            }
          });
      }
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        fetchUser();
      } else {
        setUser(null);
      }
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

  const handleDashboardClick = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      navigate("/dashboard");
    } else {
      setShowSignIn(true);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Resume uploaded:", file.name);
      triggerResumeUpload(file);
    }
  };

  const getPlaceholderAvatar = (email) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&background=random`;
  };

  const checkImageExists = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => reject(false);
    });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-30 bg-blue-600 p-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/"> 
          <img src="/SpeaQ.png" alt="SpeaQ Logo" className="h-10 ml-[-20px]" />
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6 items-center">
          <li>
            <Link to="/" className="text-white hover:text-gray-300 ">Home</Link>
          </li>

          {/* Dashboard Button */}
          <li>
            <button
              onClick={handleDashboardClick}
              className="text-white  hover:text-gray-300"
            >
              Dashboard
            </button>
          </li>

          {/* Conditional Rendering for Authenticated User */}
          {user ? (
            <div className="relative">
              <img
                src={ user.avatar}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
                loading="lazy"
                onError={() => setAvatarError(true)}
                onClick={() => setShowDropdown((prev) => !prev)}
              />
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2">
                  <p className="text-center font-semibold text-gray-700">
                    {user.firstName} {user.lastName}
                  </p>

                  <button 
                    className="w-full text-left px-2 py-2 text-blue-600 hover:bg-gray-100 rounded"
                    onClick={handleUploadClick} 
                  >
                    Upload Resume
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // This button ONLY appears if the user is NOT logged in
            <li>
              <button
                onClick={() => setShowSignIn(true)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Sign In
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx"
      />
    </nav>
  );
}

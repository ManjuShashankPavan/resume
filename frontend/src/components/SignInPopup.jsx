import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignInPopup = ({ setShowSignIn, setShowSignUp }) => {
  const { signIn, signInWithGoogle, signInWithGitHub, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    if (!email) {
      setError("Email is required!");
      setLoading(false);
      return;
    }

    if (resetMode) {
      try {
        await resetPassword(email);
        setSuccessMessage("✅ Password reset link sent to your email.");
        setEmail("");
      } catch (errorMessage) {
        setError(errorMessage);
      }
      setLoading(false);
      return;
    }

    const errorMessage = await signIn(email, password);
    if (errorMessage) {
      setError(errorMessage);
    } else {
      setShowSignIn(false);
      navigate("/dashboard");
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    const errorMessage = await signInWithGoogle();
    if (errorMessage) setError(errorMessage);
    setLoading(false);
  };

  const handleGitHubSignIn = async () => {
    setLoading(true);
    setError("");
    const errorMessage = await signInWithGitHub();
    if (errorMessage) setError(errorMessage);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={() => setShowSignIn(false)}
          className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 text-lg"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center">
          {resetMode ? "Reset Password" : "Sign In"}
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

        <form onSubmit={handleSignIn} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          {!resetMode && (
            <div className="mb-2">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            
          )}
          <p className=" mb-2 text-center">
          {resetMode ? (
            <span
              onClick={() => setResetMode(false)}
              className="text-blue-600 cursor-pointer "
            >
              Back to Sign In
            </span>
          ) : (
            <>
              Forgot password?{" "}
              <span
                onClick={() => {
                  setResetMode(true);
                  setError("");
                  setSuccessMessage("");
                }}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Reset here
              </span>
            </>
          )}
        </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? "Processing..." : resetMode ? "Send Reset Link" : "Sign In"}
          </button>
        </form>

        {!resetMode && (
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleGoogleSignIn}
              className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg text-center"
            >
              Sign in with Google
            </button>
            <button
              onClick={handleGitHubSignIn}
              className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg text-center"
            >
              Sign in with GitHub
            </button>
          </div>
        )}

        

        <p className="mt-2 text-center">
          Don't have an account?{" "}
          <span
            onClick={() => {
              setShowSignIn(false);
              setShowSignUp(true);
            }}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Sign up here
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignInPopup;

import { useState } from "react";
import logo from "./logo.png";

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://formspree.io/f/mgvyggny", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (res.ok) {
        setSubmitted(true);
        setName("");
        setEmail("");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 relative overflow-hidden">
      {/* Subtle background gradient accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-blue-900/50 to-purple-900/50 opacity-60 blur-2xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center w-full px-4">
        {/* Logo image */}
        <div className="mb-8 mt-12">
          <img src={logo} alt="Auralis Logo" className="mx-auto h-20 w-20 object-contain" />
        </div>
        <div className="text-center mb-8">
          <div className="uppercase text-xs tracking-widest text-gray-500 mb-2">Auralis Design System</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
            Join the waitlist for the <br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-900/50 bg-clip-text text-transparent">Auralis Web App</span>
          </h1>
        </div>
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-gray-800/90 rounded-xl shadow-xl p-6 flex flex-col gap-4 border border-gray-700"
          >
            <div className="flex items-center bg-gray-900 rounded-lg px-3 py-2 border border-gray-700 focus-within:border-blue-500 transition">
              <ion-icon name="person-outline" class="w-5 h-5 text-gray-500 mr-2"></ion-icon>
              <input
                type="text"
                required
                placeholder="Full name..."
                className="bg-transparent outline-none w-full text-white placeholder-gray-500"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="flex items-center bg-gray-900 rounded-lg px-3 py-2 border border-gray-700 focus-within:border-blue-500 transition">
              <ion-icon name="mail-outline" class="w-5 h-5 text-gray-500 mr-2"></ion-icon>
              <input
                type="email"
                required
                placeholder="Email address..."
                className="bg-transparent outline-none w-full text-white placeholder-gray-500"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            <button
              type="submit"
              className="mt-2 w-full py-2 rounded-lg bg-gradient-to-r from-blue-900/50 to-purple-900/50 text-blue-400 font-semibold text-lg shadow-lg border border-blue-400 hover:bg-blue-900/20 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Continue"}
            </button>
          </form>
        ) : (
          // Confirmation modal
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 z-20">
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center border border-gray-600 relative">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-white text-xl"
                onClick={() => setSubmitted(false)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="flex justify-center mb-4">
                <div className="bg-blue-500 rounded-full p-2 border-2 border-blue-400">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">We've added you to our waiting list!</h2>
              <p className="text-gray-400 mb-4">We'll let you know when Auralis is ready.</p>
              <div className="flex items-center justify-center bg-blue-900/20 rounded-lg px-3 py-2 mb-2 border border-blue-400">
                <ion-icon name="mail-outline" class="w-5 h-5 text-blue-400 mr-2"></ion-icon>
                <span className="text-blue-400 font-mono text-sm">{email}</span>
              </div>
            </div>
          </div>
        )}
        {/* Footer */}
        <footer className="mt-16 mb-4 text-center text-xs text-gray-500 z-10">
          Auralis is coming to the web soon.<br />
          Designed by <a href="https://enesi-s-space.vercel.app" className="underline hover:text-blue-400">Enesi</a> to give you back your time.
        </footer>
      </div>
    </div>
  );
}

export default App; 
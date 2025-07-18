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
    <div className="min-h-screen flex flex-col items-center justify-center bg-aurora-dark relative overflow-hidden">
      {/* Subtle background gradient accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-aurora-blue/30 to-aurora-teal/20 opacity-60 blur-2xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center w-full px-4">
        {/* Logo image */}
        <div className="mb-3 mt-12">
          <img src={logo} alt="Auralis Logo" className="mx-auto h-40 w-40 object-contain" />
        </div>
        <div className="text-center mb-8">
          <div className="uppercase text-xs tracking-widest text-aurora-muted mb-2">Auralis Design System</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-aurora-white mb-2">
            Join the waitlist for the <br />
            <span className="bg-gradient-to-r from-aurora-blue via-aurora-teal to-aurora-blue bg-clip-text text-transparent">Auralis Web App</span>
          </h1>
        </div>
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-aurora-card/90 rounded-xl shadow-xl p-6 flex flex-col gap-4 border border-aurora-blue/30"
          >
            <div className="flex items-center bg-aurora-dark rounded-lg px-3 py-2 border border-aurora-blue/20 focus-within:border-aurora-blue transition">
              <ion-icon name="person-outline" class="w-5 h-5 text-aurora-muted mr-2"></ion-icon>
              <input
                type="text"
                required
                placeholder="Full name..."
                className="bg-transparent outline-none w-full text-aurora-white placeholder-aurora-muted"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="flex items-center bg-aurora-dark rounded-lg px-3 py-2 border border-aurora-blue/20 focus-within:border-aurora-blue transition">
              <ion-icon name="mail-outline" class="w-5 h-5 text-aurora-muted mr-2"></ion-icon>
              <input
                type="email"
                required
                placeholder="Email address..."
                className="bg-transparent outline-none w-full text-aurora-white placeholder-aurora-muted"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            {error && <div className="text-red-400 text-sm text-center">{error}</div>}
            <button
              type="submit"
              className="mt-2 w-full py-2 rounded-lg bg-gradient-to-r from-aurora-blue to-aurora-teal text-aurora-dark font-semibold text-lg shadow-lg border border-aurora-blue hover:bg-aurora-blue/80 hover:text-aurora-white transition focus:outline-none focus:ring-2 focus:ring-aurora-blue disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Continue"}
            </button>
          </form>
        ) : (
          // Confirmation modal
          <div className="fixed inset-0 flex items-center justify-center bg-aurora-dark/90 z-20">
            <div className="bg-aurora-card rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center border border-aurora-blue/30 relative">
              <button
                className="absolute top-3 right-3 text-aurora-muted hover:text-aurora-white text-xl"
                onClick={() => setSubmitted(false)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="flex justify-center mb-4">
                <div className="bg-aurora-blue rounded-full p-2 border-2 border-aurora-teal">
                  <svg className="w-8 h-8 text-aurora-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-aurora-white mb-2">We've added you to our waiting list!</h2>
              <p className="text-aurora-muted mb-4">We'll let you know when Auralis is ready.</p>
              <div className="flex items-center justify-center bg-aurora-blue/10 rounded-lg px-3 py-2 mb-2 border border-aurora-blue">
                <ion-icon name="mail-outline" class="w-5 h-5 text-aurora-blue mr-2"></ion-icon>
                <span className="text-aurora-blue font-mono text-sm">{email}</span>
              </div>
            </div>
          </div>
        )}
        {/* Footer */}
        <footer className="mt-16 mb-4 text-center text-xs text-aurora-muted z-10">
          Auralis is coming to the web soon.<br />
          Designed by <a href="https://enesi-s-space.vercel.app" className="underline hover:text-aurora-blue">Enesi</a> to give you back your time.
        </footer>
      </div>
    </div>
  );
}

export default App; 
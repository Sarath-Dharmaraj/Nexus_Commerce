
function HydrateFallback() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-slate-50 p-6 font-hanken tracking-wide">
    <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-6"></div>
    
    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
      Nexus Commerce
    </h2>
    
    <div className="max-w-md text-center flex flex-col gap-2 text-slate-600">
      <p className="text-sm md:text-base font-semibold text-blue-600 uppercase tracking-widest">
        Server Cold Start Initializing
      </p>
      <p className="text-xs md:text-sm leading-relaxed">
        This project's backend is hosted on Render's free tier, which spins down during inactivity. Please allow <strong>30 to 50 seconds</strong> for the server to wake up.
      </p>
      <p className="text-xs md:text-sm text-slate-400 italic mt-2">
        Thank you for your patience and for taking the time to evaluate my work.
      </p>
    </div>
  </div>
  )
}

export default HydrateFallback
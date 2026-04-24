export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 glass border-b border-white/5">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-black text-xl italic shadow-lg shadow-primary/30">
          A
        </div>
        <span className="text-2xl font-black tracking-tighter text-white">
          AlgoForge <span className="text-primary italic">API</span>
        </span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
        <a href="#features" className="hover:text-primary transition-colors">Features</a>
        <a href="#docs" className="hover:text-primary transition-colors">API Explorer</a>
        <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-sm font-bold text-white hover:text-primary transition-colors">Log In</button>
        <button className="bg-primary text-white text-sm font-bold px-5 py-2 rounded-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
          Get API Key
        </button>
      </div>
    </nav>
  );
}

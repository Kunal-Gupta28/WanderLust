export default function Loading() {
  return (
    <main className="grid min-h-[100svh] place-items-center bg-paper">
      <div className="flex flex-col items-center text-center">
        <p className="animate-pulse-slow font-display text-5xl tracking-[-.06em] text-ink relative">
          <span className="shimmer-text">Wander</span><span className="text-clay shimmer-text-clay">Lust</span>
        </p>
        
        <p className="mt-5 text-sm font-medium text-ink/60 tracking-wide uppercase">
          Finding remarkable places
        </p>
        
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="dot dot-1"></div>
          <div className="dot dot-2"></div>
          <div className="dot dot-3"></div>
        </div>
      </div>

      <style>{`
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(0.98); }
        }
        
        .shimmer-text {
          background: linear-gradient(90deg, #17221d 0%, #405446 50%, #17221d 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
        
        .shimmer-text-clay {
          background: linear-gradient(90deg, #b95738 0%, #d87c5e 50%, #b95738 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer 3s linear infinite reverse;
        }
        
        @keyframes shimmer {
          to { background-position: 200% center; }
        }
        
        .dot {
          width: 6px;
          height: 6px;
          background-color: #b95738;
          border-radius: 50%;
          animation: wave 1.4s infinite ease-in-out both;
        }
        .dot-1 { animation-delay: -0.32s; }
        .dot-2 { animation-delay: -0.16s; background-color: #405446; }
        .dot-3 { animation-delay: 0s; background-color: #17221d; }
        
        @keyframes wave {
          0%, 80%, 100% { transform: scale(0); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </main>
  );
}

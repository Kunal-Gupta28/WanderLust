import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative grid min-h-[100svh] place-items-center bg-paper px-6 text-center overflow-hidden">
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative">
          <div className="decorative-circles absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>
            <div className="circle circle-3"></div>
          </div>
          <p className="animate-bounce-scale font-display text-[clamp(6rem,16vw,14rem)] leading-none text-clay drop-shadow-sm">
            404
          </p>
        </div>
        
        <h1 className="animate-fade-up mt-8 font-display text-4xl md:text-5xl tracking-[-.05em] text-ink">
          This path has wandered off.
        </h1>
        
        <p className="animate-fade-up animate-delay-100 mt-6 max-w-md text-lg leading-relaxed text-ink/70">
          The trail you&apos;re looking for has gone off the beaten path. Perhaps it&apos;s an adventure worth having, or maybe it&apos;s time to head back.
        </p>
        
        <div className="animate-fade-up animate-delay-200 mt-10 flex w-full flex-col sm:w-auto sm:flex-row items-center gap-4">
          <Link
            href="/"
            className="flex w-full sm:w-auto justify-center rounded-full bg-ink px-8 py-3.5 text-sm font-bold text-white transition hover:bg-moss"
          >
            Return home
          </Link>
          <Link
            href="/explore"
            className="flex w-full sm:w-auto justify-center rounded-full border border-ink/20 px-8 py-3.5 text-sm font-bold text-ink transition hover:border-ink hover:bg-ink/5"
          >
            Explore stays
          </Link>
        </div>
      </div>

      <style>{`
        .animate-bounce-scale {
          animation: bounceScale 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          opacity: 0;
          transform: scale(0.8);
        }
        .animate-fade-up {
          animation: fadeUp 0.8s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        .animate-delay-100 {
          animation-delay: 100ms;
        }
        .animate-delay-200 {
          animation-delay: 200ms;
        }
        @keyframes bounceScale {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .decorative-circles {
          width: 300px;
          height: 300px;
          pointer-events: none;
        }
        .circle {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border: 1px dashed rgba(185, 87, 56, 0.25);
          border-radius: 50%;
          animation: float 8s ease-in-out infinite;
        }
        .circle-1 { width: 140%; height: 140%; animation-delay: 0s; }
        .circle-2 { width: 190%; height: 190%; animation-delay: -2s; border-color: rgba(64, 84, 70, 0.15); }
        .circle-3 { width: 240%; height: 240%; animation-delay: -4s; border-color: rgba(23, 34, 29, 0.1); }
        
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
          50% { transform: translate(-50%, -52%) rotate(3deg) scale(1.02); }
        }
      `}</style>
    </main>
  );
}

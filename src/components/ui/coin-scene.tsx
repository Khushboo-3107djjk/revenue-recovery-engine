import heroCoins from "@/assets/hero-coins.jpg";

const embers = [
  { left: "12%", delay: "0s", size: 4 },
  { left: "28%", delay: "1.4s", size: 3 },
  { left: "44%", delay: "2.6s", size: 5 },
  { left: "63%", delay: "0.8s", size: 3 },
  { left: "78%", delay: "3.2s", size: 4 },
  { left: "90%", delay: "1.9s", size: 3 },
];

export function CoinScene() {
  return (
    <div className="relative aspect-square w-full max-w-xl">
      <div className="animate-pulse-glow absolute inset-8 rounded-full bg-primary/30 blur-[90px]" />

      <img
        src={heroCoins}
        alt="Glowing 3D coins hovering over a molten platform"
        width={1024}
        height={1024}
        className="animate-float-slow relative z-10 w-full [mask-image:radial-gradient(circle_at_50%_45%,black_58%,transparent_78%)]"
      />

      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        {embers.map((e, i) => (
          <span
            key={i}
            className="animate-ember absolute bottom-24 rounded-full bg-primary-glow"
            style={{
              left: e.left,
              width: e.size,
              height: e.size,
              animationDelay: e.delay,
              animationDuration: `${5 + i}s`,
            }}
          />
        ))}
      </div>

      <div className="animate-spin-slow absolute inset-x-10 bottom-16 z-0 h-40 rounded-[50%] border border-primary/25" />
    </div>
  );
}

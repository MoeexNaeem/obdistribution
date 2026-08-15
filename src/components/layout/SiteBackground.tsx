/*
  SiteBackground — a fixed, layered ambient backdrop so no section ever reads as
  empty black. Four quiet layers: a technical dot grid, two warm gold glows,
  a fine film grain, and an edge vignette to focus the centre. All very low
  contrast — depth, not decoration. Sits behind all content (-z-10).
*/
export function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='34' height='34'%3E%3Ccircle cx='17' cy='17' r='1' fill='%231f1f24'/%3E%3C/svg%3E\")",
          backgroundSize: "34px 34px",
        }}
      />
      {/* Warm ambient glows — top-left and lower-right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 12% -8%, rgba(251,191,36,0.10), transparent 62%), radial-gradient(50% 50% at 100% 108%, rgba(249,115,22,0.08), transparent 60%)",
        }}
      />
      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {/* Edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 120% at 50% 35%, transparent 58%, rgba(0,0,0,0.55))",
        }}
      />
    </div>
  );
}

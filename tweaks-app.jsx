// tweaks-app.jsx — wires the Tweaks panel to the brutalist portfolio.

function PortfolioTweaks() {
  const defaults = window.__TWEAK_DEFAULTS__ || {
    palette: "blood",
    motion: true,
    density: "comfortable",
    showTerminal: true,
    showStatusbar: true,
  };
  const [t, setTweak] = useTweaks(defaults);

  React.useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-palette", t.palette);
    html.setAttribute("data-motion", t.motion ? "on" : "off");

    if (t.density === "compact") {
      html.style.setProperty("--section-y", "clamp(48px, 6vw, 90px)");
      html.style.setProperty("--gutter", "clamp(16px, 3vw, 40px)");
    } else if (t.density === "spacious") {
      html.style.setProperty("--section-y", "clamp(100px, 13vw, 180px)");
      html.style.setProperty("--gutter", "clamp(24px, 5vw, 72px)");
    } else {
      html.style.removeProperty("--section-y");
      html.style.removeProperty("--gutter");
    }

    const term = document.querySelector(".hero .term");
    if (term) term.style.display = t.showTerminal ? "" : "none";

    const sbar = document.querySelector(".statusbar");
    if (sbar) sbar.style.display = t.showStatusbar ? "" : "none";
  }, [t.palette, t.motion, t.density, t.showTerminal, t.showStatusbar]);

  // Each option is a [bg, accent, secondary, text] preview tuple
  const palettes = {
    blood:  ["#0a0a0a", "#ff2d2d", "#00ff85", "#ededed"],
    matrix: ["#0a0a0a", "#00ff85", "#ffb020", "#ededed"],
    cyber:  ["#0a0a0a", "#22e2ff", "#ff2dd1", "#ededed"],
    amber:  ["#0a0a0a", "#ffb020", "#00ff85", "#ededed"],
    paper:  ["#ededed", "#cc0000", "#2a7d3f", "#0a0a0a"],
  };
  const paletteKeys = Object.keys(palettes);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Palette" />
      <TweakColor
        label="Theme"
        value={palettes[t.palette]}
        options={paletteKeys.map((k) => palettes[k])}
        onChange={(arr) => {
          const k = paletteKeys.find(
            (kk) => palettes[kk].join() === (Array.isArray(arr) ? arr.join() : "")
          );
          if (k) setTweak("palette", k);
        }}
      />

      <TweakSection label="Layout" />
      <TweakRadio
        label="Density"
        value={t.density}
        options={["compact", "comfortable", "spacious"]}
        onChange={(v) => setTweak("density", v)}
      />

      <TweakSection label="Chrome" />
      <TweakToggle
        label="Status bar"
        value={t.showStatusbar}
        onChange={(v) => setTweak("showStatusbar", v)}
      />
      <TweakToggle
        label="Hero terminal"
        value={t.showTerminal}
        onChange={(v) => setTweak("showTerminal", v)}
      />
      <TweakToggle
        label="Motion"
        value={t.motion}
        onChange={(v) => setTweak("motion", v)}
      />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<PortfolioTweaks />);

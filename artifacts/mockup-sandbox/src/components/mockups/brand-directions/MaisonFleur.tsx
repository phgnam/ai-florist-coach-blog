export function MaisonFleur() {
  const palette = [
    { name: "Noir Fleur", hex: "#1A1318", oklch: "oklch(10% 0.015 340)", role: "Primary" },
    { name: "Champagne", hex: "#F0E6D3", oklch: "oklch(92% 0.03 75)", role: "Background" },
    { name: "Rose Doré", hex: "#C8956A", oklch: "oklch(66% 0.09 50)", role: "Accent / Gold" },
    { name: "Blush Luxe", hex: "#D4A0A8", oklch: "oklch(72% 0.06 5)", role: "Secondary" },
    { name: "Ivory", hex: "#FAF7F2", oklch: "oklch(98% 0.01 80)", role: "Surface" },
    { name: "Slate Rose", hex: "#6B5560", oklch: "oklch(40% 0.04 340)", role: "Muted" },
  ];

  const shades = [
    "#F5E8E0","#E8C8B8","#D4A080","#C8956A","#B87A52","#9A623E","#7C4A2E","#5E3420","#401E12","#1A0A06"
  ];

  return (
    <div style={{ fontFamily: "'Bodoni Moda', 'Playfair Display', Georgia, serif", background: "#FAF7F2", minHeight: "100vh", color: "#1A1318" }}>
      <link rel="stylesheet" media="print" onLoad={(e: any) => e.target.media='all'}
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,600;0,700;1,400;1,500&family=Didact+Gothic&display=swap" />

      {/* Header band */}
      <div style={{ background: "#1A1318", padding: "12px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'Didact Gothic', sans-serif", fontSize: 11, letterSpacing: "0.3em", fontWeight: 400, color: "#C8956A", textTransform: "uppercase" }}>Direction C</span>
        <span style={{ fontFamily: "'Didact Gothic', sans-serif", fontSize: 11, letterSpacing: "0.3em", fontWeight: 400, color: "#C8956A", textTransform: "uppercase" }}>Maison Fleur</span>
      </div>

      {/* Hero */}
      <div style={{ background: "#1A1318", padding: "72px 64px 56px", position: "relative", overflow: "hidden" }}>
        {/* Gold line decoration */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #C8956A 30%, #F0E6D3 50%, #C8956A 70%, transparent)" }} />
        <svg style={{ position: "absolute", right: 56, top: 32, opacity: 0.12, width: 260, height: 300 }} viewBox="0 0 200 240" fill="none">
          <circle cx="100" cy="80" r="60" stroke="#C8956A" strokeWidth="1" fill="none"/>
          <circle cx="100" cy="80" r="40" stroke="#C8956A" strokeWidth="0.5" fill="none"/>
          <ellipse cx="100" cy="30" rx="18" ry="35" fill="#C8956A"/>
          <ellipse cx="100" cy="30" rx="18" ry="35" fill="#C8956A" transform="rotate(72 100 80)"/>
          <ellipse cx="100" cy="30" rx="18" ry="35" fill="#C8956A" transform="rotate(144 100 80)"/>
          <ellipse cx="100" cy="30" rx="18" ry="35" fill="#C8956A" transform="rotate(216 100 80)"/>
          <ellipse cx="100" cy="30" rx="18" ry="35" fill="#C8956A" transform="rotate(288 100 80)"/>
          <circle cx="100" cy="80" r="10" fill="#F0E6D3"/>
        </svg>

        <div style={{ position: "relative", maxWidth: 520 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <div style={{ height: 1, width: 32, background: "#C8956A" }} />
            <p style={{ fontFamily: "'Didact Gothic', sans-serif", fontSize: 10, letterSpacing: "0.4em", fontWeight: 400, color: "#C8956A", textTransform: "uppercase", margin: 0 }}>
              Yor Flower · Identité de Marque
            </p>
          </div>
          <h1 style={{ fontSize: 70, fontWeight: 400, lineHeight: 1.0, margin: "0 0 4px", color: "#FAF7F2" }}>
            Maison
          </h1>
          <h1 style={{ fontSize: 70, fontWeight: 400, lineHeight: 1.0, margin: "0 0 32px", fontStyle: "italic", color: "#C8956A" }}>
            Fleur
          </h1>
          <p style={{ fontFamily: "'Didact Gothic', sans-serif", fontSize: 14, lineHeight: 1.8, color: "#A08888", maxWidth: 380, fontWeight: 400, letterSpacing: "0.02em" }}>
            High editorial, deeply considered — a brand that commands attention like a single perfect bloom in a museum hall. For the connoisseur of craft.
          </p>
        </div>
      </div>

      <div style={{ padding: "48px 64px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>

        {/* Color Palette */}
        <div>
          <h2 style={{ fontSize: 10, fontFamily: "'Didact Gothic', sans-serif", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6B5560", marginBottom: 24, fontWeight: 400 }}>
            Color Palette
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 28 }}>
            {palette.map(c => (
              <div key={c.hex}>
                <div style={{ width: "100%", height: 56, borderRadius: 4, background: c.hex, marginBottom: 8, border: c.hex === "#FAF7F2" || c.hex === "#F0E6D3" ? "1px solid #D4B8A0" : "none" }} />
                <p style={{ fontFamily: "'Didact Gothic', sans-serif", fontSize: 10, fontWeight: 400, color: "#1A1318", margin: 0, letterSpacing: "0.05em" }}>{c.name}</p>
                <p style={{ fontFamily: "'Didact Gothic', sans-serif", fontSize: 10, color: "#6B5560", margin: "2px 0 0" }}>{c.hex}</p>
                <p style={{ fontFamily: "'Didact Gothic', sans-serif", fontSize: 9, color: "#C8956A", margin: "1px 0 0" }}>{c.role}</p>
              </div>
            ))}
          </div>
          <h3 style={{ fontSize: 10, fontFamily: "'Didact Gothic', sans-serif", letterSpacing: "0.25em", textTransform: "uppercase", color: "#6B5560", marginBottom: 10, fontWeight: 400 }}>Rose Doré Shade Ramp</h3>
          <div style={{ display: "flex", gap: 3, borderRadius: 2, overflow: "hidden" }}>
            {shades.map((s) => (
              <div key={s} style={{ flex: 1, height: 28, background: s }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            <span style={{ fontFamily: "'Didact Gothic', sans-serif", fontSize: 9, color: "#6B5560" }}>100</span>
            <span style={{ fontFamily: "'Didact Gothic', sans-serif", fontSize: 9, color: "#6B5560" }}>900</span>
          </div>
        </div>

        {/* Typography */}
        <div>
          <h2 style={{ fontSize: 10, fontFamily: "'Didact Gothic', sans-serif", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6B5560", marginBottom: 24, fontWeight: 400 }}>
            Typography
          </h2>
          <div style={{ marginBottom: 24, padding: "20px 24px", background: "#1A1318", borderRadius: 4, borderLeft: "2px solid #C8956A" }}>
            <p style={{ fontFamily: "'Didact Gothic', sans-serif", fontSize: 10, color: "#C8956A", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 10 }}>Display — Bodoni Moda</p>
            <p style={{ fontSize: 40, fontWeight: 400, lineHeight: 1.1, margin: 0, color: "#FAF7F2" }}>Bông hoa nở</p>
            <p style={{ fontSize: 26, fontWeight: 400, fontStyle: "italic", margin: "4px 0 0", color: "#C8956A" }}>trong ánh bình minh</p>
          </div>
          <div style={{ padding: "20px 24px", background: "#FAF7F2", borderRadius: 4, border: "1px solid #D4B8A0" }}>
            <p style={{ fontFamily: "'Didact Gothic', sans-serif", fontSize: 10, color: "#6B5560", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 10 }}>Body — Didact Gothic</p>
            <p style={{ fontFamily: "'Didact Gothic', sans-serif", fontSize: 14, lineHeight: 1.8, color: "#3A2830", fontWeight: 400, margin: 0, letterSpacing: "0.02em" }}>
              Mỗi bông hoa là một câu chuyện — về sự kiên nhẫn, về vẻ đẹp tự nhiên, và về nghệ thuật sắp xếp để cảm xúc nở hoa.
            </p>
            <p style={{ fontFamily: "'Didact Gothic', sans-serif", fontSize: 11, color: "#6B5560", margin: "10px 0 0", letterSpacing: "0.1em", textTransform: "uppercase" }}>Caption · 11px · Didact Gothic</p>
          </div>
        </div>

        {/* Voice & Tone */}
        <div>
          <h2 style={{ fontSize: 10, fontFamily: "'Didact Gothic', sans-serif", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6B5560", marginBottom: 24, fontWeight: 400 }}>
            Voice & Tone
          </h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
            {["Refined", "Editorial", "Precise", "Graceful", "Authoritative"].map(t => (
              <span key={t} style={{ padding: "5px 14px", border: "1px solid #C8956A", fontFamily: "'Didact Gothic', sans-serif", fontSize: 11, color: "#C8956A", letterSpacing: "0.08em" }}>{t}</span>
            ))}
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ padding: "14px 18px", background: "#FAF7F2", border: "1px solid #D4B8A0" }}>
              <p style={{ fontFamily: "'Didact Gothic', sans-serif", fontSize: 10, color: "#C8956A", letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 8px", fontWeight: 400 }}>Hero Headline</p>
              <p style={{ fontSize: 20, fontWeight: 400, margin: 0, color: "#1A1318", lineHeight: 1.25 }}>Nghệ thuật của hoa — tinh tế như bạn.</p>
            </div>
            <div style={{ padding: "14px 18px", background: "#FAF7F2", border: "1px solid #D4B8A0" }}>
              <p style={{ fontFamily: "'Didact Gothic', sans-serif", fontSize: 10, color: "#C8956A", letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 8px", fontWeight: 400 }}>Welcome</p>
              <p style={{ fontFamily: "'Didact Gothic', sans-serif", fontSize: 13, fontWeight: 400, margin: 0, color: "#3A2830", lineHeight: 1.7, letterSpacing: "0.02em" }}>Chào mừng đến Yor Flower — nơi kiến thức và vẻ đẹp gặp nhau trong từng trang viết được chắt lọc kỹ lưỡng.</p>
            </div>
            <div style={{ padding: "14px 18px", background: "#FAF7F2", border: "1px solid #D4B8A0" }}>
              <p style={{ fontFamily: "'Didact Gothic', sans-serif", fontSize: 10, color: "#C8956A", letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 8px", fontWeight: 400 }}>Call to Action</p>
              <div style={{ display: "inline-block", padding: "11px 32px", background: "#1A1318", fontFamily: "'Didact Gothic', sans-serif", fontSize: 11, fontWeight: 400, color: "#C8956A", letterSpacing: "0.25em", textTransform: "uppercase" }}>
                Khám phá →
              </div>
            </div>
          </div>
        </div>

        {/* Brand in Action */}
        <div>
          <h2 style={{ fontSize: 10, fontFamily: "'Didact Gothic', sans-serif", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6B5560", marginBottom: 24, fontWeight: 400 }}>
            Brand in Action
          </h2>
          <div style={{ background: "#fff", overflow: "hidden", marginBottom: 16, border: "1px solid #D4B8A0" }}>
            <div style={{ background: "#1A1318", height: 100, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #C8956A, transparent)" }} />
              <svg width="40" height="48" viewBox="0 0 40 48" fill="none">
                <ellipse cx="20" cy="14" rx="8" ry="13" fill="#C8956A" opacity="0.8"/>
                <ellipse cx="20" cy="14" rx="8" ry="13" fill="#C8956A" opacity="0.8" transform="rotate(72 20 20)"/>
                <ellipse cx="20" cy="14" rx="8" ry="13" fill="#C8956A" opacity="0.8" transform="rotate(144 20 20)"/>
                <ellipse cx="20" cy="14" rx="8" ry="13" fill="#C8956A" opacity="0.8" transform="rotate(216 20 20)"/>
                <ellipse cx="20" cy="14" rx="8" ry="13" fill="#C8956A" opacity="0.8" transform="rotate(288 20 20)"/>
                <circle cx="20" cy="20" r="5" fill="#F0E6D3"/>
              </svg>
            </div>
            <div style={{ padding: "16px 20px" }}>
              <span style={{ fontFamily: "'Didact Gothic', sans-serif", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#C8956A" }}>Hoa Hồng</span>
              <p style={{ fontSize: 17, fontWeight: 400, margin: "8px 0 10px", color: "#1A1318", lineHeight: 1.25 }}>Bí quyết giữ hoa tươi cả tuần</p>
              <p style={{ fontFamily: "'Didact Gothic', sans-serif", fontSize: 12, color: "#6B5560", margin: 0, lineHeight: 1.7, letterSpacing: "0.01em" }}>Những mẹo nhỏ từ chuyên gia giúp bó hoa...</p>
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #E8DDD4", display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 22, height: 22, background: "#1A1318", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>✦</div>
                <span style={{ fontFamily: "'Didact Gothic', sans-serif", fontSize: 11, color: "#6B5560", letterSpacing: "0.08em" }}>Yor Flower · 2 thg 5, 2026</span>
              </div>
            </div>
          </div>
          <div style={{ background: "#1A1318", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "2px solid #C8956A" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 24, height: 24, background: "transparent", border: "1px solid #C8956A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>✦</div>
              <span style={{ fontSize: 15, fontWeight: 400, color: "#FAF7F2", letterSpacing: "0.05em" }}>Yor Flower</span>
            </div>
            <div style={{ display: "flex", gap: 24 }}>
              {["Bài viết","Chủ đề","Giới thiệu"].map(n => (
                <span key={n} style={{ fontFamily: "'Didact Gothic', sans-serif", fontSize: 11, color: "#A08888", letterSpacing: "0.1em" }}>{n}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS tokens */}
      <div style={{ margin: "0 64px 48px", padding: "24px 28px", background: "#1A1318", borderRadius: 4, color: "#FAF7F2", borderTop: "2px solid #C8956A" }}>
        <p style={{ fontFamily: "'Didact Gothic', sans-serif", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#C8956A", margin: "0 0 14px" }}>Design Tokens — CSS</p>
        <pre style={{ fontFamily: "monospace", fontSize: 12, color: "#F0E6D3", margin: 0, lineHeight: 1.8, opacity: 0.9 }}>{`--primary:    #1A1318;  /* oklch(10% 0.015 340) */
--accent:     #C8956A;  /* oklch(66% 0.09 50) */
--secondary:  #D4A0A8;  /* oklch(72% 0.06 5) */
--background: #F0E6D3;  /* oklch(92% 0.03 75) */
--surface:    #FAF7F2;  /* oklch(98% 0.01 80) */
--muted:      #6B5560;  /* oklch(40% 0.04 340) */
--font-display: 'Bodoni Moda', Georgia, serif;
--font-body:    'Didact Gothic', system-ui, sans-serif;`}</pre>
      </div>
    </div>
  );
}

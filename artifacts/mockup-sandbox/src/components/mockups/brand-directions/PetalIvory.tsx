export function PetalIvory() {
  const palette = [
    { name: "Blush Petal", hex: "#E8A4B0", oklch: "oklch(72% 0.09 5)", role: "Primary" },
    { name: "Ivory Cream", hex: "#FAF5EE", oklch: "oklch(97% 0.015 80)", role: "Background" },
    { name: "Dusty Rose", hex: "#C47A8A", oklch: "oklch(61% 0.09 5)", role: "Accent" },
    { name: "Warm Taupe", hex: "#9E8A80", oklch: "oklch(60% 0.03 30)", role: "Secondary" },
    { name: "Deep Mauve", hex: "#4A2D35", oklch: "oklch(22% 0.05 5)", role: "Text / Dark" },
    { name: "Petal Mist", hex: "#F5E6EA", oklch: "oklch(93% 0.025 5)", role: "Surface" },
  ];

  const shades = [
    "#FDF0F2","#FAE0E5","#F5C8D2","#EDA8B8","#E08098","#C47A8A","#A85E6E","#8C4254","#70283A","#4A1522"
  ];

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif", background: "#FAF5EE", minHeight: "100vh", color: "#4A2D35" }}>
      <link rel="stylesheet" media="print" onLoad={(e: any) => e.target.media='all'}
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap" />

      {/* Header band */}
      <div style={{ background: "#E8A4B0", padding: "12px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, letterSpacing: "0.25em", fontWeight: 500, color: "#FAF5EE", textTransform: "uppercase" }}>Direction A</span>
        <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, letterSpacing: "0.25em", fontWeight: 500, color: "#FAF5EE", textTransform: "uppercase" }}>Petal & Ivory</span>
      </div>

      {/* Hero */}
      <div style={{ background: "linear-gradient(160deg, #FAF5EE 0%, #F5E6EA 60%, #EDA8B8 100%)", padding: "72px 64px 56px", position: "relative", overflow: "hidden" }}>
        {/* Decorative petal SVG */}
        <svg style={{ position: "absolute", top: -20, right: 40, opacity: 0.18, width: 320, height: 320 }} viewBox="0 0 200 200" fill="none">
          <ellipse cx="100" cy="60" rx="28" ry="55" fill="#C47A8A" transform="rotate(0 100 100)" />
          <ellipse cx="100" cy="60" rx="28" ry="55" fill="#C47A8A" transform="rotate(60 100 100)" />
          <ellipse cx="100" cy="60" rx="28" ry="55" fill="#C47A8A" transform="rotate(120 100 100)" />
          <circle cx="100" cy="100" r="16" fill="#E8A4B0" />
        </svg>
        <div style={{ position: "relative", maxWidth: 520 }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, letterSpacing: "0.3em", fontWeight: 400, color: "#C47A8A", textTransform: "uppercase", marginBottom: 20 }}>
            Yor Flower · Brand Identity
          </p>
          <h1 style={{ fontSize: 72, fontWeight: 300, lineHeight: 1.05, margin: "0 0 8px", color: "#4A2D35" }}>
            Petal
          </h1>
          <h1 style={{ fontSize: 72, fontWeight: 300, lineHeight: 1.05, margin: "0 0 28px", fontStyle: "italic", color: "#C47A8A" }}>
            & Ivory
          </h1>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 15, lineHeight: 1.7, color: "#6B4A52", maxWidth: 380, fontWeight: 300 }}>
            Romantic, feminine, and softly luminous — like a bouquet wrapped in linen at golden hour. For those who see flowers as an act of love.
          </p>
        </div>
      </div>

      <div style={{ padding: "48px 64px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>

        {/* Color Palette */}
        <div>
          <h2 style={{ fontSize: 11, fontFamily: "'Jost', sans-serif", letterSpacing: "0.25em", textTransform: "uppercase", color: "#9E8A80", marginBottom: 24, fontWeight: 500 }}>
            Color Palette
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 28 }}>
            {palette.map(c => (
              <div key={c.hex}>
                <div style={{ width: "100%", height: 56, borderRadius: 8, background: c.hex, marginBottom: 8, border: c.hex === "#FAF5EE" ? "1px solid #E8D8DC" : "none" }} />
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, fontWeight: 500, color: "#4A2D35", margin: 0, letterSpacing: "0.05em" }}>{c.name}</p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, color: "#9E8A80", margin: "2px 0 0" }}>{c.hex}</p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 9, color: "#C47A8A", margin: "1px 0 0" }}>{c.role}</p>
              </div>
            ))}
          </div>
          {/* Shade ramp */}
          <h3 style={{ fontSize: 10, fontFamily: "'Jost', sans-serif", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9E8A80", marginBottom: 10, fontWeight: 500 }}>Blush Shade Ramp</h3>
          <div style={{ display: "flex", gap: 3, borderRadius: 6, overflow: "hidden" }}>
            {shades.map((s, i) => (
              <div key={s} style={{ flex: 1, height: 28, background: s, position: "relative" }} title={`${(i+1)*100}`} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 9, color: "#9E8A80" }}>100</span>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 9, color: "#9E8A80" }}>900</span>
          </div>
        </div>

        {/* Typography */}
        <div>
          <h2 style={{ fontSize: 11, fontFamily: "'Jost', sans-serif", letterSpacing: "0.25em", textTransform: "uppercase", color: "#9E8A80", marginBottom: 24, fontWeight: 500 }}>
            Typography
          </h2>
          <div style={{ marginBottom: 24, padding: "20px 24px", background: "#F5E6EA", borderRadius: 10, borderLeft: "3px solid #E8A4B0" }}>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, color: "#9E8A80", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 8 }}>Display — Cormorant Garamond</p>
            <p style={{ fontSize: 42, fontWeight: 300, lineHeight: 1.1, margin: 0, color: "#4A2D35" }}>Bông hoa nở</p>
            <p style={{ fontSize: 28, fontWeight: 300, fontStyle: "italic", margin: "4px 0 0", color: "#C47A8A" }}>trong ánh bình minh</p>
          </div>
          <div style={{ padding: "20px 24px", background: "#FAF5EE", borderRadius: 10, border: "1px solid #E8D8DC" }}>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, color: "#9E8A80", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 10 }}>Body — Jost Light</p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 14, lineHeight: 1.75, color: "#6B4A52", fontWeight: 300, margin: 0 }}>
              Mỗi bông hoa là một câu chuyện — về sự kiên nhẫn, về vẻ đẹp tự nhiên, và về nghệ thuật sắp xếp để cảm xúc nở hoa.
            </p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, color: "#9E8A80", margin: "10px 0 0", fontWeight: 300 }}>Caption / label · 12px · Jost 300</p>
          </div>
        </div>

        {/* Voice & Tone */}
        <div>
          <h2 style={{ fontSize: 11, fontFamily: "'Jost', sans-serif", letterSpacing: "0.25em", textTransform: "uppercase", color: "#9E8A80", marginBottom: 24, fontWeight: 500 }}>
            Voice & Tone
          </h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
            {["Tender", "Poetic", "Warm", "Intimate", "Uplifting"].map(t => (
              <span key={t} style={{ padding: "5px 14px", borderRadius: 20, background: "#F5E6EA", border: "1px solid #E8A4B0", fontFamily: "'Jost', sans-serif", fontSize: 11, color: "#C47A8A", fontWeight: 500 }}>{t}</span>
            ))}
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ padding: "14px 18px", background: "#FAF5EE", borderRadius: 8, border: "1px solid #E8D8DC" }}>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, color: "#C47A8A", letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 6px", fontWeight: 500 }}>Hero Headline</p>
              <p style={{ fontSize: 18, fontWeight: 300, margin: 0, color: "#4A2D35", lineHeight: 1.3 }}>Nơi mỗi bông hoa kể một câu chuyện về bạn.</p>
            </div>
            <div style={{ padding: "14px 18px", background: "#FAF5EE", borderRadius: 8, border: "1px solid #E8D8DC" }}>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, color: "#C47A8A", letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 6px", fontWeight: 500 }}>Welcome Message</p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 13, fontWeight: 300, margin: 0, color: "#6B4A52", lineHeight: 1.6 }}>Chào mừng bạn đến Yor Flower — góc nhỏ xinh xắn dành cho những ai yêu hoa bằng cả trái tim.</p>
            </div>
            <div style={{ padding: "14px 18px", background: "#FAF5EE", borderRadius: 8, border: "1px solid #E8D8DC" }}>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, color: "#C47A8A", letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 6px", fontWeight: 500 }}>Call to Action</p>
              <div style={{ display: "inline-block", padding: "10px 28px", background: "#E8A4B0", borderRadius: 30, fontFamily: "'Jost', sans-serif", fontSize: 12, fontWeight: 500, color: "#FAF5EE", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Khám phá bài viết →
              </div>
            </div>
          </div>
        </div>

        {/* Brand in Action */}
        <div>
          <h2 style={{ fontSize: 11, fontFamily: "'Jost', sans-serif", letterSpacing: "0.25em", textTransform: "uppercase", color: "#9E8A80", marginBottom: 24, fontWeight: 500 }}>
            Brand in Action
          </h2>
          {/* Mini blog card */}
          <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 24px rgba(196,122,138,0.12)", marginBottom: 16 }}>
            <div style={{ background: "linear-gradient(135deg, #F5C8D2 0%, #EDA8B8 100%)", height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><ellipse cx="24" cy="14" rx="7" ry="13" fill="#C47A8A" opacity="0.7"/><ellipse cx="24" cy="14" rx="7" ry="13" fill="#C47A8A" opacity="0.7" transform="rotate(60 24 24)"/><ellipse cx="24" cy="14" rx="7" ry="13" fill="#C47A8A" opacity="0.7" transform="rotate(120 24 24)"/><circle cx="24" cy="24" r="5" fill="#E8A4B0"/></svg>
            </div>
            <div style={{ padding: "16px 18px" }}>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#E8A4B0", fontWeight: 500 }}>Hoa Hồng</span>
              <p style={{ fontSize: 16, fontWeight: 400, margin: "6px 0 8px", color: "#4A2D35", lineHeight: 1.3 }}>Bí quyết giữ hoa tươi cả tuần</p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, color: "#9E8A80", margin: 0, lineHeight: 1.6, fontWeight: 300 }}>Những mẹo nhỏ từ chuyên gia giúp bó hoa của bạn...</p>
              <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#E8A4B0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>🌸</div>
                <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, color: "#9E8A80", fontWeight: 300 }}>Yor Flower · 2 thg 5, 2026</span>
              </div>
            </div>
          </div>
          {/* Mini header */}
          <div style={{ background: "rgba(250,245,238,0.95)", borderRadius: 10, padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #E8D8DC" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#E8A4B0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🌸</div>
              <span style={{ fontSize: 16, fontWeight: 300, color: "#4A2D35" }}>Yor Flower</span>
            </div>
            <div style={{ display: "flex", gap: 18 }}>
              {["Bài viết","Chủ đề","Giới thiệu"].map(n => (
                <span key={n} style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, color: "#9E8A80", fontWeight: 400, letterSpacing: "0.08em" }}>{n}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS tokens */}
      <div style={{ margin: "0 64px 48px", padding: "24px 28px", background: "#4A2D35", borderRadius: 12, color: "#FAF5EE" }}>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#E8A4B0", margin: "0 0 14px", fontWeight: 500 }}>Design Tokens — CSS</p>
        <pre style={{ fontFamily: "monospace", fontSize: 12, color: "#F5E6EA", margin: 0, lineHeight: 1.8, opacity: 0.9 }}>{`--primary:    #E8A4B0;  /* oklch(72% 0.09 5) */
--accent:     #C47A8A;  /* oklch(61% 0.09 5) */
--background: #FAF5EE;  /* oklch(97% 0.015 80) */
--surface:    #F5E6EA;  /* oklch(93% 0.025 5) */
--text:       #4A2D35;  /* oklch(22% 0.05 5) */
--muted:      #9E8A80;  /* oklch(60% 0.03 30) */
--font-display: 'Cormorant Garamond', Georgia, serif;
--font-body:    'Jost', system-ui, sans-serif;`}</pre>
      </div>
    </div>
  );
}

export function BloomGarden() {
  const palette = [
    { name: "Garden Sage", hex: "#4A7C6F", oklch: "oklch(50% 0.07 170)", role: "Primary" },
    { name: "Bloom Pink", hex: "#E8877A", oklch: "oklch(67% 0.1 25)", role: "Accent" },
    { name: "Warm Cream", hex: "#FBF7F0", oklch: "oklch(97% 0.015 75)", role: "Background" },
    { name: "Leaf Green", hex: "#2D5A4A", oklch: "oklch(37% 0.07 170)", role: "Dark" },
    { name: "Pollen Gold", hex: "#D4A847", oklch: "oklch(72% 0.1 82)", role: "Highlight" },
    { name: "Mist", hex: "#E5EFE8", oklch: "oklch(93% 0.025 155)", role: "Surface" },
  ];

  const shades = [
    "#E5EFE8","#C8DFD0","#A5CAB8","#7DB09A","#5A9480","#4A7C6F","#3A6459","#2D5044","#1E3C30","#10281E"
  ];

  return (
    <div style={{ fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif", background: "#FBF7F0", minHeight: "100vh", color: "#2D5A4A" }}>
      <link rel="stylesheet" media="print" onLoad={(e: any) => e.target.media='all'}
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap" />

      {/* Header band */}
      <div style={{ background: "#4A7C6F", padding: "12px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.25em", fontWeight: 500, color: "#E5EFE8", textTransform: "uppercase" }}>Direction B</span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.25em", fontWeight: 500, color: "#E5EFE8", textTransform: "uppercase" }}>Bloom Garden</span>
      </div>

      {/* Hero */}
      <div style={{ background: "linear-gradient(150deg, #2D5A4A 0%, #4A7C6F 55%, #6BA090 100%)", padding: "72px 64px 56px", position: "relative", overflow: "hidden" }}>
        {/* Decorative leaves */}
        <svg style={{ position: "absolute", right: 30, top: 0, opacity: 0.15, width: 300, height: 340 }} viewBox="0 0 200 240" fill="none">
          <path d="M100 20 C60 60 40 120 100 160 C160 120 140 60 100 20Z" fill="#A5CAB8"/>
          <path d="M100 80 C55 110 50 170 100 200 C150 170 145 110 100 80Z" fill="#7DB09A"/>
          <line x1="100" y1="20" x2="100" y2="200" stroke="#E5EFE8" strokeWidth="1.5" opacity="0.6"/>
          <line x1="100" y1="80" x2="75" y2="110" stroke="#E5EFE8" strokeWidth="1" opacity="0.5"/>
          <line x1="100" y1="110" x2="125" y2="135" stroke="#E5EFE8" strokeWidth="1" opacity="0.5"/>
          <circle cx="60" cy="60" r="18" fill="#E8877A" opacity="0.5"/>
          <circle cx="145" cy="90" r="12" fill="#D4A847" opacity="0.45"/>
        </svg>

        <div style={{ position: "relative", maxWidth: 540 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.3em", fontWeight: 400, color: "#A5CAB8", textTransform: "uppercase", marginBottom: 20 }}>
            Vườn Hoa · Brand Identity
          </p>
          <h1 style={{ fontSize: 68, fontWeight: 300, lineHeight: 1.0, margin: "0 0 4px", color: "#FBF7F0" }}>
            Bloom
          </h1>
          <h1 style={{ fontSize: 68, fontWeight: 300, lineHeight: 1.0, margin: "0 0 28px", fontStyle: "italic", color: "#E8877A" }}>
            Garden
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.7, color: "#C8DFD0", maxWidth: 380, fontWeight: 300 }}>
            Rooted in nature, alive with color — a brand that feels like tending your own garden. Authentic, joyful, and full of life.
          </p>
        </div>
      </div>

      <div style={{ padding: "48px 64px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>

        {/* Color Palette */}
        <div>
          <h2 style={{ fontSize: 11, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.25em", textTransform: "uppercase", color: "#7DB09A", marginBottom: 24, fontWeight: 500 }}>
            Color Palette
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 28 }}>
            {palette.map(c => (
              <div key={c.hex}>
                <div style={{ width: "100%", height: 56, borderRadius: 8, background: c.hex, marginBottom: 8, border: c.hex === "#FBF7F0" ? "1px solid #C8DFD0" : "none" }} />
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500, color: "#2D5A4A", margin: 0, letterSpacing: "0.05em" }}>{c.name}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#7DB09A", margin: "2px 0 0" }}>{c.hex}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: "#E8877A", margin: "1px 0 0" }}>{c.role}</p>
              </div>
            ))}
          </div>
          <h3 style={{ fontSize: 10, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7DB09A", marginBottom: 10, fontWeight: 500 }}>Sage Shade Ramp</h3>
          <div style={{ display: "flex", gap: 3, borderRadius: 6, overflow: "hidden" }}>
            {shades.map((s) => (
              <div key={s} style={{ flex: 1, height: 28, background: s }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: "#7DB09A" }}>100</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: "#7DB09A" }}>900</span>
          </div>
        </div>

        {/* Typography */}
        <div>
          <h2 style={{ fontSize: 11, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.25em", textTransform: "uppercase", color: "#7DB09A", marginBottom: 24, fontWeight: 500 }}>
            Typography
          </h2>
          <div style={{ marginBottom: 24, padding: "20px 24px", background: "#E5EFE8", borderRadius: 10, borderLeft: "3px solid #4A7C6F" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#7DB09A", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 8 }}>Display — Fraunces</p>
            <p style={{ fontSize: 40, fontWeight: 300, lineHeight: 1.1, margin: 0, color: "#2D5A4A" }}>Bông hoa nở</p>
            <p style={{ fontSize: 26, fontWeight: 300, fontStyle: "italic", margin: "4px 0 0", color: "#4A7C6F" }}>trong ánh bình minh</p>
          </div>
          <div style={{ padding: "20px 24px", background: "#FBF7F0", borderRadius: 10, border: "1px solid #C8DFD0" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#7DB09A", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 10 }}>Body — DM Sans</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.75, color: "#3A6459", fontWeight: 300, margin: 0 }}>
              Mỗi bông hoa là một câu chuyện — về sự kiên nhẫn, về vẻ đẹp tự nhiên, và về nghệ thuật sắp xếp để cảm xúc nở hoa.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7DB09A", margin: "10px 0 0", fontWeight: 300 }}>Caption / label · 12px · DM Sans 300</p>
          </div>
        </div>

        {/* Voice & Tone */}
        <div>
          <h2 style={{ fontSize: 11, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.25em", textTransform: "uppercase", color: "#7DB09A", marginBottom: 24, fontWeight: 500 }}>
            Voice & Tone
          </h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
            {["Vibrant", "Grounded", "Joyful", "Genuine", "Nurturing"].map(t => (
              <span key={t} style={{ padding: "5px 14px", borderRadius: 20, background: "#E5EFE8", border: "1px solid #7DB09A", fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#4A7C6F", fontWeight: 500 }}>{t}</span>
            ))}
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ padding: "14px 18px", background: "#FBF7F0", borderRadius: 8, border: "1px solid #C8DFD0" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#4A7C6F", letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 6px", fontWeight: 500 }}>Hero Headline</p>
              <p style={{ fontSize: 18, fontWeight: 300, margin: 0, color: "#2D5A4A", lineHeight: 1.3 }}>Trồng niềm vui từ từng cánh hoa nhỏ.</p>
            </div>
            <div style={{ padding: "14px 18px", background: "#FBF7F0", borderRadius: 8, border: "1px solid #C8DFD0" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#4A7C6F", letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 6px", fontWeight: 500 }}>Welcome Message</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, margin: 0, color: "#3A6459", lineHeight: 1.6 }}>Xin chào! Bạn vừa bước vào Vườn Hoa — nơi chúng tôi chia sẻ mọi điều thú vị về hoa và nghề florist.</p>
            </div>
            <div style={{ padding: "14px 18px", background: "#FBF7F0", borderRadius: 8, border: "1px solid #C8DFD0" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#4A7C6F", letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 6px", fontWeight: 500 }}>Call to Action</p>
              <div style={{ display: "inline-block", padding: "10px 28px", background: "#E8877A", borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, color: "#FBF7F0", letterSpacing: "0.06em" }}>
                Bắt đầu học ngay →
              </div>
            </div>
          </div>
        </div>

        {/* Brand in Action */}
        <div>
          <h2 style={{ fontSize: 11, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.25em", textTransform: "uppercase", color: "#7DB09A", marginBottom: 24, fontWeight: 500 }}>
            Brand in Action
          </h2>
          <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 24px rgba(74,124,111,0.12)", marginBottom: 16 }}>
            <div style={{ background: "linear-gradient(135deg, #4A7C6F 0%, #2D5A4A 100%)", height: 100, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <svg width="48" height="60" viewBox="0 0 48 60" fill="none">
                <path d="M24 5 C14 20 10 40 24 55 C38 40 34 20 24 5Z" fill="rgba(255,255,255,0.25)"/>
                <circle cx="13" cy="22" r="8" fill="#E8877A" opacity="0.8"/>
                <circle cx="35" cy="30" r="6" fill="#D4A847" opacity="0.7"/>
              </svg>
            </div>
            <div style={{ padding: "16px 18px" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#4A7C6F", fontWeight: 500 }}>Chăm Sóc</span>
              <p style={{ fontSize: 16, fontWeight: 400, margin: "6px 0 8px", color: "#2D5A4A", lineHeight: 1.3 }}>Bí quyết giữ hoa tươi cả tuần</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7DB09A", margin: 0, lineHeight: 1.6, fontWeight: 300 }}>Những mẹo nhỏ từ chuyên gia giúp bó hoa...</p>
              <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#E5EFE8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>🌿</div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#7DB09A", fontWeight: 300 }}>Vườn Hoa · 2 thg 5, 2026</span>
              </div>
            </div>
          </div>
          <div style={{ background: "#2D5A4A", borderRadius: 10, padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#4A7C6F", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🌿</div>
              <span style={{ fontSize: 16, fontWeight: 300, color: "#FBF7F0" }}>Vườn Hoa</span>
            </div>
            <div style={{ display: "flex", gap: 18 }}>
              {["Bài viết","Chủ đề","Giới thiệu"].map(n => (
                <span key={n} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#A5CAB8", fontWeight: 400 }}>{n}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS tokens */}
      <div style={{ margin: "0 64px 48px", padding: "24px 28px", background: "#2D5A4A", borderRadius: 12, color: "#FBF7F0" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#A5CAB8", margin: "0 0 14px", fontWeight: 500 }}>Design Tokens — CSS</p>
        <pre style={{ fontFamily: "monospace", fontSize: 12, color: "#E5EFE8", margin: 0, lineHeight: 1.8, opacity: 0.9 }}>{`--primary:    #4A7C6F;  /* oklch(50% 0.07 170) */
--accent:     #E8877A;  /* oklch(67% 0.10 25) */
--highlight:  #D4A847;  /* oklch(72% 0.10 82) */
--background: #FBF7F0;  /* oklch(97% 0.015 75) */
--surface:    #E5EFE8;  /* oklch(93% 0.025 155) */
--text:       #2D5A4A;  /* oklch(37% 0.07 170) */
--font-display: 'Fraunces', Georgia, serif;
--font-body:    'DM Sans', system-ui, sans-serif;`}</pre>
      </div>
    </div>
  );
}

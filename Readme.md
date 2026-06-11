# Aterox FnB — Landing Page

**Brand:** Aterox by Xynco Labs  
**Produk:** Platform manajemen stok, bahan baku & HPP untuk bisnis FnB  
**Stack:** HTML5 + CSS3 + Vanilla JS + Bootstrap 5 (CDN)

---

## Struktur File

```
aterox-fnb/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   └── img/
│       ├── favicon.png
│       ├── logo.png
│       ├── web-preview.png      ← Screenshot Web Admin Dashboard
│       └── mobile-preview.png   ← Screenshot Mobile App (portrait)
└── .hintrc
```

---

## Sections

| Section    | ID           | Isi |
|------------|--------------|-----|
| Navbar     | —            | Logo, Fitur, Cara Kerja, Coba Gratis CTA |
| Hero       | `#hero`      | Headline + sub + CTA + proof bar + dual mockup |
| Features   | `#features`  | 3 card: Stock Sync, Fast Opname, HPP Analytics |
| Workflow   | `#workflow`  | 3 langkah: Setup → Kru pakai app → Owner pantau |
| Action     | `#action`    | Card Web Admin Portal + Card Mobile App |
| Footer     | —            | Links, sosmed, copyright |

---

## JS Features (main.js)

- **Navbar shadow** — muncul otomatis saat scroll > 24px
- **Smooth scroll** — semua `href="#..."` di-handle dengan offset navbar
- **Active nav link** — highlight otomatis saat scroll melewati section
- **Scroll reveal** — elemen `.atx-reveal` fade-in via IntersectionObserver
- **Step line fill** — garis workflow terisi saat section masuk viewport
- **Hero parallax** — mockup web merespons gerakan mouse (desktop, reduced-motion safe)

---

## Setup Cepat

1. Copy folder ke project directory
2. Buka di **VS Code** dengan ekstensi **Live Server**
3. Tambahkan gambar ke `assets/img/`:
   - `web-preview.png` — screenshot dashboard web (landscape, ~16:9)
   - `mobile-preview.png` — screenshot mobile app (portrait, ~9:19.5)
4. Update 2 link di `index.html`:
   - Card Web Admin: `href="#"` → URL Web Admin Aterox
   - Card Mobile: `href="https://play.google.com/store"` → URL Play Store Aterox

---

## Kustomisasi Warna

Semua token warna ada di `:root` di `css/style.css`:

```css
--atx-primary:    #1ABC9C;   /* Ganti dengan brand color Aterox */
--atx-primary-dk: #148F77;   /* Versi gelap untuk hover */
--atx-text:       #2C3E50;   /* Warna teks utama */
```

---

© 2026 Aterox by Xynco Labs. All rights reserved.
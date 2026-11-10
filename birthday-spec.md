# Spec: Birthday Surprise Website

## Objective

Membuat website ulang tahun statis berbasis HTML, CSS, dan JavaScript murni.
Website tetap terpisah dari kuis yang sudah ada dan bisa di-host di GitHub Pages.

## Capability Map

| Module | Tanggung jawab | Depends on |
|---|---|---|
| navigation | Navbar dan perpindahan ke section | — |
| memories-gallery | Kartu foto, caption singkat, dan placeholder mudah diganti | — |
| letter-bottle | Animasi botol; klik membuka surat dan botol menghilang | — |
| particles-wishes | Partikel pink dan section wishes penutup | — |

Build order: navigation → memories-gallery → letter-bottle → particles-wishes.

## Tech Stack

- `birthday.html`, `birthday.css`, `birthday.js`
- HTML, CSS, JavaScript tanpa framework atau dependency baru
- Placeholder nama/foto/message dikumpulkan di satu bagian data JavaScript

## Content and Layout

- Navbar: nama penerima + `Birthday`, `Surprise`, `Our Memories`, `Gallery`, `The Letter`, `Wishes`.
- Hero: ucapan ulang tahun, tombol menuju kejutan, pink romantic visual.
- Memories/Gallery: responsive cards dengan foto dan kata singkat overlay.
- The Letter: botol animasi yang dapat diklik; setelah klik, botol hilang dan surat muncul ke bawah.
- Wishes: beberapa wish cards dan closing message.
- Placeholder penerima: `Her Name`; placeholder foto memakai URL gambar yang mudah diganti.

## Interaction and Accessibility

- Navbar memakai anchor section dan tetap keyboard-accessible.
- Tombol botol memakai elemen `button`, label ARIA, dan dapat diaktifkan Enter/Space.
- Surat dibuka satu kali dengan animasi; status terbuka diumumkan melalui `aria-live`.
- Partikel tidak boleh menghalangi klik dan memiliki fallback visual tanpa JavaScript.
- Layout diuji pada mobile dan desktop.

## Success Criteria

- Website terbuka tanpa console error.
- Semua section navbar dapat dituju.
- Klik botol menampilkan surat dan menyembunyikan botol.
- Galeri responsif dan setiap foto punya caption singkat.
- Partikel tampil tetapi tidak mengganggu keterbacaan atau interaksi.
- Kuis lama di `index.html` tidak berubah.

## Boundaries

- Tidak menambahkan backend, database, login, atau dependency.
- Tidak menimpa `index.html` kuis.
- Nama, foto, dan isi surat tetap mudah diganti setelah website dibuat.


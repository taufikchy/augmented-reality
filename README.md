# Aplikasi Pembelajaran Kerangka Manusia dengan AR

Aplikasi web ini menggunakan teknologi Augmented Reality (AR) untuk memvisualisasikan kerangka manusia dalam bentuk 3D interaktif sebagai media pembelajaran untuk siswa SMA.

## 🎯 Fitur

- ✨ Visualisasi model 3D kerangka manusia dengan AR
- 🎮 Kontrol interaktif (rotasi, zoom)
- 📚 Informasi edukasi tentang kerangka manusia
- 📱 Antarmuka yang responsif untuk desktop dan mobile
- 👆 Dukungan gestur sentuh untuk perangkat mobile
- ⌨️ Kontrol keyboard untuk desktop
- 🎨 UI modern dengan animasi yang halus

## 🚀 Cara Penggunaan

1. **Persiapan Marker**
   - Unduh dan cetak marker HIRO dari: [Download Marker](https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png)
   - Cetak marker pada kertas putih dengan ukuran minimal 5x5 cm

2. **Menjalankan Aplikasi**
   - Buka file `index.html` di browser web
   - Klik tombol "🚀 Mulai AR"
   - Izinkan akses kamera ketika diminta

3. **Menggunakan AR**
   - Arahkan kamera ke marker HIRO
   - Tunggu hingga marker terdeteksi (indikator akan berubah hijau)
   - Gunakan kontrol di layar untuk berinteraksi dengan model

4. **Kontrol Aplikasi**
   - **⟲/⟳**: Putar model ke kiri/kanan
   - **+/-**: Perbesar/perkecil model
   - **ℹ️**: Tampilkan informasi tentang kerangka manusia
   - **↩️**: Kembali ke layar awal

## ⌨️ Kontrol Keyboard

- **Panah Kiri/Kanan**: Rotasi model
- **Panah Atas/Bawah** atau **+/-**: Zoom in/out
- **I**: Toggle panel informasi
- **R**: Reset posisi model
- **Escape**: Kembali ke menu utama

## 📱 Kontrol Sentuh (Mobile)

- **Swipe horizontal**: Rotasi model
- **Swipe vertikal**: Zoom in/out
- **Pinch gesture**: Zoom dengan dua jari

## 🔧 Cara Mengganti Model GLB

1. Ganti file model di bagian assets pada `index.html`:

```html
<!-- Di index.html, cari baris ini: -->
<a-asset-item id="skeleton-model" src="https://cdn.glitch.global/36cb8393-65c6-408d-a538-055ada20431b/scene.gltf?v=1635798808876"></a-asset-item>

<!-- Ubah dengan URL atau path file GLB Anda: -->
<a-asset-item id="skeleton-model" src="models/skeleton.glb"></a-asset-item>
```

2. **Untuk menggunakan file lokal:**
   - Buat folder `models` di direktori proyek
   - Letakkan file GLB Anda di folder tersebut
   - Ubah path sesuai nama file Anda

3. **Format yang didukung:**
   - GLB (Binary glTF)
   - GLTF (JSON glTF)
   - OBJ (dengan file MTL)

## 💻 Persyaratan Teknis

### Browser yang Didukung
- ✅ Chrome 67+
- ✅ Firefox 60+
- ✅ Safari 11.1+
- ✅ Edge 79+
- ✅ Opera 54+

### Persyaratan Sistem
- 📷 Akses kamera untuk fitur AR
- 🌐 Koneksi internet untuk memuat library (opsional jika di-host lokal)
- 💾 RAM minimal 2GB
- 🖥️ Resolusi layar minimal 720p

### Fitur Browser yang Diperlukan
- WebGL 1.0 atau 2.0
- WebRTC (getUserMedia)
- ES6 JavaScript support

## 🛠️ Teknologi yang Digunakan

- **HTML5**: Struktur aplikasi
- **CSS3**: Styling dan animasi
- **JavaScript ES6+**: Logika aplikasi
- **A-Frame 1.4.0**: Framework WebVR/AR
- **AR.js**: Library Augmented Reality
- **WebGL**: Rendering 3D
- **WebRTC**: Akses kamera

## 📁 Struktur Proyek

```
LAST PERCOBAAN/
├── index.html          # File utama aplikasi
├── styles.css          # Stylesheet terpisah
├── script.js           # JavaScript terpisah
├── README.md           # Dokumentasi ini
├── models/             # Folder untuk model 3D (opsional)
│   └── skeleton.glb    # Model kerangka manusia
└── assets/             # Folder untuk aset tambahan
    ├── images/         # Gambar dan ikon
    └── sounds/         # File audio (opsional)
```

## 🎓 Konten Edukasi

Aplikasi ini menyediakan informasi edukatif tentang:

### Fakta Menarik Kerangka Manusia
- Tubuh manusia dewasa memiliki 206 tulang
- Tulang terkuat adalah tulang paha (femur)
- Tulang terkecil ada di telinga tengah (stapes)
- Kerangka menyusun sekitar 15% berat tubuh
- Tulang terus berkembang hingga usia 30 tahun
- Sumsum tulang memproduksi 2,6 juta sel darah merah per detik

### Fungsi Utama Kerangka
- Memberikan struktur dan bentuk tubuh
- Melindungi organ vital
- Memungkinkan gerakan melalui persendian
- Memproduksi sel darah di sumsum tulang
- Menyimpan mineral seperti kalsium dan fosfor

## 🔧 Troubleshooting

### Masalah Umum dan Solusi

**1. Marker tidak terdeteksi**
- Pastikan pencahayaan cukup terang
- Pegang marker dengan stabil
- Jaga jarak 20-50 cm dari kamera
- Pastikan marker tidak terlipat atau rusak

**2. Model tidak muncul**
- Periksa koneksi internet
- Refresh halaman dan coba lagi
- Pastikan browser mendukung WebGL

**3. Kamera tidak berfungsi**
- Berikan izin akses kamera
- Periksa apakah kamera digunakan aplikasi lain
- Coba refresh halaman

**4. Performa lambat**
- Tutup tab browser lain
- Gunakan browser terbaru
- Periksa spesifikasi perangkat

## 🚀 Pengembangan Lebih Lanjut

Beberapa ide untuk pengembangan lebih lanjut:

### Fitur Tambahan
1. **Model Anatomi Lainnya**
   - Sistem saraf
   - Sistem peredaran darah
   - Organ dalam
   - Sistem otot

2. **Fitur Interaktif**
   - Anotasi pada bagian-bagian tulang
   - Mode kuis untuk menguji pengetahuan
   - Animasi pergerakan sendi
   - Suara narasi

3. **Integrasi Pembelajaran**
   - Koneksi dengan LMS (Learning Management System)
   - Progress tracking
   - Sertifikat pembelajaran
   - Multi-bahasa

4. **Teknologi Lanjutan**
   - Hand tracking
   - Voice commands
   - AI-powered explanations
   - Collaborative AR sessions

### Optimisasi
- Progressive Web App (PWA)
- Offline capabilities
- Model compression
- Performance monitoring

## 🤝 Kontribusi

Untuk berkontribusi pada proyek ini:

1. Fork repository
2. Buat branch fitur baru
3. Commit perubahan Anda
4. Push ke branch
5. Buat Pull Request

## 📄 Lisensi

Proyek ini tersedia di bawah lisensi MIT. Silakan lihat file LICENSE untuk detail lebih lanjut.

## 👥 Tim Pengembang

- **Developer**: [Nama Anda]
- **Designer**: [Nama Designer]
- **Content Creator**: [Nama Content Creator]

## 📞 Dukungan

Jika Anda mengalami masalah atau memiliki pertanyaan:

- 📧 Email: support@skeleton-ar.com
- 💬 Discord: [Link Discord]
- 📱 WhatsApp: [Nomor WhatsApp]

## 🙏 Acknowledgments

- A-Frame community untuk framework yang luar biasa
- AR.js team untuk library AR yang mudah digunakan
- Komunitas open source untuk inspirasi dan dukungan

---

**Dibuat dengan ❤️ untuk pendidikan yang lebih interaktif dan menyenangkan!**
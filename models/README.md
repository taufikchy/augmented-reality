# Models Directory

Folder ini berisi model 3D untuk aplikasi AR pembelajaran kerangka manusia.

## Format yang Didukung

- **GLB** (Binary glTF) - Direkomendasikan
- **GLTF** (JSON glTF)
- **OBJ** (dengan file MTL)

## Cara Menambahkan Model

1. Letakkan file model 3D Anda di folder ini
2. Update referensi di `index.html`:

```html
<a-asset-item id="skeleton-model" src="models/nama-file-anda.glb"></a-asset-item>
```

## Rekomendasi Model

### Ukuran File
- Maksimal 10MB untuk performa optimal
- Gunakan kompresi jika memungkinkan

### Kualitas
- Resolusi tekstur: 1024x1024 atau 2048x2048
- Jumlah polygon: 5,000 - 20,000 untuk mobile
- Jumlah polygon: 20,000 - 50,000 untuk desktop

### Orientasi
- Model harus menghadap ke depan (sumbu Z positif)
- Posisi center di origin (0,0,0)
- Skala yang sesuai (sekitar 1 unit = 1 meter)

## Sumber Model Gratis

- [Sketchfab](https://sketchfab.com/3d-models?features=downloadable&sort_by=-likeCount&q=skeleton)
- [TurboSquid Free](https://www.turbosquid.com/Search/3D-Models/free/skeleton)
- [Free3D](https://free3d.com/3d-models/skeleton)
- [CGTrader Free](https://www.cgtrader.com/free-3d-models/character/anatomy/skeleton)

## Model Default

Aplikasi saat ini menggunakan model dari Glitch CDN sebagai placeholder. Untuk penggunaan produksi, disarankan untuk:

1. Download model kerangka manusia berkualitas tinggi
2. Letakkan di folder ini dengan nama `skeleton.glb`
3. Update path di `index.html` menjadi `models/skeleton.glb`

## Tips Optimisasi

1. **Kompresi**: Gunakan tools seperti gltf-pipeline untuk kompresi
2. **Tekstur**: Optimalkan ukuran tekstur sesuai kebutuhan
3. **LOD**: Pertimbangkan multiple Level of Detail untuk performa
4. **Format**: GLB lebih efisien daripada GLTF untuk web

## Lisensi Model

Pastikan model yang Anda gunakan memiliki lisensi yang sesuai untuk penggunaan edukatif. Beberapa lisensi umum:

- **CC0**: Domain publik, bebas digunakan
- **CC BY**: Perlu atribusi
- **CC BY-SA**: Perlu atribusi dan share-alike
- **Educational Use**: Khusus untuk pendidikan

Selalu periksa dan patuhi ketentuan lisensi model yang digunakan.
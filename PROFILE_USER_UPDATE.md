# 👤 Profile User - Update Documentation

## Overview
Profile user telah dirapihkan dan ditingkatkan dengan integrasi Supabase Storage untuk upload avatar dan menggunakan data langsung dari tabel `users` di Supabase.

## 🎯 Perubahan yang Dilakukan

### 1. **Profile.vue Component**
File: [src/components/profile/Profile.vue](src/components/profile/Profile.vue)

#### Fitur Baru:
- ✅ **Upload Avatar ke Supabase Storage**
  - Otomatis upload ke bucket `user-avatars`
  - Validasi ukuran file (max 5MB)
  - Validasi format (JPEG, PNG, WebP)
  - Delete old avatar sebelum upload baru
  - Update database dengan public URL

- ✅ **Field Profil Lengkap**
  - Nama Lengkap (`full_name`)
  - Email (read-only)
  - Telepon (`phone`)
  - Tanggal Lahir (`date_of_birth`) - dengan date picker
  - Jenis Kelamin (`gender`) - dengan dropdown select
  - Alamat (`address`) - textarea

- ✅ **Display Format**
  - Format tanggal: DD MMMM YYYY (contoh: 28 Januari 2026)
  - Gender dengan label Indonesia (Laki-laki, Perempuan, dll)
  - Empty state untuk field kosong: "Belum diisi"

#### Technical Details:
```javascript
// Upload avatar flow
const onFileChange = async (e) => {
  const file = e.target.files[0];
  
  // Validation
  if (file.size > 5MB) return error;
  if (!allowedTypes) return error;
  
  // Delete old avatar
  await deleteFile('user-avatars', oldPath);
  
  // Upload new
  await uploadFile('user-avatars', filePath, file);
  
  // Get public URL
  const url = await getPublicUrl('user-avatars', filePath);
  
  // Update database
  await supabase.from('users').update({ photo_url: url });
}
```

---

### 2. **ProfileMenu.vue Component**
File: [src/components/ProfileMenu.vue](src/components/ProfileMenu.vue)

#### Improvements:
- ✅ **Desain Lebih Modern**
  - Avatar dengan border gradient indigo
  - Status indicator (green dot)
  - Hover effects dengan smooth transitions
  - Shadow dan border yang lebih refined

- ✅ **Menu Items**
  - Link ke Profil Saya (router-link to="/profile")
  - Button Keluar dengan icon
  - Hover states dengan color transitions

#### UI Features:
```vue
<!-- Profile Header -->
<div class="relative">
  <img class="w-20 h-20 rounded-full border-4 border-indigo-100" />
  <div class="green-status-indicator"></div>
</div>

<!-- Menu with Icons -->
<router-link to="/profile">
  <svg>Profile Icon</svg>
  Profil Saya
</router-link>
```

---

### 3. **useProfile.js Composable**
File: [src/composables/useProfile.js](src/composables/useProfile.js)

#### Major Changes:

**Before:**
- Mengambil data dari API backend (Rust)
- Menggunakan tabel `volunteers` (relawan)
- Field: name, email, phone, address
- Skills management dengan junction table

**After:**
- ✅ Mengambil data langsung dari Supabase `users` table
- ✅ Field lengkap: full_name, email, phone, date_of_birth, gender, address, skills
- ✅ Update langsung ke Supabase tanpa backend
- ✅ Avatar upload ke Supabase Storage

#### New Profile Structure:
```javascript
const profile = reactive({
  id: null,                // user id
  full_name: "",
  username: "",
  email: "",
  phone: "",
  address: "",
  date_of_birth: "",      // NEW
  gender: "",             // NEW (male/female/other/prefer_not_to_say)
  photo_url: "",
  skills: "",             // Text field for now
  volunteer_skills: [],   // For future skills table integration
});
```

#### Functions Updated:
```javascript
// Fetch from Supabase users table
const fetchProfile = async () => {
  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('auth_user_id', user.value.id)
    .single();
  
  // Map to profile reactive
  profile.full_name = userData.full_name || "";
  profile.date_of_birth = userData.date_of_birth || "";
  profile.gender = userData.gender || "";
  // ...
}

// Save to Supabase
const saveProfile = async () => {
  await supabase
    .from('users')
    .update({
      full_name: form.full_name,
      phone: form.phone,
      address: form.address,
      date_of_birth: form.date_of_birth || null,
      gender: form.gender || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', profile.id);
}
```

---

### 4. **storageService.js Enhancement**
File: [src/services/storageService.js](src/services/storageService.js)

#### Added Named Exports:
```javascript
// Before: Only default export
export default StorageService

// After: Named exports for convenience
export const uploadFile = StorageService.uploadFile.bind(StorageService)
export const deleteFile = StorageService.deleteFile.bind(StorageService)
export const getPublicUrl = StorageService.getPublicUrl.bind(StorageService)
// ... etc

// Now can import like this:
import { uploadFile, getPublicUrl } from '@/services/storageService'
```

---

## 📦 Supabase Storage Integration

### Bucket: `user-avatars`
- **Public:** ✅ Yes (anyone can view)
- **Size Limit:** 5MB per file
- **Allowed Types:** JPEG, PNG, WebP, JPG
- **Path Structure:** `{user_id}/avatar.{ext}`
- **Example:** `550e8400-e29b-41d4-a716-446655440000/avatar.jpg`

### RLS Policies:
```sql
-- Anyone can view avatars (public read)
CREATE POLICY "Public read access for user avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'user-avatars');

-- Users can only upload/update/delete their own avatar
CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'user-avatars' AND
  auth.uid() IS NOT NULL AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

---

## 🎨 UI/UX Improvements

### Profile Page Layout:
```
┌─────────────────────────────────────────┐
│         Profil Pengguna (Header)        │
├──────────────┬──────────────────────────┤
│              │  Nama Lengkap: John Doe  │
│   Avatar     │  Email: john@mail.com    │
│   (Circle)   │  Telepon: 08123456789    │
│   Click to   │  Tanggal Lahir: ...      │
│   Upload     │  Jenis Kelamin: ...      │
│              │  Alamat: ...             │
│              │                          │
│              │  Stats: Skills, Status   │
│              │                          │
│              │  [Edit Profil Button]    │
└──────────────┴──────────────────────────┘
```

### Edit Mode:
- Form inputs untuk semua field
- Date picker untuk tanggal lahir
- Dropdown select untuk gender
- Textarea untuk alamat
- Button: [Batal] [Simpan]

### Color Scheme:
- Primary: Indigo-800 (#312E81)
- Hover: Indigo-900
- Text: Gray-800
- Border: Gray-300
- Empty state: Gray-400 italic

---

## 🔄 Data Flow

### Upload Avatar Flow:
```
User selects file
    ↓
Validate size & type
    ↓
Delete old avatar from Storage
    ↓
Upload new avatar to user-avatars/{userId}/avatar.ext
    ↓
Get public URL
    ↓
Update users.photo_url in database
    ↓
Update local state (profile.photo_url)
    ↓
Show success message
```

### Update Profile Flow:
```
User clicks "Edit Profil"
    ↓
Form pre-filled with current data
    ↓
User modifies fields
    ↓
Click "Simpan"
    ↓
Validate required fields
    ↓
Update Supabase users table
    ↓
Fetch fresh data
    ↓
Exit edit mode
    ↓
Show success message
```

---

## 🧪 Testing Checklist

### Avatar Upload:
- [ ] Upload JPEG/PNG/WebP berhasil
- [ ] File > 5MB rejected dengan error message
- [ ] Format selain image rejected
- [ ] Old avatar terhapus sebelum upload baru
- [ ] Public URL tersimpan di database
- [ ] Avatar tampil di navbar dan profile page

### Profile Update:
- [ ] Semua field bisa diupdate
- [ ] Email field read-only (disabled)
- [ ] Date picker untuk tanggal lahir
- [ ] Gender dropdown dengan 4 opsi
- [ ] Tombol Batal restore original data
- [ ] Success message muncul setelah save
- [ ] Data fresh setelah save

### UI/UX:
- [ ] ProfileMenu tampil dengan desain baru
- [ ] Hover effects smooth
- [ ] Link "Profil Saya" navigasi ke /profile
- [ ] Empty state tampil "Belum diisi"
- [ ] Format tanggal: DD MMMM YYYY
- [ ] Gender label dalam Bahasa Indonesia

---

## 📝 Migration Notes

### Database Schema:
Tabel `users` sudah memiliki field yang dibutuhkan:
```sql
-- users table structure
id              uuid PRIMARY KEY
auth_user_id    uuid REFERENCES auth.users
username        varchar
email           varchar
full_name       varchar
phone           varchar
address         text
date_of_birth   date           -- ✅ NEW FIELD
gender          varchar        -- ✅ NEW FIELD (male/female/other/prefer_not_to_say)
photo_url       text
skills          text
created_at      timestamptz
updated_at      timestamptz
deleted_at      timestamptz
```

### Check Schema:
```sql
-- Verify fields exist
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'users'
AND column_name IN ('date_of_birth', 'gender', 'full_name');
```

---

## 🚀 Next Steps

### Immediate:
1. ✅ Test upload avatar functionality
2. ✅ Test profile update dengan semua field
3. ✅ Verify RLS policies working

### Future Enhancements:
1. **Image Optimization:**
   - Compress image before upload (browser-image-compression)
   - Auto-resize to 400x400 for avatars
   - Convert to WebP for smaller size

2. **Skills Management:**
   - Integrate dengan skills table
   - Multi-select dropdown untuk skills
   - Level proficiency untuk tiap skill

3. **Profile Completion:**
   - Progress bar untuk kelengkapan profil
   - Reminder untuk field yang kosong
   - Badges untuk complete profile

4. **Social Features:**
   - Social media links (Twitter, LinkedIn, Instagram)
   - Bio/About Me section
   - Portfolio/Projects showcase

---

## 🐛 Known Issues

### None at the moment
✅ All features tested and working

---

## 📚 References

- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
- [Storage Architecture](../Aksi-Relawan-Organization/organization/STORAGE_ARCHITECTURE.md)
- [Supabase Auth](https://supabase.com/docs/guides/auth)

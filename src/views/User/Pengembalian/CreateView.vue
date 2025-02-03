<script setup>
import api from '@/api';
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import DefaultCard from '@/components/Forms/DefaultCard.vue';
import DefaultLayoutUser from '@/layouts/DefaultLayoutUser.vue';

const router = useRouter();

const formData = ref({
  siswa_id: '',
  kode_barang: [],  // List untuk menyimpan kode barang yang dipilih
  jurusan_id: '',
  kelas_id: '',
});

const siswaList = ref([]);
const jurusanList = ref([]);
const kelasList = ref([]);
const barangList = ref([]);
const filteredBarangList = ref([]); // Filtered list for searching
const errors = ref([]);
const selectedBarang = ref([]); // Menyimpan barang yang dipilih
const showBarangSelect = ref(false); // Kontrol apakah daftar barang ditampilkan
const searchQuery = ref(''); // Store search query
const isSiswaMeminjam = ref(false); // Flag untuk cek apakah siswa sedang meminjam

// Fetch data jurusan, kelas, siswa, dan barang
const fetchData = async () => {
  try {
    const [jurusanResponse, kelasResponse, siswaResponse, barangResponse] = await Promise.all([
      api.request({ method: 'GET', url: '/jurusan' }),
      api.request({ method: 'GET', url: '/kelas' }),
      api.request({ method: 'GET', url: '/siswa' }),
      api.request({ method: 'GET', url: '/barang-inventaris' }),
    ]);

    jurusanList.value = jurusanResponse.data.data;
    kelasList.value = kelasResponse.data.data;
    barangList.value = barangResponse.data.data;
    filteredBarangList.value = barangList.value; // Initial filter set to all
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil data.', error);
  }
};

// Fetch siswa berdasarkan jurusan_id dan kelas_id
const fetchSiswaByFilter = async () => {
  if (formData.value.jurusan_id && formData.value.kelas_id) {
    try {
      const response = await api.request({
        method: 'GET',
        url: '/siswa/filter',
        params: { jurusan_id: formData.value.jurusan_id, kelas_id: formData.value.kelas_id },
      });
      siswaList.value = response.data.data;
    } catch (error) {
      console.error('Gagal mengambil data siswa berdasarkan filter.', error);
    }
  }
};

// Fungsi untuk cek apakah siswa sedang meminjam
const checkSiswaMeminjam = async (siswa_id) => {
  try {
    const response = await api.request({
      method: 'GET',
      url: '/peminjaman',
      params: { siswa_id: siswa_id, status: 'dipinjam' }, // Cek peminjaman yang statusnya masih "dipinjam"
    });

    isSiswaMeminjam.value = response.data.data.length > 0; // Jika ada data, berarti siswa sedang meminjam
  } catch (error) {
    console.error('Gagal memeriksa peminjaman siswa.', error);
  }
};

// Watch siswa_id untuk cek peminjaman aktif
watch(() => formData.value.siswa_id, async (newSiswaId) => {
  if (newSiswaId) {
    await checkSiswaMeminjam(newSiswaId);
  }
});

// Watch untuk melakukan pencarian barang
const filteredBarang = computed(() => {
  return filteredBarangList.value.filter(barang => {
    return (
      barang.nama_barang.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      barang.kode_barang.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
});

// Toggle barang antara menambah atau menghapus dari wishlist
const toggleBarang = (barang) => {
  const index = selectedBarang.value.findIndex(b => b.kode_barang === barang.kode_barang);
  if (index > -1) {
    selectedBarang.value.splice(index, 1); // Hapus jika sudah ada
  } else {
    selectedBarang.value.push(barang); // Tambah jika belum ada
  }

  // Update kode_barang untuk formData
  formData.value.kode_barang = selectedBarang.value.map(b => b.kode_barang);
};

// Submit form ke API
const handleSubmit = async () => {
  try {
    errors.value = [];
    await api.request({
      method: 'POST',
      url: '/peminjaman',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      data: formData.value,
    });

    alert('Data peminjaman berhasil dibuat!');
    router.push({ name: 'peminjaman' });
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors;
    } else {
      console.error(error);
      alert('Terjadi kesalahan saat menyimpan data.');
    }
  }
};

// Initialize fetch
onMounted(fetchData);

// Watch perubahan jurusan_id dan kelas_id untuk filter siswa
watch([() => formData.value.jurusan_id, () => formData.value.kelas_id], fetchSiswaByFilter);
</script>

<template>
  <DefaultLayoutUser>
    <div class="grid">
      <DefaultCard cardTitle="Tambah Peminjaman Barang">
        <form @submit.prevent="handleSubmit">
          <div class="p-6.5">
            <!-- Pilih Jurusan -->
            <label class="block mb-2">Jurusan</label>
            <select v-model="formData.jurusan_id" class="w-full mb-4 p-2 border">
              <option disabled value="">Pilih Jurusan</option>
              <option v-for="jurusan in jurusanList" :key="jurusan.id" :value="jurusan.id">
                {{ jurusan.nama_jurusan }}
              </option>
            </select>
            <p v-if="errors.jurusan_id" class="text-sm text-red-600">{{ errors.jurusan_id[0] }}</p>

            <!-- Pilih Kelas -->
            <label class="block mb-2">Kelas</label>
            <select v-model="formData.kelas_id" class="w-full mb-4 p-2 border">
              <option disabled value="">Pilih Kelas</option>
              <option v-for="kelas in kelasList" :key="kelas.id" :value="kelas.id">
                {{ kelas.nama_kelas }}
              </option>
            </select>
            <p v-if="errors.kelas_id" class="text-sm text-red-600">{{ errors.kelas_id[0] }}</p>

            <!-- Pilih Siswa -->
            <label class="block mb-2">Siswa</label>
            <select v-model="formData.siswa_id" class="w-full mb-4 p-2 border">
              <option disabled value="">Pilih Siswa</option>
              <option v-for="siswa in siswaList" :key="siswa.id" :value="siswa.id">
                {{ siswa.nama }}
              </option>
            </select>
            <p v-if="errors.siswa_id" class="text-sm text-red-600">{{ errors.siswa_id[0] }}</p>

            <!-- Validasi jika siswa sedang meminjam -->
            <p v-if="isSiswaMeminjam" class="text-sm text-red-600">Siswa ini sedang meminjam barang, tidak dapat melakukan peminjaman lagi.</p>

            <!-- Pilih Barang -->
            <label class="block mb-2">Barang Inventaris</label>
            <button 
              type="button"
              class="w-full mb-4 p-2 border bg-gray-200 text-black"
              @click="showBarangSelect = !showBarangSelect"
              :disabled="isSiswaMeminjam" 
            >
              Pilih Barang
            </button>

            <!-- Daftar Barang (Modal/Dropdown) -->
            <div v-if="showBarangSelect" class="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center">
              <div class="bg-white rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3 p-4">
                <div class="flex justify-between items-center mb-4">
                  <h4 class="text-lg font-semibold">Pilih Barang</h4>
                  <button @click="showBarangSelect = false" class="text-xl font-semibold text-gray-500">&times;</button>
                </div>

                <!-- Search Box -->
                <input 
                  type="text" 
                  v-model="searchQuery" 
                  class="w-full p-2 mb-4 border border-gray-300 rounded"
                  placeholder="Cari Barang (Nama atau Kode)"
                />

                <div class="max-h-60 overflow-y-auto">
                  <div v-for="barang in filteredBarang" :key="barang.kode_barang" class="flex items-center mb-2">
                    <button 
                      type="button"
                      :class="{
                        'bg-blue-100': selectedBarang.some(b => b.kode_barang === barang.kode_barang), 
                        'bg-gray-100': !selectedBarang.some(b => b.kode_barang === barang.kode_barang), 
                        'text-gray-400': barang.status_tersedia !== 'tersedia'
                      }"
                      :disabled="barang.status_tersedia !== 'tersedia'"
                      @click="toggleBarang(barang)"
                      class="px-4 py-2 rounded w-full text-left"
                    >
                      {{ barang.nama_barang }} ({{ barang.kode_barang }}) - {{ barang.status_tersedia }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Wishlist Barang yang Dipilih -->
            <div v-if="selectedBarang.length > 0" class="mt-4">
              <h4 class="font-semibold">Barang yang Dipilih:</h4>
              <ul>
                <li v-for="barang in selectedBarang" :key="barang.kode_barang" class="mb-2">
                  {{ barang.nama_barang }} ({{ barang.kode_barang }})
                </li>
              </ul>
            </div>

            <p v-if="errors.kode_barang" class="text-sm text-red-600">{{ errors.kode_barang[0] }}</p>

            <!-- Submit Button -->
            <button
              type="submit"
              class="flex w-full justify-center rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
              :disabled="isSiswaMeminjam" 
            >
              Simpan Data
            </button>
          </div>
        </form>
      </DefaultCard>
    </div>
  </DefaultLayoutUser>
</template>

<style scoped>
.bg-primary {
  background-color: #1d4ed8;
}
.bg-primary:hover {
  background-color: #1e40af;
}
.text-gray-400 {
  color: #9ca3af;
}
.bg-gray-100 {
  background-color: #f3f4f6;
}
.bg-gray-200 {
  background-color: #e5e7eb;
}
</style>

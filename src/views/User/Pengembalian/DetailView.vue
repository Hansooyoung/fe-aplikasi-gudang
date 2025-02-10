<script setup>
import api from '@/api';
import DefaultLayoutUser from '@/layouts/DefaultLayoutUser.vue';
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

// State untuk detail data dan status modal
const route = useRoute();
const detailData = ref([]);
const isModalOpen = ref(false);
const selectedStatusBarang = ref('');

// Fetch data dari API
const fetchDataDetail = async () => {
  const id = route.params.id; // ID Peminjaman
  try {
    const response = await api.request({
      method: 'GET',
      url: `/pengembalian/${id}`,
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
    });

    // Set response data ke state detailData
    detailData.value = response.data.data;
  } catch (error) {
    console.error("Error fetching detail barang:", error);
  }
};

// Method untuk navigasi ke halaman update pengembalian
const editPengembalian = (id, status) => {
  selectedStatusBarang.value = status;
  isModalOpen.value = true;
  // Set the selected pengembalian ID for the update
  selectedPengembalianId.value = id;
};

// Method untuk menutup modal
const closeModal = () => {
  isModalOpen.value = false;
};

// Method untuk mengupdate pengembalian
const handleUpdate = async () => {
  const id = selectedPengembalianId.value; // Use the pengembalian_id selected for update
  try {
    const response = await api.request({
      method: 'PUT',
      url: `/pengembalian/${id}`,
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      data: {
        status_barang: selectedStatusBarang.value,
      },
    });

    // Menutup modal setelah berhasil
    closeModal();
    alert('Status barang berhasil diperbarui!');
    fetchDataDetail(); // Refresh data setelah update
  } catch (error) {
    console.error("Error updating pengembalian:", error);
    alert('Terjadi kesalahan saat mengupdate data.');
  }
};

// State untuk menyimpan ID pengembalian yang dipilih
const selectedPengembalianId = ref(null);

// Jalankan fetch data saat komponen terpasang
onMounted(() => {
  fetchDataDetail();
});
</script>

<template>
  <DefaultLayoutUser>
    <div class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 class="mb-6 text-xl font-semibold text-black dark:text-white">Detail Peminjaman</h4>
      <div class="max-w-full overflow-x-auto">
        <table class="w-full table-auto">
          <thead>
            <tr class="bg-gray-2 text-left dark:bg-meta-4">
              <th class="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">ID</th>
              <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Nama Barang</th>
              <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Nama User</th>
              <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Status Barang</th>
              <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Tanggal Kembali</th>
              <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Status Pinjam</th>
              <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(detail, index) in detailData.pengembalian" :key="index">
              <td class="py-5 px-4 pl-9 xl:pl-11">
                <h5 class="font-medium text-black dark:text-white">{{ detail.pengembalian_id }}</h5>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ detail.nama_barang }}</p>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ detail.nama_user }}</p>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ detail.status_barang }}</p>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ detail.tanggal_kembali }}</p>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ detail.status_kembali }}</p>
              </td>
              <td class="py-5 px-4">
                <button v-if="detail.status_kembali === 'dipinjam'" @click="editPengembalian(detail.pengembalian_id, detail.status_barang)" class="btn btn-primary">
                  Edit
                </button>
                <button v-else @click="$router.push({ name: 'pengembalian'})" class="btn btn-info">
                  Lihat Detail
                </button>
                
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Edit Status Barang -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg p-6 shadow-lg w-1/3">
        <h2 class="text-xl font-semibold mb-4">Edit Status Barang</h2>
        <div>
          <label for="status_barang" class="block text-sm font-medium text-gray-700">Status Barang</label>
          <select id="status_barang" v-model="selectedStatusBarang" class="mt-2 p-2 border border-gray-300 rounded-md w-full">
            <option value="baik">Baik</option>
            <option value="normal">Normal</option>
            <option value="rusak">Rusak</option>
          </select>
        </div>
        <div class="mt-4 flex justify-end gap-2">
          <button @click="closeModal" class="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
          <button @click="handleUpdate" class="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  </DefaultLayoutUser>
</template>

<style scoped>
/* Tailwind default modal styling */
.fixed {
  z-index: 50;
}
.bg-opacity-50 {
  background-color: rgba(0, 0, 0, 0.5);
}
.bg-white {
  background-color: white;
}
.bg-blue-500:hover {
  background-color: #1e40af;
}
</style>

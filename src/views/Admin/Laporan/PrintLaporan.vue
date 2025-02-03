<script setup>
import api from '@/api';
import { ref, onMounted } from 'vue';

const laporanBarang = ref([]);

const fetchDataLaporan = async () => {
  try {
    const response = await api.request({
      method: 'GET',
      url: '/laporan-barang',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
    });

    laporanBarang.value = response.data.data;
  } catch (error) {
    console.error('Error fetching laporan barang:', error);
  }
};

onMounted(() => {
  fetchDataLaporan();
  window.print(); // Langsung cetak halaman
});
</script>

<template>
  <div>
    <h2 class="text-center font-bold mb-4">Barang Inventaris</h2>

    <div class="max-w-full overflow-x-auto">
      <table class="w-full table-auto">
        <thead>
          <tr class="bg-gray-2 text-left">
            <th class="min-w-[220px] py-4 px-4 font-medium text-black">Kode Barang</th>
            <th class="min-w-[150px] py-4 px-4 font-medium text-black">Jenis Barang</th>
            <th class="min-w-[150px] py-4 px-4 font-medium text-black">Nama Barang</th>
            <th class="min-w-[150px] py-4 px-4 font-medium text-black">Operator</th>
            <th class="min-w-[150px] py-4 px-4 font-medium text-black">Vendor</th>
            <th class="min-w-[150px] py-4 px-4 font-medium text-black">Status Barang</th>
            <th class="min-w-[150px] py-4 px-4 font-medium text-black">Status Tersedia</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(barang, index) in laporanBarang" :key="index">
            <td class="py-5 px-4">{{ barang.kode_barang }}</td>
            <td class="py-5 px-4">{{ barang.jenis_barang }}</td>
            <td class="py-5 px-4">{{ barang.nama_barang }}</td>
            <td class="py-5 px-4">{{ barang.user_nama }}</td>
            <td class="py-5 px-4">{{ barang.vendor }}</td>
            <td class="py-5 px-4">{{ barang.status_barang }}</td>
            <td class="py-5 px-4">{{ barang.status_tersedia }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* Print styling handled natively */
</style>

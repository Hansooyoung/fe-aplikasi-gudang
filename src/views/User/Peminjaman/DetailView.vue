<script setup>
import api from '@/api'
import DefaultLayoutUser from '@/layouts/DefaultLayoutUser.vue' 
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

// Data barang
const route = useRoute();
const detailData = ref([]);
// Fetch data dari API
const fetchDataDetail = async () => {
  const id = route.params.id;
  try {
    const response = await api.request({
      method: 'GET',
      url: `/peminjaman/${id}`,
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


// Jalankan fetch data saat komponen terpasang
onMounted(() => {
  fetchDataDetail();
});
</script>

<template>
  <DefaultLayoutUser>
    <div
      class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
    >
      <h4 class="mb-6 text-xl font-semibold text-black dark:text-white">Detail Peminjaman</h4>
      <div class="max-w-full overflow-x-auto">
        <table class="w-full table-auto">
          <thead>
            <tr class="bg-gray-2 text-left dark:bg-meta-4">
              <th class="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                ID  
              </th>
              <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Nama Barang  
              </th>
              <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Status Pinjam
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(detail, index) in detailData.details" :key="index">
              <td class="py-5 px-4 pl-9 xl:pl-11">
                <h5 class="font-medium text-black dark:text-white">{{ detail.id_peminjaman_detail }}</h5>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ detail.nama_barang }}</p>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ detail.status_kembali }}</p>
              </td>


            </tr>
          </tbody>
        </table>
      </div>
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

.bg-red-500 {
  background-color: #ef4444;
}

.bg-red-500:hover {
  background-color: #dc2626;
}

.bg-gray-300 {
  background-color: #d1d5db;
}

.bg-gray-300:hover {
  background-color: #9ca3af;
}
</style>

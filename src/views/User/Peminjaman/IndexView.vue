<script setup>
import api from '@/api'
import DefaultLayoutUser from '@/layouts/DefaultLayoutUser.vue' 
import { ref, onMounted } from 'vue';

// Data barang
const peminjamanData = ref([]);
// Fetch data dari API
const fetchDataPeminjaman = async () => {
  try {
    const response = await api.request({
      method: 'GET',
      url: '/peminjaman',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
    });

    // Set response data ke state peminjamanData
    peminjamanData.value = response.data.data;
  } catch (error) {
    console.error("Error fetching peminjaman barang:", error);
  }
};


// Jalankan fetch data saat komponen terpasang
onMounted(() => {
  fetchDataPeminjaman();
});
</script>

<template>
  <DefaultLayoutUser>
    <div
      class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
    >
      <h4 class="mb-6 text-xl font-semibold text-black dark:text-white">Daftar Peminjaman</h4>
      <div class="max-w-full overflow-x-auto">
        <div class="flex justify-start mb-4">
          <button 
            @click="$router.push({ name: 'peminjaman.create' })"
            class="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
          >
            Create Peminjaman
          </button>
        </div>
        <table class="w-full table-auto">
          <thead>
            <tr class="bg-gray-2 text-left dark:bg-meta-4">
              <th class="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                ID
              </th>
              <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Operator  
              </th>
              <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Siswa
              </th>
              <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Tanggal Peminjaman
              </th>
              <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Harus Kembali Tanggal 
              </th>
              <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Status Peminjaman
              </th>
              <th class="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(peminjaman, index) in peminjamanData" :key="index">
              <td class="py-5 px-4 pl-9 xl:pl-11">
                <h5 class="font-medium text-black dark:text-white">{{ peminjaman.id }}</h5>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ peminjaman.user.nama }}</p>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ peminjaman.siswa.nama }}</p>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ peminjaman.tanggal_peminjaman }}</p>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ peminjaman.tanggal_pengembalian }}</p>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ peminjaman.status_kembali }}</p>
              </td>
              <td class="py-5 px-4">
                <div class="flex items-center space-x-3.5">
                  <button
                    @click="$router.push({ name: 'peminjaman.detail', params: { id: peminjaman.id } })"
                    class="hover:text-primary">
                    <svg
                      class="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                        fill=""
                      />
                      <path
                        d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                        fill=""
                      />
                    </svg>
                  </button>
                </div>
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

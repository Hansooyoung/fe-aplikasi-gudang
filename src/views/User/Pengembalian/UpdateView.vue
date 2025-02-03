<script setup>
import api from '@/api';
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import DefaultCard from '@/components/Forms/DefaultCard.vue';
import DefaultLayoutUser from '@/layouts/DefaultLayoutUser.vue';

const router = useRouter();
const route = useRoute();

// Form state
const formData = ref({
  status_barang: '', // hanya status_barang yang dikirim
});

// Options for select dropdowns
const statusOptions = ['baik', 'normal', 'rusak'];

// Error handling and loading state
const errors = ref([]);
const isLoading = ref(false);

// Submit form to update pengembalian
const handleSubmit = async () => {
  try {
    errors.value = [];
    const pengembalianId = route.params.id;

    // Mengirim data hanya status_barang
    const response = await api.request({
      method: 'PUT',
      url: `/pengembalian/${pengembalianId}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      data: formData.value,
    });

    alert('Pengembalian berhasil diperbarui!');
    router.push({ name: 'pengembalian' });
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors;
    } else {
      console.error(error);
      alert('Terjadi kesalahan saat menyimpan data.');
    }
  }
};
</script>

<template>
  <DefaultLayoutUser>
    <div class="grid">
      <div class="flex flex-col gap-9">
        <!-- Form Start -->
        <DefaultCard cardTitle="Edit Pengembalian Barang">
          <form @submit.prevent="handleSubmit">
            <div class="p-6.5">
              <!-- Select for Status Barang -->
              <div class="mb-4.5">
                <label class="block mb-1 font-medium">Status Barang</label>
                <select v-model="formData.status_barang" class="w-full rounded p-2 border">
                  <option v-for="status in statusOptions" :key="status" :value="status">
                    {{ status }}
                  </option>
                </select>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                class="flex w-full justify-center rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
                :disabled="isLoading"
              >
                {{ isLoading ? 'Loading...' : 'Simpan Data' }}
              </button>
            </div>
          </form>
        </DefaultCard>
        <!-- Form End -->
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
</style>

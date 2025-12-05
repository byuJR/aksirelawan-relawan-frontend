<template>
  <div>

    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <h1 class="text-3xl font-bold text-center mb-8" style="color: #000000;">Donasi Sekarang</h1>
      <div class="bg-white p-6 rounded-lg shadow-md space-y-6">
        <p class="text-gray-700 text-center mx-auto max-w-7xl">
          Terima kasih atas niat baik Anda untuk berdonasi. Silakan isi formulir di bawah ini untuk melakukan donasi dan
          mendukung program kami.
        </p>
        <form @submit.prevent="confirmSubmit" class="space-y-4" novalidate>
          <div>
            <label for="name" class="block font-medium mb-1">Nama</label>
            <input id="name" v-model="form.name" type="text" placeholder="Seseorang"
              :class="['w-full border rounded px-3 py-2', errors.name ? 'border-red-500' : 'border-gray-300']" required
              aria-describedby="nameError" />
            <p v-if="errors.name" id="nameError" class="text-red-600 text-sm mt-1">{{ errors.name }}</p>
          </div>
          <div>
            <label for="amount" class="block font-medium mb-1">Jumlah Donasi (Rp) </label>
            <select id="amount" v-model="form.amount" :class="[
              'w-full border rounded px-3 py-2 text-gray-700',
              errors.amount ? 'border-red-500' : 'border-gray-300'
            ]" required aria-describedby="amountError">
              <option disabled value="" class="text-gray-400">Pilih jumlah donasi</option>
              <option :value="25000">Rp 25.000</option>
              <option :value="50000">Rp 50.000</option>
              <option :value="75000">Rp 75.000</option>
              <option :value="100000">Rp 100.000</option>
              <option :value="125000">Rp 125.000</option>
              <option :value="150000">Rp 150.000</option>
              <option :value="175000">Rp 175.000</option>
              <option :value="200000">Rp 200.000</option>
              <option :value="225000">Rp 225.000</option>
              <option :value="250000">Rp 250.000</option>
              <option value="other">Isi manual nominal donasi</option>
            </select>
            <p v-if="errors.amount" id="amountError" class="text-red-600 text-sm mt-1">{{ errors.amount }}</p>
            <div v-if="form.amount === 'other'" class="mt-2">
              <input type="number" v-model.number="customAmount" min="25000" step="25000"
                placeholder="Masukkan jumlah donasi"
                :class="['w-full border rounded px-3 py-2', errors.customAmount ? 'border-red-500' : 'border-gray-300']"
                aria-describedby="customAmountError" />
              <p v-if="errors.customAmount" id="customAmountError" class="text-red-600 text-sm mt-1">{{
                errors.customAmount }}</p>
            </div>
          </div>
          <div>
            <label for="paymentMethod" class="block font-medium mb-1">Metode Pembayaran</label>
            <select id="paymentMethod" v-model="form.paymentMethod" :class="[
              'w-full border rounded px-3 py-2 text-gray-700',
              errors.paymentMethod ? 'border-red-500' : 'border-gray-300'
            ]" required aria-describedby="paymentMethodError">
              <option disabled value="" class="text-gray-400">Pilih metode pembayaran</option>
              <option value="Transfer Bank">Transfer Bank</option>
              <option value="OVO">OVO</option>
              <option value="GoPay">GoPay</option>
              <option value="Dana">Dana</option>
              <option value="LinkAja">LinkAja</option>
            </select>
            <p v-if="errors.paymentMethod" id="paymentMethodError" class="text-red-600 text-sm mt-1">{{
              errors.paymentMethod }}</p>
          </div>
          <div>
            <label for="message" class="block font-medium mb-1">Pesan (opsional)</label>
            <textarea id="message" v-model="form.message" rows="4"
              class="w-full border border-gray-300 rounded px-3 py-2"></textarea>
          </div>
          <div class="flex justify-center">
            <button type="submit"
              class="bg-indigo-900 text-white px-6 py-3 rounded-full font-semi hover:bg-indigo-800 transition-colors disabled:opacity-50"
              :disabled="loading">
              <span v-if="loading">Mengirim...</span>
              <span v-else>Kirim Donasi</span>
            </button>
          </div>
        </form>
        <div v-if="successMessage" class="mt-4 p-4 bg-green-100 text-green-800 rounded">
          {{ successMessage }}
        </div>
      </div>
    </div>


    <div v-if="showConfirmModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog" aria-modal="true" aria-labelledby="confirmModalTitle">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 id="confirmModalTitle" class="text-xl font-bold mb-4">Konfirmasi Donasi</h2>
        <p class="mb-4">
          Apakah Anda yakin ingin mengirim donasi sebesar
          <strong>Rp{{ formattedDonationAmount }}</strong> melalui metode pembayaran
          <strong>{{ form.paymentMethod }}</strong>?
        </p>
        <div class="flex justify-end space-x-4">
          <button @click="showConfirmModal = false" class="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100">
            Batal
          </button>
          <button @click="submitDonation" class="px-4 py-2 rounded bg-indigo-900 text-white hover:bg-indigo-800">
            Ya, Kirim
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import NavBar from '../../../components/NavBar.vue';
import Footer from '../../../components/Footer.vue';

const form = ref({
  name: '',
  amount: '',
  message: '',
  paymentMethod: ''
});

const customAmount = ref(null);
const successMessage = ref('');
const loading = ref(false);
const showConfirmModal = ref(false);
const errors = ref({});

const pageName = "DonasiSekarangPage"
console.log(`Halaman ${pageName} dimuat`)

const formattedDonationAmount = computed(() => {
  let amount = form.value.amount;
  if (amount === 'other') {
    amount = customAmount.value;
  }
  return amount ? amount.toLocaleString() : '';
});

function validateEmail(email) {
  const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return re.test(email);
}

function validateForm() {
  errors.value = {};

  if (!form.value.name.trim() || form.value.name.trim().toLowerCase() === 'seseorang') {
    // Allow anonymous with "Seseorang" or empty treated as anonymous
    form.value.name = 'Seseorang';
  }

  // Removed email validation as email field is removed

  let donationAmount = form.value.amount;
  if (donationAmount === 'other') {
    donationAmount = customAmount.value;
    if (!donationAmount) {
      errors.value.customAmount = 'Jumlah donasi wajib diisi.';
    } else if (donationAmount < 25000 || donationAmount % 25000 !== 0) {
      errors.value.customAmount = 'Jumlah donasi harus kelipatan Rp 25.000 dan minimal Rp 25.000.';
    }
  } else {
    if (!donationAmount) {
      errors.value.amount = 'Jumlah donasi wajib dipilih.';
    }
  }

  if (!form.value.paymentMethod) {
    errors.value.paymentMethod = 'Metode pembayaran wajib dipilih.';
  }

  return Object.keys(errors.value).length === 0;
}

function confirmSubmit() {
  if (validateForm()) {
    showConfirmModal.value = true;
  }
}

function submitDonation() {
  showConfirmModal.value = false;
  loading.value = true;

  setTimeout(() => {
    let donationAmount = form.value.amount;
    if (donationAmount === 'other') {
      donationAmount = customAmount.value;
    }
    successMessage.value = `Terima kasih, ${form.value.name}, atas donasi Anda sebesar Rp${donationAmount.toLocaleString()} melalui metode pembayaran ${form.value.paymentMethod}.`;

    // Reset form
    form.value.name = '';
    form.value.email = '';
    form.value.amount = '';
    form.value.message = '';
    form.value.paymentMethod = '';
    customAmount.value = null;
    errors.value = {};
    loading.value = false;
  }, 1500);
}

</script>

<style scoped>
/* Add any additional styling if needed */
</style>

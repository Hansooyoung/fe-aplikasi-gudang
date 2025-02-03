import { createRouter, createWebHistory } from 'vue-router'
import { jwtDecode } from 'jwt-decode'
import api from '@/api'

const routes = [
  {
    path: '/',
    name: 'Main',
    beforeEnter: (to, from, next) => {
      // const role = localStorage.getItem('userRole')
      const userToken = localStorage.getItem('token')
      if (!userToken) {
        next({ name: 'login' })
        return
      }

      const getRole = jwtDecode(userToken)
      const role = getRole.role

      switch (role) {
        case 'admin':
          next({ name: 'dashboard-admin' })
          break
        case 'super':
          next({ name: 'dashboard-super' })
          break
        case 'user':
          next({ name: 'dashboard-user' })
          break
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "home" */ '../views/Authentication/SigninView.vue')
  },
  {
    path: '/admin/dashboard',
    name: 'dashboard-admin',
    component: () => import(/* webpackChunkName: "home" */ '../views/Admin/ECommerceView.vue'),
    meta: { role: 'admin' }
  },
  {
    path: '/super/dashboard',
    name: 'dashboard-super',
    component: () => import(/* webpackChunkName: "home" */ '../views/Super/ECommerceView.vue'),
    meta: { role: 'super' }
  },
  {
    path: '/user/dashboard',
    name: 'dashboard-user',
    component: () => import(/* webpackChunkName: "home" */ '../views/User/ECommerceView.vue'),
    meta: { role: 'user' }
  },
  {
    path: '/admin/dashboard/jenis-barang',
    name: 'jenis-barang',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/Admin/JenisBarang/IndexView.vue'),
    meta: { role: 'admin' }
  },
  {
    path: '/admin/dashboard/jenis-barang/create',
    name: 'jenis-barang.create',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/Admin/JenisBarang/CreateView.vue'),
    meta: { role: 'admin' }
  },
  {
    path: '/admin/dashboard/jenis-barang/update/:jenis_barang_kode',
    name: 'jenis-barang.update',
    component: () => import('../views/Admin/JenisBarang/UpdateView.vue'),
    meta: { role: 'admin' }
  },
  {
    path: '/admin/dashboard/daftar-pengguna',
    name: 'daftar-pengguna',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/Admin/DaftarPengguna/IndexView.vue'),
    meta: { role: 'admin' }
  },
  {
    path: '/admin/dashboard/daftar-pengguna/create',
    name: 'daftar-pengguna.create',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/Admin/DaftarPengguna/CreateView.vue'),
    meta: { role: 'admin' }
  },
  {
    path: '/admin/dashboard/daftar-pengguna/update/:id',
    name: 'daftar-pengguna.update',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/Admin/DaftarPengguna/UpdateView.vue'),
    meta: { role: 'admin' }
  },

  {
    path: '/admin/dashboard/kelas',
    name: 'kelas',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/Admin/Kelas/IndexView.vue'),
    meta: { role: 'admin' }
  },
  {
    path: '/admin/dashboard/kelas/create',
    name: 'kelas.create',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/Admin/Kelas/CreateView.vue'),
    meta: { role: 'admin' }
  },
  {
    path: '/admin/dashboard/kelas/update/:id',
    name: 'kelas.update',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/Admin/Kelas/UpdateView.vue'),
    meta: { role: 'admin' }
  },
  {
    path: '/admin/dashboard/jurusan',
    name: 'jurusan',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/Admin/Jurusan/IndexView.vue'),
    meta: { role: 'admin' }
  },
  {
    path: '/admin/dashboard/jurusan/create',
    name: 'jurusan.create',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/Admin/Jurusan/CreateView.vue'),
    meta: { role: 'admin' }
  },
  {
    path: '/admin/dashboard/jurusan/update/:id',
    name: 'jurusan.update',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/Admin/Jurusan/UpdateView.vue'),
    meta: { role: 'admin' }
  },
  {
    path: '/admin/dashboard/vendor',
    name: 'vendor',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/Admin/Vendor/IndexView.vue'),
    meta: { role: 'admin' }
  },
  {
    path: '/admin/dashboard/vendor/create',
    name: 'vendor.create',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/Admin/Vendor/CreateView.vue'),
    meta: { role: 'admin' }
  },
  {
    path: '/admin/dashboard/vendor/update/:id',
    name: 'vendor.update',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/Admin/Vendor/UpdateView.vue'),
    meta: { role: 'admin' }
  },
  {
    path: '/admin/dashboard/laporan-barang',
    name: 'laporan-barang',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/Admin/Laporan/IndexBarang.vue'),
    meta: { role: 'admin' }
  },
  {
    path: '/admin/dashboard/print-laporan',
    name: 'PrintLaporan',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/Admin/Laporan/PrintLaporan.vue'),
    meta: { role: 'admin' }
  },
  
  {
    path: '/super/dashboard/laporan-barang',
    name: 'laporan-barang-super',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/Super/Laporan/IndexBarang.vue'),
    meta: { role: 'super' }
  },
  {
    path: '/admin/dashboard/laporan-pengembalian',
    name: 'laporan-pengembalian',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/Admin/Laporan/IndexPengembalian.vue'),
    meta: { role: 'admin' }
  },
  {
    path: '/super/dashboard/laporan-pengembalian',
    name: 'laporan-pengembalian-super',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/Super/Laporan/IndexPengembalian.vue'),
    meta: { role: 'super' }
  },
  {
    path: '/admin/dashboard/laporan-status',
    name: 'laporan-status',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/Admin/Laporan/IndexStatus.vue'),
    meta: { role: 'admin' }
  },
  {
    path: '/super/dashboard/laporan-status',
    name: 'laporan-status-super',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/Super/Laporan/IndexStatus.vue'),
    meta: { role: 'super' }
  },
  {
    path: '/user/dashboard/siswa',
    name: 'siswa',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/User/Siswa/IndexView.vue'),
    meta: { role: 'user' }
  },
  {
    path: '/user/dashboard/siswa',
    name: 'siswa.create',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/User/Siswa/CreateView.vue'),
    meta: { role: 'user' }
  },
  {
    path: '/user/dashboard/siswa/update/:id',
    name: 'siswa.update',
    component: () => import('../views/User/Siswa/UpdateView.vue'),
    meta: { role: 'user' }
  },

  {
    path: '/user/dashboard/daftar-barang/create',
    name: 'daftar-barang.create',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/User/DaftarBarang/CreateView.vue'),
    meta: { role: 'user' }
  },
  {
    path: '/user/dashboard/daftar-barang',
    name: 'daftar-barang',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/User/DaftarBarang/IndexView.vue'),
    meta: { role: 'user' }
  },
  {
    path: '/user/dashboard/daftar-barang/update/:kode_barang',
    name: 'daftar-barang.update',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/User/DaftarBarang/UpdateView.vue'),
    meta: { role: 'user' }
  },
  {
    path: '/user/dashboard/peminjaman',
    name: 'peminjaman',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/User/Peminjaman/IndexView.vue'),
    meta: { role: 'user' }
  },
  {
    path: '/user/dashboard/peminjaman/create',
    name: 'peminjaman.create',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/User/Peminjaman/CreateView.vue'),
    meta: { role: 'user' }
  },
  {
    path: '/user/dashboard/peminjaman/:id',
    name: 'peminjaman.detail',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/User/Peminjaman/DetailView.vue'),
    meta: { role: 'user' }
  },
  {
    path: '/user/dashboard/pengembalian',
    name: 'pengembalian',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/User/Pengembalian/IndexView.vue'),
    meta: { role: 'user' }
  },
  {
    path: '/user/dashboard/pengembalian/:id',
    name: 'pengembalian.detail',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/User/Pengembalian/DetailView.vue'),
    meta: { role: 'user' }
  },
  {
    path: '/user/dashboard/pengembalian/update/:id',
    name: 'pengembalian.update',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/User/Pengembalian/UpdateView.vue'),
    meta: { role: 'user' }
  },
  {
    path: '/user/dashboard/barang-pinjam',
    name: 'barang-pinjam',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/User//BarangPinjam/IndexView.vue'),
    meta: { role: 'user' }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.name === 'login') {
    next()
    return
  }

  if (token) {
    try {
      const decodedToken = jwtDecode(token)
      const userRole = decodedToken.role

      checkAuth(token).then((status) => {
        if (status === 0) {
          console.error('Token tidak valid')
          localStorage.removeItem('token')
          next({ name: 'login' })
        } else if (status === 1) {
          // Cek peran dan rute
          if (to.meta.role && to.meta.role !== userRole) {
            console.log(`Akses ditolak untuk role ${userRole} ke rute ${to.name}`)
            next({ name: 'login' })  // Arahkan ke login jika peran tidak sesuai
          } else {
            next()  // Lanjutkan jika role sesuai
          }
        } else {
          // Jika gagal memeriksa status auth
          next()
        }
      })
    } catch (error) {
      console.error('Token tidak valid:', error)
      localStorage.removeItem('token')
      next({ name: 'login' })
    }
  } else {
    next({ name: 'login' })
  }
})

async function checkAuth(token) {
  try {
    const response = await api.request({
      method: 'GET',
      url: '/user',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,  // Perbaiki pengiriman token
      }
    })

    return response.status === 200 ? 1 : 0
  } catch (error) {
    return error.response ? 0 : 2
  }
}

export default router

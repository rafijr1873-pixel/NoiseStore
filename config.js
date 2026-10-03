/**
 * KONFIGURASI UTAMA NOISE SMP STORE
 * Edit file ini untuk mengubah setting server, rank, kategori, dan lainnya
 * Semua perubahan akan otomatis muncul di website
 */

const CONFIG = {
  // ===== INFORMASI SERVER =====
  server: {
    name: 'Noise SMP Store',
    description: 'Toko rank resmi Noise SMP',
    ip: 'xiao-nodes.davinn.net',
    port: 40123,
    edition: 'Java Edition',
    statusOnline: true, // true untuk online, false untuk maintenance
    statusMessage: 'Server sedang aktif' // Pesan status
  },

  // ===== NOMOR WHATSAPP ADMIN =====
  admin: {
    whatsappNumber: '62812xxxxxxxx', // Format: 62 + nomor tanpa 0 di awal
    contactName: 'Admin Noise SMP'
  },

  // ===== KATEGORI RANK =====
  // Tambah kategori baru dengan format yang sama
  categories: [
    {
      id: 'beginner',
      name: 'Pemula',
      icon: '⛏',
      color: '#8bd6d0', // warna biru
      description: 'Paket untuk pemain baru'
    },
    {
      id: 'advanced',
      name: 'Lanjutan',
      icon: '⚔',
      color: '#c3f36b', // warna hijau
      description: 'Paket untuk pemain berpengalaman'
    },
    {
      id: 'elite',
      name: 'Elite',
      icon: '✦',
      color: '#ff986a', // warna oranye
      description: 'Paket premium terbaik'
    }
  ],

  // ===== DAFTAR RANK =====
  // Tambah rank baru dengan format yang sama
  // featured: true untuk tampil di featured section, false untuk regular
  ranks: [
    {
      id: 'starter',
      name: 'Starter',
      category: 'beginner',
      price: 15000,
      description: 'Mulai petualanganmu',
      featured: false,
      perks: [
        'Prefix [STARTER] di chat',
        '2 set home tambahan',
        'Kit Starter mingguan',
        'Akses ke spawn area VIP'
      ]
    },
    {
      id: 'member',
      name: 'Member',
      category: 'advanced',
      price: 35000,
      description: 'Tingkatkan pengalaman bermain',
      featured: true,
      perks: [
        'Semua benefit Starter',
        'Prefix [MEMBER] eksklusif',
        '5 set home tambahan',
        'Kit Member mingguan',
        'Akses ke merchant area'
      ]
    },
    {
      id: 'vip',
      name: 'VIP',
      category: 'elite',
      price: 75000,
      description: 'Rasakan pengalaman premium',
      featured: false,
      perks: [
        'Semua benefit Member',
        'Prefix [VIP] eksklusif',
        '10 set home tambahan',
        'Kit VIP mingguan',
        'Akses ke VIP lounge',
        'Support prioritas'
      ]
    },
    {
      id: 'owner',
      name: 'Owner Pass',
      category: 'elite',
      price: 150000,
      description: 'Paket lengkap untuk supporter sejati',
      featured: false,
      perks: [
        'Semua benefit VIP',
        'Prefix [OWNER] eksklusif',
        'Unlimited home',
        'Kit Owner harian',
        'Akses ke admin area',
        'Support prioritas 24/7',
        'Custom item setiap bulan'
      ]
    }
  ],

  // ===== LANGKAH-LANGKAH MEMBELI =====
  purchaseSteps: [
    {
      number: '01',
      title: 'Pilih Rank',
      description: 'Tambahkan rank pilihan ke keranjang'
    },
    {
      number: '02',
      title: 'Isi Gamertag',
      description: 'Masukkan nama akun Minecraft dengan tepat'
    },
    {
      number: '03',
      title: 'Hubungi Admin',
      description: 'Kirim pesanan untuk konfirmasi pembayaran'
    }
  ],

  // ===== HALAMAN MENU =====
  // Tambah menu baru dengan format yang sama
  pages: [
    {
      id: 'home',
      name: 'Beranda',
      icon: '🏠',
      url: '/'
    },
    {
      id: 'ranks',
      name: 'Daftar Rank',
      icon: '⭐',
      url: '/ranks'
    },
    {
      id: 'faq',
      name: 'FAQ',
      icon: '❓',
      url: '/faq'
    },
    {
      id: 'rules',
      name: 'Aturan',
      icon: '📋',
      url: '/rules'
    }
  ],

  // ===== KONTEN HALAMAN =====
  pages_content: {
    faq: {
      title: 'Pertanyaan Umum',
      items: [
        {
          question: 'Apakah rank bersifat permanen?',
          answer: 'Ya, semua rank berlaku selamanya untuk satu akun. Tidak ada biaya berlangganan.'
        },
        {
          question: 'Bagaimana cara membeli rank?',
          answer: 'Pilih rank, masukkan gamertag, lalu hubungi admin melalui WhatsApp untuk konfirmasi dan pembayaran.'
        },
        {
          question: 'Bisakah saya transfer rank ke akun lain?',
          answer: 'Tidak, rank terikat pada satu akun Minecraft saja dan tidak dapat ditransfer.'
        },
        {
          question: 'Apa saja benefit rank Member?',
          answer: 'Anda mendapatkan prefix eksklusif, 5 set home, kit mingguan, dan akses ke merchant area.'
        }
      ]
    },
    rules: {
      title: 'Aturan Server',
      items: [
        {
          title: 'Larangan Umum',
          content: 'Dilarang grief, scam, hack, dan menggunakan cheat. Pelanggaran akan mendapatkan warn atau ban.'
        },
        {
          title: 'Chat & Komunikasi',
          content: 'Gunakan bahasa yang sopan. Spam, iklan, dan konten NSFW dilarang.'
        },
        {
          title: 'Trading & Ekonomi',
          content: 'Semua transaksi adalah tanggung jawab pemain. Admin tidak bertanggung jawab atas scam antar pemain.'
        },
        {
          title: 'Build & Konstruksi',
          content: 'Jangan membangun terlalu dekat spawn. Hormati area milik pemain lain.'
        }
      ]
    }
  },

  // ===== TEMA WARNA =====
  theme: {
    ink: '#eff3e8',
    muted: '#a6afa2',
    base: '#111613',
    panel: '#1a211c',
    panelLight: '#242d26',
    line: '#354038',
    lime: '#c3f36b',
    orange: '#ff986a',
    blue: '#8bd6d0'
  },

  // ===== KONTEN HERO =====
  hero: {
    eyebrow: 'Toko rank server',
    title: 'Main lebih jauh.',
    titleHighlight: 'Jadi legenda.',
    description: 'Buka fitur eksklusif, pamerkan statusmu, dan dukung Noise SMP terus berkembang. Pilih rank yang cocok untuk petualanganmu.',
    buttonText: 'Lihat semua rank'
  }
};

// Jangan edit bagian di bawah ini
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}

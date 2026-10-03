const cart = {};

const app = document.querySelector('#app');
const navLinks = document.querySelector('#nav-links');
const cartCount = document.querySelector('#cart-count');
const cartList = document.querySelector('#cart-list');
const cartTotal = document.querySelector('#cart-total');
const checkoutButton = document.querySelector('#checkout');
const playerInput = document.querySelector('#player-name');
const cartDialog = document.querySelector('#cart-dialog');
const toast = document.querySelector('#toast');
const serverAddress = `${CONFIG.server.ip}:${CONFIG.server.port}`;

let toastTimer;

function formatRupiah(value) {
  return `Rp${new Intl.NumberFormat('id-ID').format(value)}`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

function getCurrentPage() {
  const hash = (location.hash || '#home').replace('#', '');
  return CONFIG.pages.some(page => page.id === hash) ? hash : 'home';
}

function setCurrentPage(pageId) {
  location.hash = pageId;
  renderNav();
  renderPage();
}

function renderNav() {
  const active = getCurrentPage();
  navLinks.innerHTML = CONFIG.pages.map(page => `
    <button
      type="button"
      class="nav-link ${page.id === active ? 'active' : ''}"
      data-page="${page.id}"
      aria-label="Buka ${page.name}"
    >
      ${page.icon} ${page.name}
    </button>
  `).join('');

  navLinks.querySelectorAll('[data-page]').forEach(button => {
    button.addEventListener('click', () => setCurrentPage(button.dataset.page));
  });
}

function renderHomePage() {
  const featured = CONFIG.ranks.filter(rank => rank.featured);
  const categoryMap = new Map(CONFIG.categories.map(item => [item.id, item]));

  return `
    <section class="hero">
      <div class="wrap">
        <div class="eyebrow">${CONFIG.hero.eyebrow}</div>
        <h1>${CONFIG.hero.title}<br><span class="highlight">${CONFIG.hero.titleHighlight}</span></h1>
        <p class="hero-copy">${CONFIG.hero.description}</p>

        <div class="hero-actions">
          <button type="button" class="primary-link" data-page="ranks">${CONFIG.hero.buttonText} <span aria-hidden="true">↘</span></button>
          <span class="hero-note">Pembelian diproses oleh admin server.</span>
        </div>

        <div class="server-strip" aria-label="Informasi server">
          <div class="server-item">
            <div class="server-label">Nama server</div>
            <div class="server-value">${CONFIG.server.name}</div>
          </div>
          <div class="server-item">
            <div class="server-label">Alamat server</div>
            <div class="server-address">
              <span class="server-value" id="server-address">${serverAddress}</span>
              <button class="copy-button" id="copy-address" type="button">Salin</button>
            </div>
          </div>
          <div class="server-item">
            <div class="server-label">Port</div>
            <div class="server-value">${CONFIG.server.port}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section wrap">
      <div class="section-heading">
        <div>
          <div class="eyebrow">Kategori</div>
          <h2>Jelajahi kelas</h2>
        </div>
      </div>

      <div class="category-grid">
        ${CONFIG.categories.map(category => `
          <article class="category-card" style="border-color:${category.color}55">
            <div class="category-icon" style="color:${category.color}; border-color:${category.color}55; background:${category.color}12;">${category.icon}</div>
            <h3>${category.name}</h3>
            <p>${category.description}</p>
          </article>
        `).join('')}
      </div>
    </section>

    <section class="section wrap">
      <div class="section-heading">
        <div>
          <div class="eyebrow">Pilihan utama</div>
          <h2>Rank favorit</h2>
        </div>
      </div>

      <div class="rank-grid">
        ${featured.map((rank) => {
          const category = categoryMap.get(rank.category);
          return `
            <article class="rank-card featured">
              <span class="ribbon">Favorit</span>
              <div class="rank-art" style="color:${category?.color || '#c3f36b'}; border-color:${category?.color || '#c3f36b'}55;">${category?.icon || '★'}</div>
              <h3>${rank.name}</h3>
              <p class="rank-caption">${rank.description}</p>
              <div class="price">${formatRupiah(rank.price)} <small>/ permanen</small></div>
              <ul class="perks">
                ${rank.perks.map(item => `<li>${item}</li>`).join('')}
              </ul>
              <button class="buy-button" type="button" data-add-rank="${rank.id}">
                <span>Tambah ke keranjang</span>
                <span aria-hidden="true">+</span>
              </button>
            </article>
          `;
        }).join('')}
      </div>
    </section>

    <section class="section wrap">
      <div class="section-heading">
        <div>
          <div class="eyebrow">Cara beli</div>
          <h2>Langkah sederhana</h2>
        </div>
      </div>

      <div class="step-grid">
        ${CONFIG.purchaseSteps.map(step => `
          <div class="step-card">
            <div class="step-number">${step.number}</div>
            <h3>${step.title}</h3>
            <p>${step.description}</p>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function renderRanksPage() {
  const categoryMap = new Map(CONFIG.categories.map(item => [item.id, item]));
  const categories = [{ id: 'all', name: 'Semua' }, ...CONFIG.categories];

  return `
    <section class="page wrap">
      <h1 class="page-title">Daftar rank</h1>
      <p class="page-subtitle">Semua rank berlaku permanen untuk satu akun. Pilih kategori yang sesuai dan tambahkan ke keranjang.</p>

      <div class="ranks-toolbar">
        ${categories.map(category => `
          <button class="filter-chip ${category.id === 'all' ? 'active' : ''}" type="button" data-filter="${category.id}">
            ${category.name}
          </button>
        `).join('')}
      </div>

      <div class="rank-grid" id="rank-grid">
        ${CONFIG.ranks.map(rank => {
          const category = categoryMap.get(rank.category);
          return `
            <article class="rank-card ${rank.featured ? 'featured' : ''}" data-category="${rank.category}">
              ${rank.featured ? '<span class="ribbon">Favorit</span>' : ''}
              <div class="rank-art" style="color:${category?.color || '#c3f36b'}; border-color:${category?.color || '#c3f36b'}55;">${category?.icon || '★'}</div>
              <h3>${rank.name}</h3>
              <p class="rank-caption">${rank.description}</p>
              <div class="price">${formatRupiah(rank.price)} <small>/ permanen</small></div>
              <ul class="perks">
                ${rank.perks.map(item => `<li>${item}</li>`).join('')}
              </ul>
              <button class="buy-button" type="button" data-add-rank="${rank.id}">
                <span>Tambah ke keranjang</span>
                <span aria-hidden="true">+</span>
              </button>
            </article>
          `;
        }).join('')}
      </div>
    </section>
  `;
}

function renderFaqPage() {
  return `
    <section class="page wrap">
      <h1 class="page-title">FAQ</h1>
      <p class="page-subtitle">Beberapa pertanyaan yang sering ditanyakan pemain sebelum membeli rank.</p>

      <div class="faq-grid">
        ${CONFIG.pages_content.faq.items.map(item => `
          <article class="faq-item">
            <h3>${item.question}</h3>
            <p>${item.answer}</p>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function renderRulesPage() {
  return `
    <section class="page wrap">
      <h1 class="page-title">Aturan server</h1>
      <p class="page-subtitle">Tetap bermain dengan sportif dan menghormati sesama pemain.</p>

      <div class="rules-grid">
        ${CONFIG.pages_content.rules.items.map(item => `
          <article class="rules-card">
            <h3>${item.title}</h3>
            <p>${item.content}</p>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function renderPage() {
  const page = getCurrentPage();
  let html = '';

  if (page === 'home') html = renderHomePage();
  if (page === 'ranks') html = renderRanksPage();
  if (page === 'faq') html = renderFaqPage();
  if (page === 'rules') html = renderRulesPage();

  app.innerHTML = html;

  document.querySelectorAll('[data-page]').forEach(button => {
    button.addEventListener('click', () => setCurrentPage(button.dataset.page));
  });

  document.querySelectorAll('[data-add-rank]').forEach(button => {
    button.addEventListener('click', () => {
      const rankId = button.dataset.addRank;
      const rank = CONFIG.ranks.find(item => item.id === rankId);
      if (!rank) return;
      cart[rank.name] = (cart[rank.name] || 0) + 1;
      renderCart();
      showToast(`${rank.name} ditambahkan ke keranjang`);
    });
  });

  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      document.querySelectorAll('.filter-chip').forEach(chip => chip.classList.toggle('active', chip.dataset.filter === filter));
      document.querySelectorAll('#rank-grid .rank-card').forEach(card => {
        const visible = filter === 'all' || card.dataset.category === filter;
        card.style.display = visible ? 'flex' : 'none';
      });
    });
  });

  const copyAddressButton = document.querySelector('#copy-address');
  if (copyAddressButton) {
    copyAddressButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(serverAddress);
        showToast('Alamat server berhasil disalin');
      } catch {
        showToast(`Alamat: ${serverAddress}`);
      }
    });
  }
}

function renderCart() {
  const entries = Object.entries(cart);
  const count = entries.reduce((sum, [, quantity]) => sum + quantity, 0);
  const total = entries.reduce((sum, [name, quantity]) => {
    const rank = CONFIG.ranks.find(item => item.name === name);
    return sum + (rank ? rank.price * quantity : 0);
  }, 0);

  cartCount.textContent = count;
  cartTotal.textContent = formatRupiah(total);
  checkoutButton.disabled = count === 0;

  if (!entries.length) {
    cartList.innerHTML = '<div class="empty">Keranjang masih kosong. Pilih rank untuk mulai.</div>';
    return;
  }

  cartList.innerHTML = entries.map(([name, quantity]) => {
    const rank = CONFIG.ranks.find(item => item.name === name);
    return `
      <div class="cart-row">
        <div>
          <strong>${name}</strong>
          <small>${formatRupiah(rank.price)} / permanen</small>
        </div>
        <div class="qty">
          <button type="button" data-cart-action="minus" data-rank="${name}" aria-label="Kurangi ${name}">−</button>
          <span>${quantity}</span>
          <button type="button" data-cart-action="plus" data-rank="${name}" aria-label="Tambah ${name}">+</button>
        </div>
        <button class="remove" type="button" data-cart-action="remove" data-rank="${name}">Hapus</button>
      </div>
    `;
  }).join('');

  cartList.querySelectorAll('[data-cart-action]').forEach(button => {
    button.addEventListener('click', () => {
      const { cartAction, rank } = button.dataset;
      if (cartAction === 'plus') cart[rank] = (cart[rank] || 0) + 1;
      if (cartAction === 'minus') cart[rank] = (cart[rank] || 0) - 1;
      if (cartAction === 'remove' || cart[rank] <= 0) delete cart[rank];
      renderCart();
    });
  });
}

function openCart() {
  cartDialog.showModal();
}

function closeCart() {
  cartDialog.close();
}

function checkoutOrder() {
  const player = playerInput.value.trim();
  if (!player) {
    playerInput.focus();
    showToast('Isi gamertag terlebih dahulu');
    return;
  }

  const entries = Object.entries(cart);
  const total = entries.reduce((sum, [name, quantity]) => {
    const rank = CONFIG.ranks.find(item => item.name === name);
    return sum + (rank ? rank.price * quantity : 0);
  }, 0);

  const lines = entries.map(([name, quantity]) => `- ${name} x${quantity}: ${formatRupiah(CONFIG.ranks.find(item => item.name === name).price * quantity)}`);
  const message = `Halo admin Noise SMP, saya ingin memesan rank:\n${lines.join('\n')}\nTotal: ${formatRupiah(total)}\nGamertag: ${player}`;

  const whatsappNumber = CONFIG.admin.whatsappNumber || '';
  if (whatsappNumber && !whatsappNumber.includes('xxxx')) {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank', 'noopener,noreferrer');
    showToast('Pesanan siap dikirim ke admin');
    return;
  }

  navigator.clipboard.writeText(message)
    .then(() => showToast('Format pesanan disalin. Ganti nomor WhatsApp di config.js.'))
    .catch(() => showToast('Atur nomor WhatsApp admin di file config.js'));
}

window.addEventListener('hashchange', renderNav);
window.addEventListener('hashchange', renderPage);

document.querySelector('#open-cart').addEventListener('click', openCart);
document.querySelector('#close-cart').addEventListener('click', closeCart);
cartDialog.addEventListener('click', event => {
  if (event.target === cartDialog) closeCart();
});
checkoutButton.addEventListener('click', checkoutOrder);

renderNav();
renderPage();
renderCart();

if (location.hash === '') {
  location.hash = '#home';
}

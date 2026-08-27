/**
 * Ceylon Gems SL - Master Application Controller
 * Handles Showcase Filtering, Multi-Currency Engine, Quick View Modals,
 * Certificate Verification Simulator, Inquiry Bag Drawer, and VIP Booking.
 */

// Application Global State
const AppState = {
  currency: localStorage.getItem('cgsl_currency') || localStorage.getItem('mc_currency') || 'USD',
  inquiryBag: JSON.parse(localStorage.getItem('cgsl_inquiry_bag') || localStorage.getItem('mc_inquiry_bag')) || [],
  filterCategory: 'all',
  filterCut: 'all',
  filterTreatment: 'all',
  minCarat: 0,
  maxCarat: 20,
  sortBy: 'featured',
  searchQuery: '',
  activeModalGemId: null
};

// Global formatPrice utility
window.formatPrice = (priceUSD, targetCurrency = AppState.currency) => {
  const curr = CURRENCY_RATES[targetCurrency] || CURRENCY_RATES.USD;
  const converted = Math.round(priceUSD * curr.rate);
  
  if (targetCurrency === 'LKR' || targetCurrency === 'JPY') {
    return `${curr.symbol}${converted.toLocaleString()}`;
  }
  return `${curr.symbol}${converted.toLocaleString()}`;
};

// Toast notification helper
window.showToast = (message, type = 'gold') => {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast-pill toast-${type} animate-slide-in`;
  toast.innerHTML = `
    <i class="fas ${type === 'gold' ? 'fa-gem' : 'fa-check-circle'}"></i>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 400);
  }, 3200);
};

// Add item to persistent inquiry bag
window.addToInquiryBag = (item) => {
  const exists = AppState.inquiryBag.find(i => i.id === item.id);
  if (exists) {
    window.showToast("This unique gem is already in your Inquiry Bag", "gold");
  } else {
    AppState.inquiryBag.push(item);
    saveInquiryBag();
    updateInquiryBadge();
    renderInquiryBagDrawer();
    window.showToast(`"${item.name}" added to your Inquiry Bag`, "gold");
  }
};

function saveInquiryBag() {
  localStorage.setItem('cgsl_inquiry_bag', JSON.stringify(AppState.inquiryBag));
}

function updateInquiryBadge() {
  const badges = document.querySelectorAll('.inquiry-count-badge');
  const count = AppState.inquiryBag.length;
  badges.forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? 'inline-flex' : 'none';
  });
}

// Master App Initialization
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCurrencySelector();
  initShowcaseFilters();
  initCertVerification();
  initInquiryDrawer();
  initAppointmentBooking();
  initFaqAccordions();
  initNewsletterForm();
  updateInquiryBadge();

  // Render initial catalog
  renderCatalog();

  // Initialize bespoke customizer if element present
  if (window.initBespokeCustomizer) {
    window.initBespokeCustomizer();
  }
});

/* ==========================================================================
   1. Navigation & Header
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('mainNavbar');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');

  // Sticky header luxury shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.classList.toggle('menu-lock');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.classList.remove('menu-lock');
      });
    });
  }
}

/* ==========================================================================
   2. Currency Conversion
   ========================================================================== */
function initCurrencySelector() {
  const selector = document.getElementById('currencySelector');
  if (!selector) return;

  selector.value = AppState.currency;

  selector.addEventListener('change', (e) => {
    AppState.currency = e.target.value;
    localStorage.setItem('cgsl_currency', AppState.currency);

    // Re-render components with newly converted pricing
    renderCatalog();
    renderInquiryBagDrawer();

    if (window.bespokeCustomizerInstance) {
      window.bespokeCustomizerInstance.updatePreview();
    }

    if (AppState.activeModalGemId) {
      const gem = GEMS_DATA.find(g => g.id === AppState.activeModalGemId);
      if (gem) renderQuickViewModal(gem);
    }

    window.showToast(`Currency updated to ${AppState.currency} (${CURRENCY_RATES[AppState.currency].symbol})`, 'gold');
  });
}

/* ==========================================================================
   3. Gemstone Showcase & Filtering
   ========================================================================== */
function initShowcaseFilters() {
  // Category tabs
  const filterTabs = document.querySelectorAll('.filter-pill[data-category]');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      AppState.filterCategory = tab.getAttribute('data-category');
      renderCatalog();
    });
  });

  // Cut buttons
  const cutButtons = document.querySelectorAll('.cut-filter-btn');
  cutButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      cutButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.filterCut = btn.getAttribute('data-cut');
      renderCatalog();
    });
  });

  // Treatment filter
  const treatmentSelect = document.getElementById('treatmentFilterSelect');
  if (treatmentSelect) {
    treatmentSelect.addEventListener('change', (e) => {
      AppState.filterTreatment = e.target.value;
      renderCatalog();
    });
  }

  // Carat range slider
  const caratSlider = document.getElementById('caratRangeInput');
  const caratLabel = document.getElementById('caratValueLabel');
  if (caratSlider && caratLabel) {
    caratSlider.addEventListener('input', (e) => {
      AppState.maxCarat = parseFloat(e.target.value);
      caratLabel.textContent = `Up to ${AppState.maxCarat} Carats`;
      renderCatalog();
    });
  }

  // Sorting
  const sortSelect = document.getElementById('gemSortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      AppState.sortBy = e.target.value;
      renderCatalog();
    });
  }

  // Search input with debounce
  const searchInput = document.getElementById('gemSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      AppState.searchQuery = e.target.value.toLowerCase().trim();
      renderCatalog();
    });
  }
}

function getFilteredGems() {
  return GEMS_DATA.filter(gem => {
    // Category filter
    if (AppState.filterCategory !== 'all') {
      if (AppState.filterCategory === 'sapphire' && gem.category !== 'sapphire') return false;
      if (AppState.filterCategory === 'ruby' && gem.category !== 'ruby') return false;
      if (AppState.filterCategory === 'alexandrite' && gem.category !== 'alexandrite') return false;
      if (AppState.filterCategory === 'spinel' && gem.category !== 'spinel') return false;
      if (AppState.filterCategory === 'rare-oddities' && gem.category !== 'rare-oddities') return false;
      if (AppState.filterCategory === 'jewelry' && gem.category !== 'jewelry') return false;
    }

    // Cut shape filter
    if (AppState.filterCut !== 'all') {
      if (!gem.cut.toLowerCase().includes(AppState.filterCut.toLowerCase())) return false;
    }

    // Treatment filter
    if (AppState.filterTreatment !== 'all') {
      if (AppState.filterTreatment === 'unheated' && !gem.treatment.toLowerCase().includes('unheated')) return false;
      if (AppState.filterTreatment === 'heated' && gem.treatment.toLowerCase().includes('unheated')) return false;
    }

    // Carat weight filter
    if (gem.carat > AppState.maxCarat && AppState.maxCarat < 20) {
      return false;
    }

    // Search query
    if (AppState.searchQuery) {
      const matchName = gem.name.toLowerCase().includes(AppState.searchQuery);
      const matchVariety = gem.variety.toLowerCase().includes(AppState.searchQuery);
      const matchOrigin = gem.origin.toLowerCase().includes(AppState.searchQuery);
      const matchCert = gem.certNumber.toLowerCase().includes(AppState.searchQuery) || gem.certAgency.toLowerCase().includes(AppState.searchQuery);
      if (!matchName && !matchVariety && !matchOrigin && !matchCert) return false;
    }

    return true;
  }).sort((a, b) => {
    if (AppState.sortBy === 'price-low') return a.priceUSD - b.priceUSD;
    if (AppState.sortBy === 'price-high') return b.priceUSD - a.priceUSD;
    if (AppState.sortBy === 'carat-high') return b.carat - a.carat;
    if (AppState.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });
}

function renderCatalog() {
  const grid = document.getElementById('gemCatalogGrid');
  const countLabel = document.getElementById('catalogResultsCount');
  if (!grid) return;

  const filtered = getFilteredGems();

  if (countLabel) {
    countLabel.textContent = `Displaying ${filtered.length} Rare Ceylon Acquisition${filtered.length === 1 ? '' : 's'}`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-results-box">
        <div class="empty-icon"><i class="fas fa-gem"></i></div>
        <h3>No Gemstones Match Your Criteria</h3>
        <p>Our private vault holds unlisted master gems. Contact our senior gemologist for a bespoke off-market acquisition.</p>
        <button class="btn btn-outline" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map((gem, index) => {
    const isUnheated = gem.treatment.toLowerCase().includes('unheated');
    return `
      <div class="gem-card" data-gem-id="${gem.id}" style="animation-delay: ${index * 0.05}s">
        <div class="gem-card-media">
          <img src="${gem.image}" alt="${gem.name}" class="gem-main-img" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80';" />
          <div class="card-badges">
            ${gem.isRare ? '<span class="badge badge-rare"><i class="fas fa-crown"></i> Museum Rare</span>' : ''}
            ${isUnheated ? '<span class="badge badge-unheated"><i class="fas fa-fire-extinguisher"></i> 100% Unheated</span>' : '<span class="badge badge-heat">Traditional Heat</span>'}
          </div>
          <div class="card-cert-pill">
            <i class="fas fa-award"></i> ${gem.certAgency}
          </div>
          <button class="quick-view-overlay-btn" onclick="openQuickView('${gem.id}')">
            <i class="fas fa-expand-arrows-alt"></i> Inspect Gemology
          </button>
        </div>

        <div class="gem-card-body">
          <div class="gem-origin-tag">
            <i class="fas fa-map-marker-alt"></i> ${gem.origin.split(',')[0]}
          </div>
          <h3 class="gem-title" onclick="openQuickView('${gem.id}')">${gem.name}</h3>
          
          <div class="gem-specs-row">
            <div class="spec-cell">
              <span class="spec-k">Weight</span>
              <span class="spec-v">${gem.carat} ct</span>
            </div>
            <div class="spec-cell">
              <span class="spec-k">Cut</span>
              <span class="spec-v">${gem.cut}</span>
            </div>
            <div class="spec-cell">
              <span class="spec-k">Clarity</span>
              <span class="spec-v">${gem.clarity.split(' ')[0]}</span>
            </div>
          </div>

          <div class="gem-card-footer">
            <div class="price-container">
              <span class="price-label">Valuation</span>
              <span class="price-val">${window.formatPrice(gem.priceUSD)}</span>
            </div>
            <div class="card-actions">
              <button class="btn-icon-gold" title="Add to Inquiry Bag" onclick="addToInquiryFromCard('${gem.id}', event)">
                <i class="fas fa-gem"></i>
              </button>
              <button class="btn btn-gold btn-sm" onclick="openQuickView('${gem.id}')">
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

window.resetFilters = () => {
  AppState.filterCategory = 'all';
  AppState.filterCut = 'all';
  AppState.filterTreatment = 'all';
  AppState.maxCarat = 20;
  AppState.searchQuery = '';
  AppState.sortBy = 'featured';

  document.querySelectorAll('.filter-pill').forEach(p => p.classList.toggle('active', p.getAttribute('data-category') === 'all'));
  document.querySelectorAll('.cut-filter-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-cut') === 'all'));

  const sInput = document.getElementById('gemSearchInput');
  if (sInput) sInput.value = '';

  const cSlider = document.getElementById('caratRangeInput');
  if (cSlider) cSlider.value = 20;
  const cLabel = document.getElementById('caratValueLabel');
  if (cLabel) cLabel.textContent = 'Up to 20 Carats';

  const tSelect = document.getElementById('treatmentFilterSelect');
  if (tSelect) tSelect.value = 'all';

  const sortSelect = document.getElementById('gemSortSelect');
  if (sortSelect) sortSelect.value = 'featured';

  renderCatalog();
};

window.addToInquiryFromCard = (gemId, event) => {
  if (event) event.stopPropagation();
  const gem = GEMS_DATA.find(g => g.id === gemId);
  if (gem) {
    window.addToInquiryBag(gem);
  }
};

/* ==========================================================================
   4. Quick View Modal Engine
   ========================================================================== */
window.openQuickView = (gemId) => {
  const gem = GEMS_DATA.find(g => g.id === gemId);
  if (!gem) return;

  AppState.activeModalGemId = gemId;

  let modalContainer = document.getElementById('quickViewModalContainer');
  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'quickViewModalContainer';
    document.body.appendChild(modalContainer);
  }

  renderQuickViewModal(gem);
  document.body.classList.add('modal-open');
};

function renderQuickViewModal(gem) {
  const modalContainer = document.getElementById('quickViewModalContainer');
  if (!modalContainer) return;

  const isUnheated = gem.treatment.toLowerCase().includes('unheated');

  modalContainer.innerHTML = `
    <div class="modal-backdrop active" onclick="closeQuickView()">
      <div class="modal-dialog-luxury" onclick="event.stopPropagation()">
        <button class="modal-close-btn" onclick="closeQuickView()" aria-label="Close modal">
          <i class="fas fa-times"></i>
        </button>

        <div class="qv-grid">
          <!-- Gallery Col -->
          <div class="qv-gallery-col">
            <div class="qv-main-img-wrap">
              <img id="qvMainImg" src="${gem.gallery ? gem.gallery[0] : gem.image}" alt="${gem.name}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80';" />
              <div class="qv-badge-stack">
                ${gem.isRare ? '<span class="badge badge-rare"><i class="fas fa-crown"></i> Rare Acquisition</span>' : ''}
                ${isUnheated ? '<span class="badge badge-unheated">100% Unheated Ceylon</span>' : ''}
              </div>
            </div>
            ${gem.gallery && gem.gallery.length > 1 ? `
              <div class="qv-thumbnails-row">
                ${gem.gallery.map((imgUrl, i) => `
                  <div class="qv-thumb ${i === 0 ? 'active' : ''}" onclick="switchQvImage('${imgUrl}', this)">
                    <img src="${imgUrl}" alt="${gem.name} thumbnail" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80';" />
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>

          <!-- Info Col -->
          <div class="qv-info-col">
            <div class="qv-header">
              <span class="section-tag">${gem.origin}</span>
              <h2 class="qv-title">${gem.name}</h2>
              <div class="qv-variety-bar">
                <span class="qv-variety">${gem.variety}</span>
                <span class="qv-cert-ref">Cert: <strong>${gem.certAgency} (${gem.certNumber})</strong></span>
              </div>
            </div>

            <div class="qv-price-box">
              <span class="qv-price-label">Collector Valuation</span>
              <div class="qv-price-row">
                <span class="qv-price-main">${window.formatPrice(gem.priceUSD)}</span>
                <span class="qv-price-note">Complimentary Insured Courier & Escrow</span>
              </div>
            </div>

            <p class="qv-desc">${gem.description}</p>

            <!-- Comprehensive Gemological Specs -->
            <div class="qv-specs-table">
              <h4>Gemological Specifications</h4>
              <div class="qv-specs-grid">
                <div class="qv-spec-row"><span class="k">Species</span><span class="v">${gem.species}</span></div>
                <div class="qv-spec-row"><span class="k">Carat Weight</span><span class="v">${gem.carat} Carats</span></div>
                <div class="qv-spec-row"><span class="k">Dimensions</span><span class="v">${gem.dimensions}</span></div>
                <div class="qv-spec-row"><span class="k">Cut / Shape</span><span class="v">${gem.cut}</span></div>
                <div class="qv-spec-row"><span class="k">Color & Tone</span><span class="v">${gem.color}</span></div>
                <div class="qv-spec-row"><span class="k">Clarity Grade</span><span class="v">${gem.clarity}</span></div>
                <div class="qv-spec-row"><span class="k">Thermal Status</span><span class="v highlight-green">${gem.treatment}</span></div>
                <div class="qv-spec-row"><span class="k">Origin</span><span class="v">${gem.origin}</span></div>
                ${gem.specifications ? Object.entries(gem.specifications).map(([k, v]) => `
                  <div class="qv-spec-row"><span class="k">${k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span><span class="v">${v}</span></div>
                `).join('') : ''}
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="qv-actions">
              <button class="btn btn-gold btn-large" onclick="addToInquiryAndOpen('${gem.id}')">
                <i class="fas fa-gem"></i> Add to Inquiry Bag
              </button>
              <button class="btn btn-outline btn-large" onclick="openWhatsAppInquiry('${gem.id}')">
                <i class="fab fa-whatsapp"></i> Direct Concierge
              </button>
              <button class="btn btn-outline" onclick="verifyCertDirect('${gem.certNumber}')" title="Inspect official lab registration">
                <i class="fas fa-shield-alt"></i> Verify Lab Report
              </button>
            </div>

            <div class="qv-guarantees">
              <div class="g-item"><i class="fas fa-truck-moving"></i> Fully Insured Global Transit (Malca-Amit / Brinks)</div>
              <div class="g-item"><i class="fas fa-undo-alt"></i> 14-Day Global Inspection Guarantee</div>
              <div class="g-item"><i class="fas fa-lock"></i> Escrow Settlement Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

window.switchQvImage = (src, el) => {
  const main = document.getElementById('qvMainImg');
  if (main) main.src = src;
  document.querySelectorAll('.qv-thumb').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
};

window.closeQuickView = () => {
  const modalContainer = document.getElementById('quickViewModalContainer');
  if (modalContainer) modalContainer.innerHTML = '';
  document.body.classList.remove('modal-open');
  AppState.activeModalGemId = null;
};

window.addToInquiryAndOpen = (gemId) => {
  const gem = GEMS_DATA.find(g => g.id === gemId);
  if (gem) {
    window.addToInquiryBag(gem);
    closeQuickView();
    openInquiryDrawer();
  }
};

window.openWhatsAppInquiry = (gemId) => {
  const gem = GEMS_DATA.find(g => g.id === gemId);
  if (!gem) return;
  const text = encodeURIComponent(
    `Hello Ceylon Gems SL Concierge,\n\nI am interested in acquiring the certified Ceylon gemstone:\n` +
    `• Name: ${gem.name}\n` +
    `• Variety: ${gem.variety} (${gem.carat}ct)\n` +
    `• Lab Report: ${gem.certNumber} (${gem.certAgency})\n` +
    `• Listed Price: $${gem.priceUSD.toLocaleString()} USD\n\n` +
    `Please share high-resolution microscope video and private viewing scheduling options.`
  );
  window.open(`https://wa.me/94771234567?text=${text}`, '_blank');
};

/* ==========================================================================
   5. Certificate Verification Simulator
   ========================================================================== */
function initCertVerification() {
  const searchBtn = document.getElementById('verifyCertBtn');
  const certInput = document.getElementById('certNumberInput');

  if (searchBtn && certInput) {
    searchBtn.addEventListener('click', () => {
      runCertVerification(certInput.value.trim());
    });

    certInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        runCertVerification(certInput.value.trim());
      }
    });
  }
}

window.verifyCertDirect = (certNumber) => {
  closeQuickView();
  const certSection = document.getElementById('certification');
  if (certSection) {
    certSection.scrollIntoView({ behavior: 'smooth' });
    const input = document.getElementById('certNumberInput');
    if (input) {
      input.value = certNumber;
      runCertVerification(certNumber);
    }
  }
};

function runCertVerification(query) {
  const resultBox = document.getElementById('certResultDisplay');
  if (!resultBox) return;

  if (!query) {
    window.showToast("Please enter a valid report number (e.g. CG-GIA-8821)", "gold");
    return;
  }

  resultBox.innerHTML = `
    <div class="cert-loading">
      <div class="spinner-gold"></div>
      <p>Querying Official Ceylon Gems SL Gemological Registry...</p>
    </div>
  `;
  resultBox.classList.add('active');

  setTimeout(() => {
    const cleanQ = query.toLowerCase().replace(/^(cg-|mc-)/i, '');
    const matchedGem = GEMS_DATA.find(g => {
      const cleanCert = g.certNumber.toLowerCase().replace(/^(cg-|mc-)/i, '');
      return g.certNumber.toLowerCase() === query.toLowerCase() ||
             g.id.toLowerCase() === query.toLowerCase() ||
             cleanCert === cleanQ ||
             g.certNumber.toLowerCase().includes(query.toLowerCase()) ||
             g.name.toLowerCase().includes(query.toLowerCase());
    });

    if (matchedGem) {
      resultBox.innerHTML = `
        <div class="cert-dossier-card animate-fade-in">
          <div class="cert-header">
            <div class="cert-lab-badge">
              <i class="fas fa-shield-check"></i> OFFICIAL GEMOLOGICAL VERIFICATION
            </div>
            <div class="cert-status-tag verified">
              <i class="fas fa-check-circle"></i> Authenticity Confirmed
            </div>
          </div>

          <div class="cert-body-grid">
            <div class="cert-photo-col">
              <img src="${matchedGem.image}" alt="${matchedGem.name}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80';" />
              <div class="qr-mock">
                <div class="qr-code-box"><i class="fas fa-qrcode"></i></div>
                <small>Scan for Lab Blockchain Record</small>
              </div>
            </div>

            <div class="cert-data-col">
              <div class="cert-data-header">
                <h3>${matchedGem.variety}</h3>
                <span class="cert-id">Report #${matchedGem.certNumber} · Issued: ${matchedGem.certDate || '2025-11-14'}</span>
              </div>

              <div class="cert-field-grid">
                <div class="c-field"><span class="k">Species</span><span class="v">${matchedGem.species}</span></div>
                <div class="c-field"><span class="k">Weight</span><span class="v">${matchedGem.carat} Carats</span></div>
                <div class="c-field"><span class="k">Dimensions</span><span class="v">${matchedGem.dimensions}</span></div>
                <div class="c-field"><span class="k">Shape / Cut</span><span class="v">${matchedGem.cut}</span></div>
                <div class="c-field"><span class="k">Color Grade</span><span class="v">${matchedGem.color}</span></div>
                <div class="c-field"><span class="k">Origin</span><span class="v">${matchedGem.origin}</span></div>
                <div class="c-field"><span class="k">Treatment</span><span class="v highlight-green">${matchedGem.treatment}</span></div>
                <div class="c-field"><span class="k">Accreditation</span><span class="v">${matchedGem.certAgency} Laboratories</span></div>
              </div>

              <div class="cert-footer-actions">
                <button class="btn btn-gold btn-sm" onclick="openQuickView('${matchedGem.id}')">
                  <i class="fas fa-gem"></i> View Full Item Dossier
                </button>
                <button class="btn btn-outline btn-sm" onclick="window.showToast('Official Lab PDF Dossier export simulated for ${matchedGem.certNumber}', 'gold')">
                  <i class="fas fa-download"></i> Download Lab Dossier (PDF)
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      resultBox.innerHTML = `
        <div class="cert-not-found animate-fade-in">
          <div class="error-icon"><i class="fas fa-exclamation-triangle"></i></div>
          <h4>Report Number Not Found</h4>
          <p>No archive matches "<strong>${query}</strong>". Try sample reports: <code>CG-GIA-8821</code>, <code>CG-GUB-3392</code>, <code>CG-SSEF-1102</code>, or <code>CG-GRS-4019</code>.</p>
        </div>
      `;
    }
  }, 600);
}

/* ==========================================================================
   6. Inquiry Bag / Drawer System
   ========================================================================== */
function initInquiryDrawer() {
  const triggerBtns = document.querySelectorAll('.open-inquiry-drawer-btn');
  const drawer = document.getElementById('inquiryDrawer');
  const backdrop = document.getElementById('inquiryDrawerBackdrop');
  const closeBtn = document.getElementById('closeInquiryDrawerBtn');

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openInquiryDrawer();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeInquiryDrawer);
  if (backdrop) backdrop.addEventListener('click', closeInquiryDrawer);

  renderInquiryBagDrawer();
}

window.openInquiryDrawer = () => {
  const drawer = document.getElementById('inquiryDrawer');
  const backdrop = document.getElementById('inquiryDrawerBackdrop');
  if (drawer && backdrop) {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.classList.add('drawer-open');
    renderInquiryBagDrawer();
  }
};

window.closeInquiryDrawer = () => {
  const drawer = document.getElementById('inquiryDrawer');
  const backdrop = document.getElementById('inquiryDrawerBackdrop');
  if (drawer && backdrop) {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.classList.remove('drawer-open');
  }
};

window.removeFromInquiryBag = (index) => {
  AppState.inquiryBag.splice(index, 1);
  saveInquiryBag();
  updateInquiryBadge();
  renderInquiryBagDrawer();
};

function renderInquiryBagDrawer() {
  const container = document.getElementById('inquiryItemsContainer');
  const totalVal = document.getElementById('inquiryTotalVal');
  if (!container) return;

  if (AppState.inquiryBag.length === 0) {
    container.innerHTML = `
      <div class="empty-drawer">
        <i class="fas fa-gem"></i>
        <p>Your Private Inquiry Bag is currently empty.</p>
        <small>Browse our certified vault to add rare Ceylon acquisitions.</small>
      </div>
    `;
    if (totalVal) totalVal.textContent = window.formatPrice(0);
    return;
  }

  let sumUSD = 0;

  container.innerHTML = AppState.inquiryBag.map((item, idx) => {
    sumUSD += item.priceUSD;
    return `
      <div class="drawer-item">
        <div class="drawer-item-img">
          <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80';" />
        </div>
        <div class="drawer-item-info">
          <h5>${item.name}</h5>
          <div class="drawer-item-sub">
            ${item.isBespoke ? `${item.settingName} · ${item.metalName}` : `${item.carat} ct · ${item.certAgency || 'Certified'}`}
          </div>
          <div class="drawer-item-price">${window.formatPrice(item.priceUSD)}</div>
        </div>
        <button class="remove-drawer-item-btn" onclick="removeFromInquiryBag(${idx})" title="Remove item">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    `;
  }).join('');

  if (totalVal) {
    totalVal.textContent = window.formatPrice(sumUSD);
  }
}

window.dispatchInquiryCheckout = (format = 'email') => {
  if (AppState.inquiryBag.length === 0) {
    window.showToast("Your inquiry bag is empty. Select a gemstone first.", "gold");
    return;
  }

  const clientName = document.getElementById('inqClientName')?.value || 'Valued Collector';
  const clientEmail = document.getElementById('inqClientEmail')?.value || 'Not provided';
  const clientPhone = document.getElementById('inqClientPhone')?.value || 'Not provided';
  const clientNotes = document.getElementById('inqClientNotes')?.value || 'None';
  const consultType = document.getElementById('inqConsultType')?.value || 'Virtual 4K Consultation';

  let totalUSD = 0;
  let itemsList = '';

  AppState.inquiryBag.forEach((item, idx) => {
    totalUSD += item.priceUSD;
    if (item.isBespoke) {
      itemsList += `${idx + 1}. BESPOKE: ${item.name} ($${item.priceUSD.toLocaleString()} USD)\n   - Setting: ${item.settingName}, Metal: ${item.metalName}, Size: ${item.ringSize}\n`;
    } else {
      itemsList += `${idx + 1}. LOOSE GEM: ${item.name} (${item.carat}ct ${item.variety}) - $${item.priceUSD.toLocaleString()} USD\n   - Cert: ${item.certNumber} (${item.certAgency})\n`;
    }
  });

  if (format === 'whatsapp') {
    const text = encodeURIComponent(
      `⚜️ *CEYLON GEMS SL HAUTE JOAILLERIE INQUIRY* ⚜️\n\n` +
      `*Client:* ${clientName}\n` +
      `*Email:* ${clientEmail}\n` +
      `*Phone:* ${clientPhone}\n` +
      `*Preferred Format:* ${consultType}\n\n` +
      `*Curated Acquisitions:* (${AppState.inquiryBag.length} Items)\n${itemsList}\n` +
      `*Estimated Valuation:* $${totalUSD.toLocaleString()} USD (${window.formatPrice(totalUSD)})\n\n` +
      `*Client Notes:* ${clientNotes}\n\n` +
      `Please confirm gem availability and arrange secure courier/viewing.`
    );
    window.open(`https://wa.me/94771234567?text=${text}`, '_blank');
  } else {
    // Simulated Email Dispatch
    window.showToast("Formal inquiry dossier sent! A senior Ceylon Gems SL gemologist will contact you shortly.", "gold");
  }

  closeInquiryDrawer();
  closeInquiryModal();
};

window.openInquiryModal = () => {
  const modal = document.getElementById('inquiryCheckoutModal');
  if (modal) {
    modal.classList.add('active');
    document.body.classList.add('modal-open');
  }
};

window.closeInquiryModal = () => {
  const modal = document.getElementById('inquiryCheckoutModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
};

/* ==========================================================================
   7. VIP Private Appointment Booking
   ========================================================================== */
function initAppointmentBooking() {
  const form = document.getElementById('appointmentBookingForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('bkName').value;
    const email = document.getElementById('bkEmail').value;
    const lounge = document.getElementById('bkLounge').value;
    const date = document.getElementById('bkDate').value;
    const time = document.getElementById('bkTime').value;

    window.showToast(`Private appointment scheduled for ${name} at ${lounge} on ${date} (${time})`, 'gold');
    form.reset();

    // Show Confirmation Card
    const card = document.getElementById('bookingConfirmCard');
    if (card) {
      card.innerHTML = `
        <div class="booking-success-box animate-fade-in">
          <i class="fas fa-calendar-check"></i>
          <h4>Private Viewing Confirmed</h4>
          <p>An invitation pass with security access code has been dispatched to <strong>${email}</strong> for the <strong>${lounge}</strong> Private Salon.</p>
        </div>
      `;
    }
  });
}

/* ==========================================================================
   8. FAQ Accordions
   ========================================================================== */
function initFaqAccordions() {
  const accordions = document.querySelectorAll('.faq-item');
  accordions.forEach(item => {
    const header = item.querySelector('.faq-question');
    if (header) {
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        accordions.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });
}

/* ==========================================================================
   9. Newsletter & Newsletter Form
   ========================================================================== */
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (input && input.value) {
      window.showToast(`Welcome to the Ceylon Gems SL Connoisseur Circle, ${input.value}`, 'gold');
      input.value = '';
    }
  });
}

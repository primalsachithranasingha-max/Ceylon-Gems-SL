/**
 * Ceylon Gems SL - Bespoke Atelier Interactive Ring & Jewelry Customizer Engine
 */

class BespokeCustomizer {
  constructor() {
    this.selectedGemId = GEMS_DATA[0].id;
    this.selectedSettingId = BESPOKE_SETTINGS[0].id;
    this.selectedMetalId = BESPOKE_METALS[0].id;
    this.ringSize = "US 6.5";
    this.engravingText = "";

    this.container = document.getElementById('bespokeCustomizer');
    if (!this.container) return;

    this.init();
  }

  init() {
    this.renderCustomizerUI();
    this.attachEventListeners();
    this.updatePreview();
  }

  getGem() {
    return GEMS_DATA.find(g => g.id === this.selectedGemId) || GEMS_DATA[0];
  }

  getSetting() {
    return BESPOKE_SETTINGS.find(s => s.id === this.selectedSettingId) || BESPOKE_SETTINGS[0];
  }

  getMetal() {
    return BESPOKE_METALS.find(m => m.id === this.selectedMetalId) || BESPOKE_METALS[0];
  }

  calculateTotal() {
    const gem = this.getGem();
    const setting = this.getSetting();
    const metal = this.getMetal();

    const metalSettingCost = Math.round(setting.basePrice * metal.multiplier);
    const totalUSD = gem.priceUSD + metalSettingCost;

    return {
      gemPriceUSD: gem.priceUSD,
      settingPriceUSD: metalSettingCost,
      totalUSD: totalUSD
    };
  }

  renderCustomizerUI() {
    const gem = this.getGem();
    const setting = this.getSetting();
    const metal = this.getMetal();

    const looseGems = GEMS_DATA.filter(g => g.category !== 'jewelry').slice(0, 6);

    const html = `
      <div class="customizer-grid">
        <!-- Visualizer Canvas / SVG Column -->
        <div class="customizer-visual-card">
          <div class="visual-badge">
            <span class="pulse-dot"></span> Live Atelier Rendering
          </div>

          <div class="ring-render-stage" id="ringRenderStage">
            ${this.generateSVGVisual(gem, setting, metal)}
          </div>

          <div class="render-details-bar">
            <div class="detail-item">
              <span class="label">Center Gem</span>
              <strong id="custGemLabel">${gem.variety} (${gem.carat} ct)</strong>
            </div>
            <div class="detail-item">
              <span class="label">Metal Alloy</span>
              <strong id="custMetalLabel">${metal.name}</strong>
            </div>
            <div class="detail-item">
              <span class="label">Setting</span>
              <strong id="custSettingLabel">${setting.style}</strong>
            </div>
          </div>
        </div>

        <!-- Controls Column -->
        <div class="customizer-controls">
          <div class="controls-header">
            <span class="studio-sub">Ceylon Gems SL Haute Atelier</span>
            <h3 class="studio-title">Configure Your Bespoke Heirloom</h3>
            <p class="studio-desc">Pair rare unheated Ceylon gems with master goldsmithing tailored to your exact ring size and personal inscription.</p>
          </div>

          <!-- Step 1: Select Gemstone -->
          <div class="config-step">
            <div class="step-header">
              <span class="step-num">01</span>
              <div>
                <h4>Select Center Gemstone</h4>
                <p class="step-sub">Ethically unheated & certified from Ratnapura / Elahera</p>
              </div>
            </div>
            <div class="gem-selector-grid">
              ${looseGems.map(g => `
                <div class="gem-select-card ${g.id === this.selectedGemId ? 'active' : ''}" data-gem-id="${g.id}">
                  <div class="gem-thumb-box">
                    <img src="${g.image}" alt="${g.name}" loading="lazy" />
                  </div>
                  <div class="gem-meta">
                    <span class="gem-name">${g.variety}</span>
                    <span class="gem-carat">${g.carat} Carat · ${g.cut}</span>
                    <span class="gem-price">${window.formatPrice ? window.formatPrice(g.priceUSD) : '$' + g.priceUSD.toLocaleString()}</span>
                  </div>
                  <div class="check-indicator"><i class="fas fa-check"></i></div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Step 2: Select Setting Style -->
          <div class="config-step">
            <div class="step-header">
              <span class="step-num">02</span>
              <div>
                <h4>Choose Ring Architecture</h4>
                <p class="step-sub">Engineered for optical brilliance & lifetime durability</p>
              </div>
            </div>
            <div class="setting-selector-grid">
              ${BESPOKE_SETTINGS.map(s => `
                <div class="setting-select-card ${s.id === this.selectedSettingId ? 'active' : ''}" data-setting-id="${s.id}">
                  <div class="setting-icon-box">
                    <i class="${this.getSettingIconClass(s.style)}"></i>
                  </div>
                  <div class="setting-info">
                    <span class="setting-title">${s.name}</span>
                    <p class="setting-desc">${s.description}</p>
                    <span class="setting-cost">+${window.formatPrice ? window.formatPrice(s.basePrice) : '$' + s.basePrice.toLocaleString()} base</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Step 3: Select Precious Metal -->
          <div class="config-step">
            <div class="step-header">
              <span class="step-num">03</span>
              <div>
                <h4>Select Precious Metal Alloy</h4>
                <p class="step-sub">Solid certified alloys with hallmarked assay guarantee</p>
              </div>
            </div>
            <div class="metal-selector-grid">
              ${BESPOKE_METALS.map(m => `
                <div class="metal-select-card ${m.id === this.selectedMetalId ? 'active' : ''}" data-metal-id="${m.id}">
                  <div class="metal-color-circle" style="background: ${m.colorHex}; box-shadow: 0 0 12px ${m.accentGlow}"></div>
                  <div class="metal-text">
                    <span class="metal-title">${m.name}</span>
                    <span class="metal-purity">${m.purity}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Step 4: Size & Personalization -->
          <div class="config-step">
            <div class="step-header">
              <span class="step-num">04</span>
              <div>
                <h4>Personalization & Ring Sizing</h4>
                <p class="step-sub">Complimentary laser engraving & insured bespoke ring box</p>
              </div>
            </div>
            <div class="personalization-row">
              <div class="input-group">
                <label for="custRingSize">Ring Size (US Standard)</label>
                <select id="custRingSize" class="styled-select">
                  ${["US 4.0", "US 4.5", "US 5.0", "US 5.5", "US 6.0", "US 6.5", "US 7.0", "US 7.5", "US 8.0", "US 8.5", "US 9.0", "Custom Sizing Request"].map(sz => `
                    <option value="${sz}" ${sz === this.ringSize ? 'selected' : ''}>${sz}</option>
                  `).join('')}
                </select>
              </div>
              <div class="input-group flex-2">
                <label for="custEngraving">Inner Shank Inscription (Optional)</label>
                <input type="text" id="custEngraving" class="styled-input" placeholder="e.g. Forever Yours · MC MMXXVI" maxlength="28" value="${this.engravingText}" />
              </div>
            </div>
          </div>

          <!-- Price Breakdown & Action -->
          <div class="customizer-pricing-card">
            <div class="price-rows">
              <div class="p-row">
                <span>Selected Gemstone:</span>
                <strong id="custGemPriceVal">${window.formatPrice ? window.formatPrice(gem.priceUSD) : '$' + gem.priceUSD.toLocaleString()}</strong>
              </div>
              <div class="p-row">
                <span>Setting, Metal & Goldsmithing:</span>
                <strong id="custSettingPriceVal">${window.formatPrice ? window.formatPrice(Math.round(setting.basePrice * metal.multiplier)) : '$' + Math.round(setting.basePrice * metal.multiplier).toLocaleString()}</strong>
              </div>
              <div class="p-row">
                <span>Engraving & GIA Verification:</span>
                <span class="complimentary-tag">Complimentary</span>
              </div>
              <div class="p-divider"></div>
              <div class="p-total-row">
                <div class="total-label">
                  <span>Total Estimated Valuation</span>
                  <small>Includes Insured Global Logistics & GIA Dossier</small>
                </div>
                <div class="total-amount" id="custTotalVal">
                  ${window.formatPrice ? window.formatPrice(this.calculateTotal().totalUSD) : '$' + this.calculateTotal().totalUSD.toLocaleString()}
                </div>
              </div>
            </div>

            <div class="action-buttons-group">
              <button class="btn btn-gold btn-large" id="custAddInquiryBtn">
                <i class="fas fa-gem"></i> Add Bespoke Creation to Inquiry Bag
              </button>
              <button class="btn btn-outline" id="custConsultSpecialistBtn">
                <i class="fab fa-whatsapp"></i> Chat with Master Jeweler
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.container.innerHTML = html;
  }

  getSettingIconClass(style) {
    switch (style) {
      case "Solitaire": return "fas fa-ring";
      case "Halo": return "far fa-sun";
      case "Three-Stone": return "fas fa-braille";
      case "Vintage Art Deco": return "fas fa-crown";
      default: return "fas fa-ring";
    }
  }

  generateSVGVisual(gem, setting, metal) {
    const metalColor = metal.colorHex;
    let gemFacetColor = "#1a53ff";
    let gemHighlightColor = "#70a1ff";
    let gemDarkColor = "#002080";

    if (gem.variety.includes("Padparadscha")) {
      gemFacetColor = "#ff7e67";
      gemHighlightColor = "#ffb8a9";
      gemDarkColor = "#c0392b";
    } else if (gem.variety.includes("Ruby")) {
      gemFacetColor = "#e8175d";
      gemHighlightColor = "#ff6b81";
      gemDarkColor = "#7f092b";
    } else if (gem.variety.includes("Alexandrite")) {
      gemFacetColor = "#10ac84";
      gemHighlightColor = "#55efc4";
      gemDarkColor = "#024a38";
    } else if (gem.variety.includes("Yellow")) {
      gemFacetColor = "#f1c40f";
      gemHighlightColor = "#f9ca24";
      gemDarkColor = "#b7791f";
    } else if (gem.variety.includes("White")) {
      gemFacetColor = "#dfe6e9";
      gemHighlightColor = "#ffffff";
      gemDarkColor = "#b2bec3";
    }

    const haloElements = setting.style === "Halo" ? `
      <!-- Pavé Halo Circle of Diamonds -->
      <g id="paveHalo" filter="url(#diamondShine)">
        ${[...Array(16)].map((_, i) => {
          const angle = (i / 16) * Math.PI * 2;
          const hx = 200 + Math.cos(angle) * 58;
          const hy = 160 + Math.sin(angle) * 45;
          return `<circle cx="${hx}" cy="${hy}" r="4" fill="#ffffff" stroke="#c0c0c0" stroke-width="0.8" />
                  <circle cx="${hx}" cy="${hy}" r="1.5" fill="#e0f7fa" />`;
        }).join('')}
      </g>
    ` : '';

    const threeStoneElements = setting.style === "Three-Stone" ? `
      <!-- Left Accent Diamond -->
      <polygon points="128,160 148,145 158,160 148,175" fill="#f5f6fa" stroke="#dcdde1" stroke-width="1" />
      <polygon points="128,160 148,145 140,160" fill="#ffffff" opacity="0.9" />
      <!-- Right Accent Diamond -->
      <polygon points="272,160 252,145 242,160 252,175" fill="#f5f6fa" stroke="#dcdde1" stroke-width="1" />
      <polygon points="272,160 252,145 260,160" fill="#ffffff" opacity="0.9" />
    ` : '';

    const artDecoElements = setting.style === "Vintage Art Deco" ? `
      <!-- Art Deco Filigree & Baguettes -->
      <path d="M 120 180 Q 200 215 280 180" fill="none" stroke="${metalColor}" stroke-width="2.5" stroke-dasharray="3,3" />
      <rect x="135" y="152" width="16" height="18" rx="2" fill="#f0f3f4" stroke="${metalColor}" stroke-width="1.2" />
      <rect x="249" y="152" width="16" height="18" rx="2" fill="#f0f3f4" stroke="${metalColor}" stroke-width="1.2" />
      <path d="M 170 180 L 200 205 L 230 180" fill="none" stroke="${metalColor}" stroke-width="2" />
    ` : '';

    return `
      <svg class="bespoke-ring-svg" viewBox="0 0 400 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${metalColor}" stop-opacity="0.8" />
            <stop offset="30%" stop-color="#ffffff" stop-opacity="0.9" />
            <stop offset="60%" stop-color="${metalColor}" stop-opacity="1" />
            <stop offset="100%" stop-color="#111111" stop-opacity="0.4" />
          </linearGradient>
          <linearGradient id="gemGrad" x1="20%" y1="20%" x2="80%" y2="80%">
            <stop offset="0%" stop-color="${gemHighlightColor}" />
            <stop offset="45%" stop-color="${gemFacetColor}" />
            <stop offset="100%" stop-color="${gemDarkColor}" />
          </linearGradient>
          <filter id="metalGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="diamondShine" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="2" flood-color="#ffffff" flood-opacity="0.7" />
          </filter>
        </defs>

        <!-- Ambient Backdrop Ring Shadow -->
        <ellipse cx="200" cy="330" rx="90" ry="14" fill="rgba(0,0,0,0.5)" filter="blur(8px)" />

        <!-- Lower Shank Loop -->
        <path d="M 125 185 C 125 295, 275 295, 275 185" fill="none" stroke="url(#metalGrad)" stroke-width="16" stroke-linecap="round" />
        <path d="M 130 185 C 130 285, 270 285, 270 185" fill="none" stroke="#ffffff" stroke-width="2.5" opacity="0.6" stroke-linecap="round" />

        <!-- Inner Shank Inscription (Subtle Art) -->
        <path id="engravingCurve" d="M 145 235 C 170 270, 230 270, 255 235" fill="none" stroke="transparent" />
        <text font-size="8" fill="rgba(255,255,255,0.4)" font-family="'Plus Jakarta Sans', sans-serif" letter-spacing="1">
          <textPath href="#engravingCurve" startOffset="50%" text-anchor="middle">
            ${this.engravingText ? '★ ' + this.engravingText.toUpperCase() + ' ★' : 'MODERN CEYLON · 950 PT / 18K'}
          </textPath>
        </text>

        <!-- Side stones / Art Deco / Triangles -->
        ${threeStoneElements}
        ${artDecoElements}

        <!-- Gallery & Prongs Structure -->
        <path d="M 150 170 Q 200 195 250 170" fill="none" stroke="url(#metalGrad)" stroke-width="8" stroke-linecap="round" />
        <path d="M 165 170 L 160 135" stroke="url(#metalGrad)" stroke-width="5" stroke-linecap="round" />
        <path d="M 235 170 L 240 135" stroke="url(#metalGrad)" stroke-width="5" stroke-linecap="round" />
        <path d="M 185 175 L 180 145" stroke="url(#metalGrad)" stroke-width="4" stroke-linecap="round" />
        <path d="M 215 175 L 220 145" stroke="url(#metalGrad)" stroke-width="4" stroke-linecap="round" />

        <!-- Pavé Halo if selected -->
        ${haloElements}

        <!-- Center Ceylon Gemstone Facet Matrix -->
        <g id="centerGemstone" transform="translate(0, 0)">
          <!-- Gem Base Shape Cushion/Oval -->
          <path d="M 165 130 C 160 145, 160 175, 165 190 C 180 198, 220 198, 235 190 C 240 175, 240 145, 235 130 C 220 122, 180 122, 165 130 Z"
                fill="url(#gemGrad)" stroke="rgba(255,255,255,0.6)" stroke-width="1.2" />

          <!-- Table Facet (Inner Octagon) -->
          <polygon points="180,140 220,140 230,155 220,175 180,175 170,155"
                   fill="url(#gemGrad)" stroke="rgba(255,255,255,0.7)" stroke-width="1" />

          <!-- Star Facets & Upper Girdle Lines -->
          <line x1="165" y1="130" x2="180" y2="140" stroke="rgba(255,255,255,0.8)" stroke-width="0.8" />
          <line x1="235" y1="130" x2="220" y2="140" stroke="rgba(255,255,255,0.8)" stroke-width="0.8" />
          <line x1="235" y1="190" x2="220" y2="175" stroke="rgba(255,255,255,0.6)" stroke-width="0.8" />
          <line x1="165" y1="190" x2="180" y2="175" stroke="rgba(255,255,255,0.6)" stroke-width="0.8" />

          <line x1="200" y1="123" x2="200" y2="140" stroke="rgba(255,255,255,0.8)" stroke-width="0.8" />
          <line x1="200" y1="197" x2="200" y2="175" stroke="rgba(255,255,255,0.6)" stroke-width="0.8" />
          <line x1="162" y1="160" x2="170" y2="155" stroke="rgba(255,255,255,0.8)" stroke-width="0.8" />
          <line x1="238" y1="160" x2="230" y2="155" stroke="rgba(255,255,255,0.8)" stroke-width="0.8" />

          <!-- Table Center Prism Light Sparkle -->
          <polygon points="188,148 200,143 212,148 200,154" fill="#ffffff" opacity="0.65" />
          <circle cx="200" cy="148" r="1" fill="#ffffff" />
        </g>

        <!-- Claw Prongs Gripping the Gemstone -->
        <circle cx="166" cy="132" r="3.5" fill="url(#metalGrad)" stroke="#ffffff" stroke-width="0.6" />
        <circle cx="234" cy="132" r="3.5" fill="url(#metalGrad)" stroke="#ffffff" stroke-width="0.6" />
        <circle cx="166" cy="188" r="3.5" fill="url(#metalGrad)" stroke="#ffffff" stroke-width="0.6" />
        <circle cx="234" cy="188" r="3.5" fill="url(#metalGrad)" stroke="#ffffff" stroke-width="0.6" />
      </svg>
    `;
  }

  updatePreview() {
    const gem = this.getGem();
    const setting = this.getSetting();
    const metal = this.getMetal();
    const prices = this.calculateTotal();

    const stage = document.getElementById('ringRenderStage');
    if (stage) {
      stage.innerHTML = this.generateSVGVisual(gem, setting, metal);
    }

    const gemLbl = document.getElementById('custGemLabel');
    if (gemLbl) gemLbl.textContent = `${gem.variety} (${gem.carat} ct)`;

    const metalLbl = document.getElementById('custMetalLabel');
    if (metalLbl) metalLbl.textContent = metal.name;

    const setLbl = document.getElementById('custSettingLabel');
    if (setLbl) setLbl.textContent = setting.style;

    const gPrice = document.getElementById('custGemPriceVal');
    if (gPrice) gPrice.textContent = window.formatPrice ? window.formatPrice(prices.gemPriceUSD) : '$' + prices.gemPriceUSD.toLocaleString();

    const sPrice = document.getElementById('custSettingPriceVal');
    if (sPrice) sPrice.textContent = window.formatPrice ? window.formatPrice(prices.settingPriceUSD) : '$' + prices.settingPriceUSD.toLocaleString();

    const tPrice = document.getElementById('custTotalVal');
    if (tPrice) tPrice.textContent = window.formatPrice ? window.formatPrice(prices.totalUSD) : '$' + prices.totalUSD.toLocaleString();
  }

  attachEventListeners() {
    this.container.addEventListener('click', (e) => {
      // Gem selection
      const gemCard = e.target.closest('.gem-select-card');
      if (gemCard) {
        this.selectedGemId = gemCard.getAttribute('data-gem-id');
        this.container.querySelectorAll('.gem-select-card').forEach(c => c.classList.remove('active'));
        gemCard.classList.add('active');
        this.updatePreview();
        return;
      }

      // Setting selection
      const settingCard = e.target.closest('.setting-select-card');
      if (settingCard) {
        this.selectedSettingId = settingCard.getAttribute('data-setting-id');
        this.container.querySelectorAll('.setting-select-card').forEach(c => c.classList.remove('active'));
        settingCard.classList.add('active');
        this.updatePreview();
        return;
      }

      // Metal selection
      const metalCard = e.target.closest('.metal-select-card');
      if (metalCard) {
        this.selectedMetalId = metalCard.getAttribute('data-metal-id');
        this.container.querySelectorAll('.metal-select-card').forEach(c => c.classList.remove('active'));
        metalCard.classList.add('active');
        this.updatePreview();
        return;
      }

      // Add to inquiry
      if (e.target.closest('#custAddInquiryBtn')) {
        this.handleAddToInquiry();
        return;
      }

      // WhatsApp concierge
      if (e.target.closest('#custConsultSpecialistBtn')) {
        this.handleDirectConsultation();
        return;
      }
    });

    // Ring size change
    const sizeSelect = document.getElementById('custRingSize');
    if (sizeSelect) {
      sizeSelect.addEventListener('change', (e) => {
        this.ringSize = e.target.value;
      });
    }

    // Engraving input
    const engInput = document.getElementById('custEngraving');
    if (engInput) {
      engInput.addEventListener('input', (e) => {
        this.engravingText = e.target.value;
        this.updatePreview();
      });
    }
  }

  handleAddToInquiry() {
    const gem = this.getGem();
    const setting = this.getSetting();
    const metal = this.getMetal();
    const prices = this.calculateTotal();

    const bespokeItem = {
      id: `BESPOKE-${Date.now()}`,
      isBespoke: true,
      name: `Bespoke ${gem.variety} Ring`,
      gemName: gem.name,
      gemId: gem.id,
      settingName: setting.name,
      metalName: metal.name,
      ringSize: this.ringSize,
      engraving: this.engravingText || "None",
      priceUSD: prices.totalUSD,
      image: gem.image,
      carat: gem.carat,
      certAgency: gem.certAgency,
      addedAt: new Date().toISOString()
    };

    if (window.addToInquiryBag) {
      window.addToInquiryBag(bespokeItem);
      if (window.showToast) {
        window.showToast("Bespoke creation added to your Inquiry Bag", "gold");
      }
    }
  }

  handleDirectConsultation() {
    const gem = this.getGem();
    const setting = this.getSetting();
    const metal = this.getMetal();
    const prices = this.calculateTotal();

    const text = encodeURIComponent(
      `Hello Ceylon Gems SL Concierge,\n\nI am inquiring about a Bespoke Creation:\n` +
      `• Center Gem: ${gem.name} (${gem.carat}ct ${gem.variety})\n` +
      `• Architecture: ${setting.name}\n` +
      `• Metal Alloy: ${metal.name}\n` +
      `• Ring Size: ${this.ringSize}\n` +
      `• Inscription: "${this.engravingText || 'None'}"\n` +
      `• Valuation: $${prices.totalUSD.toLocaleString()} USD\n\n` +
      `Please provide consultation availability and CAD master drafting details.`
    );

    window.open(`https://wa.me/94770000000?text=${text}`, '_blank');
  }
}

// Global initialization helper
window.initBespokeCustomizer = () => {
  window.bespokeCustomizerInstance = new BespokeCustomizer();
};

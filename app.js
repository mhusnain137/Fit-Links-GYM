/**
 * FITLINKS LUXURY ATHLETIC CLUB & ATTENDANCE SYSTEM
 * Core Application Controller & Interactive 3D Motion System
 */

// ==========================================
// 1. STATE & MOCK DATA
// ==========================================
const CLUB_MEMBERS = [
  {
    id: "FL-0842",
    name: "Sarah Jenkins",
    tier: "VIP PLATINUM CLUB",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    phone: "+92 300 8472910",
    slot: "All-Day Unrestricted",
    daysRemaining: 184,
    status: "Active",
    barTab: 4850,
    checkInTime: "09:14 AM"
  },
  {
    id: "FL-0419",
    name: "Hamza Tariq",
    tier: "VIP GOLD TIER",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    phone: "+92 321 9841203",
    slot: "Morning (06:00 AM - 12:00 PM)",
    daysRemaining: 214,
    status: "Active",
    barTab: 8200,
    checkInTime: "08:52 AM"
  },
  {
    id: "FL-1102",
    name: "Ayesha Khan",
    tier: "FITLINKS REGULAR",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    phone: "+92 333 4519028",
    slot: "Evening (04:00 PM - 10:00 PM)",
    daysRemaining: 12,
    status: "Active",
    barTab: 1200,
    checkInTime: "07:30 AM"
  },
  {
    id: "FL-0294",
    name: "Zainab Malik",
    tier: "PERSONAL TRAINING VIP",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    phone: "+92 301 7729104",
    slot: "All-Day Unrestricted",
    daysRemaining: 0,
    status: "Expired",
    barTab: 0,
    checkInTime: "--"
  },
  {
    id: "FL-0985",
    name: "Bilal Ahmed",
    tier: "FITLINKS EXECUTIVE",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    phone: "+92 345 6678129",
    slot: "Morning Slot (Overstay)",
    daysRemaining: 88,
    status: "Slot Alert",
    barTab: 3100,
    checkInTime: "06:15 AM"
  }
];

const CAFE_ITEMS = [
  { id: 1, name: "Whey Isolate Protein Shake", category: "shakes", price: 650, icon: "🥛", desc: "32g Protein • Salted Caramel / Double Rich Choc", calories: "180 kcal" },
  { id: 2, name: "Gold Pre-Workout Shot", category: "pre", price: 450, icon: "⚡", desc: "300mg Caffeine + Beta Alanine + Citrulline", calories: "15 kcal" },
  { id: 3, name: "Avocado Keto Superfuel", category: "smoothies", price: 750, icon: "🥑", desc: "MCT Oil • Organic Spinach • Collagen Peptides", calories: "340 kcal" },
  { id: 4, name: "Mango BCAA Hydration Frost", category: "smoothies", price: 550, icon: "🥭", desc: "7g Fermented BCAAs + Coconut Electrolytes", calories: "90 kcal" },
  { id: 5, name: "Triple Chocolate High-Protein Bar", category: "supplements", price: 400, icon: "🍫", desc: "21g Protein • Zero Added Sugar Crispy Bar", calories: "210 kcal" },
  { id: 6, name: "Creatine Monohydrate (Creapure)", category: "supplements", price: 350, icon: "💊", desc: "5g Micronized German Creapure Shot", calories: "0 kcal" }
];

let activeMemberIndex = 0;
let cartItems = [];
let soundEnabled = true;

// ==========================================
// 2. LUXURY AUDIO SYNTHESIS (WEB AUDIO API)
// ==========================================
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playLuxuryChime(type = 'success') {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (type === 'success') {
      // Golden dual-bell harmony
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5

      osc2.frequency.setValueAtTime(1174.66, now); // D6

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.6);
      osc2.stop(now + 0.6);
    } else if (type === 'fail') {
      // Muted low double alert
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.setValueAtTime(130, now + 0.15);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'tick') {
      // Crisp subtle UI micro-tick
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    }
  } catch (err) {
    console.warn("Audio Context init pending user interaction:", err);
  }
}

// ==========================================
// 3. FLOATING PILL DOCK NAVIGATION
// ==========================================
function initNavigation() {
  const dockItems = document.querySelectorAll('.dock-item[data-tab]');
  dockItems.forEach(item => {
    item.addEventListener('click', () => {
      const tabId = item.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // Sound toggle button
  const soundBtn = document.getElementById('btn-sound-toggle');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      showToast(soundEnabled ? "Luxury UI Audio: Enabled" : "Luxury UI Audio: Muted");
      playLuxuryChime('tick');
    });
  }
}

function switchTab(tabId) {
  // Update dock buttons
  document.querySelectorAll('.dock-item[data-tab]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });

  // Update panes
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.remove('active');
  });

  const targetPane = document.getElementById(`pane-${tabId}`);
  if (targetPane) {
    targetPane.classList.add('active');
  }

  playLuxuryChime('tick');
}

// ==========================================
// 4. INTERACTIVE 3D GYRO TILT ON CARD
// ==========================================
function init3DCardTilt() {
  const wrapper = document.getElementById('card3dWrapper');
  const inner = document.getElementById('card3dInner');
  if (!wrapper || !inner) return;

  wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12; // deg
    const rotateY = ((x - centerX) / centerX) * 12; // deg

    inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    // Move dynamic reflection shine
    const shine = wrapper.querySelector('.card-3d-shine');
    if (shine) {
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      shine.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(245, 208, 97, 0.22), transparent 60%)`;
    }
  });

  wrapper.addEventListener('mouseleave', () => {
    inner.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
}

// ==========================================
// 5. ATTENDANCE & BIOMETRIC VERIFICATION LOGIC
// ==========================================
function updateDashboardMemberCard(member) {
  const avatar = document.getElementById('cardMemberAvatar');
  const name = document.getElementById('cardMemberName');
  const idTag = document.getElementById('cardMemberId');
  const tier = document.getElementById('cardMemberTier');
  const time = document.getElementById('cardCheckInTime');
  const days = document.getElementById('cardDaysRemaining');
  const slot = document.getElementById('cardSlot');
  const balance = document.getElementById('cardCafeBalance');
  const badge = document.getElementById('badgeCardStatus');
  const cafeActiveMember = document.getElementById('cafeActiveMemberName');

  if (avatar) avatar.src = member.avatar;
  if (name) name.textContent = member.name;
  if (idTag) idTag.textContent = member.id;
  if (tier) tier.textContent = member.tier;
  if (time) time.textContent = member.checkInTime === "--" ? "Denied (Expired)" : `${member.checkInTime} (Verified)`;
  if (days) {
    days.textContent = member.daysRemaining > 0 ? `${member.daysRemaining} Days Left` : "EXPIRED 0 Days";
    days.className = member.daysRemaining > 0 ? "meta-value highlight-gold" : "meta-value highlight-red";
  }
  if (slot) slot.textContent = member.slot;
  if (balance) balance.textContent = `PKR ${member.barTab.toLocaleString()}`;
  if (cafeActiveMember) cafeActiveMember.textContent = member.name;

  if (badge) {
    if (member.status === 'Active') {
      badge.className = "card-verification-status status-verified";
      badge.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4"></path><circle cx="12" cy="12" r="10"></circle></svg><span>ACCESS GRANTED</span>`;
    } else if (member.status === 'Expired') {
      badge.className = "card-verification-status";
      badge.style.background = "rgba(239, 68, 68, 0.15)";
      badge.style.border = "1px solid rgba(239, 68, 68, 0.5)";
      badge.style.color = "#EF4444";
      badge.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg><span>ACCESS DENIED</span>`;
    } else {
      badge.className = "card-verification-status";
      badge.style.background = "rgba(245, 158, 11, 0.15)";
      badge.style.border = "1px solid rgba(245, 158, 11, 0.5)";
      badge.style.color = "#F59E0B";
      badge.innerHTML = `<span>SLOT OVERSTAY</span>`;
    }
  }

  // Update Kiosk screen as well
  const kioskAvatar = document.getElementById('kioskAvatar');
  const kioskName = document.getElementById('kioskWelcomeName');
  const kioskTier = document.getElementById('kioskTierMeta');
  const kioskPill = document.getElementById('kioskStatusPill');
  const kioskText = document.getElementById('kioskStatusText');

  if (kioskAvatar) kioskAvatar.src = member.avatar;
  if (kioskName) kioskName.textContent = member.status === 'Active' ? `Welcome, ${member.name}!` : `Alert: ${member.name}`;
  if (kioskTier) kioskTier.textContent = `${member.tier} • ${member.daysRemaining > 0 ? member.daysRemaining + ' Days Remaining' : 'Membership Expired'}`;

  if (kioskPill && kioskText) {
    if (member.status === 'Active') {
      kioskPill.style.borderColor = "#10B981";
      kioskPill.style.color = "#10B981";
      kioskText.textContent = "ACCESS GRANTED";
      playLuxuryChime('success');
      showToast(`Gate Open: Welcome ${member.name}`);
    } else {
      kioskPill.style.borderColor = "#EF4444";
      kioskPill.style.color = "#EF4444";
      kioskText.textContent = "ACCESS BLOCKED — EXPIRY DUE";
      playLuxuryChime('fail');
      showToast(`Turnstile Locked: ${member.name} (Membership Expired)`);
    }
  }
}

function renderAttendanceStream() {
  const container = document.getElementById('recentCheckinStream');
  if (!container) return;

  container.innerHTML = CLUB_MEMBERS.map(m => `
    <div class="stream-item" onclick="selectMemberById('${m.id}')" style="cursor: pointer;">
      <div class="stream-member-meta">
        <img src="${m.avatar}" class="stream-mini-avatar" alt="${m.name}">
        <div>
          <span class="stream-name">${m.name}</span>
          <span class="stream-tier">${m.tier}</span>
        </div>
      </div>
      <div style="text-align: right;">
        <span class="stream-time-tag">${m.checkInTime}</span>
        <div style="font-size: 10px; color: ${m.status === 'Active' ? '#10B981' : '#EF4444'}; font-weight: 700;">
          ${m.status === 'Active' ? '✓ VERIFIED' : '✕ DENIED'}
        </div>
      </div>
    </div>
  `).join('');
}

function selectMemberById(id) {
  const index = CLUB_MEMBERS.findIndex(m => m.id === id);
  if (index !== -1) {
    activeMemberIndex = index;
    updateDashboardMemberCard(CLUB_MEMBERS[index]);
  }
}

function simulateNextMember() {
  activeMemberIndex = (activeMemberIndex + 1) % CLUB_MEMBERS.length;
  const current = CLUB_MEMBERS[activeMemberIndex];
  current.checkInTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  updateDashboardMemberCard(current);
  renderAttendanceStream();
}

function simulateExpiredMember() {
  const expired = CLUB_MEMBERS.find(m => m.status === 'Expired');
  if (expired) {
    updateDashboardMemberCard(expired);
  }
}

function simulateWrongSlotMember() {
  const slotAlert = CLUB_MEMBERS.find(m => m.status === 'Slot Alert');
  if (slotAlert) {
    updateDashboardMemberCard(slotAlert);
  }
}

// ==========================================
// 6. PROTEIN & CAFE BAR POS
// ==========================================
function renderCafeWidgets() {
  // 1. Dashboard mini quick-items
  const quickContainer = document.getElementById('cafeQuickItems');
  if (quickContainer) {
    quickContainer.innerHTML = CAFE_ITEMS.slice(0, 4).map(item => `
      <div class="pos-product-item">
        <div class="pos-prod-info">
          <div class="pos-prod-icon">${item.icon}</div>
          <div>
            <div class="pos-prod-title">${item.name}</div>
            <div class="pos-prod-desc">${item.desc}</div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <span class="pos-prod-price">PKR ${item.price}</span>
          <button class="btn-add-quick" onclick="addToCart(${item.id})">+</button>
        </div>
      </div>
    `).join('');
  }

  // 2. Full Cafe grid
  const fullGrid = document.getElementById('posFullGrid');
  if (fullGrid) {
    fullGrid.innerHTML = CAFE_ITEMS.map(item => `
      <div class="pos-item-card" onclick="addToCart(${item.id})">
        <div>
          <div class="pos-card-icon">${item.icon}</div>
          <h3 class="pos-card-title">${item.name}</h3>
          <p class="pos-card-macro">${item.desc} • ${item.calories}</p>
        </div>
        <div class="pos-card-footer">
          <span class="pos-price-large">PKR ${item.price}</span>
          <button class="btn-card-add">+ Add to Ticket</button>
        </div>
      </div>
    `).join('');
  }

  // Member select dropdown
  const memberSelect = document.getElementById('selectCartMember');
  if (memberSelect) {
    memberSelect.innerHTML = CLUB_MEMBERS.map(m => `
      <option value="${m.id}" ${m.id === CLUB_MEMBERS[activeMemberIndex].id ? 'selected' : ''}>
        ${m.name} (${m.tier}) — Tab Bal: PKR ${m.barTab}
      </option>
    `).join('');
  }
}

function addToCart(itemId) {
  const item = CAFE_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  const existing = cartItems.find(c => c.id === itemId);
  if (existing) {
    existing.qty += 1;
  } else {
    cartItems.push({ ...item, qty: 1 });
  }

  playLuxuryChime('tick');
  renderCart();
  showToast(`Added "${item.name}" to ticket`);
}

function removeFromCart(itemId) {
  cartItems = cartItems.filter(c => c.id !== itemId);
  renderCart();
  playLuxuryChime('tick');
}

function renderCart() {
  const list = document.getElementById('cartItemsList');
  const subtotalEl = document.getElementById('cartSubtotal');
  const grandTotalEl = document.getElementById('cartGrandTotal');
  const quickTotal = document.getElementById('cafeQuickTotal');
  const cartPill = document.getElementById('cartPillBadge');

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  if (cartPill) cartPill.textContent = `${totalCount} Items`;
  if (subtotalEl) subtotalEl.textContent = `PKR ${total.toLocaleString()}`;
  if (grandTotalEl) grandTotalEl.textContent = `PKR ${total.toLocaleString()}`;
  if (quickTotal) quickTotal.textContent = `PKR ${total.toLocaleString()}`;

  if (!list) return;

  if (cartItems.length === 0) {
    list.innerHTML = `<div class="empty-cart-msg">No items in ticket. Click any item to add.</div>`;
    return;
  }

  list.innerHTML = cartItems.map(item => `
    <div class="cart-line-item">
      <div class="cart-line-left">
        <span class="cart-line-title">${item.name}</span>
        <span class="cart-line-qty">${item.qty} × PKR ${item.price}</span>
      </div>
      <div class="cart-line-right">
        <span class="cart-line-price">PKR ${(item.price * item.qty).toLocaleString()}</span>
        <button class="btn-remove-line" onclick="removeFromCart(${item.id})">✕</button>
      </div>
    </div>
  `).join('');
}

function chargeActiveMemberTab() {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  if (total === 0) {
    showToast("Please add items to ticket first");
    return;
  }

  const member = CLUB_MEMBERS[activeMemberIndex];
  member.barTab += total;
  cartItems = [];
  renderCart();
  updateDashboardMemberCard(member);
  renderMembersTable();
  playLuxuryChime('success');
  showToast(`Billed PKR ${total.toLocaleString()} to ${member.name}'s Tab`);
}

function chargeCash() {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  if (total === 0) {
    showToast("Please add items to ticket first");
    return;
  }

  cartItems = [];
  renderCart();
  playLuxuryChime('success');
  showToast(`Cash payment received: PKR ${total.toLocaleString()}`);
}

function processPOSOrder(method) {
  if (method === 'tab') {
    chargeActiveMemberTab();
  } else {
    chargeCash();
  }
}

// ==========================================
// 7. MEMBERS REGISTRY TABLE
// ==========================================
function renderMembersTable(filter = '') {
  const tbody = document.getElementById('membersTableBody');
  if (!tbody) return;

  const filtered = CLUB_MEMBERS.filter(m => 
    m.name.toLowerCase().includes(filter.toLowerCase()) ||
    m.id.toLowerCase().includes(filter.toLowerCase()) ||
    m.phone.includes(filter)
  );

  tbody.innerHTML = filtered.map(m => `
    <tr>
      <td>
        <div class="table-member-flex">
          <img src="${m.avatar}" class="tbl-avatar" alt="${m.name}">
          <div>
            <strong>${m.name}</strong>
            <div style="font-size: 11px; color: #A1A1AA;">${m.phone}</div>
          </div>
        </div>
      </td>
      <td><code>${m.id}</code></td>
      <td><span class="tier-pill-gold" style="font-size: 10px; padding: 3px 8px;">${m.tier}</span></td>
      <td>${m.slot}</td>
      <td>${m.daysRemaining > 0 ? `${m.daysRemaining} days left` : '<span style="color:#EF4444; font-weight:700;">EXPIRED</span>'}</td>
      <td>
        <span style="display: inline-flex; align-items: center; gap: 6px; font-weight: 700; color: ${m.status === 'Active' ? '#10B981' : '#EF4444'};">
          <span style="width: 7px; height: 7px; border-radius: 50%; background: ${m.status === 'Active' ? '#10B981' : '#EF4444'};"></span>
          ${m.status}
        </span>
      </td>
      <td style="font-weight: 700; color: #F5D061;">PKR ${m.barTab.toLocaleString()}</td>
      <td>
        <button class="btn-action-outline" style="padding: 6px 12px;" onclick="selectMemberById('${m.id}'); switchTab('dashboard');">View Card</button>
      </td>
    </tr>
  `).join('');
}

function filterMembers() {
  const query = document.getElementById('memberSearchInput').value;
  renderMembersTable(query);
}

// ==========================================
// 8. LUXURY TOAST NOTIFIER
// ==========================================
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('luxuryToast');
  const text = document.getElementById('toastText');
  if (!toast || !text) return;

  text.textContent = message;
  toast.classList.add('show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// Live Clock updater
function initClock() {
  const clockEl = document.querySelector('.clock-time');
  if (!clockEl) return;

  function tick() {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
  tick();
  setInterval(tick, 1000);
}

// ==========================================
// 9. INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  init3DCardTilt();
  renderAttendanceStream();
  renderCafeWidgets();
  renderMembersTable();
  initClock();

  // Initial member display
  updateDashboardMemberCard(CLUB_MEMBERS[activeMemberIndex]);

  // Quick Scan button in top nav
  const btnScan = document.getElementById('btnTriggerScan');
  if (btnScan) {
    btnScan.addEventListener('click', () => {
      simulateNextMember();
    });
  }
});

/* SocialPulse - Core Application */
const SocialPulseApp = (function () {
  const NAV_ITEMS = [
    { section: 'Overview', links: [
      { href: 'dashboard.html', icon: '📊', label: 'Dashboard' },
      { href: 'analytics.html', icon: '📈', label: 'Analytics' },
      { href: 'engagement.html', icon: '💬', label: 'Engagement' },
      { href: 'audience.html', icon: '👥', label: 'Audience' }
    ]},
    { section: 'Content', links: [
      { href: 'scheduler.html', icon: '📅', label: 'Scheduler' },
      { href: 'calendar.html', icon: '🗓️', label: 'Calendar' },
      { href: 'media.html', icon: '🖼️', label: 'Media Library' },
      { href: 'ai-content.html', icon: '🤖', label: 'AI Suggestions' }
    ]},
    { section: 'Marketing', links: [
      { href: 'campaigns.html', icon: '🎯', label: 'Campaigns' },
      { href: 'hashtags.html', icon: '#️⃣', label: 'Hashtags' },
      { href: 'trends.html', icon: '🔥', label: 'Trends' },
      { href: 'competitors.html', icon: '⚔️', label: 'Competitors' }
    ]},
    { section: 'Social', links: [
      { href: 'accounts.html', icon: '🔗', label: 'Accounts' },
      { href: 'comments.html', icon: '💭', label: 'Comments & DMs' },
      { href: 'influencers.html', icon: '⭐', label: 'Influencers' }
    ]},
    { section: 'Insights', links: [
      { href: 'heatmaps.html', icon: '🗺️', label: 'Heatmaps' },
      { href: 'reports.html', icon: '📄', label: 'Reports' },
      { href: 'notifications.html', icon: '🔔', label: 'Notifications' }
    ]},
    { section: 'Team & Settings', links: [
      { href: 'team.html', icon: '👥', label: 'Team' },
      { href: 'profile.html', icon: '👤', label: 'Profile' },
      { href: 'settings.html', icon: '⚙️', label: 'Settings' },
      { href: 'security.html', icon: '🔒', label: 'Security' },
      { href: 'themes.html', icon: '🎨', label: 'Themes' }
    ]}
  ];

  function getCurrentPage() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    return path;
  }

  function renderSidebar() {
    const container = document.getElementById('sidebar');
    if (!container) return;
    const current = getCurrentPage();
    let html = `
      <div class="sidebar-logo">
        <div class="logo-icon">⚡</div>
        <span>SocialPulse</span>
      </div>`;
    NAV_ITEMS.forEach(section => {
      html += `<div class="nav-section"><div class="nav-section-title">${section.section}</div>`;
      section.links.forEach(link => {
        const active = current === link.href ? ' active' : '';
        html += `<a href="${link.href}" class="nav-link${active}"><span class="icon">${link.icon}</span>${link.label}</a>`;
      });
      html += '</div>';
    });
    html += `<div class="nav-section" style="margin-top:auto">
      <a href="subscription.html" class="nav-link"><span class="icon">💎</span>Upgrade</a>
      <a href="index.html" class="nav-link"><span class="icon">🏠</span>Landing</a>
    </div>`;
    container.innerHTML = html;
  }

  function renderHeader(title, subtitle) {
    const header = document.getElementById('page-header');
    if (!header) return;
    header.innerHTML = `
      <div>
        <button class="menu-toggle" id="menu-toggle" aria-label="Menu">☰</button>
        <h1 class="page-title">${title}</h1>
        ${subtitle ? `<p class="page-subtitle">${subtitle}</p>` : ''}
      </div>
      <div class="header-actions">
        <div class="search-box">
          <span>🔍</span>
          <input type="search" id="global-search" placeholder="Search posts, campaigns, hashtags...">
        </div>
        <button class="btn btn-icon btn-outline" id="theme-toggle" title="Toggle theme">🌓</button>
        <div style="position:relative">
          <button class="btn btn-icon btn-outline" id="notif-btn">🔔<span class="badge badge-danger" style="position:absolute;top:-4px;right:-4px;font-size:0.6rem" id="notif-count">12</span></button>
          <div class="notif-dropdown glass" id="notif-dropdown"></div>
        </div>
        <a href="profile.html" class="avatar">SP</a>
      </div>`;
  }

  function initLayout(title, subtitle) {
    renderSidebar();
    renderHeader(title, subtitle);
    initMobileMenu();
    initScrollReveal();
    initGlobalSearch();
    if (typeof SocialPulseThemes !== 'undefined') SocialPulseThemes.init();
    if (typeof SocialPulseNotifications !== 'undefined') SocialPulseNotifications.init();
    if (typeof SocialPulseCharts !== 'undefined') {
      setTimeout(() => SocialPulseCharts.initPageCharts(), 100);
    }
    showRandomToast();
  }

  function initMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    if (toggle && sidebar) {
      toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    }
  }

  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  function initGlobalSearch() {
    const input = document.getElementById('global-search');
    if (!input) return;
    input.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('[data-searchable]').forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = !q || text.includes(q) ? '' : 'none';
      });
    });
  }

  function showRandomToast() {
    if (Math.random() > 0.7 && typeof SocialPulseNotifications !== 'undefined') {
      setTimeout(() => {
        const n = SocialPulseData.notifications[SocialPulseData.rand(0, 20)];
        SocialPulseNotifications.toast(n.message, n.icon);
      }, 3000);
    }
  }

  function renderStats(containerId, stats) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const D = SocialPulseData;
    const items = stats || [
      { label: 'Total Followers', value: D.formatNum(D.stats.totalFollowers), change: '+12.4%', positive: true },
      { label: 'Engagement Rate', value: D.stats.engagementRate + '%', change: '+0.8%', positive: true },
      { label: 'Total Reach', value: D.formatNum(D.stats.totalReach), change: '+18.2%', positive: true },
      { label: 'Scheduled Posts', value: D.stats.scheduledPosts, change: '+24 today', positive: true }
    ];
    el.innerHTML = items.map(s => `
      <div class="card stat-card lift reveal">
        <div class="stat-label">${s.label}</div>
        <div class="stat-value">${s.value}</div>
        <div class="stat-change ${s.positive ? 'positive' : 'negative'}">${s.change}</div>
      </div>`).join('');
  }

  function renderActivityFeed(containerId, limit = 20) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = SocialPulseData.activity.slice(0, limit).map(a => `
      <div class="activity-item">
        <div class="activity-dot ${a.type}"></div>
        <div>
          <strong>${a.action}</strong> on ${a.platform}
          <div class="text-muted" style="font-size:0.8rem">${a.time} · ${a.detail}</div>
        </div>
      </div>`).join('');
  }

  function renderPlatformCards(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = SocialPulseData.platformStats.map(p => `
      <div class="card platform-card lift reveal" data-searchable>
        ${p.connected ? '<div class="connected-indicator"></div>' : ''}
        <div class="platform-icon ${p.class}">${p.icon}</div>
        <h4>${p.name}</h4>
        <div class="followers">${SocialPulseData.formatNum(p.followers)}</div>
        <div class="text-muted" style="font-size:0.8rem">+${p.growth}% growth</div>
        <div class="mt-1"><span class="badge ${p.connected ? 'badge-success' : 'badge-warning'}">${p.connected ? 'Connected' : 'Disconnected'}</span></div>
      </div>`).join('');
  }

  function renderTable(containerId, rows, columns) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const thead = columns.map(c => `<th>${c.label}</th>`).join('');
    const tbody = rows.map(row => {
      const cells = columns.map(c => `<td>${typeof c.render === 'function' ? c.render(row) : row[c.key]}</td>`).join('');
      return `<tr data-searchable>${cells}</tr>`;
    }).join('');
    el.innerHTML = `<table class="data-table"><thead><tr>${thead}</tr></thead><tbody>${tbody}</tbody></table>`;
  }

  function createParticles(count = 30) {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDelay = Math.random() * 15 + 's';
      p.style.animationDuration = (10 + Math.random() * 10) + 's';
      container.appendChild(p);
    }
  }

  function initLanding() {
    createParticles(40);
    const nav = document.querySelector('.landing-nav');
    if (nav) {
      window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
      });
    }
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      });
    });
    initScrollReveal();
    if (typeof SocialPulseThemes !== 'undefined') SocialPulseThemes.init();
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'k') { e.preventDefault(); document.getElementById('global-search')?.focus(); }
      if (e.key === 'd') { window.location.href = 'dashboard.html'; }
      if (e.key === 'n') { window.location.href = 'notifications.html'; }
    }
  });

  return {
    initLayout,
    initLanding,
    renderStats,
    renderActivityFeed,
    renderPlatformCards,
    renderTable,
    createParticles,
    getCurrentPage,
    NAV_ITEMS
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page === 'landing') {
    SocialPulseApp.initLanding();
  }
});

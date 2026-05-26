/* SocialPulse - Audience Insights */
const SocialPulseAudience = (function () {
  function renderDemographics(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const demo = SocialPulseData.audience.demographics;
    el.innerHTML = `
      <div class="demographic-grid">
        ${demo.age.map(a => `<div class="card demo-card reveal"><div class="percent">${a.percent}%</div><div class="text-muted">Age ${a.label}</div></div>`).join('')}
        ${demo.gender.map(g => `<div class="card demo-card reveal"><div class="percent">${g.percent}%</div><div class="text-muted">${g.label}</div></div>`).join('')}
      </div>`;
  }

  function renderLocations(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = SocialPulseData.audience.locations.slice(0, 20).map((loc, i) => `
      <div class="metric-row reveal" data-searchable>
        <span>${loc.city}</span>
        <div class="metric-bar"><div class="metric-bar-fill" style="width:${loc.percent}%"></div></div>
        <span style="min-width:80px;text-align:right">${SocialPulseData.formatNum(loc.users)}</span>
      </div>`).join('');
  }

  function renderInterests(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = SocialPulseData.audience.interests.map(int => `
      <div class="metric-row reveal" data-searchable>
        <span>${int.name}</span>
        <div class="metric-bar"><div class="metric-bar-fill" style="width:${Math.min(100, parseFloat(int.percent) * 3)}%"></div></div>
        <span class="trend-tag trend-${parseFloat(int.growth) >= 0 ? 'up' : 'down'}">${int.growth}%</span>
      </div>`).join('');
  }

  function renderMap(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.className = 'map-placeholder card';
    el.innerHTML = SocialPulseData.audience.locations.slice(0, 15).map((_, i) =>
      `<div class="map-dot" style="left:${10 + (i * 5) % 80}%;top:${15 + (i * 7) % 70}%"></div>`
    ).join('') + '<div style="position:absolute;bottom:1rem;left:1rem" class="text-muted">Geographic audience distribution (demo)</div>';
  }

  function renderActiveHours(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const hours = SocialPulseData.audience.activeHours;
    const max = Math.max(...hours.map(h => h.activity));
    el.innerHTML = hours.map(h => `
      <div style="flex:1;text-align:center">
        <div style="height:${(h.activity / max) * 80}px;background:var(--gradient-1);border-radius:4px 4px 0 0;margin:0 2px"></div>
        <div style="font-size:0.6rem;color:var(--text-muted);margin-top:4px">${h.hour}</div>
      </div>`).join('');
    el.style.display = 'flex';
    el.style.alignItems = 'flex-end';
    el.style.height = '100px';
  }

  function init() {
    renderDemographics('audience-demographics');
    renderLocations('audience-locations');
    renderInterests('audience-interests');
    renderMap('audience-map');
    renderActiveHours('active-hours-chart');
  }

  return { init, renderDemographics, renderLocations };
})();

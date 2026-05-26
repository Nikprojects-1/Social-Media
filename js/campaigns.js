/* SocialPulse - Campaigns */
const SocialPulseCampaigns = (function () {
  function renderCampaigns(containerId, limit = 45) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = SocialPulseData.campaigns.slice(0, limit).map(c => `
      <div class="card lift reveal" data-searchable style="margin-bottom:1rem">
        <div class="flex-between mb-2">
          <h4>${c.name}</h4>
          <span class="badge badge-${c.status === 'Active' ? 'success' : c.status === 'Paused' ? 'warning' : 'primary'}">${c.status}</span>
        </div>
        <div class="text-muted" style="font-size:0.8rem;margin-bottom:1rem">${c.platform} · ${c.goal} · ${c.startDate} → ${c.endDate}</div>
        <div class="grid-4" style="gap:0.75rem;margin-bottom:1rem">
          <div><div class="stat-label">Budget</div><div style="font-weight:600">$${c.budget.toLocaleString()}</div></div>
          <div><div class="stat-label">Spent</div><div style="font-weight:600">$${c.spent.toLocaleString()}</div></div>
          <div><div class="stat-label">ROI</div><div class="text-${parseFloat(c.roi) >= 0 ? 'success' : 'danger'}">${c.roi}%</div></div>
          <div><div class="stat-label">Conv.</div><div style="font-weight:600">${c.conversions.toLocaleString()}</div></div>
        </div>
        <div class="metric-bar"><div class="metric-bar-fill" style="width:${c.progress}%"></div></div>
        <div class="text-muted" style="font-size:0.75rem;margin-top:0.25rem">${c.progress}% goal progress · ${SocialPulseData.formatNum(c.impressions)} impressions</div>
      </div>`).join('');
  }

  function renderCampaignCards(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = SocialPulseData.campaigns.slice(0, 12).map(c => `
      <div class="card reveal" data-searchable>
        <span class="badge badge-${c.status === 'Active' ? 'success' : 'warning'}">${c.status}</span>
        <h4 class="mt-1" style="font-size:0.95rem">${c.name}</h4>
        <div class="stat-value" style="font-size:1.25rem;margin:0.5rem 0">${c.roi}%</div>
        <div class="text-muted" style="font-size:0.75rem">ROI · ${c.platform}</div>
      </div>`).join('');
  }

  function init() {
    renderCampaigns('campaigns-list');
    renderCampaignCards('campaign-cards-grid');
  }

  return { renderCampaigns, init };
})();

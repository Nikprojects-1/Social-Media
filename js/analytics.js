/* SocialPulse - Analytics Page Helpers */
const SocialPulseAnalytics = (function () {
  function renderTopPosts(containerId, limit = 15) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const sorted = [...SocialPulseData.posts].sort((a, b) => b.likes - a.likes).slice(0, limit);
    el.innerHTML = sorted.map(p => `
      <div class="top-post-card reveal" data-searchable>
        <div class="post-thumb">${SocialPulseData.platformIcons[p.platform]}</div>
        <div style="flex:1;min-width:0">
          <div class="flex-between"><strong class="truncate">${p.title}</strong><span class="badge badge-accent">${p.engagement}%</span></div>
          <div class="text-muted" style="font-size:0.75rem">${p.platform} · ${p.date}</div>
          <div class="flex gap-2 mt-1" style="font-size:0.8rem">
            <span>❤️ ${SocialPulseData.formatNum(p.likes)}</span>
            <span>💬 ${p.comments}</span>
            <span>🔄 ${p.shares}</span>
            <span>📌 ${p.saves}</span>
          </div>
        </div>
      </div>`).join('');
  }

  function renderEngagementBreakdown(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const em = SocialPulseData.engagementMetrics;
    const items = [
      { label: 'Likes', value: em.likes, icon: '❤️' },
      { label: 'Comments', value: em.comments, icon: '💬' },
      { label: 'Shares', value: em.shares, icon: '🔄' },
      { label: 'Saves', value: em.saves, icon: '📌' },
      { label: 'Clicks', value: em.clicks, icon: '👆' },
      { label: 'CTR', value: em.ctr + '%', icon: '📊' }
    ];
    const max = em.likes;
    el.innerHTML = items.map(item => `
      <div class="metric-row reveal">
        <span>${item.icon} ${item.label}</span>
        <div class="metric-bar"><div class="metric-bar-fill" style="width:${typeof item.value === 'number' ? (item.value / max) * 100 : 50}%"></div></div>
        <strong>${typeof item.value === 'number' ? SocialPulseData.formatNum(item.value) : item.value}</strong>
      </div>`).join('');
  }

  function renderHashtags(containerId, limit = 100) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const tags = SocialPulseData.hashtags.slice(0, limit);
    el.innerHTML = `<div class="hashtag-cloud">${tags.map((t, i) => {
      const size = i < 10 ? 'large' : i < 40 ? 'medium' : 'small';
      return `<span class="hashtag-chip ${size}" data-searchable title="${SocialPulseData.formatNum(t.posts)} posts">${t.tag} <small>(${t.engagement}%)</small></span>`;
    }).join('')}</div>`;
  }

  function renderComments(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = SocialPulseData.comments.map(c => `
      <div class="card reveal" style="margin-bottom:0.75rem" data-searchable>
        <div class="flex gap-2">
          <div class="avatar avatar-sm">${c.avatar}</div>
          <div style="flex:1">
            <div class="flex-between"><strong>${c.user}</strong><span class="text-muted" style="font-size:0.75rem">${c.time}</span></div>
            <div class="text-muted" style="font-size:0.8rem">${c.platform} · ${c.post} ${c.spam ? '<span class="badge badge-danger">Spam</span>' : ''}</div>
            <p class="mt-1">${c.text}</p>
            <div class="flex gap-2 mt-1" style="font-size:0.8rem">
              <span>👍 ${c.likes}</span><span>↩️ ${c.replies} replies</span>
              <span class="badge badge-${c.sentiment === 'positive' ? 'success' : c.sentiment === 'negative' ? 'danger' : 'primary'}">${c.sentiment}</span>
            </div>
          </div>
        </div>
      </div>`).join('');
  }

  function renderMessages(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = SocialPulseData.messages.map(m => `
      <div class="card reveal" style="margin-bottom:0.5rem;cursor:pointer;padding:1rem" data-searchable>
        <div class="flex gap-2">
          <div class="avatar">${m.avatar}</div>
          <div style="flex:1;min-width:0">
            <div class="flex-between">
              <strong>${m.user} ${m.online ? '<span style="color:var(--success);font-size:0.6rem">●</span>' : ''}</strong>
              <span class="text-muted" style="font-size:0.75rem">${m.time}</span>
            </div>
            <div class="text-muted truncate" style="font-size:0.85rem">${m.preview}</div>
            <span class="badge badge-accent">${m.platform}</span>
            ${m.unread ? `<span class="badge badge-danger">${m.unread} new</span>` : ''}
          </div>
        </div>
      </div>`).join('');
  }

  function renderMedia(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = SocialPulseData.media.map(m => `
      <div class="card reveal" style="padding:0;overflow:hidden" data-searchable>
        <div style="height:120px;background:var(--gradient-1);display:flex;align-items:center;justify-content:center;font-size:2rem">
          ${m.type === 'video' ? '🎬' : m.type === 'gif' ? '🎞️' : '🖼️'}
        </div>
        <div style="padding:0.75rem">
          <div class="truncate" style="font-size:0.8rem;font-weight:600">${m.name}</div>
          <div class="text-muted" style="font-size:0.7rem">${m.dimensions} · ${m.size}</div>
          <div class="text-muted" style="font-size:0.7rem">Used ${m.used} times</div>
        </div>
      </div>`).join('');
    el.style.display = 'grid';
    el.style.gridTemplateColumns = 'repeat(auto-fill, minmax(160px, 1fr))';
    el.style.gap = '1rem';
  }

  function renderCompetitors(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = SocialPulseData.competitors.map(c => `
      <div class="card reveal" data-searchable>
        <h4>${c.name}</h4>
        <div class="grid-2 mt-2" style="gap:0.5rem;font-size:0.85rem">
          <div><span class="text-muted">Followers</span><br><strong>${SocialPulseData.formatNum(c.followers)}</strong></div>
          <div><span class="text-muted">Growth</span><br><strong class="text-success">+${c.growth}%</strong></div>
          <div><span class="text-muted">Engagement</span><br><strong>${c.engagement}%</strong></div>
          <div><span class="text-muted">Overlap</span><br><strong>${c.overlap}%</strong></div>
        </div>
      </div>`).join('');
    el.style.display = 'grid';
    el.style.gridTemplateColumns = 'repeat(auto-fill, minmax(240px, 1fr))';
    el.style.gap = '1rem';
  }

  function init() {
    renderTopPosts('top-posts');
    renderEngagementBreakdown('engagement-breakdown');
  }

  return {
    init, renderTopPosts, renderEngagementBreakdown, renderHashtags,
    renderComments, renderMessages, renderMedia, renderCompetitors
  };
})();

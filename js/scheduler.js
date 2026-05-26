/* SocialPulse - Scheduler & Calendar */
const SocialPulseScheduler = (function () {
  function renderScheduledPosts(containerId, limit = 50) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const posts = SocialPulseData.scheduledPosts.slice(0, limit);
    el.innerHTML = posts.map(p => `
      <div class="card top-post-card reveal" data-searchable style="margin-bottom:0.75rem">
        <div class="post-thumb">${SocialPulseData.platformIcons[p.platform] || '📱'}</div>
        <div style="flex:1">
          <div class="flex-between">
            <strong class="truncate">${p.title}</strong>
            <span class="badge badge-primary">${p.status}</span>
          </div>
          <div class="text-muted" style="font-size:0.8rem">${p.platform} · ${p.type} · ${p.date} ${p.time}</div>
          <p style="font-size:0.85rem;margin-top:0.5rem" class="truncate">${p.caption}</p>
          <div class="gap-1 flex mt-1" style="flex-wrap:wrap">
            ${p.hashtags.slice(0, 4).map(h => `<span class="hashtag-chip small">#${h}</span>`).join('')}
          </div>
        </div>
      </div>`).join('');
  }

  function renderCalendar(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const postsByDay = {};
    SocialPulseData.scheduledPosts.forEach(p => {
      const d = parseInt(p.date.split('-')[2], 10);
      if (!postsByDay[d]) postsByDay[d] = [];
      postsByDay[d].push(p);
    });

    let html = `<div class="flex-between mb-2"><h3>${monthNames[month]} ${year}</h3><div class="gap-1 flex"><button class="btn btn-sm btn-outline">←</button><button class="btn btn-sm btn-outline">→</button></div></div>`;
    html += '<div class="calendar-grid" style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px">';
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(d => {
      html += `<div style="text-align:center;font-size:0.7rem;color:var(--text-muted);padding:0.5rem">${d}</div>`;
    });
    for (let i = 0; i < firstDay; i++) html += '<div></div>';
    for (let day = 1; day <= daysInMonth; day++) {
      const count = postsByDay[day]?.length || 0;
      const isToday = day === now.getDate();
      html += `<div class="card" style="min-height:70px;padding:0.5rem;font-size:0.8rem;${isToday ? 'border-color:var(--primary)' : ''}">
        <div style="font-weight:600">${day}</div>
        ${count ? `<div style="font-size:0.65rem;color:var(--accent);margin-top:0.25rem">${count} posts</div>` : ''}
      </div>`;
    }
    html += '</div>';
    el.innerHTML = html;
  }

  function renderQueue(containerId) {
    renderScheduledPosts(containerId, 30);
  }

  function initSchedulerPage() {
    renderScheduledPosts('scheduled-posts-list', 60);
    renderCalendar('content-calendar');
    renderQueue('post-queue');
  }

  function initCalendarPage() {
    renderCalendar('main-calendar');
    renderScheduledPosts('calendar-posts-list', 40);
  }

  return { renderScheduledPosts, renderCalendar, initSchedulerPage, initCalendarPage };
})();

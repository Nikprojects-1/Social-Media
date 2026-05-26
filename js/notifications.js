/* SocialPulse - Notifications System */
const SocialPulseNotifications = (function () {
  let toastContainer;

  function ensureContainer() {
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }
  }

  function toast(message, icon = '🔔', duration = 4000) {
    ensureContainer();
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `<span style="font-size:1.25rem">${icon}</span><div><strong>Notification</strong><p style="font-size:0.85rem;margin-top:0.25rem;color:var(--text-muted)">${message}</p></div>`;
    toastContainer.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 300); }, duration);
  }

  function renderDropdown() {
    const dropdown = document.getElementById('notif-dropdown');
    if (!dropdown) return;
    const unread = SocialPulseData.notifications.filter(n => !n.read).length;
    const countEl = document.getElementById('notif-count');
    if (countEl) countEl.textContent = unread > 99 ? '99+' : unread;

    dropdown.innerHTML = `
      <div style="padding:1rem;border-bottom:1px solid var(--border)" class="flex-between">
        <strong>Notifications</strong>
        <a href="notifications.html" style="font-size:0.8rem">View all</a>
      </div>
      ${SocialPulseData.notifications.slice(0, 15).map(n => `
        <div class="notif-item ${n.read ? '' : 'unread'}">
          <span style="font-size:1.25rem">${n.icon}</span>
          <div>
            <div style="font-size:0.875rem">${n.message}</div>
            <div class="text-muted" style="font-size:0.75rem">${n.time} · <span class="badge badge-${n.priority === 'high' ? 'danger' : 'primary'}">${n.priority}</span></div>
          </div>
        </div>`).join('')}`;
  }

  function renderNotificationsPage() {
    const list = document.getElementById('notifications-list');
    if (!list) return;
    list.innerHTML = SocialPulseData.notifications.map(n => `
      <div class="card notif-item ${n.read ? '' : 'unread'} reveal" style="margin-bottom:0.75rem;display:flex" data-searchable>
        <span style="font-size:1.5rem;margin-right:1rem">${n.icon}</span>
        <div style="flex:1">
          <div class="flex-between">
            <strong>${n.message}</strong>
            <span class="text-muted" style="font-size:0.8rem">${n.time}</span>
          </div>
          <div class="mt-1">
            <span class="badge badge-accent">${n.platform}</span>
            <span class="badge badge-${n.type === 'alert' ? 'danger' : 'primary'}">${n.type}</span>
            ${!n.read ? '<span class="badge badge-success">New</span>' : ''}
          </div>
        </div>
      </div>`).join('');
  }

  function init() {
    renderDropdown();
    document.getElementById('notif-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('notif-dropdown')?.classList.toggle('open');
    });
    document.addEventListener('click', () => {
      document.getElementById('notif-dropdown')?.classList.remove('open');
    });
    renderNotificationsPage();
  }

  return { init, toast, renderDropdown, renderNotificationsPage };
})();

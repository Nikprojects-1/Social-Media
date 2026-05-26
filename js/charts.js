/* SocialPulse - Chart Rendering (Canvas) */
const SocialPulseCharts = (function () {
  const colors = ['#7C3AED', '#06B6D4', '#22C55E', '#F59E0B', '#EF4444', '#EC4899', '#8B5CF6', '#14B8A6'];

  function getCtx(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = (rect.height || 280) * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = (rect.height || 280) + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return { ctx, w: rect.width, h: rect.height || 280 };
  }

  function clear(ctx, w, h) {
    ctx.clearRect(0, 0, w, h);
  }

  function lineChart(canvasId, labels, datasets, options = {}) {
    const g = getCtx(canvasId);
    if (!g) return;
    const { ctx, w, h } = g;
    clear(ctx, w, h);
    const pad = { top: 20, right: 20, bottom: 40, left: 50 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;
    const allVals = datasets.flatMap(d => d.data);
    const max = Math.max(...allVals) * 1.1 || 1;
    const min = options.beginAtZero !== false ? 0 : Math.min(...allVals) * 0.9;

    ctx.strokeStyle = 'rgba(148,163,184,0.15)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = pad.top + (chartH / 5) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();
    }

    datasets.forEach((ds, di) => {
      const color = ds.color || colors[di % colors.length];
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ds.data.forEach((val, i) => {
        const x = pad.left + (chartW / (ds.data.length - 1 || 1)) * i;
        const y = pad.top + chartH - ((val - min) / (max - min || 1)) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      if (options.fill) {
        ctx.lineTo(pad.left + chartW, pad.top + chartH);
        ctx.lineTo(pad.left, pad.top + chartH);
        ctx.closePath();
        const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
        grad.addColorStop(0, color.replace(')', ', 0.3)').replace('rgb', 'rgba').replace('#', '') || 'rgba(124,58,237,0.3)');
        ctx.fillStyle = di === 0 ? 'rgba(124, 58, 237, 0.15)' : 'rgba(6, 182, 212, 0.1)';
        ctx.fill();
      }
    });

    ctx.fillStyle = '#94A3B8';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'center';
    labels.forEach((label, i) => {
      const x = pad.left + (chartW / (labels.length - 1 || 1)) * i;
      ctx.fillText(label, x, h - 12);
    });
  }

  function barChart(canvasId, labels, data, options = {}) {
    const g = getCtx(canvasId);
    if (!g) return;
    const { ctx, w, h } = g;
    clear(ctx, w, h);
    const pad = { top: 20, right: 20, bottom: 40, left: 50 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;
    const max = Math.max(...data) * 1.15 || 1;
    const barW = (chartW / data.length) * 0.65;
    const gap = (chartW / data.length) * 0.35;

    data.forEach((val, i) => {
      const barH = (val / max) * chartH;
      const x = pad.left + (chartW / data.length) * i + gap / 2;
      const y = pad.top + chartH - barH;
      const grad = ctx.createLinearGradient(x, y, x, pad.top + chartH);
      grad.addColorStop(0, options.color || colors[i % colors.length]);
      grad.addColorStop(1, 'rgba(124, 58, 237, 0.4)');
      ctx.fillStyle = options.singleColor || grad;
      if (options.singleColor) ctx.fillStyle = options.singleColor;
      else ctx.fillStyle = colors[i % colors.length];
      ctx.beginPath();
      const r = 6;
      ctx.roundRect(x, y, barW, barH, [r, r, 0, 0]);
      ctx.fill();
    });

    ctx.fillStyle = '#94A3B8';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';
    labels.forEach((label, i) => {
      const x = pad.left + (chartW / data.length) * i + chartW / data.length / 2;
      ctx.fillText(label, x, h - 12);
    });
  }

  function doughnutChart(canvasId, data, labels) {
    const g = getCtx(canvasId);
    if (!g) return;
    const { ctx, w, h } = g;
    clear(ctx, w, h);
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) / 2 - 30;
    const inner = radius * 0.6;
    const total = data.reduce((a, b) => a + b, 0);
    let start = -Math.PI / 2;

    data.forEach((val, i) => {
      const slice = (val / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, start, start + slice);
      ctx.arc(cx, cy, inner, start + slice, start, true);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      start += slice;
    });

    ctx.fillStyle = '#F8FAFC';
    ctx.font = 'bold 24px Space Grotesk, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(total > 1000 ? (total / 1000).toFixed(1) + 'K' : total, cx, cy);
  }

  function renderProgressRings() {
    document.querySelectorAll('[data-progress]').forEach(el => {
      const val = parseFloat(el.dataset.progress) || 0;
      const svg = el.querySelector('circle.progress');
      if (!svg) return;
      const r = 52;
      const circ = 2 * Math.PI * r;
      svg.style.strokeDasharray = circ;
      svg.style.strokeDashoffset = circ - (val / 100) * circ;
    });
  }

  function miniBars(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const max = Math.max(...data);
    container.innerHTML = data.map(v =>
      `<div class="mini-bar" style="height: ${(v / max) * 100}%" title="${v}"></div>`
    ).join('');
  }

  function heatmap(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const max = Math.max(...data);
    container.innerHTML = data.map(v => {
      const intensity = v / max;
      const opacity = 0.15 + intensity * 0.85;
      return `<div class="heatmap-cell" style="background: rgba(124, 58, 237, ${opacity})" title="${v}% activity"></div>`;
    }).join('');
  }

  function initPageCharts(page) {
    const D = typeof SocialPulseData !== 'undefined' ? SocialPulseData : null;
    if (!D) return;

    if (document.getElementById('chart-growth')) {
      lineChart('chart-growth', D.dayLabels.concat(['W2', 'W3', 'W4']).slice(0, 12),
        [{ data: D.weeklyGrowth.concat(D.weeklyGrowth.slice(0, 5)), color: '#7C3AED' }], { fill: true });
    }
    if (document.getElementById('chart-reach')) {
      lineChart('chart-reach', ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        [{ data: D.monthlyReach, color: '#06B6D4' }], { fill: true });
    }
    if (document.getElementById('chart-engagement')) {
      barChart('chart-engagement', D.dayLabels, D.engagementByDay, { singleColor: '#7C3AED' });
    }
    if (document.getElementById('chart-platforms')) {
      doughnutChart('chart-platforms',
        D.platformStats.map(p => p.followers),
        D.platformStats.map(p => p.name));
    }
    if (document.getElementById('chart-engagement-pie')) {
      const em = D.engagementMetrics;
      doughnutChart('chart-engagement-pie', [em.likes / 10000, em.comments, em.shares, em.saves], ['Likes', 'Comments', 'Shares', 'Saves']);
    }
    if (document.getElementById('chart-monthly-eng')) {
      const m = D.engagementMetrics.monthly;
      barChart('chart-monthly-eng', m.map(x => x.month), m.map(x => x.likes / 1000), { singleColor: '#06B6D4' });
    }
    if (document.getElementById('chart-audience-age')) {
      barChart('chart-audience-age', D.audience.demographics.age.map(a => a.label), D.audience.demographics.age.map(a => a.percent));
    }
    if (document.getElementById('chart-campaign-roi')) {
      barChart('chart-campaign-roi', D.campaigns.slice(0, 8).map(c => 'C' + c.id),
        D.campaigns.slice(0, 8).map(c => Math.max(0, parseFloat(c.roi))));
    }
    renderProgressRings();
    miniBars('mini-chart-bars', D.weeklyGrowth.slice(0, 7));
    if (document.getElementById('heatmap-grid')) {
      heatmap('heatmap-grid', Array.from({ length: 168 }, () => SocialPulseData.rand(10, 100)));
    }
  }

  window.addEventListener('resize', () => {
    clearTimeout(window._chartResize);
    window._chartResize = setTimeout(() => initPageCharts(), 250);
  });

  return { lineChart, barChart, doughnutChart, miniBars, heatmap, renderProgressRings, initPageCharts };
})();

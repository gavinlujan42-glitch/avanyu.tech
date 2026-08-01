const clock = document.getElementById('clock');
const formatTime = () => new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Denver',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
}).format(new Date());

function tick() {
  if (clock) clock.textContent = formatTime();
}
tick();
setInterval(tick, 1000);

const detailTitle = document.getElementById('detailTitle');
const detailSub = document.getElementById('detailSub');
const detailData = document.getElementById('detailData');

function renderDetail(title, subtitle, values) {
  detailTitle.textContent = title;
  detailSub.textContent = subtitle;
  detailData.innerHTML = values.map(([label, value]) =>
    `<div><dt>${label}</dt><dd>${value}</dd></div>`
  ).join('');
}

document.querySelectorAll('.asset-row').forEach((row) => {
  row.addEventListener('click', () => {
    const [title, subtitle, status, latency, security, recovery] = row.dataset.detail.split('|');
    renderDetail(title, subtitle, [
      ['Status', status],
      ['Response', latency],
      ['Security', security],
      ['Recovery', recovery]
    ]);
  });
});

document.querySelectorAll('.node').forEach((node) => {
  node.addEventListener('click', () => {
    const state = node.classList.contains('bad') ? 'Offline' : node.classList.contains('warn') ? 'Warning' : 'Healthy';
    renderDetail(node.dataset.name, 'Network fabric node', [
      ['Status', state],
      ['Protocol', 'SNMP / ICMP ready'],
      ['Polling', '30 seconds'],
      ['Source', 'Demo telemetry']
    ]);
  });
});

document.querySelectorAll('.ack').forEach((button) => {
  button.addEventListener('click', () => {
    button.closest('.incident').classList.add('acknowledged');
    button.textContent = 'DONE';
  });
});

document.getElementById('ackAll')?.addEventListener('click', () => {
  document.querySelectorAll('.incident').forEach((incident) => incident.classList.add('acknowledged'));
  document.querySelectorAll('.ack').forEach((button) => button.textContent = 'DONE');
});

document.querySelectorAll('.quick-actions button').forEach((button) => {
  button.addEventListener('click', () => {
    const original = button.textContent;
    button.textContent = 'QUEUED';
    setTimeout(() => { button.textContent = original; }, 1400);
  });
});
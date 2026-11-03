/* ============================================================
   STATE
   ============================================================ */
var pages = [];
var MOVES = 100000;
var oldResults = [], newResults = [];
var visLimit = 20;
var curQuery = 'pizza';
var tblPage = 1;
var TPP = 25;

/* ============================================================
   INIT
   ============================================================ */
function init() {
  pages = PAGES_DATA.map(function(d) {
    return {id: d.id, url: d.url, text: d.text, links: d.links,
            inLinks: 0, visits: 0, surferScore: 0};
  });
  pages.forEach(function(p) {
    p.links.forEach(function(tid) {
      if (pages[tid - 1]) pages[tid - 1].inLinks++;
    });
  });
  document.getElementById('pgCount').textContent = pages.length.toLocaleString();
}

/* ============================================================
   RANDOM SURFER - 100,000 moves, 15% teleport
   ============================================================ */
function runSurfer() {
  pages.forEach(function(p) { p.visits = 0; });
  var cur = pages[Math.floor(Math.random() * pages.length)];
  for (var m = 0; m < MOVES; m++) {
    cur.visits++;
    if (Math.random() < 0.15 || cur.links.length === 0) {
      cur = pages[Math.floor(Math.random() * pages.length)];
    } else {
      var nid = cur.links[Math.floor(Math.random() * cur.links.length)];
      cur = pages[nid - 1] || pages[0];
    }
  }
  var sum = 0;
  pages.forEach(function(p) {
    p.surferScore = (p.visits / MOVES) * 100;
    sum += p.surferScore;
  });
  document.getElementById('scoreSum').textContent = sum.toFixed(1) + '%';
  tblPage = 1;
  renderDir();
}

/* ============================================================
   HELPERS: whole-word counting and highlighting
   ============================================================ */
function escRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function countWord(text, word) {
  var m = text.match(new RegExp('\\b' + escRe(word) + '\\b', 'gi'));
  return m ? m.length : 0;
}
function highlight(text, word) {
  return text.replace(new RegExp('\\b(' + escRe(word) + ')\\b', 'gi'), '<mark>$1</mark>');
}
function fmt(score) {
  return score < 0.1 ? score.toFixed(2) + '%' : score.toFixed(1) + '%';
}

/* ============================================================
   SEARCH
   ============================================================ */
function search() {
  var q = document.getElementById('q').value.trim();
  curQuery = q;
  var meta = document.getElementById('results-meta');
  var ra = document.getElementById('results-area');
  var es = document.getElementById('empty-state');

  if (!q) { meta.textContent = 'Enter a search word above.'; return; }

  var matching = [];
  pages.forEach(function(p) {
    var c = countWord(p.text, q);
    if (c > 0) matching.push(Object.assign({}, p, {kw: c}));
  });

  if (matching.length === 0) {
    ra.style.display = 'none';
    es.style.display = 'block';
    document.getElementById('miss-word').textContent = '"' + q + '"';
    meta.textContent = '0 results for "' + q + '" across 1,000 pages.';
    return;
  }

  ra.style.display = 'block';
  es.style.display = 'none';
  meta.textContent = 'Found ' + matching.length + ' page' + (matching.length > 1 ? 's' : '') +
    ' matching "' + q + '" across 1,000 indexed pages.';

  /* Old way (1997): highest keyword count first */
  oldResults = matching.slice().sort(function(a, b) { return b.kw - a.kw; });
  /* Surfer way (1998): highest surfer score first — pure PageRank */
  newResults = matching.slice().sort(function(a, b) { return b.surferScore - a.surferScore; });

  visLimit = 20;
  renderCards();
}

/* ============================================================
   RENDER RESULT CARDS
   ============================================================ */
function renderCards() {
  renderCol('old-list', oldResults, true);
  renderCol('new-list', newResults, false);

  var oldMore = document.getElementById('old-more');
  var newMore = document.getElementById('new-more');

  if (oldResults.length > visLimit) {
    oldMore.style.display = 'block';
    document.getElementById('old-more-btn').textContent =
      'Show all ' + oldResults.length + ' results (+' + (oldResults.length - visLimit) + ' more)';
  } else { oldMore.style.display = 'none'; }

  if (newResults.length > visLimit) {
    newMore.style.display = 'block';
    document.getElementById('new-more-btn').textContent =
      'Show all ' + newResults.length + ' results (+' + (newResults.length - visLimit) + ' more)';
  } else { newMore.style.display = 'none'; }
}

function renderCol(elId, list, isOld) {
  var el = document.getElementById(elId);
  el.innerHTML = list.slice(0, visLimit).map(function(p, i) {
    var isSpam = p.kw >= 10 && p.inLinks === 0;
    var spamTag = isSpam
      ? (isOld
          ? '<span class="spam-tag red">Warning Keyword Spammer!</span>'
          : '<span class="spam-tag blue">Shield Spam pushed to bottom!</span>')
      : '';
    var score = isOld
      ? '<span class="score-red">Word Count: <strong>' + p.kw + '</strong></span>' +
        '<span style="font-size:11.5px;color:var(--muted)">(Links in: ' + p.inLinks + ')</span>'
      : '<span class="score-green">Surfer: <strong>' + fmt(p.surferScore) + '</strong></span>' +
        '<span class="links-in">Links in: <strong>' + p.inLinks + '</strong></span>';
    return '<div class="card' + (isSpam ? ' spam' : '') + '">' +
      '<div class="card-top">' +
        '<span class="rank' + (i === 0 ? ' gold' : '') + '">Rank #' + (i + 1) + '</span>' +
        spamTag +
      '</div>' +
      '<a href="http://' + p.url + '" class="card-url" onclick="return false">' + p.url + '</a>' +
      '<p class="card-text">' + highlight(p.text, curQuery) + '</p>' +
      '<div class="card-foot">' + score + '</div>' +
      '</div>';
  }).join('');
}

/* ============================================================
   DIRECTORY TABLE (1,000 pages, paginated, filterable)
   ============================================================ */
function renderDir() {
  var filterText = (document.getElementById('filter').value || '').toLowerCase().trim();
  var filtered = pages.filter(function(p) {
    if (!filterText) return true;
    return p.url.toLowerCase().indexOf(filterText) >= 0 ||
           p.text.toLowerCase().indexOf(filterText) >= 0 ||
           String(p.id) === filterText;
  });

  var total = filtered.length;
  var maxPage = Math.max(1, Math.ceil(total / TPP));
  if (tblPage > maxPage) tblPage = maxPage;
  if (tblPage < 1) tblPage = 1;

  var start = (tblPage - 1) * TPP;
  var rows = filtered.slice(start, start + TPP);

  document.getElementById('dir-body').innerHTML = rows.map(function(p) {
    return '<tr>' +
      '<td class="tc">' + p.id + '</td>' +
      '<td><strong>' + p.url + '</strong></td>' +
      '<td style="color:#5f6368">' + p.text + '</td>' +
      '<td class="tc">' + p.links.join(', ') + '</td>' +
      '<td class="tc"><strong>' + p.inLinks + '</strong></td>' +
      '<td class="tr">' + p.visits.toLocaleString() + '</td>' +
      '<td class="tr"><strong>' + p.surferScore.toFixed(2) + '%</strong></td>' +
      '</tr>';
  }).join('');

  var sumV = 0, sumS = 0;
  pages.forEach(function(p) { sumV += p.visits; sumS += p.surferScore; });
  document.getElementById('tot-visits').textContent = sumV.toLocaleString();
  document.getElementById('tot-score').textContent = sumS.toFixed(1) + '%';
  document.getElementById('pg-info').textContent =
    'Showing ' + Math.min(start + 1, total) + '-' + Math.min(start + TPP, total) +
    ' of ' + total + ' pages (Page ' + tblPage + ' of ' + maxPage + ')';
  document.getElementById('pg-prev').disabled = tblPage <= 1;
  document.getElementById('pg-next').disabled = tblPage >= maxPage;
}

/* ============================================================
   EVENTS
   ============================================================ */
window.addEventListener('DOMContentLoaded', function() {
  init();
  runSurfer();
  search();
  document.getElementById('go').addEventListener('click', search);
  document.getElementById('q').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') search();
  });
  document.querySelectorAll('.ex').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.getElementById('q').value = btn.getAttribute('data-w');
      search();
    });
  });
  document.getElementById('rerun').addEventListener('click', function() { runSurfer(); search(); });
  document.getElementById('old-more-btn').addEventListener('click', function() { visLimit = oldResults.length; renderCards(); });
  document.getElementById('new-more-btn').addEventListener('click', function() { visLimit = newResults.length; renderCards(); });
  document.getElementById('filter').addEventListener('input', function() { tblPage = 1; renderDir(); });
  document.getElementById('pg-prev').addEventListener('click', function() { tblPage--; renderDir(); });
  document.getElementById('pg-next').addEventListener('click', function() { tblPage++; renderDir(); });
});

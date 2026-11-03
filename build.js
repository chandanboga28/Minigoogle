const fs = require('fs');
const path = require('path');

const pagesData = fs.readFileSync(path.join(__dirname, 'pages_data.js'), 'utf-8');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mini Google 1998 - 1,000 Web Pages</title>
  <style>
    :root {
      --g-blue: #4285f4;
      --g-red: #ea4335;
      --g-yellow: #fbbc05;
      --g-green: #34a853;
      --bg: #f8f9fa;
      --border: #dcdcdc;
      --muted: #5f6368;
      --url-green: #006621;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; background: var(--bg); color: #202124; padding: 20px 15px 50px; line-height: 1.5; }
    .container { max-width: 1140px; margin: 0 auto; }

    /* Logo */
    header { text-align: center; margin-bottom: 22px; }
    .logo { font-family: "Times New Roman", serif; font-size: 54px; font-weight: bold; letter-spacing: -1px; text-shadow: 2px 2px 3px rgba(0,0,0,.15); display: inline-block; }
    .lb { color: var(--g-blue); } .lr { color: var(--g-red); } .ly { color: var(--g-yellow); } .lg { color: var(--g-green); }
    .logo-x { font-size: 50px; font-style: italic; color: var(--g-red); }
    .badge { display: inline-block; vertical-align: super; font-size: 13px; background: var(--g-red); color: #fff; padding: 2px 8px; border-radius: 12px; margin-left: 6px; font-weight: bold; }
    .subtitle { color: var(--muted); font-size: 14px; margin-top: 4px; }

    /* Search box */
    .search-box { background: #fff; border: 1px solid var(--border); border-radius: 10px; padding: 22px 20px; box-shadow: 0 2px 6px rgba(0,0,0,.06); margin-bottom: 20px; text-align: center; }
    .row { display: flex; justify-content: center; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 14px; }
    #q { width: 100%; max-width: 480px; padding: 10px 16px; font-size: 16px; border: 2px solid #b5b5b5; border-radius: 24px; outline: none; }
    #q:focus { border-color: var(--g-blue); box-shadow: 0 0 5px rgba(66,133,244,.4); }
    .btn { padding: 10px 18px; font-size: 14px; font-weight: bold; border-radius: 20px; cursor: pointer; border: 1px solid #c6c6c6; background: #f8f9fa; color: #3c4043; transition: all .15s; }
    .btn:hover { background: #ebebeb; }
    .btn-blue { background: var(--g-blue); color: #fff; border-color: #3367d6; }
    .btn-blue:hover { background: #3367d6; }
    .btn-teal { background: #e8f0fe; color: var(--g-blue); border-color: #aecbfa; }
    .btn-teal:hover { background: #d2e3fc; }
    .examples { display: flex; justify-content: center; align-items: center; gap: 8px; flex-wrap: wrap; font-size: 13px; color: var(--muted); }
    .ex { padding: 5px 12px; font-size: 12.5px; border: 1px solid #dadce0; border-radius: 16px; background: #fff; cursor: pointer; color: #202124; font-weight: 500; }
    .ex:hover { background: #f1f3f4; color: var(--g-blue); }

    /* Status bar */
    .status-bar { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; background: #eef3fc; border: 1px solid #d2e3fc; border-radius: 8px; padding: 10px 16px; font-size: 13px; color: #174ea6; margin-bottom: 20px; }
    .status-bar strong { color: #1a73e8; }

    /* Results meta */
    #results-meta { font-size: 14px; color: var(--muted); margin-bottom: 15px; padding: 0 4px; }

    /* Two columns */
    .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; align-items: start; }
    @media(max-width:768px){ .cols { grid-template-columns: 1fr; } }
    .col { background: #fff; border: 1px solid var(--border); border-radius: 10px; padding: 18px; box-shadow: 0 2px 6px rgba(0,0,0,.04); }
    .col-hdr { border-bottom: 2px solid #e0e0e0; padding-bottom: 12px; margin-bottom: 16px; }
    .col-title-old { color: #c5221f; font-size: 18px; font-weight: bold; }
    .col-title-new { color: #137333; font-size: 18px; font-weight: bold; }
    .col-desc { font-size: 12.5px; color: var(--muted); margin-top: 4px; }

    /* Cards */
    .card { border: 1px solid #e4e7eb; border-radius: 8px; padding: 14px 16px; margin-bottom: 14px; background: #fff; transition: transform .15s, box-shadow .15s; }
    .card:hover { transform: translateY(-2px); box-shadow: 0 4px 10px rgba(0,0,0,.08); }
    .card.spam { border-left: 4px solid var(--g-red); background: #fffdfd; }
    .card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
    .rank { font-size: 12px; font-weight: bold; padding: 2px 8px; border-radius: 12px; background: #f1f3f4; color: #3c4043; }
    .rank.gold { background: #fef7e0; color: #b06000; border: 1px solid #f9ab00; }
    .card-url { font-size: 14px; color: var(--url-green); font-weight: 500; text-decoration: none; word-break: break-all; display: block; }
    .card-url:hover { text-decoration: underline; }
    .card-text { font-size: 13.5px; color: #3c4043; margin: 8px 0; }
    mark { background: #fff07c; font-weight: bold; padding: 1px 3px; border-radius: 3px; }
    .card-foot { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px; margin-top: 10px; padding-top: 8px; border-top: 1px dashed #e8eaed; font-size: 12.5px; }
    .score-red { background: #fce8e6; color: #c5221f; font-weight: bold; padding: 3px 10px; border-radius: 14px; }
    .score-green { background: #e6f4ea; color: #137333; font-weight: bold; padding: 3px 10px; border-radius: 14px; }
    .links-in { background: #e8f0fe; color: #1a73e8; font-weight: 600; padding: 3px 9px; border-radius: 14px; }
    .spam-tag { font-size: 11px; font-weight: bold; padding: 2px 6px; border-radius: 4px; }
    .spam-tag.red { color: var(--g-red); background: #fde8e8; }
    .spam-tag.blue { color: #1a73e8; background: #e8f0fe; }

    /* Show more */
    .more-wrap { text-align: center; margin: 15px 0 5px; }
    .btn-more { padding: 8px 16px; font-size: 13px; background: #fff; border: 1px solid #dadce0; border-radius: 16px; cursor: pointer; color: var(--g-blue); font-weight: 500; }
    .btn-more:hover { background: #f1f3f4; }

    /* Empty state */
    .empty { background: #fff; border: 2px dashed #dadce0; border-radius: 12px; padding: 45px 25px; text-align: center; margin: 20px 0; display: none; }
    .empty-icon { font-size: 48px; margin-bottom: 12px; }
    .empty-title { font-size: 20px; font-weight: bold; margin-bottom: 8px; }
    .empty-desc { font-size: 15px; color: var(--muted); max-width: 520px; margin: 0 auto 16px; }

    /* Directory table */
    .dir-section { margin-top: 30px; background: #fff; border: 1px solid var(--border); border-radius: 10px; padding: 20px; }
    .dir-hdr { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 14px; }
    #filter { padding: 6px 12px; font-size: 13px; border: 1px solid #c6c6c6; border-radius: 16px; outline: none; width: 240px; }
    #filter:focus { border-color: var(--g-blue); }
    .tbl-wrap { max-height: 480px; overflow-y: auto; border: 1px solid #e8eaed; border-radius: 6px; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; }
    th, td { border: 1px solid #e8eaed; padding: 7px 10px; text-align: left; }
    th { background: #f8f9fa; font-weight: 600; position: sticky; top: 0; z-index: 2; }
    tr:hover { background: #fafafa; }
    .tr { text-align: right; } .tc { text-align: center; }
    .pg-bar { display: flex; justify-content: space-between; align-items: center; margin-top: 12px; font-size: 13px; color: var(--muted); flex-wrap: wrap; gap: 8px; }
    .pg-btn { padding: 5px 12px; font-size: 12.5px; background: #fff; border: 1px solid #dadce0; border-radius: 6px; cursor: pointer; }
    .pg-btn:disabled { opacity: .4; cursor: not-allowed; }

    footer { text-align: center; margin-top: 35px; font-size: 12px; color: var(--muted); }
  </style>
</head>
<body>
<div class="container">

  <header>
    <div class="logo">
      <span class="lb">M</span><span class="lr">i</span><span class="ly">n</span><span class="lb">i</span>&nbsp;<span class="lb">G</span><span class="lr">o</span><span class="ly">o</span><span class="lb">g</span><span class="lg">l</span><span class="lr">e</span><span class="logo-x">!</span><span class="badge">1998</span>
    </div>
    <p class="subtitle">AI Lab: Keyword Counting (1997) vs. Random Surfer PageRank (1998) — 1,000 Pages</p>
  </header>

  <section class="search-box">
    <div class="row">
      <input type="text" id="q" value="pizza" placeholder="Type a word (pizza, cricket, movie, exam, python, linux…)" autocomplete="off">
      <button class="btn btn-blue" id="go">Search</button>
      <button class="btn btn-teal" id="rerun">🎲 Run the surfer again</button>
    </div>
    <div class="examples">
      <span>Try:</span>
      <button class="ex" data-w="pizza">🍕 pizza</button>
      <button class="ex" data-w="cricket">🏏 cricket</button>
      <button class="ex" data-w="movie">🎬 movie</button>
      <button class="ex" data-w="exam">📝 exam</button>
      <button class="ex" data-w="python">🐍 python</button>
      <button class="ex" data-w="linux">🐧 linux</button>
      <button class="ex" data-w="travel">✈️ travel</button>
      <button class="ex" data-w="biryani">🍛 biryani</button>
    </div>
  </section>

  <div class="status-bar">
    <span>Indexed pages: <strong id="pgCount">1,000</strong></span>
    <span>Surfer moves: <strong>100,000</strong></span>
    <span>Teleport rate: <strong>15%</strong></span>
    <span>Sum of all scores: <strong id="scoreSum">100.0%</strong></span>
  </div>

  <div id="results-meta">Loading…</div>

  <div id="results-area">
    <div class="cols">
      <div class="col">
        <div class="col-hdr">
          <div class="col-title-old">📜 Old way (1997)</div>
          <div class="col-desc">Ranks by <strong>word count</strong>. Spammers just repeat words and win!</div>
        </div>
        <div id="old-list"></div>
        <div class="more-wrap" id="old-more" style="display:none"><button class="btn-more" id="old-more-btn">Show all</button></div>
      </div>
      <div class="col">
        <div class="col-hdr">
          <div class="col-title-new">🏄 Surfer way (1998)</div>
          <div class="col-desc">Ranks by <strong>random surfer score</strong> (PageRank). No in-links = bottom!</div>
        </div>
        <div id="new-list"></div>
        <div class="more-wrap" id="new-more" style="display:none"><button class="btn-more" id="new-more-btn">Show all</button></div>
      </div>
    </div>
  </div>

  <div class="empty" id="empty-state">
    <div class="empty-icon">📼 📠</div>
    <div class="empty-title">No 1998 web pages found!</div>
    <div class="empty-desc">Our 56k dial-up modem searched all 1,000 pages but found zero matches for <strong id="miss-word"></strong>!</div>
    <p style="font-size:13px;color:var(--muted)">Try: pizza, cricket, movie, exam, python, linux, travel, biryani</p>
  </div>

  <!-- All 1,000 pages directory table (always visible) -->
  <section class="dir-section">
    <div class="dir-hdr">
      <div>
        <h3 style="font-size:16px">📑 Directory: All 1,000 Indexed Pages</h3>
        <span style="font-size:12px;color:var(--muted)">All 1,000 surfer scores sum to <strong>100.0%</strong> — you can verify here</span>
      </div>
      <input type="text" id="filter" placeholder="Filter by URL, text or page number…">
    </div>
    <div class="tbl-wrap">
      <table>
        <thead>
          <tr>
            <th class="tc">#</th>
            <th>URL</th>
            <th>Content</th>
            <th class="tc">Links Out</th>
            <th class="tc">Links In</th>
            <th class="tr">Visits (of 100k)</th>
            <th class="tr">Surfer %</th>
          </tr>
        </thead>
        <tbody id="dir-body"></tbody>
        <tfoot>
          <tr style="font-weight:bold;background:#eef3fc">
            <td colspan="5" class="tr">Total:</td>
            <td class="tr" id="tot-visits">100,000</td>
            <td class="tr" id="tot-score">100.0%</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="pg-bar">
      <span id="pg-info">Showing 1–25 of 1,000</span>
      <div>
        <button class="pg-btn" id="pg-prev" disabled>&laquo; Prev</button>
        <button class="pg-btn" id="pg-next">Next &raquo;</button>
      </div>
    </div>
  </section>

  <footer>Mini Google 1998 &bull; Single-file search engine with 1,000 pages &bull; No libraries, no server, no internet.</footer>
</div>

<script>
/* ============================================================
   1,000 WEB PAGES DATA (embedded — rows 1-19 are the original
   Pune college lab seed; rows 20-1000 are generated pages)
   ============================================================ */
${pagesData}

/* ============================================================
   STATE
   ============================================================ */
let pages = [];
const MOVES = 100000;
let oldResults = [], newResults = [];
let visLimit = 20;
let curQuery = 'pizza';
let tblPage = 1;
const TPP = 25; // rows per table page

/* ============================================================
   INIT: build internal pages array with inLinks counter
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
   RANDOM SURFER — 100,000 moves, 15% teleport
   ============================================================ */
function runSurfer() {
  pages.forEach(function(p){ p.visits = 0; });
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
  pages.forEach(function(p){ p.surferScore = (p.visits / MOVES) * 100; sum += p.surferScore; });
  document.getElementById('scoreSum').textContent = sum.toFixed(1) + '%';
  tblPage = 1;
  renderDir();
}

/* ============================================================
   HELPERS: whole-word matching & highlighting
   ============================================================ */
function esc(s) { return s.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&'); }
function countWord(text, word) {
  var m = text.match(new RegExp('\\\\b' + esc(word) + '\\\\b', 'gi'));
  return m ? m.length : 0;
}
function highlight(text, word) {
  return text.replace(new RegExp('\\\\b(' + esc(word) + ')\\\\b', 'gi'), '<mark>$1</mark>');
}
function fmt(score) { return score < 0.1 ? score.toFixed(2) + '%' : score.toFixed(1) + '%'; }

/* ============================================================
   SEARCH
   ============================================================ */
function search() {
  var q = document.getElementById('q').value.trim();
  curQuery = q;
  var meta = document.getElementById('results-meta');
  var resultsArea = document.getElementById('results-area');
  var emptyState = document.getElementById('empty-state');

  if (!q) { meta.textContent = 'Enter a search word above.'; return; }

  var matching = [];
  pages.forEach(function(p) {
    var c = countWord(p.text, q);
    if (c > 0) matching.push(Object.assign({}, p, {kw: c}));
  });

  if (matching.length === 0) {
    resultsArea.style.display = 'none';
    emptyState.style.display = 'block';
    document.getElementById('miss-word').textContent = '"' + q + '"';
    meta.textContent = '0 results for "' + q + '" across 1,000 pages.';
    return;
  }

  resultsArea.style.display = 'block';
  emptyState.style.display = 'none';
  meta.textContent = 'Found ' + matching.length + ' page' + (matching.length > 1 ? 's' : '') + ' matching "' + q + '" across 1,000 indexed pages.';

  // Old way: highest keyword count first
  oldResults = matching.slice().sort(function(a,b){ return b.kw - a.kw; });
  // Surfer way: highest surfer score first (pure PageRank — no extra weightage)
  newResults = matching.slice().sort(function(a,b){ return b.surferScore - a.surferScore; });

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

function renderCol(id, list, isOld) {
  var el = document.getElementById(id);
  var visible = list.slice(0, visLimit);
  el.innerHTML = visible.map(function(p, i) {
    var isSpam = p.kw >= 10 && p.inLinks === 0;
    var spamTag = isSpam
      ? (isOld
          ? '<span class="spam-tag red">⚠️ Keyword Spammer!</span>'
          : '<span class="spam-tag blue">🛡️ Spam pushed to bottom!</span>')
      : '';
    var score = isOld
      ? '<span class="score-red">🔤 Count: <strong>' + p.kw + '</strong></span>' +
        '<span style="font-size:11.5px;color:var(--muted)">(Links in: ' + p.inLinks + ')</span>'
      : '<span class="score-green">🏄 Surfer: <strong>' + fmt(p.surferScore) + '</strong></span>' +
        '<span class="links-in">🔗 Links in: <strong>' + p.inLinks + '</strong></span>';
    return '<div class="card' + (isSpam ? ' spam' : '') + '">' +
      '<div class="card-top"><span class="rank' + (i === 0 ? ' gold' : '') + '">Rank #' + (i+1) + '</span>' + spamTag + '</div>' +
      '<a href="http://' + p.url + '" class="card-url" onclick="return false">' + p.url + '</a>' +
      '<p class="card-text">' + highlight(p.text, curQuery) + '</p>' +
      '<div class="card-foot">' + score + '</div>' +
      '</div>';
  }).join('');
}

/* ============================================================
   DIRECTORY TABLE (all 1,000 pages, paginated, filterable)
   ============================================================ */
function renderDir() {
  var filterText = (document.getElementById('filter').value || '').toLowerCase().trim();
  var filtered = pages.filter(function(p) {
    if (!filterText) return true;
    return p.url.toLowerCase().includes(filterText) ||
           p.text.toLowerCase().includes(filterText) ||
           String(p.id) === filterText;
  });

  var total = filtered.length;
  var maxPage = Math.max(1, Math.ceil(total / TPP));
  if (tblPage > maxPage) tblPage = maxPage;
  if (tblPage < 1) tblPage = 1;

  var start = (tblPage - 1) * TPP;
  var rows = filtered.slice(start, start + TPP);

  document.getElementById('dir-body').innerHTML = rows.map(function(p) {
    return '<tr><td class="tc">' + p.id + '</td>' +
      '<td><strong>' + p.url + '</strong></td>' +
      '<td style="color:#5f6368">' + p.text + '</td>' +
      '<td class="tc">' + p.links.join(', ') + '</td>' +
      '<td class="tc"><strong>' + p.inLinks + '</strong></td>' +
      '<td class="tr">' + p.visits.toLocaleString() + '</td>' +
      '<td class="tr"><strong>' + p.surferScore.toFixed(2) + '%</strong></td>' +
      '</tr>';
  }).join('');

  var sumV = pages.reduce(function(a,p){ return a + p.visits; }, 0);
  var sumS = pages.reduce(function(a,p){ return a + p.surferScore; }, 0);
  document.getElementById('tot-visits').textContent = sumV.toLocaleString();
  document.getElementById('tot-score').textContent = sumS.toFixed(1) + '%';
  document.getElementById('pg-info').textContent =
    'Showing ' + Math.min(start+1, total) + '–' + Math.min(start+TPP, total) + ' of ' + total + ' pages (Page ' + tblPage + ' of ' + maxPage + ')';
  document.getElementById('pg-prev').disabled = tblPage <= 1;
  document.getElementById('pg-next').disabled = tblPage >= maxPage;
}

/* ============================================================
   EVENT LISTENERS
   ============================================================ */
window.addEventListener('DOMContentLoaded', function() {
  init();
  runSurfer();
  search();

  document.getElementById('go').addEventListener('click', search);
  document.getElementById('q').addEventListener('keydown', function(e){ if (e.key === 'Enter') search(); });
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
</script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'index.html'), html, 'utf-8');
console.log('index.html written, size:', fs.statSync(path.join(__dirname, 'index.html')).size, 'bytes');


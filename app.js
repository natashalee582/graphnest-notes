import { lessons, categories } from './data/lessons.js';

const app = document.querySelector('#app');
const state = { category: '全部筆記', query: '' };

// Content is local and trusted, but escaping makes templates robust when notes grow.
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
function svgGraph(diagram, size='card') {
  const lookup = Object.fromEntries(diagram.nodes.map(node => [node.id, node]));
  const edges = diagram.edges.map(([a,b]) => {
    const n1 = lookup[a], n2 = lookup[b];
    if (!n1 || !n2) return '';
    return `<line class="graph-edge" x1="${n1.x}" y1="${n1.y}" x2="${n2.x}" y2="${n2.y}" />`;
  }).join('');
  const nodes = diagram.nodes.map(node => `<g><circle class="graph-node ${node.group === 1 ? 'group-1' : ''}" cx="${node.x}" cy="${node.y}" r="${size === 'card' ? 6.5 : 6.3}"/><text class="graph-label" x="${node.x}" y="${node.y}">${escapeHtml(node.id)}</text></g>`).join('');
  return `<svg viewBox="0 0 100 100" role="img" aria-label="${escapeHtml('圖論範例示意圖，共 '+diagram.nodes.length+' 個頂點及 '+diagram.edges.length+' 條邊')}">${edges}${nodes}</svg>`;
}
function heroGraph() {
  return `<div class="hero-art" aria-hidden="true"><svg viewBox="0 0 470 380"><circle class="orb" cx="240" cy="185" r="155" /><circle class="orb" cx="240" cy="185" r="112" fill="none" stroke="#96ae96" stroke-opacity=".18" stroke-width="1" />
  <path class="net-line" d="M110 179 174 74 292 64 375 150 338 287 206 316 110 179 292 64 338 287 174 74 206 316 375 150 110 179" fill="none"/>
  <path class="net-line accent" d="M174 74 240 181 375 150 M240 181 206 316 M240 181 110 179 M240 181 338 287" fill="none"/>
  <circle class="net-node" cx="110" cy="179" r="9"/><circle class="net-node" cx="174" cy="74" r="11"/><circle class="net-node" cx="292" cy="64" r="8"/><circle class="net-node" cx="375" cy="150" r="10"/><circle class="net-node" cx="338" cy="287" r="10"/><circle class="net-node" cx="206" cy="316" r="9"/><circle class="net-node accent" cx="240" cy="181" r="13"/>
  <circle cx="240" cy="181" r="24" fill="none" stroke="#e5b080" stroke-width="1" stroke-opacity=".6" /></svg><div class="hero-art-label">7 NODES &nbsp; · &nbsp; CONNECTED</div></div>`;
}
function card(lesson, index) {
  return `<a class="note-card" href="#/note/${encodeURIComponent(lesson.id)}" aria-label="閱讀 ${escapeHtml(lesson.title)}">
    <div class="note-art"><span class="note-index">${String(index+1).padStart(2,'0')} / NOTE</span>${svgGraph(lesson.diagram)}</div>
    <div class="note-card-body"><div class="note-meta"><span>${escapeHtml(lesson.category)}</span><span class="meta-bullet">•</span><span>${lesson.minutes} MIN READ</span></div>
    <h3>${escapeHtml(lesson.title)}</h3><p>${escapeHtml(lesson.summary)}</p>
    <div class="card-bottom"><span class="level">${escapeHtml(lesson.level)}</span><span class="card-open">閱讀筆記 <span aria-hidden="true">↗</span></span></div></div></a>`;
}
function home() {
  document.title = 'GraphNest — 圖論概念筆記';
  app.innerHTML = `<div class="home-page shell">
    <section class="hero" aria-labelledby="hero-title"><div class="hero-copy"><span class="eyebrow"><span class="eyebrow-dot"></span> A PERSONAL GRAPH THEORY LIBRARY</span>
    <h1 id="hero-title">把複雜的圖，<br>變成<em>清楚的觀念。</em></h1>
    <p class="hero-desc">從 Graph 到 Spanning Tree，將容易混淆的定義整理成簡潔筆記。每篇都有圖解、重點整理與一道練習題。</p>
    <a class="hero-cta" href="#/catalog">開始探索筆記 <span aria-hidden="true">↗</span></a></div>${heroGraph()}</section>
    <div class="stats-row" aria-label="網站內容統計"><div class="stat"><strong class="stat-number">${lessons.length.toString().padStart(2,'0')}</strong><span class="stat-label">份精選筆記<br>CURATED NOTES</span></div><div class="stat"><strong class="stat-number">${categories.length-1}</strong><span class="stat-label">大主題分類<br>TOPIC AREAS</span></div><div class="stat"><strong class="stat-number">${lessons.length}</strong><span class="stat-label">道概念練習<br>QUICK CHECKS</span></div></div>
    <section id="catalog" class="catalog-section" aria-labelledby="catalog-heading"><div class="section-heading"><div><span class="eyebrow" style="color:#638778">DISCOVER THE CONCEPTS</span><h2 id="catalog-heading">探索知識節點</h2></div><span class="section-sub">從觀念出發，建立自己的理解地圖。</span></div>
    <div class="controls"><div class="filters" role="group" aria-label="依主題篩選">${categories.map(category => `<button class="filter-btn ${state.category === category ? 'selected' : ''}" data-category="${escapeHtml(category)}" aria-pressed="${state.category === category}">${escapeHtml(category)}</button>`).join('')}</div>
    <label class="search-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><input id="note-search" type="search" placeholder="搜尋主題、關鍵字..." autocomplete="off" aria-label="搜尋筆記" /></label></div>
    <div id="notes-list" class="notes-grid"></div></section>
    <section class="callout-strip"><div class="callout-icon" aria-hidden="true">✳</div><div class="callout-text"><h3>不只是一個網頁，而是一套可以持續成長的筆記系統。</h3><p>這個專案使用 AGENTS.md 規範內容格式、檔名與開發流程。未來只需新增一筆資料，就能自動產生同風格的新筆記頁面。</p></div><a class="callout-link" href="#/about">了解設計方式 ↗</a></section>
  </div>`;
  document.querySelector('#note-search').value = state.query;
  document.querySelector('#note-search').addEventListener('input', event => { state.query = event.target.value; refreshCards(); });
  document.querySelectorAll('[data-category]').forEach(button => button.addEventListener('click', () => {
    state.category = button.dataset.category;
    document.querySelectorAll('[data-category]').forEach(b => {b.classList.toggle('selected',b === button); b.setAttribute('aria-pressed', String(b===button));});
    refreshCards();
  }));
  refreshCards();
}
function refreshCards() {
  const q = state.query.toLocaleLowerCase().trim();
  const shown = lessons.filter(lesson => {
    const categoryMatch = state.category === '全部筆記' || lesson.category === state.category;
    const text = [lesson.title,lesson.english,lesson.summary,lesson.category,...lesson.tags].join(' ').toLocaleLowerCase();
    return categoryMatch && (!q || text.includes(q));
  });
  const list = document.querySelector('#notes-list');
  if (!list) return;
  list.innerHTML = shown.length ? shown.map(lesson => card(lesson, lessons.indexOf(lesson))).join('') : '<div class="empty-state" style="grid-column:1/-1"><strong>找不到符合的筆記</strong>試著換一個關鍵字或分類。</div>';
}
function detail(lesson) {
  const index = lessons.indexOf(lesson);
  const next = lessons[(index+1)%lessons.length];
  document.title = `${lesson.title} — GraphNest`;
  app.innerHTML = `<div class="detail-page shell"><nav class="breadcrumb" aria-label="所在位置"><a href="#/">首頁</a><span>›</span><a href="#/">探索筆記</a><span>›</span><span>${escapeHtml(lesson.title)}</span></nav>
    <div class="detail-layout"><article class="article"><span class="eyebrow"><span class="eyebrow-dot"></span> ${escapeHtml(lesson.category)} / NOTE ${String(index+1).padStart(2,'0')}</span>
      <h1>${escapeHtml(lesson.title)}</h1><p class="article-english">${escapeHtml(lesson.english)}</p><p class="article-intro">${escapeHtml(lesson.summary)}</p>
      <div class="article-meta"><span>◷ &nbsp;約 <strong>${lesson.minutes} 分鐘</strong>閱讀</span><span>◇ &nbsp;<strong>${escapeHtml(lesson.level)}</strong> 難度</span></div>
      <section class="article-section" id="definition"><h2>01 / 核心定義</h2><div class="definition-card">${escapeHtml(lesson.definition)}</div></section>
      <section class="article-section" id="visual"><h2>02 / 用圖理解</h2><div class="diagram-panel"><div class="diagram-canvas">${svgGraph(lesson.diagram,'large')}</div><div class="diagram-caption"><span class="mini-label">VISUAL EXAMPLE</span><h3>圖解範例</h3><p>${escapeHtml(lesson.example)}</p><code class="formula">${escapeHtml(lesson.formula)}</code></div></div></section>
      <section class="article-section" id="explain"><h2>03 / 關鍵觀念</h2><div class="explanation-list">${lesson.explanation.map((paragraph,i) => `<div class="explanation-point"><span class="point-number">${i+1}</span><p>${escapeHtml(paragraph)}</p></div>`).join('')}</div><div class="takeaway"><span class="takeaway-star" aria-hidden="true">✳</span><div><strong>TAKEAWAY · 考前記住這一句</strong>${escapeHtml(lesson.takeaway)}</div></div></section>
      <section class="article-section" id="quiz"><h2>04 / Quick Check</h2><div class="quiz-card"><span class="mini-label">ONE QUESTION AT A TIME</span><h3>${escapeHtml(lesson.quiz.question)}</h3><div class="quiz-options" id="quiz-options">${lesson.quiz.options.map((opt,i) => `<button class="quiz-option" data-answer="${i}">${String.fromCharCode(65+i)}.　${escapeHtml(opt)}</button>`).join('')}</div><div id="quiz-feedback" role="status"></div></div></section>
      <div class="article-next"><a href="#/">← 所有筆記</a><span>下一篇　<a href="#/note/${encodeURIComponent(next.id)}">${escapeHtml(next.title)} ↗</a></span></div>
    </article><aside class="sidebar" aria-label="文章導覽"><div class="sidebar-card"><h3>這篇筆記的內容</h3><nav class="sidebar-links"><a href="#definition">01 / 核心定義</a><a href="#visual">02 / 用圖理解</a><a href="#explain">03 / 關鍵觀念</a><a href="#quiz">04 / Quick Check</a></nav><div class="sidebar-divider"></div><span class="sidebar-sub">KEYWORDS</span><div class="sidebar-tags">${lesson.tags.map(t=>`<span class="tag">${escapeHtml(t)}</span>`).join('')}</div><p class="sidebar-note">學習重點不是背結論，而是理解這個結論為什麼成立。</p></div></aside></div></div>`;
  bindQuiz(lesson.quiz);
  // Native section #links would replace the hash route; intercept and scroll instead.
  document.querySelectorAll('.sidebar-links a').forEach(a => a.addEventListener('click', e => {
    e.preventDefault(); document.getElementById(a.getAttribute('href').slice(1))?.scrollIntoView({behavior:'smooth'});
  }));
}
function bindQuiz(quiz) {
  const opts = [...document.querySelectorAll('#quiz-options [data-answer]')];
  const feedback = document.getElementById('quiz-feedback');
  function selectOption(choice) {
    opts.forEach((button,index) => {
      button.disabled = true;
      if (index === quiz.answer) button.classList.add('correct');
      else if (index === choice) button.classList.add('wrong');
    });
    feedback.innerHTML = `<div class="quiz-feedback"><strong>${choice === quiz.answer ? '答對了！' : '再記住這個觀念：'}</strong> ${escapeHtml(quiz.explanation)}<br><button class="quiz-reset" id="quiz-reset">重新作答 ↻</button></div>`;
    document.getElementById('quiz-reset').addEventListener('click', () => {
      opts.forEach(button => {button.disabled = false; button.classList.remove('correct','wrong');}); feedback.replaceChildren();
    });
  }
  opts.forEach((button,index) => button.addEventListener('click',()=>selectOption(index)));
}
function about() {
  document.title = '關於專案 — GraphNest';
  app.innerHTML = `<div class="shell about-layout"><nav class="breadcrumb"><a href="#/">首頁</a><span>›</span><span>關於專案</span></nav>
    <section class="about-hero"><span class="eyebrow"><span class="eyebrow-dot"></span> BEYOND A ONE-TIME WEBSITE</span><h1>一套規則，延伸成一整個知識庫。</h1><p>GraphNest 是一個以圖論為主題的個人筆記網站。更重要的是，它將開發規範寫在 AGENTS.md，讓 AI 理解「如何繼續新增內容」，而不是每次重做網頁。</p></section>
    <section class="about-block"><h2>01 / 專案目的</h2><p>針對圖論中容易混淆的觀念，使用統一的筆記格式整理定義、圖解、觀念、測驗。讓讀者能快速搜尋、理解並複習。</p></section>
    <section class="about-block"><h2>02 / 維護規則</h2><p>網頁的內容集中在 <code class="inline-code">data/lessons.js</code>，每一篇都是一個具備相同欄位的資料物件。版型由 <code class="inline-code">app.js</code> 自動產生，視覺風格由 <code class="inline-code">styles.css</code> 統一管理。新增文章不需要複製 HTML。</p></section>
    <section class="about-block"><h2>03 / 如何擴充</h2><ol><li>閱讀專案根目錄的 <code class="inline-code">AGENTS.md</code>。</li><li>在 <code class="inline-code">data/lessons.js</code> 加上一筆符合 schema 的文章資料。</li><li>在 <code class="inline-code">scripts/validate.mjs</code> 執行資料檢查。</li><li>重新整理網頁，就會自動多出一張卡片、一篇筆記和一道測驗。</li></ol></section>
    <section class="about-block"><h2>04 / 為什麼不用框架？</h2><p>使用原生 HTML、CSS、JavaScript，沒有安裝套件或編譯流程，能直接部署到 GitHub Pages，降低維護與修改成本。</p></section>
  </div>`;
}
function render() {
  const route = decodeURIComponent(location.hash.replace(/^#/,'')) || '/';
  if (route === '/' || route === '') home();
  else if (route === '/catalog') home();
  else if (route === '/about') about();
  else if (route.startsWith('/note/')) {
    const lesson = lessons.find(note => note.id === route.slice(6));
    if (lesson) detail(lesson);
    else notFound();
  } else notFound();
  document.querySelector('#nav-home')?.classList.toggle('active', route !== '/about');
  document.querySelector('#nav-about')?.classList.toggle('active', route === '/about');
  if (route === '/catalog') document.getElementById('catalog')?.scrollIntoView({behavior:'instant'});
  else window.scrollTo({top:0,behavior:'instant'});
}
function notFound() {
  document.title = '找不到頁面 — GraphNest';
  app.innerHTML = `<div class="shell" style="padding:100px 0 160px"><h1>找不到這篇筆記。</h1><p>可能是連結失效，或這篇文章尚未建立。</p><a class="hero-cta" href="#/">返回首頁 ↗</a></div>`;
}
window.addEventListener('hashchange', render);
render();

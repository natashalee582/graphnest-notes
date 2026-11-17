# AGENTS.md — GraphNest AI Development Guide

> **閱讀對象：** 任何被要求繼續開發本專案的 AI coding agent，以及未來的維護者。
> **核心原則：** 使用同一份資料格式，快速新增新文章；不要為每篇文章重新寫一個 HTML 頁面。

## 1. 專案定位與目標

GraphNest 是一個繁體中文的**圖論互動筆記知識庫**，讀者主要是剛接觸 Graph Theory 的大學生。

- **目的：** 以精簡定義、圖解、條列觀念與單題測驗，協助理解容易混淆的圖論概念。
- **可延伸性：** AI 必須能不改動網站結構、只新增一份資料，就讓首頁增加一張筆記卡片，並產生可瀏覽的詳情頁。
- **讀者體驗：** 支援搜尋、分類、閱讀、互動作答；手機及桌面都要能用。
- **語言：** 內容使用繁體中文，保留教科書英文專有名詞；不要使用簡體中文。
- **範圍：** 靜態教學內容。不要擅自新增登入、後端、付費功能或使用者資料蒐集。

## 2. 技術架構與檔案責任

```text
/
├── index.html             # 唯一 HTML 入口、語意化主結構與載入資源
├── styles.css             # 全站樣式、配色、響應式規則
├── app.js                 # 資料渲染、Hash Router、搜尋、篩選與測驗互動
├── data/
│   └── lessons.js         # 所有筆記資料與分類清單（內容的單一真實來源）
├── assets/
│   └── favicon.svg        # 網站圖示
├── scripts/
│   └── validate.mjs       # 內容格式、自動化合理性檢查
├── AGENTS.md              # AI 維護規則（本文件）
├── README.md              # 使用、測試與部署方式
├── SUBMISSION_TEMPLATE.md # 作業繳交欄位範例
└── .nojekyll              # GitHub Pages 不使用 Jekyll 處理檔案
```

**技術限制：** 只使用原生 HTML / CSS / ES Modules JavaScript；不依賴框架、CDN、第三方 API 或 npm 套件。GitHub Pages 預設從 `main` 分支的 `/ (root)` 發佈。所有資源都必須使用相對路徑，如 `./styles.css`，確保 repo 子路徑也能運作。

**路由：**
- 首頁：`#/`
- 單篇筆記：`#/note/<id>`，例如 `#/note/euler-trail`
- 關於：`#/about`
- 不要改用需要伺服器 rewrite 的 History API 路由。

## 3. 內容資料規格（新增文章必遵守）

**每一篇新文章只能在 `data/lessons.js` 的 `lessons` 陣列新增一個物件。** 不可單獨建立 `note-1.html` 之類的重複頁面。

必填欄位及規則：

| 欄位 | 型態 | 約束／用途 |
|---|---|---|
| `id` | string | 唯一，英文小寫 kebab-case，例如 `graph-isomorphism`；建立後不可隨意更名，避免舊連結失效 |
| `title` | string | 中英搭配的文章名稱，建議 8～30 字 |
| `english` | string | 一句英文副標題 |
| `category` | string | 必須是 `categories` 中已存在的分類，且不可用「全部筆記」 |
| `level` | string | 僅用 `入門`、`核心`、`進階` |
| `minutes` | number | 預估閱讀時間，1～30 的整數 |
| `summary` | string | 30～80 字的導讀摘要；搜尋會檢索此欄位 |
| `definition` | string | 精準的一句核心定義 |
| `explanation` | string[] | 2～4 段重點解說，每段專注一個觀念 |
| `formula` | string | 公式或一行判定規則，以可閱讀的純文字呈現 |
| `example` | string | 清楚解說右側圖例，且與實際示意圖一致 |
| `takeaway` | string | 一句考前提醒或常見錯誤 |
| `tags` | string[] | 2～5 個英／中關鍵字，搜尋會檢索 |
| `diagram.nodes` | object[] | 每個節點 `{id,x,y,group?}`；`id` 唯一；`x,y` 是 0～100 座標；`group` 可為 0 或 1 |
| `diagram.edges` | string[][] | 無向邊，每筆恰為 `[sourceId, targetId]`，都必須對應既有 node |
| `quiz.question` | string | 一道概念練習題 |
| `quiz.options` | string[] | 2～4 個選項，且有且只有一個正確答案 |
| `quiz.answer` | number | 從 0 開始的正確選項 index |
| `quiz.explanation` | string | 不只給答案，還須解釋原因 |

### 新增內容物件模板

以下模板示範新增 **Graph Isomorphism**；實際使用時應替換成完整、經查核的圖例與說明：

```js
{
  id: 'graph-isomorphism',
  title: 'Graph Isomorphism 圖同構',
  english: 'Same structure, different labels',
  category: '圖的結構',
  level: '核心',
  minutes: 5,
  summary: '比較頂點重新命名後，是否仍維持相同的鄰接關係。',
  definition: '兩張圖同構，是指存在保留鄰接關係的頂點雙射。',
  explanation: [
    '同構圖具有相同的頂點數、邊數與 degree multiset。',
    '這些必要條件相同不代表一定同構，仍需找出保留相鄰關係的雙射。'
  ],
  formula: 'G ≅ H ⇔ 存在保留 adjacency 的 bijection',
  example: '右圖是由四個頂點構成的 cycle；改變標籤不會改變結構。',
  takeaway: 'Degree sequence 相同只是必要條件，不是充分條件。',
  tags: ['Isomorphism', 'Bijection', 'Adjacency'],
  diagram: {
    nodes: [
      { id: 'A', x: 20, y: 25 },
      { id: 'B', x: 80, y: 25 },
      { id: 'C', x: 80, y: 75 },
      { id: 'D', x: 20, y: 75 }
    ],
    edges: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A']]
  },
  quiz: {
    question: 'Degree sequence 相同能否保證兩張圖同構？',
    options: ['能', '不能'],
    answer: 1,
    explanation: '相同 degree sequence 是必要條件；非同構圖也可能有相同度數序列。'
  }
}
```

這個物件要加在 `lessons` 陣列內，前一個物件後加逗號；不需要建立新 HTML、手動填卡片或設定新路由。

## 4. 視覺與版型規範

- **風格：** 清楚、安靜、學術但不嚴肅；像一份經過編排的互動讀書筆記。
- **主色：** 森林綠 `#173d38`；背景米白 `#f8f7f3`；柔和綠 `#dfe9d0`；暖橘作點綴。
- **字體：** 系統 sans-serif，繁體中文字型優先。不要依賴外部字型服務。
- **卡片：** 統一使用 `.note-card` 元件風格，圖片區採本地生成 SVG 圖論示意圖；不得隨意插入無授權圖檔。
- **版面：** 桌面三欄卡片；中型螢幕雙欄；手機單欄。確保 320px 以上無水平溢出。
- **閱讀頁：** 固定章節順序：核心定義 → 用圖理解 → 關鍵觀念 → Quick Check。
- **可存取性：** 使用語意化 heading、button、nav，讓滑鼠、鍵盤可操作；提示文字不要只依賴顏色；維持可讀的色彩對比。

## 5. AI 執行修改時的工作流程

每次收到「新增一篇關於 X 的筆記」時：

1. **先讀 `AGENTS.md` 與 `data/lessons.js`**，確認既有風格、分類與資料格式。
2. 檢查是否已有相同主題或 `id`；勿新增重複文章。
3. 確認數學定義與圖示正確；若有必要，補上判定條件（例如無向圖 Eulerian 判定要檢查非零度頂點連通）。
4. 選擇既有分類；只有主題確實需要新類別時，才修改 `categories` 陣列。
5. 依照第 3 節 schema 新增 **一筆資料**；圖例的 nodes 與 edges 必須和 `example` 一致。
6. 在 `scripts/validate.mjs` 執行 `node scripts/validate.mjs`，並在瀏覽器實際確認首頁卡片、文章路由、搜尋、篩選、測驗正常。
7. 不修改其他既有筆記，除非使用者明確要求或為了修正錯誤。
8. 說明實際修改了哪些檔案、增加的路由與測試結果；不可宣稱沒做過的測試已通過。

## 6. 禁止事項與例外

- 不要繞過 `data/lessons.js` 直接在 `app.js` 寫死某篇筆記內容。
- 不要在 `index.html` 複製六份（或更多）卡片結構。
- 不要修改既有 `id`，除非也處理所有舊連結。
- 不要引入套件、API Key、追蹤器、登入或資料庫；這個專案應該能免費靜態部署。
- 不要為求內容長度而增加錯誤的數學敘述；定義不確定時請標示待查證。
- 若需求確實需要改動架構，先描述必要性、影響範圍，再最小幅度修改並更新本文件。

## 7. 完成標準（Definition of Done）

- `node scripts/validate.mjs` 全部通過。
- 新增內容能在首頁找到，搜尋關鍵字、分類篩選正常。
- `#/note/<id>` 可以顯示文章，且圖示與範例一致。
- Quick Check 點選後顯示正誤、原因，且可重新作答。
- 手機/桌面可閱讀，沒有破版或 console error。
- GitHub Pages URL 可以實際連線；若尚未部署，就**不能**稱為已上線。

## 8. 可直接給 AI 的下一次任務

> 請先閱讀本專案 `AGENTS.md`，依照既有 schema 在 `data/lessons.js` 加一篇「Graph Isomorphism 圖同構」。保持首頁與詳情頁風格不變，不另建 HTML。請確認例圖、定義和測驗正確，執行 `node scripts/validate.mjs`，最後列出新增路由和修改檔案。

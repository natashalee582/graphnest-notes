# GraphNest — 圖論概念筆記

一個資料驅動的圖論學習網站。內容由統一的 `lessons` 陣列提供，前端自動建立卡片、筆記與互動測驗；AI 透過 `AGENTS.md` 延續相同的開發規則。

## 已完成的功能

- 可搜尋 6 篇圖論筆記、依主題篩選。
- 每篇有獨立網址、核心定義、SVG 圖解、觀念說明與一道互動選擇題。
- 手機與桌面響應式版型。
- 可擴充的內容 schema、AI 開發指南、自動化驗證工具。
- 無框架與外部依賴，適用 GitHub Pages。

## 專案結構

```text
index.html              網站入口
styles.css              視覺樣式
app.js                  前端路由與互動
data/lessons.js         筆記內容
scripts/validate.mjs    內容格式驗證
AGENTS.md               AI 開發與內容規範
SUBMISSION_TEMPLATE.md  作業繳交文字範本
assets/favicon.svg      圖示
.nojekyll               Pages 設定
```

## 本機預覽

因為 JavaScript 使用 ES modules，請啟動靜態伺服器，不要直接雙擊 `index.html`：

```bash
# 專案根目錄中執行：
python -m http.server 8000
```

然後用瀏覽器開啟 `http://localhost:8000/`。

## 驗證內容

需 Node.js 18 以上，**無須 npm install**：

```bash
node scripts/validate.mjs
```

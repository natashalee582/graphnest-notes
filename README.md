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

## 發布到 GitHub Pages（不需要指令列）

1. 登入 GitHub，右上角 `+` → `New repository`，名稱建議 `graphnest-notes`，Visibility 選 `Public` → `Create repository`。
2. 在新的 repository 頁面點 `uploading an existing file` 或 `Add file` → `Upload files`。
3. **上傳本專案內的檔案與資料夾**（不要多包一層 `graphnest-project/`）。確認 `index.html` 和 `AGENTS.md` 直接位於 repo 根目錄；如使用 GitHub 網頁介面，別漏掉空的 `.nojekyll`（不是必要，但建議保留）。
4. 點 `Commit changes`；再開啟 `Settings` → `Pages`。
5. 在 `Build and deployment` 的 `Source` 選 `Deploy from a branch`，Branch 選 `main`、Folder 選 `/ (root)` → `Save`。
6. 稍後重新整理 `Settings` → `Pages`，找到 GitHub 提供的網站網址；通常是 `https://<github-username>.github.io/graphnest-notes/`。
7. 用無痕視窗開啟網址，測試首頁、搜尋、分類、其中一篇 `#/note/...` 與測驗互動。

> **重要：** Github Repository/Pages 網址只在你真的建立與部署後才有效，不能把上面的範例網址當作已完成連結繳交。

## 增加筆記

閱讀 [`AGENTS.md`](./AGENTS.md) 的「內容資料規格」，在 `data/lessons.js` 加入一筆資料後執行驗證。首頁新卡片、筆記頁、搜尋和測驗會自動跟著更新。**不需要新增 HTML 檔案。**

## 專案特色與延伸方向

這份作品的核心不是頁面數量，而是建立**可重複使用的製作規則**。下一步可以新增「Graph Isomorphism」「Connected Components」「Prüfer Code」等主題，持續擴充圖論知識庫。

## 授權與自訂

程式與教學內容為本作業範例，可依個人學習需求修改。公開前請自行確認概念、調整內容使其反映你的理解，並填入自己的 GitHub 網址與繳交資訊。

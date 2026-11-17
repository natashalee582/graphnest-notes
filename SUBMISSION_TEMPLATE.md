# 繳交內容（完成 GitHub 上傳後，替換方括號）

**繳交標題：** [學校簡稱] [學號] [系級] [姓名] GraphNest 圖論概念筆記

## 1. 專案簡介

我設計的專案是 **GraphNest — 圖論概念筆記**，將圖論常見觀念整理成可以搜尋、分類與互動練習的網站。目前包含 Graph 基礎、Eulerian Trail、Bipartite Graph、Tree、Degree Sequence、Walk/Trail/Path 等主題。每篇文章都有定義、SVG 圖解、關鍵觀念與選擇題。

## 2. GitHub Repository 連結

[貼上你實際建立的 GitHub Repository URL，例：https://github.com/你的帳號/graphnest-notes]

## 3. 網頁連結

[貼上實際可瀏覽的 GitHub Pages URL，例：https://你的帳號.github.io/graphnest-notes/]

## 4. AGENTS.md / CLAUDE.md

我使用 **`AGENTS.md`**，已放在 GitHub 專案根目錄。文件包含專案定位、資料結構、網頁版型、檔案命名、AI 修改流程、禁止事項及驗收標準。

[貼上 GitHub 中 AGENTS.md 的實際連結，例：https://github.com/你的帳號/graphnest-notes/blob/main/AGENTS.md]

## 5. 如何協助 AI 延伸新頁面？

此專案將每一篇筆記統一儲存在 `data/lessons.js`，並由 `app.js` 自動產生首頁卡片及獨立筆記頁。未來我只要告訴 AI「請閱讀 AGENTS.md，新增一篇 Graph Isomorphism 筆記」，AI 就能依照已定義的欄位、命名、圖解與測驗規則新增資料，而不必重新設計整個網頁。新增後還可以執行 `node scripts/validate.mjs` 檢查內容格式，確保網站能持續擴充且維持一致的品質。

---

**繳交前確認：** 將方括號替換為真實資訊，檢查三個連結可正常開啟，並在 GitHub Pages 實際測試互動功能。建議自行修訂部分筆記文字或補充個人理解，形成自己的原創作品。

# 台灣勞基新聞網

公開網站：<https://sam0989422478.github.io/taiwan-labor-news/>

**📘 如果你刪除了 ChatGPT 聊天、換了聊天室，或要讓別人接手網站：請先閱讀 [HANDOFF.md（網站交接與復原手冊）](HANDOFF.md)。** 裡面包含 GitHub 授權、每日更新、網站結構、Google SEO、備份建議，以及可直接複製到新 ChatGPT 聊天的交接指令。

## 目前功能

- 站內「最新新聞」：編輯導讀、分類、搜尋、每頁 12 篇分頁
- 獨立「勞動部公告」：連至官方來源
- 新聞文章閱讀頁：`article.html?id=...`
- 首頁與文章頁固定右下角「聯絡我們」按鈕
- GitHub Actions 每日台灣時間 09:00 嘗試更新新聞並重建 Sitemap
- Google Search Console 驗證檔：`google453320c54a20658d.html`（請勿刪除）

## 關鍵入口

- [GitHub Actions 排程](https://github.com/sam0989422478/taiwan-labor-news/actions)
- [GitHub Pages 設定](https://github.com/sam0989422478/taiwan-labor-news/settings/pages)
- [Google Sitemap](https://sam0989422478.github.io/taiwan-labor-news/sitemap.xml)

## 重要說明

目前自動新聞以 RSS 來源標題、日期及來源資訊整理編輯導讀，**不能視為已核實所有原文內容的深度報導**；請保留來源連結，重大勞資爭議、裁罰與法規變動應核對原始資料。

本儲存庫為公開可讀，請勿上傳密碼、金鑰或存取權杖。Facebook 粉專目前只使用連結，沒有啟用需管理員授權的貼文同步。

完整維護與復原說明請閱讀 **[HANDOFF.md](HANDOFF.md)**。

## 免費生圖與照片上傳（不使用付費 API）

使用 ChatGPT 內建的圖片生成功能，在聊天中先製作新聞情境照片，再由網站維護者將 WebP 圖片存入 `assets/generated/`，並於 `data/editorial.json` 的對應文章設定 `image` 路徑及 `image_note`。首頁與文章頁已支援顯示。

- 這是**逐篇製作、上傳**的工作方式；不會在 GitHub Actions 無人值守自動產生 AI 照片。
- 每日新聞排程只更新新聞與 Sitemap，**不再呼叫 OpenAI 圖片 API，不需要任何金鑰**。
- 尚未設定照片的文章，繼續顯示主題示意插畫。
- 照片須標示「AI 生成示意圖，非新聞事件現場照片」。

### 每次發布圖片的步驟

1. 由 ChatGPT 產生新聞照片，轉成 16:9 WebP（例如 1280×720）。
2. 上傳至儲存庫 `assets/generated/`，例如 `parenting-mother-daughter.webp`。
3. 更新 `data/editorial.json` 中相應文章的 `image` 為 `assets/generated/parenting-mother-daughter.webp`。
4. GitHub Pages 部署完成後，檢查首頁與文章頁是否出現新圖片。

已停用的 `scripts/generate_images.py` 原型不會被排程呼叫，也不會產生費用。

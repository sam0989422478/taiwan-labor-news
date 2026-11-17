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

## 每日自動新聞圖片（已安裝，待啟用）

網站首頁與文章頁已支援每篇不同的 16:9 WebP AI 寫實示意照片。GitHub Actions 每次最多產生 3 張，且每日上限 3 張；沒有成功生圖時使用原本的新聞主題插畫。

**尚需網站擁有者自行新增 OpenAI API 金鑰：**
- GitHub → [Actions Secrets](https://github.com/sam0989422478/taiwan-labor-news/settings/secrets/actions) → New repository secret
- Name: `OPENAI_API_KEY`
- Secret: 自己在 OpenAI API 平台建立的金鑰（不要在聊天中分享）
- 然後到 [每日新聞工作流程](https://github.com/sam0989422478/taiwan-labor-news/actions/workflows/update-news.yml) 按 Run workflow 測試

圖片會儲存在 `assets/generated/`，文章資料的 `image` 指向檔案，並標示「AI 生成示意圖，非新聞事件現場照片」。API 圖片生成會另行計費。未設定金鑰前，此功能不會自動生成照片。

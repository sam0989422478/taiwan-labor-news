# 台灣勞基新聞網

繁體中文勞動新聞網站，適合手機瀏覽。新聞列表以勞動部官方 RSS 為來源，保留原始連結；本站不是勞動部官方網站。

## 公開網站
預定網址：https://sam0989422478.github.io/taiwan-labor-news/

## 首次啟用 GitHub Pages（儲存庫擁有者操作）
1. 進入 GitHub 儲存庫 **Settings → Pages**。
2. **Build and deployment → Source** 選擇 **Deploy from a branch**。
3. **Branch** 選擇 **main**、資料夾選 **/(root)**，按 **Save**。
4. 等待 Pages 佈署完成後，開啟上述網站網址。

## 每日新聞自動更新
GitHub Actions 工作流程：`.github/workflows/update-news.yml`
- 台灣時間每天 09:00（UTC 01:00）排程，GitHub Actions 可能延後執行。
- 可在 **Actions → 每日更新勞動新聞 → Run workflow** 手動首次執行。
- 工作流程執行 `python scripts/update_news.py`，更新 `data/news.json` 並提交到 main。
- 若 RSS 來源無法存取或未回傳有效文章，程式會保留既有資料並顯示工作流程失敗，不會捏造新聞。
- 若 Actions 沒有寫入權限，請到 **Settings → Actions → General → Workflow permissions** 確保允許寫入（若組織政策允許）。

## 聯絡資訊
- 孫顧問：0989-422-478
- LINE 官方帳號：https://lin.ee/NgRW9iS
- Facebook 粉專連結：待補入 `index.html`

## 注意
這是免費靜態網站與來源導讀，沒有串接自動生成 AI 長篇新聞、AI 圖像或 Facebook/Instagram 自動發布。請在實際執行首次工作流程後檢查官方 RSS 是否可用。
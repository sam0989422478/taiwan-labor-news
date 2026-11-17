# 台灣勞基新聞網｜交接與復原手冊

> 更新日期：2026-11-17。這份文件存放在 GitHub，供日後自己、其他 ChatGPT 聊天室或接手工程師查閱。**不要將密碼、存取權杖、API Key 寫入此公開儲存庫。**

## 1. 從哪裡找到網站

- GitHub 帳號：`sam0989422478`
- 專案儲存庫：<https://github.com/sam0989422478/taiwan-labor-news>
- 公開網址：<https://sam0989422478.github.io/taiwan-labor-news/>
- GitHub Actions：<https://github.com/sam0989422478/taiwan-labor-news/actions>
- Pages 設定：<https://github.com/sam0989422478/taiwan-labor-news/settings/pages>
- Google Search Console：<https://search.google.com/search-console/>
- 網站地圖：<https://sam0989422478.github.io/taiwan-labor-news/sitemap.xml>

## 2. 網站的用途與版面

網站為繁體中文、手機優先的台灣勞工與企業管理資訊網站，與勞動部官方網站不同。

- **最新新聞**：本站編輯導讀，參照公開來源標題與日期產生，讀者可閱讀本站文章及原始來源。新聞有分類、搜尋及每頁 12 篇的分頁。
- **勞動部公告**：獨立區塊，顯示勞動部官方 RSS 公告並連到原文。
- **聯絡我們**：右下角固定懸浮按鈕，在首頁與 `article.html` 均顯示，展開電話、LINE、Facebook、官方網站。
- 視覺：深藍、紅、白色系，簡潔新聞卡片。首頁左上角已嵌入使用者提供 Logo 的清晰化縮圖（目前為直接內嵌的小尺寸圖像），每張新聞卡片加上對應分類的**示意圖區塊**。示意圖不是事件現場照片。\n- 文章頁提供 Facebook 分享、LINE 分享及複製新聞連結。這些分享功能不需要粉專管理員權限。
- **內容限制**：自動稿目前是基於 RSS 標題、日期及來源資訊產生的保守導讀，**不是已完整查證的採訪報導**。需要深度報導時應人工審稿，核對原文及法規，不可抄襲媒體全文或捏造事件、裁罰、當事人說法。

## 3. 目前對外連結

| 名稱 | 內容 |
| --- | --- |
| 台灣勞基官方網站 | https://www.lawki.com.tw/site.html |
| Facebook 粉專 | https://www.facebook.com/lawkitaiwan/ |
| LINE 官方帳號 | https://lin.ee/NgRW9iS |
| 電話 | 0989-422-478（孫顧問） |

Facebook 目前只提供點擊前往粉專，不使用粉專 API 同步，原因是使用者目前沒有完整管理員權限。

## 4. 重要檔案

| 路徑 | 用途 |
| --- | --- |
| `index.html` | 新聞首頁、品牌 Logo、分類示意圖、搜尋、分頁、公告、懸浮聯絡按鈕 |
| `article.html` | 文章閱讀頁、來源連結、Facebook／LINE／複製連結分享、懸浮聯絡按鈕 |
| `data/editorial.json` | 本站新聞資料（包含文章 ID、標題、摘要、段落、原始來源） |
| `data/news.json` | 勞動部公告資料 |
| `scripts/update_news.py` | 擷取來源、製作導讀、更新兩種新聞資料 |
| `scripts/build_sitemap.py` | 依本站新聞資料產生 sitemap.xml |
| `.github/workflows/update-news.yml` | 每日排程與提交更新 |
| `sitemap.xml` | Google Sitemap；每天新聞更新時重新產生 |
| `robots.txt` | 網站爬取規則 |
| `google453320c54a20658d.html` | Google Search Console 擁有權驗證檔；請保留 |

`scripts/sync_facebook.py` 與 `data/facebook-posts.json` 為先前未使用的粉專同步草稿；**正式同步工作流程已停用**，沒有授權時不會自動取得貼文。

## 5. 每日新聞自動更新

- 時區：Asia/Taipei。
- 預定排程：每日台灣時間 **09:00**（GitHub Actions Cron：UTC `0 1 * * *`）。
- GitHub Actions 為免費額度及排程服務，可能延遲或停用，**不保證每一天都一定準時產生新稿**。
- 來源：勞動部 RSS；Google News RSS 的勞資、勞基法、職安等查詢。
- 每次最多新增 4 篇候選導讀，保留至多 2,000 篇。
- 若無符合品質或日期條件的新題材，保留既有文章，不應虛構「今日新聞」。
- 執行後更新 `data/editorial.json`、`data/news.json`、`sitemap.xml`。
- 手動執行：儲存庫 → Actions → **每日更新新聞與勞動部公告** → Run workflow。
- 檢查失敗：點入失敗的 workflow run，查看失敗步驟和日誌；先確認新聞來源有無阻擋、GitHub Actions 工作流程是否獲寫入權限。

## 6. GitHub Pages 部署

在儲存庫 **Settings → Pages**：
- Source：`Deploy from a branch`
- Branch：`main`
- Folder：`/(root)`

更新 `main` 後 Pages 可能需要一段時間建置。若新功能看不到，先檢查 Actions 的 Pages 部署狀態，再用無痕視窗或帶查詢參數的網址確認；不要只靠反覆刷新推斷原因。

## 7. Google 搜尋與 SEO

- Google Search Console 的擁有權驗證已由使用者確認成功（2026-11-17）。
- Sitemap 已由使用者確認提交成功（2026-11-17）。
- SEO 基本設定：`robots.txt`、`sitemap.xml`、首頁 canonical/OG 資料。
- 目前文章頁仍是 `article.html?id=...` 並由 JavaScript 載入，未來若要改善索引，優先升級成**每篇獨立靜態 HTML**、獨立 title/meta/結構化資料，而非只提交 Sitemap。
- 被 Google 收錄與搜尋排名**沒有保證**，需在 Search Console 查看實際索引結果。

## 8. 刪除聊天室後，在新的 ChatGPT 聊天室如何繼續

1. 登入同一個 GitHub 帳號，確認 ChatGPT 的 GitHub 連接器已連接並獲授權讀寫這個儲存庫。
2. 把下面的「新聊天交接指令」貼給 ChatGPT。
3. **請 ChatGPT 先讀此檔與實際程式，不要只依據聊天記憶推測目前功能。**
4. 指出需要的修改，例如「新增新聞圖片」、「修復搜尋」、「改聯絡按鈕」、「檢查自動排程」。
5. 維護完成後要求同步更新此交接文件。

### 新聊天交接指令（可直接複製）

```text
請接手我的「台灣勞基新聞網」GitHub 專案：
https://github.com/sam0989422478/taiwan-labor-news

正式網站：
https://sam0989422478.github.io/taiwan-labor-news/

請使用已授權的 GitHub 連接器，先閱讀儲存庫的 README.md、HANDOFF.md、index.html、article.html、scripts/update_news.py、.github/workflows/update-news.yml。
這是我目前正在營運的台灣勞基新聞網站。請保留現有文章、Google 驗證、Sitemap、聯絡方式與每日更新功能，不要重建或覆蓋整個專案。

先檢查實際檔案與設定，再依我這次提出的需求修改。修改後要確認 GitHub 寫入成功、說明部署/驗證狀態、更新 HANDOFF.md，且不要把秘密憑證放進公開程式碼。
```

## 9. 授權、安全與備份建議

- 這是一個公開 GitHub 儲存庫，任何人可以看到原始碼；**公開 ≠ 自動授予修改原庫的權限**。只有獲權限的人才能寫入。其他人可 Fork 程式副本，但使用與再散布權利仍需依授權條款釐清。
- 目前請不要假設存在開源授權條款；若要商業化提供模板，應單獨做無品牌版本，決定適用的 LICENSE，再移除品牌電話、Google 驗證檔和專案專用 URL。
- ChatGPT 連接器的 GitHub 授權可在 GitHub Settings → Applications → Installed GitHub Apps 檢查；若遇 403，檢查 connector 是否安裝在正確帳號、是否包含此儲存庫，以及 Contents 權限。
- **不要在聊天、README、公開 GitHub 直接貼密碼、API token、金鑰。** 如日後有 API，使用 GitHub Actions Secrets。
- GitHub 儲存庫本身就是版本歷史備份；另外建議每月從 GitHub → Code → Download ZIP 備份到自己的雲端硬碟。
- 刪除 ChatGPT 聊天不會刪掉 GitHub 儲存庫；但若沒有備份聊天才有的需求或素材，以後就未必能還原。重要的品牌規範與操作方式應寫進這份文件。
\n## 10. 2026-11-17 視覺與分享功能更新\n- 首頁品牌區增加來自使用者提供 Logo 的清晰化縮圖，保留網站標題文字。正式商標使用前建議由品牌方核對圖案與字型。\n- 新聞卡片新增按分類顯示的簡潔配圖區（不是新聞現場照片）。尚未加入每天自動生成新聞封面圖的服務。\n- 文章內頁新增 Facebook、LINE 分享連結與「複製新聞連結」按鈕。\n- 這些網站原始碼改動仍需 GitHub Pages 完成部署，不能以 GitHub 儲存成功直接推定公開網站更新完畢。\n
## 2026-11-17 新聞圖片顯示修正
- 首頁與文章頁現在都以 `<img>` 載入 `assets/news-wages.svg`、`news-relations.svg`、`news-safety.svg`、`news-policy.svg` 四種實際 SVG 示意圖片，不再只有分類符號；這些是分類示意插畫，**不是事件現場照片，也不是每日 AI 自動生成的新聞封面**。
- 首頁 Logo 改成由台灣勞基官方網站載入的商標圖片，圖片來源 `https://www.lawki.com.tw/uploads/use/20250923145442d255.jpg`。如官方網站圖片改名，需改成本地資產避免失效。
- 每次更新 GitHub 後還需要 GitHub Pages 部署完成，公開網站才會顯示新圖片。

## 2026-11-17 A版專業新聞列表改版
- 使用者認為原版卡片圖片、標題與懸浮聯絡按鈕太大。網站已調整成白底、深藍文字、低彩度配色。
- 最新新聞改為橫式精簡列表：手機端左側標題摘要、右側小示意縮圖，標題摘要最多兩行；保留原新聞分類搜尋、每頁12篇、獨立公告、SEO。
- 右下角固定聯絡選單收斂為小圓形電話圖示（有可存取的「聯絡我們」說明），點擊仍展開LINE、電話、Facebook與官方網站。
- 文章內頁配圖縮小，減少視覺負擔。圖片仍屬分類示意圖，非事件現場照片。
- 此為GitHub源碼更動，公開頁面仍需GitHub Pages部署成功才會顯示。

/* 台灣勞基｜不使用 AI API 的第一則問題回覆；每次直接提供 LINE 官方帳號 */
(()=>{
'use strict';
if(document.getElementById('lawki-chat-widget'))return;
const lineUrl='https://lin.ee/NgRW9iS';
const root=document.createElement('aside');
root.id='lawki-chat-widget';root.className='lawki-chat';
root.setAttribute('aria-label','台灣勞基勞資問題諮詢');
root.innerHTML=`
 <section id="lawki-chat-panel" class="lawki-chat-panel" aria-label="勞資問題諮詢" hidden>
  <div class="lawki-chat-header"><strong>勞資問題快速諮詢</strong><button class="lawki-chat-close" type="button" aria-label="關閉諮詢視窗">×</button></div>
  <div class="lawki-chat-body">
   <p class="lawki-chat-intro">您好！請描述遇到的勞資問題，我們會先提供一則一般性提醒，並立即提供官方 LINE 連結，方便轉由真人客服協助。</p>
   <form class="lawki-chat-form">
    <label for="lawki-chat-input">請輸入您的問題</label>
    <textarea id="lawki-chat-input" class="lawki-chat-input" maxlength="700" placeholder="例如：公司可以要求員工無薪加班嗎？" required></textarea>
    <button class="lawki-chat-send" type="submit">取得初步回覆與真人客服連結</button>
   </form>
   <div id="lawki-chat-answer" class="lawki-chat-answer" role="status" aria-live="polite" hidden>
    <h3>台灣勞基｜初步提醒</h3><p id="lawki-chat-reply"></p>
    <a class="lawki-chat-line" href="${lineUrl}" target="_blank" rel="noopener noreferrer">立即聯絡官方 LINE 真人客服</a>
    <button class="lawki-chat-copy" type="button">複製問題，貼到 LINE 給客服</button>
    <p class="lawki-chat-status" aria-live="polite"></p>
    <p class="lawki-chat-note">此為依常見議題提供的預設提醒，並非 AI 即時法律判斷或正式法律意見。請勿在此輸入身分證字號、完整個資、薪資明細或其他敏感資料。此頁不會儲存或傳送您的問題。</p>
   </div>
  </div>
 </section>
 <button class="lawki-chat-toggle" type="button" aria-controls="lawki-chat-panel" aria-expanded="false">💬 勞資問題諮詢</button>`;
document.body.appendChild(root);
const toggle=root.querySelector('.lawki-chat-toggle');
const panel=root.querySelector('.lawki-chat-panel');
const input=root.querySelector('.lawki-chat-input');
const answer=root.querySelector('#lawki-chat-answer');
const reply=root.querySelector('#lawki-chat-reply');
const status=root.querySelector('.lawki-chat-status');
let currentQuestion='';
function open(yes){panel.hidden=!yes;toggle.setAttribute('aria-expanded',String(yes));if(yes)input.focus();else toggle.focus();}
toggle.addEventListener('click',()=>open(panel.hidden));
root.querySelector('.lawki-chat-close').addEventListener('click',()=>open(false));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!panel.hidden)open(false)});
function initialAdvice(question){
 const q=question.replace(/\s+/g,'');
 const rules=[
  [/職災|工傷|職業傷害|工作受傷|上下班車禍/, '職業災害是否成立、醫療與補償責任，須依事故經過及適用法規判斷。請先保留就醫、出勤及事故紀錄，再由真人顧問協助釐清。'],
  [/霸凌|性騷擾|歧視|不當對待/, '涉及職場不法侵害或性騷擾時，應保留相關證據並了解適用的申訴與處理程序。不同事件的法定義務與期限可能不同，建議交由真人顧問協助。'],
  [/資遣|裁員|解雇|解僱|開除|非自願離職/, '資遣或解僱是否合法，通常涉及具體事由、程序、預告、資遣費及相關證明，不能只憑一句話判斷。請保存勞動契約、通知及出勤資料供真人顧問確認。'],
  [/加班費|超時|加班|工時|排班|休息日|輪班/, '加班費與工時認定，需確認約定工時、實際出勤紀錄、休息日與適用制度。請先保留班表及打卡資料，再由真人客服協助分析。'],
  [/薪資|工資|薪水|扣薪|最低工資|獎金|年終/, '工資項目、給付與扣款是否合法，必須先確認勞動契約、薪資明細及實際工作情況。建議整理相關資料，交由真人顧問進一步判斷。'],
  [/離職|辭職|交接|離職證明|競業禁止/, '離職預告、交接與相關給付，會因任職年資、契約及具體情況而不同。請保留雙方往來通知，交由真人客服確認適用規定。'],
  [/特休|請假|病假|事假|婚假|喪假|產假|育嬰|育兒/, '請假及休假權益會依假別、年資、公司制度與現行規定而不同。請先確認假別、申請日期及公司回覆，再與真人顧問核對。'],
  [/勞保|健保|勞退|退休金|保險|投保/, '勞健保及退休金涉及投保身分、投保薪資與提繳紀錄。請先查明個人投保資料，具體差異可由真人客服協助確認。'],
  [/工作規則|勞動契約|聘僱契約|薪資設計|制度|顧問/, '企業制度應結合實際管理需求與勞動法規檢視。標準範本未必適用每家公司，歡迎由台灣勞基真人顧問提供客製化評估。'],
  [/勞檢|罰款|申訴|檢舉|調解|勞資爭議/, '遇到勞檢、申訴或勞資爭議時，先保存通知文件、契約與出勤薪資資料，並確認答覆期限。可交由台灣勞基真人顧問協助整理處理方向。']
 ];
 for(const [pattern,message] of rules){if(pattern.test(q))return message;}
 return '這個問題可能涉及勞動契約、公司制度或其他法規，需了解具體背景才能判斷。建議先保留相關通知與文件，再請台灣勞基真人顧問協助釐清。';
}
root.querySelector('.lawki-chat-form').addEventListener('submit',event=>{
 event.preventDefault();
 const q=input.value.trim();if(!q)return;
 currentQuestion=q;
 reply.textContent=initialAdvice(q)+'\n\n若希望確認自身情況，請點擊下方「官方 LINE 真人客服」並將問題傳送給顧問。';
 answer.hidden=false;
 status.textContent='';
 answer.scrollIntoView({block:'nearest',behavior:'smooth'});
});
root.querySelector('.lawki-chat-copy').addEventListener('click',async()=>{
 if(!currentQuestion)return;
 try{await navigator.clipboard.writeText(currentQuestion);status.textContent='問題已複製，請在 LINE 對話中貼上傳送。';}
 catch(error){status.textContent='目前無法複製，請手動複製上方輸入的問題。';}
});
})();

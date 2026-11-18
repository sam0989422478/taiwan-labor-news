/* 台灣勞基新聞網｜免費三頁式勞資問題初步解答，第一頁即提供真人客服 */
(()=>{
'use strict';
if(document.getElementById('lawki-chat-widget'))return;
const lineUrl='https://lin.ee/NgRW9iS';
const topics=[
 {pattern:/職災|工傷|職業傷害|工作受傷|上下班車禍|職業病/,name:'職災與補償',
  lead:'如果是在工作過程中受傷，除了就醫與保全證據，還要釐清是否屬職業災害，以及雇主的通報、補償與相關保險責任。不能只憑「公司有保險」就認定所有責任已處理。',
  factors:['事故發生時間、地點及當時執行的工作內容','是否有就醫診斷、事故紀錄與目擊證人','雇主是否知悉事故、已採取哪些措施，以及投保情形'],
  actions:['先就醫並保存診斷證明、收據與必要的事故證據','將事故經過按時間記錄，保留工作指示及通訊紀錄','請真人顧問依事故原因、職災認定與適用制度逐項檢視']},
 {pattern:/霸凌|性騷擾|歧視|不當對待|職場暴力/,name:'職場不法侵害',
  lead:'遇到職場霸凌、性騷擾或歧視，首先要確認具體行為、證據及適用的申訴制度。不同性質的事件，雇主的處理義務與申訴途徑並不完全相同。',
  factors:['發生時間、地點、具體言行與在場人員','是否有訊息、信件、錄音或其他合法取得的證據','是否已提出申訴，以及公司採取了哪些調查或保護措施'],
  actions:['把事件依日期整理，妥善保存相關證據','避免公開未經證實的指控或散布當事人個資','讓真人顧問協助辨識申訴途徑、程序與應注意的期限']},
 {pattern:/資遣|裁員|解雇|解僱|開除|非自願離職|預告工資/,name:'資遣與解僱',
  lead:'公司能否資遣或解僱員工，關鍵是有沒有符合法定事由及程序；是否要給付資遣費、預告工資或開立證明，也要依實際情況判斷。不能只靠口頭宣布就認為一定合法。',
  factors:['任職期間、適用的勞動契約與公司規則','公司提出的具體終止理由及相關證據','通知方式、預告期間與是否涉及特別保護情形'],
  actions:['先保留契約、終止通知、薪資與出勤紀錄','確認終止的事由、日期及各項給付是否列明','由真人顧問依具體事由檢查程序、資遣費與風險']},
 {pattern:/加班費|超時|加班|工時|排班|休息日|輪班|補休/,name:'工時與加班費',
  lead:'公司安排加班，不代表加班費就可以省略；但是否構成加班、如何計算，須先確認實際工作時段、出勤日性質與適用制度。單看打卡時間或薪資名目通常不足以判斷。',
  factors:['每日實際工作時間、休息時間與出勤紀錄','加班是否經要求、同意或實際受雇主指揮監督','當天屬一般工作日、休息日或其他假日，以及薪資約定'],
  actions:['保存班表、打卡資料、加班訊息與薪資單','按日期整理有爭議的工時，不要只計算單月總時數','由真人顧問確認適用的計算方式及雇主與勞工各自權利義務']},
 {pattern:/薪資|工資|薪水|扣薪|最低工資|獎金|年終|全勤/,name:'薪資與扣款',
  lead:'薪資項目能否調整、扣款是否合法，必須區分工資與其他給付，並確認雙方約定及實際執行情況。公司不能單憑內部公告，就忽略法律對工資給付的要求。',
  factors:['勞動契約、薪資結構與約定的給付條件','薪資明細、實際發放與扣款原因','爭議款項的性質，以及是否已經發生或取得請求權'],
  actions:['先比對契約、薪資單及實際入帳金額','保留公司公告與薪資變動通知','讓真人顧問逐項釐清款項性質、計算方式與調整風險']},
 {pattern:/離職|辭職|交接|離職證明|競業禁止|自願離職/,name:'離職與交接',
  lead:'員工提出離職後，仍需處理預告、交接、薪資結算及相關證明；公司也不能一概以「未完成交接」作為任意扣薪的理由。實際權利義務應依年資、契約及法規判斷。',
  factors:['到職日期、預計最後工作日及離職通知內容','是否有特殊契約約定，例如保密或競業限制','未結清工資、休假與交接爭議的具體項目'],
  actions:['以文字確認離職日期與交接項目','保留離職通知、薪資資料及工作交接紀錄','由真人顧問檢查預告、結算及相關爭議的處理方式']},
 {pattern:/特休|請假|病假|事假|婚假|喪假|產假|育嬰|育兒|家庭照顧假/,name:'請假與休假',
  lead:'能不能請假、薪資如何計算，以及公司能否拒絕，要先辨識假別與適用條件。特休、病假、家庭照顧假及育嬰相關制度各有不同規範，不能混在一起判斷。',
  factors:['申請的是哪一種假別及預計期間','任職年資、工作型態與是否符合申請要件','公司工作規則、申請紀錄及實際回覆'],
  actions:['保留請假申請與公司回覆紀錄','確認假別及當時有效的主管機關規定','請真人顧問檢視給假、工資及管理程序是否適當']},
 {pattern:/勞保|健保|勞退|退休金|保險|投保|提繳/,name:'勞健保與退休金',
  lead:'勞健保、職災保險與退休金提繳是不同制度，適用身分與計算基礎也不完全相同。若懷疑投保或提繳有誤，應先比對紀錄，避免只用薪資數字直接推定違規。',
  factors:['僱用關係、任職期間及投保身分','投保薪資、實際工資與相關提繳紀錄','公司是否有異動申報、補報或其他特殊情況'],
  actions:['先向主管機關查詢自己的投保與提繳資料','保留薪資單、契約與加退保通知','請真人顧問釐清適用制度及後續更正方式']},
 {pattern:/工作規則|勞動契約|聘僱契約|薪資設計|制度|顧問|員工手冊/,name:'企業勞務制度',
  lead:'企業的勞動契約與工作規則應依產業、職務與實際管理方式設計，而不只是下載通用範本。制度的約定內容、適用對象與執行方式，都可能影響日後勞資爭議風險。',
  factors:['企業人數、產業別、職務與排班型態','現有契約、工作規則及薪資給付項目','希望改善的管理問題及已發生的爭議'],
  actions:['整理目前的契約、工作規則與出勤薪資制度','先盤點經常發生的管理難題與執行落差','由台灣勞基真人顧問評估適用法規及客製化修正方向']},
 {pattern:/勞檢|罰款|申訴|檢舉|調解|勞資爭議|訴訟/,name:'勞檢與勞資爭議',
  lead:'收到勞檢通知、勞資申訴或調解通知時，先確認案件性質、通知內容與期限，再整理資料。不同程序的回覆方式及法律效果不同，不宜匆忙承認或否認所有爭議事項。',
  factors:['通知的機關、案件類型及回覆期限','雙方目前的爭點、相關契約與出勤薪資紀錄','是否已經進行調解、調查或其他法律程序'],
  actions:['保留所有通知與收件日期，確認期限','依爭議事項整理資料，避免修改或銷毀紀錄','交由真人顧問協助確認程序、文件與處理方向']}
];
const general={
 name:'勞資問題初步分析',
 lead:'您提出的是勞資相關問題，但目前資訊還不足以判斷誰有法律上的權利或責任。建議先確認勞雇關係、事件經過與相關文件，再由台灣勞基真人顧問依個案說明。',
 factors:['您是企業主、主管還是勞工，以及所屬行業','事情何時發生、雙方目前有什麼爭議','是否有勞動契約、公告、薪資或通訊紀錄'],
 actions:['先用時間順序整理事件經過','妥善保存相關資料，暫時不要公開個人敏感資訊','點擊下方官方 LINE 聯絡真人客服，補充背景後再做判斷']
};
function make(tag,className,text){const el=document.createElement(tag);if(className)el.className=className;if(text!==undefined)el.textContent=text;return el;}
const root=make('aside','lawki-chat');root.id='lawki-chat-widget';root.setAttribute('aria-label','台灣勞基勞資問題諮詢');
const panel=make('section','lawki-chat-panel');panel.id='lawki-chat-panel';panel.setAttribute('aria-label','勞資問題諮詢');panel.hidden=true;
const header=make('div','lawki-chat-header');
const heading=make('strong','', '勞資問題專業導讀');
const close=make('button','lawki-chat-close','×');close.type='button';close.setAttribute('aria-label','關閉諮詢視窗');header.append(heading,close);
const body=make('div','lawki-chat-body');
const intro=make('p','lawki-chat-intro','請描述您的問題。網站會提供 3 頁初步說明：判斷方向、需確認的條件，以及處理建議。第一頁立即附上官方 LINE 真人客服。');
const form=make('form','lawki-chat-form');
const label=make('label','','請輸入您的問題');label.htmlFor='lawki-chat-input';
const input=make('textarea','lawki-chat-input');input.id='lawki-chat-input';input.maxLength=700;input.required=true;input.placeholder='例如：員工下班後回訊息算加班嗎？';
const send=make('button','lawki-chat-send','查看完整解答');send.type='submit';
form.append(label,input,send);
const answer=make('section','lawki-chat-answer');answer.id='lawki-chat-answer';answer.hidden=true;answer.setAttribute('aria-label','勞資問題初步解答');
const pageLabel=make('div','lawki-chat-page-label');pageLabel.setAttribute('aria-live','polite');
const answerTitle=make('h3','lawki-chat-answer-title');
const answerBody=make('div','lawki-chat-answer-text');answerBody.setAttribute('aria-live','polite');
const pager=make('nav','lawki-chat-pager');pager.setAttribute('aria-label','答案分頁');
const prev=make('button','lawki-chat-page-button','上一頁');prev.type='button';
const counter=make('span','lawki-chat-page-count');
const next=make('button','lawki-chat-page-button lawki-chat-page-next','下一頁');next.type='button';
pager.append(prev,counter,next);
const line=make('a','lawki-chat-line','立即聯絡官方 LINE 真人客服');line.href='https://lin.ee/NgRW9iS';line.target='_blank';line.rel='noopener noreferrer';
const copy=make('button','lawki-chat-copy','複製問題，貼到 LINE 給客服');copy.type='button';
const status=make('p','lawki-chat-status');status.setAttribute('aria-live','polite');
const note=make('p','lawki-chat-note','這是依關鍵字提供的預設法規導讀，不是 AI 即時個案判斷或正式法律意見。實際適用仍須確認現行規定及個案事實。請勿輸入身分證字號、完整個資或敏感資料；此網站不會儲存或傳送您的問題。');
answer.append(pageLabel,answerTitle,answerBody,pager,line,copy,status,note);
body.append(intro,form,answer);panel.append(header,body);
const toggle=make('button','lawki-chat-toggle','💬 勞資問題諮詢');toggle.type='button';toggle.setAttribute('aria-controls','lawki-chat-panel');toggle.setAttribute('aria-expanded','false');
root.append(panel,toggle);document.body.appendChild(root);
let currentQuestion='',selected=general,page=0;
function open(yes){panel.hidden=!yes;toggle.setAttribute('aria-expanded',String(yes));if(yes)input.focus();else toggle.focus();}
toggle.addEventListener('click',()=>open(panel.hidden));close.addEventListener('click',()=>open(false));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!panel.hidden)open(false);});
function pickTopic(question){
 const q=question.replace(/\s+/g,'');
 return topics.find(topic=>topic.pattern.test(q))||general;
}
function renderPage(){
 pageLabel.textContent='第 '+(page+1)+'／3 頁 · '+selected.name;
 answerBody.replaceChildren();
 if(page===0){
  answerTitle.textContent='先說結論與判斷方向';
  answerBody.append(make('p','',selected.lead));
  answerBody.append(make('p','lawki-chat-inline-tip','想直接處理您的實際情況？下方可立即聯絡台灣勞基真人客服。'));
 }else if(page===1){
  answerTitle.textContent='哪些條件會影響判斷？';
  answerBody.append(make('p','','要更準確地分析這個問題，通常需要確認：'));
  const ul=make('ul');
  selected.factors.forEach(item=>ul.append(make('li','',item)));
  answerBody.append(ul);
 }else{
  answerTitle.textContent='建議現在怎麼處理？';
  const ol=make('ol');
  selected.actions.forEach(item=>ol.append(make('li','',item)));
  answerBody.append(ol);
 }
 prev.disabled=page===0;next.disabled=page===2;
 counter.textContent=(page+1)+' / 3';
 status.textContent='';
}
function movePage(nextPage){
 if(nextPage<0||nextPage>2)return;
 page=nextPage;renderPage();pageLabel.scrollIntoView({block:'nearest',behavior:'smooth'});
}
prev.addEventListener('click',()=>movePage(page-1));next.addEventListener('click',()=>movePage(page+1));
form.addEventListener('submit',event=>{
 event.preventDefault();
 const q=input.value.trim();if(!q)return;
 currentQuestion=q;selected=pickTopic(q);page=0;renderPage();answer.hidden=false;
 panel.scrollTop=Math.min(answer.offsetTop, panel.scrollHeight);
});
copy.addEventListener('click',async()=>{
 if(!currentQuestion)return;
 try{await navigator.clipboard.writeText(currentQuestion);status.textContent='已複製問題，請切換到 LINE 對話貼上傳送。';}
 catch(err){status.textContent='無法自動複製，請手動複製原問題。';}
});
})();
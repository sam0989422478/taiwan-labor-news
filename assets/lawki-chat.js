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

const general={name:'一般勞資問題',lead:'這個問題需要先釐清勞雇關係與事件背景，尚無法單憑一句話判定誰有權利或責任。',factors:['當事人是雇主還是勞工','事件日期、具體行為和相關通知','契約、薪資單或出勤紀錄'],actions:['按時間整理事情經過','保存必要資料但勿公開敏感個資','交由真人顧問查核適用法規']};
const root=document.createElement('aside');root.id='lawki-chat-widget';root.className='lawki-chat';
root.setAttribute('aria-label','台灣勞基勞資問題諮詢');
root.innerHTML='<section id="lawki-chat-panel" class="lawki-chat-panel" hidden aria-label="勞資問題諮詢">'
+'<div class="lawki-chat-header"><div><strong>台灣勞基｜勞資諮詢</strong><small>可以連續追問 · 初步問題分析</small></div><button type="button" class="lawki-chat-close" aria-label="關閉">×</button></div>'
+'<div class="lawki-chat-conversation" role="log" aria-label="對話紀錄" aria-live="polite"><div class="lawki-chat-bubble assistant"><p>您好！請描述勞資問題。回答後可直接接續提問，我會保留這次對話的主題與您提供的背景。</p></div></div>'
+'<div class="lawki-chat-follow"></div><div class="lawki-chat-handoff" hidden><a class="lawki-chat-line" href="https://lin.ee/NgRW9iS" target="_blank" rel="noopener noreferrer">立即聯絡官方 LINE 真人客服</a><button type="button" class="lawki-chat-copy">複製對話摘要給真人客服</button><p class="lawki-chat-status" role="status"></p></div>'
+'<form class="lawki-chat-form lawki-chat-compose"><label for="lawki-chat-input">輸入問題或接續追問</label><textarea id="lawki-chat-input" class="lawki-chat-input" rows="2" maxlength="700" placeholder="例如：員工下班後回訊息算加班嗎？" required></textarea><button type="submit" class="lawki-chat-send">送出問題</button><p class="lawki-chat-note">此為免費規則式法規導讀，非 AI 個案法律判斷。請勿輸入身分證、姓名或敏感資料；提問僅留在目前頁面，不會傳到本站伺服器。</p></form></section>'
+'<button class="lawki-chat-toggle" type="button" aria-expanded="false" aria-controls="lawki-chat-panel">💬 勞資問題諮詢</button>';
document.body.append(root);
const panel=root.querySelector('#lawki-chat-panel'),toggle=root.querySelector('.lawki-chat-toggle'),input=root.querySelector('#lawki-chat-input'),thread=root.querySelector('.lawki-chat-conversation'),follow=root.querySelector('.lawki-chat-follow'),handoff=root.querySelector('.lawki-chat-handoff'),status=root.querySelector('.lawki-chat-status');
let topic=null,role='',turns=0;const history=[];
function open(yes){panel.hidden=!yes;toggle.setAttribute('aria-expanded',String(yes));if(yes)input.focus();else toggle.focus();}
toggle.addEventListener('click',()=>open(panel.hidden));root.querySelector('.lawki-chat-close').addEventListener('click',()=>open(false));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!panel.hidden)open(false)});
function chooseTopic(q){return topics.find(t=>t.pattern.test(q.replace(/\s+/g,'')))||null;}
function chooseRole(q){
 if(/我是(雇主|老闆|人資|主管)|我們公司|我的員工|我是資方/.test(q))return '雇主／主管';
 if(/我是(員工|勞工|上班族)|我老闆|我被|我是勞方/.test(q))return '勞工';
 return '';
}
function bubble(who,message,details){
 const div=document.createElement('div');div.className='lawki-chat-bubble '+(who==='訪客'?'user':'assistant');
 const p=document.createElement('p');p.textContent=message;div.append(p);
 if(details){
  const d=document.createElement('details');d.className='lawki-chat-more';
  const s=document.createElement('summary');s.textContent='展開完整分析與處理建議';d.append(s);
  const h=document.createElement('strong');h.textContent='還要確認的條件';d.append(h);
  const ul=document.createElement('ul');details.factors.forEach(x=>{const li=document.createElement('li');li.textContent=x;ul.append(li)});d.append(ul);
  const h2=document.createElement('strong');h2.textContent='建議處理步驟';d.append(h2);
  const ol=document.createElement('ol');details.actions.forEach(x=>{const li=document.createElement('li');li.textContent=x;ol.append(li)});d.append(ol);div.append(d);
 }
 thread.append(div);history.push({who,text:message});
 if(history.length>30)history.shift();
 thread.scrollTop=thread.scrollHeight;
}
function suggestions(list){
 follow.replaceChildren();list.forEach(label=>{
  const b=document.createElement('button');b.type='button';b.className='lawki-chat-suggest';b.textContent=label;b.addEventListener('click',()=>send(label));follow.append(b);
 });
}
function nextQuestion(t,q){
 if(!role)return '請問您是雇主／主管，還是勞工？我可以接著從您的角度說明。';
 const map={
 '工時與加班費':'這段工作發生在平日下班後、休息日，還是國定假日？有沒有主管要求工作的紀錄？',
 '資遣與解僱':'目前只是口頭通知，還是已有書面終止通知？',
 '薪資與扣款':'主要爭議的是底薪、獎金、津貼，還是其他扣款？',
 '請假與休假':'您申請的是什麼假別？公司已經拒絕了嗎？',
 '職災與補償':'事故發生在工作中還是上下班途中？是否已有就醫紀錄？'
 };
 return map[t.name]||'請問事件現在進行到哪個階段？是否已有書面通知或證據？';
}
function answerFor(q,t,isNew){
 const roleText=role?'（依您提供的「'+role+'」角度）':'';
 if(isNew)return t.lead+'\n\n'+nextQuestion(t,q);
 if(/^(我是)?(雇主|老闆|人資|主管|勞工|員工|勞方|資方)$/.test(q.replace(/\s/g,'')))return '了解，已記下您的身分'+roleText+'。'+t.lead+'\n\n'+nextQuestion(t,q);
 if(/準備哪些資料|需要什麼資料|證據/.test(q))return '延續「'+t.name+'」'+roleText+'，目前最重要的是核對：\n• '+t.factors.join('\n• ')+'\n\n'+nextQuestion(t,q);
 if(/處理步驟|如何處理|怎麼處理/.test(q))return '針對「'+t.name+'」'+roleText+'，可以先這樣做：\n1. '+t.actions.map((x,i)=>(i+1)+'. '+x).join('\n')+'\n\n'+nextQuestion(t,q);
 if(/多少|幾天|怎麼算|金額|罰多少|幾倍|多久|期限/.test(q))return '您追問的是「'+t.name+'」的金額或期限'+roleText+'。要計算前，應確認適用制度、事件日期及薪資、年資或工時等資料；資訊不足時不宜直接報出數字。'+nextQuestion(t,q);
 if(/如果|已經|但是|可是|拒絕|不同意|沒有|沒|還|又/.test(q))return '承接前面「'+t.name+'」的問題'+roleText+'：您新補充的情況會影響判斷，不能直接沿用上一題的結論。'+t.lead+'\n\n'+nextQuestion(t,q);
 return '針對「'+t.name+'」的延伸問題'+roleText+'：'+t.lead+'\n\n'+nextQuestion(t,q);
}
function send(raw){
 const q=raw.trim();if(!q)return;
 bubble('訪客',q);
 const found=chooseTopic(q),foundRole=chooseRole(q);
 if(foundRole)role=foundRole;
 const isNew=turns===0||!!(found&&topic&&found!==topic);
 if(found)topic=found;if(!topic)topic=general;
 const response=answerFor(q,topic,isNew);
 bubble('台灣勞基初步導讀',response,topic);
 turns++;handoff.hidden=false;status.textContent='';
 suggestions(turns===1?['我是雇主','我是勞工','需要準備哪些資料？']:['需要準備哪些資料？','怎麼處理？','如果已經發生了呢？']);
 input.value='';
}
root.querySelector('.lawki-chat-form').addEventListener('submit',e=>{e.preventDefault();send(input.value)});
root.querySelector('.lawki-chat-copy').addEventListener('click',async()=>{
 const transcript=history.slice(-16).map(x=>x.who+'：'+x.text).join('\n\n');
 try{await navigator.clipboard.writeText('台灣勞基網站提問紀錄\n\n'+transcript);status.textContent='已複製對話內容，請在 LINE 貼上傳送。';}
 catch(e){status.textContent='複製失敗，請手動複製需要的對話內容。';}
});
})();
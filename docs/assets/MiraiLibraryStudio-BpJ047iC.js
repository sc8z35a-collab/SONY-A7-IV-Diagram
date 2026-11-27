import{_ as m}from"./index-BX_DtjaQ.js";const f="mirai_2028_edition",T=["物理・構造突破","量産民主化","既存比優位性","撮影体験革命","ASI/AI加速"],b={1:()=>m(()=>import("./vol01-CiySTs8W.js"),[],import.meta.url),2:()=>m(()=>import("./vol02-BbWVFMUI.js"),[],import.meta.url),3:()=>m(()=>import("./vol03-CCKa6PyI.js"),[],import.meta.url),4:()=>m(()=>import("./vol04-DuWnLzwX.js"),[],import.meta.url),5:()=>m(()=>import("./vol05-DPchx9Q2.js"),[],import.meta.url),6:()=>m(()=>import("./vol06-y56upAjC.js"),[],import.meta.url),7:()=>m(()=>import("./vol07-lDPCqA76.js"),[],import.meta.url),8:()=>m(()=>import("./vol08-DRgahm75.js"),[],import.meta.url)};function s(l){return l.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function d(l){return s(l).replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\*([^*]+)\*/g,"<em>$1</em>").replace(/\n\n+/g,"</p><p>").replace(/\n/g,"<br>")}function $(l){return l==="FH01"?1:l==="FH02"?2:l==="FH08"?3:l==="FH32"?4:l==="FH25"?5:l==="FH20"?6:l==="FH17"?7:l==="FH48"?8:null}function S(){try{const l=window.localStorage.getItem(f);if(l==="beginner"||l==="expert")return l}catch{}return"beginner"}function y(l){try{window.localStorage.setItem(f,l)}catch{}}class L{callbacks;root=null;isOpenFlag=!1;activeTab="reports";edition=S();activeVol=1;focusFhId=null;focusGlossaryId=null;matrixQuery="";matrixBadge="all";matrixVol=0;matrixSort="id";glossaryQuery="";glossaryMode="chapters";matrixData=null;glossaryData=null;volumeCache=new Map;boundKeyDown=t=>{t.key==="Escape"&&this.isOpenFlag&&(t.preventDefault(),this.close())};constructor(t){this.callbacks=t}isOpen(){return this.isOpenFlag}getEdition(){return this.edition}setEdition(t,r=!0){this.edition=t,y(t),r&&this.callbacks.onEditionChange?.(t),this.isOpenFlag&&this.render()}async open(t){if(t?.tab&&(this.activeTab=t.tab),t?.volume&&t.volume>=1&&t.volume<=8&&(this.activeVol=t.volume),t?.fhId){this.focusFhId=t.fhId;const r=parseInt(t.fhId.replace(/^FH0*/i,""),10);!Number.isNaN(r)&&r>=1&&r<=48&&(this.activeVol=Math.ceil(r/6))}else this.focusFhId=null;this.focusGlossaryId=t?.glossaryId??null,t?.edition&&(this.edition=t.edition,y(t.edition),this.callbacks.onEditionChange?.(t.edition)),this.ensureMounted(),this.isOpenFlag=!0,await this.ensureDataForCurrentTab(),this.render(),this.scrollToFocusedTarget()}close(){this.isOpenFlag=!1,window.removeEventListener("keydown",this.boundKeyDown),this.root&&(this.root.remove(),this.root=null)}ensureMounted(){if(this.root)return;const t=document.createElement("div");t.className="mirai-studio-backdrop",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-label","Future History MIRAI 2028 ライブラリ"),t.addEventListener("click",r=>{r.target===t&&this.close()}),document.body.appendChild(t),this.root=t,window.addEventListener("keydown",this.boundKeyDown)}async ensureMatrix(){if(!this.matrixData){const t=await m(()=>import("./matrix-DkP7Xgvv.js"),[],import.meta.url);this.matrixData=t.default}return this.matrixData}async ensureGlossary(){if(!this.glossaryData){const t=await m(()=>import("./glossary-LeCdZycG.js"),[],import.meta.url);this.glossaryData=t.default}return this.glossaryData}async ensureVolume(t){const r=this.volumeCache.get(t);if(r)return r;const a=await(b[t]??b[1])();return this.volumeCache.set(t,a.default),a.default}async ensureDataForCurrentTab(){this.activeTab==="reports"?await Promise.all([this.ensureMatrix(),this.ensureVolume(this.activeVol),this.ensureGlossary()]):this.activeTab==="matrix"?await this.ensureMatrix():await this.ensureGlossary()}scrollToFocusedTarget(){if(!this.root)return;const t=this.focusFhId?`mirai-tech-card-${this.focusFhId}`:this.focusGlossaryId?`mirai-gloss-card-${this.focusGlossaryId}`:null;t&&requestAnimationFrame(()=>{const r=this.root?.querySelector(`#${CSS.escape(t)}`);r&&(r.scrollIntoView({behavior:"smooth",block:"start"}),r.classList.add("mirai-focus-pulse"),setTimeout(()=>r.classList.remove("mirai-focus-pulse"),1800))})}render(){if(!this.root)return;const t=this.matrixData?.averageScore?.toFixed(2)??"81.63";this.root.innerHTML=`
      <div class="mirai-studio-modal">
        <header class="mirai-studio-header">
          <div class="mirai-studio-brand">
            <span class="mirai-studio-emblem">FH 2028</span>
            <div class="mirai-studio-titles">
              <h2>Future History MIRAI 2028</h2>
              <p>2026.12.01 — 2028.12.01 ｜ 全48技術・16レポート＋別冊用語辞典113語（平均 ${t}点）</p>
            </div>
          </div>

          <div class="mirai-studio-header-right">
            <div class="mirai-edition-toggle" role="group" aria-label="解説エディション切替">
              <button type="button" class="mirai-ed-btn ${this.edition==="beginner"?"active":""}" data-ed="beginner">やさしい</button>
              <button type="button" class="mirai-ed-btn ${this.edition==="expert"?"active":""}" data-ed="expert">専門</button>
            </div>
            <button type="button" class="mirai-studio-close" aria-label="閉じる">✕</button>
          </div>
        </header>

        <nav class="mirai-studio-tabs" role="tablist">
          <button type="button" class="mirai-tab-btn ${this.activeTab==="reports"?"active":""}" data-tab="reports">レポート全8巻（16冊）</button>
          <button type="button" class="mirai-tab-btn ${this.activeTab==="matrix"?"active":""}" data-tab="matrix">48技術比較マトリクス</button>
          <button type="button" class="mirai-tab-btn ${this.activeTab==="glossary"?"active":""}" data-tab="glossary">別冊・専門用語辞典（113語）</button>
        </nav>

        <div class="mirai-studio-body">
          ${this.activeTab==="reports"?this.renderReportsTab():this.activeTab==="matrix"?this.renderMatrixTab():this.renderGlossaryTab()}
        </div>
      </div>
    `,this.bindEvents()}renderReportsTab(){const t=this.volumeCache.get(this.activeVol),r=this.matrixData?.volumes??[],e=new Map((this.glossaryData?.terms??[]).map(o=>[o.id,o])),a=r.map(o=>`
        <button type="button" class="mirai-vol-pill ${o.volume===this.activeVol?"active":""}" data-vol="${o.volume}">
          <span class="mirai-vol-num">Vol.0${o.volume}</span>
          <span class="mirai-vol-theme">${s(o.theme.slice(0,14))}${o.theme.length>14?"…":""}</span>
        </button>`).join("");if(!t)return`<div class="mirai-vol-strip">${a}</div><div class="mirai-loading">Vol.0${this.activeVol} を読み込み中…</div>`;const i=this.edition==="beginner"?t.beginnerHeader:t.expertHeader,n=t.technologies.map(o=>{const c=this.edition==="beginner"?o.beginner:o.expert,p=$(o.id),x=o.badge==="量産民主化"?"badge-demo":o.badge==="超知能加速"?"badge-asi":"badge-wish",E=T.map((u,h)=>`
          <div class="mirai-axis-row">
            <span class="mirai-axis-lbl">${u}</span>
            <div class="mirai-axis-track"><div class="mirai-axis-fill" style="width:${o.axes[h]/20*100}%"></div></div>
            <span class="mirai-axis-val">${o.axes[h]}/20</span>
          </div>`).join(""),v=c.comparisonRows.map(u=>`
            <tr>
              <td><strong>${s(u.metric)}</strong></td>
              <td>${d(u.current2026)}</td>
              <td class="mirai-td-future">${d(u.future2028)}</td>
            </tr>`).join(""),_=c.sources.map(u=>`
            <li><a href="${s(u.url)}" target="_blank" rel="noopener noreferrer">${d(u.label)}</a></li>`).join(""),g=o.glossaryIds.map(u=>{const h=e.get(u);return h?`<button type="button" class="mirai-gloss-chip" data-gloss="${s(u)}">${s(h.term)}</button>`:""}).join("");return`
          <article class="mirai-tech-article" id="mirai-tech-card-${s(o.id)}">
            <div class="mirai-tech-head">
              <div class="mirai-tech-id-row">
                <span class="mirai-fh-code">${s(o.id)}</span>
                <span class="mirai-badge ${x}">${s(o.badge)}</span>
                <span class="mirai-eta-pill">到達目安: ${s(o.eta)}</span>
                ${p?`<button type="button" class="mirai-3d-jump-btn" data-jump-3d="${p}">3D構造モデルを見る (${s(o.id)})</button>`:'<span class="mirai-3d-soon-pill">3D構造：試作評価後に順次展開</span>'}
                <button type="button" class="mirai-base-jump-btn" data-jump-base="${s(o.baselineMode)}">現行2026実機と比較</button>
              </div>
              <h3 class="mirai-tech-title">${s(c.title)}</h3>
              ${c.oneLiner?`<p class="mirai-tech-oneliner">${d(c.oneLiner)}</p>`:""}
            </div>

            <div class="mirai-tech-grid">
              <div class="mirai-tech-main">
                <div class="mirai-subsec">
                  <h4>${this.edition==="beginner"?"わかりやすくポイント解説":"技術的特徴・物理メカニズム"}</h4>
                  <ul class="mirai-feature-list">
                    ${c.features.map(u=>`<li>${d(u)}</li>`).join("")}
                  </ul>
                </div>

                ${v?`<div class="mirai-subsec">
                        <h4>2026年現行技術 vs 2028年未来技術</h4>
                        <table class="mirai-compare-table">
                          <thead><tr><th>${s(c.comparisonHeaders[0]||"項目")}</th><th>${s(c.comparisonHeaders[1]||"2026現行")}</th><th>${s(c.comparisonHeaders[2]||"2028未来")}</th></tr></thead>
                          <tbody>${v}</tbody>
                        </table>
                      </div>`:""}

                <div class="mirai-procon-grid">
                  <div class="mirai-pc-box"><strong>変化</strong><p>${d(c.changes)}</p></div>
                  <div class="mirai-pc-box pc-pro"><strong>メリット・優位性</strong><p>${d(c.pros)} ${d(c.edge)}</p></div>
                  <div class="mirai-pc-box pc-con"><strong>デメリット・残る壁</strong><p>${d(c.cons)}</p></div>
                </div>

                ${g?`<div class="mirai-subsec"><h4>関連専門用語（別冊113語）</h4><div class="mirai-glossary-chips">${g}</div></div>`:""}

                <div class="mirai-subsec">
                  <h4>一次情報・検証根拠リンク</h4>
                  <ul class="mirai-source-list">${_}</ul>
                </div>
              </div>

              <aside class="mirai-score-card">
                <div class="mirai-score-head">
                  <span class="mirai-score-lbl">革新性スコア</span>
                  <div class="mirai-score-big">${o.score}<span> / 100</span></div>
                </div>
                <div class="mirai-axes-list">${E}</div>
                <p class="mirai-score-rationale">${d(c.scoreRationale)}</p>
              </aside>
            </div>
          </article>
        `}).join("");return`
      <div class="mirai-vol-strip">${a}</div>
      <section class="mirai-vol-intro-card">
        <div class="mirai-vol-intro-tag">Vol.0${t.volume} ｜ ${this.edition==="beginner"?"やさしい解説版":"技術者向け専門版"}</div>
        <h3>${s(i.title)}</h3>
        <details class="mirai-preamble-details" open>
          <summary>企画意図・まえがき・導入</summary>
          <div class="mirai-preamble-body">
            <p>${d(i.intent)}</p>
            <p>${d(i.preface)}</p>
            <p>${d(i.intro)}</p>
          </div>
        </details>
      </section>
      <div class="mirai-tech-list">${n}</div>
    `}renderMatrixTab(){const t=this.matrixData;if(!t)return'<div class="mirai-loading">48技術マトリクスを読み込み中…</div>';const r=this.matrixQuery.trim().toLowerCase();let e=t.technologies.filter(i=>!(this.matrixBadge!=="all"&&i.badge!==this.matrixBadge||this.matrixVol>0&&i.volume!==this.matrixVol||r&&!`${i.id} ${i.expertTitle} ${i.beginnerTitle} ${i.volumeTheme} ${i.oneLiner}`.toLowerCase().includes(r)));this.matrixSort==="score"&&(e=[...e].sort((i,n)=>n.score-i.score||i.id.localeCompare(n.id)));const a=e.map(i=>{const n=$(i.id),o=this.edition==="beginner"?i.beginnerTitle:i.expertTitle;return`
          <tr class="mirai-matrix-row">
            <td><span class="mirai-fh-code">${s(i.id)}</span></td>
            <td>Vol.0${i.volume}</td>
            <td>
              <button type="button" class="mirai-matrix-title-btn" data-open-fh="${s(i.id)}">${s(o)}</button>
            </td>
            <td><span class="mirai-badge ${i.badge==="量産民主化"?"badge-demo":i.badge==="超知能加速"?"badge-asi":"badge-wish"}">${s(i.badge)}</span></td>
            <td class="mirai-matrix-score"><strong>${i.score}</strong>/100</td>
            <td>${s(i.eta)}</td>
            <td>
              ${n?`<button type="button" class="mirai-3d-mini-btn" data-jump-3d="${n}">3D表示</button>`:`<button type="button" class="mirai-read-mini-btn" data-open-fh="${s(i.id)}">解説</button>`}
            </td>
          </tr>`}).join("");return`
      <div class="mirai-filter-bar">
        <input type="search" class="mirai-search-input" data-search="matrix" placeholder="48技術をキーワード検索（例：SPAD, ペロブスカイト, メタレンズ, 全固体電池…）" value="${s(this.matrixQuery)}" />
        <select class="mirai-select" data-filter="badge">
          <option value="all" ${this.matrixBadge==="all"?"selected":""}>全分類 (48)</option>
          <option value="量産民主化" ${this.matrixBadge==="量産民主化"?"selected":""}>量産民主化</option>
          <option value="超知能加速" ${this.matrixBadge==="超知能加速"?"selected":""}>超知能加速</option>
          <option value="願望ブレイクスルー" ${this.matrixBadge==="願望ブレイクスルー"?"selected":""}>願望ブレイクスルー</option>
        </select>
        <select class="mirai-select" data-filter="vol">
          <option value="0" ${this.matrixVol===0?"selected":""}>全8巻</option>
          ${[1,2,3,4,5,6,7,8].map(i=>`<option value="${i}" ${this.matrixVol===i?"selected":""}>Vol.0${i}</option>`).join("")}
        </select>
        <select class="mirai-select" data-filter="sort">
          <option value="id" ${this.matrixSort==="id"?"selected":""}>FH01→FH48順</option>
          <option value="score" ${this.matrixSort==="score"?"selected":""}>革新性スコア高い順</option>
        </select>
      </div>
      <div class="mirai-matrix-meta">表示中：<strong>${e.length}</strong> / ${t.totalTechnologies} 技術 ｜ 全体平均スコア：<strong>${t.averageScore.toFixed(2)} / 100点</strong> ｜ 3D試作公開中：<strong>FH01・FH02</strong></div>
      <div class="mirai-matrix-wrap">
        <table class="mirai-matrix-table">
          <thead>
            <tr><th>ID</th><th>巻</th><th>技術名（${this.edition==="beginner"?"やさしい":"専門"}）</th><th>分類</th><th>スコア</th><th>到達目安</th><th>操作</th></tr>
          </thead>
          <tbody>${a}</tbody>
        </table>
      </div>
    `}renderGlossaryTab(){const t=this.glossaryData;if(!t)return'<div class="mirai-loading">別冊・専門用語辞典（113語）を読み込み中…</div>';const r=this.glossaryQuery.trim().toLowerCase();let e=t.terms.filter(i=>!(this.glossaryMode==="alpha"&&i.script!=="alpha"||this.glossaryMode==="kana"&&i.script!=="kana"||r&&!`${i.id} ${i.term} ${i.reading} ${i.oneLine} ${i.analogy} ${i.fhIds.join(" ")}`.toLowerCase().includes(r)));this.glossaryMode==="alpha"?e=[...e].sort((i,n)=>i.indexKey.localeCompare(n.indexKey)||i.term.localeCompare(n.term)):this.glossaryMode==="kana"&&(e=[...e].sort((i,n)=>i.reading.localeCompare(n.reading,"ja")));const a=e.map(i=>`
        <article class="mirai-gloss-card" id="mirai-gloss-card-${s(i.id)}">
          <div class="mirai-gloss-card-head">
            <span class="mirai-gloss-num">#${s(i.id)}</span>
            <h4>${s(i.term)}</h4>
            <span class="mirai-gloss-reading">${s(i.reading)}</span>
            <span class="mirai-gloss-ch">第${i.chapter}章</span>
          </div>
          <p class="mirai-gloss-oneline">${d(i.oneLine)}</p>
          ${i.analogy?`<p class="mirai-gloss-analogy"><strong>たとえると：</strong>${d(i.analogy)}</p>`:""}
          ${i.cameraImpact?`<p class="mirai-gloss-impact"><strong>カメラでどう効く？：</strong>${d(i.cameraImpact)}</p>`:""}
          <div class="mirai-gloss-links">
            ${i.fhIds.map(n=>`<button type="button" class="mirai-fh-mini-chip" data-open-fh="${s(n)}">${s(n)}</button>`).join("")}
          </div>
        </article>`).join("");return`
      <div class="mirai-filter-bar">
        <input type="search" class="mirai-search-input" data-search="glossary" placeholder="全113語を検索（例：SPAD, ペロブスカイト, エタンデュ, Cu-Cu, 超知能…）" value="${s(this.glossaryQuery)}" />
        <div class="mirai-gloss-mode-group">
          <button type="button" class="mirai-gm-btn ${this.glossaryMode==="chapters"?"active":""}" data-gmode="chapters">分野別 8章 (${t.totalTerms})</button>
          <button type="button" class="mirai-gm-btn ${this.glossaryMode==="alpha"?"active":""}" data-gmode="alpha">数字・A–Z (${t.alphaCount})</button>
          <button type="button" class="mirai-gm-btn ${this.glossaryMode==="kana"?"active":""}" data-gmode="kana">50音 (${t.kanaCount})</button>
        </div>
      </div>
      <div class="mirai-gloss-grid">${a}</div>
    `}bindEvents(){if(!this.root)return;this.root.querySelector(".mirai-studio-close")?.addEventListener("click",()=>this.close()),this.root.querySelectorAll(".mirai-ed-btn").forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.ed==="expert"?"expert":"beginner";this.setEdition(a,!0)})}),this.root.querySelectorAll(".mirai-tab-btn").forEach(e=>{e.addEventListener("click",async()=>{const a=e.dataset.tab??"reports";this.activeTab=a,this.focusFhId=null,this.focusGlossaryId=null,await this.ensureDataForCurrentTab(),this.render()})}),this.root.querySelectorAll(".mirai-vol-pill").forEach(e=>{e.addEventListener("click",async()=>{const a=Number(e.dataset.vol||"1");this.activeVol=a,this.focusFhId=null,await this.ensureVolume(a),this.render()})}),this.root.querySelectorAll("[data-jump-3d]").forEach(e=>{e.addEventListener("click",()=>{const a=Number(e.dataset.jump3d||"1");this.close(),this.callbacks.onJumpTo3d(a)})}),this.root.querySelectorAll("[data-jump-base]").forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.jumpBase||"sensor";this.close(),this.callbacks.onJumpToBaseline(a)})}),this.root.querySelectorAll("[data-open-fh]").forEach(e=>{e.addEventListener("click",async()=>{const a=e.dataset.openFh;a&&await this.open({tab:"reports",fhId:a})})}),this.root.querySelectorAll("[data-gloss]").forEach(e=>{e.addEventListener("click",async()=>{const a=e.dataset.gloss;a&&await this.open({tab:"glossary",glossaryId:a})})});const t=this.root.querySelector('[data-search="matrix"]');t?.addEventListener("input",()=>{this.matrixQuery=t.value;const e=t.selectionStart??t.value.length;this.render();const a=this.root?.querySelector('[data-search="matrix"]');a?.focus(),a?.setSelectionRange(e,e)});const r=this.root.querySelector('[data-search="glossary"]');r?.addEventListener("input",()=>{this.glossaryQuery=r.value;const e=r.selectionStart??r.value.length;this.render();const a=this.root?.querySelector('[data-search="glossary"]');a?.focus(),a?.setSelectionRange(e,e)}),this.root.querySelector('[data-filter="badge"]')?.addEventListener("change",e=>{this.matrixBadge=e.target.value,this.render()}),this.root.querySelector('[data-filter="vol"]')?.addEventListener("change",e=>{this.matrixVol=Number(e.target.value||"0"),this.render()}),this.root.querySelector('[data-filter="sort"]')?.addEventListener("change",e=>{this.matrixSort=e.target.value==="score"?"score":"id",this.render()}),this.root.querySelectorAll(".mirai-gm-btn").forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.gmode;this.glossaryMode=a||"chapters",this.render()})})}}export{L as MiraiLibraryStudio,S as loadSavedMiraiEdition,y as saveMiraiEdition};

const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./welcome-C9px3JKW.js","./welcome-Ce7Ng2Al.js","./CadHelpers-B9eaiy9k.js","./v2_unit_compiler-DzIEUGwI.js","./mi_shoe-CoOm-hOT.js","./mi_shoe-bMm9XjJ3.js","./battery-BAofaaN7.js","./battery-Cw3gePVg.js","./UltraDetailBuilders-lDidlJvj.js","./cfexpress-CG_-pnZM.js","./cfexpress-DY8cI-Wc.js","./mic-BvY-FsFm.js","./mic-CwD_McdS.js","./drybox-DvsXFKD8.js","./drybox-D1IN4adj.js","./mount-Dj-c_mWf.js","./mount-D5exe6iE.js","./mountPhysicsOverlay-C4gA45tu.js","./shutter-DukaTIU8.js","./shutter-DRF49fuH.js","./shutterPhysicsOverlay-BuRmebp4.js","./body-L7KOBOnE.js","./body-DYuOmmPC.js","./bodyPhysicsOverlay-DP8ivRFG.js","./lcdParts-DtYeQoON.js","./evfParts-DmqcHOpz.js","./evf-BZHf1SCp.js","./evf-BETQwoTg.js","./evfPhysicsOverlay-BI4k-pqw.js","./lcd-DNPEkZlp.js","./lcd-C5DFy3jF.js","./lcdPhysicsOverlay-DXM-vJ31.js","./lens-BMtso4WO.js","./lens-DbGM9PCN.js","./lensPhysicsOverlay-B9nED66W.js","./mainboard-rBhssl0l.js","./mainboard-kTn1WrHF.js","./mainboardPhysicsOverlay-BZtLvZFE.js","./bionz-DTVuLTBu.js","./bionz-B1F8ABtJ.js","./bionz_v2-DsGzSEDr.js","./bionz_v2-Mx5-M7Q3.js","./sensor-B25HZGxb.js","./sensor-CzpKrVee.js","./macroParts-epKhOSzf.js","./physicsOverlay-DaeO7Xlq.js","./micro-Nw5WURVu.js","./micro-cCBBsnJi.js","./sensorMicroUltraAuditParts-D2wXRGU2.js","./micro_v2-BPW7RXvR.js","./micro_v2-Be62c30w.js","./sensor_fab-cu2LyE5V.js","./sensor_fab-Cu3xZEwo.js","./mirai_2028-DsvDMaac.js","./mirai_2028-DKdxs6cl.js","./integrated-TYzHqGMC.js","./integrated-CH7qEuhX.js","./camera_macro_shared-BSY8AR3y.js","./camera_body-jv8lBNvf.js","./camera_body-BsMvso_j.js","./lensExplanations-CVIj2Kn6.js","./unit_explanations-DhEhaoi2.js","./mountExplanations-BzfMkKM6.js","./shutterExplanations-COwEmSMe.js","./explanations-BP4A1WOU.js","./microPixelV2Explanations-Ds_g-StQ.js","./mainboardExplanations-CFCwOEoo.js","./evfExplanations-aJd0hUVQ.js","./lcdExplanations-DVJLFMAP.js","./bodyExplanations-kgPdKIc9.js","./batteryExplanations-BeDaaZxE.js","./cfexpressExplanations-BMV4rYzd.js","./bionzExplanations-Dj7Xzik7.js","./bionzV2Explanations-Bg1XzZ5k.js","./miShoeExplanations-CLmVffr4.js","./micExplanations-C2aeFQw6.js","./sensorFabExplanations-D2TQiUI1.js","./dryboxExplanationsA-B_9kghFZ.js","./CadPlaygroundStudio-BSWt1Rib.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Su="modulepreload",Eu=function(n,e){return new URL(n,e).href},Tl={},le=function(e,t,i){let s=Promise.resolve();if(t&&t.length>0){let a=function(u){return Promise.all(u.map(d=>Promise.resolve(d).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};const o=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),h=l?.nonce||l?.getAttribute("nonce");s=a(t.map(u=>{if(u=Eu(u,i),u in Tl)return;Tl[u]=!0;const d=u.endsWith(".css"),p=d?'[rel="stylesheet"]':"";if(!!i)for(let v=o.length-1;v>=0;v--){const _=o[v];if(_.href===u&&(!d||_.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${p}`))return;const x=document.createElement("link");if(x.rel=d?"stylesheet":Su,d||(x.as="script"),x.crossOrigin="",x.href=u,h&&x.setAttribute("nonce",h),document.head.appendChild(x),d)return new Promise((v,_)=>{x.addEventListener("load",v),x.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return s.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return e().catch(r)})},ca=82,Al=0,ha=[{partId:"lens-front-xa",code:"E01",groupCode:"G1",shortLabel:"XA₁",jaName:"第1枚 XA超高度非球面 (0.01μm)",role:"F1.2の大光束を取り込みつつ球面収差と玉ボケの年輪を根本抑制",z:108.5,thick:5,ap:32.5,rF:117.92,rR:185,nd:1.772,vd:49.6,kind:"xa",isXa:!0,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:46218e-11,a6F:51747e-14,focusGroup:"fixed"},{partId:"lens-front-meniscus",code:"E02",groupCode:"G2",shortLabel:"LaK",jaName:"第2枚 高屈折ランタン正メニスカス",role:"高屈折率 n=1.883 で大口径光束を緩やかに絞り方向へ集光",z:101.8,thick:4.6,ap:31,rF:78,rR:165,nd:1.883,vd:40.8,kind:"lanthanum",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"fixed"},{partId:"lens-ed-group",code:"E03",groupCode:"G3a",shortLabel:"S-ED",jaName:"第3枚 スーパーED凸レンズ",role:"蛍石に迫る超低分散 νd=94.9 でRGBの波長ごとの屈折ズレを極小化",z:95.8,thick:4.6,ap:29.5,rF:70,rR:-86,nd:1.497,vd:94.9,kind:"ed",isXa:!1,isEd:!0,isFlint:!1,cementedToNext:!0,a4F:0,a6F:0,focusGroup:"fixed"},{partId:"lens-flint-cemented",code:"E04",groupCode:"G3b",shortLabel:"Flint",jaName:"第4枚 高分散フリント接合凹レンズ",role:"E03とUV光学接合し色分散を逆符号で完全相殺（アポクロマート化）",z:92.2,thick:2.2,ap:29,rF:-86,rR:52,nd:1.805,vd:29.8,kind:"flint",isXa:!1,isEd:!1,isFlint:!0,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"fixed"},{partId:"lens-g4-negative",code:"E05",groupCode:"G4",shortLabel:"凹G4",jaName:"第5枚 絞り直前ペッツバール凹レンズ",role:"強い負パワーでピント面の湾曲を真っ平らなフルサイズ像面へ平坦化",z:87.4,thick:2,ap:26.5,rF:-115,rR:66,nd:1.74,vd:44,kind:"crown",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"fixed"},{partId:"lens-focus-a-front",code:"E06",groupCode:"G5a",shortLabel:"FA₁",jaName:"第6枚 フォーカスA群 前側凸レンズ",role:"XDリニアモーター2基で直動しピント位置を高速移動する前側可動玉",z:75.5,thick:3.8,ap:24,rF:56,rR:-105,nd:1.804,vd:46.6,kind:"lanthanum",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"A"},{partId:"lens-focus-group-a",code:"E07",groupCode:"G5b",shortLabel:"XA₂",jaName:"第7枚 フォーカスA群 第2 XA非球面",role:"絞り直後で球面収差とコマ収差を徹底除去するフローティング主玉",z:70.9,thick:4.2,ap:24.4,rF:64,rR:-92,nd:1.743,vd:49.3,kind:"xa",isXa:!0,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:-14475e-10,a6F:15704e-15,focusGroup:"A"},{partId:"lens-focus-a-rear",code:"E08",groupCode:"G5c",shortLabel:"FA₃",jaName:"第8枚 フォーカスA群 後側補正凹レンズ",role:"A群単独で色・球面収差を自己完結させ近接時の描写劣化を防止",z:66.5,thick:2.2,ap:23.4,rF:-82,rR:84,nd:1.784,vd:42,kind:"flint",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"A"},{partId:"lens-focus-b-front",code:"E09",groupCode:"G6a",shortLabel:"ED₂",jaName:"第9枚 フォーカスB群 ED凸レンズ",role:"A群と異なる移動比で同期駆動し至近0.4mの色収差変動を打ち消す",z:60.75,thick:3.8,ap:23.4,rF:68,rR:-92,nd:1.592,vd:81.6,kind:"ed",isXa:!1,isEd:!0,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"B"},{partId:"lens-focus-group-b",code:"E10",groupCode:"G6b",shortLabel:"FB₂",jaName:"第10枚 フォーカスB群 後側負非球面",role:"独立XDモーター2基で空気間隔を可変制御しブリージングと収差を抑圧",z:56.75,thick:2.2,ap:23.6,rF:-66,rR:120,nd:1.762,vd:39.5,kind:"crown",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"B"},{partId:"lens-g7-flattener",code:"E11",groupCode:"G7",shortLabel:"凹G7",jaName:"第11枚 後群固定フィールドフラットナー",role:"フォーカス群後方で像面湾曲と非点収差を精密に最終整形",z:51.8,thick:2.2,ap:23.2,rF:-84,rR:78,nd:1.72,vd:46,kind:"crown",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"fixed"},{partId:"lens-rear-convex",code:"E12",groupCode:"G8",shortLabel:"LaK₂",jaName:"第12枚 ランタン・サジタルコマ補正レンズ",role:"画面四隅の点光源が鳥の羽のように滲むサジタルコマフレアを撃退",z:47.8,thick:4,ap:23,rF:66,rR:-84,nd:1.883,vd:40.8,kind:"lanthanum",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"fixed"},{partId:"lens-rear-telecentric",code:"E13",groupCode:"G9",shortLabel:"Tele",jaName:"第13枚 φ45mm テレセントリック正メニスカス",role:"周辺へ広がる斜め光線をフルサイズセンサーへ垂直寄り（CRA<10°）に矯正",z:43.4,thick:4,ap:22.8,rF:62,rR:155,nd:1.834,vd:42,kind:"lanthanum",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"fixed"},{partId:"lens-rear-element",code:"E14",groupCode:"G10",shortLabel:"XA₃",jaName:"第14枚 φ44mm 第3 XAリアヒーローレンズ",role:"ショートフランジ18mmの特権を活かしセンサー直前で像面と四隅解像を完成",z:38.4,thick:3.8,ap:22.4,rF:-92,rR:-68.55,nd:1.743,vd:49.3,kind:"xa",isXa:!0,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:-20147e-10,a6F:-27845e-13,focusGroup:"fixed"}],Pl=[{id:"aperture_bokeh",shortTitle:"結像 & F1.2ボケ",fullTitle:"大口径F1.2結像と11枚円形絞り・被写界深度",badge:"01",accentColor:"#0284c7",hasComparisonToggle:!1,getDynamicCaption:n=>{const e=n.getIrisMetrics(),t=e.fNumber<10?e.fNumber.toFixed(1):Math.round(e.fNumber).toString();return e.fNumber<=2?`F${t}（有効口径 φ${e.entrancePupilMm.toFixed(1)}mm）：11枚羽根の広い円形開口を膨大な光束が満たし、ピント面はカミソリのように鋭く、前後はとろける大きな玉ボケに。`:e.fNumber<=5.6?`F${t}（有効口径 φ${e.entrancePupilMm.toFixed(1)}mm）：周辺光束が絞られて光円錐の角度が細くなり、被写界深度が深く、周辺口径食（レモン型ボケ）も真円へ整います。`:`F${t}（有効口径 φ${e.entrancePupilMm.toFixed(1)}mm）：光束が針のように細く絞られ、手前から奥までクッキリ写るパンフォーカスへ変化。11枚羽根による22本の美しい光芒も発生します。`}},{id:"floating_xd",shortTitle:"フローティングAF",fullTitle:"2群フローティングフォーカス & 4基XDリニアモーター",badge:"02",accentColor:"#d97706",hasComparisonToggle:!1,getDynamicCaption:n=>{const e=n.getFloatingStrokes();return`ピント距離 ${n.getFocusDistanceLabel()}：A群（${e.dzA.toFixed(2)}mm）とB群（${e.dzB.toFixed(2)}mm）を4基のXDリニアモーターが約1.86:1の独立速度比で同期直動。群間隔（${e.gapAB.toFixed(1)}mm）を自在に変え、最短0.40mまで収差ゼロを維持します。`}},{id:"ed_chromatic",shortTitle:"ED色収差補正",fullTitle:"スーパーED＋フリント接合ダブレットによるRGB色消し",badge:"03",accentColor:"#059669",hasComparisonToggle:!0,toggleLabel:"スーパーED色収差補正",toggleOnText:"ON（アポクロマート）",toggleOffText:"OFF（通常ガラス比較）",getDynamicCaption:n=>n.edStrength>.5?"スーパーED（νd=94.9）凸玉と高分散フリント凹玉（νd=29.8）の逆符号分散が相殺し合い、赤(656nm)・緑(587nm)・青(486nm)の焦点ズレが 0.05mm 未満の純白一点へ収束！":"通常ガラス比較：青い光ほど強く曲がるためセンサー手前で結像し、赤い光は奥へ抜けます（軸上色ズレ 約3.5mm）。これが写真の輪郭に出る紫・緑の色滲み（パープルフリンジ）の正体です。"},{id:"xa_aspheric",shortTitle:"3×XA非球面",fullTitle:"0.01μm XA超高度非球面レンズと球面収差・玉ねぎボケ解消",badge:"04",accentColor:"#0ea5e9",hasComparisonToggle:!0,toggleLabel:"3×XA非球面補正",toggleOnText:"ON（0.01μm XA）",toggleOffText:"OFF（球面レンズ比較）",getDynamicCaption:n=>n.xaStrength>.5?"E01・E07・E14の3枚のXA非球面が周辺曲率を緩やかに連続変化させ、F1.2最外周光線まで完璧に1点へ結像。0.01μm研磨精度により玉ボケ内部の年輪（玉ねぎボケ）も完全に消滅します。":"通常球面レンズ比較：大口径F1.2の外側を通る光線ほど強く曲がりすぎて手前にズレる「球面収差」が発生！像が白く滲み、精密研磨不足の非球面では玉ボケに年輪模様が現れます。"},{id:"nano_ar_baffle",shortTitle:"Nano AR II & 遮光",fullTitle:"ナノARコーティングII 波動干渉消滅 & 迷光バッフル",badge:"05",accentColor:"#6366f1",hasComparisonToggle:!0,toggleLabel:"Nano AR II 反射防止",toggleOnText:"ON（反射率 < 0.08%）",toggleOffText:"OFF（無コート 4%反射）",getDynamicCaption:n=>n.nanoArStrength>.5?"ナノ多孔質シリカ層（n≈1.22）で2つの反射光の位相を半波長（180°）ずらして波動干渉で打ち消し合い、逆光ゴーストを消滅！画角外の迷光もフード＆3:2リアバッフルが吸収します。":"無コート比較：ガラス1面あたり約4%の光が跳ね返り、14枚（26空気面）で多重反射した迷光がゴーストや白いフレアとなってセンサーへ降り注ぎ、コントラストが激減します。"}];function wu(n,e,t,i=0,s=0){const r=1/t,a=n*n,o=Math.max(.15,1-r*r*a);return e-r*a/(1+Math.sqrt(o))-i*a*a-s*a*a*a}function Cl(n,e,t=0,i=0){const s=1/e,r=n*n,a=Math.max(.15,1-s*s*r);return-(s*n)/Math.sqrt(a)-4*t*r*n-6*i*r*r*n}function Rl(n,e,t){if(e===0)return n.nd;let i=n.vd;t<1&&(n.isEd?i=n.vd*t+19*(1-t):n.isFlint&&(i=n.vd*t+65*(1-t)));const s=(n.nd-1)/i;return n.nd+e*.5*s}let ro=0,ao=0,oo=0,lo=0;function Il(n,e,t,i,s,r,a,o,l,h){let u=(s-e)/i;for(let L=0;L<5;L++){const E=n+u*t,R=e+u*i-wu(E,s,r,a,o),F=i-Cl(E,r,a,o)*t;if(Math.abs(F)<1e-6)break;u-=R/F}const d=n+u*t,p=e+u*i;let x=-Cl(d,r,a,o),v=1;const _=1/Math.sqrt(x*x+1);x*=_,v*=_;let m=-(t*x+i*v);m<0&&(x=-x,v=-v,m=-m);const M=l/h,b=1-M*M*(1-m*m),y=Math.sqrt(b>.04?b:.04),I=M*t+(M*m-y)*x,A=M*i+(M*m-y)*v,P=1/Math.sqrt(I*I+A*A);ro=d,ao=p,oo=I*P,lo=A*P}function Tu(n){const e=Math.max(0,Math.min(1,n)),t=-(6.85*e-1.35*e*e),i=-(3.45*e-.49*e*e),s=66.5+t-(60.75+i);return{dzA:t,dzB:i,gapAB:s}}function Au(n,e){const t=Math.max(1.2,Math.min(16,n)),i=21.6*(1.2/t),s=Math.max(0,Math.min(1,Math.log2(t/1.2)/Math.log2(16/1.2))),r=50/t,a=e<.01?2e3:1e3/(e*2.5),l=2*t*.03*a*a/2500,h=Math.min(1,1.2/t*(.42+.58*e));return{fNumber:t,irisRadiusMm:i,closure01:s,entrancePupilMm:r,dofMm:l,bokehScale01:h}}function Rs(n){let e=n.yStart,t=n.zStart;const i=Math.hypot(n.dyStart,n.dzStart);let s=n.dyStart/i,r=n.dzStart/i,a=1;const o=[{z:t,y:e}];let l=0,h=!1;for(let x=0;x<ha.length;x++){if(x===5){const L=(ca-t)/r;if(l=e+L*s,o.push({z:ca,y:l}),Math.abs(l)>n.irisRadiusMm+.12&&(h=!0,n.stopAtIrisIfClipped))return{points:o,color:n.color,hexColor:n.hexColor,lambdaShift:n.lambdaShift,clippedAtIris:!0,yIris:l,ySensor:l,zFocus:ca,craDeg:0,rayRole:n.rayRole,opacity:(n.opacity??.85)*.25,width:n.width??1.4}}const v=ha[x],_=v.focusGroup==="A"?n.dzA:v.focusGroup==="B"?n.dzB:0,m=v.z+_,M=m+v.thick*.5,b=m-v.thick*.5,y=Rl(v,n.lambdaShift,n.edStrength),I=v.isXa?v.a4F*n.xaStrength:0,A=v.isXa?v.a6F*n.xaStrength:0;Il(e,t,s,r,M,v.rF,I,A,a,y),e=ro,t=ao,s=oo,r=lo,o.push({z:t,y:e});const P=v.cementedToNext?Rl(ha[x+1],n.lambdaShift,n.edStrength):1;Il(e,t,s,r,b,v.rR,0,0,y,P),e=ro,t=ao,s=oo,r=lo,o.push({z:t,y:e}),a=P}const u=(Al-t)/r,d=e+u*s;o.push({z:Al,y:d});const p=Math.abs(s)>1e-5?t-e/s*r:-999,f=Math.atan2(Math.abs(s),Math.abs(r))*180/Math.PI;return{points:o,color:n.color,hexColor:n.hexColor,lambdaShift:n.lambdaShift,clippedAtIris:h,yIris:l,ySensor:d,zFocus:p,craDeg:f,rayRole:n.rayRole,opacity:n.opacity??.85,width:n.width??1.6}}function Pu(n,e,t,i=136){if(Math.abs(n)<.05)return 0;const s=n*Math.PI/180,r=-Math.sin(s),a=-Math.cos(s);let o=n*.96;for(let l=0;l<5;l++){const h=Rs({yStart:o,zStart:i,dyStart:r,dzStart:a,lambdaShift:0,xaStrength:1,edStrength:1,dzA:e,dzB:t,irisRadiusMm:40,stopAtIrisIfClipped:!1,color:"#0284c7",hexColor:165063,rayRole:"chief"}),d=(Rs({yStart:o+.5,zStart:i,dyStart:r,dzStart:a,lambdaShift:0,xaStrength:1,edStrength:1,dzA:e,dzB:t,irisRadiusMm:40,stopAtIrisIfClipped:!1,color:"#0284c7",hexColor:165063,rayRole:"chief"}).yIris-h.yIris)/.5;Math.abs(d)>1e-4&&(o-=h.yIris/d)}return o}class Cu{studioOpen=!1;autoPlay=!0;scenario="aperture_bokeh";hoveredElementId=null;targetAperture=1.2;targetFocusT=0;targetFieldAngleDeg=0;targetXaStrength=1;targetEdStrength=1;targetNanoArStrength=1;aperture=1.2;focusT=0;fieldAngleDeg=0;xaStrength=1;edStrength=1;nanoArStrength=1;focusVelocityA=0;focusVelocityB=0;prevDzA=0;prevDzB=0;simTime=0;listeners=new Set;subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}notify(){this.listeners.forEach(e=>e())}setStudioOpen(e){this.studioOpen!==e&&(this.studioOpen=e,e&&this.applyScenarioDefaults(this.scenario),this.notify())}setScenario(e){this.scenario=e,this.simTime=0,this.autoPlay=!0,this.applyScenarioDefaults(e),this.notify()}applyScenarioDefaults(e){switch(e){case"aperture_bokeh":this.targetAperture=1.2,this.targetFocusT=.28,this.targetFieldAngleDeg=0,this.targetXaStrength=1,this.targetEdStrength=1,this.targetNanoArStrength=1;break;case"floating_xd":this.targetAperture=1.4,this.targetFocusT=.65,this.targetFieldAngleDeg=0,this.targetXaStrength=1,this.targetEdStrength=1,this.targetNanoArStrength=1;break;case"ed_chromatic":this.targetAperture=1.2,this.targetFocusT=0,this.targetFieldAngleDeg=0,this.targetXaStrength=1,this.targetEdStrength=1,this.targetNanoArStrength=1;break;case"xa_aspheric":this.targetAperture=1.2,this.targetFocusT=0,this.targetFieldAngleDeg=0,this.targetXaStrength=1,this.targetEdStrength=1,this.targetNanoArStrength=1;break;case"nano_ar_baffle":this.targetAperture=1.8,this.targetFocusT=.15,this.targetFieldAngleDeg=12,this.targetXaStrength=1,this.targetEdStrength=1,this.targetNanoArStrength=1;break}}setManualAperture(e){this.autoPlay=!1,this.targetAperture=Math.max(1.2,Math.min(16,e)),this.notify()}setManualFocusT(e){this.autoPlay=!1,this.targetFocusT=Math.max(0,Math.min(1,e)),this.notify()}setManualFieldAngle(e){this.autoPlay=!1,this.targetFieldAngleDeg=Math.max(-19,Math.min(19,e)),this.notify()}toggleComparison(){this.autoPlay=!1,this.scenario==="ed_chromatic"?this.targetEdStrength=this.targetEdStrength>.5?0:1:this.scenario==="xa_aspheric"?this.targetXaStrength=this.targetXaStrength>.5?0:1:this.scenario==="nano_ar_baffle"&&(this.targetNanoArStrength=this.targetNanoArStrength>.5?0:1),this.notify()}setAutoPlay(e){this.autoPlay=e,this.notify()}setHoveredElement(e){this.hoveredElementId!==e&&(this.hoveredElementId=e,this.notify())}step(e,t,i){const s=Math.min(.05,Math.max(.001,t||.016));if(this.studioOpen){if(this.autoPlay){this.simTime+=s;const l=this.simTime;if(this.scenario==="aperture_bokeh"){const h=.5-.5*Math.cos(l*.78);this.targetAperture=1.2*Math.pow(11/1.2,h),this.targetFocusT=.18+.14*(.5-.5*Math.cos(l*.42)),this.targetFieldAngleDeg=Math.sin(l*.38)*7.5}else if(this.scenario==="floating_xd"){const h=.5-.5*Math.cos(l*.92);this.targetFocusT=h,this.targetAperture=1.25,this.targetFieldAngleDeg=0}else if(this.scenario==="ed_chromatic"){const h=Math.sin(l*.95);this.targetEdStrength=h>-.15?1:0,this.targetAperture=1.2,this.targetFocusT=0,this.targetFieldAngleDeg=0}else if(this.scenario==="xa_aspheric"){const h=Math.sin(l*.92);this.targetXaStrength=h>-.15?1:0,this.targetAperture=1.2,this.targetFocusT=0,this.targetFieldAngleDeg=0}else if(this.scenario==="nano_ar_baffle"){const h=Math.sin(l*.85);this.targetNanoArStrength=h>-.15?1:0,this.targetFieldAngleDeg=6+9*(.5+.5*Math.sin(l*.65)),this.targetAperture=1.6,this.targetFocusT=.12}}}else if(i){const l=.5-.5*Math.cos(e*1.15);this.targetAperture=1.2*Math.pow(11/1.2,l),this.targetFocusT=.5-.5*Math.cos(e*1.45),this.targetFieldAngleDeg=0,this.targetXaStrength=1,this.targetEdStrength=1,this.targetNanoArStrength=1}else this.targetAperture=1.2,this.targetFocusT=0,this.targetFieldAngleDeg=0,this.targetXaStrength=1,this.targetEdStrength=1,this.targetNanoArStrength=1;const r=1-Math.exp(-s*9.5),a=1-Math.exp(-s*6.5);this.aperture+=(this.targetAperture-this.aperture)*r,this.focusT+=(this.targetFocusT-this.focusT)*r,this.fieldAngleDeg+=(this.targetFieldAngleDeg-this.fieldAngleDeg)*r,this.xaStrength+=(this.targetXaStrength-this.xaStrength)*a,this.edStrength+=(this.targetEdStrength-this.edStrength)*a,this.nanoArStrength+=(this.targetNanoArStrength-this.nanoArStrength)*a;const o=this.getFloatingStrokes();this.focusVelocityA=(o.dzA-this.prevDzA)/s,this.focusVelocityB=(o.dzB-this.prevDzB)/s,this.prevDzA=o.dzA,this.prevDzB=o.dzB}getFloatingStrokes(){return Tu(this.focusT)}getIrisMetrics(){return Au(this.aperture,this.focusT)}getFocusDistanceLabel(){if(this.focusT<.025)return"∞（無限遠）";const e=1/(this.focusT*2.5);return e>=10?"∞（遠景）":`${e.toFixed(2)} m`}getScenarioDescriptor(){return Pl.find(e=>e.id===this.scenario)??Pl[0]}cachedBundleKey="";cachedBundleRays=[];traceActiveBundle(e=136){const t=`${e}|${this.scenario}|${this.aperture.toFixed(5)}|${this.focusT.toFixed(5)}|${this.fieldAngleDeg.toFixed(4)}|${this.xaStrength.toFixed(4)}|${this.edStrength.toFixed(4)}|${this.nanoArStrength.toFixed(4)}`;if(t===this.cachedBundleKey)return this.cachedBundleRays;const i=this.getFloatingStrokes(),s=this.getIrisMetrics(),r=[];this.cachedBundleKey=t,this.cachedBundleRays=r;const a=this.focusT*2.5,o=(d,p,f)=>{const x=a>.001?Math.atan((d-p)*a/1e3):0,v=-f+x;return{dy:Math.sin(v),dz:-Math.cos(v)}},l=this.fieldAngleDeg*Math.PI/180,h=Pu(this.fieldAngleDeg,i.dzA,i.dzB,e);if(this.scenario==="ed_chromatic"){const d=[-19.2,-11.5,0,11.5,19.2],p=[{shift:-1,color:"#ef4444",hex:15680580,role:"rgb_r"},{shift:0,color:"#10b981",hex:1096065,role:"rgb_g"},{shift:1,color:"#2563eb",hex:2450411,role:"rgb_b"}];for(const f of d){const x=h+f,v=o(x,h,l);for(const _ of p)f===0&&_.shift!==0||r.push(Rs({yStart:x,zStart:e,dyStart:v.dy,dzStart:v.dz,lambdaShift:_.shift,xaStrength:this.xaStrength,edStrength:this.edStrength,dzA:i.dzA,dzB:i.dzB,irisRadiusMm:s.irisRadiusMm,stopAtIrisIfClipped:!0,color:_.color,hexColor:_.hex,rayRole:_.role,opacity:f===0?.65:.84,width:f===0?1.2:1.75}))}return r}if(this.scenario==="xa_aspheric"){const d=[-20.6,-17.5,-13.5,-7.5,0,7.5,13.5,17.5,20.6];for(const p of d){const x=Math.abs(p)>=13,v=this.xaStrength<.5&&x?"#e11d48":x?"#0284c7":"#0d9488",_=this.xaStrength<.5&&x?14753096:x?165063:889992,m=h+p,M=o(m,h,l);r.push(Rs({yStart:m,zStart:e,dyStart:M.dy,dzStart:M.dz,lambdaShift:0,xaStrength:this.xaStrength,edStrength:1,dzA:i.dzA,dzB:i.dzB,irisRadiusMm:s.irisRadiusMm,stopAtIrisIfClipped:!0,color:p===0?"#f59e0b":v,hexColor:p===0?16096779:_,rayRole:p===0?"chief":x?"marginal":"paraxial",opacity:p===0?.72:.88,width:x?1.9:1.5}))}return r}const u=[-20.4,-15.5,-10.5,-5.2,0,5.2,10.5,15.5,20.4];for(const d of u){const p=h+d,f=o(p,h,l),x=d===0,v=Math.abs(d)>=15,_=x?"#f59e0b":(this.scenario==="floating_xd",v?"#0284c7":"#0ea5e9"),m=x?16096779:v?165063:959977;r.push(Rs({yStart:p,zStart:e,dyStart:f.dy,dzStart:f.dz,lambdaShift:0,xaStrength:this.xaStrength,edStrength:this.edStrength,dzA:i.dzA,dzB:i.dzB,irisRadiusMm:s.irisRadiusMm,stopAtIrisIfClipped:!0,color:_,hexColor:m,rayRole:x?"chief":v?"marginal":"paraxial",opacity:x?.82:.85,width:x?1.7:1.65}))}if(this.scenario==="nano_ar_baffle"){const d=1-this.nanoArStrength*.94;r.push({points:[{z:e,y:26},{z:108.5,y:18},{z:95.8,y:11},{z:105.5,y:2.5},{z:82,y:-6.5},{z:42,y:-11.5},{z:0,y:-14.2}],color:"#ef4444",hexColor:15680580,lambdaShift:0,clippedAtIris:!1,yIris:-6.5,ySensor:-14.2,zFocus:0,craDeg:8,rayRole:"ghost",opacity:d*.88,width:1.85}),r.push({points:[{z:e,y:-23},{z:108.5,y:-14},{z:71,y:-7.5},{z:87.4,y:3.5},{z:42,y:9.8},{z:0,y:12.6}],color:"#f97316",hexColor:16347926,lambdaShift:0,clippedAtIris:!1,yIris:0,ySensor:12.6,zFocus:0,craDeg:7,rayRole:"ghost",opacity:d*.78,width:1.6}),r.push({points:[{z:e,y:36.5},{z:124,y:31.2}],color:"#94a3b8",hexColor:9741240,lambdaShift:0,clippedAtIris:!0,yIris:31,ySensor:31,zFocus:124,craDeg:0,rayRole:"stray",opacity:.65,width:1.35}),r.push({points:[{z:e,y:-33},{z:108.5,y:-26},{z:82,y:-18.8},{z:38.2,y:-15.6}],color:"#94a3b8",hexColor:9741240,lambdaShift:0,clippedAtIris:!0,yIris:-18.8,ySensor:-15.6,zFocus:38.2,craDeg:0,rayRole:"stray",opacity:.65,width:1.35})}return r}}const mi=new Cu;/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const tl="174",es={ROTATE:0,DOLLY:1,PAN:2},jn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ru=0,Ll=1,Iu=2,xh=1,vh=2,Ri=3,$t=0,Gt=1,Ht=2,Zi=0,ts=1,Dl=2,Ul=3,Fl=4,Lu=5,_n=100,Du=101,Uu=102,Fu=103,Nu=104,Ou=200,Bu=201,Vu=202,zu=203,co=204,ho=205,ku=206,Hu=207,Gu=208,Wu=209,Xu=210,qu=211,Yu=212,$u=213,Ku=214,uo=0,fo=1,po=2,os=3,mo=4,go=5,_o=6,xo=7,jr=0,Zu=1,ju=2,ji=0,Ju=1,Qu=2,ed=3,yh=4,td=5,id=6,nd=7,Mh=300,ls=301,cs=302,Fs=303,vo=304,Jr=306,En=1e3,yn=1001,yo=1002,Bt=1003,sd=1004,$s=1005,gt=1006,ua=1007,Di=1008,Ni=1009,bh=1010,Sh=1011,Ns=1012,il=1013,Ji=1014,Kt=1015,Hs=1016,nl=1017,sl=1018,hs=1020,Eh=35902,wh=1021,Th=1022,bt=1023,Ah=1024,Ph=1025,is=1026,us=1027,rl=1028,Qr=1029,Ch=1030,al=1031,ol=1033,Or=33776,Br=33777,Vr=33778,zr=33779,Mo=35840,bo=35841,So=35842,Eo=35843,wo=36196,To=37492,Ao=37496,Po=37808,Co=37809,Ro=37810,Io=37811,Lo=37812,Do=37813,Uo=37814,Fo=37815,No=37816,Oo=37817,Bo=37818,Vo=37819,zo=37820,ko=37821,kr=36492,Ho=36494,Go=36495,Rh=36283,Wo=36284,Xo=36285,qo=36286,rd=3200,ad=3201,Gs=0,od=1,Yi="",Mt="srgb",ds="srgb-linear",Wr="linear",at="srgb",In=7680,Nl=519,ld=512,cd=513,hd=514,Ih=515,ud=516,dd=517,fd=518,pd=519,Ol=35044,Ux=35048,Bl="300 es",Ui=2e3,Xr=2001;class Pn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Lt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Vl=1234567;const ns=Math.PI/180,Os=180/Math.PI;function Cn(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Lt[n&255]+Lt[n>>8&255]+Lt[n>>16&255]+Lt[n>>24&255]+"-"+Lt[e&255]+Lt[e>>8&255]+"-"+Lt[e>>16&15|64]+Lt[e>>24&255]+"-"+Lt[t&63|128]+Lt[t>>8&255]+"-"+Lt[t>>16&255]+Lt[t>>24&255]+Lt[i&255]+Lt[i>>8&255]+Lt[i>>16&255]+Lt[i>>24&255]).toLowerCase()}function Xe(n,e,t){return Math.max(e,Math.min(t,n))}function ll(n,e){return(n%e+e)%e}function md(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function gd(n,e,t){return n!==e?(t-n)/(e-n):0}function Is(n,e,t){return(1-t)*n+t*e}function _d(n,e,t,i){return Is(n,e,1-Math.exp(-t*i))}function xd(n,e=1){return e-Math.abs(ll(n,e*2)-e)}function vd(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function yd(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Md(n,e){return n+Math.floor(Math.random()*(e-n+1))}function bd(n,e){return n+Math.random()*(e-n)}function Sd(n){return n*(.5-Math.random())}function Ed(n){n!==void 0&&(Vl=n);let e=Vl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function wd(n){return n*ns}function Td(n){return n*Os}function Ad(n){return(n&n-1)===0&&n!==0}function Pd(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Cd(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Rd(n,e,t,i,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),h=r((e+i)/2),u=a((e+i)/2),d=r((e-i)/2),p=a((e-i)/2),f=r((i-e)/2),x=a((i-e)/2);switch(s){case"XYX":n.set(o*u,l*d,l*p,o*h);break;case"YZY":n.set(l*p,o*u,l*d,o*h);break;case"ZXZ":n.set(l*d,l*p,o*u,o*h);break;case"XZX":n.set(o*u,l*x,l*f,o*h);break;case"YXY":n.set(l*f,o*u,l*x,o*h);break;case"ZYZ":n.set(l*x,l*f,o*u,o*h);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Zn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Nt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const As={DEG2RAD:ns,RAD2DEG:Os,generateUUID:Cn,clamp:Xe,euclideanModulo:ll,mapLinear:md,inverseLerp:gd,lerp:Is,damp:_d,pingpong:xd,smoothstep:vd,smootherstep:yd,randInt:Md,randFloat:bd,randFloatSpread:Sd,seededRandom:Ed,degToRad:wd,radToDeg:Td,isPowerOfTwo:Ad,ceilPowerOfTwo:Pd,floorPowerOfTwo:Cd,setQuaternionFromProperEuler:Rd,normalize:Nt,denormalize:Zn};class ue{constructor(e=0,t=0){ue.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Xe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ye{constructor(e,t,i,s,r,a,o,l,h){Ye.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,h)}set(e,t,i,s,r,a,o,l,h){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],h=i[1],u=i[4],d=i[7],p=i[2],f=i[5],x=i[8],v=s[0],_=s[3],m=s[6],M=s[1],b=s[4],y=s[7],I=s[2],A=s[5],P=s[8];return r[0]=a*v+o*M+l*I,r[3]=a*_+o*b+l*A,r[6]=a*m+o*y+l*P,r[1]=h*v+u*M+d*I,r[4]=h*_+u*b+d*A,r[7]=h*m+u*y+d*P,r[2]=p*v+f*M+x*I,r[5]=p*_+f*b+x*A,r[8]=p*m+f*y+x*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],h=e[7],u=e[8];return t*a*u-t*o*h-i*r*u+i*o*l+s*r*h-s*a*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],h=e[7],u=e[8],d=u*a-o*h,p=o*l-u*r,f=h*r-a*l,x=t*d+i*p+s*f;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/x;return e[0]=d*v,e[1]=(s*h-u*i)*v,e[2]=(o*i-s*a)*v,e[3]=p*v,e[4]=(u*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=f*v,e[7]=(i*l-h*t)*v,e[8]=(a*t-i*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const l=Math.cos(r),h=Math.sin(r);return this.set(i*l,i*h,-i*(l*a+h*o)+a+e,-s*h,s*l,-s*(-h*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(da.makeScale(e,t)),this}rotate(e){return this.premultiply(da.makeRotation(-e)),this}translate(e,t){return this.premultiply(da.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const da=new Ye;function Lh(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function qr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Id(){const n=qr("canvas");return n.style.display="block",n}const zl={};function mn(n){n in zl||(zl[n]=!0,console.warn(n))}function Ld(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}function Dd(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Ud(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const kl=new Ye().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Hl=new Ye().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Fd(){const n={enabled:!0,workingColorSpace:ds,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===at&&(s.r=Fi(s.r),s.g=Fi(s.g),s.b=Fi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===at&&(s.r=ss(s.r),s.g=ss(s.g),s.b=ss(s.b))),s},fromWorkingColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},toWorkingColorSpace:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Yi?Wr:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ds]:{primaries:e,whitePoint:i,transfer:Wr,toXYZ:kl,fromXYZ:Hl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Mt},outputColorSpaceConfig:{drawingBufferColorSpace:Mt}},[Mt]:{primaries:e,whitePoint:i,transfer:at,toXYZ:kl,fromXYZ:Hl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Mt}}}),n}const et=Fd();function Fi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ss(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ln;class Nd{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ln===void 0&&(Ln=qr("canvas")),Ln.width=e.width,Ln.height=e.height;const i=Ln.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Ln}return t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=qr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Fi(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Fi(t[i]/255)*255):t[i]=Fi(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Od=0;class cl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Od++}),this.uuid=Cn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(fa(s[a].image)):r.push(fa(s[a]))}else r=fa(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function fa(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Nd.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Bd=0;class Rt extends Pn{constructor(e=Rt.DEFAULT_IMAGE,t=Rt.DEFAULT_MAPPING,i=yn,s=yn,r=gt,a=Di,o=bt,l=Ni,h=Rt.DEFAULT_ANISOTROPY,u=Yi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bd++}),this.uuid=Cn(),this.name="",this.source=new cl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=h,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ue(0,0),this.repeat=new ue(1,1),this.center=new ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Mh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case En:e.x=e.x-Math.floor(e.x);break;case yn:e.x=e.x<0?0:1;break;case yo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case En:e.y=e.y-Math.floor(e.y);break;case yn:e.y=e.y<0?0:1;break;case yo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Rt.DEFAULT_IMAGE=null;Rt.DEFAULT_MAPPING=Mh;Rt.DEFAULT_ANISOTROPY=1;class _t{constructor(e=0,t=0,i=0,s=1){_t.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,h=l[0],u=l[4],d=l[8],p=l[1],f=l[5],x=l[9],v=l[2],_=l[6],m=l[10];if(Math.abs(u-p)<.01&&Math.abs(d-v)<.01&&Math.abs(x-_)<.01){if(Math.abs(u+p)<.1&&Math.abs(d+v)<.1&&Math.abs(x+_)<.1&&Math.abs(h+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(h+1)/2,y=(f+1)/2,I=(m+1)/2,A=(u+p)/4,P=(d+v)/4,L=(x+_)/4;return b>y&&b>I?b<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(b),s=A/i,r=P/i):y>I?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=A/s,r=L/s):I<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(I),i=P/r,s=L/r),this.set(i,s,r,t),this}let M=Math.sqrt((_-x)*(_-x)+(d-v)*(d-v)+(p-u)*(p-u));return Math.abs(M)<.001&&(M=1),this.x=(_-x)/M,this.y=(d-v)/M,this.z=(p-u)/M,this.w=Math.acos((h+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this.w=Xe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this.w=Xe(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Vd extends Pn{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new _t(0,0,e,t),this.scissorTest=!1,this.viewport=new _t(0,0,e,t);const s={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:gt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new Rt(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new cl(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class wn extends Vd{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Dh extends Rt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Bt,this.minFilter=Bt,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class zd extends Rt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Bt,this.minFilter=Bt,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Qi{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],h=i[s+1],u=i[s+2],d=i[s+3];const p=r[a+0],f=r[a+1],x=r[a+2],v=r[a+3];if(o===0){e[t+0]=l,e[t+1]=h,e[t+2]=u,e[t+3]=d;return}if(o===1){e[t+0]=p,e[t+1]=f,e[t+2]=x,e[t+3]=v;return}if(d!==v||l!==p||h!==f||u!==x){let _=1-o;const m=l*p+h*f+u*x+d*v,M=m>=0?1:-1,b=1-m*m;if(b>Number.EPSILON){const I=Math.sqrt(b),A=Math.atan2(I,m*M);_=Math.sin(_*A)/I,o=Math.sin(o*A)/I}const y=o*M;if(l=l*_+p*y,h=h*_+f*y,u=u*_+x*y,d=d*_+v*y,_===1-o){const I=1/Math.sqrt(l*l+h*h+u*u+d*d);l*=I,h*=I,u*=I,d*=I}}e[t]=l,e[t+1]=h,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],l=i[s+1],h=i[s+2],u=i[s+3],d=r[a],p=r[a+1],f=r[a+2],x=r[a+3];return e[t]=o*x+u*d+l*f-h*p,e[t+1]=l*x+u*p+h*d-o*f,e[t+2]=h*x+u*f+o*p-l*d,e[t+3]=u*x-o*d-l*p-h*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,h=o(i/2),u=o(s/2),d=o(r/2),p=l(i/2),f=l(s/2),x=l(r/2);switch(a){case"XYZ":this._x=p*u*d+h*f*x,this._y=h*f*d-p*u*x,this._z=h*u*x+p*f*d,this._w=h*u*d-p*f*x;break;case"YXZ":this._x=p*u*d+h*f*x,this._y=h*f*d-p*u*x,this._z=h*u*x-p*f*d,this._w=h*u*d+p*f*x;break;case"ZXY":this._x=p*u*d-h*f*x,this._y=h*f*d+p*u*x,this._z=h*u*x+p*f*d,this._w=h*u*d-p*f*x;break;case"ZYX":this._x=p*u*d-h*f*x,this._y=h*f*d+p*u*x,this._z=h*u*x-p*f*d,this._w=h*u*d+p*f*x;break;case"YZX":this._x=p*u*d+h*f*x,this._y=h*f*d+p*u*x,this._z=h*u*x-p*f*d,this._w=h*u*d-p*f*x;break;case"XZY":this._x=p*u*d-h*f*x,this._y=h*f*d-p*u*x,this._z=h*u*x+p*f*d,this._w=h*u*d+p*f*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],h=t[2],u=t[6],d=t[10],p=i+o+d;if(p>0){const f=.5/Math.sqrt(p+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-h)*f,this._z=(a-s)*f}else if(i>o&&i>d){const f=2*Math.sqrt(1+i-o-d);this._w=(u-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+h)/f}else if(o>d){const f=2*Math.sqrt(1+o-i-d);this._w=(r-h)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+d-i-o);this._w=(a-s)/f,this._x=(r+h)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xe(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,h=t._z,u=t._w;return this._x=i*u+a*o+s*h-r*l,this._y=s*u+a*l+r*o-i*h,this._z=r*u+a*h+i*l-s*o,this._w=a*u-i*o-s*l-r*h,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+i*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*i+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const h=Math.sqrt(l),u=Math.atan2(h,o),d=Math.sin((1-t)*u)/h,p=Math.sin(t*u)/h;return this._w=a*d+this._w*p,this._x=i*d+this._x*p,this._y=s*d+this._y*p,this._z=r*d+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class T{constructor(e=0,t=0,i=0){T.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Gl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Gl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,h=2*(a*s-o*i),u=2*(o*t-r*s),d=2*(r*i-a*t);return this.x=t+l*h+a*d-o*u,this.y=i+l*u+o*h-r*d,this.z=s+l*d+r*u-a*h,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return pa.copy(this).projectOnVector(e),this.sub(pa)}reflect(e){return this.sub(pa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Xe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const pa=new T,Gl=new Qi;class Zt{constructor(e=new T(1/0,1/0,1/0),t=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(li.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(li.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=li.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,li):li.fromBufferAttribute(r,a),li.applyMatrix4(e.matrixWorld),this.expandByPoint(li);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ks.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ks.copy(i.boundingBox)),Ks.applyMatrix4(e.matrixWorld),this.union(Ks)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,li),li.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(_s),Zs.subVectors(this.max,_s),Dn.subVectors(e.a,_s),Un.subVectors(e.b,_s),Fn.subVectors(e.c,_s),Oi.subVectors(Un,Dn),Bi.subVectors(Fn,Un),sn.subVectors(Dn,Fn);let t=[0,-Oi.z,Oi.y,0,-Bi.z,Bi.y,0,-sn.z,sn.y,Oi.z,0,-Oi.x,Bi.z,0,-Bi.x,sn.z,0,-sn.x,-Oi.y,Oi.x,0,-Bi.y,Bi.x,0,-sn.y,sn.x,0];return!ma(t,Dn,Un,Fn,Zs)||(t=[1,0,0,0,1,0,0,0,1],!ma(t,Dn,Un,Fn,Zs))?!1:(js.crossVectors(Oi,Bi),t=[js.x,js.y,js.z],ma(t,Dn,Un,Fn,Zs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,li).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(li).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ei[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ei[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ei[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ei[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ei[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ei[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ei[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ei[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ei),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ei=[new T,new T,new T,new T,new T,new T,new T,new T],li=new T,Ks=new Zt,Dn=new T,Un=new T,Fn=new T,Oi=new T,Bi=new T,sn=new T,_s=new T,Zs=new T,js=new T,rn=new T;function ma(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){rn.fromArray(n,r);const o=s.x*Math.abs(rn.x)+s.y*Math.abs(rn.y)+s.z*Math.abs(rn.z),l=e.dot(rn),h=t.dot(rn),u=i.dot(rn);if(Math.max(-Math.max(l,h,u),Math.min(l,h,u))>o)return!1}return!0}const kd=new Zt,xs=new T,ga=new T;class di{constructor(e=new T,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):kd.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;xs.subVectors(e,this.center);const t=xs.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(xs,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ga.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(xs.copy(e.center).add(ga)),this.expandByPoint(xs.copy(e.center).sub(ga))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const wi=new T,_a=new T,Js=new T,Vi=new T,xa=new T,Qs=new T,va=new T;class ea{constructor(e=new T,t=new T(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,wi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=wi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(wi.copy(this.origin).addScaledVector(this.direction,t),wi.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){_a.copy(e).add(t).multiplyScalar(.5),Js.copy(t).sub(e).normalize(),Vi.copy(this.origin).sub(_a);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Js),o=Vi.dot(this.direction),l=-Vi.dot(Js),h=Vi.lengthSq(),u=Math.abs(1-a*a);let d,p,f,x;if(u>0)if(d=a*l-o,p=a*o-l,x=r*u,d>=0)if(p>=-x)if(p<=x){const v=1/u;d*=v,p*=v,f=d*(d+a*p+2*o)+p*(a*d+p+2*l)+h}else p=r,d=Math.max(0,-(a*p+o)),f=-d*d+p*(p+2*l)+h;else p=-r,d=Math.max(0,-(a*p+o)),f=-d*d+p*(p+2*l)+h;else p<=-x?(d=Math.max(0,-(-a*r+o)),p=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+p*(p+2*l)+h):p<=x?(d=0,p=Math.min(Math.max(-r,-l),r),f=p*(p+2*l)+h):(d=Math.max(0,-(a*r+o)),p=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+p*(p+2*l)+h);else p=a>0?-r:r,d=Math.max(0,-(a*p+o)),f=-d*d+p*(p+2*l)+h;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(_a).addScaledVector(Js,p),f}intersectSphere(e,t){wi.subVectors(e.center,this.origin);const i=wi.dot(this.direction),s=wi.dot(wi)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l;const h=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,p=this.origin;return h>=0?(i=(e.min.x-p.x)*h,s=(e.max.x-p.x)*h):(i=(e.max.x-p.x)*h,s=(e.min.x-p.x)*h),u>=0?(r=(e.min.y-p.y)*u,a=(e.max.y-p.y)*u):(r=(e.max.y-p.y)*u,a=(e.min.y-p.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-p.z)*d,l=(e.max.z-p.z)*d):(o=(e.max.z-p.z)*d,l=(e.min.z-p.z)*d),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,wi)!==null}intersectTriangle(e,t,i,s,r){xa.subVectors(t,e),Qs.subVectors(i,e),va.crossVectors(xa,Qs);let a=this.direction.dot(va),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Vi.subVectors(this.origin,e);const l=o*this.direction.dot(Qs.crossVectors(Vi,Qs));if(l<0)return null;const h=o*this.direction.dot(xa.cross(Vi));if(h<0||l+h>a)return null;const u=-o*Vi.dot(va);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class st{constructor(e,t,i,s,r,a,o,l,h,u,d,p,f,x,v,_){st.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,h,u,d,p,f,x,v,_)}set(e,t,i,s,r,a,o,l,h,u,d,p,f,x,v,_){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=h,m[6]=u,m[10]=d,m[14]=p,m[3]=f,m[7]=x,m[11]=v,m[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new st().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/Nn.setFromMatrixColumn(e,0).length(),r=1/Nn.setFromMatrixColumn(e,1).length(),a=1/Nn.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),h=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const p=a*u,f=a*d,x=o*u,v=o*d;t[0]=l*u,t[4]=-l*d,t[8]=h,t[1]=f+x*h,t[5]=p-v*h,t[9]=-o*l,t[2]=v-p*h,t[6]=x+f*h,t[10]=a*l}else if(e.order==="YXZ"){const p=l*u,f=l*d,x=h*u,v=h*d;t[0]=p+v*o,t[4]=x*o-f,t[8]=a*h,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=f*o-x,t[6]=v+p*o,t[10]=a*l}else if(e.order==="ZXY"){const p=l*u,f=l*d,x=h*u,v=h*d;t[0]=p-v*o,t[4]=-a*d,t[8]=x+f*o,t[1]=f+x*o,t[5]=a*u,t[9]=v-p*o,t[2]=-a*h,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const p=a*u,f=a*d,x=o*u,v=o*d;t[0]=l*u,t[4]=x*h-f,t[8]=p*h+v,t[1]=l*d,t[5]=v*h+p,t[9]=f*h-x,t[2]=-h,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const p=a*l,f=a*h,x=o*l,v=o*h;t[0]=l*u,t[4]=v-p*d,t[8]=x*d+f,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-h*u,t[6]=f*d+x,t[10]=p-v*d}else if(e.order==="XZY"){const p=a*l,f=a*h,x=o*l,v=o*h;t[0]=l*u,t[4]=-d,t[8]=h*u,t[1]=p*d+v,t[5]=a*u,t[9]=f*d-x,t[2]=x*d-f,t[6]=o*u,t[10]=v*d+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Hd,e,Gd)}lookAt(e,t,i){const s=this.elements;return Xt.subVectors(e,t),Xt.lengthSq()===0&&(Xt.z=1),Xt.normalize(),zi.crossVectors(i,Xt),zi.lengthSq()===0&&(Math.abs(i.z)===1?Xt.x+=1e-4:Xt.z+=1e-4,Xt.normalize(),zi.crossVectors(i,Xt)),zi.normalize(),er.crossVectors(Xt,zi),s[0]=zi.x,s[4]=er.x,s[8]=Xt.x,s[1]=zi.y,s[5]=er.y,s[9]=Xt.y,s[2]=zi.z,s[6]=er.z,s[10]=Xt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],h=i[12],u=i[1],d=i[5],p=i[9],f=i[13],x=i[2],v=i[6],_=i[10],m=i[14],M=i[3],b=i[7],y=i[11],I=i[15],A=s[0],P=s[4],L=s[8],E=s[12],S=s[1],R=s[5],F=s[9],O=s[13],V=s[2],K=s[6],z=s[10],q=s[14],N=s[3],k=s[7],j=s[11],ie=s[15];return r[0]=a*A+o*S+l*V+h*N,r[4]=a*P+o*R+l*K+h*k,r[8]=a*L+o*F+l*z+h*j,r[12]=a*E+o*O+l*q+h*ie,r[1]=u*A+d*S+p*V+f*N,r[5]=u*P+d*R+p*K+f*k,r[9]=u*L+d*F+p*z+f*j,r[13]=u*E+d*O+p*q+f*ie,r[2]=x*A+v*S+_*V+m*N,r[6]=x*P+v*R+_*K+m*k,r[10]=x*L+v*F+_*z+m*j,r[14]=x*E+v*O+_*q+m*ie,r[3]=M*A+b*S+y*V+I*N,r[7]=M*P+b*R+y*K+I*k,r[11]=M*L+b*F+y*z+I*j,r[15]=M*E+b*O+y*q+I*ie,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],h=e[13],u=e[2],d=e[6],p=e[10],f=e[14],x=e[3],v=e[7],_=e[11],m=e[15];return x*(+r*l*d-s*h*d-r*o*p+i*h*p+s*o*f-i*l*f)+v*(+t*l*f-t*h*p+r*a*p-s*a*f+s*h*u-r*l*u)+_*(+t*h*d-t*o*f-r*a*d+i*a*f+r*o*u-i*h*u)+m*(-s*o*u-t*l*d+t*o*p+s*a*d-i*a*p+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],h=e[7],u=e[8],d=e[9],p=e[10],f=e[11],x=e[12],v=e[13],_=e[14],m=e[15],M=d*_*h-v*p*h+v*l*f-o*_*f-d*l*m+o*p*m,b=x*p*h-u*_*h-x*l*f+a*_*f+u*l*m-a*p*m,y=u*v*h-x*d*h+x*o*f-a*v*f-u*o*m+a*d*m,I=x*d*l-u*v*l-x*o*p+a*v*p+u*o*_-a*d*_,A=t*M+i*b+s*y+r*I;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/A;return e[0]=M*P,e[1]=(v*p*r-d*_*r-v*s*f+i*_*f+d*s*m-i*p*m)*P,e[2]=(o*_*r-v*l*r+v*s*h-i*_*h-o*s*m+i*l*m)*P,e[3]=(d*l*r-o*p*r-d*s*h+i*p*h+o*s*f-i*l*f)*P,e[4]=b*P,e[5]=(u*_*r-x*p*r+x*s*f-t*_*f-u*s*m+t*p*m)*P,e[6]=(x*l*r-a*_*r-x*s*h+t*_*h+a*s*m-t*l*m)*P,e[7]=(a*p*r-u*l*r+u*s*h-t*p*h-a*s*f+t*l*f)*P,e[8]=y*P,e[9]=(x*d*r-u*v*r-x*i*f+t*v*f+u*i*m-t*d*m)*P,e[10]=(a*v*r-x*o*r+x*i*h-t*v*h-a*i*m+t*o*m)*P,e[11]=(u*o*r-a*d*r-u*i*h+t*d*h+a*i*f-t*o*f)*P,e[12]=I*P,e[13]=(u*v*s-x*d*s+x*i*p-t*v*p-u*i*_+t*d*_)*P,e[14]=(x*o*s-a*v*s-x*i*l+t*v*l+a*i*_-t*o*_)*P,e[15]=(a*d*s-u*o*s+u*i*l-t*d*l-a*i*p+t*o*p)*P,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,h=r*a,u=r*o;return this.set(h*a+i,h*o-s*l,h*l+s*o,0,h*o+s*l,u*o+i,u*l-s*a,0,h*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,h=r+r,u=a+a,d=o+o,p=r*h,f=r*u,x=r*d,v=a*u,_=a*d,m=o*d,M=l*h,b=l*u,y=l*d,I=i.x,A=i.y,P=i.z;return s[0]=(1-(v+m))*I,s[1]=(f+y)*I,s[2]=(x-b)*I,s[3]=0,s[4]=(f-y)*A,s[5]=(1-(p+m))*A,s[6]=(_+M)*A,s[7]=0,s[8]=(x+b)*P,s[9]=(_-M)*P,s[10]=(1-(p+v))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=Nn.set(s[0],s[1],s[2]).length();const a=Nn.set(s[4],s[5],s[6]).length(),o=Nn.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],ci.copy(this);const h=1/r,u=1/a,d=1/o;return ci.elements[0]*=h,ci.elements[1]*=h,ci.elements[2]*=h,ci.elements[4]*=u,ci.elements[5]*=u,ci.elements[6]*=u,ci.elements[8]*=d,ci.elements[9]*=d,ci.elements[10]*=d,t.setFromRotationMatrix(ci),i.x=r,i.y=a,i.z=o,this}makePerspective(e,t,i,s,r,a,o=Ui){const l=this.elements,h=2*r/(t-e),u=2*r/(i-s),d=(t+e)/(t-e),p=(i+s)/(i-s);let f,x;if(o===Ui)f=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===Xr)f=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=Ui){const l=this.elements,h=1/(t-e),u=1/(i-s),d=1/(a-r),p=(t+e)*h,f=(i+s)*u;let x,v;if(o===Ui)x=(a+r)*d,v=-2*d;else if(o===Xr)x=r*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*h,l[4]=0,l[8]=0,l[12]=-p,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Nn=new T,ci=new st,Hd=new T(0,0,0),Gd=new T(1,1,1),zi=new T,er=new T,Xt=new T,Wl=new st,Xl=new Qi;class si{constructor(e=0,t=0,i=0,s=si.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],h=s[5],u=s[9],d=s[2],p=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(p,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Xe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,h)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Xe(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,h)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Xe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(p,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,h));break;case"YZX":this._z=Math.asin(Xe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,h),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Xe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,h),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Wl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Wl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Xl.setFromEuler(this),this.setFromQuaternion(Xl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}si.DEFAULT_ORDER="XYZ";class hl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Wd=0;const ql=new T,On=new Qi,Ti=new st,tr=new T,vs=new T,Xd=new T,qd=new Qi,Yl=new T(1,0,0),$l=new T(0,1,0),Kl=new T(0,0,1),Zl={type:"added"},Yd={type:"removed"},Bn={type:"childadded",child:null},ya={type:"childremoved",child:null};class Et extends Pn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Wd++}),this.uuid=Cn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Et.DEFAULT_UP.clone();const e=new T,t=new si,i=new Qi,s=new T(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new st},normalMatrix:{value:new Ye}}),this.matrix=new st,this.matrixWorld=new st,this.matrixAutoUpdate=Et.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new hl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return On.setFromAxisAngle(e,t),this.quaternion.multiply(On),this}rotateOnWorldAxis(e,t){return On.setFromAxisAngle(e,t),this.quaternion.premultiply(On),this}rotateX(e){return this.rotateOnAxis(Yl,e)}rotateY(e){return this.rotateOnAxis($l,e)}rotateZ(e){return this.rotateOnAxis(Kl,e)}translateOnAxis(e,t){return ql.copy(e).applyQuaternion(this.quaternion),this.position.add(ql.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Yl,e)}translateY(e){return this.translateOnAxis($l,e)}translateZ(e){return this.translateOnAxis(Kl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ti.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?tr.copy(e):tr.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),vs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ti.lookAt(vs,tr,this.up):Ti.lookAt(tr,vs,this.up),this.quaternion.setFromRotationMatrix(Ti),s&&(Ti.extractRotation(s.matrixWorld),On.setFromRotationMatrix(Ti),this.quaternion.premultiply(On.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Zl),Bn.child=e,this.dispatchEvent(Bn),Bn.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Yd),ya.child=e,this.dispatchEvent(ya),ya.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ti.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ti.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ti),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Zl),Bn.child=e,this.dispatchEvent(Bn),Bn.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vs,e,Xd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vs,qd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let h=0,u=l.length;h<u;h++){const d=l[h];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,h=this.material.length;l<h;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),h=a(e.textures),u=a(e.images),d=a(e.shapes),p=a(e.skeletons),f=a(e.animations),x=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),h.length>0&&(i.textures=h),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),p.length>0&&(i.skeletons=p),f.length>0&&(i.animations=f),x.length>0&&(i.nodes=x)}return i.object=s,i;function a(o){const l=[];for(const h in o){const u=o[h];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Et.DEFAULT_UP=new T(0,1,0);Et.DEFAULT_MATRIX_AUTO_UPDATE=!0;Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const hi=new T,Ai=new T,Ma=new T,Pi=new T,Vn=new T,zn=new T,jl=new T,ba=new T,Sa=new T,Ea=new T,wa=new _t,Ta=new _t,Aa=new _t;class ni{constructor(e=new T,t=new T,i=new T){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),hi.subVectors(e,t),s.cross(hi);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){hi.subVectors(s,t),Ai.subVectors(i,t),Ma.subVectors(e,t);const a=hi.dot(hi),o=hi.dot(Ai),l=hi.dot(Ma),h=Ai.dot(Ai),u=Ai.dot(Ma),d=a*h-o*o;if(d===0)return r.set(0,0,0),null;const p=1/d,f=(h*l-o*u)*p,x=(a*u-o*l)*p;return r.set(1-f-x,x,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Pi)===null?!1:Pi.x>=0&&Pi.y>=0&&Pi.x+Pi.y<=1}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,Pi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Pi.x),l.addScaledVector(a,Pi.y),l.addScaledVector(o,Pi.z),l)}static getInterpolatedAttribute(e,t,i,s,r,a){return wa.setScalar(0),Ta.setScalar(0),Aa.setScalar(0),wa.fromBufferAttribute(e,t),Ta.fromBufferAttribute(e,i),Aa.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(wa,r.x),a.addScaledVector(Ta,r.y),a.addScaledVector(Aa,r.z),a}static isFrontFacing(e,t,i,s){return hi.subVectors(i,t),Ai.subVectors(e,t),hi.cross(Ai).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return hi.subVectors(this.c,this.b),Ai.subVectors(this.a,this.b),hi.cross(Ai).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ni.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ni.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return ni.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return ni.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ni.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;Vn.subVectors(s,i),zn.subVectors(r,i),ba.subVectors(e,i);const l=Vn.dot(ba),h=zn.dot(ba);if(l<=0&&h<=0)return t.copy(i);Sa.subVectors(e,s);const u=Vn.dot(Sa),d=zn.dot(Sa);if(u>=0&&d<=u)return t.copy(s);const p=l*d-u*h;if(p<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(Vn,a);Ea.subVectors(e,r);const f=Vn.dot(Ea),x=zn.dot(Ea);if(x>=0&&f<=x)return t.copy(r);const v=f*h-l*x;if(v<=0&&h>=0&&x<=0)return o=h/(h-x),t.copy(i).addScaledVector(zn,o);const _=u*x-f*d;if(_<=0&&d-u>=0&&f-x>=0)return jl.subVectors(r,s),o=(d-u)/(d-u+(f-x)),t.copy(s).addScaledVector(jl,o);const m=1/(_+v+p);return a=v*m,o=p*m,t.copy(i).addScaledVector(Vn,a).addScaledVector(zn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Uh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ki={h:0,s:0,l:0},ir={h:0,s:0,l:0};function Pa(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ve{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Mt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=et.workingColorSpace){return this.r=e,this.g=t,this.b=i,et.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=et.workingColorSpace){if(e=ll(e,1),t=Xe(t,0,1),i=Xe(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Pa(a,r,e+1/3),this.g=Pa(a,r,e),this.b=Pa(a,r,e-1/3)}return et.toWorkingColorSpace(this,s),this}setStyle(e,t=Mt){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Mt){const i=Uh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Fi(e.r),this.g=Fi(e.g),this.b=Fi(e.b),this}copyLinearToSRGB(e){return this.r=ss(e.r),this.g=ss(e.g),this.b=ss(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Mt){return et.fromWorkingColorSpace(Dt.copy(this),e),Math.round(Xe(Dt.r*255,0,255))*65536+Math.round(Xe(Dt.g*255,0,255))*256+Math.round(Xe(Dt.b*255,0,255))}getHexString(e=Mt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.fromWorkingColorSpace(Dt.copy(this),t);const i=Dt.r,s=Dt.g,r=Dt.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,h;const u=(o+a)/2;if(o===a)l=0,h=0;else{const d=a-o;switch(h=u<=.5?d/(a+o):d/(2-a-o),a){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return e.h=l,e.s=h,e.l=u,e}getRGB(e,t=et.workingColorSpace){return et.fromWorkingColorSpace(Dt.copy(this),t),e.r=Dt.r,e.g=Dt.g,e.b=Dt.b,e}getStyle(e=Mt){et.fromWorkingColorSpace(Dt.copy(this),e);const t=Dt.r,i=Dt.g,s=Dt.b;return e!==Mt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(ki),this.setHSL(ki.h+e,ki.s+t,ki.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ki),e.getHSL(ir);const i=Is(ki.h,ir.h,t),s=Is(ki.s,ir.s,t),r=Is(ki.l,ir.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Dt=new Ve;Ve.NAMES=Uh;let $d=0;class ri extends Pn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$d++}),this.uuid=Cn(),this.name="",this.type="Material",this.blending=ts,this.side=$t,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=co,this.blendDst=ho,this.blendEquation=_n,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ve(0,0,0),this.blendAlpha=0,this.depthFunc=os,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Nl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=In,this.stencilZFail=In,this.stencilZPass=In,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ts&&(i.blending=this.blending),this.side!==$t&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==co&&(i.blendSrc=this.blendSrc),this.blendDst!==ho&&(i.blendDst=this.blendDst),this.blendEquation!==_n&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==os&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Nl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==In&&(i.stencilFail=this.stencilFail),this.stencilZFail!==In&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==In&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Bs extends ri{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new si,this.combine=jr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const yt=new T,nr=new ue;let Kd=0;class jt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Kd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ol,this.updateRanges=[],this.gpuType=Kt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)nr.fromBufferAttribute(this,t),nr.applyMatrix3(e),this.setXY(t,nr.x,nr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix3(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix4(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.applyNormalMatrix(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.transformDirection(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Zn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Nt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Zn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Zn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Zn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Zn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),i=Nt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),i=Nt(i,this.array),s=Nt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),i=Nt(i,this.array),s=Nt(s,this.array),r=Nt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ol&&(e.usage=this.usage),e}}class Fh extends jt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Nh extends jt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Ze extends jt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Zd=0;const ei=new st,Ca=new Et,kn=new T,qt=new Zt,ys=new Zt,At=new T;class xt extends Pn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Zd++}),this.uuid=Cn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Lh(e)?Nh:Fh)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ye().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ei.makeRotationFromQuaternion(e),this.applyMatrix4(ei),this}rotateX(e){return ei.makeRotationX(e),this.applyMatrix4(ei),this}rotateY(e){return ei.makeRotationY(e),this.applyMatrix4(ei),this}rotateZ(e){return ei.makeRotationZ(e),this.applyMatrix4(ei),this}translate(e,t,i){return ei.makeTranslation(e,t,i),this.applyMatrix4(ei),this}scale(e,t,i){return ei.makeScale(e,t,i),this.applyMatrix4(ei),this}lookAt(e){return Ca.lookAt(e),Ca.updateMatrix(),this.applyMatrix4(Ca.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(kn).negate(),this.translate(kn.x,kn.y,kn.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ze(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];qt.setFromBufferAttribute(r),this.morphTargetsRelative?(At.addVectors(this.boundingBox.min,qt.min),this.boundingBox.expandByPoint(At),At.addVectors(this.boundingBox.max,qt.max),this.boundingBox.expandByPoint(At)):(this.boundingBox.expandByPoint(qt.min),this.boundingBox.expandByPoint(qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new di);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new T,1/0);return}if(e){const i=this.boundingSphere.center;if(qt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];ys.setFromBufferAttribute(o),this.morphTargetsRelative?(At.addVectors(qt.min,ys.min),qt.expandByPoint(At),At.addVectors(qt.max,ys.max),qt.expandByPoint(At)):(qt.expandByPoint(ys.min),qt.expandByPoint(ys.max))}qt.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)At.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(At));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let h=0,u=o.count;h<u;h++)At.fromBufferAttribute(o,h),l&&(kn.fromBufferAttribute(e,h),At.add(kn)),s=Math.max(s,i.distanceToSquared(At))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new jt(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let L=0;L<i.count;L++)o[L]=new T,l[L]=new T;const h=new T,u=new T,d=new T,p=new ue,f=new ue,x=new ue,v=new T,_=new T;function m(L,E,S){h.fromBufferAttribute(i,L),u.fromBufferAttribute(i,E),d.fromBufferAttribute(i,S),p.fromBufferAttribute(r,L),f.fromBufferAttribute(r,E),x.fromBufferAttribute(r,S),u.sub(h),d.sub(h),f.sub(p),x.sub(p);const R=1/(f.x*x.y-x.x*f.y);isFinite(R)&&(v.copy(u).multiplyScalar(x.y).addScaledVector(d,-f.y).multiplyScalar(R),_.copy(d).multiplyScalar(f.x).addScaledVector(u,-x.x).multiplyScalar(R),o[L].add(v),o[E].add(v),o[S].add(v),l[L].add(_),l[E].add(_),l[S].add(_))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let L=0,E=M.length;L<E;++L){const S=M[L],R=S.start,F=S.count;for(let O=R,V=R+F;O<V;O+=3)m(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const b=new T,y=new T,I=new T,A=new T;function P(L){I.fromBufferAttribute(s,L),A.copy(I);const E=o[L];b.copy(E),b.sub(I.multiplyScalar(I.dot(E))).normalize(),y.crossVectors(A,E);const R=y.dot(l[L])<0?-1:1;a.setXYZW(L,b.x,b.y,b.z,R)}for(let L=0,E=M.length;L<E;++L){const S=M[L],R=S.start,F=S.count;for(let O=R,V=R+F;O<V;O+=3)P(e.getX(O+0)),P(e.getX(O+1)),P(e.getX(O+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new jt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let p=0,f=i.count;p<f;p++)i.setXYZ(p,0,0,0);const s=new T,r=new T,a=new T,o=new T,l=new T,h=new T,u=new T,d=new T;if(e)for(let p=0,f=e.count;p<f;p+=3){const x=e.getX(p+0),v=e.getX(p+1),_=e.getX(p+2);s.fromBufferAttribute(t,x),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,_),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(i,x),l.fromBufferAttribute(i,v),h.fromBufferAttribute(i,_),o.add(u),l.add(u),h.add(u),i.setXYZ(x,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(_,h.x,h.y,h.z)}else for(let p=0,f=t.count;p<f;p+=3)s.fromBufferAttribute(t,p+0),r.fromBufferAttribute(t,p+1),a.fromBufferAttribute(t,p+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),i.setXYZ(p+0,u.x,u.y,u.z),i.setXYZ(p+1,u.x,u.y,u.z),i.setXYZ(p+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)At.fromBufferAttribute(e,t),At.normalize(),e.setXYZ(t,At.x,At.y,At.z)}toNonIndexed(){function e(o,l){const h=o.array,u=o.itemSize,d=o.normalized,p=new h.constructor(l.length*u);let f=0,x=0;for(let v=0,_=l.length;v<_;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*u;for(let m=0;m<u;m++)p[x++]=h[f++]}return new jt(p,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new xt,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],h=e(l,i);t.setAttribute(o,h)}const r=this.morphAttributes;for(const o in r){const l=[],h=r[o];for(let u=0,d=h.length;u<d;u++){const p=h[u],f=e(p,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const h=a[o];t.addGroup(h.start,h.count,h.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const h in l)l[h]!==void 0&&(e[h]=l[h]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const h=i[l];e.data.attributes[l]=h.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const h=this.morphAttributes[l],u=[];for(let d=0,p=h.length;d<p;d++){const f=h[d];u.push(f.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const s=e.attributes;for(const h in s){const u=s[h];this.setAttribute(h,u.clone(t))}const r=e.morphAttributes;for(const h in r){const u=[],d=r[h];for(let p=0,f=d.length;p<f;p++)u.push(d[p].clone(t));this.morphAttributes[h]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let h=0,u=a.length;h<u;h++){const d=a[h];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Jl=new st,an=new ea,sr=new di,Ql=new T,rr=new T,ar=new T,or=new T,Ra=new T,lr=new T,ec=new T,cr=new T;class Ct extends Et{constructor(e=new xt,t=new Bs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){lr.set(0,0,0);for(let l=0,h=r.length;l<h;l++){const u=o[l],d=r[l];u!==0&&(Ra.fromBufferAttribute(d,e),a?lr.addScaledVector(Ra,u):lr.addScaledVector(Ra.sub(t),u))}t.add(lr)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),sr.copy(i.boundingSphere),sr.applyMatrix4(r),an.copy(e.ray).recast(e.near),!(sr.containsPoint(an.origin)===!1&&(an.intersectSphere(sr,Ql)===null||an.origin.distanceToSquared(Ql)>(e.far-e.near)**2))&&(Jl.copy(r).invert(),an.copy(e.ray).applyMatrix4(Jl),!(i.boundingBox!==null&&an.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,an)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,h=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,p=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,v=p.length;x<v;x++){const _=p[x],m=a[_.materialIndex],M=Math.max(_.start,f.start),b=Math.min(o.count,Math.min(_.start+_.count,f.start+f.count));for(let y=M,I=b;y<I;y+=3){const A=o.getX(y),P=o.getX(y+1),L=o.getX(y+2);s=hr(this,m,e,i,h,u,d,A,P,L),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=_.materialIndex,t.push(s))}}else{const x=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let _=x,m=v;_<m;_+=3){const M=o.getX(_),b=o.getX(_+1),y=o.getX(_+2);s=hr(this,a,e,i,h,u,d,M,b,y),s&&(s.faceIndex=Math.floor(_/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let x=0,v=p.length;x<v;x++){const _=p[x],m=a[_.materialIndex],M=Math.max(_.start,f.start),b=Math.min(l.count,Math.min(_.start+_.count,f.start+f.count));for(let y=M,I=b;y<I;y+=3){const A=y,P=y+1,L=y+2;s=hr(this,m,e,i,h,u,d,A,P,L),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=_.materialIndex,t.push(s))}}else{const x=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let _=x,m=v;_<m;_+=3){const M=_,b=_+1,y=_+2;s=hr(this,a,e,i,h,u,d,M,b,y),s&&(s.faceIndex=Math.floor(_/3),t.push(s))}}}}function jd(n,e,t,i,s,r,a,o){let l;if(e.side===Gt?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===$t,o),l===null)return null;cr.copy(o),cr.applyMatrix4(n.matrixWorld);const h=t.ray.origin.distanceTo(cr);return h<t.near||h>t.far?null:{distance:h,point:cr.clone(),object:n}}function hr(n,e,t,i,s,r,a,o,l,h){n.getVertexPosition(o,rr),n.getVertexPosition(l,ar),n.getVertexPosition(h,or);const u=jd(n,e,t,i,rr,ar,or,ec);if(u){const d=new T;ni.getBarycoord(ec,rr,ar,or,d),s&&(u.uv=ni.getInterpolatedAttribute(s,o,l,h,d,new ue)),r&&(u.uv1=ni.getInterpolatedAttribute(r,o,l,h,d,new ue)),a&&(u.normal=ni.getInterpolatedAttribute(a,o,l,h,d,new T),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const p={a:o,b:l,c:h,normal:new T,materialIndex:0};ni.getNormal(rr,ar,or,p.normal),u.face=p,u.barycoord=d}return u}class Ws extends xt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],h=[],u=[],d=[];let p=0,f=0;x("z","y","x",-1,-1,i,t,e,a,r,0),x("z","y","x",1,-1,i,t,-e,a,r,1),x("x","z","y",1,1,e,i,t,s,a,2),x("x","z","y",1,-1,e,i,-t,s,a,3),x("x","y","z",1,-1,e,t,i,s,r,4),x("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Ze(h,3)),this.setAttribute("normal",new Ze(u,3)),this.setAttribute("uv",new Ze(d,2));function x(v,_,m,M,b,y,I,A,P,L,E){const S=y/P,R=I/L,F=y/2,O=I/2,V=A/2,K=P+1,z=L+1;let q=0,N=0;const k=new T;for(let j=0;j<z;j++){const ie=j*R-O;for(let de=0;de<K;de++){const we=de*S-F;k[v]=we*M,k[_]=ie*b,k[m]=V,h.push(k.x,k.y,k.z),k[v]=0,k[_]=0,k[m]=A>0?1:-1,u.push(k.x,k.y,k.z),d.push(de/P),d.push(1-j/L),q+=1}}for(let j=0;j<L;j++)for(let ie=0;ie<P;ie++){const de=p+ie+K*j,we=p+ie+K*(j+1),Y=p+(ie+1)+K*(j+1),ee=p+(ie+1)+K*j;l.push(de,we,ee),l.push(we,Y,ee),N+=6}o.addGroup(f,N,E),f+=N,p+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ws(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function fs(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Ot(n){const e={};for(let t=0;t<n.length;t++){const i=fs(n[t]);for(const s in i)e[s]=i[s]}return e}function Jd(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Oh(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const Qd={clone:fs,merge:Ot};var ef=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,tf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class en extends ri{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ef,this.fragmentShader=tf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=fs(e.uniforms),this.uniformsGroups=Jd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Bh extends Et{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new st,this.projectionMatrix=new st,this.projectionMatrixInverse=new st,this.coordinateSystem=Ui}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Hi=new T,tc=new ue,ic=new ue;class ii extends Bh{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Os*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ns*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Os*2*Math.atan(Math.tan(ns*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Hi.x,Hi.y).multiplyScalar(-e/Hi.z),Hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Hi.x,Hi.y).multiplyScalar(-e/Hi.z)}getViewSize(e,t){return this.getViewBounds(e,tc,ic),t.subVectors(ic,tc)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ns*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,h=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/h,s*=a.width/l,i*=a.height/h}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Hn=-90,Gn=1;class nf extends Et{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new ii(Hn,Gn,e,t);s.layers=this.layers,this.add(s);const r=new ii(Hn,Gn,e,t);r.layers=this.layers,this.add(r);const a=new ii(Hn,Gn,e,t);a.layers=this.layers,this.add(a);const o=new ii(Hn,Gn,e,t);o.layers=this.layers,this.add(o);const l=new ii(Hn,Gn,e,t);l.layers=this.layers,this.add(l);const h=new ii(Hn,Gn,e,t);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(const h of t)this.remove(h);if(e===Ui)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Xr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const h of t)this.add(h),h.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,h,u]=this.children,d=e.getRenderTarget(),p=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,a),e.setRenderTarget(i,2,s),e.render(t,o),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,h),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),e.render(t,u),e.setRenderTarget(d,p,f),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class Vh extends Rt{constructor(e,t,i,s,r,a,o,l,h,u){e=e!==void 0?e:[],t=t!==void 0?t:ls,super(e,t,i,s,r,a,o,l,h,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class sf extends wn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Vh(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:gt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ws(5,5,5),r=new en({name:"CubemapFromEquirect",uniforms:fs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Gt,blending:Zi});r.uniforms.tEquirect.value=t;const a=new Ct(s,r),o=t.minFilter;return t.minFilter===Di&&(t.minFilter=gt),new nf(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}class Ps extends Et{constructor(){super(),this.isGroup=!0,this.type="Group"}}const rf={type:"move"};class Ia{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ps,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ps,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ps,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,h=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(h&&e.hand){a=!0;for(const v of e.hand.values()){const _=t.getJointPose(v,i),m=this._getHandJoint(h,v);_!==null&&(m.matrix.fromArray(_.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=_.radius),m.visible=_!==null}const u=h.joints["index-finger-tip"],d=h.joints["thumb-tip"],p=u.position.distanceTo(d.position),f=.02,x=.005;h.inputState.pinching&&p>f+x?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!h.inputState.pinching&&p<=f-x&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(rf)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),h!==null&&(h.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ps;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class af extends Et{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new si,this.environmentIntensity=1,this.environmentRotation=new si,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class ui extends Rt{constructor(e=null,t=1,i=1,s,r,a,o,l,h=Bt,u=Bt,d,p){super(null,a,o,l,h,u,s,r,d,p),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class nc extends jt{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Wn=new st,sc=new st,ur=[],rc=new Zt,of=new st,Ms=new Ct,bs=new di;class Fx extends Ct{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new nc(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,of)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Zt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Wn),rc.copy(e.boundingBox).applyMatrix4(Wn),this.boundingBox.union(rc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new di),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Wn),bs.copy(e.boundingSphere).applyMatrix4(Wn),this.boundingSphere.union(bs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(Ms.geometry=this.geometry,Ms.material=this.material,Ms.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),bs.copy(this.boundingSphere),bs.applyMatrix4(i),e.ray.intersectsSphere(bs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Wn),sc.multiplyMatrices(i,Wn),Ms.matrixWorld=sc,Ms.raycast(e,ur);for(let a=0,o=ur.length;a<o;a++){const l=ur[a];l.instanceId=r,l.object=this,t.push(l)}ur.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new nc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new ui(new Float32Array(s*this.count),s,this.count,rl,Kt));const r=this.morphTexture.source.data.data;let a=0;for(let h=0;h<i.length;h++)a+=i[h];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const La=new T,lf=new T,cf=new Ye;class Li{constructor(e=new T(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=La.subVectors(i,t).cross(lf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(La),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||cf.getNormalMatrix(e),s=this.coplanarPoint(La).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const on=new di,dr=new T;class ta{constructor(e=new Li,t=new Li,i=new Li,s=new Li,r=new Li,a=new Li){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Ui){const i=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],l=s[3],h=s[4],u=s[5],d=s[6],p=s[7],f=s[8],x=s[9],v=s[10],_=s[11],m=s[12],M=s[13],b=s[14],y=s[15];if(i[0].setComponents(l-r,p-h,_-f,y-m).normalize(),i[1].setComponents(l+r,p+h,_+f,y+m).normalize(),i[2].setComponents(l+a,p+u,_+x,y+M).normalize(),i[3].setComponents(l-a,p-u,_-x,y-M).normalize(),i[4].setComponents(l-o,p-d,_-v,y-b).normalize(),t===Ui)i[5].setComponents(l+o,p+d,_+v,y+b).normalize();else if(t===Xr)i[5].setComponents(o,d,v,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),on.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),on.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(on)}intersectsSprite(e){return on.center.set(0,0,0),on.radius=.7071067811865476,on.applyMatrix4(e.matrixWorld),this.intersectsSphere(on)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(dr.x=s.normal.x>0?e.max.x:e.min.x,dr.y=s.normal.y>0?e.max.y:e.min.y,dr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(dr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Da(n,e){return n-e}function hf(n,e){return n.z-e.z}function uf(n,e){return e.z-n.z}class df{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,i,s){const r=this.pool,a=this.list;this.index>=r.length&&r.push({start:-1,count:-1,z:-1,index:-1});const o=r[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=i,o.index=s}reset(){this.list.length=0,this.index=0}}const zt=new st,ff=new Ve(1,1,1),Ua=new ta,fr=new Zt,ln=new di,Ss=new T,ac=new T,pf=new T,Fa=new df,Ut=new Ct,pr=[];function mf(n,e,t=0){const i=e.itemSize;if(n.isInterleavedBufferAttribute||n.array.constructor!==e.array.constructor){const s=n.count;for(let r=0;r<s;r++)for(let a=0;a<i;a++)e.setComponent(r+t,a,n.getComponent(r,a))}else e.array.set(n.array,t*i);e.needsUpdate=!0}function cn(n,e){if(n.constructor!==e.constructor){const t=Math.min(n.length,e.length);for(let i=0;i<t;i++)e[i]=n[i]}else{const t=Math.min(n.length,e.length);e.set(new n.constructor(n.buffer,0,t))}}class Nx extends Ct{constructor(e,t,i=t*2,s){super(new xt,s),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=i,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._multiDrawInstances=null,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4),i=new ui(t,e,e,bt,Kt);this._matricesTexture=i}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Uint32Array(e*e),i=new ui(t,e,e,Qr,Ji);this._indirectTexture=i}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Float32Array(e*e*4).fill(1),i=new ui(t,e,e,bt,Kt);i.colorSpace=et.workingColorSpace,this._colorsTexture=i}_initializeGeometry(e){const t=this.geometry,i=this._maxVertexCount,s=this._maxIndexCount;if(this._geometryInitialized===!1){for(const r in e.attributes){const a=e.getAttribute(r),{array:o,itemSize:l,normalized:h}=a,u=new o.constructor(i*l),d=new jt(u,l,h);t.setAttribute(r,d)}if(e.getIndex()!==null){const r=i>65535?new Uint32Array(s):new Uint16Array(s);t.setIndex(new jt(r,1))}this._geometryInitialized=!0}}_validateGeometry(e){const t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(const i in t.attributes){if(!e.hasAttribute(i))throw new Error(`THREE.BatchedMesh: Added geometry missing "${i}". All geometries must have consistent attributes.`);const s=e.getAttribute(i),r=t.getAttribute(i);if(s.itemSize!==r.itemSize||s.normalized!==r.normalized)throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(e){const t=this._instanceInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${e}. Instance is either out of range or has been deleted.`)}validateGeometryId(e){const t=this._geometryInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${e}. Geometry is either out of range or has been deleted.`)}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zt);const e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let i=0,s=t.length;i<s;i++){if(t[i].active===!1)continue;const r=t[i].geometryIndex;this.getMatrixAt(i,zt),this.getBoundingBoxAt(r,fr).applyMatrix4(zt),e.union(fr)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new di);const e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let i=0,s=t.length;i<s;i++){if(t[i].active===!1)continue;const r=t[i].geometryIndex;this.getMatrixAt(i,zt),this.getBoundingSphereAt(r,ln).applyMatrix4(zt),e.union(ln)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("THREE.BatchedMesh: Maximum item count reached.");const i={visible:!0,active:!0,geometryIndex:e};let s=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(Da),s=this._availableInstanceIds.shift(),this._instanceInfo[s]=i):(s=this._instanceInfo.length,this._instanceInfo.push(i));const r=this._matricesTexture;zt.identity().toArray(r.image.data,s*16),r.needsUpdate=!0;const a=this._colorsTexture;return a&&(ff.toArray(a.image.data,s*4),a.needsUpdate=!0),this._visibilityChanged=!0,s}addGeometry(e,t=-1,i=-1){this._initializeGeometry(e),this._validateGeometry(e);const s={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},r=this._geometryInfo;s.vertexStart=this._nextVertexStart,s.reservedVertexCount=t===-1?e.getAttribute("position").count:t;const a=e.getIndex();if(a!==null&&(s.indexStart=this._nextIndexStart,s.reservedIndexCount=i===-1?a.count:i),s.indexStart!==-1&&s.indexStart+s.reservedIndexCount>this._maxIndexCount||s.vertexStart+s.reservedVertexCount>this._maxVertexCount)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(Da),l=this._availableGeometryIds.shift(),r[l]=s):(l=this._geometryCount,this._geometryCount++,r.push(s)),this.setGeometryAt(l,e),this._nextIndexStart=s.indexStart+s.reservedIndexCount,this._nextVertexStart=s.vertexStart+s.reservedVertexCount,l}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);const i=this.geometry,s=i.getIndex()!==null,r=i.getIndex(),a=t.getIndex(),o=this._geometryInfo[e];if(s&&a.count>o.reservedIndexCount||t.attributes.position.count>o.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");const l=o.vertexStart,h=o.reservedVertexCount;o.vertexCount=t.getAttribute("position").count;for(const u in i.attributes){const d=t.getAttribute(u),p=i.getAttribute(u);mf(d,p,l);const f=d.itemSize;for(let x=d.count,v=h;x<v;x++){const _=l+x;for(let m=0;m<f;m++)p.setComponent(_,m,0)}p.needsUpdate=!0,p.addUpdateRange(l*f,h*f)}if(s){const u=o.indexStart,d=o.reservedIndexCount;o.indexCount=t.getIndex().count;for(let p=0;p<a.count;p++)r.setX(u+p,l+a.getX(p));for(let p=a.count,f=d;p<f;p++)r.setX(u+p,l);r.needsUpdate=!0,r.addUpdateRange(u,o.reservedIndexCount)}return o.start=s?o.indexStart:o.vertexStart,o.count=s?o.indexCount:o.vertexCount,o.boundingBox=null,t.boundingBox!==null&&(o.boundingBox=t.boundingBox.clone()),o.boundingSphere=null,t.boundingSphere!==null&&(o.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){const t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;const i=this._instanceInfo;for(let s=0,r=i.length;s<r;s++)i[s].active&&i[s].geometryIndex===e&&this.deleteInstance(s);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){return this.validateInstanceId(e),this._instanceInfo[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this}optimize(){let e=0,t=0;const i=this._geometryInfo,s=i.map((a,o)=>o).sort((a,o)=>i[a].vertexStart-i[o].vertexStart),r=this.geometry;for(let a=0,o=i.length;a<o;a++){const l=s[a],h=i[l];if(h.active!==!1){if(r.index!==null){if(h.indexStart!==t){const{indexStart:u,vertexStart:d,reservedIndexCount:p}=h,f=r.index,x=f.array,v=e-d;for(let _=u;_<u+p;_++)x[_]=x[_]+v;f.array.copyWithin(t,u,u+p),f.addUpdateRange(t,p),h.indexStart=t}t+=h.reservedIndexCount}if(h.vertexStart!==e){const{vertexStart:u,reservedVertexCount:d}=h,p=r.attributes;for(const f in p){const x=p[f],{array:v,itemSize:_}=x;v.copyWithin(e*_,u*_,(u+d)*_),x.addUpdateRange(e*_,d*_)}h.vertexStart=e}e+=h.reservedVertexCount,h.start=r.index?h.indexStart:h.vertexStart,this._nextIndexStart=r.index?h.indexStart+h.reservedIndexCount:0,this._nextVertexStart=h.vertexStart+h.reservedVertexCount}}return this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;const i=this.geometry,s=this._geometryInfo[e];if(s.boundingBox===null){const r=new Zt,a=i.index,o=i.attributes.position;for(let l=s.start,h=s.start+s.count;l<h;l++){let u=l;a&&(u=a.getX(u)),r.expandByPoint(Ss.fromBufferAttribute(o,u))}s.boundingBox=r}return t.copy(s.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;const i=this.geometry,s=this._geometryInfo[e];if(s.boundingSphere===null){const r=new di;this.getBoundingBoxAt(e,fr),fr.getCenter(r.center);const a=i.index,o=i.attributes.position;let l=0;for(let h=s.start,u=s.start+s.count;h<u;h++){let d=h;a&&(d=a.getX(d)),Ss.fromBufferAttribute(o,d),l=Math.max(l,r.center.distanceToSquared(Ss))}r.radius=Math.sqrt(l),s.boundingSphere=r}return t.copy(s.boundingSphere),t}setMatrixAt(e,t){this.validateInstanceId(e);const i=this._matricesTexture,s=this._matricesTexture.image.data;return t.toArray(s,e*16),i.needsUpdate=!0,this}getMatrixAt(e,t){return this.validateInstanceId(e),t.fromArray(this._matricesTexture.image.data,e*16)}setColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null&&this._initColorsTexture(),t.toArray(this._colorsTexture.image.data,e*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(e,t){return this.validateInstanceId(e),t.fromArray(this._colorsTexture.image.data,e*4)}setVisibleAt(e,t){return this.validateInstanceId(e),this._instanceInfo[e].visible===t?this:(this._instanceInfo[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){return this.validateInstanceId(e),this._instanceInfo[e].visible}setGeometryIdAt(e,t){return this.validateInstanceId(e),this.validateGeometryId(t),this._instanceInfo[e].geometryIndex=t,this}getGeometryIdAt(e){return this.validateInstanceId(e),this._instanceInfo[e].geometryIndex}getGeometryRangeAt(e,t={}){this.validateGeometryId(e);const i=this._geometryInfo[e];return t.vertexStart=i.vertexStart,t.vertexCount=i.vertexCount,t.reservedVertexCount=i.reservedVertexCount,t.indexStart=i.indexStart,t.indexCount=i.indexCount,t.reservedIndexCount=i.reservedIndexCount,t.start=i.start,t.count=i.count,t}setInstanceCount(e){const t=this._availableInstanceIds,i=this._instanceInfo;for(t.sort(Da);t[t.length-1]===i.length;)i.pop(),t.pop();if(e<i.length)throw new Error(`BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);const s=new Int32Array(e),r=new Int32Array(e);cn(this._multiDrawCounts,s),cn(this._multiDrawStarts,r),this._multiDrawCounts=s,this._multiDrawStarts=r,this._maxInstanceCount=e;const a=this._indirectTexture,o=this._matricesTexture,l=this._colorsTexture;a.dispose(),this._initIndirectTexture(),cn(a.image.data,this._indirectTexture.image.data),o.dispose(),this._initMatricesTexture(),cn(o.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),cn(l.image.data,this._colorsTexture.image.data))}setGeometrySize(e,t){const i=[...this._geometryInfo].filter(o=>o.active);if(Math.max(...i.map(o=>o.vertexStart+o.reservedVertexCount))>e)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${t}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...i.map(l=>l.indexStart+l.reservedIndexCount))>t)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);const r=this.geometry;r.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new xt,this._initializeGeometry(r));const a=this.geometry;r.index&&cn(r.index.array,a.index.array);for(const o in r.attributes)cn(r.attributes[o].array,a.attributes[o].array)}raycast(e,t){const i=this._instanceInfo,s=this._geometryInfo,r=this.matrixWorld,a=this.geometry;Ut.material=this.material,Ut.geometry.index=a.index,Ut.geometry.attributes=a.attributes,Ut.geometry.boundingBox===null&&(Ut.geometry.boundingBox=new Zt),Ut.geometry.boundingSphere===null&&(Ut.geometry.boundingSphere=new di);for(let o=0,l=i.length;o<l;o++){if(!i[o].visible||!i[o].active)continue;const h=i[o].geometryIndex,u=s[h];Ut.geometry.setDrawRange(u.start,u.count),this.getMatrixAt(o,Ut.matrixWorld).premultiply(r),this.getBoundingBoxAt(h,Ut.geometry.boundingBox),this.getBoundingSphereAt(h,Ut.geometry.boundingSphere),Ut.raycast(e,pr);for(let d=0,p=pr.length;d<p;d++){const f=pr[d];f.object=this,f.batchId=o,t.push(f)}pr.length=0}Ut.material=null,Ut.geometry.index=null,Ut.geometry.attributes={},Ut.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._geometryCount=e._geometryCount,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null)}onBeforeRender(e,t,i,s,r){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const a=s.getIndex(),o=a===null?1:a.array.BYTES_PER_ELEMENT,l=this._instanceInfo,h=this._multiDrawStarts,u=this._multiDrawCounts,d=this._geometryInfo,p=this.perObjectFrustumCulled,f=this._indirectTexture,x=f.image.data;p&&(zt.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse).multiply(this.matrixWorld),Ua.setFromProjectionMatrix(zt,e.coordinateSystem));let v=0;if(this.sortObjects){zt.copy(this.matrixWorld).invert(),Ss.setFromMatrixPosition(i.matrixWorld).applyMatrix4(zt),ac.set(0,0,-1).transformDirection(i.matrixWorld).transformDirection(zt);for(let M=0,b=l.length;M<b;M++)if(l[M].visible&&l[M].active){const y=l[M].geometryIndex;this.getMatrixAt(M,zt),this.getBoundingSphereAt(y,ln).applyMatrix4(zt);let I=!1;if(p&&(I=!Ua.intersectsSphere(ln)),!I){const A=d[y],P=pf.subVectors(ln.center,Ss).dot(ac);Fa.push(A.start,A.count,P,M)}}const _=Fa.list,m=this.customSort;m===null?_.sort(r.transparent?uf:hf):m.call(this,_,i);for(let M=0,b=_.length;M<b;M++){const y=_[M];h[v]=y.start*o,u[v]=y.count,x[v]=y.index,v++}Fa.reset()}else for(let _=0,m=l.length;_<m;_++)if(l[_].visible&&l[_].active){const M=l[_].geometryIndex;let b=!1;if(p&&(this.getMatrixAt(_,zt),this.getBoundingSphereAt(M,ln).applyMatrix4(zt),b=!Ua.intersectsSphere(ln)),!b){const y=d[M];h[v]=y.start*o,u[v]=y.count,x[v]=_,v++}}f.needsUpdate=!0,this._multiDrawCount=v,this._visibilityChanged=!1}onBeforeShadow(e,t,i,s,r,a){this.onBeforeRender(e,null,s,r,a)}}class ia extends ri{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ve(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Yr=new T,$r=new T,oc=new st,Es=new ea,mr=new di,Na=new T,lc=new T;class zh extends Et{constructor(e=new xt,t=new ia){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)Yr.fromBufferAttribute(t,s-1),$r.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Yr.distanceTo($r);e.setAttribute("lineDistance",new Ze(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),mr.copy(i.boundingSphere),mr.applyMatrix4(s),mr.radius+=r,e.ray.intersectsSphere(mr)===!1)return;oc.copy(s).invert(),Es.copy(e.ray).applyMatrix4(oc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,h=this.isLineSegments?2:1,u=i.index,p=i.attributes.position;if(u!==null){const f=Math.max(0,a.start),x=Math.min(u.count,a.start+a.count);for(let v=f,_=x-1;v<_;v+=h){const m=u.getX(v),M=u.getX(v+1),b=gr(this,e,Es,l,m,M,v);b&&t.push(b)}if(this.isLineLoop){const v=u.getX(x-1),_=u.getX(f),m=gr(this,e,Es,l,v,_,x-1);m&&t.push(m)}}else{const f=Math.max(0,a.start),x=Math.min(p.count,a.start+a.count);for(let v=f,_=x-1;v<_;v+=h){const m=gr(this,e,Es,l,v,v+1,v);m&&t.push(m)}if(this.isLineLoop){const v=gr(this,e,Es,l,x-1,f,x-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function gr(n,e,t,i,s,r,a){const o=n.geometry.attributes.position;if(Yr.fromBufferAttribute(o,s),$r.fromBufferAttribute(o,r),t.distanceSqToSegment(Yr,$r,Na,lc)>i)return;Na.applyMatrix4(n.matrixWorld);const h=e.ray.origin.distanceTo(Na);if(!(h<e.near||h>e.far))return{distance:h,point:lc.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const cc=new T,hc=new T;class Ox extends zh{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)cc.fromBufferAttribute(t,s),hc.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+cc.distanceTo(hc);e.setAttribute("lineDistance",new Ze(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class gf extends ri{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ve(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}class _f extends Rt{constructor(e,t,i,s,r,a,o,l,h){super(e,t,i,s,r,a,o,l,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class kh extends Rt{constructor(e,t,i,s,r,a,o,l,h,u=is){if(u!==is&&u!==us)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===is&&(i=Ji),i===void 0&&u===us&&(i=hs),super(null,s,r,a,o,l,u,i,h),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Bt,this.minFilter=l!==void 0?l:Bt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new cl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class bi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),r+=i.distanceTo(s),t.push(r),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let s=0;const r=i.length;let a;t?a=t:a=e*i[r-1];let o=0,l=r-1,h;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),h=i[s]-a,h<0)o=s+1;else if(h>0)l=s-1;else{l=s;break}if(s=l,i[s]===a)return s/(r-1);const u=i[s],p=i[s+1]-u,f=(a-u)/p;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new ue:new T);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new T,s=[],r=[],a=[],o=new T,l=new st;for(let f=0;f<=e;f++){const x=f/e;s[f]=this.getTangentAt(x,new T)}r[0]=new T,a[0]=new T;let h=Number.MAX_VALUE;const u=Math.abs(s[0].x),d=Math.abs(s[0].y),p=Math.abs(s[0].z);u<=h&&(h=u,i.set(1,0,0)),d<=h&&(h=d,i.set(0,1,0)),p<=h&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const x=Math.acos(Xe(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,x))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(Xe(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let x=1;x<=e;x++)r[x].applyMatrix4(l.makeRotationAxis(s[x],f*x)),a[x].crossVectors(s[x],r[x])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class ul extends bi{constructor(e=0,t=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ue){const i=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(o),h=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),p=l-this.aX,f=h-this.aY;l=p*u-f*d+this.aX,h=p*d+f*u+this.aY}return i.set(l,h)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class xf extends ul{constructor(e,t,i,s,r,a){super(e,t,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function dl(){let n=0,e=0,t=0,i=0;function s(r,a,o,l){n=r,e=o,t=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,h){s(a,o,h*(o-r),h*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,h,u,d){let p=(a-r)/h-(o-r)/(h+u)+(o-a)/u,f=(o-a)/u-(l-a)/(u+d)+(l-o)/d;p*=u,f*=u,s(a,o,p,f)},calc:function(r){const a=r*r,o=a*r;return n+e*r+t*a+i*o}}}const _r=new T,Oa=new dl,Ba=new dl,Va=new dl;class vf extends bi{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new T){const i=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let h,u;this.closed||o>0?h=s[(o-1)%r]:(_r.subVectors(s[0],s[1]).add(s[0]),h=_r);const d=s[o%r],p=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(_r.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=_r),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let x=Math.pow(h.distanceToSquared(d),f),v=Math.pow(d.distanceToSquared(p),f),_=Math.pow(p.distanceToSquared(u),f);v<1e-4&&(v=1),x<1e-4&&(x=v),_<1e-4&&(_=v),Oa.initNonuniformCatmullRom(h.x,d.x,p.x,u.x,x,v,_),Ba.initNonuniformCatmullRom(h.y,d.y,p.y,u.y,x,v,_),Va.initNonuniformCatmullRom(h.z,d.z,p.z,u.z,x,v,_)}else this.curveType==="catmullrom"&&(Oa.initCatmullRom(h.x,d.x,p.x,u.x,this.tension),Ba.initCatmullRom(h.y,d.y,p.y,u.y,this.tension),Va.initCatmullRom(h.z,d.z,p.z,u.z,this.tension));return i.set(Oa.calc(l),Ba.calc(l),Va.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new T().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function uc(n,e,t,i,s){const r=(i-e)*.5,a=(s-t)*.5,o=n*n,l=n*o;return(2*t-2*i+r+a)*l+(-3*t+3*i-2*r-a)*o+r*n+t}function yf(n,e){const t=1-n;return t*t*e}function Mf(n,e){return 2*(1-n)*n*e}function bf(n,e){return n*n*e}function Ls(n,e,t,i){return yf(n,e)+Mf(n,t)+bf(n,i)}function Sf(n,e){const t=1-n;return t*t*t*e}function Ef(n,e){const t=1-n;return 3*t*t*n*e}function wf(n,e){return 3*(1-n)*n*n*e}function Tf(n,e){return n*n*n*e}function Ds(n,e,t,i,s){return Sf(n,e)+Ef(n,t)+wf(n,i)+Tf(n,s)}class Hh extends bi{constructor(e=new ue,t=new ue,i=new ue,s=new ue){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new ue){const i=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Ds(e,s.x,r.x,a.x,o.x),Ds(e,s.y,r.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Af extends bi{constructor(e=new T,t=new T,i=new T,s=new T){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new T){const i=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Ds(e,s.x,r.x,a.x,o.x),Ds(e,s.y,r.y,a.y,o.y),Ds(e,s.z,r.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Gh extends bi{constructor(e=new ue,t=new ue){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ue){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ue){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Pf extends bi{constructor(e=new T,t=new T){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new T){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new T){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Wh extends bi{constructor(e=new ue,t=new ue,i=new ue){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new ue){const i=t,s=this.v0,r=this.v1,a=this.v2;return i.set(Ls(e,s.x,r.x,a.x),Ls(e,s.y,r.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Xh extends bi{constructor(e=new T,t=new T,i=new T){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new T){const i=t,s=this.v0,r=this.v1,a=this.v2;return i.set(Ls(e,s.x,r.x,a.x),Ls(e,s.y,r.y,a.y),Ls(e,s.z,r.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class qh extends bi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ue){const i=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],h=s[a],u=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return i.set(uc(o,l.x,h.x,u.x,d.x),uc(o,l.y,h.y,u.y,d.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new ue().fromArray(s))}return this}}var Kr=Object.freeze({__proto__:null,ArcCurve:xf,CatmullRomCurve3:vf,CubicBezierCurve:Hh,CubicBezierCurve3:Af,EllipseCurve:ul,LineCurve:Gh,LineCurve3:Pf,QuadraticBezierCurve:Wh,QuadraticBezierCurve3:Xh,SplineCurve:qh});class Cf extends bi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Kr[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const a=s[r]-i,o=this.curves[r],l=o.getLength(),h=l===0?0:1-a/l;return o.getPointAt(h,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,s=this.curves.length;i<s;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let h=0;h<l.length;h++){const u=l[h];i&&i.equals(u)||(t.push(u),i=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(new Kr[s.type]().fromJSON(s))}return this}}class dc extends Cf{constructor(e){super(),this.type="Path",this.currentPoint=new ue,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new Gh(this.currentPoint.clone(),new ue(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,s){const r=new Wh(this.currentPoint.clone(),new ue(e,t),new ue(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(e,t,i,s,r,a){const o=new Hh(this.currentPoint.clone(),new ue(e,t),new ue(i,s),new ue(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new qh(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,s,r,a),this}absarc(e,t,i,s,r,a){return this.absellipse(e,t,i,i,s,r,a),this}ellipse(e,t,i,s,r,a,o,l){const h=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+h,t+u,i,s,r,a,o,l),this}absellipse(e,t,i,s,r,a,o,l){const h=new ul(e,t,i,s,r,a,o,l);if(this.curves.length>0){const d=h.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(h);const u=h.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Yh extends xt{constructor(e=[new ue(0,-.5),new ue(.5,0),new ue(0,.5)],t=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:i,phiLength:s},t=Math.floor(t),s=Xe(s,0,Math.PI*2);const r=[],a=[],o=[],l=[],h=[],u=1/t,d=new T,p=new ue,f=new T,x=new T,v=new T;let _=0,m=0;for(let M=0;M<=e.length-1;M++)switch(M){case 0:_=e[M+1].x-e[M].x,m=e[M+1].y-e[M].y,f.x=m*1,f.y=-_,f.z=m*0,v.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(v.x,v.y,v.z);break;default:_=e[M+1].x-e[M].x,m=e[M+1].y-e[M].y,f.x=m*1,f.y=-_,f.z=m*0,x.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),l.push(f.x,f.y,f.z),v.copy(x)}for(let M=0;M<=t;M++){const b=i+M*u*s,y=Math.sin(b),I=Math.cos(b);for(let A=0;A<=e.length-1;A++){d.x=e[A].x*y,d.y=e[A].y,d.z=e[A].x*I,a.push(d.x,d.y,d.z),p.x=M/t,p.y=A/(e.length-1),o.push(p.x,p.y);const P=l[3*A+0]*y,L=l[3*A+1],E=l[3*A+0]*I;h.push(P,L,E)}}for(let M=0;M<t;M++)for(let b=0;b<e.length-1;b++){const y=b+M*e.length,I=y,A=y+e.length,P=y+e.length+1,L=y+1;r.push(I,A,L),r.push(P,L,A)}this.setIndex(r),this.setAttribute("position",new Ze(a,3)),this.setAttribute("uv",new Ze(o,2)),this.setAttribute("normal",new Ze(h,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yh(e.points,e.segments,e.phiStart,e.phiLength)}}class $h extends xt{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],l=[],h=new T,u=new ue;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,p=3;d<=t;d++,p+=3){const f=i+d/t*s;h.x=e*Math.cos(f),h.y=e*Math.sin(f),a.push(h.x,h.y,h.z),o.push(0,0,1),u.x=(a[p]/e+1)/2,u.y=(a[p+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Ze(a,3)),this.setAttribute("normal",new Ze(o,3)),this.setAttribute("uv",new Ze(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $h(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class na extends xt{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const h=this;s=Math.floor(s),r=Math.floor(r);const u=[],d=[],p=[],f=[];let x=0;const v=[],_=i/2;let m=0;M(),a===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(u),this.setAttribute("position",new Ze(d,3)),this.setAttribute("normal",new Ze(p,3)),this.setAttribute("uv",new Ze(f,2));function M(){const y=new T,I=new T;let A=0;const P=(t-e)/i;for(let L=0;L<=r;L++){const E=[],S=L/r,R=S*(t-e)+e;for(let F=0;F<=s;F++){const O=F/s,V=O*l+o,K=Math.sin(V),z=Math.cos(V);I.x=R*K,I.y=-S*i+_,I.z=R*z,d.push(I.x,I.y,I.z),y.set(K,P,z).normalize(),p.push(y.x,y.y,y.z),f.push(O,1-S),E.push(x++)}v.push(E)}for(let L=0;L<s;L++)for(let E=0;E<r;E++){const S=v[E][L],R=v[E+1][L],F=v[E+1][L+1],O=v[E][L+1];(e>0||E!==0)&&(u.push(S,R,O),A+=3),(t>0||E!==r-1)&&(u.push(R,F,O),A+=3)}h.addGroup(m,A,0),m+=A}function b(y){const I=x,A=new ue,P=new T;let L=0;const E=y===!0?e:t,S=y===!0?1:-1;for(let F=1;F<=s;F++)d.push(0,_*S,0),p.push(0,S,0),f.push(.5,.5),x++;const R=x;for(let F=0;F<=s;F++){const V=F/s*l+o,K=Math.cos(V),z=Math.sin(V);P.x=E*z,P.y=_*S,P.z=E*K,d.push(P.x,P.y,P.z),p.push(0,S,0),A.x=K*.5+.5,A.y=z*.5*S+.5,f.push(A.x,A.y),x++}for(let F=0;F<s;F++){const O=I+F,V=R+F;y===!0?u.push(V,V+1,O):u.push(V+1,V,O),L+=3}h.addGroup(m,L,y===!0?1:2),m+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new na(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Kh extends na{constructor(e=1,t=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,i,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Kh(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class sa extends xt{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const r=[],a=[];o(s),h(i),u(),this.setAttribute("position",new Ze(r,3)),this.setAttribute("normal",new Ze(r.slice(),3)),this.setAttribute("uv",new Ze(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const b=new T,y=new T,I=new T;for(let A=0;A<t.length;A+=3)f(t[A+0],b),f(t[A+1],y),f(t[A+2],I),l(b,y,I,M)}function l(M,b,y,I){const A=I+1,P=[];for(let L=0;L<=A;L++){P[L]=[];const E=M.clone().lerp(y,L/A),S=b.clone().lerp(y,L/A),R=A-L;for(let F=0;F<=R;F++)F===0&&L===A?P[L][F]=E:P[L][F]=E.clone().lerp(S,F/R)}for(let L=0;L<A;L++)for(let E=0;E<2*(A-L)-1;E++){const S=Math.floor(E/2);E%2===0?(p(P[L][S+1]),p(P[L+1][S]),p(P[L][S])):(p(P[L][S+1]),p(P[L+1][S+1]),p(P[L+1][S]))}}function h(M){const b=new T;for(let y=0;y<r.length;y+=3)b.x=r[y+0],b.y=r[y+1],b.z=r[y+2],b.normalize().multiplyScalar(M),r[y+0]=b.x,r[y+1]=b.y,r[y+2]=b.z}function u(){const M=new T;for(let b=0;b<r.length;b+=3){M.x=r[b+0],M.y=r[b+1],M.z=r[b+2];const y=_(M)/2/Math.PI+.5,I=m(M)/Math.PI+.5;a.push(y,1-I)}x(),d()}function d(){for(let M=0;M<a.length;M+=6){const b=a[M+0],y=a[M+2],I=a[M+4],A=Math.max(b,y,I),P=Math.min(b,y,I);A>.9&&P<.1&&(b<.2&&(a[M+0]+=1),y<.2&&(a[M+2]+=1),I<.2&&(a[M+4]+=1))}}function p(M){r.push(M.x,M.y,M.z)}function f(M,b){const y=M*3;b.x=e[y+0],b.y=e[y+1],b.z=e[y+2]}function x(){const M=new T,b=new T,y=new T,I=new T,A=new ue,P=new ue,L=new ue;for(let E=0,S=0;E<r.length;E+=9,S+=6){M.set(r[E+0],r[E+1],r[E+2]),b.set(r[E+3],r[E+4],r[E+5]),y.set(r[E+6],r[E+7],r[E+8]),A.set(a[S+0],a[S+1]),P.set(a[S+2],a[S+3]),L.set(a[S+4],a[S+5]),I.copy(M).add(b).add(y).divideScalar(3);const R=_(I);v(A,S+0,M,R),v(P,S+2,b,R),v(L,S+4,y,R)}}function v(M,b,y,I){I<0&&M.x===1&&(a[b]=M.x-1),y.x===0&&y.z===0&&(a[b]=I/2/Math.PI+.5)}function _(M){return Math.atan2(M.z,-M.x)}function m(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new sa(e.vertices,e.indices,e.radius,e.details)}}const xr=new T,vr=new T,za=new T,yr=new ni;class Bx extends xt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const s=Math.pow(10,4),r=Math.cos(ns*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,h=[0,0,0],u=["a","b","c"],d=new Array(3),p={},f=[];for(let x=0;x<l;x+=3){a?(h[0]=a.getX(x),h[1]=a.getX(x+1),h[2]=a.getX(x+2)):(h[0]=x,h[1]=x+1,h[2]=x+2);const{a:v,b:_,c:m}=yr;if(v.fromBufferAttribute(o,h[0]),_.fromBufferAttribute(o,h[1]),m.fromBufferAttribute(o,h[2]),yr.getNormal(za),d[0]=`${Math.round(v.x*s)},${Math.round(v.y*s)},${Math.round(v.z*s)}`,d[1]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,d[2]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let M=0;M<3;M++){const b=(M+1)%3,y=d[M],I=d[b],A=yr[u[M]],P=yr[u[b]],L=`${y}_${I}`,E=`${I}_${y}`;E in p&&p[E]?(za.dot(p[E].normal)<=r&&(f.push(A.x,A.y,A.z),f.push(P.x,P.y,P.z)),p[E]=null):L in p||(p[L]={index0:h[M],index1:h[b],normal:za.clone()})}}for(const x in p)if(p[x]){const{index0:v,index1:_}=p[x];xr.fromBufferAttribute(o,v),vr.fromBufferAttribute(o,_),f.push(xr.x,xr.y,xr.z),f.push(vr.x,vr.y,vr.z)}this.setAttribute("position",new Ze(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Rf extends dc{constructor(e){super(e),this.uuid=Cn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,s=this.holes.length;i<s;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const s=e.holes[t];this.holes.push(new dc().fromJSON(s))}return this}}class If{static triangulate(e,t,i=2){const s=t&&t.length,r=s?t[0]*i:e.length;let a=Zh(e,0,r,i,!0);const o=[];if(!a||a.next===a.prev)return o;let l,h,u,d,p,f,x;if(s&&(a=Nf(e,t,a,i)),e.length>80*i){l=u=e[0],h=d=e[1];for(let v=i;v<r;v+=i)p=e[v],f=e[v+1],p<l&&(l=p),f<h&&(h=f),p>u&&(u=p),f>d&&(d=f);x=Math.max(u-l,d-h),x=x!==0?32767/x:0}return Vs(a,o,i,l,h,x,0),o}}function Zh(n,e,t,i,s){let r,a;if(s===Yf(n,e,t,i)>0)for(r=e;r<t;r+=i)a=fc(r,n[r],n[r+1],a);else for(r=t-i;r>=e;r-=i)a=fc(r,n[r],n[r+1],a);return a&&ra(a,a.next)&&(ks(a),a=a.next),a}function Tn(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(ra(t,t.next)||dt(t.prev,t,t.next)===0)){if(ks(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function Vs(n,e,t,i,s,r,a){if(!n)return;!a&&r&&kf(n,i,s,r);let o=n,l,h;for(;n.prev!==n.next;){if(l=n.prev,h=n.next,r?Df(n,i,s,r):Lf(n)){e.push(l.i/t|0),e.push(n.i/t|0),e.push(h.i/t|0),ks(n),n=h.next,o=h.next;continue}if(n=h,n===o){a?a===1?(n=Uf(Tn(n),e,t),Vs(n,e,t,i,s,r,2)):a===2&&Ff(n,e,t,i,s,r):Vs(Tn(n),e,t,i,s,r,1);break}}}function Lf(n){const e=n.prev,t=n,i=n.next;if(dt(e,t,i)>=0)return!1;const s=e.x,r=t.x,a=i.x,o=e.y,l=t.y,h=i.y,u=s<r?s<a?s:a:r<a?r:a,d=o<l?o<h?o:h:l<h?l:h,p=s>r?s>a?s:a:r>a?r:a,f=o>l?o>h?o:h:l>h?l:h;let x=i.next;for(;x!==e;){if(x.x>=u&&x.x<=p&&x.y>=d&&x.y<=f&&Jn(s,o,r,l,a,h,x.x,x.y)&&dt(x.prev,x,x.next)>=0)return!1;x=x.next}return!0}function Df(n,e,t,i){const s=n.prev,r=n,a=n.next;if(dt(s,r,a)>=0)return!1;const o=s.x,l=r.x,h=a.x,u=s.y,d=r.y,p=a.y,f=o<l?o<h?o:h:l<h?l:h,x=u<d?u<p?u:p:d<p?d:p,v=o>l?o>h?o:h:l>h?l:h,_=u>d?u>p?u:p:d>p?d:p,m=Yo(f,x,e,t,i),M=Yo(v,_,e,t,i);let b=n.prevZ,y=n.nextZ;for(;b&&b.z>=m&&y&&y.z<=M;){if(b.x>=f&&b.x<=v&&b.y>=x&&b.y<=_&&b!==s&&b!==a&&Jn(o,u,l,d,h,p,b.x,b.y)&&dt(b.prev,b,b.next)>=0||(b=b.prevZ,y.x>=f&&y.x<=v&&y.y>=x&&y.y<=_&&y!==s&&y!==a&&Jn(o,u,l,d,h,p,y.x,y.y)&&dt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;b&&b.z>=m;){if(b.x>=f&&b.x<=v&&b.y>=x&&b.y<=_&&b!==s&&b!==a&&Jn(o,u,l,d,h,p,b.x,b.y)&&dt(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;y&&y.z<=M;){if(y.x>=f&&y.x<=v&&y.y>=x&&y.y<=_&&y!==s&&y!==a&&Jn(o,u,l,d,h,p,y.x,y.y)&&dt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Uf(n,e,t){let i=n;do{const s=i.prev,r=i.next.next;!ra(s,r)&&jh(s,i,i.next,r)&&zs(s,r)&&zs(r,s)&&(e.push(s.i/t|0),e.push(i.i/t|0),e.push(r.i/t|0),ks(i),ks(i.next),i=n=r),i=i.next}while(i!==n);return Tn(i)}function Ff(n,e,t,i,s,r){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Wf(a,o)){let l=Jh(a,o);a=Tn(a,a.next),l=Tn(l,l.next),Vs(a,e,t,i,s,r,0),Vs(l,e,t,i,s,r,0);return}o=o.next}a=a.next}while(a!==n)}function Nf(n,e,t,i){const s=[];let r,a,o,l,h;for(r=0,a=e.length;r<a;r++)o=e[r]*i,l=r<a-1?e[r+1]*i:n.length,h=Zh(n,o,l,i,!1),h===h.next&&(h.steiner=!0),s.push(Gf(h));for(s.sort(Of),r=0;r<s.length;r++)t=Bf(s[r],t);return t}function Of(n,e){return n.x-e.x}function Bf(n,e){const t=Vf(n,e);if(!t)return e;const i=Jh(t,n);return Tn(i,i.next),Tn(t,t.next)}function Vf(n,e){let t=e,i=-1/0,s;const r=n.x,a=n.y;do{if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){const p=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(p<=r&&p>i&&(i=p,s=t.x<t.next.x?t:t.next,p===r))return s}t=t.next}while(t!==e);if(!s)return null;const o=s,l=s.x,h=s.y;let u=1/0,d;t=s;do r>=t.x&&t.x>=l&&r!==t.x&&Jn(a<h?r:i,a,l,h,a<h?i:r,a,t.x,t.y)&&(d=Math.abs(a-t.y)/(r-t.x),zs(t,n)&&(d<u||d===u&&(t.x>s.x||t.x===s.x&&zf(s,t)))&&(s=t,u=d)),t=t.next;while(t!==o);return s}function zf(n,e){return dt(n.prev,n,e.prev)<0&&dt(e.next,n,n.next)<0}function kf(n,e,t,i){let s=n;do s.z===0&&(s.z=Yo(s.x,s.y,e,t,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,Hf(s)}function Hf(n){let e,t,i,s,r,a,o,l,h=1;do{for(t=n,n=null,r=null,a=0;t;){for(a++,i=t,o=0,e=0;e<h&&(o++,i=i.nextZ,!!i);e++);for(l=h;o>0||l>0&&i;)o!==0&&(l===0||!i||t.z<=i.z)?(s=t,t=t.nextZ,o--):(s=i,i=i.nextZ,l--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;t=i}r.nextZ=null,h*=2}while(a>1);return n}function Yo(n,e,t,i,s){return n=(n-t)*s|0,e=(e-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function Gf(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function Jn(n,e,t,i,s,r,a,o){return(s-a)*(e-o)>=(n-a)*(r-o)&&(n-a)*(i-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(i-o)}function Wf(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!Xf(n,e)&&(zs(n,e)&&zs(e,n)&&qf(n,e)&&(dt(n.prev,n,e.prev)||dt(n,e.prev,e))||ra(n,e)&&dt(n.prev,n,n.next)>0&&dt(e.prev,e,e.next)>0)}function dt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function ra(n,e){return n.x===e.x&&n.y===e.y}function jh(n,e,t,i){const s=br(dt(n,e,t)),r=br(dt(n,e,i)),a=br(dt(t,i,n)),o=br(dt(t,i,e));return!!(s!==r&&a!==o||s===0&&Mr(n,t,e)||r===0&&Mr(n,i,e)||a===0&&Mr(t,n,i)||o===0&&Mr(t,e,i))}function Mr(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function br(n){return n>0?1:n<0?-1:0}function Xf(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&jh(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function zs(n,e){return dt(n.prev,n,n.next)<0?dt(n,e,n.next)>=0&&dt(n,n.prev,e)>=0:dt(n,e,n.prev)<0||dt(n,n.next,e)<0}function qf(n,e){let t=n,i=!1;const s=(n.x+e.x)/2,r=(n.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function Jh(n,e){const t=new $o(n.i,n.x,n.y),i=new $o(e.i,e.x,e.y),s=n.next,r=e.prev;return n.next=e,e.prev=n,t.next=s,s.prev=t,i.next=t,t.prev=i,r.next=i,i.prev=r,i}function fc(n,e,t,i){const s=new $o(n,e,t);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function ks(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function $o(n,e,t){this.i=n,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Yf(n,e,t,i){let s=0;for(let r=e,a=t-i;r<t;r+=i)s+=(n[a]-n[r])*(n[r+1]+n[a+1]),a=r;return s}class Us{static area(e){const t=e.length;let i=0;for(let s=t-1,r=0;r<t;s=r++)i+=e[s].x*e[r].y-e[r].x*e[s].y;return i*.5}static isClockWise(e){return Us.area(e)<0}static triangulateShape(e,t){const i=[],s=[],r=[];pc(e),mc(i,e);let a=e.length;t.forEach(pc);for(let l=0;l<t.length;l++)s.push(a),a+=t[l].length,mc(i,t[l]);const o=If.triangulate(i,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function pc(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function mc(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class Qh extends xt{constructor(e=new Rf([new ue(.5,.5),new ue(-.5,.5),new ue(-.5,-.5),new ue(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const i=this,s=[],r=[];for(let o=0,l=e.length;o<l;o++){const h=e[o];a(h)}this.setAttribute("position",new Ze(s,3)),this.setAttribute("uv",new Ze(r,2)),this.computeVertexNormals();function a(o){const l=[],h=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1;let p=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,x=t.bevelSize!==void 0?t.bevelSize:f-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,_=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,M=t.UVGenerator!==void 0?t.UVGenerator:$f;let b,y=!1,I,A,P,L;m&&(b=m.getSpacedPoints(u),y=!0,p=!1,I=m.computeFrenetFrames(u,!1),A=new T,P=new T,L=new T),p||(_=0,f=0,x=0,v=0);const E=o.extractPoints(h);let S=E.shape;const R=E.holes;if(!Us.isClockWise(S)){S=S.reverse();for(let ae=0,te=R.length;ae<te;ae++){const U=R[ae];Us.isClockWise(U)&&(R[ae]=U.reverse())}}const O=Us.triangulateShape(S,R),V=S;for(let ae=0,te=R.length;ae<te;ae++){const U=R[ae];S=S.concat(U)}function K(ae,te,U){return te||console.error("THREE.ExtrudeGeometry: vec does not exist"),ae.clone().addScaledVector(te,U)}const z=S.length,q=O.length;function N(ae,te,U){let Ue,fe,Pe;const _e=ae.x-te.x,ze=ae.y-te.y,Se=U.x-ae.x,D=U.y-ae.y,w=_e*_e+ze*ze,$=_e*D-ze*Se;if(Math.abs($)>Number.EPSILON){const ne=Math.sqrt(w),ce=Math.sqrt(Se*Se+D*D),se=te.x-ze/ne,Fe=te.y+_e/ne,ve=U.x-D/ce,Ae=U.y+Se/ce,je=((ve-se)*D-(Ae-Fe)*Se)/(_e*D-ze*Se);Ue=se+_e*je-ae.x,fe=Fe+ze*je-ae.y;const me=Ue*Ue+fe*fe;if(me<=2)return new ue(Ue,fe);Pe=Math.sqrt(me/2)}else{let ne=!1;_e>Number.EPSILON?Se>Number.EPSILON&&(ne=!0):_e<-Number.EPSILON?Se<-Number.EPSILON&&(ne=!0):Math.sign(ze)===Math.sign(D)&&(ne=!0),ne?(Ue=-ze,fe=_e,Pe=Math.sqrt(w)):(Ue=_e,fe=ze,Pe=Math.sqrt(w/2))}return new ue(Ue/Pe,fe/Pe)}const k=[];for(let ae=0,te=V.length,U=te-1,Ue=ae+1;ae<te;ae++,U++,Ue++)U===te&&(U=0),Ue===te&&(Ue=0),k[ae]=N(V[ae],V[U],V[Ue]);const j=[];let ie,de=k.concat();for(let ae=0,te=R.length;ae<te;ae++){const U=R[ae];ie=[];for(let Ue=0,fe=U.length,Pe=fe-1,_e=Ue+1;Ue<fe;Ue++,Pe++,_e++)Pe===fe&&(Pe=0),_e===fe&&(_e=0),ie[Ue]=N(U[Ue],U[Pe],U[_e]);j.push(ie),de=de.concat(ie)}for(let ae=0;ae<_;ae++){const te=ae/_,U=f*Math.cos(te*Math.PI/2),Ue=x*Math.sin(te*Math.PI/2)+v;for(let fe=0,Pe=V.length;fe<Pe;fe++){const _e=K(V[fe],k[fe],Ue);re(_e.x,_e.y,-U)}for(let fe=0,Pe=R.length;fe<Pe;fe++){const _e=R[fe];ie=j[fe];for(let ze=0,Se=_e.length;ze<Se;ze++){const D=K(_e[ze],ie[ze],Ue);re(D.x,D.y,-U)}}}const we=x+v;for(let ae=0;ae<z;ae++){const te=p?K(S[ae],de[ae],we):S[ae];y?(P.copy(I.normals[0]).multiplyScalar(te.x),A.copy(I.binormals[0]).multiplyScalar(te.y),L.copy(b[0]).add(P).add(A),re(L.x,L.y,L.z)):re(te.x,te.y,0)}for(let ae=1;ae<=u;ae++)for(let te=0;te<z;te++){const U=p?K(S[te],de[te],we):S[te];y?(P.copy(I.normals[ae]).multiplyScalar(U.x),A.copy(I.binormals[ae]).multiplyScalar(U.y),L.copy(b[ae]).add(P).add(A),re(L.x,L.y,L.z)):re(U.x,U.y,d/u*ae)}for(let ae=_-1;ae>=0;ae--){const te=ae/_,U=f*Math.cos(te*Math.PI/2),Ue=x*Math.sin(te*Math.PI/2)+v;for(let fe=0,Pe=V.length;fe<Pe;fe++){const _e=K(V[fe],k[fe],Ue);re(_e.x,_e.y,d+U)}for(let fe=0,Pe=R.length;fe<Pe;fe++){const _e=R[fe];ie=j[fe];for(let ze=0,Se=_e.length;ze<Se;ze++){const D=K(_e[ze],ie[ze],Ue);y?re(D.x,D.y+b[u-1].y,b[u-1].x+U):re(D.x,D.y,d+U)}}}Y(),ee();function Y(){const ae=s.length/3;if(p){let te=0,U=z*te;for(let Ue=0;Ue<q;Ue++){const fe=O[Ue];be(fe[2]+U,fe[1]+U,fe[0]+U)}te=u+_*2,U=z*te;for(let Ue=0;Ue<q;Ue++){const fe=O[Ue];be(fe[0]+U,fe[1]+U,fe[2]+U)}}else{for(let te=0;te<q;te++){const U=O[te];be(U[2],U[1],U[0])}for(let te=0;te<q;te++){const U=O[te];be(U[0]+z*u,U[1]+z*u,U[2]+z*u)}}i.addGroup(ae,s.length/3-ae,0)}function ee(){const ae=s.length/3;let te=0;he(V,te),te+=V.length;for(let U=0,Ue=R.length;U<Ue;U++){const fe=R[U];he(fe,te),te+=fe.length}i.addGroup(ae,s.length/3-ae,1)}function he(ae,te){let U=ae.length;for(;--U>=0;){const Ue=U;let fe=U-1;fe<0&&(fe=ae.length-1);for(let Pe=0,_e=u+_*2;Pe<_e;Pe++){const ze=z*Pe,Se=z*(Pe+1),D=te+Ue+ze,w=te+fe+ze,$=te+fe+Se,ne=te+Ue+Se;De(D,w,$,ne)}}}function re(ae,te,U){l.push(ae),l.push(te),l.push(U)}function be(ae,te,U){ge(ae),ge(te),ge(U);const Ue=s.length/3,fe=M.generateTopUV(i,s,Ue-3,Ue-2,Ue-1);Be(fe[0]),Be(fe[1]),Be(fe[2])}function De(ae,te,U,Ue){ge(ae),ge(te),ge(Ue),ge(te),ge(U),ge(Ue);const fe=s.length/3,Pe=M.generateSideWallUV(i,s,fe-6,fe-3,fe-2,fe-1);Be(Pe[0]),Be(Pe[1]),Be(Pe[3]),Be(Pe[1]),Be(Pe[2]),Be(Pe[3])}function ge(ae){s.push(l[ae*3+0]),s.push(l[ae*3+1]),s.push(l[ae*3+2])}function Be(ae){r.push(ae.x),r.push(ae.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return Kf(t,i,e)}static fromJSON(e,t){const i=[];for(let r=0,a=e.shapes.length;r<a;r++){const o=t[e.shapes[r]];i.push(o)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Kr[s.type]().fromJSON(s)),new Qh(i,e.options)}}const $f={generateTopUV:function(n,e,t,i,s){const r=e[t*3],a=e[t*3+1],o=e[i*3],l=e[i*3+1],h=e[s*3],u=e[s*3+1];return[new ue(r,a),new ue(o,l),new ue(h,u)]},generateSideWallUV:function(n,e,t,i,s,r){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],h=e[i*3],u=e[i*3+1],d=e[i*3+2],p=e[s*3],f=e[s*3+1],x=e[s*3+2],v=e[r*3],_=e[r*3+1],m=e[r*3+2];return Math.abs(o-u)<Math.abs(a-h)?[new ue(a,1-l),new ue(h,1-d),new ue(p,1-x),new ue(v,1-m)]:[new ue(o,1-l),new ue(u,1-d),new ue(f,1-x),new ue(_,1-m)]}};function Kf(n,e,t){if(t.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){const r=n[i];t.shapes.push(r.uuid)}else t.shapes.push(n.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class eu extends sa{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new eu(e.radius,e.detail)}}class Xs extends xt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),h=o+1,u=l+1,d=e/o,p=t/l,f=[],x=[],v=[],_=[];for(let m=0;m<u;m++){const M=m*p-a;for(let b=0;b<h;b++){const y=b*d-r;x.push(y,-M,0),v.push(0,0,1),_.push(b/o),_.push(1-m/l)}}for(let m=0;m<l;m++)for(let M=0;M<o;M++){const b=M+h*m,y=M+h*(m+1),I=M+1+h*(m+1),A=M+1+h*m;f.push(b,y,A),f.push(y,I,A)}this.setIndex(f),this.setAttribute("position",new Ze(x,3)),this.setAttribute("normal",new Ze(v,3)),this.setAttribute("uv",new Ze(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xs(e.width,e.height,e.widthSegments,e.heightSegments)}}class tu extends xt{constructor(e=.5,t=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);const o=[],l=[],h=[],u=[];let d=e;const p=(t-e)/s,f=new T,x=new ue;for(let v=0;v<=s;v++){for(let _=0;_<=i;_++){const m=r+_/i*a;f.x=d*Math.cos(m),f.y=d*Math.sin(m),l.push(f.x,f.y,f.z),h.push(0,0,1),x.x=(f.x/t+1)/2,x.y=(f.y/t+1)/2,u.push(x.x,x.y)}d+=p}for(let v=0;v<s;v++){const _=v*(i+1);for(let m=0;m<i;m++){const M=m+_,b=M,y=M+i+1,I=M+i+2,A=M+1;o.push(b,y,A),o.push(y,I,A)}}this.setIndex(o),this.setAttribute("position",new Ze(l,3)),this.setAttribute("normal",new Ze(h,3)),this.setAttribute("uv",new Ze(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new tu(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class iu extends xt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let h=0;const u=[],d=new T,p=new T,f=[],x=[],v=[],_=[];for(let m=0;m<=i;m++){const M=[],b=m/i;let y=0;m===0&&a===0?y=.5/t:m===i&&l===Math.PI&&(y=-.5/t);for(let I=0;I<=t;I++){const A=I/t;d.x=-e*Math.cos(s+A*r)*Math.sin(a+b*o),d.y=e*Math.cos(a+b*o),d.z=e*Math.sin(s+A*r)*Math.sin(a+b*o),x.push(d.x,d.y,d.z),p.copy(d).normalize(),v.push(p.x,p.y,p.z),_.push(A+y,1-b),M.push(h++)}u.push(M)}for(let m=0;m<i;m++)for(let M=0;M<t;M++){const b=u[m][M+1],y=u[m][M],I=u[m+1][M],A=u[m+1][M+1];(m!==0||a>0)&&f.push(b,y,A),(m!==i-1||l<Math.PI)&&f.push(y,I,A)}this.setIndex(f),this.setAttribute("position",new Ze(x,3)),this.setAttribute("normal",new Ze(v,3)),this.setAttribute("uv",new Ze(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new iu(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class nu extends sa{constructor(e=1,t=0){const i=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],s=[2,1,0,0,3,2,1,3,0,2,3,1];super(i,s,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new nu(e.radius,e.detail)}}class su extends xt{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const a=[],o=[],l=[],h=[],u=new T,d=new T,p=new T;for(let f=0;f<=i;f++)for(let x=0;x<=s;x++){const v=x/s*r,_=f/i*Math.PI*2;d.x=(e+t*Math.cos(_))*Math.cos(v),d.y=(e+t*Math.cos(_))*Math.sin(v),d.z=t*Math.sin(_),o.push(d.x,d.y,d.z),u.x=e*Math.cos(v),u.y=e*Math.sin(v),p.subVectors(d,u).normalize(),l.push(p.x,p.y,p.z),h.push(x/s),h.push(f/i)}for(let f=1;f<=i;f++)for(let x=1;x<=s;x++){const v=(s+1)*f+x-1,_=(s+1)*(f-1)+x-1,m=(s+1)*(f-1)+x,M=(s+1)*f+x;a.push(v,_,M),a.push(_,m,M)}this.setIndex(a),this.setAttribute("position",new Ze(o,3)),this.setAttribute("normal",new Ze(l,3)),this.setAttribute("uv",new Ze(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new su(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class ru extends xt{constructor(e=new Xh(new T(-1,-1,0),new T(-1,1,0),new T(1,1,0)),t=64,i=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:i,radialSegments:s,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new T,l=new T,h=new ue;let u=new T;const d=[],p=[],f=[],x=[];v(),this.setIndex(x),this.setAttribute("position",new Ze(d,3)),this.setAttribute("normal",new Ze(p,3)),this.setAttribute("uv",new Ze(f,2));function v(){for(let b=0;b<t;b++)_(b);_(r===!1?t:0),M(),m()}function _(b){u=e.getPointAt(b/t,u);const y=a.normals[b],I=a.binormals[b];for(let A=0;A<=s;A++){const P=A/s*Math.PI*2,L=Math.sin(P),E=-Math.cos(P);l.x=E*y.x+L*I.x,l.y=E*y.y+L*I.y,l.z=E*y.z+L*I.z,l.normalize(),p.push(l.x,l.y,l.z),o.x=u.x+i*l.x,o.y=u.y+i*l.y,o.z=u.z+i*l.z,d.push(o.x,o.y,o.z)}}function m(){for(let b=1;b<=t;b++)for(let y=1;y<=s;y++){const I=(s+1)*(b-1)+(y-1),A=(s+1)*b+(y-1),P=(s+1)*b+y,L=(s+1)*(b-1)+y;x.push(I,A,L),x.push(A,P,L)}}function M(){for(let b=0;b<=t;b++)for(let y=0;y<=s;y++)h.x=b/t,h.y=y/s,f.push(h.x,h.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new ru(new Kr[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class Zf extends ri{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Ve(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}class Ko extends ri{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ve(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Gs,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new si,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class gc extends Ko{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ue(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Xe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ve(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ve(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ve(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class _c extends ri{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Ve(16777215),this.specular=new Ve(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Gs,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new si,this.combine=jr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Sr extends ri{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Gs,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new si,this.combine=jr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class jf extends ri{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=rd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Jf extends ri{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class ka extends ri{constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new Ve(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Gs,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Qf extends ia{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class au extends Et{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ve(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class ep extends au{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ve(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ha=new st,xc=new T,vc=new T;class tp{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ue(512,512),this.map=null,this.mapPass=null,this.matrix=new st,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ta,this._frameExtents=new ue(1,1),this._viewportCount=1,this._viewports=[new _t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;xc.setFromMatrixPosition(e.matrixWorld),t.position.copy(xc),vc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(vc),t.updateMatrixWorld(),Ha.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ha),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ha)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class ou extends Bh{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=h*this.view.offsetX,a=r+h*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class ip extends tp{constructor(){super(new ou(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ga extends au{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.target=new Et,this.shadow=new ip}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class np extends ii{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}class sp{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=yc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=yc();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function yc(){return performance.now()}const Mc=new st;class rp{constructor(e,t,i=0,s=1/0){this.ray=new ea(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new hl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Mc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Mc),this}intersectObject(e,t=!0,i=[]){return Zo(e,this,i,t),i.sort(bc),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)Zo(e[s],this,i,t);return i.sort(bc),i}}function bc(n,e){return n.distance-e.distance}function Zo(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let a=0,o=r.length;a<o;a++)Zo(r[a],e,t,!0)}}class Sc{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Xe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Xe(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Ec=new T;let Er,Wa;class Vx extends Et{constructor(e=new T(0,0,1),t=new T(0,0,0),i=1,s=16776960,r=i*.2,a=r*.2){super(),this.type="ArrowHelper",Er===void 0&&(Er=new xt,Er.setAttribute("position",new Ze([0,0,0,0,1,0],3)),Wa=new na(0,.5,1,5,1),Wa.translate(0,-.5,0)),this.position.copy(t),this.line=new zh(Er,new ia({color:s,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Ct(Wa,new Bs({color:s,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(i,r,a)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Ec.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Ec,t)}}setLength(e,t=e*.2,i=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(i,t,i),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class ap extends Pn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function wc(n,e,t,i){const s=op(i);switch(t){case wh:return n*e;case Ah:return n*e;case Ph:return n*e*2;case rl:return n*e/s.components*s.byteLength;case Qr:return n*e/s.components*s.byteLength;case Ch:return n*e*2/s.components*s.byteLength;case al:return n*e*2/s.components*s.byteLength;case Th:return n*e*3/s.components*s.byteLength;case bt:return n*e*4/s.components*s.byteLength;case ol:return n*e*4/s.components*s.byteLength;case Or:case Br:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Vr:case zr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case bo:case Eo:return Math.max(n,16)*Math.max(e,8)/4;case Mo:case So:return Math.max(n,8)*Math.max(e,8)/2;case wo:case To:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ao:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Po:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Co:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Ro:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Io:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Lo:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Do:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Uo:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Fo:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case No:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Oo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Bo:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Vo:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case zo:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case ko:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case kr:case Ho:case Go:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Rh:case Wo:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Xo:case qo:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function op(n){switch(n){case Ni:case bh:return{byteLength:1,components:1};case Ns:case Sh:case Hs:return{byteLength:2,components:1};case nl:case sl:return{byteLength:2,components:4};case Ji:case il:case Kt:return{byteLength:4,components:1};case Eh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:tl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=tl);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function lu(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function lp(n){const e=new WeakMap;function t(o,l){const h=o.array,u=o.usage,d=h.byteLength,p=n.createBuffer();n.bindBuffer(l,p),n.bufferData(l,h,u),o.onUploadCallback();let f;if(h instanceof Float32Array)f=n.FLOAT;else if(h instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(h instanceof Int16Array)f=n.SHORT;else if(h instanceof Uint32Array)f=n.UNSIGNED_INT;else if(h instanceof Int32Array)f=n.INT;else if(h instanceof Int8Array)f=n.BYTE;else if(h instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:p,type:f,bytesPerElement:h.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,h){const u=l.array,d=l.updateRanges;if(n.bindBuffer(h,o),d.length===0)n.bufferSubData(h,0,u);else{d.sort((f,x)=>f.start-x.start);let p=0;for(let f=1;f<d.length;f++){const x=d[p],v=d[f];v.start<=x.start+x.count+1?x.count=Math.max(x.count,v.start+v.count-x.start):(++p,d[p]=v)}d.length=p+1;for(let f=0,x=d.length;f<x;f++){const v=d[f];n.bufferSubData(h,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const h=e.get(o);if(h===void 0)e.set(o,t(o,l));else if(h.version<o.version){if(h.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(h.buffer,o,l),h.version=o.version}}return{get:s,remove:r,update:a}}var cp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,hp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,up=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,dp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,pp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,mp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,gp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,_p=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,xp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,vp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,yp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Mp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,bp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Sp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Ep=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,wp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Tp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ap=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Pp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Cp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Rp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ip=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Lp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Dp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Up=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Fp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Np=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Op=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Bp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Vp="gl_FragColor = linearToOutputTexel( gl_FragColor );",zp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,kp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Hp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Gp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Wp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Xp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,qp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Yp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,$p=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Kp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Zp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,jp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Jp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Qp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,em=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,tm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,im=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,nm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,sm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,rm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,am=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,om=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,cm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,hm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,um=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,dm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,mm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,gm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_m=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,xm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ym=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Mm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,bm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Sm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Em=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,wm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Tm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Am=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Pm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Im=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Lm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Dm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Um=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Fm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Nm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Om=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Bm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Vm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,zm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,km=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Hm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Gm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Wm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Xm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,qm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ym=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,$m=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Km=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Zm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Jm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Qm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,eg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ig=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ng=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,sg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,rg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ag=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,og=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const lg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,cg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ug=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,mg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,gg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,_g=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,xg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,vg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Mg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,bg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Sg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Eg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ag=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Cg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Rg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ig=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Dg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ug=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ng=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Og=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Bg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,zg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,kg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ke={alphahash_fragment:cp,alphahash_pars_fragment:hp,alphamap_fragment:up,alphamap_pars_fragment:dp,alphatest_fragment:fp,alphatest_pars_fragment:pp,aomap_fragment:mp,aomap_pars_fragment:gp,batching_pars_vertex:_p,batching_vertex:xp,begin_vertex:vp,beginnormal_vertex:yp,bsdfs:Mp,iridescence_fragment:bp,bumpmap_pars_fragment:Sp,clipping_planes_fragment:Ep,clipping_planes_pars_fragment:wp,clipping_planes_pars_vertex:Tp,clipping_planes_vertex:Ap,color_fragment:Pp,color_pars_fragment:Cp,color_pars_vertex:Rp,color_vertex:Ip,common:Lp,cube_uv_reflection_fragment:Dp,defaultnormal_vertex:Up,displacementmap_pars_vertex:Fp,displacementmap_vertex:Np,emissivemap_fragment:Op,emissivemap_pars_fragment:Bp,colorspace_fragment:Vp,colorspace_pars_fragment:zp,envmap_fragment:kp,envmap_common_pars_fragment:Hp,envmap_pars_fragment:Gp,envmap_pars_vertex:Wp,envmap_physical_pars_fragment:tm,envmap_vertex:Xp,fog_vertex:qp,fog_pars_vertex:Yp,fog_fragment:$p,fog_pars_fragment:Kp,gradientmap_pars_fragment:Zp,lightmap_pars_fragment:jp,lights_lambert_fragment:Jp,lights_lambert_pars_fragment:Qp,lights_pars_begin:em,lights_toon_fragment:im,lights_toon_pars_fragment:nm,lights_phong_fragment:sm,lights_phong_pars_fragment:rm,lights_physical_fragment:am,lights_physical_pars_fragment:om,lights_fragment_begin:lm,lights_fragment_maps:cm,lights_fragment_end:hm,logdepthbuf_fragment:um,logdepthbuf_pars_fragment:dm,logdepthbuf_pars_vertex:fm,logdepthbuf_vertex:pm,map_fragment:mm,map_pars_fragment:gm,map_particle_fragment:_m,map_particle_pars_fragment:xm,metalnessmap_fragment:vm,metalnessmap_pars_fragment:ym,morphinstance_vertex:Mm,morphcolor_vertex:bm,morphnormal_vertex:Sm,morphtarget_pars_vertex:Em,morphtarget_vertex:wm,normal_fragment_begin:Tm,normal_fragment_maps:Am,normal_pars_fragment:Pm,normal_pars_vertex:Cm,normal_vertex:Rm,normalmap_pars_fragment:Im,clearcoat_normal_fragment_begin:Lm,clearcoat_normal_fragment_maps:Dm,clearcoat_pars_fragment:Um,iridescence_pars_fragment:Fm,opaque_fragment:Nm,packing:Om,premultiplied_alpha_fragment:Bm,project_vertex:Vm,dithering_fragment:zm,dithering_pars_fragment:km,roughnessmap_fragment:Hm,roughnessmap_pars_fragment:Gm,shadowmap_pars_fragment:Wm,shadowmap_pars_vertex:Xm,shadowmap_vertex:qm,shadowmask_pars_fragment:Ym,skinbase_vertex:$m,skinning_pars_vertex:Km,skinning_vertex:Zm,skinnormal_vertex:jm,specularmap_fragment:Jm,specularmap_pars_fragment:Qm,tonemapping_fragment:eg,tonemapping_pars_fragment:tg,transmission_fragment:ig,transmission_pars_fragment:ng,uv_pars_fragment:sg,uv_pars_vertex:rg,uv_vertex:ag,worldpos_vertex:og,background_vert:lg,background_frag:cg,backgroundCube_vert:hg,backgroundCube_frag:ug,cube_vert:dg,cube_frag:fg,depth_vert:pg,depth_frag:mg,distanceRGBA_vert:gg,distanceRGBA_frag:_g,equirect_vert:xg,equirect_frag:vg,linedashed_vert:yg,linedashed_frag:Mg,meshbasic_vert:bg,meshbasic_frag:Sg,meshlambert_vert:Eg,meshlambert_frag:wg,meshmatcap_vert:Tg,meshmatcap_frag:Ag,meshnormal_vert:Pg,meshnormal_frag:Cg,meshphong_vert:Rg,meshphong_frag:Ig,meshphysical_vert:Lg,meshphysical_frag:Dg,meshtoon_vert:Ug,meshtoon_frag:Fg,points_vert:Ng,points_frag:Og,shadow_vert:Bg,shadow_frag:Vg,sprite_vert:zg,sprite_frag:kg},xe={common:{diffuse:{value:new Ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},envMapRotation:{value:new Ye},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new Ve(16777215)},opacity:{value:1},center:{value:new ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},gi={basic:{uniforms:Ot([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.fog]),vertexShader:Ke.meshbasic_vert,fragmentShader:Ke.meshbasic_frag},lambert:{uniforms:Ot([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new Ve(0)}}]),vertexShader:Ke.meshlambert_vert,fragmentShader:Ke.meshlambert_frag},phong:{uniforms:Ot([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new Ve(0)},specular:{value:new Ve(1118481)},shininess:{value:30}}]),vertexShader:Ke.meshphong_vert,fragmentShader:Ke.meshphong_frag},standard:{uniforms:Ot([xe.common,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.roughnessmap,xe.metalnessmap,xe.fog,xe.lights,{emissive:{value:new Ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag},toon:{uniforms:Ot([xe.common,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.gradientmap,xe.fog,xe.lights,{emissive:{value:new Ve(0)}}]),vertexShader:Ke.meshtoon_vert,fragmentShader:Ke.meshtoon_frag},matcap:{uniforms:Ot([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,{matcap:{value:null}}]),vertexShader:Ke.meshmatcap_vert,fragmentShader:Ke.meshmatcap_frag},points:{uniforms:Ot([xe.points,xe.fog]),vertexShader:Ke.points_vert,fragmentShader:Ke.points_frag},dashed:{uniforms:Ot([xe.common,xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ke.linedashed_vert,fragmentShader:Ke.linedashed_frag},depth:{uniforms:Ot([xe.common,xe.displacementmap]),vertexShader:Ke.depth_vert,fragmentShader:Ke.depth_frag},normal:{uniforms:Ot([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,{opacity:{value:1}}]),vertexShader:Ke.meshnormal_vert,fragmentShader:Ke.meshnormal_frag},sprite:{uniforms:Ot([xe.sprite,xe.fog]),vertexShader:Ke.sprite_vert,fragmentShader:Ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ke.background_vert,fragmentShader:Ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ye}},vertexShader:Ke.backgroundCube_vert,fragmentShader:Ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ke.cube_vert,fragmentShader:Ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ke.equirect_vert,fragmentShader:Ke.equirect_frag},distanceRGBA:{uniforms:Ot([xe.common,xe.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ke.distanceRGBA_vert,fragmentShader:Ke.distanceRGBA_frag},shadow:{uniforms:Ot([xe.lights,xe.fog,{color:{value:new Ve(0)},opacity:{value:1}}]),vertexShader:Ke.shadow_vert,fragmentShader:Ke.shadow_frag}};gi.physical={uniforms:Ot([gi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new Ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new Ve(0)},specularColor:{value:new Ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag};const wr={r:0,b:0,g:0},hn=new si,Hg=new st;function Gg(n,e,t,i,s,r,a){const o=new Ve(0);let l=r===!0?0:1,h,u,d=null,p=0,f=null;function x(b){let y=b.isScene===!0?b.background:null;return y&&y.isTexture&&(y=(b.backgroundBlurriness>0?t:e).get(y)),y}function v(b){let y=!1;const I=x(b);I===null?m(o,l):I&&I.isColor&&(m(I,1),y=!0);const A=n.xr.getEnvironmentBlendMode();A==="additive"?i.buffers.color.setClear(0,0,0,1,a):A==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function _(b,y){const I=x(y);I&&(I.isCubeTexture||I.mapping===Jr)?(u===void 0&&(u=new Ct(new Ws(1,1,1),new en({name:"BackgroundCubeMaterial",uniforms:fs(gi.backgroundCube.uniforms),vertexShader:gi.backgroundCube.vertexShader,fragmentShader:gi.backgroundCube.fragmentShader,side:Gt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,P,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),hn.copy(y.backgroundRotation),hn.x*=-1,hn.y*=-1,hn.z*=-1,I.isCubeTexture&&I.isRenderTargetTexture===!1&&(hn.y*=-1,hn.z*=-1),u.material.uniforms.envMap.value=I,u.material.uniforms.flipEnvMap.value=I.isCubeTexture&&I.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Hg.makeRotationFromEuler(hn)),u.material.toneMapped=et.getTransfer(I.colorSpace)!==at,(d!==I||p!==I.version||f!==n.toneMapping)&&(u.material.needsUpdate=!0,d=I,p=I.version,f=n.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null)):I&&I.isTexture&&(h===void 0&&(h=new Ct(new Xs(2,2),new en({name:"BackgroundMaterial",uniforms:fs(gi.background.uniforms),vertexShader:gi.background.vertexShader,fragmentShader:gi.background.fragmentShader,side:$t,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(h)),h.material.uniforms.t2D.value=I,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.toneMapped=et.getTransfer(I.colorSpace)!==at,I.matrixAutoUpdate===!0&&I.updateMatrix(),h.material.uniforms.uvTransform.value.copy(I.matrix),(d!==I||p!==I.version||f!==n.toneMapping)&&(h.material.needsUpdate=!0,d=I,p=I.version,f=n.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null))}function m(b,y){b.getRGB(wr,Oh(n)),i.buffers.color.setClear(wr.r,wr.g,wr.b,y,a)}function M(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,y=1){o.set(b),l=y,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,m(o,l)},render:v,addToRenderList:_,dispose:M}}function Wg(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=p(null);let r=s,a=!1;function o(S,R,F,O,V){let K=!1;const z=d(O,F,R);r!==z&&(r=z,h(r.object)),K=f(S,O,F,V),K&&x(S,O,F,V),V!==null&&e.update(V,n.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,y(S,R,F,O),V!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function l(){return n.createVertexArray()}function h(S){return n.bindVertexArray(S)}function u(S){return n.deleteVertexArray(S)}function d(S,R,F){const O=F.wireframe===!0;let V=i[S.id];V===void 0&&(V={},i[S.id]=V);let K=V[R.id];K===void 0&&(K={},V[R.id]=K);let z=K[O];return z===void 0&&(z=p(l()),K[O]=z),z}function p(S){const R=[],F=[],O=[];for(let V=0;V<t;V++)R[V]=0,F[V]=0,O[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:F,attributeDivisors:O,object:S,attributes:{},index:null}}function f(S,R,F,O){const V=r.attributes,K=R.attributes;let z=0;const q=F.getAttributes();for(const N in q)if(q[N].location>=0){const j=V[N];let ie=K[N];if(ie===void 0&&(N==="instanceMatrix"&&S.instanceMatrix&&(ie=S.instanceMatrix),N==="instanceColor"&&S.instanceColor&&(ie=S.instanceColor)),j===void 0||j.attribute!==ie||ie&&j.data!==ie.data)return!0;z++}return r.attributesNum!==z||r.index!==O}function x(S,R,F,O){const V={},K=R.attributes;let z=0;const q=F.getAttributes();for(const N in q)if(q[N].location>=0){let j=K[N];j===void 0&&(N==="instanceMatrix"&&S.instanceMatrix&&(j=S.instanceMatrix),N==="instanceColor"&&S.instanceColor&&(j=S.instanceColor));const ie={};ie.attribute=j,j&&j.data&&(ie.data=j.data),V[N]=ie,z++}r.attributes=V,r.attributesNum=z,r.index=O}function v(){const S=r.newAttributes;for(let R=0,F=S.length;R<F;R++)S[R]=0}function _(S){m(S,0)}function m(S,R){const F=r.newAttributes,O=r.enabledAttributes,V=r.attributeDivisors;F[S]=1,O[S]===0&&(n.enableVertexAttribArray(S),O[S]=1),V[S]!==R&&(n.vertexAttribDivisor(S,R),V[S]=R)}function M(){const S=r.newAttributes,R=r.enabledAttributes;for(let F=0,O=R.length;F<O;F++)R[F]!==S[F]&&(n.disableVertexAttribArray(F),R[F]=0)}function b(S,R,F,O,V,K,z){z===!0?n.vertexAttribIPointer(S,R,F,V,K):n.vertexAttribPointer(S,R,F,O,V,K)}function y(S,R,F,O){v();const V=O.attributes,K=F.getAttributes(),z=R.defaultAttributeValues;for(const q in K){const N=K[q];if(N.location>=0){let k=V[q];if(k===void 0&&(q==="instanceMatrix"&&S.instanceMatrix&&(k=S.instanceMatrix),q==="instanceColor"&&S.instanceColor&&(k=S.instanceColor)),k!==void 0){const j=k.normalized,ie=k.itemSize,de=e.get(k);if(de===void 0)continue;const we=de.buffer,Y=de.type,ee=de.bytesPerElement,he=Y===n.INT||Y===n.UNSIGNED_INT||k.gpuType===il;if(k.isInterleavedBufferAttribute){const re=k.data,be=re.stride,De=k.offset;if(re.isInstancedInterleavedBuffer){for(let ge=0;ge<N.locationSize;ge++)m(N.location+ge,re.meshPerAttribute);S.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let ge=0;ge<N.locationSize;ge++)_(N.location+ge);n.bindBuffer(n.ARRAY_BUFFER,we);for(let ge=0;ge<N.locationSize;ge++)b(N.location+ge,ie/N.locationSize,Y,j,be*ee,(De+ie/N.locationSize*ge)*ee,he)}else{if(k.isInstancedBufferAttribute){for(let re=0;re<N.locationSize;re++)m(N.location+re,k.meshPerAttribute);S.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let re=0;re<N.locationSize;re++)_(N.location+re);n.bindBuffer(n.ARRAY_BUFFER,we);for(let re=0;re<N.locationSize;re++)b(N.location+re,ie/N.locationSize,Y,j,ie*ee,ie/N.locationSize*re*ee,he)}}else if(z!==void 0){const j=z[q];if(j!==void 0)switch(j.length){case 2:n.vertexAttrib2fv(N.location,j);break;case 3:n.vertexAttrib3fv(N.location,j);break;case 4:n.vertexAttrib4fv(N.location,j);break;default:n.vertexAttrib1fv(N.location,j)}}}}M()}function I(){L();for(const S in i){const R=i[S];for(const F in R){const O=R[F];for(const V in O)u(O[V].object),delete O[V];delete R[F]}delete i[S]}}function A(S){if(i[S.id]===void 0)return;const R=i[S.id];for(const F in R){const O=R[F];for(const V in O)u(O[V].object),delete O[V];delete R[F]}delete i[S.id]}function P(S){for(const R in i){const F=i[R];if(F[S.id]===void 0)continue;const O=F[S.id];for(const V in O)u(O[V].object),delete O[V];delete F[S.id]}}function L(){E(),a=!0,r!==s&&(r=s,h(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:L,resetDefaultState:E,dispose:I,releaseStatesOfGeometry:A,releaseStatesOfProgram:P,initAttributes:v,enableAttribute:_,disableUnusedAttributes:M}}function Xg(n,e,t){let i;function s(h){i=h}function r(h,u){n.drawArrays(i,h,u),t.update(u,i,1)}function a(h,u,d){d!==0&&(n.drawArraysInstanced(i,h,u,d),t.update(u,i,d))}function o(h,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,h,0,u,0,d);let f=0;for(let x=0;x<d;x++)f+=u[x];t.update(f,i,1)}function l(h,u,d,p){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let x=0;x<h.length;x++)a(h[x],u[x],p[x]);else{f.multiDrawArraysInstancedWEBGL(i,h,0,u,0,p,0,d);let x=0;for(let v=0;v<d;v++)x+=u[v]*p[v];t.update(x,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function qg(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==bt&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const L=P===Hs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Ni&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Kt&&!L)}function l(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=t.precision!==void 0?t.precision:"highp";const u=l(h);u!==h&&(console.warn("THREE.WebGLRenderer:",h,"not supported, using",u,"instead."),h=u);const d=t.logarithmicDepthBuffer===!0,p=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),_=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),I=x>0,A=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:h,logarithmicDepthBuffer:d,reverseDepthBuffer:p,maxTextures:f,maxVertexTextures:x,maxTextureSize:v,maxCubemapSize:_,maxAttributes:m,maxVertexUniforms:M,maxVaryings:b,maxFragmentUniforms:y,vertexTextures:I,maxSamples:A}}function Yg(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new Li,o=new Ye,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,p){const f=d.length!==0||p||i!==0||s;return s=p,i=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,p){t=u(d,p,0)},this.setState=function(d,p,f){const x=d.clippingPlanes,v=d.clipIntersection,_=d.clipShadows,m=n.get(d);if(!s||x===null||x.length===0||r&&!_)r?u(null):h();else{const M=r?0:i,b=M*4;let y=m.clippingState||null;l.value=y,y=u(x,p,b,f);for(let I=0;I!==b;++I)y[I]=t[I];m.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function h(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,p,f,x){const v=d!==null?d.length:0;let _=null;if(v!==0){if(_=l.value,x!==!0||_===null){const m=f+v*4,M=p.matrixWorldInverse;o.getNormalMatrix(M),(_===null||_.length<m)&&(_=new Float32Array(m));for(let b=0,y=f;b!==v;++b,y+=4)a.copy(d[b]).applyMatrix4(M,o),a.normal.toArray(_,y),_[y+3]=a.constant}l.value=_,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,_}}function $g(n){let e=new WeakMap;function t(a,o){return o===Fs?a.mapping=ls:o===vo&&(a.mapping=cs),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Fs||o===vo)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const h=new sf(l.height);return h.fromEquirectangularTexture(n,a),e.set(a,h),a.addEventListener("dispose",s),t(h.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}const Qn=4,Tc=[.125,.215,.35,.446,.526,.582],xn=20,Xa=new ou,Ac=new Ve;let qa=null,Ya=0,$a=0,Ka=!1;const gn=(1+Math.sqrt(5))/2,Xn=1/gn,Pc=[new T(-gn,Xn,0),new T(gn,Xn,0),new T(-Xn,0,gn),new T(Xn,0,gn),new T(0,gn,-Xn),new T(0,gn,Xn),new T(-1,1,-1),new T(1,1,-1),new T(-1,1,1),new T(1,1,1)],Kg=new T;class jo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=Kg}=r;qa=this._renderer.getRenderTarget(),Ya=this._renderer.getActiveCubeFace(),$a=this._renderer.getActiveMipmapLevel(),Ka=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ic(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Rc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(qa,Ya,$a),this._renderer.xr.enabled=Ka,e.scissorTest=!1,Tr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ls||e.mapping===cs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),qa=this._renderer.getRenderTarget(),Ya=this._renderer.getActiveCubeFace(),$a=this._renderer.getActiveMipmapLevel(),Ka=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:gt,minFilter:gt,generateMipmaps:!1,type:Hs,format:bt,colorSpace:ds,depthBuffer:!1},s=Cc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Cc(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Zg(r)),this._blurMaterial=jg(r,e,t)}return s}_compileMaterial(e){const t=new Ct(this._lodPlanes[0],e);this._renderer.compile(t,Xa)}_sceneToCubeUV(e,t,i,s,r){const l=new ii(90,1,t,i),h=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,p=d.autoClear,f=d.toneMapping;d.getClearColor(Ac),d.toneMapping=ji,d.autoClear=!1;const x=new Bs({name:"PMREM.Background",side:Gt,depthWrite:!1,depthTest:!1}),v=new Ct(new Ws,x);let _=!1;const m=e.background;m?m.isColor&&(x.color.copy(m),e.background=null,_=!0):(x.color.copy(Ac),_=!0);for(let M=0;M<6;M++){const b=M%3;b===0?(l.up.set(0,h[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[M],r.y,r.z)):b===1?(l.up.set(0,0,h[M]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[M],r.z)):(l.up.set(0,h[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[M]));const y=this._cubeSize;Tr(s,b*y,M>2?y:0,y,y),d.setRenderTarget(s),_&&d.render(v,l),d.render(e,l)}v.geometry.dispose(),v.material.dispose(),d.toneMapping=f,d.autoClear=p,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===ls||e.mapping===cs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ic()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Rc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Ct(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Tr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Xa)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Pc[(s-r-1)%Pc.length];this._blur(e,r-1,r,a,o)}t.autoClear=i}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){const l=this._renderer,h=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new Ct(this._lodPlanes[s],h),p=h.uniforms,f=this._sizeLods[i]-1,x=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*xn-1),v=r/x,_=isFinite(r)?1+Math.floor(u*v):xn;_>xn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${xn}`);const m=[];let M=0;for(let P=0;P<xn;++P){const L=P/v,E=Math.exp(-L*L/2);m.push(E),P===0?M+=E:P<_&&(M+=2*E)}for(let P=0;P<m.length;P++)m[P]=m[P]/M;p.envMap.value=e.texture,p.samples.value=_,p.weights.value=m,p.latitudinal.value=a==="latitudinal",o&&(p.poleAxis.value=o);const{_lodMax:b}=this;p.dTheta.value=x,p.mipInt.value=b-i;const y=this._sizeLods[s],I=3*y*(s>b-Qn?s-b+Qn:0),A=4*(this._cubeSize-y);Tr(t,I,A,3*y,2*y),l.setRenderTarget(t),l.render(d,Xa)}}function Zg(n){const e=[],t=[],i=[];let s=n;const r=n-Qn+1+Tc.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>n-Qn?l=Tc[a-n+Qn-1]:a===0&&(l=0),i.push(l);const h=1/(o-2),u=-h,d=1+h,p=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,x=6,v=3,_=2,m=1,M=new Float32Array(v*x*f),b=new Float32Array(_*x*f),y=new Float32Array(m*x*f);for(let A=0;A<f;A++){const P=A%3*2/3-1,L=A>2?0:-1,E=[P,L,0,P+2/3,L,0,P+2/3,L+1,0,P,L,0,P+2/3,L+1,0,P,L+1,0];M.set(E,v*x*A),b.set(p,_*x*A);const S=[A,A,A,A,A,A];y.set(S,m*x*A)}const I=new xt;I.setAttribute("position",new jt(M,v)),I.setAttribute("uv",new jt(b,_)),I.setAttribute("faceIndex",new jt(y,m)),e.push(I),s>Qn&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Cc(n,e,t){const i=new wn(n,e,t);return i.texture.mapping=Jr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Tr(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function jg(n,e,t){const i=new Float32Array(xn),s=new T(0,1,0);return new en({name:"SphericalGaussianBlur",defines:{n:xn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:fl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function Rc(){return new en({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:fl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function Ic(){return new en({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function fl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Jg(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,h=l===Fs||l===vo,u=l===ls||l===cs;if(h||u){let d=e.get(o);const p=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==p)return t===null&&(t=new jo(n)),d=h?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const f=o.image;return h&&f&&f.height>0||u&&f&&s(f)?(t===null&&(t=new jo(n)),d=h?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let l=0;const h=6;for(let u=0;u<h;u++)o[u]!==void 0&&l++;return l===h}function r(o){const l=o.target;l.removeEventListener("dispose",r);const h=e.get(l);h!==void 0&&(e.delete(l),h.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function Qg(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&mn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function e_(n,e,t,i){const s={},r=new WeakMap;function a(d){const p=d.target;p.index!==null&&e.remove(p.index);for(const x in p.attributes)e.remove(p.attributes[x]);p.removeEventListener("dispose",a),delete s[p.id];const f=r.get(p);f&&(e.remove(f),r.delete(p)),i.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function o(d,p){return s[p.id]===!0||(p.addEventListener("dispose",a),s[p.id]=!0,t.memory.geometries++),p}function l(d){const p=d.attributes;for(const f in p)e.update(p[f],n.ARRAY_BUFFER)}function h(d){const p=[],f=d.index,x=d.attributes.position;let v=0;if(f!==null){const M=f.array;v=f.version;for(let b=0,y=M.length;b<y;b+=3){const I=M[b+0],A=M[b+1],P=M[b+2];p.push(I,A,A,P,P,I)}}else if(x!==void 0){const M=x.array;v=x.version;for(let b=0,y=M.length/3-1;b<y;b+=3){const I=b+0,A=b+1,P=b+2;p.push(I,A,A,P,P,I)}}else return;const _=new(Lh(p)?Nh:Fh)(p,1);_.version=v;const m=r.get(d);m&&e.remove(m),r.set(d,_)}function u(d){const p=r.get(d);if(p){const f=d.index;f!==null&&p.version<f.version&&h(d)}else h(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function t_(n,e,t){let i;function s(p){i=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function l(p,f){n.drawElements(i,f,r,p*a),t.update(f,i,1)}function h(p,f,x){x!==0&&(n.drawElementsInstanced(i,f,r,p*a,x),t.update(f,i,x))}function u(p,f,x){if(x===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,p,0,x);let _=0;for(let m=0;m<x;m++)_+=f[m];t.update(_,i,1)}function d(p,f,x,v){if(x===0)return;const _=e.get("WEBGL_multi_draw");if(_===null)for(let m=0;m<p.length;m++)h(p[m]/a,f[m],v[m]);else{_.multiDrawElementsInstancedWEBGL(i,f,0,r,p,0,v,0,x);let m=0;for(let M=0;M<x;M++)m+=f[M]*v[M];t.update(m,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=h,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function i_(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function n_(n,e,t){const i=new WeakMap,s=new _t;function r(a,o,l){const h=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let p=i.get(o);if(p===void 0||p.count!==d){let E=function(){P.dispose(),i.delete(o),o.removeEventListener("dispose",E)};p!==void 0&&p.texture.dispose();const f=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,_=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let b=0;f===!0&&(b=1),x===!0&&(b=2),v===!0&&(b=3);let y=o.attributes.position.count*b,I=1;y>e.maxTextureSize&&(I=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const A=new Float32Array(y*I*4*d),P=new Dh(A,y,I,d);P.type=Kt,P.needsUpdate=!0;const L=b*4;for(let S=0;S<d;S++){const R=_[S],F=m[S],O=M[S],V=y*I*4*S;for(let K=0;K<R.count;K++){const z=K*L;f===!0&&(s.fromBufferAttribute(R,K),A[V+z+0]=s.x,A[V+z+1]=s.y,A[V+z+2]=s.z,A[V+z+3]=0),x===!0&&(s.fromBufferAttribute(F,K),A[V+z+4]=s.x,A[V+z+5]=s.y,A[V+z+6]=s.z,A[V+z+7]=0),v===!0&&(s.fromBufferAttribute(O,K),A[V+z+8]=s.x,A[V+z+9]=s.y,A[V+z+10]=s.z,A[V+z+11]=O.itemSize===4?s.w:1)}}p={count:d,texture:P,size:new ue(y,I)},i.set(o,p),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let f=0;for(let v=0;v<h.length;v++)f+=h[v];const x=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",x),l.getUniforms().setValue(n,"morphTargetInfluences",h)}l.getUniforms().setValue(n,"morphTargetsTexture",p.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",p.size)}return{update:r}}function s_(n,e,t,i){let s=new WeakMap;function r(l){const h=i.render.frame,u=l.geometry,d=e.get(l,u);if(s.get(d)!==h&&(e.update(d),s.set(d,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==h&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,h))),l.isSkinnedMesh){const p=l.skeleton;s.get(p)!==h&&(p.update(),s.set(p,h))}return d}function a(){s=new WeakMap}function o(l){const h=l.target;h.removeEventListener("dispose",o),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:r,dispose:a}}const cu=new Rt,Lc=new kh(1,1),hu=new Dh,uu=new zd,du=new Vh,Dc=[],Uc=[],Fc=new Float32Array(16),Nc=new Float32Array(9),Oc=new Float32Array(4);function ms(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Dc[s];if(r===void 0&&(r=new Float32Array(s),Dc[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function wt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Tt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function aa(n,e){let t=Uc[e];t===void 0&&(t=new Int32Array(e),Uc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function r_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function a_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;n.uniform2fv(this.addr,e),Tt(t,e)}}function o_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(wt(t,e))return;n.uniform3fv(this.addr,e),Tt(t,e)}}function l_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;n.uniform4fv(this.addr,e),Tt(t,e)}}function c_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(wt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Tt(t,e)}else{if(wt(t,i))return;Oc.set(i),n.uniformMatrix2fv(this.addr,!1,Oc),Tt(t,i)}}function h_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(wt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Tt(t,e)}else{if(wt(t,i))return;Nc.set(i),n.uniformMatrix3fv(this.addr,!1,Nc),Tt(t,i)}}function u_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(wt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Tt(t,e)}else{if(wt(t,i))return;Fc.set(i),n.uniformMatrix4fv(this.addr,!1,Fc),Tt(t,i)}}function d_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function f_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;n.uniform2iv(this.addr,e),Tt(t,e)}}function p_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wt(t,e))return;n.uniform3iv(this.addr,e),Tt(t,e)}}function m_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;n.uniform4iv(this.addr,e),Tt(t,e)}}function g_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function __(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;n.uniform2uiv(this.addr,e),Tt(t,e)}}function x_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wt(t,e))return;n.uniform3uiv(this.addr,e),Tt(t,e)}}function v_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;n.uniform4uiv(this.addr,e),Tt(t,e)}}function y_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Lc.compareFunction=Ih,r=Lc):r=cu,t.setTexture2D(e||r,s)}function M_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||uu,s)}function b_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||du,s)}function S_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||hu,s)}function E_(n){switch(n){case 5126:return r_;case 35664:return a_;case 35665:return o_;case 35666:return l_;case 35674:return c_;case 35675:return h_;case 35676:return u_;case 5124:case 35670:return d_;case 35667:case 35671:return f_;case 35668:case 35672:return p_;case 35669:case 35673:return m_;case 5125:return g_;case 36294:return __;case 36295:return x_;case 36296:return v_;case 35678:case 36198:case 36298:case 36306:case 35682:return y_;case 35679:case 36299:case 36307:return M_;case 35680:case 36300:case 36308:case 36293:return b_;case 36289:case 36303:case 36311:case 36292:return S_}}function w_(n,e){n.uniform1fv(this.addr,e)}function T_(n,e){const t=ms(e,this.size,2);n.uniform2fv(this.addr,t)}function A_(n,e){const t=ms(e,this.size,3);n.uniform3fv(this.addr,t)}function P_(n,e){const t=ms(e,this.size,4);n.uniform4fv(this.addr,t)}function C_(n,e){const t=ms(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function R_(n,e){const t=ms(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function I_(n,e){const t=ms(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function L_(n,e){n.uniform1iv(this.addr,e)}function D_(n,e){n.uniform2iv(this.addr,e)}function U_(n,e){n.uniform3iv(this.addr,e)}function F_(n,e){n.uniform4iv(this.addr,e)}function N_(n,e){n.uniform1uiv(this.addr,e)}function O_(n,e){n.uniform2uiv(this.addr,e)}function B_(n,e){n.uniform3uiv(this.addr,e)}function V_(n,e){n.uniform4uiv(this.addr,e)}function z_(n,e,t){const i=this.cache,s=e.length,r=aa(t,s);wt(i,r)||(n.uniform1iv(this.addr,r),Tt(i,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||cu,r[a])}function k_(n,e,t){const i=this.cache,s=e.length,r=aa(t,s);wt(i,r)||(n.uniform1iv(this.addr,r),Tt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||uu,r[a])}function H_(n,e,t){const i=this.cache,s=e.length,r=aa(t,s);wt(i,r)||(n.uniform1iv(this.addr,r),Tt(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||du,r[a])}function G_(n,e,t){const i=this.cache,s=e.length,r=aa(t,s);wt(i,r)||(n.uniform1iv(this.addr,r),Tt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||hu,r[a])}function W_(n){switch(n){case 5126:return w_;case 35664:return T_;case 35665:return A_;case 35666:return P_;case 35674:return C_;case 35675:return R_;case 35676:return I_;case 5124:case 35670:return L_;case 35667:case 35671:return D_;case 35668:case 35672:return U_;case 35669:case 35673:return F_;case 5125:return N_;case 36294:return O_;case 36295:return B_;case 36296:return V_;case 35678:case 36198:case 36298:case 36306:case 35682:return z_;case 35679:case 36299:case 36307:return k_;case 35680:case 36300:case 36308:case 36293:return H_;case 36289:case 36303:case 36311:case 36292:return G_}}class X_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=E_(t.type)}}class q_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=W_(t.type)}}class Y_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const Za=/(\w+)(\])?(\[|\.)?/g;function Bc(n,e){n.seq.push(e),n.map[e.id]=e}function $_(n,e,t){const i=n.name,s=i.length;for(Za.lastIndex=0;;){const r=Za.exec(i),a=Za.lastIndex;let o=r[1];const l=r[2]==="]",h=r[3];if(l&&(o=o|0),h===void 0||h==="["&&a+2===s){Bc(t,h===void 0?new X_(o,n,e):new q_(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new Y_(o),Bc(t,d)),t=d}}}class Hr{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);$_(r,a,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function Vc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const K_=37297;let Z_=0;function j_(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const zc=new Ye;function J_(n){et._getMatrix(zc,et.workingColorSpace,n);const e=`mat3( ${zc.elements.map(t=>t.toFixed(4))} )`;switch(et.getTransfer(n)){case Wr:return[e,"LinearTransferOETF"];case at:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function kc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+j_(n.getShaderSource(e),a)}else return s}function Q_(n,e){const t=J_(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function e0(n,e){let t;switch(e){case Ju:t="Linear";break;case Qu:t="Reinhard";break;case ed:t="Cineon";break;case yh:t="ACESFilmic";break;case id:t="AgX";break;case nd:t="Neutral";break;case td:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ar=new T;function t0(){et.getLuminanceCoefficients(Ar);const n=Ar.x.toFixed(4),e=Ar.y.toFixed(4),t=Ar.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function i0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Cs).join(`
`)}function n0(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function s0(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Cs(n){return n!==""}function Hc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Gc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const r0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Jo(n){return n.replace(r0,o0)}const a0=new Map;function o0(n,e){let t=Ke[e];if(t===void 0){const i=a0.get(e);if(i!==void 0)t=Ke[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Jo(t)}const l0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Wc(n){return n.replace(l0,c0)}function c0(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Xc(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function h0(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===xh?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===vh?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Ri&&(e="SHADOWMAP_TYPE_VSM"),e}function u0(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ls:case cs:e="ENVMAP_TYPE_CUBE";break;case Jr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function d0(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case cs:e="ENVMAP_MODE_REFRACTION";break}return e}function f0(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case jr:e="ENVMAP_BLENDING_MULTIPLY";break;case Zu:e="ENVMAP_BLENDING_MIX";break;case ju:e="ENVMAP_BLENDING_ADD";break}return e}function p0(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function m0(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=h0(t),h=u0(t),u=d0(t),d=f0(t),p=p0(t),f=i0(t),x=n0(r),v=s.createProgram();let _,m,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Cs).join(`
`),_.length>0&&(_+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Cs).join(`
`),m.length>0&&(m+=`
`)):(_=[Xc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Cs).join(`
`),m=[Xc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ji?"#define TONE_MAPPING":"",t.toneMapping!==ji?Ke.tonemapping_pars_fragment:"",t.toneMapping!==ji?e0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ke.colorspace_pars_fragment,Q_("linearToOutputTexel",t.outputColorSpace),t0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Cs).join(`
`)),a=Jo(a),a=Hc(a,t),a=Gc(a,t),o=Jo(o),o=Hc(o,t),o=Gc(o,t),a=Wc(a),o=Wc(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,_=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,m=["#define varying in",t.glslVersion===Bl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Bl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const b=M+_+a,y=M+m+o,I=Vc(s,s.VERTEX_SHADER,b),A=Vc(s,s.FRAGMENT_SHADER,y);s.attachShader(v,I),s.attachShader(v,A),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function P(R){if(n.debug.checkShaderErrors){const F=s.getProgramInfoLog(v).trim(),O=s.getShaderInfoLog(I).trim(),V=s.getShaderInfoLog(A).trim();let K=!0,z=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(K=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,I,A);else{const q=kc(s,I,"vertex"),N=kc(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+F+`
`+q+`
`+N)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(O===""||V==="")&&(z=!1);z&&(R.diagnostics={runnable:K,programLog:F,vertexShader:{log:O,prefix:_},fragmentShader:{log:V,prefix:m}})}s.deleteShader(I),s.deleteShader(A),L=new Hr(s,v),E=s0(s,v)}let L;this.getUniforms=function(){return L===void 0&&P(this),L};let E;this.getAttributes=function(){return E===void 0&&P(this),E};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(v,K_)),S},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Z_++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=I,this.fragmentShader=A,this}let g0=0;class _0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new x0(e),t.set(e,i)),i}}class x0{constructor(e){this.id=g0++,this.code=e,this.usedTimes=0}}function v0(n,e,t,i,s,r,a){const o=new hl,l=new _0,h=new Set,u=[],d=s.logarithmicDepthBuffer,p=s.vertexTextures;let f=s.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(E){return h.add(E),E===0?"uv":`uv${E}`}function _(E,S,R,F,O){const V=F.fog,K=O.geometry,z=E.isMeshStandardMaterial?F.environment:null,q=(E.isMeshStandardMaterial?t:e).get(E.envMap||z),N=q&&q.mapping===Jr?q.image.height:null,k=x[E.type];E.precision!==null&&(f=s.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));const j=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,ie=j!==void 0?j.length:0;let de=0;K.morphAttributes.position!==void 0&&(de=1),K.morphAttributes.normal!==void 0&&(de=2),K.morphAttributes.color!==void 0&&(de=3);let we,Y,ee,he;if(k){const rt=gi[k];we=rt.vertexShader,Y=rt.fragmentShader}else we=E.vertexShader,Y=E.fragmentShader,l.update(E),ee=l.getVertexShaderID(E),he=l.getFragmentShaderID(E);const re=n.getRenderTarget(),be=n.state.buffers.depth.getReversed(),De=O.isInstancedMesh===!0,ge=O.isBatchedMesh===!0,Be=!!E.map,ae=!!E.matcap,te=!!q,U=!!E.aoMap,Ue=!!E.lightMap,fe=!!E.bumpMap,Pe=!!E.normalMap,_e=!!E.displacementMap,ze=!!E.emissiveMap,Se=!!E.metalnessMap,D=!!E.roughnessMap,w=E.anisotropy>0,$=E.clearcoat>0,ne=E.dispersion>0,ce=E.iridescence>0,se=E.sheen>0,Fe=E.transmission>0,ve=w&&!!E.anisotropyMap,Ae=$&&!!E.clearcoatMap,je=$&&!!E.clearcoatNormalMap,me=$&&!!E.clearcoatRoughnessMap,Re=ce&&!!E.iridescenceMap,ke=ce&&!!E.iridescenceThicknessMap,He=se&&!!E.sheenColorMap,Ie=se&&!!E.sheenRoughnessMap,Je=!!E.specularMap,$e=!!E.specularColorMap,ct=!!E.specularIntensityMap,G=Fe&&!!E.transmissionMap,ye=Fe&&!!E.thicknessMap,Q=!!E.gradientMap,oe=!!E.alphaMap,Te=E.alphaTest>0,Ee=!!E.alphaHash,qe=!!E.extensions;let ft=ji;E.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(ft=n.toneMapping);const It={shaderID:k,shaderType:E.type,shaderName:E.name,vertexShader:we,fragmentShader:Y,defines:E.defines,customVertexShaderID:ee,customFragmentShaderID:he,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:ge,batchingColor:ge&&O._colorsTexture!==null,instancing:De,instancingColor:De&&O.instanceColor!==null,instancingMorph:De&&O.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:re===null?n.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:ds,alphaToCoverage:!!E.alphaToCoverage,map:Be,matcap:ae,envMap:te,envMapMode:te&&q.mapping,envMapCubeUVHeight:N,aoMap:U,lightMap:Ue,bumpMap:fe,normalMap:Pe,displacementMap:p&&_e,emissiveMap:ze,normalMapObjectSpace:Pe&&E.normalMapType===od,normalMapTangentSpace:Pe&&E.normalMapType===Gs,metalnessMap:Se,roughnessMap:D,anisotropy:w,anisotropyMap:ve,clearcoat:$,clearcoatMap:Ae,clearcoatNormalMap:je,clearcoatRoughnessMap:me,dispersion:ne,iridescence:ce,iridescenceMap:Re,iridescenceThicknessMap:ke,sheen:se,sheenColorMap:He,sheenRoughnessMap:Ie,specularMap:Je,specularColorMap:$e,specularIntensityMap:ct,transmission:Fe,transmissionMap:G,thicknessMap:ye,gradientMap:Q,opaque:E.transparent===!1&&E.blending===ts&&E.alphaToCoverage===!1,alphaMap:oe,alphaTest:Te,alphaHash:Ee,combine:E.combine,mapUv:Be&&v(E.map.channel),aoMapUv:U&&v(E.aoMap.channel),lightMapUv:Ue&&v(E.lightMap.channel),bumpMapUv:fe&&v(E.bumpMap.channel),normalMapUv:Pe&&v(E.normalMap.channel),displacementMapUv:_e&&v(E.displacementMap.channel),emissiveMapUv:ze&&v(E.emissiveMap.channel),metalnessMapUv:Se&&v(E.metalnessMap.channel),roughnessMapUv:D&&v(E.roughnessMap.channel),anisotropyMapUv:ve&&v(E.anisotropyMap.channel),clearcoatMapUv:Ae&&v(E.clearcoatMap.channel),clearcoatNormalMapUv:je&&v(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:me&&v(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Re&&v(E.iridescenceMap.channel),iridescenceThicknessMapUv:ke&&v(E.iridescenceThicknessMap.channel),sheenColorMapUv:He&&v(E.sheenColorMap.channel),sheenRoughnessMapUv:Ie&&v(E.sheenRoughnessMap.channel),specularMapUv:Je&&v(E.specularMap.channel),specularColorMapUv:$e&&v(E.specularColorMap.channel),specularIntensityMapUv:ct&&v(E.specularIntensityMap.channel),transmissionMapUv:G&&v(E.transmissionMap.channel),thicknessMapUv:ye&&v(E.thicknessMap.channel),alphaMapUv:oe&&v(E.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(Pe||w),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!K.attributes.uv&&(Be||oe),fog:!!V,useFog:E.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:be,skinning:O.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:ie,morphTextureStride:de,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:ft,decodeVideoTexture:Be&&E.map.isVideoTexture===!0&&et.getTransfer(E.map.colorSpace)===at,decodeVideoTextureEmissive:ze&&E.emissiveMap.isVideoTexture===!0&&et.getTransfer(E.emissiveMap.colorSpace)===at,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Ht,flipSided:E.side===Gt,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:qe&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(qe&&E.extensions.multiDraw===!0||ge)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return It.vertexUv1s=h.has(1),It.vertexUv2s=h.has(2),It.vertexUv3s=h.has(3),h.clear(),It}function m(E){const S=[];if(E.shaderID?S.push(E.shaderID):(S.push(E.customVertexShaderID),S.push(E.customFragmentShaderID)),E.defines!==void 0)for(const R in E.defines)S.push(R),S.push(E.defines[R]);return E.isRawShaderMaterial===!1&&(M(S,E),b(S,E),S.push(n.outputColorSpace)),S.push(E.customProgramCacheKey),S.join()}function M(E,S){E.push(S.precision),E.push(S.outputColorSpace),E.push(S.envMapMode),E.push(S.envMapCubeUVHeight),E.push(S.mapUv),E.push(S.alphaMapUv),E.push(S.lightMapUv),E.push(S.aoMapUv),E.push(S.bumpMapUv),E.push(S.normalMapUv),E.push(S.displacementMapUv),E.push(S.emissiveMapUv),E.push(S.metalnessMapUv),E.push(S.roughnessMapUv),E.push(S.anisotropyMapUv),E.push(S.clearcoatMapUv),E.push(S.clearcoatNormalMapUv),E.push(S.clearcoatRoughnessMapUv),E.push(S.iridescenceMapUv),E.push(S.iridescenceThicknessMapUv),E.push(S.sheenColorMapUv),E.push(S.sheenRoughnessMapUv),E.push(S.specularMapUv),E.push(S.specularColorMapUv),E.push(S.specularIntensityMapUv),E.push(S.transmissionMapUv),E.push(S.thicknessMapUv),E.push(S.combine),E.push(S.fogExp2),E.push(S.sizeAttenuation),E.push(S.morphTargetsCount),E.push(S.morphAttributeCount),E.push(S.numDirLights),E.push(S.numPointLights),E.push(S.numSpotLights),E.push(S.numSpotLightMaps),E.push(S.numHemiLights),E.push(S.numRectAreaLights),E.push(S.numDirLightShadows),E.push(S.numPointLightShadows),E.push(S.numSpotLightShadows),E.push(S.numSpotLightShadowsWithMaps),E.push(S.numLightProbes),E.push(S.shadowMapType),E.push(S.toneMapping),E.push(S.numClippingPlanes),E.push(S.numClipIntersection),E.push(S.depthPacking)}function b(E,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),E.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reverseDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),E.push(o.mask)}function y(E){const S=x[E.type];let R;if(S){const F=gi[S];R=Qd.clone(F.uniforms)}else R=E.uniforms;return R}function I(E,S){let R;for(let F=0,O=u.length;F<O;F++){const V=u[F];if(V.cacheKey===S){R=V,++R.usedTimes;break}}return R===void 0&&(R=new m0(n,S,E,r),u.push(R)),R}function A(E){if(--E.usedTimes===0){const S=u.indexOf(E);u[S]=u[u.length-1],u.pop(),E.destroy()}}function P(E){l.remove(E)}function L(){l.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:y,acquireProgram:I,releaseProgram:A,releaseShaderCache:P,programs:u,dispose:L}}function y0(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function M0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function qc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Yc(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(d,p,f,x,v,_){let m=n[e];return m===void 0?(m={id:d.id,object:d,geometry:p,material:f,groupOrder:x,renderOrder:d.renderOrder,z:v,group:_},n[e]=m):(m.id=d.id,m.object=d,m.geometry=p,m.material=f,m.groupOrder=x,m.renderOrder=d.renderOrder,m.z=v,m.group=_),e++,m}function o(d,p,f,x,v,_){const m=a(d,p,f,x,v,_);f.transmission>0?i.push(m):f.transparent===!0?s.push(m):t.push(m)}function l(d,p,f,x,v,_){const m=a(d,p,f,x,v,_);f.transmission>0?i.unshift(m):f.transparent===!0?s.unshift(m):t.unshift(m)}function h(d,p){t.length>1&&t.sort(d||M0),i.length>1&&i.sort(p||qc),s.length>1&&s.sort(p||qc)}function u(){for(let d=e,p=n.length;d<p;d++){const f=n[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:u,sort:h}}function b0(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new Yc,n.set(i,[a])):s>=r.length?(a=new Yc,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function S0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new T,color:new Ve};break;case"SpotLight":t={position:new T,direction:new T,color:new Ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new T,color:new Ve,distance:0,decay:0};break;case"HemisphereLight":t={direction:new T,skyColor:new Ve,groundColor:new Ve};break;case"RectAreaLight":t={color:new Ve,position:new T,halfWidth:new T,halfHeight:new T};break}return n[e.id]=t,t}}}function E0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let w0=0;function T0(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function A0(n){const e=new S0,t=E0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new T);const s=new T,r=new st,a=new st;function o(h){let u=0,d=0,p=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let f=0,x=0,v=0,_=0,m=0,M=0,b=0,y=0,I=0,A=0,P=0;h.sort(T0);for(let E=0,S=h.length;E<S;E++){const R=h[E],F=R.color,O=R.intensity,V=R.distance,K=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=F.r*O,d+=F.g*O,p+=F.b*O;else if(R.isLightProbe){for(let z=0;z<9;z++)i.probe[z].addScaledVector(R.sh.coefficients[z],O);P++}else if(R.isDirectionalLight){const z=e.get(R);if(z.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const q=R.shadow,N=t.get(R);N.shadowIntensity=q.intensity,N.shadowBias=q.bias,N.shadowNormalBias=q.normalBias,N.shadowRadius=q.radius,N.shadowMapSize=q.mapSize,i.directionalShadow[f]=N,i.directionalShadowMap[f]=K,i.directionalShadowMatrix[f]=R.shadow.matrix,M++}i.directional[f]=z,f++}else if(R.isSpotLight){const z=e.get(R);z.position.setFromMatrixPosition(R.matrixWorld),z.color.copy(F).multiplyScalar(O),z.distance=V,z.coneCos=Math.cos(R.angle),z.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),z.decay=R.decay,i.spot[v]=z;const q=R.shadow;if(R.map&&(i.spotLightMap[I]=R.map,I++,q.updateMatrices(R),R.castShadow&&A++),i.spotLightMatrix[v]=q.matrix,R.castShadow){const N=t.get(R);N.shadowIntensity=q.intensity,N.shadowBias=q.bias,N.shadowNormalBias=q.normalBias,N.shadowRadius=q.radius,N.shadowMapSize=q.mapSize,i.spotShadow[v]=N,i.spotShadowMap[v]=K,y++}v++}else if(R.isRectAreaLight){const z=e.get(R);z.color.copy(F).multiplyScalar(O),z.halfWidth.set(R.width*.5,0,0),z.halfHeight.set(0,R.height*.5,0),i.rectArea[_]=z,_++}else if(R.isPointLight){const z=e.get(R);if(z.color.copy(R.color).multiplyScalar(R.intensity),z.distance=R.distance,z.decay=R.decay,R.castShadow){const q=R.shadow,N=t.get(R);N.shadowIntensity=q.intensity,N.shadowBias=q.bias,N.shadowNormalBias=q.normalBias,N.shadowRadius=q.radius,N.shadowMapSize=q.mapSize,N.shadowCameraNear=q.camera.near,N.shadowCameraFar=q.camera.far,i.pointShadow[x]=N,i.pointShadowMap[x]=K,i.pointShadowMatrix[x]=R.shadow.matrix,b++}i.point[x]=z,x++}else if(R.isHemisphereLight){const z=e.get(R);z.skyColor.copy(R.color).multiplyScalar(O),z.groundColor.copy(R.groundColor).multiplyScalar(O),i.hemi[m]=z,m++}}_>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=xe.LTC_FLOAT_1,i.rectAreaLTC2=xe.LTC_FLOAT_2):(i.rectAreaLTC1=xe.LTC_HALF_1,i.rectAreaLTC2=xe.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=p;const L=i.hash;(L.directionalLength!==f||L.pointLength!==x||L.spotLength!==v||L.rectAreaLength!==_||L.hemiLength!==m||L.numDirectionalShadows!==M||L.numPointShadows!==b||L.numSpotShadows!==y||L.numSpotMaps!==I||L.numLightProbes!==P)&&(i.directional.length=f,i.spot.length=v,i.rectArea.length=_,i.point.length=x,i.hemi.length=m,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=y+I-A,i.spotLightMap.length=I,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=P,L.directionalLength=f,L.pointLength=x,L.spotLength=v,L.rectAreaLength=_,L.hemiLength=m,L.numDirectionalShadows=M,L.numPointShadows=b,L.numSpotShadows=y,L.numSpotMaps=I,L.numLightProbes=P,i.version=w0++)}function l(h,u){let d=0,p=0,f=0,x=0,v=0;const _=u.matrixWorldInverse;for(let m=0,M=h.length;m<M;m++){const b=h[m];if(b.isDirectionalLight){const y=i.directional[d];y.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(_),d++}else if(b.isSpotLight){const y=i.spot[f];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(_),y.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(_),f++}else if(b.isRectAreaLight){const y=i.rectArea[x];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(_),a.identity(),r.copy(b.matrixWorld),r.premultiply(_),a.extractRotation(r),y.halfWidth.set(b.width*.5,0,0),y.halfHeight.set(0,b.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),x++}else if(b.isPointLight){const y=i.point[p];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(_),p++}else if(b.isHemisphereLight){const y=i.hemi[v];y.direction.setFromMatrixPosition(b.matrixWorld),y.direction.transformDirection(_),v++}}}return{setup:o,setupView:l,state:i}}function $c(n){const e=new A0(n),t=[],i=[];function s(u){h.camera=u,t.length=0,i.length=0}function r(u){t.push(u)}function a(u){i.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}const h={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:h,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function P0(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new $c(n),e.set(s,[o])):r>=a.length?(o=new $c(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const C0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,R0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function I0(n,e,t){let i=new ta;const s=new ue,r=new ue,a=new _t,o=new jf({depthPacking:ad}),l=new Jf,h={},u=t.maxTextureSize,d={[$t]:Gt,[Gt]:$t,[Ht]:Ht},p=new en({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ue},radius:{value:4}},vertexShader:C0,fragmentShader:R0}),f=p.clone();f.defines.HORIZONTAL_PASS=1;const x=new xt;x.setAttribute("position",new jt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ct(x,p),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xh;let m=this.type;this.render=function(A,P,L){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||A.length===0)return;const E=n.getRenderTarget(),S=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),F=n.state;F.setBlending(Zi),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const O=m!==Ri&&this.type===Ri,V=m===Ri&&this.type!==Ri;for(let K=0,z=A.length;K<z;K++){const q=A[K],N=q.shadow;if(N===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;s.copy(N.mapSize);const k=N.getFrameExtents();if(s.multiply(k),r.copy(N.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/k.x),s.x=r.x*k.x,N.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/k.y),s.y=r.y*k.y,N.mapSize.y=r.y)),N.map===null||O===!0||V===!0){const ie=this.type!==Ri?{minFilter:Bt,magFilter:Bt}:{};N.map!==null&&N.map.dispose(),N.map=new wn(s.x,s.y,ie),N.map.texture.name=q.name+".shadowMap",N.camera.updateProjectionMatrix()}n.setRenderTarget(N.map),n.clear();const j=N.getViewportCount();for(let ie=0;ie<j;ie++){const de=N.getViewport(ie);a.set(r.x*de.x,r.y*de.y,r.x*de.z,r.y*de.w),F.viewport(a),N.updateMatrices(q,ie),i=N.getFrustum(),y(P,L,N.camera,q,this.type)}N.isPointLightShadow!==!0&&this.type===Ri&&M(N,L),N.needsUpdate=!1}m=this.type,_.needsUpdate=!1,n.setRenderTarget(E,S,R)};function M(A,P){const L=e.update(v);p.defines.VSM_SAMPLES!==A.blurSamples&&(p.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,p.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new wn(s.x,s.y)),p.uniforms.shadow_pass.value=A.map.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(P,null,L,p,v,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(P,null,L,f,v,null)}function b(A,P,L,E){let S=null;const R=L.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(R!==void 0)S=R;else if(S=L.isPointLight===!0?l:o,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const F=S.uuid,O=P.uuid;let V=h[F];V===void 0&&(V={},h[F]=V);let K=V[O];K===void 0&&(K=S.clone(),V[O]=K,P.addEventListener("dispose",I)),S=K}if(S.visible=P.visible,S.wireframe=P.wireframe,E===Ri?S.side=P.shadowSide!==null?P.shadowSide:P.side:S.side=P.shadowSide!==null?P.shadowSide:d[P.side],S.alphaMap=P.alphaMap,S.alphaTest=P.alphaTest,S.map=P.map,S.clipShadows=P.clipShadows,S.clippingPlanes=P.clippingPlanes,S.clipIntersection=P.clipIntersection,S.displacementMap=P.displacementMap,S.displacementScale=P.displacementScale,S.displacementBias=P.displacementBias,S.wireframeLinewidth=P.wireframeLinewidth,S.linewidth=P.linewidth,L.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const F=n.properties.get(S);F.light=L}return S}function y(A,P,L,E,S){if(A.visible===!1)return;if(A.layers.test(P.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&S===Ri)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,A.matrixWorld);const O=e.update(A),V=A.material;if(Array.isArray(V)){const K=O.groups;for(let z=0,q=K.length;z<q;z++){const N=K[z],k=V[N.materialIndex];if(k&&k.visible){const j=b(A,k,E,S);A.onBeforeShadow(n,A,P,L,O,j,N),n.renderBufferDirect(L,null,O,j,A,N),A.onAfterShadow(n,A,P,L,O,j,N)}}}else if(V.visible){const K=b(A,V,E,S);A.onBeforeShadow(n,A,P,L,O,K,null),n.renderBufferDirect(L,null,O,K,A,null),A.onAfterShadow(n,A,P,L,O,K,null)}}const F=A.children;for(let O=0,V=F.length;O<V;O++)y(F[O],P,L,E,S)}function I(A){A.target.removeEventListener("dispose",I);for(const L in h){const E=h[L],S=A.target.uuid;S in E&&(E[S].dispose(),delete E[S])}}}const L0={[uo]:fo,[po]:_o,[mo]:xo,[os]:go,[fo]:uo,[_o]:po,[xo]:mo,[go]:os};function D0(n,e){function t(){let G=!1;const ye=new _t;let Q=null;const oe=new _t(0,0,0,0);return{setMask:function(Te){Q!==Te&&!G&&(n.colorMask(Te,Te,Te,Te),Q=Te)},setLocked:function(Te){G=Te},setClear:function(Te,Ee,qe,ft,It){It===!0&&(Te*=ft,Ee*=ft,qe*=ft),ye.set(Te,Ee,qe,ft),oe.equals(ye)===!1&&(n.clearColor(Te,Ee,qe,ft),oe.copy(ye))},reset:function(){G=!1,Q=null,oe.set(-1,0,0,0)}}}function i(){let G=!1,ye=!1,Q=null,oe=null,Te=null;return{setReversed:function(Ee){if(ye!==Ee){const qe=e.get("EXT_clip_control");ye?qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.ZERO_TO_ONE_EXT):qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.NEGATIVE_ONE_TO_ONE_EXT);const ft=Te;Te=null,this.setClear(ft)}ye=Ee},getReversed:function(){return ye},setTest:function(Ee){Ee?re(n.DEPTH_TEST):be(n.DEPTH_TEST)},setMask:function(Ee){Q!==Ee&&!G&&(n.depthMask(Ee),Q=Ee)},setFunc:function(Ee){if(ye&&(Ee=L0[Ee]),oe!==Ee){switch(Ee){case uo:n.depthFunc(n.NEVER);break;case fo:n.depthFunc(n.ALWAYS);break;case po:n.depthFunc(n.LESS);break;case os:n.depthFunc(n.LEQUAL);break;case mo:n.depthFunc(n.EQUAL);break;case go:n.depthFunc(n.GEQUAL);break;case _o:n.depthFunc(n.GREATER);break;case xo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}oe=Ee}},setLocked:function(Ee){G=Ee},setClear:function(Ee){Te!==Ee&&(ye&&(Ee=1-Ee),n.clearDepth(Ee),Te=Ee)},reset:function(){G=!1,Q=null,oe=null,Te=null,ye=!1}}}function s(){let G=!1,ye=null,Q=null,oe=null,Te=null,Ee=null,qe=null,ft=null,It=null;return{setTest:function(rt){G||(rt?re(n.STENCIL_TEST):be(n.STENCIL_TEST))},setMask:function(rt){ye!==rt&&!G&&(n.stencilMask(rt),ye=rt)},setFunc:function(rt,ai,Si){(Q!==rt||oe!==ai||Te!==Si)&&(n.stencilFunc(rt,ai,Si),Q=rt,oe=ai,Te=Si)},setOp:function(rt,ai,Si){(Ee!==rt||qe!==ai||ft!==Si)&&(n.stencilOp(rt,ai,Si),Ee=rt,qe=ai,ft=Si)},setLocked:function(rt){G=rt},setClear:function(rt){It!==rt&&(n.clearStencil(rt),It=rt)},reset:function(){G=!1,ye=null,Q=null,oe=null,Te=null,Ee=null,qe=null,ft=null,It=null}}}const r=new t,a=new i,o=new s,l=new WeakMap,h=new WeakMap;let u={},d={},p=new WeakMap,f=[],x=null,v=!1,_=null,m=null,M=null,b=null,y=null,I=null,A=null,P=new Ve(0,0,0),L=0,E=!1,S=null,R=null,F=null,O=null,V=null;const K=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,q=0;const N=n.getParameter(n.VERSION);N.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(N)[1]),z=q>=1):N.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(N)[1]),z=q>=2);let k=null,j={};const ie=n.getParameter(n.SCISSOR_BOX),de=n.getParameter(n.VIEWPORT),we=new _t().fromArray(ie),Y=new _t().fromArray(de);function ee(G,ye,Q,oe){const Te=new Uint8Array(4),Ee=n.createTexture();n.bindTexture(G,Ee),n.texParameteri(G,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(G,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let qe=0;qe<Q;qe++)G===n.TEXTURE_3D||G===n.TEXTURE_2D_ARRAY?n.texImage3D(ye,0,n.RGBA,1,1,oe,0,n.RGBA,n.UNSIGNED_BYTE,Te):n.texImage2D(ye+qe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Te);return Ee}const he={};he[n.TEXTURE_2D]=ee(n.TEXTURE_2D,n.TEXTURE_2D,1),he[n.TEXTURE_CUBE_MAP]=ee(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),he[n.TEXTURE_2D_ARRAY]=ee(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),he[n.TEXTURE_3D]=ee(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),re(n.DEPTH_TEST),a.setFunc(os),fe(!1),Pe(Ll),re(n.CULL_FACE),U(Zi);function re(G){u[G]!==!0&&(n.enable(G),u[G]=!0)}function be(G){u[G]!==!1&&(n.disable(G),u[G]=!1)}function De(G,ye){return d[G]!==ye?(n.bindFramebuffer(G,ye),d[G]=ye,G===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ye),G===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ye),!0):!1}function ge(G,ye){let Q=f,oe=!1;if(G){Q=p.get(ye),Q===void 0&&(Q=[],p.set(ye,Q));const Te=G.textures;if(Q.length!==Te.length||Q[0]!==n.COLOR_ATTACHMENT0){for(let Ee=0,qe=Te.length;Ee<qe;Ee++)Q[Ee]=n.COLOR_ATTACHMENT0+Ee;Q.length=Te.length,oe=!0}}else Q[0]!==n.BACK&&(Q[0]=n.BACK,oe=!0);oe&&n.drawBuffers(Q)}function Be(G){return x!==G?(n.useProgram(G),x=G,!0):!1}const ae={[_n]:n.FUNC_ADD,[Du]:n.FUNC_SUBTRACT,[Uu]:n.FUNC_REVERSE_SUBTRACT};ae[Fu]=n.MIN,ae[Nu]=n.MAX;const te={[Ou]:n.ZERO,[Bu]:n.ONE,[Vu]:n.SRC_COLOR,[co]:n.SRC_ALPHA,[Xu]:n.SRC_ALPHA_SATURATE,[Gu]:n.DST_COLOR,[ku]:n.DST_ALPHA,[zu]:n.ONE_MINUS_SRC_COLOR,[ho]:n.ONE_MINUS_SRC_ALPHA,[Wu]:n.ONE_MINUS_DST_COLOR,[Hu]:n.ONE_MINUS_DST_ALPHA,[qu]:n.CONSTANT_COLOR,[Yu]:n.ONE_MINUS_CONSTANT_COLOR,[$u]:n.CONSTANT_ALPHA,[Ku]:n.ONE_MINUS_CONSTANT_ALPHA};function U(G,ye,Q,oe,Te,Ee,qe,ft,It,rt){if(G===Zi){v===!0&&(be(n.BLEND),v=!1);return}if(v===!1&&(re(n.BLEND),v=!0),G!==Lu){if(G!==_||rt!==E){if((m!==_n||y!==_n)&&(n.blendEquation(n.FUNC_ADD),m=_n,y=_n),rt)switch(G){case ts:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Dl:n.blendFunc(n.ONE,n.ONE);break;case Ul:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Fl:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}else switch(G){case ts:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Dl:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Ul:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Fl:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}M=null,b=null,I=null,A=null,P.set(0,0,0),L=0,_=G,E=rt}return}Te=Te||ye,Ee=Ee||Q,qe=qe||oe,(ye!==m||Te!==y)&&(n.blendEquationSeparate(ae[ye],ae[Te]),m=ye,y=Te),(Q!==M||oe!==b||Ee!==I||qe!==A)&&(n.blendFuncSeparate(te[Q],te[oe],te[Ee],te[qe]),M=Q,b=oe,I=Ee,A=qe),(ft.equals(P)===!1||It!==L)&&(n.blendColor(ft.r,ft.g,ft.b,It),P.copy(ft),L=It),_=G,E=!1}function Ue(G,ye){G.side===Ht?be(n.CULL_FACE):re(n.CULL_FACE);let Q=G.side===Gt;ye&&(Q=!Q),fe(Q),G.blending===ts&&G.transparent===!1?U(Zi):U(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),a.setFunc(G.depthFunc),a.setTest(G.depthTest),a.setMask(G.depthWrite),r.setMask(G.colorWrite);const oe=G.stencilWrite;o.setTest(oe),oe&&(o.setMask(G.stencilWriteMask),o.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),o.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),ze(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?re(n.SAMPLE_ALPHA_TO_COVERAGE):be(n.SAMPLE_ALPHA_TO_COVERAGE)}function fe(G){S!==G&&(G?n.frontFace(n.CW):n.frontFace(n.CCW),S=G)}function Pe(G){G!==Ru?(re(n.CULL_FACE),G!==R&&(G===Ll?n.cullFace(n.BACK):G===Iu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):be(n.CULL_FACE),R=G}function _e(G){G!==F&&(z&&n.lineWidth(G),F=G)}function ze(G,ye,Q){G?(re(n.POLYGON_OFFSET_FILL),(O!==ye||V!==Q)&&(n.polygonOffset(ye,Q),O=ye,V=Q)):be(n.POLYGON_OFFSET_FILL)}function Se(G){G?re(n.SCISSOR_TEST):be(n.SCISSOR_TEST)}function D(G){G===void 0&&(G=n.TEXTURE0+K-1),k!==G&&(n.activeTexture(G),k=G)}function w(G,ye,Q){Q===void 0&&(k===null?Q=n.TEXTURE0+K-1:Q=k);let oe=j[Q];oe===void 0&&(oe={type:void 0,texture:void 0},j[Q]=oe),(oe.type!==G||oe.texture!==ye)&&(k!==Q&&(n.activeTexture(Q),k=Q),n.bindTexture(G,ye||he[G]),oe.type=G,oe.texture=ye)}function $(){const G=j[k];G!==void 0&&G.type!==void 0&&(n.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function ne(){try{n.compressedTexImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ce(){try{n.compressedTexImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function se(){try{n.texSubImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Fe(){try{n.texSubImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ve(){try{n.compressedTexSubImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ae(){try{n.compressedTexSubImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function je(){try{n.texStorage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function me(){try{n.texStorage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Re(){try{n.texImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ke(){try{n.texImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function He(G){we.equals(G)===!1&&(n.scissor(G.x,G.y,G.z,G.w),we.copy(G))}function Ie(G){Y.equals(G)===!1&&(n.viewport(G.x,G.y,G.z,G.w),Y.copy(G))}function Je(G,ye){let Q=h.get(ye);Q===void 0&&(Q=new WeakMap,h.set(ye,Q));let oe=Q.get(G);oe===void 0&&(oe=n.getUniformBlockIndex(ye,G.name),Q.set(G,oe))}function $e(G,ye){const oe=h.get(ye).get(G);l.get(ye)!==oe&&(n.uniformBlockBinding(ye,oe,G.__bindingPointIndex),l.set(ye,oe))}function ct(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},k=null,j={},d={},p=new WeakMap,f=[],x=null,v=!1,_=null,m=null,M=null,b=null,y=null,I=null,A=null,P=new Ve(0,0,0),L=0,E=!1,S=null,R=null,F=null,O=null,V=null,we.set(0,0,n.canvas.width,n.canvas.height),Y.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:re,disable:be,bindFramebuffer:De,drawBuffers:ge,useProgram:Be,setBlending:U,setMaterial:Ue,setFlipSided:fe,setCullFace:Pe,setLineWidth:_e,setPolygonOffset:ze,setScissorTest:Se,activeTexture:D,bindTexture:w,unbindTexture:$,compressedTexImage2D:ne,compressedTexImage3D:ce,texImage2D:Re,texImage3D:ke,updateUBOMapping:Je,uniformBlockBinding:$e,texStorage2D:je,texStorage3D:me,texSubImage2D:se,texSubImage3D:Fe,compressedTexSubImage2D:ve,compressedTexSubImage3D:Ae,scissor:He,viewport:Ie,reset:ct}}function U0(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new ue,u=new WeakMap;let d;const p=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(D,w){return f?new OffscreenCanvas(D,w):qr("canvas")}function v(D,w,$){let ne=1;const ce=Se(D);if((ce.width>$||ce.height>$)&&(ne=$/Math.max(ce.width,ce.height)),ne<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const se=Math.floor(ne*ce.width),Fe=Math.floor(ne*ce.height);d===void 0&&(d=x(se,Fe));const ve=w?x(se,Fe):d;return ve.width=se,ve.height=Fe,ve.getContext("2d").drawImage(D,0,0,se,Fe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ce.width+"x"+ce.height+") to ("+se+"x"+Fe+")."),ve}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ce.width+"x"+ce.height+")."),D;return D}function _(D){return D.generateMipmaps}function m(D){n.generateMipmap(D)}function M(D){return D.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?n.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(D,w,$,ne,ce=!1){if(D!==null){if(n[D]!==void 0)return n[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let se=w;if(w===n.RED&&($===n.FLOAT&&(se=n.R32F),$===n.HALF_FLOAT&&(se=n.R16F),$===n.UNSIGNED_BYTE&&(se=n.R8)),w===n.RED_INTEGER&&($===n.UNSIGNED_BYTE&&(se=n.R8UI),$===n.UNSIGNED_SHORT&&(se=n.R16UI),$===n.UNSIGNED_INT&&(se=n.R32UI),$===n.BYTE&&(se=n.R8I),$===n.SHORT&&(se=n.R16I),$===n.INT&&(se=n.R32I)),w===n.RG&&($===n.FLOAT&&(se=n.RG32F),$===n.HALF_FLOAT&&(se=n.RG16F),$===n.UNSIGNED_BYTE&&(se=n.RG8)),w===n.RG_INTEGER&&($===n.UNSIGNED_BYTE&&(se=n.RG8UI),$===n.UNSIGNED_SHORT&&(se=n.RG16UI),$===n.UNSIGNED_INT&&(se=n.RG32UI),$===n.BYTE&&(se=n.RG8I),$===n.SHORT&&(se=n.RG16I),$===n.INT&&(se=n.RG32I)),w===n.RGB_INTEGER&&($===n.UNSIGNED_BYTE&&(se=n.RGB8UI),$===n.UNSIGNED_SHORT&&(se=n.RGB16UI),$===n.UNSIGNED_INT&&(se=n.RGB32UI),$===n.BYTE&&(se=n.RGB8I),$===n.SHORT&&(se=n.RGB16I),$===n.INT&&(se=n.RGB32I)),w===n.RGBA_INTEGER&&($===n.UNSIGNED_BYTE&&(se=n.RGBA8UI),$===n.UNSIGNED_SHORT&&(se=n.RGBA16UI),$===n.UNSIGNED_INT&&(se=n.RGBA32UI),$===n.BYTE&&(se=n.RGBA8I),$===n.SHORT&&(se=n.RGBA16I),$===n.INT&&(se=n.RGBA32I)),w===n.RGB&&$===n.UNSIGNED_INT_5_9_9_9_REV&&(se=n.RGB9_E5),w===n.RGBA){const Fe=ce?Wr:et.getTransfer(ne);$===n.FLOAT&&(se=n.RGBA32F),$===n.HALF_FLOAT&&(se=n.RGBA16F),$===n.UNSIGNED_BYTE&&(se=Fe===at?n.SRGB8_ALPHA8:n.RGBA8),$===n.UNSIGNED_SHORT_4_4_4_4&&(se=n.RGBA4),$===n.UNSIGNED_SHORT_5_5_5_1&&(se=n.RGB5_A1)}return(se===n.R16F||se===n.R32F||se===n.RG16F||se===n.RG32F||se===n.RGBA16F||se===n.RGBA32F)&&e.get("EXT_color_buffer_float"),se}function y(D,w){let $;return D?w===null||w===Ji||w===hs?$=n.DEPTH24_STENCIL8:w===Kt?$=n.DEPTH32F_STENCIL8:w===Ns&&($=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Ji||w===hs?$=n.DEPTH_COMPONENT24:w===Kt?$=n.DEPTH_COMPONENT32F:w===Ns&&($=n.DEPTH_COMPONENT16),$}function I(D,w){return _(D)===!0||D.isFramebufferTexture&&D.minFilter!==Bt&&D.minFilter!==gt?Math.log2(Math.max(w.width,w.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?w.mipmaps.length:1}function A(D){const w=D.target;w.removeEventListener("dispose",A),L(w),w.isVideoTexture&&u.delete(w)}function P(D){const w=D.target;w.removeEventListener("dispose",P),S(w)}function L(D){const w=i.get(D);if(w.__webglInit===void 0)return;const $=D.source,ne=p.get($);if(ne){const ce=ne[w.__cacheKey];ce.usedTimes--,ce.usedTimes===0&&E(D),Object.keys(ne).length===0&&p.delete($)}i.remove(D)}function E(D){const w=i.get(D);n.deleteTexture(w.__webglTexture);const $=D.source,ne=p.get($);delete ne[w.__cacheKey],a.memory.textures--}function S(D){const w=i.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),i.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(w.__webglFramebuffer[ne]))for(let ce=0;ce<w.__webglFramebuffer[ne].length;ce++)n.deleteFramebuffer(w.__webglFramebuffer[ne][ce]);else n.deleteFramebuffer(w.__webglFramebuffer[ne]);w.__webglDepthbuffer&&n.deleteRenderbuffer(w.__webglDepthbuffer[ne])}else{if(Array.isArray(w.__webglFramebuffer))for(let ne=0;ne<w.__webglFramebuffer.length;ne++)n.deleteFramebuffer(w.__webglFramebuffer[ne]);else n.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&n.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&n.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let ne=0;ne<w.__webglColorRenderbuffer.length;ne++)w.__webglColorRenderbuffer[ne]&&n.deleteRenderbuffer(w.__webglColorRenderbuffer[ne]);w.__webglDepthRenderbuffer&&n.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const $=D.textures;for(let ne=0,ce=$.length;ne<ce;ne++){const se=i.get($[ne]);se.__webglTexture&&(n.deleteTexture(se.__webglTexture),a.memory.textures--),i.remove($[ne])}i.remove(D)}let R=0;function F(){R=0}function O(){const D=R;return D>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+s.maxTextures),R+=1,D}function V(D){const w=[];return w.push(D.wrapS),w.push(D.wrapT),w.push(D.wrapR||0),w.push(D.magFilter),w.push(D.minFilter),w.push(D.anisotropy),w.push(D.internalFormat),w.push(D.format),w.push(D.type),w.push(D.generateMipmaps),w.push(D.premultiplyAlpha),w.push(D.flipY),w.push(D.unpackAlignment),w.push(D.colorSpace),w.join()}function K(D,w){const $=i.get(D);if(D.isVideoTexture&&_e(D),D.isRenderTargetTexture===!1&&D.version>0&&$.__version!==D.version){const ne=D.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y($,D,w);return}}t.bindTexture(n.TEXTURE_2D,$.__webglTexture,n.TEXTURE0+w)}function z(D,w){const $=i.get(D);if(D.version>0&&$.__version!==D.version){Y($,D,w);return}t.bindTexture(n.TEXTURE_2D_ARRAY,$.__webglTexture,n.TEXTURE0+w)}function q(D,w){const $=i.get(D);if(D.version>0&&$.__version!==D.version){Y($,D,w);return}t.bindTexture(n.TEXTURE_3D,$.__webglTexture,n.TEXTURE0+w)}function N(D,w){const $=i.get(D);if(D.version>0&&$.__version!==D.version){ee($,D,w);return}t.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture,n.TEXTURE0+w)}const k={[En]:n.REPEAT,[yn]:n.CLAMP_TO_EDGE,[yo]:n.MIRRORED_REPEAT},j={[Bt]:n.NEAREST,[sd]:n.NEAREST_MIPMAP_NEAREST,[$s]:n.NEAREST_MIPMAP_LINEAR,[gt]:n.LINEAR,[ua]:n.LINEAR_MIPMAP_NEAREST,[Di]:n.LINEAR_MIPMAP_LINEAR},ie={[ld]:n.NEVER,[pd]:n.ALWAYS,[cd]:n.LESS,[Ih]:n.LEQUAL,[hd]:n.EQUAL,[fd]:n.GEQUAL,[ud]:n.GREATER,[dd]:n.NOTEQUAL};function de(D,w){if(w.type===Kt&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===gt||w.magFilter===ua||w.magFilter===$s||w.magFilter===Di||w.minFilter===gt||w.minFilter===ua||w.minFilter===$s||w.minFilter===Di)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(D,n.TEXTURE_WRAP_S,k[w.wrapS]),n.texParameteri(D,n.TEXTURE_WRAP_T,k[w.wrapT]),(D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY)&&n.texParameteri(D,n.TEXTURE_WRAP_R,k[w.wrapR]),n.texParameteri(D,n.TEXTURE_MAG_FILTER,j[w.magFilter]),n.texParameteri(D,n.TEXTURE_MIN_FILTER,j[w.minFilter]),w.compareFunction&&(n.texParameteri(D,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(D,n.TEXTURE_COMPARE_FUNC,ie[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Bt||w.minFilter!==$s&&w.minFilter!==Di||w.type===Kt&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||i.get(w).__currentAnisotropy){const $=e.get("EXT_texture_filter_anisotropic");n.texParameterf(D,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),i.get(w).__currentAnisotropy=w.anisotropy}}}function we(D,w){let $=!1;D.__webglInit===void 0&&(D.__webglInit=!0,w.addEventListener("dispose",A));const ne=w.source;let ce=p.get(ne);ce===void 0&&(ce={},p.set(ne,ce));const se=V(w);if(se!==D.__cacheKey){ce[se]===void 0&&(ce[se]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,$=!0),ce[se].usedTimes++;const Fe=ce[D.__cacheKey];Fe!==void 0&&(ce[D.__cacheKey].usedTimes--,Fe.usedTimes===0&&E(w)),D.__cacheKey=se,D.__webglTexture=ce[se].texture}return $}function Y(D,w,$){let ne=n.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(ne=n.TEXTURE_2D_ARRAY),w.isData3DTexture&&(ne=n.TEXTURE_3D);const ce=we(D,w),se=w.source;t.bindTexture(ne,D.__webglTexture,n.TEXTURE0+$);const Fe=i.get(se);if(se.version!==Fe.__version||ce===!0){t.activeTexture(n.TEXTURE0+$);const ve=et.getPrimaries(et.workingColorSpace),Ae=w.colorSpace===Yi?null:et.getPrimaries(w.colorSpace),je=w.colorSpace===Yi||ve===Ae?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,je);let me=v(w.image,!1,s.maxTextureSize);me=ze(w,me);const Re=r.convert(w.format,w.colorSpace),ke=r.convert(w.type);let He=b(w.internalFormat,Re,ke,w.colorSpace,w.isVideoTexture);de(ne,w);let Ie;const Je=w.mipmaps,$e=w.isVideoTexture!==!0,ct=Fe.__version===void 0||ce===!0,G=se.dataReady,ye=I(w,me);if(w.isDepthTexture)He=y(w.format===us,w.type),ct&&($e?t.texStorage2D(n.TEXTURE_2D,1,He,me.width,me.height):t.texImage2D(n.TEXTURE_2D,0,He,me.width,me.height,0,Re,ke,null));else if(w.isDataTexture)if(Je.length>0){$e&&ct&&t.texStorage2D(n.TEXTURE_2D,ye,He,Je[0].width,Je[0].height);for(let Q=0,oe=Je.length;Q<oe;Q++)Ie=Je[Q],$e?G&&t.texSubImage2D(n.TEXTURE_2D,Q,0,0,Ie.width,Ie.height,Re,ke,Ie.data):t.texImage2D(n.TEXTURE_2D,Q,He,Ie.width,Ie.height,0,Re,ke,Ie.data);w.generateMipmaps=!1}else $e?(ct&&t.texStorage2D(n.TEXTURE_2D,ye,He,me.width,me.height),G&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,me.width,me.height,Re,ke,me.data)):t.texImage2D(n.TEXTURE_2D,0,He,me.width,me.height,0,Re,ke,me.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){$e&&ct&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ye,He,Je[0].width,Je[0].height,me.depth);for(let Q=0,oe=Je.length;Q<oe;Q++)if(Ie=Je[Q],w.format!==bt)if(Re!==null)if($e){if(G)if(w.layerUpdates.size>0){const Te=wc(Ie.width,Ie.height,w.format,w.type);for(const Ee of w.layerUpdates){const qe=Ie.data.subarray(Ee*Te/Ie.data.BYTES_PER_ELEMENT,(Ee+1)*Te/Ie.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Q,0,0,Ee,Ie.width,Ie.height,1,Re,qe)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Q,0,0,0,Ie.width,Ie.height,me.depth,Re,Ie.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Q,He,Ie.width,Ie.height,me.depth,0,Ie.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else $e?G&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,Q,0,0,0,Ie.width,Ie.height,me.depth,Re,ke,Ie.data):t.texImage3D(n.TEXTURE_2D_ARRAY,Q,He,Ie.width,Ie.height,me.depth,0,Re,ke,Ie.data)}else{$e&&ct&&t.texStorage2D(n.TEXTURE_2D,ye,He,Je[0].width,Je[0].height);for(let Q=0,oe=Je.length;Q<oe;Q++)Ie=Je[Q],w.format!==bt?Re!==null?$e?G&&t.compressedTexSubImage2D(n.TEXTURE_2D,Q,0,0,Ie.width,Ie.height,Re,Ie.data):t.compressedTexImage2D(n.TEXTURE_2D,Q,He,Ie.width,Ie.height,0,Ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$e?G&&t.texSubImage2D(n.TEXTURE_2D,Q,0,0,Ie.width,Ie.height,Re,ke,Ie.data):t.texImage2D(n.TEXTURE_2D,Q,He,Ie.width,Ie.height,0,Re,ke,Ie.data)}else if(w.isDataArrayTexture)if($e){if(ct&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ye,He,me.width,me.height,me.depth),G)if(w.layerUpdates.size>0){const Q=wc(me.width,me.height,w.format,w.type);for(const oe of w.layerUpdates){const Te=me.data.subarray(oe*Q/me.data.BYTES_PER_ELEMENT,(oe+1)*Q/me.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,oe,me.width,me.height,1,Re,ke,Te)}w.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,me.width,me.height,me.depth,Re,ke,me.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,He,me.width,me.height,me.depth,0,Re,ke,me.data);else if(w.isData3DTexture)$e?(ct&&t.texStorage3D(n.TEXTURE_3D,ye,He,me.width,me.height,me.depth),G&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,me.width,me.height,me.depth,Re,ke,me.data)):t.texImage3D(n.TEXTURE_3D,0,He,me.width,me.height,me.depth,0,Re,ke,me.data);else if(w.isFramebufferTexture){if(ct)if($e)t.texStorage2D(n.TEXTURE_2D,ye,He,me.width,me.height);else{let Q=me.width,oe=me.height;for(let Te=0;Te<ye;Te++)t.texImage2D(n.TEXTURE_2D,Te,He,Q,oe,0,Re,ke,null),Q>>=1,oe>>=1}}else if(Je.length>0){if($e&&ct){const Q=Se(Je[0]);t.texStorage2D(n.TEXTURE_2D,ye,He,Q.width,Q.height)}for(let Q=0,oe=Je.length;Q<oe;Q++)Ie=Je[Q],$e?G&&t.texSubImage2D(n.TEXTURE_2D,Q,0,0,Re,ke,Ie):t.texImage2D(n.TEXTURE_2D,Q,He,Re,ke,Ie);w.generateMipmaps=!1}else if($e){if(ct){const Q=Se(me);t.texStorage2D(n.TEXTURE_2D,ye,He,Q.width,Q.height)}G&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Re,ke,me)}else t.texImage2D(n.TEXTURE_2D,0,He,Re,ke,me);_(w)&&m(ne),Fe.__version=se.version,w.onUpdate&&w.onUpdate(w)}D.__version=w.version}function ee(D,w,$){if(w.image.length!==6)return;const ne=we(D,w),ce=w.source;t.bindTexture(n.TEXTURE_CUBE_MAP,D.__webglTexture,n.TEXTURE0+$);const se=i.get(ce);if(ce.version!==se.__version||ne===!0){t.activeTexture(n.TEXTURE0+$);const Fe=et.getPrimaries(et.workingColorSpace),ve=w.colorSpace===Yi?null:et.getPrimaries(w.colorSpace),Ae=w.colorSpace===Yi||Fe===ve?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);const je=w.isCompressedTexture||w.image[0].isCompressedTexture,me=w.image[0]&&w.image[0].isDataTexture,Re=[];for(let oe=0;oe<6;oe++)!je&&!me?Re[oe]=v(w.image[oe],!0,s.maxCubemapSize):Re[oe]=me?w.image[oe].image:w.image[oe],Re[oe]=ze(w,Re[oe]);const ke=Re[0],He=r.convert(w.format,w.colorSpace),Ie=r.convert(w.type),Je=b(w.internalFormat,He,Ie,w.colorSpace),$e=w.isVideoTexture!==!0,ct=se.__version===void 0||ne===!0,G=ce.dataReady;let ye=I(w,ke);de(n.TEXTURE_CUBE_MAP,w);let Q;if(je){$e&&ct&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ye,Je,ke.width,ke.height);for(let oe=0;oe<6;oe++){Q=Re[oe].mipmaps;for(let Te=0;Te<Q.length;Te++){const Ee=Q[Te];w.format!==bt?He!==null?$e?G&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Te,0,0,Ee.width,Ee.height,He,Ee.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Te,Je,Ee.width,Ee.height,0,Ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$e?G&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Te,0,0,Ee.width,Ee.height,He,Ie,Ee.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Te,Je,Ee.width,Ee.height,0,He,Ie,Ee.data)}}}else{if(Q=w.mipmaps,$e&&ct){Q.length>0&&ye++;const oe=Se(Re[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ye,Je,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(me){$e?G&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Re[oe].width,Re[oe].height,He,Ie,Re[oe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Je,Re[oe].width,Re[oe].height,0,He,Ie,Re[oe].data);for(let Te=0;Te<Q.length;Te++){const qe=Q[Te].image[oe].image;$e?G&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Te+1,0,0,qe.width,qe.height,He,Ie,qe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Te+1,Je,qe.width,qe.height,0,He,Ie,qe.data)}}else{$e?G&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,He,Ie,Re[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Je,He,Ie,Re[oe]);for(let Te=0;Te<Q.length;Te++){const Ee=Q[Te];$e?G&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Te+1,0,0,He,Ie,Ee.image[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Te+1,Je,He,Ie,Ee.image[oe])}}}_(w)&&m(n.TEXTURE_CUBE_MAP),se.__version=ce.version,w.onUpdate&&w.onUpdate(w)}D.__version=w.version}function he(D,w,$,ne,ce,se){const Fe=r.convert($.format,$.colorSpace),ve=r.convert($.type),Ae=b($.internalFormat,Fe,ve,$.colorSpace),je=i.get(w),me=i.get($);if(me.__renderTarget=w,!je.__hasExternalTextures){const Re=Math.max(1,w.width>>se),ke=Math.max(1,w.height>>se);ce===n.TEXTURE_3D||ce===n.TEXTURE_2D_ARRAY?t.texImage3D(ce,se,Ae,Re,ke,w.depth,0,Fe,ve,null):t.texImage2D(ce,se,Ae,Re,ke,0,Fe,ve,null)}t.bindFramebuffer(n.FRAMEBUFFER,D),Pe(w)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ne,ce,me.__webglTexture,0,fe(w)):(ce===n.TEXTURE_2D||ce>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ce<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ne,ce,me.__webglTexture,se),t.bindFramebuffer(n.FRAMEBUFFER,null)}function re(D,w,$){if(n.bindRenderbuffer(n.RENDERBUFFER,D),w.depthBuffer){const ne=w.depthTexture,ce=ne&&ne.isDepthTexture?ne.type:null,se=y(w.stencilBuffer,ce),Fe=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ve=fe(w);Pe(w)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ve,se,w.width,w.height):$?n.renderbufferStorageMultisample(n.RENDERBUFFER,ve,se,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,se,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Fe,n.RENDERBUFFER,D)}else{const ne=w.textures;for(let ce=0;ce<ne.length;ce++){const se=ne[ce],Fe=r.convert(se.format,se.colorSpace),ve=r.convert(se.type),Ae=b(se.internalFormat,Fe,ve,se.colorSpace),je=fe(w);$&&Pe(w)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,je,Ae,w.width,w.height):Pe(w)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,je,Ae,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,Ae,w.width,w.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function be(D,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,D),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ne=i.get(w.depthTexture);ne.__renderTarget=w,(!ne.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),K(w.depthTexture,0);const ce=ne.__webglTexture,se=fe(w);if(w.depthTexture.format===is)Pe(w)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ce,0,se):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ce,0);else if(w.depthTexture.format===us)Pe(w)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ce,0,se):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ce,0);else throw new Error("Unknown depthTexture format")}function De(D){const w=i.get(D),$=D.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==D.depthTexture){const ne=D.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),ne){const ce=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,ne.removeEventListener("dispose",ce)};ne.addEventListener("dispose",ce),w.__depthDisposeCallback=ce}w.__boundDepthTexture=ne}if(D.depthTexture&&!w.__autoAllocateDepthBuffer){if($)throw new Error("target.depthTexture not supported in Cube render targets");be(w.__webglFramebuffer,D)}else if($){w.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)if(t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer[ne]),w.__webglDepthbuffer[ne]===void 0)w.__webglDepthbuffer[ne]=n.createRenderbuffer(),re(w.__webglDepthbuffer[ne],D,!1);else{const ce=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,se=w.__webglDepthbuffer[ne];n.bindRenderbuffer(n.RENDERBUFFER,se),n.framebufferRenderbuffer(n.FRAMEBUFFER,ce,n.RENDERBUFFER,se)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=n.createRenderbuffer(),re(w.__webglDepthbuffer,D,!1);else{const ne=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=w.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ce),n.framebufferRenderbuffer(n.FRAMEBUFFER,ne,n.RENDERBUFFER,ce)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function ge(D,w,$){const ne=i.get(D);w!==void 0&&he(ne.__webglFramebuffer,D,D.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),$!==void 0&&De(D)}function Be(D){const w=D.texture,$=i.get(D),ne=i.get(w);D.addEventListener("dispose",P);const ce=D.textures,se=D.isWebGLCubeRenderTarget===!0,Fe=ce.length>1;if(Fe||(ne.__webglTexture===void 0&&(ne.__webglTexture=n.createTexture()),ne.__version=w.version,a.memory.textures++),se){$.__webglFramebuffer=[];for(let ve=0;ve<6;ve++)if(w.mipmaps&&w.mipmaps.length>0){$.__webglFramebuffer[ve]=[];for(let Ae=0;Ae<w.mipmaps.length;Ae++)$.__webglFramebuffer[ve][Ae]=n.createFramebuffer()}else $.__webglFramebuffer[ve]=n.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){$.__webglFramebuffer=[];for(let ve=0;ve<w.mipmaps.length;ve++)$.__webglFramebuffer[ve]=n.createFramebuffer()}else $.__webglFramebuffer=n.createFramebuffer();if(Fe)for(let ve=0,Ae=ce.length;ve<Ae;ve++){const je=i.get(ce[ve]);je.__webglTexture===void 0&&(je.__webglTexture=n.createTexture(),a.memory.textures++)}if(D.samples>0&&Pe(D)===!1){$.__webglMultisampledFramebuffer=n.createFramebuffer(),$.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let ve=0;ve<ce.length;ve++){const Ae=ce[ve];$.__webglColorRenderbuffer[ve]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,$.__webglColorRenderbuffer[ve]);const je=r.convert(Ae.format,Ae.colorSpace),me=r.convert(Ae.type),Re=b(Ae.internalFormat,je,me,Ae.colorSpace,D.isXRRenderTarget===!0),ke=fe(D);n.renderbufferStorageMultisample(n.RENDERBUFFER,ke,Re,D.width,D.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.RENDERBUFFER,$.__webglColorRenderbuffer[ve])}n.bindRenderbuffer(n.RENDERBUFFER,null),D.depthBuffer&&($.__webglDepthRenderbuffer=n.createRenderbuffer(),re($.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(se){t.bindTexture(n.TEXTURE_CUBE_MAP,ne.__webglTexture),de(n.TEXTURE_CUBE_MAP,w);for(let ve=0;ve<6;ve++)if(w.mipmaps&&w.mipmaps.length>0)for(let Ae=0;Ae<w.mipmaps.length;Ae++)he($.__webglFramebuffer[ve][Ae],D,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Ae);else he($.__webglFramebuffer[ve],D,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0);_(w)&&m(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Fe){for(let ve=0,Ae=ce.length;ve<Ae;ve++){const je=ce[ve],me=i.get(je);t.bindTexture(n.TEXTURE_2D,me.__webglTexture),de(n.TEXTURE_2D,je),he($.__webglFramebuffer,D,je,n.COLOR_ATTACHMENT0+ve,n.TEXTURE_2D,0),_(je)&&m(n.TEXTURE_2D)}t.unbindTexture()}else{let ve=n.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(ve=D.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ve,ne.__webglTexture),de(ve,w),w.mipmaps&&w.mipmaps.length>0)for(let Ae=0;Ae<w.mipmaps.length;Ae++)he($.__webglFramebuffer[Ae],D,w,n.COLOR_ATTACHMENT0,ve,Ae);else he($.__webglFramebuffer,D,w,n.COLOR_ATTACHMENT0,ve,0);_(w)&&m(ve),t.unbindTexture()}D.depthBuffer&&De(D)}function ae(D){const w=D.textures;for(let $=0,ne=w.length;$<ne;$++){const ce=w[$];if(_(ce)){const se=M(D),Fe=i.get(ce).__webglTexture;t.bindTexture(se,Fe),m(se),t.unbindTexture()}}}const te=[],U=[];function Ue(D){if(D.samples>0){if(Pe(D)===!1){const w=D.textures,$=D.width,ne=D.height;let ce=n.COLOR_BUFFER_BIT;const se=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Fe=i.get(D),ve=w.length>1;if(ve)for(let Ae=0;Ae<w.length;Ae++)t.bindFramebuffer(n.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Fe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Fe.__webglFramebuffer);for(let Ae=0;Ae<w.length;Ae++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(ce|=n.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(ce|=n.STENCIL_BUFFER_BIT)),ve){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Fe.__webglColorRenderbuffer[Ae]);const je=i.get(w[Ae]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,je,0)}n.blitFramebuffer(0,0,$,ne,0,0,$,ne,ce,n.NEAREST),l===!0&&(te.length=0,U.length=0,te.push(n.COLOR_ATTACHMENT0+Ae),D.depthBuffer&&D.resolveDepthBuffer===!1&&(te.push(se),U.push(se),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,U)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,te))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ve)for(let Ae=0;Ae<w.length;Ae++){t.bindFramebuffer(n.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.RENDERBUFFER,Fe.__webglColorRenderbuffer[Ae]);const je=i.get(w[Ae]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Fe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.TEXTURE_2D,je,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&l){const w=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[w])}}}function fe(D){return Math.min(s.maxSamples,D.samples)}function Pe(D){const w=i.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function _e(D){const w=a.render.frame;u.get(D)!==w&&(u.set(D,w),D.update())}function ze(D,w){const $=D.colorSpace,ne=D.format,ce=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||$!==ds&&$!==Yi&&(et.getTransfer($)===at?(ne!==bt||ce!==Ni)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",$)),w}function Se(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(h.width=D.naturalWidth||D.width,h.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(h.width=D.displayWidth,h.height=D.displayHeight):(h.width=D.width,h.height=D.height),h}this.allocateTextureUnit=O,this.resetTextureUnits=F,this.setTexture2D=K,this.setTexture2DArray=z,this.setTexture3D=q,this.setTextureCube=N,this.rebindTextures=ge,this.setupRenderTarget=Be,this.updateRenderTargetMipmap=ae,this.updateMultisampleRenderTarget=Ue,this.setupDepthRenderbuffer=De,this.setupFrameBufferTexture=he,this.useMultisampledRTT=Pe}function F0(n,e){function t(i,s=Yi){let r;const a=et.getTransfer(s);if(i===Ni)return n.UNSIGNED_BYTE;if(i===nl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===sl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Eh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===bh)return n.BYTE;if(i===Sh)return n.SHORT;if(i===Ns)return n.UNSIGNED_SHORT;if(i===il)return n.INT;if(i===Ji)return n.UNSIGNED_INT;if(i===Kt)return n.FLOAT;if(i===Hs)return n.HALF_FLOAT;if(i===wh)return n.ALPHA;if(i===Th)return n.RGB;if(i===bt)return n.RGBA;if(i===Ah)return n.LUMINANCE;if(i===Ph)return n.LUMINANCE_ALPHA;if(i===is)return n.DEPTH_COMPONENT;if(i===us)return n.DEPTH_STENCIL;if(i===rl)return n.RED;if(i===Qr)return n.RED_INTEGER;if(i===Ch)return n.RG;if(i===al)return n.RG_INTEGER;if(i===ol)return n.RGBA_INTEGER;if(i===Or||i===Br||i===Vr||i===zr)if(a===at)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Or)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Or)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Br)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Vr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===zr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Mo||i===bo||i===So||i===Eo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Mo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===bo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===So)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Eo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===wo||i===To||i===Ao)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===wo||i===To)return a===at?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Ao)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Po||i===Co||i===Ro||i===Io||i===Lo||i===Do||i===Uo||i===Fo||i===No||i===Oo||i===Bo||i===Vo||i===zo||i===ko)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Po)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Co)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ro)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Io)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Lo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Do)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Uo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Fo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===No)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Oo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Bo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Vo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===zo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ko)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===kr||i===Ho||i===Go)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===kr)return a===at?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ho)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Go)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Rh||i===Wo||i===Xo||i===qo)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===kr)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Wo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Xo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===qo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===hs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const N0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,O0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class B0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const s=new Rt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!==i.depthNear||t.depthFar!==i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new en({vertexShader:N0,fragmentShader:O0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ct(new Xs(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class V0 extends Pn{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,h=null,u=null,d=null,p=null,f=null,x=null;const v=new B0,_=t.getContextAttributes();let m=null,M=null;const b=[],y=[],I=new ue;let A=null;const P=new ii;P.viewport=new _t;const L=new ii;L.viewport=new _t;const E=[P,L],S=new np;let R=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let ee=b[Y];return ee===void 0&&(ee=new Ia,b[Y]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(Y){let ee=b[Y];return ee===void 0&&(ee=new Ia,b[Y]=ee),ee.getGripSpace()},this.getHand=function(Y){let ee=b[Y];return ee===void 0&&(ee=new Ia,b[Y]=ee),ee.getHandSpace()};function O(Y){const ee=y.indexOf(Y.inputSource);if(ee===-1)return;const he=b[ee];he!==void 0&&(he.update(Y.inputSource,Y.frame,h||a),he.dispatchEvent({type:Y.type,data:Y.inputSource}))}function V(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",K);for(let Y=0;Y<b.length;Y++){const ee=y[Y];ee!==null&&(y[Y]=null,b[Y].disconnect(ee))}R=null,F=null,v.reset(),e.setRenderTarget(m),f=null,p=null,d=null,s=null,M=null,we.stop(),i.isPresenting=!1,e.setPixelRatio(A),e.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||a},this.setReferenceSpace=function(Y){h=Y},this.getBaseLayer=function(){return p!==null?p:f},this.getBinding=function(){return d},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",V),s.addEventListener("inputsourceschange",K),_.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(I),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let he=null,re=null,be=null;_.depth&&(be=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,he=_.stencil?us:is,re=_.stencil?hs:Ji);const De={colorFormat:t.RGBA8,depthFormat:be,scaleFactor:r};d=new XRWebGLBinding(s,t),p=d.createProjectionLayer(De),s.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),M=new wn(p.textureWidth,p.textureHeight,{format:bt,type:Ni,depthTexture:new kh(p.textureWidth,p.textureHeight,re,void 0,void 0,void 0,void 0,void 0,void 0,he),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{const he={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,he),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new wn(f.framebufferWidth,f.framebufferHeight,{format:bt,type:Ni,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),h=null,a=await s.requestReferenceSpace(o),we.setContext(s),we.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function K(Y){for(let ee=0;ee<Y.removed.length;ee++){const he=Y.removed[ee],re=y.indexOf(he);re>=0&&(y[re]=null,b[re].disconnect(he))}for(let ee=0;ee<Y.added.length;ee++){const he=Y.added[ee];let re=y.indexOf(he);if(re===-1){for(let De=0;De<b.length;De++)if(De>=y.length){y.push(he),re=De;break}else if(y[De]===null){y[De]=he,re=De;break}if(re===-1)break}const be=b[re];be&&be.connect(he)}}const z=new T,q=new T;function N(Y,ee,he){z.setFromMatrixPosition(ee.matrixWorld),q.setFromMatrixPosition(he.matrixWorld);const re=z.distanceTo(q),be=ee.projectionMatrix.elements,De=he.projectionMatrix.elements,ge=be[14]/(be[10]-1),Be=be[14]/(be[10]+1),ae=(be[9]+1)/be[5],te=(be[9]-1)/be[5],U=(be[8]-1)/be[0],Ue=(De[8]+1)/De[0],fe=ge*U,Pe=ge*Ue,_e=re/(-U+Ue),ze=_e*-U;if(ee.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(ze),Y.translateZ(_e),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),be[10]===-1)Y.projectionMatrix.copy(ee.projectionMatrix),Y.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{const Se=ge+_e,D=Be+_e,w=fe-ze,$=Pe+(re-ze),ne=ae*Be/D*Se,ce=te*Be/D*Se;Y.projectionMatrix.makePerspective(w,$,ne,ce,Se,D),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function k(Y,ee){ee===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(ee.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let ee=Y.near,he=Y.far;v.texture!==null&&(v.depthNear>0&&(ee=v.depthNear),v.depthFar>0&&(he=v.depthFar)),S.near=L.near=P.near=ee,S.far=L.far=P.far=he,(R!==S.near||F!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),R=S.near,F=S.far),P.layers.mask=Y.layers.mask|2,L.layers.mask=Y.layers.mask|4,S.layers.mask=P.layers.mask|L.layers.mask;const re=Y.parent,be=S.cameras;k(S,re);for(let De=0;De<be.length;De++)k(be[De],re);be.length===2?N(S,P,L):S.projectionMatrix.copy(P.projectionMatrix),j(Y,S,re)};function j(Y,ee,he){he===null?Y.matrix.copy(ee.matrixWorld):(Y.matrix.copy(he.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(ee.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(ee.projectionMatrix),Y.projectionMatrixInverse.copy(ee.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Os*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(p===null&&f===null))return l},this.setFoveation=function(Y){l=Y,p!==null&&(p.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(S)};let ie=null;function de(Y,ee){if(u=ee.getViewerPose(h||a),x=ee,u!==null){const he=u.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let re=!1;he.length!==S.cameras.length&&(S.cameras.length=0,re=!0);for(let ge=0;ge<he.length;ge++){const Be=he[ge];let ae=null;if(f!==null)ae=f.getViewport(Be);else{const U=d.getViewSubImage(p,Be);ae=U.viewport,ge===0&&(e.setRenderTargetTextures(M,U.colorTexture,p.ignoreDepthValues?void 0:U.depthStencilTexture),e.setRenderTarget(M))}let te=E[ge];te===void 0&&(te=new ii,te.layers.enable(ge),te.viewport=new _t,E[ge]=te),te.matrix.fromArray(Be.transform.matrix),te.matrix.decompose(te.position,te.quaternion,te.scale),te.projectionMatrix.fromArray(Be.projectionMatrix),te.projectionMatrixInverse.copy(te.projectionMatrix).invert(),te.viewport.set(ae.x,ae.y,ae.width,ae.height),ge===0&&(S.matrix.copy(te.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),re===!0&&S.cameras.push(te)}const be=s.enabledFeatures;if(be&&be.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&d){const ge=d.getDepthInformation(he[0]);ge&&ge.isValid&&ge.texture&&v.init(e,ge,s.renderState)}}for(let he=0;he<b.length;he++){const re=y[he],be=b[he];re!==null&&be!==void 0&&be.update(re,ee,h||a)}ie&&ie(Y,ee),ee.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ee}),x=null}const we=new lu;we.setAnimationLoop(de),this.setAnimationLoop=function(Y){ie=Y},this.dispose=function(){}}}const un=new si,z0=new st;function k0(n,e){function t(_,m){_.matrixAutoUpdate===!0&&_.updateMatrix(),m.value.copy(_.matrix)}function i(_,m){m.color.getRGB(_.fogColor.value,Oh(n)),m.isFog?(_.fogNear.value=m.near,_.fogFar.value=m.far):m.isFogExp2&&(_.fogDensity.value=m.density)}function s(_,m,M,b,y){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(_,m):m.isMeshToonMaterial?(r(_,m),d(_,m)):m.isMeshPhongMaterial?(r(_,m),u(_,m)):m.isMeshStandardMaterial?(r(_,m),p(_,m),m.isMeshPhysicalMaterial&&f(_,m,y)):m.isMeshMatcapMaterial?(r(_,m),x(_,m)):m.isMeshDepthMaterial?r(_,m):m.isMeshDistanceMaterial?(r(_,m),v(_,m)):m.isMeshNormalMaterial?r(_,m):m.isLineBasicMaterial?(a(_,m),m.isLineDashedMaterial&&o(_,m)):m.isPointsMaterial?l(_,m,M,b):m.isSpriteMaterial?h(_,m):m.isShadowMaterial?(_.color.value.copy(m.color),_.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(_,m){_.opacity.value=m.opacity,m.color&&_.diffuse.value.copy(m.color),m.emissive&&_.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(_.map.value=m.map,t(m.map,_.mapTransform)),m.alphaMap&&(_.alphaMap.value=m.alphaMap,t(m.alphaMap,_.alphaMapTransform)),m.bumpMap&&(_.bumpMap.value=m.bumpMap,t(m.bumpMap,_.bumpMapTransform),_.bumpScale.value=m.bumpScale,m.side===Gt&&(_.bumpScale.value*=-1)),m.normalMap&&(_.normalMap.value=m.normalMap,t(m.normalMap,_.normalMapTransform),_.normalScale.value.copy(m.normalScale),m.side===Gt&&_.normalScale.value.negate()),m.displacementMap&&(_.displacementMap.value=m.displacementMap,t(m.displacementMap,_.displacementMapTransform),_.displacementScale.value=m.displacementScale,_.displacementBias.value=m.displacementBias),m.emissiveMap&&(_.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,_.emissiveMapTransform)),m.specularMap&&(_.specularMap.value=m.specularMap,t(m.specularMap,_.specularMapTransform)),m.alphaTest>0&&(_.alphaTest.value=m.alphaTest);const M=e.get(m),b=M.envMap,y=M.envMapRotation;b&&(_.envMap.value=b,un.copy(y),un.x*=-1,un.y*=-1,un.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(un.y*=-1,un.z*=-1),_.envMapRotation.value.setFromMatrix4(z0.makeRotationFromEuler(un)),_.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,_.reflectivity.value=m.reflectivity,_.ior.value=m.ior,_.refractionRatio.value=m.refractionRatio),m.lightMap&&(_.lightMap.value=m.lightMap,_.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,_.lightMapTransform)),m.aoMap&&(_.aoMap.value=m.aoMap,_.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,_.aoMapTransform))}function a(_,m){_.diffuse.value.copy(m.color),_.opacity.value=m.opacity,m.map&&(_.map.value=m.map,t(m.map,_.mapTransform))}function o(_,m){_.dashSize.value=m.dashSize,_.totalSize.value=m.dashSize+m.gapSize,_.scale.value=m.scale}function l(_,m,M,b){_.diffuse.value.copy(m.color),_.opacity.value=m.opacity,_.size.value=m.size*M,_.scale.value=b*.5,m.map&&(_.map.value=m.map,t(m.map,_.uvTransform)),m.alphaMap&&(_.alphaMap.value=m.alphaMap,t(m.alphaMap,_.alphaMapTransform)),m.alphaTest>0&&(_.alphaTest.value=m.alphaTest)}function h(_,m){_.diffuse.value.copy(m.color),_.opacity.value=m.opacity,_.rotation.value=m.rotation,m.map&&(_.map.value=m.map,t(m.map,_.mapTransform)),m.alphaMap&&(_.alphaMap.value=m.alphaMap,t(m.alphaMap,_.alphaMapTransform)),m.alphaTest>0&&(_.alphaTest.value=m.alphaTest)}function u(_,m){_.specular.value.copy(m.specular),_.shininess.value=Math.max(m.shininess,1e-4)}function d(_,m){m.gradientMap&&(_.gradientMap.value=m.gradientMap)}function p(_,m){_.metalness.value=m.metalness,m.metalnessMap&&(_.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,_.metalnessMapTransform)),_.roughness.value=m.roughness,m.roughnessMap&&(_.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,_.roughnessMapTransform)),m.envMap&&(_.envMapIntensity.value=m.envMapIntensity)}function f(_,m,M){_.ior.value=m.ior,m.sheen>0&&(_.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),_.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(_.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,_.sheenColorMapTransform)),m.sheenRoughnessMap&&(_.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,_.sheenRoughnessMapTransform))),m.clearcoat>0&&(_.clearcoat.value=m.clearcoat,_.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(_.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,_.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(_.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Gt&&_.clearcoatNormalScale.value.negate())),m.dispersion>0&&(_.dispersion.value=m.dispersion),m.iridescence>0&&(_.iridescence.value=m.iridescence,_.iridescenceIOR.value=m.iridescenceIOR,_.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(_.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,_.iridescenceMapTransform)),m.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),m.transmission>0&&(_.transmission.value=m.transmission,_.transmissionSamplerMap.value=M.texture,_.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(_.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,_.transmissionMapTransform)),_.thickness.value=m.thickness,m.thicknessMap&&(_.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=m.attenuationDistance,_.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(_.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(_.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=m.specularIntensity,_.specularColor.value.copy(m.specularColor),m.specularColorMap&&(_.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,_.specularColorMapTransform)),m.specularIntensityMap&&(_.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,_.specularIntensityMapTransform))}function x(_,m){m.matcap&&(_.matcap.value=m.matcap)}function v(_,m){const M=e.get(m).light;_.referencePosition.value.setFromMatrixPosition(M.matrixWorld),_.nearDistance.value=M.shadow.camera.near,_.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function H0(n,e,t,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,b){const y=b.program;i.uniformBlockBinding(M,y)}function h(M,b){let y=s[M.id];y===void 0&&(x(M),y=u(M),s[M.id]=y,M.addEventListener("dispose",_));const I=b.program;i.updateUBOMapping(M,I);const A=e.render.frame;r[M.id]!==A&&(p(M),r[M.id]=A)}function u(M){const b=d();M.__bindingPointIndex=b;const y=n.createBuffer(),I=M.__size,A=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,I,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,b,y),y}function d(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(M){const b=s[M.id],y=M.uniforms,I=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,b);for(let A=0,P=y.length;A<P;A++){const L=Array.isArray(y[A])?y[A]:[y[A]];for(let E=0,S=L.length;E<S;E++){const R=L[E];if(f(R,A,E,I)===!0){const F=R.__offset,O=Array.isArray(R.value)?R.value:[R.value];let V=0;for(let K=0;K<O.length;K++){const z=O[K],q=v(z);typeof z=="number"||typeof z=="boolean"?(R.__data[0]=z,n.bufferSubData(n.UNIFORM_BUFFER,F+V,R.__data)):z.isMatrix3?(R.__data[0]=z.elements[0],R.__data[1]=z.elements[1],R.__data[2]=z.elements[2],R.__data[3]=0,R.__data[4]=z.elements[3],R.__data[5]=z.elements[4],R.__data[6]=z.elements[5],R.__data[7]=0,R.__data[8]=z.elements[6],R.__data[9]=z.elements[7],R.__data[10]=z.elements[8],R.__data[11]=0):(z.toArray(R.__data,V),V+=q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,F,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(M,b,y,I){const A=M.value,P=b+"_"+y;if(I[P]===void 0)return typeof A=="number"||typeof A=="boolean"?I[P]=A:I[P]=A.clone(),!0;{const L=I[P];if(typeof A=="number"||typeof A=="boolean"){if(L!==A)return I[P]=A,!0}else if(L.equals(A)===!1)return L.copy(A),!0}return!1}function x(M){const b=M.uniforms;let y=0;const I=16;for(let P=0,L=b.length;P<L;P++){const E=Array.isArray(b[P])?b[P]:[b[P]];for(let S=0,R=E.length;S<R;S++){const F=E[S],O=Array.isArray(F.value)?F.value:[F.value];for(let V=0,K=O.length;V<K;V++){const z=O[V],q=v(z),N=y%I,k=N%q.boundary,j=N+k;y+=k,j!==0&&I-j<q.storage&&(y+=I-j),F.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=y,y+=q.storage}}}const A=y%I;return A>0&&(y+=I-A),M.__size=y,M.__cache={},this}function v(M){const b={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(b.boundary=4,b.storage=4):M.isVector2?(b.boundary=8,b.storage=8):M.isVector3||M.isColor?(b.boundary=16,b.storage=12):M.isVector4?(b.boundary=16,b.storage=16):M.isMatrix3?(b.boundary=48,b.storage=48):M.isMatrix4?(b.boundary=64,b.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),b}function _(M){const b=M.target;b.removeEventListener("dispose",_);const y=a.indexOf(b.__bindingPointIndex);a.splice(y,1),n.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function m(){for(const M in s)n.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:h,dispose:m}}class G0{constructor(e={}){const{canvas:t=Id(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:h=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:p=!1}=e;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=a;const x=new Uint32Array(4),v=new Int32Array(4);let _=null,m=null;const M=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Mt,this.toneMapping=ji,this.toneMappingExposure=1;const y=this;let I=!1,A=0,P=0,L=null,E=-1,S=null;const R=new _t,F=new _t;let O=null;const V=new Ve(0);let K=0,z=t.width,q=t.height,N=1,k=null,j=null;const ie=new _t(0,0,z,q),de=new _t(0,0,z,q);let we=!1;const Y=new ta;let ee=!1,he=!1;this.transmissionResolutionScale=1;const re=new st,be=new st,De=new T,ge=new _t,Be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ae=!1;function te(){return L===null?N:1}let U=i;function Ue(C,W){return t.getContext(C,W)}try{const C={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:h,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${tl}`),t.addEventListener("webglcontextlost",oe,!1),t.addEventListener("webglcontextrestored",Te,!1),t.addEventListener("webglcontextcreationerror",Ee,!1),U===null){const W="webgl2";if(U=Ue(W,C),U===null)throw Ue(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let fe,Pe,_e,ze,Se,D,w,$,ne,ce,se,Fe,ve,Ae,je,me,Re,ke,He,Ie,Je,$e,ct,G;function ye(){fe=new Qg(U),fe.init(),$e=new F0(U,fe),Pe=new qg(U,fe,e,$e),_e=new D0(U,fe),Pe.reverseDepthBuffer&&p&&_e.buffers.depth.setReversed(!0),ze=new i_(U),Se=new y0,D=new U0(U,fe,_e,Se,Pe,$e,ze),w=new $g(y),$=new Jg(y),ne=new lp(U),ct=new Wg(U,ne),ce=new e_(U,ne,ze,ct),se=new s_(U,ce,ne,ze),He=new n_(U,Pe,D),me=new Yg(Se),Fe=new v0(y,w,$,fe,Pe,ct,me),ve=new k0(y,Se),Ae=new b0,je=new P0(fe),ke=new Gg(y,w,$,_e,se,f,l),Re=new I0(y,se,Pe),G=new H0(U,ze,Pe,_e),Ie=new Xg(U,fe,ze),Je=new t_(U,fe,ze),ze.programs=Fe.programs,y.capabilities=Pe,y.extensions=fe,y.properties=Se,y.renderLists=Ae,y.shadowMap=Re,y.state=_e,y.info=ze}ye();const Q=new V0(y,U);this.xr=Q,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const C=fe.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=fe.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return N},this.setPixelRatio=function(C){C!==void 0&&(N=C,this.setSize(z,q,!1))},this.getSize=function(C){return C.set(z,q)},this.setSize=function(C,W,Z=!0){if(Q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=C,q=W,t.width=Math.floor(C*N),t.height=Math.floor(W*N),Z===!0&&(t.style.width=C+"px",t.style.height=W+"px"),this.setViewport(0,0,C,W)},this.getDrawingBufferSize=function(C){return C.set(z*N,q*N).floor()},this.setDrawingBufferSize=function(C,W,Z){z=C,q=W,N=Z,t.width=Math.floor(C*Z),t.height=Math.floor(W*Z),this.setViewport(0,0,C,W)},this.getCurrentViewport=function(C){return C.copy(R)},this.getViewport=function(C){return C.copy(ie)},this.setViewport=function(C,W,Z,J){C.isVector4?ie.set(C.x,C.y,C.z,C.w):ie.set(C,W,Z,J),_e.viewport(R.copy(ie).multiplyScalar(N).round())},this.getScissor=function(C){return C.copy(de)},this.setScissor=function(C,W,Z,J){C.isVector4?de.set(C.x,C.y,C.z,C.w):de.set(C,W,Z,J),_e.scissor(F.copy(de).multiplyScalar(N).round())},this.getScissorTest=function(){return we},this.setScissorTest=function(C){_e.setScissorTest(we=C)},this.setOpaqueSort=function(C){k=C},this.setTransparentSort=function(C){j=C},this.getClearColor=function(C){return C.copy(ke.getClearColor())},this.setClearColor=function(){ke.setClearColor(...arguments)},this.getClearAlpha=function(){return ke.getClearAlpha()},this.setClearAlpha=function(){ke.setClearAlpha(...arguments)},this.clear=function(C=!0,W=!0,Z=!0){let J=0;if(C){let X=!1;if(L!==null){const pe=L.texture.format;X=pe===ol||pe===al||pe===Qr}if(X){const pe=L.texture.type,Me=pe===Ni||pe===Ji||pe===Ns||pe===hs||pe===nl||pe===sl,Ce=ke.getClearColor(),Le=ke.getClearAlpha(),Ge=Ce.r,We=Ce.g,Ne=Ce.b;Me?(x[0]=Ge,x[1]=We,x[2]=Ne,x[3]=Le,U.clearBufferuiv(U.COLOR,0,x)):(v[0]=Ge,v[1]=We,v[2]=Ne,v[3]=Le,U.clearBufferiv(U.COLOR,0,v))}else J|=U.COLOR_BUFFER_BIT}W&&(J|=U.DEPTH_BUFFER_BIT),Z&&(J|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",Te,!1),t.removeEventListener("webglcontextcreationerror",Ee,!1),ke.dispose(),Ae.dispose(),je.dispose(),Se.dispose(),w.dispose(),$.dispose(),se.dispose(),ct.dispose(),G.dispose(),Fe.dispose(),Q.dispose(),Q.removeEventListener("sessionstart",vl),Q.removeEventListener("sessionend",yl),tn.stop()};function oe(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function Te(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;const C=ze.autoReset,W=Re.enabled,Z=Re.autoUpdate,J=Re.needsUpdate,X=Re.type;ye(),ze.autoReset=C,Re.enabled=W,Re.autoUpdate=Z,Re.needsUpdate=J,Re.type=X}function Ee(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function qe(C){const W=C.target;W.removeEventListener("dispose",qe),ft(W)}function ft(C){It(C),Se.remove(C)}function It(C){const W=Se.get(C).programs;W!==void 0&&(W.forEach(function(Z){Fe.releaseProgram(Z)}),C.isShaderMaterial&&Fe.releaseShaderCache(C))}this.renderBufferDirect=function(C,W,Z,J,X,pe){W===null&&(W=Be);const Me=X.isMesh&&X.matrixWorld.determinant()<0,Ce=_u(C,W,Z,J,X);_e.setMaterial(J,Me);let Le=Z.index,Ge=1;if(J.wireframe===!0){if(Le=ce.getWireframeAttribute(Z),Le===void 0)return;Ge=2}const We=Z.drawRange,Ne=Z.attributes.position;let Qe=We.start*Ge,it=(We.start+We.count)*Ge;pe!==null&&(Qe=Math.max(Qe,pe.start*Ge),it=Math.min(it,(pe.start+pe.count)*Ge)),Le!==null?(Qe=Math.max(Qe,0),it=Math.min(it,Le.count)):Ne!=null&&(Qe=Math.max(Qe,0),it=Math.min(it,Ne.count));const vt=it-Qe;if(vt<0||vt===1/0)return;ct.setup(X,J,Ce,Z,Le);let pt,tt=Ie;if(Le!==null&&(pt=ne.get(Le),tt=Je,tt.setIndex(pt)),X.isMesh)J.wireframe===!0?(_e.setLineWidth(J.wireframeLinewidth*te()),tt.setMode(U.LINES)):tt.setMode(U.TRIANGLES);else if(X.isLine){let Oe=J.linewidth;Oe===void 0&&(Oe=1),_e.setLineWidth(Oe*te()),X.isLineSegments?tt.setMode(U.LINES):X.isLineLoop?tt.setMode(U.LINE_LOOP):tt.setMode(U.LINE_STRIP)}else X.isPoints?tt.setMode(U.POINTS):X.isSprite&&tt.setMode(U.TRIANGLES);if(X.isBatchedMesh)if(X._multiDrawInstances!==null)mn("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),tt.renderMultiDrawInstances(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount,X._multiDrawInstances);else if(fe.get("WEBGL_multi_draw"))tt.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const Oe=X._multiDrawStarts,Pt=X._multiDrawCounts,nt=X._multiDrawCount,oi=Le?ne.get(Le).bytesPerElement:1,Rn=Se.get(J).currentProgram.getUniforms();for(let Wt=0;Wt<nt;Wt++)Rn.setValue(U,"_gl_DrawID",Wt),tt.render(Oe[Wt]/oi,Pt[Wt])}else if(X.isInstancedMesh)tt.renderInstances(Qe,vt,X.count);else if(Z.isInstancedBufferGeometry){const Oe=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Pt=Math.min(Z.instanceCount,Oe);tt.renderInstances(Qe,vt,Pt)}else tt.render(Qe,vt)};function rt(C,W,Z){C.transparent===!0&&C.side===Ht&&C.forceSinglePass===!1?(C.side=Gt,C.needsUpdate=!0,Ys(C,W,Z),C.side=$t,C.needsUpdate=!0,Ys(C,W,Z),C.side=Ht):Ys(C,W,Z)}this.compile=function(C,W,Z=null){Z===null&&(Z=C),m=je.get(Z),m.init(W),b.push(m),Z.traverseVisible(function(X){X.isLight&&X.layers.test(W.layers)&&(m.pushLight(X),X.castShadow&&m.pushShadow(X))}),C!==Z&&C.traverseVisible(function(X){X.isLight&&X.layers.test(W.layers)&&(m.pushLight(X),X.castShadow&&m.pushShadow(X))}),m.setupLights();const J=new Set;return C.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const pe=X.material;if(pe)if(Array.isArray(pe))for(let Me=0;Me<pe.length;Me++){const Ce=pe[Me];rt(Ce,Z,X),J.add(Ce)}else rt(pe,Z,X),J.add(pe)}),m=b.pop(),J},this.compileAsync=function(C,W,Z=null){const J=this.compile(C,W,Z);return new Promise(X=>{function pe(){if(J.forEach(function(Me){Se.get(Me).currentProgram.isReady()&&J.delete(Me)}),J.size===0){X(C);return}setTimeout(pe,10)}fe.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let ai=null;function Si(C){ai&&ai(C)}function vl(){tn.stop()}function yl(){tn.start()}const tn=new lu;tn.setAnimationLoop(Si),typeof self<"u"&&tn.setContext(self),this.setAnimationLoop=function(C){ai=C,Q.setAnimationLoop(C),C===null?tn.stop():tn.start()},Q.addEventListener("sessionstart",vl),Q.addEventListener("sessionend",yl),this.render=function(C,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),Q.enabled===!0&&Q.isPresenting===!0&&(Q.cameraAutoUpdate===!0&&Q.updateCamera(W),W=Q.getCamera()),C.isScene===!0&&C.onBeforeRender(y,C,W,L),m=je.get(C,b.length),m.init(W),b.push(m),be.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),Y.setFromProjectionMatrix(be),he=this.localClippingEnabled,ee=me.init(this.clippingPlanes,he),_=Ae.get(C,M.length),_.init(),M.push(_),Q.enabled===!0&&Q.isPresenting===!0){const pe=y.xr.getDepthSensingMesh();pe!==null&&oa(pe,W,-1/0,y.sortObjects)}oa(C,W,0,y.sortObjects),_.finish(),y.sortObjects===!0&&_.sort(k,j),ae=Q.enabled===!1||Q.isPresenting===!1||Q.hasDepthSensing()===!1,ae&&ke.addToRenderList(_,C),this.info.render.frame++,ee===!0&&me.beginShadows();const Z=m.state.shadowsArray;Re.render(Z,C,W),ee===!0&&me.endShadows(),this.info.autoReset===!0&&this.info.reset();const J=_.opaque,X=_.transmissive;if(m.setupLights(),W.isArrayCamera){const pe=W.cameras;if(X.length>0)for(let Me=0,Ce=pe.length;Me<Ce;Me++){const Le=pe[Me];bl(J,X,C,Le)}ae&&ke.render(C);for(let Me=0,Ce=pe.length;Me<Ce;Me++){const Le=pe[Me];Ml(_,C,Le,Le.viewport)}}else X.length>0&&bl(J,X,C,W),ae&&ke.render(C),Ml(_,C,W);L!==null&&P===0&&(D.updateMultisampleRenderTarget(L),D.updateRenderTargetMipmap(L)),C.isScene===!0&&C.onAfterRender(y,C,W),ct.resetDefaultState(),E=-1,S=null,b.pop(),b.length>0?(m=b[b.length-1],ee===!0&&me.setGlobalState(y.clippingPlanes,m.state.camera)):m=null,M.pop(),M.length>0?_=M[M.length-1]:_=null};function oa(C,W,Z,J){if(C.visible===!1)return;if(C.layers.test(W.layers)){if(C.isGroup)Z=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(W);else if(C.isLight)m.pushLight(C),C.castShadow&&m.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||Y.intersectsSprite(C)){J&&ge.setFromMatrixPosition(C.matrixWorld).applyMatrix4(be);const Me=se.update(C),Ce=C.material;Ce.visible&&_.push(C,Me,Ce,Z,ge.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||Y.intersectsObject(C))){const Me=se.update(C),Ce=C.material;if(J&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),ge.copy(C.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),ge.copy(Me.boundingSphere.center)),ge.applyMatrix4(C.matrixWorld).applyMatrix4(be)),Array.isArray(Ce)){const Le=Me.groups;for(let Ge=0,We=Le.length;Ge<We;Ge++){const Ne=Le[Ge],Qe=Ce[Ne.materialIndex];Qe&&Qe.visible&&_.push(C,Me,Qe,Z,ge.z,Ne)}}else Ce.visible&&_.push(C,Me,Ce,Z,ge.z,null)}}const pe=C.children;for(let Me=0,Ce=pe.length;Me<Ce;Me++)oa(pe[Me],W,Z,J)}function Ml(C,W,Z,J){const X=C.opaque,pe=C.transmissive,Me=C.transparent;m.setupLightsView(Z),ee===!0&&me.setGlobalState(y.clippingPlanes,Z),J&&_e.viewport(R.copy(J)),X.length>0&&qs(X,W,Z),pe.length>0&&qs(pe,W,Z),Me.length>0&&qs(Me,W,Z),_e.buffers.depth.setTest(!0),_e.buffers.depth.setMask(!0),_e.buffers.color.setMask(!0),_e.setPolygonOffset(!1)}function bl(C,W,Z,J){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[J.id]===void 0&&(m.state.transmissionRenderTarget[J.id]=new wn(1,1,{generateMipmaps:!0,type:fe.has("EXT_color_buffer_half_float")||fe.has("EXT_color_buffer_float")?Hs:Ni,minFilter:Di,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:et.workingColorSpace}));const pe=m.state.transmissionRenderTarget[J.id],Me=J.viewport||R;pe.setSize(Me.z*y.transmissionResolutionScale,Me.w*y.transmissionResolutionScale);const Ce=y.getRenderTarget();y.setRenderTarget(pe),y.getClearColor(V),K=y.getClearAlpha(),K<1&&y.setClearColor(16777215,.5),y.clear(),ae&&ke.render(Z);const Le=y.toneMapping;y.toneMapping=ji;const Ge=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),m.setupLightsView(J),ee===!0&&me.setGlobalState(y.clippingPlanes,J),qs(C,Z,J),D.updateMultisampleRenderTarget(pe),D.updateRenderTargetMipmap(pe),fe.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let Ne=0,Qe=W.length;Ne<Qe;Ne++){const it=W[Ne],vt=it.object,pt=it.geometry,tt=it.material,Oe=it.group;if(tt.side===Ht&&vt.layers.test(J.layers)){const Pt=tt.side;tt.side=Gt,tt.needsUpdate=!0,Sl(vt,Z,J,pt,tt,Oe),tt.side=Pt,tt.needsUpdate=!0,We=!0}}We===!0&&(D.updateMultisampleRenderTarget(pe),D.updateRenderTargetMipmap(pe))}y.setRenderTarget(Ce),y.setClearColor(V,K),Ge!==void 0&&(J.viewport=Ge),y.toneMapping=Le}function qs(C,W,Z){const J=W.isScene===!0?W.overrideMaterial:null;for(let X=0,pe=C.length;X<pe;X++){const Me=C[X],Ce=Me.object,Le=Me.geometry,Ge=J===null?Me.material:J,We=Me.group;Ce.layers.test(Z.layers)&&Sl(Ce,W,Z,Le,Ge,We)}}function Sl(C,W,Z,J,X,pe){C.onBeforeRender(y,W,Z,J,X,pe),C.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),X.onBeforeRender(y,W,Z,J,C,pe),X.transparent===!0&&X.side===Ht&&X.forceSinglePass===!1?(X.side=Gt,X.needsUpdate=!0,y.renderBufferDirect(Z,W,J,X,C,pe),X.side=$t,X.needsUpdate=!0,y.renderBufferDirect(Z,W,J,X,C,pe),X.side=Ht):y.renderBufferDirect(Z,W,J,X,C,pe),C.onAfterRender(y,W,Z,J,X,pe)}function Ys(C,W,Z){W.isScene!==!0&&(W=Be);const J=Se.get(C),X=m.state.lights,pe=m.state.shadowsArray,Me=X.state.version,Ce=Fe.getParameters(C,X.state,pe,W,Z),Le=Fe.getProgramCacheKey(Ce);let Ge=J.programs;J.environment=C.isMeshStandardMaterial?W.environment:null,J.fog=W.fog,J.envMap=(C.isMeshStandardMaterial?$:w).get(C.envMap||J.environment),J.envMapRotation=J.environment!==null&&C.envMap===null?W.environmentRotation:C.envMapRotation,Ge===void 0&&(C.addEventListener("dispose",qe),Ge=new Map,J.programs=Ge);let We=Ge.get(Le);if(We!==void 0){if(J.currentProgram===We&&J.lightsStateVersion===Me)return wl(C,Ce),We}else Ce.uniforms=Fe.getUniforms(C),C.onBeforeCompile(Ce,y),We=Fe.acquireProgram(Ce,Le),Ge.set(Le,We),J.uniforms=Ce.uniforms;const Ne=J.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Ne.clippingPlanes=me.uniform),wl(C,Ce),J.needsLights=vu(C),J.lightsStateVersion=Me,J.needsLights&&(Ne.ambientLightColor.value=X.state.ambient,Ne.lightProbe.value=X.state.probe,Ne.directionalLights.value=X.state.directional,Ne.directionalLightShadows.value=X.state.directionalShadow,Ne.spotLights.value=X.state.spot,Ne.spotLightShadows.value=X.state.spotShadow,Ne.rectAreaLights.value=X.state.rectArea,Ne.ltc_1.value=X.state.rectAreaLTC1,Ne.ltc_2.value=X.state.rectAreaLTC2,Ne.pointLights.value=X.state.point,Ne.pointLightShadows.value=X.state.pointShadow,Ne.hemisphereLights.value=X.state.hemi,Ne.directionalShadowMap.value=X.state.directionalShadowMap,Ne.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Ne.spotShadowMap.value=X.state.spotShadowMap,Ne.spotLightMatrix.value=X.state.spotLightMatrix,Ne.spotLightMap.value=X.state.spotLightMap,Ne.pointShadowMap.value=X.state.pointShadowMap,Ne.pointShadowMatrix.value=X.state.pointShadowMatrix),J.currentProgram=We,J.uniformsList=null,We}function El(C){if(C.uniformsList===null){const W=C.currentProgram.getUniforms();C.uniformsList=Hr.seqWithValue(W.seq,C.uniforms)}return C.uniformsList}function wl(C,W){const Z=Se.get(C);Z.outputColorSpace=W.outputColorSpace,Z.batching=W.batching,Z.batchingColor=W.batchingColor,Z.instancing=W.instancing,Z.instancingColor=W.instancingColor,Z.instancingMorph=W.instancingMorph,Z.skinning=W.skinning,Z.morphTargets=W.morphTargets,Z.morphNormals=W.morphNormals,Z.morphColors=W.morphColors,Z.morphTargetsCount=W.morphTargetsCount,Z.numClippingPlanes=W.numClippingPlanes,Z.numIntersection=W.numClipIntersection,Z.vertexAlphas=W.vertexAlphas,Z.vertexTangents=W.vertexTangents,Z.toneMapping=W.toneMapping}function _u(C,W,Z,J,X){W.isScene!==!0&&(W=Be),D.resetTextureUnits();const pe=W.fog,Me=J.isMeshStandardMaterial?W.environment:null,Ce=L===null?y.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:ds,Le=(J.isMeshStandardMaterial?$:w).get(J.envMap||Me),Ge=J.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,We=!!Z.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Ne=!!Z.morphAttributes.position,Qe=!!Z.morphAttributes.normal,it=!!Z.morphAttributes.color;let vt=ji;J.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(vt=y.toneMapping);const pt=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,tt=pt!==void 0?pt.length:0,Oe=Se.get(J),Pt=m.state.lights;if(ee===!0&&(he===!0||C!==S)){const Ft=C===S&&J.id===E;me.setState(J,C,Ft)}let nt=!1;J.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==Pt.state.version||Oe.outputColorSpace!==Ce||X.isBatchedMesh&&Oe.batching===!1||!X.isBatchedMesh&&Oe.batching===!0||X.isBatchedMesh&&Oe.batchingColor===!0&&X.colorTexture===null||X.isBatchedMesh&&Oe.batchingColor===!1&&X.colorTexture!==null||X.isInstancedMesh&&Oe.instancing===!1||!X.isInstancedMesh&&Oe.instancing===!0||X.isSkinnedMesh&&Oe.skinning===!1||!X.isSkinnedMesh&&Oe.skinning===!0||X.isInstancedMesh&&Oe.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Oe.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Oe.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Oe.instancingMorph===!1&&X.morphTexture!==null||Oe.envMap!==Le||J.fog===!0&&Oe.fog!==pe||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==me.numPlanes||Oe.numIntersection!==me.numIntersection)||Oe.vertexAlphas!==Ge||Oe.vertexTangents!==We||Oe.morphTargets!==Ne||Oe.morphNormals!==Qe||Oe.morphColors!==it||Oe.toneMapping!==vt||Oe.morphTargetsCount!==tt)&&(nt=!0):(nt=!0,Oe.__version=J.version);let oi=Oe.currentProgram;nt===!0&&(oi=Ys(J,W,X));let Rn=!1,Wt=!1,gs=!1;const ut=oi.getUniforms(),Jt=Oe.uniforms;if(_e.useProgram(oi.program)&&(Rn=!0,Wt=!0,gs=!0),J.id!==E&&(E=J.id,Wt=!0),Rn||S!==C){_e.buffers.depth.getReversed()?(re.copy(C.projectionMatrix),Dd(re),Ud(re),ut.setValue(U,"projectionMatrix",re)):ut.setValue(U,"projectionMatrix",C.projectionMatrix),ut.setValue(U,"viewMatrix",C.matrixWorldInverse);const Vt=ut.map.cameraPosition;Vt!==void 0&&Vt.setValue(U,De.setFromMatrixPosition(C.matrixWorld)),Pe.logarithmicDepthBuffer&&ut.setValue(U,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&ut.setValue(U,"isOrthographic",C.isOrthographicCamera===!0),S!==C&&(S=C,Wt=!0,gs=!0)}if(X.isSkinnedMesh){ut.setOptional(U,X,"bindMatrix"),ut.setOptional(U,X,"bindMatrixInverse");const Ft=X.skeleton;Ft&&(Ft.boneTexture===null&&Ft.computeBoneTexture(),ut.setValue(U,"boneTexture",Ft.boneTexture,D))}X.isBatchedMesh&&(ut.setOptional(U,X,"batchingTexture"),ut.setValue(U,"batchingTexture",X._matricesTexture,D),ut.setOptional(U,X,"batchingIdTexture"),ut.setValue(U,"batchingIdTexture",X._indirectTexture,D),ut.setOptional(U,X,"batchingColorTexture"),X._colorsTexture!==null&&ut.setValue(U,"batchingColorTexture",X._colorsTexture,D));const Qt=Z.morphAttributes;if((Qt.position!==void 0||Qt.normal!==void 0||Qt.color!==void 0)&&He.update(X,Z,oi),(Wt||Oe.receiveShadow!==X.receiveShadow)&&(Oe.receiveShadow=X.receiveShadow,ut.setValue(U,"receiveShadow",X.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&(Jt.envMap.value=Le,Jt.flipEnvMap.value=Le.isCubeTexture&&Le.isRenderTargetTexture===!1?-1:1),J.isMeshStandardMaterial&&J.envMap===null&&W.environment!==null&&(Jt.envMapIntensity.value=W.environmentIntensity),Wt&&(ut.setValue(U,"toneMappingExposure",y.toneMappingExposure),Oe.needsLights&&xu(Jt,gs),pe&&J.fog===!0&&ve.refreshFogUniforms(Jt,pe),ve.refreshMaterialUniforms(Jt,J,N,q,m.state.transmissionRenderTarget[C.id]),Hr.upload(U,El(Oe),Jt,D)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(Hr.upload(U,El(Oe),Jt,D),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&ut.setValue(U,"center",X.center),ut.setValue(U,"modelViewMatrix",X.modelViewMatrix),ut.setValue(U,"normalMatrix",X.normalMatrix),ut.setValue(U,"modelMatrix",X.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){const Ft=J.uniformsGroups;for(let Vt=0,la=Ft.length;Vt<la;Vt++){const nn=Ft[Vt];G.update(nn,oi),G.bind(nn,oi)}}return oi}function xu(C,W){C.ambientLightColor.needsUpdate=W,C.lightProbe.needsUpdate=W,C.directionalLights.needsUpdate=W,C.directionalLightShadows.needsUpdate=W,C.pointLights.needsUpdate=W,C.pointLightShadows.needsUpdate=W,C.spotLights.needsUpdate=W,C.spotLightShadows.needsUpdate=W,C.rectAreaLights.needsUpdate=W,C.hemisphereLights.needsUpdate=W}function vu(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(C,W,Z){Se.get(C.texture).__webglTexture=W,Se.get(C.depthTexture).__webglTexture=Z;const J=Se.get(C);J.__hasExternalTextures=!0,J.__autoAllocateDepthBuffer=Z===void 0,J.__autoAllocateDepthBuffer||fe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),J.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,W){const Z=Se.get(C);Z.__webglFramebuffer=W,Z.__useDefaultFramebuffer=W===void 0};const yu=U.createFramebuffer();this.setRenderTarget=function(C,W=0,Z=0){L=C,A=W,P=Z;let J=!0,X=null,pe=!1,Me=!1;if(C){const Le=Se.get(C);if(Le.__useDefaultFramebuffer!==void 0)_e.bindFramebuffer(U.FRAMEBUFFER,null),J=!1;else if(Le.__webglFramebuffer===void 0)D.setupRenderTarget(C);else if(Le.__hasExternalTextures)D.rebindTextures(C,Se.get(C.texture).__webglTexture,Se.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const Ne=C.depthTexture;if(Le.__boundDepthTexture!==Ne){if(Ne!==null&&Se.has(Ne)&&(C.width!==Ne.image.width||C.height!==Ne.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");D.setupDepthRenderbuffer(C)}}const Ge=C.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(Me=!0);const We=Se.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(We[W])?X=We[W][Z]:X=We[W],pe=!0):C.samples>0&&D.useMultisampledRTT(C)===!1?X=Se.get(C).__webglMultisampledFramebuffer:Array.isArray(We)?X=We[Z]:X=We,R.copy(C.viewport),F.copy(C.scissor),O=C.scissorTest}else R.copy(ie).multiplyScalar(N).floor(),F.copy(de).multiplyScalar(N).floor(),O=we;if(Z!==0&&(X=yu),_e.bindFramebuffer(U.FRAMEBUFFER,X)&&J&&_e.drawBuffers(C,X),_e.viewport(R),_e.scissor(F),_e.setScissorTest(O),pe){const Le=Se.get(C.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+W,Le.__webglTexture,Z)}else if(Me){const Le=Se.get(C.texture),Ge=W;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Le.__webglTexture,Z,Ge)}else if(C!==null&&Z!==0){const Le=Se.get(C.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Le.__webglTexture,Z)}E=-1},this.readRenderTargetPixels=function(C,W,Z,J,X,pe,Me){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=Se.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Me!==void 0&&(Ce=Ce[Me]),Ce){_e.bindFramebuffer(U.FRAMEBUFFER,Ce);try{const Le=C.texture,Ge=Le.format,We=Le.type;if(!Pe.textureFormatReadable(Ge)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Pe.textureTypeReadable(We)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=C.width-J&&Z>=0&&Z<=C.height-X&&U.readPixels(W,Z,J,X,$e.convert(Ge),$e.convert(We),pe)}finally{const Le=L!==null?Se.get(L).__webglFramebuffer:null;_e.bindFramebuffer(U.FRAMEBUFFER,Le)}}},this.readRenderTargetPixelsAsync=async function(C,W,Z,J,X,pe,Me){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=Se.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Me!==void 0&&(Ce=Ce[Me]),Ce){const Le=C.texture,Ge=Le.format,We=Le.type;if(!Pe.textureFormatReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Pe.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(W>=0&&W<=C.width-J&&Z>=0&&Z<=C.height-X){_e.bindFramebuffer(U.FRAMEBUFFER,Ce);const Ne=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Ne),U.bufferData(U.PIXEL_PACK_BUFFER,pe.byteLength,U.STREAM_READ),U.readPixels(W,Z,J,X,$e.convert(Ge),$e.convert(We),0);const Qe=L!==null?Se.get(L).__webglFramebuffer:null;_e.bindFramebuffer(U.FRAMEBUFFER,Qe);const it=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Ld(U,it,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Ne),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,pe),U.deleteBuffer(Ne),U.deleteSync(it),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,W=null,Z=0){C.isTexture!==!0&&(mn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),W=arguments[0]||null,C=arguments[1]);const J=Math.pow(2,-Z),X=Math.floor(C.image.width*J),pe=Math.floor(C.image.height*J),Me=W!==null?W.x:0,Ce=W!==null?W.y:0;D.setTexture2D(C,0),U.copyTexSubImage2D(U.TEXTURE_2D,Z,0,0,Me,Ce,X,pe),_e.unbindTexture()};const Mu=U.createFramebuffer(),bu=U.createFramebuffer();this.copyTextureToTexture=function(C,W,Z=null,J=null,X=0,pe=null){C.isTexture!==!0&&(mn("WebGLRenderer: copyTextureToTexture function signature has changed."),J=arguments[0]||null,C=arguments[1],W=arguments[2],pe=arguments[3]||0,Z=null),pe===null&&(X!==0?(mn("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),pe=X,X=0):pe=0);let Me,Ce,Le,Ge,We,Ne,Qe,it,vt;const pt=C.isCompressedTexture?C.mipmaps[pe]:C.image;if(Z!==null)Me=Z.max.x-Z.min.x,Ce=Z.max.y-Z.min.y,Le=Z.isBox3?Z.max.z-Z.min.z:1,Ge=Z.min.x,We=Z.min.y,Ne=Z.isBox3?Z.min.z:0;else{const Qt=Math.pow(2,-X);Me=Math.floor(pt.width*Qt),Ce=Math.floor(pt.height*Qt),C.isDataArrayTexture?Le=pt.depth:C.isData3DTexture?Le=Math.floor(pt.depth*Qt):Le=1,Ge=0,We=0,Ne=0}J!==null?(Qe=J.x,it=J.y,vt=J.z):(Qe=0,it=0,vt=0);const tt=$e.convert(W.format),Oe=$e.convert(W.type);let Pt;W.isData3DTexture?(D.setTexture3D(W,0),Pt=U.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(D.setTexture2DArray(W,0),Pt=U.TEXTURE_2D_ARRAY):(D.setTexture2D(W,0),Pt=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,W.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,W.unpackAlignment);const nt=U.getParameter(U.UNPACK_ROW_LENGTH),oi=U.getParameter(U.UNPACK_IMAGE_HEIGHT),Rn=U.getParameter(U.UNPACK_SKIP_PIXELS),Wt=U.getParameter(U.UNPACK_SKIP_ROWS),gs=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,pt.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,pt.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Ge),U.pixelStorei(U.UNPACK_SKIP_ROWS,We),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ne);const ut=C.isDataArrayTexture||C.isData3DTexture,Jt=W.isDataArrayTexture||W.isData3DTexture;if(C.isDepthTexture){const Qt=Se.get(C),Ft=Se.get(W),Vt=Se.get(Qt.__renderTarget),la=Se.get(Ft.__renderTarget);_e.bindFramebuffer(U.READ_FRAMEBUFFER,Vt.__webglFramebuffer),_e.bindFramebuffer(U.DRAW_FRAMEBUFFER,la.__webglFramebuffer);for(let nn=0;nn<Le;nn++)ut&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Se.get(C).__webglTexture,X,Ne+nn),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Se.get(W).__webglTexture,pe,vt+nn)),U.blitFramebuffer(Ge,We,Me,Ce,Qe,it,Me,Ce,U.DEPTH_BUFFER_BIT,U.NEAREST);_e.bindFramebuffer(U.READ_FRAMEBUFFER,null),_e.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(X!==0||C.isRenderTargetTexture||Se.has(C)){const Qt=Se.get(C),Ft=Se.get(W);_e.bindFramebuffer(U.READ_FRAMEBUFFER,Mu),_e.bindFramebuffer(U.DRAW_FRAMEBUFFER,bu);for(let Vt=0;Vt<Le;Vt++)ut?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Qt.__webglTexture,X,Ne+Vt):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Qt.__webglTexture,X),Jt?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ft.__webglTexture,pe,vt+Vt):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Ft.__webglTexture,pe),X!==0?U.blitFramebuffer(Ge,We,Me,Ce,Qe,it,Me,Ce,U.COLOR_BUFFER_BIT,U.NEAREST):Jt?U.copyTexSubImage3D(Pt,pe,Qe,it,vt+Vt,Ge,We,Me,Ce):U.copyTexSubImage2D(Pt,pe,Qe,it,Ge,We,Me,Ce);_e.bindFramebuffer(U.READ_FRAMEBUFFER,null),_e.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else Jt?C.isDataTexture||C.isData3DTexture?U.texSubImage3D(Pt,pe,Qe,it,vt,Me,Ce,Le,tt,Oe,pt.data):W.isCompressedArrayTexture?U.compressedTexSubImage3D(Pt,pe,Qe,it,vt,Me,Ce,Le,tt,pt.data):U.texSubImage3D(Pt,pe,Qe,it,vt,Me,Ce,Le,tt,Oe,pt):C.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,pe,Qe,it,Me,Ce,tt,Oe,pt.data):C.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,pe,Qe,it,pt.width,pt.height,tt,pt.data):U.texSubImage2D(U.TEXTURE_2D,pe,Qe,it,Me,Ce,tt,Oe,pt);U.pixelStorei(U.UNPACK_ROW_LENGTH,nt),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,oi),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Rn),U.pixelStorei(U.UNPACK_SKIP_ROWS,Wt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,gs),pe===0&&W.generateMipmaps&&U.generateMipmap(Pt),_e.unbindTexture()},this.copyTextureToTexture3D=function(C,W,Z=null,J=null,X=0){return C.isTexture!==!0&&(mn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Z=arguments[0]||null,J=arguments[1]||null,C=arguments[2],W=arguments[3],X=arguments[4]||0),mn('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(C,W,Z,J,X)},this.initRenderTarget=function(C){Se.get(C).__webglFramebuffer===void 0&&D.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?D.setTextureCube(C,0):C.isData3DTexture?D.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?D.setTexture2DArray(C,0):D.setTexture2D(C,0),_e.unbindTexture()},this.resetState=function(){A=0,P=0,L=null,_e.reset(),ct.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ui}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=et._getDrawingBufferColorSpace(e),t.unpackColorSpace=et._getUnpackColorSpace()}}const Kc={type:"change"},pl={type:"start"},fu={type:"end"},Pr=new ea,Zc=new Li,W0=Math.cos(70*As.DEG2RAD),St=new T,kt=2*Math.PI,ot={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ja=1e-6;class X0 extends ap{constructor(e,t=null){super(e,t),this.state=ot.NONE,this.enabled=!0,this.target=new T,this.cursor=new T,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:es.ROTATE,MIDDLE:es.DOLLY,RIGHT:es.PAN},this.touches={ONE:jn.ROTATE,TWO:jn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new T,this._lastQuaternion=new Qi,this._lastTargetPosition=new T,this._quat=new Qi().setFromUnitVectors(e.up,new T(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Sc,this._sphericalDelta=new Sc,this._scale=1,this._panOffset=new T,this._rotateStart=new ue,this._rotateEnd=new ue,this._rotateDelta=new ue,this._panStart=new ue,this._panEnd=new ue,this._panDelta=new ue,this._dollyStart=new ue,this._dollyEnd=new ue,this._dollyDelta=new ue,this._dollyDirection=new T,this._mouse=new ue,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Y0.bind(this),this._onPointerDown=q0.bind(this),this._onPointerUp=$0.bind(this),this._onContextMenu=tx.bind(this),this._onMouseWheel=j0.bind(this),this._onKeyDown=J0.bind(this),this._onTouchStart=Q0.bind(this),this._onTouchMove=ex.bind(this),this._onMouseDown=K0.bind(this),this._onMouseMove=Z0.bind(this),this._interceptControlDown=ix.bind(this),this._interceptControlUp=nx.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Kc),this.update(),this.state=ot.NONE}update(e=null){const t=this.object.position;St.copy(t).sub(this.target),St.applyQuaternion(this._quat),this._spherical.setFromVector3(St),this.autoRotate&&this.state===ot.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=kt:i>Math.PI&&(i-=kt),s<-Math.PI?s+=kt:s>Math.PI&&(s-=kt),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(St.setFromSpherical(this._spherical),St.applyQuaternion(this._quatInverse),t.copy(this.target).add(St),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=St.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new T(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const h=new T(this._mouse.x,this._mouse.y,0);h.unproject(this.object),this.object.position.sub(h).add(o),this.object.updateMatrixWorld(),a=St.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Pr.origin.copy(this.object.position),Pr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Pr.direction))<W0?this.object.lookAt(this.target):(Zc.setFromNormalAndCoplanarPoint(this.object.up,this.target),Pr.intersectPlane(Zc,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>ja||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ja||this._lastTargetPosition.distanceToSquared(this.target)>ja?(this.dispatchEvent(Kc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?kt/60*this.autoRotateSpeed*e:kt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){St.setFromMatrixColumn(t,0),St.multiplyScalar(-e),this._panOffset.add(St)}_panUp(e,t){this.screenSpacePanning===!0?St.setFromMatrixColumn(t,1):(St.setFromMatrixColumn(t,0),St.crossVectors(this.object.up,St)),St.multiplyScalar(e),this._panOffset.add(St)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;St.copy(s).sub(this.target);let r=St.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(kt*this._rotateDelta.x/t.clientHeight),this._rotateUp(kt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(kt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-kt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(kt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-kt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(kt*this._rotateDelta.x/t.clientHeight),this._rotateUp(kt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new ue,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function q0(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function Y0(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function $0(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(fu),this.state=ot.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function K0(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case es.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=ot.DOLLY;break;case es.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ot.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ot.ROTATE}break;case es.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ot.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ot.PAN}break;default:this.state=ot.NONE}this.state!==ot.NONE&&this.dispatchEvent(pl)}function Z0(n){switch(this.state){case ot.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case ot.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case ot.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function j0(n){this.enabled===!1||this.enableZoom===!1||this.state!==ot.NONE||(n.preventDefault(),this.dispatchEvent(pl),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(fu))}function J0(n){this.enabled!==!1&&this._handleKeyDown(n)}function Q0(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case jn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=ot.TOUCH_ROTATE;break;case jn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=ot.TOUCH_PAN;break;default:this.state=ot.NONE}break;case 2:switch(this.touches.TWO){case jn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=ot.TOUCH_DOLLY_PAN;break;case jn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=ot.TOUCH_DOLLY_ROTATE;break;default:this.state=ot.NONE}break;default:this.state=ot.NONE}this.state!==ot.NONE&&this.dispatchEvent(pl)}function ex(n){switch(this._trackPointer(n),this.state){case ot.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case ot.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case ot.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case ot.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=ot.NONE}}function tx(n){this.enabled!==!1&&n.preventDefault()}function ix(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function nx(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function sx(){if(typeof window>"u"||typeof navigator>"u")return{isMobile:!1,maxPixelRatio:2,antialias:!0,textureScale:1,maxAnisotropy:4,curveScale:1,edgeThresholdBoost:0,simplifyPhysicalShaders:!1,lightRigMode:"full"};const e=new URLSearchParams(window.location.search).get("gpu"),t=navigator.userAgent||"",i=!!window.Capacitor,s=/Android|iPhone|iPad|iPod|Mobile|wv\)|POCO|Xiaomi|MIUI|HyperOS/i.test(t),r=(navigator.maxTouchPoints??0)>0&&Math.min(window.screen.width,window.screen.height)<=1024;return(e==="mobile"?!0:e==="desktop"?!1:i||s||r)?{isMobile:!0,maxPixelRatio:1.5,antialias:!1,textureScale:.55,maxAnisotropy:2,curveScale:.62,edgeThresholdBoost:6,simplifyPhysicalShaders:!0,lightRigMode:"mobile"}:{isMobile:!1,maxPixelRatio:2,antialias:!0,textureScale:1,maxAnisotropy:4,curveScale:1,edgeThresholdBoost:0,simplifyPhysicalShaders:!1,lightRigMode:"full"}}const rs=sx();rs.isMobile;function zx(n,e=6){return rs.curveScale>=.999?n:Math.max(e,Math.round(n*rs.curveScale))}const jc=new Map;function mt(n,e){return async()=>{const t=jc.get(n);if(t)return t;const s=(await e()).default,r={unitId:s.unitId,version:s.version,nameJa:s.nameJa,nameEn:s.nameEn,declaredPartCount:s.declaredPartCount,maxDrawCallsBudget:s.maxDrawCallsBudget,budgetRationale:s.budgetRationale,parts:s.parts};return jc.set(n,r),r}}const ml=Object.freeze({welcome:{unitId:"welcome",declaredPartCount:220,loadMeta:mt("welcome",()=>le(()=>import("./welcome-Ce7Ng2Al.js"),[],import.meta.url)),load:async()=>(await le(async()=>{const{createWelcomeUnit:n}=await import("./welcome-C9px3JKW.js");return{createWelcomeUnit:n}},__vite__mapDeps([0,1,2,3]),import.meta.url)).createWelcomeUnit()},mishoe:{unitId:"mishoe",declaredPartCount:99,loadMeta:mt("mishoe",()=>le(()=>import("./mi_shoe-bMm9XjJ3.js"),[],import.meta.url)),load:async()=>(await le(async()=>{const{createMiShoeUnit:n}=await import("./mi_shoe-CoOm-hOT.js");return{createMiShoeUnit:n}},__vite__mapDeps([4,3,5,2]),import.meta.url)).createMiShoeUnit()},battery:{unitId:"battery",declaredPartCount:130,loadMeta:mt("battery",()=>le(()=>import("./battery-Cw3gePVg.js"),[],import.meta.url)),load:async()=>(await le(async()=>{const{createBatteryUnit:n}=await import("./battery-BAofaaN7.js");return{createBatteryUnit:n}},__vite__mapDeps([6,7,2,3,8]),import.meta.url)).createBatteryUnit()},cfexpress:{unitId:"cfexpress",declaredPartCount:170,loadMeta:mt("cfexpress",()=>le(()=>import("./cfexpress-DY8cI-Wc.js"),[],import.meta.url)),load:async()=>(await le(async()=>{const{createCfexpressUnit:n}=await import("./cfexpress-CG_-pnZM.js");return{createCfexpressUnit:n}},__vite__mapDeps([9,10,2,3,8]),import.meta.url)).createCfexpressUnit()},mic:{unitId:"mic",declaredPartCount:150,loadMeta:mt("mic",()=>le(()=>import("./mic-CwD_McdS.js"),[],import.meta.url)),load:async()=>(await le(async()=>{const{createMicUnit:n}=await import("./mic-BvY-FsFm.js");return{createMicUnit:n}},__vite__mapDeps([11,12,2,3,8]),import.meta.url)).createMicUnit()},drybox:{unitId:"drybox",declaredPartCount:186,loadMeta:mt("drybox",()=>le(()=>import("./drybox-D1IN4adj.js"),[],import.meta.url)),load:async()=>(await le(async()=>{const{createDryboxUnit:n}=await import("./drybox-DvsXFKD8.js");return{createDryboxUnit:n}},__vite__mapDeps([13,14,2,3]),import.meta.url)).createDryboxUnit()},mount:{unitId:"mount",declaredPartCount:100,loadMeta:mt("mount",()=>le(()=>import("./mount-D5exe6iE.js"),[],import.meta.url)),load:async()=>(await le(async()=>{const{createMountUnit:n}=await import("./mount-Dj-c_mWf.js");return{createMountUnit:n}},__vite__mapDeps([15,16,17,2,3]),import.meta.url)).createMountUnit()},shutter:{unitId:"shutter",declaredPartCount:180,loadMeta:mt("shutter",()=>le(()=>import("./shutter-DRF49fuH.js"),[],import.meta.url)),load:async()=>(await le(async()=>{const{createShutterUnit:n}=await import("./shutter-DukaTIU8.js");return{createShutterUnit:n}},__vite__mapDeps([18,19,20,2,3]),import.meta.url)).createShutterUnit()},body:{unitId:"body",declaredPartCount:116,loadMeta:mt("body",()=>le(()=>import("./body-DYuOmmPC.js"),[],import.meta.url)),load:async()=>(await le(async()=>{const{createBodyUnit:n}=await import("./body-L7KOBOnE.js");return{createBodyUnit:n}},__vite__mapDeps([21,22,23,2,3,24,8,25]),import.meta.url)).createBodyUnit()},evf:{unitId:"evf",declaredPartCount:105,loadMeta:mt("evf",()=>le(()=>import("./evf-BETQwoTg.js"),[],import.meta.url)),load:async()=>(await le(async()=>{const{createEvfUnit:n}=await import("./evf-BZHf1SCp.js");return{createEvfUnit:n}},__vite__mapDeps([26,27,25,2,3,8,28]),import.meta.url)).createEvfUnit()},lcd:{unitId:"lcd",declaredPartCount:150,loadMeta:mt("lcd",()=>le(()=>import("./lcd-C5DFy3jF.js"),[],import.meta.url)),load:async()=>(await le(async()=>{const{createLcdUnit:n}=await import("./lcd-DNPEkZlp.js");return{createLcdUnit:n}},__vite__mapDeps([29,30,24,2,3,8,31]),import.meta.url)).createLcdUnit()},lens:{unitId:"lens",declaredPartCount:128,loadMeta:mt("lens",()=>le(()=>import("./lens-DbGM9PCN.js"),[],import.meta.url)),load:async()=>(await le(async()=>{const{createLensUnit:n}=await import("./lens-BMtso4WO.js");return{createLensUnit:n}},__vite__mapDeps([32,33,34,2,3]),import.meta.url)).createLensUnit()},mainboard:{unitId:"mainboard",declaredPartCount:60,loadMeta:mt("mainboard",()=>le(()=>import("./mainboard-kTn1WrHF.js"),[],import.meta.url)),load:async()=>(await le(async()=>{const{createMainboardUnit:n}=await import("./mainboard-rBhssl0l.js");return{createMainboardUnit:n}},__vite__mapDeps([35,36,37,2,3]),import.meta.url)).createMainboardUnit()},bionz:{unitId:"bionz",declaredPartCount:70,loadMeta:mt("bionz",()=>le(()=>import("./bionz-B1F8ABtJ.js"),[],import.meta.url)),load:async()=>(await le(async()=>{const{createBionzUnit:n}=await import("./bionz-DTVuLTBu.js");return{createBionzUnit:n}},__vite__mapDeps([38,39,2,3,8]),import.meta.url)).createBionzUnit()},bionz_v2:{unitId:"bionz_v2",declaredPartCount:105,loadMeta:mt("bionz_v2",()=>le(()=>import("./bionz_v2-Mx5-M7Q3.js"),[],import.meta.url)),load:async()=>(await le(async()=>{const{createBionzV2Unit:n}=await import("./bionz_v2-DsGzSEDr.js");return{createBionzV2Unit:n}},__vite__mapDeps([40,41,2,3,8]),import.meta.url)).createBionzV2Unit()},sensor:{unitId:"sensor",declaredPartCount:120,loadMeta:mt("sensor",()=>le(()=>import("./sensor-CzpKrVee.js"),[],import.meta.url)),load:async()=>(await le(async()=>{const{createSensorUnit:n}=await import("./sensor-B25HZGxb.js");return{createSensorUnit:n}},__vite__mapDeps([42,43,44,2,3,8,45]),import.meta.url)).createSensorUnit()},micro:{unitId:"micro",declaredPartCount:75,loadMeta:mt("micro",()=>le(()=>import("./micro-cCBBsnJi.js"),[],import.meta.url)),load:async()=>(await le(async()=>{const{createMicroUnit:n}=await import("./micro-Nw5WURVu.js");return{createMicroUnit:n}},__vite__mapDeps([46,47,2,3,48,8,45]),import.meta.url)).createMicroUnit()},micro_v2:{unitId:"micro_v2",declaredPartCount:55,loadMeta:mt("micro_v2",()=>le(()=>import("./micro_v2-Be62c30w.js"),[],import.meta.url)),load:async()=>(await le(async()=>{const{createMicroV2Unit:n}=await import("./micro_v2-BPW7RXvR.js");return{createMicroV2Unit:n}},__vite__mapDeps([49,50,2,3,8]),import.meta.url)).createMicroV2Unit()},sensor_fab:{unitId:"sensor_fab",declaredPartCount:235,loadMeta:mt("sensor_fab",()=>le(()=>import("./sensor_fab-Cu3xZEwo.js"),[],import.meta.url)),load:async()=>(await le(async()=>{const{createSensorFabUnit:n}=await import("./sensor_fab-cu2LyE5V.js");return{createSensorFabUnit:n}},__vite__mapDeps([51,52,2,3,8]),import.meta.url)).createSensorFabUnit()},mirai_2028:{unitId:"mirai_2028",declaredPartCount:86,loadMeta:mt("mirai_2028",()=>le(()=>import("./mirai_2028-DKdxs6cl.js"),[],import.meta.url)),load:async()=>(await le(async()=>{const{createMirai2028Unit:n}=await import("./mirai_2028-DsvDMaac.js");return{createMirai2028Unit:n}},__vite__mapDeps([53,54,2,3,8]),import.meta.url)).createMirai2028Unit()},integrated:{unitId:"integrated",declaredPartCount:305,loadMeta:mt("integrated",()=>le(()=>import("./integrated-CH7qEuhX.js"),[],import.meta.url)),load:async()=>(await le(async()=>{const{createIntegratedUnit:n}=await import("./integrated-TYzHqGMC.js");return{createIntegratedUnit:n}},__vite__mapDeps([55,56,3,57,34,2,17,23,24,8,25,28,20,44,45,37,31]),import.meta.url)).createIntegratedUnit()},camera_body:{unitId:"camera_body",declaredPartCount:231,loadMeta:mt("camera_body",()=>le(()=>import("./camera_body-BsMvso_j.js"),[],import.meta.url)),load:async()=>(await le(async()=>{const{createCameraBodyUnit:n}=await import("./camera_body-jv8lBNvf.js");return{createCameraBodyUnit:n}},__vite__mapDeps([58,59,3,57,34,2,17,23,24,8,25,28,20,44,45,37,31]),import.meta.url)).createCameraBodyUnit()}});function rx(n){return Object.prototype.hasOwnProperty.call(ml,n)}function ax(){return Object.values(ml)}async function Jc(n){const e=ml[n];if(!e)throw new Error(`Unit '${n}' is not registered in V2 registry.`);return e.load()}const Qc=["map","bumpMap","normalMap","roughnessMap","metalnessMap","emissiveMap","alphaMap","aoMap","envMap","clearcoatMap","clearcoatRoughnessMap","clearcoatNormalMap","iridescenceMap"];function qn(n,e,t,i,s){const r=n.userData?.__cacheKey;if(e&&r&&e.hasMaterial(r)){e.releaseMaterial(r),t.releasedCachedMaterials++;return}if(i.has(n))return;i.add(n);const a=n;for(let o=0;o<Qc.length;o++){const l=a[Qc[o]];if(l instanceof Rt&&!s.has(l)){const h=l.userData?.__cacheKey;e&&h?e.releaseTexture(h):(l.dispose(),t.disposedUniqueTextures++),s.add(l)}}n.dispose(),t.disposedUniqueMaterials++}function eh(n,e,t,i){const s=n.userData?.__cacheKey;if(e&&s&&e.hasGeometry(s)){e.releaseGeometry(s),t.releasedCachedGeometries++;return}i.has(n)||(i.add(n),n.dispose(),t.disposedUniqueGeometries++)}function ox(n,e=null,t=!0){const i={disposedObjects:0,releasedCachedGeometries:0,disposedUniqueGeometries:0,releasedCachedMaterials:0,disposedUniqueMaterials:0,disposedUniqueTextures:0,disposedInstancedMeshes:0,disposedBatchedMeshes:0},s=new Set,r=new Set,a=new Set,o=l=>{const h=l.children.slice();for(let u=0;u<h.length;u++)o(h[u]);if(i.disposedObjects++,l.isBatchedMesh){const u=l;if(Array.isArray(u.material))for(let d=0;d<u.material.length;d++)qn(u.material[d],e,i,r,a);else u.material&&qn(u.material,e,i,r,a);u.dispose(),i.disposedBatchedMeshes++}else if(l.isInstancedMesh){const u=l;if(u.geometry&&eh(u.geometry,e,i,s),Array.isArray(u.material))for(let d=0;d<u.material.length;d++)qn(u.material[d],e,i,r,a);else u.material&&qn(u.material,e,i,r,a);u.dispose(),i.disposedInstancedMeshes++}else if(l.isMesh||l.isLine||l.isPoints){const u=l;if(u.geometry&&eh(u.geometry,e,i,s),Array.isArray(u.material))for(let d=0;d<u.material.length;d++)qn(u.material[d],e,i,r,a);else u.material&&qn(u.material,e,i,r,a)}else if(l.isLight){const u=l;typeof u.dispose=="function"&&u.dispose()}l!==n&&l.parent&&l.parent.remove(l)};return o(n),t&&n.parent&&n.parent.remove(n),i}class lx{baseline=null;peak=null;lastVerification=null;switchCount=0;captureBaseline(e){const t={geometries:e.info.memory.geometries,textures:e.info.memory.textures,timestampMs:typeof performance<"u"?performance.now():Date.now()};return this.baseline=t,this.peak=t,t}recordActivePeak(e){const t={geometries:e.info.memory.geometries,textures:e.info.memory.textures,timestampMs:typeof performance<"u"?performance.now():Date.now()};return(!this.peak||t.geometries>this.peak.geometries||t.textures>this.peak.textures)&&(this.peak=t),t}verifyAfterDispose(e,t){const i=typeof performance<"u"?performance.now():Date.now(),s={geometries:e.info.memory.geometries,textures:e.info.memory.textures,timestampMs:i},r=this.baseline??s,a=this.peak??s,o=t.getStats(),l=s.geometries-r.geometries,h=s.textures-r.textures,u=l<=0&&h<=0&&o.totalRefs===0&&o.geometries===0&&o.materials===0&&o.textures===0;this.switchCount++;const d={baseline:r,peak:a,afterDispose:s,deltaGeometries:l,deltaTextures:h,cacheRemainingRefs:o.totalRefs,passed:u};return this.lastVerification=d,u||console.warn("[MI Shoe V2 VRAM Leak Detector] Residual GPU/cache resources detected!",{...d,cacheStats:o}),d}getLastVerification(){return this.lastVerification}getSwitchCount(){return this.switchCount}}class cx{host;panelEl;fields={};mounted=!1;expanded=!1;lastDomUpdateMs=-1/0;constructor(e,t=!1){this.host=e,this.expanded=t,this.panelEl=document.createElement("div"),this.panelEl.className="unit-v2-perf-panel mishoe-v2-perf-panel is-hidden",this.panelEl.setAttribute("role","status"),this.panelEl.setAttribute("aria-live","off");const i=document.createElement("div");i.className="unit-v2-perf-header",i.innerHTML='<span class="unit-v2-perf-title" data-field="unitTitle">V2 OPT</span><span class="unit-v2-perf-state" data-field="loopState">IDLE 0%</span>',this.panelEl.appendChild(i);const s=[["drawCalls","Draw Calls"],["triangles","Triangles"],["geometries","Geometries"],["textures","Textures"],["frameTime","Frame Time"],["quality","Tier / DPR"],["batches","Batching"],["parts","Parts (JSON=3D)"],["build","Build / Warmup"],["vram","VRAM Leak"]],r=document.createElement("div");r.className="unit-v2-perf-grid";for(let a=0;a<s.length;a++){const[o,l]=s[a],h=document.createElement("div");h.className="unit-v2-perf-row";const u=document.createElement("span");u.className="unit-v2-perf-key",u.textContent=l;const d=document.createElement("span");d.className="unit-v2-perf-val",d.dataset.field=o,d.textContent="-",h.append(u,d),r.appendChild(h),this.fields[o]=d}this.fields.unitTitle=i.querySelector('[data-field="unitTitle"]'),this.fields.loopState=i.querySelector('[data-field="loopState"]'),this.panelEl.appendChild(r),this.host.append(this.panelEl)}setModeVisible(e){this.mounted=e,this.panelEl.classList.toggle("is-hidden",!e||!this.expanded)}toggle(){return this.expanded=!this.expanded,this.panelEl.classList.toggle("is-hidden",!this.mounted||!this.expanded),this.expanded}setExpanded(e){this.expanded=e,this.panelEl.classList.toggle("is-hidden",!this.mounted||!this.expanded)}isExpanded(){return this.expanded}update(e,t=!1){if(!this.mounted||!this.expanded)return;const i=typeof performance<"u"?performance.now():Date.now();if(!t&&i-this.lastDomUpdateMs<90)return;this.lastDomUpdateMs=i,this.fields.unitTitle.textContent=`${e.unitId.toUpperCase()} · V2 OPT`;const s=e.drawCalls,r=e.maxDrawCallsBudget??100;if(this.fields.drawCalls.textContent=`${s} / ${r}`,this.fields.drawCalls.className=s<=r?"unit-v2-perf-val is-ok":"unit-v2-perf-val is-warn",this.fields.triangles.textContent=e.triangles.toLocaleString("en-US"),this.fields.geometries.textContent=String(e.geometries),this.fields.textures.textContent=String(e.textures),this.fields.frameTime.textContent=`${e.frameTimeMs.toFixed(2)} ms (avg ${e.avgFrameTimeMs.toFixed(2)})`,this.fields.quality.textContent=`${e.quality.toUpperCase()} · DPR ${e.pixelRatio.toFixed(2)}`,e.buildStats){const a=e.buildStats;this.fields.batches.textContent=`${a.instancedMeshCount} Inst(${a.totalInstances}) · ${a.batchedMeshCount} Batch(${a.totalBatchedItems})`,this.fields.parts.textContent=`${a.registeredPartCount} / ${a.declaredPartCount}`,this.fields.build.textContent=`${a.buildTimeMs.toFixed(1)}ms (max ${a.maxChunkMs.toFixed(1)}ms) · W ${e.shaderWarmupMs.toFixed(1)}ms`}if(e.vramCheck){const a=e.vramCheck;this.fields.vram.textContent=a.passed?`PASS Δg:${a.deltaGeometries} Δt:${a.deltaTextures} (#${e.vramSwitchCount})`:`LEAK Δg:${a.deltaGeometries} Δt:${a.deltaTextures}`,this.fields.vram.className=a.passed?"unit-v2-perf-val is-ok":"unit-v2-perf-val is-warn"}else this.fields.vram.textContent="BASELINE ARMED",this.fields.vram.className="unit-v2-perf-val";this.fields.loopState.textContent=e.idle?"IDLE 0% GPU":"ACTIVE",this.fields.loopState.className=e.idle?"unit-v2-perf-state is-idle":"unit-v2-perf-state is-active"}dispose(){this.panelEl.remove()}}const Ci=[],Gi=new Int32Array(2048),Wi=new Float64Array(2048),Xi=new Int32Array(128);let ws=new Float32Array(1024),Cr=new Float32Array(1024),Rr=new Float32Array(1024);const Ts=new Int32Array(128),Ir=new Int32Array(128),Lr=new Int32Array(128),Dr=new Uint8Array(128),gl=new ri;gl.side=Ht;const th=new Zt,hx=new di,ti=new xt,Yn=new Ct(ti,gl),fi=new Ct(ti,gl),ih=new st,Zr=new T,nh={vertexStart:0,vertexCount:0,reservedVertexCount:0,indexStart:0,indexCount:0,reservedIndexCount:0,start:0,count:0};function ux(n){const e=n.parts,t=e.length;if(t===0){n.bvhNodeCount=0,n.bvhDirty=!1;return}let i=n.bvhPartOrder;(!i||i.length<t)&&(i=new Int32Array(t),n.bvhPartOrder=i);const s=Math.max(1,t*2);let r=n.bvhNodes;(!r||r.length<s*8)&&(r=new Float32Array(s*8),n.bvhNodes=r),ws.length<t&&(ws=new Float32Array(t*2),Cr=new Float32Array(t*2),Rr=new Float32Array(t*2));let a=0;for(let h=0;h<t;h++){const u=e[h].worldBox;u.isEmpty()||(i[a++]=h,ws[h]=(u.min.x+u.max.x)*.5,Cr[h]=(u.min.y+u.max.y)*.5,Rr[h]=(u.min.z+u.max.z)*.5)}if(a===0){n.bvhNodeCount=0,n.bvhDirty=!1;return}let o=0,l=0;for(Ts[0]=0,Ir[0]=a,Lr[0]=-1,Dr[0]=0,l=1;l>0;){l--;const h=Ts[l],u=Ir[l],d=Lr[l],p=Dr[l],f=o++,x=f*8;d>=0&&(p?r[d*8+7]=-f:r[d*8+6]=f);let v=1/0,_=1/0,m=1/0,M=-1/0,b=-1/0,y=-1/0,I=1/0,A=1/0,P=1/0,L=-1/0,E=-1/0,S=-1/0;for(let j=h;j<h+u;j++){const ie=i[j],de=e[ie].worldBox;de.min.x<v&&(v=de.min.x),de.min.y<_&&(_=de.min.y),de.min.z<m&&(m=de.min.z),de.max.x>M&&(M=de.max.x),de.max.y>b&&(b=de.max.y),de.max.z>y&&(y=de.max.z);const we=ws[ie],Y=Cr[ie],ee=Rr[ie];we<I&&(I=we),Y<A&&(A=Y),ee<P&&(P=ee),we>L&&(L=we),Y>E&&(E=Y),ee>S&&(S=ee)}if(r[x]=v,r[x+1]=_,r[x+2]=m,r[x+3]=M,r[x+4]=b,r[x+5]=y,u<=4||l+2>=Ts.length){r[x+6]=h,r[x+7]=u;continue}const R=L-I,F=E-A,O=S-P,V=R>=F&&R>=O?0:F>=R&&F>=O?1:2,K=V===0?ws:V===1?Cr:Rr,z=V===0?(I+L)*.5:V===1?(A+E)*.5:(P+S)*.5;let q=h,N=h+u-1;for(;q<=N;)if(K[i[q]]<z)q++;else{const j=i[q];i[q]=i[N],i[N]=j,N--}let k=q-h;(k===0||k===u)&&(k=u>>1),Ts[l]=h+k,Ir[l]=u-k,Lr[l]=f,Dr[l]=1,l++,Ts[l]=h,Ir[l]=k,Lr[l]=f,Dr[l]=0,l++}n.bvhNodeCount=o,n.bvhDirty=!1}function Ii(n,e,t,i,s,r,a,o,l,h,u,d){const p=(a-n)*i,f=(h-n)*i;let x=p<f?p:f,v=p>f?p:f;const _=(o-e)*s,m=(u-e)*s,M=_<m?_:m,b=_>m?_:m;if(M>x&&(x=M),b<v&&(v=b),v<x)return-1;const y=(l-t)*r,I=(d-t)*r,A=y<I?y:I,P=y>I?y:I;return A>x&&(x=A),P<v&&(v=P),v<x||v<0?-1:x>0?x:0}const $i=192,sh=new WeakMap;function dx(n,e,t,i,s){let r=sh.get(n);r||(r=new Map,sh.set(n,r));let a=r.get(e);if(a)return a;const o=e+t,l=Math.ceil(t/$i);a=new Float32Array(l*6);for(let h=0;h<l;h++){const u=e+h*$i,d=u+$i<o?u+$i:o;let p=1/0,f=1/0,x=1/0,v=-1/0,_=-1/0,m=-1/0;for(let b=u;b<d;b++){const y=(s?s[b]:b)*3,I=i[y],A=i[y+1],P=i[y+2];I<p&&(p=I),A<f&&(f=A),P<x&&(x=P),I>v&&(v=I),A>_&&(_=A),P>m&&(m=P)}const M=h*6;a[M]=p,a[M+1]=f,a[M+2]=x,a[M+3]=v,a[M+4]=_,a[M+5]=m}return r.set(e,a),a}function rh(n,e,t,i,s,r,a,o,l,h,u,d,p){let f=u;for(let x=t;x+2<i;x+=3){const v=e[x]*3,_=e[x+1]*3,m=e[x+2]*3,M=n[v],b=n[v+1],y=n[v+2],I=n[_]-M,A=n[_+1]-b,P=n[_+2]-y,L=n[m]-M,E=n[m+1]-b,S=n[m+2]-y,R=l*S-h*E,F=h*L-o*S,O=o*E-l*L,V=I*R+A*F+P*O;if(V>-1e-6&&V<1e-6)continue;const K=1/V,z=s-M,q=r-b,N=a-y,k=(z*R+q*F+N*O)*K;if(k<0||k>1)continue;const j=q*P-N*A,ie=N*I-z*P,de=z*A-q*I,we=(o*j+l*ie+h*de)*K;if(we<0||k+we>1)continue;const Y=(L*j+E*ie+S*de)*K;Y<=1e-4||Y>=f||p&&(Zr.set(d.origin.x+d.direction.x*Y,d.origin.y+d.direction.y*Y,d.origin.z+d.direction.z*Y),p.distanceToPoint(Zr)<0)||(f=Y)}return f}function ah(n,e,t,i,s,r,a,o,l,h,u,d,p){let f=u;for(let x=t;x+2<i;x+=3){const v=(e?e[x]:x)*3,_=(e?e[x+1]:x+1)*3,m=(e?e[x+2]:x+2)*3,M=n[v],b=n[v+1],y=n[v+2],I=n[_]-M,A=n[_+1]-b,P=n[_+2]-y,L=n[m]-M,E=n[m+1]-b,S=n[m+2]-y,R=l*S-h*E,F=h*L-o*S,O=o*E-l*L,V=I*R+A*F+P*O;if(V>-1e-6&&V<1e-6)continue;const K=1/V,z=s-M,q=r-b,N=a-y,k=(z*R+q*F+N*O)*K;if(k<0||k>1)continue;const j=q*P-N*A,ie=N*I-z*P,de=z*A-q*I,we=(o*j+l*ie+h*de)*K;if(we<0||k+we>1)continue;const Y=(L*j+E*ie+S*de)*K;Y<=1e-4||Y>=f||p&&(Zr.set(d.origin.x+d.direction.x*Y,d.origin.y+d.direction.y*Y,d.origin.z+d.direction.z*Y),p.distanceToPoint(Zr)<0)||(f=Y)}return f}function oh(n,e,t,i,s,r,a,o,l,h,u){ih.copy(t).invert();const d=ih.elements,p=e.origin.x,f=e.origin.y,x=e.origin.z,v=e.direction.x,_=e.direction.y,m=e.direction.z,M=d[0]*p+d[4]*f+d[8]*x+d[12],b=d[1]*p+d[5]*f+d[9]*x+d[13],y=d[2]*p+d[6]*f+d[10]*x+d[14],I=d[0]*v+d[4]*_+d[8]*m,A=d[1]*v+d[5]*_+d[9]*m,P=d[2]*v+d[6]*_+d[10]*m,L=I!==0?1/I:1e30,E=A!==0?1/A:1e30,S=P!==0?1/P:1e30;if(i&&!i.isEmpty()){const ie=Ii(M,b,y,L,E,S,i.min.x,i.min.y,i.min.z,i.max.x,i.max.y,i.max.z);if(ie<0||ie>=h)return 1/0}const R=r?32767:1,F=M*R,O=b*R,V=y*R,K=I*R,z=A*R,q=P*R;let N=h;const k=o+l,j=r&&s instanceof Int16Array&&a instanceof Uint16Array;if(l>$i*2){const ie=dx(n,o,l,s,a),de=K!==0?1/K:1e30,we=z!==0?1/z:1e30,Y=q!==0?1/q:1e30,ee=ie.length/6;for(let he=0;he<ee;he++){const re=he*6,be=Ii(F,O,V,de,we,Y,ie[re],ie[re+1],ie[re+2],ie[re+3],ie[re+4],ie[re+5]);if(be<0||be>=N)continue;const De=o+he*$i,ge=De+$i<k?De+$i:k;N=j?rh(s,a,De,ge,F,O,V,K,z,q,N,e,u):ah(s,a,De,ge,F,O,V,K,z,q,N,e,u)}}else N=j?rh(s,a,o,k,F,O,V,K,z,q,N,e,u):ah(s,a,o,k,F,O,V,K,z,q,N,e,u);return N<h?N:1/0}const lh=new WeakMap;function fx(n){let e=lh.get(n);if(e)return e;e=new Map;const t=n.kind==="instanced"?n.instanceIdToPartId:n.batchIdToPartId;for(let i=0;i<t.length;i++){const s=t[i];if(!s)continue;let r=e.get(s);r||(r=[],e.set(s,r)),r.push(i)}return lh.set(n,e),e}class px{raycaster=new rp;hoverThrottleMs;isDragging=!1;lastHoverTimestampMs=-1/0;lastHoverPartId=null;hoverChecksPerformed=0;hoverChecksSkipped=0;constructor(e=33.3){this.hoverThrottleMs=e}setCameraDragging(e){this.isDragging=e}isCameraDragging(){return this.isDragging}resetHoverThrottle(){this.lastHoverTimestampMs=-1/0}getDiagnostics(){return{performed:this.hoverChecksPerformed,skipped:this.hoverChecksSkipped}}pickHover(e,t,i,s,r,a=typeof performance<"u"?performance.now():Date.now()){if(!i||this.isDragging)return this.hoverChecksSkipped++,{skipped:!0,partId:this.lastHoverPartId};if(a-this.lastHoverTimestampMs<this.hoverThrottleMs)return this.hoverChecksSkipped++,{skipped:!0,partId:this.lastHoverPartId};this.lastHoverTimestampMs=a,this.hoverChecksPerformed++,this.raycaster.setFromCamera(e,t);const o=this.pickWithRay(this.raycaster,i,s,r);return this.lastHoverPartId=o,{skipped:!1,partId:o}}pickClick(e,t,i,s,r){return i?(this.raycaster.setFromCamera(e,t),this.pickWithRay(this.raycaster,i,s,r)):null}pickWithRay(e,t,i,s){t.boundsDirty&&t.syncBounds&&t.syncBounds(),t.bvhDirty&&t.bvhNodes&&ux(t);const r=e.ray,a=r.origin,o=a.x,l=a.y,h=a.z,u=r.direction.x!==0?1/r.direction.x:1e30,d=r.direction.y!==0?1/r.direction.y:1e30,p=r.direction.z!==0?1/r.direction.z:1e30,f=t.unitWorldBox;if(f.isEmpty()||Ii(o,l,h,u,d,p,f.min.x,f.min.y,f.min.z,f.max.x,f.max.y,f.max.z)<0)return null;let x=0;const v=t.parts,_=Gi.length,m=t.bvhNodes,M=t.bvhPartOrder,b=t.bvhNodeCount??0;if(m&&M&&b>0){let E=1;for(Xi[0]=0;E>0;){const R=Xi[--E]*8;if(Ii(o,l,h,u,d,p,m[R],m[R+1],m[R+2],m[R+3],m[R+4],m[R+5])<0)continue;const O=m[R+6]|0,V=m[R+7]|0;if(V>0){const K=O+V;for(let z=O;z<K;z++){const q=M[z],N=v[q];if(i(N.partId))continue;const k=N.worldBox;if(k.isEmpty())continue;const j=Ii(o,l,h,u,d,p,k.min.x,k.min.y,k.min.z,k.max.x,k.max.y,k.max.z);if(!(j<0)){if(x>=_)break;Gi[x]=q,Wi[x]=j*j,x++}}}else{const K=O,z=-V,q=K*8,N=z*8,k=Ii(o,l,h,u,d,p,m[q],m[q+1],m[q+2],m[q+3],m[q+4],m[q+5]),j=Ii(o,l,h,u,d,p,m[N],m[N+1],m[N+2],m[N+3],m[N+4],m[N+5]);k>=0&&j>=0?k<=j?(Xi[E++]=z,Xi[E++]=K):(Xi[E++]=K,Xi[E++]=z):k>=0?Xi[E++]=K:j>=0&&(Xi[E++]=z)}}}else{const E=t.groups;for(let S=0;S<E.length;S++){const R=E[S],F=R.worldBox;if(F.isEmpty()||Ii(o,l,h,u,d,p,F.min.x,F.min.y,F.min.z,F.max.x,F.max.y,F.max.z)<0)continue;const O=R.partIndices;for(let V=0;V<O.length;V++){const K=O[V],z=v[K];if(i(z.partId))continue;const q=z.worldBox;if(q.isEmpty())continue;const N=Ii(o,l,h,u,d,p,q.min.x,q.min.y,q.min.z,q.max.x,q.max.y,q.max.z);if(!(N<0)){if(x>=_)break;Gi[x]=K,Wi[x]=N*N,x++}}}}if(x===0)return null;for(let E=1;E<x;E++){const S=Gi[E],R=Wi[E];let F=E-1;for(;F>=0&&Wi[F]>R;)Gi[F+1]=Gi[F],Wi[F+1]=Wi[F],F--;Gi[F+1]=S,Wi[F+1]=R}let y=1/0,I=1/0,A=null;const P=t.bindings,L=!!t.fastLiteRaycast;for(let E=0;E<x&&!(Wi[E]>=I);E++){const S=v[Gi[E]],R=S.partId,F=S.bindingIndices;for(let O=0;O<F.length;O++){const V=P[F[O]];if(!V||!V.mesh.visible)continue;const z=fx(V).get(R);if(!z)continue;const q=V.gpuExplodeOffsets,N=V.gpuExplodeFactor??0,k=!!(q&&N>1e-6);if(V.kind==="batched"){const j=V.mesh,ie=j.geometry;if(L){const de=ie.getAttribute("position");if(!de)continue;const we=de.array,Y=!!(de.normalized&&we instanceof Int16Array),ee=ie.index?ie.index.array:null;for(let he=0;he<z.length;he++){const re=z[he];if(!j.getVisibleAt(re))continue;const be=j.getGeometryIdAt(re),De=j.getGeometryRangeAt(be,nh);if(!De||De.count<=0)continue;if(j.getMatrixAt(re,Yn.matrixWorld).premultiply(j.matrixWorld),k&&q){const ae=re*3,te=Yn.matrixWorld.elements;te[12]+=q[ae]*N,te[13]+=q[ae+1]*N,te[14]+=q[ae+2]*N}const ge=j.getBoundingBoxAt(be,th),Be=oh(ie,r,Yn.matrixWorld,ge,we,Y,ee,De.start,De.count,y,s);Be<y&&(y=Be,I=Be*Be,A=R)}}else{ti.index=ie.index,ti.attributes=ie.attributes;for(let de=0;de<z.length;de++){const we=z[de];if(!j.getVisibleAt(we))continue;const Y=j.getGeometryIdAt(we),ee=j.getGeometryRangeAt(Y,nh);if(!(!ee||ee.count<=0)){if(ti.setDrawRange(ee.start,ee.count),j.getMatrixAt(we,Yn.matrixWorld).premultiply(j.matrixWorld),k&&q){const he=we*3,re=Yn.matrixWorld.elements;re[12]+=q[he]*N,re[13]+=q[he+1]*N,re[14]+=q[he+2]*N}ti.boundingBox=j.getBoundingBoxAt(Y,th),ti.boundingSphere=j.getBoundingSphereAt(Y,hx),Ci.length=0,Yn.raycast(e,Ci);for(let he=0;he<Ci.length;he++){const re=Ci[he];re.distance>=y||s&&s.distanceToPoint(re.point)<0||(y=re.distance,I=y*y,A=R)}}}ti.index=null,ti.attributes={},ti.boundingBox=null,ti.boundingSphere=null}}else{const j=V.mesh,ie=j.geometry;if(!ie)continue;if(L){const de=ie.getAttribute("position");if(!de)continue;const we=de.array,Y=!!(de.normalized&&we instanceof Int16Array),ee=ie.index?ie.index.array:null,he=ee?ee.length:de.count;ie.boundingBox||ie.computeBoundingBox();for(let re=0;re<z.length;re++){const be=z[re];j.getMatrixAt(be,fi.matrixWorld),fi.matrixWorld.premultiply(j.matrixWorld);const De=fi.matrixWorld.elements;if(De[0]===0&&De[1]===0&&De[2]===0&&De[4]===0&&De[5]===0&&De[6]===0)continue;if(k&&q){const Be=be*3;De[12]+=q[Be]*N,De[13]+=q[Be+1]*N,De[14]+=q[Be+2]*N}const ge=oh(ie,r,fi.matrixWorld,ie.boundingBox,we,Y,ee,0,he,y,s);ge<y&&(y=ge,I=ge*ge,A=R)}}else{fi.geometry=ie;for(let de=0;de<z.length;de++){const we=z[de];j.getMatrixAt(we,fi.matrixWorld),fi.matrixWorld.premultiply(j.matrixWorld);const Y=fi.matrixWorld.elements;if(!(Y[0]===0&&Y[1]===0&&Y[2]===0&&Y[4]===0&&Y[5]===0&&Y[6]===0)){if(k&&q){const ee=we*3;Y[12]+=q[ee]*N,Y[13]+=q[ee+1]*N,Y[14]+=q[ee+2]*N}Ci.length=0,fi.raycast(e,Ci);for(let ee=0;ee<Ci.length;ee++){const he=Ci[ee];he.distance>=y||s&&s.distanceToPoint(he.point)<0||(y=he.distance,I=y*y,A=R)}}}fi.geometry=ti}}}}return Ci.length=0,A}}const Gr={standard_lite:{maxPixelRatio:1,curveSegments:5,radialSegments:6,torusTubularSegments:6,sphereSegments:6,shadowsEnabled:!1,postProcessEnabled:!1,enableStudioEnv:!1,showSolidStructuralEdges:!1,maxHeroTextureDim:128},standard:{maxPixelRatio:1,curveSegments:10,radialSegments:14,torusTubularSegments:14,sphereSegments:12,shadowsEnabled:!1,postProcessEnabled:!1,enableStudioEnv:!1,showSolidStructuralEdges:!0,maxHeroTextureDim:512},high:{maxPixelRatio:1.5,curveSegments:14,radialSegments:18,torusTubularSegments:18,sphereSegments:16,shadowsEnabled:!1,postProcessEnabled:!1,enableStudioEnv:!0,showSolidStructuralEdges:!0,maxHeroTextureDim:512},ultra:{maxPixelRatio:2,curveSegments:24,radialSegments:28,torusTubularSegments:28,sphereSegments:24,shadowsEnabled:!0,postProcessEnabled:!1,enableStudioEnv:!0,showSolidStructuralEdges:!0,maxHeroTextureDim:2048}};function kx(n){const e=(n>>16&255)/255,t=(n>>8&255)/255,i=(n&255)/255,s=.2126*e+.7152*t+.0722*i,r=.3;if(s>=r)return n;const a=1-s/r,o=.195*a*a,l=Math.min(1,e+o*.96),h=Math.min(1,t+o*.99),u=Math.min(1,i+o*1.05);return(Math.round(l*255)&255)<<16|(Math.round(h*255)&255)<<8|Math.round(u*255)&255}function Hx(n){const e=(n>>16&255)/255,t=(n>>8&255)/255,i=(n&255)/255;return .2126*e+.7152*t+.0722*i}const ch={metal_hero:{color:16777215,metalness:.9,roughness:.22,bumpTextureKey:"cnc_brushed",bumpScale:.016,ultraPhysical:{clearcoat:.32,clearcoatRoughness:.14}},matte_chassis:{color:16777215,metalness:.26,roughness:.5,stdLambert:!0,bumpTextureKey:"mg_grain",bumpScale:.025},elastomer_rubber:{color:16777215,metalness:.05,roughness:.86,stdLambert:!0,bumpTextureKey:"mg_grain",bumpScale:.04},pcb_textured:{color:16777215,metalness:.22,roughness:.42,stdLambert:!0,mapTextureKey:"hdi_pcb",bumpTextureKey:"hdi_pcb",bumpScale:.028},silicon_hero:{color:16777215,metalness:.42,roughness:.24,ultraPhysical:{clearcoat:.55,clearcoatRoughness:.14,iridescence:.45,iridescenceIOR:1.65}},gold_plating:{color:16777215,metalness:.94,roughness:.18,ultraPhysical:{clearcoat:.36,clearcoatRoughness:.12}},becu_spring:{color:16777215,metalness:.89,roughness:.23,bumpTextureKey:"cnc_brushed",bumpScale:.02,ultraPhysical:{clearcoat:.24,clearcoatRoughness:.16}},stainless_machined:{color:16777215,metalness:.9,roughness:.21,bumpTextureKey:"cnc_brushed",bumpScale:.015,ultraPhysical:{clearcoat:.3,clearcoatRoughness:.14}},matte_black_anodized:{color:16777215,metalness:.48,roughness:.46},pin_carrier_gloss:{color:16777215,metalness:.14,roughness:.26,ultraPhysical:{clearcoat:.58,clearcoatRoughness:.14}},copper_coil:{color:16777215,metalness:.88,roughness:.24,mapTextureKey:"copper_coil",bumpTextureKey:"copper_coil",bumpScale:.03,ultraPhysical:{clearcoat:.22,clearcoatRoughness:.18}},torus_seal:{color:16777215,metalness:.36,roughness:.52,stdLambert:!0},copper_thermal:{color:16777215,metalness:.9,roughness:.24,bumpTextureKey:"cnc_brushed",bumpScale:.018,ultraPhysical:{clearcoat:.26,clearcoatRoughness:.18}},brass_precision:{color:16777215,metalness:.91,roughness:.22,bumpTextureKey:"cnc_brushed",bumpScale:.016,ultraPhysical:{clearcoat:.28,clearcoatRoughness:.15}},titanium_machined:{color:16777215,metalness:.86,roughness:.27,bumpTextureKey:"cnc_brushed",bumpScale:.018,ultraPhysical:{clearcoat:.25,clearcoatRoughness:.18}},magnesium_cast:{color:16777215,metalness:.62,roughness:.44,bumpTextureKey:"mg_grain",bumpScale:.032},iron_magnetic:{color:16777215,metalness:.84,roughness:.3,bumpTextureKey:"cnc_brushed",bumpScale:.018},solder_silver:{color:16777215,metalness:.93,roughness:.16,ultraPhysical:{clearcoat:.35,clearcoatRoughness:.12}},emi_shield_metal:{color:16777215,metalness:.84,roughness:.28,bumpTextureKey:"mesh_grid",bumpScale:.022},optical_glass_clear:{color:16777215,metalness:.04,roughness:.06,transparent:!0,opacity:.34,depthWrite:!1,ultraPhysical:{clearcoat:1,clearcoatRoughness:.04,iridescence:.28,iridescenceIOR:1.48,ior:1.52,reflectivity:.9}},optical_glass_ed:{color:16777215,metalness:.05,roughness:.05,transparent:!0,opacity:.42,depthWrite:!1,ultraPhysical:{clearcoat:1,clearcoatRoughness:.04,iridescence:.42,iridescenceIOR:1.58,ior:1.56,reflectivity:.92}},optical_ar_iridescent:{color:16777215,metalness:.1,roughness:.07,transparent:!0,opacity:.46,depthWrite:!1,ultraPhysical:{clearcoat:1,clearcoatRoughness:.05,iridescence:.88,iridescenceIOR:1.72,ior:1.62,reflectivity:.95}},optical_dichroic:{color:16777215,metalness:.22,roughness:.08,transparent:!0,opacity:.54,depthWrite:!1,ultraPhysical:{clearcoat:.95,clearcoatRoughness:.05,iridescence:.95,iridescenceIOR:1.85}},glass_clear_housing:{color:16777215,metalness:.05,roughness:.08,transparent:!0,opacity:.24,depthWrite:!1,ultraPhysical:{clearcoat:.92,clearcoatRoughness:.06}},membrane_translucent:{color:16777215,metalness:.08,roughness:.24,transparent:!0,opacity:.68,depthWrite:!1,ultraPhysical:{clearcoat:.45,clearcoatRoughness:.18}},silicon_wafer_dark:{color:16777215,metalness:.52,roughness:.16,mapTextureKey:"wafer_grid",bumpTextureKey:"wafer_grid",bumpScale:.018,ultraPhysical:{clearcoat:.85,clearcoatRoughness:.08,iridescence:.65,iridescenceIOR:1.78}},silicon_photodiode:{color:16777215,metalness:.36,roughness:.18,mapTextureKey:"optical_diffraction",ultraPhysical:{clearcoat:.78,clearcoatRoughness:.1,iridescence:.72,iridescenceIOR:1.68}},silicon_dielectric:{color:16777215,metalness:.12,roughness:.28,transparent:!0,opacity:.56,depthWrite:!1,ultraPhysical:{clearcoat:.62,clearcoatRoughness:.14}},cucu_hybrid_copper:{color:16777215,metalness:.92,roughness:.17,bumpTextureKey:"wafer_grid",bumpScale:.02,ultraPhysical:{clearcoat:.34,clearcoatRoughness:.12}},cfa_gloss_filter:{color:16777215,metalness:.08,roughness:.14,transparent:!0,opacity:.78,depthWrite:!1,ultraPhysical:{clearcoat:.9,clearcoatRoughness:.08}},abf_substrate:{color:16777215,metalness:.18,roughness:.38,stdLambert:!0,bumpTextureKey:"hdi_pcb",bumpScale:.02},ic_epoxy_dark:{color:16777215,metalness:.14,roughness:.44,stdLambert:!0,bumpTextureKey:"ceramic_grain",bumpScale:.015},polyimide_fpc:{color:16777215,metalness:.24,roughness:.28,ultraPhysical:{clearcoat:.55,clearcoatRoughness:.16}},ceramic_alumina:{color:16777215,metalness:.06,roughness:.58,stdLambert:!0,bumpTextureKey:"ceramic_grain",bumpScale:.022},carbon_fiber:{color:16777215,metalness:.34,roughness:.34,mapTextureKey:"carbon_weave",bumpTextureKey:"carbon_weave",bumpScale:.028,ultraPhysical:{clearcoat:.42,clearcoatRoughness:.2}},leatherette_grip:{color:16777215,metalness:.04,roughness:.84,stdLambert:!0,bumpTextureKey:"leather_grain",bumpScale:.045},foam_felt_matte:{color:16777215,metalness:.02,roughness:.94,stdLambert:!0,bumpTextureKey:"ceramic_grain",bumpScale:.038},emissive_glow:{color:16777215,metalness:.08,roughness:.24,emissive:3900150,emissiveIntensity:.55}};function mx(n){if(n==="studio_env"){const a=new Uint8Array(32768);for(let l=0;l<64;l++){const u=(1-l/63)*Math.PI,d=Math.sin(u),p=Math.cos(u);for(let f=0;f<128;f++){const v=f/127*Math.PI*2,_=d*Math.cos(v),m=p,M=d*Math.sin(v);let b=.76+Math.max(0,m)*.24;const y=Math.max(0,_*-.517+m*.716+M*.458);b+=Math.pow(y,5)*.48;const I=Math.max(0,_*.648+m*.365+M*-.669);b+=Math.pow(I,6)*.42;const A=Math.max(0,_*.32+m*-.45+M*.83);b+=Math.pow(A,3)*.28;const P=Math.exp(-Math.pow((m+.08)*7.5,2));b*=1-P*.16;const L=Math.min(255,Math.max(0,Math.round(b*248))),E=Math.min(255,Math.max(0,Math.round(b*250))),S=Math.min(255,Math.max(0,Math.round(b*255))),R=(l*128+f)*4;a[R]=L,a[R+1]=E,a[R+2]=S,a[R+3]=255}}const o=new ui(a,128,64,bt);return o.mapping=Fs,o.colorSpace=Mt,o.minFilter=gt,o.magFilter=gt,o.generateMipmaps=!1,o.needsUpdate=!0,o.userData.__cacheKey=n,o}if(n==="studio_env_ultra"){const a=new Uint8Array(2097152);for(let l=0;l<512;l++){const u=(1-l/511)*Math.PI,d=Math.sin(u),p=Math.cos(u);for(let f=0;f<1024;f++){const v=f/1023*Math.PI*2,_=d*Math.cos(v),m=p,M=d*Math.sin(v);let b=m>=0?.54+m*.36:.44+(1+m)*.15,y=m>=0?.57+m*.36:.46+(1+m)*.15,I=m>=0?.63+m*.36:.51+(1+m)*.16;const A=Math.exp(-Math.pow((m-.01)*6.2,2)),P=.58+.42*Math.pow(Math.abs(Math.sin(v*2+.32)),.65),L=1-A*.52*P;b*=L,y*=L,I*=L;const E=Math.exp(-Math.pow((_+.34)*3.1,2))*Math.exp(-Math.pow((m-.85)*4.8,2))*Math.exp(-Math.pow((M-.28)*2.6,2)),S=Math.pow(Math.max(0,_*-.44+m*.78+M*.44),18),R=Math.exp(-Math.pow((_-.12)*8,2))*Math.exp(-Math.pow((m-.92)*5.2,2))*Math.exp(-Math.pow((M+.18)*2.2,2));b+=E*1.65+S*1.15+R*1.05,y+=E*1.66+S*1.16+R*1.08,I+=E*1.72+S*1.22+R*1.16;const F=Math.exp(-Math.pow((_-.78)*6.2,2))*Math.exp(-Math.pow((m-.24)*2.6,2))*Math.exp(-Math.pow((M+.52)*4.4,2)),O=Math.exp(-Math.pow((_+.84)*6.6,2))*Math.exp(-Math.pow((m-.16)*2.8,2))*Math.exp(-Math.pow((M+.36)*4.6,2));b+=F*1.32+O*.98,y+=F*1.42+O*1.04,I+=F*1.64+O*1.16;const V=Math.pow(Math.max(0,_*.56+m*.28+M*.78),8);b+=V*.76,y+=V*.73,I+=V*.7;const K=Math.pow(Math.max(0,_*.18+m*-.52+M*.84),3);b+=K*.38,y+=K*.4,I+=K*.44;const z=N=>{const k=N/(1+N*.3);return Math.min(255,Math.max(0,Math.round(Math.pow(Math.min(1,k),1/2.2)*255)))},q=(l*1024+f)*4;a[q]=z(b),a[q+1]=z(y),a[q+2]=z(I),a[q+3]=255}}const o=new ui(a,1024,512,bt);return o.mapping=Fs,o.colorSpace=Mt,o.minFilter=gt,o.magFilter=gt,o.generateMipmaps=!1,o.needsUpdate=!0,o.userData.__cacheKey=n,o}if(n==="matcap_studio_matte"||n==="matcap_studio_metal"){const r=n==="matcap_studio_metal",a=new Uint8Array(16384*4),o=Math.hypot(-.44,.72,.54),l=-.44/o,h=.72/o,u=.54/o,d=Math.hypot(.62,.24,.75),p=.62/d,f=.24/d,x=.75/d,v=Math.hypot(.66,.44,-.61),_=.66/v,m=.44/v,M=-.61/v,b=Math.hypot(l,h,u+1),y=l/b,I=h/b,A=(u+1)/b,P=Math.hypot(p,f,x+1),L=p/P,E=f/P,S=(x+1)/P;for(let F=0;F<128;F++){const O=F/127*2-1;for(let V=0;V<128;V++){const K=V/127*2-1,z=K*K+O*O;let q=K,N=O,k;if(z>=1){const ge=1/Math.sqrt(z);q*=ge,N*=ge,k=0}else k=Math.sqrt(1-z);const j=N*.5+.5;let ie=.72+j*.24,de=.74+j*.24,we=.78+j*.26;const Y=Math.max(0,q*l+N*h+k*u),ee=Math.max(0,q*p+N*f+k*x),he=Math.max(0,q*_+N*m+k*M),re=r?.72:.8;if(ie+=(Y*.78+ee*.48+he*.3)*re,de+=(Y*.79+ee*.49+he*.32)*re,we+=(Y*.8+ee*.51+he*.36)*re,r){const ge=Math.pow(Math.max(0,q*y+N*I+k*A),24),Be=Math.pow(Math.max(0,q*L+N*E+k*S),14),ae=Math.pow(1-k,2.6)*(.5+.5*j);ie+=ge*.82+Be*.34+ae*.36,de+=ge*.86+Be*.36+ae*.4,we+=ge*.94+Be*.4+ae*.46}else{const ge=Math.pow(1-k,2.2)*.2;ie+=ge*.95,de+=ge*.98,we+=ge*1.03}const be=ge=>{const Be=Math.min(1,ge/2.15);return Math.min(255,Math.max(0,Math.round(Math.pow(Be,1/2.2)*255)))},De=(F*128+V)*4;a[De]=be(ie),a[De+1]=be(de),a[De+2]=be(we),a[De+3]=255}}const R=new ui(a,128,128,bt);return R.colorSpace=Mt,R.minFilter=gt,R.magFilter=gt,R.generateMipmaps=!1,R.needsUpdate=!0,R.userData.__cacheKey=n,R}if(n==="matcap_studio_dual"){const a=new Uint8Array(131072),o=Math.hypot(-.44,.72,.54),l=-.44/o,h=.72/o,u=.54/o,d=Math.hypot(.62,.24,.75),p=.62/d,f=.24/d,x=.75/d,v=Math.hypot(.66,.44,-.61),_=.66/v,m=.44/v,M=-.61/v,b=Math.hypot(l,h,u+1),y=l/b,I=h/b,A=(u+1)/b,P=Math.hypot(p,f,x+1),L=p/P,E=f/P,S=(x+1)/P;for(let F=0;F<2;F++){const O=F===1,V=F*128;for(let K=0;K<128;K++){const z=K/127*2-1;for(let q=0;q<128;q++){const N=q/127*2-1,k=N*N+z*z;let j=N,ie=z,de;if(k>=1){const te=1/Math.sqrt(k);j*=te,ie*=te,de=0}else de=Math.sqrt(1-k);const we=ie*.5+.5;let Y=.74+we*.26,ee=.76+we*.26,he=.8+we*.28;const re=Math.max(0,j*l+ie*h+de*u),be=Math.max(0,j*p+ie*f+de*x),De=Math.max(0,j*_+ie*m+de*M),ge=O?.72:.84;if(Y+=(re*.8+be*.48+De*.3)*ge,ee+=(re*.81+be*.49+De*.32)*ge,he+=(re*.82+be*.51+De*.36)*ge,O){const te=Math.pow(Math.max(0,j*y+ie*I+de*A),24),U=Math.pow(Math.max(0,j*L+ie*E+de*S),14),Ue=Math.pow(1-de,2.5)*(.48+.52*we);Y+=te*.92+U*.36+Ue*.38,ee+=te*.95+U*.38+Ue*.42,he+=te*1.02+U*.42+Ue*.48}else{const te=Math.pow(1-de,2.2)*.18;Y+=te*.95,ee+=te*.98,he+=te*1.03}const Be=te=>{const U=te/(te*.52+.96);return Math.min(255,Math.max(0,Math.round(Math.pow(Math.min(1,U),1/2.2)*255)))},ae=(K*256+(V+q))*4;a[ae]=Be(Y),a[ae+1]=Be(ee),a[ae+2]=Be(he),a[ae+3]=255}}}const R=new ui(a,256,128,bt);return R.colorSpace=Mt,R.minFilter=gt,R.magFilter=gt,R.generateMipmaps=!1,R.needsUpdate=!0,R.userData.__cacheKey=n,R}if(n==="lite_explode_dummy"){const s=new Float32Array([0,0,0,0]),r=new ui(s,1,1,bt,Kt);return r.minFilter=Bt,r.magFilter=Bt,r.generateMipmaps=!1,r.needsUpdate=!0,r.userData.__cacheKey=n,r}const e=128,t=new Uint8Array(e*e*4);for(let s=0;s<e;s++)for(let r=0;r<e;r++){const a=(s*e+r)*4,o=(Math.sin(r*12.9898+s*78.233)*43758.5453%1+1)%1;if(n==="cnc_brushed"){const l=Math.sin(s*1.85)*16+Math.sin(s*.42+r*.04)*8+(o-.5)*16,h=Math.min(255,Math.max(0,Math.round(128+l)));t[a]=h,t[a+1]=h,t[a+2]=h,t[a+3]=255}else if(n==="mg_grain"){const l=Math.min(255,Math.max(0,Math.round(108+o*48)));t[a]=l,t[a+1]=l,t[a+2]=l,t[a+3]=255}else if(n==="hdi_pcb"){const l=r%8===0||s%12===0;r%16===4&&s%16===4?(t[a]=255,t[a+1]=242,t[a+2]=196):l?(t[a]=210,t[a+1]=244,t[a+2]=228):(t[a]=176,t[a+1]=208,t[a+2]=196),t[a+3]=255}else if(n==="copper_coil"){const l=.5+.5*Math.sin(r/e*Math.PI*32);t[a]=Math.round(202+l*50),t[a+1]=Math.round(186+l*48),t[a+2]=Math.round(170+l*44),t[a+3]=255}else if(n==="carbon_weave"){const l=(r>>2)+(s>>2)&1,h=Math.sin(l===0?(r&3)*1.2:(s&3)*1.2),u=Math.min(255,Math.max(0,Math.round(174+l*40+h*20)));t[a]=u,t[a+1]=Math.min(255,u+3),t[a+2]=Math.min(255,u+8),t[a+3]=255}else if(n==="leather_grain"){const l=Math.sin(r*.9+Math.cos(s*.85)*1.4)*Math.cos(s*.95)*34,h=Math.min(255,Math.max(0,Math.round(124+l+(o-.5)*26)));t[a]=h,t[a+1]=h,t[a+2]=h,t[a+3]=255}else if(n==="wafer_grid"){const l=r%16===0||s%16===0,h=r%4===0||s%4===0;l?(t[a]=236,t[a+1]=244,t[a+2]=255):h?(t[a]=196,t[a+1]=212,t[a+2]=232):(t[a]=172,t[a+1]=188,t[a+2]=210),t[a+3]=255}else if(n==="optical_diffraction"){const l=(r+s*.7)/e*Math.PI*8;t[a]=Math.round(186+44*Math.sin(l)),t[a+1]=Math.round(202+42*Math.sin(l+2.1)),t[a+2]=Math.round(218+34*Math.sin(l+4.2)),t[a+3]=255}else if(n==="ceramic_grain"){const l=Math.min(255,Math.max(0,Math.round(120+(o-.5)*44)));t[a]=l,t[a+1]=l,t[a+2]=l,t[a+3]=255}else if(n==="mesh_grid"){const l=r%6===0||s%6===0?196:96;t[a]=l,t[a+1]=l,t[a+2]=l,t[a+3]=255}else{const l=r%8===0||s%8===0?28:0;t[a]=182+l,t[a+1]=196+l,t[a+2]=218+l,t[a+3]=255}}const i=new ui(t,e,e,bt);return i.wrapS=En,i.wrapT=En,(n==="hdi_pcb"||n==="copper_coil"||n==="silicon_die"||n==="carbon_weave"||n==="wafer_grid"||n==="optical_diffraction")&&(i.colorSpace=Mt),i.minFilter=Di,i.magFilter=gt,i.anisotropy=4,i.generateMipmaps=!0,i.needsUpdate=!0,i.userData.__cacheKey=n,i}function hh(n,e=8952234){const i=new Uint8Array(256),s=e>>16&255,r=e>>8&255,a=e&255;for(let l=0;l<64;l++){const h=l*4;i[h]=s,i[h+1]=r,i[h+2]=a,i[h+3]=255}const o=new ui(i,8,8,bt);return o.colorSpace=Mt,o.minFilter=gt,o.magFilter=gt,o.generateMipmaps=!1,o.needsUpdate=!0,o.userData.__cacheKey=n,o}class vn{materials=new Map;geometries=new Map;textures=new Map;acquireTexture(e){const t=this.textures.get(e);if(t)return t.refCount++,t.resource;const i=mx(e);return this.textures.set(e,{resource:i,refCount:1}),i}acquireHeroTexture(e,t,i){const s=`herotex:${e}:${i}`,r=this.textures.get(s);if(r)return r.refCount++,r.resource;let a;if(typeof document<"u"){const o=Gr[i].maxHeroTextureDim,l=Math.min(1,o/Math.max(1,t.width,t.height)),h=Math.max(32,Math.round(t.width*l)),u=Math.max(32,Math.round(t.height*l)),d=document.createElement("canvas");d.width=h,d.height=u;const p=d.getContext("2d");if(p){p.save(),p.scale(h/t.width,u/t.height),t.painter(p,t.width,t.height),p.restore();const f=new _f(d);f.colorSpace=Mt,f.minFilter=Di,f.magFilter=gt,f.anisotropy=i==="ultra"?8:i==="high"?2:1,t.wrapRepeat&&(f.wrapS=En,f.wrapT=En),(t.repeatX||t.repeatY)&&f.repeat.set(t.repeatX??1,t.repeatY??1),f.needsUpdate=!0,a=f}else a=hh(s,t.fallbackColor??t.baseColor??8952234)}else a=hh(s,t.fallbackColor??t.baseColor??8952234);return a.userData.__cacheKey=s,this.textures.set(s,{resource:a,refCount:1}),a}releaseTexture(e){const t=this.textures.get(e);return t?(t.refCount--,t.refCount<=0?(t.resource.dispose(),this.textures.delete(e),!0):!1):!1}acquireGeometry(e,t){const i=this.geometries.get(e);if(i)return i.refCount++,i.resource;const s=t();return s.userData.__cacheKey=e,this.geometries.set(e,{resource:s,refCount:1}),s}releaseGeometry(e){const t=this.geometries.get(e);return t?(t.refCount--,t.refCount<=0?(t.resource.dispose(),this.geometries.delete(e),!0):!1):!1}static computeStdPhongProps(e,t,i){return i?{specular:14412542,shininess:92}:e>=.7?{specular:12110044,shininess:Math.round(Math.max(28,Math.min(96,(1-t)*95+18)))}:e>=.3?{specular:7306641,shininess:Math.round(Math.max(20,Math.min(64,(1-t)*65+14)))}:{specular:4937059,shininess:Math.round(Math.max(16,Math.min(48,(1-t)*45+12)))}}acquireMaterial(e,t,i="solid",s=[],r=!1,a=0){const o=t==="standard_lite",l=o&&i==="solid"&&r,h=o&&a>0?`:p${a}`:"",u=`mat:${e}:${t}:${i}${l?":vc":""}${h}`,d=s.length>0?Ht:$t,p=this.materials.get(u);if(p)return p.refCount++,p.resource.clippingPlanes=s,p.resource.userData?.__managedSide&&p.resource.side!==d&&(p.resource.side=d,p.resource.needsUpdate=!0),p.resource;const f=ch[e],x=[],v=i==="xray",_=i==="cad";let m=null,M=null;!v&&!_&&(!o&&f.mapTextureKey&&(m=this.acquireTexture(f.mapTextureKey),x.push(f.mapTextureKey)),!o&&t!=="standard"&&f.bumpTextureKey&&(M=this.acquireTexture(f.bumpTextureKey),x.push(f.bumpTextureKey)));const b=v||!!(f.transparent&&!_),y=v?.24:_?f.transparent?Math.max(.42,f.opacity??.5):1:f.opacity??1,I=v?!1:_?!f.transparent:f.depthWrite??!b,A={color:_?16054010:v?14412542:f.color,clippingPlanes:s,clipShadows:t==="ultra",side:d,transparent:b||_&&!!f.transparent,opacity:y,depthWrite:I};let P;if(o){const L="matcap_studio_dual",E=this.acquireTexture(L),S=this.acquireTexture("lite_explode_dummy");x.push(L,"lite_explode_dummy");const R=new Ve(A.color);!_&&!v?R.multiplyScalar(1.48):_?R.multiplyScalar(1.24):R.multiplyScalar(1.3);const F=new ka({...A,color:R,matcap:E,vertexColors:l,toneMapped:!1,polygonOffset:_,polygonOffsetFactor:_?1:0,polygonOffsetUnits:_?1:0}),O=v||_||f.stdLambert&&!f.transparent?0:1;vn.patchLiteMatcapMaterial(F,S,{dualAtlas:!0,defaultFinish:O,enableRim:!v&&!f.transparent,playgroundMode:!1}),P=F}else if(v)P=new Sr({...A,emissive:1981066,emissiveIntensity:.14});else if(_)P=new Sr({...A,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1});else if(t==="standard")if(f.stdLambert&&!f.transparent)P=new Sr({...A,map:m,emissive:f.emissive??0,emissiveIntensity:f.emissiveIntensity??0});else{const L=vn.computeStdPhongProps(f.metalness,f.roughness,!!f.transparent);P=new _c({...A,map:m,specular:L.specular,shininess:L.shininess,emissive:f.emissive??0,emissiveIntensity:f.emissiveIntensity??0})}else t==="ultra"&&f.ultraPhysical?P=new gc({...A,map:m,bumpMap:M,bumpScale:(f.bumpScale??.02)*1.25,metalness:f.metalness,roughness:f.roughness,clearcoat:f.ultraPhysical.clearcoat,clearcoatRoughness:f.ultraPhysical.clearcoatRoughness,iridescence:f.ultraPhysical.iridescence??0,iridescenceIOR:f.ultraPhysical.iridescenceIOR??1.3,ior:f.ultraPhysical.ior??1.5,reflectivity:f.ultraPhysical.reflectivity??.5,envMapIntensity:1.52,emissive:f.emissive??0,emissiveIntensity:f.emissiveIntensity??0}):P=new Ko({...A,map:m,bumpMap:M,bumpScale:(f.bumpScale??.02)*(t==="ultra"?1.25:1),metalness:f.metalness,roughness:f.roughness,envMapIntensity:t==="ultra"?1.28:.95,emissive:f.emissive??0,emissiveIntensity:f.emissiveIntensity??0});return P.userData.__cacheKey=u,P.userData.__materialBucket=e,P.userData.__managedSide=!0,this.materials.set(u,{resource:P,refCount:1,depTextures:x}),P}static patchLiteMatcapMaterial(e,t,i){const s={uExplode:{value:0},uExplodeTex:{value:t},uExplodeTexW:{value:1},uExplodeActive:{value:0}};e.userData.__liteUniforms=s,e.userData.__liteDummyTex=t;const r=`lite_mc_v2_${i.dualAtlas?"d":"s"}_${i.defaultFinish>.5?"m":"t"}_${i.enableRim?"r":"n"}_${i.playgroundMode?"pg":"v2"}`;e.customProgramCacheKey=()=>r;const a=i.defaultFinish.toFixed(1);return e.onBeforeCompile=o=>{o.uniforms.uExplode=s.uExplode,o.uniforms.uExplodeTex=s.uExplodeTex,o.uniforms.uExplodeTexW=s.uExplodeTexW,o.uniforms.uExplodeActive=s.uExplodeActive,o.vertexShader=o.vertexShader.replace("#include <common>",`#include <common>
uniform float uExplode;
uniform float uExplodeActive;
uniform int uExplodeTexW;
uniform highp sampler2D uExplodeTex;
${i.playgroundMode?"varying float vPgDiag;":""}`),i.playgroundMode&&(o.vertexShader=o.vertexShader.replace("#include <color_vertex>",`#if defined( USE_COLOR_ALPHA )
  vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
  vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
  vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
  vColor.xyz *= instanceColor.xyz;
#endif
vPgDiag = 0.0;
#ifdef USE_BATCHING_COLOR
  vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
  if ( batchingColor.r > 1.5 ) {
    vPgDiag = 2.0;
  } else if ( batchingColor.g > 1.5 ) {
    vPgDiag = 1.0;
  } else {
    vColor.xyz *= batchingColor.xyz;
  }
#endif`)),o.vertexShader=o.vertexShader.replace("#include <project_vertex>",`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
  mvPosition = batchingMatrix * mvPosition;
  if ( uExplodeActive > 0.5 && uExplode > 0.0001 ) {
    int eIdx = int( getIndirectIndex( gl_DrawID ) );
    int ex = eIdx % uExplodeTexW;
    int ey = eIdx / uExplodeTexW;
    mvPosition.xyz += texelFetch( uExplodeTex, ivec2( ex, ey ), 0 ).xyz * uExplode;
  }
#endif
#ifdef USE_INSTANCING
  mvPosition = instanceMatrix * mvPosition;
  if ( uExplodeActive > 0.5 && uExplode > 0.0001 ) {
    int eIdx = gl_InstanceID;
    int ex = eIdx % uExplodeTexW;
    int ey = eIdx / uExplodeTexW;
    mvPosition.xyz += texelFetch( uExplodeTex, ivec2( ex, ey ), 0 ).xyz * uExplode;
  }
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`),i.playgroundMode&&(o.fragmentShader=o.fragmentShader.replace("#include <common>",`#include <common>
varying float vPgDiag;`)),o.fragmentShader=o.fragmentShader.replace("#include <color_fragment>",`float vMatFinish = ${a};
#if defined( USE_COLOR_ALPHA )
  diffuseColor.rgb *= vColor.rgb;
  vMatFinish = vColor.a;
#elif defined( USE_COLOR )
  diffuseColor.rgb *= vColor.rgb;
#endif`);const l=`	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;`,h=`	vec2 muv = clamp( normal.xy * 0.485 + 0.5, 0.01, 0.99 );
	#ifdef USE_MATCAP
		${i.dualAtlas?`float atlasU = muv.x * 0.492 + 0.004 + step( 0.5, vMatFinish ) * 0.5;
		vec4 matcapColor = texture2D( matcap, vec2( atlasU, muv.y ) );`:"vec4 matcapColor = texture2D( matcap, muv );"}
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, muv.y ) ), 1.0 );
	#endif
	float rimEdge = ${i.enableRim?"mix( 0.78, 1.0, smoothstep( 0.04, 0.34, abs( normal.z ) ) )":"1.0"};
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb * rimEdge;
${i.playgroundMode?`	if ( vPgDiag > 1.5 ) {
		outgoingLight = vec3( 0.98, 0.14, 0.14 ) * ( 0.46 + 0.64 * matcapColor.rgb ) * rimEdge;
	} else if ( vPgDiag > 0.5 ) {
		outgoingLight = vec3( 0.98, 0.68, 0.08 ) * ( 0.44 + 0.64 * matcapColor.rgb ) * rimEdge;
	}`:""}`;o.fragmentShader=o.fragmentShader.replace(l,h)},s}acquirePlaygroundMatcapMaterial(e){const t=`pg_hyper_mat:${e}`,i=this.materials.get(t);if(i)return i.refCount++,i.resource;const s=[];let r;if(e==="wireframe")r=new Bs({color:1981066,wireframe:!0,transparent:!0,opacity:.62,toneMapped:!1});else{const a=this.acquireTexture("matcap_studio_dual"),o=this.acquireTexture("lite_explode_dummy");s.push("matcap_studio_dual","lite_explode_dummy");const l=e==="xray",h=e==="solid_glass",u=new Ve(l?9684477:16777215).multiplyScalar(l?1.25:1.48),d=new ka({color:u,matcap:a,vertexColors:!l,transparent:l||h,opacity:l?.34:h?.42:1,depthWrite:!l&&!h,side:l?Ht:$t,toneMapped:!1});vn.patchLiteMatcapMaterial(d,o,{dualAtlas:!0,defaultFinish:l?0:1,enableRim:!l&&!h,playgroundMode:!0}),r=d}return r.userData.__cacheKey=t,this.materials.set(t,{resource:r,refCount:1,depTextures:s}),r}acquireHeroMaterial(e,t,i,s="solid",r=[],a=0){if(s!=="solid")return this.acquireMaterial(t.bucket,i,s,r,!1,a);const o=i==="standard_lite"&&a>0?`:p${a}`:"",l=`hero:${e}:${i}:${s}${o}`,h=r.length>0?Ht:$t,u=this.materials.get(l);if(u)return u.refCount++,u.resource.clippingPlanes=r,u.resource.userData?.__managedSide&&u.resource.side!==h&&(u.resource.side=h,u.resource.needsUpdate=!0),u.resource;const d=ch[t.bucket],p=`herotex:${e}:${i}`,f=this.acquireHeroTexture(e,t,i),x=[p],v=t.metalness??d.metalness,_=t.roughness??d.roughness,m=t.transparent??!!d.transparent,M=t.opacity??d.opacity??1,b=t.depthWrite??!m,y={color:t.baseColor??16777215,map:f,clippingPlanes:r,clipShadows:i==="ultra",side:h,transparent:m,opacity:M,depthWrite:b,emissive:t.emissive??d.emissive??0,emissiveIntensity:t.emissiveIntensity??d.emissiveIntensity??0};let I;if(i==="standard_lite"){const A="matcap_studio_dual",P=this.acquireTexture(A),L=this.acquireTexture("lite_explode_dummy");x.push(A,"lite_explode_dummy");const E=new Ve(y.color).multiplyScalar(1.42),S=new ka({color:E,map:f,matcap:P,clippingPlanes:r,side:h,transparent:m,opacity:M,depthWrite:b,toneMapped:!1});vn.patchLiteMatcapMaterial(S,L,{dualAtlas:!0,defaultFinish:d.stdLambert&&!m?0:1,enableRim:!m,playgroundMode:!1}),I=S}else if(i==="standard")if(d.stdLambert&&!m)I=new Sr(y);else{const A=vn.computeStdPhongProps(v,_,m);I=new _c({...y,specular:A.specular,shininess:A.shininess})}else i==="ultra"&&d.ultraPhysical?I=new gc({...y,metalness:v,roughness:_,clearcoat:d.ultraPhysical.clearcoat,clearcoatRoughness:d.ultraPhysical.clearcoatRoughness,iridescence:d.ultraPhysical.iridescence??0,iridescenceIOR:d.ultraPhysical.iridescenceIOR??1.3,envMapIntensity:1.34}):I=new Ko({...y,metalness:v,roughness:_,envMapIntensity:i==="ultra"?1.16:.95});return I.userData.__cacheKey=l,I.userData.__materialBucket=t.bucket,I.userData.__heroKey=e,I.userData.__managedSide=!0,this.materials.set(l,{resource:I,refCount:1,depTextures:x}),I}acquireLineMaterial(e,t){const i=`line:${e}`,s=this.materials.get(i);if(s)return s.refCount++,s.resource.clippingPlanes=t.clippingPlanes??[],s.resource;const r=t.dashed?new Qf({color:t.color,dashSize:t.dashSize??1.4,gapSize:t.gapSize??.9,transparent:!0,opacity:t.opacity,vertexColors:t.vertexColors??!1,clippingPlanes:t.clippingPlanes??[]}):new ia({color:t.color,transparent:!0,opacity:t.opacity,vertexColors:t.vertexColors??!1,clippingPlanes:t.clippingPlanes??[]});return r.userData.__cacheKey=i,this.materials.set(i,{resource:r,refCount:1}),r}acquireBasicMaterial(e,t){const i=`basic:${e}`,s=this.materials.get(i);if(s)return s.refCount++,s.resource.clippingPlanes=t.clippingPlanes??[],s.resource;const r=new Bs({color:t.color,transparent:t.transparent??!1,opacity:t.opacity??1,side:t.side??$t,depthWrite:t.depthWrite??!(t.transparent??!1),clippingPlanes:t.clippingPlanes??[]});return r.userData.__cacheKey=i,this.materials.set(i,{resource:r,refCount:1}),r}acquireShadowMaterial(e,t={}){const i=`shadow:${e}`,s=this.materials.get(i);if(s)return s.refCount++,s.resource;const r=new Zf({color:t.color??988970,opacity:t.opacity??.16,transparent:!0,depthWrite:!1});return r.userData.__cacheKey=i,this.materials.set(i,{resource:r,refCount:1}),r}acquirePointsMaterial(e,t){const i=`points:${e}`,s=this.materials.get(i);if(s)return s.refCount++,s.resource.clippingPlanes=t.clippingPlanes??[],s.resource;const r=new gf({color:t.color,size:t.size,transparent:t.transparent??!0,opacity:t.opacity??.9,vertexColors:t.vertexColors??!1,clippingPlanes:t.clippingPlanes??[]});return r.userData.__cacheKey=i,this.materials.set(i,{resource:r,refCount:1}),r}releaseMaterial(e){const t=this.materials.get(e);if(!t)return!1;if(t.refCount--,t.refCount<=0){if(t.depTextures)for(let i=0;i<t.depTextures.length;i++)this.releaseTexture(t.depTextures[i]);return t.resource.dispose(),this.materials.delete(e),!0}return!1}releaseMaterialInstance(e){const t=e.userData?.__cacheKey;return t&&this.materials.has(t)?this.releaseMaterial(t):!1}releaseGeometryInstance(e){const t=e.userData?.__cacheKey;return t&&this.geometries.has(t)?this.releaseGeometry(t):!1}hasMaterial(e){return this.materials.has(e)}hasGeometry(e){return this.geometries.has(e)}updateClippingPlanes(e){const t=e.length>0?Ht:$t;for(const i of this.materials.values()){const s=i.resource;s.clippingPlanes=e,s.userData?.__managedSide&&s.side!==t&&(s.side=t,s.needsUpdate=!0)}}warmupShaders(e,t,i){const s=typeof performance<"u"?performance.now():0;return e.compile(t,i),(typeof performance<"u"?performance.now():0)-s}getStats(){let e=0;for(const t of this.materials.values())e+=t.refCount;for(const t of this.geometries.values())e+=t.refCount;for(const t of this.textures.values())e+=t.refCount;return{materials:this.materials.size,geometries:this.geometries.size,textures:this.textures.size,totalRefs:e,activeMaterialKeys:Array.from(this.materials.keys()),activeGeometryKeys:Array.from(this.geometries.keys()),activeTextureKeys:Array.from(this.textures.keys())}}disposeAll(){for(const e of this.materials.values())e.resource.dispose();this.materials.clear();for(const e of this.geometries.values())e.resource.dispose();this.geometries.clear();for(const e of this.textures.values())e.resource.dispose();this.textures.clear()}}const dn=new T,Ur=new T;class gx{renderer;container;clippingPlane;callbacks;scene;lightGroup;cache=new vn;raycaster=new px(33.3);vramMonitor=new lx;perfHud;active=!1;ready=!1;activeUnitId=null;activationToken=0;activeUnit=null;buildResult=null;liteProxyUnit=null;liteProxyBuildResult=null;ultraMotionProxyActive=!1;partById=new Map;studioEnvRenderTarget=null;ultraKeyLight=null;ultraShadowCatcher=null;savedExternalPixelRatio=1;quality="ultra";renderMode="solid";explodeFactor=0;physicsActive=!1;subView=0;integratedMode=!1;selectedId=null;hoveredId=null;hiddenIds=new Set;isolatedId=null;lastDrawCalls=0;lastTriangles=0;lastFrameTimeMs=0;avgFrameTimeMs=0;frameSampleCount=0;shaderWarmupMs=0;isIdle=!0;contextLost=!1;contextLostRecoveryCount=0;constructor(e,t,i,s){this.renderer=e,this.container=t,this.clippingPlane=i,this.callbacks=s,this.scene=new af,this.scene.background=new Ve(16777215),this.scene.matrixAutoUpdate=!1,this.scene.updateMatrix(),this.lightGroup=new Ps,this.lightGroup.name="unit-v2-studio-lights",this.lightGroup.matrixAutoUpdate=!1,this.lightGroup.updateMatrix(),this.scene.add(this.lightGroup);const a=(typeof window<"u"?new URLSearchParams(window.location.search):null)?.get("perfhud")==="1";this.perfHud=new cx(t,a)}isActive(){return this.active}isReady(){return this.active&&this.ready}getActiveUnitId(){return this.activeUnitId}getQuality(){return this.quality}getParts(){return this.buildResult?this.activeUnit?.getActiveParts?this.activeUnit.getActiveParts():this.buildResult.parts:[]}getAllBuiltParts(){return this.buildResult?this.buildResult.parts:[]}getPartById(e){return this.partById.get(e)??null}isPartCulledBySubView(e){return this.activeUnit?.isPartCulledBySubView?.(e)??!1}needsContinuousAnimation(e){return!1}isUltraMotionProxyActive(){return this.ultraMotionProxyActive}setUltraMotionProxyActive(e){return this.quality!=="ultra"||!this.ready||!this.buildResult||!this.liteProxyBuildResult?(this.ultraMotionProxyActive=!1,!1):e===this.ultraMotionProxyActive?!1:(this.ultraMotionProxyActive=e,e?(this.buildResult.rootGroup.visible=!1,this.liteProxyBuildResult.rootGroup.visible=!0,this.lightGroup.visible=!1,this.scene.environment=null,this.renderer.shadowMap.enabled=!1):(this.liteProxyBuildResult.rootGroup.visible=!1,this.buildResult.rootGroup.visible=!0,this.lightGroup.visible=!0,this.scene.environment=this.studioEnvRenderTarget?.texture??null,this.renderer.shadowMap.enabled=Gr.ultra.shadowsEnabled),!0)}getRaycastIndex(){return this.buildResult?this.buildResult.raycastIndex:null}getPartWorldBox(e,t){const i=this.buildResult?.raycastIndex;if(!i)return!1;const s=i.partBoundsById.get(e);return!s||s.worldBox.isEmpty()?!1:(t.copy(s.worldBox),!0)}setupStudioLighting(e){this.teardownStudioLighting();const t=Gr[e];if(e==="standard_lite"){this.scene.environment=null,this.studioEnvRenderTarget=null;return}const i=e==="standard",s=e==="ultra",r=new ep(16777215,i?15660026:s?14871286:15594234,i?2.85:s?.92:1.08);r.position.set(0,80,0),r.matrixAutoUpdate=!1,r.updateMatrix();const a=new Ga(s?16776696:16777215,i?2.05:s?2.28:1.78);if(a.position.set(-72,112,68),a.matrixAutoUpdate=!1,a.updateMatrix(),a.target.matrixAutoUpdate=!1,a.target.updateMatrix(),s&&t.shadowsEnabled){const h=this.renderer.capabilities.maxTextureSize||2048;let u=!1;try{const v=this.renderer.getContext(),_=v.getExtension("WEBGL_debug_renderer_info"),m=String(_?v.getParameter(_.UNMASKED_RENDERER_WEBGL):v.getParameter(v.RENDERER)||"");u=/SwiftShader|llvmpipe|Software|Mesa OffScreen/i.test(m)}catch{u=!1}const d=u?Math.min(2048,h):Math.min(4096,h>=4096?4096:2048);a.castShadow=!0,a.shadow.mapSize.set(d,d),a.shadow.bias=-28e-5,a.shadow.normalBias=.05,a.shadow.radius=2.4,this.ultraKeyLight=a;const p=this.cache.acquireGeometry("ultra:shadow-catcher-plane",()=>{const v=new Xs(1,1);return v.rotateX(-Math.PI/2),v}),f=this.cache.acquireShadowMaterial("ultra-ground",{color:988970,opacity:.18}),x=new Ct(p,f);x.name="ultra-studio-shadow-catcher",x.receiveShadow=!0,x.castShadow=!1,x.matrixAutoUpdate=!1,x.updateMatrix(),x.visible=this.renderMode==="solid",this.ultraShadowCatcher=x,this.lightGroup.add(x)}const o=new Ga(s?15463679:16054527,i?1.45:s?.84:.92);o.position.set(66,24,86),o.matrixAutoUpdate=!1,o.updateMatrix();const l=new Ga(s?14412542:15660799,i?1.35:s?1.48:1.02);if(l.position.set(82,48,-84),l.matrixAutoUpdate=!1,l.updateMatrix(),this.lightGroup.add(r,a,a.target,o,l),this.lightGroup.visible=!0,this.lightGroup.updateMatrixWorld(!0),t.enableStudioEnv){const h=s?"studio_env_ultra":"studio_env",u=this.cache.acquireTexture(h),d=new jo(this.renderer),p=d.fromEquirectangular(u);d.dispose(),this.cache.releaseTexture(h),this.studioEnvRenderTarget=p,this.scene.environment=p.texture}else this.scene.environment=null,this.studioEnvRenderTarget=null}fitUltraShadowRig(){if(this.quality!=="ultra"||!this.ultraKeyLight)return;const e=this.buildResult?.raycastIndex.unitWorldBox;if(!e||e.isEmpty())return;e.getCenter(dn),e.getSize(Ur);const t=Math.max(12,Math.hypot(Ur.x,Ur.y,Ur.z)*.56),i=this.ultraKeyLight;i.target.position.copy(dn),i.target.updateMatrix(),i.position.set(dn.x-t*1.15,dn.y+t*1.85,dn.z+t*1.05),i.updateMatrix();const s=i.shadow.camera,r=t*1.28;if(s.left=-r,s.right=r,s.top=r,s.bottom=-r,s.near=Math.max(1,t*.25),s.far=t*5.2,s.updateProjectionMatrix(),this.ultraShadowCatcher){const a=Math.max(60,t*4.8);this.ultraShadowCatcher.position.set(dn.x,e.min.y-.18,dn.z),this.ultraShadowCatcher.scale.set(a,1,a),this.ultraShadowCatcher.visible=this.renderMode==="solid",this.ultraShadowCatcher.updateMatrix()}this.lightGroup.updateMatrixWorld(!0),this.renderer.shadowMap.needsUpdate=!0}teardownStudioLighting(){this.ultraKeyLight?.shadow?.map&&(this.ultraKeyLight.shadow.map.dispose(),this.ultraKeyLight.shadow.map=null),this.ultraKeyLight=null,this.ultraShadowCatcher=null,this.lightGroup.children.length>0&&ox(this.lightGroup,this.cache,!1),this.studioEnvRenderTarget&&(this.scene.environment=null,this.studioEnvRenderTarget.dispose(),this.studioEnvRenderTarget=null)}applyQualityRendererCaps(e){const t=Gr[e];this.renderer.shadowMap.enabled=t.shadowsEnabled&&!this.ultraMotionProxyActive,t.shadowsEnabled?(this.renderer.shadowMap.type=vh,this.renderer.shadowMap.autoUpdate=!1,this.renderer.shadowMap.needsUpdate=!0):this.renderer.shadowMap.autoUpdate=!1,this.renderer.toneMappingExposure=e==="ultra"?1.18:1.15;const i=typeof window<"u"&&window.devicePixelRatio||1,s=Math.min(i,t.maxPixelRatio);this.renderer.setPixelRatio(s);const r=Math.max(1,this.container.clientWidth),a=Math.max(1,this.container.clientHeight);this.renderer.setSize(r,a)}disposeActiveUnitResources(){this.ultraMotionProxyActive=!1,this.liteProxyUnit&&(this.liteProxyUnit.dispose(this.cache),this.liteProxyUnit=null),this.liteProxyBuildResult=null,this.activeUnit&&(this.activeUnit.dispose(this.cache),this.activeUnit=null),this.buildResult=null,this.partById.clear(),this.ready=!1,this.teardownStudioLighting(),this.lightGroup.visible=!0,this.renderer.renderLists.dispose()}async activate(e,t,i,s){const r=++this.activationToken;this.active?(this.disposeActiveUnitResources(),this.vramMonitor.verifyAfterDispose(this.renderer,this.cache),this.vramMonitor.captureBaseline(this.renderer)):(this.savedExternalPixelRatio=this.renderer.getPixelRatio(),this.vramMonitor.captureBaseline(this.renderer)),this.active=!0,this.ready=!1,this.ultraMotionProxyActive=!1,this.activeUnitId=e,this.quality=t,this.explodeFactor=s.explode,this.renderMode=s.renderMode,this.physicsActive=s.physicsActive,this.subView=s.subView??(e==="lens"?1:0),this.integratedMode=s.integratedMode??(e==="integrated"||e==="camera_body"),this.selectedId=null,this.hoveredId=null,this.hiddenIds=new Set,this.isolatedId=null,this.frameSampleCount=0,this.avgFrameTimeMs=0,this.perfHud.setModeVisible(!0),this.applyQualityRendererCaps(t),this.setupStudioLighting(t);try{const o=await Jc(e);if(r!==this.activationToken||!this.active)return;const l=s.sectionActive?[this.clippingPlane]:[],h=await o.build(t,this.cache,{frameBudgetMs:14,clippingPlanes:l,subView:this.subView,integratedMode:this.integratedMode,isAborted:()=>r!==this.activationToken||!this.active});if(r!==this.activationToken||!this.active){o.dispose(this.cache);return}let u=null,d=null;if(t==="ultra"){const p=await Jc(e);if(r!==this.activationToken||!this.active){o.dispose(this.cache);return}const f=await p.build("standard_lite",this.cache,{frameBudgetMs:14,clippingPlanes:l,subView:this.subView,integratedMode:this.integratedMode,isAborted:()=>r!==this.activationToken||!this.active});if(r!==this.activationToken||!this.active){p.dispose(this.cache),o.dispose(this.cache);return}u=p,d=f}this.activeUnit=o,this.buildResult=h,this.liteProxyUnit=u,this.liteProxyBuildResult=d,this.partById.clear();for(let p=0;p<h.parts.length;p++)this.partById.set(h.parts[p].id,h.parts[p]);this.scene.add(h.rootGroup),o.setClippingPlanes?.(l),o.setSubView?.(this.subView),o.updateExplode(this.explodeFactor,!0),o.setVisualState(this.selectedId,this.hoveredId,this.hiddenIds,this.isolatedId,this.renderMode),o.setPhysicsVisible?.(!1),o.updateExplodeGuides?.(this.explodeFactor,!0),u&&d&&(this.scene.add(d.rootGroup),u.setClippingPlanes?.(l),u.setSubView?.(this.subView),u.updateExplode(this.explodeFactor,!0),u.setVisualState(this.selectedId,this.hoveredId,this.hiddenIds,this.isolatedId,this.renderMode),u.setPhysicsVisible?.(!1),u.updateExplodeGuides?.(this.explodeFactor,!0),d.rootGroup.visible=!0),this.fitUltraShadowRig(),this.contextLost||(this.shaderWarmupMs=this.cache.warmupShaders(this.renderer,this.scene,i)),d&&(d.rootGroup.visible=!1),this.ready=!0,this.vramMonitor.recordActivePeak(this.renderer),this.callbacks.onBuildComplete(e,this.getParts()),this.callbacks.onRequestRender(),this.refreshHud(!0)}catch(o){r===this.activationToken&&this.active&&console.error(`[UnitV2Runtime:${e}] Unit build failed:`,o)}}deactivate(){if(this.activationToken++,!this.active)return this.vramMonitor.getLastVerification();this.active=!1,this.activeUnitId=null,this.perfHud.setModeVisible(!1),this.disposeActiveUnitResources();const e=this.vramMonitor.verifyAfterDispose(this.renderer,this.cache);this.renderer.setPixelRatio(this.savedExternalPixelRatio);const t=Math.max(1,this.container.clientWidth),i=Math.max(1,this.container.clientHeight);return this.renderer.setSize(t,i),e}async setQuality(e,t,i){if(!this.active||!this.activeUnitId){this.quality=e;return}if(this.quality===e&&this.ready)return;const s=this.activeUnitId,r=this.selectedId,a=this.hoveredId,o=new Set(this.hiddenIds),l=this.isolatedId,h=this.renderMode,u=this.explodeFactor,d=this.physicsActive,p=this.subView,f=this.integratedMode;await this.activate(s,e,t,{explode:u,renderMode:h,physicsActive:d,sectionActive:i,subView:p,integratedMode:f}),this.active&&this.ready&&this.activeUnit&&this.activeUnitId===s&&(this.selectedId=r,this.hoveredId=a,this.hiddenIds=o,this.isolatedId=l,this.activeUnit.setVisualState(this.selectedId,this.hoveredId,this.hiddenIds,this.isolatedId,this.renderMode),this.activeUnit.updateExplode(this.explodeFactor,!0),this.activeUnit.updateExplodeGuides?.(this.explodeFactor,!0),this.liteProxyUnit&&(this.liteProxyUnit.setVisualState(this.selectedId,this.hoveredId,this.hiddenIds,this.isolatedId,this.renderMode),this.liteProxyUnit.updateExplode(this.explodeFactor,!0),this.liteProxyUnit.updateExplodeGuides?.(this.explodeFactor,!0)),this.fitUltraShadowRig(),this.callbacks.onRequestRender(),this.refreshHud(!0))}setSubView(e){this.subView=e,!(!this.activeUnit||!this.ready)&&(this.activeUnit.setSubView?.(e),this.activeUnit.updateExplodeGuides?.(this.explodeFactor,!0),this.liteProxyUnit&&(this.liteProxyUnit.setSubView?.(e),this.liteProxyUnit.updateExplodeGuides?.(this.explodeFactor,!0)),this.fitUltraShadowRig(),this.callbacks.onRequestRender(),this.refreshHud(!0))}syncExplode(e,t=!1){if(this.explodeFactor=e,!this.activeUnit||!this.ready)return!1;const i=this.activeUnit.updateExplode(e,t);return this.liteProxyUnit&&this.liteProxyUnit.updateExplode(e,t),i&&(this.activeUnit.updateExplodeGuides?.(e,!0),this.liteProxyUnit&&this.liteProxyUnit.updateExplodeGuides?.(e,!0),this.fitUltraShadowRig()),i}syncVisualState(e,t,i,s,r){const a=this.isolatedId!==s||this.renderMode!==r||this.hiddenIds.size!==i.size||this.hiddenIds!==i;this.selectedId=e,this.hoveredId=t,this.hiddenIds=i,this.isolatedId=s,this.renderMode=r,!(!this.activeUnit||!this.ready)&&(this.activeUnit.setVisualState(e,t,i,s,r),this.liteProxyUnit&&this.liteProxyUnit.setVisualState(e,t,i,s,r),a&&(this.explodeFactor>=.02&&(this.activeUnit.updateExplodeGuides?.(this.explodeFactor,!0),this.liteProxyUnit&&this.liteProxyUnit.updateExplodeGuides?.(this.explodeFactor,!0)),this.quality==="ultra"&&this.fitUltraShadowRig()))}syncSectionPlane(e){if(!this.activeUnit||!this.ready)return;const t=e?[this.clippingPlane]:[];this.activeUnit.setClippingPlanes?.(t),this.liteProxyUnit&&this.liteProxyUnit.setClippingPlanes?.(t),this.quality==="ultra"&&(this.renderer.shadowMap.needsUpdate=!0)}syncPhysicsActive(e){this.physicsActive=e,!(!this.activeUnit||!this.ready)&&(this.activeUnit.setPhysicsVisible?.(!1),this.liteProxyUnit&&this.liteProxyUnit.setPhysicsVisible?.(!1))}stepPhysics(e,t=.016){return!1}handleResize(){this.active&&(this.applyQualityRendererCaps(this.quality),this.refreshHud(!0))}setCameraDragging(e){this.raycaster.setCameraDragging(e)}pickHover(e,t,i,s){return this.raycaster.pickHover(e,t,this.buildResult?.raycastIndex??null,r=>i(r)||this.isPartCulledBySubView(r),s)}pickClick(e,t,i,s){return this.raycaster.pickClick(e,t,this.buildResult?.raycastIndex??null,r=>i(r)||this.isPartCulledBySubView(r),s)}render(e){if(!this.active||!this.ready||this.contextLost)return;this.isIdle=!1;const t=typeof performance<"u"?performance.now():0;this.renderer.render(this.scene,e);const i=typeof performance<"u"?performance.now():0;this.lastFrameTimeMs=i-t,this.frameSampleCount++,this.frameSampleCount===1||this.frameSampleCount<=4&&this.avgFrameTimeMs>this.lastFrameTimeMs*10?this.avgFrameTimeMs=this.lastFrameTimeMs:this.avgFrameTimeMs=this.avgFrameTimeMs*.8+this.lastFrameTimeMs*.2,this.lastDrawCalls=this.renderer.info.render.calls,this.lastTriangles=this.renderer.info.render.triangles,this.vramMonitor.recordActivePeak(this.renderer),this.refreshHud(!1)}markIdle(){!this.active||this.isIdle||(this.isIdle=!0,this.refreshHud(!0))}handleContextLost(){this.contextLost=!0}async handleContextRestored(e,t){this.contextLost=!1,this.contextLostRecoveryCount++,!(!this.active||!this.activeUnitId)&&(this.quality="standard",this.callbacks.onQualityFallback("standard"),await this.activate(this.activeUnitId,"standard",e,{explode:this.explodeFactor,renderMode:this.renderMode,physicsActive:this.physicsActive,sectionActive:t,subView:this.subView,integratedMode:this.integratedMode}))}togglePerfHud(){const e=this.perfHud.toggle();return e&&this.refreshHud(!0),e}setPerfHudVisible(e){this.perfHud.setExpanded(e),e&&this.refreshHud(!0)}getDiagnostics(){const e=this.renderer.info;return{unitId:this.activeUnitId,active:this.active,ready:this.ready,quality:this.quality,pixelRatio:this.renderer.getPixelRatio(),idle:this.isIdle,drawCalls:this.lastDrawCalls,triangles:this.lastTriangles,geometries:e.memory.geometries,textures:e.memory.textures,frameTimeMs:this.lastFrameTimeMs,avgFrameTimeMs:this.avgFrameTimeMs,shaderWarmupMs:this.shaderWarmupMs,buildStats:this.buildResult?.stats??null,vramCheck:this.vramMonitor.getLastVerification(),vramSwitchCount:this.vramMonitor.getSwitchCount(),cacheStats:this.cache.getStats(),raycastDiagnostics:this.raycaster.getDiagnostics(),contextLostRecoveryCount:this.contextLostRecoveryCount,renderFrameCount:this.frameSampleCount,motionProxyActive:this.ultraMotionProxyActive}}refreshHud(e){const t=this.renderer.info,i={unitId:this.activeUnitId??"v2",drawCalls:this.lastDrawCalls,maxDrawCallsBudget:this.activeUnit?.getMeta().maxDrawCallsBudget??100,triangles:this.lastTriangles,geometries:t.memory.geometries,textures:t.memory.textures,frameTimeMs:this.lastFrameTimeMs,avgFrameTimeMs:this.avgFrameTimeMs,quality:this.quality,pixelRatio:this.renderer.getPixelRatio(),idle:this.isIdle,shaderWarmupMs:this.shaderWarmupMs,buildStats:this.buildResult?.stats??null,vramCheck:this.vramMonitor.getLastVerification(),vramSwitchCount:this.vramMonitor.getSwitchCount()};this.perfHud.update(i,e)}dispose(){this.deactivate(),this.cache.disposeAll(),this.perfHud.dispose()}}const _x=new Set(["integrated","camera_body"]),Ja=new Zt,Qa=new T,Fr=new T;class xx{container;renderer;camera;controls;callbacks;v2Runtime;clippingPlane;pointer=new ue;pointerDownPos=new ue;hoverRaycastPending=!1;mode="welcome";lensSection=1;sensorFabVolume=0;miraiSubView=1;renderMode="solid";quality="ultra";sectionAxis="off";sectionValue=.5;targetExplode=0;currentExplode=0;physicsActive=!1;selectedPartId=null;hoveredPartId=null;isolatedPartId=null;hiddenPartIds=new Set;pendingSelectAfterHydrate=null;initialActivated=!1;camAnimActive=!1;camStartPos=new T;camEndPos=new T;camStartTarget=new T;camEndTarget=new T;camAnimT=0;wheelMotionFrames=0;prevCamPos=new T;prevCamQuat=new Qi;prevCamInitialized=!1;resizeObserver=null;boundHandleResize=()=>this.handleResize();contextLost=!1;contextLossCount=0;pageHidden=!1;recoveryOverlay;boundVisibilityChange=()=>this.handleVisibilityChange();boundContextLost=e=>this.handleContextLost(e);boundContextRestored=()=>this.handleContextRestored();clock=new sp;rafId=0;dirtyFrames=1;idleFrameStreak=0;disposed=!1;cachedDomRect=null;customSceneRenderer=null;constructor(e,t){this.container=e,this.callbacks=t,this.renderer=new G0({antialias:rs.antialias,alpha:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1}),this.renderer.debug.checkShaderErrors=!0,this.renderer.shadowMap.enabled=!1,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,rs.maxPixelRatio)),this.renderer.setSize(Math.max(1,e.clientWidth),Math.max(1,e.clientHeight)),this.renderer.setClearColor(16777215,1),this.renderer.localClippingEnabled=!0,this.renderer.toneMapping=yh,this.renderer.toneMappingExposure=1.15,this.renderer.outputColorSpace=Mt,e.appendChild(this.renderer.domElement),this.recoveryOverlay=document.createElement("div"),this.recoveryOverlay.className="gpu-recovery-overlay",this.recoveryOverlay.setAttribute("aria-hidden","true"),this.recoveryOverlay.innerHTML='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" opacity="0.22"/><path d="M21 12a9 9 0 0 0-9-9"/></svg>',e.appendChild(this.recoveryOverlay);const i=Math.max(1,e.clientWidth)/Math.max(1,e.clientHeight);this.camera=new ii(32,i,.85,4200),this.controls=new X0(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.065,this.controls.minDistance=7,this.controls.maxDistance=2600,this.controls.addEventListener("change",()=>{this.markDirty(2)}),this.clippingPlane=new Li(new T(-1,0,0),1e4),this.v2Runtime=new gx(this.renderer,this.container,this.clippingPlane,{onBuildComplete:s=>{if(this.mode===s&&(this.v2Runtime.setSubView(this.getActiveSubViewForMode(this.mode)),this.v2Runtime.syncExplode(this.currentExplode),this.v2Runtime.syncPhysicsActive(this.physicsActive),this.v2Runtime.syncSectionPlane(this.sectionAxis!=="off"),this.v2Runtime.syncVisualState(this.selectedPartId,this.hoveredPartId,this.hiddenPartIds,this.isolatedPartId,this.renderMode),this.markDirty(2)),this.callbacks.onVisibilityChanged(),this.mode===s&&this.pendingSelectAfterHydrate&&this.v2Runtime.getPartById(this.pendingSelectAfterHydrate.partId)){const r=this.pendingSelectAfterHydrate;this.pendingSelectAfterHydrate=null,this.selectPart(r.partId,r.focusCamera)}},onRequestRender:()=>{this.markDirty(2)},onQualityFallback:s=>{this.quality=s,this.callbacks.onQualityChanged?.(s)}}),this.setCameraPreset("iso",!0),this.bindEvents(),this.wakeLoop(),queueMicrotask(()=>{!this.disposed&&!this.initialActivated&&!this.customSceneRenderer&&this.activateCurrentMode()})}activateCurrentMode(){this.initialActivated=!0;const e=this.mode;this.v2Runtime.activate(e,this.quality,this.camera,{explode:this.currentExplode,renderMode:this.renderMode,physicsActive:this.physicsActive,sectionActive:this.sectionAxis!=="off",subView:this.getActiveSubViewForMode(e),integratedMode:e==="integrated"||e==="camera_body"})}isV2Mode(e=this.mode){return rx(e)}getV2Runtime(){return this.v2Runtime}getMiShoeV2Runtime(){return this.v2Runtime}getActiveSubViewForMode(e){return e==="lens"?mi.studioOpen?-1:this.lensSection:e==="sensor_fab"?this.sensorFabVolume:e==="mirai_2028"?this.miraiSubView:0}getTotalPartCount(){let e=0;for(const t of ax())_x.has(t.unitId)||(e+=t.declaredPartCount);return e}async ensureAllHydrated(){return this.getTotalPartCount()}getPartsForCurrentMode(){return this.v2Runtime.getParts()}getSelectedPart(){return this.selectedPartId?this.v2Runtime.getPartById(this.selectedPartId):null}isPartHidden(e){return this.isolatedPartId&&this.isolatedPartId!==e?!0:this.hiddenPartIds.has(e)}isIsolated(){return this.isolatedPartId!==null}hasAnyHidden(){return this.isolatedPartId!==null||this.hiddenPartIds.size>0}getMode(){return this.mode}getLensSection(){return this.lensSection}refreshVisibility(){this.v2Runtime.setSubView(this.getActiveSubViewForMode(this.mode)),this.v2Runtime.syncVisualState(this.selectedPartId,this.hoveredPartId,this.hiddenPartIds,this.isolatedPartId,this.renderMode),this.updateClippingPlane(),this.markDirty(2)}setLensSection(e,t=!1){const i=this.lensSection!==e;if(this.lensSection=e,this.mode==="lens"){if(!i&&!t){this.setCameraPreset("iso",!1);return}this.selectedPartId=null,this.hoveredPartId=null,this.isolatedPartId=null,this.hiddenPartIds.clear(),this.v2Runtime.setSubView(e),this.v2Runtime.syncVisualState(null,null,this.hiddenPartIds,null,this.renderMode),this.updateClippingPlane(),this.setCameraPreset("iso",t),this.callbacks.onSelectPart(null),this.callbacks.onHoverPart(null),this.callbacks.onVisibilityChanged()}}getSensorFabVolume(){return this.sensorFabVolume}setSensorFabVolume(e,t=!1){const i=this.sensorFabVolume!==e;if(this.sensorFabVolume=e,this.mode==="sensor_fab"){if(!i&&!t){this.setCameraPreset("iso",!1);return}this.selectedPartId=null,this.hoveredPartId=null,this.isolatedPartId=null,this.hiddenPartIds.clear(),this.v2Runtime.setSubView(e),this.v2Runtime.syncVisualState(null,null,this.hiddenPartIds,null,this.renderMode),this.updateClippingPlane(),this.setCameraPreset("iso",t),this.callbacks.onSelectPart(null),this.callbacks.onHoverPart(null),this.callbacks.onVisibilityChanged()}}getMiraiSubView(){return this.miraiSubView}setMiraiSubView(e,t=!1){const i=Math.max(1,Math.min(5,Math.round(e||1))),s=this.miraiSubView!==i;if(this.miraiSubView=i,this.mode==="mirai_2028"){if(!s&&!t){this.setCameraPreset("iso",!1);return}this.selectedPartId=null,this.hoveredPartId=null,this.isolatedPartId=null,this.hiddenPartIds.clear(),this.v2Runtime.setSubView(i),this.v2Runtime.syncVisualState(null,null,this.hiddenPartIds,null,this.renderMode),this.updateClippingPlane(),this.setCameraPreset("iso",t),this.callbacks.onSelectPart(null),this.callbacks.onHoverPart(null),this.callbacks.onVisibilityChanged()}}setMode(e,t=!1){this.mode===e&&this.initialActivated||(this.mode=e,e==="lens"&&(this.lensSection=1),this.selectedPartId=null,this.hoveredPartId=null,this.isolatedPartId=null,this.hiddenPartIds.clear(),this.pendingSelectAfterHydrate=null,this.updateClippingPlane(),this.setCameraPreset("iso",t),this.activateCurrentMode(),this.callbacks.onSelectPart(null),this.callbacks.onHoverPart(null),this.callbacks.onVisibilityChanged())}setExplode(e,t=!1){this.targetExplode=As.clamp(e,0,1),t&&(this.currentExplode=this.targetExplode,this.v2Runtime.syncExplode(this.currentExplode)),this.markDirty()}getExplode(){return this.targetExplode}setRenderMode(e){this.renderMode=e,this.applyVisibilityAndStyles()}setQuality(e){this.quality!==e&&(this.quality=e,this.initialActivated&&this.v2Runtime.setQuality(e,this.camera,this.sectionAxis!=="off"),this.callbacks.onQualityChanged?.(e),this.markDirty(2))}getQuality(){return this.quality}setSection(e,t){this.sectionAxis=e,typeof t=="number"&&(this.sectionValue=As.clamp(t,0,1)),this.updateClippingPlane()}setPhysicsActive(e){this.physicsActive=e,this.v2Runtime.syncPhysicsActive(e),this.markDirty()}selectPart(e,t=!0){if(e===null)this.pendingSelectAfterHydrate=null;else{if(!this.v2Runtime.getPartById(e)){this.v2Runtime.isReady()||(this.pendingSelectAfterHydrate={partId:e,focusCamera:t});return}if(this.v2Runtime.isPartCulledBySubView(e))return;this.pendingSelectAfterHydrate=null}if(e===this.selectedPartId)return;this.selectedPartId=e,e&&this.hiddenPartIds.has(e)&&this.hiddenPartIds.delete(e),e&&this.isolatedPartId&&this.isolatedPartId!==e&&(this.isolatedPartId=e),this.applyVisibilityAndStyles();const i=this.getSelectedPart();i&&t&&this.focusOnPart(i),this.callbacks.onSelectPart(i),this.callbacks.onVisibilityChanged()}setHoveredPartFromUI(e){this.hoveredPartId!==e&&(this.hoveredPartId=e,this.applyVisibilityAndStyles())}togglePartHidden(e){if(this.isolatedPartId){const t=this.isolatedPartId;this.isolatedPartId=null,e===t&&this.hiddenPartIds.add(e)}else this.hiddenPartIds.has(e)?this.hiddenPartIds.delete(e):this.hiddenPartIds.add(e);this.selectedPartId&&this.isPartHidden(this.selectedPartId)&&(this.selectedPartId=null,this.callbacks.onSelectPart(null)),this.applyVisibilityAndStyles(),this.callbacks.onVisibilityChanged()}toggleIsolateSelected(){this.selectedPartId&&(this.isolatedPartId===this.selectedPartId?this.isolatedPartId=null:(this.isolatedPartId=this.selectedPartId,this.hiddenPartIds.delete(this.selectedPartId)),this.applyVisibilityAndStyles(),this.callbacks.onVisibilityChanged())}resetAllVisibility(){this.isolatedPartId=null,this.hiddenPartIds.clear(),this.applyVisibilityAndStyles(),this.callbacks.onVisibilityChanged()}stepSelectedPart(e){const t=this.getPartsForCurrentMode();if(t.length===0)return;const i=t.findIndex(r=>r.id===this.selectedPartId),s=i<0?0:(i+e+t.length)%t.length;this.selectPart(t[s].id,!0)}setCameraPreset(e,t=!1){const i=this.targetExplode;let s,r;if(this.mode==="welcome"?(s=228+i*142,r=new T(0,1.5,0)):this.mode==="lens"?mi.studioOpen?(s=266+i*1080,r=new T(0+i*124,-2*(1-i),80+i*160)):this.lensSection===1?(s=186+i*625,r=new T(0+i*54,-1.5+i*10,47-i*102)):this.lensSection===2?(s=198+i*665,r=new T(0+i*64,-1-i*8,76.5+i*76)):(s=212+i*795,r=new T(0+i*96,-1+i*4,108+i*212)):this.mode==="camera_body"?(s=335+i*565,r=new T(-8-i*8,3+i*9,-10-i*18)):this.mode==="lcd"?(s=174+i*635,r=new T(14-i*4,-4+i*18,-32-i*14)):this.mode==="body"?(s=290+i*515,r=new T(-6+i*14,4-i*2,0+i*12)):this.mode==="mount"?(s=188+i*515,r=new T(2+i*8,-2-i*4,25+i*38)):this.mode==="evf"?(s=140+i*380,r=new T(1.5*(1-i)-i*14,38.6+i*1.5,-16.5+i*12)):this.mode==="mainboard"?(s=192+i*340,r=new T(-18*i,0+i*2,-22-i*4)):this.mode==="shutter"?(s=194+i*565,r=new T(6+i*14,-2.5+i*0,14+i*14)):this.mode==="integrated"?(s=390+i*1290,r=new T(-8-i*6,6+i*10,34+i*96)):this.mode==="sensor"?(s=168+i*475,r=new T(10*i,-2,-4-i*46)):this.mode==="battery"?(s=104+i*492,r=new T(i*4,i*-16,i*2)):this.mode==="cfexpress"?(s=136+i*475,r=new T(0,-.8+i*1.5,i*4)):this.mode==="bionz"?(s=122+i*245,r=new T(0,-1+i*1,0)):this.mode==="bionz_v2"?(s=142+i*320,r=new T(0,-2.6+i*1.2,0)):this.mode==="mirai_2028"?this.miraiSubView===3?(s=202+i*136,r=new T(0,i*2,i*2)):this.miraiSubView===4?(s=148+i*168,r=new T(i*2,.2+i*5,-1-i*2.5)):this.miraiSubView===5?(s=158+i*195,r=new T(0,i*3,1.5-i*3)):(s=166+i*185,r=new T(i*3+(1-i)*3.5,.2+i*2.5,i*1.5)):this.mode==="micro_v2"?(s=114+i*270,r=new T(0,-1-i*2,0)):this.mode==="mishoe"?(s=114+i*165,r=new T(0,-1.5-i*2.5,2.5+i*4)):this.mode==="mic"?(s=94+i*336,r=new T(0,1.5-i*2.5,.5+i*1.5)):this.mode==="sensor_fab"?this.sensorFabVolume===5?(s=248+i*238,r=new T(0,-1+i*1.5,2)):this.sensorFabVolume===4?(s=252+i*240,r=new T(0,-1.5+i*1.5,6.5)):this.sensorFabVolume===3?(s=248+i*238,r=new T(0,-1.5+i*1.5,6.5)):this.sensorFabVolume===2?(s=228+i*228,r=new T(0,2+i*1.5,.5)):(s=212+i*220,r=new T(0,1.5+i*2.5,-2.5)):this.mode==="drybox"?(s=242+i*212,r=new T(0,-3.5,-2*i)):(s=96+i*235,r=new T(20*i,1.5*i,-3-i*16)),this.mode!=="welcome"&&(s*=As.lerp(.7,.86,i)),this.camera.aspect<1){const l=this.mode==="welcome"?2.72:1.88;s*=Math.min(l,(this.mode==="welcome"?1.24:.92)/Math.max(this.camera.aspect,.44))}let a;if(this.mode==="welcome")switch(e){case"front":a=new T(0,2,s);break;case"side":a=new T(-s*.96,s*.08,s*.24);break;case"back":a=new T(s*.16,s*.12,-s*.98);break;case"iso":default:a=new T(-s*.16,s*.13,s*.98);break}else if(this.mode==="evf"){const l=i>.25?-.88:-.78,h=i>.25?.17:.24,u=i>.25?-.44:-.58;switch(e){case"front":a=new T(0,2,-s);break;case"side":a=new T(-s*1.05,4,0);break;case"back":a=new T(s*.65,s*.28,s*.72);break;case"iso":default:a=new T(s*l,s*h,s*u);break}}else if(this.mode==="mainboard"||this.mode==="lcd"){const l=this.mode==="lcd"?i>.25?.56:.42:i>.25?-.68:-.44,h=this.mode==="lcd"?i>.25?-.78:-.86:i>.25?-.66:-.84;switch(e){case"front":a=new T(0,2,-s);break;case"side":a=new T(-s*1.04,8,0);break;case"back":a=new T(s*.52,s*.3,s*.8);break;case"iso":default:a=new T(s*l,s*.26,s*h);break}}else switch(e){case"front":a=new T(0,4,s);break;case"side":a=new T(-s*1.04,8,0);break;case"back":a=new T(-s*.42,s*.26,-s*.88);break;case"iso":default:if(this.mode==="integrated"){const l=i>.25?-.82:-.62,h=i>.25?.23:.27,u=i>.25?.52:.74;a=new T(s*l,s*h,s*u)}else if(this.mode==="camera_body"){const l=i>.25?-.78:-.62,h=i>.25?.24:.27,u=i>.25?.57:.74;a=new T(s*l,s*h,s*u)}else if(this.mode==="lens"){const l=i>.25?-.84:-.68,h=i>.25?.48:.69;a=new T(s*l,s*.25,s*h)}else if(this.mode==="body"){const l=i>.25?-.74:-.64,h=i>.25?.62:.72;a=new T(s*l,s*.28,s*h)}else if(this.mode==="mount"){const l=i>.25?.8:.58,h=i>.25?.56:.76;a=new T(s*l,s*.22,s*h)}else if(this.mode==="shutter")a=new T(s*.52,s*.28,s*.81);else if(this.mode==="sensor"){const l=i>.25?.82:.64,h=i>.25?.26:.38,u=i>.25?.51:.72;a=new T(s*l,s*h,s*u)}else if(this.mode==="battery"||this.mode==="cfexpress")a=new T(s*.58,s*.3,s*.76);else if(this.mode==="bionz")a=new T(s*.62,s*.46,s*.64);else if(this.mode==="bionz_v2")a=new T(s*.62,s*.36,s*.68);else if(this.mode==="mirai_2028")if(this.miraiSubView===3){const l=.56+i*.28,h=.32-i*.08,u=.76-i*.26;a=new T(s*l,s*h,s*u)}else if(this.miraiSubView===4)a=new T(s*.58,s*.42,s*.69);else if(this.miraiSubView===5){const l=.68+i*.14,h=.3-i*.06,u=.66-i*.16;a=new T(s*l,s*h,s*u)}else a=new T(s*.56,s*.44,s*.7);else this.mode==="micro_v2"?a=new T(s*.64,s*.34,s*.68):this.mode==="mishoe"?a=new T(s*.58,s*.42,s*.7):this.mode==="mic"?a=new T(-s*.5,s*.36,s*.78):this.mode==="sensor_fab"?a=new T(s*.38,s*.44,s*.81):this.mode==="drybox"?a=new T(s*.56,s*.24,s*.79):a=new T(s*.68,s*.44,s*.66);break}const o=r.clone().add(a);t?(this.camAnimActive=!1,this.camera.position.copy(o),this.controls.target.copy(r),this.controls.update(),this.prevCamPos.copy(this.camera.position),this.prevCamQuat.copy(this.camera.quaternion),this.prevCamInitialized=!0,this.wheelMotionFrames=0,this.v2Runtime.setUltraMotionProxyActive(!1),this.markDirty()):this.animateCameraTo(o,r)}focusSensorFabStage(e,t=!1){if(this.mode!=="sensor_fab")return;if(e==="overview"||e==="v1_overview"||e==="v2_overview"||e==="v3_overview"||e==="v4_overview"||e==="v5_overview"){this.setCameraPreset("iso",t);return}const i=this.targetExplode,s=this.camera.aspect<1?Math.min(2.05,1.04/Math.max(this.camera.aspect,.48)):1;let r,a;if(e==="phases"){const l=(155+i*145)*s;r=new T(0,2.2+i*12,2.5+i*5),a=new T(l*.14,l*.46,l*.88)}else if(e==="litho"){const l=(138+i*135)*s;r=new T(0,-11.5-i*26,2),a=new T(l*.22,l*.34,l*.91)}else if(e==="variants"){const l=(104+i*85)*s;r=new T(10+i*8,3.6+i*18,-24-i*24),a=new T(l*.16,l*.34,l*.92)}else if(e==="v1_photonics"){const l=(118+i*110)*s;r=new T(-19-i*14,2.8+i*12,9.5+i*14),a=new T(l*.16,l*.42,l*.89)}else if(e==="v1_archs"){const l=(122+i*95)*s;r=new T(2,3.6+i*16,-20-i*22),a=new T(l*.12,l*.34,l*.93)}else if(e==="v1_duel"){const l=(128+i*110)*s;r=new T(7+i*8,2.6+i*14,4+i*8),a=new T(l*.14,l*.42,l*.89)}else if(e==="v1_wall"){const l=(146+i*125)*s;r=new T(8+i*6,-8.5-i*18,9+i*12),a=new T(l*.18,l*.34,l*.92)}else if(e==="v2_refine"){const l=(138+i*105)*s;r=new T(0,4.2+i*10,-21.5-i*14),a=new T(l*.14,l*.34,l*.93)}else if(e==="v2_mcz"){const l=(118+i*98)*s;r=new T(-22-i*6,4.8+i*11,-2-i*2),a=new T(l*.16,l*.34,l*.93)}else if(e==="v2_wafer"){const l=(138+i*110)*s;r=new T(-4-i*4,3.2+i*10,10+i*8),a=new T(l*.15,l*.38,l*.91)}else if(e==="v2_epi_ship"){const l=(150+i*120)*s;r=new T(14+i*5,-4.5-i*4,14+i*12),a=new T(l*.16,l*.32,l*.93)}else if(e==="v3_tcad"){const l=(136+i*105)*s;r=new T(0,3.5+i*14,-29-i*16),a=new T(l*.14,l*.36,l*.92)}else if(e==="v3_layout"){const l=(140+i*108)*s;r=new T(0,3+i*11,-12-i*3),a=new T(l*.15,l*.38,l*.91)}else if(e==="v3_opc"){const l=(136+i*105)*s;r=new T(0,3.2+i*8,5+i*14),a=new T(l*.16,l*.36,l*.92)}else if(e==="v3_maskfab"){const l=(158+i*128)*s;r=new T(0,-6.2-i*18,33.5+i*14),a=new T(l*.18,l*.34,l*.92)}else if(e==="v4_sti_dti"){const l=(142+i*108)*s;r=new T(0,3.6+i*15,-29-i*16),a=new T(l*.14,l*.36,l*.92)}else if(e==="v4_ppd_mev"){const l=(146+i*112)*s;r=new T(0,3.4+i*12,-12-i*3),a=new T(l*.15,l*.38,l*.91)}else if(e==="v4_vtg_gate"){const l=(138+i*105)*s;r=new T(0,3.4+i*10,5+i*14),a=new T(l*.16,l*.36,l*.92)}else if(e==="v4_pin_sab"){const l=(158+i*125)*s;r=new T(0,-6.5-i*11,33.5+i*14),a=new T(l*.18,l*.34,l*.92)}else if(e==="v5_w_m1"){const l=(142+i*108)*s;r=new T(0,3.6+i*14,-29-i*15),a=new T(l*.14,l*.36,l*.92)}else if(e==="v5_m2_m4"){const l=(146+i*112)*s;r=new T(0,3.4+i*11,-12-i*3),a=new T(l*.15,l*.38,l*.91)}else if(e==="v5_m5_wat"){const l=(138+i*105)*s;r=new T(0,3.4+i*9,5+i*12),a=new T(l*.16,l*.36,l*.92)}else{const l=(144+i*112)*s;r=new T(0,-6.5-i*10,29+i*14),a=new T(l*.18,l*.34,l*.92)}const o=r.clone().add(a);t?(this.camAnimActive=!1,this.camera.position.copy(o),this.controls.target.copy(r),this.controls.update(),this.markDirty()):this.animateCameraTo(o,r)}focusOnPart(e){this.v2Runtime.getPartWorldBox(e.id,Ja)||Ja.setFromObject(e.group),Ja.getCenter(Qa),Fr.subVectors(this.camera.position,this.controls.target);const t=this.mode==="micro"||this.mode==="micro_v2"||this.mode==="bionz"||this.mode==="bionz_v2"||this.mode==="mirai_2028"||this.mode==="mishoe"||this.mode==="mic",i=this.mode==="battery"||this.mode==="cfexpress",s=this.mode==="sensor_fab",r=this.mode==="drybox",a=t?72:s?68:r?148:i?98:this.mode==="evf"?112:this.mode==="integrated"||this.mode==="camera_body"?280:168,o=t?34:s?28:r?48:i?38:this.mode==="evf"?44:56,l=Math.min(Fr.length(),a);Fr.setLength(Math.max(l,o));const h=Qa.clone().add(Fr);this.animateCameraTo(h,Qa.clone())}wakeLoop(){this.idleFrameStreak=0,this.rafId===0&&!this.disposed&&!this.contextLost&&!this.pageHidden&&(this.clock.getDelta(),this.rafId=requestAnimationFrame(this.animate))}animateCameraTo(e,t){this.camStartPos.copy(this.camera.position),this.camEndPos.copy(e),this.camStartTarget.copy(this.controls.target),this.camEndTarget.copy(t),this.camAnimT=0,this.camAnimActive=!0,this.wakeLoop()}markDirty(e=3){this.dirtyFrames=Math.max(this.dirtyFrames,e),this.wakeLoop()}requestRenderFrame(){this.markDirty(2)}frameLensForOpticsStudio(e=!1){const t=new T(0,-36,74),i=new T(-348,56,178);this.refreshVisibility(),e?(this.camAnimActive=!1,this.camera.position.copy(i),this.controls.target.copy(t),this.controls.update(),this.markDirty()):this.animateCameraTo(i,t)}handleResize(){const e=Math.max(1,this.container.clientWidth),t=Math.max(1,this.container.clientHeight);this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.v2Runtime.handleResize(),this.cachedDomRect=this.renderer.domElement.getBoundingClientRect(),this.markDirty()}updateClippingPlane(){if(this.sectionAxis==="off"){this.clippingPlane.normal.set(-1,0,0),this.clippingPlane.constant=1e4,this.v2Runtime.syncSectionPlane(!1),this.markDirty();return}let e=-48,t=48;this.mode==="micro"?(e=-13,t=13):this.mode==="micro_v2"?(e=-16,t=16):this.mode==="battery"||this.mode==="cfexpress"?(e=-30,t=30):this.mode==="bionz"?this.sectionAxis==="x"?(e=-48,t=48):(e=-16,t=18):this.mode==="bionz_v2"?this.sectionAxis==="x"?(e=-24,t=24):(e=-26,t=22):this.mode==="mirai_2028"?this.miraiSubView===3?(e=-38,t=38):this.miraiSubView===4?this.sectionAxis==="x"?(e=-38,t=38):(e=-10,t=12):this.miraiSubView===5?this.sectionAxis==="x"?(e=-28,t=28):(e=-22,t=22):this.sectionAxis==="x"?(e=-46,t=46):(e=-34,t=42):this.mode==="mishoe"?this.sectionAxis==="x"?(e=-32,t=32):(e=-15,t=12):this.mode==="mic"?this.sectionAxis==="x"?(e=-30,t=30):(e=-16,t=20):this.mode==="sensor_fab"?this.sectionAxis==="x"?(e=-54,t=54):(e=-18,t=24):this.mode==="drybox"?this.sectionAxis==="x"?(e=-30,t=30):(e=-55,t=55):this.mode==="lens"?(e=-46,t=46):this.mode==="lcd"?this.sectionAxis==="x"?(e=-34,t=50):(e=-34,t=22):this.mode==="body"||this.mode==="camera_body"||this.mode==="integrated"?this.sectionAxis==="x"?(e=-74,t=60):(e=-42,t=64):this.mode==="mount"?this.sectionAxis==="x"?(e=-50,t=50):(e=-44,t=46):this.mode==="evf"?this.sectionAxis==="x"?(e=-24,t=24):(e=18,t=60):this.mode==="mainboard"?this.sectionAxis==="x"?(e=-50,t=50):(e=-36,t=36):this.mode==="shutter"&&(this.sectionAxis==="x"?(e=-48,t=50):(e=-35,t=35));const i=As.lerp(e,t,this.sectionValue);this.sectionAxis==="x"?(this.clippingPlane.normal.set(-1,0,0),this.clippingPlane.constant=i):(this.clippingPlane.normal.set(0,-1,0),this.clippingPlane.constant=i),this.v2Runtime.syncSectionPlane(!0),this.markDirty()}applyVisibilityAndStyles(){this.v2Runtime.syncVisualState(this.selectedPartId,this.hoveredPartId,this.hiddenPartIds,this.isolatedPartId,this.renderMode),this.markDirty(2)}bindEvents(){const e=this.renderer.domElement;this.cachedDomRect=e.getBoundingClientRect(),this.controls.addEventListener("start",()=>{this.v2Runtime.setCameraDragging(!0),this.wakeLoop()}),this.controls.addEventListener("end",()=>{this.v2Runtime.setCameraDragging(!1),this.markDirty(2)}),e.addEventListener("pointerdown",t=>{this.customSceneRenderer||(this.pointerDownPos.set(t.clientX,t.clientY),this.camAnimActive=!1,this.markDirty())}),e.addEventListener("pointermove",t=>{if(this.customSceneRenderer||t.pointerType==="touch")return;const i=this.cachedDomRect??(this.cachedDomRect=e.getBoundingClientRect());i.width<=0||i.height<=0||(this.pointer.x=(t.clientX-i.left)/i.width*2-1,this.pointer.y=-((t.clientY-i.top)/i.height)*2+1,this.hoverRaycastPending=!0,this.wakeLoop())}),e.addEventListener("pointerleave",()=>{this.customSceneRenderer||(this.hoverRaycastPending=!1,this.hoveredPartId!==null&&(this.hoveredPartId=null,this.container.classList.remove("is-hovering"),this.applyVisibilityAndStyles(),this.callbacks.onHoverPart(null)))}),e.addEventListener("pointerup",t=>{if(this.customSceneRenderer||Math.hypot(t.clientX-this.pointerDownPos.x,t.clientY-this.pointerDownPos.y)>5)return;const s=this.cachedDomRect??(this.cachedDomRect=e.getBoundingClientRect());if(s.width<=0||s.height<=0)return;this.pointer.x=(t.clientX-s.left)/s.width*2-1,this.pointer.y=-((t.clientY-s.top)/s.height)*2+1;const r=this.v2Runtime.pickClick(this.pointer,this.camera,a=>this.isPartHidden(a),this.sectionAxis!=="off"?this.clippingPlane:null);r?this.selectPart(r,!0):this.selectedPartId&&this.selectPart(null,!1)}),e.addEventListener("wheel",()=>{this.customSceneRenderer||(this.wheelMotionFrames=2,this.v2Runtime.setUltraMotionProxyActive(!0)),this.markDirty(2)},{passive:!0}),e.addEventListener("touchstart",()=>this.wakeLoop(),{passive:!0}),e.addEventListener("webglcontextlost",this.boundContextLost,!1),e.addEventListener("webglcontextrestored",this.boundContextRestored,!1),document.addEventListener("visibilitychange",this.boundVisibilityChange),window.addEventListener("resize",this.boundHandleResize),document.addEventListener("fullscreenchange",this.boundHandleResize),typeof ResizeObserver<"u"&&(this.resizeObserver=new ResizeObserver(this.boundHandleResize),this.resizeObserver.observe(this.container))}getRenderer(){return this.renderer}getContainer(){return this.container}setCustomSceneRenderer(e){this.customSceneRenderer=e,this.controls.enabled=e===null,this.hoverRaycastPending=!1,this.container.classList.remove("is-hovering"),e!==null?this.v2Runtime.isActive()&&!this.v2Runtime.isReady()&&(this.v2Runtime.deactivate(),this.initialActivated=!1):(this.prevCamPos.copy(this.camera.position),this.prevCamQuat.copy(this.camera.quaternion),this.prevCamInitialized=!0,this.v2Runtime.setUltraMotionProxyActive(!1),this.v2Runtime.isActive()||this.activateCurrentMode()),this.markDirty(3)}handleContextLost(e){e.preventDefault(),this.contextLost=!0,this.contextLossCount++,this.v2Runtime.handleContextLost(),this.recoveryOverlay.classList.add("is-visible")}handleContextRestored(){this.contextLost=!1,this.recoveryOverlay.classList.remove("is-visible"),this.cachedDomRect=this.renderer.domElement.getBoundingClientRect(),this.v2Runtime.handleContextRestored(this.camera,this.sectionAxis!=="off"),this.markDirty(2)}handleVisibilityChange(){this.pageHidden=document.hidden,!this.pageHidden&&!this.contextLost&&(this.clock.getDelta(),this.markDirty(3))}getGpuStats(){const e=this.renderer.info,t=this.v2Runtime.getDiagnostics();return{profile:rs,quality:this.quality,ultraHealthy:!0,pixelRatio:this.renderer.getPixelRatio(),contextLost:this.contextLost,contextLossCount:this.contextLossCount,calls:t.drawCalls,triangles:t.triangles,lines:e.render.lines,geometries:e.memory.geometries,textures:e.memory.textures,programs:e.programs?e.programs.length:0,hydratedParts:t.ready?this.v2Runtime.getParts().length:0,totalParts:this.getTotalPartCount(),megaBatches:0,kinematicBones:0}}updateHoverFromRaycast(){const e=this.v2Runtime.pickHover(this.pointer,this.camera,i=>this.isPartHidden(i),this.sectionAxis!=="off"?this.clippingPlane:null);if(e.skipped)return;const t=e.partId;t!==this.hoveredPartId&&(this.hoveredPartId=t,this.container.classList.toggle("is-hovering",t!==null),this.applyVisibilityAndStyles(),this.callbacks.onHoverPart(t))}animate=()=>{if(this.rafId=0,this.disposed||this.contextLost||this.pageHidden)return;const e=Math.min(this.clock.getDelta(),.05);if(this.customSceneRenderer){const l=this.customSceneRenderer(this.renderer,e)===!0;this.dirtyFrames>0&&this.dirtyFrames--,(l||this.dirtyFrames>0)&&(this.rafId=requestAnimationFrame(this.animate));return}this.hoverRaycastPending&&(this.hoverRaycastPending=!1,this.updateHoverFromRaycast());let t=this.dirtyFrames>0;const i=this.targetExplode-this.currentExplode;if(Math.abs(i)>5e-4?(this.currentExplode+=i*Math.min(1,e*10),t=!0):this.currentExplode!==this.targetExplode&&(this.currentExplode=this.targetExplode,t=!0),this.camAnimActive){this.camAnimT=Math.min(1,this.camAnimT+e*2.8);const l=1-Math.pow(1-this.camAnimT,3);this.camera.position.lerpVectors(this.camStartPos,this.camEndPos,l),this.controls.target.lerpVectors(this.camStartTarget,this.camEndTarget,l),this.camAnimT>=1&&(this.camAnimActive=!1),t=!0}this.controls.update()&&(t=!0);let r=!1;if(this.prevCamInitialized){const l=this.camera.position.distanceToSquared(this.prevCamPos),h=Math.abs(this.camera.quaternion.dot(this.prevCamQuat));r=l>1e-6||h<.9999995}else this.prevCamInitialized=!0;this.prevCamPos.copy(this.camera.position),this.prevCamQuat.copy(this.camera.quaternion);const a=this.wheelMotionFrames>0;a&&this.wheelMotionFrames--;const o=this.camAnimActive||r||a;o?(this.v2Runtime.setUltraMotionProxyActive(!0),t=!0):this.v2Runtime.isUltraMotionProxyActive()&&(this.v2Runtime.setUltraMotionProxyActive(!1),t=!0),t?(this.idleFrameStreak=0,this.v2Runtime.syncExplode(this.currentExplode),this.v2Runtime.render(this.camera),this.dirtyFrames>0&&this.dirtyFrames--):this.idleFrameStreak++,t||o||this.v2Runtime.isUltraMotionProxyActive()||this.hoverRaycastPending||this.camAnimActive||this.dirtyFrames>0||this.idleFrameStreak<1?this.rafId=requestAnimationFrame(this.animate):this.v2Runtime.markIdle()};dispose(){this.disposed=!0,this.rafId!==0&&(cancelAnimationFrame(this.rafId),this.rafId=0);const e=this.renderer.domElement;e.removeEventListener("webglcontextlost",this.boundContextLost),e.removeEventListener("webglcontextrestored",this.boundContextRestored),document.removeEventListener("visibilitychange",this.boundVisibilityChange),window.removeEventListener("resize",this.boundHandleResize),document.removeEventListener("fullscreenchange",this.boundHandleResize),this.resizeObserver?.disconnect(),this.v2Runtime.dispose(),this.recoveryOverlay.remove(),this.controls.dispose(),this.renderer.dispose()}}const vx="http://www.w3.org/2000/svg";function $n(n,e="0 0 24 24"){const t=document.createElementNS(vx,"svg");return t.setAttribute("viewBox",e),t.setAttribute("aria-hidden","true"),t.innerHTML=n,t}const ht={welcome:'<path d="M12 3l2.4 5.2L20 10.5l-5.6 2.3L12 18l-2.4-5.2L4 10.5l5.6-2.3z"/><circle cx="19" cy="18" r="1.6"/>',completeCamera:'<path d="M3 9.5a2 2 0 0 1 2-2h2.2l1.6-2.5h6.4l1.6 2.5H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8z"/><circle cx="12" cy="13.5" r="3.6"/><circle cx="12" cy="13.5" r="1.2" fill="currentColor" stroke="none"/>',cameraBodyOnly:'<path d="M3 9.5a2 2 0 0 1 2-2h2.2l1.6-2.5h6.4l1.6 2.5H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8z"/><rect x="9.4" y="11.6" width="5.2" height="3.6" rx="0.6"/>',lens:'<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7.5 6.5c1.6 3.2 1.6 7.8 0 11"/><path d="M16.5 6.5c-1.6 3.2-1.6 7.8 0 11"/>',mount:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.8"/><circle cx="12" cy="5.5" r="1" fill="currentColor" stroke="none"/>',shutter:'<rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="9.5" x2="21" y2="9.5"/><line x1="3" y1="14.5" x2="21" y2="14.5"/>',sensor:'<rect x="4" y="6" width="16" height="12" rx="2"/><rect x="8" y="9" width="8" height="6" rx="0.8"/>',mainboard:'<rect x="3" y="4" width="18" height="16" rx="2"/><rect x="8.5" y="8.5" width="7" height="7" rx="1"/><line x1="8.5" y1="12" x2="5" y2="12"/><line x1="15.5" y1="12" x2="19" y2="12"/>',evf:'<path d="M5 17V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8z"/><circle cx="12" cy="12" r="3.2"/>',lcd:'<rect x="4" y="5" width="16" height="11" rx="1.6"/><path d="M9 19h6"/><path d="M12 16v3"/>',body:'<path d="M3 8.5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M7 6.5V5h10v1.5"/>',chip:'<rect x="6" y="6" width="12" height="12" rx="1.8"/><rect x="9.5" y="9.5" width="5" height="5" rx="0.5"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>',pixel:'<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>',fab:'<circle cx="12" cy="12" r="8"/><line x1="4.5" y1="12" x2="19.5" y2="12"/><line x1="12" y1="4.5" x2="12" y2="19.5"/><circle cx="12" cy="12" r="3"/>',battery:'<rect x="3" y="7" width="16" height="10" rx="2"/><line x1="21" y1="10" x2="21" y2="14"/><path d="M12 9.2l-1.8 3h2.4l-1.4 2.8"/>',card:'<path d="M6 3h9l4 4v14H6z"/><line x1="9" y1="8" x2="9" y2="11"/><line x1="12" y1="8" x2="12" y2="11"/><line x1="15" y1="8" x2="15" y2="11"/>',mishoe:'<path d="M4 17h16v2.5H4z"/><path d="M6 17V9h12v8"/><line x1="9" y1="12.5" x2="15" y2="12.5"/>',mic:'<rect x="9" y="3.5" width="6" height="10" rx="3"/><path d="M6 11a6 6 0 0 0 12 0"/><line x1="12" y1="17" x2="12" y2="20.5"/><line x1="8.5" y1="20.5" x2="15.5" y2="20.5"/>',drybox:'<rect x="4" y="3.5" width="16" height="17" rx="2"/><line x1="4" y1="12" x2="20" y2="12"/><circle cx="16.5" cy="7.5" r="1.2"/>',mirai:'<path d="M12 2.8l7.6 4.4v9.6L12 21.2l-7.6-4.4V7.2z"/><path d="M12 7.2l3.8 2.2v4.4L12 16l-3.8-2.2V9.4z"/><circle cx="12" cy="11.6" r="1.3" fill="currentColor" stroke="none"/>',playground:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/>',chevronDown:'<polyline points="6 9 12 15 18 9"/>',resetVis:'<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'},pu=[{heading:"イントロダクション",items:[{mode:"welcome",label:"ようこそ 3D立体",sub:"220パーツ実動作CNC光学装置",icon:ht.welcome}]},{heading:"Future History MIRAI 2028",items:[{mode:"mirai_2028",label:"FH MIRAI 2028",sub:"未来技術48選・精密3D 5体",icon:ht.mirai}]},{heading:"カメラ全体ビュー",items:[{mode:"integrated",label:"α7 IV 完成カメラ",sub:"レンズ装着・全統合",icon:ht.completeCamera},{mode:"camera_body",label:"カメラボディ全体",sub:"マウント開放・内部透視",icon:ht.cameraBodyOnly}]},{heading:"主要光学・メカユニット",items:[{mode:"lens",label:"50mm F1.2 GM",sub:"大口径単焦点レンズ",icon:ht.lens},{mode:"mount",label:"Eマウント機構",sub:"18mmフランジ・接点",icon:ht.mount},{mode:"shutter",label:"シャッター機構",sub:"フォーカルプレーン",icon:ht.shutter},{mode:"sensor",label:"CMOS & IBIS",sub:"33MP裏面照射・5軸",icon:ht.sensor},{mode:"mainboard",label:"メイン基板",sub:"HDI多層・高速I/O",icon:ht.mainboard},{mode:"evf",label:"EVFファインダー",sub:"368万ドットOLED",icon:ht.evf},{mode:"lcd",label:"背面液晶LCD",sub:"バリアングル機構",icon:ht.lcd},{mode:"body",label:"マグネシウム筐体",sub:"防塵防滴フレーム",icon:ht.body}]},{heading:"半導体・極超解剖",items:[{mode:"bionz",label:"BIONZ XR (V1)",sub:"画像処理SoC解剖",icon:ht.chip},{mode:"bionz_v2",label:"BIONZ XR (V2)",sub:"2nm GAA・裏面電源",icon:ht.chip},{mode:"micro",label:"ピクセル構造 (V1)",sub:"マイクロレンズ・PD",icon:ht.pixel},{mode:"micro_v2",label:"ピクセル構造 (V2)",sub:"原子・ナノ構造拡大",icon:ht.pixel},{mode:"sensor_fab",label:"センサー製造工程",sub:"全6巻・2,110工程",icon:ht.fab}]},{heading:"電源・周辺・保管",items:[{mode:"battery",label:"NP-FZ100電源",sub:"リチウムイオン電池",icon:ht.battery},{mode:"cfexpress",label:"CFexpress 4.0",sub:"PCIe高速メモリー",icon:ht.card},{mode:"mishoe",label:"MIシュー",sub:"21ピン電子インターフェース",icon:ht.mishoe},{mode:"mic",label:"ECMマイク",sub:"デジタル音響収録",icon:ht.mic},{mode:"drybox",label:"防湿庫",sub:"光学機材保存環境",icon:ht.drybox}]}],Qo=new Map;for(const n of pu)for(const e of n.items)Qo.set(e.mode,e);const uh={0:[{id:"overview",label:"全景"},{id:"phases",label:"工程列"},{id:"litho",label:"露光機"},{id:"variants",label:"方式比較"}],1:[{id:"v1_overview",label:"全景"},{id:"v1_photonics",label:"光電変換"},{id:"v1_archs",label:"世代構造"},{id:"v1_duel",label:"BSI対決"},{id:"v1_wall",label:"微細限界"}],2:[{id:"v2_overview",label:"全景"},{id:"v2_refine",label:"高純度精製"},{id:"v2_mcz",label:"MCZ引上"},{id:"v2_wafer",label:"研磨加工"},{id:"v2_epi_ship",label:"エピ成長"}],3:[{id:"v3_overview",label:"全景"},{id:"v3_tcad",label:"TCAD"},{id:"v3_layout",label:"設計検証"},{id:"v3_opc",label:"OPC補正"},{id:"v3_maskfab",label:"マスク製造"}],4:[{id:"v4_overview",label:"全景"},{id:"v4_sti_dti",label:"DTI分離"},{id:"v4_ppd_mev",label:"埋込PD"},{id:"v4_vtg_gate",label:"縦型TG"},{id:"v4_pin_sab",label:"ピニング"}],5:[{id:"v5_overview",label:"全景"},{id:"v5_w_m1",label:"W/M1配線"},{id:"v5_m2_m4",label:"Cu多層"},{id:"v5_m5_wat",label:"最上層WAT"},{id:"v5_hb_cmp",label:"Cu-Cu接合"}]};class yx{handlers;currentMode="welcome";currentFabVol=0;paletteOpen=!1;assemblyTriggerBtn;assemblyIconHost;assemblyLabelEl;assemblyCountEl;paletteEl;paletteBtns=new Map;playgroundBtn;miraiCtaBtn;subViewHost;lensSubBar;lensSecBtns;v2SubBar;v2ToggleBtn;fabSubBar;fabVolBtns;fabStageRow;fabStageBtns=new Map;miraiSubBar;miraiSubBtns;qualityBtns;explodeSlider;explodePctEl;sectionAxisBtns;sectionSliderWrap;sectionSlider;resetVisBtn;constructor(e,t){this.handlers=t;const i=document.createElement("header");i.className="studio-topbar";const s=document.createElement("div");s.className="studio-topbar-left";const r=document.createElement("div");r.className="assembly-selector-wrap",this.assemblyTriggerBtn=document.createElement("button"),this.assemblyTriggerBtn.type="button",this.assemblyTriggerBtn.className="assembly-trigger-pill",this.assemblyTriggerBtn.setAttribute("aria-haspopup","true"),this.assemblyTriggerBtn.setAttribute("aria-expanded","false"),this.assemblyIconHost=document.createElement("span"),this.assemblyIconHost.className="assembly-trigger-icon",this.assemblyLabelEl=document.createElement("span"),this.assemblyLabelEl.className="assembly-trigger-label",this.assemblyCountEl=document.createElement("span"),this.assemblyCountEl.className="assembly-trigger-badge";const a=$n(ht.chevronDown);a.classList.add("assembly-trigger-chev"),this.assemblyTriggerBtn.append(this.assemblyIconHost,this.assemblyLabelEl,this.assemblyCountEl,a),this.assemblyTriggerBtn.addEventListener("click",P=>{P.stopPropagation(),this.setPaletteOpen(!this.paletteOpen)}),this.paletteEl=document.createElement("div"),this.paletteEl.className="assembly-palette-popover",this.paletteEl.setAttribute("aria-hidden","true");for(const P of pu){const L=document.createElement("div");L.className="assembly-palette-section";const E=document.createElement("div");E.className="assembly-palette-heading",E.textContent=P.heading;const S=document.createElement("div");S.className="assembly-palette-grid";for(const R of P.items){const F=document.createElement("button");F.type="button",F.className="assembly-palette-item",F.dataset.mode=R.mode;const O=document.createElement("span");O.className="assembly-palette-ic",O.appendChild($n(R.icon));const V=document.createElement("span");V.className="assembly-palette-txt",V.innerHTML=`<strong>${R.label}</strong><em>${R.sub}</em>`,F.append(O,V),F.addEventListener("click",()=>{this.setPaletteOpen(!1),this.syncMode(R.mode),t.onModeChange(R.mode)}),this.paletteBtns.set(R.mode,F),S.appendChild(F)}L.append(E,S),this.paletteEl.appendChild(L)}r.append(this.assemblyTriggerBtn,this.paletteEl),this.playgroundBtn=document.createElement("button"),this.playgroundBtn.type="button",this.playgroundBtn.className="playground-cta-pill",this.playgroundBtn.title="Play Ground — 全パーツ自由CAD組立＆技術者1000点採点",this.playgroundBtn.append($n(ht.playground));const o=document.createElement("span");o.textContent="Play Ground",this.playgroundBtn.appendChild(o),this.playgroundBtn.addEventListener("click",()=>{this.setPaletteOpen(!1),this.handlers.onOpenPlayground?.()}),this.miraiCtaBtn=document.createElement("button"),this.miraiCtaBtn.type="button",this.miraiCtaBtn.className="mirai-cta-pill",this.miraiCtaBtn.title="Future History MIRAI 2028 — 2028未来技術48選＆精密3D試作(FH01/FH02)",this.miraiCtaBtn.append($n(ht.mirai));const l=document.createElement("span");l.textContent="FH 2028",this.miraiCtaBtn.append(l),this.miraiCtaBtn.addEventListener("click",()=>{this.setPaletteOpen(!1),this.currentMode!=="mirai_2028"?(this.syncMode("mirai_2028"),t.onModeChange("mirai_2028")):this.handlers.onOpenMiraiStudio?.("reports")}),s.append(r,this.playgroundBtn,this.miraiCtaBtn),this.subViewHost=document.createElement("div"),this.subViewHost.className="studio-topbar-center",this.lensSubBar=document.createElement("div"),this.lensSubBar.className="studio-subbar is-hidden";const h=(P,L)=>{const E=document.createElement("button");return E.type="button",E.className=`studio-sub-btn${P===1?" is-active":""}`,E.textContent=L,E.addEventListener("click",()=>{this.syncLensSection(P),t.onLensSectionChange(P)}),E};this.lensSecBtns={1:h(1,"1: 後群・マウント"),2:h(2,"2: 中群・絞りXD"),3:h(3,"3: 前群・XAフード")},this.lensSubBar.append(this.lensSecBtns[1],this.lensSecBtns[2],this.lensSecBtns[3]),this.v2SubBar=document.createElement("div"),this.v2SubBar.className="studio-subbar is-hidden",this.v2ToggleBtn=document.createElement("button"),this.v2ToggleBtn.type="button",this.v2ToggleBtn.className="studio-sub-btn is-accent",this.v2ToggleBtn.textContent="V2 極超解剖へ切替",this.v2ToggleBtn.addEventListener("click",()=>{const P=this.currentMode==="micro"?"micro_v2":this.currentMode==="micro_v2"?"micro":this.currentMode==="bionz"?"bionz_v2":this.currentMode==="bionz_v2"?"bionz":null;P&&(this.syncMode(P),t.onModeChange(P))}),this.v2SubBar.appendChild(this.v2ToggleBtn),this.fabSubBar=document.createElement("div"),this.fabSubBar.className="studio-fab-subbar is-hidden";const u=document.createElement("div");u.className="studio-subbar";const d=P=>{const L=document.createElement("button");return L.type="button",L.className=`studio-sub-btn${P===0?" is-active":""}`,L.textContent=`Vol.${P}`,L.addEventListener("click",()=>{this.syncFabVolume(P),t.onSensorFabVolumeChange(P)}),L};this.fabVolBtns={0:d(0),1:d(1),2:d(2),3:d(3),4:d(4),5:d(5)},u.append(this.fabVolBtns[0],this.fabVolBtns[1],this.fabVolBtns[2],this.fabVolBtns[3],this.fabVolBtns[4],this.fabVolBtns[5]),this.fabStageRow=document.createElement("div"),this.fabStageRow.className="studio-subbar studio-fab-stages",this.fabSubBar.append(u,this.fabStageRow),this.rebuildFabStages(0),this.miraiSubBar=document.createElement("div"),this.miraiSubBar.className="studio-subbar mirai-subbar is-hidden";const p=(P,L,E)=>{const S=document.createElement("button");return S.type="button",S.className=`studio-sub-btn mirai-sub-struct${P===1?" is-active":""}`,S.textContent=L,S.title=E,S.addEventListener("click",()=>{this.syncMiraiSubView(P),t.onMiraiSubViewChange?.(P)}),S};this.miraiSubBtns={1:p(1,"FH01 SPAD","FH01 フルサイズ単一光子SPAD/QIS 3D積層センサー（16パーツ）"),2:p(2,"FH02 3層RGB","FH02 ペロブスカイト/OPF 3層垂直RGBセンサー（16パーツ）"),3:p(3,"FH08 メタ50/1.4","FH08 ASI逆設計 28mm・180g 50mm F1.4 自由曲面メタ光学レンズ（18パーツ）"),4:p(4,"FH32 MEMS空冷","FH32 IP68水密隔離・超音波MEMSソリッドステート空冷モジュール（18パーツ）"),5:p(5,"FH25 3万nit EVF","FH25 30,000ニット・240Hz True-RGBタンデム パンケーキEVF（18パーツ）")};const f=document.createElement("span");f.className="mirai-subbar-sep";const x=(P,L)=>{const E=document.createElement("button");return E.type="button",E.className="studio-sub-btn mirai-sub-lib",E.textContent=L,E.addEventListener("click",()=>t.onOpenMiraiStudio?.(P)),E};this.miraiSubBar.append(this.miraiSubBtns[1],this.miraiSubBtns[2],this.miraiSubBtns[3],this.miraiSubBtns[4],this.miraiSubBtns[5],f,x("reports","レポート"),x("matrix","48技術"),x("glossary","用語113")),this.subViewHost.append(this.lensSubBar,this.v2SubBar,this.fabSubBar,this.miraiSubBar);const v=document.createElement("div");v.className="studio-topbar-right";const _=document.createElement("div");_.className="studio-seg-pill quality-pill",_.setAttribute("role","group"),_.setAttribute("aria-label","描画品質ティア");const m=(P,L,E)=>{const S=document.createElement("button");return S.type="button",S.className=`studio-seg-item quality-tier-${P}`,S.textContent=L,S.title=E,S.addEventListener("click",()=>{this.syncQuality(P),t.onQualityChange(P)}),S};this.qualityBtns={standard_lite:m("standard_lite","LITE","STD LITE v2 — 超軽量Dual-Atlas MatCap＋GPU分解（常時最高効率）"),ultra:m("ultra","ULTRA","ULTRA 2.5× — 視点移動中はLITE自動切替・静止瞬時に4K影＋1024pxソフトボックスULTRA描画（遅延ゼロ）")},_.append(this.qualityBtns.standard_lite,this.qualityBtns.ultra),v.append(_),i.append(s,this.subViewHost,v);const M=document.createElement("footer");M.className="studio-bottom-dock";const b=document.createElement("div");b.className="dock-cluster dock-explode",this.explodeSlider=document.createElement("input"),this.explodeSlider.type="range",this.explodeSlider.className="dock-slider",this.explodeSlider.min="0",this.explodeSlider.max="100",this.explodeSlider.step="1",this.explodeSlider.value="0",this.explodeSlider.setAttribute("aria-label","分解度スライダー"),this.explodeSlider.addEventListener("input",()=>{const P=Number(this.explodeSlider.value)/100;this.explodePctEl.textContent=`${Math.round(P*100)}%`,t.onExplodeChange(P)}),this.explodePctEl=document.createElement("span"),this.explodePctEl.className="dock-pct-badge",this.explodePctEl.textContent="0%",b.append(this.explodeSlider,this.explodePctEl);const y=document.createElement("div");y.className="dock-cluster dock-section";const I=document.createElement("div");I.className="studio-seg-pill dock-seg";const A=(P,L)=>{const E=document.createElement("button");return E.type="button",E.className=`studio-seg-item${P==="off"?" is-active":""}`,E.textContent=L,E.title=P==="off"?"断面カット OFF":`${L}軸 断面カット`,E.addEventListener("click",()=>{this.syncSectionAxis(P,Number(this.sectionSlider.value)/100),t.onSectionAxisChange(P)}),E};this.sectionAxisBtns={off:A("off","断面OFF"),x:A("x","X断面"),y:A("y","Y断面")},I.append(this.sectionAxisBtns.off,this.sectionAxisBtns.x,this.sectionAxisBtns.y),this.sectionSliderWrap=document.createElement("div"),this.sectionSliderWrap.className="dock-section-slider-wrap is-collapsed",this.sectionSlider=document.createElement("input"),this.sectionSlider.type="range",this.sectionSlider.className="dock-slider dock-slider-sm",this.sectionSlider.min="0",this.sectionSlider.max="100",this.sectionSlider.value="50",this.sectionSlider.setAttribute("aria-label","断面位置"),this.sectionSlider.addEventListener("input",()=>{t.onSectionValueChange(Number(this.sectionSlider.value)/100)}),this.sectionSliderWrap.appendChild(this.sectionSlider),y.append(I,this.sectionSliderWrap),this.resetVisBtn=document.createElement("button"),this.resetVisBtn.type="button",this.resetVisBtn.className="dock-icon-btn is-hidden-btn",this.resetVisBtn.title="非表示パーツをすべて再表示",this.resetVisBtn.setAttribute("aria-label","非表示パーツをすべて再表示"),this.resetVisBtn.appendChild($n(ht.resetVis)),this.resetVisBtn.disabled=!0,this.resetVisBtn.addEventListener("click",()=>t.onResetVisibility()),M.append(b,y,this.resetVisBtn),document.addEventListener("click",P=>{this.paletteOpen&&!r.contains(P.target)&&this.setPaletteOpen(!1)}),window.addEventListener("keydown",P=>{P.key==="Escape"&&this.paletteOpen&&this.setPaletteOpen(!1)}),e.append(i,M),this.syncMode("welcome")}setPaletteOpen(e){this.paletteOpen=e,this.paletteEl.classList.toggle("is-open",e),this.paletteEl.setAttribute("aria-hidden",e?"false":"true"),this.assemblyTriggerBtn.setAttribute("aria-expanded",e?"true":"false"),this.assemblyTriggerBtn.classList.toggle("is-open",e)}rebuildFabStages(e){this.fabStageRow.replaceChildren(),this.fabStageBtns.clear();const t=uh[e]??uh[0];for(let i=0;i<t.length;i++){const s=t[i],r=document.createElement("button");r.type="button",r.className=`studio-sub-btn${i===0?" is-active":""}`,r.textContent=s.label,r.addEventListener("click",()=>{this.syncFabStage(s.id),this.handlers.onSensorFabStageChange(s.id)}),this.fabStageBtns.set(s.id,r),this.fabStageRow.appendChild(r)}}syncFabVolume(e){this.currentFabVol=e,[0,1,2,3,4,5].forEach(t=>{this.fabVolBtns[t].classList.toggle("is-active",t===e)}),this.rebuildFabStages(e)}syncFabStage(e){for(const[t,i]of this.fabStageBtns.entries())i.classList.toggle("is-active",t===e)}syncLensSection(e){[1,2,3].forEach(t=>{this.lensSecBtns[t].classList.toggle("is-active",t===e)})}syncMiraiSubView(e){const t=Math.max(1,Math.min(5,Math.round(e||1)));[1,2,3,4,5].forEach(i=>{this.miraiSubBtns[i].classList.toggle("is-active",t===i)})}syncQuality(e){["standard_lite","standard","high","ultra"].forEach(t=>{this.qualityBtns[t]?.classList.toggle("is-active",t===e)})}setExplodeValue(e){const t=Math.round(Math.max(0,Math.min(1,e))*100);this.explodeSlider.value=String(t),this.explodePctEl.textContent=`${t}%`}syncMode(e){this.currentMode=e;const t=Qo.get(e)??Qo.get("welcome");this.assemblyIconHost.replaceChildren($n(t.icon)),this.assemblyLabelEl.textContent=t.label;for(const[s,r]of this.paletteBtns.entries())r.classList.toggle("is-active",s===e);this.lensSubBar.classList.toggle("is-hidden",e!=="lens");const i=e==="micro"||e==="micro_v2"||e==="bionz"||e==="bionz_v2";if(this.v2SubBar.classList.toggle("is-hidden",!i),i){const s=e==="micro_v2"||e==="bionz_v2";this.v2ToggleBtn.textContent=s?"V1 標準解剖へ戻る":"V2 極超解剖へ拡大",this.v2ToggleBtn.classList.toggle("is-active",s)}this.fabSubBar.classList.toggle("is-hidden",e!=="sensor_fab"),e==="sensor_fab"&&this.syncFabVolume(this.currentFabVol),this.miraiSubBar.classList.toggle("is-hidden",e!=="mirai_2028"),this.miraiCtaBtn.classList.toggle("is-active",e==="mirai_2028")}syncSectionAxis(e,t=.5){["off","x","y"].forEach(i=>{this.sectionAxisBtns[i].classList.toggle("is-active",i===e)}),this.sectionSliderWrap.classList.toggle("is-collapsed",e==="off"),this.sectionSlider.value=String(Math.round(Math.max(0,Math.min(1,t))*100))}syncPhysics(e){}syncOpticsStudio(e){}syncPlaygroundActive(e){this.playgroundBtn.classList.toggle("is-active",e)}syncFullscreen(e){}renderLayerRail(e,t,i,s,r){this.assemblyCountEl.textContent=e.length>0?`${e.length}p`:"",this.resetVisBtn.disabled=!r,this.resetVisBtn.classList.toggle("is-hidden-btn",!r)}syncHighlight(e,t){}}const Mx=Object.freeze({__isLazyStub:!0,title:"",subtitle:"",category:"",summary:"",opticsAndPhysics:[],nextGenInnovation:"",specs:[],diagramType:"baffle"});function Gx(n){return Mx}function mu(n){return!n||n.__isLazyStub===!0}const dh=new Map,eo=new Map;function bx(n){const e=dh.get(n);if(e)return Promise.resolve(e);let t=eo.get(n);if(t)return t;const i=s=>(dh.set(n,s),eo.delete(n),s);switch(n){case"lens":t=le(()=>import("./lensExplanations-CVIj2Kn6.js"),__vite__mapDeps([60,61,33]),import.meta.url).then(s=>i(s.LENS_EXPLANATIONS));break;case"mount":t=Promise.all([le(()=>import("./mountExplanations-BzfMkKM6.js"),__vite__mapDeps([62,61,16]),import.meta.url),le(()=>import("./mountUltra34ExplanationsA-DS-n8i88.js"),[],import.meta.url),le(()=>import("./mountUltra34ExplanationsB-C99K2WhF.js"),[],import.meta.url)]).then(([s,r,a])=>i({...s.MOUNT_EXPLANATIONS,...r.MOUNT_ULTRA34_EXPLANATIONS_A,...a.MOUNT_ULTRA34_EXPLANATIONS_B}));break;case"shutter":t=Promise.all([le(()=>import("./shutterExplanations-COwEmSMe.js"),__vite__mapDeps([63,61,19]),import.meta.url),le(()=>import("./shutterUltra34ExplanationsA-BlYeoVYD.js"),[],import.meta.url),le(()=>import("./shutterUltra34ExplanationsB-Be8hM50-.js"),[],import.meta.url),le(()=>import("./shutterUltra36ExplanationsA-Ci5eL3OG.js"),[],import.meta.url),le(()=>import("./shutterUltra36ExplanationsB-CecpLJJK.js"),[],import.meta.url)]).then(([s,r,a,o,l])=>i({...s.SHUTTER_EXPLANATIONS,...r.SHUTTER_ULTRA34_EXPLANATIONS_A,...a.SHUTTER_ULTRA34_EXPLANATIONS_B,...o.SHUTTER_ULTRA36_EXPLANATIONS_A,...l.SHUTTER_ULTRA36_EXPLANATIONS_B}));break;case"sensor":t=Promise.all([le(()=>import("./explanations-BP4A1WOU.js"),__vite__mapDeps([64,43,47,61]),import.meta.url),le(()=>import("./sensorNextGenExplanations-CHPfukQ0.js"),[],import.meta.url)]).then(([s,r])=>i({...s.MACRO_EXPLANATIONS,...r.SENSOR_NEXTGEN_EXPLANATIONS}));break;case"micro":t=Promise.all([le(()=>import("./explanations-BP4A1WOU.js"),__vite__mapDeps([64,43,47,61]),import.meta.url),le(()=>import("./microPixelNextGenExplanations-CR3tDPn4.js"),[],import.meta.url)]).then(([s,r])=>i({...s.MICRO_EXPLANATIONS,...r.MICRO_NEXTGEN_EXPLANATIONS}));break;case"micro_v2":t=Promise.all([le(()=>import("./microPixelV2Explanations-Ds_g-StQ.js"),__vite__mapDeps([65,50,61]),import.meta.url),le(()=>import("./microPixelV2DeepExplanations-CJhaoa5m.js"),[],import.meta.url)]).then(([s,r])=>i({...s.MICRO_V2_EXPLANATIONS,...r.MICRO_V2_DEEP_EXPLANATIONS}));break;case"mainboard":t=le(()=>import("./mainboardExplanations-CFCwOEoo.js"),__vite__mapDeps([66,61,36]),import.meta.url).then(s=>i(s.MAINBOARD_EXPLANATIONS));break;case"evf":t=le(()=>import("./evfExplanations-aJd0hUVQ.js"),__vite__mapDeps([67,61,27]),import.meta.url).then(s=>i(s.EVF_EXPLANATIONS));break;case"lcd":t=Promise.all([le(()=>import("./lcdExplanations-DVJLFMAP.js"),__vite__mapDeps([68,30,61]),import.meta.url),le(()=>import("./lcdUltraOemExplanations-CI_uk3nO.js"),[],import.meta.url),le(()=>import("./lcdUltraTechExplanations-CnjedjBN.js"),[],import.meta.url),le(()=>import("./lcdUltraDeepExplanations-3u9mqkCF.js"),[],import.meta.url)]).then(([s,r,a,o])=>i({...s.LCD_EXPLANATIONS,...r.LCD_ULTRA_OEM_EXPLANATIONS,...a.LCD_ULTRA_TECH_EXPLANATIONS,...o.LCD_ULTRA_DEEP_EXPLANATIONS}));break;case"body":t=Promise.all([le(()=>import("./bodyExplanations-kgPdKIc9.js"),__vite__mapDeps([69,61,22]),import.meta.url),le(()=>import("./bodyNextGenExplanations--jRwbaL2.js"),[],import.meta.url),le(()=>import("./bodyUltra25Explanations-CYatOCbR.js"),[],import.meta.url)]).then(([s,r,a])=>i({...s.BODY_EXPLANATIONS,...r.BODY_NEXTGEN_EXPLANATIONS,...a.BODY_ULTRA25_EXPLANATIONS}));break;case"battery":t=Promise.all([le(()=>import("./batteryExplanations-BeDaaZxE.js"),__vite__mapDeps([70,61,7]),import.meta.url),le(()=>import("./batteryUltra27Explanations-D4Vs8LwE.js"),[],import.meta.url),le(()=>import("./batteryUltra30Explanations-BO5ebi-w.js"),[],import.meta.url),le(()=>import("./batteryUltra31Explanations-I-s3ieDM.js"),[],import.meta.url)]).then(([s,r,a,o])=>i({...s.BATTERY_EXPLANATIONS,...r.BATTERY_ULTRA27_EXPLANATIONS,...a.BATTERY_ULTRA30_EXPLANATIONS,...o.BATTERY_ULTRA31_EXPLANATIONS}));break;case"cfexpress":t=Promise.all([le(()=>import("./cfexpressExplanations-BMV4rYzd.js"),__vite__mapDeps([71,61,10]),import.meta.url),le(()=>import("./cfexpressUltra27Explanations-nNi1XLCz.js"),[],import.meta.url),le(()=>import("./cfexpressUltra28Explanations-xks2HbCY.js"),[],import.meta.url),le(()=>import("./cfexpressUltra29Explanations-DzCl4c2e.js"),[],import.meta.url),le(()=>import("./cfexpressUltra35Explanations-D5bgh2xi.js"),[],import.meta.url)]).then(([s,r,a,o,l])=>i({...s.CFEXPRESS_EXPLANATIONS,...r.CFEXPRESS_ULTRA27_EXPLANATIONS,...a.CFEXPRESS_ULTRA28_EXPLANATIONS,...o.CFEXPRESS_ULTRA29_EXPLANATIONS,...l.CFEXPRESS_ULTRA35_EXPLANATIONS}));break;case"bionz":t=Promise.all([le(()=>import("./bionzExplanations-Dj7Xzik7.js"),__vite__mapDeps([72,61,39]),import.meta.url),le(()=>import("./bionzExtraExplanations-BPBMjZCX.js"),[],import.meta.url)]).then(([s,r])=>i({...s.BIONZ_EXPLANATIONS,...r.BIONZ_EXTRA_EXPLANATIONS}));break;case"bionz_v2":t=Promise.all([le(()=>import("./bionzV2Explanations-Bg1XzZ5k.js"),__vite__mapDeps([73,61,41]),import.meta.url),le(()=>import("./bionzV2DeepExplanations-B7-A1i_E.js"),[],import.meta.url)]).then(([s,r])=>i({...s.BIONZ_V2_EXPLANATIONS,...r.BIONZ_V2_DEEP_EXPLANATIONS}));break;case"mishoe":t=le(()=>import("./miShoeExplanations-CLmVffr4.js"),__vite__mapDeps([74,5]),import.meta.url).then(s=>i(s.MISHOE_EXPLANATIONS));break;case"mic":t=Promise.all([le(()=>import("./micExplanations-C2aeFQw6.js"),__vite__mapDeps([75,61,12]),import.meta.url),le(()=>import("./micUltra30Explanations-CAS6Gtxe.js"),[],import.meta.url),le(()=>import("./micUltra31Explanations-Bj-XHzn_.js"),[],import.meta.url),le(()=>import("./micUltra36Explanations-801w0TLM.js"),[],import.meta.url)]).then(([s,r,a,o])=>i({...s.MIC_EXPLANATIONS,...r.MIC_ULTRA30_EXPLANATIONS,...a.MIC_ULTRA31_EXPLANATIONS,...o.MIC_ULTRA36_EXPLANATIONS}));break;case"sensor_fab":t=Promise.all([le(()=>import("./sensorFabExplanations-D2TQiUI1.js"),__vite__mapDeps([76,52,61]),import.meta.url),le(()=>import("./sensorFabVol1Explanations-Bos_lokV.js"),[],import.meta.url),le(()=>import("./sensorFabVol2Explanations-NmPUwAYx.js"),[],import.meta.url),le(()=>import("./sensorFabVol3Explanations-Ci_LGE41.js"),[],import.meta.url),le(()=>import("./sensorFabVol4Explanations-CaotSDfX.js"),[],import.meta.url),le(()=>import("./sensorFabVol5Explanations-CECl6FgB.js"),[],import.meta.url)]).then(([s,r,a,o,l,h])=>i({...s.SENSOR_FAB_EXPLANATIONS,...r.SENSOR_FAB_VOL1_EXPLANATIONS,...a.SENSOR_FAB_VOL2_EXPLANATIONS,...o.SENSOR_FAB_VOL3_EXPLANATIONS,...l.SENSOR_FAB_VOL4_EXPLANATIONS,...h.SENSOR_FAB_VOL5_EXPLANATIONS}));break;case"drybox":t=Promise.all([le(()=>import("./dryboxExplanationsA-B_9kghFZ.js"),__vite__mapDeps([77,61,14]),import.meta.url),le(()=>import("./dryboxExplanationsB-0on_uNo3.js"),[],import.meta.url),le(()=>import("./dryboxExplanationsC-QzcATb7E.js"),[],import.meta.url),le(()=>import("./dryboxExplanationsD-BNU_Qg6S.js"),[],import.meta.url),le(()=>import("./dryboxExplanationsE-BxNW7Dlv.js"),[],import.meta.url),le(()=>import("./dryboxExplanationsF-BYZ4JlyK.js"),[],import.meta.url),le(()=>import("./dryboxExplanationsG-CXIZrSb1.js"),[],import.meta.url)]).then(([s,r,a,o,l,h,u])=>i({...s.DRYBOX_EXPLANATIONS_A,...r.DRYBOX_EXPLANATIONS_B,...a.DRYBOX_EXPLANATIONS_C,...o.DRYBOX_EXPLANATIONS_D,...l.DRYBOX_EXPLANATIONS_E,...h.DRYBOX_EXPLANATIONS_F,...u.DRYBOX_EXPLANATIONS_G}));break;case"welcome":case"mirai_2028":t=Promise.resolve(i({}));break}return eo.set(n,t),t}async function Sx(n){if(!mu(n.explanation))return n.explanation;const t=(await bx(n.subsystem))[n.id];return t?(n.explanation=t,t):n.explanation}const fh="mirai_2028_edition",Ex=["物理・構造突破","量産民主化","既存比優位性","撮影体験革命","ASI/AI加速"],wx={"001":"SPAD","002":"QIS","003":"ベイヤー配列","004":"ペロブスカイト","008":"暗電流","009":"kTC雑音","010":"ショット雑音","012":"ダイナミックレンジ","014":"メタサーフェス／DOE","015":"群遅延限界","016":"アッベ数","017":"エタンデュ／入射瞳","018":"ナノインプリント(NIL)","020":"逆設計(Inverse Design)","021":"色収差","022":"自由曲面光学","048":"回折限界","051":"PSF(点像分布関数)","055":"Micro-OLED","056":"True-RGBタンデム","057":"MicroLED","058":"青色PHOLED","059":"LTPOバックプレーン","070":"超音波MEMS空冷","071":"水密隔離カプセル","072":"熱収支(TDP)","073":"IP68防水防塵","074":"トポロジー最適化","098":"超知能(ASI)",101:"歩留まり",102:"エージェンティックEDA",103:"TCAD",106:"Cu-Cuハイブリッド接合",108:"自律ロボット実験室",111:"固有色科学"};let Mn=null,to=null;function ph(){return Mn?Promise.resolve(Mn):(to||(to=le(()=>import("./schematicsRegistry-3WLmIcHb.js"),[],import.meta.url).then(n=>(Mn=n.renderSchematicSvg,Mn))),to)}const Tx="http://www.w3.org/2000/svg";function gu(n,e="0 0 24 24"){const t=document.createElementNS(Tx,"svg");return t.setAttribute("viewBox",e),t.innerHTML=n,t}function Kn(n,e=""){const t=document.createElement("button");return t.type="button",t.className="icon-btn",e&&(t.title=e,t.setAttribute("aria-label",e)),t.appendChild(gu(n)),t}const fn={prev:'<polyline points="15 18 9 12 15 6"/>',next:'<polyline points="9 18 15 12 9 6"/>',isolate:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/>',hide:'<path d="M3 3l18 18"/><path d="M10.6 10.6a2.5 2.5 0 0 0 3.5 3.5"/><path d="M6.4 6.7C4 8.2 2.4 10.5 2 12c1.2 3.2 5 6.5 10 6.5 1.8 0 3.5-.5 4.9-1.2"/><path d="M9.8 5.7A10.6 10.6 0 0 1 12 5.5c5 0 8.8 3.3 10 6.5-.4 1.1-1.2 2.4-2.4 3.6"/>',close:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',rotate:'<path d="M21 12a9 9 0 1 1-2.64-6.36"/><polyline points="21 3 21 9 15 9"/>'};function Ax(n){return n.includes("ed")||n.includes("flint")||n.includes("focus-b-front")||n.includes("uv-cement")?"ed_chromatic":n.includes("xa")||n.includes("rear-element")||n.includes("rear-cell-spacer")||n.includes("front-meniscus")||n.includes("retaining-rings")||n.includes("potting")||n.includes("phase-align")?"xa_aspheric":n.includes("xd")||n.includes("focus-")||n.includes("guide")||n.includes("antirot")||n.includes("mr-")||n.includes("af-origin")||n.includes("mf-")||n.includes("control-rings")||n.includes("iris-iso-fpc")||n.includes("reinforcing-plates")||n.includes("center-join-ring")||n.includes("clutch-ball-rollers")?"floating_xd":n.includes("hood")||n.includes("baffle")||n.includes("filter")||n.includes("optical-spacers")||n.includes("lighttrap-tube")||n.includes("fluorine")||n.includes("nano-ar")||n.includes("sumi")||n.includes("lightfoil")?"nano_ar_baffle":"aperture_bokeh"}class Px{drawerEl;swatchEl;isolateBtn;tabBtns;bodyEl;lightboxEl;lightboxPanelEl;lightboxTitleEl;lightboxViewportEl;lightboxCanvasEl;lightboxZoomLabelEl;lightboxRotateBtn;handlers;renderSeq=0;activeTab="all";miraiEdition=(()=>{try{const e=window.localStorage.getItem(fh);if(e==="beginner"||e==="expert")return e}catch{}return"beginner"})();currentPart=null;currentExp=null;latestTitle="";latestSvg="";lbScale=1;lbPanX=0;lbPanY=0;lbRotated=!1;activePointers=new Map;pinchStartDist=0;pinchStartScale=1;dragLastX=0;dragLastY=0;lastTapMs=0;constructor(e,t){this.handlers=t,this.drawerEl=document.createElement("aside"),this.drawerEl.className="explanation-drawer",this.drawerEl.dataset.viewTab="all",this.drawerEl.setAttribute("aria-hidden","true");const i=document.createElement("div");i.className="drawer-mobile-handle",i.setAttribute("aria-hidden","true");const s=document.createElement("div");s.className="drawer-toolbar";const r=document.createElement("div");r.className="drawer-toolbar-left",this.swatchEl=document.createElement("span"),this.swatchEl.className="drawer-swatch-pill";const a=Kn(fn.prev,"前のパーツ"),o=Kn(fn.next,"次のパーツ");a.addEventListener("click",t.onPrev),o.addEventListener("click",t.onNext),r.append(this.swatchEl,a,o);const l=document.createElement("div");l.className="drawer-toolbar-right",this.isolateBtn=Kn(fn.isolate,"このパーツのみ単独表示"),this.isolateBtn.addEventListener("click",t.onToggleIsolate);const h=Kn(fn.hide,"このパーツを一時非表示");h.addEventListener("click",t.onHideCurrent);const u=Kn(fn.close,"閉じる");u.addEventListener("click",t.onClose),l.append(this.isolateBtn,h,u),s.append(r,l);const d=document.createElement("div");d.className="drawer-tab-bar",d.setAttribute("role","tablist");const p=(y,I)=>{const A=document.createElement("button");return A.type="button",A.className=`drawer-tab-btn${y==="all"?" is-active":""}`,A.setAttribute("role","tab"),A.textContent=I,A.addEventListener("click",()=>this.setViewTab(y)),A};this.tabBtns={all:p("all","すべて"),diagram:p("diagram","図説"),explanation:p("explanation","解説")},d.append(this.tabBtns.all,this.tabBtns.diagram,this.tabBtns.explanation),this.bodyEl=document.createElement("div"),this.bodyEl.className="drawer-body",this.drawerEl.append(i,s,d,this.bodyEl),e.appendChild(this.drawerEl),this.lightboxEl=document.createElement("div"),this.lightboxEl.className="schematic-lightbox",this.lightboxEl.setAttribute("aria-hidden","true"),this.lightboxPanelEl=document.createElement("div"),this.lightboxPanelEl.className="schematic-lightbox-panel schematic-lightbox-card";const f=document.createElement("div");f.className="schematic-lightbox-header",this.lightboxTitleEl=document.createElement("div"),this.lightboxTitleEl.className="schematic-lightbox-title";const x=Kn(fn.close,"図説拡大を閉じる");x.addEventListener("click",()=>this.closeLightbox()),f.append(this.lightboxTitleEl,x),this.lightboxViewportEl=document.createElement("div"),this.lightboxViewportEl.className="schematic-lightbox-viewport schematic-lightbox-stage",this.lightboxCanvasEl=document.createElement("div"),this.lightboxCanvasEl.className="schematic-lightbox-canvas",this.lightboxViewportEl.appendChild(this.lightboxCanvasEl);const v=document.createElement("div");v.className="schematic-lightbox-controls";const _=document.createElement("button");_.type="button",_.className="lb-ctrl-btn",_.textContent="−",_.title="縮小",_.addEventListener("click",()=>this.stepLightboxZoom(-.35)),this.lightboxZoomLabelEl=document.createElement("button"),this.lightboxZoomLabelEl.type="button",this.lightboxZoomLabelEl.className="lb-ctrl-btn lb-ctrl-reset",this.lightboxZoomLabelEl.textContent="100%",this.lightboxZoomLabelEl.title="倍率リセット",this.lightboxZoomLabelEl.addEventListener("click",()=>this.resetLightboxTransform());const m=document.createElement("button");m.type="button",m.className="lb-ctrl-btn",m.textContent="＋",m.title="拡大",m.addEventListener("click",()=>this.stepLightboxZoom(.4));const M=document.createElement("button");M.type="button",M.className="lb-ctrl-btn lb-ctrl-accent",M.textContent="見やすい 1.8×",M.title="スマホで文字が読みやすい1.8倍ズーム切替",M.addEventListener("click",()=>{Math.abs(this.lbScale-1.8)<.15?this.resetLightboxTransform():(this.lbScale=1.8,this.lbPanX=0,this.lbPanY=0,this.applyLightboxTransform())}),this.lightboxRotateBtn=document.createElement("button"),this.lightboxRotateBtn.type="button",this.lightboxRotateBtn.className="lb-ctrl-btn lb-ctrl-rotate",this.lightboxRotateBtn.append(gu(fn.rotate));const b=document.createElement("span");b.textContent="90°回転",this.lightboxRotateBtn.append(b),this.lightboxRotateBtn.title="縦長スマホ画面いっぱいに90°横向き回転表示",this.lightboxRotateBtn.addEventListener("click",()=>{this.lbRotated=!this.lbRotated,this.lbScale=1,this.lbPanX=0,this.lbPanY=0,this.applyLightboxTransform()}),v.append(_,this.lightboxZoomLabelEl,m,M,this.lightboxRotateBtn),this.lightboxPanelEl.append(f,this.lightboxViewportEl,v),this.lightboxEl.appendChild(this.lightboxPanelEl),this.bindLightboxGestures(),this.lightboxEl.addEventListener("click",y=>{y.target===this.lightboxEl&&this.closeLightbox()}),window.addEventListener("keydown",y=>{y.key==="Escape"&&this.lightboxEl.classList.contains("is-open")&&this.closeLightbox()}),e.appendChild(this.lightboxEl)}bindLightboxGestures(){const e=this.lightboxViewportEl;e.addEventListener("pointerdown",i=>{if(e.setPointerCapture(i.pointerId),this.activePointers.set(i.pointerId,{x:i.clientX,y:i.clientY}),this.activePointers.size===1){const s=performance.now();s-this.lastTapMs<280?(this.lbScale>1.25?this.resetLightboxTransform():(this.lbScale=1.85,this.lbPanX=0,this.lbPanY=0,this.applyLightboxTransform()),this.lastTapMs=0):this.lastTapMs=s,this.dragLastX=i.clientX,this.dragLastY=i.clientY}else if(this.activePointers.size===2){const s=Array.from(this.activePointers.values());this.pinchStartDist=Math.hypot(s[1].x-s[0].x,s[1].y-s[0].y)||1,this.pinchStartScale=this.lbScale}}),e.addEventListener("pointermove",i=>{if(this.activePointers.has(i.pointerId)){if(this.activePointers.set(i.pointerId,{x:i.clientX,y:i.clientY}),this.activePointers.size===2){const s=Array.from(this.activePointers.values()),r=Math.hypot(s[1].x-s[0].x,s[1].y-s[0].y)||1;this.lbScale=Math.max(.8,Math.min(4.5,this.pinchStartScale*(r/this.pinchStartDist))),this.applyLightboxTransform()}else if(this.activePointers.size===1){const s=i.clientX-this.dragLastX,r=i.clientY-this.dragLastY;this.dragLastX=i.clientX,this.dragLastY=i.clientY,(this.lbScale>1.02||this.lbRotated)&&(this.lbPanX+=s,this.lbPanY+=r,this.applyLightboxTransform())}}});const t=i=>{if(this.activePointers.delete(i.pointerId),this.activePointers.size===1){const s=Array.from(this.activePointers.values())[0];this.dragLastX=s.x,this.dragLastY=s.y}};e.addEventListener("pointerup",t),e.addEventListener("pointercancel",t),e.addEventListener("wheel",i=>{i.preventDefault();const s=i.deltaY<0?.22:-.22;this.stepLightboxZoom(s)},{passive:!1})}stepLightboxZoom(e){this.lbScale=Math.max(.8,Math.min(4.5,this.lbScale+e)),this.lbScale<=1.01&&(this.lbPanX=0,this.lbPanY=0),this.applyLightboxTransform()}resetLightboxTransform(){this.lbScale=1,this.lbPanX=0,this.lbPanY=0,this.applyLightboxTransform()}applyLightboxTransform(){const e=420*this.lbScale;this.lbPanX=Math.max(-e,Math.min(e,this.lbPanX)),this.lbPanY=Math.max(-e,Math.min(e,this.lbPanY)),this.lightboxPanelEl.classList.toggle("is-rotated",this.lbRotated),this.lightboxRotateBtn.classList.toggle("is-active",this.lbRotated);const t=this.lbRotated?" rotate(90deg)":"";this.lightboxCanvasEl.style.transform=`translate3d(${this.lbPanX.toFixed(1)}px, ${this.lbPanY.toFixed(1)}px, 0) scale(${this.lbScale.toFixed(3)})${t}`,this.lightboxZoomLabelEl.textContent=`${Math.round(this.lbScale*100)}%`}getViewTab(){return this.activeTab}setViewTab(e){this.activeTab=e,this.drawerEl.dataset.viewTab=e,["all","diagram","explanation"].forEach(t=>{this.tabBtns[t].classList.toggle("is-active",t===e),this.tabBtns[t].setAttribute("aria-selected",t===e?"true":"false")}),this.bodyEl.scrollTop=0}setLightboxOpen(e,t=!1){if(!e){this.closeLightbox();return}this.latestSvg&&this.openLightbox(this.latestTitle,this.latestSvg,t)}openLightbox(e,t,i=!1){if(!t)return;const s=t.replace(/\bid="([^"]+)"/g,'id="$1-lb"').replace(/url\(#([^)]+)\)/g,"url(#$1-lb)");this.lightboxTitleEl.textContent=e,this.lightboxCanvasEl.innerHTML=s,this.lbScale=1,this.lbPanX=0,this.lbPanY=0,this.lbRotated=i,this.activePointers.clear(),this.applyLightboxTransform(),this.lightboxEl.classList.add("is-open"),this.lightboxEl.setAttribute("aria-hidden","false")}closeLightbox(){this.lightboxEl.classList.remove("is-open"),this.lightboxEl.setAttribute("aria-hidden","true"),this.lightboxCanvasEl.replaceChildren(),this.activePointers.clear()}renderPopulatedPart(e,t,i){const s=t.specs.map(k=>`
          <div class="exp-spec-row">
            <span class="exp-spec-label">${k.label}</span>
            <span class="exp-spec-value">${k.value}</span>
          </div>`).join(""),r=t.opticsAndPhysics.map(k=>`<li>${k}</li>`).join(""),a=t.plainAnalogy?`
        <div class="exp-analogy exp-block-text">
          <div class="exp-analogy-badge">やさしい解説</div>
          <p class="exp-analogy-text">${t.plainAnalogy}</p>
        </div>`:"",o=t.formula?`
        <div class="exp-formula">
          <div class="exp-formula-expr">${t.formula.expression}</div>
          <div class="exp-formula-desc">${t.formula.description}</div>
        </div>`:"",l=e.subsystem==="lens"&&this.handlers.onOpenOpticsMotion?`
        <button type="button" class="exp-optics-cta exp-block-text" data-open-optics-motion>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 7h5l4 5 4-4h5"/>
            <path d="M3 17h5l4-5 4 4h5"/>
            <path d="M3 12h18" opacity="0.45"/>
            <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none"/>
          </svg>
          <span>このレンズの光学メカニズムをモーションで体感する</span>
        </button>`:"",h=this.handlers.onSwitchMode?e.subsystem==="micro"?{target:"micro_v2",label:"V2 極超解剖図へ（さらに微細な原子・ナノ構造を拡大）",isV2Target:!0}:e.subsystem==="micro_v2"?{target:"micro",label:"V1 ピクセル配列図へ戻る",isV2Target:!1}:e.subsystem==="bionz"?{target:"bionz_v2",label:"V2 極超解剖図へ（2nm GAA・裏面電源を極超拡大）",isV2Target:!0}:e.subsystem==="bionz_v2"?{target:"bionz",label:"V1 BIONZ XR パッケージ図へ戻る",isV2Target:!1}:e.subsystem==="sensor"?{target:"sensor_fab",label:"センサー製造工程（全2,110工程 3D解剖図）を見る",isV2Target:!0}:e.subsystem==="sensor_fab"?e.id==="fab0-p11-sensor-unit-ibis"||e.id==="fab0-p09-dicing-package"?{target:"sensor",label:"フルサイズセンサー ＆ 5軸IBIS 3D解剖図へ移動",isV2Target:!1}:e.id==="fab0-p12-camera-integration"?{target:"integrated",label:"完成ミラーレス一眼カメラ全体 3D解剖図へ移動",isV2Target:!1}:{target:"micro_v2",label:"ピクセル極超解剖図 V2（ナノ構造拡大）へ移動",isV2Target:!0}:e.subsystem==="drybox"&&e.id==="db-camera-lens-showcase"?{target:"integrated",label:"収納カメラ本体＆50mm F1.2 全体3D解剖図へ移動",isV2Target:!1}:null:null,u=h?`
        <button type="button" class="exp-optics-cta exp-v2-cta exp-block-text${h.isV2Target?" is-v2-target":""}" data-switch-mode="${h.target}">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            ${h.isV2Target?'<path d="M12 2.5l2.1 6.2 6.4 3.3-6.4 3.3L12 21.5l-2.1-6.2-6.4-3.3 6.4-3.3z"/>':'<polyline points="15 18 9 12 15 6"/><line x1="9" y1="12" x2="20" y2="12"/>'}
          </svg>
          <span>${h.label}</span>
        </button>`:"",d=this.handlers.onSwitchFabVolume&&e.subsystem==="sensor_fab"?(e.fabVolume??0)===0?{targetVol:1,label:"第1巻：超入門・センサーのしくみと2026年最新アーキテクチャへ進む"}:(e.fabVolume??0)===1?{targetVol:2,label:"第2巻：フェーズ1 砂から超純度エピタキシャルウェーハまで（全60工程）へ進む"}:(e.fabVolume??0)===2?{targetVol:3,label:"第3巻：フェーズ2 センサー設計とフォトマスク製造（全50工程・96枚）へ進む"}:(e.fabVolume??0)===3?{targetVol:4,label:"第4巻：フェーズ3 画素ウェーハ前工程FEOL（全380工程・25マスク）へ進む"}:(e.fabVolume??0)===4?{targetVol:5,label:"第5巻：フェーズ4 画素ウェーハ配線工程BEOL（全210工程・Cu5＋Al1）へ進む"}:{targetVol:0,label:"第0巻：全2,110工程マップ（P1–P12・L01–L12）へ戻る"}:null,p=d?`
        <button type="button" class="exp-optics-cta exp-block-text" data-switch-fab-vol="${d.targetVol}">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4" y="4" width="16" height="16" rx="2.5"/>
            <path d="M9 8h6M9 12h6M9 16h4"/>
          </svg>
          <span>${d.label}</span>
        </button>`:"",f=Mn?Mn(t.diagramType):"",x=k=>k.includes('data-mirai-hd="1"')||k.includes('data-evf-hd="1"')||k.includes('data-lcd-hd="1"')||k.includes('data-fab-hd="1"')||k.includes("data-bionz-diagram=")||k.includes('data-bionz-v2-hd="1"')||k.includes("data-bionz-tier=")||k.includes('data-sensor-hd="1"')||k.includes('data-mount-hd="1"')||k.includes('data-shutter-hd="1"')||k.includes('data-drybox-hd="1"')||k.includes('data-welcome-hd="1"'),v=x(f),_=k=>{if(e.subsystem!=="bionz"&&e.subsystem!=="bionz_v2")return"";const j=e.subsystem==="bionz_v2",ie=j?[{id:"pkg35d",code:"3.5D",label:"光/実装"},{id:"beol",code:"BEOL",label:"配線層"},{id:"feol",code:"FEOL",label:"GAA/14A"},{id:"isp_mem",code:"SoC",label:"AI/ISP"},{id:"bspdn_cool",code:"BACK",label:"裏面/冷"}]:[{id:"L1",code:"L1",label:"蓋・PoP"},{id:"L2",code:"L2",label:"ISP/AI"},{id:"L3",code:"L3",label:"FEOL"},{id:"L4",code:"L4",label:"ABF基板"},{id:"L5",code:"L5",label:"電源・基板"},{id:"L6",code:"L6",label:"周辺IC"}],de=k.match(/data-bionz-zone="([^"]+)"/),we=de?de[1]:null,Y=j?"BIONZ V2 極超積層マップ (105)":"BIONZ V1 パッケージ階層 (70)",ee=ie.map(he=>`<span class="bionz-stack-step${we===he.id?" is-active":""}" data-stack-zone="${he.id}"><span class="bionz-stack-code">${he.code}</span><span class="bionz-stack-name">${he.label}</span></span>`).join("");return`<div class="bionz-stack-strip"><div class="bionz-stack-strip-head">${Y}</div><div class="bionz-stack-steps">${ee}</div></div>`},m=_(f),M=t.mirai,b=!!(M&&this.miraiEdition==="beginner");this.currentPart=e,this.currentExp=t;const y=M?`
      <div class="mirai-drawer-top">
        <div class="mirai-drawer-meta-pills">
          <span class="mirai-fh-code">${M.fhId}</span>
          <span class="mirai-badge ${M.badge==="量産民主化"?"badge-demo":M.badge==="超知能加速"?"badge-asi":"badge-wish"}">${M.badge}</span>
          <span class="mirai-eta-pill">${M.eta}</span>
        </div>
        <div class="mirai-edition-toggle mirai-drawer-ed-toggle" role="group" aria-label="解説切替">
          <button type="button" class="mirai-ed-btn${this.miraiEdition==="beginner"?" active":""}" data-mirai-ed="beginner">やさしい</button>
          <button type="button" class="mirai-ed-btn${this.miraiEdition==="expert"?" active":""}" data-mirai-ed="expert">専門</button>
        </div>
      </div>`:"",I=M?`
      <div class="mirai-drawer-score-card exp-block-text">
        <div class="mirai-drawer-score-head">
          <div>
            <div class="mirai-score-lbl">FH MIRAI 2028 革新性スコア（科学クリアリング済）</div>
            <div class="mirai-score-sub">物理・量産・優位性・体験・ASI加速の5軸評価</div>
          </div>
          <div class="mirai-score-big">${M.score}<span> / 100</span></div>
        </div>
        <div class="mirai-axes-list">
          ${Ex.map((k,j)=>`
            <div class="mirai-axis-row">
              <span class="mirai-axis-lbl">${k}</span>
              <div class="mirai-axis-track"><div class="mirai-axis-fill" style="width:${M.axes[j]/20*100}%"></div></div>
              <span class="mirai-axis-val">${M.axes[j]}/20</span>
            </div>`).join("")}
        </div>
        <p class="mirai-score-rationale">${M.scoreRationale}</p>
      </div>`:"",A=M&&M.comparisonRows.length>0?`
      <div class="exp-section exp-block-text">
        <div class="exp-section-heading">2026年現行技術 vs 2028年未来技術</div>
        <table class="mirai-compare-table">
          <thead><tr><th>比較項目</th><th>2026現行</th><th>2028未来 (${M.fhId})</th></tr></thead>
          <tbody>
            ${M.comparisonRows.map(k=>`<tr><td><strong>${k.metric}</strong></td><td>${k.current2026}</td><td class="mirai-td-future">${k.future2028}</td></tr>`).join("")}
          </tbody>
        </table>
      </div>`:"",P=M?`
      ${M.glossaryIds.length>0?`<div class="exp-section exp-block-text">
              <div class="exp-section-heading">関連専門用語（別冊113語・タップで辞典表示）</div>
              <div class="mirai-glossary-chips">
                ${M.glossaryIds.map(k=>`<button type="button" class="mirai-gloss-chip" data-mirai-gloss="${k}">#${k} ${wx[k]??"用語解説"}</button>`).join("")}
              </div>
            </div>`:""}
      <div class="mirai-drawer-actions exp-block-text">
        <button type="button" class="mirai-drawer-cta is-primary" data-mirai-open-report="${M.fhId}">Vol.0${M.volume} レポート全文を読む (${this.miraiEdition==="beginner"?"やさしい":"専門"})</button>
        ${M.baselineMode&&this.handlers.onSwitchMode?`<button type="button" class="mirai-drawer-cta" data-mirai-baseline="${M.baselineMode}">現行2026実機 (${M.baselineMode}) と比較</button>`:""}
      </div>
      ${M.sourceUrls.length>0?`<div class="exp-section exp-block-text exp-references-section">
              <div class="exp-section-heading">検証済み一次情報・根拠リンク</div>
              <ul class="mirai-source-list">
                ${M.sourceUrls.map(k=>`<li><a href="${k.url}" target="_blank" rel="noopener noreferrer">${k.label}</a></li>`).join("")}
              </ul>
            </div>`:""}`:"",L=!M&&t.references&&t.references.length>0?`
      <div class="exp-section exp-block-text exp-references-section">
        <div class="exp-section-heading">出典・準拠規格・技術リファレンス</div>
        <ol class="exp-ref-list">
          ${t.references.map((k,j)=>`<li class="exp-ref-item"><span class="exp-ref-idx">[${j+1}]</span><span class="exp-ref-text">${k}</span></li>`).join("")}
        </ol>
      </div>`:"",E=b&&M?M.beginnerTitle:t.title,S=b&&M?`${t.title} ｜ ${t.subtitle}`:t.subtitle;this.latestTitle=E,this.latestSvg=f;const R=b&&M?`
      ${a}
      <p class="exp-summary exp-block-text">${M.beginnerSummary}</p>
      <div class="exp-section exp-block-text">
        <div class="exp-section-heading">やさしくわかる 3つのポイント</div>
        <ul class="exp-list">${M.beginnerPoints.map(k=>`<li>${k}</li>`).join("")}</ul>
      </div>
      <div class="exp-section exp-block-text">
        <div class="exp-section-heading">正直な課題・2028年実用化へのカギ</div>
        <div class="mirai-caution-box">${M.beginnerCaution}</div>
      </div>
      ${A}
      ${I}
      ${P}
    `:`
      ${a}
      <p class="exp-summary exp-block-text">${t.summary}</p>
      <div class="exp-section exp-block-text">
        <div class="exp-section-heading">光学的・科学的原理</div>
        <ul class="exp-list">${r}</ul>
        ${o}
      </div>
      <div class="exp-section exp-block-text">
        <div class="exp-section-heading">${M?"2026.12–2028.12 の技術革新":"最新世代（2024–2026）の技術革新"}</div>
        <div class="exp-innovation">${t.nextGenInnovation}</div>
      </div>
      <div class="exp-section exp-block-text">
        <div class="exp-section-heading">主要物理・設計諸元</div>
        <div class="exp-specs">${s}</div>
      </div>
      ${A}
      ${I}
      ${P}
      ${L}
    `;this.bodyEl.innerHTML=`
      ${y}
      <div class="exp-header-block">
        <div class="exp-category">${t.category}</div>
        <h2 class="exp-title">${E}</h2>
        <div class="exp-subtitle">${S}</div>
      </div>

      <div data-stack-strip-host>${m}</div>

      <div class="schematic-stage exp-diagram-box${v?" is-hd-schematic":""}" data-schematic-box>
        <div class="exp-diagram-content" data-schematic-content role="button" tabindex="0" title="タップしてピンチ拡大・横向き全画面">${f}</div>
        <div class="exp-diagram-mobile-bar">
          <button type="button" class="exp-diagram-action-btn" data-diagram-open-zoom>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            <span>ピンチ拡大表示</span>
          </button>
          <button type="button" class="exp-diagram-action-btn is-primary" data-diagram-open-landscape>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.64-6.36"/><polyline points="21 3 21 9 15 9"/></svg>
            <span>横向き全画面 (90°)</span>
          </button>
        </div>
      </div>

      ${l}
      ${p}
      ${u}

      ${R}
    `;const F=this.bodyEl.querySelector("[data-schematic-box]"),O=this.bodyEl.querySelector("[data-schematic-content]"),V=this.bodyEl.querySelector("[data-stack-strip-host]");!Mn&&F&&O&&ph().then(k=>{i!==this.renderSeq||!F.isConnected||(this.latestSvg=k(t.diagramType),O.innerHTML=this.latestSvg,F.classList.toggle("is-hd-schematic",x(this.latestSvg)),V&&(V.innerHTML=_(this.latestSvg)))});const K=(k=!1)=>{this.latestSvg&&this.openLightbox(E,this.latestSvg,k)};O?.addEventListener("click",()=>K(!1)),O?.addEventListener("keydown",k=>{(k.key==="Enter"||k.key===" ")&&(k.preventDefault(),K(!1))}),this.bodyEl.querySelector("[data-diagram-open-zoom]")?.addEventListener("click",()=>K(!1)),this.bodyEl.querySelector("[data-diagram-open-landscape]")?.addEventListener("click",()=>K(!0)),this.bodyEl.querySelectorAll("[data-mirai-ed]").forEach(k=>{k.addEventListener("click",()=>{const j=k.dataset.miraiEd==="expert"?"expert":"beginner";this.setMiraiEdition(j,!0)})}),this.bodyEl.querySelectorAll("[data-mirai-gloss]").forEach(k=>{k.addEventListener("click",()=>{const j=k.dataset.miraiGloss;j&&this.handlers.onOpenMiraiGlossary?.(j)})}),this.bodyEl.querySelector("[data-mirai-open-report]")?.addEventListener("click",k=>{const j=k.currentTarget.dataset.miraiOpenReport;j&&this.handlers.onOpenMiraiReport?.(j)}),this.bodyEl.querySelector("[data-mirai-baseline]")?.addEventListener("click",k=>{const j=k.currentTarget.dataset.miraiBaseline;j&&this.handlers.onSwitchMode?.(j)});const z=this.bodyEl.querySelector("[data-open-optics-motion]");z&&this.handlers.onOpenOpticsMotion&&z.addEventListener("click",()=>{this.handlers.onOpenOpticsMotion?.(Ax(e.id),e.id)});const q=this.bodyEl.querySelector("[data-switch-fab-vol]");q&&d&&this.handlers.onSwitchFabVolume&&q.addEventListener("click",()=>{this.handlers.onSwitchFabVolume?.(d.targetVol)});const N=this.bodyEl.querySelector("[data-switch-mode]");N&&h&&this.handlers.onSwitchMode&&N.addEventListener("click",()=>{this.handlers.onSwitchMode?.(h.target)}),this.bodyEl.scrollTop=0}getMiraiEdition(){return this.miraiEdition}setMiraiEdition(e,t=!1){const i=this.miraiEdition!==e;this.miraiEdition=e;try{window.localStorage.setItem(fh,e)}catch{}if(t&&this.handlers.onMiraiEditionChange?.(e),i&&this.currentPart&&this.currentExp&&this.drawerEl.classList.contains("is-open")){const s=++this.renderSeq;this.renderPopulatedPart(this.currentPart,this.currentExp,s)}}show(e,t){const i=++this.renderSeq;if(this.swatchEl.style.backgroundColor=e.swatchColor,this.isolateBtn.classList.toggle("is-active",t),this.drawerEl.classList.add("is-open"),this.drawerEl.setAttribute("aria-hidden","false"),!mu(e.explanation)){this.renderPopulatedPart(e,e.explanation,i);return}Promise.all([Sx(e),ph()]).then(([s])=>{i!==this.renderSeq||!this.drawerEl.classList.contains("is-open")||this.renderPopulatedPart(e,s,i)})}setIsolatedState(e){this.isolateBtn.classList.toggle("is-active",e)}hide(){this.renderSeq++,this.closeLightbox(),this.drawerEl.classList.remove("is-open"),this.drawerEl.setAttribute("aria-hidden","true"),window.setTimeout(()=>{this.drawerEl.classList.contains("is-open")||this.bodyEl.replaceChildren()},360)}}function qi(n=3){return new Promise(e=>{let t=0;const i=()=>{t++,t>=n?e():requestAnimationFrame(i)};requestAnimationFrame(i)})}class Cx{host;constructor(e){this.host=e}async waitUnitReady(e=15e3){const t=performance.now();for(;!this.host.isUnitReady()&&performance.now()-t<e;)await new Promise(i=>setTimeout(i,12));await qi(1)}async waitSchematicHydrated(e=8e3){const t=performance.now();for(;performance.now()-t<e;){const i=this.host.appRoot.querySelector(".schematic-stage .exp-diagram-content");if(i&&i.querySelector("svg"))break;await new Promise(s=>setTimeout(s,15))}await qi(1)}async captureDirectCanvasDataUrl(e="png",t=.92){const i=this.host.appRoot.querySelector("#viewport canvas");if(!i)return null;this.host.requestRenderFrame(),await qi(1);const s=e==="webp"?"image/webp":e==="jpeg"?"image/jpeg":"image/png";return i.toDataURL(s,t)}measureClip(e){if(!e)return null;const t=this.host.appRoot.querySelector(e);if(!t)return null;const i=t.getBoundingClientRect();if(i.width<2||i.height<2)return null;const s=4,r=Math.max(0,Math.floor(i.left-s)),a=Math.max(0,Math.floor(i.top-s)),o=Math.min(window.innerWidth,Math.ceil(i.right+s)),l=Math.min(window.innerHeight,Math.ceil(i.bottom+s));return{x:r,y:a,width:Math.max(1,o-r),height:Math.max(1,l-a)}}reset(){const e=this.host.appRoot;delete e.dataset.captureMode,delete e.dataset.captureCad,delete e.dataset.captureUi,delete e.dataset.captureDrawer,delete e.dataset.captureDiagram,delete e.dataset.capturePerf,this.host.setLightboxOpen(!1,!1),this.host.setDrawerViewTab("all"),this.host.requestRenderFrame()}async prepare(e,t={}){const i=performance.now(),s=this.host.appRoot;t.playground?await this.host.openPlayground(!!t.playgroundReport):this.host.closePlayground(),t.miraiStudioTab&&this.host.openMiraiStudio?await this.host.openMiraiStudio(t.miraiStudioTab):this.host.closeMiraiStudio&&this.host.closeMiraiStudio(),t.quality&&t.quality!==this.host.getQuality()&&this.host.setQuality(t.quality),typeof t.miraiSubView=="number"&&this.host.setMiraiSubView&&this.host.setMiraiSubView(t.miraiSubView,!0),t.unit&&t.unit!==this.host.getMode()&&this.host.setMode(t.unit,!0),t.playground||await this.waitUnitReady(),typeof t.miraiSubView=="number"&&this.host.setMiraiSubView&&(this.host.setMiraiSubView(t.miraiSubView,!0),await qi(1)),t.miraiEdition&&this.host.setMiraiEdition&&this.host.setMiraiEdition(t.miraiEdition),typeof t.explode=="number"&&this.host.setExplode(t.explode,!0),t.renderMode&&this.host.setRenderMode(t.renderMode),t.preset&&this.host.setCameraPreset(t.preset,!0),typeof t.showPerfHud=="boolean"&&this.host.setPerfHudVisible(t.showPerfHud),this.reset(),s.dataset.captureMode=e;let r=t.clipSelector??null;if(e==="ui")s.dataset.captureCad="0",s.dataset.captureUi="1",s.dataset.captureDrawer=t.showDrawer?"1":"0",t.partId?this.host.selectPart(t.partId,!1):t.showDrawer||this.host.selectPart(null,!1);else if(e==="cad")s.dataset.captureCad="1",s.dataset.captureUi="0",s.dataset.captureDrawer="0",s.dataset.capturePerf="0",this.host.selectPart(null,!1);else if(e==="diagram"){s.dataset.captureCad="0",s.dataset.captureUi="0",s.dataset.captureDrawer="1",s.dataset.captureDiagram="1";const a=t.partId??this.host.getSelectedPartId()??this.host.getFirstPartId();a&&this.host.selectPart(a,!1),this.host.setDrawerViewTab("diagram"),await this.waitSchematicHydrated();const o=this.host.appRoot.querySelector(".explanation-drawer .drawer-body");o&&(o.scrollTop=0),t.showLightbox?(this.host.setLightboxOpen(!0,!!t.lightboxRotate),await qi(3),r=r??".schematic-lightbox-panel"):(await qi(3),r=r??".schematic-stage")}else if(e==="explanation"){s.dataset.captureCad="0",s.dataset.captureUi="0",s.dataset.captureDrawer="1";const a=t.partId??this.host.getSelectedPartId()??this.host.getFirstPartId();a&&this.host.selectPart(a,!1),this.host.setDrawerViewTab(t.drawerTab??"explanation");const o=this.host.appRoot.querySelector(".explanation-drawer .drawer-body");o&&(o.scrollTop=0),await qi(3),r=r??".explanation-drawer"}else e==="full"?(s.dataset.captureCad="1",s.dataset.captureUi="1",s.dataset.captureDrawer="1",t.partId?(this.host.selectPart(t.partId,!1),t.drawerTab&&this.host.setDrawerViewTab(t.drawerTab),await this.waitSchematicHydrated()):t.partId===null&&this.host.selectPart(null,!1),t.showLightbox&&this.host.setLightboxOpen(!0,!!t.lightboxRotate)):e==="custom"&&(s.dataset.captureCad=t.showCad===!1?"0":"1",s.dataset.captureUi=t.showUi===!1?"0":"1",s.dataset.captureDrawer=t.showDrawer===!1?"0":"1",s.dataset.capturePerf=t.showPerfHud===!1?"0":"1",t.partId?(this.host.selectPart(t.partId,!1),t.drawerTab&&this.host.setDrawerViewTab(t.drawerTab),await this.waitSchematicHydrated()):t.partId===null&&this.host.selectPart(null,!1),t.showLightbox&&this.host.setLightboxOpen(!0,!!t.lightboxRotate));return this.host.requestRenderFrame(),await qi(e==="cad"?1:2),{mode:e,clip:this.measureClip(r),activeUnit:this.host.getMode(),activeQuality:this.host.getQuality(),selectedPartId:this.host.getSelectedPartId(),readyMs:Math.round(performance.now()-i)}}}const Mi=document.getElementById("app"),Rx=document.getElementById("viewport");let An=null,pi="off",xi=!1,vi,g,c,_i=null,io=null,Nr=!1,Yt=null,no=null,Ki=null,so=null;const el=n=>{g.syncOpticsStudio(n),n?(c.setMode("lens",!0),g.syncMode("lens"),g.syncOpticsStudio(!0),c.setExplode(0),g.setExplodeValue(0),c.setPhysicsActive(!0),g.syncPhysics(!0),c.frameLensForOpticsStudio(!1),B()):(c.getMode()==="lens"&&(c.refreshVisibility(),g.syncLensSection(c.getLensSection()),c.setCameraPreset("iso",!1),B()),c.requestRenderFrame())},Ix=()=>_i?Promise.resolve(_i):(io||(io=le(()=>import("./LensOpticsStudio-BnMZWxWk.js"),[],import.meta.url).then(n=>(_i=new n.LensOpticsStudio(Mi,{onOpenChange:el,onHoverPart:e=>{An=e,c.setHoveredPartFromUI(e),g.syncHighlight(c.getSelectedPart()?.id??null,An)},onSelectPart:e=>{c.selectPart(e,!1)},onRequestRenderFrame:()=>{c.requestRenderFrame()}}),_i))),io),lt={getIsOpen:()=>_i?_i.getIsOpen():Nr||mi.studioOpen,open:(n,e)=>{const t=e??void 0;if(_i){_i.open(n,t);return}Nr=!0,n&&mi.setScenario(n),e!==void 0&&mi.setHoveredElement(e),mi.setStudioOpen(!0),el(!0),Ix().then(i=>{Nr&&i.open(n,t)})},close:()=>{Nr=!1,_i?_i.close():mi.studioOpen&&(mi.setStudioOpen(!1),el(!1))},toggle:()=>{lt.getIsOpen()?lt.close():lt.open()}},Sn=()=>{const n=document;return!!(document.fullscreenElement||n.webkitFullscreenElement)},as=()=>{const n=Sn()||xi;Mi.classList.toggle("is-zen-fullscreen",xi),g.syncFullscreen(n),c.handleResize()},_l=async()=>{const n=document,e=document.documentElement;if(Sn()){try{document.exitFullscreen?await document.exitFullscreen():n.webkitExitFullscreen&&await n.webkitExitFullscreen()}catch{}xi=!1,as();return}if(xi){xi=!1,as();return}let t=!1;try{document.fullscreenEnabled!==!1&&e.requestFullscreen?(await e.requestFullscreen(),t=Sn()):e.webkitRequestFullscreen&&(await e.webkitRequestFullscreen(),t=Sn())}catch{t=!1}t||(xi=!0),as()},B=()=>{const n=c.getPartsForCurrentMode(),e=c.getSelectedPart()?.id??null;g.renderLayerRail(n,e,An,t=>c.isPartHidden(t),c.hasAnyHidden())};c=new xx(Rx,{onSelectPart:n=>{Mi.classList.toggle("has-drawer",!!n),n?vi.show(n,c.isIsolated()):vi.hide(),B()},onHoverPart:n=>{An=n,mi.setHoveredElement(n),g.syncHighlight(c.getSelectedPart()?.id??null,An)},onVisibilityChanged:()=>{vi.setIsolatedState(c.isIsolated()),B()},onQualityChanged:n=>{g&&g.syncQuality(n)}});g=new yx(Mi,{onModeChange:n=>{n!=="lens"&&n!=="integrated"&&lt.getIsOpen()&&lt.close(),c.setMode(n),g.syncLensSection(c.getLensSection()),g.setExplodeValue(c.getExplode()),B()},onLensSectionChange:n=>{lt.getIsOpen()&&lt.close(),c.setLensSection(n),B()},onSensorFabVolumeChange:n=>{c.setSensorFabVolume(n,!1),g.syncFabVolume(n),g.syncFabStage(n===0?"overview":n===1?"v1_overview":n===2?"v2_overview":n===3?"v3_overview":n===4?"v4_overview":"v5_overview"),B()},onSensorFabStageChange:n=>{c.focusSensorFabStage(n,!1)},onExplodeChange:n=>{c.setExplode(n)},onSectionAxisChange:n=>{pi=n,c.setSection(n)},onSectionValueChange:n=>{c.setSection(pi,n)},onRenderModeChange:n=>{c.setRenderMode(n)},onQualityChange:n=>{c.setQuality(n)},onPhysicsToggle:n=>{c.setPhysicsActive(n)},onOpticsStudioToggle:()=>{lt.toggle()},onOpenPlayground:()=>{ps.open()},onMiraiSubViewChange:n=>{c.setMiraiSubView(n,!1),g.syncMiraiSubView(c.getMiraiSubView()),B()},onOpenMiraiStudio:n=>{yi.open({tab:n})},onResetVisibility:()=>{c.resetAllVisibility()},onFullscreenToggle:()=>{_l()},onCameraPreset:n=>{c.setCameraPreset(n)},onSelectPart:n=>{(c.getSelectedPart()?.id??null)===n?c.selectPart(null,!1):c.selectPart(n,!lt.getIsOpen())},onHoverPart:n=>{An=n,mi.setHoveredElement(n),c.setHoveredPartFromUI(n),g.syncHighlight(c.getSelectedPart()?.id??null,An)},onToggleHidePart:n=>{c.togglePartHidden(n)}});const mh=()=>Yt?Promise.resolve(Yt):(no||(no=le(()=>import("./CadPlaygroundStudio-BSWt1Rib.js"),__vite__mapDeps([78,3]),import.meta.url).then(n=>(Yt=new n.CadPlaygroundStudio(Mi,{renderer:c.getRenderer(),container:c.getContainer(),setCustomSceneRenderer:e=>c.setCustomSceneRenderer(e),requestRender:()=>c.requestRenderFrame(),onClosePlayground:()=>{Mi.classList.remove("is-playground"),g.syncPlaygroundActive(!1),c.handleResize()}}),Yt))),no),ps={isOpen:()=>Yt?.isOpen()??!1,open:async(n=!1)=>{lt.getIsOpen()&&lt.close(),c.selectPart(null,!1);const e=await mh();Mi.classList.add("is-playground"),g.syncPlaygroundActive(!0),await e.open(),n&&e.openEvaluationReport()},close:()=>{Yt?.close(),Mi.classList.remove("is-playground"),g.syncPlaygroundActive(!1)},evaluate:()=>Yt?.openEvaluationReport()??null,runPlya:(n=!0)=>Yt?.runPlyaPipeline(n)??null,getPlaced:()=>Yt?.getPlacedSummary()??[],movePart:(n,e,t,i)=>Yt?.movePartByUid(n,e,t,i)??!1,setProfile:n=>Yt?.setDesignProfile(n)??null,loadTemplate:async n=>{await(await mh()).loadTemplate(n)},setCameraView:n=>Yt?.setCameraView(n),setShadingMode:n=>Yt?.setShadingMode(n)},Lx=()=>Ki?Promise.resolve(Ki):(so||(so=le(()=>import("./MiraiLibraryStudio-DncoUr1n.js"),[],import.meta.url).then(n=>(Ki=new n.MiraiLibraryStudio({onJumpTo3d:e=>{lt.getIsOpen()&&lt.close(),c.setMiraiSubView(e,!0),c.setMode("mirai_2028",!0),c.setMiraiSubView(e,!0),g.syncMode("mirai_2028"),g.syncMiraiSubView(e),g.setExplodeValue(c.getExplode()),B()},onJumpToBaseline:e=>{lt.getIsOpen()&&lt.close(),c.setMode(e,!0),g.syncMode(e),g.setExplodeValue(c.getExplode()),B()},onEditionChange:e=>{vi.setMiraiEdition(e,!1)}}),Ki))),so),yi={isOpen:()=>Ki?.isOpen()??!1,open:async n=>{await(await Lx()).open({...n,edition:n?.edition??vi.getMiraiEdition()})},close:()=>{Ki?.close()},setEdition:n=>{vi.setMiraiEdition(n,!1),Ki?.setEdition(n,!1)}};vi=new Px(Mi,{onClose:()=>c.selectPart(null,!1),onPrev:()=>c.stepSelectedPart(-1),onNext:()=>c.stepSelectedPart(1),onToggleIsolate:()=>c.toggleIsolateSelected(),onHideCurrent:()=>{const n=c.getSelectedPart();n&&c.togglePartHidden(n.id)},onOpenOpticsMotion:(n,e)=>{c.selectPart(null,!1),lt.open(n,e)},onSwitchMode:n=>{lt.getIsOpen()&&lt.close(),c.setMode(n),g.syncMode(n),g.setExplodeValue(c.getExplode()),B()},onSwitchFabVolume:n=>{c.setMode("sensor_fab",!1),c.setSensorFabVolume(n,!1),g.syncFabVolume(n),g.syncFabStage(n===0?"overview":n===1?"v1_overview":n===2?"v2_overview":n===3?"v3_overview":n===4?"v4_overview":"v5_overview"),g.syncMode("sensor_fab"),B()},onOpenMiraiReport:n=>{yi.open({tab:"reports",fhId:n})},onOpenMiraiGlossary:n=>{yi.open({tab:"glossary",glossaryId:n})},onMiraiEditionChange:n=>{Ki?.setEdition(n,!1)}});document.addEventListener("fullscreenchange",()=>{Sn()||(xi=!1),as()});document.addEventListener("webkitfullscreenchange",()=>{Sn()||(xi=!1),as()});const xl=new URLSearchParams(window.location.search),Dx=n=>{if(!n.isTrusted||Sn()||document.fullscreenEnabled===!1||xl.has("pp")||window.__PP_CAPTURE__)return;const t=n.target?.tagName;if(t==="INPUT"||t==="SELECT"||t==="TEXTAREA"||t==="OPTION")return;const i=document.documentElement;try{const s=i.requestFullscreen?i.requestFullscreen():i.webkitRequestFullscreen?.();s&&typeof s.catch=="function"&&s.catch(()=>{})}catch{}};window.addEventListener("pointerdown",Dx,{capture:!0,passive:!0});const bn=n=>{c.setQuality(n),g.syncQuality(c.getQuality())};window.addEventListener("keydown",n=>{if(!(ps.isOpen()||yi.isOpen()))if(n.key==="Escape")xi&&(xi=!1,as()),c.getSelectedPart()?c.selectPart(null,!1):lt.getIsOpen()&&lt.close();else if((n.key==="1"||n.key==="2"||n.key==="3")&&c.getMode()==="lens"&&!lt.getIsOpen()&&!n.ctrlKey&&!n.metaKey&&!n.altKey){const e=Number(n.key);c.setLensSection(e),g.syncLensSection(e),B()}else if((n.key==="1"||n.key==="2"||n.key==="3"||n.key==="4"||n.key==="5")&&c.getMode()==="mirai_2028"&&!n.ctrlKey&&!n.metaKey&&!n.altKey){const e=Number(n.key);c.setMiraiSubView(e,!1),g.syncMiraiSubView(e),B()}else if((n.key==="v"||n.key==="V")&&!n.ctrlKey&&!n.metaKey&&!n.altKey){const e=c.getMode(),t=e==="micro"?"micro_v2":e==="micro_v2"?"micro":e==="bionz"?"bionz_v2":e==="bionz_v2"?"bionz":null;t&&(c.setMode(t),g.syncMode(t),g.setExplodeValue(c.getExplode()),B())}else if((n.key==="f"||n.key==="F")&&!n.ctrlKey&&!n.metaKey&&!n.altKey)_l();else if((n.key==="u"||n.key==="U")&&!n.ctrlKey&&!n.metaKey&&!n.altKey){const t=c.getQuality()==="ultra"?"standard_lite":"ultra";bn(t)}else(n.key==="p"||n.key==="P")&&c.isV2Mode()&&!n.ctrlKey&&!n.metaKey&&!n.altKey?c.getV2Runtime().togglePerfHud():n.key==="ArrowDown"||n.key==="ArrowRight"?c.getSelectedPart()&&c.stepSelectedPart(1):(n.key==="ArrowUp"||n.key==="ArrowLeft")&&c.getSelectedPart()&&c.stepSelectedPart(-1)});const pn=xl.get("quality")?.toLowerCase();pn==="standard_lite"||pn==="lite"||pn==="std_lite"?bn("standard_lite"):pn==="standard"||pn==="std"?bn("standard"):pn==="high"?bn("high"):pn==="ultra"?bn("ultra"):g.syncQuality(c.getQuality());const gh={getDiagnostics:()=>c.getV2Runtime().getDiagnostics(),togglePerfHud:()=>c.getV2Runtime().togglePerfHud(),setPerfHudVisible:n=>c.getV2Runtime().setPerfHudVisible(n),isV2Mode:()=>c.isV2Mode()},_h=new Cx({appRoot:Mi,setMode:(n,e)=>{c.setMode(n,e),g.syncMode(n),B()},getMode:()=>c.getMode(),setQuality:n=>bn(n),getQuality:()=>c.getQuality(),setRenderMode:n=>c.setRenderMode(n),setExplode:(n,e)=>{c.setExplode(n,e),g.setExplodeValue(n)},setCameraPreset:(n,e)=>c.setCameraPreset(n,e),selectPart:(n,e)=>c.selectPart(n,e),getFirstPartId:()=>c.getPartsForCurrentMode()[0]?.id??null,getSelectedPartId:()=>c.getSelectedPart()?.id??null,isUnitReady:()=>c.getV2Runtime().isReady(),setPerfHudVisible:n=>c.getV2Runtime().setPerfHudVisible(n),setDrawerViewTab:n=>vi.setViewTab(n),setLightboxOpen:(n,e)=>vi.setLightboxOpen(n,e),openPlayground:n=>ps.open(n),closePlayground:()=>ps.close(),setMiraiSubView:(n,e)=>{c.setMiraiSubView(n,e),g.syncMiraiSubView(n),B()},setMiraiEdition:n=>yi.setEdition(n),openMiraiStudio:n=>yi.open({tab:n}),closeMiraiStudio:()=>yi.close(),requestRenderFrame:()=>c.requestRenderFrame()});window.__cad={viewport:c,controls:g,drawer:vi,opticsStudio:lt,playground:ps,miraiStudio:yi,pp:_h,capture:_h,toggleFullscreen:_l,setQuality:bn,v2:gh,mishoeV2:gh};B();const H=xl.get("preset");H==="welcome"?(c.setMode("welcome",!0),g.syncMode("welcome"),c.setExplode(0,!0),g.setExplodeValue(0),c.setCameraPreset("iso",!0),B()):H==="playground"?ps.open(!1):H==="complete_assembled"?(c.setMode("integrated",!0),g.syncMode("integrated"),c.setExplode(0,!0),g.setExplodeValue(0),c.setCameraPreset("iso",!0),B()):H==="complete_back"?(c.setMode("integrated",!0),g.syncMode("integrated"),c.setExplode(0,!0),g.setExplodeValue(0),c.setCameraPreset("back",!0),B()):H==="complete_exploded"?(c.setMode("integrated",!0),g.syncMode("integrated"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="complete_section"?(c.setMode("integrated",!0),g.syncMode("integrated"),c.setExplode(0,!0),pi="x",c.setSection("x",.54),g.syncSectionAxis("x",.54),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="camera_body_assembled"?(c.setMode("camera_body",!0),g.syncMode("camera_body"),c.setExplode(0,!0),g.setExplodeValue(0),c.setCameraPreset("iso",!0),B()):H==="camera_body_exploded"?(c.setMode("camera_body",!0),g.syncMode("camera_body"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="lens_assembled"?(c.setMode("lens",!0),g.syncMode("lens"),c.setExplode(0,!0),g.setExplodeValue(0),c.setCameraPreset("iso",!0),B()):H==="lens_exploded"?(c.setMode("lens",!0),g.syncMode("lens"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="lens_drawer"?(c.setMode("lens",!0),g.syncMode("lens"),c.setExplode(.88,!0),g.setExplodeValue(.88),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("lens-xd-motors",!1),B()):H==="lens_super_drawer"?(c.setMode("lens",!0),g.syncMode("lens"),c.setExplode(.92,!0),g.setExplodeValue(.92),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("lens-mcu-pcb",!1),B()):H==="lens_ultra_drawer"?(c.setMode("lens",!0),g.syncMode("lens"),c.setExplode(.92,!0),g.setExplodeValue(.92),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("lens-bayonet-shims",!1),B()):H==="lens_ultra62_exploded"?(c.setMode("lens",!0),g.syncMode("lens"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="lens_ultra62_drawer"?(c.setMode("lens",!0),g.syncMode("lens"),c.setExplode(.9,!0),g.setExplodeValue(.9),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("lens-front-tilt-shims",!1),B()):H==="lens_optics_motion"?(lt.open("aperture_bokeh"),c.frameLensForOpticsStudio(!0)):H==="lens_optics_floating"?(lt.open("floating_xd"),c.frameLensForOpticsStudio(!0)):H==="lens_optics_ed"?(lt.open("ed_chromatic"),c.frameLensForOpticsStudio(!0)):H==="lens_optics_xa"?(lt.open("xa_aspheric"),c.frameLensForOpticsStudio(!0)):H==="lens_optics_nano"?(lt.open("nano_ar_baffle"),c.frameLensForOpticsStudio(!0)):H==="sensor_super_drawer"?(c.setMode("sensor",!0),g.syncMode("sensor"),c.setExplode(.92,!0),g.setExplodeValue(.92),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("sensor-hall-pcb",!1),B()):H==="lcd_assembled"?(c.setMode("lcd",!0),g.syncMode("lcd"),c.setExplode(0,!0),g.setExplodeValue(0),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="lcd_exploded"?(c.setMode("lcd",!0),g.syncMode("lcd"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="lcd_drawer"?(c.setMode("lcd",!0),g.syncMode("lcd"),c.setExplode(.85,!0),g.setExplodeValue(.85),c.setCameraPreset("iso",!0),c.selectPart("lcd-4axis-tilt-frame",!1),B()):H==="body_assembled"?(c.setMode("body",!0),g.syncMode("body"),c.setExplode(0,!0),g.setExplodeValue(0),c.setCameraPreset("iso",!0),B()):H==="body_exploded"?(c.setMode("body",!0),g.syncMode("body"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="body_drawer"?(c.setMode("body",!0),g.syncMode("body"),c.setExplode(.88,!0),g.setExplodeValue(.88),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("body-battery-pack",!1),B()):H==="body_ultra_drawer"?(c.setMode("body",!0),g.syncMode("body"),c.setExplode(.92,!0),g.setExplodeValue(.92),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("body-card-ejectors",!1),B()):H==="shutter_ultra_drawer"?(c.setMode("shutter",!0),g.syncMode("shutter"),c.setExplode(.92,!0),g.setExplodeValue(.92),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("shutter-counterweight",!1),B()):H==="lcd_ultra_drawer"?(c.setMode("lcd",!0),g.syncMode("lcd"),c.setExplode(.92,!0),g.setExplodeValue(.92),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("lcd-swivel-clutch",!1),B()):H==="mount_assembled"?(c.setMode("mount",!0),g.syncMode("mount"),c.setExplode(0,!0),g.setExplodeValue(0),c.setCameraPreset("iso",!0),B()):H==="mount_exploded"?(c.setMode("mount",!0),g.syncMode("mount"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="mount_section"?(c.setMode("mount",!0),g.syncMode("mount"),c.setExplode(0,!0),pi="x",c.setSection("x",.52),g.syncSectionAxis("x",.52),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="mount_drawer"?(c.setMode("mount",!0),g.syncMode("mount"),c.setExplode(.85,!0),g.setExplodeValue(.85),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("mount-flange-ring",!1),B()):H==="mount_contacts_drawer"?(c.setMode("mount",!0),g.syncMode("mount"),c.setExplode(.88,!0),g.setExplodeValue(.88),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("mount-contact-pins",!1),B()):H==="evf_assembled"?(c.setMode("evf",!0),g.syncMode("evf"),c.setExplode(0,!0),g.setExplodeValue(0),c.setCameraPreset("iso",!0),B()):H==="evf_exploded"?(c.setMode("evf",!0),g.syncMode("evf"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="evf_section"?(c.setMode("evf",!0),g.syncMode("evf"),c.setExplode(0,!0),pi="x",c.setSection("x",.52),g.syncSectionAxis("x",.52),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="evf_drawer"?(c.setMode("evf",!0),g.syncMode("evf"),c.setExplode(.88,!0),g.setExplodeValue(.88),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("evf-oled-panel",!1),B()):H==="evf_eye_af_drawer"?(c.setMode("evf",!0),g.syncMode("evf"),c.setExplode(.85,!0),g.setExplodeValue(.85),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("evf-dichroic-mirror",!1),B()):H==="mainboard_exploded"?(c.setMode("mainboard",!0),g.syncMode("mainboard"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="mainboard_section"?(c.setMode("mainboard",!0),g.syncMode("mainboard"),c.setExplode(0,!0),pi="x",c.setSection("x",.54),g.syncSectionAxis("x",.54),c.setCameraPreset("iso",!0),B()):H==="mainboard_drawer"?(c.setMode("mainboard",!0),g.syncMode("mainboard"),c.setExplode(.85,!0),g.setExplodeValue(.85),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("mb-isp-die",!1),B()):H==="mainboard_npu_drawer"?(c.setMode("mainboard",!0),g.syncMode("mainboard"),c.setExplode(.82,!0),g.setExplodeValue(.82),c.setCameraPreset("iso",!0),c.selectPart("mb-ai-npu",!1),B()):H==="mainboard_back"?(c.setMode("mainboard",!0),g.syncMode("mainboard"),c.setExplode(.65,!0),g.setExplodeValue(.65),c.setCameraPreset("back",!0),B()):H==="shutter_assembled"?(c.setMode("shutter",!0),g.syncMode("shutter"),c.setExplode(0,!0),c.setCameraPreset("iso",!0),B()):H==="shutter_exploded"?(c.setMode("shutter",!0),g.syncMode("shutter"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="shutter_section"?(c.setMode("shutter",!0),g.syncMode("shutter"),c.setExplode(0,!0),pi="x",c.setSection("x",.56),g.syncSectionAxis("x",.56),c.setCameraPreset("iso",!0),B()):H==="shutter_drawer"?(c.setMode("shutter",!0),g.syncMode("shutter"),c.setExplode(.82,!0),g.setExplodeValue(.82),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("shutter-curtain-2",!1),B()):H==="integrated_exploded"?(c.setMode("integrated",!0),g.syncMode("integrated"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="integrated_assembled"?(c.setMode("integrated",!0),g.syncMode("integrated"),c.setExplode(0,!0),g.setExplodeValue(0),c.setCameraPreset("iso",!0),B()):H==="sensor_exploded"||H==="exploded"?(c.setMode("sensor",!0),g.syncMode("sensor"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="back"?(c.setMode("sensor",!0),g.syncMode("sensor"),c.setExplode(.72,!0),g.setExplodeValue(.72),c.setCameraPreset("back",!0),B()):H==="section"?(c.setMode("sensor",!0),g.syncMode("sensor"),c.setExplode(0,!0),pi="x",c.setSection("x",.48),g.syncSectionAxis("x",.48),c.setCameraPreset("iso",!0),B()):H==="drawer"?(c.setMode("sensor",!0),g.syncMode("sensor"),c.setExplode(.82,!0),g.setExplodeValue(.82),c.setCameraPreset("iso",!0),c.selectPart("cmos-die",!1),B()):H==="micro"?(c.setMode("micro",!0),g.syncMode("micro"),c.setExplode(.72,!0),g.setExplodeValue(.72),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="micro_drawer"?(c.setMode("micro",!0),g.syncMode("micro"),c.setExplode(.65,!0),g.setExplodeValue(.65),c.setCameraPreset("iso",!0),c.selectPart("micro-2layer-gs",!1),B()):H==="phase11_mount"?(c.setMode("mount",!0),g.syncMode("mount"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("mount-esd-ground-clips",!1),B()):H==="phase11_sensor"?(c.setMode("sensor",!0),g.syncMode("sensor"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("sensor-dram-wafer",!1),B()):H==="phase11_micro"?(c.setMode("micro",!0),g.syncMode("micro"),c.setExplode(.85,!0),g.setExplodeValue(.85),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("micro-fdti-doping",!1),B()):H==="phase11_shutter"?(c.setMode("shutter",!0),g.syncMode("shutter"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("shutter-x-sync-contact",!1),B()):H==="phase11_evf"?(c.setMode("evf",!0),g.syncMode("evf"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("evf-oled-mla-stack",!1),B()):H==="phase11_lcd"?(c.setMode("lcd",!0),g.syncMode("lcd"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("lcd-lgp-led-bar",!1),B()):H==="phase11_lens"?(c.setMode("lens",!0),g.syncMode("lens"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("lens-mr-magnet-scales",!1),B()):H==="phase12_mainboard"?(c.setMode("mainboard",!0),g.syncMode("mainboard"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("mb-hdmi-daughterboard",!1),B()):H==="phase12_body"?(c.setMode("body",!0),g.syncMode("body"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("body-evf-tie-bracket",!1),B()):H==="phase12_micro"?(c.setMode("micro",!0),g.syncMode("micro"),c.setExplode(.9,!0),g.setExplodeValue(.9),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("micro-lofic-cap",!1),B()):H==="phase13_mount"?(c.setMode("mount",!0),g.syncMode("mount"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("mount-im-adjust-washer",!1),B()):H==="phase13_shutter"?(c.setMode("shutter",!0),g.syncMode("shutter"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("shutter-mb-floating-shaft",!1),B()):H==="phase13_body"?(c.setMode("body",!0),g.syncMode("body"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("body-gyro-sensor-unit",!1),B()):H==="phase14_sensor"?(c.setMode("sensor",!0),g.syncMode("sensor"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("sensor-imager-fix-shafts",!1),B()):H==="phase14_micro"?(c.setMode("micro",!0),g.syncMode("micro"),c.setExplode(.92,!0),g.setExplodeValue(.92),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("micro-fd-dcg-switch",!1),B()):H==="phase15_lcd"?(c.setMode("lcd",!0),g.syncMode("lcd"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("lcd-fine-coaxial-bundle",!1),B()):H==="phase34_lcd"?(c.setMode("lcd",!0),g.syncMode("lcd"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("lcd-tandem-oled-stack",!1),B()):H==="phase35_lcd"?(c.setMode("lcd",!0),g.syncMode("lcd"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("lcd-microled-gan-array",!1),B()):H==="phase16_mainboard"?(c.setMode("mainboard",!0),g.syncMode("mainboard"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("mb-vc-evaporator-plate",!1),B()):H==="phase16_evf"?(c.setMode("evf",!0),g.syncMode("evf"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("evf-oem-finder-cover",!1),B()):H==="phase16_body"?(c.setMode("body",!0),g.syncMode("body"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("body-dl1008-rtc-flex",!1),B()):H==="phase17_shutter"?(c.setMode("shutter",!0),g.syncMode("shutter"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("shutter-rivet-reinforce-collars",!1),B()):H==="phase34_shutter"?(c.setMode("shutter",!0),g.syncMode("shutter"),c.setExplode(.96,!0),g.setExplodeValue(.96),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("shutter-coaxial-friction-brake",!1),B()):H==="phase36_shutter"?(c.setMode("shutter",!0),g.syncMode("shutter"),c.setExplode(.96,!0),g.setExplodeValue(.96),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("shutter-eddy-current-self-brake",!1),B()):H==="phase18_lens"?(c.setMode("lens",!0),c.setLensSection(3,!0),g.syncMode("lens"),g.syncLensSection(3),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("lens-nano-ar-ii-layer",!1),B()):H==="phase18_mount"?(c.setMode("mount",!0),g.syncMode("mount"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("mount-bayonet-leadin-dlc",!1),B()):H==="phase19_lens_s1"?(c.setMode("lens",!0),c.setLensSection(1,!0),g.syncMode("lens"),g.syncLensSection(1),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("lens-iris-click-wedge-lever",!1),B()):H==="phase19_lens_s2"?(c.setMode("lens",!0),c.setLensSection(2,!0),g.syncMode("lens"),g.syncLensSection(2),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("lens-mid-block-core-frame",!1),B()):H==="phase19_lens_s3"?(c.setMode("lens",!0),c.setLensSection(3,!0),g.syncMode("lens"),g.syncLensSection(3),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("lens-hood-release-lock-pin",!1),B()):H==="phase19_micro"?(c.setMode("micro",!0),g.syncMode("micro"),c.setExplode(.92,!0),g.setExplodeValue(.92),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("micro-column-cds-sh",!1),B()):H==="phase19_sensor"?(c.setMode("sensor",!0),g.syncMode("sensor"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("sensor-birefringent-olpf",!1),B()):H==="phase19_mainboard"?(c.setMode("mainboard",!0),g.syncMode("mainboard"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("mb-card-detect-heartcam",!1),B()):H==="phase20_micro"?(c.setMode("micro",!0),g.syncMode("micro"),c.setExplode(.92,!0),g.setExplodeValue(.92),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("micro-inpixel-dram-gs",!1),B()):H==="phase20_mount"?(c.setMode("mount",!0),g.syncMode("mount"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("mount-screw-orange-orings",!1),B()):H==="phase23_micro"?(c.setMode("micro",!0),g.syncMode("micro"),c.setExplode(.86,!0),g.setExplodeValue(.86),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("micro-mpcr-color-router",!1),B()):H==="phase24_body"?(c.setMode("body",!0),g.syncMode("body"),c.setExplode(.85,!0),g.setExplodeValue(.85),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("body-active-cooling-fan-duct",!1),B()):H==="phase25_sensor"?(c.setMode("sensor",!0),g.syncMode("sensor"),c.setExplode(.88,!0),g.setExplodeValue(.88),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("sensor-electronic-vnd",!1),B()):H==="phase25_body"?(c.setMode("body",!0),g.syncMode("body"),c.setExplode(.86,!0),g.setExplodeValue(.86),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("body-gnss-ceramic-antenna",!1),B()):H==="battery"?(c.setMode("battery",!0),g.syncMode("battery"),c.setExplode(.88,!0),g.setExplodeValue(.88),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("bat-infolithium-fuelgauge",!1),B()):H==="battery_assembled"?(c.setMode("battery",!0),g.syncMode("battery"),c.setExplode(0,!0),g.setExplodeValue(0),c.setCameraPreset("iso",!0),B()):H==="battery_ultra100"?(c.setMode("battery",!0),g.syncMode("battery"),c.setExplode(.92,!0),g.setExplodeValue(.92),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("bat-cvd-sic-porous-scaffold",!1),B()):H==="battery_ultra130"?(c.setMode("battery",!0),g.syncMode("battery"),c.setExplode(.94,!0),g.setExplodeValue(.94),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("bat-argyrodite-li6ps5cl-2026",!1),B()):H==="cfexpress"?(c.setMode("cfexpress",!0),g.syncMode("cfexpress"),c.setExplode(.88,!0),g.setExplodeValue(.88),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("cfe-pcie4-controller-soc",!1),B()):H==="cfexpress_assembled"?(c.setMode("cfexpress",!0),g.syncMode("cfexpress"),c.setExplode(0,!0),g.setExplodeValue(0),c.setCameraPreset("iso",!0),B()):H==="cfexpress_back"?(c.setMode("cfexpress",!0),g.syncMode("cfexpress"),c.setExplode(0,!0),g.setExplodeValue(0),c.setCameraPreset("back",!0),B()):H==="cfexpress_exploded"?(c.setMode("cfexpress",!0),g.syncMode("cfexpress"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="cfexpress_ultra100"?(c.setMode("cfexpress",!0),g.syncMode("cfexpress"),c.setExplode(.92,!0),g.setExplodeValue(.92),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("cfe-multiplane-6plane-mpir",!1),B()):H==="cfexpress_ultra130"?(c.setMode("cfexpress",!0),g.syncMode("cfexpress"),c.setExplode(.94,!0),g.setExplodeValue(.94),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("cfe-fenand-hzo-igzo-2026",!1),B()):H==="cfexpress_ultra170"?(c.setMode("cfexpress",!0),g.syncMode("cfexpress"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("cfe-bwwpc-wafer-power-grid",!1),B()):H==="bionz_assembled"?(c.setMode("bionz",!0),g.syncMode("bionz"),c.setExplode(0,!0),g.setExplodeValue(0),c.setCameraPreset("iso",!0),B()):H==="bionz_exploded"?(c.setMode("bionz",!0),g.syncMode("bionz"),c.setExplode(.92,!0),g.setExplodeValue(.92),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="bionz_drawer"?(c.setMode("bionz",!0),g.syncMode("bionz"),c.setExplode(.86,!0),g.setExplodeValue(.86),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("xr-ai-npu-systolic",!1),B()):H==="mishoe_assembled"?(c.setMode("mishoe",!0),g.syncMode("mishoe"),c.setExplode(0,!0),g.setExplodeValue(0),c.setCameraPreset("iso",!0),B()):H==="mishoe_exploded"?(c.setMode("mishoe",!0),g.syncMode("mishoe"),c.setExplode(.92,!0),g.setExplodeValue(.92),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="mishoe_drawer"?(c.setMode("mishoe",!0),g.syncMode("mishoe"),c.setExplode(.86,!0),g.setExplodeValue(.86),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("mi-pins-8to12-digital-audio",!1),B()):H==="mic_assembled"?(c.setMode("mic",!0),g.syncMode("mic"),c.setExplode(0,!0),g.setExplodeValue(0),c.setCameraPreset("iso",!0),B()):H==="mic_exploded"?(c.setMode("mic",!0),g.syncMode("mic"),c.setExplode(.92,!0),g.setExplodeValue(.92),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="mic_drawer"?(c.setMode("mic",!0),g.syncMode("mic"),c.setExplode(.86,!0),g.setExplodeValue(.86),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("mc-mems-sdm-vacuum-cell",!1),B()):H==="mic_ultra80"?(c.setMode("mic",!0),g.syncMode("mic"),c.setExplode(.92,!0),g.setExplodeValue(.92),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("mc-optical-mems-vcsel-2026",!1),B()):H==="mic_ultra110"?(c.setMode("mic",!0),g.syncMode("mic"),c.setExplode(.94,!0),g.setExplodeValue(.94),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("mc-graphene-2d-membrane-2026",!1),B()):H==="mic_ultra150"?(c.setMode("mic",!0),g.syncMode("mic"),c.setExplode(.95,!0),g.setExplodeValue(.95),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("mc-jk1028-audio-jack-flex",!1),B()):H==="micro_v2_assembled"?(c.setMode("micro_v2",!0),g.syncMode("micro_v2"),c.setExplode(0,!0),g.setExplodeValue(0),c.setCameraPreset("iso",!0),B()):H==="micro_v2_exploded"?(c.setMode("micro_v2",!0),g.syncMode("micro_v2"),c.setExplode(.92,!0),g.setExplodeValue(.92),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="micro_v2_drawer"?(c.setMode("micro_v2",!0),g.syncMode("micro_v2"),c.setExplode(.76,!0),g.setExplodeValue(.76),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("pv2-lofic-3d-pillar-cap",!1),B()):H==="bionz_v2_assembled"?(c.setMode("bionz_v2",!0),g.syncMode("bionz_v2"),c.setExplode(0,!0),g.setExplodeValue(0),c.setCameraPreset("iso",!0),B()):H==="bionz_v2_exploded"?(c.setMode("bionz_v2",!0),g.syncMode("bionz_v2"),c.setExplode(.92,!0),g.setExplodeValue(.92),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="bionz_v2_drawer"?(c.setMode("bionz_v2",!0),g.syncMode("bionz_v2"),c.setExplode(.76,!0),g.setExplodeValue(.76),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("xv2-gaa-si-nanosheets",!1),B()):H==="sensor_fab_assembled"?(c.setMode("sensor_fab",!0),g.syncMode("sensor_fab"),c.setExplode(0,!0),g.setExplodeValue(0),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="sensor_fab_exploded"?(c.setMode("sensor_fab",!0),g.syncMode("sensor_fab"),c.setExplode(.92,!0),g.setExplodeValue(.92),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="sensor_fab_drawer"?(c.setMode("sensor_fab",!0),g.syncMode("sensor_fab"),c.setExplode(.45,!0),g.setExplodeValue(.45),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("fab0-p06-cucu-bond-bsi",!1),B()):H==="sensor_fab_litho"?(c.setMode("sensor_fab",!0),g.syncMode("sensor_fab"),g.syncFabStage("litho"),c.setExplode(.55,!0),g.setExplodeValue(.55),c.setPhysicsActive(!0),g.syncPhysics(!0),c.focusSensorFabStage("litho",!0),B()):H==="sensor_fab_variants"?(c.setMode("sensor_fab",!0),g.syncMode("sensor_fab"),g.syncFabStage("variants"),c.setExplode(.42,!0),g.setExplodeValue(.42),c.setPhysicsActive(!0),g.syncPhysics(!0),c.focusSensorFabStage("variants",!0),B()):H==="sensor_fab_section"?(c.setMode("sensor_fab",!0),g.syncMode("sensor_fab"),c.setExplode(0,!0),pi="x",c.setSection("x",.52),g.syncSectionAxis("x",.52),c.setCameraPreset("iso",!0),B()):H==="sensor_fab_vol1_assembled"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(1,!0),g.syncFabVolume(1),g.syncFabStage("v1_overview"),g.syncMode("sensor_fab"),c.setExplode(0,!0),g.setExplodeValue(0),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="sensor_fab_vol1_exploded"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(1,!0),g.syncFabVolume(1),g.syncFabStage("v1_overview"),g.syncMode("sensor_fab"),c.setExplode(.75,!0),g.setExplodeValue(.75),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="sensor_fab_vol1_drawer"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(1,!0),g.syncFabVolume(1),g.syncFabStage("v1_overview"),g.syncMode("sensor_fab"),c.setExplode(.35,!0),g.setExplodeValue(.35),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("fab1-gs-pixel-adc-isscc2025",!1),B()):H==="sensor_fab_vol1_archs"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(1,!0),g.syncFabVolume(1),g.syncFabStage("v1_archs"),g.syncMode("sensor_fab"),c.setExplode(.12,!0),g.setExplodeValue(.12),c.focusSensorFabStage("v1_archs",!0),B()):H==="sensor_fab_vol1_duel"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(1,!0),g.syncFabVolume(1),g.syncFabStage("v1_duel"),g.syncMode("sensor_fab"),c.setExplode(.12,!0),g.setExplodeValue(.12),c.focusSensorFabStage("v1_duel",!0),B()):H==="sensor_fab_vol1_wall"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(1,!0),g.syncFabVolume(1),g.syncFabStage("v1_wall"),g.syncMode("sensor_fab"),c.setExplode(.12,!0),g.setExplodeValue(.12),c.focusSensorFabStage("v1_wall",!0),B()):H==="sensor_fab_vol2_assembled"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(2,!0),g.syncFabVolume(2),g.syncFabStage("v2_overview"),g.syncMode("sensor_fab"),c.setExplode(0,!0),g.setExplodeValue(0),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="sensor_fab_vol2_exploded"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(2,!0),g.syncFabVolume(2),g.syncFabStage("v2_overview"),g.syncMode("sensor_fab"),c.setExplode(.75,!0),g.setExplodeValue(.75),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="sensor_fab_vol2_drawer"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(2,!0),g.syncFabVolume(2),g.syncFabStage("v2_overview"),g.syncMode("sensor_fab"),c.setExplode(.28,!0),g.setExplodeValue(.28),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("fab2-ci-complex-gettering-cutaway",!1),B()):H==="sensor_fab_vol2_refine"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(2,!0),g.syncFabVolume(2),g.syncFabStage("v2_refine"),g.syncMode("sensor_fab"),c.setExplode(.1,!0),g.setExplodeValue(.1),c.focusSensorFabStage("v2_refine",!0),B()):H==="sensor_fab_vol2_mcz"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(2,!0),g.syncFabVolume(2),g.syncFabStage("v2_mcz"),g.syncMode("sensor_fab"),c.setExplode(.1,!0),g.setExplodeValue(.1),c.focusSensorFabStage("v2_mcz",!0),B()):H==="sensor_fab_vol2_wafer"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(2,!0),g.syncFabVolume(2),g.syncFabStage("v2_wafer"),g.syncMode("sensor_fab"),c.setExplode(.1,!0),g.setExplodeValue(.1),c.focusSensorFabStage("v2_wafer",!0),B()):H==="sensor_fab_vol2_epi_ship"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(2,!0),g.syncFabVolume(2),g.syncFabStage("v2_epi_ship"),g.syncMode("sensor_fab"),c.setExplode(.1,!0),g.setExplodeValue(.1),c.focusSensorFabStage("v2_epi_ship",!0),B()):H==="sensor_fab_vol3_assembled"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(3,!0),g.syncFabVolume(3),g.syncFabStage("v3_overview"),g.syncMode("sensor_fab"),c.setExplode(0,!0),g.setExplodeValue(0),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="sensor_fab_vol3_exploded"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(3,!0),g.syncFabVolume(3),g.syncFabStage("v3_overview"),g.syncMode("sensor_fab"),c.setExplode(.72,!0),g.setExplodeValue(.72),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="sensor_fab_vol3_drawer"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(3,!0),g.syncFabVolume(3),g.syncFabStage("v3_overview"),g.syncMode("sensor_fab"),c.setExplode(.24,!0),g.setExplodeValue(.24),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("fab3-p28-opc-serif-correction",!1),B()):H==="sensor_fab_vol3_tcad"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(3,!0),g.syncFabVolume(3),g.syncFabStage("v3_tcad"),g.syncMode("sensor_fab"),c.setExplode(.08,!0),g.setExplodeValue(.08),c.focusSensorFabStage("v3_tcad",!0),B()):H==="sensor_fab_vol3_layout"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(3,!0),g.syncFabVolume(3),g.syncFabStage("v3_layout"),g.syncMode("sensor_fab"),c.setExplode(.08,!0),g.setExplodeValue(.08),c.focusSensorFabStage("v3_layout",!0),B()):H==="sensor_fab_vol3_opc"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(3,!0),g.syncFabVolume(3),g.syncFabStage("v3_opc"),g.syncMode("sensor_fab"),c.setExplode(.08,!0),g.setExplodeValue(.08),c.focusSensorFabStage("v3_opc",!0),B()):H==="sensor_fab_vol3_maskfab"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(3,!0),g.syncFabVolume(3),g.syncFabStage("v3_maskfab"),g.syncMode("sensor_fab"),c.setExplode(.08,!0),g.setExplodeValue(.08),c.focusSensorFabStage("v3_maskfab",!0),B()):H==="sensor_fab_vol4_assembled"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(4,!0),g.syncFabVolume(4),g.syncFabStage("v4_overview"),g.syncMode("sensor_fab"),c.setExplode(0,!0),g.setExplodeValue(0),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="sensor_fab_vol4_exploded"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(4,!0),g.syncFabVolume(4),g.syncFabStage("v4_overview"),g.syncMode("sensor_fab"),c.setExplode(.72,!0),g.setExplodeValue(.72),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="sensor_fab_vol4_drawer"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(4,!0),g.syncFabVolume(4),g.syncFabStage("v4_overview"),g.syncMode("sensor_fab"),c.setExplode(.24,!0),g.setExplodeValue(.24),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("fab4-m22-surface-pinning-ppd",!1),B()):H==="sensor_fab_vol4_sti_dti"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(4,!0),g.syncFabVolume(4),g.syncFabStage("v4_sti_dti"),g.syncMode("sensor_fab"),c.setExplode(.08,!0),g.setExplodeValue(.08),c.focusSensorFabStage("v4_sti_dti",!0),B()):H==="sensor_fab_vol4_ppd_mev"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(4,!0),g.syncFabVolume(4),g.syncFabStage("v4_ppd_mev"),g.syncMode("sensor_fab"),c.setExplode(.08,!0),g.setExplodeValue(.08),c.focusSensorFabStage("v4_ppd_mev",!0),B()):H==="sensor_fab_vol4_vtg_gate"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(4,!0),g.syncFabVolume(4),g.syncFabStage("v4_vtg_gate"),g.syncMode("sensor_fab"),c.setExplode(.08,!0),g.setExplodeValue(.08),c.focusSensorFabStage("v4_vtg_gate",!0),B()):H==="sensor_fab_vol4_pin_sab"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(4,!0),g.syncFabVolume(4),g.syncFabStage("v4_pin_sab"),g.syncMode("sensor_fab"),c.setExplode(.08,!0),g.setExplodeValue(.08),c.focusSensorFabStage("v4_pin_sab",!0),B()):H==="sensor_fab_vol5_assembled"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(5,!0),g.syncFabVolume(5),g.syncFabStage("v5_overview"),g.syncMode("sensor_fab"),c.setExplode(0,!0),g.setExplodeValue(0),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="drybox_assembled"?(c.setMode("drybox",!0),g.syncMode("drybox"),c.setExplode(0,!0),g.setExplodeValue(0),c.setPhysicsActive(!1),g.syncPhysics(!1),c.setCameraPreset("iso",!0),B()):H==="drybox_exploded"?(c.setMode("drybox",!0),g.syncMode("drybox"),c.setExplode(.86,!0),g.setExplodeValue(.86),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="sensor_fab_vol5_exploded"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(5,!0),g.syncFabVolume(5),g.syncFabStage("v5_overview"),g.syncMode("sensor_fab"),c.setExplode(.72,!0),g.setExplodeValue(.72),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),B()):H==="sensor_fab_vol5_drawer"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(5,!0),g.syncFabVolume(5),g.syncFabStage("v5_overview"),g.syncMode("sensor_fab"),c.setExplode(.24,!0),g.setExplodeValue(.24),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("fab5-p206-hb-recess-cmp",!1),B()):H==="sensor_fab_vol5_w_m1"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(5,!0),g.syncFabVolume(5),g.syncFabStage("v5_w_m1"),g.syncMode("sensor_fab"),c.setExplode(.08,!0),g.setExplodeValue(.08),c.focusSensorFabStage("v5_w_m1",!0),B()):H==="sensor_fab_vol5_m2_m4"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(5,!0),g.syncFabVolume(5),g.syncFabStage("v5_m2_m4"),g.syncMode("sensor_fab"),c.setExplode(.08,!0),g.setExplodeValue(.08),c.focusSensorFabStage("v5_m2_m4",!0),B()):H==="sensor_fab_vol5_m5_wat"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(5,!0),g.syncFabVolume(5),g.syncFabStage("v5_m5_wat"),g.syncMode("sensor_fab"),c.setExplode(.08,!0),g.setExplodeValue(.08),c.focusSensorFabStage("v5_m5_wat",!0),B()):H==="sensor_fab_vol5_hb_cmp"?(c.setMode("sensor_fab",!0),c.setSensorFabVolume(5,!0),g.syncFabVolume(5),g.syncFabStage("v5_hb_cmp"),g.syncMode("sensor_fab"),c.setExplode(.08,!0),g.setExplodeValue(.08),c.focusSensorFabStage("v5_hb_cmp",!0),B()):H==="drybox_back"?(c.setMode("drybox",!0),g.syncMode("drybox"),c.setExplode(.45,!0),g.setExplodeValue(.45),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("back",!0),B()):H==="drybox_section"?(c.setMode("drybox",!0),g.syncMode("drybox"),c.setExplode(0,!0),g.setExplodeValue(0),pi="x",c.setSection("x",.52),g.syncSectionAxis("x",.52),c.setCameraPreset("iso",!0),B()):H==="drybox_drawer"?(c.setMode("drybox",!0),g.syncMode("drybox"),c.setExplode(.55,!0),g.setExplodeValue(.55),c.setPhysicsActive(!0),g.syncPhysics(!0),c.setCameraPreset("iso",!0),c.selectPart("db-pem-nafion-membrane",!1),B()):H==="mirai_fh01"||H==="mirai_2028"?(c.setMiraiSubView(1,!0),c.setMode("mirai_2028",!0),g.syncMode("mirai_2028"),g.syncMiraiSubView(1),c.setExplode(0,!0),g.setExplodeValue(0),c.setCameraPreset("iso",!0),B()):H==="mirai_fh01_exploded"?(c.setMiraiSubView(1,!0),c.setMode("mirai_2028",!0),g.syncMode("mirai_2028"),g.syncMiraiSubView(1),c.setExplode(.72,!0),g.setExplodeValue(.72),c.setCameraPreset("iso",!0),B()):H==="mirai_fh02"?(c.setMiraiSubView(2,!0),c.setMode("mirai_2028",!0),g.syncMode("mirai_2028"),g.syncMiraiSubView(2),c.setExplode(0,!0),g.setExplodeValue(0),c.setCameraPreset("iso",!0),B()):H==="mirai_fh02_exploded"?(c.setMiraiSubView(2,!0),c.setMode("mirai_2028",!0),g.syncMode("mirai_2028"),g.syncMiraiSubView(2),c.setExplode(.72,!0),g.setExplodeValue(.72),c.setCameraPreset("iso",!0),B()):H==="mirai_fh08"?(c.setMiraiSubView(3,!0),c.setMode("mirai_2028",!0),g.syncMode("mirai_2028"),g.syncMiraiSubView(3),c.setExplode(0,!0),g.setExplodeValue(0),c.setCameraPreset("iso",!0),B()):H==="mirai_fh08_exploded"?(c.setMiraiSubView(3,!0),c.setMode("mirai_2028",!0),g.syncMode("mirai_2028"),g.syncMiraiSubView(3),c.setExplode(.72,!0),g.setExplodeValue(.72),c.setCameraPreset("iso",!0),B()):H==="mirai_fh32"?(c.setMiraiSubView(4,!0),c.setMode("mirai_2028",!0),g.syncMode("mirai_2028"),g.syncMiraiSubView(4),c.setExplode(0,!0),g.setExplodeValue(0),c.setCameraPreset("iso",!0),B()):H==="mirai_fh32_exploded"?(c.setMiraiSubView(4,!0),c.setMode("mirai_2028",!0),g.syncMode("mirai_2028"),g.syncMiraiSubView(4),c.setExplode(.72,!0),g.setExplodeValue(.72),c.setCameraPreset("iso",!0),B()):H==="mirai_fh25"?(c.setMiraiSubView(5,!0),c.setMode("mirai_2028",!0),g.syncMode("mirai_2028"),g.syncMiraiSubView(5),c.setExplode(0,!0),g.setExplodeValue(0),c.setCameraPreset("iso",!0),B()):H==="mirai_fh25_exploded"?(c.setMiraiSubView(5,!0),c.setMode("mirai_2028",!0),g.syncMode("mirai_2028"),g.syncMiraiSubView(5),c.setExplode(.72,!0),g.setExplodeValue(.72),c.setCameraPreset("iso",!0),B()):H==="mirai_library"?(c.setMiraiSubView(1,!0),c.setMode("mirai_2028",!0),g.syncMode("mirai_2028"),g.syncMiraiSubView(1),B(),yi.open({tab:"reports"})):H==="mirai_glossary"&&(c.setMiraiSubView(1,!0),c.setMode("mirai_2028",!0),g.syncMode("mirai_2028"),g.syncMiraiSubView(1),B(),yi.open({tab:"glossary"}));export{Hx as $,yh as A,Ws as B,ap as C,Ht as D,si as E,Ze as F,Ps as G,Qh as H,ca as I,Rf as J,dc as K,ia as L,Bs as M,ji as N,Pl as O,Xs as P,Qi as Q,rp as R,Al as S,su as T,qh as U,T as V,Gr as W,kx as X,di as Y,Fx as Z,le as _,ha as a,Bx as a0,ox as a1,ch as a2,Yh as a3,Gx as a4,ru as a5,vf as a6,rs as a7,Qf as a8,Kh as a9,Ko as aa,tu as ab,$h as ac,Gh as ad,ul as ae,ui as af,bt as ag,Kt as ah,Bt as ai,nu as aj,zx as ak,Vx as al,Xh as am,Et as b,na as c,xt as d,wu as e,Ct as f,eu as g,zh as h,iu as i,st as j,jt as k,ax as l,Jc as m,vn as n,Ve as o,Zt as p,Ye as q,As as r,mi as s,ue as t,af as u,ii as v,X0 as w,Ux as x,Ox as y,Nx as z};

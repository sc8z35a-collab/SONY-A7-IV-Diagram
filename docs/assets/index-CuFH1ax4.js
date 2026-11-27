const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./welcome-B1nn0TcA.js","./welcome-Ce7Ng2Al.js","./CadHelpers-QmW8XaIf.js","./v2_unit_compiler-CwbKuWQM.js","./mi_shoe-aRIwJXCE.js","./mi_shoe-bMm9XjJ3.js","./battery-BZvQ43Y2.js","./battery-Cw3gePVg.js","./UltraDetailBuilders-CplGS4Yj.js","./cfexpress-q6fngEvD.js","./cfexpress-DY8cI-Wc.js","./mic-30Y1KNrb.js","./mic-CwD_McdS.js","./drybox-BAR3xuQU.js","./drybox-D1IN4adj.js","./mount-zYqcl1-P.js","./mount-D5exe6iE.js","./mountPhysicsOverlay-B0-pgjvW.js","./shutter-DpKJKwX2.js","./shutter-DRF49fuH.js","./shutterPhysicsOverlay-CqAg2q-5.js","./body-BKRc9y0r.js","./body-DYuOmmPC.js","./bodyPhysicsOverlay-n1mkZ4Y9.js","./lcdParts-uI8vSwl8.js","./evfParts-DpUQYuYb.js","./evf-CeE-dSjg.js","./evf-yJM6r-pP.js","./evfPhysicsOverlay-maX6s61E.js","./lcd-WAHjlfnX.js","./lcd-C5DFy3jF.js","./lcdPhysicsOverlay-CBclwR1z.js","./lens-Dl21thKM.js","./lens-DbGM9PCN.js","./lensPhysicsOverlay-DcIrcHVw.js","./mainboard-DTqllkRw.js","./mainboard-kTn1WrHF.js","./mainboardPhysicsOverlay-CmUP1Nwi.js","./bionz-BwYdUkvt.js","./bionz-B1F8ABtJ.js","./bionz_v2-xU7glq0I.js","./bionz_v2-Mx5-M7Q3.js","./sensor-CfHNtvTN.js","./sensor-CzpKrVee.js","./macroParts-BcQJ3YiV.js","./physicsOverlay-DnsejjoB.js","./micro-dmI_HihS.js","./micro-cCBBsnJi.js","./sensorMicroUltraAuditParts-CnyRBZu5.js","./micro_v2-DHzXLQ2j.js","./micro_v2-Be62c30w.js","./sensor_fab-B8luOiey.js","./sensor_fab-Cu3xZEwo.js","./integrated-DsFg9_4u.js","./integrated-_M_HiRFo.js","./camera_macro_shared-UVJnry02.js","./camera_body-CNIA6Cv9.js","./camera_body-CnaAZIgr.js","./lensExplanations-CVIj2Kn6.js","./unit_explanations-DhEhaoi2.js","./mountExplanations-BzfMkKM6.js","./shutterExplanations-COwEmSMe.js","./explanations-BP4A1WOU.js","./microPixelV2Explanations-Ds_g-StQ.js","./mainboardExplanations-CFCwOEoo.js","./evfExplanations-DI8qSmkq.js","./lcdExplanations-DVJLFMAP.js","./bodyExplanations-kgPdKIc9.js","./batteryExplanations-BeDaaZxE.js","./cfexpressExplanations-BMV4rYzd.js","./bionzExplanations-Dj7Xzik7.js","./bionzV2Explanations-Bg1XzZ5k.js","./miShoeExplanations-CLmVffr4.js","./micExplanations-C2aeFQw6.js","./sensorFabExplanations-D2TQiUI1.js","./dryboxExplanationsA-B_9kghFZ.js","./CadPlaygroundStudio-Ccw5mk4t.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const vu="modulepreload",yu=function(i,e){return new URL(i,e).href},Sl={},ce=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){let a=function(u){return Promise.all(u.map(d=>Promise.resolve(d).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};const o=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");s=a(t.map(u=>{if(u=yu(u,n),u in Sl)return;Sl[u]=!0;const d=u.endsWith(".css"),p=d?'[rel="stylesheet"]':"";if(!!n)for(let v=o.length-1;v>=0;v--){const g=o[v];if(g.href===u&&(!d||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${p}`))return;const _=document.createElement("link");if(_.rel=d?"stylesheet":vu,d||(_.as="script"),_.crossOrigin="",_.href=u,c&&_.setAttribute("nonce",c),document.head.appendChild(_),d)return new Promise((v,g)=>{_.addEventListener("load",v),_.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return s.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return e().catch(r)})},oa=82,El=0,la=[{partId:"lens-front-xa",code:"E01",groupCode:"G1",shortLabel:"XA₁",jaName:"第1枚 XA超高度非球面 (0.01μm)",role:"F1.2の大光束を取り込みつつ球面収差と玉ボケの年輪を根本抑制",z:108.5,thick:5,ap:32.5,rF:117.92,rR:185,nd:1.772,vd:49.6,kind:"xa",isXa:!0,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:46218e-11,a6F:51747e-14,focusGroup:"fixed"},{partId:"lens-front-meniscus",code:"E02",groupCode:"G2",shortLabel:"LaK",jaName:"第2枚 高屈折ランタン正メニスカス",role:"高屈折率 n=1.883 で大口径光束を緩やかに絞り方向へ集光",z:101.8,thick:4.6,ap:31,rF:78,rR:165,nd:1.883,vd:40.8,kind:"lanthanum",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"fixed"},{partId:"lens-ed-group",code:"E03",groupCode:"G3a",shortLabel:"S-ED",jaName:"第3枚 スーパーED凸レンズ",role:"蛍石に迫る超低分散 νd=94.9 でRGBの波長ごとの屈折ズレを極小化",z:95.8,thick:4.6,ap:29.5,rF:70,rR:-86,nd:1.497,vd:94.9,kind:"ed",isXa:!1,isEd:!0,isFlint:!1,cementedToNext:!0,a4F:0,a6F:0,focusGroup:"fixed"},{partId:"lens-flint-cemented",code:"E04",groupCode:"G3b",shortLabel:"Flint",jaName:"第4枚 高分散フリント接合凹レンズ",role:"E03とUV光学接合し色分散を逆符号で完全相殺（アポクロマート化）",z:92.2,thick:2.2,ap:29,rF:-86,rR:52,nd:1.805,vd:29.8,kind:"flint",isXa:!1,isEd:!1,isFlint:!0,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"fixed"},{partId:"lens-g4-negative",code:"E05",groupCode:"G4",shortLabel:"凹G4",jaName:"第5枚 絞り直前ペッツバール凹レンズ",role:"強い負パワーでピント面の湾曲を真っ平らなフルサイズ像面へ平坦化",z:87.4,thick:2,ap:26.5,rF:-115,rR:66,nd:1.74,vd:44,kind:"crown",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"fixed"},{partId:"lens-focus-a-front",code:"E06",groupCode:"G5a",shortLabel:"FA₁",jaName:"第6枚 フォーカスA群 前側凸レンズ",role:"XDリニアモーター2基で直動しピント位置を高速移動する前側可動玉",z:75.5,thick:3.8,ap:24,rF:56,rR:-105,nd:1.804,vd:46.6,kind:"lanthanum",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"A"},{partId:"lens-focus-group-a",code:"E07",groupCode:"G5b",shortLabel:"XA₂",jaName:"第7枚 フォーカスA群 第2 XA非球面",role:"絞り直後で球面収差とコマ収差を徹底除去するフローティング主玉",z:70.9,thick:4.2,ap:24.4,rF:64,rR:-92,nd:1.743,vd:49.3,kind:"xa",isXa:!0,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:-14475e-10,a6F:15704e-15,focusGroup:"A"},{partId:"lens-focus-a-rear",code:"E08",groupCode:"G5c",shortLabel:"FA₃",jaName:"第8枚 フォーカスA群 後側補正凹レンズ",role:"A群単独で色・球面収差を自己完結させ近接時の描写劣化を防止",z:66.5,thick:2.2,ap:23.4,rF:-82,rR:84,nd:1.784,vd:42,kind:"flint",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"A"},{partId:"lens-focus-b-front",code:"E09",groupCode:"G6a",shortLabel:"ED₂",jaName:"第9枚 フォーカスB群 ED凸レンズ",role:"A群と異なる移動比で同期駆動し至近0.4mの色収差変動を打ち消す",z:60.75,thick:3.8,ap:23.4,rF:68,rR:-92,nd:1.592,vd:81.6,kind:"ed",isXa:!1,isEd:!0,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"B"},{partId:"lens-focus-group-b",code:"E10",groupCode:"G6b",shortLabel:"FB₂",jaName:"第10枚 フォーカスB群 後側負非球面",role:"独立XDモーター2基で空気間隔を可変制御しブリージングと収差を抑圧",z:56.75,thick:2.2,ap:23.6,rF:-66,rR:120,nd:1.762,vd:39.5,kind:"crown",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"B"},{partId:"lens-g7-flattener",code:"E11",groupCode:"G7",shortLabel:"凹G7",jaName:"第11枚 後群固定フィールドフラットナー",role:"フォーカス群後方で像面湾曲と非点収差を精密に最終整形",z:51.8,thick:2.2,ap:23.2,rF:-84,rR:78,nd:1.72,vd:46,kind:"crown",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"fixed"},{partId:"lens-rear-convex",code:"E12",groupCode:"G8",shortLabel:"LaK₂",jaName:"第12枚 ランタン・サジタルコマ補正レンズ",role:"画面四隅の点光源が鳥の羽のように滲むサジタルコマフレアを撃退",z:47.8,thick:4,ap:23,rF:66,rR:-84,nd:1.883,vd:40.8,kind:"lanthanum",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"fixed"},{partId:"lens-rear-telecentric",code:"E13",groupCode:"G9",shortLabel:"Tele",jaName:"第13枚 φ45mm テレセントリック正メニスカス",role:"周辺へ広がる斜め光線をフルサイズセンサーへ垂直寄り（CRA<10°）に矯正",z:43.4,thick:4,ap:22.8,rF:62,rR:155,nd:1.834,vd:42,kind:"lanthanum",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"fixed"},{partId:"lens-rear-element",code:"E14",groupCode:"G10",shortLabel:"XA₃",jaName:"第14枚 φ44mm 第3 XAリアヒーローレンズ",role:"ショートフランジ18mmの特権を活かしセンサー直前で像面と四隅解像を完成",z:38.4,thick:3.8,ap:22.4,rF:-92,rR:-68.55,nd:1.743,vd:49.3,kind:"xa",isXa:!0,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:-20147e-10,a6F:-27845e-13,focusGroup:"fixed"}],Tl=[{id:"aperture_bokeh",shortTitle:"結像 & F1.2ボケ",fullTitle:"大口径F1.2結像と11枚円形絞り・被写界深度",badge:"01",accentColor:"#0284c7",hasComparisonToggle:!1,getDynamicCaption:i=>{const e=i.getIrisMetrics(),t=e.fNumber<10?e.fNumber.toFixed(1):Math.round(e.fNumber).toString();return e.fNumber<=2?`F${t}（有効口径 φ${e.entrancePupilMm.toFixed(1)}mm）：11枚羽根の広い円形開口を膨大な光束が満たし、ピント面はカミソリのように鋭く、前後はとろける大きな玉ボケに。`:e.fNumber<=5.6?`F${t}（有効口径 φ${e.entrancePupilMm.toFixed(1)}mm）：周辺光束が絞られて光円錐の角度が細くなり、被写界深度が深く、周辺口径食（レモン型ボケ）も真円へ整います。`:`F${t}（有効口径 φ${e.entrancePupilMm.toFixed(1)}mm）：光束が針のように細く絞られ、手前から奥までクッキリ写るパンフォーカスへ変化。11枚羽根による22本の美しい光芒も発生します。`}},{id:"floating_xd",shortTitle:"フローティングAF",fullTitle:"2群フローティングフォーカス & 4基XDリニアモーター",badge:"02",accentColor:"#d97706",hasComparisonToggle:!1,getDynamicCaption:i=>{const e=i.getFloatingStrokes();return`ピント距離 ${i.getFocusDistanceLabel()}：A群（${e.dzA.toFixed(2)}mm）とB群（${e.dzB.toFixed(2)}mm）を4基のXDリニアモーターが約1.86:1の独立速度比で同期直動。群間隔（${e.gapAB.toFixed(1)}mm）を自在に変え、最短0.40mまで収差ゼロを維持します。`}},{id:"ed_chromatic",shortTitle:"ED色収差補正",fullTitle:"スーパーED＋フリント接合ダブレットによるRGB色消し",badge:"03",accentColor:"#059669",hasComparisonToggle:!0,toggleLabel:"スーパーED色収差補正",toggleOnText:"ON（アポクロマート）",toggleOffText:"OFF（通常ガラス比較）",getDynamicCaption:i=>i.edStrength>.5?"スーパーED（νd=94.9）凸玉と高分散フリント凹玉（νd=29.8）の逆符号分散が相殺し合い、赤(656nm)・緑(587nm)・青(486nm)の焦点ズレが 0.05mm 未満の純白一点へ収束！":"通常ガラス比較：青い光ほど強く曲がるためセンサー手前で結像し、赤い光は奥へ抜けます（軸上色ズレ 約3.5mm）。これが写真の輪郭に出る紫・緑の色滲み（パープルフリンジ）の正体です。"},{id:"xa_aspheric",shortTitle:"3×XA非球面",fullTitle:"0.01μm XA超高度非球面レンズと球面収差・玉ねぎボケ解消",badge:"04",accentColor:"#0ea5e9",hasComparisonToggle:!0,toggleLabel:"3×XA非球面補正",toggleOnText:"ON（0.01μm XA）",toggleOffText:"OFF（球面レンズ比較）",getDynamicCaption:i=>i.xaStrength>.5?"E01・E07・E14の3枚のXA非球面が周辺曲率を緩やかに連続変化させ、F1.2最外周光線まで完璧に1点へ結像。0.01μm研磨精度により玉ボケ内部の年輪（玉ねぎボケ）も完全に消滅します。":"通常球面レンズ比較：大口径F1.2の外側を通る光線ほど強く曲がりすぎて手前にズレる「球面収差」が発生！像が白く滲み、精密研磨不足の非球面では玉ボケに年輪模様が現れます。"},{id:"nano_ar_baffle",shortTitle:"Nano AR II & 遮光",fullTitle:"ナノARコーティングII 波動干渉消滅 & 迷光バッフル",badge:"05",accentColor:"#6366f1",hasComparisonToggle:!0,toggleLabel:"Nano AR II 反射防止",toggleOnText:"ON（反射率 < 0.08%）",toggleOffText:"OFF（無コート 4%反射）",getDynamicCaption:i=>i.nanoArStrength>.5?"ナノ多孔質シリカ層（n≈1.22）で2つの反射光の位相を半波長（180°）ずらして波動干渉で打ち消し合い、逆光ゴーストを消滅！画角外の迷光もフード＆3:2リアバッフルが吸収します。":"無コート比較：ガラス1面あたり約4%の光が跳ね返り、14枚（26空気面）で多重反射した迷光がゴーストや白いフレアとなってセンサーへ降り注ぎ、コントラストが激減します。"}];function Mu(i,e,t,n=0,s=0){const r=1/t,a=i*i,o=Math.max(.15,1-r*r*a);return e-r*a/(1+Math.sqrt(o))-n*a*a-s*a*a*a}function Al(i,e,t=0,n=0){const s=1/e,r=i*i,a=Math.max(.15,1-s*s*r);return-(s*i)/Math.sqrt(a)-4*t*r*i-6*n*r*r*i}function wl(i,e,t){if(e===0)return i.nd;let n=i.vd;t<1&&(i.isEd?n=i.vd*t+19*(1-t):i.isFlint&&(n=i.vd*t+65*(1-t)));const s=(i.nd-1)/n;return i.nd+e*.5*s}let no=0,io=0,so=0,ro=0;function Pl(i,e,t,n,s,r,a,o,l,c){let u=(s-e)/n;for(let U=0;U<5;U++){const E=i+u*t,L=e+u*n-Mu(E,s,r,a,o),F=n-Al(E,r,a,o)*t;if(Math.abs(F)<1e-6)break;u-=L/F}const d=i+u*t,p=e+u*n;let _=-Al(d,r,a,o),v=1;const g=1/Math.sqrt(_*_+1);_*=g,v*=g;let m=-(t*_+n*v);m<0&&(_=-_,v=-v,m=-m);const S=l/c,M=1-S*S*(1-m*m),y=Math.sqrt(M>.04?M:.04),C=S*t+(S*m-y)*_,A=S*n+(S*m-y)*v,R=1/Math.sqrt(C*C+A*A);no=d,io=p,so=C*R,ro=A*R}function bu(i){const e=Math.max(0,Math.min(1,i)),t=-(6.85*e-1.35*e*e),n=-(3.45*e-.49*e*e),s=66.5+t-(60.75+n);return{dzA:t,dzB:n,gapAB:s}}function Su(i,e){const t=Math.max(1.2,Math.min(16,i)),n=21.6*(1.2/t),s=Math.max(0,Math.min(1,Math.log2(t/1.2)/Math.log2(16/1.2))),r=50/t,a=e<.01?2e3:1e3/(e*2.5),l=2*t*.03*a*a/2500,c=Math.min(1,1.2/t*(.42+.58*e));return{fNumber:t,irisRadiusMm:n,closure01:s,entrancePupilMm:r,dofMm:l,bokehScale01:c}}function Ps(i){let e=i.yStart,t=i.zStart;const n=Math.hypot(i.dyStart,i.dzStart);let s=i.dyStart/n,r=i.dzStart/n,a=1;const o=[{z:t,y:e}];let l=0,c=!1;for(let _=0;_<la.length;_++){if(_===5){const U=(oa-t)/r;if(l=e+U*s,o.push({z:oa,y:l}),Math.abs(l)>i.irisRadiusMm+.12&&(c=!0,i.stopAtIrisIfClipped))return{points:o,color:i.color,hexColor:i.hexColor,lambdaShift:i.lambdaShift,clippedAtIris:!0,yIris:l,ySensor:l,zFocus:oa,craDeg:0,rayRole:i.rayRole,opacity:(i.opacity??.85)*.25,width:i.width??1.4}}const v=la[_],g=v.focusGroup==="A"?i.dzA:v.focusGroup==="B"?i.dzB:0,m=v.z+g,S=m+v.thick*.5,M=m-v.thick*.5,y=wl(v,i.lambdaShift,i.edStrength),C=v.isXa?v.a4F*i.xaStrength:0,A=v.isXa?v.a6F*i.xaStrength:0;Pl(e,t,s,r,S,v.rF,C,A,a,y),e=no,t=io,s=so,r=ro,o.push({z:t,y:e});const R=v.cementedToNext?wl(la[_+1],i.lambdaShift,i.edStrength):1;Pl(e,t,s,r,M,v.rR,0,0,y,R),e=no,t=io,s=so,r=ro,o.push({z:t,y:e}),a=R}const u=(El-t)/r,d=e+u*s;o.push({z:El,y:d});const p=Math.abs(s)>1e-5?t-e/s*r:-999,f=Math.atan2(Math.abs(s),Math.abs(r))*180/Math.PI;return{points:o,color:i.color,hexColor:i.hexColor,lambdaShift:i.lambdaShift,clippedAtIris:c,yIris:l,ySensor:d,zFocus:p,craDeg:f,rayRole:i.rayRole,opacity:i.opacity??.85,width:i.width??1.6}}function Eu(i,e,t,n=136){if(Math.abs(i)<.05)return 0;const s=i*Math.PI/180,r=-Math.sin(s),a=-Math.cos(s);let o=i*.96;for(let l=0;l<5;l++){const c=Ps({yStart:o,zStart:n,dyStart:r,dzStart:a,lambdaShift:0,xaStrength:1,edStrength:1,dzA:e,dzB:t,irisRadiusMm:40,stopAtIrisIfClipped:!1,color:"#0284c7",hexColor:165063,rayRole:"chief"}),d=(Ps({yStart:o+.5,zStart:n,dyStart:r,dzStart:a,lambdaShift:0,xaStrength:1,edStrength:1,dzA:e,dzB:t,irisRadiusMm:40,stopAtIrisIfClipped:!1,color:"#0284c7",hexColor:165063,rayRole:"chief"}).yIris-c.yIris)/.5;Math.abs(d)>1e-4&&(o-=c.yIris/d)}return o}class Tu{studioOpen=!1;autoPlay=!0;scenario="aperture_bokeh";hoveredElementId=null;targetAperture=1.2;targetFocusT=0;targetFieldAngleDeg=0;targetXaStrength=1;targetEdStrength=1;targetNanoArStrength=1;aperture=1.2;focusT=0;fieldAngleDeg=0;xaStrength=1;edStrength=1;nanoArStrength=1;focusVelocityA=0;focusVelocityB=0;prevDzA=0;prevDzB=0;simTime=0;listeners=new Set;subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}notify(){this.listeners.forEach(e=>e())}setStudioOpen(e){this.studioOpen!==e&&(this.studioOpen=e,e&&this.applyScenarioDefaults(this.scenario),this.notify())}setScenario(e){this.scenario=e,this.simTime=0,this.autoPlay=!0,this.applyScenarioDefaults(e),this.notify()}applyScenarioDefaults(e){switch(e){case"aperture_bokeh":this.targetAperture=1.2,this.targetFocusT=.28,this.targetFieldAngleDeg=0,this.targetXaStrength=1,this.targetEdStrength=1,this.targetNanoArStrength=1;break;case"floating_xd":this.targetAperture=1.4,this.targetFocusT=.65,this.targetFieldAngleDeg=0,this.targetXaStrength=1,this.targetEdStrength=1,this.targetNanoArStrength=1;break;case"ed_chromatic":this.targetAperture=1.2,this.targetFocusT=0,this.targetFieldAngleDeg=0,this.targetXaStrength=1,this.targetEdStrength=1,this.targetNanoArStrength=1;break;case"xa_aspheric":this.targetAperture=1.2,this.targetFocusT=0,this.targetFieldAngleDeg=0,this.targetXaStrength=1,this.targetEdStrength=1,this.targetNanoArStrength=1;break;case"nano_ar_baffle":this.targetAperture=1.8,this.targetFocusT=.15,this.targetFieldAngleDeg=12,this.targetXaStrength=1,this.targetEdStrength=1,this.targetNanoArStrength=1;break}}setManualAperture(e){this.autoPlay=!1,this.targetAperture=Math.max(1.2,Math.min(16,e)),this.notify()}setManualFocusT(e){this.autoPlay=!1,this.targetFocusT=Math.max(0,Math.min(1,e)),this.notify()}setManualFieldAngle(e){this.autoPlay=!1,this.targetFieldAngleDeg=Math.max(-19,Math.min(19,e)),this.notify()}toggleComparison(){this.autoPlay=!1,this.scenario==="ed_chromatic"?this.targetEdStrength=this.targetEdStrength>.5?0:1:this.scenario==="xa_aspheric"?this.targetXaStrength=this.targetXaStrength>.5?0:1:this.scenario==="nano_ar_baffle"&&(this.targetNanoArStrength=this.targetNanoArStrength>.5?0:1),this.notify()}setAutoPlay(e){this.autoPlay=e,this.notify()}setHoveredElement(e){this.hoveredElementId!==e&&(this.hoveredElementId=e,this.notify())}step(e,t,n){const s=Math.min(.05,Math.max(.001,t||.016));if(this.studioOpen){if(this.autoPlay){this.simTime+=s;const l=this.simTime;if(this.scenario==="aperture_bokeh"){const c=.5-.5*Math.cos(l*.78);this.targetAperture=1.2*Math.pow(11/1.2,c),this.targetFocusT=.18+.14*(.5-.5*Math.cos(l*.42)),this.targetFieldAngleDeg=Math.sin(l*.38)*7.5}else if(this.scenario==="floating_xd"){const c=.5-.5*Math.cos(l*.92);this.targetFocusT=c,this.targetAperture=1.25,this.targetFieldAngleDeg=0}else if(this.scenario==="ed_chromatic"){const c=Math.sin(l*.95);this.targetEdStrength=c>-.15?1:0,this.targetAperture=1.2,this.targetFocusT=0,this.targetFieldAngleDeg=0}else if(this.scenario==="xa_aspheric"){const c=Math.sin(l*.92);this.targetXaStrength=c>-.15?1:0,this.targetAperture=1.2,this.targetFocusT=0,this.targetFieldAngleDeg=0}else if(this.scenario==="nano_ar_baffle"){const c=Math.sin(l*.85);this.targetNanoArStrength=c>-.15?1:0,this.targetFieldAngleDeg=6+9*(.5+.5*Math.sin(l*.65)),this.targetAperture=1.6,this.targetFocusT=.12}}}else if(n){const l=.5-.5*Math.cos(e*1.15);this.targetAperture=1.2*Math.pow(11/1.2,l),this.targetFocusT=.5-.5*Math.cos(e*1.45),this.targetFieldAngleDeg=0,this.targetXaStrength=1,this.targetEdStrength=1,this.targetNanoArStrength=1}else this.targetAperture=1.2,this.targetFocusT=0,this.targetFieldAngleDeg=0,this.targetXaStrength=1,this.targetEdStrength=1,this.targetNanoArStrength=1;const r=1-Math.exp(-s*9.5),a=1-Math.exp(-s*6.5);this.aperture+=(this.targetAperture-this.aperture)*r,this.focusT+=(this.targetFocusT-this.focusT)*r,this.fieldAngleDeg+=(this.targetFieldAngleDeg-this.fieldAngleDeg)*r,this.xaStrength+=(this.targetXaStrength-this.xaStrength)*a,this.edStrength+=(this.targetEdStrength-this.edStrength)*a,this.nanoArStrength+=(this.targetNanoArStrength-this.nanoArStrength)*a;const o=this.getFloatingStrokes();this.focusVelocityA=(o.dzA-this.prevDzA)/s,this.focusVelocityB=(o.dzB-this.prevDzB)/s,this.prevDzA=o.dzA,this.prevDzB=o.dzB}getFloatingStrokes(){return bu(this.focusT)}getIrisMetrics(){return Su(this.aperture,this.focusT)}getFocusDistanceLabel(){if(this.focusT<.025)return"∞（無限遠）";const e=1/(this.focusT*2.5);return e>=10?"∞（遠景）":`${e.toFixed(2)} m`}getScenarioDescriptor(){return Tl.find(e=>e.id===this.scenario)??Tl[0]}cachedBundleKey="";cachedBundleRays=[];traceActiveBundle(e=136){const t=`${e}|${this.scenario}|${this.aperture.toFixed(5)}|${this.focusT.toFixed(5)}|${this.fieldAngleDeg.toFixed(4)}|${this.xaStrength.toFixed(4)}|${this.edStrength.toFixed(4)}|${this.nanoArStrength.toFixed(4)}`;if(t===this.cachedBundleKey)return this.cachedBundleRays;const n=this.getFloatingStrokes(),s=this.getIrisMetrics(),r=[];this.cachedBundleKey=t,this.cachedBundleRays=r;const a=this.focusT*2.5,o=(d,p,f)=>{const _=a>.001?Math.atan((d-p)*a/1e3):0,v=-f+_;return{dy:Math.sin(v),dz:-Math.cos(v)}},l=this.fieldAngleDeg*Math.PI/180,c=Eu(this.fieldAngleDeg,n.dzA,n.dzB,e);if(this.scenario==="ed_chromatic"){const d=[-19.2,-11.5,0,11.5,19.2],p=[{shift:-1,color:"#ef4444",hex:15680580,role:"rgb_r"},{shift:0,color:"#10b981",hex:1096065,role:"rgb_g"},{shift:1,color:"#2563eb",hex:2450411,role:"rgb_b"}];for(const f of d){const _=c+f,v=o(_,c,l);for(const g of p)f===0&&g.shift!==0||r.push(Ps({yStart:_,zStart:e,dyStart:v.dy,dzStart:v.dz,lambdaShift:g.shift,xaStrength:this.xaStrength,edStrength:this.edStrength,dzA:n.dzA,dzB:n.dzB,irisRadiusMm:s.irisRadiusMm,stopAtIrisIfClipped:!0,color:g.color,hexColor:g.hex,rayRole:g.role,opacity:f===0?.65:.84,width:f===0?1.2:1.75}))}return r}if(this.scenario==="xa_aspheric"){const d=[-20.6,-17.5,-13.5,-7.5,0,7.5,13.5,17.5,20.6];for(const p of d){const _=Math.abs(p)>=13,v=this.xaStrength<.5&&_?"#e11d48":_?"#0284c7":"#0d9488",g=this.xaStrength<.5&&_?14753096:_?165063:889992,m=c+p,S=o(m,c,l);r.push(Ps({yStart:m,zStart:e,dyStart:S.dy,dzStart:S.dz,lambdaShift:0,xaStrength:this.xaStrength,edStrength:1,dzA:n.dzA,dzB:n.dzB,irisRadiusMm:s.irisRadiusMm,stopAtIrisIfClipped:!0,color:p===0?"#f59e0b":v,hexColor:p===0?16096779:g,rayRole:p===0?"chief":_?"marginal":"paraxial",opacity:p===0?.72:.88,width:_?1.9:1.5}))}return r}const u=[-20.4,-15.5,-10.5,-5.2,0,5.2,10.5,15.5,20.4];for(const d of u){const p=c+d,f=o(p,c,l),_=d===0,v=Math.abs(d)>=15,g=_?"#f59e0b":(this.scenario==="floating_xd",v?"#0284c7":"#0ea5e9"),m=_?16096779:v?165063:959977;r.push(Ps({yStart:p,zStart:e,dyStart:f.dy,dzStart:f.dz,lambdaShift:0,xaStrength:this.xaStrength,edStrength:this.edStrength,dzA:n.dzA,dzB:n.dzB,irisRadiusMm:s.irisRadiusMm,stopAtIrisIfClipped:!0,color:g,hexColor:m,rayRole:_?"chief":v?"marginal":"paraxial",opacity:_?.82:.85,width:_?1.7:1.65}))}if(this.scenario==="nano_ar_baffle"){const d=1-this.nanoArStrength*.94;r.push({points:[{z:e,y:26},{z:108.5,y:18},{z:95.8,y:11},{z:105.5,y:2.5},{z:82,y:-6.5},{z:42,y:-11.5},{z:0,y:-14.2}],color:"#ef4444",hexColor:15680580,lambdaShift:0,clippedAtIris:!1,yIris:-6.5,ySensor:-14.2,zFocus:0,craDeg:8,rayRole:"ghost",opacity:d*.88,width:1.85}),r.push({points:[{z:e,y:-23},{z:108.5,y:-14},{z:71,y:-7.5},{z:87.4,y:3.5},{z:42,y:9.8},{z:0,y:12.6}],color:"#f97316",hexColor:16347926,lambdaShift:0,clippedAtIris:!1,yIris:0,ySensor:12.6,zFocus:0,craDeg:7,rayRole:"ghost",opacity:d*.78,width:1.6}),r.push({points:[{z:e,y:36.5},{z:124,y:31.2}],color:"#94a3b8",hexColor:9741240,lambdaShift:0,clippedAtIris:!0,yIris:31,ySensor:31,zFocus:124,craDeg:0,rayRole:"stray",opacity:.65,width:1.35}),r.push({points:[{z:e,y:-33},{z:108.5,y:-26},{z:82,y:-18.8},{z:38.2,y:-15.6}],color:"#94a3b8",hexColor:9741240,lambdaShift:0,clippedAtIris:!0,yIris:-18.8,ySensor:-15.6,zFocus:38.2,craDeg:0,rayRole:"stray",opacity:.65,width:1.35})}return r}}const gn=new Tu;/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Jo="174",ji={ROTATE:0,DOLLY:1,PAN:2},$i={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Au=0,Cl=1,wu=2,ph=1,mh=2,Cn=3,$t=0,Gt=1,Ht=2,Yn=0,Ji=1,Rl=2,Ll=3,Il=4,Pu=5,pi=100,Cu=101,Ru=102,Lu=103,Iu=104,Du=200,Uu=201,Fu=202,Nu=203,ao=204,oo=205,Ou=206,Bu=207,Vu=208,zu=209,ku=210,Hu=211,Gu=212,Wu=213,Xu=214,lo=0,co=1,ho=2,ss=3,uo=4,fo=5,po=6,mo=7,Kr=0,qu=1,Yu=2,$n=0,$u=1,Ku=2,Zu=3,gh=4,ju=5,Ju=6,Qu=7,_h=300,rs=301,as=302,Ds=303,go=304,Zr=306,bi=1e3,_i=1001,_o=1002,Bt=1003,ed=1004,qs=1005,mt=1006,ca=1007,In=1008,Fn=1009,xh=1010,vh=1011,Us=1012,Qo=1013,Kn=1014,Kt=1015,zs=1016,el=1017,tl=1018,os=1020,yh=35902,Mh=1021,bh=1022,bt=1023,Sh=1024,Eh=1025,Qi=1026,ls=1027,nl=1028,jr=1029,Th=1030,il=1031,sl=1033,Fr=33776,Nr=33777,Or=33778,Br=33779,xo=35840,vo=35841,yo=35842,Mo=35843,bo=36196,So=37492,Eo=37496,To=37808,Ao=37809,wo=37810,Po=37811,Co=37812,Ro=37813,Lo=37814,Io=37815,Do=37816,Uo=37817,Fo=37818,No=37819,Oo=37820,Bo=37821,Vr=36492,Vo=36494,zo=36495,Ah=36283,ko=36284,Ho=36285,Go=36286,td=3200,nd=3201,ks=0,id=1,Xn="",Mt="srgb",cs="srgb-linear",Hr="linear",at="srgb",Ci=7680,Dl=519,sd=512,rd=513,ad=514,wh=515,od=516,ld=517,cd=518,hd=519,Ul=35044,wx=35048,Fl="300 es",Dn=2e3,Gr=2001;class Ai{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const It=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Nl=1234567;const es=Math.PI/180,Fs=180/Math.PI;function wi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(It[i&255]+It[i>>8&255]+It[i>>16&255]+It[i>>24&255]+"-"+It[e&255]+It[e>>8&255]+"-"+It[e>>16&15|64]+It[e>>24&255]+"-"+It[t&63|128]+It[t>>8&255]+"-"+It[t>>16&255]+It[t>>24&255]+It[n&255]+It[n>>8&255]+It[n>>16&255]+It[n>>24&255]).toLowerCase()}function Xe(i,e,t){return Math.max(e,Math.min(t,i))}function rl(i,e){return(i%e+e)%e}function ud(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function dd(i,e,t){return i!==e?(t-i)/(e-i):0}function Cs(i,e,t){return(1-t)*i+t*e}function fd(i,e,t,n){return Cs(i,e,1-Math.exp(-t*n))}function pd(i,e=1){return e-Math.abs(rl(i,e*2)-e)}function md(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function gd(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function _d(i,e){return i+Math.floor(Math.random()*(e-i+1))}function xd(i,e){return i+Math.random()*(e-i)}function vd(i){return i*(.5-Math.random())}function yd(i){i!==void 0&&(Nl=i);let e=Nl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Md(i){return i*es}function bd(i){return i*Fs}function Sd(i){return(i&i-1)===0&&i!==0}function Ed(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Td(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Ad(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),u=a((e+n)/2),d=r((e-n)/2),p=a((e-n)/2),f=r((n-e)/2),_=a((n-e)/2);switch(s){case"XYX":i.set(o*u,l*d,l*p,o*c);break;case"YZY":i.set(l*p,o*u,l*d,o*c);break;case"ZXZ":i.set(l*d,l*p,o*u,o*c);break;case"XZX":i.set(o*u,l*_,l*f,o*c);break;case"YXY":i.set(l*f,o*u,l*_,o*c);break;case"ZYZ":i.set(l*_,l*f,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Yi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Nt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Ts={DEG2RAD:es,RAD2DEG:Fs,generateUUID:wi,clamp:Xe,euclideanModulo:rl,mapLinear:ud,inverseLerp:dd,lerp:Cs,damp:fd,pingpong:pd,smoothstep:md,smootherstep:gd,randInt:_d,randFloat:xd,randFloatSpread:vd,seededRandom:yd,degToRad:Md,radToDeg:bd,isPowerOfTwo:Sd,ceilPowerOfTwo:Ed,floorPowerOfTwo:Td,setQuaternionFromProperEuler:Ad,normalize:Nt,denormalize:Yi};class he{constructor(e=0,t=0){he.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Xe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Xe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ye{constructor(e,t,n,s,r,a,o,l,c){Ye.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],d=n[7],p=n[2],f=n[5],_=n[8],v=s[0],g=s[3],m=s[6],S=s[1],M=s[4],y=s[7],C=s[2],A=s[5],R=s[8];return r[0]=a*v+o*S+l*C,r[3]=a*g+o*M+l*A,r[6]=a*m+o*y+l*R,r[1]=c*v+u*S+d*C,r[4]=c*g+u*M+d*A,r[7]=c*m+u*y+d*R,r[2]=p*v+f*S+_*C,r[5]=p*g+f*M+_*A,r[8]=p*m+f*y+_*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*r*u+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,p=o*l-u*r,f=c*r-a*l,_=t*d+n*p+s*f;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/_;return e[0]=d*v,e[1]=(s*c-u*n)*v,e[2]=(o*n-s*a)*v,e[3]=p*v,e[4]=(u*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ha.makeScale(e,t)),this}rotate(e){return this.premultiply(ha.makeRotation(-e)),this}translate(e,t){return this.premultiply(ha.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ha=new Ye;function Ph(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Wr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function wd(){const i=Wr("canvas");return i.style.display="block",i}const Ol={};function di(i){i in Ol||(Ol[i]=!0,console.warn(i))}function Pd(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Cd(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Rd(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Bl=new Ye().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Vl=new Ye().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ld(){const i={enabled:!0,workingColorSpace:cs,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===at&&(s.r=Un(s.r),s.g=Un(s.g),s.b=Un(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===at&&(s.r=ts(s.r),s.g=ts(s.g),s.b=ts(s.b))),s},fromWorkingColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},toWorkingColorSpace:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Xn?Hr:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[cs]:{primaries:e,whitePoint:n,transfer:Hr,toXYZ:Bl,fromXYZ:Vl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Mt},outputColorSpaceConfig:{drawingBufferColorSpace:Mt}},[Mt]:{primaries:e,whitePoint:n,transfer:at,toXYZ:Bl,fromXYZ:Vl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Mt}}}),i}const et=Ld();function Un(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ts(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ri;class Id{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ri===void 0&&(Ri=Wr("canvas")),Ri.width=e.width,Ri.height=e.height;const n=Ri.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ri}return t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Wr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Un(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Un(t[n]/255)*255):t[n]=Un(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Dd=0;class al{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Dd++}),this.uuid=wi(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ua(s[a].image)):r.push(ua(s[a]))}else r=ua(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function ua(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Id.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ud=0;class Rt extends Ai{constructor(e=Rt.DEFAULT_IMAGE,t=Rt.DEFAULT_MAPPING,n=_i,s=_i,r=mt,a=In,o=bt,l=Fn,c=Rt.DEFAULT_ANISOTROPY,u=Xn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ud++}),this.uuid=wi(),this.name="",this.source=new al(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new he(0,0),this.repeat=new he(1,1),this.center=new he(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==_h)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case bi:e.x=e.x-Math.floor(e.x);break;case _i:e.x=e.x<0?0:1;break;case _o:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case bi:e.y=e.y-Math.floor(e.y);break;case _i:e.y=e.y<0?0:1;break;case _o:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Rt.DEFAULT_IMAGE=null;Rt.DEFAULT_MAPPING=_h;Rt.DEFAULT_ANISOTROPY=1;class gt{constructor(e=0,t=0,n=0,s=1){gt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],u=l[4],d=l[8],p=l[1],f=l[5],_=l[9],v=l[2],g=l[6],m=l[10];if(Math.abs(u-p)<.01&&Math.abs(d-v)<.01&&Math.abs(_-g)<.01){if(Math.abs(u+p)<.1&&Math.abs(d+v)<.1&&Math.abs(_+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(c+1)/2,y=(f+1)/2,C=(m+1)/2,A=(u+p)/4,R=(d+v)/4,U=(_+g)/4;return M>y&&M>C?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=A/n,r=R/n):y>C?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=A/s,r=U/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=R/r,s=U/r),this.set(n,s,r,t),this}let S=Math.sqrt((g-_)*(g-_)+(d-v)*(d-v)+(p-u)*(p-u));return Math.abs(S)<.001&&(S=1),this.x=(g-_)/S,this.y=(d-v)/S,this.z=(p-u)/S,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this.w=Xe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this.w=Xe(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Xe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Fd extends Ai{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new gt(0,0,e,t),this.scissorTest=!1,this.viewport=new gt(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:mt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Rt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new al(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Si extends Fd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Ch extends Rt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Bt,this.minFilter=Bt,this.wrapR=_i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Nd extends Rt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Bt,this.minFilter=Bt,this.wrapR=_i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Zn{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],u=n[s+2],d=n[s+3];const p=r[a+0],f=r[a+1],_=r[a+2],v=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(o===1){e[t+0]=p,e[t+1]=f,e[t+2]=_,e[t+3]=v;return}if(d!==v||l!==p||c!==f||u!==_){let g=1-o;const m=l*p+c*f+u*_+d*v,S=m>=0?1:-1,M=1-m*m;if(M>Number.EPSILON){const C=Math.sqrt(M),A=Math.atan2(C,m*S);g=Math.sin(g*A)/C,o=Math.sin(o*A)/C}const y=o*S;if(l=l*g+p*y,c=c*g+f*y,u=u*g+_*y,d=d*g+v*y,g===1-o){const C=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=C,c*=C,u*=C,d*=C}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],u=n[s+3],d=r[a],p=r[a+1],f=r[a+2],_=r[a+3];return e[t]=o*_+u*d+l*f-c*p,e[t+1]=l*_+u*p+c*d-o*f,e[t+2]=c*_+u*f+o*p-l*d,e[t+3]=u*_-o*d-l*p-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(s/2),d=o(r/2),p=l(n/2),f=l(s/2),_=l(r/2);switch(a){case"XYZ":this._x=p*u*d+c*f*_,this._y=c*f*d-p*u*_,this._z=c*u*_+p*f*d,this._w=c*u*d-p*f*_;break;case"YXZ":this._x=p*u*d+c*f*_,this._y=c*f*d-p*u*_,this._z=c*u*_-p*f*d,this._w=c*u*d+p*f*_;break;case"ZXY":this._x=p*u*d-c*f*_,this._y=c*f*d+p*u*_,this._z=c*u*_+p*f*d,this._w=c*u*d-p*f*_;break;case"ZYX":this._x=p*u*d-c*f*_,this._y=c*f*d+p*u*_,this._z=c*u*_-p*f*d,this._w=c*u*d+p*f*_;break;case"YZX":this._x=p*u*d+c*f*_,this._y=c*f*d+p*u*_,this._z=c*u*_-p*f*d,this._w=c*u*d-p*f*_;break;case"XZY":this._x=p*u*d-c*f*_,this._y=c*f*d-p*u*_,this._z=c*u*_+p*f*d,this._w=c*u*d+p*f*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],p=n+o+d;if(p>0){const f=.5/Math.sqrt(p+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(u-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xe(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-s*o,this._w=a*u-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),d=Math.sin((1-t)*u)/c,p=Math.sin(t*u)/c;return this._w=a*d+this._w*p,this._x=n*d+this._x*p,this._y=s*d+this._y*p,this._z=r*d+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class w{constructor(e=0,t=0,n=0){w.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(zl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(zl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),u=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+l*c+a*d-o*u,this.y=n+l*u+o*c-r*d,this.z=s+l*d+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Xe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return da.copy(this).projectOnVector(e),this.sub(da)}reflect(e){return this.sub(da.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Xe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const da=new w,zl=new Zn;class Zt{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(cn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(cn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=cn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,cn):cn.fromBufferAttribute(r,a),cn.applyMatrix4(e.matrixWorld),this.expandByPoint(cn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ys.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ys.copy(n.boundingBox)),Ys.applyMatrix4(e.matrixWorld),this.union(Ys)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,cn),cn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ps),$s.subVectors(this.max,ps),Li.subVectors(e.a,ps),Ii.subVectors(e.b,ps),Di.subVectors(e.c,ps),Nn.subVectors(Ii,Li),On.subVectors(Di,Ii),ei.subVectors(Li,Di);let t=[0,-Nn.z,Nn.y,0,-On.z,On.y,0,-ei.z,ei.y,Nn.z,0,-Nn.x,On.z,0,-On.x,ei.z,0,-ei.x,-Nn.y,Nn.x,0,-On.y,On.x,0,-ei.y,ei.x,0];return!fa(t,Li,Ii,Di,$s)||(t=[1,0,0,0,1,0,0,0,1],!fa(t,Li,Ii,Di,$s))?!1:(Ks.crossVectors(Nn,On),t=[Ks.x,Ks.y,Ks.z],fa(t,Li,Ii,Di,$s))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,cn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(cn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Sn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Sn=[new w,new w,new w,new w,new w,new w,new w,new w],cn=new w,Ys=new Zt,Li=new w,Ii=new w,Di=new w,Nn=new w,On=new w,ei=new w,ps=new w,$s=new w,Ks=new w,ti=new w;function fa(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ti.fromArray(i,r);const o=s.x*Math.abs(ti.x)+s.y*Math.abs(ti.y)+s.z*Math.abs(ti.z),l=e.dot(ti),c=t.dot(ti),u=n.dot(ti);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Od=new Zt,ms=new w,pa=new w;class fn{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Od.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ms.subVectors(e,this.center);const t=ms.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ms,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(pa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ms.copy(e.center).add(pa)),this.expandByPoint(ms.copy(e.center).sub(pa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const En=new w,ma=new w,Zs=new w,Bn=new w,ga=new w,js=new w,_a=new w;class Jr{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,En)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=En.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(En.copy(this.origin).addScaledVector(this.direction,t),En.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ma.copy(e).add(t).multiplyScalar(.5),Zs.copy(t).sub(e).normalize(),Bn.copy(this.origin).sub(ma);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Zs),o=Bn.dot(this.direction),l=-Bn.dot(Zs),c=Bn.lengthSq(),u=Math.abs(1-a*a);let d,p,f,_;if(u>0)if(d=a*l-o,p=a*o-l,_=r*u,d>=0)if(p>=-_)if(p<=_){const v=1/u;d*=v,p*=v,f=d*(d+a*p+2*o)+p*(a*d+p+2*l)+c}else p=r,d=Math.max(0,-(a*p+o)),f=-d*d+p*(p+2*l)+c;else p=-r,d=Math.max(0,-(a*p+o)),f=-d*d+p*(p+2*l)+c;else p<=-_?(d=Math.max(0,-(-a*r+o)),p=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+p*(p+2*l)+c):p<=_?(d=0,p=Math.min(Math.max(-r,-l),r),f=p*(p+2*l)+c):(d=Math.max(0,-(a*r+o)),p=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+p*(p+2*l)+c);else p=a>0?-r:r,d=Math.max(0,-(a*p+o)),f=-d*d+p*(p+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(ma).addScaledVector(Zs,p),f}intersectSphere(e,t){En.subVectors(e.center,this.origin);const n=En.dot(this.direction),s=En.dot(En)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,p=this.origin;return c>=0?(n=(e.min.x-p.x)*c,s=(e.max.x-p.x)*c):(n=(e.max.x-p.x)*c,s=(e.min.x-p.x)*c),u>=0?(r=(e.min.y-p.y)*u,a=(e.max.y-p.y)*u):(r=(e.max.y-p.y)*u,a=(e.min.y-p.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-p.z)*d,l=(e.max.z-p.z)*d):(o=(e.max.z-p.z)*d,l=(e.min.z-p.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,En)!==null}intersectTriangle(e,t,n,s,r){ga.subVectors(t,e),js.subVectors(n,e),_a.crossVectors(ga,js);let a=this.direction.dot(_a),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Bn.subVectors(this.origin,e);const l=o*this.direction.dot(js.crossVectors(Bn,js));if(l<0)return null;const c=o*this.direction.dot(ga.cross(Bn));if(c<0||l+c>a)return null;const u=-o*Bn.dot(_a);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class st{constructor(e,t,n,s,r,a,o,l,c,u,d,p,f,_,v,g){st.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,u,d,p,f,_,v,g)}set(e,t,n,s,r,a,o,l,c,u,d,p,f,_,v,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=u,m[10]=d,m[14]=p,m[3]=f,m[7]=_,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new st().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Ui.setFromMatrixColumn(e,0).length(),r=1/Ui.setFromMatrixColumn(e,1).length(),a=1/Ui.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const p=a*u,f=a*d,_=o*u,v=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=f+_*c,t[5]=p-v*c,t[9]=-o*l,t[2]=v-p*c,t[6]=_+f*c,t[10]=a*l}else if(e.order==="YXZ"){const p=l*u,f=l*d,_=c*u,v=c*d;t[0]=p+v*o,t[4]=_*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=f*o-_,t[6]=v+p*o,t[10]=a*l}else if(e.order==="ZXY"){const p=l*u,f=l*d,_=c*u,v=c*d;t[0]=p-v*o,t[4]=-a*d,t[8]=_+f*o,t[1]=f+_*o,t[5]=a*u,t[9]=v-p*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const p=a*u,f=a*d,_=o*u,v=o*d;t[0]=l*u,t[4]=_*c-f,t[8]=p*c+v,t[1]=l*d,t[5]=v*c+p,t[9]=f*c-_,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const p=a*l,f=a*c,_=o*l,v=o*c;t[0]=l*u,t[4]=v-p*d,t[8]=_*d+f,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*d+_,t[10]=p-v*d}else if(e.order==="XZY"){const p=a*l,f=a*c,_=o*l,v=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=p*d+v,t[5]=a*u,t[9]=f*d-_,t[2]=_*d-f,t[6]=o*u,t[10]=v*d+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Bd,e,Vd)}lookAt(e,t,n){const s=this.elements;return Xt.subVectors(e,t),Xt.lengthSq()===0&&(Xt.z=1),Xt.normalize(),Vn.crossVectors(n,Xt),Vn.lengthSq()===0&&(Math.abs(n.z)===1?Xt.x+=1e-4:Xt.z+=1e-4,Xt.normalize(),Vn.crossVectors(n,Xt)),Vn.normalize(),Js.crossVectors(Xt,Vn),s[0]=Vn.x,s[4]=Js.x,s[8]=Xt.x,s[1]=Vn.y,s[5]=Js.y,s[9]=Xt.y,s[2]=Vn.z,s[6]=Js.z,s[10]=Xt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],d=n[5],p=n[9],f=n[13],_=n[2],v=n[6],g=n[10],m=n[14],S=n[3],M=n[7],y=n[11],C=n[15],A=s[0],R=s[4],U=s[8],E=s[12],b=s[1],L=s[5],F=s[9],O=s[13],V=s[2],$=s[6],B=s[10],X=s[14],N=s[3],j=s[7],Q=s[11],se=s[15];return r[0]=a*A+o*b+l*V+c*N,r[4]=a*R+o*L+l*$+c*j,r[8]=a*U+o*F+l*B+c*Q,r[12]=a*E+o*O+l*X+c*se,r[1]=u*A+d*b+p*V+f*N,r[5]=u*R+d*L+p*$+f*j,r[9]=u*U+d*F+p*B+f*Q,r[13]=u*E+d*O+p*X+f*se,r[2]=_*A+v*b+g*V+m*N,r[6]=_*R+v*L+g*$+m*j,r[10]=_*U+v*F+g*B+m*Q,r[14]=_*E+v*O+g*X+m*se,r[3]=S*A+M*b+y*V+C*N,r[7]=S*R+M*L+y*$+C*j,r[11]=S*U+M*F+y*B+C*Q,r[15]=S*E+M*O+y*X+C*se,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],p=e[10],f=e[14],_=e[3],v=e[7],g=e[11],m=e[15];return _*(+r*l*d-s*c*d-r*o*p+n*c*p+s*o*f-n*l*f)+v*(+t*l*f-t*c*p+r*a*p-s*a*f+s*c*u-r*l*u)+g*(+t*c*d-t*o*f-r*a*d+n*a*f+r*o*u-n*c*u)+m*(-s*o*u-t*l*d+t*o*p+s*a*d-n*a*p+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],p=e[10],f=e[11],_=e[12],v=e[13],g=e[14],m=e[15],S=d*g*c-v*p*c+v*l*f-o*g*f-d*l*m+o*p*m,M=_*p*c-u*g*c-_*l*f+a*g*f+u*l*m-a*p*m,y=u*v*c-_*d*c+_*o*f-a*v*f-u*o*m+a*d*m,C=_*d*l-u*v*l-_*o*p+a*v*p+u*o*g-a*d*g,A=t*S+n*M+s*y+r*C;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/A;return e[0]=S*R,e[1]=(v*p*r-d*g*r-v*s*f+n*g*f+d*s*m-n*p*m)*R,e[2]=(o*g*r-v*l*r+v*s*c-n*g*c-o*s*m+n*l*m)*R,e[3]=(d*l*r-o*p*r-d*s*c+n*p*c+o*s*f-n*l*f)*R,e[4]=M*R,e[5]=(u*g*r-_*p*r+_*s*f-t*g*f-u*s*m+t*p*m)*R,e[6]=(_*l*r-a*g*r-_*s*c+t*g*c+a*s*m-t*l*m)*R,e[7]=(a*p*r-u*l*r+u*s*c-t*p*c-a*s*f+t*l*f)*R,e[8]=y*R,e[9]=(_*d*r-u*v*r-_*n*f+t*v*f+u*n*m-t*d*m)*R,e[10]=(a*v*r-_*o*r+_*n*c-t*v*c-a*n*m+t*o*m)*R,e[11]=(u*o*r-a*d*r-u*n*c+t*d*c+a*n*f-t*o*f)*R,e[12]=C*R,e[13]=(u*v*s-_*d*s+_*n*p-t*v*p-u*n*g+t*d*g)*R,e[14]=(_*o*s-a*v*s-_*n*l+t*v*l+a*n*g-t*o*g)*R,e[15]=(a*d*s-u*o*s+u*n*l-t*d*l-a*n*p+t*o*p)*R,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+n,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,d=o+o,p=r*c,f=r*u,_=r*d,v=a*u,g=a*d,m=o*d,S=l*c,M=l*u,y=l*d,C=n.x,A=n.y,R=n.z;return s[0]=(1-(v+m))*C,s[1]=(f+y)*C,s[2]=(_-M)*C,s[3]=0,s[4]=(f-y)*A,s[5]=(1-(p+m))*A,s[6]=(g+S)*A,s[7]=0,s[8]=(_+M)*R,s[9]=(g-S)*R,s[10]=(1-(p+v))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Ui.set(s[0],s[1],s[2]).length();const a=Ui.set(s[4],s[5],s[6]).length(),o=Ui.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],hn.copy(this);const c=1/r,u=1/a,d=1/o;return hn.elements[0]*=c,hn.elements[1]*=c,hn.elements[2]*=c,hn.elements[4]*=u,hn.elements[5]*=u,hn.elements[6]*=u,hn.elements[8]*=d,hn.elements[9]*=d,hn.elements[10]*=d,t.setFromRotationMatrix(hn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=Dn){const l=this.elements,c=2*r/(t-e),u=2*r/(n-s),d=(t+e)/(t-e),p=(n+s)/(n-s);let f,_;if(o===Dn)f=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Gr)f=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Dn){const l=this.elements,c=1/(t-e),u=1/(n-s),d=1/(a-r),p=(t+e)*c,f=(n+s)*u;let _,v;if(o===Dn)_=(a+r)*d,v=-2*d;else if(o===Gr)_=r*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-p,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ui=new w,hn=new st,Bd=new w(0,0,0),Vd=new w(1,1,1),Vn=new w,Js=new w,Xt=new w,kl=new st,Hl=new Zn;class rn{constructor(e=0,t=0,n=0,s=rn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],d=s[2],p=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Xe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Xe(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Xe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(p,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Xe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Xe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return kl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(kl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Hl.setFromEuler(this),this.setFromQuaternion(Hl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}rn.DEFAULT_ORDER="XYZ";class ol{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let zd=0;const Gl=new w,Fi=new Zn,Tn=new st,Qs=new w,gs=new w,kd=new w,Hd=new Zn,Wl=new w(1,0,0),Xl=new w(0,1,0),ql=new w(0,0,1),Yl={type:"added"},Gd={type:"removed"},Ni={type:"childadded",child:null},xa={type:"childremoved",child:null};class Et extends Ai{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:zd++}),this.uuid=wi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Et.DEFAULT_UP.clone();const e=new w,t=new rn,n=new Zn,s=new w(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new st},normalMatrix:{value:new Ye}}),this.matrix=new st,this.matrixWorld=new st,this.matrixAutoUpdate=Et.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ol,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Fi.setFromAxisAngle(e,t),this.quaternion.multiply(Fi),this}rotateOnWorldAxis(e,t){return Fi.setFromAxisAngle(e,t),this.quaternion.premultiply(Fi),this}rotateX(e){return this.rotateOnAxis(Wl,e)}rotateY(e){return this.rotateOnAxis(Xl,e)}rotateZ(e){return this.rotateOnAxis(ql,e)}translateOnAxis(e,t){return Gl.copy(e).applyQuaternion(this.quaternion),this.position.add(Gl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Wl,e)}translateY(e){return this.translateOnAxis(Xl,e)}translateZ(e){return this.translateOnAxis(ql,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Tn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Qs.copy(e):Qs.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),gs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Tn.lookAt(gs,Qs,this.up):Tn.lookAt(Qs,gs,this.up),this.quaternion.setFromRotationMatrix(Tn),s&&(Tn.extractRotation(s.matrixWorld),Fi.setFromRotationMatrix(Tn),this.quaternion.premultiply(Fi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Yl),Ni.child=e,this.dispatchEvent(Ni),Ni.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Gd),xa.child=e,this.dispatchEvent(xa),xa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Tn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Tn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Tn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Yl),Ni.child=e,this.dispatchEvent(Ni),Ni.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gs,e,kd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gs,Hd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),p=a(e.skeletons),f=a(e.animations),_=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),p.length>0&&(n.skeletons=p),f.length>0&&(n.animations=f),_.length>0&&(n.nodes=_)}return n.object=s,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Et.DEFAULT_UP=new w(0,1,0);Et.DEFAULT_MATRIX_AUTO_UPDATE=!0;Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const un=new w,An=new w,va=new w,wn=new w,Oi=new w,Bi=new w,$l=new w,ya=new w,Ma=new w,ba=new w,Sa=new gt,Ea=new gt,Ta=new gt;class sn{constructor(e=new w,t=new w,n=new w){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),un.subVectors(e,t),s.cross(un);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){un.subVectors(s,t),An.subVectors(n,t),va.subVectors(e,t);const a=un.dot(un),o=un.dot(An),l=un.dot(va),c=An.dot(An),u=An.dot(va),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const p=1/d,f=(c*l-o*u)*p,_=(a*u-o*l)*p;return r.set(1-f-_,_,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,wn)===null?!1:wn.x>=0&&wn.y>=0&&wn.x+wn.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,wn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,wn.x),l.addScaledVector(a,wn.y),l.addScaledVector(o,wn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return Sa.setScalar(0),Ea.setScalar(0),Ta.setScalar(0),Sa.fromBufferAttribute(e,t),Ea.fromBufferAttribute(e,n),Ta.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Sa,r.x),a.addScaledVector(Ea,r.y),a.addScaledVector(Ta,r.z),a}static isFrontFacing(e,t,n,s){return un.subVectors(n,t),An.subVectors(e,t),un.cross(An).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return un.subVectors(this.c,this.b),An.subVectors(this.a,this.b),un.cross(An).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return sn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return sn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return sn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return sn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return sn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Oi.subVectors(s,n),Bi.subVectors(r,n),ya.subVectors(e,n);const l=Oi.dot(ya),c=Bi.dot(ya);if(l<=0&&c<=0)return t.copy(n);Ma.subVectors(e,s);const u=Oi.dot(Ma),d=Bi.dot(Ma);if(u>=0&&d<=u)return t.copy(s);const p=l*d-u*c;if(p<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Oi,a);ba.subVectors(e,r);const f=Oi.dot(ba),_=Bi.dot(ba);if(_>=0&&f<=_)return t.copy(r);const v=f*c-l*_;if(v<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(n).addScaledVector(Bi,o);const g=u*_-f*d;if(g<=0&&d-u>=0&&f-_>=0)return $l.subVectors(r,s),o=(d-u)/(d-u+(f-_)),t.copy(s).addScaledVector($l,o);const m=1/(g+v+p);return a=v*m,o=p*m,t.copy(n).addScaledVector(Oi,a).addScaledVector(Bi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Rh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zn={h:0,s:0,l:0},er={h:0,s:0,l:0};function Aa(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ve{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Mt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=et.workingColorSpace){return this.r=e,this.g=t,this.b=n,et.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=et.workingColorSpace){if(e=rl(e,1),t=Xe(t,0,1),n=Xe(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Aa(a,r,e+1/3),this.g=Aa(a,r,e),this.b=Aa(a,r,e-1/3)}return et.toWorkingColorSpace(this,s),this}setStyle(e,t=Mt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Mt){const n=Rh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Un(e.r),this.g=Un(e.g),this.b=Un(e.b),this}copyLinearToSRGB(e){return this.r=ts(e.r),this.g=ts(e.g),this.b=ts(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Mt){return et.fromWorkingColorSpace(Dt.copy(this),e),Math.round(Xe(Dt.r*255,0,255))*65536+Math.round(Xe(Dt.g*255,0,255))*256+Math.round(Xe(Dt.b*255,0,255))}getHexString(e=Mt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.fromWorkingColorSpace(Dt.copy(this),t);const n=Dt.r,s=Dt.g,r=Dt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=et.workingColorSpace){return et.fromWorkingColorSpace(Dt.copy(this),t),e.r=Dt.r,e.g=Dt.g,e.b=Dt.b,e}getStyle(e=Mt){et.fromWorkingColorSpace(Dt.copy(this),e);const t=Dt.r,n=Dt.g,s=Dt.b;return e!==Mt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(zn),this.setHSL(zn.h+e,zn.s+t,zn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(zn),e.getHSL(er);const n=Cs(zn.h,er.h,t),s=Cs(zn.s,er.s,t),r=Cs(zn.l,er.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Dt=new Ve;Ve.NAMES=Rh;let Wd=0;class an extends Ai{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Wd++}),this.uuid=wi(),this.name="",this.type="Material",this.blending=Ji,this.side=$t,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ao,this.blendDst=oo,this.blendEquation=pi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ve(0,0,0),this.blendAlpha=0,this.depthFunc=ss,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Dl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ci,this.stencilZFail=Ci,this.stencilZPass=Ci,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ji&&(n.blending=this.blending),this.side!==$t&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ao&&(n.blendSrc=this.blendSrc),this.blendDst!==oo&&(n.blendDst=this.blendDst),this.blendEquation!==pi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ss&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Dl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ci&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ci&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ci&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ns extends an{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.combine=Kr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const yt=new w,tr=new he;let Xd=0;class jt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Xd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ul,this.updateRanges=[],this.gpuType=Kt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)tr.fromBufferAttribute(this,t),tr.applyMatrix3(e),this.setXY(t,tr.x,tr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix3(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix4(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyNormalMatrix(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.transformDirection(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Yi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Nt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Yi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Yi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Yi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Yi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),n=Nt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),n=Nt(n,this.array),s=Nt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),n=Nt(n,this.array),s=Nt(s,this.array),r=Nt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ul&&(e.usage=this.usage),e}}class Lh extends jt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Ih extends jt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ze extends jt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let qd=0;const en=new st,wa=new Et,Vi=new w,qt=new Zt,_s=new Zt,wt=new w;class _t extends Ai{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:qd++}),this.uuid=wi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ph(e)?Ih:Lh)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ye().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return en.makeRotationFromQuaternion(e),this.applyMatrix4(en),this}rotateX(e){return en.makeRotationX(e),this.applyMatrix4(en),this}rotateY(e){return en.makeRotationY(e),this.applyMatrix4(en),this}rotateZ(e){return en.makeRotationZ(e),this.applyMatrix4(en),this}translate(e,t,n){return en.makeTranslation(e,t,n),this.applyMatrix4(en),this}scale(e,t,n){return en.makeScale(e,t,n),this.applyMatrix4(en),this}lookAt(e){return wa.lookAt(e),wa.updateMatrix(),this.applyMatrix4(wa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vi).negate(),this.translate(Vi.x,Vi.y,Vi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ze(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];qt.setFromBufferAttribute(r),this.morphTargetsRelative?(wt.addVectors(this.boundingBox.min,qt.min),this.boundingBox.expandByPoint(wt),wt.addVectors(this.boundingBox.max,qt.max),this.boundingBox.expandByPoint(wt)):(this.boundingBox.expandByPoint(qt.min),this.boundingBox.expandByPoint(qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new w,1/0);return}if(e){const n=this.boundingSphere.center;if(qt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];_s.setFromBufferAttribute(o),this.morphTargetsRelative?(wt.addVectors(qt.min,_s.min),qt.expandByPoint(wt),wt.addVectors(qt.max,_s.max),qt.expandByPoint(wt)):(qt.expandByPoint(_s.min),qt.expandByPoint(_s.max))}qt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)wt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(wt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)wt.fromBufferAttribute(o,c),l&&(Vi.fromBufferAttribute(e,c),wt.add(Vi)),s=Math.max(s,n.distanceToSquared(wt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new jt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let U=0;U<n.count;U++)o[U]=new w,l[U]=new w;const c=new w,u=new w,d=new w,p=new he,f=new he,_=new he,v=new w,g=new w;function m(U,E,b){c.fromBufferAttribute(n,U),u.fromBufferAttribute(n,E),d.fromBufferAttribute(n,b),p.fromBufferAttribute(r,U),f.fromBufferAttribute(r,E),_.fromBufferAttribute(r,b),u.sub(c),d.sub(c),f.sub(p),_.sub(p);const L=1/(f.x*_.y-_.x*f.y);isFinite(L)&&(v.copy(u).multiplyScalar(_.y).addScaledVector(d,-f.y).multiplyScalar(L),g.copy(d).multiplyScalar(f.x).addScaledVector(u,-_.x).multiplyScalar(L),o[U].add(v),o[E].add(v),o[b].add(v),l[U].add(g),l[E].add(g),l[b].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let U=0,E=S.length;U<E;++U){const b=S[U],L=b.start,F=b.count;for(let O=L,V=L+F;O<V;O+=3)m(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const M=new w,y=new w,C=new w,A=new w;function R(U){C.fromBufferAttribute(s,U),A.copy(C);const E=o[U];M.copy(E),M.sub(C.multiplyScalar(C.dot(E))).normalize(),y.crossVectors(A,E);const L=y.dot(l[U])<0?-1:1;a.setXYZW(U,M.x,M.y,M.z,L)}for(let U=0,E=S.length;U<E;++U){const b=S[U],L=b.start,F=b.count;for(let O=L,V=L+F;O<V;O+=3)R(e.getX(O+0)),R(e.getX(O+1)),R(e.getX(O+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new jt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let p=0,f=n.count;p<f;p++)n.setXYZ(p,0,0,0);const s=new w,r=new w,a=new w,o=new w,l=new w,c=new w,u=new w,d=new w;if(e)for(let p=0,f=e.count;p<f;p+=3){const _=e.getX(p+0),v=e.getX(p+1),g=e.getX(p+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,g),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(n,_),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),o.add(u),l.add(u),c.add(u),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let p=0,f=t.count;p<f;p+=3)s.fromBufferAttribute(t,p+0),r.fromBufferAttribute(t,p+1),a.fromBufferAttribute(t,p+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),n.setXYZ(p+0,u.x,u.y,u.z),n.setXYZ(p+1,u.x,u.y,u.z),n.setXYZ(p+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)wt.fromBufferAttribute(e,t),wt.normalize(),e.setXYZ(t,wt.x,wt.y,wt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,d=o.normalized,p=new c.constructor(l.length*u);let f=0,_=0;for(let v=0,g=l.length;v<g;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*u;for(let m=0;m<u;m++)p[_++]=c[f++]}return new jt(p,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new _t,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,d=c.length;u<d;u++){const p=c[u],f=e(p,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,p=c.length;d<p;d++){const f=c[d];u.push(f.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],d=r[c];for(let p=0,f=d.length;p<f;p++)u.push(d[p].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Kl=new st,ni=new Jr,nr=new fn,Zl=new w,ir=new w,sr=new w,rr=new w,Pa=new w,ar=new w,jl=new w,or=new w;class Ct extends Et{constructor(e=new _t,t=new Ns){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){ar.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],d=r[l];u!==0&&(Pa.fromBufferAttribute(d,e),a?ar.addScaledVector(Pa,u):ar.addScaledVector(Pa.sub(t),u))}t.add(ar)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),nr.copy(n.boundingSphere),nr.applyMatrix4(r),ni.copy(e.ray).recast(e.near),!(nr.containsPoint(ni.origin)===!1&&(ni.intersectSphere(nr,Zl)===null||ni.origin.distanceToSquared(Zl)>(e.far-e.near)**2))&&(Kl.copy(r).invert(),ni.copy(e.ray).applyMatrix4(Kl),!(n.boundingBox!==null&&ni.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ni)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,p=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,v=p.length;_<v;_++){const g=p[_],m=a[g.materialIndex],S=Math.max(g.start,f.start),M=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let y=S,C=M;y<C;y+=3){const A=o.getX(y),R=o.getX(y+1),U=o.getX(y+2);s=lr(this,m,e,n,c,u,d,A,R,U),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const _=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let g=_,m=v;g<m;g+=3){const S=o.getX(g),M=o.getX(g+1),y=o.getX(g+2);s=lr(this,a,e,n,c,u,d,S,M,y),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,v=p.length;_<v;_++){const g=p[_],m=a[g.materialIndex],S=Math.max(g.start,f.start),M=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let y=S,C=M;y<C;y+=3){const A=y,R=y+1,U=y+2;s=lr(this,m,e,n,c,u,d,A,R,U),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const _=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=_,m=v;g<m;g+=3){const S=g,M=g+1,y=g+2;s=lr(this,a,e,n,c,u,d,S,M,y),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}}function Yd(i,e,t,n,s,r,a,o){let l;if(e.side===Gt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===$t,o),l===null)return null;or.copy(o),or.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(or);return c<t.near||c>t.far?null:{distance:c,point:or.clone(),object:i}}function lr(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,ir),i.getVertexPosition(l,sr),i.getVertexPosition(c,rr);const u=Yd(i,e,t,n,ir,sr,rr,jl);if(u){const d=new w;sn.getBarycoord(jl,ir,sr,rr,d),s&&(u.uv=sn.getInterpolatedAttribute(s,o,l,c,d,new he)),r&&(u.uv1=sn.getInterpolatedAttribute(r,o,l,c,d,new he)),a&&(u.normal=sn.getInterpolatedAttribute(a,o,l,c,d,new w),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const p={a:o,b:l,c,normal:new w,materialIndex:0};sn.getNormal(ir,sr,rr,p.normal),u.face=p,u.barycoord=d}return u}class Hs extends _t{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],d=[];let p=0,f=0;_("z","y","x",-1,-1,n,t,e,a,r,0),_("z","y","x",1,-1,n,t,-e,a,r,1),_("x","z","y",1,1,e,n,t,s,a,2),_("x","z","y",1,-1,e,n,-t,s,a,3),_("x","y","z",1,-1,e,t,n,s,r,4),_("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Ze(c,3)),this.setAttribute("normal",new Ze(u,3)),this.setAttribute("uv",new Ze(d,2));function _(v,g,m,S,M,y,C,A,R,U,E){const b=y/R,L=C/U,F=y/2,O=C/2,V=A/2,$=R+1,B=U+1;let X=0,N=0;const j=new w;for(let Q=0;Q<B;Q++){const se=Q*L-O;for(let ue=0;ue<$;ue++){const Ae=ue*b-F;j[v]=Ae*S,j[g]=se*M,j[m]=V,c.push(j.x,j.y,j.z),j[v]=0,j[g]=0,j[m]=A>0?1:-1,u.push(j.x,j.y,j.z),d.push(ue/R),d.push(1-Q/U),X+=1}}for(let Q=0;Q<U;Q++)for(let se=0;se<R;se++){const ue=p+se+$*Q,Ae=p+se+$*(Q+1),q=p+(se+1)+$*(Q+1),te=p+(se+1)+$*Q;l.push(ue,Ae,te),l.push(Ae,q,te),N+=6}o.addGroup(f,N,E),f+=N,p+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function hs(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Ot(i){const e={};for(let t=0;t<i.length;t++){const n=hs(i[t]);for(const s in n)e[s]=n[s]}return e}function $d(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Dh(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const Kd={clone:hs,merge:Ot};var Zd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,jd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class jn extends an{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Zd,this.fragmentShader=jd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=hs(e.uniforms),this.uniformsGroups=$d(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Uh extends Et{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new st,this.projectionMatrix=new st,this.projectionMatrixInverse=new st,this.coordinateSystem=Dn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const kn=new w,Jl=new he,Ql=new he;class nn extends Uh{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Fs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(es*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Fs*2*Math.atan(Math.tan(es*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(kn.x,kn.y).multiplyScalar(-e/kn.z),kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(kn.x,kn.y).multiplyScalar(-e/kn.z)}getViewSize(e,t){return this.getViewBounds(e,Jl,Ql),t.subVectors(Ql,Jl)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(es*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const zi=-90,ki=1;class Jd extends Et{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new nn(zi,ki,e,t);s.layers=this.layers,this.add(s);const r=new nn(zi,ki,e,t);r.layers=this.layers,this.add(r);const a=new nn(zi,ki,e,t);a.layers=this.layers,this.add(a);const o=new nn(zi,ki,e,t);o.layers=this.layers,this.add(o);const l=new nn(zi,ki,e,t);l.layers=this.layers,this.add(l);const c=new nn(zi,ki,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Dn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Gr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,u]=this.children,d=e.getRenderTarget(),p=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(d,p,f),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Fh extends Rt{constructor(e,t,n,s,r,a,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:rs,super(e,t,n,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Qd extends Si{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Fh(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:mt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Hs(5,5,5),r=new jn({name:"CubemapFromEquirect",uniforms:hs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Gt,blending:Yn});r.uniforms.tEquirect.value=t;const a=new Ct(s,r),o=t.minFilter;return t.minFilter===In&&(t.minFilter=mt),new Jd(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}class As extends Et{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ef={type:"move"};class Ca{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new As,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new As,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new As,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const g=t.getJointPose(v,n),m=this._getHandJoint(c,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],p=u.position.distanceTo(d.position),f=.02,_=.005;c.inputState.pinching&&p>f+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&p<=f-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ef)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new As;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class tf extends Et{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new rn,this.environmentIntensity=1,this.environmentRotation=new rn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class dn extends Rt{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Bt,u=Bt,d,p){super(null,a,o,l,c,u,s,r,d,p),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ec extends jt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Hi=new st,tc=new st,cr=[],nc=new Zt,nf=new st,xs=new Ct,vs=new fn;class Px extends Ct{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ec(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,nf)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Zt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Hi),nc.copy(e.boundingBox).applyMatrix4(Hi),this.boundingBox.union(nc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new fn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Hi),vs.copy(e.boundingSphere).applyMatrix4(Hi),this.boundingSphere.union(vs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(xs.geometry=this.geometry,xs.material=this.material,xs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),vs.copy(this.boundingSphere),vs.applyMatrix4(n),e.ray.intersectsSphere(vs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Hi),tc.multiplyMatrices(n,Hi),xs.matrixWorld=tc,xs.raycast(e,cr);for(let a=0,o=cr.length;a<o;a++){const l=cr[a];l.instanceId=r,l.object=this,t.push(l)}cr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ec(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new dn(new Float32Array(s*this.count),s,this.count,nl,Kt));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ra=new w,sf=new w,rf=new Ye;class Ln{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Ra.subVectors(n,t).cross(sf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Ra),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||rf.getNormalMatrix(e),s=this.coplanarPoint(Ra).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ii=new fn,hr=new w;class Qr{constructor(e=new Ln,t=new Ln,n=new Ln,s=new Ln,r=new Ln,a=new Ln){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Dn){const n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],u=s[5],d=s[6],p=s[7],f=s[8],_=s[9],v=s[10],g=s[11],m=s[12],S=s[13],M=s[14],y=s[15];if(n[0].setComponents(l-r,p-c,g-f,y-m).normalize(),n[1].setComponents(l+r,p+c,g+f,y+m).normalize(),n[2].setComponents(l+a,p+u,g+_,y+S).normalize(),n[3].setComponents(l-a,p-u,g-_,y-S).normalize(),n[4].setComponents(l-o,p-d,g-v,y-M).normalize(),t===Dn)n[5].setComponents(l+o,p+d,g+v,y+M).normalize();else if(t===Gr)n[5].setComponents(o,d,v,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ii.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ii.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ii)}intersectsSprite(e){return ii.center.set(0,0,0),ii.radius=.7071067811865476,ii.applyMatrix4(e.matrixWorld),this.intersectsSphere(ii)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(hr.x=s.normal.x>0?e.max.x:e.min.x,hr.y=s.normal.y>0?e.max.y:e.min.y,hr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(hr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function La(i,e){return i-e}function af(i,e){return i.z-e.z}function of(i,e){return e.z-i.z}class lf{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,s){const r=this.pool,a=this.list;this.index>=r.length&&r.push({start:-1,count:-1,z:-1,index:-1});const o=r[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=s}reset(){this.list.length=0,this.index=0}}const zt=new st,cf=new Ve(1,1,1),Ia=new Qr,ur=new Zt,si=new fn,ys=new w,ic=new w,hf=new w,Da=new lf,Ut=new Ct,dr=[];function uf(i,e,t=0){const n=e.itemSize;if(i.isInterleavedBufferAttribute||i.array.constructor!==e.array.constructor){const s=i.count;for(let r=0;r<s;r++)for(let a=0;a<n;a++)e.setComponent(r+t,a,i.getComponent(r,a))}else e.array.set(i.array,t*n);e.needsUpdate=!0}function ri(i,e){if(i.constructor!==e.constructor){const t=Math.min(i.length,e.length);for(let n=0;n<t;n++)e[n]=i[n]}else{const t=Math.min(i.length,e.length);e.set(new i.constructor(i.buffer,0,t))}}class Cx extends Ct{constructor(e,t,n=t*2,s){super(new _t,s),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._multiDrawInstances=null,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4),n=new dn(t,e,e,bt,Kt);this._matricesTexture=n}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Uint32Array(e*e),n=new dn(t,e,e,jr,Kn);this._indirectTexture=n}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Float32Array(e*e*4).fill(1),n=new dn(t,e,e,bt,Kt);n.colorSpace=et.workingColorSpace,this._colorsTexture=n}_initializeGeometry(e){const t=this.geometry,n=this._maxVertexCount,s=this._maxIndexCount;if(this._geometryInitialized===!1){for(const r in e.attributes){const a=e.getAttribute(r),{array:o,itemSize:l,normalized:c}=a,u=new o.constructor(n*l),d=new jt(u,l,c);t.setAttribute(r,d)}if(e.getIndex()!==null){const r=n>65535?new Uint32Array(s):new Uint16Array(s);t.setIndex(new jt(r,1))}this._geometryInitialized=!0}}_validateGeometry(e){const t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(const n in t.attributes){if(!e.hasAttribute(n))throw new Error(`THREE.BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);const s=e.getAttribute(n),r=t.getAttribute(n);if(s.itemSize!==r.itemSize||s.normalized!==r.normalized)throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(e){const t=this._instanceInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${e}. Instance is either out of range or has been deleted.`)}validateGeometryId(e){const t=this._geometryInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${e}. Geometry is either out of range or has been deleted.`)}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zt);const e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let n=0,s=t.length;n<s;n++){if(t[n].active===!1)continue;const r=t[n].geometryIndex;this.getMatrixAt(n,zt),this.getBoundingBoxAt(r,ur).applyMatrix4(zt),e.union(ur)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fn);const e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let n=0,s=t.length;n<s;n++){if(t[n].active===!1)continue;const r=t[n].geometryIndex;this.getMatrixAt(n,zt),this.getBoundingSphereAt(r,si).applyMatrix4(zt),e.union(si)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("THREE.BatchedMesh: Maximum item count reached.");const n={visible:!0,active:!0,geometryIndex:e};let s=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(La),s=this._availableInstanceIds.shift(),this._instanceInfo[s]=n):(s=this._instanceInfo.length,this._instanceInfo.push(n));const r=this._matricesTexture;zt.identity().toArray(r.image.data,s*16),r.needsUpdate=!0;const a=this._colorsTexture;return a&&(cf.toArray(a.image.data,s*4),a.needsUpdate=!0),this._visibilityChanged=!0,s}addGeometry(e,t=-1,n=-1){this._initializeGeometry(e),this._validateGeometry(e);const s={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},r=this._geometryInfo;s.vertexStart=this._nextVertexStart,s.reservedVertexCount=t===-1?e.getAttribute("position").count:t;const a=e.getIndex();if(a!==null&&(s.indexStart=this._nextIndexStart,s.reservedIndexCount=n===-1?a.count:n),s.indexStart!==-1&&s.indexStart+s.reservedIndexCount>this._maxIndexCount||s.vertexStart+s.reservedVertexCount>this._maxVertexCount)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(La),l=this._availableGeometryIds.shift(),r[l]=s):(l=this._geometryCount,this._geometryCount++,r.push(s)),this.setGeometryAt(l,e),this._nextIndexStart=s.indexStart+s.reservedIndexCount,this._nextVertexStart=s.vertexStart+s.reservedVertexCount,l}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);const n=this.geometry,s=n.getIndex()!==null,r=n.getIndex(),a=t.getIndex(),o=this._geometryInfo[e];if(s&&a.count>o.reservedIndexCount||t.attributes.position.count>o.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");const l=o.vertexStart,c=o.reservedVertexCount;o.vertexCount=t.getAttribute("position").count;for(const u in n.attributes){const d=t.getAttribute(u),p=n.getAttribute(u);uf(d,p,l);const f=d.itemSize;for(let _=d.count,v=c;_<v;_++){const g=l+_;for(let m=0;m<f;m++)p.setComponent(g,m,0)}p.needsUpdate=!0,p.addUpdateRange(l*f,c*f)}if(s){const u=o.indexStart,d=o.reservedIndexCount;o.indexCount=t.getIndex().count;for(let p=0;p<a.count;p++)r.setX(u+p,l+a.getX(p));for(let p=a.count,f=d;p<f;p++)r.setX(u+p,l);r.needsUpdate=!0,r.addUpdateRange(u,o.reservedIndexCount)}return o.start=s?o.indexStart:o.vertexStart,o.count=s?o.indexCount:o.vertexCount,o.boundingBox=null,t.boundingBox!==null&&(o.boundingBox=t.boundingBox.clone()),o.boundingSphere=null,t.boundingSphere!==null&&(o.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){const t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;const n=this._instanceInfo;for(let s=0,r=n.length;s<r;s++)n[s].active&&n[s].geometryIndex===e&&this.deleteInstance(s);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){return this.validateInstanceId(e),this._instanceInfo[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this}optimize(){let e=0,t=0;const n=this._geometryInfo,s=n.map((a,o)=>o).sort((a,o)=>n[a].vertexStart-n[o].vertexStart),r=this.geometry;for(let a=0,o=n.length;a<o;a++){const l=s[a],c=n[l];if(c.active!==!1){if(r.index!==null){if(c.indexStart!==t){const{indexStart:u,vertexStart:d,reservedIndexCount:p}=c,f=r.index,_=f.array,v=e-d;for(let g=u;g<u+p;g++)_[g]=_[g]+v;f.array.copyWithin(t,u,u+p),f.addUpdateRange(t,p),c.indexStart=t}t+=c.reservedIndexCount}if(c.vertexStart!==e){const{vertexStart:u,reservedVertexCount:d}=c,p=r.attributes;for(const f in p){const _=p[f],{array:v,itemSize:g}=_;v.copyWithin(e*g,u*g,(u+d)*g),_.addUpdateRange(e*g,d*g)}c.vertexStart=e}e+=c.reservedVertexCount,c.start=r.index?c.indexStart:c.vertexStart,this._nextIndexStart=r.index?c.indexStart+c.reservedIndexCount:0,this._nextVertexStart=c.vertexStart+c.reservedVertexCount}}return this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,s=this._geometryInfo[e];if(s.boundingBox===null){const r=new Zt,a=n.index,o=n.attributes.position;for(let l=s.start,c=s.start+s.count;l<c;l++){let u=l;a&&(u=a.getX(u)),r.expandByPoint(ys.fromBufferAttribute(o,u))}s.boundingBox=r}return t.copy(s.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,s=this._geometryInfo[e];if(s.boundingSphere===null){const r=new fn;this.getBoundingBoxAt(e,ur),ur.getCenter(r.center);const a=n.index,o=n.attributes.position;let l=0;for(let c=s.start,u=s.start+s.count;c<u;c++){let d=c;a&&(d=a.getX(d)),ys.fromBufferAttribute(o,d),l=Math.max(l,r.center.distanceToSquared(ys))}r.radius=Math.sqrt(l),s.boundingSphere=r}return t.copy(s.boundingSphere),t}setMatrixAt(e,t){this.validateInstanceId(e);const n=this._matricesTexture,s=this._matricesTexture.image.data;return t.toArray(s,e*16),n.needsUpdate=!0,this}getMatrixAt(e,t){return this.validateInstanceId(e),t.fromArray(this._matricesTexture.image.data,e*16)}setColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null&&this._initColorsTexture(),t.toArray(this._colorsTexture.image.data,e*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(e,t){return this.validateInstanceId(e),t.fromArray(this._colorsTexture.image.data,e*4)}setVisibleAt(e,t){return this.validateInstanceId(e),this._instanceInfo[e].visible===t?this:(this._instanceInfo[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){return this.validateInstanceId(e),this._instanceInfo[e].visible}setGeometryIdAt(e,t){return this.validateInstanceId(e),this.validateGeometryId(t),this._instanceInfo[e].geometryIndex=t,this}getGeometryIdAt(e){return this.validateInstanceId(e),this._instanceInfo[e].geometryIndex}getGeometryRangeAt(e,t={}){this.validateGeometryId(e);const n=this._geometryInfo[e];return t.vertexStart=n.vertexStart,t.vertexCount=n.vertexCount,t.reservedVertexCount=n.reservedVertexCount,t.indexStart=n.indexStart,t.indexCount=n.indexCount,t.reservedIndexCount=n.reservedIndexCount,t.start=n.start,t.count=n.count,t}setInstanceCount(e){const t=this._availableInstanceIds,n=this._instanceInfo;for(t.sort(La);t[t.length-1]===n.length;)n.pop(),t.pop();if(e<n.length)throw new Error(`BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);const s=new Int32Array(e),r=new Int32Array(e);ri(this._multiDrawCounts,s),ri(this._multiDrawStarts,r),this._multiDrawCounts=s,this._multiDrawStarts=r,this._maxInstanceCount=e;const a=this._indirectTexture,o=this._matricesTexture,l=this._colorsTexture;a.dispose(),this._initIndirectTexture(),ri(a.image.data,this._indirectTexture.image.data),o.dispose(),this._initMatricesTexture(),ri(o.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),ri(l.image.data,this._colorsTexture.image.data))}setGeometrySize(e,t){const n=[...this._geometryInfo].filter(o=>o.active);if(Math.max(...n.map(o=>o.vertexStart+o.reservedVertexCount))>e)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${t}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(l=>l.indexStart+l.reservedIndexCount))>t)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);const r=this.geometry;r.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new _t,this._initializeGeometry(r));const a=this.geometry;r.index&&ri(r.index.array,a.index.array);for(const o in r.attributes)ri(r.attributes[o].array,a.attributes[o].array)}raycast(e,t){const n=this._instanceInfo,s=this._geometryInfo,r=this.matrixWorld,a=this.geometry;Ut.material=this.material,Ut.geometry.index=a.index,Ut.geometry.attributes=a.attributes,Ut.geometry.boundingBox===null&&(Ut.geometry.boundingBox=new Zt),Ut.geometry.boundingSphere===null&&(Ut.geometry.boundingSphere=new fn);for(let o=0,l=n.length;o<l;o++){if(!n[o].visible||!n[o].active)continue;const c=n[o].geometryIndex,u=s[c];Ut.geometry.setDrawRange(u.start,u.count),this.getMatrixAt(o,Ut.matrixWorld).premultiply(r),this.getBoundingBoxAt(c,Ut.geometry.boundingBox),this.getBoundingSphereAt(c,Ut.geometry.boundingSphere),Ut.raycast(e,dr);for(let d=0,p=dr.length;d<p;d++){const f=dr[d];f.object=this,f.batchId=o,t.push(f)}dr.length=0}Ut.material=null,Ut.geometry.index=null,Ut.geometry.attributes={},Ut.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._geometryCount=e._geometryCount,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null)}onBeforeRender(e,t,n,s,r){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const a=s.getIndex(),o=a===null?1:a.array.BYTES_PER_ELEMENT,l=this._instanceInfo,c=this._multiDrawStarts,u=this._multiDrawCounts,d=this._geometryInfo,p=this.perObjectFrustumCulled,f=this._indirectTexture,_=f.image.data;p&&(zt.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),Ia.setFromProjectionMatrix(zt,e.coordinateSystem));let v=0;if(this.sortObjects){zt.copy(this.matrixWorld).invert(),ys.setFromMatrixPosition(n.matrixWorld).applyMatrix4(zt),ic.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(zt);for(let S=0,M=l.length;S<M;S++)if(l[S].visible&&l[S].active){const y=l[S].geometryIndex;this.getMatrixAt(S,zt),this.getBoundingSphereAt(y,si).applyMatrix4(zt);let C=!1;if(p&&(C=!Ia.intersectsSphere(si)),!C){const A=d[y],R=hf.subVectors(si.center,ys).dot(ic);Da.push(A.start,A.count,R,S)}}const g=Da.list,m=this.customSort;m===null?g.sort(r.transparent?of:af):m.call(this,g,n);for(let S=0,M=g.length;S<M;S++){const y=g[S];c[v]=y.start*o,u[v]=y.count,_[v]=y.index,v++}Da.reset()}else for(let g=0,m=l.length;g<m;g++)if(l[g].visible&&l[g].active){const S=l[g].geometryIndex;let M=!1;if(p&&(this.getMatrixAt(g,zt),this.getBoundingSphereAt(S,si).applyMatrix4(zt),M=!Ia.intersectsSphere(si)),!M){const y=d[S];c[v]=y.start*o,u[v]=y.count,_[v]=g,v++}}f.needsUpdate=!0,this._multiDrawCount=v,this._visibilityChanged=!1}onBeforeShadow(e,t,n,s,r,a){this.onBeforeRender(e,null,s,r,a)}}class ea extends an{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ve(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Xr=new w,qr=new w,sc=new st,Ms=new Jr,fr=new fn,Ua=new w,rc=new w;class Nh extends Et{constructor(e=new _t,t=new ea){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Xr.fromBufferAttribute(t,s-1),qr.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Xr.distanceTo(qr);e.setAttribute("lineDistance",new Ze(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),fr.copy(n.boundingSphere),fr.applyMatrix4(s),fr.radius+=r,e.ray.intersectsSphere(fr)===!1)return;sc.copy(s).invert(),Ms.copy(e.ray).applyMatrix4(sc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,p=n.attributes.position;if(u!==null){const f=Math.max(0,a.start),_=Math.min(u.count,a.start+a.count);for(let v=f,g=_-1;v<g;v+=c){const m=u.getX(v),S=u.getX(v+1),M=pr(this,e,Ms,l,m,S,v);M&&t.push(M)}if(this.isLineLoop){const v=u.getX(_-1),g=u.getX(f),m=pr(this,e,Ms,l,v,g,_-1);m&&t.push(m)}}else{const f=Math.max(0,a.start),_=Math.min(p.count,a.start+a.count);for(let v=f,g=_-1;v<g;v+=c){const m=pr(this,e,Ms,l,v,v+1,v);m&&t.push(m)}if(this.isLineLoop){const v=pr(this,e,Ms,l,_-1,f,_-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function pr(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(Xr.fromBufferAttribute(o,s),qr.fromBufferAttribute(o,r),t.distanceSqToSegment(Xr,qr,Ua,rc)>n)return;Ua.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Ua);if(!(c<e.near||c>e.far))return{distance:c,point:rc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const ac=new w,oc=new w;class Rx extends Nh{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)ac.fromBufferAttribute(t,s),oc.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+ac.distanceTo(oc);e.setAttribute("lineDistance",new Ze(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class df extends an{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ve(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}class ff extends Rt{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Oh extends Rt{constructor(e,t,n,s,r,a,o,l,c,u=Qi){if(u!==Qi&&u!==ls)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Qi&&(n=Kn),n===void 0&&u===ls&&(n=os),super(null,s,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Bt,this.minFilter=l!==void 0?l:Bt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new al(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Mn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const u=n[s],p=n[s+1]-u,f=(a-u)/p;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new he:new w);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new w,s=[],r=[],a=[],o=new w,l=new st;for(let f=0;f<=e;f++){const _=f/e;s[f]=this.getTangentAt(_,new w)}r[0]=new w,a[0]=new w;let c=Number.MAX_VALUE;const u=Math.abs(s[0].x),d=Math.abs(s[0].y),p=Math.abs(s[0].z);u<=c&&(c=u,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),p<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const _=Math.acos(Xe(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,_))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(Xe(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let _=1;_<=e;_++)r[_].applyMatrix4(l.makeRotationAxis(s[_],f*_)),a[_].crossVectors(s[_],r[_])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class ll extends Mn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new he){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),p=l-this.aX,f=c-this.aY;l=p*u-f*d+this.aX,c=p*d+f*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class pf extends ll{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function cl(){let i=0,e=0,t=0,n=0;function s(r,a,o,l){i=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,u,d){let p=(a-r)/c-(o-r)/(c+u)+(o-a)/u,f=(o-a)/u-(l-a)/(u+d)+(l-o)/d;p*=u,f*=u,s(a,o,p,f)},calc:function(r){const a=r*r,o=a*r;return i+e*r+t*a+n*o}}}const mr=new w,Fa=new cl,Na=new cl,Oa=new cl;class mf extends Mn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new w){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,u;this.closed||o>0?c=s[(o-1)%r]:(mr.subVectors(s[0],s[1]).add(s[0]),c=mr);const d=s[o%r],p=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(mr.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=mr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let _=Math.pow(c.distanceToSquared(d),f),v=Math.pow(d.distanceToSquared(p),f),g=Math.pow(p.distanceToSquared(u),f);v<1e-4&&(v=1),_<1e-4&&(_=v),g<1e-4&&(g=v),Fa.initNonuniformCatmullRom(c.x,d.x,p.x,u.x,_,v,g),Na.initNonuniformCatmullRom(c.y,d.y,p.y,u.y,_,v,g),Oa.initNonuniformCatmullRom(c.z,d.z,p.z,u.z,_,v,g)}else this.curveType==="catmullrom"&&(Fa.initCatmullRom(c.x,d.x,p.x,u.x,this.tension),Na.initCatmullRom(c.y,d.y,p.y,u.y,this.tension),Oa.initCatmullRom(c.z,d.z,p.z,u.z,this.tension));return n.set(Fa.calc(l),Na.calc(l),Oa.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new w().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function lc(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*i+t}function gf(i,e){const t=1-i;return t*t*e}function _f(i,e){return 2*(1-i)*i*e}function xf(i,e){return i*i*e}function Rs(i,e,t,n){return gf(i,e)+_f(i,t)+xf(i,n)}function vf(i,e){const t=1-i;return t*t*t*e}function yf(i,e){const t=1-i;return 3*t*t*i*e}function Mf(i,e){return 3*(1-i)*i*i*e}function bf(i,e){return i*i*i*e}function Ls(i,e,t,n,s){return vf(i,e)+yf(i,t)+Mf(i,n)+bf(i,s)}class Bh extends Mn{constructor(e=new he,t=new he,n=new he,s=new he){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new he){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ls(e,s.x,r.x,a.x,o.x),Ls(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Sf extends Mn{constructor(e=new w,t=new w,n=new w,s=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new w){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ls(e,s.x,r.x,a.x,o.x),Ls(e,s.y,r.y,a.y,o.y),Ls(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Vh extends Mn{constructor(e=new he,t=new he){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new he){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new he){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ef extends Mn{constructor(e=new w,t=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new w){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new w){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class zh extends Mn{constructor(e=new he,t=new he,n=new he){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new he){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Rs(e,s.x,r.x,a.x),Rs(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class kh extends Mn{constructor(e=new w,t=new w,n=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new w){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Rs(e,s.x,r.x,a.x),Rs(e,s.y,r.y,a.y),Rs(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Hh extends Mn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new he){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],u=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(lc(o,l.x,c.x,u.x,d.x),lc(o,l.y,c.y,u.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new he().fromArray(s))}return this}}var Yr=Object.freeze({__proto__:null,ArcCurve:pf,CatmullRomCurve3:mf,CubicBezierCurve:Bh,CubicBezierCurve3:Sf,EllipseCurve:ll,LineCurve:Vh,LineCurve3:Ef,QuadraticBezierCurve:zh,QuadraticBezierCurve3:kh,SplineCurve:Hh});class Tf extends Mn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Yr[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Yr[s.type]().fromJSON(s))}return this}}class cc extends Tf{constructor(e){super(),this.type="Path",this.currentPoint=new he,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Vh(this.currentPoint.clone(),new he(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new zh(this.currentPoint.clone(),new he(e,t),new he(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){const o=new Bh(this.currentPoint.clone(),new he(e,t),new he(n,s),new he(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Hh(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,s,r,a,o,l),this}absellipse(e,t,n,s,r,a,o,l){const c=new ll(e,t,n,s,r,a,o,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Gh extends _t{constructor(e=[new he(0,-.5),new he(.5,0),new he(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=Xe(s,0,Math.PI*2);const r=[],a=[],o=[],l=[],c=[],u=1/t,d=new w,p=new he,f=new w,_=new w,v=new w;let g=0,m=0;for(let S=0;S<=e.length-1;S++)switch(S){case 0:g=e[S+1].x-e[S].x,m=e[S+1].y-e[S].y,f.x=m*1,f.y=-g,f.z=m*0,v.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(v.x,v.y,v.z);break;default:g=e[S+1].x-e[S].x,m=e[S+1].y-e[S].y,f.x=m*1,f.y=-g,f.z=m*0,_.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),l.push(f.x,f.y,f.z),v.copy(_)}for(let S=0;S<=t;S++){const M=n+S*u*s,y=Math.sin(M),C=Math.cos(M);for(let A=0;A<=e.length-1;A++){d.x=e[A].x*y,d.y=e[A].y,d.z=e[A].x*C,a.push(d.x,d.y,d.z),p.x=S/t,p.y=A/(e.length-1),o.push(p.x,p.y);const R=l[3*A+0]*y,U=l[3*A+1],E=l[3*A+0]*C;c.push(R,U,E)}}for(let S=0;S<t;S++)for(let M=0;M<e.length-1;M++){const y=M+S*e.length,C=y,A=y+e.length,R=y+e.length+1,U=y+1;r.push(C,A,U),r.push(R,U,A)}this.setIndex(r),this.setAttribute("position",new Ze(a,3)),this.setAttribute("uv",new Ze(o,2)),this.setAttribute("normal",new Ze(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gh(e.points,e.segments,e.phiStart,e.phiLength)}}class Wh extends _t{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],l=[],c=new w,u=new he;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,p=3;d<=t;d++,p+=3){const f=n+d/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[p]/e+1)/2,u.y=(a[p+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Ze(a,3)),this.setAttribute("normal",new Ze(o,3)),this.setAttribute("uv",new Ze(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wh(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class ta extends _t{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],d=[],p=[],f=[];let _=0;const v=[],g=n/2;let m=0;S(),a===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new Ze(d,3)),this.setAttribute("normal",new Ze(p,3)),this.setAttribute("uv",new Ze(f,2));function S(){const y=new w,C=new w;let A=0;const R=(t-e)/n;for(let U=0;U<=r;U++){const E=[],b=U/r,L=b*(t-e)+e;for(let F=0;F<=s;F++){const O=F/s,V=O*l+o,$=Math.sin(V),B=Math.cos(V);C.x=L*$,C.y=-b*n+g,C.z=L*B,d.push(C.x,C.y,C.z),y.set($,R,B).normalize(),p.push(y.x,y.y,y.z),f.push(O,1-b),E.push(_++)}v.push(E)}for(let U=0;U<s;U++)for(let E=0;E<r;E++){const b=v[E][U],L=v[E+1][U],F=v[E+1][U+1],O=v[E][U+1];(e>0||E!==0)&&(u.push(b,L,O),A+=3),(t>0||E!==r-1)&&(u.push(L,F,O),A+=3)}c.addGroup(m,A,0),m+=A}function M(y){const C=_,A=new he,R=new w;let U=0;const E=y===!0?e:t,b=y===!0?1:-1;for(let F=1;F<=s;F++)d.push(0,g*b,0),p.push(0,b,0),f.push(.5,.5),_++;const L=_;for(let F=0;F<=s;F++){const V=F/s*l+o,$=Math.cos(V),B=Math.sin(V);R.x=E*B,R.y=g*b,R.z=E*$,d.push(R.x,R.y,R.z),p.push(0,b,0),A.x=$*.5+.5,A.y=B*.5*b+.5,f.push(A.x,A.y),_++}for(let F=0;F<s;F++){const O=C+F,V=L+F;y===!0?u.push(V,V+1,O):u.push(V+1,V,O),U+=3}c.addGroup(m,U,y===!0?1:2),m+=U}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ta(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Xh extends ta{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Xh(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class na extends _t{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];o(s),c(n),u(),this.setAttribute("position",new Ze(r,3)),this.setAttribute("normal",new Ze(r.slice(),3)),this.setAttribute("uv",new Ze(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(S){const M=new w,y=new w,C=new w;for(let A=0;A<t.length;A+=3)f(t[A+0],M),f(t[A+1],y),f(t[A+2],C),l(M,y,C,S)}function l(S,M,y,C){const A=C+1,R=[];for(let U=0;U<=A;U++){R[U]=[];const E=S.clone().lerp(y,U/A),b=M.clone().lerp(y,U/A),L=A-U;for(let F=0;F<=L;F++)F===0&&U===A?R[U][F]=E:R[U][F]=E.clone().lerp(b,F/L)}for(let U=0;U<A;U++)for(let E=0;E<2*(A-U)-1;E++){const b=Math.floor(E/2);E%2===0?(p(R[U][b+1]),p(R[U+1][b]),p(R[U][b])):(p(R[U][b+1]),p(R[U+1][b+1]),p(R[U+1][b]))}}function c(S){const M=new w;for(let y=0;y<r.length;y+=3)M.x=r[y+0],M.y=r[y+1],M.z=r[y+2],M.normalize().multiplyScalar(S),r[y+0]=M.x,r[y+1]=M.y,r[y+2]=M.z}function u(){const S=new w;for(let M=0;M<r.length;M+=3){S.x=r[M+0],S.y=r[M+1],S.z=r[M+2];const y=g(S)/2/Math.PI+.5,C=m(S)/Math.PI+.5;a.push(y,1-C)}_(),d()}function d(){for(let S=0;S<a.length;S+=6){const M=a[S+0],y=a[S+2],C=a[S+4],A=Math.max(M,y,C),R=Math.min(M,y,C);A>.9&&R<.1&&(M<.2&&(a[S+0]+=1),y<.2&&(a[S+2]+=1),C<.2&&(a[S+4]+=1))}}function p(S){r.push(S.x,S.y,S.z)}function f(S,M){const y=S*3;M.x=e[y+0],M.y=e[y+1],M.z=e[y+2]}function _(){const S=new w,M=new w,y=new w,C=new w,A=new he,R=new he,U=new he;for(let E=0,b=0;E<r.length;E+=9,b+=6){S.set(r[E+0],r[E+1],r[E+2]),M.set(r[E+3],r[E+4],r[E+5]),y.set(r[E+6],r[E+7],r[E+8]),A.set(a[b+0],a[b+1]),R.set(a[b+2],a[b+3]),U.set(a[b+4],a[b+5]),C.copy(S).add(M).add(y).divideScalar(3);const L=g(C);v(A,b+0,S,L),v(R,b+2,M,L),v(U,b+4,y,L)}}function v(S,M,y,C){C<0&&S.x===1&&(a[M]=S.x-1),y.x===0&&y.z===0&&(a[M]=C/2/Math.PI+.5)}function g(S){return Math.atan2(S.z,-S.x)}function m(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new na(e.vertices,e.indices,e.radius,e.details)}}const gr=new w,_r=new w,Ba=new w,xr=new sn;class Lx extends _t{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const s=Math.pow(10,4),r=Math.cos(es*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],u=["a","b","c"],d=new Array(3),p={},f=[];for(let _=0;_<l;_+=3){a?(c[0]=a.getX(_),c[1]=a.getX(_+1),c[2]=a.getX(_+2)):(c[0]=_,c[1]=_+1,c[2]=_+2);const{a:v,b:g,c:m}=xr;if(v.fromBufferAttribute(o,c[0]),g.fromBufferAttribute(o,c[1]),m.fromBufferAttribute(o,c[2]),xr.getNormal(Ba),d[0]=`${Math.round(v.x*s)},${Math.round(v.y*s)},${Math.round(v.z*s)}`,d[1]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,d[2]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let S=0;S<3;S++){const M=(S+1)%3,y=d[S],C=d[M],A=xr[u[S]],R=xr[u[M]],U=`${y}_${C}`,E=`${C}_${y}`;E in p&&p[E]?(Ba.dot(p[E].normal)<=r&&(f.push(A.x,A.y,A.z),f.push(R.x,R.y,R.z)),p[E]=null):U in p||(p[U]={index0:c[S],index1:c[M],normal:Ba.clone()})}}for(const _ in p)if(p[_]){const{index0:v,index1:g}=p[_];gr.fromBufferAttribute(o,v),_r.fromBufferAttribute(o,g),f.push(gr.x,gr.y,gr.z),f.push(_r.x,_r.y,_r.z)}this.setAttribute("position",new Ze(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Af extends cc{constructor(e){super(e),this.uuid=wi(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new cc().fromJSON(s))}return this}}class wf{static triangulate(e,t,n=2){const s=t&&t.length,r=s?t[0]*n:e.length;let a=qh(e,0,r,n,!0);const o=[];if(!a||a.next===a.prev)return o;let l,c,u,d,p,f,_;if(s&&(a=If(e,t,a,n)),e.length>80*n){l=u=e[0],c=d=e[1];for(let v=n;v<r;v+=n)p=e[v],f=e[v+1],p<l&&(l=p),f<c&&(c=f),p>u&&(u=p),f>d&&(d=f);_=Math.max(u-l,d-c),_=_!==0?32767/_:0}return Os(a,o,n,l,c,_,0),o}}function qh(i,e,t,n,s){let r,a;if(s===Gf(i,e,t,n)>0)for(r=e;r<t;r+=n)a=hc(r,i[r],i[r+1],a);else for(r=t-n;r>=e;r-=n)a=hc(r,i[r],i[r+1],a);return a&&ia(a,a.next)&&(Vs(a),a=a.next),a}function Ei(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(ia(t,t.next)||dt(t.prev,t,t.next)===0)){if(Vs(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Os(i,e,t,n,s,r,a){if(!i)return;!a&&r&&Of(i,n,s,r);let o=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,r?Cf(i,n,s,r):Pf(i)){e.push(l.i/t|0),e.push(i.i/t|0),e.push(c.i/t|0),Vs(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=Rf(Ei(i),e,t),Os(i,e,t,n,s,r,2)):a===2&&Lf(i,e,t,n,s,r):Os(Ei(i),e,t,n,s,r,1);break}}}function Pf(i){const e=i.prev,t=i,n=i.next;if(dt(e,t,n)>=0)return!1;const s=e.x,r=t.x,a=n.x,o=e.y,l=t.y,c=n.y,u=s<r?s<a?s:a:r<a?r:a,d=o<l?o<c?o:c:l<c?l:c,p=s>r?s>a?s:a:r>a?r:a,f=o>l?o>c?o:c:l>c?l:c;let _=n.next;for(;_!==e;){if(_.x>=u&&_.x<=p&&_.y>=d&&_.y<=f&&Ki(s,o,r,l,a,c,_.x,_.y)&&dt(_.prev,_,_.next)>=0)return!1;_=_.next}return!0}function Cf(i,e,t,n){const s=i.prev,r=i,a=i.next;if(dt(s,r,a)>=0)return!1;const o=s.x,l=r.x,c=a.x,u=s.y,d=r.y,p=a.y,f=o<l?o<c?o:c:l<c?l:c,_=u<d?u<p?u:p:d<p?d:p,v=o>l?o>c?o:c:l>c?l:c,g=u>d?u>p?u:p:d>p?d:p,m=Wo(f,_,e,t,n),S=Wo(v,g,e,t,n);let M=i.prevZ,y=i.nextZ;for(;M&&M.z>=m&&y&&y.z<=S;){if(M.x>=f&&M.x<=v&&M.y>=_&&M.y<=g&&M!==s&&M!==a&&Ki(o,u,l,d,c,p,M.x,M.y)&&dt(M.prev,M,M.next)>=0||(M=M.prevZ,y.x>=f&&y.x<=v&&y.y>=_&&y.y<=g&&y!==s&&y!==a&&Ki(o,u,l,d,c,p,y.x,y.y)&&dt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;M&&M.z>=m;){if(M.x>=f&&M.x<=v&&M.y>=_&&M.y<=g&&M!==s&&M!==a&&Ki(o,u,l,d,c,p,M.x,M.y)&&dt(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;y&&y.z<=S;){if(y.x>=f&&y.x<=v&&y.y>=_&&y.y<=g&&y!==s&&y!==a&&Ki(o,u,l,d,c,p,y.x,y.y)&&dt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Rf(i,e,t){let n=i;do{const s=n.prev,r=n.next.next;!ia(s,r)&&Yh(s,n,n.next,r)&&Bs(s,r)&&Bs(r,s)&&(e.push(s.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),Vs(n),Vs(n.next),n=i=r),n=n.next}while(n!==i);return Ei(n)}function Lf(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&zf(a,o)){let l=$h(a,o);a=Ei(a,a.next),l=Ei(l,l.next),Os(a,e,t,n,s,r,0),Os(l,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function If(i,e,t,n){const s=[];let r,a,o,l,c;for(r=0,a=e.length;r<a;r++)o=e[r]*n,l=r<a-1?e[r+1]*n:i.length,c=qh(i,o,l,n,!1),c===c.next&&(c.steiner=!0),s.push(Vf(c));for(s.sort(Df),r=0;r<s.length;r++)t=Uf(s[r],t);return t}function Df(i,e){return i.x-e.x}function Uf(i,e){const t=Ff(i,e);if(!t)return e;const n=$h(t,i);return Ei(n,n.next),Ei(t,t.next)}function Ff(i,e){let t=e,n=-1/0,s;const r=i.x,a=i.y;do{if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){const p=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(p<=r&&p>n&&(n=p,s=t.x<t.next.x?t:t.next,p===r))return s}t=t.next}while(t!==e);if(!s)return null;const o=s,l=s.x,c=s.y;let u=1/0,d;t=s;do r>=t.x&&t.x>=l&&r!==t.x&&Ki(a<c?r:n,a,l,c,a<c?n:r,a,t.x,t.y)&&(d=Math.abs(a-t.y)/(r-t.x),Bs(t,i)&&(d<u||d===u&&(t.x>s.x||t.x===s.x&&Nf(s,t)))&&(s=t,u=d)),t=t.next;while(t!==o);return s}function Nf(i,e){return dt(i.prev,i,e.prev)<0&&dt(e.next,i,i.next)<0}function Of(i,e,t,n){let s=i;do s.z===0&&(s.z=Wo(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Bf(s)}function Bf(i){let e,t,n,s,r,a,o,l,c=1;do{for(t=i,i=null,r=null,a=0;t;){for(a++,n=t,o=0,e=0;e<c&&(o++,n=n.nextZ,!!n);e++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||t.z<=n.z)?(s=t,t=t.nextZ,o--):(s=n,n=n.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;t=n}r.nextZ=null,c*=2}while(a>1);return i}function Wo(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Vf(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Ki(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function zf(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!kf(i,e)&&(Bs(i,e)&&Bs(e,i)&&Hf(i,e)&&(dt(i.prev,i,e.prev)||dt(i,e.prev,e))||ia(i,e)&&dt(i.prev,i,i.next)>0&&dt(e.prev,e,e.next)>0)}function dt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function ia(i,e){return i.x===e.x&&i.y===e.y}function Yh(i,e,t,n){const s=yr(dt(i,e,t)),r=yr(dt(i,e,n)),a=yr(dt(t,n,i)),o=yr(dt(t,n,e));return!!(s!==r&&a!==o||s===0&&vr(i,t,e)||r===0&&vr(i,n,e)||a===0&&vr(t,i,n)||o===0&&vr(t,e,n))}function vr(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function yr(i){return i>0?1:i<0?-1:0}function kf(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Yh(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Bs(i,e){return dt(i.prev,i,i.next)<0?dt(i,e,i.next)>=0&&dt(i,i.prev,e)>=0:dt(i,e,i.prev)<0||dt(i,i.next,e)<0}function Hf(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function $h(i,e){const t=new Xo(i.i,i.x,i.y),n=new Xo(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function hc(i,e,t,n){const s=new Xo(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Vs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Xo(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Gf(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class Is{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return Is.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];uc(e),dc(n,e);let a=e.length;t.forEach(uc);for(let l=0;l<t.length;l++)s.push(a),a+=t[l].length,dc(n,t[l]);const o=wf.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function uc(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function dc(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Kh extends _t{constructor(e=new Af([new he(.5,.5),new he(-.5,.5),new he(-.5,-.5),new he(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new Ze(s,3)),this.setAttribute("uv",new Ze(r,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1;let p=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,_=t.bevelSize!==void 0?t.bevelSize:f-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,S=t.UVGenerator!==void 0?t.UVGenerator:Wf;let M,y=!1,C,A,R,U;m&&(M=m.getSpacedPoints(u),y=!0,p=!1,C=m.computeFrenetFrames(u,!1),A=new w,R=new w,U=new w),p||(g=0,f=0,_=0,v=0);const E=o.extractPoints(c);let b=E.shape;const L=E.holes;if(!Is.isClockWise(b)){b=b.reverse();for(let ae=0,ee=L.length;ae<ee;ae++){const D=L[ae];Is.isClockWise(D)&&(L[ae]=D.reverse())}}const O=Is.triangulateShape(b,L),V=b;for(let ae=0,ee=L.length;ae<ee;ae++){const D=L[ae];b=b.concat(D)}function $(ae,ee,D){return ee||console.error("THREE.ExtrudeGeometry: vec does not exist"),ae.clone().addScaledVector(ee,D)}const B=b.length,X=O.length;function N(ae,ee,D){let Ue,fe,Pe;const _e=ae.x-ee.x,ze=ae.y-ee.y,Se=D.x-ae.x,I=D.y-ae.y,T=_e*_e+ze*ze,Y=_e*I-ze*Se;if(Math.abs(Y)>Number.EPSILON){const ne=Math.sqrt(T),le=Math.sqrt(Se*Se+I*I),ie=ee.x-ze/ne,Fe=ee.y+_e/ne,ve=D.x-I/le,we=D.y+Se/le,je=((ve-ie)*I-(we-Fe)*Se)/(_e*I-ze*Se);Ue=ie+_e*je-ae.x,fe=Fe+ze*je-ae.y;const me=Ue*Ue+fe*fe;if(me<=2)return new he(Ue,fe);Pe=Math.sqrt(me/2)}else{let ne=!1;_e>Number.EPSILON?Se>Number.EPSILON&&(ne=!0):_e<-Number.EPSILON?Se<-Number.EPSILON&&(ne=!0):Math.sign(ze)===Math.sign(I)&&(ne=!0),ne?(Ue=-ze,fe=_e,Pe=Math.sqrt(T)):(Ue=_e,fe=ze,Pe=Math.sqrt(T/2))}return new he(Ue/Pe,fe/Pe)}const j=[];for(let ae=0,ee=V.length,D=ee-1,Ue=ae+1;ae<ee;ae++,D++,Ue++)D===ee&&(D=0),Ue===ee&&(Ue=0),j[ae]=N(V[ae],V[D],V[Ue]);const Q=[];let se,ue=j.concat();for(let ae=0,ee=L.length;ae<ee;ae++){const D=L[ae];se=[];for(let Ue=0,fe=D.length,Pe=fe-1,_e=Ue+1;Ue<fe;Ue++,Pe++,_e++)Pe===fe&&(Pe=0),_e===fe&&(_e=0),se[Ue]=N(D[Ue],D[Pe],D[_e]);Q.push(se),ue=ue.concat(se)}for(let ae=0;ae<g;ae++){const ee=ae/g,D=f*Math.cos(ee*Math.PI/2),Ue=_*Math.sin(ee*Math.PI/2)+v;for(let fe=0,Pe=V.length;fe<Pe;fe++){const _e=$(V[fe],j[fe],Ue);re(_e.x,_e.y,-D)}for(let fe=0,Pe=L.length;fe<Pe;fe++){const _e=L[fe];se=Q[fe];for(let ze=0,Se=_e.length;ze<Se;ze++){const I=$(_e[ze],se[ze],Ue);re(I.x,I.y,-D)}}}const Ae=_+v;for(let ae=0;ae<B;ae++){const ee=p?$(b[ae],ue[ae],Ae):b[ae];y?(R.copy(C.normals[0]).multiplyScalar(ee.x),A.copy(C.binormals[0]).multiplyScalar(ee.y),U.copy(M[0]).add(R).add(A),re(U.x,U.y,U.z)):re(ee.x,ee.y,0)}for(let ae=1;ae<=u;ae++)for(let ee=0;ee<B;ee++){const D=p?$(b[ee],ue[ee],Ae):b[ee];y?(R.copy(C.normals[ae]).multiplyScalar(D.x),A.copy(C.binormals[ae]).multiplyScalar(D.y),U.copy(M[ae]).add(R).add(A),re(U.x,U.y,U.z)):re(D.x,D.y,d/u*ae)}for(let ae=g-1;ae>=0;ae--){const ee=ae/g,D=f*Math.cos(ee*Math.PI/2),Ue=_*Math.sin(ee*Math.PI/2)+v;for(let fe=0,Pe=V.length;fe<Pe;fe++){const _e=$(V[fe],j[fe],Ue);re(_e.x,_e.y,d+D)}for(let fe=0,Pe=L.length;fe<Pe;fe++){const _e=L[fe];se=Q[fe];for(let ze=0,Se=_e.length;ze<Se;ze++){const I=$(_e[ze],se[ze],Ue);y?re(I.x,I.y+M[u-1].y,M[u-1].x+D):re(I.x,I.y,d+D)}}}q(),te();function q(){const ae=s.length/3;if(p){let ee=0,D=B*ee;for(let Ue=0;Ue<X;Ue++){const fe=O[Ue];be(fe[2]+D,fe[1]+D,fe[0]+D)}ee=u+g*2,D=B*ee;for(let Ue=0;Ue<X;Ue++){const fe=O[Ue];be(fe[0]+D,fe[1]+D,fe[2]+D)}}else{for(let ee=0;ee<X;ee++){const D=O[ee];be(D[2],D[1],D[0])}for(let ee=0;ee<X;ee++){const D=O[ee];be(D[0]+B*u,D[1]+B*u,D[2]+B*u)}}n.addGroup(ae,s.length/3-ae,0)}function te(){const ae=s.length/3;let ee=0;de(V,ee),ee+=V.length;for(let D=0,Ue=L.length;D<Ue;D++){const fe=L[D];de(fe,ee),ee+=fe.length}n.addGroup(ae,s.length/3-ae,1)}function de(ae,ee){let D=ae.length;for(;--D>=0;){const Ue=D;let fe=D-1;fe<0&&(fe=ae.length-1);for(let Pe=0,_e=u+g*2;Pe<_e;Pe++){const ze=B*Pe,Se=B*(Pe+1),I=ee+Ue+ze,T=ee+fe+ze,Y=ee+fe+Se,ne=ee+Ue+Se;De(I,T,Y,ne)}}}function re(ae,ee,D){l.push(ae),l.push(ee),l.push(D)}function be(ae,ee,D){ge(ae),ge(ee),ge(D);const Ue=s.length/3,fe=S.generateTopUV(n,s,Ue-3,Ue-2,Ue-1);Be(fe[0]),Be(fe[1]),Be(fe[2])}function De(ae,ee,D,Ue){ge(ae),ge(ee),ge(Ue),ge(ee),ge(D),ge(Ue);const fe=s.length/3,Pe=S.generateSideWallUV(n,s,fe-6,fe-3,fe-2,fe-1);Be(Pe[0]),Be(Pe[1]),Be(Pe[3]),Be(Pe[1]),Be(Pe[2]),Be(Pe[3])}function ge(ae){s.push(l[ae*3+0]),s.push(l[ae*3+1]),s.push(l[ae*3+2])}function Be(ae){r.push(ae.x),r.push(ae.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Xf(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,a=e.shapes.length;r<a;r++){const o=t[e.shapes[r]];n.push(o)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Yr[s.type]().fromJSON(s)),new Kh(n,e.options)}}const Wf={generateTopUV:function(i,e,t,n,s){const r=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[s*3],u=e[s*3+1];return[new he(r,a),new he(o,l),new he(c,u)]},generateSideWallUV:function(i,e,t,n,s,r){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],d=e[n*3+2],p=e[s*3],f=e[s*3+1],_=e[s*3+2],v=e[r*3],g=e[r*3+1],m=e[r*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new he(a,1-l),new he(c,1-d),new he(p,1-_),new he(v,1-m)]:[new he(o,1-l),new he(u,1-d),new he(f,1-_),new he(g,1-m)]}};function Xf(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Zh extends na{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Zh(e.radius,e.detail)}}class Gs extends _t{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,u=l+1,d=e/o,p=t/l,f=[],_=[],v=[],g=[];for(let m=0;m<u;m++){const S=m*p-a;for(let M=0;M<c;M++){const y=M*d-r;_.push(y,-S,0),v.push(0,0,1),g.push(M/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let S=0;S<o;S++){const M=S+c*m,y=S+c*(m+1),C=S+1+c*(m+1),A=S+1+c*m;f.push(M,y,A),f.push(y,C,A)}this.setIndex(f),this.setAttribute("position",new Ze(_,3)),this.setAttribute("normal",new Ze(v,3)),this.setAttribute("uv",new Ze(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gs(e.width,e.height,e.widthSegments,e.heightSegments)}}class jh extends _t{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],c=[],u=[];let d=e;const p=(t-e)/s,f=new w,_=new he;for(let v=0;v<=s;v++){for(let g=0;g<=n;g++){const m=r+g/n*a;f.x=d*Math.cos(m),f.y=d*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),_.x=(f.x/t+1)/2,_.y=(f.y/t+1)/2,u.push(_.x,_.y)}d+=p}for(let v=0;v<s;v++){const g=v*(n+1);for(let m=0;m<n;m++){const S=m+g,M=S,y=S+n+1,C=S+n+2,A=S+1;o.push(M,y,A),o.push(y,C,A)}}this.setIndex(o),this.setAttribute("position",new Ze(l,3)),this.setAttribute("normal",new Ze(c,3)),this.setAttribute("uv",new Ze(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jh(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Jh extends _t{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const u=[],d=new w,p=new w,f=[],_=[],v=[],g=[];for(let m=0;m<=n;m++){const S=[],M=m/n;let y=0;m===0&&a===0?y=.5/t:m===n&&l===Math.PI&&(y=-.5/t);for(let C=0;C<=t;C++){const A=C/t;d.x=-e*Math.cos(s+A*r)*Math.sin(a+M*o),d.y=e*Math.cos(a+M*o),d.z=e*Math.sin(s+A*r)*Math.sin(a+M*o),_.push(d.x,d.y,d.z),p.copy(d).normalize(),v.push(p.x,p.y,p.z),g.push(A+y,1-M),S.push(c++)}u.push(S)}for(let m=0;m<n;m++)for(let S=0;S<t;S++){const M=u[m][S+1],y=u[m][S],C=u[m+1][S],A=u[m+1][S+1];(m!==0||a>0)&&f.push(M,y,A),(m!==n-1||l<Math.PI)&&f.push(y,C,A)}this.setIndex(f),this.setAttribute("position",new Ze(_,3)),this.setAttribute("normal",new Ze(v,3)),this.setAttribute("uv",new Ze(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jh(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Qh extends na{constructor(e=1,t=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],s=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,s,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Qh(e.radius,e.detail)}}class eu extends _t{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],l=[],c=[],u=new w,d=new w,p=new w;for(let f=0;f<=n;f++)for(let _=0;_<=s;_++){const v=_/s*r,g=f/n*Math.PI*2;d.x=(e+t*Math.cos(g))*Math.cos(v),d.y=(e+t*Math.cos(g))*Math.sin(v),d.z=t*Math.sin(g),o.push(d.x,d.y,d.z),u.x=e*Math.cos(v),u.y=e*Math.sin(v),p.subVectors(d,u).normalize(),l.push(p.x,p.y,p.z),c.push(_/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let _=1;_<=s;_++){const v=(s+1)*f+_-1,g=(s+1)*(f-1)+_-1,m=(s+1)*(f-1)+_,S=(s+1)*f+_;a.push(v,g,S),a.push(g,m,S)}this.setIndex(a),this.setAttribute("position",new Ze(o,3)),this.setAttribute("normal",new Ze(l,3)),this.setAttribute("uv",new Ze(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new eu(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class tu extends _t{constructor(e=new kh(new w(-1,-1,0),new w(-1,1,0),new w(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new w,l=new w,c=new he;let u=new w;const d=[],p=[],f=[],_=[];v(),this.setIndex(_),this.setAttribute("position",new Ze(d,3)),this.setAttribute("normal",new Ze(p,3)),this.setAttribute("uv",new Ze(f,2));function v(){for(let M=0;M<t;M++)g(M);g(r===!1?t:0),S(),m()}function g(M){u=e.getPointAt(M/t,u);const y=a.normals[M],C=a.binormals[M];for(let A=0;A<=s;A++){const R=A/s*Math.PI*2,U=Math.sin(R),E=-Math.cos(R);l.x=E*y.x+U*C.x,l.y=E*y.y+U*C.y,l.z=E*y.z+U*C.z,l.normalize(),p.push(l.x,l.y,l.z),o.x=u.x+n*l.x,o.y=u.y+n*l.y,o.z=u.z+n*l.z,d.push(o.x,o.y,o.z)}}function m(){for(let M=1;M<=t;M++)for(let y=1;y<=s;y++){const C=(s+1)*(M-1)+(y-1),A=(s+1)*M+(y-1),R=(s+1)*M+y,U=(s+1)*(M-1)+y;_.push(C,A,U),_.push(A,R,U)}}function S(){for(let M=0;M<=t;M++)for(let y=0;y<=s;y++)c.x=M/t,c.y=y/s,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new tu(new Yr[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class qf extends an{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Ve(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}class qo extends an{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ve(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ks,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class fc extends qo{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new he(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Xe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ve(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ve(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ve(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class pc extends an{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Ve(16777215),this.specular=new Ve(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ks,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.combine=Kr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Mr extends an{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ks,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.combine=Kr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Yf extends an{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=td,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class $f extends an{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Va extends an{constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new Ve(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ks,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Kf extends ea{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class nu extends Et{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ve(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Zf extends nu{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ve(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const za=new st,mc=new w,gc=new w;class jf{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new he(512,512),this.map=null,this.mapPass=null,this.matrix=new st,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Qr,this._frameExtents=new he(1,1),this._viewportCount=1,this._viewports=[new gt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;mc.setFromMatrixPosition(e.matrixWorld),t.position.copy(mc),gc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(gc),t.updateMatrixWorld(),za.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(za),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(za)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class iu extends Uh{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Jf extends jf{constructor(){super(new iu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ka extends nu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.target=new Et,this.shadow=new Jf}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Qf extends nn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}class ep{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=_c(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=_c();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function _c(){return performance.now()}const xc=new st;class tp{constructor(e,t,n=0,s=1/0){this.ray=new Jr(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new ol,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return xc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(xc),this}intersectObject(e,t=!0,n=[]){return Yo(e,this,n,t),n.sort(vc),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Yo(e[s],this,n,t);return n.sort(vc),n}}function vc(i,e){return i.distance-e.distance}function Yo(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Yo(r[a],e,t,!0)}}class yc{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Xe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Xe(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Mc=new w;let br,Ha;class Ix extends Et{constructor(e=new w(0,0,1),t=new w(0,0,0),n=1,s=16776960,r=n*.2,a=r*.2){super(),this.type="ArrowHelper",br===void 0&&(br=new _t,br.setAttribute("position",new Ze([0,0,0,0,1,0],3)),Ha=new ta(0,.5,1,5,1),Ha.translate(0,-.5,0)),this.position.copy(t),this.line=new Nh(br,new ea({color:s,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Ct(Ha,new Ns({color:s,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,r,a)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Mc.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Mc,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class np extends Ai{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function bc(i,e,t,n){const s=ip(n);switch(t){case Mh:return i*e;case Sh:return i*e;case Eh:return i*e*2;case nl:return i*e/s.components*s.byteLength;case jr:return i*e/s.components*s.byteLength;case Th:return i*e*2/s.components*s.byteLength;case il:return i*e*2/s.components*s.byteLength;case bh:return i*e*3/s.components*s.byteLength;case bt:return i*e*4/s.components*s.byteLength;case sl:return i*e*4/s.components*s.byteLength;case Fr:case Nr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Or:case Br:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case vo:case Mo:return Math.max(i,16)*Math.max(e,8)/4;case xo:case yo:return Math.max(i,8)*Math.max(e,8)/2;case bo:case So:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Eo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case To:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ao:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case wo:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Po:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Co:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ro:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Lo:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Io:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Do:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Uo:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Fo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case No:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Oo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Bo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Vr:case Vo:case zo:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ah:case ko:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ho:case Go:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function ip(i){switch(i){case Fn:case xh:return{byteLength:1,components:1};case Us:case vh:case zs:return{byteLength:2,components:1};case el:case tl:return{byteLength:2,components:4};case Kn:case Qo:case Kt:return{byteLength:4,components:1};case yh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Jo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Jo);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function su(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function sp(i){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,d=c.byteLength,p=i.createBuffer();i.bindBuffer(l,p),i.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:p,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const u=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,u);else{d.sort((f,_)=>f.start-_.start);let p=0;for(let f=1;f<d.length;f++){const _=d[p],v=d[f];v.start<=_.start+_.count+1?_.count=Math.max(_.count,v.start+v.count-_.start):(++p,d[p]=v)}d.length=p+1;for(let f=0,_=d.length;f<_;f++){const v=d[f];i.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var rp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ap=`#ifdef USE_ALPHAHASH
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
#endif`,op=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,lp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,hp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,up=`#ifdef USE_AOMAP
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
#endif`,dp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,fp=`#ifdef USE_BATCHING
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
#endif`,pp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,mp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,gp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,_p=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,xp=`#ifdef USE_IRIDESCENCE
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
#endif`,vp=`#ifdef USE_BUMPMAP
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
#endif`,yp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Mp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,bp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Sp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ep=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Tp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ap=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,wp=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Pp=`#define PI 3.141592653589793
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
} // validated`,Cp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Rp=`vec3 transformedNormal = objectNormal;
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
#endif`,Lp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ip=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Dp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Up=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Fp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Np=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Op=`#ifdef USE_ENVMAP
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
#endif`,Bp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Vp=`#ifdef USE_ENVMAP
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
#endif`,zp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,kp=`#ifdef USE_ENVMAP
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
#endif`,Hp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Gp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Wp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Xp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,qp=`#ifdef USE_GRADIENTMAP
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
}`,Yp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,$p=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Kp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Zp=`uniform bool receiveShadow;
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
#endif`,jp=`#ifdef USE_ENVMAP
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
#endif`,Jp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Qp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,em=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,tm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,nm=`PhysicalMaterial material;
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
#endif`,im=`struct PhysicalMaterial {
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
}`,sm=`
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
#endif`,rm=`#if defined( RE_IndirectDiffuse )
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
#endif`,am=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,om=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,lm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,um=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,dm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,fm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,pm=`#if defined( USE_POINTS_UV )
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
#endif`,mm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,gm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,_m=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,xm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,vm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ym=`#ifdef USE_MORPHTARGETS
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
#endif`,Mm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Sm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Em=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Am=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,wm=`#ifdef USE_NORMALMAP
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
#endif`,Pm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Cm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Rm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Lm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Im=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Dm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Um=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Fm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Nm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Om=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Bm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Vm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,zm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,km=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Hm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Gm=`float getShadowMask() {
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
}`,Wm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Xm=`#ifdef USE_SKINNING
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
#endif`,qm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ym=`#ifdef USE_SKINNING
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
#endif`,$m=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Km=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Zm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,jm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Jm=`#ifdef USE_TRANSMISSION
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
#endif`,Qm=`#ifdef USE_TRANSMISSION
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
#endif`,eg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ng=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ig=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const sg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,rg=`uniform sampler2D t2D;
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
}`,ag=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,og=`#ifdef ENVMAP_TYPE_CUBE
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
}`,lg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hg=`#include <common>
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
}`,ug=`#if DEPTH_PACKING == 3200
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
}`,dg=`#define DISTANCE
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
}`,fg=`#define DISTANCE
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
}`,pg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,mg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gg=`uniform float scale;
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
}`,_g=`uniform vec3 diffuse;
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
}`,xg=`#include <common>
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
}`,vg=`uniform vec3 diffuse;
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
}`,yg=`#define LAMBERT
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
}`,Mg=`#define LAMBERT
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
}`,bg=`#define MATCAP
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
}`,Sg=`#define MATCAP
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
}`,Eg=`#define NORMAL
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
}`,Tg=`#define NORMAL
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
}`,Ag=`#define PHONG
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
}`,wg=`#define PHONG
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
}`,Pg=`#define STANDARD
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
}`,Cg=`#define STANDARD
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
}`,Rg=`#define TOON
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
}`,Lg=`#define TOON
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
}`,Ig=`uniform float size;
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
}`,Dg=`uniform vec3 diffuse;
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
}`,Ug=`#include <common>
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
}`,Fg=`uniform vec3 color;
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
}`,Ng=`uniform float rotation;
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
}`,Og=`uniform vec3 diffuse;
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
}`,Ke={alphahash_fragment:rp,alphahash_pars_fragment:ap,alphamap_fragment:op,alphamap_pars_fragment:lp,alphatest_fragment:cp,alphatest_pars_fragment:hp,aomap_fragment:up,aomap_pars_fragment:dp,batching_pars_vertex:fp,batching_vertex:pp,begin_vertex:mp,beginnormal_vertex:gp,bsdfs:_p,iridescence_fragment:xp,bumpmap_pars_fragment:vp,clipping_planes_fragment:yp,clipping_planes_pars_fragment:Mp,clipping_planes_pars_vertex:bp,clipping_planes_vertex:Sp,color_fragment:Ep,color_pars_fragment:Tp,color_pars_vertex:Ap,color_vertex:wp,common:Pp,cube_uv_reflection_fragment:Cp,defaultnormal_vertex:Rp,displacementmap_pars_vertex:Lp,displacementmap_vertex:Ip,emissivemap_fragment:Dp,emissivemap_pars_fragment:Up,colorspace_fragment:Fp,colorspace_pars_fragment:Np,envmap_fragment:Op,envmap_common_pars_fragment:Bp,envmap_pars_fragment:Vp,envmap_pars_vertex:zp,envmap_physical_pars_fragment:jp,envmap_vertex:kp,fog_vertex:Hp,fog_pars_vertex:Gp,fog_fragment:Wp,fog_pars_fragment:Xp,gradientmap_pars_fragment:qp,lightmap_pars_fragment:Yp,lights_lambert_fragment:$p,lights_lambert_pars_fragment:Kp,lights_pars_begin:Zp,lights_toon_fragment:Jp,lights_toon_pars_fragment:Qp,lights_phong_fragment:em,lights_phong_pars_fragment:tm,lights_physical_fragment:nm,lights_physical_pars_fragment:im,lights_fragment_begin:sm,lights_fragment_maps:rm,lights_fragment_end:am,logdepthbuf_fragment:om,logdepthbuf_pars_fragment:lm,logdepthbuf_pars_vertex:cm,logdepthbuf_vertex:hm,map_fragment:um,map_pars_fragment:dm,map_particle_fragment:fm,map_particle_pars_fragment:pm,metalnessmap_fragment:mm,metalnessmap_pars_fragment:gm,morphinstance_vertex:_m,morphcolor_vertex:xm,morphnormal_vertex:vm,morphtarget_pars_vertex:ym,morphtarget_vertex:Mm,normal_fragment_begin:bm,normal_fragment_maps:Sm,normal_pars_fragment:Em,normal_pars_vertex:Tm,normal_vertex:Am,normalmap_pars_fragment:wm,clearcoat_normal_fragment_begin:Pm,clearcoat_normal_fragment_maps:Cm,clearcoat_pars_fragment:Rm,iridescence_pars_fragment:Lm,opaque_fragment:Im,packing:Dm,premultiplied_alpha_fragment:Um,project_vertex:Fm,dithering_fragment:Nm,dithering_pars_fragment:Om,roughnessmap_fragment:Bm,roughnessmap_pars_fragment:Vm,shadowmap_pars_fragment:zm,shadowmap_pars_vertex:km,shadowmap_vertex:Hm,shadowmask_pars_fragment:Gm,skinbase_vertex:Wm,skinning_pars_vertex:Xm,skinning_vertex:qm,skinnormal_vertex:Ym,specularmap_fragment:$m,specularmap_pars_fragment:Km,tonemapping_fragment:Zm,tonemapping_pars_fragment:jm,transmission_fragment:Jm,transmission_pars_fragment:Qm,uv_pars_fragment:eg,uv_pars_vertex:tg,uv_vertex:ng,worldpos_vertex:ig,background_vert:sg,background_frag:rg,backgroundCube_vert:ag,backgroundCube_frag:og,cube_vert:lg,cube_frag:cg,depth_vert:hg,depth_frag:ug,distanceRGBA_vert:dg,distanceRGBA_frag:fg,equirect_vert:pg,equirect_frag:mg,linedashed_vert:gg,linedashed_frag:_g,meshbasic_vert:xg,meshbasic_frag:vg,meshlambert_vert:yg,meshlambert_frag:Mg,meshmatcap_vert:bg,meshmatcap_frag:Sg,meshnormal_vert:Eg,meshnormal_frag:Tg,meshphong_vert:Ag,meshphong_frag:wg,meshphysical_vert:Pg,meshphysical_frag:Cg,meshtoon_vert:Rg,meshtoon_frag:Lg,points_vert:Ig,points_frag:Dg,shadow_vert:Ug,shadow_frag:Fg,sprite_vert:Ng,sprite_frag:Og},xe={common:{diffuse:{value:new Ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},envMapRotation:{value:new Ye},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new he(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new Ve(16777215)},opacity:{value:1},center:{value:new he(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},_n={basic:{uniforms:Ot([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.fog]),vertexShader:Ke.meshbasic_vert,fragmentShader:Ke.meshbasic_frag},lambert:{uniforms:Ot([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new Ve(0)}}]),vertexShader:Ke.meshlambert_vert,fragmentShader:Ke.meshlambert_frag},phong:{uniforms:Ot([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new Ve(0)},specular:{value:new Ve(1118481)},shininess:{value:30}}]),vertexShader:Ke.meshphong_vert,fragmentShader:Ke.meshphong_frag},standard:{uniforms:Ot([xe.common,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.roughnessmap,xe.metalnessmap,xe.fog,xe.lights,{emissive:{value:new Ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag},toon:{uniforms:Ot([xe.common,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.gradientmap,xe.fog,xe.lights,{emissive:{value:new Ve(0)}}]),vertexShader:Ke.meshtoon_vert,fragmentShader:Ke.meshtoon_frag},matcap:{uniforms:Ot([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,{matcap:{value:null}}]),vertexShader:Ke.meshmatcap_vert,fragmentShader:Ke.meshmatcap_frag},points:{uniforms:Ot([xe.points,xe.fog]),vertexShader:Ke.points_vert,fragmentShader:Ke.points_frag},dashed:{uniforms:Ot([xe.common,xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ke.linedashed_vert,fragmentShader:Ke.linedashed_frag},depth:{uniforms:Ot([xe.common,xe.displacementmap]),vertexShader:Ke.depth_vert,fragmentShader:Ke.depth_frag},normal:{uniforms:Ot([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,{opacity:{value:1}}]),vertexShader:Ke.meshnormal_vert,fragmentShader:Ke.meshnormal_frag},sprite:{uniforms:Ot([xe.sprite,xe.fog]),vertexShader:Ke.sprite_vert,fragmentShader:Ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ke.background_vert,fragmentShader:Ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ye}},vertexShader:Ke.backgroundCube_vert,fragmentShader:Ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ke.cube_vert,fragmentShader:Ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ke.equirect_vert,fragmentShader:Ke.equirect_frag},distanceRGBA:{uniforms:Ot([xe.common,xe.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ke.distanceRGBA_vert,fragmentShader:Ke.distanceRGBA_frag},shadow:{uniforms:Ot([xe.lights,xe.fog,{color:{value:new Ve(0)},opacity:{value:1}}]),vertexShader:Ke.shadow_vert,fragmentShader:Ke.shadow_frag}};_n.physical={uniforms:Ot([_n.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new he(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new Ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new he},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new Ve(0)},specularColor:{value:new Ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new he},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag};const Sr={r:0,b:0,g:0},ai=new rn,Bg=new st;function Vg(i,e,t,n,s,r,a){const o=new Ve(0);let l=r===!0?0:1,c,u,d=null,p=0,f=null;function _(M){let y=M.isScene===!0?M.background:null;return y&&y.isTexture&&(y=(M.backgroundBlurriness>0?t:e).get(y)),y}function v(M){let y=!1;const C=_(M);C===null?m(o,l):C&&C.isColor&&(m(C,1),y=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,a):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(M,y){const C=_(y);C&&(C.isCubeTexture||C.mapping===Zr)?(u===void 0&&(u=new Ct(new Hs(1,1,1),new jn({name:"BackgroundCubeMaterial",uniforms:hs(_n.backgroundCube.uniforms),vertexShader:_n.backgroundCube.vertexShader,fragmentShader:_n.backgroundCube.fragmentShader,side:Gt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,R,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),ai.copy(y.backgroundRotation),ai.x*=-1,ai.y*=-1,ai.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(ai.y*=-1,ai.z*=-1),u.material.uniforms.envMap.value=C,u.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Bg.makeRotationFromEuler(ai)),u.material.toneMapped=et.getTransfer(C.colorSpace)!==at,(d!==C||p!==C.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,d=C,p=C.version,f=i.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new Ct(new Gs(2,2),new jn({name:"BackgroundMaterial",uniforms:hs(_n.background.uniforms),vertexShader:_n.background.vertexShader,fragmentShader:_n.background.fragmentShader,side:$t,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=et.getTransfer(C.colorSpace)!==at,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(d!==C||p!==C.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,d=C,p=C.version,f=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function m(M,y){M.getRGB(Sr,Dh(i)),n.buffers.color.setClear(Sr.r,Sr.g,Sr.b,y,a)}function S(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,y=1){o.set(M),l=y,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,m(o,l)},render:v,addToRenderList:g,dispose:S}}function zg(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=p(null);let r=s,a=!1;function o(b,L,F,O,V){let $=!1;const B=d(O,F,L);r!==B&&(r=B,c(r.object)),$=f(b,O,F,V),$&&_(b,O,F,V),V!==null&&e.update(V,i.ELEMENT_ARRAY_BUFFER),($||a)&&(a=!1,y(b,L,F,O),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function l(){return i.createVertexArray()}function c(b){return i.bindVertexArray(b)}function u(b){return i.deleteVertexArray(b)}function d(b,L,F){const O=F.wireframe===!0;let V=n[b.id];V===void 0&&(V={},n[b.id]=V);let $=V[L.id];$===void 0&&($={},V[L.id]=$);let B=$[O];return B===void 0&&(B=p(l()),$[O]=B),B}function p(b){const L=[],F=[],O=[];for(let V=0;V<t;V++)L[V]=0,F[V]=0,O[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:F,attributeDivisors:O,object:b,attributes:{},index:null}}function f(b,L,F,O){const V=r.attributes,$=L.attributes;let B=0;const X=F.getAttributes();for(const N in X)if(X[N].location>=0){const Q=V[N];let se=$[N];if(se===void 0&&(N==="instanceMatrix"&&b.instanceMatrix&&(se=b.instanceMatrix),N==="instanceColor"&&b.instanceColor&&(se=b.instanceColor)),Q===void 0||Q.attribute!==se||se&&Q.data!==se.data)return!0;B++}return r.attributesNum!==B||r.index!==O}function _(b,L,F,O){const V={},$=L.attributes;let B=0;const X=F.getAttributes();for(const N in X)if(X[N].location>=0){let Q=$[N];Q===void 0&&(N==="instanceMatrix"&&b.instanceMatrix&&(Q=b.instanceMatrix),N==="instanceColor"&&b.instanceColor&&(Q=b.instanceColor));const se={};se.attribute=Q,Q&&Q.data&&(se.data=Q.data),V[N]=se,B++}r.attributes=V,r.attributesNum=B,r.index=O}function v(){const b=r.newAttributes;for(let L=0,F=b.length;L<F;L++)b[L]=0}function g(b){m(b,0)}function m(b,L){const F=r.newAttributes,O=r.enabledAttributes,V=r.attributeDivisors;F[b]=1,O[b]===0&&(i.enableVertexAttribArray(b),O[b]=1),V[b]!==L&&(i.vertexAttribDivisor(b,L),V[b]=L)}function S(){const b=r.newAttributes,L=r.enabledAttributes;for(let F=0,O=L.length;F<O;F++)L[F]!==b[F]&&(i.disableVertexAttribArray(F),L[F]=0)}function M(b,L,F,O,V,$,B){B===!0?i.vertexAttribIPointer(b,L,F,V,$):i.vertexAttribPointer(b,L,F,O,V,$)}function y(b,L,F,O){v();const V=O.attributes,$=F.getAttributes(),B=L.defaultAttributeValues;for(const X in $){const N=$[X];if(N.location>=0){let j=V[X];if(j===void 0&&(X==="instanceMatrix"&&b.instanceMatrix&&(j=b.instanceMatrix),X==="instanceColor"&&b.instanceColor&&(j=b.instanceColor)),j!==void 0){const Q=j.normalized,se=j.itemSize,ue=e.get(j);if(ue===void 0)continue;const Ae=ue.buffer,q=ue.type,te=ue.bytesPerElement,de=q===i.INT||q===i.UNSIGNED_INT||j.gpuType===Qo;if(j.isInterleavedBufferAttribute){const re=j.data,be=re.stride,De=j.offset;if(re.isInstancedInterleavedBuffer){for(let ge=0;ge<N.locationSize;ge++)m(N.location+ge,re.meshPerAttribute);b.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let ge=0;ge<N.locationSize;ge++)g(N.location+ge);i.bindBuffer(i.ARRAY_BUFFER,Ae);for(let ge=0;ge<N.locationSize;ge++)M(N.location+ge,se/N.locationSize,q,Q,be*te,(De+se/N.locationSize*ge)*te,de)}else{if(j.isInstancedBufferAttribute){for(let re=0;re<N.locationSize;re++)m(N.location+re,j.meshPerAttribute);b.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let re=0;re<N.locationSize;re++)g(N.location+re);i.bindBuffer(i.ARRAY_BUFFER,Ae);for(let re=0;re<N.locationSize;re++)M(N.location+re,se/N.locationSize,q,Q,se*te,se/N.locationSize*re*te,de)}}else if(B!==void 0){const Q=B[X];if(Q!==void 0)switch(Q.length){case 2:i.vertexAttrib2fv(N.location,Q);break;case 3:i.vertexAttrib3fv(N.location,Q);break;case 4:i.vertexAttrib4fv(N.location,Q);break;default:i.vertexAttrib1fv(N.location,Q)}}}}S()}function C(){U();for(const b in n){const L=n[b];for(const F in L){const O=L[F];for(const V in O)u(O[V].object),delete O[V];delete L[F]}delete n[b]}}function A(b){if(n[b.id]===void 0)return;const L=n[b.id];for(const F in L){const O=L[F];for(const V in O)u(O[V].object),delete O[V];delete L[F]}delete n[b.id]}function R(b){for(const L in n){const F=n[L];if(F[b.id]===void 0)continue;const O=F[b.id];for(const V in O)u(O[V].object),delete O[V];delete F[b.id]}}function U(){E(),a=!0,r!==s&&(r=s,c(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:U,resetDefaultState:E,dispose:C,releaseStatesOfGeometry:A,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:g,disableUnusedAttributes:S}}function kg(i,e,t){let n;function s(c){n=c}function r(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function a(c,u,d){d!==0&&(i.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function o(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let f=0;for(let _=0;_<d;_++)f+=u[_];t.update(f,n,1)}function l(c,u,d,p){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let _=0;_<c.length;_++)a(c[_],u[_],p[_]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,u,0,p,0,d);let _=0;for(let v=0;v<d;v++)_+=u[v]*p[v];t.update(_,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Hg(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==bt&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const U=R===zs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Fn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Kt&&!U)}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,p=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=_>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:p,maxTextures:f,maxVertexTextures:_,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:S,maxVaryings:M,maxFragmentUniforms:y,vertexTextures:C,maxSamples:A}}function Gg(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Ln,o=new Ye,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,p){const f=d.length!==0||p||n!==0||s;return s=p,n=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,p){t=u(d,p,0)},this.setState=function(d,p,f){const _=d.clippingPlanes,v=d.clipIntersection,g=d.clipShadows,m=i.get(d);if(!s||_===null||_.length===0||r&&!g)r?u(null):c();else{const S=r?0:n,M=S*4;let y=m.clippingState||null;l.value=y,y=u(_,p,M,f);for(let C=0;C!==M;++C)y[C]=t[C];m.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,p,f,_){const v=d!==null?d.length:0;let g=null;if(v!==0){if(g=l.value,_!==!0||g===null){const m=f+v*4,S=p.matrixWorldInverse;o.getNormalMatrix(S),(g===null||g.length<m)&&(g=new Float32Array(m));for(let M=0,y=f;M!==v;++M,y+=4)a.copy(d[M]).applyMatrix4(S,o),a.normal.toArray(g,y),g[y+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}function Wg(i){let e=new WeakMap;function t(a,o){return o===Ds?a.mapping=rs:o===go&&(a.mapping=as),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Ds||o===go)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Qd(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const Zi=4,Sc=[.125,.215,.35,.446,.526,.582],mi=20,Ga=new iu,Ec=new Ve;let Wa=null,Xa=0,qa=0,Ya=!1;const fi=(1+Math.sqrt(5))/2,Gi=1/fi,Tc=[new w(-fi,Gi,0),new w(fi,Gi,0),new w(-Gi,0,fi),new w(Gi,0,fi),new w(0,fi,-Gi),new w(0,fi,Gi),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)],Xg=new w;class $o{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=Xg}=r;Wa=this._renderer.getRenderTarget(),Xa=this._renderer.getActiveCubeFace(),qa=this._renderer.getActiveMipmapLevel(),Ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Wa,Xa,qa),this._renderer.xr.enabled=Ya,e.scissorTest=!1,Er(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===rs||e.mapping===as?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Wa=this._renderer.getRenderTarget(),Xa=this._renderer.getActiveCubeFace(),qa=this._renderer.getActiveMipmapLevel(),Ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:mt,minFilter:mt,generateMipmaps:!1,type:zs,format:bt,colorSpace:cs,depthBuffer:!1},s=Ac(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ac(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=qg(r)),this._blurMaterial=Yg(r,e,t)}return s}_compileMaterial(e){const t=new Ct(this._lodPlanes[0],e);this._renderer.compile(t,Ga)}_sceneToCubeUV(e,t,n,s,r){const l=new nn(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,p=d.autoClear,f=d.toneMapping;d.getClearColor(Ec),d.toneMapping=$n,d.autoClear=!1;const _=new Ns({name:"PMREM.Background",side:Gt,depthWrite:!1,depthTest:!1}),v=new Ct(new Hs,_);let g=!1;const m=e.background;m?m.isColor&&(_.color.copy(m),e.background=null,g=!0):(_.color.copy(Ec),g=!0);for(let S=0;S<6;S++){const M=S%3;M===0?(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[S],r.y,r.z)):M===1?(l.up.set(0,0,c[S]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[S],r.z)):(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[S]));const y=this._cubeSize;Er(s,M*y,S>2?y:0,y,y),d.setRenderTarget(s),g&&d.render(v,l),d.render(e,l)}v.geometry.dispose(),v.material.dispose(),d.toneMapping=f,d.autoClear=p,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===rs||e.mapping===as;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Ct(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Er(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Ga)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Tc[(s-r-1)%Tc.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new Ct(this._lodPlanes[s],c),p=c.uniforms,f=this._sizeLods[n]-1,_=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*mi-1),v=r/_,g=isFinite(r)?1+Math.floor(u*v):mi;g>mi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${mi}`);const m=[];let S=0;for(let R=0;R<mi;++R){const U=R/v,E=Math.exp(-U*U/2);m.push(E),R===0?S+=E:R<g&&(S+=2*E)}for(let R=0;R<m.length;R++)m[R]=m[R]/S;p.envMap.value=e.texture,p.samples.value=g,p.weights.value=m,p.latitudinal.value=a==="latitudinal",o&&(p.poleAxis.value=o);const{_lodMax:M}=this;p.dTheta.value=_,p.mipInt.value=M-n;const y=this._sizeLods[s],C=3*y*(s>M-Zi?s-M+Zi:0),A=4*(this._cubeSize-y);Er(t,C,A,3*y,2*y),l.setRenderTarget(t),l.render(d,Ga)}}function qg(i){const e=[],t=[],n=[];let s=i;const r=i-Zi+1+Sc.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-Zi?l=Sc[a-i+Zi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),u=-c,d=1+c,p=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,_=6,v=3,g=2,m=1,S=new Float32Array(v*_*f),M=new Float32Array(g*_*f),y=new Float32Array(m*_*f);for(let A=0;A<f;A++){const R=A%3*2/3-1,U=A>2?0:-1,E=[R,U,0,R+2/3,U,0,R+2/3,U+1,0,R,U,0,R+2/3,U+1,0,R,U+1,0];S.set(E,v*_*A),M.set(p,g*_*A);const b=[A,A,A,A,A,A];y.set(b,m*_*A)}const C=new _t;C.setAttribute("position",new jt(S,v)),C.setAttribute("uv",new jt(M,g)),C.setAttribute("faceIndex",new jt(y,m)),e.push(C),s>Zi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Ac(i,e,t){const n=new Si(i,e,t);return n.texture.mapping=Zr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Er(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Yg(i,e,t){const n=new Float32Array(mi),s=new w(0,1,0);return new jn({name:"SphericalGaussianBlur",defines:{n:mi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:hl(),fragmentShader:`

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
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function wc(){return new jn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:hl(),fragmentShader:`

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
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function Pc(){return new jn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:hl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function hl(){return`

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
	`}function $g(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Ds||l===go,u=l===rs||l===as;if(c||u){let d=e.get(o);const p=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==p)return t===null&&(t=new $o(i)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const f=o.image;return c&&f&&f.height>0||u&&f&&s(f)?(t===null&&(t=new $o(i)),d=c?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Kg(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&di("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Zg(i,e,t,n){const s={},r=new WeakMap;function a(d){const p=d.target;p.index!==null&&e.remove(p.index);for(const _ in p.attributes)e.remove(p.attributes[_]);p.removeEventListener("dispose",a),delete s[p.id];const f=r.get(p);f&&(e.remove(f),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function o(d,p){return s[p.id]===!0||(p.addEventListener("dispose",a),s[p.id]=!0,t.memory.geometries++),p}function l(d){const p=d.attributes;for(const f in p)e.update(p[f],i.ARRAY_BUFFER)}function c(d){const p=[],f=d.index,_=d.attributes.position;let v=0;if(f!==null){const S=f.array;v=f.version;for(let M=0,y=S.length;M<y;M+=3){const C=S[M+0],A=S[M+1],R=S[M+2];p.push(C,A,A,R,R,C)}}else if(_!==void 0){const S=_.array;v=_.version;for(let M=0,y=S.length/3-1;M<y;M+=3){const C=M+0,A=M+1,R=M+2;p.push(C,A,A,R,R,C)}}else return;const g=new(Ph(p)?Ih:Lh)(p,1);g.version=v;const m=r.get(d);m&&e.remove(m),r.set(d,g)}function u(d){const p=r.get(d);if(p){const f=d.index;f!==null&&p.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function jg(i,e,t){let n;function s(p){n=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function l(p,f){i.drawElements(n,f,r,p*a),t.update(f,n,1)}function c(p,f,_){_!==0&&(i.drawElementsInstanced(n,f,r,p*a,_),t.update(f,n,_))}function u(p,f,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,p,0,_);let g=0;for(let m=0;m<_;m++)g+=f[m];t.update(g,n,1)}function d(p,f,_,v){if(_===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<p.length;m++)c(p[m]/a,f[m],v[m]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,p,0,v,0,_);let m=0;for(let S=0;S<_;S++)m+=f[S]*v[S];t.update(m,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Jg(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Qg(i,e,t){const n=new WeakMap,s=new gt;function r(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let p=n.get(o);if(p===void 0||p.count!==d){let E=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",E)};p!==void 0&&p.texture.dispose();const f=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let M=0;f===!0&&(M=1),_===!0&&(M=2),v===!0&&(M=3);let y=o.attributes.position.count*M,C=1;y>e.maxTextureSize&&(C=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const A=new Float32Array(y*C*4*d),R=new Ch(A,y,C,d);R.type=Kt,R.needsUpdate=!0;const U=M*4;for(let b=0;b<d;b++){const L=g[b],F=m[b],O=S[b],V=y*C*4*b;for(let $=0;$<L.count;$++){const B=$*U;f===!0&&(s.fromBufferAttribute(L,$),A[V+B+0]=s.x,A[V+B+1]=s.y,A[V+B+2]=s.z,A[V+B+3]=0),_===!0&&(s.fromBufferAttribute(F,$),A[V+B+4]=s.x,A[V+B+5]=s.y,A[V+B+6]=s.z,A[V+B+7]=0),v===!0&&(s.fromBufferAttribute(O,$),A[V+B+8]=s.x,A[V+B+9]=s.y,A[V+B+10]=s.z,A[V+B+11]=O.itemSize===4?s.w:1)}}p={count:d,texture:R,size:new he(y,C)},n.set(o,p),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];const _=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:r}}function e_(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,u=l.geometry,d=e.get(l,u);if(s.get(d)!==c&&(e.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const p=l.skeleton;s.get(p)!==c&&(p.update(),s.set(p,c))}return d}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}const ru=new Rt,Cc=new Oh(1,1),au=new Ch,ou=new Nd,lu=new Fh,Rc=[],Lc=[],Ic=new Float32Array(16),Dc=new Float32Array(9),Uc=new Float32Array(4);function ds(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Rc[s];if(r===void 0&&(r=new Float32Array(s),Rc[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Tt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function At(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function sa(i,e){let t=Lc[e];t===void 0&&(t=new Int32Array(e),Lc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function t_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function n_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;i.uniform2fv(this.addr,e),At(t,e)}}function i_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Tt(t,e))return;i.uniform3fv(this.addr,e),At(t,e)}}function s_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;i.uniform4fv(this.addr,e),At(t,e)}}function r_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Tt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),At(t,e)}else{if(Tt(t,n))return;Uc.set(n),i.uniformMatrix2fv(this.addr,!1,Uc),At(t,n)}}function a_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Tt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),At(t,e)}else{if(Tt(t,n))return;Dc.set(n),i.uniformMatrix3fv(this.addr,!1,Dc),At(t,n)}}function o_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Tt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),At(t,e)}else{if(Tt(t,n))return;Ic.set(n),i.uniformMatrix4fv(this.addr,!1,Ic),At(t,n)}}function l_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function c_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;i.uniform2iv(this.addr,e),At(t,e)}}function h_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tt(t,e))return;i.uniform3iv(this.addr,e),At(t,e)}}function u_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;i.uniform4iv(this.addr,e),At(t,e)}}function d_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function f_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;i.uniform2uiv(this.addr,e),At(t,e)}}function p_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tt(t,e))return;i.uniform3uiv(this.addr,e),At(t,e)}}function m_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;i.uniform4uiv(this.addr,e),At(t,e)}}function g_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Cc.compareFunction=wh,r=Cc):r=ru,t.setTexture2D(e||r,s)}function __(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||ou,s)}function x_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||lu,s)}function v_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||au,s)}function y_(i){switch(i){case 5126:return t_;case 35664:return n_;case 35665:return i_;case 35666:return s_;case 35674:return r_;case 35675:return a_;case 35676:return o_;case 5124:case 35670:return l_;case 35667:case 35671:return c_;case 35668:case 35672:return h_;case 35669:case 35673:return u_;case 5125:return d_;case 36294:return f_;case 36295:return p_;case 36296:return m_;case 35678:case 36198:case 36298:case 36306:case 35682:return g_;case 35679:case 36299:case 36307:return __;case 35680:case 36300:case 36308:case 36293:return x_;case 36289:case 36303:case 36311:case 36292:return v_}}function M_(i,e){i.uniform1fv(this.addr,e)}function b_(i,e){const t=ds(e,this.size,2);i.uniform2fv(this.addr,t)}function S_(i,e){const t=ds(e,this.size,3);i.uniform3fv(this.addr,t)}function E_(i,e){const t=ds(e,this.size,4);i.uniform4fv(this.addr,t)}function T_(i,e){const t=ds(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function A_(i,e){const t=ds(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function w_(i,e){const t=ds(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function P_(i,e){i.uniform1iv(this.addr,e)}function C_(i,e){i.uniform2iv(this.addr,e)}function R_(i,e){i.uniform3iv(this.addr,e)}function L_(i,e){i.uniform4iv(this.addr,e)}function I_(i,e){i.uniform1uiv(this.addr,e)}function D_(i,e){i.uniform2uiv(this.addr,e)}function U_(i,e){i.uniform3uiv(this.addr,e)}function F_(i,e){i.uniform4uiv(this.addr,e)}function N_(i,e,t){const n=this.cache,s=e.length,r=sa(t,s);Tt(n,r)||(i.uniform1iv(this.addr,r),At(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||ru,r[a])}function O_(i,e,t){const n=this.cache,s=e.length,r=sa(t,s);Tt(n,r)||(i.uniform1iv(this.addr,r),At(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||ou,r[a])}function B_(i,e,t){const n=this.cache,s=e.length,r=sa(t,s);Tt(n,r)||(i.uniform1iv(this.addr,r),At(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||lu,r[a])}function V_(i,e,t){const n=this.cache,s=e.length,r=sa(t,s);Tt(n,r)||(i.uniform1iv(this.addr,r),At(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||au,r[a])}function z_(i){switch(i){case 5126:return M_;case 35664:return b_;case 35665:return S_;case 35666:return E_;case 35674:return T_;case 35675:return A_;case 35676:return w_;case 5124:case 35670:return P_;case 35667:case 35671:return C_;case 35668:case 35672:return R_;case 35669:case 35673:return L_;case 5125:return I_;case 36294:return D_;case 36295:return U_;case 36296:return F_;case 35678:case 36198:case 36298:case 36306:case 35682:return N_;case 35679:case 36299:case 36307:return O_;case 35680:case 36300:case 36308:case 36293:return B_;case 36289:case 36303:case 36311:case 36292:return V_}}class k_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=y_(t.type)}}class H_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=z_(t.type)}}class G_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const $a=/(\w+)(\])?(\[|\.)?/g;function Fc(i,e){i.seq.push(e),i.map[e.id]=e}function W_(i,e,t){const n=i.name,s=n.length;for($a.lastIndex=0;;){const r=$a.exec(n),a=$a.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Fc(t,c===void 0?new k_(o,i,e):new H_(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new G_(o),Fc(t,d)),t=d}}}class zr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);W_(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Nc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const X_=37297;let q_=0;function Y_(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Oc=new Ye;function $_(i){et._getMatrix(Oc,et.workingColorSpace,i);const e=`mat3( ${Oc.elements.map(t=>t.toFixed(4))} )`;switch(et.getTransfer(i)){case Hr:return[e,"LinearTransferOETF"];case at:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Bc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+Y_(i.getShaderSource(e),a)}else return s}function K_(i,e){const t=$_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Z_(i,e){let t;switch(e){case $u:t="Linear";break;case Ku:t="Reinhard";break;case Zu:t="Cineon";break;case gh:t="ACESFilmic";break;case Ju:t="AgX";break;case Qu:t="Neutral";break;case ju:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Tr=new w;function j_(){et.getLuminanceCoefficients(Tr);const i=Tr.x.toFixed(4),e=Tr.y.toFixed(4),t=Tr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function J_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ws).join(`
`)}function Q_(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function e0(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function ws(i){return i!==""}function Vc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function zc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const t0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ko(i){return i.replace(t0,i0)}const n0=new Map;function i0(i,e){let t=Ke[e];if(t===void 0){const n=n0.get(e);if(n!==void 0)t=Ke[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ko(t)}const s0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function kc(i){return i.replace(s0,r0)}function r0(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Hc(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function a0(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ph?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===mh?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Cn&&(e="SHADOWMAP_TYPE_VSM"),e}function o0(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case rs:case as:e="ENVMAP_TYPE_CUBE";break;case Zr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function l0(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case as:e="ENVMAP_MODE_REFRACTION";break}return e}function c0(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Kr:e="ENVMAP_BLENDING_MULTIPLY";break;case qu:e="ENVMAP_BLENDING_MIX";break;case Yu:e="ENVMAP_BLENDING_ADD";break}return e}function h0(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function u0(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=a0(t),c=o0(t),u=l0(t),d=c0(t),p=h0(t),f=J_(t),_=Q_(r),v=s.createProgram();let g,m,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ws).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ws).join(`
`),m.length>0&&(m+=`
`)):(g=[Hc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ws).join(`
`),m=[Hc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==$n?"#define TONE_MAPPING":"",t.toneMapping!==$n?Ke.tonemapping_pars_fragment:"",t.toneMapping!==$n?Z_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ke.colorspace_pars_fragment,K_("linearToOutputTexel",t.outputColorSpace),j_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ws).join(`
`)),a=Ko(a),a=Vc(a,t),a=zc(a,t),o=Ko(o),o=Vc(o,t),o=zc(o,t),a=kc(a),o=kc(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===Fl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Fl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const M=S+g+a,y=S+m+o,C=Nc(s,s.VERTEX_SHADER,M),A=Nc(s,s.FRAGMENT_SHADER,y);s.attachShader(v,C),s.attachShader(v,A),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function R(L){if(i.debug.checkShaderErrors){const F=s.getProgramInfoLog(v).trim(),O=s.getShaderInfoLog(C).trim(),V=s.getShaderInfoLog(A).trim();let $=!0,B=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if($=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,C,A);else{const X=Bc(s,C,"vertex"),N=Bc(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+F+`
`+X+`
`+N)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(O===""||V==="")&&(B=!1);B&&(L.diagnostics={runnable:$,programLog:F,vertexShader:{log:O,prefix:g},fragmentShader:{log:V,prefix:m}})}s.deleteShader(C),s.deleteShader(A),U=new zr(s,v),E=e0(s,v)}let U;this.getUniforms=function(){return U===void 0&&R(this),U};let E;this.getAttributes=function(){return E===void 0&&R(this),E};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(v,X_)),b},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=q_++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=C,this.fragmentShader=A,this}let d0=0;class f0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new p0(e),t.set(e,n)),n}}class p0{constructor(e){this.id=d0++,this.code=e,this.usedTimes=0}}function m0(i,e,t,n,s,r,a){const o=new ol,l=new f0,c=new Set,u=[],d=s.logarithmicDepthBuffer,p=s.vertexTextures;let f=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(E){return c.add(E),E===0?"uv":`uv${E}`}function g(E,b,L,F,O){const V=F.fog,$=O.geometry,B=E.isMeshStandardMaterial?F.environment:null,X=(E.isMeshStandardMaterial?t:e).get(E.envMap||B),N=X&&X.mapping===Zr?X.image.height:null,j=_[E.type];E.precision!==null&&(f=s.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));const Q=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,se=Q!==void 0?Q.length:0;let ue=0;$.morphAttributes.position!==void 0&&(ue=1),$.morphAttributes.normal!==void 0&&(ue=2),$.morphAttributes.color!==void 0&&(ue=3);let Ae,q,te,de;if(j){const rt=_n[j];Ae=rt.vertexShader,q=rt.fragmentShader}else Ae=E.vertexShader,q=E.fragmentShader,l.update(E),te=l.getVertexShaderID(E),de=l.getFragmentShaderID(E);const re=i.getRenderTarget(),be=i.state.buffers.depth.getReversed(),De=O.isInstancedMesh===!0,ge=O.isBatchedMesh===!0,Be=!!E.map,ae=!!E.matcap,ee=!!X,D=!!E.aoMap,Ue=!!E.lightMap,fe=!!E.bumpMap,Pe=!!E.normalMap,_e=!!E.displacementMap,ze=!!E.emissiveMap,Se=!!E.metalnessMap,I=!!E.roughnessMap,T=E.anisotropy>0,Y=E.clearcoat>0,ne=E.dispersion>0,le=E.iridescence>0,ie=E.sheen>0,Fe=E.transmission>0,ve=T&&!!E.anisotropyMap,we=Y&&!!E.clearcoatMap,je=Y&&!!E.clearcoatNormalMap,me=Y&&!!E.clearcoatRoughnessMap,Re=le&&!!E.iridescenceMap,ke=le&&!!E.iridescenceThicknessMap,He=ie&&!!E.sheenColorMap,Le=ie&&!!E.sheenRoughnessMap,Je=!!E.specularMap,$e=!!E.specularColorMap,lt=!!E.specularIntensityMap,z=Fe&&!!E.transmissionMap,ye=Fe&&!!E.thicknessMap,J=!!E.gradientMap,oe=!!E.alphaMap,Te=E.alphaTest>0,Ee=!!E.alphaHash,qe=!!E.extensions;let ft=$n;E.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(ft=i.toneMapping);const Lt={shaderID:j,shaderType:E.type,shaderName:E.name,vertexShader:Ae,fragmentShader:q,defines:E.defines,customVertexShaderID:te,customFragmentShaderID:de,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:ge,batchingColor:ge&&O._colorsTexture!==null,instancing:De,instancingColor:De&&O.instanceColor!==null,instancingMorph:De&&O.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:re===null?i.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:cs,alphaToCoverage:!!E.alphaToCoverage,map:Be,matcap:ae,envMap:ee,envMapMode:ee&&X.mapping,envMapCubeUVHeight:N,aoMap:D,lightMap:Ue,bumpMap:fe,normalMap:Pe,displacementMap:p&&_e,emissiveMap:ze,normalMapObjectSpace:Pe&&E.normalMapType===id,normalMapTangentSpace:Pe&&E.normalMapType===ks,metalnessMap:Se,roughnessMap:I,anisotropy:T,anisotropyMap:ve,clearcoat:Y,clearcoatMap:we,clearcoatNormalMap:je,clearcoatRoughnessMap:me,dispersion:ne,iridescence:le,iridescenceMap:Re,iridescenceThicknessMap:ke,sheen:ie,sheenColorMap:He,sheenRoughnessMap:Le,specularMap:Je,specularColorMap:$e,specularIntensityMap:lt,transmission:Fe,transmissionMap:z,thicknessMap:ye,gradientMap:J,opaque:E.transparent===!1&&E.blending===Ji&&E.alphaToCoverage===!1,alphaMap:oe,alphaTest:Te,alphaHash:Ee,combine:E.combine,mapUv:Be&&v(E.map.channel),aoMapUv:D&&v(E.aoMap.channel),lightMapUv:Ue&&v(E.lightMap.channel),bumpMapUv:fe&&v(E.bumpMap.channel),normalMapUv:Pe&&v(E.normalMap.channel),displacementMapUv:_e&&v(E.displacementMap.channel),emissiveMapUv:ze&&v(E.emissiveMap.channel),metalnessMapUv:Se&&v(E.metalnessMap.channel),roughnessMapUv:I&&v(E.roughnessMap.channel),anisotropyMapUv:ve&&v(E.anisotropyMap.channel),clearcoatMapUv:we&&v(E.clearcoatMap.channel),clearcoatNormalMapUv:je&&v(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:me&&v(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Re&&v(E.iridescenceMap.channel),iridescenceThicknessMapUv:ke&&v(E.iridescenceThicknessMap.channel),sheenColorMapUv:He&&v(E.sheenColorMap.channel),sheenRoughnessMapUv:Le&&v(E.sheenRoughnessMap.channel),specularMapUv:Je&&v(E.specularMap.channel),specularColorMapUv:$e&&v(E.specularColorMap.channel),specularIntensityMapUv:lt&&v(E.specularIntensityMap.channel),transmissionMapUv:z&&v(E.transmissionMap.channel),thicknessMapUv:ye&&v(E.thicknessMap.channel),alphaMapUv:oe&&v(E.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(Pe||T),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!$.attributes.uv&&(Be||oe),fog:!!V,useFog:E.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:be,skinning:O.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:se,morphTextureStride:ue,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:ft,decodeVideoTexture:Be&&E.map.isVideoTexture===!0&&et.getTransfer(E.map.colorSpace)===at,decodeVideoTextureEmissive:ze&&E.emissiveMap.isVideoTexture===!0&&et.getTransfer(E.emissiveMap.colorSpace)===at,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Ht,flipSided:E.side===Gt,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:qe&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(qe&&E.extensions.multiDraw===!0||ge)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Lt.vertexUv1s=c.has(1),Lt.vertexUv2s=c.has(2),Lt.vertexUv3s=c.has(3),c.clear(),Lt}function m(E){const b=[];if(E.shaderID?b.push(E.shaderID):(b.push(E.customVertexShaderID),b.push(E.customFragmentShaderID)),E.defines!==void 0)for(const L in E.defines)b.push(L),b.push(E.defines[L]);return E.isRawShaderMaterial===!1&&(S(b,E),M(b,E),b.push(i.outputColorSpace)),b.push(E.customProgramCacheKey),b.join()}function S(E,b){E.push(b.precision),E.push(b.outputColorSpace),E.push(b.envMapMode),E.push(b.envMapCubeUVHeight),E.push(b.mapUv),E.push(b.alphaMapUv),E.push(b.lightMapUv),E.push(b.aoMapUv),E.push(b.bumpMapUv),E.push(b.normalMapUv),E.push(b.displacementMapUv),E.push(b.emissiveMapUv),E.push(b.metalnessMapUv),E.push(b.roughnessMapUv),E.push(b.anisotropyMapUv),E.push(b.clearcoatMapUv),E.push(b.clearcoatNormalMapUv),E.push(b.clearcoatRoughnessMapUv),E.push(b.iridescenceMapUv),E.push(b.iridescenceThicknessMapUv),E.push(b.sheenColorMapUv),E.push(b.sheenRoughnessMapUv),E.push(b.specularMapUv),E.push(b.specularColorMapUv),E.push(b.specularIntensityMapUv),E.push(b.transmissionMapUv),E.push(b.thicknessMapUv),E.push(b.combine),E.push(b.fogExp2),E.push(b.sizeAttenuation),E.push(b.morphTargetsCount),E.push(b.morphAttributeCount),E.push(b.numDirLights),E.push(b.numPointLights),E.push(b.numSpotLights),E.push(b.numSpotLightMaps),E.push(b.numHemiLights),E.push(b.numRectAreaLights),E.push(b.numDirLightShadows),E.push(b.numPointLightShadows),E.push(b.numSpotLightShadows),E.push(b.numSpotLightShadowsWithMaps),E.push(b.numLightProbes),E.push(b.shadowMapType),E.push(b.toneMapping),E.push(b.numClippingPlanes),E.push(b.numClipIntersection),E.push(b.depthPacking)}function M(E,b){o.disableAll(),b.supportsVertexTextures&&o.enable(0),b.instancing&&o.enable(1),b.instancingColor&&o.enable(2),b.instancingMorph&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),b.dispersion&&o.enable(20),b.batchingColor&&o.enable(21),E.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reverseDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),E.push(o.mask)}function y(E){const b=_[E.type];let L;if(b){const F=_n[b];L=Kd.clone(F.uniforms)}else L=E.uniforms;return L}function C(E,b){let L;for(let F=0,O=u.length;F<O;F++){const V=u[F];if(V.cacheKey===b){L=V,++L.usedTimes;break}}return L===void 0&&(L=new u0(i,b,E,r),u.push(L)),L}function A(E){if(--E.usedTimes===0){const b=u.indexOf(E);u[b]=u[u.length-1],u.pop(),E.destroy()}}function R(E){l.remove(E)}function U(){l.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:y,acquireProgram:C,releaseProgram:A,releaseShaderCache:R,programs:u,dispose:U}}function g0(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function _0(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Gc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Wc(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(d,p,f,_,v,g){let m=i[e];return m===void 0?(m={id:d.id,object:d,geometry:p,material:f,groupOrder:_,renderOrder:d.renderOrder,z:v,group:g},i[e]=m):(m.id=d.id,m.object=d,m.geometry=p,m.material=f,m.groupOrder=_,m.renderOrder=d.renderOrder,m.z=v,m.group=g),e++,m}function o(d,p,f,_,v,g){const m=a(d,p,f,_,v,g);f.transmission>0?n.push(m):f.transparent===!0?s.push(m):t.push(m)}function l(d,p,f,_,v,g){const m=a(d,p,f,_,v,g);f.transmission>0?n.unshift(m):f.transparent===!0?s.unshift(m):t.unshift(m)}function c(d,p){t.length>1&&t.sort(d||_0),n.length>1&&n.sort(p||Gc),s.length>1&&s.sort(p||Gc)}function u(){for(let d=e,p=i.length;d<p;d++){const f=i[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:u,sort:c}}function x0(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Wc,i.set(n,[a])):s>=r.length?(a=new Wc,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function v0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new w,color:new Ve};break;case"SpotLight":t={position:new w,direction:new w,color:new Ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new Ve,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new Ve,groundColor:new Ve};break;case"RectAreaLight":t={color:new Ve,position:new w,halfWidth:new w,halfHeight:new w};break}return i[e.id]=t,t}}}function y0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let M0=0;function b0(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function S0(i){const e=new v0,t=y0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new w);const s=new w,r=new st,a=new st;function o(c){let u=0,d=0,p=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let f=0,_=0,v=0,g=0,m=0,S=0,M=0,y=0,C=0,A=0,R=0;c.sort(b0);for(let E=0,b=c.length;E<b;E++){const L=c[E],F=L.color,O=L.intensity,V=L.distance,$=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=F.r*O,d+=F.g*O,p+=F.b*O;else if(L.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(L.sh.coefficients[B],O);R++}else if(L.isDirectionalLight){const B=e.get(L);if(B.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const X=L.shadow,N=t.get(L);N.shadowIntensity=X.intensity,N.shadowBias=X.bias,N.shadowNormalBias=X.normalBias,N.shadowRadius=X.radius,N.shadowMapSize=X.mapSize,n.directionalShadow[f]=N,n.directionalShadowMap[f]=$,n.directionalShadowMatrix[f]=L.shadow.matrix,S++}n.directional[f]=B,f++}else if(L.isSpotLight){const B=e.get(L);B.position.setFromMatrixPosition(L.matrixWorld),B.color.copy(F).multiplyScalar(O),B.distance=V,B.coneCos=Math.cos(L.angle),B.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),B.decay=L.decay,n.spot[v]=B;const X=L.shadow;if(L.map&&(n.spotLightMap[C]=L.map,C++,X.updateMatrices(L),L.castShadow&&A++),n.spotLightMatrix[v]=X.matrix,L.castShadow){const N=t.get(L);N.shadowIntensity=X.intensity,N.shadowBias=X.bias,N.shadowNormalBias=X.normalBias,N.shadowRadius=X.radius,N.shadowMapSize=X.mapSize,n.spotShadow[v]=N,n.spotShadowMap[v]=$,y++}v++}else if(L.isRectAreaLight){const B=e.get(L);B.color.copy(F).multiplyScalar(O),B.halfWidth.set(L.width*.5,0,0),B.halfHeight.set(0,L.height*.5,0),n.rectArea[g]=B,g++}else if(L.isPointLight){const B=e.get(L);if(B.color.copy(L.color).multiplyScalar(L.intensity),B.distance=L.distance,B.decay=L.decay,L.castShadow){const X=L.shadow,N=t.get(L);N.shadowIntensity=X.intensity,N.shadowBias=X.bias,N.shadowNormalBias=X.normalBias,N.shadowRadius=X.radius,N.shadowMapSize=X.mapSize,N.shadowCameraNear=X.camera.near,N.shadowCameraFar=X.camera.far,n.pointShadow[_]=N,n.pointShadowMap[_]=$,n.pointShadowMatrix[_]=L.shadow.matrix,M++}n.point[_]=B,_++}else if(L.isHemisphereLight){const B=e.get(L);B.skyColor.copy(L.color).multiplyScalar(O),B.groundColor.copy(L.groundColor).multiplyScalar(O),n.hemi[m]=B,m++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=xe.LTC_FLOAT_1,n.rectAreaLTC2=xe.LTC_FLOAT_2):(n.rectAreaLTC1=xe.LTC_HALF_1,n.rectAreaLTC2=xe.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=p;const U=n.hash;(U.directionalLength!==f||U.pointLength!==_||U.spotLength!==v||U.rectAreaLength!==g||U.hemiLength!==m||U.numDirectionalShadows!==S||U.numPointShadows!==M||U.numSpotShadows!==y||U.numSpotMaps!==C||U.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=g,n.point.length=_,n.hemi.length=m,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=y+C-A,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=R,U.directionalLength=f,U.pointLength=_,U.spotLength=v,U.rectAreaLength=g,U.hemiLength=m,U.numDirectionalShadows=S,U.numPointShadows=M,U.numSpotShadows=y,U.numSpotMaps=C,U.numLightProbes=R,n.version=M0++)}function l(c,u){let d=0,p=0,f=0,_=0,v=0;const g=u.matrixWorldInverse;for(let m=0,S=c.length;m<S;m++){const M=c[m];if(M.isDirectionalLight){const y=n.directional[d];y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(g),d++}else if(M.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(g),f++}else if(M.isRectAreaLight){const y=n.rectArea[_];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(g),a.identity(),r.copy(M.matrixWorld),r.premultiply(g),a.extractRotation(r),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),_++}else if(M.isPointLight){const y=n.point[p];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(g),p++}else if(M.isHemisphereLight){const y=n.hemi[v];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(g),v++}}}return{setup:o,setupView:l,state:n}}function Xc(i){const e=new S0(i),t=[],n=[];function s(u){c.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function E0(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Xc(i),e.set(s,[o])):r>=a.length?(o=new Xc(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const T0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,A0=`uniform sampler2D shadow_pass;
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
}`;function w0(i,e,t){let n=new Qr;const s=new he,r=new he,a=new gt,o=new Yf({depthPacking:nd}),l=new $f,c={},u=t.maxTextureSize,d={[$t]:Gt,[Gt]:$t,[Ht]:Ht},p=new jn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new he},radius:{value:4}},vertexShader:T0,fragmentShader:A0}),f=p.clone();f.defines.HORIZONTAL_PASS=1;const _=new _t;_.setAttribute("position",new jt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ct(_,p),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ph;let m=this.type;this.render=function(A,R,U){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;const E=i.getRenderTarget(),b=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),F=i.state;F.setBlending(Yn),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const O=m!==Cn&&this.type===Cn,V=m===Cn&&this.type!==Cn;for(let $=0,B=A.length;$<B;$++){const X=A[$],N=X.shadow;if(N===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;s.copy(N.mapSize);const j=N.getFrameExtents();if(s.multiply(j),r.copy(N.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/j.x),s.x=r.x*j.x,N.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/j.y),s.y=r.y*j.y,N.mapSize.y=r.y)),N.map===null||O===!0||V===!0){const se=this.type!==Cn?{minFilter:Bt,magFilter:Bt}:{};N.map!==null&&N.map.dispose(),N.map=new Si(s.x,s.y,se),N.map.texture.name=X.name+".shadowMap",N.camera.updateProjectionMatrix()}i.setRenderTarget(N.map),i.clear();const Q=N.getViewportCount();for(let se=0;se<Q;se++){const ue=N.getViewport(se);a.set(r.x*ue.x,r.y*ue.y,r.x*ue.z,r.y*ue.w),F.viewport(a),N.updateMatrices(X,se),n=N.getFrustum(),y(R,U,N.camera,X,this.type)}N.isPointLightShadow!==!0&&this.type===Cn&&S(N,U),N.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(E,b,L)};function S(A,R){const U=e.update(v);p.defines.VSM_SAMPLES!==A.blurSamples&&(p.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,p.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Si(s.x,s.y)),p.uniforms.shadow_pass.value=A.map.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(R,null,U,p,v,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(R,null,U,f,v,null)}function M(A,R,U,E){let b=null;const L=U.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(L!==void 0)b=L;else if(b=U.isPointLight===!0?l:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const F=b.uuid,O=R.uuid;let V=c[F];V===void 0&&(V={},c[F]=V);let $=V[O];$===void 0&&($=b.clone(),V[O]=$,R.addEventListener("dispose",C)),b=$}if(b.visible=R.visible,b.wireframe=R.wireframe,E===Cn?b.side=R.shadowSide!==null?R.shadowSide:R.side:b.side=R.shadowSide!==null?R.shadowSide:d[R.side],b.alphaMap=R.alphaMap,b.alphaTest=R.alphaTest,b.map=R.map,b.clipShadows=R.clipShadows,b.clippingPlanes=R.clippingPlanes,b.clipIntersection=R.clipIntersection,b.displacementMap=R.displacementMap,b.displacementScale=R.displacementScale,b.displacementBias=R.displacementBias,b.wireframeLinewidth=R.wireframeLinewidth,b.linewidth=R.linewidth,U.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const F=i.properties.get(b);F.light=U}return b}function y(A,R,U,E,b){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&b===Cn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,A.matrixWorld);const O=e.update(A),V=A.material;if(Array.isArray(V)){const $=O.groups;for(let B=0,X=$.length;B<X;B++){const N=$[B],j=V[N.materialIndex];if(j&&j.visible){const Q=M(A,j,E,b);A.onBeforeShadow(i,A,R,U,O,Q,N),i.renderBufferDirect(U,null,O,Q,A,N),A.onAfterShadow(i,A,R,U,O,Q,N)}}}else if(V.visible){const $=M(A,V,E,b);A.onBeforeShadow(i,A,R,U,O,$,null),i.renderBufferDirect(U,null,O,$,A,null),A.onAfterShadow(i,A,R,U,O,$,null)}}const F=A.children;for(let O=0,V=F.length;O<V;O++)y(F[O],R,U,E,b)}function C(A){A.target.removeEventListener("dispose",C);for(const U in c){const E=c[U],b=A.target.uuid;b in E&&(E[b].dispose(),delete E[b])}}}const P0={[lo]:co,[ho]:po,[uo]:mo,[ss]:fo,[co]:lo,[po]:ho,[mo]:uo,[fo]:ss};function C0(i,e){function t(){let z=!1;const ye=new gt;let J=null;const oe=new gt(0,0,0,0);return{setMask:function(Te){J!==Te&&!z&&(i.colorMask(Te,Te,Te,Te),J=Te)},setLocked:function(Te){z=Te},setClear:function(Te,Ee,qe,ft,Lt){Lt===!0&&(Te*=ft,Ee*=ft,qe*=ft),ye.set(Te,Ee,qe,ft),oe.equals(ye)===!1&&(i.clearColor(Te,Ee,qe,ft),oe.copy(ye))},reset:function(){z=!1,J=null,oe.set(-1,0,0,0)}}}function n(){let z=!1,ye=!1,J=null,oe=null,Te=null;return{setReversed:function(Ee){if(ye!==Ee){const qe=e.get("EXT_clip_control");ye?qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.ZERO_TO_ONE_EXT):qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.NEGATIVE_ONE_TO_ONE_EXT);const ft=Te;Te=null,this.setClear(ft)}ye=Ee},getReversed:function(){return ye},setTest:function(Ee){Ee?re(i.DEPTH_TEST):be(i.DEPTH_TEST)},setMask:function(Ee){J!==Ee&&!z&&(i.depthMask(Ee),J=Ee)},setFunc:function(Ee){if(ye&&(Ee=P0[Ee]),oe!==Ee){switch(Ee){case lo:i.depthFunc(i.NEVER);break;case co:i.depthFunc(i.ALWAYS);break;case ho:i.depthFunc(i.LESS);break;case ss:i.depthFunc(i.LEQUAL);break;case uo:i.depthFunc(i.EQUAL);break;case fo:i.depthFunc(i.GEQUAL);break;case po:i.depthFunc(i.GREATER);break;case mo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}oe=Ee}},setLocked:function(Ee){z=Ee},setClear:function(Ee){Te!==Ee&&(ye&&(Ee=1-Ee),i.clearDepth(Ee),Te=Ee)},reset:function(){z=!1,J=null,oe=null,Te=null,ye=!1}}}function s(){let z=!1,ye=null,J=null,oe=null,Te=null,Ee=null,qe=null,ft=null,Lt=null;return{setTest:function(rt){z||(rt?re(i.STENCIL_TEST):be(i.STENCIL_TEST))},setMask:function(rt){ye!==rt&&!z&&(i.stencilMask(rt),ye=rt)},setFunc:function(rt,on,bn){(J!==rt||oe!==on||Te!==bn)&&(i.stencilFunc(rt,on,bn),J=rt,oe=on,Te=bn)},setOp:function(rt,on,bn){(Ee!==rt||qe!==on||ft!==bn)&&(i.stencilOp(rt,on,bn),Ee=rt,qe=on,ft=bn)},setLocked:function(rt){z=rt},setClear:function(rt){Lt!==rt&&(i.clearStencil(rt),Lt=rt)},reset:function(){z=!1,ye=null,J=null,oe=null,Te=null,Ee=null,qe=null,ft=null,Lt=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let u={},d={},p=new WeakMap,f=[],_=null,v=!1,g=null,m=null,S=null,M=null,y=null,C=null,A=null,R=new Ve(0,0,0),U=0,E=!1,b=null,L=null,F=null,O=null,V=null;const $=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,X=0;const N=i.getParameter(i.VERSION);N.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(N)[1]),B=X>=1):N.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(N)[1]),B=X>=2);let j=null,Q={};const se=i.getParameter(i.SCISSOR_BOX),ue=i.getParameter(i.VIEWPORT),Ae=new gt().fromArray(se),q=new gt().fromArray(ue);function te(z,ye,J,oe){const Te=new Uint8Array(4),Ee=i.createTexture();i.bindTexture(z,Ee),i.texParameteri(z,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(z,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let qe=0;qe<J;qe++)z===i.TEXTURE_3D||z===i.TEXTURE_2D_ARRAY?i.texImage3D(ye,0,i.RGBA,1,1,oe,0,i.RGBA,i.UNSIGNED_BYTE,Te):i.texImage2D(ye+qe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Te);return Ee}const de={};de[i.TEXTURE_2D]=te(i.TEXTURE_2D,i.TEXTURE_2D,1),de[i.TEXTURE_CUBE_MAP]=te(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),de[i.TEXTURE_2D_ARRAY]=te(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),de[i.TEXTURE_3D]=te(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),re(i.DEPTH_TEST),a.setFunc(ss),fe(!1),Pe(Cl),re(i.CULL_FACE),D(Yn);function re(z){u[z]!==!0&&(i.enable(z),u[z]=!0)}function be(z){u[z]!==!1&&(i.disable(z),u[z]=!1)}function De(z,ye){return d[z]!==ye?(i.bindFramebuffer(z,ye),d[z]=ye,z===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=ye),z===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=ye),!0):!1}function ge(z,ye){let J=f,oe=!1;if(z){J=p.get(ye),J===void 0&&(J=[],p.set(ye,J));const Te=z.textures;if(J.length!==Te.length||J[0]!==i.COLOR_ATTACHMENT0){for(let Ee=0,qe=Te.length;Ee<qe;Ee++)J[Ee]=i.COLOR_ATTACHMENT0+Ee;J.length=Te.length,oe=!0}}else J[0]!==i.BACK&&(J[0]=i.BACK,oe=!0);oe&&i.drawBuffers(J)}function Be(z){return _!==z?(i.useProgram(z),_=z,!0):!1}const ae={[pi]:i.FUNC_ADD,[Cu]:i.FUNC_SUBTRACT,[Ru]:i.FUNC_REVERSE_SUBTRACT};ae[Lu]=i.MIN,ae[Iu]=i.MAX;const ee={[Du]:i.ZERO,[Uu]:i.ONE,[Fu]:i.SRC_COLOR,[ao]:i.SRC_ALPHA,[ku]:i.SRC_ALPHA_SATURATE,[Vu]:i.DST_COLOR,[Ou]:i.DST_ALPHA,[Nu]:i.ONE_MINUS_SRC_COLOR,[oo]:i.ONE_MINUS_SRC_ALPHA,[zu]:i.ONE_MINUS_DST_COLOR,[Bu]:i.ONE_MINUS_DST_ALPHA,[Hu]:i.CONSTANT_COLOR,[Gu]:i.ONE_MINUS_CONSTANT_COLOR,[Wu]:i.CONSTANT_ALPHA,[Xu]:i.ONE_MINUS_CONSTANT_ALPHA};function D(z,ye,J,oe,Te,Ee,qe,ft,Lt,rt){if(z===Yn){v===!0&&(be(i.BLEND),v=!1);return}if(v===!1&&(re(i.BLEND),v=!0),z!==Pu){if(z!==g||rt!==E){if((m!==pi||y!==pi)&&(i.blendEquation(i.FUNC_ADD),m=pi,y=pi),rt)switch(z){case Ji:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Rl:i.blendFunc(i.ONE,i.ONE);break;case Ll:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Il:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}else switch(z){case Ji:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Rl:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Ll:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Il:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}S=null,M=null,C=null,A=null,R.set(0,0,0),U=0,g=z,E=rt}return}Te=Te||ye,Ee=Ee||J,qe=qe||oe,(ye!==m||Te!==y)&&(i.blendEquationSeparate(ae[ye],ae[Te]),m=ye,y=Te),(J!==S||oe!==M||Ee!==C||qe!==A)&&(i.blendFuncSeparate(ee[J],ee[oe],ee[Ee],ee[qe]),S=J,M=oe,C=Ee,A=qe),(ft.equals(R)===!1||Lt!==U)&&(i.blendColor(ft.r,ft.g,ft.b,Lt),R.copy(ft),U=Lt),g=z,E=!1}function Ue(z,ye){z.side===Ht?be(i.CULL_FACE):re(i.CULL_FACE);let J=z.side===Gt;ye&&(J=!J),fe(J),z.blending===Ji&&z.transparent===!1?D(Yn):D(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),a.setFunc(z.depthFunc),a.setTest(z.depthTest),a.setMask(z.depthWrite),r.setMask(z.colorWrite);const oe=z.stencilWrite;o.setTest(oe),oe&&(o.setMask(z.stencilWriteMask),o.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),o.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),ze(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?re(i.SAMPLE_ALPHA_TO_COVERAGE):be(i.SAMPLE_ALPHA_TO_COVERAGE)}function fe(z){b!==z&&(z?i.frontFace(i.CW):i.frontFace(i.CCW),b=z)}function Pe(z){z!==Au?(re(i.CULL_FACE),z!==L&&(z===Cl?i.cullFace(i.BACK):z===wu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):be(i.CULL_FACE),L=z}function _e(z){z!==F&&(B&&i.lineWidth(z),F=z)}function ze(z,ye,J){z?(re(i.POLYGON_OFFSET_FILL),(O!==ye||V!==J)&&(i.polygonOffset(ye,J),O=ye,V=J)):be(i.POLYGON_OFFSET_FILL)}function Se(z){z?re(i.SCISSOR_TEST):be(i.SCISSOR_TEST)}function I(z){z===void 0&&(z=i.TEXTURE0+$-1),j!==z&&(i.activeTexture(z),j=z)}function T(z,ye,J){J===void 0&&(j===null?J=i.TEXTURE0+$-1:J=j);let oe=Q[J];oe===void 0&&(oe={type:void 0,texture:void 0},Q[J]=oe),(oe.type!==z||oe.texture!==ye)&&(j!==J&&(i.activeTexture(J),j=J),i.bindTexture(z,ye||de[z]),oe.type=z,oe.texture=ye)}function Y(){const z=Q[j];z!==void 0&&z.type!==void 0&&(i.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function ne(){try{i.compressedTexImage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function le(){try{i.compressedTexImage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ie(){try{i.texSubImage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Fe(){try{i.texSubImage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ve(){try{i.compressedTexSubImage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function we(){try{i.compressedTexSubImage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function je(){try{i.texStorage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function me(){try{i.texStorage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Re(){try{i.texImage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ke(){try{i.texImage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function He(z){Ae.equals(z)===!1&&(i.scissor(z.x,z.y,z.z,z.w),Ae.copy(z))}function Le(z){q.equals(z)===!1&&(i.viewport(z.x,z.y,z.z,z.w),q.copy(z))}function Je(z,ye){let J=c.get(ye);J===void 0&&(J=new WeakMap,c.set(ye,J));let oe=J.get(z);oe===void 0&&(oe=i.getUniformBlockIndex(ye,z.name),J.set(z,oe))}function $e(z,ye){const oe=c.get(ye).get(z);l.get(ye)!==oe&&(i.uniformBlockBinding(ye,oe,z.__bindingPointIndex),l.set(ye,oe))}function lt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},j=null,Q={},d={},p=new WeakMap,f=[],_=null,v=!1,g=null,m=null,S=null,M=null,y=null,C=null,A=null,R=new Ve(0,0,0),U=0,E=!1,b=null,L=null,F=null,O=null,V=null,Ae.set(0,0,i.canvas.width,i.canvas.height),q.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:re,disable:be,bindFramebuffer:De,drawBuffers:ge,useProgram:Be,setBlending:D,setMaterial:Ue,setFlipSided:fe,setCullFace:Pe,setLineWidth:_e,setPolygonOffset:ze,setScissorTest:Se,activeTexture:I,bindTexture:T,unbindTexture:Y,compressedTexImage2D:ne,compressedTexImage3D:le,texImage2D:Re,texImage3D:ke,updateUBOMapping:Je,uniformBlockBinding:$e,texStorage2D:je,texStorage3D:me,texSubImage2D:ie,texSubImage3D:Fe,compressedTexSubImage2D:ve,compressedTexSubImage3D:we,scissor:He,viewport:Le,reset:lt}}function R0(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new he,u=new WeakMap;let d;const p=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(I,T){return f?new OffscreenCanvas(I,T):Wr("canvas")}function v(I,T,Y){let ne=1;const le=Se(I);if((le.width>Y||le.height>Y)&&(ne=Y/Math.max(le.width,le.height)),ne<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const ie=Math.floor(ne*le.width),Fe=Math.floor(ne*le.height);d===void 0&&(d=_(ie,Fe));const ve=T?_(ie,Fe):d;return ve.width=ie,ve.height=Fe,ve.getContext("2d").drawImage(I,0,0,ie,Fe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+le.width+"x"+le.height+") to ("+ie+"x"+Fe+")."),ve}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+le.width+"x"+le.height+")."),I;return I}function g(I){return I.generateMipmaps}function m(I){i.generateMipmap(I)}function S(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(I,T,Y,ne,le=!1){if(I!==null){if(i[I]!==void 0)return i[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let ie=T;if(T===i.RED&&(Y===i.FLOAT&&(ie=i.R32F),Y===i.HALF_FLOAT&&(ie=i.R16F),Y===i.UNSIGNED_BYTE&&(ie=i.R8)),T===i.RED_INTEGER&&(Y===i.UNSIGNED_BYTE&&(ie=i.R8UI),Y===i.UNSIGNED_SHORT&&(ie=i.R16UI),Y===i.UNSIGNED_INT&&(ie=i.R32UI),Y===i.BYTE&&(ie=i.R8I),Y===i.SHORT&&(ie=i.R16I),Y===i.INT&&(ie=i.R32I)),T===i.RG&&(Y===i.FLOAT&&(ie=i.RG32F),Y===i.HALF_FLOAT&&(ie=i.RG16F),Y===i.UNSIGNED_BYTE&&(ie=i.RG8)),T===i.RG_INTEGER&&(Y===i.UNSIGNED_BYTE&&(ie=i.RG8UI),Y===i.UNSIGNED_SHORT&&(ie=i.RG16UI),Y===i.UNSIGNED_INT&&(ie=i.RG32UI),Y===i.BYTE&&(ie=i.RG8I),Y===i.SHORT&&(ie=i.RG16I),Y===i.INT&&(ie=i.RG32I)),T===i.RGB_INTEGER&&(Y===i.UNSIGNED_BYTE&&(ie=i.RGB8UI),Y===i.UNSIGNED_SHORT&&(ie=i.RGB16UI),Y===i.UNSIGNED_INT&&(ie=i.RGB32UI),Y===i.BYTE&&(ie=i.RGB8I),Y===i.SHORT&&(ie=i.RGB16I),Y===i.INT&&(ie=i.RGB32I)),T===i.RGBA_INTEGER&&(Y===i.UNSIGNED_BYTE&&(ie=i.RGBA8UI),Y===i.UNSIGNED_SHORT&&(ie=i.RGBA16UI),Y===i.UNSIGNED_INT&&(ie=i.RGBA32UI),Y===i.BYTE&&(ie=i.RGBA8I),Y===i.SHORT&&(ie=i.RGBA16I),Y===i.INT&&(ie=i.RGBA32I)),T===i.RGB&&Y===i.UNSIGNED_INT_5_9_9_9_REV&&(ie=i.RGB9_E5),T===i.RGBA){const Fe=le?Hr:et.getTransfer(ne);Y===i.FLOAT&&(ie=i.RGBA32F),Y===i.HALF_FLOAT&&(ie=i.RGBA16F),Y===i.UNSIGNED_BYTE&&(ie=Fe===at?i.SRGB8_ALPHA8:i.RGBA8),Y===i.UNSIGNED_SHORT_4_4_4_4&&(ie=i.RGBA4),Y===i.UNSIGNED_SHORT_5_5_5_1&&(ie=i.RGB5_A1)}return(ie===i.R16F||ie===i.R32F||ie===i.RG16F||ie===i.RG32F||ie===i.RGBA16F||ie===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function y(I,T){let Y;return I?T===null||T===Kn||T===os?Y=i.DEPTH24_STENCIL8:T===Kt?Y=i.DEPTH32F_STENCIL8:T===Us&&(Y=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Kn||T===os?Y=i.DEPTH_COMPONENT24:T===Kt?Y=i.DEPTH_COMPONENT32F:T===Us&&(Y=i.DEPTH_COMPONENT16),Y}function C(I,T){return g(I)===!0||I.isFramebufferTexture&&I.minFilter!==Bt&&I.minFilter!==mt?Math.log2(Math.max(T.width,T.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?T.mipmaps.length:1}function A(I){const T=I.target;T.removeEventListener("dispose",A),U(T),T.isVideoTexture&&u.delete(T)}function R(I){const T=I.target;T.removeEventListener("dispose",R),b(T)}function U(I){const T=n.get(I);if(T.__webglInit===void 0)return;const Y=I.source,ne=p.get(Y);if(ne){const le=ne[T.__cacheKey];le.usedTimes--,le.usedTimes===0&&E(I),Object.keys(ne).length===0&&p.delete(Y)}n.remove(I)}function E(I){const T=n.get(I);i.deleteTexture(T.__webglTexture);const Y=I.source,ne=p.get(Y);delete ne[T.__cacheKey],a.memory.textures--}function b(I){const T=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(T.__webglFramebuffer[ne]))for(let le=0;le<T.__webglFramebuffer[ne].length;le++)i.deleteFramebuffer(T.__webglFramebuffer[ne][le]);else i.deleteFramebuffer(T.__webglFramebuffer[ne]);T.__webglDepthbuffer&&i.deleteRenderbuffer(T.__webglDepthbuffer[ne])}else{if(Array.isArray(T.__webglFramebuffer))for(let ne=0;ne<T.__webglFramebuffer.length;ne++)i.deleteFramebuffer(T.__webglFramebuffer[ne]);else i.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&i.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&i.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let ne=0;ne<T.__webglColorRenderbuffer.length;ne++)T.__webglColorRenderbuffer[ne]&&i.deleteRenderbuffer(T.__webglColorRenderbuffer[ne]);T.__webglDepthRenderbuffer&&i.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const Y=I.textures;for(let ne=0,le=Y.length;ne<le;ne++){const ie=n.get(Y[ne]);ie.__webglTexture&&(i.deleteTexture(ie.__webglTexture),a.memory.textures--),n.remove(Y[ne])}n.remove(I)}let L=0;function F(){L=0}function O(){const I=L;return I>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+s.maxTextures),L+=1,I}function V(I){const T=[];return T.push(I.wrapS),T.push(I.wrapT),T.push(I.wrapR||0),T.push(I.magFilter),T.push(I.minFilter),T.push(I.anisotropy),T.push(I.internalFormat),T.push(I.format),T.push(I.type),T.push(I.generateMipmaps),T.push(I.premultiplyAlpha),T.push(I.flipY),T.push(I.unpackAlignment),T.push(I.colorSpace),T.join()}function $(I,T){const Y=n.get(I);if(I.isVideoTexture&&_e(I),I.isRenderTargetTexture===!1&&I.version>0&&Y.__version!==I.version){const ne=I.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(Y,I,T);return}}t.bindTexture(i.TEXTURE_2D,Y.__webglTexture,i.TEXTURE0+T)}function B(I,T){const Y=n.get(I);if(I.version>0&&Y.__version!==I.version){q(Y,I,T);return}t.bindTexture(i.TEXTURE_2D_ARRAY,Y.__webglTexture,i.TEXTURE0+T)}function X(I,T){const Y=n.get(I);if(I.version>0&&Y.__version!==I.version){q(Y,I,T);return}t.bindTexture(i.TEXTURE_3D,Y.__webglTexture,i.TEXTURE0+T)}function N(I,T){const Y=n.get(I);if(I.version>0&&Y.__version!==I.version){te(Y,I,T);return}t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture,i.TEXTURE0+T)}const j={[bi]:i.REPEAT,[_i]:i.CLAMP_TO_EDGE,[_o]:i.MIRRORED_REPEAT},Q={[Bt]:i.NEAREST,[ed]:i.NEAREST_MIPMAP_NEAREST,[qs]:i.NEAREST_MIPMAP_LINEAR,[mt]:i.LINEAR,[ca]:i.LINEAR_MIPMAP_NEAREST,[In]:i.LINEAR_MIPMAP_LINEAR},se={[sd]:i.NEVER,[hd]:i.ALWAYS,[rd]:i.LESS,[wh]:i.LEQUAL,[ad]:i.EQUAL,[cd]:i.GEQUAL,[od]:i.GREATER,[ld]:i.NOTEQUAL};function ue(I,T){if(T.type===Kt&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===mt||T.magFilter===ca||T.magFilter===qs||T.magFilter===In||T.minFilter===mt||T.minFilter===ca||T.minFilter===qs||T.minFilter===In)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,j[T.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,j[T.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,j[T.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,Q[T.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,Q[T.minFilter]),T.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,se[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Bt||T.minFilter!==qs&&T.minFilter!==In||T.type===Kt&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){const Y=e.get("EXT_texture_filter_anisotropic");i.texParameterf(I,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,s.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function Ae(I,T){let Y=!1;I.__webglInit===void 0&&(I.__webglInit=!0,T.addEventListener("dispose",A));const ne=T.source;let le=p.get(ne);le===void 0&&(le={},p.set(ne,le));const ie=V(T);if(ie!==I.__cacheKey){le[ie]===void 0&&(le[ie]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,Y=!0),le[ie].usedTimes++;const Fe=le[I.__cacheKey];Fe!==void 0&&(le[I.__cacheKey].usedTimes--,Fe.usedTimes===0&&E(T)),I.__cacheKey=ie,I.__webglTexture=le[ie].texture}return Y}function q(I,T,Y){let ne=i.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(ne=i.TEXTURE_2D_ARRAY),T.isData3DTexture&&(ne=i.TEXTURE_3D);const le=Ae(I,T),ie=T.source;t.bindTexture(ne,I.__webglTexture,i.TEXTURE0+Y);const Fe=n.get(ie);if(ie.version!==Fe.__version||le===!0){t.activeTexture(i.TEXTURE0+Y);const ve=et.getPrimaries(et.workingColorSpace),we=T.colorSpace===Xn?null:et.getPrimaries(T.colorSpace),je=T.colorSpace===Xn||ve===we?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,je);let me=v(T.image,!1,s.maxTextureSize);me=ze(T,me);const Re=r.convert(T.format,T.colorSpace),ke=r.convert(T.type);let He=M(T.internalFormat,Re,ke,T.colorSpace,T.isVideoTexture);ue(ne,T);let Le;const Je=T.mipmaps,$e=T.isVideoTexture!==!0,lt=Fe.__version===void 0||le===!0,z=ie.dataReady,ye=C(T,me);if(T.isDepthTexture)He=y(T.format===ls,T.type),lt&&($e?t.texStorage2D(i.TEXTURE_2D,1,He,me.width,me.height):t.texImage2D(i.TEXTURE_2D,0,He,me.width,me.height,0,Re,ke,null));else if(T.isDataTexture)if(Je.length>0){$e&&lt&&t.texStorage2D(i.TEXTURE_2D,ye,He,Je[0].width,Je[0].height);for(let J=0,oe=Je.length;J<oe;J++)Le=Je[J],$e?z&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,Le.width,Le.height,Re,ke,Le.data):t.texImage2D(i.TEXTURE_2D,J,He,Le.width,Le.height,0,Re,ke,Le.data);T.generateMipmaps=!1}else $e?(lt&&t.texStorage2D(i.TEXTURE_2D,ye,He,me.width,me.height),z&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,me.width,me.height,Re,ke,me.data)):t.texImage2D(i.TEXTURE_2D,0,He,me.width,me.height,0,Re,ke,me.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){$e&&lt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,He,Je[0].width,Je[0].height,me.depth);for(let J=0,oe=Je.length;J<oe;J++)if(Le=Je[J],T.format!==bt)if(Re!==null)if($e){if(z)if(T.layerUpdates.size>0){const Te=bc(Le.width,Le.height,T.format,T.type);for(const Ee of T.layerUpdates){const qe=Le.data.subarray(Ee*Te/Le.data.BYTES_PER_ELEMENT,(Ee+1)*Te/Le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,Ee,Le.width,Le.height,1,Re,qe)}T.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,Le.width,Le.height,me.depth,Re,Le.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,He,Le.width,Le.height,me.depth,0,Le.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else $e?z&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,Le.width,Le.height,me.depth,Re,ke,Le.data):t.texImage3D(i.TEXTURE_2D_ARRAY,J,He,Le.width,Le.height,me.depth,0,Re,ke,Le.data)}else{$e&&lt&&t.texStorage2D(i.TEXTURE_2D,ye,He,Je[0].width,Je[0].height);for(let J=0,oe=Je.length;J<oe;J++)Le=Je[J],T.format!==bt?Re!==null?$e?z&&t.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,Le.width,Le.height,Re,Le.data):t.compressedTexImage2D(i.TEXTURE_2D,J,He,Le.width,Le.height,0,Le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$e?z&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,Le.width,Le.height,Re,ke,Le.data):t.texImage2D(i.TEXTURE_2D,J,He,Le.width,Le.height,0,Re,ke,Le.data)}else if(T.isDataArrayTexture)if($e){if(lt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,He,me.width,me.height,me.depth),z)if(T.layerUpdates.size>0){const J=bc(me.width,me.height,T.format,T.type);for(const oe of T.layerUpdates){const Te=me.data.subarray(oe*J/me.data.BYTES_PER_ELEMENT,(oe+1)*J/me.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,oe,me.width,me.height,1,Re,ke,Te)}T.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,me.width,me.height,me.depth,Re,ke,me.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,He,me.width,me.height,me.depth,0,Re,ke,me.data);else if(T.isData3DTexture)$e?(lt&&t.texStorage3D(i.TEXTURE_3D,ye,He,me.width,me.height,me.depth),z&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,me.width,me.height,me.depth,Re,ke,me.data)):t.texImage3D(i.TEXTURE_3D,0,He,me.width,me.height,me.depth,0,Re,ke,me.data);else if(T.isFramebufferTexture){if(lt)if($e)t.texStorage2D(i.TEXTURE_2D,ye,He,me.width,me.height);else{let J=me.width,oe=me.height;for(let Te=0;Te<ye;Te++)t.texImage2D(i.TEXTURE_2D,Te,He,J,oe,0,Re,ke,null),J>>=1,oe>>=1}}else if(Je.length>0){if($e&&lt){const J=Se(Je[0]);t.texStorage2D(i.TEXTURE_2D,ye,He,J.width,J.height)}for(let J=0,oe=Je.length;J<oe;J++)Le=Je[J],$e?z&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,Re,ke,Le):t.texImage2D(i.TEXTURE_2D,J,He,Re,ke,Le);T.generateMipmaps=!1}else if($e){if(lt){const J=Se(me);t.texStorage2D(i.TEXTURE_2D,ye,He,J.width,J.height)}z&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Re,ke,me)}else t.texImage2D(i.TEXTURE_2D,0,He,Re,ke,me);g(T)&&m(ne),Fe.__version=ie.version,T.onUpdate&&T.onUpdate(T)}I.__version=T.version}function te(I,T,Y){if(T.image.length!==6)return;const ne=Ae(I,T),le=T.source;t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+Y);const ie=n.get(le);if(le.version!==ie.__version||ne===!0){t.activeTexture(i.TEXTURE0+Y);const Fe=et.getPrimaries(et.workingColorSpace),ve=T.colorSpace===Xn?null:et.getPrimaries(T.colorSpace),we=T.colorSpace===Xn||Fe===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);const je=T.isCompressedTexture||T.image[0].isCompressedTexture,me=T.image[0]&&T.image[0].isDataTexture,Re=[];for(let oe=0;oe<6;oe++)!je&&!me?Re[oe]=v(T.image[oe],!0,s.maxCubemapSize):Re[oe]=me?T.image[oe].image:T.image[oe],Re[oe]=ze(T,Re[oe]);const ke=Re[0],He=r.convert(T.format,T.colorSpace),Le=r.convert(T.type),Je=M(T.internalFormat,He,Le,T.colorSpace),$e=T.isVideoTexture!==!0,lt=ie.__version===void 0||ne===!0,z=le.dataReady;let ye=C(T,ke);ue(i.TEXTURE_CUBE_MAP,T);let J;if(je){$e&&lt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ye,Je,ke.width,ke.height);for(let oe=0;oe<6;oe++){J=Re[oe].mipmaps;for(let Te=0;Te<J.length;Te++){const Ee=J[Te];T.format!==bt?He!==null?$e?z&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Te,0,0,Ee.width,Ee.height,He,Ee.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Te,Je,Ee.width,Ee.height,0,Ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$e?z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Te,0,0,Ee.width,Ee.height,He,Le,Ee.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Te,Je,Ee.width,Ee.height,0,He,Le,Ee.data)}}}else{if(J=T.mipmaps,$e&&lt){J.length>0&&ye++;const oe=Se(Re[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ye,Je,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(me){$e?z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Re[oe].width,Re[oe].height,He,Le,Re[oe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Je,Re[oe].width,Re[oe].height,0,He,Le,Re[oe].data);for(let Te=0;Te<J.length;Te++){const qe=J[Te].image[oe].image;$e?z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Te+1,0,0,qe.width,qe.height,He,Le,qe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Te+1,Je,qe.width,qe.height,0,He,Le,qe.data)}}else{$e?z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,He,Le,Re[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Je,He,Le,Re[oe]);for(let Te=0;Te<J.length;Te++){const Ee=J[Te];$e?z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Te+1,0,0,He,Le,Ee.image[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Te+1,Je,He,Le,Ee.image[oe])}}}g(T)&&m(i.TEXTURE_CUBE_MAP),ie.__version=le.version,T.onUpdate&&T.onUpdate(T)}I.__version=T.version}function de(I,T,Y,ne,le,ie){const Fe=r.convert(Y.format,Y.colorSpace),ve=r.convert(Y.type),we=M(Y.internalFormat,Fe,ve,Y.colorSpace),je=n.get(T),me=n.get(Y);if(me.__renderTarget=T,!je.__hasExternalTextures){const Re=Math.max(1,T.width>>ie),ke=Math.max(1,T.height>>ie);le===i.TEXTURE_3D||le===i.TEXTURE_2D_ARRAY?t.texImage3D(le,ie,we,Re,ke,T.depth,0,Fe,ve,null):t.texImage2D(le,ie,we,Re,ke,0,Fe,ve,null)}t.bindFramebuffer(i.FRAMEBUFFER,I),Pe(T)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,le,me.__webglTexture,0,fe(T)):(le===i.TEXTURE_2D||le>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&le<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ne,le,me.__webglTexture,ie),t.bindFramebuffer(i.FRAMEBUFFER,null)}function re(I,T,Y){if(i.bindRenderbuffer(i.RENDERBUFFER,I),T.depthBuffer){const ne=T.depthTexture,le=ne&&ne.isDepthTexture?ne.type:null,ie=y(T.stencilBuffer,le),Fe=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=fe(T);Pe(T)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ve,ie,T.width,T.height):Y?i.renderbufferStorageMultisample(i.RENDERBUFFER,ve,ie,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,ie,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Fe,i.RENDERBUFFER,I)}else{const ne=T.textures;for(let le=0;le<ne.length;le++){const ie=ne[le],Fe=r.convert(ie.format,ie.colorSpace),ve=r.convert(ie.type),we=M(ie.internalFormat,Fe,ve,ie.colorSpace),je=fe(T);Y&&Pe(T)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,je,we,T.width,T.height):Pe(T)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,je,we,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,we,T.width,T.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function be(I,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,I),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ne=n.get(T.depthTexture);ne.__renderTarget=T,(!ne.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),$(T.depthTexture,0);const le=ne.__webglTexture,ie=fe(T);if(T.depthTexture.format===Qi)Pe(T)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,le,0,ie):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,le,0);else if(T.depthTexture.format===ls)Pe(T)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,le,0,ie):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,le,0);else throw new Error("Unknown depthTexture format")}function De(I){const T=n.get(I),Y=I.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==I.depthTexture){const ne=I.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),ne){const le=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,ne.removeEventListener("dispose",le)};ne.addEventListener("dispose",le),T.__depthDisposeCallback=le}T.__boundDepthTexture=ne}if(I.depthTexture&&!T.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");be(T.__webglFramebuffer,I)}else if(Y){T.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)if(t.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer[ne]),T.__webglDepthbuffer[ne]===void 0)T.__webglDepthbuffer[ne]=i.createRenderbuffer(),re(T.__webglDepthbuffer[ne],I,!1);else{const le=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ie=T.__webglDepthbuffer[ne];i.bindRenderbuffer(i.RENDERBUFFER,ie),i.framebufferRenderbuffer(i.FRAMEBUFFER,le,i.RENDERBUFFER,ie)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=i.createRenderbuffer(),re(T.__webglDepthbuffer,I,!1);else{const ne=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=T.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,le),i.framebufferRenderbuffer(i.FRAMEBUFFER,ne,i.RENDERBUFFER,le)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ge(I,T,Y){const ne=n.get(I);T!==void 0&&de(ne.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),Y!==void 0&&De(I)}function Be(I){const T=I.texture,Y=n.get(I),ne=n.get(T);I.addEventListener("dispose",R);const le=I.textures,ie=I.isWebGLCubeRenderTarget===!0,Fe=le.length>1;if(Fe||(ne.__webglTexture===void 0&&(ne.__webglTexture=i.createTexture()),ne.__version=T.version,a.memory.textures++),ie){Y.__webglFramebuffer=[];for(let ve=0;ve<6;ve++)if(T.mipmaps&&T.mipmaps.length>0){Y.__webglFramebuffer[ve]=[];for(let we=0;we<T.mipmaps.length;we++)Y.__webglFramebuffer[ve][we]=i.createFramebuffer()}else Y.__webglFramebuffer[ve]=i.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){Y.__webglFramebuffer=[];for(let ve=0;ve<T.mipmaps.length;ve++)Y.__webglFramebuffer[ve]=i.createFramebuffer()}else Y.__webglFramebuffer=i.createFramebuffer();if(Fe)for(let ve=0,we=le.length;ve<we;ve++){const je=n.get(le[ve]);je.__webglTexture===void 0&&(je.__webglTexture=i.createTexture(),a.memory.textures++)}if(I.samples>0&&Pe(I)===!1){Y.__webglMultisampledFramebuffer=i.createFramebuffer(),Y.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let ve=0;ve<le.length;ve++){const we=le[ve];Y.__webglColorRenderbuffer[ve]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,Y.__webglColorRenderbuffer[ve]);const je=r.convert(we.format,we.colorSpace),me=r.convert(we.type),Re=M(we.internalFormat,je,me,we.colorSpace,I.isXRRenderTarget===!0),ke=fe(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,ke,Re,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.RENDERBUFFER,Y.__webglColorRenderbuffer[ve])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(Y.__webglDepthRenderbuffer=i.createRenderbuffer(),re(Y.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ie){t.bindTexture(i.TEXTURE_CUBE_MAP,ne.__webglTexture),ue(i.TEXTURE_CUBE_MAP,T);for(let ve=0;ve<6;ve++)if(T.mipmaps&&T.mipmaps.length>0)for(let we=0;we<T.mipmaps.length;we++)de(Y.__webglFramebuffer[ve][we],I,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,we);else de(Y.__webglFramebuffer[ve],I,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0);g(T)&&m(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Fe){for(let ve=0,we=le.length;ve<we;ve++){const je=le[ve],me=n.get(je);t.bindTexture(i.TEXTURE_2D,me.__webglTexture),ue(i.TEXTURE_2D,je),de(Y.__webglFramebuffer,I,je,i.COLOR_ATTACHMENT0+ve,i.TEXTURE_2D,0),g(je)&&m(i.TEXTURE_2D)}t.unbindTexture()}else{let ve=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ve=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ve,ne.__webglTexture),ue(ve,T),T.mipmaps&&T.mipmaps.length>0)for(let we=0;we<T.mipmaps.length;we++)de(Y.__webglFramebuffer[we],I,T,i.COLOR_ATTACHMENT0,ve,we);else de(Y.__webglFramebuffer,I,T,i.COLOR_ATTACHMENT0,ve,0);g(T)&&m(ve),t.unbindTexture()}I.depthBuffer&&De(I)}function ae(I){const T=I.textures;for(let Y=0,ne=T.length;Y<ne;Y++){const le=T[Y];if(g(le)){const ie=S(I),Fe=n.get(le).__webglTexture;t.bindTexture(ie,Fe),m(ie),t.unbindTexture()}}}const ee=[],D=[];function Ue(I){if(I.samples>0){if(Pe(I)===!1){const T=I.textures,Y=I.width,ne=I.height;let le=i.COLOR_BUFFER_BIT;const ie=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Fe=n.get(I),ve=T.length>1;if(ve)for(let we=0;we<T.length;we++)t.bindFramebuffer(i.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Fe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Fe.__webglFramebuffer);for(let we=0;we<T.length;we++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(le|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(le|=i.STENCIL_BUFFER_BIT)),ve){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Fe.__webglColorRenderbuffer[we]);const je=n.get(T[we]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,je,0)}i.blitFramebuffer(0,0,Y,ne,0,0,Y,ne,le,i.NEAREST),l===!0&&(ee.length=0,D.length=0,ee.push(i.COLOR_ATTACHMENT0+we),I.depthBuffer&&I.resolveDepthBuffer===!1&&(ee.push(ie),D.push(ie),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,D)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ee))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ve)for(let we=0;we<T.length;we++){t.bindFramebuffer(i.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.RENDERBUFFER,Fe.__webglColorRenderbuffer[we]);const je=n.get(T[we]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Fe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.TEXTURE_2D,je,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){const T=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[T])}}}function fe(I){return Math.min(s.maxSamples,I.samples)}function Pe(I){const T=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function _e(I){const T=a.render.frame;u.get(I)!==T&&(u.set(I,T),I.update())}function ze(I,T){const Y=I.colorSpace,ne=I.format,le=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||Y!==cs&&Y!==Xn&&(et.getTransfer(Y)===at?(ne!==bt||le!==Fn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Y)),T}function Se(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=F,this.setTexture2D=$,this.setTexture2DArray=B,this.setTexture3D=X,this.setTextureCube=N,this.rebindTextures=ge,this.setupRenderTarget=Be,this.updateRenderTargetMipmap=ae,this.updateMultisampleRenderTarget=Ue,this.setupDepthRenderbuffer=De,this.setupFrameBufferTexture=de,this.useMultisampledRTT=Pe}function L0(i,e){function t(n,s=Xn){let r;const a=et.getTransfer(s);if(n===Fn)return i.UNSIGNED_BYTE;if(n===el)return i.UNSIGNED_SHORT_4_4_4_4;if(n===tl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===yh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===xh)return i.BYTE;if(n===vh)return i.SHORT;if(n===Us)return i.UNSIGNED_SHORT;if(n===Qo)return i.INT;if(n===Kn)return i.UNSIGNED_INT;if(n===Kt)return i.FLOAT;if(n===zs)return i.HALF_FLOAT;if(n===Mh)return i.ALPHA;if(n===bh)return i.RGB;if(n===bt)return i.RGBA;if(n===Sh)return i.LUMINANCE;if(n===Eh)return i.LUMINANCE_ALPHA;if(n===Qi)return i.DEPTH_COMPONENT;if(n===ls)return i.DEPTH_STENCIL;if(n===nl)return i.RED;if(n===jr)return i.RED_INTEGER;if(n===Th)return i.RG;if(n===il)return i.RG_INTEGER;if(n===sl)return i.RGBA_INTEGER;if(n===Fr||n===Nr||n===Or||n===Br)if(a===at)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Fr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Nr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Fr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Nr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Or)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Br)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===xo||n===vo||n===yo||n===Mo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===xo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===vo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===yo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Mo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===bo||n===So||n===Eo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===bo||n===So)return a===at?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Eo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===To||n===Ao||n===wo||n===Po||n===Co||n===Ro||n===Lo||n===Io||n===Do||n===Uo||n===Fo||n===No||n===Oo||n===Bo)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===To)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ao)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===wo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Po)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Co)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ro)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Lo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Io)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Do)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Uo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Fo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===No)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Oo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Bo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Vr||n===Vo||n===zo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Vr)return a===at?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Vo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===zo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ah||n===ko||n===Ho||n===Go)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Vr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ko)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ho)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Go)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===os?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const I0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,D0=`
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

}`;class U0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new Rt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new jn({vertexShader:I0,fragmentShader:D0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ct(new Gs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class F0 extends Ai{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,p=null,f=null,_=null;const v=new U0,g=t.getContextAttributes();let m=null,S=null;const M=[],y=[],C=new he;let A=null;const R=new nn;R.viewport=new gt;const U=new nn;U.viewport=new gt;const E=[R,U],b=new Qf;let L=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let te=M[q];return te===void 0&&(te=new Ca,M[q]=te),te.getTargetRaySpace()},this.getControllerGrip=function(q){let te=M[q];return te===void 0&&(te=new Ca,M[q]=te),te.getGripSpace()},this.getHand=function(q){let te=M[q];return te===void 0&&(te=new Ca,M[q]=te),te.getHandSpace()};function O(q){const te=y.indexOf(q.inputSource);if(te===-1)return;const de=M[te];de!==void 0&&(de.update(q.inputSource,q.frame,c||a),de.dispatchEvent({type:q.type,data:q.inputSource}))}function V(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",$);for(let q=0;q<M.length;q++){const te=y[q];te!==null&&(y[q]=null,M[q].disconnect(te))}L=null,F=null,v.reset(),e.setRenderTarget(m),f=null,p=null,d=null,s=null,S=null,Ae.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return p!==null?p:f},this.getBinding=function(){return d},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",V),s.addEventListener("inputsourceschange",$),g.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(C),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let de=null,re=null,be=null;g.depth&&(be=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=g.stencil?ls:Qi,re=g.stencil?os:Kn);const De={colorFormat:t.RGBA8,depthFormat:be,scaleFactor:r};d=new XRWebGLBinding(s,t),p=d.createProjectionLayer(De),s.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),S=new Si(p.textureWidth,p.textureHeight,{format:bt,type:Fn,depthTexture:new Oh(p.textureWidth,p.textureHeight,re,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{const de={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,de),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new Si(f.framebufferWidth,f.framebufferHeight,{format:bt,type:Fn,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Ae.setContext(s),Ae.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function $(q){for(let te=0;te<q.removed.length;te++){const de=q.removed[te],re=y.indexOf(de);re>=0&&(y[re]=null,M[re].disconnect(de))}for(let te=0;te<q.added.length;te++){const de=q.added[te];let re=y.indexOf(de);if(re===-1){for(let De=0;De<M.length;De++)if(De>=y.length){y.push(de),re=De;break}else if(y[De]===null){y[De]=de,re=De;break}if(re===-1)break}const be=M[re];be&&be.connect(de)}}const B=new w,X=new w;function N(q,te,de){B.setFromMatrixPosition(te.matrixWorld),X.setFromMatrixPosition(de.matrixWorld);const re=B.distanceTo(X),be=te.projectionMatrix.elements,De=de.projectionMatrix.elements,ge=be[14]/(be[10]-1),Be=be[14]/(be[10]+1),ae=(be[9]+1)/be[5],ee=(be[9]-1)/be[5],D=(be[8]-1)/be[0],Ue=(De[8]+1)/De[0],fe=ge*D,Pe=ge*Ue,_e=re/(-D+Ue),ze=_e*-D;if(te.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(ze),q.translateZ(_e),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),be[10]===-1)q.projectionMatrix.copy(te.projectionMatrix),q.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{const Se=ge+_e,I=Be+_e,T=fe-ze,Y=Pe+(re-ze),ne=ae*Be/I*Se,le=ee*Be/I*Se;q.projectionMatrix.makePerspective(T,Y,ne,le,Se,I),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function j(q,te){te===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(te.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let te=q.near,de=q.far;v.texture!==null&&(v.depthNear>0&&(te=v.depthNear),v.depthFar>0&&(de=v.depthFar)),b.near=U.near=R.near=te,b.far=U.far=R.far=de,(L!==b.near||F!==b.far)&&(s.updateRenderState({depthNear:b.near,depthFar:b.far}),L=b.near,F=b.far),R.layers.mask=q.layers.mask|2,U.layers.mask=q.layers.mask|4,b.layers.mask=R.layers.mask|U.layers.mask;const re=q.parent,be=b.cameras;j(b,re);for(let De=0;De<be.length;De++)j(be[De],re);be.length===2?N(b,R,U):b.projectionMatrix.copy(R.projectionMatrix),Q(q,b,re)};function Q(q,te,de){de===null?q.matrix.copy(te.matrixWorld):(q.matrix.copy(de.matrixWorld),q.matrix.invert(),q.matrix.multiply(te.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(te.projectionMatrix),q.projectionMatrixInverse.copy(te.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Fs*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(p===null&&f===null))return l},this.setFoveation=function(q){l=q,p!==null&&(p.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(b)};let se=null;function ue(q,te){if(u=te.getViewerPose(c||a),_=te,u!==null){const de=u.views;f!==null&&(e.setRenderTargetFramebuffer(S,f.framebuffer),e.setRenderTarget(S));let re=!1;de.length!==b.cameras.length&&(b.cameras.length=0,re=!0);for(let ge=0;ge<de.length;ge++){const Be=de[ge];let ae=null;if(f!==null)ae=f.getViewport(Be);else{const D=d.getViewSubImage(p,Be);ae=D.viewport,ge===0&&(e.setRenderTargetTextures(S,D.colorTexture,p.ignoreDepthValues?void 0:D.depthStencilTexture),e.setRenderTarget(S))}let ee=E[ge];ee===void 0&&(ee=new nn,ee.layers.enable(ge),ee.viewport=new gt,E[ge]=ee),ee.matrix.fromArray(Be.transform.matrix),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.projectionMatrix.fromArray(Be.projectionMatrix),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert(),ee.viewport.set(ae.x,ae.y,ae.width,ae.height),ge===0&&(b.matrix.copy(ee.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),re===!0&&b.cameras.push(ee)}const be=s.enabledFeatures;if(be&&be.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&d){const ge=d.getDepthInformation(de[0]);ge&&ge.isValid&&ge.texture&&v.init(e,ge,s.renderState)}}for(let de=0;de<M.length;de++){const re=y[de],be=M[de];re!==null&&be!==void 0&&be.update(re,te,c||a)}se&&se(q,te),te.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:te}),_=null}const Ae=new su;Ae.setAnimationLoop(ue),this.setAnimationLoop=function(q){se=q},this.dispose=function(){}}}const oi=new rn,N0=new st;function O0(i,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Dh(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,S,M,y){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(g,m):m.isMeshToonMaterial?(r(g,m),d(g,m)):m.isMeshPhongMaterial?(r(g,m),u(g,m)):m.isMeshStandardMaterial?(r(g,m),p(g,m),m.isMeshPhysicalMaterial&&f(g,m,y)):m.isMeshMatcapMaterial?(r(g,m),_(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),v(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,S,M):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Gt&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Gt&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const S=e.get(m),M=S.envMap,y=S.envMapRotation;M&&(g.envMap.value=M,oi.copy(y),oi.x*=-1,oi.y*=-1,oi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(oi.y*=-1,oi.z*=-1),g.envMapRotation.value.setFromMatrix4(N0.makeRotationFromEuler(oi)),g.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,S,M){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*S,g.scale.value=M*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function p(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,S){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Gt&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=S.texture,g.transmissionSamplerSize.value.set(S.width,S.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function _(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){const S=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(S.matrixWorld),g.nearDistance.value=S.shadow.camera.near,g.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function B0(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,M){const y=M.program;n.uniformBlockBinding(S,y)}function c(S,M){let y=s[S.id];y===void 0&&(_(S),y=u(S),s[S.id]=y,S.addEventListener("dispose",g));const C=M.program;n.updateUBOMapping(S,C);const A=e.render.frame;r[S.id]!==A&&(p(S),r[S.id]=A)}function u(S){const M=d();S.__bindingPointIndex=M;const y=i.createBuffer(),C=S.__size,A=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,C,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,y),y}function d(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(S){const M=s[S.id],y=S.uniforms,C=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let A=0,R=y.length;A<R;A++){const U=Array.isArray(y[A])?y[A]:[y[A]];for(let E=0,b=U.length;E<b;E++){const L=U[E];if(f(L,A,E,C)===!0){const F=L.__offset,O=Array.isArray(L.value)?L.value:[L.value];let V=0;for(let $=0;$<O.length;$++){const B=O[$],X=v(B);typeof B=="number"||typeof B=="boolean"?(L.__data[0]=B,i.bufferSubData(i.UNIFORM_BUFFER,F+V,L.__data)):B.isMatrix3?(L.__data[0]=B.elements[0],L.__data[1]=B.elements[1],L.__data[2]=B.elements[2],L.__data[3]=0,L.__data[4]=B.elements[3],L.__data[5]=B.elements[4],L.__data[6]=B.elements[5],L.__data[7]=0,L.__data[8]=B.elements[6],L.__data[9]=B.elements[7],L.__data[10]=B.elements[8],L.__data[11]=0):(B.toArray(L.__data,V),V+=X.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(S,M,y,C){const A=S.value,R=M+"_"+y;if(C[R]===void 0)return typeof A=="number"||typeof A=="boolean"?C[R]=A:C[R]=A.clone(),!0;{const U=C[R];if(typeof A=="number"||typeof A=="boolean"){if(U!==A)return C[R]=A,!0}else if(U.equals(A)===!1)return U.copy(A),!0}return!1}function _(S){const M=S.uniforms;let y=0;const C=16;for(let R=0,U=M.length;R<U;R++){const E=Array.isArray(M[R])?M[R]:[M[R]];for(let b=0,L=E.length;b<L;b++){const F=E[b],O=Array.isArray(F.value)?F.value:[F.value];for(let V=0,$=O.length;V<$;V++){const B=O[V],X=v(B),N=y%C,j=N%X.boundary,Q=N+j;y+=j,Q!==0&&C-Q<X.storage&&(y+=C-Q),F.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=y,y+=X.storage}}}const A=y%C;return A>0&&(y+=C-A),S.__size=y,S.__cache={},this}function v(S){const M={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(M.boundary=4,M.storage=4):S.isVector2?(M.boundary=8,M.storage=8):S.isVector3||S.isColor?(M.boundary=16,M.storage=12):S.isVector4?(M.boundary=16,M.storage=16):S.isMatrix3?(M.boundary=48,M.storage=48):S.isMatrix4?(M.boundary=64,M.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),M}function g(S){const M=S.target;M.removeEventListener("dispose",g);const y=a.indexOf(M.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function m(){for(const S in s)i.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:l,update:c,dispose:m}}class V0{constructor(e={}){const{canvas:t=wd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:p=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const _=new Uint32Array(4),v=new Int32Array(4);let g=null,m=null;const S=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Mt,this.toneMapping=$n,this.toneMappingExposure=1;const y=this;let C=!1,A=0,R=0,U=null,E=-1,b=null;const L=new gt,F=new gt;let O=null;const V=new Ve(0);let $=0,B=t.width,X=t.height,N=1,j=null,Q=null;const se=new gt(0,0,B,X),ue=new gt(0,0,B,X);let Ae=!1;const q=new Qr;let te=!1,de=!1;this.transmissionResolutionScale=1;const re=new st,be=new st,De=new w,ge=new gt,Be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ae=!1;function ee(){return U===null?N:1}let D=n;function Ue(P,k){return t.getContext(P,k)}try{const P={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Jo}`),t.addEventListener("webglcontextlost",oe,!1),t.addEventListener("webglcontextrestored",Te,!1),t.addEventListener("webglcontextcreationerror",Ee,!1),D===null){const k="webgl2";if(D=Ue(k,P),D===null)throw Ue(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(P){throw console.error("THREE.WebGLRenderer: "+P.message),P}let fe,Pe,_e,ze,Se,I,T,Y,ne,le,ie,Fe,ve,we,je,me,Re,ke,He,Le,Je,$e,lt,z;function ye(){fe=new Kg(D),fe.init(),$e=new L0(D,fe),Pe=new Hg(D,fe,e,$e),_e=new C0(D,fe),Pe.reverseDepthBuffer&&p&&_e.buffers.depth.setReversed(!0),ze=new Jg(D),Se=new g0,I=new R0(D,fe,_e,Se,Pe,$e,ze),T=new Wg(y),Y=new $g(y),ne=new sp(D),lt=new zg(D,ne),le=new Zg(D,ne,ze,lt),ie=new e_(D,le,ne,ze),He=new Qg(D,Pe,I),me=new Gg(Se),Fe=new m0(y,T,Y,fe,Pe,lt,me),ve=new O0(y,Se),we=new x0,je=new E0(fe),ke=new Vg(y,T,Y,_e,ie,f,l),Re=new w0(y,ie,Pe),z=new B0(D,ze,Pe,_e),Le=new kg(D,fe,ze),Je=new jg(D,fe,ze),ze.programs=Fe.programs,y.capabilities=Pe,y.extensions=fe,y.properties=Se,y.renderLists=we,y.shadowMap=Re,y.state=_e,y.info=ze}ye();const J=new F0(y,D);this.xr=J,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const P=fe.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){const P=fe.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return N},this.setPixelRatio=function(P){P!==void 0&&(N=P,this.setSize(B,X,!1))},this.getSize=function(P){return P.set(B,X)},this.setSize=function(P,k,K=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=P,X=k,t.width=Math.floor(P*N),t.height=Math.floor(k*N),K===!0&&(t.style.width=P+"px",t.style.height=k+"px"),this.setViewport(0,0,P,k)},this.getDrawingBufferSize=function(P){return P.set(B*N,X*N).floor()},this.setDrawingBufferSize=function(P,k,K){B=P,X=k,N=K,t.width=Math.floor(P*K),t.height=Math.floor(k*K),this.setViewport(0,0,P,k)},this.getCurrentViewport=function(P){return P.copy(L)},this.getViewport=function(P){return P.copy(se)},this.setViewport=function(P,k,K,Z){P.isVector4?se.set(P.x,P.y,P.z,P.w):se.set(P,k,K,Z),_e.viewport(L.copy(se).multiplyScalar(N).round())},this.getScissor=function(P){return P.copy(ue)},this.setScissor=function(P,k,K,Z){P.isVector4?ue.set(P.x,P.y,P.z,P.w):ue.set(P,k,K,Z),_e.scissor(F.copy(ue).multiplyScalar(N).round())},this.getScissorTest=function(){return Ae},this.setScissorTest=function(P){_e.setScissorTest(Ae=P)},this.setOpaqueSort=function(P){j=P},this.setTransparentSort=function(P){Q=P},this.getClearColor=function(P){return P.copy(ke.getClearColor())},this.setClearColor=function(){ke.setClearColor(...arguments)},this.getClearAlpha=function(){return ke.getClearAlpha()},this.setClearAlpha=function(){ke.setClearAlpha(...arguments)},this.clear=function(P=!0,k=!0,K=!0){let Z=0;if(P){let G=!1;if(U!==null){const pe=U.texture.format;G=pe===sl||pe===il||pe===jr}if(G){const pe=U.texture.type,Me=pe===Fn||pe===Kn||pe===Us||pe===os||pe===el||pe===tl,Ce=ke.getClearColor(),Ie=ke.getClearAlpha(),Ge=Ce.r,We=Ce.g,Ne=Ce.b;Me?(_[0]=Ge,_[1]=We,_[2]=Ne,_[3]=Ie,D.clearBufferuiv(D.COLOR,0,_)):(v[0]=Ge,v[1]=We,v[2]=Ne,v[3]=Ie,D.clearBufferiv(D.COLOR,0,v))}else Z|=D.COLOR_BUFFER_BIT}k&&(Z|=D.DEPTH_BUFFER_BIT),K&&(Z|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",Te,!1),t.removeEventListener("webglcontextcreationerror",Ee,!1),ke.dispose(),we.dispose(),je.dispose(),Se.dispose(),T.dispose(),Y.dispose(),ie.dispose(),lt.dispose(),z.dispose(),Fe.dispose(),J.dispose(),J.removeEventListener("sessionstart",gl),J.removeEventListener("sessionend",_l),Jn.stop()};function oe(P){P.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function Te(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const P=ze.autoReset,k=Re.enabled,K=Re.autoUpdate,Z=Re.needsUpdate,G=Re.type;ye(),ze.autoReset=P,Re.enabled=k,Re.autoUpdate=K,Re.needsUpdate=Z,Re.type=G}function Ee(P){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function qe(P){const k=P.target;k.removeEventListener("dispose",qe),ft(k)}function ft(P){Lt(P),Se.remove(P)}function Lt(P){const k=Se.get(P).programs;k!==void 0&&(k.forEach(function(K){Fe.releaseProgram(K)}),P.isShaderMaterial&&Fe.releaseShaderCache(P))}this.renderBufferDirect=function(P,k,K,Z,G,pe){k===null&&(k=Be);const Me=G.isMesh&&G.matrixWorld.determinant()<0,Ce=fu(P,k,K,Z,G);_e.setMaterial(Z,Me);let Ie=K.index,Ge=1;if(Z.wireframe===!0){if(Ie=le.getWireframeAttribute(K),Ie===void 0)return;Ge=2}const We=K.drawRange,Ne=K.attributes.position;let Qe=We.start*Ge,nt=(We.start+We.count)*Ge;pe!==null&&(Qe=Math.max(Qe,pe.start*Ge),nt=Math.min(nt,(pe.start+pe.count)*Ge)),Ie!==null?(Qe=Math.max(Qe,0),nt=Math.min(nt,Ie.count)):Ne!=null&&(Qe=Math.max(Qe,0),nt=Math.min(nt,Ne.count));const vt=nt-Qe;if(vt<0||vt===1/0)return;lt.setup(G,Z,Ce,K,Ie);let pt,tt=Le;if(Ie!==null&&(pt=ne.get(Ie),tt=Je,tt.setIndex(pt)),G.isMesh)Z.wireframe===!0?(_e.setLineWidth(Z.wireframeLinewidth*ee()),tt.setMode(D.LINES)):tt.setMode(D.TRIANGLES);else if(G.isLine){let Oe=Z.linewidth;Oe===void 0&&(Oe=1),_e.setLineWidth(Oe*ee()),G.isLineSegments?tt.setMode(D.LINES):G.isLineLoop?tt.setMode(D.LINE_LOOP):tt.setMode(D.LINE_STRIP)}else G.isPoints?tt.setMode(D.POINTS):G.isSprite&&tt.setMode(D.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)di("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),tt.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(fe.get("WEBGL_multi_draw"))tt.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Oe=G._multiDrawStarts,Pt=G._multiDrawCounts,it=G._multiDrawCount,ln=Ie?ne.get(Ie).bytesPerElement:1,Pi=Se.get(Z).currentProgram.getUniforms();for(let Wt=0;Wt<it;Wt++)Pi.setValue(D,"_gl_DrawID",Wt),tt.render(Oe[Wt]/ln,Pt[Wt])}else if(G.isInstancedMesh)tt.renderInstances(Qe,vt,G.count);else if(K.isInstancedBufferGeometry){const Oe=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Pt=Math.min(K.instanceCount,Oe);tt.renderInstances(Qe,vt,Pt)}else tt.render(Qe,vt)};function rt(P,k,K){P.transparent===!0&&P.side===Ht&&P.forceSinglePass===!1?(P.side=Gt,P.needsUpdate=!0,Xs(P,k,K),P.side=$t,P.needsUpdate=!0,Xs(P,k,K),P.side=Ht):Xs(P,k,K)}this.compile=function(P,k,K=null){K===null&&(K=P),m=je.get(K),m.init(k),M.push(m),K.traverseVisible(function(G){G.isLight&&G.layers.test(k.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),P!==K&&P.traverseVisible(function(G){G.isLight&&G.layers.test(k.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),m.setupLights();const Z=new Set;return P.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const pe=G.material;if(pe)if(Array.isArray(pe))for(let Me=0;Me<pe.length;Me++){const Ce=pe[Me];rt(Ce,K,G),Z.add(Ce)}else rt(pe,K,G),Z.add(pe)}),m=M.pop(),Z},this.compileAsync=function(P,k,K=null){const Z=this.compile(P,k,K);return new Promise(G=>{function pe(){if(Z.forEach(function(Me){Se.get(Me).currentProgram.isReady()&&Z.delete(Me)}),Z.size===0){G(P);return}setTimeout(pe,10)}fe.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let on=null;function bn(P){on&&on(P)}function gl(){Jn.stop()}function _l(){Jn.start()}const Jn=new su;Jn.setAnimationLoop(bn),typeof self<"u"&&Jn.setContext(self),this.setAnimationLoop=function(P){on=P,J.setAnimationLoop(P),P===null?Jn.stop():Jn.start()},J.addEventListener("sessionstart",gl),J.addEventListener("sessionend",_l),this.render=function(P,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(k),k=J.getCamera()),P.isScene===!0&&P.onBeforeRender(y,P,k,U),m=je.get(P,M.length),m.init(k),M.push(m),be.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),q.setFromProjectionMatrix(be),de=this.localClippingEnabled,te=me.init(this.clippingPlanes,de),g=we.get(P,S.length),g.init(),S.push(g),J.enabled===!0&&J.isPresenting===!0){const pe=y.xr.getDepthSensingMesh();pe!==null&&ra(pe,k,-1/0,y.sortObjects)}ra(P,k,0,y.sortObjects),g.finish(),y.sortObjects===!0&&g.sort(j,Q),ae=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,ae&&ke.addToRenderList(g,P),this.info.render.frame++,te===!0&&me.beginShadows();const K=m.state.shadowsArray;Re.render(K,P,k),te===!0&&me.endShadows(),this.info.autoReset===!0&&this.info.reset();const Z=g.opaque,G=g.transmissive;if(m.setupLights(),k.isArrayCamera){const pe=k.cameras;if(G.length>0)for(let Me=0,Ce=pe.length;Me<Ce;Me++){const Ie=pe[Me];vl(Z,G,P,Ie)}ae&&ke.render(P);for(let Me=0,Ce=pe.length;Me<Ce;Me++){const Ie=pe[Me];xl(g,P,Ie,Ie.viewport)}}else G.length>0&&vl(Z,G,P,k),ae&&ke.render(P),xl(g,P,k);U!==null&&R===0&&(I.updateMultisampleRenderTarget(U),I.updateRenderTargetMipmap(U)),P.isScene===!0&&P.onAfterRender(y,P,k),lt.resetDefaultState(),E=-1,b=null,M.pop(),M.length>0?(m=M[M.length-1],te===!0&&me.setGlobalState(y.clippingPlanes,m.state.camera)):m=null,S.pop(),S.length>0?g=S[S.length-1]:g=null};function ra(P,k,K,Z){if(P.visible===!1)return;if(P.layers.test(k.layers)){if(P.isGroup)K=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update(k);else if(P.isLight)m.pushLight(P),P.castShadow&&m.pushShadow(P);else if(P.isSprite){if(!P.frustumCulled||q.intersectsSprite(P)){Z&&ge.setFromMatrixPosition(P.matrixWorld).applyMatrix4(be);const Me=ie.update(P),Ce=P.material;Ce.visible&&g.push(P,Me,Ce,K,ge.z,null)}}else if((P.isMesh||P.isLine||P.isPoints)&&(!P.frustumCulled||q.intersectsObject(P))){const Me=ie.update(P),Ce=P.material;if(Z&&(P.boundingSphere!==void 0?(P.boundingSphere===null&&P.computeBoundingSphere(),ge.copy(P.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),ge.copy(Me.boundingSphere.center)),ge.applyMatrix4(P.matrixWorld).applyMatrix4(be)),Array.isArray(Ce)){const Ie=Me.groups;for(let Ge=0,We=Ie.length;Ge<We;Ge++){const Ne=Ie[Ge],Qe=Ce[Ne.materialIndex];Qe&&Qe.visible&&g.push(P,Me,Qe,K,ge.z,Ne)}}else Ce.visible&&g.push(P,Me,Ce,K,ge.z,null)}}const pe=P.children;for(let Me=0,Ce=pe.length;Me<Ce;Me++)ra(pe[Me],k,K,Z)}function xl(P,k,K,Z){const G=P.opaque,pe=P.transmissive,Me=P.transparent;m.setupLightsView(K),te===!0&&me.setGlobalState(y.clippingPlanes,K),Z&&_e.viewport(L.copy(Z)),G.length>0&&Ws(G,k,K),pe.length>0&&Ws(pe,k,K),Me.length>0&&Ws(Me,k,K),_e.buffers.depth.setTest(!0),_e.buffers.depth.setMask(!0),_e.buffers.color.setMask(!0),_e.setPolygonOffset(!1)}function vl(P,k,K,Z){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[Z.id]===void 0&&(m.state.transmissionRenderTarget[Z.id]=new Si(1,1,{generateMipmaps:!0,type:fe.has("EXT_color_buffer_half_float")||fe.has("EXT_color_buffer_float")?zs:Fn,minFilter:In,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:et.workingColorSpace}));const pe=m.state.transmissionRenderTarget[Z.id],Me=Z.viewport||L;pe.setSize(Me.z*y.transmissionResolutionScale,Me.w*y.transmissionResolutionScale);const Ce=y.getRenderTarget();y.setRenderTarget(pe),y.getClearColor(V),$=y.getClearAlpha(),$<1&&y.setClearColor(16777215,.5),y.clear(),ae&&ke.render(K);const Ie=y.toneMapping;y.toneMapping=$n;const Ge=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),m.setupLightsView(Z),te===!0&&me.setGlobalState(y.clippingPlanes,Z),Ws(P,K,Z),I.updateMultisampleRenderTarget(pe),I.updateRenderTargetMipmap(pe),fe.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let Ne=0,Qe=k.length;Ne<Qe;Ne++){const nt=k[Ne],vt=nt.object,pt=nt.geometry,tt=nt.material,Oe=nt.group;if(tt.side===Ht&&vt.layers.test(Z.layers)){const Pt=tt.side;tt.side=Gt,tt.needsUpdate=!0,yl(vt,K,Z,pt,tt,Oe),tt.side=Pt,tt.needsUpdate=!0,We=!0}}We===!0&&(I.updateMultisampleRenderTarget(pe),I.updateRenderTargetMipmap(pe))}y.setRenderTarget(Ce),y.setClearColor(V,$),Ge!==void 0&&(Z.viewport=Ge),y.toneMapping=Ie}function Ws(P,k,K){const Z=k.isScene===!0?k.overrideMaterial:null;for(let G=0,pe=P.length;G<pe;G++){const Me=P[G],Ce=Me.object,Ie=Me.geometry,Ge=Z===null?Me.material:Z,We=Me.group;Ce.layers.test(K.layers)&&yl(Ce,k,K,Ie,Ge,We)}}function yl(P,k,K,Z,G,pe){P.onBeforeRender(y,k,K,Z,G,pe),P.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),G.onBeforeRender(y,k,K,Z,P,pe),G.transparent===!0&&G.side===Ht&&G.forceSinglePass===!1?(G.side=Gt,G.needsUpdate=!0,y.renderBufferDirect(K,k,Z,G,P,pe),G.side=$t,G.needsUpdate=!0,y.renderBufferDirect(K,k,Z,G,P,pe),G.side=Ht):y.renderBufferDirect(K,k,Z,G,P,pe),P.onAfterRender(y,k,K,Z,G,pe)}function Xs(P,k,K){k.isScene!==!0&&(k=Be);const Z=Se.get(P),G=m.state.lights,pe=m.state.shadowsArray,Me=G.state.version,Ce=Fe.getParameters(P,G.state,pe,k,K),Ie=Fe.getProgramCacheKey(Ce);let Ge=Z.programs;Z.environment=P.isMeshStandardMaterial?k.environment:null,Z.fog=k.fog,Z.envMap=(P.isMeshStandardMaterial?Y:T).get(P.envMap||Z.environment),Z.envMapRotation=Z.environment!==null&&P.envMap===null?k.environmentRotation:P.envMapRotation,Ge===void 0&&(P.addEventListener("dispose",qe),Ge=new Map,Z.programs=Ge);let We=Ge.get(Ie);if(We!==void 0){if(Z.currentProgram===We&&Z.lightsStateVersion===Me)return bl(P,Ce),We}else Ce.uniforms=Fe.getUniforms(P),P.onBeforeCompile(Ce,y),We=Fe.acquireProgram(Ce,Ie),Ge.set(Ie,We),Z.uniforms=Ce.uniforms;const Ne=Z.uniforms;return(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&(Ne.clippingPlanes=me.uniform),bl(P,Ce),Z.needsLights=mu(P),Z.lightsStateVersion=Me,Z.needsLights&&(Ne.ambientLightColor.value=G.state.ambient,Ne.lightProbe.value=G.state.probe,Ne.directionalLights.value=G.state.directional,Ne.directionalLightShadows.value=G.state.directionalShadow,Ne.spotLights.value=G.state.spot,Ne.spotLightShadows.value=G.state.spotShadow,Ne.rectAreaLights.value=G.state.rectArea,Ne.ltc_1.value=G.state.rectAreaLTC1,Ne.ltc_2.value=G.state.rectAreaLTC2,Ne.pointLights.value=G.state.point,Ne.pointLightShadows.value=G.state.pointShadow,Ne.hemisphereLights.value=G.state.hemi,Ne.directionalShadowMap.value=G.state.directionalShadowMap,Ne.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Ne.spotShadowMap.value=G.state.spotShadowMap,Ne.spotLightMatrix.value=G.state.spotLightMatrix,Ne.spotLightMap.value=G.state.spotLightMap,Ne.pointShadowMap.value=G.state.pointShadowMap,Ne.pointShadowMatrix.value=G.state.pointShadowMatrix),Z.currentProgram=We,Z.uniformsList=null,We}function Ml(P){if(P.uniformsList===null){const k=P.currentProgram.getUniforms();P.uniformsList=zr.seqWithValue(k.seq,P.uniforms)}return P.uniformsList}function bl(P,k){const K=Se.get(P);K.outputColorSpace=k.outputColorSpace,K.batching=k.batching,K.batchingColor=k.batchingColor,K.instancing=k.instancing,K.instancingColor=k.instancingColor,K.instancingMorph=k.instancingMorph,K.skinning=k.skinning,K.morphTargets=k.morphTargets,K.morphNormals=k.morphNormals,K.morphColors=k.morphColors,K.morphTargetsCount=k.morphTargetsCount,K.numClippingPlanes=k.numClippingPlanes,K.numIntersection=k.numClipIntersection,K.vertexAlphas=k.vertexAlphas,K.vertexTangents=k.vertexTangents,K.toneMapping=k.toneMapping}function fu(P,k,K,Z,G){k.isScene!==!0&&(k=Be),I.resetTextureUnits();const pe=k.fog,Me=Z.isMeshStandardMaterial?k.environment:null,Ce=U===null?y.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:cs,Ie=(Z.isMeshStandardMaterial?Y:T).get(Z.envMap||Me),Ge=Z.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,We=!!K.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Ne=!!K.morphAttributes.position,Qe=!!K.morphAttributes.normal,nt=!!K.morphAttributes.color;let vt=$n;Z.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(vt=y.toneMapping);const pt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,tt=pt!==void 0?pt.length:0,Oe=Se.get(Z),Pt=m.state.lights;if(te===!0&&(de===!0||P!==b)){const Ft=P===b&&Z.id===E;me.setState(Z,P,Ft)}let it=!1;Z.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==Pt.state.version||Oe.outputColorSpace!==Ce||G.isBatchedMesh&&Oe.batching===!1||!G.isBatchedMesh&&Oe.batching===!0||G.isBatchedMesh&&Oe.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Oe.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Oe.instancing===!1||!G.isInstancedMesh&&Oe.instancing===!0||G.isSkinnedMesh&&Oe.skinning===!1||!G.isSkinnedMesh&&Oe.skinning===!0||G.isInstancedMesh&&Oe.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Oe.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Oe.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Oe.instancingMorph===!1&&G.morphTexture!==null||Oe.envMap!==Ie||Z.fog===!0&&Oe.fog!==pe||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==me.numPlanes||Oe.numIntersection!==me.numIntersection)||Oe.vertexAlphas!==Ge||Oe.vertexTangents!==We||Oe.morphTargets!==Ne||Oe.morphNormals!==Qe||Oe.morphColors!==nt||Oe.toneMapping!==vt||Oe.morphTargetsCount!==tt)&&(it=!0):(it=!0,Oe.__version=Z.version);let ln=Oe.currentProgram;it===!0&&(ln=Xs(Z,k,G));let Pi=!1,Wt=!1,fs=!1;const ct=ln.getUniforms(),Jt=Oe.uniforms;if(_e.useProgram(ln.program)&&(Pi=!0,Wt=!0,fs=!0),Z.id!==E&&(E=Z.id,Wt=!0),Pi||b!==P){_e.buffers.depth.getReversed()?(re.copy(P.projectionMatrix),Cd(re),Rd(re),ct.setValue(D,"projectionMatrix",re)):ct.setValue(D,"projectionMatrix",P.projectionMatrix),ct.setValue(D,"viewMatrix",P.matrixWorldInverse);const Vt=ct.map.cameraPosition;Vt!==void 0&&Vt.setValue(D,De.setFromMatrixPosition(P.matrixWorld)),Pe.logarithmicDepthBuffer&&ct.setValue(D,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&ct.setValue(D,"isOrthographic",P.isOrthographicCamera===!0),b!==P&&(b=P,Wt=!0,fs=!0)}if(G.isSkinnedMesh){ct.setOptional(D,G,"bindMatrix"),ct.setOptional(D,G,"bindMatrixInverse");const Ft=G.skeleton;Ft&&(Ft.boneTexture===null&&Ft.computeBoneTexture(),ct.setValue(D,"boneTexture",Ft.boneTexture,I))}G.isBatchedMesh&&(ct.setOptional(D,G,"batchingTexture"),ct.setValue(D,"batchingTexture",G._matricesTexture,I),ct.setOptional(D,G,"batchingIdTexture"),ct.setValue(D,"batchingIdTexture",G._indirectTexture,I),ct.setOptional(D,G,"batchingColorTexture"),G._colorsTexture!==null&&ct.setValue(D,"batchingColorTexture",G._colorsTexture,I));const Qt=K.morphAttributes;if((Qt.position!==void 0||Qt.normal!==void 0||Qt.color!==void 0)&&He.update(G,K,ln),(Wt||Oe.receiveShadow!==G.receiveShadow)&&(Oe.receiveShadow=G.receiveShadow,ct.setValue(D,"receiveShadow",G.receiveShadow)),Z.isMeshGouraudMaterial&&Z.envMap!==null&&(Jt.envMap.value=Ie,Jt.flipEnvMap.value=Ie.isCubeTexture&&Ie.isRenderTargetTexture===!1?-1:1),Z.isMeshStandardMaterial&&Z.envMap===null&&k.environment!==null&&(Jt.envMapIntensity.value=k.environmentIntensity),Wt&&(ct.setValue(D,"toneMappingExposure",y.toneMappingExposure),Oe.needsLights&&pu(Jt,fs),pe&&Z.fog===!0&&ve.refreshFogUniforms(Jt,pe),ve.refreshMaterialUniforms(Jt,Z,N,X,m.state.transmissionRenderTarget[P.id]),zr.upload(D,Ml(Oe),Jt,I)),Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(zr.upload(D,Ml(Oe),Jt,I),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&ct.setValue(D,"center",G.center),ct.setValue(D,"modelViewMatrix",G.modelViewMatrix),ct.setValue(D,"normalMatrix",G.normalMatrix),ct.setValue(D,"modelMatrix",G.matrixWorld),Z.isShaderMaterial||Z.isRawShaderMaterial){const Ft=Z.uniformsGroups;for(let Vt=0,aa=Ft.length;Vt<aa;Vt++){const Qn=Ft[Vt];z.update(Qn,ln),z.bind(Qn,ln)}}return ln}function pu(P,k){P.ambientLightColor.needsUpdate=k,P.lightProbe.needsUpdate=k,P.directionalLights.needsUpdate=k,P.directionalLightShadows.needsUpdate=k,P.pointLights.needsUpdate=k,P.pointLightShadows.needsUpdate=k,P.spotLights.needsUpdate=k,P.spotLightShadows.needsUpdate=k,P.rectAreaLights.needsUpdate=k,P.hemisphereLights.needsUpdate=k}function mu(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(P,k,K){Se.get(P.texture).__webglTexture=k,Se.get(P.depthTexture).__webglTexture=K;const Z=Se.get(P);Z.__hasExternalTextures=!0,Z.__autoAllocateDepthBuffer=K===void 0,Z.__autoAllocateDepthBuffer||fe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(P,k){const K=Se.get(P);K.__webglFramebuffer=k,K.__useDefaultFramebuffer=k===void 0};const gu=D.createFramebuffer();this.setRenderTarget=function(P,k=0,K=0){U=P,A=k,R=K;let Z=!0,G=null,pe=!1,Me=!1;if(P){const Ie=Se.get(P);if(Ie.__useDefaultFramebuffer!==void 0)_e.bindFramebuffer(D.FRAMEBUFFER,null),Z=!1;else if(Ie.__webglFramebuffer===void 0)I.setupRenderTarget(P);else if(Ie.__hasExternalTextures)I.rebindTextures(P,Se.get(P.texture).__webglTexture,Se.get(P.depthTexture).__webglTexture);else if(P.depthBuffer){const Ne=P.depthTexture;if(Ie.__boundDepthTexture!==Ne){if(Ne!==null&&Se.has(Ne)&&(P.width!==Ne.image.width||P.height!==Ne.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(P)}}const Ge=P.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(Me=!0);const We=Se.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(Array.isArray(We[k])?G=We[k][K]:G=We[k],pe=!0):P.samples>0&&I.useMultisampledRTT(P)===!1?G=Se.get(P).__webglMultisampledFramebuffer:Array.isArray(We)?G=We[K]:G=We,L.copy(P.viewport),F.copy(P.scissor),O=P.scissorTest}else L.copy(se).multiplyScalar(N).floor(),F.copy(ue).multiplyScalar(N).floor(),O=Ae;if(K!==0&&(G=gu),_e.bindFramebuffer(D.FRAMEBUFFER,G)&&Z&&_e.drawBuffers(P,G),_e.viewport(L),_e.scissor(F),_e.setScissorTest(O),pe){const Ie=Se.get(P.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+k,Ie.__webglTexture,K)}else if(Me){const Ie=Se.get(P.texture),Ge=k;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ie.__webglTexture,K,Ge)}else if(P!==null&&K!==0){const Ie=Se.get(P.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ie.__webglTexture,K)}E=-1},this.readRenderTargetPixels=function(P,k,K,Z,G,pe,Me){if(!(P&&P.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=Se.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&Me!==void 0&&(Ce=Ce[Me]),Ce){_e.bindFramebuffer(D.FRAMEBUFFER,Ce);try{const Ie=P.texture,Ge=Ie.format,We=Ie.type;if(!Pe.textureFormatReadable(Ge)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Pe.textureTypeReadable(We)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=P.width-Z&&K>=0&&K<=P.height-G&&D.readPixels(k,K,Z,G,$e.convert(Ge),$e.convert(We),pe)}finally{const Ie=U!==null?Se.get(U).__webglFramebuffer:null;_e.bindFramebuffer(D.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(P,k,K,Z,G,pe,Me){if(!(P&&P.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=Se.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&Me!==void 0&&(Ce=Ce[Me]),Ce){const Ie=P.texture,Ge=Ie.format,We=Ie.type;if(!Pe.textureFormatReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Pe.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=P.width-Z&&K>=0&&K<=P.height-G){_e.bindFramebuffer(D.FRAMEBUFFER,Ce);const Ne=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ne),D.bufferData(D.PIXEL_PACK_BUFFER,pe.byteLength,D.STREAM_READ),D.readPixels(k,K,Z,G,$e.convert(Ge),$e.convert(We),0);const Qe=U!==null?Se.get(U).__webglFramebuffer:null;_e.bindFramebuffer(D.FRAMEBUFFER,Qe);const nt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Pd(D,nt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Ne),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,pe),D.deleteBuffer(Ne),D.deleteSync(nt),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(P,k=null,K=0){P.isTexture!==!0&&(di("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,P=arguments[1]);const Z=Math.pow(2,-K),G=Math.floor(P.image.width*Z),pe=Math.floor(P.image.height*Z),Me=k!==null?k.x:0,Ce=k!==null?k.y:0;I.setTexture2D(P,0),D.copyTexSubImage2D(D.TEXTURE_2D,K,0,0,Me,Ce,G,pe),_e.unbindTexture()};const _u=D.createFramebuffer(),xu=D.createFramebuffer();this.copyTextureToTexture=function(P,k,K=null,Z=null,G=0,pe=null){P.isTexture!==!0&&(di("WebGLRenderer: copyTextureToTexture function signature has changed."),Z=arguments[0]||null,P=arguments[1],k=arguments[2],pe=arguments[3]||0,K=null),pe===null&&(G!==0?(di("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),pe=G,G=0):pe=0);let Me,Ce,Ie,Ge,We,Ne,Qe,nt,vt;const pt=P.isCompressedTexture?P.mipmaps[pe]:P.image;if(K!==null)Me=K.max.x-K.min.x,Ce=K.max.y-K.min.y,Ie=K.isBox3?K.max.z-K.min.z:1,Ge=K.min.x,We=K.min.y,Ne=K.isBox3?K.min.z:0;else{const Qt=Math.pow(2,-G);Me=Math.floor(pt.width*Qt),Ce=Math.floor(pt.height*Qt),P.isDataArrayTexture?Ie=pt.depth:P.isData3DTexture?Ie=Math.floor(pt.depth*Qt):Ie=1,Ge=0,We=0,Ne=0}Z!==null?(Qe=Z.x,nt=Z.y,vt=Z.z):(Qe=0,nt=0,vt=0);const tt=$e.convert(k.format),Oe=$e.convert(k.type);let Pt;k.isData3DTexture?(I.setTexture3D(k,0),Pt=D.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(I.setTexture2DArray(k,0),Pt=D.TEXTURE_2D_ARRAY):(I.setTexture2D(k,0),Pt=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,k.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,k.unpackAlignment);const it=D.getParameter(D.UNPACK_ROW_LENGTH),ln=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Pi=D.getParameter(D.UNPACK_SKIP_PIXELS),Wt=D.getParameter(D.UNPACK_SKIP_ROWS),fs=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,pt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,pt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Ge),D.pixelStorei(D.UNPACK_SKIP_ROWS,We),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ne);const ct=P.isDataArrayTexture||P.isData3DTexture,Jt=k.isDataArrayTexture||k.isData3DTexture;if(P.isDepthTexture){const Qt=Se.get(P),Ft=Se.get(k),Vt=Se.get(Qt.__renderTarget),aa=Se.get(Ft.__renderTarget);_e.bindFramebuffer(D.READ_FRAMEBUFFER,Vt.__webglFramebuffer),_e.bindFramebuffer(D.DRAW_FRAMEBUFFER,aa.__webglFramebuffer);for(let Qn=0;Qn<Ie;Qn++)ct&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Se.get(P).__webglTexture,G,Ne+Qn),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Se.get(k).__webglTexture,pe,vt+Qn)),D.blitFramebuffer(Ge,We,Me,Ce,Qe,nt,Me,Ce,D.DEPTH_BUFFER_BIT,D.NEAREST);_e.bindFramebuffer(D.READ_FRAMEBUFFER,null),_e.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(G!==0||P.isRenderTargetTexture||Se.has(P)){const Qt=Se.get(P),Ft=Se.get(k);_e.bindFramebuffer(D.READ_FRAMEBUFFER,_u),_e.bindFramebuffer(D.DRAW_FRAMEBUFFER,xu);for(let Vt=0;Vt<Ie;Vt++)ct?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Qt.__webglTexture,G,Ne+Vt):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Qt.__webglTexture,G),Jt?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ft.__webglTexture,pe,vt+Vt):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ft.__webglTexture,pe),G!==0?D.blitFramebuffer(Ge,We,Me,Ce,Qe,nt,Me,Ce,D.COLOR_BUFFER_BIT,D.NEAREST):Jt?D.copyTexSubImage3D(Pt,pe,Qe,nt,vt+Vt,Ge,We,Me,Ce):D.copyTexSubImage2D(Pt,pe,Qe,nt,Ge,We,Me,Ce);_e.bindFramebuffer(D.READ_FRAMEBUFFER,null),_e.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Jt?P.isDataTexture||P.isData3DTexture?D.texSubImage3D(Pt,pe,Qe,nt,vt,Me,Ce,Ie,tt,Oe,pt.data):k.isCompressedArrayTexture?D.compressedTexSubImage3D(Pt,pe,Qe,nt,vt,Me,Ce,Ie,tt,pt.data):D.texSubImage3D(Pt,pe,Qe,nt,vt,Me,Ce,Ie,tt,Oe,pt):P.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,pe,Qe,nt,Me,Ce,tt,Oe,pt.data):P.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,pe,Qe,nt,pt.width,pt.height,tt,pt.data):D.texSubImage2D(D.TEXTURE_2D,pe,Qe,nt,Me,Ce,tt,Oe,pt);D.pixelStorei(D.UNPACK_ROW_LENGTH,it),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ln),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Pi),D.pixelStorei(D.UNPACK_SKIP_ROWS,Wt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,fs),pe===0&&k.generateMipmaps&&D.generateMipmap(Pt),_e.unbindTexture()},this.copyTextureToTexture3D=function(P,k,K=null,Z=null,G=0){return P.isTexture!==!0&&(di("WebGLRenderer: copyTextureToTexture3D function signature has changed."),K=arguments[0]||null,Z=arguments[1]||null,P=arguments[2],k=arguments[3],G=arguments[4]||0),di('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(P,k,K,Z,G)},this.initRenderTarget=function(P){Se.get(P).__webglFramebuffer===void 0&&I.setupRenderTarget(P)},this.initTexture=function(P){P.isCubeTexture?I.setTextureCube(P,0):P.isData3DTexture?I.setTexture3D(P,0):P.isDataArrayTexture||P.isCompressedArrayTexture?I.setTexture2DArray(P,0):I.setTexture2D(P,0),_e.unbindTexture()},this.resetState=function(){A=0,R=0,U=null,_e.reset(),lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=et._getDrawingBufferColorSpace(e),t.unpackColorSpace=et._getUnpackColorSpace()}}const qc={type:"change"},ul={type:"start"},cu={type:"end"},Ar=new Jr,Yc=new Ln,z0=Math.cos(70*Ts.DEG2RAD),St=new w,kt=2*Math.PI,ot={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ka=1e-6;class k0 extends np{constructor(e,t=null){super(e,t),this.state=ot.NONE,this.enabled=!0,this.target=new w,this.cursor=new w,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ji.ROTATE,MIDDLE:ji.DOLLY,RIGHT:ji.PAN},this.touches={ONE:$i.ROTATE,TWO:$i.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new w,this._lastQuaternion=new Zn,this._lastTargetPosition=new w,this._quat=new Zn().setFromUnitVectors(e.up,new w(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new yc,this._sphericalDelta=new yc,this._scale=1,this._panOffset=new w,this._rotateStart=new he,this._rotateEnd=new he,this._rotateDelta=new he,this._panStart=new he,this._panEnd=new he,this._panDelta=new he,this._dollyStart=new he,this._dollyEnd=new he,this._dollyDelta=new he,this._dollyDirection=new w,this._mouse=new he,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=G0.bind(this),this._onPointerDown=H0.bind(this),this._onPointerUp=W0.bind(this),this._onContextMenu=j0.bind(this),this._onMouseWheel=Y0.bind(this),this._onKeyDown=$0.bind(this),this._onTouchStart=K0.bind(this),this._onTouchMove=Z0.bind(this),this._onMouseDown=X0.bind(this),this._onMouseMove=q0.bind(this),this._interceptControlDown=J0.bind(this),this._interceptControlUp=Q0.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(qc),this.update(),this.state=ot.NONE}update(e=null){const t=this.object.position;St.copy(t).sub(this.target),St.applyQuaternion(this._quat),this._spherical.setFromVector3(St),this.autoRotate&&this.state===ot.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=kt:n>Math.PI&&(n-=kt),s<-Math.PI?s+=kt:s>Math.PI&&(s-=kt),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(St.setFromSpherical(this._spherical),St.applyQuaternion(this._quatInverse),t.copy(this.target).add(St),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=St.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new w(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new w(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=St.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Ar.origin.copy(this.object.position),Ar.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ar.direction))<z0?this.object.lookAt(this.target):(Yc.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ar.intersectPlane(Yc,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ka||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ka||this._lastTargetPosition.distanceToSquared(this.target)>Ka?(this.dispatchEvent(qc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?kt/60*this.autoRotateSpeed*e:kt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){St.setFromMatrixColumn(t,0),St.multiplyScalar(-e),this._panOffset.add(St)}_panUp(e,t){this.screenSpacePanning===!0?St.setFromMatrixColumn(t,1):(St.setFromMatrixColumn(t,0),St.crossVectors(this.object.up,St)),St.multiplyScalar(e),this._panOffset.add(St)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;St.copy(s).sub(this.target);let r=St.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(kt*this._rotateDelta.x/t.clientHeight),this._rotateUp(kt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(kt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-kt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(kt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-kt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(kt*this._rotateDelta.x/t.clientHeight),this._rotateUp(kt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new he,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function H0(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function G0(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function W0(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(cu),this.state=ot.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function X0(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ji.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ot.DOLLY;break;case ji.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ot.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ot.ROTATE}break;case ji.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ot.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ot.PAN}break;default:this.state=ot.NONE}this.state!==ot.NONE&&this.dispatchEvent(ul)}function q0(i){switch(this.state){case ot.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ot.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ot.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Y0(i){this.enabled===!1||this.enableZoom===!1||this.state!==ot.NONE||(i.preventDefault(),this.dispatchEvent(ul),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(cu))}function $0(i){this.enabled!==!1&&this._handleKeyDown(i)}function K0(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case $i.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ot.TOUCH_ROTATE;break;case $i.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ot.TOUCH_PAN;break;default:this.state=ot.NONE}break;case 2:switch(this.touches.TWO){case $i.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ot.TOUCH_DOLLY_PAN;break;case $i.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ot.TOUCH_DOLLY_ROTATE;break;default:this.state=ot.NONE}break;default:this.state=ot.NONE}this.state!==ot.NONE&&this.dispatchEvent(ul)}function Z0(i){switch(this._trackPointer(i),this.state){case ot.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ot.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ot.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ot.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ot.NONE}}function j0(i){this.enabled!==!1&&i.preventDefault()}function J0(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Q0(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function ex(){if(typeof window>"u"||typeof navigator>"u")return{isMobile:!1,maxPixelRatio:2,antialias:!0,textureScale:1,maxAnisotropy:4,curveScale:1,edgeThresholdBoost:0,simplifyPhysicalShaders:!1,lightRigMode:"full"};const e=new URLSearchParams(window.location.search).get("gpu"),t=navigator.userAgent||"",n=!!window.Capacitor,s=/Android|iPhone|iPad|iPod|Mobile|wv\)|POCO|Xiaomi|MIUI|HyperOS/i.test(t),r=(navigator.maxTouchPoints??0)>0&&Math.min(window.screen.width,window.screen.height)<=1024;return(e==="mobile"?!0:e==="desktop"?!1:n||s||r)?{isMobile:!0,maxPixelRatio:1.5,antialias:!1,textureScale:.55,maxAnisotropy:2,curveScale:.62,edgeThresholdBoost:6,simplifyPhysicalShaders:!0,lightRigMode:"mobile"}:{isMobile:!1,maxPixelRatio:2,antialias:!0,textureScale:1,maxAnisotropy:4,curveScale:1,edgeThresholdBoost:0,simplifyPhysicalShaders:!1,lightRigMode:"full"}}const ns=ex();ns.isMobile;function Dx(i,e=6){return ns.curveScale>=.999?i:Math.max(e,Math.round(i*ns.curveScale))}const $c=new Map;function xt(i,e){return async()=>{const t=$c.get(i);if(t)return t;const s=(await e()).default,r={unitId:s.unitId,version:s.version,nameJa:s.nameJa,nameEn:s.nameEn,declaredPartCount:s.declaredPartCount,maxDrawCallsBudget:s.maxDrawCallsBudget,budgetRationale:s.budgetRationale,parts:s.parts};return $c.set(i,r),r}}const dl=Object.freeze({welcome:{unitId:"welcome",declaredPartCount:220,loadMeta:xt("welcome",()=>ce(()=>import("./welcome-Ce7Ng2Al.js"),[],import.meta.url)),load:async()=>(await ce(async()=>{const{createWelcomeUnit:i}=await import("./welcome-B1nn0TcA.js");return{createWelcomeUnit:i}},__vite__mapDeps([0,1,2,3]),import.meta.url)).createWelcomeUnit()},mishoe:{unitId:"mishoe",declaredPartCount:99,loadMeta:xt("mishoe",()=>ce(()=>import("./mi_shoe-bMm9XjJ3.js"),[],import.meta.url)),load:async()=>(await ce(async()=>{const{createMiShoeUnit:i}=await import("./mi_shoe-aRIwJXCE.js");return{createMiShoeUnit:i}},__vite__mapDeps([4,3,5,2]),import.meta.url)).createMiShoeUnit()},battery:{unitId:"battery",declaredPartCount:130,loadMeta:xt("battery",()=>ce(()=>import("./battery-Cw3gePVg.js"),[],import.meta.url)),load:async()=>(await ce(async()=>{const{createBatteryUnit:i}=await import("./battery-BZvQ43Y2.js");return{createBatteryUnit:i}},__vite__mapDeps([6,7,2,3,8]),import.meta.url)).createBatteryUnit()},cfexpress:{unitId:"cfexpress",declaredPartCount:170,loadMeta:xt("cfexpress",()=>ce(()=>import("./cfexpress-DY8cI-Wc.js"),[],import.meta.url)),load:async()=>(await ce(async()=>{const{createCfexpressUnit:i}=await import("./cfexpress-q6fngEvD.js");return{createCfexpressUnit:i}},__vite__mapDeps([9,10,2,3,8]),import.meta.url)).createCfexpressUnit()},mic:{unitId:"mic",declaredPartCount:150,loadMeta:xt("mic",()=>ce(()=>import("./mic-CwD_McdS.js"),[],import.meta.url)),load:async()=>(await ce(async()=>{const{createMicUnit:i}=await import("./mic-30Y1KNrb.js");return{createMicUnit:i}},__vite__mapDeps([11,12,2,3,8]),import.meta.url)).createMicUnit()},drybox:{unitId:"drybox",declaredPartCount:186,loadMeta:xt("drybox",()=>ce(()=>import("./drybox-D1IN4adj.js"),[],import.meta.url)),load:async()=>(await ce(async()=>{const{createDryboxUnit:i}=await import("./drybox-BAR3xuQU.js");return{createDryboxUnit:i}},__vite__mapDeps([13,14,2,3]),import.meta.url)).createDryboxUnit()},mount:{unitId:"mount",declaredPartCount:100,loadMeta:xt("mount",()=>ce(()=>import("./mount-D5exe6iE.js"),[],import.meta.url)),load:async()=>(await ce(async()=>{const{createMountUnit:i}=await import("./mount-zYqcl1-P.js");return{createMountUnit:i}},__vite__mapDeps([15,16,17,2,3]),import.meta.url)).createMountUnit()},shutter:{unitId:"shutter",declaredPartCount:180,loadMeta:xt("shutter",()=>ce(()=>import("./shutter-DRF49fuH.js"),[],import.meta.url)),load:async()=>(await ce(async()=>{const{createShutterUnit:i}=await import("./shutter-DpKJKwX2.js");return{createShutterUnit:i}},__vite__mapDeps([18,19,20,2,3]),import.meta.url)).createShutterUnit()},body:{unitId:"body",declaredPartCount:116,loadMeta:xt("body",()=>ce(()=>import("./body-DYuOmmPC.js"),[],import.meta.url)),load:async()=>(await ce(async()=>{const{createBodyUnit:i}=await import("./body-BKRc9y0r.js");return{createBodyUnit:i}},__vite__mapDeps([21,22,23,2,3,24,8,25]),import.meta.url)).createBodyUnit()},evf:{unitId:"evf",declaredPartCount:55,loadMeta:xt("evf",()=>ce(()=>import("./evf-yJM6r-pP.js"),[],import.meta.url)),load:async()=>(await ce(async()=>{const{createEvfUnit:i}=await import("./evf-CeE-dSjg.js");return{createEvfUnit:i}},__vite__mapDeps([26,27,25,2,3,8,28]),import.meta.url)).createEvfUnit()},lcd:{unitId:"lcd",declaredPartCount:150,loadMeta:xt("lcd",()=>ce(()=>import("./lcd-C5DFy3jF.js"),[],import.meta.url)),load:async()=>(await ce(async()=>{const{createLcdUnit:i}=await import("./lcd-WAHjlfnX.js");return{createLcdUnit:i}},__vite__mapDeps([29,30,24,2,3,8,31]),import.meta.url)).createLcdUnit()},lens:{unitId:"lens",declaredPartCount:128,loadMeta:xt("lens",()=>ce(()=>import("./lens-DbGM9PCN.js"),[],import.meta.url)),load:async()=>(await ce(async()=>{const{createLensUnit:i}=await import("./lens-Dl21thKM.js");return{createLensUnit:i}},__vite__mapDeps([32,33,34,2,3]),import.meta.url)).createLensUnit()},mainboard:{unitId:"mainboard",declaredPartCount:60,loadMeta:xt("mainboard",()=>ce(()=>import("./mainboard-kTn1WrHF.js"),[],import.meta.url)),load:async()=>(await ce(async()=>{const{createMainboardUnit:i}=await import("./mainboard-DTqllkRw.js");return{createMainboardUnit:i}},__vite__mapDeps([35,36,37,2,3]),import.meta.url)).createMainboardUnit()},bionz:{unitId:"bionz",declaredPartCount:70,loadMeta:xt("bionz",()=>ce(()=>import("./bionz-B1F8ABtJ.js"),[],import.meta.url)),load:async()=>(await ce(async()=>{const{createBionzUnit:i}=await import("./bionz-BwYdUkvt.js");return{createBionzUnit:i}},__vite__mapDeps([38,39,2,3,8]),import.meta.url)).createBionzUnit()},bionz_v2:{unitId:"bionz_v2",declaredPartCount:105,loadMeta:xt("bionz_v2",()=>ce(()=>import("./bionz_v2-Mx5-M7Q3.js"),[],import.meta.url)),load:async()=>(await ce(async()=>{const{createBionzV2Unit:i}=await import("./bionz_v2-xU7glq0I.js");return{createBionzV2Unit:i}},__vite__mapDeps([40,41,2,3,8]),import.meta.url)).createBionzV2Unit()},sensor:{unitId:"sensor",declaredPartCount:120,loadMeta:xt("sensor",()=>ce(()=>import("./sensor-CzpKrVee.js"),[],import.meta.url)),load:async()=>(await ce(async()=>{const{createSensorUnit:i}=await import("./sensor-CfHNtvTN.js");return{createSensorUnit:i}},__vite__mapDeps([42,43,44,2,3,8,45]),import.meta.url)).createSensorUnit()},micro:{unitId:"micro",declaredPartCount:75,loadMeta:xt("micro",()=>ce(()=>import("./micro-cCBBsnJi.js"),[],import.meta.url)),load:async()=>(await ce(async()=>{const{createMicroUnit:i}=await import("./micro-dmI_HihS.js");return{createMicroUnit:i}},__vite__mapDeps([46,47,2,3,48,8,45]),import.meta.url)).createMicroUnit()},micro_v2:{unitId:"micro_v2",declaredPartCount:55,loadMeta:xt("micro_v2",()=>ce(()=>import("./micro_v2-Be62c30w.js"),[],import.meta.url)),load:async()=>(await ce(async()=>{const{createMicroV2Unit:i}=await import("./micro_v2-DHzXLQ2j.js");return{createMicroV2Unit:i}},__vite__mapDeps([49,50,2,3,8]),import.meta.url)).createMicroV2Unit()},sensor_fab:{unitId:"sensor_fab",declaredPartCount:235,loadMeta:xt("sensor_fab",()=>ce(()=>import("./sensor_fab-Cu3xZEwo.js"),[],import.meta.url)),load:async()=>(await ce(async()=>{const{createSensorFabUnit:i}=await import("./sensor_fab-B8luOiey.js");return{createSensorFabUnit:i}},__vite__mapDeps([51,52,2,3,8]),import.meta.url)).createSensorFabUnit()},integrated:{unitId:"integrated",declaredPartCount:305,loadMeta:xt("integrated",()=>ce(()=>import("./integrated-_M_HiRFo.js"),[],import.meta.url)),load:async()=>(await ce(async()=>{const{createIntegratedUnit:i}=await import("./integrated-DsFg9_4u.js");return{createIntegratedUnit:i}},__vite__mapDeps([53,54,3,55,34,2,17,23,24,8,25,28,20,44,45,37,31]),import.meta.url)).createIntegratedUnit()},camera_body:{unitId:"camera_body",declaredPartCount:231,loadMeta:xt("camera_body",()=>ce(()=>import("./camera_body-CnaAZIgr.js"),[],import.meta.url)),load:async()=>(await ce(async()=>{const{createCameraBodyUnit:i}=await import("./camera_body-CNIA6Cv9.js");return{createCameraBodyUnit:i}},__vite__mapDeps([56,57,3,55,34,2,17,23,24,8,25,28,20,44,45,37,31]),import.meta.url)).createCameraBodyUnit()}});function tx(i){return Object.prototype.hasOwnProperty.call(dl,i)}function nx(){return Object.values(dl)}async function Kc(i){const e=dl[i];if(!e)throw new Error(`Unit '${i}' is not registered in V2 registry.`);return e.load()}const Zc=["map","bumpMap","normalMap","roughnessMap","metalnessMap","emissiveMap","alphaMap","aoMap","envMap","clearcoatMap","clearcoatRoughnessMap","clearcoatNormalMap","iridescenceMap"];function Wi(i,e,t,n,s){const r=i.userData?.__cacheKey;if(e&&r&&e.hasMaterial(r)){e.releaseMaterial(r),t.releasedCachedMaterials++;return}if(n.has(i))return;n.add(i);const a=i;for(let o=0;o<Zc.length;o++){const l=a[Zc[o]];if(l instanceof Rt&&!s.has(l)){const c=l.userData?.__cacheKey;e&&c?e.releaseTexture(c):(l.dispose(),t.disposedUniqueTextures++),s.add(l)}}i.dispose(),t.disposedUniqueMaterials++}function jc(i,e,t,n){const s=i.userData?.__cacheKey;if(e&&s&&e.hasGeometry(s)){e.releaseGeometry(s),t.releasedCachedGeometries++;return}n.has(i)||(n.add(i),i.dispose(),t.disposedUniqueGeometries++)}function ix(i,e=null,t=!0){const n={disposedObjects:0,releasedCachedGeometries:0,disposedUniqueGeometries:0,releasedCachedMaterials:0,disposedUniqueMaterials:0,disposedUniqueTextures:0,disposedInstancedMeshes:0,disposedBatchedMeshes:0},s=new Set,r=new Set,a=new Set,o=l=>{const c=l.children.slice();for(let u=0;u<c.length;u++)o(c[u]);if(n.disposedObjects++,l.isBatchedMesh){const u=l;if(Array.isArray(u.material))for(let d=0;d<u.material.length;d++)Wi(u.material[d],e,n,r,a);else u.material&&Wi(u.material,e,n,r,a);u.dispose(),n.disposedBatchedMeshes++}else if(l.isInstancedMesh){const u=l;if(u.geometry&&jc(u.geometry,e,n,s),Array.isArray(u.material))for(let d=0;d<u.material.length;d++)Wi(u.material[d],e,n,r,a);else u.material&&Wi(u.material,e,n,r,a);u.dispose(),n.disposedInstancedMeshes++}else if(l.isMesh||l.isLine||l.isPoints){const u=l;if(u.geometry&&jc(u.geometry,e,n,s),Array.isArray(u.material))for(let d=0;d<u.material.length;d++)Wi(u.material[d],e,n,r,a);else u.material&&Wi(u.material,e,n,r,a)}else if(l.isLight){const u=l;typeof u.dispose=="function"&&u.dispose()}l!==i&&l.parent&&l.parent.remove(l)};return o(i),t&&i.parent&&i.parent.remove(i),n}class sx{baseline=null;peak=null;lastVerification=null;switchCount=0;captureBaseline(e){const t={geometries:e.info.memory.geometries,textures:e.info.memory.textures,timestampMs:typeof performance<"u"?performance.now():Date.now()};return this.baseline=t,this.peak=t,t}recordActivePeak(e){const t={geometries:e.info.memory.geometries,textures:e.info.memory.textures,timestampMs:typeof performance<"u"?performance.now():Date.now()};return(!this.peak||t.geometries>this.peak.geometries||t.textures>this.peak.textures)&&(this.peak=t),t}verifyAfterDispose(e,t){const n=typeof performance<"u"?performance.now():Date.now(),s={geometries:e.info.memory.geometries,textures:e.info.memory.textures,timestampMs:n},r=this.baseline??s,a=this.peak??s,o=t.getStats(),l=s.geometries-r.geometries,c=s.textures-r.textures,u=l<=0&&c<=0&&o.totalRefs===0&&o.geometries===0&&o.materials===0&&o.textures===0;this.switchCount++;const d={baseline:r,peak:a,afterDispose:s,deltaGeometries:l,deltaTextures:c,cacheRemainingRefs:o.totalRefs,passed:u};return this.lastVerification=d,u||console.warn("[MI Shoe V2 VRAM Leak Detector] Residual GPU/cache resources detected!",{...d,cacheStats:o}),d}getLastVerification(){return this.lastVerification}getSwitchCount(){return this.switchCount}}class rx{host;panelEl;fields={};mounted=!1;expanded=!1;lastDomUpdateMs=-1/0;constructor(e,t=!1){this.host=e,this.expanded=t,this.panelEl=document.createElement("div"),this.panelEl.className="unit-v2-perf-panel mishoe-v2-perf-panel is-hidden",this.panelEl.setAttribute("role","status"),this.panelEl.setAttribute("aria-live","off");const n=document.createElement("div");n.className="unit-v2-perf-header",n.innerHTML='<span class="unit-v2-perf-title" data-field="unitTitle">V2 OPT</span><span class="unit-v2-perf-state" data-field="loopState">IDLE 0%</span>',this.panelEl.appendChild(n);const s=[["drawCalls","Draw Calls"],["triangles","Triangles"],["geometries","Geometries"],["textures","Textures"],["frameTime","Frame Time"],["quality","Tier / DPR"],["batches","Batching"],["parts","Parts (JSON=3D)"],["build","Build / Warmup"],["vram","VRAM Leak"]],r=document.createElement("div");r.className="unit-v2-perf-grid";for(let a=0;a<s.length;a++){const[o,l]=s[a],c=document.createElement("div");c.className="unit-v2-perf-row";const u=document.createElement("span");u.className="unit-v2-perf-key",u.textContent=l;const d=document.createElement("span");d.className="unit-v2-perf-val",d.dataset.field=o,d.textContent="-",c.append(u,d),r.appendChild(c),this.fields[o]=d}this.fields.unitTitle=n.querySelector('[data-field="unitTitle"]'),this.fields.loopState=n.querySelector('[data-field="loopState"]'),this.panelEl.appendChild(r),this.host.append(this.panelEl)}setModeVisible(e){this.mounted=e,this.panelEl.classList.toggle("is-hidden",!e||!this.expanded)}toggle(){return this.expanded=!this.expanded,this.panelEl.classList.toggle("is-hidden",!this.mounted||!this.expanded),this.expanded}setExpanded(e){this.expanded=e,this.panelEl.classList.toggle("is-hidden",!this.mounted||!this.expanded)}isExpanded(){return this.expanded}update(e,t=!1){if(!this.mounted||!this.expanded)return;const n=typeof performance<"u"?performance.now():Date.now();if(!t&&n-this.lastDomUpdateMs<90)return;this.lastDomUpdateMs=n,this.fields.unitTitle.textContent=`${e.unitId.toUpperCase()} · V2 OPT`;const s=e.drawCalls,r=e.maxDrawCallsBudget??100;if(this.fields.drawCalls.textContent=`${s} / ${r}`,this.fields.drawCalls.className=s<=r?"unit-v2-perf-val is-ok":"unit-v2-perf-val is-warn",this.fields.triangles.textContent=e.triangles.toLocaleString("en-US"),this.fields.geometries.textContent=String(e.geometries),this.fields.textures.textContent=String(e.textures),this.fields.frameTime.textContent=`${e.frameTimeMs.toFixed(2)} ms (avg ${e.avgFrameTimeMs.toFixed(2)})`,this.fields.quality.textContent=`${e.quality.toUpperCase()} · DPR ${e.pixelRatio.toFixed(2)}`,e.buildStats){const a=e.buildStats;this.fields.batches.textContent=`${a.instancedMeshCount} Inst(${a.totalInstances}) · ${a.batchedMeshCount} Batch(${a.totalBatchedItems})`,this.fields.parts.textContent=`${a.registeredPartCount} / ${a.declaredPartCount}`,this.fields.build.textContent=`${a.buildTimeMs.toFixed(1)}ms (max ${a.maxChunkMs.toFixed(1)}ms) · W ${e.shaderWarmupMs.toFixed(1)}ms`}if(e.vramCheck){const a=e.vramCheck;this.fields.vram.textContent=a.passed?`PASS Δg:${a.deltaGeometries} Δt:${a.deltaTextures} (#${e.vramSwitchCount})`:`LEAK Δg:${a.deltaGeometries} Δt:${a.deltaTextures}`,this.fields.vram.className=a.passed?"unit-v2-perf-val is-ok":"unit-v2-perf-val is-warn"}else this.fields.vram.textContent="BASELINE ARMED",this.fields.vram.className="unit-v2-perf-val";this.fields.loopState.textContent=e.idle?"IDLE 0% GPU":"ACTIVE",this.fields.loopState.className=e.idle?"unit-v2-perf-state is-idle":"unit-v2-perf-state is-active"}dispose(){this.panelEl.remove()}}const Pn=[],Hn=new Int32Array(2048),Gn=new Float64Array(2048),Wn=new Int32Array(128);let bs=new Float32Array(1024),wr=new Float32Array(1024),Pr=new Float32Array(1024);const Ss=new Int32Array(128),Cr=new Int32Array(128),Rr=new Int32Array(128),Lr=new Uint8Array(128),fl=new an;fl.side=Ht;const Jc=new Zt,ax=new fn,tn=new _t,Xi=new Ct(tn,fl),pn=new Ct(tn,fl),Qc=new st,$r=new w,eh={vertexStart:0,vertexCount:0,reservedVertexCount:0,indexStart:0,indexCount:0,reservedIndexCount:0,start:0,count:0};function ox(i){const e=i.parts,t=e.length;if(t===0){i.bvhNodeCount=0,i.bvhDirty=!1;return}let n=i.bvhPartOrder;(!n||n.length<t)&&(n=new Int32Array(t),i.bvhPartOrder=n);const s=Math.max(1,t*2);let r=i.bvhNodes;(!r||r.length<s*8)&&(r=new Float32Array(s*8),i.bvhNodes=r),bs.length<t&&(bs=new Float32Array(t*2),wr=new Float32Array(t*2),Pr=new Float32Array(t*2));let a=0;for(let c=0;c<t;c++){const u=e[c].worldBox;u.isEmpty()||(n[a++]=c,bs[c]=(u.min.x+u.max.x)*.5,wr[c]=(u.min.y+u.max.y)*.5,Pr[c]=(u.min.z+u.max.z)*.5)}if(a===0){i.bvhNodeCount=0,i.bvhDirty=!1;return}let o=0,l=0;for(Ss[0]=0,Cr[0]=a,Rr[0]=-1,Lr[0]=0,l=1;l>0;){l--;const c=Ss[l],u=Cr[l],d=Rr[l],p=Lr[l],f=o++,_=f*8;d>=0&&(p?r[d*8+7]=-f:r[d*8+6]=f);let v=1/0,g=1/0,m=1/0,S=-1/0,M=-1/0,y=-1/0,C=1/0,A=1/0,R=1/0,U=-1/0,E=-1/0,b=-1/0;for(let Q=c;Q<c+u;Q++){const se=n[Q],ue=e[se].worldBox;ue.min.x<v&&(v=ue.min.x),ue.min.y<g&&(g=ue.min.y),ue.min.z<m&&(m=ue.min.z),ue.max.x>S&&(S=ue.max.x),ue.max.y>M&&(M=ue.max.y),ue.max.z>y&&(y=ue.max.z);const Ae=bs[se],q=wr[se],te=Pr[se];Ae<C&&(C=Ae),q<A&&(A=q),te<R&&(R=te),Ae>U&&(U=Ae),q>E&&(E=q),te>b&&(b=te)}if(r[_]=v,r[_+1]=g,r[_+2]=m,r[_+3]=S,r[_+4]=M,r[_+5]=y,u<=4||l+2>=Ss.length){r[_+6]=c,r[_+7]=u;continue}const L=U-C,F=E-A,O=b-R,V=L>=F&&L>=O?0:F>=L&&F>=O?1:2,$=V===0?bs:V===1?wr:Pr,B=V===0?(C+U)*.5:V===1?(A+E)*.5:(R+b)*.5;let X=c,N=c+u-1;for(;X<=N;)if($[n[X]]<B)X++;else{const Q=n[X];n[X]=n[N],n[N]=Q,N--}let j=X-c;(j===0||j===u)&&(j=u>>1),Ss[l]=c+j,Cr[l]=u-j,Rr[l]=f,Lr[l]=1,l++,Ss[l]=c,Cr[l]=j,Rr[l]=f,Lr[l]=0,l++}i.bvhNodeCount=o,i.bvhDirty=!1}function Rn(i,e,t,n,s,r,a,o,l,c,u,d){const p=(a-i)*n,f=(c-i)*n;let _=p<f?p:f,v=p>f?p:f;const g=(o-e)*s,m=(u-e)*s,S=g<m?g:m,M=g>m?g:m;if(S>_&&(_=S),M<v&&(v=M),v<_)return-1;const y=(l-t)*r,C=(d-t)*r,A=y<C?y:C,R=y>C?y:C;return A>_&&(_=A),R<v&&(v=R),v<_||v<0?-1:_>0?_:0}const qn=192,th=new WeakMap;function lx(i,e,t,n,s){let r=th.get(i);r||(r=new Map,th.set(i,r));let a=r.get(e);if(a)return a;const o=e+t,l=Math.ceil(t/qn);a=new Float32Array(l*6);for(let c=0;c<l;c++){const u=e+c*qn,d=u+qn<o?u+qn:o;let p=1/0,f=1/0,_=1/0,v=-1/0,g=-1/0,m=-1/0;for(let M=u;M<d;M++){const y=(s?s[M]:M)*3,C=n[y],A=n[y+1],R=n[y+2];C<p&&(p=C),A<f&&(f=A),R<_&&(_=R),C>v&&(v=C),A>g&&(g=A),R>m&&(m=R)}const S=c*6;a[S]=p,a[S+1]=f,a[S+2]=_,a[S+3]=v,a[S+4]=g,a[S+5]=m}return r.set(e,a),a}function nh(i,e,t,n,s,r,a,o,l,c,u,d,p){let f=u;for(let _=t;_+2<n;_+=3){const v=e[_]*3,g=e[_+1]*3,m=e[_+2]*3,S=i[v],M=i[v+1],y=i[v+2],C=i[g]-S,A=i[g+1]-M,R=i[g+2]-y,U=i[m]-S,E=i[m+1]-M,b=i[m+2]-y,L=l*b-c*E,F=c*U-o*b,O=o*E-l*U,V=C*L+A*F+R*O;if(V>-1e-6&&V<1e-6)continue;const $=1/V,B=s-S,X=r-M,N=a-y,j=(B*L+X*F+N*O)*$;if(j<0||j>1)continue;const Q=X*R-N*A,se=N*C-B*R,ue=B*A-X*C,Ae=(o*Q+l*se+c*ue)*$;if(Ae<0||j+Ae>1)continue;const q=(U*Q+E*se+b*ue)*$;q<=1e-4||q>=f||p&&($r.set(d.origin.x+d.direction.x*q,d.origin.y+d.direction.y*q,d.origin.z+d.direction.z*q),p.distanceToPoint($r)<0)||(f=q)}return f}function ih(i,e,t,n,s,r,a,o,l,c,u,d,p){let f=u;for(let _=t;_+2<n;_+=3){const v=(e?e[_]:_)*3,g=(e?e[_+1]:_+1)*3,m=(e?e[_+2]:_+2)*3,S=i[v],M=i[v+1],y=i[v+2],C=i[g]-S,A=i[g+1]-M,R=i[g+2]-y,U=i[m]-S,E=i[m+1]-M,b=i[m+2]-y,L=l*b-c*E,F=c*U-o*b,O=o*E-l*U,V=C*L+A*F+R*O;if(V>-1e-6&&V<1e-6)continue;const $=1/V,B=s-S,X=r-M,N=a-y,j=(B*L+X*F+N*O)*$;if(j<0||j>1)continue;const Q=X*R-N*A,se=N*C-B*R,ue=B*A-X*C,Ae=(o*Q+l*se+c*ue)*$;if(Ae<0||j+Ae>1)continue;const q=(U*Q+E*se+b*ue)*$;q<=1e-4||q>=f||p&&($r.set(d.origin.x+d.direction.x*q,d.origin.y+d.direction.y*q,d.origin.z+d.direction.z*q),p.distanceToPoint($r)<0)||(f=q)}return f}function sh(i,e,t,n,s,r,a,o,l,c,u){Qc.copy(t).invert();const d=Qc.elements,p=e.origin.x,f=e.origin.y,_=e.origin.z,v=e.direction.x,g=e.direction.y,m=e.direction.z,S=d[0]*p+d[4]*f+d[8]*_+d[12],M=d[1]*p+d[5]*f+d[9]*_+d[13],y=d[2]*p+d[6]*f+d[10]*_+d[14],C=d[0]*v+d[4]*g+d[8]*m,A=d[1]*v+d[5]*g+d[9]*m,R=d[2]*v+d[6]*g+d[10]*m,U=C!==0?1/C:1e30,E=A!==0?1/A:1e30,b=R!==0?1/R:1e30;if(n&&!n.isEmpty()){const se=Rn(S,M,y,U,E,b,n.min.x,n.min.y,n.min.z,n.max.x,n.max.y,n.max.z);if(se<0||se>=c)return 1/0}const L=r?32767:1,F=S*L,O=M*L,V=y*L,$=C*L,B=A*L,X=R*L;let N=c;const j=o+l,Q=r&&s instanceof Int16Array&&a instanceof Uint16Array;if(l>qn*2){const se=lx(i,o,l,s,a),ue=$!==0?1/$:1e30,Ae=B!==0?1/B:1e30,q=X!==0?1/X:1e30,te=se.length/6;for(let de=0;de<te;de++){const re=de*6,be=Rn(F,O,V,ue,Ae,q,se[re],se[re+1],se[re+2],se[re+3],se[re+4],se[re+5]);if(be<0||be>=N)continue;const De=o+de*qn,ge=De+qn<j?De+qn:j;N=Q?nh(s,a,De,ge,F,O,V,$,B,X,N,e,u):ih(s,a,De,ge,F,O,V,$,B,X,N,e,u)}}else N=Q?nh(s,a,o,j,F,O,V,$,B,X,N,e,u):ih(s,a,o,j,F,O,V,$,B,X,N,e,u);return N<c?N:1/0}const rh=new WeakMap;function cx(i){let e=rh.get(i);if(e)return e;e=new Map;const t=i.kind==="instanced"?i.instanceIdToPartId:i.batchIdToPartId;for(let n=0;n<t.length;n++){const s=t[n];if(!s)continue;let r=e.get(s);r||(r=[],e.set(s,r)),r.push(n)}return rh.set(i,e),e}class hx{raycaster=new tp;hoverThrottleMs;isDragging=!1;lastHoverTimestampMs=-1/0;lastHoverPartId=null;hoverChecksPerformed=0;hoverChecksSkipped=0;constructor(e=33.3){this.hoverThrottleMs=e}setCameraDragging(e){this.isDragging=e}isCameraDragging(){return this.isDragging}resetHoverThrottle(){this.lastHoverTimestampMs=-1/0}getDiagnostics(){return{performed:this.hoverChecksPerformed,skipped:this.hoverChecksSkipped}}pickHover(e,t,n,s,r,a=typeof performance<"u"?performance.now():Date.now()){if(!n||this.isDragging)return this.hoverChecksSkipped++,{skipped:!0,partId:this.lastHoverPartId};if(a-this.lastHoverTimestampMs<this.hoverThrottleMs)return this.hoverChecksSkipped++,{skipped:!0,partId:this.lastHoverPartId};this.lastHoverTimestampMs=a,this.hoverChecksPerformed++,this.raycaster.setFromCamera(e,t);const o=this.pickWithRay(this.raycaster,n,s,r);return this.lastHoverPartId=o,{skipped:!1,partId:o}}pickClick(e,t,n,s,r){return n?(this.raycaster.setFromCamera(e,t),this.pickWithRay(this.raycaster,n,s,r)):null}pickWithRay(e,t,n,s){t.boundsDirty&&t.syncBounds&&t.syncBounds(),t.bvhDirty&&t.bvhNodes&&ox(t);const r=e.ray,a=r.origin,o=a.x,l=a.y,c=a.z,u=r.direction.x!==0?1/r.direction.x:1e30,d=r.direction.y!==0?1/r.direction.y:1e30,p=r.direction.z!==0?1/r.direction.z:1e30,f=t.unitWorldBox;if(f.isEmpty()||Rn(o,l,c,u,d,p,f.min.x,f.min.y,f.min.z,f.max.x,f.max.y,f.max.z)<0)return null;let _=0;const v=t.parts,g=Hn.length,m=t.bvhNodes,S=t.bvhPartOrder,M=t.bvhNodeCount??0;if(m&&S&&M>0){let E=1;for(Wn[0]=0;E>0;){const L=Wn[--E]*8;if(Rn(o,l,c,u,d,p,m[L],m[L+1],m[L+2],m[L+3],m[L+4],m[L+5])<0)continue;const O=m[L+6]|0,V=m[L+7]|0;if(V>0){const $=O+V;for(let B=O;B<$;B++){const X=S[B],N=v[X];if(n(N.partId))continue;const j=N.worldBox;if(j.isEmpty())continue;const Q=Rn(o,l,c,u,d,p,j.min.x,j.min.y,j.min.z,j.max.x,j.max.y,j.max.z);if(!(Q<0)){if(_>=g)break;Hn[_]=X,Gn[_]=Q*Q,_++}}}else{const $=O,B=-V,X=$*8,N=B*8,j=Rn(o,l,c,u,d,p,m[X],m[X+1],m[X+2],m[X+3],m[X+4],m[X+5]),Q=Rn(o,l,c,u,d,p,m[N],m[N+1],m[N+2],m[N+3],m[N+4],m[N+5]);j>=0&&Q>=0?j<=Q?(Wn[E++]=B,Wn[E++]=$):(Wn[E++]=$,Wn[E++]=B):j>=0?Wn[E++]=$:Q>=0&&(Wn[E++]=B)}}}else{const E=t.groups;for(let b=0;b<E.length;b++){const L=E[b],F=L.worldBox;if(F.isEmpty()||Rn(o,l,c,u,d,p,F.min.x,F.min.y,F.min.z,F.max.x,F.max.y,F.max.z)<0)continue;const O=L.partIndices;for(let V=0;V<O.length;V++){const $=O[V],B=v[$];if(n(B.partId))continue;const X=B.worldBox;if(X.isEmpty())continue;const N=Rn(o,l,c,u,d,p,X.min.x,X.min.y,X.min.z,X.max.x,X.max.y,X.max.z);if(!(N<0)){if(_>=g)break;Hn[_]=$,Gn[_]=N*N,_++}}}}if(_===0)return null;for(let E=1;E<_;E++){const b=Hn[E],L=Gn[E];let F=E-1;for(;F>=0&&Gn[F]>L;)Hn[F+1]=Hn[F],Gn[F+1]=Gn[F],F--;Hn[F+1]=b,Gn[F+1]=L}let y=1/0,C=1/0,A=null;const R=t.bindings,U=!!t.fastLiteRaycast;for(let E=0;E<_&&!(Gn[E]>=C);E++){const b=v[Hn[E]],L=b.partId,F=b.bindingIndices;for(let O=0;O<F.length;O++){const V=R[F[O]];if(!V||!V.mesh.visible)continue;const B=cx(V).get(L);if(!B)continue;const X=V.gpuExplodeOffsets,N=V.gpuExplodeFactor??0,j=!!(X&&N>1e-6);if(V.kind==="batched"){const Q=V.mesh,se=Q.geometry;if(U){const ue=se.getAttribute("position");if(!ue)continue;const Ae=ue.array,q=!!(ue.normalized&&Ae instanceof Int16Array),te=se.index?se.index.array:null;for(let de=0;de<B.length;de++){const re=B[de];if(!Q.getVisibleAt(re))continue;const be=Q.getGeometryIdAt(re),De=Q.getGeometryRangeAt(be,eh);if(!De||De.count<=0)continue;if(Q.getMatrixAt(re,Xi.matrixWorld).premultiply(Q.matrixWorld),j&&X){const ae=re*3,ee=Xi.matrixWorld.elements;ee[12]+=X[ae]*N,ee[13]+=X[ae+1]*N,ee[14]+=X[ae+2]*N}const ge=Q.getBoundingBoxAt(be,Jc),Be=sh(se,r,Xi.matrixWorld,ge,Ae,q,te,De.start,De.count,y,s);Be<y&&(y=Be,C=Be*Be,A=L)}}else{tn.index=se.index,tn.attributes=se.attributes;for(let ue=0;ue<B.length;ue++){const Ae=B[ue];if(!Q.getVisibleAt(Ae))continue;const q=Q.getGeometryIdAt(Ae),te=Q.getGeometryRangeAt(q,eh);if(!(!te||te.count<=0)){if(tn.setDrawRange(te.start,te.count),Q.getMatrixAt(Ae,Xi.matrixWorld).premultiply(Q.matrixWorld),j&&X){const de=Ae*3,re=Xi.matrixWorld.elements;re[12]+=X[de]*N,re[13]+=X[de+1]*N,re[14]+=X[de+2]*N}tn.boundingBox=Q.getBoundingBoxAt(q,Jc),tn.boundingSphere=Q.getBoundingSphereAt(q,ax),Pn.length=0,Xi.raycast(e,Pn);for(let de=0;de<Pn.length;de++){const re=Pn[de];re.distance>=y||s&&s.distanceToPoint(re.point)<0||(y=re.distance,C=y*y,A=L)}}}tn.index=null,tn.attributes={},tn.boundingBox=null,tn.boundingSphere=null}}else{const Q=V.mesh,se=Q.geometry;if(!se)continue;if(U){const ue=se.getAttribute("position");if(!ue)continue;const Ae=ue.array,q=!!(ue.normalized&&Ae instanceof Int16Array),te=se.index?se.index.array:null,de=te?te.length:ue.count;se.boundingBox||se.computeBoundingBox();for(let re=0;re<B.length;re++){const be=B[re];Q.getMatrixAt(be,pn.matrixWorld),pn.matrixWorld.premultiply(Q.matrixWorld);const De=pn.matrixWorld.elements;if(De[0]===0&&De[1]===0&&De[2]===0&&De[4]===0&&De[5]===0&&De[6]===0)continue;if(j&&X){const Be=be*3;De[12]+=X[Be]*N,De[13]+=X[Be+1]*N,De[14]+=X[Be+2]*N}const ge=sh(se,r,pn.matrixWorld,se.boundingBox,Ae,q,te,0,de,y,s);ge<y&&(y=ge,C=ge*ge,A=L)}}else{pn.geometry=se;for(let ue=0;ue<B.length;ue++){const Ae=B[ue];Q.getMatrixAt(Ae,pn.matrixWorld),pn.matrixWorld.premultiply(Q.matrixWorld);const q=pn.matrixWorld.elements;if(!(q[0]===0&&q[1]===0&&q[2]===0&&q[4]===0&&q[5]===0&&q[6]===0)){if(j&&X){const te=Ae*3;q[12]+=X[te]*N,q[13]+=X[te+1]*N,q[14]+=X[te+2]*N}Pn.length=0,pn.raycast(e,Pn);for(let te=0;te<Pn.length;te++){const de=Pn[te];de.distance>=y||s&&s.distanceToPoint(de.point)<0||(y=de.distance,C=y*y,A=L)}}}pn.geometry=tn}}}}return Pn.length=0,A}}const kr={standard_lite:{maxPixelRatio:1,curveSegments:5,radialSegments:6,torusTubularSegments:6,sphereSegments:6,shadowsEnabled:!1,postProcessEnabled:!1,enableStudioEnv:!1,showSolidStructuralEdges:!1,maxHeroTextureDim:128},standard:{maxPixelRatio:1,curveSegments:10,radialSegments:14,torusTubularSegments:14,sphereSegments:12,shadowsEnabled:!1,postProcessEnabled:!1,enableStudioEnv:!1,showSolidStructuralEdges:!0,maxHeroTextureDim:512},high:{maxPixelRatio:1.5,curveSegments:14,radialSegments:18,torusTubularSegments:18,sphereSegments:16,shadowsEnabled:!1,postProcessEnabled:!1,enableStudioEnv:!0,showSolidStructuralEdges:!0,maxHeroTextureDim:512},ultra:{maxPixelRatio:2,curveSegments:24,radialSegments:28,torusTubularSegments:28,sphereSegments:24,shadowsEnabled:!0,postProcessEnabled:!1,enableStudioEnv:!0,showSolidStructuralEdges:!0,maxHeroTextureDim:2048}};function Ux(i){const e=(i>>16&255)/255,t=(i>>8&255)/255,n=(i&255)/255,s=.2126*e+.7152*t+.0722*n,r=.3;if(s>=r)return i;const a=1-s/r,o=.195*a*a,l=Math.min(1,e+o*.96),c=Math.min(1,t+o*.99),u=Math.min(1,n+o*1.05);return(Math.round(l*255)&255)<<16|(Math.round(c*255)&255)<<8|Math.round(u*255)&255}function Fx(i){const e=(i>>16&255)/255,t=(i>>8&255)/255,n=(i&255)/255;return .2126*e+.7152*t+.0722*n}const ah={metal_hero:{color:16777215,metalness:.9,roughness:.22,bumpTextureKey:"cnc_brushed",bumpScale:.016,ultraPhysical:{clearcoat:.32,clearcoatRoughness:.14}},matte_chassis:{color:16777215,metalness:.26,roughness:.5,stdLambert:!0,bumpTextureKey:"mg_grain",bumpScale:.025},elastomer_rubber:{color:16777215,metalness:.05,roughness:.86,stdLambert:!0,bumpTextureKey:"mg_grain",bumpScale:.04},pcb_textured:{color:16777215,metalness:.22,roughness:.42,stdLambert:!0,mapTextureKey:"hdi_pcb",bumpTextureKey:"hdi_pcb",bumpScale:.028},silicon_hero:{color:16777215,metalness:.42,roughness:.24,ultraPhysical:{clearcoat:.55,clearcoatRoughness:.14,iridescence:.45,iridescenceIOR:1.65}},gold_plating:{color:16777215,metalness:.94,roughness:.18,ultraPhysical:{clearcoat:.36,clearcoatRoughness:.12}},becu_spring:{color:16777215,metalness:.89,roughness:.23,bumpTextureKey:"cnc_brushed",bumpScale:.02,ultraPhysical:{clearcoat:.24,clearcoatRoughness:.16}},stainless_machined:{color:16777215,metalness:.9,roughness:.21,bumpTextureKey:"cnc_brushed",bumpScale:.015,ultraPhysical:{clearcoat:.3,clearcoatRoughness:.14}},matte_black_anodized:{color:16777215,metalness:.48,roughness:.46},pin_carrier_gloss:{color:16777215,metalness:.14,roughness:.26,ultraPhysical:{clearcoat:.58,clearcoatRoughness:.14}},copper_coil:{color:16777215,metalness:.88,roughness:.24,mapTextureKey:"copper_coil",bumpTextureKey:"copper_coil",bumpScale:.03,ultraPhysical:{clearcoat:.22,clearcoatRoughness:.18}},torus_seal:{color:16777215,metalness:.36,roughness:.52,stdLambert:!0},copper_thermal:{color:16777215,metalness:.9,roughness:.24,bumpTextureKey:"cnc_brushed",bumpScale:.018,ultraPhysical:{clearcoat:.26,clearcoatRoughness:.18}},brass_precision:{color:16777215,metalness:.91,roughness:.22,bumpTextureKey:"cnc_brushed",bumpScale:.016,ultraPhysical:{clearcoat:.28,clearcoatRoughness:.15}},titanium_machined:{color:16777215,metalness:.86,roughness:.27,bumpTextureKey:"cnc_brushed",bumpScale:.018,ultraPhysical:{clearcoat:.25,clearcoatRoughness:.18}},magnesium_cast:{color:16777215,metalness:.62,roughness:.44,bumpTextureKey:"mg_grain",bumpScale:.032},iron_magnetic:{color:16777215,metalness:.84,roughness:.3,bumpTextureKey:"cnc_brushed",bumpScale:.018},solder_silver:{color:16777215,metalness:.93,roughness:.16,ultraPhysical:{clearcoat:.35,clearcoatRoughness:.12}},emi_shield_metal:{color:16777215,metalness:.84,roughness:.28,bumpTextureKey:"mesh_grid",bumpScale:.022},optical_glass_clear:{color:16777215,metalness:.04,roughness:.06,transparent:!0,opacity:.34,depthWrite:!1,ultraPhysical:{clearcoat:1,clearcoatRoughness:.04,iridescence:.28,iridescenceIOR:1.48,ior:1.52,reflectivity:.9}},optical_glass_ed:{color:16777215,metalness:.05,roughness:.05,transparent:!0,opacity:.42,depthWrite:!1,ultraPhysical:{clearcoat:1,clearcoatRoughness:.04,iridescence:.42,iridescenceIOR:1.58,ior:1.56,reflectivity:.92}},optical_ar_iridescent:{color:16777215,metalness:.1,roughness:.07,transparent:!0,opacity:.46,depthWrite:!1,ultraPhysical:{clearcoat:1,clearcoatRoughness:.05,iridescence:.88,iridescenceIOR:1.72,ior:1.62,reflectivity:.95}},optical_dichroic:{color:16777215,metalness:.22,roughness:.08,transparent:!0,opacity:.54,depthWrite:!1,ultraPhysical:{clearcoat:.95,clearcoatRoughness:.05,iridescence:.95,iridescenceIOR:1.85}},glass_clear_housing:{color:16777215,metalness:.05,roughness:.08,transparent:!0,opacity:.24,depthWrite:!1,ultraPhysical:{clearcoat:.92,clearcoatRoughness:.06}},membrane_translucent:{color:16777215,metalness:.08,roughness:.24,transparent:!0,opacity:.68,depthWrite:!1,ultraPhysical:{clearcoat:.45,clearcoatRoughness:.18}},silicon_wafer_dark:{color:16777215,metalness:.52,roughness:.16,mapTextureKey:"wafer_grid",bumpTextureKey:"wafer_grid",bumpScale:.018,ultraPhysical:{clearcoat:.85,clearcoatRoughness:.08,iridescence:.65,iridescenceIOR:1.78}},silicon_photodiode:{color:16777215,metalness:.36,roughness:.18,mapTextureKey:"optical_diffraction",ultraPhysical:{clearcoat:.78,clearcoatRoughness:.1,iridescence:.72,iridescenceIOR:1.68}},silicon_dielectric:{color:16777215,metalness:.12,roughness:.28,transparent:!0,opacity:.56,depthWrite:!1,ultraPhysical:{clearcoat:.62,clearcoatRoughness:.14}},cucu_hybrid_copper:{color:16777215,metalness:.92,roughness:.17,bumpTextureKey:"wafer_grid",bumpScale:.02,ultraPhysical:{clearcoat:.34,clearcoatRoughness:.12}},cfa_gloss_filter:{color:16777215,metalness:.08,roughness:.14,transparent:!0,opacity:.78,depthWrite:!1,ultraPhysical:{clearcoat:.9,clearcoatRoughness:.08}},abf_substrate:{color:16777215,metalness:.18,roughness:.38,stdLambert:!0,bumpTextureKey:"hdi_pcb",bumpScale:.02},ic_epoxy_dark:{color:16777215,metalness:.14,roughness:.44,stdLambert:!0,bumpTextureKey:"ceramic_grain",bumpScale:.015},polyimide_fpc:{color:16777215,metalness:.24,roughness:.28,ultraPhysical:{clearcoat:.55,clearcoatRoughness:.16}},ceramic_alumina:{color:16777215,metalness:.06,roughness:.58,stdLambert:!0,bumpTextureKey:"ceramic_grain",bumpScale:.022},carbon_fiber:{color:16777215,metalness:.34,roughness:.34,mapTextureKey:"carbon_weave",bumpTextureKey:"carbon_weave",bumpScale:.028,ultraPhysical:{clearcoat:.42,clearcoatRoughness:.2}},leatherette_grip:{color:16777215,metalness:.04,roughness:.84,stdLambert:!0,bumpTextureKey:"leather_grain",bumpScale:.045},foam_felt_matte:{color:16777215,metalness:.02,roughness:.94,stdLambert:!0,bumpTextureKey:"ceramic_grain",bumpScale:.038},emissive_glow:{color:16777215,metalness:.08,roughness:.24,emissive:3900150,emissiveIntensity:.55}};function ux(i){if(i==="studio_env"){const a=new Uint8Array(32768);for(let l=0;l<64;l++){const u=(1-l/63)*Math.PI,d=Math.sin(u),p=Math.cos(u);for(let f=0;f<128;f++){const v=f/127*Math.PI*2,g=d*Math.cos(v),m=p,S=d*Math.sin(v);let M=.76+Math.max(0,m)*.24;const y=Math.max(0,g*-.517+m*.716+S*.458);M+=Math.pow(y,5)*.48;const C=Math.max(0,g*.648+m*.365+S*-.669);M+=Math.pow(C,6)*.42;const A=Math.max(0,g*.32+m*-.45+S*.83);M+=Math.pow(A,3)*.28;const R=Math.exp(-Math.pow((m+.08)*7.5,2));M*=1-R*.16;const U=Math.min(255,Math.max(0,Math.round(M*248))),E=Math.min(255,Math.max(0,Math.round(M*250))),b=Math.min(255,Math.max(0,Math.round(M*255))),L=(l*128+f)*4;a[L]=U,a[L+1]=E,a[L+2]=b,a[L+3]=255}}const o=new dn(a,128,64,bt);return o.mapping=Ds,o.colorSpace=Mt,o.minFilter=mt,o.magFilter=mt,o.generateMipmaps=!1,o.needsUpdate=!0,o.userData.__cacheKey=i,o}if(i==="studio_env_ultra"){const a=new Uint8Array(2097152);for(let l=0;l<512;l++){const u=(1-l/511)*Math.PI,d=Math.sin(u),p=Math.cos(u);for(let f=0;f<1024;f++){const v=f/1023*Math.PI*2,g=d*Math.cos(v),m=p,S=d*Math.sin(v);let M=m>=0?.54+m*.36:.44+(1+m)*.15,y=m>=0?.57+m*.36:.46+(1+m)*.15,C=m>=0?.63+m*.36:.51+(1+m)*.16;const A=Math.exp(-Math.pow((m-.01)*6.2,2)),R=.58+.42*Math.pow(Math.abs(Math.sin(v*2+.32)),.65),U=1-A*.52*R;M*=U,y*=U,C*=U;const E=Math.exp(-Math.pow((g+.34)*3.1,2))*Math.exp(-Math.pow((m-.85)*4.8,2))*Math.exp(-Math.pow((S-.28)*2.6,2)),b=Math.pow(Math.max(0,g*-.44+m*.78+S*.44),18),L=Math.exp(-Math.pow((g-.12)*8,2))*Math.exp(-Math.pow((m-.92)*5.2,2))*Math.exp(-Math.pow((S+.18)*2.2,2));M+=E*1.65+b*1.15+L*1.05,y+=E*1.66+b*1.16+L*1.08,C+=E*1.72+b*1.22+L*1.16;const F=Math.exp(-Math.pow((g-.78)*6.2,2))*Math.exp(-Math.pow((m-.24)*2.6,2))*Math.exp(-Math.pow((S+.52)*4.4,2)),O=Math.exp(-Math.pow((g+.84)*6.6,2))*Math.exp(-Math.pow((m-.16)*2.8,2))*Math.exp(-Math.pow((S+.36)*4.6,2));M+=F*1.32+O*.98,y+=F*1.42+O*1.04,C+=F*1.64+O*1.16;const V=Math.pow(Math.max(0,g*.56+m*.28+S*.78),8);M+=V*.76,y+=V*.73,C+=V*.7;const $=Math.pow(Math.max(0,g*.18+m*-.52+S*.84),3);M+=$*.38,y+=$*.4,C+=$*.44;const B=N=>{const j=N/(1+N*.3);return Math.min(255,Math.max(0,Math.round(Math.pow(Math.min(1,j),1/2.2)*255)))},X=(l*1024+f)*4;a[X]=B(M),a[X+1]=B(y),a[X+2]=B(C),a[X+3]=255}}const o=new dn(a,1024,512,bt);return o.mapping=Ds,o.colorSpace=Mt,o.minFilter=mt,o.magFilter=mt,o.generateMipmaps=!1,o.needsUpdate=!0,o.userData.__cacheKey=i,o}if(i==="matcap_studio_matte"||i==="matcap_studio_metal"){const r=i==="matcap_studio_metal",a=new Uint8Array(16384*4),o=Math.hypot(-.44,.72,.54),l=-.44/o,c=.72/o,u=.54/o,d=Math.hypot(.62,.24,.75),p=.62/d,f=.24/d,_=.75/d,v=Math.hypot(.66,.44,-.61),g=.66/v,m=.44/v,S=-.61/v,M=Math.hypot(l,c,u+1),y=l/M,C=c/M,A=(u+1)/M,R=Math.hypot(p,f,_+1),U=p/R,E=f/R,b=(_+1)/R;for(let F=0;F<128;F++){const O=F/127*2-1;for(let V=0;V<128;V++){const $=V/127*2-1,B=$*$+O*O;let X=$,N=O,j;if(B>=1){const ge=1/Math.sqrt(B);X*=ge,N*=ge,j=0}else j=Math.sqrt(1-B);const Q=N*.5+.5;let se=.72+Q*.24,ue=.74+Q*.24,Ae=.78+Q*.26;const q=Math.max(0,X*l+N*c+j*u),te=Math.max(0,X*p+N*f+j*_),de=Math.max(0,X*g+N*m+j*S),re=r?.72:.8;if(se+=(q*.78+te*.48+de*.3)*re,ue+=(q*.79+te*.49+de*.32)*re,Ae+=(q*.8+te*.51+de*.36)*re,r){const ge=Math.pow(Math.max(0,X*y+N*C+j*A),24),Be=Math.pow(Math.max(0,X*U+N*E+j*b),14),ae=Math.pow(1-j,2.6)*(.5+.5*Q);se+=ge*.82+Be*.34+ae*.36,ue+=ge*.86+Be*.36+ae*.4,Ae+=ge*.94+Be*.4+ae*.46}else{const ge=Math.pow(1-j,2.2)*.2;se+=ge*.95,ue+=ge*.98,Ae+=ge*1.03}const be=ge=>{const Be=Math.min(1,ge/2.15);return Math.min(255,Math.max(0,Math.round(Math.pow(Be,1/2.2)*255)))},De=(F*128+V)*4;a[De]=be(se),a[De+1]=be(ue),a[De+2]=be(Ae),a[De+3]=255}}const L=new dn(a,128,128,bt);return L.colorSpace=Mt,L.minFilter=mt,L.magFilter=mt,L.generateMipmaps=!1,L.needsUpdate=!0,L.userData.__cacheKey=i,L}if(i==="matcap_studio_dual"){const a=new Uint8Array(131072),o=Math.hypot(-.44,.72,.54),l=-.44/o,c=.72/o,u=.54/o,d=Math.hypot(.62,.24,.75),p=.62/d,f=.24/d,_=.75/d,v=Math.hypot(.66,.44,-.61),g=.66/v,m=.44/v,S=-.61/v,M=Math.hypot(l,c,u+1),y=l/M,C=c/M,A=(u+1)/M,R=Math.hypot(p,f,_+1),U=p/R,E=f/R,b=(_+1)/R;for(let F=0;F<2;F++){const O=F===1,V=F*128;for(let $=0;$<128;$++){const B=$/127*2-1;for(let X=0;X<128;X++){const N=X/127*2-1,j=N*N+B*B;let Q=N,se=B,ue;if(j>=1){const ee=1/Math.sqrt(j);Q*=ee,se*=ee,ue=0}else ue=Math.sqrt(1-j);const Ae=se*.5+.5;let q=.74+Ae*.26,te=.76+Ae*.26,de=.8+Ae*.28;const re=Math.max(0,Q*l+se*c+ue*u),be=Math.max(0,Q*p+se*f+ue*_),De=Math.max(0,Q*g+se*m+ue*S),ge=O?.72:.84;if(q+=(re*.8+be*.48+De*.3)*ge,te+=(re*.81+be*.49+De*.32)*ge,de+=(re*.82+be*.51+De*.36)*ge,O){const ee=Math.pow(Math.max(0,Q*y+se*C+ue*A),24),D=Math.pow(Math.max(0,Q*U+se*E+ue*b),14),Ue=Math.pow(1-ue,2.5)*(.48+.52*Ae);q+=ee*.92+D*.36+Ue*.38,te+=ee*.95+D*.38+Ue*.42,de+=ee*1.02+D*.42+Ue*.48}else{const ee=Math.pow(1-ue,2.2)*.18;q+=ee*.95,te+=ee*.98,de+=ee*1.03}const Be=ee=>{const D=ee/(ee*.52+.96);return Math.min(255,Math.max(0,Math.round(Math.pow(Math.min(1,D),1/2.2)*255)))},ae=($*256+(V+X))*4;a[ae]=Be(q),a[ae+1]=Be(te),a[ae+2]=Be(de),a[ae+3]=255}}}const L=new dn(a,256,128,bt);return L.colorSpace=Mt,L.minFilter=mt,L.magFilter=mt,L.generateMipmaps=!1,L.needsUpdate=!0,L.userData.__cacheKey=i,L}if(i==="lite_explode_dummy"){const s=new Float32Array([0,0,0,0]),r=new dn(s,1,1,bt,Kt);return r.minFilter=Bt,r.magFilter=Bt,r.generateMipmaps=!1,r.needsUpdate=!0,r.userData.__cacheKey=i,r}const e=128,t=new Uint8Array(e*e*4);for(let s=0;s<e;s++)for(let r=0;r<e;r++){const a=(s*e+r)*4,o=(Math.sin(r*12.9898+s*78.233)*43758.5453%1+1)%1;if(i==="cnc_brushed"){const l=Math.sin(s*1.85)*16+Math.sin(s*.42+r*.04)*8+(o-.5)*16,c=Math.min(255,Math.max(0,Math.round(128+l)));t[a]=c,t[a+1]=c,t[a+2]=c,t[a+3]=255}else if(i==="mg_grain"){const l=Math.min(255,Math.max(0,Math.round(108+o*48)));t[a]=l,t[a+1]=l,t[a+2]=l,t[a+3]=255}else if(i==="hdi_pcb"){const l=r%8===0||s%12===0;r%16===4&&s%16===4?(t[a]=255,t[a+1]=242,t[a+2]=196):l?(t[a]=210,t[a+1]=244,t[a+2]=228):(t[a]=176,t[a+1]=208,t[a+2]=196),t[a+3]=255}else if(i==="copper_coil"){const l=.5+.5*Math.sin(r/e*Math.PI*32);t[a]=Math.round(202+l*50),t[a+1]=Math.round(186+l*48),t[a+2]=Math.round(170+l*44),t[a+3]=255}else if(i==="carbon_weave"){const l=(r>>2)+(s>>2)&1,c=Math.sin(l===0?(r&3)*1.2:(s&3)*1.2),u=Math.min(255,Math.max(0,Math.round(174+l*40+c*20)));t[a]=u,t[a+1]=Math.min(255,u+3),t[a+2]=Math.min(255,u+8),t[a+3]=255}else if(i==="leather_grain"){const l=Math.sin(r*.9+Math.cos(s*.85)*1.4)*Math.cos(s*.95)*34,c=Math.min(255,Math.max(0,Math.round(124+l+(o-.5)*26)));t[a]=c,t[a+1]=c,t[a+2]=c,t[a+3]=255}else if(i==="wafer_grid"){const l=r%16===0||s%16===0,c=r%4===0||s%4===0;l?(t[a]=236,t[a+1]=244,t[a+2]=255):c?(t[a]=196,t[a+1]=212,t[a+2]=232):(t[a]=172,t[a+1]=188,t[a+2]=210),t[a+3]=255}else if(i==="optical_diffraction"){const l=(r+s*.7)/e*Math.PI*8;t[a]=Math.round(186+44*Math.sin(l)),t[a+1]=Math.round(202+42*Math.sin(l+2.1)),t[a+2]=Math.round(218+34*Math.sin(l+4.2)),t[a+3]=255}else if(i==="ceramic_grain"){const l=Math.min(255,Math.max(0,Math.round(120+(o-.5)*44)));t[a]=l,t[a+1]=l,t[a+2]=l,t[a+3]=255}else if(i==="mesh_grid"){const l=r%6===0||s%6===0?196:96;t[a]=l,t[a+1]=l,t[a+2]=l,t[a+3]=255}else{const l=r%8===0||s%8===0?28:0;t[a]=182+l,t[a+1]=196+l,t[a+2]=218+l,t[a+3]=255}}const n=new dn(t,e,e,bt);return n.wrapS=bi,n.wrapT=bi,(i==="hdi_pcb"||i==="copper_coil"||i==="silicon_die"||i==="carbon_weave"||i==="wafer_grid"||i==="optical_diffraction")&&(n.colorSpace=Mt),n.minFilter=In,n.magFilter=mt,n.anisotropy=4,n.generateMipmaps=!0,n.needsUpdate=!0,n.userData.__cacheKey=i,n}function oh(i,e=8952234){const n=new Uint8Array(256),s=e>>16&255,r=e>>8&255,a=e&255;for(let l=0;l<64;l++){const c=l*4;n[c]=s,n[c+1]=r,n[c+2]=a,n[c+3]=255}const o=new dn(n,8,8,bt);return o.colorSpace=Mt,o.minFilter=mt,o.magFilter=mt,o.generateMipmaps=!1,o.needsUpdate=!0,o.userData.__cacheKey=i,o}class gi{materials=new Map;geometries=new Map;textures=new Map;acquireTexture(e){const t=this.textures.get(e);if(t)return t.refCount++,t.resource;const n=ux(e);return this.textures.set(e,{resource:n,refCount:1}),n}acquireHeroTexture(e,t,n){const s=`herotex:${e}:${n}`,r=this.textures.get(s);if(r)return r.refCount++,r.resource;let a;if(typeof document<"u"){const o=kr[n].maxHeroTextureDim,l=Math.min(1,o/Math.max(1,t.width,t.height)),c=Math.max(32,Math.round(t.width*l)),u=Math.max(32,Math.round(t.height*l)),d=document.createElement("canvas");d.width=c,d.height=u;const p=d.getContext("2d");if(p){p.save(),p.scale(c/t.width,u/t.height),t.painter(p,t.width,t.height),p.restore();const f=new ff(d);f.colorSpace=Mt,f.minFilter=In,f.magFilter=mt,f.anisotropy=n==="ultra"?8:n==="high"?2:1,t.wrapRepeat&&(f.wrapS=bi,f.wrapT=bi),(t.repeatX||t.repeatY)&&f.repeat.set(t.repeatX??1,t.repeatY??1),f.needsUpdate=!0,a=f}else a=oh(s,t.fallbackColor??t.baseColor??8952234)}else a=oh(s,t.fallbackColor??t.baseColor??8952234);return a.userData.__cacheKey=s,this.textures.set(s,{resource:a,refCount:1}),a}releaseTexture(e){const t=this.textures.get(e);return t?(t.refCount--,t.refCount<=0?(t.resource.dispose(),this.textures.delete(e),!0):!1):!1}acquireGeometry(e,t){const n=this.geometries.get(e);if(n)return n.refCount++,n.resource;const s=t();return s.userData.__cacheKey=e,this.geometries.set(e,{resource:s,refCount:1}),s}releaseGeometry(e){const t=this.geometries.get(e);return t?(t.refCount--,t.refCount<=0?(t.resource.dispose(),this.geometries.delete(e),!0):!1):!1}static computeStdPhongProps(e,t,n){return n?{specular:14412542,shininess:92}:e>=.7?{specular:12110044,shininess:Math.round(Math.max(28,Math.min(96,(1-t)*95+18)))}:e>=.3?{specular:7306641,shininess:Math.round(Math.max(20,Math.min(64,(1-t)*65+14)))}:{specular:4937059,shininess:Math.round(Math.max(16,Math.min(48,(1-t)*45+12)))}}acquireMaterial(e,t,n="solid",s=[],r=!1,a=0){const o=t==="standard_lite",l=o&&n==="solid"&&r,c=o&&a>0?`:p${a}`:"",u=`mat:${e}:${t}:${n}${l?":vc":""}${c}`,d=s.length>0?Ht:$t,p=this.materials.get(u);if(p)return p.refCount++,p.resource.clippingPlanes=s,p.resource.userData?.__managedSide&&p.resource.side!==d&&(p.resource.side=d,p.resource.needsUpdate=!0),p.resource;const f=ah[e],_=[],v=n==="xray",g=n==="cad";let m=null,S=null;!v&&!g&&(!o&&f.mapTextureKey&&(m=this.acquireTexture(f.mapTextureKey),_.push(f.mapTextureKey)),!o&&t!=="standard"&&f.bumpTextureKey&&(S=this.acquireTexture(f.bumpTextureKey),_.push(f.bumpTextureKey)));const M=v||!!(f.transparent&&!g),y=v?.24:g?f.transparent?Math.max(.42,f.opacity??.5):1:f.opacity??1,C=v?!1:g?!f.transparent:f.depthWrite??!M,A={color:g?16054010:v?14412542:f.color,clippingPlanes:s,clipShadows:t==="ultra",side:d,transparent:M||g&&!!f.transparent,opacity:y,depthWrite:C};let R;if(o){const U="matcap_studio_dual",E=this.acquireTexture(U),b=this.acquireTexture("lite_explode_dummy");_.push(U,"lite_explode_dummy");const L=new Ve(A.color);!g&&!v?L.multiplyScalar(1.48):g?L.multiplyScalar(1.24):L.multiplyScalar(1.3);const F=new Va({...A,color:L,matcap:E,vertexColors:l,toneMapped:!1,polygonOffset:g,polygonOffsetFactor:g?1:0,polygonOffsetUnits:g?1:0}),O=v||g||f.stdLambert&&!f.transparent?0:1;gi.patchLiteMatcapMaterial(F,b,{dualAtlas:!0,defaultFinish:O,enableRim:!v&&!f.transparent,playgroundMode:!1}),R=F}else if(v)R=new Mr({...A,emissive:1981066,emissiveIntensity:.14});else if(g)R=new Mr({...A,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1});else if(t==="standard")if(f.stdLambert&&!f.transparent)R=new Mr({...A,map:m,emissive:f.emissive??0,emissiveIntensity:f.emissiveIntensity??0});else{const U=gi.computeStdPhongProps(f.metalness,f.roughness,!!f.transparent);R=new pc({...A,map:m,specular:U.specular,shininess:U.shininess,emissive:f.emissive??0,emissiveIntensity:f.emissiveIntensity??0})}else t==="ultra"&&f.ultraPhysical?R=new fc({...A,map:m,bumpMap:S,bumpScale:(f.bumpScale??.02)*1.25,metalness:f.metalness,roughness:f.roughness,clearcoat:f.ultraPhysical.clearcoat,clearcoatRoughness:f.ultraPhysical.clearcoatRoughness,iridescence:f.ultraPhysical.iridescence??0,iridescenceIOR:f.ultraPhysical.iridescenceIOR??1.3,ior:f.ultraPhysical.ior??1.5,reflectivity:f.ultraPhysical.reflectivity??.5,envMapIntensity:1.52,emissive:f.emissive??0,emissiveIntensity:f.emissiveIntensity??0}):R=new qo({...A,map:m,bumpMap:S,bumpScale:(f.bumpScale??.02)*(t==="ultra"?1.25:1),metalness:f.metalness,roughness:f.roughness,envMapIntensity:t==="ultra"?1.28:.95,emissive:f.emissive??0,emissiveIntensity:f.emissiveIntensity??0});return R.userData.__cacheKey=u,R.userData.__materialBucket=e,R.userData.__managedSide=!0,this.materials.set(u,{resource:R,refCount:1,depTextures:_}),R}static patchLiteMatcapMaterial(e,t,n){const s={uExplode:{value:0},uExplodeTex:{value:t},uExplodeTexW:{value:1},uExplodeActive:{value:0}};e.userData.__liteUniforms=s,e.userData.__liteDummyTex=t;const r=`lite_mc_v2_${n.dualAtlas?"d":"s"}_${n.defaultFinish>.5?"m":"t"}_${n.enableRim?"r":"n"}_${n.playgroundMode?"pg":"v2"}`;e.customProgramCacheKey=()=>r;const a=n.defaultFinish.toFixed(1);return e.onBeforeCompile=o=>{o.uniforms.uExplode=s.uExplode,o.uniforms.uExplodeTex=s.uExplodeTex,o.uniforms.uExplodeTexW=s.uExplodeTexW,o.uniforms.uExplodeActive=s.uExplodeActive,o.vertexShader=o.vertexShader.replace("#include <common>",`#include <common>
uniform float uExplode;
uniform float uExplodeActive;
uniform int uExplodeTexW;
uniform highp sampler2D uExplodeTex;
${n.playgroundMode?"varying float vPgDiag;":""}`),n.playgroundMode&&(o.vertexShader=o.vertexShader.replace("#include <color_vertex>",`#if defined( USE_COLOR_ALPHA )
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
gl_Position = projectionMatrix * mvPosition;`),n.playgroundMode&&(o.fragmentShader=o.fragmentShader.replace("#include <common>",`#include <common>
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
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;`,c=`	vec2 muv = clamp( normal.xy * 0.485 + 0.5, 0.01, 0.99 );
	#ifdef USE_MATCAP
		${n.dualAtlas?`float atlasU = muv.x * 0.492 + 0.004 + step( 0.5, vMatFinish ) * 0.5;
		vec4 matcapColor = texture2D( matcap, vec2( atlasU, muv.y ) );`:"vec4 matcapColor = texture2D( matcap, muv );"}
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, muv.y ) ), 1.0 );
	#endif
	float rimEdge = ${n.enableRim?"mix( 0.78, 1.0, smoothstep( 0.04, 0.34, abs( normal.z ) ) )":"1.0"};
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb * rimEdge;
${n.playgroundMode?`	if ( vPgDiag > 1.5 ) {
		outgoingLight = vec3( 0.98, 0.14, 0.14 ) * ( 0.46 + 0.64 * matcapColor.rgb ) * rimEdge;
	} else if ( vPgDiag > 0.5 ) {
		outgoingLight = vec3( 0.98, 0.68, 0.08 ) * ( 0.44 + 0.64 * matcapColor.rgb ) * rimEdge;
	}`:""}`;o.fragmentShader=o.fragmentShader.replace(l,c)},s}acquirePlaygroundMatcapMaterial(e){const t=`pg_hyper_mat:${e}`,n=this.materials.get(t);if(n)return n.refCount++,n.resource;const s=[];let r;if(e==="wireframe")r=new Ns({color:1981066,wireframe:!0,transparent:!0,opacity:.62,toneMapped:!1});else{const a=this.acquireTexture("matcap_studio_dual"),o=this.acquireTexture("lite_explode_dummy");s.push("matcap_studio_dual","lite_explode_dummy");const l=e==="xray",c=e==="solid_glass",u=new Ve(l?9684477:16777215).multiplyScalar(l?1.25:1.48),d=new Va({color:u,matcap:a,vertexColors:!l,transparent:l||c,opacity:l?.34:c?.42:1,depthWrite:!l&&!c,side:l?Ht:$t,toneMapped:!1});gi.patchLiteMatcapMaterial(d,o,{dualAtlas:!0,defaultFinish:l?0:1,enableRim:!l&&!c,playgroundMode:!0}),r=d}return r.userData.__cacheKey=t,this.materials.set(t,{resource:r,refCount:1,depTextures:s}),r}acquireHeroMaterial(e,t,n,s="solid",r=[],a=0){if(s!=="solid")return this.acquireMaterial(t.bucket,n,s,r,!1,a);const o=n==="standard_lite"&&a>0?`:p${a}`:"",l=`hero:${e}:${n}:${s}${o}`,c=r.length>0?Ht:$t,u=this.materials.get(l);if(u)return u.refCount++,u.resource.clippingPlanes=r,u.resource.userData?.__managedSide&&u.resource.side!==c&&(u.resource.side=c,u.resource.needsUpdate=!0),u.resource;const d=ah[t.bucket],p=`herotex:${e}:${n}`,f=this.acquireHeroTexture(e,t,n),_=[p],v=t.metalness??d.metalness,g=t.roughness??d.roughness,m=t.transparent??!!d.transparent,S=t.opacity??d.opacity??1,M=t.depthWrite??!m,y={color:t.baseColor??16777215,map:f,clippingPlanes:r,clipShadows:n==="ultra",side:c,transparent:m,opacity:S,depthWrite:M,emissive:t.emissive??d.emissive??0,emissiveIntensity:t.emissiveIntensity??d.emissiveIntensity??0};let C;if(n==="standard_lite"){const A="matcap_studio_dual",R=this.acquireTexture(A),U=this.acquireTexture("lite_explode_dummy");_.push(A,"lite_explode_dummy");const E=new Ve(y.color).multiplyScalar(1.42),b=new Va({color:E,map:f,matcap:R,clippingPlanes:r,side:c,transparent:m,opacity:S,depthWrite:M,toneMapped:!1});gi.patchLiteMatcapMaterial(b,U,{dualAtlas:!0,defaultFinish:d.stdLambert&&!m?0:1,enableRim:!m,playgroundMode:!1}),C=b}else if(n==="standard")if(d.stdLambert&&!m)C=new Mr(y);else{const A=gi.computeStdPhongProps(v,g,m);C=new pc({...y,specular:A.specular,shininess:A.shininess})}else n==="ultra"&&d.ultraPhysical?C=new fc({...y,metalness:v,roughness:g,clearcoat:d.ultraPhysical.clearcoat,clearcoatRoughness:d.ultraPhysical.clearcoatRoughness,iridescence:d.ultraPhysical.iridescence??0,iridescenceIOR:d.ultraPhysical.iridescenceIOR??1.3,envMapIntensity:1.34}):C=new qo({...y,metalness:v,roughness:g,envMapIntensity:n==="ultra"?1.16:.95});return C.userData.__cacheKey=l,C.userData.__materialBucket=t.bucket,C.userData.__heroKey=e,C.userData.__managedSide=!0,this.materials.set(l,{resource:C,refCount:1,depTextures:_}),C}acquireLineMaterial(e,t){const n=`line:${e}`,s=this.materials.get(n);if(s)return s.refCount++,s.resource.clippingPlanes=t.clippingPlanes??[],s.resource;const r=t.dashed?new Kf({color:t.color,dashSize:t.dashSize??1.4,gapSize:t.gapSize??.9,transparent:!0,opacity:t.opacity,vertexColors:t.vertexColors??!1,clippingPlanes:t.clippingPlanes??[]}):new ea({color:t.color,transparent:!0,opacity:t.opacity,vertexColors:t.vertexColors??!1,clippingPlanes:t.clippingPlanes??[]});return r.userData.__cacheKey=n,this.materials.set(n,{resource:r,refCount:1}),r}acquireBasicMaterial(e,t){const n=`basic:${e}`,s=this.materials.get(n);if(s)return s.refCount++,s.resource.clippingPlanes=t.clippingPlanes??[],s.resource;const r=new Ns({color:t.color,transparent:t.transparent??!1,opacity:t.opacity??1,side:t.side??$t,depthWrite:t.depthWrite??!(t.transparent??!1),clippingPlanes:t.clippingPlanes??[]});return r.userData.__cacheKey=n,this.materials.set(n,{resource:r,refCount:1}),r}acquireShadowMaterial(e,t={}){const n=`shadow:${e}`,s=this.materials.get(n);if(s)return s.refCount++,s.resource;const r=new qf({color:t.color??988970,opacity:t.opacity??.16,transparent:!0,depthWrite:!1});return r.userData.__cacheKey=n,this.materials.set(n,{resource:r,refCount:1}),r}acquirePointsMaterial(e,t){const n=`points:${e}`,s=this.materials.get(n);if(s)return s.refCount++,s.resource.clippingPlanes=t.clippingPlanes??[],s.resource;const r=new df({color:t.color,size:t.size,transparent:t.transparent??!0,opacity:t.opacity??.9,vertexColors:t.vertexColors??!1,clippingPlanes:t.clippingPlanes??[]});return r.userData.__cacheKey=n,this.materials.set(n,{resource:r,refCount:1}),r}releaseMaterial(e){const t=this.materials.get(e);if(!t)return!1;if(t.refCount--,t.refCount<=0){if(t.depTextures)for(let n=0;n<t.depTextures.length;n++)this.releaseTexture(t.depTextures[n]);return t.resource.dispose(),this.materials.delete(e),!0}return!1}releaseMaterialInstance(e){const t=e.userData?.__cacheKey;return t&&this.materials.has(t)?this.releaseMaterial(t):!1}releaseGeometryInstance(e){const t=e.userData?.__cacheKey;return t&&this.geometries.has(t)?this.releaseGeometry(t):!1}hasMaterial(e){return this.materials.has(e)}hasGeometry(e){return this.geometries.has(e)}updateClippingPlanes(e){const t=e.length>0?Ht:$t;for(const n of this.materials.values()){const s=n.resource;s.clippingPlanes=e,s.userData?.__managedSide&&s.side!==t&&(s.side=t,s.needsUpdate=!0)}}warmupShaders(e,t,n){const s=typeof performance<"u"?performance.now():0;return e.compile(t,n),(typeof performance<"u"?performance.now():0)-s}getStats(){let e=0;for(const t of this.materials.values())e+=t.refCount;for(const t of this.geometries.values())e+=t.refCount;for(const t of this.textures.values())e+=t.refCount;return{materials:this.materials.size,geometries:this.geometries.size,textures:this.textures.size,totalRefs:e,activeMaterialKeys:Array.from(this.materials.keys()),activeGeometryKeys:Array.from(this.geometries.keys()),activeTextureKeys:Array.from(this.textures.keys())}}disposeAll(){for(const e of this.materials.values())e.resource.dispose();this.materials.clear();for(const e of this.geometries.values())e.resource.dispose();this.geometries.clear();for(const e of this.textures.values())e.resource.dispose();this.textures.clear()}}const li=new w,Ir=new w;class dx{renderer;container;clippingPlane;callbacks;scene;lightGroup;cache=new gi;raycaster=new hx(33.3);vramMonitor=new sx;perfHud;active=!1;ready=!1;activeUnitId=null;activationToken=0;activeUnit=null;buildResult=null;liteProxyUnit=null;liteProxyBuildResult=null;ultraMotionProxyActive=!1;partById=new Map;studioEnvRenderTarget=null;ultraKeyLight=null;ultraShadowCatcher=null;savedExternalPixelRatio=1;quality="ultra";renderMode="solid";explodeFactor=0;physicsActive=!1;subView=0;integratedMode=!1;selectedId=null;hoveredId=null;hiddenIds=new Set;isolatedId=null;lastDrawCalls=0;lastTriangles=0;lastFrameTimeMs=0;avgFrameTimeMs=0;frameSampleCount=0;shaderWarmupMs=0;isIdle=!0;contextLost=!1;contextLostRecoveryCount=0;constructor(e,t,n,s){this.renderer=e,this.container=t,this.clippingPlane=n,this.callbacks=s,this.scene=new tf,this.scene.background=new Ve(16777215),this.scene.matrixAutoUpdate=!1,this.scene.updateMatrix(),this.lightGroup=new As,this.lightGroup.name="unit-v2-studio-lights",this.lightGroup.matrixAutoUpdate=!1,this.lightGroup.updateMatrix(),this.scene.add(this.lightGroup);const a=(typeof window<"u"?new URLSearchParams(window.location.search):null)?.get("perfhud")==="1";this.perfHud=new rx(t,a)}isActive(){return this.active}isReady(){return this.active&&this.ready}getActiveUnitId(){return this.activeUnitId}getQuality(){return this.quality}getParts(){return this.buildResult?this.activeUnit?.getActiveParts?this.activeUnit.getActiveParts():this.buildResult.parts:[]}getAllBuiltParts(){return this.buildResult?this.buildResult.parts:[]}getPartById(e){return this.partById.get(e)??null}isPartCulledBySubView(e){return this.activeUnit?.isPartCulledBySubView?.(e)??!1}needsContinuousAnimation(e){return!1}isUltraMotionProxyActive(){return this.ultraMotionProxyActive}setUltraMotionProxyActive(e){return this.quality!=="ultra"||!this.ready||!this.buildResult||!this.liteProxyBuildResult?(this.ultraMotionProxyActive=!1,!1):e===this.ultraMotionProxyActive?!1:(this.ultraMotionProxyActive=e,e?(this.buildResult.rootGroup.visible=!1,this.liteProxyBuildResult.rootGroup.visible=!0,this.lightGroup.visible=!1,this.scene.environment=null,this.renderer.shadowMap.enabled=!1):(this.liteProxyBuildResult.rootGroup.visible=!1,this.buildResult.rootGroup.visible=!0,this.lightGroup.visible=!0,this.scene.environment=this.studioEnvRenderTarget?.texture??null,this.renderer.shadowMap.enabled=kr.ultra.shadowsEnabled),!0)}getRaycastIndex(){return this.buildResult?this.buildResult.raycastIndex:null}getPartWorldBox(e,t){const n=this.buildResult?.raycastIndex;if(!n)return!1;const s=n.partBoundsById.get(e);return!s||s.worldBox.isEmpty()?!1:(t.copy(s.worldBox),!0)}setupStudioLighting(e){this.teardownStudioLighting();const t=kr[e];if(e==="standard_lite"){this.scene.environment=null,this.studioEnvRenderTarget=null;return}const n=e==="standard",s=e==="ultra",r=new Zf(16777215,n?15660026:s?14871286:15594234,n?2.85:s?.92:1.08);r.position.set(0,80,0),r.matrixAutoUpdate=!1,r.updateMatrix();const a=new ka(s?16776696:16777215,n?2.05:s?2.28:1.78);if(a.position.set(-72,112,68),a.matrixAutoUpdate=!1,a.updateMatrix(),a.target.matrixAutoUpdate=!1,a.target.updateMatrix(),s&&t.shadowsEnabled){const c=this.renderer.capabilities.maxTextureSize||2048;let u=!1;try{const v=this.renderer.getContext(),g=v.getExtension("WEBGL_debug_renderer_info"),m=String(g?v.getParameter(g.UNMASKED_RENDERER_WEBGL):v.getParameter(v.RENDERER)||"");u=/SwiftShader|llvmpipe|Software|Mesa OffScreen/i.test(m)}catch{u=!1}const d=u?Math.min(2048,c):Math.min(4096,c>=4096?4096:2048);a.castShadow=!0,a.shadow.mapSize.set(d,d),a.shadow.bias=-28e-5,a.shadow.normalBias=.05,a.shadow.radius=2.4,this.ultraKeyLight=a;const p=this.cache.acquireGeometry("ultra:shadow-catcher-plane",()=>{const v=new Gs(1,1);return v.rotateX(-Math.PI/2),v}),f=this.cache.acquireShadowMaterial("ultra-ground",{color:988970,opacity:.18}),_=new Ct(p,f);_.name="ultra-studio-shadow-catcher",_.receiveShadow=!0,_.castShadow=!1,_.matrixAutoUpdate=!1,_.updateMatrix(),_.visible=this.renderMode==="solid",this.ultraShadowCatcher=_,this.lightGroup.add(_)}const o=new ka(s?15463679:16054527,n?1.45:s?.84:.92);o.position.set(66,24,86),o.matrixAutoUpdate=!1,o.updateMatrix();const l=new ka(s?14412542:15660799,n?1.35:s?1.48:1.02);if(l.position.set(82,48,-84),l.matrixAutoUpdate=!1,l.updateMatrix(),this.lightGroup.add(r,a,a.target,o,l),this.lightGroup.visible=!0,this.lightGroup.updateMatrixWorld(!0),t.enableStudioEnv){const c=s?"studio_env_ultra":"studio_env",u=this.cache.acquireTexture(c),d=new $o(this.renderer),p=d.fromEquirectangular(u);d.dispose(),this.cache.releaseTexture(c),this.studioEnvRenderTarget=p,this.scene.environment=p.texture}else this.scene.environment=null,this.studioEnvRenderTarget=null}fitUltraShadowRig(){if(this.quality!=="ultra"||!this.ultraKeyLight)return;const e=this.buildResult?.raycastIndex.unitWorldBox;if(!e||e.isEmpty())return;e.getCenter(li),e.getSize(Ir);const t=Math.max(12,Math.hypot(Ir.x,Ir.y,Ir.z)*.56),n=this.ultraKeyLight;n.target.position.copy(li),n.target.updateMatrix(),n.position.set(li.x-t*1.15,li.y+t*1.85,li.z+t*1.05),n.updateMatrix();const s=n.shadow.camera,r=t*1.28;if(s.left=-r,s.right=r,s.top=r,s.bottom=-r,s.near=Math.max(1,t*.25),s.far=t*5.2,s.updateProjectionMatrix(),this.ultraShadowCatcher){const a=Math.max(60,t*4.8);this.ultraShadowCatcher.position.set(li.x,e.min.y-.18,li.z),this.ultraShadowCatcher.scale.set(a,1,a),this.ultraShadowCatcher.visible=this.renderMode==="solid",this.ultraShadowCatcher.updateMatrix()}this.lightGroup.updateMatrixWorld(!0),this.renderer.shadowMap.needsUpdate=!0}teardownStudioLighting(){this.ultraKeyLight?.shadow?.map&&(this.ultraKeyLight.shadow.map.dispose(),this.ultraKeyLight.shadow.map=null),this.ultraKeyLight=null,this.ultraShadowCatcher=null,this.lightGroup.children.length>0&&ix(this.lightGroup,this.cache,!1),this.studioEnvRenderTarget&&(this.scene.environment=null,this.studioEnvRenderTarget.dispose(),this.studioEnvRenderTarget=null)}applyQualityRendererCaps(e){const t=kr[e];this.renderer.shadowMap.enabled=t.shadowsEnabled&&!this.ultraMotionProxyActive,t.shadowsEnabled?(this.renderer.shadowMap.type=mh,this.renderer.shadowMap.autoUpdate=!1,this.renderer.shadowMap.needsUpdate=!0):this.renderer.shadowMap.autoUpdate=!1,this.renderer.toneMappingExposure=e==="ultra"?1.18:1.15;const n=typeof window<"u"&&window.devicePixelRatio||1,s=Math.min(n,t.maxPixelRatio);this.renderer.setPixelRatio(s);const r=Math.max(1,this.container.clientWidth),a=Math.max(1,this.container.clientHeight);this.renderer.setSize(r,a)}disposeActiveUnitResources(){this.ultraMotionProxyActive=!1,this.liteProxyUnit&&(this.liteProxyUnit.dispose(this.cache),this.liteProxyUnit=null),this.liteProxyBuildResult=null,this.activeUnit&&(this.activeUnit.dispose(this.cache),this.activeUnit=null),this.buildResult=null,this.partById.clear(),this.ready=!1,this.teardownStudioLighting(),this.lightGroup.visible=!0,this.renderer.renderLists.dispose()}async activate(e,t,n,s){const r=++this.activationToken;this.active?(this.disposeActiveUnitResources(),this.vramMonitor.verifyAfterDispose(this.renderer,this.cache),this.vramMonitor.captureBaseline(this.renderer)):(this.savedExternalPixelRatio=this.renderer.getPixelRatio(),this.vramMonitor.captureBaseline(this.renderer)),this.active=!0,this.ready=!1,this.ultraMotionProxyActive=!1,this.activeUnitId=e,this.quality=t,this.explodeFactor=s.explode,this.renderMode=s.renderMode,this.physicsActive=s.physicsActive,this.subView=s.subView??(e==="lens"?1:0),this.integratedMode=s.integratedMode??(e==="integrated"||e==="camera_body"),this.selectedId=null,this.hoveredId=null,this.hiddenIds=new Set,this.isolatedId=null,this.frameSampleCount=0,this.avgFrameTimeMs=0,this.perfHud.setModeVisible(!0),this.applyQualityRendererCaps(t),this.setupStudioLighting(t);try{const o=await Kc(e);if(r!==this.activationToken||!this.active)return;const l=s.sectionActive?[this.clippingPlane]:[],c=await o.build(t,this.cache,{frameBudgetMs:14,clippingPlanes:l,subView:this.subView,integratedMode:this.integratedMode,isAborted:()=>r!==this.activationToken||!this.active});if(r!==this.activationToken||!this.active){o.dispose(this.cache);return}let u=null,d=null;if(t==="ultra"){const p=await Kc(e);if(r!==this.activationToken||!this.active){o.dispose(this.cache);return}const f=await p.build("standard_lite",this.cache,{frameBudgetMs:14,clippingPlanes:l,subView:this.subView,integratedMode:this.integratedMode,isAborted:()=>r!==this.activationToken||!this.active});if(r!==this.activationToken||!this.active){p.dispose(this.cache),o.dispose(this.cache);return}u=p,d=f}this.activeUnit=o,this.buildResult=c,this.liteProxyUnit=u,this.liteProxyBuildResult=d,this.partById.clear();for(let p=0;p<c.parts.length;p++)this.partById.set(c.parts[p].id,c.parts[p]);this.scene.add(c.rootGroup),o.setClippingPlanes?.(l),o.setSubView?.(this.subView),o.updateExplode(this.explodeFactor,!0),o.setVisualState(this.selectedId,this.hoveredId,this.hiddenIds,this.isolatedId,this.renderMode),o.setPhysicsVisible?.(!1),o.updateExplodeGuides?.(this.explodeFactor,!0),u&&d&&(this.scene.add(d.rootGroup),u.setClippingPlanes?.(l),u.setSubView?.(this.subView),u.updateExplode(this.explodeFactor,!0),u.setVisualState(this.selectedId,this.hoveredId,this.hiddenIds,this.isolatedId,this.renderMode),u.setPhysicsVisible?.(!1),u.updateExplodeGuides?.(this.explodeFactor,!0),d.rootGroup.visible=!0),this.fitUltraShadowRig(),this.contextLost||(this.shaderWarmupMs=this.cache.warmupShaders(this.renderer,this.scene,n)),d&&(d.rootGroup.visible=!1),this.ready=!0,this.vramMonitor.recordActivePeak(this.renderer),this.callbacks.onBuildComplete(e,this.getParts()),this.callbacks.onRequestRender(),this.refreshHud(!0)}catch(o){r===this.activationToken&&this.active&&console.error(`[UnitV2Runtime:${e}] Unit build failed:`,o)}}deactivate(){if(this.activationToken++,!this.active)return this.vramMonitor.getLastVerification();this.active=!1,this.activeUnitId=null,this.perfHud.setModeVisible(!1),this.disposeActiveUnitResources();const e=this.vramMonitor.verifyAfterDispose(this.renderer,this.cache);this.renderer.setPixelRatio(this.savedExternalPixelRatio);const t=Math.max(1,this.container.clientWidth),n=Math.max(1,this.container.clientHeight);return this.renderer.setSize(t,n),e}async setQuality(e,t,n){if(!this.active||!this.activeUnitId){this.quality=e;return}if(this.quality===e&&this.ready)return;const s=this.activeUnitId,r=this.selectedId,a=this.hoveredId,o=new Set(this.hiddenIds),l=this.isolatedId,c=this.renderMode,u=this.explodeFactor,d=this.physicsActive,p=this.subView,f=this.integratedMode;await this.activate(s,e,t,{explode:u,renderMode:c,physicsActive:d,sectionActive:n,subView:p,integratedMode:f}),this.active&&this.ready&&this.activeUnit&&this.activeUnitId===s&&(this.selectedId=r,this.hoveredId=a,this.hiddenIds=o,this.isolatedId=l,this.activeUnit.setVisualState(this.selectedId,this.hoveredId,this.hiddenIds,this.isolatedId,this.renderMode),this.activeUnit.updateExplode(this.explodeFactor,!0),this.activeUnit.updateExplodeGuides?.(this.explodeFactor,!0),this.liteProxyUnit&&(this.liteProxyUnit.setVisualState(this.selectedId,this.hoveredId,this.hiddenIds,this.isolatedId,this.renderMode),this.liteProxyUnit.updateExplode(this.explodeFactor,!0),this.liteProxyUnit.updateExplodeGuides?.(this.explodeFactor,!0)),this.fitUltraShadowRig(),this.callbacks.onRequestRender(),this.refreshHud(!0))}setSubView(e){this.subView=e,!(!this.activeUnit||!this.ready)&&(this.activeUnit.setSubView?.(e),this.activeUnit.updateExplodeGuides?.(this.explodeFactor,!0),this.liteProxyUnit&&(this.liteProxyUnit.setSubView?.(e),this.liteProxyUnit.updateExplodeGuides?.(this.explodeFactor,!0)),this.fitUltraShadowRig(),this.callbacks.onRequestRender(),this.refreshHud(!0))}syncExplode(e,t=!1){if(this.explodeFactor=e,!this.activeUnit||!this.ready)return!1;const n=this.activeUnit.updateExplode(e,t);return this.liteProxyUnit&&this.liteProxyUnit.updateExplode(e,t),n&&(this.activeUnit.updateExplodeGuides?.(e,!0),this.liteProxyUnit&&this.liteProxyUnit.updateExplodeGuides?.(e,!0),this.fitUltraShadowRig()),n}syncVisualState(e,t,n,s,r){const a=this.isolatedId!==s||this.renderMode!==r||this.hiddenIds.size!==n.size||this.hiddenIds!==n;this.selectedId=e,this.hoveredId=t,this.hiddenIds=n,this.isolatedId=s,this.renderMode=r,!(!this.activeUnit||!this.ready)&&(this.activeUnit.setVisualState(e,t,n,s,r),this.liteProxyUnit&&this.liteProxyUnit.setVisualState(e,t,n,s,r),a&&(this.explodeFactor>=.02&&(this.activeUnit.updateExplodeGuides?.(this.explodeFactor,!0),this.liteProxyUnit&&this.liteProxyUnit.updateExplodeGuides?.(this.explodeFactor,!0)),this.quality==="ultra"&&this.fitUltraShadowRig()))}syncSectionPlane(e){if(!this.activeUnit||!this.ready)return;const t=e?[this.clippingPlane]:[];this.activeUnit.setClippingPlanes?.(t),this.liteProxyUnit&&this.liteProxyUnit.setClippingPlanes?.(t),this.quality==="ultra"&&(this.renderer.shadowMap.needsUpdate=!0)}syncPhysicsActive(e){this.physicsActive=e,!(!this.activeUnit||!this.ready)&&(this.activeUnit.setPhysicsVisible?.(!1),this.liteProxyUnit&&this.liteProxyUnit.setPhysicsVisible?.(!1))}stepPhysics(e,t=.016){return!1}handleResize(){this.active&&(this.applyQualityRendererCaps(this.quality),this.refreshHud(!0))}setCameraDragging(e){this.raycaster.setCameraDragging(e)}pickHover(e,t,n,s){return this.raycaster.pickHover(e,t,this.buildResult?.raycastIndex??null,r=>n(r)||this.isPartCulledBySubView(r),s)}pickClick(e,t,n,s){return this.raycaster.pickClick(e,t,this.buildResult?.raycastIndex??null,r=>n(r)||this.isPartCulledBySubView(r),s)}render(e){if(!this.active||!this.ready||this.contextLost)return;this.isIdle=!1;const t=typeof performance<"u"?performance.now():0;this.renderer.render(this.scene,e);const n=typeof performance<"u"?performance.now():0;this.lastFrameTimeMs=n-t,this.frameSampleCount++,this.frameSampleCount===1||this.frameSampleCount<=4&&this.avgFrameTimeMs>this.lastFrameTimeMs*10?this.avgFrameTimeMs=this.lastFrameTimeMs:this.avgFrameTimeMs=this.avgFrameTimeMs*.8+this.lastFrameTimeMs*.2,this.lastDrawCalls=this.renderer.info.render.calls,this.lastTriangles=this.renderer.info.render.triangles,this.vramMonitor.recordActivePeak(this.renderer),this.refreshHud(!1)}markIdle(){!this.active||this.isIdle||(this.isIdle=!0,this.refreshHud(!0))}handleContextLost(){this.contextLost=!0}async handleContextRestored(e,t){this.contextLost=!1,this.contextLostRecoveryCount++,!(!this.active||!this.activeUnitId)&&(this.quality="standard",this.callbacks.onQualityFallback("standard"),await this.activate(this.activeUnitId,"standard",e,{explode:this.explodeFactor,renderMode:this.renderMode,physicsActive:this.physicsActive,sectionActive:t,subView:this.subView,integratedMode:this.integratedMode}))}togglePerfHud(){const e=this.perfHud.toggle();return e&&this.refreshHud(!0),e}setPerfHudVisible(e){this.perfHud.setExpanded(e),e&&this.refreshHud(!0)}getDiagnostics(){const e=this.renderer.info;return{unitId:this.activeUnitId,active:this.active,ready:this.ready,quality:this.quality,pixelRatio:this.renderer.getPixelRatio(),idle:this.isIdle,drawCalls:this.lastDrawCalls,triangles:this.lastTriangles,geometries:e.memory.geometries,textures:e.memory.textures,frameTimeMs:this.lastFrameTimeMs,avgFrameTimeMs:this.avgFrameTimeMs,shaderWarmupMs:this.shaderWarmupMs,buildStats:this.buildResult?.stats??null,vramCheck:this.vramMonitor.getLastVerification(),vramSwitchCount:this.vramMonitor.getSwitchCount(),cacheStats:this.cache.getStats(),raycastDiagnostics:this.raycaster.getDiagnostics(),contextLostRecoveryCount:this.contextLostRecoveryCount,renderFrameCount:this.frameSampleCount,motionProxyActive:this.ultraMotionProxyActive}}refreshHud(e){const t=this.renderer.info,n={unitId:this.activeUnitId??"v2",drawCalls:this.lastDrawCalls,maxDrawCallsBudget:this.activeUnit?.getMeta().maxDrawCallsBudget??100,triangles:this.lastTriangles,geometries:t.memory.geometries,textures:t.memory.textures,frameTimeMs:this.lastFrameTimeMs,avgFrameTimeMs:this.avgFrameTimeMs,quality:this.quality,pixelRatio:this.renderer.getPixelRatio(),idle:this.isIdle,shaderWarmupMs:this.shaderWarmupMs,buildStats:this.buildResult?.stats??null,vramCheck:this.vramMonitor.getLastVerification(),vramSwitchCount:this.vramMonitor.getSwitchCount()};this.perfHud.update(n,e)}dispose(){this.deactivate(),this.cache.disposeAll(),this.perfHud.dispose()}}const fx=new Set(["integrated","camera_body"]),Za=new Zt,ja=new w,Dr=new w;class px{container;renderer;camera;controls;callbacks;v2Runtime;clippingPlane;pointer=new he;pointerDownPos=new he;hoverRaycastPending=!1;mode="welcome";lensSection=1;sensorFabVolume=0;renderMode="solid";quality="ultra";sectionAxis="off";sectionValue=.5;targetExplode=0;currentExplode=0;physicsActive=!1;selectedPartId=null;hoveredPartId=null;isolatedPartId=null;hiddenPartIds=new Set;pendingSelectAfterHydrate=null;initialActivated=!1;camAnimActive=!1;camStartPos=new w;camEndPos=new w;camStartTarget=new w;camEndTarget=new w;camAnimT=0;wheelMotionFrames=0;prevCamPos=new w;prevCamQuat=new Zn;prevCamInitialized=!1;resizeObserver=null;boundHandleResize=()=>this.handleResize();contextLost=!1;contextLossCount=0;pageHidden=!1;recoveryOverlay;boundVisibilityChange=()=>this.handleVisibilityChange();boundContextLost=e=>this.handleContextLost(e);boundContextRestored=()=>this.handleContextRestored();clock=new ep;rafId=0;dirtyFrames=1;idleFrameStreak=0;disposed=!1;cachedDomRect=null;customSceneRenderer=null;constructor(e,t){this.container=e,this.callbacks=t,this.renderer=new V0({antialias:ns.antialias,alpha:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1}),this.renderer.debug.checkShaderErrors=!0,this.renderer.shadowMap.enabled=!1,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,ns.maxPixelRatio)),this.renderer.setSize(Math.max(1,e.clientWidth),Math.max(1,e.clientHeight)),this.renderer.setClearColor(16777215,1),this.renderer.localClippingEnabled=!0,this.renderer.toneMapping=gh,this.renderer.toneMappingExposure=1.15,this.renderer.outputColorSpace=Mt,e.appendChild(this.renderer.domElement),this.recoveryOverlay=document.createElement("div"),this.recoveryOverlay.className="gpu-recovery-overlay",this.recoveryOverlay.setAttribute("aria-hidden","true"),this.recoveryOverlay.innerHTML='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" opacity="0.22"/><path d="M21 12a9 9 0 0 0-9-9"/></svg>',e.appendChild(this.recoveryOverlay);const n=Math.max(1,e.clientWidth)/Math.max(1,e.clientHeight);this.camera=new nn(32,n,.85,4200),this.controls=new k0(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.065,this.controls.minDistance=7,this.controls.maxDistance=2600,this.controls.addEventListener("change",()=>{this.markDirty(2)}),this.clippingPlane=new Ln(new w(-1,0,0),1e4),this.v2Runtime=new dx(this.renderer,this.container,this.clippingPlane,{onBuildComplete:s=>{if(this.mode===s&&(this.v2Runtime.setSubView(this.getActiveSubViewForMode(this.mode)),this.v2Runtime.syncExplode(this.currentExplode),this.v2Runtime.syncPhysicsActive(this.physicsActive),this.v2Runtime.syncSectionPlane(this.sectionAxis!=="off"),this.v2Runtime.syncVisualState(this.selectedPartId,this.hoveredPartId,this.hiddenPartIds,this.isolatedPartId,this.renderMode),this.markDirty(2)),this.callbacks.onVisibilityChanged(),this.mode===s&&this.pendingSelectAfterHydrate&&this.v2Runtime.getPartById(this.pendingSelectAfterHydrate.partId)){const r=this.pendingSelectAfterHydrate;this.pendingSelectAfterHydrate=null,this.selectPart(r.partId,r.focusCamera)}},onRequestRender:()=>{this.markDirty(2)},onQualityFallback:s=>{this.quality=s,this.callbacks.onQualityChanged?.(s)}}),this.setCameraPreset("iso",!0),this.bindEvents(),this.wakeLoop(),queueMicrotask(()=>{!this.disposed&&!this.initialActivated&&!this.customSceneRenderer&&this.activateCurrentMode()})}activateCurrentMode(){this.initialActivated=!0;const e=this.mode;this.v2Runtime.activate(e,this.quality,this.camera,{explode:this.currentExplode,renderMode:this.renderMode,physicsActive:this.physicsActive,sectionActive:this.sectionAxis!=="off",subView:this.getActiveSubViewForMode(e),integratedMode:e==="integrated"||e==="camera_body"})}isV2Mode(e=this.mode){return tx(e)}getV2Runtime(){return this.v2Runtime}getMiShoeV2Runtime(){return this.v2Runtime}getActiveSubViewForMode(e){return e==="lens"?gn.studioOpen?-1:this.lensSection:e==="sensor_fab"?this.sensorFabVolume:0}getTotalPartCount(){let e=0;for(const t of nx())fx.has(t.unitId)||(e+=t.declaredPartCount);return e}async ensureAllHydrated(){return this.getTotalPartCount()}getPartsForCurrentMode(){return this.v2Runtime.getParts()}getSelectedPart(){return this.selectedPartId?this.v2Runtime.getPartById(this.selectedPartId):null}isPartHidden(e){return this.isolatedPartId&&this.isolatedPartId!==e?!0:this.hiddenPartIds.has(e)}isIsolated(){return this.isolatedPartId!==null}hasAnyHidden(){return this.isolatedPartId!==null||this.hiddenPartIds.size>0}getMode(){return this.mode}getLensSection(){return this.lensSection}refreshVisibility(){this.v2Runtime.setSubView(this.getActiveSubViewForMode(this.mode)),this.v2Runtime.syncVisualState(this.selectedPartId,this.hoveredPartId,this.hiddenPartIds,this.isolatedPartId,this.renderMode),this.updateClippingPlane(),this.markDirty(2)}setLensSection(e,t=!1){const n=this.lensSection!==e;if(this.lensSection=e,this.mode==="lens"){if(!n&&!t){this.setCameraPreset("iso",!1);return}this.selectedPartId=null,this.hoveredPartId=null,this.isolatedPartId=null,this.hiddenPartIds.clear(),this.v2Runtime.setSubView(e),this.v2Runtime.syncVisualState(null,null,this.hiddenPartIds,null,this.renderMode),this.updateClippingPlane(),this.setCameraPreset("iso",t),this.callbacks.onSelectPart(null),this.callbacks.onHoverPart(null),this.callbacks.onVisibilityChanged()}}getSensorFabVolume(){return this.sensorFabVolume}setSensorFabVolume(e,t=!1){const n=this.sensorFabVolume!==e;if(this.sensorFabVolume=e,this.mode==="sensor_fab"){if(!n&&!t){this.setCameraPreset("iso",!1);return}this.selectedPartId=null,this.hoveredPartId=null,this.isolatedPartId=null,this.hiddenPartIds.clear(),this.v2Runtime.setSubView(e),this.v2Runtime.syncVisualState(null,null,this.hiddenPartIds,null,this.renderMode),this.updateClippingPlane(),this.setCameraPreset("iso",t),this.callbacks.onSelectPart(null),this.callbacks.onHoverPart(null),this.callbacks.onVisibilityChanged()}}setMode(e,t=!1){this.mode===e&&this.initialActivated||(this.mode=e,e==="lens"&&(this.lensSection=1),this.selectedPartId=null,this.hoveredPartId=null,this.isolatedPartId=null,this.hiddenPartIds.clear(),this.pendingSelectAfterHydrate=null,this.updateClippingPlane(),this.setCameraPreset("iso",t),this.activateCurrentMode(),this.callbacks.onSelectPart(null),this.callbacks.onHoverPart(null),this.callbacks.onVisibilityChanged())}setExplode(e,t=!1){this.targetExplode=Ts.clamp(e,0,1),t&&(this.currentExplode=this.targetExplode,this.v2Runtime.syncExplode(this.currentExplode)),this.markDirty()}getExplode(){return this.targetExplode}setRenderMode(e){this.renderMode=e,this.applyVisibilityAndStyles()}setQuality(e){this.quality!==e&&(this.quality=e,this.initialActivated&&this.v2Runtime.setQuality(e,this.camera,this.sectionAxis!=="off"),this.callbacks.onQualityChanged?.(e),this.markDirty(2))}getQuality(){return this.quality}setSection(e,t){this.sectionAxis=e,typeof t=="number"&&(this.sectionValue=Ts.clamp(t,0,1)),this.updateClippingPlane()}setPhysicsActive(e){this.physicsActive=e,this.v2Runtime.syncPhysicsActive(e),this.markDirty()}selectPart(e,t=!0){if(e===null)this.pendingSelectAfterHydrate=null;else{if(!this.v2Runtime.getPartById(e)){this.v2Runtime.isReady()||(this.pendingSelectAfterHydrate={partId:e,focusCamera:t});return}if(this.v2Runtime.isPartCulledBySubView(e))return;this.pendingSelectAfterHydrate=null}if(e===this.selectedPartId)return;this.selectedPartId=e,e&&this.hiddenPartIds.has(e)&&this.hiddenPartIds.delete(e),e&&this.isolatedPartId&&this.isolatedPartId!==e&&(this.isolatedPartId=e),this.applyVisibilityAndStyles();const n=this.getSelectedPart();n&&t&&this.focusOnPart(n),this.callbacks.onSelectPart(n),this.callbacks.onVisibilityChanged()}setHoveredPartFromUI(e){this.hoveredPartId!==e&&(this.hoveredPartId=e,this.applyVisibilityAndStyles())}togglePartHidden(e){if(this.isolatedPartId){const t=this.isolatedPartId;this.isolatedPartId=null,e===t&&this.hiddenPartIds.add(e)}else this.hiddenPartIds.has(e)?this.hiddenPartIds.delete(e):this.hiddenPartIds.add(e);this.selectedPartId&&this.isPartHidden(this.selectedPartId)&&(this.selectedPartId=null,this.callbacks.onSelectPart(null)),this.applyVisibilityAndStyles(),this.callbacks.onVisibilityChanged()}toggleIsolateSelected(){this.selectedPartId&&(this.isolatedPartId===this.selectedPartId?this.isolatedPartId=null:(this.isolatedPartId=this.selectedPartId,this.hiddenPartIds.delete(this.selectedPartId)),this.applyVisibilityAndStyles(),this.callbacks.onVisibilityChanged())}resetAllVisibility(){this.isolatedPartId=null,this.hiddenPartIds.clear(),this.applyVisibilityAndStyles(),this.callbacks.onVisibilityChanged()}stepSelectedPart(e){const t=this.getPartsForCurrentMode();if(t.length===0)return;const n=t.findIndex(r=>r.id===this.selectedPartId),s=n<0?0:(n+e+t.length)%t.length;this.selectPart(t[s].id,!0)}setCameraPreset(e,t=!1){const n=this.targetExplode;let s,r;if(this.mode==="welcome"?(s=228+n*142,r=new w(0,1.5,0)):this.mode==="lens"?gn.studioOpen?(s=266+n*1080,r=new w(0+n*124,-2*(1-n),80+n*160)):this.lensSection===1?(s=186+n*625,r=new w(0+n*54,-1.5+n*10,47-n*102)):this.lensSection===2?(s=198+n*665,r=new w(0+n*64,-1-n*8,76.5+n*76)):(s=212+n*795,r=new w(0+n*96,-1+n*4,108+n*212)):this.mode==="camera_body"?(s=335+n*565,r=new w(-8-n*8,3+n*9,-10-n*18)):this.mode==="lcd"?(s=174+n*635,r=new w(14-n*4,-4+n*18,-32-n*14)):this.mode==="body"?(s=290+n*515,r=new w(-6+n*14,4-n*2,0+n*12)):this.mode==="mount"?(s=188+n*515,r=new w(2+n*8,-2-n*4,25+n*38)):this.mode==="evf"?(s=140+n*380,r=new w(1.5*(1-n)-n*14,38.6+n*1.5,-16.5+n*12)):this.mode==="mainboard"?(s=192+n*340,r=new w(-18*n,0+n*2,-22-n*4)):this.mode==="shutter"?(s=194+n*565,r=new w(6+n*14,-2.5+n*0,14+n*14)):this.mode==="integrated"?(s=390+n*1290,r=new w(-8-n*6,6+n*10,34+n*96)):this.mode==="sensor"?(s=168+n*475,r=new w(10*n,-2,-4-n*46)):this.mode==="battery"?(s=104+n*492,r=new w(n*4,n*-16,n*2)):this.mode==="cfexpress"?(s=136+n*475,r=new w(0,-.8+n*1.5,n*4)):this.mode==="bionz"?(s=122+n*245,r=new w(0,-1+n*1,0)):this.mode==="bionz_v2"?(s=142+n*320,r=new w(0,-2.6+n*1.2,0)):this.mode==="micro_v2"?(s=114+n*270,r=new w(0,-1-n*2,0)):this.mode==="mishoe"?(s=114+n*165,r=new w(0,-1.5-n*2.5,2.5+n*4)):this.mode==="mic"?(s=94+n*336,r=new w(0,1.5-n*2.5,.5+n*1.5)):this.mode==="sensor_fab"?this.sensorFabVolume===5?(s=248+n*238,r=new w(0,-1+n*1.5,2)):this.sensorFabVolume===4?(s=252+n*240,r=new w(0,-1.5+n*1.5,6.5)):this.sensorFabVolume===3?(s=248+n*238,r=new w(0,-1.5+n*1.5,6.5)):this.sensorFabVolume===2?(s=228+n*228,r=new w(0,2+n*1.5,.5)):(s=212+n*220,r=new w(0,1.5+n*2.5,-2.5)):this.mode==="drybox"?(s=242+n*212,r=new w(0,-3.5,-2*n)):(s=96+n*235,r=new w(20*n,1.5*n,-3-n*16)),this.mode!=="welcome"&&(s*=Ts.lerp(.7,.86,n)),this.camera.aspect<1){const l=this.mode==="welcome"?2.72:1.88;s*=Math.min(l,(this.mode==="welcome"?1.24:.92)/Math.max(this.camera.aspect,.44))}let a;if(this.mode==="welcome")switch(e){case"front":a=new w(0,2,s);break;case"side":a=new w(-s*.96,s*.08,s*.24);break;case"back":a=new w(s*.16,s*.12,-s*.98);break;case"iso":default:a=new w(-s*.16,s*.13,s*.98);break}else if(this.mode==="evf"){const l=n>.25?-.88:-.78,c=n>.25?.17:.24,u=n>.25?-.44:-.58;switch(e){case"front":a=new w(0,2,-s);break;case"side":a=new w(-s*1.05,4,0);break;case"back":a=new w(s*.65,s*.28,s*.72);break;case"iso":default:a=new w(s*l,s*c,s*u);break}}else if(this.mode==="mainboard"||this.mode==="lcd"){const l=this.mode==="lcd"?n>.25?.56:.42:n>.25?-.68:-.44,c=this.mode==="lcd"?n>.25?-.78:-.86:n>.25?-.66:-.84;switch(e){case"front":a=new w(0,2,-s);break;case"side":a=new w(-s*1.04,8,0);break;case"back":a=new w(s*.52,s*.3,s*.8);break;case"iso":default:a=new w(s*l,s*.26,s*c);break}}else switch(e){case"front":a=new w(0,4,s);break;case"side":a=new w(-s*1.04,8,0);break;case"back":a=new w(-s*.42,s*.26,-s*.88);break;case"iso":default:if(this.mode==="integrated"){const l=n>.25?-.82:-.62,c=n>.25?.23:.27,u=n>.25?.52:.74;a=new w(s*l,s*c,s*u)}else if(this.mode==="camera_body"){const l=n>.25?-.78:-.62,c=n>.25?.24:.27,u=n>.25?.57:.74;a=new w(s*l,s*c,s*u)}else if(this.mode==="lens"){const l=n>.25?-.84:-.68,c=n>.25?.48:.69;a=new w(s*l,s*.25,s*c)}else if(this.mode==="body"){const l=n>.25?-.74:-.64,c=n>.25?.62:.72;a=new w(s*l,s*.28,s*c)}else if(this.mode==="mount"){const l=n>.25?.8:.58,c=n>.25?.56:.76;a=new w(s*l,s*.22,s*c)}else if(this.mode==="shutter")a=new w(s*.52,s*.28,s*.81);else if(this.mode==="sensor"){const l=n>.25?.82:.64,c=n>.25?.26:.38,u=n>.25?.51:.72;a=new w(s*l,s*c,s*u)}else this.mode==="battery"||this.mode==="cfexpress"?a=new w(s*.58,s*.3,s*.76):this.mode==="bionz"?a=new w(s*.62,s*.46,s*.64):this.mode==="bionz_v2"?a=new w(s*.62,s*.36,s*.68):this.mode==="micro_v2"?a=new w(s*.64,s*.34,s*.68):this.mode==="mishoe"?a=new w(s*.58,s*.42,s*.7):this.mode==="mic"?a=new w(-s*.5,s*.36,s*.78):this.mode==="sensor_fab"?a=new w(s*.38,s*.44,s*.81):this.mode==="drybox"?a=new w(s*.56,s*.24,s*.79):a=new w(s*.68,s*.44,s*.66);break}const o=r.clone().add(a);t?(this.camAnimActive=!1,this.camera.position.copy(o),this.controls.target.copy(r),this.controls.update(),this.prevCamPos.copy(this.camera.position),this.prevCamQuat.copy(this.camera.quaternion),this.prevCamInitialized=!0,this.wheelMotionFrames=0,this.v2Runtime.setUltraMotionProxyActive(!1),this.markDirty()):this.animateCameraTo(o,r)}focusSensorFabStage(e,t=!1){if(this.mode!=="sensor_fab")return;if(e==="overview"||e==="v1_overview"||e==="v2_overview"||e==="v3_overview"||e==="v4_overview"||e==="v5_overview"){this.setCameraPreset("iso",t);return}const n=this.targetExplode,s=this.camera.aspect<1?Math.min(2.05,1.04/Math.max(this.camera.aspect,.48)):1;let r,a;if(e==="phases"){const l=(155+n*145)*s;r=new w(0,2.2+n*12,2.5+n*5),a=new w(l*.14,l*.46,l*.88)}else if(e==="litho"){const l=(138+n*135)*s;r=new w(0,-11.5-n*26,2),a=new w(l*.22,l*.34,l*.91)}else if(e==="variants"){const l=(104+n*85)*s;r=new w(10+n*8,3.6+n*18,-24-n*24),a=new w(l*.16,l*.34,l*.92)}else if(e==="v1_photonics"){const l=(118+n*110)*s;r=new w(-19-n*14,2.8+n*12,9.5+n*14),a=new w(l*.16,l*.42,l*.89)}else if(e==="v1_archs"){const l=(122+n*95)*s;r=new w(2,3.6+n*16,-20-n*22),a=new w(l*.12,l*.34,l*.93)}else if(e==="v1_duel"){const l=(128+n*110)*s;r=new w(7+n*8,2.6+n*14,4+n*8),a=new w(l*.14,l*.42,l*.89)}else if(e==="v1_wall"){const l=(146+n*125)*s;r=new w(8+n*6,-8.5-n*18,9+n*12),a=new w(l*.18,l*.34,l*.92)}else if(e==="v2_refine"){const l=(138+n*105)*s;r=new w(0,4.2+n*10,-21.5-n*14),a=new w(l*.14,l*.34,l*.93)}else if(e==="v2_mcz"){const l=(118+n*98)*s;r=new w(-22-n*6,4.8+n*11,-2-n*2),a=new w(l*.16,l*.34,l*.93)}else if(e==="v2_wafer"){const l=(138+n*110)*s;r=new w(-4-n*4,3.2+n*10,10+n*8),a=new w(l*.15,l*.38,l*.91)}else if(e==="v2_epi_ship"){const l=(150+n*120)*s;r=new w(14+n*5,-4.5-n*4,14+n*12),a=new w(l*.16,l*.32,l*.93)}else if(e==="v3_tcad"){const l=(136+n*105)*s;r=new w(0,3.5+n*14,-29-n*16),a=new w(l*.14,l*.36,l*.92)}else if(e==="v3_layout"){const l=(140+n*108)*s;r=new w(0,3+n*11,-12-n*3),a=new w(l*.15,l*.38,l*.91)}else if(e==="v3_opc"){const l=(136+n*105)*s;r=new w(0,3.2+n*8,5+n*14),a=new w(l*.16,l*.36,l*.92)}else if(e==="v3_maskfab"){const l=(158+n*128)*s;r=new w(0,-6.2-n*18,33.5+n*14),a=new w(l*.18,l*.34,l*.92)}else if(e==="v4_sti_dti"){const l=(142+n*108)*s;r=new w(0,3.6+n*15,-29-n*16),a=new w(l*.14,l*.36,l*.92)}else if(e==="v4_ppd_mev"){const l=(146+n*112)*s;r=new w(0,3.4+n*12,-12-n*3),a=new w(l*.15,l*.38,l*.91)}else if(e==="v4_vtg_gate"){const l=(138+n*105)*s;r=new w(0,3.4+n*10,5+n*14),a=new w(l*.16,l*.36,l*.92)}else if(e==="v4_pin_sab"){const l=(158+n*125)*s;r=new w(0,-6.5-n*11,33.5+n*14),a=new w(l*.18,l*.34,l*.92)}else if(e==="v5_w_m1"){const l=(142+n*108)*s;r=new w(0,3.6+n*14,-29-n*15),a=new w(l*.14,l*.36,l*.92)}else if(e==="v5_m2_m4"){const l=(146+n*112)*s;r=new w(0,3.4+n*11,-12-n*3),a=new w(l*.15,l*.38,l*.91)}else if(e==="v5_m5_wat"){const l=(138+n*105)*s;r=new w(0,3.4+n*9,5+n*12),a=new w(l*.16,l*.36,l*.92)}else{const l=(144+n*112)*s;r=new w(0,-6.5-n*10,29+n*14),a=new w(l*.18,l*.34,l*.92)}const o=r.clone().add(a);t?(this.camAnimActive=!1,this.camera.position.copy(o),this.controls.target.copy(r),this.controls.update(),this.markDirty()):this.animateCameraTo(o,r)}focusOnPart(e){this.v2Runtime.getPartWorldBox(e.id,Za)||Za.setFromObject(e.group),Za.getCenter(ja),Dr.subVectors(this.camera.position,this.controls.target);const t=this.mode==="micro"||this.mode==="micro_v2"||this.mode==="bionz"||this.mode==="bionz_v2"||this.mode==="mishoe"||this.mode==="mic",n=this.mode==="battery"||this.mode==="cfexpress",s=this.mode==="sensor_fab",r=this.mode==="drybox",a=t?72:s?68:r?148:n?98:this.mode==="evf"?112:this.mode==="integrated"||this.mode==="camera_body"?280:168,o=t?34:s?28:r?48:n?38:this.mode==="evf"?44:56,l=Math.min(Dr.length(),a);Dr.setLength(Math.max(l,o));const c=ja.clone().add(Dr);this.animateCameraTo(c,ja.clone())}wakeLoop(){this.idleFrameStreak=0,this.rafId===0&&!this.disposed&&!this.contextLost&&!this.pageHidden&&(this.clock.getDelta(),this.rafId=requestAnimationFrame(this.animate))}animateCameraTo(e,t){this.camStartPos.copy(this.camera.position),this.camEndPos.copy(e),this.camStartTarget.copy(this.controls.target),this.camEndTarget.copy(t),this.camAnimT=0,this.camAnimActive=!0,this.wakeLoop()}markDirty(e=3){this.dirtyFrames=Math.max(this.dirtyFrames,e),this.wakeLoop()}requestRenderFrame(){this.markDirty(2)}frameLensForOpticsStudio(e=!1){const t=new w(0,-36,74),n=new w(-348,56,178);this.refreshVisibility(),e?(this.camAnimActive=!1,this.camera.position.copy(n),this.controls.target.copy(t),this.controls.update(),this.markDirty()):this.animateCameraTo(n,t)}handleResize(){const e=Math.max(1,this.container.clientWidth),t=Math.max(1,this.container.clientHeight);this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.v2Runtime.handleResize(),this.cachedDomRect=this.renderer.domElement.getBoundingClientRect(),this.markDirty()}updateClippingPlane(){if(this.sectionAxis==="off"){this.clippingPlane.normal.set(-1,0,0),this.clippingPlane.constant=1e4,this.v2Runtime.syncSectionPlane(!1),this.markDirty();return}let e=-48,t=48;this.mode==="micro"?(e=-13,t=13):this.mode==="micro_v2"?(e=-16,t=16):this.mode==="battery"||this.mode==="cfexpress"?(e=-30,t=30):this.mode==="bionz"?this.sectionAxis==="x"?(e=-48,t=48):(e=-16,t=18):this.mode==="bionz_v2"?this.sectionAxis==="x"?(e=-24,t=24):(e=-26,t=22):this.mode==="mishoe"?this.sectionAxis==="x"?(e=-32,t=32):(e=-15,t=12):this.mode==="mic"?this.sectionAxis==="x"?(e=-30,t=30):(e=-16,t=20):this.mode==="sensor_fab"?this.sectionAxis==="x"?(e=-54,t=54):(e=-18,t=24):this.mode==="drybox"?this.sectionAxis==="x"?(e=-30,t=30):(e=-55,t=55):this.mode==="lens"?(e=-46,t=46):this.mode==="lcd"?this.sectionAxis==="x"?(e=-34,t=50):(e=-34,t=22):this.mode==="body"||this.mode==="camera_body"||this.mode==="integrated"?this.sectionAxis==="x"?(e=-74,t=60):(e=-42,t=64):this.mode==="mount"?this.sectionAxis==="x"?(e=-50,t=50):(e=-44,t=46):this.mode==="evf"?this.sectionAxis==="x"?(e=-24,t=24):(e=18,t=60):this.mode==="mainboard"?this.sectionAxis==="x"?(e=-50,t=50):(e=-36,t=36):this.mode==="shutter"&&(this.sectionAxis==="x"?(e=-48,t=50):(e=-35,t=35));const n=Ts.lerp(e,t,this.sectionValue);this.sectionAxis==="x"?(this.clippingPlane.normal.set(-1,0,0),this.clippingPlane.constant=n):(this.clippingPlane.normal.set(0,-1,0),this.clippingPlane.constant=n),this.v2Runtime.syncSectionPlane(!0),this.markDirty()}applyVisibilityAndStyles(){this.v2Runtime.syncVisualState(this.selectedPartId,this.hoveredPartId,this.hiddenPartIds,this.isolatedPartId,this.renderMode),this.markDirty(2)}bindEvents(){const e=this.renderer.domElement;this.cachedDomRect=e.getBoundingClientRect(),this.controls.addEventListener("start",()=>{this.v2Runtime.setCameraDragging(!0),this.wakeLoop()}),this.controls.addEventListener("end",()=>{this.v2Runtime.setCameraDragging(!1),this.markDirty(2)}),e.addEventListener("pointerdown",t=>{this.customSceneRenderer||(this.pointerDownPos.set(t.clientX,t.clientY),this.camAnimActive=!1,this.markDirty())}),e.addEventListener("pointermove",t=>{if(this.customSceneRenderer||t.pointerType==="touch")return;const n=this.cachedDomRect??(this.cachedDomRect=e.getBoundingClientRect());n.width<=0||n.height<=0||(this.pointer.x=(t.clientX-n.left)/n.width*2-1,this.pointer.y=-((t.clientY-n.top)/n.height)*2+1,this.hoverRaycastPending=!0,this.wakeLoop())}),e.addEventListener("pointerleave",()=>{this.customSceneRenderer||(this.hoverRaycastPending=!1,this.hoveredPartId!==null&&(this.hoveredPartId=null,this.container.classList.remove("is-hovering"),this.applyVisibilityAndStyles(),this.callbacks.onHoverPart(null)))}),e.addEventListener("pointerup",t=>{if(this.customSceneRenderer||Math.hypot(t.clientX-this.pointerDownPos.x,t.clientY-this.pointerDownPos.y)>5)return;const s=this.cachedDomRect??(this.cachedDomRect=e.getBoundingClientRect());if(s.width<=0||s.height<=0)return;this.pointer.x=(t.clientX-s.left)/s.width*2-1,this.pointer.y=-((t.clientY-s.top)/s.height)*2+1;const r=this.v2Runtime.pickClick(this.pointer,this.camera,a=>this.isPartHidden(a),this.sectionAxis!=="off"?this.clippingPlane:null);r?this.selectPart(r,!0):this.selectedPartId&&this.selectPart(null,!1)}),e.addEventListener("wheel",()=>{this.customSceneRenderer||(this.wheelMotionFrames=2,this.v2Runtime.setUltraMotionProxyActive(!0)),this.markDirty(2)},{passive:!0}),e.addEventListener("touchstart",()=>this.wakeLoop(),{passive:!0}),e.addEventListener("webglcontextlost",this.boundContextLost,!1),e.addEventListener("webglcontextrestored",this.boundContextRestored,!1),document.addEventListener("visibilitychange",this.boundVisibilityChange),window.addEventListener("resize",this.boundHandleResize),document.addEventListener("fullscreenchange",this.boundHandleResize),typeof ResizeObserver<"u"&&(this.resizeObserver=new ResizeObserver(this.boundHandleResize),this.resizeObserver.observe(this.container))}getRenderer(){return this.renderer}getContainer(){return this.container}setCustomSceneRenderer(e){this.customSceneRenderer=e,this.controls.enabled=e===null,this.hoverRaycastPending=!1,this.container.classList.remove("is-hovering"),e!==null?this.v2Runtime.isActive()&&!this.v2Runtime.isReady()&&(this.v2Runtime.deactivate(),this.initialActivated=!1):(this.prevCamPos.copy(this.camera.position),this.prevCamQuat.copy(this.camera.quaternion),this.prevCamInitialized=!0,this.v2Runtime.setUltraMotionProxyActive(!1),this.v2Runtime.isActive()||this.activateCurrentMode()),this.markDirty(3)}handleContextLost(e){e.preventDefault(),this.contextLost=!0,this.contextLossCount++,this.v2Runtime.handleContextLost(),this.recoveryOverlay.classList.add("is-visible")}handleContextRestored(){this.contextLost=!1,this.recoveryOverlay.classList.remove("is-visible"),this.cachedDomRect=this.renderer.domElement.getBoundingClientRect(),this.v2Runtime.handleContextRestored(this.camera,this.sectionAxis!=="off"),this.markDirty(2)}handleVisibilityChange(){this.pageHidden=document.hidden,!this.pageHidden&&!this.contextLost&&(this.clock.getDelta(),this.markDirty(3))}getGpuStats(){const e=this.renderer.info,t=this.v2Runtime.getDiagnostics();return{profile:ns,quality:this.quality,ultraHealthy:!0,pixelRatio:this.renderer.getPixelRatio(),contextLost:this.contextLost,contextLossCount:this.contextLossCount,calls:t.drawCalls,triangles:t.triangles,lines:e.render.lines,geometries:e.memory.geometries,textures:e.memory.textures,programs:e.programs?e.programs.length:0,hydratedParts:t.ready?this.v2Runtime.getParts().length:0,totalParts:this.getTotalPartCount(),megaBatches:0,kinematicBones:0}}updateHoverFromRaycast(){const e=this.v2Runtime.pickHover(this.pointer,this.camera,n=>this.isPartHidden(n),this.sectionAxis!=="off"?this.clippingPlane:null);if(e.skipped)return;const t=e.partId;t!==this.hoveredPartId&&(this.hoveredPartId=t,this.container.classList.toggle("is-hovering",t!==null),this.applyVisibilityAndStyles(),this.callbacks.onHoverPart(t))}animate=()=>{if(this.rafId=0,this.disposed||this.contextLost||this.pageHidden)return;const e=Math.min(this.clock.getDelta(),.05);if(this.customSceneRenderer){const l=this.customSceneRenderer(this.renderer,e)===!0;this.dirtyFrames>0&&this.dirtyFrames--,(l||this.dirtyFrames>0)&&(this.rafId=requestAnimationFrame(this.animate));return}this.hoverRaycastPending&&(this.hoverRaycastPending=!1,this.updateHoverFromRaycast());let t=this.dirtyFrames>0;const n=this.targetExplode-this.currentExplode;if(Math.abs(n)>5e-4?(this.currentExplode+=n*Math.min(1,e*10),t=!0):this.currentExplode!==this.targetExplode&&(this.currentExplode=this.targetExplode,t=!0),this.camAnimActive){this.camAnimT=Math.min(1,this.camAnimT+e*2.8);const l=1-Math.pow(1-this.camAnimT,3);this.camera.position.lerpVectors(this.camStartPos,this.camEndPos,l),this.controls.target.lerpVectors(this.camStartTarget,this.camEndTarget,l),this.camAnimT>=1&&(this.camAnimActive=!1),t=!0}this.controls.update()&&(t=!0);let r=!1;if(this.prevCamInitialized){const l=this.camera.position.distanceToSquared(this.prevCamPos),c=Math.abs(this.camera.quaternion.dot(this.prevCamQuat));r=l>1e-6||c<.9999995}else this.prevCamInitialized=!0;this.prevCamPos.copy(this.camera.position),this.prevCamQuat.copy(this.camera.quaternion);const a=this.wheelMotionFrames>0;a&&this.wheelMotionFrames--;const o=this.camAnimActive||r||a;o?(this.v2Runtime.setUltraMotionProxyActive(!0),t=!0):this.v2Runtime.isUltraMotionProxyActive()&&(this.v2Runtime.setUltraMotionProxyActive(!1),t=!0),t?(this.idleFrameStreak=0,this.v2Runtime.syncExplode(this.currentExplode),this.v2Runtime.render(this.camera),this.dirtyFrames>0&&this.dirtyFrames--):this.idleFrameStreak++,t||o||this.v2Runtime.isUltraMotionProxyActive()||this.hoverRaycastPending||this.camAnimActive||this.dirtyFrames>0||this.idleFrameStreak<1?this.rafId=requestAnimationFrame(this.animate):this.v2Runtime.markIdle()};dispose(){this.disposed=!0,this.rafId!==0&&(cancelAnimationFrame(this.rafId),this.rafId=0);const e=this.renderer.domElement;e.removeEventListener("webglcontextlost",this.boundContextLost),e.removeEventListener("webglcontextrestored",this.boundContextRestored),document.removeEventListener("visibilitychange",this.boundVisibilityChange),window.removeEventListener("resize",this.boundHandleResize),document.removeEventListener("fullscreenchange",this.boundHandleResize),this.resizeObserver?.disconnect(),this.v2Runtime.dispose(),this.recoveryOverlay.remove(),this.controls.dispose(),this.renderer.dispose()}}const mx="http://www.w3.org/2000/svg";function Es(i,e="0 0 24 24"){const t=document.createElementNS(mx,"svg");return t.setAttribute("viewBox",e),t.setAttribute("aria-hidden","true"),t.innerHTML=i,t}const ht={welcome:'<path d="M12 3l2.4 5.2L20 10.5l-5.6 2.3L12 18l-2.4-5.2L4 10.5l5.6-2.3z"/><circle cx="19" cy="18" r="1.6"/>',completeCamera:'<path d="M3 9.5a2 2 0 0 1 2-2h2.2l1.6-2.5h6.4l1.6 2.5H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8z"/><circle cx="12" cy="13.5" r="3.6"/><circle cx="12" cy="13.5" r="1.2" fill="currentColor" stroke="none"/>',cameraBodyOnly:'<path d="M3 9.5a2 2 0 0 1 2-2h2.2l1.6-2.5h6.4l1.6 2.5H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8z"/><rect x="9.4" y="11.6" width="5.2" height="3.6" rx="0.6"/>',lens:'<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7.5 6.5c1.6 3.2 1.6 7.8 0 11"/><path d="M16.5 6.5c-1.6 3.2-1.6 7.8 0 11"/>',mount:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.8"/><circle cx="12" cy="5.5" r="1" fill="currentColor" stroke="none"/>',shutter:'<rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="9.5" x2="21" y2="9.5"/><line x1="3" y1="14.5" x2="21" y2="14.5"/>',sensor:'<rect x="4" y="6" width="16" height="12" rx="2"/><rect x="8" y="9" width="8" height="6" rx="0.8"/>',mainboard:'<rect x="3" y="4" width="18" height="16" rx="2"/><rect x="8.5" y="8.5" width="7" height="7" rx="1"/><line x1="8.5" y1="12" x2="5" y2="12"/><line x1="15.5" y1="12" x2="19" y2="12"/>',evf:'<path d="M5 17V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8z"/><circle cx="12" cy="12" r="3.2"/>',lcd:'<rect x="4" y="5" width="16" height="11" rx="1.6"/><path d="M9 19h6"/><path d="M12 16v3"/>',body:'<path d="M3 8.5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M7 6.5V5h10v1.5"/>',chip:'<rect x="6" y="6" width="12" height="12" rx="1.8"/><rect x="9.5" y="9.5" width="5" height="5" rx="0.5"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>',pixel:'<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>',fab:'<circle cx="12" cy="12" r="8"/><line x1="4.5" y1="12" x2="19.5" y2="12"/><line x1="12" y1="4.5" x2="12" y2="19.5"/><circle cx="12" cy="12" r="3"/>',battery:'<rect x="3" y="7" width="16" height="10" rx="2"/><line x1="21" y1="10" x2="21" y2="14"/><path d="M12 9.2l-1.8 3h2.4l-1.4 2.8"/>',card:'<path d="M6 3h9l4 4v14H6z"/><line x1="9" y1="8" x2="9" y2="11"/><line x1="12" y1="8" x2="12" y2="11"/><line x1="15" y1="8" x2="15" y2="11"/>',mishoe:'<path d="M4 17h16v2.5H4z"/><path d="M6 17V9h12v8"/><line x1="9" y1="12.5" x2="15" y2="12.5"/>',mic:'<rect x="9" y="3.5" width="6" height="10" rx="3"/><path d="M6 11a6 6 0 0 0 12 0"/><line x1="12" y1="17" x2="12" y2="20.5"/><line x1="8.5" y1="20.5" x2="15.5" y2="20.5"/>',drybox:'<rect x="4" y="3.5" width="16" height="17" rx="2"/><line x1="4" y1="12" x2="20" y2="12"/><circle cx="16.5" cy="7.5" r="1.2"/>',playground:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/>',chevronDown:'<polyline points="6 9 12 15 18 9"/>',resetVis:'<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'},hu=[{heading:"イントロダクション",items:[{mode:"welcome",label:"ようこそ 3D立体",sub:"220パーツ実動作CNC光学装置",icon:ht.welcome}]},{heading:"カメラ全体ビュー",items:[{mode:"integrated",label:"α7 IV 完成カメラ",sub:"レンズ装着・全統合",icon:ht.completeCamera},{mode:"camera_body",label:"カメラボディ全体",sub:"マウント開放・内部透視",icon:ht.cameraBodyOnly}]},{heading:"主要光学・メカユニット",items:[{mode:"lens",label:"50mm F1.2 GM",sub:"大口径単焦点レンズ",icon:ht.lens},{mode:"mount",label:"Eマウント機構",sub:"18mmフランジ・接点",icon:ht.mount},{mode:"shutter",label:"シャッター機構",sub:"フォーカルプレーン",icon:ht.shutter},{mode:"sensor",label:"CMOS & IBIS",sub:"33MP裏面照射・5軸",icon:ht.sensor},{mode:"mainboard",label:"メイン基板",sub:"HDI多層・高速I/O",icon:ht.mainboard},{mode:"evf",label:"EVFファインダー",sub:"368万ドットOLED",icon:ht.evf},{mode:"lcd",label:"背面液晶LCD",sub:"バリアングル機構",icon:ht.lcd},{mode:"body",label:"マグネシウム筐体",sub:"防塵防滴フレーム",icon:ht.body}]},{heading:"半導体・極超解剖",items:[{mode:"bionz",label:"BIONZ XR (V1)",sub:"画像処理SoC解剖",icon:ht.chip},{mode:"bionz_v2",label:"BIONZ XR (V2)",sub:"2nm GAA・裏面電源",icon:ht.chip},{mode:"micro",label:"ピクセル構造 (V1)",sub:"マイクロレンズ・PD",icon:ht.pixel},{mode:"micro_v2",label:"ピクセル構造 (V2)",sub:"原子・ナノ構造拡大",icon:ht.pixel},{mode:"sensor_fab",label:"センサー製造工程",sub:"全6巻・2,110工程",icon:ht.fab}]},{heading:"電源・周辺・保管",items:[{mode:"battery",label:"NP-FZ100電源",sub:"リチウムイオン電池",icon:ht.battery},{mode:"cfexpress",label:"CFexpress 4.0",sub:"PCIe高速メモリー",icon:ht.card},{mode:"mishoe",label:"MIシュー",sub:"21ピン電子インターフェース",icon:ht.mishoe},{mode:"mic",label:"ECMマイク",sub:"デジタル音響収録",icon:ht.mic},{mode:"drybox",label:"防湿庫",sub:"光学機材保存環境",icon:ht.drybox}]}],Zo=new Map;for(const i of hu)for(const e of i.items)Zo.set(e.mode,e);const lh={0:[{id:"overview",label:"全景"},{id:"phases",label:"工程列"},{id:"litho",label:"露光機"},{id:"variants",label:"方式比較"}],1:[{id:"v1_overview",label:"全景"},{id:"v1_photonics",label:"光電変換"},{id:"v1_archs",label:"世代構造"},{id:"v1_duel",label:"BSI対決"},{id:"v1_wall",label:"微細限界"}],2:[{id:"v2_overview",label:"全景"},{id:"v2_refine",label:"高純度精製"},{id:"v2_mcz",label:"MCZ引上"},{id:"v2_wafer",label:"研磨加工"},{id:"v2_epi_ship",label:"エピ成長"}],3:[{id:"v3_overview",label:"全景"},{id:"v3_tcad",label:"TCAD"},{id:"v3_layout",label:"設計検証"},{id:"v3_opc",label:"OPC補正"},{id:"v3_maskfab",label:"マスク製造"}],4:[{id:"v4_overview",label:"全景"},{id:"v4_sti_dti",label:"DTI分離"},{id:"v4_ppd_mev",label:"埋込PD"},{id:"v4_vtg_gate",label:"縦型TG"},{id:"v4_pin_sab",label:"ピニング"}],5:[{id:"v5_overview",label:"全景"},{id:"v5_w_m1",label:"W/M1配線"},{id:"v5_m2_m4",label:"Cu多層"},{id:"v5_m5_wat",label:"最上層WAT"},{id:"v5_hb_cmp",label:"Cu-Cu接合"}]};class gx{handlers;currentMode="welcome";currentFabVol=0;paletteOpen=!1;assemblyTriggerBtn;assemblyIconHost;assemblyLabelEl;assemblyCountEl;paletteEl;paletteBtns=new Map;playgroundBtn;subViewHost;lensSubBar;lensSecBtns;v2SubBar;v2ToggleBtn;fabSubBar;fabVolBtns;fabStageRow;fabStageBtns=new Map;qualityBtns;explodeSlider;explodePctEl;sectionAxisBtns;sectionSliderWrap;sectionSlider;resetVisBtn;constructor(e,t){this.handlers=t;const n=document.createElement("header");n.className="studio-topbar";const s=document.createElement("div");s.className="studio-topbar-left";const r=document.createElement("div");r.className="assembly-selector-wrap",this.assemblyTriggerBtn=document.createElement("button"),this.assemblyTriggerBtn.type="button",this.assemblyTriggerBtn.className="assembly-trigger-pill",this.assemblyTriggerBtn.setAttribute("aria-haspopup","true"),this.assemblyTriggerBtn.setAttribute("aria-expanded","false"),this.assemblyIconHost=document.createElement("span"),this.assemblyIconHost.className="assembly-trigger-icon",this.assemblyLabelEl=document.createElement("span"),this.assemblyLabelEl.className="assembly-trigger-label",this.assemblyCountEl=document.createElement("span"),this.assemblyCountEl.className="assembly-trigger-badge";const a=Es(ht.chevronDown);a.classList.add("assembly-trigger-chev"),this.assemblyTriggerBtn.append(this.assemblyIconHost,this.assemblyLabelEl,this.assemblyCountEl,a),this.assemblyTriggerBtn.addEventListener("click",M=>{M.stopPropagation(),this.setPaletteOpen(!this.paletteOpen)}),this.paletteEl=document.createElement("div"),this.paletteEl.className="assembly-palette-popover",this.paletteEl.setAttribute("aria-hidden","true");for(const M of hu){const y=document.createElement("div");y.className="assembly-palette-section";const C=document.createElement("div");C.className="assembly-palette-heading",C.textContent=M.heading;const A=document.createElement("div");A.className="assembly-palette-grid";for(const R of M.items){const U=document.createElement("button");U.type="button",U.className="assembly-palette-item",U.dataset.mode=R.mode;const E=document.createElement("span");E.className="assembly-palette-ic",E.appendChild(Es(R.icon));const b=document.createElement("span");b.className="assembly-palette-txt",b.innerHTML=`<strong>${R.label}</strong><em>${R.sub}</em>`,U.append(E,b),U.addEventListener("click",()=>{this.setPaletteOpen(!1),this.syncMode(R.mode),t.onModeChange(R.mode)}),this.paletteBtns.set(R.mode,U),A.appendChild(U)}y.append(C,A),this.paletteEl.appendChild(y)}r.append(this.assemblyTriggerBtn,this.paletteEl),this.playgroundBtn=document.createElement("button"),this.playgroundBtn.type="button",this.playgroundBtn.className="playground-cta-pill",this.playgroundBtn.title="Play Ground — 全パーツ自由CAD組立＆技術者1000点採点",this.playgroundBtn.append(Es(ht.playground));const o=document.createElement("span");o.textContent="Play Ground",this.playgroundBtn.appendChild(o),this.playgroundBtn.addEventListener("click",()=>{this.setPaletteOpen(!1),this.handlers.onOpenPlayground?.()}),s.append(r,this.playgroundBtn),this.subViewHost=document.createElement("div"),this.subViewHost.className="studio-topbar-center",this.lensSubBar=document.createElement("div"),this.lensSubBar.className="studio-subbar is-hidden";const l=(M,y)=>{const C=document.createElement("button");return C.type="button",C.className=`studio-sub-btn${M===1?" is-active":""}`,C.textContent=y,C.addEventListener("click",()=>{this.syncLensSection(M),t.onLensSectionChange(M)}),C};this.lensSecBtns={1:l(1,"1: 後群・マウント"),2:l(2,"2: 中群・絞りXD"),3:l(3,"3: 前群・XAフード")},this.lensSubBar.append(this.lensSecBtns[1],this.lensSecBtns[2],this.lensSecBtns[3]),this.v2SubBar=document.createElement("div"),this.v2SubBar.className="studio-subbar is-hidden",this.v2ToggleBtn=document.createElement("button"),this.v2ToggleBtn.type="button",this.v2ToggleBtn.className="studio-sub-btn is-accent",this.v2ToggleBtn.textContent="V2 極超解剖へ切替",this.v2ToggleBtn.addEventListener("click",()=>{const M=this.currentMode==="micro"?"micro_v2":this.currentMode==="micro_v2"?"micro":this.currentMode==="bionz"?"bionz_v2":this.currentMode==="bionz_v2"?"bionz":null;M&&(this.syncMode(M),t.onModeChange(M))}),this.v2SubBar.appendChild(this.v2ToggleBtn),this.fabSubBar=document.createElement("div"),this.fabSubBar.className="studio-fab-subbar is-hidden";const c=document.createElement("div");c.className="studio-subbar";const u=M=>{const y=document.createElement("button");return y.type="button",y.className=`studio-sub-btn${M===0?" is-active":""}`,y.textContent=`Vol.${M}`,y.addEventListener("click",()=>{this.syncFabVolume(M),t.onSensorFabVolumeChange(M)}),y};this.fabVolBtns={0:u(0),1:u(1),2:u(2),3:u(3),4:u(4),5:u(5)},c.append(this.fabVolBtns[0],this.fabVolBtns[1],this.fabVolBtns[2],this.fabVolBtns[3],this.fabVolBtns[4],this.fabVolBtns[5]),this.fabStageRow=document.createElement("div"),this.fabStageRow.className="studio-subbar studio-fab-stages",this.fabSubBar.append(c,this.fabStageRow),this.rebuildFabStages(0),this.subViewHost.append(this.lensSubBar,this.v2SubBar,this.fabSubBar);const d=document.createElement("div");d.className="studio-topbar-right";const p=document.createElement("div");p.className="studio-seg-pill quality-pill",p.setAttribute("role","group"),p.setAttribute("aria-label","描画品質ティア");const f=(M,y,C)=>{const A=document.createElement("button");return A.type="button",A.className=`studio-seg-item quality-tier-${M}`,A.textContent=y,A.title=C,A.addEventListener("click",()=>{this.syncQuality(M),t.onQualityChange(M)}),A};this.qualityBtns={standard_lite:f("standard_lite","LITE","STD LITE v2 — 超軽量Dual-Atlas MatCap＋GPU分解（常時最高効率）"),ultra:f("ultra","ULTRA","ULTRA 2.5× — 視点移動中はLITE自動切替・静止瞬時に4K影＋1024pxソフトボックスULTRA描画（遅延ゼロ）")},p.append(this.qualityBtns.standard_lite,this.qualityBtns.ultra),d.append(p),n.append(s,this.subViewHost,d);const _=document.createElement("footer");_.className="studio-bottom-dock";const v=document.createElement("div");v.className="dock-cluster dock-explode",this.explodeSlider=document.createElement("input"),this.explodeSlider.type="range",this.explodeSlider.className="dock-slider",this.explodeSlider.min="0",this.explodeSlider.max="100",this.explodeSlider.step="1",this.explodeSlider.value="0",this.explodeSlider.setAttribute("aria-label","分解度スライダー"),this.explodeSlider.addEventListener("input",()=>{const M=Number(this.explodeSlider.value)/100;this.explodePctEl.textContent=`${Math.round(M*100)}%`,t.onExplodeChange(M)}),this.explodePctEl=document.createElement("span"),this.explodePctEl.className="dock-pct-badge",this.explodePctEl.textContent="0%",v.append(this.explodeSlider,this.explodePctEl);const g=document.createElement("div");g.className="dock-cluster dock-section";const m=document.createElement("div");m.className="studio-seg-pill dock-seg";const S=(M,y)=>{const C=document.createElement("button");return C.type="button",C.className=`studio-seg-item${M==="off"?" is-active":""}`,C.textContent=y,C.title=M==="off"?"断面カット OFF":`${y}軸 断面カット`,C.addEventListener("click",()=>{this.syncSectionAxis(M,Number(this.sectionSlider.value)/100),t.onSectionAxisChange(M)}),C};this.sectionAxisBtns={off:S("off","断面OFF"),x:S("x","X断面"),y:S("y","Y断面")},m.append(this.sectionAxisBtns.off,this.sectionAxisBtns.x,this.sectionAxisBtns.y),this.sectionSliderWrap=document.createElement("div"),this.sectionSliderWrap.className="dock-section-slider-wrap is-collapsed",this.sectionSlider=document.createElement("input"),this.sectionSlider.type="range",this.sectionSlider.className="dock-slider dock-slider-sm",this.sectionSlider.min="0",this.sectionSlider.max="100",this.sectionSlider.value="50",this.sectionSlider.setAttribute("aria-label","断面位置"),this.sectionSlider.addEventListener("input",()=>{t.onSectionValueChange(Number(this.sectionSlider.value)/100)}),this.sectionSliderWrap.appendChild(this.sectionSlider),g.append(m,this.sectionSliderWrap),this.resetVisBtn=document.createElement("button"),this.resetVisBtn.type="button",this.resetVisBtn.className="dock-icon-btn is-hidden-btn",this.resetVisBtn.title="非表示パーツをすべて再表示",this.resetVisBtn.setAttribute("aria-label","非表示パーツをすべて再表示"),this.resetVisBtn.appendChild(Es(ht.resetVis)),this.resetVisBtn.disabled=!0,this.resetVisBtn.addEventListener("click",()=>t.onResetVisibility()),_.append(v,g,this.resetVisBtn),document.addEventListener("click",M=>{this.paletteOpen&&!r.contains(M.target)&&this.setPaletteOpen(!1)}),window.addEventListener("keydown",M=>{M.key==="Escape"&&this.paletteOpen&&this.setPaletteOpen(!1)}),e.append(n,_),this.syncMode("welcome")}setPaletteOpen(e){this.paletteOpen=e,this.paletteEl.classList.toggle("is-open",e),this.paletteEl.setAttribute("aria-hidden",e?"false":"true"),this.assemblyTriggerBtn.setAttribute("aria-expanded",e?"true":"false"),this.assemblyTriggerBtn.classList.toggle("is-open",e)}rebuildFabStages(e){this.fabStageRow.replaceChildren(),this.fabStageBtns.clear();const t=lh[e]??lh[0];for(let n=0;n<t.length;n++){const s=t[n],r=document.createElement("button");r.type="button",r.className=`studio-sub-btn${n===0?" is-active":""}`,r.textContent=s.label,r.addEventListener("click",()=>{this.syncFabStage(s.id),this.handlers.onSensorFabStageChange(s.id)}),this.fabStageBtns.set(s.id,r),this.fabStageRow.appendChild(r)}}syncFabVolume(e){this.currentFabVol=e,[0,1,2,3,4,5].forEach(t=>{this.fabVolBtns[t].classList.toggle("is-active",t===e)}),this.rebuildFabStages(e)}syncFabStage(e){for(const[t,n]of this.fabStageBtns.entries())n.classList.toggle("is-active",t===e)}syncLensSection(e){[1,2,3].forEach(t=>{this.lensSecBtns[t].classList.toggle("is-active",t===e)})}syncQuality(e){["standard_lite","standard","high","ultra"].forEach(t=>{this.qualityBtns[t]?.classList.toggle("is-active",t===e)})}setExplodeValue(e){const t=Math.round(Math.max(0,Math.min(1,e))*100);this.explodeSlider.value=String(t),this.explodePctEl.textContent=`${t}%`}syncMode(e){this.currentMode=e;const t=Zo.get(e)??Zo.get("welcome");this.assemblyIconHost.replaceChildren(Es(t.icon)),this.assemblyLabelEl.textContent=t.label;for(const[s,r]of this.paletteBtns.entries())r.classList.toggle("is-active",s===e);this.lensSubBar.classList.toggle("is-hidden",e!=="lens");const n=e==="micro"||e==="micro_v2"||e==="bionz"||e==="bionz_v2";if(this.v2SubBar.classList.toggle("is-hidden",!n),n){const s=e==="micro_v2"||e==="bionz_v2";this.v2ToggleBtn.textContent=s?"V1 標準解剖へ戻る":"V2 極超解剖へ拡大",this.v2ToggleBtn.classList.toggle("is-active",s)}this.fabSubBar.classList.toggle("is-hidden",e!=="sensor_fab"),e==="sensor_fab"&&this.syncFabVolume(this.currentFabVol)}syncSectionAxis(e,t=.5){["off","x","y"].forEach(n=>{this.sectionAxisBtns[n].classList.toggle("is-active",n===e)}),this.sectionSliderWrap.classList.toggle("is-collapsed",e==="off"),this.sectionSlider.value=String(Math.round(Math.max(0,Math.min(1,t))*100))}syncPhysics(e){}syncOpticsStudio(e){}syncPlaygroundActive(e){this.playgroundBtn.classList.toggle("is-active",e)}syncFullscreen(e){}renderLayerRail(e,t,n,s,r){this.assemblyCountEl.textContent=e.length>0?`${e.length}p`:"",this.resetVisBtn.disabled=!r,this.resetVisBtn.classList.toggle("is-hidden-btn",!r)}syncHighlight(e,t){}}const _x=Object.freeze({__isLazyStub:!0,title:"",subtitle:"",category:"",summary:"",opticsAndPhysics:[],nextGenInnovation:"",specs:[],diagramType:"baffle"});function Nx(i){return _x}function uu(i){return!i||i.__isLazyStub===!0}const ch=new Map,Ja=new Map;function xx(i){const e=ch.get(i);if(e)return Promise.resolve(e);let t=Ja.get(i);if(t)return t;const n=s=>(ch.set(i,s),Ja.delete(i),s);switch(i){case"lens":t=ce(()=>import("./lensExplanations-CVIj2Kn6.js"),__vite__mapDeps([58,59,33]),import.meta.url).then(s=>n(s.LENS_EXPLANATIONS));break;case"mount":t=Promise.all([ce(()=>import("./mountExplanations-BzfMkKM6.js"),__vite__mapDeps([60,59,16]),import.meta.url),ce(()=>import("./mountUltra34ExplanationsA-DS-n8i88.js"),[],import.meta.url),ce(()=>import("./mountUltra34ExplanationsB-C99K2WhF.js"),[],import.meta.url)]).then(([s,r,a])=>n({...s.MOUNT_EXPLANATIONS,...r.MOUNT_ULTRA34_EXPLANATIONS_A,...a.MOUNT_ULTRA34_EXPLANATIONS_B}));break;case"shutter":t=Promise.all([ce(()=>import("./shutterExplanations-COwEmSMe.js"),__vite__mapDeps([61,59,19]),import.meta.url),ce(()=>import("./shutterUltra34ExplanationsA-BlYeoVYD.js"),[],import.meta.url),ce(()=>import("./shutterUltra34ExplanationsB-Be8hM50-.js"),[],import.meta.url),ce(()=>import("./shutterUltra36ExplanationsA-Ci5eL3OG.js"),[],import.meta.url),ce(()=>import("./shutterUltra36ExplanationsB-CecpLJJK.js"),[],import.meta.url)]).then(([s,r,a,o,l])=>n({...s.SHUTTER_EXPLANATIONS,...r.SHUTTER_ULTRA34_EXPLANATIONS_A,...a.SHUTTER_ULTRA34_EXPLANATIONS_B,...o.SHUTTER_ULTRA36_EXPLANATIONS_A,...l.SHUTTER_ULTRA36_EXPLANATIONS_B}));break;case"sensor":t=Promise.all([ce(()=>import("./explanations-BP4A1WOU.js"),__vite__mapDeps([62,43,47,59]),import.meta.url),ce(()=>import("./sensorNextGenExplanations-CHPfukQ0.js"),[],import.meta.url)]).then(([s,r])=>n({...s.MACRO_EXPLANATIONS,...r.SENSOR_NEXTGEN_EXPLANATIONS}));break;case"micro":t=Promise.all([ce(()=>import("./explanations-BP4A1WOU.js"),__vite__mapDeps([62,43,47,59]),import.meta.url),ce(()=>import("./microPixelNextGenExplanations-CR3tDPn4.js"),[],import.meta.url)]).then(([s,r])=>n({...s.MICRO_EXPLANATIONS,...r.MICRO_NEXTGEN_EXPLANATIONS}));break;case"micro_v2":t=Promise.all([ce(()=>import("./microPixelV2Explanations-Ds_g-StQ.js"),__vite__mapDeps([63,50,59]),import.meta.url),ce(()=>import("./microPixelV2DeepExplanations-CJhaoa5m.js"),[],import.meta.url)]).then(([s,r])=>n({...s.MICRO_V2_EXPLANATIONS,...r.MICRO_V2_DEEP_EXPLANATIONS}));break;case"mainboard":t=ce(()=>import("./mainboardExplanations-CFCwOEoo.js"),__vite__mapDeps([64,59,36]),import.meta.url).then(s=>n(s.MAINBOARD_EXPLANATIONS));break;case"evf":t=ce(()=>import("./evfExplanations-DI8qSmkq.js"),__vite__mapDeps([65,59,27]),import.meta.url).then(s=>n(s.EVF_EXPLANATIONS));break;case"lcd":t=Promise.all([ce(()=>import("./lcdExplanations-DVJLFMAP.js"),__vite__mapDeps([66,30,59]),import.meta.url),ce(()=>import("./lcdUltraOemExplanations-CI_uk3nO.js"),[],import.meta.url),ce(()=>import("./lcdUltraTechExplanations-CnjedjBN.js"),[],import.meta.url),ce(()=>import("./lcdUltraDeepExplanations-3u9mqkCF.js"),[],import.meta.url)]).then(([s,r,a,o])=>n({...s.LCD_EXPLANATIONS,...r.LCD_ULTRA_OEM_EXPLANATIONS,...a.LCD_ULTRA_TECH_EXPLANATIONS,...o.LCD_ULTRA_DEEP_EXPLANATIONS}));break;case"body":t=Promise.all([ce(()=>import("./bodyExplanations-kgPdKIc9.js"),__vite__mapDeps([67,59,22]),import.meta.url),ce(()=>import("./bodyNextGenExplanations--jRwbaL2.js"),[],import.meta.url),ce(()=>import("./bodyUltra25Explanations-CYatOCbR.js"),[],import.meta.url)]).then(([s,r,a])=>n({...s.BODY_EXPLANATIONS,...r.BODY_NEXTGEN_EXPLANATIONS,...a.BODY_ULTRA25_EXPLANATIONS}));break;case"battery":t=Promise.all([ce(()=>import("./batteryExplanations-BeDaaZxE.js"),__vite__mapDeps([68,59,7]),import.meta.url),ce(()=>import("./batteryUltra27Explanations-D4Vs8LwE.js"),[],import.meta.url),ce(()=>import("./batteryUltra30Explanations-BO5ebi-w.js"),[],import.meta.url),ce(()=>import("./batteryUltra31Explanations-I-s3ieDM.js"),[],import.meta.url)]).then(([s,r,a,o])=>n({...s.BATTERY_EXPLANATIONS,...r.BATTERY_ULTRA27_EXPLANATIONS,...a.BATTERY_ULTRA30_EXPLANATIONS,...o.BATTERY_ULTRA31_EXPLANATIONS}));break;case"cfexpress":t=Promise.all([ce(()=>import("./cfexpressExplanations-BMV4rYzd.js"),__vite__mapDeps([69,59,10]),import.meta.url),ce(()=>import("./cfexpressUltra27Explanations-nNi1XLCz.js"),[],import.meta.url),ce(()=>import("./cfexpressUltra28Explanations-xks2HbCY.js"),[],import.meta.url),ce(()=>import("./cfexpressUltra29Explanations-DzCl4c2e.js"),[],import.meta.url),ce(()=>import("./cfexpressUltra35Explanations-D5bgh2xi.js"),[],import.meta.url)]).then(([s,r,a,o,l])=>n({...s.CFEXPRESS_EXPLANATIONS,...r.CFEXPRESS_ULTRA27_EXPLANATIONS,...a.CFEXPRESS_ULTRA28_EXPLANATIONS,...o.CFEXPRESS_ULTRA29_EXPLANATIONS,...l.CFEXPRESS_ULTRA35_EXPLANATIONS}));break;case"bionz":t=Promise.all([ce(()=>import("./bionzExplanations-Dj7Xzik7.js"),__vite__mapDeps([70,59,39]),import.meta.url),ce(()=>import("./bionzExtraExplanations-BPBMjZCX.js"),[],import.meta.url)]).then(([s,r])=>n({...s.BIONZ_EXPLANATIONS,...r.BIONZ_EXTRA_EXPLANATIONS}));break;case"bionz_v2":t=Promise.all([ce(()=>import("./bionzV2Explanations-Bg1XzZ5k.js"),__vite__mapDeps([71,59,41]),import.meta.url),ce(()=>import("./bionzV2DeepExplanations-B7-A1i_E.js"),[],import.meta.url)]).then(([s,r])=>n({...s.BIONZ_V2_EXPLANATIONS,...r.BIONZ_V2_DEEP_EXPLANATIONS}));break;case"mishoe":t=ce(()=>import("./miShoeExplanations-CLmVffr4.js"),__vite__mapDeps([72,5]),import.meta.url).then(s=>n(s.MISHOE_EXPLANATIONS));break;case"mic":t=Promise.all([ce(()=>import("./micExplanations-C2aeFQw6.js"),__vite__mapDeps([73,59,12]),import.meta.url),ce(()=>import("./micUltra30Explanations-CAS6Gtxe.js"),[],import.meta.url),ce(()=>import("./micUltra31Explanations-Bj-XHzn_.js"),[],import.meta.url),ce(()=>import("./micUltra36Explanations-801w0TLM.js"),[],import.meta.url)]).then(([s,r,a,o])=>n({...s.MIC_EXPLANATIONS,...r.MIC_ULTRA30_EXPLANATIONS,...a.MIC_ULTRA31_EXPLANATIONS,...o.MIC_ULTRA36_EXPLANATIONS}));break;case"sensor_fab":t=Promise.all([ce(()=>import("./sensorFabExplanations-D2TQiUI1.js"),__vite__mapDeps([74,52,59]),import.meta.url),ce(()=>import("./sensorFabVol1Explanations-Bos_lokV.js"),[],import.meta.url),ce(()=>import("./sensorFabVol2Explanations-NmPUwAYx.js"),[],import.meta.url),ce(()=>import("./sensorFabVol3Explanations-Ci_LGE41.js"),[],import.meta.url),ce(()=>import("./sensorFabVol4Explanations-CaotSDfX.js"),[],import.meta.url),ce(()=>import("./sensorFabVol5Explanations-CECl6FgB.js"),[],import.meta.url)]).then(([s,r,a,o,l,c])=>n({...s.SENSOR_FAB_EXPLANATIONS,...r.SENSOR_FAB_VOL1_EXPLANATIONS,...a.SENSOR_FAB_VOL2_EXPLANATIONS,...o.SENSOR_FAB_VOL3_EXPLANATIONS,...l.SENSOR_FAB_VOL4_EXPLANATIONS,...c.SENSOR_FAB_VOL5_EXPLANATIONS}));break;case"drybox":t=Promise.all([ce(()=>import("./dryboxExplanationsA-B_9kghFZ.js"),__vite__mapDeps([75,59,14]),import.meta.url),ce(()=>import("./dryboxExplanationsB-0on_uNo3.js"),[],import.meta.url),ce(()=>import("./dryboxExplanationsC-QzcATb7E.js"),[],import.meta.url),ce(()=>import("./dryboxExplanationsD-BNU_Qg6S.js"),[],import.meta.url),ce(()=>import("./dryboxExplanationsE-BxNW7Dlv.js"),[],import.meta.url),ce(()=>import("./dryboxExplanationsF-BYZ4JlyK.js"),[],import.meta.url),ce(()=>import("./dryboxExplanationsG-CXIZrSb1.js"),[],import.meta.url)]).then(([s,r,a,o,l,c,u])=>n({...s.DRYBOX_EXPLANATIONS_A,...r.DRYBOX_EXPLANATIONS_B,...a.DRYBOX_EXPLANATIONS_C,...o.DRYBOX_EXPLANATIONS_D,...l.DRYBOX_EXPLANATIONS_E,...c.DRYBOX_EXPLANATIONS_F,...u.DRYBOX_EXPLANATIONS_G}));break;case"welcome":t=Promise.resolve(n({}));break}return Ja.set(i,t),t}async function vx(i){if(!uu(i.explanation))return i.explanation;const t=(await xx(i.subsystem))[i.id];return t?(i.explanation=t,t):i.explanation}let xi=null,Qa=null;function hh(){return xi?Promise.resolve(xi):(Qa||(Qa=ce(()=>import("./schematicsRegistry-CJduHdZb.js"),[],import.meta.url).then(i=>(xi=i.renderSchematicSvg,xi))),Qa)}const yx="http://www.w3.org/2000/svg";function du(i,e="0 0 24 24"){const t=document.createElementNS(yx,"svg");return t.setAttribute("viewBox",e),t.innerHTML=i,t}function qi(i,e=""){const t=document.createElement("button");return t.type="button",t.className="icon-btn",e&&(t.title=e,t.setAttribute("aria-label",e)),t.appendChild(du(i)),t}const ci={prev:'<polyline points="15 18 9 12 15 6"/>',next:'<polyline points="9 18 15 12 9 6"/>',isolate:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/>',hide:'<path d="M3 3l18 18"/><path d="M10.6 10.6a2.5 2.5 0 0 0 3.5 3.5"/><path d="M6.4 6.7C4 8.2 2.4 10.5 2 12c1.2 3.2 5 6.5 10 6.5 1.8 0 3.5-.5 4.9-1.2"/><path d="M9.8 5.7A10.6 10.6 0 0 1 12 5.5c5 0 8.8 3.3 10 6.5-.4 1.1-1.2 2.4-2.4 3.6"/>',close:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',rotate:'<path d="M21 12a9 9 0 1 1-2.64-6.36"/><polyline points="21 3 21 9 15 9"/>'};function Mx(i){return i.includes("ed")||i.includes("flint")||i.includes("focus-b-front")||i.includes("uv-cement")?"ed_chromatic":i.includes("xa")||i.includes("rear-element")||i.includes("rear-cell-spacer")||i.includes("front-meniscus")||i.includes("retaining-rings")||i.includes("potting")||i.includes("phase-align")?"xa_aspheric":i.includes("xd")||i.includes("focus-")||i.includes("guide")||i.includes("antirot")||i.includes("mr-")||i.includes("af-origin")||i.includes("mf-")||i.includes("control-rings")||i.includes("iris-iso-fpc")||i.includes("reinforcing-plates")||i.includes("center-join-ring")||i.includes("clutch-ball-rollers")?"floating_xd":i.includes("hood")||i.includes("baffle")||i.includes("filter")||i.includes("optical-spacers")||i.includes("lighttrap-tube")||i.includes("fluorine")||i.includes("nano-ar")||i.includes("sumi")||i.includes("lightfoil")?"nano_ar_baffle":"aperture_bokeh"}class bx{drawerEl;swatchEl;isolateBtn;tabBtns;bodyEl;lightboxEl;lightboxPanelEl;lightboxTitleEl;lightboxViewportEl;lightboxCanvasEl;lightboxZoomLabelEl;lightboxRotateBtn;handlers;renderSeq=0;activeTab="all";latestTitle="";latestSvg="";lbScale=1;lbPanX=0;lbPanY=0;lbRotated=!1;activePointers=new Map;pinchStartDist=0;pinchStartScale=1;dragLastX=0;dragLastY=0;lastTapMs=0;constructor(e,t){this.handlers=t,this.drawerEl=document.createElement("aside"),this.drawerEl.className="explanation-drawer",this.drawerEl.dataset.viewTab="all",this.drawerEl.setAttribute("aria-hidden","true");const n=document.createElement("div");n.className="drawer-mobile-handle",n.setAttribute("aria-hidden","true");const s=document.createElement("div");s.className="drawer-toolbar";const r=document.createElement("div");r.className="drawer-toolbar-left",this.swatchEl=document.createElement("span"),this.swatchEl.className="drawer-swatch-pill";const a=qi(ci.prev,"前のパーツ"),o=qi(ci.next,"次のパーツ");a.addEventListener("click",t.onPrev),o.addEventListener("click",t.onNext),r.append(this.swatchEl,a,o);const l=document.createElement("div");l.className="drawer-toolbar-right",this.isolateBtn=qi(ci.isolate,"このパーツのみ単独表示"),this.isolateBtn.addEventListener("click",t.onToggleIsolate);const c=qi(ci.hide,"このパーツを一時非表示");c.addEventListener("click",t.onHideCurrent);const u=qi(ci.close,"閉じる");u.addEventListener("click",t.onClose),l.append(this.isolateBtn,c,u),s.append(r,l);const d=document.createElement("div");d.className="drawer-tab-bar",d.setAttribute("role","tablist");const p=(y,C)=>{const A=document.createElement("button");return A.type="button",A.className=`drawer-tab-btn${y==="all"?" is-active":""}`,A.setAttribute("role","tab"),A.textContent=C,A.addEventListener("click",()=>this.setViewTab(y)),A};this.tabBtns={all:p("all","すべて"),diagram:p("diagram","図説"),explanation:p("explanation","解説")},d.append(this.tabBtns.all,this.tabBtns.diagram,this.tabBtns.explanation),this.bodyEl=document.createElement("div"),this.bodyEl.className="drawer-body",this.drawerEl.append(n,s,d,this.bodyEl),e.appendChild(this.drawerEl),this.lightboxEl=document.createElement("div"),this.lightboxEl.className="schematic-lightbox",this.lightboxEl.setAttribute("aria-hidden","true"),this.lightboxPanelEl=document.createElement("div"),this.lightboxPanelEl.className="schematic-lightbox-panel schematic-lightbox-card";const f=document.createElement("div");f.className="schematic-lightbox-header",this.lightboxTitleEl=document.createElement("div"),this.lightboxTitleEl.className="schematic-lightbox-title";const _=qi(ci.close,"図説拡大を閉じる");_.addEventListener("click",()=>this.closeLightbox()),f.append(this.lightboxTitleEl,_),this.lightboxViewportEl=document.createElement("div"),this.lightboxViewportEl.className="schematic-lightbox-viewport schematic-lightbox-stage",this.lightboxCanvasEl=document.createElement("div"),this.lightboxCanvasEl.className="schematic-lightbox-canvas",this.lightboxViewportEl.appendChild(this.lightboxCanvasEl);const v=document.createElement("div");v.className="schematic-lightbox-controls";const g=document.createElement("button");g.type="button",g.className="lb-ctrl-btn",g.textContent="−",g.title="縮小",g.addEventListener("click",()=>this.stepLightboxZoom(-.35)),this.lightboxZoomLabelEl=document.createElement("button"),this.lightboxZoomLabelEl.type="button",this.lightboxZoomLabelEl.className="lb-ctrl-btn lb-ctrl-reset",this.lightboxZoomLabelEl.textContent="100%",this.lightboxZoomLabelEl.title="倍率リセット",this.lightboxZoomLabelEl.addEventListener("click",()=>this.resetLightboxTransform());const m=document.createElement("button");m.type="button",m.className="lb-ctrl-btn",m.textContent="＋",m.title="拡大",m.addEventListener("click",()=>this.stepLightboxZoom(.4));const S=document.createElement("button");S.type="button",S.className="lb-ctrl-btn lb-ctrl-accent",S.textContent="見やすい 1.8×",S.title="スマホで文字が読みやすい1.8倍ズーム切替",S.addEventListener("click",()=>{Math.abs(this.lbScale-1.8)<.15?this.resetLightboxTransform():(this.lbScale=1.8,this.lbPanX=0,this.lbPanY=0,this.applyLightboxTransform())}),this.lightboxRotateBtn=document.createElement("button"),this.lightboxRotateBtn.type="button",this.lightboxRotateBtn.className="lb-ctrl-btn lb-ctrl-rotate",this.lightboxRotateBtn.append(du(ci.rotate));const M=document.createElement("span");M.textContent="90°回転",this.lightboxRotateBtn.append(M),this.lightboxRotateBtn.title="縦長スマホ画面いっぱいに90°横向き回転表示",this.lightboxRotateBtn.addEventListener("click",()=>{this.lbRotated=!this.lbRotated,this.lbScale=1,this.lbPanX=0,this.lbPanY=0,this.applyLightboxTransform()}),v.append(g,this.lightboxZoomLabelEl,m,S,this.lightboxRotateBtn),this.lightboxPanelEl.append(f,this.lightboxViewportEl,v),this.lightboxEl.appendChild(this.lightboxPanelEl),this.bindLightboxGestures(),this.lightboxEl.addEventListener("click",y=>{y.target===this.lightboxEl&&this.closeLightbox()}),window.addEventListener("keydown",y=>{y.key==="Escape"&&this.lightboxEl.classList.contains("is-open")&&this.closeLightbox()}),e.appendChild(this.lightboxEl)}bindLightboxGestures(){const e=this.lightboxViewportEl;e.addEventListener("pointerdown",n=>{if(e.setPointerCapture(n.pointerId),this.activePointers.set(n.pointerId,{x:n.clientX,y:n.clientY}),this.activePointers.size===1){const s=performance.now();s-this.lastTapMs<280?(this.lbScale>1.25?this.resetLightboxTransform():(this.lbScale=1.85,this.lbPanX=0,this.lbPanY=0,this.applyLightboxTransform()),this.lastTapMs=0):this.lastTapMs=s,this.dragLastX=n.clientX,this.dragLastY=n.clientY}else if(this.activePointers.size===2){const s=Array.from(this.activePointers.values());this.pinchStartDist=Math.hypot(s[1].x-s[0].x,s[1].y-s[0].y)||1,this.pinchStartScale=this.lbScale}}),e.addEventListener("pointermove",n=>{if(this.activePointers.has(n.pointerId)){if(this.activePointers.set(n.pointerId,{x:n.clientX,y:n.clientY}),this.activePointers.size===2){const s=Array.from(this.activePointers.values()),r=Math.hypot(s[1].x-s[0].x,s[1].y-s[0].y)||1;this.lbScale=Math.max(.8,Math.min(4.5,this.pinchStartScale*(r/this.pinchStartDist))),this.applyLightboxTransform()}else if(this.activePointers.size===1){const s=n.clientX-this.dragLastX,r=n.clientY-this.dragLastY;this.dragLastX=n.clientX,this.dragLastY=n.clientY,(this.lbScale>1.02||this.lbRotated)&&(this.lbPanX+=s,this.lbPanY+=r,this.applyLightboxTransform())}}});const t=n=>{if(this.activePointers.delete(n.pointerId),this.activePointers.size===1){const s=Array.from(this.activePointers.values())[0];this.dragLastX=s.x,this.dragLastY=s.y}};e.addEventListener("pointerup",t),e.addEventListener("pointercancel",t),e.addEventListener("wheel",n=>{n.preventDefault();const s=n.deltaY<0?.22:-.22;this.stepLightboxZoom(s)},{passive:!1})}stepLightboxZoom(e){this.lbScale=Math.max(.8,Math.min(4.5,this.lbScale+e)),this.lbScale<=1.01&&(this.lbPanX=0,this.lbPanY=0),this.applyLightboxTransform()}resetLightboxTransform(){this.lbScale=1,this.lbPanX=0,this.lbPanY=0,this.applyLightboxTransform()}applyLightboxTransform(){const e=420*this.lbScale;this.lbPanX=Math.max(-e,Math.min(e,this.lbPanX)),this.lbPanY=Math.max(-e,Math.min(e,this.lbPanY)),this.lightboxPanelEl.classList.toggle("is-rotated",this.lbRotated),this.lightboxRotateBtn.classList.toggle("is-active",this.lbRotated);const t=this.lbRotated?" rotate(90deg)":"";this.lightboxCanvasEl.style.transform=`translate3d(${this.lbPanX.toFixed(1)}px, ${this.lbPanY.toFixed(1)}px, 0) scale(${this.lbScale.toFixed(3)})${t}`,this.lightboxZoomLabelEl.textContent=`${Math.round(this.lbScale*100)}%`}getViewTab(){return this.activeTab}setViewTab(e){this.activeTab=e,this.drawerEl.dataset.viewTab=e,["all","diagram","explanation"].forEach(t=>{this.tabBtns[t].classList.toggle("is-active",t===e),this.tabBtns[t].setAttribute("aria-selected",t===e?"true":"false")}),this.bodyEl.scrollTop=0}setLightboxOpen(e,t=!1){if(!e){this.closeLightbox();return}this.latestSvg&&this.openLightbox(this.latestTitle,this.latestSvg,t)}openLightbox(e,t,n=!1){if(!t)return;const s=t.replace(/\bid="([^"]+)"/g,'id="$1-lb"').replace(/url\(#([^)]+)\)/g,"url(#$1-lb)");this.lightboxTitleEl.textContent=e,this.lightboxCanvasEl.innerHTML=s,this.lbScale=1,this.lbPanX=0,this.lbPanY=0,this.lbRotated=n,this.activePointers.clear(),this.applyLightboxTransform(),this.lightboxEl.classList.add("is-open"),this.lightboxEl.setAttribute("aria-hidden","false")}closeLightbox(){this.lightboxEl.classList.remove("is-open"),this.lightboxEl.setAttribute("aria-hidden","true"),this.lightboxCanvasEl.replaceChildren(),this.activePointers.clear()}renderPopulatedPart(e,t,n){const s=t.specs.map(b=>`
          <div class="exp-spec-row">
            <span class="exp-spec-label">${b.label}</span>
            <span class="exp-spec-value">${b.value}</span>
          </div>`).join(""),r=t.opticsAndPhysics.map(b=>`<li>${b}</li>`).join(""),a=t.plainAnalogy?`
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
        </button>`:"",c=this.handlers.onSwitchMode?e.subsystem==="micro"?{target:"micro_v2",label:"V2 極超解剖図へ（さらに微細な原子・ナノ構造を拡大）",isV2Target:!0}:e.subsystem==="micro_v2"?{target:"micro",label:"V1 ピクセル配列図へ戻る",isV2Target:!1}:e.subsystem==="bionz"?{target:"bionz_v2",label:"V2 極超解剖図へ（2nm GAA・裏面電源を極超拡大）",isV2Target:!0}:e.subsystem==="bionz_v2"?{target:"bionz",label:"V1 BIONZ XR パッケージ図へ戻る",isV2Target:!1}:e.subsystem==="sensor"?{target:"sensor_fab",label:"センサー製造工程（全2,110工程 3D解剖図）を見る",isV2Target:!0}:e.subsystem==="sensor_fab"?e.id==="fab0-p11-sensor-unit-ibis"||e.id==="fab0-p09-dicing-package"?{target:"sensor",label:"フルサイズセンサー ＆ 5軸IBIS 3D解剖図へ移動",isV2Target:!1}:e.id==="fab0-p12-camera-integration"?{target:"integrated",label:"完成ミラーレス一眼カメラ全体 3D解剖図へ移動",isV2Target:!1}:{target:"micro_v2",label:"ピクセル極超解剖図 V2（ナノ構造拡大）へ移動",isV2Target:!0}:e.subsystem==="drybox"&&e.id==="db-camera-lens-showcase"?{target:"integrated",label:"収納カメラ本体＆50mm F1.2 全体3D解剖図へ移動",isV2Target:!1}:null:null,u=c?`
        <button type="button" class="exp-optics-cta exp-v2-cta exp-block-text${c.isV2Target?" is-v2-target":""}" data-switch-mode="${c.target}">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            ${c.isV2Target?'<path d="M12 2.5l2.1 6.2 6.4 3.3-6.4 3.3L12 21.5l-2.1-6.2-6.4-3.3 6.4-3.3z"/>':'<polyline points="15 18 9 12 15 6"/><line x1="9" y1="12" x2="20" y2="12"/>'}
          </svg>
          <span>${c.label}</span>
        </button>`:"",d=this.handlers.onSwitchFabVolume&&e.subsystem==="sensor_fab"?(e.fabVolume??0)===0?{targetVol:1,label:"第1巻：超入門・センサーのしくみと2026年最新アーキテクチャへ進む"}:(e.fabVolume??0)===1?{targetVol:2,label:"第2巻：フェーズ1 砂から超純度エピタキシャルウェーハまで（全60工程）へ進む"}:(e.fabVolume??0)===2?{targetVol:3,label:"第3巻：フェーズ2 センサー設計とフォトマスク製造（全50工程・96枚）へ進む"}:(e.fabVolume??0)===3?{targetVol:4,label:"第4巻：フェーズ3 画素ウェーハ前工程FEOL（全380工程・25マスク）へ進む"}:(e.fabVolume??0)===4?{targetVol:5,label:"第5巻：フェーズ4 画素ウェーハ配線工程BEOL（全210工程・Cu5＋Al1）へ進む"}:{targetVol:0,label:"第0巻：全2,110工程マップ（P1–P12・L01–L12）へ戻る"}:null,p=d?`
        <button type="button" class="exp-optics-cta exp-block-text" data-switch-fab-vol="${d.targetVol}">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4" y="4" width="16" height="16" rx="2.5"/>
            <path d="M9 8h6M9 12h6M9 16h4"/>
          </svg>
          <span>${d.label}</span>
        </button>`:"",f=xi?xi(t.diagramType):"",_=b=>b.includes('data-evf-hd="1"')||b.includes('data-lcd-hd="1"')||b.includes('data-fab-hd="1"')||b.includes("data-bionz-diagram=")||b.includes('data-bionz-v2-hd="1"')||b.includes("data-bionz-tier=")||b.includes('data-sensor-hd="1"')||b.includes('data-mount-hd="1"')||b.includes('data-shutter-hd="1"')||b.includes('data-drybox-hd="1"')||b.includes('data-welcome-hd="1"'),v=_(f),g=b=>{if(e.subsystem!=="bionz"&&e.subsystem!=="bionz_v2")return"";const L=e.subsystem==="bionz_v2",F=L?[{id:"pkg35d",code:"3.5D",label:"光/実装"},{id:"beol",code:"BEOL",label:"配線層"},{id:"feol",code:"FEOL",label:"GAA/14A"},{id:"isp_mem",code:"SoC",label:"AI/ISP"},{id:"bspdn_cool",code:"BACK",label:"裏面/冷"}]:[{id:"L1",code:"L1",label:"蓋・PoP"},{id:"L2",code:"L2",label:"ISP/AI"},{id:"L3",code:"L3",label:"FEOL"},{id:"L4",code:"L4",label:"ABF基板"},{id:"L5",code:"L5",label:"電源・基板"},{id:"L6",code:"L6",label:"周辺IC"}],O=b.match(/data-bionz-zone="([^"]+)"/),V=O?O[1]:null,$=L?"BIONZ V2 極超積層マップ (105)":"BIONZ V1 パッケージ階層 (70)",B=F.map(X=>`<span class="bionz-stack-step${V===X.id?" is-active":""}" data-stack-zone="${X.id}"><span class="bionz-stack-code">${X.code}</span><span class="bionz-stack-name">${X.label}</span></span>`).join("");return`<div class="bionz-stack-strip"><div class="bionz-stack-strip-head">${$}</div><div class="bionz-stack-steps">${B}</div></div>`},m=g(f),S=t.references&&t.references.length>0?`
      <div class="exp-section exp-block-text exp-references-section">
        <div class="exp-section-heading">出典・準拠規格・技術リファレンス</div>
        <ol class="exp-ref-list">
          ${t.references.map((b,L)=>`<li class="exp-ref-item"><span class="exp-ref-idx">[${L+1}]</span><span class="exp-ref-text">${b}</span></li>`).join("")}
        </ol>
      </div>`:"";this.latestTitle=t.title,this.latestSvg=f,this.bodyEl.innerHTML=`
      <div class="exp-header-block">
        <div class="exp-category">${t.category}</div>
        <h2 class="exp-title">${t.title}</h2>
        <div class="exp-subtitle">${t.subtitle}</div>
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

      ${a}

      <p class="exp-summary exp-block-text">${t.summary}</p>

      <div class="exp-section exp-block-text">
        <div class="exp-section-heading">光学的・科学的原理</div>
        <ul class="exp-list">${r}</ul>
        ${o}
      </div>

      <div class="exp-section exp-block-text">
        <div class="exp-section-heading">最新世代（2024–2026）の技術革新</div>
        <div class="exp-innovation">${t.nextGenInnovation}</div>
      </div>

      <div class="exp-section exp-block-text">
        <div class="exp-section-heading">主要物理・設計諸元</div>
        <div class="exp-specs">${s}</div>
      </div>

      ${S}
    `;const M=this.bodyEl.querySelector("[data-schematic-box]"),y=this.bodyEl.querySelector("[data-schematic-content]"),C=this.bodyEl.querySelector("[data-stack-strip-host]");!xi&&M&&y&&hh().then(b=>{n!==this.renderSeq||!M.isConnected||(this.latestSvg=b(t.diagramType),y.innerHTML=this.latestSvg,M.classList.toggle("is-hd-schematic",_(this.latestSvg)),C&&(C.innerHTML=g(this.latestSvg)))});const A=(b=!1)=>{this.latestSvg&&this.openLightbox(t.title,this.latestSvg,b)};y?.addEventListener("click",()=>A(!1)),y?.addEventListener("keydown",b=>{(b.key==="Enter"||b.key===" ")&&(b.preventDefault(),A(!1))}),this.bodyEl.querySelector("[data-diagram-open-zoom]")?.addEventListener("click",()=>A(!1)),this.bodyEl.querySelector("[data-diagram-open-landscape]")?.addEventListener("click",()=>A(!0));const R=this.bodyEl.querySelector("[data-open-optics-motion]");R&&this.handlers.onOpenOpticsMotion&&R.addEventListener("click",()=>{this.handlers.onOpenOpticsMotion?.(Mx(e.id),e.id)});const U=this.bodyEl.querySelector("[data-switch-fab-vol]");U&&d&&this.handlers.onSwitchFabVolume&&U.addEventListener("click",()=>{this.handlers.onSwitchFabVolume?.(d.targetVol)});const E=this.bodyEl.querySelector("[data-switch-mode]");E&&c&&this.handlers.onSwitchMode&&E.addEventListener("click",()=>{this.handlers.onSwitchMode?.(c.target)}),this.bodyEl.scrollTop=0}show(e,t){const n=++this.renderSeq;if(this.swatchEl.style.backgroundColor=e.swatchColor,this.isolateBtn.classList.toggle("is-active",t),this.drawerEl.classList.add("is-open"),this.drawerEl.setAttribute("aria-hidden","false"),!uu(e.explanation)){this.renderPopulatedPart(e,e.explanation,n);return}Promise.all([vx(e),hh()]).then(([s])=>{n!==this.renderSeq||!this.drawerEl.classList.contains("is-open")||this.renderPopulatedPart(e,s,n)})}setIsolatedState(e){this.isolateBtn.classList.toggle("is-active",e)}hide(){this.renderSeq++,this.closeLightbox(),this.drawerEl.classList.remove("is-open"),this.drawerEl.setAttribute("aria-hidden","true"),window.setTimeout(()=>{this.drawerEl.classList.contains("is-open")||this.bodyEl.replaceChildren()},360)}}function hi(i=3){return new Promise(e=>{let t=0;const n=()=>{t++,t>=i?e():requestAnimationFrame(n)};requestAnimationFrame(n)})}class Sx{host;constructor(e){this.host=e}async waitUnitReady(e=15e3){const t=performance.now();for(;!this.host.isUnitReady()&&performance.now()-t<e;)await new Promise(n=>setTimeout(n,12));await hi(1)}async waitSchematicHydrated(e=8e3){const t=performance.now();for(;performance.now()-t<e;){const n=this.host.appRoot.querySelector(".schematic-stage .exp-diagram-content");if(n&&n.querySelector("svg"))break;await new Promise(s=>setTimeout(s,15))}await hi(1)}async captureDirectCanvasDataUrl(e="png",t=.92){const n=this.host.appRoot.querySelector("#viewport canvas");if(!n)return null;this.host.requestRenderFrame(),await hi(1);const s=e==="webp"?"image/webp":e==="jpeg"?"image/jpeg":"image/png";return n.toDataURL(s,t)}measureClip(e){if(!e)return null;const t=this.host.appRoot.querySelector(e);if(!t)return null;const n=t.getBoundingClientRect();if(n.width<2||n.height<2)return null;const s=4,r=Math.max(0,Math.floor(n.left-s)),a=Math.max(0,Math.floor(n.top-s)),o=Math.min(window.innerWidth,Math.ceil(n.right+s)),l=Math.min(window.innerHeight,Math.ceil(n.bottom+s));return{x:r,y:a,width:Math.max(1,o-r),height:Math.max(1,l-a)}}reset(){const e=this.host.appRoot;delete e.dataset.captureMode,delete e.dataset.captureCad,delete e.dataset.captureUi,delete e.dataset.captureDrawer,delete e.dataset.captureDiagram,delete e.dataset.capturePerf,this.host.setLightboxOpen(!1,!1),this.host.setDrawerViewTab("all"),this.host.requestRenderFrame()}async prepare(e,t={}){const n=performance.now(),s=this.host.appRoot;t.playground?await this.host.openPlayground(!!t.playgroundReport):this.host.closePlayground(),t.quality&&t.quality!==this.host.getQuality()&&this.host.setQuality(t.quality),t.unit&&t.unit!==this.host.getMode()&&this.host.setMode(t.unit,!0),t.playground||await this.waitUnitReady(),typeof t.explode=="number"&&this.host.setExplode(t.explode,!0),t.renderMode&&this.host.setRenderMode(t.renderMode),t.preset&&this.host.setCameraPreset(t.preset,!0),typeof t.showPerfHud=="boolean"&&this.host.setPerfHudVisible(t.showPerfHud),this.reset(),s.dataset.captureMode=e;let r=t.clipSelector??null;if(e==="ui")s.dataset.captureCad="0",s.dataset.captureUi="1",s.dataset.captureDrawer=t.showDrawer?"1":"0",t.partId?this.host.selectPart(t.partId,!1):t.showDrawer||this.host.selectPart(null,!1);else if(e==="cad")s.dataset.captureCad="1",s.dataset.captureUi="0",s.dataset.captureDrawer="0",s.dataset.capturePerf="0",this.host.selectPart(null,!1);else if(e==="diagram"){s.dataset.captureCad="0",s.dataset.captureUi="0",s.dataset.captureDrawer="1",s.dataset.captureDiagram="1";const a=t.partId??this.host.getSelectedPartId()??this.host.getFirstPartId();a&&this.host.selectPart(a,!1),this.host.setDrawerViewTab("diagram"),await this.waitSchematicHydrated();const o=this.host.appRoot.querySelector(".explanation-drawer .drawer-body");o&&(o.scrollTop=0),t.showLightbox?(this.host.setLightboxOpen(!0,!!t.lightboxRotate),await hi(3),r=r??".schematic-lightbox-panel"):(await hi(3),r=r??".schematic-stage")}else if(e==="explanation"){s.dataset.captureCad="0",s.dataset.captureUi="0",s.dataset.captureDrawer="1";const a=t.partId??this.host.getSelectedPartId()??this.host.getFirstPartId();a&&this.host.selectPart(a,!1),this.host.setDrawerViewTab(t.drawerTab??"explanation");const o=this.host.appRoot.querySelector(".explanation-drawer .drawer-body");o&&(o.scrollTop=0),await hi(3),r=r??".explanation-drawer"}else e==="full"?(s.dataset.captureCad="1",s.dataset.captureUi="1",s.dataset.captureDrawer="1",t.partId?(this.host.selectPart(t.partId,!1),t.drawerTab&&this.host.setDrawerViewTab(t.drawerTab),await this.waitSchematicHydrated()):t.partId===null&&this.host.selectPart(null,!1),t.showLightbox&&this.host.setLightboxOpen(!0,!!t.lightboxRotate)):e==="custom"&&(s.dataset.captureCad=t.showCad===!1?"0":"1",s.dataset.captureUi=t.showUi===!1?"0":"1",s.dataset.captureDrawer=t.showDrawer===!1?"0":"1",s.dataset.capturePerf=t.showPerfHud===!1?"0":"1",t.partId?(this.host.selectPart(t.partId,!1),t.drawerTab&&this.host.setDrawerViewTab(t.drawerTab),await this.waitSchematicHydrated()):t.partId===null&&this.host.selectPart(null,!1),t.showLightbox&&this.host.setLightboxOpen(!0,!!t.lightboxRotate));return this.host.requestRenderFrame(),await hi(e==="cad"?1:2),{mode:e,clip:this.measureClip(r),activeUnit:this.host.getMode(),activeQuality:this.host.getQuality(),selectedPartId:this.host.getSelectedPartId(),readyMs:Math.round(performance.now()-n)}}}const yn=document.getElementById("app"),Ex=document.getElementById("viewport");let Ti=null,mn="off",vn=!1,yi,x,h,xn=null,eo=null,Ur=!1,Yt=null,to=null;const jo=i=>{x.syncOpticsStudio(i),i?(h.setMode("lens",!0),x.syncMode("lens"),x.syncOpticsStudio(!0),h.setExplode(0),x.setExplodeValue(0),h.setPhysicsActive(!0),x.syncPhysics(!0),h.frameLensForOpticsStudio(!1),H()):(h.getMode()==="lens"&&(h.refreshVisibility(),x.syncLensSection(h.getLensSection()),h.setCameraPreset("iso",!1),H()),h.requestRenderFrame())},Tx=()=>xn?Promise.resolve(xn):(eo||(eo=ce(()=>import("./LensOpticsStudio-DlW3Z6CI.js"),[],import.meta.url).then(i=>(xn=new i.LensOpticsStudio(yn,{onOpenChange:jo,onHoverPart:e=>{Ti=e,h.setHoveredPartFromUI(e),x.syncHighlight(h.getSelectedPart()?.id??null,Ti)},onSelectPart:e=>{h.selectPart(e,!1)},onRequestRenderFrame:()=>{h.requestRenderFrame()}}),xn))),eo),ut={getIsOpen:()=>xn?xn.getIsOpen():Ur||gn.studioOpen,open:(i,e)=>{const t=e??void 0;if(xn){xn.open(i,t);return}Ur=!0,i&&gn.setScenario(i),e!==void 0&&gn.setHoveredElement(e),gn.setStudioOpen(!0),jo(!0),Tx().then(n=>{Ur&&n.open(i,t)})},close:()=>{Ur=!1,xn?xn.close():gn.studioOpen&&(gn.setStudioOpen(!1),jo(!1))},toggle:()=>{ut.getIsOpen()?ut.close():ut.open()}},Mi=()=>{const i=document;return!!(document.fullscreenElement||i.webkitFullscreenElement)},is=()=>{const i=Mi()||vn;yn.classList.toggle("is-zen-fullscreen",vn),x.syncFullscreen(i),h.handleResize()},pl=async()=>{const i=document,e=document.documentElement;if(Mi()){try{document.exitFullscreen?await document.exitFullscreen():i.webkitExitFullscreen&&await i.webkitExitFullscreen()}catch{}vn=!1,is();return}if(vn){vn=!1,is();return}let t=!1;try{document.fullscreenEnabled!==!1&&e.requestFullscreen?(await e.requestFullscreen(),t=Mi()):e.webkitRequestFullscreen&&(await e.webkitRequestFullscreen(),t=Mi())}catch{t=!1}t||(vn=!0),is()},H=()=>{const i=h.getPartsForCurrentMode(),e=h.getSelectedPart()?.id??null;x.renderLayerRail(i,e,Ti,t=>h.isPartHidden(t),h.hasAnyHidden())};h=new px(Ex,{onSelectPart:i=>{yn.classList.toggle("has-drawer",!!i),i?yi.show(i,h.isIsolated()):yi.hide(),H()},onHoverPart:i=>{Ti=i,gn.setHoveredElement(i),x.syncHighlight(h.getSelectedPart()?.id??null,Ti)},onVisibilityChanged:()=>{yi.setIsolatedState(h.isIsolated()),H()},onQualityChanged:i=>{x&&x.syncQuality(i)}});x=new gx(yn,{onModeChange:i=>{i!=="lens"&&i!=="integrated"&&ut.getIsOpen()&&ut.close(),h.setMode(i),x.syncLensSection(h.getLensSection()),x.setExplodeValue(h.getExplode()),H()},onLensSectionChange:i=>{ut.getIsOpen()&&ut.close(),h.setLensSection(i),H()},onSensorFabVolumeChange:i=>{h.setSensorFabVolume(i,!1),x.syncFabVolume(i),x.syncFabStage(i===0?"overview":i===1?"v1_overview":i===2?"v2_overview":i===3?"v3_overview":i===4?"v4_overview":"v5_overview"),H()},onSensorFabStageChange:i=>{h.focusSensorFabStage(i,!1)},onExplodeChange:i=>{h.setExplode(i)},onSectionAxisChange:i=>{mn=i,h.setSection(i)},onSectionValueChange:i=>{h.setSection(mn,i)},onRenderModeChange:i=>{h.setRenderMode(i)},onQualityChange:i=>{h.setQuality(i)},onPhysicsToggle:i=>{h.setPhysicsActive(i)},onOpticsStudioToggle:()=>{ut.toggle()},onOpenPlayground:()=>{us.open()},onResetVisibility:()=>{h.resetAllVisibility()},onFullscreenToggle:()=>{pl()},onCameraPreset:i=>{h.setCameraPreset(i)},onSelectPart:i=>{(h.getSelectedPart()?.id??null)===i?h.selectPart(null,!1):h.selectPart(i,!ut.getIsOpen())},onHoverPart:i=>{Ti=i,gn.setHoveredElement(i),h.setHoveredPartFromUI(i),x.syncHighlight(h.getSelectedPart()?.id??null,Ti)},onToggleHidePart:i=>{h.togglePartHidden(i)}});const uh=()=>Yt?Promise.resolve(Yt):(to||(to=ce(()=>import("./CadPlaygroundStudio-Ccw5mk4t.js"),__vite__mapDeps([76,3]),import.meta.url).then(i=>(Yt=new i.CadPlaygroundStudio(yn,{renderer:h.getRenderer(),container:h.getContainer(),setCustomSceneRenderer:e=>h.setCustomSceneRenderer(e),requestRender:()=>h.requestRenderFrame(),onClosePlayground:()=>{yn.classList.remove("is-playground"),x.syncPlaygroundActive(!1),h.handleResize()}}),Yt))),to),us={isOpen:()=>Yt?.isOpen()??!1,open:async(i=!1)=>{ut.getIsOpen()&&ut.close(),h.selectPart(null,!1);const e=await uh();yn.classList.add("is-playground"),x.syncPlaygroundActive(!0),await e.open(),i&&e.openEvaluationReport()},close:()=>{Yt?.close(),yn.classList.remove("is-playground"),x.syncPlaygroundActive(!1)},evaluate:()=>Yt?.openEvaluationReport()??null,runPlya:(i=!0)=>Yt?.runPlyaPipeline(i)??null,getPlaced:()=>Yt?.getPlacedSummary()??[],movePart:(i,e,t,n)=>Yt?.movePartByUid(i,e,t,n)??!1,setProfile:i=>Yt?.setDesignProfile(i)??null,loadTemplate:async i=>{await(await uh()).loadTemplate(i)},setCameraView:i=>Yt?.setCameraView(i),setShadingMode:i=>Yt?.setShadingMode(i)};yi=new bx(yn,{onClose:()=>h.selectPart(null,!1),onPrev:()=>h.stepSelectedPart(-1),onNext:()=>h.stepSelectedPart(1),onToggleIsolate:()=>h.toggleIsolateSelected(),onHideCurrent:()=>{const i=h.getSelectedPart();i&&h.togglePartHidden(i.id)},onOpenOpticsMotion:(i,e)=>{h.selectPart(null,!1),ut.open(i,e)},onSwitchMode:i=>{ut.getIsOpen()&&ut.close(),h.setMode(i),x.syncMode(i),x.setExplodeValue(h.getExplode()),H()},onSwitchFabVolume:i=>{h.setMode("sensor_fab",!1),h.setSensorFabVolume(i,!1),x.syncFabVolume(i),x.syncFabStage(i===0?"overview":i===1?"v1_overview":i===2?"v2_overview":i===3?"v3_overview":i===4?"v4_overview":"v5_overview"),x.syncMode("sensor_fab"),H()}});document.addEventListener("fullscreenchange",()=>{Mi()||(vn=!1),is()});document.addEventListener("webkitfullscreenchange",()=>{Mi()||(vn=!1),is()});const ml=new URLSearchParams(window.location.search),Ax=i=>{if(!i.isTrusted||Mi()||document.fullscreenEnabled===!1||ml.has("pp")||window.__PP_CAPTURE__)return;const t=i.target?.tagName;if(t==="INPUT"||t==="SELECT"||t==="TEXTAREA"||t==="OPTION")return;const n=document.documentElement;try{const s=n.requestFullscreen?n.requestFullscreen():n.webkitRequestFullscreen?.();s&&typeof s.catch=="function"&&s.catch(()=>{})}catch{}};window.addEventListener("pointerdown",Ax,{capture:!0,passive:!0});const vi=i=>{h.setQuality(i),x.syncQuality(h.getQuality())};window.addEventListener("keydown",i=>{if(!us.isOpen())if(i.key==="Escape")vn&&(vn=!1,is()),h.getSelectedPart()?h.selectPart(null,!1):ut.getIsOpen()&&ut.close();else if((i.key==="1"||i.key==="2"||i.key==="3")&&h.getMode()==="lens"&&!ut.getIsOpen()&&!i.ctrlKey&&!i.metaKey&&!i.altKey){const e=Number(i.key);h.setLensSection(e),x.syncLensSection(e),H()}else if((i.key==="v"||i.key==="V")&&!i.ctrlKey&&!i.metaKey&&!i.altKey){const e=h.getMode(),t=e==="micro"?"micro_v2":e==="micro_v2"?"micro":e==="bionz"?"bionz_v2":e==="bionz_v2"?"bionz":null;t&&(h.setMode(t),x.syncMode(t),x.setExplodeValue(h.getExplode()),H())}else if((i.key==="f"||i.key==="F")&&!i.ctrlKey&&!i.metaKey&&!i.altKey)pl();else if((i.key==="u"||i.key==="U")&&!i.ctrlKey&&!i.metaKey&&!i.altKey){const t=h.getQuality()==="ultra"?"standard_lite":"ultra";vi(t)}else(i.key==="p"||i.key==="P")&&h.isV2Mode()&&!i.ctrlKey&&!i.metaKey&&!i.altKey?h.getV2Runtime().togglePerfHud():i.key==="ArrowDown"||i.key==="ArrowRight"?h.getSelectedPart()&&h.stepSelectedPart(1):(i.key==="ArrowUp"||i.key==="ArrowLeft")&&h.getSelectedPart()&&h.stepSelectedPart(-1)});const ui=ml.get("quality")?.toLowerCase();ui==="standard_lite"||ui==="lite"||ui==="std_lite"?vi("standard_lite"):ui==="standard"||ui==="std"?vi("standard"):ui==="high"?vi("high"):ui==="ultra"?vi("ultra"):x.syncQuality(h.getQuality());const dh={getDiagnostics:()=>h.getV2Runtime().getDiagnostics(),togglePerfHud:()=>h.getV2Runtime().togglePerfHud(),setPerfHudVisible:i=>h.getV2Runtime().setPerfHudVisible(i),isV2Mode:()=>h.isV2Mode()},fh=new Sx({appRoot:yn,setMode:(i,e)=>{h.setMode(i,e),x.syncMode(i),H()},getMode:()=>h.getMode(),setQuality:i=>vi(i),getQuality:()=>h.getQuality(),setRenderMode:i=>h.setRenderMode(i),setExplode:(i,e)=>{h.setExplode(i,e),x.setExplodeValue(i)},setCameraPreset:(i,e)=>h.setCameraPreset(i,e),selectPart:(i,e)=>h.selectPart(i,e),getFirstPartId:()=>h.getPartsForCurrentMode()[0]?.id??null,getSelectedPartId:()=>h.getSelectedPart()?.id??null,isUnitReady:()=>h.getV2Runtime().isReady(),setPerfHudVisible:i=>h.getV2Runtime().setPerfHudVisible(i),setDrawerViewTab:i=>yi.setViewTab(i),setLightboxOpen:(i,e)=>yi.setLightboxOpen(i,e),openPlayground:i=>us.open(i),closePlayground:()=>us.close(),requestRenderFrame:()=>h.requestRenderFrame()});window.__cad={viewport:h,controls:x,drawer:yi,opticsStudio:ut,playground:us,pp:fh,capture:fh,toggleFullscreen:pl,setQuality:vi,v2:dh,mishoeV2:dh};H();const W=ml.get("preset");W==="welcome"?(h.setMode("welcome",!0),x.syncMode("welcome"),h.setExplode(0,!0),x.setExplodeValue(0),h.setCameraPreset("iso",!0),H()):W==="playground"?us.open(!1):W==="complete_assembled"?(h.setMode("integrated",!0),x.syncMode("integrated"),h.setExplode(0,!0),x.setExplodeValue(0),h.setCameraPreset("iso",!0),H()):W==="complete_back"?(h.setMode("integrated",!0),x.syncMode("integrated"),h.setExplode(0,!0),x.setExplodeValue(0),h.setCameraPreset("back",!0),H()):W==="complete_exploded"?(h.setMode("integrated",!0),x.syncMode("integrated"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="complete_section"?(h.setMode("integrated",!0),x.syncMode("integrated"),h.setExplode(0,!0),mn="x",h.setSection("x",.54),x.syncSectionAxis("x",.54),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="camera_body_assembled"?(h.setMode("camera_body",!0),x.syncMode("camera_body"),h.setExplode(0,!0),x.setExplodeValue(0),h.setCameraPreset("iso",!0),H()):W==="camera_body_exploded"?(h.setMode("camera_body",!0),x.syncMode("camera_body"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="lens_assembled"?(h.setMode("lens",!0),x.syncMode("lens"),h.setExplode(0,!0),x.setExplodeValue(0),h.setCameraPreset("iso",!0),H()):W==="lens_exploded"?(h.setMode("lens",!0),x.syncMode("lens"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="lens_drawer"?(h.setMode("lens",!0),x.syncMode("lens"),h.setExplode(.88,!0),x.setExplodeValue(.88),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lens-xd-motors",!1),H()):W==="lens_super_drawer"?(h.setMode("lens",!0),x.syncMode("lens"),h.setExplode(.92,!0),x.setExplodeValue(.92),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lens-mcu-pcb",!1),H()):W==="lens_ultra_drawer"?(h.setMode("lens",!0),x.syncMode("lens"),h.setExplode(.92,!0),x.setExplodeValue(.92),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lens-bayonet-shims",!1),H()):W==="lens_ultra62_exploded"?(h.setMode("lens",!0),x.syncMode("lens"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="lens_ultra62_drawer"?(h.setMode("lens",!0),x.syncMode("lens"),h.setExplode(.9,!0),x.setExplodeValue(.9),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lens-front-tilt-shims",!1),H()):W==="lens_optics_motion"?(ut.open("aperture_bokeh"),h.frameLensForOpticsStudio(!0)):W==="lens_optics_floating"?(ut.open("floating_xd"),h.frameLensForOpticsStudio(!0)):W==="lens_optics_ed"?(ut.open("ed_chromatic"),h.frameLensForOpticsStudio(!0)):W==="lens_optics_xa"?(ut.open("xa_aspheric"),h.frameLensForOpticsStudio(!0)):W==="lens_optics_nano"?(ut.open("nano_ar_baffle"),h.frameLensForOpticsStudio(!0)):W==="sensor_super_drawer"?(h.setMode("sensor",!0),x.syncMode("sensor"),h.setExplode(.92,!0),x.setExplodeValue(.92),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("sensor-hall-pcb",!1),H()):W==="lcd_assembled"?(h.setMode("lcd",!0),x.syncMode("lcd"),h.setExplode(0,!0),x.setExplodeValue(0),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="lcd_exploded"?(h.setMode("lcd",!0),x.syncMode("lcd"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="lcd_drawer"?(h.setMode("lcd",!0),x.syncMode("lcd"),h.setExplode(.85,!0),x.setExplodeValue(.85),h.setCameraPreset("iso",!0),h.selectPart("lcd-4axis-tilt-frame",!1),H()):W==="body_assembled"?(h.setMode("body",!0),x.syncMode("body"),h.setExplode(0,!0),x.setExplodeValue(0),h.setCameraPreset("iso",!0),H()):W==="body_exploded"?(h.setMode("body",!0),x.syncMode("body"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="body_drawer"?(h.setMode("body",!0),x.syncMode("body"),h.setExplode(.88,!0),x.setExplodeValue(.88),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("body-battery-pack",!1),H()):W==="body_ultra_drawer"?(h.setMode("body",!0),x.syncMode("body"),h.setExplode(.92,!0),x.setExplodeValue(.92),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("body-card-ejectors",!1),H()):W==="shutter_ultra_drawer"?(h.setMode("shutter",!0),x.syncMode("shutter"),h.setExplode(.92,!0),x.setExplodeValue(.92),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("shutter-counterweight",!1),H()):W==="lcd_ultra_drawer"?(h.setMode("lcd",!0),x.syncMode("lcd"),h.setExplode(.92,!0),x.setExplodeValue(.92),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lcd-swivel-clutch",!1),H()):W==="mount_assembled"?(h.setMode("mount",!0),x.syncMode("mount"),h.setExplode(0,!0),x.setExplodeValue(0),h.setCameraPreset("iso",!0),H()):W==="mount_exploded"?(h.setMode("mount",!0),x.syncMode("mount"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="mount_section"?(h.setMode("mount",!0),x.syncMode("mount"),h.setExplode(0,!0),mn="x",h.setSection("x",.52),x.syncSectionAxis("x",.52),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="mount_drawer"?(h.setMode("mount",!0),x.syncMode("mount"),h.setExplode(.85,!0),x.setExplodeValue(.85),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mount-flange-ring",!1),H()):W==="mount_contacts_drawer"?(h.setMode("mount",!0),x.syncMode("mount"),h.setExplode(.88,!0),x.setExplodeValue(.88),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mount-contact-pins",!1),H()):W==="evf_assembled"?(h.setMode("evf",!0),x.syncMode("evf"),h.setExplode(0,!0),x.setExplodeValue(0),h.setCameraPreset("iso",!0),H()):W==="evf_exploded"?(h.setMode("evf",!0),x.syncMode("evf"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="evf_section"?(h.setMode("evf",!0),x.syncMode("evf"),h.setExplode(0,!0),mn="x",h.setSection("x",.52),x.syncSectionAxis("x",.52),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="evf_drawer"?(h.setMode("evf",!0),x.syncMode("evf"),h.setExplode(.88,!0),x.setExplodeValue(.88),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("evf-oled-panel",!1),H()):W==="evf_eye_af_drawer"?(h.setMode("evf",!0),x.syncMode("evf"),h.setExplode(.85,!0),x.setExplodeValue(.85),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("evf-dichroic-mirror",!1),H()):W==="mainboard_exploded"?(h.setMode("mainboard",!0),x.syncMode("mainboard"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="mainboard_section"?(h.setMode("mainboard",!0),x.syncMode("mainboard"),h.setExplode(0,!0),mn="x",h.setSection("x",.54),x.syncSectionAxis("x",.54),h.setCameraPreset("iso",!0),H()):W==="mainboard_drawer"?(h.setMode("mainboard",!0),x.syncMode("mainboard"),h.setExplode(.85,!0),x.setExplodeValue(.85),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mb-isp-die",!1),H()):W==="mainboard_npu_drawer"?(h.setMode("mainboard",!0),x.syncMode("mainboard"),h.setExplode(.82,!0),x.setExplodeValue(.82),h.setCameraPreset("iso",!0),h.selectPart("mb-ai-npu",!1),H()):W==="mainboard_back"?(h.setMode("mainboard",!0),x.syncMode("mainboard"),h.setExplode(.65,!0),x.setExplodeValue(.65),h.setCameraPreset("back",!0),H()):W==="shutter_assembled"?(h.setMode("shutter",!0),x.syncMode("shutter"),h.setExplode(0,!0),h.setCameraPreset("iso",!0),H()):W==="shutter_exploded"?(h.setMode("shutter",!0),x.syncMode("shutter"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="shutter_section"?(h.setMode("shutter",!0),x.syncMode("shutter"),h.setExplode(0,!0),mn="x",h.setSection("x",.56),x.syncSectionAxis("x",.56),h.setCameraPreset("iso",!0),H()):W==="shutter_drawer"?(h.setMode("shutter",!0),x.syncMode("shutter"),h.setExplode(.82,!0),x.setExplodeValue(.82),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("shutter-curtain-2",!1),H()):W==="integrated_exploded"?(h.setMode("integrated",!0),x.syncMode("integrated"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="integrated_assembled"?(h.setMode("integrated",!0),x.syncMode("integrated"),h.setExplode(0,!0),x.setExplodeValue(0),h.setCameraPreset("iso",!0),H()):W==="sensor_exploded"||W==="exploded"?(h.setMode("sensor",!0),x.syncMode("sensor"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="back"?(h.setMode("sensor",!0),x.syncMode("sensor"),h.setExplode(.72,!0),x.setExplodeValue(.72),h.setCameraPreset("back",!0),H()):W==="section"?(h.setMode("sensor",!0),x.syncMode("sensor"),h.setExplode(0,!0),mn="x",h.setSection("x",.48),x.syncSectionAxis("x",.48),h.setCameraPreset("iso",!0),H()):W==="drawer"?(h.setMode("sensor",!0),x.syncMode("sensor"),h.setExplode(.82,!0),x.setExplodeValue(.82),h.setCameraPreset("iso",!0),h.selectPart("cmos-die",!1),H()):W==="micro"?(h.setMode("micro",!0),x.syncMode("micro"),h.setExplode(.72,!0),x.setExplodeValue(.72),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="micro_drawer"?(h.setMode("micro",!0),x.syncMode("micro"),h.setExplode(.65,!0),x.setExplodeValue(.65),h.setCameraPreset("iso",!0),h.selectPart("micro-2layer-gs",!1),H()):W==="phase11_mount"?(h.setMode("mount",!0),x.syncMode("mount"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mount-esd-ground-clips",!1),H()):W==="phase11_sensor"?(h.setMode("sensor",!0),x.syncMode("sensor"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("sensor-dram-wafer",!1),H()):W==="phase11_micro"?(h.setMode("micro",!0),x.syncMode("micro"),h.setExplode(.85,!0),x.setExplodeValue(.85),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("micro-fdti-doping",!1),H()):W==="phase11_shutter"?(h.setMode("shutter",!0),x.syncMode("shutter"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("shutter-x-sync-contact",!1),H()):W==="phase11_evf"?(h.setMode("evf",!0),x.syncMode("evf"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("evf-oled-mla-stack",!1),H()):W==="phase11_lcd"?(h.setMode("lcd",!0),x.syncMode("lcd"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lcd-lgp-led-bar",!1),H()):W==="phase11_lens"?(h.setMode("lens",!0),x.syncMode("lens"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lens-mr-magnet-scales",!1),H()):W==="phase12_mainboard"?(h.setMode("mainboard",!0),x.syncMode("mainboard"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mb-hdmi-daughterboard",!1),H()):W==="phase12_body"?(h.setMode("body",!0),x.syncMode("body"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("body-evf-tie-bracket",!1),H()):W==="phase12_micro"?(h.setMode("micro",!0),x.syncMode("micro"),h.setExplode(.9,!0),x.setExplodeValue(.9),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("micro-lofic-cap",!1),H()):W==="phase13_mount"?(h.setMode("mount",!0),x.syncMode("mount"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mount-im-adjust-washer",!1),H()):W==="phase13_shutter"?(h.setMode("shutter",!0),x.syncMode("shutter"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("shutter-mb-floating-shaft",!1),H()):W==="phase13_body"?(h.setMode("body",!0),x.syncMode("body"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("body-gyro-sensor-unit",!1),H()):W==="phase14_sensor"?(h.setMode("sensor",!0),x.syncMode("sensor"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("sensor-imager-fix-shafts",!1),H()):W==="phase14_micro"?(h.setMode("micro",!0),x.syncMode("micro"),h.setExplode(.92,!0),x.setExplodeValue(.92),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("micro-fd-dcg-switch",!1),H()):W==="phase15_lcd"?(h.setMode("lcd",!0),x.syncMode("lcd"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lcd-fine-coaxial-bundle",!1),H()):W==="phase34_lcd"?(h.setMode("lcd",!0),x.syncMode("lcd"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lcd-tandem-oled-stack",!1),H()):W==="phase35_lcd"?(h.setMode("lcd",!0),x.syncMode("lcd"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lcd-microled-gan-array",!1),H()):W==="phase16_mainboard"?(h.setMode("mainboard",!0),x.syncMode("mainboard"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mb-vc-evaporator-plate",!1),H()):W==="phase16_evf"?(h.setMode("evf",!0),x.syncMode("evf"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("evf-oem-finder-cover",!1),H()):W==="phase16_body"?(h.setMode("body",!0),x.syncMode("body"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("body-dl1008-rtc-flex",!1),H()):W==="phase17_shutter"?(h.setMode("shutter",!0),x.syncMode("shutter"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("shutter-rivet-reinforce-collars",!1),H()):W==="phase34_shutter"?(h.setMode("shutter",!0),x.syncMode("shutter"),h.setExplode(.96,!0),x.setExplodeValue(.96),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("shutter-coaxial-friction-brake",!1),H()):W==="phase36_shutter"?(h.setMode("shutter",!0),x.syncMode("shutter"),h.setExplode(.96,!0),x.setExplodeValue(.96),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("shutter-eddy-current-self-brake",!1),H()):W==="phase18_lens"?(h.setMode("lens",!0),h.setLensSection(3,!0),x.syncMode("lens"),x.syncLensSection(3),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lens-nano-ar-ii-layer",!1),H()):W==="phase18_mount"?(h.setMode("mount",!0),x.syncMode("mount"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mount-bayonet-leadin-dlc",!1),H()):W==="phase19_lens_s1"?(h.setMode("lens",!0),h.setLensSection(1,!0),x.syncMode("lens"),x.syncLensSection(1),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lens-iris-click-wedge-lever",!1),H()):W==="phase19_lens_s2"?(h.setMode("lens",!0),h.setLensSection(2,!0),x.syncMode("lens"),x.syncLensSection(2),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lens-mid-block-core-frame",!1),H()):W==="phase19_lens_s3"?(h.setMode("lens",!0),h.setLensSection(3,!0),x.syncMode("lens"),x.syncLensSection(3),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lens-hood-release-lock-pin",!1),H()):W==="phase19_micro"?(h.setMode("micro",!0),x.syncMode("micro"),h.setExplode(.92,!0),x.setExplodeValue(.92),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("micro-column-cds-sh",!1),H()):W==="phase19_sensor"?(h.setMode("sensor",!0),x.syncMode("sensor"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("sensor-birefringent-olpf",!1),H()):W==="phase19_mainboard"?(h.setMode("mainboard",!0),x.syncMode("mainboard"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mb-card-detect-heartcam",!1),H()):W==="phase20_micro"?(h.setMode("micro",!0),x.syncMode("micro"),h.setExplode(.92,!0),x.setExplodeValue(.92),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("micro-inpixel-dram-gs",!1),H()):W==="phase20_mount"?(h.setMode("mount",!0),x.syncMode("mount"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mount-screw-orange-orings",!1),H()):W==="phase23_micro"?(h.setMode("micro",!0),x.syncMode("micro"),h.setExplode(.86,!0),x.setExplodeValue(.86),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("micro-mpcr-color-router",!1),H()):W==="phase24_body"?(h.setMode("body",!0),x.syncMode("body"),h.setExplode(.85,!0),x.setExplodeValue(.85),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("body-active-cooling-fan-duct",!1),H()):W==="phase25_sensor"?(h.setMode("sensor",!0),x.syncMode("sensor"),h.setExplode(.88,!0),x.setExplodeValue(.88),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("sensor-electronic-vnd",!1),H()):W==="phase25_body"?(h.setMode("body",!0),x.syncMode("body"),h.setExplode(.86,!0),x.setExplodeValue(.86),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("body-gnss-ceramic-antenna",!1),H()):W==="battery"?(h.setMode("battery",!0),x.syncMode("battery"),h.setExplode(.88,!0),x.setExplodeValue(.88),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("bat-infolithium-fuelgauge",!1),H()):W==="battery_assembled"?(h.setMode("battery",!0),x.syncMode("battery"),h.setExplode(0,!0),x.setExplodeValue(0),h.setCameraPreset("iso",!0),H()):W==="battery_ultra100"?(h.setMode("battery",!0),x.syncMode("battery"),h.setExplode(.92,!0),x.setExplodeValue(.92),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("bat-cvd-sic-porous-scaffold",!1),H()):W==="battery_ultra130"?(h.setMode("battery",!0),x.syncMode("battery"),h.setExplode(.94,!0),x.setExplodeValue(.94),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("bat-argyrodite-li6ps5cl-2026",!1),H()):W==="cfexpress"?(h.setMode("cfexpress",!0),x.syncMode("cfexpress"),h.setExplode(.88,!0),x.setExplodeValue(.88),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("cfe-pcie4-controller-soc",!1),H()):W==="cfexpress_assembled"?(h.setMode("cfexpress",!0),x.syncMode("cfexpress"),h.setExplode(0,!0),x.setExplodeValue(0),h.setCameraPreset("iso",!0),H()):W==="cfexpress_back"?(h.setMode("cfexpress",!0),x.syncMode("cfexpress"),h.setExplode(0,!0),x.setExplodeValue(0),h.setCameraPreset("back",!0),H()):W==="cfexpress_exploded"?(h.setMode("cfexpress",!0),x.syncMode("cfexpress"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="cfexpress_ultra100"?(h.setMode("cfexpress",!0),x.syncMode("cfexpress"),h.setExplode(.92,!0),x.setExplodeValue(.92),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("cfe-multiplane-6plane-mpir",!1),H()):W==="cfexpress_ultra130"?(h.setMode("cfexpress",!0),x.syncMode("cfexpress"),h.setExplode(.94,!0),x.setExplodeValue(.94),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("cfe-fenand-hzo-igzo-2026",!1),H()):W==="cfexpress_ultra170"?(h.setMode("cfexpress",!0),x.syncMode("cfexpress"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("cfe-bwwpc-wafer-power-grid",!1),H()):W==="bionz_assembled"?(h.setMode("bionz",!0),x.syncMode("bionz"),h.setExplode(0,!0),x.setExplodeValue(0),h.setCameraPreset("iso",!0),H()):W==="bionz_exploded"?(h.setMode("bionz",!0),x.syncMode("bionz"),h.setExplode(.92,!0),x.setExplodeValue(.92),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="bionz_drawer"?(h.setMode("bionz",!0),x.syncMode("bionz"),h.setExplode(.86,!0),x.setExplodeValue(.86),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("xr-ai-npu-systolic",!1),H()):W==="mishoe_assembled"?(h.setMode("mishoe",!0),x.syncMode("mishoe"),h.setExplode(0,!0),x.setExplodeValue(0),h.setCameraPreset("iso",!0),H()):W==="mishoe_exploded"?(h.setMode("mishoe",!0),x.syncMode("mishoe"),h.setExplode(.92,!0),x.setExplodeValue(.92),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="mishoe_drawer"?(h.setMode("mishoe",!0),x.syncMode("mishoe"),h.setExplode(.86,!0),x.setExplodeValue(.86),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mi-pins-8to12-digital-audio",!1),H()):W==="mic_assembled"?(h.setMode("mic",!0),x.syncMode("mic"),h.setExplode(0,!0),x.setExplodeValue(0),h.setCameraPreset("iso",!0),H()):W==="mic_exploded"?(h.setMode("mic",!0),x.syncMode("mic"),h.setExplode(.92,!0),x.setExplodeValue(.92),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="mic_drawer"?(h.setMode("mic",!0),x.syncMode("mic"),h.setExplode(.86,!0),x.setExplodeValue(.86),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mc-mems-sdm-vacuum-cell",!1),H()):W==="mic_ultra80"?(h.setMode("mic",!0),x.syncMode("mic"),h.setExplode(.92,!0),x.setExplodeValue(.92),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mc-optical-mems-vcsel-2026",!1),H()):W==="mic_ultra110"?(h.setMode("mic",!0),x.syncMode("mic"),h.setExplode(.94,!0),x.setExplodeValue(.94),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mc-graphene-2d-membrane-2026",!1),H()):W==="mic_ultra150"?(h.setMode("mic",!0),x.syncMode("mic"),h.setExplode(.95,!0),x.setExplodeValue(.95),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mc-jk1028-audio-jack-flex",!1),H()):W==="micro_v2_assembled"?(h.setMode("micro_v2",!0),x.syncMode("micro_v2"),h.setExplode(0,!0),x.setExplodeValue(0),h.setCameraPreset("iso",!0),H()):W==="micro_v2_exploded"?(h.setMode("micro_v2",!0),x.syncMode("micro_v2"),h.setExplode(.92,!0),x.setExplodeValue(.92),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="micro_v2_drawer"?(h.setMode("micro_v2",!0),x.syncMode("micro_v2"),h.setExplode(.76,!0),x.setExplodeValue(.76),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("pv2-lofic-3d-pillar-cap",!1),H()):W==="bionz_v2_assembled"?(h.setMode("bionz_v2",!0),x.syncMode("bionz_v2"),h.setExplode(0,!0),x.setExplodeValue(0),h.setCameraPreset("iso",!0),H()):W==="bionz_v2_exploded"?(h.setMode("bionz_v2",!0),x.syncMode("bionz_v2"),h.setExplode(.92,!0),x.setExplodeValue(.92),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="bionz_v2_drawer"?(h.setMode("bionz_v2",!0),x.syncMode("bionz_v2"),h.setExplode(.76,!0),x.setExplodeValue(.76),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("xv2-gaa-si-nanosheets",!1),H()):W==="sensor_fab_assembled"?(h.setMode("sensor_fab",!0),x.syncMode("sensor_fab"),h.setExplode(0,!0),x.setExplodeValue(0),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="sensor_fab_exploded"?(h.setMode("sensor_fab",!0),x.syncMode("sensor_fab"),h.setExplode(.92,!0),x.setExplodeValue(.92),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="sensor_fab_drawer"?(h.setMode("sensor_fab",!0),x.syncMode("sensor_fab"),h.setExplode(.45,!0),x.setExplodeValue(.45),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("fab0-p06-cucu-bond-bsi",!1),H()):W==="sensor_fab_litho"?(h.setMode("sensor_fab",!0),x.syncMode("sensor_fab"),x.syncFabStage("litho"),h.setExplode(.55,!0),x.setExplodeValue(.55),h.setPhysicsActive(!0),x.syncPhysics(!0),h.focusSensorFabStage("litho",!0),H()):W==="sensor_fab_variants"?(h.setMode("sensor_fab",!0),x.syncMode("sensor_fab"),x.syncFabStage("variants"),h.setExplode(.42,!0),x.setExplodeValue(.42),h.setPhysicsActive(!0),x.syncPhysics(!0),h.focusSensorFabStage("variants",!0),H()):W==="sensor_fab_section"?(h.setMode("sensor_fab",!0),x.syncMode("sensor_fab"),h.setExplode(0,!0),mn="x",h.setSection("x",.52),x.syncSectionAxis("x",.52),h.setCameraPreset("iso",!0),H()):W==="sensor_fab_vol1_assembled"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(1,!0),x.syncFabVolume(1),x.syncFabStage("v1_overview"),x.syncMode("sensor_fab"),h.setExplode(0,!0),x.setExplodeValue(0),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="sensor_fab_vol1_exploded"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(1,!0),x.syncFabVolume(1),x.syncFabStage("v1_overview"),x.syncMode("sensor_fab"),h.setExplode(.75,!0),x.setExplodeValue(.75),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="sensor_fab_vol1_drawer"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(1,!0),x.syncFabVolume(1),x.syncFabStage("v1_overview"),x.syncMode("sensor_fab"),h.setExplode(.35,!0),x.setExplodeValue(.35),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("fab1-gs-pixel-adc-isscc2025",!1),H()):W==="sensor_fab_vol1_archs"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(1,!0),x.syncFabVolume(1),x.syncFabStage("v1_archs"),x.syncMode("sensor_fab"),h.setExplode(.12,!0),x.setExplodeValue(.12),h.focusSensorFabStage("v1_archs",!0),H()):W==="sensor_fab_vol1_duel"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(1,!0),x.syncFabVolume(1),x.syncFabStage("v1_duel"),x.syncMode("sensor_fab"),h.setExplode(.12,!0),x.setExplodeValue(.12),h.focusSensorFabStage("v1_duel",!0),H()):W==="sensor_fab_vol1_wall"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(1,!0),x.syncFabVolume(1),x.syncFabStage("v1_wall"),x.syncMode("sensor_fab"),h.setExplode(.12,!0),x.setExplodeValue(.12),h.focusSensorFabStage("v1_wall",!0),H()):W==="sensor_fab_vol2_assembled"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(2,!0),x.syncFabVolume(2),x.syncFabStage("v2_overview"),x.syncMode("sensor_fab"),h.setExplode(0,!0),x.setExplodeValue(0),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="sensor_fab_vol2_exploded"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(2,!0),x.syncFabVolume(2),x.syncFabStage("v2_overview"),x.syncMode("sensor_fab"),h.setExplode(.75,!0),x.setExplodeValue(.75),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="sensor_fab_vol2_drawer"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(2,!0),x.syncFabVolume(2),x.syncFabStage("v2_overview"),x.syncMode("sensor_fab"),h.setExplode(.28,!0),x.setExplodeValue(.28),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("fab2-ci-complex-gettering-cutaway",!1),H()):W==="sensor_fab_vol2_refine"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(2,!0),x.syncFabVolume(2),x.syncFabStage("v2_refine"),x.syncMode("sensor_fab"),h.setExplode(.1,!0),x.setExplodeValue(.1),h.focusSensorFabStage("v2_refine",!0),H()):W==="sensor_fab_vol2_mcz"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(2,!0),x.syncFabVolume(2),x.syncFabStage("v2_mcz"),x.syncMode("sensor_fab"),h.setExplode(.1,!0),x.setExplodeValue(.1),h.focusSensorFabStage("v2_mcz",!0),H()):W==="sensor_fab_vol2_wafer"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(2,!0),x.syncFabVolume(2),x.syncFabStage("v2_wafer"),x.syncMode("sensor_fab"),h.setExplode(.1,!0),x.setExplodeValue(.1),h.focusSensorFabStage("v2_wafer",!0),H()):W==="sensor_fab_vol2_epi_ship"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(2,!0),x.syncFabVolume(2),x.syncFabStage("v2_epi_ship"),x.syncMode("sensor_fab"),h.setExplode(.1,!0),x.setExplodeValue(.1),h.focusSensorFabStage("v2_epi_ship",!0),H()):W==="sensor_fab_vol3_assembled"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(3,!0),x.syncFabVolume(3),x.syncFabStage("v3_overview"),x.syncMode("sensor_fab"),h.setExplode(0,!0),x.setExplodeValue(0),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="sensor_fab_vol3_exploded"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(3,!0),x.syncFabVolume(3),x.syncFabStage("v3_overview"),x.syncMode("sensor_fab"),h.setExplode(.72,!0),x.setExplodeValue(.72),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="sensor_fab_vol3_drawer"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(3,!0),x.syncFabVolume(3),x.syncFabStage("v3_overview"),x.syncMode("sensor_fab"),h.setExplode(.24,!0),x.setExplodeValue(.24),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("fab3-p28-opc-serif-correction",!1),H()):W==="sensor_fab_vol3_tcad"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(3,!0),x.syncFabVolume(3),x.syncFabStage("v3_tcad"),x.syncMode("sensor_fab"),h.setExplode(.08,!0),x.setExplodeValue(.08),h.focusSensorFabStage("v3_tcad",!0),H()):W==="sensor_fab_vol3_layout"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(3,!0),x.syncFabVolume(3),x.syncFabStage("v3_layout"),x.syncMode("sensor_fab"),h.setExplode(.08,!0),x.setExplodeValue(.08),h.focusSensorFabStage("v3_layout",!0),H()):W==="sensor_fab_vol3_opc"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(3,!0),x.syncFabVolume(3),x.syncFabStage("v3_opc"),x.syncMode("sensor_fab"),h.setExplode(.08,!0),x.setExplodeValue(.08),h.focusSensorFabStage("v3_opc",!0),H()):W==="sensor_fab_vol3_maskfab"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(3,!0),x.syncFabVolume(3),x.syncFabStage("v3_maskfab"),x.syncMode("sensor_fab"),h.setExplode(.08,!0),x.setExplodeValue(.08),h.focusSensorFabStage("v3_maskfab",!0),H()):W==="sensor_fab_vol4_assembled"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(4,!0),x.syncFabVolume(4),x.syncFabStage("v4_overview"),x.syncMode("sensor_fab"),h.setExplode(0,!0),x.setExplodeValue(0),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="sensor_fab_vol4_exploded"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(4,!0),x.syncFabVolume(4),x.syncFabStage("v4_overview"),x.syncMode("sensor_fab"),h.setExplode(.72,!0),x.setExplodeValue(.72),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="sensor_fab_vol4_drawer"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(4,!0),x.syncFabVolume(4),x.syncFabStage("v4_overview"),x.syncMode("sensor_fab"),h.setExplode(.24,!0),x.setExplodeValue(.24),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("fab4-m22-surface-pinning-ppd",!1),H()):W==="sensor_fab_vol4_sti_dti"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(4,!0),x.syncFabVolume(4),x.syncFabStage("v4_sti_dti"),x.syncMode("sensor_fab"),h.setExplode(.08,!0),x.setExplodeValue(.08),h.focusSensorFabStage("v4_sti_dti",!0),H()):W==="sensor_fab_vol4_ppd_mev"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(4,!0),x.syncFabVolume(4),x.syncFabStage("v4_ppd_mev"),x.syncMode("sensor_fab"),h.setExplode(.08,!0),x.setExplodeValue(.08),h.focusSensorFabStage("v4_ppd_mev",!0),H()):W==="sensor_fab_vol4_vtg_gate"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(4,!0),x.syncFabVolume(4),x.syncFabStage("v4_vtg_gate"),x.syncMode("sensor_fab"),h.setExplode(.08,!0),x.setExplodeValue(.08),h.focusSensorFabStage("v4_vtg_gate",!0),H()):W==="sensor_fab_vol4_pin_sab"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(4,!0),x.syncFabVolume(4),x.syncFabStage("v4_pin_sab"),x.syncMode("sensor_fab"),h.setExplode(.08,!0),x.setExplodeValue(.08),h.focusSensorFabStage("v4_pin_sab",!0),H()):W==="sensor_fab_vol5_assembled"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(5,!0),x.syncFabVolume(5),x.syncFabStage("v5_overview"),x.syncMode("sensor_fab"),h.setExplode(0,!0),x.setExplodeValue(0),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="drybox_assembled"?(h.setMode("drybox",!0),x.syncMode("drybox"),h.setExplode(0,!0),x.setExplodeValue(0),h.setPhysicsActive(!1),x.syncPhysics(!1),h.setCameraPreset("iso",!0),H()):W==="drybox_exploded"?(h.setMode("drybox",!0),x.syncMode("drybox"),h.setExplode(.86,!0),x.setExplodeValue(.86),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="sensor_fab_vol5_exploded"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(5,!0),x.syncFabVolume(5),x.syncFabStage("v5_overview"),x.syncMode("sensor_fab"),h.setExplode(.72,!0),x.setExplodeValue(.72),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),H()):W==="sensor_fab_vol5_drawer"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(5,!0),x.syncFabVolume(5),x.syncFabStage("v5_overview"),x.syncMode("sensor_fab"),h.setExplode(.24,!0),x.setExplodeValue(.24),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("fab5-p206-hb-recess-cmp",!1),H()):W==="sensor_fab_vol5_w_m1"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(5,!0),x.syncFabVolume(5),x.syncFabStage("v5_w_m1"),x.syncMode("sensor_fab"),h.setExplode(.08,!0),x.setExplodeValue(.08),h.focusSensorFabStage("v5_w_m1",!0),H()):W==="sensor_fab_vol5_m2_m4"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(5,!0),x.syncFabVolume(5),x.syncFabStage("v5_m2_m4"),x.syncMode("sensor_fab"),h.setExplode(.08,!0),x.setExplodeValue(.08),h.focusSensorFabStage("v5_m2_m4",!0),H()):W==="sensor_fab_vol5_m5_wat"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(5,!0),x.syncFabVolume(5),x.syncFabStage("v5_m5_wat"),x.syncMode("sensor_fab"),h.setExplode(.08,!0),x.setExplodeValue(.08),h.focusSensorFabStage("v5_m5_wat",!0),H()):W==="sensor_fab_vol5_hb_cmp"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(5,!0),x.syncFabVolume(5),x.syncFabStage("v5_hb_cmp"),x.syncMode("sensor_fab"),h.setExplode(.08,!0),x.setExplodeValue(.08),h.focusSensorFabStage("v5_hb_cmp",!0),H()):W==="drybox_back"?(h.setMode("drybox",!0),x.syncMode("drybox"),h.setExplode(.45,!0),x.setExplodeValue(.45),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("back",!0),H()):W==="drybox_section"?(h.setMode("drybox",!0),x.syncMode("drybox"),h.setExplode(0,!0),x.setExplodeValue(0),mn="x",h.setSection("x",.52),x.syncSectionAxis("x",.52),h.setCameraPreset("iso",!0),H()):W==="drybox_drawer"&&(h.setMode("drybox",!0),x.syncMode("drybox"),h.setExplode(.55,!0),x.setExplodeValue(.55),h.setPhysicsActive(!0),x.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("db-pem-nafion-membrane",!1),H());export{Fx as $,gh as A,Hs as B,np as C,Ht as D,rn as E,Ze as F,As as G,Kh as H,oa as I,Af as J,cc as K,ea as L,Ns as M,$n as N,Tl as O,Gs as P,Zn as Q,tp as R,El as S,eu as T,Hh as U,w as V,kr as W,Ux as X,fn as Y,Px as Z,ce as _,la as a,Lx as a0,ix as a1,ah as a2,Gh as a3,Nx as a4,tu as a5,mf as a6,ns as a7,Kf as a8,Xh as a9,qo as aa,Wh as ab,jh as ac,Vh as ad,ll as ae,dn as af,bt as ag,Kt as ah,Bt as ai,Qh as aj,Dx as ak,Ix as al,kh as am,Et as b,ta as c,_t as d,Mu as e,Ct as f,Zh as g,Nh as h,Jh as i,st as j,jt as k,nx as l,Kc as m,gi as n,Ve as o,Zt as p,Ye as q,Ts as r,gn as s,he as t,tf as u,nn as v,k0 as w,wx as x,Rx as y,Cx as z};

const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./mi_shoe-D8lfwIbm.js","./CadHelpers-tqISY3KR.js","./mi_shoe-CaQBxxP9.js","./battery-CtjPEkcu.js","./battery-Cw3gePVg.js","./UltraDetailBuilders-DH4_0FpT.js","./v2_unit_compiler-4jpajHxJ.js","./cfexpress-DZFIh5S2.js","./cfexpress-DY8cI-Wc.js","./mic-DkTFkQQ2.js","./mic-CwD_McdS.js","./drybox-CEi5QTbL.js","./drybox-00mboV4n.js","./mount-CWFverov.js","./mount-D5exe6iE.js","./mountPhysicsOverlay-Da8YUEdF.js","./shutter-Bd9Xzu_U.js","./shutter-DRF49fuH.js","./shutterPhysicsOverlay-mH9woUsg.js","./body-EKgUGVNB.js","./body-DYuOmmPC.js","./bodyPhysicsOverlay-DzP7ENF1.js","./lcdParts-1eX6qFcS.js","./evfParts-CXEux6uD.js","./evf-CdoI4asA.js","./evf-yJM6r-pP.js","./evfPhysicsOverlay-dlzvtanE.js","./lcd-TgWK2v80.js","./lcd-C5DFy3jF.js","./lcdPhysicsOverlay-D13wzljy.js","./lens-qhYQIUyU.js","./lens-DbGM9PCN.js","./lensPhysicsOverlay-CNyTul7F.js","./mainboard-C0imbV51.js","./mainboard-kTn1WrHF.js","./mainboardPhysicsOverlay-DozRmpgc.js","./bionz-CENVHs59.js","./bionz-CtB3oT0v.js","./bionz_v2-DkfmvA_r.js","./bionz_v2-BTlxc95w.js","./sensor-DrPaKD-9.js","./sensor-CoYD7fba.js","./macroParts-BxSygaOA.js","./physicsOverlay-YcNrrzpd.js","./micro-p9jauCDq.js","./micro-cCBBsnJi.js","./sensorMicroUltraAuditParts-B9tBHQhw.js","./micro_v2-DxC-_Caq.js","./micro_v2-Be62c30w.js","./sensor_fab-6UONq0ss.js","./sensor_fab-Cu3xZEwo.js","./integrated-B_McZ71R.js","./integrated-_M_HiRFo.js","./camera_macro_shared-B8GEnL_P.js","./camera_body-B1YrxKCd.js","./camera_body-CnaAZIgr.js","./lensExplanations-CVIj2Kn6.js","./unit_explanations-DhEhaoi2.js","./mountExplanations-BzfMkKM6.js","./shutterExplanations-COwEmSMe.js","./explanations-DgZKQppk.js","./microPixelV2Explanations-Ds_g-StQ.js","./mainboardExplanations-CFCwOEoo.js","./evfExplanations-DI8qSmkq.js","./lcdExplanations-DVJLFMAP.js","./bodyExplanations-kgPdKIc9.js","./batteryExplanations-BeDaaZxE.js","./cfexpressExplanations-BMV4rYzd.js","./bionzExplanations-DzHU2T-9.js","./bionzV2Explanations-CEYRo8Zh.js","./miShoeExplanations-tBt7Xt7q.js","./micExplanations-C2aeFQw6.js","./sensorFabExplanations-D2TQiUI1.js","./dryboxExplanationsA-DevzWjaY.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();const Ud="modulepreload",Nd=function(i,e){return new URL(i,e).href},el={},ne=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){let a=function(u){return Promise.all(u.map(f=>Promise.resolve(f).then(r=>({status:"fulfilled",value:r}),r=>({status:"rejected",reason:r}))))};const l=document.getElementsByTagName("link"),c=document.querySelector("meta[property=csp-nonce]"),d=c?.nonce||c?.getAttribute("nonce");s=a(t.map(u=>{if(u=Nd(u,n),u in el)return;el[u]=!0;const f=u.endsWith(".css"),r=f?'[rel="stylesheet"]':"";if(!!n)for(let x=l.length-1;x>=0;x--){const g=l[x];if(g.href===u&&(!f||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${r}`))return;const v=document.createElement("link");if(v.rel=f?"stylesheet":Ud,f||(v.as="script"),v.crossOrigin="",v.href=u,d&&v.setAttribute("nonce",d),document.head.appendChild(v),f)return new Promise((x,g)=>{v.addEventListener("load",x),v.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${u}`)))})}))}function o(a){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=a,window.dispatchEvent(l),!l.defaultPrevented)throw a}return s.then(a=>{for(const l of a||[])l.status==="rejected"&&o(l.reason);return e().catch(o)})},Vr=82,tl=0,zr=[{partId:"lens-front-xa",code:"E01",groupCode:"G1",shortLabel:"XA₁",jaName:"第1枚 XA超高度非球面 (0.01μm)",role:"F1.2の大光束を取り込みつつ球面収差と玉ボケの年輪を根本抑制",z:108.5,thick:5,ap:32.5,rF:117.92,rR:185,nd:1.772,vd:49.6,kind:"xa",isXa:!0,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:46218e-11,a6F:51747e-14,focusGroup:"fixed"},{partId:"lens-front-meniscus",code:"E02",groupCode:"G2",shortLabel:"LaK",jaName:"第2枚 高屈折ランタン正メニスカス",role:"高屈折率 n=1.883 で大口径光束を緩やかに絞り方向へ集光",z:101.8,thick:4.6,ap:31,rF:78,rR:165,nd:1.883,vd:40.8,kind:"lanthanum",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"fixed"},{partId:"lens-ed-group",code:"E03",groupCode:"G3a",shortLabel:"S-ED",jaName:"第3枚 スーパーED凸レンズ",role:"蛍石に迫る超低分散 νd=94.9 でRGBの波長ごとの屈折ズレを極小化",z:95.8,thick:4.6,ap:29.5,rF:70,rR:-86,nd:1.497,vd:94.9,kind:"ed",isXa:!1,isEd:!0,isFlint:!1,cementedToNext:!0,a4F:0,a6F:0,focusGroup:"fixed"},{partId:"lens-flint-cemented",code:"E04",groupCode:"G3b",shortLabel:"Flint",jaName:"第4枚 高分散フリント接合凹レンズ",role:"E03とUV光学接合し色分散を逆符号で完全相殺（アポクロマート化）",z:92.2,thick:2.2,ap:29,rF:-86,rR:52,nd:1.805,vd:29.8,kind:"flint",isXa:!1,isEd:!1,isFlint:!0,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"fixed"},{partId:"lens-g4-negative",code:"E05",groupCode:"G4",shortLabel:"凹G4",jaName:"第5枚 絞り直前ペッツバール凹レンズ",role:"強い負パワーでピント面の湾曲を真っ平らなフルサイズ像面へ平坦化",z:87.4,thick:2,ap:26.5,rF:-115,rR:66,nd:1.74,vd:44,kind:"crown",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"fixed"},{partId:"lens-focus-a-front",code:"E06",groupCode:"G5a",shortLabel:"FA₁",jaName:"第6枚 フォーカスA群 前側凸レンズ",role:"XDリニアモーター2基で直動しピント位置を高速移動する前側可動玉",z:75.5,thick:3.8,ap:24,rF:56,rR:-105,nd:1.804,vd:46.6,kind:"lanthanum",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"A"},{partId:"lens-focus-group-a",code:"E07",groupCode:"G5b",shortLabel:"XA₂",jaName:"第7枚 フォーカスA群 第2 XA非球面",role:"絞り直後で球面収差とコマ収差を徹底除去するフローティング主玉",z:70.9,thick:4.2,ap:24.4,rF:64,rR:-92,nd:1.743,vd:49.3,kind:"xa",isXa:!0,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:-14475e-10,a6F:15704e-15,focusGroup:"A"},{partId:"lens-focus-a-rear",code:"E08",groupCode:"G5c",shortLabel:"FA₃",jaName:"第8枚 フォーカスA群 後側補正凹レンズ",role:"A群単独で色・球面収差を自己完結させ近接時の描写劣化を防止",z:66.5,thick:2.2,ap:23.4,rF:-82,rR:84,nd:1.784,vd:42,kind:"flint",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"A"},{partId:"lens-focus-b-front",code:"E09",groupCode:"G6a",shortLabel:"ED₂",jaName:"第9枚 フォーカスB群 ED凸レンズ",role:"A群と異なる移動比で同期駆動し至近0.4mの色収差変動を打ち消す",z:60.75,thick:3.8,ap:23.4,rF:68,rR:-92,nd:1.592,vd:81.6,kind:"ed",isXa:!1,isEd:!0,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"B"},{partId:"lens-focus-group-b",code:"E10",groupCode:"G6b",shortLabel:"FB₂",jaName:"第10枚 フォーカスB群 後側負非球面",role:"独立XDモーター2基で空気間隔を可変制御しブリージングと収差を抑圧",z:56.75,thick:2.2,ap:23.6,rF:-66,rR:120,nd:1.762,vd:39.5,kind:"crown",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"B"},{partId:"lens-g7-flattener",code:"E11",groupCode:"G7",shortLabel:"凹G7",jaName:"第11枚 後群固定フィールドフラットナー",role:"フォーカス群後方で像面湾曲と非点収差を精密に最終整形",z:51.8,thick:2.2,ap:23.2,rF:-84,rR:78,nd:1.72,vd:46,kind:"crown",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"fixed"},{partId:"lens-rear-convex",code:"E12",groupCode:"G8",shortLabel:"LaK₂",jaName:"第12枚 ランタン・サジタルコマ補正レンズ",role:"画面四隅の点光源が鳥の羽のように滲むサジタルコマフレアを撃退",z:47.8,thick:4,ap:23,rF:66,rR:-84,nd:1.883,vd:40.8,kind:"lanthanum",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"fixed"},{partId:"lens-rear-telecentric",code:"E13",groupCode:"G9",shortLabel:"Tele",jaName:"第13枚 φ45mm テレセントリック正メニスカス",role:"周辺へ広がる斜め光線をフルサイズセンサーへ垂直寄り（CRA<10°）に矯正",z:43.4,thick:4,ap:22.8,rF:62,rR:155,nd:1.834,vd:42,kind:"lanthanum",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"fixed"},{partId:"lens-rear-element",code:"E14",groupCode:"G10",shortLabel:"XA₃",jaName:"第14枚 φ44mm 第3 XAリアヒーローレンズ",role:"ショートフランジ18mmの特権を活かしセンサー直前で像面と四隅解像を完成",z:38.4,thick:3.8,ap:22.4,rF:-92,rR:-68.55,nd:1.743,vd:49.3,kind:"xa",isXa:!0,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:-20147e-10,a6F:-27845e-13,focusGroup:"fixed"}],nl=[{id:"aperture_bokeh",shortTitle:"結像 & F1.2ボケ",fullTitle:"大口径F1.2結像と11枚円形絞り・被写界深度",badge:"01",accentColor:"#0284c7",hasComparisonToggle:!1,getDynamicCaption:i=>{const e=i.getIrisMetrics(),t=e.fNumber<10?e.fNumber.toFixed(1):Math.round(e.fNumber).toString();return e.fNumber<=2?`F${t}（有効口径 φ${e.entrancePupilMm.toFixed(1)}mm）：11枚羽根の広い円形開口を膨大な光束が満たし、ピント面はカミソリのように鋭く、前後はとろける大きな玉ボケに。`:e.fNumber<=5.6?`F${t}（有効口径 φ${e.entrancePupilMm.toFixed(1)}mm）：周辺光束が絞られて光円錐の角度が細くなり、被写界深度が深く、周辺口径食（レモン型ボケ）も真円へ整います。`:`F${t}（有効口径 φ${e.entrancePupilMm.toFixed(1)}mm）：光束が針のように細く絞られ、手前から奥までクッキリ写るパンフォーカスへ変化。11枚羽根による22本の美しい光芒も発生します。`}},{id:"floating_xd",shortTitle:"フローティングAF",fullTitle:"2群フローティングフォーカス & 4基XDリニアモーター",badge:"02",accentColor:"#d97706",hasComparisonToggle:!1,getDynamicCaption:i=>{const e=i.getFloatingStrokes();return`ピント距離 ${i.getFocusDistanceLabel()}：A群（${e.dzA.toFixed(2)}mm）とB群（${e.dzB.toFixed(2)}mm）を4基のXDリニアモーターが約1.86:1の独立速度比で同期直動。群間隔（${e.gapAB.toFixed(1)}mm）を自在に変え、最短0.40mまで収差ゼロを維持します。`}},{id:"ed_chromatic",shortTitle:"ED色収差補正",fullTitle:"スーパーED＋フリント接合ダブレットによるRGB色消し",badge:"03",accentColor:"#059669",hasComparisonToggle:!0,toggleLabel:"スーパーED色収差補正",toggleOnText:"ON（アポクロマート）",toggleOffText:"OFF（通常ガラス比較）",getDynamicCaption:i=>i.edStrength>.5?"スーパーED（νd=94.9）凸玉と高分散フリント凹玉（νd=29.8）の逆符号分散が相殺し合い、赤(656nm)・緑(587nm)・青(486nm)の焦点ズレが 0.05mm 未満の純白一点へ収束！":"通常ガラス比較：青い光ほど強く曲がるためセンサー手前で結像し、赤い光は奥へ抜けます（軸上色ズレ 約3.5mm）。これが写真の輪郭に出る紫・緑の色滲み（パープルフリンジ）の正体です。"},{id:"xa_aspheric",shortTitle:"3×XA非球面",fullTitle:"0.01μm XA超高度非球面レンズと球面収差・玉ねぎボケ解消",badge:"04",accentColor:"#0ea5e9",hasComparisonToggle:!0,toggleLabel:"3×XA非球面補正",toggleOnText:"ON（0.01μm XA）",toggleOffText:"OFF（球面レンズ比較）",getDynamicCaption:i=>i.xaStrength>.5?"E01・E07・E14の3枚のXA非球面が周辺曲率を緩やかに連続変化させ、F1.2最外周光線まで完璧に1点へ結像。0.01μm研磨精度により玉ボケ内部の年輪（玉ねぎボケ）も完全に消滅します。":"通常球面レンズ比較：大口径F1.2の外側を通る光線ほど強く曲がりすぎて手前にズレる「球面収差」が発生！像が白く滲み、精密研磨不足の非球面では玉ボケに年輪模様が現れます。"},{id:"nano_ar_baffle",shortTitle:"Nano AR II & 遮光",fullTitle:"ナノARコーティングII 波動干渉消滅 & 迷光バッフル",badge:"05",accentColor:"#6366f1",hasComparisonToggle:!0,toggleLabel:"Nano AR II 反射防止",toggleOnText:"ON（反射率 < 0.08%）",toggleOffText:"OFF（無コート 4%反射）",getDynamicCaption:i=>i.nanoArStrength>.5?"ナノ多孔質シリカ層（n≈1.22）で2つの反射光の位相を半波長（180°）ずらして波動干渉で打ち消し合い、逆光ゴーストを消滅！画角外の迷光もフード＆3:2リアバッフルが吸収します。":"無コート比較：ガラス1面あたり約4%の光が跳ね返り、14枚（26空気面）で多重反射した迷光がゴーストや白いフレアとなってセンサーへ降り注ぎ、コントラストが激減します。"}];function Od(i,e,t,n=0,s=0){const o=1/t,a=i*i,l=Math.max(.15,1-o*o*a);return e-o*a/(1+Math.sqrt(l))-n*a*a-s*a*a*a}function il(i,e,t=0,n=0){const s=1/e,o=i*i,a=Math.max(.15,1-s*s*o);return-(s*i)/Math.sqrt(a)-4*t*o*i-6*n*o*o*i}function sl(i,e,t){if(e===0)return i.nd;let n=i.vd;t<1&&(i.isEd?n=i.vd*t+19*(1-t):i.isFlint&&(n=i.vd*t+65*(1-t)));const s=(i.nd-1)/n;return i.nd+e*.5*s}let Uo=0,No=0,Oo=0,Bo=0;function rl(i,e,t,n,s,o,a,l,c,d){let u=(s-e)/n;for(let D=0;D<5;D++){const w=i+u*t,F=e+u*n-Od(w,s,o,a,l),G=n-il(w,o,a,l)*t;if(Math.abs(G)<1e-6)break;u-=F/G}const f=i+u*t,r=e+u*n;let v=-il(f,o,a,l),x=1;const g=1/Math.sqrt(v*v+1);v*=g,x*=g;let m=-(t*v+n*x);m<0&&(v=-v,x=-x,m=-m);const M=c/d,b=1-M*M*(1-m*m),y=Math.sqrt(b>.04?b:.04),I=M*t+(M*m-y)*v,P=M*n+(M*m-y)*x,L=1/Math.sqrt(I*I+P*P);Uo=f,No=r,Oo=I*L,Bo=P*L}function Bd(i){const e=Math.max(0,Math.min(1,i)),t=-(6.85*e-1.35*e*e),n=-(3.45*e-.49*e*e),s=66.5+t-(60.75+n);return{dzA:t,dzB:n,gapAB:s}}function Vd(i,e){const t=Math.max(1.2,Math.min(16,i)),n=21.6*(1.2/t),s=Math.max(0,Math.min(1,Math.log2(t/1.2)/Math.log2(16/1.2))),o=50/t,a=e<.01?2e3:1e3/(e*2.5),c=2*t*.03*a*a/2500,d=Math.min(1,1.2/t*(.42+.58*e));return{fNumber:t,irisRadiusMm:n,closure01:s,entrancePupilMm:o,dofMm:c,bokehScale01:d}}function ds(i){let e=i.yStart,t=i.zStart;const n=Math.hypot(i.dyStart,i.dzStart);let s=i.dyStart/n,o=i.dzStart/n,a=1;const l=[{z:t,y:e}];let c=0,d=!1;for(let v=0;v<zr.length;v++){if(v===5){const D=(Vr-t)/o;if(c=e+D*s,l.push({z:Vr,y:c}),Math.abs(c)>i.irisRadiusMm+.12&&(d=!0,i.stopAtIrisIfClipped))return{points:l,color:i.color,hexColor:i.hexColor,lambdaShift:i.lambdaShift,clippedAtIris:!0,yIris:c,ySensor:c,zFocus:Vr,craDeg:0,rayRole:i.rayRole,opacity:(i.opacity??.85)*.25,width:i.width??1.4}}const x=zr[v],g=x.focusGroup==="A"?i.dzA:x.focusGroup==="B"?i.dzB:0,m=x.z+g,M=m+x.thick*.5,b=m-x.thick*.5,y=sl(x,i.lambdaShift,i.edStrength),I=x.isXa?x.a4F*i.xaStrength:0,P=x.isXa?x.a6F*i.xaStrength:0;rl(e,t,s,o,M,x.rF,I,P,a,y),e=Uo,t=No,s=Oo,o=Bo,l.push({z:t,y:e});const L=x.cementedToNext?sl(zr[v+1],i.lambdaShift,i.edStrength):1;rl(e,t,s,o,b,x.rR,0,0,y,L),e=Uo,t=No,s=Oo,o=Bo,l.push({z:t,y:e}),a=L}const u=(tl-t)/o,f=e+u*s;l.push({z:tl,y:f});const r=Math.abs(s)>1e-5?t-e/s*o:-999,p=Math.atan2(Math.abs(s),Math.abs(o))*180/Math.PI;return{points:l,color:i.color,hexColor:i.hexColor,lambdaShift:i.lambdaShift,clippedAtIris:d,yIris:c,ySensor:f,zFocus:r,craDeg:p,rayRole:i.rayRole,opacity:i.opacity??.85,width:i.width??1.6}}function zd(i,e,t,n=136){if(Math.abs(i)<.05)return 0;const s=i*Math.PI/180,o=-Math.sin(s),a=-Math.cos(s);let l=i*.96;for(let c=0;c<5;c++){const d=ds({yStart:l,zStart:n,dyStart:o,dzStart:a,lambdaShift:0,xaStrength:1,edStrength:1,dzA:e,dzB:t,irisRadiusMm:40,stopAtIrisIfClipped:!1,color:"#0284c7",hexColor:165063,rayRole:"chief"}),f=(ds({yStart:l+.5,zStart:n,dyStart:o,dzStart:a,lambdaShift:0,xaStrength:1,edStrength:1,dzA:e,dzB:t,irisRadiusMm:40,stopAtIrisIfClipped:!1,color:"#0284c7",hexColor:165063,rayRole:"chief"}).yIris-d.yIris)/.5;Math.abs(f)>1e-4&&(l-=d.yIris/f)}return l}class kd{studioOpen=!1;autoPlay=!0;scenario="aperture_bokeh";hoveredElementId=null;targetAperture=1.2;targetFocusT=0;targetFieldAngleDeg=0;targetXaStrength=1;targetEdStrength=1;targetNanoArStrength=1;aperture=1.2;focusT=0;fieldAngleDeg=0;xaStrength=1;edStrength=1;nanoArStrength=1;focusVelocityA=0;focusVelocityB=0;prevDzA=0;prevDzB=0;simTime=0;listeners=new Set;subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}notify(){this.listeners.forEach(e=>e())}setStudioOpen(e){this.studioOpen!==e&&(this.studioOpen=e,e&&this.applyScenarioDefaults(this.scenario),this.notify())}setScenario(e){this.scenario=e,this.simTime=0,this.autoPlay=!0,this.applyScenarioDefaults(e),this.notify()}applyScenarioDefaults(e){switch(e){case"aperture_bokeh":this.targetAperture=1.2,this.targetFocusT=.28,this.targetFieldAngleDeg=0,this.targetXaStrength=1,this.targetEdStrength=1,this.targetNanoArStrength=1;break;case"floating_xd":this.targetAperture=1.4,this.targetFocusT=.65,this.targetFieldAngleDeg=0,this.targetXaStrength=1,this.targetEdStrength=1,this.targetNanoArStrength=1;break;case"ed_chromatic":this.targetAperture=1.2,this.targetFocusT=0,this.targetFieldAngleDeg=0,this.targetXaStrength=1,this.targetEdStrength=1,this.targetNanoArStrength=1;break;case"xa_aspheric":this.targetAperture=1.2,this.targetFocusT=0,this.targetFieldAngleDeg=0,this.targetXaStrength=1,this.targetEdStrength=1,this.targetNanoArStrength=1;break;case"nano_ar_baffle":this.targetAperture=1.8,this.targetFocusT=.15,this.targetFieldAngleDeg=12,this.targetXaStrength=1,this.targetEdStrength=1,this.targetNanoArStrength=1;break}}setManualAperture(e){this.autoPlay=!1,this.targetAperture=Math.max(1.2,Math.min(16,e)),this.notify()}setManualFocusT(e){this.autoPlay=!1,this.targetFocusT=Math.max(0,Math.min(1,e)),this.notify()}setManualFieldAngle(e){this.autoPlay=!1,this.targetFieldAngleDeg=Math.max(-19,Math.min(19,e)),this.notify()}toggleComparison(){this.autoPlay=!1,this.scenario==="ed_chromatic"?this.targetEdStrength=this.targetEdStrength>.5?0:1:this.scenario==="xa_aspheric"?this.targetXaStrength=this.targetXaStrength>.5?0:1:this.scenario==="nano_ar_baffle"&&(this.targetNanoArStrength=this.targetNanoArStrength>.5?0:1),this.notify()}setAutoPlay(e){this.autoPlay=e,this.notify()}setHoveredElement(e){this.hoveredElementId!==e&&(this.hoveredElementId=e,this.notify())}step(e,t,n){const s=Math.min(.05,Math.max(.001,t||.016));if(this.studioOpen){if(this.autoPlay){this.simTime+=s;const c=this.simTime;if(this.scenario==="aperture_bokeh"){const d=.5-.5*Math.cos(c*.78);this.targetAperture=1.2*Math.pow(11/1.2,d),this.targetFocusT=.18+.14*(.5-.5*Math.cos(c*.42)),this.targetFieldAngleDeg=Math.sin(c*.38)*7.5}else if(this.scenario==="floating_xd"){const d=.5-.5*Math.cos(c*.92);this.targetFocusT=d,this.targetAperture=1.25,this.targetFieldAngleDeg=0}else if(this.scenario==="ed_chromatic"){const d=Math.sin(c*.95);this.targetEdStrength=d>-.15?1:0,this.targetAperture=1.2,this.targetFocusT=0,this.targetFieldAngleDeg=0}else if(this.scenario==="xa_aspheric"){const d=Math.sin(c*.92);this.targetXaStrength=d>-.15?1:0,this.targetAperture=1.2,this.targetFocusT=0,this.targetFieldAngleDeg=0}else if(this.scenario==="nano_ar_baffle"){const d=Math.sin(c*.85);this.targetNanoArStrength=d>-.15?1:0,this.targetFieldAngleDeg=6+9*(.5+.5*Math.sin(c*.65)),this.targetAperture=1.6,this.targetFocusT=.12}}}else if(n){const c=.5-.5*Math.cos(e*1.15);this.targetAperture=1.2*Math.pow(11/1.2,c),this.targetFocusT=.5-.5*Math.cos(e*1.45),this.targetFieldAngleDeg=0,this.targetXaStrength=1,this.targetEdStrength=1,this.targetNanoArStrength=1}else this.targetAperture=1.2,this.targetFocusT=0,this.targetFieldAngleDeg=0,this.targetXaStrength=1,this.targetEdStrength=1,this.targetNanoArStrength=1;const o=1-Math.exp(-s*9.5),a=1-Math.exp(-s*6.5);this.aperture+=(this.targetAperture-this.aperture)*o,this.focusT+=(this.targetFocusT-this.focusT)*o,this.fieldAngleDeg+=(this.targetFieldAngleDeg-this.fieldAngleDeg)*o,this.xaStrength+=(this.targetXaStrength-this.xaStrength)*a,this.edStrength+=(this.targetEdStrength-this.edStrength)*a,this.nanoArStrength+=(this.targetNanoArStrength-this.nanoArStrength)*a;const l=this.getFloatingStrokes();this.focusVelocityA=(l.dzA-this.prevDzA)/s,this.focusVelocityB=(l.dzB-this.prevDzB)/s,this.prevDzA=l.dzA,this.prevDzB=l.dzB}getFloatingStrokes(){return Bd(this.focusT)}getIrisMetrics(){return Vd(this.aperture,this.focusT)}getFocusDistanceLabel(){if(this.focusT<.025)return"∞（無限遠）";const e=1/(this.focusT*2.5);return e>=10?"∞（遠景）":`${e.toFixed(2)} m`}getScenarioDescriptor(){return nl.find(e=>e.id===this.scenario)??nl[0]}cachedBundleKey="";cachedBundleRays=[];traceActiveBundle(e=136){const t=`${e}|${this.scenario}|${this.aperture.toFixed(5)}|${this.focusT.toFixed(5)}|${this.fieldAngleDeg.toFixed(4)}|${this.xaStrength.toFixed(4)}|${this.edStrength.toFixed(4)}|${this.nanoArStrength.toFixed(4)}`;if(t===this.cachedBundleKey)return this.cachedBundleRays;const n=this.getFloatingStrokes(),s=this.getIrisMetrics(),o=[];this.cachedBundleKey=t,this.cachedBundleRays=o;const a=this.focusT*2.5,l=(f,r,p)=>{const v=a>.001?Math.atan((f-r)*a/1e3):0,x=-p+v;return{dy:Math.sin(x),dz:-Math.cos(x)}},c=this.fieldAngleDeg*Math.PI/180,d=zd(this.fieldAngleDeg,n.dzA,n.dzB,e);if(this.scenario==="ed_chromatic"){const f=[-19.2,-11.5,0,11.5,19.2],r=[{shift:-1,color:"#ef4444",hex:15680580,role:"rgb_r"},{shift:0,color:"#10b981",hex:1096065,role:"rgb_g"},{shift:1,color:"#2563eb",hex:2450411,role:"rgb_b"}];for(const p of f){const v=d+p,x=l(v,d,c);for(const g of r)p===0&&g.shift!==0||o.push(ds({yStart:v,zStart:e,dyStart:x.dy,dzStart:x.dz,lambdaShift:g.shift,xaStrength:this.xaStrength,edStrength:this.edStrength,dzA:n.dzA,dzB:n.dzB,irisRadiusMm:s.irisRadiusMm,stopAtIrisIfClipped:!0,color:g.color,hexColor:g.hex,rayRole:g.role,opacity:p===0?.65:.84,width:p===0?1.2:1.75}))}return o}if(this.scenario==="xa_aspheric"){const f=[-20.6,-17.5,-13.5,-7.5,0,7.5,13.5,17.5,20.6];for(const r of f){const v=Math.abs(r)>=13,x=this.xaStrength<.5&&v?"#e11d48":v?"#0284c7":"#0d9488",g=this.xaStrength<.5&&v?14753096:v?165063:889992,m=d+r,M=l(m,d,c);o.push(ds({yStart:m,zStart:e,dyStart:M.dy,dzStart:M.dz,lambdaShift:0,xaStrength:this.xaStrength,edStrength:1,dzA:n.dzA,dzB:n.dzB,irisRadiusMm:s.irisRadiusMm,stopAtIrisIfClipped:!0,color:r===0?"#f59e0b":x,hexColor:r===0?16096779:g,rayRole:r===0?"chief":v?"marginal":"paraxial",opacity:r===0?.72:.88,width:v?1.9:1.5}))}return o}const u=[-20.4,-15.5,-10.5,-5.2,0,5.2,10.5,15.5,20.4];for(const f of u){const r=d+f,p=l(r,d,c),v=f===0,x=Math.abs(f)>=15,g=v?"#f59e0b":(this.scenario==="floating_xd",x?"#0284c7":"#0ea5e9"),m=v?16096779:x?165063:959977;o.push(ds({yStart:r,zStart:e,dyStart:p.dy,dzStart:p.dz,lambdaShift:0,xaStrength:this.xaStrength,edStrength:this.edStrength,dzA:n.dzA,dzB:n.dzB,irisRadiusMm:s.irisRadiusMm,stopAtIrisIfClipped:!0,color:g,hexColor:m,rayRole:v?"chief":x?"marginal":"paraxial",opacity:v?.82:.85,width:v?1.7:1.65}))}if(this.scenario==="nano_ar_baffle"){const f=1-this.nanoArStrength*.94;o.push({points:[{z:e,y:26},{z:108.5,y:18},{z:95.8,y:11},{z:105.5,y:2.5},{z:82,y:-6.5},{z:42,y:-11.5},{z:0,y:-14.2}],color:"#ef4444",hexColor:15680580,lambdaShift:0,clippedAtIris:!1,yIris:-6.5,ySensor:-14.2,zFocus:0,craDeg:8,rayRole:"ghost",opacity:f*.88,width:1.85}),o.push({points:[{z:e,y:-23},{z:108.5,y:-14},{z:71,y:-7.5},{z:87.4,y:3.5},{z:42,y:9.8},{z:0,y:12.6}],color:"#f97316",hexColor:16347926,lambdaShift:0,clippedAtIris:!1,yIris:0,ySensor:12.6,zFocus:0,craDeg:7,rayRole:"ghost",opacity:f*.78,width:1.6}),o.push({points:[{z:e,y:36.5},{z:124,y:31.2}],color:"#94a3b8",hexColor:9741240,lambdaShift:0,clippedAtIris:!0,yIris:31,ySensor:31,zFocus:124,craDeg:0,rayRole:"stray",opacity:.65,width:1.35}),o.push({points:[{z:e,y:-33},{z:108.5,y:-26},{z:82,y:-18.8},{z:38.2,y:-15.6}],color:"#94a3b8",hexColor:9741240,lambdaShift:0,clippedAtIris:!0,yIris:-18.8,ySensor:-15.6,zFocus:38.2,craDeg:0,rayRole:"stray",opacity:.65,width:1.35})}return o}}const hn=new kd;/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ca="174",Ni={ROTATE:0,DOLLY:1,PAN:2},Di={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Hd=0,ol=1,Gd=2,Ic=1,Wd=2,Sn=3,wn=0,Ht=1,an=2,On=0,Oi=1,al=2,ll=3,cl=4,Xd=5,ei=100,qd=101,Yd=102,$d=103,Kd=104,Zd=200,jd=201,Jd=202,Qd=203,Vo=204,zo=205,eh=206,th=207,nh=208,ih=209,sh=210,rh=211,oh=212,ah=213,lh=214,ko=0,Ho=1,Go=2,Gi=3,Wo=4,Xo=5,qo=6,Yo=7,Ra=0,ch=1,dh=2,Bn=0,hh=1,uh=2,fh=3,Dc=4,ph=5,mh=6,gh=7,Fc=300,Wi=301,Xi=302,xr=303,$o=304,Tr=306,oi=1e3,ni=1001,Ko=1002,qt=1003,_h=1004,Ts=1005,Pt=1006,kr=1007,Nn=1008,Pn=1009,Uc=1010,Nc=1011,gs=1012,La=1013,Vn=1014,Qt=1015,Ms=1016,Ia=1017,Da=1018,qi=1020,Oc=35902,Bc=1021,Vc=1022,Ft=1023,zc=1024,kc=1025,Bi=1026,Yi=1027,Fa=1028,wr=1029,Hc=1030,Ua=1031,Na=1033,hr=33776,ur=33777,fr=33778,pr=33779,Zo=35840,jo=35841,Jo=35842,Qo=35843,ea=36196,ta=37492,na=37496,ia=37808,sa=37809,ra=37810,oa=37811,aa=37812,la=37813,ca=37814,da=37815,ha=37816,ua=37817,fa=37818,pa=37819,ma=37820,ga=37821,mr=36492,_a=36494,va=36495,Gc=36283,xa=36284,ya=36285,Ma=36286,vh=3200,xh=3201,Oa=0,yh=1,Un="",wt="srgb",$i="srgb-linear",yr="linear",lt="srgb",pi=7680,dl=519,Mh=512,bh=513,Sh=514,Wc=515,Eh=516,Ah=517,Th=518,wh=519,hl=35044,k0=35048,ul="300 es",An=2e3,Mr=2001;class hi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const o=s.indexOf(t);o!==-1&&s.splice(o,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let o=0,a=s.length;o<a;o++)s[o].call(this,e);e.target=null}}}const Lt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let fl=1234567;const Vi=Math.PI/180,_s=180/Math.PI;function ui(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Lt[i&255]+Lt[i>>8&255]+Lt[i>>16&255]+Lt[i>>24&255]+"-"+Lt[e&255]+Lt[e>>8&255]+"-"+Lt[e>>16&15|64]+Lt[e>>24&255]+"-"+Lt[t&63|128]+Lt[t>>8&255]+"-"+Lt[t>>16&255]+Lt[t>>24&255]+Lt[n&255]+Lt[n>>8&255]+Lt[n>>16&255]+Lt[n>>24&255]).toLowerCase()}function Ge(i,e,t){return Math.max(e,Math.min(t,i))}function Ba(i,e){return(i%e+e)%e}function Ph(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Ch(i,e,t){return i!==e?(t-i)/(e-i):0}function hs(i,e,t){return(1-t)*i+t*e}function Rh(i,e,t,n){return hs(i,e,1-Math.exp(-t*n))}function Lh(i,e=1){return e-Math.abs(Ba(i,e*2)-e)}function Ih(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Dh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Fh(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Uh(i,e){return i+Math.random()*(e-i)}function Nh(i){return i*(.5-Math.random())}function Oh(i){i!==void 0&&(fl=i);let e=fl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Bh(i){return i*Vi}function Vh(i){return i*_s}function zh(i){return(i&i-1)===0&&i!==0}function kh(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Hh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Gh(i,e,t,n,s){const o=Math.cos,a=Math.sin,l=o(t/2),c=a(t/2),d=o((e+n)/2),u=a((e+n)/2),f=o((e-n)/2),r=a((e-n)/2),p=o((n-e)/2),v=a((n-e)/2);switch(s){case"XYX":i.set(l*u,c*f,c*r,l*d);break;case"YZY":i.set(c*r,l*u,c*f,l*d);break;case"ZXZ":i.set(c*f,c*r,l*u,l*d);break;case"XZX":i.set(l*u,c*v,c*p,l*d);break;case"YXY":i.set(c*p,l*u,c*v,l*d);break;case"ZYZ":i.set(c*v,c*p,l*u,l*d);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ii(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Nt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const gr={DEG2RAD:Vi,RAD2DEG:_s,generateUUID:ui,clamp:Ge,euclideanModulo:Ba,mapLinear:Ph,inverseLerp:Ch,lerp:hs,damp:Rh,pingpong:Lh,smoothstep:Ih,smootherstep:Dh,randInt:Fh,randFloat:Uh,randFloatSpread:Nh,seededRandom:Oh,degToRad:Bh,radToDeg:Vh,isPowerOfTwo:zh,ceilPowerOfTwo:kh,floorPowerOfTwo:Hh,setQuaternionFromProperEuler:Gh,normalize:Nt,denormalize:Ii};class ie{constructor(e=0,t=0){ie.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ge(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),o=this.x-e.x,a=this.y-e.y;return this.x=o*n-a*s+e.x,this.y=o*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xe{constructor(e,t,n,s,o,a,l,c,d){Xe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,o,a,l,c,d)}set(e,t,n,s,o,a,l,c,d){const u=this.elements;return u[0]=e,u[1]=s,u[2]=l,u[3]=t,u[4]=o,u[5]=c,u[6]=n,u[7]=a,u[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,o=this.elements,a=n[0],l=n[3],c=n[6],d=n[1],u=n[4],f=n[7],r=n[2],p=n[5],v=n[8],x=s[0],g=s[3],m=s[6],M=s[1],b=s[4],y=s[7],I=s[2],P=s[5],L=s[8];return o[0]=a*x+l*M+c*I,o[3]=a*g+l*b+c*P,o[6]=a*m+l*y+c*L,o[1]=d*x+u*M+f*I,o[4]=d*g+u*b+f*P,o[7]=d*m+u*y+f*L,o[2]=r*x+p*M+v*I,o[5]=r*g+p*b+v*P,o[8]=r*m+p*y+v*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],o=e[3],a=e[4],l=e[5],c=e[6],d=e[7],u=e[8];return t*a*u-t*l*d-n*o*u+n*l*c+s*o*d-s*a*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],o=e[3],a=e[4],l=e[5],c=e[6],d=e[7],u=e[8],f=u*a-l*d,r=l*c-u*o,p=d*o-a*c,v=t*f+n*r+s*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/v;return e[0]=f*x,e[1]=(s*d-u*n)*x,e[2]=(l*n-s*a)*x,e[3]=r*x,e[4]=(u*t-s*c)*x,e[5]=(s*o-l*t)*x,e[6]=p*x,e[7]=(n*c-d*t)*x,e[8]=(a*t-n*o)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,o,a,l){const c=Math.cos(o),d=Math.sin(o);return this.set(n*c,n*d,-n*(c*a+d*l)+a+e,-s*d,s*c,-s*(-d*a+c*l)+l+t,0,0,1),this}scale(e,t){return this.premultiply(Hr.makeScale(e,t)),this}rotate(e){return this.premultiply(Hr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Hr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Hr=new Xe;function Xc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function br(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Wh(){const i=br("canvas");return i.style.display="block",i}const pl={};function Jn(i){i in pl||(pl[i]=!0,console.warn(i))}function Xh(i,e,t){return new Promise(function(n,s){function o(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(o,t);break;default:n()}}setTimeout(o,t)})}function qh(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Yh(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const ml=new Xe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),gl=new Xe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $h(){const i={enabled:!0,workingColorSpace:$i,spaces:{},convert:function(s,o,a){return this.enabled===!1||o===a||!o||!a||(this.spaces[o].transfer===lt&&(s.r=Tn(s.r),s.g=Tn(s.g),s.b=Tn(s.b)),this.spaces[o].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[o].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===lt&&(s.r=zi(s.r),s.g=zi(s.g),s.b=zi(s.b))),s},fromWorkingColorSpace:function(s,o){return this.convert(s,this.workingColorSpace,o)},toWorkingColorSpace:function(s,o){return this.convert(s,o,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Un?yr:this.spaces[s].transfer},getLuminanceCoefficients:function(s,o=this.workingColorSpace){return s.fromArray(this.spaces[o].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,o,a){return s.copy(this.spaces[o].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[$i]:{primaries:e,whitePoint:n,transfer:yr,toXYZ:ml,fromXYZ:gl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:wt},outputColorSpaceConfig:{drawingBufferColorSpace:wt}},[wt]:{primaries:e,whitePoint:n,transfer:lt,toXYZ:ml,fromXYZ:gl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:wt}}}),i}const tt=$h();function Tn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function zi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let mi;class Kh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{mi===void 0&&(mi=br("canvas")),mi.width=e.width,mi.height=e.height;const n=mi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=mi}return t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=br("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),o=s.data;for(let a=0;a<o.length;a++)o[a]=Tn(o[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Tn(t[n]/255)*255):t[n]=Tn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Zh=0;class Va{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Zh++}),this.uuid=ui(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let o;if(Array.isArray(s)){o=[];for(let a=0,l=s.length;a<l;a++)s[a].isDataTexture?o.push(Gr(s[a].image)):o.push(Gr(s[a]))}else o=Gr(s);n.url=o}return t||(e.images[this.uuid]=n),n}}function Gr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Kh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let jh=0;class Ct extends hi{constructor(e=Ct.DEFAULT_IMAGE,t=Ct.DEFAULT_MAPPING,n=ni,s=ni,o=Pt,a=Nn,l=Ft,c=Pn,d=Ct.DEFAULT_ANISOTROPY,u=Un){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jh++}),this.uuid=ui(),this.name="",this.source=new Va(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=o,this.minFilter=a,this.anisotropy=d,this.format=l,this.internalFormat=null,this.type=c,this.offset=new ie(0,0),this.repeat=new ie(1,1),this.center=new ie(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Fc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case oi:e.x=e.x-Math.floor(e.x);break;case ni:e.x=e.x<0?0:1;break;case Ko:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case oi:e.y=e.y-Math.floor(e.y);break;case ni:e.y=e.y<0?0:1;break;case Ko:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ct.DEFAULT_IMAGE=null;Ct.DEFAULT_MAPPING=Fc;Ct.DEFAULT_ANISOTROPY=1;class mt{constructor(e=0,t=0,n=0,s=1){mt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,o=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*o,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*o,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*o,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*o,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,o;const c=e.elements,d=c[0],u=c[4],f=c[8],r=c[1],p=c[5],v=c[9],x=c[2],g=c[6],m=c[10];if(Math.abs(u-r)<.01&&Math.abs(f-x)<.01&&Math.abs(v-g)<.01){if(Math.abs(u+r)<.1&&Math.abs(f+x)<.1&&Math.abs(v+g)<.1&&Math.abs(d+p+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(d+1)/2,y=(p+1)/2,I=(m+1)/2,P=(u+r)/4,L=(f+x)/4,D=(v+g)/4;return b>y&&b>I?b<.01?(n=0,s=.707106781,o=.707106781):(n=Math.sqrt(b),s=P/n,o=L/n):y>I?y<.01?(n=.707106781,s=0,o=.707106781):(s=Math.sqrt(y),n=P/s,o=D/s):I<.01?(n=.707106781,s=.707106781,o=0):(o=Math.sqrt(I),n=L/o,s=D/o),this.set(n,s,o,t),this}let M=Math.sqrt((g-v)*(g-v)+(f-x)*(f-x)+(r-u)*(r-u));return Math.abs(M)<.001&&(M=1),this.x=(g-v)/M,this.y=(f-x)/M,this.z=(r-u)/M,this.w=Math.acos((d+p+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this.w=Ge(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this.w=Ge(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Jh extends hi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new mt(0,0,e,t),this.scissorTest=!1,this.viewport=new mt(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const o=new Ct(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);o.flipY=!1,o.generateMipmaps=n.generateMipmaps,o.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let l=0;l<a;l++)this.textures[l]=o.clone(),this.textures[l].isRenderTargetTexture=!0,this.textures[l].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,o=this.textures.length;s<o;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Va(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ai extends Jh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class qc extends Ct{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=qt,this.minFilter=qt,this.wrapR=ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Qh extends Ct{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=qt,this.minFilter=qt,this.wrapR=ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class li{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,o,a,l){let c=n[s+0],d=n[s+1],u=n[s+2],f=n[s+3];const r=o[a+0],p=o[a+1],v=o[a+2],x=o[a+3];if(l===0){e[t+0]=c,e[t+1]=d,e[t+2]=u,e[t+3]=f;return}if(l===1){e[t+0]=r,e[t+1]=p,e[t+2]=v,e[t+3]=x;return}if(f!==x||c!==r||d!==p||u!==v){let g=1-l;const m=c*r+d*p+u*v+f*x,M=m>=0?1:-1,b=1-m*m;if(b>Number.EPSILON){const I=Math.sqrt(b),P=Math.atan2(I,m*M);g=Math.sin(g*P)/I,l=Math.sin(l*P)/I}const y=l*M;if(c=c*g+r*y,d=d*g+p*y,u=u*g+v*y,f=f*g+x*y,g===1-l){const I=1/Math.sqrt(c*c+d*d+u*u+f*f);c*=I,d*=I,u*=I,f*=I}}e[t]=c,e[t+1]=d,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,s,o,a){const l=n[s],c=n[s+1],d=n[s+2],u=n[s+3],f=o[a],r=o[a+1],p=o[a+2],v=o[a+3];return e[t]=l*v+u*f+c*p-d*r,e[t+1]=c*v+u*r+d*f-l*p,e[t+2]=d*v+u*p+l*r-c*f,e[t+3]=u*v-l*f-c*r-d*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,o=e._z,a=e._order,l=Math.cos,c=Math.sin,d=l(n/2),u=l(s/2),f=l(o/2),r=c(n/2),p=c(s/2),v=c(o/2);switch(a){case"XYZ":this._x=r*u*f+d*p*v,this._y=d*p*f-r*u*v,this._z=d*u*v+r*p*f,this._w=d*u*f-r*p*v;break;case"YXZ":this._x=r*u*f+d*p*v,this._y=d*p*f-r*u*v,this._z=d*u*v-r*p*f,this._w=d*u*f+r*p*v;break;case"ZXY":this._x=r*u*f-d*p*v,this._y=d*p*f+r*u*v,this._z=d*u*v+r*p*f,this._w=d*u*f-r*p*v;break;case"ZYX":this._x=r*u*f-d*p*v,this._y=d*p*f+r*u*v,this._z=d*u*v-r*p*f,this._w=d*u*f+r*p*v;break;case"YZX":this._x=r*u*f+d*p*v,this._y=d*p*f+r*u*v,this._z=d*u*v-r*p*f,this._w=d*u*f-r*p*v;break;case"XZY":this._x=r*u*f-d*p*v,this._y=d*p*f-r*u*v,this._z=d*u*v+r*p*f,this._w=d*u*f+r*p*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],o=t[8],a=t[1],l=t[5],c=t[9],d=t[2],u=t[6],f=t[10],r=n+l+f;if(r>0){const p=.5/Math.sqrt(r+1);this._w=.25/p,this._x=(u-c)*p,this._y=(o-d)*p,this._z=(a-s)*p}else if(n>l&&n>f){const p=2*Math.sqrt(1+n-l-f);this._w=(u-c)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(o+d)/p}else if(l>f){const p=2*Math.sqrt(1+l-n-f);this._w=(o-d)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+f-n-l);this._w=(a-s)/p,this._x=(o+d)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ge(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,o=e._z,a=e._w,l=t._x,c=t._y,d=t._z,u=t._w;return this._x=n*u+a*l+s*d-o*c,this._y=s*u+a*c+o*l-n*d,this._z=o*u+a*d+n*c-s*l,this._w=a*u-n*l-s*c-o*d,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,o=this._z,a=this._w;let l=a*e._w+n*e._x+s*e._y+o*e._z;if(l<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,l=-l):this.copy(e),l>=1)return this._w=a,this._x=n,this._y=s,this._z=o,this;const c=1-l*l;if(c<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*o+t*this._z,this.normalize(),this}const d=Math.sqrt(c),u=Math.atan2(d,l),f=Math.sin((1-t)*u)/d,r=Math.sin(t*u)/d;return this._w=a*f+this._w*r,this._x=n*f+this._x*r,this._y=s*f+this._y*r,this._z=o*f+this._z*r,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),o*Math.sin(t),o*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class A{constructor(e=0,t=0,n=0){A.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(_l.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(_l.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,o=e.elements;return this.x=o[0]*t+o[3]*n+o[6]*s,this.y=o[1]*t+o[4]*n+o[7]*s,this.z=o[2]*t+o[5]*n+o[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,o=e.elements,a=1/(o[3]*t+o[7]*n+o[11]*s+o[15]);return this.x=(o[0]*t+o[4]*n+o[8]*s+o[12])*a,this.y=(o[1]*t+o[5]*n+o[9]*s+o[13])*a,this.z=(o[2]*t+o[6]*n+o[10]*s+o[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,o=e.x,a=e.y,l=e.z,c=e.w,d=2*(a*s-l*n),u=2*(l*t-o*s),f=2*(o*n-a*t);return this.x=t+c*d+a*f-l*u,this.y=n+c*u+l*d-o*f,this.z=s+c*f+o*u-a*d,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s,this.y=o[1]*t+o[5]*n+o[9]*s,this.z=o[2]*t+o[6]*n+o[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,o=e.z,a=t.x,l=t.y,c=t.z;return this.x=s*c-o*l,this.y=o*a-n*c,this.z=n*l-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Wr.copy(this).projectOnVector(e),this.sub(Wr)}reflect(e){return this.sub(Wr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ge(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Wr=new A,_l=new li;class en{constructor(e=new A(1/0,1/0,1/0),t=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(sn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(sn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=sn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const o=n.getAttribute("position");if(t===!0&&o!==void 0&&e.isInstancedMesh!==!0)for(let a=0,l=o.count;a<l;a++)e.isMesh===!0?e.getVertexPosition(a,sn):sn.fromBufferAttribute(o,a),sn.applyMatrix4(e.matrixWorld),this.expandByPoint(sn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ws.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ws.copy(n.boundingBox)),ws.applyMatrix4(e.matrixWorld),this.union(ws)}const s=e.children;for(let o=0,a=s.length;o<a;o++)this.expandByObject(s[o],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,sn),sn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ji),Ps.subVectors(this.max,Ji),gi.subVectors(e.a,Ji),_i.subVectors(e.b,Ji),vi.subVectors(e.c,Ji),Cn.subVectors(_i,gi),Rn.subVectors(vi,_i),Wn.subVectors(gi,vi);let t=[0,-Cn.z,Cn.y,0,-Rn.z,Rn.y,0,-Wn.z,Wn.y,Cn.z,0,-Cn.x,Rn.z,0,-Rn.x,Wn.z,0,-Wn.x,-Cn.y,Cn.x,0,-Rn.y,Rn.x,0,-Wn.y,Wn.x,0];return!Xr(t,gi,_i,vi,Ps)||(t=[1,0,0,0,1,0,0,0,1],!Xr(t,gi,_i,vi,Ps))?!1:(Cs.crossVectors(Cn,Rn),t=[Cs.x,Cs.y,Cs.z],Xr(t,gi,_i,vi,Ps))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,sn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(sn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(vn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),vn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),vn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),vn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),vn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),vn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),vn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),vn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(vn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const vn=[new A,new A,new A,new A,new A,new A,new A,new A],sn=new A,ws=new en,gi=new A,_i=new A,vi=new A,Cn=new A,Rn=new A,Wn=new A,Ji=new A,Ps=new A,Cs=new A,Xn=new A;function Xr(i,e,t,n,s){for(let o=0,a=i.length-3;o<=a;o+=3){Xn.fromArray(i,o);const l=s.x*Math.abs(Xn.x)+s.y*Math.abs(Xn.y)+s.z*Math.abs(Xn.z),c=e.dot(Xn),d=t.dot(Xn),u=n.dot(Xn);if(Math.max(-Math.max(c,d,u),Math.min(c,d,u))>l)return!1}return!0}const eu=new en,Qi=new A,qr=new A;class mn{constructor(e=new A,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):eu.setFromPoints(e).getCenter(n);let s=0;for(let o=0,a=e.length;o<a;o++)s=Math.max(s,n.distanceToSquared(e[o]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Qi.subVectors(e,this.center);const t=Qi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Qi,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(qr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Qi.copy(e.center).add(qr)),this.expandByPoint(Qi.copy(e.center).sub(qr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const xn=new A,Yr=new A,Rs=new A,Ln=new A,$r=new A,Ls=new A,Kr=new A;class Pr{constructor(e=new A,t=new A(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,xn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=xn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(xn.copy(this.origin).addScaledVector(this.direction,t),xn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Yr.copy(e).add(t).multiplyScalar(.5),Rs.copy(t).sub(e).normalize(),Ln.copy(this.origin).sub(Yr);const o=e.distanceTo(t)*.5,a=-this.direction.dot(Rs),l=Ln.dot(this.direction),c=-Ln.dot(Rs),d=Ln.lengthSq(),u=Math.abs(1-a*a);let f,r,p,v;if(u>0)if(f=a*c-l,r=a*l-c,v=o*u,f>=0)if(r>=-v)if(r<=v){const x=1/u;f*=x,r*=x,p=f*(f+a*r+2*l)+r*(a*f+r+2*c)+d}else r=o,f=Math.max(0,-(a*r+l)),p=-f*f+r*(r+2*c)+d;else r=-o,f=Math.max(0,-(a*r+l)),p=-f*f+r*(r+2*c)+d;else r<=-v?(f=Math.max(0,-(-a*o+l)),r=f>0?-o:Math.min(Math.max(-o,-c),o),p=-f*f+r*(r+2*c)+d):r<=v?(f=0,r=Math.min(Math.max(-o,-c),o),p=r*(r+2*c)+d):(f=Math.max(0,-(a*o+l)),r=f>0?o:Math.min(Math.max(-o,-c),o),p=-f*f+r*(r+2*c)+d);else r=a>0?-o:o,f=Math.max(0,-(a*r+l)),p=-f*f+r*(r+2*c)+d;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Yr).addScaledVector(Rs,r),p}intersectSphere(e,t){xn.subVectors(e.center,this.origin);const n=xn.dot(this.direction),s=xn.dot(xn)-n*n,o=e.radius*e.radius;if(s>o)return null;const a=Math.sqrt(o-s),l=n-a,c=n+a;return c<0?null:l<0?this.at(c,t):this.at(l,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,o,a,l,c;const d=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,r=this.origin;return d>=0?(n=(e.min.x-r.x)*d,s=(e.max.x-r.x)*d):(n=(e.max.x-r.x)*d,s=(e.min.x-r.x)*d),u>=0?(o=(e.min.y-r.y)*u,a=(e.max.y-r.y)*u):(o=(e.max.y-r.y)*u,a=(e.min.y-r.y)*u),n>a||o>s||((o>n||isNaN(n))&&(n=o),(a<s||isNaN(s))&&(s=a),f>=0?(l=(e.min.z-r.z)*f,c=(e.max.z-r.z)*f):(l=(e.max.z-r.z)*f,c=(e.min.z-r.z)*f),n>c||l>s)||((l>n||n!==n)&&(n=l),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,xn)!==null}intersectTriangle(e,t,n,s,o){$r.subVectors(t,e),Ls.subVectors(n,e),Kr.crossVectors($r,Ls);let a=this.direction.dot(Kr),l;if(a>0){if(s)return null;l=1}else if(a<0)l=-1,a=-a;else return null;Ln.subVectors(this.origin,e);const c=l*this.direction.dot(Ls.crossVectors(Ln,Ls));if(c<0)return null;const d=l*this.direction.dot($r.cross(Ln));if(d<0||c+d>a)return null;const u=-l*Ln.dot(Kr);return u<0?null:this.at(u/a,o)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class at{constructor(e,t,n,s,o,a,l,c,d,u,f,r,p,v,x,g){at.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,o,a,l,c,d,u,f,r,p,v,x,g)}set(e,t,n,s,o,a,l,c,d,u,f,r,p,v,x,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=o,m[5]=a,m[9]=l,m[13]=c,m[2]=d,m[6]=u,m[10]=f,m[14]=r,m[3]=p,m[7]=v,m[11]=x,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new at().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/xi.setFromMatrixColumn(e,0).length(),o=1/xi.setFromMatrixColumn(e,1).length(),a=1/xi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*o,t[5]=n[5]*o,t[6]=n[6]*o,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,o=e.z,a=Math.cos(n),l=Math.sin(n),c=Math.cos(s),d=Math.sin(s),u=Math.cos(o),f=Math.sin(o);if(e.order==="XYZ"){const r=a*u,p=a*f,v=l*u,x=l*f;t[0]=c*u,t[4]=-c*f,t[8]=d,t[1]=p+v*d,t[5]=r-x*d,t[9]=-l*c,t[2]=x-r*d,t[6]=v+p*d,t[10]=a*c}else if(e.order==="YXZ"){const r=c*u,p=c*f,v=d*u,x=d*f;t[0]=r+x*l,t[4]=v*l-p,t[8]=a*d,t[1]=a*f,t[5]=a*u,t[9]=-l,t[2]=p*l-v,t[6]=x+r*l,t[10]=a*c}else if(e.order==="ZXY"){const r=c*u,p=c*f,v=d*u,x=d*f;t[0]=r-x*l,t[4]=-a*f,t[8]=v+p*l,t[1]=p+v*l,t[5]=a*u,t[9]=x-r*l,t[2]=-a*d,t[6]=l,t[10]=a*c}else if(e.order==="ZYX"){const r=a*u,p=a*f,v=l*u,x=l*f;t[0]=c*u,t[4]=v*d-p,t[8]=r*d+x,t[1]=c*f,t[5]=x*d+r,t[9]=p*d-v,t[2]=-d,t[6]=l*c,t[10]=a*c}else if(e.order==="YZX"){const r=a*c,p=a*d,v=l*c,x=l*d;t[0]=c*u,t[4]=x-r*f,t[8]=v*f+p,t[1]=f,t[5]=a*u,t[9]=-l*u,t[2]=-d*u,t[6]=p*f+v,t[10]=r-x*f}else if(e.order==="XZY"){const r=a*c,p=a*d,v=l*c,x=l*d;t[0]=c*u,t[4]=-f,t[8]=d*u,t[1]=r*f+x,t[5]=a*u,t[9]=p*f-v,t[2]=v*f-p,t[6]=l*u,t[10]=x*f+r}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(tu,e,nu)}lookAt(e,t,n){const s=this.elements;return Wt.subVectors(e,t),Wt.lengthSq()===0&&(Wt.z=1),Wt.normalize(),In.crossVectors(n,Wt),In.lengthSq()===0&&(Math.abs(n.z)===1?Wt.x+=1e-4:Wt.z+=1e-4,Wt.normalize(),In.crossVectors(n,Wt)),In.normalize(),Is.crossVectors(Wt,In),s[0]=In.x,s[4]=Is.x,s[8]=Wt.x,s[1]=In.y,s[5]=Is.y,s[9]=Wt.y,s[2]=In.z,s[6]=Is.z,s[10]=Wt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,o=this.elements,a=n[0],l=n[4],c=n[8],d=n[12],u=n[1],f=n[5],r=n[9],p=n[13],v=n[2],x=n[6],g=n[10],m=n[14],M=n[3],b=n[7],y=n[11],I=n[15],P=s[0],L=s[4],D=s[8],w=s[12],S=s[1],F=s[5],G=s[9],k=s[13],X=s[2],J=s[6],Y=s[10],oe=s[14],$=s[3],fe=s[7],ve=s[11],le=s[15];return o[0]=a*P+l*S+c*X+d*$,o[4]=a*L+l*F+c*J+d*fe,o[8]=a*D+l*G+c*Y+d*ve,o[12]=a*w+l*k+c*oe+d*le,o[1]=u*P+f*S+r*X+p*$,o[5]=u*L+f*F+r*J+p*fe,o[9]=u*D+f*G+r*Y+p*ve,o[13]=u*w+f*k+r*oe+p*le,o[2]=v*P+x*S+g*X+m*$,o[6]=v*L+x*F+g*J+m*fe,o[10]=v*D+x*G+g*Y+m*ve,o[14]=v*w+x*k+g*oe+m*le,o[3]=M*P+b*S+y*X+I*$,o[7]=M*L+b*F+y*J+I*fe,o[11]=M*D+b*G+y*Y+I*ve,o[15]=M*w+b*k+y*oe+I*le,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],o=e[12],a=e[1],l=e[5],c=e[9],d=e[13],u=e[2],f=e[6],r=e[10],p=e[14],v=e[3],x=e[7],g=e[11],m=e[15];return v*(+o*c*f-s*d*f-o*l*r+n*d*r+s*l*p-n*c*p)+x*(+t*c*p-t*d*r+o*a*r-s*a*p+s*d*u-o*c*u)+g*(+t*d*f-t*l*p-o*a*f+n*a*p+o*l*u-n*d*u)+m*(-s*l*u-t*c*f+t*l*r+s*a*f-n*a*r+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],o=e[3],a=e[4],l=e[5],c=e[6],d=e[7],u=e[8],f=e[9],r=e[10],p=e[11],v=e[12],x=e[13],g=e[14],m=e[15],M=f*g*d-x*r*d+x*c*p-l*g*p-f*c*m+l*r*m,b=v*r*d-u*g*d-v*c*p+a*g*p+u*c*m-a*r*m,y=u*x*d-v*f*d+v*l*p-a*x*p-u*l*m+a*f*m,I=v*f*c-u*x*c-v*l*r+a*x*r+u*l*g-a*f*g,P=t*M+n*b+s*y+o*I;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/P;return e[0]=M*L,e[1]=(x*r*o-f*g*o-x*s*p+n*g*p+f*s*m-n*r*m)*L,e[2]=(l*g*o-x*c*o+x*s*d-n*g*d-l*s*m+n*c*m)*L,e[3]=(f*c*o-l*r*o-f*s*d+n*r*d+l*s*p-n*c*p)*L,e[4]=b*L,e[5]=(u*g*o-v*r*o+v*s*p-t*g*p-u*s*m+t*r*m)*L,e[6]=(v*c*o-a*g*o-v*s*d+t*g*d+a*s*m-t*c*m)*L,e[7]=(a*r*o-u*c*o+u*s*d-t*r*d-a*s*p+t*c*p)*L,e[8]=y*L,e[9]=(v*f*o-u*x*o-v*n*p+t*x*p+u*n*m-t*f*m)*L,e[10]=(a*x*o-v*l*o+v*n*d-t*x*d-a*n*m+t*l*m)*L,e[11]=(u*l*o-a*f*o-u*n*d+t*f*d+a*n*p-t*l*p)*L,e[12]=I*L,e[13]=(u*x*s-v*f*s+v*n*r-t*x*r-u*n*g+t*f*g)*L,e[14]=(v*l*s-a*x*s-v*n*c+t*x*c+a*n*g-t*l*g)*L,e[15]=(a*f*s-u*l*s+u*n*c-t*f*c-a*n*r+t*l*r)*L,this}scale(e){const t=this.elements,n=e.x,s=e.y,o=e.z;return t[0]*=n,t[4]*=s,t[8]*=o,t[1]*=n,t[5]*=s,t[9]*=o,t[2]*=n,t[6]*=s,t[10]*=o,t[3]*=n,t[7]*=s,t[11]*=o,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),o=1-n,a=e.x,l=e.y,c=e.z,d=o*a,u=o*l;return this.set(d*a+n,d*l-s*c,d*c+s*l,0,d*l+s*c,u*l+n,u*c-s*a,0,d*c-s*l,u*c+s*a,o*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,o,a){return this.set(1,n,o,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,o=t._x,a=t._y,l=t._z,c=t._w,d=o+o,u=a+a,f=l+l,r=o*d,p=o*u,v=o*f,x=a*u,g=a*f,m=l*f,M=c*d,b=c*u,y=c*f,I=n.x,P=n.y,L=n.z;return s[0]=(1-(x+m))*I,s[1]=(p+y)*I,s[2]=(v-b)*I,s[3]=0,s[4]=(p-y)*P,s[5]=(1-(r+m))*P,s[6]=(g+M)*P,s[7]=0,s[8]=(v+b)*L,s[9]=(g-M)*L,s[10]=(1-(r+x))*L,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let o=xi.set(s[0],s[1],s[2]).length();const a=xi.set(s[4],s[5],s[6]).length(),l=xi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(o=-o),e.x=s[12],e.y=s[13],e.z=s[14],rn.copy(this);const d=1/o,u=1/a,f=1/l;return rn.elements[0]*=d,rn.elements[1]*=d,rn.elements[2]*=d,rn.elements[4]*=u,rn.elements[5]*=u,rn.elements[6]*=u,rn.elements[8]*=f,rn.elements[9]*=f,rn.elements[10]*=f,t.setFromRotationMatrix(rn),n.x=o,n.y=a,n.z=l,this}makePerspective(e,t,n,s,o,a,l=An){const c=this.elements,d=2*o/(t-e),u=2*o/(n-s),f=(t+e)/(t-e),r=(n+s)/(n-s);let p,v;if(l===An)p=-(a+o)/(a-o),v=-2*a*o/(a-o);else if(l===Mr)p=-a/(a-o),v=-a*o/(a-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return c[0]=d,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=r,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,o,a,l=An){const c=this.elements,d=1/(t-e),u=1/(n-s),f=1/(a-o),r=(t+e)*d,p=(n+s)*u;let v,x;if(l===An)v=(a+o)*f,x=-2*f;else if(l===Mr)v=o*f,x=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return c[0]=2*d,c[4]=0,c[8]=0,c[12]=-r,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=x,c[14]=-v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const xi=new A,rn=new at,tu=new A(0,0,0),nu=new A(1,1,1),In=new A,Is=new A,Wt=new A,vl=new at,xl=new li;class ln{constructor(e=0,t=0,n=0,s=ln.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,o=s[0],a=s[4],l=s[8],c=s[1],d=s[5],u=s[9],f=s[2],r=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Ge(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,o)):(this._x=Math.atan2(r,d),this._z=0);break;case"YXZ":this._x=Math.asin(-Ge(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(l,p),this._z=Math.atan2(c,d)):(this._y=Math.atan2(-f,o),this._z=0);break;case"ZXY":this._x=Math.asin(Ge(r,-1,1)),Math.abs(r)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,d)):(this._y=0,this._z=Math.atan2(c,o));break;case"ZYX":this._y=Math.asin(-Ge(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(r,p),this._z=Math.atan2(c,o)):(this._x=0,this._z=Math.atan2(-a,d));break;case"YZX":this._z=Math.asin(Ge(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,d),this._y=Math.atan2(-f,o)):(this._x=0,this._y=Math.atan2(l,p));break;case"XZY":this._z=Math.asin(-Ge(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(r,d),this._y=Math.atan2(l,o)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return vl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(vl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return xl.setFromEuler(this),this.setFromQuaternion(xl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ln.DEFAULT_ORDER="XYZ";class za{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let iu=0;const yl=new A,yi=new li,yn=new at,Ds=new A,es=new A,su=new A,ru=new li,Ml=new A(1,0,0),bl=new A(0,1,0),Sl=new A(0,0,1),El={type:"added"},ou={type:"removed"},Mi={type:"childadded",child:null},Zr={type:"childremoved",child:null};class bt extends hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:iu++}),this.uuid=ui(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=bt.DEFAULT_UP.clone();const e=new A,t=new ln,n=new li,s=new A(1,1,1);function o(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(o),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new at},normalMatrix:{value:new Xe}}),this.matrix=new at,this.matrixWorld=new at,this.matrixAutoUpdate=bt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new za,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return yi.setFromAxisAngle(e,t),this.quaternion.multiply(yi),this}rotateOnWorldAxis(e,t){return yi.setFromAxisAngle(e,t),this.quaternion.premultiply(yi),this}rotateX(e){return this.rotateOnAxis(Ml,e)}rotateY(e){return this.rotateOnAxis(bl,e)}rotateZ(e){return this.rotateOnAxis(Sl,e)}translateOnAxis(e,t){return yl.copy(e).applyQuaternion(this.quaternion),this.position.add(yl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ml,e)}translateY(e){return this.translateOnAxis(bl,e)}translateZ(e){return this.translateOnAxis(Sl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ds.copy(e):Ds.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),es.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yn.lookAt(es,Ds,this.up):yn.lookAt(Ds,es,this.up),this.quaternion.setFromRotationMatrix(yn),s&&(yn.extractRotation(s.matrixWorld),yi.setFromRotationMatrix(yn),this.quaternion.premultiply(yi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(El),Mi.child=e,this.dispatchEvent(Mi),Mi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ou),Zr.child=e,this.dispatchEvent(Zr),Zr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(yn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(El),Mi.child=e,this.dispatchEvent(Mi),Mi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(es,e,su),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(es,ru,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(l=>({boxInitialized:l.boxInitialized,boxMin:l.box.min.toArray(),boxMax:l.box.max.toArray(),sphereInitialized:l.sphereInitialized,sphereRadius:l.sphere.radius,sphereCenter:l.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function o(l,c){return l[c.uuid]===void 0&&(l[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(e.geometries,this.geometry);const l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){const c=l.shapes;if(Array.isArray(c))for(let d=0,u=c.length;d<u;d++){const f=c[d];o(e.shapes,f)}else o(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const l=[];for(let c=0,d=this.material.length;c<d;c++)l.push(o(e.materials,this.material[c]));s.material=l}else s.material=o(e.materials,this.material);if(this.children.length>0){s.children=[];for(let l=0;l<this.children.length;l++)s.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let l=0;l<this.animations.length;l++){const c=this.animations[l];s.animations.push(o(e.animations,c))}}if(t){const l=a(e.geometries),c=a(e.materials),d=a(e.textures),u=a(e.images),f=a(e.shapes),r=a(e.skeletons),p=a(e.animations),v=a(e.nodes);l.length>0&&(n.geometries=l),c.length>0&&(n.materials=c),d.length>0&&(n.textures=d),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),r.length>0&&(n.skeletons=r),p.length>0&&(n.animations=p),v.length>0&&(n.nodes=v)}return n.object=s,n;function a(l){const c=[];for(const d in l){const u=l[d];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}bt.DEFAULT_UP=new A(0,1,0);bt.DEFAULT_MATRIX_AUTO_UPDATE=!0;bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const on=new A,Mn=new A,jr=new A,bn=new A,bi=new A,Si=new A,Al=new A,Jr=new A,Qr=new A,eo=new A,to=new mt,no=new mt,io=new mt;class Jt{constructor(e=new A,t=new A,n=new A){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),on.subVectors(e,t),s.cross(on);const o=s.lengthSq();return o>0?s.multiplyScalar(1/Math.sqrt(o)):s.set(0,0,0)}static getBarycoord(e,t,n,s,o){on.subVectors(s,t),Mn.subVectors(n,t),jr.subVectors(e,t);const a=on.dot(on),l=on.dot(Mn),c=on.dot(jr),d=Mn.dot(Mn),u=Mn.dot(jr),f=a*d-l*l;if(f===0)return o.set(0,0,0),null;const r=1/f,p=(d*c-l*u)*r,v=(a*u-l*c)*r;return o.set(1-p-v,v,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,bn)===null?!1:bn.x>=0&&bn.y>=0&&bn.x+bn.y<=1}static getInterpolation(e,t,n,s,o,a,l,c){return this.getBarycoord(e,t,n,s,bn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(o,bn.x),c.addScaledVector(a,bn.y),c.addScaledVector(l,bn.z),c)}static getInterpolatedAttribute(e,t,n,s,o,a){return to.setScalar(0),no.setScalar(0),io.setScalar(0),to.fromBufferAttribute(e,t),no.fromBufferAttribute(e,n),io.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(to,o.x),a.addScaledVector(no,o.y),a.addScaledVector(io,o.z),a}static isFrontFacing(e,t,n,s){return on.subVectors(n,t),Mn.subVectors(e,t),on.cross(Mn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return on.subVectors(this.c,this.b),Mn.subVectors(this.a,this.b),on.cross(Mn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Jt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Jt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,o){return Jt.getInterpolation(e,this.a,this.b,this.c,t,n,s,o)}containsPoint(e){return Jt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Jt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,o=this.c;let a,l;bi.subVectors(s,n),Si.subVectors(o,n),Jr.subVectors(e,n);const c=bi.dot(Jr),d=Si.dot(Jr);if(c<=0&&d<=0)return t.copy(n);Qr.subVectors(e,s);const u=bi.dot(Qr),f=Si.dot(Qr);if(u>=0&&f<=u)return t.copy(s);const r=c*f-u*d;if(r<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(bi,a);eo.subVectors(e,o);const p=bi.dot(eo),v=Si.dot(eo);if(v>=0&&p<=v)return t.copy(o);const x=p*d-c*v;if(x<=0&&d>=0&&v<=0)return l=d/(d-v),t.copy(n).addScaledVector(Si,l);const g=u*v-p*f;if(g<=0&&f-u>=0&&p-v>=0)return Al.subVectors(o,s),l=(f-u)/(f-u+(p-v)),t.copy(s).addScaledVector(Al,l);const m=1/(g+x+r);return a=x*m,l=r*m,t.copy(n).addScaledVector(bi,a).addScaledVector(Si,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Yc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Dn={h:0,s:0,l:0},Fs={h:0,s:0,l:0};function so(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class qe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=wt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=tt.workingColorSpace){return this.r=e,this.g=t,this.b=n,tt.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=tt.workingColorSpace){if(e=Ba(e,1),t=Ge(t,0,1),n=Ge(n,0,1),t===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+t):n+t-n*t,a=2*n-o;this.r=so(a,o,e+1/3),this.g=so(a,o,e),this.b=so(a,o,e-1/3)}return tt.toWorkingColorSpace(this,s),this}setStyle(e,t=wt){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let o;const a=s[1],l=s[2];switch(a){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,t);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,t);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const o=s[1],a=o.length;if(a===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(o,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=wt){const n=Yc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Tn(e.r),this.g=Tn(e.g),this.b=Tn(e.b),this}copyLinearToSRGB(e){return this.r=zi(e.r),this.g=zi(e.g),this.b=zi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=wt){return tt.fromWorkingColorSpace(It.copy(this),e),Math.round(Ge(It.r*255,0,255))*65536+Math.round(Ge(It.g*255,0,255))*256+Math.round(Ge(It.b*255,0,255))}getHexString(e=wt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=tt.workingColorSpace){tt.fromWorkingColorSpace(It.copy(this),t);const n=It.r,s=It.g,o=It.b,a=Math.max(n,s,o),l=Math.min(n,s,o);let c,d;const u=(l+a)/2;if(l===a)c=0,d=0;else{const f=a-l;switch(d=u<=.5?f/(a+l):f/(2-a-l),a){case n:c=(s-o)/f+(s<o?6:0);break;case s:c=(o-n)/f+2;break;case o:c=(n-s)/f+4;break}c/=6}return e.h=c,e.s=d,e.l=u,e}getRGB(e,t=tt.workingColorSpace){return tt.fromWorkingColorSpace(It.copy(this),t),e.r=It.r,e.g=It.g,e.b=It.b,e}getStyle(e=wt){tt.fromWorkingColorSpace(It.copy(this),e);const t=It.r,n=It.g,s=It.b;return e!==wt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Dn),this.setHSL(Dn.h+e,Dn.s+t,Dn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Dn),e.getHSL(Fs);const n=hs(Dn.h,Fs.h,t),s=hs(Dn.s,Fs.s,t),o=hs(Dn.l,Fs.l,t);return this.setHSL(n,s,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,o=e.elements;return this.r=o[0]*t+o[3]*n+o[6]*s,this.g=o[1]*t+o[4]*n+o[7]*s,this.b=o[2]*t+o[5]*n+o[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const It=new qe;qe.NAMES=Yc;let au=0;class kn extends hi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:au++}),this.uuid=ui(),this.name="",this.type="Material",this.blending=Oi,this.side=wn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Vo,this.blendDst=zo,this.blendEquation=ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=Gi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=dl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=pi,this.stencilZFail=pi,this.stencilZPass=pi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Oi&&(n.blending=this.blending),this.side!==wn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Vo&&(n.blendSrc=this.blendSrc),this.blendDst!==zo&&(n.blendDst=this.blendDst),this.blendEquation!==ei&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Gi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==dl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==pi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==pi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==pi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(o){const a=[];for(const l in o){const c=o[l];delete c.metadata,a.push(c)}return a}if(t){const o=s(e.textures),a=s(e.images);o.length>0&&(n.textures=o),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let o=0;o!==s;++o)n[o]=t[o].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Cr extends kn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ln,this.combine=Ra,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const xt=new A,Us=new ie;let lu=0;class Yt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:lu++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=hl,this.updateRanges=[],this.gpuType=Qt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,o=this.itemSize;s<o;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Us.fromBufferAttribute(this,t),Us.applyMatrix3(e),this.setXY(t,Us.x,Us.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix3(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix4(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyNormalMatrix(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.transformDirection(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ii(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Nt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ii(t,this.array)),t}setX(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ii(t,this.array)),t}setY(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ii(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ii(t,this.array)),t}setW(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),n=Nt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),n=Nt(n,this.array),s=Nt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,o){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),n=Nt(n,this.array),s=Nt(s,this.array),o=Nt(o,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=o,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==hl&&(e.usage=this.usage),e}}class $c extends Yt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Kc extends Yt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ke extends Yt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let cu=0;const Zt=new at,ro=new bt,Ei=new A,Xt=new en,ts=new en,At=new A;class _t extends hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:cu++}),this.uuid=ui(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Xc(e)?Kc:$c)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new Xe().getNormalMatrix(e);n.applyNormalMatrix(o),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Zt.makeRotationFromQuaternion(e),this.applyMatrix4(Zt),this}rotateX(e){return Zt.makeRotationX(e),this.applyMatrix4(Zt),this}rotateY(e){return Zt.makeRotationY(e),this.applyMatrix4(Zt),this}rotateZ(e){return Zt.makeRotationZ(e),this.applyMatrix4(Zt),this}translate(e,t,n){return Zt.makeTranslation(e,t,n),this.applyMatrix4(Zt),this}scale(e,t,n){return Zt.makeScale(e,t,n),this.applyMatrix4(Zt),this}lookAt(e){return ro.lookAt(e),ro.updateMatrix(),this.applyMatrix4(ro.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ei).negate(),this.translate(Ei.x,Ei.y,Ei.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,o=e.length;s<o;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ke(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const o=e[s];t.setXYZ(s,o.x,o.y,o.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new en);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const o=t[n];Xt.setFromBufferAttribute(o),this.morphTargetsRelative?(At.addVectors(this.boundingBox.min,Xt.min),this.boundingBox.expandByPoint(At),At.addVectors(this.boundingBox.max,Xt.max),this.boundingBox.expandByPoint(At)):(this.boundingBox.expandByPoint(Xt.min),this.boundingBox.expandByPoint(Xt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(e){const n=this.boundingSphere.center;if(Xt.setFromBufferAttribute(e),t)for(let o=0,a=t.length;o<a;o++){const l=t[o];ts.setFromBufferAttribute(l),this.morphTargetsRelative?(At.addVectors(Xt.min,ts.min),Xt.expandByPoint(At),At.addVectors(Xt.max,ts.max),Xt.expandByPoint(At)):(Xt.expandByPoint(ts.min),Xt.expandByPoint(ts.max))}Xt.getCenter(n);let s=0;for(let o=0,a=e.count;o<a;o++)At.fromBufferAttribute(e,o),s=Math.max(s,n.distanceToSquared(At));if(t)for(let o=0,a=t.length;o<a;o++){const l=t[o],c=this.morphTargetsRelative;for(let d=0,u=l.count;d<u;d++)At.fromBufferAttribute(l,d),c&&(Ei.fromBufferAttribute(e,d),At.add(Ei)),s=Math.max(s,n.distanceToSquared(At))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,o=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Yt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),l=[],c=[];for(let D=0;D<n.count;D++)l[D]=new A,c[D]=new A;const d=new A,u=new A,f=new A,r=new ie,p=new ie,v=new ie,x=new A,g=new A;function m(D,w,S){d.fromBufferAttribute(n,D),u.fromBufferAttribute(n,w),f.fromBufferAttribute(n,S),r.fromBufferAttribute(o,D),p.fromBufferAttribute(o,w),v.fromBufferAttribute(o,S),u.sub(d),f.sub(d),p.sub(r),v.sub(r);const F=1/(p.x*v.y-v.x*p.y);isFinite(F)&&(x.copy(u).multiplyScalar(v.y).addScaledVector(f,-p.y).multiplyScalar(F),g.copy(f).multiplyScalar(p.x).addScaledVector(u,-v.x).multiplyScalar(F),l[D].add(x),l[w].add(x),l[S].add(x),c[D].add(g),c[w].add(g),c[S].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let D=0,w=M.length;D<w;++D){const S=M[D],F=S.start,G=S.count;for(let k=F,X=F+G;k<X;k+=3)m(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const b=new A,y=new A,I=new A,P=new A;function L(D){I.fromBufferAttribute(s,D),P.copy(I);const w=l[D];b.copy(w),b.sub(I.multiplyScalar(I.dot(w))).normalize(),y.crossVectors(P,w);const F=y.dot(c[D])<0?-1:1;a.setXYZW(D,b.x,b.y,b.z,F)}for(let D=0,w=M.length;D<w;++D){const S=M[D],F=S.start,G=S.count;for(let k=F,X=F+G;k<X;k+=3)L(e.getX(k+0)),L(e.getX(k+1)),L(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Yt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let r=0,p=n.count;r<p;r++)n.setXYZ(r,0,0,0);const s=new A,o=new A,a=new A,l=new A,c=new A,d=new A,u=new A,f=new A;if(e)for(let r=0,p=e.count;r<p;r+=3){const v=e.getX(r+0),x=e.getX(r+1),g=e.getX(r+2);s.fromBufferAttribute(t,v),o.fromBufferAttribute(t,x),a.fromBufferAttribute(t,g),u.subVectors(a,o),f.subVectors(s,o),u.cross(f),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,x),d.fromBufferAttribute(n,g),l.add(u),c.add(u),d.add(u),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(g,d.x,d.y,d.z)}else for(let r=0,p=t.count;r<p;r+=3)s.fromBufferAttribute(t,r+0),o.fromBufferAttribute(t,r+1),a.fromBufferAttribute(t,r+2),u.subVectors(a,o),f.subVectors(s,o),u.cross(f),n.setXYZ(r+0,u.x,u.y,u.z),n.setXYZ(r+1,u.x,u.y,u.z),n.setXYZ(r+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)At.fromBufferAttribute(e,t),At.normalize(),e.setXYZ(t,At.x,At.y,At.z)}toNonIndexed(){function e(l,c){const d=l.array,u=l.itemSize,f=l.normalized,r=new d.constructor(c.length*u);let p=0,v=0;for(let x=0,g=c.length;x<g;x++){l.isInterleavedBufferAttribute?p=c[x]*l.data.stride+l.offset:p=c[x]*u;for(let m=0;m<u;m++)r[v++]=d[p++]}return new Yt(r,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new _t,n=this.index.array,s=this.attributes;for(const l in s){const c=s[l],d=e(c,n);t.setAttribute(l,d)}const o=this.morphAttributes;for(const l in o){const c=[],d=o[l];for(let u=0,f=d.length;u<f;u++){const r=d[u],p=e(r,n);c.push(p)}t.morphAttributes[l]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let l=0,c=a.length;l<c;l++){const d=a[l];t.addGroup(d.start,d.count,d.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const d in c)c[d]!==void 0&&(e[d]=c[d]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const d=n[c];e.data.attributes[c]=d.toJSON(e.data)}const s={};let o=!1;for(const c in this.morphAttributes){const d=this.morphAttributes[c],u=[];for(let f=0,r=d.length;f<r;f++){const p=d[f];u.push(p.toJSON(e.data))}u.length>0&&(s[c]=u,o=!0)}o&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const l=this.boundingSphere;return l!==null&&(e.data.boundingSphere={center:l.center.toArray(),radius:l.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const d in s){const u=s[d];this.setAttribute(d,u.clone(t))}const o=e.morphAttributes;for(const d in o){const u=[],f=o[d];for(let r=0,p=f.length;r<p;r++)u.push(f[r].clone(t));this.morphAttributes[d]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let d=0,u=a.length;d<u;d++){const f=a[d];this.addGroup(f.start,f.count,f.materialIndex)}const l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Tl=new at,qn=new Pr,Ns=new mn,wl=new A,Os=new A,Bs=new A,Vs=new A,oo=new A,zs=new A,Pl=new A,ks=new A;class kt extends bt{constructor(e=new _t,t=new Cr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,a=s.length;o<a;o++){const l=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=o}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,o=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const l=this.morphTargetInfluences;if(o&&l){zs.set(0,0,0);for(let c=0,d=o.length;c<d;c++){const u=l[c],f=o[c];u!==0&&(oo.fromBufferAttribute(f,e),a?zs.addScaledVector(oo,u):zs.addScaledVector(oo.sub(t),u))}t.add(zs)}return t}raycast(e,t){const n=this.geometry,s=this.material,o=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ns.copy(n.boundingSphere),Ns.applyMatrix4(o),qn.copy(e.ray).recast(e.near),!(Ns.containsPoint(qn.origin)===!1&&(qn.intersectSphere(Ns,wl)===null||qn.origin.distanceToSquared(wl)>(e.far-e.near)**2))&&(Tl.copy(o).invert(),qn.copy(e.ray).applyMatrix4(Tl),!(n.boundingBox!==null&&qn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,qn)))}_computeIntersections(e,t,n){let s;const o=this.geometry,a=this.material,l=o.index,c=o.attributes.position,d=o.attributes.uv,u=o.attributes.uv1,f=o.attributes.normal,r=o.groups,p=o.drawRange;if(l!==null)if(Array.isArray(a))for(let v=0,x=r.length;v<x;v++){const g=r[v],m=a[g.materialIndex],M=Math.max(g.start,p.start),b=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let y=M,I=b;y<I;y+=3){const P=l.getX(y),L=l.getX(y+1),D=l.getX(y+2);s=Hs(this,m,e,n,d,u,f,P,L,D),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const v=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let g=v,m=x;g<m;g+=3){const M=l.getX(g),b=l.getX(g+1),y=l.getX(g+2);s=Hs(this,a,e,n,d,u,f,M,b,y),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let v=0,x=r.length;v<x;v++){const g=r[v],m=a[g.materialIndex],M=Math.max(g.start,p.start),b=Math.min(c.count,Math.min(g.start+g.count,p.start+p.count));for(let y=M,I=b;y<I;y+=3){const P=y,L=y+1,D=y+2;s=Hs(this,m,e,n,d,u,f,P,L,D),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const v=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let g=v,m=x;g<m;g+=3){const M=g,b=g+1,y=g+2;s=Hs(this,a,e,n,d,u,f,M,b,y),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}}function du(i,e,t,n,s,o,a,l){let c;if(e.side===Ht?c=n.intersectTriangle(a,o,s,!0,l):c=n.intersectTriangle(s,o,a,e.side===wn,l),c===null)return null;ks.copy(l),ks.applyMatrix4(i.matrixWorld);const d=t.ray.origin.distanceTo(ks);return d<t.near||d>t.far?null:{distance:d,point:ks.clone(),object:i}}function Hs(i,e,t,n,s,o,a,l,c,d){i.getVertexPosition(l,Os),i.getVertexPosition(c,Bs),i.getVertexPosition(d,Vs);const u=du(i,e,t,n,Os,Bs,Vs,Pl);if(u){const f=new A;Jt.getBarycoord(Pl,Os,Bs,Vs,f),s&&(u.uv=Jt.getInterpolatedAttribute(s,l,c,d,f,new ie)),o&&(u.uv1=Jt.getInterpolatedAttribute(o,l,c,d,f,new ie)),a&&(u.normal=Jt.getInterpolatedAttribute(a,l,c,d,f,new A),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const r={a:l,b:c,c:d,normal:new A,materialIndex:0};Jt.getNormal(Os,Bs,Vs,r.normal),u.face=r,u.barycoord=f}return u}class bs extends _t{constructor(e=1,t=1,n=1,s=1,o=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:o,depthSegments:a};const l=this;s=Math.floor(s),o=Math.floor(o),a=Math.floor(a);const c=[],d=[],u=[],f=[];let r=0,p=0;v("z","y","x",-1,-1,n,t,e,a,o,0),v("z","y","x",1,-1,n,t,-e,a,o,1),v("x","z","y",1,1,e,n,t,s,a,2),v("x","z","y",1,-1,e,n,-t,s,a,3),v("x","y","z",1,-1,e,t,n,s,o,4),v("x","y","z",-1,-1,e,t,-n,s,o,5),this.setIndex(c),this.setAttribute("position",new Ke(d,3)),this.setAttribute("normal",new Ke(u,3)),this.setAttribute("uv",new Ke(f,2));function v(x,g,m,M,b,y,I,P,L,D,w){const S=y/L,F=I/D,G=y/2,k=I/2,X=P/2,J=L+1,Y=D+1;let oe=0,$=0;const fe=new A;for(let ve=0;ve<Y;ve++){const le=ve*F-k;for(let Ie=0;Ie<J;Ie++){const Oe=Ie*S-G;fe[x]=Oe*M,fe[g]=le*b,fe[m]=X,d.push(fe.x,fe.y,fe.z),fe[x]=0,fe[g]=0,fe[m]=P>0?1:-1,u.push(fe.x,fe.y,fe.z),f.push(Ie/L),f.push(1-ve/D),oe+=1}}for(let ve=0;ve<D;ve++)for(let le=0;le<L;le++){const Ie=r+le+J*ve,Oe=r+le+J*(ve+1),q=r+(le+1)+J*(ve+1),de=r+(le+1)+J*ve;c.push(Ie,Oe,de),c.push(Oe,q,de),$+=6}l.addGroup(p,$,w),p+=$,r+=oe}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ki(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Ot(i){const e={};for(let t=0;t<i.length;t++){const n=Ki(i[t]);for(const s in n)e[s]=n[s]}return e}function hu(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Zc(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}const uu={clone:Ki,merge:Ot};var fu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,pu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class zn extends kn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=fu,this.fragmentShader=pu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ki(e.uniforms),this.uniformsGroups=hu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class jc extends bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new at,this.projectionMatrix=new at,this.projectionMatrixInverse=new at,this.coordinateSystem=An}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Fn=new A,Cl=new ie,Rl=new ie;class jt extends jc{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=_s*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Vi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return _s*2*Math.atan(Math.tan(Vi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Fn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Fn.x,Fn.y).multiplyScalar(-e/Fn.z),Fn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Fn.x,Fn.y).multiplyScalar(-e/Fn.z)}getViewSize(e,t){return this.getViewBounds(e,Cl,Rl),t.subVectors(Rl,Cl)}setViewOffset(e,t,n,s,o,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Vi*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,o=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,d=a.fullHeight;o+=a.offsetX*s/c,t-=a.offsetY*n/d,s*=a.width/c,n*=a.height/d}const l=this.filmOffset;l!==0&&(o+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ai=-90,Ti=1;class mu extends bt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new jt(Ai,Ti,e,t);s.layers=this.layers,this.add(s);const o=new jt(Ai,Ti,e,t);o.layers=this.layers,this.add(o);const a=new jt(Ai,Ti,e,t);a.layers=this.layers,this.add(a);const l=new jt(Ai,Ti,e,t);l.layers=this.layers,this.add(l);const c=new jt(Ai,Ti,e,t);c.layers=this.layers,this.add(c);const d=new jt(Ai,Ti,e,t);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,o,a,l,c]=t;for(const d of t)this.remove(d);if(e===An)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Mr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const d of t)this.add(d),d.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[o,a,l,c,d,u]=this.children,f=e.getRenderTarget(),r=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,o),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,l),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,d),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(f,r,p),e.xr.enabled=v,n.texture.needsPMREMUpdate=!0}}class Jc extends Ct{constructor(e,t,n,s,o,a,l,c,d,u){e=e!==void 0?e:[],t=t!==void 0?t:Wi,super(e,t,n,s,o,a,l,c,d,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class gu extends ai{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Jc(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Pt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new bs(5,5,5),o=new zn({name:"CubemapFromEquirect",uniforms:Ki(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ht,blending:On});o.uniforms.tEquirect.value=t;const a=new kt(s,o),l=t.minFilter;return t.minFilter===Nn&&(t.minFilter=Pt),new mu(1,10,this).update(e,a),t.minFilter=l,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){const o=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(o)}}class as extends bt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const _u={type:"move"};class ao{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new as,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new as,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new as,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,o=null,a=null;const l=this._targetRay,c=this._grip,d=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(d&&e.hand){a=!0;for(const x of e.hand.values()){const g=t.getJointPose(x,n),m=this._getHandJoint(d,x);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const u=d.joints["index-finger-tip"],f=d.joints["thumb-tip"],r=u.position.distanceTo(f.position),p=.02,v=.005;d.inputState.pinching&&r>p+v?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!d.inputState.pinching&&r<=p-v&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(o=t.getPose(e.gripSpace,n),o!==null&&(c.matrix.fromArray(o.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,o.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(o.linearVelocity)):c.hasLinearVelocity=!1,o.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(o.angularVelocity)):c.hasAngularVelocity=!1));l!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&o!==null&&(s=o),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(_u)))}return l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),d!==null&&(d.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new as;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class vu extends bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ln,this.environmentIntensity=1,this.environmentRotation=new ln,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class ri extends Ct{constructor(e=null,t=1,n=1,s,o,a,l,c,d=qt,u=qt,f,r){super(null,a,l,c,d,u,s,o,f,r),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ll extends Yt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const wi=new at,Il=new at,Gs=[],Dl=new en,xu=new at,ns=new kt,is=new mn;class H0 extends kt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ll(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,xu)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new en),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,wi),Dl.copy(e.boundingBox).applyMatrix4(wi),this.boundingBox.union(Dl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new mn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,wi),is.copy(e.boundingSphere).applyMatrix4(wi),this.boundingSphere.union(is)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,o=n.length+1,a=e*o+1;for(let l=0;l<n.length;l++)n[l]=s[a+l]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(ns.geometry=this.geometry,ns.material=this.material,ns.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),is.copy(this.boundingSphere),is.applyMatrix4(n),e.ray.intersectsSphere(is)!==!1))for(let o=0;o<s;o++){this.getMatrixAt(o,wi),Il.multiplyMatrices(n,wi),ns.matrixWorld=Il,ns.raycast(e,Gs);for(let a=0,l=Gs.length;a<l;a++){const c=Gs[a];c.instanceId=o,c.object=this,t.push(c)}Gs.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ll(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new ri(new Float32Array(s*this.count),s,this.count,Fa,Qt));const o=this.morphTexture.source.data.data;let a=0;for(let d=0;d<n.length;d++)a+=n[d];const l=this.geometry.morphTargetsRelative?1:1-a,c=s*e;o[c]=l,o.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const lo=new A,yu=new A,Mu=new Xe;class En{constructor(e=new A(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=lo.subVectors(n,t).cross(yu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(lo),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/s;return o<0||o>1?null:t.copy(e.start).addScaledVector(n,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Mu.getNormalMatrix(e),s=this.coplanarPoint(lo).applyMatrix4(e),o=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(o),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Yn=new mn,Ws=new A;class Rr{constructor(e=new En,t=new En,n=new En,s=new En,o=new En,a=new En){this.planes=[e,t,n,s,o,a]}set(e,t,n,s,o,a){const l=this.planes;return l[0].copy(e),l[1].copy(t),l[2].copy(n),l[3].copy(s),l[4].copy(o),l[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=An){const n=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],d=s[4],u=s[5],f=s[6],r=s[7],p=s[8],v=s[9],x=s[10],g=s[11],m=s[12],M=s[13],b=s[14],y=s[15];if(n[0].setComponents(c-o,r-d,g-p,y-m).normalize(),n[1].setComponents(c+o,r+d,g+p,y+m).normalize(),n[2].setComponents(c+a,r+u,g+v,y+M).normalize(),n[3].setComponents(c-a,r-u,g-v,y-M).normalize(),n[4].setComponents(c-l,r-f,g-x,y-b).normalize(),t===An)n[5].setComponents(c+l,r+f,g+x,y+b).normalize();else if(t===Mr)n[5].setComponents(l,f,x,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Yn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Yn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Yn)}intersectsSprite(e){return Yn.center.set(0,0,0),Yn.radius=.7071067811865476,Yn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Yn)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let o=0;o<6;o++)if(t[o].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Ws.x=s.normal.x>0?e.max.x:e.min.x,Ws.y=s.normal.y>0?e.max.y:e.min.y,Ws.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ws)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function co(i,e){return i-e}function bu(i,e){return i.z-e.z}function Su(i,e){return e.z-i.z}class Eu{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,s){const o=this.pool,a=this.list;this.index>=o.length&&o.push({start:-1,count:-1,z:-1,index:-1});const l=o[this.index];a.push(l),this.index++,l.start=e,l.count=t,l.z=n,l.index=s}reset(){this.list.length=0,this.index=0}}const Vt=new at,Au=new qe(1,1,1),ho=new Rr,Xs=new en,$n=new mn,ss=new A,Fl=new A,Tu=new A,uo=new Eu,Dt=new kt,qs=[];function wu(i,e,t=0){const n=e.itemSize;if(i.isInterleavedBufferAttribute||i.array.constructor!==e.array.constructor){const s=i.count;for(let o=0;o<s;o++)for(let a=0;a<n;a++)e.setComponent(o+t,a,i.getComponent(o,a))}else e.array.set(i.array,t*n);e.needsUpdate=!0}function Kn(i,e){if(i.constructor!==e.constructor){const t=Math.min(i.length,e.length);for(let n=0;n<t;n++)e[n]=i[n]}else{const t=Math.min(i.length,e.length);e.set(new i.constructor(i.buffer,0,t))}}class G0 extends kt{constructor(e,t,n=t*2,s){super(new _t,s),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._multiDrawInstances=null,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4),n=new ri(t,e,e,Ft,Qt);this._matricesTexture=n}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Uint32Array(e*e),n=new ri(t,e,e,wr,Vn);this._indirectTexture=n}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Float32Array(e*e*4).fill(1),n=new ri(t,e,e,Ft,Qt);n.colorSpace=tt.workingColorSpace,this._colorsTexture=n}_initializeGeometry(e){const t=this.geometry,n=this._maxVertexCount,s=this._maxIndexCount;if(this._geometryInitialized===!1){for(const o in e.attributes){const a=e.getAttribute(o),{array:l,itemSize:c,normalized:d}=a,u=new l.constructor(n*c),f=new Yt(u,c,d);t.setAttribute(o,f)}if(e.getIndex()!==null){const o=n>65535?new Uint32Array(s):new Uint16Array(s);t.setIndex(new Yt(o,1))}this._geometryInitialized=!0}}_validateGeometry(e){const t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(const n in t.attributes){if(!e.hasAttribute(n))throw new Error(`THREE.BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);const s=e.getAttribute(n),o=t.getAttribute(n);if(s.itemSize!==o.itemSize||s.normalized!==o.normalized)throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(e){const t=this._instanceInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${e}. Instance is either out of range or has been deleted.`)}validateGeometryId(e){const t=this._geometryInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${e}. Geometry is either out of range or has been deleted.`)}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new en);const e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let n=0,s=t.length;n<s;n++){if(t[n].active===!1)continue;const o=t[n].geometryIndex;this.getMatrixAt(n,Vt),this.getBoundingBoxAt(o,Xs).applyMatrix4(Vt),e.union(Xs)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mn);const e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let n=0,s=t.length;n<s;n++){if(t[n].active===!1)continue;const o=t[n].geometryIndex;this.getMatrixAt(n,Vt),this.getBoundingSphereAt(o,$n).applyMatrix4(Vt),e.union($n)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("THREE.BatchedMesh: Maximum item count reached.");const n={visible:!0,active:!0,geometryIndex:e};let s=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(co),s=this._availableInstanceIds.shift(),this._instanceInfo[s]=n):(s=this._instanceInfo.length,this._instanceInfo.push(n));const o=this._matricesTexture;Vt.identity().toArray(o.image.data,s*16),o.needsUpdate=!0;const a=this._colorsTexture;return a&&(Au.toArray(a.image.data,s*4),a.needsUpdate=!0),this._visibilityChanged=!0,s}addGeometry(e,t=-1,n=-1){this._initializeGeometry(e),this._validateGeometry(e);const s={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},o=this._geometryInfo;s.vertexStart=this._nextVertexStart,s.reservedVertexCount=t===-1?e.getAttribute("position").count:t;const a=e.getIndex();if(a!==null&&(s.indexStart=this._nextIndexStart,s.reservedIndexCount=n===-1?a.count:n),s.indexStart!==-1&&s.indexStart+s.reservedIndexCount>this._maxIndexCount||s.vertexStart+s.reservedVertexCount>this._maxVertexCount)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let c;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(co),c=this._availableGeometryIds.shift(),o[c]=s):(c=this._geometryCount,this._geometryCount++,o.push(s)),this.setGeometryAt(c,e),this._nextIndexStart=s.indexStart+s.reservedIndexCount,this._nextVertexStart=s.vertexStart+s.reservedVertexCount,c}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);const n=this.geometry,s=n.getIndex()!==null,o=n.getIndex(),a=t.getIndex(),l=this._geometryInfo[e];if(s&&a.count>l.reservedIndexCount||t.attributes.position.count>l.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");const c=l.vertexStart,d=l.reservedVertexCount;l.vertexCount=t.getAttribute("position").count;for(const u in n.attributes){const f=t.getAttribute(u),r=n.getAttribute(u);wu(f,r,c);const p=f.itemSize;for(let v=f.count,x=d;v<x;v++){const g=c+v;for(let m=0;m<p;m++)r.setComponent(g,m,0)}r.needsUpdate=!0,r.addUpdateRange(c*p,d*p)}if(s){const u=l.indexStart,f=l.reservedIndexCount;l.indexCount=t.getIndex().count;for(let r=0;r<a.count;r++)o.setX(u+r,c+a.getX(r));for(let r=a.count,p=f;r<p;r++)o.setX(u+r,c);o.needsUpdate=!0,o.addUpdateRange(u,l.reservedIndexCount)}return l.start=s?l.indexStart:l.vertexStart,l.count=s?l.indexCount:l.vertexCount,l.boundingBox=null,t.boundingBox!==null&&(l.boundingBox=t.boundingBox.clone()),l.boundingSphere=null,t.boundingSphere!==null&&(l.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){const t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;const n=this._instanceInfo;for(let s=0,o=n.length;s<o;s++)n[s].active&&n[s].geometryIndex===e&&this.deleteInstance(s);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){return this.validateInstanceId(e),this._instanceInfo[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this}optimize(){let e=0,t=0;const n=this._geometryInfo,s=n.map((a,l)=>l).sort((a,l)=>n[a].vertexStart-n[l].vertexStart),o=this.geometry;for(let a=0,l=n.length;a<l;a++){const c=s[a],d=n[c];if(d.active!==!1){if(o.index!==null){if(d.indexStart!==t){const{indexStart:u,vertexStart:f,reservedIndexCount:r}=d,p=o.index,v=p.array,x=e-f;for(let g=u;g<u+r;g++)v[g]=v[g]+x;p.array.copyWithin(t,u,u+r),p.addUpdateRange(t,r),d.indexStart=t}t+=d.reservedIndexCount}if(d.vertexStart!==e){const{vertexStart:u,reservedVertexCount:f}=d,r=o.attributes;for(const p in r){const v=r[p],{array:x,itemSize:g}=v;x.copyWithin(e*g,u*g,(u+f)*g),v.addUpdateRange(e*g,f*g)}d.vertexStart=e}e+=d.reservedVertexCount,d.start=o.index?d.indexStart:d.vertexStart,this._nextIndexStart=o.index?d.indexStart+d.reservedIndexCount:0,this._nextVertexStart=d.vertexStart+d.reservedVertexCount}}return this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,s=this._geometryInfo[e];if(s.boundingBox===null){const o=new en,a=n.index,l=n.attributes.position;for(let c=s.start,d=s.start+s.count;c<d;c++){let u=c;a&&(u=a.getX(u)),o.expandByPoint(ss.fromBufferAttribute(l,u))}s.boundingBox=o}return t.copy(s.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,s=this._geometryInfo[e];if(s.boundingSphere===null){const o=new mn;this.getBoundingBoxAt(e,Xs),Xs.getCenter(o.center);const a=n.index,l=n.attributes.position;let c=0;for(let d=s.start,u=s.start+s.count;d<u;d++){let f=d;a&&(f=a.getX(f)),ss.fromBufferAttribute(l,f),c=Math.max(c,o.center.distanceToSquared(ss))}o.radius=Math.sqrt(c),s.boundingSphere=o}return t.copy(s.boundingSphere),t}setMatrixAt(e,t){this.validateInstanceId(e);const n=this._matricesTexture,s=this._matricesTexture.image.data;return t.toArray(s,e*16),n.needsUpdate=!0,this}getMatrixAt(e,t){return this.validateInstanceId(e),t.fromArray(this._matricesTexture.image.data,e*16)}setColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null&&this._initColorsTexture(),t.toArray(this._colorsTexture.image.data,e*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(e,t){return this.validateInstanceId(e),t.fromArray(this._colorsTexture.image.data,e*4)}setVisibleAt(e,t){return this.validateInstanceId(e),this._instanceInfo[e].visible===t?this:(this._instanceInfo[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){return this.validateInstanceId(e),this._instanceInfo[e].visible}setGeometryIdAt(e,t){return this.validateInstanceId(e),this.validateGeometryId(t),this._instanceInfo[e].geometryIndex=t,this}getGeometryIdAt(e){return this.validateInstanceId(e),this._instanceInfo[e].geometryIndex}getGeometryRangeAt(e,t={}){this.validateGeometryId(e);const n=this._geometryInfo[e];return t.vertexStart=n.vertexStart,t.vertexCount=n.vertexCount,t.reservedVertexCount=n.reservedVertexCount,t.indexStart=n.indexStart,t.indexCount=n.indexCount,t.reservedIndexCount=n.reservedIndexCount,t.start=n.start,t.count=n.count,t}setInstanceCount(e){const t=this._availableInstanceIds,n=this._instanceInfo;for(t.sort(co);t[t.length-1]===n.length;)n.pop(),t.pop();if(e<n.length)throw new Error(`BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);const s=new Int32Array(e),o=new Int32Array(e);Kn(this._multiDrawCounts,s),Kn(this._multiDrawStarts,o),this._multiDrawCounts=s,this._multiDrawStarts=o,this._maxInstanceCount=e;const a=this._indirectTexture,l=this._matricesTexture,c=this._colorsTexture;a.dispose(),this._initIndirectTexture(),Kn(a.image.data,this._indirectTexture.image.data),l.dispose(),this._initMatricesTexture(),Kn(l.image.data,this._matricesTexture.image.data),c&&(c.dispose(),this._initColorsTexture(),Kn(c.image.data,this._colorsTexture.image.data))}setGeometrySize(e,t){const n=[...this._geometryInfo].filter(l=>l.active);if(Math.max(...n.map(l=>l.vertexStart+l.reservedVertexCount))>e)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${t}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(c=>c.indexStart+c.reservedIndexCount))>t)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);const o=this.geometry;o.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new _t,this._initializeGeometry(o));const a=this.geometry;o.index&&Kn(o.index.array,a.index.array);for(const l in o.attributes)Kn(o.attributes[l].array,a.attributes[l].array)}raycast(e,t){const n=this._instanceInfo,s=this._geometryInfo,o=this.matrixWorld,a=this.geometry;Dt.material=this.material,Dt.geometry.index=a.index,Dt.geometry.attributes=a.attributes,Dt.geometry.boundingBox===null&&(Dt.geometry.boundingBox=new en),Dt.geometry.boundingSphere===null&&(Dt.geometry.boundingSphere=new mn);for(let l=0,c=n.length;l<c;l++){if(!n[l].visible||!n[l].active)continue;const d=n[l].geometryIndex,u=s[d];Dt.geometry.setDrawRange(u.start,u.count),this.getMatrixAt(l,Dt.matrixWorld).premultiply(o),this.getBoundingBoxAt(d,Dt.geometry.boundingBox),this.getBoundingSphereAt(d,Dt.geometry.boundingSphere),Dt.raycast(e,qs);for(let f=0,r=qs.length;f<r;f++){const p=qs[f];p.object=this,p.batchId=l,t.push(p)}qs.length=0}Dt.material=null,Dt.geometry.index=null,Dt.geometry.attributes={},Dt.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._geometryCount=e._geometryCount,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null)}onBeforeRender(e,t,n,s,o){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const a=s.getIndex(),l=a===null?1:a.array.BYTES_PER_ELEMENT,c=this._instanceInfo,d=this._multiDrawStarts,u=this._multiDrawCounts,f=this._geometryInfo,r=this.perObjectFrustumCulled,p=this._indirectTexture,v=p.image.data;r&&(Vt.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),ho.setFromProjectionMatrix(Vt,e.coordinateSystem));let x=0;if(this.sortObjects){Vt.copy(this.matrixWorld).invert(),ss.setFromMatrixPosition(n.matrixWorld).applyMatrix4(Vt),Fl.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(Vt);for(let M=0,b=c.length;M<b;M++)if(c[M].visible&&c[M].active){const y=c[M].geometryIndex;this.getMatrixAt(M,Vt),this.getBoundingSphereAt(y,$n).applyMatrix4(Vt);let I=!1;if(r&&(I=!ho.intersectsSphere($n)),!I){const P=f[y],L=Tu.subVectors($n.center,ss).dot(Fl);uo.push(P.start,P.count,L,M)}}const g=uo.list,m=this.customSort;m===null?g.sort(o.transparent?Su:bu):m.call(this,g,n);for(let M=0,b=g.length;M<b;M++){const y=g[M];d[x]=y.start*l,u[x]=y.count,v[x]=y.index,x++}uo.reset()}else for(let g=0,m=c.length;g<m;g++)if(c[g].visible&&c[g].active){const M=c[g].geometryIndex;let b=!1;if(r&&(this.getMatrixAt(g,Vt),this.getBoundingSphereAt(M,$n).applyMatrix4(Vt),b=!ho.intersectsSphere($n)),!b){const y=f[M];d[x]=y.start*l,u[x]=y.count,v[x]=g,x++}}p.needsUpdate=!0,this._multiDrawCount=x,this._visibilityChanged=!1}onBeforeShadow(e,t,n,s,o,a){this.onBeforeRender(e,null,s,o,a)}}class Lr extends kn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Sr=new A,Er=new A,Ul=new at,rs=new Pr,Ys=new mn,fo=new A,Nl=new A;class Qc extends bt{constructor(e=new _t,t=new Lr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,o=t.count;s<o;s++)Sr.fromBufferAttribute(t,s-1),Er.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Sr.distanceTo(Er);e.setAttribute("lineDistance",new Ke(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,o=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ys.copy(n.boundingSphere),Ys.applyMatrix4(s),Ys.radius+=o,e.ray.intersectsSphere(Ys)===!1)return;Ul.copy(s).invert(),rs.copy(e.ray).applyMatrix4(Ul);const l=o/((this.scale.x+this.scale.y+this.scale.z)/3),c=l*l,d=this.isLineSegments?2:1,u=n.index,r=n.attributes.position;if(u!==null){const p=Math.max(0,a.start),v=Math.min(u.count,a.start+a.count);for(let x=p,g=v-1;x<g;x+=d){const m=u.getX(x),M=u.getX(x+1),b=$s(this,e,rs,c,m,M,x);b&&t.push(b)}if(this.isLineLoop){const x=u.getX(v-1),g=u.getX(p),m=$s(this,e,rs,c,x,g,v-1);m&&t.push(m)}}else{const p=Math.max(0,a.start),v=Math.min(r.count,a.start+a.count);for(let x=p,g=v-1;x<g;x+=d){const m=$s(this,e,rs,c,x,x+1,x);m&&t.push(m)}if(this.isLineLoop){const x=$s(this,e,rs,c,v-1,p,v-1);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,a=s.length;o<a;o++){const l=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=o}}}}}function $s(i,e,t,n,s,o,a){const l=i.geometry.attributes.position;if(Sr.fromBufferAttribute(l,s),Er.fromBufferAttribute(l,o),t.distanceSqToSegment(Sr,Er,fo,Nl)>n)return;fo.applyMatrix4(i.matrixWorld);const d=e.ray.origin.distanceTo(fo);if(!(d<e.near||d>e.far))return{distance:d,point:Nl.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Ol=new A,Bl=new A;class W0 extends Qc{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,o=t.count;s<o;s+=2)Ol.fromBufferAttribute(t,s),Bl.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Ol.distanceTo(Bl);e.setAttribute("lineDistance",new Ke(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Pu extends kn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new qe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}class Cu extends Ct{constructor(e,t,n,s,o,a,l,c,d){super(e,t,n,s,o,a,l,c,d),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ed extends Ct{constructor(e,t,n,s,o,a,l,c,d,u=Bi){if(u!==Bi&&u!==Yi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Bi&&(n=Vn),n===void 0&&u===Yi&&(n=qi),super(null,s,o,a,l,c,u,n,d),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=l!==void 0?l:qt,this.minFilter=c!==void 0?c:qt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Va(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class gn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),o=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),o+=n.distanceTo(s),t.push(o),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const o=n.length;let a;t?a=t:a=e*n[o-1];let l=0,c=o-1,d;for(;l<=c;)if(s=Math.floor(l+(c-l)/2),d=n[s]-a,d<0)l=s+1;else if(d>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(o-1);const u=n[s],r=n[s+1]-u,p=(a-u)/r;return(s+p)/(o-1)}getTangent(e,t){let s=e-1e-4,o=e+1e-4;s<0&&(s=0),o>1&&(o=1);const a=this.getPoint(s),l=this.getPoint(o),c=t||(a.isVector2?new ie:new A);return c.copy(l).sub(a).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new A,s=[],o=[],a=[],l=new A,c=new at;for(let p=0;p<=e;p++){const v=p/e;s[p]=this.getTangentAt(v,new A)}o[0]=new A,a[0]=new A;let d=Number.MAX_VALUE;const u=Math.abs(s[0].x),f=Math.abs(s[0].y),r=Math.abs(s[0].z);u<=d&&(d=u,n.set(1,0,0)),f<=d&&(d=f,n.set(0,1,0)),r<=d&&n.set(0,0,1),l.crossVectors(s[0],n).normalize(),o[0].crossVectors(s[0],l),a[0].crossVectors(s[0],o[0]);for(let p=1;p<=e;p++){if(o[p]=o[p-1].clone(),a[p]=a[p-1].clone(),l.crossVectors(s[p-1],s[p]),l.length()>Number.EPSILON){l.normalize();const v=Math.acos(Ge(s[p-1].dot(s[p]),-1,1));o[p].applyMatrix4(c.makeRotationAxis(l,v))}a[p].crossVectors(s[p],o[p])}if(t===!0){let p=Math.acos(Ge(o[0].dot(o[e]),-1,1));p/=e,s[0].dot(l.crossVectors(o[0],o[e]))>0&&(p=-p);for(let v=1;v<=e;v++)o[v].applyMatrix4(c.makeRotationAxis(s[v],p*v)),a[v].crossVectors(s[v],o[v])}return{tangents:s,normals:o,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class ka extends gn{constructor(e=0,t=0,n=1,s=1,o=0,a=Math.PI*2,l=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=o,this.aEndAngle=a,this.aClockwise=l,this.aRotation=c}getPoint(e,t=new ie){const n=t,s=Math.PI*2;let o=this.aEndAngle-this.aStartAngle;const a=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=s;for(;o>s;)o-=s;o<Number.EPSILON&&(a?o=0:o=s),this.aClockwise===!0&&!a&&(o===s?o=-s:o=o-s);const l=this.aStartAngle+e*o;let c=this.aX+this.xRadius*Math.cos(l),d=this.aY+this.yRadius*Math.sin(l);if(this.aRotation!==0){const u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),r=c-this.aX,p=d-this.aY;c=r*u-p*f+this.aX,d=r*f+p*u+this.aY}return n.set(c,d)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Ru extends ka{constructor(e,t,n,s,o,a){super(e,t,n,n,s,o,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Ha(){let i=0,e=0,t=0,n=0;function s(o,a,l,c){i=o,e=l,t=-3*o+3*a-2*l-c,n=2*o-2*a+l+c}return{initCatmullRom:function(o,a,l,c,d){s(a,l,d*(l-o),d*(c-a))},initNonuniformCatmullRom:function(o,a,l,c,d,u,f){let r=(a-o)/d-(l-o)/(d+u)+(l-a)/u,p=(l-a)/u-(c-a)/(u+f)+(c-l)/f;r*=u,p*=u,s(a,l,r,p)},calc:function(o){const a=o*o,l=a*o;return i+e*o+t*a+n*l}}}const Ks=new A,po=new Ha,mo=new Ha,go=new Ha;class Lu extends gn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new A){const n=t,s=this.points,o=s.length,a=(o-(this.closed?0:1))*e;let l=Math.floor(a),c=a-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/o)+1)*o:c===0&&l===o-1&&(l=o-2,c=1);let d,u;this.closed||l>0?d=s[(l-1)%o]:(Ks.subVectors(s[0],s[1]).add(s[0]),d=Ks);const f=s[l%o],r=s[(l+1)%o];if(this.closed||l+2<o?u=s[(l+2)%o]:(Ks.subVectors(s[o-1],s[o-2]).add(s[o-1]),u=Ks),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let v=Math.pow(d.distanceToSquared(f),p),x=Math.pow(f.distanceToSquared(r),p),g=Math.pow(r.distanceToSquared(u),p);x<1e-4&&(x=1),v<1e-4&&(v=x),g<1e-4&&(g=x),po.initNonuniformCatmullRom(d.x,f.x,r.x,u.x,v,x,g),mo.initNonuniformCatmullRom(d.y,f.y,r.y,u.y,v,x,g),go.initNonuniformCatmullRom(d.z,f.z,r.z,u.z,v,x,g)}else this.curveType==="catmullrom"&&(po.initCatmullRom(d.x,f.x,r.x,u.x,this.tension),mo.initCatmullRom(d.y,f.y,r.y,u.y,this.tension),go.initCatmullRom(d.z,f.z,r.z,u.z,this.tension));return n.set(po.calc(c),mo.calc(c),go.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new A().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Vl(i,e,t,n,s){const o=(n-e)*.5,a=(s-t)*.5,l=i*i,c=i*l;return(2*t-2*n+o+a)*c+(-3*t+3*n-2*o-a)*l+o*i+t}function Iu(i,e){const t=1-i;return t*t*e}function Du(i,e){return 2*(1-i)*i*e}function Fu(i,e){return i*i*e}function us(i,e,t,n){return Iu(i,e)+Du(i,t)+Fu(i,n)}function Uu(i,e){const t=1-i;return t*t*t*e}function Nu(i,e){const t=1-i;return 3*t*t*i*e}function Ou(i,e){return 3*(1-i)*i*i*e}function Bu(i,e){return i*i*i*e}function fs(i,e,t,n,s){return Uu(i,e)+Nu(i,t)+Ou(i,n)+Bu(i,s)}class td extends gn{constructor(e=new ie,t=new ie,n=new ie,s=new ie){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ie){const n=t,s=this.v0,o=this.v1,a=this.v2,l=this.v3;return n.set(fs(e,s.x,o.x,a.x,l.x),fs(e,s.y,o.y,a.y,l.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Vu extends gn{constructor(e=new A,t=new A,n=new A,s=new A){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new A){const n=t,s=this.v0,o=this.v1,a=this.v2,l=this.v3;return n.set(fs(e,s.x,o.x,a.x,l.x),fs(e,s.y,o.y,a.y,l.y),fs(e,s.z,o.z,a.z,l.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class nd extends gn{constructor(e=new ie,t=new ie){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ie){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ie){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class zu extends gn{constructor(e=new A,t=new A){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new A){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new A){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class id extends gn{constructor(e=new ie,t=new ie,n=new ie){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ie){const n=t,s=this.v0,o=this.v1,a=this.v2;return n.set(us(e,s.x,o.x,a.x),us(e,s.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class sd extends gn{constructor(e=new A,t=new A,n=new A){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new A){const n=t,s=this.v0,o=this.v1,a=this.v2;return n.set(us(e,s.x,o.x,a.x),us(e,s.y,o.y,a.y),us(e,s.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class rd extends gn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ie){const n=t,s=this.points,o=(s.length-1)*e,a=Math.floor(o),l=o-a,c=s[a===0?a:a-1],d=s[a],u=s[a>s.length-2?s.length-1:a+1],f=s[a>s.length-3?s.length-1:a+2];return n.set(Vl(l,c.x,d.x,u.x,f.x),Vl(l,c.y,d.y,u.y,f.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new ie().fromArray(s))}return this}}var Ar=Object.freeze({__proto__:null,ArcCurve:Ru,CatmullRomCurve3:Lu,CubicBezierCurve:td,CubicBezierCurve3:Vu,EllipseCurve:ka,LineCurve:nd,LineCurve3:zu,QuadraticBezierCurve:id,QuadraticBezierCurve3:sd,SplineCurve:rd});class ku extends gn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ar[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let o=0;for(;o<s.length;){if(s[o]>=n){const a=s[o]-n,l=this.curves[o],c=l.getLength(),d=c===0?0:1-a/c;return l.getPointAt(d,t)}o++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,o=this.curves;s<o.length;s++){const a=o[s],l=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(l);for(let d=0;d<c.length;d++){const u=c[d];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Ar[s.type]().fromJSON(s))}return this}}class zl extends ku{constructor(e){super(),this.type="Path",this.currentPoint=new ie,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new nd(this.currentPoint.clone(),new ie(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const o=new id(this.currentPoint.clone(),new ie(e,t),new ie(n,s));return this.curves.push(o),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,o,a){const l=new td(this.currentPoint.clone(),new ie(e,t),new ie(n,s),new ie(o,a));return this.curves.push(l),this.currentPoint.set(o,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new rd(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,o,a){const l=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+l,t+c,n,s,o,a),this}absarc(e,t,n,s,o,a){return this.absellipse(e,t,n,n,s,o,a),this}ellipse(e,t,n,s,o,a,l,c){const d=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+d,t+u,n,s,o,a,l,c),this}absellipse(e,t,n,s,o,a,l,c){const d=new ka(e,t,n,s,o,a,l,c);if(this.curves.length>0){const f=d.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(d);const u=d.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class od extends _t{constructor(e=[new ie(0,-.5),new ie(.5,0),new ie(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=Ge(s,0,Math.PI*2);const o=[],a=[],l=[],c=[],d=[],u=1/t,f=new A,r=new ie,p=new A,v=new A,x=new A;let g=0,m=0;for(let M=0;M<=e.length-1;M++)switch(M){case 0:g=e[M+1].x-e[M].x,m=e[M+1].y-e[M].y,p.x=m*1,p.y=-g,p.z=m*0,x.copy(p),p.normalize(),c.push(p.x,p.y,p.z);break;case e.length-1:c.push(x.x,x.y,x.z);break;default:g=e[M+1].x-e[M].x,m=e[M+1].y-e[M].y,p.x=m*1,p.y=-g,p.z=m*0,v.copy(p),p.x+=x.x,p.y+=x.y,p.z+=x.z,p.normalize(),c.push(p.x,p.y,p.z),x.copy(v)}for(let M=0;M<=t;M++){const b=n+M*u*s,y=Math.sin(b),I=Math.cos(b);for(let P=0;P<=e.length-1;P++){f.x=e[P].x*y,f.y=e[P].y,f.z=e[P].x*I,a.push(f.x,f.y,f.z),r.x=M/t,r.y=P/(e.length-1),l.push(r.x,r.y);const L=c[3*P+0]*y,D=c[3*P+1],w=c[3*P+0]*I;d.push(L,D,w)}}for(let M=0;M<t;M++)for(let b=0;b<e.length-1;b++){const y=b+M*e.length,I=y,P=y+e.length,L=y+e.length+1,D=y+1;o.push(I,P,D),o.push(L,D,P)}this.setIndex(o),this.setAttribute("position",new Ke(a,3)),this.setAttribute("uv",new Ke(l,2)),this.setAttribute("normal",new Ke(d,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new od(e.points,e.segments,e.phiStart,e.phiLength)}}class ad extends _t{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const o=[],a=[],l=[],c=[],d=new A,u=new ie;a.push(0,0,0),l.push(0,0,1),c.push(.5,.5);for(let f=0,r=3;f<=t;f++,r+=3){const p=n+f/t*s;d.x=e*Math.cos(p),d.y=e*Math.sin(p),a.push(d.x,d.y,d.z),l.push(0,0,1),u.x=(a[r]/e+1)/2,u.y=(a[r+1]/e+1)/2,c.push(u.x,u.y)}for(let f=1;f<=t;f++)o.push(f,f+1,0);this.setIndex(o),this.setAttribute("position",new Ke(a,3)),this.setAttribute("normal",new Ke(l,3)),this.setAttribute("uv",new Ke(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ad(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ir extends _t{constructor(e=1,t=1,n=1,s=32,o=1,a=!1,l=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:o,openEnded:a,thetaStart:l,thetaLength:c};const d=this;s=Math.floor(s),o=Math.floor(o);const u=[],f=[],r=[],p=[];let v=0;const x=[],g=n/2;let m=0;M(),a===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(u),this.setAttribute("position",new Ke(f,3)),this.setAttribute("normal",new Ke(r,3)),this.setAttribute("uv",new Ke(p,2));function M(){const y=new A,I=new A;let P=0;const L=(t-e)/n;for(let D=0;D<=o;D++){const w=[],S=D/o,F=S*(t-e)+e;for(let G=0;G<=s;G++){const k=G/s,X=k*c+l,J=Math.sin(X),Y=Math.cos(X);I.x=F*J,I.y=-S*n+g,I.z=F*Y,f.push(I.x,I.y,I.z),y.set(J,L,Y).normalize(),r.push(y.x,y.y,y.z),p.push(k,1-S),w.push(v++)}x.push(w)}for(let D=0;D<s;D++)for(let w=0;w<o;w++){const S=x[w][D],F=x[w+1][D],G=x[w+1][D+1],k=x[w][D+1];(e>0||w!==0)&&(u.push(S,F,k),P+=3),(t>0||w!==o-1)&&(u.push(F,G,k),P+=3)}d.addGroup(m,P,0),m+=P}function b(y){const I=v,P=new ie,L=new A;let D=0;const w=y===!0?e:t,S=y===!0?1:-1;for(let G=1;G<=s;G++)f.push(0,g*S,0),r.push(0,S,0),p.push(.5,.5),v++;const F=v;for(let G=0;G<=s;G++){const X=G/s*c+l,J=Math.cos(X),Y=Math.sin(X);L.x=w*Y,L.y=g*S,L.z=w*J,f.push(L.x,L.y,L.z),r.push(0,S,0),P.x=J*.5+.5,P.y=Y*.5*S+.5,p.push(P.x,P.y),v++}for(let G=0;G<s;G++){const k=I+G,X=F+G;y===!0?u.push(X,X+1,k):u.push(X+1,X,k),D+=3}d.addGroup(m,D,y===!0?1:2),m+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ir(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ld extends Ir{constructor(e=1,t=1,n=32,s=1,o=!1,a=0,l=Math.PI*2){super(0,e,t,n,s,o,a,l),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l}}static fromJSON(e){return new ld(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Dr extends _t{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const o=[],a=[];l(s),d(n),u(),this.setAttribute("position",new Ke(o,3)),this.setAttribute("normal",new Ke(o.slice(),3)),this.setAttribute("uv",new Ke(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function l(M){const b=new A,y=new A,I=new A;for(let P=0;P<t.length;P+=3)p(t[P+0],b),p(t[P+1],y),p(t[P+2],I),c(b,y,I,M)}function c(M,b,y,I){const P=I+1,L=[];for(let D=0;D<=P;D++){L[D]=[];const w=M.clone().lerp(y,D/P),S=b.clone().lerp(y,D/P),F=P-D;for(let G=0;G<=F;G++)G===0&&D===P?L[D][G]=w:L[D][G]=w.clone().lerp(S,G/F)}for(let D=0;D<P;D++)for(let w=0;w<2*(P-D)-1;w++){const S=Math.floor(w/2);w%2===0?(r(L[D][S+1]),r(L[D+1][S]),r(L[D][S])):(r(L[D][S+1]),r(L[D+1][S+1]),r(L[D+1][S]))}}function d(M){const b=new A;for(let y=0;y<o.length;y+=3)b.x=o[y+0],b.y=o[y+1],b.z=o[y+2],b.normalize().multiplyScalar(M),o[y+0]=b.x,o[y+1]=b.y,o[y+2]=b.z}function u(){const M=new A;for(let b=0;b<o.length;b+=3){M.x=o[b+0],M.y=o[b+1],M.z=o[b+2];const y=g(M)/2/Math.PI+.5,I=m(M)/Math.PI+.5;a.push(y,1-I)}v(),f()}function f(){for(let M=0;M<a.length;M+=6){const b=a[M+0],y=a[M+2],I=a[M+4],P=Math.max(b,y,I),L=Math.min(b,y,I);P>.9&&L<.1&&(b<.2&&(a[M+0]+=1),y<.2&&(a[M+2]+=1),I<.2&&(a[M+4]+=1))}}function r(M){o.push(M.x,M.y,M.z)}function p(M,b){const y=M*3;b.x=e[y+0],b.y=e[y+1],b.z=e[y+2]}function v(){const M=new A,b=new A,y=new A,I=new A,P=new ie,L=new ie,D=new ie;for(let w=0,S=0;w<o.length;w+=9,S+=6){M.set(o[w+0],o[w+1],o[w+2]),b.set(o[w+3],o[w+4],o[w+5]),y.set(o[w+6],o[w+7],o[w+8]),P.set(a[S+0],a[S+1]),L.set(a[S+2],a[S+3]),D.set(a[S+4],a[S+5]),I.copy(M).add(b).add(y).divideScalar(3);const F=g(I);x(P,S+0,M,F),x(L,S+2,b,F),x(D,S+4,y,F)}}function x(M,b,y,I){I<0&&M.x===1&&(a[b]=M.x-1),y.x===0&&y.z===0&&(a[b]=I/2/Math.PI+.5)}function g(M){return Math.atan2(M.z,-M.x)}function m(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dr(e.vertices,e.indices,e.radius,e.details)}}const Zs=new A,js=new A,_o=new A,Js=new Jt;class X0 extends _t{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const s=Math.pow(10,4),o=Math.cos(Vi*t),a=e.getIndex(),l=e.getAttribute("position"),c=a?a.count:l.count,d=[0,0,0],u=["a","b","c"],f=new Array(3),r={},p=[];for(let v=0;v<c;v+=3){a?(d[0]=a.getX(v),d[1]=a.getX(v+1),d[2]=a.getX(v+2)):(d[0]=v,d[1]=v+1,d[2]=v+2);const{a:x,b:g,c:m}=Js;if(x.fromBufferAttribute(l,d[0]),g.fromBufferAttribute(l,d[1]),m.fromBufferAttribute(l,d[2]),Js.getNormal(_o),f[0]=`${Math.round(x.x*s)},${Math.round(x.y*s)},${Math.round(x.z*s)}`,f[1]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,f[2]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let M=0;M<3;M++){const b=(M+1)%3,y=f[M],I=f[b],P=Js[u[M]],L=Js[u[b]],D=`${y}_${I}`,w=`${I}_${y}`;w in r&&r[w]?(_o.dot(r[w].normal)<=o&&(p.push(P.x,P.y,P.z),p.push(L.x,L.y,L.z)),r[w]=null):D in r||(r[D]={index0:d[M],index1:d[b],normal:_o.clone()})}}for(const v in r)if(r[v]){const{index0:x,index1:g}=r[v];Zs.fromBufferAttribute(l,x),js.fromBufferAttribute(l,g),p.push(Zs.x,Zs.y,Zs.z),p.push(js.x,js.y,js.z)}this.setAttribute("position",new Ke(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Hu extends zl{constructor(e){super(e),this.uuid=ui(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new zl().fromJSON(s))}return this}}class Gu{static triangulate(e,t,n=2){const s=t&&t.length,o=s?t[0]*n:e.length;let a=cd(e,0,o,n,!0);const l=[];if(!a||a.next===a.prev)return l;let c,d,u,f,r,p,v;if(s&&(a=$u(e,t,a,n)),e.length>80*n){c=u=e[0],d=f=e[1];for(let x=n;x<o;x+=n)r=e[x],p=e[x+1],r<c&&(c=r),p<d&&(d=p),r>u&&(u=r),p>f&&(f=p);v=Math.max(u-c,f-d),v=v!==0?32767/v:0}return vs(a,l,n,c,d,v,0),l}}function cd(i,e,t,n,s){let o,a;if(s===of(i,e,t,n)>0)for(o=e;o<t;o+=n)a=kl(o,i[o],i[o+1],a);else for(o=t-n;o>=e;o-=n)a=kl(o,i[o],i[o+1],a);return a&&Fr(a,a.next)&&(ys(a),a=a.next),a}function ci(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Fr(t,t.next)||ut(t.prev,t,t.next)===0)){if(ys(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function vs(i,e,t,n,s,o,a){if(!i)return;!a&&o&&Qu(i,n,s,o);let l=i,c,d;for(;i.prev!==i.next;){if(c=i.prev,d=i.next,o?Xu(i,n,s,o):Wu(i)){e.push(c.i/t|0),e.push(i.i/t|0),e.push(d.i/t|0),ys(i),i=d.next,l=d.next;continue}if(i=d,i===l){a?a===1?(i=qu(ci(i),e,t),vs(i,e,t,n,s,o,2)):a===2&&Yu(i,e,t,n,s,o):vs(ci(i),e,t,n,s,o,1);break}}}function Wu(i){const e=i.prev,t=i,n=i.next;if(ut(e,t,n)>=0)return!1;const s=e.x,o=t.x,a=n.x,l=e.y,c=t.y,d=n.y,u=s<o?s<a?s:a:o<a?o:a,f=l<c?l<d?l:d:c<d?c:d,r=s>o?s>a?s:a:o>a?o:a,p=l>c?l>d?l:d:c>d?c:d;let v=n.next;for(;v!==e;){if(v.x>=u&&v.x<=r&&v.y>=f&&v.y<=p&&Fi(s,l,o,c,a,d,v.x,v.y)&&ut(v.prev,v,v.next)>=0)return!1;v=v.next}return!0}function Xu(i,e,t,n){const s=i.prev,o=i,a=i.next;if(ut(s,o,a)>=0)return!1;const l=s.x,c=o.x,d=a.x,u=s.y,f=o.y,r=a.y,p=l<c?l<d?l:d:c<d?c:d,v=u<f?u<r?u:r:f<r?f:r,x=l>c?l>d?l:d:c>d?c:d,g=u>f?u>r?u:r:f>r?f:r,m=ba(p,v,e,t,n),M=ba(x,g,e,t,n);let b=i.prevZ,y=i.nextZ;for(;b&&b.z>=m&&y&&y.z<=M;){if(b.x>=p&&b.x<=x&&b.y>=v&&b.y<=g&&b!==s&&b!==a&&Fi(l,u,c,f,d,r,b.x,b.y)&&ut(b.prev,b,b.next)>=0||(b=b.prevZ,y.x>=p&&y.x<=x&&y.y>=v&&y.y<=g&&y!==s&&y!==a&&Fi(l,u,c,f,d,r,y.x,y.y)&&ut(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;b&&b.z>=m;){if(b.x>=p&&b.x<=x&&b.y>=v&&b.y<=g&&b!==s&&b!==a&&Fi(l,u,c,f,d,r,b.x,b.y)&&ut(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;y&&y.z<=M;){if(y.x>=p&&y.x<=x&&y.y>=v&&y.y<=g&&y!==s&&y!==a&&Fi(l,u,c,f,d,r,y.x,y.y)&&ut(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function qu(i,e,t){let n=i;do{const s=n.prev,o=n.next.next;!Fr(s,o)&&dd(s,n,n.next,o)&&xs(s,o)&&xs(o,s)&&(e.push(s.i/t|0),e.push(n.i/t|0),e.push(o.i/t|0),ys(n),ys(n.next),n=i=o),n=n.next}while(n!==i);return ci(n)}function Yu(i,e,t,n,s,o){let a=i;do{let l=a.next.next;for(;l!==a.prev;){if(a.i!==l.i&&nf(a,l)){let c=hd(a,l);a=ci(a,a.next),c=ci(c,c.next),vs(a,e,t,n,s,o,0),vs(c,e,t,n,s,o,0);return}l=l.next}a=a.next}while(a!==i)}function $u(i,e,t,n){const s=[];let o,a,l,c,d;for(o=0,a=e.length;o<a;o++)l=e[o]*n,c=o<a-1?e[o+1]*n:i.length,d=cd(i,l,c,n,!1),d===d.next&&(d.steiner=!0),s.push(tf(d));for(s.sort(Ku),o=0;o<s.length;o++)t=Zu(s[o],t);return t}function Ku(i,e){return i.x-e.x}function Zu(i,e){const t=ju(i,e);if(!t)return e;const n=hd(t,i);return ci(n,n.next),ci(t,t.next)}function ju(i,e){let t=e,n=-1/0,s;const o=i.x,a=i.y;do{if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){const r=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(r<=o&&r>n&&(n=r,s=t.x<t.next.x?t:t.next,r===o))return s}t=t.next}while(t!==e);if(!s)return null;const l=s,c=s.x,d=s.y;let u=1/0,f;t=s;do o>=t.x&&t.x>=c&&o!==t.x&&Fi(a<d?o:n,a,c,d,a<d?n:o,a,t.x,t.y)&&(f=Math.abs(a-t.y)/(o-t.x),xs(t,i)&&(f<u||f===u&&(t.x>s.x||t.x===s.x&&Ju(s,t)))&&(s=t,u=f)),t=t.next;while(t!==l);return s}function Ju(i,e){return ut(i.prev,i,e.prev)<0&&ut(e.next,i,i.next)<0}function Qu(i,e,t,n){let s=i;do s.z===0&&(s.z=ba(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,ef(s)}function ef(i){let e,t,n,s,o,a,l,c,d=1;do{for(t=i,i=null,o=null,a=0;t;){for(a++,n=t,l=0,e=0;e<d&&(l++,n=n.nextZ,!!n);e++);for(c=d;l>0||c>0&&n;)l!==0&&(c===0||!n||t.z<=n.z)?(s=t,t=t.nextZ,l--):(s=n,n=n.nextZ,c--),o?o.nextZ=s:i=s,s.prevZ=o,o=s;t=n}o.nextZ=null,d*=2}while(a>1);return i}function ba(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function tf(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Fi(i,e,t,n,s,o,a,l){return(s-a)*(e-l)>=(i-a)*(o-l)&&(i-a)*(n-l)>=(t-a)*(e-l)&&(t-a)*(o-l)>=(s-a)*(n-l)}function nf(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!sf(i,e)&&(xs(i,e)&&xs(e,i)&&rf(i,e)&&(ut(i.prev,i,e.prev)||ut(i,e.prev,e))||Fr(i,e)&&ut(i.prev,i,i.next)>0&&ut(e.prev,e,e.next)>0)}function ut(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Fr(i,e){return i.x===e.x&&i.y===e.y}function dd(i,e,t,n){const s=er(ut(i,e,t)),o=er(ut(i,e,n)),a=er(ut(t,n,i)),l=er(ut(t,n,e));return!!(s!==o&&a!==l||s===0&&Qs(i,t,e)||o===0&&Qs(i,n,e)||a===0&&Qs(t,i,n)||l===0&&Qs(t,e,n))}function Qs(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function er(i){return i>0?1:i<0?-1:0}function sf(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&dd(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function xs(i,e){return ut(i.prev,i,i.next)<0?ut(i,e,i.next)>=0&&ut(i,i.prev,e)>=0:ut(i,e,i.prev)<0||ut(i,i.next,e)<0}function rf(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,o=(i.y+e.y)/2;do t.y>o!=t.next.y>o&&t.next.y!==t.y&&s<(t.next.x-t.x)*(o-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function hd(i,e){const t=new Sa(i.i,i.x,i.y),n=new Sa(e.i,e.x,e.y),s=i.next,o=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,o.next=n,n.prev=o,n}function kl(i,e,t,n){const s=new Sa(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function ys(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Sa(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function of(i,e,t,n){let s=0;for(let o=e,a=t-n;o<t;o+=n)s+=(i[a]-i[o])*(i[o+1]+i[a+1]),a=o;return s}class ps{static area(e){const t=e.length;let n=0;for(let s=t-1,o=0;o<t;s=o++)n+=e[s].x*e[o].y-e[o].x*e[s].y;return n*.5}static isClockWise(e){return ps.area(e)<0}static triangulateShape(e,t){const n=[],s=[],o=[];Hl(e),Gl(n,e);let a=e.length;t.forEach(Hl);for(let c=0;c<t.length;c++)s.push(a),a+=t[c].length,Gl(n,t[c]);const l=Gu.triangulate(n,s);for(let c=0;c<l.length;c+=3)o.push(l.slice(c,c+3));return o}}function Hl(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Gl(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class ud extends _t{constructor(e=new Hu([new ie(.5,.5),new ie(-.5,.5),new ie(-.5,-.5),new ie(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],o=[];for(let l=0,c=e.length;l<c;l++){const d=e[l];a(d)}this.setAttribute("position",new Ke(s,3)),this.setAttribute("uv",new Ke(o,2)),this.computeVertexNormals();function a(l){const c=[],d=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1;let r=t.bevelEnabled!==void 0?t.bevelEnabled:!0,p=t.bevelThickness!==void 0?t.bevelThickness:.2,v=t.bevelSize!==void 0?t.bevelSize:p-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,M=t.UVGenerator!==void 0?t.UVGenerator:af;let b,y=!1,I,P,L,D;m&&(b=m.getSpacedPoints(u),y=!0,r=!1,I=m.computeFrenetFrames(u,!1),P=new A,L=new A,D=new A),r||(g=0,p=0,v=0,x=0);const w=l.extractPoints(d);let S=w.shape;const F=w.holes;if(!ps.isClockWise(S)){S=S.reverse();for(let se=0,te=F.length;se<te;se++){const R=F[se];ps.isClockWise(R)&&(F[se]=R.reverse())}}const k=ps.triangulateShape(S,F),X=S;for(let se=0,te=F.length;se<te;se++){const R=F[se];S=S.concat(R)}function J(se,te,R){return te||console.error("THREE.ExtrudeGeometry: vec does not exist"),se.clone().addScaledVector(te,R)}const Y=S.length,oe=k.length;function $(se,te,R){let Re,re,Se;const he=se.x-te.x,Be=se.y-te.y,xe=R.x-se.x,C=R.y-se.y,E=he*he+Be*Be,z=he*C-Be*xe;if(Math.abs(z)>Number.EPSILON){const Z=Math.sqrt(E),ee=Math.sqrt(xe*xe+C*C),j=te.x-Be/Z,Ce=te.y+he/Z,me=R.x-C/ee,be=R.y+xe/ee,Ze=((me-j)*C-(be-Ce)*xe)/(he*C-Be*xe);Re=j+he*Ze-se.x,re=Ce+Be*Ze-se.y;const ce=Re*Re+re*re;if(ce<=2)return new ie(Re,re);Se=Math.sqrt(ce/2)}else{let Z=!1;he>Number.EPSILON?xe>Number.EPSILON&&(Z=!0):he<-Number.EPSILON?xe<-Number.EPSILON&&(Z=!0):Math.sign(Be)===Math.sign(C)&&(Z=!0),Z?(Re=-Be,re=he,Se=Math.sqrt(E)):(Re=he,re=Be,Se=Math.sqrt(E/2))}return new ie(Re/Se,re/Se)}const fe=[];for(let se=0,te=X.length,R=te-1,Re=se+1;se<te;se++,R++,Re++)R===te&&(R=0),Re===te&&(Re=0),fe[se]=$(X[se],X[R],X[Re]);const ve=[];let le,Ie=fe.concat();for(let se=0,te=F.length;se<te;se++){const R=F[se];le=[];for(let Re=0,re=R.length,Se=re-1,he=Re+1;Re<re;Re++,Se++,he++)Se===re&&(Se=0),he===re&&(he=0),le[Re]=$(R[Re],R[Se],R[he]);ve.push(le),Ie=Ie.concat(le)}for(let se=0;se<g;se++){const te=se/g,R=p*Math.cos(te*Math.PI/2),Re=v*Math.sin(te*Math.PI/2)+x;for(let re=0,Se=X.length;re<Se;re++){const he=J(X[re],fe[re],Re);ue(he.x,he.y,-R)}for(let re=0,Se=F.length;re<Se;re++){const he=F[re];le=ve[re];for(let Be=0,xe=he.length;Be<xe;Be++){const C=J(he[Be],le[Be],Re);ue(C.x,C.y,-R)}}}const Oe=v+x;for(let se=0;se<Y;se++){const te=r?J(S[se],Ie[se],Oe):S[se];y?(L.copy(I.normals[0]).multiplyScalar(te.x),P.copy(I.binormals[0]).multiplyScalar(te.y),D.copy(b[0]).add(L).add(P),ue(D.x,D.y,D.z)):ue(te.x,te.y,0)}for(let se=1;se<=u;se++)for(let te=0;te<Y;te++){const R=r?J(S[te],Ie[te],Oe):S[te];y?(L.copy(I.normals[se]).multiplyScalar(R.x),P.copy(I.binormals[se]).multiplyScalar(R.y),D.copy(b[se]).add(L).add(P),ue(D.x,D.y,D.z)):ue(R.x,R.y,f/u*se)}for(let se=g-1;se>=0;se--){const te=se/g,R=p*Math.cos(te*Math.PI/2),Re=v*Math.sin(te*Math.PI/2)+x;for(let re=0,Se=X.length;re<Se;re++){const he=J(X[re],fe[re],Re);ue(he.x,he.y,f+R)}for(let re=0,Se=F.length;re<Se;re++){const he=F[re];le=ve[re];for(let Be=0,xe=he.length;Be<xe;Be++){const C=J(he[Be],le[Be],Re);y?ue(C.x,C.y+b[u-1].y,b[u-1].x+R):ue(C.x,C.y,f+R)}}}q(),de();function q(){const se=s.length/3;if(r){let te=0,R=Y*te;for(let Re=0;Re<oe;Re++){const re=k[Re];De(re[2]+R,re[1]+R,re[0]+R)}te=u+g*2,R=Y*te;for(let Re=0;Re<oe;Re++){const re=k[Re];De(re[0]+R,re[1]+R,re[2]+R)}}else{for(let te=0;te<oe;te++){const R=k[te];De(R[2],R[1],R[0])}for(let te=0;te<oe;te++){const R=k[te];De(R[0]+Y*u,R[1]+Y*u,R[2]+Y*u)}}n.addGroup(se,s.length/3-se,0)}function de(){const se=s.length/3;let te=0;Pe(X,te),te+=X.length;for(let R=0,Re=F.length;R<Re;R++){const re=F[R];Pe(re,te),te+=re.length}n.addGroup(se,s.length/3-se,1)}function Pe(se,te){let R=se.length;for(;--R>=0;){const Re=R;let re=R-1;re<0&&(re=se.length-1);for(let Se=0,he=u+g*2;Se<he;Se++){const Be=Y*Se,xe=Y*(Se+1),C=te+Re+Be,E=te+re+Be,z=te+re+xe,Z=te+Re+xe;Je(C,E,z,Z)}}}function ue(se,te,R){c.push(se),c.push(te),c.push(R)}function De(se,te,R){Le(se),Le(te),Le(R);const Re=s.length/3,re=M.generateTopUV(n,s,Re-3,Re-2,Re-1);it(re[0]),it(re[1]),it(re[2])}function Je(se,te,R,Re){Le(se),Le(te),Le(Re),Le(te),Le(R),Le(Re);const re=s.length/3,Se=M.generateSideWallUV(n,s,re-6,re-3,re-2,re-1);it(Se[0]),it(Se[1]),it(Se[3]),it(Se[1]),it(Se[2]),it(Se[3])}function Le(se){s.push(c[se*3+0]),s.push(c[se*3+1]),s.push(c[se*3+2])}function it(se){o.push(se.x),o.push(se.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return lf(t,n,e)}static fromJSON(e,t){const n=[];for(let o=0,a=e.shapes.length;o<a;o++){const l=t[e.shapes[o]];n.push(l)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Ar[s.type]().fromJSON(s)),new ud(n,e.options)}}const af={generateTopUV:function(i,e,t,n,s){const o=e[t*3],a=e[t*3+1],l=e[n*3],c=e[n*3+1],d=e[s*3],u=e[s*3+1];return[new ie(o,a),new ie(l,c),new ie(d,u)]},generateSideWallUV:function(i,e,t,n,s,o){const a=e[t*3],l=e[t*3+1],c=e[t*3+2],d=e[n*3],u=e[n*3+1],f=e[n*3+2],r=e[s*3],p=e[s*3+1],v=e[s*3+2],x=e[o*3],g=e[o*3+1],m=e[o*3+2];return Math.abs(l-u)<Math.abs(a-d)?[new ie(a,1-c),new ie(d,1-f),new ie(r,1-v),new ie(x,1-m)]:[new ie(l,1-c),new ie(u,1-f),new ie(p,1-v),new ie(g,1-m)]}};function lf(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const o=i[n];t.shapes.push(o.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class fd extends Dr{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new fd(e.radius,e.detail)}}class Ur extends _t{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const o=e/2,a=t/2,l=Math.floor(n),c=Math.floor(s),d=l+1,u=c+1,f=e/l,r=t/c,p=[],v=[],x=[],g=[];for(let m=0;m<u;m++){const M=m*r-a;for(let b=0;b<d;b++){const y=b*f-o;v.push(y,-M,0),x.push(0,0,1),g.push(b/l),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let M=0;M<l;M++){const b=M+d*m,y=M+d*(m+1),I=M+1+d*(m+1),P=M+1+d*m;p.push(b,y,P),p.push(y,I,P)}this.setIndex(p),this.setAttribute("position",new Ke(v,3)),this.setAttribute("normal",new Ke(x,3)),this.setAttribute("uv",new Ke(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ur(e.width,e.height,e.widthSegments,e.heightSegments)}}class pd extends _t{constructor(e=.5,t=1,n=32,s=1,o=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:o,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const l=[],c=[],d=[],u=[];let f=e;const r=(t-e)/s,p=new A,v=new ie;for(let x=0;x<=s;x++){for(let g=0;g<=n;g++){const m=o+g/n*a;p.x=f*Math.cos(m),p.y=f*Math.sin(m),c.push(p.x,p.y,p.z),d.push(0,0,1),v.x=(p.x/t+1)/2,v.y=(p.y/t+1)/2,u.push(v.x,v.y)}f+=r}for(let x=0;x<s;x++){const g=x*(n+1);for(let m=0;m<n;m++){const M=m+g,b=M,y=M+n+1,I=M+n+2,P=M+1;l.push(b,y,P),l.push(y,I,P)}}this.setIndex(l),this.setAttribute("position",new Ke(c,3)),this.setAttribute("normal",new Ke(d,3)),this.setAttribute("uv",new Ke(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pd(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class md extends _t{constructor(e=1,t=32,n=16,s=0,o=Math.PI*2,a=0,l=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:o,thetaStart:a,thetaLength:l},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+l,Math.PI);let d=0;const u=[],f=new A,r=new A,p=[],v=[],x=[],g=[];for(let m=0;m<=n;m++){const M=[],b=m/n;let y=0;m===0&&a===0?y=.5/t:m===n&&c===Math.PI&&(y=-.5/t);for(let I=0;I<=t;I++){const P=I/t;f.x=-e*Math.cos(s+P*o)*Math.sin(a+b*l),f.y=e*Math.cos(a+b*l),f.z=e*Math.sin(s+P*o)*Math.sin(a+b*l),v.push(f.x,f.y,f.z),r.copy(f).normalize(),x.push(r.x,r.y,r.z),g.push(P+y,1-b),M.push(d++)}u.push(M)}for(let m=0;m<n;m++)for(let M=0;M<t;M++){const b=u[m][M+1],y=u[m][M],I=u[m+1][M],P=u[m+1][M+1];(m!==0||a>0)&&p.push(b,y,P),(m!==n-1||c<Math.PI)&&p.push(y,I,P)}this.setIndex(p),this.setAttribute("position",new Ke(v,3)),this.setAttribute("normal",new Ke(x,3)),this.setAttribute("uv",new Ke(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new md(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class gd extends Dr{constructor(e=1,t=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],s=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,s,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new gd(e.radius,e.detail)}}class _d extends _t{constructor(e=1,t=.4,n=12,s=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:o},n=Math.floor(n),s=Math.floor(s);const a=[],l=[],c=[],d=[],u=new A,f=new A,r=new A;for(let p=0;p<=n;p++)for(let v=0;v<=s;v++){const x=v/s*o,g=p/n*Math.PI*2;f.x=(e+t*Math.cos(g))*Math.cos(x),f.y=(e+t*Math.cos(g))*Math.sin(x),f.z=t*Math.sin(g),l.push(f.x,f.y,f.z),u.x=e*Math.cos(x),u.y=e*Math.sin(x),r.subVectors(f,u).normalize(),c.push(r.x,r.y,r.z),d.push(v/s),d.push(p/n)}for(let p=1;p<=n;p++)for(let v=1;v<=s;v++){const x=(s+1)*p+v-1,g=(s+1)*(p-1)+v-1,m=(s+1)*(p-1)+v,M=(s+1)*p+v;a.push(x,g,M),a.push(g,m,M)}this.setIndex(a),this.setAttribute("position",new Ke(l,3)),this.setAttribute("normal",new Ke(c,3)),this.setAttribute("uv",new Ke(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _d(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class vd extends _t{constructor(e=new sd(new A(-1,-1,0),new A(-1,1,0),new A(1,1,0)),t=64,n=1,s=8,o=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:o};const a=e.computeFrenetFrames(t,o);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const l=new A,c=new A,d=new ie;let u=new A;const f=[],r=[],p=[],v=[];x(),this.setIndex(v),this.setAttribute("position",new Ke(f,3)),this.setAttribute("normal",new Ke(r,3)),this.setAttribute("uv",new Ke(p,2));function x(){for(let b=0;b<t;b++)g(b);g(o===!1?t:0),M(),m()}function g(b){u=e.getPointAt(b/t,u);const y=a.normals[b],I=a.binormals[b];for(let P=0;P<=s;P++){const L=P/s*Math.PI*2,D=Math.sin(L),w=-Math.cos(L);c.x=w*y.x+D*I.x,c.y=w*y.y+D*I.y,c.z=w*y.z+D*I.z,c.normalize(),r.push(c.x,c.y,c.z),l.x=u.x+n*c.x,l.y=u.y+n*c.y,l.z=u.z+n*c.z,f.push(l.x,l.y,l.z)}}function m(){for(let b=1;b<=t;b++)for(let y=1;y<=s;y++){const I=(s+1)*(b-1)+(y-1),P=(s+1)*b+(y-1),L=(s+1)*b+y,D=(s+1)*(b-1)+y;v.push(I,P,D),v.push(P,L,D)}}function M(){for(let b=0;b<=t;b++)for(let y=0;y<=s;y++)d.x=b/t,d.y=y/s,p.push(d.x,d.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new vd(new Ar[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class ls extends kn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Oa,this.normalScale=new ie(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ln,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Wl extends ls{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ie(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ge(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new qe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new qe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new qe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class tr extends kn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Oa,this.normalScale=new ie(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ln,this.combine=Ra,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class cf extends kn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=vh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class df extends kn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class hf extends Lr{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class xd extends bt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new qe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class uf extends xd{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const vo=new at,Xl=new A,ql=new A;class ff{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ie(512,512),this.map=null,this.mapPass=null,this.matrix=new at,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Rr,this._frameExtents=new ie(1,1),this._viewportCount=1,this._viewports=[new mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Xl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Xl),ql.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ql),t.updateMatrixWorld(),vo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(vo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class yd extends jc{constructor(e=-1,t=1,n=1,s=-1,o=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=o,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,o,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let o=n-e,a=n+e,l=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=d*this.view.offsetX,a=o+d*this.view.width,l-=u*this.view.offsetY,c=l-u*this.view.height}this.projectionMatrix.makeOrthographic(o,a,l,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class pf extends ff{constructor(){super(new yd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class xo extends xd{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.target=new bt,this.shadow=new pf}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class mf extends jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}class gf{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Yl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Yl();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Yl(){return performance.now()}const $l=new at;class _f{constructor(e,t,n=0,s=1/0){this.ray=new Pr(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new za,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return $l.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4($l),this}intersectObject(e,t=!0,n=[]){return Ea(e,this,n,t),n.sort(Kl),n}intersectObjects(e,t=!0,n=[]){for(let s=0,o=e.length;s<o;s++)Ea(e[s],this,n,t);return n.sort(Kl),n}}function Kl(i,e){return i.distance-e.distance}function Ea(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const o=i.children;for(let a=0,l=o.length;a<l;a++)Ea(o[a],e,t,!0)}}class Zl{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ge(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Ge(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const jl=new A;let nr,yo;class q0 extends bt{constructor(e=new A(0,0,1),t=new A(0,0,0),n=1,s=16776960,o=n*.2,a=o*.2){super(),this.type="ArrowHelper",nr===void 0&&(nr=new _t,nr.setAttribute("position",new Ke([0,0,0,0,1,0],3)),yo=new Ir(0,.5,1,5,1),yo.translate(0,-.5,0)),this.position.copy(t),this.line=new Qc(nr,new Lr({color:s,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new kt(yo,new Cr({color:s,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,o,a)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{jl.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(jl,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class vf extends hi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function Jl(i,e,t,n){const s=xf(n);switch(t){case Bc:return i*e;case zc:return i*e;case kc:return i*e*2;case Fa:return i*e/s.components*s.byteLength;case wr:return i*e/s.components*s.byteLength;case Hc:return i*e*2/s.components*s.byteLength;case Ua:return i*e*2/s.components*s.byteLength;case Vc:return i*e*3/s.components*s.byteLength;case Ft:return i*e*4/s.components*s.byteLength;case Na:return i*e*4/s.components*s.byteLength;case hr:case ur:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case fr:case pr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case jo:case Qo:return Math.max(i,16)*Math.max(e,8)/4;case Zo:case Jo:return Math.max(i,8)*Math.max(e,8)/2;case ea:case ta:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case na:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ia:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case sa:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ra:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case oa:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case aa:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case la:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ca:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case da:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case ha:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case ua:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case fa:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case pa:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ma:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case ga:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case mr:case _a:case va:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Gc:case xa:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ya:case Ma:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function xf(i){switch(i){case Pn:case Uc:return{byteLength:1,components:1};case gs:case Nc:case Ms:return{byteLength:2,components:1};case Ia:case Da:return{byteLength:2,components:4};case Vn:case La:case Qt:return{byteLength:4,components:1};case Oc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ca}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ca);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Md(){let i=null,e=!1,t=null,n=null;function s(o,a){t(o,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(o){t=o},setContext:function(o){i=o}}}function yf(i){const e=new WeakMap;function t(l,c){const d=l.array,u=l.usage,f=d.byteLength,r=i.createBuffer();i.bindBuffer(c,r),i.bufferData(c,d,u),l.onUploadCallback();let p;if(d instanceof Float32Array)p=i.FLOAT;else if(d instanceof Uint16Array)l.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(d instanceof Int16Array)p=i.SHORT;else if(d instanceof Uint32Array)p=i.UNSIGNED_INT;else if(d instanceof Int32Array)p=i.INT;else if(d instanceof Int8Array)p=i.BYTE;else if(d instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:r,type:p,bytesPerElement:d.BYTES_PER_ELEMENT,version:l.version,size:f}}function n(l,c,d){const u=c.array,f=c.updateRanges;if(i.bindBuffer(d,l),f.length===0)i.bufferSubData(d,0,u);else{f.sort((p,v)=>p.start-v.start);let r=0;for(let p=1;p<f.length;p++){const v=f[r],x=f[p];x.start<=v.start+v.count+1?v.count=Math.max(v.count,x.start+x.count-v.start):(++r,f[r]=x)}f.length=r+1;for(let p=0,v=f.length;p<v;p++){const x=f[p];i.bufferSubData(d,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(l){return l.isInterleavedBufferAttribute&&(l=l.data),e.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);const c=e.get(l);c&&(i.deleteBuffer(c.buffer),e.delete(l))}function a(l,c){if(l.isInterleavedBufferAttribute&&(l=l.data),l.isGLBufferAttribute){const u=e.get(l);(!u||u.version<l.version)&&e.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}const d=e.get(l);if(d===void 0)e.set(l,t(l,c));else if(d.version<l.version){if(d.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(d.buffer,l,c),d.version=l.version}}return{get:s,remove:o,update:a}}var Mf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,bf=`#ifdef USE_ALPHAHASH
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
#endif`,Sf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ef=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Af=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Tf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,wf=`#ifdef USE_AOMAP
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
#endif`,Pf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Cf=`#ifdef USE_BATCHING
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
#endif`,Rf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Lf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,If=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Df=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ff=`#ifdef USE_IRIDESCENCE
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
#endif`,Uf=`#ifdef USE_BUMPMAP
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
#endif`,Nf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Of=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Vf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,zf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,kf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Hf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Gf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Wf=`#define PI 3.141592653589793
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
} // validated`,Xf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,qf=`vec3 transformedNormal = objectNormal;
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
#endif`,Yf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$f=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Kf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Zf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,jf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Jf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Qf=`#ifdef USE_ENVMAP
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
#endif`,ep=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,tp=`#ifdef USE_ENVMAP
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
#endif`,np=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ip=`#ifdef USE_ENVMAP
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
#endif`,sp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,op=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ap=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,lp=`#ifdef USE_GRADIENTMAP
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
}`,cp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,dp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,hp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,up=`uniform bool receiveShadow;
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
#endif`,fp=`#ifdef USE_ENVMAP
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
#endif`,pp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,mp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,gp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_p=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vp=`PhysicalMaterial material;
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
#endif`,xp=`struct PhysicalMaterial {
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
}`,yp=`
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
#endif`,Mp=`#if defined( RE_IndirectDiffuse )
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
#endif`,bp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Sp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ep=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ap=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,wp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Pp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Cp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Rp=`#if defined( USE_POINTS_UV )
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
#endif`,Lp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ip=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Dp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Fp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Up=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Np=`#ifdef USE_MORPHTARGETS
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
#endif`,Op=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Vp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,zp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Gp=`#ifdef USE_NORMALMAP
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
#endif`,Wp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,qp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Yp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$p=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Zp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Jp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,em=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,tm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,nm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,im=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,sm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,rm=`float getShadowMask() {
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
}`,om=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,am=`#ifdef USE_SKINNING
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
#endif`,lm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,cm=`#ifdef USE_SKINNING
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
#endif`,dm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,hm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,um=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,fm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,pm=`#ifdef USE_TRANSMISSION
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
#endif`,mm=`#ifdef USE_TRANSMISSION
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
#endif`,gm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_m=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ym=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Mm=`uniform sampler2D t2D;
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
}`,bm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Em=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Am=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tm=`#include <common>
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
}`,wm=`#if DEPTH_PACKING == 3200
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
}`,Pm=`#define DISTANCE
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
}`,Cm=`#define DISTANCE
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
}`,Rm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Lm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Im=`uniform float scale;
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
}`,Dm=`uniform vec3 diffuse;
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
}`,Fm=`#include <common>
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
}`,Um=`uniform vec3 diffuse;
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
}`,Nm=`#define LAMBERT
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
}`,Om=`#define LAMBERT
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
}`,Bm=`#define MATCAP
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
}`,Vm=`#define MATCAP
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
}`,zm=`#define NORMAL
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
}`,km=`#define NORMAL
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
}`,Hm=`#define PHONG
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
}`,Gm=`#define PHONG
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
}`,Wm=`#define STANDARD
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
}`,Xm=`#define STANDARD
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
}`,qm=`#define TOON
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
}`,Ym=`#define TOON
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
}`,$m=`uniform float size;
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
}`,Km=`uniform vec3 diffuse;
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
}`,Zm=`#include <common>
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
}`,jm=`uniform vec3 color;
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
}`,Jm=`uniform float rotation;
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
}`,Qm=`uniform vec3 diffuse;
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
}`,$e={alphahash_fragment:Mf,alphahash_pars_fragment:bf,alphamap_fragment:Sf,alphamap_pars_fragment:Ef,alphatest_fragment:Af,alphatest_pars_fragment:Tf,aomap_fragment:wf,aomap_pars_fragment:Pf,batching_pars_vertex:Cf,batching_vertex:Rf,begin_vertex:Lf,beginnormal_vertex:If,bsdfs:Df,iridescence_fragment:Ff,bumpmap_pars_fragment:Uf,clipping_planes_fragment:Nf,clipping_planes_pars_fragment:Of,clipping_planes_pars_vertex:Bf,clipping_planes_vertex:Vf,color_fragment:zf,color_pars_fragment:kf,color_pars_vertex:Hf,color_vertex:Gf,common:Wf,cube_uv_reflection_fragment:Xf,defaultnormal_vertex:qf,displacementmap_pars_vertex:Yf,displacementmap_vertex:$f,emissivemap_fragment:Kf,emissivemap_pars_fragment:Zf,colorspace_fragment:jf,colorspace_pars_fragment:Jf,envmap_fragment:Qf,envmap_common_pars_fragment:ep,envmap_pars_fragment:tp,envmap_pars_vertex:np,envmap_physical_pars_fragment:fp,envmap_vertex:ip,fog_vertex:sp,fog_pars_vertex:rp,fog_fragment:op,fog_pars_fragment:ap,gradientmap_pars_fragment:lp,lightmap_pars_fragment:cp,lights_lambert_fragment:dp,lights_lambert_pars_fragment:hp,lights_pars_begin:up,lights_toon_fragment:pp,lights_toon_pars_fragment:mp,lights_phong_fragment:gp,lights_phong_pars_fragment:_p,lights_physical_fragment:vp,lights_physical_pars_fragment:xp,lights_fragment_begin:yp,lights_fragment_maps:Mp,lights_fragment_end:bp,logdepthbuf_fragment:Sp,logdepthbuf_pars_fragment:Ep,logdepthbuf_pars_vertex:Ap,logdepthbuf_vertex:Tp,map_fragment:wp,map_pars_fragment:Pp,map_particle_fragment:Cp,map_particle_pars_fragment:Rp,metalnessmap_fragment:Lp,metalnessmap_pars_fragment:Ip,morphinstance_vertex:Dp,morphcolor_vertex:Fp,morphnormal_vertex:Up,morphtarget_pars_vertex:Np,morphtarget_vertex:Op,normal_fragment_begin:Bp,normal_fragment_maps:Vp,normal_pars_fragment:zp,normal_pars_vertex:kp,normal_vertex:Hp,normalmap_pars_fragment:Gp,clearcoat_normal_fragment_begin:Wp,clearcoat_normal_fragment_maps:Xp,clearcoat_pars_fragment:qp,iridescence_pars_fragment:Yp,opaque_fragment:$p,packing:Kp,premultiplied_alpha_fragment:Zp,project_vertex:jp,dithering_fragment:Jp,dithering_pars_fragment:Qp,roughnessmap_fragment:em,roughnessmap_pars_fragment:tm,shadowmap_pars_fragment:nm,shadowmap_pars_vertex:im,shadowmap_vertex:sm,shadowmask_pars_fragment:rm,skinbase_vertex:om,skinning_pars_vertex:am,skinning_vertex:lm,skinnormal_vertex:cm,specularmap_fragment:dm,specularmap_pars_fragment:hm,tonemapping_fragment:um,tonemapping_pars_fragment:fm,transmission_fragment:pm,transmission_pars_fragment:mm,uv_pars_fragment:gm,uv_pars_vertex:_m,uv_vertex:vm,worldpos_vertex:xm,background_vert:ym,background_frag:Mm,backgroundCube_vert:bm,backgroundCube_frag:Sm,cube_vert:Em,cube_frag:Am,depth_vert:Tm,depth_frag:wm,distanceRGBA_vert:Pm,distanceRGBA_frag:Cm,equirect_vert:Rm,equirect_frag:Lm,linedashed_vert:Im,linedashed_frag:Dm,meshbasic_vert:Fm,meshbasic_frag:Um,meshlambert_vert:Nm,meshlambert_frag:Om,meshmatcap_vert:Bm,meshmatcap_frag:Vm,meshnormal_vert:zm,meshnormal_frag:km,meshphong_vert:Hm,meshphong_frag:Gm,meshphysical_vert:Wm,meshphysical_frag:Xm,meshtoon_vert:qm,meshtoon_frag:Ym,points_vert:$m,points_frag:Km,shadow_vert:Zm,shadow_frag:jm,sprite_vert:Jm,sprite_frag:Qm},pe={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xe}},envmap:{envMap:{value:null},envMapRotation:{value:new Xe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xe},normalScale:{value:new ie(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new ie(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}}},un={basic:{uniforms:Ot([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:$e.meshbasic_vert,fragmentShader:$e.meshbasic_frag},lambert:{uniforms:Ot([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new qe(0)}}]),vertexShader:$e.meshlambert_vert,fragmentShader:$e.meshlambert_frag},phong:{uniforms:Ot([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30}}]),vertexShader:$e.meshphong_vert,fragmentShader:$e.meshphong_frag},standard:{uniforms:Ot([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag},toon:{uniforms:Ot([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new qe(0)}}]),vertexShader:$e.meshtoon_vert,fragmentShader:$e.meshtoon_frag},matcap:{uniforms:Ot([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:$e.meshmatcap_vert,fragmentShader:$e.meshmatcap_frag},points:{uniforms:Ot([pe.points,pe.fog]),vertexShader:$e.points_vert,fragmentShader:$e.points_frag},dashed:{uniforms:Ot([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$e.linedashed_vert,fragmentShader:$e.linedashed_frag},depth:{uniforms:Ot([pe.common,pe.displacementmap]),vertexShader:$e.depth_vert,fragmentShader:$e.depth_frag},normal:{uniforms:Ot([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:$e.meshnormal_vert,fragmentShader:$e.meshnormal_frag},sprite:{uniforms:Ot([pe.sprite,pe.fog]),vertexShader:$e.sprite_vert,fragmentShader:$e.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$e.background_vert,fragmentShader:$e.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xe}},vertexShader:$e.backgroundCube_vert,fragmentShader:$e.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$e.cube_vert,fragmentShader:$e.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$e.equirect_vert,fragmentShader:$e.equirect_frag},distanceRGBA:{uniforms:Ot([pe.common,pe.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$e.distanceRGBA_vert,fragmentShader:$e.distanceRGBA_frag},shadow:{uniforms:Ot([pe.lights,pe.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:$e.shadow_vert,fragmentShader:$e.shadow_frag}};un.physical={uniforms:Ot([un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xe},clearcoatNormalScale:{value:new ie(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xe},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xe},transmissionSamplerSize:{value:new ie},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xe},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xe},anisotropyVector:{value:new ie},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xe}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag};const ir={r:0,b:0,g:0},Zn=new ln,eg=new at;function tg(i,e,t,n,s,o,a){const l=new qe(0);let c=o===!0?0:1,d,u,f=null,r=0,p=null;function v(b){let y=b.isScene===!0?b.background:null;return y&&y.isTexture&&(y=(b.backgroundBlurriness>0?t:e).get(y)),y}function x(b){let y=!1;const I=v(b);I===null?m(l,c):I&&I.isColor&&(m(I,1),y=!0);const P=i.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,a):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(b,y){const I=v(y);I&&(I.isCubeTexture||I.mapping===Tr)?(u===void 0&&(u=new kt(new bs(1,1,1),new zn({name:"BackgroundCubeMaterial",uniforms:Ki(un.backgroundCube.uniforms),vertexShader:un.backgroundCube.vertexShader,fragmentShader:un.backgroundCube.fragmentShader,side:Ht,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(P,L,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Zn.copy(y.backgroundRotation),Zn.x*=-1,Zn.y*=-1,Zn.z*=-1,I.isCubeTexture&&I.isRenderTargetTexture===!1&&(Zn.y*=-1,Zn.z*=-1),u.material.uniforms.envMap.value=I,u.material.uniforms.flipEnvMap.value=I.isCubeTexture&&I.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(eg.makeRotationFromEuler(Zn)),u.material.toneMapped=tt.getTransfer(I.colorSpace)!==lt,(f!==I||r!==I.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,f=I,r=I.version,p=i.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null)):I&&I.isTexture&&(d===void 0&&(d=new kt(new Ur(2,2),new zn({name:"BackgroundMaterial",uniforms:Ki(un.background.uniforms),vertexShader:un.background.vertexShader,fragmentShader:un.background.fragmentShader,side:wn,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(d)),d.material.uniforms.t2D.value=I,d.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,d.material.toneMapped=tt.getTransfer(I.colorSpace)!==lt,I.matrixAutoUpdate===!0&&I.updateMatrix(),d.material.uniforms.uvTransform.value.copy(I.matrix),(f!==I||r!==I.version||p!==i.toneMapping)&&(d.material.needsUpdate=!0,f=I,r=I.version,p=i.toneMapping),d.layers.enableAll(),b.unshift(d,d.geometry,d.material,0,0,null))}function m(b,y){b.getRGB(ir,Zc(i)),n.buffers.color.setClear(ir.r,ir.g,ir.b,y,a)}function M(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0)}return{getClearColor:function(){return l},setClearColor:function(b,y=1){l.set(b),c=y,m(l,c)},getClearAlpha:function(){return c},setClearAlpha:function(b){c=b,m(l,c)},render:x,addToRenderList:g,dispose:M}}function ng(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=r(null);let o=s,a=!1;function l(S,F,G,k,X){let J=!1;const Y=f(k,G,F);o!==Y&&(o=Y,d(o.object)),J=p(S,k,G,X),J&&v(S,k,G,X),X!==null&&e.update(X,i.ELEMENT_ARRAY_BUFFER),(J||a)&&(a=!1,y(S,F,G,k),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function c(){return i.createVertexArray()}function d(S){return i.bindVertexArray(S)}function u(S){return i.deleteVertexArray(S)}function f(S,F,G){const k=G.wireframe===!0;let X=n[S.id];X===void 0&&(X={},n[S.id]=X);let J=X[F.id];J===void 0&&(J={},X[F.id]=J);let Y=J[k];return Y===void 0&&(Y=r(c()),J[k]=Y),Y}function r(S){const F=[],G=[],k=[];for(let X=0;X<t;X++)F[X]=0,G[X]=0,k[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:G,attributeDivisors:k,object:S,attributes:{},index:null}}function p(S,F,G,k){const X=o.attributes,J=F.attributes;let Y=0;const oe=G.getAttributes();for(const $ in oe)if(oe[$].location>=0){const ve=X[$];let le=J[$];if(le===void 0&&($==="instanceMatrix"&&S.instanceMatrix&&(le=S.instanceMatrix),$==="instanceColor"&&S.instanceColor&&(le=S.instanceColor)),ve===void 0||ve.attribute!==le||le&&ve.data!==le.data)return!0;Y++}return o.attributesNum!==Y||o.index!==k}function v(S,F,G,k){const X={},J=F.attributes;let Y=0;const oe=G.getAttributes();for(const $ in oe)if(oe[$].location>=0){let ve=J[$];ve===void 0&&($==="instanceMatrix"&&S.instanceMatrix&&(ve=S.instanceMatrix),$==="instanceColor"&&S.instanceColor&&(ve=S.instanceColor));const le={};le.attribute=ve,ve&&ve.data&&(le.data=ve.data),X[$]=le,Y++}o.attributes=X,o.attributesNum=Y,o.index=k}function x(){const S=o.newAttributes;for(let F=0,G=S.length;F<G;F++)S[F]=0}function g(S){m(S,0)}function m(S,F){const G=o.newAttributes,k=o.enabledAttributes,X=o.attributeDivisors;G[S]=1,k[S]===0&&(i.enableVertexAttribArray(S),k[S]=1),X[S]!==F&&(i.vertexAttribDivisor(S,F),X[S]=F)}function M(){const S=o.newAttributes,F=o.enabledAttributes;for(let G=0,k=F.length;G<k;G++)F[G]!==S[G]&&(i.disableVertexAttribArray(G),F[G]=0)}function b(S,F,G,k,X,J,Y){Y===!0?i.vertexAttribIPointer(S,F,G,X,J):i.vertexAttribPointer(S,F,G,k,X,J)}function y(S,F,G,k){x();const X=k.attributes,J=G.getAttributes(),Y=F.defaultAttributeValues;for(const oe in J){const $=J[oe];if($.location>=0){let fe=X[oe];if(fe===void 0&&(oe==="instanceMatrix"&&S.instanceMatrix&&(fe=S.instanceMatrix),oe==="instanceColor"&&S.instanceColor&&(fe=S.instanceColor)),fe!==void 0){const ve=fe.normalized,le=fe.itemSize,Ie=e.get(fe);if(Ie===void 0)continue;const Oe=Ie.buffer,q=Ie.type,de=Ie.bytesPerElement,Pe=q===i.INT||q===i.UNSIGNED_INT||fe.gpuType===La;if(fe.isInterleavedBufferAttribute){const ue=fe.data,De=ue.stride,Je=fe.offset;if(ue.isInstancedInterleavedBuffer){for(let Le=0;Le<$.locationSize;Le++)m($.location+Le,ue.meshPerAttribute);S.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let Le=0;Le<$.locationSize;Le++)g($.location+Le);i.bindBuffer(i.ARRAY_BUFFER,Oe);for(let Le=0;Le<$.locationSize;Le++)b($.location+Le,le/$.locationSize,q,ve,De*de,(Je+le/$.locationSize*Le)*de,Pe)}else{if(fe.isInstancedBufferAttribute){for(let ue=0;ue<$.locationSize;ue++)m($.location+ue,fe.meshPerAttribute);S.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let ue=0;ue<$.locationSize;ue++)g($.location+ue);i.bindBuffer(i.ARRAY_BUFFER,Oe);for(let ue=0;ue<$.locationSize;ue++)b($.location+ue,le/$.locationSize,q,ve,le*de,le/$.locationSize*ue*de,Pe)}}else if(Y!==void 0){const ve=Y[oe];if(ve!==void 0)switch(ve.length){case 2:i.vertexAttrib2fv($.location,ve);break;case 3:i.vertexAttrib3fv($.location,ve);break;case 4:i.vertexAttrib4fv($.location,ve);break;default:i.vertexAttrib1fv($.location,ve)}}}}M()}function I(){D();for(const S in n){const F=n[S];for(const G in F){const k=F[G];for(const X in k)u(k[X].object),delete k[X];delete F[G]}delete n[S]}}function P(S){if(n[S.id]===void 0)return;const F=n[S.id];for(const G in F){const k=F[G];for(const X in k)u(k[X].object),delete k[X];delete F[G]}delete n[S.id]}function L(S){for(const F in n){const G=n[F];if(G[S.id]===void 0)continue;const k=G[S.id];for(const X in k)u(k[X].object),delete k[X];delete G[S.id]}}function D(){w(),a=!0,o!==s&&(o=s,d(o.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:l,reset:D,resetDefaultState:w,dispose:I,releaseStatesOfGeometry:P,releaseStatesOfProgram:L,initAttributes:x,enableAttribute:g,disableUnusedAttributes:M}}function ig(i,e,t){let n;function s(d){n=d}function o(d,u){i.drawArrays(n,d,u),t.update(u,n,1)}function a(d,u,f){f!==0&&(i.drawArraysInstanced(n,d,u,f),t.update(u,n,f))}function l(d,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,d,0,u,0,f);let p=0;for(let v=0;v<f;v++)p+=u[v];t.update(p,n,1)}function c(d,u,f,r){if(f===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let v=0;v<d.length;v++)a(d[v],u[v],r[v]);else{p.multiDrawArraysInstancedWEBGL(n,d,0,u,0,r,0,f);let v=0;for(let x=0;x<f;x++)v+=u[x]*r[x];t.update(v,n,1)}}this.setMode=s,this.render=o,this.renderInstances=a,this.renderMultiDraw=l,this.renderMultiDrawInstances=c}function sg(i,e,t,n){let s;function o(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(L){return!(L!==Ft&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(L){const D=L===Ms&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==Pn&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==Qt&&!D)}function c(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let d=t.precision!==void 0?t.precision:"highp";const u=c(d);u!==d&&(console.warn("THREE.WebGLRenderer:",d,"not supported, using",u,"instead."),d=u);const f=t.logarithmicDepthBuffer===!0,r=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),I=v>0,P=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:l,precision:d,logarithmicDepthBuffer:f,reverseDepthBuffer:r,maxTextures:p,maxVertexTextures:v,maxTextureSize:x,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:M,maxVaryings:b,maxFragmentUniforms:y,vertexTextures:I,maxSamples:P}}function rg(i){const e=this;let t=null,n=0,s=!1,o=!1;const a=new En,l=new Xe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,r){const p=f.length!==0||r||n!==0||s;return s=r,n=f.length,p},this.beginShadows=function(){o=!0,u(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(f,r){t=u(f,r,0)},this.setState=function(f,r,p){const v=f.clippingPlanes,x=f.clipIntersection,g=f.clipShadows,m=i.get(f);if(!s||v===null||v.length===0||o&&!g)o?u(null):d();else{const M=o?0:n,b=M*4;let y=m.clippingState||null;c.value=y,y=u(v,r,b,p);for(let I=0;I!==b;++I)y[I]=t[I];m.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function d(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(f,r,p,v){const x=f!==null?f.length:0;let g=null;if(x!==0){if(g=c.value,v!==!0||g===null){const m=p+x*4,M=r.matrixWorldInverse;l.getNormalMatrix(M),(g===null||g.length<m)&&(g=new Float32Array(m));for(let b=0,y=p;b!==x;++b,y+=4)a.copy(f[b]).applyMatrix4(M,l),a.normal.toArray(g,y),g[y+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}function og(i){let e=new WeakMap;function t(a,l){return l===xr?a.mapping=Wi:l===$o&&(a.mapping=Xi),a}function n(a){if(a&&a.isTexture){const l=a.mapping;if(l===xr||l===$o)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const d=new gu(c.height);return d.fromEquirectangularTexture(i,a),e.set(a,d),a.addEventListener("dispose",s),t(d.texture,a.mapping)}else return null}}return a}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap}return{get:n,dispose:o}}const Ui=4,Ql=[.125,.215,.35,.446,.526,.582],ti=20,Mo=new yd,ec=new qe;let bo=null,So=0,Eo=0,Ao=!1;const Qn=(1+Math.sqrt(5))/2,Pi=1/Qn,tc=[new A(-Qn,Pi,0),new A(Qn,Pi,0),new A(-Pi,0,Qn),new A(Pi,0,Qn),new A(0,Qn,-Pi),new A(0,Qn,Pi),new A(-1,1,-1),new A(1,1,-1),new A(-1,1,1),new A(1,1,1)],ag=new A;class Aa{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,o={}){const{size:a=256,position:l=ag}=o;bo=this._renderer.getRenderTarget(),So=this._renderer.getActiveCubeFace(),Eo=this._renderer.getActiveMipmapLevel(),Ao=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,l),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=sc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ic(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(bo,So,Eo),this._renderer.xr.enabled=Ao,e.scissorTest=!1,sr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Wi||e.mapping===Xi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),bo=this._renderer.getRenderTarget(),So=this._renderer.getActiveCubeFace(),Eo=this._renderer.getActiveMipmapLevel(),Ao=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Pt,minFilter:Pt,generateMipmaps:!1,type:Ms,format:Ft,colorSpace:$i,depthBuffer:!1},s=nc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=nc(e,t,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=lg(o)),this._blurMaterial=cg(o,e,t)}return s}_compileMaterial(e){const t=new kt(this._lodPlanes[0],e);this._renderer.compile(t,Mo)}_sceneToCubeUV(e,t,n,s,o){const c=new jt(90,1,t,n),d=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,r=f.autoClear,p=f.toneMapping;f.getClearColor(ec),f.toneMapping=Bn,f.autoClear=!1;const v=new Cr({name:"PMREM.Background",side:Ht,depthWrite:!1,depthTest:!1}),x=new kt(new bs,v);let g=!1;const m=e.background;m?m.isColor&&(v.color.copy(m),e.background=null,g=!0):(v.color.copy(ec),g=!0);for(let M=0;M<6;M++){const b=M%3;b===0?(c.up.set(0,d[M],0),c.position.set(o.x,o.y,o.z),c.lookAt(o.x+u[M],o.y,o.z)):b===1?(c.up.set(0,0,d[M]),c.position.set(o.x,o.y,o.z),c.lookAt(o.x,o.y+u[M],o.z)):(c.up.set(0,d[M],0),c.position.set(o.x,o.y,o.z),c.lookAt(o.x,o.y,o.z+u[M]));const y=this._cubeSize;sr(s,b*y,M>2?y:0,y,y),f.setRenderTarget(s),g&&f.render(x,c),f.render(e,c)}x.geometry.dispose(),x.material.dispose(),f.toneMapping=p,f.autoClear=r,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Wi||e.mapping===Xi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=sc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ic());const o=s?this._cubemapMaterial:this._equirectMaterial,a=new kt(this._lodPlanes[0],o),l=o.uniforms;l.envMap.value=e;const c=this._cubeSize;sr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Mo)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let o=1;o<s;o++){const a=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),l=tc[(s-o-1)%tc.length];this._blur(e,o-1,o,a,l)}t.autoClear=n}_blur(e,t,n,s,o){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",o),this._halfBlur(a,e,n,n,s,"longitudinal",o)}_halfBlur(e,t,n,s,o,a,l){const c=this._renderer,d=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new kt(this._lodPlanes[s],d),r=d.uniforms,p=this._sizeLods[n]-1,v=isFinite(o)?Math.PI/(2*p):2*Math.PI/(2*ti-1),x=o/v,g=isFinite(o)?1+Math.floor(u*x):ti;g>ti&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${ti}`);const m=[];let M=0;for(let L=0;L<ti;++L){const D=L/x,w=Math.exp(-D*D/2);m.push(w),L===0?M+=w:L<g&&(M+=2*w)}for(let L=0;L<m.length;L++)m[L]=m[L]/M;r.envMap.value=e.texture,r.samples.value=g,r.weights.value=m,r.latitudinal.value=a==="latitudinal",l&&(r.poleAxis.value=l);const{_lodMax:b}=this;r.dTheta.value=v,r.mipInt.value=b-n;const y=this._sizeLods[s],I=3*y*(s>b-Ui?s-b+Ui:0),P=4*(this._cubeSize-y);sr(t,I,P,3*y,2*y),c.setRenderTarget(t),c.render(f,Mo)}}function lg(i){const e=[],t=[],n=[];let s=i;const o=i-Ui+1+Ql.length;for(let a=0;a<o;a++){const l=Math.pow(2,s);t.push(l);let c=1/l;a>i-Ui?c=Ql[a-i+Ui-1]:a===0&&(c=0),n.push(c);const d=1/(l-2),u=-d,f=1+d,r=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,v=6,x=3,g=2,m=1,M=new Float32Array(x*v*p),b=new Float32Array(g*v*p),y=new Float32Array(m*v*p);for(let P=0;P<p;P++){const L=P%3*2/3-1,D=P>2?0:-1,w=[L,D,0,L+2/3,D,0,L+2/3,D+1,0,L,D,0,L+2/3,D+1,0,L,D+1,0];M.set(w,x*v*P),b.set(r,g*v*P);const S=[P,P,P,P,P,P];y.set(S,m*v*P)}const I=new _t;I.setAttribute("position",new Yt(M,x)),I.setAttribute("uv",new Yt(b,g)),I.setAttribute("faceIndex",new Yt(y,m)),e.push(I),s>Ui&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function nc(i,e,t){const n=new ai(i,e,t);return n.texture.mapping=Tr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function sr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function cg(i,e,t){const n=new Float32Array(ti),s=new A(0,1,0);return new zn({name:"SphericalGaussianBlur",defines:{n:ti,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ga(),fragmentShader:`

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
		`,blending:On,depthTest:!1,depthWrite:!1})}function ic(){return new zn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ga(),fragmentShader:`

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
		`,blending:On,depthTest:!1,depthWrite:!1})}function sc(){return new zn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ga(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function Ga(){return`

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
	`}function dg(i){let e=new WeakMap,t=null;function n(l){if(l&&l.isTexture){const c=l.mapping,d=c===xr||c===$o,u=c===Wi||c===Xi;if(d||u){let f=e.get(l);const r=f!==void 0?f.texture.pmremVersion:0;if(l.isRenderTargetTexture&&l.pmremVersion!==r)return t===null&&(t=new Aa(i)),f=d?t.fromEquirectangular(l,f):t.fromCubemap(l,f),f.texture.pmremVersion=l.pmremVersion,e.set(l,f),f.texture;if(f!==void 0)return f.texture;{const p=l.image;return d&&p&&p.height>0||u&&p&&s(p)?(t===null&&(t=new Aa(i)),f=d?t.fromEquirectangular(l):t.fromCubemap(l),f.texture.pmremVersion=l.pmremVersion,e.set(l,f),l.addEventListener("dispose",o),f.texture):null}}}return l}function s(l){let c=0;const d=6;for(let u=0;u<d;u++)l[u]!==void 0&&c++;return c===d}function o(l){const c=l.target;c.removeEventListener("dispose",o);const d=e.get(c);d!==void 0&&(e.delete(c),d.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function hg(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Jn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function ug(i,e,t,n){const s={},o=new WeakMap;function a(f){const r=f.target;r.index!==null&&e.remove(r.index);for(const v in r.attributes)e.remove(r.attributes[v]);r.removeEventListener("dispose",a),delete s[r.id];const p=o.get(r);p&&(e.remove(p),o.delete(r)),n.releaseStatesOfGeometry(r),r.isInstancedBufferGeometry===!0&&delete r._maxInstanceCount,t.memory.geometries--}function l(f,r){return s[r.id]===!0||(r.addEventListener("dispose",a),s[r.id]=!0,t.memory.geometries++),r}function c(f){const r=f.attributes;for(const p in r)e.update(r[p],i.ARRAY_BUFFER)}function d(f){const r=[],p=f.index,v=f.attributes.position;let x=0;if(p!==null){const M=p.array;x=p.version;for(let b=0,y=M.length;b<y;b+=3){const I=M[b+0],P=M[b+1],L=M[b+2];r.push(I,P,P,L,L,I)}}else if(v!==void 0){const M=v.array;x=v.version;for(let b=0,y=M.length/3-1;b<y;b+=3){const I=b+0,P=b+1,L=b+2;r.push(I,P,P,L,L,I)}}else return;const g=new(Xc(r)?Kc:$c)(r,1);g.version=x;const m=o.get(f);m&&e.remove(m),o.set(f,g)}function u(f){const r=o.get(f);if(r){const p=f.index;p!==null&&r.version<p.version&&d(f)}else d(f);return o.get(f)}return{get:l,update:c,getWireframeAttribute:u}}function fg(i,e,t){let n;function s(r){n=r}let o,a;function l(r){o=r.type,a=r.bytesPerElement}function c(r,p){i.drawElements(n,p,o,r*a),t.update(p,n,1)}function d(r,p,v){v!==0&&(i.drawElementsInstanced(n,p,o,r*a,v),t.update(p,n,v))}function u(r,p,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,o,r,0,v);let g=0;for(let m=0;m<v;m++)g+=p[m];t.update(g,n,1)}function f(r,p,v,x){if(v===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<r.length;m++)d(r[m]/a,p[m],x[m]);else{g.multiDrawElementsInstancedWEBGL(n,p,0,o,r,0,x,0,v);let m=0;for(let M=0;M<v;M++)m+=p[M]*x[M];t.update(m,n,1)}}this.setMode=s,this.setIndex=l,this.render=c,this.renderInstances=d,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function pg(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,a,l){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=l*(o/3);break;case i.LINES:t.lines+=l*(o/2);break;case i.LINE_STRIP:t.lines+=l*(o-1);break;case i.LINE_LOOP:t.lines+=l*o;break;case i.POINTS:t.points+=l*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function mg(i,e,t){const n=new WeakMap,s=new mt;function o(a,l,c){const d=a.morphTargetInfluences,u=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,f=u!==void 0?u.length:0;let r=n.get(l);if(r===void 0||r.count!==f){let w=function(){L.dispose(),n.delete(l),l.removeEventListener("dispose",w)};r!==void 0&&r.texture.dispose();const p=l.morphAttributes.position!==void 0,v=l.morphAttributes.normal!==void 0,x=l.morphAttributes.color!==void 0,g=l.morphAttributes.position||[],m=l.morphAttributes.normal||[],M=l.morphAttributes.color||[];let b=0;p===!0&&(b=1),v===!0&&(b=2),x===!0&&(b=3);let y=l.attributes.position.count*b,I=1;y>e.maxTextureSize&&(I=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const P=new Float32Array(y*I*4*f),L=new qc(P,y,I,f);L.type=Qt,L.needsUpdate=!0;const D=b*4;for(let S=0;S<f;S++){const F=g[S],G=m[S],k=M[S],X=y*I*4*S;for(let J=0;J<F.count;J++){const Y=J*D;p===!0&&(s.fromBufferAttribute(F,J),P[X+Y+0]=s.x,P[X+Y+1]=s.y,P[X+Y+2]=s.z,P[X+Y+3]=0),v===!0&&(s.fromBufferAttribute(G,J),P[X+Y+4]=s.x,P[X+Y+5]=s.y,P[X+Y+6]=s.z,P[X+Y+7]=0),x===!0&&(s.fromBufferAttribute(k,J),P[X+Y+8]=s.x,P[X+Y+9]=s.y,P[X+Y+10]=s.z,P[X+Y+11]=k.itemSize===4?s.w:1)}}r={count:f,texture:L,size:new ie(y,I)},n.set(l,r),l.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let x=0;x<d.length;x++)p+=d[x];const v=l.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",v),c.getUniforms().setValue(i,"morphTargetInfluences",d)}c.getUniforms().setValue(i,"morphTargetsTexture",r.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",r.size)}return{update:o}}function gg(i,e,t,n){let s=new WeakMap;function o(c){const d=n.render.frame,u=c.geometry,f=e.get(c,u);if(s.get(f)!==d&&(e.update(f),s.set(f,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==d&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,d))),c.isSkinnedMesh){const r=c.skeleton;s.get(r)!==d&&(r.update(),s.set(r,d))}return f}function a(){s=new WeakMap}function l(c){const d=c.target;d.removeEventListener("dispose",l),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:o,dispose:a}}const bd=new Ct,rc=new ed(1,1),Sd=new qc,Ed=new Qh,Ad=new Jc,oc=[],ac=[],lc=new Float32Array(16),cc=new Float32Array(9),dc=new Float32Array(4);function Zi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let o=oc[s];if(o===void 0&&(o=new Float32Array(s),oc[s]=o),e!==0){n.toArray(o,0);for(let a=1,l=0;a!==e;++a)l+=t,i[a].toArray(o,l)}return o}function St(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Et(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Nr(i,e){let t=ac[e];t===void 0&&(t=new Int32Array(e),ac[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function _g(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function vg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;i.uniform2fv(this.addr,e),Et(t,e)}}function xg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(St(t,e))return;i.uniform3fv(this.addr,e),Et(t,e)}}function yg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;i.uniform4fv(this.addr,e),Et(t,e)}}function Mg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Et(t,e)}else{if(St(t,n))return;dc.set(n),i.uniformMatrix2fv(this.addr,!1,dc),Et(t,n)}}function bg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Et(t,e)}else{if(St(t,n))return;cc.set(n),i.uniformMatrix3fv(this.addr,!1,cc),Et(t,n)}}function Sg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Et(t,e)}else{if(St(t,n))return;lc.set(n),i.uniformMatrix4fv(this.addr,!1,lc),Et(t,n)}}function Eg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Ag(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;i.uniform2iv(this.addr,e),Et(t,e)}}function Tg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;i.uniform3iv(this.addr,e),Et(t,e)}}function wg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;i.uniform4iv(this.addr,e),Et(t,e)}}function Pg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Cg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;i.uniform2uiv(this.addr,e),Et(t,e)}}function Rg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;i.uniform3uiv(this.addr,e),Et(t,e)}}function Lg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;i.uniform4uiv(this.addr,e),Et(t,e)}}function Ig(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let o;this.type===i.SAMPLER_2D_SHADOW?(rc.compareFunction=Wc,o=rc):o=bd,t.setTexture2D(e||o,s)}function Dg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Ed,s)}function Fg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Ad,s)}function Ug(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Sd,s)}function Ng(i){switch(i){case 5126:return _g;case 35664:return vg;case 35665:return xg;case 35666:return yg;case 35674:return Mg;case 35675:return bg;case 35676:return Sg;case 5124:case 35670:return Eg;case 35667:case 35671:return Ag;case 35668:case 35672:return Tg;case 35669:case 35673:return wg;case 5125:return Pg;case 36294:return Cg;case 36295:return Rg;case 36296:return Lg;case 35678:case 36198:case 36298:case 36306:case 35682:return Ig;case 35679:case 36299:case 36307:return Dg;case 35680:case 36300:case 36308:case 36293:return Fg;case 36289:case 36303:case 36311:case 36292:return Ug}}function Og(i,e){i.uniform1fv(this.addr,e)}function Bg(i,e){const t=Zi(e,this.size,2);i.uniform2fv(this.addr,t)}function Vg(i,e){const t=Zi(e,this.size,3);i.uniform3fv(this.addr,t)}function zg(i,e){const t=Zi(e,this.size,4);i.uniform4fv(this.addr,t)}function kg(i,e){const t=Zi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Hg(i,e){const t=Zi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Gg(i,e){const t=Zi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Wg(i,e){i.uniform1iv(this.addr,e)}function Xg(i,e){i.uniform2iv(this.addr,e)}function qg(i,e){i.uniform3iv(this.addr,e)}function Yg(i,e){i.uniform4iv(this.addr,e)}function $g(i,e){i.uniform1uiv(this.addr,e)}function Kg(i,e){i.uniform2uiv(this.addr,e)}function Zg(i,e){i.uniform3uiv(this.addr,e)}function jg(i,e){i.uniform4uiv(this.addr,e)}function Jg(i,e,t){const n=this.cache,s=e.length,o=Nr(t,s);St(n,o)||(i.uniform1iv(this.addr,o),Et(n,o));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||bd,o[a])}function Qg(i,e,t){const n=this.cache,s=e.length,o=Nr(t,s);St(n,o)||(i.uniform1iv(this.addr,o),Et(n,o));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Ed,o[a])}function e_(i,e,t){const n=this.cache,s=e.length,o=Nr(t,s);St(n,o)||(i.uniform1iv(this.addr,o),Et(n,o));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Ad,o[a])}function t_(i,e,t){const n=this.cache,s=e.length,o=Nr(t,s);St(n,o)||(i.uniform1iv(this.addr,o),Et(n,o));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Sd,o[a])}function n_(i){switch(i){case 5126:return Og;case 35664:return Bg;case 35665:return Vg;case 35666:return zg;case 35674:return kg;case 35675:return Hg;case 35676:return Gg;case 5124:case 35670:return Wg;case 35667:case 35671:return Xg;case 35668:case 35672:return qg;case 35669:case 35673:return Yg;case 5125:return $g;case 36294:return Kg;case 36295:return Zg;case 36296:return jg;case 35678:case 36198:case 36298:case 36306:case 35682:return Jg;case 35679:case 36299:case 36307:return Qg;case 35680:case 36300:case 36308:case 36293:return e_;case 36289:case 36303:case 36311:case 36292:return t_}}class i_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ng(t.type)}}class s_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=n_(t.type)}}class r_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let o=0,a=s.length;o!==a;++o){const l=s[o];l.setValue(e,t[l.id],n)}}}const To=/(\w+)(\])?(\[|\.)?/g;function hc(i,e){i.seq.push(e),i.map[e.id]=e}function o_(i,e,t){const n=i.name,s=n.length;for(To.lastIndex=0;;){const o=To.exec(n),a=To.lastIndex;let l=o[1];const c=o[2]==="]",d=o[3];if(c&&(l=l|0),d===void 0||d==="["&&a+2===s){hc(t,d===void 0?new i_(l,i,e):new s_(l,i,e));break}else{let f=t.map[l];f===void 0&&(f=new r_(l),hc(t,f)),t=f}}}class _r{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const o=e.getActiveUniform(t,s),a=e.getUniformLocation(t,o.name);o_(o,a,this)}}setValue(e,t,n,s){const o=this.map[t];o!==void 0&&o.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let o=0,a=t.length;o!==a;++o){const l=t[o],c=n[l.id];c.needsUpdate!==!1&&l.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,o=e.length;s!==o;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function uc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const a_=37297;let l_=0;function c_(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),o=Math.min(e+6,t.length);for(let a=s;a<o;a++){const l=a+1;n.push(`${l===e?">":" "} ${l}: ${t[a]}`)}return n.join(`
`)}const fc=new Xe;function d_(i){tt._getMatrix(fc,tt.workingColorSpace,i);const e=`mat3( ${fc.elements.map(t=>t.toFixed(4))} )`;switch(tt.getTransfer(i)){case yr:return[e,"LinearTransferOETF"];case lt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function pc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+c_(i.getShaderSource(e),a)}else return s}function h_(i,e){const t=d_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function u_(i,e){let t;switch(e){case hh:t="Linear";break;case uh:t="Reinhard";break;case fh:t="Cineon";break;case Dc:t="ACESFilmic";break;case mh:t="AgX";break;case gh:t="Neutral";break;case ph:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const rr=new A;function f_(){tt.getLuminanceCoefficients(rr);const i=rr.x.toFixed(4),e=rr.y.toFixed(4),t=rr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function p_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(cs).join(`
`)}function m_(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function g_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const o=i.getActiveAttrib(e,s),a=o.name;let l=1;o.type===i.FLOAT_MAT2&&(l=2),o.type===i.FLOAT_MAT3&&(l=3),o.type===i.FLOAT_MAT4&&(l=4),t[a]={type:o.type,location:i.getAttribLocation(e,a),locationSize:l}}return t}function cs(i){return i!==""}function mc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function gc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const __=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ta(i){return i.replace(__,x_)}const v_=new Map;function x_(i,e){let t=$e[e];if(t===void 0){const n=v_.get(e);if(n!==void 0)t=$e[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ta(t)}const y_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _c(i){return i.replace(y_,M_)}function M_(i,e,t,n){let s="";for(let o=parseInt(e);o<parseInt(t);o++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return s}function vc(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function b_(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Ic?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Wd?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Sn&&(e="SHADOWMAP_TYPE_VSM"),e}function S_(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Wi:case Xi:e="ENVMAP_TYPE_CUBE";break;case Tr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function E_(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Xi:e="ENVMAP_MODE_REFRACTION";break}return e}function A_(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ra:e="ENVMAP_BLENDING_MULTIPLY";break;case ch:e="ENVMAP_BLENDING_MIX";break;case dh:e="ENVMAP_BLENDING_ADD";break}return e}function T_(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function w_(i,e,t,n){const s=i.getContext(),o=t.defines;let a=t.vertexShader,l=t.fragmentShader;const c=b_(t),d=S_(t),u=E_(t),f=A_(t),r=T_(t),p=p_(t),v=m_(o),x=s.createProgram();let g,m,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(cs).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(cs).join(`
`),m.length>0&&(m+=`
`)):(g=[vc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(cs).join(`
`),m=[vc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",r?"#define CUBEUV_TEXEL_WIDTH "+r.texelWidth:"",r?"#define CUBEUV_TEXEL_HEIGHT "+r.texelHeight:"",r?"#define CUBEUV_MAX_MIP "+r.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Bn?"#define TONE_MAPPING":"",t.toneMapping!==Bn?$e.tonemapping_pars_fragment:"",t.toneMapping!==Bn?u_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",$e.colorspace_pars_fragment,h_("linearToOutputTexel",t.outputColorSpace),f_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(cs).join(`
`)),a=Ta(a),a=mc(a,t),a=gc(a,t),l=Ta(l),l=mc(l,t),l=gc(l,t),a=_c(a),l=_c(l),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===ul?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ul?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const b=M+g+a,y=M+m+l,I=uc(s,s.VERTEX_SHADER,b),P=uc(s,s.FRAGMENT_SHADER,y);s.attachShader(x,I),s.attachShader(x,P),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function L(F){if(i.debug.checkShaderErrors){const G=s.getProgramInfoLog(x).trim(),k=s.getShaderInfoLog(I).trim(),X=s.getShaderInfoLog(P).trim();let J=!0,Y=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(J=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,I,P);else{const oe=pc(s,I,"vertex"),$=pc(s,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+G+`
`+oe+`
`+$)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(k===""||X==="")&&(Y=!1);Y&&(F.diagnostics={runnable:J,programLog:G,vertexShader:{log:k,prefix:g},fragmentShader:{log:X,prefix:m}})}s.deleteShader(I),s.deleteShader(P),D=new _r(s,x),w=g_(s,x)}let D;this.getUniforms=function(){return D===void 0&&L(this),D};let w;this.getAttributes=function(){return w===void 0&&L(this),w};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(x,a_)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=l_++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=I,this.fragmentShader=P,this}let P_=0;class C_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),o=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(o)===!1&&(a.add(o),o.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new R_(e),t.set(e,n)),n}}class R_{constructor(e){this.id=P_++,this.code=e,this.usedTimes=0}}function L_(i,e,t,n,s,o,a){const l=new za,c=new C_,d=new Set,u=[],f=s.logarithmicDepthBuffer,r=s.vertexTextures;let p=s.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(w){return d.add(w),w===0?"uv":`uv${w}`}function g(w,S,F,G,k){const X=G.fog,J=k.geometry,Y=w.isMeshStandardMaterial?G.environment:null,oe=(w.isMeshStandardMaterial?t:e).get(w.envMap||Y),$=oe&&oe.mapping===Tr?oe.image.height:null,fe=v[w.type];w.precision!==null&&(p=s.getMaxPrecision(w.precision),p!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",p,"instead."));const ve=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,le=ve!==void 0?ve.length:0;let Ie=0;J.morphAttributes.position!==void 0&&(Ie=1),J.morphAttributes.normal!==void 0&&(Ie=2),J.morphAttributes.color!==void 0&&(Ie=3);let Oe,q,de,Pe;if(fe){const ot=un[fe];Oe=ot.vertexShader,q=ot.fragmentShader}else Oe=w.vertexShader,q=w.fragmentShader,c.update(w),de=c.getVertexShaderID(w),Pe=c.getFragmentShaderID(w);const ue=i.getRenderTarget(),De=i.state.buffers.depth.getReversed(),Je=k.isInstancedMesh===!0,Le=k.isBatchedMesh===!0,it=!!w.map,se=!!w.matcap,te=!!oe,R=!!w.aoMap,Re=!!w.lightMap,re=!!w.bumpMap,Se=!!w.normalMap,he=!!w.displacementMap,Be=!!w.emissiveMap,xe=!!w.metalnessMap,C=!!w.roughnessMap,E=w.anisotropy>0,z=w.clearcoat>0,Z=w.dispersion>0,ee=w.iridescence>0,j=w.sheen>0,Ce=w.transmission>0,me=E&&!!w.anisotropyMap,be=z&&!!w.clearcoatMap,Ze=z&&!!w.clearcoatNormalMap,ce=z&&!!w.clearcoatRoughnessMap,Ae=ee&&!!w.iridescenceMap,Ve=ee&&!!w.iridescenceThicknessMap,ze=j&&!!w.sheenColorMap,Te=j&&!!w.sheenRoughnessMap,je=!!w.specularMap,Ye=!!w.specularColorMap,dt=!!w.specularIntensityMap,U=Ce&&!!w.transmissionMap,ge=Ce&&!!w.thicknessMap,K=!!w.gradientMap,Q=!!w.alphaMap,Me=w.alphaTest>0,ye=!!w.alphaHash,We=!!w.extensions;let ft=Bn;w.toneMapped&&(ue===null||ue.isXRRenderTarget===!0)&&(ft=i.toneMapping);const Rt={shaderID:fe,shaderType:w.type,shaderName:w.name,vertexShader:Oe,fragmentShader:q,defines:w.defines,customVertexShaderID:de,customFragmentShaderID:Pe,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:p,batching:Le,batchingColor:Le&&k._colorsTexture!==null,instancing:Je,instancingColor:Je&&k.instanceColor!==null,instancingMorph:Je&&k.morphTexture!==null,supportsVertexTextures:r,outputColorSpace:ue===null?i.outputColorSpace:ue.isXRRenderTarget===!0?ue.texture.colorSpace:$i,alphaToCoverage:!!w.alphaToCoverage,map:it,matcap:se,envMap:te,envMapMode:te&&oe.mapping,envMapCubeUVHeight:$,aoMap:R,lightMap:Re,bumpMap:re,normalMap:Se,displacementMap:r&&he,emissiveMap:Be,normalMapObjectSpace:Se&&w.normalMapType===yh,normalMapTangentSpace:Se&&w.normalMapType===Oa,metalnessMap:xe,roughnessMap:C,anisotropy:E,anisotropyMap:me,clearcoat:z,clearcoatMap:be,clearcoatNormalMap:Ze,clearcoatRoughnessMap:ce,dispersion:Z,iridescence:ee,iridescenceMap:Ae,iridescenceThicknessMap:Ve,sheen:j,sheenColorMap:ze,sheenRoughnessMap:Te,specularMap:je,specularColorMap:Ye,specularIntensityMap:dt,transmission:Ce,transmissionMap:U,thicknessMap:ge,gradientMap:K,opaque:w.transparent===!1&&w.blending===Oi&&w.alphaToCoverage===!1,alphaMap:Q,alphaTest:Me,alphaHash:ye,combine:w.combine,mapUv:it&&x(w.map.channel),aoMapUv:R&&x(w.aoMap.channel),lightMapUv:Re&&x(w.lightMap.channel),bumpMapUv:re&&x(w.bumpMap.channel),normalMapUv:Se&&x(w.normalMap.channel),displacementMapUv:he&&x(w.displacementMap.channel),emissiveMapUv:Be&&x(w.emissiveMap.channel),metalnessMapUv:xe&&x(w.metalnessMap.channel),roughnessMapUv:C&&x(w.roughnessMap.channel),anisotropyMapUv:me&&x(w.anisotropyMap.channel),clearcoatMapUv:be&&x(w.clearcoatMap.channel),clearcoatNormalMapUv:Ze&&x(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ce&&x(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Ae&&x(w.iridescenceMap.channel),iridescenceThicknessMapUv:Ve&&x(w.iridescenceThicknessMap.channel),sheenColorMapUv:ze&&x(w.sheenColorMap.channel),sheenRoughnessMapUv:Te&&x(w.sheenRoughnessMap.channel),specularMapUv:je&&x(w.specularMap.channel),specularColorMapUv:Ye&&x(w.specularColorMap.channel),specularIntensityMapUv:dt&&x(w.specularIntensityMap.channel),transmissionMapUv:U&&x(w.transmissionMap.channel),thicknessMapUv:ge&&x(w.thicknessMap.channel),alphaMapUv:Q&&x(w.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(Se||E),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!J.attributes.uv&&(it||Q),fog:!!X,useFog:w.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:De,skinning:k.isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:le,morphTextureStride:Ie,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:w.dithering,shadowMapEnabled:i.shadowMap.enabled&&F.length>0,shadowMapType:i.shadowMap.type,toneMapping:ft,decodeVideoTexture:it&&w.map.isVideoTexture===!0&&tt.getTransfer(w.map.colorSpace)===lt,decodeVideoTextureEmissive:Be&&w.emissiveMap.isVideoTexture===!0&&tt.getTransfer(w.emissiveMap.colorSpace)===lt,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===an,flipSided:w.side===Ht,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:We&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(We&&w.extensions.multiDraw===!0||Le)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Rt.vertexUv1s=d.has(1),Rt.vertexUv2s=d.has(2),Rt.vertexUv3s=d.has(3),d.clear(),Rt}function m(w){const S=[];if(w.shaderID?S.push(w.shaderID):(S.push(w.customVertexShaderID),S.push(w.customFragmentShaderID)),w.defines!==void 0)for(const F in w.defines)S.push(F),S.push(w.defines[F]);return w.isRawShaderMaterial===!1&&(M(S,w),b(S,w),S.push(i.outputColorSpace)),S.push(w.customProgramCacheKey),S.join()}function M(w,S){w.push(S.precision),w.push(S.outputColorSpace),w.push(S.envMapMode),w.push(S.envMapCubeUVHeight),w.push(S.mapUv),w.push(S.alphaMapUv),w.push(S.lightMapUv),w.push(S.aoMapUv),w.push(S.bumpMapUv),w.push(S.normalMapUv),w.push(S.displacementMapUv),w.push(S.emissiveMapUv),w.push(S.metalnessMapUv),w.push(S.roughnessMapUv),w.push(S.anisotropyMapUv),w.push(S.clearcoatMapUv),w.push(S.clearcoatNormalMapUv),w.push(S.clearcoatRoughnessMapUv),w.push(S.iridescenceMapUv),w.push(S.iridescenceThicknessMapUv),w.push(S.sheenColorMapUv),w.push(S.sheenRoughnessMapUv),w.push(S.specularMapUv),w.push(S.specularColorMapUv),w.push(S.specularIntensityMapUv),w.push(S.transmissionMapUv),w.push(S.thicknessMapUv),w.push(S.combine),w.push(S.fogExp2),w.push(S.sizeAttenuation),w.push(S.morphTargetsCount),w.push(S.morphAttributeCount),w.push(S.numDirLights),w.push(S.numPointLights),w.push(S.numSpotLights),w.push(S.numSpotLightMaps),w.push(S.numHemiLights),w.push(S.numRectAreaLights),w.push(S.numDirLightShadows),w.push(S.numPointLightShadows),w.push(S.numSpotLightShadows),w.push(S.numSpotLightShadowsWithMaps),w.push(S.numLightProbes),w.push(S.shadowMapType),w.push(S.toneMapping),w.push(S.numClippingPlanes),w.push(S.numClipIntersection),w.push(S.depthPacking)}function b(w,S){l.disableAll(),S.supportsVertexTextures&&l.enable(0),S.instancing&&l.enable(1),S.instancingColor&&l.enable(2),S.instancingMorph&&l.enable(3),S.matcap&&l.enable(4),S.envMap&&l.enable(5),S.normalMapObjectSpace&&l.enable(6),S.normalMapTangentSpace&&l.enable(7),S.clearcoat&&l.enable(8),S.iridescence&&l.enable(9),S.alphaTest&&l.enable(10),S.vertexColors&&l.enable(11),S.vertexAlphas&&l.enable(12),S.vertexUv1s&&l.enable(13),S.vertexUv2s&&l.enable(14),S.vertexUv3s&&l.enable(15),S.vertexTangents&&l.enable(16),S.anisotropy&&l.enable(17),S.alphaHash&&l.enable(18),S.batching&&l.enable(19),S.dispersion&&l.enable(20),S.batchingColor&&l.enable(21),w.push(l.mask),l.disableAll(),S.fog&&l.enable(0),S.useFog&&l.enable(1),S.flatShading&&l.enable(2),S.logarithmicDepthBuffer&&l.enable(3),S.reverseDepthBuffer&&l.enable(4),S.skinning&&l.enable(5),S.morphTargets&&l.enable(6),S.morphNormals&&l.enable(7),S.morphColors&&l.enable(8),S.premultipliedAlpha&&l.enable(9),S.shadowMapEnabled&&l.enable(10),S.doubleSided&&l.enable(11),S.flipSided&&l.enable(12),S.useDepthPacking&&l.enable(13),S.dithering&&l.enable(14),S.transmission&&l.enable(15),S.sheen&&l.enable(16),S.opaque&&l.enable(17),S.pointsUvs&&l.enable(18),S.decodeVideoTexture&&l.enable(19),S.decodeVideoTextureEmissive&&l.enable(20),S.alphaToCoverage&&l.enable(21),w.push(l.mask)}function y(w){const S=v[w.type];let F;if(S){const G=un[S];F=uu.clone(G.uniforms)}else F=w.uniforms;return F}function I(w,S){let F;for(let G=0,k=u.length;G<k;G++){const X=u[G];if(X.cacheKey===S){F=X,++F.usedTimes;break}}return F===void 0&&(F=new w_(i,S,w,o),u.push(F)),F}function P(w){if(--w.usedTimes===0){const S=u.indexOf(w);u[S]=u[u.length-1],u.pop(),w.destroy()}}function L(w){c.remove(w)}function D(){c.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:y,acquireProgram:I,releaseProgram:P,releaseShaderCache:L,programs:u,dispose:D}}function I_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let l=i.get(a);return l===void 0&&(l={},i.set(a,l)),l}function n(a){i.delete(a)}function s(a,l,c){i.get(a)[l]=c}function o(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:o}}function D_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function xc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function yc(){const i=[];let e=0;const t=[],n=[],s=[];function o(){e=0,t.length=0,n.length=0,s.length=0}function a(f,r,p,v,x,g){let m=i[e];return m===void 0?(m={id:f.id,object:f,geometry:r,material:p,groupOrder:v,renderOrder:f.renderOrder,z:x,group:g},i[e]=m):(m.id=f.id,m.object=f,m.geometry=r,m.material=p,m.groupOrder=v,m.renderOrder=f.renderOrder,m.z=x,m.group=g),e++,m}function l(f,r,p,v,x,g){const m=a(f,r,p,v,x,g);p.transmission>0?n.push(m):p.transparent===!0?s.push(m):t.push(m)}function c(f,r,p,v,x,g){const m=a(f,r,p,v,x,g);p.transmission>0?n.unshift(m):p.transparent===!0?s.unshift(m):t.unshift(m)}function d(f,r){t.length>1&&t.sort(f||D_),n.length>1&&n.sort(r||xc),s.length>1&&s.sort(r||xc)}function u(){for(let f=e,r=i.length;f<r;f++){const p=i[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:o,push:l,unshift:c,finish:u,sort:d}}function F_(){let i=new WeakMap;function e(n,s){const o=i.get(n);let a;return o===void 0?(a=new yc,i.set(n,[a])):s>=o.length?(a=new yc,o.push(a)):a=o[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function U_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new A,color:new qe};break;case"SpotLight":t={position:new A,direction:new A,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new A,color:new qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new A,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":t={color:new qe,position:new A,halfWidth:new A,halfHeight:new A};break}return i[e.id]=t,t}}}function N_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let O_=0;function B_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function V_(i){const e=new U_,t=N_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)n.probe.push(new A);const s=new A,o=new at,a=new at;function l(d){let u=0,f=0,r=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let p=0,v=0,x=0,g=0,m=0,M=0,b=0,y=0,I=0,P=0,L=0;d.sort(B_);for(let w=0,S=d.length;w<S;w++){const F=d[w],G=F.color,k=F.intensity,X=F.distance,J=F.shadow&&F.shadow.map?F.shadow.map.texture:null;if(F.isAmbientLight)u+=G.r*k,f+=G.g*k,r+=G.b*k;else if(F.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(F.sh.coefficients[Y],k);L++}else if(F.isDirectionalLight){const Y=e.get(F);if(Y.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){const oe=F.shadow,$=t.get(F);$.shadowIntensity=oe.intensity,$.shadowBias=oe.bias,$.shadowNormalBias=oe.normalBias,$.shadowRadius=oe.radius,$.shadowMapSize=oe.mapSize,n.directionalShadow[p]=$,n.directionalShadowMap[p]=J,n.directionalShadowMatrix[p]=F.shadow.matrix,M++}n.directional[p]=Y,p++}else if(F.isSpotLight){const Y=e.get(F);Y.position.setFromMatrixPosition(F.matrixWorld),Y.color.copy(G).multiplyScalar(k),Y.distance=X,Y.coneCos=Math.cos(F.angle),Y.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),Y.decay=F.decay,n.spot[x]=Y;const oe=F.shadow;if(F.map&&(n.spotLightMap[I]=F.map,I++,oe.updateMatrices(F),F.castShadow&&P++),n.spotLightMatrix[x]=oe.matrix,F.castShadow){const $=t.get(F);$.shadowIntensity=oe.intensity,$.shadowBias=oe.bias,$.shadowNormalBias=oe.normalBias,$.shadowRadius=oe.radius,$.shadowMapSize=oe.mapSize,n.spotShadow[x]=$,n.spotShadowMap[x]=J,y++}x++}else if(F.isRectAreaLight){const Y=e.get(F);Y.color.copy(G).multiplyScalar(k),Y.halfWidth.set(F.width*.5,0,0),Y.halfHeight.set(0,F.height*.5,0),n.rectArea[g]=Y,g++}else if(F.isPointLight){const Y=e.get(F);if(Y.color.copy(F.color).multiplyScalar(F.intensity),Y.distance=F.distance,Y.decay=F.decay,F.castShadow){const oe=F.shadow,$=t.get(F);$.shadowIntensity=oe.intensity,$.shadowBias=oe.bias,$.shadowNormalBias=oe.normalBias,$.shadowRadius=oe.radius,$.shadowMapSize=oe.mapSize,$.shadowCameraNear=oe.camera.near,$.shadowCameraFar=oe.camera.far,n.pointShadow[v]=$,n.pointShadowMap[v]=J,n.pointShadowMatrix[v]=F.shadow.matrix,b++}n.point[v]=Y,v++}else if(F.isHemisphereLight){const Y=e.get(F);Y.skyColor.copy(F.color).multiplyScalar(k),Y.groundColor.copy(F.groundColor).multiplyScalar(k),n.hemi[m]=Y,m++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pe.LTC_FLOAT_1,n.rectAreaLTC2=pe.LTC_FLOAT_2):(n.rectAreaLTC1=pe.LTC_HALF_1,n.rectAreaLTC2=pe.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=r;const D=n.hash;(D.directionalLength!==p||D.pointLength!==v||D.spotLength!==x||D.rectAreaLength!==g||D.hemiLength!==m||D.numDirectionalShadows!==M||D.numPointShadows!==b||D.numSpotShadows!==y||D.numSpotMaps!==I||D.numLightProbes!==L)&&(n.directional.length=p,n.spot.length=x,n.rectArea.length=g,n.point.length=v,n.hemi.length=m,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=y+I-P,n.spotLightMap.length=I,n.numSpotLightShadowsWithMaps=P,n.numLightProbes=L,D.directionalLength=p,D.pointLength=v,D.spotLength=x,D.rectAreaLength=g,D.hemiLength=m,D.numDirectionalShadows=M,D.numPointShadows=b,D.numSpotShadows=y,D.numSpotMaps=I,D.numLightProbes=L,n.version=O_++)}function c(d,u){let f=0,r=0,p=0,v=0,x=0;const g=u.matrixWorldInverse;for(let m=0,M=d.length;m<M;m++){const b=d[m];if(b.isDirectionalLight){const y=n.directional[f];y.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(g),f++}else if(b.isSpotLight){const y=n.spot[p];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(g),p++}else if(b.isRectAreaLight){const y=n.rectArea[v];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(g),a.identity(),o.copy(b.matrixWorld),o.premultiply(g),a.extractRotation(o),y.halfWidth.set(b.width*.5,0,0),y.halfHeight.set(0,b.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),v++}else if(b.isPointLight){const y=n.point[r];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(g),r++}else if(b.isHemisphereLight){const y=n.hemi[x];y.direction.setFromMatrixPosition(b.matrixWorld),y.direction.transformDirection(g),x++}}}return{setup:l,setupView:c,state:n}}function Mc(i){const e=new V_(i),t=[],n=[];function s(u){d.camera=u,t.length=0,n.length=0}function o(u){t.push(u)}function a(u){n.push(u)}function l(){e.setup(t)}function c(u){e.setupView(t,u)}const d={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:d,setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function z_(i){let e=new WeakMap;function t(s,o=0){const a=e.get(s);let l;return a===void 0?(l=new Mc(i),e.set(s,[l])):o>=a.length?(l=new Mc(i),a.push(l)):l=a[o],l}function n(){e=new WeakMap}return{get:t,dispose:n}}const k_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,H_=`uniform sampler2D shadow_pass;
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
}`;function G_(i,e,t){let n=new Rr;const s=new ie,o=new ie,a=new mt,l=new cf({depthPacking:xh}),c=new df,d={},u=t.maxTextureSize,f={[wn]:Ht,[Ht]:wn,[an]:an},r=new zn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ie},radius:{value:4}},vertexShader:k_,fragmentShader:H_}),p=r.clone();p.defines.HORIZONTAL_PASS=1;const v=new _t;v.setAttribute("position",new Yt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new kt(v,r),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ic;let m=this.type;this.render=function(P,L,D){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||P.length===0)return;const w=i.getRenderTarget(),S=i.getActiveCubeFace(),F=i.getActiveMipmapLevel(),G=i.state;G.setBlending(On),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const k=m!==Sn&&this.type===Sn,X=m===Sn&&this.type!==Sn;for(let J=0,Y=P.length;J<Y;J++){const oe=P[J],$=oe.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",oe,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;s.copy($.mapSize);const fe=$.getFrameExtents();if(s.multiply(fe),o.copy($.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(o.x=Math.floor(u/fe.x),s.x=o.x*fe.x,$.mapSize.x=o.x),s.y>u&&(o.y=Math.floor(u/fe.y),s.y=o.y*fe.y,$.mapSize.y=o.y)),$.map===null||k===!0||X===!0){const le=this.type!==Sn?{minFilter:qt,magFilter:qt}:{};$.map!==null&&$.map.dispose(),$.map=new ai(s.x,s.y,le),$.map.texture.name=oe.name+".shadowMap",$.camera.updateProjectionMatrix()}i.setRenderTarget($.map),i.clear();const ve=$.getViewportCount();for(let le=0;le<ve;le++){const Ie=$.getViewport(le);a.set(o.x*Ie.x,o.y*Ie.y,o.x*Ie.z,o.y*Ie.w),G.viewport(a),$.updateMatrices(oe,le),n=$.getFrustum(),y(L,D,$.camera,oe,this.type)}$.isPointLightShadow!==!0&&this.type===Sn&&M($,D),$.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(w,S,F)};function M(P,L){const D=e.update(x);r.defines.VSM_SAMPLES!==P.blurSamples&&(r.defines.VSM_SAMPLES=P.blurSamples,p.defines.VSM_SAMPLES=P.blurSamples,r.needsUpdate=!0,p.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new ai(s.x,s.y)),r.uniforms.shadow_pass.value=P.map.texture,r.uniforms.resolution.value=P.mapSize,r.uniforms.radius.value=P.radius,i.setRenderTarget(P.mapPass),i.clear(),i.renderBufferDirect(L,null,D,r,x,null),p.uniforms.shadow_pass.value=P.mapPass.texture,p.uniforms.resolution.value=P.mapSize,p.uniforms.radius.value=P.radius,i.setRenderTarget(P.map),i.clear(),i.renderBufferDirect(L,null,D,p,x,null)}function b(P,L,D,w){let S=null;const F=D.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(F!==void 0)S=F;else if(S=D.isPointLight===!0?c:l,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0){const G=S.uuid,k=L.uuid;let X=d[G];X===void 0&&(X={},d[G]=X);let J=X[k];J===void 0&&(J=S.clone(),X[k]=J,L.addEventListener("dispose",I)),S=J}if(S.visible=L.visible,S.wireframe=L.wireframe,w===Sn?S.side=L.shadowSide!==null?L.shadowSide:L.side:S.side=L.shadowSide!==null?L.shadowSide:f[L.side],S.alphaMap=L.alphaMap,S.alphaTest=L.alphaTest,S.map=L.map,S.clipShadows=L.clipShadows,S.clippingPlanes=L.clippingPlanes,S.clipIntersection=L.clipIntersection,S.displacementMap=L.displacementMap,S.displacementScale=L.displacementScale,S.displacementBias=L.displacementBias,S.wireframeLinewidth=L.wireframeLinewidth,S.linewidth=L.linewidth,D.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const G=i.properties.get(S);G.light=D}return S}function y(P,L,D,w,S){if(P.visible===!1)return;if(P.layers.test(L.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&S===Sn)&&(!P.frustumCulled||n.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,P.matrixWorld);const k=e.update(P),X=P.material;if(Array.isArray(X)){const J=k.groups;for(let Y=0,oe=J.length;Y<oe;Y++){const $=J[Y],fe=X[$.materialIndex];if(fe&&fe.visible){const ve=b(P,fe,w,S);P.onBeforeShadow(i,P,L,D,k,ve,$),i.renderBufferDirect(D,null,k,ve,P,$),P.onAfterShadow(i,P,L,D,k,ve,$)}}}else if(X.visible){const J=b(P,X,w,S);P.onBeforeShadow(i,P,L,D,k,J,null),i.renderBufferDirect(D,null,k,J,P,null),P.onAfterShadow(i,P,L,D,k,J,null)}}const G=P.children;for(let k=0,X=G.length;k<X;k++)y(G[k],L,D,w,S)}function I(P){P.target.removeEventListener("dispose",I);for(const D in d){const w=d[D],S=P.target.uuid;S in w&&(w[S].dispose(),delete w[S])}}}const W_={[ko]:Ho,[Go]:qo,[Wo]:Yo,[Gi]:Xo,[Ho]:ko,[qo]:Go,[Yo]:Wo,[Xo]:Gi};function X_(i,e){function t(){let U=!1;const ge=new mt;let K=null;const Q=new mt(0,0,0,0);return{setMask:function(Me){K!==Me&&!U&&(i.colorMask(Me,Me,Me,Me),K=Me)},setLocked:function(Me){U=Me},setClear:function(Me,ye,We,ft,Rt){Rt===!0&&(Me*=ft,ye*=ft,We*=ft),ge.set(Me,ye,We,ft),Q.equals(ge)===!1&&(i.clearColor(Me,ye,We,ft),Q.copy(ge))},reset:function(){U=!1,K=null,Q.set(-1,0,0,0)}}}function n(){let U=!1,ge=!1,K=null,Q=null,Me=null;return{setReversed:function(ye){if(ge!==ye){const We=e.get("EXT_clip_control");ge?We.clipControlEXT(We.LOWER_LEFT_EXT,We.ZERO_TO_ONE_EXT):We.clipControlEXT(We.LOWER_LEFT_EXT,We.NEGATIVE_ONE_TO_ONE_EXT);const ft=Me;Me=null,this.setClear(ft)}ge=ye},getReversed:function(){return ge},setTest:function(ye){ye?ue(i.DEPTH_TEST):De(i.DEPTH_TEST)},setMask:function(ye){K!==ye&&!U&&(i.depthMask(ye),K=ye)},setFunc:function(ye){if(ge&&(ye=W_[ye]),Q!==ye){switch(ye){case ko:i.depthFunc(i.NEVER);break;case Ho:i.depthFunc(i.ALWAYS);break;case Go:i.depthFunc(i.LESS);break;case Gi:i.depthFunc(i.LEQUAL);break;case Wo:i.depthFunc(i.EQUAL);break;case Xo:i.depthFunc(i.GEQUAL);break;case qo:i.depthFunc(i.GREATER);break;case Yo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Q=ye}},setLocked:function(ye){U=ye},setClear:function(ye){Me!==ye&&(ge&&(ye=1-ye),i.clearDepth(ye),Me=ye)},reset:function(){U=!1,K=null,Q=null,Me=null,ge=!1}}}function s(){let U=!1,ge=null,K=null,Q=null,Me=null,ye=null,We=null,ft=null,Rt=null;return{setTest:function(ot){U||(ot?ue(i.STENCIL_TEST):De(i.STENCIL_TEST))},setMask:function(ot){ge!==ot&&!U&&(i.stencilMask(ot),ge=ot)},setFunc:function(ot,tn,_n){(K!==ot||Q!==tn||Me!==_n)&&(i.stencilFunc(ot,tn,_n),K=ot,Q=tn,Me=_n)},setOp:function(ot,tn,_n){(ye!==ot||We!==tn||ft!==_n)&&(i.stencilOp(ot,tn,_n),ye=ot,We=tn,ft=_n)},setLocked:function(ot){U=ot},setClear:function(ot){Rt!==ot&&(i.clearStencil(ot),Rt=ot)},reset:function(){U=!1,ge=null,K=null,Q=null,Me=null,ye=null,We=null,ft=null,Rt=null}}}const o=new t,a=new n,l=new s,c=new WeakMap,d=new WeakMap;let u={},f={},r=new WeakMap,p=[],v=null,x=!1,g=null,m=null,M=null,b=null,y=null,I=null,P=null,L=new qe(0,0,0),D=0,w=!1,S=null,F=null,G=null,k=null,X=null;const J=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,oe=0;const $=i.getParameter(i.VERSION);$.indexOf("WebGL")!==-1?(oe=parseFloat(/^WebGL (\d)/.exec($)[1]),Y=oe>=1):$.indexOf("OpenGL ES")!==-1&&(oe=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),Y=oe>=2);let fe=null,ve={};const le=i.getParameter(i.SCISSOR_BOX),Ie=i.getParameter(i.VIEWPORT),Oe=new mt().fromArray(le),q=new mt().fromArray(Ie);function de(U,ge,K,Q){const Me=new Uint8Array(4),ye=i.createTexture();i.bindTexture(U,ye),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let We=0;We<K;We++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(ge,0,i.RGBA,1,1,Q,0,i.RGBA,i.UNSIGNED_BYTE,Me):i.texImage2D(ge+We,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Me);return ye}const Pe={};Pe[i.TEXTURE_2D]=de(i.TEXTURE_2D,i.TEXTURE_2D,1),Pe[i.TEXTURE_CUBE_MAP]=de(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Pe[i.TEXTURE_2D_ARRAY]=de(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Pe[i.TEXTURE_3D]=de(i.TEXTURE_3D,i.TEXTURE_3D,1,1),o.setClear(0,0,0,1),a.setClear(1),l.setClear(0),ue(i.DEPTH_TEST),a.setFunc(Gi),re(!1),Se(ol),ue(i.CULL_FACE),R(On);function ue(U){u[U]!==!0&&(i.enable(U),u[U]=!0)}function De(U){u[U]!==!1&&(i.disable(U),u[U]=!1)}function Je(U,ge){return f[U]!==ge?(i.bindFramebuffer(U,ge),f[U]=ge,U===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=ge),U===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=ge),!0):!1}function Le(U,ge){let K=p,Q=!1;if(U){K=r.get(ge),K===void 0&&(K=[],r.set(ge,K));const Me=U.textures;if(K.length!==Me.length||K[0]!==i.COLOR_ATTACHMENT0){for(let ye=0,We=Me.length;ye<We;ye++)K[ye]=i.COLOR_ATTACHMENT0+ye;K.length=Me.length,Q=!0}}else K[0]!==i.BACK&&(K[0]=i.BACK,Q=!0);Q&&i.drawBuffers(K)}function it(U){return v!==U?(i.useProgram(U),v=U,!0):!1}const se={[ei]:i.FUNC_ADD,[qd]:i.FUNC_SUBTRACT,[Yd]:i.FUNC_REVERSE_SUBTRACT};se[$d]=i.MIN,se[Kd]=i.MAX;const te={[Zd]:i.ZERO,[jd]:i.ONE,[Jd]:i.SRC_COLOR,[Vo]:i.SRC_ALPHA,[sh]:i.SRC_ALPHA_SATURATE,[nh]:i.DST_COLOR,[eh]:i.DST_ALPHA,[Qd]:i.ONE_MINUS_SRC_COLOR,[zo]:i.ONE_MINUS_SRC_ALPHA,[ih]:i.ONE_MINUS_DST_COLOR,[th]:i.ONE_MINUS_DST_ALPHA,[rh]:i.CONSTANT_COLOR,[oh]:i.ONE_MINUS_CONSTANT_COLOR,[ah]:i.CONSTANT_ALPHA,[lh]:i.ONE_MINUS_CONSTANT_ALPHA};function R(U,ge,K,Q,Me,ye,We,ft,Rt,ot){if(U===On){x===!0&&(De(i.BLEND),x=!1);return}if(x===!1&&(ue(i.BLEND),x=!0),U!==Xd){if(U!==g||ot!==w){if((m!==ei||y!==ei)&&(i.blendEquation(i.FUNC_ADD),m=ei,y=ei),ot)switch(U){case Oi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case al:i.blendFunc(i.ONE,i.ONE);break;case ll:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case cl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Oi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case al:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case ll:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case cl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}M=null,b=null,I=null,P=null,L.set(0,0,0),D=0,g=U,w=ot}return}Me=Me||ge,ye=ye||K,We=We||Q,(ge!==m||Me!==y)&&(i.blendEquationSeparate(se[ge],se[Me]),m=ge,y=Me),(K!==M||Q!==b||ye!==I||We!==P)&&(i.blendFuncSeparate(te[K],te[Q],te[ye],te[We]),M=K,b=Q,I=ye,P=We),(ft.equals(L)===!1||Rt!==D)&&(i.blendColor(ft.r,ft.g,ft.b,Rt),L.copy(ft),D=Rt),g=U,w=!1}function Re(U,ge){U.side===an?De(i.CULL_FACE):ue(i.CULL_FACE);let K=U.side===Ht;ge&&(K=!K),re(K),U.blending===Oi&&U.transparent===!1?R(On):R(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),o.setMask(U.colorWrite);const Q=U.stencilWrite;l.setTest(Q),Q&&(l.setMask(U.stencilWriteMask),l.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),l.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Be(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ue(i.SAMPLE_ALPHA_TO_COVERAGE):De(i.SAMPLE_ALPHA_TO_COVERAGE)}function re(U){S!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),S=U)}function Se(U){U!==Hd?(ue(i.CULL_FACE),U!==F&&(U===ol?i.cullFace(i.BACK):U===Gd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):De(i.CULL_FACE),F=U}function he(U){U!==G&&(Y&&i.lineWidth(U),G=U)}function Be(U,ge,K){U?(ue(i.POLYGON_OFFSET_FILL),(k!==ge||X!==K)&&(i.polygonOffset(ge,K),k=ge,X=K)):De(i.POLYGON_OFFSET_FILL)}function xe(U){U?ue(i.SCISSOR_TEST):De(i.SCISSOR_TEST)}function C(U){U===void 0&&(U=i.TEXTURE0+J-1),fe!==U&&(i.activeTexture(U),fe=U)}function E(U,ge,K){K===void 0&&(fe===null?K=i.TEXTURE0+J-1:K=fe);let Q=ve[K];Q===void 0&&(Q={type:void 0,texture:void 0},ve[K]=Q),(Q.type!==U||Q.texture!==ge)&&(fe!==K&&(i.activeTexture(K),fe=K),i.bindTexture(U,ge||Pe[U]),Q.type=U,Q.texture=ge)}function z(){const U=ve[fe];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function Z(){try{i.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ee(){try{i.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function j(){try{i.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ce(){try{i.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function me(){try{i.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function be(){try{i.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ze(){try{i.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ce(){try{i.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ae(){try{i.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ve(){try{i.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ze(U){Oe.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),Oe.copy(U))}function Te(U){q.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),q.copy(U))}function je(U,ge){let K=d.get(ge);K===void 0&&(K=new WeakMap,d.set(ge,K));let Q=K.get(U);Q===void 0&&(Q=i.getUniformBlockIndex(ge,U.name),K.set(U,Q))}function Ye(U,ge){const Q=d.get(ge).get(U);c.get(ge)!==Q&&(i.uniformBlockBinding(ge,Q,U.__bindingPointIndex),c.set(ge,Q))}function dt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},fe=null,ve={},f={},r=new WeakMap,p=[],v=null,x=!1,g=null,m=null,M=null,b=null,y=null,I=null,P=null,L=new qe(0,0,0),D=0,w=!1,S=null,F=null,G=null,k=null,X=null,Oe.set(0,0,i.canvas.width,i.canvas.height),q.set(0,0,i.canvas.width,i.canvas.height),o.reset(),a.reset(),l.reset()}return{buffers:{color:o,depth:a,stencil:l},enable:ue,disable:De,bindFramebuffer:Je,drawBuffers:Le,useProgram:it,setBlending:R,setMaterial:Re,setFlipSided:re,setCullFace:Se,setLineWidth:he,setPolygonOffset:Be,setScissorTest:xe,activeTexture:C,bindTexture:E,unbindTexture:z,compressedTexImage2D:Z,compressedTexImage3D:ee,texImage2D:Ae,texImage3D:Ve,updateUBOMapping:je,uniformBlockBinding:Ye,texStorage2D:Ze,texStorage3D:ce,texSubImage2D:j,texSubImage3D:Ce,compressedTexSubImage2D:me,compressedTexSubImage3D:be,scissor:ze,viewport:Te,reset:dt}}function q_(i,e,t,n,s,o,a){const l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new ie,u=new WeakMap;let f;const r=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(C,E){return p?new OffscreenCanvas(C,E):br("canvas")}function x(C,E,z){let Z=1;const ee=xe(C);if((ee.width>z||ee.height>z)&&(Z=z/Math.max(ee.width,ee.height)),Z<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const j=Math.floor(Z*ee.width),Ce=Math.floor(Z*ee.height);f===void 0&&(f=v(j,Ce));const me=E?v(j,Ce):f;return me.width=j,me.height=Ce,me.getContext("2d").drawImage(C,0,0,j,Ce),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+j+"x"+Ce+")."),me}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),C;return C}function g(C){return C.generateMipmaps}function m(C){i.generateMipmap(C)}function M(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(C,E,z,Z,ee=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let j=E;if(E===i.RED&&(z===i.FLOAT&&(j=i.R32F),z===i.HALF_FLOAT&&(j=i.R16F),z===i.UNSIGNED_BYTE&&(j=i.R8)),E===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(j=i.R8UI),z===i.UNSIGNED_SHORT&&(j=i.R16UI),z===i.UNSIGNED_INT&&(j=i.R32UI),z===i.BYTE&&(j=i.R8I),z===i.SHORT&&(j=i.R16I),z===i.INT&&(j=i.R32I)),E===i.RG&&(z===i.FLOAT&&(j=i.RG32F),z===i.HALF_FLOAT&&(j=i.RG16F),z===i.UNSIGNED_BYTE&&(j=i.RG8)),E===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(j=i.RG8UI),z===i.UNSIGNED_SHORT&&(j=i.RG16UI),z===i.UNSIGNED_INT&&(j=i.RG32UI),z===i.BYTE&&(j=i.RG8I),z===i.SHORT&&(j=i.RG16I),z===i.INT&&(j=i.RG32I)),E===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(j=i.RGB8UI),z===i.UNSIGNED_SHORT&&(j=i.RGB16UI),z===i.UNSIGNED_INT&&(j=i.RGB32UI),z===i.BYTE&&(j=i.RGB8I),z===i.SHORT&&(j=i.RGB16I),z===i.INT&&(j=i.RGB32I)),E===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),z===i.UNSIGNED_INT&&(j=i.RGBA32UI),z===i.BYTE&&(j=i.RGBA8I),z===i.SHORT&&(j=i.RGBA16I),z===i.INT&&(j=i.RGBA32I)),E===i.RGB&&z===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),E===i.RGBA){const Ce=ee?yr:tt.getTransfer(Z);z===i.FLOAT&&(j=i.RGBA32F),z===i.HALF_FLOAT&&(j=i.RGBA16F),z===i.UNSIGNED_BYTE&&(j=Ce===lt?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function y(C,E){let z;return C?E===null||E===Vn||E===qi?z=i.DEPTH24_STENCIL8:E===Qt?z=i.DEPTH32F_STENCIL8:E===gs&&(z=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Vn||E===qi?z=i.DEPTH_COMPONENT24:E===Qt?z=i.DEPTH_COMPONENT32F:E===gs&&(z=i.DEPTH_COMPONENT16),z}function I(C,E){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==qt&&C.minFilter!==Pt?Math.log2(Math.max(E.width,E.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?E.mipmaps.length:1}function P(C){const E=C.target;E.removeEventListener("dispose",P),D(E),E.isVideoTexture&&u.delete(E)}function L(C){const E=C.target;E.removeEventListener("dispose",L),S(E)}function D(C){const E=n.get(C);if(E.__webglInit===void 0)return;const z=C.source,Z=r.get(z);if(Z){const ee=Z[E.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&w(C),Object.keys(Z).length===0&&r.delete(z)}n.remove(C)}function w(C){const E=n.get(C);i.deleteTexture(E.__webglTexture);const z=C.source,Z=r.get(z);delete Z[E.__cacheKey],a.memory.textures--}function S(C){const E=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(E.__webglFramebuffer[Z]))for(let ee=0;ee<E.__webglFramebuffer[Z].length;ee++)i.deleteFramebuffer(E.__webglFramebuffer[Z][ee]);else i.deleteFramebuffer(E.__webglFramebuffer[Z]);E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer[Z])}else{if(Array.isArray(E.__webglFramebuffer))for(let Z=0;Z<E.__webglFramebuffer.length;Z++)i.deleteFramebuffer(E.__webglFramebuffer[Z]);else i.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&i.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let Z=0;Z<E.__webglColorRenderbuffer.length;Z++)E.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(E.__webglColorRenderbuffer[Z]);E.__webglDepthRenderbuffer&&i.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const z=C.textures;for(let Z=0,ee=z.length;Z<ee;Z++){const j=n.get(z[Z]);j.__webglTexture&&(i.deleteTexture(j.__webglTexture),a.memory.textures--),n.remove(z[Z])}n.remove(C)}let F=0;function G(){F=0}function k(){const C=F;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),F+=1,C}function X(C){const E=[];return E.push(C.wrapS),E.push(C.wrapT),E.push(C.wrapR||0),E.push(C.magFilter),E.push(C.minFilter),E.push(C.anisotropy),E.push(C.internalFormat),E.push(C.format),E.push(C.type),E.push(C.generateMipmaps),E.push(C.premultiplyAlpha),E.push(C.flipY),E.push(C.unpackAlignment),E.push(C.colorSpace),E.join()}function J(C,E){const z=n.get(C);if(C.isVideoTexture&&he(C),C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){const Z=C.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(z,C,E);return}}t.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+E)}function Y(C,E){const z=n.get(C);if(C.version>0&&z.__version!==C.version){q(z,C,E);return}t.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+E)}function oe(C,E){const z=n.get(C);if(C.version>0&&z.__version!==C.version){q(z,C,E);return}t.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+E)}function $(C,E){const z=n.get(C);if(C.version>0&&z.__version!==C.version){de(z,C,E);return}t.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+E)}const fe={[oi]:i.REPEAT,[ni]:i.CLAMP_TO_EDGE,[Ko]:i.MIRRORED_REPEAT},ve={[qt]:i.NEAREST,[_h]:i.NEAREST_MIPMAP_NEAREST,[Ts]:i.NEAREST_MIPMAP_LINEAR,[Pt]:i.LINEAR,[kr]:i.LINEAR_MIPMAP_NEAREST,[Nn]:i.LINEAR_MIPMAP_LINEAR},le={[Mh]:i.NEVER,[wh]:i.ALWAYS,[bh]:i.LESS,[Wc]:i.LEQUAL,[Sh]:i.EQUAL,[Th]:i.GEQUAL,[Eh]:i.GREATER,[Ah]:i.NOTEQUAL};function Ie(C,E){if(E.type===Qt&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===Pt||E.magFilter===kr||E.magFilter===Ts||E.magFilter===Nn||E.minFilter===Pt||E.minFilter===kr||E.minFilter===Ts||E.minFilter===Nn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,fe[E.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,fe[E.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,fe[E.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,ve[E.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,ve[E.minFilter]),E.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,le[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===qt||E.minFilter!==Ts&&E.minFilter!==Nn||E.type===Qt&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");i.texParameterf(C,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function Oe(C,E){let z=!1;C.__webglInit===void 0&&(C.__webglInit=!0,E.addEventListener("dispose",P));const Z=E.source;let ee=r.get(Z);ee===void 0&&(ee={},r.set(Z,ee));const j=X(E);if(j!==C.__cacheKey){ee[j]===void 0&&(ee[j]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,z=!0),ee[j].usedTimes++;const Ce=ee[C.__cacheKey];Ce!==void 0&&(ee[C.__cacheKey].usedTimes--,Ce.usedTimes===0&&w(E)),C.__cacheKey=j,C.__webglTexture=ee[j].texture}return z}function q(C,E,z){let Z=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(Z=i.TEXTURE_3D);const ee=Oe(C,E),j=E.source;t.bindTexture(Z,C.__webglTexture,i.TEXTURE0+z);const Ce=n.get(j);if(j.version!==Ce.__version||ee===!0){t.activeTexture(i.TEXTURE0+z);const me=tt.getPrimaries(tt.workingColorSpace),be=E.colorSpace===Un?null:tt.getPrimaries(E.colorSpace),Ze=E.colorSpace===Un||me===be?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ze);let ce=x(E.image,!1,s.maxTextureSize);ce=Be(E,ce);const Ae=o.convert(E.format,E.colorSpace),Ve=o.convert(E.type);let ze=b(E.internalFormat,Ae,Ve,E.colorSpace,E.isVideoTexture);Ie(Z,E);let Te;const je=E.mipmaps,Ye=E.isVideoTexture!==!0,dt=Ce.__version===void 0||ee===!0,U=j.dataReady,ge=I(E,ce);if(E.isDepthTexture)ze=y(E.format===Yi,E.type),dt&&(Ye?t.texStorage2D(i.TEXTURE_2D,1,ze,ce.width,ce.height):t.texImage2D(i.TEXTURE_2D,0,ze,ce.width,ce.height,0,Ae,Ve,null));else if(E.isDataTexture)if(je.length>0){Ye&&dt&&t.texStorage2D(i.TEXTURE_2D,ge,ze,je[0].width,je[0].height);for(let K=0,Q=je.length;K<Q;K++)Te=je[K],Ye?U&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,Te.width,Te.height,Ae,Ve,Te.data):t.texImage2D(i.TEXTURE_2D,K,ze,Te.width,Te.height,0,Ae,Ve,Te.data);E.generateMipmaps=!1}else Ye?(dt&&t.texStorage2D(i.TEXTURE_2D,ge,ze,ce.width,ce.height),U&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ce.width,ce.height,Ae,Ve,ce.data)):t.texImage2D(i.TEXTURE_2D,0,ze,ce.width,ce.height,0,Ae,Ve,ce.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Ye&&dt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,ze,je[0].width,je[0].height,ce.depth);for(let K=0,Q=je.length;K<Q;K++)if(Te=je[K],E.format!==Ft)if(Ae!==null)if(Ye){if(U)if(E.layerUpdates.size>0){const Me=Jl(Te.width,Te.height,E.format,E.type);for(const ye of E.layerUpdates){const We=Te.data.subarray(ye*Me/Te.data.BYTES_PER_ELEMENT,(ye+1)*Me/Te.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,ye,Te.width,Te.height,1,Ae,We)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,Te.width,Te.height,ce.depth,Ae,Te.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,K,ze,Te.width,Te.height,ce.depth,0,Te.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ye?U&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,Te.width,Te.height,ce.depth,Ae,Ve,Te.data):t.texImage3D(i.TEXTURE_2D_ARRAY,K,ze,Te.width,Te.height,ce.depth,0,Ae,Ve,Te.data)}else{Ye&&dt&&t.texStorage2D(i.TEXTURE_2D,ge,ze,je[0].width,je[0].height);for(let K=0,Q=je.length;K<Q;K++)Te=je[K],E.format!==Ft?Ae!==null?Ye?U&&t.compressedTexSubImage2D(i.TEXTURE_2D,K,0,0,Te.width,Te.height,Ae,Te.data):t.compressedTexImage2D(i.TEXTURE_2D,K,ze,Te.width,Te.height,0,Te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?U&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,Te.width,Te.height,Ae,Ve,Te.data):t.texImage2D(i.TEXTURE_2D,K,ze,Te.width,Te.height,0,Ae,Ve,Te.data)}else if(E.isDataArrayTexture)if(Ye){if(dt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,ze,ce.width,ce.height,ce.depth),U)if(E.layerUpdates.size>0){const K=Jl(ce.width,ce.height,E.format,E.type);for(const Q of E.layerUpdates){const Me=ce.data.subarray(Q*K/ce.data.BYTES_PER_ELEMENT,(Q+1)*K/ce.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,ce.width,ce.height,1,Ae,Ve,Me)}E.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,Ae,Ve,ce.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ze,ce.width,ce.height,ce.depth,0,Ae,Ve,ce.data);else if(E.isData3DTexture)Ye?(dt&&t.texStorage3D(i.TEXTURE_3D,ge,ze,ce.width,ce.height,ce.depth),U&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,Ae,Ve,ce.data)):t.texImage3D(i.TEXTURE_3D,0,ze,ce.width,ce.height,ce.depth,0,Ae,Ve,ce.data);else if(E.isFramebufferTexture){if(dt)if(Ye)t.texStorage2D(i.TEXTURE_2D,ge,ze,ce.width,ce.height);else{let K=ce.width,Q=ce.height;for(let Me=0;Me<ge;Me++)t.texImage2D(i.TEXTURE_2D,Me,ze,K,Q,0,Ae,Ve,null),K>>=1,Q>>=1}}else if(je.length>0){if(Ye&&dt){const K=xe(je[0]);t.texStorage2D(i.TEXTURE_2D,ge,ze,K.width,K.height)}for(let K=0,Q=je.length;K<Q;K++)Te=je[K],Ye?U&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,Ae,Ve,Te):t.texImage2D(i.TEXTURE_2D,K,ze,Ae,Ve,Te);E.generateMipmaps=!1}else if(Ye){if(dt){const K=xe(ce);t.texStorage2D(i.TEXTURE_2D,ge,ze,K.width,K.height)}U&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ae,Ve,ce)}else t.texImage2D(i.TEXTURE_2D,0,ze,Ae,Ve,ce);g(E)&&m(Z),Ce.__version=j.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function de(C,E,z){if(E.image.length!==6)return;const Z=Oe(C,E),ee=E.source;t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+z);const j=n.get(ee);if(ee.version!==j.__version||Z===!0){t.activeTexture(i.TEXTURE0+z);const Ce=tt.getPrimaries(tt.workingColorSpace),me=E.colorSpace===Un?null:tt.getPrimaries(E.colorSpace),be=E.colorSpace===Un||Ce===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);const Ze=E.isCompressedTexture||E.image[0].isCompressedTexture,ce=E.image[0]&&E.image[0].isDataTexture,Ae=[];for(let Q=0;Q<6;Q++)!Ze&&!ce?Ae[Q]=x(E.image[Q],!0,s.maxCubemapSize):Ae[Q]=ce?E.image[Q].image:E.image[Q],Ae[Q]=Be(E,Ae[Q]);const Ve=Ae[0],ze=o.convert(E.format,E.colorSpace),Te=o.convert(E.type),je=b(E.internalFormat,ze,Te,E.colorSpace),Ye=E.isVideoTexture!==!0,dt=j.__version===void 0||Z===!0,U=ee.dataReady;let ge=I(E,Ve);Ie(i.TEXTURE_CUBE_MAP,E);let K;if(Ze){Ye&&dt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,je,Ve.width,Ve.height);for(let Q=0;Q<6;Q++){K=Ae[Q].mipmaps;for(let Me=0;Me<K.length;Me++){const ye=K[Me];E.format!==Ft?ze!==null?Ye?U&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me,0,0,ye.width,ye.height,ze,ye.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me,je,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ye?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me,0,0,ye.width,ye.height,ze,Te,ye.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me,je,ye.width,ye.height,0,ze,Te,ye.data)}}}else{if(K=E.mipmaps,Ye&&dt){K.length>0&&ge++;const Q=xe(Ae[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,je,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(ce){Ye?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Ae[Q].width,Ae[Q].height,ze,Te,Ae[Q].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,je,Ae[Q].width,Ae[Q].height,0,ze,Te,Ae[Q].data);for(let Me=0;Me<K.length;Me++){const We=K[Me].image[Q].image;Ye?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me+1,0,0,We.width,We.height,ze,Te,We.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me+1,je,We.width,We.height,0,ze,Te,We.data)}}else{Ye?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,ze,Te,Ae[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,je,ze,Te,Ae[Q]);for(let Me=0;Me<K.length;Me++){const ye=K[Me];Ye?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me+1,0,0,ze,Te,ye.image[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me+1,je,ze,Te,ye.image[Q])}}}g(E)&&m(i.TEXTURE_CUBE_MAP),j.__version=ee.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function Pe(C,E,z,Z,ee,j){const Ce=o.convert(z.format,z.colorSpace),me=o.convert(z.type),be=b(z.internalFormat,Ce,me,z.colorSpace),Ze=n.get(E),ce=n.get(z);if(ce.__renderTarget=E,!Ze.__hasExternalTextures){const Ae=Math.max(1,E.width>>j),Ve=Math.max(1,E.height>>j);ee===i.TEXTURE_3D||ee===i.TEXTURE_2D_ARRAY?t.texImage3D(ee,j,be,Ae,Ve,E.depth,0,Ce,me,null):t.texImage2D(ee,j,be,Ae,Ve,0,Ce,me,null)}t.bindFramebuffer(i.FRAMEBUFFER,C),Se(E)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,ee,ce.__webglTexture,0,re(E)):(ee===i.TEXTURE_2D||ee>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,ee,ce.__webglTexture,j),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ue(C,E,z){if(i.bindRenderbuffer(i.RENDERBUFFER,C),E.depthBuffer){const Z=E.depthTexture,ee=Z&&Z.isDepthTexture?Z.type:null,j=y(E.stencilBuffer,ee),Ce=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,me=re(E);Se(E)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,me,j,E.width,E.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,me,j,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,j,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ce,i.RENDERBUFFER,C)}else{const Z=E.textures;for(let ee=0;ee<Z.length;ee++){const j=Z[ee],Ce=o.convert(j.format,j.colorSpace),me=o.convert(j.type),be=b(j.internalFormat,Ce,me,j.colorSpace),Ze=re(E);z&&Se(E)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ze,be,E.width,E.height):Se(E)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ze,be,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,be,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function De(C,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,C),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=n.get(E.depthTexture);Z.__renderTarget=E,(!Z.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),J(E.depthTexture,0);const ee=Z.__webglTexture,j=re(E);if(E.depthTexture.format===Bi)Se(E)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0);else if(E.depthTexture.format===Yi)Se(E)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function Je(C){const E=n.get(C),z=C.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==C.depthTexture){const Z=C.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),Z){const ee=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,Z.removeEventListener("dispose",ee)};Z.addEventListener("dispose",ee),E.__depthDisposeCallback=ee}E.__boundDepthTexture=Z}if(C.depthTexture&&!E.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");De(E.__webglFramebuffer,C)}else if(z){E.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[Z]),E.__webglDepthbuffer[Z]===void 0)E.__webglDepthbuffer[Z]=i.createRenderbuffer(),ue(E.__webglDepthbuffer[Z],C,!1);else{const ee=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,j=E.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,j),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,j)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),ue(E.__webglDepthbuffer,C,!1);else{const Z=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ee=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ee),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,ee)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Le(C,E,z){const Z=n.get(C);E!==void 0&&Pe(Z.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&Je(C)}function it(C){const E=C.texture,z=n.get(C),Z=n.get(E);C.addEventListener("dispose",L);const ee=C.textures,j=C.isWebGLCubeRenderTarget===!0,Ce=ee.length>1;if(Ce||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=E.version,a.memory.textures++),j){z.__webglFramebuffer=[];for(let me=0;me<6;me++)if(E.mipmaps&&E.mipmaps.length>0){z.__webglFramebuffer[me]=[];for(let be=0;be<E.mipmaps.length;be++)z.__webglFramebuffer[me][be]=i.createFramebuffer()}else z.__webglFramebuffer[me]=i.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){z.__webglFramebuffer=[];for(let me=0;me<E.mipmaps.length;me++)z.__webglFramebuffer[me]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(Ce)for(let me=0,be=ee.length;me<be;me++){const Ze=n.get(ee[me]);Ze.__webglTexture===void 0&&(Ze.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&Se(C)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let me=0;me<ee.length;me++){const be=ee[me];z.__webglColorRenderbuffer[me]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[me]);const Ze=o.convert(be.format,be.colorSpace),ce=o.convert(be.type),Ae=b(be.internalFormat,Ze,ce,be.colorSpace,C.isXRRenderTarget===!0),Ve=re(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ve,Ae,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,z.__webglColorRenderbuffer[me])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),ue(z.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(j){t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),Ie(i.TEXTURE_CUBE_MAP,E);for(let me=0;me<6;me++)if(E.mipmaps&&E.mipmaps.length>0)for(let be=0;be<E.mipmaps.length;be++)Pe(z.__webglFramebuffer[me][be],C,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+me,be);else Pe(z.__webglFramebuffer[me],C,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0);g(E)&&m(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ce){for(let me=0,be=ee.length;me<be;me++){const Ze=ee[me],ce=n.get(Ze);t.bindTexture(i.TEXTURE_2D,ce.__webglTexture),Ie(i.TEXTURE_2D,Ze),Pe(z.__webglFramebuffer,C,Ze,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,0),g(Ze)&&m(i.TEXTURE_2D)}t.unbindTexture()}else{let me=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(me=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(me,Z.__webglTexture),Ie(me,E),E.mipmaps&&E.mipmaps.length>0)for(let be=0;be<E.mipmaps.length;be++)Pe(z.__webglFramebuffer[be],C,E,i.COLOR_ATTACHMENT0,me,be);else Pe(z.__webglFramebuffer,C,E,i.COLOR_ATTACHMENT0,me,0);g(E)&&m(me),t.unbindTexture()}C.depthBuffer&&Je(C)}function se(C){const E=C.textures;for(let z=0,Z=E.length;z<Z;z++){const ee=E[z];if(g(ee)){const j=M(C),Ce=n.get(ee).__webglTexture;t.bindTexture(j,Ce),m(j),t.unbindTexture()}}}const te=[],R=[];function Re(C){if(C.samples>0){if(Se(C)===!1){const E=C.textures,z=C.width,Z=C.height;let ee=i.COLOR_BUFFER_BIT;const j=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ce=n.get(C),me=E.length>1;if(me)for(let be=0;be<E.length;be++)t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer);for(let be=0;be<E.length;be++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(ee|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(ee|=i.STENCIL_BUFFER_BIT)),me){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ce.__webglColorRenderbuffer[be]);const Ze=n.get(E[be]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ze,0)}i.blitFramebuffer(0,0,z,Z,0,0,z,Z,ee,i.NEAREST),c===!0&&(te.length=0,R.length=0,te.push(i.COLOR_ATTACHMENT0+be),C.depthBuffer&&C.resolveDepthBuffer===!1&&(te.push(j),R.push(j),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,R)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,te))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),me)for(let be=0;be<E.length;be++){t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,Ce.__webglColorRenderbuffer[be]);const Ze=n.get(E[be]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,Ze,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const E=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}}function re(C){return Math.min(s.maxSamples,C.samples)}function Se(C){const E=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function he(C){const E=a.render.frame;u.get(C)!==E&&(u.set(C,E),C.update())}function Be(C,E){const z=C.colorSpace,Z=C.format,ee=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||z!==$i&&z!==Un&&(tt.getTransfer(z)===lt?(Z!==Ft||ee!==Pn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),E}function xe(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(d.width=C.naturalWidth||C.width,d.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(d.width=C.displayWidth,d.height=C.displayHeight):(d.width=C.width,d.height=C.height),d}this.allocateTextureUnit=k,this.resetTextureUnits=G,this.setTexture2D=J,this.setTexture2DArray=Y,this.setTexture3D=oe,this.setTextureCube=$,this.rebindTextures=Le,this.setupRenderTarget=it,this.updateRenderTargetMipmap=se,this.updateMultisampleRenderTarget=Re,this.setupDepthRenderbuffer=Je,this.setupFrameBufferTexture=Pe,this.useMultisampledRTT=Se}function Y_(i,e){function t(n,s=Un){let o;const a=tt.getTransfer(s);if(n===Pn)return i.UNSIGNED_BYTE;if(n===Ia)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Da)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Oc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Uc)return i.BYTE;if(n===Nc)return i.SHORT;if(n===gs)return i.UNSIGNED_SHORT;if(n===La)return i.INT;if(n===Vn)return i.UNSIGNED_INT;if(n===Qt)return i.FLOAT;if(n===Ms)return i.HALF_FLOAT;if(n===Bc)return i.ALPHA;if(n===Vc)return i.RGB;if(n===Ft)return i.RGBA;if(n===zc)return i.LUMINANCE;if(n===kc)return i.LUMINANCE_ALPHA;if(n===Bi)return i.DEPTH_COMPONENT;if(n===Yi)return i.DEPTH_STENCIL;if(n===Fa)return i.RED;if(n===wr)return i.RED_INTEGER;if(n===Hc)return i.RG;if(n===Ua)return i.RG_INTEGER;if(n===Na)return i.RGBA_INTEGER;if(n===hr||n===ur||n===fr||n===pr)if(a===lt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===hr)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ur)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===fr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===pr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===hr)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ur)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===fr)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===pr)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Zo||n===jo||n===Jo||n===Qo)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===Zo)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===jo)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Jo)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Qo)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ea||n===ta||n===na)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(n===ea||n===ta)return a===lt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===na)return a===lt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ia||n===sa||n===ra||n===oa||n===aa||n===la||n===ca||n===da||n===ha||n===ua||n===fa||n===pa||n===ma||n===ga)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(n===ia)return a===lt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===sa)return a===lt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ra)return a===lt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===oa)return a===lt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===aa)return a===lt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===la)return a===lt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ca)return a===lt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===da)return a===lt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ha)return a===lt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ua)return a===lt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===fa)return a===lt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===pa)return a===lt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ma)return a===lt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ga)return a===lt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===mr||n===_a||n===va)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(n===mr)return a===lt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===_a)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===va)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Gc||n===xa||n===ya||n===Ma)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(n===mr)return o.COMPRESSED_RED_RGTC1_EXT;if(n===xa)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ya)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ma)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===qi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const $_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,K_=`
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

}`;class Z_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new Ct,o=e.properties.get(s);o.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new zn({vertexShader:$_,fragmentShader:K_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new kt(new Ur(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class j_ extends hi{constructor(e,t){super();const n=this;let s=null,o=1,a=null,l="local-floor",c=1,d=null,u=null,f=null,r=null,p=null,v=null;const x=new Z_,g=t.getContextAttributes();let m=null,M=null;const b=[],y=[],I=new ie;let P=null;const L=new jt;L.viewport=new mt;const D=new jt;D.viewport=new mt;const w=[L,D],S=new mf;let F=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let de=b[q];return de===void 0&&(de=new ao,b[q]=de),de.getTargetRaySpace()},this.getControllerGrip=function(q){let de=b[q];return de===void 0&&(de=new ao,b[q]=de),de.getGripSpace()},this.getHand=function(q){let de=b[q];return de===void 0&&(de=new ao,b[q]=de),de.getHandSpace()};function k(q){const de=y.indexOf(q.inputSource);if(de===-1)return;const Pe=b[de];Pe!==void 0&&(Pe.update(q.inputSource,q.frame,d||a),Pe.dispatchEvent({type:q.type,data:q.inputSource}))}function X(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",J);for(let q=0;q<b.length;q++){const de=y[q];de!==null&&(y[q]=null,b[q].disconnect(de))}F=null,G=null,x.reset(),e.setRenderTarget(m),p=null,r=null,f=null,s=null,M=null,Oe.stop(),n.isPresenting=!1,e.setPixelRatio(P),e.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){o=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){l=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||a},this.setReferenceSpace=function(q){d=q},this.getBaseLayer=function(){return r!==null?r:p},this.getBinding=function(){return f},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",X),s.addEventListener("inputsourceschange",J),g.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(I),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let Pe=null,ue=null,De=null;g.depth&&(De=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Pe=g.stencil?Yi:Bi,ue=g.stencil?qi:Vn);const Je={colorFormat:t.RGBA8,depthFormat:De,scaleFactor:o};f=new XRWebGLBinding(s,t),r=f.createProjectionLayer(Je),s.updateRenderState({layers:[r]}),e.setPixelRatio(1),e.setSize(r.textureWidth,r.textureHeight,!1),M=new ai(r.textureWidth,r.textureHeight,{format:Ft,type:Pn,depthTexture:new ed(r.textureWidth,r.textureHeight,ue,void 0,void 0,void 0,void 0,void 0,void 0,Pe),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:r.ignoreDepthValues===!1,resolveStencilBuffer:r.ignoreDepthValues===!1})}else{const Pe={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:o};p=new XRWebGLLayer(s,t,Pe),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),M=new ai(p.framebufferWidth,p.framebufferHeight,{format:Ft,type:Pn,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),d=null,a=await s.requestReferenceSpace(l),Oe.setContext(s),Oe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function J(q){for(let de=0;de<q.removed.length;de++){const Pe=q.removed[de],ue=y.indexOf(Pe);ue>=0&&(y[ue]=null,b[ue].disconnect(Pe))}for(let de=0;de<q.added.length;de++){const Pe=q.added[de];let ue=y.indexOf(Pe);if(ue===-1){for(let Je=0;Je<b.length;Je++)if(Je>=y.length){y.push(Pe),ue=Je;break}else if(y[Je]===null){y[Je]=Pe,ue=Je;break}if(ue===-1)break}const De=b[ue];De&&De.connect(Pe)}}const Y=new A,oe=new A;function $(q,de,Pe){Y.setFromMatrixPosition(de.matrixWorld),oe.setFromMatrixPosition(Pe.matrixWorld);const ue=Y.distanceTo(oe),De=de.projectionMatrix.elements,Je=Pe.projectionMatrix.elements,Le=De[14]/(De[10]-1),it=De[14]/(De[10]+1),se=(De[9]+1)/De[5],te=(De[9]-1)/De[5],R=(De[8]-1)/De[0],Re=(Je[8]+1)/Je[0],re=Le*R,Se=Le*Re,he=ue/(-R+Re),Be=he*-R;if(de.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Be),q.translateZ(he),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),De[10]===-1)q.projectionMatrix.copy(de.projectionMatrix),q.projectionMatrixInverse.copy(de.projectionMatrixInverse);else{const xe=Le+he,C=it+he,E=re-Be,z=Se+(ue-Be),Z=se*it/C*xe,ee=te*it/C*xe;q.projectionMatrix.makePerspective(E,z,Z,ee,xe,C),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function fe(q,de){de===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(de.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let de=q.near,Pe=q.far;x.texture!==null&&(x.depthNear>0&&(de=x.depthNear),x.depthFar>0&&(Pe=x.depthFar)),S.near=D.near=L.near=de,S.far=D.far=L.far=Pe,(F!==S.near||G!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),F=S.near,G=S.far),L.layers.mask=q.layers.mask|2,D.layers.mask=q.layers.mask|4,S.layers.mask=L.layers.mask|D.layers.mask;const ue=q.parent,De=S.cameras;fe(S,ue);for(let Je=0;Je<De.length;Je++)fe(De[Je],ue);De.length===2?$(S,L,D):S.projectionMatrix.copy(L.projectionMatrix),ve(q,S,ue)};function ve(q,de,Pe){Pe===null?q.matrix.copy(de.matrixWorld):(q.matrix.copy(Pe.matrixWorld),q.matrix.invert(),q.matrix.multiply(de.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(de.projectionMatrix),q.projectionMatrixInverse.copy(de.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=_s*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(r===null&&p===null))return c},this.setFoveation=function(q){c=q,r!==null&&(r.fixedFoveation=q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=q)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(S)};let le=null;function Ie(q,de){if(u=de.getViewerPose(d||a),v=de,u!==null){const Pe=u.views;p!==null&&(e.setRenderTargetFramebuffer(M,p.framebuffer),e.setRenderTarget(M));let ue=!1;Pe.length!==S.cameras.length&&(S.cameras.length=0,ue=!0);for(let Le=0;Le<Pe.length;Le++){const it=Pe[Le];let se=null;if(p!==null)se=p.getViewport(it);else{const R=f.getViewSubImage(r,it);se=R.viewport,Le===0&&(e.setRenderTargetTextures(M,R.colorTexture,r.ignoreDepthValues?void 0:R.depthStencilTexture),e.setRenderTarget(M))}let te=w[Le];te===void 0&&(te=new jt,te.layers.enable(Le),te.viewport=new mt,w[Le]=te),te.matrix.fromArray(it.transform.matrix),te.matrix.decompose(te.position,te.quaternion,te.scale),te.projectionMatrix.fromArray(it.projectionMatrix),te.projectionMatrixInverse.copy(te.projectionMatrix).invert(),te.viewport.set(se.x,se.y,se.width,se.height),Le===0&&(S.matrix.copy(te.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),ue===!0&&S.cameras.push(te)}const De=s.enabledFeatures;if(De&&De.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&f){const Le=f.getDepthInformation(Pe[0]);Le&&Le.isValid&&Le.texture&&x.init(e,Le,s.renderState)}}for(let Pe=0;Pe<b.length;Pe++){const ue=y[Pe],De=b[Pe];ue!==null&&De!==void 0&&De.update(ue,de,d||a)}le&&le(q,de),de.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:de}),v=null}const Oe=new Md;Oe.setAnimationLoop(Ie),this.setAnimationLoop=function(q){le=q},this.dispose=function(){}}}const jn=new ln,J_=new at;function Q_(i,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Zc(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,M,b,y){m.isMeshBasicMaterial||m.isMeshLambertMaterial?o(g,m):m.isMeshToonMaterial?(o(g,m),f(g,m)):m.isMeshPhongMaterial?(o(g,m),u(g,m)):m.isMeshStandardMaterial?(o(g,m),r(g,m),m.isMeshPhysicalMaterial&&p(g,m,y)):m.isMeshMatcapMaterial?(o(g,m),v(g,m)):m.isMeshDepthMaterial?o(g,m):m.isMeshDistanceMaterial?(o(g,m),x(g,m)):m.isMeshNormalMaterial?o(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&l(g,m)):m.isPointsMaterial?c(g,m,M,b):m.isSpriteMaterial?d(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function o(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Ht&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Ht&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const M=e.get(m),b=M.envMap,y=M.envMapRotation;b&&(g.envMap.value=b,jn.copy(y),jn.x*=-1,jn.y*=-1,jn.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(jn.y*=-1,jn.z*=-1),g.envMapRotation.value.setFromMatrix4(J_.makeRotationFromEuler(jn)),g.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function l(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,M,b){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*M,g.scale.value=b*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function d(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function f(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function r(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function p(g,m,M){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ht&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function v(g,m){m.matcap&&(g.matcap.value=m.matcap)}function x(g,m){const M=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function e0(i,e,t,n){let s={},o={},a=[];const l=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,b){const y=b.program;n.uniformBlockBinding(M,y)}function d(M,b){let y=s[M.id];y===void 0&&(v(M),y=u(M),s[M.id]=y,M.addEventListener("dispose",g));const I=b.program;n.updateUBOMapping(M,I);const P=e.render.frame;o[M.id]!==P&&(r(M),o[M.id]=P)}function u(M){const b=f();M.__bindingPointIndex=b;const y=i.createBuffer(),I=M.__size,P=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,I,P),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,y),y}function f(){for(let M=0;M<l;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function r(M){const b=s[M.id],y=M.uniforms,I=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let P=0,L=y.length;P<L;P++){const D=Array.isArray(y[P])?y[P]:[y[P]];for(let w=0,S=D.length;w<S;w++){const F=D[w];if(p(F,P,w,I)===!0){const G=F.__offset,k=Array.isArray(F.value)?F.value:[F.value];let X=0;for(let J=0;J<k.length;J++){const Y=k[J],oe=x(Y);typeof Y=="number"||typeof Y=="boolean"?(F.__data[0]=Y,i.bufferSubData(i.UNIFORM_BUFFER,G+X,F.__data)):Y.isMatrix3?(F.__data[0]=Y.elements[0],F.__data[1]=Y.elements[1],F.__data[2]=Y.elements[2],F.__data[3]=0,F.__data[4]=Y.elements[3],F.__data[5]=Y.elements[4],F.__data[6]=Y.elements[5],F.__data[7]=0,F.__data[8]=Y.elements[6],F.__data[9]=Y.elements[7],F.__data[10]=Y.elements[8],F.__data[11]=0):(Y.toArray(F.__data,X),X+=oe.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,G,F.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(M,b,y,I){const P=M.value,L=b+"_"+y;if(I[L]===void 0)return typeof P=="number"||typeof P=="boolean"?I[L]=P:I[L]=P.clone(),!0;{const D=I[L];if(typeof P=="number"||typeof P=="boolean"){if(D!==P)return I[L]=P,!0}else if(D.equals(P)===!1)return D.copy(P),!0}return!1}function v(M){const b=M.uniforms;let y=0;const I=16;for(let L=0,D=b.length;L<D;L++){const w=Array.isArray(b[L])?b[L]:[b[L]];for(let S=0,F=w.length;S<F;S++){const G=w[S],k=Array.isArray(G.value)?G.value:[G.value];for(let X=0,J=k.length;X<J;X++){const Y=k[X],oe=x(Y),$=y%I,fe=$%oe.boundary,ve=$+fe;y+=fe,ve!==0&&I-ve<oe.storage&&(y+=I-ve),G.__data=new Float32Array(oe.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=y,y+=oe.storage}}}const P=y%I;return P>0&&(y+=I-P),M.__size=y,M.__cache={},this}function x(M){const b={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(b.boundary=4,b.storage=4):M.isVector2?(b.boundary=8,b.storage=8):M.isVector3||M.isColor?(b.boundary=16,b.storage=12):M.isVector4?(b.boundary=16,b.storage=16):M.isMatrix3?(b.boundary=48,b.storage=48):M.isMatrix4?(b.boundary=64,b.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),b}function g(M){const b=M.target;b.removeEventListener("dispose",g);const y=a.indexOf(b.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete o[b.id]}function m(){for(const M in s)i.deleteBuffer(s[M]);a=[],s={},o={}}return{bind:c,update:d,dispose:m}}class t0{constructor(e={}){const{canvas:t=Wh(),context:n=null,depth:s=!0,stencil:o=!1,alpha:a=!1,antialias:l=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:d=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:r=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const v=new Uint32Array(4),x=new Int32Array(4);let g=null,m=null;const M=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=wt,this.toneMapping=Bn,this.toneMappingExposure=1;const y=this;let I=!1,P=0,L=0,D=null,w=-1,S=null;const F=new mt,G=new mt;let k=null;const X=new qe(0);let J=0,Y=t.width,oe=t.height,$=1,fe=null,ve=null;const le=new mt(0,0,Y,oe),Ie=new mt(0,0,Y,oe);let Oe=!1;const q=new Rr;let de=!1,Pe=!1;this.transmissionResolutionScale=1;const ue=new at,De=new at,Je=new A,Le=new mt,it={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let se=!1;function te(){return D===null?$:1}let R=n;function Re(T,N){return t.getContext(T,N)}try{const T={alpha:!0,depth:s,stencil:o,antialias:l,premultipliedAlpha:c,preserveDrawingBuffer:d,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ca}`),t.addEventListener("webglcontextlost",Q,!1),t.addEventListener("webglcontextrestored",Me,!1),t.addEventListener("webglcontextcreationerror",ye,!1),R===null){const N="webgl2";if(R=Re(N,T),R===null)throw Re(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let re,Se,he,Be,xe,C,E,z,Z,ee,j,Ce,me,be,Ze,ce,Ae,Ve,ze,Te,je,Ye,dt,U;function ge(){re=new hg(R),re.init(),Ye=new Y_(R,re),Se=new sg(R,re,e,Ye),he=new X_(R,re),Se.reverseDepthBuffer&&r&&he.buffers.depth.setReversed(!0),Be=new pg(R),xe=new I_,C=new q_(R,re,he,xe,Se,Ye,Be),E=new og(y),z=new dg(y),Z=new yf(R),dt=new ng(R,Z),ee=new ug(R,Z,Be,dt),j=new gg(R,ee,Z,Be),ze=new mg(R,Se,C),ce=new rg(xe),Ce=new L_(y,E,z,re,Se,dt,ce),me=new Q_(y,xe),be=new F_,Ze=new z_(re),Ve=new tg(y,E,z,he,j,p,c),Ae=new G_(y,j,Se),U=new e0(R,Be,Se,he),Te=new ig(R,re,Be),je=new fg(R,re,Be),Be.programs=Ce.programs,y.capabilities=Se,y.extensions=re,y.properties=xe,y.renderLists=be,y.shadowMap=Ae,y.state=he,y.info=Be}ge();const K=new j_(y,R);this.xr=K,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const T=re.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=re.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(T){T!==void 0&&($=T,this.setSize(Y,oe,!1))},this.getSize=function(T){return T.set(Y,oe)},this.setSize=function(T,N,H=!0){if(K.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=T,oe=N,t.width=Math.floor(T*$),t.height=Math.floor(N*$),H===!0&&(t.style.width=T+"px",t.style.height=N+"px"),this.setViewport(0,0,T,N)},this.getDrawingBufferSize=function(T){return T.set(Y*$,oe*$).floor()},this.setDrawingBufferSize=function(T,N,H){Y=T,oe=N,$=H,t.width=Math.floor(T*H),t.height=Math.floor(N*H),this.setViewport(0,0,T,N)},this.getCurrentViewport=function(T){return T.copy(F)},this.getViewport=function(T){return T.copy(le)},this.setViewport=function(T,N,H,W){T.isVector4?le.set(T.x,T.y,T.z,T.w):le.set(T,N,H,W),he.viewport(F.copy(le).multiplyScalar($).round())},this.getScissor=function(T){return T.copy(Ie)},this.setScissor=function(T,N,H,W){T.isVector4?Ie.set(T.x,T.y,T.z,T.w):Ie.set(T,N,H,W),he.scissor(G.copy(Ie).multiplyScalar($).round())},this.getScissorTest=function(){return Oe},this.setScissorTest=function(T){he.setScissorTest(Oe=T)},this.setOpaqueSort=function(T){fe=T},this.setTransparentSort=function(T){ve=T},this.getClearColor=function(T){return T.copy(Ve.getClearColor())},this.setClearColor=function(){Ve.setClearColor(...arguments)},this.getClearAlpha=function(){return Ve.getClearAlpha()},this.setClearAlpha=function(){Ve.setClearAlpha(...arguments)},this.clear=function(T=!0,N=!0,H=!0){let W=0;if(T){let B=!1;if(D!==null){const ae=D.texture.format;B=ae===Na||ae===Ua||ae===wr}if(B){const ae=D.texture.type,_e=ae===Pn||ae===Vn||ae===gs||ae===qi||ae===Ia||ae===Da,Ee=Ve.getClearColor(),we=Ve.getClearAlpha(),ke=Ee.r,He=Ee.g,Fe=Ee.b;_e?(v[0]=ke,v[1]=He,v[2]=Fe,v[3]=we,R.clearBufferuiv(R.COLOR,0,v)):(x[0]=ke,x[1]=He,x[2]=Fe,x[3]=we,R.clearBufferiv(R.COLOR,0,x))}else W|=R.COLOR_BUFFER_BIT}N&&(W|=R.DEPTH_BUFFER_BIT),H&&(W|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Q,!1),t.removeEventListener("webglcontextrestored",Me,!1),t.removeEventListener("webglcontextcreationerror",ye,!1),Ve.dispose(),be.dispose(),Ze.dispose(),xe.dispose(),E.dispose(),z.dispose(),j.dispose(),dt.dispose(),U.dispose(),Ce.dispose(),K.dispose(),K.removeEventListener("sessionstart",Ya),K.removeEventListener("sessionend",$a),Hn.stop()};function Q(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function Me(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;const T=Be.autoReset,N=Ae.enabled,H=Ae.autoUpdate,W=Ae.needsUpdate,B=Ae.type;ge(),Be.autoReset=T,Ae.enabled=N,Ae.autoUpdate=H,Ae.needsUpdate=W,Ae.type=B}function ye(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function We(T){const N=T.target;N.removeEventListener("dispose",We),ft(N)}function ft(T){Rt(T),xe.remove(T)}function Rt(T){const N=xe.get(T).programs;N!==void 0&&(N.forEach(function(H){Ce.releaseProgram(H)}),T.isShaderMaterial&&Ce.releaseShaderCache(T))}this.renderBufferDirect=function(T,N,H,W,B,ae){N===null&&(N=it);const _e=B.isMesh&&B.matrixWorld.determinant()<0,Ee=Cd(T,N,H,W,B);he.setMaterial(W,_e);let we=H.index,ke=1;if(W.wireframe===!0){if(we=ee.getWireframeAttribute(H),we===void 0)return;ke=2}const He=H.drawRange,Fe=H.attributes.position;let Qe=He.start*ke,st=(He.start+He.count)*ke;ae!==null&&(Qe=Math.max(Qe,ae.start*ke),st=Math.min(st,(ae.start+ae.count)*ke)),we!==null?(Qe=Math.max(Qe,0),st=Math.min(st,we.count)):Fe!=null&&(Qe=Math.max(Qe,0),st=Math.min(st,Fe.count));const vt=st-Qe;if(vt<0||vt===1/0)return;dt.setup(B,W,Ee,H,we);let pt,nt=Te;if(we!==null&&(pt=Z.get(we),nt=je,nt.setIndex(pt)),B.isMesh)W.wireframe===!0?(he.setLineWidth(W.wireframeLinewidth*te()),nt.setMode(R.LINES)):nt.setMode(R.TRIANGLES);else if(B.isLine){let Ue=W.linewidth;Ue===void 0&&(Ue=1),he.setLineWidth(Ue*te()),B.isLineSegments?nt.setMode(R.LINES):B.isLineLoop?nt.setMode(R.LINE_LOOP):nt.setMode(R.LINE_STRIP)}else B.isPoints?nt.setMode(R.POINTS):B.isSprite&&nt.setMode(R.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)Jn("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),nt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(re.get("WEBGL_multi_draw"))nt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Ue=B._multiDrawStarts,Tt=B._multiDrawCounts,rt=B._multiDrawCount,nn=we?Z.get(we).bytesPerElement:1,fi=xe.get(W).currentProgram.getUniforms();for(let Gt=0;Gt<rt;Gt++)fi.setValue(R,"_gl_DrawID",Gt),nt.render(Ue[Gt]/nn,Tt[Gt])}else if(B.isInstancedMesh)nt.renderInstances(Qe,vt,B.count);else if(H.isInstancedBufferGeometry){const Ue=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,Tt=Math.min(H.instanceCount,Ue);nt.renderInstances(Qe,vt,Tt)}else nt.render(Qe,vt)};function ot(T,N,H){T.transparent===!0&&T.side===an&&T.forceSinglePass===!1?(T.side=Ht,T.needsUpdate=!0,As(T,N,H),T.side=wn,T.needsUpdate=!0,As(T,N,H),T.side=an):As(T,N,H)}this.compile=function(T,N,H=null){H===null&&(H=T),m=Ze.get(H),m.init(N),b.push(m),H.traverseVisible(function(B){B.isLight&&B.layers.test(N.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),T!==H&&T.traverseVisible(function(B){B.isLight&&B.layers.test(N.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),m.setupLights();const W=new Set;return T.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const ae=B.material;if(ae)if(Array.isArray(ae))for(let _e=0;_e<ae.length;_e++){const Ee=ae[_e];ot(Ee,H,B),W.add(Ee)}else ot(ae,H,B),W.add(ae)}),m=b.pop(),W},this.compileAsync=function(T,N,H=null){const W=this.compile(T,N,H);return new Promise(B=>{function ae(){if(W.forEach(function(_e){xe.get(_e).currentProgram.isReady()&&W.delete(_e)}),W.size===0){B(T);return}setTimeout(ae,10)}re.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let tn=null;function _n(T){tn&&tn(T)}function Ya(){Hn.stop()}function $a(){Hn.start()}const Hn=new Md;Hn.setAnimationLoop(_n),typeof self<"u"&&Hn.setContext(self),this.setAnimationLoop=function(T){tn=T,K.setAnimationLoop(T),T===null?Hn.stop():Hn.start()},K.addEventListener("sessionstart",Ya),K.addEventListener("sessionend",$a),this.render=function(T,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),K.enabled===!0&&K.isPresenting===!0&&(K.cameraAutoUpdate===!0&&K.updateCamera(N),N=K.getCamera()),T.isScene===!0&&T.onBeforeRender(y,T,N,D),m=Ze.get(T,b.length),m.init(N),b.push(m),De.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),q.setFromProjectionMatrix(De),Pe=this.localClippingEnabled,de=ce.init(this.clippingPlanes,Pe),g=be.get(T,M.length),g.init(),M.push(g),K.enabled===!0&&K.isPresenting===!0){const ae=y.xr.getDepthSensingMesh();ae!==null&&Or(ae,N,-1/0,y.sortObjects)}Or(T,N,0,y.sortObjects),g.finish(),y.sortObjects===!0&&g.sort(fe,ve),se=K.enabled===!1||K.isPresenting===!1||K.hasDepthSensing()===!1,se&&Ve.addToRenderList(g,T),this.info.render.frame++,de===!0&&ce.beginShadows();const H=m.state.shadowsArray;Ae.render(H,T,N),de===!0&&ce.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=g.opaque,B=g.transmissive;if(m.setupLights(),N.isArrayCamera){const ae=N.cameras;if(B.length>0)for(let _e=0,Ee=ae.length;_e<Ee;_e++){const we=ae[_e];Za(W,B,T,we)}se&&Ve.render(T);for(let _e=0,Ee=ae.length;_e<Ee;_e++){const we=ae[_e];Ka(g,T,we,we.viewport)}}else B.length>0&&Za(W,B,T,N),se&&Ve.render(T),Ka(g,T,N);D!==null&&L===0&&(C.updateMultisampleRenderTarget(D),C.updateRenderTargetMipmap(D)),T.isScene===!0&&T.onAfterRender(y,T,N),dt.resetDefaultState(),w=-1,S=null,b.pop(),b.length>0?(m=b[b.length-1],de===!0&&ce.setGlobalState(y.clippingPlanes,m.state.camera)):m=null,M.pop(),M.length>0?g=M[M.length-1]:g=null};function Or(T,N,H,W){if(T.visible===!1)return;if(T.layers.test(N.layers)){if(T.isGroup)H=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(N);else if(T.isLight)m.pushLight(T),T.castShadow&&m.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||q.intersectsSprite(T)){W&&Le.setFromMatrixPosition(T.matrixWorld).applyMatrix4(De);const _e=j.update(T),Ee=T.material;Ee.visible&&g.push(T,_e,Ee,H,Le.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||q.intersectsObject(T))){const _e=j.update(T),Ee=T.material;if(W&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Le.copy(T.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Le.copy(_e.boundingSphere.center)),Le.applyMatrix4(T.matrixWorld).applyMatrix4(De)),Array.isArray(Ee)){const we=_e.groups;for(let ke=0,He=we.length;ke<He;ke++){const Fe=we[ke],Qe=Ee[Fe.materialIndex];Qe&&Qe.visible&&g.push(T,_e,Qe,H,Le.z,Fe)}}else Ee.visible&&g.push(T,_e,Ee,H,Le.z,null)}}const ae=T.children;for(let _e=0,Ee=ae.length;_e<Ee;_e++)Or(ae[_e],N,H,W)}function Ka(T,N,H,W){const B=T.opaque,ae=T.transmissive,_e=T.transparent;m.setupLightsView(H),de===!0&&ce.setGlobalState(y.clippingPlanes,H),W&&he.viewport(F.copy(W)),B.length>0&&Es(B,N,H),ae.length>0&&Es(ae,N,H),_e.length>0&&Es(_e,N,H),he.buffers.depth.setTest(!0),he.buffers.depth.setMask(!0),he.buffers.color.setMask(!0),he.setPolygonOffset(!1)}function Za(T,N,H,W){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[W.id]===void 0&&(m.state.transmissionRenderTarget[W.id]=new ai(1,1,{generateMipmaps:!0,type:re.has("EXT_color_buffer_half_float")||re.has("EXT_color_buffer_float")?Ms:Pn,minFilter:Nn,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:tt.workingColorSpace}));const ae=m.state.transmissionRenderTarget[W.id],_e=W.viewport||F;ae.setSize(_e.z*y.transmissionResolutionScale,_e.w*y.transmissionResolutionScale);const Ee=y.getRenderTarget();y.setRenderTarget(ae),y.getClearColor(X),J=y.getClearAlpha(),J<1&&y.setClearColor(16777215,.5),y.clear(),se&&Ve.render(H);const we=y.toneMapping;y.toneMapping=Bn;const ke=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),m.setupLightsView(W),de===!0&&ce.setGlobalState(y.clippingPlanes,W),Es(T,H,W),C.updateMultisampleRenderTarget(ae),C.updateRenderTargetMipmap(ae),re.has("WEBGL_multisampled_render_to_texture")===!1){let He=!1;for(let Fe=0,Qe=N.length;Fe<Qe;Fe++){const st=N[Fe],vt=st.object,pt=st.geometry,nt=st.material,Ue=st.group;if(nt.side===an&&vt.layers.test(W.layers)){const Tt=nt.side;nt.side=Ht,nt.needsUpdate=!0,ja(vt,H,W,pt,nt,Ue),nt.side=Tt,nt.needsUpdate=!0,He=!0}}He===!0&&(C.updateMultisampleRenderTarget(ae),C.updateRenderTargetMipmap(ae))}y.setRenderTarget(Ee),y.setClearColor(X,J),ke!==void 0&&(W.viewport=ke),y.toneMapping=we}function Es(T,N,H){const W=N.isScene===!0?N.overrideMaterial:null;for(let B=0,ae=T.length;B<ae;B++){const _e=T[B],Ee=_e.object,we=_e.geometry,ke=W===null?_e.material:W,He=_e.group;Ee.layers.test(H.layers)&&ja(Ee,N,H,we,ke,He)}}function ja(T,N,H,W,B,ae){T.onBeforeRender(y,N,H,W,B,ae),T.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),B.onBeforeRender(y,N,H,W,T,ae),B.transparent===!0&&B.side===an&&B.forceSinglePass===!1?(B.side=Ht,B.needsUpdate=!0,y.renderBufferDirect(H,N,W,B,T,ae),B.side=wn,B.needsUpdate=!0,y.renderBufferDirect(H,N,W,B,T,ae),B.side=an):y.renderBufferDirect(H,N,W,B,T,ae),T.onAfterRender(y,N,H,W,B,ae)}function As(T,N,H){N.isScene!==!0&&(N=it);const W=xe.get(T),B=m.state.lights,ae=m.state.shadowsArray,_e=B.state.version,Ee=Ce.getParameters(T,B.state,ae,N,H),we=Ce.getProgramCacheKey(Ee);let ke=W.programs;W.environment=T.isMeshStandardMaterial?N.environment:null,W.fog=N.fog,W.envMap=(T.isMeshStandardMaterial?z:E).get(T.envMap||W.environment),W.envMapRotation=W.environment!==null&&T.envMap===null?N.environmentRotation:T.envMapRotation,ke===void 0&&(T.addEventListener("dispose",We),ke=new Map,W.programs=ke);let He=ke.get(we);if(He!==void 0){if(W.currentProgram===He&&W.lightsStateVersion===_e)return Qa(T,Ee),He}else Ee.uniforms=Ce.getUniforms(T),T.onBeforeCompile(Ee,y),He=Ce.acquireProgram(Ee,we),ke.set(we,He),W.uniforms=Ee.uniforms;const Fe=W.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Fe.clippingPlanes=ce.uniform),Qa(T,Ee),W.needsLights=Ld(T),W.lightsStateVersion=_e,W.needsLights&&(Fe.ambientLightColor.value=B.state.ambient,Fe.lightProbe.value=B.state.probe,Fe.directionalLights.value=B.state.directional,Fe.directionalLightShadows.value=B.state.directionalShadow,Fe.spotLights.value=B.state.spot,Fe.spotLightShadows.value=B.state.spotShadow,Fe.rectAreaLights.value=B.state.rectArea,Fe.ltc_1.value=B.state.rectAreaLTC1,Fe.ltc_2.value=B.state.rectAreaLTC2,Fe.pointLights.value=B.state.point,Fe.pointLightShadows.value=B.state.pointShadow,Fe.hemisphereLights.value=B.state.hemi,Fe.directionalShadowMap.value=B.state.directionalShadowMap,Fe.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Fe.spotShadowMap.value=B.state.spotShadowMap,Fe.spotLightMatrix.value=B.state.spotLightMatrix,Fe.spotLightMap.value=B.state.spotLightMap,Fe.pointShadowMap.value=B.state.pointShadowMap,Fe.pointShadowMatrix.value=B.state.pointShadowMatrix),W.currentProgram=He,W.uniformsList=null,He}function Ja(T){if(T.uniformsList===null){const N=T.currentProgram.getUniforms();T.uniformsList=_r.seqWithValue(N.seq,T.uniforms)}return T.uniformsList}function Qa(T,N){const H=xe.get(T);H.outputColorSpace=N.outputColorSpace,H.batching=N.batching,H.batchingColor=N.batchingColor,H.instancing=N.instancing,H.instancingColor=N.instancingColor,H.instancingMorph=N.instancingMorph,H.skinning=N.skinning,H.morphTargets=N.morphTargets,H.morphNormals=N.morphNormals,H.morphColors=N.morphColors,H.morphTargetsCount=N.morphTargetsCount,H.numClippingPlanes=N.numClippingPlanes,H.numIntersection=N.numClipIntersection,H.vertexAlphas=N.vertexAlphas,H.vertexTangents=N.vertexTangents,H.toneMapping=N.toneMapping}function Cd(T,N,H,W,B){N.isScene!==!0&&(N=it),C.resetTextureUnits();const ae=N.fog,_e=W.isMeshStandardMaterial?N.environment:null,Ee=D===null?y.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:$i,we=(W.isMeshStandardMaterial?z:E).get(W.envMap||_e),ke=W.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,He=!!H.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Fe=!!H.morphAttributes.position,Qe=!!H.morphAttributes.normal,st=!!H.morphAttributes.color;let vt=Bn;W.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(vt=y.toneMapping);const pt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,nt=pt!==void 0?pt.length:0,Ue=xe.get(W),Tt=m.state.lights;if(de===!0&&(Pe===!0||T!==S)){const Ut=T===S&&W.id===w;ce.setState(W,T,Ut)}let rt=!1;W.version===Ue.__version?(Ue.needsLights&&Ue.lightsStateVersion!==Tt.state.version||Ue.outputColorSpace!==Ee||B.isBatchedMesh&&Ue.batching===!1||!B.isBatchedMesh&&Ue.batching===!0||B.isBatchedMesh&&Ue.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Ue.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Ue.instancing===!1||!B.isInstancedMesh&&Ue.instancing===!0||B.isSkinnedMesh&&Ue.skinning===!1||!B.isSkinnedMesh&&Ue.skinning===!0||B.isInstancedMesh&&Ue.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Ue.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Ue.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Ue.instancingMorph===!1&&B.morphTexture!==null||Ue.envMap!==we||W.fog===!0&&Ue.fog!==ae||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==ce.numPlanes||Ue.numIntersection!==ce.numIntersection)||Ue.vertexAlphas!==ke||Ue.vertexTangents!==He||Ue.morphTargets!==Fe||Ue.morphNormals!==Qe||Ue.morphColors!==st||Ue.toneMapping!==vt||Ue.morphTargetsCount!==nt)&&(rt=!0):(rt=!0,Ue.__version=W.version);let nn=Ue.currentProgram;rt===!0&&(nn=As(W,N,B));let fi=!1,Gt=!1,ji=!1;const ht=nn.getUniforms(),$t=Ue.uniforms;if(he.useProgram(nn.program)&&(fi=!0,Gt=!0,ji=!0),W.id!==w&&(w=W.id,Gt=!0),fi||S!==T){he.buffers.depth.getReversed()?(ue.copy(T.projectionMatrix),qh(ue),Yh(ue),ht.setValue(R,"projectionMatrix",ue)):ht.setValue(R,"projectionMatrix",T.projectionMatrix),ht.setValue(R,"viewMatrix",T.matrixWorldInverse);const Bt=ht.map.cameraPosition;Bt!==void 0&&Bt.setValue(R,Je.setFromMatrixPosition(T.matrixWorld)),Se.logarithmicDepthBuffer&&ht.setValue(R,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&ht.setValue(R,"isOrthographic",T.isOrthographicCamera===!0),S!==T&&(S=T,Gt=!0,ji=!0)}if(B.isSkinnedMesh){ht.setOptional(R,B,"bindMatrix"),ht.setOptional(R,B,"bindMatrixInverse");const Ut=B.skeleton;Ut&&(Ut.boneTexture===null&&Ut.computeBoneTexture(),ht.setValue(R,"boneTexture",Ut.boneTexture,C))}B.isBatchedMesh&&(ht.setOptional(R,B,"batchingTexture"),ht.setValue(R,"batchingTexture",B._matricesTexture,C),ht.setOptional(R,B,"batchingIdTexture"),ht.setValue(R,"batchingIdTexture",B._indirectTexture,C),ht.setOptional(R,B,"batchingColorTexture"),B._colorsTexture!==null&&ht.setValue(R,"batchingColorTexture",B._colorsTexture,C));const Kt=H.morphAttributes;if((Kt.position!==void 0||Kt.normal!==void 0||Kt.color!==void 0)&&ze.update(B,H,nn),(Gt||Ue.receiveShadow!==B.receiveShadow)&&(Ue.receiveShadow=B.receiveShadow,ht.setValue(R,"receiveShadow",B.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&($t.envMap.value=we,$t.flipEnvMap.value=we.isCubeTexture&&we.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&N.environment!==null&&($t.envMapIntensity.value=N.environmentIntensity),Gt&&(ht.setValue(R,"toneMappingExposure",y.toneMappingExposure),Ue.needsLights&&Rd($t,ji),ae&&W.fog===!0&&me.refreshFogUniforms($t,ae),me.refreshMaterialUniforms($t,W,$,oe,m.state.transmissionRenderTarget[T.id]),_r.upload(R,Ja(Ue),$t,C)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(_r.upload(R,Ja(Ue),$t,C),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&ht.setValue(R,"center",B.center),ht.setValue(R,"modelViewMatrix",B.modelViewMatrix),ht.setValue(R,"normalMatrix",B.normalMatrix),ht.setValue(R,"modelMatrix",B.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Ut=W.uniformsGroups;for(let Bt=0,Br=Ut.length;Bt<Br;Bt++){const Gn=Ut[Bt];U.update(Gn,nn),U.bind(Gn,nn)}}return nn}function Rd(T,N){T.ambientLightColor.needsUpdate=N,T.lightProbe.needsUpdate=N,T.directionalLights.needsUpdate=N,T.directionalLightShadows.needsUpdate=N,T.pointLights.needsUpdate=N,T.pointLightShadows.needsUpdate=N,T.spotLights.needsUpdate=N,T.spotLightShadows.needsUpdate=N,T.rectAreaLights.needsUpdate=N,T.hemisphereLights.needsUpdate=N}function Ld(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(T,N,H){xe.get(T.texture).__webglTexture=N,xe.get(T.depthTexture).__webglTexture=H;const W=xe.get(T);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=H===void 0,W.__autoAllocateDepthBuffer||re.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,N){const H=xe.get(T);H.__webglFramebuffer=N,H.__useDefaultFramebuffer=N===void 0};const Id=R.createFramebuffer();this.setRenderTarget=function(T,N=0,H=0){D=T,P=N,L=H;let W=!0,B=null,ae=!1,_e=!1;if(T){const we=xe.get(T);if(we.__useDefaultFramebuffer!==void 0)he.bindFramebuffer(R.FRAMEBUFFER,null),W=!1;else if(we.__webglFramebuffer===void 0)C.setupRenderTarget(T);else if(we.__hasExternalTextures)C.rebindTextures(T,xe.get(T.texture).__webglTexture,xe.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Fe=T.depthTexture;if(we.__boundDepthTexture!==Fe){if(Fe!==null&&xe.has(Fe)&&(T.width!==Fe.image.width||T.height!==Fe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(T)}}const ke=T.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(_e=!0);const He=xe.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(He[N])?B=He[N][H]:B=He[N],ae=!0):T.samples>0&&C.useMultisampledRTT(T)===!1?B=xe.get(T).__webglMultisampledFramebuffer:Array.isArray(He)?B=He[H]:B=He,F.copy(T.viewport),G.copy(T.scissor),k=T.scissorTest}else F.copy(le).multiplyScalar($).floor(),G.copy(Ie).multiplyScalar($).floor(),k=Oe;if(H!==0&&(B=Id),he.bindFramebuffer(R.FRAMEBUFFER,B)&&W&&he.drawBuffers(T,B),he.viewport(F),he.scissor(G),he.setScissorTest(k),ae){const we=xe.get(T.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+N,we.__webglTexture,H)}else if(_e){const we=xe.get(T.texture),ke=N;R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,we.__webglTexture,H,ke)}else if(T!==null&&H!==0){const we=xe.get(T.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,we.__webglTexture,H)}w=-1},this.readRenderTargetPixels=function(T,N,H,W,B,ae,_e){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ee=xe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&_e!==void 0&&(Ee=Ee[_e]),Ee){he.bindFramebuffer(R.FRAMEBUFFER,Ee);try{const we=T.texture,ke=we.format,He=we.type;if(!Se.textureFormatReadable(ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Se.textureTypeReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=T.width-W&&H>=0&&H<=T.height-B&&R.readPixels(N,H,W,B,Ye.convert(ke),Ye.convert(He),ae)}finally{const we=D!==null?xe.get(D).__webglFramebuffer:null;he.bindFramebuffer(R.FRAMEBUFFER,we)}}},this.readRenderTargetPixelsAsync=async function(T,N,H,W,B,ae,_e){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ee=xe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&_e!==void 0&&(Ee=Ee[_e]),Ee){const we=T.texture,ke=we.format,He=we.type;if(!Se.textureFormatReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Se.textureTypeReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=T.width-W&&H>=0&&H<=T.height-B){he.bindFramebuffer(R.FRAMEBUFFER,Ee);const Fe=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,Fe),R.bufferData(R.PIXEL_PACK_BUFFER,ae.byteLength,R.STREAM_READ),R.readPixels(N,H,W,B,Ye.convert(ke),Ye.convert(He),0);const Qe=D!==null?xe.get(D).__webglFramebuffer:null;he.bindFramebuffer(R.FRAMEBUFFER,Qe);const st=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await Xh(R,st,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,Fe),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,ae),R.deleteBuffer(Fe),R.deleteSync(st),ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,N=null,H=0){T.isTexture!==!0&&(Jn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,T=arguments[1]);const W=Math.pow(2,-H),B=Math.floor(T.image.width*W),ae=Math.floor(T.image.height*W),_e=N!==null?N.x:0,Ee=N!==null?N.y:0;C.setTexture2D(T,0),R.copyTexSubImage2D(R.TEXTURE_2D,H,0,0,_e,Ee,B,ae),he.unbindTexture()};const Dd=R.createFramebuffer(),Fd=R.createFramebuffer();this.copyTextureToTexture=function(T,N,H=null,W=null,B=0,ae=null){T.isTexture!==!0&&(Jn("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,T=arguments[1],N=arguments[2],ae=arguments[3]||0,H=null),ae===null&&(B!==0?(Jn("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ae=B,B=0):ae=0);let _e,Ee,we,ke,He,Fe,Qe,st,vt;const pt=T.isCompressedTexture?T.mipmaps[ae]:T.image;if(H!==null)_e=H.max.x-H.min.x,Ee=H.max.y-H.min.y,we=H.isBox3?H.max.z-H.min.z:1,ke=H.min.x,He=H.min.y,Fe=H.isBox3?H.min.z:0;else{const Kt=Math.pow(2,-B);_e=Math.floor(pt.width*Kt),Ee=Math.floor(pt.height*Kt),T.isDataArrayTexture?we=pt.depth:T.isData3DTexture?we=Math.floor(pt.depth*Kt):we=1,ke=0,He=0,Fe=0}W!==null?(Qe=W.x,st=W.y,vt=W.z):(Qe=0,st=0,vt=0);const nt=Ye.convert(N.format),Ue=Ye.convert(N.type);let Tt;N.isData3DTexture?(C.setTexture3D(N,0),Tt=R.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(C.setTexture2DArray(N,0),Tt=R.TEXTURE_2D_ARRAY):(C.setTexture2D(N,0),Tt=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,N.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,N.unpackAlignment);const rt=R.getParameter(R.UNPACK_ROW_LENGTH),nn=R.getParameter(R.UNPACK_IMAGE_HEIGHT),fi=R.getParameter(R.UNPACK_SKIP_PIXELS),Gt=R.getParameter(R.UNPACK_SKIP_ROWS),ji=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,pt.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,pt.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,ke),R.pixelStorei(R.UNPACK_SKIP_ROWS,He),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Fe);const ht=T.isDataArrayTexture||T.isData3DTexture,$t=N.isDataArrayTexture||N.isData3DTexture;if(T.isDepthTexture){const Kt=xe.get(T),Ut=xe.get(N),Bt=xe.get(Kt.__renderTarget),Br=xe.get(Ut.__renderTarget);he.bindFramebuffer(R.READ_FRAMEBUFFER,Bt.__webglFramebuffer),he.bindFramebuffer(R.DRAW_FRAMEBUFFER,Br.__webglFramebuffer);for(let Gn=0;Gn<we;Gn++)ht&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,xe.get(T).__webglTexture,B,Fe+Gn),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,xe.get(N).__webglTexture,ae,vt+Gn)),R.blitFramebuffer(ke,He,_e,Ee,Qe,st,_e,Ee,R.DEPTH_BUFFER_BIT,R.NEAREST);he.bindFramebuffer(R.READ_FRAMEBUFFER,null),he.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(B!==0||T.isRenderTargetTexture||xe.has(T)){const Kt=xe.get(T),Ut=xe.get(N);he.bindFramebuffer(R.READ_FRAMEBUFFER,Dd),he.bindFramebuffer(R.DRAW_FRAMEBUFFER,Fd);for(let Bt=0;Bt<we;Bt++)ht?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Kt.__webglTexture,B,Fe+Bt):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Kt.__webglTexture,B),$t?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Ut.__webglTexture,ae,vt+Bt):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Ut.__webglTexture,ae),B!==0?R.blitFramebuffer(ke,He,_e,Ee,Qe,st,_e,Ee,R.COLOR_BUFFER_BIT,R.NEAREST):$t?R.copyTexSubImage3D(Tt,ae,Qe,st,vt+Bt,ke,He,_e,Ee):R.copyTexSubImage2D(Tt,ae,Qe,st,ke,He,_e,Ee);he.bindFramebuffer(R.READ_FRAMEBUFFER,null),he.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else $t?T.isDataTexture||T.isData3DTexture?R.texSubImage3D(Tt,ae,Qe,st,vt,_e,Ee,we,nt,Ue,pt.data):N.isCompressedArrayTexture?R.compressedTexSubImage3D(Tt,ae,Qe,st,vt,_e,Ee,we,nt,pt.data):R.texSubImage3D(Tt,ae,Qe,st,vt,_e,Ee,we,nt,Ue,pt):T.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,ae,Qe,st,_e,Ee,nt,Ue,pt.data):T.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,ae,Qe,st,pt.width,pt.height,nt,pt.data):R.texSubImage2D(R.TEXTURE_2D,ae,Qe,st,_e,Ee,nt,Ue,pt);R.pixelStorei(R.UNPACK_ROW_LENGTH,rt),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,nn),R.pixelStorei(R.UNPACK_SKIP_PIXELS,fi),R.pixelStorei(R.UNPACK_SKIP_ROWS,Gt),R.pixelStorei(R.UNPACK_SKIP_IMAGES,ji),ae===0&&N.generateMipmaps&&R.generateMipmap(Tt),he.unbindTexture()},this.copyTextureToTexture3D=function(T,N,H=null,W=null,B=0){return T.isTexture!==!0&&(Jn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),H=arguments[0]||null,W=arguments[1]||null,T=arguments[2],N=arguments[3],B=arguments[4]||0),Jn('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,N,H,W,B)},this.initRenderTarget=function(T){xe.get(T).__webglFramebuffer===void 0&&C.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?C.setTextureCube(T,0):T.isData3DTexture?C.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?C.setTexture2DArray(T,0):C.setTexture2D(T,0),he.unbindTexture()},this.resetState=function(){P=0,L=0,D=null,he.reset(),dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return An}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=tt._getUnpackColorSpace()}}const bc={type:"change"},Wa={type:"start"},Td={type:"end"},or=new Pr,Sc=new En,n0=Math.cos(70*gr.DEG2RAD),Mt=new A,zt=2*Math.PI,ct={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},wo=1e-6;class i0 extends vf{constructor(e,t=null){super(e,t),this.state=ct.NONE,this.enabled=!0,this.target=new A,this.cursor=new A,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ni.ROTATE,MIDDLE:Ni.DOLLY,RIGHT:Ni.PAN},this.touches={ONE:Di.ROTATE,TWO:Di.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new A,this._lastQuaternion=new li,this._lastTargetPosition=new A,this._quat=new li().setFromUnitVectors(e.up,new A(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Zl,this._sphericalDelta=new Zl,this._scale=1,this._panOffset=new A,this._rotateStart=new ie,this._rotateEnd=new ie,this._rotateDelta=new ie,this._panStart=new ie,this._panEnd=new ie,this._panDelta=new ie,this._dollyStart=new ie,this._dollyEnd=new ie,this._dollyDelta=new ie,this._dollyDirection=new A,this._mouse=new ie,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=r0.bind(this),this._onPointerDown=s0.bind(this),this._onPointerUp=o0.bind(this),this._onContextMenu=f0.bind(this),this._onMouseWheel=c0.bind(this),this._onKeyDown=d0.bind(this),this._onTouchStart=h0.bind(this),this._onTouchMove=u0.bind(this),this._onMouseDown=a0.bind(this),this._onMouseMove=l0.bind(this),this._interceptControlDown=p0.bind(this),this._interceptControlUp=m0.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(bc),this.update(),this.state=ct.NONE}update(e=null){const t=this.object.position;Mt.copy(t).sub(this.target),Mt.applyQuaternion(this._quat),this._spherical.setFromVector3(Mt),this.autoRotate&&this.state===ct.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=zt:n>Math.PI&&(n-=zt),s<-Math.PI?s+=zt:s>Math.PI&&(s-=zt),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let o=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),o=a!=this._spherical.radius}if(Mt.setFromSpherical(this._spherical),Mt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Mt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const l=Mt.length();a=this._clampDistance(l*this._scale);const c=l-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),o=!!c}else if(this.object.isOrthographicCamera){const l=new A(this._mouse.x,this._mouse.y,0);l.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),o=c!==this.object.zoom;const d=new A(this._mouse.x,this._mouse.y,0);d.unproject(this.object),this.object.position.sub(d).add(l),this.object.updateMatrixWorld(),a=Mt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(or.origin.copy(this.object.position),or.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(or.direction))<n0?this.object.lookAt(this.target):(Sc.setFromNormalAndCoplanarPoint(this.object.up,this.target),or.intersectPlane(Sc,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),o=!0)}return this._scale=1,this._performCursorZoom=!1,o||this._lastPosition.distanceToSquared(this.object.position)>wo||8*(1-this._lastQuaternion.dot(this.object.quaternion))>wo||this._lastTargetPosition.distanceToSquared(this.target)>wo?(this.dispatchEvent(bc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?zt/60*this.autoRotateSpeed*e:zt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Mt.setFromMatrixColumn(t,0),Mt.multiplyScalar(-e),this._panOffset.add(Mt)}_panUp(e,t){this.screenSpacePanning===!0?Mt.setFromMatrixColumn(t,1):(Mt.setFromMatrixColumn(t,0),Mt.crossVectors(this.object.up,Mt)),Mt.multiplyScalar(e),this._panOffset.add(Mt)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Mt.copy(s).sub(this.target);let o=Mt.length();o*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*o/n.clientHeight,this.object.matrix),this._panUp(2*t*o/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,o=t-n.top,a=n.width,l=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(o/l)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(zt*this._rotateDelta.x/t.clientHeight),this._rotateUp(zt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(zt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-zt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(zt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-zt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,o=Math.sqrt(n*n+s*s);this._dollyStart.set(0,o)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),o=.5*(e.pageY+n.y);this._rotateEnd.set(s,o)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(zt*this._rotateDelta.x/t.clientHeight),this._rotateUp(zt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,o=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,o),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,l=(e.pageY+t.y)*.5;this._updateZoomParameters(a,l)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new ie,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function s0(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function r0(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function o0(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Td),this.state=ct.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function a0(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ni.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ct.DOLLY;break;case Ni.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ct.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ct.ROTATE}break;case Ni.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ct.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ct.PAN}break;default:this.state=ct.NONE}this.state!==ct.NONE&&this.dispatchEvent(Wa)}function l0(i){switch(this.state){case ct.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ct.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ct.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function c0(i){this.enabled===!1||this.enableZoom===!1||this.state!==ct.NONE||(i.preventDefault(),this.dispatchEvent(Wa),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Td))}function d0(i){this.enabled!==!1&&this._handleKeyDown(i)}function h0(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Di.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ct.TOUCH_ROTATE;break;case Di.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ct.TOUCH_PAN;break;default:this.state=ct.NONE}break;case 2:switch(this.touches.TWO){case Di.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ct.TOUCH_DOLLY_PAN;break;case Di.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ct.TOUCH_DOLLY_ROTATE;break;default:this.state=ct.NONE}break;default:this.state=ct.NONE}this.state!==ct.NONE&&this.dispatchEvent(Wa)}function u0(i){switch(this._trackPointer(i),this.state){case ct.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ct.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ct.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ct.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ct.NONE}}function f0(i){this.enabled!==!1&&i.preventDefault()}function p0(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function m0(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function g0(){if(typeof window>"u"||typeof navigator>"u")return{isMobile:!1,maxPixelRatio:2,antialias:!0,textureScale:1,maxAnisotropy:4,curveScale:1,edgeThresholdBoost:0,simplifyPhysicalShaders:!1,lightRigMode:"full"};const e=new URLSearchParams(window.location.search).get("gpu"),t=navigator.userAgent||"",n=!!window.Capacitor,s=/Android|iPhone|iPad|iPod|Mobile|wv\)|POCO|Xiaomi|MIUI|HyperOS/i.test(t),o=(navigator.maxTouchPoints??0)>0&&Math.min(window.screen.width,window.screen.height)<=1024;return(e==="mobile"?!0:e==="desktop"?!1:n||s||o)?{isMobile:!0,maxPixelRatio:1.5,antialias:!1,textureScale:.55,maxAnisotropy:2,curveScale:.62,edgeThresholdBoost:6,simplifyPhysicalShaders:!0,lightRigMode:"mobile"}:{isMobile:!1,maxPixelRatio:2,antialias:!0,textureScale:1,maxAnisotropy:4,curveScale:1,edgeThresholdBoost:0,simplifyPhysicalShaders:!1,lightRigMode:"full"}}const ii=g0();ii.isMobile;function Y0(i,e=6){return ii.curveScale>=.999?i:Math.max(e,Math.round(i*ii.curveScale))}const Ec=new Map;function yt(i,e){return async()=>{const t=Ec.get(i);if(t)return t;const s=(await e()).default,o={unitId:s.unitId,version:s.version,nameJa:s.nameJa,nameEn:s.nameEn,declaredPartCount:s.declaredPartCount,maxDrawCallsBudget:s.maxDrawCallsBudget,budgetRationale:s.budgetRationale,parts:s.parts};return Ec.set(i,o),o}}const Xa=Object.freeze({mishoe:{unitId:"mishoe",declaredPartCount:32,loadMeta:yt("mishoe",()=>ne(()=>import("./mi_shoe-CaQBxxP9.js"),[],import.meta.url)),load:async()=>(await ne(async()=>{const{createMiShoeUnit:i}=await import("./mi_shoe-D8lfwIbm.js");return{createMiShoeUnit:i}},__vite__mapDeps([0,1,2]),import.meta.url)).createMiShoeUnit()},battery:{unitId:"battery",declaredPartCount:130,loadMeta:yt("battery",()=>ne(()=>import("./battery-Cw3gePVg.js"),[],import.meta.url)),load:async()=>(await ne(async()=>{const{createBatteryUnit:i}=await import("./battery-CtjPEkcu.js");return{createBatteryUnit:i}},__vite__mapDeps([3,4,1,5,6]),import.meta.url)).createBatteryUnit()},cfexpress:{unitId:"cfexpress",declaredPartCount:170,loadMeta:yt("cfexpress",()=>ne(()=>import("./cfexpress-DY8cI-Wc.js"),[],import.meta.url)),load:async()=>(await ne(async()=>{const{createCfexpressUnit:i}=await import("./cfexpress-DZFIh5S2.js");return{createCfexpressUnit:i}},__vite__mapDeps([7,8,1,5,6]),import.meta.url)).createCfexpressUnit()},mic:{unitId:"mic",declaredPartCount:150,loadMeta:yt("mic",()=>ne(()=>import("./mic-CwD_McdS.js"),[],import.meta.url)),load:async()=>(await ne(async()=>{const{createMicUnit:i}=await import("./mic-DkTFkQQ2.js");return{createMicUnit:i}},__vite__mapDeps([9,10,1,5,6]),import.meta.url)).createMicUnit()},drybox:{unitId:"drybox",declaredPartCount:150,loadMeta:yt("drybox",()=>ne(()=>import("./drybox-00mboV4n.js"),[],import.meta.url)),load:async()=>(await ne(async()=>{const{createDryboxUnit:i}=await import("./drybox-CEi5QTbL.js");return{createDryboxUnit:i}},__vite__mapDeps([11,12,1,6]),import.meta.url)).createDryboxUnit()},mount:{unitId:"mount",declaredPartCount:100,loadMeta:yt("mount",()=>ne(()=>import("./mount-D5exe6iE.js"),[],import.meta.url)),load:async()=>(await ne(async()=>{const{createMountUnit:i}=await import("./mount-CWFverov.js");return{createMountUnit:i}},__vite__mapDeps([13,14,15,1,6]),import.meta.url)).createMountUnit()},shutter:{unitId:"shutter",declaredPartCount:180,loadMeta:yt("shutter",()=>ne(()=>import("./shutter-DRF49fuH.js"),[],import.meta.url)),load:async()=>(await ne(async()=>{const{createShutterUnit:i}=await import("./shutter-Bd9Xzu_U.js");return{createShutterUnit:i}},__vite__mapDeps([16,17,18,1,6]),import.meta.url)).createShutterUnit()},body:{unitId:"body",declaredPartCount:116,loadMeta:yt("body",()=>ne(()=>import("./body-DYuOmmPC.js"),[],import.meta.url)),load:async()=>(await ne(async()=>{const{createBodyUnit:i}=await import("./body-EKgUGVNB.js");return{createBodyUnit:i}},__vite__mapDeps([19,20,21,1,22,5,23,6]),import.meta.url)).createBodyUnit()},evf:{unitId:"evf",declaredPartCount:55,loadMeta:yt("evf",()=>ne(()=>import("./evf-yJM6r-pP.js"),[],import.meta.url)),load:async()=>(await ne(async()=>{const{createEvfUnit:i}=await import("./evf-CdoI4asA.js");return{createEvfUnit:i}},__vite__mapDeps([24,25,23,1,5,26,6]),import.meta.url)).createEvfUnit()},lcd:{unitId:"lcd",declaredPartCount:150,loadMeta:yt("lcd",()=>ne(()=>import("./lcd-C5DFy3jF.js"),[],import.meta.url)),load:async()=>(await ne(async()=>{const{createLcdUnit:i}=await import("./lcd-TgWK2v80.js");return{createLcdUnit:i}},__vite__mapDeps([27,28,22,1,5,29,6]),import.meta.url)).createLcdUnit()},lens:{unitId:"lens",declaredPartCount:128,loadMeta:yt("lens",()=>ne(()=>import("./lens-DbGM9PCN.js"),[],import.meta.url)),load:async()=>(await ne(async()=>{const{createLensUnit:i}=await import("./lens-qhYQIUyU.js");return{createLensUnit:i}},__vite__mapDeps([30,31,32,1,6]),import.meta.url)).createLensUnit()},mainboard:{unitId:"mainboard",declaredPartCount:60,loadMeta:yt("mainboard",()=>ne(()=>import("./mainboard-kTn1WrHF.js"),[],import.meta.url)),load:async()=>(await ne(async()=>{const{createMainboardUnit:i}=await import("./mainboard-C0imbV51.js");return{createMainboardUnit:i}},__vite__mapDeps([33,34,35,1,6]),import.meta.url)).createMainboardUnit()},bionz:{unitId:"bionz",declaredPartCount:70,loadMeta:yt("bionz",()=>ne(()=>import("./bionz-CtB3oT0v.js"),[],import.meta.url)),load:async()=>(await ne(async()=>{const{createBionzUnit:i}=await import("./bionz-CENVHs59.js");return{createBionzUnit:i}},__vite__mapDeps([36,37,1,5,6]),import.meta.url)).createBionzUnit()},bionz_v2:{unitId:"bionz_v2",declaredPartCount:55,loadMeta:yt("bionz_v2",()=>ne(()=>import("./bionz_v2-BTlxc95w.js"),[],import.meta.url)),load:async()=>(await ne(async()=>{const{createBionzV2Unit:i}=await import("./bionz_v2-DkfmvA_r.js");return{createBionzV2Unit:i}},__vite__mapDeps([38,39,1,5,6]),import.meta.url)).createBionzV2Unit()},sensor:{unitId:"sensor",declaredPartCount:90,loadMeta:yt("sensor",()=>ne(()=>import("./sensor-CoYD7fba.js"),[],import.meta.url)),load:async()=>(await ne(async()=>{const{createSensorUnit:i}=await import("./sensor-DrPaKD-9.js");return{createSensorUnit:i}},__vite__mapDeps([40,41,42,1,5,43,6]),import.meta.url)).createSensorUnit()},micro:{unitId:"micro",declaredPartCount:75,loadMeta:yt("micro",()=>ne(()=>import("./micro-cCBBsnJi.js"),[],import.meta.url)),load:async()=>(await ne(async()=>{const{createMicroUnit:i}=await import("./micro-p9jauCDq.js");return{createMicroUnit:i}},__vite__mapDeps([44,45,1,46,5,43,6]),import.meta.url)).createMicroUnit()},micro_v2:{unitId:"micro_v2",declaredPartCount:55,loadMeta:yt("micro_v2",()=>ne(()=>import("./micro_v2-Be62c30w.js"),[],import.meta.url)),load:async()=>(await ne(async()=>{const{createMicroV2Unit:i}=await import("./micro_v2-DxC-_Caq.js");return{createMicroV2Unit:i}},__vite__mapDeps([47,48,1,5,6]),import.meta.url)).createMicroV2Unit()},sensor_fab:{unitId:"sensor_fab",declaredPartCount:235,loadMeta:yt("sensor_fab",()=>ne(()=>import("./sensor_fab-Cu3xZEwo.js"),[],import.meta.url)),load:async()=>(await ne(async()=>{const{createSensorFabUnit:i}=await import("./sensor_fab-6UONq0ss.js");return{createSensorFabUnit:i}},__vite__mapDeps([49,50,1,5,6]),import.meta.url)).createSensorFabUnit()},integrated:{unitId:"integrated",declaredPartCount:305,loadMeta:yt("integrated",()=>ne(()=>import("./integrated-_M_HiRFo.js"),[],import.meta.url)),load:async()=>(await ne(async()=>{const{createIntegratedUnit:i}=await import("./integrated-B_McZ71R.js");return{createIntegratedUnit:i}},__vite__mapDeps([51,52,6,1,53,32,15,21,22,5,23,26,18,42,43,35,29]),import.meta.url)).createIntegratedUnit()},camera_body:{unitId:"camera_body",declaredPartCount:231,loadMeta:yt("camera_body",()=>ne(()=>import("./camera_body-CnaAZIgr.js"),[],import.meta.url)),load:async()=>(await ne(async()=>{const{createCameraBodyUnit:i}=await import("./camera_body-B1YrxKCd.js");return{createCameraBodyUnit:i}},__vite__mapDeps([54,55,6,1,53,32,15,21,22,5,23,26,18,42,43,35,29]),import.meta.url)).createCameraBodyUnit()}});function _0(i){return Object.prototype.hasOwnProperty.call(Xa,i)}function v0(){return Object.values(Xa)}async function x0(i){const e=Xa[i];if(!e)throw new Error(`Unit '${i}' is not registered in V2 registry.`);return e.load()}const Ac=["map","bumpMap","normalMap","roughnessMap","metalnessMap","emissiveMap","alphaMap","aoMap","envMap","clearcoatMap","clearcoatRoughnessMap","clearcoatNormalMap","iridescenceMap"];function Ci(i,e,t,n,s){const o=i.userData?.__cacheKey;if(e&&o&&e.hasMaterial(o)){e.releaseMaterial(o),t.releasedCachedMaterials++;return}if(n.has(i))return;n.add(i);const a=i;for(let l=0;l<Ac.length;l++){const c=a[Ac[l]];if(c instanceof Ct&&!s.has(c)){const d=c.userData?.__cacheKey;e&&d?e.releaseTexture(d):(c.dispose(),t.disposedUniqueTextures++),s.add(c)}}i.dispose(),t.disposedUniqueMaterials++}function Tc(i,e,t,n){const s=i.userData?.__cacheKey;if(e&&s&&e.hasGeometry(s)){e.releaseGeometry(s),t.releasedCachedGeometries++;return}n.has(i)||(n.add(i),i.dispose(),t.disposedUniqueGeometries++)}function y0(i,e=null,t=!0){const n={disposedObjects:0,releasedCachedGeometries:0,disposedUniqueGeometries:0,releasedCachedMaterials:0,disposedUniqueMaterials:0,disposedUniqueTextures:0,disposedInstancedMeshes:0,disposedBatchedMeshes:0},s=new Set,o=new Set,a=new Set,l=c=>{const d=c.children.slice();for(let u=0;u<d.length;u++)l(d[u]);if(n.disposedObjects++,c.isBatchedMesh){const u=c;if(Array.isArray(u.material))for(let f=0;f<u.material.length;f++)Ci(u.material[f],e,n,o,a);else u.material&&Ci(u.material,e,n,o,a);u.dispose(),n.disposedBatchedMeshes++}else if(c.isInstancedMesh){const u=c;if(u.geometry&&Tc(u.geometry,e,n,s),Array.isArray(u.material))for(let f=0;f<u.material.length;f++)Ci(u.material[f],e,n,o,a);else u.material&&Ci(u.material,e,n,o,a);u.dispose(),n.disposedInstancedMeshes++}else if(c.isMesh||c.isLine||c.isPoints){const u=c;if(u.geometry&&Tc(u.geometry,e,n,s),Array.isArray(u.material))for(let f=0;f<u.material.length;f++)Ci(u.material[f],e,n,o,a);else u.material&&Ci(u.material,e,n,o,a)}else if(c.isLight){const u=c;typeof u.dispose=="function"&&u.dispose()}c!==i&&c.parent&&c.parent.remove(c)};return l(i),t&&i.parent&&i.parent.remove(i),n}class M0{baseline=null;peak=null;lastVerification=null;switchCount=0;captureBaseline(e){const t={geometries:e.info.memory.geometries,textures:e.info.memory.textures,timestampMs:typeof performance<"u"?performance.now():Date.now()};return this.baseline=t,this.peak=t,t}recordActivePeak(e){const t={geometries:e.info.memory.geometries,textures:e.info.memory.textures,timestampMs:typeof performance<"u"?performance.now():Date.now()};return(!this.peak||t.geometries>this.peak.geometries||t.textures>this.peak.textures)&&(this.peak=t),t}verifyAfterDispose(e,t){const n=typeof performance<"u"?performance.now():Date.now(),s={geometries:e.info.memory.geometries,textures:e.info.memory.textures,timestampMs:n},o=this.baseline??s,a=this.peak??s,l=t.getStats(),c=s.geometries-o.geometries,d=s.textures-o.textures,u=c<=0&&d<=0&&l.totalRefs===0&&l.geometries===0&&l.materials===0&&l.textures===0;this.switchCount++;const f={baseline:o,peak:a,afterDispose:s,deltaGeometries:c,deltaTextures:d,cacheRemainingRefs:l.totalRefs,passed:u};return this.lastVerification=f,u||console.warn("[MI Shoe V2 VRAM Leak Detector] Residual GPU/cache resources detected!",{...f,cacheStats:l}),f}getLastVerification(){return this.lastVerification}getSwitchCount(){return this.switchCount}}const b0="http://www.w3.org/2000/svg";class S0{host;toggleBtn;panelEl;fields={};mounted=!1;expanded=!1;lastDomUpdateMs=-1/0;constructor(e,t=!1){this.host=e,this.expanded=t,this.toggleBtn=document.createElement("button"),this.toggleBtn.type="button",this.toggleBtn.className="unit-v2-perf-toggle mishoe-v2-perf-toggle is-hidden",this.toggleBtn.setAttribute("aria-label","V2 パフォーマンスHUD切替 (P)"),this.toggleBtn.setAttribute("title","V2 Perf HUD (P)");const n=document.createElementNS(b0,"svg");n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("aria-hidden","true"),n.innerHTML='<path d="M4.5 16.5a8.5 8.5 0 1 1 15 0"/><line x1="12" y1="13" x2="16.2" y2="8.8"/><circle cx="12" cy="13.5" r="1.4" fill="currentColor" stroke="none"/>';const s=document.createElement("span");s.textContent="V2 HUD",this.toggleBtn.append(n,s),this.toggleBtn.addEventListener("click",()=>this.toggle()),this.panelEl=document.createElement("div"),this.panelEl.className="unit-v2-perf-panel mishoe-v2-perf-panel is-hidden",this.panelEl.setAttribute("role","status"),this.panelEl.setAttribute("aria-live","off");const o=document.createElement("div");o.className="unit-v2-perf-header",o.innerHTML='<span class="unit-v2-perf-title" data-field="unitTitle">V2 OPT</span><span class="unit-v2-perf-state" data-field="loopState">IDLE 0%</span>',this.panelEl.appendChild(o);const a=[["drawCalls","Draw Calls"],["triangles","Triangles"],["geometries","Geometries"],["textures","Textures"],["frameTime","Frame Time"],["quality","Tier / DPR"],["batches","Batching"],["parts","Parts (JSON=3D)"],["build","Build / Warmup"],["vram","VRAM Leak"]],l=document.createElement("div");l.className="unit-v2-perf-grid";for(let c=0;c<a.length;c++){const[d,u]=a[c],f=document.createElement("div");f.className="unit-v2-perf-row";const r=document.createElement("span");r.className="unit-v2-perf-key",r.textContent=u;const p=document.createElement("span");p.className="unit-v2-perf-val",p.dataset.field=d,p.textContent="-",f.append(r,p),l.appendChild(f),this.fields[d]=p}this.fields.unitTitle=o.querySelector('[data-field="unitTitle"]'),this.fields.loopState=o.querySelector('[data-field="loopState"]'),this.panelEl.appendChild(l),this.host.append(this.toggleBtn,this.panelEl)}setModeVisible(e){this.mounted=e,this.toggleBtn.classList.toggle("is-hidden",!e),this.toggleBtn.classList.toggle("is-active",e&&this.expanded),this.panelEl.classList.toggle("is-hidden",!e||!this.expanded)}toggle(){return this.expanded=!this.expanded,this.toggleBtn.classList.toggle("is-active",this.mounted&&this.expanded),this.panelEl.classList.toggle("is-hidden",!this.mounted||!this.expanded),this.expanded}setExpanded(e){this.expanded=e,this.toggleBtn.classList.toggle("is-active",this.mounted&&this.expanded),this.panelEl.classList.toggle("is-hidden",!this.mounted||!this.expanded)}isExpanded(){return this.expanded}update(e,t=!1){if(!this.mounted||!this.expanded)return;const n=typeof performance<"u"?performance.now():Date.now();if(!t&&n-this.lastDomUpdateMs<90)return;this.lastDomUpdateMs=n,this.fields.unitTitle.textContent=`${e.unitId.toUpperCase()} · V2 OPT`;const s=e.drawCalls,o=e.maxDrawCallsBudget??100;if(this.fields.drawCalls.textContent=`${s} / ${o}`,this.fields.drawCalls.className=s<=o?"unit-v2-perf-val is-ok":"unit-v2-perf-val is-warn",this.fields.triangles.textContent=e.triangles.toLocaleString("en-US"),this.fields.geometries.textContent=String(e.geometries),this.fields.textures.textContent=String(e.textures),this.fields.frameTime.textContent=`${e.frameTimeMs.toFixed(2)} ms (avg ${e.avgFrameTimeMs.toFixed(2)})`,this.fields.quality.textContent=`${e.quality.toUpperCase()} · DPR ${e.pixelRatio.toFixed(2)}`,e.buildStats){const a=e.buildStats;this.fields.batches.textContent=`${a.instancedMeshCount} Inst(${a.totalInstances}) · ${a.batchedMeshCount} Batch(${a.totalBatchedItems})`,this.fields.parts.textContent=`${a.registeredPartCount} / ${a.declaredPartCount}`,this.fields.build.textContent=`${a.buildTimeMs.toFixed(1)}ms (max ${a.maxChunkMs.toFixed(1)}ms) · W ${e.shaderWarmupMs.toFixed(1)}ms`}if(e.vramCheck){const a=e.vramCheck;this.fields.vram.textContent=a.passed?`PASS Δg:${a.deltaGeometries} Δt:${a.deltaTextures} (#${e.vramSwitchCount})`:`LEAK Δg:${a.deltaGeometries} Δt:${a.deltaTextures}`,this.fields.vram.className=a.passed?"unit-v2-perf-val is-ok":"unit-v2-perf-val is-warn"}else this.fields.vram.textContent="BASELINE ARMED",this.fields.vram.className="unit-v2-perf-val";this.fields.loopState.textContent=e.idle?"IDLE 0% GPU":"ACTIVE",this.fields.loopState.className=e.idle?"unit-v2-perf-state is-idle":"unit-v2-perf-state is-active"}dispose(){this.toggleBtn.remove(),this.panelEl.remove()}}const Po=new A,os=[],Co=new Set,ar=new Uint8Array(1024);class E0{raycaster=new _f;hoverThrottleMs;isDragging=!1;lastHoverTimestampMs=-1/0;lastHoverPartId=null;hoverChecksPerformed=0;hoverChecksSkipped=0;constructor(e=33.3){this.hoverThrottleMs=e}setCameraDragging(e){this.isDragging=e}isCameraDragging(){return this.isDragging}resetHoverThrottle(){this.lastHoverTimestampMs=-1/0}getDiagnostics(){return{performed:this.hoverChecksPerformed,skipped:this.hoverChecksSkipped}}pickHover(e,t,n,s,o,a=typeof performance<"u"?performance.now():Date.now()){if(!n||this.isDragging)return this.hoverChecksSkipped++,{skipped:!0,partId:this.lastHoverPartId};if(a-this.lastHoverTimestampMs<this.hoverThrottleMs)return this.hoverChecksSkipped++,{skipped:!0,partId:this.lastHoverPartId};this.lastHoverTimestampMs=a,this.hoverChecksPerformed++,this.raycaster.setFromCamera(e,t);const l=this.pickWithRay(this.raycaster,n,s,o);return this.lastHoverPartId=l,{skipped:!1,partId:l}}pickClick(e,t,n,s,o){return n?(this.raycaster.setFromCamera(e,t),this.pickWithRay(this.raycaster,n,s,o)):null}pickWithRay(e,t,n,s){const o=e.ray;if(t.unitWorldBox.isEmpty()||!o.intersectBox(t.unitWorldBox,Po))return null;Co.clear();const a=t.bindings.length;for(let r=0;r<a;r++)ar[r]=0;let l=!1;const c=t.groups,d=t.parts;for(let r=0;r<c.length;r++){const p=c[r];if(p.worldBox.isEmpty()||!o.intersectBox(p.worldBox,Po))continue;const v=p.partIndices;for(let x=0;x<v.length;x++){const g=d[v[x]];if(n(g.partId)||g.worldBox.isEmpty()||!o.intersectBox(g.worldBox,Po))continue;Co.add(g.partId),l=!0;const m=g.bindingIndices;for(let M=0;M<m.length;M++){const b=m[M];b<ar.length&&(ar[b]=1)}}}if(!l)return null;let u=1/0,f=null;for(let r=0;r<a;r++){if(ar[r]===0)continue;const p=t.bindings[r];if(p.mesh.visible){os.length=0,e.intersectObject(p.mesh,!1,os);for(let v=0;v<os.length;v++){const x=os[v];if(x.distance>=u)continue;let g;if(p.kind==="instanced"){if(x.instanceId===void 0)continue;g=p.instanceIdToPartId[x.instanceId]}else{if(x.batchId===void 0)continue;g=p.batchIdToPartId[x.batchId]}!g||!Co.has(g)||n(g)||s&&s.distanceToPoint(x.point)<0||(u=x.distance,f=g)}}}return os.length=0,f}}const wa={standard:{maxPixelRatio:1,curveSegments:6,radialSegments:8,torusTubularSegments:10,sphereSegments:10,shadowsEnabled:!1,postProcessEnabled:!1,enableStudioEnv:!1,showSolidStructuralEdges:!1,maxHeroTextureDim:256},high:{maxPixelRatio:1.5,curveSegments:12,radialSegments:14,torusTubularSegments:16,sphereSegments:16,shadowsEnabled:!1,postProcessEnabled:!1,enableStudioEnv:!0,showSolidStructuralEdges:!0,maxHeroTextureDim:512},ultra:{maxPixelRatio:2,curveSegments:18,radialSegments:22,torusTubularSegments:22,sphereSegments:20,shadowsEnabled:!1,postProcessEnabled:!1,enableStudioEnv:!0,showSolidStructuralEdges:!0,maxHeroTextureDim:1024}},wc={metal_hero:{color:16777215,metalness:.9,roughness:.22,bumpTextureKey:"cnc_brushed",bumpScale:.016,ultraPhysical:{clearcoat:.32,clearcoatRoughness:.14}},matte_chassis:{color:16777215,metalness:.26,roughness:.5,stdLambert:!0,bumpTextureKey:"mg_grain",bumpScale:.025},elastomer_rubber:{color:16777215,metalness:.05,roughness:.86,stdLambert:!0,bumpTextureKey:"mg_grain",bumpScale:.04},pcb_textured:{color:16777215,metalness:.22,roughness:.42,stdLambert:!0,mapTextureKey:"hdi_pcb",bumpTextureKey:"hdi_pcb",bumpScale:.028},silicon_hero:{color:16777215,metalness:.42,roughness:.24,ultraPhysical:{clearcoat:.55,clearcoatRoughness:.14,iridescence:.45,iridescenceIOR:1.65}},gold_plating:{color:16777215,metalness:.94,roughness:.18,ultraPhysical:{clearcoat:.36,clearcoatRoughness:.12}},becu_spring:{color:16777215,metalness:.89,roughness:.23,bumpTextureKey:"cnc_brushed",bumpScale:.02,ultraPhysical:{clearcoat:.24,clearcoatRoughness:.16}},stainless_machined:{color:16777215,metalness:.9,roughness:.21,bumpTextureKey:"cnc_brushed",bumpScale:.015,ultraPhysical:{clearcoat:.3,clearcoatRoughness:.14}},matte_black_anodized:{color:16777215,metalness:.48,roughness:.46,stdLambert:!0},pin_carrier_gloss:{color:16777215,metalness:.14,roughness:.26,stdLambert:!0,ultraPhysical:{clearcoat:.58,clearcoatRoughness:.14}},copper_coil:{color:16777215,metalness:.88,roughness:.24,mapTextureKey:"copper_coil",bumpTextureKey:"copper_coil",bumpScale:.03,ultraPhysical:{clearcoat:.22,clearcoatRoughness:.18}},torus_seal:{color:16777215,metalness:.36,roughness:.52,stdLambert:!0},copper_thermal:{color:16777215,metalness:.9,roughness:.24,bumpTextureKey:"cnc_brushed",bumpScale:.018,ultraPhysical:{clearcoat:.26,clearcoatRoughness:.18}},brass_precision:{color:16777215,metalness:.91,roughness:.22,bumpTextureKey:"cnc_brushed",bumpScale:.016,ultraPhysical:{clearcoat:.28,clearcoatRoughness:.15}},titanium_machined:{color:16777215,metalness:.86,roughness:.27,bumpTextureKey:"cnc_brushed",bumpScale:.018,ultraPhysical:{clearcoat:.25,clearcoatRoughness:.18}},magnesium_cast:{color:16777215,metalness:.62,roughness:.44,stdLambert:!0,bumpTextureKey:"mg_grain",bumpScale:.032},iron_magnetic:{color:16777215,metalness:.84,roughness:.3,bumpTextureKey:"cnc_brushed",bumpScale:.018},solder_silver:{color:16777215,metalness:.93,roughness:.16,ultraPhysical:{clearcoat:.35,clearcoatRoughness:.12}},emi_shield_metal:{color:16777215,metalness:.84,roughness:.28,bumpTextureKey:"mesh_grid",bumpScale:.022},optical_glass_clear:{color:16777215,metalness:.04,roughness:.06,transparent:!0,opacity:.34,depthWrite:!1,ultraPhysical:{clearcoat:1,clearcoatRoughness:.04,iridescence:.28,iridescenceIOR:1.48,ior:1.52,reflectivity:.9}},optical_glass_ed:{color:16777215,metalness:.05,roughness:.05,transparent:!0,opacity:.42,depthWrite:!1,ultraPhysical:{clearcoat:1,clearcoatRoughness:.04,iridescence:.42,iridescenceIOR:1.58,ior:1.56,reflectivity:.92}},optical_ar_iridescent:{color:16777215,metalness:.1,roughness:.07,transparent:!0,opacity:.46,depthWrite:!1,ultraPhysical:{clearcoat:1,clearcoatRoughness:.05,iridescence:.88,iridescenceIOR:1.72,ior:1.62,reflectivity:.95}},optical_dichroic:{color:16777215,metalness:.22,roughness:.08,transparent:!0,opacity:.54,depthWrite:!1,ultraPhysical:{clearcoat:.95,clearcoatRoughness:.05,iridescence:.95,iridescenceIOR:1.85}},glass_clear_housing:{color:16777215,metalness:.05,roughness:.08,transparent:!0,opacity:.24,depthWrite:!1,ultraPhysical:{clearcoat:.92,clearcoatRoughness:.06}},membrane_translucent:{color:16777215,metalness:.08,roughness:.24,transparent:!0,opacity:.68,depthWrite:!1,ultraPhysical:{clearcoat:.45,clearcoatRoughness:.18}},silicon_wafer_dark:{color:16777215,metalness:.52,roughness:.16,mapTextureKey:"wafer_grid",bumpTextureKey:"wafer_grid",bumpScale:.018,ultraPhysical:{clearcoat:.85,clearcoatRoughness:.08,iridescence:.65,iridescenceIOR:1.78}},silicon_photodiode:{color:16777215,metalness:.36,roughness:.18,mapTextureKey:"optical_diffraction",ultraPhysical:{clearcoat:.78,clearcoatRoughness:.1,iridescence:.72,iridescenceIOR:1.68}},silicon_dielectric:{color:16777215,metalness:.12,roughness:.28,transparent:!0,opacity:.56,depthWrite:!1,ultraPhysical:{clearcoat:.62,clearcoatRoughness:.14}},cucu_hybrid_copper:{color:16777215,metalness:.92,roughness:.17,bumpTextureKey:"wafer_grid",bumpScale:.02,ultraPhysical:{clearcoat:.34,clearcoatRoughness:.12}},cfa_gloss_filter:{color:16777215,metalness:.08,roughness:.14,transparent:!0,opacity:.78,depthWrite:!1,ultraPhysical:{clearcoat:.9,clearcoatRoughness:.08}},abf_substrate:{color:16777215,metalness:.18,roughness:.38,stdLambert:!0,bumpTextureKey:"hdi_pcb",bumpScale:.02},ic_epoxy_dark:{color:16777215,metalness:.14,roughness:.44,stdLambert:!0,bumpTextureKey:"ceramic_grain",bumpScale:.015},polyimide_fpc:{color:16777215,metalness:.24,roughness:.28,ultraPhysical:{clearcoat:.55,clearcoatRoughness:.16}},ceramic_alumina:{color:16777215,metalness:.06,roughness:.58,stdLambert:!0,bumpTextureKey:"ceramic_grain",bumpScale:.022},carbon_fiber:{color:16777215,metalness:.34,roughness:.34,mapTextureKey:"carbon_weave",bumpTextureKey:"carbon_weave",bumpScale:.028,ultraPhysical:{clearcoat:.42,clearcoatRoughness:.2}},leatherette_grip:{color:16777215,metalness:.04,roughness:.84,stdLambert:!0,bumpTextureKey:"leather_grain",bumpScale:.045},foam_felt_matte:{color:16777215,metalness:.02,roughness:.94,stdLambert:!0,bumpTextureKey:"ceramic_grain",bumpScale:.038},emissive_glow:{color:16777215,metalness:.08,roughness:.24,emissive:3900150,emissiveIntensity:.55}};function A0(i){if(i==="studio_env"){const a=new Uint8Array(32768);for(let c=0;c<64;c++){const u=(1-c/63)*Math.PI,f=Math.sin(u),r=Math.cos(u);for(let p=0;p<128;p++){const x=p/127*Math.PI*2,g=f*Math.cos(x),m=r,M=f*Math.sin(x);let b=.62+Math.max(0,m)*.26;const y=Math.max(0,g*-.517+m*.716+M*.458);b+=Math.pow(y,6)*.55;const I=Math.max(0,g*.648+m*.365+M*-.669);b+=Math.pow(I,8)*.45;const P=Math.exp(-Math.pow((m+.08)*7.5,2));b*=1-P*.42;const L=Math.min(255,Math.max(0,Math.round(b*246))),D=Math.min(255,Math.max(0,Math.round(b*249))),w=Math.min(255,Math.max(0,Math.round(b*255))),S=(c*128+p)*4;a[S]=L,a[S+1]=D,a[S+2]=w,a[S+3]=255}}const l=new ri(a,128,64,Ft);return l.mapping=xr,l.colorSpace=wt,l.minFilter=Pt,l.magFilter=Pt,l.generateMipmaps=!1,l.needsUpdate=!0,l.userData.__cacheKey=i,l}const e=64,t=new Uint8Array(e*e*4);for(let s=0;s<e;s++)for(let o=0;o<e;o++){const a=(s*e+o)*4,l=(Math.sin(o*12.9898+s*78.233)*43758.5453%1+1)%1;if(i==="cnc_brushed"){const c=Math.sin(s*1.35)*14+(l-.5)*18,d=Math.min(255,Math.max(0,Math.round(128+c)));t[a]=d,t[a+1]=d,t[a+2]=d,t[a+3]=255}else if(i==="mg_grain"){const c=Math.min(255,Math.max(0,Math.round(112+l*40)));t[a]=c,t[a+1]=c,t[a+2]=c,t[a+3]=255}else if(i==="hdi_pcb"){const c=o%8===0||s%12===0;o%16===4&&s%16===4?(t[a]=212,t[a+1]=176,t[a+2]=74):c?(t[a]=32,t[a+1]=104,t[a+2]=84):(t[a]=18,t[a+1]=68,t[a+2]=56),t[a+3]=255}else if(i==="copper_coil"){const c=.5+.5*Math.sin(o/e*Math.PI*16);t[a]=Math.round(170+c*64),t[a+1]=Math.round(88+c*42),t[a+2]=Math.round(42+c*24),t[a+3]=255}else if(i==="carbon_weave"){const c=(o>>2)+(s>>2)&1,d=Math.sin(c===0?(o&3)*1.2:(s&3)*1.2),u=Math.min(255,Math.max(0,Math.round(42+c*28+d*14)));t[a]=u,t[a+1]=u+2,t[a+2]=u+6,t[a+3]=255}else if(i==="leather_grain"){const c=Math.sin(o*.9+Math.cos(s*.85)*1.4)*Math.cos(s*.95)*32,d=Math.min(255,Math.max(0,Math.round(124+c+(l-.5)*26)));t[a]=d,t[a+1]=d,t[a+2]=d,t[a+3]=255}else if(i==="wafer_grid"){const c=o%16===0||s%16===0,d=o%4===0||s%4===0;c?(t[a]=164,t[a+1]=188,t[a+2]=224):d?(t[a]=74,t[a+1]=98,t[a+2]=140):(t[a]=44,t[a+1]=62,t[a+2]=96),t[a+3]=255}else if(i==="optical_diffraction"){const c=(o+s*.7)/e*Math.PI*4;t[a]=Math.round(92+54*Math.sin(c)),t[a+1]=Math.round(138+68*Math.sin(c+2.1)),t[a+2]=Math.round(184+62*Math.sin(c+4.2)),t[a+3]=255}else if(i==="ceramic_grain"){const c=Math.min(255,Math.max(0,Math.round(120+(l-.5)*44)));t[a]=c,t[a+1]=c,t[a+2]=c,t[a+3]=255}else if(i==="mesh_grid"){const c=o%6===0||s%6===0?192:96;t[a]=c,t[a+1]=c,t[a+2]=c,t[a+3]=255}else{const c=o%8===0||s%8===0?18:0;t[a]=72+c,t[a+1]=96+c,t[a+2]=132+c,t[a+3]=255}}const n=new ri(t,e,e,Ft);return n.wrapS=oi,n.wrapT=oi,(i==="hdi_pcb"||i==="copper_coil"||i==="silicon_die"||i==="carbon_weave"||i==="wafer_grid"||i==="optical_diffraction")&&(n.colorSpace=wt),n.minFilter=Pt,n.magFilter=Pt,n.generateMipmaps=!1,n.needsUpdate=!0,n.userData.__cacheKey=i,n}function Pc(i,e=8952234){const n=new Uint8Array(256),s=e>>16&255,o=e>>8&255,a=e&255;for(let c=0;c<64;c++){const d=c*4;n[d]=s,n[d+1]=o,n[d+2]=a,n[d+3]=255}const l=new ri(n,8,8,Ft);return l.colorSpace=wt,l.minFilter=Pt,l.magFilter=Pt,l.generateMipmaps=!1,l.needsUpdate=!0,l.userData.__cacheKey=i,l}class T0{materials=new Map;geometries=new Map;textures=new Map;acquireTexture(e){const t=this.textures.get(e);if(t)return t.refCount++,t.resource;const n=A0(e);return this.textures.set(e,{resource:n,refCount:1}),n}acquireHeroTexture(e,t,n){const s=`herotex:${e}:${n}`,o=this.textures.get(s);if(o)return o.refCount++,o.resource;let a;if(typeof document<"u"){const l=wa[n].maxHeroTextureDim,c=Math.min(1,l/Math.max(1,t.width,t.height)),d=Math.max(32,Math.round(t.width*c)),u=Math.max(32,Math.round(t.height*c)),f=document.createElement("canvas");f.width=d,f.height=u;const r=f.getContext("2d");if(r){r.save(),r.scale(d/t.width,u/t.height),t.painter(r,t.width,t.height),r.restore();const p=new Cu(f);p.colorSpace=wt,p.minFilter=Nn,p.magFilter=Pt,p.anisotropy=n==="ultra"?4:n==="high"?2:1,t.wrapRepeat&&(p.wrapS=oi,p.wrapT=oi),(t.repeatX||t.repeatY)&&p.repeat.set(t.repeatX??1,t.repeatY??1),p.needsUpdate=!0,a=p}else a=Pc(s,t.fallbackColor??t.baseColor??8952234)}else a=Pc(s,t.fallbackColor??t.baseColor??8952234);return a.userData.__cacheKey=s,this.textures.set(s,{resource:a,refCount:1}),a}releaseTexture(e){const t=this.textures.get(e);return t?(t.refCount--,t.refCount<=0?(t.resource.dispose(),this.textures.delete(e),!0):!1):!1}acquireGeometry(e,t){const n=this.geometries.get(e);if(n)return n.refCount++,n.resource;const s=t();return s.userData.__cacheKey=e,this.geometries.set(e,{resource:s,refCount:1}),s}releaseGeometry(e){const t=this.geometries.get(e);return t?(t.refCount--,t.refCount<=0?(t.resource.dispose(),this.geometries.delete(e),!0):!1):!1}acquireMaterial(e,t,n="solid",s=[]){const o=`mat:${e}:${t}:${n}`,a=this.materials.get(o);if(a)return a.refCount++,a.resource.clippingPlanes=s,a.resource;const l=wc[e],c=[],d=n==="xray",u=n==="cad";let f=null,r=null;!d&&!u&&(l.mapTextureKey&&(f=this.acquireTexture(l.mapTextureKey),c.push(l.mapTextureKey)),t!=="standard"&&l.bumpTextureKey&&(r=this.acquireTexture(l.bumpTextureKey),c.push(l.bumpTextureKey)));const p=d||!!(l.transparent&&!u),v=d?.24:u?l.transparent?Math.max(.42,l.opacity??.5):1:l.opacity??1,x=d?!1:u?!l.transparent:l.depthWrite??!p,g={color:u?16054010:d?14412542:l.color,clippingPlanes:s,clipShadows:!1,side:an,transparent:p||u&&!!l.transparent,opacity:v,depthWrite:x};let m;return d?m=new tr({...g,emissive:1981066,emissiveIntensity:.14}):u?m=new tr({...g,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}):t==="standard"?l.stdLambert&&!l.transparent?m=new tr({...g,map:f,emissive:l.emissive??0,emissiveIntensity:l.emissiveIntensity??0}):m=new ls({...g,map:f,metalness:l.metalness*.85,roughness:Math.min(1,l.roughness+.08),emissive:l.emissive??0,emissiveIntensity:l.emissiveIntensity??0}):t==="ultra"&&l.ultraPhysical?m=new Wl({...g,map:f,bumpMap:r,bumpScale:l.bumpScale??.02,metalness:l.metalness,roughness:l.roughness,clearcoat:l.ultraPhysical.clearcoat,clearcoatRoughness:l.ultraPhysical.clearcoatRoughness,iridescence:l.ultraPhysical.iridescence??0,iridescenceIOR:l.ultraPhysical.iridescenceIOR??1.3,ior:l.ultraPhysical.ior??1.5,reflectivity:l.ultraPhysical.reflectivity??.5,envMapIntensity:1.05,emissive:l.emissive??0,emissiveIntensity:l.emissiveIntensity??0}):m=new ls({...g,map:f,bumpMap:r,bumpScale:l.bumpScale??.02,metalness:l.metalness,roughness:l.roughness,envMapIntensity:.95,emissive:l.emissive??0,emissiveIntensity:l.emissiveIntensity??0}),m.userData.__cacheKey=o,m.userData.__materialBucket=e,this.materials.set(o,{resource:m,refCount:1,depTextures:c}),m}acquireHeroMaterial(e,t,n,s="solid",o=[]){if(s!=="solid")return this.acquireMaterial(t.bucket,n,s,o);const a=`hero:${e}:${n}:${s}`,l=this.materials.get(a);if(l)return l.refCount++,l.resource.clippingPlanes=o,l.resource;const c=wc[t.bucket],d=`herotex:${e}:${n}`,u=this.acquireHeroTexture(e,t,n),f=[d],r=t.metalness??c.metalness,p=t.roughness??c.roughness,v=t.transparent??!!c.transparent,x=t.opacity??c.opacity??1,g=t.depthWrite??!v,m={color:t.baseColor??16777215,map:u,clippingPlanes:o,clipShadows:!1,side:an,transparent:v,opacity:x,depthWrite:g,emissive:t.emissive??c.emissive??0,emissiveIntensity:t.emissiveIntensity??c.emissiveIntensity??0};let M;return n==="standard"?M=c.stdLambert&&!v?new tr(m):new ls({...m,metalness:r*.85,roughness:Math.min(1,p+.08)}):n==="ultra"&&c.ultraPhysical?M=new Wl({...m,metalness:r,roughness:p,clearcoat:c.ultraPhysical.clearcoat,clearcoatRoughness:c.ultraPhysical.clearcoatRoughness,iridescence:c.ultraPhysical.iridescence??0,iridescenceIOR:c.ultraPhysical.iridescenceIOR??1.3,envMapIntensity:1.05}):M=new ls({...m,metalness:r,roughness:p,envMapIntensity:.95}),M.userData.__cacheKey=a,M.userData.__materialBucket=t.bucket,M.userData.__heroKey=e,this.materials.set(a,{resource:M,refCount:1,depTextures:f}),M}acquireLineMaterial(e,t){const n=`line:${e}`,s=this.materials.get(n);if(s)return s.refCount++,s.resource.clippingPlanes=t.clippingPlanes??[],s.resource;const o=t.dashed?new hf({color:t.color,dashSize:t.dashSize??1.4,gapSize:t.gapSize??.9,transparent:!0,opacity:t.opacity,vertexColors:t.vertexColors??!1,clippingPlanes:t.clippingPlanes??[]}):new Lr({color:t.color,transparent:!0,opacity:t.opacity,vertexColors:t.vertexColors??!1,clippingPlanes:t.clippingPlanes??[]});return o.userData.__cacheKey=n,this.materials.set(n,{resource:o,refCount:1}),o}acquireBasicMaterial(e,t){const n=`basic:${e}`,s=this.materials.get(n);if(s)return s.refCount++,s.resource.clippingPlanes=t.clippingPlanes??[],s.resource;const o=new Cr({color:t.color,transparent:t.transparent??!1,opacity:t.opacity??1,side:t.side??wn,depthWrite:t.depthWrite??!(t.transparent??!1),clippingPlanes:t.clippingPlanes??[]});return o.userData.__cacheKey=n,this.materials.set(n,{resource:o,refCount:1}),o}acquirePointsMaterial(e,t){const n=`points:${e}`,s=this.materials.get(n);if(s)return s.refCount++,s.resource.clippingPlanes=t.clippingPlanes??[],s.resource;const o=new Pu({color:t.color,size:t.size,transparent:t.transparent??!0,opacity:t.opacity??.9,vertexColors:t.vertexColors??!1,clippingPlanes:t.clippingPlanes??[]});return o.userData.__cacheKey=n,this.materials.set(n,{resource:o,refCount:1}),o}releaseMaterial(e){const t=this.materials.get(e);if(!t)return!1;if(t.refCount--,t.refCount<=0){if(t.depTextures)for(let n=0;n<t.depTextures.length;n++)this.releaseTexture(t.depTextures[n]);return t.resource.dispose(),this.materials.delete(e),!0}return!1}releaseMaterialInstance(e){const t=e.userData?.__cacheKey;return t&&this.materials.has(t)?this.releaseMaterial(t):!1}releaseGeometryInstance(e){const t=e.userData?.__cacheKey;return t&&this.geometries.has(t)?this.releaseGeometry(t):!1}hasMaterial(e){return this.materials.has(e)}hasGeometry(e){return this.geometries.has(e)}updateClippingPlanes(e){for(const t of this.materials.values())t.resource.clippingPlanes=e}warmupShaders(e,t,n){const s=typeof performance<"u"?performance.now():0;return e.compile(t,n),(typeof performance<"u"?performance.now():0)-s}getStats(){let e=0;for(const t of this.materials.values())e+=t.refCount;for(const t of this.geometries.values())e+=t.refCount;for(const t of this.textures.values())e+=t.refCount;return{materials:this.materials.size,geometries:this.geometries.size,textures:this.textures.size,totalRefs:e,activeMaterialKeys:Array.from(this.materials.keys()),activeGeometryKeys:Array.from(this.geometries.keys()),activeTextureKeys:Array.from(this.textures.keys())}}disposeAll(){for(const e of this.materials.values())e.resource.dispose();this.materials.clear();for(const e of this.geometries.values())e.resource.dispose();this.geometries.clear();for(const e of this.textures.values())e.resource.dispose();this.textures.clear()}}class w0{renderer;container;clippingPlane;callbacks;scene;lightGroup;cache=new T0;raycaster=new E0(33.3);vramMonitor=new M0;perfHud;active=!1;ready=!1;activeUnitId=null;activationToken=0;activeUnit=null;buildResult=null;partById=new Map;studioEnvRenderTarget=null;savedExternalPixelRatio=1;quality="high";renderMode="solid";explodeFactor=0;physicsActive=!1;subView=0;integratedMode=!1;selectedId=null;hoveredId=null;hiddenIds=new Set;isolatedId=null;lastDrawCalls=0;lastTriangles=0;lastFrameTimeMs=0;avgFrameTimeMs=0;frameSampleCount=0;shaderWarmupMs=0;isIdle=!0;contextLost=!1;contextLostRecoveryCount=0;constructor(e,t,n,s){this.renderer=e,this.container=t,this.clippingPlane=n,this.callbacks=s,this.scene=new vu,this.scene.background=new qe(16777215),this.scene.matrixAutoUpdate=!1,this.scene.updateMatrix(),this.lightGroup=new as,this.lightGroup.name="unit-v2-studio-lights",this.lightGroup.matrixAutoUpdate=!1,this.lightGroup.updateMatrix(),this.scene.add(this.lightGroup);const a=(typeof window<"u"?new URLSearchParams(window.location.search):null)?.get("perfhud")==="1";this.perfHud=new S0(t,a)}isActive(){return this.active}isReady(){return this.active&&this.ready}getActiveUnitId(){return this.activeUnitId}getQuality(){return this.quality}getParts(){return this.buildResult?this.activeUnit?.getActiveParts?this.activeUnit.getActiveParts():this.buildResult.parts:[]}getAllBuiltParts(){return this.buildResult?this.buildResult.parts:[]}getPartById(e){return this.partById.get(e)??null}isPartCulledBySubView(e){return this.activeUnit?.isPartCulledBySubView?.(e)??!1}needsContinuousAnimation(e){return!this.active||!this.ready?!1:this.activeUnit?.needsContinuousAnimation?this.activeUnit.needsContinuousAnimation(e):e}getRaycastIndex(){return this.buildResult?this.buildResult.raycastIndex:null}getPartWorldBox(e,t){const n=this.buildResult?.raycastIndex;if(!n)return!1;const s=n.partBoundsById.get(e);return!s||s.worldBox.isEmpty()?!1:(t.copy(s.worldBox),!0)}setupStudioLighting(e){this.teardownStudioLighting();const t=wa[e],n=new uf(16317439,14476270,e==="standard"?1.18:.94);n.position.set(0,60,0),n.matrixAutoUpdate=!1,n.updateMatrix();const s=new xo(16777215,e==="standard"?1.48:1.78);s.position.set(-62,86,55),s.matrixAutoUpdate=!1,s.updateMatrix();const o=new xo(15857151,e==="standard"?.58:.74);o.position.set(65,68,75),o.matrixAutoUpdate=!1,o.updateMatrix();const a=new xo(15660799,e==="standard"?.48:.96);if(a.position.set(78,44,-80),a.matrixAutoUpdate=!1,a.updateMatrix(),this.lightGroup.add(n,s,o,a),this.lightGroup.updateMatrixWorld(!0),t.enableStudioEnv){const l=this.cache.acquireTexture("studio_env"),c=new Aa(this.renderer),d=c.fromEquirectangular(l);c.dispose(),this.cache.releaseTexture("studio_env"),this.studioEnvRenderTarget=d,this.scene.environment=d.texture}else this.scene.environment=null,this.studioEnvRenderTarget=null}teardownStudioLighting(){this.lightGroup.children.length>0&&y0(this.lightGroup,this.cache,!1),this.studioEnvRenderTarget&&(this.scene.environment=null,this.studioEnvRenderTarget.dispose(),this.studioEnvRenderTarget=null)}applyQualityRendererCaps(e){const t=wa[e];this.renderer.shadowMap.enabled=t.shadowsEnabled;const n=typeof window<"u"&&window.devicePixelRatio||1,s=Math.min(n,t.maxPixelRatio);this.renderer.setPixelRatio(s);const o=Math.max(1,this.container.clientWidth),a=Math.max(1,this.container.clientHeight);this.renderer.setSize(o,a)}disposeActiveUnitResources(){this.activeUnit&&(this.activeUnit.dispose(this.cache),this.activeUnit=null),this.buildResult=null,this.partById.clear(),this.ready=!1,this.teardownStudioLighting(),this.renderer.renderLists.dispose()}async activate(e,t,n,s){const o=++this.activationToken;this.active?(this.disposeActiveUnitResources(),this.vramMonitor.verifyAfterDispose(this.renderer,this.cache),this.vramMonitor.captureBaseline(this.renderer)):(this.savedExternalPixelRatio=this.renderer.getPixelRatio(),this.vramMonitor.captureBaseline(this.renderer)),this.active=!0,this.ready=!1,this.activeUnitId=e,this.quality=t,this.explodeFactor=s.explode,this.renderMode=s.renderMode,this.physicsActive=s.physicsActive,this.subView=s.subView??(e==="lens"?1:0),this.integratedMode=s.integratedMode??(e==="integrated"||e==="camera_body"),this.selectedId=null,this.hoveredId=null,this.hiddenIds=new Set,this.isolatedId=null,this.frameSampleCount=0,this.avgFrameTimeMs=0,this.perfHud.setModeVisible(!0),this.applyQualityRendererCaps(t),this.setupStudioLighting(t);try{const l=await x0(e);if(o!==this.activationToken||!this.active)return;const c=s.sectionActive?[this.clippingPlane]:[],d=await l.build(t,this.cache,{frameBudgetMs:8,clippingPlanes:c,subView:this.subView,integratedMode:this.integratedMode,isAborted:()=>o!==this.activationToken||!this.active});if(o!==this.activationToken||!this.active){l.dispose(this.cache);return}this.activeUnit=l,this.buildResult=d,this.partById.clear();for(let u=0;u<d.parts.length;u++)this.partById.set(d.parts[u].id,d.parts[u]);this.scene.add(d.rootGroup),l.setClippingPlanes?.(c),l.setSubView?.(this.subView),l.updateExplode(this.explodeFactor,!0),l.setVisualState(this.selectedId,this.hoveredId,this.hiddenIds,this.isolatedId,this.renderMode),l.setPhysicsVisible?.(this.physicsActive),l.updateExplodeGuides?.(this.explodeFactor,!0),(this.physicsActive||l.needsContinuousAnimation?.(this.physicsActive))&&l.updatePhysics?.(0,this.explodeFactor,this.physicsActive,0),this.contextLost||(this.shaderWarmupMs=this.cache.warmupShaders(this.renderer,this.scene,n)),this.ready=!0,this.vramMonitor.recordActivePeak(this.renderer),this.callbacks.onBuildComplete(e,this.getParts()),this.callbacks.onRequestRender(),this.refreshHud(!0)}catch(l){o===this.activationToken&&this.active&&console.error(`[UnitV2Runtime:${e}] Unit build failed:`,l)}}deactivate(){if(this.activationToken++,!this.active)return this.vramMonitor.getLastVerification();this.active=!1,this.activeUnitId=null,this.perfHud.setModeVisible(!1),this.disposeActiveUnitResources();const e=this.vramMonitor.verifyAfterDispose(this.renderer,this.cache);this.renderer.setPixelRatio(this.savedExternalPixelRatio);const t=Math.max(1,this.container.clientWidth),n=Math.max(1,this.container.clientHeight);return this.renderer.setSize(t,n),e}async setQuality(e,t,n){if(!this.active||!this.activeUnitId){this.quality=e;return}if(this.quality===e&&this.ready)return;const s=this.activeUnitId,o=this.selectedId,a=this.hoveredId,l=new Set(this.hiddenIds),c=this.isolatedId,d=this.renderMode,u=this.explodeFactor,f=this.physicsActive,r=this.subView,p=this.integratedMode;await this.activate(s,e,t,{explode:u,renderMode:d,physicsActive:f,sectionActive:n,subView:r,integratedMode:p}),this.active&&this.ready&&this.activeUnit&&this.activeUnitId===s&&(this.selectedId=o,this.hoveredId=a,this.hiddenIds=l,this.isolatedId=c,this.activeUnit.setVisualState(this.selectedId,this.hoveredId,this.hiddenIds,this.isolatedId,this.renderMode),this.activeUnit.updateExplode(this.explodeFactor,!0),this.activeUnit.updateExplodeGuides?.(this.explodeFactor,!0),this.callbacks.onRequestRender(),this.refreshHud(!0))}setSubView(e){this.subView=e,!(!this.activeUnit||!this.ready)&&(this.activeUnit.setSubView?.(e),this.activeUnit.updateExplodeGuides?.(this.explodeFactor,!0),this.callbacks.onRequestRender(),this.refreshHud(!0))}syncExplode(e,t=!1){if(this.explodeFactor=e,!this.activeUnit||!this.ready)return!1;const n=this.activeUnit.updateExplode(e,t);return n&&this.activeUnit.updateExplodeGuides?.(e,!0),n}syncVisualState(e,t,n,s,o){this.selectedId=e,this.hoveredId=t,this.hiddenIds=n,this.isolatedId=s,this.renderMode=o,!(!this.activeUnit||!this.ready)&&(this.activeUnit.setVisualState(e,t,n,s,o),this.activeUnit.updateExplodeGuides?.(this.explodeFactor,!0))}syncSectionPlane(e){!this.activeUnit||!this.ready||this.activeUnit.setClippingPlanes?.(e?[this.clippingPlane]:[])}syncPhysicsActive(e){this.physicsActive=e,!(!this.activeUnit||!this.ready)&&this.activeUnit.setPhysicsVisible?.(e)}stepPhysics(e,t=.016){if(!this.activeUnit||!this.ready)return!1;const n=this.activeUnit.updatePhysics?.(e,this.explodeFactor,this.physicsActive,t);return n!==!1&&(this.physicsActive||!!n)}handleResize(){this.active&&(this.applyQualityRendererCaps(this.quality),this.refreshHud(!0))}setCameraDragging(e){this.raycaster.setCameraDragging(e)}pickHover(e,t,n,s){return this.raycaster.pickHover(e,t,this.buildResult?.raycastIndex??null,o=>n(o)||this.isPartCulledBySubView(o),s)}pickClick(e,t,n,s){return this.raycaster.pickClick(e,t,this.buildResult?.raycastIndex??null,o=>n(o)||this.isPartCulledBySubView(o),s)}render(e){if(!this.active||!this.ready||this.contextLost)return;this.isIdle=!1;const t=typeof performance<"u"?performance.now():0;this.renderer.render(this.scene,e);const n=typeof performance<"u"?performance.now():0;this.lastFrameTimeMs=n-t,this.frameSampleCount++,this.frameSampleCount===1||this.frameSampleCount<=4&&this.avgFrameTimeMs>this.lastFrameTimeMs*10?this.avgFrameTimeMs=this.lastFrameTimeMs:this.avgFrameTimeMs=this.avgFrameTimeMs*.8+this.lastFrameTimeMs*.2,this.lastDrawCalls=this.renderer.info.render.calls,this.lastTriangles=this.renderer.info.render.triangles,this.vramMonitor.recordActivePeak(this.renderer),this.refreshHud(!1)}markIdle(){!this.active||this.isIdle||(this.isIdle=!0,this.refreshHud(!0))}handleContextLost(){this.contextLost=!0}async handleContextRestored(e,t){this.contextLost=!1,this.contextLostRecoveryCount++,!(!this.active||!this.activeUnitId)&&(this.quality="standard",this.callbacks.onQualityFallback("standard"),await this.activate(this.activeUnitId,"standard",e,{explode:this.explodeFactor,renderMode:this.renderMode,physicsActive:this.physicsActive,sectionActive:t,subView:this.subView,integratedMode:this.integratedMode}))}togglePerfHud(){const e=this.perfHud.toggle();return e&&this.refreshHud(!0),e}setPerfHudVisible(e){this.perfHud.setExpanded(e),e&&this.refreshHud(!0)}getDiagnostics(){const e=this.renderer.info;return{unitId:this.activeUnitId,active:this.active,ready:this.ready,quality:this.quality,pixelRatio:this.renderer.getPixelRatio(),idle:this.isIdle,drawCalls:this.lastDrawCalls,triangles:this.lastTriangles,geometries:e.memory.geometries,textures:e.memory.textures,frameTimeMs:this.lastFrameTimeMs,avgFrameTimeMs:this.avgFrameTimeMs,shaderWarmupMs:this.shaderWarmupMs,buildStats:this.buildResult?.stats??null,vramCheck:this.vramMonitor.getLastVerification(),vramSwitchCount:this.vramMonitor.getSwitchCount(),cacheStats:this.cache.getStats(),raycastDiagnostics:this.raycaster.getDiagnostics(),contextLostRecoveryCount:this.contextLostRecoveryCount,renderFrameCount:this.frameSampleCount}}refreshHud(e){const t=this.renderer.info,n={unitId:this.activeUnitId??"v2",drawCalls:this.lastDrawCalls,maxDrawCallsBudget:this.activeUnit?.getMeta().maxDrawCallsBudget??100,triangles:this.lastTriangles,geometries:t.memory.geometries,textures:t.memory.textures,frameTimeMs:this.lastFrameTimeMs,avgFrameTimeMs:this.avgFrameTimeMs,quality:this.quality,pixelRatio:this.renderer.getPixelRatio(),idle:this.isIdle,shaderWarmupMs:this.shaderWarmupMs,buildStats:this.buildResult?.stats??null,vramCheck:this.vramMonitor.getLastVerification(),vramSwitchCount:this.vramMonitor.getSwitchCount()};this.perfHud.update(n,e)}dispose(){this.deactivate(),this.cache.disposeAll(),this.perfHud.dispose()}}const P0=new Set(["integrated","camera_body"]),Ro=new en,Lo=new A,lr=new A;class C0{container;renderer;camera;controls;callbacks;v2Runtime;clippingPlane;pointer=new ie;pointerDownPos=new ie;hoverRaycastPending=!1;mode="integrated";lensSection=1;sensorFabVolume=0;renderMode="solid";quality=ii.isMobile?"high":"ultra";sectionAxis="off";sectionValue=.5;targetExplode=0;currentExplode=0;physicsActive=!1;selectedPartId=null;hoveredPartId=null;isolatedPartId=null;hiddenPartIds=new Set;pendingSelectAfterHydrate=null;initialActivated=!1;camAnimActive=!1;camStartPos=new A;camEndPos=new A;camStartTarget=new A;camEndTarget=new A;camAnimT=0;resizeObserver=null;boundHandleResize=()=>this.handleResize();contextLost=!1;contextLossCount=0;pageHidden=!1;recoveryOverlay;boundVisibilityChange=()=>this.handleVisibilityChange();boundContextLost=e=>this.handleContextLost(e);boundContextRestored=()=>this.handleContextRestored();clock=new gf;rafId=0;dirtyFrames=1;idleFrameStreak=0;disposed=!1;cachedDomRect=null;constructor(e,t){this.container=e,this.callbacks=t,this.renderer=new t0({antialias:ii.antialias,alpha:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1}),this.renderer.debug.checkShaderErrors=!0,this.renderer.shadowMap.enabled=!1,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,ii.maxPixelRatio)),this.renderer.setSize(Math.max(1,e.clientWidth),Math.max(1,e.clientHeight)),this.renderer.setClearColor(16777215,1),this.renderer.localClippingEnabled=!0,this.renderer.toneMapping=Dc,this.renderer.toneMappingExposure=1.09,this.renderer.outputColorSpace=wt,e.appendChild(this.renderer.domElement),this.recoveryOverlay=document.createElement("div"),this.recoveryOverlay.className="gpu-recovery-overlay",this.recoveryOverlay.setAttribute("aria-hidden","true"),this.recoveryOverlay.innerHTML='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" opacity="0.22"/><path d="M21 12a9 9 0 0 0-9-9"/></svg>',e.appendChild(this.recoveryOverlay);const n=Math.max(1,e.clientWidth)/Math.max(1,e.clientHeight);this.camera=new jt(32,n,.85,4200),this.controls=new i0(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.065,this.controls.minDistance=7,this.controls.maxDistance=2600,this.controls.addEventListener("change",()=>{this.markDirty(2)}),this.clippingPlane=new En(new A(-1,0,0),1e4),this.v2Runtime=new w0(this.renderer,this.container,this.clippingPlane,{onBuildComplete:s=>{if(this.mode===s&&(this.v2Runtime.setSubView(this.getActiveSubViewForMode(this.mode)),this.v2Runtime.syncExplode(this.currentExplode),this.v2Runtime.syncPhysicsActive(this.physicsActive),this.v2Runtime.syncSectionPlane(this.sectionAxis!=="off"),this.v2Runtime.syncVisualState(this.selectedPartId,this.hoveredPartId,this.hiddenPartIds,this.isolatedPartId,this.renderMode),this.markDirty(2)),this.callbacks.onVisibilityChanged(),this.mode===s&&this.pendingSelectAfterHydrate&&this.v2Runtime.getPartById(this.pendingSelectAfterHydrate.partId)){const o=this.pendingSelectAfterHydrate;this.pendingSelectAfterHydrate=null,this.selectPart(o.partId,o.focusCamera)}},onRequestRender:()=>{this.markDirty(2)},onQualityFallback:s=>{this.quality=s,this.callbacks.onQualityChanged?.(s)}}),this.setCameraPreset("iso",!0),this.bindEvents(),this.wakeLoop(),queueMicrotask(()=>{!this.disposed&&!this.initialActivated&&this.activateCurrentMode()})}activateCurrentMode(){this.initialActivated=!0;const e=this.mode;this.v2Runtime.activate(e,this.quality,this.camera,{explode:this.currentExplode,renderMode:this.renderMode,physicsActive:this.physicsActive,sectionActive:this.sectionAxis!=="off",subView:this.getActiveSubViewForMode(e),integratedMode:e==="integrated"||e==="camera_body"})}isV2Mode(e=this.mode){return _0(e)}getV2Runtime(){return this.v2Runtime}getMiShoeV2Runtime(){return this.v2Runtime}getActiveSubViewForMode(e){return e==="lens"?hn.studioOpen?-1:this.lensSection:e==="sensor_fab"?this.sensorFabVolume:0}getTotalPartCount(){let e=0;for(const t of v0())P0.has(t.unitId)||(e+=t.declaredPartCount);return e}async ensureAllHydrated(){return this.getTotalPartCount()}getPartsForCurrentMode(){return this.v2Runtime.getParts()}getSelectedPart(){return this.selectedPartId?this.v2Runtime.getPartById(this.selectedPartId):null}isPartHidden(e){return this.isolatedPartId&&this.isolatedPartId!==e?!0:this.hiddenPartIds.has(e)}isIsolated(){return this.isolatedPartId!==null}hasAnyHidden(){return this.isolatedPartId!==null||this.hiddenPartIds.size>0}getMode(){return this.mode}getLensSection(){return this.lensSection}refreshVisibility(){this.v2Runtime.setSubView(this.getActiveSubViewForMode(this.mode)),this.v2Runtime.syncVisualState(this.selectedPartId,this.hoveredPartId,this.hiddenPartIds,this.isolatedPartId,this.renderMode),this.updateClippingPlane(),this.markDirty(2)}setLensSection(e,t=!1){const n=this.lensSection!==e;if(this.lensSection=e,this.mode==="lens"){if(!n&&!t){this.setCameraPreset("iso",!1);return}this.selectedPartId=null,this.hoveredPartId=null,this.isolatedPartId=null,this.hiddenPartIds.clear(),this.v2Runtime.setSubView(e),this.v2Runtime.syncVisualState(null,null,this.hiddenPartIds,null,this.renderMode),this.updateClippingPlane(),this.setCameraPreset("iso",t),this.callbacks.onSelectPart(null),this.callbacks.onHoverPart(null),this.callbacks.onVisibilityChanged()}}getSensorFabVolume(){return this.sensorFabVolume}setSensorFabVolume(e,t=!1){const n=this.sensorFabVolume!==e;if(this.sensorFabVolume=e,this.mode==="sensor_fab"){if(!n&&!t){this.setCameraPreset("iso",!1);return}this.selectedPartId=null,this.hoveredPartId=null,this.isolatedPartId=null,this.hiddenPartIds.clear(),this.v2Runtime.setSubView(e),this.v2Runtime.syncVisualState(null,null,this.hiddenPartIds,null,this.renderMode),this.updateClippingPlane(),this.setCameraPreset("iso",t),this.callbacks.onSelectPart(null),this.callbacks.onHoverPart(null),this.callbacks.onVisibilityChanged()}}setMode(e,t=!1){this.mode===e&&this.initialActivated||(this.mode=e,e==="lens"&&(this.lensSection=1),this.selectedPartId=null,this.hoveredPartId=null,this.isolatedPartId=null,this.hiddenPartIds.clear(),this.pendingSelectAfterHydrate=null,this.updateClippingPlane(),this.setCameraPreset("iso",t),this.activateCurrentMode(),this.callbacks.onSelectPart(null),this.callbacks.onHoverPart(null),this.callbacks.onVisibilityChanged())}setExplode(e,t=!1){this.targetExplode=gr.clamp(e,0,1),t&&(this.currentExplode=this.targetExplode,this.v2Runtime.syncExplode(this.currentExplode)),this.markDirty()}getExplode(){return this.targetExplode}setRenderMode(e){this.renderMode=e,this.applyVisibilityAndStyles()}setQuality(e){this.quality!==e&&(this.quality=e,this.initialActivated&&this.v2Runtime.setQuality(e,this.camera,this.sectionAxis!=="off"),this.callbacks.onQualityChanged?.(e),this.markDirty(2))}getQuality(){return this.quality}setSection(e,t){this.sectionAxis=e,typeof t=="number"&&(this.sectionValue=gr.clamp(t,0,1)),this.updateClippingPlane()}setPhysicsActive(e){this.physicsActive=e,this.v2Runtime.syncPhysicsActive(e),this.markDirty()}selectPart(e,t=!0){if(e===null)this.pendingSelectAfterHydrate=null;else{if(!this.v2Runtime.getPartById(e)){this.v2Runtime.isReady()||(this.pendingSelectAfterHydrate={partId:e,focusCamera:t});return}if(this.v2Runtime.isPartCulledBySubView(e))return;this.pendingSelectAfterHydrate=null}if(e===this.selectedPartId)return;this.selectedPartId=e,e&&this.hiddenPartIds.has(e)&&this.hiddenPartIds.delete(e),e&&this.isolatedPartId&&this.isolatedPartId!==e&&(this.isolatedPartId=e),this.applyVisibilityAndStyles();const n=this.getSelectedPart();n&&t&&this.focusOnPart(n),this.callbacks.onSelectPart(n),this.callbacks.onVisibilityChanged()}setHoveredPartFromUI(e){this.hoveredPartId!==e&&(this.hoveredPartId=e,this.applyVisibilityAndStyles())}togglePartHidden(e){if(this.isolatedPartId){const t=this.isolatedPartId;this.isolatedPartId=null,e===t&&this.hiddenPartIds.add(e)}else this.hiddenPartIds.has(e)?this.hiddenPartIds.delete(e):this.hiddenPartIds.add(e);this.selectedPartId&&this.isPartHidden(this.selectedPartId)&&(this.selectedPartId=null,this.callbacks.onSelectPart(null)),this.applyVisibilityAndStyles(),this.callbacks.onVisibilityChanged()}toggleIsolateSelected(){this.selectedPartId&&(this.isolatedPartId===this.selectedPartId?this.isolatedPartId=null:(this.isolatedPartId=this.selectedPartId,this.hiddenPartIds.delete(this.selectedPartId)),this.applyVisibilityAndStyles(),this.callbacks.onVisibilityChanged())}resetAllVisibility(){this.isolatedPartId=null,this.hiddenPartIds.clear(),this.applyVisibilityAndStyles(),this.callbacks.onVisibilityChanged()}stepSelectedPart(e){const t=this.getPartsForCurrentMode();if(t.length===0)return;const n=t.findIndex(o=>o.id===this.selectedPartId),s=n<0?0:(n+e+t.length)%t.length;this.selectPart(t[s].id,!0)}setCameraPreset(e,t=!1){const n=this.targetExplode;let s,o;this.mode==="lens"?hn.studioOpen?(s=266+n*1080,o=new A(0+n*124,-2*(1-n),80+n*160)):this.lensSection===1?(s=186+n*625,o=new A(0+n*54,-1.5+n*10,47-n*102)):this.lensSection===2?(s=198+n*665,o=new A(0+n*64,-1-n*8,76.5+n*76)):(s=212+n*795,o=new A(0+n*96,-1+n*4,108+n*212)):this.mode==="camera_body"?(s=335+n*565,o=new A(-8-n*8,3+n*9,-10-n*18)):this.mode==="lcd"?(s=174+n*635,o=new A(14-n*4,-4+n*18,-32-n*14)):this.mode==="body"?(s=290+n*515,o=new A(-6+n*14,4-n*2,0+n*12)):this.mode==="mount"?(s=188+n*515,o=new A(2+n*8,-2-n*4,25+n*38)):this.mode==="evf"?(s=140+n*380,o=new A(1.5*(1-n)-n*14,38.6+n*1.5,-16.5+n*12)):this.mode==="mainboard"?(s=192+n*340,o=new A(-18*n,0+n*2,-22-n*4)):this.mode==="shutter"?(s=194+n*565,o=new A(6+n*14,-2.5+n*0,14+n*14)):this.mode==="integrated"?(s=390+n*1290,o=new A(-8-n*6,6+n*10,34+n*96)):this.mode==="sensor"?(s=168+n*475,o=new A(10*n,-2,-4-n*46)):this.mode==="battery"?(s=104+n*492,o=new A(n*4,n*-16,n*2)):this.mode==="cfexpress"?(s=136+n*475,o=new A(0,-.8+n*1.5,n*4)):this.mode==="bionz"?(s=122+n*245,o=new A(0,-1+n*1,0)):this.mode==="bionz_v2"?(s=124+n*282,o=new A(0,.2-n*1.2,0)):this.mode==="micro_v2"?(s=114+n*270,o=new A(0,-1-n*2,0)):this.mode==="mishoe"?(s=114+n*165,o=new A(0,-1.5-n*2.5,2.5+n*4)):this.mode==="mic"?(s=94+n*336,o=new A(0,1.5-n*2.5,.5+n*1.5)):this.mode==="sensor_fab"?this.sensorFabVolume===5?(s=248+n*238,o=new A(0,-1+n*1.5,2)):this.sensorFabVolume===4?(s=252+n*240,o=new A(0,-1.5+n*1.5,6.5)):this.sensorFabVolume===3?(s=248+n*238,o=new A(0,-1.5+n*1.5,6.5)):this.sensorFabVolume===2?(s=228+n*228,o=new A(0,2+n*1.5,.5)):(s=212+n*220,o=new A(0,1.5+n*2.5,-2.5)):this.mode==="drybox"?(s=242+n*212,o=new A(0,-3.5,-2*n)):(s=96+n*235,o=new A(20*n,1.5*n,-3-n*16)),this.camera.aspect<1&&(s*=Math.min(2.05,1.04/Math.max(this.camera.aspect,.48)));let a;if(this.mode==="evf"){const c=n>.25?-.88:-.78,d=n>.25?.17:.24,u=n>.25?-.44:-.58;switch(e){case"front":a=new A(0,2,-s);break;case"side":a=new A(-s*1.05,4,0);break;case"back":a=new A(s*.65,s*.28,s*.72);break;case"iso":default:a=new A(s*c,s*d,s*u);break}}else if(this.mode==="mainboard"||this.mode==="lcd"){const c=this.mode==="lcd"?n>.25?.56:.42:n>.25?-.68:-.44,d=this.mode==="lcd"?n>.25?-.78:-.86:n>.25?-.66:-.84;switch(e){case"front":a=new A(0,2,-s);break;case"side":a=new A(-s*1.04,8,0);break;case"back":a=new A(s*.52,s*.3,s*.8);break;case"iso":default:a=new A(s*c,s*.26,s*d);break}}else switch(e){case"front":a=new A(0,4,s);break;case"side":a=new A(-s*1.04,8,0);break;case"back":a=new A(-s*.42,s*.26,-s*.88);break;case"iso":default:if(this.mode==="integrated"){const c=n>.25?-.82:-.62,d=n>.25?.23:.27,u=n>.25?.52:.74;a=new A(s*c,s*d,s*u)}else if(this.mode==="camera_body"){const c=n>.25?-.78:-.62,d=n>.25?.24:.27,u=n>.25?.57:.74;a=new A(s*c,s*d,s*u)}else if(this.mode==="lens"){const c=n>.25?-.84:-.68,d=n>.25?.48:.69;a=new A(s*c,s*.25,s*d)}else if(this.mode==="body"){const c=n>.25?-.74:-.64,d=n>.25?.62:.72;a=new A(s*c,s*.28,s*d)}else if(this.mode==="mount"){const c=n>.25?.8:.58,d=n>.25?.56:.76;a=new A(s*c,s*.22,s*d)}else if(this.mode==="shutter")a=new A(s*.52,s*.28,s*.81);else if(this.mode==="sensor"){const c=n>.25?.82:.64,d=n>.25?.26:.38,u=n>.25?.51:.72;a=new A(s*c,s*d,s*u)}else this.mode==="battery"||this.mode==="cfexpress"?a=new A(s*.58,s*.3,s*.76):this.mode==="bionz"?a=new A(s*.62,s*.46,s*.64):this.mode==="bionz_v2"?a=new A(s*.62,s*.36,s*.68):this.mode==="micro_v2"?a=new A(s*.64,s*.34,s*.68):this.mode==="mishoe"?a=new A(s*.58,s*.42,s*.7):this.mode==="mic"?a=new A(-s*.5,s*.36,s*.78):this.mode==="sensor_fab"?a=new A(s*.38,s*.44,s*.81):this.mode==="drybox"?a=new A(s*.56,s*.24,s*.79):a=new A(s*.68,s*.44,s*.66);break}const l=o.clone().add(a);t?(this.camAnimActive=!1,this.camera.position.copy(l),this.controls.target.copy(o),this.controls.update(),this.markDirty()):this.animateCameraTo(l,o)}focusSensorFabStage(e,t=!1){if(this.mode!=="sensor_fab")return;if(e==="overview"||e==="v1_overview"||e==="v2_overview"||e==="v3_overview"||e==="v4_overview"||e==="v5_overview"){this.setCameraPreset("iso",t);return}const n=this.targetExplode,s=this.camera.aspect<1?Math.min(2.05,1.04/Math.max(this.camera.aspect,.48)):1;let o,a;if(e==="phases"){const c=(155+n*145)*s;o=new A(0,2.2+n*12,2.5+n*5),a=new A(c*.14,c*.46,c*.88)}else if(e==="litho"){const c=(138+n*135)*s;o=new A(0,-11.5-n*26,2),a=new A(c*.22,c*.34,c*.91)}else if(e==="variants"){const c=(104+n*85)*s;o=new A(10+n*8,3.6+n*18,-24-n*24),a=new A(c*.16,c*.34,c*.92)}else if(e==="v1_photonics"){const c=(118+n*110)*s;o=new A(-19-n*14,2.8+n*12,9.5+n*14),a=new A(c*.16,c*.42,c*.89)}else if(e==="v1_archs"){const c=(122+n*95)*s;o=new A(2,3.6+n*16,-20-n*22),a=new A(c*.12,c*.34,c*.93)}else if(e==="v1_duel"){const c=(128+n*110)*s;o=new A(7+n*8,2.6+n*14,4+n*8),a=new A(c*.14,c*.42,c*.89)}else if(e==="v1_wall"){const c=(146+n*125)*s;o=new A(8+n*6,-8.5-n*18,9+n*12),a=new A(c*.18,c*.34,c*.92)}else if(e==="v2_refine"){const c=(138+n*105)*s;o=new A(0,4.2+n*10,-21.5-n*14),a=new A(c*.14,c*.34,c*.93)}else if(e==="v2_mcz"){const c=(118+n*98)*s;o=new A(-22-n*6,4.8+n*11,-2-n*2),a=new A(c*.16,c*.34,c*.93)}else if(e==="v2_wafer"){const c=(138+n*110)*s;o=new A(-4-n*4,3.2+n*10,10+n*8),a=new A(c*.15,c*.38,c*.91)}else if(e==="v2_epi_ship"){const c=(150+n*120)*s;o=new A(14+n*5,-4.5-n*4,14+n*12),a=new A(c*.16,c*.32,c*.93)}else if(e==="v3_tcad"){const c=(136+n*105)*s;o=new A(0,3.5+n*14,-29-n*16),a=new A(c*.14,c*.36,c*.92)}else if(e==="v3_layout"){const c=(140+n*108)*s;o=new A(0,3+n*11,-12-n*3),a=new A(c*.15,c*.38,c*.91)}else if(e==="v3_opc"){const c=(136+n*105)*s;o=new A(0,3.2+n*8,5+n*14),a=new A(c*.16,c*.36,c*.92)}else if(e==="v3_maskfab"){const c=(158+n*128)*s;o=new A(0,-6.2-n*18,33.5+n*14),a=new A(c*.18,c*.34,c*.92)}else if(e==="v4_sti_dti"){const c=(142+n*108)*s;o=new A(0,3.6+n*15,-29-n*16),a=new A(c*.14,c*.36,c*.92)}else if(e==="v4_ppd_mev"){const c=(146+n*112)*s;o=new A(0,3.4+n*12,-12-n*3),a=new A(c*.15,c*.38,c*.91)}else if(e==="v4_vtg_gate"){const c=(138+n*105)*s;o=new A(0,3.4+n*10,5+n*14),a=new A(c*.16,c*.36,c*.92)}else if(e==="v4_pin_sab"){const c=(158+n*125)*s;o=new A(0,-6.5-n*11,33.5+n*14),a=new A(c*.18,c*.34,c*.92)}else if(e==="v5_w_m1"){const c=(142+n*108)*s;o=new A(0,3.6+n*14,-29-n*15),a=new A(c*.14,c*.36,c*.92)}else if(e==="v5_m2_m4"){const c=(146+n*112)*s;o=new A(0,3.4+n*11,-12-n*3),a=new A(c*.15,c*.38,c*.91)}else if(e==="v5_m5_wat"){const c=(138+n*105)*s;o=new A(0,3.4+n*9,5+n*12),a=new A(c*.16,c*.36,c*.92)}else{const c=(144+n*112)*s;o=new A(0,-6.5-n*10,29+n*14),a=new A(c*.18,c*.34,c*.92)}const l=o.clone().add(a);t?(this.camAnimActive=!1,this.camera.position.copy(l),this.controls.target.copy(o),this.controls.update(),this.markDirty()):this.animateCameraTo(l,o)}focusOnPart(e){this.v2Runtime.getPartWorldBox(e.id,Ro)||Ro.setFromObject(e.group),Ro.getCenter(Lo),lr.subVectors(this.camera.position,this.controls.target);const t=this.mode==="micro"||this.mode==="micro_v2"||this.mode==="bionz"||this.mode==="bionz_v2"||this.mode==="mishoe"||this.mode==="mic",n=this.mode==="battery"||this.mode==="cfexpress",s=this.mode==="sensor_fab",o=this.mode==="drybox",a=t?72:s?68:o?148:n?98:this.mode==="evf"?112:this.mode==="integrated"||this.mode==="camera_body"?280:168,l=t?34:s?28:o?48:n?38:this.mode==="evf"?44:56,c=Math.min(lr.length(),a);lr.setLength(Math.max(c,l));const d=Lo.clone().add(lr);this.animateCameraTo(d,Lo.clone())}wakeLoop(){this.idleFrameStreak=0,this.rafId===0&&!this.disposed&&!this.contextLost&&!this.pageHidden&&(this.clock.getDelta(),this.rafId=requestAnimationFrame(this.animate))}animateCameraTo(e,t){this.camStartPos.copy(this.camera.position),this.camEndPos.copy(e),this.camStartTarget.copy(this.controls.target),this.camEndTarget.copy(t),this.camAnimT=0,this.camAnimActive=!0,this.wakeLoop()}markDirty(e=3){this.dirtyFrames=Math.max(this.dirtyFrames,e),this.wakeLoop()}requestRenderFrame(){this.markDirty(2)}frameLensForOpticsStudio(e=!1){const t=new A(0,-36,74),n=new A(-348,56,178);this.refreshVisibility(),e?(this.camAnimActive=!1,this.camera.position.copy(n),this.controls.target.copy(t),this.controls.update(),this.markDirty()):this.animateCameraTo(n,t)}handleResize(){const e=Math.max(1,this.container.clientWidth),t=Math.max(1,this.container.clientHeight);this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.v2Runtime.handleResize(),this.cachedDomRect=this.renderer.domElement.getBoundingClientRect(),this.markDirty()}updateClippingPlane(){if(this.sectionAxis==="off"){this.clippingPlane.normal.set(-1,0,0),this.clippingPlane.constant=1e4,this.v2Runtime.syncSectionPlane(!1),this.markDirty();return}let e=-48,t=48;this.mode==="micro"?(e=-13,t=13):this.mode==="micro_v2"?(e=-16,t=16):this.mode==="battery"||this.mode==="cfexpress"?(e=-30,t=30):this.mode==="bionz"?this.sectionAxis==="x"?(e=-48,t=48):(e=-16,t=18):this.mode==="bionz_v2"?this.sectionAxis==="x"?(e=-20,t=20):(e=-16,t=18):this.mode==="mishoe"?this.sectionAxis==="x"?(e=-32,t=32):(e=-15,t=12):this.mode==="mic"?this.sectionAxis==="x"?(e=-30,t=30):(e=-16,t=20):this.mode==="sensor_fab"?this.sectionAxis==="x"?(e=-54,t=54):(e=-18,t=24):this.mode==="drybox"?this.sectionAxis==="x"?(e=-30,t=30):(e=-55,t=55):this.mode==="lens"?(e=-46,t=46):this.mode==="lcd"?this.sectionAxis==="x"?(e=-34,t=50):(e=-34,t=22):this.mode==="body"||this.mode==="camera_body"||this.mode==="integrated"?this.sectionAxis==="x"?(e=-74,t=60):(e=-42,t=64):this.mode==="mount"?this.sectionAxis==="x"?(e=-50,t=50):(e=-44,t=46):this.mode==="evf"?this.sectionAxis==="x"?(e=-24,t=24):(e=18,t=60):this.mode==="mainboard"?this.sectionAxis==="x"?(e=-50,t=50):(e=-36,t=36):this.mode==="shutter"&&(this.sectionAxis==="x"?(e=-48,t=50):(e=-35,t=35));const n=gr.lerp(e,t,this.sectionValue);this.sectionAxis==="x"?(this.clippingPlane.normal.set(-1,0,0),this.clippingPlane.constant=n):(this.clippingPlane.normal.set(0,-1,0),this.clippingPlane.constant=n),this.v2Runtime.syncSectionPlane(!0),this.markDirty()}applyVisibilityAndStyles(){this.v2Runtime.syncVisualState(this.selectedPartId,this.hoveredPartId,this.hiddenPartIds,this.isolatedPartId,this.renderMode),this.markDirty(2)}bindEvents(){const e=this.renderer.domElement;this.cachedDomRect=e.getBoundingClientRect(),this.controls.addEventListener("start",()=>{this.v2Runtime.setCameraDragging(!0),this.wakeLoop()}),this.controls.addEventListener("end",()=>{this.v2Runtime.setCameraDragging(!1)}),e.addEventListener("pointerdown",t=>{this.pointerDownPos.set(t.clientX,t.clientY),this.camAnimActive=!1,this.markDirty()}),e.addEventListener("pointermove",t=>{if(t.pointerType==="touch")return;const n=this.cachedDomRect??(this.cachedDomRect=e.getBoundingClientRect());n.width<=0||n.height<=0||(this.pointer.x=(t.clientX-n.left)/n.width*2-1,this.pointer.y=-((t.clientY-n.top)/n.height)*2+1,this.hoverRaycastPending=!0,this.wakeLoop())}),e.addEventListener("pointerleave",()=>{this.hoverRaycastPending=!1,this.hoveredPartId!==null&&(this.hoveredPartId=null,this.container.classList.remove("is-hovering"),this.applyVisibilityAndStyles(),this.callbacks.onHoverPart(null))}),e.addEventListener("pointerup",t=>{if(Math.hypot(t.clientX-this.pointerDownPos.x,t.clientY-this.pointerDownPos.y)>5)return;const s=this.cachedDomRect??(this.cachedDomRect=e.getBoundingClientRect());if(s.width<=0||s.height<=0)return;this.pointer.x=(t.clientX-s.left)/s.width*2-1,this.pointer.y=-((t.clientY-s.top)/s.height)*2+1;const o=this.v2Runtime.pickClick(this.pointer,this.camera,a=>this.isPartHidden(a),this.sectionAxis!=="off"?this.clippingPlane:null);o?this.selectPart(o,!0):this.selectedPartId&&this.selectPart(null,!1)}),e.addEventListener("wheel",()=>this.wakeLoop(),{passive:!0}),e.addEventListener("touchstart",()=>this.wakeLoop(),{passive:!0}),e.addEventListener("webglcontextlost",this.boundContextLost,!1),e.addEventListener("webglcontextrestored",this.boundContextRestored,!1),document.addEventListener("visibilitychange",this.boundVisibilityChange),window.addEventListener("resize",this.boundHandleResize),document.addEventListener("fullscreenchange",this.boundHandleResize),typeof ResizeObserver<"u"&&(this.resizeObserver=new ResizeObserver(this.boundHandleResize),this.resizeObserver.observe(this.container))}handleContextLost(e){e.preventDefault(),this.contextLost=!0,this.contextLossCount++,this.v2Runtime.handleContextLost(),this.recoveryOverlay.classList.add("is-visible")}handleContextRestored(){this.contextLost=!1,this.recoveryOverlay.classList.remove("is-visible"),this.cachedDomRect=this.renderer.domElement.getBoundingClientRect(),this.v2Runtime.handleContextRestored(this.camera,this.sectionAxis!=="off"),this.markDirty(2)}handleVisibilityChange(){this.pageHidden=document.hidden,!this.pageHidden&&!this.contextLost&&(this.clock.getDelta(),this.markDirty(3))}getGpuStats(){const e=this.renderer.info,t=this.v2Runtime.getDiagnostics();return{profile:ii,quality:this.quality,ultraHealthy:!0,pixelRatio:this.renderer.getPixelRatio(),contextLost:this.contextLost,contextLossCount:this.contextLossCount,calls:t.drawCalls,triangles:t.triangles,lines:e.render.lines,geometries:e.memory.geometries,textures:e.memory.textures,programs:e.programs?e.programs.length:0,hydratedParts:t.ready?this.v2Runtime.getParts().length:0,totalParts:this.getTotalPartCount(),megaBatches:0,kinematicBones:0}}updateHoverFromRaycast(){const e=this.v2Runtime.pickHover(this.pointer,this.camera,n=>this.isPartHidden(n),this.sectionAxis!=="off"?this.clippingPlane:null);if(e.skipped)return;const t=e.partId;t!==this.hoveredPartId&&(this.hoveredPartId=t,this.container.classList.toggle("is-hovering",t!==null),this.applyVisibilityAndStyles(),this.callbacks.onHoverPart(t))}animate=()=>{if(this.rafId=0,this.disposed||this.contextLost||this.pageHidden)return;this.hoverRaycastPending&&(this.hoverRaycastPending=!1,this.updateHoverFromRaycast());const e=Math.min(this.clock.getDelta(),.05),t=this.clock.getElapsedTime(),n=this.v2Runtime.needsContinuousAnimation(this.physicsActive);let s=n||this.dirtyFrames>0;const o=this.targetExplode-this.currentExplode;if(Math.abs(o)>5e-4?(this.currentExplode+=o*Math.min(1,e*10),s=!0):this.currentExplode!==this.targetExplode&&(this.currentExplode=this.targetExplode,s=!0),this.camAnimActive){this.camAnimT=Math.min(1,this.camAnimT+e*2.8);const l=1-Math.pow(1-this.camAnimT,3);this.camera.position.lerpVectors(this.camStartPos,this.camEndPos,l),this.controls.target.lerpVectors(this.camStartTarget,this.camEndTarget,l),this.camAnimT>=1&&(this.camAnimActive=!1),s=!0}this.controls.update()&&(s=!0),s?(this.idleFrameStreak=0,this.v2Runtime.syncExplode(this.currentExplode),(this.physicsActive||n)&&this.v2Runtime.stepPhysics(t,e),this.v2Runtime.render(this.camera),this.dirtyFrames>0&&this.dirtyFrames--):this.idleFrameStreak++,s||this.hoverRaycastPending||n||this.camAnimActive||this.dirtyFrames>0||this.idleFrameStreak<1?this.rafId=requestAnimationFrame(this.animate):this.v2Runtime.markIdle()};dispose(){this.disposed=!0,this.rafId!==0&&(cancelAnimationFrame(this.rafId),this.rafId=0);const e=this.renderer.domElement;e.removeEventListener("webglcontextlost",this.boundContextLost),e.removeEventListener("webglcontextrestored",this.boundContextRestored),document.removeEventListener("visibilitychange",this.boundVisibilityChange),window.removeEventListener("resize",this.boundHandleResize),document.removeEventListener("fullscreenchange",this.boundHandleResize),this.resizeObserver?.disconnect(),this.v2Runtime.dispose(),this.recoveryOverlay.remove(),this.controls.dispose(),this.renderer.dispose()}}const R0="http://www.w3.org/2000/svg";function cn(i,e="0 0 24 24"){const t=document.createElementNS(R0,"svg");return t.setAttribute("viewBox",e),t.setAttribute("aria-hidden","true"),t.innerHTML=i,t}function et(i,e="icon-btn",t="0 0 24 24"){const n=document.createElement("button");return n.type="button",n.className=e,n.appendChild(cn(i,t)),n}const Ne={completeCamera:'<path d="M3 9.5a2 2 0 0 1 2-2h2.2l1.6-2.5h6.4l1.6 2.5H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8z"/><circle cx="12" cy="13.5" r="3.8"/><circle cx="12" cy="13.5" r="1.4" fill="currentColor" stroke="none"/><line x1="17" y1="10.2" x2="18.6" y2="10.2"/>',cameraBodyOnly:'<path d="M3 9.5a2 2 0 0 1 2-2h2.2l1.6-2.5h6.4l1.6 2.5H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8z"/><circle cx="12" cy="13.5" r="4.1" stroke-dasharray="2.4 1.6"/><rect x="9.6" y="11.8" width="4.8" height="3.4" rx="0.6"/>',lensModule:'<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 6.5c1.8 3.2 1.8 7.8 0 11"/><path d="M12.5 6.5c-1.5 3.2-1.5 7.8 0 11"/><path d="M17 6.5c1.6 3.2 1.6 7.8 0 11"/><line x1="10.2" y1="6" x2="10.2" y2="18" stroke-dasharray="2 2"/>',lensSec1:'<rect x="3" y="4" width="2.2" height="11" rx="0.6" fill="currentColor" stroke="none"/><rect x="6" y="3.5" width="10.5" height="12" rx="1.6" fill="currentColor"/><rect x="18.5" y="3" width="10.5" height="13" rx="1.4" opacity="0.32"/><path d="M31 3h8.5l3 1.8v9.4l-3 1.8H31z" opacity="0.32"/><circle cx="11.2" cy="20.2" r="2.0" fill="currentColor" stroke="none"/><circle cx="23.8" cy="20.2" r="1.4" opacity="0.34"/><circle cx="36.2" cy="20.2" r="1.4" opacity="0.34"/>',lensSec2:'<rect x="3" y="4" width="2.2" height="11" rx="0.6" opacity="0.32"/><rect x="6" y="3.5" width="10.5" height="12" rx="1.6" opacity="0.32"/><rect x="18.5" y="3" width="10.5" height="13" rx="1.4" fill="currentColor"/><path d="M31 3h8.5l3 1.8v9.4l-3 1.8H31z" opacity="0.32"/><circle cx="11.2" cy="20.2" r="1.4" opacity="0.34"/><circle cx="23.8" cy="20.2" r="2.0" fill="currentColor" stroke="none"/><circle cx="36.2" cy="20.2" r="1.4" opacity="0.34"/>',lensSec3:'<rect x="3" y="4" width="2.2" height="11" rx="0.6" opacity="0.32"/><rect x="6" y="3.5" width="10.5" height="12" rx="1.6" opacity="0.32"/><rect x="18.5" y="3" width="10.5" height="13" rx="1.4" opacity="0.32"/><path d="M31 3h8.5l3 1.8v9.4l-3 1.8H31z" fill="currentColor"/><circle cx="11.2" cy="20.2" r="1.4" opacity="0.34"/><circle cx="23.8" cy="20.2" r="1.4" opacity="0.34"/><circle cx="36.2" cy="20.2" r="2.0" fill="currentColor" stroke="none"/>',mountModule:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5.3"/><circle cx="12" cy="5.1" r="1.05" fill="currentColor" stroke="none"/><line x1="8.3" y1="8.3" x2="9.7" y2="9.7"/><line x1="15.7" y1="8.3" x2="14.3" y2="9.7"/><line x1="8.3" y1="15.7" x2="9.7" y2="14.3"/><line x1="15.7" y1="15.7" x2="14.3" y2="14.3"/><circle cx="10" cy="18.6" r="0.7" fill="currentColor" stroke="none"/><circle cx="12" cy="18.9" r="0.7" fill="currentColor" stroke="none"/><circle cx="14" cy="18.6" r="0.7" fill="currentColor" stroke="none"/>',shutterModule:'<rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="9.5" x2="21" y2="9.5"/><line x1="3" y1="14.5" x2="21" y2="14.5"/><line x1="3" y1="6.8" x2="21" y2="6.8" opacity="0.45"/><line x1="3" y1="17.2" x2="21" y2="17.2" opacity="0.45"/><line x1="17.5" y1="4" x2="17.5" y2="20" opacity="0.5"/>',macroSensor:'<rect x="3" y="5" width="18" height="14" rx="2"/><rect x="7" y="8.5" width="10" height="7" rx="1"/><line x1="7" y1="3" x2="7" y2="5"/><line x1="12" y1="3" x2="12" y2="5"/><line x1="17" y1="3" x2="17" y2="5"/><line x1="7" y1="19" x2="7" y2="21"/><line x1="12" y1="19" x2="12" y2="21"/><line x1="17" y1="19" x2="17" y2="21"/>',mainboardIsp:'<rect x="3" y="4" width="18" height="16" rx="2"/><rect x="8.5" y="8.5" width="7" height="7" rx="1"/><line x1="8.5" y1="12" x2="5.5" y2="12"/><line x1="15.5" y1="12" x2="18.5" y2="12"/><line x1="12" y1="8.5" x2="12" y2="5.5"/><line x1="12" y1="15.5" x2="12" y2="18.5"/><circle cx="5.5" cy="7.5" r="0.9" fill="currentColor" stroke="none"/><circle cx="18.5" cy="7.5" r="0.9" fill="currentColor" stroke="none"/><circle cx="18.5" cy="16.5" r="0.9" fill="currentColor" stroke="none"/>',evfModule:'<path d="M4 17v-5l3.5-5h9L20 12v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M7.5 13.5c1.2-2.2 3-3.3 4.5-3.3s3.3 1.1 4.5 3.3c-1.2 2.2-3 3.3-4.5 3.3s-3.3-1.1-4.5-3.3z"/><circle cx="12" cy="13.5" r="1.4" fill="currentColor" stroke="none"/><line x1="9" y1="4.5" x2="15" y2="4.5"/>',lcdModule:'<rect x="6.5" y="6" width="14" height="10.5" rx="1.6"/><line x1="4" y1="7.5" x2="4" y2="15"/><line x1="4" y1="11.2" x2="6.5" y2="11.2"/><path d="M8.5 19.2c2.5 1.1 5.5 1.1 8 0"/><polyline points="15.2 18 17 19.1 15.6 20.6"/>',bodyModule:'<rect x="4" y="6.5" width="9.5" height="13" rx="1.8"/><line x1="6.8" y1="4" x2="10.7" y2="4"/><path d="M9.6 10.2l-2 3.2h2.4l-1.8 3.2"/><circle cx="17.8" cy="9.5" r="2.7"/><rect x="15.5" y="14.2" width="4.6" height="5.3" rx="1.2"/>',microPixel:'<path d="M4 10c0-2.5 2-4 4-4s4 1.5 4 4"/><path d="M12 10c0-2.5 2-4 4-4s4 1.5 4 4"/><rect x="4" y="10" width="16" height="3.5" rx="0.5"/><rect x="4" y="15.5" width="16" height="3.5" rx="0.5"/>',batteryPack:'<rect x="5" y="5.5" width="14" height="15.5" rx="2"/><rect x="8.5" y="2.8" width="7" height="2.7" rx="0.7"/><path d="M13.2 8.8l-3.4 4.7h2.7l-1.5 4.7 3.7-5.4h-2.7z" fill="currentColor" stroke="none"/>',cfexpressCard:'<path d="M5.5 5.2a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v12.3L16.5 20h-9a2 2 0 0 1-2-2V5.2z"/><line x1="8.2" y1="6.4" x2="15.8" y2="6.4"/><line x1="8.2" y1="8.8" x2="15.8" y2="8.8" opacity="0.55"/><line x1="8.5" y1="15.4" x2="8.5" y2="18.2"/><line x1="11.0" y1="15.4" x2="11.0" y2="18.2"/><line x1="13.5" y1="15.4" x2="13.5" y2="18.2"/><line x1="15.8" y1="15.4" x2="15.8" y2="18.2"/>',bionzModule:'<rect x="5" y="4.5" width="14" height="4" rx="1"/><rect x="3.5" y="10.5" width="17" height="5.5" rx="1.2"/><rect x="8" y="11.8" width="8" height="2.9" rx="0.5"/><line x1="8" y1="8.5" x2="8" y2="10.5"/><line x1="16" y1="8.5" x2="16" y2="10.5"/><circle cx="6.5" cy="18.8" r="1.05" fill="currentColor" stroke="none"/><circle cx="10.2" cy="18.8" r="1.05" fill="currentColor" stroke="none"/><circle cx="13.8" cy="18.8" r="1.05" fill="currentColor" stroke="none"/><circle cx="17.5" cy="18.8" r="1.05" fill="currentColor" stroke="none"/>',miShoeModule:'<path d="M4 19V7.5h4.5v2.2H6.4v6.8h11.2V9.7h-2.1V7.5H20V19H4z"/><circle cx="12" cy="13.4" r="2.1"/><circle cx="8" cy="5.2" r="0.85" fill="currentColor" stroke="none"/><circle cx="10.6" cy="5.2" r="0.85" fill="currentColor" stroke="none"/><circle cx="13.4" cy="5.2" r="0.85" fill="currentColor" stroke="none"/><circle cx="16" cy="5.2" r="0.85" fill="currentColor" stroke="none"/>',micModule:'<rect x="9" y="5" width="6" height="9.5" rx="3"/><path d="M6.5 11.5a5.5 5.5 0 0 0 11 0"/><line x1="12" y1="17" x2="12" y2="20"/><line x1="9" y1="20" x2="15" y2="20"/><path d="M4.2 7.5a5.2 5.2 0 0 0 0 6.2" opacity="0.72"/><path d="M19.8 7.5a5.2 5.2 0 0 1 0 6.2" opacity="0.72"/>',sensorFab:'<circle cx="12" cy="12" r="8.6"/><line x1="6.4" y1="9.2" x2="17.6" y2="9.2"/><line x1="6.4" y1="14.8" x2="17.6" y2="14.8"/><line x1="9.2" y1="6.2" x2="9.2" y2="17.8"/><line x1="14.8" y1="6.2" x2="14.8" y2="17.8"/><rect x="9.8" y="9.8" width="4.4" height="4.4" rx="0.5" fill="currentColor" stroke="none"/><path d="M10.8 20.5 L12 18.8 L13.2 20.5" fill="currentColor" stroke="none"/>',dryboxCabinet:'<rect x="4.5" y="2.8" width="15" height="18.4" rx="1.8"/><line x1="4.5" y1="6.8" x2="19.5" y2="6.8"/><line x1="6.8" y1="13.5" x2="17.2" y2="13.5" opacity="0.65"/><line x1="6.8" y1="17.2" x2="17.2" y2="17.2" opacity="0.65"/><line x1="16.8" y1="9.2" x2="16.8" y2="11.6"/><path d="M10.8 8.3c0 0-2 2.2-2 3.3a2 2 0 1 0 4 0c0-1.1-2-3.3-2-3.3z"/><line x1="7.2" y1="4.8" x2="13.2" y2="4.8"/>',assembled:'<polygon points="12 5 20 9.5 12 14 4 9.5 12 5"/><polyline points="4 13 12 17.5 20 13"/>',exploded:'<polygon points="12 2.5 20 6.5 12 10.5 4 6.5 12 2.5"/><polyline points="4 12 12 16 20 12"/><polyline points="4 17.5 12 21.5 20 17.5"/>',sectionOff:'<rect x="4" y="4" width="16" height="16" rx="2"/><line x1="12" y1="2" x2="12" y2="22" stroke-dasharray="2.5 2.5"/>',sectionX:'<path d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6"/><line x1="12" y1="2" x2="12" y2="22"/><path d="M15 8l4 4-4 4" opacity="0.55"/>',sectionY:'<path d="M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M8 9l4-4 4 4" opacity="0.55"/>',renderSolid:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"/><path d="M12 12l8-4.5"/><path d="M12 12v9"/><path d="M12 12L4 7.5"/>',renderXray:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" stroke-dasharray="2.5 2"/><circle cx="12" cy="12" r="3"/>',renderCad:'<polygon points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"/><line x1="12" y1="3" x2="12" y2="21"/><line x1="4" y1="7.5" x2="20" y2="16.5" opacity="0.45"/><line x1="20" y1="7.5" x2="4" y2="16.5" opacity="0.45"/>',physicsRays:'<line x1="3" y1="6" x2="12" y2="12"/><line x1="3" y1="12" x2="12" y2="12"/><line x1="3" y1="18" x2="12" y2="12"/><line x1="12" y1="12" x2="21" y2="7"/><line x1="12" y1="12" x2="21" y2="12"/><line x1="12" y1="12" x2="21" y2="17"/><circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none"/>',opticsStudio:'<path d="M9.8 4.2c2.8 4.6 2.8 11 0 15.6c-2.8-4.6-2.8-11 0-15.6z"/><path d="M2.5 8h6.4l11.6 4"/><path d="M2.5 16h6.4l11.6-4"/><line x1="2.5" y1="12" x2="20.5" y2="12" opacity="0.45"/><circle cx="20.5" cy="12" r="1.6" fill="currentColor" stroke="none"/>',eyeAll:'<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="2.8"/>',eyeClosed:'<path d="M3 3l18 18"/><path d="M10.6 10.6a2.5 2.5 0 0 0 3.5 3.5"/><path d="M6.4 6.7C4 8.2 2.4 10.5 2 12c1.2 3.2 5 6.5 10 6.5 1.8 0 3.5-.5 4.9-1.2"/><path d="M9.8 5.7A10.6 10.6 0 0 1 12 5.5c5 0 8.8 3.3 10 6.5-.4 1.1-1.2 2.4-2.4 3.6"/>',fullscreenEnter:'<polyline points="4 9 4 4 9 4"/><polyline points="15 4 20 4 20 9"/><polyline points="20 15 20 20 15 20"/><polyline points="9 20 4 20 4 15"/>',fullscreenExit:'<polyline points="9 4 9 9 4 9"/><polyline points="20 9 15 9 15 4"/><polyline points="15 20 15 15 20 15"/><polyline points="4 15 9 15 9 20"/>',viewIso:'<path d="M12 3l7.5 4.2v8.6L12 20l-7.5-4.2V7.2L12 3z"/><path d="M12 11.5L19.5 7.2"/><path d="M12 11.5V20"/><path d="M12 11.5L4.5 7.2"/>',viewFront:'<rect x="5" y="5" width="14" height="14" rx="2"/><circle cx="12" cy="12" r="3.2"/>',viewSide:'<rect x="9" y="4" width="6" height="16" rx="1.5"/><line x1="4" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="20" y2="12"/>',viewBack:'<rect x="5" y="5" width="14" height="14" rx="2"/><line x1="8.5" y1="8.5" x2="15.5" y2="15.5"/><line x1="15.5" y1="8.5" x2="8.5" y2="15.5"/>',ultraRayStar:'<path d="M12 2.5l2.1 6.2 6.4 3.3-6.4 3.3L12 21.5l-2.1-6.2-6.4-3.3 6.4-3.3z"/>'};class L0{root;handlers;integratedBtn;cameraBodyBtn;lensBtn;mountBtn;shutterBtn;sensorBtn;mainboardBtn;evfBtn;lcdBtn;bodyBtn;microBtn;batteryBtn;cfexpressBtn;bionzBtn;mishoeBtn;micBtn;sensorFabBtn;dryboxBtn;lensSectionBar;lensSec1Btn;lensSec2Btn;lensSec3Btn;v2PhaseBar;v1PhaseBtn;v2PhaseBtn;fabStageBar;fabVolBtns;fabStageGroups;fabStageBtns;qualityStdBtn;qualityHighBtn;qualityUltraBtn;explodeRange;assembleBtn;explodeBtn;sectionBtn;sectionRange;solidBtn;xrayBtn;cadBtn;physicsBtn;opticsStudioBtn;resetVisBtn;fullscreenBtn;layerRail;layerRowMap=new Map;layerEyeMap=new Map;renderedPartIds=[];lastDelegatedHoverId=null;prevSelectedRow=null;prevHoveredRow=null;currentMode="integrated";currentLensSection=1;currentFabVolume=0;currentFabStage="overview";currentSectionAxis="off";currentRenderMode="solid";currentQuality="ultra";physicsActive=!1;constructor(e,t){this.root=e,this.handlers=t;const n=document.createElement("div");n.className="view-cluster";const s=et(Ne.viewIso),o=et(Ne.viewFront),a=et(Ne.viewSide),l=et(Ne.viewBack);s.addEventListener("click",()=>this.handlers.onCameraPreset("iso")),o.addEventListener("click",()=>this.handlers.onCameraPreset("front")),a.addEventListener("click",()=>this.handlers.onCameraPreset("side")),l.addEventListener("click",()=>this.handlers.onCameraPreset("back")),n.append(s,o,a,l),this.root.appendChild(n);const c=document.createElement("div");c.className="quality-cluster",c.setAttribute("role","group"),c.setAttribute("aria-label","画質設定");const d=(le,Ie,Oe=!1)=>{const q=document.createElement("button");q.type="button",q.className=le==="ultra"?"quality-btn is-ultra":"quality-btn",q.dataset.quality=le,Oe&&q.appendChild(cn(Ne.ultraRayStar));const de=document.createElement("span");return de.textContent=Ie,q.appendChild(de),q.addEventListener("click",()=>this.setQuality(le)),q};this.qualityStdBtn=d("standard","STD"),this.qualityHighBtn=d("high","HIGH"),this.qualityUltraBtn=d("ultra","ULTRA",!0),this.qualityUltraBtn.classList.add("is-active"),c.append(this.qualityStdBtn,this.qualityHighBtn,this.qualityUltraBtn),this.root.appendChild(c),this.lensSectionBar=document.createElement("div"),this.lensSectionBar.className="lens-section-bar is-hidden",this.lensSec1Btn=et(Ne.lensSec1,"lens-section-btn is-active","0 0 46 24"),this.lensSec1Btn.dataset.lensSection="1",this.lensSec1Btn.setAttribute("aria-label","レンズ後部 1/3"),this.lensSec2Btn=et(Ne.lensSec2,"lens-section-btn","0 0 46 24"),this.lensSec2Btn.dataset.lensSection="2",this.lensSec2Btn.setAttribute("aria-label","レンズ中央部 2/3"),this.lensSec3Btn=et(Ne.lensSec3,"lens-section-btn","0 0 46 24"),this.lensSec3Btn.dataset.lensSection="3",this.lensSec3Btn.setAttribute("aria-label","レンズ前部 3/3"),this.lensSec1Btn.addEventListener("click",()=>this.setLensSection(1)),this.lensSec2Btn.addEventListener("click",()=>this.setLensSection(2)),this.lensSec3Btn.addEventListener("click",()=>this.setLensSection(3)),this.lensSectionBar.append(this.lensSec1Btn,this.lensSec2Btn,this.lensSec3Btn),this.root.appendChild(this.lensSectionBar),this.v2PhaseBar=document.createElement("div"),this.v2PhaseBar.className="v2-phase-bar is-hidden",this.v2PhaseBar.setAttribute("role","group"),this.v2PhaseBar.setAttribute("aria-label","極超解剖 V1 / V2 切替"),this.v1PhaseBtn=document.createElement("button"),this.v1PhaseBtn.type="button",this.v1PhaseBtn.className="v2-phase-btn is-v1 is-active",this.v1PhaseBtn.dataset.phaseVersion="v1",this.v1PhaseBtn.setAttribute("aria-label","V1 個別解剖図");const u=document.createElement("span");u.textContent="V1",this.v1PhaseBtn.appendChild(u),this.v2PhaseBtn=document.createElement("button"),this.v2PhaseBtn.type="button",this.v2PhaseBtn.className="v2-phase-btn is-v2",this.v2PhaseBtn.dataset.phaseVersion="v2",this.v2PhaseBtn.setAttribute("aria-label","V2 さらに微細な部品極超解剖図"),this.v2PhaseBtn.appendChild(cn(Ne.ultraRayStar));const f=document.createElement("span");f.textContent="V2",this.v2PhaseBtn.appendChild(f),this.v1PhaseBtn.addEventListener("click",()=>{this.currentMode==="micro_v2"?this.setMode("micro"):this.currentMode==="bionz_v2"&&this.setMode("bionz")}),this.v2PhaseBtn.addEventListener("click",()=>{this.currentMode==="micro"?this.setMode("micro_v2"):this.currentMode==="bionz"&&this.setMode("bionz_v2")}),this.v2PhaseBar.append(this.v1PhaseBtn,this.v2PhaseBtn),this.root.appendChild(this.v2PhaseBar),this.fabStageBar=document.createElement("div"),this.fabStageBar.className="fab-stage-bar is-hidden",this.fabStageBar.setAttribute("role","group"),this.fabStageBar.setAttribute("aria-label","センサー製造工程 巻・ステージ切替");const r=(le,Ie)=>{const Oe=document.createElement("button");Oe.type="button",Oe.className=le===0?"fab-vol-btn is-active":"fab-vol-btn",Oe.dataset.fabVol=String(le);const q=document.createElement("span");return q.textContent=Ie,Oe.appendChild(q),Oe.addEventListener("click",()=>this.setFabVolume(le)),Oe},p=document.createElement("div");p.className="fab-vol-group",this.fabVolBtns={0:r(0,"0巻 総目次"),1:r(1,"1巻 超入門"),2:r(2,"2巻 Wafer"),3:r(3,"3巻 マスク"),4:r(4,"4巻 FEOL"),5:r(5,"5巻 BEOL")},p.append(this.fabVolBtns[0],this.fabVolBtns[1],this.fabVolBtns[2],this.fabVolBtns[3],this.fabVolBtns[4],this.fabVolBtns[5]);const v=document.createElement("div");v.className="fab-stage-divider";const x=(le,Ie)=>{const Oe=document.createElement("button");Oe.type="button",Oe.className=le==="overview"||le==="v1_overview"||le==="v2_overview"||le==="v3_overview"||le==="v4_overview"||le==="v5_overview"?"fab-stage-btn is-active":"fab-stage-btn",Oe.dataset.fabStage=le;const q=document.createElement("span");return q.textContent=Ie,Oe.appendChild(q),Oe.addEventListener("click",()=>this.setFabStage(le)),Oe};this.fabStageBtns={overview:x("overview","全体"),phases:x("phases","P1–P12"),litho:x("litho","L01–L12"),variants:x("variants","5方式比較"),v1_overview:x("v1_overview","全体"),v1_photonics:x("v1_photonics","1.光→写真"),v1_archs:x("v1_archs","2.6大構造"),v1_duel:x("v1_duel","3.Sony対Canon"),v1_wall:x("v1_wall","4.露光の壁"),v2_overview:x("v2_overview","全体"),v2_refine:x("v2_refine","1A-B 11N精製"),v2_mcz:x("v2_mcz","1C MCZ単結晶"),v2_wafer:x("v2_wafer","1D-E 切断・CMP"),v2_epi_ship:x("v2_epi_ship","1F-G ゲッタ・出荷"),v3_overview:x("v3_overview","全体"),v3_tcad:x("v3_tcad","2A TCAD/光学"),v3_layout:x("v3_layout","2B 回路・配置"),v3_opc:x("v3_opc","2C OPC・分割"),v3_maskfab:x("v3_maskfab","2D-E マスク製造"),v4_overview:x("v4_overview","全体"),v4_sti_dti:x("v4_sti_dti","3A-B STI・DTI"),v4_ppd_mev:x("v4_ppd_mev","3C RGB注入"),v4_vtg_gate:x("v4_vtg_gate","3D VTG・ゲート"),v4_pin_sab:x("v4_pin_sab","3E-F P+・SAB"),v5_overview:x("v5_overview","全体"),v5_w_m1:x("v5_w_m1","4A-B W釘・M1"),v5_m2_m4:x("v5_m2_m4","4C M2–M4"),v5_m5_wat:x("v5_m5_wat","4D M5・WAT"),v5_hb_cmp:x("v5_hb_cmp","4E Cu-Cu接合")};const g=document.createElement("div");g.className="fab-stage-group",g.append(this.fabStageBtns.overview,this.fabStageBtns.phases,this.fabStageBtns.litho,this.fabStageBtns.variants);const m=document.createElement("div");m.className="fab-stage-group is-hidden",m.append(this.fabStageBtns.v1_overview,this.fabStageBtns.v1_photonics,this.fabStageBtns.v1_archs,this.fabStageBtns.v1_duel,this.fabStageBtns.v1_wall);const M=document.createElement("div");M.className="fab-stage-group is-hidden",M.append(this.fabStageBtns.v2_overview,this.fabStageBtns.v2_refine,this.fabStageBtns.v2_mcz,this.fabStageBtns.v2_wafer,this.fabStageBtns.v2_epi_ship);const b=document.createElement("div");b.className="fab-stage-group is-hidden",b.append(this.fabStageBtns.v3_overview,this.fabStageBtns.v3_tcad,this.fabStageBtns.v3_layout,this.fabStageBtns.v3_opc,this.fabStageBtns.v3_maskfab);const y=document.createElement("div");y.className="fab-stage-group is-hidden",y.append(this.fabStageBtns.v4_overview,this.fabStageBtns.v4_sti_dti,this.fabStageBtns.v4_ppd_mev,this.fabStageBtns.v4_vtg_gate,this.fabStageBtns.v4_pin_sab);const I=document.createElement("div");I.className="fab-stage-group is-hidden",I.append(this.fabStageBtns.v5_overview,this.fabStageBtns.v5_w_m1,this.fabStageBtns.v5_m2_m4,this.fabStageBtns.v5_m5_wat,this.fabStageBtns.v5_hb_cmp),this.fabStageGroups={0:g,1:m,2:M,3:b,4:y,5:I},this.fabStageBar.append(p,v,g,m,M,b,y,I),this.root.appendChild(this.fabStageBar),this.layerRail=document.createElement("div"),this.layerRail.className="layer-rail",this.layerRail.addEventListener("click",le=>{const Ie=le.target;if(!Ie)return;const q=Ie.closest(".layer-item")?.dataset.partId;q&&(Ie.closest(".layer-eye-btn")?(le.stopPropagation(),this.handlers.onToggleHidePart(q)):this.handlers.onSelectPart(q))}),this.layerRail.addEventListener("pointerover",le=>{const q=le.target?.closest(".layer-item")?.dataset.partId??null;q!==this.lastDelegatedHoverId&&(this.lastDelegatedHoverId=q,this.handlers.onHoverPart(q))}),this.layerRail.addEventListener("pointerleave",()=>{this.lastDelegatedHoverId!==null&&(this.lastDelegatedHoverId=null,this.handlers.onHoverPart(null))}),this.root.appendChild(this.layerRail);const P=document.createElement("div");P.className="cad-dock";const L=document.createElement("div");L.className="cad-dock-group",this.integratedBtn=et(Ne.completeCamera),this.integratedBtn.classList.add("is-active"),this.cameraBodyBtn=et(Ne.cameraBodyOnly),this.lensBtn=et(Ne.lensModule);const D=document.createElement("div");D.className="cad-sub-divider",this.mountBtn=et(Ne.mountModule),this.shutterBtn=et(Ne.shutterModule),this.sensorBtn=et(Ne.macroSensor),this.mainboardBtn=et(Ne.mainboardIsp),this.evfBtn=et(Ne.evfModule),this.lcdBtn=et(Ne.lcdModule),this.bodyBtn=et(Ne.bodyModule);const w=document.createElement("div");w.className="cad-sub-divider",this.microBtn=et(Ne.microPixel),this.microBtn.dataset.mode="micro",this.microBtn.setAttribute("aria-label","ピクセル個別超解剖"),this.batteryBtn=et(Ne.batteryPack),this.batteryBtn.dataset.mode="battery",this.batteryBtn.setAttribute("aria-label","バッテリーパック超解剖"),this.cfexpressBtn=et(Ne.cfexpressCard),this.cfexpressBtn.dataset.mode="cfexpress",this.cfexpressBtn.setAttribute("aria-label","CFexpressカード超解剖"),this.bionzBtn=et(Ne.bionzModule),this.bionzBtn.dataset.mode="bionz",this.bionzBtn.setAttribute("aria-label","BIONZ XRパッケージ内部超解剖"),this.mishoeBtn=et(Ne.miShoeModule),this.mishoeBtn.dataset.mode="mishoe",this.mishoeBtn.setAttribute("aria-label","MIシュー超解剖"),this.micBtn=et(Ne.micModule),this.micBtn.dataset.mode="mic",this.micBtn.setAttribute("aria-label","内蔵マイク超解剖");const S=document.createElement("div");S.className="cad-sub-divider",this.sensorFabBtn=document.createElement("button"),this.sensorFabBtn.type="button",this.sensorFabBtn.className="icon-btn is-fab-pill",this.sensorFabBtn.dataset.mode="sensor_fab",this.sensorFabBtn.setAttribute("aria-label","センサー製造工程"),this.sensorFabBtn.title="センサー製造工程（第0巻：全2,110工程 3D CAD解剖図）",this.sensorFabBtn.appendChild(cn(Ne.sensorFab));const F=document.createElement("span");F.textContent="センサー製造工程",this.sensorFabBtn.appendChild(F),this.dryboxBtn=document.createElement("button"),this.dryboxBtn.type="button",this.dryboxBtn.className="icon-btn is-fab-pill is-drybox-pill",this.dryboxBtn.dataset.mode="drybox",this.dryboxBtn.setAttribute("aria-label","ドライボックス超解剖"),this.dryboxBtn.title="2026年最新 カメラ専用ドライボックス（防湿庫）全150部品 3D CAD超解剖図",this.dryboxBtn.appendChild(cn(Ne.dryboxCabinet));const G=document.createElement("span");G.textContent="ドライボックス",this.dryboxBtn.appendChild(G),this.integratedBtn.addEventListener("click",()=>this.setMode("integrated")),this.cameraBodyBtn.addEventListener("click",()=>this.setMode("camera_body")),this.lensBtn.addEventListener("click",()=>this.setMode("lens")),this.mountBtn.addEventListener("click",()=>this.setMode("mount")),this.shutterBtn.addEventListener("click",()=>this.setMode("shutter")),this.sensorBtn.addEventListener("click",()=>this.setMode("sensor")),this.mainboardBtn.addEventListener("click",()=>this.setMode("mainboard")),this.evfBtn.addEventListener("click",()=>this.setMode("evf")),this.lcdBtn.addEventListener("click",()=>this.setMode("lcd")),this.bodyBtn.addEventListener("click",()=>this.setMode("body")),this.microBtn.addEventListener("click",()=>this.setMode("micro")),this.batteryBtn.addEventListener("click",()=>this.setMode("battery")),this.cfexpressBtn.addEventListener("click",()=>this.setMode("cfexpress")),this.bionzBtn.addEventListener("click",()=>this.setMode("bionz")),this.mishoeBtn.addEventListener("click",()=>this.setMode("mishoe")),this.micBtn.addEventListener("click",()=>this.setMode("mic")),this.sensorFabBtn.addEventListener("click",()=>this.setMode("sensor_fab")),this.dryboxBtn.addEventListener("click",()=>this.setMode("drybox")),L.append(this.integratedBtn,this.cameraBodyBtn,this.lensBtn,D,this.mountBtn,this.shutterBtn,this.sensorBtn,this.mainboardBtn,this.evfBtn,this.lcdBtn,this.bodyBtn,w,this.microBtn,this.batteryBtn,this.cfexpressBtn,this.bionzBtn,this.mishoeBtn,this.micBtn,S,this.sensorFabBtn,this.dryboxBtn);const k=document.createElement("div");k.className="slider-cluster",this.assembleBtn=et(Ne.assembled),this.explodeRange=document.createElement("input"),this.explodeRange.type="range",this.explodeRange.min="0",this.explodeRange.max="1000",this.explodeRange.value="0",this.explodeRange.className="cad-range",this.explodeBtn=et(Ne.exploded),this.assembleBtn.addEventListener("click",()=>{this.explodeRange.value="0",this.handlers.onExplodeChange(0),this.updateExplodeButtons(0)}),this.explodeBtn.addEventListener("click",()=>{this.explodeRange.value="1000",this.handlers.onExplodeChange(1),this.updateExplodeButtons(1)}),this.explodeRange.addEventListener("input",()=>{const le=Number(this.explodeRange.value)/1e3;this.handlers.onExplodeChange(le),this.updateExplodeButtons(le)}),this.updateExplodeButtons(0),k.append(this.assembleBtn,this.explodeRange,this.explodeBtn);const X=document.createElement("div");X.className="slider-cluster",this.sectionBtn=et(Ne.sectionOff),this.sectionRange=document.createElement("input"),this.sectionRange.type="range",this.sectionRange.min="0",this.sectionRange.max="1000",this.sectionRange.value="500",this.sectionRange.className="cad-range is-disabled",this.sectionBtn.addEventListener("click",()=>{const le=this.currentSectionAxis==="off"?"x":this.currentSectionAxis==="x"?"y":"off";this.setSectionAxis(le)}),this.sectionRange.addEventListener("input",()=>{this.handlers.onSectionValueChange(Number(this.sectionRange.value)/1e3)}),X.append(this.sectionBtn,this.sectionRange);const J=document.createElement("div");J.className="cad-dock-group",this.solidBtn=et(Ne.renderSolid),this.solidBtn.classList.add("is-active"),this.xrayBtn=et(Ne.renderXray),this.cadBtn=et(Ne.renderCad),this.solidBtn.addEventListener("click",()=>this.setRenderMode("solid")),this.xrayBtn.addEventListener("click",()=>this.setRenderMode("xray")),this.cadBtn.addEventListener("click",()=>this.setRenderMode("cad")),J.append(this.solidBtn,this.xrayBtn,this.cadBtn);const Y=document.createElement("div");Y.className="cad-dock-group",this.physicsBtn=et(Ne.physicsRays),this.physicsBtn.classList.add("is-accent"),this.physicsBtn.addEventListener("click",()=>{this.physicsActive=!this.physicsActive,this.physicsBtn.classList.toggle("is-active",this.physicsActive),this.handlers.onPhysicsToggle(this.physicsActive)}),this.opticsStudioBtn=et(Ne.opticsStudio),this.opticsStudioBtn.classList.add("is-accent"),this.opticsStudioBtn.addEventListener("click",()=>{this.handlers.onOpticsStudioToggle()}),this.resetVisBtn=et(Ne.eyeAll),this.resetVisBtn.disabled=!0,this.resetVisBtn.addEventListener("click",()=>{this.handlers.onResetVisibility()}),this.fullscreenBtn=et(Ne.fullscreenEnter),this.fullscreenBtn.addEventListener("click",()=>{this.handlers.onFullscreenToggle()}),Y.append(this.physicsBtn,this.opticsStudioBtn,this.resetVisBtn,this.fullscreenBtn);const oe=document.createElement("div");oe.className="cad-divider";const $=document.createElement("div");$.className="cad-divider";const fe=document.createElement("div");fe.className="cad-divider";const ve=document.createElement("div");ve.className="cad-divider",P.append(L,oe,k,$,X,fe,J,ve,Y),this.root.appendChild(P)}isV2CapableMode(e){return e==="micro"||e==="micro_v2"||e==="bionz"||e==="bionz_v2"}applyModeButtons(e){this.integratedBtn.classList.toggle("is-active",e==="integrated"),this.cameraBodyBtn.classList.toggle("is-active",e==="camera_body"),this.lensBtn.classList.toggle("is-active",e==="lens"),this.mountBtn.classList.toggle("is-active",e==="mount"),this.shutterBtn.classList.toggle("is-active",e==="shutter"),this.sensorBtn.classList.toggle("is-active",e==="sensor"),this.mainboardBtn.classList.toggle("is-active",e==="mainboard"),this.evfBtn.classList.toggle("is-active",e==="evf"),this.lcdBtn.classList.toggle("is-active",e==="lcd"),this.bodyBtn.classList.toggle("is-active",e==="body"),this.microBtn.classList.toggle("is-active",e==="micro"||e==="micro_v2"),this.batteryBtn.classList.toggle("is-active",e==="battery"),this.cfexpressBtn.classList.toggle("is-active",e==="cfexpress"),this.bionzBtn.classList.toggle("is-active",e==="bionz"||e==="bionz_v2"),this.mishoeBtn.classList.toggle("is-active",e==="mishoe"),this.micBtn.classList.toggle("is-active",e==="mic"),this.sensorFabBtn.classList.toggle("is-active",e==="sensor_fab"),this.dryboxBtn.classList.toggle("is-active",e==="drybox"),this.lensSectionBar.classList.toggle("is-hidden",e!=="lens"),this.fabStageBar.classList.toggle("is-hidden",e!=="sensor_fab");const t=this.isV2CapableMode(e);if(this.v2PhaseBar.classList.toggle("is-hidden",!t),t){const n=e==="micro_v2"||e==="bionz_v2",s=e==="micro"||e==="micro_v2";this.v2PhaseBar.dataset.phaseFamily=s?"micro":"bionz",this.v1PhaseBtn.classList.toggle("is-active",!n),this.v2PhaseBtn.classList.toggle("is-active",n),this.v1PhaseBtn.setAttribute("aria-label",s?"V1 ピクセル配列図":"V1 BIONZ XR パッケージ図"),this.v2PhaseBtn.setAttribute("aria-label",s?"V2 ピクセル原子・量子極超解剖図":"V2 BIONZ XR 2nm GAA極超解剖図")}}applyFabVolumeButtons(e){[0,1,2,3,4,5].forEach(t=>{this.fabVolBtns[t].classList.toggle("is-active",t===e),this.fabStageGroups[t].classList.toggle("is-hidden",t!==e)}),this.currentMode==="sensor_fab"&&this.fabVolBtns[e].scrollIntoView({behavior:"auto",block:"nearest",inline:"center"})}applyFabStageButtons(e){Object.keys(this.fabStageBtns).forEach(t=>{this.fabStageBtns[t].classList.toggle("is-active",t===e)})}setFabVolume(e){const t=this.currentFabVolume!==e;this.currentFabVolume=e,this.currentFabStage=e===0?"overview":e===1?"v1_overview":e===2?"v2_overview":e===3?"v3_overview":e===4?"v4_overview":"v5_overview",this.applyFabVolumeButtons(e),this.applyFabStageButtons(this.currentFabStage),(t||this.currentMode==="sensor_fab")&&this.handlers.onSensorFabVolumeChange(e)}syncFabVolume(e){this.currentFabVolume=e,this.applyFabVolumeButtons(e)}setFabStage(e){this.currentFabStage=e,this.applyFabStageButtons(e),this.handlers.onSensorFabStageChange(e)}syncFabStage(e){this.currentFabStage=e,this.applyFabStageButtons(e)}applyLensSectionButtons(e){this.lensSec1Btn.classList.toggle("is-active",e===1),this.lensSec2Btn.classList.toggle("is-active",e===2),this.lensSec3Btn.classList.toggle("is-active",e===3)}setLensSection(e){this.currentLensSection===e&&this.currentMode==="lens"||(this.currentLensSection=e,this.applyLensSectionButtons(e),this.handlers.onLensSectionChange(e))}syncLensSection(e){this.currentLensSection=e,this.applyLensSectionButtons(e)}setMode(e){this.currentMode!==e&&(this.currentMode=e,e==="lens"?(this.currentLensSection=1,this.applyLensSectionButtons(1)):e==="sensor_fab"&&(this.currentFabStage=this.currentFabVolume===0?"overview":this.currentFabVolume===1?"v1_overview":this.currentFabVolume===2?"v2_overview":this.currentFabVolume===3?"v3_overview":this.currentFabVolume===4?"v4_overview":"v5_overview",this.applyFabVolumeButtons(this.currentFabVolume),this.applyFabStageButtons(this.currentFabStage)),this.applyModeButtons(e),this.handlers.onModeChange(e))}updateExplodeButtons(e){this.assembleBtn.classList.toggle("is-active",e<.04),this.explodeBtn.classList.toggle("is-active",e>.96)}setSectionAxis(e){this.currentSectionAxis=e,this.sectionBtn.replaceChildren(cn(e==="off"?Ne.sectionOff:e==="x"?Ne.sectionX:Ne.sectionY)),this.sectionBtn.classList.toggle("is-active",e!=="off"),this.sectionRange.classList.toggle("is-disabled",e==="off"),this.handlers.onSectionAxisChange(e)}setRenderMode(e){this.currentRenderMode!==e&&(this.currentRenderMode=e,this.solidBtn.classList.toggle("is-active",e==="solid"),this.xrayBtn.classList.toggle("is-active",e==="xray"),this.cadBtn.classList.toggle("is-active",e==="cad"),this.handlers.onRenderModeChange(e))}applyQualityButtons(e){this.qualityStdBtn.classList.toggle("is-active",e==="standard"),this.qualityHighBtn.classList.toggle("is-active",e==="high"),this.qualityUltraBtn.classList.toggle("is-active",e==="ultra")}setQuality(e){this.currentQuality!==e&&(this.currentQuality=e,this.applyQualityButtons(e),this.handlers.onQualityChange(e))}syncQuality(e){this.currentQuality=e,this.applyQualityButtons(e)}setExplodeValue(e){this.explodeRange.value=String(Math.round(e*1e3)),this.updateExplodeButtons(e)}syncMode(e){this.currentMode=e,e==="lens"?this.applyLensSectionButtons(this.currentLensSection):e==="sensor_fab"?(this.applyFabVolumeButtons(this.currentFabVolume),this.applyFabStageButtons(this.currentFabStage),this.sensorFabBtn.scrollIntoView({behavior:"auto",block:"nearest",inline:"center"})):e==="drybox"&&this.dryboxBtn.scrollIntoView({behavior:"auto",block:"nearest",inline:"center"}),this.applyModeButtons(e)}syncSectionAxis(e,t=.5){this.currentSectionAxis=e,this.sectionBtn.replaceChildren(cn(e==="off"?Ne.sectionOff:e==="x"?Ne.sectionX:Ne.sectionY)),this.sectionBtn.classList.toggle("is-active",e!=="off"),this.sectionRange.classList.toggle("is-disabled",e==="off"),this.sectionRange.value=String(Math.round(t*1e3))}syncPhysics(e){this.physicsActive=e,this.physicsBtn.classList.toggle("is-active",e)}syncOpticsStudio(e){this.opticsStudioBtn.classList.toggle("is-active",e),this.lensSectionBar.classList.toggle("is-hidden",e||this.currentMode!=="lens"),this.v2PhaseBar.classList.toggle("is-hidden",e||!this.isV2CapableMode(this.currentMode)),this.fabStageBar.classList.toggle("is-hidden",e||this.currentMode!=="sensor_fab")}syncFullscreen(e){this.fullscreenBtn.classList.toggle("is-active",e),this.fullscreenBtn.replaceChildren(cn(e?Ne.fullscreenExit:Ne.fullscreenEnter))}renderLayerRail(e,t,n,s,o){this.resetVisBtn.disabled=!o;let a=e.length===this.renderedPartIds.length;if(a){for(let r=0;r<e.length;r++)if(e[r].id!==this.renderedPartIds[r]){a=!1;break}}if(a){let r=null,p=null;for(let v=0;v<e.length;v++){const x=e[v].id,g=this.layerRowMap.get(x);if(!g)continue;const m=s(x),M=x===t,b=x===n;g.classList.toggle("is-selected",M),g.classList.toggle("is-hovered",b),g.classList.toggle("is-hidden",m),M&&(r=g),b&&(p=g);const y=this.layerEyeMap.get(x);y&&y.hidden!==m&&(y.hidden=m,y.btn.replaceChildren(cn(m?Ne.eyeClosed:Ne.eyeAll)))}this.prevSelectedRow=r,this.prevHoveredRow=p,r&&r.scrollIntoView({block:"nearest"});return}this.layerRowMap.clear(),this.layerEyeMap.clear(),this.prevSelectedRow=null,this.prevHoveredRow=null,this.renderedPartIds=e.map(r=>r.id);const l=document.createDocumentFragment();let c=null,d=!1,u=null,f=null;e.forEach(r=>{const p=!!r.standaloneOnly;if(c&&c!==r.subsystem||c===r.subsystem&&!d&&p||c==="drybox"&&r.subsystem==="drybox"&&(r.order===8||r.order===14||r.order===21||r.order===28||r.order===33||r.order===41||r.order===45||r.order===51||r.order===57||r.order===65||r.order===74||r.order===79||r.order===85||r.order===91||r.order===99||r.order===107||r.order===117||r.order===125||r.order===131||r.order===136||r.order===141||r.order===146)||c==="sensor_fab"&&r.subsystem==="sensor_fab"&&((r.fabVolume??0)===5?r.order===3||r.order===9||r.order===14||r.order===26||r.order===33:(r.fabVolume??0)===4?r.order===3||r.order===11||r.order===15||r.order===28||r.order===34||r.order===41:(r.fabVolume??0)===3?r.order===3||r.order===13||r.order===25||r.order===35||r.order===45:(r.fabVolume??0)===2?r.order===3||r.order===7||r.order===12||r.order===18||r.order===22||r.order===27||r.order===32:(r.fabVolume??0)===1?r.order===3||r.order===10||r.order===17||r.order===24:r.order===4||r.order===16||r.order===28)){const y=document.createElement("div");y.className="layer-sep",l.appendChild(y)}c=r.subsystem,d=p;const v=document.createElement("div");v.className="layer-item",v.dataset.partId=r.id;const x=s(r.id);r.id===t&&(v.classList.add("is-selected"),u=v),r.id===n&&(v.classList.add("is-hovered"),f=v),x&&v.classList.add("is-hidden");const g=document.createElement("span");g.className="layer-swatch",g.style.backgroundColor=r.swatchColor;const m=document.createElement("span");m.className="layer-bar";let M=20;if(r.subsystem==="lens")M=r.order===1||r.order===32||r.order===33||r.order===43||r.order===46||r.order===57||r.order===58||r.order===62||r.order===69||r.order===70||r.order===76||r.order===77||r.order===88||r.order===92||r.order===97||r.order===98?32:r.order===8||r.order===10||r.order===16||r.order===21||r.order===24||r.order===26||r.order===35||r.order===40||r.order===53||r.order===63||r.order===66||r.order===75||r.order===78||r.order===81||r.order===83||r.order===84||r.order===86||r.order===89||r.order===90||r.order===95||r.order===96?26:r.order===3||r.order===7||r.order===9||r.order===11||r.order===12||r.order===15||r.order===22||r.order===28||r.order===34||r.order===38||r.order===39||r.order===41||r.order===50||r.order===54||r.order===64||r.order===67||r.order===71||r.order===74||r.order>=75?21:16;else if(r.subsystem==="lcd")M=r.order===1||r.order===4||r.order===9||r.order===14||r.order===16||r.order===18||r.order===22||r.order===29||r.order===33||r.order===36||r.order===38||r.order===42||r.order===43||r.order===47||r.order===52||r.order===53||r.order===63||r.order===66||r.order===78||r.order===79||r.order===84||r.order===88||r.order===89||r.order===101||r.order===102||r.order===103||r.order===105||r.order===107||r.order===108||r.order===110||r.order===111||r.order===113||r.order===115||r.order===121||r.order===122||r.order===126||r.order===132||r.order===133||r.order===135||r.order===136||r.order===141||r.order===143||r.order===144||r.order===145||r.order===147||r.order===149||r.order===150?30:r.order===2||r.order===6||r.order===10||r.order===11||r.order===17||r.order===21||r.order===23||r.order===27||r.order===28||r.order===31||r.order===32||r.order===34||r.order===37||r.order===39||r.order===40||r.order===41||r.order===44||r.order===48||r.order===50||r.order===51||r.order>=54?22:18;else if(r.subsystem==="body")M=r.order===3||r.order===7||r.order===8||r.order===9||r.order===12||r.order===26||r.order===29||r.order===33||r.order===35||r.order===38||r.order===39||r.order===40||r.order===45||r.order===51||r.order===64||r.order===68||r.order===71||r.order===74||r.order===79||r.order===80||r.order===82||r.order===88||r.order===93||r.order===97||r.order===100||r.order===101||r.order===104||r.order===106||r.order===107||r.order===108||r.order===109||r.order===111||r.order===112?32:r.order===1||r.order===5||r.order===6||r.order===14||r.order===16||r.order===17||r.order===18||r.order===20||r.order===27||r.order===34||r.order===37||r.order===41||r.order===42||r.order===44||r.order===48||r.order===53||r.order===54||r.order===57||r.order===60||r.order===61||r.order===62||r.order===65||r.order===67||r.order===69||r.order===72||r.order===75||r.order===77||r.order===81||r.order===84||r.order===85||r.order===86||r.order===89||r.order===90||r.order===92||r.order===94||r.order===95||r.order===96||r.order===98||r.order===102||r.order===103||r.order===105||r.order===110||r.order===113||r.order===115||r.order===116?25:r.order>=39?19:18;else if(r.subsystem==="mount")M=r.order===1||r.order===11||r.order===12||r.order===13||r.order===18||r.order===22||r.order===24||r.order===27||r.order===32||r.order===36||r.order===42||r.order===43||r.order===45||r.order===48||r.order===50||r.order===52||r.order===53||r.order===56||r.order===62||r.order===65||r.order===67||r.order===68||r.order===71||r.order===76||r.order===78||r.order===80||r.order===82||r.order===86||r.order===87||r.order===91||r.order===93||r.order===95||r.order===97||r.order===100?32:r.order===3||r.order===4||r.order===5||r.order===9||r.order===10||r.order===15||r.order===17||r.order===20||r.order===23||r.order===26||r.order===29||r.order===31||r.order===33||r.order===37||r.order===40||r.order===44||r.order===46||r.order===49||r.order===51||r.order===55||r.order===58||r.order===59||r.order===61||r.order===64||r.order===70||r.order===72||r.order===74||r.order===75||r.order===77||r.order===79||r.order===81||r.order===83||r.order===85||r.order===88||r.order===90||r.order===92||r.order===94||r.order===96||r.order===98||r.order===99?25:r.order>=27?19:18;else if(r.subsystem==="evf")M=r.order===1||r.order===14||r.order===18||r.order===19||r.order===23||r.order===27||r.order===32||r.order===39||r.order===40||r.order===48||r.order===52?32:r.order===6||r.order===8||r.order===9||r.order===11||r.order===12||r.order===16||r.order===22||r.order===24||r.order===26||r.order===29||r.order===33||r.order===35||r.order===38||r.order===42||r.order===44||r.order===47||r.order===50||r.order===54?26:r.order===2||r.order===3||r.order===10||r.order===13||r.order===15||r.order===17||r.order===20||r.order===21||r.order===25||r.order===28||r.order===31||r.order>=32?21:17;else if(r.subsystem==="mainboard")M=r.order===14||r.order===16||r.order===18||r.order===29||r.order===31||r.order===32||r.order===39||r.order===45?32:r.order===1||r.order===2||r.order===17||r.order===19||r.order===20||r.order===27||r.order===33||r.order===34||r.order===36||r.order===38||r.order===40||r.order===42||r.order===47||r.order===49||r.order===52?27:r.order===4||r.order===6||r.order===9||r.order===12||r.order===21||r.order===26||r.order===28||r.order===30||r.order>=31?22:17;else if(r.subsystem==="shutter")M=r.order===1||r.order===25||r.order===26||r.order===27||r.order===33||r.order===38||r.order===40||r.order===43||r.order===49||r.order===51||r.order===60||r.order===66||r.order===73||r.order===74||r.order===75?32:r.order===4||r.order===8||r.order===12||r.order===14||r.order===16||r.order===20||r.order===29||r.order===32||r.order===34||r.order===36||r.order===41||r.order===44||r.order===46||r.order===50||r.order===54||r.order===56||r.order===59||r.order===61||r.order===65||r.order===68||r.order===69||r.order===71||r.order===76?26:r.order===2||r.order===5||r.order===9||r.order===13||r.order===15||r.order===17||r.order===22||r.order===24||r.order===28||r.order===30||r.order===31||r.order===35||r.order===37||r.order===39||r.order===42||r.order===45||r.order===47||r.order===52||r.order===55||r.order>=58?21:16;else if(r.subsystem==="sensor")if(r.order<=40){const y=(r.order-1)/39;M=Math.round(14+Math.sin(y*Math.PI*.85)*10+(r.order>=18?8:0))}else M=r.order===41||r.order===47||r.order===50||r.order===53||r.order===58||r.order===60||r.order===64||r.order===71||r.order===72||r.order===73||r.order===75||r.order===76||r.order===83||r.order===86||r.order===88?30:r.order===43||r.order===44||r.order===48||r.order===49||r.order===51||r.order===52||r.order===54||r.order===55||r.order===56||r.order===59||r.order===74||r.order===77||r.order===79||r.order===81||r.order===82||r.order===85||r.order===87||r.order===90?24:18;else if(r.subsystem==="battery")M=r.order===1||r.order===4||r.order===6||r.order===7||r.order===9||r.order===17||r.order===19||r.order===22||r.order===23||r.order===24||r.order===28||r.order===36||r.order===45||r.order===46||r.order===47||r.order===56||r.order===59||r.order===71||r.order===72||r.order===73||r.order===78||r.order===80||r.order===85||r.order===91||r.order===93||r.order===97||r.order===100||r.order===101||r.order===102||r.order===104||r.order===105||r.order===111||r.order===112||r.order===114||r.order===115||r.order===118||r.order===121||r.order===128||r.order===130?32:r.order===2||r.order===8||r.order===11||r.order===12||r.order===13||r.order===14||r.order===20||r.order===21||r.order===25||r.order===29||r.order===30||r.order===31||r.order===37||r.order===39||r.order===41||r.order===50||r.order===52||r.order===53||r.order===57||r.order===58||r.order===61||r.order===64||r.order===66||r.order===68||r.order===74||r.order===75||r.order===76||r.order===79||r.order===82||r.order===84||r.order===87||r.order===89||r.order===92||r.order===94||r.order===96||r.order===98||r.order===99||r.order===103||r.order===106||r.order===108||r.order===109||r.order===113||r.order===116||r.order===117||r.order===120||r.order===122||r.order===123||r.order===125||r.order===126||r.order===129?25:19;else if(r.subsystem==="cfexpress")M=r.order===1||r.order===3||r.order===5||r.order===7||r.order===8||r.order===10||r.order===12||r.order===14||r.order===15||r.order===16||r.order===25||r.order===32||r.order===36||r.order===38||r.order===48||r.order===50||r.order===54||r.order===56||r.order===57||r.order===61||r.order===63||r.order===64||r.order===70||r.order===78||r.order===79||r.order===80||r.order===81||r.order===86||r.order===88||r.order===89||r.order===92||r.order===93||r.order===99||r.order===100||r.order===101||r.order===103||r.order===106||r.order===108||r.order===109||r.order===112||r.order===115||r.order===118||r.order===122||r.order===125||r.order===126||r.order===128||r.order===130||r.order===131||r.order===134||r.order===139||r.order===142||r.order===145||r.order===149||r.order===150||r.order===161||r.order===165||r.order===168||r.order===170?32:r.order===2||r.order===4||r.order===9||r.order===13||r.order===17||r.order===19||r.order===20||r.order===21||r.order===24||r.order===26||r.order===28||r.order===29||r.order===34||r.order===35||r.order===39||r.order===40||r.order===42||r.order===43||r.order===49||r.order===51||r.order===52||r.order===53||r.order===55||r.order===58||r.order===59||r.order===60||r.order===62||r.order===65||r.order===66||r.order===67||r.order===68||r.order===69||r.order===71||r.order===72||r.order===73||r.order===74||r.order===75||r.order===82||r.order===83||r.order===84||r.order===90||r.order===91||r.order===94||r.order===95||r.order===96||r.order===102||r.order===104||r.order===105||r.order===107||r.order===110||r.order===111||r.order===113||r.order===116||r.order===117||r.order===119||r.order===121||r.order===123||r.order===124||r.order===127||r.order===129||r.order===132||r.order===133||r.order===136||r.order===138||r.order===140||r.order===143||r.order===146||r.order===148||r.order===152||r.order===154||r.order===158||r.order===162||r.order===164||r.order===166||r.order===169?25:19;else if(r.subsystem==="bionz")M=r.order===1||r.order===2||r.order===4||r.order===9||r.order===14||r.order===28||r.order===33||r.order===36||r.order===50||r.order===51||r.order===53||r.order===54||r.order===55||r.order===63||r.order===64?32:r.order===5||r.order===7||r.order===10||r.order===11||r.order===15||r.order===16||r.order===17||r.order===20||r.order===26||r.order===27||r.order===30||r.order===34||r.order===37||r.order===40||r.order===41||r.order===42||r.order===49||r.order===52||r.order===56||r.order===57||r.order===58||r.order===59||r.order===65||r.order===66?25:18;else if(r.subsystem==="mishoe")M=r.order===1||r.order===3||r.order===10||r.order===11||r.order===15||r.order===18||r.order===22||r.order===24||r.order===25||r.order===32?32:r.order===2||r.order===7||r.order===12||r.order===13||r.order===19||r.order===21||r.order===23||r.order===27||r.order===28||r.order===30?25:18;else if(r.subsystem==="mic")M=r.order===1||r.order===2||r.order===4||r.order===8||r.order===13||r.order===14||r.order===17||r.order===21||r.order===22||r.order===26||r.order===27||r.order===29||r.order===32||r.order===34||r.order===35||r.order===47||r.order===53||r.order===55||r.order===56||r.order===58||r.order===60||r.order===62||r.order===63||r.order===71||r.order===75||r.order===78||r.order===80||r.order===81||r.order===82||r.order===84||r.order===85||r.order===91||r.order===92||r.order===93||r.order===99||r.order===101||r.order===102||r.order===104||r.order===110||r.order===111||r.order===115||r.order===116||r.order===119||r.order===121||r.order===123||r.order===124||r.order===131||r.order===132||r.order===133||r.order===136||r.order===138||r.order===141||r.order===142||r.order===144||r.order===145||r.order===146||r.order===147||r.order===148||r.order===150?32:r.order===3||r.order===5||r.order===6||r.order===9||r.order===16||r.order===18||r.order===19||r.order===23||r.order===25||r.order===30||r.order===31||r.order===36||r.order===37||r.order===38||r.order===40||r.order===42||r.order===43||r.order===45||r.order===46||r.order===50||r.order===52||r.order===54||r.order===57||r.order===59||r.order===61||r.order===65||r.order===67||r.order===69||r.order===72||r.order===76||r.order===77||r.order===79||r.order===83||r.order===86||r.order===87||r.order===89||r.order===90||r.order===94||r.order===95||r.order===96||r.order===98||r.order===100||r.order===103||r.order===105||r.order===106||r.order===108||r.order===109||r.order===112||r.order===114||r.order===117||r.order===118||r.order===120||r.order===122||r.order===125||r.order===127||r.order===129||r.order===130||r.order===134||r.order===135||r.order===137||r.order===139||r.order===140||r.order===143||r.order===149?25:18;else if(r.subsystem==="micro_v2")M=r.order===1||r.order===2||r.order===7||r.order===9||r.order===13||r.order===16||r.order===19||r.order===23||r.order===24||r.order===26||r.order===30||r.order===31||r.order===37||r.order===38||r.order===42||r.order===45||r.order===46||r.order===49||r.order===54?32:r.order===3||r.order===5||r.order===8||r.order===10||r.order===12||r.order===14||r.order===17||r.order===20||r.order===22||r.order===25||r.order===27||r.order===29||r.order===32||r.order===34||r.order===36||r.order===39||r.order===41||r.order===44||r.order===48||r.order===51||r.order===52||r.order===55?25:19;else if(r.subsystem==="bionz_v2")M=r.order===1||r.order===3||r.order===4||r.order===7||r.order===12||r.order===13||r.order===16||r.order===18||r.order===20||r.order===26||r.order===27||r.order===30||r.order===31||r.order===33||r.order===37||r.order===38||r.order===39||r.order===40||r.order===45||r.order===50||r.order===52||r.order===55?32:r.order===2||r.order===5||r.order===6||r.order===8||r.order===10||r.order===14||r.order===15||r.order===17||r.order===19||r.order===21||r.order===24||r.order===25||r.order===28||r.order===29||r.order===32||r.order===34||r.order===35||r.order===36||r.order===44||r.order===46||r.order===47||r.order===48||r.order===49||r.order===51||r.order===53?25:19;else if(r.subsystem==="sensor_fab")(r.fabVolume??0)===5?M=r.order===1||r.order===6||r.order===7||r.order===10||r.order===11||r.order===12||r.order===16||r.order===20||r.order===24||r.order===25||r.order===28||r.order===30||r.order===31||r.order===32||r.order===35||r.order===36||r.order===37||r.order===38?32:r.order===2||r.order===4||r.order===8||r.order===13||r.order===15||r.order===17||r.order===19||r.order===21||r.order===23||r.order===27||r.order===29||r.order===34?25:19:(r.fabVolume??0)===4?M=r.order===1||r.order===5||r.order===7||r.order===12||r.order===14||r.order===21||r.order===22||r.order===23||r.order===24||r.order===27||r.order===28||r.order===32||r.order===37||r.order===38||r.order===41||r.order===42||r.order===44||r.order===45?32:r.order===2||r.order===10||r.order===13||r.order===15||r.order===19||r.order===25||r.order===26||r.order===29||r.order===30||r.order===31||r.order===35||r.order===39||r.order===40||r.order===43?25:19:(r.fabVolume??0)===3?M=r.order===1||r.order===6||r.order===9||r.order===16||r.order===18||r.order===22||r.order===24||r.order===29||r.order===30||r.order===33||r.order===36||r.order===38||r.order===43||r.order===46||r.order===47||r.order===49||r.order===52?32:r.order===2||r.order===3||r.order===4||r.order===8||r.order===10||r.order===12||r.order===13||r.order===14||r.order===19||r.order===21||r.order===25||r.order===28||r.order===31||r.order===35||r.order===40||r.order===44||r.order===45||r.order===50||r.order===51?25:19:(r.fabVolume??0)===2?M=r.order===1||r.order===5||r.order===8||r.order===10||r.order===12||r.order===14||r.order===16||r.order===20||r.order===24||r.order===25||r.order===28||r.order===29||r.order===30||r.order===32||r.order===35||r.order===36?32:r.order===2||r.order===3||r.order===7||r.order===11||r.order===15||r.order===19||r.order===23||r.order===26||r.order===31||r.order===33||r.order===34?25:19:M=r.order===1||r.order===3||r.order===6||r.order===8||r.order===9||r.order===14||r.order===15||r.order===20||r.order===23||r.order===24||r.order===31||r.order===32?32:r.order===2||r.order===4||r.order===5||r.order===7||r.order===10||r.order===12||r.order===27||r.order===29||r.order===30?25:19;else if(r.subsystem==="drybox")M=r.order===1||r.order===2||r.order===8||r.order===14||r.order===15||r.order===21||r.order===22||r.order===25||r.order===28||r.order===33||r.order===37||r.order===40||r.order===41||r.order===50||r.order===51||r.order===56||r.order===63||r.order===65||r.order===68||r.order===72||r.order===74||r.order===77||r.order===79||r.order===81||r.order===82||r.order===86||r.order===90||r.order===92||r.order===95||r.order===100||r.order===107||r.order===113||r.order===117||r.order===119||r.order===122||r.order===130||r.order===131||r.order===134||r.order===136||r.order===137||r.order===138||r.order===139||r.order===141||r.order===144||r.order===148||r.order===149||r.order===150?32:r.order===3||r.order===4||r.order===5||r.order===10||r.order===11||r.order===16||r.order===17||r.order===18||r.order===23||r.order===24||r.order===26||r.order===29||r.order===30||r.order===34||r.order===35||r.order===38||r.order===42||r.order===44||r.order===45||r.order===47||r.order===48||r.order===52||r.order===53||r.order===55||r.order===58||r.order===59||r.order===61||r.order===62||r.order===64||r.order===66||r.order===67||r.order===70||r.order===75||r.order===78||r.order===80||r.order===83||r.order===84||r.order===89||r.order===91||r.order===93||r.order===97||r.order===99||r.order===101||r.order===103||r.order===106||r.order===108||r.order===109||r.order===111||r.order===112||r.order===114||r.order===116||r.order===118||r.order===120||r.order===121||r.order===123||r.order===124||r.order===127||r.order===129||r.order===132||r.order===133||r.order===135||r.order===140||r.order===142||r.order===143||r.order===145||r.order===146||r.order===147?25:19;else if(r.order<=15){const y=(r.order-1)/14;M=Math.round(17+Math.sin(y*Math.PI)*13)}else if(r.order===16||r.order===21||r.order===23||r.order===26||r.order===29||r.order===31||r.order===36||r.order===37||r.order===39||r.order===46||r.order===50||r.order===51||r.order===56||r.order===59||r.order===62||r.order===66||r.order===70||r.order===71||r.order===73)M=30;else{const y=(r.order-16)%12/11;M=Math.round(18+Math.sin(y*Math.PI)*8)}m.style.width=`${M}px`;const b=document.createElement("button");b.type="button",b.className="layer-eye-btn",b.appendChild(cn(x?Ne.eyeClosed:Ne.eyeAll)),v.append(g,m,b),l.appendChild(v),this.layerRowMap.set(r.id,v),this.layerEyeMap.set(r.id,{btn:b,hidden:x})}),this.layerRail.replaceChildren(l),this.prevSelectedRow=u,this.prevHoveredRow=f,u&&u.scrollIntoView({block:"nearest"})}syncHighlight(e,t){const n=e?this.layerRowMap.get(e)??null:null;this.prevSelectedRow!==n&&(this.prevSelectedRow&&this.prevSelectedRow.classList.remove("is-selected"),n&&n.classList.add("is-selected"),this.prevSelectedRow=n);const s=t?this.layerRowMap.get(t)??null:null;this.prevHoveredRow!==s&&(this.prevHoveredRow&&this.prevHoveredRow.classList.remove("is-hovered"),s&&s.classList.add("is-hovered"),this.prevHoveredRow=s)}}const I0=Object.freeze({__isLazyStub:!0,title:"",subtitle:"",category:"",summary:"",opticsAndPhysics:[],nextGenInnovation:"",specs:[],diagramType:"baffle"});function $0(i){return I0}function wd(i){return!i||i.__isLazyStub===!0}const Cc=new Map,Io=new Map;function D0(i){const e=Cc.get(i);if(e)return Promise.resolve(e);let t=Io.get(i);if(t)return t;const n=s=>(Cc.set(i,s),Io.delete(i),s);switch(i){case"lens":t=ne(()=>import("./lensExplanations-CVIj2Kn6.js"),__vite__mapDeps([56,57,31]),import.meta.url).then(s=>n(s.LENS_EXPLANATIONS));break;case"mount":t=Promise.all([ne(()=>import("./mountExplanations-BzfMkKM6.js"),__vite__mapDeps([58,57,14]),import.meta.url),ne(()=>import("./mountUltra34ExplanationsA-DS-n8i88.js"),[],import.meta.url),ne(()=>import("./mountUltra34ExplanationsB-C99K2WhF.js"),[],import.meta.url)]).then(([s,o,a])=>n({...s.MOUNT_EXPLANATIONS,...o.MOUNT_ULTRA34_EXPLANATIONS_A,...a.MOUNT_ULTRA34_EXPLANATIONS_B}));break;case"shutter":t=Promise.all([ne(()=>import("./shutterExplanations-COwEmSMe.js"),__vite__mapDeps([59,57,17]),import.meta.url),ne(()=>import("./shutterUltra34ExplanationsA-BlYeoVYD.js"),[],import.meta.url),ne(()=>import("./shutterUltra34ExplanationsB-Be8hM50-.js"),[],import.meta.url),ne(()=>import("./shutterUltra36ExplanationsA-Ci5eL3OG.js"),[],import.meta.url),ne(()=>import("./shutterUltra36ExplanationsB-CecpLJJK.js"),[],import.meta.url)]).then(([s,o,a,l,c])=>n({...s.SHUTTER_EXPLANATIONS,...o.SHUTTER_ULTRA34_EXPLANATIONS_A,...a.SHUTTER_ULTRA34_EXPLANATIONS_B,...l.SHUTTER_ULTRA36_EXPLANATIONS_A,...c.SHUTTER_ULTRA36_EXPLANATIONS_B}));break;case"sensor":t=Promise.all([ne(()=>import("./explanations-DgZKQppk.js"),__vite__mapDeps([60,41,45,57]),import.meta.url),ne(()=>import("./sensorNextGenExplanations-CHPfukQ0.js"),[],import.meta.url)]).then(([s,o])=>n({...s.MACRO_EXPLANATIONS,...o.SENSOR_NEXTGEN_EXPLANATIONS}));break;case"micro":t=Promise.all([ne(()=>import("./explanations-DgZKQppk.js"),__vite__mapDeps([60,41,45,57]),import.meta.url),ne(()=>import("./microPixelNextGenExplanations-CR3tDPn4.js"),[],import.meta.url)]).then(([s,o])=>n({...s.MICRO_EXPLANATIONS,...o.MICRO_NEXTGEN_EXPLANATIONS}));break;case"micro_v2":t=Promise.all([ne(()=>import("./microPixelV2Explanations-Ds_g-StQ.js"),__vite__mapDeps([61,48,57]),import.meta.url),ne(()=>import("./microPixelV2DeepExplanations-CJhaoa5m.js"),[],import.meta.url)]).then(([s,o])=>n({...s.MICRO_V2_EXPLANATIONS,...o.MICRO_V2_DEEP_EXPLANATIONS}));break;case"mainboard":t=ne(()=>import("./mainboardExplanations-CFCwOEoo.js"),__vite__mapDeps([62,57,34]),import.meta.url).then(s=>n(s.MAINBOARD_EXPLANATIONS));break;case"evf":t=ne(()=>import("./evfExplanations-DI8qSmkq.js"),__vite__mapDeps([63,57,25]),import.meta.url).then(s=>n(s.EVF_EXPLANATIONS));break;case"lcd":t=Promise.all([ne(()=>import("./lcdExplanations-DVJLFMAP.js"),__vite__mapDeps([64,28,57]),import.meta.url),ne(()=>import("./lcdUltraOemExplanations-CI_uk3nO.js"),[],import.meta.url),ne(()=>import("./lcdUltraTechExplanations-CnjedjBN.js"),[],import.meta.url),ne(()=>import("./lcdUltraDeepExplanations-3u9mqkCF.js"),[],import.meta.url)]).then(([s,o,a,l])=>n({...s.LCD_EXPLANATIONS,...o.LCD_ULTRA_OEM_EXPLANATIONS,...a.LCD_ULTRA_TECH_EXPLANATIONS,...l.LCD_ULTRA_DEEP_EXPLANATIONS}));break;case"body":t=Promise.all([ne(()=>import("./bodyExplanations-kgPdKIc9.js"),__vite__mapDeps([65,57,20]),import.meta.url),ne(()=>import("./bodyNextGenExplanations--jRwbaL2.js"),[],import.meta.url),ne(()=>import("./bodyUltra25Explanations-CYatOCbR.js"),[],import.meta.url)]).then(([s,o,a])=>n({...s.BODY_EXPLANATIONS,...o.BODY_NEXTGEN_EXPLANATIONS,...a.BODY_ULTRA25_EXPLANATIONS}));break;case"battery":t=Promise.all([ne(()=>import("./batteryExplanations-BeDaaZxE.js"),__vite__mapDeps([66,57,4]),import.meta.url),ne(()=>import("./batteryUltra27Explanations-D4Vs8LwE.js"),[],import.meta.url),ne(()=>import("./batteryUltra30Explanations-BO5ebi-w.js"),[],import.meta.url),ne(()=>import("./batteryUltra31Explanations-I-s3ieDM.js"),[],import.meta.url)]).then(([s,o,a,l])=>n({...s.BATTERY_EXPLANATIONS,...o.BATTERY_ULTRA27_EXPLANATIONS,...a.BATTERY_ULTRA30_EXPLANATIONS,...l.BATTERY_ULTRA31_EXPLANATIONS}));break;case"cfexpress":t=Promise.all([ne(()=>import("./cfexpressExplanations-BMV4rYzd.js"),__vite__mapDeps([67,57,8]),import.meta.url),ne(()=>import("./cfexpressUltra27Explanations-nNi1XLCz.js"),[],import.meta.url),ne(()=>import("./cfexpressUltra28Explanations-xks2HbCY.js"),[],import.meta.url),ne(()=>import("./cfexpressUltra29Explanations-DzCl4c2e.js"),[],import.meta.url),ne(()=>import("./cfexpressUltra35Explanations-D5bgh2xi.js"),[],import.meta.url)]).then(([s,o,a,l,c])=>n({...s.CFEXPRESS_EXPLANATIONS,...o.CFEXPRESS_ULTRA27_EXPLANATIONS,...a.CFEXPRESS_ULTRA28_EXPLANATIONS,...l.CFEXPRESS_ULTRA29_EXPLANATIONS,...c.CFEXPRESS_ULTRA35_EXPLANATIONS}));break;case"bionz":t=Promise.all([ne(()=>import("./bionzExplanations-DzHU2T-9.js"),__vite__mapDeps([68,57,37]),import.meta.url),ne(()=>import("./bionzExtraExplanations-BPBMjZCX.js"),[],import.meta.url)]).then(([s,o])=>n({...s.BIONZ_EXPLANATIONS,...o.BIONZ_EXTRA_EXPLANATIONS}));break;case"bionz_v2":t=Promise.all([ne(()=>import("./bionzV2Explanations-CEYRo8Zh.js"),__vite__mapDeps([69,57,39]),import.meta.url),ne(()=>import("./bionzV2DeepExplanations-B7-A1i_E.js"),[],import.meta.url)]).then(([s,o])=>n({...s.BIONZ_V2_EXPLANATIONS,...o.BIONZ_V2_DEEP_EXPLANATIONS}));break;case"mishoe":t=ne(()=>import("./miShoeExplanations-tBt7Xt7q.js"),__vite__mapDeps([70,2]),import.meta.url).then(s=>n(s.MISHOE_EXPLANATIONS));break;case"mic":t=Promise.all([ne(()=>import("./micExplanations-C2aeFQw6.js"),__vite__mapDeps([71,57,10]),import.meta.url),ne(()=>import("./micUltra30Explanations-CAS6Gtxe.js"),[],import.meta.url),ne(()=>import("./micUltra31Explanations-Bj-XHzn_.js"),[],import.meta.url),ne(()=>import("./micUltra36Explanations-801w0TLM.js"),[],import.meta.url)]).then(([s,o,a,l])=>n({...s.MIC_EXPLANATIONS,...o.MIC_ULTRA30_EXPLANATIONS,...a.MIC_ULTRA31_EXPLANATIONS,...l.MIC_ULTRA36_EXPLANATIONS}));break;case"sensor_fab":t=Promise.all([ne(()=>import("./sensorFabExplanations-D2TQiUI1.js"),__vite__mapDeps([72,50,57]),import.meta.url),ne(()=>import("./sensorFabVol1Explanations-Bos_lokV.js"),[],import.meta.url),ne(()=>import("./sensorFabVol2Explanations-NmPUwAYx.js"),[],import.meta.url),ne(()=>import("./sensorFabVol3Explanations-Ci_LGE41.js"),[],import.meta.url),ne(()=>import("./sensorFabVol4Explanations-CaotSDfX.js"),[],import.meta.url),ne(()=>import("./sensorFabVol5Explanations-CECl6FgB.js"),[],import.meta.url)]).then(([s,o,a,l,c,d])=>n({...s.SENSOR_FAB_EXPLANATIONS,...o.SENSOR_FAB_VOL1_EXPLANATIONS,...a.SENSOR_FAB_VOL2_EXPLANATIONS,...l.SENSOR_FAB_VOL3_EXPLANATIONS,...c.SENSOR_FAB_VOL4_EXPLANATIONS,...d.SENSOR_FAB_VOL5_EXPLANATIONS}));break;case"drybox":t=Promise.all([ne(()=>import("./dryboxExplanationsA-DevzWjaY.js"),__vite__mapDeps([73,57,12]),import.meta.url),ne(()=>import("./dryboxExplanationsB-0on_uNo3.js"),[],import.meta.url),ne(()=>import("./dryboxExplanationsC-QzcATb7E.js"),[],import.meta.url),ne(()=>import("./dryboxExplanationsD-BNU_Qg6S.js"),[],import.meta.url),ne(()=>import("./dryboxExplanationsE-BxNW7Dlv.js"),[],import.meta.url),ne(()=>import("./dryboxExplanationsF-BYZ4JlyK.js"),[],import.meta.url),ne(()=>import("./dryboxExplanationsG-CXIZrSb1.js"),[],import.meta.url)]).then(([s,o,a,l,c,d,u])=>n({...s.DRYBOX_EXPLANATIONS_A,...o.DRYBOX_EXPLANATIONS_B,...a.DRYBOX_EXPLANATIONS_C,...l.DRYBOX_EXPLANATIONS_D,...c.DRYBOX_EXPLANATIONS_E,...d.DRYBOX_EXPLANATIONS_F,...u.DRYBOX_EXPLANATIONS_G}));break}return Io.set(i,t),t}async function F0(i){if(!wd(i.explanation))return i.explanation;const t=(await D0(i.subsystem))[i.id];return t?(i.explanation=t,t):i.explanation}let si=null,Do=null;function Rc(){return si?Promise.resolve(si):(Do||(Do=ne(()=>import("./schematicsRegistry-BsierHlA.js"),[],import.meta.url).then(i=>(si=i.renderSchematicSvg,si))),Do)}const U0="http://www.w3.org/2000/svg";function N0(i,e="0 0 24 24"){const t=document.createElementNS(U0,"svg");return t.setAttribute("viewBox",e),t.innerHTML=i,t}function Ri(i){const e=document.createElement("button");return e.type="button",e.className="icon-btn",e.appendChild(N0(i)),e}const Li={prev:'<polyline points="15 18 9 12 15 6"/>',next:'<polyline points="9 18 15 12 9 6"/>',isolate:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/>',hide:'<path d="M3 3l18 18"/><path d="M10.6 10.6a2.5 2.5 0 0 0 3.5 3.5"/><path d="M6.4 6.7C4 8.2 2.4 10.5 2 12c1.2 3.2 5 6.5 10 6.5 1.8 0 3.5-.5 4.9-1.2"/><path d="M9.8 5.7A10.6 10.6 0 0 1 12 5.5c5 0 8.8 3.3 10 6.5-.4 1.1-1.2 2.4-2.4 3.6"/>',close:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'};function O0(i){return i.includes("ed")||i.includes("flint")||i.includes("focus-b-front")||i.includes("uv-cement")?"ed_chromatic":i.includes("xa")||i.includes("rear-element")||i.includes("rear-cell-spacer")||i.includes("front-meniscus")||i.includes("retaining-rings")||i.includes("potting")||i.includes("phase-align")?"xa_aspheric":i.includes("xd")||i.includes("focus-")||i.includes("guide")||i.includes("antirot")||i.includes("mr-")||i.includes("af-origin")||i.includes("mf-")||i.includes("control-rings")||i.includes("iris-iso-fpc")||i.includes("reinforcing-plates")||i.includes("center-join-ring")||i.includes("clutch-ball-rollers")?"floating_xd":i.includes("hood")||i.includes("baffle")||i.includes("filter")||i.includes("optical-spacers")||i.includes("lighttrap-tube")||i.includes("fluorine")||i.includes("nano-ar")||i.includes("sumi")||i.includes("lightfoil")?"nano_ar_baffle":"aperture_bokeh"}class B0{drawerEl;swatchEl;isolateBtn;bodyEl;lightboxEl;lightboxTitleEl;lightboxStageEl;handlers;renderSeq=0;constructor(e,t){this.handlers=t,this.drawerEl=document.createElement("aside"),this.drawerEl.className="explanation-drawer",this.drawerEl.setAttribute("aria-hidden","true");const n=document.createElement("div");n.className="drawer-toolbar";const s=document.createElement("div");s.className="drawer-toolbar-left",this.swatchEl=document.createElement("span"),this.swatchEl.className="drawer-swatch-pill";const o=Ri(Li.prev),a=Ri(Li.next);o.addEventListener("click",t.onPrev),a.addEventListener("click",t.onNext),s.append(this.swatchEl,o,a);const l=document.createElement("div");l.className="drawer-toolbar-right",this.isolateBtn=Ri(Li.isolate),this.isolateBtn.addEventListener("click",t.onToggleIsolate);const c=Ri(Li.hide);c.addEventListener("click",t.onHideCurrent);const d=Ri(Li.close);d.addEventListener("click",t.onClose),l.append(this.isolateBtn,c,d),n.append(s,l),this.bodyEl=document.createElement("div"),this.bodyEl.className="drawer-body",this.drawerEl.append(n,this.bodyEl),e.appendChild(this.drawerEl),this.lightboxEl=document.createElement("div"),this.lightboxEl.className="schematic-lightbox",this.lightboxEl.setAttribute("aria-hidden","true");const u=document.createElement("div");u.className="schematic-lightbox-card";const f=document.createElement("div");f.className="schematic-lightbox-header",this.lightboxTitleEl=document.createElement("div"),this.lightboxTitleEl.className="schematic-lightbox-title";const r=Ri(Li.close);r.setAttribute("aria-label","閉じる"),r.addEventListener("click",()=>this.closeLightbox()),f.append(this.lightboxTitleEl,r),this.lightboxStageEl=document.createElement("div"),this.lightboxStageEl.className="schematic-lightbox-stage",u.append(f,this.lightboxStageEl),this.lightboxEl.append(u),this.lightboxEl.addEventListener("click",p=>{p.target===this.lightboxEl&&this.closeLightbox()}),window.addEventListener("keydown",p=>{p.key==="Escape"&&this.lightboxEl.classList.contains("is-open")&&this.closeLightbox()}),e.appendChild(this.lightboxEl)}openLightbox(e,t){if(!t)return;const n=t.replace(/\bid="([^"]+)"/g,'id="$1-lb"').replace(/url\(#([^)]+)\)/g,"url(#$1-lb)");this.lightboxTitleEl.textContent=e,this.lightboxStageEl.innerHTML=n,this.lightboxEl.classList.add("is-open"),this.lightboxEl.setAttribute("aria-hidden","false")}closeLightbox(){this.lightboxEl.classList.remove("is-open"),this.lightboxEl.setAttribute("aria-hidden","true"),this.lightboxStageEl.replaceChildren()}renderPopulatedPart(e,t,n){const s=t.specs.map(P=>`
          <div class="exp-spec-row">
            <span class="exp-spec-label">${P.label}</span>
            <span class="exp-spec-value">${P.value}</span>
          </div>`).join(""),o=t.opticsAndPhysics.map(P=>`<li>${P}</li>`).join(""),a=t.plainAnalogy?`
        <div class="exp-analogy">
          <div class="exp-analogy-badge">やさしい解説</div>
          <p class="exp-analogy-text">${t.plainAnalogy}</p>
        </div>`:"",l=t.formula?`
        <div class="exp-formula">
          <div class="exp-formula-expr">${t.formula.expression}</div>
          <div class="exp-formula-desc">${t.formula.description}</div>
        </div>`:"",c=e.subsystem==="lens"&&this.handlers.onOpenOpticsMotion?`
        <button type="button" class="exp-optics-cta" data-open-optics-motion>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 7h5l4 5 4-4h5"/>
            <path d="M3 17h5l4-5 4 4h5"/>
            <path d="M3 12h18" opacity="0.45"/>
            <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none"/>
          </svg>
          <span>このレンズの光学メカニズムをモーションで体感する</span>
        </button>`:"",d=this.handlers.onSwitchMode?e.subsystem==="micro"?{target:"micro_v2",label:"V2 極超解剖図へ（さらに微細な原子・ナノ構造を拡大）",isV2Target:!0}:e.subsystem==="micro_v2"?{target:"micro",label:"V1 ピクセル配列図へ戻る",isV2Target:!1}:e.subsystem==="bionz"?{target:"bionz_v2",label:"V2 極超解剖図へ（2nm GAA・裏面電源を極超拡大）",isV2Target:!0}:e.subsystem==="bionz_v2"?{target:"bionz",label:"V1 BIONZ XR パッケージ図へ戻る",isV2Target:!1}:e.subsystem==="sensor"?{target:"sensor_fab",label:"センサー製造工程（全2,110工程 3D解剖図）を見る",isV2Target:!0}:e.subsystem==="sensor_fab"?e.id==="fab0-p11-sensor-unit-ibis"||e.id==="fab0-p09-dicing-package"?{target:"sensor",label:"フルサイズセンサー ＆ 5軸IBIS 3D解剖図へ移動",isV2Target:!1}:e.id==="fab0-p12-camera-integration"?{target:"integrated",label:"完成ミラーレス一眼カメラ全体 3D解剖図へ移動",isV2Target:!1}:{target:"micro_v2",label:"ピクセル極超解剖図 V2（ナノ構造拡大）へ移動",isV2Target:!0}:e.subsystem==="drybox"&&e.id==="db-camera-lens-showcase"?{target:"integrated",label:"収納カメラ本体＆50mm F1.2 全体3D解剖図へ移動",isV2Target:!1}:null:null,u=d?`
        <button type="button" class="exp-optics-cta exp-v2-cta${d.isV2Target?" is-v2-target":""}" data-switch-mode="${d.target}">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            ${d.isV2Target?'<path d="M12 2.5l2.1 6.2 6.4 3.3-6.4 3.3L12 21.5l-2.1-6.2-6.4-3.3 6.4-3.3z"/>':'<polyline points="15 18 9 12 15 6"/><line x1="9" y1="12" x2="20" y2="12"/>'}
          </svg>
          <span>${d.label}</span>
        </button>`:"",f=this.handlers.onSwitchFabVolume&&e.subsystem==="sensor_fab"?(e.fabVolume??0)===0?{targetVol:1,label:"第1巻：超入門・センサーのしくみと2026年最新アーキテクチャへ進む"}:(e.fabVolume??0)===1?{targetVol:2,label:"第2巻：フェーズ1 砂から超純度エピタキシャルウェーハまで（全60工程）へ進む"}:(e.fabVolume??0)===2?{targetVol:3,label:"第3巻：フェーズ2 センサー設計とフォトマスク製造（全50工程・96枚）へ進む"}:(e.fabVolume??0)===3?{targetVol:4,label:"第4巻：フェーズ3 画素ウェーハ前工程FEOL（全380工程・25マスク）へ進む"}:(e.fabVolume??0)===4?{targetVol:5,label:"第5巻：フェーズ4 画素ウェーハ配線工程BEOL（全210工程・Cu5＋Al1）へ進む"}:{targetVol:0,label:"第0巻：全2,110工程マップ（P1–P12・L01–L12）へ戻る"}:null,r=f?`
        <button type="button" class="exp-optics-cta" data-switch-fab-vol="${f.targetVol}">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4" y="4" width="16" height="16" rx="2.5"/>
            <path d="M9 8h6M9 12h6M9 16h4"/>
          </svg>
          <span>${f.label}</span>
        </button>`:"",p=si?si(t.diagramType):"",v=P=>P.includes('data-evf-hd="1"')||P.includes('data-lcd-hd="1"')||P.includes('data-fab-hd="1"')||P.includes("data-bionz-diagram=")||P.includes('data-sensor-hd="1"')||P.includes('data-mount-hd="1"')||P.includes('data-shutter-hd="1"')||P.includes('data-drybox-hd="1"'),x=v(p);this.bodyEl.innerHTML=`
      <div>
        <div class="exp-category">${t.category}</div>
        <h2 class="exp-title">${t.title}</h2>
        <div class="exp-subtitle">${t.subtitle}</div>
      </div>

      ${c}
      ${r}
      ${u}

      ${a}

      <div class="exp-diagram-box${x?" is-hd-schematic":""}" data-schematic-box role="button" tabindex="0" title="クリックして図解を高精細拡大">
        <div class="exp-diagram-content" data-schematic-content>${p}</div>
        <span class="exp-diagram-zoom-pill">🔍 クリックで高精細拡大</span>
      </div>

      <p class="exp-summary">${t.summary}</p>

      <div class="exp-section">
        <div class="exp-section-heading">光学的・科学的原理</div>
        <ul class="exp-list">${o}</ul>
        ${l}
      </div>

      <div class="exp-section">
        <div class="exp-section-heading">最新世代（2024–2026）の技術革新</div>
        <div class="exp-innovation">${t.nextGenInnovation}</div>
      </div>

      <div class="exp-section">
        <div class="exp-section-heading">主要物理・設計諸元</div>
        <div class="exp-specs">${s}</div>
      </div>
    `;const g=this.bodyEl.querySelector("[data-schematic-box]"),m=this.bodyEl.querySelector("[data-schematic-content]");let M=p;if(!si&&g&&m&&Rc().then(P=>{n!==this.renderSeq||!g.isConnected||(M=P(t.diagramType),m.innerHTML=M,g.classList.toggle("is-hd-schematic",v(M)))}),g){const P=()=>{M&&this.openLightbox(t.title,M)};g.addEventListener("click",P),g.addEventListener("keydown",L=>{(L.key==="Enter"||L.key===" ")&&(L.preventDefault(),P())})}const b=this.bodyEl.querySelector("[data-open-optics-motion]");b&&this.handlers.onOpenOpticsMotion&&b.addEventListener("click",()=>{this.handlers.onOpenOpticsMotion?.(O0(e.id),e.id)});const y=this.bodyEl.querySelector("[data-switch-fab-vol]");y&&f&&this.handlers.onSwitchFabVolume&&y.addEventListener("click",()=>{this.handlers.onSwitchFabVolume?.(f.targetVol)});const I=this.bodyEl.querySelector("[data-switch-mode]");I&&d&&this.handlers.onSwitchMode&&I.addEventListener("click",()=>{this.handlers.onSwitchMode?.(d.target)}),this.bodyEl.scrollTop=0}show(e,t){const n=++this.renderSeq;if(this.swatchEl.style.backgroundColor=e.swatchColor,this.isolateBtn.classList.toggle("is-active",t),this.drawerEl.classList.add("is-open"),this.drawerEl.setAttribute("aria-hidden","false"),!wd(e.explanation)){this.renderPopulatedPart(e,e.explanation,n);return}Promise.all([F0(e),Rc()]).then(([s])=>{n!==this.renderSeq||!this.drawerEl.classList.contains("is-open")||this.renderPopulatedPart(e,s,n)})}setIsolatedState(e){this.isolateBtn.classList.toggle("is-active",e)}hide(){this.renderSeq++,this.closeLightbox(),this.drawerEl.classList.remove("is-open"),this.drawerEl.setAttribute("aria-hidden","true"),window.setTimeout(()=>{this.drawerEl.classList.contains("is-open")||this.bodyEl.replaceChildren()},360)}}const Ss=document.getElementById("app"),V0=document.getElementById("viewport");let di=null,dn="off",pn=!1,vr,_,h,fn=null,Fo=null,cr=!1;const Pa=i=>{_.syncOpticsStudio(i),i?(h.setMode("lens",!0),_.syncMode("lens"),_.syncOpticsStudio(!0),h.setExplode(0),_.setExplodeValue(0),h.setPhysicsActive(!0),_.syncPhysics(!0),h.frameLensForOpticsStudio(!1),O()):(h.getMode()==="lens"&&(h.refreshVisibility(),_.syncLensSection(h.getLensSection()),h.setCameraPreset("iso",!1),O()),h.requestRenderFrame())},z0=()=>fn?Promise.resolve(fn):(Fo||(Fo=ne(()=>import("./LensOpticsStudio-CK1rbMr9.js"),[],import.meta.url).then(i=>(fn=new i.LensOpticsStudio(Ss,{onOpenChange:Pa,onHoverPart:e=>{di=e,h.setHoveredPartFromUI(e),_.syncHighlight(h.getSelectedPart()?.id??null,di)},onSelectPart:e=>{h.selectPart(e,!1)},onRequestRenderFrame:()=>{h.requestRenderFrame()}}),fn))),Fo),gt={getIsOpen:()=>fn?fn.getIsOpen():cr||hn.studioOpen,open:(i,e)=>{const t=e??void 0;if(fn){fn.open(i,t);return}cr=!0,i&&hn.setScenario(i),e!==void 0&&hn.setHoveredElement(e),hn.setStudioOpen(!0),Pa(!0),z0().then(n=>{cr&&n.open(i,t)})},close:()=>{cr=!1,fn?fn.close():hn.studioOpen&&(hn.setStudioOpen(!1),Pa(!1))},toggle:()=>{gt.getIsOpen()?gt.close():gt.open()}},ki=()=>{const i=document;return!!(document.fullscreenElement||i.webkitFullscreenElement)},Hi=()=>{const i=ki()||pn;Ss.classList.toggle("is-zen-fullscreen",pn),_.syncFullscreen(i),h.handleResize()},qa=async()=>{const i=document,e=document.documentElement;if(ki()){try{document.exitFullscreen?await document.exitFullscreen():i.webkitExitFullscreen&&await i.webkitExitFullscreen()}catch{}pn=!1,Hi();return}if(pn){pn=!1,Hi();return}let t=!1;try{document.fullscreenEnabled!==!1&&e.requestFullscreen?(await e.requestFullscreen(),t=ki()):e.webkitRequestFullscreen&&(await e.webkitRequestFullscreen(),t=ki())}catch{t=!1}t||(pn=!0),Hi()},O=()=>{const i=h.getPartsForCurrentMode(),e=h.getSelectedPart()?.id??null;_.renderLayerRail(i,e,di,t=>h.isPartHidden(t),h.hasAnyHidden())};h=new C0(V0,{onSelectPart:i=>{Ss.classList.toggle("has-drawer",!!i),i?vr.show(i,h.isIsolated()):vr.hide(),O()},onHoverPart:i=>{di=i,hn.setHoveredElement(i),_.syncHighlight(h.getSelectedPart()?.id??null,di)},onVisibilityChanged:()=>{vr.setIsolatedState(h.isIsolated()),O()},onQualityChanged:i=>{_&&_.syncQuality(i)}});_=new L0(Ss,{onModeChange:i=>{i!=="lens"&&i!=="integrated"&&gt.getIsOpen()&&gt.close(),h.setMode(i),_.syncLensSection(h.getLensSection()),_.setExplodeValue(h.getExplode()),O()},onLensSectionChange:i=>{gt.getIsOpen()&&gt.close(),h.setLensSection(i),O()},onSensorFabVolumeChange:i=>{h.setSensorFabVolume(i,!1),_.syncFabVolume(i),_.syncFabStage(i===0?"overview":i===1?"v1_overview":i===2?"v2_overview":i===3?"v3_overview":i===4?"v4_overview":"v5_overview"),O()},onSensorFabStageChange:i=>{h.focusSensorFabStage(i,!1)},onExplodeChange:i=>{h.setExplode(i)},onSectionAxisChange:i=>{dn=i,h.setSection(i)},onSectionValueChange:i=>{h.setSection(dn,i)},onRenderModeChange:i=>{h.setRenderMode(i)},onQualityChange:i=>{h.setQuality(i)},onPhysicsToggle:i=>{h.setPhysicsActive(i)},onOpticsStudioToggle:()=>{gt.toggle()},onResetVisibility:()=>{h.resetAllVisibility()},onFullscreenToggle:()=>{qa()},onCameraPreset:i=>{h.setCameraPreset(i)},onSelectPart:i=>{(h.getSelectedPart()?.id??null)===i?h.selectPart(null,!1):h.selectPart(i,!gt.getIsOpen())},onHoverPart:i=>{di=i,hn.setHoveredElement(i),h.setHoveredPartFromUI(i),_.syncHighlight(h.getSelectedPart()?.id??null,di)},onToggleHidePart:i=>{h.togglePartHidden(i)}});vr=new B0(Ss,{onClose:()=>h.selectPart(null,!1),onPrev:()=>h.stepSelectedPart(-1),onNext:()=>h.stepSelectedPart(1),onToggleIsolate:()=>h.toggleIsolateSelected(),onHideCurrent:()=>{const i=h.getSelectedPart();i&&h.togglePartHidden(i.id)},onOpenOpticsMotion:(i,e)=>{h.selectPart(null,!1),gt.open(i,e)},onSwitchMode:i=>{gt.getIsOpen()&&gt.close(),h.setMode(i),_.syncMode(i),_.setExplodeValue(h.getExplode()),O()},onSwitchFabVolume:i=>{h.setMode("sensor_fab",!1),h.setSensorFabVolume(i,!1),_.syncFabVolume(i),_.syncFabStage(i===0?"overview":i===1?"v1_overview":i===2?"v2_overview":i===3?"v3_overview":i===4?"v4_overview":"v5_overview"),_.syncMode("sensor_fab"),O()}});document.addEventListener("fullscreenchange",()=>{ki()||(pn=!1),Hi()});document.addEventListener("webkitfullscreenchange",()=>{ki()||(pn=!1),Hi()});const ms=i=>{h.setQuality(i),_.syncQuality(h.getQuality())};window.addEventListener("keydown",i=>{if(i.key==="Escape")pn&&(pn=!1,Hi()),h.getSelectedPart()?h.selectPart(null,!1):gt.getIsOpen()&&gt.close();else if((i.key==="1"||i.key==="2"||i.key==="3")&&h.getMode()==="lens"&&!gt.getIsOpen()&&!i.ctrlKey&&!i.metaKey&&!i.altKey){const e=Number(i.key);h.setLensSection(e),_.syncLensSection(e),O()}else if((i.key==="v"||i.key==="V")&&!i.ctrlKey&&!i.metaKey&&!i.altKey){const e=h.getMode(),t=e==="micro"?"micro_v2":e==="micro_v2"?"micro":e==="bionz"?"bionz_v2":e==="bionz_v2"?"bionz":null;t&&(h.setMode(t),_.syncMode(t),_.setExplodeValue(h.getExplode()),O())}else if((i.key==="f"||i.key==="F")&&!i.ctrlKey&&!i.metaKey&&!i.altKey)qa();else if((i.key==="u"||i.key==="U")&&!i.ctrlKey&&!i.metaKey&&!i.altKey){const e=h.getQuality();ms(e==="standard"?"high":e==="high"?"ultra":"standard")}else(i.key==="p"||i.key==="P")&&h.isV2Mode()&&!i.ctrlKey&&!i.metaKey&&!i.altKey?h.getV2Runtime().togglePerfHud():i.key==="ArrowDown"||i.key==="ArrowRight"?h.getSelectedPart()&&h.stepSelectedPart(1):(i.key==="ArrowUp"||i.key==="ArrowLeft")&&h.getSelectedPart()&&h.stepSelectedPart(-1)});const Pd=new URLSearchParams(window.location.search),dr=Pd.get("quality")?.toLowerCase();dr==="standard"||dr==="std"?ms("standard"):dr==="high"?ms("high"):dr==="ultra"?ms("ultra"):_.syncQuality(h.getQuality());const Lc={getDiagnostics:()=>h.getV2Runtime().getDiagnostics(),togglePerfHud:()=>h.getV2Runtime().togglePerfHud(),setPerfHudVisible:i=>h.getV2Runtime().setPerfHudVisible(i),isV2Mode:()=>h.isV2Mode()};window.__cad={viewport:h,controls:_,opticsStudio:gt,toggleFullscreen:qa,setQuality:ms,v2:Lc,mishoeV2:Lc};O();const V=Pd.get("preset");V==="complete_assembled"?(h.setMode("integrated",!0),_.syncMode("integrated"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("iso",!0),O()):V==="complete_back"?(h.setMode("integrated",!0),_.syncMode("integrated"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("back",!0),O()):V==="complete_exploded"?(h.setMode("integrated",!0),_.syncMode("integrated"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="complete_section"?(h.setMode("integrated",!0),_.syncMode("integrated"),h.setExplode(0,!0),dn="x",h.setSection("x",.54),_.syncSectionAxis("x",.54),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="camera_body_assembled"?(h.setMode("camera_body",!0),_.syncMode("camera_body"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("iso",!0),O()):V==="camera_body_exploded"?(h.setMode("camera_body",!0),_.syncMode("camera_body"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="lens_assembled"?(h.setMode("lens",!0),_.syncMode("lens"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("iso",!0),O()):V==="lens_exploded"?(h.setMode("lens",!0),_.syncMode("lens"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="lens_drawer"?(h.setMode("lens",!0),_.syncMode("lens"),h.setExplode(.88,!0),_.setExplodeValue(.88),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lens-xd-motors",!1),O()):V==="lens_super_drawer"?(h.setMode("lens",!0),_.syncMode("lens"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lens-mcu-pcb",!1),O()):V==="lens_ultra_drawer"?(h.setMode("lens",!0),_.syncMode("lens"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lens-bayonet-shims",!1),O()):V==="lens_ultra62_exploded"?(h.setMode("lens",!0),_.syncMode("lens"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="lens_ultra62_drawer"?(h.setMode("lens",!0),_.syncMode("lens"),h.setExplode(.9,!0),_.setExplodeValue(.9),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lens-front-tilt-shims",!1),O()):V==="lens_optics_motion"?(gt.open("aperture_bokeh"),h.frameLensForOpticsStudio(!0)):V==="lens_optics_floating"?(gt.open("floating_xd"),h.frameLensForOpticsStudio(!0)):V==="lens_optics_ed"?(gt.open("ed_chromatic"),h.frameLensForOpticsStudio(!0)):V==="lens_optics_xa"?(gt.open("xa_aspheric"),h.frameLensForOpticsStudio(!0)):V==="lens_optics_nano"?(gt.open("nano_ar_baffle"),h.frameLensForOpticsStudio(!0)):V==="sensor_super_drawer"?(h.setMode("sensor",!0),_.syncMode("sensor"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("sensor-hall-pcb",!1),O()):V==="lcd_assembled"?(h.setMode("lcd",!0),_.syncMode("lcd"),h.setExplode(0,!0),_.setExplodeValue(0),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="lcd_exploded"?(h.setMode("lcd",!0),_.syncMode("lcd"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="lcd_drawer"?(h.setMode("lcd",!0),_.syncMode("lcd"),h.setExplode(.85,!0),_.setExplodeValue(.85),h.setCameraPreset("iso",!0),h.selectPart("lcd-4axis-tilt-frame",!1),O()):V==="body_assembled"?(h.setMode("body",!0),_.syncMode("body"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("iso",!0),O()):V==="body_exploded"?(h.setMode("body",!0),_.syncMode("body"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="body_drawer"?(h.setMode("body",!0),_.syncMode("body"),h.setExplode(.88,!0),_.setExplodeValue(.88),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("body-battery-pack",!1),O()):V==="body_ultra_drawer"?(h.setMode("body",!0),_.syncMode("body"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("body-card-ejectors",!1),O()):V==="shutter_ultra_drawer"?(h.setMode("shutter",!0),_.syncMode("shutter"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("shutter-counterweight",!1),O()):V==="lcd_ultra_drawer"?(h.setMode("lcd",!0),_.syncMode("lcd"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lcd-swivel-clutch",!1),O()):V==="mount_assembled"?(h.setMode("mount",!0),_.syncMode("mount"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("iso",!0),O()):V==="mount_exploded"?(h.setMode("mount",!0),_.syncMode("mount"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="mount_section"?(h.setMode("mount",!0),_.syncMode("mount"),h.setExplode(0,!0),dn="x",h.setSection("x",.52),_.syncSectionAxis("x",.52),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="mount_drawer"?(h.setMode("mount",!0),_.syncMode("mount"),h.setExplode(.85,!0),_.setExplodeValue(.85),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mount-flange-ring",!1),O()):V==="mount_contacts_drawer"?(h.setMode("mount",!0),_.syncMode("mount"),h.setExplode(.88,!0),_.setExplodeValue(.88),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mount-contact-pins",!1),O()):V==="evf_assembled"?(h.setMode("evf",!0),_.syncMode("evf"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("iso",!0),O()):V==="evf_exploded"?(h.setMode("evf",!0),_.syncMode("evf"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="evf_section"?(h.setMode("evf",!0),_.syncMode("evf"),h.setExplode(0,!0),dn="x",h.setSection("x",.52),_.syncSectionAxis("x",.52),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="evf_drawer"?(h.setMode("evf",!0),_.syncMode("evf"),h.setExplode(.88,!0),_.setExplodeValue(.88),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("evf-oled-panel",!1),O()):V==="evf_eye_af_drawer"?(h.setMode("evf",!0),_.syncMode("evf"),h.setExplode(.85,!0),_.setExplodeValue(.85),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("evf-dichroic-mirror",!1),O()):V==="mainboard_exploded"?(h.setMode("mainboard",!0),_.syncMode("mainboard"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="mainboard_section"?(h.setMode("mainboard",!0),_.syncMode("mainboard"),h.setExplode(0,!0),dn="x",h.setSection("x",.54),_.syncSectionAxis("x",.54),h.setCameraPreset("iso",!0),O()):V==="mainboard_drawer"?(h.setMode("mainboard",!0),_.syncMode("mainboard"),h.setExplode(.85,!0),_.setExplodeValue(.85),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mb-isp-die",!1),O()):V==="mainboard_npu_drawer"?(h.setMode("mainboard",!0),_.syncMode("mainboard"),h.setExplode(.82,!0),_.setExplodeValue(.82),h.setCameraPreset("iso",!0),h.selectPart("mb-ai-npu",!1),O()):V==="mainboard_back"?(h.setMode("mainboard",!0),_.syncMode("mainboard"),h.setExplode(.65,!0),_.setExplodeValue(.65),h.setCameraPreset("back",!0),O()):V==="shutter_assembled"?(h.setMode("shutter",!0),_.syncMode("shutter"),h.setExplode(0,!0),h.setCameraPreset("iso",!0),O()):V==="shutter_exploded"?(h.setMode("shutter",!0),_.syncMode("shutter"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="shutter_section"?(h.setMode("shutter",!0),_.syncMode("shutter"),h.setExplode(0,!0),dn="x",h.setSection("x",.56),_.syncSectionAxis("x",.56),h.setCameraPreset("iso",!0),O()):V==="shutter_drawer"?(h.setMode("shutter",!0),_.syncMode("shutter"),h.setExplode(.82,!0),_.setExplodeValue(.82),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("shutter-curtain-2",!1),O()):V==="integrated_exploded"?(h.setMode("integrated",!0),_.syncMode("integrated"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="integrated_assembled"?(h.setMode("integrated",!0),_.syncMode("integrated"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("iso",!0),O()):V==="sensor_exploded"||V==="exploded"?(h.setMode("sensor",!0),_.syncMode("sensor"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="back"?(h.setMode("sensor",!0),_.syncMode("sensor"),h.setExplode(.72,!0),_.setExplodeValue(.72),h.setCameraPreset("back",!0),O()):V==="section"?(h.setMode("sensor",!0),_.syncMode("sensor"),h.setExplode(0,!0),dn="x",h.setSection("x",.48),_.syncSectionAxis("x",.48),h.setCameraPreset("iso",!0),O()):V==="drawer"?(h.setMode("sensor",!0),_.syncMode("sensor"),h.setExplode(.82,!0),_.setExplodeValue(.82),h.setCameraPreset("iso",!0),h.selectPart("cmos-die",!1),O()):V==="micro"?(h.setMode("micro",!0),_.syncMode("micro"),h.setExplode(.72,!0),_.setExplodeValue(.72),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="micro_drawer"?(h.setMode("micro",!0),_.syncMode("micro"),h.setExplode(.65,!0),_.setExplodeValue(.65),h.setCameraPreset("iso",!0),h.selectPart("micro-2layer-gs",!1),O()):V==="phase11_mount"?(h.setMode("mount",!0),_.syncMode("mount"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mount-esd-ground-clips",!1),O()):V==="phase11_sensor"?(h.setMode("sensor",!0),_.syncMode("sensor"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("sensor-dram-wafer",!1),O()):V==="phase11_micro"?(h.setMode("micro",!0),_.syncMode("micro"),h.setExplode(.85,!0),_.setExplodeValue(.85),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("micro-fdti-doping",!1),O()):V==="phase11_shutter"?(h.setMode("shutter",!0),_.syncMode("shutter"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("shutter-x-sync-contact",!1),O()):V==="phase11_evf"?(h.setMode("evf",!0),_.syncMode("evf"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("evf-oled-mla-stack",!1),O()):V==="phase11_lcd"?(h.setMode("lcd",!0),_.syncMode("lcd"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lcd-lgp-led-bar",!1),O()):V==="phase11_lens"?(h.setMode("lens",!0),_.syncMode("lens"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lens-mr-magnet-scales",!1),O()):V==="phase12_mainboard"?(h.setMode("mainboard",!0),_.syncMode("mainboard"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mb-hdmi-daughterboard",!1),O()):V==="phase12_body"?(h.setMode("body",!0),_.syncMode("body"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("body-evf-tie-bracket",!1),O()):V==="phase12_micro"?(h.setMode("micro",!0),_.syncMode("micro"),h.setExplode(.9,!0),_.setExplodeValue(.9),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("micro-lofic-cap",!1),O()):V==="phase13_mount"?(h.setMode("mount",!0),_.syncMode("mount"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mount-im-adjust-washer",!1),O()):V==="phase13_shutter"?(h.setMode("shutter",!0),_.syncMode("shutter"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("shutter-mb-floating-shaft",!1),O()):V==="phase13_body"?(h.setMode("body",!0),_.syncMode("body"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("body-gyro-sensor-unit",!1),O()):V==="phase14_sensor"?(h.setMode("sensor",!0),_.syncMode("sensor"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("sensor-imager-fix-shafts",!1),O()):V==="phase14_micro"?(h.setMode("micro",!0),_.syncMode("micro"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("micro-fd-dcg-switch",!1),O()):V==="phase15_lcd"?(h.setMode("lcd",!0),_.syncMode("lcd"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lcd-fine-coaxial-bundle",!1),O()):V==="phase34_lcd"?(h.setMode("lcd",!0),_.syncMode("lcd"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lcd-tandem-oled-stack",!1),O()):V==="phase35_lcd"?(h.setMode("lcd",!0),_.syncMode("lcd"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lcd-microled-gan-array",!1),O()):V==="phase16_mainboard"?(h.setMode("mainboard",!0),_.syncMode("mainboard"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mb-vc-evaporator-plate",!1),O()):V==="phase16_evf"?(h.setMode("evf",!0),_.syncMode("evf"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("evf-oem-finder-cover",!1),O()):V==="phase16_body"?(h.setMode("body",!0),_.syncMode("body"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("body-dl1008-rtc-flex",!1),O()):V==="phase17_shutter"?(h.setMode("shutter",!0),_.syncMode("shutter"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("shutter-rivet-reinforce-collars",!1),O()):V==="phase34_shutter"?(h.setMode("shutter",!0),_.syncMode("shutter"),h.setExplode(.96,!0),_.setExplodeValue(.96),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("shutter-coaxial-friction-brake",!1),O()):V==="phase36_shutter"?(h.setMode("shutter",!0),_.syncMode("shutter"),h.setExplode(.96,!0),_.setExplodeValue(.96),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("shutter-eddy-current-self-brake",!1),O()):V==="phase18_lens"?(h.setMode("lens",!0),h.setLensSection(3,!0),_.syncMode("lens"),_.syncLensSection(3),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lens-nano-ar-ii-layer",!1),O()):V==="phase18_mount"?(h.setMode("mount",!0),_.syncMode("mount"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mount-bayonet-leadin-dlc",!1),O()):V==="phase19_lens_s1"?(h.setMode("lens",!0),h.setLensSection(1,!0),_.syncMode("lens"),_.syncLensSection(1),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lens-iris-click-wedge-lever",!1),O()):V==="phase19_lens_s2"?(h.setMode("lens",!0),h.setLensSection(2,!0),_.syncMode("lens"),_.syncLensSection(2),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lens-mid-block-core-frame",!1),O()):V==="phase19_lens_s3"?(h.setMode("lens",!0),h.setLensSection(3,!0),_.syncMode("lens"),_.syncLensSection(3),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lens-hood-release-lock-pin",!1),O()):V==="phase19_micro"?(h.setMode("micro",!0),_.syncMode("micro"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("micro-column-cds-sh",!1),O()):V==="phase19_sensor"?(h.setMode("sensor",!0),_.syncMode("sensor"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("sensor-birefringent-olpf",!1),O()):V==="phase19_mainboard"?(h.setMode("mainboard",!0),_.syncMode("mainboard"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mb-card-detect-heartcam",!1),O()):V==="phase20_micro"?(h.setMode("micro",!0),_.syncMode("micro"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("micro-inpixel-dram-gs",!1),O()):V==="phase20_mount"?(h.setMode("mount",!0),_.syncMode("mount"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mount-screw-orange-orings",!1),O()):V==="phase23_micro"?(h.setMode("micro",!0),_.syncMode("micro"),h.setExplode(.86,!0),_.setExplodeValue(.86),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("micro-mpcr-color-router",!1),O()):V==="phase24_body"?(h.setMode("body",!0),_.syncMode("body"),h.setExplode(.85,!0),_.setExplodeValue(.85),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("body-active-cooling-fan-duct",!1),O()):V==="phase25_sensor"?(h.setMode("sensor",!0),_.syncMode("sensor"),h.setExplode(.88,!0),_.setExplodeValue(.88),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("sensor-electronic-vnd",!1),O()):V==="phase25_body"?(h.setMode("body",!0),_.syncMode("body"),h.setExplode(.86,!0),_.setExplodeValue(.86),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("body-gnss-ceramic-antenna",!1),O()):V==="battery"?(h.setMode("battery",!0),_.syncMode("battery"),h.setExplode(.88,!0),_.setExplodeValue(.88),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("bat-infolithium-fuelgauge",!1),O()):V==="battery_assembled"?(h.setMode("battery",!0),_.syncMode("battery"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("iso",!0),O()):V==="battery_ultra100"?(h.setMode("battery",!0),_.syncMode("battery"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("bat-cvd-sic-porous-scaffold",!1),O()):V==="battery_ultra130"?(h.setMode("battery",!0),_.syncMode("battery"),h.setExplode(.94,!0),_.setExplodeValue(.94),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("bat-argyrodite-li6ps5cl-2026",!1),O()):V==="cfexpress"?(h.setMode("cfexpress",!0),_.syncMode("cfexpress"),h.setExplode(.88,!0),_.setExplodeValue(.88),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("cfe-pcie4-controller-soc",!1),O()):V==="cfexpress_assembled"?(h.setMode("cfexpress",!0),_.syncMode("cfexpress"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("iso",!0),O()):V==="cfexpress_back"?(h.setMode("cfexpress",!0),_.syncMode("cfexpress"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("back",!0),O()):V==="cfexpress_exploded"?(h.setMode("cfexpress",!0),_.syncMode("cfexpress"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="cfexpress_ultra100"?(h.setMode("cfexpress",!0),_.syncMode("cfexpress"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("cfe-multiplane-6plane-mpir",!1),O()):V==="cfexpress_ultra130"?(h.setMode("cfexpress",!0),_.syncMode("cfexpress"),h.setExplode(.94,!0),_.setExplodeValue(.94),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("cfe-fenand-hzo-igzo-2026",!1),O()):V==="cfexpress_ultra170"?(h.setMode("cfexpress",!0),_.syncMode("cfexpress"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("cfe-bwwpc-wafer-power-grid",!1),O()):V==="bionz_assembled"?(h.setMode("bionz",!0),_.syncMode("bionz"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("iso",!0),O()):V==="bionz_exploded"?(h.setMode("bionz",!0),_.syncMode("bionz"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="bionz_drawer"?(h.setMode("bionz",!0),_.syncMode("bionz"),h.setExplode(.86,!0),_.setExplodeValue(.86),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("xr-ai-npu-systolic",!1),O()):V==="mishoe_assembled"?(h.setMode("mishoe",!0),_.syncMode("mishoe"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("iso",!0),O()):V==="mishoe_exploded"?(h.setMode("mishoe",!0),_.syncMode("mishoe"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="mishoe_drawer"?(h.setMode("mishoe",!0),_.syncMode("mishoe"),h.setExplode(.86,!0),_.setExplodeValue(.86),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mi-pins-8to12-digital-audio",!1),O()):V==="mic_assembled"?(h.setMode("mic",!0),_.syncMode("mic"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("iso",!0),O()):V==="mic_exploded"?(h.setMode("mic",!0),_.syncMode("mic"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="mic_drawer"?(h.setMode("mic",!0),_.syncMode("mic"),h.setExplode(.86,!0),_.setExplodeValue(.86),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mc-mems-sdm-vacuum-cell",!1),O()):V==="mic_ultra80"?(h.setMode("mic",!0),_.syncMode("mic"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mc-optical-mems-vcsel-2026",!1),O()):V==="mic_ultra110"?(h.setMode("mic",!0),_.syncMode("mic"),h.setExplode(.94,!0),_.setExplodeValue(.94),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mc-graphene-2d-membrane-2026",!1),O()):V==="mic_ultra150"?(h.setMode("mic",!0),_.syncMode("mic"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mc-jk1028-audio-jack-flex",!1),O()):V==="micro_v2_assembled"?(h.setMode("micro_v2",!0),_.syncMode("micro_v2"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("iso",!0),O()):V==="micro_v2_exploded"?(h.setMode("micro_v2",!0),_.syncMode("micro_v2"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="micro_v2_drawer"?(h.setMode("micro_v2",!0),_.syncMode("micro_v2"),h.setExplode(.76,!0),_.setExplodeValue(.76),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("pv2-lofic-3d-pillar-cap",!1),O()):V==="bionz_v2_assembled"?(h.setMode("bionz_v2",!0),_.syncMode("bionz_v2"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("iso",!0),O()):V==="bionz_v2_exploded"?(h.setMode("bionz_v2",!0),_.syncMode("bionz_v2"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="bionz_v2_drawer"?(h.setMode("bionz_v2",!0),_.syncMode("bionz_v2"),h.setExplode(.76,!0),_.setExplodeValue(.76),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("xv2-gaa-si-nanosheets",!1),O()):V==="sensor_fab_assembled"?(h.setMode("sensor_fab",!0),_.syncMode("sensor_fab"),h.setExplode(0,!0),_.setExplodeValue(0),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="sensor_fab_exploded"?(h.setMode("sensor_fab",!0),_.syncMode("sensor_fab"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="sensor_fab_drawer"?(h.setMode("sensor_fab",!0),_.syncMode("sensor_fab"),h.setExplode(.45,!0),_.setExplodeValue(.45),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("fab0-p06-cucu-bond-bsi",!1),O()):V==="sensor_fab_litho"?(h.setMode("sensor_fab",!0),_.syncMode("sensor_fab"),_.syncFabStage("litho"),h.setExplode(.55,!0),_.setExplodeValue(.55),h.setPhysicsActive(!0),_.syncPhysics(!0),h.focusSensorFabStage("litho",!0),O()):V==="sensor_fab_variants"?(h.setMode("sensor_fab",!0),_.syncMode("sensor_fab"),_.syncFabStage("variants"),h.setExplode(.42,!0),_.setExplodeValue(.42),h.setPhysicsActive(!0),_.syncPhysics(!0),h.focusSensorFabStage("variants",!0),O()):V==="sensor_fab_section"?(h.setMode("sensor_fab",!0),_.syncMode("sensor_fab"),h.setExplode(0,!0),dn="x",h.setSection("x",.52),_.syncSectionAxis("x",.52),h.setCameraPreset("iso",!0),O()):V==="sensor_fab_vol1_assembled"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(1,!0),_.syncFabVolume(1),_.syncFabStage("v1_overview"),_.syncMode("sensor_fab"),h.setExplode(0,!0),_.setExplodeValue(0),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="sensor_fab_vol1_exploded"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(1,!0),_.syncFabVolume(1),_.syncFabStage("v1_overview"),_.syncMode("sensor_fab"),h.setExplode(.75,!0),_.setExplodeValue(.75),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="sensor_fab_vol1_drawer"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(1,!0),_.syncFabVolume(1),_.syncFabStage("v1_overview"),_.syncMode("sensor_fab"),h.setExplode(.35,!0),_.setExplodeValue(.35),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("fab1-gs-pixel-adc-isscc2025",!1),O()):V==="sensor_fab_vol1_archs"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(1,!0),_.syncFabVolume(1),_.syncFabStage("v1_archs"),_.syncMode("sensor_fab"),h.setExplode(.12,!0),_.setExplodeValue(.12),h.focusSensorFabStage("v1_archs",!0),O()):V==="sensor_fab_vol1_duel"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(1,!0),_.syncFabVolume(1),_.syncFabStage("v1_duel"),_.syncMode("sensor_fab"),h.setExplode(.12,!0),_.setExplodeValue(.12),h.focusSensorFabStage("v1_duel",!0),O()):V==="sensor_fab_vol1_wall"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(1,!0),_.syncFabVolume(1),_.syncFabStage("v1_wall"),_.syncMode("sensor_fab"),h.setExplode(.12,!0),_.setExplodeValue(.12),h.focusSensorFabStage("v1_wall",!0),O()):V==="sensor_fab_vol2_assembled"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(2,!0),_.syncFabVolume(2),_.syncFabStage("v2_overview"),_.syncMode("sensor_fab"),h.setExplode(0,!0),_.setExplodeValue(0),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="sensor_fab_vol2_exploded"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(2,!0),_.syncFabVolume(2),_.syncFabStage("v2_overview"),_.syncMode("sensor_fab"),h.setExplode(.75,!0),_.setExplodeValue(.75),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="sensor_fab_vol2_drawer"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(2,!0),_.syncFabVolume(2),_.syncFabStage("v2_overview"),_.syncMode("sensor_fab"),h.setExplode(.28,!0),_.setExplodeValue(.28),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("fab2-ci-complex-gettering-cutaway",!1),O()):V==="sensor_fab_vol2_refine"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(2,!0),_.syncFabVolume(2),_.syncFabStage("v2_refine"),_.syncMode("sensor_fab"),h.setExplode(.1,!0),_.setExplodeValue(.1),h.focusSensorFabStage("v2_refine",!0),O()):V==="sensor_fab_vol2_mcz"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(2,!0),_.syncFabVolume(2),_.syncFabStage("v2_mcz"),_.syncMode("sensor_fab"),h.setExplode(.1,!0),_.setExplodeValue(.1),h.focusSensorFabStage("v2_mcz",!0),O()):V==="sensor_fab_vol2_wafer"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(2,!0),_.syncFabVolume(2),_.syncFabStage("v2_wafer"),_.syncMode("sensor_fab"),h.setExplode(.1,!0),_.setExplodeValue(.1),h.focusSensorFabStage("v2_wafer",!0),O()):V==="sensor_fab_vol2_epi_ship"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(2,!0),_.syncFabVolume(2),_.syncFabStage("v2_epi_ship"),_.syncMode("sensor_fab"),h.setExplode(.1,!0),_.setExplodeValue(.1),h.focusSensorFabStage("v2_epi_ship",!0),O()):V==="sensor_fab_vol3_assembled"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(3,!0),_.syncFabVolume(3),_.syncFabStage("v3_overview"),_.syncMode("sensor_fab"),h.setExplode(0,!0),_.setExplodeValue(0),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="sensor_fab_vol3_exploded"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(3,!0),_.syncFabVolume(3),_.syncFabStage("v3_overview"),_.syncMode("sensor_fab"),h.setExplode(.72,!0),_.setExplodeValue(.72),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="sensor_fab_vol3_drawer"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(3,!0),_.syncFabVolume(3),_.syncFabStage("v3_overview"),_.syncMode("sensor_fab"),h.setExplode(.24,!0),_.setExplodeValue(.24),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("fab3-p28-opc-serif-correction",!1),O()):V==="sensor_fab_vol3_tcad"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(3,!0),_.syncFabVolume(3),_.syncFabStage("v3_tcad"),_.syncMode("sensor_fab"),h.setExplode(.08,!0),_.setExplodeValue(.08),h.focusSensorFabStage("v3_tcad",!0),O()):V==="sensor_fab_vol3_layout"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(3,!0),_.syncFabVolume(3),_.syncFabStage("v3_layout"),_.syncMode("sensor_fab"),h.setExplode(.08,!0),_.setExplodeValue(.08),h.focusSensorFabStage("v3_layout",!0),O()):V==="sensor_fab_vol3_opc"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(3,!0),_.syncFabVolume(3),_.syncFabStage("v3_opc"),_.syncMode("sensor_fab"),h.setExplode(.08,!0),_.setExplodeValue(.08),h.focusSensorFabStage("v3_opc",!0),O()):V==="sensor_fab_vol3_maskfab"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(3,!0),_.syncFabVolume(3),_.syncFabStage("v3_maskfab"),_.syncMode("sensor_fab"),h.setExplode(.08,!0),_.setExplodeValue(.08),h.focusSensorFabStage("v3_maskfab",!0),O()):V==="sensor_fab_vol4_assembled"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(4,!0),_.syncFabVolume(4),_.syncFabStage("v4_overview"),_.syncMode("sensor_fab"),h.setExplode(0,!0),_.setExplodeValue(0),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="sensor_fab_vol4_exploded"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(4,!0),_.syncFabVolume(4),_.syncFabStage("v4_overview"),_.syncMode("sensor_fab"),h.setExplode(.72,!0),_.setExplodeValue(.72),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="sensor_fab_vol4_drawer"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(4,!0),_.syncFabVolume(4),_.syncFabStage("v4_overview"),_.syncMode("sensor_fab"),h.setExplode(.24,!0),_.setExplodeValue(.24),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("fab4-m22-surface-pinning-ppd",!1),O()):V==="sensor_fab_vol4_sti_dti"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(4,!0),_.syncFabVolume(4),_.syncFabStage("v4_sti_dti"),_.syncMode("sensor_fab"),h.setExplode(.08,!0),_.setExplodeValue(.08),h.focusSensorFabStage("v4_sti_dti",!0),O()):V==="sensor_fab_vol4_ppd_mev"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(4,!0),_.syncFabVolume(4),_.syncFabStage("v4_ppd_mev"),_.syncMode("sensor_fab"),h.setExplode(.08,!0),_.setExplodeValue(.08),h.focusSensorFabStage("v4_ppd_mev",!0),O()):V==="sensor_fab_vol4_vtg_gate"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(4,!0),_.syncFabVolume(4),_.syncFabStage("v4_vtg_gate"),_.syncMode("sensor_fab"),h.setExplode(.08,!0),_.setExplodeValue(.08),h.focusSensorFabStage("v4_vtg_gate",!0),O()):V==="sensor_fab_vol4_pin_sab"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(4,!0),_.syncFabVolume(4),_.syncFabStage("v4_pin_sab"),_.syncMode("sensor_fab"),h.setExplode(.08,!0),_.setExplodeValue(.08),h.focusSensorFabStage("v4_pin_sab",!0),O()):V==="sensor_fab_vol5_assembled"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(5,!0),_.syncFabVolume(5),_.syncFabStage("v5_overview"),_.syncMode("sensor_fab"),h.setExplode(0,!0),_.setExplodeValue(0),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="drybox_assembled"?(h.setMode("drybox",!0),_.syncMode("drybox"),h.setExplode(0,!0),_.setExplodeValue(0),h.setPhysicsActive(!1),_.syncPhysics(!1),h.setCameraPreset("iso",!0),O()):V==="drybox_exploded"?(h.setMode("drybox",!0),_.syncMode("drybox"),h.setExplode(.86,!0),_.setExplodeValue(.86),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="sensor_fab_vol5_exploded"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(5,!0),_.syncFabVolume(5),_.syncFabStage("v5_overview"),_.syncMode("sensor_fab"),h.setExplode(.72,!0),_.setExplodeValue(.72),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),O()):V==="sensor_fab_vol5_drawer"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(5,!0),_.syncFabVolume(5),_.syncFabStage("v5_overview"),_.syncMode("sensor_fab"),h.setExplode(.24,!0),_.setExplodeValue(.24),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("fab5-p206-hb-recess-cmp",!1),O()):V==="sensor_fab_vol5_w_m1"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(5,!0),_.syncFabVolume(5),_.syncFabStage("v5_w_m1"),_.syncMode("sensor_fab"),h.setExplode(.08,!0),_.setExplodeValue(.08),h.focusSensorFabStage("v5_w_m1",!0),O()):V==="sensor_fab_vol5_m2_m4"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(5,!0),_.syncFabVolume(5),_.syncFabStage("v5_m2_m4"),_.syncMode("sensor_fab"),h.setExplode(.08,!0),_.setExplodeValue(.08),h.focusSensorFabStage("v5_m2_m4",!0),O()):V==="sensor_fab_vol5_m5_wat"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(5,!0),_.syncFabVolume(5),_.syncFabStage("v5_m5_wat"),_.syncMode("sensor_fab"),h.setExplode(.08,!0),_.setExplodeValue(.08),h.focusSensorFabStage("v5_m5_wat",!0),O()):V==="sensor_fab_vol5_hb_cmp"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(5,!0),_.syncFabVolume(5),_.syncFabStage("v5_hb_cmp"),_.syncMode("sensor_fab"),h.setExplode(.08,!0),_.setExplodeValue(.08),h.focusSensorFabStage("v5_hb_cmp",!0),O()):V==="drybox_back"?(h.setMode("drybox",!0),_.syncMode("drybox"),h.setExplode(.45,!0),_.setExplodeValue(.45),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("back",!0),O()):V==="drybox_section"?(h.setMode("drybox",!0),_.syncMode("drybox"),h.setExplode(0,!0),_.setExplodeValue(0),dn="x",h.setSection("x",.52),_.syncSectionAxis("x",.52),h.setCameraPreset("iso",!0),O()):V==="drybox_drawer"&&(h.setMode("drybox",!0),_.syncMode("drybox"),h.setExplode(.55,!0),_.setExplodeValue(.55),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("db-pem-nafion-membrane",!1),O());export{Y0 as $,bt as A,en as B,Ir as C,ii as D,ln as E,Ke as F,as as G,hf as H,Vr as I,ld as J,ls as K,W0 as L,at as M,rd as N,nl as O,zl as P,wa as Q,Ur as R,tl as S,_d as T,ad as U,A as V,gr as W,nd as X,ka as Y,k0 as Z,gd as _,zr as a,ne as a0,an as a1,pd as a2,q0 as a3,sd as a4,bs as b,H0 as c,mn as d,Od as e,li as f,qe as g,G0 as h,X0 as i,_t as j,Yt as k,Qc as l,md as m,y0 as n,ud as o,kt as p,Hu as q,ie as r,hn as s,od as t,$0 as u,fd as v,vd as w,Lu as x,Lr as y,Cr as z};

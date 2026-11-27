const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./welcome-DBxz24T6.js","./welcome-Ce7Ng2Al.js","./BufferGeometryUtils-C1jbUmpk.js","./v2_unit_compiler-CAjDvGpN.js","./mi_shoe-pwdBj5II.js","./mi_shoe-CaQBxxP9.js","./battery-RyWap-h3.js","./battery-Cw3gePVg.js","./UltraDetailBuilders-CgYzdlZh.js","./cfexpress-DDfkGrAc.js","./cfexpress-DY8cI-Wc.js","./mic-DBizln4F.js","./mic-CwD_McdS.js","./drybox-BmRCpdG8.js","./drybox-00mboV4n.js","./mount-DWvwy581.js","./mount-D5exe6iE.js","./mountPhysicsOverlay-CUf4gUbJ.js","./shutter-BVBtEzqy.js","./shutter-DRF49fuH.js","./shutterPhysicsOverlay-Cglxm4uH.js","./body-wIasqRfe.js","./body-DYuOmmPC.js","./bodyPhysicsOverlay-BGAFGHOj.js","./lcdParts-CMWx1T5k.js","./evfParts-DCQtTRB1.js","./evf-CGhylB64.js","./evf-yJM6r-pP.js","./evfPhysicsOverlay-BK5IzsPk.js","./lcd-Uhc9LJ7g.js","./lcd-C5DFy3jF.js","./lcdPhysicsOverlay-RkZV2EOg.js","./lens-BRQ8fip_.js","./lens-DbGM9PCN.js","./lensPhysicsOverlay-CWvxY-_9.js","./mainboard-BHej6QxS.js","./mainboard-kTn1WrHF.js","./mainboardPhysicsOverlay-BfpLjKSE.js","./bionz-ClHF8aAe.js","./bionz-CtB3oT0v.js","./bionz_v2-CmYkRODF.js","./bionz_v2-BTlxc95w.js","./sensor-C7liHQoZ.js","./sensor-CoYD7fba.js","./macroParts-B_rpLMOq.js","./physicsOverlay-ACzRIz25.js","./micro-x6hhqG6D.js","./micro-cCBBsnJi.js","./sensorMicroUltraAuditParts-DX1pvWZR.js","./micro_v2-C0MwDO-8.js","./micro_v2-Be62c30w.js","./sensor_fab-C27pmCPU.js","./sensor_fab-Cu3xZEwo.js","./integrated-CUjhP8RA.js","./integrated-_M_HiRFo.js","./camera_macro_shared-0ryWcN4p.js","./camera_body-CxDtI3m5.js","./camera_body-CnaAZIgr.js","./lensExplanations-CVIj2Kn6.js","./unit_explanations-DhEhaoi2.js","./mountExplanations-BzfMkKM6.js","./shutterExplanations-COwEmSMe.js","./explanations-DgZKQppk.js","./microPixelV2Explanations-Ds_g-StQ.js","./mainboardExplanations-CFCwOEoo.js","./evfExplanations-DI8qSmkq.js","./lcdExplanations-DVJLFMAP.js","./bodyExplanations-kgPdKIc9.js","./batteryExplanations-BeDaaZxE.js","./cfexpressExplanations-BMV4rYzd.js","./bionzExplanations-DzHU2T-9.js","./bionzV2Explanations-CEYRo8Zh.js","./miShoeExplanations-tBt7Xt7q.js","./micExplanations-C2aeFQw6.js","./sensorFabExplanations-D2TQiUI1.js","./dryboxExplanationsA-DevzWjaY.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const cu="modulepreload",hu=function(i,e){return new URL(i,e).href},ml={},se=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){let a=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};const o=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");s=a(t.map(d=>{if(d=hu(d,n),d in ml)return;ml[d]=!0;const u=d.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(!!n)for(let v=o.length-1;v>=0;v--){const g=o[v];if(g.href===d&&(!u||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${f}`))return;const x=document.createElement("link");if(x.rel=u?"stylesheet":cu,u||(x.as="script"),x.crossOrigin="",x.href=d,c&&x.setAttribute("nonce",c),document.head.appendChild(x),u)return new Promise((v,g)=>{x.addEventListener("load",v),x.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return s.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return e().catch(r)})},Qr=82,gl=0,ea=[{partId:"lens-front-xa",code:"E01",groupCode:"G1",shortLabel:"XA₁",jaName:"第1枚 XA超高度非球面 (0.01μm)",role:"F1.2の大光束を取り込みつつ球面収差と玉ボケの年輪を根本抑制",z:108.5,thick:5,ap:32.5,rF:117.92,rR:185,nd:1.772,vd:49.6,kind:"xa",isXa:!0,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:46218e-11,a6F:51747e-14,focusGroup:"fixed"},{partId:"lens-front-meniscus",code:"E02",groupCode:"G2",shortLabel:"LaK",jaName:"第2枚 高屈折ランタン正メニスカス",role:"高屈折率 n=1.883 で大口径光束を緩やかに絞り方向へ集光",z:101.8,thick:4.6,ap:31,rF:78,rR:165,nd:1.883,vd:40.8,kind:"lanthanum",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"fixed"},{partId:"lens-ed-group",code:"E03",groupCode:"G3a",shortLabel:"S-ED",jaName:"第3枚 スーパーED凸レンズ",role:"蛍石に迫る超低分散 νd=94.9 でRGBの波長ごとの屈折ズレを極小化",z:95.8,thick:4.6,ap:29.5,rF:70,rR:-86,nd:1.497,vd:94.9,kind:"ed",isXa:!1,isEd:!0,isFlint:!1,cementedToNext:!0,a4F:0,a6F:0,focusGroup:"fixed"},{partId:"lens-flint-cemented",code:"E04",groupCode:"G3b",shortLabel:"Flint",jaName:"第4枚 高分散フリント接合凹レンズ",role:"E03とUV光学接合し色分散を逆符号で完全相殺（アポクロマート化）",z:92.2,thick:2.2,ap:29,rF:-86,rR:52,nd:1.805,vd:29.8,kind:"flint",isXa:!1,isEd:!1,isFlint:!0,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"fixed"},{partId:"lens-g4-negative",code:"E05",groupCode:"G4",shortLabel:"凹G4",jaName:"第5枚 絞り直前ペッツバール凹レンズ",role:"強い負パワーでピント面の湾曲を真っ平らなフルサイズ像面へ平坦化",z:87.4,thick:2,ap:26.5,rF:-115,rR:66,nd:1.74,vd:44,kind:"crown",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"fixed"},{partId:"lens-focus-a-front",code:"E06",groupCode:"G5a",shortLabel:"FA₁",jaName:"第6枚 フォーカスA群 前側凸レンズ",role:"XDリニアモーター2基で直動しピント位置を高速移動する前側可動玉",z:75.5,thick:3.8,ap:24,rF:56,rR:-105,nd:1.804,vd:46.6,kind:"lanthanum",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"A"},{partId:"lens-focus-group-a",code:"E07",groupCode:"G5b",shortLabel:"XA₂",jaName:"第7枚 フォーカスA群 第2 XA非球面",role:"絞り直後で球面収差とコマ収差を徹底除去するフローティング主玉",z:70.9,thick:4.2,ap:24.4,rF:64,rR:-92,nd:1.743,vd:49.3,kind:"xa",isXa:!0,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:-14475e-10,a6F:15704e-15,focusGroup:"A"},{partId:"lens-focus-a-rear",code:"E08",groupCode:"G5c",shortLabel:"FA₃",jaName:"第8枚 フォーカスA群 後側補正凹レンズ",role:"A群単独で色・球面収差を自己完結させ近接時の描写劣化を防止",z:66.5,thick:2.2,ap:23.4,rF:-82,rR:84,nd:1.784,vd:42,kind:"flint",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"A"},{partId:"lens-focus-b-front",code:"E09",groupCode:"G6a",shortLabel:"ED₂",jaName:"第9枚 フォーカスB群 ED凸レンズ",role:"A群と異なる移動比で同期駆動し至近0.4mの色収差変動を打ち消す",z:60.75,thick:3.8,ap:23.4,rF:68,rR:-92,nd:1.592,vd:81.6,kind:"ed",isXa:!1,isEd:!0,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"B"},{partId:"lens-focus-group-b",code:"E10",groupCode:"G6b",shortLabel:"FB₂",jaName:"第10枚 フォーカスB群 後側負非球面",role:"独立XDモーター2基で空気間隔を可変制御しブリージングと収差を抑圧",z:56.75,thick:2.2,ap:23.6,rF:-66,rR:120,nd:1.762,vd:39.5,kind:"crown",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"B"},{partId:"lens-g7-flattener",code:"E11",groupCode:"G7",shortLabel:"凹G7",jaName:"第11枚 後群固定フィールドフラットナー",role:"フォーカス群後方で像面湾曲と非点収差を精密に最終整形",z:51.8,thick:2.2,ap:23.2,rF:-84,rR:78,nd:1.72,vd:46,kind:"crown",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"fixed"},{partId:"lens-rear-convex",code:"E12",groupCode:"G8",shortLabel:"LaK₂",jaName:"第12枚 ランタン・サジタルコマ補正レンズ",role:"画面四隅の点光源が鳥の羽のように滲むサジタルコマフレアを撃退",z:47.8,thick:4,ap:23,rF:66,rR:-84,nd:1.883,vd:40.8,kind:"lanthanum",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"fixed"},{partId:"lens-rear-telecentric",code:"E13",groupCode:"G9",shortLabel:"Tele",jaName:"第13枚 φ45mm テレセントリック正メニスカス",role:"周辺へ広がる斜め光線をフルサイズセンサーへ垂直寄り（CRA<10°）に矯正",z:43.4,thick:4,ap:22.8,rF:62,rR:155,nd:1.834,vd:42,kind:"lanthanum",isXa:!1,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:0,a6F:0,focusGroup:"fixed"},{partId:"lens-rear-element",code:"E14",groupCode:"G10",shortLabel:"XA₃",jaName:"第14枚 φ44mm 第3 XAリアヒーローレンズ",role:"ショートフランジ18mmの特権を活かしセンサー直前で像面と四隅解像を完成",z:38.4,thick:3.8,ap:22.4,rF:-92,rR:-68.55,nd:1.743,vd:49.3,kind:"xa",isXa:!0,isEd:!1,isFlint:!1,cementedToNext:!1,a4F:-20147e-10,a6F:-27845e-13,focusGroup:"fixed"}],_l=[{id:"aperture_bokeh",shortTitle:"結像 & F1.2ボケ",fullTitle:"大口径F1.2結像と11枚円形絞り・被写界深度",badge:"01",accentColor:"#0284c7",hasComparisonToggle:!1,getDynamicCaption:i=>{const e=i.getIrisMetrics(),t=e.fNumber<10?e.fNumber.toFixed(1):Math.round(e.fNumber).toString();return e.fNumber<=2?`F${t}（有効口径 φ${e.entrancePupilMm.toFixed(1)}mm）：11枚羽根の広い円形開口を膨大な光束が満たし、ピント面はカミソリのように鋭く、前後はとろける大きな玉ボケに。`:e.fNumber<=5.6?`F${t}（有効口径 φ${e.entrancePupilMm.toFixed(1)}mm）：周辺光束が絞られて光円錐の角度が細くなり、被写界深度が深く、周辺口径食（レモン型ボケ）も真円へ整います。`:`F${t}（有効口径 φ${e.entrancePupilMm.toFixed(1)}mm）：光束が針のように細く絞られ、手前から奥までクッキリ写るパンフォーカスへ変化。11枚羽根による22本の美しい光芒も発生します。`}},{id:"floating_xd",shortTitle:"フローティングAF",fullTitle:"2群フローティングフォーカス & 4基XDリニアモーター",badge:"02",accentColor:"#d97706",hasComparisonToggle:!1,getDynamicCaption:i=>{const e=i.getFloatingStrokes();return`ピント距離 ${i.getFocusDistanceLabel()}：A群（${e.dzA.toFixed(2)}mm）とB群（${e.dzB.toFixed(2)}mm）を4基のXDリニアモーターが約1.86:1の独立速度比で同期直動。群間隔（${e.gapAB.toFixed(1)}mm）を自在に変え、最短0.40mまで収差ゼロを維持します。`}},{id:"ed_chromatic",shortTitle:"ED色収差補正",fullTitle:"スーパーED＋フリント接合ダブレットによるRGB色消し",badge:"03",accentColor:"#059669",hasComparisonToggle:!0,toggleLabel:"スーパーED色収差補正",toggleOnText:"ON（アポクロマート）",toggleOffText:"OFF（通常ガラス比較）",getDynamicCaption:i=>i.edStrength>.5?"スーパーED（νd=94.9）凸玉と高分散フリント凹玉（νd=29.8）の逆符号分散が相殺し合い、赤(656nm)・緑(587nm)・青(486nm)の焦点ズレが 0.05mm 未満の純白一点へ収束！":"通常ガラス比較：青い光ほど強く曲がるためセンサー手前で結像し、赤い光は奥へ抜けます（軸上色ズレ 約3.5mm）。これが写真の輪郭に出る紫・緑の色滲み（パープルフリンジ）の正体です。"},{id:"xa_aspheric",shortTitle:"3×XA非球面",fullTitle:"0.01μm XA超高度非球面レンズと球面収差・玉ねぎボケ解消",badge:"04",accentColor:"#0ea5e9",hasComparisonToggle:!0,toggleLabel:"3×XA非球面補正",toggleOnText:"ON（0.01μm XA）",toggleOffText:"OFF（球面レンズ比較）",getDynamicCaption:i=>i.xaStrength>.5?"E01・E07・E14の3枚のXA非球面が周辺曲率を緩やかに連続変化させ、F1.2最外周光線まで完璧に1点へ結像。0.01μm研磨精度により玉ボケ内部の年輪（玉ねぎボケ）も完全に消滅します。":"通常球面レンズ比較：大口径F1.2の外側を通る光線ほど強く曲がりすぎて手前にズレる「球面収差」が発生！像が白く滲み、精密研磨不足の非球面では玉ボケに年輪模様が現れます。"},{id:"nano_ar_baffle",shortTitle:"Nano AR II & 遮光",fullTitle:"ナノARコーティングII 波動干渉消滅 & 迷光バッフル",badge:"05",accentColor:"#6366f1",hasComparisonToggle:!0,toggleLabel:"Nano AR II 反射防止",toggleOnText:"ON（反射率 < 0.08%）",toggleOffText:"OFF（無コート 4%反射）",getDynamicCaption:i=>i.nanoArStrength>.5?"ナノ多孔質シリカ層（n≈1.22）で2つの反射光の位相を半波長（180°）ずらして波動干渉で打ち消し合い、逆光ゴーストを消滅！画角外の迷光もフード＆3:2リアバッフルが吸収します。":"無コート比較：ガラス1面あたり約4%の光が跳ね返り、14枚（26空気面）で多重反射した迷光がゴーストや白いフレアとなってセンサーへ降り注ぎ、コントラストが激減します。"}];function uu(i,e,t,n=0,s=0){const r=1/t,a=i*i,o=Math.max(.15,1-r*r*a);return e-r*a/(1+Math.sqrt(o))-n*a*a-s*a*a*a}function xl(i,e,t=0,n=0){const s=1/e,r=i*i,a=Math.max(.15,1-s*s*r);return-(s*i)/Math.sqrt(a)-4*t*r*i-6*n*r*r*i}function vl(i,e,t){if(e===0)return i.nd;let n=i.vd;t<1&&(i.isEd?n=i.vd*t+19*(1-t):i.isFlint&&(n=i.vd*t+65*(1-t)));const s=(i.nd-1)/n;return i.nd+e*.5*s}let Ya=0,$a=0,Ka=0,ja=0;function yl(i,e,t,n,s,r,a,o,l,c){let d=(s-e)/n;for(let U=0;U<5;U++){const T=i+d*t,C=e+d*n-uu(T,s,r,a,o),F=n-xl(T,r,a,o)*t;if(Math.abs(F)<1e-6)break;d-=C/F}const u=i+d*t,f=e+d*n;let x=-xl(u,r,a,o),v=1;const g=1/Math.sqrt(x*x+1);x*=g,v*=g;let m=-(t*x+n*v);m<0&&(x=-x,v=-v,m=-m);const b=l/c,M=1-b*b*(1-m*m),y=Math.sqrt(M>.04?M:.04),I=b*t+(b*m-y)*x,P=b*n+(b*m-y)*v,R=1/Math.sqrt(I*I+P*P);Ya=u,$a=f,Ka=I*R,ja=P*R}function du(i){const e=Math.max(0,Math.min(1,i)),t=-(6.85*e-1.35*e*e),n=-(3.45*e-.49*e*e),s=66.5+t-(60.75+n);return{dzA:t,dzB:n,gapAB:s}}function fu(i,e){const t=Math.max(1.2,Math.min(16,i)),n=21.6*(1.2/t),s=Math.max(0,Math.min(1,Math.log2(t/1.2)/Math.log2(16/1.2))),r=50/t,a=e<.01?2e3:1e3/(e*2.5),l=2*t*.03*a*a/2500,c=Math.min(1,1.2/t*(.42+.58*e));return{fNumber:t,irisRadiusMm:n,closure01:s,entrancePupilMm:r,dofMm:l,bokehScale01:c}}function Es(i){let e=i.yStart,t=i.zStart;const n=Math.hypot(i.dyStart,i.dzStart);let s=i.dyStart/n,r=i.dzStart/n,a=1;const o=[{z:t,y:e}];let l=0,c=!1;for(let x=0;x<ea.length;x++){if(x===5){const U=(Qr-t)/r;if(l=e+U*s,o.push({z:Qr,y:l}),Math.abs(l)>i.irisRadiusMm+.12&&(c=!0,i.stopAtIrisIfClipped))return{points:o,color:i.color,hexColor:i.hexColor,lambdaShift:i.lambdaShift,clippedAtIris:!0,yIris:l,ySensor:l,zFocus:Qr,craDeg:0,rayRole:i.rayRole,opacity:(i.opacity??.85)*.25,width:i.width??1.4}}const v=ea[x],g=v.focusGroup==="A"?i.dzA:v.focusGroup==="B"?i.dzB:0,m=v.z+g,b=m+v.thick*.5,M=m-v.thick*.5,y=vl(v,i.lambdaShift,i.edStrength),I=v.isXa?v.a4F*i.xaStrength:0,P=v.isXa?v.a6F*i.xaStrength:0;yl(e,t,s,r,b,v.rF,I,P,a,y),e=Ya,t=$a,s=Ka,r=ja,o.push({z:t,y:e});const R=v.cementedToNext?vl(ea[x+1],i.lambdaShift,i.edStrength):1;yl(e,t,s,r,M,v.rR,0,0,y,R),e=Ya,t=$a,s=Ka,r=ja,o.push({z:t,y:e}),a=R}const d=(gl-t)/r,u=e+d*s;o.push({z:gl,y:u});const f=Math.abs(s)>1e-5?t-e/s*r:-999,p=Math.atan2(Math.abs(s),Math.abs(r))*180/Math.PI;return{points:o,color:i.color,hexColor:i.hexColor,lambdaShift:i.lambdaShift,clippedAtIris:c,yIris:l,ySensor:u,zFocus:f,craDeg:p,rayRole:i.rayRole,opacity:i.opacity??.85,width:i.width??1.6}}function pu(i,e,t,n=136){if(Math.abs(i)<.05)return 0;const s=i*Math.PI/180,r=-Math.sin(s),a=-Math.cos(s);let o=i*.96;for(let l=0;l<5;l++){const c=Es({yStart:o,zStart:n,dyStart:r,dzStart:a,lambdaShift:0,xaStrength:1,edStrength:1,dzA:e,dzB:t,irisRadiusMm:40,stopAtIrisIfClipped:!1,color:"#0284c7",hexColor:165063,rayRole:"chief"}),u=(Es({yStart:o+.5,zStart:n,dyStart:r,dzStart:a,lambdaShift:0,xaStrength:1,edStrength:1,dzA:e,dzB:t,irisRadiusMm:40,stopAtIrisIfClipped:!1,color:"#0284c7",hexColor:165063,rayRole:"chief"}).yIris-c.yIris)/.5;Math.abs(u)>1e-4&&(o-=c.yIris/u)}return o}class mu{studioOpen=!1;autoPlay=!0;scenario="aperture_bokeh";hoveredElementId=null;targetAperture=1.2;targetFocusT=0;targetFieldAngleDeg=0;targetXaStrength=1;targetEdStrength=1;targetNanoArStrength=1;aperture=1.2;focusT=0;fieldAngleDeg=0;xaStrength=1;edStrength=1;nanoArStrength=1;focusVelocityA=0;focusVelocityB=0;prevDzA=0;prevDzB=0;simTime=0;listeners=new Set;subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}notify(){this.listeners.forEach(e=>e())}setStudioOpen(e){this.studioOpen!==e&&(this.studioOpen=e,e&&this.applyScenarioDefaults(this.scenario),this.notify())}setScenario(e){this.scenario=e,this.simTime=0,this.autoPlay=!0,this.applyScenarioDefaults(e),this.notify()}applyScenarioDefaults(e){switch(e){case"aperture_bokeh":this.targetAperture=1.2,this.targetFocusT=.28,this.targetFieldAngleDeg=0,this.targetXaStrength=1,this.targetEdStrength=1,this.targetNanoArStrength=1;break;case"floating_xd":this.targetAperture=1.4,this.targetFocusT=.65,this.targetFieldAngleDeg=0,this.targetXaStrength=1,this.targetEdStrength=1,this.targetNanoArStrength=1;break;case"ed_chromatic":this.targetAperture=1.2,this.targetFocusT=0,this.targetFieldAngleDeg=0,this.targetXaStrength=1,this.targetEdStrength=1,this.targetNanoArStrength=1;break;case"xa_aspheric":this.targetAperture=1.2,this.targetFocusT=0,this.targetFieldAngleDeg=0,this.targetXaStrength=1,this.targetEdStrength=1,this.targetNanoArStrength=1;break;case"nano_ar_baffle":this.targetAperture=1.8,this.targetFocusT=.15,this.targetFieldAngleDeg=12,this.targetXaStrength=1,this.targetEdStrength=1,this.targetNanoArStrength=1;break}}setManualAperture(e){this.autoPlay=!1,this.targetAperture=Math.max(1.2,Math.min(16,e)),this.notify()}setManualFocusT(e){this.autoPlay=!1,this.targetFocusT=Math.max(0,Math.min(1,e)),this.notify()}setManualFieldAngle(e){this.autoPlay=!1,this.targetFieldAngleDeg=Math.max(-19,Math.min(19,e)),this.notify()}toggleComparison(){this.autoPlay=!1,this.scenario==="ed_chromatic"?this.targetEdStrength=this.targetEdStrength>.5?0:1:this.scenario==="xa_aspheric"?this.targetXaStrength=this.targetXaStrength>.5?0:1:this.scenario==="nano_ar_baffle"&&(this.targetNanoArStrength=this.targetNanoArStrength>.5?0:1),this.notify()}setAutoPlay(e){this.autoPlay=e,this.notify()}setHoveredElement(e){this.hoveredElementId!==e&&(this.hoveredElementId=e,this.notify())}step(e,t,n){const s=Math.min(.05,Math.max(.001,t||.016));if(this.studioOpen){if(this.autoPlay){this.simTime+=s;const l=this.simTime;if(this.scenario==="aperture_bokeh"){const c=.5-.5*Math.cos(l*.78);this.targetAperture=1.2*Math.pow(11/1.2,c),this.targetFocusT=.18+.14*(.5-.5*Math.cos(l*.42)),this.targetFieldAngleDeg=Math.sin(l*.38)*7.5}else if(this.scenario==="floating_xd"){const c=.5-.5*Math.cos(l*.92);this.targetFocusT=c,this.targetAperture=1.25,this.targetFieldAngleDeg=0}else if(this.scenario==="ed_chromatic"){const c=Math.sin(l*.95);this.targetEdStrength=c>-.15?1:0,this.targetAperture=1.2,this.targetFocusT=0,this.targetFieldAngleDeg=0}else if(this.scenario==="xa_aspheric"){const c=Math.sin(l*.92);this.targetXaStrength=c>-.15?1:0,this.targetAperture=1.2,this.targetFocusT=0,this.targetFieldAngleDeg=0}else if(this.scenario==="nano_ar_baffle"){const c=Math.sin(l*.85);this.targetNanoArStrength=c>-.15?1:0,this.targetFieldAngleDeg=6+9*(.5+.5*Math.sin(l*.65)),this.targetAperture=1.6,this.targetFocusT=.12}}}else if(n){const l=.5-.5*Math.cos(e*1.15);this.targetAperture=1.2*Math.pow(11/1.2,l),this.targetFocusT=.5-.5*Math.cos(e*1.45),this.targetFieldAngleDeg=0,this.targetXaStrength=1,this.targetEdStrength=1,this.targetNanoArStrength=1}else this.targetAperture=1.2,this.targetFocusT=0,this.targetFieldAngleDeg=0,this.targetXaStrength=1,this.targetEdStrength=1,this.targetNanoArStrength=1;const r=1-Math.exp(-s*9.5),a=1-Math.exp(-s*6.5);this.aperture+=(this.targetAperture-this.aperture)*r,this.focusT+=(this.targetFocusT-this.focusT)*r,this.fieldAngleDeg+=(this.targetFieldAngleDeg-this.fieldAngleDeg)*r,this.xaStrength+=(this.targetXaStrength-this.xaStrength)*a,this.edStrength+=(this.targetEdStrength-this.edStrength)*a,this.nanoArStrength+=(this.targetNanoArStrength-this.nanoArStrength)*a;const o=this.getFloatingStrokes();this.focusVelocityA=(o.dzA-this.prevDzA)/s,this.focusVelocityB=(o.dzB-this.prevDzB)/s,this.prevDzA=o.dzA,this.prevDzB=o.dzB}getFloatingStrokes(){return du(this.focusT)}getIrisMetrics(){return fu(this.aperture,this.focusT)}getFocusDistanceLabel(){if(this.focusT<.025)return"∞（無限遠）";const e=1/(this.focusT*2.5);return e>=10?"∞（遠景）":`${e.toFixed(2)} m`}getScenarioDescriptor(){return _l.find(e=>e.id===this.scenario)??_l[0]}cachedBundleKey="";cachedBundleRays=[];traceActiveBundle(e=136){const t=`${e}|${this.scenario}|${this.aperture.toFixed(5)}|${this.focusT.toFixed(5)}|${this.fieldAngleDeg.toFixed(4)}|${this.xaStrength.toFixed(4)}|${this.edStrength.toFixed(4)}|${this.nanoArStrength.toFixed(4)}`;if(t===this.cachedBundleKey)return this.cachedBundleRays;const n=this.getFloatingStrokes(),s=this.getIrisMetrics(),r=[];this.cachedBundleKey=t,this.cachedBundleRays=r;const a=this.focusT*2.5,o=(u,f,p)=>{const x=a>.001?Math.atan((u-f)*a/1e3):0,v=-p+x;return{dy:Math.sin(v),dz:-Math.cos(v)}},l=this.fieldAngleDeg*Math.PI/180,c=pu(this.fieldAngleDeg,n.dzA,n.dzB,e);if(this.scenario==="ed_chromatic"){const u=[-19.2,-11.5,0,11.5,19.2],f=[{shift:-1,color:"#ef4444",hex:15680580,role:"rgb_r"},{shift:0,color:"#10b981",hex:1096065,role:"rgb_g"},{shift:1,color:"#2563eb",hex:2450411,role:"rgb_b"}];for(const p of u){const x=c+p,v=o(x,c,l);for(const g of f)p===0&&g.shift!==0||r.push(Es({yStart:x,zStart:e,dyStart:v.dy,dzStart:v.dz,lambdaShift:g.shift,xaStrength:this.xaStrength,edStrength:this.edStrength,dzA:n.dzA,dzB:n.dzB,irisRadiusMm:s.irisRadiusMm,stopAtIrisIfClipped:!0,color:g.color,hexColor:g.hex,rayRole:g.role,opacity:p===0?.65:.84,width:p===0?1.2:1.75}))}return r}if(this.scenario==="xa_aspheric"){const u=[-20.6,-17.5,-13.5,-7.5,0,7.5,13.5,17.5,20.6];for(const f of u){const x=Math.abs(f)>=13,v=this.xaStrength<.5&&x?"#e11d48":x?"#0284c7":"#0d9488",g=this.xaStrength<.5&&x?14753096:x?165063:889992,m=c+f,b=o(m,c,l);r.push(Es({yStart:m,zStart:e,dyStart:b.dy,dzStart:b.dz,lambdaShift:0,xaStrength:this.xaStrength,edStrength:1,dzA:n.dzA,dzB:n.dzB,irisRadiusMm:s.irisRadiusMm,stopAtIrisIfClipped:!0,color:f===0?"#f59e0b":v,hexColor:f===0?16096779:g,rayRole:f===0?"chief":x?"marginal":"paraxial",opacity:f===0?.72:.88,width:x?1.9:1.5}))}return r}const d=[-20.4,-15.5,-10.5,-5.2,0,5.2,10.5,15.5,20.4];for(const u of d){const f=c+u,p=o(f,c,l),x=u===0,v=Math.abs(u)>=15,g=x?"#f59e0b":(this.scenario==="floating_xd",v?"#0284c7":"#0ea5e9"),m=x?16096779:v?165063:959977;r.push(Es({yStart:f,zStart:e,dyStart:p.dy,dzStart:p.dz,lambdaShift:0,xaStrength:this.xaStrength,edStrength:this.edStrength,dzA:n.dzA,dzB:n.dzB,irisRadiusMm:s.irisRadiusMm,stopAtIrisIfClipped:!0,color:g,hexColor:m,rayRole:x?"chief":v?"marginal":"paraxial",opacity:x?.82:.85,width:x?1.7:1.65}))}if(this.scenario==="nano_ar_baffle"){const u=1-this.nanoArStrength*.94;r.push({points:[{z:e,y:26},{z:108.5,y:18},{z:95.8,y:11},{z:105.5,y:2.5},{z:82,y:-6.5},{z:42,y:-11.5},{z:0,y:-14.2}],color:"#ef4444",hexColor:15680580,lambdaShift:0,clippedAtIris:!1,yIris:-6.5,ySensor:-14.2,zFocus:0,craDeg:8,rayRole:"ghost",opacity:u*.88,width:1.85}),r.push({points:[{z:e,y:-23},{z:108.5,y:-14},{z:71,y:-7.5},{z:87.4,y:3.5},{z:42,y:9.8},{z:0,y:12.6}],color:"#f97316",hexColor:16347926,lambdaShift:0,clippedAtIris:!1,yIris:0,ySensor:12.6,zFocus:0,craDeg:7,rayRole:"ghost",opacity:u*.78,width:1.6}),r.push({points:[{z:e,y:36.5},{z:124,y:31.2}],color:"#94a3b8",hexColor:9741240,lambdaShift:0,clippedAtIris:!0,yIris:31,ySensor:31,zFocus:124,craDeg:0,rayRole:"stray",opacity:.65,width:1.35}),r.push({points:[{z:e,y:-33},{z:108.5,y:-26},{z:82,y:-18.8},{z:38.2,y:-15.6}],color:"#94a3b8",hexColor:9741240,lambdaShift:0,clippedAtIris:!0,yIris:-18.8,ySensor:-15.6,zFocus:38.2,craDeg:0,rayRole:"stray",opacity:.65,width:1.35})}return r}}const mn=new mu;/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Wo="174",Ki={ROTATE:0,DOLLY:1,PAN:2},qi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},gu=0,Ml=1,_u=2,sh=1,rh=2,Pn=3,nn=0,Ht=1,$t=2,Wn=0,ji=1,bl=2,Sl=3,El=4,xu=5,fi=100,vu=101,yu=102,Mu=103,bu=104,Su=200,Eu=201,Tu=202,Au=203,Za=204,Ja=205,wu=206,Pu=207,Cu=208,Ru=209,Lu=210,Iu=211,Du=212,Uu=213,Nu=214,Qa=0,eo=1,to=2,ns=3,no=4,io=5,so=6,ro=7,kr=0,Fu=1,Ou=2,Xn=0,Bu=1,Vu=2,zu=3,ah=4,ku=5,Hu=6,Gu=7,oh=300,is=301,ss=302,Cs=303,ao=304,Hr=306,yi=1e3,mi=1001,oo=1002,Kt=1003,Wu=1004,Hs=1005,xt=1006,ta=1007,Gn=1008,Dn=1009,lh=1010,ch=1011,Rs=1012,Xo=1013,qn=1014,sn=1015,Ns=1016,qo=1017,Yo=1018,rs=1020,hh=35902,uh=1021,dh=1022,wt=1023,fh=1024,ph=1025,Zi=1026,as=1027,$o=1028,Gr=1029,mh=1030,Ko=1031,jo=1033,Pr=33776,Cr=33777,Rr=33778,Lr=33779,lo=35840,co=35841,ho=35842,uo=35843,fo=36196,po=37492,mo=37496,go=37808,_o=37809,xo=37810,vo=37811,yo=37812,Mo=37813,bo=37814,So=37815,Eo=37816,To=37817,Ao=37818,wo=37819,Po=37820,Co=37821,Ir=36492,Ro=36494,Lo=36495,gh=36283,Io=36284,Do=36285,Uo=36286,Xu=3200,qu=3201,Fs=0,Yu=1,Hn="",bt="srgb",os="srgb-linear",Ur="linear",ot="srgb",Pi=7680,Tl=519,$u=512,Ku=513,ju=514,_h=515,Zu=516,Ju=517,Qu=518,ed=519,Al=35044,gx=35048,wl="300 es",Rn=2e3,Nr=2001;class Ti{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const It=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Pl=1234567;const Ji=Math.PI/180,Ls=180/Math.PI;function Ai(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(It[i&255]+It[i>>8&255]+It[i>>16&255]+It[i>>24&255]+"-"+It[e&255]+It[e>>8&255]+"-"+It[e>>16&15|64]+It[e>>24&255]+"-"+It[t&63|128]+It[t>>8&255]+"-"+It[t>>16&255]+It[t>>24&255]+It[n&255]+It[n>>8&255]+It[n>>16&255]+It[n>>24&255]).toLowerCase()}function Ge(i,e,t){return Math.max(e,Math.min(t,i))}function Zo(i,e){return(i%e+e)%e}function td(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function nd(i,e,t){return i!==e?(t-i)/(e-i):0}function Ts(i,e,t){return(1-t)*i+t*e}function id(i,e,t,n){return Ts(i,e,1-Math.exp(-t*n))}function sd(i,e=1){return e-Math.abs(Zo(i,e*2)-e)}function rd(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function ad(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function od(i,e){return i+Math.floor(Math.random()*(e-i+1))}function ld(i,e){return i+Math.random()*(e-i)}function cd(i){return i*(.5-Math.random())}function hd(i){i!==void 0&&(Pl=i);let e=Pl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function ud(i){return i*Ji}function dd(i){return i*Ls}function fd(i){return(i&i-1)===0&&i!==0}function pd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function md(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function gd(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),d=a((e+n)/2),u=r((e-n)/2),f=a((e-n)/2),p=r((n-e)/2),x=a((n-e)/2);switch(s){case"XYX":i.set(o*d,l*u,l*f,o*c);break;case"YZY":i.set(l*f,o*d,l*u,o*c);break;case"ZXZ":i.set(l*u,l*f,o*d,o*c);break;case"XZX":i.set(o*d,l*x,l*p,o*c);break;case"YXY":i.set(l*p,o*d,l*x,o*c);break;case"ZYZ":i.set(l*x,l*p,o*d,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Xi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ot(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const ys={DEG2RAD:Ji,RAD2DEG:Ls,generateUUID:Ai,clamp:Ge,euclideanModulo:Zo,mapLinear:td,inverseLerp:nd,lerp:Ts,damp:id,pingpong:sd,smoothstep:rd,smootherstep:ad,randInt:od,randFloat:ld,randFloatSpread:cd,seededRandom:hd,degToRad:ud,radToDeg:dd,isPowerOfTwo:fd,ceilPowerOfTwo:pd,floorPowerOfTwo:md,setQuaternionFromProperEuler:gd,normalize:Ot,denormalize:Xi};class re{constructor(e=0,t=0){re.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ge(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ye{constructor(e,t,n,s,r,a,o,l,c){Ye.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=l,d[6]=n,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],d=n[4],u=n[7],f=n[2],p=n[5],x=n[8],v=s[0],g=s[3],m=s[6],b=s[1],M=s[4],y=s[7],I=s[2],P=s[5],R=s[8];return r[0]=a*v+o*b+l*I,r[3]=a*g+o*M+l*P,r[6]=a*m+o*y+l*R,r[1]=c*v+d*b+u*I,r[4]=c*g+d*M+u*P,r[7]=c*m+d*y+u*R,r[2]=f*v+p*b+x*I,r[5]=f*g+p*M+x*P,r[8]=f*m+p*y+x*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-n*r*d+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=d*a-o*c,f=o*l-d*r,p=c*r-a*l,x=t*u+n*f+s*p;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/x;return e[0]=u*v,e[1]=(s*c-d*n)*v,e[2]=(o*n-s*a)*v,e[3]=f*v,e[4]=(d*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=p*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(na.makeScale(e,t)),this}rotate(e){return this.premultiply(na.makeRotation(-e)),this}translate(e,t){return this.premultiply(na.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const na=new Ye;function xh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Fr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function _d(){const i=Fr("canvas");return i.style.display="block",i}const Cl={};function ui(i){i in Cl||(Cl[i]=!0,console.warn(i))}function xd(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function vd(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function yd(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Rl=new Ye().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ll=new Ye().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Md(){const i={enabled:!0,workingColorSpace:os,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ot&&(s.r=In(s.r),s.g=In(s.g),s.b=In(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ot&&(s.r=Qi(s.r),s.g=Qi(s.g),s.b=Qi(s.b))),s},fromWorkingColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},toWorkingColorSpace:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Hn?Ur:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[os]:{primaries:e,whitePoint:n,transfer:Ur,toXYZ:Rl,fromXYZ:Ll,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:bt},outputColorSpaceConfig:{drawingBufferColorSpace:bt}},[bt]:{primaries:e,whitePoint:n,transfer:ot,toXYZ:Rl,fromXYZ:Ll,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:bt}}}),i}const et=Md();function In(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Qi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ci;class bd{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ci===void 0&&(Ci=Fr("canvas")),Ci.width=e.width,Ci.height=e.height;const n=Ci.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ci}return t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Fr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=In(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(In(t[n]/255)*255):t[n]=In(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Sd=0;class Jo{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Sd++}),this.uuid=Ai(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ia(s[a].image)):r.push(ia(s[a]))}else r=ia(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function ia(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?bd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ed=0;class Rt extends Ti{constructor(e=Rt.DEFAULT_IMAGE,t=Rt.DEFAULT_MAPPING,n=mi,s=mi,r=xt,a=Gn,o=wt,l=Dn,c=Rt.DEFAULT_ANISOTROPY,d=Hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ed++}),this.uuid=Ai(),this.name="",this.source=new Jo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new re(0,0),this.repeat=new re(1,1),this.center=new re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==oh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case yi:e.x=e.x-Math.floor(e.x);break;case mi:e.x=e.x<0?0:1;break;case oo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case yi:e.y=e.y-Math.floor(e.y);break;case mi:e.y=e.y<0?0:1;break;case oo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Rt.DEFAULT_IMAGE=null;Rt.DEFAULT_MAPPING=oh;Rt.DEFAULT_ANISOTROPY=1;class gt{constructor(e=0,t=0,n=0,s=1){gt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],d=l[4],u=l[8],f=l[1],p=l[5],x=l[9],v=l[2],g=l[6],m=l[10];if(Math.abs(d-f)<.01&&Math.abs(u-v)<.01&&Math.abs(x-g)<.01){if(Math.abs(d+f)<.1&&Math.abs(u+v)<.1&&Math.abs(x+g)<.1&&Math.abs(c+p+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(c+1)/2,y=(p+1)/2,I=(m+1)/2,P=(d+f)/4,R=(u+v)/4,U=(x+g)/4;return M>y&&M>I?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=P/n,r=R/n):y>I?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=P/s,r=U/s):I<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(I),n=R/r,s=U/r),this.set(n,s,r,t),this}let b=Math.sqrt((g-x)*(g-x)+(u-v)*(u-v)+(f-d)*(f-d));return Math.abs(b)<.001&&(b=1),this.x=(g-x)/b,this.y=(u-v)/b,this.z=(f-d)/b,this.w=Math.acos((c+p+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this.w=Ge(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this.w=Ge(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Td extends Ti{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new gt(0,0,e,t),this.scissorTest=!1,this.viewport=new gt(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:xt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Rt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Jo(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Mi extends Td{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class vh extends Rt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ad extends Rt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class bi{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],d=n[s+2],u=n[s+3];const f=r[a+0],p=r[a+1],x=r[a+2],v=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u;return}if(o===1){e[t+0]=f,e[t+1]=p,e[t+2]=x,e[t+3]=v;return}if(u!==v||l!==f||c!==p||d!==x){let g=1-o;const m=l*f+c*p+d*x+u*v,b=m>=0?1:-1,M=1-m*m;if(M>Number.EPSILON){const I=Math.sqrt(M),P=Math.atan2(I,m*b);g=Math.sin(g*P)/I,o=Math.sin(o*P)/I}const y=o*b;if(l=l*g+f*y,c=c*g+p*y,d=d*g+x*y,u=u*g+v*y,g===1-o){const I=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=I,c*=I,d*=I,u*=I}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],d=n[s+3],u=r[a],f=r[a+1],p=r[a+2],x=r[a+3];return e[t]=o*x+d*u+l*p-c*f,e[t+1]=l*x+d*f+c*u-o*p,e[t+2]=c*x+d*p+o*f-l*u,e[t+3]=d*x-o*u-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),d=o(s/2),u=o(r/2),f=l(n/2),p=l(s/2),x=l(r/2);switch(a){case"XYZ":this._x=f*d*u+c*p*x,this._y=c*p*u-f*d*x,this._z=c*d*x+f*p*u,this._w=c*d*u-f*p*x;break;case"YXZ":this._x=f*d*u+c*p*x,this._y=c*p*u-f*d*x,this._z=c*d*x-f*p*u,this._w=c*d*u+f*p*x;break;case"ZXY":this._x=f*d*u-c*p*x,this._y=c*p*u+f*d*x,this._z=c*d*x+f*p*u,this._w=c*d*u-f*p*x;break;case"ZYX":this._x=f*d*u-c*p*x,this._y=c*p*u+f*d*x,this._z=c*d*x-f*p*u,this._w=c*d*u+f*p*x;break;case"YZX":this._x=f*d*u+c*p*x,this._y=c*p*u+f*d*x,this._z=c*d*x-f*p*u,this._w=c*d*u-f*p*x;break;case"XZY":this._x=f*d*u-c*p*x,this._y=c*p*u-f*d*x,this._z=c*d*x+f*p*u,this._w=c*d*u+f*p*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],u=t[10],f=n+o+u;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(d-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(n>o&&n>u){const p=2*Math.sqrt(1+n-o-u);this._w=(d-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>u){const p=2*Math.sqrt(1+o-n-u);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+d)/p}else{const p=2*Math.sqrt(1+u-n-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ge(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+a*o+s*c-r*l,this._y=s*d+a*l+r*o-n*c,this._z=r*d+a*c+n*l-s*o,this._w=a*d-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),u=Math.sin((1-t)*d)/c,f=Math.sin(t*d)/c;return this._w=a*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class A{constructor(e=0,t=0,n=0){A.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Il.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Il.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),d=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+l*c+a*u-o*d,this.y=n+l*d+o*c-r*u,this.z=s+l*u+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return sa.copy(this).projectOnVector(e),this.sub(sa)}reflect(e){return this.sub(sa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ge(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const sa=new A,Il=new bi;class Gt{constructor(e=new A(1/0,1/0,1/0),t=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(cn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(cn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=cn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,cn):cn.fromBufferAttribute(r,a),cn.applyMatrix4(e.matrixWorld),this.expandByPoint(cn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Gs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Gs.copy(n.boundingBox)),Gs.applyMatrix4(e.matrixWorld),this.union(Gs)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,cn),cn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ds),Ws.subVectors(this.max,ds),Ri.subVectors(e.a,ds),Li.subVectors(e.b,ds),Ii.subVectors(e.c,ds),Un.subVectors(Li,Ri),Nn.subVectors(Ii,Li),Zn.subVectors(Ri,Ii);let t=[0,-Un.z,Un.y,0,-Nn.z,Nn.y,0,-Zn.z,Zn.y,Un.z,0,-Un.x,Nn.z,0,-Nn.x,Zn.z,0,-Zn.x,-Un.y,Un.x,0,-Nn.y,Nn.x,0,-Zn.y,Zn.x,0];return!ra(t,Ri,Li,Ii,Ws)||(t=[1,0,0,0,1,0,0,0,1],!ra(t,Ri,Li,Ii,Ws))?!1:(Xs.crossVectors(Un,Nn),t=[Xs.x,Xs.y,Xs.z],ra(t,Ri,Li,Ii,Ws))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,cn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(cn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(bn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const bn=[new A,new A,new A,new A,new A,new A,new A,new A],cn=new A,Gs=new Gt,Ri=new A,Li=new A,Ii=new A,Un=new A,Nn=new A,Zn=new A,ds=new A,Ws=new A,Xs=new A,Jn=new A;function ra(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Jn.fromArray(i,r);const o=s.x*Math.abs(Jn.x)+s.y*Math.abs(Jn.y)+s.z*Math.abs(Jn.z),l=e.dot(Jn),c=t.dot(Jn),d=n.dot(Jn);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const wd=new Gt,fs=new A,aa=new A;class dn{constructor(e=new A,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):wd.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;fs.subVectors(e,this.center);const t=fs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(fs,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(aa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(fs.copy(e.center).add(aa)),this.expandByPoint(fs.copy(e.center).sub(aa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Sn=new A,oa=new A,qs=new A,Fn=new A,la=new A,Ys=new A,ca=new A;class Os{constructor(e=new A,t=new A(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Sn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Sn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Sn.copy(this.origin).addScaledVector(this.direction,t),Sn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){oa.copy(e).add(t).multiplyScalar(.5),qs.copy(t).sub(e).normalize(),Fn.copy(this.origin).sub(oa);const r=e.distanceTo(t)*.5,a=-this.direction.dot(qs),o=Fn.dot(this.direction),l=-Fn.dot(qs),c=Fn.lengthSq(),d=Math.abs(1-a*a);let u,f,p,x;if(d>0)if(u=a*l-o,f=a*o-l,x=r*d,u>=0)if(f>=-x)if(f<=x){const v=1/d;u*=v,f*=v,p=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*l)+c;else f<=-x?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+f*(f+2*l)+c):f<=x?(u=0,f=Math.min(Math.max(-r,-l),r),p=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(oa).addScaledVector(qs,f),p}intersectSphere(e,t){Sn.subVectors(e.center,this.origin);const n=Sn.dot(this.direction),s=Sn.dot(Sn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),d>=0?(r=(e.min.y-f.y)*d,a=(e.max.y-f.y)*d):(r=(e.max.y-f.y)*d,a=(e.min.y-f.y)*d),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(o=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Sn)!==null}intersectTriangle(e,t,n,s,r){la.subVectors(t,e),Ys.subVectors(n,e),ca.crossVectors(la,Ys);let a=this.direction.dot(ca),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Fn.subVectors(this.origin,e);const l=o*this.direction.dot(Ys.crossVectors(Fn,Ys));if(l<0)return null;const c=o*this.direction.dot(la.cross(Fn));if(c<0||l+c>a)return null;const d=-o*Fn.dot(ca);return d<0?null:this.at(d/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class rt{constructor(e,t,n,s,r,a,o,l,c,d,u,f,p,x,v,g){rt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,d,u,f,p,x,v,g)}set(e,t,n,s,r,a,o,l,c,d,u,f,p,x,v,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=d,m[10]=u,m[14]=f,m[3]=p,m[7]=x,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Di.setFromMatrixColumn(e,0).length(),r=1/Di.setFromMatrixColumn(e,1).length(),a=1/Di.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const f=a*d,p=a*u,x=o*d,v=o*u;t[0]=l*d,t[4]=-l*u,t[8]=c,t[1]=p+x*c,t[5]=f-v*c,t[9]=-o*l,t[2]=v-f*c,t[6]=x+p*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*d,p=l*u,x=c*d,v=c*u;t[0]=f+v*o,t[4]=x*o-p,t[8]=a*c,t[1]=a*u,t[5]=a*d,t[9]=-o,t[2]=p*o-x,t[6]=v+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*d,p=l*u,x=c*d,v=c*u;t[0]=f-v*o,t[4]=-a*u,t[8]=x+p*o,t[1]=p+x*o,t[5]=a*d,t[9]=v-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*d,p=a*u,x=o*d,v=o*u;t[0]=l*d,t[4]=x*c-p,t[8]=f*c+v,t[1]=l*u,t[5]=v*c+f,t[9]=p*c-x,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,p=a*c,x=o*l,v=o*c;t[0]=l*d,t[4]=v-f*u,t[8]=x*u+p,t[1]=u,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=p*u+x,t[10]=f-v*u}else if(e.order==="XZY"){const f=a*l,p=a*c,x=o*l,v=o*c;t[0]=l*d,t[4]=-u,t[8]=c*d,t[1]=f*u+v,t[5]=a*d,t[9]=p*u-x,t[2]=x*u-p,t[6]=o*d,t[10]=v*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Pd,e,Cd)}lookAt(e,t,n){const s=this.elements;return Xt.subVectors(e,t),Xt.lengthSq()===0&&(Xt.z=1),Xt.normalize(),On.crossVectors(n,Xt),On.lengthSq()===0&&(Math.abs(n.z)===1?Xt.x+=1e-4:Xt.z+=1e-4,Xt.normalize(),On.crossVectors(n,Xt)),On.normalize(),$s.crossVectors(Xt,On),s[0]=On.x,s[4]=$s.x,s[8]=Xt.x,s[1]=On.y,s[5]=$s.y,s[9]=Xt.y,s[2]=On.z,s[6]=$s.z,s[10]=Xt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],d=n[1],u=n[5],f=n[9],p=n[13],x=n[2],v=n[6],g=n[10],m=n[14],b=n[3],M=n[7],y=n[11],I=n[15],P=s[0],R=s[4],U=s[8],T=s[12],S=s[1],C=s[5],F=s[9],N=s[13],O=s[2],$=s[6],G=s[10],Q=s[14],X=s[3],le=s[7],fe=s[11],ve=s[15];return r[0]=a*P+o*S+l*O+c*X,r[4]=a*R+o*C+l*$+c*le,r[8]=a*U+o*F+l*G+c*fe,r[12]=a*T+o*N+l*Q+c*ve,r[1]=d*P+u*S+f*O+p*X,r[5]=d*R+u*C+f*$+p*le,r[9]=d*U+u*F+f*G+p*fe,r[13]=d*T+u*N+f*Q+p*ve,r[2]=x*P+v*S+g*O+m*X,r[6]=x*R+v*C+g*$+m*le,r[10]=x*U+v*F+g*G+m*fe,r[14]=x*T+v*N+g*Q+m*ve,r[3]=b*P+M*S+y*O+I*X,r[7]=b*R+M*C+y*$+I*le,r[11]=b*U+M*F+y*G+I*fe,r[15]=b*T+M*N+y*Q+I*ve,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],u=e[6],f=e[10],p=e[14],x=e[3],v=e[7],g=e[11],m=e[15];return x*(+r*l*u-s*c*u-r*o*f+n*c*f+s*o*p-n*l*p)+v*(+t*l*p-t*c*f+r*a*f-s*a*p+s*c*d-r*l*d)+g*(+t*c*u-t*o*p-r*a*u+n*a*p+r*o*d-n*c*d)+m*(-s*o*d-t*l*u+t*o*f+s*a*u-n*a*f+n*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=e[9],f=e[10],p=e[11],x=e[12],v=e[13],g=e[14],m=e[15],b=u*g*c-v*f*c+v*l*p-o*g*p-u*l*m+o*f*m,M=x*f*c-d*g*c-x*l*p+a*g*p+d*l*m-a*f*m,y=d*v*c-x*u*c+x*o*p-a*v*p-d*o*m+a*u*m,I=x*u*l-d*v*l-x*o*f+a*v*f+d*o*g-a*u*g,P=t*b+n*M+s*y+r*I;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/P;return e[0]=b*R,e[1]=(v*f*r-u*g*r-v*s*p+n*g*p+u*s*m-n*f*m)*R,e[2]=(o*g*r-v*l*r+v*s*c-n*g*c-o*s*m+n*l*m)*R,e[3]=(u*l*r-o*f*r-u*s*c+n*f*c+o*s*p-n*l*p)*R,e[4]=M*R,e[5]=(d*g*r-x*f*r+x*s*p-t*g*p-d*s*m+t*f*m)*R,e[6]=(x*l*r-a*g*r-x*s*c+t*g*c+a*s*m-t*l*m)*R,e[7]=(a*f*r-d*l*r+d*s*c-t*f*c-a*s*p+t*l*p)*R,e[8]=y*R,e[9]=(x*u*r-d*v*r-x*n*p+t*v*p+d*n*m-t*u*m)*R,e[10]=(a*v*r-x*o*r+x*n*c-t*v*c-a*n*m+t*o*m)*R,e[11]=(d*o*r-a*u*r-d*n*c+t*u*c+a*n*p-t*o*p)*R,e[12]=I*R,e[13]=(d*v*s-x*u*s+x*n*f-t*v*f-d*n*g+t*u*g)*R,e[14]=(x*o*s-a*v*s-x*n*l+t*v*l+a*n*g-t*o*g)*R,e[15]=(a*u*s-d*o*s+d*n*l-t*u*l-a*n*f+t*o*f)*R,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,d=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,d*o+n,d*l-s*a,0,c*l-s*o,d*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,d=a+a,u=o+o,f=r*c,p=r*d,x=r*u,v=a*d,g=a*u,m=o*u,b=l*c,M=l*d,y=l*u,I=n.x,P=n.y,R=n.z;return s[0]=(1-(v+m))*I,s[1]=(p+y)*I,s[2]=(x-M)*I,s[3]=0,s[4]=(p-y)*P,s[5]=(1-(f+m))*P,s[6]=(g+b)*P,s[7]=0,s[8]=(x+M)*R,s[9]=(g-b)*R,s[10]=(1-(f+v))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Di.set(s[0],s[1],s[2]).length();const a=Di.set(s[4],s[5],s[6]).length(),o=Di.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],hn.copy(this);const c=1/r,d=1/a,u=1/o;return hn.elements[0]*=c,hn.elements[1]*=c,hn.elements[2]*=c,hn.elements[4]*=d,hn.elements[5]*=d,hn.elements[6]*=d,hn.elements[8]*=u,hn.elements[9]*=u,hn.elements[10]*=u,t.setFromRotationMatrix(hn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=Rn){const l=this.elements,c=2*r/(t-e),d=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s);let p,x;if(o===Rn)p=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===Nr)p=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Rn){const l=this.elements,c=1/(t-e),d=1/(n-s),u=1/(a-r),f=(t+e)*c,p=(n+s)*d;let x,v;if(o===Rn)x=(a+r)*u,v=-2*u;else if(o===Nr)x=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Di=new A,hn=new rt,Pd=new A(0,0,0),Cd=new A(1,1,1),On=new A,$s=new A,Xt=new A,Dl=new rt,Ul=new bi;class rn{constructor(e=0,t=0,n=0,s=rn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],d=s[9],u=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Ge(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ge(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ge(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ge(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ge(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ge(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Dl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Dl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ul.setFromEuler(this),this.setFromQuaternion(Ul,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}rn.DEFAULT_ORDER="XYZ";class Qo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Rd=0;const Nl=new A,Ui=new bi,En=new rt,Ks=new A,ps=new A,Ld=new A,Id=new bi,Fl=new A(1,0,0),Ol=new A(0,1,0),Bl=new A(0,0,1),Vl={type:"added"},Dd={type:"removed"},Ni={type:"childadded",child:null},ha={type:"childremoved",child:null};class St extends Ti{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Rd++}),this.uuid=Ai(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=St.DEFAULT_UP.clone();const e=new A,t=new rn,n=new bi,s=new A(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new rt},normalMatrix:{value:new Ye}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=St.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Qo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ui.setFromAxisAngle(e,t),this.quaternion.multiply(Ui),this}rotateOnWorldAxis(e,t){return Ui.setFromAxisAngle(e,t),this.quaternion.premultiply(Ui),this}rotateX(e){return this.rotateOnAxis(Fl,e)}rotateY(e){return this.rotateOnAxis(Ol,e)}rotateZ(e){return this.rotateOnAxis(Bl,e)}translateOnAxis(e,t){return Nl.copy(e).applyQuaternion(this.quaternion),this.position.add(Nl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Fl,e)}translateY(e){return this.translateOnAxis(Ol,e)}translateZ(e){return this.translateOnAxis(Bl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(En.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ks.copy(e):Ks.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ps.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?En.lookAt(ps,Ks,this.up):En.lookAt(Ks,ps,this.up),this.quaternion.setFromRotationMatrix(En),s&&(En.extractRotation(s.matrixWorld),Ui.setFromRotationMatrix(En),this.quaternion.premultiply(Ui.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Vl),Ni.child=e,this.dispatchEvent(Ni),Ni.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Dd),ha.child=e,this.dispatchEvent(ha),ha.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),En.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),En.multiply(e.parent.matrixWorld)),e.applyMatrix4(En),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Vl),Ni.child=e,this.dispatchEvent(Ni),Ni.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ps,e,Ld),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ps,Id,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),u=a(e.shapes),f=a(e.skeletons),p=a(e.animations),x=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),x.length>0&&(n.nodes=x)}return n.object=s,n;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}St.DEFAULT_UP=new A(0,1,0);St.DEFAULT_MATRIX_AUTO_UPDATE=!0;St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const un=new A,Tn=new A,ua=new A,An=new A,Fi=new A,Oi=new A,zl=new A,da=new A,fa=new A,pa=new A,ma=new gt,ga=new gt,_a=new gt;class tn{constructor(e=new A,t=new A,n=new A){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),un.subVectors(e,t),s.cross(un);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){un.subVectors(s,t),Tn.subVectors(n,t),ua.subVectors(e,t);const a=un.dot(un),o=un.dot(Tn),l=un.dot(ua),c=Tn.dot(Tn),d=Tn.dot(ua),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,p=(c*l-o*d)*f,x=(a*d-o*l)*f;return r.set(1-p-x,x,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,An)===null?!1:An.x>=0&&An.y>=0&&An.x+An.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,An)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,An.x),l.addScaledVector(a,An.y),l.addScaledVector(o,An.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return ma.setScalar(0),ga.setScalar(0),_a.setScalar(0),ma.fromBufferAttribute(e,t),ga.fromBufferAttribute(e,n),_a.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(ma,r.x),a.addScaledVector(ga,r.y),a.addScaledVector(_a,r.z),a}static isFrontFacing(e,t,n,s){return un.subVectors(n,t),Tn.subVectors(e,t),un.cross(Tn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return un.subVectors(this.c,this.b),Tn.subVectors(this.a,this.b),un.cross(Tn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return tn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return tn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return tn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return tn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return tn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Fi.subVectors(s,n),Oi.subVectors(r,n),da.subVectors(e,n);const l=Fi.dot(da),c=Oi.dot(da);if(l<=0&&c<=0)return t.copy(n);fa.subVectors(e,s);const d=Fi.dot(fa),u=Oi.dot(fa);if(d>=0&&u<=d)return t.copy(s);const f=l*u-d*c;if(f<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(n).addScaledVector(Fi,a);pa.subVectors(e,r);const p=Fi.dot(pa),x=Oi.dot(pa);if(x>=0&&p<=x)return t.copy(r);const v=p*c-l*x;if(v<=0&&c>=0&&x<=0)return o=c/(c-x),t.copy(n).addScaledVector(Oi,o);const g=d*x-p*u;if(g<=0&&u-d>=0&&p-x>=0)return zl.subVectors(r,s),o=(u-d)/(u-d+(p-x)),t.copy(s).addScaledVector(zl,o);const m=1/(g+v+f);return a=v*m,o=f*m,t.copy(n).addScaledVector(Fi,a).addScaledVector(Oi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const yh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Bn={h:0,s:0,l:0},js={h:0,s:0,l:0};function xa(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Fe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=bt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=et.workingColorSpace){return this.r=e,this.g=t,this.b=n,et.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=et.workingColorSpace){if(e=Zo(e,1),t=Ge(t,0,1),n=Ge(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=xa(a,r,e+1/3),this.g=xa(a,r,e),this.b=xa(a,r,e-1/3)}return et.toWorkingColorSpace(this,s),this}setStyle(e,t=bt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=bt){const n=yh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=In(e.r),this.g=In(e.g),this.b=In(e.b),this}copyLinearToSRGB(e){return this.r=Qi(e.r),this.g=Qi(e.g),this.b=Qi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=bt){return et.fromWorkingColorSpace(Dt.copy(this),e),Math.round(Ge(Dt.r*255,0,255))*65536+Math.round(Ge(Dt.g*255,0,255))*256+Math.round(Ge(Dt.b*255,0,255))}getHexString(e=bt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.fromWorkingColorSpace(Dt.copy(this),t);const n=Dt.r,s=Dt.g,r=Dt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=d<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=et.workingColorSpace){return et.fromWorkingColorSpace(Dt.copy(this),t),e.r=Dt.r,e.g=Dt.g,e.b=Dt.b,e}getStyle(e=bt){et.fromWorkingColorSpace(Dt.copy(this),e);const t=Dt.r,n=Dt.g,s=Dt.b;return e!==bt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Bn),this.setHSL(Bn.h+e,Bn.s+t,Bn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Bn),e.getHSL(js);const n=Ts(Bn.h,js.h,t),s=Ts(Bn.s,js.s,t),r=Ts(Bn.l,js.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Dt=new Fe;Fe.NAMES=yh;let Ud=0;class an extends Ti{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ud++}),this.uuid=Ai(),this.name="",this.type="Material",this.blending=ji,this.side=nn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Za,this.blendDst=Ja,this.blendEquation=fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Fe(0,0,0),this.blendAlpha=0,this.depthFunc=ns,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Tl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Pi,this.stencilZFail=Pi,this.stencilZPass=Pi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ji&&(n.blending=this.blending),this.side!==nn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Za&&(n.blendSrc=this.blendSrc),this.blendDst!==Ja&&(n.blendDst=this.blendDst),this.blendEquation!==fi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ns&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Tl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Pi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Pi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Pi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Wr extends an{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.combine=kr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const yt=new A,Zs=new re;let Nd=0;class Nt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Nd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Al,this.updateRanges=[],this.gpuType=sn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Zs.fromBufferAttribute(this,t),Zs.applyMatrix3(e),this.setXY(t,Zs.x,Zs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix3(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix4(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyNormalMatrix(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.transformDirection(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Xi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ot(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Xi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Xi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Xi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Xi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array),s=Ot(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array),s=Ot(s,this.array),r=Ot(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Al&&(e.usage=this.usage),e}}class Mh extends Nt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class bh extends Nt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class We extends Nt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Fd=0;const Jt=new rt,va=new St,Bi=new A,qt=new Gt,ms=new Gt,At=new A;class ht extends Ti{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Fd++}),this.uuid=Ai(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(xh(e)?bh:Mh)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ye().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Jt.makeRotationFromQuaternion(e),this.applyMatrix4(Jt),this}rotateX(e){return Jt.makeRotationX(e),this.applyMatrix4(Jt),this}rotateY(e){return Jt.makeRotationY(e),this.applyMatrix4(Jt),this}rotateZ(e){return Jt.makeRotationZ(e),this.applyMatrix4(Jt),this}translate(e,t,n){return Jt.makeTranslation(e,t,n),this.applyMatrix4(Jt),this}scale(e,t,n){return Jt.makeScale(e,t,n),this.applyMatrix4(Jt),this}lookAt(e){return va.lookAt(e),va.updateMatrix(),this.applyMatrix4(va.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bi).negate(),this.translate(Bi.x,Bi.y,Bi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new We(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Gt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];qt.setFromBufferAttribute(r),this.morphTargetsRelative?(At.addVectors(this.boundingBox.min,qt.min),this.boundingBox.expandByPoint(At),At.addVectors(this.boundingBox.max,qt.max),this.boundingBox.expandByPoint(At)):(this.boundingBox.expandByPoint(qt.min),this.boundingBox.expandByPoint(qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new dn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(e){const n=this.boundingSphere.center;if(qt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];ms.setFromBufferAttribute(o),this.morphTargetsRelative?(At.addVectors(qt.min,ms.min),qt.expandByPoint(At),At.addVectors(qt.max,ms.max),qt.expandByPoint(At)):(qt.expandByPoint(ms.min),qt.expandByPoint(ms.max))}qt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)At.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(At));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)At.fromBufferAttribute(o,c),l&&(Bi.fromBufferAttribute(e,c),At.add(Bi)),s=Math.max(s,n.distanceToSquared(At))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Nt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let U=0;U<n.count;U++)o[U]=new A,l[U]=new A;const c=new A,d=new A,u=new A,f=new re,p=new re,x=new re,v=new A,g=new A;function m(U,T,S){c.fromBufferAttribute(n,U),d.fromBufferAttribute(n,T),u.fromBufferAttribute(n,S),f.fromBufferAttribute(r,U),p.fromBufferAttribute(r,T),x.fromBufferAttribute(r,S),d.sub(c),u.sub(c),p.sub(f),x.sub(f);const C=1/(p.x*x.y-x.x*p.y);isFinite(C)&&(v.copy(d).multiplyScalar(x.y).addScaledVector(u,-p.y).multiplyScalar(C),g.copy(u).multiplyScalar(p.x).addScaledVector(d,-x.x).multiplyScalar(C),o[U].add(v),o[T].add(v),o[S].add(v),l[U].add(g),l[T].add(g),l[S].add(g))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let U=0,T=b.length;U<T;++U){const S=b[U],C=S.start,F=S.count;for(let N=C,O=C+F;N<O;N+=3)m(e.getX(N+0),e.getX(N+1),e.getX(N+2))}const M=new A,y=new A,I=new A,P=new A;function R(U){I.fromBufferAttribute(s,U),P.copy(I);const T=o[U];M.copy(T),M.sub(I.multiplyScalar(I.dot(T))).normalize(),y.crossVectors(P,T);const C=y.dot(l[U])<0?-1:1;a.setXYZW(U,M.x,M.y,M.z,C)}for(let U=0,T=b.length;U<T;++U){const S=b[U],C=S.start,F=S.count;for(let N=C,O=C+F;N<O;N+=3)R(e.getX(N+0)),R(e.getX(N+1)),R(e.getX(N+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Nt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const s=new A,r=new A,a=new A,o=new A,l=new A,c=new A,d=new A,u=new A;if(e)for(let f=0,p=e.count;f<p;f+=3){const x=e.getX(f+0),v=e.getX(f+1),g=e.getX(f+2);s.fromBufferAttribute(t,x),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,g),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),o.fromBufferAttribute(n,x),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),o.add(d),l.add(d),c.add(d),n.setXYZ(x,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),n.setXYZ(f+0,d.x,d.y,d.z),n.setXYZ(f+1,d.x,d.y,d.z),n.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)At.fromBufferAttribute(e,t),At.normalize(),e.setXYZ(t,At.x,At.y,At.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,u=o.normalized,f=new c.constructor(l.length*d);let p=0,x=0;for(let v=0,g=l.length;v<g;v++){o.isInterleavedBufferAttribute?p=l[v]*o.data.stride+o.offset:p=l[v]*d;for(let m=0;m<d;m++)f[x++]=c[p++]}return new Nt(f,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ht,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let d=0,u=c.length;d<u;d++){const f=c[d],p=e(f,n);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let u=0,f=c.length;u<f;u++){const p=c[u];d.push(p.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],u=r[c];for(let f=0,p=u.length;f<p;f++)d.push(u[f].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const kl=new rt,Qn=new Os,Js=new dn,Hl=new A,Qs=new A,er=new A,tr=new A,ya=new A,nr=new A,Gl=new A,ir=new A;class Ct extends St{constructor(e=new ht,t=new Wr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){nr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=o[l],u=r[l];d!==0&&(ya.fromBufferAttribute(u,e),a?nr.addScaledVector(ya,d):nr.addScaledVector(ya.sub(t),d))}t.add(nr)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Js.copy(n.boundingSphere),Js.applyMatrix4(r),Qn.copy(e.ray).recast(e.near),!(Js.containsPoint(Qn.origin)===!1&&(Qn.intersectSphere(Js,Hl)===null||Qn.origin.distanceToSquared(Hl)>(e.far-e.near)**2))&&(kl.copy(r).invert(),Qn.copy(e.ray).applyMatrix4(kl),!(n.boundingBox!==null&&Qn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Qn)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,u=r.attributes.normal,f=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,v=f.length;x<v;x++){const g=f[x],m=a[g.materialIndex],b=Math.max(g.start,p.start),M=Math.min(o.count,Math.min(g.start+g.count,p.start+p.count));for(let y=b,I=M;y<I;y+=3){const P=o.getX(y),R=o.getX(y+1),U=o.getX(y+2);s=sr(this,m,e,n,c,d,u,P,R,U),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const x=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let g=x,m=v;g<m;g+=3){const b=o.getX(g),M=o.getX(g+1),y=o.getX(g+2);s=sr(this,a,e,n,c,d,u,b,M,y),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let x=0,v=f.length;x<v;x++){const g=f[x],m=a[g.materialIndex],b=Math.max(g.start,p.start),M=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let y=b,I=M;y<I;y+=3){const P=y,R=y+1,U=y+2;s=sr(this,m,e,n,c,d,u,P,R,U),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const x=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let g=x,m=v;g<m;g+=3){const b=g,M=g+1,y=g+2;s=sr(this,a,e,n,c,d,u,b,M,y),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}}function Od(i,e,t,n,s,r,a,o){let l;if(e.side===Ht?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===nn,o),l===null)return null;ir.copy(o),ir.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(ir);return c<t.near||c>t.far?null:{distance:c,point:ir.clone(),object:i}}function sr(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Qs),i.getVertexPosition(l,er),i.getVertexPosition(c,tr);const d=Od(i,e,t,n,Qs,er,tr,Gl);if(d){const u=new A;tn.getBarycoord(Gl,Qs,er,tr,u),s&&(d.uv=tn.getInterpolatedAttribute(s,o,l,c,u,new re)),r&&(d.uv1=tn.getInterpolatedAttribute(r,o,l,c,u,new re)),a&&(d.normal=tn.getInterpolatedAttribute(a,o,l,c,u,new A),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new A,materialIndex:0};tn.getNormal(Qs,er,tr,f.normal),d.face=f,d.barycoord=u}return d}class Bs extends ht{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],d=[],u=[];let f=0,p=0;x("z","y","x",-1,-1,n,t,e,a,r,0),x("z","y","x",1,-1,n,t,-e,a,r,1),x("x","z","y",1,1,e,n,t,s,a,2),x("x","z","y",1,-1,e,n,-t,s,a,3),x("x","y","z",1,-1,e,t,n,s,r,4),x("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new We(c,3)),this.setAttribute("normal",new We(d,3)),this.setAttribute("uv",new We(u,2));function x(v,g,m,b,M,y,I,P,R,U,T){const S=y/R,C=I/U,F=y/2,N=I/2,O=P/2,$=R+1,G=U+1;let Q=0,X=0;const le=new A;for(let fe=0;fe<G;fe++){const ve=fe*C-N;for(let Ue=0;Ue<$;Ue++){const je=Ue*S-F;le[v]=je*b,le[g]=ve*M,le[m]=O,c.push(le.x,le.y,le.z),le[v]=0,le[g]=0,le[m]=P>0?1:-1,d.push(le.x,le.y,le.z),u.push(Ue/R),u.push(1-fe/U),Q+=1}}for(let fe=0;fe<U;fe++)for(let ve=0;ve<R;ve++){const Ue=f+ve+$*fe,je=f+ve+$*(fe+1),j=f+(ve+1)+$*(fe+1),ce=f+(ve+1)+$*fe;l.push(Ue,je,ce),l.push(je,j,ce),X+=6}o.addGroup(p,X,T),p+=X,f+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ls(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Bt(i){const e={};for(let t=0;t<i.length;t++){const n=ls(i[t]);for(const s in n)e[s]=n[s]}return e}function Bd(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Sh(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const Vd={clone:ls,merge:Bt};var zd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,kd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Yn extends an{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=zd,this.fragmentShader=kd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ls(e.uniforms),this.uniformsGroups=Bd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Eh extends St{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=Rn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Vn=new A,Wl=new re,Xl=new re;class en extends Eh{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ls*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ji*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ls*2*Math.atan(Math.tan(Ji*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Vn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Vn.x,Vn.y).multiplyScalar(-e/Vn.z),Vn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Vn.x,Vn.y).multiplyScalar(-e/Vn.z)}getViewSize(e,t){return this.getViewBounds(e,Wl,Xl),t.subVectors(Xl,Wl)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ji*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Vi=-90,zi=1;class Hd extends St{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new en(Vi,zi,e,t);s.layers=this.layers,this.add(s);const r=new en(Vi,zi,e,t);r.layers=this.layers,this.add(r);const a=new en(Vi,zi,e,t);a.layers=this.layers,this.add(a);const o=new en(Vi,zi,e,t);o.layers=this.layers,this.add(o);const l=new en(Vi,zi,e,t);l.layers=this.layers,this.add(l);const c=new en(Vi,zi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Rn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Nr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,d]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),e.render(t,d),e.setRenderTarget(u,f,p),e.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class Th extends Rt{constructor(e,t,n,s,r,a,o,l,c,d){e=e!==void 0?e:[],t=t!==void 0?t:is,super(e,t,n,s,r,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Gd extends Mi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Th(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:xt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Bs(5,5,5),r=new Yn({name:"CubemapFromEquirect",uniforms:ls(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ht,blending:Wn});r.uniforms.tEquirect.value=t;const a=new Ct(s,r),o=t.minFilter;return t.minFilter===Gn&&(t.minFilter=xt),new Hd(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}class Ms extends St{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Wd={type:"move"};class Ma{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ms,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ms,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ms,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const g=t.getJointPose(v,n),m=this._getHandJoint(c,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=d.position.distanceTo(u.position),p=.02,x=.005;c.inputState.pinching&&f>p+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Wd)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ms;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Xd extends St{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new rn,this.environmentIntensity=1,this.environmentRotation=new rn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Ln extends Rt{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Kt,d=Kt,u,f){super(null,a,o,l,c,d,s,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ql extends Nt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ki=new rt,Yl=new rt,rr=[],$l=new Gt,qd=new rt,gs=new Ct,_s=new dn;class _x extends Ct{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ql(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,qd)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Gt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ki),$l.copy(e.boundingBox).applyMatrix4(ki),this.boundingBox.union($l)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new dn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ki),_s.copy(e.boundingSphere).applyMatrix4(ki),this.boundingSphere.union(_s)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(gs.geometry=this.geometry,gs.material=this.material,gs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),_s.copy(this.boundingSphere),_s.applyMatrix4(n),e.ray.intersectsSphere(_s)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ki),Yl.multiplyMatrices(n,ki),gs.matrixWorld=Yl,gs.raycast(e,rr);for(let a=0,o=rr.length;a<o;a++){const l=rr[a];l.instanceId=r,l.object=this,t.push(l)}rr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ql(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ln(new Float32Array(s*this.count),s,this.count,$o,sn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ba=new A,Yd=new A,$d=new Ye;class Cn{constructor(e=new A(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=ba.subVectors(n,t).cross(Yd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ba),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||$d.getNormalMatrix(e),s=this.coplanarPoint(ba).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ei=new dn,ar=new A;class Xr{constructor(e=new Cn,t=new Cn,n=new Cn,s=new Cn,r=new Cn,a=new Cn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Rn){const n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],d=s[5],u=s[6],f=s[7],p=s[8],x=s[9],v=s[10],g=s[11],m=s[12],b=s[13],M=s[14],y=s[15];if(n[0].setComponents(l-r,f-c,g-p,y-m).normalize(),n[1].setComponents(l+r,f+c,g+p,y+m).normalize(),n[2].setComponents(l+a,f+d,g+x,y+b).normalize(),n[3].setComponents(l-a,f-d,g-x,y-b).normalize(),n[4].setComponents(l-o,f-u,g-v,y-M).normalize(),t===Rn)n[5].setComponents(l+o,f+u,g+v,y+M).normalize();else if(t===Nr)n[5].setComponents(o,u,v,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ei.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ei.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ei)}intersectsSprite(e){return ei.center.set(0,0,0),ei.radius=.7071067811865476,ei.applyMatrix4(e.matrixWorld),this.intersectsSphere(ei)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(ar.x=s.normal.x>0?e.max.x:e.min.x,ar.y=s.normal.y>0?e.max.y:e.min.y,ar.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ar)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Sa(i,e){return i-e}function Kd(i,e){return i.z-e.z}function jd(i,e){return e.z-i.z}class Zd{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,s){const r=this.pool,a=this.list;this.index>=r.length&&r.push({start:-1,count:-1,z:-1,index:-1});const o=r[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=s}reset(){this.list.length=0,this.index=0}}const zt=new rt,Jd=new Fe(1,1,1),Ea=new Xr,or=new Gt,ti=new dn,xs=new A,Kl=new A,Qd=new A,Ta=new Zd,Ut=new Ct,lr=[];function ef(i,e,t=0){const n=e.itemSize;if(i.isInterleavedBufferAttribute||i.array.constructor!==e.array.constructor){const s=i.count;for(let r=0;r<s;r++)for(let a=0;a<n;a++)e.setComponent(r+t,a,i.getComponent(r,a))}else e.array.set(i.array,t*n);e.needsUpdate=!0}function ni(i,e){if(i.constructor!==e.constructor){const t=Math.min(i.length,e.length);for(let n=0;n<t;n++)e[n]=i[n]}else{const t=Math.min(i.length,e.length);e.set(new i.constructor(i.buffer,0,t))}}class xx extends Ct{constructor(e,t,n=t*2,s){super(new ht,s),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._multiDrawInstances=null,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4),n=new Ln(t,e,e,wt,sn);this._matricesTexture=n}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Uint32Array(e*e),n=new Ln(t,e,e,Gr,qn);this._indirectTexture=n}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Float32Array(e*e*4).fill(1),n=new Ln(t,e,e,wt,sn);n.colorSpace=et.workingColorSpace,this._colorsTexture=n}_initializeGeometry(e){const t=this.geometry,n=this._maxVertexCount,s=this._maxIndexCount;if(this._geometryInitialized===!1){for(const r in e.attributes){const a=e.getAttribute(r),{array:o,itemSize:l,normalized:c}=a,d=new o.constructor(n*l),u=new Nt(d,l,c);t.setAttribute(r,u)}if(e.getIndex()!==null){const r=n>65535?new Uint32Array(s):new Uint16Array(s);t.setIndex(new Nt(r,1))}this._geometryInitialized=!0}}_validateGeometry(e){const t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(const n in t.attributes){if(!e.hasAttribute(n))throw new Error(`THREE.BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);const s=e.getAttribute(n),r=t.getAttribute(n);if(s.itemSize!==r.itemSize||s.normalized!==r.normalized)throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(e){const t=this._instanceInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${e}. Instance is either out of range or has been deleted.`)}validateGeometryId(e){const t=this._geometryInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${e}. Geometry is either out of range or has been deleted.`)}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Gt);const e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let n=0,s=t.length;n<s;n++){if(t[n].active===!1)continue;const r=t[n].geometryIndex;this.getMatrixAt(n,zt),this.getBoundingBoxAt(r,or).applyMatrix4(zt),e.union(or)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new dn);const e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let n=0,s=t.length;n<s;n++){if(t[n].active===!1)continue;const r=t[n].geometryIndex;this.getMatrixAt(n,zt),this.getBoundingSphereAt(r,ti).applyMatrix4(zt),e.union(ti)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("THREE.BatchedMesh: Maximum item count reached.");const n={visible:!0,active:!0,geometryIndex:e};let s=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(Sa),s=this._availableInstanceIds.shift(),this._instanceInfo[s]=n):(s=this._instanceInfo.length,this._instanceInfo.push(n));const r=this._matricesTexture;zt.identity().toArray(r.image.data,s*16),r.needsUpdate=!0;const a=this._colorsTexture;return a&&(Jd.toArray(a.image.data,s*4),a.needsUpdate=!0),this._visibilityChanged=!0,s}addGeometry(e,t=-1,n=-1){this._initializeGeometry(e),this._validateGeometry(e);const s={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},r=this._geometryInfo;s.vertexStart=this._nextVertexStart,s.reservedVertexCount=t===-1?e.getAttribute("position").count:t;const a=e.getIndex();if(a!==null&&(s.indexStart=this._nextIndexStart,s.reservedIndexCount=n===-1?a.count:n),s.indexStart!==-1&&s.indexStart+s.reservedIndexCount>this._maxIndexCount||s.vertexStart+s.reservedVertexCount>this._maxVertexCount)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(Sa),l=this._availableGeometryIds.shift(),r[l]=s):(l=this._geometryCount,this._geometryCount++,r.push(s)),this.setGeometryAt(l,e),this._nextIndexStart=s.indexStart+s.reservedIndexCount,this._nextVertexStart=s.vertexStart+s.reservedVertexCount,l}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);const n=this.geometry,s=n.getIndex()!==null,r=n.getIndex(),a=t.getIndex(),o=this._geometryInfo[e];if(s&&a.count>o.reservedIndexCount||t.attributes.position.count>o.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");const l=o.vertexStart,c=o.reservedVertexCount;o.vertexCount=t.getAttribute("position").count;for(const d in n.attributes){const u=t.getAttribute(d),f=n.getAttribute(d);ef(u,f,l);const p=u.itemSize;for(let x=u.count,v=c;x<v;x++){const g=l+x;for(let m=0;m<p;m++)f.setComponent(g,m,0)}f.needsUpdate=!0,f.addUpdateRange(l*p,c*p)}if(s){const d=o.indexStart,u=o.reservedIndexCount;o.indexCount=t.getIndex().count;for(let f=0;f<a.count;f++)r.setX(d+f,l+a.getX(f));for(let f=a.count,p=u;f<p;f++)r.setX(d+f,l);r.needsUpdate=!0,r.addUpdateRange(d,o.reservedIndexCount)}return o.start=s?o.indexStart:o.vertexStart,o.count=s?o.indexCount:o.vertexCount,o.boundingBox=null,t.boundingBox!==null&&(o.boundingBox=t.boundingBox.clone()),o.boundingSphere=null,t.boundingSphere!==null&&(o.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){const t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;const n=this._instanceInfo;for(let s=0,r=n.length;s<r;s++)n[s].active&&n[s].geometryIndex===e&&this.deleteInstance(s);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){return this.validateInstanceId(e),this._instanceInfo[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this}optimize(){let e=0,t=0;const n=this._geometryInfo,s=n.map((a,o)=>o).sort((a,o)=>n[a].vertexStart-n[o].vertexStart),r=this.geometry;for(let a=0,o=n.length;a<o;a++){const l=s[a],c=n[l];if(c.active!==!1){if(r.index!==null){if(c.indexStart!==t){const{indexStart:d,vertexStart:u,reservedIndexCount:f}=c,p=r.index,x=p.array,v=e-u;for(let g=d;g<d+f;g++)x[g]=x[g]+v;p.array.copyWithin(t,d,d+f),p.addUpdateRange(t,f),c.indexStart=t}t+=c.reservedIndexCount}if(c.vertexStart!==e){const{vertexStart:d,reservedVertexCount:u}=c,f=r.attributes;for(const p in f){const x=f[p],{array:v,itemSize:g}=x;v.copyWithin(e*g,d*g,(d+u)*g),x.addUpdateRange(e*g,u*g)}c.vertexStart=e}e+=c.reservedVertexCount,c.start=r.index?c.indexStart:c.vertexStart,this._nextIndexStart=r.index?c.indexStart+c.reservedIndexCount:0,this._nextVertexStart=c.vertexStart+c.reservedVertexCount}}return this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,s=this._geometryInfo[e];if(s.boundingBox===null){const r=new Gt,a=n.index,o=n.attributes.position;for(let l=s.start,c=s.start+s.count;l<c;l++){let d=l;a&&(d=a.getX(d)),r.expandByPoint(xs.fromBufferAttribute(o,d))}s.boundingBox=r}return t.copy(s.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,s=this._geometryInfo[e];if(s.boundingSphere===null){const r=new dn;this.getBoundingBoxAt(e,or),or.getCenter(r.center);const a=n.index,o=n.attributes.position;let l=0;for(let c=s.start,d=s.start+s.count;c<d;c++){let u=c;a&&(u=a.getX(u)),xs.fromBufferAttribute(o,u),l=Math.max(l,r.center.distanceToSquared(xs))}r.radius=Math.sqrt(l),s.boundingSphere=r}return t.copy(s.boundingSphere),t}setMatrixAt(e,t){this.validateInstanceId(e);const n=this._matricesTexture,s=this._matricesTexture.image.data;return t.toArray(s,e*16),n.needsUpdate=!0,this}getMatrixAt(e,t){return this.validateInstanceId(e),t.fromArray(this._matricesTexture.image.data,e*16)}setColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null&&this._initColorsTexture(),t.toArray(this._colorsTexture.image.data,e*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(e,t){return this.validateInstanceId(e),t.fromArray(this._colorsTexture.image.data,e*4)}setVisibleAt(e,t){return this.validateInstanceId(e),this._instanceInfo[e].visible===t?this:(this._instanceInfo[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){return this.validateInstanceId(e),this._instanceInfo[e].visible}setGeometryIdAt(e,t){return this.validateInstanceId(e),this.validateGeometryId(t),this._instanceInfo[e].geometryIndex=t,this}getGeometryIdAt(e){return this.validateInstanceId(e),this._instanceInfo[e].geometryIndex}getGeometryRangeAt(e,t={}){this.validateGeometryId(e);const n=this._geometryInfo[e];return t.vertexStart=n.vertexStart,t.vertexCount=n.vertexCount,t.reservedVertexCount=n.reservedVertexCount,t.indexStart=n.indexStart,t.indexCount=n.indexCount,t.reservedIndexCount=n.reservedIndexCount,t.start=n.start,t.count=n.count,t}setInstanceCount(e){const t=this._availableInstanceIds,n=this._instanceInfo;for(t.sort(Sa);t[t.length-1]===n.length;)n.pop(),t.pop();if(e<n.length)throw new Error(`BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);const s=new Int32Array(e),r=new Int32Array(e);ni(this._multiDrawCounts,s),ni(this._multiDrawStarts,r),this._multiDrawCounts=s,this._multiDrawStarts=r,this._maxInstanceCount=e;const a=this._indirectTexture,o=this._matricesTexture,l=this._colorsTexture;a.dispose(),this._initIndirectTexture(),ni(a.image.data,this._indirectTexture.image.data),o.dispose(),this._initMatricesTexture(),ni(o.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),ni(l.image.data,this._colorsTexture.image.data))}setGeometrySize(e,t){const n=[...this._geometryInfo].filter(o=>o.active);if(Math.max(...n.map(o=>o.vertexStart+o.reservedVertexCount))>e)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${t}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(l=>l.indexStart+l.reservedIndexCount))>t)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);const r=this.geometry;r.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new ht,this._initializeGeometry(r));const a=this.geometry;r.index&&ni(r.index.array,a.index.array);for(const o in r.attributes)ni(r.attributes[o].array,a.attributes[o].array)}raycast(e,t){const n=this._instanceInfo,s=this._geometryInfo,r=this.matrixWorld,a=this.geometry;Ut.material=this.material,Ut.geometry.index=a.index,Ut.geometry.attributes=a.attributes,Ut.geometry.boundingBox===null&&(Ut.geometry.boundingBox=new Gt),Ut.geometry.boundingSphere===null&&(Ut.geometry.boundingSphere=new dn);for(let o=0,l=n.length;o<l;o++){if(!n[o].visible||!n[o].active)continue;const c=n[o].geometryIndex,d=s[c];Ut.geometry.setDrawRange(d.start,d.count),this.getMatrixAt(o,Ut.matrixWorld).premultiply(r),this.getBoundingBoxAt(c,Ut.geometry.boundingBox),this.getBoundingSphereAt(c,Ut.geometry.boundingSphere),Ut.raycast(e,lr);for(let u=0,f=lr.length;u<f;u++){const p=lr[u];p.object=this,p.batchId=o,t.push(p)}lr.length=0}Ut.material=null,Ut.geometry.index=null,Ut.geometry.attributes={},Ut.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._geometryCount=e._geometryCount,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null)}onBeforeRender(e,t,n,s,r){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const a=s.getIndex(),o=a===null?1:a.array.BYTES_PER_ELEMENT,l=this._instanceInfo,c=this._multiDrawStarts,d=this._multiDrawCounts,u=this._geometryInfo,f=this.perObjectFrustumCulled,p=this._indirectTexture,x=p.image.data;f&&(zt.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),Ea.setFromProjectionMatrix(zt,e.coordinateSystem));let v=0;if(this.sortObjects){zt.copy(this.matrixWorld).invert(),xs.setFromMatrixPosition(n.matrixWorld).applyMatrix4(zt),Kl.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(zt);for(let b=0,M=l.length;b<M;b++)if(l[b].visible&&l[b].active){const y=l[b].geometryIndex;this.getMatrixAt(b,zt),this.getBoundingSphereAt(y,ti).applyMatrix4(zt);let I=!1;if(f&&(I=!Ea.intersectsSphere(ti)),!I){const P=u[y],R=Qd.subVectors(ti.center,xs).dot(Kl);Ta.push(P.start,P.count,R,b)}}const g=Ta.list,m=this.customSort;m===null?g.sort(r.transparent?jd:Kd):m.call(this,g,n);for(let b=0,M=g.length;b<M;b++){const y=g[b];c[v]=y.start*o,d[v]=y.count,x[v]=y.index,v++}Ta.reset()}else for(let g=0,m=l.length;g<m;g++)if(l[g].visible&&l[g].active){const b=l[g].geometryIndex;let M=!1;if(f&&(this.getMatrixAt(g,zt),this.getBoundingSphereAt(b,ti).applyMatrix4(zt),M=!Ea.intersectsSphere(ti)),!M){const y=u[b];c[v]=y.start*o,d[v]=y.count,x[v]=g,v++}}p.needsUpdate=!0,this._multiDrawCount=v,this._visibilityChanged=!1}onBeforeShadow(e,t,n,s,r,a){this.onBeforeRender(e,null,s,r,a)}}class $n extends an{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Fe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Or=new A,Br=new A,jl=new rt,vs=new Os,cr=new dn,Aa=new A,Zl=new A;class el extends St{constructor(e=new ht,t=new $n){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Or.fromBufferAttribute(t,s-1),Br.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Or.distanceTo(Br);e.setAttribute("lineDistance",new We(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),cr.copy(n.boundingSphere),cr.applyMatrix4(s),cr.radius+=r,e.ray.intersectsSphere(cr)===!1)return;jl.copy(s).invert(),vs.copy(e.ray).applyMatrix4(jl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=n.index,f=n.attributes.position;if(d!==null){const p=Math.max(0,a.start),x=Math.min(d.count,a.start+a.count);for(let v=p,g=x-1;v<g;v+=c){const m=d.getX(v),b=d.getX(v+1),M=hr(this,e,vs,l,m,b,v);M&&t.push(M)}if(this.isLineLoop){const v=d.getX(x-1),g=d.getX(p),m=hr(this,e,vs,l,v,g,x-1);m&&t.push(m)}}else{const p=Math.max(0,a.start),x=Math.min(f.count,a.start+a.count);for(let v=p,g=x-1;v<g;v+=c){const m=hr(this,e,vs,l,v,v+1,v);m&&t.push(m)}if(this.isLineLoop){const v=hr(this,e,vs,l,x-1,p,x-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function hr(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(Or.fromBufferAttribute(o,s),Br.fromBufferAttribute(o,r),t.distanceSqToSegment(Or,Br,Aa,Zl)>n)return;Aa.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Aa);if(!(c<e.near||c>e.far))return{distance:c,point:Zl.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Jl=new A,Ql=new A;class qr extends el{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Jl.fromBufferAttribute(t,s),Ql.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Jl.distanceTo(Ql);e.setAttribute("lineDistance",new We(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class vx extends el{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class tf extends an{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Fe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}class nf extends Rt{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ah extends Rt{constructor(e,t,n,s,r,a,o,l,c,d=Zi){if(d!==Zi&&d!==as)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===Zi&&(n=qn),n===void 0&&d===as&&(n=rs),super(null,s,r,a,o,l,d,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Kt,this.minFilter=l!==void 0?l:Kt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Jo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class yn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const d=n[s],f=n[s+1]-d,p=(a-d)/f;return(s+p)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new re:new A);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new A,s=[],r=[],a=[],o=new A,l=new rt;for(let p=0;p<=e;p++){const x=p/e;s[p]=this.getTangentAt(x,new A)}r[0]=new A,a[0]=new A;let c=Number.MAX_VALUE;const d=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);d<=c&&(c=d,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let p=1;p<=e;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(s[p-1],s[p]),o.length()>Number.EPSILON){o.normalize();const x=Math.acos(Ge(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(o,x))}a[p].crossVectors(s[p],r[p])}if(t===!0){let p=Math.acos(Ge(r[0].dot(r[e]),-1,1));p/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(p=-p);for(let x=1;x<=e;x++)r[x].applyMatrix4(l.makeRotationAxis(s[x],p*x)),a[x].crossVectors(s[x],r[x])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class tl extends yn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new re){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const d=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,p=c-this.aY;l=f*d-p*u+this.aX,c=f*u+p*d+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class sf extends tl{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function nl(){let i=0,e=0,t=0,n=0;function s(r,a,o,l){i=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,d,u){let f=(a-r)/c-(o-r)/(c+d)+(o-a)/d,p=(o-a)/d-(l-a)/(d+u)+(l-o)/u;f*=d,p*=d,s(a,o,f,p)},calc:function(r){const a=r*r,o=a*r;return i+e*r+t*a+n*o}}}const ur=new A,wa=new nl,Pa=new nl,Ca=new nl;class rf extends yn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new A){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,d;this.closed||o>0?c=s[(o-1)%r]:(ur.subVectors(s[0],s[1]).add(s[0]),c=ur);const u=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?d=s[(o+2)%r]:(ur.subVectors(s[r-1],s[r-2]).add(s[r-1]),d=ur),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let x=Math.pow(c.distanceToSquared(u),p),v=Math.pow(u.distanceToSquared(f),p),g=Math.pow(f.distanceToSquared(d),p);v<1e-4&&(v=1),x<1e-4&&(x=v),g<1e-4&&(g=v),wa.initNonuniformCatmullRom(c.x,u.x,f.x,d.x,x,v,g),Pa.initNonuniformCatmullRom(c.y,u.y,f.y,d.y,x,v,g),Ca.initNonuniformCatmullRom(c.z,u.z,f.z,d.z,x,v,g)}else this.curveType==="catmullrom"&&(wa.initCatmullRom(c.x,u.x,f.x,d.x,this.tension),Pa.initCatmullRom(c.y,u.y,f.y,d.y,this.tension),Ca.initCatmullRom(c.z,u.z,f.z,d.z,this.tension));return n.set(wa.calc(l),Pa.calc(l),Ca.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new A().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function ec(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*i+t}function af(i,e){const t=1-i;return t*t*e}function of(i,e){return 2*(1-i)*i*e}function lf(i,e){return i*i*e}function As(i,e,t,n){return af(i,e)+of(i,t)+lf(i,n)}function cf(i,e){const t=1-i;return t*t*t*e}function hf(i,e){const t=1-i;return 3*t*t*i*e}function uf(i,e){return 3*(1-i)*i*i*e}function df(i,e){return i*i*i*e}function ws(i,e,t,n,s){return cf(i,e)+hf(i,t)+uf(i,n)+df(i,s)}class wh extends yn{constructor(e=new re,t=new re,n=new re,s=new re){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new re){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ws(e,s.x,r.x,a.x,o.x),ws(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class ff extends yn{constructor(e=new A,t=new A,n=new A,s=new A){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new A){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ws(e,s.x,r.x,a.x,o.x),ws(e,s.y,r.y,a.y,o.y),ws(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ph extends yn{constructor(e=new re,t=new re){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new re){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new re){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class pf extends yn{constructor(e=new A,t=new A){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new A){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new A){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ch extends yn{constructor(e=new re,t=new re,n=new re){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new re){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(As(e,s.x,r.x,a.x),As(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Rh extends yn{constructor(e=new A,t=new A,n=new A){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new A){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(As(e,s.x,r.x,a.x),As(e,s.y,r.y,a.y),As(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Lh extends yn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new re){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],d=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return n.set(ec(o,l.x,c.x,d.x,u.x),ec(o,l.y,c.y,d.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new re().fromArray(s))}return this}}var Vr=Object.freeze({__proto__:null,ArcCurve:sf,CatmullRomCurve3:rf,CubicBezierCurve:wh,CubicBezierCurve3:ff,EllipseCurve:tl,LineCurve:Ph,LineCurve3:pf,QuadraticBezierCurve:Ch,QuadraticBezierCurve3:Rh,SplineCurve:Lh});class mf extends yn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Vr[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const d=l[c];n&&n.equals(d)||(t.push(d),n=d)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Vr[s.type]().fromJSON(s))}return this}}class tc extends mf{constructor(e){super(),this.type="Path",this.currentPoint=new re,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Ph(this.currentPoint.clone(),new re(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new Ch(this.currentPoint.clone(),new re(e,t),new re(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){const o=new wh(this.currentPoint.clone(),new re(e,t),new re(n,s),new re(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Lh(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,l){const c=this.currentPoint.x,d=this.currentPoint.y;return this.absellipse(e+c,t+d,n,s,r,a,o,l),this}absellipse(e,t,n,s,r,a,o,l){const c=new tl(e,t,n,s,r,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const d=c.getPoint(1);return this.currentPoint.copy(d),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Ih extends ht{constructor(e=[new re(0,-.5),new re(.5,0),new re(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=Ge(s,0,Math.PI*2);const r=[],a=[],o=[],l=[],c=[],d=1/t,u=new A,f=new re,p=new A,x=new A,v=new A;let g=0,m=0;for(let b=0;b<=e.length-1;b++)switch(b){case 0:g=e[b+1].x-e[b].x,m=e[b+1].y-e[b].y,p.x=m*1,p.y=-g,p.z=m*0,v.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case e.length-1:l.push(v.x,v.y,v.z);break;default:g=e[b+1].x-e[b].x,m=e[b+1].y-e[b].y,p.x=m*1,p.y=-g,p.z=m*0,x.copy(p),p.x+=v.x,p.y+=v.y,p.z+=v.z,p.normalize(),l.push(p.x,p.y,p.z),v.copy(x)}for(let b=0;b<=t;b++){const M=n+b*d*s,y=Math.sin(M),I=Math.cos(M);for(let P=0;P<=e.length-1;P++){u.x=e[P].x*y,u.y=e[P].y,u.z=e[P].x*I,a.push(u.x,u.y,u.z),f.x=b/t,f.y=P/(e.length-1),o.push(f.x,f.y);const R=l[3*P+0]*y,U=l[3*P+1],T=l[3*P+0]*I;c.push(R,U,T)}}for(let b=0;b<t;b++)for(let M=0;M<e.length-1;M++){const y=M+b*e.length,I=y,P=y+e.length,R=y+e.length+1,U=y+1;r.push(I,P,U),r.push(R,U,P)}this.setIndex(r),this.setAttribute("position",new We(a,3)),this.setAttribute("uv",new We(o,2)),this.setAttribute("normal",new We(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ih(e.points,e.segments,e.phiStart,e.phiLength)}}class Dh extends ht{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],l=[],c=new A,d=new re;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){const p=n+u/t*s;c.x=e*Math.cos(p),c.y=e*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),d.x=(a[f]/e+1)/2,d.y=(a[f+1]/e+1)/2,l.push(d.x,d.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new We(a,3)),this.setAttribute("normal",new We(o,3)),this.setAttribute("uv",new We(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dh(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Yr extends ht{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const d=[],u=[],f=[],p=[];let x=0;const v=[],g=n/2;let m=0;b(),a===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(d),this.setAttribute("position",new We(u,3)),this.setAttribute("normal",new We(f,3)),this.setAttribute("uv",new We(p,2));function b(){const y=new A,I=new A;let P=0;const R=(t-e)/n;for(let U=0;U<=r;U++){const T=[],S=U/r,C=S*(t-e)+e;for(let F=0;F<=s;F++){const N=F/s,O=N*l+o,$=Math.sin(O),G=Math.cos(O);I.x=C*$,I.y=-S*n+g,I.z=C*G,u.push(I.x,I.y,I.z),y.set($,R,G).normalize(),f.push(y.x,y.y,y.z),p.push(N,1-S),T.push(x++)}v.push(T)}for(let U=0;U<s;U++)for(let T=0;T<r;T++){const S=v[T][U],C=v[T+1][U],F=v[T+1][U+1],N=v[T][U+1];(e>0||T!==0)&&(d.push(S,C,N),P+=3),(t>0||T!==r-1)&&(d.push(C,F,N),P+=3)}c.addGroup(m,P,0),m+=P}function M(y){const I=x,P=new re,R=new A;let U=0;const T=y===!0?e:t,S=y===!0?1:-1;for(let F=1;F<=s;F++)u.push(0,g*S,0),f.push(0,S,0),p.push(.5,.5),x++;const C=x;for(let F=0;F<=s;F++){const O=F/s*l+o,$=Math.cos(O),G=Math.sin(O);R.x=T*G,R.y=g*S,R.z=T*$,u.push(R.x,R.y,R.z),f.push(0,S,0),P.x=$*.5+.5,P.y=G*.5*S+.5,p.push(P.x,P.y),x++}for(let F=0;F<s;F++){const N=I+F,O=C+F;y===!0?d.push(O,O+1,N):d.push(O+1,O,N),U+=3}c.addGroup(m,U,y===!0?1:2),m+=U}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yr(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Uh extends Yr{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Uh(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class $r extends ht{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];o(s),c(n),d(),this.setAttribute("position",new We(r,3)),this.setAttribute("normal",new We(r.slice(),3)),this.setAttribute("uv",new We(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(b){const M=new A,y=new A,I=new A;for(let P=0;P<t.length;P+=3)p(t[P+0],M),p(t[P+1],y),p(t[P+2],I),l(M,y,I,b)}function l(b,M,y,I){const P=I+1,R=[];for(let U=0;U<=P;U++){R[U]=[];const T=b.clone().lerp(y,U/P),S=M.clone().lerp(y,U/P),C=P-U;for(let F=0;F<=C;F++)F===0&&U===P?R[U][F]=T:R[U][F]=T.clone().lerp(S,F/C)}for(let U=0;U<P;U++)for(let T=0;T<2*(P-U)-1;T++){const S=Math.floor(T/2);T%2===0?(f(R[U][S+1]),f(R[U+1][S]),f(R[U][S])):(f(R[U][S+1]),f(R[U+1][S+1]),f(R[U+1][S]))}}function c(b){const M=new A;for(let y=0;y<r.length;y+=3)M.x=r[y+0],M.y=r[y+1],M.z=r[y+2],M.normalize().multiplyScalar(b),r[y+0]=M.x,r[y+1]=M.y,r[y+2]=M.z}function d(){const b=new A;for(let M=0;M<r.length;M+=3){b.x=r[M+0],b.y=r[M+1],b.z=r[M+2];const y=g(b)/2/Math.PI+.5,I=m(b)/Math.PI+.5;a.push(y,1-I)}x(),u()}function u(){for(let b=0;b<a.length;b+=6){const M=a[b+0],y=a[b+2],I=a[b+4],P=Math.max(M,y,I),R=Math.min(M,y,I);P>.9&&R<.1&&(M<.2&&(a[b+0]+=1),y<.2&&(a[b+2]+=1),I<.2&&(a[b+4]+=1))}}function f(b){r.push(b.x,b.y,b.z)}function p(b,M){const y=b*3;M.x=e[y+0],M.y=e[y+1],M.z=e[y+2]}function x(){const b=new A,M=new A,y=new A,I=new A,P=new re,R=new re,U=new re;for(let T=0,S=0;T<r.length;T+=9,S+=6){b.set(r[T+0],r[T+1],r[T+2]),M.set(r[T+3],r[T+4],r[T+5]),y.set(r[T+6],r[T+7],r[T+8]),P.set(a[S+0],a[S+1]),R.set(a[S+2],a[S+3]),U.set(a[S+4],a[S+5]),I.copy(b).add(M).add(y).divideScalar(3);const C=g(I);v(P,S+0,b,C),v(R,S+2,M,C),v(U,S+4,y,C)}}function v(b,M,y,I){I<0&&b.x===1&&(a[M]=b.x-1),y.x===0&&y.z===0&&(a[M]=I/2/Math.PI+.5)}function g(b){return Math.atan2(b.z,-b.x)}function m(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $r(e.vertices,e.indices,e.radius,e.details)}}const dr=new A,fr=new A,Ra=new A,pr=new tn;class yx extends ht{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const s=Math.pow(10,4),r=Math.cos(Ji*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],d=["a","b","c"],u=new Array(3),f={},p=[];for(let x=0;x<l;x+=3){a?(c[0]=a.getX(x),c[1]=a.getX(x+1),c[2]=a.getX(x+2)):(c[0]=x,c[1]=x+1,c[2]=x+2);const{a:v,b:g,c:m}=pr;if(v.fromBufferAttribute(o,c[0]),g.fromBufferAttribute(o,c[1]),m.fromBufferAttribute(o,c[2]),pr.getNormal(Ra),u[0]=`${Math.round(v.x*s)},${Math.round(v.y*s)},${Math.round(v.z*s)}`,u[1]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,u[2]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let b=0;b<3;b++){const M=(b+1)%3,y=u[b],I=u[M],P=pr[d[b]],R=pr[d[M]],U=`${y}_${I}`,T=`${I}_${y}`;T in f&&f[T]?(Ra.dot(f[T].normal)<=r&&(p.push(P.x,P.y,P.z),p.push(R.x,R.y,R.z)),f[T]=null):U in f||(f[U]={index0:c[b],index1:c[M],normal:Ra.clone()})}}for(const x in f)if(f[x]){const{index0:v,index1:g}=f[x];dr.fromBufferAttribute(o,v),fr.fromBufferAttribute(o,g),p.push(dr.x,dr.y,dr.z),p.push(fr.x,fr.y,fr.z)}this.setAttribute("position",new We(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class gf extends tc{constructor(e){super(e),this.uuid=Ai(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new tc().fromJSON(s))}return this}}class _f{static triangulate(e,t,n=2){const s=t&&t.length,r=s?t[0]*n:e.length;let a=Nh(e,0,r,n,!0);const o=[];if(!a||a.next===a.prev)return o;let l,c,d,u,f,p,x;if(s&&(a=bf(e,t,a,n)),e.length>80*n){l=d=e[0],c=u=e[1];for(let v=n;v<r;v+=n)f=e[v],p=e[v+1],f<l&&(l=f),p<c&&(c=p),f>d&&(d=f),p>u&&(u=p);x=Math.max(d-l,u-c),x=x!==0?32767/x:0}return Is(a,o,n,l,c,x,0),o}}function Nh(i,e,t,n,s){let r,a;if(s===Df(i,e,t,n)>0)for(r=e;r<t;r+=n)a=nc(r,i[r],i[r+1],a);else for(r=t-n;r>=e;r-=n)a=nc(r,i[r],i[r+1],a);return a&&Kr(a,a.next)&&(Us(a),a=a.next),a}function Si(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Kr(t,t.next)||ft(t.prev,t,t.next)===0)){if(Us(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Is(i,e,t,n,s,r,a){if(!i)return;!a&&r&&wf(i,n,s,r);let o=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,r?vf(i,n,s,r):xf(i)){e.push(l.i/t|0),e.push(i.i/t|0),e.push(c.i/t|0),Us(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=yf(Si(i),e,t),Is(i,e,t,n,s,r,2)):a===2&&Mf(i,e,t,n,s,r):Is(Si(i),e,t,n,s,r,1);break}}}function xf(i){const e=i.prev,t=i,n=i.next;if(ft(e,t,n)>=0)return!1;const s=e.x,r=t.x,a=n.x,o=e.y,l=t.y,c=n.y,d=s<r?s<a?s:a:r<a?r:a,u=o<l?o<c?o:c:l<c?l:c,f=s>r?s>a?s:a:r>a?r:a,p=o>l?o>c?o:c:l>c?l:c;let x=n.next;for(;x!==e;){if(x.x>=d&&x.x<=f&&x.y>=u&&x.y<=p&&Yi(s,o,r,l,a,c,x.x,x.y)&&ft(x.prev,x,x.next)>=0)return!1;x=x.next}return!0}function vf(i,e,t,n){const s=i.prev,r=i,a=i.next;if(ft(s,r,a)>=0)return!1;const o=s.x,l=r.x,c=a.x,d=s.y,u=r.y,f=a.y,p=o<l?o<c?o:c:l<c?l:c,x=d<u?d<f?d:f:u<f?u:f,v=o>l?o>c?o:c:l>c?l:c,g=d>u?d>f?d:f:u>f?u:f,m=No(p,x,e,t,n),b=No(v,g,e,t,n);let M=i.prevZ,y=i.nextZ;for(;M&&M.z>=m&&y&&y.z<=b;){if(M.x>=p&&M.x<=v&&M.y>=x&&M.y<=g&&M!==s&&M!==a&&Yi(o,d,l,u,c,f,M.x,M.y)&&ft(M.prev,M,M.next)>=0||(M=M.prevZ,y.x>=p&&y.x<=v&&y.y>=x&&y.y<=g&&y!==s&&y!==a&&Yi(o,d,l,u,c,f,y.x,y.y)&&ft(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;M&&M.z>=m;){if(M.x>=p&&M.x<=v&&M.y>=x&&M.y<=g&&M!==s&&M!==a&&Yi(o,d,l,u,c,f,M.x,M.y)&&ft(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;y&&y.z<=b;){if(y.x>=p&&y.x<=v&&y.y>=x&&y.y<=g&&y!==s&&y!==a&&Yi(o,d,l,u,c,f,y.x,y.y)&&ft(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function yf(i,e,t){let n=i;do{const s=n.prev,r=n.next.next;!Kr(s,r)&&Fh(s,n,n.next,r)&&Ds(s,r)&&Ds(r,s)&&(e.push(s.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),Us(n),Us(n.next),n=i=r),n=n.next}while(n!==i);return Si(n)}function Mf(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Rf(a,o)){let l=Oh(a,o);a=Si(a,a.next),l=Si(l,l.next),Is(a,e,t,n,s,r,0),Is(l,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function bf(i,e,t,n){const s=[];let r,a,o,l,c;for(r=0,a=e.length;r<a;r++)o=e[r]*n,l=r<a-1?e[r+1]*n:i.length,c=Nh(i,o,l,n,!1),c===c.next&&(c.steiner=!0),s.push(Cf(c));for(s.sort(Sf),r=0;r<s.length;r++)t=Ef(s[r],t);return t}function Sf(i,e){return i.x-e.x}function Ef(i,e){const t=Tf(i,e);if(!t)return e;const n=Oh(t,i);return Si(n,n.next),Si(t,t.next)}function Tf(i,e){let t=e,n=-1/0,s;const r=i.x,a=i.y;do{if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){const f=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=r&&f>n&&(n=f,s=t.x<t.next.x?t:t.next,f===r))return s}t=t.next}while(t!==e);if(!s)return null;const o=s,l=s.x,c=s.y;let d=1/0,u;t=s;do r>=t.x&&t.x>=l&&r!==t.x&&Yi(a<c?r:n,a,l,c,a<c?n:r,a,t.x,t.y)&&(u=Math.abs(a-t.y)/(r-t.x),Ds(t,i)&&(u<d||u===d&&(t.x>s.x||t.x===s.x&&Af(s,t)))&&(s=t,d=u)),t=t.next;while(t!==o);return s}function Af(i,e){return ft(i.prev,i,e.prev)<0&&ft(e.next,i,i.next)<0}function wf(i,e,t,n){let s=i;do s.z===0&&(s.z=No(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Pf(s)}function Pf(i){let e,t,n,s,r,a,o,l,c=1;do{for(t=i,i=null,r=null,a=0;t;){for(a++,n=t,o=0,e=0;e<c&&(o++,n=n.nextZ,!!n);e++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||t.z<=n.z)?(s=t,t=t.nextZ,o--):(s=n,n=n.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;t=n}r.nextZ=null,c*=2}while(a>1);return i}function No(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Cf(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Yi(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function Rf(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Lf(i,e)&&(Ds(i,e)&&Ds(e,i)&&If(i,e)&&(ft(i.prev,i,e.prev)||ft(i,e.prev,e))||Kr(i,e)&&ft(i.prev,i,i.next)>0&&ft(e.prev,e,e.next)>0)}function ft(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Kr(i,e){return i.x===e.x&&i.y===e.y}function Fh(i,e,t,n){const s=gr(ft(i,e,t)),r=gr(ft(i,e,n)),a=gr(ft(t,n,i)),o=gr(ft(t,n,e));return!!(s!==r&&a!==o||s===0&&mr(i,t,e)||r===0&&mr(i,n,e)||a===0&&mr(t,i,n)||o===0&&mr(t,e,n))}function mr(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function gr(i){return i>0?1:i<0?-1:0}function Lf(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Fh(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Ds(i,e){return ft(i.prev,i,i.next)<0?ft(i,e,i.next)>=0&&ft(i,i.prev,e)>=0:ft(i,e,i.prev)<0||ft(i,i.next,e)<0}function If(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Oh(i,e){const t=new Fo(i.i,i.x,i.y),n=new Fo(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function nc(i,e,t,n){const s=new Fo(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Us(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Fo(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Df(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class Ps{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return Ps.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];ic(e),sc(n,e);let a=e.length;t.forEach(ic);for(let l=0;l<t.length;l++)s.push(a),a+=t[l].length,sc(n,t[l]);const o=_f.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function ic(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function sc(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Bh extends ht{constructor(e=new gf([new re(.5,.5),new re(-.5,.5),new re(-.5,-.5),new re(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new We(s,3)),this.setAttribute("uv",new We(r,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,d=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,p=t.bevelThickness!==void 0?t.bevelThickness:.2,x=t.bevelSize!==void 0?t.bevelSize:p-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,b=t.UVGenerator!==void 0?t.UVGenerator:Uf;let M,y=!1,I,P,R,U;m&&(M=m.getSpacedPoints(d),y=!0,f=!1,I=m.computeFrenetFrames(d,!1),P=new A,R=new A,U=new A),f||(g=0,p=0,x=0,v=0);const T=o.extractPoints(c);let S=T.shape;const C=T.holes;if(!Ps.isClockWise(S)){S=S.reverse();for(let ne=0,te=C.length;ne<te;ne++){const D=C[ne];Ps.isClockWise(D)&&(C[ne]=D.reverse())}}const N=Ps.triangulateShape(S,C),O=S;for(let ne=0,te=C.length;ne<te;ne++){const D=C[ne];S=S.concat(D)}function $(ne,te,D){return te||console.error("THREE.ExtrudeGeometry: vec does not exist"),ne.clone().addScaledVector(te,D)}const G=S.length,Q=N.length;function X(ne,te,D){let Le,ae,Ee;const de=ne.x-te.x,Oe=ne.y-te.y,Me=D.x-ne.x,L=D.y-ne.y,E=de*de+Oe*Oe,W=de*L-Oe*Me;if(Math.abs(W)>Number.EPSILON){const Z=Math.sqrt(E),ie=Math.sqrt(Me*Me+L*L),J=te.x-Oe/Z,Ie=te.y+de/Z,me=D.x-L/ie,Te=D.y+Me/ie,Ze=((me-J)*L-(Te-Ie)*Me)/(de*L-Oe*Me);Le=J+de*Ze-ne.x,ae=Ie+Oe*Ze-ne.y;const he=Le*Le+ae*ae;if(he<=2)return new re(Le,ae);Ee=Math.sqrt(he/2)}else{let Z=!1;de>Number.EPSILON?Me>Number.EPSILON&&(Z=!0):de<-Number.EPSILON?Me<-Number.EPSILON&&(Z=!0):Math.sign(Oe)===Math.sign(L)&&(Z=!0),Z?(Le=-Oe,ae=de,Ee=Math.sqrt(E)):(Le=de,ae=Oe,Ee=Math.sqrt(E/2))}return new re(Le/Ee,ae/Ee)}const le=[];for(let ne=0,te=O.length,D=te-1,Le=ne+1;ne<te;ne++,D++,Le++)D===te&&(D=0),Le===te&&(Le=0),le[ne]=X(O[ne],O[D],O[Le]);const fe=[];let ve,Ue=le.concat();for(let ne=0,te=C.length;ne<te;ne++){const D=C[ne];ve=[];for(let Le=0,ae=D.length,Ee=ae-1,de=Le+1;Le<ae;Le++,Ee++,de++)Ee===ae&&(Ee=0),de===ae&&(de=0),ve[Le]=X(D[Le],D[Ee],D[de]);fe.push(ve),Ue=Ue.concat(ve)}for(let ne=0;ne<g;ne++){const te=ne/g,D=p*Math.cos(te*Math.PI/2),Le=x*Math.sin(te*Math.PI/2)+v;for(let ae=0,Ee=O.length;ae<Ee;ae++){const de=$(O[ae],le[ae],Le);ue(de.x,de.y,-D)}for(let ae=0,Ee=C.length;ae<Ee;ae++){const de=C[ae];ve=fe[ae];for(let Oe=0,Me=de.length;Oe<Me;Oe++){const L=$(de[Oe],ve[Oe],Le);ue(L.x,L.y,-D)}}}const je=x+v;for(let ne=0;ne<G;ne++){const te=f?$(S[ne],Ue[ne],je):S[ne];y?(R.copy(I.normals[0]).multiplyScalar(te.x),P.copy(I.binormals[0]).multiplyScalar(te.y),U.copy(M[0]).add(R).add(P),ue(U.x,U.y,U.z)):ue(te.x,te.y,0)}for(let ne=1;ne<=d;ne++)for(let te=0;te<G;te++){const D=f?$(S[te],Ue[te],je):S[te];y?(R.copy(I.normals[ne]).multiplyScalar(D.x),P.copy(I.binormals[ne]).multiplyScalar(D.y),U.copy(M[ne]).add(R).add(P),ue(U.x,U.y,U.z)):ue(D.x,D.y,u/d*ne)}for(let ne=g-1;ne>=0;ne--){const te=ne/g,D=p*Math.cos(te*Math.PI/2),Le=x*Math.sin(te*Math.PI/2)+v;for(let ae=0,Ee=O.length;ae<Ee;ae++){const de=$(O[ae],le[ae],Le);ue(de.x,de.y,u+D)}for(let ae=0,Ee=C.length;ae<Ee;ae++){const de=C[ae];ve=fe[ae];for(let Oe=0,Me=de.length;Oe<Me;Oe++){const L=$(de[Oe],ve[Oe],Le);y?ue(L.x,L.y+M[d-1].y,M[d-1].x+D):ue(L.x,L.y,u+D)}}}j(),ce();function j(){const ne=s.length/3;if(f){let te=0,D=G*te;for(let Le=0;Le<Q;Le++){const ae=N[Le];Re(ae[2]+D,ae[1]+D,ae[0]+D)}te=d+g*2,D=G*te;for(let Le=0;Le<Q;Le++){const ae=N[Le];Re(ae[0]+D,ae[1]+D,ae[2]+D)}}else{for(let te=0;te<Q;te++){const D=N[te];Re(D[2],D[1],D[0])}for(let te=0;te<Q;te++){const D=N[te];Re(D[0]+G*d,D[1]+G*d,D[2]+G*d)}}n.addGroup(ne,s.length/3-ne,0)}function ce(){const ne=s.length/3;let te=0;ye(O,te),te+=O.length;for(let D=0,Le=C.length;D<Le;D++){const ae=C[D];ye(ae,te),te+=ae.length}n.addGroup(ne,s.length/3-ne,1)}function ye(ne,te){let D=ne.length;for(;--D>=0;){const Le=D;let ae=D-1;ae<0&&(ae=ne.length-1);for(let Ee=0,de=d+g*2;Ee<de;Ee++){const Oe=G*Ee,Me=G*(Ee+1),L=te+Le+Oe,E=te+ae+Oe,W=te+ae+Me,Z=te+Le+Me;Xe(L,E,W,Z)}}}function ue(ne,te,D){l.push(ne),l.push(te),l.push(D)}function Re(ne,te,D){ge(ne),ge(te),ge(D);const Le=s.length/3,ae=b.generateTopUV(n,s,Le-3,Le-2,Le-1);He(ae[0]),He(ae[1]),He(ae[2])}function Xe(ne,te,D,Le){ge(ne),ge(te),ge(Le),ge(te),ge(D),ge(Le);const ae=s.length/3,Ee=b.generateSideWallUV(n,s,ae-6,ae-3,ae-2,ae-1);He(Ee[0]),He(Ee[1]),He(Ee[3]),He(Ee[1]),He(Ee[2]),He(Ee[3])}function ge(ne){s.push(l[ne*3+0]),s.push(l[ne*3+1]),s.push(l[ne*3+2])}function He(ne){r.push(ne.x),r.push(ne.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Nf(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,a=e.shapes.length;r<a;r++){const o=t[e.shapes[r]];n.push(o)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Vr[s.type]().fromJSON(s)),new Bh(n,e.options)}}const Uf={generateTopUV:function(i,e,t,n,s){const r=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[s*3],d=e[s*3+1];return[new re(r,a),new re(o,l),new re(c,d)]},generateSideWallUV:function(i,e,t,n,s,r){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],d=e[n*3+1],u=e[n*3+2],f=e[s*3],p=e[s*3+1],x=e[s*3+2],v=e[r*3],g=e[r*3+1],m=e[r*3+2];return Math.abs(o-d)<Math.abs(a-c)?[new re(a,1-l),new re(c,1-u),new re(f,1-x),new re(v,1-m)]:[new re(o,1-l),new re(d,1-u),new re(p,1-x),new re(g,1-m)]}};function Nf(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Vh extends $r{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Vh(e.radius,e.detail)}}class Vs extends ht{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,d=l+1,u=e/o,f=t/l,p=[],x=[],v=[],g=[];for(let m=0;m<d;m++){const b=m*f-a;for(let M=0;M<c;M++){const y=M*u-r;x.push(y,-b,0),v.push(0,0,1),g.push(M/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let b=0;b<o;b++){const M=b+c*m,y=b+c*(m+1),I=b+1+c*(m+1),P=b+1+c*m;p.push(M,y,P),p.push(y,I,P)}this.setIndex(p),this.setAttribute("position",new We(x,3)),this.setAttribute("normal",new We(v,3)),this.setAttribute("uv",new We(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vs(e.width,e.height,e.widthSegments,e.heightSegments)}}class zh extends ht{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],c=[],d=[];let u=e;const f=(t-e)/s,p=new A,x=new re;for(let v=0;v<=s;v++){for(let g=0;g<=n;g++){const m=r+g/n*a;p.x=u*Math.cos(m),p.y=u*Math.sin(m),l.push(p.x,p.y,p.z),c.push(0,0,1),x.x=(p.x/t+1)/2,x.y=(p.y/t+1)/2,d.push(x.x,x.y)}u+=f}for(let v=0;v<s;v++){const g=v*(n+1);for(let m=0;m<n;m++){const b=m+g,M=b,y=b+n+1,I=b+n+2,P=b+1;o.push(M,y,P),o.push(y,I,P)}}this.setIndex(o),this.setAttribute("position",new We(l,3)),this.setAttribute("normal",new We(c,3)),this.setAttribute("uv",new We(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zh(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class kh extends ht{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const d=[],u=new A,f=new A,p=[],x=[],v=[],g=[];for(let m=0;m<=n;m++){const b=[],M=m/n;let y=0;m===0&&a===0?y=.5/t:m===n&&l===Math.PI&&(y=-.5/t);for(let I=0;I<=t;I++){const P=I/t;u.x=-e*Math.cos(s+P*r)*Math.sin(a+M*o),u.y=e*Math.cos(a+M*o),u.z=e*Math.sin(s+P*r)*Math.sin(a+M*o),x.push(u.x,u.y,u.z),f.copy(u).normalize(),v.push(f.x,f.y,f.z),g.push(P+y,1-M),b.push(c++)}d.push(b)}for(let m=0;m<n;m++)for(let b=0;b<t;b++){const M=d[m][b+1],y=d[m][b],I=d[m+1][b],P=d[m+1][b+1];(m!==0||a>0)&&p.push(M,y,P),(m!==n-1||l<Math.PI)&&p.push(y,I,P)}this.setIndex(p),this.setAttribute("position",new We(x,3)),this.setAttribute("normal",new We(v,3)),this.setAttribute("uv",new We(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kh(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Hh extends $r{constructor(e=1,t=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],s=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,s,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Hh(e.radius,e.detail)}}class Gh extends ht{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],l=[],c=[],d=new A,u=new A,f=new A;for(let p=0;p<=n;p++)for(let x=0;x<=s;x++){const v=x/s*r,g=p/n*Math.PI*2;u.x=(e+t*Math.cos(g))*Math.cos(v),u.y=(e+t*Math.cos(g))*Math.sin(v),u.z=t*Math.sin(g),o.push(u.x,u.y,u.z),d.x=e*Math.cos(v),d.y=e*Math.sin(v),f.subVectors(u,d).normalize(),l.push(f.x,f.y,f.z),c.push(x/s),c.push(p/n)}for(let p=1;p<=n;p++)for(let x=1;x<=s;x++){const v=(s+1)*p+x-1,g=(s+1)*(p-1)+x-1,m=(s+1)*(p-1)+x,b=(s+1)*p+x;a.push(v,g,b),a.push(g,m,b)}this.setIndex(a),this.setAttribute("position",new We(o,3)),this.setAttribute("normal",new We(l,3)),this.setAttribute("uv",new We(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gh(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Wh extends ht{constructor(e=new Rh(new A(-1,-1,0),new A(-1,1,0),new A(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new A,l=new A,c=new re;let d=new A;const u=[],f=[],p=[],x=[];v(),this.setIndex(x),this.setAttribute("position",new We(u,3)),this.setAttribute("normal",new We(f,3)),this.setAttribute("uv",new We(p,2));function v(){for(let M=0;M<t;M++)g(M);g(r===!1?t:0),b(),m()}function g(M){d=e.getPointAt(M/t,d);const y=a.normals[M],I=a.binormals[M];for(let P=0;P<=s;P++){const R=P/s*Math.PI*2,U=Math.sin(R),T=-Math.cos(R);l.x=T*y.x+U*I.x,l.y=T*y.y+U*I.y,l.z=T*y.z+U*I.z,l.normalize(),f.push(l.x,l.y,l.z),o.x=d.x+n*l.x,o.y=d.y+n*l.y,o.z=d.z+n*l.z,u.push(o.x,o.y,o.z)}}function m(){for(let M=1;M<=t;M++)for(let y=1;y<=s;y++){const I=(s+1)*(M-1)+(y-1),P=(s+1)*M+(y-1),R=(s+1)*M+y,U=(s+1)*(M-1)+y;x.push(I,P,U),x.push(P,R,U)}}function b(){for(let M=0;M<=t;M++)for(let y=0;y<=s;y++)c.x=M/t,c.y=y/s,p.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Wh(new Vr[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class Ff extends an{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Fe(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}class Oo extends an{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Fe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fs,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class rc extends Oo{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new re(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ge(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Fe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Fe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Fe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class ac extends an{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Fe(16777215),this.specular=new Fe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fs,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.combine=kr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class _r extends an{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fs,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.combine=kr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Of extends an{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Xu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Bf extends an{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class oc extends an{constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new Fe(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fs,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Vf extends $n{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class Xh extends St{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Fe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class zf extends Xh{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Fe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const La=new rt,lc=new A,cc=new A;class kf{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new re(512,512),this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Xr,this._frameExtents=new re(1,1),this._viewportCount=1,this._viewports=[new gt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;lc.setFromMatrixPosition(e.matrixWorld),t.position.copy(lc),cc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(cc),t.updateMatrixWorld(),La.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(La),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(La)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class qh extends Eh{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Hf extends kf{constructor(){super(new qh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ia extends Xh{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.shadow=new Hf}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Gf extends en{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}class Wf{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=hc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=hc();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function hc(){return performance.now()}const uc=new rt;class Xf{constructor(e,t,n=0,s=1/0){this.ray=new Os(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Qo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return uc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(uc),this}intersectObject(e,t=!0,n=[]){return Bo(e,this,n,t),n.sort(dc),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Bo(e[s],this,n,t);return n.sort(dc),n}}function dc(i,e){return i.distance-e.distance}function Bo(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Bo(r[a],e,t,!0)}}class fc{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ge(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Ge(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Mx extends qr{constructor(e=10,t=10,n=4473924,s=8947848){n=new Fe(n),s=new Fe(s);const r=t/2,a=e/t,o=e/2,l=[],c=[];for(let f=0,p=0,x=-o;f<=t;f++,x+=a){l.push(-o,0,x,o,0,x),l.push(x,0,-o,x,0,o);const v=f===r?n:s;v.toArray(c,p),p+=3,v.toArray(c,p),p+=3,v.toArray(c,p),p+=3,v.toArray(c,p),p+=3}const d=new ht;d.setAttribute("position",new We(l,3)),d.setAttribute("color",new We(c,3));const u=new $n({vertexColors:!0,toneMapped:!1});super(d,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const xr=new Gt;class bx extends qr{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),s=new Float32Array(24),r=new ht;r.setIndex(new Nt(n,1)),r.setAttribute("position",new Nt(s,3)),super(r,new $n({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0&&xr.setFromObject(this.object),xr.isEmpty())return;const e=xr.min,t=xr.max,n=this.geometry.attributes.position,s=n.array;s[0]=t.x,s[1]=t.y,s[2]=t.z,s[3]=e.x,s[4]=t.y,s[5]=t.z,s[6]=e.x,s[7]=e.y,s[8]=t.z,s[9]=t.x,s[10]=e.y,s[11]=t.z,s[12]=t.x,s[13]=t.y,s[14]=e.z,s[15]=e.x,s[16]=t.y,s[17]=e.z,s[18]=e.x,s[19]=e.y,s[20]=e.z,s[21]=t.x,s[22]=e.y,s[23]=e.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class Sx extends qr{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),s=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],r=new ht;r.setIndex(new Nt(n,1)),r.setAttribute("position",new We(s,3)),super(r,new $n({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){const t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){this.geometry.dispose(),this.material.dispose()}}const pc=new A;let vr,Da;class Ex extends St{constructor(e=new A(0,0,1),t=new A(0,0,0),n=1,s=16776960,r=n*.2,a=r*.2){super(),this.type="ArrowHelper",vr===void 0&&(vr=new ht,vr.setAttribute("position",new We([0,0,0,0,1,0],3)),Da=new Yr(0,.5,1,5,1),Da.translate(0,-.5,0)),this.position.copy(t),this.line=new el(vr,new $n({color:s,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Ct(Da,new Wr({color:s,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,r,a)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{pc.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(pc,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class Tx extends qr{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],s=new ht;s.setAttribute("position",new We(t,3)),s.setAttribute("color",new We(n,3));const r=new $n({vertexColors:!0,toneMapped:!1});super(s,r),this.type="AxesHelper"}setColors(e,t,n){const s=new Fe,r=this.geometry.attributes.color.array;return s.set(e),s.toArray(r,0),s.toArray(r,3),s.set(t),s.toArray(r,6),s.toArray(r,9),s.set(n),s.toArray(r,12),s.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class qf extends Ti{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function mc(i,e,t,n){const s=Yf(n);switch(t){case uh:return i*e;case fh:return i*e;case ph:return i*e*2;case $o:return i*e/s.components*s.byteLength;case Gr:return i*e/s.components*s.byteLength;case mh:return i*e*2/s.components*s.byteLength;case Ko:return i*e*2/s.components*s.byteLength;case dh:return i*e*3/s.components*s.byteLength;case wt:return i*e*4/s.components*s.byteLength;case jo:return i*e*4/s.components*s.byteLength;case Pr:case Cr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Rr:case Lr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case co:case uo:return Math.max(i,16)*Math.max(e,8)/4;case lo:case ho:return Math.max(i,8)*Math.max(e,8)/2;case fo:case po:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case mo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case go:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case _o:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case xo:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case vo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case yo:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Mo:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case bo:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case So:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Eo:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case To:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ao:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case wo:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Po:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Co:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ir:case Ro:case Lo:return Math.ceil(i/4)*Math.ceil(e/4)*16;case gh:case Io:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Do:case Uo:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Yf(i){switch(i){case Dn:case lh:return{byteLength:1,components:1};case Rs:case ch:case Ns:return{byteLength:2,components:1};case qo:case Yo:return{byteLength:2,components:4};case qn:case Xo:case sn:return{byteLength:4,components:1};case hh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Wo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Wo);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Yh(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function $f(i){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,u=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,d),o.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const d=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,d);else{u.sort((p,x)=>p.start-x.start);let f=0;for(let p=1;p<u.length;p++){const x=u[f],v=u[p];v.start<=x.start+x.count+1?x.count=Math.max(x.count,v.start+v.count-x.start):(++f,u[f]=v)}u.length=f+1;for(let p=0,x=u.length;p<x;p++){const v=u[p];i.bufferSubData(c,v.start*d.BYTES_PER_ELEMENT,d,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Kf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,jf=`#ifdef USE_ALPHAHASH
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
#endif`,Zf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Jf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ep=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tp=`#ifdef USE_AOMAP
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
#endif`,np=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ip=`#ifdef USE_BATCHING
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
#endif`,sp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,rp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ap=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,op=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,lp=`#ifdef USE_IRIDESCENCE
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
#endif`,cp=`#ifdef USE_BUMPMAP
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
#endif`,hp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,up=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,dp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,pp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,mp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,gp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,_p=`#if defined( USE_COLOR_ALPHA )
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
#endif`,xp=`#define PI 3.141592653589793
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
} // validated`,vp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,yp=`vec3 transformedNormal = objectNormal;
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
#endif`,Mp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,bp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Sp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ep=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Tp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ap=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,wp=`#ifdef USE_ENVMAP
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
#endif`,Pp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Cp=`#ifdef USE_ENVMAP
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
#endif`,Rp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Lp=`#ifdef USE_ENVMAP
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
#endif`,Ip=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Dp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Up=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Np=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Fp=`#ifdef USE_GRADIENTMAP
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
}`,Op=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Bp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Vp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zp=`uniform bool receiveShadow;
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
#endif`,kp=`#ifdef USE_ENVMAP
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
#endif`,Hp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Gp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qp=`PhysicalMaterial material;
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
#endif`,Yp=`struct PhysicalMaterial {
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
}`,$p=`
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
#endif`,Kp=`#if defined( RE_IndirectDiffuse )
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
#endif`,jp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Zp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Jp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,em=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,tm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,nm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,im=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,sm=`#if defined( USE_POINTS_UV )
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
#endif`,rm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,am=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,om=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hm=`#ifdef USE_MORPHTARGETS
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
#endif`,um=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,fm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,pm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,_m=`#ifdef USE_NORMALMAP
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
#endif`,xm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,vm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ym=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Mm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,bm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Sm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Em=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Tm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Am=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,wm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Pm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Rm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Lm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Im=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Dm=`float getShadowMask() {
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
}`,Um=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Nm=`#ifdef USE_SKINNING
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
#endif`,Fm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Om=`#ifdef USE_SKINNING
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
#endif`,Bm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Vm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,km=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Hm=`#ifdef USE_TRANSMISSION
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
#endif`,Gm=`#ifdef USE_TRANSMISSION
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
#endif`,Wm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ym=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const $m=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Km=`uniform sampler2D t2D;
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
}`,jm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Jm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,eg=`#include <common>
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
}`,tg=`#if DEPTH_PACKING == 3200
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
}`,ng=`#define DISTANCE
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
}`,ig=`#define DISTANCE
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
}`,sg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,rg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ag=`uniform float scale;
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
}`,og=`uniform vec3 diffuse;
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
}`,lg=`#include <common>
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
}`,cg=`uniform vec3 diffuse;
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
}`,hg=`#define LAMBERT
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
}`,ug=`#define LAMBERT
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
}`,dg=`#define MATCAP
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
}`,fg=`#define MATCAP
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
}`,pg=`#define NORMAL
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
}`,mg=`#define NORMAL
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
}`,gg=`#define PHONG
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
}`,_g=`#define PHONG
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
}`,xg=`#define STANDARD
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
}`,vg=`#define STANDARD
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
}`,yg=`#define TOON
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
}`,Mg=`#define TOON
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
}`,bg=`uniform float size;
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
}`,Sg=`uniform vec3 diffuse;
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
}`,Eg=`#include <common>
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
}`,Tg=`uniform vec3 color;
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
}`,Ag=`uniform float rotation;
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
}`,wg=`uniform vec3 diffuse;
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
}`,Ke={alphahash_fragment:Kf,alphahash_pars_fragment:jf,alphamap_fragment:Zf,alphamap_pars_fragment:Jf,alphatest_fragment:Qf,alphatest_pars_fragment:ep,aomap_fragment:tp,aomap_pars_fragment:np,batching_pars_vertex:ip,batching_vertex:sp,begin_vertex:rp,beginnormal_vertex:ap,bsdfs:op,iridescence_fragment:lp,bumpmap_pars_fragment:cp,clipping_planes_fragment:hp,clipping_planes_pars_fragment:up,clipping_planes_pars_vertex:dp,clipping_planes_vertex:fp,color_fragment:pp,color_pars_fragment:mp,color_pars_vertex:gp,color_vertex:_p,common:xp,cube_uv_reflection_fragment:vp,defaultnormal_vertex:yp,displacementmap_pars_vertex:Mp,displacementmap_vertex:bp,emissivemap_fragment:Sp,emissivemap_pars_fragment:Ep,colorspace_fragment:Tp,colorspace_pars_fragment:Ap,envmap_fragment:wp,envmap_common_pars_fragment:Pp,envmap_pars_fragment:Cp,envmap_pars_vertex:Rp,envmap_physical_pars_fragment:kp,envmap_vertex:Lp,fog_vertex:Ip,fog_pars_vertex:Dp,fog_fragment:Up,fog_pars_fragment:Np,gradientmap_pars_fragment:Fp,lightmap_pars_fragment:Op,lights_lambert_fragment:Bp,lights_lambert_pars_fragment:Vp,lights_pars_begin:zp,lights_toon_fragment:Hp,lights_toon_pars_fragment:Gp,lights_phong_fragment:Wp,lights_phong_pars_fragment:Xp,lights_physical_fragment:qp,lights_physical_pars_fragment:Yp,lights_fragment_begin:$p,lights_fragment_maps:Kp,lights_fragment_end:jp,logdepthbuf_fragment:Zp,logdepthbuf_pars_fragment:Jp,logdepthbuf_pars_vertex:Qp,logdepthbuf_vertex:em,map_fragment:tm,map_pars_fragment:nm,map_particle_fragment:im,map_particle_pars_fragment:sm,metalnessmap_fragment:rm,metalnessmap_pars_fragment:am,morphinstance_vertex:om,morphcolor_vertex:lm,morphnormal_vertex:cm,morphtarget_pars_vertex:hm,morphtarget_vertex:um,normal_fragment_begin:dm,normal_fragment_maps:fm,normal_pars_fragment:pm,normal_pars_vertex:mm,normal_vertex:gm,normalmap_pars_fragment:_m,clearcoat_normal_fragment_begin:xm,clearcoat_normal_fragment_maps:vm,clearcoat_pars_fragment:ym,iridescence_pars_fragment:Mm,opaque_fragment:bm,packing:Sm,premultiplied_alpha_fragment:Em,project_vertex:Tm,dithering_fragment:Am,dithering_pars_fragment:wm,roughnessmap_fragment:Pm,roughnessmap_pars_fragment:Cm,shadowmap_pars_fragment:Rm,shadowmap_pars_vertex:Lm,shadowmap_vertex:Im,shadowmask_pars_fragment:Dm,skinbase_vertex:Um,skinning_pars_vertex:Nm,skinning_vertex:Fm,skinnormal_vertex:Om,specularmap_fragment:Bm,specularmap_pars_fragment:Vm,tonemapping_fragment:zm,tonemapping_pars_fragment:km,transmission_fragment:Hm,transmission_pars_fragment:Gm,uv_pars_fragment:Wm,uv_pars_vertex:Xm,uv_vertex:qm,worldpos_vertex:Ym,background_vert:$m,background_frag:Km,backgroundCube_vert:jm,backgroundCube_frag:Zm,cube_vert:Jm,cube_frag:Qm,depth_vert:eg,depth_frag:tg,distanceRGBA_vert:ng,distanceRGBA_frag:ig,equirect_vert:sg,equirect_frag:rg,linedashed_vert:ag,linedashed_frag:og,meshbasic_vert:lg,meshbasic_frag:cg,meshlambert_vert:hg,meshlambert_frag:ug,meshmatcap_vert:dg,meshmatcap_frag:fg,meshnormal_vert:pg,meshnormal_frag:mg,meshphong_vert:gg,meshphong_frag:_g,meshphysical_vert:xg,meshphysical_frag:vg,meshtoon_vert:yg,meshtoon_frag:Mg,points_vert:bg,points_frag:Sg,shadow_vert:Eg,shadow_frag:Tg,sprite_vert:Ag,sprite_frag:wg},pe={common:{diffuse:{value:new Fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},envMapRotation:{value:new Ye},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new Fe(16777215)},opacity:{value:1},center:{value:new re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},gn={basic:{uniforms:Bt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:Ke.meshbasic_vert,fragmentShader:Ke.meshbasic_frag},lambert:{uniforms:Bt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Fe(0)}}]),vertexShader:Ke.meshlambert_vert,fragmentShader:Ke.meshlambert_frag},phong:{uniforms:Bt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Fe(0)},specular:{value:new Fe(1118481)},shininess:{value:30}}]),vertexShader:Ke.meshphong_vert,fragmentShader:Ke.meshphong_frag},standard:{uniforms:Bt([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new Fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag},toon:{uniforms:Bt([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new Fe(0)}}]),vertexShader:Ke.meshtoon_vert,fragmentShader:Ke.meshtoon_frag},matcap:{uniforms:Bt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:Ke.meshmatcap_vert,fragmentShader:Ke.meshmatcap_frag},points:{uniforms:Bt([pe.points,pe.fog]),vertexShader:Ke.points_vert,fragmentShader:Ke.points_frag},dashed:{uniforms:Bt([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ke.linedashed_vert,fragmentShader:Ke.linedashed_frag},depth:{uniforms:Bt([pe.common,pe.displacementmap]),vertexShader:Ke.depth_vert,fragmentShader:Ke.depth_frag},normal:{uniforms:Bt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:Ke.meshnormal_vert,fragmentShader:Ke.meshnormal_frag},sprite:{uniforms:Bt([pe.sprite,pe.fog]),vertexShader:Ke.sprite_vert,fragmentShader:Ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ke.background_vert,fragmentShader:Ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ye}},vertexShader:Ke.backgroundCube_vert,fragmentShader:Ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ke.cube_vert,fragmentShader:Ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ke.equirect_vert,fragmentShader:Ke.equirect_frag},distanceRGBA:{uniforms:Bt([pe.common,pe.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ke.distanceRGBA_vert,fragmentShader:Ke.distanceRGBA_frag},shadow:{uniforms:Bt([pe.lights,pe.fog,{color:{value:new Fe(0)},opacity:{value:1}}]),vertexShader:Ke.shadow_vert,fragmentShader:Ke.shadow_frag}};gn.physical={uniforms:Bt([gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new Fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new Fe(0)},specularColor:{value:new Fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag};const yr={r:0,b:0,g:0},ii=new rn,Pg=new rt;function Cg(i,e,t,n,s,r,a){const o=new Fe(0);let l=r===!0?0:1,c,d,u=null,f=0,p=null;function x(M){let y=M.isScene===!0?M.background:null;return y&&y.isTexture&&(y=(M.backgroundBlurriness>0?t:e).get(y)),y}function v(M){let y=!1;const I=x(M);I===null?m(o,l):I&&I.isColor&&(m(I,1),y=!0);const P=i.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,a):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(M,y){const I=x(y);I&&(I.isCubeTexture||I.mapping===Hr)?(d===void 0&&(d=new Ct(new Bs(1,1,1),new Yn({name:"BackgroundCubeMaterial",uniforms:ls(gn.backgroundCube.uniforms),vertexShader:gn.backgroundCube.vertexShader,fragmentShader:gn.backgroundCube.fragmentShader,side:Ht,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(P,R,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),ii.copy(y.backgroundRotation),ii.x*=-1,ii.y*=-1,ii.z*=-1,I.isCubeTexture&&I.isRenderTargetTexture===!1&&(ii.y*=-1,ii.z*=-1),d.material.uniforms.envMap.value=I,d.material.uniforms.flipEnvMap.value=I.isCubeTexture&&I.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(Pg.makeRotationFromEuler(ii)),d.material.toneMapped=et.getTransfer(I.colorSpace)!==ot,(u!==I||f!==I.version||p!==i.toneMapping)&&(d.material.needsUpdate=!0,u=I,f=I.version,p=i.toneMapping),d.layers.enableAll(),M.unshift(d,d.geometry,d.material,0,0,null)):I&&I.isTexture&&(c===void 0&&(c=new Ct(new Vs(2,2),new Yn({name:"BackgroundMaterial",uniforms:ls(gn.background.uniforms),vertexShader:gn.background.vertexShader,fragmentShader:gn.background.fragmentShader,side:nn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=I,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=et.getTransfer(I.colorSpace)!==ot,I.matrixAutoUpdate===!0&&I.updateMatrix(),c.material.uniforms.uvTransform.value.copy(I.matrix),(u!==I||f!==I.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,u=I,f=I.version,p=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function m(M,y){M.getRGB(yr,Sh(i)),n.buffers.color.setClear(yr.r,yr.g,yr.b,y,a)}function b(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,y=1){o.set(M),l=y,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,m(o,l)},render:v,addToRenderList:g,dispose:b}}function Rg(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,a=!1;function o(S,C,F,N,O){let $=!1;const G=u(N,F,C);r!==G&&(r=G,c(r.object)),$=p(S,N,F,O),$&&x(S,N,F,O),O!==null&&e.update(O,i.ELEMENT_ARRAY_BUFFER),($||a)&&(a=!1,y(S,C,F,N),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return i.createVertexArray()}function c(S){return i.bindVertexArray(S)}function d(S){return i.deleteVertexArray(S)}function u(S,C,F){const N=F.wireframe===!0;let O=n[S.id];O===void 0&&(O={},n[S.id]=O);let $=O[C.id];$===void 0&&($={},O[C.id]=$);let G=$[N];return G===void 0&&(G=f(l()),$[N]=G),G}function f(S){const C=[],F=[],N=[];for(let O=0;O<t;O++)C[O]=0,F[O]=0,N[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:F,attributeDivisors:N,object:S,attributes:{},index:null}}function p(S,C,F,N){const O=r.attributes,$=C.attributes;let G=0;const Q=F.getAttributes();for(const X in Q)if(Q[X].location>=0){const fe=O[X];let ve=$[X];if(ve===void 0&&(X==="instanceMatrix"&&S.instanceMatrix&&(ve=S.instanceMatrix),X==="instanceColor"&&S.instanceColor&&(ve=S.instanceColor)),fe===void 0||fe.attribute!==ve||ve&&fe.data!==ve.data)return!0;G++}return r.attributesNum!==G||r.index!==N}function x(S,C,F,N){const O={},$=C.attributes;let G=0;const Q=F.getAttributes();for(const X in Q)if(Q[X].location>=0){let fe=$[X];fe===void 0&&(X==="instanceMatrix"&&S.instanceMatrix&&(fe=S.instanceMatrix),X==="instanceColor"&&S.instanceColor&&(fe=S.instanceColor));const ve={};ve.attribute=fe,fe&&fe.data&&(ve.data=fe.data),O[X]=ve,G++}r.attributes=O,r.attributesNum=G,r.index=N}function v(){const S=r.newAttributes;for(let C=0,F=S.length;C<F;C++)S[C]=0}function g(S){m(S,0)}function m(S,C){const F=r.newAttributes,N=r.enabledAttributes,O=r.attributeDivisors;F[S]=1,N[S]===0&&(i.enableVertexAttribArray(S),N[S]=1),O[S]!==C&&(i.vertexAttribDivisor(S,C),O[S]=C)}function b(){const S=r.newAttributes,C=r.enabledAttributes;for(let F=0,N=C.length;F<N;F++)C[F]!==S[F]&&(i.disableVertexAttribArray(F),C[F]=0)}function M(S,C,F,N,O,$,G){G===!0?i.vertexAttribIPointer(S,C,F,O,$):i.vertexAttribPointer(S,C,F,N,O,$)}function y(S,C,F,N){v();const O=N.attributes,$=F.getAttributes(),G=C.defaultAttributeValues;for(const Q in $){const X=$[Q];if(X.location>=0){let le=O[Q];if(le===void 0&&(Q==="instanceMatrix"&&S.instanceMatrix&&(le=S.instanceMatrix),Q==="instanceColor"&&S.instanceColor&&(le=S.instanceColor)),le!==void 0){const fe=le.normalized,ve=le.itemSize,Ue=e.get(le);if(Ue===void 0)continue;const je=Ue.buffer,j=Ue.type,ce=Ue.bytesPerElement,ye=j===i.INT||j===i.UNSIGNED_INT||le.gpuType===Xo;if(le.isInterleavedBufferAttribute){const ue=le.data,Re=ue.stride,Xe=le.offset;if(ue.isInstancedInterleavedBuffer){for(let ge=0;ge<X.locationSize;ge++)m(X.location+ge,ue.meshPerAttribute);S.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let ge=0;ge<X.locationSize;ge++)g(X.location+ge);i.bindBuffer(i.ARRAY_BUFFER,je);for(let ge=0;ge<X.locationSize;ge++)M(X.location+ge,ve/X.locationSize,j,fe,Re*ce,(Xe+ve/X.locationSize*ge)*ce,ye)}else{if(le.isInstancedBufferAttribute){for(let ue=0;ue<X.locationSize;ue++)m(X.location+ue,le.meshPerAttribute);S.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let ue=0;ue<X.locationSize;ue++)g(X.location+ue);i.bindBuffer(i.ARRAY_BUFFER,je);for(let ue=0;ue<X.locationSize;ue++)M(X.location+ue,ve/X.locationSize,j,fe,ve*ce,ve/X.locationSize*ue*ce,ye)}}else if(G!==void 0){const fe=G[Q];if(fe!==void 0)switch(fe.length){case 2:i.vertexAttrib2fv(X.location,fe);break;case 3:i.vertexAttrib3fv(X.location,fe);break;case 4:i.vertexAttrib4fv(X.location,fe);break;default:i.vertexAttrib1fv(X.location,fe)}}}}b()}function I(){U();for(const S in n){const C=n[S];for(const F in C){const N=C[F];for(const O in N)d(N[O].object),delete N[O];delete C[F]}delete n[S]}}function P(S){if(n[S.id]===void 0)return;const C=n[S.id];for(const F in C){const N=C[F];for(const O in N)d(N[O].object),delete N[O];delete C[F]}delete n[S.id]}function R(S){for(const C in n){const F=n[C];if(F[S.id]===void 0)continue;const N=F[S.id];for(const O in N)d(N[O].object),delete N[O];delete F[S.id]}}function U(){T(),a=!0,r!==s&&(r=s,c(r.object))}function T(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:U,resetDefaultState:T,dispose:I,releaseStatesOfGeometry:P,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:g,disableUnusedAttributes:b}}function Lg(i,e,t){let n;function s(c){n=c}function r(c,d){i.drawArrays(n,c,d),t.update(d,n,1)}function a(c,d,u){u!==0&&(i.drawArraysInstanced(n,c,d,u),t.update(d,n,u))}function o(c,d,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,d,0,u);let p=0;for(let x=0;x<u;x++)p+=d[x];t.update(p,n,1)}function l(c,d,u,f){if(u===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let x=0;x<c.length;x++)a(c[x],d[x],f[x]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,d,0,f,0,u);let x=0;for(let v=0;v<u;v++)x+=d[v]*f[v];t.update(x,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Ig(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==wt&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const U=R===Ns&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Dn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==sn&&!U)}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const u=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),I=x>0,P=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:x,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:b,maxVaryings:M,maxFragmentUniforms:y,vertexTextures:I,maxSamples:P}}function Dg(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Cn,o=new Ye,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const p=u.length!==0||f||n!==0||s;return s=f,n=u.length,p},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=d(u,f,0)},this.setState=function(u,f,p){const x=u.clippingPlanes,v=u.clipIntersection,g=u.clipShadows,m=i.get(u);if(!s||x===null||x.length===0||r&&!g)r?d(null):c();else{const b=r?0:n,M=b*4;let y=m.clippingState||null;l.value=y,y=d(x,f,M,p);for(let I=0;I!==M;++I)y[I]=t[I];m.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(u,f,p,x){const v=u!==null?u.length:0;let g=null;if(v!==0){if(g=l.value,x!==!0||g===null){const m=p+v*4,b=f.matrixWorldInverse;o.getNormalMatrix(b),(g===null||g.length<m)&&(g=new Float32Array(m));for(let M=0,y=p;M!==v;++M,y+=4)a.copy(u[M]).applyMatrix4(b,o),a.normal.toArray(g,y),g[y+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}function Ug(i){let e=new WeakMap;function t(a,o){return o===Cs?a.mapping=is:o===ao&&(a.mapping=ss),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Cs||o===ao)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Gd(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const $i=4,gc=[.125,.215,.35,.446,.526,.582],pi=20,Ua=new qh,_c=new Fe;let Na=null,Fa=0,Oa=0,Ba=!1;const di=(1+Math.sqrt(5))/2,Hi=1/di,xc=[new A(-di,Hi,0),new A(di,Hi,0),new A(-Hi,0,di),new A(Hi,0,di),new A(0,di,-Hi),new A(0,di,Hi),new A(-1,1,-1),new A(1,1,-1),new A(-1,1,1),new A(1,1,1)],Ng=new A;class Vo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=Ng}=r;Na=this._renderer.getRenderTarget(),Fa=this._renderer.getActiveCubeFace(),Oa=this._renderer.getActiveMipmapLevel(),Ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Mc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=yc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Na,Fa,Oa),this._renderer.xr.enabled=Ba,e.scissorTest=!1,Mr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===is||e.mapping===ss?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Na=this._renderer.getRenderTarget(),Fa=this._renderer.getActiveCubeFace(),Oa=this._renderer.getActiveMipmapLevel(),Ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:xt,minFilter:xt,generateMipmaps:!1,type:Ns,format:wt,colorSpace:os,depthBuffer:!1},s=vc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=vc(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Fg(r)),this._blurMaterial=Og(r,e,t)}return s}_compileMaterial(e){const t=new Ct(this._lodPlanes[0],e);this._renderer.compile(t,Ua)}_sceneToCubeUV(e,t,n,s,r){const l=new en(90,1,t,n),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,p=u.toneMapping;u.getClearColor(_c),u.toneMapping=Xn,u.autoClear=!1;const x=new Wr({name:"PMREM.Background",side:Ht,depthWrite:!1,depthTest:!1}),v=new Ct(new Bs,x);let g=!1;const m=e.background;m?m.isColor&&(x.color.copy(m),e.background=null,g=!0):(x.color.copy(_c),g=!0);for(let b=0;b<6;b++){const M=b%3;M===0?(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+d[b],r.y,r.z)):M===1?(l.up.set(0,0,c[b]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+d[b],r.z)):(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+d[b]));const y=this._cubeSize;Mr(s,M*y,b>2?y:0,y,y),u.setRenderTarget(s),g&&u.render(v,l),u.render(e,l)}v.geometry.dispose(),v.material.dispose(),u.toneMapping=p,u.autoClear=f,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===is||e.mapping===ss;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Mc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=yc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Ct(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Mr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Ua)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=xc[(s-r-1)%xc.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,u=new Ct(this._lodPlanes[s],c),f=c.uniforms,p=this._sizeLods[n]-1,x=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*pi-1),v=r/x,g=isFinite(r)?1+Math.floor(d*v):pi;g>pi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${pi}`);const m=[];let b=0;for(let R=0;R<pi;++R){const U=R/v,T=Math.exp(-U*U/2);m.push(T),R===0?b+=T:R<g&&(b+=2*T)}for(let R=0;R<m.length;R++)m[R]=m[R]/b;f.envMap.value=e.texture,f.samples.value=g,f.weights.value=m,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:M}=this;f.dTheta.value=x,f.mipInt.value=M-n;const y=this._sizeLods[s],I=3*y*(s>M-$i?s-M+$i:0),P=4*(this._cubeSize-y);Mr(t,I,P,3*y,2*y),l.setRenderTarget(t),l.render(u,Ua)}}function Fg(i){const e=[],t=[],n=[];let s=i;const r=i-$i+1+gc.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-$i?l=gc[a-i+$i-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),d=-c,u=1+c,f=[d,d,u,d,u,u,d,d,u,u,d,u],p=6,x=6,v=3,g=2,m=1,b=new Float32Array(v*x*p),M=new Float32Array(g*x*p),y=new Float32Array(m*x*p);for(let P=0;P<p;P++){const R=P%3*2/3-1,U=P>2?0:-1,T=[R,U,0,R+2/3,U,0,R+2/3,U+1,0,R,U,0,R+2/3,U+1,0,R,U+1,0];b.set(T,v*x*P),M.set(f,g*x*P);const S=[P,P,P,P,P,P];y.set(S,m*x*P)}const I=new ht;I.setAttribute("position",new Nt(b,v)),I.setAttribute("uv",new Nt(M,g)),I.setAttribute("faceIndex",new Nt(y,m)),e.push(I),s>$i&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function vc(i,e,t){const n=new Mi(i,e,t);return n.texture.mapping=Hr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Mr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Og(i,e,t){const n=new Float32Array(pi),s=new A(0,1,0);return new Yn({name:"SphericalGaussianBlur",defines:{n:pi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:il(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function yc(){return new Yn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:il(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Mc(){return new Yn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:il(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function il(){return`

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
	`}function Bg(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Cs||l===ao,d=l===is||l===ss;if(c||d){let u=e.get(o);const f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new Vo(i)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const p=o.image;return c&&p&&p.height>0||d&&p&&s(p)?(t===null&&(t=new Vo(i)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Vg(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&ui("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function zg(i,e,t,n){const s={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const x in f.attributes)e.remove(f.attributes[x]);f.removeEventListener("dispose",a),delete s[f.id];const p=r.get(f);p&&(e.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function l(u){const f=u.attributes;for(const p in f)e.update(f[p],i.ARRAY_BUFFER)}function c(u){const f=[],p=u.index,x=u.attributes.position;let v=0;if(p!==null){const b=p.array;v=p.version;for(let M=0,y=b.length;M<y;M+=3){const I=b[M+0],P=b[M+1],R=b[M+2];f.push(I,P,P,R,R,I)}}else if(x!==void 0){const b=x.array;v=x.version;for(let M=0,y=b.length/3-1;M<y;M+=3){const I=M+0,P=M+1,R=M+2;f.push(I,P,P,R,R,I)}}else return;const g=new(xh(f)?bh:Mh)(f,1);g.version=v;const m=r.get(u);m&&e.remove(m),r.set(u,g)}function d(u){const f=r.get(u);if(f){const p=u.index;p!==null&&f.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:d}}function kg(i,e,t){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,p){i.drawElements(n,p,r,f*a),t.update(p,n,1)}function c(f,p,x){x!==0&&(i.drawElementsInstanced(n,p,r,f*a,x),t.update(p,n,x))}function d(f,p,x){if(x===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,f,0,x);let g=0;for(let m=0;m<x;m++)g+=p[m];t.update(g,n,1)}function u(f,p,x,v){if(x===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<f.length;m++)c(f[m]/a,p[m],v[m]);else{g.multiDrawElementsInstancedWEBGL(n,p,0,r,f,0,v,0,x);let m=0;for(let b=0;b<x;b++)m+=p[b]*v[b];t.update(m,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=u}function Hg(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Gg(i,e,t){const n=new WeakMap,s=new gt;function r(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0;let f=n.get(o);if(f===void 0||f.count!==u){let T=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",T)};f!==void 0&&f.texture.dispose();const p=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let M=0;p===!0&&(M=1),x===!0&&(M=2),v===!0&&(M=3);let y=o.attributes.position.count*M,I=1;y>e.maxTextureSize&&(I=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const P=new Float32Array(y*I*4*u),R=new vh(P,y,I,u);R.type=sn,R.needsUpdate=!0;const U=M*4;for(let S=0;S<u;S++){const C=g[S],F=m[S],N=b[S],O=y*I*4*S;for(let $=0;$<C.count;$++){const G=$*U;p===!0&&(s.fromBufferAttribute(C,$),P[O+G+0]=s.x,P[O+G+1]=s.y,P[O+G+2]=s.z,P[O+G+3]=0),x===!0&&(s.fromBufferAttribute(F,$),P[O+G+4]=s.x,P[O+G+5]=s.y,P[O+G+6]=s.z,P[O+G+7]=0),v===!0&&(s.fromBufferAttribute(N,$),P[O+G+8]=s.x,P[O+G+9]=s.y,P[O+G+10]=s.z,P[O+G+11]=N.itemSize===4?s.w:1)}}f={count:u,texture:R,size:new re(y,I)},n.set(o,f),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let v=0;v<c.length;v++)p+=c[v];const x=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",x),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Wg(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,d=l.geometry,u=e.get(l,d);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}const $h=new Rt,bc=new Ah(1,1),Kh=new vh,jh=new Ad,Zh=new Th,Sc=[],Ec=[],Tc=new Float32Array(16),Ac=new Float32Array(9),wc=new Float32Array(4);function hs(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Sc[s];if(r===void 0&&(r=new Float32Array(s),Sc[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Et(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Tt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function jr(i,e){let t=Ec[e];t===void 0&&(t=new Int32Array(e),Ec[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Xg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function qg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2fv(this.addr,e),Tt(t,e)}}function Yg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Et(t,e))return;i.uniform3fv(this.addr,e),Tt(t,e)}}function $g(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4fv(this.addr,e),Tt(t,e)}}function Kg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,n))return;wc.set(n),i.uniformMatrix2fv(this.addr,!1,wc),Tt(t,n)}}function jg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,n))return;Ac.set(n),i.uniformMatrix3fv(this.addr,!1,Ac),Tt(t,n)}}function Zg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,n))return;Tc.set(n),i.uniformMatrix4fv(this.addr,!1,Tc),Tt(t,n)}}function Jg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Qg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2iv(this.addr,e),Tt(t,e)}}function e_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;i.uniform3iv(this.addr,e),Tt(t,e)}}function t_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4iv(this.addr,e),Tt(t,e)}}function n_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function i_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2uiv(this.addr,e),Tt(t,e)}}function s_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;i.uniform3uiv(this.addr,e),Tt(t,e)}}function r_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4uiv(this.addr,e),Tt(t,e)}}function a_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(bc.compareFunction=_h,r=bc):r=$h,t.setTexture2D(e||r,s)}function o_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||jh,s)}function l_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Zh,s)}function c_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Kh,s)}function h_(i){switch(i){case 5126:return Xg;case 35664:return qg;case 35665:return Yg;case 35666:return $g;case 35674:return Kg;case 35675:return jg;case 35676:return Zg;case 5124:case 35670:return Jg;case 35667:case 35671:return Qg;case 35668:case 35672:return e_;case 35669:case 35673:return t_;case 5125:return n_;case 36294:return i_;case 36295:return s_;case 36296:return r_;case 35678:case 36198:case 36298:case 36306:case 35682:return a_;case 35679:case 36299:case 36307:return o_;case 35680:case 36300:case 36308:case 36293:return l_;case 36289:case 36303:case 36311:case 36292:return c_}}function u_(i,e){i.uniform1fv(this.addr,e)}function d_(i,e){const t=hs(e,this.size,2);i.uniform2fv(this.addr,t)}function f_(i,e){const t=hs(e,this.size,3);i.uniform3fv(this.addr,t)}function p_(i,e){const t=hs(e,this.size,4);i.uniform4fv(this.addr,t)}function m_(i,e){const t=hs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function g_(i,e){const t=hs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function __(i,e){const t=hs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function x_(i,e){i.uniform1iv(this.addr,e)}function v_(i,e){i.uniform2iv(this.addr,e)}function y_(i,e){i.uniform3iv(this.addr,e)}function M_(i,e){i.uniform4iv(this.addr,e)}function b_(i,e){i.uniform1uiv(this.addr,e)}function S_(i,e){i.uniform2uiv(this.addr,e)}function E_(i,e){i.uniform3uiv(this.addr,e)}function T_(i,e){i.uniform4uiv(this.addr,e)}function A_(i,e,t){const n=this.cache,s=e.length,r=jr(t,s);Et(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||$h,r[a])}function w_(i,e,t){const n=this.cache,s=e.length,r=jr(t,s);Et(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||jh,r[a])}function P_(i,e,t){const n=this.cache,s=e.length,r=jr(t,s);Et(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Zh,r[a])}function C_(i,e,t){const n=this.cache,s=e.length,r=jr(t,s);Et(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Kh,r[a])}function R_(i){switch(i){case 5126:return u_;case 35664:return d_;case 35665:return f_;case 35666:return p_;case 35674:return m_;case 35675:return g_;case 35676:return __;case 5124:case 35670:return x_;case 35667:case 35671:return v_;case 35668:case 35672:return y_;case 35669:case 35673:return M_;case 5125:return b_;case 36294:return S_;case 36295:return E_;case 36296:return T_;case 35678:case 36198:case 36298:case 36306:case 35682:return A_;case 35679:case 36299:case 36307:return w_;case 35680:case 36300:case 36308:case 36293:return P_;case 36289:case 36303:case 36311:case 36292:return C_}}class L_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=h_(t.type)}}class I_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=R_(t.type)}}class D_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Va=/(\w+)(\])?(\[|\.)?/g;function Pc(i,e){i.seq.push(e),i.map[e.id]=e}function U_(i,e,t){const n=i.name,s=n.length;for(Va.lastIndex=0;;){const r=Va.exec(n),a=Va.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Pc(t,c===void 0?new L_(o,i,e):new I_(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new D_(o),Pc(t,u)),t=u}}}class Dr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);U_(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Cc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const N_=37297;let F_=0;function O_(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Rc=new Ye;function B_(i){et._getMatrix(Rc,et.workingColorSpace,i);const e=`mat3( ${Rc.elements.map(t=>t.toFixed(4))} )`;switch(et.getTransfer(i)){case Ur:return[e,"LinearTransferOETF"];case ot:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Lc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+O_(i.getShaderSource(e),a)}else return s}function V_(i,e){const t=B_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function z_(i,e){let t;switch(e){case Bu:t="Linear";break;case Vu:t="Reinhard";break;case zu:t="Cineon";break;case ah:t="ACESFilmic";break;case Hu:t="AgX";break;case Gu:t="Neutral";break;case ku:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const br=new A;function k_(){et.getLuminanceCoefficients(br);const i=br.x.toFixed(4),e=br.y.toFixed(4),t=br.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function H_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(bs).join(`
`)}function G_(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function W_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function bs(i){return i!==""}function Ic(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Dc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const X_=/^[ \t]*#include +<([\w\d./]+)>/gm;function zo(i){return i.replace(X_,Y_)}const q_=new Map;function Y_(i,e){let t=Ke[e];if(t===void 0){const n=q_.get(e);if(n!==void 0)t=Ke[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return zo(t)}const $_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Uc(i){return i.replace($_,K_)}function K_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Nc(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function j_(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===sh?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===rh?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Pn&&(e="SHADOWMAP_TYPE_VSM"),e}function Z_(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case is:case ss:e="ENVMAP_TYPE_CUBE";break;case Hr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function J_(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ss:e="ENVMAP_MODE_REFRACTION";break}return e}function Q_(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case kr:e="ENVMAP_BLENDING_MULTIPLY";break;case Fu:e="ENVMAP_BLENDING_MIX";break;case Ou:e="ENVMAP_BLENDING_ADD";break}return e}function e0(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function t0(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=j_(t),c=Z_(t),d=J_(t),u=Q_(t),f=e0(t),p=H_(t),x=G_(r),v=s.createProgram();let g,m,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(bs).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(bs).join(`
`),m.length>0&&(m+=`
`)):(g=[Nc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(bs).join(`
`),m=[Nc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Xn?"#define TONE_MAPPING":"",t.toneMapping!==Xn?Ke.tonemapping_pars_fragment:"",t.toneMapping!==Xn?z_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ke.colorspace_pars_fragment,V_("linearToOutputTexel",t.outputColorSpace),k_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(bs).join(`
`)),a=zo(a),a=Ic(a,t),a=Dc(a,t),o=zo(o),o=Ic(o,t),o=Dc(o,t),a=Uc(a),o=Uc(o),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===wl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===wl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const M=b+g+a,y=b+m+o,I=Cc(s,s.VERTEX_SHADER,M),P=Cc(s,s.FRAGMENT_SHADER,y);s.attachShader(v,I),s.attachShader(v,P),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function R(C){if(i.debug.checkShaderErrors){const F=s.getProgramInfoLog(v).trim(),N=s.getShaderInfoLog(I).trim(),O=s.getShaderInfoLog(P).trim();let $=!0,G=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if($=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,I,P);else{const Q=Lc(s,I,"vertex"),X=Lc(s,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+F+`
`+Q+`
`+X)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(N===""||O==="")&&(G=!1);G&&(C.diagnostics={runnable:$,programLog:F,vertexShader:{log:N,prefix:g},fragmentShader:{log:O,prefix:m}})}s.deleteShader(I),s.deleteShader(P),U=new Dr(s,v),T=W_(s,v)}let U;this.getUniforms=function(){return U===void 0&&R(this),U};let T;this.getAttributes=function(){return T===void 0&&R(this),T};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(v,N_)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=F_++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=I,this.fragmentShader=P,this}let n0=0;class i0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new s0(e),t.set(e,n)),n}}class s0{constructor(e){this.id=n0++,this.code=e,this.usedTimes=0}}function r0(i,e,t,n,s,r,a){const o=new Qo,l=new i0,c=new Set,d=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let p=s.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(T){return c.add(T),T===0?"uv":`uv${T}`}function g(T,S,C,F,N){const O=F.fog,$=N.geometry,G=T.isMeshStandardMaterial?F.environment:null,Q=(T.isMeshStandardMaterial?t:e).get(T.envMap||G),X=Q&&Q.mapping===Hr?Q.image.height:null,le=x[T.type];T.precision!==null&&(p=s.getMaxPrecision(T.precision),p!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",p,"instead."));const fe=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,ve=fe!==void 0?fe.length:0;let Ue=0;$.morphAttributes.position!==void 0&&(Ue=1),$.morphAttributes.normal!==void 0&&(Ue=2),$.morphAttributes.color!==void 0&&(Ue=3);let je,j,ce,ye;if(le){const at=gn[le];je=at.vertexShader,j=at.fragmentShader}else je=T.vertexShader,j=T.fragmentShader,l.update(T),ce=l.getVertexShaderID(T),ye=l.getFragmentShaderID(T);const ue=i.getRenderTarget(),Re=i.state.buffers.depth.getReversed(),Xe=N.isInstancedMesh===!0,ge=N.isBatchedMesh===!0,He=!!T.map,ne=!!T.matcap,te=!!Q,D=!!T.aoMap,Le=!!T.lightMap,ae=!!T.bumpMap,Ee=!!T.normalMap,de=!!T.displacementMap,Oe=!!T.emissiveMap,Me=!!T.metalnessMap,L=!!T.roughnessMap,E=T.anisotropy>0,W=T.clearcoat>0,Z=T.dispersion>0,ie=T.iridescence>0,J=T.sheen>0,Ie=T.transmission>0,me=E&&!!T.anisotropyMap,Te=W&&!!T.clearcoatMap,Ze=W&&!!T.clearcoatNormalMap,he=W&&!!T.clearcoatRoughnessMap,we=ie&&!!T.iridescenceMap,Be=ie&&!!T.iridescenceThicknessMap,Ve=J&&!!T.sheenColorMap,Pe=J&&!!T.sheenRoughnessMap,Je=!!T.specularMap,$e=!!T.specularColorMap,ct=!!T.specularIntensityMap,B=Ie&&!!T.transmissionMap,_e=Ie&&!!T.thicknessMap,K=!!T.gradientMap,ee=!!T.alphaMap,Se=T.alphaTest>0,be=!!T.alphaHash,qe=!!T.extensions;let pt=Xn;T.toneMapped&&(ue===null||ue.isXRRenderTarget===!0)&&(pt=i.toneMapping);const Lt={shaderID:le,shaderType:T.type,shaderName:T.name,vertexShader:je,fragmentShader:j,defines:T.defines,customVertexShaderID:ce,customFragmentShaderID:ye,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:p,batching:ge,batchingColor:ge&&N._colorsTexture!==null,instancing:Xe,instancingColor:Xe&&N.instanceColor!==null,instancingMorph:Xe&&N.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ue===null?i.outputColorSpace:ue.isXRRenderTarget===!0?ue.texture.colorSpace:os,alphaToCoverage:!!T.alphaToCoverage,map:He,matcap:ne,envMap:te,envMapMode:te&&Q.mapping,envMapCubeUVHeight:X,aoMap:D,lightMap:Le,bumpMap:ae,normalMap:Ee,displacementMap:f&&de,emissiveMap:Oe,normalMapObjectSpace:Ee&&T.normalMapType===Yu,normalMapTangentSpace:Ee&&T.normalMapType===Fs,metalnessMap:Me,roughnessMap:L,anisotropy:E,anisotropyMap:me,clearcoat:W,clearcoatMap:Te,clearcoatNormalMap:Ze,clearcoatRoughnessMap:he,dispersion:Z,iridescence:ie,iridescenceMap:we,iridescenceThicknessMap:Be,sheen:J,sheenColorMap:Ve,sheenRoughnessMap:Pe,specularMap:Je,specularColorMap:$e,specularIntensityMap:ct,transmission:Ie,transmissionMap:B,thicknessMap:_e,gradientMap:K,opaque:T.transparent===!1&&T.blending===ji&&T.alphaToCoverage===!1,alphaMap:ee,alphaTest:Se,alphaHash:be,combine:T.combine,mapUv:He&&v(T.map.channel),aoMapUv:D&&v(T.aoMap.channel),lightMapUv:Le&&v(T.lightMap.channel),bumpMapUv:ae&&v(T.bumpMap.channel),normalMapUv:Ee&&v(T.normalMap.channel),displacementMapUv:de&&v(T.displacementMap.channel),emissiveMapUv:Oe&&v(T.emissiveMap.channel),metalnessMapUv:Me&&v(T.metalnessMap.channel),roughnessMapUv:L&&v(T.roughnessMap.channel),anisotropyMapUv:me&&v(T.anisotropyMap.channel),clearcoatMapUv:Te&&v(T.clearcoatMap.channel),clearcoatNormalMapUv:Ze&&v(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:he&&v(T.clearcoatRoughnessMap.channel),iridescenceMapUv:we&&v(T.iridescenceMap.channel),iridescenceThicknessMapUv:Be&&v(T.iridescenceThicknessMap.channel),sheenColorMapUv:Ve&&v(T.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&v(T.sheenRoughnessMap.channel),specularMapUv:Je&&v(T.specularMap.channel),specularColorMapUv:$e&&v(T.specularColorMap.channel),specularIntensityMapUv:ct&&v(T.specularIntensityMap.channel),transmissionMapUv:B&&v(T.transmissionMap.channel),thicknessMapUv:_e&&v(T.thicknessMap.channel),alphaMapUv:ee&&v(T.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(Ee||E),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!$.attributes.uv&&(He||ee),fog:!!O,useFog:T.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:T.flatShading===!0,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Re,skinning:N.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:ve,morphTextureStride:Ue,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:T.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:pt,decodeVideoTexture:He&&T.map.isVideoTexture===!0&&et.getTransfer(T.map.colorSpace)===ot,decodeVideoTextureEmissive:Oe&&T.emissiveMap.isVideoTexture===!0&&et.getTransfer(T.emissiveMap.colorSpace)===ot,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===$t,flipSided:T.side===Ht,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:qe&&T.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(qe&&T.extensions.multiDraw===!0||ge)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return Lt.vertexUv1s=c.has(1),Lt.vertexUv2s=c.has(2),Lt.vertexUv3s=c.has(3),c.clear(),Lt}function m(T){const S=[];if(T.shaderID?S.push(T.shaderID):(S.push(T.customVertexShaderID),S.push(T.customFragmentShaderID)),T.defines!==void 0)for(const C in T.defines)S.push(C),S.push(T.defines[C]);return T.isRawShaderMaterial===!1&&(b(S,T),M(S,T),S.push(i.outputColorSpace)),S.push(T.customProgramCacheKey),S.join()}function b(T,S){T.push(S.precision),T.push(S.outputColorSpace),T.push(S.envMapMode),T.push(S.envMapCubeUVHeight),T.push(S.mapUv),T.push(S.alphaMapUv),T.push(S.lightMapUv),T.push(S.aoMapUv),T.push(S.bumpMapUv),T.push(S.normalMapUv),T.push(S.displacementMapUv),T.push(S.emissiveMapUv),T.push(S.metalnessMapUv),T.push(S.roughnessMapUv),T.push(S.anisotropyMapUv),T.push(S.clearcoatMapUv),T.push(S.clearcoatNormalMapUv),T.push(S.clearcoatRoughnessMapUv),T.push(S.iridescenceMapUv),T.push(S.iridescenceThicknessMapUv),T.push(S.sheenColorMapUv),T.push(S.sheenRoughnessMapUv),T.push(S.specularMapUv),T.push(S.specularColorMapUv),T.push(S.specularIntensityMapUv),T.push(S.transmissionMapUv),T.push(S.thicknessMapUv),T.push(S.combine),T.push(S.fogExp2),T.push(S.sizeAttenuation),T.push(S.morphTargetsCount),T.push(S.morphAttributeCount),T.push(S.numDirLights),T.push(S.numPointLights),T.push(S.numSpotLights),T.push(S.numSpotLightMaps),T.push(S.numHemiLights),T.push(S.numRectAreaLights),T.push(S.numDirLightShadows),T.push(S.numPointLightShadows),T.push(S.numSpotLightShadows),T.push(S.numSpotLightShadowsWithMaps),T.push(S.numLightProbes),T.push(S.shadowMapType),T.push(S.toneMapping),T.push(S.numClippingPlanes),T.push(S.numClipIntersection),T.push(S.depthPacking)}function M(T,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),T.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reverseDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),T.push(o.mask)}function y(T){const S=x[T.type];let C;if(S){const F=gn[S];C=Vd.clone(F.uniforms)}else C=T.uniforms;return C}function I(T,S){let C;for(let F=0,N=d.length;F<N;F++){const O=d[F];if(O.cacheKey===S){C=O,++C.usedTimes;break}}return C===void 0&&(C=new t0(i,S,T,r),d.push(C)),C}function P(T){if(--T.usedTimes===0){const S=d.indexOf(T);d[S]=d[d.length-1],d.pop(),T.destroy()}}function R(T){l.remove(T)}function U(){l.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:y,acquireProgram:I,releaseProgram:P,releaseShaderCache:R,programs:d,dispose:U}}function a0(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function o0(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Fc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Oc(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u,f,p,x,v,g){let m=i[e];return m===void 0?(m={id:u.id,object:u,geometry:f,material:p,groupOrder:x,renderOrder:u.renderOrder,z:v,group:g},i[e]=m):(m.id=u.id,m.object=u,m.geometry=f,m.material=p,m.groupOrder=x,m.renderOrder=u.renderOrder,m.z=v,m.group=g),e++,m}function o(u,f,p,x,v,g){const m=a(u,f,p,x,v,g);p.transmission>0?n.push(m):p.transparent===!0?s.push(m):t.push(m)}function l(u,f,p,x,v,g){const m=a(u,f,p,x,v,g);p.transmission>0?n.unshift(m):p.transparent===!0?s.unshift(m):t.unshift(m)}function c(u,f){t.length>1&&t.sort(u||o0),n.length>1&&n.sort(f||Fc),s.length>1&&s.sort(f||Fc)}function d(){for(let u=e,f=i.length;u<f;u++){const p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:d,sort:c}}function l0(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Oc,i.set(n,[a])):s>=r.length?(a=new Oc,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function c0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new A,color:new Fe};break;case"SpotLight":t={position:new A,direction:new A,color:new Fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new A,color:new Fe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new A,skyColor:new Fe,groundColor:new Fe};break;case"RectAreaLight":t={color:new Fe,position:new A,halfWidth:new A,halfHeight:new A};break}return i[e.id]=t,t}}}function h0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let u0=0;function d0(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function f0(i){const e=new c0,t=h0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new A);const s=new A,r=new rt,a=new rt;function o(c){let d=0,u=0,f=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let p=0,x=0,v=0,g=0,m=0,b=0,M=0,y=0,I=0,P=0,R=0;c.sort(d0);for(let T=0,S=c.length;T<S;T++){const C=c[T],F=C.color,N=C.intensity,O=C.distance,$=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)d+=F.r*N,u+=F.g*N,f+=F.b*N;else if(C.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(C.sh.coefficients[G],N);R++}else if(C.isDirectionalLight){const G=e.get(C);if(G.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const Q=C.shadow,X=t.get(C);X.shadowIntensity=Q.intensity,X.shadowBias=Q.bias,X.shadowNormalBias=Q.normalBias,X.shadowRadius=Q.radius,X.shadowMapSize=Q.mapSize,n.directionalShadow[p]=X,n.directionalShadowMap[p]=$,n.directionalShadowMatrix[p]=C.shadow.matrix,b++}n.directional[p]=G,p++}else if(C.isSpotLight){const G=e.get(C);G.position.setFromMatrixPosition(C.matrixWorld),G.color.copy(F).multiplyScalar(N),G.distance=O,G.coneCos=Math.cos(C.angle),G.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),G.decay=C.decay,n.spot[v]=G;const Q=C.shadow;if(C.map&&(n.spotLightMap[I]=C.map,I++,Q.updateMatrices(C),C.castShadow&&P++),n.spotLightMatrix[v]=Q.matrix,C.castShadow){const X=t.get(C);X.shadowIntensity=Q.intensity,X.shadowBias=Q.bias,X.shadowNormalBias=Q.normalBias,X.shadowRadius=Q.radius,X.shadowMapSize=Q.mapSize,n.spotShadow[v]=X,n.spotShadowMap[v]=$,y++}v++}else if(C.isRectAreaLight){const G=e.get(C);G.color.copy(F).multiplyScalar(N),G.halfWidth.set(C.width*.5,0,0),G.halfHeight.set(0,C.height*.5,0),n.rectArea[g]=G,g++}else if(C.isPointLight){const G=e.get(C);if(G.color.copy(C.color).multiplyScalar(C.intensity),G.distance=C.distance,G.decay=C.decay,C.castShadow){const Q=C.shadow,X=t.get(C);X.shadowIntensity=Q.intensity,X.shadowBias=Q.bias,X.shadowNormalBias=Q.normalBias,X.shadowRadius=Q.radius,X.shadowMapSize=Q.mapSize,X.shadowCameraNear=Q.camera.near,X.shadowCameraFar=Q.camera.far,n.pointShadow[x]=X,n.pointShadowMap[x]=$,n.pointShadowMatrix[x]=C.shadow.matrix,M++}n.point[x]=G,x++}else if(C.isHemisphereLight){const G=e.get(C);G.skyColor.copy(C.color).multiplyScalar(N),G.groundColor.copy(C.groundColor).multiplyScalar(N),n.hemi[m]=G,m++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pe.LTC_FLOAT_1,n.rectAreaLTC2=pe.LTC_FLOAT_2):(n.rectAreaLTC1=pe.LTC_HALF_1,n.rectAreaLTC2=pe.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=u,n.ambient[2]=f;const U=n.hash;(U.directionalLength!==p||U.pointLength!==x||U.spotLength!==v||U.rectAreaLength!==g||U.hemiLength!==m||U.numDirectionalShadows!==b||U.numPointShadows!==M||U.numSpotShadows!==y||U.numSpotMaps!==I||U.numLightProbes!==R)&&(n.directional.length=p,n.spot.length=v,n.rectArea.length=g,n.point.length=x,n.hemi.length=m,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=y+I-P,n.spotLightMap.length=I,n.numSpotLightShadowsWithMaps=P,n.numLightProbes=R,U.directionalLength=p,U.pointLength=x,U.spotLength=v,U.rectAreaLength=g,U.hemiLength=m,U.numDirectionalShadows=b,U.numPointShadows=M,U.numSpotShadows=y,U.numSpotMaps=I,U.numLightProbes=R,n.version=u0++)}function l(c,d){let u=0,f=0,p=0,x=0,v=0;const g=d.matrixWorldInverse;for(let m=0,b=c.length;m<b;m++){const M=c[m];if(M.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(g),u++}else if(M.isSpotLight){const y=n.spot[p];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(g),p++}else if(M.isRectAreaLight){const y=n.rectArea[x];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(g),a.identity(),r.copy(M.matrixWorld),r.premultiply(g),a.extractRotation(r),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),x++}else if(M.isPointLight){const y=n.point[f];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(g),f++}else if(M.isHemisphereLight){const y=n.hemi[v];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(g),v++}}}return{setup:o,setupView:l,state:n}}function Bc(i){const e=new f0(i),t=[],n=[];function s(d){c.camera=d,t.length=0,n.length=0}function r(d){t.push(d)}function a(d){n.push(d)}function o(){e.setup(t)}function l(d){e.setupView(t,d)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function p0(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Bc(i),e.set(s,[o])):r>=a.length?(o=new Bc(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const m0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,g0=`uniform sampler2D shadow_pass;
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
}`;function _0(i,e,t){let n=new Xr;const s=new re,r=new re,a=new gt,o=new Of({depthPacking:qu}),l=new Bf,c={},d=t.maxTextureSize,u={[nn]:Ht,[Ht]:nn,[$t]:$t},f=new Yn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new re},radius:{value:4}},vertexShader:m0,fragmentShader:g0}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const x=new ht;x.setAttribute("position",new Nt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ct(x,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=sh;let m=this.type;this.render=function(P,R,U){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||P.length===0)return;const T=i.getRenderTarget(),S=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),F=i.state;F.setBlending(Wn),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const N=m!==Pn&&this.type===Pn,O=m===Pn&&this.type!==Pn;for(let $=0,G=P.length;$<G;$++){const Q=P[$],X=Q.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);const le=X.getFrameExtents();if(s.multiply(le),r.copy(X.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/le.x),s.x=r.x*le.x,X.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/le.y),s.y=r.y*le.y,X.mapSize.y=r.y)),X.map===null||N===!0||O===!0){const ve=this.type!==Pn?{minFilter:Kt,magFilter:Kt}:{};X.map!==null&&X.map.dispose(),X.map=new Mi(s.x,s.y,ve),X.map.texture.name=Q.name+".shadowMap",X.camera.updateProjectionMatrix()}i.setRenderTarget(X.map),i.clear();const fe=X.getViewportCount();for(let ve=0;ve<fe;ve++){const Ue=X.getViewport(ve);a.set(r.x*Ue.x,r.y*Ue.y,r.x*Ue.z,r.y*Ue.w),F.viewport(a),X.updateMatrices(Q,ve),n=X.getFrustum(),y(R,U,X.camera,Q,this.type)}X.isPointLightShadow!==!0&&this.type===Pn&&b(X,U),X.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(T,S,C)};function b(P,R){const U=e.update(v);f.defines.VSM_SAMPLES!==P.blurSamples&&(f.defines.VSM_SAMPLES=P.blurSamples,p.defines.VSM_SAMPLES=P.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new Mi(s.x,s.y)),f.uniforms.shadow_pass.value=P.map.texture,f.uniforms.resolution.value=P.mapSize,f.uniforms.radius.value=P.radius,i.setRenderTarget(P.mapPass),i.clear(),i.renderBufferDirect(R,null,U,f,v,null),p.uniforms.shadow_pass.value=P.mapPass.texture,p.uniforms.resolution.value=P.mapSize,p.uniforms.radius.value=P.radius,i.setRenderTarget(P.map),i.clear(),i.renderBufferDirect(R,null,U,p,v,null)}function M(P,R,U,T){let S=null;const C=U.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(C!==void 0)S=C;else if(S=U.isPointLight===!0?l:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const F=S.uuid,N=R.uuid;let O=c[F];O===void 0&&(O={},c[F]=O);let $=O[N];$===void 0&&($=S.clone(),O[N]=$,R.addEventListener("dispose",I)),S=$}if(S.visible=R.visible,S.wireframe=R.wireframe,T===Pn?S.side=R.shadowSide!==null?R.shadowSide:R.side:S.side=R.shadowSide!==null?R.shadowSide:u[R.side],S.alphaMap=R.alphaMap,S.alphaTest=R.alphaTest,S.map=R.map,S.clipShadows=R.clipShadows,S.clippingPlanes=R.clippingPlanes,S.clipIntersection=R.clipIntersection,S.displacementMap=R.displacementMap,S.displacementScale=R.displacementScale,S.displacementBias=R.displacementBias,S.wireframeLinewidth=R.wireframeLinewidth,S.linewidth=R.linewidth,U.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const F=i.properties.get(S);F.light=U}return S}function y(P,R,U,T,S){if(P.visible===!1)return;if(P.layers.test(R.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&S===Pn)&&(!P.frustumCulled||n.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,P.matrixWorld);const N=e.update(P),O=P.material;if(Array.isArray(O)){const $=N.groups;for(let G=0,Q=$.length;G<Q;G++){const X=$[G],le=O[X.materialIndex];if(le&&le.visible){const fe=M(P,le,T,S);P.onBeforeShadow(i,P,R,U,N,fe,X),i.renderBufferDirect(U,null,N,fe,P,X),P.onAfterShadow(i,P,R,U,N,fe,X)}}}else if(O.visible){const $=M(P,O,T,S);P.onBeforeShadow(i,P,R,U,N,$,null),i.renderBufferDirect(U,null,N,$,P,null),P.onAfterShadow(i,P,R,U,N,$,null)}}const F=P.children;for(let N=0,O=F.length;N<O;N++)y(F[N],R,U,T,S)}function I(P){P.target.removeEventListener("dispose",I);for(const U in c){const T=c[U],S=P.target.uuid;S in T&&(T[S].dispose(),delete T[S])}}}const x0={[Qa]:eo,[to]:so,[no]:ro,[ns]:io,[eo]:Qa,[so]:to,[ro]:no,[io]:ns};function v0(i,e){function t(){let B=!1;const _e=new gt;let K=null;const ee=new gt(0,0,0,0);return{setMask:function(Se){K!==Se&&!B&&(i.colorMask(Se,Se,Se,Se),K=Se)},setLocked:function(Se){B=Se},setClear:function(Se,be,qe,pt,Lt){Lt===!0&&(Se*=pt,be*=pt,qe*=pt),_e.set(Se,be,qe,pt),ee.equals(_e)===!1&&(i.clearColor(Se,be,qe,pt),ee.copy(_e))},reset:function(){B=!1,K=null,ee.set(-1,0,0,0)}}}function n(){let B=!1,_e=!1,K=null,ee=null,Se=null;return{setReversed:function(be){if(_e!==be){const qe=e.get("EXT_clip_control");_e?qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.ZERO_TO_ONE_EXT):qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.NEGATIVE_ONE_TO_ONE_EXT);const pt=Se;Se=null,this.setClear(pt)}_e=be},getReversed:function(){return _e},setTest:function(be){be?ue(i.DEPTH_TEST):Re(i.DEPTH_TEST)},setMask:function(be){K!==be&&!B&&(i.depthMask(be),K=be)},setFunc:function(be){if(_e&&(be=x0[be]),ee!==be){switch(be){case Qa:i.depthFunc(i.NEVER);break;case eo:i.depthFunc(i.ALWAYS);break;case to:i.depthFunc(i.LESS);break;case ns:i.depthFunc(i.LEQUAL);break;case no:i.depthFunc(i.EQUAL);break;case io:i.depthFunc(i.GEQUAL);break;case so:i.depthFunc(i.GREATER);break;case ro:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ee=be}},setLocked:function(be){B=be},setClear:function(be){Se!==be&&(_e&&(be=1-be),i.clearDepth(be),Se=be)},reset:function(){B=!1,K=null,ee=null,Se=null,_e=!1}}}function s(){let B=!1,_e=null,K=null,ee=null,Se=null,be=null,qe=null,pt=null,Lt=null;return{setTest:function(at){B||(at?ue(i.STENCIL_TEST):Re(i.STENCIL_TEST))},setMask:function(at){_e!==at&&!B&&(i.stencilMask(at),_e=at)},setFunc:function(at,on,Mn){(K!==at||ee!==on||Se!==Mn)&&(i.stencilFunc(at,on,Mn),K=at,ee=on,Se=Mn)},setOp:function(at,on,Mn){(be!==at||qe!==on||pt!==Mn)&&(i.stencilOp(at,on,Mn),be=at,qe=on,pt=Mn)},setLocked:function(at){B=at},setClear:function(at){Lt!==at&&(i.clearStencil(at),Lt=at)},reset:function(){B=!1,_e=null,K=null,ee=null,Se=null,be=null,qe=null,pt=null,Lt=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let d={},u={},f=new WeakMap,p=[],x=null,v=!1,g=null,m=null,b=null,M=null,y=null,I=null,P=null,R=new Fe(0,0,0),U=0,T=!1,S=null,C=null,F=null,N=null,O=null;const $=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,Q=0;const X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(X)[1]),G=Q>=1):X.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),G=Q>=2);let le=null,fe={};const ve=i.getParameter(i.SCISSOR_BOX),Ue=i.getParameter(i.VIEWPORT),je=new gt().fromArray(ve),j=new gt().fromArray(Ue);function ce(B,_e,K,ee){const Se=new Uint8Array(4),be=i.createTexture();i.bindTexture(B,be),i.texParameteri(B,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(B,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let qe=0;qe<K;qe++)B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY?i.texImage3D(_e,0,i.RGBA,1,1,ee,0,i.RGBA,i.UNSIGNED_BYTE,Se):i.texImage2D(_e+qe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Se);return be}const ye={};ye[i.TEXTURE_2D]=ce(i.TEXTURE_2D,i.TEXTURE_2D,1),ye[i.TEXTURE_CUBE_MAP]=ce(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ye[i.TEXTURE_2D_ARRAY]=ce(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ye[i.TEXTURE_3D]=ce(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ue(i.DEPTH_TEST),a.setFunc(ns),ae(!1),Ee(Ml),ue(i.CULL_FACE),D(Wn);function ue(B){d[B]!==!0&&(i.enable(B),d[B]=!0)}function Re(B){d[B]!==!1&&(i.disable(B),d[B]=!1)}function Xe(B,_e){return u[B]!==_e?(i.bindFramebuffer(B,_e),u[B]=_e,B===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=_e),B===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=_e),!0):!1}function ge(B,_e){let K=p,ee=!1;if(B){K=f.get(_e),K===void 0&&(K=[],f.set(_e,K));const Se=B.textures;if(K.length!==Se.length||K[0]!==i.COLOR_ATTACHMENT0){for(let be=0,qe=Se.length;be<qe;be++)K[be]=i.COLOR_ATTACHMENT0+be;K.length=Se.length,ee=!0}}else K[0]!==i.BACK&&(K[0]=i.BACK,ee=!0);ee&&i.drawBuffers(K)}function He(B){return x!==B?(i.useProgram(B),x=B,!0):!1}const ne={[fi]:i.FUNC_ADD,[vu]:i.FUNC_SUBTRACT,[yu]:i.FUNC_REVERSE_SUBTRACT};ne[Mu]=i.MIN,ne[bu]=i.MAX;const te={[Su]:i.ZERO,[Eu]:i.ONE,[Tu]:i.SRC_COLOR,[Za]:i.SRC_ALPHA,[Lu]:i.SRC_ALPHA_SATURATE,[Cu]:i.DST_COLOR,[wu]:i.DST_ALPHA,[Au]:i.ONE_MINUS_SRC_COLOR,[Ja]:i.ONE_MINUS_SRC_ALPHA,[Ru]:i.ONE_MINUS_DST_COLOR,[Pu]:i.ONE_MINUS_DST_ALPHA,[Iu]:i.CONSTANT_COLOR,[Du]:i.ONE_MINUS_CONSTANT_COLOR,[Uu]:i.CONSTANT_ALPHA,[Nu]:i.ONE_MINUS_CONSTANT_ALPHA};function D(B,_e,K,ee,Se,be,qe,pt,Lt,at){if(B===Wn){v===!0&&(Re(i.BLEND),v=!1);return}if(v===!1&&(ue(i.BLEND),v=!0),B!==xu){if(B!==g||at!==T){if((m!==fi||y!==fi)&&(i.blendEquation(i.FUNC_ADD),m=fi,y=fi),at)switch(B){case ji:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case bl:i.blendFunc(i.ONE,i.ONE);break;case Sl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case El:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case ji:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case bl:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Sl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case El:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}b=null,M=null,I=null,P=null,R.set(0,0,0),U=0,g=B,T=at}return}Se=Se||_e,be=be||K,qe=qe||ee,(_e!==m||Se!==y)&&(i.blendEquationSeparate(ne[_e],ne[Se]),m=_e,y=Se),(K!==b||ee!==M||be!==I||qe!==P)&&(i.blendFuncSeparate(te[K],te[ee],te[be],te[qe]),b=K,M=ee,I=be,P=qe),(pt.equals(R)===!1||Lt!==U)&&(i.blendColor(pt.r,pt.g,pt.b,Lt),R.copy(pt),U=Lt),g=B,T=!1}function Le(B,_e){B.side===$t?Re(i.CULL_FACE):ue(i.CULL_FACE);let K=B.side===Ht;_e&&(K=!K),ae(K),B.blending===ji&&B.transparent===!1?D(Wn):D(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),a.setFunc(B.depthFunc),a.setTest(B.depthTest),a.setMask(B.depthWrite),r.setMask(B.colorWrite);const ee=B.stencilWrite;o.setTest(ee),ee&&(o.setMask(B.stencilWriteMask),o.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),o.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),Oe(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?ue(i.SAMPLE_ALPHA_TO_COVERAGE):Re(i.SAMPLE_ALPHA_TO_COVERAGE)}function ae(B){S!==B&&(B?i.frontFace(i.CW):i.frontFace(i.CCW),S=B)}function Ee(B){B!==gu?(ue(i.CULL_FACE),B!==C&&(B===Ml?i.cullFace(i.BACK):B===_u?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Re(i.CULL_FACE),C=B}function de(B){B!==F&&(G&&i.lineWidth(B),F=B)}function Oe(B,_e,K){B?(ue(i.POLYGON_OFFSET_FILL),(N!==_e||O!==K)&&(i.polygonOffset(_e,K),N=_e,O=K)):Re(i.POLYGON_OFFSET_FILL)}function Me(B){B?ue(i.SCISSOR_TEST):Re(i.SCISSOR_TEST)}function L(B){B===void 0&&(B=i.TEXTURE0+$-1),le!==B&&(i.activeTexture(B),le=B)}function E(B,_e,K){K===void 0&&(le===null?K=i.TEXTURE0+$-1:K=le);let ee=fe[K];ee===void 0&&(ee={type:void 0,texture:void 0},fe[K]=ee),(ee.type!==B||ee.texture!==_e)&&(le!==K&&(i.activeTexture(K),le=K),i.bindTexture(B,_e||ye[B]),ee.type=B,ee.texture=_e)}function W(){const B=fe[le];B!==void 0&&B.type!==void 0&&(i.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function Z(){try{i.compressedTexImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ie(){try{i.compressedTexImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function J(){try{i.texSubImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ie(){try{i.texSubImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function me(){try{i.compressedTexSubImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Te(){try{i.compressedTexSubImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ze(){try{i.texStorage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function he(){try{i.texStorage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function we(){try{i.texImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Be(){try{i.texImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ve(B){je.equals(B)===!1&&(i.scissor(B.x,B.y,B.z,B.w),je.copy(B))}function Pe(B){j.equals(B)===!1&&(i.viewport(B.x,B.y,B.z,B.w),j.copy(B))}function Je(B,_e){let K=c.get(_e);K===void 0&&(K=new WeakMap,c.set(_e,K));let ee=K.get(B);ee===void 0&&(ee=i.getUniformBlockIndex(_e,B.name),K.set(B,ee))}function $e(B,_e){const ee=c.get(_e).get(B);l.get(_e)!==ee&&(i.uniformBlockBinding(_e,ee,B.__bindingPointIndex),l.set(_e,ee))}function ct(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},le=null,fe={},u={},f=new WeakMap,p=[],x=null,v=!1,g=null,m=null,b=null,M=null,y=null,I=null,P=null,R=new Fe(0,0,0),U=0,T=!1,S=null,C=null,F=null,N=null,O=null,je.set(0,0,i.canvas.width,i.canvas.height),j.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ue,disable:Re,bindFramebuffer:Xe,drawBuffers:ge,useProgram:He,setBlending:D,setMaterial:Le,setFlipSided:ae,setCullFace:Ee,setLineWidth:de,setPolygonOffset:Oe,setScissorTest:Me,activeTexture:L,bindTexture:E,unbindTexture:W,compressedTexImage2D:Z,compressedTexImage3D:ie,texImage2D:we,texImage3D:Be,updateUBOMapping:Je,uniformBlockBinding:$e,texStorage2D:Ze,texStorage3D:he,texSubImage2D:J,texSubImage3D:Ie,compressedTexSubImage2D:me,compressedTexSubImage3D:Te,scissor:Ve,viewport:Pe,reset:ct}}function y0(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new re,d=new WeakMap;let u;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(L,E){return p?new OffscreenCanvas(L,E):Fr("canvas")}function v(L,E,W){let Z=1;const ie=Me(L);if((ie.width>W||ie.height>W)&&(Z=W/Math.max(ie.width,ie.height)),Z<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const J=Math.floor(Z*ie.width),Ie=Math.floor(Z*ie.height);u===void 0&&(u=x(J,Ie));const me=E?x(J,Ie):u;return me.width=J,me.height=Ie,me.getContext("2d").drawImage(L,0,0,J,Ie),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+J+"x"+Ie+")."),me}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+")."),L;return L}function g(L){return L.generateMipmaps}function m(L){i.generateMipmap(L)}function b(L){return L.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?i.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(L,E,W,Z,ie=!1){if(L!==null){if(i[L]!==void 0)return i[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let J=E;if(E===i.RED&&(W===i.FLOAT&&(J=i.R32F),W===i.HALF_FLOAT&&(J=i.R16F),W===i.UNSIGNED_BYTE&&(J=i.R8)),E===i.RED_INTEGER&&(W===i.UNSIGNED_BYTE&&(J=i.R8UI),W===i.UNSIGNED_SHORT&&(J=i.R16UI),W===i.UNSIGNED_INT&&(J=i.R32UI),W===i.BYTE&&(J=i.R8I),W===i.SHORT&&(J=i.R16I),W===i.INT&&(J=i.R32I)),E===i.RG&&(W===i.FLOAT&&(J=i.RG32F),W===i.HALF_FLOAT&&(J=i.RG16F),W===i.UNSIGNED_BYTE&&(J=i.RG8)),E===i.RG_INTEGER&&(W===i.UNSIGNED_BYTE&&(J=i.RG8UI),W===i.UNSIGNED_SHORT&&(J=i.RG16UI),W===i.UNSIGNED_INT&&(J=i.RG32UI),W===i.BYTE&&(J=i.RG8I),W===i.SHORT&&(J=i.RG16I),W===i.INT&&(J=i.RG32I)),E===i.RGB_INTEGER&&(W===i.UNSIGNED_BYTE&&(J=i.RGB8UI),W===i.UNSIGNED_SHORT&&(J=i.RGB16UI),W===i.UNSIGNED_INT&&(J=i.RGB32UI),W===i.BYTE&&(J=i.RGB8I),W===i.SHORT&&(J=i.RGB16I),W===i.INT&&(J=i.RGB32I)),E===i.RGBA_INTEGER&&(W===i.UNSIGNED_BYTE&&(J=i.RGBA8UI),W===i.UNSIGNED_SHORT&&(J=i.RGBA16UI),W===i.UNSIGNED_INT&&(J=i.RGBA32UI),W===i.BYTE&&(J=i.RGBA8I),W===i.SHORT&&(J=i.RGBA16I),W===i.INT&&(J=i.RGBA32I)),E===i.RGB&&W===i.UNSIGNED_INT_5_9_9_9_REV&&(J=i.RGB9_E5),E===i.RGBA){const Ie=ie?Ur:et.getTransfer(Z);W===i.FLOAT&&(J=i.RGBA32F),W===i.HALF_FLOAT&&(J=i.RGBA16F),W===i.UNSIGNED_BYTE&&(J=Ie===ot?i.SRGB8_ALPHA8:i.RGBA8),W===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),W===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function y(L,E){let W;return L?E===null||E===qn||E===rs?W=i.DEPTH24_STENCIL8:E===sn?W=i.DEPTH32F_STENCIL8:E===Rs&&(W=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===qn||E===rs?W=i.DEPTH_COMPONENT24:E===sn?W=i.DEPTH_COMPONENT32F:E===Rs&&(W=i.DEPTH_COMPONENT16),W}function I(L,E){return g(L)===!0||L.isFramebufferTexture&&L.minFilter!==Kt&&L.minFilter!==xt?Math.log2(Math.max(E.width,E.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?E.mipmaps.length:1}function P(L){const E=L.target;E.removeEventListener("dispose",P),U(E),E.isVideoTexture&&d.delete(E)}function R(L){const E=L.target;E.removeEventListener("dispose",R),S(E)}function U(L){const E=n.get(L);if(E.__webglInit===void 0)return;const W=L.source,Z=f.get(W);if(Z){const ie=Z[E.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&T(L),Object.keys(Z).length===0&&f.delete(W)}n.remove(L)}function T(L){const E=n.get(L);i.deleteTexture(E.__webglTexture);const W=L.source,Z=f.get(W);delete Z[E.__cacheKey],a.memory.textures--}function S(L){const E=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(E.__webglFramebuffer[Z]))for(let ie=0;ie<E.__webglFramebuffer[Z].length;ie++)i.deleteFramebuffer(E.__webglFramebuffer[Z][ie]);else i.deleteFramebuffer(E.__webglFramebuffer[Z]);E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer[Z])}else{if(Array.isArray(E.__webglFramebuffer))for(let Z=0;Z<E.__webglFramebuffer.length;Z++)i.deleteFramebuffer(E.__webglFramebuffer[Z]);else i.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&i.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let Z=0;Z<E.__webglColorRenderbuffer.length;Z++)E.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(E.__webglColorRenderbuffer[Z]);E.__webglDepthRenderbuffer&&i.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const W=L.textures;for(let Z=0,ie=W.length;Z<ie;Z++){const J=n.get(W[Z]);J.__webglTexture&&(i.deleteTexture(J.__webglTexture),a.memory.textures--),n.remove(W[Z])}n.remove(L)}let C=0;function F(){C=0}function N(){const L=C;return L>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+s.maxTextures),C+=1,L}function O(L){const E=[];return E.push(L.wrapS),E.push(L.wrapT),E.push(L.wrapR||0),E.push(L.magFilter),E.push(L.minFilter),E.push(L.anisotropy),E.push(L.internalFormat),E.push(L.format),E.push(L.type),E.push(L.generateMipmaps),E.push(L.premultiplyAlpha),E.push(L.flipY),E.push(L.unpackAlignment),E.push(L.colorSpace),E.join()}function $(L,E){const W=n.get(L);if(L.isVideoTexture&&de(L),L.isRenderTargetTexture===!1&&L.version>0&&W.__version!==L.version){const Z=L.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(W,L,E);return}}t.bindTexture(i.TEXTURE_2D,W.__webglTexture,i.TEXTURE0+E)}function G(L,E){const W=n.get(L);if(L.version>0&&W.__version!==L.version){j(W,L,E);return}t.bindTexture(i.TEXTURE_2D_ARRAY,W.__webglTexture,i.TEXTURE0+E)}function Q(L,E){const W=n.get(L);if(L.version>0&&W.__version!==L.version){j(W,L,E);return}t.bindTexture(i.TEXTURE_3D,W.__webglTexture,i.TEXTURE0+E)}function X(L,E){const W=n.get(L);if(L.version>0&&W.__version!==L.version){ce(W,L,E);return}t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture,i.TEXTURE0+E)}const le={[yi]:i.REPEAT,[mi]:i.CLAMP_TO_EDGE,[oo]:i.MIRRORED_REPEAT},fe={[Kt]:i.NEAREST,[Wu]:i.NEAREST_MIPMAP_NEAREST,[Hs]:i.NEAREST_MIPMAP_LINEAR,[xt]:i.LINEAR,[ta]:i.LINEAR_MIPMAP_NEAREST,[Gn]:i.LINEAR_MIPMAP_LINEAR},ve={[$u]:i.NEVER,[ed]:i.ALWAYS,[Ku]:i.LESS,[_h]:i.LEQUAL,[ju]:i.EQUAL,[Qu]:i.GEQUAL,[Zu]:i.GREATER,[Ju]:i.NOTEQUAL};function Ue(L,E){if(E.type===sn&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===xt||E.magFilter===ta||E.magFilter===Hs||E.magFilter===Gn||E.minFilter===xt||E.minFilter===ta||E.minFilter===Hs||E.minFilter===Gn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(L,i.TEXTURE_WRAP_S,le[E.wrapS]),i.texParameteri(L,i.TEXTURE_WRAP_T,le[E.wrapT]),(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)&&i.texParameteri(L,i.TEXTURE_WRAP_R,le[E.wrapR]),i.texParameteri(L,i.TEXTURE_MAG_FILTER,fe[E.magFilter]),i.texParameteri(L,i.TEXTURE_MIN_FILTER,fe[E.minFilter]),E.compareFunction&&(i.texParameteri(L,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(L,i.TEXTURE_COMPARE_FUNC,ve[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Kt||E.minFilter!==Hs&&E.minFilter!==Gn||E.type===sn&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");i.texParameterf(L,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function je(L,E){let W=!1;L.__webglInit===void 0&&(L.__webglInit=!0,E.addEventListener("dispose",P));const Z=E.source;let ie=f.get(Z);ie===void 0&&(ie={},f.set(Z,ie));const J=O(E);if(J!==L.__cacheKey){ie[J]===void 0&&(ie[J]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,W=!0),ie[J].usedTimes++;const Ie=ie[L.__cacheKey];Ie!==void 0&&(ie[L.__cacheKey].usedTimes--,Ie.usedTimes===0&&T(E)),L.__cacheKey=J,L.__webglTexture=ie[J].texture}return W}function j(L,E,W){let Z=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(Z=i.TEXTURE_3D);const ie=je(L,E),J=E.source;t.bindTexture(Z,L.__webglTexture,i.TEXTURE0+W);const Ie=n.get(J);if(J.version!==Ie.__version||ie===!0){t.activeTexture(i.TEXTURE0+W);const me=et.getPrimaries(et.workingColorSpace),Te=E.colorSpace===Hn?null:et.getPrimaries(E.colorSpace),Ze=E.colorSpace===Hn||me===Te?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ze);let he=v(E.image,!1,s.maxTextureSize);he=Oe(E,he);const we=r.convert(E.format,E.colorSpace),Be=r.convert(E.type);let Ve=M(E.internalFormat,we,Be,E.colorSpace,E.isVideoTexture);Ue(Z,E);let Pe;const Je=E.mipmaps,$e=E.isVideoTexture!==!0,ct=Ie.__version===void 0||ie===!0,B=J.dataReady,_e=I(E,he);if(E.isDepthTexture)Ve=y(E.format===as,E.type),ct&&($e?t.texStorage2D(i.TEXTURE_2D,1,Ve,he.width,he.height):t.texImage2D(i.TEXTURE_2D,0,Ve,he.width,he.height,0,we,Be,null));else if(E.isDataTexture)if(Je.length>0){$e&&ct&&t.texStorage2D(i.TEXTURE_2D,_e,Ve,Je[0].width,Je[0].height);for(let K=0,ee=Je.length;K<ee;K++)Pe=Je[K],$e?B&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,Pe.width,Pe.height,we,Be,Pe.data):t.texImage2D(i.TEXTURE_2D,K,Ve,Pe.width,Pe.height,0,we,Be,Pe.data);E.generateMipmaps=!1}else $e?(ct&&t.texStorage2D(i.TEXTURE_2D,_e,Ve,he.width,he.height),B&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,he.width,he.height,we,Be,he.data)):t.texImage2D(i.TEXTURE_2D,0,Ve,he.width,he.height,0,we,Be,he.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){$e&&ct&&t.texStorage3D(i.TEXTURE_2D_ARRAY,_e,Ve,Je[0].width,Je[0].height,he.depth);for(let K=0,ee=Je.length;K<ee;K++)if(Pe=Je[K],E.format!==wt)if(we!==null)if($e){if(B)if(E.layerUpdates.size>0){const Se=mc(Pe.width,Pe.height,E.format,E.type);for(const be of E.layerUpdates){const qe=Pe.data.subarray(be*Se/Pe.data.BYTES_PER_ELEMENT,(be+1)*Se/Pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,be,Pe.width,Pe.height,1,we,qe)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,Pe.width,Pe.height,he.depth,we,Pe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,K,Ve,Pe.width,Pe.height,he.depth,0,Pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else $e?B&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,Pe.width,Pe.height,he.depth,we,Be,Pe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,K,Ve,Pe.width,Pe.height,he.depth,0,we,Be,Pe.data)}else{$e&&ct&&t.texStorage2D(i.TEXTURE_2D,_e,Ve,Je[0].width,Je[0].height);for(let K=0,ee=Je.length;K<ee;K++)Pe=Je[K],E.format!==wt?we!==null?$e?B&&t.compressedTexSubImage2D(i.TEXTURE_2D,K,0,0,Pe.width,Pe.height,we,Pe.data):t.compressedTexImage2D(i.TEXTURE_2D,K,Ve,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$e?B&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,Pe.width,Pe.height,we,Be,Pe.data):t.texImage2D(i.TEXTURE_2D,K,Ve,Pe.width,Pe.height,0,we,Be,Pe.data)}else if(E.isDataArrayTexture)if($e){if(ct&&t.texStorage3D(i.TEXTURE_2D_ARRAY,_e,Ve,he.width,he.height,he.depth),B)if(E.layerUpdates.size>0){const K=mc(he.width,he.height,E.format,E.type);for(const ee of E.layerUpdates){const Se=he.data.subarray(ee*K/he.data.BYTES_PER_ELEMENT,(ee+1)*K/he.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ee,he.width,he.height,1,we,Be,Se)}E.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,he.width,he.height,he.depth,we,Be,he.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ve,he.width,he.height,he.depth,0,we,Be,he.data);else if(E.isData3DTexture)$e?(ct&&t.texStorage3D(i.TEXTURE_3D,_e,Ve,he.width,he.height,he.depth),B&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,he.width,he.height,he.depth,we,Be,he.data)):t.texImage3D(i.TEXTURE_3D,0,Ve,he.width,he.height,he.depth,0,we,Be,he.data);else if(E.isFramebufferTexture){if(ct)if($e)t.texStorage2D(i.TEXTURE_2D,_e,Ve,he.width,he.height);else{let K=he.width,ee=he.height;for(let Se=0;Se<_e;Se++)t.texImage2D(i.TEXTURE_2D,Se,Ve,K,ee,0,we,Be,null),K>>=1,ee>>=1}}else if(Je.length>0){if($e&&ct){const K=Me(Je[0]);t.texStorage2D(i.TEXTURE_2D,_e,Ve,K.width,K.height)}for(let K=0,ee=Je.length;K<ee;K++)Pe=Je[K],$e?B&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,we,Be,Pe):t.texImage2D(i.TEXTURE_2D,K,Ve,we,Be,Pe);E.generateMipmaps=!1}else if($e){if(ct){const K=Me(he);t.texStorage2D(i.TEXTURE_2D,_e,Ve,K.width,K.height)}B&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,we,Be,he)}else t.texImage2D(i.TEXTURE_2D,0,Ve,we,Be,he);g(E)&&m(Z),Ie.__version=J.version,E.onUpdate&&E.onUpdate(E)}L.__version=E.version}function ce(L,E,W){if(E.image.length!==6)return;const Z=je(L,E),ie=E.source;t.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+W);const J=n.get(ie);if(ie.version!==J.__version||Z===!0){t.activeTexture(i.TEXTURE0+W);const Ie=et.getPrimaries(et.workingColorSpace),me=E.colorSpace===Hn?null:et.getPrimaries(E.colorSpace),Te=E.colorSpace===Hn||Ie===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);const Ze=E.isCompressedTexture||E.image[0].isCompressedTexture,he=E.image[0]&&E.image[0].isDataTexture,we=[];for(let ee=0;ee<6;ee++)!Ze&&!he?we[ee]=v(E.image[ee],!0,s.maxCubemapSize):we[ee]=he?E.image[ee].image:E.image[ee],we[ee]=Oe(E,we[ee]);const Be=we[0],Ve=r.convert(E.format,E.colorSpace),Pe=r.convert(E.type),Je=M(E.internalFormat,Ve,Pe,E.colorSpace),$e=E.isVideoTexture!==!0,ct=J.__version===void 0||Z===!0,B=ie.dataReady;let _e=I(E,Be);Ue(i.TEXTURE_CUBE_MAP,E);let K;if(Ze){$e&&ct&&t.texStorage2D(i.TEXTURE_CUBE_MAP,_e,Je,Be.width,Be.height);for(let ee=0;ee<6;ee++){K=we[ee].mipmaps;for(let Se=0;Se<K.length;Se++){const be=K[Se];E.format!==wt?Ve!==null?$e?B&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Se,0,0,be.width,be.height,Ve,be.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Se,Je,be.width,be.height,0,be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$e?B&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Se,0,0,be.width,be.height,Ve,Pe,be.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Se,Je,be.width,be.height,0,Ve,Pe,be.data)}}}else{if(K=E.mipmaps,$e&&ct){K.length>0&&_e++;const ee=Me(we[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,_e,Je,ee.width,ee.height)}for(let ee=0;ee<6;ee++)if(he){$e?B&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,we[ee].width,we[ee].height,Ve,Pe,we[ee].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,Je,we[ee].width,we[ee].height,0,Ve,Pe,we[ee].data);for(let Se=0;Se<K.length;Se++){const qe=K[Se].image[ee].image;$e?B&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Se+1,0,0,qe.width,qe.height,Ve,Pe,qe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Se+1,Je,qe.width,qe.height,0,Ve,Pe,qe.data)}}else{$e?B&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Ve,Pe,we[ee]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,Je,Ve,Pe,we[ee]);for(let Se=0;Se<K.length;Se++){const be=K[Se];$e?B&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Se+1,0,0,Ve,Pe,be.image[ee]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Se+1,Je,Ve,Pe,be.image[ee])}}}g(E)&&m(i.TEXTURE_CUBE_MAP),J.__version=ie.version,E.onUpdate&&E.onUpdate(E)}L.__version=E.version}function ye(L,E,W,Z,ie,J){const Ie=r.convert(W.format,W.colorSpace),me=r.convert(W.type),Te=M(W.internalFormat,Ie,me,W.colorSpace),Ze=n.get(E),he=n.get(W);if(he.__renderTarget=E,!Ze.__hasExternalTextures){const we=Math.max(1,E.width>>J),Be=Math.max(1,E.height>>J);ie===i.TEXTURE_3D||ie===i.TEXTURE_2D_ARRAY?t.texImage3D(ie,J,Te,we,Be,E.depth,0,Ie,me,null):t.texImage2D(ie,J,Te,we,Be,0,Ie,me,null)}t.bindFramebuffer(i.FRAMEBUFFER,L),Ee(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,ie,he.__webglTexture,0,ae(E)):(ie===i.TEXTURE_2D||ie>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,ie,he.__webglTexture,J),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ue(L,E,W){if(i.bindRenderbuffer(i.RENDERBUFFER,L),E.depthBuffer){const Z=E.depthTexture,ie=Z&&Z.isDepthTexture?Z.type:null,J=y(E.stencilBuffer,ie),Ie=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,me=ae(E);Ee(E)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,me,J,E.width,E.height):W?i.renderbufferStorageMultisample(i.RENDERBUFFER,me,J,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,J,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ie,i.RENDERBUFFER,L)}else{const Z=E.textures;for(let ie=0;ie<Z.length;ie++){const J=Z[ie],Ie=r.convert(J.format,J.colorSpace),me=r.convert(J.type),Te=M(J.internalFormat,Ie,me,J.colorSpace),Ze=ae(E);W&&Ee(E)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ze,Te,E.width,E.height):Ee(E)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ze,Te,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,Te,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Re(L,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,L),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=n.get(E.depthTexture);Z.__renderTarget=E,(!Z.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),$(E.depthTexture,0);const ie=Z.__webglTexture,J=ae(E);if(E.depthTexture.format===Zi)Ee(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ie,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ie,0);else if(E.depthTexture.format===as)Ee(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ie,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ie,0);else throw new Error("Unknown depthTexture format")}function Xe(L){const E=n.get(L),W=L.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==L.depthTexture){const Z=L.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),Z){const ie=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,Z.removeEventListener("dispose",ie)};Z.addEventListener("dispose",ie),E.__depthDisposeCallback=ie}E.__boundDepthTexture=Z}if(L.depthTexture&&!E.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");Re(E.__webglFramebuffer,L)}else if(W){E.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[Z]),E.__webglDepthbuffer[Z]===void 0)E.__webglDepthbuffer[Z]=i.createRenderbuffer(),ue(E.__webglDepthbuffer[Z],L,!1);else{const ie=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=E.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,ie,i.RENDERBUFFER,J)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),ue(E.__webglDepthbuffer,L,!1);else{const Z=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ie=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ie),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,ie)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ge(L,E,W){const Z=n.get(L);E!==void 0&&ye(Z.__webglFramebuffer,L,L.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),W!==void 0&&Xe(L)}function He(L){const E=L.texture,W=n.get(L),Z=n.get(E);L.addEventListener("dispose",R);const ie=L.textures,J=L.isWebGLCubeRenderTarget===!0,Ie=ie.length>1;if(Ie||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=E.version,a.memory.textures++),J){W.__webglFramebuffer=[];for(let me=0;me<6;me++)if(E.mipmaps&&E.mipmaps.length>0){W.__webglFramebuffer[me]=[];for(let Te=0;Te<E.mipmaps.length;Te++)W.__webglFramebuffer[me][Te]=i.createFramebuffer()}else W.__webglFramebuffer[me]=i.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){W.__webglFramebuffer=[];for(let me=0;me<E.mipmaps.length;me++)W.__webglFramebuffer[me]=i.createFramebuffer()}else W.__webglFramebuffer=i.createFramebuffer();if(Ie)for(let me=0,Te=ie.length;me<Te;me++){const Ze=n.get(ie[me]);Ze.__webglTexture===void 0&&(Ze.__webglTexture=i.createTexture(),a.memory.textures++)}if(L.samples>0&&Ee(L)===!1){W.__webglMultisampledFramebuffer=i.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let me=0;me<ie.length;me++){const Te=ie[me];W.__webglColorRenderbuffer[me]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,W.__webglColorRenderbuffer[me]);const Ze=r.convert(Te.format,Te.colorSpace),he=r.convert(Te.type),we=M(Te.internalFormat,Ze,he,Te.colorSpace,L.isXRRenderTarget===!0),Be=ae(L);i.renderbufferStorageMultisample(i.RENDERBUFFER,Be,we,L.width,L.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,W.__webglColorRenderbuffer[me])}i.bindRenderbuffer(i.RENDERBUFFER,null),L.depthBuffer&&(W.__webglDepthRenderbuffer=i.createRenderbuffer(),ue(W.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(J){t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),Ue(i.TEXTURE_CUBE_MAP,E);for(let me=0;me<6;me++)if(E.mipmaps&&E.mipmaps.length>0)for(let Te=0;Te<E.mipmaps.length;Te++)ye(W.__webglFramebuffer[me][Te],L,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Te);else ye(W.__webglFramebuffer[me],L,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0);g(E)&&m(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ie){for(let me=0,Te=ie.length;me<Te;me++){const Ze=ie[me],he=n.get(Ze);t.bindTexture(i.TEXTURE_2D,he.__webglTexture),Ue(i.TEXTURE_2D,Ze),ye(W.__webglFramebuffer,L,Ze,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,0),g(Ze)&&m(i.TEXTURE_2D)}t.unbindTexture()}else{let me=i.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(me=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(me,Z.__webglTexture),Ue(me,E),E.mipmaps&&E.mipmaps.length>0)for(let Te=0;Te<E.mipmaps.length;Te++)ye(W.__webglFramebuffer[Te],L,E,i.COLOR_ATTACHMENT0,me,Te);else ye(W.__webglFramebuffer,L,E,i.COLOR_ATTACHMENT0,me,0);g(E)&&m(me),t.unbindTexture()}L.depthBuffer&&Xe(L)}function ne(L){const E=L.textures;for(let W=0,Z=E.length;W<Z;W++){const ie=E[W];if(g(ie)){const J=b(L),Ie=n.get(ie).__webglTexture;t.bindTexture(J,Ie),m(J),t.unbindTexture()}}}const te=[],D=[];function Le(L){if(L.samples>0){if(Ee(L)===!1){const E=L.textures,W=L.width,Z=L.height;let ie=i.COLOR_BUFFER_BIT;const J=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ie=n.get(L),me=E.length>1;if(me)for(let Te=0;Te<E.length;Te++)t.bindFramebuffer(i.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ie.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ie.__webglFramebuffer);for(let Te=0;Te<E.length;Te++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(ie|=i.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(ie|=i.STENCIL_BUFFER_BIT)),me){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ie.__webglColorRenderbuffer[Te]);const Ze=n.get(E[Te]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ze,0)}i.blitFramebuffer(0,0,W,Z,0,0,W,Z,ie,i.NEAREST),l===!0&&(te.length=0,D.length=0,te.push(i.COLOR_ATTACHMENT0+Te),L.depthBuffer&&L.resolveDepthBuffer===!1&&(te.push(J),D.push(J),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,D)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,te))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),me)for(let Te=0;Te<E.length;Te++){t.bindFramebuffer(i.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.RENDERBUFFER,Ie.__webglColorRenderbuffer[Te]);const Ze=n.get(E[Te]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ie.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.TEXTURE_2D,Ze,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&l){const E=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}}function ae(L){return Math.min(s.maxSamples,L.samples)}function Ee(L){const E=n.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function de(L){const E=a.render.frame;d.get(L)!==E&&(d.set(L,E),L.update())}function Oe(L,E){const W=L.colorSpace,Z=L.format,ie=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||W!==os&&W!==Hn&&(et.getTransfer(W)===ot?(Z!==wt||ie!==Dn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),E}function Me(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(c.width=L.naturalWidth||L.width,c.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(c.width=L.displayWidth,c.height=L.displayHeight):(c.width=L.width,c.height=L.height),c}this.allocateTextureUnit=N,this.resetTextureUnits=F,this.setTexture2D=$,this.setTexture2DArray=G,this.setTexture3D=Q,this.setTextureCube=X,this.rebindTextures=ge,this.setupRenderTarget=He,this.updateRenderTargetMipmap=ne,this.updateMultisampleRenderTarget=Le,this.setupDepthRenderbuffer=Xe,this.setupFrameBufferTexture=ye,this.useMultisampledRTT=Ee}function M0(i,e){function t(n,s=Hn){let r;const a=et.getTransfer(s);if(n===Dn)return i.UNSIGNED_BYTE;if(n===qo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Yo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===hh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===lh)return i.BYTE;if(n===ch)return i.SHORT;if(n===Rs)return i.UNSIGNED_SHORT;if(n===Xo)return i.INT;if(n===qn)return i.UNSIGNED_INT;if(n===sn)return i.FLOAT;if(n===Ns)return i.HALF_FLOAT;if(n===uh)return i.ALPHA;if(n===dh)return i.RGB;if(n===wt)return i.RGBA;if(n===fh)return i.LUMINANCE;if(n===ph)return i.LUMINANCE_ALPHA;if(n===Zi)return i.DEPTH_COMPONENT;if(n===as)return i.DEPTH_STENCIL;if(n===$o)return i.RED;if(n===Gr)return i.RED_INTEGER;if(n===mh)return i.RG;if(n===Ko)return i.RG_INTEGER;if(n===jo)return i.RGBA_INTEGER;if(n===Pr||n===Cr||n===Rr||n===Lr)if(a===ot)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Pr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Cr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Rr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Lr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Pr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Cr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Rr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Lr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===lo||n===co||n===ho||n===uo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===lo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===co)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ho)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===uo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===fo||n===po||n===mo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===fo||n===po)return a===ot?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===mo)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===go||n===_o||n===xo||n===vo||n===yo||n===Mo||n===bo||n===So||n===Eo||n===To||n===Ao||n===wo||n===Po||n===Co)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===go)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===_o)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===xo)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===vo)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===yo)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Mo)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===bo)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===So)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Eo)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===To)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ao)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===wo)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Po)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Co)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ir||n===Ro||n===Lo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ir)return a===ot?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ro)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Lo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===gh||n===Io||n===Do||n===Uo)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ir)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Io)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Do)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Uo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===rs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const b0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,S0=`
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

}`;class E0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new Rt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Yn({vertexShader:b0,fragmentShader:S0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ct(new Vs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class T0 extends Ti{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,d=null,u=null,f=null,p=null,x=null;const v=new E0,g=t.getContextAttributes();let m=null,b=null;const M=[],y=[],I=new re;let P=null;const R=new en;R.viewport=new gt;const U=new en;U.viewport=new gt;const T=[R,U],S=new Gf;let C=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ce=M[j];return ce===void 0&&(ce=new Ma,M[j]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(j){let ce=M[j];return ce===void 0&&(ce=new Ma,M[j]=ce),ce.getGripSpace()},this.getHand=function(j){let ce=M[j];return ce===void 0&&(ce=new Ma,M[j]=ce),ce.getHandSpace()};function N(j){const ce=y.indexOf(j.inputSource);if(ce===-1)return;const ye=M[ce];ye!==void 0&&(ye.update(j.inputSource,j.frame,c||a),ye.dispatchEvent({type:j.type,data:j.inputSource}))}function O(){s.removeEventListener("select",N),s.removeEventListener("selectstart",N),s.removeEventListener("selectend",N),s.removeEventListener("squeeze",N),s.removeEventListener("squeezestart",N),s.removeEventListener("squeezeend",N),s.removeEventListener("end",O),s.removeEventListener("inputsourceschange",$);for(let j=0;j<M.length;j++){const ce=y[j];ce!==null&&(y[j]=null,M[j].disconnect(ce))}C=null,F=null,v.reset(),e.setRenderTarget(m),p=null,f=null,u=null,s=null,b=null,je.stop(),n.isPresenting=!1,e.setPixelRatio(P),e.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",N),s.addEventListener("selectstart",N),s.addEventListener("selectend",N),s.addEventListener("squeeze",N),s.addEventListener("squeezestart",N),s.addEventListener("squeezeend",N),s.addEventListener("end",O),s.addEventListener("inputsourceschange",$),g.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(I),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let ye=null,ue=null,Re=null;g.depth&&(Re=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ye=g.stencil?as:Zi,ue=g.stencil?rs:qn);const Xe={colorFormat:t.RGBA8,depthFormat:Re,scaleFactor:r};u=new XRWebGLBinding(s,t),f=u.createProjectionLayer(Xe),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),b=new Mi(f.textureWidth,f.textureHeight,{format:wt,type:Dn,depthTexture:new Ah(f.textureWidth,f.textureHeight,ue,void 0,void 0,void 0,void 0,void 0,void 0,ye),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const ye={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ye),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new Mi(p.framebufferWidth,p.framebufferHeight,{format:wt,type:Dn,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),je.setContext(s),je.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function $(j){for(let ce=0;ce<j.removed.length;ce++){const ye=j.removed[ce],ue=y.indexOf(ye);ue>=0&&(y[ue]=null,M[ue].disconnect(ye))}for(let ce=0;ce<j.added.length;ce++){const ye=j.added[ce];let ue=y.indexOf(ye);if(ue===-1){for(let Xe=0;Xe<M.length;Xe++)if(Xe>=y.length){y.push(ye),ue=Xe;break}else if(y[Xe]===null){y[Xe]=ye,ue=Xe;break}if(ue===-1)break}const Re=M[ue];Re&&Re.connect(ye)}}const G=new A,Q=new A;function X(j,ce,ye){G.setFromMatrixPosition(ce.matrixWorld),Q.setFromMatrixPosition(ye.matrixWorld);const ue=G.distanceTo(Q),Re=ce.projectionMatrix.elements,Xe=ye.projectionMatrix.elements,ge=Re[14]/(Re[10]-1),He=Re[14]/(Re[10]+1),ne=(Re[9]+1)/Re[5],te=(Re[9]-1)/Re[5],D=(Re[8]-1)/Re[0],Le=(Xe[8]+1)/Xe[0],ae=ge*D,Ee=ge*Le,de=ue/(-D+Le),Oe=de*-D;if(ce.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Oe),j.translateZ(de),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Re[10]===-1)j.projectionMatrix.copy(ce.projectionMatrix),j.projectionMatrixInverse.copy(ce.projectionMatrixInverse);else{const Me=ge+de,L=He+de,E=ae-Oe,W=Ee+(ue-Oe),Z=ne*He/L*Me,ie=te*He/L*Me;j.projectionMatrix.makePerspective(E,W,Z,ie,Me,L),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function le(j,ce){ce===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ce.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let ce=j.near,ye=j.far;v.texture!==null&&(v.depthNear>0&&(ce=v.depthNear),v.depthFar>0&&(ye=v.depthFar)),S.near=U.near=R.near=ce,S.far=U.far=R.far=ye,(C!==S.near||F!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),C=S.near,F=S.far),R.layers.mask=j.layers.mask|2,U.layers.mask=j.layers.mask|4,S.layers.mask=R.layers.mask|U.layers.mask;const ue=j.parent,Re=S.cameras;le(S,ue);for(let Xe=0;Xe<Re.length;Xe++)le(Re[Xe],ue);Re.length===2?X(S,R,U):S.projectionMatrix.copy(R.projectionMatrix),fe(j,S,ue)};function fe(j,ce,ye){ye===null?j.matrix.copy(ce.matrixWorld):(j.matrix.copy(ye.matrixWorld),j.matrix.invert(),j.matrix.multiply(ce.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ce.projectionMatrix),j.projectionMatrixInverse.copy(ce.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Ls*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(j){l=j,f!==null&&(f.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(S)};let ve=null;function Ue(j,ce){if(d=ce.getViewerPose(c||a),x=ce,d!==null){const ye=d.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let ue=!1;ye.length!==S.cameras.length&&(S.cameras.length=0,ue=!0);for(let ge=0;ge<ye.length;ge++){const He=ye[ge];let ne=null;if(p!==null)ne=p.getViewport(He);else{const D=u.getViewSubImage(f,He);ne=D.viewport,ge===0&&(e.setRenderTargetTextures(b,D.colorTexture,f.ignoreDepthValues?void 0:D.depthStencilTexture),e.setRenderTarget(b))}let te=T[ge];te===void 0&&(te=new en,te.layers.enable(ge),te.viewport=new gt,T[ge]=te),te.matrix.fromArray(He.transform.matrix),te.matrix.decompose(te.position,te.quaternion,te.scale),te.projectionMatrix.fromArray(He.projectionMatrix),te.projectionMatrixInverse.copy(te.projectionMatrix).invert(),te.viewport.set(ne.x,ne.y,ne.width,ne.height),ge===0&&(S.matrix.copy(te.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),ue===!0&&S.cameras.push(te)}const Re=s.enabledFeatures;if(Re&&Re.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&u){const ge=u.getDepthInformation(ye[0]);ge&&ge.isValid&&ge.texture&&v.init(e,ge,s.renderState)}}for(let ye=0;ye<M.length;ye++){const ue=y[ye],Re=M[ye];ue!==null&&Re!==void 0&&Re.update(ue,ce,c||a)}ve&&ve(j,ce),ce.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ce}),x=null}const je=new Yh;je.setAnimationLoop(Ue),this.setAnimationLoop=function(j){ve=j},this.dispose=function(){}}}const si=new rn,A0=new rt;function w0(i,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Sh(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,b,M,y){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(g,m):m.isMeshToonMaterial?(r(g,m),u(g,m)):m.isMeshPhongMaterial?(r(g,m),d(g,m)):m.isMeshStandardMaterial?(r(g,m),f(g,m),m.isMeshPhysicalMaterial&&p(g,m,y)):m.isMeshMatcapMaterial?(r(g,m),x(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),v(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,b,M):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Ht&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Ht&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const b=e.get(m),M=b.envMap,y=b.envMapRotation;M&&(g.envMap.value=M,si.copy(y),si.x*=-1,si.y*=-1,si.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(si.y*=-1,si.z*=-1),g.envMapRotation.value.setFromMatrix4(A0.makeRotationFromEuler(si)),g.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,b,M){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*b,g.scale.value=M*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function d(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function f(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function p(g,m,b){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ht&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=b.texture,g.transmissionSamplerSize.value.set(b.width,b.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function x(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){const b=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(b.matrixWorld),g.nearDistance.value=b.shadow.camera.near,g.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function P0(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,M){const y=M.program;n.uniformBlockBinding(b,y)}function c(b,M){let y=s[b.id];y===void 0&&(x(b),y=d(b),s[b.id]=y,b.addEventListener("dispose",g));const I=M.program;n.updateUBOMapping(b,I);const P=e.render.frame;r[b.id]!==P&&(f(b),r[b.id]=P)}function d(b){const M=u();b.__bindingPointIndex=M;const y=i.createBuffer(),I=b.__size,P=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,I,P),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,y),y}function u(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const M=s[b.id],y=b.uniforms,I=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let P=0,R=y.length;P<R;P++){const U=Array.isArray(y[P])?y[P]:[y[P]];for(let T=0,S=U.length;T<S;T++){const C=U[T];if(p(C,P,T,I)===!0){const F=C.__offset,N=Array.isArray(C.value)?C.value:[C.value];let O=0;for(let $=0;$<N.length;$++){const G=N[$],Q=v(G);typeof G=="number"||typeof G=="boolean"?(C.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,F+O,C.__data)):G.isMatrix3?(C.__data[0]=G.elements[0],C.__data[1]=G.elements[1],C.__data[2]=G.elements[2],C.__data[3]=0,C.__data[4]=G.elements[3],C.__data[5]=G.elements[4],C.__data[6]=G.elements[5],C.__data[7]=0,C.__data[8]=G.elements[6],C.__data[9]=G.elements[7],C.__data[10]=G.elements[8],C.__data[11]=0):(G.toArray(C.__data,O),O+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(b,M,y,I){const P=b.value,R=M+"_"+y;if(I[R]===void 0)return typeof P=="number"||typeof P=="boolean"?I[R]=P:I[R]=P.clone(),!0;{const U=I[R];if(typeof P=="number"||typeof P=="boolean"){if(U!==P)return I[R]=P,!0}else if(U.equals(P)===!1)return U.copy(P),!0}return!1}function x(b){const M=b.uniforms;let y=0;const I=16;for(let R=0,U=M.length;R<U;R++){const T=Array.isArray(M[R])?M[R]:[M[R]];for(let S=0,C=T.length;S<C;S++){const F=T[S],N=Array.isArray(F.value)?F.value:[F.value];for(let O=0,$=N.length;O<$;O++){const G=N[O],Q=v(G),X=y%I,le=X%Q.boundary,fe=X+le;y+=le,fe!==0&&I-fe<Q.storage&&(y+=I-fe),F.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=y,y+=Q.storage}}}const P=y%I;return P>0&&(y+=I-P),b.__size=y,b.__cache={},this}function v(b){const M={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(M.boundary=4,M.storage=4):b.isVector2?(M.boundary=8,M.storage=8):b.isVector3||b.isColor?(M.boundary=16,M.storage=12):b.isVector4?(M.boundary=16,M.storage=16):b.isMatrix3?(M.boundary=48,M.storage=48):b.isMatrix4?(M.boundary=64,M.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),M}function g(b){const M=b.target;M.removeEventListener("dispose",g);const y=a.indexOf(M.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function m(){for(const b in s)i.deleteBuffer(s[b]);a=[],s={},r={}}return{bind:l,update:c,dispose:m}}class C0{constructor(e={}){const{canvas:t=_d(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const x=new Uint32Array(4),v=new Int32Array(4);let g=null,m=null;const b=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=bt,this.toneMapping=Xn,this.toneMappingExposure=1;const y=this;let I=!1,P=0,R=0,U=null,T=-1,S=null;const C=new gt,F=new gt;let N=null;const O=new Fe(0);let $=0,G=t.width,Q=t.height,X=1,le=null,fe=null;const ve=new gt(0,0,G,Q),Ue=new gt(0,0,G,Q);let je=!1;const j=new Xr;let ce=!1,ye=!1;this.transmissionResolutionScale=1;const ue=new rt,Re=new rt,Xe=new A,ge=new gt,He={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ne=!1;function te(){return U===null?X:1}let D=n;function Le(w,V){return t.getContext(w,V)}try{const w={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Wo}`),t.addEventListener("webglcontextlost",ee,!1),t.addEventListener("webglcontextrestored",Se,!1),t.addEventListener("webglcontextcreationerror",be,!1),D===null){const V="webgl2";if(D=Le(V,w),D===null)throw Le(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let ae,Ee,de,Oe,Me,L,E,W,Z,ie,J,Ie,me,Te,Ze,he,we,Be,Ve,Pe,Je,$e,ct,B;function _e(){ae=new Vg(D),ae.init(),$e=new M0(D,ae),Ee=new Ig(D,ae,e,$e),de=new v0(D,ae),Ee.reverseDepthBuffer&&f&&de.buffers.depth.setReversed(!0),Oe=new Hg(D),Me=new a0,L=new y0(D,ae,de,Me,Ee,$e,Oe),E=new Ug(y),W=new Bg(y),Z=new $f(D),ct=new Rg(D,Z),ie=new zg(D,Z,Oe,ct),J=new Wg(D,ie,Z,Oe),Ve=new Gg(D,Ee,L),he=new Dg(Me),Ie=new r0(y,E,W,ae,Ee,ct,he),me=new w0(y,Me),Te=new l0,Ze=new p0(ae),Be=new Cg(y,E,W,de,J,p,l),we=new _0(y,J,Ee),B=new P0(D,Oe,Ee,de),Pe=new Lg(D,ae,Oe),Je=new kg(D,ae,Oe),Oe.programs=Ie.programs,y.capabilities=Ee,y.extensions=ae,y.properties=Me,y.renderLists=Te,y.shadowMap=we,y.state=de,y.info=Oe}_e();const K=new T0(y,D);this.xr=K,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const w=ae.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=ae.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(w){w!==void 0&&(X=w,this.setSize(G,Q,!1))},this.getSize=function(w){return w.set(G,Q)},this.setSize=function(w,V,q=!0){if(K.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=w,Q=V,t.width=Math.floor(w*X),t.height=Math.floor(V*X),q===!0&&(t.style.width=w+"px",t.style.height=V+"px"),this.setViewport(0,0,w,V)},this.getDrawingBufferSize=function(w){return w.set(G*X,Q*X).floor()},this.setDrawingBufferSize=function(w,V,q){G=w,Q=V,X=q,t.width=Math.floor(w*q),t.height=Math.floor(V*q),this.setViewport(0,0,w,V)},this.getCurrentViewport=function(w){return w.copy(C)},this.getViewport=function(w){return w.copy(ve)},this.setViewport=function(w,V,q,Y){w.isVector4?ve.set(w.x,w.y,w.z,w.w):ve.set(w,V,q,Y),de.viewport(C.copy(ve).multiplyScalar(X).round())},this.getScissor=function(w){return w.copy(Ue)},this.setScissor=function(w,V,q,Y){w.isVector4?Ue.set(w.x,w.y,w.z,w.w):Ue.set(w,V,q,Y),de.scissor(F.copy(Ue).multiplyScalar(X).round())},this.getScissorTest=function(){return je},this.setScissorTest=function(w){de.setScissorTest(je=w)},this.setOpaqueSort=function(w){le=w},this.setTransparentSort=function(w){fe=w},this.getClearColor=function(w){return w.copy(Be.getClearColor())},this.setClearColor=function(){Be.setClearColor(...arguments)},this.getClearAlpha=function(){return Be.getClearAlpha()},this.setClearAlpha=function(){Be.setClearAlpha(...arguments)},this.clear=function(w=!0,V=!0,q=!0){let Y=0;if(w){let k=!1;if(U!==null){const oe=U.texture.format;k=oe===jo||oe===Ko||oe===Gr}if(k){const oe=U.texture.type,xe=oe===Dn||oe===qn||oe===Rs||oe===rs||oe===qo||oe===Yo,Ae=Be.getClearColor(),Ce=Be.getClearAlpha(),ze=Ae.r,ke=Ae.g,De=Ae.b;xe?(x[0]=ze,x[1]=ke,x[2]=De,x[3]=Ce,D.clearBufferuiv(D.COLOR,0,x)):(v[0]=ze,v[1]=ke,v[2]=De,v[3]=Ce,D.clearBufferiv(D.COLOR,0,v))}else Y|=D.COLOR_BUFFER_BIT}V&&(Y|=D.DEPTH_BUFFER_BIT),q&&(Y|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ee,!1),t.removeEventListener("webglcontextrestored",Se,!1),t.removeEventListener("webglcontextcreationerror",be,!1),Be.dispose(),Te.dispose(),Ze.dispose(),Me.dispose(),E.dispose(),W.dispose(),J.dispose(),ct.dispose(),B.dispose(),Ie.dispose(),K.dispose(),K.removeEventListener("sessionstart",ll),K.removeEventListener("sessionend",cl),Kn.stop()};function ee(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function Se(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;const w=Oe.autoReset,V=we.enabled,q=we.autoUpdate,Y=we.needsUpdate,k=we.type;_e(),Oe.autoReset=w,we.enabled=V,we.autoUpdate=q,we.needsUpdate=Y,we.type=k}function be(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function qe(w){const V=w.target;V.removeEventListener("dispose",qe),pt(V)}function pt(w){Lt(w),Me.remove(w)}function Lt(w){const V=Me.get(w).programs;V!==void 0&&(V.forEach(function(q){Ie.releaseProgram(q)}),w.isShaderMaterial&&Ie.releaseShaderCache(w))}this.renderBufferDirect=function(w,V,q,Y,k,oe){V===null&&(V=He);const xe=k.isMesh&&k.matrixWorld.determinant()<0,Ae=iu(w,V,q,Y,k);de.setMaterial(Y,xe);let Ce=q.index,ze=1;if(Y.wireframe===!0){if(Ce=ie.getWireframeAttribute(q),Ce===void 0)return;ze=2}const ke=q.drawRange,De=q.attributes.position;let Qe=ke.start*ze,it=(ke.start+ke.count)*ze;oe!==null&&(Qe=Math.max(Qe,oe.start*ze),it=Math.min(it,(oe.start+oe.count)*ze)),Ce!==null?(Qe=Math.max(Qe,0),it=Math.min(it,Ce.count)):De!=null&&(Qe=Math.max(Qe,0),it=Math.min(it,De.count));const vt=it-Qe;if(vt<0||vt===1/0)return;ct.setup(k,Y,Ae,q,Ce);let mt,tt=Pe;if(Ce!==null&&(mt=Z.get(Ce),tt=Je,tt.setIndex(mt)),k.isMesh)Y.wireframe===!0?(de.setLineWidth(Y.wireframeLinewidth*te()),tt.setMode(D.LINES)):tt.setMode(D.TRIANGLES);else if(k.isLine){let Ne=Y.linewidth;Ne===void 0&&(Ne=1),de.setLineWidth(Ne*te()),k.isLineSegments?tt.setMode(D.LINES):k.isLineLoop?tt.setMode(D.LINE_LOOP):tt.setMode(D.LINE_STRIP)}else k.isPoints?tt.setMode(D.POINTS):k.isSprite&&tt.setMode(D.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)ui("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),tt.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(ae.get("WEBGL_multi_draw"))tt.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Ne=k._multiDrawStarts,Pt=k._multiDrawCounts,st=k._multiDrawCount,ln=Ce?Z.get(Ce).bytesPerElement:1,wi=Me.get(Y).currentProgram.getUniforms();for(let Wt=0;Wt<st;Wt++)wi.setValue(D,"_gl_DrawID",Wt),tt.render(Ne[Wt]/ln,Pt[Wt])}else if(k.isInstancedMesh)tt.renderInstances(Qe,vt,k.count);else if(q.isInstancedBufferGeometry){const Ne=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Pt=Math.min(q.instanceCount,Ne);tt.renderInstances(Qe,vt,Pt)}else tt.render(Qe,vt)};function at(w,V,q){w.transparent===!0&&w.side===$t&&w.forceSinglePass===!1?(w.side=Ht,w.needsUpdate=!0,ks(w,V,q),w.side=nn,w.needsUpdate=!0,ks(w,V,q),w.side=$t):ks(w,V,q)}this.compile=function(w,V,q=null){q===null&&(q=w),m=Ze.get(q),m.init(V),M.push(m),q.traverseVisible(function(k){k.isLight&&k.layers.test(V.layers)&&(m.pushLight(k),k.castShadow&&m.pushShadow(k))}),w!==q&&w.traverseVisible(function(k){k.isLight&&k.layers.test(V.layers)&&(m.pushLight(k),k.castShadow&&m.pushShadow(k))}),m.setupLights();const Y=new Set;return w.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const oe=k.material;if(oe)if(Array.isArray(oe))for(let xe=0;xe<oe.length;xe++){const Ae=oe[xe];at(Ae,q,k),Y.add(Ae)}else at(oe,q,k),Y.add(oe)}),m=M.pop(),Y},this.compileAsync=function(w,V,q=null){const Y=this.compile(w,V,q);return new Promise(k=>{function oe(){if(Y.forEach(function(xe){Me.get(xe).currentProgram.isReady()&&Y.delete(xe)}),Y.size===0){k(w);return}setTimeout(oe,10)}ae.get("KHR_parallel_shader_compile")!==null?oe():setTimeout(oe,10)})};let on=null;function Mn(w){on&&on(w)}function ll(){Kn.stop()}function cl(){Kn.start()}const Kn=new Yh;Kn.setAnimationLoop(Mn),typeof self<"u"&&Kn.setContext(self),this.setAnimationLoop=function(w){on=w,K.setAnimationLoop(w),w===null?Kn.stop():Kn.start()},K.addEventListener("sessionstart",ll),K.addEventListener("sessionend",cl),this.render=function(w,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),K.enabled===!0&&K.isPresenting===!0&&(K.cameraAutoUpdate===!0&&K.updateCamera(V),V=K.getCamera()),w.isScene===!0&&w.onBeforeRender(y,w,V,U),m=Ze.get(w,M.length),m.init(V),M.push(m),Re.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),j.setFromProjectionMatrix(Re),ye=this.localClippingEnabled,ce=he.init(this.clippingPlanes,ye),g=Te.get(w,b.length),g.init(),b.push(g),K.enabled===!0&&K.isPresenting===!0){const oe=y.xr.getDepthSensingMesh();oe!==null&&Zr(oe,V,-1/0,y.sortObjects)}Zr(w,V,0,y.sortObjects),g.finish(),y.sortObjects===!0&&g.sort(le,fe),ne=K.enabled===!1||K.isPresenting===!1||K.hasDepthSensing()===!1,ne&&Be.addToRenderList(g,w),this.info.render.frame++,ce===!0&&he.beginShadows();const q=m.state.shadowsArray;we.render(q,w,V),ce===!0&&he.endShadows(),this.info.autoReset===!0&&this.info.reset();const Y=g.opaque,k=g.transmissive;if(m.setupLights(),V.isArrayCamera){const oe=V.cameras;if(k.length>0)for(let xe=0,Ae=oe.length;xe<Ae;xe++){const Ce=oe[xe];ul(Y,k,w,Ce)}ne&&Be.render(w);for(let xe=0,Ae=oe.length;xe<Ae;xe++){const Ce=oe[xe];hl(g,w,Ce,Ce.viewport)}}else k.length>0&&ul(Y,k,w,V),ne&&Be.render(w),hl(g,w,V);U!==null&&R===0&&(L.updateMultisampleRenderTarget(U),L.updateRenderTargetMipmap(U)),w.isScene===!0&&w.onAfterRender(y,w,V),ct.resetDefaultState(),T=-1,S=null,M.pop(),M.length>0?(m=M[M.length-1],ce===!0&&he.setGlobalState(y.clippingPlanes,m.state.camera)):m=null,b.pop(),b.length>0?g=b[b.length-1]:g=null};function Zr(w,V,q,Y){if(w.visible===!1)return;if(w.layers.test(V.layers)){if(w.isGroup)q=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(V);else if(w.isLight)m.pushLight(w),w.castShadow&&m.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||j.intersectsSprite(w)){Y&&ge.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Re);const xe=J.update(w),Ae=w.material;Ae.visible&&g.push(w,xe,Ae,q,ge.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||j.intersectsObject(w))){const xe=J.update(w),Ae=w.material;if(Y&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),ge.copy(w.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),ge.copy(xe.boundingSphere.center)),ge.applyMatrix4(w.matrixWorld).applyMatrix4(Re)),Array.isArray(Ae)){const Ce=xe.groups;for(let ze=0,ke=Ce.length;ze<ke;ze++){const De=Ce[ze],Qe=Ae[De.materialIndex];Qe&&Qe.visible&&g.push(w,xe,Qe,q,ge.z,De)}}else Ae.visible&&g.push(w,xe,Ae,q,ge.z,null)}}const oe=w.children;for(let xe=0,Ae=oe.length;xe<Ae;xe++)Zr(oe[xe],V,q,Y)}function hl(w,V,q,Y){const k=w.opaque,oe=w.transmissive,xe=w.transparent;m.setupLightsView(q),ce===!0&&he.setGlobalState(y.clippingPlanes,q),Y&&de.viewport(C.copy(Y)),k.length>0&&zs(k,V,q),oe.length>0&&zs(oe,V,q),xe.length>0&&zs(xe,V,q),de.buffers.depth.setTest(!0),de.buffers.depth.setMask(!0),de.buffers.color.setMask(!0),de.setPolygonOffset(!1)}function ul(w,V,q,Y){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[Y.id]===void 0&&(m.state.transmissionRenderTarget[Y.id]=new Mi(1,1,{generateMipmaps:!0,type:ae.has("EXT_color_buffer_half_float")||ae.has("EXT_color_buffer_float")?Ns:Dn,minFilter:Gn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:et.workingColorSpace}));const oe=m.state.transmissionRenderTarget[Y.id],xe=Y.viewport||C;oe.setSize(xe.z*y.transmissionResolutionScale,xe.w*y.transmissionResolutionScale);const Ae=y.getRenderTarget();y.setRenderTarget(oe),y.getClearColor(O),$=y.getClearAlpha(),$<1&&y.setClearColor(16777215,.5),y.clear(),ne&&Be.render(q);const Ce=y.toneMapping;y.toneMapping=Xn;const ze=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),m.setupLightsView(Y),ce===!0&&he.setGlobalState(y.clippingPlanes,Y),zs(w,q,Y),L.updateMultisampleRenderTarget(oe),L.updateRenderTargetMipmap(oe),ae.has("WEBGL_multisampled_render_to_texture")===!1){let ke=!1;for(let De=0,Qe=V.length;De<Qe;De++){const it=V[De],vt=it.object,mt=it.geometry,tt=it.material,Ne=it.group;if(tt.side===$t&&vt.layers.test(Y.layers)){const Pt=tt.side;tt.side=Ht,tt.needsUpdate=!0,dl(vt,q,Y,mt,tt,Ne),tt.side=Pt,tt.needsUpdate=!0,ke=!0}}ke===!0&&(L.updateMultisampleRenderTarget(oe),L.updateRenderTargetMipmap(oe))}y.setRenderTarget(Ae),y.setClearColor(O,$),ze!==void 0&&(Y.viewport=ze),y.toneMapping=Ce}function zs(w,V,q){const Y=V.isScene===!0?V.overrideMaterial:null;for(let k=0,oe=w.length;k<oe;k++){const xe=w[k],Ae=xe.object,Ce=xe.geometry,ze=Y===null?xe.material:Y,ke=xe.group;Ae.layers.test(q.layers)&&dl(Ae,V,q,Ce,ze,ke)}}function dl(w,V,q,Y,k,oe){w.onBeforeRender(y,V,q,Y,k,oe),w.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),k.onBeforeRender(y,V,q,Y,w,oe),k.transparent===!0&&k.side===$t&&k.forceSinglePass===!1?(k.side=Ht,k.needsUpdate=!0,y.renderBufferDirect(q,V,Y,k,w,oe),k.side=nn,k.needsUpdate=!0,y.renderBufferDirect(q,V,Y,k,w,oe),k.side=$t):y.renderBufferDirect(q,V,Y,k,w,oe),w.onAfterRender(y,V,q,Y,k,oe)}function ks(w,V,q){V.isScene!==!0&&(V=He);const Y=Me.get(w),k=m.state.lights,oe=m.state.shadowsArray,xe=k.state.version,Ae=Ie.getParameters(w,k.state,oe,V,q),Ce=Ie.getProgramCacheKey(Ae);let ze=Y.programs;Y.environment=w.isMeshStandardMaterial?V.environment:null,Y.fog=V.fog,Y.envMap=(w.isMeshStandardMaterial?W:E).get(w.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&w.envMap===null?V.environmentRotation:w.envMapRotation,ze===void 0&&(w.addEventListener("dispose",qe),ze=new Map,Y.programs=ze);let ke=ze.get(Ce);if(ke!==void 0){if(Y.currentProgram===ke&&Y.lightsStateVersion===xe)return pl(w,Ae),ke}else Ae.uniforms=Ie.getUniforms(w),w.onBeforeCompile(Ae,y),ke=Ie.acquireProgram(Ae,Ce),ze.set(Ce,ke),Y.uniforms=Ae.uniforms;const De=Y.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(De.clippingPlanes=he.uniform),pl(w,Ae),Y.needsLights=ru(w),Y.lightsStateVersion=xe,Y.needsLights&&(De.ambientLightColor.value=k.state.ambient,De.lightProbe.value=k.state.probe,De.directionalLights.value=k.state.directional,De.directionalLightShadows.value=k.state.directionalShadow,De.spotLights.value=k.state.spot,De.spotLightShadows.value=k.state.spotShadow,De.rectAreaLights.value=k.state.rectArea,De.ltc_1.value=k.state.rectAreaLTC1,De.ltc_2.value=k.state.rectAreaLTC2,De.pointLights.value=k.state.point,De.pointLightShadows.value=k.state.pointShadow,De.hemisphereLights.value=k.state.hemi,De.directionalShadowMap.value=k.state.directionalShadowMap,De.directionalShadowMatrix.value=k.state.directionalShadowMatrix,De.spotShadowMap.value=k.state.spotShadowMap,De.spotLightMatrix.value=k.state.spotLightMatrix,De.spotLightMap.value=k.state.spotLightMap,De.pointShadowMap.value=k.state.pointShadowMap,De.pointShadowMatrix.value=k.state.pointShadowMatrix),Y.currentProgram=ke,Y.uniformsList=null,ke}function fl(w){if(w.uniformsList===null){const V=w.currentProgram.getUniforms();w.uniformsList=Dr.seqWithValue(V.seq,w.uniforms)}return w.uniformsList}function pl(w,V){const q=Me.get(w);q.outputColorSpace=V.outputColorSpace,q.batching=V.batching,q.batchingColor=V.batchingColor,q.instancing=V.instancing,q.instancingColor=V.instancingColor,q.instancingMorph=V.instancingMorph,q.skinning=V.skinning,q.morphTargets=V.morphTargets,q.morphNormals=V.morphNormals,q.morphColors=V.morphColors,q.morphTargetsCount=V.morphTargetsCount,q.numClippingPlanes=V.numClippingPlanes,q.numIntersection=V.numClipIntersection,q.vertexAlphas=V.vertexAlphas,q.vertexTangents=V.vertexTangents,q.toneMapping=V.toneMapping}function iu(w,V,q,Y,k){V.isScene!==!0&&(V=He),L.resetTextureUnits();const oe=V.fog,xe=Y.isMeshStandardMaterial?V.environment:null,Ae=U===null?y.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:os,Ce=(Y.isMeshStandardMaterial?W:E).get(Y.envMap||xe),ze=Y.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,ke=!!q.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),De=!!q.morphAttributes.position,Qe=!!q.morphAttributes.normal,it=!!q.morphAttributes.color;let vt=Xn;Y.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(vt=y.toneMapping);const mt=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,tt=mt!==void 0?mt.length:0,Ne=Me.get(Y),Pt=m.state.lights;if(ce===!0&&(ye===!0||w!==S)){const Ft=w===S&&Y.id===T;he.setState(Y,w,Ft)}let st=!1;Y.version===Ne.__version?(Ne.needsLights&&Ne.lightsStateVersion!==Pt.state.version||Ne.outputColorSpace!==Ae||k.isBatchedMesh&&Ne.batching===!1||!k.isBatchedMesh&&Ne.batching===!0||k.isBatchedMesh&&Ne.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Ne.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Ne.instancing===!1||!k.isInstancedMesh&&Ne.instancing===!0||k.isSkinnedMesh&&Ne.skinning===!1||!k.isSkinnedMesh&&Ne.skinning===!0||k.isInstancedMesh&&Ne.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Ne.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Ne.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Ne.instancingMorph===!1&&k.morphTexture!==null||Ne.envMap!==Ce||Y.fog===!0&&Ne.fog!==oe||Ne.numClippingPlanes!==void 0&&(Ne.numClippingPlanes!==he.numPlanes||Ne.numIntersection!==he.numIntersection)||Ne.vertexAlphas!==ze||Ne.vertexTangents!==ke||Ne.morphTargets!==De||Ne.morphNormals!==Qe||Ne.morphColors!==it||Ne.toneMapping!==vt||Ne.morphTargetsCount!==tt)&&(st=!0):(st=!0,Ne.__version=Y.version);let ln=Ne.currentProgram;st===!0&&(ln=ks(Y,V,k));let wi=!1,Wt=!1,us=!1;const ut=ln.getUniforms(),jt=Ne.uniforms;if(de.useProgram(ln.program)&&(wi=!0,Wt=!0,us=!0),Y.id!==T&&(T=Y.id,Wt=!0),wi||S!==w){de.buffers.depth.getReversed()?(ue.copy(w.projectionMatrix),vd(ue),yd(ue),ut.setValue(D,"projectionMatrix",ue)):ut.setValue(D,"projectionMatrix",w.projectionMatrix),ut.setValue(D,"viewMatrix",w.matrixWorldInverse);const Vt=ut.map.cameraPosition;Vt!==void 0&&Vt.setValue(D,Xe.setFromMatrixPosition(w.matrixWorld)),Ee.logarithmicDepthBuffer&&ut.setValue(D,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&ut.setValue(D,"isOrthographic",w.isOrthographicCamera===!0),S!==w&&(S=w,Wt=!0,us=!0)}if(k.isSkinnedMesh){ut.setOptional(D,k,"bindMatrix"),ut.setOptional(D,k,"bindMatrixInverse");const Ft=k.skeleton;Ft&&(Ft.boneTexture===null&&Ft.computeBoneTexture(),ut.setValue(D,"boneTexture",Ft.boneTexture,L))}k.isBatchedMesh&&(ut.setOptional(D,k,"batchingTexture"),ut.setValue(D,"batchingTexture",k._matricesTexture,L),ut.setOptional(D,k,"batchingIdTexture"),ut.setValue(D,"batchingIdTexture",k._indirectTexture,L),ut.setOptional(D,k,"batchingColorTexture"),k._colorsTexture!==null&&ut.setValue(D,"batchingColorTexture",k._colorsTexture,L));const Zt=q.morphAttributes;if((Zt.position!==void 0||Zt.normal!==void 0||Zt.color!==void 0)&&Ve.update(k,q,ln),(Wt||Ne.receiveShadow!==k.receiveShadow)&&(Ne.receiveShadow=k.receiveShadow,ut.setValue(D,"receiveShadow",k.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(jt.envMap.value=Ce,jt.flipEnvMap.value=Ce.isCubeTexture&&Ce.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&V.environment!==null&&(jt.envMapIntensity.value=V.environmentIntensity),Wt&&(ut.setValue(D,"toneMappingExposure",y.toneMappingExposure),Ne.needsLights&&su(jt,us),oe&&Y.fog===!0&&me.refreshFogUniforms(jt,oe),me.refreshMaterialUniforms(jt,Y,X,Q,m.state.transmissionRenderTarget[w.id]),Dr.upload(D,fl(Ne),jt,L)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(Dr.upload(D,fl(Ne),jt,L),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&ut.setValue(D,"center",k.center),ut.setValue(D,"modelViewMatrix",k.modelViewMatrix),ut.setValue(D,"normalMatrix",k.normalMatrix),ut.setValue(D,"modelMatrix",k.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const Ft=Y.uniformsGroups;for(let Vt=0,Jr=Ft.length;Vt<Jr;Vt++){const jn=Ft[Vt];B.update(jn,ln),B.bind(jn,ln)}}return ln}function su(w,V){w.ambientLightColor.needsUpdate=V,w.lightProbe.needsUpdate=V,w.directionalLights.needsUpdate=V,w.directionalLightShadows.needsUpdate=V,w.pointLights.needsUpdate=V,w.pointLightShadows.needsUpdate=V,w.spotLights.needsUpdate=V,w.spotLightShadows.needsUpdate=V,w.rectAreaLights.needsUpdate=V,w.hemisphereLights.needsUpdate=V}function ru(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(w,V,q){Me.get(w.texture).__webglTexture=V,Me.get(w.depthTexture).__webglTexture=q;const Y=Me.get(w);Y.__hasExternalTextures=!0,Y.__autoAllocateDepthBuffer=q===void 0,Y.__autoAllocateDepthBuffer||ae.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,V){const q=Me.get(w);q.__webglFramebuffer=V,q.__useDefaultFramebuffer=V===void 0};const au=D.createFramebuffer();this.setRenderTarget=function(w,V=0,q=0){U=w,P=V,R=q;let Y=!0,k=null,oe=!1,xe=!1;if(w){const Ce=Me.get(w);if(Ce.__useDefaultFramebuffer!==void 0)de.bindFramebuffer(D.FRAMEBUFFER,null),Y=!1;else if(Ce.__webglFramebuffer===void 0)L.setupRenderTarget(w);else if(Ce.__hasExternalTextures)L.rebindTextures(w,Me.get(w.texture).__webglTexture,Me.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const De=w.depthTexture;if(Ce.__boundDepthTexture!==De){if(De!==null&&Me.has(De)&&(w.width!==De.image.width||w.height!==De.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");L.setupDepthRenderbuffer(w)}}const ze=w.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(xe=!0);const ke=Me.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(ke[V])?k=ke[V][q]:k=ke[V],oe=!0):w.samples>0&&L.useMultisampledRTT(w)===!1?k=Me.get(w).__webglMultisampledFramebuffer:Array.isArray(ke)?k=ke[q]:k=ke,C.copy(w.viewport),F.copy(w.scissor),N=w.scissorTest}else C.copy(ve).multiplyScalar(X).floor(),F.copy(Ue).multiplyScalar(X).floor(),N=je;if(q!==0&&(k=au),de.bindFramebuffer(D.FRAMEBUFFER,k)&&Y&&de.drawBuffers(w,k),de.viewport(C),de.scissor(F),de.setScissorTest(N),oe){const Ce=Me.get(w.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+V,Ce.__webglTexture,q)}else if(xe){const Ce=Me.get(w.texture),ze=V;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ce.__webglTexture,q,ze)}else if(w!==null&&q!==0){const Ce=Me.get(w.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ce.__webglTexture,q)}T=-1},this.readRenderTargetPixels=function(w,V,q,Y,k,oe,xe){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=Me.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&xe!==void 0&&(Ae=Ae[xe]),Ae){de.bindFramebuffer(D.FRAMEBUFFER,Ae);try{const Ce=w.texture,ze=Ce.format,ke=Ce.type;if(!Ee.textureFormatReadable(ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ee.textureTypeReadable(ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=w.width-Y&&q>=0&&q<=w.height-k&&D.readPixels(V,q,Y,k,$e.convert(ze),$e.convert(ke),oe)}finally{const Ce=U!==null?Me.get(U).__webglFramebuffer:null;de.bindFramebuffer(D.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(w,V,q,Y,k,oe,xe){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ae=Me.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&xe!==void 0&&(Ae=Ae[xe]),Ae){const Ce=w.texture,ze=Ce.format,ke=Ce.type;if(!Ee.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ee.textureTypeReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(V>=0&&V<=w.width-Y&&q>=0&&q<=w.height-k){de.bindFramebuffer(D.FRAMEBUFFER,Ae);const De=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,De),D.bufferData(D.PIXEL_PACK_BUFFER,oe.byteLength,D.STREAM_READ),D.readPixels(V,q,Y,k,$e.convert(ze),$e.convert(ke),0);const Qe=U!==null?Me.get(U).__webglFramebuffer:null;de.bindFramebuffer(D.FRAMEBUFFER,Qe);const it=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await xd(D,it,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,De),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,oe),D.deleteBuffer(De),D.deleteSync(it),oe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,V=null,q=0){w.isTexture!==!0&&(ui("WebGLRenderer: copyFramebufferToTexture function signature has changed."),V=arguments[0]||null,w=arguments[1]);const Y=Math.pow(2,-q),k=Math.floor(w.image.width*Y),oe=Math.floor(w.image.height*Y),xe=V!==null?V.x:0,Ae=V!==null?V.y:0;L.setTexture2D(w,0),D.copyTexSubImage2D(D.TEXTURE_2D,q,0,0,xe,Ae,k,oe),de.unbindTexture()};const ou=D.createFramebuffer(),lu=D.createFramebuffer();this.copyTextureToTexture=function(w,V,q=null,Y=null,k=0,oe=null){w.isTexture!==!0&&(ui("WebGLRenderer: copyTextureToTexture function signature has changed."),Y=arguments[0]||null,w=arguments[1],V=arguments[2],oe=arguments[3]||0,q=null),oe===null&&(k!==0?(ui("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),oe=k,k=0):oe=0);let xe,Ae,Ce,ze,ke,De,Qe,it,vt;const mt=w.isCompressedTexture?w.mipmaps[oe]:w.image;if(q!==null)xe=q.max.x-q.min.x,Ae=q.max.y-q.min.y,Ce=q.isBox3?q.max.z-q.min.z:1,ze=q.min.x,ke=q.min.y,De=q.isBox3?q.min.z:0;else{const Zt=Math.pow(2,-k);xe=Math.floor(mt.width*Zt),Ae=Math.floor(mt.height*Zt),w.isDataArrayTexture?Ce=mt.depth:w.isData3DTexture?Ce=Math.floor(mt.depth*Zt):Ce=1,ze=0,ke=0,De=0}Y!==null?(Qe=Y.x,it=Y.y,vt=Y.z):(Qe=0,it=0,vt=0);const tt=$e.convert(V.format),Ne=$e.convert(V.type);let Pt;V.isData3DTexture?(L.setTexture3D(V,0),Pt=D.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(L.setTexture2DArray(V,0),Pt=D.TEXTURE_2D_ARRAY):(L.setTexture2D(V,0),Pt=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,V.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,V.unpackAlignment);const st=D.getParameter(D.UNPACK_ROW_LENGTH),ln=D.getParameter(D.UNPACK_IMAGE_HEIGHT),wi=D.getParameter(D.UNPACK_SKIP_PIXELS),Wt=D.getParameter(D.UNPACK_SKIP_ROWS),us=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,mt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,mt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,ze),D.pixelStorei(D.UNPACK_SKIP_ROWS,ke),D.pixelStorei(D.UNPACK_SKIP_IMAGES,De);const ut=w.isDataArrayTexture||w.isData3DTexture,jt=V.isDataArrayTexture||V.isData3DTexture;if(w.isDepthTexture){const Zt=Me.get(w),Ft=Me.get(V),Vt=Me.get(Zt.__renderTarget),Jr=Me.get(Ft.__renderTarget);de.bindFramebuffer(D.READ_FRAMEBUFFER,Vt.__webglFramebuffer),de.bindFramebuffer(D.DRAW_FRAMEBUFFER,Jr.__webglFramebuffer);for(let jn=0;jn<Ce;jn++)ut&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Me.get(w).__webglTexture,k,De+jn),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Me.get(V).__webglTexture,oe,vt+jn)),D.blitFramebuffer(ze,ke,xe,Ae,Qe,it,xe,Ae,D.DEPTH_BUFFER_BIT,D.NEAREST);de.bindFramebuffer(D.READ_FRAMEBUFFER,null),de.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(k!==0||w.isRenderTargetTexture||Me.has(w)){const Zt=Me.get(w),Ft=Me.get(V);de.bindFramebuffer(D.READ_FRAMEBUFFER,ou),de.bindFramebuffer(D.DRAW_FRAMEBUFFER,lu);for(let Vt=0;Vt<Ce;Vt++)ut?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Zt.__webglTexture,k,De+Vt):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Zt.__webglTexture,k),jt?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ft.__webglTexture,oe,vt+Vt):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ft.__webglTexture,oe),k!==0?D.blitFramebuffer(ze,ke,xe,Ae,Qe,it,xe,Ae,D.COLOR_BUFFER_BIT,D.NEAREST):jt?D.copyTexSubImage3D(Pt,oe,Qe,it,vt+Vt,ze,ke,xe,Ae):D.copyTexSubImage2D(Pt,oe,Qe,it,ze,ke,xe,Ae);de.bindFramebuffer(D.READ_FRAMEBUFFER,null),de.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else jt?w.isDataTexture||w.isData3DTexture?D.texSubImage3D(Pt,oe,Qe,it,vt,xe,Ae,Ce,tt,Ne,mt.data):V.isCompressedArrayTexture?D.compressedTexSubImage3D(Pt,oe,Qe,it,vt,xe,Ae,Ce,tt,mt.data):D.texSubImage3D(Pt,oe,Qe,it,vt,xe,Ae,Ce,tt,Ne,mt):w.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,oe,Qe,it,xe,Ae,tt,Ne,mt.data):w.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,oe,Qe,it,mt.width,mt.height,tt,mt.data):D.texSubImage2D(D.TEXTURE_2D,oe,Qe,it,xe,Ae,tt,Ne,mt);D.pixelStorei(D.UNPACK_ROW_LENGTH,st),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ln),D.pixelStorei(D.UNPACK_SKIP_PIXELS,wi),D.pixelStorei(D.UNPACK_SKIP_ROWS,Wt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,us),oe===0&&V.generateMipmaps&&D.generateMipmap(Pt),de.unbindTexture()},this.copyTextureToTexture3D=function(w,V,q=null,Y=null,k=0){return w.isTexture!==!0&&(ui("WebGLRenderer: copyTextureToTexture3D function signature has changed."),q=arguments[0]||null,Y=arguments[1]||null,w=arguments[2],V=arguments[3],k=arguments[4]||0),ui('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,V,q,Y,k)},this.initRenderTarget=function(w){Me.get(w).__webglFramebuffer===void 0&&L.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?L.setTextureCube(w,0):w.isData3DTexture?L.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?L.setTexture2DArray(w,0):L.setTexture2D(w,0),de.unbindTexture()},this.resetState=function(){P=0,R=0,U=null,de.reset(),ct.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Rn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=et._getDrawingBufferColorSpace(e),t.unpackColorSpace=et._getUnpackColorSpace()}}const Vc={type:"change"},sl={type:"start"},Jh={type:"end"},Sr=new Os,zc=new Cn,R0=Math.cos(70*ys.DEG2RAD),Mt=new A,kt=2*Math.PI,lt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},za=1e-6;class L0 extends qf{constructor(e,t=null){super(e,t),this.state=lt.NONE,this.enabled=!0,this.target=new A,this.cursor=new A,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ki.ROTATE,MIDDLE:Ki.DOLLY,RIGHT:Ki.PAN},this.touches={ONE:qi.ROTATE,TWO:qi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new A,this._lastQuaternion=new bi,this._lastTargetPosition=new A,this._quat=new bi().setFromUnitVectors(e.up,new A(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new fc,this._sphericalDelta=new fc,this._scale=1,this._panOffset=new A,this._rotateStart=new re,this._rotateEnd=new re,this._rotateDelta=new re,this._panStart=new re,this._panEnd=new re,this._panDelta=new re,this._dollyStart=new re,this._dollyEnd=new re,this._dollyDelta=new re,this._dollyDirection=new A,this._mouse=new re,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=D0.bind(this),this._onPointerDown=I0.bind(this),this._onPointerUp=U0.bind(this),this._onContextMenu=k0.bind(this),this._onMouseWheel=O0.bind(this),this._onKeyDown=B0.bind(this),this._onTouchStart=V0.bind(this),this._onTouchMove=z0.bind(this),this._onMouseDown=N0.bind(this),this._onMouseMove=F0.bind(this),this._interceptControlDown=H0.bind(this),this._interceptControlUp=G0.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Vc),this.update(),this.state=lt.NONE}update(e=null){const t=this.object.position;Mt.copy(t).sub(this.target),Mt.applyQuaternion(this._quat),this._spherical.setFromVector3(Mt),this.autoRotate&&this.state===lt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=kt:n>Math.PI&&(n-=kt),s<-Math.PI?s+=kt:s>Math.PI&&(s-=kt),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Mt.setFromSpherical(this._spherical),Mt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Mt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Mt.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new A(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new A(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Mt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Sr.origin.copy(this.object.position),Sr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Sr.direction))<R0?this.object.lookAt(this.target):(zc.setFromNormalAndCoplanarPoint(this.object.up,this.target),Sr.intersectPlane(zc,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>za||8*(1-this._lastQuaternion.dot(this.object.quaternion))>za||this._lastTargetPosition.distanceToSquared(this.target)>za?(this.dispatchEvent(Vc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?kt/60*this.autoRotateSpeed*e:kt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Mt.setFromMatrixColumn(t,0),Mt.multiplyScalar(-e),this._panOffset.add(Mt)}_panUp(e,t){this.screenSpacePanning===!0?Mt.setFromMatrixColumn(t,1):(Mt.setFromMatrixColumn(t,0),Mt.crossVectors(this.object.up,Mt)),Mt.multiplyScalar(e),this._panOffset.add(Mt)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Mt.copy(s).sub(this.target);let r=Mt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(kt*this._rotateDelta.x/t.clientHeight),this._rotateUp(kt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(kt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-kt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(kt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-kt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(kt*this._rotateDelta.x/t.clientHeight),this._rotateUp(kt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new re,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function I0(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function D0(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function U0(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Jh),this.state=lt.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function N0(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ki.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=lt.DOLLY;break;case Ki.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=lt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=lt.ROTATE}break;case Ki.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=lt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=lt.PAN}break;default:this.state=lt.NONE}this.state!==lt.NONE&&this.dispatchEvent(sl)}function F0(i){switch(this.state){case lt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case lt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case lt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function O0(i){this.enabled===!1||this.enableZoom===!1||this.state!==lt.NONE||(i.preventDefault(),this.dispatchEvent(sl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Jh))}function B0(i){this.enabled!==!1&&this._handleKeyDown(i)}function V0(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case qi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=lt.TOUCH_ROTATE;break;case qi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=lt.TOUCH_PAN;break;default:this.state=lt.NONE}break;case 2:switch(this.touches.TWO){case qi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=lt.TOUCH_DOLLY_PAN;break;case qi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=lt.TOUCH_DOLLY_ROTATE;break;default:this.state=lt.NONE}break;default:this.state=lt.NONE}this.state!==lt.NONE&&this.dispatchEvent(sl)}function z0(i){switch(this._trackPointer(i),this.state){case lt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case lt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case lt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case lt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=lt.NONE}}function k0(i){this.enabled!==!1&&i.preventDefault()}function H0(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function G0(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function W0(){if(typeof window>"u"||typeof navigator>"u")return{isMobile:!1,maxPixelRatio:2,antialias:!0,textureScale:1,maxAnisotropy:4,curveScale:1,edgeThresholdBoost:0,simplifyPhysicalShaders:!1,lightRigMode:"full"};const e=new URLSearchParams(window.location.search).get("gpu"),t=navigator.userAgent||"",n=!!window.Capacitor,s=/Android|iPhone|iPad|iPod|Mobile|wv\)|POCO|Xiaomi|MIUI|HyperOS/i.test(t),r=(navigator.maxTouchPoints??0)>0&&Math.min(window.screen.width,window.screen.height)<=1024;return(e==="mobile"?!0:e==="desktop"?!1:n||s||r)?{isMobile:!0,maxPixelRatio:1.5,antialias:!1,textureScale:.55,maxAnisotropy:2,curveScale:.62,edgeThresholdBoost:6,simplifyPhysicalShaders:!0,lightRigMode:"mobile"}:{isMobile:!1,maxPixelRatio:2,antialias:!0,textureScale:1,maxAnisotropy:4,curveScale:1,edgeThresholdBoost:0,simplifyPhysicalShaders:!1,lightRigMode:"full"}}const gi=W0();gi.isMobile;function Ax(i,e=6){return gi.curveScale>=.999?i:Math.max(e,Math.round(i*gi.curveScale))}const kc=new Map;function _t(i,e){return async()=>{const t=kc.get(i);if(t)return t;const s=(await e()).default,r={unitId:s.unitId,version:s.version,nameJa:s.nameJa,nameEn:s.nameEn,declaredPartCount:s.declaredPartCount,maxDrawCallsBudget:s.maxDrawCallsBudget,budgetRationale:s.budgetRationale,parts:s.parts};return kc.set(i,r),r}}const rl=Object.freeze({welcome:{unitId:"welcome",declaredPartCount:220,loadMeta:_t("welcome",()=>se(()=>import("./welcome-Ce7Ng2Al.js"),[],import.meta.url)),load:async()=>(await se(async()=>{const{createWelcomeUnit:i}=await import("./welcome-DBxz24T6.js");return{createWelcomeUnit:i}},__vite__mapDeps([0,1,2,3]),import.meta.url)).createWelcomeUnit()},mishoe:{unitId:"mishoe",declaredPartCount:32,loadMeta:_t("mishoe",()=>se(()=>import("./mi_shoe-CaQBxxP9.js"),[],import.meta.url)),load:async()=>(await se(async()=>{const{createMiShoeUnit:i}=await import("./mi_shoe-pwdBj5II.js");return{createMiShoeUnit:i}},__vite__mapDeps([4,2,5]),import.meta.url)).createMiShoeUnit()},battery:{unitId:"battery",declaredPartCount:130,loadMeta:_t("battery",()=>se(()=>import("./battery-Cw3gePVg.js"),[],import.meta.url)),load:async()=>(await se(async()=>{const{createBatteryUnit:i}=await import("./battery-RyWap-h3.js");return{createBatteryUnit:i}},__vite__mapDeps([6,7,2,8,3]),import.meta.url)).createBatteryUnit()},cfexpress:{unitId:"cfexpress",declaredPartCount:170,loadMeta:_t("cfexpress",()=>se(()=>import("./cfexpress-DY8cI-Wc.js"),[],import.meta.url)),load:async()=>(await se(async()=>{const{createCfexpressUnit:i}=await import("./cfexpress-DDfkGrAc.js");return{createCfexpressUnit:i}},__vite__mapDeps([9,10,2,8,3]),import.meta.url)).createCfexpressUnit()},mic:{unitId:"mic",declaredPartCount:150,loadMeta:_t("mic",()=>se(()=>import("./mic-CwD_McdS.js"),[],import.meta.url)),load:async()=>(await se(async()=>{const{createMicUnit:i}=await import("./mic-DBizln4F.js");return{createMicUnit:i}},__vite__mapDeps([11,12,2,8,3]),import.meta.url)).createMicUnit()},drybox:{unitId:"drybox",declaredPartCount:150,loadMeta:_t("drybox",()=>se(()=>import("./drybox-00mboV4n.js"),[],import.meta.url)),load:async()=>(await se(async()=>{const{createDryboxUnit:i}=await import("./drybox-BmRCpdG8.js");return{createDryboxUnit:i}},__vite__mapDeps([13,14,2,3]),import.meta.url)).createDryboxUnit()},mount:{unitId:"mount",declaredPartCount:100,loadMeta:_t("mount",()=>se(()=>import("./mount-D5exe6iE.js"),[],import.meta.url)),load:async()=>(await se(async()=>{const{createMountUnit:i}=await import("./mount-DWvwy581.js");return{createMountUnit:i}},__vite__mapDeps([15,16,17,2,3]),import.meta.url)).createMountUnit()},shutter:{unitId:"shutter",declaredPartCount:180,loadMeta:_t("shutter",()=>se(()=>import("./shutter-DRF49fuH.js"),[],import.meta.url)),load:async()=>(await se(async()=>{const{createShutterUnit:i}=await import("./shutter-BVBtEzqy.js");return{createShutterUnit:i}},__vite__mapDeps([18,19,20,2,3]),import.meta.url)).createShutterUnit()},body:{unitId:"body",declaredPartCount:116,loadMeta:_t("body",()=>se(()=>import("./body-DYuOmmPC.js"),[],import.meta.url)),load:async()=>(await se(async()=>{const{createBodyUnit:i}=await import("./body-wIasqRfe.js");return{createBodyUnit:i}},__vite__mapDeps([21,22,23,2,24,8,25,3]),import.meta.url)).createBodyUnit()},evf:{unitId:"evf",declaredPartCount:55,loadMeta:_t("evf",()=>se(()=>import("./evf-yJM6r-pP.js"),[],import.meta.url)),load:async()=>(await se(async()=>{const{createEvfUnit:i}=await import("./evf-CGhylB64.js");return{createEvfUnit:i}},__vite__mapDeps([26,27,25,2,8,28,3]),import.meta.url)).createEvfUnit()},lcd:{unitId:"lcd",declaredPartCount:150,loadMeta:_t("lcd",()=>se(()=>import("./lcd-C5DFy3jF.js"),[],import.meta.url)),load:async()=>(await se(async()=>{const{createLcdUnit:i}=await import("./lcd-Uhc9LJ7g.js");return{createLcdUnit:i}},__vite__mapDeps([29,30,24,2,8,31,3]),import.meta.url)).createLcdUnit()},lens:{unitId:"lens",declaredPartCount:128,loadMeta:_t("lens",()=>se(()=>import("./lens-DbGM9PCN.js"),[],import.meta.url)),load:async()=>(await se(async()=>{const{createLensUnit:i}=await import("./lens-BRQ8fip_.js");return{createLensUnit:i}},__vite__mapDeps([32,33,34,2,3]),import.meta.url)).createLensUnit()},mainboard:{unitId:"mainboard",declaredPartCount:60,loadMeta:_t("mainboard",()=>se(()=>import("./mainboard-kTn1WrHF.js"),[],import.meta.url)),load:async()=>(await se(async()=>{const{createMainboardUnit:i}=await import("./mainboard-BHej6QxS.js");return{createMainboardUnit:i}},__vite__mapDeps([35,36,37,2,3]),import.meta.url)).createMainboardUnit()},bionz:{unitId:"bionz",declaredPartCount:70,loadMeta:_t("bionz",()=>se(()=>import("./bionz-CtB3oT0v.js"),[],import.meta.url)),load:async()=>(await se(async()=>{const{createBionzUnit:i}=await import("./bionz-ClHF8aAe.js");return{createBionzUnit:i}},__vite__mapDeps([38,39,2,8,3]),import.meta.url)).createBionzUnit()},bionz_v2:{unitId:"bionz_v2",declaredPartCount:55,loadMeta:_t("bionz_v2",()=>se(()=>import("./bionz_v2-BTlxc95w.js"),[],import.meta.url)),load:async()=>(await se(async()=>{const{createBionzV2Unit:i}=await import("./bionz_v2-CmYkRODF.js");return{createBionzV2Unit:i}},__vite__mapDeps([40,41,2,8,3]),import.meta.url)).createBionzV2Unit()},sensor:{unitId:"sensor",declaredPartCount:90,loadMeta:_t("sensor",()=>se(()=>import("./sensor-CoYD7fba.js"),[],import.meta.url)),load:async()=>(await se(async()=>{const{createSensorUnit:i}=await import("./sensor-C7liHQoZ.js");return{createSensorUnit:i}},__vite__mapDeps([42,43,44,2,8,45,3]),import.meta.url)).createSensorUnit()},micro:{unitId:"micro",declaredPartCount:75,loadMeta:_t("micro",()=>se(()=>import("./micro-cCBBsnJi.js"),[],import.meta.url)),load:async()=>(await se(async()=>{const{createMicroUnit:i}=await import("./micro-x6hhqG6D.js");return{createMicroUnit:i}},__vite__mapDeps([46,47,2,48,8,45,3]),import.meta.url)).createMicroUnit()},micro_v2:{unitId:"micro_v2",declaredPartCount:55,loadMeta:_t("micro_v2",()=>se(()=>import("./micro_v2-Be62c30w.js"),[],import.meta.url)),load:async()=>(await se(async()=>{const{createMicroV2Unit:i}=await import("./micro_v2-C0MwDO-8.js");return{createMicroV2Unit:i}},__vite__mapDeps([49,50,2,8,3]),import.meta.url)).createMicroV2Unit()},sensor_fab:{unitId:"sensor_fab",declaredPartCount:235,loadMeta:_t("sensor_fab",()=>se(()=>import("./sensor_fab-Cu3xZEwo.js"),[],import.meta.url)),load:async()=>(await se(async()=>{const{createSensorFabUnit:i}=await import("./sensor_fab-C27pmCPU.js");return{createSensorFabUnit:i}},__vite__mapDeps([51,52,2,8,3]),import.meta.url)).createSensorFabUnit()},integrated:{unitId:"integrated",declaredPartCount:305,loadMeta:_t("integrated",()=>se(()=>import("./integrated-_M_HiRFo.js"),[],import.meta.url)),load:async()=>(await se(async()=>{const{createIntegratedUnit:i}=await import("./integrated-CUjhP8RA.js");return{createIntegratedUnit:i}},__vite__mapDeps([53,54,3,2,55,34,17,23,24,8,25,28,20,44,45,37,31]),import.meta.url)).createIntegratedUnit()},camera_body:{unitId:"camera_body",declaredPartCount:231,loadMeta:_t("camera_body",()=>se(()=>import("./camera_body-CnaAZIgr.js"),[],import.meta.url)),load:async()=>(await se(async()=>{const{createCameraBodyUnit:i}=await import("./camera_body-CxDtI3m5.js");return{createCameraBodyUnit:i}},__vite__mapDeps([56,57,3,2,55,34,17,23,24,8,25,28,20,44,45,37,31]),import.meta.url)).createCameraBodyUnit()}});function X0(i){return Object.prototype.hasOwnProperty.call(rl,i)}function q0(){return Object.values(rl)}async function Y0(i){const e=rl[i];if(!e)throw new Error(`Unit '${i}' is not registered in V2 registry.`);return e.load()}const Hc=["map","bumpMap","normalMap","roughnessMap","metalnessMap","emissiveMap","alphaMap","aoMap","envMap","clearcoatMap","clearcoatRoughnessMap","clearcoatNormalMap","iridescenceMap"];function Gi(i,e,t,n,s){const r=i.userData?.__cacheKey;if(e&&r&&e.hasMaterial(r)){e.releaseMaterial(r),t.releasedCachedMaterials++;return}if(n.has(i))return;n.add(i);const a=i;for(let o=0;o<Hc.length;o++){const l=a[Hc[o]];if(l instanceof Rt&&!s.has(l)){const c=l.userData?.__cacheKey;e&&c?e.releaseTexture(c):(l.dispose(),t.disposedUniqueTextures++),s.add(l)}}i.dispose(),t.disposedUniqueMaterials++}function Gc(i,e,t,n){const s=i.userData?.__cacheKey;if(e&&s&&e.hasGeometry(s)){e.releaseGeometry(s),t.releasedCachedGeometries++;return}n.has(i)||(n.add(i),i.dispose(),t.disposedUniqueGeometries++)}function $0(i,e=null,t=!0){const n={disposedObjects:0,releasedCachedGeometries:0,disposedUniqueGeometries:0,releasedCachedMaterials:0,disposedUniqueMaterials:0,disposedUniqueTextures:0,disposedInstancedMeshes:0,disposedBatchedMeshes:0},s=new Set,r=new Set,a=new Set,o=l=>{const c=l.children.slice();for(let d=0;d<c.length;d++)o(c[d]);if(n.disposedObjects++,l.isBatchedMesh){const d=l;if(Array.isArray(d.material))for(let u=0;u<d.material.length;u++)Gi(d.material[u],e,n,r,a);else d.material&&Gi(d.material,e,n,r,a);d.dispose(),n.disposedBatchedMeshes++}else if(l.isInstancedMesh){const d=l;if(d.geometry&&Gc(d.geometry,e,n,s),Array.isArray(d.material))for(let u=0;u<d.material.length;u++)Gi(d.material[u],e,n,r,a);else d.material&&Gi(d.material,e,n,r,a);d.dispose(),n.disposedInstancedMeshes++}else if(l.isMesh||l.isLine||l.isPoints){const d=l;if(d.geometry&&Gc(d.geometry,e,n,s),Array.isArray(d.material))for(let u=0;u<d.material.length;u++)Gi(d.material[u],e,n,r,a);else d.material&&Gi(d.material,e,n,r,a)}else if(l.isLight){const d=l;typeof d.dispose=="function"&&d.dispose()}l!==i&&l.parent&&l.parent.remove(l)};return o(i),t&&i.parent&&i.parent.remove(i),n}class K0{baseline=null;peak=null;lastVerification=null;switchCount=0;captureBaseline(e){const t={geometries:e.info.memory.geometries,textures:e.info.memory.textures,timestampMs:typeof performance<"u"?performance.now():Date.now()};return this.baseline=t,this.peak=t,t}recordActivePeak(e){const t={geometries:e.info.memory.geometries,textures:e.info.memory.textures,timestampMs:typeof performance<"u"?performance.now():Date.now()};return(!this.peak||t.geometries>this.peak.geometries||t.textures>this.peak.textures)&&(this.peak=t),t}verifyAfterDispose(e,t){const n=typeof performance<"u"?performance.now():Date.now(),s={geometries:e.info.memory.geometries,textures:e.info.memory.textures,timestampMs:n},r=this.baseline??s,a=this.peak??s,o=t.getStats(),l=s.geometries-r.geometries,c=s.textures-r.textures,d=l<=0&&c<=0&&o.totalRefs===0&&o.geometries===0&&o.materials===0&&o.textures===0;this.switchCount++;const u={baseline:r,peak:a,afterDispose:s,deltaGeometries:l,deltaTextures:c,cacheRemainingRefs:o.totalRefs,passed:d};return this.lastVerification=u,d||console.warn("[MI Shoe V2 VRAM Leak Detector] Residual GPU/cache resources detected!",{...u,cacheStats:o}),u}getLastVerification(){return this.lastVerification}getSwitchCount(){return this.switchCount}}const j0="http://www.w3.org/2000/svg";class Z0{host;toggleBtn;panelEl;fields={};mounted=!1;expanded=!1;lastDomUpdateMs=-1/0;constructor(e,t=!1){this.host=e,this.expanded=t,this.toggleBtn=document.createElement("button"),this.toggleBtn.type="button",this.toggleBtn.className="unit-v2-perf-toggle mishoe-v2-perf-toggle is-hidden",this.toggleBtn.setAttribute("aria-label","V2 パフォーマンスHUD切替 (P)"),this.toggleBtn.setAttribute("title","V2 Perf HUD (P)");const n=document.createElementNS(j0,"svg");n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("aria-hidden","true"),n.innerHTML='<path d="M4.5 16.5a8.5 8.5 0 1 1 15 0"/><line x1="12" y1="13" x2="16.2" y2="8.8"/><circle cx="12" cy="13.5" r="1.4" fill="currentColor" stroke="none"/>';const s=document.createElement("span");s.textContent="V2 HUD",this.toggleBtn.append(n,s),this.toggleBtn.addEventListener("click",()=>this.toggle()),this.panelEl=document.createElement("div"),this.panelEl.className="unit-v2-perf-panel mishoe-v2-perf-panel is-hidden",this.panelEl.setAttribute("role","status"),this.panelEl.setAttribute("aria-live","off");const r=document.createElement("div");r.className="unit-v2-perf-header",r.innerHTML='<span class="unit-v2-perf-title" data-field="unitTitle">V2 OPT</span><span class="unit-v2-perf-state" data-field="loopState">IDLE 0%</span>',this.panelEl.appendChild(r);const a=[["drawCalls","Draw Calls"],["triangles","Triangles"],["geometries","Geometries"],["textures","Textures"],["frameTime","Frame Time"],["quality","Tier / DPR"],["batches","Batching"],["parts","Parts (JSON=3D)"],["build","Build / Warmup"],["vram","VRAM Leak"]],o=document.createElement("div");o.className="unit-v2-perf-grid";for(let l=0;l<a.length;l++){const[c,d]=a[l],u=document.createElement("div");u.className="unit-v2-perf-row";const f=document.createElement("span");f.className="unit-v2-perf-key",f.textContent=d;const p=document.createElement("span");p.className="unit-v2-perf-val",p.dataset.field=c,p.textContent="-",u.append(f,p),o.appendChild(u),this.fields[c]=p}this.fields.unitTitle=r.querySelector('[data-field="unitTitle"]'),this.fields.loopState=r.querySelector('[data-field="loopState"]'),this.panelEl.appendChild(o),this.host.append(this.toggleBtn,this.panelEl)}setModeVisible(e){this.mounted=e,this.toggleBtn.classList.toggle("is-hidden",!e),this.toggleBtn.classList.toggle("is-active",e&&this.expanded),this.panelEl.classList.toggle("is-hidden",!e||!this.expanded)}toggle(){return this.expanded=!this.expanded,this.toggleBtn.classList.toggle("is-active",this.mounted&&this.expanded),this.panelEl.classList.toggle("is-hidden",!this.mounted||!this.expanded),this.expanded}setExpanded(e){this.expanded=e,this.toggleBtn.classList.toggle("is-active",this.mounted&&this.expanded),this.panelEl.classList.toggle("is-hidden",!this.mounted||!this.expanded)}isExpanded(){return this.expanded}update(e,t=!1){if(!this.mounted||!this.expanded)return;const n=typeof performance<"u"?performance.now():Date.now();if(!t&&n-this.lastDomUpdateMs<90)return;this.lastDomUpdateMs=n,this.fields.unitTitle.textContent=`${e.unitId.toUpperCase()} · V2 OPT`;const s=e.drawCalls,r=e.maxDrawCallsBudget??100;if(this.fields.drawCalls.textContent=`${s} / ${r}`,this.fields.drawCalls.className=s<=r?"unit-v2-perf-val is-ok":"unit-v2-perf-val is-warn",this.fields.triangles.textContent=e.triangles.toLocaleString("en-US"),this.fields.geometries.textContent=String(e.geometries),this.fields.textures.textContent=String(e.textures),this.fields.frameTime.textContent=`${e.frameTimeMs.toFixed(2)} ms (avg ${e.avgFrameTimeMs.toFixed(2)})`,this.fields.quality.textContent=`${e.quality.toUpperCase()} · DPR ${e.pixelRatio.toFixed(2)}`,e.buildStats){const a=e.buildStats;this.fields.batches.textContent=`${a.instancedMeshCount} Inst(${a.totalInstances}) · ${a.batchedMeshCount} Batch(${a.totalBatchedItems})`,this.fields.parts.textContent=`${a.registeredPartCount} / ${a.declaredPartCount}`,this.fields.build.textContent=`${a.buildTimeMs.toFixed(1)}ms (max ${a.maxChunkMs.toFixed(1)}ms) · W ${e.shaderWarmupMs.toFixed(1)}ms`}if(e.vramCheck){const a=e.vramCheck;this.fields.vram.textContent=a.passed?`PASS Δg:${a.deltaGeometries} Δt:${a.deltaTextures} (#${e.vramSwitchCount})`:`LEAK Δg:${a.deltaGeometries} Δt:${a.deltaTextures}`,this.fields.vram.className=a.passed?"unit-v2-perf-val is-ok":"unit-v2-perf-val is-warn"}else this.fields.vram.textContent="BASELINE ARMED",this.fields.vram.className="unit-v2-perf-val";this.fields.loopState.textContent=e.idle?"IDLE 0% GPU":"ACTIVE",this.fields.loopState.className=e.idle?"unit-v2-perf-state is-idle":"unit-v2-perf-state is-active"}dispose(){this.toggleBtn.remove(),this.panelEl.remove()}}const Ss=new A,wn=[],ri=new Int32Array(2048),ai=new Float64Array(2048),al=new an;al.side=$t;const Wc=new Gt,J0=new dn,Qt=new ht,Er=new Ct(Qt,al),fn=new Ct(Qt,al),Xc=new rt,zn=new Os,qc=new A,Yc={vertexStart:0,vertexCount:0,reservedVertexCount:0,indexStart:0,indexCount:0,reservedIndexCount:0,start:0,count:0};function $c(i,e,t,n,s,r,a,o,l){if(Xc.copy(e).invert(),zn.copy(i).applyMatrix4(Xc),t&&!t.isEmpty()&&!zn.intersectBox(t,Ss))return 1/0;const c=zn.origin.x,d=zn.origin.y,u=zn.origin.z,f=zn.direction.x,p=zn.direction.y,x=zn.direction.z,v=e.elements,g=i.origin.x,m=i.origin.y,b=i.origin.z;let M=o;const y=r+a;for(let I=r;I+2<y;I+=3){const P=s?s[I]*3:I*3,R=s?s[I+1]*3:(I+1)*3,U=s?s[I+2]*3:(I+2)*3,T=n[P],S=n[P+1],C=n[P+2],F=n[R]-T,N=n[R+1]-S,O=n[R+2]-C,$=n[U]-T,G=n[U+1]-S,Q=n[U+2]-C,X=p*Q-x*G,le=x*$-f*Q,fe=f*G-p*$,ve=F*X+N*le+O*fe;if(ve>-1e-7&&ve<1e-7)continue;const Ue=1/ve,je=c-T,j=d-S,ce=u-C,ye=(je*X+j*le+ce*fe)*Ue;if(ye<0||ye>1)continue;const ue=j*O-ce*N,Re=ce*F-je*O,Xe=je*N-j*F,ge=(f*ue+p*Re+x*Xe)*Ue;if(ge<0||ye+ge>1)continue;const He=($*ue+G*Re+Q*Xe)*Ue;if(He<=0)continue;const ne=c+f*He,te=d+p*He,D=u+x*He,Le=v[0]*ne+v[4]*te+v[8]*D+v[12],ae=v[1]*ne+v[5]*te+v[9]*D+v[13],Ee=v[2]*ne+v[6]*te+v[10]*D+v[14],de=Math.hypot(Le-g,ae-m,Ee-b);de>=M||l&&(qc.set(Le,ae,Ee),l.distanceToPoint(qc)<0)||(M=de)}return M<o?M:1/0}const Kc=new WeakMap;function Q0(i){let e=Kc.get(i);if(e)return e;e=new Map;const t=i.kind==="instanced"?i.instanceIdToPartId:i.batchIdToPartId;for(let n=0;n<t.length;n++){const s=t[n];if(!s)continue;let r=e.get(s);r||(r=[],e.set(s,r)),r.push(n)}return Kc.set(i,e),e}class ex{raycaster=new Xf;hoverThrottleMs;isDragging=!1;lastHoverTimestampMs=-1/0;lastHoverPartId=null;hoverChecksPerformed=0;hoverChecksSkipped=0;constructor(e=33.3){this.hoverThrottleMs=e}setCameraDragging(e){this.isDragging=e}isCameraDragging(){return this.isDragging}resetHoverThrottle(){this.lastHoverTimestampMs=-1/0}getDiagnostics(){return{performed:this.hoverChecksPerformed,skipped:this.hoverChecksSkipped}}pickHover(e,t,n,s,r,a=typeof performance<"u"?performance.now():Date.now()){if(!n||this.isDragging)return this.hoverChecksSkipped++,{skipped:!0,partId:this.lastHoverPartId};if(a-this.lastHoverTimestampMs<this.hoverThrottleMs)return this.hoverChecksSkipped++,{skipped:!0,partId:this.lastHoverPartId};this.lastHoverTimestampMs=a,this.hoverChecksPerformed++,this.raycaster.setFromCamera(e,t);const o=this.pickWithRay(this.raycaster,n,s,r);return this.lastHoverPartId=o,{skipped:!1,partId:o}}pickClick(e,t,n,s,r){return n?(this.raycaster.setFromCamera(e,t),this.pickWithRay(this.raycaster,n,s,r)):null}pickWithRay(e,t,n,s){const r=e.ray,a=r.origin;if(t.unitWorldBox.isEmpty()||!r.intersectBox(t.unitWorldBox,Ss))return null;let o=0;const l=t.groups,c=t.parts,d=ri.length;for(let g=0;g<l.length;g++){const m=l[g];if(m.worldBox.isEmpty()||!r.intersectBox(m.worldBox,Ss))continue;const b=m.partIndices;for(let M=0;M<b.length;M++){const y=b[M],I=c[y];if(n(I.partId)||I.worldBox.isEmpty()||!r.intersectBox(I.worldBox,Ss))continue;if(o>=d)break;const P=I.worldBox.containsPoint(a)?0:a.distanceToSquared(Ss);ri[o]=y,ai[o]=P,o++}}if(o===0)return null;for(let g=1;g<o;g++){const m=ri[g],b=ai[g];let M=g-1;for(;M>=0&&ai[M]>b;)ri[M+1]=ri[M],ai[M+1]=ai[M],M--;ri[M+1]=m,ai[M+1]=b}let u=1/0,f=1/0,p=null;const x=t.bindings,v=!!t.fastLiteRaycast;for(let g=0;g<o&&!(ai[g]>=f);g++){const m=c[ri[g]],b=m.partId,M=m.bindingIndices;for(let y=0;y<M.length;y++){const I=x[M[y]];if(!I||!I.mesh.visible)continue;const R=Q0(I).get(b);if(R)if(I.kind==="batched"){const U=I.mesh,T=U.geometry;if(v){const S=T.getAttribute("position");if(!S)continue;const C=S.array,F=T.index?T.index.array:null;for(let N=0;N<R.length;N++){const O=R[N];if(!U.getVisibleAt(O))continue;const $=U.getGeometryIdAt(O),G=U.getGeometryRangeAt($,Yc);if(!G||G.count<=0)continue;U.getMatrixAt(O,Er.matrixWorld).premultiply(U.matrixWorld);const Q=U.getBoundingBoxAt($,Wc),X=$c(r,Er.matrixWorld,Q,C,F,G.start,G.count,u,s);X<u&&(u=X,f=X*X,p=b)}}else{Qt.index=T.index,Qt.attributes=T.attributes;for(let S=0;S<R.length;S++){const C=R[S];if(!U.getVisibleAt(C))continue;const F=U.getGeometryIdAt(C),N=U.getGeometryRangeAt(F,Yc);if(!(!N||N.count<=0)){Qt.setDrawRange(N.start,N.count),U.getMatrixAt(C,Er.matrixWorld).premultiply(U.matrixWorld),Qt.boundingBox=U.getBoundingBoxAt(F,Wc),Qt.boundingSphere=U.getBoundingSphereAt(F,J0),wn.length=0,Er.raycast(e,wn);for(let O=0;O<wn.length;O++){const $=wn[O];$.distance>=u||s&&s.distanceToPoint($.point)<0||(u=$.distance,f=u*u,p=b)}}}Qt.index=null,Qt.attributes={},Qt.boundingBox=null,Qt.boundingSphere=null}}else{const U=I.mesh,T=U.geometry;if(!T)continue;if(v){const S=T.getAttribute("position");if(!S)continue;const C=S.array,F=T.index?T.index.array:null,N=F?F.length:S.count;T.boundingBox||T.computeBoundingBox();for(let O=0;O<R.length;O++){const $=R[O];U.getMatrixAt($,fn.matrixWorld),fn.matrixWorld.premultiply(U.matrixWorld);const G=fn.matrixWorld.elements;if(G[0]===0&&G[1]===0&&G[2]===0&&G[4]===0&&G[5]===0&&G[6]===0)continue;const Q=$c(r,fn.matrixWorld,T.boundingBox,C,F,0,N,u,s);Q<u&&(u=Q,f=Q*Q,p=b)}}else{fn.geometry=T;for(let S=0;S<R.length;S++){const C=R[S];U.getMatrixAt(C,fn.matrixWorld),fn.matrixWorld.premultiply(U.matrixWorld);const F=fn.matrixWorld.elements;if(!(F[0]===0&&F[1]===0&&F[2]===0&&F[4]===0&&F[5]===0&&F[6]===0)){wn.length=0,fn.raycast(e,wn);for(let N=0;N<wn.length;N++){const O=wn[N];O.distance>=u||s&&s.distanceToPoint(O.point)<0||(u=O.distance,f=u*u,p=b)}}}fn.geometry=Qt}}}}return wn.length=0,p}}const ko={standard_lite:{maxPixelRatio:1,curveSegments:8,radialSegments:10,torusTubularSegments:10,sphereSegments:8,shadowsEnabled:!1,postProcessEnabled:!1,enableStudioEnv:!1,showSolidStructuralEdges:!0,maxHeroTextureDim:256},standard:{maxPixelRatio:1,curveSegments:10,radialSegments:14,torusTubularSegments:14,sphereSegments:12,shadowsEnabled:!1,postProcessEnabled:!1,enableStudioEnv:!1,showSolidStructuralEdges:!0,maxHeroTextureDim:512},high:{maxPixelRatio:1.5,curveSegments:14,radialSegments:18,torusTubularSegments:18,sphereSegments:16,shadowsEnabled:!1,postProcessEnabled:!1,enableStudioEnv:!0,showSolidStructuralEdges:!0,maxHeroTextureDim:512},ultra:{maxPixelRatio:2,curveSegments:18,radialSegments:22,torusTubularSegments:22,sphereSegments:20,shadowsEnabled:!0,postProcessEnabled:!1,enableStudioEnv:!0,showSolidStructuralEdges:!0,maxHeroTextureDim:1024}};function wx(i){const e=(i>>16&255)/255,t=(i>>8&255)/255,n=(i&255)/255,s=.2126*e+.7152*t+.0722*n,r=.3;if(s>=r)return i;const a=1-s/r,o=.195*a*a,l=Math.min(1,e+o*.96),c=Math.min(1,t+o*.99),d=Math.min(1,n+o*1.05);return(Math.round(l*255)&255)<<16|(Math.round(c*255)&255)<<8|Math.round(d*255)&255}function Px(i){const e=(i>>16&255)/255,t=(i>>8&255)/255,n=(i&255)/255;return .2126*e+.7152*t+.0722*n}const jc={metal_hero:{color:16777215,metalness:.9,roughness:.22,bumpTextureKey:"cnc_brushed",bumpScale:.016,ultraPhysical:{clearcoat:.32,clearcoatRoughness:.14}},matte_chassis:{color:16777215,metalness:.26,roughness:.5,stdLambert:!0,bumpTextureKey:"mg_grain",bumpScale:.025},elastomer_rubber:{color:16777215,metalness:.05,roughness:.86,stdLambert:!0,bumpTextureKey:"mg_grain",bumpScale:.04},pcb_textured:{color:16777215,metalness:.22,roughness:.42,stdLambert:!0,mapTextureKey:"hdi_pcb",bumpTextureKey:"hdi_pcb",bumpScale:.028},silicon_hero:{color:16777215,metalness:.42,roughness:.24,ultraPhysical:{clearcoat:.55,clearcoatRoughness:.14,iridescence:.45,iridescenceIOR:1.65}},gold_plating:{color:16777215,metalness:.94,roughness:.18,ultraPhysical:{clearcoat:.36,clearcoatRoughness:.12}},becu_spring:{color:16777215,metalness:.89,roughness:.23,bumpTextureKey:"cnc_brushed",bumpScale:.02,ultraPhysical:{clearcoat:.24,clearcoatRoughness:.16}},stainless_machined:{color:16777215,metalness:.9,roughness:.21,bumpTextureKey:"cnc_brushed",bumpScale:.015,ultraPhysical:{clearcoat:.3,clearcoatRoughness:.14}},matte_black_anodized:{color:16777215,metalness:.48,roughness:.46},pin_carrier_gloss:{color:16777215,metalness:.14,roughness:.26,ultraPhysical:{clearcoat:.58,clearcoatRoughness:.14}},copper_coil:{color:16777215,metalness:.88,roughness:.24,mapTextureKey:"copper_coil",bumpTextureKey:"copper_coil",bumpScale:.03,ultraPhysical:{clearcoat:.22,clearcoatRoughness:.18}},torus_seal:{color:16777215,metalness:.36,roughness:.52,stdLambert:!0},copper_thermal:{color:16777215,metalness:.9,roughness:.24,bumpTextureKey:"cnc_brushed",bumpScale:.018,ultraPhysical:{clearcoat:.26,clearcoatRoughness:.18}},brass_precision:{color:16777215,metalness:.91,roughness:.22,bumpTextureKey:"cnc_brushed",bumpScale:.016,ultraPhysical:{clearcoat:.28,clearcoatRoughness:.15}},titanium_machined:{color:16777215,metalness:.86,roughness:.27,bumpTextureKey:"cnc_brushed",bumpScale:.018,ultraPhysical:{clearcoat:.25,clearcoatRoughness:.18}},magnesium_cast:{color:16777215,metalness:.62,roughness:.44,bumpTextureKey:"mg_grain",bumpScale:.032},iron_magnetic:{color:16777215,metalness:.84,roughness:.3,bumpTextureKey:"cnc_brushed",bumpScale:.018},solder_silver:{color:16777215,metalness:.93,roughness:.16,ultraPhysical:{clearcoat:.35,clearcoatRoughness:.12}},emi_shield_metal:{color:16777215,metalness:.84,roughness:.28,bumpTextureKey:"mesh_grid",bumpScale:.022},optical_glass_clear:{color:16777215,metalness:.04,roughness:.06,transparent:!0,opacity:.34,depthWrite:!1,ultraPhysical:{clearcoat:1,clearcoatRoughness:.04,iridescence:.28,iridescenceIOR:1.48,ior:1.52,reflectivity:.9}},optical_glass_ed:{color:16777215,metalness:.05,roughness:.05,transparent:!0,opacity:.42,depthWrite:!1,ultraPhysical:{clearcoat:1,clearcoatRoughness:.04,iridescence:.42,iridescenceIOR:1.58,ior:1.56,reflectivity:.92}},optical_ar_iridescent:{color:16777215,metalness:.1,roughness:.07,transparent:!0,opacity:.46,depthWrite:!1,ultraPhysical:{clearcoat:1,clearcoatRoughness:.05,iridescence:.88,iridescenceIOR:1.72,ior:1.62,reflectivity:.95}},optical_dichroic:{color:16777215,metalness:.22,roughness:.08,transparent:!0,opacity:.54,depthWrite:!1,ultraPhysical:{clearcoat:.95,clearcoatRoughness:.05,iridescence:.95,iridescenceIOR:1.85}},glass_clear_housing:{color:16777215,metalness:.05,roughness:.08,transparent:!0,opacity:.24,depthWrite:!1,ultraPhysical:{clearcoat:.92,clearcoatRoughness:.06}},membrane_translucent:{color:16777215,metalness:.08,roughness:.24,transparent:!0,opacity:.68,depthWrite:!1,ultraPhysical:{clearcoat:.45,clearcoatRoughness:.18}},silicon_wafer_dark:{color:16777215,metalness:.52,roughness:.16,mapTextureKey:"wafer_grid",bumpTextureKey:"wafer_grid",bumpScale:.018,ultraPhysical:{clearcoat:.85,clearcoatRoughness:.08,iridescence:.65,iridescenceIOR:1.78}},silicon_photodiode:{color:16777215,metalness:.36,roughness:.18,mapTextureKey:"optical_diffraction",ultraPhysical:{clearcoat:.78,clearcoatRoughness:.1,iridescence:.72,iridescenceIOR:1.68}},silicon_dielectric:{color:16777215,metalness:.12,roughness:.28,transparent:!0,opacity:.56,depthWrite:!1,ultraPhysical:{clearcoat:.62,clearcoatRoughness:.14}},cucu_hybrid_copper:{color:16777215,metalness:.92,roughness:.17,bumpTextureKey:"wafer_grid",bumpScale:.02,ultraPhysical:{clearcoat:.34,clearcoatRoughness:.12}},cfa_gloss_filter:{color:16777215,metalness:.08,roughness:.14,transparent:!0,opacity:.78,depthWrite:!1,ultraPhysical:{clearcoat:.9,clearcoatRoughness:.08}},abf_substrate:{color:16777215,metalness:.18,roughness:.38,stdLambert:!0,bumpTextureKey:"hdi_pcb",bumpScale:.02},ic_epoxy_dark:{color:16777215,metalness:.14,roughness:.44,stdLambert:!0,bumpTextureKey:"ceramic_grain",bumpScale:.015},polyimide_fpc:{color:16777215,metalness:.24,roughness:.28,ultraPhysical:{clearcoat:.55,clearcoatRoughness:.16}},ceramic_alumina:{color:16777215,metalness:.06,roughness:.58,stdLambert:!0,bumpTextureKey:"ceramic_grain",bumpScale:.022},carbon_fiber:{color:16777215,metalness:.34,roughness:.34,mapTextureKey:"carbon_weave",bumpTextureKey:"carbon_weave",bumpScale:.028,ultraPhysical:{clearcoat:.42,clearcoatRoughness:.2}},leatherette_grip:{color:16777215,metalness:.04,roughness:.84,stdLambert:!0,bumpTextureKey:"leather_grain",bumpScale:.045},foam_felt_matte:{color:16777215,metalness:.02,roughness:.94,stdLambert:!0,bumpTextureKey:"ceramic_grain",bumpScale:.038},emissive_glow:{color:16777215,metalness:.08,roughness:.24,emissive:3900150,emissiveIntensity:.55}};function tx(i){if(i==="studio_env"){const a=new Uint8Array(32768);for(let l=0;l<64;l++){const d=(1-l/63)*Math.PI,u=Math.sin(d),f=Math.cos(d);for(let p=0;p<128;p++){const v=p/127*Math.PI*2,g=u*Math.cos(v),m=f,b=u*Math.sin(v);let M=.76+Math.max(0,m)*.24;const y=Math.max(0,g*-.517+m*.716+b*.458);M+=Math.pow(y,5)*.48;const I=Math.max(0,g*.648+m*.365+b*-.669);M+=Math.pow(I,6)*.42;const P=Math.max(0,g*.32+m*-.45+b*.83);M+=Math.pow(P,3)*.28;const R=Math.exp(-Math.pow((m+.08)*7.5,2));M*=1-R*.16;const U=Math.min(255,Math.max(0,Math.round(M*248))),T=Math.min(255,Math.max(0,Math.round(M*250))),S=Math.min(255,Math.max(0,Math.round(M*255))),C=(l*128+p)*4;a[C]=U,a[C+1]=T,a[C+2]=S,a[C+3]=255}}const o=new Ln(a,128,64,wt);return o.mapping=Cs,o.colorSpace=bt,o.minFilter=xt,o.magFilter=xt,o.generateMipmaps=!1,o.needsUpdate=!0,o.userData.__cacheKey=i,o}if(i==="studio_env_ultra"){const a=new Uint8Array(524288);for(let l=0;l<256;l++){const d=(1-l/255)*Math.PI,u=Math.sin(d),f=Math.cos(d);for(let p=0;p<512;p++){const v=p/511*Math.PI*2,g=u*Math.cos(v),m=f,b=u*Math.sin(v);let M=m>=0?.56+m*.34:.44+(1+m)*.14,y=m>=0?.59+m*.34:.46+(1+m)*.14,I=m>=0?.64+m*.34:.51+(1+m)*.15;const P=Math.exp(-Math.pow((m-.02)*5.8,2)),R=.62+.38*Math.pow(Math.abs(Math.sin(v*2+.35)),.7),U=1-P*.44*R;M*=U,y*=U,I*=U;const T=Math.exp(-Math.pow((g+.34)*2.8,2))*Math.exp(-Math.pow((m-.84)*4.5,2))*Math.exp(-Math.pow((b-.28)*2.4,2)),S=Math.pow(Math.max(0,g*-.44+m*.78+b*.44),14);M+=T*1.45+S*.95,y+=T*1.46+S*.96,I+=T*1.5+S*1;const C=Math.exp(-Math.pow((g-.78)*5.5,2))*Math.exp(-Math.pow((m-.24)*2.4,2))*Math.exp(-Math.pow((b+.52)*4,2)),F=Math.exp(-Math.pow((g+.84)*6,2))*Math.exp(-Math.pow((m-.16)*2.6,2))*Math.exp(-Math.pow((b+.36)*4.2,2));M+=C*1.15+F*.88,y+=C*1.24+F*.92,I+=C*1.42+F*1.02;const N=Math.pow(Math.max(0,g*.56+m*.28+b*.78),7);M+=N*.68,y+=N*.66,I+=N*.64;const O=Math.pow(Math.max(0,g*.18+m*-.52+b*.84),3);M+=O*.34,y+=O*.36,I+=O*.4;const $=Q=>{const X=Q/(1+Q*.32);return Math.min(255,Math.max(0,Math.round(Math.pow(Math.min(1,X),1/2.2)*255)))},G=(l*512+p)*4;a[G]=$(M),a[G+1]=$(y),a[G+2]=$(I),a[G+3]=255}}const o=new Ln(a,512,256,wt);return o.mapping=Cs,o.colorSpace=bt,o.minFilter=xt,o.magFilter=xt,o.generateMipmaps=!1,o.needsUpdate=!0,o.userData.__cacheKey=i,o}if(i==="matcap_studio_matte"||i==="matcap_studio_metal"){const r=i==="matcap_studio_metal",a=new Uint8Array(16384*4),o=Math.hypot(-.44,.72,.54),l=-.44/o,c=.72/o,d=.54/o,u=Math.hypot(.62,.24,.75),f=.62/u,p=.24/u,x=.75/u,v=Math.hypot(.66,.44,-.61),g=.66/v,m=.44/v,b=-.61/v,M=Math.hypot(l,c,d+1),y=l/M,I=c/M,P=(d+1)/M,R=Math.hypot(f,p,x+1),U=f/R,T=p/R,S=(x+1)/R;for(let F=0;F<128;F++){const N=F/127*2-1;for(let O=0;O<128;O++){const $=O/127*2-1,G=$*$+N*N;let Q=$,X=N,le;if(G>=1){const ge=1/Math.sqrt(G);Q*=ge,X*=ge,le=0}else le=Math.sqrt(1-G);const fe=X*.5+.5;let ve=.72+fe*.24,Ue=.74+fe*.24,je=.78+fe*.26;const j=Math.max(0,Q*l+X*c+le*d),ce=Math.max(0,Q*f+X*p+le*x),ye=Math.max(0,Q*g+X*m+le*b),ue=r?.72:.8;if(ve+=(j*.78+ce*.48+ye*.3)*ue,Ue+=(j*.79+ce*.49+ye*.32)*ue,je+=(j*.8+ce*.51+ye*.36)*ue,r){const ge=Math.pow(Math.max(0,Q*y+X*I+le*P),24),He=Math.pow(Math.max(0,Q*U+X*T+le*S),14),ne=Math.pow(1-le,2.6)*(.5+.5*fe);ve+=ge*.82+He*.34+ne*.36,Ue+=ge*.86+He*.36+ne*.4,je+=ge*.94+He*.4+ne*.46}else{const ge=Math.pow(1-le,2.2)*.2;ve+=ge*.95,Ue+=ge*.98,je+=ge*1.03}const Re=ge=>{const He=Math.min(1,ge/2.15);return Math.min(255,Math.max(0,Math.round(Math.pow(He,1/2.2)*255)))},Xe=(F*128+O)*4;a[Xe]=Re(ve),a[Xe+1]=Re(Ue),a[Xe+2]=Re(je),a[Xe+3]=255}}const C=new Ln(a,128,128,wt);return C.colorSpace=bt,C.minFilter=xt,C.magFilter=xt,C.generateMipmaps=!1,C.needsUpdate=!0,C.userData.__cacheKey=i,C}const e=64,t=new Uint8Array(e*e*4);for(let s=0;s<e;s++)for(let r=0;r<e;r++){const a=(s*e+r)*4,o=(Math.sin(r*12.9898+s*78.233)*43758.5453%1+1)%1;if(i==="cnc_brushed"){const l=Math.sin(s*1.35)*14+(o-.5)*18,c=Math.min(255,Math.max(0,Math.round(128+l)));t[a]=c,t[a+1]=c,t[a+2]=c,t[a+3]=255}else if(i==="mg_grain"){const l=Math.min(255,Math.max(0,Math.round(112+o*40)));t[a]=l,t[a+1]=l,t[a+2]=l,t[a+3]=255}else if(i==="hdi_pcb"){const l=r%8===0||s%12===0;r%16===4&&s%16===4?(t[a]=255,t[a+1]=242,t[a+2]=196):l?(t[a]=210,t[a+1]=244,t[a+2]=228):(t[a]=176,t[a+1]=208,t[a+2]=196),t[a+3]=255}else if(i==="copper_coil"){const l=.5+.5*Math.sin(r/e*Math.PI*16);t[a]=Math.round(202+l*50),t[a+1]=Math.round(186+l*48),t[a+2]=Math.round(170+l*44),t[a+3]=255}else if(i==="carbon_weave"){const l=(r>>2)+(s>>2)&1,c=Math.sin(l===0?(r&3)*1.2:(s&3)*1.2),d=Math.min(255,Math.max(0,Math.round(174+l*40+c*20)));t[a]=d,t[a+1]=Math.min(255,d+3),t[a+2]=Math.min(255,d+8),t[a+3]=255}else if(i==="leather_grain"){const l=Math.sin(r*.9+Math.cos(s*.85)*1.4)*Math.cos(s*.95)*32,c=Math.min(255,Math.max(0,Math.round(124+l+(o-.5)*26)));t[a]=c,t[a+1]=c,t[a+2]=c,t[a+3]=255}else if(i==="wafer_grid"){const l=r%16===0||s%16===0,c=r%4===0||s%4===0;l?(t[a]=236,t[a+1]=244,t[a+2]=255):c?(t[a]=196,t[a+1]=212,t[a+2]=232):(t[a]=172,t[a+1]=188,t[a+2]=210),t[a+3]=255}else if(i==="optical_diffraction"){const l=(r+s*.7)/e*Math.PI*4;t[a]=Math.round(186+44*Math.sin(l)),t[a+1]=Math.round(202+42*Math.sin(l+2.1)),t[a+2]=Math.round(218+34*Math.sin(l+4.2)),t[a+3]=255}else if(i==="ceramic_grain"){const l=Math.min(255,Math.max(0,Math.round(120+(o-.5)*44)));t[a]=l,t[a+1]=l,t[a+2]=l,t[a+3]=255}else if(i==="mesh_grid"){const l=r%6===0||s%6===0?192:96;t[a]=l,t[a+1]=l,t[a+2]=l,t[a+3]=255}else{const l=r%8===0||s%8===0?28:0;t[a]=182+l,t[a+1]=196+l,t[a+2]=218+l,t[a+3]=255}}const n=new Ln(t,e,e,wt);return n.wrapS=yi,n.wrapT=yi,(i==="hdi_pcb"||i==="copper_coil"||i==="silicon_die"||i==="carbon_weave"||i==="wafer_grid"||i==="optical_diffraction")&&(n.colorSpace=bt),n.minFilter=xt,n.magFilter=xt,n.generateMipmaps=!1,n.needsUpdate=!0,n.userData.__cacheKey=i,n}function Zc(i,e=8952234){const n=new Uint8Array(256),s=e>>16&255,r=e>>8&255,a=e&255;for(let l=0;l<64;l++){const c=l*4;n[c]=s,n[c+1]=r,n[c+2]=a,n[c+3]=255}const o=new Ln(n,8,8,wt);return o.colorSpace=bt,o.minFilter=xt,o.magFilter=xt,o.generateMipmaps=!1,o.needsUpdate=!0,o.userData.__cacheKey=i,o}class zr{materials=new Map;geometries=new Map;textures=new Map;acquireTexture(e){const t=this.textures.get(e);if(t)return t.refCount++,t.resource;const n=tx(e);return this.textures.set(e,{resource:n,refCount:1}),n}acquireHeroTexture(e,t,n){const s=`herotex:${e}:${n}`,r=this.textures.get(s);if(r)return r.refCount++,r.resource;let a;if(typeof document<"u"){const o=ko[n].maxHeroTextureDim,l=Math.min(1,o/Math.max(1,t.width,t.height)),c=Math.max(32,Math.round(t.width*l)),d=Math.max(32,Math.round(t.height*l)),u=document.createElement("canvas");u.width=c,u.height=d;const f=u.getContext("2d");if(f){f.save(),f.scale(c/t.width,d/t.height),t.painter(f,t.width,t.height),f.restore();const p=new nf(u);p.colorSpace=bt,p.minFilter=Gn,p.magFilter=xt,p.anisotropy=n==="ultra"?4:n==="high"?2:1,t.wrapRepeat&&(p.wrapS=yi,p.wrapT=yi),(t.repeatX||t.repeatY)&&p.repeat.set(t.repeatX??1,t.repeatY??1),p.needsUpdate=!0,a=p}else a=Zc(s,t.fallbackColor??t.baseColor??8952234)}else a=Zc(s,t.fallbackColor??t.baseColor??8952234);return a.userData.__cacheKey=s,this.textures.set(s,{resource:a,refCount:1}),a}releaseTexture(e){const t=this.textures.get(e);return t?(t.refCount--,t.refCount<=0?(t.resource.dispose(),this.textures.delete(e),!0):!1):!1}acquireGeometry(e,t){const n=this.geometries.get(e);if(n)return n.refCount++,n.resource;const s=t();return s.userData.__cacheKey=e,this.geometries.set(e,{resource:s,refCount:1}),s}releaseGeometry(e){const t=this.geometries.get(e);return t?(t.refCount--,t.refCount<=0?(t.resource.dispose(),this.geometries.delete(e),!0):!1):!1}static computeStdPhongProps(e,t,n){return n?{specular:14412542,shininess:92}:e>=.7?{specular:12110044,shininess:Math.round(Math.max(28,Math.min(96,(1-t)*95+18)))}:e>=.3?{specular:7306641,shininess:Math.round(Math.max(20,Math.min(64,(1-t)*65+14)))}:{specular:4937059,shininess:Math.round(Math.max(16,Math.min(48,(1-t)*45+12)))}}acquireMaterial(e,t,n="solid",s=[],r=!1){const a=t==="standard_lite",o=a&&n==="solid"&&r,l=`mat:${e}:${t}:${n}${o?":vc":""}`,c=s.length>0?$t:nn,d=this.materials.get(l);if(d)return d.refCount++,d.resource.clippingPlanes=s,d.resource.userData?.__managedSide&&d.resource.side!==c&&(d.resource.side=c,d.resource.needsUpdate=!0),d.resource;const u=jc[e],f=[],p=n==="xray",x=n==="cad";let v=null,g=null;!p&&!x&&(!a&&u.mapTextureKey&&(v=this.acquireTexture(u.mapTextureKey),f.push(u.mapTextureKey)),!a&&t!=="standard"&&u.bumpTextureKey&&(g=this.acquireTexture(u.bumpTextureKey),f.push(u.bumpTextureKey)));const m=p||!!(u.transparent&&!x),b=p?.24:x?u.transparent?Math.max(.42,u.opacity??.5):1:u.opacity??1,M=p?!1:x?!u.transparent:u.depthWrite??!m,y={color:x?16054010:p?14412542:u.color,clippingPlanes:s,clipShadows:t==="ultra",side:c,transparent:m||x&&!!u.transparent,opacity:b,depthWrite:M};let I;if(a){const P=p||x||u.stdLambert&&!u.transparent?"matcap_studio_matte":"matcap_studio_metal",R=this.acquireTexture(P);f.push(P);const U=new Fe(y.color);!x&&!p?U.multiplyScalar(2.08):x?U.multiplyScalar(1.56):U.multiplyScalar(1.62),I=new oc({...y,color:U,matcap:R,vertexColors:o,polygonOffset:x,polygonOffsetFactor:x?1:0,polygonOffsetUnits:x?1:0})}else if(p)I=new _r({...y,emissive:1981066,emissiveIntensity:.14});else if(x)I=new _r({...y,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1});else if(t==="standard")if(u.stdLambert&&!u.transparent)I=new _r({...y,map:v,emissive:u.emissive??0,emissiveIntensity:u.emissiveIntensity??0});else{const P=zr.computeStdPhongProps(u.metalness,u.roughness,!!u.transparent);I=new ac({...y,map:v,specular:P.specular,shininess:P.shininess,emissive:u.emissive??0,emissiveIntensity:u.emissiveIntensity??0})}else t==="ultra"&&u.ultraPhysical?I=new rc({...y,map:v,bumpMap:g,bumpScale:u.bumpScale??.02,metalness:u.metalness,roughness:u.roughness,clearcoat:u.ultraPhysical.clearcoat,clearcoatRoughness:u.ultraPhysical.clearcoatRoughness,iridescence:u.ultraPhysical.iridescence??0,iridescenceIOR:u.ultraPhysical.iridescenceIOR??1.3,ior:u.ultraPhysical.ior??1.5,reflectivity:u.ultraPhysical.reflectivity??.5,envMapIntensity:1.34,emissive:u.emissive??0,emissiveIntensity:u.emissiveIntensity??0}):I=new Oo({...y,map:v,bumpMap:g,bumpScale:u.bumpScale??.02,metalness:u.metalness,roughness:u.roughness,envMapIntensity:t==="ultra"?1.16:.95,emissive:u.emissive??0,emissiveIntensity:u.emissiveIntensity??0});return I.userData.__cacheKey=l,I.userData.__materialBucket=e,I.userData.__managedSide=!0,this.materials.set(l,{resource:I,refCount:1,depTextures:f}),I}acquireHeroMaterial(e,t,n,s="solid",r=[]){if(s!=="solid")return this.acquireMaterial(t.bucket,n,s,r);const a=`hero:${e}:${n}:${s}`,o=r.length>0?$t:nn,l=this.materials.get(a);if(l)return l.refCount++,l.resource.clippingPlanes=r,l.resource.userData?.__managedSide&&l.resource.side!==o&&(l.resource.side=o,l.resource.needsUpdate=!0),l.resource;const c=jc[t.bucket],d=`herotex:${e}:${n}`,u=this.acquireHeroTexture(e,t,n),f=[d],p=t.metalness??c.metalness,x=t.roughness??c.roughness,v=t.transparent??!!c.transparent,g=t.opacity??c.opacity??1,m=t.depthWrite??!v,b={color:t.baseColor??16777215,map:u,clippingPlanes:r,clipShadows:n==="ultra",side:o,transparent:v,opacity:g,depthWrite:m,emissive:t.emissive??c.emissive??0,emissiveIntensity:t.emissiveIntensity??c.emissiveIntensity??0};let M;if(n==="standard_lite"){const y=c.stdLambert&&!v?"matcap_studio_matte":"matcap_studio_metal",I=this.acquireTexture(y);f.push(y);const P=new Fe(b.color).multiplyScalar(1.88);M=new oc({color:P,map:u,matcap:I,clippingPlanes:r,side:o,transparent:v,opacity:g,depthWrite:m})}else if(n==="standard")if(c.stdLambert&&!v)M=new _r(b);else{const y=zr.computeStdPhongProps(p,x,v);M=new ac({...b,specular:y.specular,shininess:y.shininess})}else n==="ultra"&&c.ultraPhysical?M=new rc({...b,metalness:p,roughness:x,clearcoat:c.ultraPhysical.clearcoat,clearcoatRoughness:c.ultraPhysical.clearcoatRoughness,iridescence:c.ultraPhysical.iridescence??0,iridescenceIOR:c.ultraPhysical.iridescenceIOR??1.3,envMapIntensity:1.34}):M=new Oo({...b,metalness:p,roughness:x,envMapIntensity:n==="ultra"?1.16:.95});return M.userData.__cacheKey=a,M.userData.__materialBucket=t.bucket,M.userData.__heroKey=e,M.userData.__managedSide=!0,this.materials.set(a,{resource:M,refCount:1,depTextures:f}),M}acquireLineMaterial(e,t){const n=`line:${e}`,s=this.materials.get(n);if(s)return s.refCount++,s.resource.clippingPlanes=t.clippingPlanes??[],s.resource;const r=t.dashed?new Vf({color:t.color,dashSize:t.dashSize??1.4,gapSize:t.gapSize??.9,transparent:!0,opacity:t.opacity,vertexColors:t.vertexColors??!1,clippingPlanes:t.clippingPlanes??[]}):new $n({color:t.color,transparent:!0,opacity:t.opacity,vertexColors:t.vertexColors??!1,clippingPlanes:t.clippingPlanes??[]});return r.userData.__cacheKey=n,this.materials.set(n,{resource:r,refCount:1}),r}acquireBasicMaterial(e,t){const n=`basic:${e}`,s=this.materials.get(n);if(s)return s.refCount++,s.resource.clippingPlanes=t.clippingPlanes??[],s.resource;const r=new Wr({color:t.color,transparent:t.transparent??!1,opacity:t.opacity??1,side:t.side??nn,depthWrite:t.depthWrite??!(t.transparent??!1),clippingPlanes:t.clippingPlanes??[]});return r.userData.__cacheKey=n,this.materials.set(n,{resource:r,refCount:1}),r}acquireShadowMaterial(e,t={}){const n=`shadow:${e}`,s=this.materials.get(n);if(s)return s.refCount++,s.resource;const r=new Ff({color:t.color??988970,opacity:t.opacity??.16,transparent:!0,depthWrite:!1});return r.userData.__cacheKey=n,this.materials.set(n,{resource:r,refCount:1}),r}acquirePointsMaterial(e,t){const n=`points:${e}`,s=this.materials.get(n);if(s)return s.refCount++,s.resource.clippingPlanes=t.clippingPlanes??[],s.resource;const r=new tf({color:t.color,size:t.size,transparent:t.transparent??!0,opacity:t.opacity??.9,vertexColors:t.vertexColors??!1,clippingPlanes:t.clippingPlanes??[]});return r.userData.__cacheKey=n,this.materials.set(n,{resource:r,refCount:1}),r}releaseMaterial(e){const t=this.materials.get(e);if(!t)return!1;if(t.refCount--,t.refCount<=0){if(t.depTextures)for(let n=0;n<t.depTextures.length;n++)this.releaseTexture(t.depTextures[n]);return t.resource.dispose(),this.materials.delete(e),!0}return!1}releaseMaterialInstance(e){const t=e.userData?.__cacheKey;return t&&this.materials.has(t)?this.releaseMaterial(t):!1}releaseGeometryInstance(e){const t=e.userData?.__cacheKey;return t&&this.geometries.has(t)?this.releaseGeometry(t):!1}hasMaterial(e){return this.materials.has(e)}hasGeometry(e){return this.geometries.has(e)}updateClippingPlanes(e){const t=e.length>0?$t:nn;for(const n of this.materials.values()){const s=n.resource;s.clippingPlanes=e,s.userData?.__managedSide&&s.side!==t&&(s.side=t,s.needsUpdate=!0)}}warmupShaders(e,t,n){const s=typeof performance<"u"?performance.now():0;return e.compile(t,n),(typeof performance<"u"?performance.now():0)-s}getStats(){let e=0;for(const t of this.materials.values())e+=t.refCount;for(const t of this.geometries.values())e+=t.refCount;for(const t of this.textures.values())e+=t.refCount;return{materials:this.materials.size,geometries:this.geometries.size,textures:this.textures.size,totalRefs:e,activeMaterialKeys:Array.from(this.materials.keys()),activeGeometryKeys:Array.from(this.geometries.keys()),activeTextureKeys:Array.from(this.textures.keys())}}disposeAll(){for(const e of this.materials.values())e.resource.dispose();this.materials.clear();for(const e of this.geometries.values())e.resource.dispose();this.geometries.clear();for(const e of this.textures.values())e.resource.dispose();this.textures.clear()}}const oi=new A,Tr=new A;class nx{renderer;container;clippingPlane;callbacks;scene;lightGroup;cache=new zr;raycaster=new ex(33.3);vramMonitor=new K0;perfHud;active=!1;ready=!1;activeUnitId=null;activationToken=0;activeUnit=null;buildResult=null;partById=new Map;studioEnvRenderTarget=null;ultraKeyLight=null;ultraShadowCatcher=null;savedExternalPixelRatio=1;quality="high";renderMode="solid";explodeFactor=0;physicsActive=!1;subView=0;integratedMode=!1;selectedId=null;hoveredId=null;hiddenIds=new Set;isolatedId=null;lastDrawCalls=0;lastTriangles=0;lastFrameTimeMs=0;avgFrameTimeMs=0;frameSampleCount=0;shaderWarmupMs=0;isIdle=!0;contextLost=!1;contextLostRecoveryCount=0;constructor(e,t,n,s){this.renderer=e,this.container=t,this.clippingPlane=n,this.callbacks=s,this.scene=new Xd,this.scene.background=new Fe(16777215),this.scene.matrixAutoUpdate=!1,this.scene.updateMatrix(),this.lightGroup=new Ms,this.lightGroup.name="unit-v2-studio-lights",this.lightGroup.matrixAutoUpdate=!1,this.lightGroup.updateMatrix(),this.scene.add(this.lightGroup);const a=(typeof window<"u"?new URLSearchParams(window.location.search):null)?.get("perfhud")==="1";this.perfHud=new Z0(t,a)}isActive(){return this.active}isReady(){return this.active&&this.ready}getActiveUnitId(){return this.activeUnitId}getQuality(){return this.quality}getParts(){return this.buildResult?this.activeUnit?.getActiveParts?this.activeUnit.getActiveParts():this.buildResult.parts:[]}getAllBuiltParts(){return this.buildResult?this.buildResult.parts:[]}getPartById(e){return this.partById.get(e)??null}isPartCulledBySubView(e){return this.activeUnit?.isPartCulledBySubView?.(e)??!1}needsContinuousAnimation(e){return!this.active||!this.ready?!1:this.activeUnit?.needsContinuousAnimation?this.activeUnit.needsContinuousAnimation(e):e}getRaycastIndex(){return this.buildResult?this.buildResult.raycastIndex:null}getPartWorldBox(e,t){const n=this.buildResult?.raycastIndex;if(!n)return!1;const s=n.partBoundsById.get(e);return!s||s.worldBox.isEmpty()?!1:(t.copy(s.worldBox),!0)}setupStudioLighting(e){this.teardownStudioLighting();const t=ko[e];if(e==="standard_lite"){this.scene.environment=null,this.studioEnvRenderTarget=null;return}const n=e==="standard",s=e==="ultra",r=new zf(16777215,n?15660026:s?15265528:15594234,n?2.85:s?.96:1.08);r.position.set(0,80,0),r.matrixAutoUpdate=!1,r.updateMatrix();const a=new Ia(s?16776697:16777215,n?2.05:s?2.15:1.78);if(a.position.set(-72,112,68),a.matrixAutoUpdate=!1,a.updateMatrix(),a.target.matrixAutoUpdate=!1,a.target.updateMatrix(),s&&t.shadowsEnabled){a.castShadow=!0,a.shadow.mapSize.set(2048,2048),a.shadow.bias=-35e-5,a.shadow.normalBias=.08,a.shadow.radius=3,this.ultraKeyLight=a;const c=this.cache.acquireGeometry("ultra:shadow-catcher-plane",()=>{const f=new Vs(1,1);return f.rotateX(-Math.PI/2),f}),d=this.cache.acquireShadowMaterial("ultra-ground",{color:988970,opacity:.16}),u=new Ct(c,d);u.name="ultra-studio-shadow-catcher",u.receiveShadow=!0,u.castShadow=!1,u.matrixAutoUpdate=!1,u.updateMatrix(),u.visible=this.renderMode==="solid",this.ultraShadowCatcher=u,this.lightGroup.add(u)}const o=new Ia(16054527,n?1.45:s?.86:.92);o.position.set(66,24,86),o.matrixAutoUpdate=!1,o.updateMatrix();const l=new Ia(s?14742270:15660799,n?1.35:s?1.32:1.02);if(l.position.set(82,48,-84),l.matrixAutoUpdate=!1,l.updateMatrix(),this.lightGroup.add(r,a,a.target,o,l),this.lightGroup.updateMatrixWorld(!0),t.enableStudioEnv){const c=s?"studio_env_ultra":"studio_env",d=this.cache.acquireTexture(c),u=new Vo(this.renderer),f=u.fromEquirectangular(d);u.dispose(),this.cache.releaseTexture(c),this.studioEnvRenderTarget=f,this.scene.environment=f.texture}else this.scene.environment=null,this.studioEnvRenderTarget=null}fitUltraShadowRig(){if(this.quality!=="ultra"||!this.ultraKeyLight)return;const e=this.buildResult?.raycastIndex.unitWorldBox;if(!e||e.isEmpty())return;e.getCenter(oi),e.getSize(Tr);const t=Math.max(12,Math.hypot(Tr.x,Tr.y,Tr.z)*.56),n=this.ultraKeyLight;n.target.position.copy(oi),n.target.updateMatrix(),n.position.set(oi.x-t*1.15,oi.y+t*1.85,oi.z+t*1.05),n.updateMatrix();const s=n.shadow.camera,r=t*1.28;if(s.left=-r,s.right=r,s.top=r,s.bottom=-r,s.near=Math.max(1,t*.25),s.far=t*5.2,s.updateProjectionMatrix(),this.ultraShadowCatcher){const a=Math.max(60,t*4.8);this.ultraShadowCatcher.position.set(oi.x,e.min.y-.18,oi.z),this.ultraShadowCatcher.scale.set(a,1,a),this.ultraShadowCatcher.visible=this.renderMode==="solid",this.ultraShadowCatcher.updateMatrix()}this.lightGroup.updateMatrixWorld(!0),this.renderer.shadowMap.needsUpdate=!0}teardownStudioLighting(){this.ultraKeyLight?.shadow?.map&&(this.ultraKeyLight.shadow.map.dispose(),this.ultraKeyLight.shadow.map=null),this.ultraKeyLight=null,this.ultraShadowCatcher=null,this.lightGroup.children.length>0&&$0(this.lightGroup,this.cache,!1),this.studioEnvRenderTarget&&(this.scene.environment=null,this.studioEnvRenderTarget.dispose(),this.studioEnvRenderTarget=null)}applyQualityRendererCaps(e){const t=ko[e];this.renderer.shadowMap.enabled=t.shadowsEnabled,t.shadowsEnabled?(this.renderer.shadowMap.type=rh,this.renderer.shadowMap.autoUpdate=!1,this.renderer.shadowMap.needsUpdate=!0):this.renderer.shadowMap.autoUpdate=!1;const n=typeof window<"u"&&window.devicePixelRatio||1,s=Math.min(n,t.maxPixelRatio);this.renderer.setPixelRatio(s);const r=Math.max(1,this.container.clientWidth),a=Math.max(1,this.container.clientHeight);this.renderer.setSize(r,a)}disposeActiveUnitResources(){this.activeUnit&&(this.activeUnit.dispose(this.cache),this.activeUnit=null),this.buildResult=null,this.partById.clear(),this.ready=!1,this.teardownStudioLighting(),this.renderer.renderLists.dispose()}async activate(e,t,n,s){const r=++this.activationToken;this.active?(this.disposeActiveUnitResources(),this.vramMonitor.verifyAfterDispose(this.renderer,this.cache),this.vramMonitor.captureBaseline(this.renderer)):(this.savedExternalPixelRatio=this.renderer.getPixelRatio(),this.vramMonitor.captureBaseline(this.renderer)),this.active=!0,this.ready=!1,this.activeUnitId=e,this.quality=t,this.explodeFactor=s.explode,this.renderMode=s.renderMode,this.physicsActive=s.physicsActive,this.subView=s.subView??(e==="lens"?1:0),this.integratedMode=s.integratedMode??(e==="integrated"||e==="camera_body"),this.selectedId=null,this.hoveredId=null,this.hiddenIds=new Set,this.isolatedId=null,this.frameSampleCount=0,this.avgFrameTimeMs=0,this.perfHud.setModeVisible(!0),this.applyQualityRendererCaps(t),this.setupStudioLighting(t);try{const o=await Y0(e);if(r!==this.activationToken||!this.active)return;const l=s.sectionActive?[this.clippingPlane]:[],c=await o.build(t,this.cache,{frameBudgetMs:14,clippingPlanes:l,subView:this.subView,integratedMode:this.integratedMode,isAborted:()=>r!==this.activationToken||!this.active});if(r!==this.activationToken||!this.active){o.dispose(this.cache);return}this.activeUnit=o,this.buildResult=c,this.partById.clear();for(let d=0;d<c.parts.length;d++)this.partById.set(c.parts[d].id,c.parts[d]);this.scene.add(c.rootGroup),o.setClippingPlanes?.(l),o.setSubView?.(this.subView),o.updateExplode(this.explodeFactor,!0),o.setVisualState(this.selectedId,this.hoveredId,this.hiddenIds,this.isolatedId,this.renderMode),o.setPhysicsVisible?.(this.physicsActive),o.updateExplodeGuides?.(this.explodeFactor,!0),(this.physicsActive||o.needsContinuousAnimation?.(this.physicsActive))&&o.updatePhysics?.(0,this.explodeFactor,this.physicsActive,0),this.fitUltraShadowRig(),this.contextLost||(this.shaderWarmupMs=this.cache.warmupShaders(this.renderer,this.scene,n)),this.ready=!0,this.vramMonitor.recordActivePeak(this.renderer),this.callbacks.onBuildComplete(e,this.getParts()),this.callbacks.onRequestRender(),this.refreshHud(!0)}catch(o){r===this.activationToken&&this.active&&console.error(`[UnitV2Runtime:${e}] Unit build failed:`,o)}}deactivate(){if(this.activationToken++,!this.active)return this.vramMonitor.getLastVerification();this.active=!1,this.activeUnitId=null,this.perfHud.setModeVisible(!1),this.disposeActiveUnitResources();const e=this.vramMonitor.verifyAfterDispose(this.renderer,this.cache);this.renderer.setPixelRatio(this.savedExternalPixelRatio);const t=Math.max(1,this.container.clientWidth),n=Math.max(1,this.container.clientHeight);return this.renderer.setSize(t,n),e}async setQuality(e,t,n){if(!this.active||!this.activeUnitId){this.quality=e;return}if(this.quality===e&&this.ready)return;const s=this.activeUnitId,r=this.selectedId,a=this.hoveredId,o=new Set(this.hiddenIds),l=this.isolatedId,c=this.renderMode,d=this.explodeFactor,u=this.physicsActive,f=this.subView,p=this.integratedMode;await this.activate(s,e,t,{explode:d,renderMode:c,physicsActive:u,sectionActive:n,subView:f,integratedMode:p}),this.active&&this.ready&&this.activeUnit&&this.activeUnitId===s&&(this.selectedId=r,this.hoveredId=a,this.hiddenIds=o,this.isolatedId=l,this.activeUnit.setVisualState(this.selectedId,this.hoveredId,this.hiddenIds,this.isolatedId,this.renderMode),this.activeUnit.updateExplode(this.explodeFactor,!0),this.activeUnit.updateExplodeGuides?.(this.explodeFactor,!0),this.fitUltraShadowRig(),this.callbacks.onRequestRender(),this.refreshHud(!0))}setSubView(e){this.subView=e,!(!this.activeUnit||!this.ready)&&(this.activeUnit.setSubView?.(e),this.activeUnit.updateExplodeGuides?.(this.explodeFactor,!0),this.fitUltraShadowRig(),this.callbacks.onRequestRender(),this.refreshHud(!0))}syncExplode(e,t=!1){if(this.explodeFactor=e,!this.activeUnit||!this.ready)return!1;const n=this.activeUnit.updateExplode(e,t);return n&&(this.activeUnit.updateExplodeGuides?.(e,!0),this.fitUltraShadowRig()),n}syncVisualState(e,t,n,s,r){const a=this.isolatedId!==s||this.renderMode!==r||this.hiddenIds.size!==n.size||this.hiddenIds!==n;this.selectedId=e,this.hoveredId=t,this.hiddenIds=n,this.isolatedId=s,this.renderMode=r,!(!this.activeUnit||!this.ready)&&(this.activeUnit.setVisualState(e,t,n,s,r),a&&(this.explodeFactor>=.02&&this.activeUnit.updateExplodeGuides?.(this.explodeFactor,!0),this.quality==="ultra"&&this.fitUltraShadowRig()))}syncSectionPlane(e){!this.activeUnit||!this.ready||(this.activeUnit.setClippingPlanes?.(e?[this.clippingPlane]:[]),this.quality==="ultra"&&(this.renderer.shadowMap.needsUpdate=!0))}syncPhysicsActive(e){this.physicsActive=e,!(!this.activeUnit||!this.ready)&&(this.activeUnit.setPhysicsVisible?.(e),this.quality==="ultra"&&(this.renderer.shadowMap.needsUpdate=!0))}stepPhysics(e,t=.016){if(!this.activeUnit||!this.ready)return!1;const n=this.activeUnit.updatePhysics?.(e,this.explodeFactor,this.physicsActive,t),s=n!==!1&&(this.physicsActive||!!n);return s&&this.quality==="ultra"&&(this.renderer.shadowMap.needsUpdate=!0),s}handleResize(){this.active&&(this.applyQualityRendererCaps(this.quality),this.refreshHud(!0))}setCameraDragging(e){this.raycaster.setCameraDragging(e)}pickHover(e,t,n,s){return this.raycaster.pickHover(e,t,this.buildResult?.raycastIndex??null,r=>n(r)||this.isPartCulledBySubView(r),s)}pickClick(e,t,n,s){return this.raycaster.pickClick(e,t,this.buildResult?.raycastIndex??null,r=>n(r)||this.isPartCulledBySubView(r),s)}render(e){if(!this.active||!this.ready||this.contextLost)return;this.isIdle=!1;const t=typeof performance<"u"?performance.now():0;this.renderer.render(this.scene,e);const n=typeof performance<"u"?performance.now():0;this.lastFrameTimeMs=n-t,this.frameSampleCount++,this.frameSampleCount===1||this.frameSampleCount<=4&&this.avgFrameTimeMs>this.lastFrameTimeMs*10?this.avgFrameTimeMs=this.lastFrameTimeMs:this.avgFrameTimeMs=this.avgFrameTimeMs*.8+this.lastFrameTimeMs*.2,this.lastDrawCalls=this.renderer.info.render.calls,this.lastTriangles=this.renderer.info.render.triangles,this.vramMonitor.recordActivePeak(this.renderer),this.refreshHud(!1)}markIdle(){!this.active||this.isIdle||(this.isIdle=!0,this.refreshHud(!0))}handleContextLost(){this.contextLost=!0}async handleContextRestored(e,t){this.contextLost=!1,this.contextLostRecoveryCount++,!(!this.active||!this.activeUnitId)&&(this.quality="standard",this.callbacks.onQualityFallback("standard"),await this.activate(this.activeUnitId,"standard",e,{explode:this.explodeFactor,renderMode:this.renderMode,physicsActive:this.physicsActive,sectionActive:t,subView:this.subView,integratedMode:this.integratedMode}))}togglePerfHud(){const e=this.perfHud.toggle();return e&&this.refreshHud(!0),e}setPerfHudVisible(e){this.perfHud.setExpanded(e),e&&this.refreshHud(!0)}getDiagnostics(){const e=this.renderer.info;return{unitId:this.activeUnitId,active:this.active,ready:this.ready,quality:this.quality,pixelRatio:this.renderer.getPixelRatio(),idle:this.isIdle,drawCalls:this.lastDrawCalls,triangles:this.lastTriangles,geometries:e.memory.geometries,textures:e.memory.textures,frameTimeMs:this.lastFrameTimeMs,avgFrameTimeMs:this.avgFrameTimeMs,shaderWarmupMs:this.shaderWarmupMs,buildStats:this.buildResult?.stats??null,vramCheck:this.vramMonitor.getLastVerification(),vramSwitchCount:this.vramMonitor.getSwitchCount(),cacheStats:this.cache.getStats(),raycastDiagnostics:this.raycaster.getDiagnostics(),contextLostRecoveryCount:this.contextLostRecoveryCount,renderFrameCount:this.frameSampleCount}}refreshHud(e){const t=this.renderer.info,n={unitId:this.activeUnitId??"v2",drawCalls:this.lastDrawCalls,maxDrawCallsBudget:this.activeUnit?.getMeta().maxDrawCallsBudget??100,triangles:this.lastTriangles,geometries:t.memory.geometries,textures:t.memory.textures,frameTimeMs:this.lastFrameTimeMs,avgFrameTimeMs:this.avgFrameTimeMs,quality:this.quality,pixelRatio:this.renderer.getPixelRatio(),idle:this.isIdle,shaderWarmupMs:this.shaderWarmupMs,buildStats:this.buildResult?.stats??null,vramCheck:this.vramMonitor.getLastVerification(),vramSwitchCount:this.vramMonitor.getSwitchCount()};this.perfHud.update(n,e)}dispose(){this.deactivate(),this.cache.disposeAll(),this.perfHud.dispose()}}const ix=new Set(["integrated","camera_body"]),ka=new Gt,Ha=new A,Ar=new A;class sx{container;renderer;camera;controls;callbacks;v2Runtime;clippingPlane;pointer=new re;pointerDownPos=new re;hoverRaycastPending=!1;mode="welcome";lensSection=1;sensorFabVolume=0;renderMode="solid";quality=gi.isMobile?"standard":"high";sectionAxis="off";sectionValue=.5;targetExplode=0;currentExplode=0;physicsActive=!1;selectedPartId=null;hoveredPartId=null;isolatedPartId=null;hiddenPartIds=new Set;pendingSelectAfterHydrate=null;initialActivated=!1;camAnimActive=!1;camStartPos=new A;camEndPos=new A;camStartTarget=new A;camEndTarget=new A;camAnimT=0;resizeObserver=null;boundHandleResize=()=>this.handleResize();contextLost=!1;contextLossCount=0;pageHidden=!1;recoveryOverlay;boundVisibilityChange=()=>this.handleVisibilityChange();boundContextLost=e=>this.handleContextLost(e);boundContextRestored=()=>this.handleContextRestored();clock=new Wf;rafId=0;dirtyFrames=1;idleFrameStreak=0;disposed=!1;cachedDomRect=null;customSceneRenderer=null;constructor(e,t){this.container=e,this.callbacks=t,this.renderer=new C0({antialias:gi.antialias,alpha:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1}),this.renderer.debug.checkShaderErrors=!0,this.renderer.shadowMap.enabled=!1,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,gi.maxPixelRatio)),this.renderer.setSize(Math.max(1,e.clientWidth),Math.max(1,e.clientHeight)),this.renderer.setClearColor(16777215,1),this.renderer.localClippingEnabled=!0,this.renderer.toneMapping=ah,this.renderer.toneMappingExposure=1.15,this.renderer.outputColorSpace=bt,e.appendChild(this.renderer.domElement),this.recoveryOverlay=document.createElement("div"),this.recoveryOverlay.className="gpu-recovery-overlay",this.recoveryOverlay.setAttribute("aria-hidden","true"),this.recoveryOverlay.innerHTML='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" opacity="0.22"/><path d="M21 12a9 9 0 0 0-9-9"/></svg>',e.appendChild(this.recoveryOverlay);const n=Math.max(1,e.clientWidth)/Math.max(1,e.clientHeight);this.camera=new en(32,n,.85,4200),this.controls=new L0(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.065,this.controls.minDistance=7,this.controls.maxDistance=2600,this.controls.addEventListener("change",()=>{this.markDirty(2)}),this.clippingPlane=new Cn(new A(-1,0,0),1e4),this.v2Runtime=new nx(this.renderer,this.container,this.clippingPlane,{onBuildComplete:s=>{if(this.mode===s&&(this.v2Runtime.setSubView(this.getActiveSubViewForMode(this.mode)),this.v2Runtime.syncExplode(this.currentExplode),this.v2Runtime.syncPhysicsActive(this.physicsActive),this.v2Runtime.syncSectionPlane(this.sectionAxis!=="off"),this.v2Runtime.syncVisualState(this.selectedPartId,this.hoveredPartId,this.hiddenPartIds,this.isolatedPartId,this.renderMode),this.markDirty(2)),this.callbacks.onVisibilityChanged(),this.mode===s&&this.pendingSelectAfterHydrate&&this.v2Runtime.getPartById(this.pendingSelectAfterHydrate.partId)){const r=this.pendingSelectAfterHydrate;this.pendingSelectAfterHydrate=null,this.selectPart(r.partId,r.focusCamera)}},onRequestRender:()=>{this.markDirty(2)},onQualityFallback:s=>{this.quality=s,this.callbacks.onQualityChanged?.(s)}}),this.setCameraPreset("iso",!0),this.bindEvents(),this.wakeLoop(),queueMicrotask(()=>{!this.disposed&&!this.initialActivated&&this.activateCurrentMode()})}activateCurrentMode(){this.initialActivated=!0;const e=this.mode;this.v2Runtime.activate(e,this.quality,this.camera,{explode:this.currentExplode,renderMode:this.renderMode,physicsActive:this.physicsActive,sectionActive:this.sectionAxis!=="off",subView:this.getActiveSubViewForMode(e),integratedMode:e==="integrated"||e==="camera_body"})}isV2Mode(e=this.mode){return X0(e)}getV2Runtime(){return this.v2Runtime}getMiShoeV2Runtime(){return this.v2Runtime}getActiveSubViewForMode(e){return e==="lens"?mn.studioOpen?-1:this.lensSection:e==="sensor_fab"?this.sensorFabVolume:0}getTotalPartCount(){let e=0;for(const t of q0())ix.has(t.unitId)||(e+=t.declaredPartCount);return e}async ensureAllHydrated(){return this.getTotalPartCount()}getPartsForCurrentMode(){return this.v2Runtime.getParts()}getSelectedPart(){return this.selectedPartId?this.v2Runtime.getPartById(this.selectedPartId):null}isPartHidden(e){return this.isolatedPartId&&this.isolatedPartId!==e?!0:this.hiddenPartIds.has(e)}isIsolated(){return this.isolatedPartId!==null}hasAnyHidden(){return this.isolatedPartId!==null||this.hiddenPartIds.size>0}getMode(){return this.mode}getLensSection(){return this.lensSection}refreshVisibility(){this.v2Runtime.setSubView(this.getActiveSubViewForMode(this.mode)),this.v2Runtime.syncVisualState(this.selectedPartId,this.hoveredPartId,this.hiddenPartIds,this.isolatedPartId,this.renderMode),this.updateClippingPlane(),this.markDirty(2)}setLensSection(e,t=!1){const n=this.lensSection!==e;if(this.lensSection=e,this.mode==="lens"){if(!n&&!t){this.setCameraPreset("iso",!1);return}this.selectedPartId=null,this.hoveredPartId=null,this.isolatedPartId=null,this.hiddenPartIds.clear(),this.v2Runtime.setSubView(e),this.v2Runtime.syncVisualState(null,null,this.hiddenPartIds,null,this.renderMode),this.updateClippingPlane(),this.setCameraPreset("iso",t),this.callbacks.onSelectPart(null),this.callbacks.onHoverPart(null),this.callbacks.onVisibilityChanged()}}getSensorFabVolume(){return this.sensorFabVolume}setSensorFabVolume(e,t=!1){const n=this.sensorFabVolume!==e;if(this.sensorFabVolume=e,this.mode==="sensor_fab"){if(!n&&!t){this.setCameraPreset("iso",!1);return}this.selectedPartId=null,this.hoveredPartId=null,this.isolatedPartId=null,this.hiddenPartIds.clear(),this.v2Runtime.setSubView(e),this.v2Runtime.syncVisualState(null,null,this.hiddenPartIds,null,this.renderMode),this.updateClippingPlane(),this.setCameraPreset("iso",t),this.callbacks.onSelectPart(null),this.callbacks.onHoverPart(null),this.callbacks.onVisibilityChanged()}}setMode(e,t=!1){this.mode===e&&this.initialActivated||(this.mode=e,e==="lens"&&(this.lensSection=1),this.selectedPartId=null,this.hoveredPartId=null,this.isolatedPartId=null,this.hiddenPartIds.clear(),this.pendingSelectAfterHydrate=null,this.updateClippingPlane(),this.setCameraPreset("iso",t),this.activateCurrentMode(),this.callbacks.onSelectPart(null),this.callbacks.onHoverPart(null),this.callbacks.onVisibilityChanged())}setExplode(e,t=!1){this.targetExplode=ys.clamp(e,0,1),t&&(this.currentExplode=this.targetExplode,this.v2Runtime.syncExplode(this.currentExplode)),this.markDirty()}getExplode(){return this.targetExplode}setRenderMode(e){this.renderMode=e,this.applyVisibilityAndStyles()}setQuality(e){this.quality!==e&&(this.quality=e,this.initialActivated&&this.v2Runtime.setQuality(e,this.camera,this.sectionAxis!=="off"),this.callbacks.onQualityChanged?.(e),this.markDirty(2))}getQuality(){return this.quality}setSection(e,t){this.sectionAxis=e,typeof t=="number"&&(this.sectionValue=ys.clamp(t,0,1)),this.updateClippingPlane()}setPhysicsActive(e){this.physicsActive=e,this.v2Runtime.syncPhysicsActive(e),this.markDirty()}selectPart(e,t=!0){if(e===null)this.pendingSelectAfterHydrate=null;else{if(!this.v2Runtime.getPartById(e)){this.v2Runtime.isReady()||(this.pendingSelectAfterHydrate={partId:e,focusCamera:t});return}if(this.v2Runtime.isPartCulledBySubView(e))return;this.pendingSelectAfterHydrate=null}if(e===this.selectedPartId)return;this.selectedPartId=e,e&&this.hiddenPartIds.has(e)&&this.hiddenPartIds.delete(e),e&&this.isolatedPartId&&this.isolatedPartId!==e&&(this.isolatedPartId=e),this.applyVisibilityAndStyles();const n=this.getSelectedPart();n&&t&&this.focusOnPart(n),this.callbacks.onSelectPart(n),this.callbacks.onVisibilityChanged()}setHoveredPartFromUI(e){this.hoveredPartId!==e&&(this.hoveredPartId=e,this.applyVisibilityAndStyles())}togglePartHidden(e){if(this.isolatedPartId){const t=this.isolatedPartId;this.isolatedPartId=null,e===t&&this.hiddenPartIds.add(e)}else this.hiddenPartIds.has(e)?this.hiddenPartIds.delete(e):this.hiddenPartIds.add(e);this.selectedPartId&&this.isPartHidden(this.selectedPartId)&&(this.selectedPartId=null,this.callbacks.onSelectPart(null)),this.applyVisibilityAndStyles(),this.callbacks.onVisibilityChanged()}toggleIsolateSelected(){this.selectedPartId&&(this.isolatedPartId===this.selectedPartId?this.isolatedPartId=null:(this.isolatedPartId=this.selectedPartId,this.hiddenPartIds.delete(this.selectedPartId)),this.applyVisibilityAndStyles(),this.callbacks.onVisibilityChanged())}resetAllVisibility(){this.isolatedPartId=null,this.hiddenPartIds.clear(),this.applyVisibilityAndStyles(),this.callbacks.onVisibilityChanged()}stepSelectedPart(e){const t=this.getPartsForCurrentMode();if(t.length===0)return;const n=t.findIndex(r=>r.id===this.selectedPartId),s=n<0?0:(n+e+t.length)%t.length;this.selectPart(t[s].id,!0)}setCameraPreset(e,t=!1){const n=this.targetExplode;let s,r;if(this.mode==="welcome"?(s=228+n*142,r=new A(0,1.5,0)):this.mode==="lens"?mn.studioOpen?(s=266+n*1080,r=new A(0+n*124,-2*(1-n),80+n*160)):this.lensSection===1?(s=186+n*625,r=new A(0+n*54,-1.5+n*10,47-n*102)):this.lensSection===2?(s=198+n*665,r=new A(0+n*64,-1-n*8,76.5+n*76)):(s=212+n*795,r=new A(0+n*96,-1+n*4,108+n*212)):this.mode==="camera_body"?(s=335+n*565,r=new A(-8-n*8,3+n*9,-10-n*18)):this.mode==="lcd"?(s=174+n*635,r=new A(14-n*4,-4+n*18,-32-n*14)):this.mode==="body"?(s=290+n*515,r=new A(-6+n*14,4-n*2,0+n*12)):this.mode==="mount"?(s=188+n*515,r=new A(2+n*8,-2-n*4,25+n*38)):this.mode==="evf"?(s=140+n*380,r=new A(1.5*(1-n)-n*14,38.6+n*1.5,-16.5+n*12)):this.mode==="mainboard"?(s=192+n*340,r=new A(-18*n,0+n*2,-22-n*4)):this.mode==="shutter"?(s=194+n*565,r=new A(6+n*14,-2.5+n*0,14+n*14)):this.mode==="integrated"?(s=390+n*1290,r=new A(-8-n*6,6+n*10,34+n*96)):this.mode==="sensor"?(s=168+n*475,r=new A(10*n,-2,-4-n*46)):this.mode==="battery"?(s=104+n*492,r=new A(n*4,n*-16,n*2)):this.mode==="cfexpress"?(s=136+n*475,r=new A(0,-.8+n*1.5,n*4)):this.mode==="bionz"?(s=122+n*245,r=new A(0,-1+n*1,0)):this.mode==="bionz_v2"?(s=124+n*282,r=new A(0,.2-n*1.2,0)):this.mode==="micro_v2"?(s=114+n*270,r=new A(0,-1-n*2,0)):this.mode==="mishoe"?(s=114+n*165,r=new A(0,-1.5-n*2.5,2.5+n*4)):this.mode==="mic"?(s=94+n*336,r=new A(0,1.5-n*2.5,.5+n*1.5)):this.mode==="sensor_fab"?this.sensorFabVolume===5?(s=248+n*238,r=new A(0,-1+n*1.5,2)):this.sensorFabVolume===4?(s=252+n*240,r=new A(0,-1.5+n*1.5,6.5)):this.sensorFabVolume===3?(s=248+n*238,r=new A(0,-1.5+n*1.5,6.5)):this.sensorFabVolume===2?(s=228+n*228,r=new A(0,2+n*1.5,.5)):(s=212+n*220,r=new A(0,1.5+n*2.5,-2.5)):this.mode==="drybox"?(s=242+n*212,r=new A(0,-3.5,-2*n)):(s=96+n*235,r=new A(20*n,1.5*n,-3-n*16)),this.mode!=="welcome"&&(s*=ys.lerp(.7,.86,n)),this.camera.aspect<1){const l=this.mode==="welcome"?2.72:1.88;s*=Math.min(l,(this.mode==="welcome"?1.24:.92)/Math.max(this.camera.aspect,.44))}let a;if(this.mode==="welcome")switch(e){case"front":a=new A(0,2,s);break;case"side":a=new A(-s*.96,s*.08,s*.24);break;case"back":a=new A(s*.16,s*.12,-s*.98);break;case"iso":default:a=new A(-s*.16,s*.13,s*.98);break}else if(this.mode==="evf"){const l=n>.25?-.88:-.78,c=n>.25?.17:.24,d=n>.25?-.44:-.58;switch(e){case"front":a=new A(0,2,-s);break;case"side":a=new A(-s*1.05,4,0);break;case"back":a=new A(s*.65,s*.28,s*.72);break;case"iso":default:a=new A(s*l,s*c,s*d);break}}else if(this.mode==="mainboard"||this.mode==="lcd"){const l=this.mode==="lcd"?n>.25?.56:.42:n>.25?-.68:-.44,c=this.mode==="lcd"?n>.25?-.78:-.86:n>.25?-.66:-.84;switch(e){case"front":a=new A(0,2,-s);break;case"side":a=new A(-s*1.04,8,0);break;case"back":a=new A(s*.52,s*.3,s*.8);break;case"iso":default:a=new A(s*l,s*.26,s*c);break}}else switch(e){case"front":a=new A(0,4,s);break;case"side":a=new A(-s*1.04,8,0);break;case"back":a=new A(-s*.42,s*.26,-s*.88);break;case"iso":default:if(this.mode==="integrated"){const l=n>.25?-.82:-.62,c=n>.25?.23:.27,d=n>.25?.52:.74;a=new A(s*l,s*c,s*d)}else if(this.mode==="camera_body"){const l=n>.25?-.78:-.62,c=n>.25?.24:.27,d=n>.25?.57:.74;a=new A(s*l,s*c,s*d)}else if(this.mode==="lens"){const l=n>.25?-.84:-.68,c=n>.25?.48:.69;a=new A(s*l,s*.25,s*c)}else if(this.mode==="body"){const l=n>.25?-.74:-.64,c=n>.25?.62:.72;a=new A(s*l,s*.28,s*c)}else if(this.mode==="mount"){const l=n>.25?.8:.58,c=n>.25?.56:.76;a=new A(s*l,s*.22,s*c)}else if(this.mode==="shutter")a=new A(s*.52,s*.28,s*.81);else if(this.mode==="sensor"){const l=n>.25?.82:.64,c=n>.25?.26:.38,d=n>.25?.51:.72;a=new A(s*l,s*c,s*d)}else this.mode==="battery"||this.mode==="cfexpress"?a=new A(s*.58,s*.3,s*.76):this.mode==="bionz"?a=new A(s*.62,s*.46,s*.64):this.mode==="bionz_v2"?a=new A(s*.62,s*.36,s*.68):this.mode==="micro_v2"?a=new A(s*.64,s*.34,s*.68):this.mode==="mishoe"?a=new A(s*.58,s*.42,s*.7):this.mode==="mic"?a=new A(-s*.5,s*.36,s*.78):this.mode==="sensor_fab"?a=new A(s*.38,s*.44,s*.81):this.mode==="drybox"?a=new A(s*.56,s*.24,s*.79):a=new A(s*.68,s*.44,s*.66);break}const o=r.clone().add(a);t?(this.camAnimActive=!1,this.camera.position.copy(o),this.controls.target.copy(r),this.controls.update(),this.markDirty()):this.animateCameraTo(o,r)}focusSensorFabStage(e,t=!1){if(this.mode!=="sensor_fab")return;if(e==="overview"||e==="v1_overview"||e==="v2_overview"||e==="v3_overview"||e==="v4_overview"||e==="v5_overview"){this.setCameraPreset("iso",t);return}const n=this.targetExplode,s=this.camera.aspect<1?Math.min(2.05,1.04/Math.max(this.camera.aspect,.48)):1;let r,a;if(e==="phases"){const l=(155+n*145)*s;r=new A(0,2.2+n*12,2.5+n*5),a=new A(l*.14,l*.46,l*.88)}else if(e==="litho"){const l=(138+n*135)*s;r=new A(0,-11.5-n*26,2),a=new A(l*.22,l*.34,l*.91)}else if(e==="variants"){const l=(104+n*85)*s;r=new A(10+n*8,3.6+n*18,-24-n*24),a=new A(l*.16,l*.34,l*.92)}else if(e==="v1_photonics"){const l=(118+n*110)*s;r=new A(-19-n*14,2.8+n*12,9.5+n*14),a=new A(l*.16,l*.42,l*.89)}else if(e==="v1_archs"){const l=(122+n*95)*s;r=new A(2,3.6+n*16,-20-n*22),a=new A(l*.12,l*.34,l*.93)}else if(e==="v1_duel"){const l=(128+n*110)*s;r=new A(7+n*8,2.6+n*14,4+n*8),a=new A(l*.14,l*.42,l*.89)}else if(e==="v1_wall"){const l=(146+n*125)*s;r=new A(8+n*6,-8.5-n*18,9+n*12),a=new A(l*.18,l*.34,l*.92)}else if(e==="v2_refine"){const l=(138+n*105)*s;r=new A(0,4.2+n*10,-21.5-n*14),a=new A(l*.14,l*.34,l*.93)}else if(e==="v2_mcz"){const l=(118+n*98)*s;r=new A(-22-n*6,4.8+n*11,-2-n*2),a=new A(l*.16,l*.34,l*.93)}else if(e==="v2_wafer"){const l=(138+n*110)*s;r=new A(-4-n*4,3.2+n*10,10+n*8),a=new A(l*.15,l*.38,l*.91)}else if(e==="v2_epi_ship"){const l=(150+n*120)*s;r=new A(14+n*5,-4.5-n*4,14+n*12),a=new A(l*.16,l*.32,l*.93)}else if(e==="v3_tcad"){const l=(136+n*105)*s;r=new A(0,3.5+n*14,-29-n*16),a=new A(l*.14,l*.36,l*.92)}else if(e==="v3_layout"){const l=(140+n*108)*s;r=new A(0,3+n*11,-12-n*3),a=new A(l*.15,l*.38,l*.91)}else if(e==="v3_opc"){const l=(136+n*105)*s;r=new A(0,3.2+n*8,5+n*14),a=new A(l*.16,l*.36,l*.92)}else if(e==="v3_maskfab"){const l=(158+n*128)*s;r=new A(0,-6.2-n*18,33.5+n*14),a=new A(l*.18,l*.34,l*.92)}else if(e==="v4_sti_dti"){const l=(142+n*108)*s;r=new A(0,3.6+n*15,-29-n*16),a=new A(l*.14,l*.36,l*.92)}else if(e==="v4_ppd_mev"){const l=(146+n*112)*s;r=new A(0,3.4+n*12,-12-n*3),a=new A(l*.15,l*.38,l*.91)}else if(e==="v4_vtg_gate"){const l=(138+n*105)*s;r=new A(0,3.4+n*10,5+n*14),a=new A(l*.16,l*.36,l*.92)}else if(e==="v4_pin_sab"){const l=(158+n*125)*s;r=new A(0,-6.5-n*11,33.5+n*14),a=new A(l*.18,l*.34,l*.92)}else if(e==="v5_w_m1"){const l=(142+n*108)*s;r=new A(0,3.6+n*14,-29-n*15),a=new A(l*.14,l*.36,l*.92)}else if(e==="v5_m2_m4"){const l=(146+n*112)*s;r=new A(0,3.4+n*11,-12-n*3),a=new A(l*.15,l*.38,l*.91)}else if(e==="v5_m5_wat"){const l=(138+n*105)*s;r=new A(0,3.4+n*9,5+n*12),a=new A(l*.16,l*.36,l*.92)}else{const l=(144+n*112)*s;r=new A(0,-6.5-n*10,29+n*14),a=new A(l*.18,l*.34,l*.92)}const o=r.clone().add(a);t?(this.camAnimActive=!1,this.camera.position.copy(o),this.controls.target.copy(r),this.controls.update(),this.markDirty()):this.animateCameraTo(o,r)}focusOnPart(e){this.v2Runtime.getPartWorldBox(e.id,ka)||ka.setFromObject(e.group),ka.getCenter(Ha),Ar.subVectors(this.camera.position,this.controls.target);const t=this.mode==="micro"||this.mode==="micro_v2"||this.mode==="bionz"||this.mode==="bionz_v2"||this.mode==="mishoe"||this.mode==="mic",n=this.mode==="battery"||this.mode==="cfexpress",s=this.mode==="sensor_fab",r=this.mode==="drybox",a=t?72:s?68:r?148:n?98:this.mode==="evf"?112:this.mode==="integrated"||this.mode==="camera_body"?280:168,o=t?34:s?28:r?48:n?38:this.mode==="evf"?44:56,l=Math.min(Ar.length(),a);Ar.setLength(Math.max(l,o));const c=Ha.clone().add(Ar);this.animateCameraTo(c,Ha.clone())}wakeLoop(){this.idleFrameStreak=0,this.rafId===0&&!this.disposed&&!this.contextLost&&!this.pageHidden&&(this.clock.getDelta(),this.rafId=requestAnimationFrame(this.animate))}animateCameraTo(e,t){this.camStartPos.copy(this.camera.position),this.camEndPos.copy(e),this.camStartTarget.copy(this.controls.target),this.camEndTarget.copy(t),this.camAnimT=0,this.camAnimActive=!0,this.wakeLoop()}markDirty(e=3){this.dirtyFrames=Math.max(this.dirtyFrames,e),this.wakeLoop()}requestRenderFrame(){this.markDirty(2)}frameLensForOpticsStudio(e=!1){const t=new A(0,-36,74),n=new A(-348,56,178);this.refreshVisibility(),e?(this.camAnimActive=!1,this.camera.position.copy(n),this.controls.target.copy(t),this.controls.update(),this.markDirty()):this.animateCameraTo(n,t)}handleResize(){const e=Math.max(1,this.container.clientWidth),t=Math.max(1,this.container.clientHeight);this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.v2Runtime.handleResize(),this.cachedDomRect=this.renderer.domElement.getBoundingClientRect(),this.markDirty()}updateClippingPlane(){if(this.sectionAxis==="off"){this.clippingPlane.normal.set(-1,0,0),this.clippingPlane.constant=1e4,this.v2Runtime.syncSectionPlane(!1),this.markDirty();return}let e=-48,t=48;this.mode==="micro"?(e=-13,t=13):this.mode==="micro_v2"?(e=-16,t=16):this.mode==="battery"||this.mode==="cfexpress"?(e=-30,t=30):this.mode==="bionz"?this.sectionAxis==="x"?(e=-48,t=48):(e=-16,t=18):this.mode==="bionz_v2"?this.sectionAxis==="x"?(e=-20,t=20):(e=-16,t=18):this.mode==="mishoe"?this.sectionAxis==="x"?(e=-32,t=32):(e=-15,t=12):this.mode==="mic"?this.sectionAxis==="x"?(e=-30,t=30):(e=-16,t=20):this.mode==="sensor_fab"?this.sectionAxis==="x"?(e=-54,t=54):(e=-18,t=24):this.mode==="drybox"?this.sectionAxis==="x"?(e=-30,t=30):(e=-55,t=55):this.mode==="lens"?(e=-46,t=46):this.mode==="lcd"?this.sectionAxis==="x"?(e=-34,t=50):(e=-34,t=22):this.mode==="body"||this.mode==="camera_body"||this.mode==="integrated"?this.sectionAxis==="x"?(e=-74,t=60):(e=-42,t=64):this.mode==="mount"?this.sectionAxis==="x"?(e=-50,t=50):(e=-44,t=46):this.mode==="evf"?this.sectionAxis==="x"?(e=-24,t=24):(e=18,t=60):this.mode==="mainboard"?this.sectionAxis==="x"?(e=-50,t=50):(e=-36,t=36):this.mode==="shutter"&&(this.sectionAxis==="x"?(e=-48,t=50):(e=-35,t=35));const n=ys.lerp(e,t,this.sectionValue);this.sectionAxis==="x"?(this.clippingPlane.normal.set(-1,0,0),this.clippingPlane.constant=n):(this.clippingPlane.normal.set(0,-1,0),this.clippingPlane.constant=n),this.v2Runtime.syncSectionPlane(!0),this.markDirty()}applyVisibilityAndStyles(){this.v2Runtime.syncVisualState(this.selectedPartId,this.hoveredPartId,this.hiddenPartIds,this.isolatedPartId,this.renderMode),this.markDirty(2)}bindEvents(){const e=this.renderer.domElement;this.cachedDomRect=e.getBoundingClientRect(),this.controls.addEventListener("start",()=>{this.v2Runtime.setCameraDragging(!0),this.wakeLoop()}),this.controls.addEventListener("end",()=>{this.v2Runtime.setCameraDragging(!1)}),e.addEventListener("pointerdown",t=>{this.customSceneRenderer||(this.pointerDownPos.set(t.clientX,t.clientY),this.camAnimActive=!1,this.markDirty())}),e.addEventListener("pointermove",t=>{if(this.customSceneRenderer||t.pointerType==="touch")return;const n=this.cachedDomRect??(this.cachedDomRect=e.getBoundingClientRect());n.width<=0||n.height<=0||(this.pointer.x=(t.clientX-n.left)/n.width*2-1,this.pointer.y=-((t.clientY-n.top)/n.height)*2+1,this.hoverRaycastPending=!0,this.wakeLoop())}),e.addEventListener("pointerleave",()=>{this.customSceneRenderer||(this.hoverRaycastPending=!1,this.hoveredPartId!==null&&(this.hoveredPartId=null,this.container.classList.remove("is-hovering"),this.applyVisibilityAndStyles(),this.callbacks.onHoverPart(null)))}),e.addEventListener("pointerup",t=>{if(this.customSceneRenderer||Math.hypot(t.clientX-this.pointerDownPos.x,t.clientY-this.pointerDownPos.y)>5)return;const s=this.cachedDomRect??(this.cachedDomRect=e.getBoundingClientRect());if(s.width<=0||s.height<=0)return;this.pointer.x=(t.clientX-s.left)/s.width*2-1,this.pointer.y=-((t.clientY-s.top)/s.height)*2+1;const r=this.v2Runtime.pickClick(this.pointer,this.camera,a=>this.isPartHidden(a),this.sectionAxis!=="off"?this.clippingPlane:null);r?this.selectPart(r,!0):this.selectedPartId&&this.selectPart(null,!1)}),e.addEventListener("wheel",()=>this.wakeLoop(),{passive:!0}),e.addEventListener("touchstart",()=>this.wakeLoop(),{passive:!0}),e.addEventListener("webglcontextlost",this.boundContextLost,!1),e.addEventListener("webglcontextrestored",this.boundContextRestored,!1),document.addEventListener("visibilitychange",this.boundVisibilityChange),window.addEventListener("resize",this.boundHandleResize),document.addEventListener("fullscreenchange",this.boundHandleResize),typeof ResizeObserver<"u"&&(this.resizeObserver=new ResizeObserver(this.boundHandleResize),this.resizeObserver.observe(this.container))}getRenderer(){return this.renderer}getContainer(){return this.container}setCustomSceneRenderer(e){this.customSceneRenderer=e,this.controls.enabled=e===null,this.hoverRaycastPending=!1,this.container.classList.remove("is-hovering"),this.markDirty(3)}handleContextLost(e){e.preventDefault(),this.contextLost=!0,this.contextLossCount++,this.v2Runtime.handleContextLost(),this.recoveryOverlay.classList.add("is-visible")}handleContextRestored(){this.contextLost=!1,this.recoveryOverlay.classList.remove("is-visible"),this.cachedDomRect=this.renderer.domElement.getBoundingClientRect(),this.v2Runtime.handleContextRestored(this.camera,this.sectionAxis!=="off"),this.markDirty(2)}handleVisibilityChange(){this.pageHidden=document.hidden,!this.pageHidden&&!this.contextLost&&(this.clock.getDelta(),this.markDirty(3))}getGpuStats(){const e=this.renderer.info,t=this.v2Runtime.getDiagnostics();return{profile:gi,quality:this.quality,ultraHealthy:!0,pixelRatio:this.renderer.getPixelRatio(),contextLost:this.contextLost,contextLossCount:this.contextLossCount,calls:t.drawCalls,triangles:t.triangles,lines:e.render.lines,geometries:e.memory.geometries,textures:e.memory.textures,programs:e.programs?e.programs.length:0,hydratedParts:t.ready?this.v2Runtime.getParts().length:0,totalParts:this.getTotalPartCount(),megaBatches:0,kinematicBones:0}}updateHoverFromRaycast(){const e=this.v2Runtime.pickHover(this.pointer,this.camera,n=>this.isPartHidden(n),this.sectionAxis!=="off"?this.clippingPlane:null);if(e.skipped)return;const t=e.partId;t!==this.hoveredPartId&&(this.hoveredPartId=t,this.container.classList.toggle("is-hovering",t!==null),this.applyVisibilityAndStyles(),this.callbacks.onHoverPart(t))}animate=()=>{if(this.rafId=0,this.disposed||this.contextLost||this.pageHidden)return;const e=Math.min(this.clock.getDelta(),.05);if(this.customSceneRenderer){this.customSceneRenderer(this.renderer,e),this.dirtyFrames>0&&this.dirtyFrames--,this.rafId=requestAnimationFrame(this.animate);return}this.hoverRaycastPending&&(this.hoverRaycastPending=!1,this.updateHoverFromRaycast());const t=this.clock.getElapsedTime(),n=this.v2Runtime.needsContinuousAnimation(this.physicsActive);let s=n||this.dirtyFrames>0;const r=this.targetExplode-this.currentExplode;if(Math.abs(r)>5e-4?(this.currentExplode+=r*Math.min(1,e*10),s=!0):this.currentExplode!==this.targetExplode&&(this.currentExplode=this.targetExplode,s=!0),this.camAnimActive){this.camAnimT=Math.min(1,this.camAnimT+e*2.8);const o=1-Math.pow(1-this.camAnimT,3);this.camera.position.lerpVectors(this.camStartPos,this.camEndPos,o),this.controls.target.lerpVectors(this.camStartTarget,this.camEndTarget,o),this.camAnimT>=1&&(this.camAnimActive=!1),s=!0}this.controls.update()&&(s=!0),s?(this.idleFrameStreak=0,this.v2Runtime.syncExplode(this.currentExplode),(this.physicsActive||n)&&this.v2Runtime.stepPhysics(t,e),this.v2Runtime.render(this.camera),this.dirtyFrames>0&&this.dirtyFrames--):this.idleFrameStreak++,s||this.hoverRaycastPending||n||this.camAnimActive||this.dirtyFrames>0||this.idleFrameStreak<1?this.rafId=requestAnimationFrame(this.animate):this.v2Runtime.markIdle()};dispose(){this.disposed=!0,this.rafId!==0&&(cancelAnimationFrame(this.rafId),this.rafId=0);const e=this.renderer.domElement;e.removeEventListener("webglcontextlost",this.boundContextLost),e.removeEventListener("webglcontextrestored",this.boundContextRestored),document.removeEventListener("visibilitychange",this.boundVisibilityChange),window.removeEventListener("resize",this.boundHandleResize),document.removeEventListener("fullscreenchange",this.boundHandleResize),this.resizeObserver?.disconnect(),this.v2Runtime.dispose(),this.recoveryOverlay.remove(),this.controls.dispose(),this.renderer.dispose()}}const rx="http://www.w3.org/2000/svg";function kn(i,e="0 0 24 24"){const t=document.createElementNS(rx,"svg");return t.setAttribute("viewBox",e),t.setAttribute("aria-hidden","true"),t.innerHTML=i,t}const nt={welcome:'<path d="M12 3l2.4 5.2L20 10.5l-5.6 2.3L12 18l-2.4-5.2L4 10.5l5.6-2.3z"/><circle cx="19" cy="18" r="1.6"/>',completeCamera:'<path d="M3 9.5a2 2 0 0 1 2-2h2.2l1.6-2.5h6.4l1.6 2.5H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8z"/><circle cx="12" cy="13.5" r="3.6"/><circle cx="12" cy="13.5" r="1.2" fill="currentColor" stroke="none"/>',cameraBodyOnly:'<path d="M3 9.5a2 2 0 0 1 2-2h2.2l1.6-2.5h6.4l1.6 2.5H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8z"/><rect x="9.4" y="11.6" width="5.2" height="3.6" rx="0.6"/>',lens:'<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7.5 6.5c1.6 3.2 1.6 7.8 0 11"/><path d="M16.5 6.5c-1.6 3.2-1.6 7.8 0 11"/>',mount:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.8"/><circle cx="12" cy="5.5" r="1" fill="currentColor" stroke="none"/>',shutter:'<rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="9.5" x2="21" y2="9.5"/><line x1="3" y1="14.5" x2="21" y2="14.5"/>',sensor:'<rect x="4" y="6" width="16" height="12" rx="2"/><rect x="8" y="9" width="8" height="6" rx="0.8"/>',mainboard:'<rect x="3" y="4" width="18" height="16" rx="2"/><rect x="8.5" y="8.5" width="7" height="7" rx="1"/><line x1="8.5" y1="12" x2="5" y2="12"/><line x1="15.5" y1="12" x2="19" y2="12"/>',evf:'<path d="M5 17V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8z"/><circle cx="12" cy="12" r="3.2"/>',lcd:'<rect x="4" y="5" width="16" height="11" rx="1.6"/><path d="M9 19h6"/><path d="M12 16v3"/>',body:'<path d="M3 8.5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M7 6.5V5h10v1.5"/>',chip:'<rect x="6" y="6" width="12" height="12" rx="1.8"/><rect x="9.5" y="9.5" width="5" height="5" rx="0.5"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>',pixel:'<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>',fab:'<circle cx="12" cy="12" r="8"/><line x1="4.5" y1="12" x2="19.5" y2="12"/><line x1="12" y1="4.5" x2="12" y2="19.5"/><circle cx="12" cy="12" r="3"/>',battery:'<rect x="3" y="7" width="16" height="10" rx="2"/><line x1="21" y1="10" x2="21" y2="14"/><path d="M12 9.2l-1.8 3h2.4l-1.4 2.8"/>',card:'<path d="M6 3h9l4 4v14H6z"/><line x1="9" y1="8" x2="9" y2="11"/><line x1="12" y1="8" x2="12" y2="11"/><line x1="15" y1="8" x2="15" y2="11"/>',mishoe:'<path d="M4 17h16v2.5H4z"/><path d="M6 17V9h12v8"/><line x1="9" y1="12.5" x2="15" y2="12.5"/>',mic:'<rect x="9" y="3.5" width="6" height="10" rx="3"/><path d="M6 11a6 6 0 0 0 12 0"/><line x1="12" y1="17" x2="12" y2="20.5"/><line x1="8.5" y1="20.5" x2="15.5" y2="20.5"/>',drybox:'<rect x="4" y="3.5" width="16" height="17" rx="2"/><line x1="4" y1="12" x2="20" y2="12"/><circle cx="16.5" cy="7.5" r="1.2"/>',playground:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/>',chevronDown:'<polyline points="6 9 12 15 18 9"/>',assembled:'<rect x="7" y="7" width="10" height="10" rx="1.6"/>',exploded:'<rect x="3" y="4" width="5" height="5" rx="1"/><rect x="16" y="4" width="5" height="5" rx="1"/><rect x="3" y="15" width="5" height="5" rx="1"/><rect x="16" y="15" width="5" height="5" rx="1"/><circle cx="12" cy="12" r="2"/>',physics:'<polygon points="7 5 19 12 7 19 7 5"/>',optics:'<path d="M3 7h5l4 5 4-4h5"/><path d="M3 17h5l4-5 4 4h5"/>',resetVis:'<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',fullscreenEnter:'<path d="M4 9V4h5"/><path d="M20 9V4h-5"/><path d="M4 15v5h5"/><path d="M20 15v5h-5"/>',fullscreenExit:'<path d="M9 4v5H4"/><path d="M15 4v5h5"/><path d="M9 20v-5H4"/><path d="M15 20v-5h5"/>'},Qh=[{heading:"イントロダクション",items:[{mode:"welcome",label:"ようこそ 3D立体",sub:"220パーツ実動作CNC光学装置",icon:nt.welcome}]},{heading:"カメラ全体ビュー",items:[{mode:"integrated",label:"α7 IV 完成カメラ",sub:"レンズ装着・全統合",icon:nt.completeCamera},{mode:"camera_body",label:"カメラボディ全体",sub:"マウント開放・内部透視",icon:nt.cameraBodyOnly}]},{heading:"主要光学・メカユニット",items:[{mode:"lens",label:"50mm F1.2 GM",sub:"大口径単焦点レンズ",icon:nt.lens},{mode:"mount",label:"Eマウント機構",sub:"18mmフランジ・接点",icon:nt.mount},{mode:"shutter",label:"シャッター機構",sub:"フォーカルプレーン",icon:nt.shutter},{mode:"sensor",label:"CMOS & IBIS",sub:"33MP裏面照射・5軸",icon:nt.sensor},{mode:"mainboard",label:"メイン基板",sub:"HDI多層・高速I/O",icon:nt.mainboard},{mode:"evf",label:"EVFファインダー",sub:"368万ドットOLED",icon:nt.evf},{mode:"lcd",label:"背面液晶LCD",sub:"バリアングル機構",icon:nt.lcd},{mode:"body",label:"マグネシウム筐体",sub:"防塵防滴フレーム",icon:nt.body}]},{heading:"半導体・極超解剖",items:[{mode:"bionz",label:"BIONZ XR (V1)",sub:"画像処理SoC解剖",icon:nt.chip},{mode:"bionz_v2",label:"BIONZ XR (V2)",sub:"2nm GAA・裏面電源",icon:nt.chip},{mode:"micro",label:"ピクセル構造 (V1)",sub:"マイクロレンズ・PD",icon:nt.pixel},{mode:"micro_v2",label:"ピクセル構造 (V2)",sub:"原子・ナノ構造拡大",icon:nt.pixel},{mode:"sensor_fab",label:"センサー製造工程",sub:"全6巻・2,110工程",icon:nt.fab}]},{heading:"電源・周辺・保管",items:[{mode:"battery",label:"NP-FZ100電源",sub:"リチウムイオン電池",icon:nt.battery},{mode:"cfexpress",label:"CFexpress 4.0",sub:"PCIe高速メモリー",icon:nt.card},{mode:"mishoe",label:"MIシュー",sub:"21ピン電子インターフェース",icon:nt.mishoe},{mode:"mic",label:"ECMマイク",sub:"デジタル音響収録",icon:nt.mic},{mode:"drybox",label:"防湿庫",sub:"光学機材保存環境",icon:nt.drybox}]}],Ho=new Map;for(const i of Qh)for(const e of i.items)Ho.set(e.mode,e);const Jc={0:[{id:"overview",label:"全景"},{id:"phases",label:"工程列"},{id:"litho",label:"露光機"},{id:"variants",label:"方式比較"}],1:[{id:"v1_overview",label:"全景"},{id:"v1_photonics",label:"光電変換"},{id:"v1_archs",label:"世代構造"},{id:"v1_duel",label:"BSI対決"},{id:"v1_wall",label:"微細限界"}],2:[{id:"v2_overview",label:"全景"},{id:"v2_refine",label:"高純度精製"},{id:"v2_mcz",label:"MCZ引上"},{id:"v2_wafer",label:"研磨加工"},{id:"v2_epi_ship",label:"エピ成長"}],3:[{id:"v3_overview",label:"全景"},{id:"v3_tcad",label:"TCAD"},{id:"v3_layout",label:"設計検証"},{id:"v3_opc",label:"OPC補正"},{id:"v3_maskfab",label:"マスク製造"}],4:[{id:"v4_overview",label:"全景"},{id:"v4_sti_dti",label:"DTI分離"},{id:"v4_ppd_mev",label:"埋込PD"},{id:"v4_vtg_gate",label:"縦型TG"},{id:"v4_pin_sab",label:"ピニング"}],5:[{id:"v5_overview",label:"全景"},{id:"v5_w_m1",label:"W/M1配線"},{id:"v5_m2_m4",label:"Cu多層"},{id:"v5_m5_wat",label:"最上層WAT"},{id:"v5_hb_cmp",label:"Cu-Cu接合"}]};class ax{handlers;currentMode="welcome";currentFabVol=0;physicsActive=!1;paletteOpen=!1;assemblyTriggerBtn;assemblyIconHost;assemblyLabelEl;assemblyCountEl;paletteEl;paletteBtns=new Map;playgroundBtn;subViewHost;lensSubBar;lensSecBtns;v2SubBar;v2ToggleBtn;fabSubBar;fabVolBtns;fabStageRow;fabStageBtns=new Map;qualityBtns;camPresetBtns;explodeSlider;explodePctEl;renderModeBtns;sectionAxisBtns;sectionSliderWrap;sectionSlider;physicsBtn;opticsBtn;resetVisBtn;fullscreenBtn;constructor(e,t){this.handlers=t;const n=document.createElement("header");n.className="studio-topbar";const s=document.createElement("div");s.className="studio-topbar-left";const r=document.createElement("div");r.className="assembly-selector-wrap",this.assemblyTriggerBtn=document.createElement("button"),this.assemblyTriggerBtn.type="button",this.assemblyTriggerBtn.className="assembly-trigger-pill",this.assemblyTriggerBtn.setAttribute("aria-haspopup","true"),this.assemblyTriggerBtn.setAttribute("aria-expanded","false"),this.assemblyIconHost=document.createElement("span"),this.assemblyIconHost.className="assembly-trigger-icon",this.assemblyLabelEl=document.createElement("span"),this.assemblyLabelEl.className="assembly-trigger-label",this.assemblyCountEl=document.createElement("span"),this.assemblyCountEl.className="assembly-trigger-badge";const a=kn(nt.chevronDown);a.classList.add("assembly-trigger-chev"),this.assemblyTriggerBtn.append(this.assemblyIconHost,this.assemblyLabelEl,this.assemblyCountEl,a),this.assemblyTriggerBtn.addEventListener("click",C=>{C.stopPropagation(),this.setPaletteOpen(!this.paletteOpen)}),this.paletteEl=document.createElement("div"),this.paletteEl.className="assembly-palette-popover",this.paletteEl.setAttribute("aria-hidden","true");for(const C of Qh){const F=document.createElement("div");F.className="assembly-palette-section";const N=document.createElement("div");N.className="assembly-palette-heading",N.textContent=C.heading;const O=document.createElement("div");O.className="assembly-palette-grid";for(const $ of C.items){const G=document.createElement("button");G.type="button",G.className="assembly-palette-item",G.dataset.mode=$.mode;const Q=document.createElement("span");Q.className="assembly-palette-ic",Q.appendChild(kn($.icon));const X=document.createElement("span");X.className="assembly-palette-txt",X.innerHTML=`<strong>${$.label}</strong><em>${$.sub}</em>`,G.append(Q,X),G.addEventListener("click",()=>{this.setPaletteOpen(!1),this.syncMode($.mode),t.onModeChange($.mode)}),this.paletteBtns.set($.mode,G),O.appendChild(G)}F.append(N,O),this.paletteEl.appendChild(F)}r.append(this.assemblyTriggerBtn,this.paletteEl),this.playgroundBtn=document.createElement("button"),this.playgroundBtn.type="button",this.playgroundBtn.className="playground-cta-pill",this.playgroundBtn.title="Play Ground — 全パーツ自由CAD組立＆技術者1000点採点",this.playgroundBtn.append(kn(nt.playground));const o=document.createElement("span");o.textContent="Play Ground",this.playgroundBtn.append(o),this.playgroundBtn.addEventListener("click",()=>{this.setPaletteOpen(!1),this.handlers.onOpenPlayground?.()}),s.append(r,this.playgroundBtn),this.subViewHost=document.createElement("div"),this.subViewHost.className="studio-topbar-center",this.lensSubBar=document.createElement("div"),this.lensSubBar.className="studio-subbar is-hidden";const l=(C,F)=>{const N=document.createElement("button");return N.type="button",N.className=`studio-sub-btn${C===1?" is-active":""}`,N.textContent=F,N.addEventListener("click",()=>{this.syncLensSection(C),t.onLensSectionChange(C)}),N};this.lensSecBtns={1:l(1,"1: 後群・マウント"),2:l(2,"2: 中群・絞りXD"),3:l(3,"3: 前群・XAフード")},this.lensSubBar.append(this.lensSecBtns[1],this.lensSecBtns[2],this.lensSecBtns[3]),this.v2SubBar=document.createElement("div"),this.v2SubBar.className="studio-subbar is-hidden",this.v2ToggleBtn=document.createElement("button"),this.v2ToggleBtn.type="button",this.v2ToggleBtn.className="studio-sub-btn is-accent",this.v2ToggleBtn.textContent="V2 極超解剖へ切替",this.v2ToggleBtn.addEventListener("click",()=>{const C=this.currentMode==="micro"?"micro_v2":this.currentMode==="micro_v2"?"micro":this.currentMode==="bionz"?"bionz_v2":this.currentMode==="bionz_v2"?"bionz":null;C&&(this.syncMode(C),t.onModeChange(C))}),this.v2SubBar.appendChild(this.v2ToggleBtn),this.fabSubBar=document.createElement("div"),this.fabSubBar.className="studio-fab-subbar is-hidden";const c=document.createElement("div");c.className="studio-subbar";const d=C=>{const F=document.createElement("button");return F.type="button",F.className=`studio-sub-btn${C===0?" is-active":""}`,F.textContent=`Vol.${C}`,F.addEventListener("click",()=>{this.syncFabVolume(C),t.onSensorFabVolumeChange(C)}),F};this.fabVolBtns={0:d(0),1:d(1),2:d(2),3:d(3),4:d(4),5:d(5)},c.append(this.fabVolBtns[0],this.fabVolBtns[1],this.fabVolBtns[2],this.fabVolBtns[3],this.fabVolBtns[4],this.fabVolBtns[5]),this.fabStageRow=document.createElement("div"),this.fabStageRow.className="studio-subbar studio-fab-stages",this.fabSubBar.append(c,this.fabStageRow),this.rebuildFabStages(0),this.subViewHost.append(this.lensSubBar,this.v2SubBar,this.fabSubBar);const u=document.createElement("div");u.className="studio-topbar-right";const f=document.createElement("div");f.className="studio-seg-pill quality-pill",f.setAttribute("role","group"),f.setAttribute("aria-label","描画品質ティア");const p=(C,F,N)=>{const O=document.createElement("button");return O.type="button",O.className=`studio-seg-item quality-tier-${C}`,O.textContent=F,O.title=N,O.addEventListener("click",()=>{this.syncQuality(C),t.onQualityChange(C)}),O};this.qualityBtns={standard_lite:p("standard_lite","LITE","STD LITE — 品質100%維持＆処理負荷2倍以上低減（MatCap LUT＋頂点カラー統合）"),standard:p("standard","STD","STANDARD — 軽量シェーダー＆高コントラスト4灯スタジオ"),high:p("high","HIGH","HIGH — PBR質感＆PMREMスタジオ環境光"),ultra:p("ultra","ULTRA","ULTRA — 商業ソフトボックス反射＆2048pxリアルタイム影＋クリアコート")},f.append(this.qualityBtns.standard_lite,this.qualityBtns.standard,this.qualityBtns.high,this.qualityBtns.ultra);const x=document.createElement("div");x.className="studio-seg-pill cam-pill",x.setAttribute("role","group"),x.setAttribute("aria-label","カメラ視点");const v=(C,F)=>{const N=document.createElement("button");return N.type="button",N.className=`studio-seg-item${C==="iso"?" is-active":""}`,N.textContent=F,N.addEventListener("click",()=>{["iso","front","side","back"].forEach(O=>{this.camPresetBtns[O].classList.toggle("is-active",O===C)}),t.onCameraPreset(C)}),N};this.camPresetBtns={iso:v("iso","ISO"),front:v("front","前"),side:v("side","側"),back:v("back","背")},x.append(this.camPresetBtns.iso,this.camPresetBtns.front,this.camPresetBtns.side,this.camPresetBtns.back),u.append(f,x),n.append(s,this.subViewHost,u);const g=document.createElement("footer");g.className="studio-bottom-dock";const m=document.createElement("div");m.className="dock-cluster dock-explode";const b=document.createElement("button");b.type="button",b.className="dock-mini-ic",b.title="組立状態 (0%)",b.appendChild(kn(nt.assembled)),b.addEventListener("click",()=>{this.setExplodeValue(0),t.onExplodeChange(0)}),this.explodeSlider=document.createElement("input"),this.explodeSlider.type="range",this.explodeSlider.className="dock-slider",this.explodeSlider.min="0",this.explodeSlider.max="100",this.explodeSlider.step="1",this.explodeSlider.value="0",this.explodeSlider.setAttribute("aria-label","分解度スライダー"),this.explodeSlider.addEventListener("input",()=>{const C=Number(this.explodeSlider.value)/100;this.explodePctEl.textContent=`${Math.round(C*100)}%`,t.onExplodeChange(C)}),this.explodePctEl=document.createElement("span"),this.explodePctEl.className="dock-pct-badge",this.explodePctEl.textContent="0%";const M=document.createElement("button");M.type="button",M.className="dock-mini-ic",M.title="最大分解 (100%)",M.appendChild(kn(nt.exploded)),M.addEventListener("click",()=>{this.setExplodeValue(1),t.onExplodeChange(1)}),m.append(b,this.explodeSlider,this.explodePctEl,M);const y=document.createElement("div");y.className="studio-seg-pill dock-seg";const I=(C,F)=>{const N=document.createElement("button");return N.type="button",N.className=`studio-seg-item${C==="solid"?" is-active":""}`,N.textContent=F,N.addEventListener("click",()=>{["solid","xray","cad"].forEach(O=>this.renderModeBtns[O].classList.toggle("is-active",O===C)),t.onRenderModeChange(C)}),N};this.renderModeBtns={solid:I("solid","Solid"),xray:I("xray","X-Ray"),cad:I("cad","CAD")},y.append(this.renderModeBtns.solid,this.renderModeBtns.xray,this.renderModeBtns.cad);const P=document.createElement("div");P.className="dock-cluster dock-section";const R=document.createElement("div");R.className="studio-seg-pill dock-seg";const U=(C,F)=>{const N=document.createElement("button");return N.type="button",N.className=`studio-seg-item${C==="off"?" is-active":""}`,N.textContent=F,N.title=C==="off"?"断面カット OFF":`${F}軸 断面カット`,N.addEventListener("click",()=>{this.syncSectionAxis(C,Number(this.sectionSlider.value)/100),t.onSectionAxisChange(C)}),N};this.sectionAxisBtns={off:U("off","断面OFF"),x:U("x","X断面"),y:U("y","Y断面")},R.append(this.sectionAxisBtns.off,this.sectionAxisBtns.x,this.sectionAxisBtns.y),this.sectionSliderWrap=document.createElement("div"),this.sectionSliderWrap.className="dock-section-slider-wrap is-collapsed",this.sectionSlider=document.createElement("input"),this.sectionSlider.type="range",this.sectionSlider.className="dock-slider dock-slider-sm",this.sectionSlider.min="0",this.sectionSlider.max="100",this.sectionSlider.value="50",this.sectionSlider.setAttribute("aria-label","断面位置"),this.sectionSlider.addEventListener("input",()=>{t.onSectionValueChange(Number(this.sectionSlider.value)/100)}),this.sectionSliderWrap.appendChild(this.sectionSlider),P.append(R,this.sectionSliderWrap);const T=document.createElement("div");T.className="dock-cluster dock-actions";const S=(C,F,N="")=>{const O=document.createElement("button");return O.type="button",O.className=`dock-icon-btn ${N}`.trim(),O.title=F,O.setAttribute("aria-label",F),O.appendChild(kn(C)),O};this.physicsBtn=S(nt.physics,"物理シミュレーション・動作表示"),this.physicsBtn.addEventListener("click",()=>{this.physicsActive=!this.physicsActive,this.physicsBtn.classList.toggle("is-active",this.physicsActive),t.onPhysicsToggle(this.physicsActive)}),this.opticsBtn=S(nt.optics,"光学モーションスタジオ（レンズ光路）"),this.opticsBtn.addEventListener("click",()=>t.onOpticsStudioToggle()),this.resetVisBtn=S(nt.resetVis,"非表示パーツをすべて再表示","is-hidden-btn"),this.resetVisBtn.disabled=!0,this.resetVisBtn.addEventListener("click",()=>t.onResetVisibility()),this.fullscreenBtn=S(nt.fullscreenEnter,"全画面表示切替 (F)"),this.fullscreenBtn.addEventListener("click",()=>t.onFullscreenToggle()),T.append(this.physicsBtn,this.opticsBtn,this.resetVisBtn,this.fullscreenBtn),g.append(m,y,P,T),document.addEventListener("click",C=>{this.paletteOpen&&!r.contains(C.target)&&this.setPaletteOpen(!1)}),window.addEventListener("keydown",C=>{C.key==="Escape"&&this.paletteOpen&&this.setPaletteOpen(!1)}),e.append(n,g),this.syncMode("welcome")}setPaletteOpen(e){this.paletteOpen=e,this.paletteEl.classList.toggle("is-open",e),this.paletteEl.setAttribute("aria-hidden",e?"false":"true"),this.assemblyTriggerBtn.setAttribute("aria-expanded",e?"true":"false"),this.assemblyTriggerBtn.classList.toggle("is-open",e)}rebuildFabStages(e){this.fabStageRow.replaceChildren(),this.fabStageBtns.clear();const t=Jc[e]??Jc[0];for(let n=0;n<t.length;n++){const s=t[n],r=document.createElement("button");r.type="button",r.className=`studio-sub-btn${n===0?" is-active":""}`,r.textContent=s.label,r.addEventListener("click",()=>{this.syncFabStage(s.id),this.handlers.onSensorFabStageChange(s.id)}),this.fabStageBtns.set(s.id,r),this.fabStageRow.appendChild(r)}}syncFabVolume(e){this.currentFabVol=e,[0,1,2,3,4,5].forEach(t=>{this.fabVolBtns[t].classList.toggle("is-active",t===e)}),this.rebuildFabStages(e)}syncFabStage(e){for(const[t,n]of this.fabStageBtns.entries())n.classList.toggle("is-active",t===e)}syncLensSection(e){[1,2,3].forEach(t=>{this.lensSecBtns[t].classList.toggle("is-active",t===e)})}syncQuality(e){["standard_lite","standard","high","ultra"].forEach(t=>{this.qualityBtns[t].classList.toggle("is-active",t===e)})}setExplodeValue(e){const t=Math.round(Math.max(0,Math.min(1,e))*100);this.explodeSlider.value=String(t),this.explodePctEl.textContent=`${t}%`}syncMode(e){this.currentMode=e;const t=Ho.get(e)??Ho.get("welcome");this.assemblyIconHost.replaceChildren(kn(t.icon)),this.assemblyLabelEl.textContent=t.label;for(const[s,r]of this.paletteBtns.entries())r.classList.toggle("is-active",s===e);this.lensSubBar.classList.toggle("is-hidden",e!=="lens");const n=e==="micro"||e==="micro_v2"||e==="bionz"||e==="bionz_v2";if(this.v2SubBar.classList.toggle("is-hidden",!n),n){const s=e==="micro_v2"||e==="bionz_v2";this.v2ToggleBtn.textContent=s?"V1 標準解剖へ戻る":"V2 極超解剖へ拡大",this.v2ToggleBtn.classList.toggle("is-active",s)}this.fabSubBar.classList.toggle("is-hidden",e!=="sensor_fab"),e==="sensor_fab"&&this.syncFabVolume(this.currentFabVol),["iso","front","side","back"].forEach(s=>{this.camPresetBtns[s].classList.toggle("is-active",s==="iso")})}syncSectionAxis(e,t=.5){["off","x","y"].forEach(n=>{this.sectionAxisBtns[n].classList.toggle("is-active",n===e)}),this.sectionSliderWrap.classList.toggle("is-collapsed",e==="off"),this.sectionSlider.value=String(Math.round(Math.max(0,Math.min(1,t))*100))}syncPhysics(e){this.physicsActive=e,this.physicsBtn.classList.toggle("is-active",e)}syncOpticsStudio(e){this.opticsBtn.classList.toggle("is-active",e)}syncPlaygroundActive(e){this.playgroundBtn.classList.toggle("is-active",e)}syncFullscreen(e){this.fullscreenBtn.classList.toggle("is-active",e),this.fullscreenBtn.replaceChildren(kn(e?nt.fullscreenExit:nt.fullscreenEnter))}renderLayerRail(e,t,n,s,r){this.assemblyCountEl.textContent=e.length>0?`${e.length}p`:"",this.resetVisBtn.disabled=!r,this.resetVisBtn.classList.toggle("is-hidden-btn",!r)}syncHighlight(e,t){}}const ox=Object.freeze({__isLazyStub:!0,title:"",subtitle:"",category:"",summary:"",opticsAndPhysics:[],nextGenInnovation:"",specs:[],diagramType:"baffle"});function Cx(i){return ox}function eu(i){return!i||i.__isLazyStub===!0}const Qc=new Map,Ga=new Map;function lx(i){const e=Qc.get(i);if(e)return Promise.resolve(e);let t=Ga.get(i);if(t)return t;const n=s=>(Qc.set(i,s),Ga.delete(i),s);switch(i){case"lens":t=se(()=>import("./lensExplanations-CVIj2Kn6.js"),__vite__mapDeps([58,59,33]),import.meta.url).then(s=>n(s.LENS_EXPLANATIONS));break;case"mount":t=Promise.all([se(()=>import("./mountExplanations-BzfMkKM6.js"),__vite__mapDeps([60,59,16]),import.meta.url),se(()=>import("./mountUltra34ExplanationsA-DS-n8i88.js"),[],import.meta.url),se(()=>import("./mountUltra34ExplanationsB-C99K2WhF.js"),[],import.meta.url)]).then(([s,r,a])=>n({...s.MOUNT_EXPLANATIONS,...r.MOUNT_ULTRA34_EXPLANATIONS_A,...a.MOUNT_ULTRA34_EXPLANATIONS_B}));break;case"shutter":t=Promise.all([se(()=>import("./shutterExplanations-COwEmSMe.js"),__vite__mapDeps([61,59,19]),import.meta.url),se(()=>import("./shutterUltra34ExplanationsA-BlYeoVYD.js"),[],import.meta.url),se(()=>import("./shutterUltra34ExplanationsB-Be8hM50-.js"),[],import.meta.url),se(()=>import("./shutterUltra36ExplanationsA-Ci5eL3OG.js"),[],import.meta.url),se(()=>import("./shutterUltra36ExplanationsB-CecpLJJK.js"),[],import.meta.url)]).then(([s,r,a,o,l])=>n({...s.SHUTTER_EXPLANATIONS,...r.SHUTTER_ULTRA34_EXPLANATIONS_A,...a.SHUTTER_ULTRA34_EXPLANATIONS_B,...o.SHUTTER_ULTRA36_EXPLANATIONS_A,...l.SHUTTER_ULTRA36_EXPLANATIONS_B}));break;case"sensor":t=Promise.all([se(()=>import("./explanations-DgZKQppk.js"),__vite__mapDeps([62,43,47,59]),import.meta.url),se(()=>import("./sensorNextGenExplanations-CHPfukQ0.js"),[],import.meta.url)]).then(([s,r])=>n({...s.MACRO_EXPLANATIONS,...r.SENSOR_NEXTGEN_EXPLANATIONS}));break;case"micro":t=Promise.all([se(()=>import("./explanations-DgZKQppk.js"),__vite__mapDeps([62,43,47,59]),import.meta.url),se(()=>import("./microPixelNextGenExplanations-CR3tDPn4.js"),[],import.meta.url)]).then(([s,r])=>n({...s.MICRO_EXPLANATIONS,...r.MICRO_NEXTGEN_EXPLANATIONS}));break;case"micro_v2":t=Promise.all([se(()=>import("./microPixelV2Explanations-Ds_g-StQ.js"),__vite__mapDeps([63,50,59]),import.meta.url),se(()=>import("./microPixelV2DeepExplanations-CJhaoa5m.js"),[],import.meta.url)]).then(([s,r])=>n({...s.MICRO_V2_EXPLANATIONS,...r.MICRO_V2_DEEP_EXPLANATIONS}));break;case"mainboard":t=se(()=>import("./mainboardExplanations-CFCwOEoo.js"),__vite__mapDeps([64,59,36]),import.meta.url).then(s=>n(s.MAINBOARD_EXPLANATIONS));break;case"evf":t=se(()=>import("./evfExplanations-DI8qSmkq.js"),__vite__mapDeps([65,59,27]),import.meta.url).then(s=>n(s.EVF_EXPLANATIONS));break;case"lcd":t=Promise.all([se(()=>import("./lcdExplanations-DVJLFMAP.js"),__vite__mapDeps([66,30,59]),import.meta.url),se(()=>import("./lcdUltraOemExplanations-CI_uk3nO.js"),[],import.meta.url),se(()=>import("./lcdUltraTechExplanations-CnjedjBN.js"),[],import.meta.url),se(()=>import("./lcdUltraDeepExplanations-3u9mqkCF.js"),[],import.meta.url)]).then(([s,r,a,o])=>n({...s.LCD_EXPLANATIONS,...r.LCD_ULTRA_OEM_EXPLANATIONS,...a.LCD_ULTRA_TECH_EXPLANATIONS,...o.LCD_ULTRA_DEEP_EXPLANATIONS}));break;case"body":t=Promise.all([se(()=>import("./bodyExplanations-kgPdKIc9.js"),__vite__mapDeps([67,59,22]),import.meta.url),se(()=>import("./bodyNextGenExplanations--jRwbaL2.js"),[],import.meta.url),se(()=>import("./bodyUltra25Explanations-CYatOCbR.js"),[],import.meta.url)]).then(([s,r,a])=>n({...s.BODY_EXPLANATIONS,...r.BODY_NEXTGEN_EXPLANATIONS,...a.BODY_ULTRA25_EXPLANATIONS}));break;case"battery":t=Promise.all([se(()=>import("./batteryExplanations-BeDaaZxE.js"),__vite__mapDeps([68,59,7]),import.meta.url),se(()=>import("./batteryUltra27Explanations-D4Vs8LwE.js"),[],import.meta.url),se(()=>import("./batteryUltra30Explanations-BO5ebi-w.js"),[],import.meta.url),se(()=>import("./batteryUltra31Explanations-I-s3ieDM.js"),[],import.meta.url)]).then(([s,r,a,o])=>n({...s.BATTERY_EXPLANATIONS,...r.BATTERY_ULTRA27_EXPLANATIONS,...a.BATTERY_ULTRA30_EXPLANATIONS,...o.BATTERY_ULTRA31_EXPLANATIONS}));break;case"cfexpress":t=Promise.all([se(()=>import("./cfexpressExplanations-BMV4rYzd.js"),__vite__mapDeps([69,59,10]),import.meta.url),se(()=>import("./cfexpressUltra27Explanations-nNi1XLCz.js"),[],import.meta.url),se(()=>import("./cfexpressUltra28Explanations-xks2HbCY.js"),[],import.meta.url),se(()=>import("./cfexpressUltra29Explanations-DzCl4c2e.js"),[],import.meta.url),se(()=>import("./cfexpressUltra35Explanations-D5bgh2xi.js"),[],import.meta.url)]).then(([s,r,a,o,l])=>n({...s.CFEXPRESS_EXPLANATIONS,...r.CFEXPRESS_ULTRA27_EXPLANATIONS,...a.CFEXPRESS_ULTRA28_EXPLANATIONS,...o.CFEXPRESS_ULTRA29_EXPLANATIONS,...l.CFEXPRESS_ULTRA35_EXPLANATIONS}));break;case"bionz":t=Promise.all([se(()=>import("./bionzExplanations-DzHU2T-9.js"),__vite__mapDeps([70,59,39]),import.meta.url),se(()=>import("./bionzExtraExplanations-BPBMjZCX.js"),[],import.meta.url)]).then(([s,r])=>n({...s.BIONZ_EXPLANATIONS,...r.BIONZ_EXTRA_EXPLANATIONS}));break;case"bionz_v2":t=Promise.all([se(()=>import("./bionzV2Explanations-CEYRo8Zh.js"),__vite__mapDeps([71,59,41]),import.meta.url),se(()=>import("./bionzV2DeepExplanations-B7-A1i_E.js"),[],import.meta.url)]).then(([s,r])=>n({...s.BIONZ_V2_EXPLANATIONS,...r.BIONZ_V2_DEEP_EXPLANATIONS}));break;case"mishoe":t=se(()=>import("./miShoeExplanations-tBt7Xt7q.js"),__vite__mapDeps([72,5]),import.meta.url).then(s=>n(s.MISHOE_EXPLANATIONS));break;case"mic":t=Promise.all([se(()=>import("./micExplanations-C2aeFQw6.js"),__vite__mapDeps([73,59,12]),import.meta.url),se(()=>import("./micUltra30Explanations-CAS6Gtxe.js"),[],import.meta.url),se(()=>import("./micUltra31Explanations-Bj-XHzn_.js"),[],import.meta.url),se(()=>import("./micUltra36Explanations-801w0TLM.js"),[],import.meta.url)]).then(([s,r,a,o])=>n({...s.MIC_EXPLANATIONS,...r.MIC_ULTRA30_EXPLANATIONS,...a.MIC_ULTRA31_EXPLANATIONS,...o.MIC_ULTRA36_EXPLANATIONS}));break;case"sensor_fab":t=Promise.all([se(()=>import("./sensorFabExplanations-D2TQiUI1.js"),__vite__mapDeps([74,52,59]),import.meta.url),se(()=>import("./sensorFabVol1Explanations-Bos_lokV.js"),[],import.meta.url),se(()=>import("./sensorFabVol2Explanations-NmPUwAYx.js"),[],import.meta.url),se(()=>import("./sensorFabVol3Explanations-Ci_LGE41.js"),[],import.meta.url),se(()=>import("./sensorFabVol4Explanations-CaotSDfX.js"),[],import.meta.url),se(()=>import("./sensorFabVol5Explanations-CECl6FgB.js"),[],import.meta.url)]).then(([s,r,a,o,l,c])=>n({...s.SENSOR_FAB_EXPLANATIONS,...r.SENSOR_FAB_VOL1_EXPLANATIONS,...a.SENSOR_FAB_VOL2_EXPLANATIONS,...o.SENSOR_FAB_VOL3_EXPLANATIONS,...l.SENSOR_FAB_VOL4_EXPLANATIONS,...c.SENSOR_FAB_VOL5_EXPLANATIONS}));break;case"drybox":t=Promise.all([se(()=>import("./dryboxExplanationsA-DevzWjaY.js"),__vite__mapDeps([75,59,14]),import.meta.url),se(()=>import("./dryboxExplanationsB-0on_uNo3.js"),[],import.meta.url),se(()=>import("./dryboxExplanationsC-QzcATb7E.js"),[],import.meta.url),se(()=>import("./dryboxExplanationsD-BNU_Qg6S.js"),[],import.meta.url),se(()=>import("./dryboxExplanationsE-BxNW7Dlv.js"),[],import.meta.url),se(()=>import("./dryboxExplanationsF-BYZ4JlyK.js"),[],import.meta.url),se(()=>import("./dryboxExplanationsG-CXIZrSb1.js"),[],import.meta.url)]).then(([s,r,a,o,l,c,d])=>n({...s.DRYBOX_EXPLANATIONS_A,...r.DRYBOX_EXPLANATIONS_B,...a.DRYBOX_EXPLANATIONS_C,...o.DRYBOX_EXPLANATIONS_D,...l.DRYBOX_EXPLANATIONS_E,...c.DRYBOX_EXPLANATIONS_F,...d.DRYBOX_EXPLANATIONS_G}));break;case"welcome":t=Promise.resolve(n({}));break}return Ga.set(i,t),t}async function cx(i){if(!eu(i.explanation))return i.explanation;const t=(await lx(i.subsystem))[i.id];return t?(i.explanation=t,t):i.explanation}let _i=null,Wa=null;function eh(){return _i?Promise.resolve(_i):(Wa||(Wa=se(()=>import("./schematicsRegistry-DRP4-kjo.js"),[],import.meta.url).then(i=>(_i=i.renderSchematicSvg,_i))),Wa)}const hx="http://www.w3.org/2000/svg";function tu(i,e="0 0 24 24"){const t=document.createElementNS(hx,"svg");return t.setAttribute("viewBox",e),t.innerHTML=i,t}function Wi(i,e=""){const t=document.createElement("button");return t.type="button",t.className="icon-btn",e&&(t.title=e,t.setAttribute("aria-label",e)),t.appendChild(tu(i)),t}const li={prev:'<polyline points="15 18 9 12 15 6"/>',next:'<polyline points="9 18 15 12 9 6"/>',isolate:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/>',hide:'<path d="M3 3l18 18"/><path d="M10.6 10.6a2.5 2.5 0 0 0 3.5 3.5"/><path d="M6.4 6.7C4 8.2 2.4 10.5 2 12c1.2 3.2 5 6.5 10 6.5 1.8 0 3.5-.5 4.9-1.2"/><path d="M9.8 5.7A10.6 10.6 0 0 1 12 5.5c5 0 8.8 3.3 10 6.5-.4 1.1-1.2 2.4-2.4 3.6"/>',close:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',rotate:'<path d="M21 12a9 9 0 1 1-2.64-6.36"/><polyline points="21 3 21 9 15 9"/>'};function ux(i){return i.includes("ed")||i.includes("flint")||i.includes("focus-b-front")||i.includes("uv-cement")?"ed_chromatic":i.includes("xa")||i.includes("rear-element")||i.includes("rear-cell-spacer")||i.includes("front-meniscus")||i.includes("retaining-rings")||i.includes("potting")||i.includes("phase-align")?"xa_aspheric":i.includes("xd")||i.includes("focus-")||i.includes("guide")||i.includes("antirot")||i.includes("mr-")||i.includes("af-origin")||i.includes("mf-")||i.includes("control-rings")||i.includes("iris-iso-fpc")||i.includes("reinforcing-plates")||i.includes("center-join-ring")||i.includes("clutch-ball-rollers")?"floating_xd":i.includes("hood")||i.includes("baffle")||i.includes("filter")||i.includes("optical-spacers")||i.includes("lighttrap-tube")||i.includes("fluorine")||i.includes("nano-ar")||i.includes("sumi")||i.includes("lightfoil")?"nano_ar_baffle":"aperture_bokeh"}class dx{drawerEl;swatchEl;isolateBtn;tabBtns;bodyEl;lightboxEl;lightboxPanelEl;lightboxTitleEl;lightboxViewportEl;lightboxCanvasEl;lightboxZoomLabelEl;lightboxRotateBtn;handlers;renderSeq=0;activeTab="all";latestTitle="";latestSvg="";lbScale=1;lbPanX=0;lbPanY=0;lbRotated=!1;activePointers=new Map;pinchStartDist=0;pinchStartScale=1;dragLastX=0;dragLastY=0;lastTapMs=0;constructor(e,t){this.handlers=t,this.drawerEl=document.createElement("aside"),this.drawerEl.className="explanation-drawer",this.drawerEl.dataset.viewTab="all",this.drawerEl.setAttribute("aria-hidden","true");const n=document.createElement("div");n.className="drawer-mobile-handle",n.setAttribute("aria-hidden","true");const s=document.createElement("div");s.className="drawer-toolbar";const r=document.createElement("div");r.className="drawer-toolbar-left",this.swatchEl=document.createElement("span"),this.swatchEl.className="drawer-swatch-pill";const a=Wi(li.prev,"前のパーツ"),o=Wi(li.next,"次のパーツ");a.addEventListener("click",t.onPrev),o.addEventListener("click",t.onNext),r.append(this.swatchEl,a,o);const l=document.createElement("div");l.className="drawer-toolbar-right",this.isolateBtn=Wi(li.isolate,"このパーツのみ単独表示"),this.isolateBtn.addEventListener("click",t.onToggleIsolate);const c=Wi(li.hide,"このパーツを一時非表示");c.addEventListener("click",t.onHideCurrent);const d=Wi(li.close,"閉じる");d.addEventListener("click",t.onClose),l.append(this.isolateBtn,c,d),s.append(r,l);const u=document.createElement("div");u.className="drawer-tab-bar",u.setAttribute("role","tablist");const f=(y,I)=>{const P=document.createElement("button");return P.type="button",P.className=`drawer-tab-btn${y==="all"?" is-active":""}`,P.setAttribute("role","tab"),P.textContent=I,P.addEventListener("click",()=>this.setViewTab(y)),P};this.tabBtns={all:f("all","すべて"),diagram:f("diagram","図説"),explanation:f("explanation","解説")},u.append(this.tabBtns.all,this.tabBtns.diagram,this.tabBtns.explanation),this.bodyEl=document.createElement("div"),this.bodyEl.className="drawer-body",this.drawerEl.append(n,s,u,this.bodyEl),e.appendChild(this.drawerEl),this.lightboxEl=document.createElement("div"),this.lightboxEl.className="schematic-lightbox",this.lightboxEl.setAttribute("aria-hidden","true"),this.lightboxPanelEl=document.createElement("div"),this.lightboxPanelEl.className="schematic-lightbox-panel schematic-lightbox-card";const p=document.createElement("div");p.className="schematic-lightbox-header",this.lightboxTitleEl=document.createElement("div"),this.lightboxTitleEl.className="schematic-lightbox-title";const x=Wi(li.close,"図説拡大を閉じる");x.addEventListener("click",()=>this.closeLightbox()),p.append(this.lightboxTitleEl,x),this.lightboxViewportEl=document.createElement("div"),this.lightboxViewportEl.className="schematic-lightbox-viewport schematic-lightbox-stage",this.lightboxCanvasEl=document.createElement("div"),this.lightboxCanvasEl.className="schematic-lightbox-canvas",this.lightboxViewportEl.appendChild(this.lightboxCanvasEl);const v=document.createElement("div");v.className="schematic-lightbox-controls";const g=document.createElement("button");g.type="button",g.className="lb-ctrl-btn",g.textContent="−",g.title="縮小",g.addEventListener("click",()=>this.stepLightboxZoom(-.35)),this.lightboxZoomLabelEl=document.createElement("button"),this.lightboxZoomLabelEl.type="button",this.lightboxZoomLabelEl.className="lb-ctrl-btn lb-ctrl-reset",this.lightboxZoomLabelEl.textContent="100%",this.lightboxZoomLabelEl.title="倍率リセット",this.lightboxZoomLabelEl.addEventListener("click",()=>this.resetLightboxTransform());const m=document.createElement("button");m.type="button",m.className="lb-ctrl-btn",m.textContent="＋",m.title="拡大",m.addEventListener("click",()=>this.stepLightboxZoom(.4));const b=document.createElement("button");b.type="button",b.className="lb-ctrl-btn lb-ctrl-accent",b.textContent="見やすい 1.8×",b.title="スマホで文字が読みやすい1.8倍ズーム切替",b.addEventListener("click",()=>{Math.abs(this.lbScale-1.8)<.15?this.resetLightboxTransform():(this.lbScale=1.8,this.lbPanX=0,this.lbPanY=0,this.applyLightboxTransform())}),this.lightboxRotateBtn=document.createElement("button"),this.lightboxRotateBtn.type="button",this.lightboxRotateBtn.className="lb-ctrl-btn lb-ctrl-rotate",this.lightboxRotateBtn.append(tu(li.rotate));const M=document.createElement("span");M.textContent="90°回転",this.lightboxRotateBtn.append(M),this.lightboxRotateBtn.title="縦長スマホ画面いっぱいに90°横向き回転表示",this.lightboxRotateBtn.addEventListener("click",()=>{this.lbRotated=!this.lbRotated,this.lbScale=1,this.lbPanX=0,this.lbPanY=0,this.applyLightboxTransform()}),v.append(g,this.lightboxZoomLabelEl,m,b,this.lightboxRotateBtn),this.lightboxPanelEl.append(p,this.lightboxViewportEl,v),this.lightboxEl.appendChild(this.lightboxPanelEl),this.bindLightboxGestures(),this.lightboxEl.addEventListener("click",y=>{y.target===this.lightboxEl&&this.closeLightbox()}),window.addEventListener("keydown",y=>{y.key==="Escape"&&this.lightboxEl.classList.contains("is-open")&&this.closeLightbox()}),e.appendChild(this.lightboxEl)}bindLightboxGestures(){const e=this.lightboxViewportEl;e.addEventListener("pointerdown",n=>{if(e.setPointerCapture(n.pointerId),this.activePointers.set(n.pointerId,{x:n.clientX,y:n.clientY}),this.activePointers.size===1){const s=performance.now();s-this.lastTapMs<280?(this.lbScale>1.25?this.resetLightboxTransform():(this.lbScale=1.85,this.lbPanX=0,this.lbPanY=0,this.applyLightboxTransform()),this.lastTapMs=0):this.lastTapMs=s,this.dragLastX=n.clientX,this.dragLastY=n.clientY}else if(this.activePointers.size===2){const s=Array.from(this.activePointers.values());this.pinchStartDist=Math.hypot(s[1].x-s[0].x,s[1].y-s[0].y)||1,this.pinchStartScale=this.lbScale}}),e.addEventListener("pointermove",n=>{if(this.activePointers.has(n.pointerId)){if(this.activePointers.set(n.pointerId,{x:n.clientX,y:n.clientY}),this.activePointers.size===2){const s=Array.from(this.activePointers.values()),r=Math.hypot(s[1].x-s[0].x,s[1].y-s[0].y)||1;this.lbScale=Math.max(.8,Math.min(4.5,this.pinchStartScale*(r/this.pinchStartDist))),this.applyLightboxTransform()}else if(this.activePointers.size===1){const s=n.clientX-this.dragLastX,r=n.clientY-this.dragLastY;this.dragLastX=n.clientX,this.dragLastY=n.clientY,(this.lbScale>1.02||this.lbRotated)&&(this.lbPanX+=s,this.lbPanY+=r,this.applyLightboxTransform())}}});const t=n=>{if(this.activePointers.delete(n.pointerId),this.activePointers.size===1){const s=Array.from(this.activePointers.values())[0];this.dragLastX=s.x,this.dragLastY=s.y}};e.addEventListener("pointerup",t),e.addEventListener("pointercancel",t),e.addEventListener("wheel",n=>{n.preventDefault();const s=n.deltaY<0?.22:-.22;this.stepLightboxZoom(s)},{passive:!1})}stepLightboxZoom(e){this.lbScale=Math.max(.8,Math.min(4.5,this.lbScale+e)),this.lbScale<=1.01&&(this.lbPanX=0,this.lbPanY=0),this.applyLightboxTransform()}resetLightboxTransform(){this.lbScale=1,this.lbPanX=0,this.lbPanY=0,this.applyLightboxTransform()}applyLightboxTransform(){const e=420*this.lbScale;this.lbPanX=Math.max(-e,Math.min(e,this.lbPanX)),this.lbPanY=Math.max(-e,Math.min(e,this.lbPanY)),this.lightboxPanelEl.classList.toggle("is-rotated",this.lbRotated),this.lightboxRotateBtn.classList.toggle("is-active",this.lbRotated);const t=this.lbRotated?" rotate(90deg)":"";this.lightboxCanvasEl.style.transform=`translate3d(${this.lbPanX.toFixed(1)}px, ${this.lbPanY.toFixed(1)}px, 0) scale(${this.lbScale.toFixed(3)})${t}`,this.lightboxZoomLabelEl.textContent=`${Math.round(this.lbScale*100)}%`}getViewTab(){return this.activeTab}setViewTab(e){this.activeTab=e,this.drawerEl.dataset.viewTab=e,["all","diagram","explanation"].forEach(t=>{this.tabBtns[t].classList.toggle("is-active",t===e),this.tabBtns[t].setAttribute("aria-selected",t===e?"true":"false")}),this.bodyEl.scrollTop=0}setLightboxOpen(e,t=!1){if(!e){this.closeLightbox();return}this.latestSvg&&this.openLightbox(this.latestTitle,this.latestSvg,t)}openLightbox(e,t,n=!1){if(!t)return;const s=t.replace(/\bid="([^"]+)"/g,'id="$1-lb"').replace(/url\(#([^)]+)\)/g,"url(#$1-lb)");this.lightboxTitleEl.textContent=e,this.lightboxCanvasEl.innerHTML=s,this.lbScale=1,this.lbPanX=0,this.lbPanY=0,this.lbRotated=n,this.activePointers.clear(),this.applyLightboxTransform(),this.lightboxEl.classList.add("is-open"),this.lightboxEl.setAttribute("aria-hidden","false")}closeLightbox(){this.lightboxEl.classList.remove("is-open"),this.lightboxEl.setAttribute("aria-hidden","true"),this.lightboxCanvasEl.replaceChildren(),this.activePointers.clear()}renderPopulatedPart(e,t,n){const s=t.specs.map(R=>`
          <div class="exp-spec-row">
            <span class="exp-spec-label">${R.label}</span>
            <span class="exp-spec-value">${R.value}</span>
          </div>`).join(""),r=t.opticsAndPhysics.map(R=>`<li>${R}</li>`).join(""),a=t.plainAnalogy?`
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
        </button>`:"",c=this.handlers.onSwitchMode?e.subsystem==="micro"?{target:"micro_v2",label:"V2 極超解剖図へ（さらに微細な原子・ナノ構造を拡大）",isV2Target:!0}:e.subsystem==="micro_v2"?{target:"micro",label:"V1 ピクセル配列図へ戻る",isV2Target:!1}:e.subsystem==="bionz"?{target:"bionz_v2",label:"V2 極超解剖図へ（2nm GAA・裏面電源を極超拡大）",isV2Target:!0}:e.subsystem==="bionz_v2"?{target:"bionz",label:"V1 BIONZ XR パッケージ図へ戻る",isV2Target:!1}:e.subsystem==="sensor"?{target:"sensor_fab",label:"センサー製造工程（全2,110工程 3D解剖図）を見る",isV2Target:!0}:e.subsystem==="sensor_fab"?e.id==="fab0-p11-sensor-unit-ibis"||e.id==="fab0-p09-dicing-package"?{target:"sensor",label:"フルサイズセンサー ＆ 5軸IBIS 3D解剖図へ移動",isV2Target:!1}:e.id==="fab0-p12-camera-integration"?{target:"integrated",label:"完成ミラーレス一眼カメラ全体 3D解剖図へ移動",isV2Target:!1}:{target:"micro_v2",label:"ピクセル極超解剖図 V2（ナノ構造拡大）へ移動",isV2Target:!0}:e.subsystem==="drybox"&&e.id==="db-camera-lens-showcase"?{target:"integrated",label:"収納カメラ本体＆50mm F1.2 全体3D解剖図へ移動",isV2Target:!1}:null:null,d=c?`
        <button type="button" class="exp-optics-cta exp-v2-cta exp-block-text${c.isV2Target?" is-v2-target":""}" data-switch-mode="${c.target}">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            ${c.isV2Target?'<path d="M12 2.5l2.1 6.2 6.4 3.3-6.4 3.3L12 21.5l-2.1-6.2-6.4-3.3 6.4-3.3z"/>':'<polyline points="15 18 9 12 15 6"/><line x1="9" y1="12" x2="20" y2="12"/>'}
          </svg>
          <span>${c.label}</span>
        </button>`:"",u=this.handlers.onSwitchFabVolume&&e.subsystem==="sensor_fab"?(e.fabVolume??0)===0?{targetVol:1,label:"第1巻：超入門・センサーのしくみと2026年最新アーキテクチャへ進む"}:(e.fabVolume??0)===1?{targetVol:2,label:"第2巻：フェーズ1 砂から超純度エピタキシャルウェーハまで（全60工程）へ進む"}:(e.fabVolume??0)===2?{targetVol:3,label:"第3巻：フェーズ2 センサー設計とフォトマスク製造（全50工程・96枚）へ進む"}:(e.fabVolume??0)===3?{targetVol:4,label:"第4巻：フェーズ3 画素ウェーハ前工程FEOL（全380工程・25マスク）へ進む"}:(e.fabVolume??0)===4?{targetVol:5,label:"第5巻：フェーズ4 画素ウェーハ配線工程BEOL（全210工程・Cu5＋Al1）へ進む"}:{targetVol:0,label:"第0巻：全2,110工程マップ（P1–P12・L01–L12）へ戻る"}:null,f=u?`
        <button type="button" class="exp-optics-cta exp-block-text" data-switch-fab-vol="${u.targetVol}">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4" y="4" width="16" height="16" rx="2.5"/>
            <path d="M9 8h6M9 12h6M9 16h4"/>
          </svg>
          <span>${u.label}</span>
        </button>`:"",p=_i?_i(t.diagramType):"",x=R=>R.includes('data-evf-hd="1"')||R.includes('data-lcd-hd="1"')||R.includes('data-fab-hd="1"')||R.includes("data-bionz-diagram=")||R.includes('data-sensor-hd="1"')||R.includes('data-mount-hd="1"')||R.includes('data-shutter-hd="1"')||R.includes('data-drybox-hd="1"')||R.includes('data-welcome-hd="1"'),v=x(p),g=t.references&&t.references.length>0?`
      <div class="exp-section exp-block-text exp-references-section">
        <div class="exp-section-heading">出典・準拠規格・技術リファレンス</div>
        <ol class="exp-ref-list">
          ${t.references.map((R,U)=>`<li class="exp-ref-item"><span class="exp-ref-idx">[${U+1}]</span><span class="exp-ref-text">${R}</span></li>`).join("")}
        </ol>
      </div>`:"";this.latestTitle=t.title,this.latestSvg=p,this.bodyEl.innerHTML=`
      <div class="exp-header-block">
        <div class="exp-category">${t.category}</div>
        <h2 class="exp-title">${t.title}</h2>
        <div class="exp-subtitle">${t.subtitle}</div>
      </div>

      <div class="schematic-stage exp-diagram-box${v?" is-hd-schematic":""}" data-schematic-box>
        <div class="exp-diagram-content" data-schematic-content role="button" tabindex="0" title="タップしてピンチ拡大・横向き全画面">${p}</div>
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
      ${f}
      ${d}

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

      ${g}
    `;const m=this.bodyEl.querySelector("[data-schematic-box]"),b=this.bodyEl.querySelector("[data-schematic-content]");!_i&&m&&b&&eh().then(R=>{n!==this.renderSeq||!m.isConnected||(this.latestSvg=R(t.diagramType),b.innerHTML=this.latestSvg,m.classList.toggle("is-hd-schematic",x(this.latestSvg)))});const M=(R=!1)=>{this.latestSvg&&this.openLightbox(t.title,this.latestSvg,R)};b?.addEventListener("click",()=>M(!1)),b?.addEventListener("keydown",R=>{(R.key==="Enter"||R.key===" ")&&(R.preventDefault(),M(!1))}),this.bodyEl.querySelector("[data-diagram-open-zoom]")?.addEventListener("click",()=>M(!1)),this.bodyEl.querySelector("[data-diagram-open-landscape]")?.addEventListener("click",()=>M(!0));const y=this.bodyEl.querySelector("[data-open-optics-motion]");y&&this.handlers.onOpenOpticsMotion&&y.addEventListener("click",()=>{this.handlers.onOpenOpticsMotion?.(ux(e.id),e.id)});const I=this.bodyEl.querySelector("[data-switch-fab-vol]");I&&u&&this.handlers.onSwitchFabVolume&&I.addEventListener("click",()=>{this.handlers.onSwitchFabVolume?.(u.targetVol)});const P=this.bodyEl.querySelector("[data-switch-mode]");P&&c&&this.handlers.onSwitchMode&&P.addEventListener("click",()=>{this.handlers.onSwitchMode?.(c.target)}),this.bodyEl.scrollTop=0}show(e,t){const n=++this.renderSeq;if(this.swatchEl.style.backgroundColor=e.swatchColor,this.isolateBtn.classList.toggle("is-active",t),this.drawerEl.classList.add("is-open"),this.drawerEl.setAttribute("aria-hidden","false"),!eu(e.explanation)){this.renderPopulatedPart(e,e.explanation,n);return}Promise.all([cx(e),eh()]).then(([s])=>{n!==this.renderSeq||!this.drawerEl.classList.contains("is-open")||this.renderPopulatedPart(e,s,n)})}setIsolatedState(e){this.isolateBtn.classList.toggle("is-active",e)}hide(){this.renderSeq++,this.closeLightbox(),this.drawerEl.classList.remove("is-open"),this.drawerEl.setAttribute("aria-hidden","true"),window.setTimeout(()=>{this.drawerEl.classList.contains("is-open")||this.bodyEl.replaceChildren()},360)}}function ci(i=3){return new Promise(e=>{let t=0;const n=()=>{t++,t>=i?e():requestAnimationFrame(n)};requestAnimationFrame(n)})}class fx{host;constructor(e){this.host=e}async waitUnitReady(e=15e3){const t=performance.now();for(;!this.host.isUnitReady()&&performance.now()-t<e;)await new Promise(n=>setTimeout(n,12));await ci(1)}async waitSchematicHydrated(e=8e3){const t=performance.now();for(;performance.now()-t<e;){const n=this.host.appRoot.querySelector(".schematic-stage .exp-diagram-content");if(n&&n.querySelector("svg"))break;await new Promise(s=>setTimeout(s,15))}await ci(1)}async captureDirectCanvasDataUrl(e="png",t=.92){const n=this.host.appRoot.querySelector("#viewport canvas");if(!n)return null;this.host.requestRenderFrame(),await ci(1);const s=e==="webp"?"image/webp":e==="jpeg"?"image/jpeg":"image/png";return n.toDataURL(s,t)}measureClip(e){if(!e)return null;const t=this.host.appRoot.querySelector(e);if(!t)return null;const n=t.getBoundingClientRect();if(n.width<2||n.height<2)return null;const s=4,r=Math.max(0,Math.floor(n.left-s)),a=Math.max(0,Math.floor(n.top-s)),o=Math.min(window.innerWidth,Math.ceil(n.right+s)),l=Math.min(window.innerHeight,Math.ceil(n.bottom+s));return{x:r,y:a,width:Math.max(1,o-r),height:Math.max(1,l-a)}}reset(){const e=this.host.appRoot;delete e.dataset.captureMode,delete e.dataset.captureCad,delete e.dataset.captureUi,delete e.dataset.captureDrawer,delete e.dataset.captureDiagram,delete e.dataset.capturePerf,this.host.setLightboxOpen(!1,!1),this.host.setDrawerViewTab("all"),this.host.requestRenderFrame()}async prepare(e,t={}){const n=performance.now(),s=this.host.appRoot;t.playground?await this.host.openPlayground(!!t.playgroundReport):this.host.closePlayground(),t.quality&&t.quality!==this.host.getQuality()&&this.host.setQuality(t.quality),t.unit&&t.unit!==this.host.getMode()&&this.host.setMode(t.unit,!0),t.playground||await this.waitUnitReady(),typeof t.explode=="number"&&this.host.setExplode(t.explode,!0),t.renderMode&&this.host.setRenderMode(t.renderMode),t.preset&&this.host.setCameraPreset(t.preset,!0),typeof t.showPerfHud=="boolean"&&this.host.setPerfHudVisible(t.showPerfHud),this.reset(),s.dataset.captureMode=e;let r=t.clipSelector??null;if(e==="ui")s.dataset.captureCad="0",s.dataset.captureUi="1",s.dataset.captureDrawer=t.showDrawer?"1":"0",t.partId?this.host.selectPart(t.partId,!1):t.showDrawer||this.host.selectPart(null,!1);else if(e==="cad")s.dataset.captureCad="1",s.dataset.captureUi="0",s.dataset.captureDrawer="0",s.dataset.capturePerf="0",this.host.selectPart(null,!1);else if(e==="diagram"){s.dataset.captureCad="0",s.dataset.captureUi="0",s.dataset.captureDrawer="1",s.dataset.captureDiagram="1";const a=t.partId??this.host.getSelectedPartId()??this.host.getFirstPartId();a&&this.host.selectPart(a,!1),this.host.setDrawerViewTab("diagram"),await this.waitSchematicHydrated();const o=this.host.appRoot.querySelector(".explanation-drawer .drawer-body");o&&(o.scrollTop=0),t.showLightbox?(this.host.setLightboxOpen(!0,!!t.lightboxRotate),await ci(3),r=r??".schematic-lightbox-panel"):(await ci(3),r=r??".schematic-stage")}else if(e==="explanation"){s.dataset.captureCad="0",s.dataset.captureUi="0",s.dataset.captureDrawer="1";const a=t.partId??this.host.getSelectedPartId()??this.host.getFirstPartId();a&&this.host.selectPart(a,!1),this.host.setDrawerViewTab(t.drawerTab??"explanation");const o=this.host.appRoot.querySelector(".explanation-drawer .drawer-body");o&&(o.scrollTop=0),await ci(3),r=r??".explanation-drawer"}else e==="full"?(s.dataset.captureCad="1",s.dataset.captureUi="1",s.dataset.captureDrawer="1",t.partId?(this.host.selectPart(t.partId,!1),t.drawerTab&&this.host.setDrawerViewTab(t.drawerTab),await this.waitSchematicHydrated()):t.partId===null&&this.host.selectPart(null,!1),t.showLightbox&&this.host.setLightboxOpen(!0,!!t.lightboxRotate)):e==="custom"&&(s.dataset.captureCad=t.showCad===!1?"0":"1",s.dataset.captureUi=t.showUi===!1?"0":"1",s.dataset.captureDrawer=t.showDrawer===!1?"0":"1",s.dataset.capturePerf=t.showPerfHud===!1?"0":"1",t.partId?(this.host.selectPart(t.partId,!1),t.drawerTab&&this.host.setDrawerViewTab(t.drawerTab),await this.waitSchematicHydrated()):t.partId===null&&this.host.selectPart(null,!1),t.showLightbox&&this.host.setLightboxOpen(!0,!!t.lightboxRotate));return this.host.requestRenderFrame(),await ci(e==="cad"?1:2),{mode:e,clip:this.measureClip(r),activeUnit:this.host.getMode(),activeQuality:this.host.getQuality(),selectedPartId:this.host.getSelectedPartId(),readyMs:Math.round(performance.now()-n)}}}const vn=document.getElementById("app"),px=document.getElementById("viewport");let Ei=null,pn="off",xn=!1,vi,_,h,_n=null,Xa=null,wr=!1,Yt=null,qa=null;const Go=i=>{_.syncOpticsStudio(i),i?(h.setMode("lens",!0),_.syncMode("lens"),_.syncOpticsStudio(!0),h.setExplode(0),_.setExplodeValue(0),h.setPhysicsActive(!0),_.syncPhysics(!0),h.frameLensForOpticsStudio(!1),z()):(h.getMode()==="lens"&&(h.refreshVisibility(),_.syncLensSection(h.getLensSection()),h.setCameraPreset("iso",!1),z()),h.requestRenderFrame())},mx=()=>_n?Promise.resolve(_n):(Xa||(Xa=se(()=>import("./LensOpticsStudio-BJyqgML-.js"),[],import.meta.url).then(i=>(_n=new i.LensOpticsStudio(vn,{onOpenChange:Go,onHoverPart:e=>{Ei=e,h.setHoveredPartFromUI(e),_.syncHighlight(h.getSelectedPart()?.id??null,Ei)},onSelectPart:e=>{h.selectPart(e,!1)},onRequestRenderFrame:()=>{h.requestRenderFrame()}}),_n))),Xa),dt={getIsOpen:()=>_n?_n.getIsOpen():wr||mn.studioOpen,open:(i,e)=>{const t=e??void 0;if(_n){_n.open(i,t);return}wr=!0,i&&mn.setScenario(i),e!==void 0&&mn.setHoveredElement(e),mn.setStudioOpen(!0),Go(!0),mx().then(n=>{wr&&n.open(i,t)})},close:()=>{wr=!1,_n?_n.close():mn.studioOpen&&(mn.setStudioOpen(!1),Go(!1))},toggle:()=>{dt.getIsOpen()?dt.close():dt.open()}},es=()=>{const i=document;return!!(document.fullscreenElement||i.webkitFullscreenElement)},ts=()=>{const i=es()||xn;vn.classList.toggle("is-zen-fullscreen",xn),_.syncFullscreen(i),h.handleResize()},ol=async()=>{const i=document,e=document.documentElement;if(es()){try{document.exitFullscreen?await document.exitFullscreen():i.webkitExitFullscreen&&await i.webkitExitFullscreen()}catch{}xn=!1,ts();return}if(xn){xn=!1,ts();return}let t=!1;try{document.fullscreenEnabled!==!1&&e.requestFullscreen?(await e.requestFullscreen(),t=es()):e.webkitRequestFullscreen&&(await e.webkitRequestFullscreen(),t=es())}catch{t=!1}t||(xn=!0),ts()},z=()=>{const i=h.getPartsForCurrentMode(),e=h.getSelectedPart()?.id??null;_.renderLayerRail(i,e,Ei,t=>h.isPartHidden(t),h.hasAnyHidden())};h=new sx(px,{onSelectPart:i=>{vn.classList.toggle("has-drawer",!!i),i?vi.show(i,h.isIsolated()):vi.hide(),z()},onHoverPart:i=>{Ei=i,mn.setHoveredElement(i),_.syncHighlight(h.getSelectedPart()?.id??null,Ei)},onVisibilityChanged:()=>{vi.setIsolatedState(h.isIsolated()),z()},onQualityChanged:i=>{_&&_.syncQuality(i)}});_=new ax(vn,{onModeChange:i=>{i!=="lens"&&i!=="integrated"&&dt.getIsOpen()&&dt.close(),h.setMode(i),_.syncLensSection(h.getLensSection()),_.setExplodeValue(h.getExplode()),z()},onLensSectionChange:i=>{dt.getIsOpen()&&dt.close(),h.setLensSection(i),z()},onSensorFabVolumeChange:i=>{h.setSensorFabVolume(i,!1),_.syncFabVolume(i),_.syncFabStage(i===0?"overview":i===1?"v1_overview":i===2?"v2_overview":i===3?"v3_overview":i===4?"v4_overview":"v5_overview"),z()},onSensorFabStageChange:i=>{h.focusSensorFabStage(i,!1)},onExplodeChange:i=>{h.setExplode(i)},onSectionAxisChange:i=>{pn=i,h.setSection(i)},onSectionValueChange:i=>{h.setSection(pn,i)},onRenderModeChange:i=>{h.setRenderMode(i)},onQualityChange:i=>{h.setQuality(i)},onPhysicsToggle:i=>{h.setPhysicsActive(i)},onOpticsStudioToggle:()=>{dt.toggle()},onOpenPlayground:()=>{cs.open()},onResetVisibility:()=>{h.resetAllVisibility()},onFullscreenToggle:()=>{ol()},onCameraPreset:i=>{h.setCameraPreset(i)},onSelectPart:i=>{(h.getSelectedPart()?.id??null)===i?h.selectPart(null,!1):h.selectPart(i,!dt.getIsOpen())},onHoverPart:i=>{Ei=i,mn.setHoveredElement(i),h.setHoveredPartFromUI(i),_.syncHighlight(h.getSelectedPart()?.id??null,Ei)},onToggleHidePart:i=>{h.togglePartHidden(i)}});const th=()=>Yt?Promise.resolve(Yt):(qa||(qa=se(()=>import("./CadPlaygroundStudio-C2prnntb.js"),[],import.meta.url).then(i=>(Yt=new i.CadPlaygroundStudio(vn,{renderer:h.getRenderer(),container:h.getContainer(),setCustomSceneRenderer:e=>h.setCustomSceneRenderer(e),requestRender:()=>h.requestRenderFrame(),onClosePlayground:()=>{vn.classList.remove("is-playground"),_.syncPlaygroundActive(!1),h.handleResize()}}),Yt))),qa),cs={isOpen:()=>Yt?.isOpen()??!1,open:async(i=!1)=>{dt.getIsOpen()&&dt.close(),h.selectPart(null,!1);const e=await th();vn.classList.add("is-playground"),_.syncPlaygroundActive(!0),await e.open(),i&&e.openEvaluationReport()},close:()=>{Yt?.close(),vn.classList.remove("is-playground"),_.syncPlaygroundActive(!1)},evaluate:()=>Yt?.openEvaluationReport()??null,runPlya:(i=!0)=>Yt?.runPlyaPipeline(i)??null,getPlaced:()=>Yt?.getPlacedSummary()??[],movePart:(i,e,t,n)=>Yt?.movePartByUid(i,e,t,n)??!1,setProfile:i=>Yt?.setDesignProfile(i)??null,loadTemplate:async i=>{await(await th()).loadTemplate(i)},setCameraView:i=>Yt?.setCameraView(i),setShadingMode:i=>Yt?.setShadingMode(i)};vi=new dx(vn,{onClose:()=>h.selectPart(null,!1),onPrev:()=>h.stepSelectedPart(-1),onNext:()=>h.stepSelectedPart(1),onToggleIsolate:()=>h.toggleIsolateSelected(),onHideCurrent:()=>{const i=h.getSelectedPart();i&&h.togglePartHidden(i.id)},onOpenOpticsMotion:(i,e)=>{h.selectPart(null,!1),dt.open(i,e)},onSwitchMode:i=>{dt.getIsOpen()&&dt.close(),h.setMode(i),_.syncMode(i),_.setExplodeValue(h.getExplode()),z()},onSwitchFabVolume:i=>{h.setMode("sensor_fab",!1),h.setSensorFabVolume(i,!1),_.syncFabVolume(i),_.syncFabStage(i===0?"overview":i===1?"v1_overview":i===2?"v2_overview":i===3?"v3_overview":i===4?"v4_overview":"v5_overview"),_.syncMode("sensor_fab"),z()}});document.addEventListener("fullscreenchange",()=>{es()||(xn=!1),ts()});document.addEventListener("webkitfullscreenchange",()=>{es()||(xn=!1),ts()});const xi=i=>{h.setQuality(i),_.syncQuality(h.getQuality())};window.addEventListener("keydown",i=>{if(!cs.isOpen())if(i.key==="Escape")xn&&(xn=!1,ts()),h.getSelectedPart()?h.selectPart(null,!1):dt.getIsOpen()&&dt.close();else if((i.key==="1"||i.key==="2"||i.key==="3")&&h.getMode()==="lens"&&!dt.getIsOpen()&&!i.ctrlKey&&!i.metaKey&&!i.altKey){const e=Number(i.key);h.setLensSection(e),_.syncLensSection(e),z()}else if((i.key==="v"||i.key==="V")&&!i.ctrlKey&&!i.metaKey&&!i.altKey){const e=h.getMode(),t=e==="micro"?"micro_v2":e==="micro_v2"?"micro":e==="bionz"?"bionz_v2":e==="bionz_v2"?"bionz":null;t&&(h.setMode(t),_.syncMode(t),_.setExplodeValue(h.getExplode()),z())}else if((i.key==="f"||i.key==="F")&&!i.ctrlKey&&!i.metaKey&&!i.altKey)ol();else if((i.key==="u"||i.key==="U")&&!i.ctrlKey&&!i.metaKey&&!i.altKey){const e=h.getQuality();xi(e==="standard_lite"?"standard":e==="standard"?"high":e==="high"?"ultra":"standard_lite")}else(i.key==="p"||i.key==="P")&&h.isV2Mode()&&!i.ctrlKey&&!i.metaKey&&!i.altKey?h.getV2Runtime().togglePerfHud():i.key==="ArrowDown"||i.key==="ArrowRight"?h.getSelectedPart()&&h.stepSelectedPart(1):(i.key==="ArrowUp"||i.key==="ArrowLeft")&&h.getSelectedPart()&&h.stepSelectedPart(-1)});const nu=new URLSearchParams(window.location.search),hi=nu.get("quality")?.toLowerCase();hi==="standard_lite"||hi==="lite"||hi==="std_lite"?xi("standard_lite"):hi==="standard"||hi==="std"?xi("standard"):hi==="high"?xi("high"):hi==="ultra"?xi("ultra"):_.syncQuality(h.getQuality());const nh={getDiagnostics:()=>h.getV2Runtime().getDiagnostics(),togglePerfHud:()=>h.getV2Runtime().togglePerfHud(),setPerfHudVisible:i=>h.getV2Runtime().setPerfHudVisible(i),isV2Mode:()=>h.isV2Mode()},ih=new fx({appRoot:vn,setMode:(i,e)=>{h.setMode(i,e),_.syncMode(i),z()},getMode:()=>h.getMode(),setQuality:i=>xi(i),getQuality:()=>h.getQuality(),setRenderMode:i=>h.setRenderMode(i),setExplode:(i,e)=>{h.setExplode(i,e),_.setExplodeValue(i)},setCameraPreset:(i,e)=>h.setCameraPreset(i,e),selectPart:(i,e)=>h.selectPart(i,e),getFirstPartId:()=>h.getPartsForCurrentMode()[0]?.id??null,getSelectedPartId:()=>h.getSelectedPart()?.id??null,isUnitReady:()=>h.getV2Runtime().isReady(),setPerfHudVisible:i=>h.getV2Runtime().setPerfHudVisible(i),setDrawerViewTab:i=>vi.setViewTab(i),setLightboxOpen:(i,e)=>vi.setLightboxOpen(i,e),openPlayground:i=>cs.open(i),closePlayground:()=>cs.close(),requestRenderFrame:()=>h.requestRenderFrame()});window.__cad={viewport:h,controls:_,drawer:vi,opticsStudio:dt,playground:cs,pp:ih,capture:ih,toggleFullscreen:ol,setQuality:xi,v2:nh,mishoeV2:nh};z();const H=nu.get("preset");H==="welcome"?(h.setMode("welcome",!0),_.syncMode("welcome"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("iso",!0),z()):H==="playground"?cs.open(!1):H==="complete_assembled"?(h.setMode("integrated",!0),_.syncMode("integrated"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("iso",!0),z()):H==="complete_back"?(h.setMode("integrated",!0),_.syncMode("integrated"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("back",!0),z()):H==="complete_exploded"?(h.setMode("integrated",!0),_.syncMode("integrated"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="complete_section"?(h.setMode("integrated",!0),_.syncMode("integrated"),h.setExplode(0,!0),pn="x",h.setSection("x",.54),_.syncSectionAxis("x",.54),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="camera_body_assembled"?(h.setMode("camera_body",!0),_.syncMode("camera_body"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("iso",!0),z()):H==="camera_body_exploded"?(h.setMode("camera_body",!0),_.syncMode("camera_body"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="lens_assembled"?(h.setMode("lens",!0),_.syncMode("lens"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("iso",!0),z()):H==="lens_exploded"?(h.setMode("lens",!0),_.syncMode("lens"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="lens_drawer"?(h.setMode("lens",!0),_.syncMode("lens"),h.setExplode(.88,!0),_.setExplodeValue(.88),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lens-xd-motors",!1),z()):H==="lens_super_drawer"?(h.setMode("lens",!0),_.syncMode("lens"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lens-mcu-pcb",!1),z()):H==="lens_ultra_drawer"?(h.setMode("lens",!0),_.syncMode("lens"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lens-bayonet-shims",!1),z()):H==="lens_ultra62_exploded"?(h.setMode("lens",!0),_.syncMode("lens"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="lens_ultra62_drawer"?(h.setMode("lens",!0),_.syncMode("lens"),h.setExplode(.9,!0),_.setExplodeValue(.9),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lens-front-tilt-shims",!1),z()):H==="lens_optics_motion"?(dt.open("aperture_bokeh"),h.frameLensForOpticsStudio(!0)):H==="lens_optics_floating"?(dt.open("floating_xd"),h.frameLensForOpticsStudio(!0)):H==="lens_optics_ed"?(dt.open("ed_chromatic"),h.frameLensForOpticsStudio(!0)):H==="lens_optics_xa"?(dt.open("xa_aspheric"),h.frameLensForOpticsStudio(!0)):H==="lens_optics_nano"?(dt.open("nano_ar_baffle"),h.frameLensForOpticsStudio(!0)):H==="sensor_super_drawer"?(h.setMode("sensor",!0),_.syncMode("sensor"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("sensor-hall-pcb",!1),z()):H==="lcd_assembled"?(h.setMode("lcd",!0),_.syncMode("lcd"),h.setExplode(0,!0),_.setExplodeValue(0),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="lcd_exploded"?(h.setMode("lcd",!0),_.syncMode("lcd"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="lcd_drawer"?(h.setMode("lcd",!0),_.syncMode("lcd"),h.setExplode(.85,!0),_.setExplodeValue(.85),h.setCameraPreset("iso",!0),h.selectPart("lcd-4axis-tilt-frame",!1),z()):H==="body_assembled"?(h.setMode("body",!0),_.syncMode("body"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("iso",!0),z()):H==="body_exploded"?(h.setMode("body",!0),_.syncMode("body"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="body_drawer"?(h.setMode("body",!0),_.syncMode("body"),h.setExplode(.88,!0),_.setExplodeValue(.88),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("body-battery-pack",!1),z()):H==="body_ultra_drawer"?(h.setMode("body",!0),_.syncMode("body"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("body-card-ejectors",!1),z()):H==="shutter_ultra_drawer"?(h.setMode("shutter",!0),_.syncMode("shutter"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("shutter-counterweight",!1),z()):H==="lcd_ultra_drawer"?(h.setMode("lcd",!0),_.syncMode("lcd"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lcd-swivel-clutch",!1),z()):H==="mount_assembled"?(h.setMode("mount",!0),_.syncMode("mount"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("iso",!0),z()):H==="mount_exploded"?(h.setMode("mount",!0),_.syncMode("mount"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="mount_section"?(h.setMode("mount",!0),_.syncMode("mount"),h.setExplode(0,!0),pn="x",h.setSection("x",.52),_.syncSectionAxis("x",.52),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="mount_drawer"?(h.setMode("mount",!0),_.syncMode("mount"),h.setExplode(.85,!0),_.setExplodeValue(.85),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mount-flange-ring",!1),z()):H==="mount_contacts_drawer"?(h.setMode("mount",!0),_.syncMode("mount"),h.setExplode(.88,!0),_.setExplodeValue(.88),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mount-contact-pins",!1),z()):H==="evf_assembled"?(h.setMode("evf",!0),_.syncMode("evf"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("iso",!0),z()):H==="evf_exploded"?(h.setMode("evf",!0),_.syncMode("evf"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="evf_section"?(h.setMode("evf",!0),_.syncMode("evf"),h.setExplode(0,!0),pn="x",h.setSection("x",.52),_.syncSectionAxis("x",.52),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="evf_drawer"?(h.setMode("evf",!0),_.syncMode("evf"),h.setExplode(.88,!0),_.setExplodeValue(.88),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("evf-oled-panel",!1),z()):H==="evf_eye_af_drawer"?(h.setMode("evf",!0),_.syncMode("evf"),h.setExplode(.85,!0),_.setExplodeValue(.85),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("evf-dichroic-mirror",!1),z()):H==="mainboard_exploded"?(h.setMode("mainboard",!0),_.syncMode("mainboard"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="mainboard_section"?(h.setMode("mainboard",!0),_.syncMode("mainboard"),h.setExplode(0,!0),pn="x",h.setSection("x",.54),_.syncSectionAxis("x",.54),h.setCameraPreset("iso",!0),z()):H==="mainboard_drawer"?(h.setMode("mainboard",!0),_.syncMode("mainboard"),h.setExplode(.85,!0),_.setExplodeValue(.85),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mb-isp-die",!1),z()):H==="mainboard_npu_drawer"?(h.setMode("mainboard",!0),_.syncMode("mainboard"),h.setExplode(.82,!0),_.setExplodeValue(.82),h.setCameraPreset("iso",!0),h.selectPart("mb-ai-npu",!1),z()):H==="mainboard_back"?(h.setMode("mainboard",!0),_.syncMode("mainboard"),h.setExplode(.65,!0),_.setExplodeValue(.65),h.setCameraPreset("back",!0),z()):H==="shutter_assembled"?(h.setMode("shutter",!0),_.syncMode("shutter"),h.setExplode(0,!0),h.setCameraPreset("iso",!0),z()):H==="shutter_exploded"?(h.setMode("shutter",!0),_.syncMode("shutter"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="shutter_section"?(h.setMode("shutter",!0),_.syncMode("shutter"),h.setExplode(0,!0),pn="x",h.setSection("x",.56),_.syncSectionAxis("x",.56),h.setCameraPreset("iso",!0),z()):H==="shutter_drawer"?(h.setMode("shutter",!0),_.syncMode("shutter"),h.setExplode(.82,!0),_.setExplodeValue(.82),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("shutter-curtain-2",!1),z()):H==="integrated_exploded"?(h.setMode("integrated",!0),_.syncMode("integrated"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="integrated_assembled"?(h.setMode("integrated",!0),_.syncMode("integrated"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("iso",!0),z()):H==="sensor_exploded"||H==="exploded"?(h.setMode("sensor",!0),_.syncMode("sensor"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="back"?(h.setMode("sensor",!0),_.syncMode("sensor"),h.setExplode(.72,!0),_.setExplodeValue(.72),h.setCameraPreset("back",!0),z()):H==="section"?(h.setMode("sensor",!0),_.syncMode("sensor"),h.setExplode(0,!0),pn="x",h.setSection("x",.48),_.syncSectionAxis("x",.48),h.setCameraPreset("iso",!0),z()):H==="drawer"?(h.setMode("sensor",!0),_.syncMode("sensor"),h.setExplode(.82,!0),_.setExplodeValue(.82),h.setCameraPreset("iso",!0),h.selectPart("cmos-die",!1),z()):H==="micro"?(h.setMode("micro",!0),_.syncMode("micro"),h.setExplode(.72,!0),_.setExplodeValue(.72),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="micro_drawer"?(h.setMode("micro",!0),_.syncMode("micro"),h.setExplode(.65,!0),_.setExplodeValue(.65),h.setCameraPreset("iso",!0),h.selectPart("micro-2layer-gs",!1),z()):H==="phase11_mount"?(h.setMode("mount",!0),_.syncMode("mount"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mount-esd-ground-clips",!1),z()):H==="phase11_sensor"?(h.setMode("sensor",!0),_.syncMode("sensor"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("sensor-dram-wafer",!1),z()):H==="phase11_micro"?(h.setMode("micro",!0),_.syncMode("micro"),h.setExplode(.85,!0),_.setExplodeValue(.85),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("micro-fdti-doping",!1),z()):H==="phase11_shutter"?(h.setMode("shutter",!0),_.syncMode("shutter"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("shutter-x-sync-contact",!1),z()):H==="phase11_evf"?(h.setMode("evf",!0),_.syncMode("evf"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("evf-oled-mla-stack",!1),z()):H==="phase11_lcd"?(h.setMode("lcd",!0),_.syncMode("lcd"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lcd-lgp-led-bar",!1),z()):H==="phase11_lens"?(h.setMode("lens",!0),_.syncMode("lens"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lens-mr-magnet-scales",!1),z()):H==="phase12_mainboard"?(h.setMode("mainboard",!0),_.syncMode("mainboard"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mb-hdmi-daughterboard",!1),z()):H==="phase12_body"?(h.setMode("body",!0),_.syncMode("body"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("body-evf-tie-bracket",!1),z()):H==="phase12_micro"?(h.setMode("micro",!0),_.syncMode("micro"),h.setExplode(.9,!0),_.setExplodeValue(.9),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("micro-lofic-cap",!1),z()):H==="phase13_mount"?(h.setMode("mount",!0),_.syncMode("mount"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mount-im-adjust-washer",!1),z()):H==="phase13_shutter"?(h.setMode("shutter",!0),_.syncMode("shutter"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("shutter-mb-floating-shaft",!1),z()):H==="phase13_body"?(h.setMode("body",!0),_.syncMode("body"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("body-gyro-sensor-unit",!1),z()):H==="phase14_sensor"?(h.setMode("sensor",!0),_.syncMode("sensor"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("sensor-imager-fix-shafts",!1),z()):H==="phase14_micro"?(h.setMode("micro",!0),_.syncMode("micro"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("micro-fd-dcg-switch",!1),z()):H==="phase15_lcd"?(h.setMode("lcd",!0),_.syncMode("lcd"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lcd-fine-coaxial-bundle",!1),z()):H==="phase34_lcd"?(h.setMode("lcd",!0),_.syncMode("lcd"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lcd-tandem-oled-stack",!1),z()):H==="phase35_lcd"?(h.setMode("lcd",!0),_.syncMode("lcd"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lcd-microled-gan-array",!1),z()):H==="phase16_mainboard"?(h.setMode("mainboard",!0),_.syncMode("mainboard"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mb-vc-evaporator-plate",!1),z()):H==="phase16_evf"?(h.setMode("evf",!0),_.syncMode("evf"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("evf-oem-finder-cover",!1),z()):H==="phase16_body"?(h.setMode("body",!0),_.syncMode("body"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("body-dl1008-rtc-flex",!1),z()):H==="phase17_shutter"?(h.setMode("shutter",!0),_.syncMode("shutter"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("shutter-rivet-reinforce-collars",!1),z()):H==="phase34_shutter"?(h.setMode("shutter",!0),_.syncMode("shutter"),h.setExplode(.96,!0),_.setExplodeValue(.96),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("shutter-coaxial-friction-brake",!1),z()):H==="phase36_shutter"?(h.setMode("shutter",!0),_.syncMode("shutter"),h.setExplode(.96,!0),_.setExplodeValue(.96),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("shutter-eddy-current-self-brake",!1),z()):H==="phase18_lens"?(h.setMode("lens",!0),h.setLensSection(3,!0),_.syncMode("lens"),_.syncLensSection(3),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lens-nano-ar-ii-layer",!1),z()):H==="phase18_mount"?(h.setMode("mount",!0),_.syncMode("mount"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mount-bayonet-leadin-dlc",!1),z()):H==="phase19_lens_s1"?(h.setMode("lens",!0),h.setLensSection(1,!0),_.syncMode("lens"),_.syncLensSection(1),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lens-iris-click-wedge-lever",!1),z()):H==="phase19_lens_s2"?(h.setMode("lens",!0),h.setLensSection(2,!0),_.syncMode("lens"),_.syncLensSection(2),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lens-mid-block-core-frame",!1),z()):H==="phase19_lens_s3"?(h.setMode("lens",!0),h.setLensSection(3,!0),_.syncMode("lens"),_.syncLensSection(3),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("lens-hood-release-lock-pin",!1),z()):H==="phase19_micro"?(h.setMode("micro",!0),_.syncMode("micro"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("micro-column-cds-sh",!1),z()):H==="phase19_sensor"?(h.setMode("sensor",!0),_.syncMode("sensor"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("sensor-birefringent-olpf",!1),z()):H==="phase19_mainboard"?(h.setMode("mainboard",!0),_.syncMode("mainboard"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mb-card-detect-heartcam",!1),z()):H==="phase20_micro"?(h.setMode("micro",!0),_.syncMode("micro"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("micro-inpixel-dram-gs",!1),z()):H==="phase20_mount"?(h.setMode("mount",!0),_.syncMode("mount"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mount-screw-orange-orings",!1),z()):H==="phase23_micro"?(h.setMode("micro",!0),_.syncMode("micro"),h.setExplode(.86,!0),_.setExplodeValue(.86),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("micro-mpcr-color-router",!1),z()):H==="phase24_body"?(h.setMode("body",!0),_.syncMode("body"),h.setExplode(.85,!0),_.setExplodeValue(.85),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("body-active-cooling-fan-duct",!1),z()):H==="phase25_sensor"?(h.setMode("sensor",!0),_.syncMode("sensor"),h.setExplode(.88,!0),_.setExplodeValue(.88),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("sensor-electronic-vnd",!1),z()):H==="phase25_body"?(h.setMode("body",!0),_.syncMode("body"),h.setExplode(.86,!0),_.setExplodeValue(.86),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("body-gnss-ceramic-antenna",!1),z()):H==="battery"?(h.setMode("battery",!0),_.syncMode("battery"),h.setExplode(.88,!0),_.setExplodeValue(.88),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("bat-infolithium-fuelgauge",!1),z()):H==="battery_assembled"?(h.setMode("battery",!0),_.syncMode("battery"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("iso",!0),z()):H==="battery_ultra100"?(h.setMode("battery",!0),_.syncMode("battery"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("bat-cvd-sic-porous-scaffold",!1),z()):H==="battery_ultra130"?(h.setMode("battery",!0),_.syncMode("battery"),h.setExplode(.94,!0),_.setExplodeValue(.94),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("bat-argyrodite-li6ps5cl-2026",!1),z()):H==="cfexpress"?(h.setMode("cfexpress",!0),_.syncMode("cfexpress"),h.setExplode(.88,!0),_.setExplodeValue(.88),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("cfe-pcie4-controller-soc",!1),z()):H==="cfexpress_assembled"?(h.setMode("cfexpress",!0),_.syncMode("cfexpress"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("iso",!0),z()):H==="cfexpress_back"?(h.setMode("cfexpress",!0),_.syncMode("cfexpress"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("back",!0),z()):H==="cfexpress_exploded"?(h.setMode("cfexpress",!0),_.syncMode("cfexpress"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="cfexpress_ultra100"?(h.setMode("cfexpress",!0),_.syncMode("cfexpress"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("cfe-multiplane-6plane-mpir",!1),z()):H==="cfexpress_ultra130"?(h.setMode("cfexpress",!0),_.syncMode("cfexpress"),h.setExplode(.94,!0),_.setExplodeValue(.94),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("cfe-fenand-hzo-igzo-2026",!1),z()):H==="cfexpress_ultra170"?(h.setMode("cfexpress",!0),_.syncMode("cfexpress"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("cfe-bwwpc-wafer-power-grid",!1),z()):H==="bionz_assembled"?(h.setMode("bionz",!0),_.syncMode("bionz"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("iso",!0),z()):H==="bionz_exploded"?(h.setMode("bionz",!0),_.syncMode("bionz"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="bionz_drawer"?(h.setMode("bionz",!0),_.syncMode("bionz"),h.setExplode(.86,!0),_.setExplodeValue(.86),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("xr-ai-npu-systolic",!1),z()):H==="mishoe_assembled"?(h.setMode("mishoe",!0),_.syncMode("mishoe"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("iso",!0),z()):H==="mishoe_exploded"?(h.setMode("mishoe",!0),_.syncMode("mishoe"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="mishoe_drawer"?(h.setMode("mishoe",!0),_.syncMode("mishoe"),h.setExplode(.86,!0),_.setExplodeValue(.86),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mi-pins-8to12-digital-audio",!1),z()):H==="mic_assembled"?(h.setMode("mic",!0),_.syncMode("mic"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("iso",!0),z()):H==="mic_exploded"?(h.setMode("mic",!0),_.syncMode("mic"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="mic_drawer"?(h.setMode("mic",!0),_.syncMode("mic"),h.setExplode(.86,!0),_.setExplodeValue(.86),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mc-mems-sdm-vacuum-cell",!1),z()):H==="mic_ultra80"?(h.setMode("mic",!0),_.syncMode("mic"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mc-optical-mems-vcsel-2026",!1),z()):H==="mic_ultra110"?(h.setMode("mic",!0),_.syncMode("mic"),h.setExplode(.94,!0),_.setExplodeValue(.94),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mc-graphene-2d-membrane-2026",!1),z()):H==="mic_ultra150"?(h.setMode("mic",!0),_.syncMode("mic"),h.setExplode(.95,!0),_.setExplodeValue(.95),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("mc-jk1028-audio-jack-flex",!1),z()):H==="micro_v2_assembled"?(h.setMode("micro_v2",!0),_.syncMode("micro_v2"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("iso",!0),z()):H==="micro_v2_exploded"?(h.setMode("micro_v2",!0),_.syncMode("micro_v2"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="micro_v2_drawer"?(h.setMode("micro_v2",!0),_.syncMode("micro_v2"),h.setExplode(.76,!0),_.setExplodeValue(.76),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("pv2-lofic-3d-pillar-cap",!1),z()):H==="bionz_v2_assembled"?(h.setMode("bionz_v2",!0),_.syncMode("bionz_v2"),h.setExplode(0,!0),_.setExplodeValue(0),h.setCameraPreset("iso",!0),z()):H==="bionz_v2_exploded"?(h.setMode("bionz_v2",!0),_.syncMode("bionz_v2"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="bionz_v2_drawer"?(h.setMode("bionz_v2",!0),_.syncMode("bionz_v2"),h.setExplode(.76,!0),_.setExplodeValue(.76),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("xv2-gaa-si-nanosheets",!1),z()):H==="sensor_fab_assembled"?(h.setMode("sensor_fab",!0),_.syncMode("sensor_fab"),h.setExplode(0,!0),_.setExplodeValue(0),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="sensor_fab_exploded"?(h.setMode("sensor_fab",!0),_.syncMode("sensor_fab"),h.setExplode(.92,!0),_.setExplodeValue(.92),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="sensor_fab_drawer"?(h.setMode("sensor_fab",!0),_.syncMode("sensor_fab"),h.setExplode(.45,!0),_.setExplodeValue(.45),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("fab0-p06-cucu-bond-bsi",!1),z()):H==="sensor_fab_litho"?(h.setMode("sensor_fab",!0),_.syncMode("sensor_fab"),_.syncFabStage("litho"),h.setExplode(.55,!0),_.setExplodeValue(.55),h.setPhysicsActive(!0),_.syncPhysics(!0),h.focusSensorFabStage("litho",!0),z()):H==="sensor_fab_variants"?(h.setMode("sensor_fab",!0),_.syncMode("sensor_fab"),_.syncFabStage("variants"),h.setExplode(.42,!0),_.setExplodeValue(.42),h.setPhysicsActive(!0),_.syncPhysics(!0),h.focusSensorFabStage("variants",!0),z()):H==="sensor_fab_section"?(h.setMode("sensor_fab",!0),_.syncMode("sensor_fab"),h.setExplode(0,!0),pn="x",h.setSection("x",.52),_.syncSectionAxis("x",.52),h.setCameraPreset("iso",!0),z()):H==="sensor_fab_vol1_assembled"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(1,!0),_.syncFabVolume(1),_.syncFabStage("v1_overview"),_.syncMode("sensor_fab"),h.setExplode(0,!0),_.setExplodeValue(0),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="sensor_fab_vol1_exploded"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(1,!0),_.syncFabVolume(1),_.syncFabStage("v1_overview"),_.syncMode("sensor_fab"),h.setExplode(.75,!0),_.setExplodeValue(.75),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="sensor_fab_vol1_drawer"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(1,!0),_.syncFabVolume(1),_.syncFabStage("v1_overview"),_.syncMode("sensor_fab"),h.setExplode(.35,!0),_.setExplodeValue(.35),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("fab1-gs-pixel-adc-isscc2025",!1),z()):H==="sensor_fab_vol1_archs"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(1,!0),_.syncFabVolume(1),_.syncFabStage("v1_archs"),_.syncMode("sensor_fab"),h.setExplode(.12,!0),_.setExplodeValue(.12),h.focusSensorFabStage("v1_archs",!0),z()):H==="sensor_fab_vol1_duel"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(1,!0),_.syncFabVolume(1),_.syncFabStage("v1_duel"),_.syncMode("sensor_fab"),h.setExplode(.12,!0),_.setExplodeValue(.12),h.focusSensorFabStage("v1_duel",!0),z()):H==="sensor_fab_vol1_wall"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(1,!0),_.syncFabVolume(1),_.syncFabStage("v1_wall"),_.syncMode("sensor_fab"),h.setExplode(.12,!0),_.setExplodeValue(.12),h.focusSensorFabStage("v1_wall",!0),z()):H==="sensor_fab_vol2_assembled"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(2,!0),_.syncFabVolume(2),_.syncFabStage("v2_overview"),_.syncMode("sensor_fab"),h.setExplode(0,!0),_.setExplodeValue(0),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="sensor_fab_vol2_exploded"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(2,!0),_.syncFabVolume(2),_.syncFabStage("v2_overview"),_.syncMode("sensor_fab"),h.setExplode(.75,!0),_.setExplodeValue(.75),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="sensor_fab_vol2_drawer"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(2,!0),_.syncFabVolume(2),_.syncFabStage("v2_overview"),_.syncMode("sensor_fab"),h.setExplode(.28,!0),_.setExplodeValue(.28),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("fab2-ci-complex-gettering-cutaway",!1),z()):H==="sensor_fab_vol2_refine"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(2,!0),_.syncFabVolume(2),_.syncFabStage("v2_refine"),_.syncMode("sensor_fab"),h.setExplode(.1,!0),_.setExplodeValue(.1),h.focusSensorFabStage("v2_refine",!0),z()):H==="sensor_fab_vol2_mcz"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(2,!0),_.syncFabVolume(2),_.syncFabStage("v2_mcz"),_.syncMode("sensor_fab"),h.setExplode(.1,!0),_.setExplodeValue(.1),h.focusSensorFabStage("v2_mcz",!0),z()):H==="sensor_fab_vol2_wafer"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(2,!0),_.syncFabVolume(2),_.syncFabStage("v2_wafer"),_.syncMode("sensor_fab"),h.setExplode(.1,!0),_.setExplodeValue(.1),h.focusSensorFabStage("v2_wafer",!0),z()):H==="sensor_fab_vol2_epi_ship"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(2,!0),_.syncFabVolume(2),_.syncFabStage("v2_epi_ship"),_.syncMode("sensor_fab"),h.setExplode(.1,!0),_.setExplodeValue(.1),h.focusSensorFabStage("v2_epi_ship",!0),z()):H==="sensor_fab_vol3_assembled"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(3,!0),_.syncFabVolume(3),_.syncFabStage("v3_overview"),_.syncMode("sensor_fab"),h.setExplode(0,!0),_.setExplodeValue(0),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="sensor_fab_vol3_exploded"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(3,!0),_.syncFabVolume(3),_.syncFabStage("v3_overview"),_.syncMode("sensor_fab"),h.setExplode(.72,!0),_.setExplodeValue(.72),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="sensor_fab_vol3_drawer"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(3,!0),_.syncFabVolume(3),_.syncFabStage("v3_overview"),_.syncMode("sensor_fab"),h.setExplode(.24,!0),_.setExplodeValue(.24),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("fab3-p28-opc-serif-correction",!1),z()):H==="sensor_fab_vol3_tcad"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(3,!0),_.syncFabVolume(3),_.syncFabStage("v3_tcad"),_.syncMode("sensor_fab"),h.setExplode(.08,!0),_.setExplodeValue(.08),h.focusSensorFabStage("v3_tcad",!0),z()):H==="sensor_fab_vol3_layout"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(3,!0),_.syncFabVolume(3),_.syncFabStage("v3_layout"),_.syncMode("sensor_fab"),h.setExplode(.08,!0),_.setExplodeValue(.08),h.focusSensorFabStage("v3_layout",!0),z()):H==="sensor_fab_vol3_opc"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(3,!0),_.syncFabVolume(3),_.syncFabStage("v3_opc"),_.syncMode("sensor_fab"),h.setExplode(.08,!0),_.setExplodeValue(.08),h.focusSensorFabStage("v3_opc",!0),z()):H==="sensor_fab_vol3_maskfab"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(3,!0),_.syncFabVolume(3),_.syncFabStage("v3_maskfab"),_.syncMode("sensor_fab"),h.setExplode(.08,!0),_.setExplodeValue(.08),h.focusSensorFabStage("v3_maskfab",!0),z()):H==="sensor_fab_vol4_assembled"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(4,!0),_.syncFabVolume(4),_.syncFabStage("v4_overview"),_.syncMode("sensor_fab"),h.setExplode(0,!0),_.setExplodeValue(0),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="sensor_fab_vol4_exploded"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(4,!0),_.syncFabVolume(4),_.syncFabStage("v4_overview"),_.syncMode("sensor_fab"),h.setExplode(.72,!0),_.setExplodeValue(.72),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="sensor_fab_vol4_drawer"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(4,!0),_.syncFabVolume(4),_.syncFabStage("v4_overview"),_.syncMode("sensor_fab"),h.setExplode(.24,!0),_.setExplodeValue(.24),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("fab4-m22-surface-pinning-ppd",!1),z()):H==="sensor_fab_vol4_sti_dti"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(4,!0),_.syncFabVolume(4),_.syncFabStage("v4_sti_dti"),_.syncMode("sensor_fab"),h.setExplode(.08,!0),_.setExplodeValue(.08),h.focusSensorFabStage("v4_sti_dti",!0),z()):H==="sensor_fab_vol4_ppd_mev"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(4,!0),_.syncFabVolume(4),_.syncFabStage("v4_ppd_mev"),_.syncMode("sensor_fab"),h.setExplode(.08,!0),_.setExplodeValue(.08),h.focusSensorFabStage("v4_ppd_mev",!0),z()):H==="sensor_fab_vol4_vtg_gate"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(4,!0),_.syncFabVolume(4),_.syncFabStage("v4_vtg_gate"),_.syncMode("sensor_fab"),h.setExplode(.08,!0),_.setExplodeValue(.08),h.focusSensorFabStage("v4_vtg_gate",!0),z()):H==="sensor_fab_vol4_pin_sab"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(4,!0),_.syncFabVolume(4),_.syncFabStage("v4_pin_sab"),_.syncMode("sensor_fab"),h.setExplode(.08,!0),_.setExplodeValue(.08),h.focusSensorFabStage("v4_pin_sab",!0),z()):H==="sensor_fab_vol5_assembled"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(5,!0),_.syncFabVolume(5),_.syncFabStage("v5_overview"),_.syncMode("sensor_fab"),h.setExplode(0,!0),_.setExplodeValue(0),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="drybox_assembled"?(h.setMode("drybox",!0),_.syncMode("drybox"),h.setExplode(0,!0),_.setExplodeValue(0),h.setPhysicsActive(!1),_.syncPhysics(!1),h.setCameraPreset("iso",!0),z()):H==="drybox_exploded"?(h.setMode("drybox",!0),_.syncMode("drybox"),h.setExplode(.86,!0),_.setExplodeValue(.86),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="sensor_fab_vol5_exploded"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(5,!0),_.syncFabVolume(5),_.syncFabStage("v5_overview"),_.syncMode("sensor_fab"),h.setExplode(.72,!0),_.setExplodeValue(.72),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),z()):H==="sensor_fab_vol5_drawer"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(5,!0),_.syncFabVolume(5),_.syncFabStage("v5_overview"),_.syncMode("sensor_fab"),h.setExplode(.24,!0),_.setExplodeValue(.24),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("fab5-p206-hb-recess-cmp",!1),z()):H==="sensor_fab_vol5_w_m1"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(5,!0),_.syncFabVolume(5),_.syncFabStage("v5_w_m1"),_.syncMode("sensor_fab"),h.setExplode(.08,!0),_.setExplodeValue(.08),h.focusSensorFabStage("v5_w_m1",!0),z()):H==="sensor_fab_vol5_m2_m4"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(5,!0),_.syncFabVolume(5),_.syncFabStage("v5_m2_m4"),_.syncMode("sensor_fab"),h.setExplode(.08,!0),_.setExplodeValue(.08),h.focusSensorFabStage("v5_m2_m4",!0),z()):H==="sensor_fab_vol5_m5_wat"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(5,!0),_.syncFabVolume(5),_.syncFabStage("v5_m5_wat"),_.syncMode("sensor_fab"),h.setExplode(.08,!0),_.setExplodeValue(.08),h.focusSensorFabStage("v5_m5_wat",!0),z()):H==="sensor_fab_vol5_hb_cmp"?(h.setMode("sensor_fab",!0),h.setSensorFabVolume(5,!0),_.syncFabVolume(5),_.syncFabStage("v5_hb_cmp"),_.syncMode("sensor_fab"),h.setExplode(.08,!0),_.setExplodeValue(.08),h.focusSensorFabStage("v5_hb_cmp",!0),z()):H==="drybox_back"?(h.setMode("drybox",!0),_.syncMode("drybox"),h.setExplode(.45,!0),_.setExplodeValue(.45),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("back",!0),z()):H==="drybox_section"?(h.setMode("drybox",!0),_.syncMode("drybox"),h.setExplode(0,!0),_.setExplodeValue(0),pn="x",h.setSection("x",.52),_.syncSectionAxis("x",.52),h.setCameraPreset("iso",!0),z()):H==="drybox_drawer"&&(h.setMode("drybox",!0),_.syncMode("drybox"),h.setExplode(.55,!0),_.setExplodeValue(.55),h.setPhysicsActive(!0),_.syncPhysics(!0),h.setCameraPreset("iso",!0),h.selectPart("db-pem-nafion-membrane",!1),z());export{_x as $,Tx as A,Bs as B,qf as C,$t as D,rn as E,We as F,Ms as G,zf as H,Qr as I,vx as J,qr as K,$n as L,Wr as M,bx as N,_l as O,Vs as P,bi as Q,Xf as R,gl as S,Gh as T,Sx as U,A as V,Bh as W,gf as X,tc as Y,Lh as Z,ko as _,ea as a,dn as a0,wx as a1,xx as a2,Px as a3,yx as a4,$0 as a5,jc as a6,Ih as a7,Cx as a8,Wh as a9,rf as aa,gi as ab,Uh as ac,Dh as ad,gx as ae,Ye as af,zh as ag,Ph as ah,tl as ai,Hh as aj,Ax as ak,se as al,Ex as am,Rh as an,St as b,Yr as c,ht as d,uu as e,Ct as f,Vh as g,el as h,kh as i,rt as j,Y0 as k,q0 as l,zr as m,Fe as n,Gt as o,Oo as p,Nt as q,ys as r,mn as s,re as t,Xd as u,en as v,L0 as w,Ia as x,Mx as y,Vf as z};

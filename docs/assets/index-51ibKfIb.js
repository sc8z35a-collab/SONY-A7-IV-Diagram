(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Da="174",es={ROTATE:0,DOLLY:1,PAN:2},ji={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ah=0,Qa=1,lh=2,wc=1,ch=2,On=3,Wn=0,jt=1,Rt=2,ti=0,ts=1,el=2,tl=3,nl=4,hh=5,vi=100,dh=101,uh=102,fh=103,ph=104,mh=200,gh=201,xh=202,yh=203,Gr=204,Vr=205,_h=206,vh=207,wh=208,bh=209,Mh=210,Sh=211,Eh=212,Ah=213,Th=214,Hr=0,Wr=1,Xr=2,os=3,Yr=4,Zr=5,qr=6,Kr=7,bc=0,Ph=1,Ch=2,ni=0,Rh=1,Ih=2,Dh=3,Mc=4,Lh=5,Fh=6,zh=7,Sc=300,rs=301,as=302,$r=303,jr=304,Qo=306,sn=1e3,ei=1001,Jr=1002,dn=1003,Nh=1004,to=1005,Rn=1006,sr=1007,Mi=1008,Xn=1009,Ec=1010,Ac=1011,Vs=1012,La=1013,Ei=1014,In=1015,Ks=1016,Fa=1017,za=1018,ls=1020,Tc=35902,Pc=1021,Cc=1022,Sn=1023,Rc=1024,Ic=1025,ns=1026,cs=1027,Na=1028,Ua=1029,Dc=1030,ka=1031,Oa=1033,No=33776,Uo=33777,ko=33778,Oo=33779,Qr=35840,ea=35841,ta=35842,na=35843,ia=36196,sa=37492,oa=37496,ra=37808,aa=37809,la=37810,ca=37811,ha=37812,da=37813,ua=37814,fa=37815,pa=37816,ma=37817,ga=37818,xa=37819,ya=37820,_a=37821,Bo=36492,va=36494,wa=36495,Lc=36283,ba=36284,Ma=36285,Sa=36286,Uh=3200,kh=3201,Fc=0,Oh=1,Qn="",At="srgb",hs="srgb-linear",Xo="linear",xt="srgb",Li=7680,il=519,Bh=512,Gh=513,Vh=514,zc=515,Hh=516,Wh=517,Xh=518,Yh=519,sl=35044,ol="300 es",Gn=2e3,Yo=2001;class Ci{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const o=s.indexOf(t);o!==-1&&s.splice(o,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let o=0,r=s.length;o<r;o++)s[o].call(this,e);e.target=null}}}const Ht=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let rl=1234567;const is=Math.PI/180,Hs=180/Math.PI;function Ri(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ht[i&255]+Ht[i>>8&255]+Ht[i>>16&255]+Ht[i>>24&255]+"-"+Ht[e&255]+Ht[e>>8&255]+"-"+Ht[e>>16&15|64]+Ht[e>>24&255]+"-"+Ht[t&63|128]+Ht[t>>8&255]+"-"+Ht[t>>16&255]+Ht[t>>24&255]+Ht[n&255]+Ht[n>>8&255]+Ht[n>>16&255]+Ht[n>>24&255]).toLowerCase()}function Qe(i,e,t){return Math.max(e,Math.min(t,i))}function Ba(i,e){return(i%e+e)%e}function Zh(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function qh(i,e,t){return i!==e?(t-i)/(e-i):0}function Us(i,e,t){return(1-t)*i+t*e}function Kh(i,e,t,n){return Us(i,e,1-Math.exp(-t*n))}function $h(i,e=1){return e-Math.abs(Ba(i,e*2)-e)}function jh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Jh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Qh(i,e){return i+Math.floor(Math.random()*(e-i+1))}function ed(i,e){return i+Math.random()*(e-i)}function td(i){return i*(.5-Math.random())}function nd(i){i!==void 0&&(rl=i);let e=rl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function id(i){return i*is}function sd(i){return i*Hs}function od(i){return(i&i-1)===0&&i!==0}function rd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function ad(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function ld(i,e,t,n,s){const o=Math.cos,r=Math.sin,a=o(t/2),l=r(t/2),c=o((e+n)/2),h=r((e+n)/2),u=o((e-n)/2),d=r((e-n)/2),f=o((n-e)/2),g=r((n-e)/2);switch(s){case"XYX":i.set(a*h,l*u,l*d,a*c);break;case"YZY":i.set(l*d,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*d,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function $i(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function qt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const ze={DEG2RAD:is,RAD2DEG:Hs,generateUUID:Ri,clamp:Qe,euclideanModulo:Ba,mapLinear:Zh,inverseLerp:qh,lerp:Us,damp:Kh,pingpong:$h,smoothstep:jh,smootherstep:Jh,randInt:Qh,randFloat:ed,randFloatSpread:td,seededRandom:nd,degToRad:id,radToDeg:sd,isPowerOfTwo:od,ceilPowerOfTwo:rd,floorPowerOfTwo:ad,setQuaternionFromProperEuler:ld,normalize:qt,denormalize:$i};class ue{constructor(e=0,t=0){ue.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),o=this.x-e.x,r=this.y-e.y;return this.x=o*n-r*s+e.x,this.y=o*s+r*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class et{constructor(e,t,n,s,o,r,a,l,c){et.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,o,r,a,l,c)}set(e,t,n,s,o,r,a,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=o,h[5]=l,h[6]=n,h[7]=r,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,o=this.elements,r=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],x=s[0],m=s[3],p=s[6],T=s[1],E=s[4],S=s[7],z=s[2],D=s[5],R=s[8];return o[0]=r*x+a*T+l*z,o[3]=r*m+a*E+l*D,o[6]=r*p+a*S+l*R,o[1]=c*x+h*T+u*z,o[4]=c*m+h*E+u*D,o[7]=c*p+h*S+u*R,o[2]=d*x+f*T+g*z,o[5]=d*m+f*E+g*D,o[8]=d*p+f*S+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],o=e[3],r=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*r*h-t*a*c-n*o*h+n*a*l+s*o*c-s*r*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],o=e[3],r=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*r-a*c,d=a*l-h*o,f=c*o-r*l,g=t*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return e[0]=u*x,e[1]=(s*c-h*n)*x,e[2]=(a*n-s*r)*x,e[3]=d*x,e[4]=(h*t-s*l)*x,e[5]=(s*o-a*t)*x,e[6]=f*x,e[7]=(n*l-c*t)*x,e[8]=(r*t-n*o)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,o,r,a){const l=Math.cos(o),c=Math.sin(o);return this.set(n*l,n*c,-n*(l*r+c*a)+r+e,-s*c,s*l,-s*(-c*r+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(or.makeScale(e,t)),this}rotate(e){return this.premultiply(or.makeRotation(-e)),this}translate(e,t){return this.premultiply(or.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const or=new et;function Nc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Zo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function cd(){const i=Zo("canvas");return i.style.display="block",i}const al={};function yi(i){i in al||(al[i]=!0,console.warn(i))}function hd(i,e,t){return new Promise(function(n,s){function o(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(o,t);break;default:n()}}setTimeout(o,t)})}function dd(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function ud(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const ll=new et().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),cl=new et().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function fd(){const i={enabled:!0,workingColorSpace:hs,spaces:{},convert:function(s,o,r){return this.enabled===!1||o===r||!o||!r||(this.spaces[o].transfer===xt&&(s.r=Hn(s.r),s.g=Hn(s.g),s.b=Hn(s.b)),this.spaces[o].primaries!==this.spaces[r].primaries&&(s.applyMatrix3(this.spaces[o].toXYZ),s.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===xt&&(s.r=ss(s.r),s.g=ss(s.g),s.b=ss(s.b))),s},fromWorkingColorSpace:function(s,o){return this.convert(s,this.workingColorSpace,o)},toWorkingColorSpace:function(s,o){return this.convert(s,o,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Qn?Xo:this.spaces[s].transfer},getLuminanceCoefficients:function(s,o=this.workingColorSpace){return s.fromArray(this.spaces[o].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,o,r){return s.copy(this.spaces[o].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[hs]:{primaries:e,whitePoint:n,transfer:Xo,toXYZ:ll,fromXYZ:cl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:At},outputColorSpaceConfig:{drawingBufferColorSpace:At}},[At]:{primaries:e,whitePoint:n,transfer:xt,toXYZ:ll,fromXYZ:cl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:At}}}),i}const ct=fd();function Hn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ss(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Fi;class pd{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Fi===void 0&&(Fi=Zo("canvas")),Fi.width=e.width,Fi.height=e.height;const n=Fi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Fi}return t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Zo("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),o=s.data;for(let r=0;r<o.length;r++)o[r]=Hn(o[r]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Hn(t[n]/255)*255):t[n]=Hn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let md=0;class Ga{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:md++}),this.uuid=Ri(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let o;if(Array.isArray(s)){o=[];for(let r=0,a=s.length;r<a;r++)s[r].isDataTexture?o.push(rr(s[r].image)):o.push(rr(s[r]))}else o=rr(s);n.url=o}return t||(e.images[this.uuid]=n),n}}function rr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?pd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let gd=0;class Yt extends Ci{constructor(e=Yt.DEFAULT_IMAGE,t=Yt.DEFAULT_MAPPING,n=ei,s=ei,o=Rn,r=Mi,a=Sn,l=Xn,c=Yt.DEFAULT_ANISOTROPY,h=Qn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gd++}),this.uuid=Ri(),this.name="",this.source=new Ga(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=o,this.minFilter=r,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ue(0,0),this.repeat=new ue(1,1),this.center=new ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new et,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Sc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case sn:e.x=e.x-Math.floor(e.x);break;case ei:e.x=e.x<0?0:1;break;case Jr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case sn:e.y=e.y-Math.floor(e.y);break;case ei:e.y=e.y<0?0:1;break;case Jr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Yt.DEFAULT_IMAGE=null;Yt.DEFAULT_MAPPING=Sc;Yt.DEFAULT_ANISOTROPY=1;class _t{constructor(e=0,t=0,n=0,s=1){_t.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,o=this.w,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s+r[12]*o,this.y=r[1]*t+r[5]*n+r[9]*s+r[13]*o,this.z=r[2]*t+r[6]*n+r[10]*s+r[14]*o,this.w=r[3]*t+r[7]*n+r[11]*s+r[15]*o,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,o;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,S=(f+1)/2,z=(p+1)/2,D=(h+d)/4,R=(u+x)/4,b=(g+m)/4;return E>S&&E>z?E<.01?(n=0,s=.707106781,o=.707106781):(n=Math.sqrt(E),s=D/n,o=R/n):S>z?S<.01?(n=.707106781,s=0,o=.707106781):(s=Math.sqrt(S),n=D/s,o=b/s):z<.01?(n=.707106781,s=.707106781,o=0):(o=Math.sqrt(z),n=R/o,s=b/o),this.set(n,s,o,t),this}let T=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(u-x)/T,this.z=(d-h)/T,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this.z=Qe(this.z,e.z,t.z),this.w=Qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this.z=Qe(this.z,e,t),this.w=Qe(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class xd extends Ci{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new _t(0,0,e,t),this.scissorTest=!1,this.viewport=new _t(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const o=new Yt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);o.flipY=!1,o.generateMipmaps=n.generateMipmaps,o.internalFormat=n.internalFormat,this.textures=[];const r=n.count;for(let a=0;a<r;a++)this.textures[a]=o.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,o=this.textures.length;s<o;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ga(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ai extends xd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Uc extends Yt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=dn,this.minFilter=dn,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class yd extends Yt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=dn,this.minFilter=dn,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ti{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,o,r,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const d=o[r+0],f=o[r+1],g=o[r+2],x=o[r+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=x;return}if(u!==x||l!==d||c!==f||h!==g){let m=1-a;const p=l*d+c*f+h*g+u*x,T=p>=0?1:-1,E=1-p*p;if(E>Number.EPSILON){const z=Math.sqrt(E),D=Math.atan2(z,p*T);m=Math.sin(m*D)/z,a=Math.sin(a*D)/z}const S=a*T;if(l=l*m+d*S,c=c*m+f*S,h=h*m+g*S,u=u*m+x*S,m===1-a){const z=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=z,c*=z,h*=z,u*=z}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,o,r){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=o[r],d=o[r+1],f=o[r+2],g=o[r+3];return e[t]=a*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-a*f,e[t+2]=c*g+h*f+a*d-l*u,e[t+3]=h*g-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,o=e._z,r=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(o/2),d=l(n/2),f=l(s/2),g=l(o/2);switch(r){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],o=t[8],r=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(o-c)*f,this._z=(r-s)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+r)/f,this._z=(o+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(o-c)/f,this._x=(s+r)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(r-s)/f,this._x=(o+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Qe(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,o=e._z,r=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+r*a+s*c-o*l,this._y=s*h+r*l+o*a-n*c,this._z=o*h+r*c+n*l-s*a,this._w=r*h-n*a-s*l-o*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,o=this._z,r=this._w;let a=r*e._w+n*e._x+s*e._y+o*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=r,this._x=n,this._y=s,this._z=o,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*r+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*o+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=r*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=o*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),o*Math.sin(t),o*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class _{constructor(e=0,t=0,n=0){_.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(hl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(hl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,o=e.elements;return this.x=o[0]*t+o[3]*n+o[6]*s,this.y=o[1]*t+o[4]*n+o[7]*s,this.z=o[2]*t+o[5]*n+o[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,o=e.elements,r=1/(o[3]*t+o[7]*n+o[11]*s+o[15]);return this.x=(o[0]*t+o[4]*n+o[8]*s+o[12])*r,this.y=(o[1]*t+o[5]*n+o[9]*s+o[13])*r,this.z=(o[2]*t+o[6]*n+o[10]*s+o[14])*r,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,o=e.x,r=e.y,a=e.z,l=e.w,c=2*(r*s-a*n),h=2*(a*t-o*s),u=2*(o*n-r*t);return this.x=t+l*c+r*u-a*h,this.y=n+l*h+a*c-o*u,this.z=s+l*u+o*h-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s,this.y=o[1]*t+o[5]*n+o[9]*s,this.z=o[2]*t+o[6]*n+o[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this.z=Qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this.z=Qe(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,o=e.z,r=t.x,a=t.y,l=t.z;return this.x=s*l-o*a,this.y=o*r-n*l,this.z=n*a-s*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ar.copy(this).projectOnVector(e),this.sub(ar)}reflect(e){return this.sub(ar.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ar=new _,hl=new Ti;class ri{constructor(e=new _(1/0,1/0,1/0),t=new _(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(wn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(wn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=wn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const o=n.getAttribute("position");if(t===!0&&o!==void 0&&e.isInstancedMesh!==!0)for(let r=0,a=o.count;r<a;r++)e.isMesh===!0?e.getVertexPosition(r,wn):wn.fromBufferAttribute(o,r),wn.applyMatrix4(e.matrixWorld),this.expandByPoint(wn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),no.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),no.copy(n.boundingBox)),no.applyMatrix4(e.matrixWorld),this.union(no)}const s=e.children;for(let o=0,r=s.length;o<r;o++)this.expandByObject(s[o],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,wn),wn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Es),io.subVectors(this.max,Es),zi.subVectors(e.a,Es),Ni.subVectors(e.b,Es),Ui.subVectors(e.c,Es),Zn.subVectors(Ni,zi),qn.subVectors(Ui,Ni),hi.subVectors(zi,Ui);let t=[0,-Zn.z,Zn.y,0,-qn.z,qn.y,0,-hi.z,hi.y,Zn.z,0,-Zn.x,qn.z,0,-qn.x,hi.z,0,-hi.x,-Zn.y,Zn.x,0,-qn.y,qn.x,0,-hi.y,hi.x,0];return!lr(t,zi,Ni,Ui,io)||(t=[1,0,0,0,1,0,0,0,1],!lr(t,zi,Ni,Ui,io))?!1:(so.crossVectors(Zn,qn),t=[so.x,so.y,so.z],lr(t,zi,Ni,Ui,io))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,wn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(wn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Fn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Fn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Fn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Fn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Fn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Fn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Fn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Fn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Fn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Fn=[new _,new _,new _,new _,new _,new _,new _,new _],wn=new _,no=new ri,zi=new _,Ni=new _,Ui=new _,Zn=new _,qn=new _,hi=new _,Es=new _,io=new _,so=new _,di=new _;function lr(i,e,t,n,s){for(let o=0,r=i.length-3;o<=r;o+=3){di.fromArray(i,o);const a=s.x*Math.abs(di.x)+s.y*Math.abs(di.y)+s.z*Math.abs(di.z),l=e.dot(di),c=t.dot(di),h=n.dot(di);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const _d=new ri,As=new _,cr=new _;class us{constructor(e=new _,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):_d.setFromPoints(e).getCenter(n);let s=0;for(let o=0,r=e.length;o<r;o++)s=Math.max(s,n.distanceToSquared(e[o]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;As.subVectors(e,this.center);const t=As.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(As,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(cr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(As.copy(e.center).add(cr)),this.expandByPoint(As.copy(e.center).sub(cr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const zn=new _,hr=new _,oo=new _,Kn=new _,dr=new _,ro=new _,ur=new _;class er{constructor(e=new _,t=new _(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,zn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=zn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(zn.copy(this.origin).addScaledVector(this.direction,t),zn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){hr.copy(e).add(t).multiplyScalar(.5),oo.copy(t).sub(e).normalize(),Kn.copy(this.origin).sub(hr);const o=e.distanceTo(t)*.5,r=-this.direction.dot(oo),a=Kn.dot(this.direction),l=-Kn.dot(oo),c=Kn.lengthSq(),h=Math.abs(1-r*r);let u,d,f,g;if(h>0)if(u=r*l-a,d=r*a-l,g=o*h,u>=0)if(d>=-g)if(d<=g){const x=1/h;u*=x,d*=x,f=u*(u+r*d+2*a)+d*(r*u+d+2*l)+c}else d=o,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*l)+c;else d=-o,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-r*o+a)),d=u>0?-o:Math.min(Math.max(-o,-l),o),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-o,-l),o),f=d*(d+2*l)+c):(u=Math.max(0,-(r*o+a)),d=u>0?o:Math.min(Math.max(-o,-l),o),f=-u*u+d*(d+2*l)+c);else d=r>0?-o:o,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(hr).addScaledVector(oo,d),f}intersectSphere(e,t){zn.subVectors(e.center,this.origin);const n=zn.dot(this.direction),s=zn.dot(zn)-n*n,o=e.radius*e.radius;if(s>o)return null;const r=Math.sqrt(o-s),a=n-r,l=n+r;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,o,r,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),h>=0?(o=(e.min.y-d.y)*h,r=(e.max.y-d.y)*h):(o=(e.max.y-d.y)*h,r=(e.min.y-d.y)*h),n>r||o>s||((o>n||isNaN(n))&&(n=o),(r<s||isNaN(s))&&(s=r),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,zn)!==null}intersectTriangle(e,t,n,s,o){dr.subVectors(t,e),ro.subVectors(n,e),ur.crossVectors(dr,ro);let r=this.direction.dot(ur),a;if(r>0){if(s)return null;a=1}else if(r<0)a=-1,r=-r;else return null;Kn.subVectors(this.origin,e);const l=a*this.direction.dot(ro.crossVectors(Kn,ro));if(l<0)return null;const c=a*this.direction.dot(dr.cross(Kn));if(c<0||l+c>r)return null;const h=-a*Kn.dot(ur);return h<0?null:this.at(h/r,o)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class mt{constructor(e,t,n,s,o,r,a,l,c,h,u,d,f,g,x,m){mt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,o,r,a,l,c,h,u,d,f,g,x,m)}set(e,t,n,s,o,r,a,l,c,h,u,d,f,g,x,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=o,p[5]=r,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new mt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/ki.setFromMatrixColumn(e,0).length(),o=1/ki.setFromMatrixColumn(e,1).length(),r=1/ki.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*o,t[5]=n[5]*o,t[6]=n[6]*o,t[7]=0,t[8]=n[8]*r,t[9]=n[9]*r,t[10]=n[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,o=e.z,r=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(o),u=Math.sin(o);if(e.order==="XYZ"){const d=r*h,f=r*u,g=a*h,x=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-x*c,t[9]=-a*l,t[2]=x-d*c,t[6]=g+f*c,t[10]=r*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,g=c*h,x=c*u;t[0]=d+x*a,t[4]=g*a-f,t[8]=r*c,t[1]=r*u,t[5]=r*h,t[9]=-a,t[2]=f*a-g,t[6]=x+d*a,t[10]=r*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,g=c*h,x=c*u;t[0]=d-x*a,t[4]=-r*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=r*h,t[9]=x-d*a,t[2]=-r*c,t[6]=a,t[10]=r*l}else if(e.order==="ZYX"){const d=r*h,f=r*u,g=a*h,x=a*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+x,t[1]=l*u,t[5]=x*c+d,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=r*l}else if(e.order==="YZX"){const d=r*l,f=r*c,g=a*l,x=a*c;t[0]=l*h,t[4]=x-d*u,t[8]=g*u+f,t[1]=u,t[5]=r*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-x*u}else if(e.order==="XZY"){const d=r*l,f=r*c,g=a*l,x=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+x,t[5]=r*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=x*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(vd,e,wd)}lookAt(e,t,n){const s=this.elements;return an.subVectors(e,t),an.lengthSq()===0&&(an.z=1),an.normalize(),$n.crossVectors(n,an),$n.lengthSq()===0&&(Math.abs(n.z)===1?an.x+=1e-4:an.z+=1e-4,an.normalize(),$n.crossVectors(n,an)),$n.normalize(),ao.crossVectors(an,$n),s[0]=$n.x,s[4]=ao.x,s[8]=an.x,s[1]=$n.y,s[5]=ao.y,s[9]=an.y,s[2]=$n.z,s[6]=ao.z,s[10]=an.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,o=this.elements,r=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],x=n[6],m=n[10],p=n[14],T=n[3],E=n[7],S=n[11],z=n[15],D=s[0],R=s[4],b=s[8],v=s[12],y=s[1],M=s[5],C=s[9],A=s[13],I=s[2],U=s[6],k=s[10],B=s[14],O=s[3],X=s[7],J=s[11],ce=s[15];return o[0]=r*D+a*y+l*I+c*O,o[4]=r*R+a*M+l*U+c*X,o[8]=r*b+a*C+l*k+c*J,o[12]=r*v+a*A+l*B+c*ce,o[1]=h*D+u*y+d*I+f*O,o[5]=h*R+u*M+d*U+f*X,o[9]=h*b+u*C+d*k+f*J,o[13]=h*v+u*A+d*B+f*ce,o[2]=g*D+x*y+m*I+p*O,o[6]=g*R+x*M+m*U+p*X,o[10]=g*b+x*C+m*k+p*J,o[14]=g*v+x*A+m*B+p*ce,o[3]=T*D+E*y+S*I+z*O,o[7]=T*R+E*M+S*U+z*X,o[11]=T*b+E*C+S*k+z*J,o[15]=T*v+E*A+S*B+z*ce,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],o=e[12],r=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],x=e[7],m=e[11],p=e[15];return g*(+o*l*u-s*c*u-o*a*d+n*c*d+s*a*f-n*l*f)+x*(+t*l*f-t*c*d+o*r*d-s*r*f+s*c*h-o*l*h)+m*(+t*c*u-t*a*f-o*r*u+n*r*f+o*a*h-n*c*h)+p*(-s*a*h-t*l*u+t*a*d+s*r*u-n*r*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],o=e[3],r=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],x=e[13],m=e[14],p=e[15],T=u*m*c-x*d*c+x*l*f-a*m*f-u*l*p+a*d*p,E=g*d*c-h*m*c-g*l*f+r*m*f+h*l*p-r*d*p,S=h*x*c-g*u*c+g*a*f-r*x*f-h*a*p+r*u*p,z=g*u*l-h*x*l-g*a*d+r*x*d+h*a*m-r*u*m,D=t*T+n*E+s*S+o*z;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/D;return e[0]=T*R,e[1]=(x*d*o-u*m*o-x*s*f+n*m*f+u*s*p-n*d*p)*R,e[2]=(a*m*o-x*l*o+x*s*c-n*m*c-a*s*p+n*l*p)*R,e[3]=(u*l*o-a*d*o-u*s*c+n*d*c+a*s*f-n*l*f)*R,e[4]=E*R,e[5]=(h*m*o-g*d*o+g*s*f-t*m*f-h*s*p+t*d*p)*R,e[6]=(g*l*o-r*m*o-g*s*c+t*m*c+r*s*p-t*l*p)*R,e[7]=(r*d*o-h*l*o+h*s*c-t*d*c-r*s*f+t*l*f)*R,e[8]=S*R,e[9]=(g*u*o-h*x*o-g*n*f+t*x*f+h*n*p-t*u*p)*R,e[10]=(r*x*o-g*a*o+g*n*c-t*x*c-r*n*p+t*a*p)*R,e[11]=(h*a*o-r*u*o-h*n*c+t*u*c+r*n*f-t*a*f)*R,e[12]=z*R,e[13]=(h*x*s-g*u*s+g*n*d-t*x*d-h*n*m+t*u*m)*R,e[14]=(g*a*s-r*x*s-g*n*l+t*x*l+r*n*m-t*a*m)*R,e[15]=(r*u*s-h*a*s+h*n*l-t*u*l-r*n*d+t*a*d)*R,this}scale(e){const t=this.elements,n=e.x,s=e.y,o=e.z;return t[0]*=n,t[4]*=s,t[8]*=o,t[1]*=n,t[5]*=s,t[9]*=o,t[2]*=n,t[6]*=s,t[10]*=o,t[3]*=n,t[7]*=s,t[11]*=o,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),o=1-n,r=e.x,a=e.y,l=e.z,c=o*r,h=o*a;return this.set(c*r+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*r,0,c*l-s*a,h*l+s*r,o*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,o,r){return this.set(1,n,o,0,e,1,r,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,o=t._x,r=t._y,a=t._z,l=t._w,c=o+o,h=r+r,u=a+a,d=o*c,f=o*h,g=o*u,x=r*h,m=r*u,p=a*u,T=l*c,E=l*h,S=l*u,z=n.x,D=n.y,R=n.z;return s[0]=(1-(x+p))*z,s[1]=(f+S)*z,s[2]=(g-E)*z,s[3]=0,s[4]=(f-S)*D,s[5]=(1-(d+p))*D,s[6]=(m+T)*D,s[7]=0,s[8]=(g+E)*R,s[9]=(m-T)*R,s[10]=(1-(d+x))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let o=ki.set(s[0],s[1],s[2]).length();const r=ki.set(s[4],s[5],s[6]).length(),a=ki.set(s[8],s[9],s[10]).length();this.determinant()<0&&(o=-o),e.x=s[12],e.y=s[13],e.z=s[14],bn.copy(this);const c=1/o,h=1/r,u=1/a;return bn.elements[0]*=c,bn.elements[1]*=c,bn.elements[2]*=c,bn.elements[4]*=h,bn.elements[5]*=h,bn.elements[6]*=h,bn.elements[8]*=u,bn.elements[9]*=u,bn.elements[10]*=u,t.setFromRotationMatrix(bn),n.x=o,n.y=r,n.z=a,this}makePerspective(e,t,n,s,o,r,a=Gn){const l=this.elements,c=2*o/(t-e),h=2*o/(n-s),u=(t+e)/(t-e),d=(n+s)/(n-s);let f,g;if(a===Gn)f=-(r+o)/(r-o),g=-2*r*o/(r-o);else if(a===Yo)f=-r/(r-o),g=-r*o/(r-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,o,r,a=Gn){const l=this.elements,c=1/(t-e),h=1/(n-s),u=1/(r-o),d=(t+e)*c,f=(n+s)*h;let g,x;if(a===Gn)g=(r+o)*u,x=-2*u;else if(a===Yo)g=o*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ki=new _,bn=new mt,vd=new _(0,0,0),wd=new _(1,1,1),$n=new _,ao=new _,an=new _,dl=new mt,ul=new Ti;class Dn{constructor(e=0,t=0,n=0,s=Dn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,o=s[0],r=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-r,o)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Qe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,o),this._z=0);break;case"ZXY":this._x=Math.asin(Qe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-Qe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,o)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Qe(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return dl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(dl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ul.setFromEuler(this),this.setFromQuaternion(ul,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Dn.DEFAULT_ORDER="XYZ";class Va{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let bd=0;const fl=new _,Oi=new Ti,Nn=new mt,lo=new _,Ts=new _,Md=new _,Sd=new Ti,pl=new _(1,0,0),ml=new _(0,1,0),gl=new _(0,0,1),xl={type:"added"},Ed={type:"removed"},Bi={type:"childadded",child:null},fr={type:"childremoved",child:null};class Pt extends Ci{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:bd++}),this.uuid=Ri(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pt.DEFAULT_UP.clone();const e=new _,t=new Dn,n=new Ti,s=new _(1,1,1);function o(){n.setFromEuler(t,!1)}function r(){t.setFromQuaternion(n,void 0,!1)}t._onChange(o),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new mt},normalMatrix:{value:new et}}),this.matrix=new mt,this.matrixWorld=new mt,this.matrixAutoUpdate=Pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Va,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Oi.setFromAxisAngle(e,t),this.quaternion.multiply(Oi),this}rotateOnWorldAxis(e,t){return Oi.setFromAxisAngle(e,t),this.quaternion.premultiply(Oi),this}rotateX(e){return this.rotateOnAxis(pl,e)}rotateY(e){return this.rotateOnAxis(ml,e)}rotateZ(e){return this.rotateOnAxis(gl,e)}translateOnAxis(e,t){return fl.copy(e).applyQuaternion(this.quaternion),this.position.add(fl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(pl,e)}translateY(e){return this.translateOnAxis(ml,e)}translateZ(e){return this.translateOnAxis(gl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Nn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?lo.copy(e):lo.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ts.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Nn.lookAt(Ts,lo,this.up):Nn.lookAt(lo,Ts,this.up),this.quaternion.setFromRotationMatrix(Nn),s&&(Nn.extractRotation(s.matrixWorld),Oi.setFromRotationMatrix(Nn),this.quaternion.premultiply(Oi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(xl),Bi.child=e,this.dispatchEvent(Bi),Bi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ed),fr.child=e,this.dispatchEvent(fr),fr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Nn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Nn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Nn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(xl),Bi.child=e,this.dispatchEvent(Bi),Bi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let o=0,r=s.length;o<r;o++)s[o].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ts,e,Md),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ts,Sd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let o=0,r=s.length;o<r;o++)s[o].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function o(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];o(e.shapes,u)}else o(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(o(e.materials,this.material[l]));s.material=a}else s.material=o(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(o(e.animations,l))}}if(t){const a=r(e.geometries),l=r(e.materials),c=r(e.textures),h=r(e.images),u=r(e.shapes),d=r(e.skeletons),f=r(e.animations),g=r(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function r(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Pt.DEFAULT_UP=new _(0,1,0);Pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Mn=new _,Un=new _,pr=new _,kn=new _,Gi=new _,Vi=new _,yl=new _,mr=new _,gr=new _,xr=new _,yr=new _t,_r=new _t,vr=new _t;class yn{constructor(e=new _,t=new _,n=new _){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Mn.subVectors(e,t),s.cross(Mn);const o=s.lengthSq();return o>0?s.multiplyScalar(1/Math.sqrt(o)):s.set(0,0,0)}static getBarycoord(e,t,n,s,o){Mn.subVectors(s,t),Un.subVectors(n,t),pr.subVectors(e,t);const r=Mn.dot(Mn),a=Mn.dot(Un),l=Mn.dot(pr),c=Un.dot(Un),h=Un.dot(pr),u=r*c-a*a;if(u===0)return o.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,g=(r*h-a*l)*d;return o.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,kn)===null?!1:kn.x>=0&&kn.y>=0&&kn.x+kn.y<=1}static getInterpolation(e,t,n,s,o,r,a,l){return this.getBarycoord(e,t,n,s,kn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(o,kn.x),l.addScaledVector(r,kn.y),l.addScaledVector(a,kn.z),l)}static getInterpolatedAttribute(e,t,n,s,o,r){return yr.setScalar(0),_r.setScalar(0),vr.setScalar(0),yr.fromBufferAttribute(e,t),_r.fromBufferAttribute(e,n),vr.fromBufferAttribute(e,s),r.setScalar(0),r.addScaledVector(yr,o.x),r.addScaledVector(_r,o.y),r.addScaledVector(vr,o.z),r}static isFrontFacing(e,t,n,s){return Mn.subVectors(n,t),Un.subVectors(e,t),Mn.cross(Un).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Mn.subVectors(this.c,this.b),Un.subVectors(this.a,this.b),Mn.cross(Un).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return yn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return yn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,o){return yn.getInterpolation(e,this.a,this.b,this.c,t,n,s,o)}containsPoint(e){return yn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return yn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,o=this.c;let r,a;Gi.subVectors(s,n),Vi.subVectors(o,n),mr.subVectors(e,n);const l=Gi.dot(mr),c=Vi.dot(mr);if(l<=0&&c<=0)return t.copy(n);gr.subVectors(e,s);const h=Gi.dot(gr),u=Vi.dot(gr);if(h>=0&&u<=h)return t.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return r=l/(l-h),t.copy(n).addScaledVector(Gi,r);xr.subVectors(e,o);const f=Gi.dot(xr),g=Vi.dot(xr);if(g>=0&&f<=g)return t.copy(o);const x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(Vi,a);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return yl.subVectors(o,s),a=(u-h)/(u-h+(f-g)),t.copy(s).addScaledVector(yl,a);const p=1/(m+x+d);return r=x*p,a=d*p,t.copy(n).addScaledVector(Gi,r).addScaledVector(Vi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const kc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},jn={h:0,s:0,l:0},co={h:0,s:0,l:0};function wr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class st{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=At){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ct.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=ct.workingColorSpace){return this.r=e,this.g=t,this.b=n,ct.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=ct.workingColorSpace){if(e=Ba(e,1),t=Qe(t,0,1),n=Qe(n,0,1),t===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+t):n+t-n*t,r=2*n-o;this.r=wr(r,o,e+1/3),this.g=wr(r,o,e),this.b=wr(r,o,e-1/3)}return ct.toWorkingColorSpace(this,s),this}setStyle(e,t=At){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let o;const r=s[1],a=s[2];switch(r){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,t);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,t);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const o=s[1],r=o.length;if(r===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(o,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=At){const n=kc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Hn(e.r),this.g=Hn(e.g),this.b=Hn(e.b),this}copyLinearToSRGB(e){return this.r=ss(e.r),this.g=ss(e.g),this.b=ss(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=At){return ct.fromWorkingColorSpace(Wt.copy(this),e),Math.round(Qe(Wt.r*255,0,255))*65536+Math.round(Qe(Wt.g*255,0,255))*256+Math.round(Qe(Wt.b*255,0,255))}getHexString(e=At){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ct.workingColorSpace){ct.fromWorkingColorSpace(Wt.copy(this),t);const n=Wt.r,s=Wt.g,o=Wt.b,r=Math.max(n,s,o),a=Math.min(n,s,o);let l,c;const h=(a+r)/2;if(a===r)l=0,c=0;else{const u=r-a;switch(c=h<=.5?u/(r+a):u/(2-r-a),r){case n:l=(s-o)/u+(s<o?6:0);break;case s:l=(o-n)/u+2;break;case o:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=ct.workingColorSpace){return ct.fromWorkingColorSpace(Wt.copy(this),t),e.r=Wt.r,e.g=Wt.g,e.b=Wt.b,e}getStyle(e=At){ct.fromWorkingColorSpace(Wt.copy(this),e);const t=Wt.r,n=Wt.g,s=Wt.b;return e!==At?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(jn),this.setHSL(jn.h+e,jn.s+t,jn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(jn),e.getHSL(co);const n=Us(jn.h,co.h,t),s=Us(jn.s,co.s,t),o=Us(jn.l,co.l,t);return this.setHSL(n,s,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,o=e.elements;return this.r=o[0]*t+o[3]*n+o[6]*s,this.g=o[1]*t+o[4]*n+o[7]*s,this.b=o[2]*t+o[5]*n+o[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Wt=new st;st.NAMES=kc;let Ad=0;class fs extends Ci{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ad++}),this.uuid=Ri(),this.name="",this.type="Material",this.blending=ts,this.side=Wn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Gr,this.blendDst=Vr,this.blendEquation=vi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new st(0,0,0),this.blendAlpha=0,this.depthFunc=os,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=il,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Li,this.stencilZFail=Li,this.stencilZPass=Li,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ts&&(n.blending=this.blending),this.side!==Wn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Gr&&(n.blendSrc=this.blendSrc),this.blendDst!==Vr&&(n.blendDst=this.blendDst),this.blendEquation!==vi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==os&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==il&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Li&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Li&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Li&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(o){const r=[];for(const a in o){const l=o[a];delete l.metadata,r.push(l)}return r}if(t){const o=s(e.textures),r=s(e.images);o.length>0&&(n.textures=o),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let o=0;o!==s;++o)n[o]=t[o].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class bt extends fs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new st(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.combine=bc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Lt=new _,ho=new ue;let Td=0;class An{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Td++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=sl,this.updateRanges=[],this.gpuType=In,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,o=this.itemSize;s<o;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ho.fromBufferAttribute(this,t),ho.applyMatrix3(e),this.setXY(t,ho.x,ho.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix3(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=$i(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=qt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=$i(t,this.array)),t}setX(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=$i(t,this.array)),t}setY(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=$i(t,this.array)),t}setZ(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=$i(t,this.array)),t}setW(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=qt(t,this.array),n=qt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=qt(t,this.array),n=qt(n,this.array),s=qt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,o){return e*=this.itemSize,this.normalized&&(t=qt(t,this.array),n=qt(n,this.array),s=qt(s,this.array),o=qt(o,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=o,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==sl&&(e.usage=this.usage),e}}class Oc extends An{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Bc extends An{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ot extends An{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Pd=0;const mn=new mt,br=new Pt,Hi=new _,ln=new ri,Ps=new ri,Ot=new _;class Ke extends Ci{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Pd++}),this.uuid=Ri(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Nc(e)?Bc:Oc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new et().getNormalMatrix(e);n.applyNormalMatrix(o),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return mn.makeRotationFromQuaternion(e),this.applyMatrix4(mn),this}rotateX(e){return mn.makeRotationX(e),this.applyMatrix4(mn),this}rotateY(e){return mn.makeRotationY(e),this.applyMatrix4(mn),this}rotateZ(e){return mn.makeRotationZ(e),this.applyMatrix4(mn),this}translate(e,t,n){return mn.makeTranslation(e,t,n),this.applyMatrix4(mn),this}scale(e,t,n){return mn.makeScale(e,t,n),this.applyMatrix4(mn),this}lookAt(e){return br.lookAt(e),br.updateMatrix(),this.applyMatrix4(br.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hi).negate(),this.translate(Hi.x,Hi.y,Hi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,o=e.length;s<o;s++){const r=e[s];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new ot(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const o=e[s];t.setXYZ(s,o.x,o.y,o.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ri);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new _(-1/0,-1/0,-1/0),new _(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const o=t[n];ln.setFromBufferAttribute(o),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,ln.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,ln.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(ln.min),this.boundingBox.expandByPoint(ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new us);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new _,1/0);return}if(e){const n=this.boundingSphere.center;if(ln.setFromBufferAttribute(e),t)for(let o=0,r=t.length;o<r;o++){const a=t[o];Ps.setFromBufferAttribute(a),this.morphTargetsRelative?(Ot.addVectors(ln.min,Ps.min),ln.expandByPoint(Ot),Ot.addVectors(ln.max,Ps.max),ln.expandByPoint(Ot)):(ln.expandByPoint(Ps.min),ln.expandByPoint(Ps.max))}ln.getCenter(n);let s=0;for(let o=0,r=e.count;o<r;o++)Ot.fromBufferAttribute(e,o),s=Math.max(s,n.distanceToSquared(Ot));if(t)for(let o=0,r=t.length;o<r;o++){const a=t[o],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ot.fromBufferAttribute(a,c),l&&(Hi.fromBufferAttribute(e,c),Ot.add(Hi)),s=Math.max(s,n.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,o=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new An(new Float32Array(4*n.count),4));const r=this.getAttribute("tangent"),a=[],l=[];for(let b=0;b<n.count;b++)a[b]=new _,l[b]=new _;const c=new _,h=new _,u=new _,d=new ue,f=new ue,g=new ue,x=new _,m=new _;function p(b,v,y){c.fromBufferAttribute(n,b),h.fromBufferAttribute(n,v),u.fromBufferAttribute(n,y),d.fromBufferAttribute(o,b),f.fromBufferAttribute(o,v),g.fromBufferAttribute(o,y),h.sub(c),u.sub(c),f.sub(d),g.sub(d);const M=1/(f.x*g.y-g.x*f.y);isFinite(M)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(M),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(M),a[b].add(x),a[v].add(x),a[y].add(x),l[b].add(m),l[v].add(m),l[y].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let b=0,v=T.length;b<v;++b){const y=T[b],M=y.start,C=y.count;for(let A=M,I=M+C;A<I;A+=3)p(e.getX(A+0),e.getX(A+1),e.getX(A+2))}const E=new _,S=new _,z=new _,D=new _;function R(b){z.fromBufferAttribute(s,b),D.copy(z);const v=a[b];E.copy(v),E.sub(z.multiplyScalar(z.dot(v))).normalize(),S.crossVectors(D,v);const M=S.dot(l[b])<0?-1:1;r.setXYZW(b,E.x,E.y,E.z,M)}for(let b=0,v=T.length;b<v;++b){const y=T[b],M=y.start,C=y.count;for(let A=M,I=M+C;A<I;A+=3)R(e.getX(A+0)),R(e.getX(A+1)),R(e.getX(A+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new An(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new _,o=new _,r=new _,a=new _,l=new _,c=new _,h=new _,u=new _;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),x=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),o.fromBufferAttribute(t,x),r.fromBufferAttribute(t,m),h.subVectors(r,o),u.subVectors(s,o),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),o.fromBufferAttribute(t,d+1),r.fromBufferAttribute(t,d+2),h.subVectors(r,o),u.subVectors(s,o),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?f=l[x]*a.data.stride+a.offset:f=l[x]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new An(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ke,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,n);t.setAttribute(a,c)}const o=this.morphAttributes;for(const a in o){const l=[],c=o[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let a=0,l=r.length;a<l;a++){const c=r[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let o=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,o=!0)}o&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const o=e.morphAttributes;for(const c in o){const h=[],u=o[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,h=r.length;c<h;c++){const u=r[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const _l=new mt,ui=new er,uo=new us,vl=new _,fo=new _,po=new _,mo=new _,Mr=new _,go=new _,wl=new _,xo=new _;class w extends Pt{constructor(e=new Ke,t=new bt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const a=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,o=n.morphAttributes.position,r=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(o&&a){go.set(0,0,0);for(let l=0,c=o.length;l<c;l++){const h=a[l],u=o[l];h!==0&&(Mr.fromBufferAttribute(u,e),r?go.addScaledVector(Mr,h):go.addScaledVector(Mr.sub(t),h))}t.add(go)}return t}raycast(e,t){const n=this.geometry,s=this.material,o=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),uo.copy(n.boundingSphere),uo.applyMatrix4(o),ui.copy(e.ray).recast(e.near),!(uo.containsPoint(ui.origin)===!1&&(ui.intersectSphere(uo,vl)===null||ui.origin.distanceToSquared(vl)>(e.far-e.near)**2))&&(_l.copy(o).invert(),ui.copy(e.ray).applyMatrix4(_l),!(n.boundingBox!==null&&ui.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ui)))}_computeIntersections(e,t,n){let s;const o=this.geometry,r=this.material,a=o.index,l=o.attributes.position,c=o.attributes.uv,h=o.attributes.uv1,u=o.attributes.normal,d=o.groups,f=o.drawRange;if(a!==null)if(Array.isArray(r))for(let g=0,x=d.length;g<x;g++){const m=d[g],p=r[m.materialIndex],T=Math.max(m.start,f.start),E=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let S=T,z=E;S<z;S+=3){const D=a.getX(S),R=a.getX(S+1),b=a.getX(S+2);s=yo(this,p,e,n,c,h,u,D,R,b),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const T=a.getX(m),E=a.getX(m+1),S=a.getX(m+2);s=yo(this,r,e,n,c,h,u,T,E,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,x=d.length;g<x;g++){const m=d[g],p=r[m.materialIndex],T=Math.max(m.start,f.start),E=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let S=T,z=E;S<z;S+=3){const D=S,R=S+1,b=S+2;s=yo(this,p,e,n,c,h,u,D,R,b),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const T=m,E=m+1,S=m+2;s=yo(this,r,e,n,c,h,u,T,E,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Cd(i,e,t,n,s,o,r,a){let l;if(e.side===jt?l=n.intersectTriangle(r,o,s,!0,a):l=n.intersectTriangle(s,o,r,e.side===Wn,a),l===null)return null;xo.copy(a),xo.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(xo);return c<t.near||c>t.far?null:{distance:c,point:xo.clone(),object:i}}function yo(i,e,t,n,s,o,r,a,l,c){i.getVertexPosition(a,fo),i.getVertexPosition(l,po),i.getVertexPosition(c,mo);const h=Cd(i,e,t,n,fo,po,mo,wl);if(h){const u=new _;yn.getBarycoord(wl,fo,po,mo,u),s&&(h.uv=yn.getInterpolatedAttribute(s,a,l,c,u,new ue)),o&&(h.uv1=yn.getInterpolatedAttribute(o,a,l,c,u,new ue)),r&&(h.normal=yn.getInterpolatedAttribute(r,a,l,c,u,new _),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new _,materialIndex:0};yn.getNormal(fo,po,mo,d.normal),h.face=d,h.barycoord=u}return h}class G extends Ke{constructor(e=1,t=1,n=1,s=1,o=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:o,depthSegments:r};const a=this;s=Math.floor(s),o=Math.floor(o),r=Math.floor(r);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,r,o,0),g("z","y","x",1,-1,n,t,-e,r,o,1),g("x","z","y",1,1,e,n,t,s,r,2),g("x","z","y",1,-1,e,n,-t,s,r,3),g("x","y","z",1,-1,e,t,n,s,o,4),g("x","y","z",-1,-1,e,t,-n,s,o,5),this.setIndex(l),this.setAttribute("position",new ot(c,3)),this.setAttribute("normal",new ot(h,3)),this.setAttribute("uv",new ot(u,2));function g(x,m,p,T,E,S,z,D,R,b,v){const y=S/R,M=z/b,C=S/2,A=z/2,I=D/2,U=R+1,k=b+1;let B=0,O=0;const X=new _;for(let J=0;J<k;J++){const ce=J*M-A;for(let pe=0;pe<U;pe++){const Oe=pe*y-C;X[x]=Oe*T,X[m]=ce*E,X[p]=I,c.push(X.x,X.y,X.z),X[x]=0,X[m]=0,X[p]=D>0?1:-1,h.push(X.x,X.y,X.z),u.push(pe/R),u.push(1-J/b),B+=1}}for(let J=0;J<b;J++)for(let ce=0;ce<R;ce++){const pe=d+ce+U*J,Oe=d+ce+U*(J+1),q=d+(ce+1)+U*(J+1),oe=d+(ce+1)+U*J;l.push(pe,Oe,oe),l.push(Oe,q,oe),O+=6}a.addGroup(f,O,v),f+=O,d+=B}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new G(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ds(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Kt(i){const e={};for(let t=0;t<i.length;t++){const n=ds(i[t]);for(const s in n)e[s]=n[s]}return e}function Rd(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Gc(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ct.workingColorSpace}const Id={clone:ds,merge:Kt};var Dd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ld=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class si extends fs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Dd,this.fragmentShader=Ld,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ds(e.uniforms),this.uniformsGroups=Rd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const r=this.uniforms[s].value;r&&r.isTexture?t.uniforms[s]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[s]={type:"m4",value:r.toArray()}:t.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Vc extends Pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new mt,this.projectionMatrix=new mt,this.projectionMatrixInverse=new mt,this.coordinateSystem=Gn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Jn=new _,bl=new ue,Ml=new ue;class cn extends Vc{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Hs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(is*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Hs*2*Math.atan(Math.tan(is*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Jn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Jn.x,Jn.y).multiplyScalar(-e/Jn.z),Jn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Jn.x,Jn.y).multiplyScalar(-e/Jn.z)}getViewSize(e,t){return this.getViewBounds(e,bl,Ml),t.subVectors(Ml,bl)}setViewOffset(e,t,n,s,o,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(is*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,o=-.5*s;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;o+=r.offsetX*s/l,t-=r.offsetY*n/c,s*=r.width/l,n*=r.height/c}const a=this.filmOffset;a!==0&&(o+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Wi=-90,Xi=1;class Fd extends Pt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new cn(Wi,Xi,e,t);s.layers=this.layers,this.add(s);const o=new cn(Wi,Xi,e,t);o.layers=this.layers,this.add(o);const r=new cn(Wi,Xi,e,t);r.layers=this.layers,this.add(r);const a=new cn(Wi,Xi,e,t);a.layers=this.layers,this.add(a);const l=new cn(Wi,Xi,e,t);l.layers=this.layers,this.add(l);const c=new cn(Wi,Xi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,o,r,a,l]=t;for(const c of t)this.remove(c);if(e===Gn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Yo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[o,r,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,o),e.setRenderTarget(n,1,s),e.render(t,r),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Hc extends Yt{constructor(e,t,n,s,o,r,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:rs,super(e,t,n,s,o,r,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class zd extends Ai{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Hc(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Rn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new G(5,5,5),o=new si({name:"CubemapFromEquirect",uniforms:ds(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:jt,blending:ti});o.uniforms.tEquirect.value=t;const r=new w(s,o),a=t.minFilter;return t.minFilter===Mi&&(t.minFilter=Rn),new Fd(1,10,this).update(e,r),t.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(e,t,n,s){const o=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,n,s);e.setRenderTarget(o)}}class se extends Pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Nd={type:"move"};class Sr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new se,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new se,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new _,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new _),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new se,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new _,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new _),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,o=null,r=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,n),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(o=t.getPose(e.gripSpace,n),o!==null&&(l.matrix.fromArray(o.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,o.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(o.linearVelocity)):l.hasLinearVelocity=!1,o.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(o.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&o!==null&&(s=o),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Nd)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=o!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new se;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Wc extends Pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Dn,this.environmentIntensity=1,this.environmentRotation=new Dn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Ud extends Yt{constructor(e=null,t=1,n=1,s,o,r,a,l,c=dn,h=dn,u,d){super(null,r,a,l,c,h,s,o,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Sl extends An{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Yi=new mt,El=new mt,_o=[],Al=new ri,kd=new mt,Cs=new w,Rs=new us;class Go extends w{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Sl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,kd)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ri),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Yi),Al.copy(e.boundingBox).applyMatrix4(Yi),this.boundingBox.union(Al)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new us),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Yi),Rs.copy(e.boundingSphere).applyMatrix4(Yi),this.boundingSphere.union(Rs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,o=n.length+1,r=e*o+1;for(let a=0;a<n.length;a++)n[a]=s[r+a]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(Cs.geometry=this.geometry,Cs.material=this.material,Cs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Rs.copy(this.boundingSphere),Rs.applyMatrix4(n),e.ray.intersectsSphere(Rs)!==!1))for(let o=0;o<s;o++){this.getMatrixAt(o,Yi),El.multiplyMatrices(n,Yi),Cs.matrixWorld=El,Cs.raycast(e,_o);for(let r=0,a=_o.length;r<a;r++){const l=_o[r];l.instanceId=o,l.object=this,t.push(l)}_o.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Sl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ud(new Float32Array(s*this.count),s,this.count,Na,In));const o=this.morphTexture.source.data.data;let r=0;for(let c=0;c<n.length;c++)r+=n[c];const a=this.geometry.morphTargetsRelative?1:1-r,l=s*e;o[l]=a,o.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Er=new _,Od=new _,Bd=new et;class Bn{constructor(e=new _(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Er.subVectors(n,t).cross(Od.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Er),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/s;return o<0||o>1?null:t.copy(e.start).addScaledVector(n,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Bd.getNormalMatrix(e),s=this.coplanarPoint(Er).applyMatrix4(e),o=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(o),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const fi=new us,vo=new _;class Ha{constructor(e=new Bn,t=new Bn,n=new Bn,s=new Bn,o=new Bn,r=new Bn){this.planes=[e,t,n,s,o,r]}set(e,t,n,s,o,r){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(o),a[5].copy(r),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Gn){const n=this.planes,s=e.elements,o=s[0],r=s[1],a=s[2],l=s[3],c=s[4],h=s[5],u=s[6],d=s[7],f=s[8],g=s[9],x=s[10],m=s[11],p=s[12],T=s[13],E=s[14],S=s[15];if(n[0].setComponents(l-o,d-c,m-f,S-p).normalize(),n[1].setComponents(l+o,d+c,m+f,S+p).normalize(),n[2].setComponents(l+r,d+h,m+g,S+T).normalize(),n[3].setComponents(l-r,d-h,m-g,S-T).normalize(),n[4].setComponents(l-a,d-u,m-x,S-E).normalize(),t===Gn)n[5].setComponents(l+a,d+u,m+x,S+E).normalize();else if(t===Yo)n[5].setComponents(a,u,x,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),fi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),fi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(fi)}intersectsSprite(e){return fi.center.set(0,0,0),fi.radius=.7071067811865476,fi.applyMatrix4(e.matrixWorld),this.intersectsSphere(fi)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let o=0;o<6;o++)if(t[o].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(vo.x=s.normal.x>0?e.max.x:e.min.x,vo.y=s.normal.y>0?e.max.y:e.min.y,vo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(vo)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class It extends fs{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new st(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const qo=new _,Ko=new _,Tl=new mt,Is=new er,wo=new us,Ar=new _,Pl=new _;class wt extends Pt{constructor(e=new Ke,t=new It){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,o=t.count;s<o;s++)qo.fromBufferAttribute(t,s-1),Ko.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=qo.distanceTo(Ko);e.setAttribute("lineDistance",new ot(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,o=e.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),wo.copy(n.boundingSphere),wo.applyMatrix4(s),wo.radius+=o,e.ray.intersectsSphere(wo)===!1)return;Tl.copy(s).invert(),Is.copy(e.ray).applyMatrix4(Tl);const a=o/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,r.start),g=Math.min(h.count,r.start+r.count);for(let x=f,m=g-1;x<m;x+=c){const p=h.getX(x),T=h.getX(x+1),E=bo(this,e,Is,l,p,T,x);E&&t.push(E)}if(this.isLineLoop){const x=h.getX(g-1),m=h.getX(f),p=bo(this,e,Is,l,x,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,r.start),g=Math.min(d.count,r.start+r.count);for(let x=f,m=g-1;x<m;x+=c){const p=bo(this,e,Is,l,x,x+1,x);p&&t.push(p)}if(this.isLineLoop){const x=bo(this,e,Is,l,g-1,f,g-1);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const a=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}}function bo(i,e,t,n,s,o,r){const a=i.geometry.attributes.position;if(qo.fromBufferAttribute(a,s),Ko.fromBufferAttribute(a,o),t.distanceSqToSegment(qo,Ko,Ar,Pl)>n)return;Ar.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Ar);if(!(c<e.near||c>e.far))return{distance:c,point:Pl.clone().applyMatrix4(i.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:i}}const Cl=new _,Rl=new _;class Ea extends wt{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,o=t.count;s<o;s+=2)Cl.fromBufferAttribute(t,s),Rl.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Cl.distanceTo(Rl);e.setAttribute("lineDistance",new ot(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Bt extends Yt{constructor(e,t,n,s,o,r,a,l,c){super(e,t,n,s,o,r,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Xc extends Yt{constructor(e,t,n,s,o,r,a,l,c,h=ns){if(h!==ns&&h!==cs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ns&&(n=Ei),n===void 0&&h===cs&&(n=ls),super(null,s,o,r,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:dn,this.minFilter=l!==void 0?l:dn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ga(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Ln{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),o=0;t.push(0);for(let r=1;r<=e;r++)n=this.getPoint(r/e),o+=n.distanceTo(s),t.push(o),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const o=n.length;let r;t?r=t:r=e*n[o-1];let a=0,l=o-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-r,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===r)return s/(o-1);const h=n[s],d=n[s+1]-h,f=(r-h)/d;return(s+f)/(o-1)}getTangent(e,t){let s=e-1e-4,o=e+1e-4;s<0&&(s=0),o>1&&(o=1);const r=this.getPoint(s),a=this.getPoint(o),l=t||(r.isVector2?new ue:new _);return l.copy(a).sub(r).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new _,s=[],o=[],r=[],a=new _,l=new mt;for(let f=0;f<=e;f++){const g=f/e;s[f]=this.getTangentAt(g,new _)}o[0]=new _,r[0]=new _;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),o[0].crossVectors(s[0],a),r[0].crossVectors(s[0],o[0]);for(let f=1;f<=e;f++){if(o[f]=o[f-1].clone(),r[f]=r[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Qe(s[f-1].dot(s[f]),-1,1));o[f].applyMatrix4(l.makeRotationAxis(a,g))}r[f].crossVectors(s[f],o[f])}if(t===!0){let f=Math.acos(Qe(o[0].dot(o[e]),-1,1));f/=e,s[0].dot(a.crossVectors(o[0],o[e]))>0&&(f=-f);for(let g=1;g<=e;g++)o[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),r[g].crossVectors(s[g],o[g])}return{tangents:s,normals:o,binormals:r}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Wa extends Ln{constructor(e=0,t=0,n=1,s=1,o=0,r=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=o,this.aEndAngle=r,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new ue){const n=t,s=Math.PI*2;let o=this.aEndAngle-this.aStartAngle;const r=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=s;for(;o>s;)o-=s;o<Number.EPSILON&&(r?o=0:o=s),this.aClockwise===!0&&!r&&(o===s?o=-s:o=o-s);const a=this.aStartAngle+e*o;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Gd extends Wa{constructor(e,t,n,s,o,r){super(e,t,n,n,s,o,r),this.isArcCurve=!0,this.type="ArcCurve"}}function Xa(){let i=0,e=0,t=0,n=0;function s(o,r,a,l){i=o,e=a,t=-3*o+3*r-2*a-l,n=2*o-2*r+a+l}return{initCatmullRom:function(o,r,a,l,c){s(r,a,c*(a-o),c*(l-r))},initNonuniformCatmullRom:function(o,r,a,l,c,h,u){let d=(r-o)/c-(a-o)/(c+h)+(a-r)/h,f=(a-r)/h-(l-r)/(h+u)+(l-a)/u;d*=h,f*=h,s(r,a,d,f)},calc:function(o){const r=o*o,a=r*o;return i+e*o+t*r+n*a}}}const Mo=new _,Tr=new Xa,Pr=new Xa,Cr=new Xa;class oi extends Ln{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new _){const n=t,s=this.points,o=s.length,r=(o-(this.closed?0:1))*e;let a=Math.floor(r),l=r-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/o)+1)*o:l===0&&a===o-1&&(a=o-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%o]:(Mo.subVectors(s[0],s[1]).add(s[0]),c=Mo);const u=s[a%o],d=s[(a+1)%o];if(this.closed||a+2<o?h=s[(a+2)%o]:(Mo.subVectors(s[o-1],s[o-2]).add(s[o-1]),h=Mo),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),x=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),Tr.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,x,m),Pr.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,x,m),Cr.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(Tr.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Pr.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Cr.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Tr.calc(l),Pr.calc(l),Cr.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new _().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Il(i,e,t,n,s){const o=(n-e)*.5,r=(s-t)*.5,a=i*i,l=i*a;return(2*t-2*n+o+r)*l+(-3*t+3*n-2*o-r)*a+o*i+t}function Vd(i,e){const t=1-i;return t*t*e}function Hd(i,e){return 2*(1-i)*i*e}function Wd(i,e){return i*i*e}function ks(i,e,t,n){return Vd(i,e)+Hd(i,t)+Wd(i,n)}function Xd(i,e){const t=1-i;return t*t*t*e}function Yd(i,e){const t=1-i;return 3*t*t*i*e}function Zd(i,e){return 3*(1-i)*i*i*e}function qd(i,e){return i*i*i*e}function Os(i,e,t,n,s){return Xd(i,e)+Yd(i,t)+Zd(i,n)+qd(i,s)}class Yc extends Ln{constructor(e=new ue,t=new ue,n=new ue,s=new ue){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ue){const n=t,s=this.v0,o=this.v1,r=this.v2,a=this.v3;return n.set(Os(e,s.x,o.x,r.x,a.x),Os(e,s.y,o.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Kd extends Ln{constructor(e=new _,t=new _,n=new _,s=new _){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new _){const n=t,s=this.v0,o=this.v1,r=this.v2,a=this.v3;return n.set(Os(e,s.x,o.x,r.x,a.x),Os(e,s.y,o.y,r.y,a.y),Os(e,s.z,o.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Zc extends Ln{constructor(e=new ue,t=new ue){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ue){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ue){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class $d extends Ln{constructor(e=new _,t=new _){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new _){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new _){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class qc extends Ln{constructor(e=new ue,t=new ue,n=new ue){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ue){const n=t,s=this.v0,o=this.v1,r=this.v2;return n.set(ks(e,s.x,o.x,r.x),ks(e,s.y,o.y,r.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Kc extends Ln{constructor(e=new _,t=new _,n=new _){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new _){const n=t,s=this.v0,o=this.v1,r=this.v2;return n.set(ks(e,s.x,o.x,r.x),ks(e,s.y,o.y,r.y),ks(e,s.z,o.z,r.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class $o extends Ln{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ue){const n=t,s=this.points,o=(s.length-1)*e,r=Math.floor(o),a=o-r,l=s[r===0?r:r-1],c=s[r],h=s[r>s.length-2?s.length-1:r+1],u=s[r>s.length-3?s.length-1:r+2];return n.set(Il(a,l.x,c.x,h.x,u.x),Il(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new ue().fromArray(s))}return this}}var jo=Object.freeze({__proto__:null,ArcCurve:Gd,CatmullRomCurve3:oi,CubicBezierCurve:Yc,CubicBezierCurve3:Kd,EllipseCurve:Wa,LineCurve:Zc,LineCurve3:$d,QuadraticBezierCurve:qc,QuadraticBezierCurve3:Kc,SplineCurve:$o});class jd extends Ln{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new jo[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let o=0;for(;o<s.length;){if(s[o]>=n){const r=s[o]-n,a=this.curves[o],l=a.getLength(),c=l===0?0:1-r/l;return a.getPointAt(c,t)}o++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,o=this.curves;s<o.length;s++){const r=o[s],a=r.isEllipseCurve?e*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?e*r.points.length:e,l=r.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new jo[s.type]().fromJSON(s))}return this}}class $t extends jd{constructor(e){super(),this.type="Path",this.currentPoint=new ue,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Zc(this.currentPoint.clone(),new ue(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const o=new qc(this.currentPoint.clone(),new ue(e,t),new ue(n,s));return this.curves.push(o),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,o,r){const a=new Yc(this.currentPoint.clone(),new ue(e,t),new ue(n,s),new ue(o,r));return this.curves.push(a),this.currentPoint.set(o,r),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new $o(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,o,r){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,s,o,r),this}absarc(e,t,n,s,o,r){return this.absellipse(e,t,n,n,s,o,r),this}ellipse(e,t,n,s,o,r,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,s,o,r,a,l),this}absellipse(e,t,n,s,o,r,a,l){const c=new Wa(e,t,n,s,o,r,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Ya extends Ke{constructor(e=[new ue(0,-.5),new ue(.5,0),new ue(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=Qe(s,0,Math.PI*2);const o=[],r=[],a=[],l=[],c=[],h=1/t,u=new _,d=new ue,f=new _,g=new _,x=new _;let m=0,p=0;for(let T=0;T<=e.length-1;T++)switch(T){case 0:m=e[T+1].x-e[T].x,p=e[T+1].y-e[T].y,f.x=p*1,f.y=-m,f.z=p*0,x.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(x.x,x.y,x.z);break;default:m=e[T+1].x-e[T].x,p=e[T+1].y-e[T].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),l.push(f.x,f.y,f.z),x.copy(g)}for(let T=0;T<=t;T++){const E=n+T*h*s,S=Math.sin(E),z=Math.cos(E);for(let D=0;D<=e.length-1;D++){u.x=e[D].x*S,u.y=e[D].y,u.z=e[D].x*z,r.push(u.x,u.y,u.z),d.x=T/t,d.y=D/(e.length-1),a.push(d.x,d.y);const R=l[3*D+0]*S,b=l[3*D+1],v=l[3*D+0]*z;c.push(R,b,v)}}for(let T=0;T<t;T++)for(let E=0;E<e.length-1;E++){const S=E+T*e.length,z=S,D=S+e.length,R=S+e.length+1,b=S+1;o.push(z,D,b),o.push(R,b,D)}this.setIndex(o),this.setAttribute("position",new ot(r,3)),this.setAttribute("uv",new ot(a,2)),this.setAttribute("normal",new ot(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ya(e.points,e.segments,e.phiStart,e.phiLength)}}class Ws extends Ke{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const o=[],r=[],a=[],l=[],c=new _,h=new ue;r.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const f=n+u/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),r.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(r[d]/e+1)/2,h.y=(r[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)o.push(u,u+1,0);this.setIndex(o),this.setAttribute("position",new ot(r,3)),this.setAttribute("normal",new ot(a,3)),this.setAttribute("uv",new ot(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ws(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class De extends Ke{constructor(e=1,t=1,n=1,s=32,o=1,r=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:o,openEnded:r,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),o=Math.floor(o);const h=[],u=[],d=[],f=[];let g=0;const x=[],m=n/2;let p=0;T(),r===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new ot(u,3)),this.setAttribute("normal",new ot(d,3)),this.setAttribute("uv",new ot(f,2));function T(){const S=new _,z=new _;let D=0;const R=(t-e)/n;for(let b=0;b<=o;b++){const v=[],y=b/o,M=y*(t-e)+e;for(let C=0;C<=s;C++){const A=C/s,I=A*l+a,U=Math.sin(I),k=Math.cos(I);z.x=M*U,z.y=-y*n+m,z.z=M*k,u.push(z.x,z.y,z.z),S.set(U,R,k).normalize(),d.push(S.x,S.y,S.z),f.push(A,1-y),v.push(g++)}x.push(v)}for(let b=0;b<s;b++)for(let v=0;v<o;v++){const y=x[v][b],M=x[v+1][b],C=x[v+1][b+1],A=x[v][b+1];(e>0||v!==0)&&(h.push(y,M,A),D+=3),(t>0||v!==o-1)&&(h.push(M,C,A),D+=3)}c.addGroup(p,D,0),p+=D}function E(S){const z=g,D=new ue,R=new _;let b=0;const v=S===!0?e:t,y=S===!0?1:-1;for(let C=1;C<=s;C++)u.push(0,m*y,0),d.push(0,y,0),f.push(.5,.5),g++;const M=g;for(let C=0;C<=s;C++){const I=C/s*l+a,U=Math.cos(I),k=Math.sin(I);R.x=v*k,R.y=m*y,R.z=v*U,u.push(R.x,R.y,R.z),d.push(0,y,0),D.x=U*.5+.5,D.y=k*.5*y+.5,f.push(D.x,D.y),g++}for(let C=0;C<s;C++){const A=z+C,I=M+C;S===!0?h.push(I,I+1,A):h.push(I+1,I,A),b+=3}c.addGroup(p,b,S===!0?1:2),p+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new De(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Za extends De{constructor(e=1,t=1,n=32,s=1,o=!1,r=0,a=Math.PI*2){super(0,e,t,n,s,o,r,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:o,thetaStart:r,thetaLength:a}}static fromJSON(e){return new Za(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const So=new _,Eo=new _,Rr=new _,Ao=new yn;class Aa extends Ke{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const s=Math.pow(10,4),o=Math.cos(is*t),r=e.getIndex(),a=e.getAttribute("position"),l=r?r.count:a.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let g=0;g<l;g+=3){r?(c[0]=r.getX(g),c[1]=r.getX(g+1),c[2]=r.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:x,b:m,c:p}=Ao;if(x.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),p.fromBufferAttribute(a,c[2]),Ao.getNormal(Rr),u[0]=`${Math.round(x.x*s)},${Math.round(x.y*s)},${Math.round(x.z*s)}`,u[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,u[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let T=0;T<3;T++){const E=(T+1)%3,S=u[T],z=u[E],D=Ao[h[T]],R=Ao[h[E]],b=`${S}_${z}`,v=`${z}_${S}`;v in d&&d[v]?(Rr.dot(d[v].normal)<=o&&(f.push(D.x,D.y,D.z),f.push(R.x,R.y,R.z)),d[v]=null):b in d||(d[b]={index0:c[T],index1:c[E],normal:Rr.clone()})}}for(const g in d)if(d[g]){const{index0:x,index1:m}=d[g];So.fromBufferAttribute(a,x),Eo.fromBufferAttribute(a,m),f.push(So.x,So.y,So.z),f.push(Eo.x,Eo.y,Eo.z)}this.setAttribute("position",new ot(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class on extends $t{constructor(e){super(e),this.uuid=Ri(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new $t().fromJSON(s))}return this}}class Jd{static triangulate(e,t,n=2){const s=t&&t.length,o=s?t[0]*n:e.length;let r=$c(e,0,o,n,!0);const a=[];if(!r||r.next===r.prev)return a;let l,c,h,u,d,f,g;if(s&&(r=iu(e,t,r,n)),e.length>80*n){l=h=e[0],c=u=e[1];for(let x=n;x<o;x+=n)d=e[x],f=e[x+1],d<l&&(l=d),f<c&&(c=f),d>h&&(h=d),f>u&&(u=f);g=Math.max(h-l,u-c),g=g!==0?32767/g:0}return Xs(r,a,n,l,c,g,0),a}}function $c(i,e,t,n,s){let o,r;if(s===pu(i,e,t,n)>0)for(o=e;o<t;o+=n)r=Dl(o,i[o],i[o+1],r);else for(o=t-n;o>=e;o-=n)r=Dl(o,i[o],i[o+1],r);return r&&tr(r,r.next)&&(Zs(r),r=r.next),r}function Pi(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(tr(t,t.next)||Tt(t.prev,t,t.next)===0)){if(Zs(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Xs(i,e,t,n,s,o,r){if(!i)return;!r&&o&&lu(i,n,s,o);let a=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,o?eu(i,n,s,o):Qd(i)){e.push(l.i/t|0),e.push(i.i/t|0),e.push(c.i/t|0),Zs(i),i=c.next,a=c.next;continue}if(i=c,i===a){r?r===1?(i=tu(Pi(i),e,t),Xs(i,e,t,n,s,o,2)):r===2&&nu(i,e,t,n,s,o):Xs(Pi(i),e,t,n,s,o,1);break}}}function Qd(i){const e=i.prev,t=i,n=i.next;if(Tt(e,t,n)>=0)return!1;const s=e.x,o=t.x,r=n.x,a=e.y,l=t.y,c=n.y,h=s<o?s<r?s:r:o<r?o:r,u=a<l?a<c?a:c:l<c?l:c,d=s>o?s>r?s:r:o>r?o:r,f=a>l?a>c?a:c:l>c?l:c;let g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&Ji(s,a,o,l,r,c,g.x,g.y)&&Tt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function eu(i,e,t,n){const s=i.prev,o=i,r=i.next;if(Tt(s,o,r)>=0)return!1;const a=s.x,l=o.x,c=r.x,h=s.y,u=o.y,d=r.y,f=a<l?a<c?a:c:l<c?l:c,g=h<u?h<d?h:d:u<d?u:d,x=a>l?a>c?a:c:l>c?l:c,m=h>u?h>d?h:d:u>d?u:d,p=Ta(f,g,e,t,n),T=Ta(x,m,e,t,n);let E=i.prevZ,S=i.nextZ;for(;E&&E.z>=p&&S&&S.z<=T;){if(E.x>=f&&E.x<=x&&E.y>=g&&E.y<=m&&E!==s&&E!==r&&Ji(a,h,l,u,c,d,E.x,E.y)&&Tt(E.prev,E,E.next)>=0||(E=E.prevZ,S.x>=f&&S.x<=x&&S.y>=g&&S.y<=m&&S!==s&&S!==r&&Ji(a,h,l,u,c,d,S.x,S.y)&&Tt(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;E&&E.z>=p;){if(E.x>=f&&E.x<=x&&E.y>=g&&E.y<=m&&E!==s&&E!==r&&Ji(a,h,l,u,c,d,E.x,E.y)&&Tt(E.prev,E,E.next)>=0)return!1;E=E.prevZ}for(;S&&S.z<=T;){if(S.x>=f&&S.x<=x&&S.y>=g&&S.y<=m&&S!==s&&S!==r&&Ji(a,h,l,u,c,d,S.x,S.y)&&Tt(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function tu(i,e,t){let n=i;do{const s=n.prev,o=n.next.next;!tr(s,o)&&jc(s,n,n.next,o)&&Ys(s,o)&&Ys(o,s)&&(e.push(s.i/t|0),e.push(n.i/t|0),e.push(o.i/t|0),Zs(n),Zs(n.next),n=i=o),n=n.next}while(n!==i);return Pi(n)}function nu(i,e,t,n,s,o){let r=i;do{let a=r.next.next;for(;a!==r.prev;){if(r.i!==a.i&&du(r,a)){let l=Jc(r,a);r=Pi(r,r.next),l=Pi(l,l.next),Xs(r,e,t,n,s,o,0),Xs(l,e,t,n,s,o,0);return}a=a.next}r=r.next}while(r!==i)}function iu(i,e,t,n){const s=[];let o,r,a,l,c;for(o=0,r=e.length;o<r;o++)a=e[o]*n,l=o<r-1?e[o+1]*n:i.length,c=$c(i,a,l,n,!1),c===c.next&&(c.steiner=!0),s.push(hu(c));for(s.sort(su),o=0;o<s.length;o++)t=ou(s[o],t);return t}function su(i,e){return i.x-e.x}function ou(i,e){const t=ru(i,e);if(!t)return e;const n=Jc(t,i);return Pi(n,n.next),Pi(t,t.next)}function ru(i,e){let t=e,n=-1/0,s;const o=i.x,r=i.y;do{if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const d=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=o&&d>n&&(n=d,s=t.x<t.next.x?t:t.next,d===o))return s}t=t.next}while(t!==e);if(!s)return null;const a=s,l=s.x,c=s.y;let h=1/0,u;t=s;do o>=t.x&&t.x>=l&&o!==t.x&&Ji(r<c?o:n,r,l,c,r<c?n:o,r,t.x,t.y)&&(u=Math.abs(r-t.y)/(o-t.x),Ys(t,i)&&(u<h||u===h&&(t.x>s.x||t.x===s.x&&au(s,t)))&&(s=t,h=u)),t=t.next;while(t!==a);return s}function au(i,e){return Tt(i.prev,i,e.prev)<0&&Tt(e.next,i,i.next)<0}function lu(i,e,t,n){let s=i;do s.z===0&&(s.z=Ta(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,cu(s)}function cu(i){let e,t,n,s,o,r,a,l,c=1;do{for(t=i,i=null,o=null,r=0;t;){for(r++,n=t,a=0,e=0;e<c&&(a++,n=n.nextZ,!!n);e++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||t.z<=n.z)?(s=t,t=t.nextZ,a--):(s=n,n=n.nextZ,l--),o?o.nextZ=s:i=s,s.prevZ=o,o=s;t=n}o.nextZ=null,c*=2}while(r>1);return i}function Ta(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function hu(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Ji(i,e,t,n,s,o,r,a){return(s-r)*(e-a)>=(i-r)*(o-a)&&(i-r)*(n-a)>=(t-r)*(e-a)&&(t-r)*(o-a)>=(s-r)*(n-a)}function du(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!uu(i,e)&&(Ys(i,e)&&Ys(e,i)&&fu(i,e)&&(Tt(i.prev,i,e.prev)||Tt(i,e.prev,e))||tr(i,e)&&Tt(i.prev,i,i.next)>0&&Tt(e.prev,e,e.next)>0)}function Tt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function tr(i,e){return i.x===e.x&&i.y===e.y}function jc(i,e,t,n){const s=Po(Tt(i,e,t)),o=Po(Tt(i,e,n)),r=Po(Tt(t,n,i)),a=Po(Tt(t,n,e));return!!(s!==o&&r!==a||s===0&&To(i,t,e)||o===0&&To(i,n,e)||r===0&&To(t,i,n)||a===0&&To(t,e,n))}function To(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Po(i){return i>0?1:i<0?-1:0}function uu(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&jc(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Ys(i,e){return Tt(i.prev,i,i.next)<0?Tt(i,e,i.next)>=0&&Tt(i,i.prev,e)>=0:Tt(i,e,i.prev)<0||Tt(i,i.next,e)<0}function fu(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,o=(i.y+e.y)/2;do t.y>o!=t.next.y>o&&t.next.y!==t.y&&s<(t.next.x-t.x)*(o-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Jc(i,e){const t=new Pa(i.i,i.x,i.y),n=new Pa(e.i,e.x,e.y),s=i.next,o=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,o.next=n,n.prev=o,n}function Dl(i,e,t,n){const s=new Pa(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Zs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Pa(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function pu(i,e,t,n){let s=0;for(let o=e,r=t-n;o<t;o+=n)s+=(i[r]-i[o])*(i[o+1]+i[r+1]),r=o;return s}class Bs{static area(e){const t=e.length;let n=0;for(let s=t-1,o=0;o<t;s=o++)n+=e[s].x*e[o].y-e[o].x*e[s].y;return n*.5}static isClockWise(e){return Bs.area(e)<0}static triangulateShape(e,t){const n=[],s=[],o=[];Ll(e),Fl(n,e);let r=e.length;t.forEach(Ll);for(let l=0;l<t.length;l++)s.push(r),r+=t[l].length,Fl(n,t[l]);const a=Jd.triangulate(n,s);for(let l=0;l<a.length;l+=3)o.push(a.slice(l,l+3));return o}}function Ll(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Fl(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Si extends Ke{constructor(e=new on([new ue(.5,.5),new ue(-.5,.5),new ue(-.5,-.5),new ue(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];r(c)}this.setAttribute("position",new ot(s,3)),this.setAttribute("uv",new ot(o,2)),this.computeVertexNormals();function r(a){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,T=t.UVGenerator!==void 0?t.UVGenerator:mu;let E,S=!1,z,D,R,b;p&&(E=p.getSpacedPoints(h),S=!0,d=!1,z=p.computeFrenetFrames(h,!1),D=new _,R=new _,b=new _),d||(m=0,f=0,g=0,x=0);const v=a.extractPoints(c);let y=v.shape;const M=v.holes;if(!Bs.isClockWise(y)){y=y.reverse();for(let re=0,te=M.length;re<te;re++){const N=M[re];Bs.isClockWise(N)&&(M[re]=N.reverse())}}const A=Bs.triangulateShape(y,M),I=y;for(let re=0,te=M.length;re<te;re++){const N=M[re];y=y.concat(N)}function U(re,te,N){return te||console.error("THREE.ExtrudeGeometry: vec does not exist"),re.clone().addScaledVector(te,N)}const k=y.length,B=A.length;function O(re,te,N){let Ee,he,_e;const fe=re.x-te.x,Ie=re.y-te.y,we=N.x-re.x,F=N.y-re.y,P=fe*fe+Ie*Ie,W=fe*F-Ie*we;if(Math.abs(W)>Number.EPSILON){const j=Math.sqrt(P),ae=Math.sqrt(we*we+F*F),ie=te.x-Ie/j,Be=te.y+fe/j,be=N.x-F/ae,Re=N.y+we/ae,nt=((be-ie)*F-(Re-Be)*we)/(fe*F-Ie*we);Ee=ie+fe*nt-re.x,he=Be+Ie*nt-re.y;const ge=Ee*Ee+he*he;if(ge<=2)return new ue(Ee,he);_e=Math.sqrt(ge/2)}else{let j=!1;fe>Number.EPSILON?we>Number.EPSILON&&(j=!0):fe<-Number.EPSILON?we<-Number.EPSILON&&(j=!0):Math.sign(Ie)===Math.sign(F)&&(j=!0),j?(Ee=-Ie,he=fe,_e=Math.sqrt(P)):(Ee=fe,he=Ie,_e=Math.sqrt(P/2))}return new ue(Ee/_e,he/_e)}const X=[];for(let re=0,te=I.length,N=te-1,Ee=re+1;re<te;re++,N++,Ee++)N===te&&(N=0),Ee===te&&(Ee=0),X[re]=O(I[re],I[N],I[Ee]);const J=[];let ce,pe=X.concat();for(let re=0,te=M.length;re<te;re++){const N=M[re];ce=[];for(let Ee=0,he=N.length,_e=he-1,fe=Ee+1;Ee<he;Ee++,_e++,fe++)_e===he&&(_e=0),fe===he&&(fe=0),ce[Ee]=O(N[Ee],N[_e],N[fe]);J.push(ce),pe=pe.concat(ce)}for(let re=0;re<m;re++){const te=re/m,N=f*Math.cos(te*Math.PI/2),Ee=g*Math.sin(te*Math.PI/2)+x;for(let he=0,_e=I.length;he<_e;he++){const fe=U(I[he],X[he],Ee);le(fe.x,fe.y,-N)}for(let he=0,_e=M.length;he<_e;he++){const fe=M[he];ce=J[he];for(let Ie=0,we=fe.length;Ie<we;Ie++){const F=U(fe[Ie],ce[Ie],Ee);le(F.x,F.y,-N)}}}const Oe=g+x;for(let re=0;re<k;re++){const te=d?U(y[re],pe[re],Oe):y[re];S?(R.copy(z.normals[0]).multiplyScalar(te.x),D.copy(z.binormals[0]).multiplyScalar(te.y),b.copy(E[0]).add(R).add(D),le(b.x,b.y,b.z)):le(te.x,te.y,0)}for(let re=1;re<=h;re++)for(let te=0;te<k;te++){const N=d?U(y[te],pe[te],Oe):y[te];S?(R.copy(z.normals[re]).multiplyScalar(N.x),D.copy(z.binormals[re]).multiplyScalar(N.y),b.copy(E[re]).add(R).add(D),le(b.x,b.y,b.z)):le(N.x,N.y,u/h*re)}for(let re=m-1;re>=0;re--){const te=re/m,N=f*Math.cos(te*Math.PI/2),Ee=g*Math.sin(te*Math.PI/2)+x;for(let he=0,_e=I.length;he<_e;he++){const fe=U(I[he],X[he],Ee);le(fe.x,fe.y,u+N)}for(let he=0,_e=M.length;he<_e;he++){const fe=M[he];ce=J[he];for(let Ie=0,we=fe.length;Ie<we;Ie++){const F=U(fe[Ie],ce[Ie],Ee);S?le(F.x,F.y+E[h-1].y,E[h-1].x+N):le(F.x,F.y,u+N)}}}q(),oe();function q(){const re=s.length/3;if(d){let te=0,N=k*te;for(let Ee=0;Ee<B;Ee++){const he=A[Ee];ne(he[2]+N,he[1]+N,he[0]+N)}te=h+m*2,N=k*te;for(let Ee=0;Ee<B;Ee++){const he=A[Ee];ne(he[0]+N,he[1]+N,he[2]+N)}}else{for(let te=0;te<B;te++){const N=A[te];ne(N[2],N[1],N[0])}for(let te=0;te<B;te++){const N=A[te];ne(N[0]+k*h,N[1]+k*h,N[2]+k*h)}}n.addGroup(re,s.length/3-re,0)}function oe(){const re=s.length/3;let te=0;ye(I,te),te+=I.length;for(let N=0,Ee=M.length;N<Ee;N++){const he=M[N];ye(he,te),te+=he.length}n.addGroup(re,s.length/3-re,1)}function ye(re,te){let N=re.length;for(;--N>=0;){const Ee=N;let he=N-1;he<0&&(he=re.length-1);for(let _e=0,fe=h+m*2;_e<fe;_e++){const Ie=k*_e,we=k*(_e+1),F=te+Ee+Ie,P=te+he+Ie,W=te+he+we,j=te+Ee+we;ve(F,P,W,j)}}}function le(re,te,N){l.push(re),l.push(te),l.push(N)}function ne(re,te,N){Z(re),Z(te),Z(N);const Ee=s.length/3,he=T.generateTopUV(n,s,Ee-3,Ee-2,Ee-1);Ne(he[0]),Ne(he[1]),Ne(he[2])}function ve(re,te,N,Ee){Z(re),Z(te),Z(Ee),Z(te),Z(N),Z(Ee);const he=s.length/3,_e=T.generateSideWallUV(n,s,he-6,he-3,he-2,he-1);Ne(_e[0]),Ne(_e[1]),Ne(_e[3]),Ne(_e[1]),Ne(_e[2]),Ne(_e[3])}function Z(re){s.push(l[re*3+0]),s.push(l[re*3+1]),s.push(l[re*3+2])}function Ne(re){o.push(re.x),o.push(re.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return gu(t,n,e)}static fromJSON(e,t){const n=[];for(let o=0,r=e.shapes.length;o<r;o++){const a=t[e.shapes[o]];n.push(a)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new jo[s.type]().fromJSON(s)),new Si(n,e.options)}}const mu={generateTopUV:function(i,e,t,n,s){const o=e[t*3],r=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[s*3],h=e[s*3+1];return[new ue(o,r),new ue(a,l),new ue(c,h)]},generateSideWallUV:function(i,e,t,n,s,o){const r=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[s*3],f=e[s*3+1],g=e[s*3+2],x=e[o*3],m=e[o*3+1],p=e[o*3+2];return Math.abs(a-h)<Math.abs(r-c)?[new ue(r,1-l),new ue(c,1-u),new ue(d,1-g),new ue(x,1-p)]:[new ue(a,1-l),new ue(h,1-u),new ue(f,1-g),new ue(m,1-p)]}};function gu(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const o=i[n];t.shapes.push(o.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Tn extends Ke{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const o=e/2,r=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=e/a,d=t/l,f=[],g=[],x=[],m=[];for(let p=0;p<h;p++){const T=p*d-r;for(let E=0;E<c;E++){const S=E*u-o;g.push(S,-T,0),x.push(0,0,1),m.push(E/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let T=0;T<a;T++){const E=T+c*p,S=T+c*(p+1),z=T+1+c*(p+1),D=T+1+c*p;f.push(E,S,D),f.push(S,z,D)}this.setIndex(f),this.setAttribute("position",new ot(g,3)),this.setAttribute("normal",new ot(x,3)),this.setAttribute("uv",new ot(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Tn(e.width,e.height,e.widthSegments,e.heightSegments)}}class ii extends Ke{constructor(e=.5,t=1,n=32,s=1,o=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:o,thetaLength:r},n=Math.max(3,n),s=Math.max(1,s);const a=[],l=[],c=[],h=[];let u=e;const d=(t-e)/s,f=new _,g=new ue;for(let x=0;x<=s;x++){for(let m=0;m<=n;m++){const p=o+m/n*r;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let x=0;x<s;x++){const m=x*(n+1);for(let p=0;p<n;p++){const T=p+m,E=T,S=T+n+1,z=T+n+2,D=T+1;a.push(E,S,D),a.push(S,z,D)}}this.setIndex(a),this.setAttribute("position",new ot(l,3)),this.setAttribute("normal",new ot(c,3)),this.setAttribute("uv",new ot(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ii(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Et extends Ke{constructor(e=1,t=32,n=16,s=0,o=Math.PI*2,r=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:o,thetaStart:r,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(r+a,Math.PI);let c=0;const h=[],u=new _,d=new _,f=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){const T=[],E=p/n;let S=0;p===0&&r===0?S=.5/t:p===n&&l===Math.PI&&(S=-.5/t);for(let z=0;z<=t;z++){const D=z/t;u.x=-e*Math.cos(s+D*o)*Math.sin(r+E*a),u.y=e*Math.cos(r+E*a),u.z=e*Math.sin(s+D*o)*Math.sin(r+E*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),m.push(D+S,1-E),T.push(c++)}h.push(T)}for(let p=0;p<n;p++)for(let T=0;T<t;T++){const E=h[p][T+1],S=h[p][T],z=h[p+1][T],D=h[p+1][T+1];(p!==0||r>0)&&f.push(E,S,D),(p!==n-1||l<Math.PI)&&f.push(S,z,D)}this.setIndex(f),this.setAttribute("position",new ot(g,3)),this.setAttribute("normal",new ot(x,3)),this.setAttribute("uv",new ot(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Et(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class hn extends Ke{constructor(e=1,t=.4,n=12,s=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:o},n=Math.floor(n),s=Math.floor(s);const r=[],a=[],l=[],c=[],h=new _,u=new _,d=new _;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){const x=g/s*o,m=f/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(x),u.y=(e+t*Math.cos(m))*Math.sin(x),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),h.x=e*Math.cos(x),h.y=e*Math.sin(x),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){const x=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,T=(s+1)*f+g;r.push(x,m,T),r.push(m,p,T)}this.setIndex(r),this.setAttribute("position",new ot(a,3)),this.setAttribute("normal",new ot(l,3)),this.setAttribute("uv",new ot(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hn(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Yn extends Ke{constructor(e=new Kc(new _(-1,-1,0),new _(-1,1,0),new _(1,1,0)),t=64,n=1,s=8,o=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:o};const r=e.computeFrenetFrames(t,o);this.tangents=r.tangents,this.normals=r.normals,this.binormals=r.binormals;const a=new _,l=new _,c=new ue;let h=new _;const u=[],d=[],f=[],g=[];x(),this.setIndex(g),this.setAttribute("position",new ot(u,3)),this.setAttribute("normal",new ot(d,3)),this.setAttribute("uv",new ot(f,2));function x(){for(let E=0;E<t;E++)m(E);m(o===!1?t:0),T(),p()}function m(E){h=e.getPointAt(E/t,h);const S=r.normals[E],z=r.binormals[E];for(let D=0;D<=s;D++){const R=D/s*Math.PI*2,b=Math.sin(R),v=-Math.cos(R);l.x=v*S.x+b*z.x,l.y=v*S.y+b*z.y,l.z=v*S.z+b*z.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function p(){for(let E=1;E<=t;E++)for(let S=1;S<=s;S++){const z=(s+1)*(E-1)+(S-1),D=(s+1)*E+(S-1),R=(s+1)*E+S,b=(s+1)*(E-1)+S;g.push(z,D,b),g.push(D,R,b)}}function T(){for(let E=0;E<=t;E++)for(let S=0;S<=s;S++)c.x=E/t,c.y=S/s,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Yn(new jo[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class Ge extends fs{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new st(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new st(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fc,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class je extends Ge{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ue(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Qe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new st(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new st(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new st(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class xu extends fs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Uh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class yu extends fs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class _n extends It{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class qa extends Pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new st(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class _u extends qa{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new st(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ir=new mt,zl=new _,Nl=new _;class Qc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ue(512,512),this.map=null,this.mapPass=null,this.matrix=new mt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ha,this._frameExtents=new ue(1,1),this._viewportCount=1,this._viewports=[new _t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;zl.setFromMatrixPosition(e.matrixWorld),t.position.copy(zl),Nl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Nl),t.updateMatrixWorld(),Ir.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ir),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ir)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Ul=new mt,Ds=new _,Dr=new _;class vu extends Qc{constructor(){super(new cn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ue(4,2),this._viewportCount=6,this._viewports=[new _t(2,1,1,1),new _t(0,1,1,1),new _t(3,1,1,1),new _t(1,1,1,1),new _t(3,0,1,1),new _t(1,0,1,1)],this._cubeDirections=[new _(1,0,0),new _(-1,0,0),new _(0,0,1),new _(0,0,-1),new _(0,1,0),new _(0,-1,0)],this._cubeUps=[new _(0,1,0),new _(0,1,0),new _(0,1,0),new _(0,1,0),new _(0,0,1),new _(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,o=e.distance||n.far;o!==n.far&&(n.far=o,n.updateProjectionMatrix()),Ds.setFromMatrixPosition(e.matrixWorld),n.position.copy(Ds),Dr.copy(n.position),Dr.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Dr),n.updateMatrixWorld(),s.makeTranslation(-Ds.x,-Ds.y,-Ds.z),Ul.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ul)}}class wu extends qa{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new vu}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class eh extends Vc{constructor(e=-1,t=1,n=1,s=-1,o=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=o,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,o,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let o=n-e,r=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=c*this.view.offsetX,r=o+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(o,r,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class bu extends Qc{constructor(){super(new eh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Co extends qa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.shadow=new bu}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Mu extends cn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}class Su{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=kl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=kl();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function kl(){return performance.now()}const Ol=new mt;class Eu{constructor(e,t,n=0,s=1/0){this.ray=new er(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Va,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ol.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ol),this}intersectObject(e,t=!0,n=[]){return Ca(e,this,n,t),n.sort(Bl),n}intersectObjects(e,t=!0,n=[]){for(let s=0,o=e.length;s<o;s++)Ca(e[s],this,n,t);return n.sort(Bl),n}}function Bl(i,e){return i.distance-e.distance}function Ca(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const o=i.children;for(let r=0,a=o.length;r<a;r++)Ca(o[r],e,t,!0)}}class Gl{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Qe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Qe(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Vl=new _;let Ro,Lr;class Au extends Pt{constructor(e=new _(0,0,1),t=new _(0,0,0),n=1,s=16776960,o=n*.2,r=o*.2){super(),this.type="ArrowHelper",Ro===void 0&&(Ro=new Ke,Ro.setAttribute("position",new ot([0,0,0,0,1,0],3)),Lr=new De(0,.5,1,5,1),Lr.translate(0,-.5,0)),this.position.copy(t),this.line=new wt(Ro,new It({color:s,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new w(Lr,new bt({color:s,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,o,r)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Vl.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Vl,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class Tu extends Ci{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function Hl(i,e,t,n){const s=Pu(n);switch(t){case Pc:return i*e;case Rc:return i*e;case Ic:return i*e*2;case Na:return i*e/s.components*s.byteLength;case Ua:return i*e/s.components*s.byteLength;case Dc:return i*e*2/s.components*s.byteLength;case ka:return i*e*2/s.components*s.byteLength;case Cc:return i*e*3/s.components*s.byteLength;case Sn:return i*e*4/s.components*s.byteLength;case Oa:return i*e*4/s.components*s.byteLength;case No:case Uo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ko:case Oo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ea:case na:return Math.max(i,16)*Math.max(e,8)/4;case Qr:case ta:return Math.max(i,8)*Math.max(e,8)/2;case ia:case sa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case oa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ra:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case aa:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case la:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ca:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ha:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case da:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ua:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case fa:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case pa:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case ma:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ga:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case xa:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ya:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case _a:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Bo:case va:case wa:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Lc:case ba:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ma:case Sa:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Pu(i){switch(i){case Xn:case Ec:return{byteLength:1,components:1};case Vs:case Ac:case Ks:return{byteLength:2,components:1};case Fa:case za:return{byteLength:2,components:4};case Ei:case La:case In:return{byteLength:4,components:1};case Tc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Da}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Da);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function th(){let i=null,e=!1,t=null,n=null;function s(o,r){t(o,r),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(o){t=o},setContext:function(o){i=o}}}function Cu(i){const e=new WeakMap;function t(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],x=u[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,u[d]=x)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const x=u[f];i.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function o(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function r(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:o,update:r}}var Ru=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Iu=`#ifdef USE_ALPHAHASH
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
#endif`,Du=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Lu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Nu=`#ifdef USE_AOMAP
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
#endif`,Uu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ku=`#ifdef USE_BATCHING
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
#endif`,Ou=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Bu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Gu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Vu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Hu=`#ifdef USE_IRIDESCENCE
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
#endif`,Wu=`#ifdef USE_BUMPMAP
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
#endif`,Xu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Yu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,qu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ku=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,$u=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ju=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ju=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Qu=`#define PI 3.141592653589793
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
} // validated`,ef=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,tf=`vec3 transformedNormal = objectNormal;
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
#endif`,nf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,sf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,of=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,rf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,af="gl_FragColor = linearToOutputTexel( gl_FragColor );",lf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,cf=`#ifdef USE_ENVMAP
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
#endif`,hf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,df=`#ifdef USE_ENVMAP
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
#endif`,uf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ff=`#ifdef USE_ENVMAP
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
#endif`,pf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,mf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,gf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,xf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,yf=`#ifdef USE_GRADIENTMAP
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
}`,_f=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,wf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,bf=`uniform bool receiveShadow;
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
#endif`,Mf=`#ifdef USE_ENVMAP
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
#endif`,Sf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ef=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Af=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Tf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Pf=`PhysicalMaterial material;
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
#endif`,Cf=`struct PhysicalMaterial {
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
}`,Rf=`
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
#endif`,If=`#if defined( RE_IndirectDiffuse )
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
#endif`,Df=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Lf=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ff=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Nf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Uf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,kf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Of=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Bf=`#if defined( USE_POINTS_UV )
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
#endif`,Gf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Vf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Hf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Wf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Xf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Yf=`#ifdef USE_MORPHTARGETS
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
#endif`,Zf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Kf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,$f=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Qf=`#ifdef USE_NORMALMAP
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
#endif`,ep=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,tp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,np=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ip=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,sp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,op=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,rp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ap=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,lp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,cp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,dp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,up=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,fp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,pp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,mp=`float getShadowMask() {
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
}`,gp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,xp=`#ifdef USE_SKINNING
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
#endif`,yp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_p=`#ifdef USE_SKINNING
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
#endif`,vp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,wp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,bp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Mp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Sp=`#ifdef USE_TRANSMISSION
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
#endif`,Ep=`#ifdef USE_TRANSMISSION
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
#endif`,Ap=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Tp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Pp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Rp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ip=`uniform sampler2D t2D;
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
}`,Dp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Fp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Np=`#include <common>
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
}`,Up=`#if DEPTH_PACKING == 3200
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
}`,kp=`#define DISTANCE
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
}`,Op=`#define DISTANCE
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
}`,Bp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Gp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vp=`uniform float scale;
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
}`,Hp=`uniform vec3 diffuse;
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
}`,Wp=`#include <common>
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
}`,Xp=`uniform vec3 diffuse;
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
}`,Yp=`#define LAMBERT
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
}`,Zp=`#define LAMBERT
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
}`,qp=`#define MATCAP
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
}`,Kp=`#define MATCAP
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
}`,$p=`#define NORMAL
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
}`,jp=`#define NORMAL
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
}`,Jp=`#define PHONG
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
}`,Qp=`#define PHONG
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
}`,e0=`#define STANDARD
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
}`,t0=`#define STANDARD
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
}`,n0=`#define TOON
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
}`,i0=`#define TOON
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
}`,s0=`uniform float size;
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
}`,o0=`uniform vec3 diffuse;
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
}`,r0=`#include <common>
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
}`,a0=`uniform vec3 color;
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
}`,l0=`uniform float rotation;
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
}`,c0=`uniform vec3 diffuse;
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
}`,tt={alphahash_fragment:Ru,alphahash_pars_fragment:Iu,alphamap_fragment:Du,alphamap_pars_fragment:Lu,alphatest_fragment:Fu,alphatest_pars_fragment:zu,aomap_fragment:Nu,aomap_pars_fragment:Uu,batching_pars_vertex:ku,batching_vertex:Ou,begin_vertex:Bu,beginnormal_vertex:Gu,bsdfs:Vu,iridescence_fragment:Hu,bumpmap_pars_fragment:Wu,clipping_planes_fragment:Xu,clipping_planes_pars_fragment:Yu,clipping_planes_pars_vertex:Zu,clipping_planes_vertex:qu,color_fragment:Ku,color_pars_fragment:$u,color_pars_vertex:ju,color_vertex:Ju,common:Qu,cube_uv_reflection_fragment:ef,defaultnormal_vertex:tf,displacementmap_pars_vertex:nf,displacementmap_vertex:sf,emissivemap_fragment:of,emissivemap_pars_fragment:rf,colorspace_fragment:af,colorspace_pars_fragment:lf,envmap_fragment:cf,envmap_common_pars_fragment:hf,envmap_pars_fragment:df,envmap_pars_vertex:uf,envmap_physical_pars_fragment:Mf,envmap_vertex:ff,fog_vertex:pf,fog_pars_vertex:mf,fog_fragment:gf,fog_pars_fragment:xf,gradientmap_pars_fragment:yf,lightmap_pars_fragment:_f,lights_lambert_fragment:vf,lights_lambert_pars_fragment:wf,lights_pars_begin:bf,lights_toon_fragment:Sf,lights_toon_pars_fragment:Ef,lights_phong_fragment:Af,lights_phong_pars_fragment:Tf,lights_physical_fragment:Pf,lights_physical_pars_fragment:Cf,lights_fragment_begin:Rf,lights_fragment_maps:If,lights_fragment_end:Df,logdepthbuf_fragment:Lf,logdepthbuf_pars_fragment:Ff,logdepthbuf_pars_vertex:zf,logdepthbuf_vertex:Nf,map_fragment:Uf,map_pars_fragment:kf,map_particle_fragment:Of,map_particle_pars_fragment:Bf,metalnessmap_fragment:Gf,metalnessmap_pars_fragment:Vf,morphinstance_vertex:Hf,morphcolor_vertex:Wf,morphnormal_vertex:Xf,morphtarget_pars_vertex:Yf,morphtarget_vertex:Zf,normal_fragment_begin:qf,normal_fragment_maps:Kf,normal_pars_fragment:$f,normal_pars_vertex:jf,normal_vertex:Jf,normalmap_pars_fragment:Qf,clearcoat_normal_fragment_begin:ep,clearcoat_normal_fragment_maps:tp,clearcoat_pars_fragment:np,iridescence_pars_fragment:ip,opaque_fragment:sp,packing:op,premultiplied_alpha_fragment:rp,project_vertex:ap,dithering_fragment:lp,dithering_pars_fragment:cp,roughnessmap_fragment:hp,roughnessmap_pars_fragment:dp,shadowmap_pars_fragment:up,shadowmap_pars_vertex:fp,shadowmap_vertex:pp,shadowmask_pars_fragment:mp,skinbase_vertex:gp,skinning_pars_vertex:xp,skinning_vertex:yp,skinnormal_vertex:_p,specularmap_fragment:vp,specularmap_pars_fragment:wp,tonemapping_fragment:bp,tonemapping_pars_fragment:Mp,transmission_fragment:Sp,transmission_pars_fragment:Ep,uv_pars_fragment:Ap,uv_pars_vertex:Tp,uv_vertex:Pp,worldpos_vertex:Cp,background_vert:Rp,background_frag:Ip,backgroundCube_vert:Dp,backgroundCube_frag:Lp,cube_vert:Fp,cube_frag:zp,depth_vert:Np,depth_frag:Up,distanceRGBA_vert:kp,distanceRGBA_frag:Op,equirect_vert:Bp,equirect_frag:Gp,linedashed_vert:Vp,linedashed_frag:Hp,meshbasic_vert:Wp,meshbasic_frag:Xp,meshlambert_vert:Yp,meshlambert_frag:Zp,meshmatcap_vert:qp,meshmatcap_frag:Kp,meshnormal_vert:$p,meshnormal_frag:jp,meshphong_vert:Jp,meshphong_frag:Qp,meshphysical_vert:e0,meshphysical_frag:t0,meshtoon_vert:n0,meshtoon_frag:i0,points_vert:s0,points_frag:o0,shadow_vert:r0,shadow_frag:a0,sprite_vert:l0,sprite_frag:c0},Se={common:{diffuse:{value:new st(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new et}},envmap:{envMap:{value:null},envMapRotation:{value:new et},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new et}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new et}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new et},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new et},normalScale:{value:new ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new et},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new et}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new et}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new et}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new st(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new st(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0},uvTransform:{value:new et}},sprite:{diffuse:{value:new st(16777215)},opacity:{value:1},center:{value:new ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}}},Cn={basic:{uniforms:Kt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.fog]),vertexShader:tt.meshbasic_vert,fragmentShader:tt.meshbasic_frag},lambert:{uniforms:Kt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new st(0)}}]),vertexShader:tt.meshlambert_vert,fragmentShader:tt.meshlambert_frag},phong:{uniforms:Kt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new st(0)},specular:{value:new st(1118481)},shininess:{value:30}}]),vertexShader:tt.meshphong_vert,fragmentShader:tt.meshphong_frag},standard:{uniforms:Kt([Se.common,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.roughnessmap,Se.metalnessmap,Se.fog,Se.lights,{emissive:{value:new st(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag},toon:{uniforms:Kt([Se.common,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.gradientmap,Se.fog,Se.lights,{emissive:{value:new st(0)}}]),vertexShader:tt.meshtoon_vert,fragmentShader:tt.meshtoon_frag},matcap:{uniforms:Kt([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,{matcap:{value:null}}]),vertexShader:tt.meshmatcap_vert,fragmentShader:tt.meshmatcap_frag},points:{uniforms:Kt([Se.points,Se.fog]),vertexShader:tt.points_vert,fragmentShader:tt.points_frag},dashed:{uniforms:Kt([Se.common,Se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:tt.linedashed_vert,fragmentShader:tt.linedashed_frag},depth:{uniforms:Kt([Se.common,Se.displacementmap]),vertexShader:tt.depth_vert,fragmentShader:tt.depth_frag},normal:{uniforms:Kt([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,{opacity:{value:1}}]),vertexShader:tt.meshnormal_vert,fragmentShader:tt.meshnormal_frag},sprite:{uniforms:Kt([Se.sprite,Se.fog]),vertexShader:tt.sprite_vert,fragmentShader:tt.sprite_frag},background:{uniforms:{uvTransform:{value:new et},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:tt.background_vert,fragmentShader:tt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new et}},vertexShader:tt.backgroundCube_vert,fragmentShader:tt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:tt.cube_vert,fragmentShader:tt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:tt.equirect_vert,fragmentShader:tt.equirect_frag},distanceRGBA:{uniforms:Kt([Se.common,Se.displacementmap,{referencePosition:{value:new _},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:tt.distanceRGBA_vert,fragmentShader:tt.distanceRGBA_frag},shadow:{uniforms:Kt([Se.lights,Se.fog,{color:{value:new st(0)},opacity:{value:1}}]),vertexShader:tt.shadow_vert,fragmentShader:tt.shadow_frag}};Cn.physical={uniforms:Kt([Cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new et},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new et},clearcoatNormalScale:{value:new ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new et},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new et},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new et},sheen:{value:0},sheenColor:{value:new st(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new et},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new et},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new et},transmissionSamplerSize:{value:new ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new et},attenuationDistance:{value:0},attenuationColor:{value:new st(0)},specularColor:{value:new st(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new et},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new et},anisotropyVector:{value:new ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new et}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag};const Io={r:0,b:0,g:0},pi=new Dn,h0=new mt;function d0(i,e,t,n,s,o,r){const a=new st(0);let l=o===!0?0:1,c,h,u=null,d=0,f=null;function g(E){let S=E.isScene===!0?E.background:null;return S&&S.isTexture&&(S=(E.backgroundBlurriness>0?t:e).get(S)),S}function x(E){let S=!1;const z=g(E);z===null?p(a,l):z&&z.isColor&&(p(z,1),S=!0);const D=i.xr.getEnvironmentBlendMode();D==="additive"?n.buffers.color.setClear(0,0,0,1,r):D==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(i.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(E,S){const z=g(S);z&&(z.isCubeTexture||z.mapping===Qo)?(h===void 0&&(h=new w(new G(1,1,1),new si({name:"BackgroundCubeMaterial",uniforms:ds(Cn.backgroundCube.uniforms),vertexShader:Cn.backgroundCube.vertexShader,fragmentShader:Cn.backgroundCube.fragmentShader,side:jt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(D,R,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),pi.copy(S.backgroundRotation),pi.x*=-1,pi.y*=-1,pi.z*=-1,z.isCubeTexture&&z.isRenderTargetTexture===!1&&(pi.y*=-1,pi.z*=-1),h.material.uniforms.envMap.value=z,h.material.uniforms.flipEnvMap.value=z.isCubeTexture&&z.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(h0.makeRotationFromEuler(pi)),h.material.toneMapped=ct.getTransfer(z.colorSpace)!==xt,(u!==z||d!==z.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=z,d=z.version,f=i.toneMapping),h.layers.enableAll(),E.unshift(h,h.geometry,h.material,0,0,null)):z&&z.isTexture&&(c===void 0&&(c=new w(new Tn(2,2),new si({name:"BackgroundMaterial",uniforms:ds(Cn.background.uniforms),vertexShader:Cn.background.vertexShader,fragmentShader:Cn.background.fragmentShader,side:Wn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=z,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=ct.getTransfer(z.colorSpace)!==xt,z.matrixAutoUpdate===!0&&z.updateMatrix(),c.material.uniforms.uvTransform.value.copy(z.matrix),(u!==z||d!==z.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=z,d=z.version,f=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function p(E,S){E.getRGB(Io,Gc(i)),n.buffers.color.setClear(Io.r,Io.g,Io.b,S,r)}function T(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,S=1){a.set(E),l=S,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,p(a,l)},render:x,addToRenderList:m,dispose:T}}function u0(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let o=s,r=!1;function a(y,M,C,A,I){let U=!1;const k=u(A,C,M);o!==k&&(o=k,c(o.object)),U=f(y,A,C,I),U&&g(y,A,C,I),I!==null&&e.update(I,i.ELEMENT_ARRAY_BUFFER),(U||r)&&(r=!1,S(y,M,C,A),I!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(I).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function u(y,M,C){const A=C.wireframe===!0;let I=n[y.id];I===void 0&&(I={},n[y.id]=I);let U=I[M.id];U===void 0&&(U={},I[M.id]=U);let k=U[A];return k===void 0&&(k=d(l()),U[A]=k),k}function d(y){const M=[],C=[],A=[];for(let I=0;I<t;I++)M[I]=0,C[I]=0,A[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:M,enabledAttributes:C,attributeDivisors:A,object:y,attributes:{},index:null}}function f(y,M,C,A){const I=o.attributes,U=M.attributes;let k=0;const B=C.getAttributes();for(const O in B)if(B[O].location>=0){const J=I[O];let ce=U[O];if(ce===void 0&&(O==="instanceMatrix"&&y.instanceMatrix&&(ce=y.instanceMatrix),O==="instanceColor"&&y.instanceColor&&(ce=y.instanceColor)),J===void 0||J.attribute!==ce||ce&&J.data!==ce.data)return!0;k++}return o.attributesNum!==k||o.index!==A}function g(y,M,C,A){const I={},U=M.attributes;let k=0;const B=C.getAttributes();for(const O in B)if(B[O].location>=0){let J=U[O];J===void 0&&(O==="instanceMatrix"&&y.instanceMatrix&&(J=y.instanceMatrix),O==="instanceColor"&&y.instanceColor&&(J=y.instanceColor));const ce={};ce.attribute=J,J&&J.data&&(ce.data=J.data),I[O]=ce,k++}o.attributes=I,o.attributesNum=k,o.index=A}function x(){const y=o.newAttributes;for(let M=0,C=y.length;M<C;M++)y[M]=0}function m(y){p(y,0)}function p(y,M){const C=o.newAttributes,A=o.enabledAttributes,I=o.attributeDivisors;C[y]=1,A[y]===0&&(i.enableVertexAttribArray(y),A[y]=1),I[y]!==M&&(i.vertexAttribDivisor(y,M),I[y]=M)}function T(){const y=o.newAttributes,M=o.enabledAttributes;for(let C=0,A=M.length;C<A;C++)M[C]!==y[C]&&(i.disableVertexAttribArray(C),M[C]=0)}function E(y,M,C,A,I,U,k){k===!0?i.vertexAttribIPointer(y,M,C,I,U):i.vertexAttribPointer(y,M,C,A,I,U)}function S(y,M,C,A){x();const I=A.attributes,U=C.getAttributes(),k=M.defaultAttributeValues;for(const B in U){const O=U[B];if(O.location>=0){let X=I[B];if(X===void 0&&(B==="instanceMatrix"&&y.instanceMatrix&&(X=y.instanceMatrix),B==="instanceColor"&&y.instanceColor&&(X=y.instanceColor)),X!==void 0){const J=X.normalized,ce=X.itemSize,pe=e.get(X);if(pe===void 0)continue;const Oe=pe.buffer,q=pe.type,oe=pe.bytesPerElement,ye=q===i.INT||q===i.UNSIGNED_INT||X.gpuType===La;if(X.isInterleavedBufferAttribute){const le=X.data,ne=le.stride,ve=X.offset;if(le.isInstancedInterleavedBuffer){for(let Z=0;Z<O.locationSize;Z++)p(O.location+Z,le.meshPerAttribute);y.isInstancedMesh!==!0&&A._maxInstanceCount===void 0&&(A._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let Z=0;Z<O.locationSize;Z++)m(O.location+Z);i.bindBuffer(i.ARRAY_BUFFER,Oe);for(let Z=0;Z<O.locationSize;Z++)E(O.location+Z,ce/O.locationSize,q,J,ne*oe,(ve+ce/O.locationSize*Z)*oe,ye)}else{if(X.isInstancedBufferAttribute){for(let le=0;le<O.locationSize;le++)p(O.location+le,X.meshPerAttribute);y.isInstancedMesh!==!0&&A._maxInstanceCount===void 0&&(A._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let le=0;le<O.locationSize;le++)m(O.location+le);i.bindBuffer(i.ARRAY_BUFFER,Oe);for(let le=0;le<O.locationSize;le++)E(O.location+le,ce/O.locationSize,q,J,ce*oe,ce/O.locationSize*le*oe,ye)}}else if(k!==void 0){const J=k[B];if(J!==void 0)switch(J.length){case 2:i.vertexAttrib2fv(O.location,J);break;case 3:i.vertexAttrib3fv(O.location,J);break;case 4:i.vertexAttrib4fv(O.location,J);break;default:i.vertexAttrib1fv(O.location,J)}}}}T()}function z(){b();for(const y in n){const M=n[y];for(const C in M){const A=M[C];for(const I in A)h(A[I].object),delete A[I];delete M[C]}delete n[y]}}function D(y){if(n[y.id]===void 0)return;const M=n[y.id];for(const C in M){const A=M[C];for(const I in A)h(A[I].object),delete A[I];delete M[C]}delete n[y.id]}function R(y){for(const M in n){const C=n[M];if(C[y.id]===void 0)continue;const A=C[y.id];for(const I in A)h(A[I].object),delete A[I];delete C[y.id]}}function b(){v(),r=!0,o!==s&&(o=s,c(o.object))}function v(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:b,resetDefaultState:v,dispose:z,releaseStatesOfGeometry:D,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:m,disableUnusedAttributes:T}}function f0(i,e,t){let n;function s(c){n=c}function o(c,h){i.drawArrays(n,c,h),t.update(h,n,1)}function r(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)r(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let x=0;x<u;x++)g+=h[x]*d[x];t.update(g,n,1)}}this.setMode=s,this.render=o,this.renderInstances=r,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function p0(i,e,t,n){let s;function o(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(R){return!(R!==Sn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const b=R===Ks&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Xn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==In&&!b)}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),z=g>0,D=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:T,maxVaryings:E,maxFragmentUniforms:S,vertexTextures:z,maxSamples:D}}function m0(i){const e=this;let t=null,n=0,s=!1,o=!1;const r=new Bn,a=new et,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){o=!0,h(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||o&&!m)o?h(null):c();else{const T=o?0:n,E=T*4;let S=p.clippingState||null;l.value=S,S=h(g,d,E,f);for(let z=0;z!==E;++z)S[z]=t[z];p.clippingState=S,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){const x=u!==null?u.length:0;let m=null;if(x!==0){if(m=l.value,g!==!0||m===null){const p=f+x*4,T=d.matrixWorldInverse;a.getNormalMatrix(T),(m===null||m.length<p)&&(m=new Float32Array(p));for(let E=0,S=f;E!==x;++E,S+=4)r.copy(u[E]).applyMatrix4(T,a),r.normal.toArray(m,S),m[S+3]=r.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function g0(i){let e=new WeakMap;function t(r,a){return a===$r?r.mapping=rs:a===jr&&(r.mapping=as),r}function n(r){if(r&&r.isTexture){const a=r.mapping;if(a===$r||a===jr)if(e.has(r)){const l=e.get(r).texture;return t(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new zd(l.height);return c.fromEquirectangularTexture(i,r),e.set(r,c),r.addEventListener("dispose",s),t(c.texture,r.mapping)}else return null}}return r}function s(r){const a=r.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function o(){e=new WeakMap}return{get:n,dispose:o}}const Qi=4,Wl=[.125,.215,.35,.446,.526,.582],wi=20,Fr=new eh,Xl=new st;let zr=null,Nr=0,Ur=0,kr=!1;const _i=(1+Math.sqrt(5))/2,Zi=1/_i,Yl=[new _(-_i,Zi,0),new _(_i,Zi,0),new _(-Zi,0,_i),new _(Zi,0,_i),new _(0,_i,-Zi),new _(0,_i,Zi),new _(-1,1,-1),new _(1,1,-1),new _(-1,1,1),new _(1,1,1)],x0=new _;class Ra{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,o={}){const{size:r=256,position:a=x0}=o;zr=this._renderer.getRenderTarget(),Nr=this._renderer.getActiveCubeFace(),Ur=this._renderer.getActiveMipmapLevel(),kr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Kl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ql(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(zr,Nr,Ur),this._renderer.xr.enabled=kr,e.scissorTest=!1,Do(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===rs||e.mapping===as?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),zr=this._renderer.getRenderTarget(),Nr=this._renderer.getActiveCubeFace(),Ur=this._renderer.getActiveMipmapLevel(),kr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Rn,minFilter:Rn,generateMipmaps:!1,type:Ks,format:Sn,colorSpace:hs,depthBuffer:!1},s=Zl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zl(e,t,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=y0(o)),this._blurMaterial=_0(o,e,t)}return s}_compileMaterial(e){const t=new w(this._lodPlanes[0],e);this._renderer.compile(t,Fr)}_sceneToCubeUV(e,t,n,s,o){const l=new cn(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Xl),u.toneMapping=ni,u.autoClear=!1;const g=new bt({name:"PMREM.Background",side:jt,depthWrite:!1,depthTest:!1}),x=new w(new G,g);let m=!1;const p=e.background;p?p.isColor&&(g.color.copy(p),e.background=null,m=!0):(g.color.copy(Xl),m=!0);for(let T=0;T<6;T++){const E=T%3;E===0?(l.up.set(0,c[T],0),l.position.set(o.x,o.y,o.z),l.lookAt(o.x+h[T],o.y,o.z)):E===1?(l.up.set(0,0,c[T]),l.position.set(o.x,o.y,o.z),l.lookAt(o.x,o.y+h[T],o.z)):(l.up.set(0,c[T],0),l.position.set(o.x,o.y,o.z),l.lookAt(o.x,o.y,o.z+h[T]));const S=this._cubeSize;Do(s,E*S,T>2?S:0,S,S),u.setRenderTarget(s),m&&u.render(x,l),u.render(e,l)}x.geometry.dispose(),x.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===rs||e.mapping===as;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Kl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ql());const o=s?this._cubemapMaterial:this._equirectMaterial,r=new w(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=e;const l=this._cubeSize;Do(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(r,Fr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let o=1;o<s;o++){const r=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),a=Yl[(s-o-1)%Yl.length];this._blur(e,o-1,o,r,a)}t.autoClear=n}_blur(e,t,n,s,o){const r=this._pingPongRenderTarget;this._halfBlur(e,r,t,n,s,"latitudinal",o),this._halfBlur(r,e,n,n,s,"longitudinal",o)}_halfBlur(e,t,n,s,o,r,a){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new w(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(o)?Math.PI/(2*f):2*Math.PI/(2*wi-1),x=o/g,m=isFinite(o)?1+Math.floor(h*x):wi;m>wi&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${wi}`);const p=[];let T=0;for(let R=0;R<wi;++R){const b=R/x,v=Math.exp(-b*b/2);p.push(v),R===0?T+=v:R<m&&(T+=2*v)}for(let R=0;R<p.length;R++)p[R]=p[R]/T;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=r==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:E}=this;d.dTheta.value=g,d.mipInt.value=E-n;const S=this._sizeLods[s],z=3*S*(s>E-Qi?s-E+Qi:0),D=4*(this._cubeSize-S);Do(t,z,D,3*S,2*S),l.setRenderTarget(t),l.render(u,Fr)}}function y0(i){const e=[],t=[],n=[];let s=i;const o=i-Qi+1+Wl.length;for(let r=0;r<o;r++){const a=Math.pow(2,s);t.push(a);let l=1/a;r>i-Qi?l=Wl[r-i+Qi-1]:r===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,x=3,m=2,p=1,T=new Float32Array(x*g*f),E=new Float32Array(m*g*f),S=new Float32Array(p*g*f);for(let D=0;D<f;D++){const R=D%3*2/3-1,b=D>2?0:-1,v=[R,b,0,R+2/3,b,0,R+2/3,b+1,0,R,b,0,R+2/3,b+1,0,R,b+1,0];T.set(v,x*g*D),E.set(d,m*g*D);const y=[D,D,D,D,D,D];S.set(y,p*g*D)}const z=new Ke;z.setAttribute("position",new An(T,x)),z.setAttribute("uv",new An(E,m)),z.setAttribute("faceIndex",new An(S,p)),e.push(z),s>Qi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Zl(i,e,t){const n=new Ai(i,e,t);return n.texture.mapping=Qo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Do(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function _0(i,e,t){const n=new Float32Array(wi),s=new _(0,1,0);return new si({name:"SphericalGaussianBlur",defines:{n:wi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ka(),fragmentShader:`

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
		`,blending:ti,depthTest:!1,depthWrite:!1})}function ql(){return new si({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ka(),fragmentShader:`

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
		`,blending:ti,depthTest:!1,depthWrite:!1})}function Kl(){return new si({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ka(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ti,depthTest:!1,depthWrite:!1})}function Ka(){return`

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
	`}function v0(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===$r||l===jr,h=l===rs||l===as;if(c||h){let u=e.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Ra(i)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&s(f)?(t===null&&(t=new Ra(i)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",o),u.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function o(a){const l=a.target;l.removeEventListener("dispose",o);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function r(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:r}}function w0(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&yi("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function b0(i,e,t,n){const s={},o=new WeakMap;function r(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",r),delete s[d.id];const f=o.get(d);f&&(e.remove(f),o.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",r),s[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)e.update(d[f],i.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,g=u.attributes.position;let x=0;if(f!==null){const T=f.array;x=f.version;for(let E=0,S=T.length;E<S;E+=3){const z=T[E+0],D=T[E+1],R=T[E+2];d.push(z,D,D,R,R,z)}}else if(g!==void 0){const T=g.array;x=g.version;for(let E=0,S=T.length/3-1;E<S;E+=3){const z=E+0,D=E+1,R=E+2;d.push(z,D,D,R,R,z)}}else return;const m=new(Nc(d)?Bc:Oc)(d,1);m.version=x;const p=o.get(u);p&&e.remove(p),o.set(u,m)}function h(u){const d=o.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return o.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function M0(i,e,t){let n;function s(d){n=d}let o,r;function a(d){o=d.type,r=d.bytesPerElement}function l(d,f){i.drawElements(n,f,o,d*r),t.update(f,n,1)}function c(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,o,d*r,g),t.update(f,n,g))}function h(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,o,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function u(d,f,g,x){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/r,f[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,o,d,0,x,0,g);let p=0;for(let T=0;T<g;T++)p+=f[T]*x[T];t.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function S0(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,r,a){switch(t.calls++,r){case i.TRIANGLES:t.triangles+=a*(o/3);break;case i.LINES:t.lines+=a*(o/2);break;case i.LINE_STRIP:t.lines+=a*(o-1);break;case i.LINE_LOOP:t.lines+=a*o;break;case i.POINTS:t.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function E0(i,e,t){const n=new WeakMap,s=new _t;function o(r,a,l){const c=r.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let y=function(){b.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var f=y;d!==void 0&&d.texture.dispose();const g=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],T=a.morphAttributes.normal||[],E=a.morphAttributes.color||[];let S=0;g===!0&&(S=1),x===!0&&(S=2),m===!0&&(S=3);let z=a.attributes.position.count*S,D=1;z>e.maxTextureSize&&(D=Math.ceil(z/e.maxTextureSize),z=e.maxTextureSize);const R=new Float32Array(z*D*4*u),b=new Uc(R,z,D,u);b.type=In,b.needsUpdate=!0;const v=S*4;for(let M=0;M<u;M++){const C=p[M],A=T[M],I=E[M],U=z*D*4*M;for(let k=0;k<C.count;k++){const B=k*v;g===!0&&(s.fromBufferAttribute(C,k),R[U+B+0]=s.x,R[U+B+1]=s.y,R[U+B+2]=s.z,R[U+B+3]=0),x===!0&&(s.fromBufferAttribute(A,k),R[U+B+4]=s.x,R[U+B+5]=s.y,R[U+B+6]=s.z,R[U+B+7]=0),m===!0&&(s.fromBufferAttribute(I,k),R[U+B+8]=s.x,R[U+B+9]=s.y,R[U+B+10]=s.z,R[U+B+11]=I.itemSize===4?s.w:1)}}d={count:u,texture:b,size:new ue(z,D)},n.set(a,d),a.addEventListener("dispose",y)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",r.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const x=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",x),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:o}}function A0(i,e,t,n){let s=new WeakMap;function o(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function r(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:o,dispose:r}}const nh=new Yt,$l=new Xc(1,1),ih=new Uc,sh=new yd,oh=new Hc,jl=[],Jl=[],Ql=new Float32Array(16),ec=new Float32Array(9),tc=new Float32Array(4);function ps(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let o=jl[s];if(o===void 0&&(o=new Float32Array(s),jl[s]=o),e!==0){n.toArray(o,0);for(let r=1,a=0;r!==e;++r)a+=t,i[r].toArray(o,a)}return o}function Ut(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function kt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function nr(i,e){let t=Jl[e];t===void 0&&(t=new Int32Array(e),Jl[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function T0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function P0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2fv(this.addr,e),kt(t,e)}}function C0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ut(t,e))return;i.uniform3fv(this.addr,e),kt(t,e)}}function R0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4fv(this.addr,e),kt(t,e)}}function I0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),kt(t,e)}else{if(Ut(t,n))return;tc.set(n),i.uniformMatrix2fv(this.addr,!1,tc),kt(t,n)}}function D0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),kt(t,e)}else{if(Ut(t,n))return;ec.set(n),i.uniformMatrix3fv(this.addr,!1,ec),kt(t,n)}}function L0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),kt(t,e)}else{if(Ut(t,n))return;Ql.set(n),i.uniformMatrix4fv(this.addr,!1,Ql),kt(t,n)}}function F0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function z0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2iv(this.addr,e),kt(t,e)}}function N0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;i.uniform3iv(this.addr,e),kt(t,e)}}function U0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4iv(this.addr,e),kt(t,e)}}function k0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function O0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2uiv(this.addr,e),kt(t,e)}}function B0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;i.uniform3uiv(this.addr,e),kt(t,e)}}function G0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4uiv(this.addr,e),kt(t,e)}}function V0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let o;this.type===i.SAMPLER_2D_SHADOW?($l.compareFunction=zc,o=$l):o=nh,t.setTexture2D(e||o,s)}function H0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||sh,s)}function W0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||oh,s)}function X0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||ih,s)}function Y0(i){switch(i){case 5126:return T0;case 35664:return P0;case 35665:return C0;case 35666:return R0;case 35674:return I0;case 35675:return D0;case 35676:return L0;case 5124:case 35670:return F0;case 35667:case 35671:return z0;case 35668:case 35672:return N0;case 35669:case 35673:return U0;case 5125:return k0;case 36294:return O0;case 36295:return B0;case 36296:return G0;case 35678:case 36198:case 36298:case 36306:case 35682:return V0;case 35679:case 36299:case 36307:return H0;case 35680:case 36300:case 36308:case 36293:return W0;case 36289:case 36303:case 36311:case 36292:return X0}}function Z0(i,e){i.uniform1fv(this.addr,e)}function q0(i,e){const t=ps(e,this.size,2);i.uniform2fv(this.addr,t)}function K0(i,e){const t=ps(e,this.size,3);i.uniform3fv(this.addr,t)}function $0(i,e){const t=ps(e,this.size,4);i.uniform4fv(this.addr,t)}function j0(i,e){const t=ps(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function J0(i,e){const t=ps(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Q0(i,e){const t=ps(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function em(i,e){i.uniform1iv(this.addr,e)}function tm(i,e){i.uniform2iv(this.addr,e)}function nm(i,e){i.uniform3iv(this.addr,e)}function im(i,e){i.uniform4iv(this.addr,e)}function sm(i,e){i.uniform1uiv(this.addr,e)}function om(i,e){i.uniform2uiv(this.addr,e)}function rm(i,e){i.uniform3uiv(this.addr,e)}function am(i,e){i.uniform4uiv(this.addr,e)}function lm(i,e,t){const n=this.cache,s=e.length,o=nr(t,s);Ut(n,o)||(i.uniform1iv(this.addr,o),kt(n,o));for(let r=0;r!==s;++r)t.setTexture2D(e[r]||nh,o[r])}function cm(i,e,t){const n=this.cache,s=e.length,o=nr(t,s);Ut(n,o)||(i.uniform1iv(this.addr,o),kt(n,o));for(let r=0;r!==s;++r)t.setTexture3D(e[r]||sh,o[r])}function hm(i,e,t){const n=this.cache,s=e.length,o=nr(t,s);Ut(n,o)||(i.uniform1iv(this.addr,o),kt(n,o));for(let r=0;r!==s;++r)t.setTextureCube(e[r]||oh,o[r])}function dm(i,e,t){const n=this.cache,s=e.length,o=nr(t,s);Ut(n,o)||(i.uniform1iv(this.addr,o),kt(n,o));for(let r=0;r!==s;++r)t.setTexture2DArray(e[r]||ih,o[r])}function um(i){switch(i){case 5126:return Z0;case 35664:return q0;case 35665:return K0;case 35666:return $0;case 35674:return j0;case 35675:return J0;case 35676:return Q0;case 5124:case 35670:return em;case 35667:case 35671:return tm;case 35668:case 35672:return nm;case 35669:case 35673:return im;case 5125:return sm;case 36294:return om;case 36295:return rm;case 36296:return am;case 35678:case 36198:case 36298:case 36306:case 35682:return lm;case 35679:case 36299:case 36307:return cm;case 35680:case 36300:case 36308:case 36293:return hm;case 36289:case 36303:case 36311:case 36292:return dm}}class fm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Y0(t.type)}}class pm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=um(t.type)}}class mm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let o=0,r=s.length;o!==r;++o){const a=s[o];a.setValue(e,t[a.id],n)}}}const Or=/(\w+)(\])?(\[|\.)?/g;function nc(i,e){i.seq.push(e),i.map[e.id]=e}function gm(i,e,t){const n=i.name,s=n.length;for(Or.lastIndex=0;;){const o=Or.exec(n),r=Or.lastIndex;let a=o[1];const l=o[2]==="]",c=o[3];if(l&&(a=a|0),c===void 0||c==="["&&r+2===s){nc(t,c===void 0?new fm(a,i,e):new pm(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new mm(a),nc(t,u)),t=u}}}class Vo{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const o=e.getActiveUniform(t,s),r=e.getUniformLocation(t,o.name);gm(o,r,this)}}setValue(e,t,n,s){const o=this.map[t];o!==void 0&&o.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let o=0,r=t.length;o!==r;++o){const a=t[o],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,o=e.length;s!==o;++s){const r=e[s];r.id in t&&n.push(r)}return n}}function ic(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const xm=37297;let ym=0;function _m(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),o=Math.min(e+6,t.length);for(let r=s;r<o;r++){const a=r+1;n.push(`${a===e?">":" "} ${a}: ${t[r]}`)}return n.join(`
`)}const sc=new et;function vm(i){ct._getMatrix(sc,ct.workingColorSpace,i);const e=`mat3( ${sc.elements.map(t=>t.toFixed(4))} )`;switch(ct.getTransfer(i)){case Xo:return[e,"LinearTransferOETF"];case xt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function oc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const r=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+_m(i.getShaderSource(e),r)}else return s}function wm(i,e){const t=vm(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function bm(i,e){let t;switch(e){case Rh:t="Linear";break;case Ih:t="Reinhard";break;case Dh:t="Cineon";break;case Mc:t="ACESFilmic";break;case Fh:t="AgX";break;case zh:t="Neutral";break;case Lh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Lo=new _;function Mm(){ct.getLuminanceCoefficients(Lo);const i=Lo.x.toFixed(4),e=Lo.y.toFixed(4),t=Lo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Sm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ns).join(`
`)}function Em(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Am(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const o=i.getActiveAttrib(e,s),r=o.name;let a=1;o.type===i.FLOAT_MAT2&&(a=2),o.type===i.FLOAT_MAT3&&(a=3),o.type===i.FLOAT_MAT4&&(a=4),t[r]={type:o.type,location:i.getAttribLocation(e,r),locationSize:a}}return t}function Ns(i){return i!==""}function rc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ac(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Tm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ia(i){return i.replace(Tm,Cm)}const Pm=new Map;function Cm(i,e){let t=tt[e];if(t===void 0){const n=Pm.get(e);if(n!==void 0)t=tt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ia(t)}const Rm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lc(i){return i.replace(Rm,Im)}function Im(i,e,t,n){let s="";for(let o=parseInt(e);o<parseInt(t);o++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return s}function cc(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function Dm(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===wc?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===ch?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===On&&(e="SHADOWMAP_TYPE_VSM"),e}function Lm(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case rs:case as:e="ENVMAP_TYPE_CUBE";break;case Qo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Fm(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case as:e="ENVMAP_MODE_REFRACTION";break}return e}function zm(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case bc:e="ENVMAP_BLENDING_MULTIPLY";break;case Ph:e="ENVMAP_BLENDING_MIX";break;case Ch:e="ENVMAP_BLENDING_ADD";break}return e}function Nm(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Um(i,e,t,n){const s=i.getContext(),o=t.defines;let r=t.vertexShader,a=t.fragmentShader;const l=Dm(t),c=Lm(t),h=Fm(t),u=zm(t),d=Nm(t),f=Sm(t),g=Em(o),x=s.createProgram();let m,p,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ns).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ns).join(`
`),p.length>0&&(p+=`
`)):(m=[cc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ns).join(`
`),p=[cc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ni?"#define TONE_MAPPING":"",t.toneMapping!==ni?tt.tonemapping_pars_fragment:"",t.toneMapping!==ni?bm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",tt.colorspace_pars_fragment,wm("linearToOutputTexel",t.outputColorSpace),Mm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ns).join(`
`)),r=Ia(r),r=rc(r,t),r=ac(r,t),a=Ia(a),a=rc(a,t),a=ac(a,t),r=lc(r),a=lc(a),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===ol?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ol?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const E=T+m+r,S=T+p+a,z=ic(s,s.VERTEX_SHADER,E),D=ic(s,s.FRAGMENT_SHADER,S);s.attachShader(x,z),s.attachShader(x,D),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function R(M){if(i.debug.checkShaderErrors){const C=s.getProgramInfoLog(x).trim(),A=s.getShaderInfoLog(z).trim(),I=s.getShaderInfoLog(D).trim();let U=!0,k=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(U=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,z,D);else{const B=oc(s,z,"vertex"),O=oc(s,D,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+M.name+`
Material Type: `+M.type+`

Program Info Log: `+C+`
`+B+`
`+O)}else C!==""?console.warn("THREE.WebGLProgram: Program Info Log:",C):(A===""||I==="")&&(k=!1);k&&(M.diagnostics={runnable:U,programLog:C,vertexShader:{log:A,prefix:m},fragmentShader:{log:I,prefix:p}})}s.deleteShader(z),s.deleteShader(D),b=new Vo(s,x),v=Am(s,x)}let b;this.getUniforms=function(){return b===void 0&&R(this),b};let v;this.getAttributes=function(){return v===void 0&&R(this),v};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(x,xm)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ym++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=z,this.fragmentShader=D,this}let km=0;class Om{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),o=this._getShaderStage(n),r=this._getShaderCacheForMaterial(e);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(o)===!1&&(r.add(o),o.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Bm(e),t.set(e,n)),n}}class Bm{constructor(e){this.id=km++,this.code=e,this.usedTimes=0}}function Gm(i,e,t,n,s,o,r){const a=new Va,l=new Om,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(v){return c.add(v),v===0?"uv":`uv${v}`}function m(v,y,M,C,A){const I=C.fog,U=A.geometry,k=v.isMeshStandardMaterial?C.environment:null,B=(v.isMeshStandardMaterial?t:e).get(v.envMap||k),O=B&&B.mapping===Qo?B.image.height:null,X=g[v.type];v.precision!==null&&(f=s.getMaxPrecision(v.precision),f!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));const J=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,ce=J!==void 0?J.length:0;let pe=0;U.morphAttributes.position!==void 0&&(pe=1),U.morphAttributes.normal!==void 0&&(pe=2),U.morphAttributes.color!==void 0&&(pe=3);let Oe,q,oe,ye;if(X){const at=Cn[X];Oe=at.vertexShader,q=at.fragmentShader}else Oe=v.vertexShader,q=v.fragmentShader,l.update(v),oe=l.getVertexShaderID(v),ye=l.getFragmentShaderID(v);const le=i.getRenderTarget(),ne=i.state.buffers.depth.getReversed(),ve=A.isInstancedMesh===!0,Z=A.isBatchedMesh===!0,Ne=!!v.map,re=!!v.matcap,te=!!B,N=!!v.aoMap,Ee=!!v.lightMap,he=!!v.bumpMap,_e=!!v.normalMap,fe=!!v.displacementMap,Ie=!!v.emissiveMap,we=!!v.metalnessMap,F=!!v.roughnessMap,P=v.anisotropy>0,W=v.clearcoat>0,j=v.dispersion>0,ae=v.iridescence>0,ie=v.sheen>0,Be=v.transmission>0,be=P&&!!v.anisotropyMap,Re=W&&!!v.clearcoatMap,nt=W&&!!v.clearcoatNormalMap,ge=W&&!!v.clearcoatRoughnessMap,Le=ae&&!!v.iridescenceMap,We=ae&&!!v.iridescenceThicknessMap,Xe=ie&&!!v.sheenColorMap,Fe=ie&&!!v.sheenRoughnessMap,it=!!v.specularMap,$e=!!v.specularColorMap,pt=!!v.specularIntensityMap,V=Be&&!!v.transmissionMap,Me=Be&&!!v.thicknessMap,ee=!!v.gradientMap,de=!!v.alphaMap,Pe=v.alphaTest>0,Te=!!v.alphaHash,Ze=!!v.extensions;let Mt=ni;v.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(Mt=i.toneMapping);const Ft={shaderID:X,shaderType:v.type,shaderName:v.name,vertexShader:Oe,fragmentShader:q,defines:v.defines,customVertexShaderID:oe,customFragmentShaderID:ye,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:Z,batchingColor:Z&&A._colorsTexture!==null,instancing:ve,instancingColor:ve&&A.instanceColor!==null,instancingMorph:ve&&A.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:le===null?i.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:hs,alphaToCoverage:!!v.alphaToCoverage,map:Ne,matcap:re,envMap:te,envMapMode:te&&B.mapping,envMapCubeUVHeight:O,aoMap:N,lightMap:Ee,bumpMap:he,normalMap:_e,displacementMap:d&&fe,emissiveMap:Ie,normalMapObjectSpace:_e&&v.normalMapType===Oh,normalMapTangentSpace:_e&&v.normalMapType===Fc,metalnessMap:we,roughnessMap:F,anisotropy:P,anisotropyMap:be,clearcoat:W,clearcoatMap:Re,clearcoatNormalMap:nt,clearcoatRoughnessMap:ge,dispersion:j,iridescence:ae,iridescenceMap:Le,iridescenceThicknessMap:We,sheen:ie,sheenColorMap:Xe,sheenRoughnessMap:Fe,specularMap:it,specularColorMap:$e,specularIntensityMap:pt,transmission:Be,transmissionMap:V,thicknessMap:Me,gradientMap:ee,opaque:v.transparent===!1&&v.blending===ts&&v.alphaToCoverage===!1,alphaMap:de,alphaTest:Pe,alphaHash:Te,combine:v.combine,mapUv:Ne&&x(v.map.channel),aoMapUv:N&&x(v.aoMap.channel),lightMapUv:Ee&&x(v.lightMap.channel),bumpMapUv:he&&x(v.bumpMap.channel),normalMapUv:_e&&x(v.normalMap.channel),displacementMapUv:fe&&x(v.displacementMap.channel),emissiveMapUv:Ie&&x(v.emissiveMap.channel),metalnessMapUv:we&&x(v.metalnessMap.channel),roughnessMapUv:F&&x(v.roughnessMap.channel),anisotropyMapUv:be&&x(v.anisotropyMap.channel),clearcoatMapUv:Re&&x(v.clearcoatMap.channel),clearcoatNormalMapUv:nt&&x(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ge&&x(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Le&&x(v.iridescenceMap.channel),iridescenceThicknessMapUv:We&&x(v.iridescenceThicknessMap.channel),sheenColorMapUv:Xe&&x(v.sheenColorMap.channel),sheenRoughnessMapUv:Fe&&x(v.sheenRoughnessMap.channel),specularMapUv:it&&x(v.specularMap.channel),specularColorMapUv:$e&&x(v.specularColorMap.channel),specularIntensityMapUv:pt&&x(v.specularIntensityMap.channel),transmissionMapUv:V&&x(v.transmissionMap.channel),thicknessMapUv:Me&&x(v.thicknessMap.channel),alphaMapUv:de&&x(v.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(_e||P),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:A.isPoints===!0&&!!U.attributes.uv&&(Ne||de),fog:!!I,useFog:v.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:ne,skinning:A.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:ce,morphTextureStride:pe,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&M.length>0,shadowMapType:i.shadowMap.type,toneMapping:Mt,decodeVideoTexture:Ne&&v.map.isVideoTexture===!0&&ct.getTransfer(v.map.colorSpace)===xt,decodeVideoTextureEmissive:Ie&&v.emissiveMap.isVideoTexture===!0&&ct.getTransfer(v.emissiveMap.colorSpace)===xt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Rt,flipSided:v.side===jt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Ze&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ze&&v.extensions.multiDraw===!0||Z)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ft.vertexUv1s=c.has(1),Ft.vertexUv2s=c.has(2),Ft.vertexUv3s=c.has(3),c.clear(),Ft}function p(v){const y=[];if(v.shaderID?y.push(v.shaderID):(y.push(v.customVertexShaderID),y.push(v.customFragmentShaderID)),v.defines!==void 0)for(const M in v.defines)y.push(M),y.push(v.defines[M]);return v.isRawShaderMaterial===!1&&(T(y,v),E(y,v),y.push(i.outputColorSpace)),y.push(v.customProgramCacheKey),y.join()}function T(v,y){v.push(y.precision),v.push(y.outputColorSpace),v.push(y.envMapMode),v.push(y.envMapCubeUVHeight),v.push(y.mapUv),v.push(y.alphaMapUv),v.push(y.lightMapUv),v.push(y.aoMapUv),v.push(y.bumpMapUv),v.push(y.normalMapUv),v.push(y.displacementMapUv),v.push(y.emissiveMapUv),v.push(y.metalnessMapUv),v.push(y.roughnessMapUv),v.push(y.anisotropyMapUv),v.push(y.clearcoatMapUv),v.push(y.clearcoatNormalMapUv),v.push(y.clearcoatRoughnessMapUv),v.push(y.iridescenceMapUv),v.push(y.iridescenceThicknessMapUv),v.push(y.sheenColorMapUv),v.push(y.sheenRoughnessMapUv),v.push(y.specularMapUv),v.push(y.specularColorMapUv),v.push(y.specularIntensityMapUv),v.push(y.transmissionMapUv),v.push(y.thicknessMapUv),v.push(y.combine),v.push(y.fogExp2),v.push(y.sizeAttenuation),v.push(y.morphTargetsCount),v.push(y.morphAttributeCount),v.push(y.numDirLights),v.push(y.numPointLights),v.push(y.numSpotLights),v.push(y.numSpotLightMaps),v.push(y.numHemiLights),v.push(y.numRectAreaLights),v.push(y.numDirLightShadows),v.push(y.numPointLightShadows),v.push(y.numSpotLightShadows),v.push(y.numSpotLightShadowsWithMaps),v.push(y.numLightProbes),v.push(y.shadowMapType),v.push(y.toneMapping),v.push(y.numClippingPlanes),v.push(y.numClipIntersection),v.push(y.depthPacking)}function E(v,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),v.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),v.push(a.mask)}function S(v){const y=g[v.type];let M;if(y){const C=Cn[y];M=Id.clone(C.uniforms)}else M=v.uniforms;return M}function z(v,y){let M;for(let C=0,A=h.length;C<A;C++){const I=h[C];if(I.cacheKey===y){M=I,++M.usedTimes;break}}return M===void 0&&(M=new Um(i,y,v,o),h.push(M)),M}function D(v){if(--v.usedTimes===0){const y=h.indexOf(v);h[y]=h[h.length-1],h.pop(),v.destroy()}}function R(v){l.remove(v)}function b(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:S,acquireProgram:z,releaseProgram:D,releaseShaderCache:R,programs:h,dispose:b}}function Vm(){let i=new WeakMap;function e(r){return i.has(r)}function t(r){let a=i.get(r);return a===void 0&&(a={},i.set(r,a)),a}function n(r){i.delete(r)}function s(r,a,l){i.get(r)[a]=l}function o(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:o}}function Hm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function hc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function dc(){const i=[];let e=0;const t=[],n=[],s=[];function o(){e=0,t.length=0,n.length=0,s.length=0}function r(u,d,f,g,x,m){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},i[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=x,p.group=m),e++,p}function a(u,d,f,g,x,m){const p=r(u,d,f,g,x,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(u,d,f,g,x,m){const p=r(u,d,f,g,x,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||Hm),n.length>1&&n.sort(d||hc),s.length>1&&s.sort(d||hc)}function h(){for(let u=e,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:o,push:a,unshift:l,finish:h,sort:c}}function Wm(){let i=new WeakMap;function e(n,s){const o=i.get(n);let r;return o===void 0?(r=new dc,i.set(n,[r])):s>=o.length?(r=new dc,o.push(r)):r=o[s],r}function t(){i=new WeakMap}return{get:e,dispose:t}}function Xm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new _,color:new st};break;case"SpotLight":t={position:new _,direction:new _,color:new st,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new _,color:new st,distance:0,decay:0};break;case"HemisphereLight":t={direction:new _,skyColor:new st,groundColor:new st};break;case"RectAreaLight":t={color:new st,position:new _,halfWidth:new _,halfHeight:new _};break}return i[e.id]=t,t}}}function Ym(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Zm=0;function qm(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Km(i){const e=new Xm,t=Ym(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new _);const s=new _,o=new mt,r=new mt;function a(c){let h=0,u=0,d=0;for(let v=0;v<9;v++)n.probe[v].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,T=0,E=0,S=0,z=0,D=0,R=0;c.sort(qm);for(let v=0,y=c.length;v<y;v++){const M=c[v],C=M.color,A=M.intensity,I=M.distance,U=M.shadow&&M.shadow.map?M.shadow.map.texture:null;if(M.isAmbientLight)h+=C.r*A,u+=C.g*A,d+=C.b*A;else if(M.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(M.sh.coefficients[k],A);R++}else if(M.isDirectionalLight){const k=e.get(M);if(k.color.copy(M.color).multiplyScalar(M.intensity),M.castShadow){const B=M.shadow,O=t.get(M);O.shadowIntensity=B.intensity,O.shadowBias=B.bias,O.shadowNormalBias=B.normalBias,O.shadowRadius=B.radius,O.shadowMapSize=B.mapSize,n.directionalShadow[f]=O,n.directionalShadowMap[f]=U,n.directionalShadowMatrix[f]=M.shadow.matrix,T++}n.directional[f]=k,f++}else if(M.isSpotLight){const k=e.get(M);k.position.setFromMatrixPosition(M.matrixWorld),k.color.copy(C).multiplyScalar(A),k.distance=I,k.coneCos=Math.cos(M.angle),k.penumbraCos=Math.cos(M.angle*(1-M.penumbra)),k.decay=M.decay,n.spot[x]=k;const B=M.shadow;if(M.map&&(n.spotLightMap[z]=M.map,z++,B.updateMatrices(M),M.castShadow&&D++),n.spotLightMatrix[x]=B.matrix,M.castShadow){const O=t.get(M);O.shadowIntensity=B.intensity,O.shadowBias=B.bias,O.shadowNormalBias=B.normalBias,O.shadowRadius=B.radius,O.shadowMapSize=B.mapSize,n.spotShadow[x]=O,n.spotShadowMap[x]=U,S++}x++}else if(M.isRectAreaLight){const k=e.get(M);k.color.copy(C).multiplyScalar(A),k.halfWidth.set(M.width*.5,0,0),k.halfHeight.set(0,M.height*.5,0),n.rectArea[m]=k,m++}else if(M.isPointLight){const k=e.get(M);if(k.color.copy(M.color).multiplyScalar(M.intensity),k.distance=M.distance,k.decay=M.decay,M.castShadow){const B=M.shadow,O=t.get(M);O.shadowIntensity=B.intensity,O.shadowBias=B.bias,O.shadowNormalBias=B.normalBias,O.shadowRadius=B.radius,O.shadowMapSize=B.mapSize,O.shadowCameraNear=B.camera.near,O.shadowCameraFar=B.camera.far,n.pointShadow[g]=O,n.pointShadowMap[g]=U,n.pointShadowMatrix[g]=M.shadow.matrix,E++}n.point[g]=k,g++}else if(M.isHemisphereLight){const k=e.get(M);k.skyColor.copy(M.color).multiplyScalar(A),k.groundColor.copy(M.groundColor).multiplyScalar(A),n.hemi[p]=k,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Se.LTC_FLOAT_1,n.rectAreaLTC2=Se.LTC_FLOAT_2):(n.rectAreaLTC1=Se.LTC_HALF_1,n.rectAreaLTC2=Se.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const b=n.hash;(b.directionalLength!==f||b.pointLength!==g||b.spotLength!==x||b.rectAreaLength!==m||b.hemiLength!==p||b.numDirectionalShadows!==T||b.numPointShadows!==E||b.numSpotShadows!==S||b.numSpotMaps!==z||b.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=S+z-D,n.spotLightMap.length=z,n.numSpotLightShadowsWithMaps=D,n.numLightProbes=R,b.directionalLength=f,b.pointLength=g,b.spotLength=x,b.rectAreaLength=m,b.hemiLength=p,b.numDirectionalShadows=T,b.numPointShadows=E,b.numSpotShadows=S,b.numSpotMaps=z,b.numLightProbes=R,n.version=Zm++)}function l(c,h){let u=0,d=0,f=0,g=0,x=0;const m=h.matrixWorldInverse;for(let p=0,T=c.length;p<T;p++){const E=c[p];if(E.isDirectionalLight){const S=n.directional[u];S.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),u++}else if(E.isSpotLight){const S=n.spot[f];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),f++}else if(E.isRectAreaLight){const S=n.rectArea[g];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(m),r.identity(),o.copy(E.matrixWorld),o.premultiply(m),r.extractRotation(o),S.halfWidth.set(E.width*.5,0,0),S.halfHeight.set(0,E.height*.5,0),S.halfWidth.applyMatrix4(r),S.halfHeight.applyMatrix4(r),g++}else if(E.isPointLight){const S=n.point[d];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(m),d++}else if(E.isHemisphereLight){const S=n.hemi[x];S.direction.setFromMatrixPosition(E.matrixWorld),S.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:n}}function uc(i){const e=new Km(i),t=[],n=[];function s(h){c.camera=h,t.length=0,n.length=0}function o(h){t.push(h)}function r(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:o,pushShadow:r}}function $m(i){let e=new WeakMap;function t(s,o=0){const r=e.get(s);let a;return r===void 0?(a=new uc(i),e.set(s,[a])):o>=r.length?(a=new uc(i),r.push(a)):a=r[o],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const jm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Jm=`uniform sampler2D shadow_pass;
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
}`;function Qm(i,e,t){let n=new Ha;const s=new ue,o=new ue,r=new _t,a=new xu({depthPacking:kh}),l=new yu,c={},h=t.maxTextureSize,u={[Wn]:jt,[jt]:Wn,[Rt]:Rt},d=new si({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ue},radius:{value:4}},vertexShader:jm,fragmentShader:Jm}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Ke;g.setAttribute("position",new An(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new w(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=wc;let p=this.type;this.render=function(D,R,b){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||D.length===0)return;const v=i.getRenderTarget(),y=i.getActiveCubeFace(),M=i.getActiveMipmapLevel(),C=i.state;C.setBlending(ti),C.buffers.color.setClear(1,1,1,1),C.buffers.depth.setTest(!0),C.setScissorTest(!1);const A=p!==On&&this.type===On,I=p===On&&this.type!==On;for(let U=0,k=D.length;U<k;U++){const B=D[U],O=B.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",B,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;s.copy(O.mapSize);const X=O.getFrameExtents();if(s.multiply(X),o.copy(O.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(o.x=Math.floor(h/X.x),s.x=o.x*X.x,O.mapSize.x=o.x),s.y>h&&(o.y=Math.floor(h/X.y),s.y=o.y*X.y,O.mapSize.y=o.y)),O.map===null||A===!0||I===!0){const ce=this.type!==On?{minFilter:dn,magFilter:dn}:{};O.map!==null&&O.map.dispose(),O.map=new Ai(s.x,s.y,ce),O.map.texture.name=B.name+".shadowMap",O.camera.updateProjectionMatrix()}i.setRenderTarget(O.map),i.clear();const J=O.getViewportCount();for(let ce=0;ce<J;ce++){const pe=O.getViewport(ce);r.set(o.x*pe.x,o.y*pe.y,o.x*pe.z,o.y*pe.w),C.viewport(r),O.updateMatrices(B,ce),n=O.getFrustum(),S(R,b,O.camera,B,this.type)}O.isPointLightShadow!==!0&&this.type===On&&T(O,b),O.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(v,y,M)};function T(D,R){const b=e.update(x);d.defines.VSM_SAMPLES!==D.blurSamples&&(d.defines.VSM_SAMPLES=D.blurSamples,f.defines.VSM_SAMPLES=D.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),D.mapPass===null&&(D.mapPass=new Ai(s.x,s.y)),d.uniforms.shadow_pass.value=D.map.texture,d.uniforms.resolution.value=D.mapSize,d.uniforms.radius.value=D.radius,i.setRenderTarget(D.mapPass),i.clear(),i.renderBufferDirect(R,null,b,d,x,null),f.uniforms.shadow_pass.value=D.mapPass.texture,f.uniforms.resolution.value=D.mapSize,f.uniforms.radius.value=D.radius,i.setRenderTarget(D.map),i.clear(),i.renderBufferDirect(R,null,b,f,x,null)}function E(D,R,b,v){let y=null;const M=b.isPointLight===!0?D.customDistanceMaterial:D.customDepthMaterial;if(M!==void 0)y=M;else if(y=b.isPointLight===!0?l:a,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const C=y.uuid,A=R.uuid;let I=c[C];I===void 0&&(I={},c[C]=I);let U=I[A];U===void 0&&(U=y.clone(),I[A]=U,R.addEventListener("dispose",z)),y=U}if(y.visible=R.visible,y.wireframe=R.wireframe,v===On?y.side=R.shadowSide!==null?R.shadowSide:R.side:y.side=R.shadowSide!==null?R.shadowSide:u[R.side],y.alphaMap=R.alphaMap,y.alphaTest=R.alphaTest,y.map=R.map,y.clipShadows=R.clipShadows,y.clippingPlanes=R.clippingPlanes,y.clipIntersection=R.clipIntersection,y.displacementMap=R.displacementMap,y.displacementScale=R.displacementScale,y.displacementBias=R.displacementBias,y.wireframeLinewidth=R.wireframeLinewidth,y.linewidth=R.linewidth,b.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const C=i.properties.get(y);C.light=b}return y}function S(D,R,b,v,y){if(D.visible===!1)return;if(D.layers.test(R.layers)&&(D.isMesh||D.isLine||D.isPoints)&&(D.castShadow||D.receiveShadow&&y===On)&&(!D.frustumCulled||n.intersectsObject(D))){D.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,D.matrixWorld);const A=e.update(D),I=D.material;if(Array.isArray(I)){const U=A.groups;for(let k=0,B=U.length;k<B;k++){const O=U[k],X=I[O.materialIndex];if(X&&X.visible){const J=E(D,X,v,y);D.onBeforeShadow(i,D,R,b,A,J,O),i.renderBufferDirect(b,null,A,J,D,O),D.onAfterShadow(i,D,R,b,A,J,O)}}}else if(I.visible){const U=E(D,I,v,y);D.onBeforeShadow(i,D,R,b,A,U,null),i.renderBufferDirect(b,null,A,U,D,null),D.onAfterShadow(i,D,R,b,A,U,null)}}const C=D.children;for(let A=0,I=C.length;A<I;A++)S(C[A],R,b,v,y)}function z(D){D.target.removeEventListener("dispose",z);for(const b in c){const v=c[b],y=D.target.uuid;y in v&&(v[y].dispose(),delete v[y])}}}const e1={[Hr]:Wr,[Xr]:qr,[Yr]:Kr,[os]:Zr,[Wr]:Hr,[qr]:Xr,[Kr]:Yr,[Zr]:os};function t1(i,e){function t(){let V=!1;const Me=new _t;let ee=null;const de=new _t(0,0,0,0);return{setMask:function(Pe){ee!==Pe&&!V&&(i.colorMask(Pe,Pe,Pe,Pe),ee=Pe)},setLocked:function(Pe){V=Pe},setClear:function(Pe,Te,Ze,Mt,Ft){Ft===!0&&(Pe*=Mt,Te*=Mt,Ze*=Mt),Me.set(Pe,Te,Ze,Mt),de.equals(Me)===!1&&(i.clearColor(Pe,Te,Ze,Mt),de.copy(Me))},reset:function(){V=!1,ee=null,de.set(-1,0,0,0)}}}function n(){let V=!1,Me=!1,ee=null,de=null,Pe=null;return{setReversed:function(Te){if(Me!==Te){const Ze=e.get("EXT_clip_control");Me?Ze.clipControlEXT(Ze.LOWER_LEFT_EXT,Ze.ZERO_TO_ONE_EXT):Ze.clipControlEXT(Ze.LOWER_LEFT_EXT,Ze.NEGATIVE_ONE_TO_ONE_EXT);const Mt=Pe;Pe=null,this.setClear(Mt)}Me=Te},getReversed:function(){return Me},setTest:function(Te){Te?le(i.DEPTH_TEST):ne(i.DEPTH_TEST)},setMask:function(Te){ee!==Te&&!V&&(i.depthMask(Te),ee=Te)},setFunc:function(Te){if(Me&&(Te=e1[Te]),de!==Te){switch(Te){case Hr:i.depthFunc(i.NEVER);break;case Wr:i.depthFunc(i.ALWAYS);break;case Xr:i.depthFunc(i.LESS);break;case os:i.depthFunc(i.LEQUAL);break;case Yr:i.depthFunc(i.EQUAL);break;case Zr:i.depthFunc(i.GEQUAL);break;case qr:i.depthFunc(i.GREATER);break;case Kr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}de=Te}},setLocked:function(Te){V=Te},setClear:function(Te){Pe!==Te&&(Me&&(Te=1-Te),i.clearDepth(Te),Pe=Te)},reset:function(){V=!1,ee=null,de=null,Pe=null,Me=!1}}}function s(){let V=!1,Me=null,ee=null,de=null,Pe=null,Te=null,Ze=null,Mt=null,Ft=null;return{setTest:function(at){V||(at?le(i.STENCIL_TEST):ne(i.STENCIL_TEST))},setMask:function(at){Me!==at&&!V&&(i.stencilMask(at),Me=at)},setFunc:function(at,Jt,un){(ee!==at||de!==Jt||Pe!==un)&&(i.stencilFunc(at,Jt,un),ee=at,de=Jt,Pe=un)},setOp:function(at,Jt,un){(Te!==at||Ze!==Jt||Mt!==un)&&(i.stencilOp(at,Jt,un),Te=at,Ze=Jt,Mt=un)},setLocked:function(at){V=at},setClear:function(at){Ft!==at&&(i.clearStencil(at),Ft=at)},reset:function(){V=!1,Me=null,ee=null,de=null,Pe=null,Te=null,Ze=null,Mt=null,Ft=null}}}const o=new t,r=new n,a=new s,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,x=!1,m=null,p=null,T=null,E=null,S=null,z=null,D=null,R=new st(0,0,0),b=0,v=!1,y=null,M=null,C=null,A=null,I=null;const U=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,B=0;const O=i.getParameter(i.VERSION);O.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(O)[1]),k=B>=1):O.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),k=B>=2);let X=null,J={};const ce=i.getParameter(i.SCISSOR_BOX),pe=i.getParameter(i.VIEWPORT),Oe=new _t().fromArray(ce),q=new _t().fromArray(pe);function oe(V,Me,ee,de){const Pe=new Uint8Array(4),Te=i.createTexture();i.bindTexture(V,Te),i.texParameteri(V,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(V,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ze=0;Ze<ee;Ze++)V===i.TEXTURE_3D||V===i.TEXTURE_2D_ARRAY?i.texImage3D(Me,0,i.RGBA,1,1,de,0,i.RGBA,i.UNSIGNED_BYTE,Pe):i.texImage2D(Me+Ze,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Pe);return Te}const ye={};ye[i.TEXTURE_2D]=oe(i.TEXTURE_2D,i.TEXTURE_2D,1),ye[i.TEXTURE_CUBE_MAP]=oe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ye[i.TEXTURE_2D_ARRAY]=oe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ye[i.TEXTURE_3D]=oe(i.TEXTURE_3D,i.TEXTURE_3D,1,1),o.setClear(0,0,0,1),r.setClear(1),a.setClear(0),le(i.DEPTH_TEST),r.setFunc(os),he(!1),_e(Qa),le(i.CULL_FACE),N(ti);function le(V){h[V]!==!0&&(i.enable(V),h[V]=!0)}function ne(V){h[V]!==!1&&(i.disable(V),h[V]=!1)}function ve(V,Me){return u[V]!==Me?(i.bindFramebuffer(V,Me),u[V]=Me,V===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=Me),V===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=Me),!0):!1}function Z(V,Me){let ee=f,de=!1;if(V){ee=d.get(Me),ee===void 0&&(ee=[],d.set(Me,ee));const Pe=V.textures;if(ee.length!==Pe.length||ee[0]!==i.COLOR_ATTACHMENT0){for(let Te=0,Ze=Pe.length;Te<Ze;Te++)ee[Te]=i.COLOR_ATTACHMENT0+Te;ee.length=Pe.length,de=!0}}else ee[0]!==i.BACK&&(ee[0]=i.BACK,de=!0);de&&i.drawBuffers(ee)}function Ne(V){return g!==V?(i.useProgram(V),g=V,!0):!1}const re={[vi]:i.FUNC_ADD,[dh]:i.FUNC_SUBTRACT,[uh]:i.FUNC_REVERSE_SUBTRACT};re[fh]=i.MIN,re[ph]=i.MAX;const te={[mh]:i.ZERO,[gh]:i.ONE,[xh]:i.SRC_COLOR,[Gr]:i.SRC_ALPHA,[Mh]:i.SRC_ALPHA_SATURATE,[wh]:i.DST_COLOR,[_h]:i.DST_ALPHA,[yh]:i.ONE_MINUS_SRC_COLOR,[Vr]:i.ONE_MINUS_SRC_ALPHA,[bh]:i.ONE_MINUS_DST_COLOR,[vh]:i.ONE_MINUS_DST_ALPHA,[Sh]:i.CONSTANT_COLOR,[Eh]:i.ONE_MINUS_CONSTANT_COLOR,[Ah]:i.CONSTANT_ALPHA,[Th]:i.ONE_MINUS_CONSTANT_ALPHA};function N(V,Me,ee,de,Pe,Te,Ze,Mt,Ft,at){if(V===ti){x===!0&&(ne(i.BLEND),x=!1);return}if(x===!1&&(le(i.BLEND),x=!0),V!==hh){if(V!==m||at!==v){if((p!==vi||S!==vi)&&(i.blendEquation(i.FUNC_ADD),p=vi,S=vi),at)switch(V){case ts:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case el:i.blendFunc(i.ONE,i.ONE);break;case tl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case nl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}else switch(V){case ts:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case el:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case tl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case nl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}T=null,E=null,z=null,D=null,R.set(0,0,0),b=0,m=V,v=at}return}Pe=Pe||Me,Te=Te||ee,Ze=Ze||de,(Me!==p||Pe!==S)&&(i.blendEquationSeparate(re[Me],re[Pe]),p=Me,S=Pe),(ee!==T||de!==E||Te!==z||Ze!==D)&&(i.blendFuncSeparate(te[ee],te[de],te[Te],te[Ze]),T=ee,E=de,z=Te,D=Ze),(Mt.equals(R)===!1||Ft!==b)&&(i.blendColor(Mt.r,Mt.g,Mt.b,Ft),R.copy(Mt),b=Ft),m=V,v=!1}function Ee(V,Me){V.side===Rt?ne(i.CULL_FACE):le(i.CULL_FACE);let ee=V.side===jt;Me&&(ee=!ee),he(ee),V.blending===ts&&V.transparent===!1?N(ti):N(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),r.setFunc(V.depthFunc),r.setTest(V.depthTest),r.setMask(V.depthWrite),o.setMask(V.colorWrite);const de=V.stencilWrite;a.setTest(de),de&&(a.setMask(V.stencilWriteMask),a.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),a.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),Ie(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?le(i.SAMPLE_ALPHA_TO_COVERAGE):ne(i.SAMPLE_ALPHA_TO_COVERAGE)}function he(V){y!==V&&(V?i.frontFace(i.CW):i.frontFace(i.CCW),y=V)}function _e(V){V!==ah?(le(i.CULL_FACE),V!==M&&(V===Qa?i.cullFace(i.BACK):V===lh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ne(i.CULL_FACE),M=V}function fe(V){V!==C&&(k&&i.lineWidth(V),C=V)}function Ie(V,Me,ee){V?(le(i.POLYGON_OFFSET_FILL),(A!==Me||I!==ee)&&(i.polygonOffset(Me,ee),A=Me,I=ee)):ne(i.POLYGON_OFFSET_FILL)}function we(V){V?le(i.SCISSOR_TEST):ne(i.SCISSOR_TEST)}function F(V){V===void 0&&(V=i.TEXTURE0+U-1),X!==V&&(i.activeTexture(V),X=V)}function P(V,Me,ee){ee===void 0&&(X===null?ee=i.TEXTURE0+U-1:ee=X);let de=J[ee];de===void 0&&(de={type:void 0,texture:void 0},J[ee]=de),(de.type!==V||de.texture!==Me)&&(X!==ee&&(i.activeTexture(ee),X=ee),i.bindTexture(V,Me||ye[V]),de.type=V,de.texture=Me)}function W(){const V=J[X];V!==void 0&&V.type!==void 0&&(i.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function j(){try{i.compressedTexImage2D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ae(){try{i.compressedTexImage3D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ie(){try{i.texSubImage2D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Be(){try{i.texSubImage3D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function be(){try{i.compressedTexSubImage2D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Re(){try{i.compressedTexSubImage3D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function nt(){try{i.texStorage2D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ge(){try{i.texStorage3D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Le(){try{i.texImage2D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function We(){try{i.texImage3D(...arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Xe(V){Oe.equals(V)===!1&&(i.scissor(V.x,V.y,V.z,V.w),Oe.copy(V))}function Fe(V){q.equals(V)===!1&&(i.viewport(V.x,V.y,V.z,V.w),q.copy(V))}function it(V,Me){let ee=c.get(Me);ee===void 0&&(ee=new WeakMap,c.set(Me,ee));let de=ee.get(V);de===void 0&&(de=i.getUniformBlockIndex(Me,V.name),ee.set(V,de))}function $e(V,Me){const de=c.get(Me).get(V);l.get(Me)!==de&&(i.uniformBlockBinding(Me,de,V.__bindingPointIndex),l.set(Me,de))}function pt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),r.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},X=null,J={},u={},d=new WeakMap,f=[],g=null,x=!1,m=null,p=null,T=null,E=null,S=null,z=null,D=null,R=new st(0,0,0),b=0,v=!1,y=null,M=null,C=null,A=null,I=null,Oe.set(0,0,i.canvas.width,i.canvas.height),q.set(0,0,i.canvas.width,i.canvas.height),o.reset(),r.reset(),a.reset()}return{buffers:{color:o,depth:r,stencil:a},enable:le,disable:ne,bindFramebuffer:ve,drawBuffers:Z,useProgram:Ne,setBlending:N,setMaterial:Ee,setFlipSided:he,setCullFace:_e,setLineWidth:fe,setPolygonOffset:Ie,setScissorTest:we,activeTexture:F,bindTexture:P,unbindTexture:W,compressedTexImage2D:j,compressedTexImage3D:ae,texImage2D:Le,texImage3D:We,updateUBOMapping:it,uniformBlockBinding:$e,texStorage2D:nt,texStorage3D:ge,texSubImage2D:ie,texSubImage3D:Be,compressedTexSubImage2D:be,compressedTexSubImage3D:Re,scissor:Xe,viewport:Fe,reset:pt}}function n1(i,e,t,n,s,o,r){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ue,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(F,P){return f?new OffscreenCanvas(F,P):Zo("canvas")}function x(F,P,W){let j=1;const ae=we(F);if((ae.width>W||ae.height>W)&&(j=W/Math.max(ae.width,ae.height)),j<1)if(typeof HTMLImageElement<"u"&&F instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&F instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&F instanceof ImageBitmap||typeof VideoFrame<"u"&&F instanceof VideoFrame){const ie=Math.floor(j*ae.width),Be=Math.floor(j*ae.height);u===void 0&&(u=g(ie,Be));const be=P?g(ie,Be):u;return be.width=ie,be.height=Be,be.getContext("2d").drawImage(F,0,0,ie,Be),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ae.width+"x"+ae.height+") to ("+ie+"x"+Be+")."),be}else return"data"in F&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ae.width+"x"+ae.height+")."),F;return F}function m(F){return F.generateMipmaps}function p(F){i.generateMipmap(F)}function T(F){return F.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:F.isWebGL3DRenderTarget?i.TEXTURE_3D:F.isWebGLArrayRenderTarget||F.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(F,P,W,j,ae=!1){if(F!==null){if(i[F]!==void 0)return i[F];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+F+"'")}let ie=P;if(P===i.RED&&(W===i.FLOAT&&(ie=i.R32F),W===i.HALF_FLOAT&&(ie=i.R16F),W===i.UNSIGNED_BYTE&&(ie=i.R8)),P===i.RED_INTEGER&&(W===i.UNSIGNED_BYTE&&(ie=i.R8UI),W===i.UNSIGNED_SHORT&&(ie=i.R16UI),W===i.UNSIGNED_INT&&(ie=i.R32UI),W===i.BYTE&&(ie=i.R8I),W===i.SHORT&&(ie=i.R16I),W===i.INT&&(ie=i.R32I)),P===i.RG&&(W===i.FLOAT&&(ie=i.RG32F),W===i.HALF_FLOAT&&(ie=i.RG16F),W===i.UNSIGNED_BYTE&&(ie=i.RG8)),P===i.RG_INTEGER&&(W===i.UNSIGNED_BYTE&&(ie=i.RG8UI),W===i.UNSIGNED_SHORT&&(ie=i.RG16UI),W===i.UNSIGNED_INT&&(ie=i.RG32UI),W===i.BYTE&&(ie=i.RG8I),W===i.SHORT&&(ie=i.RG16I),W===i.INT&&(ie=i.RG32I)),P===i.RGB_INTEGER&&(W===i.UNSIGNED_BYTE&&(ie=i.RGB8UI),W===i.UNSIGNED_SHORT&&(ie=i.RGB16UI),W===i.UNSIGNED_INT&&(ie=i.RGB32UI),W===i.BYTE&&(ie=i.RGB8I),W===i.SHORT&&(ie=i.RGB16I),W===i.INT&&(ie=i.RGB32I)),P===i.RGBA_INTEGER&&(W===i.UNSIGNED_BYTE&&(ie=i.RGBA8UI),W===i.UNSIGNED_SHORT&&(ie=i.RGBA16UI),W===i.UNSIGNED_INT&&(ie=i.RGBA32UI),W===i.BYTE&&(ie=i.RGBA8I),W===i.SHORT&&(ie=i.RGBA16I),W===i.INT&&(ie=i.RGBA32I)),P===i.RGB&&W===i.UNSIGNED_INT_5_9_9_9_REV&&(ie=i.RGB9_E5),P===i.RGBA){const Be=ae?Xo:ct.getTransfer(j);W===i.FLOAT&&(ie=i.RGBA32F),W===i.HALF_FLOAT&&(ie=i.RGBA16F),W===i.UNSIGNED_BYTE&&(ie=Be===xt?i.SRGB8_ALPHA8:i.RGBA8),W===i.UNSIGNED_SHORT_4_4_4_4&&(ie=i.RGBA4),W===i.UNSIGNED_SHORT_5_5_5_1&&(ie=i.RGB5_A1)}return(ie===i.R16F||ie===i.R32F||ie===i.RG16F||ie===i.RG32F||ie===i.RGBA16F||ie===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function S(F,P){let W;return F?P===null||P===Ei||P===ls?W=i.DEPTH24_STENCIL8:P===In?W=i.DEPTH32F_STENCIL8:P===Vs&&(W=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):P===null||P===Ei||P===ls?W=i.DEPTH_COMPONENT24:P===In?W=i.DEPTH_COMPONENT32F:P===Vs&&(W=i.DEPTH_COMPONENT16),W}function z(F,P){return m(F)===!0||F.isFramebufferTexture&&F.minFilter!==dn&&F.minFilter!==Rn?Math.log2(Math.max(P.width,P.height))+1:F.mipmaps!==void 0&&F.mipmaps.length>0?F.mipmaps.length:F.isCompressedTexture&&Array.isArray(F.image)?P.mipmaps.length:1}function D(F){const P=F.target;P.removeEventListener("dispose",D),b(P),P.isVideoTexture&&h.delete(P)}function R(F){const P=F.target;P.removeEventListener("dispose",R),y(P)}function b(F){const P=n.get(F);if(P.__webglInit===void 0)return;const W=F.source,j=d.get(W);if(j){const ae=j[P.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&v(F),Object.keys(j).length===0&&d.delete(W)}n.remove(F)}function v(F){const P=n.get(F);i.deleteTexture(P.__webglTexture);const W=F.source,j=d.get(W);delete j[P.__cacheKey],r.memory.textures--}function y(F){const P=n.get(F);if(F.depthTexture&&(F.depthTexture.dispose(),n.remove(F.depthTexture)),F.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(P.__webglFramebuffer[j]))for(let ae=0;ae<P.__webglFramebuffer[j].length;ae++)i.deleteFramebuffer(P.__webglFramebuffer[j][ae]);else i.deleteFramebuffer(P.__webglFramebuffer[j]);P.__webglDepthbuffer&&i.deleteRenderbuffer(P.__webglDepthbuffer[j])}else{if(Array.isArray(P.__webglFramebuffer))for(let j=0;j<P.__webglFramebuffer.length;j++)i.deleteFramebuffer(P.__webglFramebuffer[j]);else i.deleteFramebuffer(P.__webglFramebuffer);if(P.__webglDepthbuffer&&i.deleteRenderbuffer(P.__webglDepthbuffer),P.__webglMultisampledFramebuffer&&i.deleteFramebuffer(P.__webglMultisampledFramebuffer),P.__webglColorRenderbuffer)for(let j=0;j<P.__webglColorRenderbuffer.length;j++)P.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(P.__webglColorRenderbuffer[j]);P.__webglDepthRenderbuffer&&i.deleteRenderbuffer(P.__webglDepthRenderbuffer)}const W=F.textures;for(let j=0,ae=W.length;j<ae;j++){const ie=n.get(W[j]);ie.__webglTexture&&(i.deleteTexture(ie.__webglTexture),r.memory.textures--),n.remove(W[j])}n.remove(F)}let M=0;function C(){M=0}function A(){const F=M;return F>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+F+" texture units while this GPU supports only "+s.maxTextures),M+=1,F}function I(F){const P=[];return P.push(F.wrapS),P.push(F.wrapT),P.push(F.wrapR||0),P.push(F.magFilter),P.push(F.minFilter),P.push(F.anisotropy),P.push(F.internalFormat),P.push(F.format),P.push(F.type),P.push(F.generateMipmaps),P.push(F.premultiplyAlpha),P.push(F.flipY),P.push(F.unpackAlignment),P.push(F.colorSpace),P.join()}function U(F,P){const W=n.get(F);if(F.isVideoTexture&&fe(F),F.isRenderTargetTexture===!1&&F.version>0&&W.__version!==F.version){const j=F.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(W,F,P);return}}t.bindTexture(i.TEXTURE_2D,W.__webglTexture,i.TEXTURE0+P)}function k(F,P){const W=n.get(F);if(F.version>0&&W.__version!==F.version){q(W,F,P);return}t.bindTexture(i.TEXTURE_2D_ARRAY,W.__webglTexture,i.TEXTURE0+P)}function B(F,P){const W=n.get(F);if(F.version>0&&W.__version!==F.version){q(W,F,P);return}t.bindTexture(i.TEXTURE_3D,W.__webglTexture,i.TEXTURE0+P)}function O(F,P){const W=n.get(F);if(F.version>0&&W.__version!==F.version){oe(W,F,P);return}t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture,i.TEXTURE0+P)}const X={[sn]:i.REPEAT,[ei]:i.CLAMP_TO_EDGE,[Jr]:i.MIRRORED_REPEAT},J={[dn]:i.NEAREST,[Nh]:i.NEAREST_MIPMAP_NEAREST,[to]:i.NEAREST_MIPMAP_LINEAR,[Rn]:i.LINEAR,[sr]:i.LINEAR_MIPMAP_NEAREST,[Mi]:i.LINEAR_MIPMAP_LINEAR},ce={[Bh]:i.NEVER,[Yh]:i.ALWAYS,[Gh]:i.LESS,[zc]:i.LEQUAL,[Vh]:i.EQUAL,[Xh]:i.GEQUAL,[Hh]:i.GREATER,[Wh]:i.NOTEQUAL};function pe(F,P){if(P.type===In&&e.has("OES_texture_float_linear")===!1&&(P.magFilter===Rn||P.magFilter===sr||P.magFilter===to||P.magFilter===Mi||P.minFilter===Rn||P.minFilter===sr||P.minFilter===to||P.minFilter===Mi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(F,i.TEXTURE_WRAP_S,X[P.wrapS]),i.texParameteri(F,i.TEXTURE_WRAP_T,X[P.wrapT]),(F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY)&&i.texParameteri(F,i.TEXTURE_WRAP_R,X[P.wrapR]),i.texParameteri(F,i.TEXTURE_MAG_FILTER,J[P.magFilter]),i.texParameteri(F,i.TEXTURE_MIN_FILTER,J[P.minFilter]),P.compareFunction&&(i.texParameteri(F,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(F,i.TEXTURE_COMPARE_FUNC,ce[P.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(P.magFilter===dn||P.minFilter!==to&&P.minFilter!==Mi||P.type===In&&e.has("OES_texture_float_linear")===!1)return;if(P.anisotropy>1||n.get(P).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");i.texParameterf(F,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(P.anisotropy,s.getMaxAnisotropy())),n.get(P).__currentAnisotropy=P.anisotropy}}}function Oe(F,P){let W=!1;F.__webglInit===void 0&&(F.__webglInit=!0,P.addEventListener("dispose",D));const j=P.source;let ae=d.get(j);ae===void 0&&(ae={},d.set(j,ae));const ie=I(P);if(ie!==F.__cacheKey){ae[ie]===void 0&&(ae[ie]={texture:i.createTexture(),usedTimes:0},r.memory.textures++,W=!0),ae[ie].usedTimes++;const Be=ae[F.__cacheKey];Be!==void 0&&(ae[F.__cacheKey].usedTimes--,Be.usedTimes===0&&v(P)),F.__cacheKey=ie,F.__webglTexture=ae[ie].texture}return W}function q(F,P,W){let j=i.TEXTURE_2D;(P.isDataArrayTexture||P.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),P.isData3DTexture&&(j=i.TEXTURE_3D);const ae=Oe(F,P),ie=P.source;t.bindTexture(j,F.__webglTexture,i.TEXTURE0+W);const Be=n.get(ie);if(ie.version!==Be.__version||ae===!0){t.activeTexture(i.TEXTURE0+W);const be=ct.getPrimaries(ct.workingColorSpace),Re=P.colorSpace===Qn?null:ct.getPrimaries(P.colorSpace),nt=P.colorSpace===Qn||be===Re?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,P.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,P.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,nt);let ge=x(P.image,!1,s.maxTextureSize);ge=Ie(P,ge);const Le=o.convert(P.format,P.colorSpace),We=o.convert(P.type);let Xe=E(P.internalFormat,Le,We,P.colorSpace,P.isVideoTexture);pe(j,P);let Fe;const it=P.mipmaps,$e=P.isVideoTexture!==!0,pt=Be.__version===void 0||ae===!0,V=ie.dataReady,Me=z(P,ge);if(P.isDepthTexture)Xe=S(P.format===cs,P.type),pt&&($e?t.texStorage2D(i.TEXTURE_2D,1,Xe,ge.width,ge.height):t.texImage2D(i.TEXTURE_2D,0,Xe,ge.width,ge.height,0,Le,We,null));else if(P.isDataTexture)if(it.length>0){$e&&pt&&t.texStorage2D(i.TEXTURE_2D,Me,Xe,it[0].width,it[0].height);for(let ee=0,de=it.length;ee<de;ee++)Fe=it[ee],$e?V&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,Fe.width,Fe.height,Le,We,Fe.data):t.texImage2D(i.TEXTURE_2D,ee,Xe,Fe.width,Fe.height,0,Le,We,Fe.data);P.generateMipmaps=!1}else $e?(pt&&t.texStorage2D(i.TEXTURE_2D,Me,Xe,ge.width,ge.height),V&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ge.width,ge.height,Le,We,ge.data)):t.texImage2D(i.TEXTURE_2D,0,Xe,ge.width,ge.height,0,Le,We,ge.data);else if(P.isCompressedTexture)if(P.isCompressedArrayTexture){$e&&pt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Me,Xe,it[0].width,it[0].height,ge.depth);for(let ee=0,de=it.length;ee<de;ee++)if(Fe=it[ee],P.format!==Sn)if(Le!==null)if($e){if(V)if(P.layerUpdates.size>0){const Pe=Hl(Fe.width,Fe.height,P.format,P.type);for(const Te of P.layerUpdates){const Ze=Fe.data.subarray(Te*Pe/Fe.data.BYTES_PER_ELEMENT,(Te+1)*Pe/Fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,Te,Fe.width,Fe.height,1,Le,Ze)}P.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,Fe.width,Fe.height,ge.depth,Le,Fe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ee,Xe,Fe.width,Fe.height,ge.depth,0,Fe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else $e?V&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,Fe.width,Fe.height,ge.depth,Le,We,Fe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ee,Xe,Fe.width,Fe.height,ge.depth,0,Le,We,Fe.data)}else{$e&&pt&&t.texStorage2D(i.TEXTURE_2D,Me,Xe,it[0].width,it[0].height);for(let ee=0,de=it.length;ee<de;ee++)Fe=it[ee],P.format!==Sn?Le!==null?$e?V&&t.compressedTexSubImage2D(i.TEXTURE_2D,ee,0,0,Fe.width,Fe.height,Le,Fe.data):t.compressedTexImage2D(i.TEXTURE_2D,ee,Xe,Fe.width,Fe.height,0,Fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$e?V&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,Fe.width,Fe.height,Le,We,Fe.data):t.texImage2D(i.TEXTURE_2D,ee,Xe,Fe.width,Fe.height,0,Le,We,Fe.data)}else if(P.isDataArrayTexture)if($e){if(pt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Me,Xe,ge.width,ge.height,ge.depth),V)if(P.layerUpdates.size>0){const ee=Hl(ge.width,ge.height,P.format,P.type);for(const de of P.layerUpdates){const Pe=ge.data.subarray(de*ee/ge.data.BYTES_PER_ELEMENT,(de+1)*ee/ge.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,de,ge.width,ge.height,1,Le,We,Pe)}P.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ge.width,ge.height,ge.depth,Le,We,ge.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Xe,ge.width,ge.height,ge.depth,0,Le,We,ge.data);else if(P.isData3DTexture)$e?(pt&&t.texStorage3D(i.TEXTURE_3D,Me,Xe,ge.width,ge.height,ge.depth),V&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ge.width,ge.height,ge.depth,Le,We,ge.data)):t.texImage3D(i.TEXTURE_3D,0,Xe,ge.width,ge.height,ge.depth,0,Le,We,ge.data);else if(P.isFramebufferTexture){if(pt)if($e)t.texStorage2D(i.TEXTURE_2D,Me,Xe,ge.width,ge.height);else{let ee=ge.width,de=ge.height;for(let Pe=0;Pe<Me;Pe++)t.texImage2D(i.TEXTURE_2D,Pe,Xe,ee,de,0,Le,We,null),ee>>=1,de>>=1}}else if(it.length>0){if($e&&pt){const ee=we(it[0]);t.texStorage2D(i.TEXTURE_2D,Me,Xe,ee.width,ee.height)}for(let ee=0,de=it.length;ee<de;ee++)Fe=it[ee],$e?V&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,Le,We,Fe):t.texImage2D(i.TEXTURE_2D,ee,Xe,Le,We,Fe);P.generateMipmaps=!1}else if($e){if(pt){const ee=we(ge);t.texStorage2D(i.TEXTURE_2D,Me,Xe,ee.width,ee.height)}V&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Le,We,ge)}else t.texImage2D(i.TEXTURE_2D,0,Xe,Le,We,ge);m(P)&&p(j),Be.__version=ie.version,P.onUpdate&&P.onUpdate(P)}F.__version=P.version}function oe(F,P,W){if(P.image.length!==6)return;const j=Oe(F,P),ae=P.source;t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+W);const ie=n.get(ae);if(ae.version!==ie.__version||j===!0){t.activeTexture(i.TEXTURE0+W);const Be=ct.getPrimaries(ct.workingColorSpace),be=P.colorSpace===Qn?null:ct.getPrimaries(P.colorSpace),Re=P.colorSpace===Qn||Be===be?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,P.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,P.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);const nt=P.isCompressedTexture||P.image[0].isCompressedTexture,ge=P.image[0]&&P.image[0].isDataTexture,Le=[];for(let de=0;de<6;de++)!nt&&!ge?Le[de]=x(P.image[de],!0,s.maxCubemapSize):Le[de]=ge?P.image[de].image:P.image[de],Le[de]=Ie(P,Le[de]);const We=Le[0],Xe=o.convert(P.format,P.colorSpace),Fe=o.convert(P.type),it=E(P.internalFormat,Xe,Fe,P.colorSpace),$e=P.isVideoTexture!==!0,pt=ie.__version===void 0||j===!0,V=ae.dataReady;let Me=z(P,We);pe(i.TEXTURE_CUBE_MAP,P);let ee;if(nt){$e&&pt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Me,it,We.width,We.height);for(let de=0;de<6;de++){ee=Le[de].mipmaps;for(let Pe=0;Pe<ee.length;Pe++){const Te=ee[Pe];P.format!==Sn?Xe!==null?$e?V&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Pe,0,0,Te.width,Te.height,Xe,Te.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Pe,it,Te.width,Te.height,0,Te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$e?V&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Pe,0,0,Te.width,Te.height,Xe,Fe,Te.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Pe,it,Te.width,Te.height,0,Xe,Fe,Te.data)}}}else{if(ee=P.mipmaps,$e&&pt){ee.length>0&&Me++;const de=we(Le[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Me,it,de.width,de.height)}for(let de=0;de<6;de++)if(ge){$e?V&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,0,0,Le[de].width,Le[de].height,Xe,Fe,Le[de].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,it,Le[de].width,Le[de].height,0,Xe,Fe,Le[de].data);for(let Pe=0;Pe<ee.length;Pe++){const Ze=ee[Pe].image[de].image;$e?V&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Pe+1,0,0,Ze.width,Ze.height,Xe,Fe,Ze.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Pe+1,it,Ze.width,Ze.height,0,Xe,Fe,Ze.data)}}else{$e?V&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,0,0,Xe,Fe,Le[de]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,it,Xe,Fe,Le[de]);for(let Pe=0;Pe<ee.length;Pe++){const Te=ee[Pe];$e?V&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Pe+1,0,0,Xe,Fe,Te.image[de]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Pe+1,it,Xe,Fe,Te.image[de])}}}m(P)&&p(i.TEXTURE_CUBE_MAP),ie.__version=ae.version,P.onUpdate&&P.onUpdate(P)}F.__version=P.version}function ye(F,P,W,j,ae,ie){const Be=o.convert(W.format,W.colorSpace),be=o.convert(W.type),Re=E(W.internalFormat,Be,be,W.colorSpace),nt=n.get(P),ge=n.get(W);if(ge.__renderTarget=P,!nt.__hasExternalTextures){const Le=Math.max(1,P.width>>ie),We=Math.max(1,P.height>>ie);ae===i.TEXTURE_3D||ae===i.TEXTURE_2D_ARRAY?t.texImage3D(ae,ie,Re,Le,We,P.depth,0,Be,be,null):t.texImage2D(ae,ie,Re,Le,We,0,Be,be,null)}t.bindFramebuffer(i.FRAMEBUFFER,F),_e(P)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,ae,ge.__webglTexture,0,he(P)):(ae===i.TEXTURE_2D||ae>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,ae,ge.__webglTexture,ie),t.bindFramebuffer(i.FRAMEBUFFER,null)}function le(F,P,W){if(i.bindRenderbuffer(i.RENDERBUFFER,F),P.depthBuffer){const j=P.depthTexture,ae=j&&j.isDepthTexture?j.type:null,ie=S(P.stencilBuffer,ae),Be=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,be=he(P);_e(P)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,be,ie,P.width,P.height):W?i.renderbufferStorageMultisample(i.RENDERBUFFER,be,ie,P.width,P.height):i.renderbufferStorage(i.RENDERBUFFER,ie,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Be,i.RENDERBUFFER,F)}else{const j=P.textures;for(let ae=0;ae<j.length;ae++){const ie=j[ae],Be=o.convert(ie.format,ie.colorSpace),be=o.convert(ie.type),Re=E(ie.internalFormat,Be,be,ie.colorSpace),nt=he(P);W&&_e(P)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,nt,Re,P.width,P.height):_e(P)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,nt,Re,P.width,P.height):i.renderbufferStorage(i.RENDERBUFFER,Re,P.width,P.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ne(F,P){if(P&&P.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,F),!(P.depthTexture&&P.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=n.get(P.depthTexture);j.__renderTarget=P,(!j.__webglTexture||P.depthTexture.image.width!==P.width||P.depthTexture.image.height!==P.height)&&(P.depthTexture.image.width=P.width,P.depthTexture.image.height=P.height,P.depthTexture.needsUpdate=!0),U(P.depthTexture,0);const ae=j.__webglTexture,ie=he(P);if(P.depthTexture.format===ns)_e(P)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ae,0,ie):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ae,0);else if(P.depthTexture.format===cs)_e(P)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ae,0,ie):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ae,0);else throw new Error("Unknown depthTexture format")}function ve(F){const P=n.get(F),W=F.isWebGLCubeRenderTarget===!0;if(P.__boundDepthTexture!==F.depthTexture){const j=F.depthTexture;if(P.__depthDisposeCallback&&P.__depthDisposeCallback(),j){const ae=()=>{delete P.__boundDepthTexture,delete P.__depthDisposeCallback,j.removeEventListener("dispose",ae)};j.addEventListener("dispose",ae),P.__depthDisposeCallback=ae}P.__boundDepthTexture=j}if(F.depthTexture&&!P.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");ne(P.__webglFramebuffer,F)}else if(W){P.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(i.FRAMEBUFFER,P.__webglFramebuffer[j]),P.__webglDepthbuffer[j]===void 0)P.__webglDepthbuffer[j]=i.createRenderbuffer(),le(P.__webglDepthbuffer[j],F,!1);else{const ae=F.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ie=P.__webglDepthbuffer[j];i.bindRenderbuffer(i.RENDERBUFFER,ie),i.framebufferRenderbuffer(i.FRAMEBUFFER,ae,i.RENDERBUFFER,ie)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,P.__webglFramebuffer),P.__webglDepthbuffer===void 0)P.__webglDepthbuffer=i.createRenderbuffer(),le(P.__webglDepthbuffer,F,!1);else{const j=F.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=P.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ae),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,ae)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Z(F,P,W){const j=n.get(F);P!==void 0&&ye(j.__webglFramebuffer,F,F.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),W!==void 0&&ve(F)}function Ne(F){const P=F.texture,W=n.get(F),j=n.get(P);F.addEventListener("dispose",R);const ae=F.textures,ie=F.isWebGLCubeRenderTarget===!0,Be=ae.length>1;if(Be||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=P.version,r.memory.textures++),ie){W.__webglFramebuffer=[];for(let be=0;be<6;be++)if(P.mipmaps&&P.mipmaps.length>0){W.__webglFramebuffer[be]=[];for(let Re=0;Re<P.mipmaps.length;Re++)W.__webglFramebuffer[be][Re]=i.createFramebuffer()}else W.__webglFramebuffer[be]=i.createFramebuffer()}else{if(P.mipmaps&&P.mipmaps.length>0){W.__webglFramebuffer=[];for(let be=0;be<P.mipmaps.length;be++)W.__webglFramebuffer[be]=i.createFramebuffer()}else W.__webglFramebuffer=i.createFramebuffer();if(Be)for(let be=0,Re=ae.length;be<Re;be++){const nt=n.get(ae[be]);nt.__webglTexture===void 0&&(nt.__webglTexture=i.createTexture(),r.memory.textures++)}if(F.samples>0&&_e(F)===!1){W.__webglMultisampledFramebuffer=i.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let be=0;be<ae.length;be++){const Re=ae[be];W.__webglColorRenderbuffer[be]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,W.__webglColorRenderbuffer[be]);const nt=o.convert(Re.format,Re.colorSpace),ge=o.convert(Re.type),Le=E(Re.internalFormat,nt,ge,Re.colorSpace,F.isXRRenderTarget===!0),We=he(F);i.renderbufferStorageMultisample(i.RENDERBUFFER,We,Le,F.width,F.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,W.__webglColorRenderbuffer[be])}i.bindRenderbuffer(i.RENDERBUFFER,null),F.depthBuffer&&(W.__webglDepthRenderbuffer=i.createRenderbuffer(),le(W.__webglDepthRenderbuffer,F,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ie){t.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),pe(i.TEXTURE_CUBE_MAP,P);for(let be=0;be<6;be++)if(P.mipmaps&&P.mipmaps.length>0)for(let Re=0;Re<P.mipmaps.length;Re++)ye(W.__webglFramebuffer[be][Re],F,P,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+be,Re);else ye(W.__webglFramebuffer[be],F,P,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+be,0);m(P)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Be){for(let be=0,Re=ae.length;be<Re;be++){const nt=ae[be],ge=n.get(nt);t.bindTexture(i.TEXTURE_2D,ge.__webglTexture),pe(i.TEXTURE_2D,nt),ye(W.__webglFramebuffer,F,nt,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,0),m(nt)&&p(i.TEXTURE_2D)}t.unbindTexture()}else{let be=i.TEXTURE_2D;if((F.isWebGL3DRenderTarget||F.isWebGLArrayRenderTarget)&&(be=F.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(be,j.__webglTexture),pe(be,P),P.mipmaps&&P.mipmaps.length>0)for(let Re=0;Re<P.mipmaps.length;Re++)ye(W.__webglFramebuffer[Re],F,P,i.COLOR_ATTACHMENT0,be,Re);else ye(W.__webglFramebuffer,F,P,i.COLOR_ATTACHMENT0,be,0);m(P)&&p(be),t.unbindTexture()}F.depthBuffer&&ve(F)}function re(F){const P=F.textures;for(let W=0,j=P.length;W<j;W++){const ae=P[W];if(m(ae)){const ie=T(F),Be=n.get(ae).__webglTexture;t.bindTexture(ie,Be),p(ie),t.unbindTexture()}}}const te=[],N=[];function Ee(F){if(F.samples>0){if(_e(F)===!1){const P=F.textures,W=F.width,j=F.height;let ae=i.COLOR_BUFFER_BIT;const ie=F.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Be=n.get(F),be=P.length>1;if(be)for(let Re=0;Re<P.length;Re++)t.bindFramebuffer(i.FRAMEBUFFER,Be.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Be.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Be.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Be.__webglFramebuffer);for(let Re=0;Re<P.length;Re++){if(F.resolveDepthBuffer&&(F.depthBuffer&&(ae|=i.DEPTH_BUFFER_BIT),F.stencilBuffer&&F.resolveStencilBuffer&&(ae|=i.STENCIL_BUFFER_BIT)),be){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Be.__webglColorRenderbuffer[Re]);const nt=n.get(P[Re]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,nt,0)}i.blitFramebuffer(0,0,W,j,0,0,W,j,ae,i.NEAREST),l===!0&&(te.length=0,N.length=0,te.push(i.COLOR_ATTACHMENT0+Re),F.depthBuffer&&F.resolveDepthBuffer===!1&&(te.push(ie),N.push(ie),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,N)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,te))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),be)for(let Re=0;Re<P.length;Re++){t.bindFramebuffer(i.FRAMEBUFFER,Be.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.RENDERBUFFER,Be.__webglColorRenderbuffer[Re]);const nt=n.get(P[Re]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Be.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.TEXTURE_2D,nt,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Be.__webglMultisampledFramebuffer)}else if(F.depthBuffer&&F.resolveDepthBuffer===!1&&l){const P=F.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[P])}}}function he(F){return Math.min(s.maxSamples,F.samples)}function _e(F){const P=n.get(F);return F.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&P.__useRenderToTexture!==!1}function fe(F){const P=r.render.frame;h.get(F)!==P&&(h.set(F,P),F.update())}function Ie(F,P){const W=F.colorSpace,j=F.format,ae=F.type;return F.isCompressedTexture===!0||F.isVideoTexture===!0||W!==hs&&W!==Qn&&(ct.getTransfer(W)===xt?(j!==Sn||ae!==Xn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),P}function we(F){return typeof HTMLImageElement<"u"&&F instanceof HTMLImageElement?(c.width=F.naturalWidth||F.width,c.height=F.naturalHeight||F.height):typeof VideoFrame<"u"&&F instanceof VideoFrame?(c.width=F.displayWidth,c.height=F.displayHeight):(c.width=F.width,c.height=F.height),c}this.allocateTextureUnit=A,this.resetTextureUnits=C,this.setTexture2D=U,this.setTexture2DArray=k,this.setTexture3D=B,this.setTextureCube=O,this.rebindTextures=Z,this.setupRenderTarget=Ne,this.updateRenderTargetMipmap=re,this.updateMultisampleRenderTarget=Ee,this.setupDepthRenderbuffer=ve,this.setupFrameBufferTexture=ye,this.useMultisampledRTT=_e}function i1(i,e){function t(n,s=Qn){let o;const r=ct.getTransfer(s);if(n===Xn)return i.UNSIGNED_BYTE;if(n===Fa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===za)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Tc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ec)return i.BYTE;if(n===Ac)return i.SHORT;if(n===Vs)return i.UNSIGNED_SHORT;if(n===La)return i.INT;if(n===Ei)return i.UNSIGNED_INT;if(n===In)return i.FLOAT;if(n===Ks)return i.HALF_FLOAT;if(n===Pc)return i.ALPHA;if(n===Cc)return i.RGB;if(n===Sn)return i.RGBA;if(n===Rc)return i.LUMINANCE;if(n===Ic)return i.LUMINANCE_ALPHA;if(n===ns)return i.DEPTH_COMPONENT;if(n===cs)return i.DEPTH_STENCIL;if(n===Na)return i.RED;if(n===Ua)return i.RED_INTEGER;if(n===Dc)return i.RG;if(n===ka)return i.RG_INTEGER;if(n===Oa)return i.RGBA_INTEGER;if(n===No||n===Uo||n===ko||n===Oo)if(r===xt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===No)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Uo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ko)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Oo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===No)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Uo)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ko)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Oo)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Qr||n===ea||n===ta||n===na)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===Qr)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ea)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ta)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===na)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ia||n===sa||n===oa)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(n===ia||n===sa)return r===xt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===oa)return r===xt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ra||n===aa||n===la||n===ca||n===ha||n===da||n===ua||n===fa||n===pa||n===ma||n===ga||n===xa||n===ya||n===_a)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(n===ra)return r===xt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===aa)return r===xt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===la)return r===xt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ca)return r===xt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ha)return r===xt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===da)return r===xt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ua)return r===xt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===fa)return r===xt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===pa)return r===xt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ma)return r===xt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ga)return r===xt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===xa)return r===xt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ya)return r===xt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===_a)return r===xt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Bo||n===va||n===wa)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(n===Bo)return r===xt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===va)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===wa)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Lc||n===ba||n===Ma||n===Sa)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(n===Bo)return o.COMPRESSED_RED_RGTC1_EXT;if(n===ba)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ma)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Sa)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ls?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const s1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,o1=`
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

}`;class r1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new Yt,o=e.properties.get(s);o.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new si({vertexShader:s1,fragmentShader:o1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new w(new Tn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class a1 extends Ci{constructor(e,t){super();const n=this;let s=null,o=1,r=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const x=new r1,m=t.getContextAttributes();let p=null,T=null;const E=[],S=[],z=new ue;let D=null;const R=new cn;R.viewport=new _t;const b=new cn;b.viewport=new _t;const v=[R,b],y=new Mu;let M=null,C=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let oe=E[q];return oe===void 0&&(oe=new Sr,E[q]=oe),oe.getTargetRaySpace()},this.getControllerGrip=function(q){let oe=E[q];return oe===void 0&&(oe=new Sr,E[q]=oe),oe.getGripSpace()},this.getHand=function(q){let oe=E[q];return oe===void 0&&(oe=new Sr,E[q]=oe),oe.getHandSpace()};function A(q){const oe=S.indexOf(q.inputSource);if(oe===-1)return;const ye=E[oe];ye!==void 0&&(ye.update(q.inputSource,q.frame,c||r),ye.dispatchEvent({type:q.type,data:q.inputSource}))}function I(){s.removeEventListener("select",A),s.removeEventListener("selectstart",A),s.removeEventListener("selectend",A),s.removeEventListener("squeeze",A),s.removeEventListener("squeezestart",A),s.removeEventListener("squeezeend",A),s.removeEventListener("end",I),s.removeEventListener("inputsourceschange",U);for(let q=0;q<E.length;q++){const oe=S[q];oe!==null&&(S[q]=null,E[q].disconnect(oe))}M=null,C=null,x.reset(),e.setRenderTarget(p),f=null,d=null,u=null,s=null,T=null,Oe.stop(),n.isPresenting=!1,e.setPixelRatio(D),e.setSize(z.width,z.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){o=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",A),s.addEventListener("selectstart",A),s.addEventListener("selectend",A),s.addEventListener("squeeze",A),s.addEventListener("squeezestart",A),s.addEventListener("squeezeend",A),s.addEventListener("end",I),s.addEventListener("inputsourceschange",U),m.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(z),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let ye=null,le=null,ne=null;m.depth&&(ne=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ye=m.stencil?cs:ns,le=m.stencil?ls:Ei);const ve={colorFormat:t.RGBA8,depthFormat:ne,scaleFactor:o};u=new XRWebGLBinding(s,t),d=u.createProjectionLayer(ve),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),T=new Ai(d.textureWidth,d.textureHeight,{format:Sn,type:Xn,depthTexture:new Xc(d.textureWidth,d.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,ye),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ye={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:o};f=new XRWebGLLayer(s,t,ye),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),T=new Ai(f.framebufferWidth,f.framebufferHeight,{format:Sn,type:Xn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await s.requestReferenceSpace(a),Oe.setContext(s),Oe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function U(q){for(let oe=0;oe<q.removed.length;oe++){const ye=q.removed[oe],le=S.indexOf(ye);le>=0&&(S[le]=null,E[le].disconnect(ye))}for(let oe=0;oe<q.added.length;oe++){const ye=q.added[oe];let le=S.indexOf(ye);if(le===-1){for(let ve=0;ve<E.length;ve++)if(ve>=S.length){S.push(ye),le=ve;break}else if(S[ve]===null){S[ve]=ye,le=ve;break}if(le===-1)break}const ne=E[le];ne&&ne.connect(ye)}}const k=new _,B=new _;function O(q,oe,ye){k.setFromMatrixPosition(oe.matrixWorld),B.setFromMatrixPosition(ye.matrixWorld);const le=k.distanceTo(B),ne=oe.projectionMatrix.elements,ve=ye.projectionMatrix.elements,Z=ne[14]/(ne[10]-1),Ne=ne[14]/(ne[10]+1),re=(ne[9]+1)/ne[5],te=(ne[9]-1)/ne[5],N=(ne[8]-1)/ne[0],Ee=(ve[8]+1)/ve[0],he=Z*N,_e=Z*Ee,fe=le/(-N+Ee),Ie=fe*-N;if(oe.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Ie),q.translateZ(fe),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),ne[10]===-1)q.projectionMatrix.copy(oe.projectionMatrix),q.projectionMatrixInverse.copy(oe.projectionMatrixInverse);else{const we=Z+fe,F=Ne+fe,P=he-Ie,W=_e+(le-Ie),j=re*Ne/F*we,ae=te*Ne/F*we;q.projectionMatrix.makePerspective(P,W,j,ae,we,F),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function X(q,oe){oe===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(oe.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let oe=q.near,ye=q.far;x.texture!==null&&(x.depthNear>0&&(oe=x.depthNear),x.depthFar>0&&(ye=x.depthFar)),y.near=b.near=R.near=oe,y.far=b.far=R.far=ye,(M!==y.near||C!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),M=y.near,C=y.far),R.layers.mask=q.layers.mask|2,b.layers.mask=q.layers.mask|4,y.layers.mask=R.layers.mask|b.layers.mask;const le=q.parent,ne=y.cameras;X(y,le);for(let ve=0;ve<ne.length;ve++)X(ne[ve],le);ne.length===2?O(y,R,b):y.projectionMatrix.copy(R.projectionMatrix),J(q,y,le)};function J(q,oe,ye){ye===null?q.matrix.copy(oe.matrixWorld):(q.matrix.copy(ye.matrixWorld),q.matrix.invert(),q.matrix.multiply(oe.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(oe.projectionMatrix),q.projectionMatrixInverse.copy(oe.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Hs*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(q){l=q,d!==null&&(d.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(y)};let ce=null;function pe(q,oe){if(h=oe.getViewerPose(c||r),g=oe,h!==null){const ye=h.views;f!==null&&(e.setRenderTargetFramebuffer(T,f.framebuffer),e.setRenderTarget(T));let le=!1;ye.length!==y.cameras.length&&(y.cameras.length=0,le=!0);for(let Z=0;Z<ye.length;Z++){const Ne=ye[Z];let re=null;if(f!==null)re=f.getViewport(Ne);else{const N=u.getViewSubImage(d,Ne);re=N.viewport,Z===0&&(e.setRenderTargetTextures(T,N.colorTexture,d.ignoreDepthValues?void 0:N.depthStencilTexture),e.setRenderTarget(T))}let te=v[Z];te===void 0&&(te=new cn,te.layers.enable(Z),te.viewport=new _t,v[Z]=te),te.matrix.fromArray(Ne.transform.matrix),te.matrix.decompose(te.position,te.quaternion,te.scale),te.projectionMatrix.fromArray(Ne.projectionMatrix),te.projectionMatrixInverse.copy(te.projectionMatrix).invert(),te.viewport.set(re.x,re.y,re.width,re.height),Z===0&&(y.matrix.copy(te.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),le===!0&&y.cameras.push(te)}const ne=s.enabledFeatures;if(ne&&ne.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&u){const Z=u.getDepthInformation(ye[0]);Z&&Z.isValid&&Z.texture&&x.init(e,Z,s.renderState)}}for(let ye=0;ye<E.length;ye++){const le=S[ye],ne=E[ye];le!==null&&ne!==void 0&&ne.update(le,oe,c||r)}ce&&ce(q,oe),oe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:oe}),g=null}const Oe=new th;Oe.setAnimationLoop(pe),this.setAnimationLoop=function(q){ce=q},this.dispose=function(){}}}const mi=new Dn,l1=new mt;function c1(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Gc(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,T,E,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?o(m,p):p.isMeshToonMaterial?(o(m,p),u(m,p)):p.isMeshPhongMaterial?(o(m,p),h(m,p)):p.isMeshStandardMaterial?(o(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,S)):p.isMeshMatcapMaterial?(o(m,p),g(m,p)):p.isMeshDepthMaterial?o(m,p):p.isMeshDistanceMaterial?(o(m,p),x(m,p)):p.isMeshNormalMaterial?o(m,p):p.isLineBasicMaterial?(r(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,T,E):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function o(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===jt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===jt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const T=e.get(p),E=T.envMap,S=T.envMapRotation;E&&(m.envMap.value=E,mi.copy(S),mi.x*=-1,mi.y*=-1,mi.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(mi.y*=-1,mi.z*=-1),m.envMapRotation.value.setFromMatrix4(l1.makeRotationFromEuler(mi)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function r(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,T,E){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*T,m.scale.value=E*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,T){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===jt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const T=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function h1(i,e,t,n){let s={},o={},r=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,E){const S=E.program;n.uniformBlockBinding(T,S)}function c(T,E){let S=s[T.id];S===void 0&&(g(T),S=h(T),s[T.id]=S,T.addEventListener("dispose",m));const z=E.program;n.updateUBOMapping(T,z);const D=e.render.frame;o[T.id]!==D&&(d(T),o[T.id]=D)}function h(T){const E=u();T.__bindingPointIndex=E;const S=i.createBuffer(),z=T.__size,D=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,z,D),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,S),S}function u(){for(let T=0;T<a;T++)if(r.indexOf(T)===-1)return r.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(T){const E=s[T.id],S=T.uniforms,z=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let D=0,R=S.length;D<R;D++){const b=Array.isArray(S[D])?S[D]:[S[D]];for(let v=0,y=b.length;v<y;v++){const M=b[v];if(f(M,D,v,z)===!0){const C=M.__offset,A=Array.isArray(M.value)?M.value:[M.value];let I=0;for(let U=0;U<A.length;U++){const k=A[U],B=x(k);typeof k=="number"||typeof k=="boolean"?(M.__data[0]=k,i.bufferSubData(i.UNIFORM_BUFFER,C+I,M.__data)):k.isMatrix3?(M.__data[0]=k.elements[0],M.__data[1]=k.elements[1],M.__data[2]=k.elements[2],M.__data[3]=0,M.__data[4]=k.elements[3],M.__data[5]=k.elements[4],M.__data[6]=k.elements[5],M.__data[7]=0,M.__data[8]=k.elements[6],M.__data[9]=k.elements[7],M.__data[10]=k.elements[8],M.__data[11]=0):(k.toArray(M.__data,I),I+=B.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,C,M.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(T,E,S,z){const D=T.value,R=E+"_"+S;if(z[R]===void 0)return typeof D=="number"||typeof D=="boolean"?z[R]=D:z[R]=D.clone(),!0;{const b=z[R];if(typeof D=="number"||typeof D=="boolean"){if(b!==D)return z[R]=D,!0}else if(b.equals(D)===!1)return b.copy(D),!0}return!1}function g(T){const E=T.uniforms;let S=0;const z=16;for(let R=0,b=E.length;R<b;R++){const v=Array.isArray(E[R])?E[R]:[E[R]];for(let y=0,M=v.length;y<M;y++){const C=v[y],A=Array.isArray(C.value)?C.value:[C.value];for(let I=0,U=A.length;I<U;I++){const k=A[I],B=x(k),O=S%z,X=O%B.boundary,J=O+X;S+=X,J!==0&&z-J<B.storage&&(S+=z-J),C.__data=new Float32Array(B.storage/Float32Array.BYTES_PER_ELEMENT),C.__offset=S,S+=B.storage}}}const D=S%z;return D>0&&(S+=z-D),T.__size=S,T.__cache={},this}function x(T){const E={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(E.boundary=4,E.storage=4):T.isVector2?(E.boundary=8,E.storage=8):T.isVector3||T.isColor?(E.boundary=16,E.storage=12):T.isVector4?(E.boundary=16,E.storage=16):T.isMatrix3?(E.boundary=48,E.storage=48):T.isMatrix4?(E.boundary=64,E.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),E}function m(T){const E=T.target;E.removeEventListener("dispose",m);const S=r.indexOf(E.__bindingPointIndex);r.splice(S,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete o[E.id]}function p(){for(const T in s)i.deleteBuffer(s[T]);r=[],s={},o={}}return{bind:l,update:c,dispose:p}}class d1{constructor(e={}){const{canvas:t=cd(),context:n=null,depth:s=!0,stencil:o=!1,alpha:r=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=r;const g=new Uint32Array(4),x=new Int32Array(4);let m=null,p=null;const T=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=At,this.toneMapping=ni,this.toneMappingExposure=1;const S=this;let z=!1,D=0,R=0,b=null,v=-1,y=null;const M=new _t,C=new _t;let A=null;const I=new st(0);let U=0,k=t.width,B=t.height,O=1,X=null,J=null;const ce=new _t(0,0,k,B),pe=new _t(0,0,k,B);let Oe=!1;const q=new Ha;let oe=!1,ye=!1;this.transmissionResolutionScale=1;const le=new mt,ne=new mt,ve=new _,Z=new _t,Ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let re=!1;function te(){return b===null?O:1}let N=n;function Ee(L,H){return t.getContext(L,H)}try{const L={alpha:!0,depth:s,stencil:o,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Da}`),t.addEventListener("webglcontextlost",de,!1),t.addEventListener("webglcontextrestored",Pe,!1),t.addEventListener("webglcontextcreationerror",Te,!1),N===null){const H="webgl2";if(N=Ee(H,L),N===null)throw Ee(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(L){throw console.error("THREE.WebGLRenderer: "+L.message),L}let he,_e,fe,Ie,we,F,P,W,j,ae,ie,Be,be,Re,nt,ge,Le,We,Xe,Fe,it,$e,pt,V;function Me(){he=new w0(N),he.init(),$e=new i1(N,he),_e=new p0(N,he,e,$e),fe=new t1(N,he),_e.reverseDepthBuffer&&d&&fe.buffers.depth.setReversed(!0),Ie=new S0(N),we=new Vm,F=new n1(N,he,fe,we,_e,$e,Ie),P=new g0(S),W=new v0(S),j=new Cu(N),pt=new u0(N,j),ae=new b0(N,j,Ie,pt),ie=new A0(N,ae,j,Ie),Xe=new E0(N,_e,F),ge=new m0(we),Be=new Gm(S,P,W,he,_e,pt,ge),be=new c1(S,we),Re=new Wm,nt=new $m(he),We=new d0(S,P,W,fe,ie,f,l),Le=new Qm(S,ie,_e),V=new h1(N,Ie,_e,fe),Fe=new f0(N,he,Ie),it=new M0(N,he,Ie),Ie.programs=Be.programs,S.capabilities=_e,S.extensions=he,S.properties=we,S.renderLists=Re,S.shadowMap=Le,S.state=fe,S.info=Ie}Me();const ee=new a1(S,N);this.xr=ee,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const L=he.get("WEBGL_lose_context");L&&L.loseContext()},this.forceContextRestore=function(){const L=he.get("WEBGL_lose_context");L&&L.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(L){L!==void 0&&(O=L,this.setSize(k,B,!1))},this.getSize=function(L){return L.set(k,B)},this.setSize=function(L,H,K=!0){if(ee.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=L,B=H,t.width=Math.floor(L*O),t.height=Math.floor(H*O),K===!0&&(t.style.width=L+"px",t.style.height=H+"px"),this.setViewport(0,0,L,H)},this.getDrawingBufferSize=function(L){return L.set(k*O,B*O).floor()},this.setDrawingBufferSize=function(L,H,K){k=L,B=H,O=K,t.width=Math.floor(L*K),t.height=Math.floor(H*K),this.setViewport(0,0,L,H)},this.getCurrentViewport=function(L){return L.copy(M)},this.getViewport=function(L){return L.copy(ce)},this.setViewport=function(L,H,K,Q){L.isVector4?ce.set(L.x,L.y,L.z,L.w):ce.set(L,H,K,Q),fe.viewport(M.copy(ce).multiplyScalar(O).round())},this.getScissor=function(L){return L.copy(pe)},this.setScissor=function(L,H,K,Q){L.isVector4?pe.set(L.x,L.y,L.z,L.w):pe.set(L,H,K,Q),fe.scissor(C.copy(pe).multiplyScalar(O).round())},this.getScissorTest=function(){return Oe},this.setScissorTest=function(L){fe.setScissorTest(Oe=L)},this.setOpaqueSort=function(L){X=L},this.setTransparentSort=function(L){J=L},this.getClearColor=function(L){return L.copy(We.getClearColor())},this.setClearColor=function(){We.setClearColor(...arguments)},this.getClearAlpha=function(){return We.getClearAlpha()},this.setClearAlpha=function(){We.setClearAlpha(...arguments)},this.clear=function(L=!0,H=!0,K=!0){let Q=0;if(L){let Y=!1;if(b!==null){const xe=b.texture.format;Y=xe===Oa||xe===ka||xe===Ua}if(Y){const xe=b.texture.type,Ce=xe===Xn||xe===Ei||xe===Vs||xe===ls||xe===Fa||xe===za,Ue=We.getClearColor(),ke=We.getClearAlpha(),Ye=Ue.r,qe=Ue.g,Ve=Ue.b;Ce?(g[0]=Ye,g[1]=qe,g[2]=Ve,g[3]=ke,N.clearBufferuiv(N.COLOR,0,g)):(x[0]=Ye,x[1]=qe,x[2]=Ve,x[3]=ke,N.clearBufferiv(N.COLOR,0,x))}else Q|=N.COLOR_BUFFER_BIT}H&&(Q|=N.DEPTH_BUFFER_BIT),K&&(Q|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",de,!1),t.removeEventListener("webglcontextrestored",Pe,!1),t.removeEventListener("webglcontextcreationerror",Te,!1),We.dispose(),Re.dispose(),nt.dispose(),we.dispose(),P.dispose(),W.dispose(),ie.dispose(),pt.dispose(),V.dispose(),Be.dispose(),ee.dispose(),ee.removeEventListener("sessionstart",xs),ee.removeEventListener("sessionend",ys),Pn.stop()};function de(L){L.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),z=!0}function Pe(){console.log("THREE.WebGLRenderer: Context Restored."),z=!1;const L=Ie.autoReset,H=Le.enabled,K=Le.autoUpdate,Q=Le.needsUpdate,Y=Le.type;Me(),Ie.autoReset=L,Le.enabled=H,Le.autoUpdate=K,Le.needsUpdate=Q,Le.type=Y}function Te(L){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",L.statusMessage)}function Ze(L){const H=L.target;H.removeEventListener("dispose",Ze),Mt(H)}function Mt(L){Ft(L),we.remove(L)}function Ft(L){const H=we.get(L).programs;H!==void 0&&(H.forEach(function(K){Be.releaseProgram(K)}),L.isShaderMaterial&&Be.releaseShaderCache(L))}this.renderBufferDirect=function(L,H,K,Q,Y,xe){H===null&&(H=Ne);const Ce=Y.isMesh&&Y.matrixWorld.determinant()<0,Ue=$s(L,H,K,Q,Y);fe.setMaterial(Q,Ce);let ke=K.index,Ye=1;if(Q.wireframe===!0){if(ke=ae.getWireframeAttribute(K),ke===void 0)return;Ye=2}const qe=K.drawRange,Ve=K.attributes.position;let rt=qe.start*Ye,ut=(qe.start+qe.count)*Ye;xe!==null&&(rt=Math.max(rt,xe.start*Ye),ut=Math.min(ut,(xe.start+xe.count)*Ye)),ke!==null?(rt=Math.max(rt,0),ut=Math.min(ut,ke.count)):Ve!=null&&(rt=Math.max(rt,0),ut=Math.min(ut,Ve.count));const Dt=ut-rt;if(Dt<0||Dt===1/0)return;pt.setup(Y,Q,Ue,K,ke);let Ct,lt=Fe;if(ke!==null&&(Ct=j.get(ke),lt=it,lt.setIndex(Ct)),Y.isMesh)Q.wireframe===!0?(fe.setLineWidth(Q.wireframeLinewidth*te()),lt.setMode(N.LINES)):lt.setMode(N.TRIANGLES);else if(Y.isLine){let He=Q.linewidth;He===void 0&&(He=1),fe.setLineWidth(He*te()),Y.isLineSegments?lt.setMode(N.LINES):Y.isLineLoop?lt.setMode(N.LINE_LOOP):lt.setMode(N.LINE_STRIP)}else Y.isPoints?lt.setMode(N.POINTS):Y.isSprite&&lt.setMode(N.TRIANGLES);if(Y.isBatchedMesh)if(Y._multiDrawInstances!==null)yi("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),lt.renderMultiDrawInstances(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount,Y._multiDrawInstances);else if(he.get("WEBGL_multi_draw"))lt.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{const He=Y._multiDrawStarts,Gt=Y._multiDrawCounts,ft=Y._multiDrawCount,vn=ke?j.get(ke).bytesPerElement:1,Di=we.get(Q).currentProgram.getUniforms();for(let rn=0;rn<ft;rn++)Di.setValue(N,"_gl_DrawID",rn),lt.render(He[rn]/vn,Gt[rn])}else if(Y.isInstancedMesh)lt.renderInstances(rt,Dt,Y.count);else if(K.isInstancedBufferGeometry){const He=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Gt=Math.min(K.instanceCount,He);lt.renderInstances(rt,Dt,Gt)}else lt.render(rt,Dt)};function at(L,H,K){L.transparent===!0&&L.side===Rt&&L.forceSinglePass===!1?(L.side=jt,L.needsUpdate=!0,li(L,H,K),L.side=Wn,L.needsUpdate=!0,li(L,H,K),L.side=Rt):li(L,H,K)}this.compile=function(L,H,K=null){K===null&&(K=L),p=nt.get(K),p.init(H),E.push(p),K.traverseVisible(function(Y){Y.isLight&&Y.layers.test(H.layers)&&(p.pushLight(Y),Y.castShadow&&p.pushShadow(Y))}),L!==K&&L.traverseVisible(function(Y){Y.isLight&&Y.layers.test(H.layers)&&(p.pushLight(Y),Y.castShadow&&p.pushShadow(Y))}),p.setupLights();const Q=new Set;return L.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;const xe=Y.material;if(xe)if(Array.isArray(xe))for(let Ce=0;Ce<xe.length;Ce++){const Ue=xe[Ce];at(Ue,K,Y),Q.add(Ue)}else at(xe,K,Y),Q.add(xe)}),p=E.pop(),Q},this.compileAsync=function(L,H,K=null){const Q=this.compile(L,H,K);return new Promise(Y=>{function xe(){if(Q.forEach(function(Ce){we.get(Ce).currentProgram.isReady()&&Q.delete(Ce)}),Q.size===0){Y(L);return}setTimeout(xe,10)}he.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let Jt=null;function un(L){Jt&&Jt(L)}function xs(){Pn.stop()}function ys(){Pn.start()}const Pn=new th;Pn.setAnimationLoop(un),typeof self<"u"&&Pn.setContext(self),this.setAnimationLoop=function(L){Jt=L,ee.setAnimationLoop(L),L===null?Pn.stop():Pn.start()},ee.addEventListener("sessionstart",xs),ee.addEventListener("sessionend",ys),this.render=function(L,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(z===!0)return;if(L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),ee.enabled===!0&&ee.isPresenting===!0&&(ee.cameraAutoUpdate===!0&&ee.updateCamera(H),H=ee.getCamera()),L.isScene===!0&&L.onBeforeRender(S,L,H,b),p=nt.get(L,E.length),p.init(H),E.push(p),ne.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),q.setFromProjectionMatrix(ne),ye=this.localClippingEnabled,oe=ge.init(this.clippingPlanes,ye),m=Re.get(L,T.length),m.init(),T.push(m),ee.enabled===!0&&ee.isPresenting===!0){const xe=S.xr.getDepthSensingMesh();xe!==null&&Ii(xe,H,-1/0,S.sortObjects)}Ii(L,H,0,S.sortObjects),m.finish(),S.sortObjects===!0&&m.sort(X,J),re=ee.enabled===!1||ee.isPresenting===!1||ee.hasDepthSensing()===!1,re&&We.addToRenderList(m,L),this.info.render.frame++,oe===!0&&ge.beginShadows();const K=p.state.shadowsArray;Le.render(K,L,H),oe===!0&&ge.endShadows(),this.info.autoReset===!0&&this.info.reset();const Q=m.opaque,Y=m.transmissive;if(p.setupLights(),H.isArrayCamera){const xe=H.cameras;if(Y.length>0)for(let Ce=0,Ue=xe.length;Ce<Ue;Ce++){const ke=xe[Ce];vs(Q,Y,L,ke)}re&&We.render(L);for(let Ce=0,Ue=xe.length;Ce<Ue;Ce++){const ke=xe[Ce];_s(m,L,ke,ke.viewport)}}else Y.length>0&&vs(Q,Y,L,H),re&&We.render(L),_s(m,L,H);b!==null&&R===0&&(F.updateMultisampleRenderTarget(b),F.updateRenderTargetMipmap(b)),L.isScene===!0&&L.onAfterRender(S,L,H),pt.resetDefaultState(),v=-1,y=null,E.pop(),E.length>0?(p=E[E.length-1],oe===!0&&ge.setGlobalState(S.clippingPlanes,p.state.camera)):p=null,T.pop(),T.length>0?m=T[T.length-1]:m=null};function Ii(L,H,K,Q){if(L.visible===!1)return;if(L.layers.test(H.layers)){if(L.isGroup)K=L.renderOrder;else if(L.isLOD)L.autoUpdate===!0&&L.update(H);else if(L.isLight)p.pushLight(L),L.castShadow&&p.pushShadow(L);else if(L.isSprite){if(!L.frustumCulled||q.intersectsSprite(L)){Q&&Z.setFromMatrixPosition(L.matrixWorld).applyMatrix4(ne);const Ce=ie.update(L),Ue=L.material;Ue.visible&&m.push(L,Ce,Ue,K,Z.z,null)}}else if((L.isMesh||L.isLine||L.isPoints)&&(!L.frustumCulled||q.intersectsObject(L))){const Ce=ie.update(L),Ue=L.material;if(Q&&(L.boundingSphere!==void 0?(L.boundingSphere===null&&L.computeBoundingSphere(),Z.copy(L.boundingSphere.center)):(Ce.boundingSphere===null&&Ce.computeBoundingSphere(),Z.copy(Ce.boundingSphere.center)),Z.applyMatrix4(L.matrixWorld).applyMatrix4(ne)),Array.isArray(Ue)){const ke=Ce.groups;for(let Ye=0,qe=ke.length;Ye<qe;Ye++){const Ve=ke[Ye],rt=Ue[Ve.materialIndex];rt&&rt.visible&&m.push(L,Ce,rt,K,Z.z,Ve)}}else Ue.visible&&m.push(L,Ce,Ue,K,Z.z,null)}}const xe=L.children;for(let Ce=0,Ue=xe.length;Ce<Ue;Ce++)Ii(xe[Ce],H,K,Q)}function _s(L,H,K,Q){const Y=L.opaque,xe=L.transmissive,Ce=L.transparent;p.setupLightsView(K),oe===!0&&ge.setGlobalState(S.clippingPlanes,K),Q&&fe.viewport(M.copy(Q)),Y.length>0&&ai(Y,H,K),xe.length>0&&ai(xe,H,K),Ce.length>0&&ai(Ce,H,K),fe.buffers.depth.setTest(!0),fe.buffers.depth.setMask(!0),fe.buffers.color.setMask(!0),fe.setPolygonOffset(!1)}function vs(L,H,K,Q){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[Q.id]===void 0&&(p.state.transmissionRenderTarget[Q.id]=new Ai(1,1,{generateMipmaps:!0,type:he.has("EXT_color_buffer_half_float")||he.has("EXT_color_buffer_float")?Ks:Xn,minFilter:Mi,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ct.workingColorSpace}));const xe=p.state.transmissionRenderTarget[Q.id],Ce=Q.viewport||M;xe.setSize(Ce.z*S.transmissionResolutionScale,Ce.w*S.transmissionResolutionScale);const Ue=S.getRenderTarget();S.setRenderTarget(xe),S.getClearColor(I),U=S.getClearAlpha(),U<1&&S.setClearColor(16777215,.5),S.clear(),re&&We.render(K);const ke=S.toneMapping;S.toneMapping=ni;const Ye=Q.viewport;if(Q.viewport!==void 0&&(Q.viewport=void 0),p.setupLightsView(Q),oe===!0&&ge.setGlobalState(S.clippingPlanes,Q),ai(L,K,Q),F.updateMultisampleRenderTarget(xe),F.updateRenderTargetMipmap(xe),he.has("WEBGL_multisampled_render_to_texture")===!1){let qe=!1;for(let Ve=0,rt=H.length;Ve<rt;Ve++){const ut=H[Ve],Dt=ut.object,Ct=ut.geometry,lt=ut.material,He=ut.group;if(lt.side===Rt&&Dt.layers.test(Q.layers)){const Gt=lt.side;lt.side=jt,lt.needsUpdate=!0,ws(Dt,K,Q,Ct,lt,He),lt.side=Gt,lt.needsUpdate=!0,qe=!0}}qe===!0&&(F.updateMultisampleRenderTarget(xe),F.updateRenderTargetMipmap(xe))}S.setRenderTarget(Ue),S.setClearColor(I,U),Ye!==void 0&&(Q.viewport=Ye),S.toneMapping=ke}function ai(L,H,K){const Q=H.isScene===!0?H.overrideMaterial:null;for(let Y=0,xe=L.length;Y<xe;Y++){const Ce=L[Y],Ue=Ce.object,ke=Ce.geometry,Ye=Q===null?Ce.material:Q,qe=Ce.group;Ue.layers.test(K.layers)&&ws(Ue,H,K,ke,Ye,qe)}}function ws(L,H,K,Q,Y,xe){L.onBeforeRender(S,H,K,Q,Y,xe),L.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,L.matrixWorld),L.normalMatrix.getNormalMatrix(L.modelViewMatrix),Y.onBeforeRender(S,H,K,Q,L,xe),Y.transparent===!0&&Y.side===Rt&&Y.forceSinglePass===!1?(Y.side=jt,Y.needsUpdate=!0,S.renderBufferDirect(K,H,Q,Y,L,xe),Y.side=Wn,Y.needsUpdate=!0,S.renderBufferDirect(K,H,Q,Y,L,xe),Y.side=Rt):S.renderBufferDirect(K,H,Q,Y,L,xe),L.onAfterRender(S,H,K,Q,Y,xe)}function li(L,H,K){H.isScene!==!0&&(H=Ne);const Q=we.get(L),Y=p.state.lights,xe=p.state.shadowsArray,Ce=Y.state.version,Ue=Be.getParameters(L,Y.state,xe,H,K),ke=Be.getProgramCacheKey(Ue);let Ye=Q.programs;Q.environment=L.isMeshStandardMaterial?H.environment:null,Q.fog=H.fog,Q.envMap=(L.isMeshStandardMaterial?W:P).get(L.envMap||Q.environment),Q.envMapRotation=Q.environment!==null&&L.envMap===null?H.environmentRotation:L.envMapRotation,Ye===void 0&&(L.addEventListener("dispose",Ze),Ye=new Map,Q.programs=Ye);let qe=Ye.get(ke);if(qe!==void 0){if(Q.currentProgram===qe&&Q.lightsStateVersion===Ce)return Ms(L,Ue),qe}else Ue.uniforms=Be.getUniforms(L),L.onBeforeCompile(Ue,S),qe=Be.acquireProgram(Ue,ke),Ye.set(ke,qe),Q.uniforms=Ue.uniforms;const Ve=Q.uniforms;return(!L.isShaderMaterial&&!L.isRawShaderMaterial||L.clipping===!0)&&(Ve.clippingPlanes=ge.uniform),Ms(L,Ue),Q.needsLights=Js(L),Q.lightsStateVersion=Ce,Q.needsLights&&(Ve.ambientLightColor.value=Y.state.ambient,Ve.lightProbe.value=Y.state.probe,Ve.directionalLights.value=Y.state.directional,Ve.directionalLightShadows.value=Y.state.directionalShadow,Ve.spotLights.value=Y.state.spot,Ve.spotLightShadows.value=Y.state.spotShadow,Ve.rectAreaLights.value=Y.state.rectArea,Ve.ltc_1.value=Y.state.rectAreaLTC1,Ve.ltc_2.value=Y.state.rectAreaLTC2,Ve.pointLights.value=Y.state.point,Ve.pointLightShadows.value=Y.state.pointShadow,Ve.hemisphereLights.value=Y.state.hemi,Ve.directionalShadowMap.value=Y.state.directionalShadowMap,Ve.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Ve.spotShadowMap.value=Y.state.spotShadowMap,Ve.spotLightMatrix.value=Y.state.spotLightMatrix,Ve.spotLightMap.value=Y.state.spotLightMap,Ve.pointShadowMap.value=Y.state.pointShadowMap,Ve.pointShadowMatrix.value=Y.state.pointShadowMatrix),Q.currentProgram=qe,Q.uniformsList=null,qe}function bs(L){if(L.uniformsList===null){const H=L.currentProgram.getUniforms();L.uniformsList=Vo.seqWithValue(H.seq,L.uniforms)}return L.uniformsList}function Ms(L,H){const K=we.get(L);K.outputColorSpace=H.outputColorSpace,K.batching=H.batching,K.batchingColor=H.batchingColor,K.instancing=H.instancing,K.instancingColor=H.instancingColor,K.instancingMorph=H.instancingMorph,K.skinning=H.skinning,K.morphTargets=H.morphTargets,K.morphNormals=H.morphNormals,K.morphColors=H.morphColors,K.morphTargetsCount=H.morphTargetsCount,K.numClippingPlanes=H.numClippingPlanes,K.numIntersection=H.numClipIntersection,K.vertexAlphas=H.vertexAlphas,K.vertexTangents=H.vertexTangents,K.toneMapping=H.toneMapping}function $s(L,H,K,Q,Y){H.isScene!==!0&&(H=Ne),F.resetTextureUnits();const xe=H.fog,Ce=Q.isMeshStandardMaterial?H.environment:null,Ue=b===null?S.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:hs,ke=(Q.isMeshStandardMaterial?W:P).get(Q.envMap||Ce),Ye=Q.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,qe=!!K.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),Ve=!!K.morphAttributes.position,rt=!!K.morphAttributes.normal,ut=!!K.morphAttributes.color;let Dt=ni;Q.toneMapped&&(b===null||b.isXRRenderTarget===!0)&&(Dt=S.toneMapping);const Ct=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,lt=Ct!==void 0?Ct.length:0,He=we.get(Q),Gt=p.state.lights;if(oe===!0&&(ye===!0||L!==y)){const Zt=L===y&&Q.id===v;ge.setState(Q,L,Zt)}let ft=!1;Q.version===He.__version?(He.needsLights&&He.lightsStateVersion!==Gt.state.version||He.outputColorSpace!==Ue||Y.isBatchedMesh&&He.batching===!1||!Y.isBatchedMesh&&He.batching===!0||Y.isBatchedMesh&&He.batchingColor===!0&&Y.colorTexture===null||Y.isBatchedMesh&&He.batchingColor===!1&&Y.colorTexture!==null||Y.isInstancedMesh&&He.instancing===!1||!Y.isInstancedMesh&&He.instancing===!0||Y.isSkinnedMesh&&He.skinning===!1||!Y.isSkinnedMesh&&He.skinning===!0||Y.isInstancedMesh&&He.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&He.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&He.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&He.instancingMorph===!1&&Y.morphTexture!==null||He.envMap!==ke||Q.fog===!0&&He.fog!==xe||He.numClippingPlanes!==void 0&&(He.numClippingPlanes!==ge.numPlanes||He.numIntersection!==ge.numIntersection)||He.vertexAlphas!==Ye||He.vertexTangents!==qe||He.morphTargets!==Ve||He.morphNormals!==rt||He.morphColors!==ut||He.toneMapping!==Dt||He.morphTargetsCount!==lt)&&(ft=!0):(ft=!0,He.__version=Q.version);let vn=He.currentProgram;ft===!0&&(vn=li(Q,H,Y));let Di=!1,rn=!1,Ss=!1;const St=vn.getUniforms(),fn=He.uniforms;if(fe.useProgram(vn.program)&&(Di=!0,rn=!0,Ss=!0),Q.id!==v&&(v=Q.id,rn=!0),Di||y!==L){fe.buffers.depth.getReversed()?(le.copy(L.projectionMatrix),dd(le),ud(le),St.setValue(N,"projectionMatrix",le)):St.setValue(N,"projectionMatrix",L.projectionMatrix),St.setValue(N,"viewMatrix",L.matrixWorldInverse);const Qt=St.map.cameraPosition;Qt!==void 0&&Qt.setValue(N,ve.setFromMatrixPosition(L.matrixWorld)),_e.logarithmicDepthBuffer&&St.setValue(N,"logDepthBufFC",2/(Math.log(L.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&St.setValue(N,"isOrthographic",L.isOrthographicCamera===!0),y!==L&&(y=L,rn=!0,Ss=!0)}if(Y.isSkinnedMesh){St.setOptional(N,Y,"bindMatrix"),St.setOptional(N,Y,"bindMatrixInverse");const Zt=Y.skeleton;Zt&&(Zt.boneTexture===null&&Zt.computeBoneTexture(),St.setValue(N,"boneTexture",Zt.boneTexture,F))}Y.isBatchedMesh&&(St.setOptional(N,Y,"batchingTexture"),St.setValue(N,"batchingTexture",Y._matricesTexture,F),St.setOptional(N,Y,"batchingIdTexture"),St.setValue(N,"batchingIdTexture",Y._indirectTexture,F),St.setOptional(N,Y,"batchingColorTexture"),Y._colorsTexture!==null&&St.setValue(N,"batchingColorTexture",Y._colorsTexture,F));const pn=K.morphAttributes;if((pn.position!==void 0||pn.normal!==void 0||pn.color!==void 0)&&Xe.update(Y,K,vn),(rn||He.receiveShadow!==Y.receiveShadow)&&(He.receiveShadow=Y.receiveShadow,St.setValue(N,"receiveShadow",Y.receiveShadow)),Q.isMeshGouraudMaterial&&Q.envMap!==null&&(fn.envMap.value=ke,fn.flipEnvMap.value=ke.isCubeTexture&&ke.isRenderTargetTexture===!1?-1:1),Q.isMeshStandardMaterial&&Q.envMap===null&&H.environment!==null&&(fn.envMapIntensity.value=H.environmentIntensity),rn&&(St.setValue(N,"toneMappingExposure",S.toneMappingExposure),He.needsLights&&js(fn,Ss),xe&&Q.fog===!0&&be.refreshFogUniforms(fn,xe),be.refreshMaterialUniforms(fn,Q,O,B,p.state.transmissionRenderTarget[L.id]),Vo.upload(N,bs(He),fn,F)),Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(Vo.upload(N,bs(He),fn,F),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&St.setValue(N,"center",Y.center),St.setValue(N,"modelViewMatrix",Y.modelViewMatrix),St.setValue(N,"normalMatrix",Y.normalMatrix),St.setValue(N,"modelMatrix",Y.matrixWorld),Q.isShaderMaterial||Q.isRawShaderMaterial){const Zt=Q.uniformsGroups;for(let Qt=0,ir=Zt.length;Qt<ir;Qt++){const ci=Zt[Qt];V.update(ci,vn),V.bind(ci,vn)}}return vn}function js(L,H){L.ambientLightColor.needsUpdate=H,L.lightProbe.needsUpdate=H,L.directionalLights.needsUpdate=H,L.directionalLightShadows.needsUpdate=H,L.pointLights.needsUpdate=H,L.pointLightShadows.needsUpdate=H,L.spotLights.needsUpdate=H,L.spotLightShadows.needsUpdate=H,L.rectAreaLights.needsUpdate=H,L.hemisphereLights.needsUpdate=H}function Js(L){return L.isMeshLambertMaterial||L.isMeshToonMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isShadowMaterial||L.isShaderMaterial&&L.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(L,H,K){we.get(L.texture).__webglTexture=H,we.get(L.depthTexture).__webglTexture=K;const Q=we.get(L);Q.__hasExternalTextures=!0,Q.__autoAllocateDepthBuffer=K===void 0,Q.__autoAllocateDepthBuffer||he.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(L,H){const K=we.get(L);K.__webglFramebuffer=H,K.__useDefaultFramebuffer=H===void 0};const Qs=N.createFramebuffer();this.setRenderTarget=function(L,H=0,K=0){b=L,D=H,R=K;let Q=!0,Y=null,xe=!1,Ce=!1;if(L){const ke=we.get(L);if(ke.__useDefaultFramebuffer!==void 0)fe.bindFramebuffer(N.FRAMEBUFFER,null),Q=!1;else if(ke.__webglFramebuffer===void 0)F.setupRenderTarget(L);else if(ke.__hasExternalTextures)F.rebindTextures(L,we.get(L.texture).__webglTexture,we.get(L.depthTexture).__webglTexture);else if(L.depthBuffer){const Ve=L.depthTexture;if(ke.__boundDepthTexture!==Ve){if(Ve!==null&&we.has(Ve)&&(L.width!==Ve.image.width||L.height!==Ve.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");F.setupDepthRenderbuffer(L)}}const Ye=L.texture;(Ye.isData3DTexture||Ye.isDataArrayTexture||Ye.isCompressedArrayTexture)&&(Ce=!0);const qe=we.get(L).__webglFramebuffer;L.isWebGLCubeRenderTarget?(Array.isArray(qe[H])?Y=qe[H][K]:Y=qe[H],xe=!0):L.samples>0&&F.useMultisampledRTT(L)===!1?Y=we.get(L).__webglMultisampledFramebuffer:Array.isArray(qe)?Y=qe[K]:Y=qe,M.copy(L.viewport),C.copy(L.scissor),A=L.scissorTest}else M.copy(ce).multiplyScalar(O).floor(),C.copy(pe).multiplyScalar(O).floor(),A=Oe;if(K!==0&&(Y=Qs),fe.bindFramebuffer(N.FRAMEBUFFER,Y)&&Q&&fe.drawBuffers(L,Y),fe.viewport(M),fe.scissor(C),fe.setScissorTest(A),xe){const ke=we.get(L.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+H,ke.__webglTexture,K)}else if(Ce){const ke=we.get(L.texture),Ye=H;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,ke.__webglTexture,K,Ye)}else if(L!==null&&K!==0){const ke=we.get(L.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ke.__webglTexture,K)}v=-1},this.readRenderTargetPixels=function(L,H,K,Q,Y,xe,Ce){if(!(L&&L.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ue=we.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&Ce!==void 0&&(Ue=Ue[Ce]),Ue){fe.bindFramebuffer(N.FRAMEBUFFER,Ue);try{const ke=L.texture,Ye=ke.format,qe=ke.type;if(!_e.textureFormatReadable(Ye)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_e.textureTypeReadable(qe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=L.width-Q&&K>=0&&K<=L.height-Y&&N.readPixels(H,K,Q,Y,$e.convert(Ye),$e.convert(qe),xe)}finally{const ke=b!==null?we.get(b).__webglFramebuffer:null;fe.bindFramebuffer(N.FRAMEBUFFER,ke)}}},this.readRenderTargetPixelsAsync=async function(L,H,K,Q,Y,xe,Ce){if(!(L&&L.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ue=we.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&Ce!==void 0&&(Ue=Ue[Ce]),Ue){const ke=L.texture,Ye=ke.format,qe=ke.type;if(!_e.textureFormatReadable(Ye))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_e.textureTypeReadable(qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(H>=0&&H<=L.width-Q&&K>=0&&K<=L.height-Y){fe.bindFramebuffer(N.FRAMEBUFFER,Ue);const Ve=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Ve),N.bufferData(N.PIXEL_PACK_BUFFER,xe.byteLength,N.STREAM_READ),N.readPixels(H,K,Q,Y,$e.convert(Ye),$e.convert(qe),0);const rt=b!==null?we.get(b).__webglFramebuffer:null;fe.bindFramebuffer(N.FRAMEBUFFER,rt);const ut=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await hd(N,ut,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Ve),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,xe),N.deleteBuffer(Ve),N.deleteSync(ut),xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(L,H=null,K=0){L.isTexture!==!0&&(yi("WebGLRenderer: copyFramebufferToTexture function signature has changed."),H=arguments[0]||null,L=arguments[1]);const Q=Math.pow(2,-K),Y=Math.floor(L.image.width*Q),xe=Math.floor(L.image.height*Q),Ce=H!==null?H.x:0,Ue=H!==null?H.y:0;F.setTexture2D(L,0),N.copyTexSubImage2D(N.TEXTURE_2D,K,0,0,Ce,Ue,Y,xe),fe.unbindTexture()};const eo=N.createFramebuffer(),Ja=N.createFramebuffer();this.copyTextureToTexture=function(L,H,K=null,Q=null,Y=0,xe=null){L.isTexture!==!0&&(yi("WebGLRenderer: copyTextureToTexture function signature has changed."),Q=arguments[0]||null,L=arguments[1],H=arguments[2],xe=arguments[3]||0,K=null),xe===null&&(Y!==0?(yi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),xe=Y,Y=0):xe=0);let Ce,Ue,ke,Ye,qe,Ve,rt,ut,Dt;const Ct=L.isCompressedTexture?L.mipmaps[xe]:L.image;if(K!==null)Ce=K.max.x-K.min.x,Ue=K.max.y-K.min.y,ke=K.isBox3?K.max.z-K.min.z:1,Ye=K.min.x,qe=K.min.y,Ve=K.isBox3?K.min.z:0;else{const pn=Math.pow(2,-Y);Ce=Math.floor(Ct.width*pn),Ue=Math.floor(Ct.height*pn),L.isDataArrayTexture?ke=Ct.depth:L.isData3DTexture?ke=Math.floor(Ct.depth*pn):ke=1,Ye=0,qe=0,Ve=0}Q!==null?(rt=Q.x,ut=Q.y,Dt=Q.z):(rt=0,ut=0,Dt=0);const lt=$e.convert(H.format),He=$e.convert(H.type);let Gt;H.isData3DTexture?(F.setTexture3D(H,0),Gt=N.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(F.setTexture2DArray(H,0),Gt=N.TEXTURE_2D_ARRAY):(F.setTexture2D(H,0),Gt=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,H.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,H.unpackAlignment);const ft=N.getParameter(N.UNPACK_ROW_LENGTH),vn=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Di=N.getParameter(N.UNPACK_SKIP_PIXELS),rn=N.getParameter(N.UNPACK_SKIP_ROWS),Ss=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,Ct.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Ct.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ye),N.pixelStorei(N.UNPACK_SKIP_ROWS,qe),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ve);const St=L.isDataArrayTexture||L.isData3DTexture,fn=H.isDataArrayTexture||H.isData3DTexture;if(L.isDepthTexture){const pn=we.get(L),Zt=we.get(H),Qt=we.get(pn.__renderTarget),ir=we.get(Zt.__renderTarget);fe.bindFramebuffer(N.READ_FRAMEBUFFER,Qt.__webglFramebuffer),fe.bindFramebuffer(N.DRAW_FRAMEBUFFER,ir.__webglFramebuffer);for(let ci=0;ci<ke;ci++)St&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,we.get(L).__webglTexture,Y,Ve+ci),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,we.get(H).__webglTexture,xe,Dt+ci)),N.blitFramebuffer(Ye,qe,Ce,Ue,rt,ut,Ce,Ue,N.DEPTH_BUFFER_BIT,N.NEAREST);fe.bindFramebuffer(N.READ_FRAMEBUFFER,null),fe.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(Y!==0||L.isRenderTargetTexture||we.has(L)){const pn=we.get(L),Zt=we.get(H);fe.bindFramebuffer(N.READ_FRAMEBUFFER,eo),fe.bindFramebuffer(N.DRAW_FRAMEBUFFER,Ja);for(let Qt=0;Qt<ke;Qt++)St?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,pn.__webglTexture,Y,Ve+Qt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,pn.__webglTexture,Y),fn?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Zt.__webglTexture,xe,Dt+Qt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Zt.__webglTexture,xe),Y!==0?N.blitFramebuffer(Ye,qe,Ce,Ue,rt,ut,Ce,Ue,N.COLOR_BUFFER_BIT,N.NEAREST):fn?N.copyTexSubImage3D(Gt,xe,rt,ut,Dt+Qt,Ye,qe,Ce,Ue):N.copyTexSubImage2D(Gt,xe,rt,ut,Ye,qe,Ce,Ue);fe.bindFramebuffer(N.READ_FRAMEBUFFER,null),fe.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else fn?L.isDataTexture||L.isData3DTexture?N.texSubImage3D(Gt,xe,rt,ut,Dt,Ce,Ue,ke,lt,He,Ct.data):H.isCompressedArrayTexture?N.compressedTexSubImage3D(Gt,xe,rt,ut,Dt,Ce,Ue,ke,lt,Ct.data):N.texSubImage3D(Gt,xe,rt,ut,Dt,Ce,Ue,ke,lt,He,Ct):L.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,xe,rt,ut,Ce,Ue,lt,He,Ct.data):L.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,xe,rt,ut,Ct.width,Ct.height,lt,Ct.data):N.texSubImage2D(N.TEXTURE_2D,xe,rt,ut,Ce,Ue,lt,He,Ct);N.pixelStorei(N.UNPACK_ROW_LENGTH,ft),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,vn),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Di),N.pixelStorei(N.UNPACK_SKIP_ROWS,rn),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ss),xe===0&&H.generateMipmaps&&N.generateMipmap(Gt),fe.unbindTexture()},this.copyTextureToTexture3D=function(L,H,K=null,Q=null,Y=0){return L.isTexture!==!0&&(yi("WebGLRenderer: copyTextureToTexture3D function signature has changed."),K=arguments[0]||null,Q=arguments[1]||null,L=arguments[2],H=arguments[3],Y=arguments[4]||0),yi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(L,H,K,Q,Y)},this.initRenderTarget=function(L){we.get(L).__webglFramebuffer===void 0&&F.setupRenderTarget(L)},this.initTexture=function(L){L.isCubeTexture?F.setTextureCube(L,0):L.isData3DTexture?F.setTexture3D(L,0):L.isDataArrayTexture||L.isCompressedArrayTexture?F.setTexture2DArray(L,0):F.setTexture2D(L,0),fe.unbindTexture()},this.resetState=function(){D=0,R=0,b=null,fe.reset(),pt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=ct._getDrawingBufferColorSpace(e),t.unpackColorSpace=ct._getUnpackColorSpace()}}const fc={type:"change"},$a={type:"start"},rh={type:"end"},Fo=new er,pc=new Bn,u1=Math.cos(70*ze.DEG2RAD),zt=new _,en=2*Math.PI,yt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Br=1e-6;class f1 extends Tu{constructor(e,t=null){super(e,t),this.state=yt.NONE,this.enabled=!0,this.target=new _,this.cursor=new _,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:es.ROTATE,MIDDLE:es.DOLLY,RIGHT:es.PAN},this.touches={ONE:ji.ROTATE,TWO:ji.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new _,this._lastQuaternion=new Ti,this._lastTargetPosition=new _,this._quat=new Ti().setFromUnitVectors(e.up,new _(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Gl,this._sphericalDelta=new Gl,this._scale=1,this._panOffset=new _,this._rotateStart=new ue,this._rotateEnd=new ue,this._rotateDelta=new ue,this._panStart=new ue,this._panEnd=new ue,this._panDelta=new ue,this._dollyStart=new ue,this._dollyEnd=new ue,this._dollyDelta=new ue,this._dollyDirection=new _,this._mouse=new ue,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=m1.bind(this),this._onPointerDown=p1.bind(this),this._onPointerUp=g1.bind(this),this._onContextMenu=M1.bind(this),this._onMouseWheel=_1.bind(this),this._onKeyDown=v1.bind(this),this._onTouchStart=w1.bind(this),this._onTouchMove=b1.bind(this),this._onMouseDown=x1.bind(this),this._onMouseMove=y1.bind(this),this._interceptControlDown=S1.bind(this),this._interceptControlUp=E1.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(fc),this.update(),this.state=yt.NONE}update(e=null){const t=this.object.position;zt.copy(t).sub(this.target),zt.applyQuaternion(this._quat),this._spherical.setFromVector3(zt),this.autoRotate&&this.state===yt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=en:n>Math.PI&&(n-=en),s<-Math.PI?s+=en:s>Math.PI&&(s-=en),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let o=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const r=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),o=r!=this._spherical.radius}if(zt.setFromSpherical(this._spherical),zt.applyQuaternion(this._quatInverse),t.copy(this.target).add(zt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let r=null;if(this.object.isPerspectiveCamera){const a=zt.length();r=this._clampDistance(a*this._scale);const l=a-r;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),o=!!l}else if(this.object.isOrthographicCamera){const a=new _(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),o=l!==this.object.zoom;const c=new _(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),r=zt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;r!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position):(Fo.origin.copy(this.object.position),Fo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Fo.direction))<u1?this.object.lookAt(this.target):(pc.setFromNormalAndCoplanarPoint(this.object.up,this.target),Fo.intersectPlane(pc,this.target))))}else if(this.object.isOrthographicCamera){const r=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),r!==this.object.zoom&&(this.object.updateProjectionMatrix(),o=!0)}return this._scale=1,this._performCursorZoom=!1,o||this._lastPosition.distanceToSquared(this.object.position)>Br||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Br||this._lastTargetPosition.distanceToSquared(this.target)>Br?(this.dispatchEvent(fc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?en/60*this.autoRotateSpeed*e:en/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){zt.setFromMatrixColumn(t,0),zt.multiplyScalar(-e),this._panOffset.add(zt)}_panUp(e,t){this.screenSpacePanning===!0?zt.setFromMatrixColumn(t,1):(zt.setFromMatrixColumn(t,0),zt.crossVectors(this.object.up,zt)),zt.multiplyScalar(e),this._panOffset.add(zt)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;zt.copy(s).sub(this.target);let o=zt.length();o*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*o/n.clientHeight,this.object.matrix),this._panUp(2*t*o/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,o=t-n.top,r=n.width,a=n.height;this._mouse.x=s/r*2-1,this._mouse.y=-(o/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(en*this._rotateDelta.x/t.clientHeight),this._rotateUp(en*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(en*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-en*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(en*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-en*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,o=Math.sqrt(n*n+s*s);this._dollyStart.set(0,o)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),o=.5*(e.pageY+n.y);this._rotateEnd.set(s,o)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(en*this._rotateDelta.x/t.clientHeight),this._rotateUp(en*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,o=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,o),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const r=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(r,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new ue,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function p1(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function m1(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function g1(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(rh),this.state=yt.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function x1(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case es.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=yt.DOLLY;break;case es.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=yt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=yt.ROTATE}break;case es.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=yt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=yt.PAN}break;default:this.state=yt.NONE}this.state!==yt.NONE&&this.dispatchEvent($a)}function y1(i){switch(this.state){case yt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case yt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case yt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function _1(i){this.enabled===!1||this.enableZoom===!1||this.state!==yt.NONE||(i.preventDefault(),this.dispatchEvent($a),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(rh))}function v1(i){this.enabled!==!1&&this._handleKeyDown(i)}function w1(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case ji.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=yt.TOUCH_ROTATE;break;case ji.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=yt.TOUCH_PAN;break;default:this.state=yt.NONE}break;case 2:switch(this.touches.TWO){case ji.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=yt.TOUCH_DOLLY_PAN;break;case ji.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=yt.TOUCH_DOLLY_ROTATE;break;default:this.state=yt.NONE}break;default:this.state=yt.NONE}this.state!==yt.NONE&&this.dispatchEvent($a)}function b1(i){switch(this._trackPointer(i),this.state){case yt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case yt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case yt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case yt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=yt.NONE}}function M1(i){this.enabled!==!1&&i.preventDefault()}function S1(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function E1(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class A1 extends Wc{constructor(){super();const e=new G;e.deleteAttribute("uv");const t=new Ge({side:jt}),n=new Ge,s=new wu(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const o=new w(e,t);o.position.set(-.757,13.219,.717),o.scale.set(31.713,28.305,28.591),this.add(o);const r=new w(e,n);r.position.set(-10.906,2.009,1.846),r.rotation.set(0,-.195,0),r.scale.set(2.328,7.905,4.651),this.add(r);const a=new w(e,n);a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),this.add(a);const l=new w(e,n);l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),this.add(l);const c=new w(e,n);c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),this.add(c);const h=new w(e,n);h.position.set(2.291,-.756,-2.621),h.rotation.set(0,-.286,0),h.scale.set(1.546,1.552,1.496),this.add(h);const u=new w(e,n);u.position.set(-2.193,-.369,-5.547),u.rotation.set(0,.516,0),u.scale.set(3.875,3.487,2.986),this.add(u);const d=new w(e,qi(50));d.position.set(-16.116,14.37,8.208),d.scale.set(.1,2.428,2.739),this.add(d);const f=new w(e,qi(50));f.position.set(-16.109,18.021,-8.207),f.scale.set(.1,2.425,2.751),this.add(f);const g=new w(e,qi(17));g.position.set(14.904,12.198,-1.832),g.scale.set(.15,4.265,6.331),this.add(g);const x=new w(e,qi(43));x.position.set(-.462,8.89,14.52),x.scale.set(4.38,5.441,.088),this.add(x);const m=new w(e,qi(20));m.position.set(3.235,11.486,-12.541),m.scale.set(2.5,2,.1),this.add(m);const p=new w(e,qi(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function qi(i){const e=new bt;return e.color.setScalar(i),e}function T1(){const t=document.createElement("canvas");t.width=1024,t.height=682;const n=t.getContext("2d"),s=n.createLinearGradient(0,0,1024,682);s.addColorStop(0,"#0a2b36"),s.addColorStop(.24,"#0f5460"),s.addColorStop(.5,"#143c6b"),s.addColorStop(.76,"#2a2463"),s.addColorStop(1,"#0c3b47"),n.fillStyle=s,n.fillRect(0,0,1024,682);const o=48,r=36;n.fillStyle="#181e28",n.fillRect(0,0,1024,r),n.fillRect(0,682-r,1024,r),n.fillRect(0,0,o,682),n.fillRect(1024-o,0,o,682),n.strokeStyle="rgba(186, 212, 240, 0.34)",n.lineWidth=1.2;for(let p=6;p<r-6;p+=4)n.beginPath(),n.moveTo(o-16,p),n.lineTo(1024-o+16,p),n.stroke(),n.beginPath(),n.moveTo(o-16,682-p),n.lineTo(1024-o+16,682-p),n.stroke();n.fillStyle="#e6c05a";for(let p=28;p<996;p+=14)n.fillRect(p,6,7,10),n.fillRect(p,666,7,10);for(let p=26;p<656;p+=14)n.fillRect(6,p,10,7),n.fillRect(1008,p,10,7);n.strokeStyle="#7bb0d4",n.lineWidth=2.5,n.strokeRect(o-3,r-3,1024-o*2+6,682-r*2+6);const a=o,l=r,c=1024-o*2,h=682-r*2,u=n.createLinearGradient(a,l,a+c,l+h);u.addColorStop(0,"rgba(16, 198, 174, 0.52)"),u.addColorStop(.28,"rgba(28, 134, 232, 0.48)"),u.addColorStop(.55,"rgba(112, 72, 224, 0.44)"),u.addColorStop(.8,"rgba(24, 188, 146, 0.50)"),u.addColorStop(1,"rgba(42, 144, 236, 0.46)"),n.fillStyle=u,n.fillRect(a,l,c,h),n.strokeStyle="rgba(255, 255, 255, 0.11)",n.lineWidth=1;for(let p=a;p<=a+c;p+=8)n.beginPath(),n.moveTo(p,l),n.lineTo(p,l+h),n.stroke();for(let p=l;p<=l+h;p+=8)n.beginPath(),n.moveTo(a,p),n.lineTo(a+c,p),n.stroke();n.strokeStyle="rgba(160, 235, 255, 0.22)",n.lineWidth=1.5;for(let p=1;p<8;p++){const T=a+c/8*p;n.beginPath(),n.moveTo(T,l),n.lineTo(T,l+h),n.stroke()}const d=document.createElement("canvas");d.width=1024,d.height=682;const f=d.getContext("2d");f.fillStyle="#383838",f.fillRect(0,0,1024,682),f.fillStyle="#141414",f.fillRect(a,l,c,h),f.strokeStyle="#282828";for(let p=a;p<=a+c;p+=6)f.beginPath(),f.moveTo(p,l),f.lineTo(p,l+h),f.stroke();const g=new Bt(t);g.colorSpace=At,g.anisotropy=8;const x=new Bt(d);x.anisotropy=4;const m=new Bt(d);return m.anisotropy=4,{map:g,roughnessMap:x,bumpMap:m}}function P1(){const t=document.createElement("canvas");t.width=1024,t.height=820;const n=t.getContext("2d");n.fillStyle="#14332d",n.fillRect(0,0,1024,820),n.strokeStyle="rgba(255,255,255,0.025)",n.lineWidth=1;for(let a=0;a<1024;a+=8)n.beginPath(),n.moveTo(a,0),n.lineTo(a,820),n.stroke();for(let a=0;a<820;a+=8)n.beginPath(),n.moveTo(0,a),n.lineTo(1024,a),n.stroke();n.fillStyle="#194139",n.fillRect(28,28,968,764),n.strokeStyle="#2d6e5e",n.lineWidth=2.2;for(let a=0;a<16;a++){const l=150+a*32;for(const c of[-3,3]){n.beginPath(),n.moveTo(44,l+c),n.lineTo(130,l+c);for(let h=0;h<4;h++){const u=138+h*16;n.lineTo(u,l+c-5),n.lineTo(u+8,l+c+5)}n.lineTo(255,l+c),n.stroke(),n.beginPath(),n.moveTo(980,l+c),n.lineTo(894,l+c);for(let h=0;h<4;h++){const u=886-h*16;n.lineTo(u,l+c-5),n.lineTo(u-8,l+c+5)}n.lineTo(769,l+c),n.stroke()}}n.fillStyle="#c9a653";for(let a=280;a<=744;a+=26)for(let l=135;l<=685;l+=26)a>380&&a<644&&l>235&&l<585||(n.beginPath(),n.arc(a,l,4.2,0,Math.PI*2),n.fill(),n.fillStyle="#0c1c19",n.beginPath(),n.arc(a,l,1.8,0,Math.PI*2),n.fill(),n.fillStyle="#c9a653");for(let a=400;a<=624;a+=22)for(let l=255;l<=565;l+=22)n.fillStyle="#d4af59",n.beginPath(),n.arc(a,l,5.2,0,Math.PI*2),n.fill(),n.fillStyle="#102420",n.beginPath(),n.arc(a,l,2.2,0,Math.PI*2),n.fill();const s=[[60,60],[964,60],[60,760],[964,760]];for(const[a,l]of s)n.strokeStyle="#dfb85c",n.lineWidth=6,n.beginPath(),n.arc(a,l,20,0,Math.PI*2),n.stroke();const o=new Bt(t);o.colorSpace=At,o.anisotropy=8;const r=new Bt(t);return r.anisotropy=4,{map:o,bumpMap:r}}function C1(){const e=document.createElement("canvas");e.width=512,e.height=512;const t=e.getContext("2d");t.fillStyle="#a84c20",t.fillRect(0,0,512,512);for(let o=0;o<512;o+=4){const r=o%8===0?"#d8763f":"#8a3915";t.fillStyle=r,t.fillRect(0,o,512,2.5)}const n=new Bt(e);n.colorSpace=At,n.wrapS=sn,n.wrapT=sn,n.repeat.set(3,6);const s=new Bt(e);return s.wrapS=sn,s.wrapT=sn,s.repeat.set(3,6),{map:n,bumpMap:s}}function R1(){const e=document.createElement("canvas");e.width=256,e.height=256;const t=e.getContext("2d");t.fillStyle="#202228",t.fillRect(0,0,256,256);for(let s=0;s<256;s+=2){const o=28+Math.floor(Math.sin(s*.7)*6+s*37%9);t.fillStyle=`rgb(${o},${o+2},${o+6})`,t.fillRect(0,s,256,1.5)}const n=new Bt(e);return n.colorSpace=At,n.wrapS=sn,n.wrapT=sn,n.repeat.set(4,4),n}function mc(i){const t=document.createElement("canvas");t.width=256,t.height=256;const n=t.getContext("2d");n.fillStyle=i,n.fillRect(0,0,256,256);const s=16;for(let a=0;a<256;a+=s)for(let l=0;l<256;l+=s){const h=(l/s+a/s)%2===0?n.createLinearGradient(l,a,l+s,a):n.createLinearGradient(l,a,l,a+s);h.addColorStop(0,"rgba(255,255,255,0.03)"),h.addColorStop(.5,"rgba(255,255,255,0.16)"),h.addColorStop(1,"rgba(0,0,0,0.22)"),n.fillStyle=h,n.fillRect(l,a,s,s)}const o=new Bt(t);o.colorSpace=At,o.wrapS=sn,o.wrapT=sn,o.repeat.set(5,2),o.anisotropy=8;const r=new Bt(t);return r.wrapS=sn,r.wrapT=sn,r.repeat.set(5,2),{map:o,bumpMap:r}}function I1(){const e=document.createElement("canvas");e.width=512,e.height=512;const t=e.getContext("2d");t.fillStyle="#0f172a",t.fillRect(0,0,512,512),t.strokeStyle="#d4a948",t.lineWidth=6,t.strokeRect(8,8,496,496);const n=(r,a,l,c,h,u,d,f)=>{const g=t.createLinearGradient(r,a,r+l,a+c);g.addColorStop(0,h),g.addColorStop(1,u),t.fillStyle=g,t.fillRect(r,a,l,c),t.strokeStyle="rgba(255, 255, 255, 0.24)",t.lineWidth=1;for(let x=r+d;x<r+l;x+=d)t.beginPath(),t.moveTo(x,a),t.lineTo(x,a+c),t.stroke();for(let x=a+f;x<a+c;x+=f)t.beginPath(),t.moveTo(r,x),t.lineTo(r+l,x),t.stroke();t.strokeStyle="rgba(226, 192, 92, 0.72)",t.lineWidth=1.6,t.strokeRect(r,a,l,c)};n(22,22,468,66,"#0e7490","#1d4ed8",14,16),n(22,102,218,178,"#0f766e","#115e59",10,8),n(254,102,236,178,"#1d4ed8","#4338ca",12,10),n(22,294,180,124,"#3730a3","#6d28d9",22,20),n(214,294,146,124,"#b45309","#d97706",6,6),n(372,294,118,124,"#0369a1","#0e7490",10,12),n(22,430,468,60,"#1e293b","#334155",12,14),t.strokeStyle="rgba(250, 204, 21, 0.55)",t.lineWidth=1.3;for(let r=0;r<6;r++){const a=92+r*1.6;t.beginPath(),t.moveTo(22,a),t.lineTo(490,a),t.stroke();const l=283+r*1.6;t.beginPath(),t.moveTo(22,l),t.lineTo(490,l),t.stroke()}const s=new Bt(e);s.colorSpace=At,s.anisotropy=8;const o=new Bt(e);return{map:s,bumpMap:o}}function D1(){const e=document.createElement("canvas");e.width=512,e.height=512;const t=e.getContext("2d");t.fillStyle="#140f2b",t.fillRect(0,0,512,512),t.strokeStyle="#e2b648",t.lineWidth=6,t.strokeRect(8,8,496,496);const n=28,s=28,o=19;for(let h=0;h<16;h++)for(let u=0;u<16;u++){const d=250+(h+u)%8*9;t.fillStyle=`hsl(${d}, 74%, ${34+h*u%3*7}%)`,t.fillRect(n+u*o+1.5,s+h*o+1.5,o-3,o-3),t.fillStyle="rgba(255,255,255,0.22)",t.fillRect(n+u*o+4,s+h*o+4,4,4)}t.strokeStyle="#38bdf8",t.lineWidth=2.2,t.strokeRect(n-2,s-2,16*o+4,16*o+4);const r=t.createLinearGradient(350,28,484,332);r.addColorStop(0,"#0284c7"),r.addColorStop(1,"#0d9488"),t.fillStyle=r,t.fillRect(350,28,134,304),t.strokeStyle="rgba(255,255,255,0.28)",t.lineWidth=1;for(let h=34;h<330;h+=6)t.beginPath(),t.moveTo(350,h),t.lineTo(484,h),t.stroke();t.strokeStyle="#e2b648",t.lineWidth=1.6,t.strokeRect(350,28,134,304);const a=t.createLinearGradient(28,352,484,484);a.addColorStop(0,"#7c3aed"),a.addColorStop(.5,"#2563eb"),a.addColorStop(1,"#0891b2"),t.fillStyle=a,t.fillRect(28,352,456,132),t.strokeStyle="rgba(255,255,255,0.24)";for(let h=44;h<484;h+=16)t.beginPath(),t.moveTo(h,352),t.lineTo(h,484),t.stroke();t.strokeStyle="#e2b648",t.lineWidth=1.8,t.strokeRect(28,352,456,132);const l=new Bt(e);l.colorSpace=At,l.anisotropy=8;const c=new Bt(e);return{map:l,bumpMap:c}}function L1(){const t=document.createElement("canvas");t.width=1024,t.height=712;const n=t.getContext("2d");n.fillStyle="#0e3b2e",n.fillRect(0,0,1024,712),n.fillStyle="#124939",n.fillRect(24,24,976,664),n.strokeStyle="#1d7a5b",n.lineWidth=2.2;for(let r=0;r<18;r++){const a=76+r*11;n.beginPath(),n.moveTo(64,a),n.lineTo(290,a),n.lineTo(324,a+18),n.lineTo(660,a+18),n.lineTo(695,a-6),n.lineTo(940,a-6),n.stroke()}n.strokeStyle="#289e74",n.lineWidth=2;for(let r=0;r<8;r++){const a=340+r*24;n.beginPath(),n.moveTo(110,a);for(let l=140;l<440;l+=24)n.lineTo(l,a),n.lineTo(l+6,a-7),n.lineTo(l+12,a-7),n.lineTo(l+18,a+7),n.lineTo(l+24,a);n.lineTo(860,a),n.stroke()}n.strokeStyle="#1b6e53",n.lineWidth=2;for(let r=80;r<944;r+=26)n.beginPath(),n.moveTo(r,42),n.lineTo(r,670),n.stroke();for(let r=54;r<658;r+=36)for(let a=54;a<970;a+=36)(a+r)%72===0&&(n.fillStyle="#e0b94f",n.beginPath(),n.arc(a,r,3.2,0,Math.PI*2),n.fill(),n.fillStyle="#09241c",n.beginPath(),n.arc(a,r,1.3,0,Math.PI*2),n.fill());n.fillStyle="#e6c25a";for(let r=32;r<992;r+=18)n.beginPath(),n.arc(r,20,2.4,0,Math.PI*2),n.arc(r,692,2.4,0,Math.PI*2),n.fill();for(let r=32;r<680;r+=18)n.beginPath(),n.arc(20,r,2.4,0,Math.PI*2),n.arc(1004,r,2.4,0,Math.PI*2),n.fill();const s=new Bt(t);s.colorSpace=At,s.anisotropy=8;const o=new Bt(t);return{map:s,bumpMap:o}}function F1(){const i=document.createElement("canvas");i.width=64,i.height=128;const e=i.getContext("2d");e.fillStyle="#5c5838",e.fillRect(0,0,64,128),e.fillStyle="#d4864b";for(let n=0;n<12;n++){const s=Math.round(6+n/11*112);e.fillRect(0,s,64,3)}const t=new Bt(i);return t.colorSpace=At,t.wrapS=sn,t.wrapT=ei,t}function z1(){const t=document.createElement("canvas");t.width=640,t.height=480;const n=t.getContext("2d");n.fillStyle="#03050a",n.fillRect(0,0,640,480);const s=24,o=42,r=592,a=394,l=n.createLinearGradient(s,o,s,o+a*.68);l.addColorStop(0,"#0a1d4e"),l.addColorStop(.32,"#1d4ed8"),l.addColorStop(.62,"#7c3aed"),l.addColorStop(.84,"#f43f5e"),l.addColorStop(1,"#fbbf24"),n.fillStyle=l,n.fillRect(s,o,r,a*.68);const c=s+r*.62,h=o+a*.44,u=n.createRadialGradient(c,h,6,c,h,130);u.addColorStop(0,"#ffffff"),u.addColorStop(.18,"#fef08a"),u.addColorStop(.45,"rgba(251, 146, 60, 0.55)"),u.addColorStop(1,"rgba(244, 63, 94, 0)"),n.fillStyle=u,n.fillRect(s,o,r,a*.72);const d=o+a*.68,f=a*.32,g=n.createLinearGradient(s,d,s,d+f);g.addColorStop(0,"#fb923c"),g.addColorStop(.35,"#4338ca"),g.addColorStop(1,"#091124"),n.fillStyle=g,n.fillRect(s,d,r,f),n.fillStyle="#1e1b4b",n.beginPath(),n.moveTo(s,d),n.lineTo(s+r*.14,o+a*.48),n.lineTo(s+r*.28,o+a*.56),n.lineTo(s+r*.46,o+a*.34),n.lineTo(s+r*.6,o+a*.52),n.lineTo(s+r*.79,o+a*.38),n.lineTo(s+r*.92,o+a*.5),n.lineTo(s+r,o+a*.46),n.lineTo(s+r,d),n.closePath(),n.fill(),n.fillStyle="#0b1020",n.beginPath(),n.moveTo(s,d),n.lineTo(s+r*.22,o+a*.56),n.lineTo(s+r*.4,o+a*.62),n.lineTo(s+r*.68,o+a*.54),n.lineTo(s+r*.88,o+a*.6),n.lineTo(s+r,o+a*.57),n.lineTo(s+r,d),n.closePath(),n.fill(),n.fillStyle="rgba(254, 240, 138, 0.42)";for(let b=0;b<9;b++){const v=d+8+b*11,y=92-b*7;n.fillRect(c-y*.5+Math.sin(b*1.9)*8,v,y,2.5)}n.strokeStyle="rgba(255, 255, 255, 0.24)",n.lineWidth=1;for(let b=1;b<=2;b++){const v=s+r/3*b;n.beginPath(),n.moveTo(v,o),n.lineTo(v,o+a),n.stroke();const y=o+a/3*b;n.beginPath(),n.moveTo(s,y),n.lineTo(s+r,y),n.stroke()}n.strokeStyle="rgba(255, 255, 255, 0.88)",n.lineWidth=2.4;const x=20,m=[[s+10,o+10,1,1],[s+r-10,o+10,-1,1],[s+10,o+a-10,1,-1],[s+r-10,o+a-10,-1,-1]];for(const[b,v,y,M]of m)n.beginPath(),n.moveTo(b,v+M*x),n.lineTo(b,v),n.lineTo(b+y*x,v),n.stroke();const p=s+r*.5,T=o+a*.5;n.strokeStyle="#34d399",n.lineWidth=2.2,n.beginPath(),n.moveTo(p-52,T),n.lineTo(p-18,T),n.moveTo(p+18,T),n.lineTo(p+52,T),n.stroke();const E=s+r*.46,S=o+a*.36;n.strokeStyle="#38bdf8",n.lineWidth=2.6,n.beginPath(),n.arc(E,S,22,0,Math.PI*2),n.stroke(),n.strokeStyle="#67e8f9",n.lineWidth=1.6,n.strokeRect(E-30,S-22,60,44),n.fillStyle="#38bdf8",n.beginPath(),n.arc(E,S,3.5,0,Math.PI*2),n.fill();const z=s+r-110,D=446;n.fillStyle="rgba(255, 255, 255, 0.14)",n.fillRect(z,D,102,24),n.fillStyle="rgba(226, 232, 240, 0.85)",n.beginPath(),n.moveTo(z+2,D+22);for(let b=0;b<=24;b++){const v=b/24,y=Math.exp(-Math.pow((v-.32)/.18,2))*16+Math.exp(-Math.pow((v-.72)/.14,2))*13;n.lineTo(z+2+v*98,D+22-y)}n.lineTo(z+100,D+22),n.closePath(),n.fill();for(let b=-4;b<=4;b++){n.fillStyle=b===0?"#34d399":"rgba(226, 232, 240, 0.55)";const v=b===0?3.5:2;n.beginPath(),n.arc(640*.5+b*16,458,v,0,Math.PI*2),n.fill()}n.fillStyle="rgba(255, 255, 255, 0.045)";for(let b=s;b<s+r;b+=4)n.fillRect(b,o,1,a);for(let b=o;b<o+a;b+=4)n.fillRect(s,b,r,1);const R=new Bt(t);return R.colorSpace=At,R.anisotropy=8,R}function N1(i){const e=T1(),t=P1(),n=C1(),s=R1(),o=mc("#1d2128"),r=mc("#262d38"),a=I1(),l=D1(),c=L1(),h=F1(),u=z1(),d={clippingPlanes:i,clipShadows:!0,side:Rt},f=new je({...d,color:2106152,metalness:.65,roughness:.48,clearcoat:.08}),g=new Ge({...d,color:3487808,metalness:.05,roughness:.88}),x={clippingPlanes:i,clipShadows:!0,side:Wn,depthWrite:!1,transparent:!0,envMapIntensity:.35},m=new je({...x,color:9425141,metalness:0,roughness:.08,opacity:.1,iridescence:.85,iridescenceIOR:1.46,iridescenceThicknessRange:[280,480],clearcoat:.18}),p=new Ge({...d,color:15130315,metalness:.08,roughness:.34}),T=new Ge({...d,color:11976908,metalness:.88,roughness:.24}),E=new je({...x,color:11197424,metalness:0,roughness:.06,opacity:.11,iridescence:.45,iridescenceIOR:1.544,iridescenceThicknessRange:[300,560],clearcoat:.15}),S=new je({...d,color:4953008,metalness:.12,roughness:.18,transparent:!0,opacity:.62}),z=new je({...x,color:955592,metalness:.02,roughness:.08,opacity:.2,iridescence:.95,iridescenceIOR:1.62,iridescenceThicknessRange:[380,700],clearcoat:.22}),D=new je({...x,color:10406880,metalness:0,roughness:.08,opacity:.08,iridescence:.3,iridescenceIOR:1.47,iridescenceThicknessRange:[220,380],clearcoat:.12}),R=new Ge({...d,color:7502986,metalness:.86,roughness:.28}),b=new je({...d,map:e.map,emissiveMap:e.map,emissive:16777215,emissiveIntensity:.28,roughnessMap:e.roughnessMap,bumpMap:e.bumpMap,bumpScale:.04,metalness:.56,roughness:.24,iridescence:1,iridescenceIOR:2.1,iridescenceThicknessRange:[300,680],clearcoat:.28,clearcoatRoughness:.14,envMapIntensity:.52}),v=new je({...d,color:2962754,metalness:.78,roughness:.24}),y=new je({...d,color:2177626,metalness:.72,roughness:.26,iridescence:.45}),M=new je({...d,color:1844016,metalness:.74,roughness:.28}),C=new Ge({...d,color:14857800,metalness:.94,roughness:.18}),A=new Ge({...d,color:2764342,metalness:.14,roughness:.58}),I=new Ge({...d,color:8742478,metalness:.84,roughness:.34}),U=new Ge({...d,map:t.map,bumpMap:t.bumpMap,bumpScale:.04,metalness:.22,roughness:.44}),k=new Ge({...d,color:7037248,metalness:.12,roughness:.65}),B=new Ge({...d,color:10255192,metalness:.1,roughness:.36}),O=new Ge({...d,color:1908774,metalness:.14,roughness:.48}),X=new je({...d,color:13067284,metalness:.28,roughness:.26,clearcoat:.5,clearcoatRoughness:.2}),J=new Ge({...d,color:2369584,metalness:.55,roughness:.38}),ce=new Ge({...d,color:8160916,metalness:.68,roughness:.42}),pe=new Ge({...d,color:10003120,metalness:.88,roughness:.24}),Oe=new Ge({...d,map:n.map,bumpMap:n.bumpMap,bumpScale:.06,metalness:.88,roughness:.24}),q=new Ge({...d,color:13661255,metalness:.93,roughness:.22}),oe=new je({...d,color:14212838,metalness:.96,roughness:.11,clearcoat:.4}),ye=new Ge({...d,color:6449781,metalness:.86,roughness:.32}),le=new je({...d,color:2303792,metalness:.28,roughness:.05,clearcoat:1,clearcoatRoughness:.03}),ne=new je({...d,map:s,metalness:.72,roughness:.28,clearcoat:.25,clearcoatRoughness:.32}),ve=new Ge({...d,color:8037560,metalness:.04,roughness:.76}),Z=new je({...d,color:14479615,metalness:.04,roughness:.04,transparent:!0,opacity:.48,iridescence:.85,iridescenceIOR:1.52,iridescenceThicknessRange:[250,520],clearcoat:1,clearcoatRoughness:.02,depthWrite:!1}),Ne=new je({...d,color:14432836,metalness:.04,roughness:.12,transparent:!0,opacity:.78,clearcoat:.7}),re=new je({...d,color:2926689,metalness:.04,roughness:.12,transparent:!0,opacity:.78,clearcoat:.7}),te=new je({...d,color:2780896,metalness:.04,roughness:.12,transparent:!0,opacity:.78,clearcoat:.7}),N=new Ge({...d,color:5660010,metalness:.9,roughness:.28}),Ee=new je({...d,color:3892111,metalness:.42,roughness:.2,transparent:!0,opacity:.88,clearcoat:.5}),he=new je({...d,color:6067926,emissive:1588587,emissiveIntensity:.22,metalness:.35,roughness:.16}),_e=new je({...d,color:13952242,metalness:.12,roughness:.18,transparent:!0,opacity:.82}),fe=new je({...d,color:4937064,metalness:.55,roughness:.26,transparent:!0,opacity:.88}),Ie=new Ge({...d,color:14261048,metalness:.78,roughness:.26}),we=new Ge({...d,color:2501171,metalness:.88,roughness:.24}),F=new Ge({...d,color:14185282,metalness:.95,roughness:.16}),P=new je({...d,color:14477298,metalness:.05,roughness:.14,transparent:!0,opacity:.34,depthWrite:!1}),W=new Ge({...d,color:2831944,metalness:.68,roughness:.3}),j=new je({...d,map:o.map,bumpMap:o.bumpMap,bumpScale:.035,metalness:.28,roughness:.34,clearcoat:.25,clearcoatRoughness:.32}),ae=new je({...d,map:r.map,bumpMap:r.bumpMap,bumpScale:.035,color:13358564,metalness:.42,roughness:.32,clearcoat:.28,clearcoatRoughness:.3}),ie=new Ge({...d,color:4542302,metalness:.72,roughness:.36}),Be=new Ge({...d,color:2764343,metalness:.22,roughness:.56}),be=new Ge({...d,color:3883599,metalness:.78,roughness:.3}),Re=new Ge({...d,color:12240081,metalness:.92,roughness:.2}),nt=new Ge({...d,color:13936968,metalness:.9,roughness:.24}),ge=new Ge({...d,color:15460059,metalness:.05,roughness:.38}),Le=new Ge({...d,color:12862774,metalness:.04,roughness:.78}),We=new Ge({...d,color:2387641,metalness:.04,roughness:.76}),Xe=new je({...d,color:12456508,emissive:10424889,emissiveIntensity:.45,metalness:.05,roughness:.12,clearcoat:.9}),Fe=new je({...d,map:a.map,emissiveMap:a.map,emissive:16777215,emissiveIntensity:.24,bumpMap:a.bumpMap,bumpScale:.03,metalness:.62,roughness:.2,iridescence:.95,iridescenceIOR:2,iridescenceThicknessRange:[280,620],clearcoat:.45,clearcoatRoughness:.12}),it=new je({...d,map:l.map,emissiveMap:l.map,emissive:16777215,emissiveIntensity:.28,bumpMap:l.bumpMap,bumpScale:.03,metalness:.58,roughness:.22,iridescence:1,iridescenceIOR:2.1,iridescenceThicknessRange:[320,680],clearcoat:.48,clearcoatRoughness:.12}),$e=new Ge({...d,map:c.map,bumpMap:c.bumpMap,bumpScale:.04,metalness:.24,roughness:.42}),pt=new Ge({...d,map:h,metalness:.36,roughness:.52}),V=new Ge({...d,color:1460801,metalness:.22,roughness:.44}),Me=new Ge({...d,color:12766166,metalness:.92,roughness:.22}),ee=new je({...d,color:14253390,metalness:.94,roughness:.2,clearcoat:.2,clearcoatRoughness:.24}),de=new Ge({...d,color:15235470,metalness:.02,roughness:.82}),Pe=new Ge({...d,color:6465752,metalness:.02,roughness:.8}),Te=new Ge({...d,color:3817290,metalness:.32,roughness:.62}),Ze=new Ge({...d,color:14919723,metalness:.06,roughness:.42}),Mt=new Ge({...d,color:15525852,metalness:.04,roughness:.46}),Ft=new Ge({...d,color:13793860,metalness:.9,roughness:.24}),at=new je({...d,color:14278888,metalness:.96,roughness:.14,clearcoat:.35}),Jt=new Ge({...d,color:2500912,metalness:.04,roughness:.86}),un=new je({...x,color:7259120,metalness:0,roughness:.05,opacity:.24,iridescence:.82,iridescenceIOR:1.44,iridescenceThicknessRange:[240,420],clearcoat:.4}),xs=new je({...x,color:14243484,metalness:.08,roughness:.04,opacity:.36,iridescence:1,iridescenceIOR:1.72,iridescenceThicknessRange:[340,620],clearcoat:.55}),ys=new je({...x,color:3718648,metalness:0,roughness:.04,opacity:.3,iridescence:.9,iridescenceIOR:1.56,iridescenceThicknessRange:[280,520],clearcoat:.45}),Pn=new je({...x,color:1096065,metalness:0,roughness:.04,opacity:.32,iridescence:.92,iridescenceIOR:1.62,iridescenceThicknessRange:[300,540],clearcoat:.48}),Ii=new je({...x,color:6514417,metalness:0,roughness:.05,opacity:.3,iridescence:.88,iridescenceIOR:1.52,iridescenceThicknessRange:[260,480],clearcoat:.42}),_s=new je({...d,color:7780571,metalness:.04,roughness:.28,transparent:!0,opacity:.72}),vs=new Ge({...d,map:u,emissive:16777215,emissiveMap:u,emissiveIntensity:.72,metalness:.08,roughness:.14}),ai=new je({...d,color:12456508,emissive:14753096,emissiveIntensity:.55,metalness:.08,roughness:.12,clearcoat:.75}),ws=new je({...d,color:4937059,metalness:.68,roughness:.36,clearcoat:.14}),li=new je({...d,color:14212838,metalness:.94,roughness:.16,clearcoat:.42,clearcoatRoughness:.12}),bs=new Ge({...d,color:13208124,metalness:.86,roughness:.28}),Ms=new je({...d,color:14427686,metalness:.18,roughness:.22,clearcoat:.72}),$s=new Ge({...d,color:1382172,metalness:.08,roughness:.96}),js=new Ge({...d,color:2450411,metalness:.72,roughness:.32}),Js=new Ge({...d,color:2566707,metalness:.08,roughness:.62}),Qs=new je({...d,color:6055541,metalness:.72,roughness:.42,clearcoat:.1}),eo=new Ge({...d,color:165063,metalness:.12,roughness:.56});return{clippingPlanes:i,matteBlackAnodized:f,epdmGasket:g,sswfGlass:m,pztCeramic:p,silverElectrode:T,quartzOlpf:E,quartzEdge:S,irCutGlass:z,coverGlass:D,kovarSeal:R,siliconSensorDie:b,siliconBulk:v,siliconLogicLayer:y,siliconDramLayer:M,goldPlating:C,ceramicAlumina:A,tungstenCopper:I,sensorPcb:U,pcbSide:k,smdCeramic:B,icEpoxy:O,polyimideFpc:X,emiShieldFilm:J,magnesiumCast:ce,stainlessMachined:pe,copperCoil:Oe,copperHeatSpreader:q,neodymiumMagnet:oe,softIronYoke:ye,siliconNitrideBall:le,pyroGraphite:ne,thermalPadTim:ve,microlensGlass:Z,cfaRed:Ne,cfaGreen:re,cfaBlue:te,tungstenGrid:N,siliconPhotodiode:Ee,siliconDepletion:he,ftiOxide:_e,siliconTransistorLayer:fe,gatePolysilicon:Ie,memoryNodeShield:we,copperHybridBond:F,interlayerDielectric:P,dramCellArray:W,carbonFiberBlade:j,carbonFiberBladeRear:ae,shutterShieldBlade:ie,shutterChassis:Be,midPlateSteel:be,linkArmSteel:Re,brassGear:nt,pomGear:ge,damperElastomer:Le,antiVibRubber:We,irLedLens:Xe,ispSiliconDie:Fe,npuSiliconDie:it,hdiMainboardPcb:$e,pcbEdgeLaminate:pt,abfSubstrate:V,emiShieldCan:Me,vaporChamberCopper:ee,thermalPadPink:de,thermalPadBlue:Pe,ferriteInductor:Te,tantalumCapYellow:Ze,zifIvoryPlastic:Mt,coaxShieldCopper:Ft,solderBallSilver:at,evfEyecupRubber:Jt,evfAntiFogGlass:un,evfDichroicMirror:xs,evfLensAspheric:ys,evfLensEd:Pn,evfLensField:Ii,evfGlassEdgeRim:_s,evfOledActive:vs,evfIrEmitter:ai,evfHousingMg:ws,mountStainlessFlange:li,mountSpringSteel:bs,mountRedIndexDot:Ms,mountVelvetBaffle:$s,mountShimBlue:js,mountPpsInsulator:Js,mountMgBulkhead:Qs,mountThreadLockBlue:eo,allMaterials:[f,g,m,p,T,E,S,z,D,R,b,v,y,M,C,A,I,U,k,B,O,X,J,ce,pe,Oe,q,oe,ye,le,ne,ve,Z,Ne,re,te,N,Ee,he,_e,fe,Ie,we,F,P,W,j,ae,ie,Be,be,Re,nt,ge,Le,We,Xe,Fe,it,$e,pt,V,Me,ee,de,Pe,Te,Ze,Mt,Ft,at,Jt,un,xs,ys,Pn,Ii,_s,vs,ai,ws,li,bs,Ms,$s,js,Js,Qs,eo]}}function dt(i,e,t){const n=new on,s=i/2,o=e/2,r=Math.min(t,s,o);return n.moveTo(-s+r,-o),n.lineTo(s-r,-o),n.absarc(s-r,-o+r,r,-Math.PI/2,0,!1),n.lineTo(s,o-r),n.absarc(s-r,o-r,r,0,Math.PI/2,!1),n.lineTo(-s+r,o),n.absarc(-s+r,o-r,r,Math.PI/2,Math.PI,!1),n.lineTo(-s,-o+r),n.absarc(-s+r,-o+r,r,Math.PI,Math.PI*1.5,!1),n}function Je(i,e,t,n,s,o,r=0,a=0){const l=dt(i,e,t),c=new $t,h=n/2,u=s/2,d=Math.min(o,h,u);return c.moveTo(r-h+d,a-u),c.lineTo(r+h-d,a-u),c.absarc(r+h-d,a-u+d,d,-Math.PI/2,0,!1),c.lineTo(r+h,a+u-d),c.absarc(r+h-d,a+u-d,d,0,Math.PI/2,!1),c.lineTo(r-h+d,a+u),c.absarc(r-h+d,a+u-d,d,Math.PI/2,Math.PI,!1),c.lineTo(r-h,a-u+d),c.absarc(r-h+d,a-u+d,d,Math.PI,Math.PI*1.5,!1),l.holes.push(c),l}function Vn(i,e){for(const[t,n,s]of e){const o=new $t;o.absarc(t,n,s,0,Math.PI*2,!0),i.holes.push(o)}}function me(i,e,t=.08,n=.08,s=20){const o=t>0&&n>0,r=o?Math.max(.02,e-n*2):e,a=new Si(i,{depth:r,bevelEnabled:o,bevelSegments:o?3:0,steps:1,bevelSize:t,bevelThickness:n,curveSegments:s});return a.translate(0,0,-r/2),a.computeVertexNormals(),a}function U1(i,e,t,n){const s=Math.min(i,e)*.36,o=Math.max(1.2,i-t*2),r=Math.max(1.2,e-t*2),a=Math.max(.4,s-t*.7),l=Je(i,e,s,o,r,a);return me(l,n,.08,.08,24)}function Gs(i,e,t,n=1){const s=new on,o=e*2*Math.PI/(i*3.6),r=o*1.18,a=e+o,l=Math.max(n+.4,e-r),c=Math.PI*2/i;for(let h=0;h<i;h++){const u=h*c,d=u+c*.16,f=u+c*.32,g=u+c*.56,x=u+c*.72,m=Math.cos(u)*l,p=Math.sin(u)*l;h===0?s.moveTo(m,p):s.lineTo(m,p),s.lineTo(Math.cos(d)*l,Math.sin(d)*l),s.lineTo(Math.cos(f)*a,Math.sin(f)*a),s.lineTo(Math.cos(g)*a,Math.sin(g)*a),s.lineTo(Math.cos(x)*l,Math.sin(x)*l)}if(s.closePath(),n>.1){const h=new $t;h.absarc(0,0,n,0,Math.PI*2,!0),s.holes.push(h)}return me(s,t,.04,.04,8)}function Jo(i,e,t,n){const s=[],o=t*24;for(let a=0;a<=o;a++){const l=a/o,c=l*t*Math.PI*2,h=(l-.5)*e;s.push(new _(Math.cos(c)*i,Math.sin(c)*i,h))}const r=new oi(s);return new Yn(r,o,n,8,!1)}function k1(i,e,t,n,s){const o=[];o.push(new _(i,-s,-e*.5));const r=t*20;for(let l=0;l<=r;l++){const c=l/r,h=c*t*Math.PI*2,u=(c-.5)*e;o.push(new _(Math.cos(h)*i,Math.sin(h)*i,u))}o.push(new _(i+s*.85,s*.35,e*.5));const a=new oi(o);return new Yn(a,r+16,n,8,!1)}function En(i,e,t,n){const s=new se,o=new De(i,i*.94,e,18);o.rotateX(Math.PI/2);const r=new w(o,n);r.position.z=e*.5,s.add(r);const a=new Ge({color:1711394,metalness:.6,roughness:.5,clippingPlanes:n.clippingPlanes??void 0}),l=new w(new G(i*1.15,i*.24,.14),a);l.position.z=e+.01;const c=new w(new G(i*.24,i*1.15,.14),a);if(c.position.z=e+.01,s.add(l,c),t>0){const h=new De(i*.52,i*.52,t,14);h.rotateX(Math.PI/2);const u=new w(h,n);u.position.z=-t*.5,s.add(u)}return s}function ms(i,e,t=26,n=.2){const s=[],o=[];return i.traverse(r=>{if(r.isMesh){const a=r;if(s.push(a),a.isInstancedMesh||a.userData.noEdges)return;const l=new Aa(a.geometry,t),c=new It({color:1580068,transparent:!0,opacity:a.userData.edgeOpacity??n,clippingPlanes:e}),h=new Ea(l,c);h.userData.baseOpacity=a.userData.edgeOpacity??n,h.renderOrder=2,a.add(h),o.push(h)}}),{meshes:s,edges:o}}function gs(i,e){i.traverse(t=>{t.userData.partId=e})}function Ls(i,e,t,n,s=0,o=0,r=22,a=48){const l=e*.5,c=[];for(let u=0;u<=r;u++){const d=u/r,f=Math.max(1e-4,d*i),g=d*d,x=l+t*(1-g)+s*g*(1-g);c.push(new ue(f,x))}for(let u=r;u>=0;u--){const d=u/r,f=Math.max(1e-4,d*i),g=d*d,x=-l-n*(1-g)-o*g*(1-g);c.push(new ue(f,x))}const h=new Ya(c,a);return h.rotateX(Math.PI/2),h.computeVertexNormals(),h}const O1={"aperture-mask":{title:"センサー遮光マスク ＆ 防塵ガスケット枠",subtitle:"Optical Aperture Baffle & EPDM Dust-Seal Bezel",category:"01 / 光学開口・迷光制御",summary:"フルサイズ有効撮像面（36.0 × 24.0 mm）の直前に配置され、レンズ通過後の不要な周辺光束と内面多重反射（迷光）を物理的に遮断するとともに、光学フィルター群の周囲を気密防塵シールする最前面フレーム。",opticsAndPhysics:["内縁に精密な段付きナイフエッジ・バッフル形状と低反射マットブラックアルマイト処理（可視光反射率 < 1.5%）を施し、大口径レンズ（F1.2〜F1.4）の斜め入射光がセンサー枠で反射して生じるフレア・ゴーストを抑制。","背面に圧縮率制御された低アウトガスEPDM発泡ガスケットを配置し、シャッター機構やミラーレスマウント側からの微細塵埃・湿気がフィルター間に侵入するのを遮断。","四隅の精密ねじと位置決め基準ピンにより、センサー像面中心に対する開口アライメントを数十ミクロン精度で固定。"],formula:{expression:"R(θ) = [(n₁cosθᵢ − n₂cosθₜ) / (n₁cosθᵢ + n₂cosθₜ)]²  →  < 0.015",description:"微細粗面黒色アルマイトとナイフエッジ勾配により斜め入射の鏡面反射成分を多重散乱吸収。"},nextGenInnovation:"最新のショートフランジバック大口径マウント（RF / Z / E）では像面周辺への最大入射角が30°を超えるため、開口エッジの段差勾配を光線追跡シミュレーションで最適化し、センサーエッジ反射由来のゴーストを劇的に低減している。",specs:[{label:"光学開口寸法",value:"36.6 × 24.6 mm（有効 36×24 mm）"},{label:"基材・表面処理",value:"A6061 艶消し黒アルマイト"},{label:"可視光反射率",value:"< 1.5%（400–700 nm）"},{label:"防塵シール材",value:"低アウトガス EPDM ガスケット"}],diagramType:"baffle"},"sswf-piezo":{title:"超音波ダストリダクション振動板 ＆ 圧電セラミック",subtitle:"Supersonic Wave Filter (SSWF) & PZT Piezoelectric Actuator",category:"02 / 超音波防塵・表面物理",summary:"センサーユニット最前面の超薄型光学ガラス板に積層圧電セラミック（PZT）を接合し、毎秒3万〜7万回の超音波共振で付着した微細塵を物理的に弾き飛ばすアクティブ防塵機構。",opticsAndPhysics:["逆圧電効果：チタン酸ジルコン酸鉛（PZT）に高周波交流電圧を印加すると結晶格子が歪み、薄板光学ガラスに30〜70 kHzの定在波（屈曲振動モード）を励起する。","微粒子の付着力は静電力・ファンデルワールス力・液架橋力が支配的であり、重力の数万倍の加速度が必要。加速度は振動数の2乗に比例するため、数μmの振幅でも数万Gの剥離加速度を発生できる。","表面には透明導電膜（ITO）による帯電防止コートとフッ素系撥水・低表面エネルギー多層ARコートを施し、静電吸着と油分固着を同時に防ぐ。"],formula:{expression:"a_max = A · (2π f)²   (f = 35–70 kHz → a ≈ 10⁴–10⁵ G)",description:"振動加速度は周波数 f の2乗で増大し、数μmの塵のファンデルワールス付着力を上回る慣性力を生成。"},nextGenInnovation:"最新フラッグシップ機では、従来の単一周波数振動から複数共振モードのスイープ駆動＋電源OFF時の保護シャッター連動・帯電防止フッ素コートを組み合わせ、レンズ交換時のダスト付着を極めて高確率で除去する。",specs:[{label:"励起周波数",value:"30,000 – 70,000 Hz（超音波帯）"},{label:"圧電素子材料",value:"積層 PZT (Pb(Zr,Ti)O₃)"},{label:"表面コーティング",value:"フッ素撥水 + ITO帯電防止 + AR膜"},{label:"光学ガラス厚",value:"約 0.50 – 0.55 mm"}],diagramType:"sswf"},"olpf-16pt":{title:"16点ガウス分布・人工水晶光学ローパスフィルター",subtitle:"16-Point Gaussian-Distribution Birefringent Quartz OLPF",category:"03 / 波動光学・空間周波数制御",summary:"人工水晶単結晶の複屈折現象を4層構造で精密に重ね合わせ、入射光1点をガウス分布に近い16点へ微小分離する最新世代の光学ローパスフィルター（アンチエイリアシングフィルター）。",opticsAndPhysics:["結晶光学・複屈折：単軸異方性結晶である人工水晶（SiO₂）は偏光方向によって屈折率が異なる（常光線 n_o = 1.544、異常光線 n_e = 1.553）。光軸に対して傾けた水晶板に光が入射すると、直交する2偏光成分が微小距離 d だけ空間分離する。","ナイキストサンプリング定理：画素ピッチ p のベイヤーセンサーでは、ナイキスト空間周波数 f_N = 1/(2p) を超える高周波パターン（繊維や建築格子など）が折り返し雑音（エイリアシング・カラーモアレ・偽色）として現れる。","従来の2枚構成（4点分離）では高周波域に不要なサイドローブ（再上昇リップル）が残るが、水平・垂直・±45°の4枚複屈折板＋1/4波長位相差板を組み合わせた16点分離により、点拡がり関数（PSF）を理想的なガウス分布へ近づける。"],formula:{expression:"d = t · (n_e² − n_o²) · tanθ / (n_e² + n_o² tan²θ),   MTF(f) = |cos(π d₁ f)| · |cos(π d₂ f)|",description:"水晶厚 t と結晶軸角 θ で分離幅 d₁, d₂ をサブミクロン設計し、ナイキスト以上の高周波サイドローブを急峻に減衰。"},nextGenInnovation:"Canon EOS R1等の最新プロ機で採用された16点ガウス分布型OLPFは、従来の4点分離比で斜め方向の偽色・モアレを約1/4まで低減しつつ、ナイキスト周波数以下の解像MTF低下を最小限に抑える革新的光学設計である。",specs:[{label:"結晶材料",value:"高純度人工水晶単結晶 (α-SiO₂)"},{label:"屈折率 (589 nm)",value:"n_o = 1.544 / n_e = 1.553"},{label:"光束分離構成",value:"4層複屈折板（16点ガウス分離）"},{label:"総積層厚",value:"約 1.35 mm（光学接着ラミネート）"}],diagramType:"olpf16"},"ir-cut-filter":{title:"ハイブリッド赤外線吸収ガラス ＆ 誘電体多層膜IR/UVカット",subtitle:"Cu²⁺ Phosphate IR-Absorption + Dichroic Multilayer Filter",category:"04 / 分光光学・薄膜干渉",summary:"シリコンが持つ近赤外線（700–1100 nm）への強い感度を精密にカットし、センサーの分光感度特性を人間の視覚（比視感度曲線）へ厳密に整合させるハイブリッド分光フィルター。",opticsAndPhysics:["シリコンのバンドギャップエネルギー E_g = 1.12 eV は波長 λ_c ≈ 1107 nm に相当するため、IRカットなしでは近赤外光が赤・緑・青すべてのカラーフィルターを透過し、深刻な色転び（マゼンタ被り）と軸上色収差ボケを引き起こす。","誘電体多層膜（TiO₂ / SiO₂等の40〜60層交互蒸着）はブラッグ光干渉により急峻なカットオフ特性を持つが、広角レンズ周辺で斜め入射角 θ が大きくなるとカットオフ波長が短波長側へシフトする（ブルーシフト現象）。","そこで、銅イオン（Cu²⁺）の電子遷移吸収を利用し入射角依存性がゼロの「リン酸塩系青色赤外吸収ガラス」と「誘電体多層干渉膜」を組み合わせることで、画面中央から最周辺まで均一かつ正確な色再現を実現する。"],formula:{expression:"λ(θ) = λ₀ · √[1 − (sinθ / n_eff)²]  （干渉膜の入射角シフト）",description:"吸収型ガラス（ランベルト・ベール則 I = I₀e⁻ᵅᵈ）とのハイブリッド化で広角周辺の色被りを解消。"},nextGenInnovation:"ショートフランジバックのミラーレス光学系向けに、大入射角（30°超）でも色シフトが極めて小さい高屈折率多層膜＋超低反射広帯域ARコートと、薄型高濃度Cu²⁺吸収ガラスの複合設計が主流となっている。",specs:[{label:"可視光透過帯域",value:"420 – 650 nm（平均透過率 > 96%）"},{label:"半値カットオフ波長",value:"λ₅₀ ≈ 650 ± 5 nm / UV < 395 nm"},{label:"近赤外遮断率",value:"OD > 4（720 – 1100 nm で < 0.01%）"},{label:"ガラス基材",value:"Cu²⁺含有リン酸塩ガラス + 誘電体多層膜"}],diagramType:"ircut"},"cover-glass":{title:"低α線光学カバーガラス ＆ コバール気密封止リング",subtitle:"Low-Alpha Borosilicate Cover Glass & Kovar Hermetic Seal",category:"05 / 半導体実装・環境保護",summary:"セラミックパッケージ上面を気密封止し、シリコンダイ表面の繊細なマイクロレンズと金ワイヤーボンディングを湿気・塵・自然放射線から隔離保護する光学窓。",opticsAndPhysics:["低α線（Low-Alpha）ガラス：通常の光学ガラスに極微量含まれるウラン・トリウム系放射性同位体が崩壊する際に放出するα線（エネルギー数 MeV）は、直下のシリコン内に数十万個の電子-正孔対を突発生成し、長時間露光時の白点ノイズやソフトエラーの原因となる。超高純度精製によりα線放出率を極小化している。","両面に反射率 0.2% 以下の多層無反射（AR）コーティングを施し、シリコン表面とカバーガラス裏面間での往復反射（センサーゴースト）を抑制。","シールリングに熱膨張係数がアルミナセラミックおよびホウケイ酸ガラスと整合するコバール合金（Fe-29Ni-17Co）を採用し、内部キャビティに乾燥窒素（N₂）を封入して低温結露を防止。"],formula:{expression:"CTE: Si (2.6) ≈ Borosilicate (3.3) ≈ Kovar (5.1) ≈ Al₂O₃ (6.8) [ppm/K]",description:"異種材料間の熱膨張係数（CTE）整合により、−20℃〜+85℃の環境変化でも像面歪みとクラックを防止。"},nextGenInnovation:"最新の大型フルサイズパッケージでは、カバーガラスの平坦度（ウェーブフロント誤差 λ/4 以下）と極めて薄い接着ボンドライン制御により、バックフォーカス長と像面湾曲誤差を数ミクロン以内に抑制している。",specs:[{label:"ガラス材質",value:"低α線高純度ホウケイ酸光学ガラス"},{label:"α線放出率",value:"< 0.002 counts / (cm²·h)"},{label:"封止枠材質",value:"コバール合金（Fe-Ni-Co）+ Ni/Auめっき"},{label:"可視光透過率",value:"> 99.2%（両面広帯域ARコート）"}],diagramType:"coverglass"},"cmos-die":{title:"フルサイズ3層積層グローバルシャッター BSI-CMOS ダイ",subtitle:"3D-Stacked Global Shutter + 2-Layer Transistor Pixel Silicon Die",category:"06 / 光電変換・最先端3D半導体",summary:"36.0 × 24.0 mm の有効撮像面に数千万個の光電変換画素を高密度集積したカメラの心臓部。画素層・高速ADC/ロジック層・超高速DRAM層の3ウェハーをCu-Cu直接接合で3次元積層した最新世代アーキテクチャ。",opticsAndPhysics:["内部光電効果：入射光子のエネルギー E = hν = hc/λ がシリコンのバンドギャップ E_g = 1.12 eV を超えると、価電子帯から伝導帯へ電子が励起され、入射光子数に厳密比例した電子-正孔対を生成する。","裏面照射（BSI）＋2層トランジスタ画素：シリコン基板を約3 μmまで裏面研削して配線層の影をなくし、さらにフォトダイオードと画素トランジスタを別層シリコンへ分離積層することで飽和電子量（FWC）を大幅に拡大。","グローバルシャッター（全画素同時露光）：全画素に遮光メモリノードを内蔵し、全画素一斉に露光開始・終了・転送を実行。従来のローリングシャッターで生じる動体歪み（コンニャク現象）とフラッシュ同調速度制限を物理的に撤廃する。","※下部ドックのミクロ切替アイコンから、このダイ内部のナノスケール画素3D断面を詳細解剖できます。"],formula:{expression:"E_photon = hc / λ > E_g(Si) = 1.12 eV   ⇒   N_e = η(λ) · Φ · A · t_exp",description:"量子効率 η(λ)、光子束 Φ、画素面積 A、露光時間 t_exp の積が生成光電子数 N_e を決定する。"},nextGenInnovation:"2024〜2026年のフラッグシップ技術（Sony α9 IIIのフルサイズ・グローバルシャッター120fps／1/80,000秒全速フラッシュ同調、Canon EOS R1のクロスタイプDual Pixel CMOS AF、2層トランジスタ画素＋LOFIC広ダイナミックレンジ技術）を統合した次世代3D積層ダイ構造。",specs:[{label:"有効撮像サイズ",value:"36.0 × 24.0 mm（35mmフルサイズ）"},{label:"積層構造",value:"3層3D積層（BSI画素 / ADCロジック / DRAM）"},{label:"露光方式",value:"全画素同時電子グローバルシャッター"},{label:"ウェハー間接合",value:"Cu-Cu ダイレクトハイブリッドボンディング"}],diagramType:"stacked_die"},"wire-bonds":{title:"超高密度 99.99% 純金 低ループ・ワイヤーボンディング",subtitle:"4N Au Ultra-Low-Loop Thermosonic Wire Bond Array",category:"07 / マイクロ電気実装",summary:"シリコンダイ外周に並ぶ数百個のアルミ／金電極パッドと、セラミックパッケージ内部の段付きシェルフ電極を電気的に接続する直径約25 μmの超高純度金（4N Au）ワイヤー群。",opticsAndPhysics:["サーモソニック接合：約150〜200℃の加熱と超音波振動（60–120 kHz）および加圧を同時に与え、金ボールとアルミパッド界面に金属間化合物（Au-Al拡散層）を形成して強固なオーミック接触を実現。","寄生インダクタンス最小化：高速差動信号（SLVS-EC 10 Gbps級）や瞬時大電流（グローバルシャッター一斉転送時のパルス電流）では、ワイヤーの寄生インダクタンス L による電源ドロップ ΔV = L(di/dt) がノイズ源となるため、極限まで短い超低ループ（高さ55–80 μm）設計が不可欠。","隣接する電源・グラウンドワイヤーを交互配置（GSG: Ground-Signal-Ground）することでリターンパスを最短化し、高周波クロストークとEMI放射を抑制。"],formula:{expression:"ΔV_noise = L_wire · (dI / dt),   L ≈ (μ₀ l / 2π) · [ln(2l / r) − 0.75]",description:"ワイヤー長 l を短縮し並列グラウンド本数を増やすことで同時スイッチングノイズ（SSN）を激減。"},nextGenInnovation:"全画素同時露光や120fps読み出しに伴う急峻な過渡電流を安定供給するため、段付きセラミックシェルフと超低ループボンディング（場合によっては大電流ピンへの複数並列ボンド／フリップチップ併用）が採用されている。",specs:[{label:"ワイヤー材質・純度",value:"99.99% 純金（4N Au）"},{label:"線径 / ループ高",value:"φ 20–25 μm / 低ループ 55–80 μm"},{label:"接続方式",value:"熱圧着超音波（サーモソニック）接合"},{label:"ピン構成",value:"GSG 差動高速信号 + 多系統分離電源"}],diagramType:"wirebond"},"ceramic-package":{title:"高剛性アルミナ12層 HTCC セラミック LGA パッケージ",subtitle:"High-Flatness HTCC Alumina Ceramic Cavity Package & CuW Slug",category:"08 / 精密パッケージ・平坦度維持",summary:"フルサイズ大判シリコンダイをミクロン単位の平坦度で支え、3次元多層配線と高効率背面放熱を担う高温同時焼成アルミナセラミック（HTCC）キャビティパッケージ。",opticsAndPhysics:["光学像面平坦度：大口径 F1.2 レンズの焦点深度（DoF）はセンサー面上でわずか数ミクロンしかない。樹脂基板では吸湿・熱膨張で数十μm反ってしまうため、ヤング率 約310 GPa の極めて高剛性なアルミナ（Al₂O₃）セラミックが必須となる。","3次元多層配線：10〜15層のアルミナグリーンシート間にタングステン／モリブデン導体パターンを印刷し一体焼成することで、上面ワイヤーボンド棚から背面LGA（Land Grid Array）金めっきパッド群へ低インピーダンス・等長配線を引き回す。","サーマルスラグ：ダイ直下のキャビティ底面に、シリコンに近い低熱膨張かつ高熱伝導（~200 W/m·K）のタングステン-銅複合合金（CuW）ヒートスラグを埋め込み、ダイ発熱を即座に背面へ逃がす。"],formula:{expression:"δ_focus ≈ ±2 · F · c_blur  (F1.2 で焦点深度はわずか ±5–8 μm)",description:"パッケージ全体の反りを数μm以下に抑える高平坦焼成技術が画面四隅のシャープネスを保証する。"},nextGenInnovation:"最新世代のセラミックパッケージは無研磨高平坦焼成技術により、研磨加工由来のセラミック微粉（ダスト発生源）を根本排除し、クリーンルーム組立歩留まりと長期信頼性を飛躍的に高めている。",specs:[{label:"セラミック基材",value:"高強度アルミナ HTCC（12層一体焼成）"},{label:"平坦度 / ヤング率",value:"< 5 μm（36×24 mm域） / ~310 GPa"},{label:"背面放熱スラグ",value:"タングステン-銅合金（CuW）"},{label:"表面電極めっき",value:"電解 Ni / Au 金めっき LGA パッド"}],diagramType:"ceramic_pkg"},"sensor-pcb":{title:"高多層センサーリジッド基板 ＆ 分離アナログ電源回路網",subtitle:"High-Density Build-Up Sensor PCB & Ultra-Low-Noise Power Stage",category:"09 / 低ノイズ電源・信号整合",summary:"セラミックLGAパッケージを実装し、極めて清浄なアナログ電源供給、水晶基準クロック生成、および100 Gbps級高速差動データ伝送のインピーダンス整合を担うセンサー直結基板。",opticsAndPhysics:["アナログ／デジタル電源の厳密分離：画素フォトダイオード駆動（2.8V）およびアナログADC基準電源（2.2V）に微小なリップルが混入すると、画像全体に横縞ノイズ（バンディング）が発生する。超高PSRR（電源電圧変動除去比）の専用LDOレギュレータと数十個のMLCC（積層セラミックコンデンサ）をダイ直下に配置し、高周波インピーダンスを極小化。","高速差動等長配線：SLVS-EC差動信号ペアの特性インピーダンスを 100 Ω ±5% に制御し、蛇行（メアンダ）パターンで配線長をサブミリ単位で揃えることでスキュー（位相差）を排除。","サーマルビアアレイ：基板中央のパッケージ直下に高密度の銅めっきサーマルビア貫通穴を配列し、センサーの発熱を背面の放熱パッド・Σ字型グラファイトシートへ直通させる。"],formula:{expression:"Z_diff = 2 Z₀ (1 − k_coupling) = 100 Ω,   PSRR = 20 log₁₀(ΔV_in / ΔV_out)",description:"差動特性インピーダンス整合と高PSRR電源設計が、暗部16bit相当の低ノイズ階調を支える。"},nextGenInnovation:"120fpsフルサイズRAWや8K 60p RAW出力ではセンサー消費電力が数ワットに達するため、低ESR薄膜コンデンサと多層厚銅グラウンドプレーンを併用し、高速スイッチング時の電圧降下と発熱の双方を抑えている。",specs:[{label:"基板構造",value:"8〜10層 高密度ビルドアップ（FR-4高Tg材）"},{label:"分離電源系統",value:"Analog 2.8V / 2.2V, Digital 1.2V, I/O 1.8V"},{label:"差動インピーダンス",value:"100 Ω 制御（等長メアンダ配線）"},{label:"直近バイパス",value:"超小型 0402/0201 MLCC アレイ実装"}],diagramType:"sensor_pcb"},"slvs-fpc":{title:"SLVS-EC v3 超高速シールド・フレキシブル伝送基板",subtitle:"Impedance-Controlled SLVS-EC v3 U-Loop Shielded Flex Harness",category:"10 / 超高速インターフェース・可動配線",summary:"5軸IBISで空中浮上・高速移動するセンサー基板と、固定されたメイン画像処理エンジン基板を繋ぐ、超低剛性U字ループ構造の高速シールドフレキシブル基板（FPC）。",opticsAndPhysics:["SLVS-EC（Scalable Low-Voltage Signaling with Embedded Clock）：ソニー開発の次世代イメージセンサー規格。200 mVの極めて低いコモンモード電圧振幅と 8b/10b エンベデッドクロック符号化により、外部クロック線を廃しレーン間スキュー問題を解消。1レーン最大 9.216〜10.0 Gbps × 8〜16レーンで 100 Gbps超の圧倒的帯域を実現。","U字ループ低復元剛性設計：IBISがサブミクロン精度でセンサーを動かす際、ケーブルの曲げ反力（バネ定数 k）とヒステリシスは外乱トルクになる。ポリイミド基材を左右対称に大きくU字湾曲させることで可動反力を極限まで減らし、数億回の微小屈曲疲労にも耐える。","EMI電磁シールドフィルム：高速差動信号から周囲の無線回路やアナログ回路への放射ノイズを抑えるため、極薄導電シールド層をラミネート。"],formula:{expression:"Throughput = N_lanes × R_baud × (8/10)  ⇒  16 × 10 Gbps × 0.8 = 128 Gbps",description:"200 mV 低振幅差動伝送により高速転送と低消費電力・低EMIを両立。"},nextGenInnovation:"従来のSub-LVDS（~0.6 Gbps/lane）の約16倍に達するSLVS-EC v3の超広帯域により、フルサイズ24–50MPセンサーからの120fps連写RAWや8K 60p 12/14bit RAWのリアルタイム無圧縮転送が可能となった。",specs:[{label:"伝送規格",value:"SLVS-EC v3（8b/10b 埋込クロック）"},{label:"レーン速度 / 振幅",value:"最大 10.0 Gbps/lane / 200 mV 差動"},{label:"基材・シールド",value:"ポリイミド（カプトン）+ 極薄EMI遮蔽膜"},{label:"機械形状",value:"左右対称 U字低剛性フレキシャルループ"}],diagramType:"slvs_fpc"},"ibis-carrier":{title:"5軸IBIS可動マグネシウムステージ ＆ 平面ボイスコイル / ホールIC",subtitle:"5-Axis IBIS Movable Carrier, Air-Core Flat Voice Coils & Hall Sensors",category:"11 / 電磁気アクチュエータ・精密制御",summary:"イメージセンサー全体を光軸直交平面内で自由自在に駆動する軽量高剛性マグネシウム可動ステージ。3基の空芯平面銅ボイスコイルと3基のホール効果磁気位置センサーを搭載する。",opticsAndPhysics:["ローレンツ力駆動（VCM）：対向配置された固定ネオジム磁石の均一磁束密度 B 中に配置された空芯コイルへ制御電流 I を流すと、フレミングの左手の法則に従うローレンツ力 F = I(L × B) が瞬時に発生。ギアも摩擦バックラッシュも一切ないダイレクトドライブを実現。","3自由度による5軸補正：下辺の2基のY軸コイル（同相駆動でY並進、逆相駆動でRoll回転 θ_z）と右辺のX軸コイル1基により、X・Y・Rollの3自由度を独立制御。焦点距離に応じた微小並進でPitch・Yaw角度ブレを光学的に打ち消し、レンズIS協調も含め5軸最大8.5段補正を達成。","ホール効果フィードバック：各コイル中心のホール素子ICが磁束密度の勾配から現在位置をホール電圧 V_H = (I·B)/(n·e·t) としてサブミクロン分解能で検出し、毎秒数千回のPIDクローズドループサーボ制御を実行。"],formula:{expression:"F = N · I · (L × B),     V_H = (I_sense · B(x,y)) / (n · e · t)",description:"電流に厳密線形比例するローレンツ力と、非接触ホール位置検出によるゼロ・バックラッシュ制御。"},nextGenInnovation:"同じサブミクロン精密アクチュエータを応用し、センサーを0.5画素または1画素ずつ厳密にシフトさせて4〜16枚合成する「ピクセルシフトマルチショット（超高解像・真RGB色再現）」や、星景追尾（アストロトレーサー）も実現している。",specs:[{label:"ステージ材質",value:"トポロジー肉抜き マグネシウム合金ダイキャスト"},{label:"駆動方式",value:"3軸独立 空芯平面ボイスコイルモーター (VCM)"},{label:"位置検出精度",value:"ホール効果センサー × 3（サブμm分解能）"},{label:"手ぶれ補正性能",value:"5軸補正 最大 8.5段（CIPA規格準拠）"}],diagramType:"ibis_vcm"},"ceramic-balls":{title:"3点窒化ケイ素セラミックボール ＆ 磁気プリロード懸架機構",subtitle:"Kinematic 3-Point Si₃N₄ Ceramic Ball Bearings & Magnetic Preload",category:"12 / キネマティック機械力学",summary:"可動センサーキャリアを光軸方向（Z軸）の傾き・ガタ一切ゼロのまま、XY並進およびRoll回転方向へ超低摩擦で滑らせる3点支持キネマティック・ボールベアリング機構。",opticsAndPhysics:["キネマティック3点平面拘束：空間内の平面は一直線上にない3点で一意かつ過剰拘束なく決定される。4点支持では微小な高さ誤差でガタやこじりが生じるが、3個の超精密セラミック球（真球度 0.1 μm級）で支えることで完全な平面追従を実現。","窒化ケイ素（Si₃N₄）セラミック球：非磁性（ネオジム磁石の強磁場に吸着されない）、超軽量、高硬度（ビッカース硬度 ~1500 HV）、低摩擦係数、かつ無潤滑でも焼き付かないため、光学室内の油分飛散リスクを排除できる。","磁気プリロード（予圧）：固定側ネオジム磁石と可動側の強磁性軟鉄プレート間の吸引力を利用して、可動ステージを常に一定荷重で3個のセラミック球へ押し付け、カメラをどの姿勢（縦位置・上向き・下向き）に向けても焦点面のZ軸ズレ（片ボケ）をゼロに保つ。"],formula:{expression:"F_friction = μ_roll · F_preload   (μ_roll ≈ 0.001,  ΔZ_tilt < 1 μm)",description:"磁気予圧でZ軸剛性を確保しつつ、点接触転がり摩擦によってX/Y/Rollの応答性を極大化。"},nextGenInnovation:"最新の8.5段クラスIBISでは、ボール転動面の焼入れステンレスレースの鏡面粗さ管理と磁気予圧の重心バランス最適化により、カメラを激しく振り回した際の慣性モーメントによる像面チルトまで極限抑制している。",specs:[{label:"ボール材質",value:"窒化ケイ素ファインセラミック (Si₃N₄)"},{label:"支持構成",value:"キネマティック 3点平面拘束（非磁性）"},{label:"予圧方式",value:"磁気吸引プリロード（強磁性プレート）"},{label:"光軸チルト誤差",value:"< 1.0 μm（全ストローク域）"}],diagramType:"ceramic_balls"},"ibis-base-magnets":{title:"IBIS固定ベースシャーシ ＆ N52ネオジム閉磁気回路ヨーク",subtitle:"Stationary Base Chassis, N52 NdFeB Magnet Yokes & Flange Calibrators",category:"13 / 磁気回路設計・像面校正",summary:"カメラ本体フレームへ固定され、ボイスコイルに強力な磁場を与える2極着磁ネオジム磁石・軟鉄ヨーク群、およびフランジバック距離をミクロン校正する3点スプリング調整機構。",opticsAndPhysics:["閉磁気回路（Closed Magnetic Circuit）：最強クラスの希土類永久磁石であるN52グレード・ネオジム鉄ボロン磁石（Nd₂Fe₁₄B、残留磁束密度 ~1.43 T）を2極（N/S）隣接配置し、背面を高透磁率の軟磁性鉄バックヨークで短絡する。これにより磁束をコイル空隙へ集中させて推力定数を最大化しつつ、センサー回路への漏洩磁束を防ぐ。","3点フランジバック調整機構：レンズマウント基準面からイメージセンサー撮像面までの距離（フランジバック、例：18.0 mm / 20.0 mm / 16.0 mm）と平行度（アオリ誤差）を、3箇所のヘリカル圧縮ばね＋精密微調ねじを用い、工場のレーザー干渉計でミクロン精度にキャリブレーションする。","高剛性マグネシウム合金シャーシにより、シャッター衝撃や落下Gに対してもベース平面の塑性変形を防ぐ。"],formula:{expression:"B_gap = B_r · (l_m / (l_m + μ_r · l_gap)),    Φ_leak → min (高透磁率ヨーク)",description:"軟鉄ヨークで磁気抵抗 R_m を低減し、ボイスコイルを貫く有効磁束密度 B_gap を高効率化。"},nextGenInnovation:"近年の高画素・大口径化（F1.2 / 50–61MP）に伴い、IBISベース自体をボディのマグネシウムメインダイキャストと強固に直結し、さらに電源OFF時には電磁ブレーキまたはメカニカルロックで可動部を安全に保持する設計が標準化している。",specs:[{label:"永久磁石グレード",value:"N52 ネオジム磁石 (Nd₂Fe₁₄B, ~1.43 T)"},{label:"ヨーク材質",value:"高透磁率軟磁性鋼板（SPCC / パーマロイ）"},{label:"フランジバック調整",value:"3点ヘリカルばね＋レーザー干渉計校正"},{label:"フレーム材質",value:"高剛性マグネシウム合金ダイキャスト"}],diagramType:"magnet_yoke"},"sigma-graphite":{title:"Σ字型高熱伝導グラファイトシート ＆ 銅ヒートスプレッダー",subtitle:"Sigma-Shaped Pyro-Graphite Thermal Bridge & Copper Heat Spreader",category:"14 / 伝熱工学・暗電流ノイズ抑制",summary:"IBISで空中浮上しているセンサーの発熱を、手ぶれ補正の微細な動きを一切阻害せずにカメラ本体シャーシ側へ高速輸送する、最新フラッグシップ特有のΣ（シグマ）字型グラファイト放熱システム。",opticsAndPhysics:["温度と暗電流（Dark Current）：シリコン半導体内部では熱励起によって光がなくても電子が発生する（暗電流）。この暗電流はセンサー温度が約6〜8℃上昇するごとに約2倍に指数増加するため、放熱性能は高感度画質と8K動画連続録画時間に直結する。","異方性人工グラファイトシート（PGS）：sp²結合の炭素六角網面が高度に配向した人工黒鉛シートは、面内方向の熱伝導率が 1,500〜1,700 W/(m·K) に達する（純銅 400 W/(m·K) の約4倍、アルミの約7倍）。","Σ字型フレキシブル熱橋：センサー背面PCBから高熱伝導シリコーンTIMパッドで熱を吸い上げ、独特のΣ（シグマ）字型に折り畳んだ極薄グラファイトシートを経由して固定側純銅ヒートスプレッダーへ放熱。バネ定数が極めて低いためIBIS駆動を妨げず、約5倍の放熱効率を実現する。"],formula:{expression:"I_dark(T) ∝ T^(3/2) · exp(−E_g / 2k_B T),     q = −k_∥ · A · (dT / dx)",description:"フーリエの熱伝導則（k_∥ ≈ 1600 W/m·K）でセンサー温度上昇 ΔT を抑え、熱雑音（暗電流）の指数増加を抑制。"},nextGenInnovation:"Sony α7S III / α9 III / α1 II / α7 V 等の最新ミラーレスで確立されたΣ字型グラファイト熱橋は、防塵防滴の密閉ボディ内部で「IBIS完全フローティング」と「長時間の8K/4K 120p録画」という二律背反をブレイクスルーした象徴的熱設計である。",specs:[{label:"グラファイト面内熱伝導率",value:"1,500 – 1,700 W/(m·K)（銅の約4倍）"},{label:"熱橋構造",value:"低剛性 Σ（シグマ）字型フレキシブルベンド"},{label:"界面材 / 放熱板",value:"シリコーンTIMパッド + 純銅ヒートスプレッダー"},{label:"暗電流倍増温度",value:"約 +6〜8 ℃ ごとに暗電流 2 倍"}],diagramType:"sigma_graphite"}},B1={"micro-ocl":{title:"ギャップレス非球面オンチップマイクロレンズ",subtitle:"Gapless Aspheric On-Chip Microlens Array (OCL)",category:"M1 / ナノ集光光学",summary:"全画素の直上に隙間なく（ギャップレスに）敷き詰められたマイクロメートル級の非球面樹脂・酸化膜レンズ。入射光束をフォトダイオード中心部へ効率よく絞り込む。",opticsAndPhysics:["実効開口率100%化：隣接するマイクロレンズ間のデッドスペース（隙間）をゼロにした矩形ベース非球面プロファイルにより、画素に入射した光子を余すことなく受光部へ集光する。","シュリンク／シフト設計（主光線角 CRA 補正）：画面周辺の画素ではレンズからの主光線が斜め（最大30°超）に入射するため、マイクロレンズ中心を光軸中心側へサブミクロン単位でオフセット（シフト）させ、周辺減光と色シェーディングを防ぐ。","Dual Pixel / Cross-type AF における瞳分割：1つのマイクロレンズが撮影レンズの射出瞳を左右（または上下）に分離し、直下の2分割フォトダイオードへ別々の光束を結像させる。"],formula:{expression:"n₁ sinθ₁ = n₂ sinθ₂   (Δx_shift = h · tan(CRA / n_lens))",description:"スネルの法則に基づき、像高に応じた主光線角 CRA に対してレンズ中心シフト量 Δx を最適化。"},nextGenInnovation:"最新のCross-type Dual PixelやQuad Pixelセンサーでは、縦横両方向の位相差検出精度を均質化するため、球面収差を抑えた超高精度非球面OCLと最適化屈折率ポリマーが採用されている。",specs:[{label:"レンズ形状",value:"ギャップレス矩形ベース非球面ドーム"},{label:"画素ピッチ代表値",value:"3.6 – 5.9 μm（フルサイズ 24–60MP）"},{label:"屈折率",value:"n ≈ 1.52 – 1.60（可視光低分散樹脂/SiN）"},{label:"光学機能",value:"高効率集光 ＆ 瞳分割位相差AF光学系"}],diagramType:"microlens"},"micro-cfa":{title:"ベイヤー RGGB カラーフィルター ＆ タングステン光導波路",subtitle:"Bayer RGGB Color Filter Array & Tungsten Metal Light-Guide Grid",category:"M2 / 分光分解・光学クロストーク遮断",summary:"マイクロレンズを通過した白色光を赤（R）・緑（G1, G2）・青（B）の3原色に波長分解する有機顔料フィルター層と、隣接画素への斜め光漏れを防ぐ微細金属光導波路グリッド。",opticsAndPhysics:["ベイヤー配列（RGGB）：人間の網膜の錐体細胞が輝度・解像感に最も敏感な緑波長（~550 nm）に高い感度を持つ生理光学に基づき、2×2画素中に緑を2個、赤・青を各1個配置する。","金属光導波路（Metal Grid）：画素ピッチが微細化すると斜め入射光が隣の色のフィルターを斜めに通り抜けて混色（光学クロストーク）を起こす。各フィルター境界に幅 100 nm 級のタングステン（W）反射隔壁を立てることで光を全反射ガイドし、色純度と量子効率を劇的に高める。","高透過ナノ顔料分散レジストにより、分光オーバーラップを抑えつつ透過損失を最小化。"],formula:{expression:"T_c(λ) = exp[−α_c(λ) · d_CFA],   c ∈ {R(610nm), G(540nm), B(460nm)}",description:"各色有機顔料の波長吸収係数 α_c(λ) と精密薄膜厚 d_CFA によりsRGB/BT.2020色空間に整合する分光透過率を形成。"},nextGenInnovation:"最新センサーではカラーフィルター下端のタングステン光導波路と直下のFTI深溝分離壁を垂直一致させることで、F1.2超大口径レンズの極端な斜め光束でも混色と偽色を極限まで抑制する。",specs:[{label:"色配列",value:"RGGB ベイヤー原色フィルター"},{label:"隔壁構造",value:"タングステン（W）金属光導波路グリッド"},{label:"フィルター膜厚",value:"約 0.5 – 0.8 μm"},{label:"色分離効果",value:"隣接画素クロストーク < 2%"}],diagramType:"bayer_cfa"},"micro-bsi-ar":{title:"BSI 裏面反射防止ピラミッドナノ構造 ＆ 遮光枠",subtitle:"Back-Side Anti-Reflection Moth-Eye Nanostructure & HfO₂ Passivation",category:"M3 / ナノフォトニクス・界面反射抑制",summary:"屈折率の高いシリコン裏面界面でのフレネル反射損失を極小化するため、入射波長より小さいナノスケールのピラミッド凹凸と高誘電率パッシベーション膜を形成した光捕捉界面。",opticsAndPhysics:["屈折率不整合の克服：シリコンの可視光屈折率は n_Si ≈ 3.8–4.5 と極めて高いため、平坦な界面では入射光の約30%以上が表面反射で失われてしまう。","モスアイ（蛾の目）ピラミッドナノ構造：シリコン裏面に波長（400–700 nm）より微細な周期のピラミッド凹凸をエッチング形成することで、実効屈折率が連続的に変化する傾斜屈折率層として機能し、広帯域・広角度で反射率をほぼゼロへ抑え込む。","負固定電荷パッシベーション膜（HfO₂ / Al₂O₃）：シリコン表面のダングリングボンドを正孔蓄積層で終端し、界面準位由来の暗電流と白点欠陥を劇的に低減。"],formula:{expression:"R_flat = [(n_Si − n_CFA) / (n_Si + n_CFA)]² ≈ 24%  →  R_nano < 1%",description:"サブ波長ピラミッド構造と高k誘電体多層膜が界面反射を激減させ、特に長波長（赤・近赤外）の量子効率を向上。"},nextGenInnovation:"ナノピラミッド構造は反射防止だけでなく光をシリコン内部で斜め方向へ回折させる効果（光路長延長）も持つため、薄い3 μmのBSIシリコン層でも吸収係数の小さい赤色光（650 nm）を極めて高い量子効率（QE > 80%）で捕獲できる。",specs:[{label:"ナノ構造形状",value:"サブ波長 逆ピラミッド／モスアイ凹凸"},{label:"界面保護膜",value:"ALD成膜 HfO₂ / Ta₂O₅ 負固定電荷膜"},{label:"界面反射損失",value:"< 1.0%（可視光全帯域）"},{label:"実効量子効率 (Peak QE)",value:"約 80 – 88%（530 nm 付近）"}],diagramType:"bsi_ar"},"micro-pd-cross":{title:"BSI フォトダイオード ＆ クロスタイプ Dual Pixel 分割構造 ＋ FTI",subtitle:"BSI Pinned Photodiode, Cross-Type Dual Pixel AF & Full Trench Isolation",category:"M4 / 量子光電変換・像面位相差AF",summary:"入射光子を電子へ変換して蓄積する埋め込み型フォトダイオード（PPD）層。全画素を左右または上下に2分割した「クロスタイプDual Pixel」構造と、画素間を貫通隔離するFTI深溝分離壁を備える。",opticsAndPhysics:["埋め込み型フォトダイオード（PPD）：p+ / n / p の3層接合により空乏層ポテンシャル井戸をシリコン内部に埋め込み、表面欠陥から電子を隔離。完全電荷転送（残像ゼロ）と極低暗電流を実現。","クロスタイプ Dual Pixel 像面位相差AF：従来の左右分割のみでは横縞パターンやネット越しの被写体で位相差検出が困難だった。最新構造では左右分割画素（縦線検出）と上下分割画素（横線検出）を高密度配置し、撮像面全域100%で縦横クロス測距を実現。露光時はA+Bの電荷を加算して1画素の画像信号として無損失利用する。","Full Trench Isolation（FTI）：シリコン層を裏面から貫通する深溝をSiO₂酸化膜と金属遮光コアで充填し、隣接画素への光学クロストークと電子拡散（ブルーミング）を完全遮断。"],formula:{expression:"Δz_defocus ∝ (f / D) · Δx_phase(A, B),    σ_shot = √N_e（光子ショットノイズ）",description:"分割PD A/B間の像位相差 Δx から瞬時にデフォーカス量 Δz を算出し、1フレーム内で高速合焦。"},nextGenInnovation:"Canon EOS R1で世界初実用化された撮像面クロスタイプDual Pixel AFと、2層トランジスタ画素向けFTIによる光電変換体積の最大化（飽和電子量向上）を融合した最先端フォトダイオードアーキテクチャ。",specs:[{label:"シリコン光電変換厚",value:"約 3.0 – 4.0 μm（裏面研削 BSI 層）"},{label:"AF検出構造",value:"縦横2分割 クロスタイプ Dual Pixel"},{label:"画素間分離技術",value:"貫通型 Full Trench Isolation (FTI)"},{label:"飽和電子量 (FWC)",value:"約 80,000 – 120,000 e⁻（フルサイズ級）"}],diagramType:"cross_pd"},"micro-2layer-gs":{title:"2層トランジスタ画素 ＆ グローバルシャッター遮光メモリ ＋ LOFIC",subtitle:"2-Layer Transistor Pixel, Shielded GS Memory Node & LOFIC Capacitor",category:"M5 / 3D逐次積層・グローバルシャッター・超広DR",summary:"フォトダイオードとは完全に別のシリコン層に画素トランジスタ群・グローバルシャッター遮光メモリノード・LOFICオーバーフロー容量を3次元積層する、最新世代センサーのブレイクスルー層。",opticsAndPhysics:["2層トランジスタ画素（3D逐次積層）：従来はフォトダイオードの隣に並べていた増幅・リセット・選択トランジスタを直下の独立シリコン層へ分離。上層を100%フォトダイオード専用にできるだけでなく、下層の増幅トランジスタ（Source Follower / FinFET）を大型化でき、暗部のランダムテレグラフノイズ（RTN）を劇的に削減する。","単一垂直転送ゲート（SVG）＆ 遮光メモリノード（MEM）：全画素一斉に垂直ゲートを開き、フォトダイオードの電子をタングステン遮光キャップで完全に覆われたメモリノードへ一瞬で退避（グローバルシャッター）。これにより歪みゼロの1/80,000秒電子シャッターが可能となる。","LOFIC（横方向オーバーフロー積分容量）＆ DCG（デュアル変換ゲイン）：暗部では小さなフローティングディフュージョン容量で高変換ゲイン（超低ノイズ）読み出しを行い、明部でフォトダイオードから溢れた電子は高密度MIMキャパシタ（LOFIC）へ取り込んで低変換ゲイン読み出しすることで、1回の露光で 100 dB（16 stops）超のダイナミックレンジを実現。"],formula:{expression:"ΔV_FD = (q · N_e) / C_FD,    DR = 20 log₁₀[(Q_PD + Q_LOFIC) / N_read_HCG] > 100 dB",description:"HCG（小容量 C_FD で高感度低ノイズ）と LCG+LOFIC（大容量で白飛び耐性）の融合による次世代広DR。"},nextGenInnovation:"2023〜2026年にかけソニー・キヤノン・各半導体研究機関で急速に進化した「2層トランジスタ画素（LYTIA系技術）」「フルサイズ・グローバルシャッター（α9 III）」「トリプルゲイン/LOFIC HDR」の3大革新を集約した画素回路層。",specs:[{label:"積層プロセス",value:"3D逐次集積（PD層 / トランジスタ層分離）"},{label:"転送・接続構造",value:"単一垂直ゲート (SVG) + 埋込接続 (BSC)"},{label:"シャッター記憶素子",value:"タングステン完全遮光メモリノード (MEM)"},{label:"広DR技術",value:"Dual Conversion Gain (DCG) + LOFIC容量"}],diagramType:"two_layer_gs"},"micro-cucu":{title:"Cu-Cu ダイレクトハイブリッドボンディング接合界面",subtitle:"Fine-Pitch Cu-Cu Direct Hybrid Bonding Interconnect Interface",category:"M6 / 3次元ウェハー直接接合",summary:"上層の画素ウェハーと下層のロジック／ADCウェハーを、外周の貫通電極（TSV）ではなく撮像領域直下の数百万個の微細銅（Cu）パッド同士で直接分子接合する最先端3D実装界面。",opticsAndPhysics:["ハイブリッドボンディング原理：両ウェハー表面の酸化膜（SiO₂）と埋め込み銅パッドを化学機械研磨（CMP）で原子レベルの平坦度（粗さ < 0.5 nm）に仕上げ、室温でSiO₂同士をファンデルワールス力で仮接合した後、低温アニール（~200–300℃）によって銅の熱膨張でCu-Cu同士を強固に金属拡散接合させる。","超短距離・超並列垂直配線：従来のチップ外周TSVでは数センチの水平配線引き回しによるRC遅延と寄生容量がボトルネックだったが、画素または小ブロック直下を数μmピッチで垂直接続することで、全画素並列読み出し・超低消費電力を達成。","設計自由度の飛躍：画素ウェハーには光電変換特化の低ノイズプロセス、ロジックウェハーには微細高速CMOSプロセス（22nm / 14nm級）を独立最適製造してから合体できる。"],formula:{expression:"τ_RC = R_via · C_parasitic  →  従来外周TSV比 1/100 以下の配線遅延",description:"画素直下からの垂直Cu-Cu直接接続により、数百万チャンネル規模の超並列アナログ／デジタル転送を実現。"},nextGenInnovation:"Cu-Cuハイブリッドボンディングのピッチは初期の6 μmから最新世代ではサブミクロン〜2 μm級へと微細化しており、グローバルシャッターの高速制御や画素単位ADC（デジタルピクセルセンサー）実現の鍵となっている。",specs:[{label:"接合方式",value:"SiO₂-SiO₂ + Cu-Cu 同時ハイブリッド接合"},{label:"接続ピッチ",value:"約 1.5 – 4.0 μm（画素領域直下）"},{label:"界面平坦度要件",value:"CMP仕上げ RMS < 0.5 nm"},{label:"効果",value:"寄生容量激減・超並列高速読み出し"}],diagramType:"cucu_bond"},"micro-adc-dram":{title:"ロジック・列並列 CDS/ADC 回路 ＆ 最下層超高速 DRAM ダイ",subtitle:"Column-Parallel CDS & Multi-Bit ADC Logic + Stacked DRAM Buffer",category:"M7 / 超高速A/D変換・オンセンサーDRAM",summary:"Cu-Cu接合直下に配置され、微小な画素電圧からリセットノイズを除去（CDS）して14〜16bitデジタル値へ一斉変換する列並列ADCロジック層と、120fpsデータを瞬時に保持する最下層積層DRAM。",opticsAndPhysics:["相関二重サンプリング（CDS: Correlated Double Sampling）：画素リセット直後の基準電圧（kTC熱雑音を含む）と、光電子転送後の信号電圧の2回をサンプリングして差分を取る。これによりリセット熱雑音と画素ごとのオフセットばらつき（固定パターンノイズ FPN）を数電子未満（< 1 e⁻）まで相殺除去する。","列並列（またはエリア並列）A/D変換：数千〜数万本のADCコンパレータとカウンタを同時並列動作させることで、アナログ信号経路を極限まで短縮し、超高フレームレートと14–16bit階調を両立。","3層目オンセンサーDRAMバッファ：全画素同時露光・120fps読み出しで瞬時に発生する膨大な生データをセンサー内部の超高帯域DRAMへ一時バッファリングし、SLVS-EC v3高速シリアル出力へ安定ストリーム送出する。"],formula:{expression:"V_CDS = (V_sig + V_kTC + V_offset) − (V_rst + V_kTC + V_offset) = V_sig − V_rst",description:"相関二重サンプリングにより、物理的に不可避な熱リセット雑音 √(k_B T / C) と画素固定ノイズを相殺。"},nextGenInnovation:"最新世代では、1画素のHCG・LCG（さらにMCG）信号をセンサー内ロジックでリアルタイム合成するオンチップHDRマージや、AI被写体認識用メタデータを並列出力するインテリジェントセンサー化が進行している。",specs:[{label:"ノイズ除去",value:"アナログ＋デジタル相関二重サンプリング (CDS)"},{label:"量子化ビット深度",value:"14-bit / 16-bit 列並列シングルスロープ ADC"},{label:"読み出しノイズ",value:"< 1.0 – 2.5 e⁻ RMS（高変換ゲイン時）"},{label:"内蔵メモリ",value:"3層目積層 超広帯域 DRAM バッファ"}],diagramType:"adc_dram"}};function tn(i,e,t,n,s,o,r,a){n.position.copy(s),gs(n,i);const{meshes:l,edges:c}=ms(n,r,26,a?.edgeOpacity??.2);return{id:i,subsystem:"sensor",order:e,swatchColor:t,group:n,assembledPos:s,explodeOffset:o,integratedExplodeOffset:new _(o.x,o.y,o.z*.75-30),interactiveMeshes:l,edgeLines:c,explanation:O1[i],ibisMovable:a?.ibisMovable,ultrasonicElement:a?.ultrasonicElement}}function G1(i){const e=[],t=i.clippingPlanes;{const n=new se,s=Je(50,40,3,38,26,.8);Vn(s,[[-21.5,16.5,1.3],[21.5,16.5,1.3],[-21.5,-16.5,1.3],[21.5,-16.5,1.3]]);const o=new w(me(s,1.2,.14,.14,24),i.matteBlackAnodized);n.add(o);const r=Je(39.4,27.4,.9,36.6,24.6,.4),a=new w(me(r,.55,.08,.12,16),i.matteBlackAnodized);a.position.z=.55,n.add(a);const l=Je(47.2,37.2,2.4,39.2,27.2,1),c=new w(me(l,.42,.04,.04,18),i.epdmGasket);c.position.z=-.78,n.add(c);const h=[[-21.5,16.5],[21.5,16.5],[-21.5,-16.5],[21.5,-16.5]];for(const[u,d]of h){const f=En(1.55,.55,1.4,i.stainlessMachined);f.position.set(u,d,.52),n.add(f)}e.push(tn("aperture-mask",1,"#252932",n,new _(0,0,7.8),new _(0,0,46),t,{ibisMovable:!0,edgeOpacity:.25}))}{const n=new se,s=dt(43.2,31.2,.6),o=new w(me(s,.55,.06,.06,12),i.sswfGlass);o.userData.edgeOpacity=.42,n.add(o);const r=Je(43.1,31.1,.6,40.4,28.4,.3),a=new w(me(r,.08,0,0,12),i.silverElectrode);a.position.z=.29,n.add(a);const l=new w(new G(36,2.7,.85),i.pztCeramic);l.position.set(0,-14.1,.68),n.add(l);const c=new w(new G(16.2,2.35,.12),i.silverElectrode);c.position.set(-8.6,-14.1,1.12);const h=new w(new G(16.2,2.35,.12),i.silverElectrode);h.position.set(8.6,-14.1,1.12),n.add(c,h);const u=new oi([new _(17.5,-14.1,.9),new _(21.5,-14.1,.7),new _(23.5,-13.4,-.4),new _(24,-11.8,-1.6)]),d=new w(new Yn(u,24,.34,8,!1),i.polyimideFpc);n.add(d);for(const[f,g]of[[-21.2,14.8],[21.2,14.8],[-21.2,-11.2],[21.2,-11.2]]){const x=new w(new G(1.6,2.8,.95),i.epdmGasket);x.position.set(f,g,-.08),n.add(x)}e.push(tn("sswf-piezo",2,"#95c8e8",n,new _(0,0,6.2),new _(0,0,38),t,{ibisMovable:!0,ultrasonicElement:!0,edgeOpacity:.35}))}{const n=new se,s=dt(40.2,28.2,.4),o=new w(me(s,1.24,.05,.05,12),i.quartzOlpf);o.userData.edgeOpacity=.42,n.add(o);for(const a of[.46,.15,-.15,-.46]){const l=Je(40.85,28.85,.5,39.75,27.75,.32),c=new w(me(l,.26,.02,.02,12),i.quartzEdge);c.position.z=a,c.userData.edgeOpacity=.36,n.add(c)}const r=new w(new G(1.4,.5,1.36),i.matteBlackAnodized);r.position.set(19.6,14.3,0),n.add(r),e.push(tn("olpf-16pt",3,"#79b7cf",n,new _(0,0,4.65),new _(0,0,30),t,{ibisMovable:!0,edgeOpacity:.34}))}{const n=new se,s=dt(40,28,.45),o=new w(me(s,.72,.06,.06,12),i.irCutGlass);o.userData.edgeOpacity=.48,n.add(o);const r=Je(42.2,30.2,.8,40.05,28.05,.45),a=new w(me(r,.78,.04,.04,14),i.matteBlackAnodized);n.add(a),e.push(tn("ir-cut-filter",4,"#38b2da",n,new _(0,0,3.25),new _(0,0,22),t,{ibisMovable:!0,edgeOpacity:.36}))}{const n=new se,s=dt(43.8,33.4,.5),o=new w(me(s,.52,.04,.04,12),i.coverGlass);o.userData.edgeOpacity=.38,n.add(o);const r=Je(47.4,36.8,1.4,42.2,31.8,.6),a=new w(me(r,.62,.07,.07,16),i.kovarSeal);a.position.z=-.1,n.add(a);const l=Je(44,33.6,.7,42.4,32,.6),c=new w(me(l,.14,.02,.02,12),i.goldPlating);c.position.z=.24,n.add(c),e.push(tn("cover-glass",5,"#8c99a8",n,new _(0,0,2.05),new _(0,0,14),t,{ibisMovable:!0,edgeOpacity:.32}))}{const n=new se,s=new G(40.4,28.4,.28),o=[i.siliconBulk,i.siliconBulk,i.siliconBulk,i.siliconBulk,i.siliconSensorDie,i.siliconBulk],r=new w(s,o);r.position.z=.42,n.add(r);const a=new w(new G(40.3,28.3,.14),i.copperHybridBond);a.position.z=.21,n.add(a);const l=new w(new G(40.4,28.4,.34),i.siliconLogicLayer);l.position.z=-.03,n.add(l);const c=new w(new G(40.25,28.25,.1),i.copperHybridBond);c.position.z=-.25,n.add(c);const h=new w(new G(40.4,28.4,.34),i.siliconDramLayer);h.position.z=-.47,n.add(h);const u=new w(new G(39.6,27.6,.08),i.silverElectrode);u.position.z=-.68,n.add(u),e.push(tn("cmos-die",6,"#1d6d7c",n,new _(0,0,.55),new _(0,0,6.5),t,{ibisMovable:!0,edgeOpacity:.28}))}{const n=new se,s=[],o=(g,x,m)=>{const p=g.clone().lerp(x,.28);p.z=m;const T=g.clone().lerp(x,.72);T.z=m-.08;const E=new oi([g,p,T,x]);return new Yn(E,10,.048,5,!1)},r=42;for(let g=0;g<r;g++){const m=-18.2+g/(r-1)*36.4;s.push(o(new _(m,13.75,.56),new _(m*1.045,16.05,.16),.96)),s.push(o(new _(m,-13.75,.56),new _(m*1.045,-16.05,.16),.96))}const a=28;for(let g=0;g<a;g++){const m=-12.2+g/(a-1)*24.4;s.push(o(new _(-19.75,m,.56),new _(-21.95,m*1.05,.16),.96)),s.push(o(new _(19.75,m,.56),new _(21.95,m*1.05,.16),.96))}const l=[],c=[],h=[];let u=0;for(const g of s){const x=g.attributes.position,m=g.attributes.normal,p=g.index;for(let T=0;T<x.count;T++)l.push(x.getX(T),x.getY(T),x.getZ(T)),c.push(m.getX(T),m.getY(T),m.getZ(T));for(let T=0;T<p.count;T++)h.push(p.getX(T)+u);u+=x.count,g.dispose()}const d=new Ke;d.setAttribute("position",new ot(l,3)),d.setAttribute("normal",new ot(c,3)),d.setIndex(h);const f=new w(d,i.goldPlating);f.userData.noEdges=!0,n.add(f),e.push(tn("wire-bonds",7,"#e3b952",n,new _(0,0,.55),new _(0,0,2),t,{ibisMovable:!0}))}{const n=new se,s=dt(49.2,38.6,1.8),o=new w(me(s,1.1,.12,.12,18),i.ceramicAlumina);o.position.z=-.55,n.add(o);const r=Je(49.2,38.6,1.8,41.6,29.6,.7),a=new w(me(r,1.1,.08,.08,18),i.ceramicAlumina);a.position.z=.55,n.add(a);const l=Je(49.2,38.6,1.8,45.2,34.4,1),c=new w(me(l,.95,.08,.08,18),i.ceramicAlumina);c.position.z=1.5,n.add(c);const h=new G(.45,1.25,.08),u=i.goldPlating,d=new Pt,f=140,g=new Go(h,u,f);let x=0;for(let z=0;z<42;z++){const D=-19+z/41*38;d.position.set(D,16.05,1.14),d.rotation.set(0,0,0),d.updateMatrix(),g.setMatrixAt(x++,d.matrix),d.position.set(D,-16.05,1.14),d.updateMatrix(),g.setMatrixAt(x++,d.matrix)}for(let z=0;z<28;z++){const D=-12.8+z/27*25.6;d.position.set(-21.95,D,1.14),d.rotation.set(0,0,Math.PI/2),d.updateMatrix(),g.setMatrixAt(x++,d.matrix),d.position.set(21.95,D,1.14),d.updateMatrix(),g.setMatrixAt(x++,d.matrix)}g.instanceMatrix.needsUpdate=!0,n.add(g);const m=new w(new G(36,24,1.14),i.tungstenCopper);m.position.z=-.55,n.add(m);const p=new G(1.1,1.1,.08),T=[];for(let z=-22;z<=22;z+=2.2)for(const D of[-17.2,-15.2,15.2,17.2])T.push([z,D]);for(let z=-13;z<=13;z+=2.2)for(const D of[-22.4,-20.4,20.4,22.4])T.push([D,z]);const E=new Go(p,i.goldPlating,T.length),S=new Pt;T.forEach(([z,D],R)=>{S.position.set(z,D,-1.14),S.updateMatrix(),E.setMatrixAt(R,S.matrix)}),E.instanceMatrix.needsUpdate=!0,n.add(E),e.push(tn("ceramic-package",8,"#3e424c",n,new _(0,0,-.55),new _(0,0,-5.5),t,{ibisMovable:!0,edgeOpacity:.24}))}{const n=new se,s=new G(56,45,1.25),o=[i.pcbSide,i.pcbSide,i.pcbSide,i.pcbSide,i.sensorPcb,i.sensorPcb],r=new w(s,o);n.add(r);const a=new De(1.8,1.8,1.32,18);a.rotateX(Math.PI/2);for(const[g,x]of[[-24.8,19.2],[24.8,19.2],[-24.8,-19.2],[24.8,-19.2]]){const m=new w(a,i.goldPlating);m.position.set(g,x,0),n.add(m)}const l=[[-17.5,13,4.6,4.6,.72],[-17.5,-13,4.6,4.6,.72],[17.5,13,5.2,4.2,.72],[17.5,-13,4.2,4.2,.68]];for(const[g,x,m,p,T]of l){const E=new w(new G(m,p,T),i.icEpoxy);E.position.set(g,x,-.625-T/2),n.add(E)}const c=new w(new G(3.2,2.5,.65),i.silverElectrode);c.position.set(0,16.5,-.95),n.add(c);const h=new G(1.1,.6,.55),u=[];for(let g=0;g<12;g++){const x=-11+g*2;u.push([x,12.6,0]),u.push([x,-12.6,0])}for(let g=0;g<12;g++){const x=-9.9+g*1.8;u.push([-14.5,x,Math.PI/2]),u.push([14.5,x,Math.PI/2])}const d=new Go(h,i.smdCeramic,u.length),f=new Pt;u.forEach(([g,x,m],p)=>{f.position.set(g,x,-.9),f.rotation.set(0,0,m),f.updateMatrix(),d.setMatrixAt(p,f.matrix)}),d.instanceMatrix.needsUpdate=!0,n.add(d);for(const g of[-1,1]){const x=new w(new G(2.6,22,.9),i.icEpoxy);x.position.set(g*24.4,0,-1.06),n.add(x);const m=new w(new G(3.1,20.6,.22),i.goldPlating);m.position.set(g*24.4,0,-.74),n.add(m)}e.push(tn("sensor-pcb",9,"#1b5649",n,new _(0,0,-2.45),new _(0,0,-15.5),t,{ibisMovable:!0,edgeOpacity:.22}))}{const n=new se,s=o=>{const r=new se,a=18.6,l=.24,h=[[o*24.4,-1.45],[o*31,-1.45],[o*35.8,-2.2],[o*37.8,-4.3],[o*37.2,-6.9],[o*34.4,-8.3],[o*29.8,-8.4]].map(([y,M])=>new ue(y,M)),d=new $o(h).getPoints(32),f=[],g=[];for(let y=0;y<d.length;y++){const M=d[Math.max(0,y-1)],C=d[Math.min(d.length-1,y+1)],A=new ue().subVectors(C,M).normalize(),I=new ue(-A.y,A.x);f.push(d[y].clone().addScaledVector(I,l*.5)),g.push(d[y].clone().addScaledVector(I,-l*.5))}const x=new on;x.moveTo(f[0].x,f[0].y);for(let y=1;y<f.length;y++)x.lineTo(f[y].x,f[y].y);for(let y=g.length-1;y>=0;y--)x.lineTo(g[y].x,g[y].y);x.closePath();const m=new Si(x,{depth:a,bevelEnabled:!1,steps:1});m.translate(0,0,-a/2),m.rotateX(Math.PI/2),m.computeVertexNormals();const p=new w(m,i.polyimideFpc);r.add(p);const T=d.slice(6,26),E=[],S=[];for(let y=0;y<T.length;y++){const M=T[Math.max(0,y-1)],C=T[Math.min(T.length-1,y+1)],A=new ue().subVectors(C,M).normalize(),I=new ue(-A.y,A.x);E.push(T[y].clone().addScaledVector(I,l*.68)),S.push(T[y].clone().addScaledVector(I,l*.45))}const z=new on;z.moveTo(E[0].x,E[0].y);for(let y=1;y<E.length;y++)z.lineTo(E[y].x,E[y].y);for(let y=S.length-1;y>=0;y--)z.lineTo(S[y].x,S[y].y);z.closePath();const D=new Si(z,{depth:a-1.4,bevelEnabled:!1});D.translate(0,0,-17.200000000000003/2),D.rotateX(Math.PI/2),D.computeVertexNormals();const R=new w(D,i.emiShieldFilm);r.add(R);const b=new w(new G(3.2,19.2,.9),i.icEpoxy);b.position.set(o*29.8,0,-8.55);const v=new w(new G(1.4,17.8,.16),i.goldPlating);return v.position.set(o*28.8,0,-8.08),r.add(b,v),r};n.add(s(-1),s(1)),e.push(tn("slvs-fpc",10,"#c96b1c",n,new _(0,0,-2.45),new _(0,0,-21),t,{ibisMovable:!1,edgeOpacity:.24}))}{const n=new se,s=Je(76,62,5,44,32,2.5);Vn(s,[[-33,26,2.2],[33,26,2.2],[-33,-26,2.2],[33,-26,2.2]]);const o=new w(me(s,1.65,.14,.14,24),i.magnesiumCast);n.add(o);for(const[c,h]of[[-24.8,19.2],[24.8,19.2],[-24.8,-19.2],[24.8,-19.2]]){const u=new De(2.3,2.6,1.35,18);u.rotateX(Math.PI/2);const d=new w(u,i.stainlessMachined);d.position.set(c,h,1.15),n.add(d)}const r=[{x:-16.5,y:-24,w:20.5,h:9.8,rotZ:0},{x:16.5,y:-24,w:20.5,h:9.8,rotZ:0},{x:30.8,y:4.5,w:9.8,h:22,rotZ:0}];for(const c of r){const h=Math.min(c.w,c.h)*.28,u=U1(c.w,c.h,h,1.35),d=new w(u,i.copperCoil);d.position.set(c.x,c.y,-.78),d.rotation.z=c.rotZ,n.add(d);const f=new w(new G(2.4,2.4,.72),i.icEpoxy);f.position.set(c.x,c.y,-.75),n.add(f);const g=new w(new G(3.2,1.6,.16),i.goldPlating);g.position.set(c.x,c.y,-.92),n.add(g)}const a=new w(new G(6.8,18,1.1),i.tungstenCopper);a.position.set(-30.8,4.5,-.5),n.add(a);const l=new w(new G(58,2.2,.16),i.polyimideFpc);l.position.set(4,-18.2,-.88),n.add(l),e.push(tn("ibis-carrier",11,"#c86432",n,new _(0,0,-4.3),new _(0,0,-31),t,{ibisMovable:!0,edgeOpacity:.22}))}{const n=new se,s=[[0,25.5],[-28.5,-18.5],[28.5,-18.5]];for(const[r,a]of s){const l=new w(new Et(1.38,28,20),i.siliconNitrideBall);l.position.set(r,a,0),l.userData.noEdges=!0,n.add(l);const c=new De(3.8,3.8,.36,24);c.rotateX(Math.PI/2);const h=new w(c,i.stainlessMachined);h.position.set(r,a,1.48),n.add(h);const u=new w(c,i.stainlessMachined);u.position.set(r,a,-1.48),n.add(u);const d=new w(new hn(3.55,.32,10,28),i.matteBlackAnodized);d.position.set(r,a,-1.1),d.userData.noEdges=!0,n.add(d)}const o=[[-16.5,-24,14,5.2],[16.5,-24,14,5.2],[30.8,4.5,5.2,14]];for(const[r,a,l,c]of o){const h=new w(new G(l,c,.42),i.softIronYoke);h.position.set(r,a,.95),n.add(h)}e.push(tn("ceramic-balls",12,"#2c3240",n,new _(0,0,-5.7),new _(0,0,-45.5),t,{ibisMovable:!1,edgeOpacity:.25}))}{const n=new se,s=Je(82,68,6,38,28,3);Vn(s,[[-36,29,2.1],[36,29,2.1],[0,-30.5,2.1]]);const o=new w(me(s,1.9,.16,.16,24),i.magnesiumCast);n.add(o);const r=[{x:-16.5,y:-24,w:22,h:11.2,vertical:!1},{x:16.5,y:-24,w:22,h:11.2,vertical:!1},{x:30.8,y:4.5,w:11.2,h:23.5,vertical:!0}];for(const l of r){const c=new w(new G(l.w+1.4,l.h+1.4,.9),i.softIronYoke);if(c.position.set(l.x,l.y,1.05),n.add(c),l.vertical){const h=l.w*.46,u=new w(new G(h,l.h-.6,1.25),i.neodymiumMagnet);u.position.set(l.x-h*.54,l.y,1.85);const d=new w(new G(h,l.h-.6,1.25),i.neodymiumMagnet);d.position.set(l.x+h*.54,l.y,1.85),n.add(u,d)}else{const h=l.h*.46,u=new w(new G(l.w-.6,h,1.25),i.neodymiumMagnet);u.position.set(l.x,l.y+h*.54,1.85);const d=new w(new G(l.w-.6,h,1.25),i.neodymiumMagnet);d.position.set(l.x,l.y-h*.54,1.85),n.add(u,d)}}const a=[[-36,29],[36,29],[0,-30.5]];for(const[l,c]of a){const h=new w(Jo(3.1,5.2,5.5,.38),i.stainlessMachined);h.position.set(l,c,3.2),h.userData.noEdges=!0,n.add(h);const u=En(2.2,.85,7,i.stainlessMachined);u.position.set(l,c,-1),u.rotation.y=Math.PI,n.add(u)}e.push(tn("ibis-base-magnets",13,"#96a0ae",n,new _(0,0,-7.4),new _(0,0,-60),t,{ibisMovable:!1,edgeOpacity:.22}))}{const n=new se,s=new w(new G(28,20,1.1),i.thermalPadTim);s.position.set(0,0,5.85),n.add(s);const o=()=>{const d=[[0,5.2],[0,4.1],[7.5,3.4],[8.6,2.4],[6.8,1.6],[-7.2,1.1],[-8.6,.3],[-6.6,-.45],[0,-.55]],g=new $o(d.map(([z,D])=>new ue(z,D))).getPoints(44),x=[],m=[];for(let z=0;z<g.length;z++){const D=g[Math.max(0,z-1)],R=g[Math.min(g.length-1,z+1)],b=new ue().subVectors(R,D).normalize(),v=new ue(-b.y,b.x);x.push(g[z].clone().addScaledVector(v,.34*.5)),m.push(g[z].clone().addScaledVector(v,-.34*.5))}const p=new on;p.moveTo(x[0].x,x[0].y);for(let z=1;z<x.length;z++)p.lineTo(x[z].x,x[z].y);for(let z=m.length-1;z>=0;z--)p.lineTo(m[z].x,m[z].y);p.closePath();const T=new Si(p,{depth:26,bevelEnabled:!1});T.translate(0,0,-26/2),T.dispose();const E=new on;E.moveTo(x[0].y,x[0].x);for(let z=1;z<x.length;z++)E.lineTo(x[z].y,x[z].x);for(let z=m.length-1;z>=0;z--)E.lineTo(m[z].y,m[z].x);E.closePath();const S=new Si(E,{depth:26,bevelEnabled:!1});return S.translate(0,0,-26/2),S.rotateY(-Math.PI/2),S.computeVertexNormals(),new w(S,i.pyroGraphite)};n.add(o());const r=dt(48,36,3),a=new w(me(r,1.1,.1,.1,16),i.copperHeatSpreader);a.position.z=-1.25,n.add(a);for(let h=-8;h<=8;h++){const u=new w(new G(.95,31,.9),i.copperHeatSpreader);u.position.set(h*2.5,0,-2.15),n.add(u)}const l=dt(38,26,2),c=new w(me(l,.18,.02,.02,12),i.pyroGraphite);c.position.z=-.6,n.add(c),e.push(tn("sigma-graphite",14,"#c86b3c",n,new _(0,0,-9.6),new _(0,0,-76),t,{ibisMovable:!1,edgeOpacity:.22}))}return e}function gi(i,e,t,n,s,o,r,a=.24){n.position.copy(s),gs(n,i);const{meshes:l,edges:c}=ms(n,r,28,a);return{id:i,subsystem:"micro",order:e,swatchColor:t,group:n,assembledPos:s,explodeOffset:o,interactiveMeshes:l,edgeLines:c,explanation:B1[i]}}function V1(i){const e=[],t=i.clippingPlanes,n=11,s=n/2,o=n*2,r=[{x:-s,y:s,color:"R",split:"V"},{x:s,y:s,color:"G1",split:"H"},{x:-s,y:-s,color:"G2",split:"V"},{x:s,y:-s,color:"B",split:"H"}];{const a=new se,c=((h,u,d=28)=>{const f=new Tn(h,h,d,d),g=f.attributes.position,x=h/2;for(let m=0;m<g.count;m++){const p=g.getX(m),T=g.getY(m),E=p/x,S=T/x,z=E*E+S*S,D=E*E*E*E+S*S*S*S,R=Math.max(0,1-.72*z-.14*D),b=Math.pow(R,.75)*u;g.setZ(m,b)}return f.computeVertexNormals(),f})(n-.14,3.8,30);for(const h of r){const u=new w(c,i.microlensGlass);u.position.set(h.x,h.y,.45),u.userData.noEdges=!0,a.add(u);const d=new w(new G(n-.14,n-.14,.9),i.microlensGlass);d.position.set(h.x,h.y,0),d.userData.edgeOpacity=.35,a.add(d)}e.push(gi("micro-ocl",1,"#b8e0fa",a,new _(0,0,11.6),new _(0,0,24),t,.32))}{const a=new se,l=2.6,c=.72;for(const u of r){const d=u.color==="R"?i.cfaRed:u.color==="B"?i.cfaBlue:i.cfaGreen,f=new w(new G(n-c-.08,n-c-.08,l),d);f.position.set(u.x,u.y,0),f.userData.edgeOpacity=.32,a.add(f)}const h=[[0,0,c,o+c],[0,0,o+c,c],[-o/2,0,c,o+c],[o/2,0,c,o+c],[0,o/2,o+c,c],[0,-o/2,o+c,c]];for(const[u,d,f,g]of h){const x=new w(new G(f,g,l+.18),i.tungstenGrid);x.position.set(u,d,0),a.add(x)}e.push(gi("micro-cfa",2,"#2ca861",a,new _(0,0,8.8),new _(0,0,16.5),t,.26))}{const a=new se,l=new w(new G(o+.6,o+.6,.55),i.interlayerDielectric);a.add(l);const c=new Za(.68,.95,4);c.rotateX(Math.PI/2),c.rotateZ(Math.PI/4);const h=6,u=4*h*h,d=new Go(c,i.siliconDepletion,u),f=new Pt;let g=0;for(const x of r)for(let m=0;m<h;m++)for(let p=0;p<h;p++){const T=x.x-3.6+m*1.44,E=x.y-3.6+p*1.44;f.position.set(T,E,.55),f.updateMatrix(),d.setMatrixAt(g++,f.matrix)}d.instanceMatrix.needsUpdate=!0,a.add(d);for(const[x,m,p,T]of[[0,0,.85,o+.8],[0,0,o+.8,.85],[-o/2,0,.85,o+.8],[o/2,0,.85,o+.8],[0,o/2,o+.8,.85],[0,-o/2,o+.8,.85]]){const E=new w(new G(p,T,.72),i.memoryNodeShield);E.position.set(x,m,.25),a.add(E)}e.push(gi("micro-bsi-ar",3,"#4b7cb8",a,new _(0,0,6.6),new _(0,0,9.5),t,.24))}{const a=new se,l=6.8;for(const h of r){const u=new w(new G(n-.9,n-.9,l),i.siliconPhotodiode);if(u.position.set(h.x,h.y,0),a.add(u),h.split==="H"){const d=(n-2.6)/2,f=n-2,g=new w(new G(d,f,l-1.1),i.siliconDepletion);g.position.set(h.x-d*.56,h.y,.15);const x=new w(new G(d,f,l-1.1),i.siliconDepletion);x.position.set(h.x+d*.56,h.y,.15),a.add(g,x);const m=new w(new G(.32,f+.4,l-.6),i.ftiOxide);m.position.set(h.x,h.y,0),a.add(m)}else{const d=n-2,f=(n-2.6)/2,g=new w(new G(d,f,l-1.1),i.siliconDepletion);g.position.set(h.x,h.y+f*.56,.15);const x=new w(new G(d,f,l-1.1),i.siliconDepletion);x.position.set(h.x,h.y-f*.56,.15),a.add(g,x);const m=new w(new G(d+.4,.32,l-.6),i.ftiOxide);m.position.set(h.x,h.y,0),a.add(m)}}const c=.78;for(const[h,u,d,f]of[[0,0,c,o+c],[0,0,o+c,c],[-o/2,0,c,o+c],[o/2,0,c,o+c],[0,o/2,o+c,c],[0,-o/2,o+c,c]]){const g=new w(new G(d,f,l+.2),i.ftiOxide);g.position.set(h,u,0),a.add(g)}e.push(gi("micro-pd-cross",4,"#3a6ea5",a,new _(0,0,2.4),new _(0,0,1.8),t,.24))}{const a=new se,l=3.8,c=new w(new G(o+.6,o+.6,l),i.siliconTransistorLayer);a.add(c);for(const h of r){const u=new w(new De(.85,.85,3.2,16),i.gatePolysilicon);u.rotation.x=Math.PI/2,u.position.set(h.x-2.3,h.y+1.8,2.1),a.add(u);const d=new w(new G(4.2,3.6,2.2),i.memoryNodeShield);d.position.set(h.x+2.2,h.y+2,.65),a.add(d);const f=new w(new G(3.2,2.6,1.5),i.siliconDepletion);f.position.set(h.x+2.2,h.y+2,.3),a.add(f);const g=new w(new G(4.4,3.2,1.8),i.copperHybridBond);g.position.set(h.x-2,h.y-2.3,-.4),a.add(g);for(let m=0;m<3;m++){const p=new w(new G(3.8,.62,1.5),i.gatePolysilicon);p.position.set(h.x+2.1,h.y-1.3-m*1.15,-.55),a.add(p)}const x=new w(new De(.42,.42,4.4,12),i.goldPlating);x.rotation.x=Math.PI/2,x.position.set(h.x-.1,h.y+.1,.3),a.add(x)}e.push(gi("micro-2layer-gs",5,"#d99b38",a,new _(0,0,-3.4),new _(0,0,-6.5),t,.24))}{const a=new se,l=2.6,c=new w(new G(o+.6,o+.6,l),i.interlayerDielectric);a.add(c);const h=new G(1.75,1.75,1.15),u=new De(.42,.42,l+.4,12);u.rotateX(Math.PI/2);for(const d of r){for(const[x,m]of[[-2.7,-2.7],[2.7,-2.7],[-2.7,2.7],[2.7,2.7]]){const p=new w(h,i.copperHybridBond);p.position.set(d.x+x,d.y+m,.52);const T=new w(h,i.copperHybridBond);T.position.set(d.x+x,d.y+m,-.52);const E=new w(u,i.copperHybridBond);E.position.set(d.x+x,d.y+m,0),a.add(p,T,E)}const f=new w(new G(7.2,.55,.32),i.copperHybridBond);f.position.set(d.x,d.y+2.7,1.05);const g=new w(new G(.55,7.2,.32),i.copperHybridBond);g.position.set(d.x-2.7,d.y,-1.05),a.add(f,g)}e.push(gi("micro-cucu",6,"#d87342",a,new _(0,0,-7),new _(0,0,-14),t,.26))}{const a=new se,l=new w(new G(o+.8,o+.8,2.8),i.siliconLogicLayer);l.position.z=1.4,a.add(l);for(let d=-3;d<=3;d++){const f=new w(new G(.65,o-.6,.42),i.copperHybridBond);f.position.set(d*3,0,2.85),a.add(f)}for(const d of[-5.5,5.5]){const f=new w(new G(o-1.4,4.2,1.1),i.gatePolysilicon);f.position.set(0,d,1.55),a.add(f)}const c=new w(new G(o+.4,o+.4,.45),i.copperHybridBond);c.position.z=-.22,a.add(c);const h=new w(new G(o+.8,o+.8,3),i.dramCellArray);h.position.z=-1.95,a.add(h);const u=new G(4.4,4.4,1.6);for(const d of[-6.8,0,6.8])for(const f of[-6.8,0,6.8]){const g=new w(u,i.siliconDepletion);g.position.set(d,f,-1.7),a.add(g)}e.push(gi("micro-adc-dram",7,"#2d4868",a,new _(0,0,-11.4),new _(0,0,-22.5),t,.24))}return e}function H1(i){const e=new se,t=new se,n=new se,s=new se,o=(v,y,M)=>{const C=new se,A=new _n({color:10134450,dashSize:1.8,gapSize:1.4,transparent:!0,opacity:0,clippingPlanes:i});for(const[I,U]of v){const k=new Ke().setFromPoints([new _(I,U,y),new _(I,U,M)]),B=new wt(k,A);B.computeLineDistances(),C.add(B)}return C};n.add(o([[-21.5,16.5],[21.5,16.5],[-21.5,-16.5],[21.5,-16.5]],56,-74)),s.add(o([[-11,11],[11,11],[-11,-11],[11,-11]],38,-36));const r=[],a=new se;e.add(a);const l=[{x:-11,y:6.5,color:15087942},{x:-3.5,y:-4.5,color:2271329},{x:5.5,y:5,color:2450411},{x:11.5,y:-5.5,color:2271329},{x:-9.5,y:-5,color:10165608,isNIR:!0},{x:9,y:6,color:10165608,isNIR:!0}],c=[];for(const v of l){const y=new It({color:v.color,transparent:!0,opacity:v.isNIR?.72:.65,clippingPlanes:i}),M=new Ke().setFromPoints([new _(v.x*1.15,v.y*1.15,28),new _(v.x,v.y,.8)]),C=new wt(M,y);a.add(C);const A=[];let I;if(v.isNIR){const B=new _n({color:11873145,dashSize:1.2,gapSize:.9,transparent:!0,opacity:.72,clippingPlanes:i}),O=new Ke().setFromPoints([new _(v.x,v.y,3.6),new _(v.x*1.45,v.y*1.45+4,24)]);I=new wt(O,B),I.computeLineDistances(),a.add(I)}else{const B=[[.85,.45],[-.85,-.45],[.45,-.85],[-.45,.85]],O=new It({color:v.color,transparent:!0,opacity:.48,clippingPlanes:i});for(const[X,J]of B){const ce=new Ke().setFromPoints([new _(v.x,v.y,4.6),new _(v.x+X,v.y+J,.8)]),pe=new wt(ce,O);a.add(pe),A.push(pe)}}c.push({def:v,mainLine:C,splitLines:A,reflectLine:I});const U=new bt({color:v.color,clippingPlanes:i}),k=new w(new Et(.46,12,10),U);a.add(k),r.push({mesh:k,startZ:28,endZ:v.isNIR?3.6:.9,speed:v.isNIR?.55:.72,phase:Math.random(),x0:v.x*1.16,y0:v.y*1.16,x1:v.x,y1:v.y,reflectAtZ:v.isNIR?3.6:void 0})}const h=[];for(let v=0;v<3;v++){const y=new ii(4+v*5.2,4.32+v*5.2,48),M=new bt({color:959977,transparent:!0,opacity:.35,side:Rt,clippingPlanes:i}),C=new w(y,M);C.scale.set(1.38,.96,1),e.add(C),h.push(C)}const u=new se,d=(v,y,M,C)=>new Au(v.normalize(),y,M,C,2.2,1.3),f=d(new _(0,1,0),new _(-16.5,-24,-4.3),7.5,875481),g=d(new _(0,-1,0),new _(16.5,-24,-4.3),7.5,875481),x=d(new _(1,0,0),new _(30.8,4.5,-4.3),7.5,14239759);u.add(f,g,x),e.add(u);const m=[{x:-5.5,y:5.5,color:15087942,split:"V"},{x:5.5,y:5.5,color:2271329,split:"H"},{x:-5.5,y:-5.5,color:2271329,split:"V"},{x:5.5,y:-5.5,color:2450411,split:"H"}],p=[];for(const v of m){const y=v.split==="H"?[[-2.2,0],[2.2,0]]:[[0,2.2],[0,-2.2]],M=[],C=[];for(const[A,I]of y){const U=new It({color:v.color,transparent:!0,opacity:.78,clippingPlanes:i}),k=new Ke().setFromPoints([new _(v.x+A*1.55,v.y+I*1.55,24),new _(v.x+A*1.35,v.y+I*1.35,13.5),new _(v.x+A*.6,v.y+I*.6,2.5)]),B=new wt(k,U);t.add(B),M.push(B);const O=new w(new Et(.48,12,10),new bt({color:440020,clippingPlanes:i}));t.add(O),C.push(O)}p.push({center:v,subOffsets:y,lines:M,electronDots:C})}e.visible=!1,t.visible=!1;const T=v=>{e.visible=v},E=v=>{t.visible=v},S=[[-21.5,16.5],[21.5,16.5],[-21.5,-16.5],[21.5,-16.5]];return{macroOverlay:e,microOverlay:t,macroExplodeGuides:n,microExplodeGuides:s,setMacroVisible:T,setMicroVisible:E,updateMacro:(v,y,M,C,A)=>{const I=M?1-y*.72:0,U=Math.sin(v*2.4)*1.45*I,k=Math.cos(v*1.9)*1.2*I,B=Math.sin(v*1.35)*.032*I;for(const O of A){const X=C&&O.integratedExplodeOffset?O.integratedExplodeOffset:O.explodeOffset,J=O.assembledPos.x+X.x*y,ce=O.assembledPos.y+X.y*y,pe=O.assembledPos.z+X.z*y;O.ibisMovable?(O.group.position.set(J+U,ce+k,pe),O.group.rotation.z=B):(O.group.position.set(J,ce,pe),O.group.rotation.z=0),O.ultrasonicElement&&M&&(O.group.position.z+=Math.sin(v*52)*.14)}if(M){const O=A.find(ne=>ne.id==="sswf-piezo"),X=A.find(ne=>ne.id==="olpf-16pt"),J=A.find(ne=>ne.id==="ir-cut-filter"),ce=A.find(ne=>ne.id==="cmos-die"),pe=A.find(ne=>ne.id==="ibis-carrier"),Oe=O?O.group.position.z:6.2,q=X?X.group.position.z:4.65,oe=J?J.group.position.z:3.25,ye=ce?ce.group.position.z+.56:1.1,le=C?Oe+7.5:Oe+18;if(h.forEach((ne,ve)=>{const Z=(v*1.6+ve*.33)%1;ne.position.set(U,k,Oe+.45);const Ne=.35+Z*1.2;ne.scale.set(Ne*1.42,Ne*.96,1),ne.material.opacity=(1-Z)*.48}),c.forEach((ne,ve)=>{const{def:Z,mainLine:Ne,splitLines:re,reflectLine:te}=ne,N=Z.x*1.18,Ee=Z.y*1.18,he=Ne.geometry.attributes.position;if(Z.isNIR&&te){he.setXYZ(0,N,Ee,le),he.setXYZ(1,Z.x,Z.y,oe+.38),he.needsUpdate=!0;const Ie=te.geometry.attributes.position;Ie.setXYZ(0,Z.x,Z.y,oe+.38),Ie.setXYZ(1,Z.x*1.55,Z.y*1.45+3.5,le-2),Ie.needsUpdate=!0,te.computeLineDistances()}else{he.setXYZ(0,N,Ee,le),he.setXYZ(1,Z.x,Z.y,q),he.needsUpdate=!0;const Ie=[[.9,.45],[-.9,-.45],[.45,-.9],[-.45,.9]];re.forEach((we,F)=>{const[P,W]=Ie[F],j=we.geometry.attributes.position;j.setXYZ(0,Z.x,Z.y,q),j.setXYZ(1,Z.x+P+U,Z.y+W+k,ye),j.needsUpdate=!0})}const _e=r[ve],fe=(v*_e.speed+_e.phase)%1;if(Z.isNIR)if(fe<.55){const Ie=fe/.55;_e.mesh.position.set(ze.lerp(N,Z.x,Ie),ze.lerp(Ee,Z.y,Ie),ze.lerp(le,oe+.38,Ie))}else{const Ie=(fe-.55)/.45;_e.mesh.position.set(ze.lerp(Z.x,Z.x*1.55,Ie),ze.lerp(Z.y,Z.y*1.45+3.5,Ie),ze.lerp(oe+.38,le-2,Ie))}else _e.mesh.position.set(ze.lerp(N,Z.x+U,fe),ze.lerp(Ee,Z.y+k,fe),ze.lerp(le,ye,fe))}),pe){u.position.set(U,k,pe.group.position.z-.5),u.rotation.z=B;const ne=Math.cos(v*1.9),ve=Math.sin(v*2.4);f.setDirection(new _(0,ne>=0?1:-1,0)),f.setLength(3.2+Math.abs(ne)*5,2,1.2),g.setDirection(new _(0,ne>=0?1:-1,0)),g.setLength(3.2+Math.abs(ne)*5,2,1.2),x.setDirection(new _(ve>=0?1:-1,0,0)),x.setLength(3.2+Math.abs(ve)*5,2,1.2)}}},updateMicro:(v,y,M,C)=>{for(const A of C)A.group.position.set(A.assembledPos.x+A.explodeOffset.x*y,A.assembledPos.y+A.explodeOffset.y*y,A.assembledPos.z+A.explodeOffset.z*y);if(M){const A=C.find(pe=>pe.id==="micro-ocl"),I=C.find(pe=>pe.id==="micro-pd-cross"),U=C.find(pe=>pe.id==="micro-2layer-gs"),k=C.find(pe=>pe.id==="micro-adc-dram"),B=(A?A.group.position.z:11.6)+12,O=(A?A.group.position.z:11.6)+2.4,X=I?I.group.position.z:2.4,J=U?U.group.position.z:-3.4,ce=k?k.group.position.z:-11.4;p.forEach((pe,Oe)=>{const{center:q,subOffsets:oe,lines:ye,electronDots:le}=pe;oe.forEach(([ne,ve],Z)=>{const Ne=ye[Z].geometry.attributes.position;Ne.setXYZ(0,q.x+ne*1.65,q.y+ve*1.65,B),Ne.setXYZ(1,q.x+ne*1.45,q.y+ve*1.45,O),Ne.setXYZ(2,q.x+ne*.72,q.y+ve*.72,X),Ne.needsUpdate=!0;const re=(v*.65+Oe*.21+Z*.47)%1,te=le[Z];if(re<.35){const N=re/.35;te.position.set(ze.lerp(q.x+ne*.7,q.x+2.2,N),ze.lerp(q.y+ve*.7,q.y+2,N),ze.lerp(X,J+.4,N))}else{const N=(re-.35)/.65;te.position.set(ze.lerp(q.x+2.2,q.x+2.7,N),ze.lerp(q.y+2,q.y+2.7,N),ze.lerp(J+.4,ce+1.2,N))}})})}},updateMacroGuides:(v,y,M)=>{const C=ze.clamp((v-.04)*.55,0,.42);n.visible=y&&C>.01;const A=M.find(O=>O.id==="aperture-mask"),I=M.find(O=>O.id==="sigma-graphite"),U=(A?A.group.position.z:7.8)+2,k=(I?I.group.position.z:-9.6)-2;let B=0;n.traverse(O=>{if(O.isLine){const X=O;X.material.opacity=C;const J=S[B++];if(J){const ce=X.geometry.attributes.position;ce.setXYZ(0,J[0],J[1],U),ce.setXYZ(1,J[0],J[1],k),ce.needsUpdate=!0,X.computeLineDistances()}}})},updateMicroGuides:(v,y)=>{const M=ze.clamp((v-.04)*.55,0,.42);s.visible=y&&M>.01,s.traverse(C=>{C.isLine&&(C.material.opacity=M)})}}}function W1(i){const e=new se,t=new se,n=G1(i),s=V1(i);for(const l of n)e.add(l.group);for(const l of s)t.add(l.group);const o=H1(i.clippingPlanes);return e.add(o.macroOverlay,o.macroExplodeGuides),t.add(o.microOverlay,o.microExplodeGuides),{sensor:{rootGroup:e,parts:n,updateAnimation:(l,c,h,u,d)=>{o.updateMacro(l,h,u,d,n)},setPhysicsVisible:l=>{o.setMacroVisible(l)},updateExplodeGuides:(l,c)=>{o.updateMacroGuides(l,c,n)}},micro:{rootGroup:t,parts:s,updateAnimation:(l,c,h,u)=>{o.updateMicro(l,h,u,s)},setPhysicsVisible:l=>{o.setMicroVisible(l)},updateExplodeGuides:(l,c)=>{o.updateMicroGuides(l,c)}}}}const X1={"shutter-front-cover":{title:"フロント保護カバー板 ＆ 迷光防止開口枠",subtitle:"Front Protective Shutter Cover Plate & Matte Baffle Frame",category:"S01 / 外装保護・迷光遮断",plainAnalogy:"ひとことで言うと「シャッターの羽根を守る超うす型のよろいのフタ」。時速40 kmで走る紙より薄い羽根にホコリや指が触れないようガードしながら、レンズからの余計な乱反射光をカットします。",summary:"レンズマウント側から見たとき最前面に位置する高剛性カバープレート。フルサイズ撮像面（36×24 mm）に合わせて正確に窓が開いており、内部の超薄型カーボン羽根が高速で動く「羽根室（ブレードチャンバー）」の前面壁を兼ねています。",opticsAndPhysics:["羽根の走行空間は厚みわずか1 mm前後の超狭小ギャップ。カバー板の内側に微細な段付きレール（ガイドリブ）を設け、羽根が空気抵抗で波打つ（フラッタリング）のを防ぎます。","表面にはつや消し黒の低反射処理を施し、大口径レンズから斜めに入ってくる強い光が枠に当たって写真に白っぽいモヤ（フレア・ゴースト）が出るのを防ぎます。","四隅の精密ねじと位置決めピンにより、ベース基板とミクロン単位の平行度を保ちながら羽根室を密閉します。"],formula:{expression:"クリアランス δ ≈ 0.15 – 0.25 mm（羽根とカバー板のすき間）",description:"すき間が狭すぎると摩擦で減速し、広すぎると光漏れや羽根のバタつきが起きるため精密に設計されています。"},nextGenInnovation:"最新の高耐久50万回シャッターでは、カバー板に超軽量な炭素繊維配合樹脂や特殊ステンレスを採用し、剛性を高めつつユニット全体の薄型化（ショートフランジバック対応）を実現しています。",specs:[{label:"開口ウィンドウ",value:"37.6 × 25.6 mm（35mmフルサイズ用）"},{label:"板厚・材質",value:"約 0.6 mm / 低反射黒色ステンレス・複合材"},{label:"主な役割",value:"羽根室保護・空気バタつき抑制・迷光防止"},{label:"固定方式",value:"4点精密小ねじ＋位置決めノックピン"}],diagramType:"shutter_cover"},"shutter-dust-shield":{title:"電源OFF時・独立センサー保護シールドカーテン",subtitle:"Dedicated Anti-Dust Protective Sensor Shield Curtain",category:"S02 / レンズ交換時防塵プロテクション",plainAnalogy:"ひとことで言うと「レンズを外すときだけ自動で閉まる丈夫な雨戸（シャッターガード）」。ミラーレス一眼はレンズを外すとセンサーがむき出しになるため、ホコリやゴミの侵入を物理的にシャットアウトします。",summary:"電源を切ったとき（またはレンズ交換時）に自動で閉じて、奥の繊細な高速シャッター羽根や高価なイメージセンサーにホコリ・花粉・指先などが付くのを防ぐ専用保護幕。撮影中は完全に上部ポケットへ退避します。",opticsAndPhysics:["一眼レフには昔「反射ミラー」がセンサーの前にありましたが、ミラーレス一眼にはミラーがないため、レンズを外すとセンサーが丸見えになります。保護シールドはこの弱点を根本解決します。","撮影用の高速カーボン羽根（厚さ 0.05 mm）は息を吹きかけただけで曲がるほど繊細ですが、専用の保護シールドはやや厚く丈夫な硬質アルミ合金ブレードを採用し、耐衝撃性と防塵性を高めています。","撮影用シャッター幕そのものを電源OFF時に閉める方式（Canon / Sony系）と、メカシャッター非搭載機で独立した専用保護幕を備える方式（Nikon Z9 / Z8系）の2つの最新アプローチがあります。"],formula:{expression:"電源OFF → 自動閉鎖（防塵バリア） / 電源ON → 0.1秒以下で高速退避",description:"露光用シャッターとは独立した保護構造により、レンズ交換時のセンサー汚れリスクを激減させます。"},nextGenInnovation:"2024〜2026年の最新ミラーレス（Sony α7 V / α1 II、Canon EOS R1 / R5 II、Nikon Z9 / Z8）では、電源OFF時自動閉鎖のアンチダストシャッター／センサーシールドがプロ機の標準装備となっています。",specs:[{label:"ブレード構成",value:"3枚連動 硬質アルマイトアルミ保護幕"},{label:"動作タイミング",value:"電源OFF時自動閉鎖／起動時自動開放"},{label:"防塵効果",value:"レンズ交換時の落下塵埃を物理遮断"},{label:"安全設計",value:"高速露光幕より高い曲げ剛性を確保"}],diagramType:"shutter_shield"},"shutter-curtain-1":{title:"先幕（1st Curtain）カーボンファイバー羽根群 × 4枚",subtitle:"1st (Front) Curtain — 4-Blade Ultra-Thin CFRP Shutter Blades",category:"S03 / 露光スタート幕・超軽量炭素繊維",plainAnalogy:"ひとことで言うと「光を通し始める1枚目の超高速ブラインドカーテン」。髪の毛より薄いカーボン製の羽根4枚が、上から下へたった0.002秒でパッと折り畳まれてセンサーに光を当て始めます！",summary:"シャッターボタンを押した瞬間、最初に上から下へ走り抜けて「写真撮影のスタート」を切る4枚組の超薄型カーボンファイバー（CFRP）製シャッター羽根。わずか数グラムの重さでジェット戦闘機を遥かに超える数千Gの加速度に耐えます。",opticsAndPhysics:["なぜ4枚に分かれているの？：1枚の大きな板（高さ24 mm）をそのまま上下に動かすと、カメラの縦の高さが2倍以上に巨大化してしまいます。4枚の細い羽根（幅約7 mm）を重ねて「折りたたみ」にすることで、開いたときにたった7 mmの狭いポケットへコンパクトに収納できます。","なぜカーボンファイバー（CFRP）なの？：同じ強さの鉄より約5倍も軽いため、動き始めの慣性（重たさ）が極小になります。軽いほどバネの力で一瞬のうちに最高速度（時速約35〜40 km）へ到達でき、50万回叩きつけても折れません。","最先端の1枚目（スリット形成羽根）のエッジは真っ直ぐ光を切るナイフの刃のように極めて高精度に仕上げられ、後幕との間に均一な「光のすき間（スリット）」を作ります。"],formula:{expression:"走行時間 t_travel ≈ 2.0 – 2.5 ms（24 mmを平均時速約 35–43 km/h で疾走）",description:"加速度 a = F / m。羽根の質量 m を 0.05 mm CFRPで極限まで軽くすることで 3,000 G 級の瞬間加速を実現します。"},nextGenInnovation:"最新フラッグシップ（Sony α1 II 等）では、航空宇宙グレードの超軽量カーボンファイバー羽根を採用し、フルサイズ縦24 mmを約2ミリ秒台で走り抜ける超高速幕速と50万回超の耐久性を両立しています。",specs:[{label:"羽根枚数 / 材質",value:"4枚連動 / 炭素繊維強化樹脂 (CFRP)"},{label:"羽根の厚み",value:"約 0.045 – 0.06 mm（コピー用紙より薄い）"},{label:"走行距離 / 時間",value:"縦 24.0 mm / 約 2.0 – 2.5 ms"},{label:"瞬間最大加速度",value:"約 2,500 – 4,000 G"}],diagramType:"shutter_curtain1"},"shutter-link-1":{title:"先幕用・平行4節リンクアーム（パラレログラム機構）",subtitle:"1st Curtain Parallelogram 4-Bar Linkage Arms & Micro Rivets",category:"S04 / 精密リンク運動学",plainAnalogy:"ひとことで言うと「羽根が傾かずに真っ直ぐ上下するためのロボットアーム」。デスクライトのアームや電車の折りたたみドアと同じ「平行四辺形」の仕組みで、4枚の羽根をキレイに水平のまま折り畳みます！",summary:"開口部の右脇に隠れた2本の平行アーム（主駆動アーム＋従動アーム）。4枚のシャッター羽根の右端をそれぞれ小さなリベットピン（カシメ軸）で2点ずつ支え、アームが回転すると全羽根が平行を保ったまま一瞬で展開・収納されます。",opticsAndPhysics:["平行4節リンクの幾何学：1本のアームだけで羽根を回すと、ワイパーのように羽根が斜めに傾いてしまいます。同じ長さの2本のアームを平行四辺形に組むことで、アームが何回転しても羽根は必ず「真横（水平）」を保ち続けます。","羽根ごとにアームへの取り付け位置（半径 r₁ > r₂ > r₃ > r₄）を少しずつ変えてあるため、アームが90°回ると一番外側の1枚目は大きく移動し、4枚目は小さく移動して、全員が同時にピッタリ1枚分に折り重なります！","軸ピン（カシメ）のガタがわずか数ミクロンでも増えると高速走行時に羽根同士が擦れて故障するため、超高精度ステンレス抜き加工と耐摩耗DLCコーティングが施されています。"],formula:{expression:"y_i(θ) = r_i · sin(θ)   （r₁ > r₂ > r₃ > r₄ の比率設計で全4枚が同期折りたたみ）",description:"同じ回転角 θ でもピン半径 r_i を階段状に変えることで、4枚の羽根が重なりながら均一に展開・収納されます。"},nextGenInnovation:"リンクアームの穴あけ軽量化（トポロジー最適化）と低摩擦カシメ軸により、回転慣性モーメントを徹底削減。連写10〜15コマ/秒の高速往復でも50万回以上の長寿命を実現しています。",specs:[{label:"リンク形式",value:"平行4節リンク（パラレログラム機構）"},{label:"アーム材質",value:"高張力精密プレス・ステンレス鋼"},{label:"結合部",value:"高精度マイクロカシメピン × 8点"},{label:"運動特性",value:"傾きゼロ水平維持＋4枚同時折りたたみ"}],diagramType:"shutter_link1"},"shutter-mid-plate":{title:"中間遮光仕切り板（インターミディエイト・セパレータ）",subtitle:"Intermediate Partition Plate (Curtain Chamber Separator)",category:"S05 / 2室分離・非接触ガイド",plainAnalogy:"ひとことで言うと「追いかけっこする2枚のカーテンの間に立つ超うすい仕切り壁」。時速40 kmですれ違う先幕と後幕が絶対にぶつかったり引っかかったりしないように部屋を2つに分けています！",summary:"先幕羽根室と後幕羽根室のちょうど真ん中に挟み込まれた、厚さわずか0.15 mmほどの極薄金属仕切り板。2つのカーテンが超高速で連続走行しても物理的に接触・絡み合いが起きないよう完全に分離します。",opticsAndPhysics:["もし仕切り板がなかったら？：1/8000秒の撮影では、先幕と後幕がわずか「1 mmのすき間」を保って時速40 kmで並走します。高速移動で生じる空気の渦（ベルヌーイ効果の負圧）で薄い羽根同士が吸い寄せられて衝突・破損してしまいます。","中板は羽根の走行空間を完全に前後の2部屋へ分割しつつ、厚みを極限まで薄く設計しています。なぜ薄くするのか？→ 先幕と後幕の距離が離れすぎると、大口径レンズの斜め光束に対して影の落ち方が変わり、露出ムラが生じてしまうためです。","表面にはフッ素系などの超低摩擦・艶消し黒処理が施され、羽根が万が一軽く触れても傷や静電気・ブレーキ抵抗が起きないように配慮されています。"],formula:{expression:"Δz_curtains ≈ 0.4 – 0.6 mm（極薄中板 0.15 mm を挟んだ最小分離距離）",description:"「絶対に衝突させない安全性」と「光学的にほぼ同一平面とみなせる極薄設計」の両立。"},nextGenInnovation:"最新の高画素・大口径F1.2レンズ時代では、中板のさらなる薄肉化とエッジの極低反射処理により、1/8000秒の極細スリット露光時でも画面上下の明るさムラ（露出均一性）を極限まで高めています。",specs:[{label:"板厚",value:"約 0.12 – 0.18 mm（極薄精密金属板）"},{label:"表面処理",value:"低摩擦フッ素系つや消し黒コート"},{label:"配置位置",value:"先幕羽根室と後幕羽根室の完全中間"},{label:"設計目的",value:"高速すれ違い干渉防止・空気渦遮断"}],diagramType:"shutter_midplate"},"shutter-curtain-2":{title:"後幕（2nd Curtain）カーボン＆アルミ合金羽根群 × 4枚",subtitle:"2nd (Rear) Curtain — Slit-Forming Exposure Termination Blades",category:"S06 / 露光ストップ幕・スリット露光原理",plainAnalogy:"ひとことで言うと「光をピタッと止める2枚目のカーテン」。実は 1/8000秒 の超高速写真は、幕が1/8000秒で動くわけではなく、先幕が走り出した 0.000125秒後に後幕がすぐ後ろを追いかけ、“幅たった1 mmの光のすき間”でセンサーをスキャンして撮っているのです！",summary:"先幕が開いて露光が始まった直後、設定されたシャッタースピードちょうどの時間差で上から下へ追いかけて窓を閉じ、「撮影を終了」させる2枚目の4枚組羽根。高速シャッターの最大の秘密である「スリット露光」を生み出します。",opticsAndPhysics:["【素人でも一発でわかる1/8000秒の秘密】羽根自体がセンサー縦24 mmを端から端まで走り切るには約 2.2 ms（約1/450秒）かかります。それより速い 1/8000秒（0.125 ms）はどうやって撮るの？ → 先幕が全部開き切るのを待たず、0.125 ms 遅れですぐ後幕をスタートさせます！すると先幕と後幕の間に「幅 約1.3 mm の細い光のすき間（スリット）」ができ、そのすき間が上から下へ通り過ぎることで、センサーのどの場所もちょうど 1/8000秒だけ光を浴びるのです！","【なぜフラッシュは 1/250〜1/400秒 までなの？】ストロボの一瞬の閃光は「センサー全体がパカッと全開になっている瞬間」に光らせないと、幕に隠れた部分が真っ黒に写ってしまいます。先幕が全開になりきる限界速度が「フラッシュ同調速度（X-sync）」です。","【電子先幕（EFCS）のボケ欠け原理】先幕だけ電子化すると、先幕はセンサー表面（z=0）、後幕は数mm手前（z=+4mm）を走る段差ができ、F1.2＋1/4000秒以上の極細スリットでは斜め光の片側が遮られて玉ボケの上下が欠けます。メカ先幕＋メカ後幕なら同じ距離なので美しい丸ボケが保たれます！"],formula:{expression:"スリット幅 W_slit = H · (t_exp / t_travel)   ⇒  1/8000秒時: 24 mm × (0.125 / 2.2) ≈ 1.36 mm",description:"シャッタースピードが速くなるほど2枚のカーテンの間隔（スリット幅）が細くなります。"},nextGenInnovation:"先幕と後幕の走行カーブ（加速プロファイル）をマイクロ秒レベルで完全一致させることで、幅わずか1.3 mmの1/8000秒スリットでも画面の上端から下端まで明るさ誤差ほぼゼロの超高精度露光を実現しています。",specs:[{label:"1/8000秒スリット幅",value:"約 1.2 – 1.5 mm（極細光の帯）"},{label:"フラッシュ同調速度",value:"最大 1/400秒（デュアル駆動時）"},{label:"羽根材質",value:"CFRP カーボン / 超軽量アルミ合金 4枚"},{label:"露光精度",value:"マイクロ秒単位の電子スタート時間差制御"}],diagramType:"shutter_curtain2"},"shutter-link-2":{title:"後幕用・平行4節リンクアーム ＆ ドライブピン",subtitle:"2nd Curtain Parallelogram Linkage Arms & High-Strength Drive Pin",category:"S07 / 同期リンク機構",plainAnalogy:"ひとことで言うと「2枚目のカーテンを1枚目とそっくり同じスピード・同じリズムで走らせる双子のロボットアーム」。2人のランナーの走るスピードがピタッと一致しているから、画面の上も下も同じ明るさで写ります！",summary:"後幕4枚の羽根を水平に保ったまま高速展開させる平行4節リンク機構。先幕リンクと完全に同じ運動学（角速度・慣性モーメント）になるよう設計され、スリット幅が画面の上から下まで1ミクロンも狂わないように制御します。",opticsAndPhysics:["先幕と後幕の「速度カーブ一致」が命：もし後幕が先幕より少しでも速く走ると、下に行くほどスリットが狭くなって写真の下側が暗くなります（露出ムラ）。アーム形状・質量・軸摩擦を先幕側と厳密に対称一致させています。","ドライブピンは駆動バネの強烈なトルクをリンクアームへ伝える要（かなめ）の部品。50万回もの高衝撃荷重に耐えるため、焼き入れクロムモリブデン鋼や表面硬化処理が施されています。","シャッター待機状態（ライブビュー中）では、先幕は下ポケット・後幕は上ポケットに退避してセンサーを全開にしておき、電子ファインダー（EVF）にリアルタイム映像を映します。"],formula:{expression:"v_curtain2(y) ≡ v_curtain1(y)   ⇒   画面全域で Δt_exp(y) = const.",description:"任意の位置 y で先幕と後幕の速度が一致しているときのみ、スリット幅と露光時間が画面全域で均一になります。"},nextGenInnovation:"ミラーレス機ではライブビューのため撮影直前までシャッターを開きっぱなしにする必要があり、撮影の瞬間に先幕を閉じる動作を省く「電子先幕（EFCS）」時は、この後幕リンクだけが単独で高速駆動します。",specs:[{label:"リンク構成",value:"主駆動アーム + 従動平行アーム（先幕と等慣性設計）"},{label:"ドライブピン材質",value:"焼き入れ高強度鋼 + 低摩擦表面処理"},{label:"耐久回数",value:"500,000 回レリーズ試験クリア"},{label:"役割",value:"スリット幅の画面上下均一性維持"}],diagramType:"shutter_link2"},"shutter-dual-drive":{title:"デュアル駆動アクチュエータ（高張力トーションバネ ＋ 電磁ブースター）",subtitle:"Dual-Driven Actuator — Torsion Springs & Electromagnetic Boost Motor",category:"S08 / ハイブリッド超高速動力源",plainAnalogy:"ひとことで言うと「強力なパチンコのバネに、電気のターボエンジンを合体させた最新の発射台！」。普段はバネの力で軽快に走り、1/400秒の超高速フラッシュ撮影のときだけ電磁石がグッと背中を押して加速します！",summary:"従来のバネだけの駆動を超え、高張力トーション（ねじり）巻きばねと電磁アクチュエータ（銅コイル＋ネオジム磁石ローター）の2つの動力を融合した、最新フラッグシップ一眼（Sony α1 / α1 II等）の象徴的ハイブリッド駆動機構。",opticsAndPhysics:["なぜバネを使うの？：小型モーターだけで羽根を0.002秒で時速40 kmまで加速するには巨大な電流と重いモーターが必要です。あらかじめモーターでゆっくり「ねじりバネ」に弾性エネルギー E = ½kθ² を蓄えておき、一瞬で解き放つことで、小さな部品から圧倒的な瞬間パワーを引き出せます。","最新「デュアル駆動」のブレイクスルー：バネを強くしすぎると衝撃と摩耗が増えて寿命が縮みます。そこで普段はバネ駆動で軽快＆長寿命を保ち、1/320〜1/400秒の高速フラッシュ同調が必要なときだけ電磁アクチュエータがローレンツ力で追加加速（ブースト）して幕速を極限まで引き上げます！","トーションバネ基部の微調整ラチェットにより、工場組立時に先幕・後幕のバネ張力をミリ秒精度で完璧にバランス調整できます。"],formula:{expression:"τ_total = k_spring · θ + K_t · I_boost   （バネ弾性トルク ＋ 電磁ブーストトルク）",description:"バネの高瞬発力と電磁アクチュエータの可変ブーストを組み合わせ、世界最速クラスのメカ1/400秒同調を達成。"},nextGenInnovation:"フルサイズ一眼のメカシャッターでは長年 1/250秒が壁とされてきましたが、カーボン羽根＋バネ＆電磁アクチュエータのデュアル駆動により、メカシャッターで世界最速の「1/400秒フラッシュ同調」と「50万回耐久」を同時に突破しました。",specs:[{label:"駆動方式",value:"バネ駆動 ＋ 電磁アクチュエータ（デュアル駆動）"},{label:"バネ種類",value:"先幕/後幕 独立 高張力ステンレス・トーションばね"},{label:"ブースト機構",value:"銅巻線電磁コイル ＋ ネオジム磁石ローター"},{label:"達成フラッシュ同調",value:"フルサイズ最速 1/400 秒（APS-C 1/500 秒）"}],diagramType:"shutter_dual_drive"},"shutter-magnets":{title:"マイクロ秒制御・先幕＆後幕ホールド電磁石（ツイン・ソレノイド）",subtitle:"Microsecond-Precision Front & Rear Holding Electromagnets",category:"S09 / 電子タイミング制御トリガー",plainAnalogy:"ひとことで言うと「100万分の1秒の正確さでカーテンを離す『電気の引き金』」。バネで今にも飛び出したい先幕と後幕を、2つの小さな電磁石がピタッと吸い付けて待機させ、電気を切るタイミングの差だけでシャッター速度を決めます！",summary:"先幕用と後幕用の2基の超高速応答パーマロイ鉄心電磁石（ソレノイド）。カメラ内部の水晶クロックに同期して「先幕の電気を切る → 正確な時間差の後に後幕の電気を切る」ことで、30秒から1/8000秒まで狂いなくシャッター速度を制御します。",opticsAndPhysics:["どうやって 1/8000秒（0.000125秒）なんて正確な時間差を作るの？：機械の歯車タイマーでは不可能です。カメラの頭脳（水晶発振器、毎秒数千万回の振動）がカウントし、先幕マグネットの電流をOFFにしてからちょうど 125 マイクロ秒後に後幕マグネットの電流をOFFにします。","超高速磁気切れ設計：普通の鉄は電気を切っても少し磁力が残って（残留磁気）離れるのが遅れます。そこでヒステリシス損失が極めて小さいパーマロイ（ニッケル鉄合金）鉄心と逆パルス消磁回路を使い、電気を切った瞬間にゼロ遅延でアマチュア（鉄片）を解放します。","消費電力削減のため、永久磁石と打ち消しコイルを組み合わせた省エネ型ホールド方式も最新ミラーレスで広く採用されています。"],formula:{expression:"Δt_release = t_rear_off − t_front_off = 1 / (Shutter Speed)   （分解能 < 1 μs）",description:"2つの電磁石の解放時刻の差 Δt_release が、そのまま写真のシャッタースピードになります。"},nextGenInnovation:"後述の「光学式幕速モニター」と連動し、気温変化や経年変化で電磁石の応答遅れ（数マイクロ秒）が起きても自動で通電遮断タイミングを補正するクローズドループ制御が実装されています。",specs:[{label:"構成",value:"先幕用・後幕用 独立ツイン電磁石（ソレノイド）"},{label:"鉄心材料",value:"高透磁率・低残留磁気 パーマロイ合金"},{label:"タイミング制御精度",value:"マイクロ秒（1/1,000,000 秒）オーダー"},{label:"対応露光範囲",value:"30 秒 〜 1/8000 秒 ＋ バルブ撮影"}],diagramType:"shutter_magnets"},"shutter-charge-motor":{title:"50万回耐久コアレスDCチャージモーター ＆ 減速ギア・チャージカム",subtitle:"High-Speed Coreless DC Charge Motor, Gear Train & Cocking Cam",category:"S10 / 高速自動巻き上げ駆動系",plainAnalogy:"ひとことで言うと「写真を1枚撮るたびに、一瞬でバネとカーテンを元の発射位置にセットし直す自動巻き上げエンジン」。1秒間に10〜15枚も連写できるのは、この小さなモーターと歯車たちが目にも留まらぬ速さでバネを巻き戻しているからです！",summary:"露光が終わって伸びきった先幕・後幕の駆動バネとリンクアームを、次の撮影に向けて瞬時にチャージ（巻き上げ・電磁石へ再吸着）するためのコアレスDCモーター、多段減速歯車列、および偏心チャージカム機構。",opticsAndPhysics:["コアレスDCモーターとは？：通常のモーターにある重い鉄芯（コア）をなくし、極細の銅線をカゴ状に編んだ超軽量ローターにしたモーターです。回転の立ち上がりと停止が圧倒的に速く、シャッターを切ってからわずか約0.03秒で次のチャージを完了させます。","多段減速ギアトレイン：モーターの高速・低トルク回転を、真鍮ピニオンギアと静音・自己潤滑性の高いPOM（ポリアセタール）樹脂平歯車の多段噛み合いで大きな力（高トルク）へ変換し、強力なシャッター駆動バネを軽々と巻き上げます。","偏心チャージカムとレバー：カムが1回転する間に、まず先幕・後幕のリンクアームを押し上げてバネをねじり、電磁石に密着させた後、カムが逃げて次の発射の邪魔にならない位置で待機します。"],formula:{expression:"τ_cam = τ_motor × (Z₂/Z₁) × (Z₄/Z₃) × η_gear   （減速比 約 25:1 〜 40:1）",description:"高速回転の小型コアレスモーターの力を減速ギア列で数十倍のトルクに増幅し、毎秒10〜15回の高速連写を支えます。"},nextGenInnovation:"最新ミラーレスでは静音化も極めて重視されており、歯車プロファイルの最適化と低振動コアレス制御（チャージ速度を撮影モードに応じて可変制御するサイレントチャージ）により、動作音と振動を大幅に低減しています。",specs:[{label:"モーター形式",value:"高応答・長寿命 コアレスDCモーター"},{label:"ギア材質",value:"高精度真鍮ギア ＋ 自己潤滑 POM樹脂ギア"},{label:"連写対応速度",value:"メカシャッター最大 10 – 15 コマ/秒"},{label:"チャージ機構",value:"偏心チャージカム ＋ スプリング戻しレバー"}],diagramType:"shutter_charge_motor"},"shutter-optical-sensor":{title:"幕速自己診断・赤外線フォトインタラプタ光学センサー",subtitle:"Self-Diagnostic IR Photo-Interrupter Curtain Speed Monitor",category:"S11 / 光学自己診断・自動キャリブレーション",plainAnalogy:"ひとことで言うと「シャッターの走る速さを毎回赤外線レーザーでチェックして自動でズレを直す『賢い審判センサー』」。真冬の雪山でも、何十万回撮った後でも、1/8000秒の明るさが狂わない秘密です！",summary:"先幕と後幕の走行経路の脇に配置された2組の透過型赤外線フォトインタラプタ（赤外LED＋フォトトランジスタ）。羽根やアームが通過して赤外線を遮った時刻を1枚撮るごとに実測し、カメラのCPUへフィードバックします。",opticsAndPhysics:["なぜ毎回測る必要があるの？：マイナス10℃の雪山では潤滑グリスが硬くなり、逆に夏場や30万回撮影後にはバネや摩擦がわずかに変化します。もし幕速がたった 0.1 ms ズレただけで、1/8000秒（0.125 ms）の写真は真っ暗になったり白飛びしたりしてしまいます！","フォトインタラプタの仕組み：コの字型センサーの片側から目に見えない赤外線LED（波長 ~940 nm）を照射し、反対側の受光素子で受けます。シャッター幕の端が横切って光が途切れた瞬間の電圧変化から、走行時間をマイクロ秒単位で自動測定します。","自動補正フィードバック：実測した走行速度と理想値のわずかな差をカメラが学習し、次のショットの電磁石オフ時刻をリアルタイムで自動補正。工場出荷時の精度を50万回まで維持し続けます。"],formula:{expression:"t_error = t_measured − t_ideal   ⇒   t_next_rear = t_rear − K_p · t_error",description:"毎ショットの赤外線通過時間計測に基づくクローズドループ自己診断キャリブレーション。"},nextGenInnovation:"ハイエンド機ではこの光学モニターが異常な減速や羽根破損の予兆まで自動検知し、撮像センサーを傷つける前にエラー停止するフェイルセーフ保護機能も担っています。",specs:[{label:"検出方式",value:"透過型 赤外線フォトインタラプタ × 2組"},{label:"使用波長",value:"近赤外 LED（約 940 nm・可視光漏れ防止）"},{label:"時間分解能",value:"マイクロ秒（μs）オーダーの幕速実測"},{label:"機能",value:"温度変化・経年摩耗の自動露光補正＆異常診断"}],diagramType:"shutter_opt_sensor"},"shutter-base-damper":{title:"高剛性ベース基板 ＆ バウンド防止ブレーキ・フローティング防振ダンパー",subtitle:"Shutter Base Chassis, Rebound Brake Damper & Anti-Vibration Floating Mounts",category:"S12 / 衝撃吸収・シャッターブレ防止",plainAnalogy:"ひとことで言うと「時速40 kmの羽根をピタッと止める『やわらかい衝撃吸収ブレーキ』と、振動をボディに伝えない『ゴムのクッション』」。これがないと羽根が跳ね返って写真に白い筋が出たり、カメラがブルッと揺れて写真がブレてしまいます！",summary:"シャッター全機構を支える高剛性ベース基板に、高速走行後の羽根の跳ね返り（バウンド）を吸収する特殊エラストマーブレーキと、ユニット全体をカメラ本体からゴムで浮かせて振動を遮断する4点フローティング防振ダンパーを統合した土台。",opticsAndPhysics:["リバウンド（跳ね返り）防止ブレーキ：時速40 kmで走ってきた羽根が硬い金属ストッパーにぶつかると、ボールのように跳ね返って（バウンドして）わずかに窓が再び開いてしまい、写真の端に白い光の帯が写り込みます。高い内部損失（ヒステリシス減衰）を持つ特殊エラストマーゴムと摩擦ブレーキで、運動エネルギー ½mv² を一瞬で熱に変えて跳ね返りゼロで受け止めます。","シャッターショック（微ブレ）の遮断：5000万画素を超える最新高画素カメラでは、羽根が止まる瞬間のわずかな衝撃だけで1ピクセル以上ブレて解像感が落ちます。四隅を弾性シリコン防振ブッシュ（青いゴムリング）でフローティング懸架することで、ボディ本体や隣の5軸IBISセンサーへの振動伝達を劇的にカットします。","さらに静音化にも大きく貢献し、プロ機特有の「コトッ」という上品でキレのある低振動シャッター音を生み出します。"],formula:{expression:"E_kinetic = ½ m v²  →  ブレーキ粘弾性ヒステリシスで 95% 以上を熱散逸（反発係数 e → 0）",description:"高い減衰比 ζ を持つブレーキゴムと防振ブッシュにより「バウンドゼロ」と「シャッターブレ極小化」を実現。"},nextGenInnovation:"最新の高画素ミラーレス（Sony α1 II / α7R V、Canon EOS R5 II等）では、フローティングダンパー構造と電子先幕シャッター（EFCS）の併用により、三脚なしの望遠・高画素撮影でもシャッターショックによる微ブレをほぼ完全に解消しています。",specs:[{label:"ベース基板材質",value:"ガラス繊維強化 PPS / マグネシウム複合シャーシ"},{label:"ブレーキ機構",value:"高減衰エラストマー（粘弾性吸収ゴム）× 2"},{label:"防振懸架",value:"4点シリコン・フローティング防振ダンパーブッシュ"},{label:"設計寿命",value:"500,000 回以上の高衝撃サイクルに耐える設計"}],diagramType:"shutter_damper"}};function gn(i,e,t,n,s,o,r,a,l=.24){n.position.copy(s),gs(n,i);const{meshes:c,edges:h}=ms(n,a,26,l);return{id:i,subsystem:"shutter",order:e,swatchColor:t,group:n,assembledPos:s,explodeOffset:o,integratedExplodeOffset:r,interactiveMeshes:c,edgeLines:h,explanation:X1[i]}}function Y1(i){const e=[],t=i.clippingPlanes,n=74,s=54,o=7.5,r=37.6,a=25.6,l=[],c=[],h=[],u=[],d=new se,f=new se,g=new se,x=new se,m=new se;{const b=new se,v=Je(n,s,4.2,r,a,.9,-o,0),y=20.4,M=42,C=23.2,A=2.4,I=new $t,U=C-y/2,k=C+y/2,B=-M/2,O=M/2;I.moveTo(U+A,B),I.lineTo(k-A,B),I.quadraticCurveTo(k,B,k,B+A),I.lineTo(k,O-A),I.quadraticCurveTo(k,O,k-A,O),I.lineTo(U+A,O),I.quadraticCurveTo(U,O,U,O-A),I.lineTo(U,B+A),I.quadraticCurveTo(U,B,U+A,B),v.holes.push(I),Vn(v,[[-n/2+4.5,s/2-4.5,1.5],[n/2-4.5,s/2-4.5,1.5],[-n/2+4.5,-s/2+4.5,1.5],[n/2-4.5,-s/2+4.5,1.5]]);const X=new w(me(v,.72,.08,.08,20),i.matteBlackAnodized);X.position.x=o,b.add(X);const J=Je(r+3.2,a+3.2,1.2,r,a,.8),ce=new w(me(J,.45,.06,.08,16),i.matteBlackAnodized);ce.position.z=.36,b.add(ce);for(const[pe,Oe]of[[o-n/2+4.5,s/2-4.5],[o+n/2-4.5,s/2-4.5],[o-n/2+4.5,-s/2+4.5],[o+n/2-4.5,-s/2+4.5]]){const q=En(1.45,.48,1.1,i.stainlessMachined);q.position.set(pe,Oe,.34),b.add(q)}e.push(gn("shutter-front-cover",1,"#202328",b,new _(0,0,17.6),new _(0,0,44),new _(0,0,96),t,.26))}{const b=new se,v=new w(new G(1.6,38,.62),i.midPlateSteel);v.position.set(-20.4,2,0);const y=new w(new G(1.6,38,.62),i.midPlateSteel);y.position.set(20.4,2,0),b.add(v,y);for(let C=0;C<3;C++){const A=new w(new G(39.4,8.6,.16),i.shutterShieldBlade);A.position.set(0,18.2-C*1.15,(1-C)*.19),b.add(A),h.push(A)}const M=new w(new G(4.2,2.4,.52),i.linkArmSteel);M.position.set(21.6,17.2,0),b.add(M),e.push(gn("shutter-dust-shield",2,"#4c5869",b,new _(0,0,16.6),new _(0,0,34.5),new _(0,0,86),t,.28))}{const b=new se,v=41.2,y=7.4;for(let M=0;M<4;M++){const C=new G(v,y,.15),A=new w(C,i.carbonFiberBlade);if(A.position.set(.6,0,(1.5-M)*.17),M===0){const B=new w(new G(v,.55,.22),i.stainlessMachined);B.position.set(0,y/2-.28,.02),A.add(B)}const I=new De(.42,.42,.34,12);I.rotateX(Math.PI/2);const U=new w(I,i.brassGear);U.position.set(v/2-1.4,1.4,0);const k=new w(I,i.brassGear);k.position.set(v/2-1.4,-1.4,0),A.add(U,k),b.add(A),l.push(A)}e.push(gn("shutter-curtain-1",3,"#1f242d",b,new _(0,0,15.3),new _(0,0,25),new _(0,0,76.5),t,.3))}{const b=new se,v=(y,M)=>{const C=new se,A=dt(y,M,M*.45),I=me(A,.38,.04,.04,14);I.translate(-y/2+1.4,0,0);const U=new w(I,i.linkArmSteel);C.add(U);for(let O=1;O<=3;O++){const X=new De(.45,.45,.56,12);X.rotateX(Math.PI/2);const J=new w(X,i.brassGear);J.position.set(-O*(y/4.2),0,0),C.add(J)}const k=new De(1.45,1.45,.72,16);k.rotateX(Math.PI/2);const B=new w(k,i.brassGear);return C.add(B),C};d.add(v(14.5,2.3)),d.position.set(27,2.8,.14),f.add(v(14.5,2)),f.position.set(27,-3.2,-.14),b.add(d,f),e.push(gn("shutter-link-1",4,"#adb8c7",b,new _(0,0,14.8),new _(0,0,18),new _(0,0,69.5),t,.3))}{const b=new se,v=Je(66,48,3,r-.2,a-.2,.7,-4.5,0),y=new $t;y.moveTo(20.5,-15),y.lineTo(27.5,-15),y.lineTo(27.5,15),y.lineTo(20.5,15),y.closePath(),v.holes.push(y);const M=new w(me(v,.28,.03,.03,16),i.midPlateSteel);M.position.x=4.5,b.add(M);for(const C of[14.2,-14.2]){const A=new w(new G(36,.8,.42),i.matteBlackAnodized);A.position.set(0,C,0),b.add(A)}e.push(gn("shutter-mid-plate",5,"#4e5868",b,new _(0,0,14),new _(0,0,10.5),new _(0,0,62),t,.3))}{const b=new se,v=41.2,y=7.4;for(let M=0;M<4;M++){const C=new G(v,y,.15),A=new w(C,i.carbonFiberBladeRear);if(A.position.set(.6,0,(1.5-M)*.17),M===0){const B=new w(new G(v,.55,.22),i.goldPlating);B.position.set(0,-y/2+.28,.02),A.add(B)}const I=new De(.42,.42,.34,12);I.rotateX(Math.PI/2);const U=new w(I,i.stainlessMachined);U.position.set(v/2-1.4,1.4,0);const k=new w(I,i.stainlessMachined);k.position.set(v/2-1.4,-1.4,0),A.add(U,k),b.add(A),c.push(A)}e.push(gn("shutter-curtain-2",6,"#56657c",b,new _(0,0,12.9),new _(0,0,3),new _(0,0,54.5),t,.3))}{const b=new se,v=(y,M)=>{const C=new se,A=dt(y,M,M*.45),I=me(A,.38,.04,.04,14);I.translate(-y/2+1.4,0,0);const U=new w(I,i.stainlessMachined);C.add(U);for(let O=1;O<=3;O++){const X=new De(.45,.45,.56,12);X.rotateX(Math.PI/2);const J=new w(X,i.goldPlating);J.position.set(-O*(y/4.2),0,0),C.add(J)}const k=new De(1.45,1.45,.72,16);k.rotateX(Math.PI/2);const B=new w(k,i.goldPlating);return C.add(B),C};g.add(v(14.5,2.3)),g.position.set(27,6.2,.14),x.add(v(14.5,2)),x.position.set(27,.2,-.14),b.add(g,x),e.push(gn("shutter-link-2",7,"#8c99ab",b,new _(0,0,12.4),new _(0,0,-4),new _(0,0,48),t,.3))}let p;{const b=new se;for(const[I,U]of[[3,0],[-5.2,1]]){const k=new w(k1(2.6,2.8,4.5,.32,4.8),i.stainlessMachined);k.position.set(27,I,.3),k.userData.noEdges=!0,b.add(k);const B=new w(Gs(14,3.1,.9,1.1),i.brassGear);B.position.set(27,I,-1.4),b.add(B);const O=new De(.95,.95,4.2,14);O.rotateX(Math.PI/2);const X=new w(O,i.linkArmSteel);X.position.set(27,I,-.2),b.add(X)}const v=new w(new G(8.2,9.6,2.8),i.softIronYoke);v.position.set(36.2,-1,0),b.add(v);const y=new De(3.4,3.4,3.3,24);y.rotateX(Math.PI/2);const M=new w(y,i.copperCoil);M.position.set(36.2,-1,0),b.add(M);const C=new De(2.1,2.1,3.8,18);C.rotateX(Math.PI/2);const A=new w(C,i.neodymiumMagnet);A.position.set(36.2,-1,0),b.add(A),p=new w(new hn(3.9,.24,10,32),new bt({color:875481,transparent:!0,opacity:0,clippingPlanes:t})),p.position.set(36.2,-1,1.75),p.userData.noEdges=!0,b.add(p),e.push(gn("shutter-dual-drive",8,"#c86432",b,new _(0,0,13),new _(12,0,-10.5),new _(10,0,41),t,.24))}let T,E;{const b=new se,v=(A,I)=>{const U=new se;U.position.set(A,I,0);const k=new w(new G(6.8,2.2,2.4),i.softIronYoke);k.position.set(0,2.6,0);const B=new w(new G(1.6,5.2,2.2),i.softIronYoke);B.position.set(-2.3,0,0);const O=new w(new G(1.6,5.2,2.2),i.softIronYoke);O.position.set(2.3,0,0),U.add(k,B,O);const X=new w(new G(2.7,3.6,2.9),i.copperCoil);X.position.set(-2.3,.2,0);const J=new w(new G(2.7,3.6,2.9),i.copperCoil);J.position.set(2.3,.2,0),U.add(X,J);const ce=new w(new G(7.2,1.1,2),i.stainlessMachined);ce.position.set(0,-3.2,0),U.add(ce);const pe=new w(new Et(.62,12,10),new bt({color:959977,transparent:!0,opacity:0,clippingPlanes:t}));return pe.position.set(0,4.1,1.3),pe.userData.noEdges=!0,U.add(pe),{sub:U,glow:pe}},y=v(26.5,16.5),M=v(36,16.5);T=y.glow,E=M.glow;const C=new w(new G(16,1.8,.22),i.polyimideFpc);C.position.set(31.2,20.4,-.5),b.add(y.sub,M.sub,C),e.push(gn("shutter-magnets",9,"#d97724",b,new _(0,0,12.5),new _(16,5,-17),new _(14,4,34),t,.24))}{const b=new se,v=new w(new De(4.4,4.4,13.5,24),i.stainlessMachined);v.position.set(36.2,-16.8,0),b.add(v);const y=new w(new De(4.3,4.3,1.8,24),i.icEpoxy);y.position.set(36.2,-24.1,0),b.add(y);for(const k of[34.8,37.6]){const B=new w(new G(.6,1.6,.4),i.goldPlating);B.position.set(k,-25.4,0),b.add(B)}const M=new w(Gs(10,1.8,3,.6),i.brassGear);M.rotation.x=Math.PI/2,M.position.set(36.2,-8.5,0),b.add(M);const C=[{x:30.8,y:-11.5,z:.4,teeth:20,r:3.9,mat:i.pomGear},{x:25,y:-14.8,z:-.2,teeth:16,r:3.1,mat:i.brassGear},{x:29.5,y:-19.8,z:.5,teeth:22,r:4.2,mat:i.pomGear},{x:22.8,y:-21,z:-.3,teeth:18,r:3.4,mat:i.pomGear}];for(const k of C){const B=new w(Gs(k.teeth,k.r,1.45,.9),k.mat);B.position.set(k.x,k.y,k.z),b.add(B),u.push(B);const O=new De(.75,.75,2.2,12);O.rotateX(Math.PI/2);const X=new w(O,i.stainlessMachined);X.position.set(k.x,k.y,k.z),b.add(X)}const A=new on;A.absarc(0,0,2.6,0,Math.PI*1.4,!1),A.lineTo(3.8,-1.8),A.lineTo(2.6,0);const I=new w(me(A,1.3,.06,.06,20),i.brassGear),U=new w(new G(1.6,8.8,.55),i.linkArmSteel);U.position.set(.4,4.4,.7),m.add(I,U),m.position.set(22.8,-21,.8),b.add(m),e.push(gn("shutter-charge-motor",10,"#d4a948",b,new _(0,0,12.2),new _(20,-4,-23.5),new _(18,-4,27.5),t,.24))}{const b=new se;for(const[C,A]of[[19.8,10.6],[19.8,-10.6]]){const I=new w(new G(3.4,3.8,2.2),i.icEpoxy);I.position.set(C,A,0),b.add(I);const U=new w(new De(.62,.62,.5,14),i.irLedLens);U.rotation.z=Math.PI/2,U.position.set(C-1.75,A,.45);const k=new w(new De(.62,.62,.5,14),i.siliconBulk);k.rotation.z=Math.PI/2,k.position.set(C-1.75,A,-.45),b.add(U,k)}const v=new w(new G(2.6,26,.2),i.polyimideFpc);v.position.set(21.4,0,-.85);const y=new w(new G(12,6.2,.2),i.polyimideFpc);y.position.set(26.5,22.8,-.85);const M=new w(new G(2,5.6,.24),i.goldPlating);M.position.set(32,22.8,-.82),b.add(v,y,M),e.push(gn("shutter-optical-sensor",11,"#be123c",b,new _(0,0,11.6),new _(8,0,-29.5),new _(8,0,21.5),t,.26))}{const b=new se,v=Je(n+2,s+2,4.6,r,a,.9,-o,0),y=new w(me(v,1.35,.12,.12,20),i.shutterChassis);y.position.x=o,b.add(y);const M=new w(new G(1.4,s-4,4.2),i.shutterChassis);M.position.set(o+n/2-.5,0,2.2),b.add(M);for(const C of[15.8,-15.8]){const A=new w(new G(22,2.6,2.4),i.damperElastomer);A.position.set(0,C,1.45),b.add(A);for(const I of[-7.5,7.5]){const U=new w(new G(4.2,1.2,2.7),i.brassGear);U.position.set(I,C,1.55),b.add(U)}}for(const[C,A]of[[o-n/2+2.5,s/2-2.5],[o+n/2-2.5,s/2-2.5],[o-n/2+2.5,-s/2+2.5],[o+n/2-2.5,-s/2+2.5]]){const I=new De(3.2,3.2,2.4,22);I.rotateX(Math.PI/2);const U=new w(I,i.antiVibRubber);U.position.set(C,A,0),b.add(U);const k=new De(1.65,1.65,2.65,18);k.rotateX(Math.PI/2);const B=new w(k,i.brassGear);B.position.set(C,A,0),b.add(B)}e.push(gn("shutter-base-damper",12,"#c44536",b,new _(0,0,10.8),new _(0,0,-37),new _(0,0,15),t,.24))}const S={curtain1EdgeY:-2.2,curtain2EdgeY:4.8,phaseLabel:"slit",boostActive:!1,irTrigger1:!1,irTrigger2:!1},z=b=>{const v=ze.clamp(b,0,1),y=[9.5,3.2,-3.1,-9.4],M=-17.6;for(let A=0;A<4;A++){const I=ze.lerp(y[A],M-A*.35,v);l[A].position.y=I}const C=ze.lerp(.56,-.62,v);return d.rotation.z=C,f.rotation.z=C,l[0].position.y+3.7},D=b=>{const v=ze.clamp(b,0,1),y=[-9.4,-3.1,3.2,9.5],M=17.6;for(let A=0;A<4;A++){const I=ze.lerp(M+A*.35,y[A],v);c[A].position.y=I}const C=ze.lerp(.62,-.56,v);return g.rotation.z=C,x.rotation.z=C,c[0].position.y-3.7},R=(b,v)=>{if(!v){const O=z(.56),X=D(.36);S.curtain1EdgeY=O,S.curtain2EdgeY=X,S.phaseLabel="slit",S.boostActive=!1,S.irTrigger1=!1,S.irTrigger2=!1,p.material.opacity=0,T.material.opacity=0,E.material.opacity=0;return}const y=(b+1.6)%7/7;let M=0,C=0,A=!1,I=.85,U=.85;if(y<.64){const O=ze.clamp(y/.48,0,1),X=ze.clamp((y-.14)/.48,0,1);M=O*O*(3-2*O),C=X*X*(3-2*X),I=0,U=X>0?0:.9,A=O>.02&&O<.9,S.phaseLabel="slit"}else if(y<.72)M=1,C=1,I=0,U=0,S.phaseLabel="closed";else if(y<.92){const O=ze.clamp((y-.72)/.2,0,1),X=O*O*(3-2*O);M=1-X,C=ze.clamp(1-X+.14*Math.sin(O*Math.PI),0,1),I=O>.82?.85:0,U=O>.82?.85:0,S.phaseLabel="charging";const J=X*Math.PI*6;u[0].rotation.z=J,u[1].rotation.z=-J*1.25,u[2].rotation.z=J*.85,u[3].rotation.z=-J*.95,m.rotation.z=X*Math.PI*2}else M=0,C=0,S.phaseLabel="closed";const k=z(M),B=D(C);S.curtain1EdgeY=k,S.curtain2EdgeY=B,S.boostActive=A,S.irTrigger1=Math.abs(k-10.6)<2.2||Math.abs(k+10.6)<2.2,S.irTrigger2=Math.abs(B-10.6)<2.2||Math.abs(B+10.6)<2.2,p.material.opacity=A?.55+Math.sin(b*28)*.3:0,T.material.opacity=I,E.material.opacity=U};return R(0,!1),{parts:e,rig:{curtain1Blades:l,curtain2Blades:c,link1Main:d,link1Sub:f,link2Main:g,link2Sub:x,shieldBlades:h,chargeGears:u,chargeCam:m,dualBoostCoilGlow:p,magnet1Glow:T,magnet2Glow:E,slitState:S,applyKinematics:R}}}function Z1(i){const e=new se,t=new se,n=[[-25,22.5],[40,22.5],[-25,-22.5],[40,-22.5]],s=new _n({color:10134450,dashSize:1.8,gapSize:1.4,transparent:!0,opacity:0,clippingPlanes:i}),o=[];for(const[D,R]of n){const b=new Ke().setFromPoints([new _(D,R,20),new _(D,R,10)]),v=new wt(b,s);v.computeLineDistances(),t.add(v),o.push(v)}t.visible=!1;const r=[],a=[-12.5,0,12.5],l=[10.2,6.8,3.4,0,-3.4,-6.8,-10.2],c=new Et(.42,10,8),h=new Et(.48,12,10);for(let D=0;D<a.length;D++)for(let R=0;R<l.length;R++){const b=a[D],v=l[R],y=new It({color:2450411,transparent:!0,opacity:.45,clippingPlanes:i}),M=new Ke().setFromPoints([new _(b,v,38),new _(b,v,15)]),C=new wt(M,y);e.add(C);const A=new w(c,new bt({color:9741240,transparent:!0,opacity:.65,clippingPlanes:i}));e.add(A);const I=new w(h,new bt({color:16096779,transparent:!0,opacity:.95,clippingPlanes:i}));e.add(I),r.push({x:b,y:v,line:C,hitDot:A,photon:I,phase:(D*.29+R*.17)%1})}const u=new bt({color:16096779,transparent:!0,opacity:.34,side:Rt,depthWrite:!1,clippingPlanes:i}),d=new w(new G(36,1,1),u);e.add(d);const f=new bt({color:15357964,transparent:!0,opacity:.72,side:Rt,depthWrite:!1,clippingPlanes:i}),g=new w(new Tn(36,1),f);e.add(g);const x=new It({color:14251782,transparent:!0,opacity:.85,clippingPlanes:i}),m=new Ea(new Aa(new G(36,1,1)),x);e.add(m);const p=new Ea(new Aa(new Tn(36,24)),new It({color:165063,transparent:!0,opacity:.52,clippingPlanes:i}));e.add(p);const T=[];for(const D of[10.6,-10.6]){const R=new Ke().setFromPoints([new _(18,D,12.1),new _(18,D,11.1)]),b=new It({color:14753096,transparent:!0,opacity:.85,clippingPlanes:i}),v=new wt(R,b);e.add(v);const y=new w(new ii(.85,1.35,24),new bt({color:16007006,transparent:!0,opacity:0,side:Rt,clippingPlanes:i}));y.position.set(18,D,12.4),e.add(y),T.push({line:v,pulse:y,y:D})}return e.visible=!1,{overlayGroup:e,explodeGuides:t,setVisible:D=>{e.visible=D},updateGuides:(D,R,b)=>{const v=ze.clamp((D-.04)*.55,0,.42);if(t.visible=R&&v>.01,s.opacity=v,!t.visible)return;const y=b.find(I=>I.id==="shutter-front-cover"),M=b.find(I=>I.id==="shutter-base-damper"),C=(y?y.group.position.z:17.6)+2.5,A=(M?M.group.position.z:10.8)-2.5;o.forEach((I,U)=>{const[k,B]=n[U],O=I.geometry.attributes.position;O.setXYZ(0,k,B,C),O.setXYZ(1,k,B,A),O.needsUpdate=!0,I.computeLineDistances()})},update:(D,R,b,v,y)=>{if(!R)return;const M=v.find(Z=>Z.id==="shutter-front-cover"),C=v.find(Z=>Z.id==="shutter-curtain-1"),A=v.find(Z=>Z.id==="shutter-curtain-2"),I=v.find(Z=>Z.id==="shutter-optical-sensor"),U=v.find(Z=>Z.id==="shutter-base-damper"),k=M?M.group.position.z:17.6,B=C?C.group.position.z:15.3,O=A?A.group.position.z:12.9,X=I?I.group.position.z:11.6,J=U?U.group.position.z:10.8,ce=k+18,pe=b?Math.min(J-6,2):J-9.5,Oe=12.4,q=y.slitState.curtain1EdgeY,oe=y.slitState.curtain2EdgeY,ye=ze.clamp(q,-Oe,Oe),le=ze.clamp(oe,-Oe,Oe),ne=Math.max(0,le-ye);if(p.visible=!b,p.position.set(0,0,pe),ne>.25){const Z=(ye+le)*.5,Ne=Math.max(1,B-pe);d.visible=!0,d.scale.set(1,ne,Ne),d.position.set(0,Z,pe+Ne*.5),u.opacity=.28+Math.min(.16,ne*.02),m.visible=!0,m.scale.set(1,ne,Ne),m.position.set(0,Z,pe+Ne*.5),g.visible=!0,g.scale.set(1,ne,1),g.position.set(0,Z,pe+.08)}else d.visible=!1,m.visible=!1,g.visible=!1;for(const Z of r){const Ne=Z.y<q,re=Z.y>oe,te=!Ne&&!re,N=te?pe:Ne?B+.3:O+.3,Ee=Z.line.geometry.attributes.position;Ee.setXYZ(0,Z.x*1.12,Z.y*1.12,ce),Ee.setXYZ(1,Z.x,Z.y,N),Ee.needsUpdate=!0;const he=Z.line.material,_e=Z.hitDot.material;if(te?(he.color.setHex(15371264),he.opacity=.85,_e.color.setHex(16096779),_e.opacity=.95):(he.color.setHex(6583435),he.opacity=.24,_e.color.setHex(4674921),_e.opacity=.48),Z.hitDot.position.set(Z.x,Z.y,N),te){Z.photon.visible=!0;const fe=(D*1.15+Z.phase)%1;Z.photon.position.set(ze.lerp(Z.x*1.12,Z.x,fe),ze.lerp(Z.y*1.12,Z.y,fe),ze.lerp(ce,pe,fe))}else Z.photon.visible=!1}const ve=(I?I.group.position.x:0)+18;T.forEach((Z,Ne)=>{const re=Ne===0?y.slitState.irTrigger1:y.slitState.irTrigger2,te=Z.line.geometry.attributes.position;te.setXYZ(0,ve,Z.y,X+1.2),te.setXYZ(1,ve,Z.y,X-1.2),te.needsUpdate=!0,Z.pulse.position.set(ve,Z.y,X+1.35);const N=Z.pulse.material;if(re){const Ee=1+D*4.5%1*1.15;Z.pulse.scale.set(Ee,Ee,1),N.opacity=.92}else Z.pulse.scale.set(1,1,1),N.opacity=.18})}}}function q1(i){const e=new se,{parts:t,rig:n}=Y1(i);for(const r of t)e.add(r.group);const s=Z1(i.clippingPlanes);e.add(s.overlayGroup,s.explodeGuides);const o=(r,a)=>{for(const l of t){const c=a&&l.integratedExplodeOffset?l.integratedExplodeOffset:l.explodeOffset;l.group.position.set(l.assembledPos.x+c.x*r,l.assembledPos.y+c.y*r,l.assembledPos.z+c.z*r)}};return{rootGroup:e,parts:t,updateAnimation:(r,a,l,c,h)=>{o(l,h),n.applyKinematics(r,c),s.update(r,c,h,t,n)},setPhysicsVisible:r=>{s.setVisible(r)},updateExplodeGuides:(r,a)=>{s.updateGuides(r,a,t)}}}const K1={"mb-vapor-chamber":{title:"超薄型ベイパーチャンバー ＆ グラファイト複合放熱モジュール",subtitle:"Two-Phase Copper Vapor Chamber, Heat Pipe & Pyrolytic Graphite Sheet",category:"M01 / 熱流体・相変化放熱システム",plainAnalogy:"ひとことで言うと「カメラの頭脳を冷やす『超うす型の水冷クーラー板』」。8K動画や秒間120コマ連写でチンチンに発熱するチップの熱を、内部の密閉された純水の“蒸発と結露のサイクル”で一瞬のうちにボディ全体へ逃がします！",summary:"メイン基板の背面最外層を覆う極薄二相式銅ベイパーチャンバー（厚さ約1 mm）、高熱伝導パイロリティックグラファイトシート（PGS）、およびピンク／ブルーの高熱伝導シリコン熱伝導パッド（TIM）から成る次世代パッシブ放熱アセンブリ。",opticsAndPhysics:["二相変化の熱輸送原理：ベイパーチャンバー内部は減圧された極薄の真空銅室で、微細な銅ウィック（毛細管構造）と少量の純水が封入されています。ISPチップ直上の熱で水が沸騰・気化し、音速に近い速さで冷たい端へ移動して液体に戻り、毛細管現象で還流します。潜熱を利用するため、実効熱伝導率は純銅（400 W/m·K）の20〜50倍にも達します！","熱界面材料（TIM）の役割：半導体表面と放熱板の間には目に見えないミクロン単位の空気層（空気は熱を通しにくい断熱材）が存在します。柔軟な高熱伝導シリコンパッド（12–15 W/m·K）で密着させて接触熱抵抗を劇的に低減します。","パイロリティックグラファイト（面内 k ≈ 1,600 W/m·K）と延長ヒートパイプが、三脚座やマグネシウム外装フレームへ熱を分散し、防塵防滴の密閉ボディでも長時間の8K60p RAW連続収録を可能にします。"],formula:{expression:"q = −k_eff · A · (dT / dx)   （ベイパーチャンバー実効 k_eff ≈ 8,000 – 20,000 W/m·K）",description:"相変化の蒸発潜熱（2,260 kJ/kg）を利用することで、わずかな温度差 ΔT で大電力を高速輸送します。"},nextGenInnovation:"2024〜2026年のフラッグシップミラーレスでは、防塵防滴シールを破る冷却ファンを使わずに8K60p RAWや4K120pを長時間記録するため、メイン基板背面全面に広がるベイパーチャンバー＋多層グラファイト＋マグネシウム筐体熱結合設計が標準化しています。",specs:[{label:"放熱構造",value:"極薄銅ベイパーチャンバー ＋ グラファイトシート"},{label:"実効熱伝導率",value:"約 10,000 W/m·K（面内熱拡散）"},{label:"TIM熱伝導パッド",value:"高柔軟シリコン 12 W/m·K（ISP/NPU/DRAM密着）"},{label:"熱設計電力 (TDP)",value:"ピーク 12 – 18 W 連続放熱（8K60p対応）"}],diagramType:"mb_vapor"},"mb-emi-shield":{title:"マルチ区画EMI高周波シールド缶 ＆ 導電性ガスケット",subtitle:"Multi-Compartment Nickel-Silver RF/EMI Shielding Frame & Grounding Clips",category:"M02 / 電磁両立性 (EMC)・ファラデーケージ",plainAnalogy:"ひとことで言うと「チップ同士が“電波のケンカ”をしないように囲う金属の防音室」。毎秒何十億回もスイッチが切り替わる超高速チップからは強力なノイズ電波が出るため、金属の壁で覆って写真に横縞ノイズが乗るのを防ぎます！",summary:"ISPエンジン・AI NPU・LPDDR5X・Wi-Fi RFモジュール・電源VRMの各エリアを精密に仕切る洋白（Cu-Ni-Zn合金）製の多区画EMIシールドフレーム。各コンパートメントが独立したファラデーケージとして機能します。",opticsAndPhysics:["ファラデーケージと表皮効果：高周波電磁波（数百MHz〜数GHz）が導電性金属壁に入射すると、表面に渦電流が誘起されて入射波を打ち消します。金属内部の表皮深さ δ = √(2 / ωμσ) は1 GHzで数ミクロンしかないため、厚さ 0.15 mm の金属板でも 60 dB（ノイズ強度 1/1000）以上の遮蔽効果を発揮します。","なぜ部屋を細かく仕切るの？：大電流を高速スイッチングする電源回路（VRM）や 6 GHz の Wi-Fi 電波が、すぐ隣の微弱な音声回路や高感度センサー読み出し信号へ飛び込む「クロストーク」を完全に封じ込めるためです。","周囲の金メッキ・ベリリウム銅スプリングクリップが基板のグラウンド層と低インピーダンスで多点接地され、金属箱自体がアンテナ化（共振）するのを防ぎます。"],formula:{expression:"SE (dB) = R + A + B   /   δ = √(2 / (2πf · μ · σ))",description:"シールド効果 SE は反射損失 R・吸収損失 A の和で決まり、高周波ほど表皮深さ δ が浅く強力に遮断されます。"},nextGenInnovation:"最新世代では2ピース着脱式シールドフレーム（ハンダ付け枠＋点検スナップ蓋）と熱伝導パッド貫通ウィンドウを組み合わせ、電磁遮蔽とベイパーチャンバーへの直接放熱を両立しています。",specs:[{label:"材質・板厚",value:"洋白合金 (Cu-Ni-Zn) / 約 0.15 – 0.20 mm"},{label:"電磁遮蔽性能",value:"> 60 dB（100 MHz – 10 GHz 帯域）"},{label:"区画構造",value:"ISP・NPU・DRAM・RF 独立マルチコンパートメント"},{label:"接地方式",value:"全周低インピーダンス多点グラウンドクリップ"}],diagramType:"mb_emi"},"mb-isp-ihs":{title:"ISPメインエンジン・ニッケルメッキ銅ヒートスプレッダ蓋 (IHS)",subtitle:"Nickel-Plated Copper Integrated Heat Spreader (IHS) & Thermal Gel Layer",category:"M03 / チップ保護・局所ホットスポット拡散",plainAnalogy:"ひとことで言うと「デリケートな半導体シリコンを守る金属のヘルメット兼・熱広げプレート」。爪ほどのシリコンの1点に集中する猛烈な熱を、広い面積に均一に広げて上のクーラーへ渡します。",summary:"4nm ISPメインSoCシリコンダイの直上を覆う精密鍛造ニッケルメッキ銅製ヒートスプレッダ（IHS）と、極薄の高熱伝導サーマルインターフェースゲル層。本ビューワーではこの蓋を外す（非表示にする）ことで、直下のベアシリコン回路パターンを直接観察できます。",opticsAndPhysics:["ホットスポット熱拡散（Spreading Resistance低減）：4nmチップ内部では、8K動画エンコーダや16bit現像パイプラインなど一部の回路に熱流束が集中します（局所 > 50 W/cm²）。熱伝導率 398 W/m·K の銅蓋が熱を横方向へ素早く広げ、シリコンの局所過熱（サーマルスロットリング）を防ぎます。","機械的応力保護：厚さ 0.7 mm の単結晶シリコンダイはガラスのように脆く、放熱板のネジ締め圧力が一点に偏ると割れてしまいます（ダイクラック）。剛性の高い銅IHSが圧力を均一に分散し、チップを保護します。","表面のニッケルメッキは銅の酸化腐食を防ぎ、長年にわたりサーマルグリスやTIMパッドとの密着性を維持します。"],formula:{expression:"R_total = R_TIM1 + R_IHS + R_TIM2   （熱抵抗 K/W を最小化して ΔT = P · R_total を抑制）",description:"チップ接合部温度 T_j = T_amb + P × R_total を常に安全上限（約 95–105 ℃）以下に保ちます。"},nextGenInnovation:"一部最新パッケージでは、IHS内面とシリコンダイの間にインジウム系金属ハンダ（STIM）や超高熱伝導ナノ粒子ゲルを採用し、従来の樹脂グリス比で接合部温度を 5〜8 ℃ 低下させています。",specs:[{label:"材質・表面処理",value:"無酸素銅 (C1020) ＋ 無電解ニッケルメッキ"},{label:"熱伝導率",value:"約 390 W/m·K"},{label:"内部TIM層",value:"高熱伝導相変化サーマルゲル（膜厚 < 50 μm）"},{label:"役割",value:"局所ホットスポット拡散・シリコンダイ破断保護"}],diagramType:"mb_ihs"},"mb-isp-die":{title:"次世代4nm メイン撮像処理エンジン SoC シリコンダイ（デュアルストリームISP）",subtitle:"4nm Flagship Image Signal Processor (ISP) Bare Silicon Die — Dual-Stream Architecture",category:"M04 / カメラの中枢頭脳・専用画像処理半導体",plainAnalogy:"ひとことで言うと「1秒間に数十億個の光の粒を一瞬で美しい写真や8K動画に仕上げる“超天才・現像工場チップ”」。1枚の小さなシリコンの中に、色を作る工場・ノイズを消す工場・8K動画を圧縮する工場・ファインダーを途切れさせない専用レーンまで全部ギュッと詰め込まれています！",summary:"先端4nm級FinFET/GAAプロセスで製造されたカメラ専用カスタムSoC（BIONZ XR / DIGIC X / EXPEED 7次世代系譜）。数億〜数十億個のトランジスタを集積し、センサーからの超高速RAWデータを遅延ほぼゼロで処理します。",opticsAndPhysics:["16-bit リニアRAW現像パイプライン：①黒レベル・欠陥画素補正 → ②シェーディング（周辺減光）・レンズ収差リアルタイム補正 → ③ベイヤー配列（R/G/B単色画素）から全画素フルカラーを復元する高度デモザイキング → ④高精度3×3色変換行列＆3D-LUTによるカラーサイエンス → ⑤局所トーンマッピング（HDR/Log階調設計）をすべて専用ハードウェア回路で並列実行します。","デュアルストリーム（ブラックアウトフリー）機構：センサーから届く膨大なデータをチップ入口で即座に「記録用高画質パイプライン」と「EVF表示用超低遅延パイプライン（120Hz/240Hz）」の2系統へ同時分岐。秒間120コマ連写中でもファインダーが一瞬たりとも暗転（ブラックアウト）しません！","専用8K60pハードウェアコーデック：CPUで計算すると発熱と電池切れを起こす 8K RAW / 10-bit 4:2:2 HEVC / ProRes 圧縮を専用ASIC回路で極小消費電力のままリアルタイムエンコードします。"],formula:{expression:"処理スループット R_pix = 50 MP × 30 fps = 1.5 Gigapixels/s （16bit時 ≈ 24 Gbps 内部パイプライン）",description:"専用パイプラインASICにより、汎用PCのCPUでは不可能な超低遅延・省電力リアルタイム現像を達成します。"},nextGenInnovation:"最新世代のISPは従来の4〜10倍の演算帯域を備え、秒間120回のAF/AE演算、120fpsグローバルシャッターRAW連写、8K60p内部RAW収録、そして次層の専用AI NPUとの超広帯域ダイ間連携を実現しています。",specs:[{label:"製造プロセス",value:"先端 4 nm / 5 nm クラス CMOS ロジック"},{label:"内部演算精度",value:"16-bit リニアパイプライン ＋ 3D-LUT 色空間"},{label:"主要ハードウェアIP",value:"Dual-Stream ISP / 8K60p Codec / 8コアARM / SRAM"},{label:"最大処理性能",value:"最大 120 fps RAW連写・ブラックアウトフリー表示"}],diagramType:"mb_isp_die"},"mb-isp-interposer":{title:"フリップチップBGA 有機サブストレート ＆ Cuピラー・マイクロバンプ層",subtitle:"Flip-Chip BGA ABF Interposer Substrate, Cu Pillar Micro-Bumps & Solder Ball Grid",category:"M05 / 先端半導体パッケージング",plainAnalogy:"ひとことで言うと「極小のチップと大きなマザーボードを数千本の電気の足でつなぐ“超精密な変換アダプタ”」。昔のチップのように横に細い線を張る代わりに、チップをひっくり返してお腹の下一面から数千個の小さなハンダの粒で直結します！",summary:"4nm ISPシリコンダイの微細な電極ピッチ（数十ミクロン）を、メインマザーボードの配線ピッチ（0.4 mm）へと段階的にファンアウト（再配線：RDL）する多層ABF（味の素ビルドアップフィルム）有機パッケージ基板とフリップチップ接合層。",opticsAndPhysics:["フリップチップ（Flip-Chip）接合の物理学：従来の金線ワイヤーボンディングは長いループの寄生インダクタンス（L）が数GHzの高速信号を劣化させます。シリコンダイを裏返して銅ピラー・マイクロバンプで直下接続することで、配線長を数十ミクロンへ短縮し、LPDDR5XやSLVS-ECの超高速信号品質を劇的に向上させます。","アンダーフィル樹脂の熱力学：シリコン（熱膨張係数 CTE ≈ 2.6 ppm/K）と有機基板（CTE ≈ 15 ppm/K）では温まったときの伸び方が約6倍違います。マイクロバンプのすき間にシリカ充填エポキシ樹脂（アンダーフィル）を毛細管現象で流し込んで固めることで、8K撮影時の加熱・冷却サイクルによるハンダ疲労破断を防ぎます。","パッケージ上面（ダイのすぐ周囲）に極小01005サイズのシリコン・デカップリングコンデンサを配置し、ナノ秒単位の急激な電流変動（di/dt）へ瞬時に電荷を供給します。"],formula:{expression:"V_droop = L_loop · (di / dt)   （フリップチップで寄生インダクタンス L_loop を約 1/10 に削減）",description:"チップ直下の最短経路接続により、GHz動作時の電源電圧降下と信号リンギングを劇的に抑えます。"},nextGenInnovation:"1,000〜2,000ピン級の高密度FC-BGAパッケージでは、10層以上の極薄ABFビルドアップ再配線層（RDL）と銅ピラーマイクロバンプにより、SoCの超広帯域メモリバスと高速シリアルI/Oを最小面積へ凝縮しています。",specs:[{label:"パッケージ形式",value:"FC-BGA（フリップチップ・ボールグリッドアレイ）"},{label:"基板絶縁材料",value:"多層 ABF ビルドアップ再配線層 (RDL)"},{label:"接合方式",value:"Cuピラー・マイクロバンプ ＋ エポキシアンダーフィル"},{label:"外部端子数",value:"約 1,200 – 1,800 ピン（SnAgCu 無鉛ハンダボール）"}],diagramType:"mb_interposer"},"mb-ai-npu":{title:"専用AIプロセッシングユニット / NPU（シストリックアレイ深層学習エンジン）",subtitle:"Dedicated AI / Deep-Learning Accelerator SoC (2D Systolic Array NPU)",category:"M06 / リアルタイムAI認識・コンピュテーショナル撮影",plainAnalogy:"ひとことで言うと「写真に写る人間・動物・鳥・車の動きを“脳のように理解する”AI専門の相棒チップ！」。人間の骨格（頭・肩・肘・腰）を瞬時に見抜くので、後ろを向いたりヘルメットを被っていても瞳の位置を予測してピントを合わせ続けます！",summary:"メインISPとは独立して搭載された深層学習（ディープラーニング）専用アクセラレータ（Canon DIGIC Accelerator / Sony AIプロセッシングユニット系譜）。数千個の積和演算器（MAC）を格子状に並べた「シストリックアレイ」により、ニューラルネットワーク推論をミリ秒以下で実行します。",opticsAndPhysics:["シストリックアレイ（Systolic Array）の秘密：AIの計算の9割以上は巨大な行列のかけ算・足し算（MAC：C += A × B）です。心臓の鼓動（Systole）のように、入力特徴マップとINT8量子化重みを格子状の演算ユニット（PE）間で隣へ隣へとバケツリレーしながら一斉計算することで、電力食いのDRAMアクセスを極限まで減らし、圧倒的なワット当たり演算性能（TOPS/W）を生み出します。","姿勢推定（Pose Estimation）＆アクション優先AF：単なる「顔の色や形」ではなく、深層CNN/Transformerモデルが人体の骨格関節やスポーツの動き（サッカーのシュート・バスケのジャンプなど）を3次元的にリアルタイム解析。逆光・マスク・後ろ姿・手前を人が横切る場面でも主被写体を一切見失いません。","カメラ内ディープラーニング画質革新：従来の数式フィルタでは解像感まで潰れていた高感度ノイズをAIが学習済みノイズ分布から分離除去する「ニューラルネットワークノイズ低減」や、24MP画像をカメラ内でディテール補完し96MP化する「カメラ内アップスケーリング」もこのNPUが実行します！"],formula:{expression:"NPU 演算性能 = 2 × N_MAC × f_clk   （INT8 量子化推論により FP32 比 4× 高速・低消費電力）",description:"重みをオンチップSRAMに常駐させ、シストリックアレイ全PEを毎クロック100%稼働させます。"},nextGenInnovation:"2024〜2026年の最大ブレイクスルーが「メインISP＋専用AIコプロセッサの2チップ協調アーキテクチャ」です。AF被写体認識（人・動物・鳥・昆虫・飛行機・列車・車）だけでなく、露出・ホワイトバランス推定やカメラ内AI超解像までAI化が進んでいます。",specs:[{label:"演算コア構造",value:"2D シストリックアレイ MAC エンジン ＋ オンチップSRAM"},{label:"推論データ形式",value:"INT8 / BF16 量子化ニューラルネットワーク推論"},{label:"AF/AE推論周期",value:"最大 60 – 120 Hz（リアルタイム骨格姿勢推定）"},{label:"応用機能",value:"姿勢推定AF・アクション優先・AIノイズ低減・4倍超解像"}],diagramType:"mb_ai_npu"},"mb-lpddr5x":{title:"クワッドチャネル LPDDR5X-8533 超高速フレームバッファDRAM × 2基",subtitle:"Dual Stacked LPDDR5X-8533 High-Bandwidth Burst & Pre-Capture Buffer DRAM",category:"M07 / 超広帯域リングバッファメモリ",plainAnalogy:"ひとことで言うと「シャッターを押し続ける間、何百枚もの写真データを一時的に置いておく“超巨大な作業机”」。さらに『シャッターを全押しする1秒前の瞬間』までさかのぼって記録できる“プリ撮影（タイムマシン機能）”もこのメモリのおかげです！",summary:"ISPエンジンとAI NPUのすぐ隣（配線長わずか数 mm）に配置された2基の高密度マルチダイ積層LPDDR5X SDRAMパッケージ（合計 8〜16 GB 級）。毎秒60〜85 GBもの圧倒的なメモリ帯域で、120fps高速連写・プリ撮影リングバッファ・8K動画フレーム処理を支えます。",opticsAndPhysics:["なぜカメラに巨大な超高速RAMが要るの？：5000万画素RAWを秒間30コマ撮ると、毎秒 1.5〜3.0 GB ものデータが一気に押し寄せます。メモリーカードへの書き込みが追いつくまでの間、このLPDDR5Xバッファが高速でデータを受け止めることで、連写速度を落とさず数百〜1,000枚以上の連続撮影が可能になります。","プリ撮影（Pre-Capture）の仕組み：シャッター半押し中、LPDDR5X上に作られた「リングバッファ（ぐるぐる回る上書きメモリ）」へ常に最新0.5〜1.0秒分のRAW画像を記録し続けます。鳥が飛び立ったのを見てから全押しした瞬間、リングバッファに保存されていた“過去1秒間の決定的な瞬間”をカードへ永久保存します！","16バンク並列＆低電圧駆動（0.5 V I/O）：LPDDR5Xはピン当たり最大 8.533〜10.7 Gbps の超高速伝送を極低消費電力で実現。基板上の等長蛇行配線（メアンダ）により、64bitデータ線の到着タイミング誤差をピコ秒単位で揃えています。"],formula:{expression:"メモリ帯域 BW = 8.533 Gbps/pin × 64 bit / 8 ≈ 68.3 GB/s   （8K60p + 120fps同時処理に余裕）",description:"超広帯域クワッドチャネル構成により、ISP現像・NPU推論・RAWバッファ保存が帯域競合せず並列動作します。"},nextGenInnovation:"2024〜2026年のプロ機では、LPDDR5/5Xの大容量化と高帯域化により、14-bit RAWでのプリ撮影（最大1秒前まで遡及）や、AIノイズ低減用の中間特徴マップ保持が実用化されています。",specs:[{label:"メモリ規格",value:"LPDDR5X-8533（マルチダイ積層 FBGA × 2）"},{label:"総メモリ帯域",value:"約 68.3 – 85.3 GB/s（クワッドチャネル）"},{label:"搭載容量（代表）",value:"8 GB – 16 GB（連写1,000枚＋プリ撮影リングバッファ）"},{label:"動作電圧",value:"VDDQ 0.5 V 超低電圧・高効率駆動"}],diagramType:"mb_lpddr5x"},"mb-pmic-vrm":{title:"多相同期整流PMIC ＆ 大電流VRM電源供給網 (PDN)",subtitle:"Multi-Phase Synchronous Buck PMIC, Ferrite Power Inductors & PDN Decoupling Bank",category:"M08 / パワーエレクトロニクス・超低ノイズ電源",plainAnalogy:"ひとことで言うと「電池の電気を、それぞれのチップが欲しがるピッタリな電圧へ変身させる“超精密な変電所”」。7.2 Vのバッテリー電源を、チップ用の 0.75 V やレンズ用の 5 V など十数種類に一瞬で効率95%変換します！",summary:"メインPMIC（電源管理IC）、複数相の同期整流降圧（バック）コンバータ用DrMOS、6基の大型シールド・フェライトパワーインダクタ（チョークコイル）、および黄色ポリマー・タンタルコンデンサ＆MLCC群で構成されるメインボードの電力心臓部。",opticsAndPhysics:["同期整流降圧（Synchronous Buck）の原理：バッテリーの 7.2 V を抵抗で下げると大半が熱になって無駄になります。そこで毎秒数百万回（1〜3 MHz）の超高速でMOSFETスイッチをON/OFFし、インダクタ（コイル）の磁気エネルギー蓄積とコンデンサの平滑化を使って、効率 92〜96% で 0.75 V / 15 A 級の大電流を作り出します。","なぜ複数のコイル（多相：Multi-Phase）に分けるの？：4相のスイッチングタイミングを 90° ずつズラして運転すると、電流の波（リップル）が互いに打ち消し合い、4nmチップへ供給される電圧の揺れを 10 mV 未満の鏡のようなフラットさに安定化できます！","動的電圧・周波数スケーリング（DVFS）：待機中はSoC電圧を 0.6 V へ下げてバッテリーを節約し、シャッター半押しや8K録画開始と同時にマイクロ秒で 0.85 V へブーストする賢い省電力制御を行います。"],formula:{expression:"V_out = D · V_in   （D = t_ON / T_sw：デューティ比、多相化で出力リップル ΔI 激減）",description:"例：V_in = 7.2 V から 4nm SoCコア電圧 V_out = 0.75 V を得る場合、D ≈ 10.4% を MHz 周期で精密PWM制御。"},nextGenInnovation:"USB-PD（Power Delivery）急速給電コントローラと統合され、外部モバイルバッテリーからの直接給電撮影と、電池残量低下時でもAFモーターや高速連写が落ちない高負荷過渡応答性を実現しています。",specs:[{label:"変換方式",value:"多相同期整流ステップダウン（Buck）DC-DC ＋ LDO"},{label:"スイッチング周波数",value:"1.5 – 3.0 MHz（小型シールドフェライト採用）"},{label:"変換効率",value:"ピーク 94 – 96%（低発熱設計）"},{label:"生成電源系統",value:"0.75V(SoC) / 0.5V(DRAM) / 1.8V / 3.3V / レンズ駆動電源"}],diagramType:"mb_pmic"},"mb-cfexpress":{title:"デュアル CFexpress 4.0 Type B（PCIe Gen4 ×2）＆ SD UHS-II ストレージスロット",subtitle:"Dual CFexpress 4.0 Type B (PCIe Gen4 x2 / NVMe 1.4c) & SDXC UHS-II Card Cage",category:"M09 / 超高速NVMe不揮発性ストレージ",plainAnalogy:"ひとことで言うと「パソコンの超高速SSDをそのままカメラに差し込める“4GB/秒の超特急カード差し込み口”」。8K RAW動画や120コマ連写の莫大なデータを、まるで水道管全開のように一瞬で保存します！",summary:"基板右側面に実装された精密ステンレス鋼製デュアル・メモリーカードケージ。メインスロットにはPCIe Gen4 ×2レーン直結の **CFexpress 4.0 Type B**（理論最大 4,000 MB/s）、サブスロットには汎用性の高い **SDXC UHS-II**（またはデュアルCFexpress）を装備しています。",opticsAndPhysics:["PCIe Gen4 + NVMe 1.4c プロトコルの威力：従来のSDカード（UHS-II、最大約312 MB/s）と違い、CFexpressはパソコンのNVMe SSDと完全に同じ **PCI Express Gen4** 高速シリアルバスでISPと直結しています。1レーンあたり 2 GB/s、Type Bの2レーンで理論 **4,000 MB/s（実測書込 3,400 MB/s超）** を叩き出します！","なぜ 8K60p 12-bit RAW に必須なの？：8K60p RAW動画は1秒間だけで約 400〜700 MB（1分で約30〜40 GB！）ものデータを生み出し続けます。持続書き込み保証（VPG400 / VPG800 / VPG1600）に対応したCFexpressなら、コマ落ちゼロで無限に記録し続けられます。","カード自体の発熱対策：CFexpress 4.0カードは最大 3 A 近く消費して発熱するため、ステンレス鋼ケージ全体がヒートスプレッダおよびEMIシールドを兼ねており、カード表面の熱をカメラフレーム側へ逃がします。"],formula:{expression:"PCIe Gen4 ×2 帯域 = 16 GT/s × 2 lanes × (128/130) / 8 ≈ 3.94 GB/s （SD UHS-II の約 12.6 倍!）",description:"128b/130b 高効率符号化と 85 Ω 差動インピーダンス整合配線により超高速・低エラー書込を実現。"},nextGenInnovation:"CFexpress 4.0規格ではPCIe Gen3→Gen4およびNVMe 1.3→1.4cへの刷新により、転送速度が2.0世代の2倍へ飛躍。連写後のバッファ解放待ち時間を事実上ゼロにし、撮影現場からPCへのデータ吸い上げ時間も半減します。",specs:[{label:"スロット1規格",value:"CFexpress 4.0 Type B（PCIe Gen4 ×2 / NVMe 1.4c）"},{label:"最大転送速度",value:"理論 4,000 MB/s（実測読込 ~3,700 / 書込 ~3,400 MB/s）"},{label:"スロット2規格",value:"SDXC UHS-II（最大 312 MB/s・同時バックアップ対応）"},{label:"信号整合",value:"85 Ω 差動ペア ＋ PCIe リドライバIC ＋ 放熱ケージ"}],diagramType:"mb_cfexpress"},"mb-imu-mcu":{title:"6軸水晶MEMSジャイロ/加速度IMU ＆ リアルタイムIBIS/レンズ協調制御MCU",subtitle:"6-Axis Quartz MEMS Gyro/Accelerometer IMU & Real-Time IBIS / Lens Servo MCU",category:"M10 / 慣性計測・8.5段協調手ブレ補正制御",plainAnalogy:"ひとことで言うと「人間の手では絶対気づかないミクロな揺れを1秒間に2,000回も見張る“三半規管センサー＆運動神経チップ”」。手の震えを瞬時に計算し、ボディ内のセンサーとレンズ内の手ブレ補正を息ピッタリに動かしてピタッと止めます！",summary:"メイン基板上の防振スリット付きアイランドに実装された高精度6軸水晶MEMS慣性計測ユニット（3軸角速度ジャイロ＋3軸加速度計）と、5軸IBIS・レンズOIS・高速AFモーターをマイクロ秒応答で統括する専用リアルタイム制御マイコン（MCU）。",opticsAndPhysics:["コリオリの力による角速度検出：MEMSジャイロの内部では、髪の毛より細い水晶／シリコンの音叉（振動子）が毎秒数万回振動しています。カメラが手ブレで回転（角速度 ω）すると、振動子に直角方向の **コリオリの力 F_c = −2m(ω × v)** が働き、その極微な静電容量・圧電変化から 0.001 度レベルの微小な傾きを検出します！","6軸センサフュージョン＆2,000 Hz 閉ループPID制御：回転ブレ（Pitch / Yaw / Roll）を3軸ジャイロで、マクロ撮影時に効く平行移動ブレ（シフト X / Y）を3軸加速度計で同時検出し、カルマンフィルタで統合。毎秒2,000回の高速フィードバック制御で5軸IBISボイスコイルを駆動します。","ボディ＋レンズ協調手ブレ補正（最大 8.5 段）：専用リアルタイムMCUがマウント電子接点を通じてレンズ側マイコンと高速通信し、「広角側の回転・シフトはボディ側IBIS、望遠側の大きな角度ブレはレンズ側OIS」へリアルタイムで最適分担します！"],formula:{expression:"F_coriolis = −2 m (ω × v)   ⇒   手ブレ補正量 Δx = f · tan(∫ ω dt) （最大 8.5 段補正）",description:"焦点距離 f が長い望遠レンズほどわずかな角度 ω で像が大きく動くため、IMU＋レンズ協調制御が不可欠です。"},nextGenInnovation:"最新フラッグシップでは、メインIMUの角速度情報だけでなく「撮像センサーの画像解析による動きベクトル」と「AI被写体位置（中央以外の隅にいる瞳）」を組み合わせ、画面周辺部の回転ブレまで抑え込む周辺協調IBIS（最大8.5段）を実現しています。",specs:[{label:"慣性センサー構成",value:"3軸水晶MEMSジャイロ ＋ 3軸低ノイズ加速度計 (6-DoF)"},{label:"制御ループ周期",value:"1,000 – 2,000 Hz（リアルタイムPID＋カルマンフィルタ）"},{label:"手ブレ補正性能",value:"ボディ＋レンズ協調 最大 8.5 段（CIPA 2024規格）"},{label:"副次機能",value:"電子水準器・縦横自動回転・動画手ブレ補正メタデータ記録"}],diagramType:"mb_imu_mcu"},"mb-security-clock":{title:"C2PA暗号署名セキュリティチップ（来歴証明）＆ 温度補償水晶発振器 (TCXO)",subtitle:"C2PA Hardware Security Element (Content Credentials) & ±0.5 ppm TCXO Master Clock",category:"M11 / 真正性暗号証明・超高精度クロック同期",plainAnalogy:"ひとことで言うと「『これはAI生成ではなく本当にカメラで撮った本物の写真です！』と撮影の瞬間に消えない電子ハンコを押す“金庫チップ”と、1年経ってもほぼ狂わない“超高精度な原子時計級メトロノーム”」です！",summary:"生成AI時代の報道・プロ撮影に不可欠となった **C2PA（Content Credentials）ハードウェア暗号署名セキュリティチップ** と、カメラ全体の動画フレーム・音声・高速通信の基準リズムを刻む **±0.5 ppm 温度補償水晶発振器（TCXO）** ＋バックアップスーパーキャパシタ。",opticsAndPhysics:["C2PA ハードウェア来歴証明（暗号工学）：シャッターを切った直後、撮像データの暗号学的ハッシュ値（SHA-256）と撮影日時・機種・3D深度情報などを、耐タンパー性セキュリティチップ（HSE）内部の決して外へ取り出せない秘密鍵で **ECDSAデジタル署名** します。後から1ピクセルでも改ざん・AI合成されるとハッシュ値が不一致になり、瞬時に見抜けます！","TCXO（温度補償水晶発振器）の物理学：普通の水晶振動子は気温が真冬（-10℃）から真夏（+50℃）へ変わると振動数が数十ppmズレてしまい、複数カメラで長時間収録した8K動画と外部レコーダーの音声が徐々にズレて（音ズレして）しまいます。TCXOは内部の温度センサーと可変容量ダイオードで周波数を自動補正し、誤差を **±0.5 ppm（1日動かしても 0.04 秒未満！）** に抑えます。","低位相雑音（低ジッター）クロックは、SLVS-EC 10GbpsやHDMI 48Gbpsのアイパターン開口を広げ、高速データ通信のビットエラーを防ぐ縁の下の力持ちです。"],formula:{expression:"Sig = Sign_ECDSA(K_priv, SHA256(RAW || Meta))   /   |Δf / f₀| ≤ ±0.5 × 10⁻⁶ (TCXO)",description:"ハードウェア隔離された秘密鍵 K_priv による撮影瞬間署名と、50万分の1以下の超高精度クロック安定度。"},nextGenInnovation:"2024〜2026年はC2PAハードウェア署名元年となり、Sony α1 II / α9 III、Canon EOS R1 / R5 II、Nikon Z系、Leica M11-Pなど主要フラッグシップがカメラ内電子署名に対応し、報道機関の真正性検証ワークフローへ直結しています。",specs:[{label:"セキュリティ規格",value:"C2PA Content Credentials / 耐タンパーHSE暗号IC"},{label:"暗号方式",value:"ハードウェア隔離 ECDSA 秘密鍵 ＋ SHA-256 署名"},{label:"マスタークロック",value:"±0.5 ppm 高安定 TCXO（位相雑音 -160 dBc/Hz）"},{label:"RTCバックアップ",value:"高耐久電気二重層スーパーキャパシタ内蔵"}],diagramType:"mb_security_clock"},"mb-io-ports":{title:"プロフェッショナル高速I/Oポート群（HDMI 2.1 / USB-C 10Gbps / 2.5GbE LAN / 音声）",subtitle:"Full-Size HDMI 2.1 Type A, USB-C 10Gbps PD, 2.5GBASE-T Ethernet & 24-bit Audio I/O",category:"M12 / 外部高速インターフェース・静電気保護",plainAnalogy:"ひとことで言うと「撮った写真や8K映像をテレビ・パソコン・報道局のサーバーへ一瞬で送り出す“高速インターチェンジ”」。雷や静電気のビリッ！から繊細なメインチップを守る避雷針（ESD保護）まで並んでいます！",summary:"メイン基板の左側面（グリップ反対側）に集約されたプロ仕様外部入出力ポート群。フルサイズ **HDMI 2.1 Type A**、**USB-C 3.2 Gen 2 (10 Gbps + USB-PD)**、報道現場向け **2.5GBASE-T 有線LAN（RJ45）**、金メッキ3.5 mmマイク／ヘッドホン端子と24-bit/96kHz低ノイズ音声コーデックICで構成されます。",opticsAndPhysics:["HDMI 2.1 FRL（Fixed Rate Link）48 Gbps：従来のTMDS伝送を超え、4レーン×12 Gbps の超高速伝送で 8K60p や 16-bit RAW 映像を外部シネマモニター／レコーダーへ非圧縮出力。折れにくく確実なフルサイズType A端子を金属シェルで強固に基板固定しています。","2.5GBASE-T 有線LAN ＆ 絶縁パルストランス：スポーツ報道や五輪会場では、撮った1秒後に世界中の通信社へFTP送信する即時性が命。RJ45内部の微小な磁気トランス（パルストランス）がカメラ本体と外部LANケーブルを電気的に絶縁（ガルバニック絶縁）し、ノイズや雷サージを遮断しながら毎秒2.5ギガビットで転送します。","ESD（静電気放電）TVSダイオード保護：冬場にケーブルを挿す瞬間、指先から数千〜15,000 Vもの静電気が端子へ飛び込みます。各コネクタのわずか1 mm内側に超高速応答のTVS保護ダイオードを配置し、ナノ秒以下で静電気をグラウンドへ逃がして4nm ISPを守ります。"],formula:{expression:"HDMI 2.1 最大帯域 = 4 lanes × 12 Gbps = 48 Gbps   /   ESD 保護耐圧 ±15 kV (IEC 61000-4-2)",description:"超高速シリアル伝送と静電気サージ防護を両立するため、極低静電容量（< 0.3 pF）のTVS素子を使用。"},nextGenInnovation:"Canon EOS R5 IIの分解調査でも確認された通り、最新のフラッグシップでは破損しやすいHDMIポート周辺をサブボード化／強化ブラケット固定し、USB-C 10Gbpsテザー撮影＋USB-PD給電＋2.5GbE有線LANのトリプル高速接続を標準化しています。",specs:[{label:"映像出力",value:"フルサイズ HDMI 2.1 Type A（最大 48 Gbps / 16-bit RAW出力）"},{label:"データ・給電",value:"USB Type-C 3.2 Gen 2（10 Gbps ＋ USB-PD 急速給電）"},{label:"有線ネットワーク",value:"2.5GBASE-T RJ45（絶縁パルストランス内蔵・高速FTP）"},{label:"音声入出力",value:"3.5 mm マイク/ヘッドホン ＋ 24-bit/96kHz 音声DAC/ADC"}],diagramType:"mb_io_ports"},"mb-rf-wifi":{title:"Wi-Fi 6E / Wi-Fi 7 (2×2 MIMO) ＆ Bluetooth 5.3 無線RFモジュール・同軸給電",subtitle:"Shielded Tri-Band Wi-Fi 6E/7 (2x2 MIMO) & Bluetooth 5.3 RF SiP Module with Coax Feed",category:"M13 / 高周波無線通信 (RF)・MIMOアンテナ給電",plainAnalogy:"ひとことで言うと「撮ったその場でスマホやクラウドへ高画質写真を飛ばす“超高速ミニWi-Fiルーター”」。金属のカメラボディは電波を遮ってしまうため、極細の同軸ケーブルでボディ上部の窓（アンテナ）まで丁寧に電波を運びます！",summary:"6 GHz / 5 GHz / 2.4 GHz トライバンド **Wi-Fi 6E / Wi-Fi 7（2×2 MIMO）** および省電力 **Bluetooth 5.3** を極小シールドパッケージ（SiP）へ統合した高周波RFモジュールと、50 Ω 精密マイクロ同軸ケーブル（U.FL / IPEX金メッキコネクタ）。",opticsAndPhysics:["2×2 MIMO（空間多重）と 6 GHz 帯の高速性：2本の独立アンテナから同時に異なるデータストリームを送信する 2×2 MIMO 技術と、電波混雑の少ない 6 GHz 帯（160 MHz / 320 MHz 広帯域チャネル）により、無線でも実効 1 Gbps 超の爆速RAW転送やライブ配信を実現します。","50 Ω 特性インピーダンス整合とマイクロ同軸給電：カメラ筐体はマグネシウム合金（金属）で覆われているため、基板上では電波が外へ出られません。特性インピーダンスを厳密に 50 Ω に整合した極細同軸ケーブルを使い、反射損失（VSWR）を最小限に抑えながらグリップ部やペンタ部の樹脂ウィンドウ裏アンテナへ給電します。","カメラ内ノイズとの共存：Bluetooth 5.3 は消費電力数ミリワットでスマホと常時接続し、GPS位置情報の自動記録や電源OFF時の画像自動転送ウェイクアップを担います。"],formula:{expression:"C = M · B · log₂(1 + SNR)   （2×2 MIMO：M=2 空間ストリームで無線容量を最大2倍化）",description:"シャノン＝ハートレーの定理に基づき、広帯域 B（160/320 MHz）と空間多重 M=2 で無線伝送速度を最大化。"},nextGenInnovation:"最新世代（EOS R1 / R5 II / α1 II 世代）ではWi-Fi 6E（6 GHz帯）対応と2×2 MIMOデュアルアンテナにより、スタジアムやスタジオの混雑した電波環境下でも安定した高速FTP／クラウド直接アップロードを実現しています。",specs:[{label:"無線LAN規格",value:"Wi-Fi 6E / Wi-Fi 7（2.4 / 5 / 6 GHz・2×2 MIMO）"},{label:"近距離無線",value:"Bluetooth 5.3 LE（常時GPS連携・リモート起動）"},{label:"給電ライン",value:"50 Ω マイクロ同軸ケーブル × 2（U.FL / IPEX 金端子）"},{label:"RF濾波回路",value:"セラミック SAW / BAW バンドパスフィルタ内蔵"}],diagramType:"mb_rf_wifi"},"mb-hdi-pcb":{title:"12層エニーレイヤーHDIメインマザーボード基板（レーザーマイクロビア＆インピーダンス整合）",subtitle:"12-Layer Any-Layer HDI Motherboard PCB — Laser Microvias & Controlled Impedance",category:"M14 / 超高密度多層プリント配線板",plainAnalogy:"ひとことで言うと「たった1.5 mmの板の中に12階建ての高速道路とエレベーターがぎっしり詰まった“カメラの神経ネットワーク都市”」。すべてのチップと部品を数千本の銅線とレーザーで開けた極小トンネルでつなぎます！",summary:"EVF光学トンネルや三脚座を避ける複雑な異形シルエットに設計された、カメラ全体の電子神経網である12層エニーレイヤーHDI（高密度相互接続）多層プリント基板。端面には12層の銅箔と低誘電損失樹脂（Low-Df）の積層構造が見えます。",opticsAndPhysics:["エニーレイヤーHDI（Any-Layer High-Density Interconnect）とは？：通常の安価な基板はドリルで上から下まで貫通穴を開けるため、配線の邪魔になります。最新カメラのHDI基板は1層ごとにUVレーザーで直径わずか 50〜75 μm の極小穴（マイクロビア）を開けて銅メッキで埋め、好きな階同士を最短距離でつなぐ“12階建て直通エレベーター構造”により、1,500ピンのBGAチップを極小面積に収めています！","特性インピーダンス整合（100 Ω / 85 Ω）とメアンダ等長配線：SLVS-EC（10 Gbps）やPCIe Gen4（16 GT/s）の信号はもはや電気というより“マイクロ波の波”として銅線を伝わります。配線幅・誘電率 Dk・グラウンド層までの距離をミクロン精度で管理して反射を防ぎ、基板上に描かれた波型（メアンダ）配線で複数レーンの到着時刻をピコ秒単位でピッタリ揃えています。","低誘電損失材料（Low-Dk / Low-Df）：高周波信号が絶縁樹脂の中で熱になって減衰する誘電損失（tan δ）を抑えるため、Df ≈ 0.002–0.004 級の先端ハイスピード基板材料が採用されます。"],formula:{expression:"Z_diff ≈ (87 / √(ε_r + 1.41)) · ln(5.98 h / (0.8 w + t)) · (1 − 0.48 e^(−0.96 s/h))",description:"差動配線インピーダンス Z_diff を SLVS-EC=100 Ω ±5%、PCIe Gen4=85 Ω ±5% に厳密整合します。"},nextGenInnovation:"10〜14層エニーレイヤーHDI＋無電解ニッケル置換金（ENIG）表面処理＋0201/01005超微小チップ部品の両面高密度実装により、プロ用シネマカメラ並みの8K60p処理能力を小型ミラーレスの薄型ボディへ凝縮しています。",specs:[{label:"積層構造",value:"12層 エニーレイヤーHDI（逐次積層・低損失材料）"},{label:"ビア加工",value:"UVレーザー銅充填マイクロビア（径 50 – 75 μm）"},{label:"インピーダンス管理",value:"100 Ω (SLVS-EC/HDMI) / 85 Ω (PCIe Gen4) ±5%"},{label:"基板厚・表面処理",value:"約 1.4 – 1.5 mm / 無電解金メッキ (ENIG)"}],diagramType:"mb_hdi_pcb"},"mb-b2b-connectors":{title:"高密度ボード間コネクタ ＆ ZIFフレキ群（SLVS-EC / EVF / LCD / レンズ / 上面ダイヤル）",subtitle:"High-Density Board-to-Board SLVS-EC Mezzanine & ZIF FPC Connector Harness (12 Ports)",category:"M15 / 体内高速神経ハーネス接続群",plainAnalogy:"ひとことで言うと「センサー・ファインダー・液晶画面・シャッター・レンズ・ダイヤルとメイン基板をつなぐ“十数か所の超精密コンセント”」。爪先より小さな白いロックレバーで、紙のように薄いオレンジ色の配線リボンをガッチリ挟み込みます！",summary:"実機分解調査（Canon R5 II / Sony α1 II等）でも約12系統確認される、カメラ全身のサブモジュールをメイン基板へ集約する0.3〜0.4 mm超狭ピッチB2Bメザニンコネクタ＆ZIF（ゼロ挿入力）フレキシブル基板コネクタ群。",opticsAndPhysics:["80ピン・シールドSLVS-ECメザニンコネクタ：前面の5軸IBISイメージセンサーから折り返して届くU字型フレキを受け止める最重要コネクタ。両端と差動ペア間にグラウンドピンを交互配置（G-S-S-G配列）し、最大 160 Gbps 超のRAWデータ伝送でもクロストークを極小化します。","ZIF（Zero Insertion Force）フリップロック機構：厚さわずか 0.1 mm の薄いポリイミドフレキをそのまま押し込むと曲がって断線します。白いLCP樹脂の精密アクチュエータ（蓋）を倒すことで、力を入れずに数十本の金メッキ端子を均一圧接するプロ仕様構造です。","システム全身の神経結節点：944万ドット120Hz OLEDファインダー（EVF用MIPI-DSI）、背面バリアングル液晶、レンズマウント12ピン高速通信、シャッター駆動＆赤外線センサー、上面操作ダイヤル、バッテリー接点すべてがここへ集結します。"],formula:{expression:"G-S-S-G 差動コネクタ配列  ⇒  隣接ペア間クロストーク NEXT < −35 dB (@ 5 GHz)",description:"信号ペアの両脇をグラウンド端子で挟み込むことで、高密度コネクタ内でも綺麗なアイパターンを維持します。"},nextGenInnovation:"最新世代では金属EMIシールドシェル一体型の超低背（高さ 0.6–0.8 mm）ボード間コネクタが普及し、耐衝撃性（落下時のコネクタ外れ防止）と 10 Gbps/lane 超高速伝送を両立しています。",specs:[{label:"総接続ポート数",value:"12系統（SLVS-EC / EVF / LCD / レンズ / シャッター等）"},{label:"端子ピッチ",value:"0.30 – 0.40 mm 超狭ピッチ（金メッキ接触子）"},{label:"センサー接続",value:"80ピン金属シールド高速B2Bメザニン（G-S-S-G配列）"},{label:"ロック機構",value:"バックフリップ式 ZIF 高耐熱LCP樹脂アクチュエータ"}],diagramType:"mb_b2b"},"mb-chassis-frame":{title:"前面熱分離マグネシウム構造フレーム ＆ グラウンド・シールドブラケット",subtitle:"Front Thermal-Isolation Magnesium Structural Mid-Frame & EMI Grounding Bracket",category:"M16 / 筐体骨格・センサー／基板間熱遮断壁",plainAnalogy:"ひとことで言うと「センサーの部屋とメイン基板の部屋を隔てる“丈夫な金属の壁”」。熱いメイン基板の熱が前のイメージセンサーへ伝わって写真にノイズが増えないように遮りつつ、カメラ全体が歪まないようガッチリ支えます！",summary:"イメージセンサー／5軸IBISユニット（前面）とメインマザーボード（背面）の間に挟み込まれる高剛性ダイカスト・マグネシウム合金製ミッドフレーム。構造支持・熱経路分離・EMI基準グラウンドの3役を担います。",opticsAndPhysics:["センサー熱汚染の遮断（ダークノイズ防止）：イメージセンサーの暗電流ノイズは温度が約 6〜8 ℃ 上がるごとに2倍へ急増します！8K処理で高温になるメイン基板の熱がセンサー側へ逆流しないよう、この構造壁とエアギャップ・熱分離経路で「センサーの熱は前面・側面へ、ISPの熱は背面ベイパーチャンバーへ」と放熱ルートを分離設計します。","マグネシウム合金（AZ91D等）の物性：アルミより約35%軽く、プラスチックより圧倒的に剛性・振動減衰能・熱伝導率（~70 W/m·K）・電磁遮蔽性が高いため、プロ用一眼カメラの内部骨格に最適です。","中央の精密開口スリットはセンサーのU字型SLVS-ECフレキを通す最短通路であり、周囲の5点ステンレス・スタンドオフねじ座がメイン基板の反り（BGAハンダクラック原因）をゼロに抑えます。"],formula:{expression:"I_dark(T) ∝ T^(3/2) · exp(−E_g / 2 k_B T)   （センサー温度 +7 ℃ ごとに暗電流ノイズ約 2×）",description:"ISPの発熱を構造壁でセンサーから熱分離することが、長時間露光や高感度撮影の画質を守る鍵になります。"},nextGenInnovation:"最新のハイブリッド動画・静止画フラッグシップでは、ミッドフレーム内部に銅インサートや三脚座直結の放熱ボスを一体成形し、ボディ剛性と8K60p連続撮影時の熱キャパシティを同時に最大化しています。",specs:[{label:"構造材質",value:"チクソモールド／ダイカスト マグネシウム合金 (AZ91D)"},{label:"固定方式",value:"5点精密M1.6ステンレス・スタンドオフ ＋ EMI接地バネ"},{label:"重要機能",value:"センサー／ISP間 熱逆流遮断・基準GND・基板反り防止"},{label:"中央スリット",value:"SLVS-EC センサーフレキ最短通過ウィンドウ"}],diagramType:"mb_chassis"}};function gc(i=92,e=64,t=3.2){const n=i/2,s=e/2,o=12.6,r=s-10.8,a=2.2,l=new on;return l.moveTo(-n+t,-s),l.lineTo(n-t,-s),l.quadraticCurveTo(n,-s,n,-s+t),l.lineTo(n,s-t),l.quadraticCurveTo(n,s,n-t,s),l.lineTo(o+a,s),l.quadraticCurveTo(o,s,o,s-a),l.lineTo(o,r+a),l.quadraticCurveTo(o,r,o-a,r),l.lineTo(-o+a,r),l.quadraticCurveTo(-o,r,-o,r+a),l.lineTo(-o,s-a),l.quadraticCurveTo(-o,s,-o-a,s),l.lineTo(-n+t,s),l.quadraticCurveTo(-n,s,-n,s-t),l.lineTo(-n,-s+t),l.quadraticCurveTo(-n,-s,-n+t,-s),l}function Xt(i,e,t,n,s,o,r,a,l=.24){n.position.copy(s),gs(n,i);const{meshes:c,edges:h}=ms(n,a,26,l);return{id:i,subsystem:"mainboard",order:e,swatchColor:t,group:n,assembledPos:s,explodeOffset:o,integratedExplodeOffset:r,interactiveMeshes:c,edgeLines:h,explanation:K1[i]}}function $1(i){const e=[],t=i.clippingPlanes,n=[[-41.5,27.5],[41.5,27.5],[-41.5,-27.5],[41.5,-27.5],[-20.5,27.5],[16.5,-27.8]];{const l=new se,c=dt(34,29,3.2),h=new w(me(c,1,.14,.14,18),i.vaporChamberCopper);h.position.set(-4.5,-1,0),l.add(h);const u=new w(me(dt(16,9.5,2),.85,.1,.1,14),i.vaporChamberCopper);u.position.set(18,6.5,.05),l.add(u);const d=new De(.58,.68,.22,10);d.rotateX(Math.PI/2);for(let D=-17.5;D<=8.5;D+=5.2)for(let R=-11.5;R<=9.5;R+=5.2){const b=new w(d,i.copperHeatSpreader);b.position.set(D,R,-.56),b.userData.noEdges=!0,l.add(b)}const f=new oi([new _(3,-1.5,-.52),new _(2.5,-13.5,-.56),new _(-6,-24,-.56),new _(-24,-26.5,-.56)]),g=new Yn(f,28,1.35,12,!1);g.scale(1,1,.46);const x=new w(g,i.vaporChamberCopper);l.add(x);const m=dt(23,7.6,1.8),p=new w(me(m,.22,.02,.02,14),i.pyroGraphite);p.position.set(-29,23.6,-.2),l.add(p);const T=new w(new G(15.5,15.5,.72),i.thermalPadPink);T.position.set(3.5,-1.5,.88);const E=new w(new G(9.6,9.6,.72),i.thermalPadPink);E.position.set(22.5,6.5,.88);const S=new w(new G(9.2,12,.72),i.thermalPadBlue);S.position.set(-14.2,8.5,.88);const z=new w(new G(9.2,12,.72),i.thermalPadBlue);z.position.set(-14.2,-9.5,.88),l.add(T,E,S,z);for(const[D,R]of[[-18.8,10.8],[9.8,10.8],[-18.8,-12.8],[9.8,-12.8]]){const b=En(1.25,.42,1,i.stainlessMachined);b.rotation.x=Math.PI,b.position.set(D,R,-.54),l.add(b)}e.push(Xt("mb-vapor-chamber",1,"#d97d4e",l,new _(0,0,-27.4),new _(0,0,-54),new _(0,0,-190),t,.24))}{const l=new se,c=Je(54,39,2.6,18.6,18.6,1,-1,1.5),h=new $t;h.moveTo(13.5,.8),h.lineTo(24.5,.8),h.lineTo(24.5,11.8),h.lineTo(13.5,11.8),h.closePath(),c.holes.push(h);const u=new $t;u.moveTo(-23,-14.5),u.lineTo(-11.5,-14.5),u.lineTo(-11.5,14.5),u.lineTo(-23,14.5),u.closePath(),c.holes.push(u);const d=new w(me(c,.32,.04,.04,14),i.emiShieldCan);d.position.set(3.5,-.5,-.95),l.add(d);const f=[[3.5,18.8,53.6,.45],[3.5,-19.8,53.6,.45],[-23.2,-.5,.45,38.6],[30.2,-.5,.45,38.6],[-7.8,-.5,.42,37.8],[14.8,-.5,.42,37.8]];for(const[x,m,p,T]of f){const E=new w(new G(p,T,2.2),i.emiShieldCan);E.position.set(x,m,.15),l.add(E)}for(let x=-18;x<=25;x+=7.2)for(const m of[19.1,-20.1]){const p=new w(new G(1.8,.45,1.3),i.goldPlating);p.position.set(x,m,.65),l.add(p)}const g=new w(new G(13.2,11.2,1.5),i.emiShieldCan);g.position.set(24,22.2,.55),l.add(g),e.push(Xt("mb-emi-shield",2,"#c2cbd6",l,new _(0,0,-24.6),new _(0,0,-40.5),new _(0,0,-178),t,.28))}{const l=new se,c=Je(19.2,19.2,1.2,15,15,.7),h=new w(me(c,.95,.08,.08,16),i.stainlessMachined);h.position.set(3.5,-1.5,.42),l.add(h);const u=dt(16.6,16.6,1),d=new w(me(u,.58,.08,.08,16),i.neodymiumMagnet);d.position.set(3.5,-1.5,-.25),l.add(d);const f=new w(new G(14.4,13.4,.36),i.vaporChamberCopper);f.position.set(3.5,-1.5,.22),l.add(f);const g=new w(new G(13.2,12,.16),i.thermalPadBlue);g.position.set(3.5,-1.5,.48),l.add(g),e.push(Xt("mb-isp-ihs",3,"#9aa5b5",l,new _(0,0,-23.4),new _(0,0,-29),new _(0,0,-169),t,.26))}let s;{const l=new se,c=new w(new G(13.8,12.6,.68),i.siliconBulk);c.position.set(3.5,-1.5,.05),l.add(c);const h=new w(new Tn(13.5,12.3),i.ispSiliconDie);h.rotation.y=Math.PI,h.position.set(3.5,-1.5,-.31),h.userData.noEdges=!0,l.add(h);const u=Je(14.1,12.9,.35,13.5,12.3,.2),d=new w(me(u,.76,.04,.04,10),i.goldPlating);d.position.set(3.5,-1.5,.02),l.add(d),s=new w(new ii(6.8,7.35,4),new bt({color:959977,transparent:!0,opacity:0,side:Rt,clippingPlanes:t})),s.rotation.z=Math.PI/4,s.position.set(3.5,-1.5,-.38),s.userData.noEdges=!0,l.add(s),e.push(Xt("mb-isp-die",4,"#0f766e",l,new _(0,0,-22.2),new _(0,0,-18.5),new _(0,0,-160),t,.24))}{const l=new se,c=dt(20.5,20.5,.9),h=new w(me(c,.96,.06,.06,12),i.abfSubstrate);h.position.set(3.5,-1.5,0),l.add(h);const u=Je(14.8,13.6,.4,13.4,12.2,.2),d=new w(me(u,.42,.06,.06,10),i.icEpoxy);d.position.set(3.5,-1.5,-.58),l.add(d);for(let x=-3;x<=3;x++){for(const m of[-8.6,8.6]){const p=new w(new G(1.2,.62,.42),i.smdCeramic);p.position.set(3.5+x*2.1,-1.5+m,-.64),p.userData.noEdges=!0,l.add(p)}for(const m of[-8.6,8.6]){const p=new w(new G(.62,1.2,.42),i.smdCeramic);p.position.set(3.5+m,-1.5+x*2.1,-.64),p.userData.noEdges=!0,l.add(p)}}const f=new De(.24,.24,.34,8);f.rotateX(Math.PI/2);for(let x=-5.4;x<=5.41;x+=1.35)for(let m=-4.8;m<=4.81;m+=1.2){const p=new w(f,i.copperHybridBond);p.position.set(3.5+x,-1.5+m,-.62),p.userData.noEdges=!0,l.add(p)}const g=new Et(.32,8,6);for(let x=-8.4;x<=8.41;x+=1.4)for(let m=-8.4;m<=8.41;m+=1.4){if(Math.abs(x)<2.2&&Math.abs(m)<2.2&&(Math.round(x*10)+Math.round(m*10))%2!==0)continue;const p=new w(g,i.solderBallSilver);p.position.set(3.5+x,-1.5+m,.68),p.userData.noEdges=!0,l.add(p)}e.push(Xt("mb-isp-interposer",5,"#164a41",l,new _(0,0,-20.8),new _(0,0,-9),new _(0,0,-151),t,.24))}let o;{const l=new se,c=22.5,h=6.5,u=new w(me(dt(13.2,13.2,.7),.72,.05,.05,10),i.abfSubstrate);u.position.set(c,h,.45),l.add(u);const d=new w(new G(9.6,9.6,.62),i.siliconBulk);d.position.set(c,h,-.2),l.add(d);const f=new w(new Tn(9.3,9.3),i.npuSiliconDie);f.rotation.y=Math.PI,f.position.set(c,h,-.53),f.userData.noEdges=!0,l.add(f);const g=new w(me(Je(9.9,9.9,.25,9.3,9.3,.15),.66,.03,.03,8),i.goldPlating);g.position.set(c,h,-.2),l.add(g);const x=new Et(.26,8,6);for(let m=-5.2;m<=5.21;m+=1.3)for(let p=-5.2;p<=5.21;p+=1.3){if(Math.abs(m)<3.6&&Math.abs(p)<3.6)continue;const T=new w(x,i.solderBallSilver);T.position.set(c+m,h+p,.96),T.userData.noEdges=!0,l.add(T)}o=new w(new ii(4.9,5.4,4),new bt({color:9133302,transparent:!0,opacity:0,side:Rt,clippingPlanes:t})),o.rotation.z=Math.PI/4,o.position.set(c,h,-.6),o.userData.noEdges=!0,l.add(o),e.push(Xt("mb-ai-npu",6,"#6d28d9",l,new _(0,0,-21.2),new _(5.5,2.5,-18),new _(4,2,-158),t,.24))}{const l=new se,c=(h,u)=>{const d=new se;d.position.set(h,u,0);const f=new w(me(dt(10.8,13.6,.45),1.02,.06,.06,10),i.icEpoxy);d.add(f);const g=new w(new Ws(.55,14),i.goldPlating);g.rotation.y=Math.PI,g.position.set(3.8,5,-.53),g.userData.noEdges=!0,d.add(g);const x=new w(new G(11.1,13.9,.28),i.abfSubstrate);x.position.z=.54,d.add(x);const m=new Et(.22,8,6);for(let p=-4.2;p<=4.21;p+=1.4)for(let T=-5.6;T<=5.61;T+=1.4){if(Math.abs(p)<2.6&&Math.abs(T)<3.6)continue;const E=new w(m,i.solderBallSilver);E.position.set(p,T,.8),E.userData.noEdges=!0,d.add(E)}for(let p=-5;p<=5;p+=2){const T=new w(new G(.7,1.15,.55),i.smdCeramic);T.position.set(6.2,p,.45),T.userData.noEdges=!0,d.add(T)}return d};l.add(c(-14.2,8.5)),l.add(c(-14.2,-9.5)),e.push(Xt("mb-lpddr5x",7,"#2b3545",l,new _(0,0,-21),new _(-4.5,0,-11.5),new _(-4,0,-152),t,.26))}{const l=new se,c=new w(new G(7.6,7.6,.95),i.icEpoxy);c.position.set(1,-21.5,.25),l.add(c);const h=new w(new Ws(.42,12),i.goldPlating);h.rotation.y=Math.PI,h.position.set(3.5,-18.8,-.25),h.userData.noEdges=!0,l.add(h);const u=[[8,-18.8],[12.6,-18.8],[17.2,-18.8],[8,-23.8],[12.6,-23.8],[17.2,-23.8]];for(const[d,f]of u){const g=new w(me(dt(3.5,3.5,.45),1.85,.08,.08,10),i.ferriteInductor);g.position.set(d,f,-.15),l.add(g);for(const x of[-1.72,1.72]){const m=new w(new G(.32,2.2,1.25),i.silverElectrode);m.position.set(d+x,f,.15),l.add(m)}}for(const d of[-18.5,-21.6,-24.7]){const f=new w(new G(3.8,2.1,1.45),i.tantalumCapYellow);f.position.set(-6.2,d,0),l.add(f);const g=new w(new G(.6,2.12,.12),i.coaxShieldCopper);g.position.set(-4.7,d,-.74),g.userData.noEdges=!0,l.add(g);for(const x of[-1.92,1.92]){const m=new w(new G(.22,1.4,1.15),i.silverElectrode);m.position.set(-6.2+x,d,.18),l.add(m)}}e.push(Xt("mb-pmic-vrm",8,"#e3a82b",l,new _(0,0,-21.2),new _(0,-6.5,-10.5),new _(0,-5.5,-148),t,.26))}let r;{const l=new se,c=new w(new G(24,32,.42),i.emiShieldCan);c.position.set(-34.2,2.5,-2);const h=new w(new G(24,.55,4.1),i.emiShieldCan);h.position.set(-34.2,18.2,0);const u=new w(new G(24,.55,4.1),i.emiShieldCan);u.position.set(-34.2,-13.2,0);const d=new w(new G(2.4,31,3.8),i.icEpoxy);d.position.set(-23.2,2.5,.1),l.add(c,h,u,d);for(let p=-10.2;p<=15.2;p+=1.25){const T=new w(new G(3.4,.45,.25),i.goldPlating);T.position.set(-25.8,p,.35),T.userData.noEdges=!0,l.add(T)}const f=new w(new G(19.5,29.2,2.6),i.matteBlackAnodized);f.position.set(-36.4,2.5,-.1);const g=new w(new G(1.6,28.8,2.66),i.goldPlating);g.position.set(-44.6,2.5,-.1),l.add(f,g);const x=new w(new G(21.5,9.2,2.8),i.stainlessMachined);x.position.set(-35.2,-19.2,.6),l.add(x);const m=new w(new G(5.6,5.6,.8),i.icEpoxy);m.position.set(-25,22.8,1.9),l.add(m),r=new w(new Et(.65,10,8),new bt({color:16096779,transparent:!0,opacity:.25,clippingPlanes:t})),r.position.set(-24.2,16.2,-2.35),r.userData.noEdges=!0,l.add(r),e.push(Xt("mb-cfexpress",9,"#98a2b0",l,new _(0,0,-22.8),new _(-12.5,0,-15),new _(-11,0,-156),t,.26))}{const l=new se,c=new w(new G(4.8,4.8,1.25),i.ceramicAlumina);c.position.set(-18.5,-23,.05);const h=new w(new G(4.3,4.3,.24),i.goldPlating);h.position.set(-18.5,-23,-.62),l.add(c,h);const u=new w(new G(6.8,6.8,.95),i.icEpoxy);u.position.set(-11.4,-23.2,.2),l.add(u);for(let d=-2.6;d<=2.61;d+=.65){const f=new w(new G(.24,.65,.16),i.silverElectrode);f.position.set(-11.4+d,-23.2+3.65,.58);const g=new w(new G(.24,.65,.16),i.silverElectrode);g.position.set(-11.4+d,-23.2-3.65,.58),f.userData.noEdges=!0,g.userData.noEdges=!0,l.add(f,g)}e.push(Xt("mb-imu-mcu",10,"#d4a948",l,new _(0,0,-20.8),new _(-3.5,-6.5,-9.5),new _(-3,-5.5,-146),t,.26))}{const l=new se,c=new w(new G(5.6,5.6,.92),i.icEpoxy);c.position.set(20.2,-6.8,.2);const h=new w(new G(2.2,2.2,.14),i.goldPlating);h.position.set(20.2,-6.8,-.3),l.add(c,h);const u=new w(new G(4.4,3.4,.8),i.ceramicAlumina);u.position.set(26.8,-6.5,.22);const d=new w(new G(4.1,3.1,.55),i.goldPlating);d.position.set(26.8,-6.5,-.35),l.add(u,d);const f=new De(3.1,3.1,1.35,22);f.rotateX(Math.PI/2);const g=new w(f,i.neodymiumMagnet);g.position.set(24.2,-13.5,-.05);const x=new w(new hn(2.65,.22,8,22),i.goldPlating);x.position.set(24.2,-13.5,-.72),x.userData.noEdges=!0,l.add(g,x),e.push(Xt("mb-security-clock",11,"#eab308",l,new _(0,0,-20.8),new _(3.5,-3,-9.5),new _(3,-2.5,-146),t,.26))}{const l=new se,c=new w(new G(12.4,13.4,7.6),i.stainlessMachined);c.position.set(40.4,15.8,-1.6);const h=new w(new G(1.2,9.8,5.4),i.icEpoxy);h.position.set(46.3,15.8,-1.6),l.add(c,h);for(let T=-3.2;T<=3.21;T+=.92){const E=new w(new G(1.8,.28,.35),i.goldPlating);E.position.set(45.2,15.8+T,-3.5),E.userData.noEdges=!0,l.add(E)}const u=new w(new G(11.4,14.8,4.8),i.emiShieldCan);u.position.set(40.8,1.5,-.4);const d=new w(new G(2.6,11.4,1.2),i.icEpoxy);d.position.set(45.5,1.5,-.4);const f=new w(new G(2.2,10.6,.25),i.goldPlating);f.position.set(45.5,1.5,-1.05),l.add(u,d,f);const g=me(dt(8.8,3.2,1.45),10.2,.06,.06,14);g.rotateY(Math.PI/2),g.rotateX(Math.PI/2);const x=new w(g,i.stainlessMachined);x.position.set(41.2,-10.8,.3);const m=new w(new G(2.4,6.2,.65),i.icEpoxy);m.position.set(45.2,-10.8,.3),l.add(x,m);for(const T of[-18.4,-24.2]){const E=new w(new G(9.6,4.8,4.4),i.icEpoxy);E.position.set(40.2,T,-.1);const S=new De(2.15,2.15,2.2,18);S.rotateZ(Math.PI/2);const z=new w(S,i.goldPlating);z.position.set(45.8,T,-.1);const D=new De(1.45,1.45,2.3,14);D.rotateZ(Math.PI/2);const R=new w(D,i.matteBlackAnodized);R.position.set(45.85,T,-.1),l.add(E,z,R)}const p=new w(new G(4.4,4.4,.8),i.icEpoxy);p.position.set(32.8,-21.2,1.7),l.add(p);for(let T=-11;T<=16;T+=4.5){const E=new w(new G(1.4,2.4,.55),i.icEpoxy);E.position.set(33.4,T,1.85),E.userData.noEdges=!0,l.add(E)}e.push(Xt("mb-io-ports",12,"#64748b",l,new _(0,0,-22.2),new _(12.5,0,-12),new _(11,0,-150),t,.26))}{const l=new se,c=new w(new G(12.4,10.4,.45),i.abfSubstrate);c.position.set(24,22.2,.65);const h=new w(new G(11.6,9.6,1.15),i.emiShieldCan);h.position.set(24,22.2,-.12),l.add(c,h);for(const u of[19.4,24.8]){const d=new w(new G(2,1.4,.65),i.pztCeramic);d.position.set(16.2,u,.5),l.add(d)}for(const[u,d,f]of[[25.6,13.5,30.2],[18.8,32.8,29.8]]){const g=new De(1.1,1.1,.9,14);g.rotateX(Math.PI/2);const x=new w(g,i.goldPlating);x.position.set(16.6,u,.15),l.add(x);const m=new oi([new _(16.6,u,-.25),new _((16.6+d)*.5,u+2.8,-.7),new _(d,f,-.35)]),p=new w(new Yn(m,16,.38,8,!1),i.coaxShieldCopper);l.add(p)}e.push(Xt("mb-rf-wifi",13,"#0284c7",l,new _(0,0,-21),new _(6,7,-13),new _(5.5,6,-154),t,.26))}{const l=new se,c=gc(92,64,3.2);Vn(c,n.map(([x,m])=>[x,m,1.55]));const h=me(c,1.48,.05,.05,16),u=h.attributes.position,d=h.attributes.uv;for(let x=0;x<u.count;x++)d.setXY(x,(u.getX(x)+46)/92,(u.getY(x)+32)/64);d.needsUpdate=!0;const f=new w(h,[i.hdiMainboardPcb,i.pcbEdgeLaminate]);l.add(f);const g=new ii(1.55,2.75,22);for(const[x,m]of n){const p=new w(g,i.goldPlating);p.rotation.y=Math.PI,p.position.set(x,m,-.78),p.userData.noEdges=!0;const T=new w(g,i.goldPlating);T.position.set(x,m,.78),T.userData.noEdges=!0,l.add(p,T)}for(let x=-10;x<=12;x+=2.2){const m=new w(new G(1,.55,.42),i.smdCeramic);m.position.set(x,16.5,-.95),m.userData.noEdges=!0,l.add(m)}e.push(Xt("mb-hdi-pcb",14,"#0e5a44",l,new _(0,0,-19.2),new _(0,0,4.5),new _(0,0,-132),t,.26))}{const l=new se,c=new w(new G(26.5,4.6,1.45),i.emiShieldCan);c.position.set(2,-2,0);const h=new w(new G(24.6,2.4,1.55),i.icEpoxy);h.position.set(2,-2,.05),l.add(c,h);for(let d=-10.8;d<=14.8;d+=.9){const f=new w(new G(.32,1.6,.35),i.goldPlating);f.position.set(d,-2,.72),f.userData.noEdges=!0,l.add(f)}const u=(d,f,g,x,m=!1,p=1)=>{const T=new se;T.position.set(d,f,g),m&&(T.rotation.z=Math.PI/2);const E=new w(new G(x,3.2,1.15),i.zifIvoryPlastic),S=new w(new G(x-.6,1.1,.52),i.icEpoxy);S.position.set(0,-.55*p,.65);const z=new w(new G(x-1.4,4.6,.16),i.polyimideFpc);z.position.set(0,3.2*p,.15),T.add(E,S,z),l.add(T)};u(-24,26.5,0,12,!1,1),u(16,26.5,0,11,!1,1),u(0,-28.2,-2.6,15,!1,-1),u(22.5,13.5,0,11.5,!1,1),u(22.5,-14.5,0,10.5,!1,-1),u(-34.5,26.5,0,9.5,!1,1),u(33,26.5,0,9.5,!1,1),u(-32,-26.5,0,13.5,!1,-1),e.push(Xt("mb-b2b-connectors",15,"#c76414",l,new _(0,0,-17.6),new _(0,0,15),new _(0,0,-118),t,.26))}{const l=new se,c=gc(95,67,3.8),h=new $t;h.moveTo(-13,-7.5),h.lineTo(17,-7.5),h.lineTo(17,4.5),h.lineTo(-13,4.5),h.closePath(),c.holes.push(h);for(const[x,m,p,T]of[[-32,0,14,28],[30,-14,12,16]]){const E=new $t;E.moveTo(x-p/2,m-T/2),E.lineTo(x+p/2,m-T/2),E.lineTo(x+p/2,m+T/2),E.lineTo(x-p/2,m+T/2),E.closePath(),c.holes.push(E)}const u=new w(me(c,1.55,.14,.14,18),i.magnesiumCast);l.add(u);const d=new De(2.4,2.7,2.1,16);d.rotateX(Math.PI/2);for(const[x,m]of n){const p=new w(d,i.stainlessMachined);p.position.set(x,m,-1.55),l.add(p)}const f=new De(4.2,4.2,3.2,20),g=new w(f,i.brassGear);g.position.set(-2,-33.2,0),l.add(g),e.push(Xt("mb-chassis-frame",16,"#7c8694",l,new _(0,0,-15.6),new _(0,0,26.5),new _(0,0,-104),t,.24))}return{parts:e,rig:{npuSystolicGlow:o,ispActiveGlow:s,cfexActivityLed:r,applyDynamics:(l,c)=>{const h=s.material,u=o.material,d=r.material;if(!c){h.opacity=0,u.opacity=0,d.opacity=.25;return}h.opacity=.45+.35*Math.sin(l*5.2),u.opacity=.5+.4*Math.sin(l*8.4+1.1),d.opacity=.35+.65*Math.abs(Math.sin(l*11))}}}}function j1(i){const e=new se,t=new se,n=[[-41.5,27.5],[41.5,27.5],[-41.5,-27.5],[41.5,-27.5]],s=new _n({color:10134450,dashSize:1.8,gapSize:1.4,transparent:!0,opacity:0,clippingPlanes:i}),o=[];for(const[f,g]of n){const x=new Ke().setFromPoints([new _(f,g,-15),new _(f,g,-28)]),m=new wt(x,s);m.computeLineDistances(),t.add(m),o.push(m)}t.visible=!1;const r=[],a=new Et(.74,12,10),l=(f,g,x,m,p)=>{const T=new Ke().setFromPoints([new _(0,0,-20),new _(1,0,-20)]),E=m?new _n({color:f,dashSize:1.5,gapSize:1,transparent:!0,opacity:.85,clippingPlanes:i}):new It({color:f,transparent:!0,opacity:.82,clippingPlanes:i}),S=new wt(T,E);e.add(S);const z=[],D=new bt({color:f,clippingPlanes:i});for(let R=0;R<x;R++){const b=new w(a,D);e.add(b),z.push(b)}r.push({line:S,packets:z,speed:g,getEndpoints:p})},c=(f,g,x,m,p)=>{const T=f[g]??new _(0,0,-20);return new _(T.x+x,T.y+m,T.z+p)};return l(440020,.95,3,!1,f=>[c(f,"mb-b2b-connectors",2,-2,.5),c(f,"mb-isp-die",3.5,-1.5,0)]),l(8141549,1.25,2,!1,f=>[c(f,"mb-isp-die",8.5,2.5,-.4),c(f,"mb-ai-npu",22.5,6.5,-.6)]),l(2450411,1.35,2,!1,f=>[c(f,"mb-isp-die",-1.5,3,-.4),c(f,"mb-lpddr5x",-14.2,8.5,-.5)]),l(2450411,1.35,2,!1,f=>[c(f,"mb-isp-die",-1.5,-5.5,-.4),c(f,"mb-lpddr5x",-14.2,-9.5,-.5)]),l(14251782,1.05,3,!1,f=>[c(f,"mb-isp-die",-2.5,-1.5,-.4),c(f,"mb-cfexpress",-25,2.5,-.6)]),l(165063,.9,2,!1,f=>[c(f,"mb-isp-die",9,-1.5,-.4),c(f,"mb-io-ports",38,1.5,-.5)]),l(15357964,.72,2,!0,f=>[c(f,"mb-isp-die",3.5,-1.5,-.5),c(f,"mb-vapor-chamber",3.5,-1.5,.6)]),l(15357964,.72,2,!0,f=>[c(f,"mb-ai-npu",22.5,6.5,-.6),c(f,"mb-vapor-chamber",22.5,6.5,.6)]),l(16347926,.65,2,!0,f=>[c(f,"mb-vapor-chamber",3.5,-1.5,-.7),c(f,"mb-vapor-chamber",-22,-25.5,-.7)]),e.visible=!1,{overlayGroup:e,explodeGuides:t,setVisible:f=>{e.visible=f},updateGuides:(f,g,x)=>{const m=ze.clamp((f-.04)*.55,0,.42);if(t.visible=g&&m>.01,s.opacity=m,!t.visible)return;const p=x.find(z=>z.id==="mb-chassis-frame"),T=x.find(z=>z.id==="mb-vapor-chamber"),E=(p?p.group.position.z:-15.6)+2,S=(T?T.group.position.z:-27.4)-2;o.forEach((z,D)=>{const[R,b]=n[D],v=z.geometry.attributes.position;v.setXYZ(0,R,b,E),v.setXYZ(1,R,b,S),v.needsUpdate=!0,z.computeLineDistances()})},update:(f,g,x)=>{if(!g)return;const m={};for(const p of x)m[p.id]=p.group.position;r.forEach((p,T)=>{const[E,S]=p.getEndpoints(m),z=p.line.geometry.attributes.position;z.setXYZ(0,E.x,E.y,E.z),z.setXYZ(1,S.x,S.y,S.z),z.needsUpdate=!0,p.line.material.isLineDashedMaterial&&p.line.computeLineDistances();const D=p.packets.length;p.packets.forEach((R,b)=>{const v=(f*p.speed+b/D+T*.13)%1;R.position.lerpVectors(E,S,v)})})}}}function J1(i){const e=new se,{parts:t,rig:n}=$1(i);for(const r of t)e.add(r.group);const s=j1(i.clippingPlanes);e.add(s.overlayGroup,s.explodeGuides);const o=(r,a)=>{for(const l of t){const c=a&&l.integratedExplodeOffset?l.integratedExplodeOffset:l.explodeOffset;l.group.position.set(l.assembledPos.x+c.x*r,l.assembledPos.y+c.y*r,l.assembledPos.z+c.z*r)}};return{rootGroup:e,parts:t,updateAnimation:(r,a,l,c,h)=>{o(l,h),n.applyDynamics(r,c),s.update(r,c,t)},setPhysicsVisible:r=>{s.setVisible(r)},updateExplodeGuides:(r,a)=>{s.updateGuides(r,a,t)}}}const Q1={"evf-eyecup":{title:"エルゴノミック遮光アイカップ ＆ クイックロック基部",subtitle:"Ergonomic Deep Silicone Eyecup & Quick-Release Bayonet Frame",category:"EVF層 E01 — 外光遮断・人間工学アイポイント制御",plainAnalogy:"映画館の暗いシートのように、横から差し込むまぶしい太陽光をシャットアウトする「目元専用の遮光フード」。メガネのままでも画面の四隅までくっきり見える絶妙な深さに設計されています。",summary:"ファインダー最後端に装着される医療グレード級シリコンエラストマー製の遮光アイカップ。強い逆光・直射日光下でも外光が接眼レンズへ侵入してコントラストを低下させる（迷光フレア）のを防ぐとともに、瞳孔位置を設計上の25mmハイアイポイント（射出瞳）へ自然に誘導します。",opticsAndPhysics:["25mmハイアイポイント設計：接眼最終面から瞳孔（射出瞳）まで約25mmの距離を確保し、眼鏡着用時でもケラレ（周辺視野欠け）なしに視野角41°の全域を見渡せます。","アイレリーフと外光遮断の最適化：深型・非対称シェード形状により斜入射外光を99%以上遮蔽し、4,000 cd/m²のHDR表示と0.000 cd/m²のOLED完全黒のコントラスト比（100万:1超）を屋外でも維持します。","視線入力AF（Eye Control AF）安定化：目元の位置ブレと外光赤外線（太陽光に含まれる850nm帯）の侵入を抑えることで、角膜反射像のS/N比を飛躍的に高めます。"],formula:{expression:"M_EVF = tan(θ_eye / 2) / tan(θ_50mm / 2) ≈ 0.90×  (25 mm Eyepoint)",description:"50mm標準レンズ無限遠・視度-1.0 m⁻¹時のファインダー倍率定義。0.90×・対角視野角41°の広大な虚像を25mm後方から快適に視認可能。"},nextGenInnovation:"2024–2026年フラッグシップ機では、工具不要で標準型と深型遮光カップをワンタッチ交換できるロック爪機構に加え、皮脂・日焼け止め耐性と防塵帯電防止コーティングを施したソフトタッチ・フルオロシリコンを採用しています。",specs:[{label:"対応ハイアイポイント",value:"約 25 mm（最終接眼レンズ面より）"},{label:"対角視野角 (FoV)",value:"約 41°（倍率 0.90×）"},{label:"シェード素材",value:"低硬度フルオロシリコン（防塵・耐皮脂）"},{label:"固定機構",value:"2点爪バヨネット ＋ 誤脱落防止ロック"}],diagramType:"evf_eyecup"},"evf-antifog-window":{title:"防曇密閉ダブルガラス接眼保護窓（フッ素コート）",subtitle:"Airtight Anti-Fog Double-Pane Fluorine-Coated Eyepiece Window",category:"EVF層 E02 — 結露防止断熱構造・撥油保護光学窓",plainAnalogy:"雪国の家で窓が曇らない「二重サッシ（ペアガラス）」をそのままカメラのファインダーに縮小搭載。真冬の極寒や真夏の蒸し暑い現場でも、目元の湯気でファインダーが真っ白になるのを防ぎます。",summary:"最外層の保護ガラスと内側光学ガラスの間に乾燥空気層（密閉断熱チャンバー）を挟み込み、EPDM製Oリングで気密封止した防曇二重構造。急激な温度変化や撮影者の顔・呼気からの水蒸気による内部結露を物理的に遮断し、最外面には皮脂や水滴を弾くフッ素コーティングを施しています。",opticsAndPhysics:["二重断熱エアギャップによる露点制御：外気（寒冷地-10℃など）とカメラ内部（発熱部+35℃）の熱伝導を空気層（熱伝導率 λ ≈ 0.026 W/m·K）で遮断し、ガラス内面温度が露点温度 T_dew を下回るのを防ぎます。","広帯域多層AR（反射防止）＋850nm近赤外透過設計：可視光（400–700nm）だけでなく視線入力AF用の850nm近赤外光も99%以上透過するハイブリッド多層膜を両面に蒸着。","フッ素撥水・撥油コート：接触角110°以上の超低表面エネルギー膜により、まつ毛の皮脂や雨滴が付着しにくく、一拭きで光学的クリアさを回復します。"],formula:{expression:"R_thermal = d_air / λ_air  ≫  d_glass / λ_glass   ⇒   T_inner > T_dew",description:"ガラス（λ ≈ 1.0 W/m·K）の約40倍高い熱抵抗を持つ密閉空気層が、内面温度を露点以上に保ち結露（曇り）を防止。"},nextGenInnovation:"Canon EOS R1など最新プロ機では、接眼光学系の一部を完全気密構造（防曇構造）とすることで、極寒のスタジアムから暖かい室内への移動や高温多湿の雨天撮影でも瞬時にクリアな視界を維持します。",specs:[{label:"構造",value:"気密シール二重光学ガラス（乾燥空気層）"},{label:"最外面コート",value:"フッ素撥水・撥油 ＋ 広帯域AR多層膜"},{label:"透過波長帯",value:"400–700 nm（可視）＋ 850 nm（NIR）"},{label:"封止部材",value:"耐候EPDMオーリング気密ガスケット"}],diagramType:"evf_antifog"},"evf-eye-sensor":{title:"ToF赤外線アイセンサー ＆ 環境光輝度センサー",subtitle:"Time-of-Flight IR Proximity Eye Sensor & Ambient Light Photodiode",category:"EVF層 E03 — 自動EVF/LCD切替・HDR環境順応調光",plainAnalogy:"ファインダーを覗き込んだ瞬間を「0.05秒」で察知して画面を切り替え、さらに周りの明るさ（炎天下か暗い室内か）に合わせてファインダーの明るさを自動調整してくれる賢い「見張り番センサー」です。",summary:"接眼窓の直下に配置された940nm帯VCSEL近接ToFセンサーと可視光環境照度センサーの複合モジュール。撮影者の顔・目が近づいた距離をミリメートル精度で測定してEVFと背面LCDを瞬時に自動切替するとともに、周囲の環境光に応じてOLED輝度と色温度を自動最適化します。",opticsAndPhysics:["940nm不可視赤外線ToF/位相差測距：視線入力AF用の850nm光と波長を分離（940nm帯）することで相互干渉を防ぎ、サングラスや逆光太陽光下でも誤動作なく接近距離（5–40mm）を検出します。","超高速50ms未満のEVF復帰：近接を検知するとTCONへ即座にウェイクアップ割り込みを送り、シャッターチャンスを逃さないゼロ遅延感覚のファインダー点灯を実現します。","人間工学オートブライトネス：周囲の暗順応・明順応状態（0.1 lux〜100,000 lux）を測光し、4,000 cd/m²の超高輝度から夜間撮影向けの目に優しい低輝度まで滑らかに自動調光します。"],formula:{expression:"d_eye = (c · Δt_ToF) / 2   (< 25 mm ⇒ EVF ON / LCD OFF)",description:"940nm赤外光パルスの往復飛行時間 Δt から顔までの距離 d を算出し、背面モニターとの自動切替と省電力制御を実行。"},nextGenInnovation:"最新世代ではマルチゾーンSPAD（単一光子アバランシェダイオード）アレイを採用し、カメラを胸の前に下げた際の衣服による誤点灯をAI距離マップで完全排除しつつ、チルトモニター展開時は自動無効化します。",specs:[{label:"測距方式",value:"940 nm VCSEL ＋ SPAD ToF近接センサー"},{label:"切替応答時間",value:"< 40 ms（超低遅延ウェイクアップ）"},{label:"環境照度検知範囲",value:"0.05 – 120,000 lux（19段自動調光対応）"},{label:"誤検知防止",value:"850 nm視線AF帯域との波長完全分離"}],diagramType:"evf_eye_sensor"},"evf-ir-leds":{title:"視線入力AF用 850nm赤外線リングLEDアレイ（8灯）",subtitle:"Eye-Control AF 850nm Near-Infrared Illumination Ring LED Array (×8)",category:"EVF層 E04 — 視線検出用・不可視角膜反射イルミネーター",plainAnalogy:"人間にはまったく見えない「赤外線の小さなライト8個」で、あなたの黒目をそっと照らすリングライト。瞳の表面に小さな光の点（プルキニエ像）を映し出し、カメラが「どこを見ているか」を瞬時に読み取るための光源です。",summary:"接眼開口部の周囲にリング状に配置された8個の850nm近赤外線LEDエミッター群。人間の視覚にはほぼ見えない安全な微弱近赤外光を眼球へ多方向から照射し、瞳孔の輪郭と角膜表面の鏡面反射点（第1プルキニエ像）を安定して生成します。",opticsAndPhysics:["角膜反射法（PCCR: Pupil Center Corneal Reflection）：眼球が回転しても角膜表面の虚像反射点（グリント）はほぼ静止し、瞳孔中心だけが移動するため、両者の相対ベクトルから高精度な視線方向を算出できます。","8灯リング配置による眼鏡・まつ毛・ズレ耐性：複数方位のLEDを時分割／選択点灯することで、眼鏡レンズの強い不要反射を避けながら常に2点以上の鮮明な角膜反射像を確保します。","眼安全規格（IEC 62471 免除グループ）準拠：連続動作時でも角膜・網膜への放射照度を国際安全基準の数十分の一以下に制御したパルス同期発光を行います。"],formula:{expression:"θ_gaze = k · (r_pupil − r_Purkinje) / R_cornea",description:"角膜曲率半径 R_cornea（約7.8mm）上での角膜反射点 r_Purkinje と瞳孔中心 r_pupil の相対変位から視線角 θ_gaze を決定。"},nextGenInnovation:"Canon EOS R1 / EOS R5 Mark II世代ではLED数と空間配置を刷新し、検出エリアを大幅拡大。ファインダーから目が少しズレた状態や、厚い眼鏡・深い彫りの顔立ちでも従来比2倍のフレームレートで安定した視線追従を実現しました。",specs:[{label:"発光波長",value:"850 nm 近赤外線（不可視・高CMOS感度帯）"},{label:"光源構成",value:"高効率GaAlAs赤外LED × 8灯リング配置"},{label:"駆動方式",value:"視線センサー露光同期パルス発光"},{label:"眼安全規格",value:"IEC 62471 Exempt Group（完全無害出力）"}],diagramType:"evf_ir_leds"},"evf-dichroic-mirror":{title:"45° ダイクロイック・ホットミラー（可視光透過／赤外線90°反射）",subtitle:"45° Dichroic Hot-Mirror Optical Beam Splitter",category:"EVF層 E05 — 波長選択ビームスプリッター（視線入力の要）",plainAnalogy:"「写真の光はまっすぐ通し、目から跳ね返った赤外線だけを直角に曲げる」魔法のマジックミラー。この1枚があるおかげで、ファインダーの画質を一切落とさずに、目の動きだけを下のカメラへ送り届けられます。",summary:"EVF光路内に正確に45°傾けて配置された超薄型ダイクロイック・ホットミラー。数十層の高屈折率・低屈折率誘電体薄膜（TiO₂ / SiO₂）の光干渉効果により、OLEDからの可視光（400–700nm）は98%以上そのまま目へ透過させつつ、撮影者の眼球から戻ってくる850nm赤外線像だけを95%以上の効率で真下（90°方向）の視線検出センサーへ反射分離します。",opticsAndPhysics:["多層誘電体薄膜干渉（ブラッグ反射）：光学膜厚が設計波長 λ₀ の1/4（n·d = λ₀/4）となる高・低屈折率層を交互に積層し、850nm帯の反射波だけを強め合い（建設的干渉）させます。","可視光域の無劣化透過：通常のハーフミラーと異なり光を50%ロスしないため、4,000 cd/m²の超高輝度OLED映像の明るさ・色純度・解像度をほぼ100%損なわず目へ届けます。","非点収差・二重像の抑制：平行平面ガラス基板の厚みを極限（0.5–0.7mm）まで薄型化し、裏面にも広帯域ARコートを施すことで、斜め45°透過時に生じるゴーストや非点収差を光学設計で完全補正しています。"],formula:{expression:"n_H d_H = n_L d_L = λ_IR / 4   (λ_IR ≈ 850 nm ⇒ R_IR > 95%, T_vis > 98%)",description:"λ/4 誘電体多層ブラッグ条件。赤外線のみを90°下の視線カメラへ反射し、可視光映像はロスなく通過させる波長分離光学系。"},nextGenInnovation:"最新フラッグシップEVFでは、入射角45°±12°の広視野角光線束全体にわたってP偏光／S偏光の透過率差（色ムラ）が出ない「超広角イオンアシスト蒸着ダイクロイック膜」を採用し、視野隅まで均一なDCI-P3色再現を両立しています。",specs:[{label:"配置角度",value:"光軸に対して厳密 45.0°（±0.05°）"},{label:"可視光透過率 (400–700nm)",value:"> 98.5%（無色ニュートラル透過）"},{label:"赤外線反射率 (850nm)",value:"> 95.0%（90°下方センサーへ反射）"},{label:"薄膜構成",value:"TiO₂ / SiO₂ 40層超・イオンアシスト蒸着"}],diagramType:"evf_dichroic"},"evf-gaze-camera":{title:"視線入力AF 30.7万画素 赤外CMOSセンサー ＆ リレー光学系",subtitle:"307K-Pixel NIR Line-of-Sight CMOS Sensor & Aspheric IR Relay Lens",category:"EVF層 E06 — 視線トラッキング専用カメラ（メイン基板切欠き収容）",plainAnalogy:"ファインダーの下に隠れている「あなたの黒目だけを撮影する専用ミニカメラ」。1秒間に何十回も瞳の動きを撮影し、AIチップと連携して「今あなたが見つめた選手」へ一瞬でピント枠を飛ばします。",summary:"45°ダイクロイックミラーの真下（メイン基板上端のEVF専用光学切欠き内）に収められた視線検出専用ミニカメラモジュール。専用非球面IRリレーレンズ、850nmバンドパスフィルター、約30.7万画素（VGA級）高感度近赤外CMOSセンサーで構成され、撮影者の眼球像を高速キャプチャしてAIアクセラレーター（NPU）へ送信します。",opticsAndPhysics:["850nm狭帯域バンドパスフィルター：接眼窓からわずかに漏れる可視外光を完全遮断し、8灯のIR LEDが作る鮮明な瞳孔エッジと角膜プルキニエ輝点だけを純粋に撮像します。","サブピクセル楕円フィッティング＋NPU深層学習：得られた30.7万画素の眼球画像から、まぶた・まつ毛による一部遮蔽や眼鏡フレームの反射をAIで除外しつつ、0.1画素精度で瞳孔中心と角膜反射座標を算出します。","空間レイアウトの妙：ダイクロイックミラーで光路を90°折り曲げることで、EVF全長を伸ばすことなくメイン基板上部の専用ノッチ空間にコンパクト収容しています。"],formula:{expression:"(x_AF, y_AF) = f_calib( u_pupil − u_glint, v_pupil − v_glint )",description:"個人差のある視軸と光軸のズレ（カッパ角 κ）をキャリブレーション行列 f_calib で補正し、視野内のAF座標へ実時間変換。"},nextGenInnovation:"Canon EOS R1 / R5 Mark IIでは約30.7万画素の新開発ラインオブサイトCMOSセンサーと専用フロントエンジン（DIGIC Accelerator）の連携により、視線検出フレームレートを従来比2倍へ高速化。複数選手が交錯するスポーツ現場で「見るだけで被写体切替」を実現します。",specs:[{label:"撮像素子",value:"約 30.7万画素（640×480）NIR高感度CMOS"},{label:"光学系",value:"専用非球面IR結像レンズ ＋ 850nm BPF"},{label:"演算連携",value:"専用AIアクセラレーター（2倍高速検出）"},{label:"搭載位置",value:"ダイクロイック直下・メイン基板EVF切欠き内"}],diagramType:"evf_gaze_cam"},"evf-lens-rear":{title:"後群 大口径両面非球面 接眼レンズ（G4・ZEISS T*級多層AR）",subtitle:"Rear Large-Aperture Double-Sided Aspheric Eyepiece Lens (G4)",category:"EVF層 E07 — 0.90×高倍率・広視野角41°・低非点収差接眼主群",plainAnalogy:"ファインダーの中にある「超高精度な虫眼鏡の主役レンズ」。丸いレンズのカーブをあえて複雑な曲線（非球面）に削り出すことで、画面の端っこまで糸巻きのように歪まず、映画館のスクリーン並みに大きく見せてくれます。",summary:"撮影者の目に最も近い主接眼レンズ（G4）。大口径ガラスモールド両面非球面レンズを採用し、倍率0.90×・対角視野角41°という広大な視界と25mmの長いアイポイントを両立させながら、周辺部の非点収差・歪曲収差・目が動いたときの「像揺れ」を徹底的に抑え込みます。",opticsAndPhysics:["高次非球面（Aspheric）による歪曲＆像揺れ抑制：通常の球面レンズでは視野角40°を超えると糸巻き歪み（Pincushion Distortion）と瞳球面収差が急増し、視線を動かした際に背景が波打って見えますが、両面非球面プロファイルでこれを劇的に低減します。","大口径射出瞳（アイボックス）設計：レンズ有効径を約23mmまで大型化することで、瞳孔が光軸中心から数mmズレても周辺が暗くならない余裕ある視認性を実現します。","超低反射多層コーティング（T* / ナノAR級）：レンズ表面反射率を0.2%以下に抑え、4,000 cd/m²の強いOLED光がレンズ間で多重反射して起きるゴースト・コントラスト低下を徹底排除します。"],formula:{expression:"z(r) = (c·r²) / [1 + √(1 − (1+κ)c²r²)] + A₄r⁴ + A₆r⁶ + A₈r⁸",description:"非球面レンズ面形状方程式。4次・6次・8次非球面係数 A₄, A₆, A₈ の最適化により広角41°全域で非点収差と像揺れを最小化。"},nextGenInnovation:"Canon EOS R1の5群5枚新EVF光学系やSony α1 II / α9 IIIのZEISS T*接眼光学系では、解像スペックだけでなく「眼球を素早く動かした際の光学的酔い・像揺れ（官能性能）」まで最適化した大口径ガラスモールド非球面レンズを投入しています。",specs:[{label:"レンズ形式",value:"ガラスモールド（GMo）大口径両面非球面"},{label:"有効径 / 視野角",value:"φ 23.0 mm / 対角 41°（倍率 0.90×）"},{label:"表面コーティング",value:"超低反射多層AR膜（反射率 < 0.2%）"},{label:"主要補正収差",value:"非点収差・糸巻き歪曲・瞳球面収差（像揺れ）"}],diagramType:"evf_lens_rear"},"evf-lens-ed-doublet":{title:"視度補正可動群：ED低分散＋高屈折ランタン貼合せレンズ（G2/G3）",subtitle:"Movable Diopter Focus Group — ED + High-Index Lanthanum Cemented Doublet",category:"EVF層 E08 — 色収差ゼロ色消し・-4〜+3 m⁻¹視度フォーカシング群",plainAnalogy:"カメラの望遠レンズにも使われる高級「色ズレ防止（ED）レンズ」を2枚ピタッと貼り合わせた可動レンズ。ダイヤルを回すと前後にスッと動いて、近視や遠視の人の目にもメガネなしでくっきりピントを合わせます。",summary:"視度調整ダイヤルに連動して光軸方向（Z軸）へ精密に前後移動する可動フォーカシングレンズ群。異常低分散ガラス（EDガラス・高アッベ数）と高屈折高分散ガラスを光学接着した色消し貼合せダブレット（G2/G3）により、高倍率0.90×ファインダー最大の弱点である「周辺の倍率色収差（文字や高コントラスト境界の赤・青にじみ）」を根本から打ち消します。",opticsAndPhysics:["色消しダブレット（Achromatic Doublet）の原理：屈折率の波長依存性が小さいED凸レンズ（アッベ数 ν_d ≈ 81）と高分散凹レンズ（ν_d ≈ 25）を組み合わせ、R（656nm）・G（588nm）・B（486nm）の焦点位置を完全一致させます。","視度（ディオプター D [m⁻¹]）調整の物理：可動レンズ群を光軸上へ Δz だけ移動させると、OLEDの虚像距離 s' = 1/D が連続変化し、-4.0 m⁻¹（近視用・虚像25cm）から +3.0 m⁻¹（遠視用）まで裸眼で鮮明に結像します。","移動に伴う倍率・収差変動の抑制：全群繰り出しではなく中間群インナーフォーカス方式とすることで、視度を動かしてもファインダー倍率（0.90×）や接眼全長がほぼ変化せず防塵防滴も維持できます。"],formula:{expression:"φ₁ / ν₁ + φ₂ / ν₂ = 0   ＆   Δz ≈ −f_eff² · ΔD",description:"左：色収差ゼロの色消し条件（パワーφとアッベ数νの調和）。右：視度変化 ΔD [m⁻¹] に必要なレンズ移動量 Δz（f=22mmなら1Dあたり約0.48mm）。"},nextGenInnovation:"2024–2026年の超解像944万ドットEVFでは1画素幅がわずか約6.4μmのため、わずかな色収差でもRGBサブピクセルが分離して見えます。最新光学系は高偏肉非球面高分散素子とED硝材を組み合わせ、視度全域で画素単位のキレを保ちます。",specs:[{label:"レンズ構成",value:"ED低分散凸 ＋ 高屈折高分散凹 貼合せ群"},{label:"視度調整範囲",value:"−4.0 〜 +3.0 m⁻¹（標準初期値 −1.0 m⁻¹）"},{label:"光軸移動ストローク",value:"約 3.4 mm（ステンレス2軸ガイド摺動）"},{label:"アッベ数差 (Δν_d)",value:"ν₁ ≈ 81.6 (FCD) / ν₂ ≈ 25.4 (S-TIH)"}],diagramType:"evf_lens_ed"},"evf-diopter-mech":{title:"精密ヘリコイド視度調整ダイヤル・リードスクリュー ＆ 2軸ガイド",subtitle:"Precision Push-Lock Helical Diopter Dial, Lead Screw & Dual Guide Rods",category:"EVF層 E09 — バックラッシュレス精密直進カム駆動機構",plainAnalogy:"ファインダー横についている「カリカリ回す視度ダイヤル」の裏側にある精密なネジとレール。引っ張り出さないと回らないロック機構とバネの力で、カメラを激しく振ってもピントが絶対にズレません。",summary:"撮影者が親指で操作するローレット加工ポップアップ式視度調整ダイヤルと、回転運動をサブミリメートル精度のZ軸直進運動へ変換する真鍮リードスクリュー、2本の焼き入れステンレス平行ガイドロッド、およびガタ（バックラッシュ）をゼロにする予圧スプリングで構成されるメカユニット。",opticsAndPhysics:["2軸平行ガイドによる光軸チルト防止：可動レンズ枠の片側を精密長穴スリーブ、反対側をU字回り止めガイドで支えるキネマティック支持により、レンズが0.02°以上傾いて片ボケするのを防ぎます。","予圧スプリングによるバックラッシュ除去：リードスクリューのねじ山には必ずわずかな隙間（遊び）がありますが、ステンレス圧縮バネで常に一方向へ予圧をかけることで、ダイヤルの正逆回転時のヒステリシスをゼロにします。","プルアウト（引き出し）誤操作防止ロック：通常時はボディ側スプラインに噛み合ってロックされ、引き出した時だけ噛み合いが解除されてクリック感とともに視度調整できます。"],formula:{expression:"Δz = (P_lead / 2π) · Δθ_dial   (P_lead = 1.2 mm/rev)",description:"リード角ピッチ P_lead の精密ねじ機構により、ダイヤルの回転角 Δθ を滑らかかつ微細な光軸変位 Δz へ減速変換。"},nextGenInnovation:"最新フラッグシップ機はダイヤル軸受部に二重Oリング防水シールを内蔵しつつ、高剛性ステンレスガイド軸と自己潤滑フッ素樹脂ブッシュにより、-20℃の氷点下でもグリス硬化せず一定の操作トルクを維持します。",specs:[{label:"駆動方式",value:"真鍮精密リードスクリュー ＋ 2軸ステンレスガイド"},{label:"ガタ除去機構",value:"定圧アンチバックラッシュ予圧コイルバネ"},{label:"誤操作防止",value:"プルアウト・クリックロック式ローレットダイヤル"},{label:"防水シール",value:"軸受ダブルEPDM Oリング防塵防滴構造"}],diagramType:"evf_diopter"},"evf-lens-field":{title:"前群 非球面フィールドフラットナー集光レンズ（G1）",subtitle:"Front Aspheric Field-Flattener Condenser Lens (G1)",category:"EVF層 E10 — 像面湾曲補正・ペッツバール和低減・瞳集光レンズ",plainAnalogy:"OLEDの小さな平らな画面から四方八方に飛び出す光を、ムダなく後ろのレンズ群へ送り込み、さらに画面の真ん中から四隅までピント面をピシッと平らに整える「最初の玄関レンズ」です。",summary:"0.64型マイクロOLEDパネルの直後（目側）に近接配置された正メニスカス非球面レンズ（G1）。OLED表面のマイクロレンズアレイ（MLA）から射出される光束を効率よく取り込んで後続のED可動群へ導くとともに、高倍率接眼系で発生しやすい「像面湾曲（画面中央と周辺でピント位置がズレる現象）」を打ち消すフィールドフラットナーとして機能します。",opticsAndPhysics:["ペッツバール像面湾曲（Petzval Field Curvature）の補正：正レンズばかりで構成すると結像面がお椀状に曲がりますが、G1のメニスカス曲率と後群負パワーのバランスによりペッツバール和をゼロ近傍へ抑え、画面端の微細な文字やAF枠までシャープに保ちます。","テレセントリック受光整合：マイクロOLED上のマイクロレンズアレイ（MLA）は光軸正面方向へ指向性高く発光するため、G1の入射瞳を遠く（テレセントリック寄り）に設定することで周辺減光やカラーシフトを防ぎます。","熱膨張・埃侵入に対する近接配置：OLED保護ガラスから約2mmの近傍に配置され、微細なゴミが乗っても焦点面から外れて視界に写り込みにくい光学距離を厳密設計しています。"],formula:{expression:"1 / R_Petzval = − Σ ( φ_i / n_i ) → 0",description:"ペッツバール和の低減条件。各レンズの屈折力 φ_i と屈折率 n_i を最適化し、0.64型平面OLEDを平坦な虚像として目へ結像。"},nextGenInnovation:"最新世代ではOLEDの指向性マイクロキャビティ発光角（±25°以内）に完全マッチさせた高屈折率・低複屈折ガラスモールド非球面G1を採用し、画面最周辺でもDCI-P3の色ズレと輝度落ちを極限まで排除しています。",specs:[{label:"レンズ形式",value:"正メニスカス非球面フィールドフラットナー"},{label:"主機能",value:"像面湾曲補正 ＋ テレセントリック集光整合"},{label:"有効径 / 位置",value:"φ 19.6 mm（OLED発光面から約 2.5 mm）"},{label:"光学特性",value:"高屈折率ガラス・広帯域ARコート済"}],diagramType:"evf_lens_field"},"evf-oled-panel":{title:"0.64型 944万ドット 2層タンデム マイクロOLED（OLEDoS）",subtitle:'0.64" 9.44M-Dot Quad-XGA 2-Stack Tandem WOLED-on-Silicon Microdisplay',category:"EVF層 E11 — EVFの心臓部（4,000 cd/m²・DCI-P3・240Hz自発光パネル）",plainAnalogy:"親指の爪ほどのシリコンチップの上に、4Kテレビに迫る「約944万個（2048×1536×RGB）の極小ライト」をぎっしり詰め込んだ超精密ミニチュア画面。2階建ての発光層と超極小レンズのおかげで、真夏の直射日光下でも太陽のまぶしさまでリアルに輝きます。",summary:"単結晶シリコンCMOSウェハ上に直接有機EL発光層を積層した最先端「OLEDoS（OLED-on-Silicon）」マイクロディスプレイ。発光層を2層直列に重ねた「2スタック・タンデム白色OLED」、R/G/Bごとに共振波長を合わせた「光マイクロキャビティ構造」、さらに画素直上の「オンチップ・マイクロレンズアレイ（MLA）」を融合し、4,000 cd/m²の驚異的輝度・DCI-P3広色域・240Hz駆動を実現します。",opticsAndPhysics:["単結晶シリコンCMOSバックプレーン：ガラス基板TFTと異なり、微細半導体プロセスで画素真下に駆動トランジスタと高速SRAMを埋め込めるため、画素ピッチ約6.4μm（3,900 PPI級）の超高精細と高開口率を達成します。","2スタック・タンデムOLED ＋ 電荷発生層（CGL）：2つの有機発光ユニットを電荷発生層で直列積層することで、同じ電流密度で2倍の光量子を発生させ、4,000 cd/m²級の高輝度動作と約4倍の長寿命（焼き付き耐性）を両立します。","光マイクロキャビティ共振 ＋ オンチップMLA：反射アルミ陽極と半透明陰極の間隔 d_c をR/G/B各サブピクセルでナノメートル単位に調整（ファブリー・ペロー共振）して色純度をDCI-P3/Rec.2020域へ尖鋭化。さらにオンチップMLAが光取り出し効率を約1.8倍へ引き上げます。"],formula:{expression:"2 n d_c + (φ₁ + φ₂)λ / (2π) = m λ   ＆   L_peak ≈ 4,000 cd/m²",description:"光マイクロキャビティ共振条件。R/G/B各サブピクセルの光学長 n·d_c を個別最適化し、狭帯域DCI-P3発色と正面指向性輝度を劇的に向上。"},nextGenInnovation:"2024–2026年は「超高精細944万ドット×240fps（Sony α1 II / α9 III）」「世界最高4,000 cd/m²＆DCI-P3広色域（Nikon Z6 III）」「従来比3倍輝度＆OVFビューアシストHDR（Canon EOS R1）」が融合し、一眼レフの光学ファインダーを超えるHDR現実感へ到達しました。",specs:[{label:"パネルサイズ / 解像度",value:"0.64型 / 944万ドット（2048×1536×RGB）"},{label:"ピーク輝度 / 色域",value:"最大 4,000 cd/m² (nits) / DCI-P3 広色域"},{label:"発光・集光構造",value:"2スタックTandem WOLED ＋ 微小共振器 ＋ MLA"},{label:"リフレッシュ / 応答",value:"最大 240 fps / < 0.01 ms（ブラックアウトフリー）"}],diagramType:"evf_oled"},"evf-tcon-pcb":{title:"240Hz MIPI-DSI タイミングコントローラ（TCON）基板 ＆ フレキ",subtitle:"High-Speed 240Hz MIPI-DSI Display Driver / TCON PCB & Shielded FPC",category:"EVF層 E12 — デュアルストリーム超低遅延映像伝送・OLED電源制御",plainAnalogy:"メイン基板の映像エンジンから届く膨大な映像データを、一瞬の遅れもなくマイクロOLEDの944万個の画素へ仕分けして届ける「超高速の交通整理ボード」と、オレンジ色の専用ケーブルです。",summary:"マイクロOLEDの背面に直結する高密度リジッドフレキTCON基板。メイン基板の4nm ISPからシールド付き高速差動FPC経由で送られる240Hz・10bit HDR映像（MIPI-DSI D-PHY/C-PHYまたはデュアルストリームLVDS）を受信し、画素ごとの輝度ムラ補正（デムラ処理）・ガンマ変換・タンデムOLED用の高精度ELVDD/ELVSS電源昇圧をリアルタイム実行します。",opticsAndPhysics:["ブラックアウトフリー＆超低遅延パイプライン：CMOSセンサーの電子シャッター読み出しと並行し、記録用RAWストリームとは独立したEVF専用低遅延ストリームをライン単位で直結駆動することで、表示遅延を5ms未満へ圧縮します。","リアルタイム画素ムラ補正（Demura）＆温度補償：内蔵EEPROMに工場出荷時の944万ドット個別輝度・色度バラつきマップを記憶し、OLED温度センサー値と合わせて10bit階調で精密補正します。","EMIノイズ完全遮蔽：240Hz高速クロック信号が直下にあるイメージセンサーや無線モジュールへ干渉しないよう、FPC全面に黒色導電銀ペーストEMIシールド膜を施しています。"],formula:{expression:"R_EVF = 2048 × 1536 × 30 bit × 240 Hz ≈ 22.6 Gbps  (DSC圧縮伝送)",description:"Quad-XGA・10bit RGB・240Hz駆動時の生映像帯域は約22.6 Gbps。VESA DSC視覚無劣化圧縮＋MIPI-DSI多レーンで低消費電力伝送。"},nextGenInnovation:"最新フラッグシップ機は、静止画120コマ/秒の超高速連写中でもファインダーが一切暗転しない（ブラックアウトフリー）デュアルストリーム専用パイプラインと、可変リフレッシュレート（VRR 60/120/240Hz）動的切替をTCON側でシームレスに制御します。",specs:[{label:"インターフェース",value:"MIPI-DSI 4+4レーン（VESA DSC 1.2a対応）"},{label:"最大フレームレート",value:"240 fps（60/120/240Hz可変切替）"},{label:"階調・補正処理",value:"10-bit HDR-PQ / リアルタイムDemura補正"},{label:"OLED電源IC",value:"低ノイズ同期整流 ELVDD(+7.5V) / ELVSS(-5.5V)"}],diagramType:"evf_tcon"},"evf-thermal-sink":{title:"マイクロOLED背面 銅/アルミ複合ヒートシンク ＆ 熱伝導パッド",subtitle:"Micro-OLED Rear Copper/Aluminum Thermal Sink & High-k Silicone TIM",category:"EVF層 E13 — 4,000ニト高輝度放熱・焼き付き＆色シフト防止",plainAnalogy:"4,000ニトもの強烈な光と240Hzの超高速処理で熱くなるマイクロOLEDの背中にピタッと貼られた「専用の冷却プレート」。熱を素早く逃がして、画面の色ズレや寿命低下を食い止めます。",summary:"OLEDoSシリコンバックプレーンの背面から発生する熱（ピーク発光＋240Hz駆動時 約1.2〜2.2W）を、高熱伝導シリコーンTIMパッドを介して純銅ベース板と微細放熱フィンへ吸い上げ、EVFマグネシウム鏡筒およびカメラ上面シャーシへ速やかに拡散する専用サーマルユニット。",opticsAndPhysics:["有機ELの熱劣化（アレニウス則）抑制：有機発光分子は接合部温度が+10℃上がるだけで輝度半減寿命（LT50）が約半分に縮みます。背面ヒートシンクでシリコン基板温度を50℃以下に抑え込むことが、4,000 cd/m²常用を実現する絶対条件です。","温度依存のホワイトバランス＆輝度シフト防止：R/G/Bの有機EL発光効率は温度特性がそれぞれ異なるため、背面全体を銅プレートで均熱化しつつ内蔵サーミスタでTCONへ温度フィードバックし、厳密なDCI-P3色温度を維持します。","結露防止への副次熱利用：EVF光学系全体の適度な温度維持にも寄与し、寒冷地での内部光学系の安定動作を支えます。"],formula:{expression:"LT₅₀(T) ∝ exp( E_a / (k_B · T) )   (ΔT = −15 °C ⇒ 寿命約 2.5〜3×)",description:"OLED寿命のアレニウス温度依存性。背面ヒートシンクによる15℃の冷却が、高輝度マイクロOLEDの信頼性と焼き付き耐性を劇的に高める。"},nextGenInnovation:"Nikon Z6 IIIの4,000 cd/m²級やCanon EOS R1の高輝度EVFでは、単結晶シリコンウェハの優れた熱伝導率（148 W/m·K）を活かし、パッケージ裏面へ直接銅ヒートスプレッダーを圧着してマグネシウムペンタ部外装へ熱逃がし経路を構築しています。",specs:[{label:"ヒートスプレッダー",value:"無酸素銅（C1020）ベース ＋ アルミ微細フィン"},{label:"熱伝導TIM",value:"高弾性シリコーンサーマルパッド（8.0 W/m·K）"},{label:"定格放熱能力",value:"最大 2.5 W 連続放熱（ΔT < 12 K）"},{label:"温度監視",value:"高精度NTCサーミスタ内蔵（色温度リアルタイム補償）"}],diagramType:"evf_heatsink"},"evf-magnesium-housing":{title:"防塵防滴マグネシウム合金EVF鏡筒 ＆ 内部遮光バッフル",subtitle:"Weather-Sealed Magnesium-Aluminum EVF Optical Barrel & Internal Baffles",category:"EVF層 E14 — 光学同軸剛体ハウジング・内面反射迷光遮断",plainAnalogy:"カメラの上部にコブのように乗っている、軽くて超頑丈な「マグネシウム合金のトンネル」。内側には光を吸収するギザギザの溝（遮光バッフル）が刻まれていて、余計な反射光を吸い込んで真っ黒な引き締まった映像を守ります。",summary:"フラッグシップミラーレスカメラ頂部（旧ペンタプリズム相当部）の骨格をなすマグネシウム合金ダイカスト製EVF鏡筒ハウジング。4群5枚の精密レンズと45°ダイクロイックミラー、視線カメラ、0.64型マイクロOLEDをマイクロメートル精度の同軸アライメントで保持し、内壁ののこぎり歯状遮光バッフルと全周EPDMガスケットで迷光・塵・水滴を完全遮断します。（※本3Dモデルでは内部光学系を一目で観察できるよう側面をカットアウェイ構造で可視化しています）",opticsAndPhysics:["同軸光学アライメント剛性：倍率0.90×・944万ドットの極限光学系では、レンズ光軸のわずかな偏心（>15μm）が周辺片ボケや視線AF誤差を生むため、高比剛性・低熱膨張のマグネシウム合金一体鏡筒で全光学素子を精密位置決めします。","内面鋸歯状遮光バッフル（ナイフエッジ溝）：鏡筒内壁に連続した鋭利な段差と超低反射艶消し黒塗装（反射率<1%）を刻み、斜めに当たる迷光を多重反射減衰させて「黒浮き」を根絶します。","カメラ光学コアとの完璧な空間統合：シャッター・5軸IBISセンサー・メイン基板の直上にマウントされ、下端の視線入力カメラはメイン基板上端の専用EVFノッチへ干渉ゼロでドッキングします。"],formula:{expression:"I_stray = I_0 · ρ^N   (ρ ≈ 0.015, N ≥ 3 反射 ⇒ < 3 × 10⁻⁶)",description:"内壁遮光バッフルの迷光減衰式。艶消し黒面（反射率 ρ ≈ 1.5%）で3回以上反射させることで、迷光強度を100万分の3以下へ消滅させる。"},nextGenInnovation:"2024–2026年プロ機では、EVF光学系自体の防曇気密チャンバーと外装マグネシウム防塵防滴シーリングの二重プロテクション構造を採用し、豪雨・砂嵐・極寒の過酷なプロ現場でも一切曇らない・狂わない光学精度を誇ります。",specs:[{label:"鏡筒材質",value:"チクソモールディング AZ91D マグネシウム合金"},{label:"内面処理",value:"多段ナイフエッジ遮光バッフル ＋ 超低反射黒塗装"},{label:"光軸公差",value:"レンズ偏心公差 ±10 μm 以内"},{label:"耐環境性能",value:"防塵防滴EPDMシール ＋ 防曇密閉チャンバー対応"}],diagramType:"evf_housing"}},Vt=39.5;function nn(i,e,t,n,s,o,r,a,l=.24){n.position.copy(s),gs(n,i);const{meshes:c,edges:h}=ms(n,a,26,l);return{id:i,subsystem:"evf",order:e,swatchColor:t,group:n,assembledPos:s,explodeOffset:o,integratedExplodeOffset:r,interactiveMeshes:c,edgeLines:h,explanation:Q1[i]}}function zo(i,e,t,n){const s=new on;s.absarc(0,0,e,0,Math.PI*2,!1);const o=new $t;o.absarc(0,0,i,0,Math.PI*2,!0),s.holes.push(o);const r=me(s,t,.14,.14,40);return new w(r,n)}function e2(i){const e=[],t=i.clippingPlanes,n=[],s=new se;{const R=Je(31,24.4,5.2,22.8,17.6,3.6),b=new w(me(R,2.2,.25,.2,28),i.matteBlackAnodized);b.position.z=2,s.add(b);for(const U of[-1,1]){const k=new w(new G(1.6,15,1.4),i.stainlessMachined);k.position.set(U*14.4,0,2.8),s.add(k);const B=new w(new G(2,3.2,1.2),i.matteBlackAnodized);B.position.set(U*15.6,-4.5,2),s.add(B)}const v=Je(33.4,26.8,7.2,24.4,18.8,4.6),y=new w(me(v,3.6,.4,.4,32),i.evfEyecupRubber);y.position.z=-.8,s.add(y);const M=Je(36.2,29.4,9.2,25.4,19.6,5.4),C=new w(me(M,3.2,.85,.85,32),i.evfEyecupRubber);C.position.z=-3.8,s.add(C);const A=dt(26,4.6,2),I=new w(me(A,2.4,.45,.45,20),i.evfEyecupRubber);I.position.set(0,13.4,-5),I.rotation.x=.22,s.add(I)}e.push(nn("evf-eyecup",1,"#2c313a",s,new _(0,Vt,-37.2),new _(0,0,-56),new _(0,34,-36),t,.24));const o=new se;{const R=Je(28.2,22.4,4.2,22.8,17.4,3.2),b=new w(me(R,3.4,.2,.2,28),i.matteBlackAnodized);o.add(b);const v=Je(29,23.2,4.6,27.6,21.8,3.9),y=new w(me(v,1,.12,.12,28),i.epdmGasket);y.position.z=.6,o.add(y);const M=Je(24,18.6,3.4,22.4,17,3),C=new w(me(M,1.4,.06,.06,24),i.stainlessMachined);o.add(C);const A=me(dt(23.2,17.8,3),.75,.04,.04,24),I=new w(A,i.evfAntiFogGlass);I.position.z=-1.15,I.userData.edgeOpacity=.36,o.add(I);const U=new w(A.clone(),i.evfAntiFogGlass);U.position.z=1.15,U.userData.edgeOpacity=.36,o.add(U);const k=Je(23.4,18,3.1,22.6,17.2,2.9),B=new w(me(k,.7,0,0,24),i.evfGlassEdgeRim);B.position.z=-1.15;const O=new w(me(k,.7,0,0,24),i.evfGlassEdgeRim);O.position.z=1.15,o.add(B,O)}e.push(nn("evf-antifog-window",2,"#38bdf8",o,new _(0,Vt,-32.2),new _(0,0,-44),new _(0,34,-26),t,.26));const r=new se;{const R=new w(me(dt(15.2,5.2,1.4),2.4,.14,.14,16),i.matteBlackAnodized);r.add(R);const b=new w(new G(16.4,4.4,.8),i.sensorPcb);b.position.z=1.4,r.add(b);for(const C of[-3.4,.6]){const A=new w(new De(1.55,1.55,.8,20).rotateX(Math.PI/2),i.goldPlating);A.position.set(C,0,-1.05),r.add(A);const I=new w(new Et(1.15,18,12),C<0?i.irLedLens:i.siliconSensorDie);I.scale.set(1,1,.45),I.position.set(C,0,-1.25),I.userData.noEdges=!0,r.add(I)}const v=new w(new G(2.6,2.6,.7),i.silverElectrode);v.position.set(4.8,0,-1.08);const y=new w(new G(1.8,1.8,.4),i.evfLensAspheric);y.position.set(4.8,0,-1.32),r.add(v,y);const M=new w(new G(4.2,5.4,.22),i.polyimideFpc);M.position.set(0,4.2,1.7),r.add(M);for(const C of[-6.8,6.8]){const A=En(.62,.35,1.2,i.stainlessMachined);A.position.set(C,0,1.8),r.add(A)}}e.push(nn("evf-eye-sensor",3,"#0ea5e9",r,new _(0,28.4,-30.6),new _(0,-15,-34),new _(0,22,-22),t,.24));const a=new se;{const R=Je(27.8,22.8,7.6,21.6,16.8,5.4),b=new w(me(R,1.1,.08,.08,32),i.hdiMainboardPcb);a.add(b);const v=Je(26.4,21.4,7,25.4,20.4,6.6),y=new w(me(v,.14,0,0,32),i.goldPlating);y.position.z=-.58,a.add(y);const M=[[-10.8,6.8],[-4.2,9.8],[4.2,9.8],[10.8,6.8],[10.8,-6.8],[4.2,-9.8],[-4.2,-9.8],[-10.8,-6.8]];for(const[A,I]of M){const U=new w(new G(2.2,1.9,.8),i.ceramicAlumina);U.position.set(A,I,-.78),a.add(U);const k=new w(new De(.82,.92,.35,16).rotateX(Math.PI/2),i.goldPlating);k.position.set(A,I,-1.16),a.add(k);const B=new w(new Et(.76,16,12),i.evfIrEmitter.clone());B.scale.set(1,1,.72),B.position.set(A,I,-1.32),B.userData.noEdges=!0,a.add(B),n.push(B)}const C=new w(new G(3.4,9.5,.22),i.polyimideFpc);C.position.set(12.2,-8.8,.45),a.add(C)}e.push(nn("evf-ir-leds",4,"#e11d48",a,new _(0,Vt,-28),new _(0,0,-30),new _(0,34,-16),t,.24));const l=new se;{const R=new se;R.rotation.x=-Math.PI/4;const b=Je(23.4,25.4,1.8,19.6,21.6,1.2),v=new w(me(b,1.5,.14,.14,16),i.matteBlackAnodized);R.add(v);for(const[C,A]of[[-10.8,7.5],[10.8,7.5],[-10.8,-7.5],[10.8,-7.5]]){const I=new w(new G(1.8,3,.35),i.brassGear);I.position.set(C,A,-.82),R.add(I)}const y=new w(new G(20.4,22.4,.72),i.evfDichroicMirror);y.userData.edgeOpacity=.48,R.add(y);const M=new w(me(Je(20.6,22.6,.8,19.8,21.8,.6),.76,0,0,12),i.evfGlassEdgeRim);R.add(M),l.add(R);for(const C of[-1,1]){const A=new w(new De(1.1,1.1,2.2,16).rotateZ(Math.PI/2),i.stainlessMachined);A.position.set(C*12.6,0,0),l.add(A)}}e.push(nn("evf-dichroic-mirror",5,"#db2777",l,new _(0,Vt,-22.2),new _(0,0,-16),new _(0,34,-6),t,.28));const c=new se;{const R=new w(me(dt(16.6,12.8,1.6),1,.08,.08,16).rotateX(Math.PI/2),i.hdiMainboardPcb);R.position.y=-2.2,c.add(R);const b=new w(new G(9.6,1,8.2),i.ceramicAlumina);b.position.y=-1.2,c.add(b);const v=new w(new G(6.4,.35,5),i.siliconSensorDie);v.position.y=-.6,c.add(v);const y=new w(me(Je(8,6.6,.4,6.8,5.4,.2),.16,0,0,8).rotateX(Math.PI/2),i.goldPlating);y.position.y=-.62,c.add(y);const M=new w(new De(5.2,5.6,3.8,32),i.matteBlackAnodized);M.position.y=1.1,c.add(M);const C=new w(new hn(4.4,.55,12,32).rotateX(Math.PI/2),i.stainlessMachined);C.position.y=3.05,c.add(C);const A=new w(new De(4.1,4.1,.45,28),i.evfDichroicMirror);A.position.y=1.65,c.add(A);const I=new w(Ls(4.2,.9,1.15,.45,-.2,0,14,32).rotateX(-Math.PI/2),i.evfLensAspheric);I.position.y=2.95,c.add(I);const U=new w(new G(6.2,.9,2.2),i.zifIvoryPlastic);U.position.set(0,-3,-3.8);const k=new w(new G(5.4,.24,5.2),i.polyimideFpc);k.position.set(0,-3.1,-6.4),c.add(U,k);for(const[B,O]of[[-6.8,-4.8],[6.8,-4.8],[-6.8,4.8],[6.8,4.8]]){const X=En(.55,.3,1,i.stainlessMachined);X.rotation.x=-Math.PI/2,X.position.set(B,-1.65,O),c.add(X)}}e.push(nn("evf-gaze-camera",6,"#9333ea",c,new _(0,25.4,-22.2),new _(0,-18,-16),new _(0,12,-6),t,.24));const h=new se;{const R=Ls(11.4,2,2.55,2.15,-.62,.42,22,48),b=new w(R,i.evfLensAspheric);b.userData.edgeOpacity=.34,h.add(b);const v=new w(new hn(11.4,.34,12,48),i.evfGlassEdgeRim);v.userData.noEdges=!0,h.add(v);const y=zo(11.2,13,3.8,i.matteBlackAnodized);h.add(y);const M=zo(10.8,12.1,.7,i.brassGear);M.position.z=-1.95,h.add(M);for(let C=0;C<4;C++){const A=C*Math.PI/2+Math.PI/4,I=new w(new G(1.1,.65,.45),i.matteBlackAnodized);I.position.set(Math.cos(A)*11.45,Math.sin(A)*11.45,-2.28),I.rotation.z=A,h.add(I)}}e.push(nn("evf-lens-rear",7,"#0284c7",h,new _(0,Vt,-15.4),new _(0,0,-2),new _(0,34,4),t,.24));const u=new se;{const R=Ls(10.2,1.6,2.35,1.85,-.32,.25,20,48),b=new w(R,i.evfLensEd);b.position.z=-1.1,b.userData.edgeOpacity=.34,u.add(b);const v=Ls(10.2,2.8,-.4,-2.15,.12,.28,20,48),y=new w(v,i.evfLensField);y.position.z=1.45,y.userData.edgeOpacity=.34,u.add(y);const M=new w(new De(10.28,10.28,4.4,44,1,!0).rotateX(Math.PI/2),i.evfGlassEdgeRim);M.position.z=.2,M.userData.noEdges=!0,u.add(M);const C=zo(10.1,11.9,5.2,i.magnesiumCast);C.position.z=.2,u.add(C);const A=new w(new G(5,4.4,3.8),i.magnesiumCast);A.position.set(13.2,0,.2),u.add(A);const I=new w(new De(1.75,1.75,4.4,20).rotateX(Math.PI/2),i.brassGear);I.position.set(14.8,0,.2),u.add(I);for(const[U,k]of[[11.8,7.6],[-11.8,-6.8]]){const B=new w(new De(1.35,1.35,5.8,18).rotateX(Math.PI/2),i.stainlessMachined);B.position.set(U,k,.2),u.add(B)}}const d=nn("evf-lens-ed-doublet",8,"#10b981",u,new _(0,Vt,-9.2),new _(0,0,12),new _(0,34,14),t,.24);e.push(d);const f=new se,g=new se,x=new se;{const R=new w(new G(2.6,17.5,18),i.matteBlackAnodized);R.position.set(2.2,.5,0),R.scale.set(.55,.22,1),R.position.set(2.8,8.2,0),f.add(R);for(const X of[-8.2,8.2]){const J=new w(new G(4.4,5.2,1.6),i.magnesiumCast);J.position.set(.2,0,X),f.add(J)}const b=new w(new De(.95,.95,17.6,20).rotateX(Math.PI/2),i.brassGear);x.add(b);const v=new w(Jo(1.12,14.4,12,.16),i.brassGear);v.userData.noEdges=!0,x.add(v);const y=new w(Gs(16,2.3,1.4,.8),i.brassGear);y.position.z=-6.4,x.add(y),x.position.set(-.2,0,0),f.add(x);const M=new w(new De(.72,.72,18.8,16).rotateX(Math.PI/2),i.stainlessMachined);M.position.set(-3.2,7.6,0),f.add(M);const C=new w(Jo(1.25,5.4,7,.19),i.stainlessMachined);C.position.set(-3.2,7.6,4.6),C.userData.noEdges=!0,f.add(C),g.position.set(4.6,0,-6.4);const A=new w(new De(1.1,1.1,4.2,18).rotateZ(Math.PI/2),i.stainlessMachined);A.position.x=-1.6,g.add(A);const I=new w(Gs(14,2.1,1.4,.7).rotateY(Math.PI/2),i.pomGear);I.position.x=-2.2,g.add(I);const U=new w(new hn(1.35,.28,10,24).rotateY(Math.PI/2),i.epdmGasket);U.position.x=-.3,U.userData.noEdges=!0,g.add(U);const k=new w(new De(4.4,4.4,3.6,32).rotateZ(Math.PI/2),i.matteBlackAnodized);k.position.x=1.6,g.add(k);for(let X=0;X<24;X++){const J=X/24*Math.PI*2,ce=new w(new G(3.2,.38,.38),i.evfHousingMg);ce.position.set(1.6,Math.cos(J)*4.42,Math.sin(J)*4.42),ce.rotation.x=J,ce.userData.noEdges=!0,g.add(ce)}const B=new w(new hn(3.4,.3,10,32).rotateY(Math.PI/2),i.stainlessMachined);B.position.x=3.45,g.add(B);const O=new w(new Et(.42,12,10),i.goldPlating);O.position.set(3.55,2.3,0),O.userData.noEdges=!0,g.add(O),f.add(g)}e.push(nn("evf-diopter-mech",9,"#d97706",f,new _(15,Vt,-9.2),new _(4,-24,12),new _(24,34,14),t,.24));const m=new se;{const R=Ls(9.6,1.7,-.45,2.25,.14,-.38,20,48),b=new w(R,i.evfLensField);b.userData.edgeOpacity=.34,m.add(b);const v=new w(new hn(9.6,.3,12,48),i.evfGlassEdgeRim);v.userData.noEdges=!0,m.add(v);const y=Je(23.2,19.6,3,14.4,11,.6),M=new w(me(y,1.4,.12,.12,24),i.matteBlackAnodized);M.position.z=1.1,m.add(M);const C=zo(9.45,11.1,2.4,i.matteBlackAnodized);m.add(C)}e.push(nn("evf-lens-field",10,"#4f46e5",m,new _(0,Vt,-2.4),new _(0,0,26),new _(0,34,24),t,.24));const p=new se;let T;{const R=new w(me(dt(23,18.8,1.8),1.6,.14,.14,18),i.ceramicAlumina);R.position.z=.55,p.add(R);const b=new w(new G(18.6,14.4,.9),i.siliconBulk);b.position.z=-.2,p.add(b);const v=new w(me(Je(17.6,13.6,.6,14.4,10.8,.3),.32,.04,.04,12),i.goldPlating);v.position.z=-.68,p.add(v),T=new w(new Tn(13.8,10.4),i.evfOledActive),T.position.z=-.78,T.rotation.y=Math.PI,T.userData.noEdges=!0,p.add(T);const y=new w(new G(15.2,11.6,.36),i.coverGlass);y.position.z=-1.04,y.userData.edgeOpacity=.32,p.add(y);const M=new w(new G(15.6,11.8,.25),i.goldPlating);M.position.z=1.42,p.add(M);for(const C of[-1,1]){const A=new w(me(dt(3.6,6.2,1.2),1.2,.08,.08,12),i.kovarSeal);A.position.set(C*12.6,0,.55),p.add(A)}}e.push(nn("evf-oled-panel",11,"#2563eb",p,new _(0,Vt,3.6),new _(0,0,40),new _(0,34,34),t,.24));const E=new se;{const R=new w(me(dt(24.6,19.2,1.8),1.1,.08,.08,16),i.hdiMainboardPcb);E.add(R);const b=new w(new G(7.6,7.6,.95),i.icEpoxy);b.position.set(-2.2,1.2,.95),E.add(b);const v=new w(new G(4.4,4.4,.85),i.icEpoxy);v.position.set(6.2,3,.9),E.add(v);for(const[U,k]of[[5,-3.2],[8.2,-3.2]]){const B=new w(new G(2.4,2.2,1.1),i.ferriteInductor);B.position.set(U,k,1),E.add(B)}for(const[U,k]of[[-8.6,4.6],[-8.6,1.6],[-8.6,-1.6],[-8.6,-4.6]]){const B=new w(new G(2,1.2,.85),i.tantalumCapYellow);B.position.set(U,k,.92),E.add(B)}const y=new w(new G(2.8,2,.7),i.stainlessMachined);y.position.set(-2.4,-5.8,.86),E.add(y);const M=new w(new G(11.6,2.4,1.05),i.zifIvoryPlastic);M.position.set(0,-7.8,.98),E.add(M);const C=new w(new G(9.8,12.6,.28),i.polyimideFpc);C.position.set(0,-14.2,.55),E.add(C);const A=new w(new G(8.6,9.2,.32),i.emiShieldFilm);A.position.set(0,-13.6,.56),E.add(A);const I=new w(new G(9.4,1.8,.34),i.goldPlating);I.position.set(0,-20,.55),E.add(I)}e.push(nn("evf-tcon-pcb",12,"#059669",E,new _(0,Vt,6.8),new _(0,0,52),new _(0,34,44),t,.24));const S=new se;{const R=new w(new G(17.8,13.4,.8),i.thermalPadBlue);R.position.z=-1.1,S.add(R);const b=new w(me(dt(25.2,19.6,2),1.1,.1,.1,18),i.copperHeatSpreader);b.position.z=-.15,S.add(b);const v=new w(me(dt(23.8,18.2,1.6),.7,.08,.08,16),i.matteBlackAnodized);v.position.z=.72,S.add(v);for(let y=-4;y<=4;y++){const M=new w(new G(1.15,16.4,2.3),i.matteBlackAnodized);M.position.set(y*2.55,0,2),S.add(M)}for(const y of[-1,1]){const M=new w(me(dt(4.4,7.6,1.4),1.1,.08,.08,12),i.copperHeatSpreader);M.position.set(y*14.2,0,-.15),S.add(M);const C=En(.9,.55,2.2,i.stainlessMachined);C.position.set(y*14.4,0,.45),S.add(C)}}e.push(nn("evf-thermal-sink",13,"#c25e28",S,new _(0,Vt,10.2),new _(0,0,64),new _(0,34,54),t,.24));const z=new se;{const b=new on;b.moveTo(-8.5,13),b.lineTo(-4,15.6),b.lineTo(4,15.6),b.lineTo(13.8,12.2),b.lineTo(15.2,9.6),b.lineTo(15.2,-10.8),b.lineTo(12.2,-12.8),b.lineTo(-10.5,-12.8),b.lineTo(-12.2,-10.8),b.lineTo(-12.2,-8.8),b.lineTo(-9.4,-10.6),b.lineTo(11.4,-10.6),b.lineTo(13,-9.2),b.lineTo(13,8.8),b.lineTo(11.6,10.6),b.lineTo(3.4,13.4),b.lineTo(-3.4,13.4),b.lineTo(-8.5,10.8),b.closePath();const v=me(b,44.6,.28,.28,16),y=new w(v,i.evfHousingMg);z.add(y);const M=new w(new hn(6.6,.55,10,32).rotateX(Math.PI/2),i.stainlessMachined);M.position.set(0,-11.9,-9.7),z.add(M);const C=new w(me(dt(18.6,19.4,1.4),1.4,.14,.14,14).rotateX(Math.PI/2),i.matteBlackAnodized);C.position.set(0,16,4.2),z.add(C);for(const B of[-7.6,7.6]){const O=new w(new G(2.2,1.2,16.4),i.stainlessMachined);O.position.set(B,17,4.2),z.add(O)}for(let B=0;B<7;B++){const O=-17+B*5.2,X=new w(new G(16.8,1.35,.45),i.matteBlackAnodized);X.position.set(2.2,11.4,O),z.add(X);const J=new w(new G(1.35,18,.45),i.matteBlackAnodized);J.position.set(12.1,-.4,O),z.add(J)}const A=Je(30.4,24.4,4.8,25,19.2,3.6),I=new w(me(A,1.8,.18,.18,24),i.evfHousingMg);I.position.z=-44.6*.5+.9,z.add(I);const U=new w(me(Je(31.2,25.2,5.1,29.8,23.8,4.4),.7,.08,.08,24),i.epdmGasket);U.position.z=-44.6*.5-.1,z.add(U);const k=new w(me(Je(28.4,22.8,3.6,23.6,18.2,2.2),1.8,.16,.16,22),i.evfHousingMg);k.position.z=44.6*.5-.9,z.add(k);for(const[B,O]of[[-13.6,-15.5],[16.4,-15.5],[-13.6,14.5],[16.4,14.5]]){const X=new w(new De(2.1,2.4,2.8,18),i.evfHousingMg);X.position.set(B,-11.4,O),z.add(X);const J=En(1,.5,1.8,i.stainlessMachined);J.rotation.x=-Math.PI/2,J.position.set(B,-9.8,O),z.add(J)}}return e.push(nn("evf-magnesium-housing",14,"#4b5563",z,new _(0,Vt,-12.5),new _(0,29,4),new _(0,62,6),t,.26)),{parts:e,rig:{edLensPart:d,diopterDialGroup:g,leadScrewGroup:x,irLedMeshes:n,oledScreenMesh:T,applyDynamics:(R,b,v,y)=>{const M=y&&d.integratedExplodeOffset?d.integratedExplodeOffset:d.explodeOffset;if(!b){g.rotation.x=0,x.rotation.z=0;for(const I of n)I.material.emissiveIntensity=.55;return}const C=Math.sin(R*1.45),A=C*2;d.group.position.set(d.assembledPos.x+M.x*v,d.assembledPos.y+M.y*v,d.assembledPos.z+M.z*v+A),g.rotation.x=C*2.6,x.rotation.z=C*5.2,n.forEach((I,U)=>{const k=.45+.95*(.5+.5*Math.sin(R*6.5-U*(Math.PI/4)));I.material.emissiveIntensity=k})}}}}function t2(i){const e=new se;e.visible=!1;const t=new se;t.visible=!1;const n=new se;{const A=new It({color:3359061,transparent:!0,opacity:.72,clippingPlanes:i}),I=new je({color:3718648,transparent:!0,opacity:.22,roughness:.08,metalness:0,side:Rt,depthWrite:!1,clippingPlanes:i}),U=new bt({color:165063,transparent:!0,opacity:.52,side:Rt,clippingPlanes:i}),k=new It({color:16096779,transparent:!0,opacity:.85,clippingPlanes:i}),B=new Et(5.6,24,14,0,Math.PI*2,0,Math.PI*.42);B.rotateX(Math.PI/2);const O=new w(B,I);O.position.z=5.2,n.add(O);const X=new w(new ii(2.1,4.9,32),U);X.position.z=6.2,n.add(X);const J=new w(new Ws(2.05,28),new bt({color:988970,transparent:!0,opacity:.72,side:Rt,clippingPlanes:i}));J.position.z=6.18,n.add(J);const ce=new w(new Et(.42,12,10),new bt({color:16478597,clippingPlanes:i}));ce.position.set(1.1,.8,8.2),n.add(ce);const pe=10.2,Oe=(q,oe,ye,le,ne)=>{const ve=[];for(let Z=0;Z<=36;Z++){const Ne=ze.lerp(oe,ye,Z/36);q==="yz"?ve.push(new _(0,Math.sin(Ne)*le,Math.cos(Ne)*le)):ve.push(new _(Math.sin(Ne)*le,0,Math.cos(Ne)*le))}return new wt(new Ke().setFromPoints(ve),ne)};n.add(Oe("yz",.48,Math.PI*2-.48,pe,A)),n.add(Oe("xz",.48,Math.PI*2-.48,pe,A)),n.add(Oe("yz",Math.PI*.68,Math.PI*1.32,pe-.35,k)),n.add(Oe("xz",Math.PI*.68,Math.PI*1.32,pe-.35,k))}e.add(n);const s=[{color:165063,oy:4.2,ox:0},{color:14251782,oy:0,ox:0},{color:6514417,oy:-4.2,ox:0},{color:1096065,oy:0,ox:-5.4},{color:959977,oy:0,ox:5.4}],o=[],r=[];for(const A of s){const I=Array.from({length:8},()=>new _),U=new Ke().setFromPoints(I),k=new It({color:A.color,transparent:!0,opacity:.82,clippingPlanes:i}),B=new wt(U,k);e.add(B),o.push(B),r.push(I)}const a=new It({color:16007006,transparent:!0,opacity:.62,clippingPlanes:i}),l=new It({color:14753096,transparent:!0,opacity:.94,clippingPlanes:i}),c=[[-10.8,6.8],[10.8,6.8],[-10.8,-6.8],[10.8,-6.8]],h=[],u=[];for(let A=0;A<c.length;A++){const I=[new _,new _,new _],U=new wt(new Ke().setFromPoints(I),a);e.add(U),h.push(U),u.push(I)}const d=[[0,2.2],[0,0],[0,-2.2]],f=[],g=[];for(let A=0;A<d.length;A++){const I=Array.from({length:5},()=>new _),U=new wt(new Ke().setFromPoints(I),l);e.add(U),f.push(U),g.push(I)}const x=[],m=new Et(.46,12,10);s.forEach((A,I)=>{const U=new bt({color:A.color,clippingPlanes:i});for(let k=0;k<2;k++){const B=new w(m,U);e.add(B),x.push({mesh:B,pathIndex:I,phase:k*.5+I*.14,speed:.42})}});const p=[],T=new Et(.48,12,10),E=new bt({color:14753096,clippingPlanes:i});for(let A=0;A<3;A++)for(let I=0;I<2;I++){const U=new w(T,E);e.add(U),p.push({mesh:U,pathIndex:A,phase:I*.5+A*.16,speed:.52})}const S=new _n({color:6583435,dashSize:2.2,gapSize:1.6,transparent:!0,opacity:.42,clippingPlanes:i}),z=new _n({color:14753096,dashSize:1.8,gapSize:1.4,transparent:!0,opacity:.5,clippingPlanes:i}),D=[[-12.5,10.5],[12.5,10.5],[-12.5,-10.5],[12.5,-10.5]],R=[];for(const[A,I]of D){const U=new Ke().setFromPoints([new _(A,Vt+I,10),new _(A,Vt+I,-37)]),k=new wt(U,S);k.computeLineDistances(),t.add(k),R.push(k)}const b=new wt(new Ke().setFromPoints([new _(0,Vt,-22.2),new _(0,25.4,-22.2)]),z);b.computeLineDistances(),t.add(b);const v=new _n({color:14251782,dashSize:1.8,gapSize:1.4,transparent:!0,opacity:.55,clippingPlanes:i}),y=new wt(new Ke().setFromPoints([new _(14.8,Vt,-9.2),new _(15,Vt-24,-9.2)]),v);y.computeLineDistances(),t.add(y);const M=(A,I,U)=>{const k=A.length-1,B=ze.clamp(I,0,.9999)*k,O=Math.floor(B),X=B-O;U.lerpVectors(A[O],A[O+1],X)},C=(A,I)=>A.find(U=>U.id===I);return{overlayGroup:e,explodeGuides:t,setVisible:A=>{e.visible=A},update:(A,I,U)=>{if(!I||!e.visible)return;const k=C(U,"evf-oled-panel"),B=C(U,"evf-lens-field"),O=C(U,"evf-lens-ed-doublet"),X=C(U,"evf-lens-rear"),J=C(U,"evf-dichroic-mirror"),ce=C(U,"evf-ir-leds"),pe=C(U,"evf-antifog-window"),Oe=C(U,"evf-eyecup"),q=C(U,"evf-gaze-camera");if(!k||!B||!O||!X||!J||!ce||!pe||!Oe||!q)return;const oe=k.group.position.y,ye=k.group.position.z-.85,le=B.group.position.z,ne=O.group.position.z,ve=X.group.position.z,Z=J.group.position.z,Ne=ce.group.position.z-1.3,re=pe.group.position.z,N=Oe.group.position.z-26.5,Ee=N+6.2,he=N+8.2,_e=N-9.8;n.position.set(0,oe,N);const fe=(O.group.position.z-(O.assembledPos.z+(le-B.assembledPos.z)))*.08;s.forEach((F,P)=>{const W=r[P],j=F.ox,ae=F.oy;W[0].set(j,oe+ae,ye),W[1].set(j*1.28,oe+ae*1.28,le),W[2].set(j*(1.58+fe),oe+ae*(1.58+fe),ne),W[3].set(j*1.46,oe+ae*1.46,ve),W[4].set(j*.96,oe+ae*.96,Z),W[5].set(j*.56,oe+ae*.56,re),W[6].set(j*.14,oe+ae*.14,Ee),W[7].set(-j*.72,oe-ae*.72,_e),o[P].geometry.setFromPoints(W)}),c.forEach(([F,P],W)=>{const j=u[W];j[0].set(F,oe+P,Ne),j[1].set(F*.85,oe+P*.85,re),j[2].set(F*.14,oe+P*.14,he),h[W].geometry.setFromPoints(j)});const Ie=q.group.position.y+3,we=q.group.position.y-.55;d.forEach(([F,P],W)=>{const j=g[W];j[0].set(F,oe+P,he),j[1].set(F*1.1,oe+P*1.15,re);const ae=oe+P*1.25,ie=Z+P*1.25;j[2].set(F*1.15,ae,ie),j[3].set(F*.65,Ie,Z+P*.85),j[4].set(-F*.35,we,Z-P*.32),f[W].geometry.setFromPoints(j)});for(const F of x){const P=(A*F.speed+F.phase)%1;M(r[F.pathIndex],P,F.mesh.position)}for(const F of p){const P=(A*F.speed+F.phase)%1;M(g[F.pathIndex],P,F.mesh.position)}},updateGuides:(A,I,U)=>{const k=I&&A>.04;if(t.visible=k,!k)return;const B=C(U,"evf-thermal-sink"),O=C(U,"evf-eyecup"),X=C(U,"evf-dichroic-mirror"),J=C(U,"evf-gaze-camera"),ce=C(U,"evf-lens-ed-doublet"),pe=C(U,"evf-diopter-mech");if(!B||!O||!X||!J||!ce||!pe)return;const Oe=B.group.position.y,q=B.group.position.z+2.5,oe=O.group.position.z-4;D.forEach(([ye,le],ne)=>{const ve=R[ne];ve.geometry.setFromPoints([new _(ye,Oe+le,q),new _(ye,Oe+le,oe)]),ve.computeLineDistances()}),b.geometry.setFromPoints([new _(0,X.group.position.y,X.group.position.z),new _(0,J.group.position.y,J.group.position.z)]),b.computeLineDistances(),y.geometry.setFromPoints([new _(ce.group.position.x+14.8,ce.group.position.y,ce.group.position.z),new _(pe.group.position.x-.2,pe.group.position.y,pe.group.position.z)]),y.computeLineDistances()}}}function n2(i){const e=new se,{parts:t,rig:n}=e2(i);for(const r of t)e.add(r.group);const s=t2(i.clippingPlanes);e.add(s.overlayGroup,s.explodeGuides);const o=(r,a)=>{for(const l of t){const c=a&&l.integratedExplodeOffset?l.integratedExplodeOffset:l.explodeOffset;l.group.position.set(l.assembledPos.x+c.x*r,l.assembledPos.y+c.y*r,l.assembledPos.z+c.z*r)}};return{rootGroup:e,parts:t,updateAnimation:(r,a,l,c,h)=>{o(l,h),n.applyDynamics(r,c,l,h),s.update(r,c,t)},setPhysicsVisible:r=>{s.setVisible(r)},updateExplodeGuides:(r,a)=>{s.updateGuides(r,a,t)}}}const i2={"mount-flange-ring":{title:"CNC削り出し 55mm大口径 ステンレス・バヨネットフランジ",subtitle:"CNC Hardened Stainless Steel 55mm Large-Diameter Bayonet Flange Ring",category:"マウント層 M01 — 光学基準面（平面度 ±2μm・ショートフランジバック）",plainAnalogy:"レンズとカメラをつなぐ「超精密な玄関のドア枠」。ただの銀色の輪っかに見えますが、なんと髪の毛の太さの約1/40（2ミクロン）の誤差も許されないほど真っ平らに磨かれており、大口径のおかげで画面の四隅までまっすぐ光が届きます。",summary:"フルサイズセンサー対角長（43.27mm）を大きく上回る内径55mmクラスの大口径ステンレス製バヨネットリング。焼入れマルテンサイト系ステンレス（SUS420J2）に硬質クロムめっきと精密ラップ研磨を施し、何万回ものレンズ交換による摩耗を防ぎながら、センサー面からの距離（フランジバック16–20mm）をミクロン精度で規定する光学の絶対基準面です。",opticsAndPhysics:["大口径（54–55mm）×ショートフランジバック（16–20mm）の光学革命：レンズ最後端（後玉）を巨大かつセンサー直前へ配置できるため、周辺部へ向かう光線角（CRA: 主光線入射角）を垂直に近づけ、cos⁴θ則による周辺光量落ちや色かぶりを劇的に低減します。","F0.95〜F1.2の極限開放F値と対称型広角設計：一眼レフ（フランジバック44–46.5mm）ではミラー回避のため複雑なレトロフォーカス型が必要だった広角レンズも、短フランジバックにより素直で収差の少ない理想配置が可能になります。","非対称4本バヨネット爪（または大型3本爪）：約60°の軽い回転だけで全周均一にレンズを噛み合わせ、誤った角度での逆差しを幾何学的に防止します。上部の赤い丸印が装着開始位置の指標です。"],formula:{expression:"E(θ) ∝ cos⁴(θ_CRA)   ＆   D_mount > d_diag(43.3 mm) ⇒ F0.95 設計自由度",description:"大口径55mm・短フランジバックにより周辺主光線角 θ_CRA を抑制し、周辺減光・マイクロレンズクロストークを最小化しつつF0.95超開放設計を実現。"},nextGenInnovation:"Nikon Zマウント（内径55mm・16mm）、Canon RFマウント（54mm・20mm）、Lマウント（51.6mm・20mm）など最新フルサイズミラーレスは、大口径ステンレス削り出しフランジを軸に、開放F1.2から画面最周辺まで解像する新世代レンズ群を支えています。",specs:[{label:"マウント内径 / 材質",value:"φ 55.0 mm / 焼入れSUS420J2（硬質Crめっき）"},{label:"ショートフランジバック",value:"16.0 〜 20.0 mm（旧一眼レフ比 1/2以下）"},{label:"基準面 平面度公差",value:"± 2.0 μm 以内（精密ラップ仕上げ）"},{label:"着脱耐久回数",value:"50,000 回以上（耐焼付き・耐摩耗処理）"}],diagramType:"mount_flange"},"mount-bolts-6x":{title:"6点高張力ステンレス締結ボルト ＆ 緩み止めロック剤",subtitle:"6-Point High-Tensile Stainless Mounting Bolts with Thread-Locker",category:"マウント層 M02 — 超望遠片持ち荷重支持・高剛性6点締結",plainAnalogy:"2〜3kgもある巨大な望遠レンズをカメラの前面だけで支え続ける「6本の超強力アンカーボルト」。ネジ山には青い特殊な接着剤（ロック剤）が塗られており、激しい撮影振動でも絶対に緩みません。",summary:"バヨネットフランジ全周を60°間隔でマグネシウム合金マウントボックスへ強固に締結する6本の高張力ステンレス精密ボルト（M2.5クラス）。従来の4点止めから6点止めへ増強することで、400mm F2.8や600mm F4など重量級超望遠レンズ装着時の片持ち曲げモーメントによるフランジ浮き上がり（片ボケ原因）を徹底抑制します。",opticsAndPhysics:["片持ち梁（カンチレバー）曲げモーメント耐性：質量3kg・重心距離20cmの超望遠レンズではマウント上側ボルトに約6 N·mの曲げモーメント＋手持ち衝撃加速度（数G）が集中します。6点均等配置により1本あたりの引張応力を大幅に分散します。","軸力プリロードと微少チルト防止：規定トルクで締結されたボルト軸力がフランジをシム面へ強く押し付けるため、極限F1.2撮影時に致命傷となる10μmレベルのフランジ浮き（光軸傾き）を防ぎます。","嫌気性ねじ緩み止め剤（青いプレコート）：空気を遮断したネジ嵌合部で硬化するマイクロカプセル型ロック剤により、高速連写や車載・航空機撮影の連続微振動でも軸力低下を防止します。"],formula:{expression:"M_bend = m · g · L_CG · G_shock   ⇒   F_bolt ≈ M_bend / (n_top · R_pitch)",description:"超望遠レンズの重心距離 L_CG による片持ち曲げモーメント。上部締結点数を増やす6点ボルト構造でマウント剛性を飛躍的に向上。"},nextGenInnovation:"Sony α1 II / α9 III やプロ機フラッグシップでは、従来の4本ビスから「6本高剛性マウントビス＋ヘリサート強化めねじ」へ刷新され、ボディ側を支点にした過酷な手持ち超望遠撮影でも光軸精度を維持します。",specs:[{label:"締結点数 / 規格",value:"6点均等配置 / 高張力SUS M2.5精密皿・フランジボルト"},{label:"緩み止め処理",value:"嫌気性ナイロン/樹脂系ブルーロック剤コート"},{label:"推奨締付トルク",value:"約 0.45 〜 0.55 N·m（トルク管理締結）"},{label:"耐片持ちモーメント",value:"静荷重 35 N·m 超（600mm F4級対応）"}],diagramType:"mount_bolts"},"mount-weather-gasket":{title:"二重リップ高弾性EPDM 防塵防滴マウントガスケット",subtitle:"Dual-Lip High-Elasticity EPDM Weather-Seal Mount Gasket",category:"マウント層 M03 — 全周気密防滴バリア・水滴砂塵遮断",plainAnalogy:"潜水艦のハッチのように、レンズとボディのすき間をぐるっと一周ふさぐ「防水ゴムパッキン」。土砂降りの雨や砂漠の細かい砂ボコリが、一番デリケートなイメージセンサー室へ入り込むのを水際で食い止めます。",summary:"ステンレスフランジの外周溝に装着された高耐候EPDM（エチレンプロピレンジエンゴム）製二重リップシーリングリング。防塵防滴レンズ側のゴムスカートと全周360°にわたって弾性密着し、毛細管現象で侵入しようとする雨水・雪・砂塵を二段構えのラビリンス構造で遮断します。",opticsAndPhysics:["二重リップ・ラビリンス防水構造：外側の第1リップが雨水や飛沫の大部分を弾き、万一突破した微細な湿気も内側の第2リップと溝空間で減圧トラップしてマウント内部への侵入を防ぎます。","毛細管現象（キャピラリー侵入）の防止：金属フランジ同士の微細な隙間（数μm）は表面張力で水を吸い込みやすいですが、疎水性のEPDM弾性体が隙間をゼロ圧縮して水の通り道を断ち切ります。","耐寒性・低圧縮永久ひずみ：氷点下−20℃でもゴムが硬化せず、かつ長期間レンズを装着し続けても潰れ癖がつきにくい低反発特殊配合エラストマーを使用しています。"],formula:{expression:"ΔP_capillary = (2 γ cos θ_c) / h   ⇒   EPDM密着 (h → 0) で侵入遮断",description:"狭い金属隙間 h ほど毛細管圧力 ΔP が増大して水を吸い込むため、疎水性ゴムリップ（接触角 θ_c > 90°）で物理封止。"},nextGenInnovation:"2024–2026年プロ機では、レンズ装着時の回転摩擦（ゴリゴリ感）を抑えるため、EPDM表面に超薄膜のフッ素系低摩擦潤滑コートを施し、スムーズな着脱感と高い防滴気密性を両立させています。",specs:[{label:"シール断面構造",value:"二重リップ＋排水段差ラビリンス構造"},{label:"材質",value:"耐候・耐オゾン低摩擦コートEPDMゴム"},{label:"使用温度範囲",value:"−20 ℃ 〜 +60 ℃（氷点下弾性維持）"},{label:"保護対象",value:"ミラーボックス・シャッター・CMOSセンサー室"}],diagramType:"mount_gasket"},"mount-leaf-springs":{title:"4枚爪 予圧バヨネット板バネ（軸方向バックラッシュ除去リング）",subtitle:"4-Leaf Pre-Tensioned Spring-Steel Bayonet Clamping Ring",category:"マウント層 M04 — レンズ密着圧着・ミクロン級ガタゼロ保持",plainAnalogy:"レンズをカチッとひねって付けた瞬間、裏側からレンズの爪を「グイッと強く引き寄せて固定する4枚の金属バネ」。これがあるからこそ、重いレンズを付けてもグラつかず、毎回ピタッと同じ位置にピントが合います。",summary:"バヨネット爪のすぐ裏側に配置されたリン青銅／ばね用ステンレス鋼（SUS301-CSP）製の一体波型板バネリング。レンズ側のバヨネット爪が回転進入すると4か所の弓形アーチ板バネが弾性変形し、約25〜40Nの均一な軸方向引張力（予圧）でレンズフランジ面をボディ側ステンレス基準面へ隙間なく圧着します。",opticsAndPhysics:["軸方向バックラッシュ（遊び）の完全ゼロ化：金属爪同士の挿入には必ずクリアランス（隙間）が必要ですが、板バネが常に一方向（ボディ後方 −Z）へ引き寄せることでフランジ面同士の接触ガタを0μmにします。","4点均等ばね定数による片ボケ防止：3〜4か所の板バネ荷重が均等でないとレンズ光軸がわずかに傾きます（チルト片ボケ）。精密プレス＋熱処理時効硬化により全周のバネ荷重バラつきを±5%以内に抑えています。","絶妙な装着トルク感の演出：板バネの曲面プロフィール（摺動ランプ角）と表面潤滑処理により、軽すぎず重すぎないプロ機特有の「ヌルッと締まってカチッと止まる」上質な装着フィーリングを生みます。"],formula:{expression:"F_clamp = Σ ( k_leaf · δ_i ) ≈ 32 N   (Z軸クリアランス ⇒ 0 μm)",description:"4枚の板バネ剛性 k_leaf とたわみ量 δ の合力により、レンズ基準面をボディ側フランジ面へ強力・均一に密着固定。"},nextGenInnovation:"大口径55mm・重量級F1.2レンズ時代に対応するため、最新世代では従来の薄板3点バネから、より板厚・ばね定数を高めた高疲労強度4点対称バヨネット板バネ（または強化ウェーブスプリング）へ進化し、動画用フォーカスギア駆動時のレンズ微動まで抑え込みます。",specs:[{label:"材質",value:"ばね用高強度リン青銅 / SUS301-CSP"},{label:"押さえ爪数",value:"4点対称アーチ型リーフスプリング"},{label:"発生軸方向圧着力",value:"約 28 〜 40 N（均等4点分布）"},{label:"疲労寿命",value:"100,000 回着脱後 荷重低下 < 3%"}],diagramType:"mount_leaf_springs"},"mount-calib-shims":{title:"サブミクロン・フランジバック調整用 精密シムワッシャー群",subtitle:"Sub-Micron Flange Focal Distance Calibration Shim Set (0.01 / 0.025 / 0.05mm)",category:"マウント層 M05 — 工場光学キャリブレーション・平行度＆焦点深度補正",plainAnalogy:"テーブルのガタつきを薄い紙を挟んで直すように、カメラ工場のレーザー測定器で測りながら「0.01ミリ（10ミクロン）単位の極薄金属シート」を挟み込んで、レンズとセンサーの距離と水平を完璧にそろえる職人技のパーツです。",summary:"ステンレスフランジとマグネシウムマウントボックスの間に挟み込まれるレーザー精密加工シムリング群（厚さ 0.010mm / 0.025mm / 0.050mm の色分け高精度箔）。組立最終工程でレーザーオートコリメーター計測を行いながら最適なシム厚を組み合わせ、フランジバック絶対距離とイメージセンサーに対する平行度（ティルト < 0.005°）をミクロン単位で追い込みます。",opticsAndPhysics:["焦点深度（Depth of Focus）とミクロン公差：5000万〜6000万画素フルサイズセンサー（画素ピッチ約3.7μm）でF1.2開放撮影を行うと、センサー側の許容焦点深度 Δz_DOF はわずか ±9μm 程度しかありません。わずかなフランジバック誤差でも無限遠が出ない・片ボケする原因になります。","光学ガラス（OLPF/カバーガラス）による光路長シフト補正：センサー前のカバーガラス・IRカットフィルター（屈折率 n ≈ 1.52）を光が通ると像面が Δz = d(1 − 1/n) だけ後方へ伸びるため、シム調整で機械的距離と光学的結像面を完全一致させます。","3点〜6点独立シムによるティルト補正：リング全面シムだけでなく部分セクターシムを使い分けることで、上下左右のわずかな傾き（センサー面との非平行）もサブアーク分レベルまで矯正します。"],formula:{expression:"Δz_DOF = ± 2 · N · c   (F1.2, c = 3.7 μm ⇒ 許容焦点深度 ± 8.9 μm!)",description:"高画素＋大口径F1.2における極薄のセンサー側焦点深度。これを満たすため10μm単位の工場精密シム調整が不可欠。"},nextGenInnovation:"最新世代のスマート工場では、自動光学干渉計でフランジ全面の3次元平面度とセンサーIBIS中立面を同時計測し、AIが最適なシム厚み組み合わせを0.005mm刻みで自動選定して全数個体キャリブレーションを行います。",specs:[{label:"シム厚みラインナップ",value:"0.010 mm (銀) / 0.025 mm (琥珀) / 0.050 mm (青)"},{label:"フランジバック精度",value:"設計値 ± 5 〜 10 μm 以内"},{label:"センサー平行度(ティルト)",value:"< 0.005°（30秒角以内）"},{label:"加工法",value:"無応力フォトエッチング＆UVレーザー精密切断"}],diagramType:"mount_shims"},"mount-lock-pin":{title:"硬化鋼レンズロックピン・復帰スプリング ＆ 取り外しボタン機構",subtitle:"Hardened Steel Lens Lock Pin, Return Spring & Ergonomic Release Linkage",category:"マウント層 M06 — フェイルセーフ回転脱落防止・ワンタッチ解除メカ",plainAnalogy:"レンズを回して「カチッ！」と音がする正体がこの金属ピン。バネの力でピンがレンズの穴へ飛び出してカギをかけ、横の解除ボタンを押したときだけピンが引っ込んで安全にレンズを外せます。",summary:"レンズがバヨネット終端まで回転した瞬間にレンズ側フランジのロック穴へ自動嵌合し、回転脱落を物理的に阻止する硬化ステンレス製ロックピン機構。前面右脇のレンズ取り外しボタン、防水Oリング、支点ロッカーレバー、およびステンレス復帰コイルバネで構成される完全機械式フェイルセーフロックです。",opticsAndPhysics:["傾斜カム面による自動ラッチ：ピン先端の片側には精密なテーパー面が設けられており、レンズを回転装着する際はレンズフランジがピンを自動で押し込み、終端のロック穴へ達した瞬間に復帰スプリング力で「カチッ」と飛び出します。","ゼロ回転遊び（テーパー嵌合）設計：レンズとカメラの高速通信接点が回転ズレで接触不良を起こしたり、動画用フォローフォーカスギアの反力でレンズがガタついたりしないよう、ピン径と穴径をμm級の精密はめあい公差で管理しています。","防水Oリング付き解除ボタン：ボディ前面の露出可動部であるレンズ取り外しボタン軸にも極小EPDM Oリングを装備し、雨天でのレンズ交換操作時にも水滴の侵入を許しません。"],formula:{expression:"τ_unlock = μ · F_preload · r_mount   (ロックピン嵌合時は機械的せん断耐力 > 500 N)",description:"解除ボタンを押さない限り硬化鋼ピンのせん断強度が回転方向を完全ロックし、高価な大口径レンズの落下事故を防止。"},nextGenInnovation:"近年の動画兼用フラッグシップやシネマ運用では、重いシネレンズやフォローフォーカス駆動時の微細な回転ガタをゼロにするため、ロックピンの表面DLC（ダイヤモンドライクカーボン）硬化処理と高精度ガイドブッシュが採用されています。",specs:[{label:"ロックピン材質",value:"焼入れステンレス鋼（HRC55+ / DLC表面硬化）"},{label:"解除機構",value:"前面プッシュボタン ＋ ステンレス・ロッカーレバー"},{label:"付勢スプリング",value:"耐食SUS304 精密圧縮コイルバネ（約 4.5 N）"},{label:"防塵防滴",value:"ボタン摺動軸 EPDM Oリング封止"}],diagramType:"mount_lock_pin"},"mount-contact-pins":{title:"12ピン金めっきスプリング式ポゴ接点ブロック（超高速通信端子）",subtitle:"12-Pin Gold-Plated Spring-Loaded Pogo Contact Block (High-Speed Bus)",category:"マウント層 M07 — ボディ・レンズ間12接点 超高速双方向通信＆大電力供給",plainAnalogy:"カメラとレンズが毎秒何百回もおしゃべりするための「12本の金色のバネ付き端子」。AFモーターや手ブレ補正を動かす電気を送りながら、「いま何mmでピントはどこ！」という大量データを一瞬でやり取りします。",summary:"大口径55mmマウント下部の内周円弧に沿って配置されたガラス繊維強化PPS絶縁ブロックと、12本の独立スプリング内蔵・厚付け金めっきポゴプランジャー接点群。従来の8ピン一眼レフマウントから11〜12ピンへ拡張され、大電流モーター駆動電力と超高速リアルタイム双方向シリアル通信（AF・手ブレ補正協調・光学補正データ）を同時伝送します。",opticsAndPhysics:["12ピン機能分離アーキテクチャ：大電流のAFリニアモーター/絞り駆動電源（V_BAT / V_MOT）・ロジック電源（VDD）・専用高速双方向SPI/UARTデータ線（複数系統）・レンズ装着検知ピン・信号GND／パワーGNDを完全分離し、モーター駆動ノイズが通信データに乗るのを防ぎます。","金めっき（Au over Ni）＋低接触抵抗ベリリウム銅バネ：表面酸化を完全に防ぐ硬質金めっきと、振動下でも接触圧（約0.6–0.9N/ピン）を保つ内蔵マイクロコイルバネにより、接触抵抗を20mΩ以下に維持します。","シーケンス接触（GND先行・検知ピン最後尾）：レンズ回転装着時にまずGNDが繋がって静電気を逃がし、全ピンが確実に乗った最終位置で「レンズ装着検知ピン」がオンになることで、活線挿抜（ホットスワップ）時のショートやデータ破損を防止します。"],formula:{expression:"R_contact < 20 mΩ   ＆   f_sync(OIS + IBIS) ≥ 1,000 Hz（協調8.5段手ブレ補正）",description:"旧世代比最大40倍級の通信帯域により、ボディ5軸IBISとレンズ光学ISが毎秒1,000回以上ジャイロ情報をリアルタイム同期。"},nextGenInnovation:"Canon RF（12ピン）やNikon Z（11ピン）に代表される最新通信プロトコルでは、レンズ内蔵ROMの収差・周辺光量・フォーカスブリージング補正データを瞬時にボディISPへ転送し、120コマ/秒連写中もリアルタイムDLO（デジタルレンズオプティマイザ）と動画ブリージング補正を実行します。",specs:[{label:"接点数 / 表面処理",value:"12ピン独立ポゴプランジャー / 硬質金めっき (Au/Ni)"},{label:"通信用途",value:"超高速AF同期・OIS×IBIS協調・DLO光学補正・電子絞り"},{label:"許容供給電力",value:"デュアルVCM/リニアモーター対応 ピーク 3.0 A超"},{label:"絶縁ホルダー",value:"高耐熱・低吸湿 ガラス繊維強化PPS樹脂"}],diagramType:"mount_contacts"},"mount-contact-pcb":{title:"マウント電子接点インターフェース基板・ESD保護アレイ＆シールドFPC",subtitle:"Lens Interface Rigid-Flex PCB, ±15kV ESD TVS Array & Shielded FPC",category:"マウント層 M08 — 静電気サージ防護・電源スイッチ・メイン基板高速結線",plainAnalogy:"12本の金色ピンのすぐ裏側にある「雷ガード付きの専用中継ボード」。冬場のレンズ交換でバチッと静電気が起きても、この保護チップが一瞬で電気を逃がして、カメラの心臓（4nm頭脳チップ）を守り抜きます。",summary:"12本のポゴピン背面に直結する円弧状リジッドフレキインターフェース基板。超低容量12ch ESD（静電気放電）TVSダイオードアレイ、大電流レンズ電源制御MOSFET、高周波EMIノイズ除去フェライトビーズを搭載し、黒色EMIシールド付きポリイミドFPCケーブルで背面のメイン基板（サーボMCU＆4nm ISP）へ直結します。",opticsAndPhysics:["±15kV ESD（静電気放電）ナノ秒クランプ保護：屋外でのレンズ交換時は指先や帯電したレンズ鏡筒から数千〜15,000Vの静電気スパークがポゴピンへ飛び込む危険があります。応答速度1ナノ秒未満のTVSダイオードがサージ電流を瞬時にマグネシウムシャーシGNDへ逃がします。","過電流保護（OCP）＆ソフトスタート電源スイッチ：レンズ装着直後の突入電流や万一の端子ショートをハイサイドMOSFETがマイクロ秒単位で検知・遮断し、カメラ本体電源の電圧降下（シャットダウン）を防ぎます。","EMIシールドFPCによるセンサーノイズ遮断：すぐ後ろを走る高感度イメージセンサー（SLVS-EC）へ高速レンズ通信クロックが飛び込まないよう、FPC全面を導電シールド膜で包んでマウント下端からメイン基板へ最短配線しています。"],formula:{expression:"t_clamp < 1 ns  (IEC 61000-4-2 ±15 kV Air / ±8 kV Contact ESD保護)",description:"静電気サージが4nmメインISPやサーボMCUへ到達する前に、接点直下のTVSアレイが安全電圧へクランプ。"},nextGenInnovation:"最新の動画・電動ズームレンズ（PZ）やデュアルリニアモーター（VCM/XDリニア）の大電力化に合わせ、接点直近の低ESRセラミックコンデンサバンクと低オン抵抗（<15mΩ）電源スイッチICを搭載し、瞬間的なAF急加速電流にも電圧変動ゼロで応答します。",specs:[{label:"ESD静電気保護",value:"12ch 超低容量TVSダイオード（±15 kV IEC準拠）"},{label:"レンズ電源制御",value:"過電流保護・ソフトスタート内蔵ハイサイドMOSFET"},{label:"ノイズ対策",value:"全ラインGHz帯フェライトビーズ ＋ EMIシールドFPC"},{label:"接続先",value:"メイン基板 2,000 Hz サーボMCU ＆ 4nm ISP直結"}],diagramType:"mount_contact_pcb"},"mount-anti-refl-baffle":{title:"多段ナイフエッジ内面遮光バッフル（超低反射ライトトラップ）",subtitle:"Stepped Multi-Knife-Edge Anti-Reflection Internal Light-Trap Ring",category:"マウント層 M09 — 斜入射迷光吸収・逆光フレア＆ゴースト根絶",plainAnalogy:"マウントの筒の内側に刻まれた「光を吸い込む真っ黒なギザギザ階段」。太陽などの強烈な斜めの光が壁に当たっても、鏡のように跳ね返らせず、ギザギザの谷間に閉じ込めて真っ暗に消し去ります。",summary:"大口径55mmマウント筒の内壁全周に配置された5段同心円状の鋭利なナイフエッジ遮光バッフルリング。反射率0.8%未満の超低反射マットブラック光学塗装（または微細植毛・微細凹凸表面）と鋸歯状溝形状により、レンズから高角度で入射して壁面に当たる有害な斜入射迷光を多重反射減衰させて完全に吸収します。",opticsAndPhysics:["大口径＋ショートフランジバック特有の迷光課題：内径55mmの巨大な筒は大量の光を取り込める反面、画角外の強い太陽光やステージ照明が内壁に浅い角度（グレージング角）で当たると強い鏡面反射を起こしやすくなります。","ナイフエッジ光トラップの幾何光学：鋭角のエッジ先端（厚さ<0.15mm）と深いV字溝の連続構造により、内壁へ侵入した不要光は溝の中で3〜5回反射を繰り返し、センサー側へ戻る前にエネルギーを100万分の1以下へ消滅させます。","超低反射マット表面（反射率 ρ < 0.8%）：塗装内部に微細な多孔質シリカ／カーボン粒子を分散させ、可視光〜近赤外域まで広い入射角でランバート拡散吸収を実現しています。"],formula:{expression:"I_stray = I_0 · ρ^N   (ρ = 0.008, N = 3 回反射 ⇒ 残存迷光 5 × 10⁻⁷!)",description:"ナイフエッジV溝での多重反射による指数関数的減衰。逆光や夜景の点光源でも「黒浮き」のないヌケの良い描写を守る。"},nextGenInnovation:"最新フラッグシップ機では、単純な黒塗装ではなく、金型自体に微細なレーザーシボ（光吸収マイクロテクスチャ）を転写した成形バッフルと超低反射植毛を組み合わせ、経年劣化で粉落ち（センサーダスト原因）しない恒久的な黒さを達成しています。",specs:[{label:"遮光構造",value:"5段同心ナイフエッジ鋸歯状ライトトラップ"},{label:"表面反射率 (ρ)",value:"< 0.8%（400–700 nm 広帯域超低反射マット）"},{label:"粉落ち対策",value:"レーザー微細シボ一体成形（無発塵光学樹脂）"},{label:"効果",value:"逆光コントラスト維持・内壁ゴースト完全排除"}],diagramType:"mount_baffle"},"mount-rect-flare-mask":{title:"36×24mm フルサイズ矩形フレアカッター（イメージサークル遮光マスク）",subtitle:"Full-Frame 36×24mm Rectangular Flare-Cut Aperture Baffle Mask",category:"マウント層 M10 — 円形光束→3:2矩形整形・余剰光完全カット",plainAnalogy:"丸いレンズを通ってきた「丸い光の束」を、センサーと同じ長方形（3:2）にピシッと切り抜く「真っ黒な額縁」。写真に写らない上下左右のムダな光がカメラ内部で反射して白っぽくなるのを防ぎます。",summary:"円形の55mmマウント筒の最奥部（シャッターユニットの直前）に精密配置された長方形開口のフレアカッターマスク。レンズが投影する直径43.3mm以上の「丸いイメージサークル」のうち、36×24mmフルサイズセンサーの外側へはみ出す約38%の余剰光束を物理的にカットし、シャッター室やIBIS周辺での二次反射（フレア・コントラスト低下）を防ぎます。",opticsAndPhysics:["丸いイメージサークルと長方形センサーの面積差：直径43.3mmの円の面積は約1,472 mm²ですが、36×24mmセンサー面積は864 mm²。残りの約608 mm²（約41%！）は撮影に不要な余剰光であり、放置するとボディ内で乱反射して暗部のコントラストを濁らせます。","F0.95〜F1.2広角光束のケラレ防止幾何設計：マスク開口サイズ（約38.6×26.2mm）と面取りエッジ角度は、最短フランジバック16–20mm・開放F0.95の極めて太い周辺光線円錐を一切ケラレさせないギリギリの精密計算で設計されています。","シャッター幕・センサー保護への気流制御：レンズ交換やズーム伸縮（ポンプ作用）で発生する急激な空気流が繊細なカーボンシャッター幕を直撃するのを和らげる整流バッフルの役割も兼ねます。"],formula:{expression:"A_excess = π(d/2)² − (36 × 24) ≈ 608 mm²  (余剰41%の不要光を矩形遮断!)",description:"フルサイズ対角 d = 43.27mm の円形イメージサークルから、センサー外の不要光束をシャッター直前で精密トリミング。"},nextGenInnovation:"高ダイナミックレンジ（16ストップ級）の最新センサーでは、画面外の強烈なハイライト（太陽光やスタジオストロボ）による微弱な内部迷光もシャドウ持ち上げ時に浮かび上がるため、矩形フレアカッターの端面エッジを刃物のように薄く斜め成形してエッジ回折反射まで徹底排除しています。",specs:[{label:"開口形状",value:"38.6 × 26.2 mm テーパーナイフエッジ矩形開口"},{label:"遮断余剰光比率",value:"イメージサークル外の不要光 約 41% を除去"},{label:"対応最小開放F値",value:"F0.95 / F1.2 周辺光束ケラレゼロ設計"},{label:"配置位置",value:"フォーカルプレーンシャッター直前（0.8 mmクリアランス）"}],diagramType:"mount_flare_mask"},"mount-mg-throat":{title:"高剛性チクソモールディング マグネシウム合金マウントボックス",subtitle:"High-Rigidity Thixomolded AZ91D Magnesium-Aluminum Structural Mount Box",category:"マウント層 M11 — フロント構造バルクヘッド・応力分散リブ骨格",plainAnalogy:"スポーツカーの頑丈な骨格（モノコック）と同じ役割を果たす「マグネシウム合金の分厚い土台」。超望遠レンズの重さをガッチリ受け止め、ボディ全体へ分散させることで、どんな過酷な現場でもビクともしません。",summary:"ステンレスフランジ、6本ボルト、12ピン電子接点、レンズロック機構、遮光バッフルのすべてを1つに統合支持するカメラ最前面の構造バルクヘッド（AZ91Dマグネシウム合金チクソモールディング成形＋5軸CNC精密追加工）。周囲の放射状補強リブと鋼製インサートめねじにより、軽量さと圧倒的なねじり・曲げ剛性を両立します。",opticsAndPhysics:["比剛性・振動減衰に優れるマグネシウム合金（AZ91D）：比重1.81（アルミの2/3、鉄の1/4）でありながら高い剛性を持ち、さらにアルミの数倍の内部振動減衰能を持つため、シャッター衝撃やAFモーター微振動を素早く吸収します。","線膨張係数と精密CNC基準面：ステンレスフランジとの締結座面・基準位置決めダウエル穴・背面シャッター取付面を同一クランプで5軸CNC加工し、温度変化（−20〜+50℃）でも光軸ズレを起こさない寸法安定性を確保します。","空間の極限活用：内径55mmという巨大な円筒を限られたカメラ全高（約68mm）に収めるため、下部に12ピン接点ポケット、右側にロックピンレバー室を極限肉厚で立体統合しています。"],formula:{expression:"δ_bend = (M · L²) / (3 E · I)   (放射状ガセットリブで断面二次モーメント I を最大化)",description:"大口径円筒＋放射状補強リブ構造により断面二次モーメント I を飛躍的に高め、重量級レンズ装着時のたわみ δ を数μm以下へ抑制。"},nextGenInnovation:"2024–2026年プロ機では、マウントボックス単体ではなく前面ボディ骨格・三脚座ブロック・EVF取付座までを継ぎ目なく一体化した高剛性モノコックマグネシウムシャーシ構造が標準となり、3kg超レンズの衝撃試験に耐える信頼性を実現しています。",specs:[{label:"材質 / 成形法",value:"AZ91Dマグネシウム合金（チクソ成形＋5軸CNC）"},{label:"ボルト締結補強",value:"6か所 高強度ステンレス・ヘリサートめねじ内蔵"},{label:"寸法公差",value:"基準ピン位置精度 ± 5 μm / 座面直角度 < 0.01°"},{label:"構造機能",value:"片持ち荷重支持・ロック機構＆接点ブロック収容"}],diagramType:"mount_mg_throat"},"mount-chassis-interface":{title:"フロント骨格結合フランジ・三脚荷重伝達ガセット＆防塵ガスケット",subtitle:"Front Structural Chassis Interface Flange, Load-Transfer Struts & Dust Seal",category:"マウント層 M12 — シャッター/IBIS/三脚座への荷重伝達＆気密接合",plainAnalogy:"レンズマウントとカメラ本体の背骨をガッチリつなぐ「耐震ジョイント兼ホコリ止めパッキン」。重いレンズの力を下の三脚ネジ穴へまっすぐ逃がし、シャッターやセンサーが歪まないように守ります。",summary:"マグネシウムマウントボックスとカメラ内部骨格（シャッター前フレーム・センサーIBIS支持フレーム・底部三脚座ブロック）を結合する最後端インターフェース構造。下部左右の三角ガセット（荷重伝達ストラット）、4本の位置決めノックピン、および全周EPDM防塵ガスケットにより、レンズからの外力を光学コアから切り離してボディ骨格へバイパス逃がしします。",opticsAndPhysics:["ロードパス分離設計（光学コア非歪み構造）：三脚にカメラを固定した状態で大口径レンズを支える際、マウントからの曲げ応力が繊細なシャッターや5軸IBISフローティング機構へ直接伝わると動作不良を招きます。下部ガセットが荷重をダイレクトに底面シャーシ＆三脚座へ逃がします。","精密ダウエルピンによる同軸再現性：修理や分解再組立を行ってもマウント中心とセンサー中心の偏心・回転ズレが起きないよう、精密リーマ穴と焼き入れ位置決めピンでミクロン再現性を保証します。","センサー室気密ダストシール：シャッターユニット前面との接合面全周にEPDMガスケットを挟み込み、ボディ内部の機械系（ダイヤルやカードスロット側）からの微細な塵がセンサー面へ回り込むのを遮断します。"],formula:{expression:"σ_IBIS → 0   (荷重バイパス：レンズ荷重 → マウント → 下部ガセット → 三脚座)",description:"大口径レンズの曲げ応力をシャッター・センサー機構へ流さず、強固な下部ロードパス骨格へバイパス伝達する構造設計。"},nextGenInnovation:"最新世代のフルサイズミラーレスは、マウント最前面から背面マグネシウム骨格・底部三脚座までを「閉断面ボックス構造」で結合し、ボディを小型軽量化しつつ一眼レフ・フラッグシップを超えるねじり剛性を達成しています。",specs:[{label:"荷重伝達路",value:"下部ツイン三角ガセット（底面三脚座ブロック直結）"},{label:"位置決め精度",value:"4点焼き入れステンレス・ダウエルピン（±5 μm）"},{label:"防塵シール",value:"シャッター接合部 全周EPDM気密ガスケット"},{label:"結合先",value:"シャッター前フレーム ＆ 5軸IBIS剛体シャーシ"}],diagramType:"mount_chassis_if"}},s2=[0,60,120,180,240,300],xc=31.3,yc=[42,132,225,312],_c=ze.degToRad(-24),vc=30.8;function xi(i,e){const t=new on;t.absarc(0,0,i,0,Math.PI*2,!1);const n=new $t;return n.absarc(0,0,e,0,Math.PI*2,!0),t.holes.push(n),t}function Ki(i,e,t,n){const s=new on;return s.absarc(0,0,e,t,n,!1),s.absarc(0,0,i,n,t,!0),s.closePath(),s}function xn(i,e,t,n,s,o,r,a,l=.24){n.position.copy(s),gs(n,i);const{meshes:c,edges:h}=ms(n,a,26,l);return{id:i,subsystem:"mount",order:e,swatchColor:t,group:n,assembledPos:s,explodeOffset:o,integratedExplodeOffset:r,interactiveMeshes:c,edgeLines:h,explanation:i2[i]}}function o2(i){const e=[],t=i.clippingPlanes,n=s2.map(D=>{const R=ze.degToRad(D);return[Math.cos(R)*xc,Math.sin(R)*xc,1.55]}),s=Math.cos(_c)*vc,o=Math.sin(_c)*vc,r=new se;{const D=xi(34.4,27.5);Vn(D,[...n,[s,o,1.75]]);const R=new w(me(D,2.7,.22,.2,64),i.mountStainlessFlange);r.add(R);const b=new w(me(xi(35,33.4),1.3,.14,.14,64),i.mountStainlessFlange);b.position.z=-.65,r.add(b);for(const M of yc){const C=ze.degToRad(M-22),A=ze.degToRad(M+22),I=Ki(24.8,27.8,C,A),U=new w(me(I,1.45,.12,.12,24),i.mountStainlessFlange);U.position.z=.55,r.add(U)}const v=new w(new De(1.55,1.55,.35,24).rotateX(Math.PI/2),i.matteBlackAnodized);v.position.set(0,31.3,1.32);const y=new w(new De(1.22,1.22,.42,24).rotateX(Math.PI/2),i.mountRedIndexDot);y.position.set(0,31.3,1.38),y.userData.noEdges=!0,r.add(v,y)}e.push(xn("mount-flange-ring",1,"#cbd5e1",r,new _(0,0,30.6),new _(0,0,66),new _(0,0,188),t,.24));const a=new se;for(const[D,R]of n){const b=En(2.25,.72,6.2,i.stainlessMachined);b.position.set(D,R,.15),a.add(b);const v=new w(new De(1.22,1.22,2.4,16).rotateX(Math.PI/2),i.mountThreadLockBlue);v.position.set(D,R,-4.1),v.userData.noEdges=!0,a.add(v)}e.push(xn("mount-bolts-6x",2,"#0284c7",a,new _(0,0,32),new _(0,0,82),new _(0,0,206),t,.22));const l=new se;{const D=new w(me(xi(35.6,33.1),1.35,.16,.16,64),i.epdmGasket);l.add(D);for(const[R,b]of[[35.25,.65],[33.75,.58]]){const v=new w(new hn(R,.36,12,64),i.epdmGasket);v.position.z=b,v.userData.noEdges=!0,l.add(v)}}e.push(xn("mount-weather-gasket",3,"#374151",l,new _(0,0,29),new _(0,0,52),new _(0,0,174),t,.24));const c=new se;{const D=xi(30.4,27.6),R=new w(me(D,.52,.05,.05,56),i.mountSpringSteel);c.add(R);for(const b of yc){const v=ze.degToRad(b),y=new se;y.rotation.z=v;const M=[];for(let k=0;k<=14;k++){const B=k/14,O=ze.lerp(-.34,.34,B),X=26.2,J=Math.sin(B*Math.PI)*1.15;M.push(new _(Math.cos(O)*X,Math.sin(O)*X,J))}const C=new oi(M),A=new Yn(C,24,.42,8,!1);A.scale(1,1,.55);const I=new w(A,i.mountSpringSteel);I.userData.noEdges=!0,y.add(I);const U=new w(me(Ki(25.8,28,-.36,-.26),.5,.04,.04,10),i.mountSpringSteel);y.add(U),c.add(y)}}e.push(xn("mount-leaf-springs",4,"#d97706",c,new _(0,0,28),new _(0,0,40),new _(0,0,162),t,.24));const h=new se;{const D=[{z:.42,thick:.16,mat:i.stainlessMachined,tabAngleDeg:102},{z:0,thick:.22,mat:i.brassGear,tabAngleDeg:78},{z:-.46,thick:.28,mat:i.mountShimBlue,tabAngleDeg:146}];for(const R of D){const b=xi(33.5,28.6);Vn(b,n);const v=new w(me(b,R.thick,0,0,56),R.mat);v.position.z=R.z,h.add(v);const y=ze.degToRad(R.tabAngleDeg),M=new w(new G(3.6,2.2,R.thick),R.mat);M.position.set(Math.cos(y)*34.4,Math.sin(y)*34.4,R.z),M.rotation.z=y,h.add(M)}}e.push(xn("mount-calib-shims",5,"#2563eb",h,new _(0,0,27.1),new _(0,0,28),new _(0,0,150),t,.22));const u=new se,d=new se,f=new se;let g;{const D=new w(new De(2.2,2.2,5.4,24).rotateX(Math.PI/2),i.brassGear);D.position.set(s,o,-1),u.add(D),d.position.set(s,o,.8);const R=new w(new De(1.48,1.48,7.6,24).rotateX(Math.PI/2),i.stainlessMachined);R.position.z=.2;const b=new w(new De(1.05,1.48,1.2,24).rotateX(Math.PI/2),i.stainlessMachined);b.position.z=4.6;const v=new w(new De(2.1,2.1,.7,20).rotateX(Math.PI/2),i.matteBlackAnodized);v.position.z=-3.4,d.add(R,b,v),u.add(d);const y=new w(Jo(1.75,4.6,6,.24),i.stainlessMachined);y.position.set(s,o,-5.8),y.userData.noEdges=!0,u.add(y);const M=new w(new De(1.1,1.1,3.6,18),i.stainlessMachined);M.position.set(s+5.8,o,-3.6),u.add(M),g=new w(new G(12.2,3.2,1.15),i.linkArmSteel),g.position.set(s+5.6,o,-3.5),u.add(g);const C=s+11.2,A=o,I=new w(new De(4.6,5,2.2,28).rotateX(Math.PI/2),i.matteBlackAnodized);I.position.set(C,A,.4),u.add(I);const U=new w(new hn(3.85,.35,10,28),i.epdmGasket);U.position.set(C,A,1.35),U.userData.noEdges=!0,u.add(U),f.position.set(C,A,2.2);const k=new w(new De(3.5,3.7,2.6,28).rotateX(Math.PI/2),i.evfHousingMg),B=new w(new De(1.3,1.3,6,18).rotateX(Math.PI/2),i.stainlessMachined);B.position.z=-3.4;for(let O=-2;O<=2;O++){const X=new w(new G(4.4,.28,.28),i.matteBlackAnodized);X.position.set(0,O*.95,1.32),X.userData.noEdges=!0,f.add(X)}f.add(k,B),u.add(f)}e.push(xn("mount-lock-pin",6,"#ef4444",u,new _(0,0,27.2),new _(20,-4,46),new _(24,-4,170),t,.24));const x=new se;{const D=ze.degToRad(-128),R=ze.degToRad(-52),b=Ki(22.8,27.2,D,R),v=new w(me(b,3.6,.2,.2,36),i.mountPpsInsulator);x.add(v);for(const M of[D-.06,R+.06]){const C=Math.cos(M)*26.8,A=Math.sin(M)*26.8,I=new w(new De(2.1,2.1,1.4,16).rotateX(Math.PI/2),i.mountPpsInsulator);I.position.set(C,A,-.9);const U=En(.95,.45,1.8,i.stainlessMachined);U.position.set(C,A,-.2),x.add(I,U)}const y=12;for(let M=0;M<y;M++){const C=M/(y-1),A=ze.lerp(ze.degToRad(-123),ze.degToRad(-57),C),I=25,U=Math.cos(A)*I,k=Math.sin(A)*I,B=M===0?.35:M===y-1?-.25:0,O=new w(new De(.68,.68,4.4,16).rotateX(Math.PI/2),i.goldPlating);O.position.set(U,k,.1+B*.4),x.add(O);const X=new w(new Et(.66,14,10),i.goldPlating);X.position.set(U,k,2.3+B),X.userData.noEdges=!0,x.add(X);const J=new w(new De(.36,.36,1.6,10).rotateX(Math.PI/2),i.goldPlating);J.position.set(U,k,-2.5),J.userData.noEdges=!0,x.add(J)}}e.push(xn("mount-contact-pins",7,"#eab308",x,new _(0,0,26.4),new _(0,-18,36),new _(0,-18,158),t,.24));const m=new se;{const D=ze.degToRad(-127),R=ze.degToRad(-53),b=Ki(22.6,28.4,D,R),v=new w(me(b,1.15,.08,.08,36),i.hdiMainboardPcb);m.add(v);for(let U=0;U<12;U++){const k=ze.lerp(ze.degToRad(-123),ze.degToRad(-57),U/11),B=new w(new De(.65,.65,.16,12).rotateX(Math.PI/2),i.goldPlating);B.position.set(Math.cos(k)*25,Math.sin(k)*25,.62),B.userData.noEdges=!0,m.add(B)}for(const U of[-5.8,5.8]){const k=new w(new G(5.2,2.2,.78),i.icEpoxy);k.position.set(U,-25.2,-.92),k.rotation.z=U<0?-.22:.22,m.add(k)}const y=new w(new G(3.4,3,.9),i.icEpoxy);y.position.set(0,-25.6,-.96),m.add(y);for(const U of[-11.4,11.4]){const k=new w(new G(2.2,1.4,.85),i.tantalumCapYellow);k.position.set(U,-23,-.92),k.rotation.z=U<0?-.45:.45,m.add(k)}const M=new w(new G(10.8,5.4,.3),i.polyimideFpc);M.position.set(0,-29.8,-.4);const C=new w(new G(10.8,.3,14),i.polyimideFpc);C.position.set(0,-32.4,-7.2);const A=new w(new G(9.4,.36,10),i.emiShieldFilm);A.position.set(0,-32.4,-6.8);const I=new w(new G(10.2,.38,2),i.goldPlating);I.position.set(0,-32.4,-13.2),m.add(M,C,A,I)}e.push(xn("mount-contact-pcb",8,"#10b981",m,new _(0,0,23.2),new _(0,-24,18),new _(0,-24,140),t,.24));const p=new se;{const D=ze.degToRad(-46),R=ze.degToRad(226),b=Ki(26.1,27.6,D,R),v=new w(me(b,6.8,.08,.08,48),i.mountVelvetBaffle);p.add(v);for(let M=0;M<5;M++){const C=-2.6+M*1.3,A=Ki(24.9,26.25,D,R),I=new w(me(A,.42,.04,.14,48),i.mountVelvetBaffle);I.position.z=C,p.add(I)}const y=new w(me(xi(27.6,25.4),1.1,.06,.06,56),i.mountVelvetBaffle);y.position.z=-3,p.add(y)}e.push(xn("mount-anti-refl-baffle",9,"#18181b",p,new _(0,0,23.8),new _(0,0,16),new _(0,0,138),t,.26));const T=new se;{const D=new on;D.absarc(0,0,28.4,0,Math.PI*2,!1);const R=38.6,b=26.2,v=1.4,y=R/2,M=b/2,C=new $t;C.moveTo(-y+v,-M),C.lineTo(y-v,-M),C.absarc(y-v,-M+v,v,-Math.PI/2,0,!1),C.lineTo(y,M-v),C.absarc(y-v,M-v,v,0,Math.PI/2,!1),C.lineTo(-y+v,M),C.absarc(-y+v,M-v,v,Math.PI/2,Math.PI,!1),C.lineTo(-y,-M+v),C.absarc(-y+v,-M+v,v,Math.PI,Math.PI*1.5,!1),D.holes.push(C);const A=new w(me(D,1.4,.12,.25,48),i.mountVelvetBaffle);T.add(A);const I=new w(me(Je(42.2,29.8,2.2,38,25.6,1),1.1,.06,.12,24),i.matteBlackAnodized);I.position.z=.9,T.add(I);for(const U of[45,135,225,315]){const k=ze.degToRad(U),B=new w(new G(2.2,1.4,1.5),i.brassGear);B.position.set(Math.cos(k)*28,Math.sin(k)*28,0),B.rotation.z=k,T.add(B)}}e.push(xn("mount-rect-flare-mask",10,"#334155",T,new _(0,0,20.2),new _(0,0,-10),new _(0,0,116),t,.26));const E=new se;{const D=dt(80,68,11.5),R=new $t;R.absarc(0,0,27.8,0,Math.PI*2,!0),D.holes.push(R),Vn(D,n);const b=new w(me(D,6.2,.32,.28,48),i.mountMgBulkhead);E.add(b);const v=xi(35,27.8);Vn(v,n);const y=new w(me(v,2.2,.16,.16,56),i.magnesiumCast);y.position.z=3.2,E.add(y);for(const[C,A]of n){const I=new w(new De(2.15,2.15,5.2,18).rotateX(Math.PI/2),i.stainlessMachined);I.position.set(C,A,1.4),E.add(I)}for(const C of[25,50,130,155,205,230,310,335]){const A=ze.degToRad(C),I=new w(new G(8.5,2,4.6),i.mountMgBulkhead);I.position.set(Math.cos(A)*37.5,Math.sin(A)*33.2,.6),I.rotation.z=A,E.add(I)}const M=new w(new De(5.6,6,5.8,24).rotateX(Math.PI/2),i.mountMgBulkhead);M.position.set(s+11.2,o,1.2),E.add(M);for(const[C,A]of[[-34.5,28.5],[34.5,28.5],[-34.5,-28.5],[34.5,-28.5]]){const I=En(1.85,.6,2.4,i.stainlessMachined);I.position.set(C,A,3.3),E.add(I)}}e.push(xn("mount-mg-throat",11,"#64748b",E,new _(0,0,23.4),new _(0,0,2),new _(0,0,126),t,.24));const S=new se;{const D=Je(78,62,6.4,45,33,3.2),R=new w(me(D,1.5,.14,.14,28),i.magnesiumCast);S.add(R);const b=new w(me(Je(74.4,58.4,5.2,70.6,54.6,4),.72,.08,.08,28),i.epdmGasket);b.position.z=-.9,S.add(b);for(const v of[-1,1]){const y=new w(new G(14,8.6,4.8),i.mountMgBulkhead);y.position.set(v*24.5,-31.8,1.2),S.add(y);const M=new w(new G(16,2,6.2),i.stainlessMachined);M.position.set(v*24.5,-35.8,1.2),S.add(M)}for(const[v,y]of[[-33,24],[33,24],[-33,-24],[33,-24]]){const M=new w(new De(1.15,1.15,4.2,16).rotateX(Math.PI/2),i.stainlessMachined);M.position.set(v,y,1.6),S.add(M)}}return e.push(xn("mount-chassis-interface",12,"#475569",S,new _(0,0,18.6),new _(0,0,-22),new _(0,0,106),t,.24)),{parts:e,rig:{lockPinPlunger:d,releaseButtonGroup:f,rockerLever:g,applyDynamics:(D,R)=>{if(!R){d.position.z=.8,f.position.z=2.2,g.rotation.y=0;return}const b=D*.28%1;let v=0;if(b>.15&&b<.48){const y=(b-.15)/.33;v=Math.sin(y*Math.PI)}f.position.z=2.2-v*1.9,d.position.z=.8-v*2.8,g.rotation.y=v*.18}}}}function r2(i){const e=new se;e.visible=!1;const t=new se;t.visible=!1;const n=new se;{const M=[new _(-18,-12,0),new _(18,-12,0),new _(18,12,0),new _(-18,12,0),new _(-18,-12,0)],C=new wt(new Ke().setFromPoints(M),new It({color:165063,transparent:!0,opacity:.78,clippingPlanes:i})),A=new w(new Tn(36,24),new bt({color:959977,transparent:!0,opacity:.1,side:Rt,depthWrite:!1,clippingPlanes:i})),I=[];for(let k=0;k<=48;k++){const B=k/48*Math.PI*2;I.push(new _(Math.cos(B)*21.64,Math.sin(B)*21.64,0))}const U=new wt(new Ke().setFromPoints(I),new _n({color:6514417,dashSize:1.8,gapSize:1.4,transparent:!0,opacity:.55,clippingPlanes:i}));U.computeLineDistances(),n.add(A,C,U)}e.add(n);const s=[{color:165063,sx:-16.2,sy:10.6,rx:-22.2,ry:14.2},{color:959977,sx:16.2,sy:10.6,rx:22.2,ry:14.2},{color:6514417,sx:-16.2,sy:-10.6,rx:-22.2,ry:-14.2},{color:440020,sx:16.2,sy:-10.6,rx:22.2,ry:-14.2},{color:16096779,sx:0,sy:0,rx:0,ry:0},{color:165063,sx:0,sy:11,rx:0,ry:22.5},{color:440020,sx:0,sy:-11,rx:0,ry:-21}],o=[],r=[];for(const M of s){const C=[new _,new _,new _,new _],A=new wt(new Ke().setFromPoints(C),new It({color:M.color,transparent:!0,opacity:.78,clippingPlanes:i}));e.add(A),o.push(A),r.push(C)}const a=[{startX:-14,startY:22,hitX:0,hitY:25},{startX:14,startY:22,hitX:22,hitY:16.5}],l=[],c=[];for(let M=0;M<a.length;M++){const C=[new _,new _],A=new wt(new Ke().setFromPoints(C),new _n({color:15357964,dashSize:2,gapSize:1.4,transparent:!0,opacity:.82,clippingPlanes:i})),I=new w(new Et(.68,12,10),new bt({color:14427686,clippingPlanes:i}));e.add(A,I),l.push(A),c.push(I)}const h=[],u=[],d=[1,4,7,10],f=[1096065,366185,16096779,1096065];d.forEach((M,C)=>{const A=[new _,new _,new _,new _],I=new wt(new Ke().setFromPoints(A),new It({color:f[C],transparent:!0,opacity:.85,clippingPlanes:i}));e.add(I),h.push(I),u.push(A)});const g=[],x=new Et(.52,12,10);s.forEach((M,C)=>{const A=new bt({color:M.color,clippingPlanes:i});for(let I=0;I<2;I++){const U=new w(x,A);e.add(U),g.push({mesh:U,pathIndex:C,phase:I*.5+C*.13,speed:.44})}});const m=[],p=new Et(.48,12,10);f.forEach((M,C)=>{const A=new bt({color:M,clippingPlanes:i}),I=new w(p,A);e.add(I),m.push({mesh:I,pathIndex:C,phase:C*.24,speed:.68})});const T=[];for(let M=0;M<=28;M++){const C=ze.degToRad(30+M/28*60);T.push(new _(Math.cos(C)*36.8,Math.sin(C)*36.8,0))}const E=new wt(new Ke().setFromPoints(T),new It({color:14427686,transparent:!0,opacity:.78,clippingPlanes:i}));e.add(E);const S=new _n({color:6583435,dashSize:2.2,gapSize:1.6,transparent:!0,opacity:.42,clippingPlanes:i}),z=new _n({color:15381256,dashSize:1.8,gapSize:1.4,transparent:!0,opacity:.52,clippingPlanes:i}),D=[[-31.3,27],[31.3,27],[-31.3,-27],[31.3,-27]],R=[];for(const[M,C]of D){const A=new wt(new Ke().setFromPoints([new _(M,C,32),new _(M,C,18)]),S);A.computeLineDistances(),t.add(A),R.push(A)}const b=new wt(new Ke().setFromPoints([new _,new _]),z);t.add(b);const v=(M,C,A)=>{const I=M.length-1,U=ze.clamp(C,0,.9999)*I,k=Math.floor(U);A.lerpVectors(M[k],M[k+1],U-k)},y=(M,C)=>M.find(A=>A.id===C);return{overlayGroup:e,explodeGuides:t,setVisible:M=>{e.visible=M},update:(M,C,A,I)=>{if(!C||!e.visible)return;const U=y(A,"mount-flange-ring"),k=y(A,"mount-anti-refl-baffle"),B=y(A,"mount-rect-flare-mask"),O=y(A,"mount-contact-pins"),X=y(A,"mount-contact-pcb"),J=y(A,"mount-chassis-interface");if(!U||!k||!B||!O||!X||!J)return;const ce=U.group.position.z,pe=k.group.position.z,Oe=B.group.position.z,q=I?0:J.group.position.z-16;n.visible=!I,n.position.set(0,0,q),E.position.z=ce+3.2,E.rotation.z=Math.sin(M*1.6)*.22;const oe=ce+22;s.forEach((ne,ve)=>{const Z=r[ve];Z[0].set(ne.rx*1.08,ne.ry*1.08,oe),Z[1].set(ne.rx,ne.ry,ce),Z[2].set(ne.sx*1.08,ne.sy*1.08,Oe),Z[3].set(ne.sx,ne.sy,q),o[ve].geometry.setFromPoints(Z)}),a.forEach((ne,ve)=>{const Z=[new _(ne.startX,ne.startY,ce+18),new _(ne.hitX,ne.hitY,pe)];l[ve].geometry.setFromPoints(Z),l[ve].computeLineDistances(),c[ve].position.copy(Z[1])});const ye=O.group.position,le=X.group.position;d.forEach((ne,ve)=>{const Z=ze.lerp(ze.degToRad(-123),ze.degToRad(-57),ne/11),Ne=Math.cos(Z)*25,re=Math.sin(Z)*25,te=u[ve];te[0].set(ye.x+Ne,ye.y+re,ye.z+4.5),te[1].set(ye.x+Ne,ye.y+re,ye.z-2.2),te[2].set(le.x+Ne,le.y+re,le.z-1),te[3].set(le.x+(ve-1.5)*2.2,le.y-32.4,le.z-13.5),h[ve].geometry.setFromPoints(te)});for(const ne of g){const ve=(M*ne.speed+ne.phase)%1;v(r[ne.pathIndex],ve,ne.mesh.position)}for(const ne of m){const ve=(M*ne.speed+ne.phase)%1,Z=ne.pathIndex%2===0?ve:1-ve;v(u[ne.pathIndex],Z,ne.mesh.position)}},updateGuides:(M,C,A)=>{const I=C&&M>.04;if(t.visible=I,!I)return;const U=y(A,"mount-bolts-6x"),k=y(A,"mount-chassis-interface"),B=y(A,"mount-contact-pins"),O=y(A,"mount-contact-pcb");if(!U||!k||!B||!O)return;const X=U.group.position.z+1,J=k.group.position.z-1.5;D.forEach(([ce,pe],Oe)=>{R[Oe].geometry.setFromPoints([new _(ce,pe,X),new _(ce,pe,J)]),R[Oe].computeLineDistances()}),b.geometry.setFromPoints([new _(0,B.group.position.y-25,B.group.position.z),new _(0,O.group.position.y-25,O.group.position.z)]),b.computeLineDistances()}}}function a2(i){const e=new se,{parts:t,rig:n}=o2(i);for(const r of t)e.add(r.group);const s=r2(i.clippingPlanes);e.add(s.overlayGroup,s.explodeGuides);const o=(r,a)=>{for(const l of t){const c=a&&l.integratedExplodeOffset?l.integratedExplodeOffset:l.explodeOffset;l.group.position.set(l.assembledPos.x+c.x*r,l.assembledPos.y+c.y*r,l.assembledPos.z+c.z*r)}};return{rootGroup:e,parts:t,updateAnimation:(r,a,l,c,h)=>{o(l,h),n.applyDynamics(r,c),s.update(r,c,t,h)},setPhysicsVisible:r=>{s.setVisible(r)},updateExplodeGuides:(r,a)=>{s.updateGuides(r,a,t)}}}class l2{container;renderer;scene;camera;controls;materials;mountAssembly;shutterAssembly;sensorAssembly;mainboardAssembly;evfAssembly;microAssembly;allParts;callbacks;clippingPlane;raycaster=new Eu;pointer=new ue;pointerDownPos=new ue;mode="mount";renderMode="solid";sectionAxis="off";sectionValue=.5;targetExplode=0;currentExplode=0;physicsActive=!1;selectedPartId=null;hoveredPartId=null;isolatedPartId=null;hiddenPartIds=new Set;camAnimActive=!1;camStartPos=new _;camEndPos=new _;camStartTarget=new _;camEndTarget=new _;camAnimT=0;originalMeshMaterials=new Map;xrayMaterial;cadWhiteMaterial;hoverHighlightMeshes=new Set;clock=new Su;rafId=0;dirtyFrames=4;constructor(e,t){this.container=e,this.callbacks=t,this.renderer=new d1({antialias:!0,alpha:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(e.clientWidth,e.clientHeight),this.renderer.setClearColor(16777215,1),this.renderer.localClippingEnabled=!0,this.renderer.toneMapping=Mc,this.renderer.toneMappingExposure=1.08,this.renderer.outputColorSpace=At,e.appendChild(this.renderer.domElement),this.scene=new Wc,this.scene.background=new st(16777215);const n=new Ra(this.renderer),s=new A1,o=n.fromScene(s,.04);this.scene.environment=o.texture,this.scene.environmentIntensity=.62,s.dispose(),n.dispose();const r=new _u(16777215,13292512,.8);this.scene.add(r);const a=new Co(16777215,1.55);a.position.set(78,92,108),this.scene.add(a);const l=new Co(16777215,1.38);l.position.set(-82,86,-118),this.scene.add(l);const c=new Co(15660287,.68);c.position.set(-95,34,58),this.scene.add(c);const h=new Co(15922943,.62);h.position.set(92,-38,-74),this.scene.add(h);const u=Math.max(1,e.clientWidth)/Math.max(1,e.clientHeight);this.camera=new cn(32,u,.2,2400),this.controls=new f1(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.065,this.controls.minDistance=16,this.controls.maxDistance=880,this.controls.addEventListener("change",()=>{this.dirtyFrames=Math.max(this.dirtyFrames,2)}),this.clippingPlane=new Bn(new _(-1,0,0),1e4),this.materials=N1([this.clippingPlane]),this.xrayMaterial=new je({color:10467540,metalness:.1,roughness:.2,transparent:!0,opacity:.14,depthWrite:!1,side:Rt,clippingPlanes:[this.clippingPlane]}),this.cadWhiteMaterial=new Ge({color:16185337,metalness:.05,roughness:.85,side:Rt,clippingPlanes:[this.clippingPlane]}),this.mountAssembly=a2(this.materials),this.shutterAssembly=q1(this.materials);const{sensor:d,micro:f}=W1(this.materials);this.sensorAssembly=d,this.microAssembly=f,this.mainboardAssembly=J1(this.materials),this.evfAssembly=n2(this.materials),this.scene.add(this.mountAssembly.rootGroup,this.shutterAssembly.rootGroup,this.sensorAssembly.rootGroup,this.mainboardAssembly.rootGroup,this.evfAssembly.rootGroup,this.microAssembly.rootGroup),this.allParts=[...this.mountAssembly.parts,...this.shutterAssembly.parts,...this.sensorAssembly.parts,...this.mainboardAssembly.parts,...this.evfAssembly.parts,...this.microAssembly.parts];for(const g of this.allParts)for(const x of g.interactiveMeshes)this.originalMeshMaterials.set(x,{originalMaterial:x.material});this.syncAssemblyVisibility(),this.setCameraPreset("iso",!0),this.bindEvents(),this.animate()}isPartInCurrentMode(e){return this.mode==="integrated"?e.subsystem==="mount"||e.subsystem==="shutter"||e.subsystem==="sensor"||e.subsystem==="mainboard"||e.subsystem==="evf":e.subsystem===this.mode}syncAssemblyVisibility(){const e=this.mode==="mount"||this.mode==="integrated",t=this.mode==="shutter"||this.mode==="integrated",n=this.mode==="sensor"||this.mode==="integrated",s=this.mode==="mainboard"||this.mode==="integrated",o=this.mode==="evf"||this.mode==="integrated",r=this.mode==="micro";this.mountAssembly.rootGroup.visible=e,this.shutterAssembly.rootGroup.visible=t,this.sensorAssembly.rootGroup.visible=n,this.mainboardAssembly.rootGroup.visible=s,this.evfAssembly.rootGroup.visible=o,this.microAssembly.rootGroup.visible=r,this.mountAssembly.setPhysicsVisible(this.physicsActive&&e),this.shutterAssembly.setPhysicsVisible(this.physicsActive&&t),this.sensorAssembly.setPhysicsVisible(this.physicsActive&&n),this.mainboardAssembly.setPhysicsVisible(this.physicsActive&&s),this.evfAssembly.setPhysicsVisible(this.physicsActive&&o),this.microAssembly.setPhysicsVisible(this.physicsActive&&r),this.mountAssembly.updateExplodeGuides(this.currentExplode,e),this.shutterAssembly.updateExplodeGuides(this.currentExplode,t),this.sensorAssembly.updateExplodeGuides(this.currentExplode,n),this.mainboardAssembly.updateExplodeGuides(this.currentExplode,s),this.evfAssembly.updateExplodeGuides(this.currentExplode,o),this.microAssembly.updateExplodeGuides(this.currentExplode,r)}getPartsForCurrentMode(){const e={mount:0,evf:1,shutter:2,sensor:3,mainboard:4,micro:5};return this.allParts.filter(t=>this.isPartInCurrentMode(t)).sort((t,n)=>t.subsystem!==n.subsystem?e[t.subsystem]-e[n.subsystem]:this.mode==="integrated"&&t.subsystem==="mainboard"?n.order-t.order:t.order-n.order)}getSelectedPart(){return this.selectedPartId?this.allParts.find(e=>e.id===this.selectedPartId)??null:null}isPartHidden(e){return this.isolatedPartId&&this.isolatedPartId!==e?!0:this.hiddenPartIds.has(e)}isIsolated(){return this.isolatedPartId!==null}hasAnyHidden(){return this.isolatedPartId!==null||this.hiddenPartIds.size>0}getMode(){return this.mode}setMode(e,t=!1){this.mode!==e&&(this.mode=e,this.selectedPartId=null,this.hoveredPartId=null,this.isolatedPartId=null,this.hiddenPartIds.clear(),this.syncAssemblyVisibility(),this.applyVisibilityAndStyles(),this.updateClippingPlane(),this.setCameraPreset("iso",t),this.callbacks.onSelectPart(null),this.callbacks.onHoverPart(null),this.callbacks.onVisibilityChanged())}setExplode(e,t=!1){this.targetExplode=ze.clamp(e,0,1),t&&(this.currentExplode=this.targetExplode,this.stepActiveAssemblies(this.clock.getElapsedTime(),0),this.syncAssemblyVisibility()),this.markDirty()}getExplode(){return this.targetExplode}setRenderMode(e){this.renderMode=e,this.applyVisibilityAndStyles()}setSection(e,t){this.sectionAxis=e,typeof t=="number"&&(this.sectionValue=ze.clamp(t,0,1)),this.updateClippingPlane()}setPhysicsActive(e){this.physicsActive=e,this.syncAssemblyVisibility(),this.markDirty()}selectPart(e,t=!0){if(e===this.selectedPartId)return;this.selectedPartId=e,e&&this.hiddenPartIds.has(e)&&this.hiddenPartIds.delete(e),e&&this.isolatedPartId&&this.isolatedPartId!==e&&(this.isolatedPartId=e),this.applyVisibilityAndStyles();const n=this.getSelectedPart();n&&t&&this.focusOnPart(n),this.callbacks.onSelectPart(n),this.callbacks.onVisibilityChanged()}setHoveredPartFromUI(e){this.hoveredPartId!==e&&(this.hoveredPartId=e,this.applyVisibilityAndStyles())}togglePartHidden(e){if(this.isolatedPartId){const t=this.isolatedPartId;this.isolatedPartId=null,e===t&&this.hiddenPartIds.add(e)}else this.hiddenPartIds.has(e)?this.hiddenPartIds.delete(e):this.hiddenPartIds.add(e);this.selectedPartId&&this.isPartHidden(this.selectedPartId)&&(this.selectedPartId=null,this.callbacks.onSelectPart(null)),this.applyVisibilityAndStyles(),this.callbacks.onVisibilityChanged()}toggleIsolateSelected(){this.selectedPartId&&(this.isolatedPartId===this.selectedPartId?this.isolatedPartId=null:(this.isolatedPartId=this.selectedPartId,this.hiddenPartIds.delete(this.selectedPartId)),this.applyVisibilityAndStyles(),this.callbacks.onVisibilityChanged())}resetAllVisibility(){this.isolatedPartId=null,this.hiddenPartIds.clear(),this.applyVisibilityAndStyles(),this.callbacks.onVisibilityChanged()}stepSelectedPart(e){const t=this.getPartsForCurrentMode();if(t.length===0)return;const n=t.findIndex(o=>o.id===this.selectedPartId),s=n<0?0:(n+e+t.length)%t.length;this.selectPart(t[s].id,!0)}setCameraPreset(e,t=!1){const n=this.targetExplode;let s,o;this.mode==="mount"?(s=178+n*158,o=new _(2+n*3,-2.5-n*4.5,25+n*22)):this.mode==="evf"?(s=136+n*188,o=new _(1.5*(1-n),38.6+n*.5,-16.5-n*18)):this.mode==="mainboard"?(s=186+n*124,o=new _(0,-3,-21.5-n*14.5)):this.mode==="shutter"?(s=166+n*82,o=new _(6+n*5,-3.2,14-n*1.5)):this.mode==="integrated"?(s=264+n*490,o=new _(2,5.5+n*10.5,2.5+n*24)):this.mode==="sensor"?(s=142+n*72,o=new _(0,-1,-2-n*14)):(s=76+n*46,o=new _(0,-1,-1));let r;if(this.mode==="evf"){const l=n>.25?-.88:-.78,c=n>.25?.17:.24,h=n>.25?-.44:-.58;switch(e){case"front":r=new _(0,2,-s);break;case"side":r=new _(-s*1.05,4,0);break;case"back":r=new _(s*.65,s*.28,s*.72);break;case"iso":default:r=new _(s*l,s*c,s*h);break}}else if(this.mode==="mainboard"){const l=n>.25?-.68:-.44,c=n>.25?-.66:-.84;switch(e){case"front":r=new _(0,2,-s);break;case"side":r=new _(-s*1.04,8,0);break;case"back":r=new _(s*.52,s*.3,s*.8);break;case"iso":default:r=new _(s*l,s*.28,s*c);break}}else switch(e){case"front":r=new _(0,2,s);break;case"side":r=new _(s*1.04,8,0);break;case"back":r=new _(-s*.55,s*.34,-s*.78);break;case"iso":default:if(this.mode==="mount"){const l=n>.25?.8:.58,c=n>.25?.56:.76;r=new _(s*l,s*.22,s*c)}else if(this.mode==="shutter")r=new _(s*.52,s*.28,s*.81);else if(this.mode==="integrated"){const l=n>.25?.78:.64,c=n>.25?.58:.72;r=new _(s*l,s*.23,s*c)}else this.mode==="sensor"?r=new _(s*.64,s*.38,s*.72):r=new _(s*.68,s*.44,s*.66);break}const a=o.clone().add(r);t?(this.camAnimActive=!1,this.camera.position.copy(a),this.controls.target.copy(o),this.controls.update(),this.markDirty()):this.animateCameraTo(a,o)}focusOnPart(e){const t=new ri().setFromObject(e.group),n=new _;t.getCenter(n);const s=new _().subVectors(this.camera.position,this.controls.target),o=this.mode==="micro",r=o?66:this.mode==="evf"?112:this.mode==="integrated"?240:148,a=o?34:this.mode==="evf"?44:56,l=Math.min(s.length(),r);s.setLength(Math.max(l,a));const c=n.clone().add(s);this.animateCameraTo(c,n)}animateCameraTo(e,t){this.camStartPos.copy(this.camera.position),this.camEndPos.copy(e),this.camStartTarget.copy(this.controls.target),this.camEndTarget.copy(t),this.camAnimT=0,this.camAnimActive=!0}markDirty(e=3){this.dirtyFrames=Math.max(this.dirtyFrames,e)}updateClippingPlane(){if(this.sectionAxis==="off"){this.clippingPlane.normal.set(-1,0,0),this.clippingPlane.constant=1e4,this.markDirty();return}let e=-48,t=48;this.mode==="micro"?(e=-13,t=13):this.mode==="mount"?this.sectionAxis==="x"?(e=-46,t=46):(e=-40,t=40):this.mode==="evf"?this.sectionAxis==="x"?(e=-24,t=24):(e=18,t=60):this.mode==="mainboard"?this.sectionAxis==="x"?(e=-50,t=50):(e=-36,t=36):this.mode==="shutter"?this.sectionAxis==="x"?(e=-48,t=50):(e=-35,t=35):this.mode==="integrated"&&(this.sectionAxis==="x"?(e=-50,t=50):(e=-40,t=62));const n=ze.lerp(e,t,this.sectionValue);this.sectionAxis==="x"?(this.clippingPlane.normal.set(-1,0,0),this.clippingPlane.constant=n):(this.clippingPlane.normal.set(0,-1,0),this.clippingPlane.constant=n),this.markDirty()}applyVisibilityAndStyles(){this.hoverHighlightMeshes.clear();for(const e of this.allParts){if(!this.isPartInCurrentMode(e))continue;const t=this.isPartHidden(e.id);e.group.visible=!t;const n=e.id===this.selectedPartId,s=e.id===this.hoveredPartId;for(const o of e.interactiveMeshes){const r=this.originalMeshMaterials.get(o);r&&(this.renderMode==="cad"?o.material=this.cadWhiteMaterial:this.renderMode==="xray"?o.material=n||s?r.originalMaterial:this.xrayMaterial:o.material=r.originalMaterial,(s||n)&&this.hoverHighlightMeshes.add(o))}for(const o of e.edgeLines){const r=o.material,a=o.userData.baseOpacity??.2;n?(r.color.setHex(875481),r.opacity=.92):s?(r.color.setHex(2450411),r.opacity=.72):this.renderMode==="cad"?(r.color.setHex(1316378),r.opacity=.72):this.renderMode==="xray"?(r.color.setHex(3821934),r.opacity=.34):(r.color.setHex(1580068),r.opacity=a)}}this.markDirty()}bindEvents(){const e=this.renderer.domElement;e.addEventListener("pointerdown",t=>{this.pointerDownPos.set(t.clientX,t.clientY),this.camAnimActive=!1,this.markDirty()}),e.addEventListener("pointermove",t=>{const n=e.getBoundingClientRect();this.pointer.x=(t.clientX-n.left)/n.width*2-1,this.pointer.y=-((t.clientY-n.top)/n.height)*2+1,this.updateHoverFromRaycast()}),e.addEventListener("pointerleave",()=>{this.hoveredPartId!==null&&(this.hoveredPartId=null,this.container.classList.remove("is-hovering"),this.applyVisibilityAndStyles(),this.callbacks.onHoverPart(null))}),e.addEventListener("pointerup",t=>{if(Math.hypot(t.clientX-this.pointerDownPos.x,t.clientY-this.pointerDownPos.y)>5)return;const s=e.getBoundingClientRect();this.pointer.x=(t.clientX-s.left)/s.width*2-1,this.pointer.y=-((t.clientY-s.top)/s.height)*2+1;const o=this.pickPartAtPointer();o?this.selectPart(o,!0):this.selectedPartId&&this.selectPart(null,!1)}),window.addEventListener("resize",()=>{const t=Math.max(1,this.container.clientWidth),n=Math.max(1,this.container.clientHeight);this.camera.aspect=t/n,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,n),this.markDirty()})}pickPartAtPointer(){this.raycaster.setFromCamera(this.pointer,this.camera);const e=[];this.mountAssembly.rootGroup.visible&&e.push(...this.mountAssembly.rootGroup.children),this.shutterAssembly.rootGroup.visible&&e.push(...this.shutterAssembly.rootGroup.children),this.sensorAssembly.rootGroup.visible&&e.push(...this.sensorAssembly.rootGroup.children),this.mainboardAssembly.rootGroup.visible&&e.push(...this.mainboardAssembly.rootGroup.children),this.evfAssembly.rootGroup.visible&&e.push(...this.evfAssembly.rootGroup.children),this.microAssembly.rootGroup.visible&&e.push(...this.microAssembly.rootGroup.children);const t=this.raycaster.intersectObjects(e,!0);for(const n of t){if(!n.object.visible||this.sectionAxis!=="off"&&this.clippingPlane.distanceToPoint(n.point)<0)continue;const s=n.object.userData.partId;if(s&&!this.isPartHidden(s))return s}return null}updateHoverFromRaycast(){const e=this.pickPartAtPointer();e!==this.hoveredPartId&&(this.hoveredPartId=e,this.container.classList.toggle("is-hovering",e!==null),this.applyVisibilityAndStyles(),this.callbacks.onHoverPart(e))}stepActiveAssemblies(e,t){const n=this.mode==="integrated";this.mountAssembly.rootGroup.visible&&this.mountAssembly.updateAnimation(e,t,this.currentExplode,this.physicsActive,n),this.shutterAssembly.rootGroup.visible&&this.shutterAssembly.updateAnimation(e,t,this.currentExplode,this.physicsActive,n),this.sensorAssembly.rootGroup.visible&&this.sensorAssembly.updateAnimation(e,t,this.currentExplode,this.physicsActive,n),this.mainboardAssembly.rootGroup.visible&&this.mainboardAssembly.updateAnimation(e,t,this.currentExplode,this.physicsActive,n),this.evfAssembly.rootGroup.visible&&this.evfAssembly.updateAnimation(e,t,this.currentExplode,this.physicsActive,n),this.microAssembly.rootGroup.visible&&this.microAssembly.updateAnimation(e,t,this.currentExplode,this.physicsActive,!1)}animate=()=>{this.rafId=requestAnimationFrame(this.animate);const e=Math.min(this.clock.getDelta(),.05),t=this.clock.getElapsedTime();let n=this.physicsActive||this.dirtyFrames>0,s=!1;const o=this.targetExplode-this.currentExplode;if(Math.abs(o)>5e-4?(this.currentExplode+=o*Math.min(1,e*10),s=!0,n=!0):this.currentExplode!==this.targetExplode&&(this.currentExplode=this.targetExplode,s=!0,n=!0),this.camAnimActive){this.camAnimT=Math.min(1,this.camAnimT+e*2.8);const a=1-Math.pow(1-this.camAnimT,3);this.camera.position.lerpVectors(this.camStartPos,this.camEndPos,a),this.controls.target.lerpVectors(this.camStartTarget,this.camEndTarget,a),this.camAnimT>=1&&(this.camAnimActive=!1),n=!0}this.controls.update()&&(n=!0),n&&(this.stepActiveAssemblies(t,e),(s||this.dirtyFrames>0)&&(this.mountAssembly.updateExplodeGuides(this.currentExplode,this.mountAssembly.rootGroup.visible),this.shutterAssembly.updateExplodeGuides(this.currentExplode,this.shutterAssembly.rootGroup.visible),this.sensorAssembly.updateExplodeGuides(this.currentExplode,this.sensorAssembly.rootGroup.visible),this.mainboardAssembly.updateExplodeGuides(this.currentExplode,this.mainboardAssembly.rootGroup.visible),this.evfAssembly.updateExplodeGuides(this.currentExplode,this.evfAssembly.rootGroup.visible),this.microAssembly.updateExplodeGuides(this.currentExplode,this.microAssembly.rootGroup.visible)),this.renderer.render(this.scene,this.camera),this.dirtyFrames>0&&this.dirtyFrames--)};dispose(){cancelAnimationFrame(this.rafId),this.controls.dispose(),this.renderer.dispose()}}const c2="http://www.w3.org/2000/svg";function Ho(i,e="0 0 24 24"){const t=document.createElementNS(c2,"svg");return t.setAttribute("viewBox",e),t.setAttribute("aria-hidden","true"),t.innerHTML=i,t}function Nt(i,e="icon-btn"){const t=document.createElement("button");return t.type="button",t.className=e,t.appendChild(Ho(i)),t}const vt={integratedCore:'<rect x="2.5" y="3.5" width="9.5" height="9.5" rx="1.4"/><line x1="2.5" y1="7.8" x2="12" y2="7.8"/><path d="M14 7.5h2.5a1.5 1.5 0 0 1 1.5 1.5v6.5a1.5 1.5 0 0 1-1.5 1.5H10a1.5 1.5 0 0 1-1.5-1.5V15"/><path d="M18 11.5h2a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V18"/>',mountModule:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5.3"/><circle cx="12" cy="5.1" r="1.05" fill="currentColor" stroke="none"/><line x1="8.3" y1="8.3" x2="9.7" y2="9.7"/><line x1="15.7" y1="8.3" x2="14.3" y2="9.7"/><line x1="8.3" y1="15.7" x2="9.7" y2="14.3"/><line x1="15.7" y1="15.7" x2="14.3" y2="14.3"/><circle cx="10" cy="18.6" r="0.7" fill="currentColor" stroke="none"/><circle cx="12" cy="18.9" r="0.7" fill="currentColor" stroke="none"/><circle cx="14" cy="18.6" r="0.7" fill="currentColor" stroke="none"/>',shutterModule:'<rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="9.5" x2="21" y2="9.5"/><line x1="3" y1="14.5" x2="21" y2="14.5"/><line x1="3" y1="6.8" x2="21" y2="6.8" opacity="0.45"/><line x1="3" y1="17.2" x2="21" y2="17.2" opacity="0.45"/><line x1="17.5" y1="4" x2="17.5" y2="20" opacity="0.5"/>',macroSensor:'<rect x="3" y="5" width="18" height="14" rx="2"/><rect x="7" y="8.5" width="10" height="7" rx="1"/><line x1="7" y1="3" x2="7" y2="5"/><line x1="12" y1="3" x2="12" y2="5"/><line x1="17" y1="3" x2="17" y2="5"/><line x1="7" y1="19" x2="7" y2="21"/><line x1="12" y1="19" x2="12" y2="21"/><line x1="17" y1="19" x2="17" y2="21"/>',mainboardIsp:'<rect x="3" y="4" width="18" height="16" rx="2"/><rect x="8.5" y="8.5" width="7" height="7" rx="1"/><line x1="8.5" y1="12" x2="5.5" y2="12"/><line x1="15.5" y1="12" x2="18.5" y2="12"/><line x1="12" y1="8.5" x2="12" y2="5.5"/><line x1="12" y1="15.5" x2="12" y2="18.5"/><circle cx="5.5" cy="7.5" r="0.9" fill="currentColor" stroke="none"/><circle cx="18.5" cy="7.5" r="0.9" fill="currentColor" stroke="none"/><circle cx="18.5" cy="16.5" r="0.9" fill="currentColor" stroke="none"/>',evfModule:'<path d="M4 17v-5l3.5-5h9L20 12v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M7.5 13.5c1.2-2.2 3-3.3 4.5-3.3s3.3 1.1 4.5 3.3c-1.2 2.2-3 3.3-4.5 3.3s-3.3-1.1-4.5-3.3z"/><circle cx="12" cy="13.5" r="1.4" fill="currentColor" stroke="none"/><line x1="9" y1="4.5" x2="15" y2="4.5"/>',microPixel:'<path d="M4 10c0-2.5 2-4 4-4s4 1.5 4 4"/><path d="M12 10c0-2.5 2-4 4-4s4 1.5 4 4"/><rect x="4" y="10" width="16" height="3.5" rx="0.5"/><rect x="4" y="15.5" width="16" height="3.5" rx="0.5"/>',assembled:'<polygon points="12 5 20 9.5 12 14 4 9.5 12 5"/><polyline points="4 13 12 17.5 20 13"/>',exploded:'<polygon points="12 2.5 20 6.5 12 10.5 4 6.5 12 2.5"/><polyline points="4 12 12 16 20 12"/><polyline points="4 17.5 12 21.5 20 17.5"/>',sectionOff:'<rect x="4" y="4" width="16" height="16" rx="2"/><line x1="12" y1="2" x2="12" y2="22" stroke-dasharray="2.5 2.5"/>',sectionX:'<path d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6"/><line x1="12" y1="2" x2="12" y2="22"/><path d="M15 8l4 4-4 4" opacity="0.55"/>',sectionY:'<path d="M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M8 9l4-4 4 4" opacity="0.55"/>',renderSolid:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"/><path d="M12 12l8-4.5"/><path d="M12 12v9"/><path d="M12 12L4 7.5"/>',renderXray:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" stroke-dasharray="2.5 2"/><circle cx="12" cy="12" r="3"/>',renderCad:'<polygon points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"/><line x1="12" y1="3" x2="12" y2="21"/><line x1="4" y1="7.5" x2="20" y2="16.5" opacity="0.45"/><line x1="20" y1="7.5" x2="4" y2="16.5" opacity="0.45"/>',physicsRays:'<line x1="3" y1="6" x2="12" y2="12"/><line x1="3" y1="12" x2="12" y2="12"/><line x1="3" y1="18" x2="12" y2="12"/><line x1="12" y1="12" x2="21" y2="7"/><line x1="12" y1="12" x2="21" y2="12"/><line x1="12" y1="12" x2="21" y2="17"/><circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none"/>',eyeAll:'<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="2.8"/>',eyeClosed:'<path d="M3 3l18 18"/><path d="M10.6 10.6a2.5 2.5 0 0 0 3.5 3.5"/><path d="M6.4 6.7C4 8.2 2.4 10.5 2 12c1.2 3.2 5 6.5 10 6.5 1.8 0 3.5-.5 4.9-1.2"/><path d="M9.8 5.7A10.6 10.6 0 0 1 12 5.5c5 0 8.8 3.3 10 6.5-.4 1.1-1.2 2.4-2.4 3.6"/>',viewIso:'<path d="M12 3l7.5 4.2v8.6L12 20l-7.5-4.2V7.2L12 3z"/><path d="M12 11.5L19.5 7.2"/><path d="M12 11.5V20"/><path d="M12 11.5L4.5 7.2"/>',viewFront:'<rect x="5" y="5" width="14" height="14" rx="2"/><circle cx="12" cy="12" r="3.2"/>',viewSide:'<rect x="9" y="4" width="6" height="16" rx="1.5"/><line x1="4" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="20" y2="12"/>',viewBack:'<rect x="5" y="5" width="14" height="14" rx="2"/><line x1="8.5" y1="8.5" x2="15.5" y2="15.5"/><line x1="15.5" y1="8.5" x2="8.5" y2="15.5"/>'};class h2{root;handlers;integratedBtn;mountBtn;shutterBtn;sensorBtn;mainboardBtn;evfBtn;microBtn;explodeRange;assembleBtn;explodeBtn;sectionBtn;sectionRange;solidBtn;xrayBtn;cadBtn;physicsBtn;resetVisBtn;layerRail;layerRowMap=new Map;currentMode="mount";currentSectionAxis="off";currentRenderMode="solid";physicsActive=!1;constructor(e,t){this.root=e,this.handlers=t;const n=document.createElement("div");n.className="view-cluster";const s=Nt(vt.viewIso),o=Nt(vt.viewFront),r=Nt(vt.viewSide),a=Nt(vt.viewBack);s.addEventListener("click",()=>this.handlers.onCameraPreset("iso")),o.addEventListener("click",()=>this.handlers.onCameraPreset("front")),r.addEventListener("click",()=>this.handlers.onCameraPreset("side")),a.addEventListener("click",()=>this.handlers.onCameraPreset("back")),n.append(s,o,r,a),this.root.appendChild(n),this.layerRail=document.createElement("div"),this.layerRail.className="layer-rail",this.root.appendChild(this.layerRail);const l=document.createElement("div");l.className="cad-dock";const c=document.createElement("div");c.className="cad-dock-group",this.integratedBtn=Nt(vt.integratedCore),this.mountBtn=Nt(vt.mountModule),this.mountBtn.classList.add("is-active"),this.shutterBtn=Nt(vt.shutterModule),this.sensorBtn=Nt(vt.macroSensor),this.mainboardBtn=Nt(vt.mainboardIsp),this.evfBtn=Nt(vt.evfModule),this.microBtn=Nt(vt.microPixel),this.integratedBtn.addEventListener("click",()=>this.setMode("integrated")),this.mountBtn.addEventListener("click",()=>this.setMode("mount")),this.shutterBtn.addEventListener("click",()=>this.setMode("shutter")),this.sensorBtn.addEventListener("click",()=>this.setMode("sensor")),this.mainboardBtn.addEventListener("click",()=>this.setMode("mainboard")),this.evfBtn.addEventListener("click",()=>this.setMode("evf")),this.microBtn.addEventListener("click",()=>this.setMode("micro")),c.append(this.integratedBtn,this.mountBtn,this.shutterBtn,this.sensorBtn,this.mainboardBtn,this.evfBtn,this.microBtn);const h=document.createElement("div");h.className="slider-cluster",this.assembleBtn=Nt(vt.assembled),this.explodeRange=document.createElement("input"),this.explodeRange.type="range",this.explodeRange.min="0",this.explodeRange.max="1000",this.explodeRange.value="0",this.explodeRange.className="cad-range",this.explodeBtn=Nt(vt.exploded),this.assembleBtn.addEventListener("click",()=>{this.explodeRange.value="0",this.handlers.onExplodeChange(0),this.updateExplodeButtons(0)}),this.explodeBtn.addEventListener("click",()=>{this.explodeRange.value="1000",this.handlers.onExplodeChange(1),this.updateExplodeButtons(1)}),this.explodeRange.addEventListener("input",()=>{const T=Number(this.explodeRange.value)/1e3;this.handlers.onExplodeChange(T),this.updateExplodeButtons(T)}),this.updateExplodeButtons(0),h.append(this.assembleBtn,this.explodeRange,this.explodeBtn);const u=document.createElement("div");u.className="slider-cluster",this.sectionBtn=Nt(vt.sectionOff),this.sectionRange=document.createElement("input"),this.sectionRange.type="range",this.sectionRange.min="0",this.sectionRange.max="1000",this.sectionRange.value="500",this.sectionRange.className="cad-range is-disabled",this.sectionBtn.addEventListener("click",()=>{const T=this.currentSectionAxis==="off"?"x":this.currentSectionAxis==="x"?"y":"off";this.setSectionAxis(T)}),this.sectionRange.addEventListener("input",()=>{this.handlers.onSectionValueChange(Number(this.sectionRange.value)/1e3)}),u.append(this.sectionBtn,this.sectionRange);const d=document.createElement("div");d.className="cad-dock-group",this.solidBtn=Nt(vt.renderSolid),this.solidBtn.classList.add("is-active"),this.xrayBtn=Nt(vt.renderXray),this.cadBtn=Nt(vt.renderCad),this.solidBtn.addEventListener("click",()=>this.setRenderMode("solid")),this.xrayBtn.addEventListener("click",()=>this.setRenderMode("xray")),this.cadBtn.addEventListener("click",()=>this.setRenderMode("cad")),d.append(this.solidBtn,this.xrayBtn,this.cadBtn);const f=document.createElement("div");f.className="cad-dock-group",this.physicsBtn=Nt(vt.physicsRays),this.physicsBtn.classList.add("is-accent"),this.physicsBtn.addEventListener("click",()=>{this.physicsActive=!this.physicsActive,this.physicsBtn.classList.toggle("is-active",this.physicsActive),this.handlers.onPhysicsToggle(this.physicsActive)}),this.resetVisBtn=Nt(vt.eyeAll),this.resetVisBtn.disabled=!0,this.resetVisBtn.addEventListener("click",()=>{this.handlers.onResetVisibility()}),f.append(this.physicsBtn,this.resetVisBtn);const g=document.createElement("div");g.className="cad-divider";const x=document.createElement("div");x.className="cad-divider";const m=document.createElement("div");m.className="cad-divider";const p=document.createElement("div");p.className="cad-divider",l.append(c,g,h,x,u,m,d,p,f),this.root.appendChild(l)}applyModeButtons(e){this.integratedBtn.classList.toggle("is-active",e==="integrated"),this.mountBtn.classList.toggle("is-active",e==="mount"),this.shutterBtn.classList.toggle("is-active",e==="shutter"),this.sensorBtn.classList.toggle("is-active",e==="sensor"),this.mainboardBtn.classList.toggle("is-active",e==="mainboard"),this.evfBtn.classList.toggle("is-active",e==="evf"),this.microBtn.classList.toggle("is-active",e==="micro")}setMode(e){this.currentMode!==e&&(this.currentMode=e,this.applyModeButtons(e),this.handlers.onModeChange(e))}updateExplodeButtons(e){this.assembleBtn.classList.toggle("is-active",e<.04),this.explodeBtn.classList.toggle("is-active",e>.96)}setSectionAxis(e){this.currentSectionAxis=e,this.sectionBtn.replaceChildren(Ho(e==="off"?vt.sectionOff:e==="x"?vt.sectionX:vt.sectionY)),this.sectionBtn.classList.toggle("is-active",e!=="off"),this.sectionRange.classList.toggle("is-disabled",e==="off"),this.handlers.onSectionAxisChange(e)}setRenderMode(e){this.currentRenderMode!==e&&(this.currentRenderMode=e,this.solidBtn.classList.toggle("is-active",e==="solid"),this.xrayBtn.classList.toggle("is-active",e==="xray"),this.cadBtn.classList.toggle("is-active",e==="cad"),this.handlers.onRenderModeChange(e))}setExplodeValue(e){this.explodeRange.value=String(Math.round(e*1e3)),this.updateExplodeButtons(e)}syncMode(e){this.currentMode=e,this.applyModeButtons(e)}syncSectionAxis(e,t=.5){this.currentSectionAxis=e,this.sectionBtn.replaceChildren(Ho(e==="off"?vt.sectionOff:e==="x"?vt.sectionX:vt.sectionY)),this.sectionBtn.classList.toggle("is-active",e!=="off"),this.sectionRange.classList.toggle("is-disabled",e==="off"),this.sectionRange.value=String(Math.round(t*1e3))}syncPhysics(e){this.physicsActive=e,this.physicsBtn.classList.toggle("is-active",e)}renderLayerRail(e,t,n,s,o){this.layerRail.replaceChildren(),this.layerRowMap.clear(),this.resetVisBtn.disabled=!o;let r=null;e.forEach((a,l)=>{if(r&&r!==a.subsystem){const x=document.createElement("div");x.className="layer-sep",this.layerRail.appendChild(x)}r=a.subsystem;const c=document.createElement("div");c.className="layer-item";const h=s(a.id);a.id===t&&c.classList.add("is-selected"),a.id===n&&c.classList.add("is-hovered"),h&&c.classList.add("is-hidden");const u=document.createElement("span");u.className="layer-swatch",u.style.backgroundColor=a.swatchColor;const d=document.createElement("span");d.className="layer-bar";let f=20;if(a.subsystem==="mount")f=a.order===1||a.order===11||a.order===12?32:a.order===3||a.order===4||a.order===5||a.order===9||a.order===10?25:18;else if(a.subsystem==="evf")f=a.order===1||a.order===14?32:a.order===5||a.order===7||a.order===8||a.order===11?26:a.order===2||a.order===10||a.order===13?22:17;else if(a.subsystem==="mainboard")f=a.order===14||a.order===16?32:a.order===1||a.order===2?28:a.order===4||a.order===6||a.order===9||a.order===12?24:17;else if(a.subsystem==="shutter")f=a.order===1||a.order===12?30:a.order===3||a.order===5||a.order===6?24:a.order>=8&&a.order<=10?26:17;else if(a.subsystem==="sensor"){const x=(a.order-1)/13;f=Math.round(14+Math.sin(x*Math.PI*.85)*10+(a.order>=10?10:0))}else f=Math.round(18+(l===3||l===4?10:4));d.style.width=`${f}px`;const g=document.createElement("button");g.type="button",g.className="layer-eye-btn",g.appendChild(Ho(h?vt.eyeClosed:vt.eyeAll)),g.addEventListener("click",x=>{x.stopPropagation(),this.handlers.onToggleHidePart(a.id)}),c.addEventListener("click",()=>{this.handlers.onSelectPart(a.id)}),c.addEventListener("pointerenter",()=>{this.handlers.onHoverPart(a.id)}),c.addEventListener("pointerleave",()=>{this.handlers.onHoverPart(null)}),c.append(u,d,g),this.layerRail.appendChild(c),this.layerRowMap.set(a.id,c)})}syncHighlight(e,t){this.layerRowMap.forEach((n,s)=>{n.classList.toggle("is-selected",s===e),n.classList.toggle("is-hovered",s===t)})}}const d2="http://www.w3.org/2000/svg";function u2(i,e="0 0 24 24"){const t=document.createElementNS(d2,"svg");return t.setAttribute("viewBox",e),t.innerHTML=i,t}function Fs(i){const e=document.createElement("button");return e.type="button",e.className="icon-btn",e.appendChild(u2(i)),e}const zs={prev:'<polyline points="15 18 9 12 15 6"/>',next:'<polyline points="9 18 15 12 9 6"/>',isolate:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/>',hide:'<path d="M3 3l18 18"/><path d="M10.6 10.6a2.5 2.5 0 0 0 3.5 3.5"/><path d="M6.4 6.7C4 8.2 2.4 10.5 2 12c1.2 3.2 5 6.5 10 6.5 1.8 0 3.5-.5 4.9-1.2"/><path d="M9.8 5.7A10.6 10.6 0 0 1 12 5.5c5 0 8.8 3.3 10 6.5-.4 1.1-1.2 2.4-2.4 3.6"/>',close:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'};function f2(i){const e=t=>`<svg viewBox="0 0 320 118" xmlns="http://www.w3.org/2000/svg" style="font-family: ui-monospace, monospace;">${t}</svg>`;switch(i){case"baffle":return e(`
        <rect x="24" y="18" width="272" height="82" rx="4" fill="#ffffff" stroke="#d8dde6"/>
        <polygon points="90,26 115,26 106,44 90,44" fill="#232730"/>
        <polygon points="90,92 115,92 106,74 90,74" fill="#232730"/>
        <line x1="36" y1="59" x2="275" y2="59" stroke="#2563eb" stroke-width="1.8"/>
        <line x1="36" y1="30" x2="103" y2="38" stroke="#dc2626" stroke-width="1.4" stroke-dasharray="3 2"/>
        <line x1="103" y1="38" x2="96" y2="31" stroke="#dc2626" stroke-width="1" opacity="0.5"/>
        <rect x="248" y="34" width="10" height="50" fill="#1d6d7c"/>
        <text x="124" y="34" font-size="9" fill="#525a69">ナイフエッジ遮光壁（迷光吸収）</text>
        <text x="148" y="54" font-size="9" fill="#2563eb">有効結像光束</text>
        <text x="225" y="94" font-size="8.5" fill="#1d6d7c">36×24 mm 像面</text>
      `);case"sswf":return e(`
        <rect x="20" y="76" width="54" height="16" rx="2" fill="#e2dac8" stroke="#7c7566"/>
        <text x="35" y="87" font-size="8.5" fill="#222">PZT</text>
        <path d="M74 68 Q114 48 154 68 T234 68 T300 68" fill="none" stroke="#0284c7" stroke-width="2.2"/>
        <path d="M74 68 Q114 88 154 68 T234 68 T300 68" fill="none" stroke="#0284c7" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.55"/>
        <circle cx="154" cy="44" r="3" fill="#475569"/>
        <path d="M154 41 L162 24" stroke="#dc2626" stroke-width="1.4"/>
        <polygon points="162,24 157,28 164,30" fill="#dc2626"/>
        <circle cx="215" cy="36" r="2.3" fill="#475569"/>
        <path d="M215 33 L222 18" stroke="#dc2626" stroke-width="1.3"/>
        <text x="112" y="21" font-size="9" fill="#1e293b">30–70 kHz 超音波定在波 (a &gt; 10⁴ G)</text>
        <text x="180" y="103" font-size="8.5" fill="#0284c7">屈曲共振モード振動ガラス</text>
      `);case"olpf16":return e(`
        <!-- 16-point Gaussian PSF cluster -->
        <rect x="16" y="14" width="90" height="90" rx="6" fill="#ffffff" stroke="#dbe2eb"/>
        ${[-22,-8,8,22].flatMap((t,n)=>[-22,-8,8,22].map((s,o)=>{const r=Math.hypot(n-1.5,o-1.5),a=Math.max(2.1,4.3-r*.9),l=Math.max(.32,.95-r*.25).toFixed(2);return`<circle cx="${61+t}" cy="${59+s}" r="${a.toFixed(1)}" fill="#0d5bd9" opacity="${l}"/>`})).join("")}
        <text x="27" y="114" font-size="8.5" fill="#475569">16点ガウス分離 PSF</text>
        <!-- MTF Comparison curve -->
        <line x1="132" y1="96" x2="304" y2="96" stroke="#94a3b8" stroke-width="1"/>
        <line x1="132" y1="18" x2="132" y2="96" stroke="#94a3b8" stroke-width="1"/>
        <line x1="205" y1="18" x2="205" y2="96" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 2"/>
        <path d="M132 24 C165 26, 190 50, 215 80 C235 94, 265 95, 300 95" fill="none" stroke="#0d5bd9" stroke-width="2.2"/>
        <path d="M132 24 C162 28, 185 68, 205 95 C225 65, 248 56, 268 88 C282 78, 294 74, 300 84" fill="none" stroke="#94a3b8" stroke-width="1.3" stroke-dasharray="3 2"/>
        <text x="196" y="108" font-size="8.5" fill="#475569">f_N (Nyquist)</text>
        <text x="218" y="30" font-size="8.5" fill="#0d5bd9">16点 LPF (サイドローブ抑制)</text>
        <text x="218" y="42" font-size="8" fill="#64748b">破線: 従来4点 LPF</text>
      `);case"ircut":return e(`
        <line x1="28" y1="94" x2="302" y2="94" stroke="#94a3b8" stroke-width="1"/>
        <line x1="28" y1="14" x2="28" y2="94" stroke="#94a3b8" stroke-width="1"/>
        <!-- Visible spectrum band -->
        <rect x="64" y="16" width="110" height="78" fill="url(#visGrad)" opacity="0.22"/>
        <defs>
          <linearGradient id="visGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stop-color="#6366f1"/>
            <stop offset="30%" stop-color="#06b6d4"/>
            <stop offset="55%" stop-color="#22c55e"/>
            <stop offset="80%" stop-color="#eab308"/>
            <stop offset="100%" stop-color="#ef4444"/>
          </linearGradient>
        </defs>
        <!-- Silicon native sensitivity curve (extends to 1107nm) -->
        <path d="M40 92 Q125 18 195 36 Q250 56 294 92" fill="none" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="3 2"/>
        <!-- Hybrid IR/UV cut filter transmittance -->
        <path d="M36 93 L58 92 L68 22 L166 22 L180 92 L296 93" fill="none" stroke="#0284c7" stroke-width="2.3"/>
        <text x="58" y="106" font-size="8" fill="#475569">400nm</text>
        <text x="160" y="106" font-size="8" fill="#475569">650nm</text>
        <text x="266" y="106" font-size="8" fill="#475569">1107nm</text>
        <text x="192" y="34" font-size="8.5" fill="#64748b">Si 原感度 (1.12 eV)</text>
        <text x="80" y="34" font-size="8.5" fill="#0284c7">ハイブリッド透過帯</text>
        <text x="196" y="84" font-size="8.5" fill="#be185d">NIR 遮断 (OD&gt;4)</text>
      `);case"coverglass":return e(`
        <rect x="44" y="28" width="232" height="14" rx="2" fill="#e0f2fe" stroke="#0284c7"/>
        <rect x="44" y="42" width="24" height="28" fill="#94a3b8"/>
        <rect x="252" y="42" width="24" height="28" fill="#94a3b8"/>
        <rect x="44" y="70" width="232" height="20" fill="#334155"/>
        <rect x="92" y="58" width="136" height="12" fill="#1d6d7c"/>
        <text x="116" y="22" font-size="8.5" fill="#0369a1">低α線ARカバーガラス (&gt;99.2%)</text>
        <text x="122" y="53" font-size="8.5" fill="#475569">乾燥窒素 N₂ 気密室</text>
        <text x="10" y="60" font-size="8" fill="#475569">Kovar</text>
        <text x="116" y="84" font-size="8.5" fill="#f8fafc">Al₂O₃ セラミック筐体</text>
      `);case"stacked_die":return e(`
        <rect x="50" y="14" width="220" height="22" rx="3" fill="#1d6d7c"/>
        <text x="78" y="28" font-size="9" fill="#ffffff">1層目: BSI 2層トランジスタ画素 (PD+MEM)</text>
        <rect x="50" y="39" width="220" height="7" fill="#d97736"/>
        <text x="86" y="45" font-size="7.5" fill="#ffffff">Cu-Cu ダイレクトハイブリッド接合</text>
        <rect x="50" y="49" width="220" height="24" rx="3" fill="#2d4868"/>
        <text x="84" y="64" font-size="9" fill="#ffffff">2層目: 列並列 CDS / ADC ＆ GS制御</text>
        <rect x="50" y="77" width="220" height="24" rx="3" fill="#1e293b"/>
        <text x="84" y="92" font-size="9" fill="#e2e8f0">3層目: 超広帯域 DRAM バッファ (120fps)</text>
      `);case"wirebond":return e(`
        <rect x="26" y="72" width="110" height="22" fill="#1d6d7c"/>
        <rect x="136" y="64" width="158" height="30" fill="#334155"/>
        <rect x="108" y="69" width="16" height="4" fill="#eab308"/>
        <rect x="182" y="61" width="22" height="4" fill="#eab308"/>
        <path d="M116 69 C118 32, 160 32, 193 61" fill="none" stroke="#eab308" stroke-width="2.4"/>
        <line x1="154" y1="40" x2="154" y2="69" stroke="#64748b" stroke-width="1" stroke-dasharray="2 2"/>
        <text x="160" y="34" font-size="8.5" fill="#92400e">低ループ 4N Au (55–80 μm)</text>
        <text x="48" y="86" font-size="8.5" fill="#fff">Si ダイ電極</text>
        <text x="174" y="84" font-size="8.5" fill="#e2e8f0">HTCC セラミック段棚</text>
      `);case"ceramic_pkg":return e(`
        <rect x="34" y="24" width="252" height="62" rx="3" fill="#334155"/>
        <rect x="64" y="24" width="192" height="34" fill="#ffffff"/>
        <rect x="84" y="38" width="152" height="18" fill="#1d6d7c"/>
        <rect x="84" y="58" width="152" height="28" fill="#a16244"/>
        ${[48,70,250,272].map(t=>`<rect x="${t-6}" y="86" width="12" height="6" fill="#eab308"/>`).join("")}
        <text x="115" y="50" font-size="8.5" fill="#fff">36×24 mm 撮像ダイ</text>
        <text x="102" y="75" font-size="8.5" fill="#fff">CuW 高熱伝導スラグ</text>
        <text x="86" y="106" font-size="8.5" fill="#475569">12層 HTCC 高平坦焼成 (&lt;5 μm) + 金LGA電極</text>
      `);case"sensor_pcb":return e(`
        <rect x="24" y="24" width="272" height="72" rx="4" fill="#14332d"/>
        <rect x="42" y="38" width="54" height="44" rx="2" fill="#22252b" stroke="#94a3b8"/>
        <text x="49" y="58" font-size="8" fill="#e2e8f0">Analog</text>
        <text x="53" y="70" font-size="8" fill="#38bdf8">LDO 2.8V</text>
        <rect x="224" y="38" width="54" height="44" rx="2" fill="#22252b" stroke="#94a3b8"/>
        <text x="232" y="58" font-size="8" fill="#e2e8f0">Digital</text>
        <text x="233" y="70" font-size="8" fill="#facc15">PMIC 1.2V</text>
        <path d="M110 46 L132 46 L138 38 L146 54 L154 38 L162 54 L170 46 L208 46" fill="none" stroke="#4ade80" stroke-width="1.8"/>
        <path d="M110 70 L208 70" fill="none" stroke="#38bdf8" stroke-width="1.8" stroke-dasharray="4 2"/>
        <text x="114" y="33" font-size="8" fill="#86efac">100Ω 差動等長メアンダ配線</text>
        <text x="114" y="86" font-size="8" fill="#cbd5e1">アナログ/デジタル電源完全分離</text>
      `);case"slvs_fpc":return e(`
        <!-- Eye diagram + U-loop flexure -->
        <rect x="22" y="18" width="128" height="80" rx="5" fill="#ffffff" stroke="#d8dde6"/>
        <path d="M32 34 C58 34, 68 82, 86 82 C104 82, 114 34, 140 34" fill="none" stroke="#0d5bd9" stroke-width="1.8"/>
        <path d="M32 82 C58 82, 68 34, 86 34 C104 34, 114 82, 140 82" fill="none" stroke="#0d5bd9" stroke-width="1.8"/>
        <text x="48" y="61" font-size="8.5" fill="#0d5bd9">200mV Eye</text>
        <text x="26" y="110" font-size="8.5" fill="#475569">SLVS-EC v3 (10 Gbps/lane)</text>
        <path d="M180 34 L256 34 C290 34, 290 84, 256 84 L196 84" fill="none" stroke="#c96b1c" stroke-width="6" stroke-linecap="round"/>
        <text x="176" y="24" font-size="8.5" fill="#9a3412">IBIS低剛性 U字ループ</text>
        <text x="196" y="63" font-size="8" fill="#64748b">EMI遮蔽 + 差動伝送</text>
      `);case"ibis_vcm":return e(`
        <rect x="96" y="22" width="128" height="74" rx="5" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5"/>
        <rect x="114" y="34" width="92" height="50" fill="#1d6d7c" opacity="0.22" stroke="#1d6d7c"/>
        <rect x="112" y="84" width="38" height="10" rx="4" fill="#c86432"/>
        <rect x="170" y="84" width="38" height="10" rx="4" fill="#c86432"/>
        <rect x="218" y="38" width="10" height="42" rx="4" fill="#c86432"/>
        <line x1="131" y1="84" x2="131" y2="68" stroke="#0d5bd9" stroke-width="2"/>
        <line x1="189" y1="84" x2="189" y2="68" stroke="#0d5bd9" stroke-width="2"/>
        <line x1="228" y1="59" x2="254" y2="59" stroke="#d9480f" stroke-width="2"/>
        <text x="140" y="58" font-size="9" fill="#0f172a">X / Y / Roll</text>
        <text x="234" y="52" font-size="8.5" fill="#d9480f">F_x</text>
        <text x="115" y="109" font-size="8.5" fill="#0d5bd9">Y1・Y2 逆相で Roll 補正（ローレンツ力）</text>
      `);case"ceramic_balls":return e(`
        <rect x="34" y="26" width="252" height="14" rx="2" fill="#cbd5e1" stroke="#64748b"/>
        <rect x="34" y="76" width="252" height="14" rx="2" fill="#94a3b8" stroke="#475569"/>
        <circle cx="84" cy="58" r="14" fill="#1e293b"/>
        <circle cx="236" cy="58" r="14" fill="#1e293b"/>
        <circle cx="80" cy="53" r="3.5" fill="#ffffff" opacity="0.35"/>
        <circle cx="232" cy="53" r="3.5" fill="#ffffff" opacity="0.35"/>
        <path d="M160 40 L160 72" stroke="#0d5bd9" stroke-width="2" stroke-dasharray="3 2"/>
        <polygon points="160,74 155,66 165,66" fill="#0d5bd9"/>
        <text x="112" y="19" font-size="8.5" fill="#334155">可動キャリア (ΔZ チルト = 0)</text>
        <text x="122" y="56" font-size="8.5" fill="#0d5bd9">磁気予圧 F_preload</text>
        <text x="72" y="106" font-size="8.5" fill="#334155">3点 Si₃N₄ 非磁性セラミック球（キネマティック支持）</text>
      `);case"magnet_yoke":return e(`
        <rect x="44" y="72" width="232" height="16" fill="#64748b"/>
        <rect x="66" y="48" width="84" height="24" fill="#dbeafe" stroke="#2563eb"/>
        <rect x="170" y="48" width="84" height="24" fill="#fee2e2" stroke="#dc2626"/>
        <text x="102" y="64" font-size="11" font-weight="bold" fill="#1d4ed8">N</text>
        <text x="206" y="64" font-size="11" font-weight="bold" fill="#b91c1c">S</text>
        <path d="M108 48 C108 16, 212 16, 212 48" fill="none" stroke="#0284c7" stroke-width="2" stroke-dasharray="4 2"/>
        <rect x="94" y="24" width="132" height="10" rx="3" fill="#c86432" opacity="0.85"/>
        <text x="120" y="16" font-size="8.5" fill="#0369a1">閉磁気回路磁束 B (~1.4 T)</text>
        <text x="98" y="102" font-size="8.5" fill="#334155">N52 ネオジム磁石 + 軟鉄バックヨーク</text>
      `);case"sigma_graphite":return e(`
        <rect x="26" y="22" width="54" height="72" rx="3" fill="#14332d"/>
        <text x="34" y="61" font-size="8.5" fill="#fff">可動PCB</text>
        <rect x="80" y="34" width="14" height="48" fill="#7aa4b8"/>
        <path d="M94 58 L120 58 L164 26 L196 58 L156 90 L226 58 L244 58" fill="none" stroke="#1e293b" stroke-width="5" stroke-linejoin="round"/>
        <path d="M94 58 L120 58 L164 26 L196 58 L156 90 L226 58 L244 58" fill="none" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="4 3"/>
        <rect x="244" y="22" width="48" height="72" rx="3" fill="#d07447"/>
        <text x="252" y="61" font-size="8.5" fill="#fff">銅放熱板</text>
        <text x="104" y="108" font-size="8.5" fill="#1e293b">Σ字型グラファイト (k ≈ 1600 W/m·K)</text>
      `);case"microlens":return e(`
        <path d="M44 56 Q102 14 160 56 Q218 14 276 56" fill="#dff2ff" stroke="#0284c7" stroke-width="1.8"/>
        <line x1="78" y1="8" x2="78" y2="38" stroke="#dc2626" stroke-width="1.5"/>
        <line x1="78" y1="38" x2="96" y2="92" stroke="#dc2626" stroke-width="1.5"/>
        <line x1="126" y1="8" x2="126" y2="38" stroke="#dc2626" stroke-width="1.5"/>
        <line x1="126" y1="38" x2="108" y2="92" stroke="#dc2626" stroke-width="1.5"/>
        <rect x="74" y="88" width="56" height="16" fill="#3b638f"/>
        <text x="168" y="82" font-size="8.5" fill="#0369a1">ギャップレス非球面集光</text>
        <text x="168" y="96" font-size="8.5" fill="#475569">実効開口率 ≈ 100%</text>
      `);case"bayer_cfa":return e(`
        <rect x="34" y="28" width="58" height="44" fill="#dc3a44" opacity="0.82"/>
        <rect x="98" y="28" width="58" height="44" fill="#2ca861" opacity="0.82"/>
        <rect x="162" y="28" width="58" height="44" fill="#2ca861" opacity="0.82"/>
        <rect x="226" y="28" width="58" height="44" fill="#2a6ee0" opacity="0.82"/>
        <rect x="92" y="24" width="6" height="54" fill="#334155"/>
        <rect x="156" y="24" width="6" height="54" fill="#334155"/>
        <rect x="220" y="24" width="6" height="54" fill="#334155"/>
        <text x="58" y="54" font-size="11" font-weight="bold" fill="#fff">R</text>
        <text x="120" y="54" font-size="11" font-weight="bold" fill="#fff">G1</text>
        <text x="184" y="54" font-size="11" font-weight="bold" fill="#fff">G2</text>
        <text x="250" y="54" font-size="11" font-weight="bold" fill="#fff">B</text>
        <text x="72" y="98" font-size="8.5" fill="#334155">タングステン光導波路隔壁で斜め混色を遮断</text>
      `);case"bsi_ar":return e(`
        <polygon points="36,84 56,42 76,84 96,42 116,84 136,42 156,84 176,42 196,84 216,42 236,84 256,42 276,84" fill="#3b638f" stroke="#1e3a5f"/>
        <rect x="36" y="84" width="240" height="20" fill="#2b4c70"/>
        <line x1="116" y1="12" x2="108" y2="56" stroke="#eab308" stroke-width="1.8"/>
        <line x1="108" y1="56" x2="128" y2="96" stroke="#eab308" stroke-width="1.8"/>
        <text x="148" y="26" font-size="8.5" fill="#1e293b">モスアイ・ピラミッドナノ凹凸</text>
        <text x="148" y="38" font-size="8" fill="#0369a1">傾斜屈折率で反射率 24% → &lt;1%</text>
      `);case"cross_pd":return e(`
        <!-- Left/Right Split (Vertical line AF) -->
        <rect x="34" y="22" width="46" height="58" rx="3" fill="#5c96d6" stroke="#1d4ed8"/>
        <rect x="84" y="22" width="46" height="58" rx="3" fill="#5c96d6" stroke="#1d4ed8"/>
        <text x="53" y="55" font-size="10" font-weight="bold" fill="#fff">A</text>
        <text x="103" y="55" font-size="10" font-weight="bold" fill="#fff">B</text>
        <text x="38" y="96" font-size="8.5" fill="#334155">左右分割（縦線測距）</text>
        <!-- Top/Bottom Split (Horizontal line AF) -->
        <rect x="184" y="22" width="96" height="27" rx="3" fill="#38bdf8" stroke="#0369a1"/>
        <rect x="184" y="53" width="96" height="27" rx="3" fill="#38bdf8" stroke="#0369a1"/>
        <text x="228" y="39" font-size="10" font-weight="bold" fill="#fff">C</text>
        <text x="228" y="70" font-size="10" font-weight="bold" fill="#fff">D</text>
        <text x="184" y="96" font-size="8.5" fill="#334155">上下分割（横線測距）</text>
        <text x="114" y="112" font-size="8.5" fill="#0d5bd9">Cross-Type Dual Pixel 全画素測距</text>
      `);case"two_layer_gs":return e(`
        <rect x="36" y="14" width="248" height="28" rx="3" fill="#3b638f"/>
        <text x="86" y="31" font-size="9" fill="#fff">上層: 全面フォトダイオード (FWC 2×)</text>
        <rect x="104" y="42" width="16" height="16" fill="#d99b38"/>
        <text x="126" y="53" font-size="8" fill="#92400e">SVG 垂直転送ゲート</text>
        <rect x="36" y="58" width="84" height="32" rx="3" fill="#1e293b"/>
        <text x="46" y="77" font-size="8.5" fill="#38bdf8">GS遮光メモリ</text>
        <rect x="126" y="58" width="76" height="32" rx="3" fill="#c86b3c"/>
        <text x="136" y="77" font-size="8.5" fill="#fff">LOFIC 容量</text>
        <rect x="208" y="58" width="76" height="32" rx="3" fill="#475569"/>
        <text x="214" y="77" font-size="8.5" fill="#fde047">大型Amp Tr</text>
        <text x="64" y="106" font-size="8.5" fill="#334155">下層: 独立トランジスタ層（低RTN・DR &gt; 100 dB）</text>
      `);case"cucu_bond":return e(`
        <rect x="36" y="16" width="248" height="26" fill="#4b5568"/>
        <text x="106" y="33" font-size="9" fill="#fff">画素ウェハー (Pixel Wafer)</text>
        <rect x="36" y="42" width="248" height="28" fill="#e2effa"/>
        ${[68,128,188,248].map(t=>`<rect x="${t-10}" y="42" width="20" height="13" fill="#d87342"/><rect x="${t-10}" y="57" width="20" height="13" fill="#c45c2a"/><line x1="${t-13}" y1="56" x2="${t+13}" y2="56" stroke="#1e293b" stroke-width="1"/>`).join("")}
        <rect x="36" y="70" width="248" height="26" fill="#2d4868"/>
        <text x="100" y="87" font-size="9" fill="#fff">ロジックウェハー (Logic Wafer)</text>
        <text x="72" y="110" font-size="8.5" fill="#9a3412">画素直下 Cu-Cu 直接分子接合（ピッチ 1.5–4 μm）</text>
      `);case"adc_dram":return e(`
        <rect x="26" y="20" width="72" height="36" rx="4" fill="#f1f5f9" stroke="#64748b"/>
        <text x="36" y="36" font-size="8.5" fill="#0f172a">CDS 差分</text>
        <text x="35" y="48" font-size="7.5" fill="#475569">kTCノイズ消去</text>
        <path d="M98 38 L120 38" stroke="#0d5bd9" stroke-width="1.8"/>
        <rect x="120" y="20" width="76" height="36" rx="4" fill="#dbeafe" stroke="#2563eb"/>
        <text x="128" y="36" font-size="8.5" fill="#1d4ed8">列並列 ADC</text>
        <text x="131" y="48" font-size="7.5" fill="#1e40af">14/16-bit 量子化</text>
        <path d="M196 38 L218 38" stroke="#0d5bd9" stroke-width="1.8"/>
        <rect x="218" y="20" width="76" height="36" rx="4" fill="#1e293b"/>
        <text x="234" y="36" font-size="8.5" fill="#38bdf8">DRAM</text>
        <text x="228" y="48" font-size="7.5" fill="#cbd5e1">120fps 一時保持</text>
        <text x="58" y="84" font-size="8.5" fill="#334155">V_CDS = (V_sig + V_kTC) − (V_rst + V_kTC)</text>
        <text x="80" y="99" font-size="8" fill="#64748b">読み出しノイズ &lt; 1.0 e⁻ RMS（HCG時）</text>
      `);case"shutter_cover":return e(`
        <rect x="20" y="14" width="280" height="90" rx="5" fill="#ffffff" stroke="#dbe2eb"/>
        <!-- Front cover wall -->
        <rect x="82" y="20" width="12" height="24" fill="#1e293b"/>
        <rect x="82" y="74" width="12" height="24" fill="#1e293b"/>
        <!-- Narrow blade chamber -->
        <rect x="104" y="22" width="4" height="74" fill="#334155"/>
        <rect x="116" y="20" width="10" height="24" fill="#475569"/>
        <rect x="116" y="74" width="10" height="24" fill="#475569"/>
        <!-- Rays -->
        <line x1="28" y1="59" x2="225" y2="59" stroke="#2563eb" stroke-width="2"/>
        <line x1="28" y1="26" x2="82" y2="34" stroke="#dc2626" stroke-width="1.4" stroke-dasharray="3 2"/>
        <rect x="218" y="34" width="8" height="50" fill="#1d6d7c"/>
        <text x="135" y="32" font-size="8.5" fill="#0f172a">すき間 δ ≈ 0.2 mm（羽根室）</text>
        <text x="135" y="46" font-size="8" fill="#dc2626">斜め迷光を艶消し枠で吸収</text>
        <text x="135" y="76" font-size="8" fill="#2563eb">空気バタつき（フラッター）抑制</text>
        <text x="233" y="62" font-size="8.5" fill="#1d6d7c">センサー面</text>
      `);case"shutter_shield":return e(`
        <!-- Left: Power OFF (Closed Shield) -->
        <rect x="16" y="14" width="134" height="92" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
        <rect x="34" y="34" width="98" height="14" fill="#475569" stroke="#1e293b" stroke-width="0.8"/>
        <rect x="34" y="48" width="98" height="14" fill="#64748b" stroke="#1e293b" stroke-width="0.8"/>
        <rect x="34" y="62" width="98" height="14" fill="#475569" stroke="#1e293b" stroke-width="0.8"/>
        <circle cx="62" cy="24" r="2.2" fill="#dc2626"/>
        <circle cx="96" cy="21" r="1.8" fill="#dc2626"/>
        <path d="M62 26 L62 32 M96 23 L96 32" stroke="#dc2626" stroke-width="1.2"/>
        <text x="30" y="94" font-size="8.5" font-weight="bold" fill="#0f172a">電源OFF：自動閉鎖（防塵）</text>
        <!-- Right: Power ON (Retracted) -->
        <rect x="170" y="14" width="134" height="92" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
        <rect x="188" y="22" width="98" height="10" fill="#475569" stroke="#1e293b" stroke-width="0.8"/>
        <rect x="188" y="36" width="98" height="40" fill="#e0f2fe" stroke="#0284c7" stroke-dasharray="3 2"/>
        <text x="212" y="59" font-size="9" fill="#0369a1">撮影ウィンドウ</text>
        <text x="184" y="94" font-size="8.5" font-weight="bold" fill="#0369a1">電源ON：上部ポケット退避</text>
      `);case"shutter_curtain1":return e(`
        <!-- Expanded 4 blades -->
        <rect x="24" y="16" width="100" height="74" rx="3" fill="#f8fafc" stroke="#94a3b8"/>
        <rect x="30" y="20" width="88" height="16" fill="#1f242d" stroke="#64748b" stroke-width="0.7"/>
        <rect x="30" y="37" width="88" height="16" fill="#2b313c" stroke="#64748b" stroke-width="0.7"/>
        <rect x="30" y="54" width="88" height="16" fill="#1f242d" stroke="#64748b" stroke-width="0.7"/>
        <rect x="30" y="71" width="88" height="15" fill="#2b313c" stroke="#64748b" stroke-width="0.7"/>
        <text x="42" y="105" font-size="8.5" fill="#334155">閉鎖時（縦 24 mm）</text>
        <!-- Arrow -->
        <path d="M134 52 L172 52" stroke="#0d5bd9" stroke-width="2.4"/>
        <polygon points="176,52 167,46 167,58" fill="#0d5bd9"/>
        <text x="132" y="42" font-size="8.5" font-weight="bold" fill="#0d5bd9">約 2.2 ms</text>
        <text x="133" y="68" font-size="8" fill="#475569">時速 40 km!</text>
        <!-- Folded into bottom pocket -->
        <rect x="186" y="16" width="110" height="74" rx="3" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="206" y="48" font-size="9.5" font-weight="bold" fill="#b45309">光がセンサーへ!</text>
        <rect x="192" y="74" width="98" height="14" fill="#1f242d" stroke="#eab308" stroke-width="0.9"/>
        <text x="191" y="105" font-size="8.5" fill="#334155">4枚折り畳み収納（幅 7 mm）</text>
      `);case"shutter_link1":return e(`
        <!-- Parallelogram 4-bar linkage geometry -->
        <rect x="20" y="14" width="280" height="90" rx="5" fill="#ffffff" stroke="#dbe2eb"/>
        <!-- Horizontal blade -->
        <rect x="38" y="34" width="118" height="14" rx="1" fill="#1f242d"/>
        <rect x="38" y="64" width="118" height="14" rx="1" fill="#64748b" opacity="0.45" stroke="#475569" stroke-dasharray="3 2"/>
        <!-- Upper & lower parallel arms -->
        <line x1="146" y1="38" x2="230" y2="28" stroke="#0d5bd9" stroke-width="3.2" stroke-linecap="round"/>
        <line x1="146" y1="45" x2="230" y2="35" stroke="#0284c7" stroke-width="2.4" stroke-linecap="round"/>
        <!-- Lower position ghost arms -->
        <line x1="146" y1="68" x2="230" y2="28" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="3 2"/>
        <line x1="146" y1="75" x2="230" y2="35" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3 2"/>
        <!-- Stationary pivots -->
        <circle cx="230" cy="28" r="3.6" fill="#d4a948" stroke="#1e293b"/>
        <circle cx="230" cy="35" r="3.6" fill="#d4a948" stroke="#1e293b"/>
        <circle cx="146" cy="38" r="2.6" fill="#facc15"/>
        <circle cx="146" cy="45" r="2.6" fill="#facc15"/>
        <text x="42" y="27" font-size="8.5" fill="#0f172a">常に「水平 0°」をキープ!</text>
        <text x="192" y="62" font-size="8" fill="#0d5bd9">平行4節リンク</text>
        <text x="192" y="74" font-size="8" fill="#475569">半径 r₁&gt;r₂&gt;r₃&gt;r₄</text>
        <text x="192" y="86" font-size="8" fill="#475569">4枚同時に折り畳み</text>
      `);case"shutter_midplate":return e(`
        <rect x="20" y="14" width="280" height="90" rx="5" fill="#ffffff" stroke="#dbe2eb"/>
        <!-- Left: 1st curtain chamber -->
        <rect x="44" y="24" width="70" height="68" rx="3" fill="#eff6ff" stroke="#93c5fd"/>
        <rect x="72" y="34" width="12" height="48" fill="#1f242d"/>
        <text x="53" y="102" font-size="8.5" fill="#1d4ed8">先幕の部屋</text>
        <!-- Center: Ultra-thin mid-plate -->
        <rect x="128" y="20" width="8" height="76" fill="#475569"/>
        <text x="108" y="16" font-size="8.5" font-weight="bold" fill="#0f172a">極薄中板 0.15 mm</text>
        <!-- Right: 2nd curtain chamber -->
        <rect x="150" y="24" width="70" height="68" rx="3" fill="#fefce8" stroke="#fde047"/>
        <rect x="178" y="34" width="12" height="48" fill="#56657c"/>
        <text x="160" y="102" font-size="8.5" fill="#a16207">後幕の部屋</text>
        <!-- Notes -->
        <text x="228" y="42" font-size="8" fill="#334155">時速40 kmの</text>
        <text x="228" y="54" font-size="8" fill="#334155">すれ違い衝突</text>
        <text x="228" y="66" font-size="8" fill="#dc2626">＆空気渦を遮断</text>
        <text x="228" y="82" font-size="8" fill="#0284c7">間隔 Δz≈0.5mm</text>
      `);case"shutter_curtain2":return e(`
        <!-- 3-step visual of 1/8000s Slit Exposure! -->
        <!-- Step 1 -->
        <rect x="14" y="18" width="64" height="66" rx="3" fill="#fffbeb" stroke="#cbd5e1"/>
        <rect x="16" y="34" width="60" height="48" fill="#1f242d"/>
        <rect x="16" y="20" width="60" height="6" fill="#56657c"/>
        <rect x="16" y="26" width="60" height="8" fill="#fbbf24" opacity="0.75"/>
        <text x="24" y="13" font-size="8" fill="#334155">① 上端スキャン</text>
        <!-- Step 2 -->
        <rect x="92" y="18" width="64" height="66" rx="3" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.3"/>
        <rect x="94" y="20" width="60" height="26" fill="#56657c"/>
        <rect x="94" y="55" width="60" height="27" fill="#1f242d"/>
        <rect x="94" y="46" width="60" height="9" fill="#fbbf24" opacity="0.9"/>
        <text x="100" y="13" font-size="8" font-weight="bold" fill="#b45309">② 光のスリット</text>
        <!-- Step 3 -->
        <rect x="170" y="18" width="64" height="66" rx="3" fill="#fffbeb" stroke="#cbd5e1"/>
        <rect x="172" y="20" width="60" height="48" fill="#56657c"/>
        <rect x="172" y="76" width="60" height="6" fill="#1f242d"/>
        <rect x="172" y="68" width="60" height="8" fill="#fbbf24" opacity="0.75"/>
        <text x="179" y="13" font-size="8" fill="#334155">③ 下端で完了</text>
        <!-- Right callout -->
        <text x="242" y="34" font-size="8.5" font-weight="bold" fill="#b45309">1/8000秒時</text>
        <text x="242" y="48" font-size="8.5" fill="#0f172a">すき間幅</text>
        <text x="242" y="61" font-size="9.5" font-weight="bold" fill="#0d5bd9">約 1.3 mm!</text>
        <text x="242" y="76" font-size="7.5" fill="#475569">後幕が0.125ms後</text>
        <text x="242" y="86" font-size="7.5" fill="#475569">を全力追跡</text>
        <text x="16" y="102" font-size="8" fill="#475569">全開フラッシュ同調は最速1/400秒まで・メカ前後幕ならF1.2丸ボケも欠けない!</text>
      `);case"shutter_link2":return e(`
        <!-- Synchronized travel curve graph: Curtain 1 & Curtain 2 parallel trajectories -->
        <line x1="34" y1="92" x2="296" y2="92" stroke="#94a3b8" stroke-width="1"/>
        <line x1="34" y1="16" x2="34" y2="92" stroke="#94a3b8" stroke-width="1"/>
        <!-- Curtain 1 curve -->
        <path d="M52 22 C82 22, 118 84, 152 86" fill="none" stroke="#1f242d" stroke-width="2.4"/>
        <!-- Curtain 2 parallel curve shifted by Δt -->
        <path d="M108 22 C138 22, 174 84, 208 86" fill="none" stroke="#0d5bd9" stroke-width="2.4"/>
        <!-- Constant Δt arrows -->
        <line x1="88" y1="42" x2="144" y2="42" stroke="#f59e0b" stroke-width="2"/>
        <line x1="114" y1="68" x2="170" y2="68" stroke="#f59e0b" stroke-width="2"/>
        <text x="150" y="45" font-size="8.5" font-weight="bold" fill="#b45309">Δt 一定（上端）</text>
        <text x="176" y="71" font-size="8.5" font-weight="bold" fill="#b45309">Δt 一定（下端）</text>
        <text x="42" y="106" font-size="8.5" fill="#334155">時間 t →（速度カーブ完全一致 ＝ 画面全域で明るさムラゼロ）</text>
        <text x="8" y="30" font-size="8" fill="#475569">上</text>
        <text x="8" y="84" font-size="8" fill="#475569">下</text>
      `);case"shutter_dual_drive":return e(`
        <!-- Hybrid Spring + Electromagnetic Booster Diagram -->
        <rect x="18" y="20" width="96" height="58" rx="6" fill="#f8fafc" stroke="#64748b"/>
        <text x="32" y="41" font-size="9" font-weight="bold" fill="#0f172a">高張力バネ</text>
        <text x="27" y="56" font-size="8" fill="#475569">軽快・50万回耐久</text>
        <text x="34" y="69" font-size="8" fill="#475569">通常ベース動力</text>
        <text x="122" y="55" font-size="16" font-weight="bold" fill="#0d5bd9">+</text>
        <rect x="140" y="20" width="96" height="58" rx="6" fill="#eff6ff" stroke="#2563eb"/>
        <text x="150" y="41" font-size="9" font-weight="bold" fill="#1d4ed8">電磁ブースター</text>
        <text x="148" y="56" font-size="8" fill="#1e40af">銅コイル＋磁石</text>
        <text x="148" y="69" font-size="8" fill="#1e40af">ローレンツ力加速</text>
        <path d="M240 49 L258 49" stroke="#d97706" stroke-width="2.4"/>
        <polygon points="262,49 254,44 254,54" fill="#d97706"/>
        <rect x="262" y="22" width="46" height="54" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="268" y="45" font-size="9" font-weight="bold" fill="#b45309">1/400</text>
        <text x="272" y="60" font-size="8" fill="#b45309">秒同調</text>
        <text x="58" y="102" font-size="8.5" fill="#334155">デュアル駆動：普段は優しく長寿命、必要時はターボ加速!</text>
      `);case"shutter_magnets":return e(`
        <!-- Electronic Solenoid Pulse Timing Diagram -->
        <text x="18" y="34" font-size="8.5" font-weight="bold" fill="#1f242d">先幕電磁石</text>
        <path d="M84 22 L138 22 L138 42 L292 42" fill="none" stroke="#1f242d" stroke-width="2.2"/>
        <text x="90" y="18" font-size="7.5" fill="#0284c7">通電ON（保持）</text>
        <text x="144" y="36" font-size="7.5" fill="#dc2626">OFF → 発射!</text>

        <text x="18" y="76" font-size="8.5" font-weight="bold" fill="#0d5bd9">後幕電磁石</text>
        <path d="M84 62 L212 62 L212 82 L292 82" fill="none" stroke="#0d5bd9" stroke-width="2.2"/>
        <text x="128" y="58" font-size="7.5" fill="#0284c7">通電ON（保持）</text>
        <text x="218" y="76" font-size="7.5" fill="#dc2626">OFF → 追跡!</text>

        <!-- Δt timing bracket -->
        <line x1="138" y1="42" x2="138" y2="96" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="3 2"/>
        <line x1="212" y1="82" x2="212" y2="96" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="3 2"/>
        <line x1="140" y1="94" x2="210" y2="94" stroke="#f59e0b" stroke-width="2.2"/>
        <text x="108" y="108" font-size="8.5" font-weight="bold" fill="#b45309">Δt = シャッター速度（1/8000s = 125 μs）</text>
      `);case"shutter_charge_motor":return e(`
        <rect x="18" y="24" width="68" height="48" rx="6" fill="#f1f5f9" stroke="#64748b"/>
        <text x="26" y="44" font-size="8.5" font-weight="bold" fill="#0f172a">コアレスDC</text>
        <text x="31" y="58" font-size="8" fill="#475569">超高速起動</text>
        <path d="M88 48 L108 48" stroke="#0d5bd9" stroke-width="2"/>
        <circle cx="132" cy="48" r="18" fill="#fef3c7" stroke="#d97706" stroke-width="2" stroke-dasharray="4 2"/>
        <circle cx="164" cy="48" r="13" fill="#e2e8f0" stroke="#475569" stroke-width="2" stroke-dasharray="3 2"/>
        <text x="118" y="84" font-size="8" fill="#92400e">減速ギア (30:1)</text>
        <path d="M180 48 L202 48" stroke="#0d5bd9" stroke-width="2"/>
        <rect x="204" y="24" width="98" height="48" rx="6" fill="#eff6ff" stroke="#2563eb"/>
        <text x="216" y="44" font-size="8.5" font-weight="bold" fill="#1d4ed8">偏心チャージカム</text>
        <text x="213" y="58" font-size="8" fill="#1e40af">約0.03秒でバネ再装填</text>
        <text x="48" y="104" font-size="8.5" fill="#334155">1枚撮るたびに自動巻き上げ → 秒間 10–15 コマ連写を実現!</text>
      `);case"shutter_opt_sensor":return e(`
        <!-- IR Photo-Interrupter Closed-Loop Calibration -->
        <rect x="22" y="22" width="44" height="52" rx="4" fill="#1e293b"/>
        <text x="29" y="44" font-size="8" fill="#fda4af">940nm</text>
        <text x="30" y="56" font-size="8" fill="#fff">IR LED</text>
        <!-- IR beam -->
        <line x1="66" y1="48" x2="132" y2="48" stroke="#e11d48" stroke-width="2.2" stroke-dasharray="4 2"/>
        <!-- Curtain passing through beam -->
        <rect x="94" y="20" width="10" height="58" fill="#334155" stroke="#eab308"/>
        <rect x="132" y="22" width="44" height="52" rx="4" fill="#334155"/>
        <text x="138" y="45" font-size="8" fill="#e2e8f0">受光素子</text>
        <text x="142" y="58" font-size="8" fill="#38bdf8">時刻計測</text>
        <!-- Feedback arrow to CPU -->
        <path d="M176 48 L204 48" stroke="#0d5bd9" stroke-width="2"/>
        <rect x="206" y="22" width="96" height="52" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="216" y="42" font-size="8.5" font-weight="bold" fill="#1d4ed8">自動補正 CPU</text>
        <text x="214" y="56" font-size="7.5" fill="#1e40af">寒冷・摩耗ズレを</text>
        <text x="214" y="67" font-size="7.5" fill="#1e40af">毎回 μs 単位修正!</text>
        <text x="34" y="100" font-size="8.5" fill="#be123c">羽根が赤外線を遮る時刻を実測 → 50万回まで精度維持</text>
      `);case"shutter_damper":return e(`
        <!-- Left: Rebound Brake Damper -->
        <rect x="16" y="16" width="136" height="86" rx="5" fill="#fff5f5" stroke="#fecaca"/>
        <rect x="30" y="34" width="52" height="12" fill="#1f242d"/>
        <path d="M84 40 L106 40" stroke="#dc2626" stroke-width="2"/>
        <polygon points="110,40 102,35 102,45" fill="#dc2626"/>
        <rect x="112" y="24" width="24" height="44" rx="4" fill="#c44536"/>
        <text x="28" y="64" font-size="8" fill="#7f1d1d">時速40kmを跳ね返り</text>
        <text x="28" y="76" font-size="8" font-weight="bold" fill="#b91c1c">ゼロで吸収（e → 0）</text>
        <text x="28" y="94" font-size="8.5" font-weight="bold" fill="#991b1b">バウンド防止ブレーキ</text>
        <!-- Right: Floating Anti-Vib Silicone Mount -->
        <rect x="168" y="16" width="136" height="86" rx="5" fill="#eff6ff" stroke="#bfdbfe"/>
        <rect x="182" y="30" width="108" height="36" rx="4" fill="#334155"/>
        <circle cx="192" cy="40" r="6" fill="#2563eb"/>
        <circle cx="280" cy="40" r="6" fill="#2563eb"/>
        <circle cx="192" cy="56" r="6" fill="#2563eb"/>
        <circle cx="280" cy="56" r="6" fill="#2563eb"/>
        <text x="206" y="51" font-size="8" fill="#ffffff">ゴム懸架で絶縁</text>
        <text x="180" y="82" font-size="8" fill="#1e40af">IBIS・ボディへの微ブレ遮断</text>
        <text x="178" y="94" font-size="8.5" font-weight="bold" fill="#1d4ed8">4点フローティング防振</text>
      `);case"mb_vapor":return e(`
        <!-- Two-Phase Copper Vapor Chamber Cross-Section -->
        <rect x="22" y="18" width="276" height="44" rx="5" fill="#fff7ed" stroke="#c2410c" stroke-width="2"/>
        <!-- Capillary copper wick lining -->
        <rect x="26" y="54" width="268" height="5" fill="#ea580c" opacity="0.45"/>
        <rect x="26" y="21" width="268" height="4" fill="#ea580c" opacity="0.35"/>
        <!-- Vapor arrows rising from hot ISP center to cool ends -->
        <path d="M160 52 L160 32 L54 32 M160 32 L266 32" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="4 2"/>
        <polygon points="50,32 58,28 58,36" fill="#dc2626"/>
        <polygon points="270,32 262,28 262,36" fill="#dc2626"/>
        <!-- Liquid return along wick -->
        <path d="M44 56 L146 56 M276 56 L174 56" fill="none" stroke="#0284c7" stroke-width="1.8"/>
        <!-- TIM pad & 4nm ISP beneath -->
        <rect x="116" y="62" width="88" height="10" fill="#f472b6"/>
        <rect x="122" y="72" width="76" height="20" rx="2" fill="#0f766e"/>
        <text x="130" y="85" font-size="8.5" font-weight="bold" fill="#fff">4nm ISP 発熱源</text>
        <text x="68" y="29" font-size="8" font-weight="bold" fill="#b91c1c">蒸気（高速拡散）</text>
        <text x="192" y="29" font-size="8" font-weight="bold" fill="#b91c1c">潜熱輸送 k≈10,000</text>
        <text x="48" y="49" font-size="7.5" fill="#0369a1">凝縮液→毛細管還流</text>
        <text x="210" y="71" font-size="7.5" fill="#be185d">ピンク TIM パッド</text>
        <text x="58" y="108" font-size="8.5" fill="#334155">密閉二相蒸発サイクル：ファンレスで 8K60p 連続放熱!</text>
      `);case"mb_emi":return e(`
        <!-- Multi-Compartment Faraday Cage -->
        <rect x="24" y="22" width="272" height="62" rx="4" fill="#f8fafc" stroke="#475569" stroke-width="2.4"/>
        <line x1="114" y1="22" x2="114" y2="84" stroke="#475569" stroke-width="2.4"/>
        <line x1="206" y1="22" x2="206" y2="84" stroke="#475569" stroke-width="2.4"/>
        <rect x="44" y="48" width="50" height="26" rx="2" fill="#0f766e"/>
        <text x="54" y="64" font-size="8.5" fill="#fff">ISP SoC</text>
        <rect x="136" y="48" width="50" height="26" rx="2" fill="#6d28d9"/>
        <text x="147" y="64" font-size="8.5" fill="#fff">AI NPU</text>
        <rect x="226" y="48" width="50" height="26" rx="2" fill="#0284c7"/>
        <text x="234" y="64" font-size="8.5" fill="#fff">Wi-Fi 6E</text>
        <!-- EMI waves bounced back by walls -->
        <path d="M96 42 Q103 36 110 42" fill="none" stroke="#dc2626" stroke-width="1.6"/>
        <path d="M222 42 Q215 36 209 42" fill="none" stroke="#dc2626" stroke-width="1.6"/>
        <!-- Ground pins -->
        <rect x="24" y="84" width="272" height="8" fill="#e2b648"/>
        <text x="96" y="91" font-size="7.5" font-weight="bold" fill="#1e293b">低インピーダンス多点グラウンド接地 (GND)</text>
        <text x="54" y="108" font-size="8.5" fill="#334155">洋白金属ファラデーケージ：高周波ノイズを 60 dB 以上遮断</text>
      `);case"mb_ihs":return e(`
        <!-- Hotspot Heat Spreading through Copper IHS -->
        <rect x="40" y="18" width="240" height="22" rx="3" fill="#d97d4e" stroke="#9a3412"/>
        <text x="86" y="33" font-size="9" font-weight="bold" fill="#fff">ニッケルメッキ銅 IHS（広域熱拡散）</text>
        <rect x="96" y="40" width="128" height="8" fill="#62a8d8"/>
        <rect x="104" y="48" width="112" height="26" rx="2" fill="#0f766e"/>
        <rect x="142" y="52" width="36" height="18" rx="2" fill="#ef4444" opacity="0.85"/>
        <text x="146" y="64" font-size="8" font-weight="bold" fill="#fff">局所熱</text>
        <!-- Spreading arrows -->
        <path d="M160 50 L160 36 M160 36 L82 22 M160 36 L238 22" fill="none" stroke="#fef08a" stroke-width="2"/>
        <rect x="64" y="74" width="192" height="12" fill="#164a41"/>
        <text x="98" y="83" font-size="7.5" fill="#d1fae5">FC-BGA パッケージ基板</text>
        <text x="48" y="104" font-size="8.5" fill="#334155">局所 50 W/cm² 超の熱を銅蓋で水平拡散＆ダイ割れ防止</text>
      `);case"mb_isp_die":return e(`
        <!-- Dual-Stream 16-bit Linear RAW ISP Pipeline -->
        <rect x="12" y="36" width="52" height="40" rx="4" fill="#cffafe" stroke="#0891b2"/>
        <text x="17" y="53" font-size="8" font-weight="bold" fill="#155e75">SLVS-EC</text>
        <text x="17" y="65" font-size="7.5" fill="#0e7490">160 Gbps</text>
        <path d="M64 56 L82 56" stroke="#0891b2" stroke-width="2"/>
        <rect x="82" y="28" width="76" height="56" rx="5" fill="#0f766e"/>
        <text x="91" y="45" font-size="8.5" font-weight="bold" fill="#fff">16-bit RAW</text>
        <text x="90" y="58" font-size="7.5" fill="#ccfbf1">デモザイク</text>
        <text x="90" y="70" font-size="7.5" fill="#ccfbf1">3D-LUT 色変換</text>
        <!-- Dual Stream Split -->
        <path d="M158 44 L184 32 M158 68 L184 80" stroke="#0d5bd9" stroke-width="2.2"/>
        <rect x="184" y="16" width="122" height="32" rx="4" fill="#1d4ed8"/>
        <text x="192" y="30" font-size="8" font-weight="bold" fill="#fff">① 記録ストリーム</text>
        <text x="192" y="42" font-size="7.5" fill="#dbeafe">8K60p / 120fps RAW</text>
        <rect x="184" y="62" width="122" height="32" rx="4" fill="#0284c7"/>
        <text x="192" y="76" font-size="8" font-weight="bold" fill="#fff">② EVF専用ストリーム</text>
        <text x="192" y="88" font-size="7.5" fill="#e0f2fe">遅延ゼロ・暗転なし表示!</text>
        <text x="48" y="109" font-size="8.5" fill="#334155">デュアルストリーム構造で連写中も完全ブラックアウトフリー</text>
      `);case"mb_interposer":return e(`
        <!-- Flip-Chip BGA Cross Section -->
        <rect x="76" y="14" width="168" height="20" rx="2" fill="#0f766e"/>
        <text x="112" y="27" font-size="8.5" font-weight="bold" fill="#fff">4nm ISP シリコンダイ</text>
        <!-- Underfill + Cu Pillar Micro-Bumps -->
        <rect x="72" y="34" width="176" height="14" fill="#334155" opacity="0.35"/>
        ${[88,106,124,142,160,178,196,214,232].map(t=>`<rect x="${t-3}" y="34" width="6" height="14" fill="#d87342"/>`).join("")}
        <text x="252" y="44" font-size="7.5" fill="#9a3412">Cuマイクロ</text>
        <!-- ABF RDL Interposer Substrate -->
        <rect x="44" y="48" width="232" height="22" rx="2" fill="#164a41"/>
        <text x="80" y="62" font-size="8.5" fill="#d1fae5">多層 ABF ビルドアップ再配線基板 (RDL)</text>
        <!-- SnAgCu Solder Balls -->
        ${[64,96,128,160,192,224,256].map(t=>`<circle cx="${t}" cy="78" r="6.5" fill="#cbd5e1" stroke="#475569"/>`).join("")}
        <!-- HDI Mainboard -->
        <rect x="24" y="86" width="272" height="14" rx="2" fill="#0e5a44"/>
        <text x="72" y="96" font-size="8" fill="#fef08a">12層 HDI メインマザーボード (0.4 mm ピッチ)</text>
        <text x="68" y="112" font-size="8" fill="#334155">直下接続で寄生インダクタンス約 1/10・アンダーフィル保護</text>
      `);case"mb_ai_npu":return e(`
        <!-- 2D Systolic Array MAC Grid -->
        <rect x="18" y="16" width="124" height="78" rx="5" fill="#f5f3ff" stroke="#7c3aed"/>
        ${[0,1,2,3].flatMap(t=>[0,1,2,3].map(n=>`<rect x="${30+n*26}" y="${24+t*16}" width="20" height="12" rx="2" fill="#6d28d9" opacity="${(.55+(t+n)%4*.14).toFixed(2)}"/>`)).join("")}
        <text x="24" y="106" font-size="8.5" font-weight="bold" fill="#5b21b6">2D シストリックアレイ (MAC)</text>
        <!-- Flow arrows into AI outputs -->
        <path d="M146 54 L168 54" stroke="#7c3aed" stroke-width="2.4"/>
        <polygon points="172,54 164,49 164,59" fill="#7c3aed"/>
        <rect x="174" y="16" width="130" height="24" rx="4" fill="#ede9fe" stroke="#8b5cf6"/>
        <text x="184" y="31" font-size="8.5" font-weight="bold" fill="#4c1d95">骨格姿勢推定 AF (120Hz)</text>
        <rect x="174" y="44" width="130" height="24" rx="4" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="184" y="59" font-size="8.5" font-weight="bold" fill="#075985">カメラ内 AI ノイズ低減</text>
        <rect x="174" y="72" width="130" height="24" rx="4" fill="#fef3c7" stroke="#d97706"/>
        <text x="184" y="87" font-size="8.5" font-weight="bold" fill="#92400e">カメラ内 4× 超解像 (96MP)</text>
        <text x="176" y="108" font-size="7.5" fill="#475569">INT8 量子化推論で高効率・超低遅延</text>
      `);case"mb_lpddr5x":return e(`
        <!-- Pre-Capture Ring Buffer Diagram -->
        <circle cx="88" cy="54" r="32" fill="none" stroke="#cbd5e1" stroke-width="10"/>
        <path d="M88 22 A32 32 0 1 1 58 66" fill="none" stroke="#2563eb" stroke-width="10" stroke-linecap="round"/>
        <text x="64" y="51" font-size="8.5" font-weight="bold" fill="#1d4ed8">リング</text>
        <text x="62" y="63" font-size="8" fill="#1e40af">バッファ</text>
        <text x="34" y="104" font-size="8.5" fill="#1d4ed8">LPDDR5X (68 GB/s)</text>
        <!-- Arrow to CFexpress on shutter press -->
        <path d="M126 54 L172 54" stroke="#d97706" stroke-width="2.4"/>
        <polygon points="176,54 168,49 168,59" fill="#d97706"/>
        <text x="128" y="44" font-size="8" font-weight="bold" fill="#b45309">全押し!</text>
        <rect x="178" y="20" width="126" height="68" rx="6" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="188" y="38" font-size="9" font-weight="bold" fill="#92400e">プリ撮影タイムマシン</text>
        <text x="188" y="54" font-size="8" fill="#334155">半押し中に最新1秒分の</text>
        <text x="188" y="66" font-size="8" fill="#334155">RAWを常時メモリ保持し</text>
        <text x="188" y="78" font-size="8" font-weight="bold" fill="#b45309">最大1秒前まで遡及保存!</text>
      `);case"mb_pmic":return e(`
        <!-- Multi-Phase Buck Ripple Cancellation -->
        <rect x="16" y="20" width="60" height="58" rx="4" fill="#fef3c7" stroke="#d97706"/>
        <text x="24" y="44" font-size="8.5" font-weight="bold" fill="#92400e">電池</text>
        <text x="24" y="58" font-size="9" font-weight="bold" fill="#b45309">7.2 V</text>
        <path d="M76 49 L98 49" stroke="#475569" stroke-width="2"/>
        <!-- 4-phase shifted waves -->
        <rect x="100" y="18" width="118" height="62" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
        <path d="M106 42 L120 26 L134 42 L148 26 L162 42 L176 26 L190 42 L204 26" fill="none" stroke="#93c5fd" stroke-width="1.4"/>
        <path d="M106 26 L120 42 L134 26 L148 42 L162 26 L176 42 L190 26 L204 42" fill="none" stroke="#60a5fa" stroke-width="1.4"/>
        <line x1="106" y1="62" x2="210" y2="62" stroke="#0d5bd9" stroke-width="2.6"/>
        <text x="112" y="74" font-size="7.5" font-weight="bold" fill="#0d5bd9">合成出力：リップル &lt;10mV!</text>
        <path d="M218 49 L238 49" stroke="#0d5bd9" stroke-width="2"/>
        <rect x="240" y="20" width="66" height="58" rx="4" fill="#eff6ff" stroke="#2563eb"/>
        <text x="248" y="42" font-size="8.5" font-weight="bold" fill="#1d4ed8">4nm ISP</text>
        <text x="248" y="57" font-size="9" font-weight="bold" fill="#0f172a">0.75 V</text>
        <text x="250" y="69" font-size="7.5" fill="#1e40af">効率 95%</text>
        <text x="36" y="102" font-size="8.5" fill="#334155">多相同期整流（90°位相差）で波を相殺し鏡のように安定した給電</text>
      `);case"mb_cfexpress":return e(`
        <!-- Storage Bandwidth Bar Comparison -->
        <text x="18" y="28" font-size="8.5" fill="#475569">SD UHS-II</text>
        <rect x="108" y="18" width="22" height="14" rx="2" fill="#94a3b8"/>
        <text x="136" y="29" font-size="8.5" fill="#475569">312 MB/s</text>

        <text x="18" y="54" font-size="8.5" fill="#334155">CFexpress 2.0 B</text>
        <rect x="108" y="44" width="96" height="14" rx="2" fill="#0284c7"/>
        <text x="210" y="55" font-size="8.5" fill="#0369a1">2,000 MB/s</text>

        <text x="18" y="80" font-size="8.5" font-weight="bold" fill="#b45309">CFexpress 4.0 B</text>
        <rect x="108" y="70" width="192" height="16" rx="3" fill="#f59e0b"/>
        <text x="172" y="81" font-size="8.5" font-weight="bold" fill="#fff">4,000 MB/s (12.8×!)</text>

        <text x="26" y="104" font-size="8.5" fill="#334155">PCIe Gen4 ×2 / NVMe 1.4c 直結 → 8K60p RAW ＆ 120fps無限連写</text>
      `);case"mb_imu_mcu":return e(`
        <!-- 6-Axis Quartz IMU + Coordinated 8.5-Stop IBIS/OIS -->
        <rect x="16" y="24" width="84" height="58" rx="5" fill="#fefce8" stroke="#ca8a04"/>
        <text x="24" y="42" font-size="8.5" font-weight="bold" fill="#854d0e">6軸水晶IMU</text>
        <text x="24" y="56" font-size="7.5" fill="#713f12">コリオリ力検出</text>
        <text x="24" y="69" font-size="8" font-weight="bold" fill="#a16207">2,000 Hz計測</text>
        <path d="M100 53 L122 53" stroke="#0d5bd9" stroke-width="2"/>
        <rect x="122" y="28" width="64" height="50" rx="5" fill="#1e293b"/>
        <text x="131" y="48" font-size="8.5" font-weight="bold" fill="#38bdf8">制御MCU</text>
        <text x="130" y="63" font-size="7.5" fill="#e2e8f0">PID最適配分</text>
        <path d="M186 42 L208 32 M186 64 L208 74" stroke="#0d5bd9" stroke-width="2"/>
        <rect x="210" y="16" width="96" height="30" rx="4" fill="#dbeafe" stroke="#2563eb"/>
        <text x="218" y="34" font-size="8.5" font-weight="bold" fill="#1d4ed8">ボディ 5軸IBIS</text>
        <rect x="210" y="58" width="96" height="30" rx="4" fill="#dcfce7" stroke="#16a34a"/>
        <text x="218" y="76" font-size="8.5" font-weight="bold" fill="#15803d">レンズ側 OIS</text>
        <text x="48" y="106" font-size="8.5" fill="#334155">ボディ＋レンズ協調制御で最大 8.5 段の手ブレ補正を実現!</text>
      `);case"mb_security_clock":return e(`
        <!-- Left: C2PA Cryptographic Signing -->
        <rect x="14" y="16" width="144" height="86" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="24" y="33" font-size="8.5" font-weight="bold" fill="#166534">C2PA 真正性署名チップ</text>
        <rect x="24" y="42" width="44" height="24" rx="3" fill="#1e293b"/>
        <text x="31" y="57" font-size="8" fill="#fff">RAW</text>
        <path d="M68 54 L86 54" stroke="#16a34a" stroke-width="2"/>
        <rect x="86" y="42" width="62" height="24" rx="3" fill="#16a34a"/>
        <text x="92" y="57" font-size="8" font-weight="bold" fill="#fff">ECDSA署名</text>
        <text x="22" y="82" font-size="7.5" fill="#15803d">撮影瞬間に秘密鍵で電子印</text>
        <text x="22" y="94" font-size="7.5" fill="#15803d">AI偽造・改ざんを即検出!</text>
        <!-- Right: TCXO ±0.5 ppm Clock -->
        <rect x="166" y="16" width="140" height="86" rx="5" fill="#fffbeb" stroke="#d97706"/>
        <text x="176" y="33" font-size="8.5" font-weight="bold" fill="#92400e">TCXO ±0.5 ppm 水晶</text>
        <path d="M178 72 Q218 42 292 78" fill="none" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="3 2"/>
        <line x1="178" y1="58" x2="292" y2="58" stroke="#d97706" stroke-width="2.4"/>
        <text x="180" y="51" font-size="7.5" font-weight="bold" fill="#b45309">温度補償で周波数フラット!</text>
        <text x="176" y="93" font-size="7.5" fill="#78350f">8K長時間収録も音ズレゼロ</text>
      `);case"mb_io_ports":return e(`
        <!-- External High-Speed I/O + ESD TVS Protection -->
        <rect x="18" y="14" width="96" height="20" rx="3" fill="#334155"/>
        <text x="26" y="27" font-size="8" fill="#fff">2.5GBASE-T LAN</text>
        <rect x="18" y="38" width="96" height="20" rx="3" fill="#1d4ed8"/>
        <text x="26" y="51" font-size="8" fill="#fff">HDMI 2.1 (48Gbps)</text>
        <rect x="18" y="62" width="96" height="20" rx="3" fill="#0f766e"/>
        <text x="26" y="75" font-size="8" fill="#fff">USB-C 10Gbps PD</text>
        <rect x="18" y="86" width="96" height="20" rx="3" fill="#b45309"/>
        <text x="26" y="99" font-size="8" fill="#fff">3.5mm 24bit 音声</text>
        <!-- ESD Surge Shield Wall -->
        <line x1="114" y1="48" x2="218" y2="48" stroke="#0d5bd9" stroke-width="2"/>
        <rect x="136" y="18" width="56" height="84" rx="4" fill="#fef2f2" stroke="#dc2626" stroke-dasharray="3 2"/>
        <text x="142" y="42" font-size="8" font-weight="bold" fill="#b91c1c">TVS避雷</text>
        <text x="144" y="55" font-size="7.5" fill="#dc2626">±15 kV</text>
        <text x="142" y="67" font-size="7.5" fill="#dc2626">静電気を</text>
        <text x="143" y="79" font-size="7.5" fill="#dc2626">GNDへ逃す</text>
        <rect x="218" y="26" width="84" height="60" rx="5" fill="#0f766e"/>
        <text x="234" y="52" font-size="9" font-weight="bold" fill="#fff">4nm ISP</text>
        <text x="232" y="67" font-size="8" fill="#ccfbf1">安全に保護!</text>
      `);case"mb_rf_wifi":return e(`
        <!-- 2x2 MIMO Tri-Band Wi-Fi 6E/7 Coax Antenna Architecture -->
        <rect x="18" y="24" width="86" height="62" rx="5" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="28" y="44" font-size="8.5" font-weight="bold" fill="#0369a1">Wi-Fi 6E/7</text>
        <text x="28" y="58" font-size="8" fill="#075985">2.4/5/6 GHz</text>
        <text x="28" y="72" font-size="8" fill="#075985">+ BT 5.3 SiP</text>
        <!-- Dual 50-ohm Coax Cables -->
        <path d="M104 40 C138 40, 146 28, 182 28" fill="none" stroke="#d27a44" stroke-width="3"/>
        <path d="M104 70 C138 70, 146 82, 182 82" fill="none" stroke="#d27a44" stroke-width="3"/>
        <text x="116" y="58" font-size="7.5" font-weight="bold" fill="#9a3412">50Ω同軸×2</text>
        <!-- Dual MIMO Antennas -->
        <rect x="182" y="18" width="44" height="22" rx="3" fill="#1e293b"/>
        <text x="189" y="32" font-size="8" fill="#38bdf8">ANT 1</text>
        <rect x="182" y="70" width="44" height="22" rx="3" fill="#1e293b"/>
        <text x="189" y="84" font-size="8" fill="#38bdf8">ANT 2</text>
        <!-- 2x2 MIMO Waves -->
        <path d="M236 22 Q246 29 236 36 M244 18 Q258 29 244 40" fill="none" stroke="#0284c7" stroke-width="1.8"/>
        <path d="M236 74 Q246 81 236 88 M244 70 Q258 81 244 92" fill="none" stroke="#0284c7" stroke-width="1.8"/>
        <text x="256" y="54" font-size="8.5" font-weight="bold" fill="#0369a1">2×2 MIMO</text>
        <text x="256" y="67" font-size="7.5" fill="#475569">高速FTP送信</text>
        <text x="28" y="106" font-size="8" fill="#334155">金属ボディ外側の樹脂窓アンテナへ同軸給電し電波を空間多重</text>
      `);case"mb_hdi_pcb":return e(`
        <!-- 12-Layer Any-Layer HDI Microvia Cross Section -->
        <rect x="24" y="16" width="272" height="72" rx="3" fill="#124939" stroke="#0e3b2e"/>
        ${[0,1,2,3,4,5,6,7,8,9,10,11].map(t=>{const n=21+t*5.6,s=t===1||t===4||t===7||t===10?"#eab308":"#d97742";return`<rect x="28" y="${n.toFixed(1)}" width="264" height="2.2" fill="${s}"/>`}).join("")}
        <!-- Stacked UV Laser Copper-Filled Microvias (Any-Layer!) -->
        <rect x="86" y="21" width="7" height="24" fill="#facc15" stroke="#1e293b" stroke-width="0.6"/>
        <rect x="136" y="38" width="7" height="28" fill="#facc15" stroke="#1e293b" stroke-width="0.6"/>
        <rect x="212" y="21" width="7" height="62" fill="#facc15" stroke="#1e293b" stroke-width="0.6"/>
        <text x="26" y="101" font-size="8.5" font-weight="bold" fill="#0e5a44">12層エニーレイヤーHDI：直径50μmレーザー銅充填ビアで任意層直結</text>
        <text x="58" y="113" font-size="8" fill="#475569">SLVS-EC 100Ω ＆ PCIe Gen4 85Ω 等長差動インピーダンス整合</text>
      `);case"mb_b2b":return e(`
        <!-- G-S-S-G Differential Shielded Pinout + ZIF Flip-Lock -->
        <rect x="16" y="18" width="144" height="78" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
        <text x="26" y="34" font-size="8.5" font-weight="bold" fill="#0f172a">80ピン G-S-S-G 差動配列</text>
        ${["G","S+","S−","G","S+","S−","G"].map((t,n)=>{const s=24+n*19;return`<rect x="${s}" y="44" width="15" height="24" rx="2" fill="${t==="G"?"#475569":"#0284c7"}"/><text x="${s+3}" y="59" font-size="7.5" fill="#fff">${t}</text>`}).join("")}
        <text x="24" y="85" font-size="7.5" fill="#475569">信号対をGNDで挟み160Gbps保護</text>
        <!-- Right: ZIF Flip Lock -->
        <rect x="170" y="18" width="136" height="78" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="180" y="34" font-size="8.5" font-weight="bold" fill="#92400e">ZIF フリップロック</text>
        <rect x="184" y="62" width="108" height="10" fill="#c76414"/>
        <rect x="206" y="46" width="64" height="16" rx="2" fill="#1e293b"/>
        <text x="215" y="57" font-size="7.5" fill="#fde047">押え蓋ロック</text>
        <text x="180" y="86" font-size="7.5" fill="#78350f">EVF/LCD/レンズ等 全12系統</text>
        <text x="64" y="110" font-size="8" fill="#334155">0.3mm狭ピッチ金端子でカメラ全身の神経リボンを確実圧接</text>
      `);case"mb_chassis":return e(`
        <!-- Thermal Isolation Wall between Sensor Bay and ISP Bay -->
        <rect x="16" y="20" width="96" height="72" rx="5" fill="#eff6ff" stroke="#2563eb"/>
        <text x="26" y="40" font-size="8.5" font-weight="bold" fill="#1d4ed8">前面：センサー室</text>
        <text x="26" y="55" font-size="7.5" fill="#1e40af">低温維持が命!</text>
        <text x="26" y="68" font-size="7.5" fill="#dc2626">+7℃で暗電流2倍</text>
        <text x="26" y="82" font-size="7.5" fill="#1e40af">前面へ独立放熱</text>
        <!-- Magnesium Mid-Frame Barrier -->
        <rect x="126" y="14" width="24" height="84" rx="3" fill="#64748b" stroke="#1e293b"/>
        <text x="133" y="44" font-size="8" font-weight="bold" fill="#fff" writing-mode="tb">マグネシウム遮熱壁</text>
        <!-- Rear ISP Bay -->
        <rect x="164" y="20" width="140" height="72" rx="5" fill="#fff7ed" stroke="#ea580c"/>
        <text x="174" y="40" font-size="8.5" font-weight="bold" fill="#c2410c">背面：ISPメイン基板室</text>
        <text x="174" y="55" font-size="7.5" fill="#9a3412">8K処理で高温 (60–85℃)</text>
        <path d="M180 72 L288 72" stroke="#ea580c" stroke-width="2.2"/>
        <polygon points="292,72 284,67 284,77" fill="#ea580c"/>
        <text x="178" y="85" font-size="7.5" font-weight="bold" fill="#c2410c">背面ベイパーチャンバーへ逃がす!</text>
        <text x="48" y="110" font-size="8" fill="#334155">高剛性マグネシウム骨格＋熱分離構造で高画質と8K連続収録を両立</text>
      `);case"evf_eyecup":return e(`
        <!-- Eyepiece Lens + Silicone Eyecup + 25mm High Eyepoint + Spectacles -->
        <rect x="24" y="28" width="16" height="58" rx="4" fill="#bae6fd" stroke="#0284c7" stroke-width="1.4"/>
        <text x="16" y="98" font-size="7.5" fill="#0369a1">接眼最終面</text>
        <!-- Deep Eyecup Shroud -->
        <path d="M40 24 L82 14 L82 26 L48 34 Z" fill="#334155"/>
        <path d="M40 90 L82 100 L82 88 L48 80 Z" fill="#334155"/>
        <text x="50" y="12" font-size="8" font-weight="bold" fill="#1e293b">深型遮光カップ</text>
        <!-- Stray sunlight blocked -->
        <path d="M98 10 L74 20" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="3 2"/>
        <text x="98" y="16" font-size="7.5" fill="#d97706">外光遮断!</text>
        <!-- 41° FoV Ray Cone -->
        <polygon points="40,36 40,78 196,57" fill="rgba(14,165,233,0.16)" stroke="#0284c7" stroke-width="1.3"/>
        <line x1="40" y1="88" x2="196" y2="88" stroke="#0f172a" stroke-width="1.2" stroke-dasharray="3 2"/>
        <text x="88" y="84" font-size="8.5" font-weight="bold" fill="#0f172a">ハイアイポイント 25 mm</text>
        <!-- Eyeglasses + Human Eye -->
        <line x1="158" y1="26" x2="158" y2="86" stroke="#64748b" stroke-width="2.4"/>
        <text x="148" y="22" font-size="7.5" fill="#475569">眼鏡OK</text>
        <path d="M196 57 Q226 30 264 57 Q226 84 196 57 Z" fill="#f8fafc" stroke="#1e293b" stroke-width="1.6"/>
        <circle cx="212" cy="57" r="9" fill="#0284c7" opacity="0.75"/>
        <circle cx="210" cy="57" r="4" fill="#0f172a"/>
        <text x="198" y="99" font-size="8" font-weight="bold" fill="#0284c7">射出瞳・対角視野角 41°</text>
        <text x="56" y="114" font-size="8" fill="#334155">眼鏡着用でも四隅までケラレない25mmアイポイント＆迷光完全遮断</text>
      `);case"evf_antifog":return e(`
        <!-- Cold Outside Air vs Warm Camera Interior with Airtight Dry-Air Gap -->
        <rect x="14" y="16" width="84" height="76" rx="5" fill="#eff6ff" stroke="#38bdf8"/>
        <text x="26" y="34" font-size="8.5" font-weight="bold" fill="#0369a1">外気 (極寒/多湿)</text>
        <text x="26" y="50" font-size="8" fill="#0284c7">−10℃ / 呼気</text>
        <text x="24" y="76" font-size="7.5" fill="#0369a1">フッ素撥水・撥油膜</text>
        <!-- Outer Glass -->
        <rect x="104" y="16" width="16" height="76" rx="2" fill="#7dd3fc" stroke="#0284c7" stroke-width="1.3"/>
        <!-- Airtight Dry Air Chamber -->
        <rect x="120" y="22" width="44" height="64" fill="#f8fafc" stroke="#64748b" stroke-dasharray="3 2"/>
        <rect x="120" y="16" width="44" height="6" fill="#1e293b"/>
        <rect x="120" y="86" width="44" height="6" fill="#1e293b"/>
        <text x="124" y="50" font-size="8" font-weight="bold" fill="#0f172a">乾燥空気</text>
        <text x="125" y="63" font-size="7.5" fill="#475569">密閉断熱</text>
        <!-- Inner Glass -->
        <rect x="164" y="16" width="16" height="76" rx="2" fill="#bae6fd" stroke="#0284c7" stroke-width="1.3"/>
        <!-- Camera EVF Optics Side -->
        <rect x="186" y="16" width="118" height="76" rx="5" fill="#fff7ed" stroke="#fb923c"/>
        <text x="196" y="36" font-size="8.5" font-weight="bold" fill="#c2410c">EVF光学室 (+30℃)</text>
        <text x="196" y="53" font-size="8" fill="#9a3412">内面温度 &gt; 露点温度</text>
        <text x="196" y="70" font-size="8.5" font-weight="bold" fill="#16a34a">⇒ 結露・曇りゼロ!</text>
        <text x="196" y="84" font-size="7.5" fill="#64748b">可視光＋850nm NIR透過</text>
        <text x="48" y="110" font-size="8" fill="#334155">断熱ペアガラス構造＋Oリング気密封止で寒冷地・雨天でも曇らない</text>
      `);case"evf_eye_sensor":return e(`
        <!-- 940nm VCSEL ToF Proximity + Ambient Sensor -->
        <rect x="18" y="24" width="76" height="62" rx="6" fill="#1e293b"/>
        <circle cx="40" cy="46" r="9" fill="#e11d48" stroke="#facc15" stroke-width="1.4"/>
        <text x="27" y="66" font-size="7.5" fill="#fda4af">940nm発光</text>
        <circle cx="72" cy="46" r="9" fill="#0284c7" stroke="#facc15" stroke-width="1.4"/>
        <text x="60" y="66" font-size="7.5" fill="#7dd3fc">SPAD受光</text>
        <!-- Outgoing & Returning ToF Pulses -->
        <path d="M94 42 L182 42" stroke="#f43f5e" stroke-width="2" stroke-dasharray="5 3"/>
        <polygon points="186,42 178,38 178,46" fill="#f43f5e"/>
        <path d="M182 58 L98 58" stroke="#0284c7" stroke-width="2" stroke-dasharray="5 3"/>
        <polygon points="94,58 102,54 102,62" fill="#0284c7"/>
        <text x="108" y="34" font-size="8" font-weight="bold" fill="#be123c">往復時間 Δt 測距</text>
        <text x="104" y="74" font-size="8" fill="#0369a1">距離 d &lt; 25mm で瞬時切替</text>
        <!-- Eye / Face Profile + Auto Brightness Badge -->
        <path d="M192 32 Q216 50 192 68" fill="none" stroke="#1e293b" stroke-width="2.2"/>
        <circle cx="198" cy="50" r="6" fill="#38bdf8"/>
        <rect x="220" y="22" width="88" height="66" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="228" y="40" font-size="8.5" font-weight="bold" fill="#166534">応答 &lt; 40 ms</text>
        <text x="228" y="55" font-size="7.5" fill="#15803d">EVF ON / LCD OFF</text>
        <text x="228" y="70" font-size="7.5" fill="#0369a1">環境照度センサーで</text>
        <text x="228" y="81" font-size="7.5" fill="#0369a1">4,000nit自動調光</text>
        <text x="48" y="110" font-size="8" fill="#334155">850nm視線AFと干渉しない940nm帯ToF測距＋周囲明るさ自動順応</text>
      `);case"evf_ir_leds":return e(`
        <!-- 8-LED Ring Left + Corneal Purkinje Reflection Geometry Right -->
        <ellipse cx="78" cy="56" rx="50" ry="38" fill="#0f172a" stroke="#334155" stroke-width="2"/>
        <ellipse cx="78" cy="56" rx="34" ry="24" fill="#eff6ff" stroke="#94a3b8"/>
        ${[0,1,2,3,4,5,6,7].map(t=>{const n=t/8*Math.PI*2+Math.PI/8,s=(78+Math.cos(n)*42).toFixed(1),o=(56+Math.sin(n)*31).toFixed(1);return`<circle cx="${s}" cy="${o}" r="4.2" fill="#e11d48" stroke="#fde047" stroke-width="1"/>`}).join("")}
        <text x="53" y="59" font-size="8" font-weight="bold" fill="#0369a1">850nm × 8灯</text>
        <!-- Right: Pupil Center vs Purkinje Glint Vector -->
        <rect x="148" y="14" width="156" height="82" rx="6" fill="#fff1f2" stroke="#fda4af"/>
        <circle cx="224" cy="52" r="24" fill="#fff" stroke="#1e293b" stroke-width="1.6"/>
        <circle cx="231" cy="49" r="10" fill="#0f172a"/>
        <circle cx="218" cy="53" r="3.4" fill="#e11d48"/>
        <line x1="218" y1="53" x2="231" y2="49" stroke="#f59e0b" stroke-width="2"/>
        <text x="156" y="28" font-size="8" font-weight="bold" fill="#be123c">角膜反射法 (PCCR)</text>
        <text x="156" y="86" font-size="7.5" fill="#9f1239">黒目中心と角膜反射点(赤)のズレ→視線!</text>
        <text x="54" y="111" font-size="8" fill="#334155">8方向からの安全850nm近赤外光で眼鏡越しでも瞳孔と角膜反射を捕捉</text>
      `);case"evf_dichroic":return e(`
        <!-- 45° Dichroic Hot Mirror: Visible Straight Through, 850nm IR 90° Down! -->
        <!-- OLED Left -->
        <rect x="14" y="34" width="32" height="40" rx="3" fill="#2563eb"/>
        <text x="17" y="57" font-size="8" font-weight="bold" fill="#fff">OLED</text>
        <!-- Visible Light Passing Straight Through (Cyan/Gold) -->
        <line x1="46" y1="50" x2="256" y2="50" stroke="#0284c7" stroke-width="2.6"/>
        <polygon points="260,50 251,45 251,55" fill="#0284c7"/>
        <text x="50" y="38" font-size="8" font-weight="bold" fill="#0369a1">可視光 98.5% 透過</text>
        <!-- 45° Dichroic Mirror Glass -->
        <line x1="146" y1="22" x2="200" y2="76" stroke="#db2777" stroke-width="5" stroke-linecap="round"/>
        <line x1="146" y1="22" x2="200" y2="76" stroke="#fbcfe8" stroke-width="1.5"/>
        <text x="176" y="21" font-size="8" font-weight="bold" fill="#be185d">45° 誘電体多層膜</text>
        <!-- Eye on Right -->
        <path d="M266 54 Q284 38 304 54 Q284 70 266 54 Z" fill="#f8fafc" stroke="#1e293b" stroke-width="1.5"/>
        <circle cx="277" cy="54" r="5.5" fill="#0284c7"/>
        <!-- 850nm IR Reflecting 90° Downward! -->
        <line x1="264" y1="60" x2="178" y2="60" stroke="#e11d48" stroke-width="2.2" stroke-dasharray="4 2"/>
        <line x1="178" y1="60" x2="178" y2="94" stroke="#e11d48" stroke-width="2.6"/>
        <polygon points="178,99 173,90 183,90" fill="#e11d48"/>
        <text x="188" y="88" font-size="8" font-weight="bold" fill="#be123c">850nm赤外線 95% 反射</text>
        <rect x="152" y="99" width="52" height="14" rx="2" fill="#7e22ce"/>
        <text x="157" y="109" font-size="7.5" fill="#fff">視線CMOSへ</text>
        <text x="14" y="108" font-size="7.5" fill="#475569">画質劣化ゼロで光路分離</text>
      `);case"evf_gaze_cam":return e(`
        <!-- Vertical Cross-Section: 90° IR Beam -> Aspheric Relay Lens -> 850nm BPF -> 307K NIR CMOS -> AI NPU -->
        <line x1="68" y1="10" x2="68" y2="30" stroke="#e11d48" stroke-width="2.4"/>
        <polygon points="68,34 63,26 73,26" fill="#e11d48"/>
        <text x="82" y="24" font-size="8" font-weight="bold" fill="#be123c">90°反射された眼球赤外像</text>
        <!-- Relay Lens -->
        <ellipse cx="68" cy="44" rx="24" ry="7" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
        <text x="100" y="47" font-size="8" fill="#0369a1">非球面IRリレーレンズ</text>
        <!-- 850nm Bandpass Filter -->
        <rect x="44" y="58" width="48" height="7" rx="2" fill="#f43f5e" opacity="0.78"/>
        <text x="100" y="65" font-size="8" fill="#be123c">850nm狭帯域フィルター (外光遮断)</text>
        <!-- 307K-px NIR CMOS -->
        <rect x="38" y="74" width="60" height="14" rx="2" fill="#1e1b4b" stroke="#eab308" stroke-width="1.4"/>
        <text x="44" y="84" font-size="7.5" fill="#fde047">30.7万画素CMOS</text>
        <!-- Arrow to AI NPU -->
        <path d="M104 81 L176 81" stroke="#7c3aed" stroke-width="2.2"/>
        <polygon points="181,81 173,76 173,86" fill="#7c3aed"/>
        <rect x="184" y="68" width="122" height="28" rx="5" fill="#f5f3ff" stroke="#7c3aed"/>
        <text x="192" y="80" font-size="8" font-weight="bold" fill="#5b21b6">AIアクセラレーター解析</text>
        <text x="192" y="91" font-size="7.5" fill="#6d28d9">2倍速でAF枠を視線先へ!</text>
        <text x="38" y="110" font-size="8" fill="#334155">メイン基板上端のEVF専用ノッチへ収容し、見るだけでピント位置を移動</text>
      `);case"evf_lens_rear":return e(`
        <!-- Spherical vs Double-Aspheric Comparison (Distortion & Astigmatism) -->
        <rect x="16" y="16" width="126" height="76" rx="5" fill="#fff1f2" stroke="#fda4af"/>
        <text x="26" y="31" font-size="8" font-weight="bold" fill="#be123c">一般球面レンズ (周辺歪み)</text>
        <path d="M40 42 Q78 52 116 42 M40 80 Q78 70 116 80 M40 42 Q50 61 40 80 M116 42 Q106 61 116 80" fill="none" stroke="#e11d48" stroke-width="1.5"/>
        <text x="34" y="88" font-size="7.5" fill="#9f1239">糸巻き歪み・視線移動で像揺れ</text>
        <!-- Right: Double-Sided Aspheric G4 -->
        <rect x="156" y="16" width="150" height="76" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="166" y="31" font-size="8" font-weight="bold" fill="#0369a1">G4 大口径両面非球面 (GMo)</text>
        <rect x="182" y="42" width="96" height="36" fill="none" stroke="#0284c7" stroke-width="1.8"/>
        <line x1="214" y1="42" x2="214" y2="78" stroke="#38bdf8" stroke-width="1"/>
        <line x1="246" y1="42" x2="246" y2="78" stroke="#38bdf8" stroke-width="1"/>
        <text x="168" y="88" font-size="7.5" fill="#0369a1">視野角41°全域で直進・像揺れゼロ!</text>
        <text x="44" y="110" font-size="8" fill="#334155">高次非球面＋超低反射T*級コートにより0.90×大倍率と端までの切れを両立</text>
      `);case"evf_lens_ed":return e(`
        <!-- Cemented ED Crown + High-Index Flint Doublet + Diopter Slide Arrows -->
        <!-- Left Doublet Cross Section -->
        <path d="M54 22 Q74 22 74 56 Q74 90 54 90 L44 90 Q54 56 44 22 Z" fill="#a5b4fc" stroke="#4f46e5" stroke-width="1.4"/>
        <path d="M74 22 Q98 56 74 90 Q82 56 74 22 Z" fill="#6ee7b7" stroke="#059669" stroke-width="1.4"/>
        <text x="26" y="16" font-size="7.5" font-weight="bold" fill="#4338ca">高分散凹(G2)</text>
        <text x="76" y="16" font-size="7.5" font-weight="bold" fill="#047857">ED低分散凸(G3)</text>
        <!-- R/G/B Rays Converging to Single Sharp Point (Zero Chromatic Aberration!) -->
        <line x1="94" y1="36" x2="216" y2="56" stroke="#ef4444" stroke-width="1.7"/>
        <line x1="96" y1="56" x2="216" y2="56" stroke="#10b981" stroke-width="1.7"/>
        <line x1="94" y1="76" x2="216" y2="56" stroke="#2563eb" stroke-width="1.7"/>
        <circle cx="216" cy="56" r="4.5" fill="#facc15" stroke="#0f172a" stroke-width="1.2"/>
        <text x="148" y="34" font-size="8" font-weight="bold" fill="#047857">R/G/B 完全一致(色収差ゼロ)</text>
        <!-- Diopter Movement Indicator -->
        <path d="M36 98 L104 98" stroke="#d97706" stroke-width="2.2"/>
        <polygon points="32,98 40,94 40,102" fill="#d97706"/>
        <polygon points="108,98 100,94 100,102" fill="#d97706"/>
        <text x="116" y="101" font-size="8" font-weight="bold" fill="#b45309">前後3.4mm移動 ⇒ 視度 −4.0 〜 +3.0 m⁻¹</text>
        <rect x="228" y="38" width="76" height="36" rx="4" fill="#fefce8" stroke="#eab308"/>
        <text x="234" y="53" font-size="7.5" font-weight="bold" fill="#854d0e">Δz = −f²·ΔD</text>
        <text x="234" y="66" font-size="7.5" fill="#a16207">裸眼くっきり</text>
      `);case"evf_diopter":return e(`
        <!-- Pop-out Knurled Dial -> Gears -> Brass Lead Screw + Guide Rod + Anti-Backlash Spring -->
        <rect x="18" y="36" width="38" height="40" rx="5" fill="#334155" stroke="#0f172a" stroke-width="1.5"/>
        <line x1="26" y1="36" x2="26" y2="76" stroke="#94a3b8" stroke-width="1.2"/>
        <line x1="36" y1="36" x2="36" y2="76" stroke="#94a3b8" stroke-width="1.2"/>
        <line x1="46" y1="36" x2="46" y2="76" stroke="#94a3b8" stroke-width="1.2"/>
        <text x="16" y="90" font-size="7.5" font-weight="bold" fill="#1e293b">引出しロック</text>
        <!-- Lead Screw -->
        <rect x="56" y="51" width="144" height="10" rx="2" fill="#f59e0b" stroke="#b45309"/>
        ${[0,1,2,3,4,5,6,7,8].map(t=>`<line x1="${66+t*15}" y1="51" x2="${72+t*15}" y2="61" stroke="#78350f" stroke-width="1.4"/>`).join("")}
        <text x="86" y="44" font-size="8" font-weight="bold" fill="#b45309">真鍮リードスクリュー</text>
        <!-- Sliding Lens Carriage Nut + Anti-Backlash Spring -->
        <rect x="136" y="38" width="24" height="36" rx="3" fill="#64748b" stroke="#0f172a"/>
        <path d="M160 56 L168 48 L174 64 L180 48 L186 64 L194 56" fill="none" stroke="#0284c7" stroke-width="2"/>
        <text x="154" y="88" font-size="7.5" font-weight="bold" fill="#0369a1">予圧バネ(ガタ0)</text>
        <!-- Guide Rod -->
        <rect x="86" y="22" width="194" height="6" rx="2" fill="#cbd5e1" stroke="#475569"/>
        <text x="208" y="44" font-size="8" fill="#334155">2軸ガイドレール</text>
        <text x="208" y="58" font-size="7.5" fill="#475569">チルト公差 &lt; 0.02°</text>
        <text x="46" y="110" font-size="8" fill="#334155">回転をサブmm直進へ変換し、予圧スプリングとOリングでズレと水滴を防止</text>
      `);case"evf_lens_field":return e(`
        <!-- Flat OLED -> Curved Petzval Error vs Flattened by G1 Field Flattener -->
        <rect x="20" y="24" width="12" height="62" rx="2" fill="#2563eb"/>
        <text x="12" y="98" font-size="7.5" font-weight="bold" fill="#1d4ed8">平面OLED</text>
        <!-- G1 Positive Meniscus Lens -->
        <path d="M68 20 Q84 55 68 90 Q96 55 68 20 Z" fill="#a5b4fc" stroke="#4f46e5" stroke-width="1.6"/>
        <text x="58" y="14" font-size="8" font-weight="bold" fill="#4338ca">G1 フィールドフラットナー</text>
        <!-- Telecentric Rays -->
        <path d="M32 32 L74 30 L178 24" fill="none" stroke="#0284c7" stroke-width="1.6"/>
        <path d="M32 55 L78 55 L178 55" fill="none" stroke="#0284c7" stroke-width="1.6"/>
        <path d="M32 78 L74 80 L178 86" fill="none" stroke="#0284c7" stroke-width="1.6"/>
        <!-- Uncorrected Curved Image Plane (dashed red) vs Corrected Flat Plane (solid green) -->
        <path d="M196 22 Q164 55 196 88" fill="none" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="3 2"/>
        <text x="198" y="34" font-size="7.5" fill="#dc2626">像面湾曲 (端ボケ)</text>
        <line x1="218" y1="22" x2="218" y2="88" stroke="#16a34a" stroke-width="2.6"/>
        <text x="224" y="54" font-size="8" font-weight="bold" fill="#15803d">平坦結像!</text>
        <text x="224" y="68" font-size="7.5" fill="#166534">画面四隅まで</text>
        <text x="224" y="79" font-size="7.5" fill="#166534">シャープ</text>
        <text x="44" y="112" font-size="8" fill="#334155">ペッツバール和を補正し、OLEDのMLA指向光束を隅までムラなく集光</text>
      `);case"evf_oled":return e(`
        <!-- Nano-Scale Cross-Section of 2-Stack Tandem WOLED on Silicon (OLEDoS) + Micro-Cavity + MLA! -->
        <!-- Bottom: Single-Crystal CMOS Silicon Backplane -->
        <rect x="24" y="84" width="272" height="15" rx="2" fill="#334155"/>
        <text x="64" y="95" font-size="8" font-weight="bold" fill="#f8fafc">単結晶シリコンCMOSバックプレーン (3,900 PPI駆動回路)</text>
        <!-- Reflective Al Anode -->
        <rect x="24" y="79" width="272" height="4" fill="#cbd5e1"/>
        <!-- 2-Stack Tandem OLED + CGL -->
        <rect x="24" y="61" width="272" height="17" fill="#fef3c7" stroke="#d97706" stroke-width="0.9"/>
        <text x="46" y="72.5" font-size="7.8" font-weight="bold" fill="#92400e">2スタック・タンデムWOLED ＋ 電荷発生層(CGL) 2倍効率</text>
        <!-- RGB Color Filter + Micro-Cavity Resonance -->
        <rect x="24" y="45" width="90" height="15" fill="#ef4444" opacity="0.88"/>
        <rect x="115" y="45" width="90" height="15" fill="#10b981" opacity="0.88"/>
        <rect x="206" y="45" width="90" height="15" fill="#3b82f6" opacity="0.88"/>
        <text x="46" y="56" font-size="8" font-weight="bold" fill="#fff">R 共振器</text>
        <text x="137" y="56" font-size="8" font-weight="bold" fill="#fff">G 共振器</text>
        <text x="228" y="56" font-size="8" font-weight="bold" fill="#fff">B 共振器</text>
        <!-- On-Chip Microlens Array (MLA) domes -->
        <path d="M24 45 Q69 24 114 45 M115 45 Q160 24 205 45 M206 45 Q251 24 296 45" fill="#bae6fd" opacity="0.72" stroke="#0284c7" stroke-width="1.4"/>
        <text x="50" y="20" font-size="8.5" font-weight="bold" fill="#0369a1">オンチップMLA (光取出し1.8倍 ⇒ 4,000 cd/m² &amp; DCI-P3)</text>
        <text x="46" y="112" font-size="8" fill="#334155">2階建て発光層＋波長別マイクロキャビティ＋極小レンズの三位一体構造</text>
      `);case"evf_tcon":return e(`
        <!-- Dual-Stream Blackout-Free Pipeline: ISP -> Shielded FPC -> TCON Demura -> 240Hz OLED -->
        <rect x="14" y="28" width="64" height="52" rx="5" fill="#1d4ed8"/>
        <text x="24" y="50" font-size="8" font-weight="bold" fill="#fff">4nm ISP</text>
        <text x="20" y="64" font-size="7" fill="#bfdbfe">デュアル系統</text>
        <!-- Shielded FPC MIPI-DSI -->
        <path d="M78 54 L120 54" stroke="#d97706" stroke-width="6"/>
        <polygon points="124,54 116,48 116,60" fill="#b45309"/>
        <text x="80" y="42" font-size="7.5" font-weight="bold" fill="#b45309">22.6 Gbps</text>
        <text x="82" y="72" font-size="7" fill="#78350f">MIPI-DSI</text>
        <!-- TCON Board -->
        <rect x="126" y="22" width="96" height="64" rx="5" fill="#065f46" stroke="#10b981"/>
        <text x="136" y="40" font-size="8.5" font-weight="bold" fill="#fff">240Hz TCON</text>
        <text x="134" y="54" font-size="7.5" fill="#a7f3d0">・10bit HDR-PQ変換</text>
        <text x="134" y="66" font-size="7.5" fill="#a7f3d0">・944万画素Demura</text>
        <text x="134" y="78" font-size="7.5" fill="#fde047">・ELVDD/ELVSS電源</text>
        <!-- Output to OLED -->
        <path d="M222 54 L248 54" stroke="#0284c7" stroke-width="3"/>
        <polygon points="252,54 244,49 244,59" fill="#0284c7"/>
        <rect x="254" y="28" width="52" height="52" rx="5" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
        <text x="261" y="50" font-size="8" font-weight="bold" fill="#38bdf8">240 fps</text>
        <text x="260" y="65" font-size="7" fill="#e2e8f0">暗転ゼロ</text>
        <text x="40" y="109" font-size="8" fill="#334155">連写中も一切ブラックアウトしない専用超低遅延パイプライン(&lt;5ms)</text>
      `);case"evf_heatsink":return e(`
        <!-- Micro-OLED Rear Thermal Conduction Path: Si Wafer -> TIM -> Cu Plate -> Aluminum Fins -->
        <rect x="20" y="24" width="52" height="60" rx="4" fill="#1e3a8a"/>
        <text x="26" y="50" font-size="8" font-weight="bold" fill="#fff">OLED</text>
        <text x="26" y="64" font-size="7" fill="#bfdbfe">Si基板発熱</text>
        <!-- TIM Pad -->
        <rect x="76" y="28" width="18" height="52" rx="2" fill="#38bdf8"/>
        <text x="72" y="94" font-size="7.5" fill="#0369a1">TIMパッド</text>
        <!-- Copper Spreader -->
        <rect x="98" y="24" width="22" height="60" rx="2" fill="#d97742" stroke="#9a3412"/>
        <text x="98" y="18" font-size="7.5" font-weight="bold" fill="#c2410c">純銅板</text>
        <!-- Aluminum Cooling Fins -->
        ${[0,1,2,3,4].map(t=>`<rect x="120" y="${26+t*12}" width="32" height="7" rx="1" fill="#475569"/>`).join("")}
        <!-- Heat Flow Arrows -->
        <path d="M162 40 L196 40 M162 54 L196 54 M162 68 L196 68" stroke="#ea580c" stroke-width="2"/>
        <polygon points="200,54 192,49 192,59" fill="#ea580c"/>
        <!-- Benefit Box -->
        <rect x="206" y="22" width="100" height="64" rx="5" fill="#fff7ed" stroke="#fb923c"/>
        <text x="214" y="39" font-size="8" font-weight="bold" fill="#c2410c">ΔT = −15℃ 冷却</text>
        <text x="214" y="54" font-size="7.5" fill="#9a3412">・OLED寿命 約3倍</text>
        <text x="214" y="67" font-size="7.5" fill="#9a3412">・焼き付き防止</text>
        <text x="214" y="80" font-size="7.5" fill="#9a3412">・DCI-P3色温度安定</text>
        <text x="48" y="111" font-size="8" fill="#334155">4,000 cd/m²超高輝度駆動の発熱を純銅＆フィンで逃がし劣化を防止</text>
      `);case"evf_housing":return e(`
        <!-- Sawtooth Internal Anti-Reflection Baffle Ridges Trapping Stray Light -->
        <rect x="22" y="16" width="276" height="10" fill="#4b5563"/>
        <rect x="22" y="84" width="276" height="10" fill="#4b5563"/>
        <!-- Knife-edge sawtooth baffles top & bottom -->
        ${[0,1,2,3,4,5,6].map(t=>{const n=46+t*36;return`<polygon points="${n},26 ${n+10},26 ${n+4},37" fill="#111827"/>
                    <polygon points="${n},84 ${n+10},84 ${n+4},73" fill="#111827"/>`}).join("")}
        <!-- Clean Central Optical Beam -->
        <line x1="26" y1="55" x2="292" y2="55" stroke="#0284c7" stroke-width="2.5"/>
        <text x="116" y="51" font-size="8.5" font-weight="bold" fill="#0369a1">正規映像光路 (偏心 ±10μm)</text>
        <!-- Stray light ray getting trapped & killed by sawtooth baffles -->
        <polyline points="38,44 84,32 94,26 116,35" fill="none" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="3 2"/>
        <circle cx="116" cy="35" r="3.5" fill="#dc2626"/>
        <text x="124" y="38" font-size="7.5" font-weight="bold" fill="#b45309">迷光を多重反射で完全吸収!</text>
        <text x="36" y="111" font-size="8" fill="#334155">AZ91Dマグネシウム鏡筒＋鋸歯状遮光バッフルで黒浮きゼロ＆防塵防滴</text>
      `);case"mount_flange":return e(`
        <!-- Legacy Narrow Long-Flange DSLR vs 55mm Large-Diameter Short-Flange Mirrorless -->
        <rect x="14" y="14" width="136" height="80" rx="5" fill="#fff1f2" stroke="#fda4af"/>
        <text x="22" y="28" font-size="8" font-weight="bold" fill="#be123c">旧一眼レフ (小径・長フランジ)</text>
        <line x1="36" y1="36" x2="36" y2="80" stroke="#64748b" stroke-width="3"/>
        <line x1="126" y1="44" x2="126" y2="72" stroke="#1e293b" stroke-width="3"/>
        <path d="M36 44 L126 44 M36 72 L126 72 M42 40 L126 44 M42 76 L126 72" stroke="#e11d48" stroke-width="1.3"/>
        <text x="48" y="88" font-size="7.5" fill="#9f1239">44mm / 46.5mm (斜入射大)</text>
        <!-- Right: 55mm Large Diameter Short Flange -->
        <rect x="160" y="14" width="146" height="80" rx="5" fill="#f0f9ff" stroke="#0284c7"/>
        <text x="168" y="28" font-size="8" font-weight="bold" fill="#0369a1">最新55mm大口径・短フランジ</text>
        <line x1="218" y1="34" x2="218" y2="82" stroke="#0284c7" stroke-width="3.5"/>
        <line x1="274" y1="42" x2="274" y2="74" stroke="#0f172a" stroke-width="3"/>
        <line x1="218" y1="44" x2="274" y2="44" stroke="#0284c7" stroke-width="1.8"/>
        <line x1="218" y1="58" x2="274" y2="58" stroke="#f59e0b" stroke-width="1.8"/>
        <line x1="218" y1="72" x2="274" y2="72" stroke="#0284c7" stroke-width="1.8"/>
        <text x="168" y="88" font-size="7.5" font-weight="bold" fill="#0369a1">55mm / 16–20mm ⇒ 周辺直進＆F0.95!</text>
        <text x="42" y="110" font-size="8" fill="#334155">センサー対角43.3mmを呑み込む55mm大口径と±2μm平面度基準面</text>
      `);case"mount_bolts":return e(`
        <!-- Cantilever Telephoto Bending Moment vs 6-Bolt High-Tensile Reinforcement -->
        <!-- Camera Mount Ring with 6 Bolts -->
        <circle cx="74" cy="54" r="34" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>
        <circle cx="74" cy="54" r="24" fill="#fff" stroke="#64748b" stroke-width="1.4"/>
        ${[0,60,120,180,240,300].map(t=>{const n=t*Math.PI/180,s=(74+Math.cos(n)*29).toFixed(1),o=(54+Math.sin(n)*29).toFixed(1);return`<circle cx="${s}" cy="${o}" r="3.6" fill="#0284c7" stroke="#0f172a" stroke-width="0.9"/>`}).join("")}
        <text x="53" y="57" font-size="8" font-weight="bold" fill="#0f172a">6点均等</text>
        <!-- Right: Cantilever Moment Force Diagram -->
        <rect x="134" y="28" width="18" height="52" rx="2" fill="#64748b"/>
        <rect x="152" y="34" width="118" height="40" rx="4" fill="#cbd5e1" stroke="#334155"/>
        <text x="166" y="57" font-size="8.5" font-weight="bold" fill="#0f172a">600mm F4 (3kg超)</text>
        <path d="M224 76 L224 94" stroke="#dc2626" stroke-width="2.4"/>
        <polygon points="224,98 219,90 229,90" fill="#dc2626"/>
        <path d="M134 34 L118 34" stroke="#0284c7" stroke-width="2.4"/>
        <polygon points="114,34 122,29 122,39" fill="#0284c7"/>
        <text x="148" y="24" font-size="8" font-weight="bold" fill="#0369a1">上部ボルト引張応力を6点分散＋緩み止め</text>
        <text x="52" y="111" font-size="8" fill="#334155">片持ち曲げモーメントによるフランジ浮き(片ボケ)を6点高剛性締結で防止</text>
      `);case"mount_gasket":return e(`
        <!-- Dual-Lip Labyrinth EPDM Gasket Blocking Rain & Dust -->
        <rect x="20" y="22" width="100" height="68" rx="4" fill="#e2e8f0" stroke="#64748b"/>
        <text x="38" y="52" font-size="8.5" font-weight="bold" fill="#334155">レンズ側フランジ</text>
        <text x="38" y="66" font-size="7.5" fill="#475569">防滴ゴムスカート</text>
        <!-- Dual-Lip EPDM Seal Cross-Section -->
        <path d="M120 28 Q138 36 120 46 Q138 56 120 66 L146 66 L146 28 Z" fill="#1e293b" stroke="#0f172a"/>
        <text x="116" y="84" font-size="7.5" font-weight="bold" fill="#0f172a">二重リップEPDM</text>
        <!-- Rain Drops Deflected -->
        <path d="M124 8 L124 24" stroke="#0284c7" stroke-width="2.2" stroke-dasharray="3 2"/>
        <circle cx="114" cy="16" r="3" fill="#38bdf8"/>
        <circle cx="134" cy="14" r="3" fill="#38bdf8"/>
        <text x="146" y="18" font-size="8" font-weight="bold" fill="#0284c7">雨水・砂塵を2段で遮断!</text>
        <!-- Camera Sensor Chamber Protected -->
        <rect x="150" y="22" width="152" height="68" rx="4" fill="#f0fdf4" stroke="#16a34a"/>
        <text x="172" y="48" font-size="8.5" font-weight="bold" fill="#166534">カメラ内部（センサー室）</text>
        <text x="172" y="64" font-size="7.5" fill="#15803d">毛細管現象による浸水ゼロ</text>
        <text x="172" y="78" font-size="7.5" fill="#15803d">−20℃氷点下でも弾性維持</text>
        <text x="48" y="110" font-size="8" fill="#334155">全周360°の二重リップラビリンス構造で過酷な雨天・砂塵から内部を保護</text>
      `);case"mount_leaf_springs":return e(`
        <!-- Bayonet Lug + Arched Bronze Leaf Spring Clamping Lens Flush to Datum Plane -->
        <rect x="26" y="24" width="22" height="66" rx="2" fill="#cbd5e1" stroke="#475569" stroke-width="1.4"/>
        <text x="16" y="18" font-size="7.5" font-weight="bold" fill="#334155">レンズ基準面</text>
        <rect x="48" y="24" width="24" height="66" rx="2" fill="#94a3b8" stroke="#1e293b" stroke-width="1.4"/>
        <text x="68" y="18" font-size="7.5" font-weight="bold" fill="#0f172a">ステンレス基準面(±2μm)</text>
        <!-- Lens Lug Hooked Behind Body Flange -->
        <rect x="72" y="42" width="26" height="24" rx="2" fill="#64748b"/>
        <text x="74" y="57" font-size="7" fill="#fff">爪</text>
        <!-- Bowed Leaf Spring Pushing Lens Lug Rearward (-Z) -> Pulling Flange Flush! -->
        <path d="M98 32 Q122 54 98 76" fill="none" stroke="#d97706" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M126 54 L106 54" stroke="#dc2626" stroke-width="2.4"/>
        <polygon points="102,54 110,49 110,59" fill="#dc2626"/>
        <rect x="134" y="28" width="168" height="58" rx="5" fill="#fffbeb" stroke="#f59e0b"/>
        <text x="142" y="46" font-size="8.5" font-weight="bold" fill="#b45309">4枚バネ予圧：約 32 N</text>
        <text x="142" y="61" font-size="7.5" fill="#92400e">・軸方向ガタ(遊び) ⇒ 0 μm</text>
        <text x="142" y="75" font-size="7.5" fill="#92400e">・4点均等圧着で片ボケ防止</text>
        <text x="48" y="110" font-size="8" fill="#334155">裏側からレンズ爪を強力に引き寄せ、基準面へミクロン単位で密着固定</text>
      `);case"mount_shims":return e(`
        <!-- Sub-Micron Color-Coded Shim Stack Calibrating Depth of Focus ±8.9μm -->
        <rect x="20" y="24" width="38" height="62" rx="3" fill="#cbd5e1" stroke="#475569"/>
        <text x="23" y="58" font-size="7.5" font-weight="bold" fill="#0f172a">フランジ</text>
        <!-- 3 Color-Coded Shims -->
        <rect x="64" y="22" width="10" height="66" fill="#94a3b8" stroke="#334155"/>
        <rect x="78" y="22" width="12" height="66" fill="#f59e0b" stroke="#b45309"/>
        <rect x="94" y="22" width="14" height="66" fill="#2563eb" stroke="#1e40af"/>
        <text x="58" y="16" font-size="7.5" font-weight="bold" fill="#1e40af">0.01 / 0.025 / 0.05 mm</text>
        <!-- Magnesium Throat -->
        <rect x="114" y="24" width="40" height="62" rx="3" fill="#64748b"/>
        <text x="118" y="58" font-size="7.5" font-weight="bold" fill="#fff">Mg骨格</text>
        <!-- Right: F1.2 Depth of Focus Formula Card -->
        <rect x="166" y="20" width="138" height="70" rx="5" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="174" y="37" font-size="8.5" font-weight="bold" fill="#1d4ed8">F1.2 許容焦点深度</text>
        <text x="174" y="54" font-size="9" font-weight="bold" fill="#dc2626">Δz = ±8.9 μm!</text>
        <text x="174" y="70" font-size="7.5" fill="#1e40af">工場レーザー干渉計計測で</text>
        <text x="174" y="82" font-size="7.5" fill="#1e40af">傾き &lt; 0.005° へ全数調整</text>
        <text x="48" y="110" font-size="8" fill="#334155">10μm刻みの極薄シム調整により無限遠精度と画面四隅の均一解像を保証</text>
      `);case"mount_lock_pin":return e(`
        <!-- Release Button -> Rocker Lever -> Hardened Lock Pin + Spring -->
        <!-- Release Button Top-Left -->
        <rect x="22" y="26" width="38" height="24" rx="4" fill="#475569" stroke="#0f172a"/>
        <text x="27" y="41" font-size="7.5" font-weight="bold" fill="#fff">解除ボタン</text>
        <path d="M41 10 L41 23" stroke="#dc2626" stroke-width="2"/>
        <polygon points="41,26 36,19 46,19" fill="#dc2626"/>
        <!-- Rocker Lever + Pivot -->
        <line x1="41" y1="54" x2="144" y2="54" stroke="#64748b" stroke-width="5" stroke-linecap="round"/>
        <circle cx="92" cy="54" r="5" fill="#f59e0b" stroke="#0f172a"/>
        <text x="72" y="72" font-size="7.5" font-weight="bold" fill="#92400e">支点ロッカー</text>
        <!-- Hardened Lock Pin + Spring -->
        <rect x="136" y="22" width="16" height="44" rx="2" fill="#cbd5e1" stroke="#0f172a" stroke-width="1.4"/>
        <path d="M144 66 L138 72 L150 78 L138 84 L150 90" fill="none" stroke="#0284c7" stroke-width="1.8"/>
        <text x="160" y="34" font-size="8" font-weight="bold" fill="#0f172a">硬化鋼ロックピン (HRC55+)</text>
        <text x="160" y="50" font-size="7.5" fill="#0369a1">・装着時：バネで自動「カチッ」</text>
        <text x="160" y="64" font-size="7.5" fill="#be123c">・ロック時せん断耐力 &gt; 500 N</text>
        <text x="160" y="78" font-size="7.5" fill="#475569">・解除ボタン軸に防水Oリング</text>
        <text x="48" y="110" font-size="8" fill="#334155">機械式フェイルセーフロックで重量級レンズの回転脱落を完全防止</text>
      `);case"mount_contacts":return e(`
        <!-- 12-Pin Arc Contact Layout: Power / Ground / Ultra-High-Speed Bidirectional Bus -->
        <rect x="16" y="20" width="288" height="58" rx="6" fill="#1e293b"/>
        ${Array.from({length:12}).map((t,n)=>{const s=30+n*22.8,o=n<=2?"#f59e0b":n>=10?"#38bdf8":"#10b981",r=n===0?28:n===11?20:24;return`<rect x="${s.toFixed(1)}" y="${(48-r/2).toFixed(1)}" width="12" height="${r}" rx="5" fill="#facc15" stroke="${o}" stroke-width="1.6"/>`}).join("")}
        <text x="26" y="16" font-size="7.5" font-weight="bold" fill="#b45309">大電力V_MOT (3A)</text>
        <text x="116" y="16" font-size="7.5" font-weight="bold" fill="#047857">高速双方向SPI/UART (40倍帯域)</text>
        <text x="244" y="16" font-size="7.5" font-weight="bold" fill="#0369a1">装着検知</text>
        <text x="24" y="92" font-size="8" font-weight="bold" fill="#0f172a">独立スプリング内蔵・厚金めっき (接触抵抗 &lt; 20 mΩ) ＋ GND先行ホットスワップ安全設計</text>
        <text x="40" y="109" font-size="8" fill="#334155">OIS×5軸IBIS毎秒1,000Hz協調・120fps AF・DLO光学補正データをリアルタイム伝送</text>
      `);case"mount_contact_pcb":return e(`
        <!-- 12 Pogo Pins -> ±15kV ESD TVS Clamp -> High-Side Power Switch -> Shielded FPC -> 4nm ISP -->
        <rect x="14" y="34" width="44" height="40" rx="4" fill="#facc15" stroke="#b45309"/>
        <text x="19" y="57" font-size="8" font-weight="bold" fill="#78350f">12ピン</text>
        <path d="M58 54 L82 54" stroke="#0f172a" stroke-width="2"/>
        <!-- ESD Surge Spark Clamped to GND -->
        <rect x="82" y="24" width="74" height="58" rx="5" fill="#fef2f2" stroke="#dc2626"/>
        <text x="89" y="42" font-size="8" font-weight="bold" fill="#b91c1c">±15kV ESD</text>
        <text x="89" y="55" font-size="7.5" fill="#991b1b">TVSダイオード</text>
        <text x="89" y="68" font-size="7.5" font-weight="bold" fill="#dc2626">&lt; 1 ns 逃がす!</text>
        <path d="M119 82 L119 95" stroke="#dc2626" stroke-width="2"/>
        <line x1="108" y1="95" x2="130" y2="95" stroke="#0f172a" stroke-width="2"/>
        <!-- Shielded FPC -> Mainboard -->
        <path d="M156 54 L196 54" stroke="#d97706" stroke-width="6"/>
        <polygon points="200,54 192,48 192,60" fill="#b45309"/>
        <text x="158" y="44" font-size="7.5" font-weight="bold" fill="#92400e">EMIシールド</text>
        <rect x="202" y="28" width="102" height="50" rx="5" fill="#065f46" stroke="#10b981"/>
        <text x="210" y="48" font-size="8" font-weight="bold" fill="#fff">メイン基板 4nm ISP</text>
        <text x="210" y="63" font-size="7.5" fill="#a7f3d0">＆ 2,000Hz サーボMCU</text>
        <text x="48" y="112" font-size="8" fill="#334155">レンズ交換時の静電気サージ・過電流から心臓部ICをナノ秒保護</text>
      `);case"mount_baffle":return e(`
        <!-- 5-Step Sawtooth Knife-Edge Light Trap Extinguishing Oblique Stray Rays -->
        <rect x="20" y="16" width="280" height="10" fill="#18181b"/>
        <rect x="20" y="84" width="280" height="10" fill="#18181b"/>
        ${[0,1,2,3,4].map(t=>{const n=56+t*44;return`<polygon points="${n},26 ${n+14},26 ${n+5},39" fill="#09090b"/>
                    <polygon points="${n},84 ${n+14},84 ${n+5},71" fill="#09090b"/>`}).join("")}
        <!-- Clean Imaging Light -->
        <line x1="24" y1="55" x2="294" y2="55" stroke="#0284c7" stroke-width="2.6"/>
        <text x="116" y="50" font-size="8.5" font-weight="bold" fill="#0369a1">正規結像光線 (55mm大口径)</text>
        <!-- Stray light trapped in V-groove -->
        <polyline points="26,42 98,28 112,38 124,27" fill="none" stroke="#ea580c" stroke-width="1.9" stroke-dasharray="3 2"/>
        <circle cx="124" cy="27" r="3.8" fill="#dc2626"/>
        <text x="132" y="37" font-size="7.5" font-weight="bold" fill="#b45309">ρ &lt; 0.8% × 3回反射 ⇒ 迷光 0.00005%!</text>
        <text x="42" y="111" font-size="8" fill="#334155">5段ナイフエッジ鋸歯状ライトトラップが逆光時の内壁フレアを完全吸収</text>
      `);case"mount_flare_mask":return e(`
        <!-- Circular 43.3mm Image Circle Trimmed to 36x24mm Full-Frame Rectangle -->
        <circle cx="88" cy="54" r="38" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="4 2"/>
        <rect x="57" y="33" width="62" height="42" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
        <text x="64" y="57" font-size="8" font-weight="bold" fill="#1e3a8a">36×24 mm</text>
        <text x="66" y="28" font-size="7" font-weight="bold" fill="#b45309">余剰光カット</text>
        <!-- Right Explanation Box -->
        <rect x="144" y="18" width="160" height="72" rx="5" fill="#f8fafc" stroke="#94a3b8"/>
        <text x="152" y="36" font-size="8.5" font-weight="bold" fill="#0f172a">丸い光束 → 3:2 矩形整形</text>
        <text x="152" y="52" font-size="7.5" fill="#475569">・イメージサークル面積：1,472 mm²</text>
        <text x="152" y="65" font-size="7.5" fill="#1d4ed8">・有効センサー面積：864 mm²</text>
        <text x="152" y="79" font-size="7.8" font-weight="bold" fill="#dc2626">⇒ 不要な41%の光を直前遮断!</text>
        <text x="44" y="110" font-size="8" fill="#334155">シャッター室での二次乱反射を防ぎ16ストップHDRの漆黒コントラストを死守</text>
      `);case"mount_mg_throat":return e(`
        <!-- Thixomolded AZ91D Magnesium Bulkhead + Radial Load-Transfer Ribs + Helicoils -->
        <rect x="20" y="18" width="128" height="74" rx="10" fill="#64748b" stroke="#1e293b" stroke-width="1.8"/>
        <circle cx="84" cy="55" r="24" fill="#fff" stroke="#0f172a" stroke-width="1.6"/>
        <!-- Radial Ribs -->
        <line x1="32" y1="30" x2="64" y2="42" stroke="#cbd5e1" stroke-width="3"/>
        <line x1="136" y1="30" x2="104" y2="42" stroke="#cbd5e1" stroke-width="3"/>
        <line x1="32" y1="80" x2="64" y2="68" stroke="#cbd5e1" stroke-width="3"/>
        <line x1="136" y1="80" x2="104" y2="68" stroke="#cbd5e1" stroke-width="3"/>
        <text x="68" y="58" font-size="8" font-weight="bold" fill="#0f172a">φ55.6</text>
        <!-- Spec Box Right -->
        <rect x="160" y="18" width="144" height="74" rx="5" fill="#f1f5f9" stroke="#64748b"/>
        <text x="168" y="36" font-size="8.5" font-weight="bold" fill="#0f172a">AZ91D マグネシウム骨格</text>
        <text x="168" y="51" font-size="7.5" fill="#334155">・比重 1.81 (超軽量・高剛性)</text>
        <text x="168" y="64" font-size="7.5" fill="#334155">・6か所SUSヘリサート内蔵</text>
        <text x="168" y="77" font-size="7.5" fill="#334155">・高い内部振動減衰能</text>
        <text x="48" y="110" font-size="8" fill="#334155">放射状ガセットリブで断面二次モーメントを高め重量級レンズのたわみを抑制</text>
      `);case"mount_chassis_if":return e(`
        <!-- Load Path Bypass Diagram: Heavy Lens -> Mount -> Lower Gussets -> Tripod Socket (Skipping IBIS!) -->
        <rect x="16" y="28" width="54" height="44" rx="4" fill="#cbd5e1" stroke="#334155"/>
        <text x="23" y="53" font-size="8" font-weight="bold" fill="#0f172a">マウント</text>
        <!-- Protected Optical Core (Shutter + IBIS) -->
        <rect x="108" y="20" width="96" height="42" rx="5" fill="#eff6ff" stroke="#3b82f6" stroke-dasharray="3 2"/>
        <text x="116" y="39" font-size="8" font-weight="bold" fill="#1d4ed8">シャッター＆IBIS</text>
        <text x="122" y="53" font-size="7.5" fill="#1e40af">歪み応力ゼロ保護!</text>
        <!-- Bypass Load Path Underneath -->
        <path d="M70 64 L96 82 L226 82" fill="none" stroke="#dc2626" stroke-width="3.2"/>
        <polygon points="232,82 222,76 222,88" fill="#dc2626"/>
        <text x="98" y="76" font-size="8" font-weight="bold" fill="#b91c1c">下部ガセット荷重バイパス</text>
        <!-- Tripod Base -->
        <rect x="234" y="62" width="70" height="30" rx="4" fill="#334155"/>
        <text x="242" y="80" font-size="8" font-weight="bold" fill="#fde047">底面三脚座</text>
        <text x="44" y="111" font-size="8" fill="#334155">4点ダウエルピン＋全周防塵シール＋荷重バイパスで光学精度を永続保護</text>
      `)}}class p2{drawerEl;swatchEl;isolateBtn;bodyEl;constructor(e,t){this.drawerEl=document.createElement("aside"),this.drawerEl.className="explanation-drawer",this.drawerEl.setAttribute("aria-hidden","true");const n=document.createElement("div");n.className="drawer-toolbar";const s=document.createElement("div");s.className="drawer-toolbar-left",this.swatchEl=document.createElement("span"),this.swatchEl.className="drawer-swatch-pill";const o=Fs(zs.prev),r=Fs(zs.next);o.addEventListener("click",t.onPrev),r.addEventListener("click",t.onNext),s.append(this.swatchEl,o,r);const a=document.createElement("div");a.className="drawer-toolbar-right",this.isolateBtn=Fs(zs.isolate),this.isolateBtn.addEventListener("click",t.onToggleIsolate);const l=Fs(zs.hide);l.addEventListener("click",t.onHideCurrent);const c=Fs(zs.close);c.addEventListener("click",t.onClose),a.append(this.isolateBtn,l,c),n.append(s,a),this.bodyEl=document.createElement("div"),this.bodyEl.className="drawer-body",this.drawerEl.append(n,this.bodyEl),e.appendChild(this.drawerEl)}show(e,t){const n=e.explanation;this.swatchEl.style.backgroundColor=e.swatchColor,this.isolateBtn.classList.toggle("is-active",t);const s=n.specs.map(l=>`
          <div class="exp-spec-row">
            <span class="exp-spec-label">${l.label}</span>
            <span class="exp-spec-value">${l.value}</span>
          </div>`).join(""),o=n.opticsAndPhysics.map(l=>`<li>${l}</li>`).join(""),r=n.plainAnalogy?`
        <div class="exp-analogy">
          <div class="exp-analogy-badge">やさしい解説</div>
          <p class="exp-analogy-text">${n.plainAnalogy}</p>
        </div>`:"",a=n.formula?`
        <div class="exp-formula">
          <div class="exp-formula-expr">${n.formula.expression}</div>
          <div class="exp-formula-desc">${n.formula.description}</div>
        </div>`:"";this.bodyEl.innerHTML=`
      <div>
        <div class="exp-category">${n.category}</div>
        <h2 class="exp-title">${n.title}</h2>
        <div class="exp-subtitle">${n.subtitle}</div>
      </div>

      ${r}

      <div class="exp-diagram-box">
        ${f2(n.diagramType)}
      </div>

      <p class="exp-summary">${n.summary}</p>

      <div class="exp-section">
        <div class="exp-section-heading">光学的・科学的原理</div>
        <ul class="exp-list">${o}</ul>
        ${a}
      </div>

      <div class="exp-section">
        <div class="exp-section-heading">最新世代（2024–2026）の技術革新</div>
        <div class="exp-innovation">${n.nextGenInnovation}</div>
      </div>

      <div class="exp-section">
        <div class="exp-section-heading">主要物理・設計諸元</div>
        <div class="exp-specs">${s}</div>
      </div>
    `,this.bodyEl.scrollTop=0,this.drawerEl.classList.add("is-open"),this.drawerEl.setAttribute("aria-hidden","false")}setIsolatedState(e){this.isolateBtn.classList.toggle("is-active",e)}hide(){this.drawerEl.classList.remove("is-open"),this.drawerEl.setAttribute("aria-hidden","true"),window.setTimeout(()=>{this.drawerEl.classList.contains("is-open")||this.bodyEl.replaceChildren()},360)}}const ja=document.getElementById("app"),m2=document.getElementById("viewport");let qs=null,bi="off",Wo,Ae,$;const ht=()=>{const i=$.getPartsForCurrentMode(),e=$.getSelectedPart()?.id??null;Ae.renderLayerRail(i,e,qs,t=>$.isPartHidden(t),$.hasAnyHidden())};$=new l2(m2,{onSelectPart:i=>{ja.classList.toggle("has-drawer",!!i),i?Wo.show(i,$.isIsolated()):Wo.hide(),ht()},onHoverPart:i=>{qs=i,Ae.syncHighlight($.getSelectedPart()?.id??null,qs)},onVisibilityChanged:()=>{Wo.setIsolatedState($.isIsolated()),ht()}});Ae=new h2(ja,{onModeChange:i=>{$.setMode(i),Ae.setExplodeValue($.getExplode()),ht()},onExplodeChange:i=>{$.setExplode(i)},onSectionAxisChange:i=>{bi=i,$.setSection(i)},onSectionValueChange:i=>{$.setSection(bi,i)},onRenderModeChange:i=>{$.setRenderMode(i)},onPhysicsToggle:i=>{$.setPhysicsActive(i)},onResetVisibility:()=>{$.resetAllVisibility()},onCameraPreset:i=>{$.setCameraPreset(i)},onSelectPart:i=>{($.getSelectedPart()?.id??null)===i?$.selectPart(null,!1):$.selectPart(i,!0)},onHoverPart:i=>{qs=i,$.setHoveredPartFromUI(i),Ae.syncHighlight($.getSelectedPart()?.id??null,qs)},onToggleHidePart:i=>{$.togglePartHidden(i)}});Wo=new p2(ja,{onClose:()=>$.selectPart(null,!1),onPrev:()=>$.stepSelectedPart(-1),onNext:()=>$.stepSelectedPart(1),onToggleIsolate:()=>$.toggleIsolateSelected(),onHideCurrent:()=>{const i=$.getSelectedPart();i&&$.togglePartHidden(i.id)}});window.addEventListener("keydown",i=>{i.key==="Escape"?$.selectPart(null,!1):i.key==="ArrowDown"||i.key==="ArrowRight"?$.getSelectedPart()&&$.stepSelectedPart(1):(i.key==="ArrowUp"||i.key==="ArrowLeft")&&$.getSelectedPart()&&$.stepSelectedPart(-1)});window.__cad={viewport:$,controls:Ae};ht();const gt=new URLSearchParams(window.location.search).get("preset");gt==="mount_assembled"?($.setMode("mount",!0),Ae.syncMode("mount"),$.setExplode(0,!0),Ae.setExplodeValue(0),$.setCameraPreset("iso",!0),ht()):gt==="mount_exploded"?($.setMode("mount",!0),Ae.syncMode("mount"),$.setExplode(.95,!0),Ae.setExplodeValue(.95),$.setPhysicsActive(!0),Ae.syncPhysics(!0),$.setCameraPreset("iso",!0),ht()):gt==="mount_section"?($.setMode("mount",!0),Ae.syncMode("mount"),$.setExplode(0,!0),bi="x",$.setSection("x",.52),Ae.syncSectionAxis("x",.52),$.setPhysicsActive(!0),Ae.syncPhysics(!0),$.setCameraPreset("iso",!0),ht()):gt==="mount_drawer"?($.setMode("mount",!0),Ae.syncMode("mount"),$.setExplode(.85,!0),Ae.setExplodeValue(.85),$.setPhysicsActive(!0),Ae.syncPhysics(!0),$.setCameraPreset("iso",!0),$.selectPart("mount-flange-ring",!1),ht()):gt==="mount_contacts_drawer"?($.setMode("mount",!0),Ae.syncMode("mount"),$.setExplode(.88,!0),Ae.setExplodeValue(.88),$.setPhysicsActive(!0),Ae.syncPhysics(!0),$.setCameraPreset("iso",!0),$.selectPart("mount-contact-pins",!1),ht()):gt==="evf_assembled"?($.setMode("evf",!0),Ae.syncMode("evf"),$.setExplode(0,!0),Ae.setExplodeValue(0),$.setCameraPreset("iso",!0),ht()):gt==="evf_exploded"?($.setMode("evf",!0),Ae.syncMode("evf"),$.setExplode(.95,!0),Ae.setExplodeValue(.95),$.setPhysicsActive(!0),Ae.syncPhysics(!0),$.setCameraPreset("iso",!0),ht()):gt==="evf_section"?($.setMode("evf",!0),Ae.syncMode("evf"),$.setExplode(0,!0),bi="x",$.setSection("x",.52),Ae.syncSectionAxis("x",.52),$.setPhysicsActive(!0),Ae.syncPhysics(!0),$.setCameraPreset("iso",!0),ht()):gt==="evf_drawer"?($.setMode("evf",!0),Ae.syncMode("evf"),$.setExplode(.88,!0),Ae.setExplodeValue(.88),$.setPhysicsActive(!0),Ae.syncPhysics(!0),$.setCameraPreset("iso",!0),$.selectPart("evf-oled-panel",!1),ht()):gt==="evf_eye_af_drawer"?($.setMode("evf",!0),Ae.syncMode("evf"),$.setExplode(.85,!0),Ae.setExplodeValue(.85),$.setPhysicsActive(!0),Ae.syncPhysics(!0),$.setCameraPreset("iso",!0),$.selectPart("evf-dichroic-mirror",!1),ht()):gt==="mainboard_exploded"?($.setMode("mainboard",!0),Ae.syncMode("mainboard"),$.setExplode(.95,!0),Ae.setExplodeValue(.95),$.setPhysicsActive(!0),Ae.syncPhysics(!0),$.setCameraPreset("iso",!0),ht()):gt==="mainboard_section"?($.setMode("mainboard",!0),Ae.syncMode("mainboard"),$.setExplode(0,!0),bi="x",$.setSection("x",.54),Ae.syncSectionAxis("x",.54),$.setCameraPreset("iso",!0),ht()):gt==="mainboard_drawer"?($.setMode("mainboard",!0),Ae.syncMode("mainboard"),$.setExplode(.85,!0),Ae.setExplodeValue(.85),$.setPhysicsActive(!0),Ae.syncPhysics(!0),$.setCameraPreset("iso",!0),$.selectPart("mb-isp-die",!1),ht()):gt==="mainboard_npu_drawer"?($.setMode("mainboard",!0),Ae.syncMode("mainboard"),$.setExplode(.82,!0),Ae.setExplodeValue(.82),$.setCameraPreset("iso",!0),$.selectPart("mb-ai-npu",!1),ht()):gt==="mainboard_back"?($.setMode("mainboard",!0),Ae.syncMode("mainboard"),$.setExplode(.65,!0),Ae.setExplodeValue(.65),$.setCameraPreset("back",!0),ht()):gt==="shutter_assembled"?($.setMode("shutter",!0),Ae.syncMode("shutter"),$.setExplode(0,!0),$.setCameraPreset("iso",!0),ht()):gt==="shutter_exploded"?($.setMode("shutter",!0),Ae.syncMode("shutter"),$.setExplode(.95,!0),Ae.setExplodeValue(.95),$.setPhysicsActive(!0),Ae.syncPhysics(!0),$.setCameraPreset("iso",!0),ht()):gt==="shutter_section"?($.setMode("shutter",!0),Ae.syncMode("shutter"),$.setExplode(0,!0),bi="x",$.setSection("x",.56),Ae.syncSectionAxis("x",.56),$.setCameraPreset("iso",!0),ht()):gt==="shutter_drawer"?($.setMode("shutter",!0),Ae.syncMode("shutter"),$.setExplode(.82,!0),Ae.setExplodeValue(.82),$.setPhysicsActive(!0),Ae.syncPhysics(!0),$.setCameraPreset("iso",!0),$.selectPart("shutter-curtain-2",!1),ht()):gt==="integrated_exploded"?($.setMode("integrated",!0),Ae.syncMode("integrated"),$.setExplode(.95,!0),Ae.setExplodeValue(.95),$.setPhysicsActive(!0),Ae.syncPhysics(!0),$.setCameraPreset("iso",!0),ht()):gt==="integrated_assembled"?($.setMode("integrated",!0),Ae.syncMode("integrated"),$.setExplode(0,!0),Ae.setExplodeValue(0),$.setCameraPreset("iso",!0),ht()):gt==="sensor_exploded"||gt==="exploded"?($.setMode("sensor",!0),Ae.syncMode("sensor"),$.setExplode(.95,!0),Ae.setExplodeValue(.95),$.setPhysicsActive(!0),Ae.syncPhysics(!0),$.setCameraPreset("iso",!0),ht()):gt==="back"?($.setMode("sensor",!0),Ae.syncMode("sensor"),$.setExplode(.72,!0),Ae.setExplodeValue(.72),$.setCameraPreset("back",!0),ht()):gt==="section"?($.setMode("sensor",!0),Ae.syncMode("sensor"),$.setExplode(0,!0),bi="x",$.setSection("x",.48),Ae.syncSectionAxis("x",.48),$.setCameraPreset("iso",!0),ht()):gt==="drawer"?($.setMode("sensor",!0),Ae.syncMode("sensor"),$.setExplode(.82,!0),Ae.setExplodeValue(.82),$.setCameraPreset("iso",!0),$.selectPart("cmos-die",!1),ht()):gt==="micro"?($.setMode("micro",!0),Ae.syncMode("micro"),$.setExplode(.72,!0),Ae.setExplodeValue(.72),$.setPhysicsActive(!0),Ae.syncPhysics(!0),$.setCameraPreset("iso",!0),ht()):gt==="micro_drawer"&&($.setMode("micro",!0),Ae.syncMode("micro"),$.setExplode(.65,!0),Ae.setExplodeValue(.65),$.setCameraPreset("iso",!0),$.selectPart("micro-2layer-gs",!1),ht());

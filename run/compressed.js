!function(){function a(a,e,t,n){var r=t/2,i=8*n,o=4*n,l=r-o/2,c=r+i,s=Math.asin(l/c),u=Math.sqrt(1-Math.pow(l/c,2))*c,v=t+i+o,d=a/2,f=e-v,h=document.createElement("canvas");h.width=a,h.height=v;var m=h.getContext("2d");return m.lineJoin=m.lineCap="round",m.translate(d,v-r),m.moveTo(-d+o,-l),m.lineTo(-u,-l),m.arc(0,0,c,-Math.PI+s,-s),m.lineTo(d-o,-l),m.strokeStyle="#555",m.lineWidth=o,m.stroke(),{paint:function(a){a.drawImage(h,0,f)}}}function e(a,e){var t=document.createElement("canvas");t.width=a,t.height=e;var n=t.getContext("2d");return{c:n,canvas:t,clear:function(){n.fillStyle="rgba(0, 0, 0, 0.3)",n.fillRect(0,0,a,e)}}}function t(a,e){function t(a,e){var t=r[a];if(t){var i=t[e];i&&!s[i.id]&&(s[i.id]=i,i.shape.isBomb&&n(i))}}function n(a){var e=a.colNumber,n=a.rowNumber;t(e-2,n),t(e+2,n),t(e-1,n-1),t(e+1,n-1),t(e-1,n+1),t(e+1,n+1)}var r={};for(var i in a){var o=a[i];r[i]={};for(var l in o){var c=o[l];r[i][c.rowNumber]=c}}for(var s={},i=0;i<e.length;i++){var u=e[i];s[u.id]=u,u.shape.isBomb&&n(u)}return s}function n(a,e){for(var t=24,n=[],r=0;t>r;r++)n.push(b(a,e,t,r));return n}function r(a,e,t,n){var r,i;t.isBomb?(r=3*n,i=10):(r=2*n,i=5);for(var o=0,l=t.getParticleCanvases(i),c=[],s=0;i>s;s++){var u=w(r,r),v=w(r,r);c.push({canvases:l[s],x:a+u[0],y:e+u[1],dx:v[0],dy:v[1]})}return{id:Math.random(),paint:function(n){o||t.paint(n,a,e);for(var r in c){var i=c[r],l=i.canvases[o],s=i.x-l.width/2,u=i.y-l.height/2;n.drawImage(l,s,u)}},tick:function(){for(var a in c){var e=c[a];e.x+=e.dx,e.y+=e.dy}return o++,o==l[0].length?!0:void 0}}}function i(a){var e={};return{add:function(t,n,i){var o=r(t,n,i,a);e[o.id]=o},paint:function(a){for(var t in e)e[t].paint(a)},tick:function(){for(var a in e)e[a].tick()&&delete e[a]}}}function o(a,e,t){var n=[];for(var r in a){var i=a[r];for(var o in e){var l=e[o],c=l.x-i.x,s=l.y-i.y,u=Math.sqrt(c*c+s*s);if(t>u){n.push({movingBubble:i,stillBubble:l,distance:u});break}}}return n}function l(a){var e={};return{add:function(t,n,r){var i=c(t,n,r,a);e[i.id]=i},paint:function(a){for(var t in e)e[t].paint(a)},tick:function(){for(var a in e)e[a].tick()&&delete e[a]}}}function c(a,e,t,n){var r=32,i=r,o=1,l=6*(2*Math.random()-1)*n,c=0;return{id:Math.random(),paint:function(n){n.globalAlpha=o,t.paint(n,a,e),n.globalAlpha=1},tick:function(){return a+=l,e+=c,c+=n,l*=.95,i--,i?(o=i/r,void 0):!0}}}function s(a,e,t,n,r,i){var o=2*Math.max(a,e),l=a/2,c=e-t;return{paint:function(a,e,t,r){var s=e-l,u=t-c,v=Math.sqrt(s*s+u*u),d=s*o/v,f=u*o/v;-i>u/v&&(a.beginPath(),a.moveTo(l,c),a.lineTo(l+d,c+f),a.lineWidth=n,a.lineCap="round",a.strokeStyle=r,a.stroke())}}}function u(a,e,t,n,r){var i=t+", "+n+"%, "+r+"%",o=e.createLinearGradient(0,0,0,a);return o.addColorStop(0,"hsla("+i+", 0)"),o.addColorStop(1,"hsla("+i+", 0.2)"),o}function v(a,e,t){var n=(a-a*t)/2,r=(e-e*t)/2,i=document.createElement("canvas");return i.className="MainCanvas",i.width=a,i.height=e,i.style.transform="scale("+1/t+") translate("+n+"px, "+r+"px)",i}function d(){function t(){var a=we.get();return p(U,V,Y,a)}function n(){if(Ae){var a=Ge-U/2,e=V-Y-je,t=Math.sqrt(a*a+e*e),n=a/t,r=-e/t;if(-qe>r&&_e&&_e.ready){var i=_e.shape;Te.add(i,n,r),_e=null,He=10,Fe=null,Ae=!1}}}function r(){return!_e||!_e.ready||Be.showing||Be.hiding?!0:Be.visible?(Be.hide(),Ee.reset(),ke.reset(),!0):void 0}function c(a){Ge=a.clientX*C-Le,je=a.clientY*C-Oe}function u(a){Ge=a.clientX*C-Le,je=a.clientY*C-Oe,Ae=!0}function d(){requestAnimationFrame(function(){var a=Date.now();Pe.clear(),Re.clearRect(0,0,U,V),ye.paint(Ie),ke.paint(Ie),Ee.paint(Ie),Ae&&We.paint(Ie,Ge,je,_e.shape.laserGradient),_e&&_e.paint(Ie),Te.paint(Ie),Ne.paint(Ie),Se.paint(Ie),Be.visible&&Be.paint(Ie),Re.drawImage(Pe.canvas,0,0),Q.innerHTML="repaint "+(Date.now()-a),d()})}function f(a){var e;return e=a.isBomb?"bomb":"normal",xe[a.colorName][e]}function m(){localStorage.state=JSON.stringify({width:w,height:P,dpp:C,score:ke.get(),stillCanvas:Ee.getData(),nextBubbleColorName:_e?_e.shape.colorName:null,nextBubbleIsInjection:_e?_e.shape.isInjection:null})}function g(){for(var a=0;2>a;a++){var e=Date.now();Ee.tick(),Te.tick(),Ne.tick(),Se.tick(),Be.visible&&Be.tick();for(var n=o(Te.movingBubbles,Ee.stillBubbles,X),r=0;r<n.length;r++){var i=n[r],l=i.movingBubble;l.shiftBack(G-i.distance),b(l),Te.remove(l)}He?(He--,He||(_e=t())):_e&&_e.tick(),K.innerHTML="tick "+(Date.now()-e)}}function b(a){Ee.add(a),Ue++,Ue===Ve&&(Ue=0,Ee.shift())}var C=devicePixelRatio,w=innerWidth*C,P=innerHeight*C,E=9+Math.floor((w-300)/150),G=Math.floor(w/E),H=G/40,Y=G/2,F=Math.sin(Math.PI/3)*G,J=Y-1*H,X=2*J,U=w-w%G,V=P-P%G,z="MainPanel",K=document.createElement("div"),Q=document.createElement("div"),Z=document.createElement("div");Z.className=z+"-debug",Z.appendChild(Q),Z.appendChild(K);var $=S(J,H),ae=k(V,J,H),ee=B(J,H),te=j(V,J,H),ne=T(J,H),re=A(V,J,H),ie=D(J,H),oe=L(V,J,H),le=O(J,H),ce=R(V,J,H),se=q(J,H),ue=W(V,J,H),ve=_(J,H),de=BubbleShape_BlueInjection(V,J,H);de.laserGradient=ae.laserGradient,de.getParticleCanvases=ae.getParticleCanvases,de.normalShape=ae;var fe=BubbleShape_GreenInjection(V,J,H);fe.laserGradient=te.laserGradient,fe.getParticleCanvases=te.getParticleCanvases,fe.normalShape=te;var he=BubbleShape_RedInjection(V,J,H);he.laserGradient=re.laserGradient,he.getParticleCanvases=re.getParticleCanvases,he.normalShape=re;var me=BubbleShape_VioletInjection(V,J,H);me.laserGradient=oe.laserGradient,me.getParticleCanvases=oe.getParticleCanvases,me.normalShape=oe;var pe=BubbleShape_WhiteInjection(V,J,H);pe.laserGradient=ce.laserGradient,pe.getParticleCanvases=ce.getParticleCanvases,pe.normalShape=ce;var ge=BubbleShape_YellowInjection(V,J,H);ge.laserGradient=ue.laserGradient,ge.getParticleCanvases=ue.getParticleCanvases,ge.normalShape=ue;var be=$.getParticleCanvases(1).concat(ae.getParticleCanvases(1)).concat(te.getParticleCanvases(1)).concat(re.getParticleCanvases(1)).concat(oe.getParticleCanvases(1)).concat(ce.getParticleCanvases(1)).concat(ue.getParticleCanvases(1)),Ce=N(J,be),xe={anyColor:{normal:Ce},black:{normal:$},blue:{normal:ae,bomb:ee,injection:de},green:{normal:te,bomb:ne,injection:fe},red:{normal:re,bomb:ie,injection:he},violet:{normal:oe,bomb:le,injection:me},white:{normal:ce,bomb:se,injection:pe},yellow:{normal:ue,bomb:ve,injection:ge}},we=x();we.add(2,Ce),we.add(27,ae),we.add(1,de),we.add(27,te),we.add(1,fe),we.add(27,re),we.add(1,he),we.add(27,oe),we.add(1,me),we.add(27,ce),we.add(1,pe),we.add(27,ue),we.add(1,ge);var Me=x();Me.add(6,$),Me.add(13,ae),Me.add(1,ee),Me.add(13,te),Me.add(1,ne),Me.add(13,re),Me.add(1,ie),Me.add(13,oe),Me.add(1,le),Me.add(13,ce),Me.add(1,se),Me.add(13,ue),Me.add(1,ve);var Pe=e(U,V),Ie=Pe.c,ye=a(U,V,G,H),Ne=i(H),Se=l(H),ke=y(V,G,H),Be=M(U,V,H),Ee=I(V,Y,E,G,Me.get,F,Ne.add,Se.add,ke.add,function(){var a=ke.get();Be.show(a,Ye),a>Ye&&(Ye=a,localStorage.highScore=Ye)});Ee.reset();var Ge,je,Te=h(U,V,Y,X,b,H),Ae=!1,De=v(w,P,C),Le=(w-U)/2,Oe=(P-V)/2,Re=De.getContext("2d");Re.translate(Le,Oe);var qe=.2,We=s(U,V,Y,X,Re,qe),_e=t(),He=0,Ye=parseInt(localStorage.highScore,10);isFinite(Ye)||(Ye=0);var Fe=null,Je=!1,Xe=document.createElement("div");Xe.className=z,Xe.appendChild(De),Xe.appendChild(Z),Xe.addEventListener("mousedown",function(a){if(Je)Je=!1;else{if(r())return;Ae||u(a)}}),Xe.addEventListener("touchstart",function(a){if(!r()&&!Ae){var e=a.changedTouches[0];Fe=e.identifier,u(e)}}),addEventListener("mousemove",function(a){Je?Je=!1:c(a)}),Xe.addEventListener("touchmove",function(a){Je=!0,a.preventDefault();for(var e=a.changedTouches,t=0;t<e.length;t++){var n=e[t];n.identifier===Fe&&c(n)}}),addEventListener("mouseup",function(a){Je?Je=!1:n(a)}),Xe.addEventListener("touchend",function(a){Je=!0,a.preventDefault();for(var e=a.changedTouches,t=0;t<e.length;t++){var r=e[t];r.identifier===Fe&&n(r)}});var Ue=0,Ve=7;return document.addEventListener("visibilitychange",function(){"hidden"==document.visibilityState&&m()}),addEventListener("beforeunload",m),addEventListener("keydown",function(a){32==a.keyCode&&g()}),setInterval(g,30),d(),function(){var a=localStorage.state;if(a){var e=JSON.parse(a);if(e.width==w&&e.height==P&&e.dpp==C){ke.add(e.score),Ee.setData(e.stillCanvas,f);var t=e.nextBubbleColorName;if(t){var n;n=e.nextBubbleIsInjection?xe[t].injection:xe[t].normal,_e=p(U,V,Y,n)}}}}(),{element:Xe}}function f(a,e,t,n,r,i,o,l){var c=20*l,s=i*c,u=o*c,v={id:Math.random(),shape:r,x:a/2,y:e-t,paint:function(a){r.paint(a,v.x,v.y)},shiftBack:function(e){var n=Math.sqrt(i*i+o*o);v.x-=i*e/n,v.y-=o*e/n;var r=t-v.x;r>0&&(v.x+=2*r);var l=v.x+t-a;l>0&&(v.x-=2*l)},tick:function(){v.x+=s,v.y+=u;var e=t-v.x;e>0&&(v.x+=2*e,i=-i,s=i*c);var n=v.x+t-a;return n>0&&(v.x-=2*n,i=-i,s=i*c),v.y<=t?(v.y=t,!0):void 0}};return v}function h(a,e,t,n,r,i){function o(a){delete l[a.id]}var l={};return{movingBubbles:l,remove:o,add:function(r,o,c){var s=f(a,e,t,n,r,o,c,i);l[s.id]=s},paint:function(a){for(var e in l)l[e].paint(a)},tick:function(){for(var a in l){var e=l[a];e.tick()&&(r(e),o(e))}}}}function m(a,e){function t(a,e,t){var i=r[a];if(i){var o=i[e];!o||s[o.id]||o.shape.isBlack||(t.isAnyColor||o.shape.isAnyColor||o.shape.colorName==t.colorName)&&n(o)}}function n(a){var e=a.colNumber,n=a.rowNumber;s[a.id]=a,u.push(a);var r=a.shape;t(e-2,n,r),t(e+2,n,r),t(e-1,n-1,r),t(e+1,n-1,r),t(e-1,n+1,r),t(e+1,n+1,r)}var r={};for(var i in e){var o=e[i];r[i]={};for(var l in o){var c=o[l];r[i][c.rowNumber]=c}}var s={},u=[];return n(a),u}function p(a,e,t,n){var r=a/2,i=e+t,o=8,l=0,c=2*t/o,s={ready:!1,shape:n,paint:function(a){a.globalAlpha=l/o,n.paint(a,r,i),a.globalAlpha=1},tick:function(){o>l?(l++,i-=c):s.ready=!0}};return s}function g(a){function e(a,e){var n=i[a];if(n){var o=n[e];if(o){var l=o.id;v[l]||(v[l]=!0,delete r[l],t(o))}}}function t(a){var t=a.colNumber,n=a.rowNumber;e(t-1,n-1),e(t+1,n-1),e(t-2,n),e(t+2,n),e(t-1,n+1),e(t+1,n+1)}var n=[],r={},i={};for(var o in a){var l=a[o];i[o]={};for(var c in l){var s=l[c],u=s.rowNumber;u?(i[o][u]=s,r[s.id]=s):n.push(s)}}for(var v={},o=0;o<n.length;o++)t(n[o]);return r}function b(a,e,t,n){var r=6*a,i=r*(t-n)/t,o=i+1,l=document.createElement("canvas");l.width=l.height=2*o;var c=l.getContext("2d");return c.fillStyle=e,c.translate(o,o),c.arc(0,0,i,0,2*Math.PI),c.fill(),l}function C(a,e){for(var t=16,n=[],r=0;t>r;r++)n.push(b(a,e,t,r));return n}function x(){var a=[],e=0;return{add:function(t,n){a.push({chance:t,shape:n}),e+=t},get:function(){var t=Math.random()*e;for(var n in a){var r=a[n];if(t-=r.chance,0>t)return r.shape}}}}function w(a,e){var t=Math.random()*Math.PI*2,n=a+Math.random()*e,r=Math.cos(t)*n,i=Math.sin(t)*n;return[r,i]}function M(a,e,t){function n(){c&&c--,c||(b.visible=!1,b.hiding=!1),u=c/s,v=Math.pow(u,.25)}function r(){s>c?c++:b.showing=!1,u=c/s,v=Math.pow(u,.25)}var i,o,l,c=0,s=24,u=0,v=0,d=48*t,f="bold "+d+"px Arial, sans-serif",h=36*t,m="bold "+h+"px Arial, sans-serif",p=22*t,g=p+"px Arial, sans-serif",b={tick:r,hiding:!1,showing:!1,visible:!1,hide:function(){b.showing=!1,b.tick=n,b.hiding=!0},paint:function(t){t.fillStyle="rgba(0, 0, 0, "+.7*v+")",t.fillRect(0,0,a,e),t.fillStyle="rgba(255, 255, 255, "+v+")",t.textAlign="center",t.textBaseline="top";var n=a/2,r=e/4+e*v/4-1.5*d;t.save(),t.translate(n,r),t.font=g,t.fillText("YOUR SCORE",0,0),t.translate(0,p),t.font=f,t.fillText(i,0,0),t.translate(0,d+p),l?(t.font=m,t.fillStyle="hsl(60, 90%, 70%)",t.fillText("NEW RECORD!",0,0)):(t.font=g,t.fillText("HIGH SCORE",0,0),t.translate(0,p),t.font=f,t.fillText(o,0,0)),t.restore()},show:function(a,e){i=a,o=e,l=i>o,b.visible=!0,b.hiding=!1,b.tick=r,b.showing=!0}};return b}function P(a,e,t,n,r){var i={colNumber:r,id:Math.random(),rowNumber:n,shape:t,x:a,y:e,paint:function(e){i.shape.paint(e,a,i.y)}};return i}function I(a,e,n,r,i,o,l,c,s,u){function v(a){var e=a.id;I[e]=a,N[a.colNumber][e]=a,d(a)}function d(a){!G.gameOver&&a.rowNumber>=k&&(G.gameOver=!0,u())}function f(a,t){for(var n=e+a*e,l=e-o-w,c=0;t>c;c++){var s=i(),u=P(n,l,s,0,a);v(u),h(u,C+M),n+=r,a+=2}}function h(a,e){var t=a.id;y[t]?y[t].steps+=e:y[t]={steps:e,bubble:a}}function p(a){var e=a.id;delete I[e],delete N[a.colNumber][e]}function b(){for(var a in I){var e=I[a];h(e,C),e.rowNumber++,d(e)}B?f(1,n-1):f(0,n),B=!B,w+=o,M+=C}for(var C=4,x=o/C,w=0,M=0,I={},y={},N={},S=0;2*n-1>S;S++)N[S]={};var k=Math.floor((a-r)/o),B=!1,E=3,G={gameOver:!1,shift:b,stillBubbles:I,add:function(a){var n=a.y,i=M*x-e,u=Math.round((n+i)/o);n=u*o-i;var d=(u+(B?1:0))%2?e:0,f=a.x;f=Math.round((f-d)/r)*r+d;var b=a.shape,C=b.isInjection;C&&(b=a.shape=b.normalShape);var w=Math.floor(f/e)-1,I=P(f,n,b,u,w);if(v(I),M&&h(I,M),C){var y=InjectionNeighbors(I,N);for(var S in y)y[S].shape=b}else{var k=m(I,N);if(k.length>=E){var G=t(N,k),j=2*-(E-1);for(var S in G){var T=G[S];p(T),l(T.x,T.y,T.shape),j+=2}var A=g(N);for(var S in A){var D=A[S];p(D),c(D.x,D.y,D.shape),j+=1}s(j)}}},getData:function(){var a={odd:B,bubbles:[],shiftIndex:M};for(var e in I){var t=I[e],n=t.shape;a.bubbles.push({colNumber:t.colNumber,rowNumber:t.rowNumber,shape:{colorName:n.colorName,isBomb:n.isBomb}})}return a},isOdd:function(){return B},paint:function(a){for(var e in I)I[e].paint(a)},reset:function(){G.gameOver=!1,y={};for(var a in I)delete I[a];for(var a in N){var e=N[a];for(var a in e)delete e[a]}b(),b(),b()},setData:function(a,t){B=a.odd,M=Math.max(0,Math.floor(a.shiftIndex)),isFinite(M)||(M=0),w=M*o;for(var n in I)delete I[n];for(var n in N){var r=N[n];for(var n in r)delete r[n]}for(var n in y)delete y[n];var i=a.bubbles;for(var n in i){var l=i[n],c=t(l.shape);if(c){var s=l.colNumber,u=l.rowNumber,d=e+s*e,f=e+u*o,h=P(d,f,c,u,s);v(h)}}},tick:function(){for(var a in y){var e=y[a];e.steps--,e.bubble.y+=x,e.steps||(delete y[a],a--)}M&&(M--,w-=x)}};return G}function y(a,e,t){var n=0,r=10*t,i=a-e+10*t,o="bold "+26*t+"px Arial, sans-serif";return{add:function(a){n+=a},get:function(){return n},paint:function(a){a.textBaseline="top",a.font=o,a.textAlign="left",a.fillStyle="#777",a.fillText(n,r,i)},reset:function(){n=0}}}function N(a,e){function t(){var e=document.createElement("canvas");e.width=e.height=r;for(var t=e.getContext("2d"),i=t.createImageData(r,r),o=0;r>o;o++)for(var l=0;r>l;l++){var c=l-n,s=o-n,u=Math.sqrt(c*c+s*s)/a,v=Math.atan(s/c);0>c&&(v+=Math.PI),v-=.3;var d=0,f=0,h=0;d=Math.abs(v-Math.PI/2)-1,f=-Math.abs(v-Math.PI/3)+2,h=-Math.abs(v-2*Math.PI/3)+2,d=255*Math.max(0,Math.min(1,1-d*u)),f=255*Math.max(0,Math.min(1,1-f*u)),h=255*Math.max(0,Math.min(1,1-h*u)),d=16+223*d/256,f=16+223*f/256,h=16+223*h/256;var m=4*(o*r+l);i.data[m]=d,i.data[m+1]=f,i.data[m+2]=h,i.data[m+3]=255}return t.putImageData(i,0,0),e}var n=a+2,r=Math.floor(2*n),i=document.createElement("canvas");i.width=i.height=r;var o=i.getContext("2d");return o.arc(n,n,a,0,2*Math.PI),o.clip(),o.drawImage(t(),0,0),{isAnyColor:!0,colorName:"anyColor",laserGradient:"rgba(255, 255, 255, 0.2)",particleCanvases:e,getParticleCanvases:function(a){for(var t=[],n=0;a>n;n++){var r=Math.floor(Math.random()*e.length);t.push(e[r])}return t},paint:function(a,e,t){a.drawImage(i,e-n,t-n)}}}function S(a,e){var t="hsl(0, 0%, 40%)",n=a+2,r=G(t,"hsl(0, 0%, 15%)",a),i=C(e,t);return{color:t,colorName:"black",isBlack:!0,getParticleCanvases:function(a){for(var e=[],t=0;a>t;t++)e.push(i);return e},paint:function(a,e,t){a.drawImage(r,e-n,t-n)}}}function k(a,e,t){var n="hsl(220, 100%, 70%)",r=e+2,i=G(n,"hsl(220, 100%, 55%)",e),o=i.getContext("2d"),l=C(t,n);return{color:n,colorName:"blue",laserGradient:u(a,o,220,100,70),getParticleCanvases:function(a){for(var e=[],t=0;a>t;t++)e.push(l);return e},paint:function(a,e,t){a.drawImage(i,e-r,t-r)}}}function B(a,e){var t="hsl(220, 100%, 70%)",r=a+2,i=G(t,"hsl(220, 100%, 55%)",a);E(i,a);var o=n(e,t);return{color:t,colorName:"blue",isBomb:!0,getParticleCanvases:function(a){for(var e=[],t=0;a>t;t++)e.push(o);return e},paint:function(a,e,t){a.drawImage(i,e-r,t-r)}}}function E(a,e){var t=a.getContext("2d"),n="rgba(255 ,255, 255, 0.45)";t.beginPath(),t.arc(0,0,.2*e,0,2*Math.PI),t.fillStyle=n,t.fill();var r=3,i=2*Math.PI/r,o=.6*e,l=Math.PI/3;t.lineWidth=.6*e,t.beginPath(),t.rotate(-Math.PI/2-l/2);for(var c=0;r>c;c++)t.moveTo(o,0),t.arc(0,0,o,0,l),t.rotate(i);t.strokeStyle=n,t.stroke()}function G(a,e,t){var n=t+2,r=document.createElement("canvas");r.width=r.height=2*n;var i=r.getContext("2d"),o=-t/2,l=i.createRadialGradient(0,o,0,0,o,2*t);return l.addColorStop(0,a),l.addColorStop(.5,e),l.addColorStop(1,a),i.fillStyle=l,i.translate(n,n),i.arc(0,0,t,0,2*Math.PI),i.fillStyle=l,i.fill(),r}function j(a,e,t){var n="hsl(100, 100%, 40%)",r=e+2,i=G(n,"hsl(100, 100%, 30%)",e),o=i.getContext("2d"),l=C(t,n);return{color:n,colorName:"green",laserGradient:u(a,o,100,100,40),getParticleCanvases:function(a){for(var e=[],t=0;a>t;t++)e.push(l);return e},paint:function(a,e,t){a.drawImage(i,e-r,t-r)}}}function T(a,e){var t="hsl(100, 100%, 40%)",r=a+2,i=G(t,"hsl(100, 100%, 30%)",a);E(i,a);var o=n(e,t);return{color:t,colorName:"green",isBomb:!0,getParticleCanvases:function(a){for(var e=[],t=0;a>t;t++)e.push(o);return e},paint:function(a,e,t){a.drawImage(i,e-r,t-r)}}}function A(a,e,t){var n="hsl(5, 100%, 65%)",r=e+2,i=G(n,"hsl(5, 100%, 40%)",e),o=i.getContext("2d"),l=C(t,n);return{color:n,colorName:"red",laserGradient:u(a,o,5,100,65),getParticleCanvases:function(a){for(var e=[],t=0;a>t;t++)e.push(l);return e},paint:function(a,e,t){a.drawImage(i,e-r,t-r)}}}function D(a,e){var t="hsl(5, 100%, 65%)",r=a+2,i=G(t,"hsl(5, 100%, 40%)",a);E(i,a);var o=n(e,t);return{color:t,colorName:"red",isBomb:!0,getParticleCanvases:function(a){for(var e=[],t=0;a>t;t++)e.push(o);return e},paint:function(a,e,t){a.drawImage(i,e-r,t-r)}}}function L(a,e,t){var n="hsl(300, 100%, 60%)",r=e+2,i=G(n,"hsl(300, 100%, 40%)",e),o=i.getContext("2d"),l=C(t,n);return{color:n,colorName:"violet",laserGradient:u(a,o,300,100,60),getParticleCanvases:function(a){for(var e=[],t=0;a>t;t++)e.push(l);return e},paint:function(a,e,t){a.drawImage(i,e-r,t-r)}}}function O(a,e){var t="hsl(300, 100%, 60%)",r=a+2,i=G(t,"hsl(300, 100%, 40%)",a);E(i,a);var o=n(e,t);return{color:t,colorName:"violet",isBomb:!0,getParticleCanvases:function(a){for(var e=[],t=0;a>t;t++)e.push(o);return e},paint:function(a,e,t){a.drawImage(i,e-r,t-r)}}}function R(a,e,t){var n="hsl(0, 0%, 90%)",r=e+2,i=G(n,"hsl(0, 0%, 70%)",e),o=i.getContext("2d"),l=C(t,n);return{color:n,colorName:"white",laserGradient:u(a,o,0,0,90),getParticleCanvases:function(a){for(var e=[],t=0;a>t;t++)e.push(l);return e},paint:function(a,e,t){a.drawImage(i,e-r,t-r)}}}function q(a,e){var t="hsl(0, 0%, 90%)",r=a+2,i=G(t,"hsl(0, 0%, 70%)",a);E(i,a);var o=n(e,t);return{color:t,colorName:"white",isBomb:!0,getParticleCanvases:function(a){for(var e=[],t=0;a>t;t++)e.push(o);return e},paint:function(a,e,t){a.drawImage(i,e-r,t-r)}}}function W(a,e,t){var n="hsl(60, 90%, 70%)",r=e+2,i=G(n,"hsl(60, 90%, 40%)",e),o=i.getContext("2d"),l=C(t,n);return{color:n,colorName:"yellow",laserGradient:u(a,o,60,90,70),getParticleCanvases:function(a){for(var e=[],t=0;a>t;t++)e.push(l);return e},paint:function(a,e,t){a.drawImage(i,e-r,t-r)}}}function _(a,e){var t="hsl(60, 90%, 70%)",r=a+2,i=G(t,"hsl(60, 90%, 40%)",a);E(i,a);var o=n(e,t);return{color:t,colorName:"yellow",isBomb:!0,getParticleCanvases:function(a){for(var e=[],t=0;a>t;t++)e.push(o);return e},paint:function(a,e,t){a.drawImage(i,e-r,t-r)}}}!function(){var a=d();document.body.appendChild(a.element)}()}();
!function(){function a(a,n,t,e){var r=t/2,i=8*e,o=4*e,l=r-o/2,c=r+i,s=Math.asin(l/c),u=Math.sqrt(1-Math.pow(l/c,2))*c,v=t+i+o,d=a/2,f=n-v,h=document.createElement("canvas");h.width=a,h.height=v;var m=h.getContext("2d");return m.lineJoin=m.lineCap="round",m.translate(d,v-r),m.moveTo(-d+o,-l),m.lineTo(-u,-l),m.arc(0,0,c,-Math.PI+s,-s),m.lineTo(d-o,-l),m.strokeStyle="#555",m.lineWidth=o,m.stroke(),{paint:function(a){a.drawImage(h,0,f)}}}function n(a,n){var t=document.createElement("canvas");t.width=a,t.height=n;var e=t.getContext("2d");return{c:e,canvas:t,clear:function(){e.fillStyle="rgba(0, 0, 0, 0.3)",e.fillRect(0,0,a,n)}}}function t(a,n){function t(n,t){var i=a[n];if(i){var o=i[t];o&&!r[o.id]&&(r[o.id]=o,o.shape.isBomb&&e(o))}}function e(a){var n=a.colNumber,e=a.rowNumber;t(n-2,e),t(n+2,e),t(n-1,e-1),t(n+1,e-1),t(n-1,e+1),t(n+1,e+1)}for(var r={},i=0;i<n.length;i++){var o=n[i];r[o.id]=o,o.shape.isBomb&&e(o)}return r}function e(a,n){for(var t=24,e=[],r=0;t>r;r++)e.push(C(a,n,t,r));return e}function r(a,n,t,e){var r,i;t.isBomb?(r=3*e,i=10):(r=2*e,i=5);for(var o=0,l=t.getParticleCanvases(i),c=[],s=0;i>s;s++){var u=I(r,r),v=I(r,r);c.push({canvases:l[s],x:a+u[0],y:n+u[1],dx:v[0],dy:v[1]})}return{id:Math.random(),paint:function(e){o||t.paint(e,a,n);for(var r in c){var i=c[r],l=i.canvases[o],s=i.x-l.width/2,u=i.y-l.height/2;e.drawImage(l,s,u)}},tick:function(){for(var a in c){var n=c[a];n.x+=n.dx,n.y+=n.dy}return o++,o==l[0].length?!0:void 0}}}function i(a){var n={};return{add:function(t,e,i){var o=r(t,e,i,a);n[o.id]=o},paint:function(a){for(var t in n)n[t].paint(a)},tick:function(){for(var a in n)n[a].tick()&&delete n[a]}}}function o(a,n,t){var e=[];for(var r in a){var i=a[r];for(var o in n){var l=n[o],c=l.x-i.x,s=l.y-i.y,u=Math.sqrt(c*c+s*s);if(t>u){e.push({movingBubble:i,stillBubble:l,distance:u});break}}}return e}function l(a){var n={};for(var t in a){var e=a[t];n[t]={};for(var r in e){var i=e[r];n[t][i.rowNumber]=i}}return n}function c(a){var n={};return{add:function(t,e,r){var i=s(t,e,r,a);n[i.id]=i},paint:function(a){for(var t in n)n[t].paint(a)},tick:function(){for(var a in n)n[a].tick()&&delete n[a]}}}function s(a,n,t,e){var r=32,i=r,o=1,l=6*(2*Math.random()-1)*e,c=0;return{id:Math.random(),paint:function(e){e.globalAlpha=o,t.paint(e,a,n),e.globalAlpha=1},tick:function(){return a+=l,n+=c,c+=e,l*=.95,i--,i?(o=i/r,void 0):!0}}}function u(a,n){function t(a,t){var r=n[a];if(r){var i=r[t];i&&!o[i.id]&&e(i)}}function e(a){c.push(a),o[a.id]=a}function r(){var a=c.shift();if(a){var n=a.colNumber,t=a.rowNumber;if(l.push(a),5!=l.length){y(i);for(var e in i)i[e](n,t);r()}}}var i=[function(a,n){t(a-2,n)},function(a,n){t(a+2,n)},function(a,n){t(a-1,n-1)},function(a,n){t(a+1,n-1)},function(a,n){t(a-1,n+1)},function(a,n){t(a+1,n+1)}],o={},l=[],c=[];return e(a),r(),l}function v(a,n,t,e,r,i){var o=2*Math.max(a,n),l=a/2,c=n-t;return{paint:function(a,n,t,r){var s=n-l,u=t-c,v=Math.sqrt(s*s+u*u),d=s*o/v,f=u*o/v;-i>u/v&&(a.beginPath(),a.moveTo(l,c),a.lineTo(l+d,c+f),a.lineWidth=e,a.lineCap="round",a.strokeStyle=r,a.stroke())}}}function d(a,n,t,e,r){var i=t+", "+e+"%, "+r+"%",o=n.createLinearGradient(0,0,0,a);return o.addColorStop(0,"hsla("+i+", 0)"),o.addColorStop(1,"hsla("+i+", 0.2)"),o}function f(a,n,t){var e=(a-a*t)/2,r=(n-n*t)/2,i=document.createElement("canvas");return i.className="MainCanvas",i.width=a,i.height=n,i.style.transform="scale("+1/t+") translate("+e+"px, "+r+"px)",i}function h(){function t(){var a=jn.get();return b(rn,on,an,a)}function e(a){et?et=!1:d(a)}function r(a){et?et=!1:s(a)}function l(a){Wn.add(a),it++,it===ot&&(it=0,Wn.shift())}function s(){if(Xn){var a=zn-rn/2,n=on-an-Jn,t=Math.sqrt(a*a+n*n),e=a/t,r=-n/t;if(-Zn>r&&_n&&_n.ready){var i=_n.shape;Yn.add(i,e,r),_n=null,at=10,tt=null,Xn=!1}}}function u(){return!_n||!_n.ready||Hn.showing||Hn.hiding?!0:Hn.visible?(Hn.hide(),Wn.reset(),Fn.reset(),!0):void 0}function d(a){zn=a.clientX*S-Kn,Jn=a.clientY*S-Qn}function h(a){zn=a.clientX*S-Kn,Jn=a.clientY*S-Qn,Xn=!0}function m(){lt=I(function(){var a=Date.now();Ln.clear(),Vn.clearRect(0,0,rn,on),On.paint(Dn),Fn.paint(Dn),Wn.paint(Dn),Xn&&$n.paint(Dn,zn,Jn,_n.shape.laserGradient),_n&&_n.paint(Dn),Yn.paint(Dn),Rn.paint(Dn),qn.paint(Dn),Hn.visible&&Hn.paint(Dn),Vn.drawImage(Ln.canvas,0,0),sn.innerHTML="repaint "+(Date.now()-a),m()})}function g(a){var n;return n=a.isBomb?"bomb":"normal",Tn[a.colorName][n]}function w(){localStorage.state=JSON.stringify({width:T,height:q,dpp:S,score:Fn.get(),stillCanvas:Wn.getData(),nextBubbleColorName:_n?_n.shape.colorName:null,nextBubbleIsInjection:_n?_n.shape.isInjection:null})}function C(){for(var a=0;2>a;a++){var n=Date.now();Wn.tick(),Yn.tick(),Rn.tick(),qn.tick(),Hn.visible&&Hn.tick();for(var e=o(Yn.movingBubbles,Wn.stillBubbles,en),r=0;r<e.length;r++){var i=e[r],c=i.movingBubble;c.shiftBack($-i.distance),l(c),Yn.remove(c)}at?(at--,at||(_n=t())):_n&&_n.tick(),cn.innerHTML="tick "+(Date.now()-n)}}function x(){"hidden"==document.visibilityState&&w()}var I=window.requestAnimationFrame,y=window.cancelAnimationFrame;I||(I=window.mozRequestAnimationFrame,y=window.mozCancelAnimationFrame);var S=devicePixelRatio,T=innerWidth*S,q=innerHeight*S,X=9+Math.floor((T-300)/130),$=Math.floor(T/X),_=$/40,an=$/2,nn=Math.sin(Math.PI/3)*$,tn=an-1*_,en=2*tn,rn=T-T%$,on=q-q%$,ln="MainPanel",cn=document.createElement("div"),sn=document.createElement("div"),un=document.createElement("div");un.className=ln+"-debug",un.appendChild(sn),un.appendChild(cn);var vn=E(tn,_),dn=G(on,tn,_),fn=R(tn,_),hn=j(on,tn,_),mn=F(tn,_),pn=A(on,tn,_),gn=H(tn,_),bn=L(on,tn,_),wn=W(tn,_),Cn=D(on,tn,_),xn=z(tn,_),Mn=O(on,tn,_),In=J(tn,_),Nn=Y(on,tn,_,dn),Pn=U(on,tn,_,hn),yn=K(on,tn,_,pn),Sn=Q(on,tn,_,bn),kn=V(on,tn,_,Cn),Bn=Z(on,tn,_,Mn),En=vn.getParticleCanvases(1).concat(dn.getParticleCanvases(1)).concat(hn.getParticleCanvases(1)).concat(pn.getParticleCanvases(1)).concat(bn.getParticleCanvases(1)).concat(Cn.getParticleCanvases(1)).concat(Mn.getParticleCanvases(1)),Gn=B(on,tn,En),Tn={anyColor:{normal:Gn},black:{normal:vn},blue:{normal:dn,bomb:fn,injection:Nn},green:{normal:hn,bomb:mn,injection:Pn},red:{normal:pn,bomb:gn,injection:yn},violet:{normal:bn,bomb:wn,injection:Sn},white:{normal:Cn,bomb:xn,injection:kn},yellow:{normal:Mn,bomb:In,injection:Bn}},jn=M();jn.add(10,Gn),jn.add(40,dn),jn.add(1,Nn),jn.add(40,hn),jn.add(1,Pn),jn.add(40,pn),jn.add(1,yn),jn.add(40,bn),jn.add(1,Sn),jn.add(40,Cn),jn.add(1,kn),jn.add(40,Mn),jn.add(1,Bn);var An=M();An.add(9,vn),An.add(13,dn),An.add(1,fn),An.add(13,hn),An.add(1,mn),An.add(13,pn),An.add(1,gn),An.add(13,bn),An.add(1,wn),An.add(13,Cn),An.add(1,xn),An.add(13,Mn),An.add(1,In);var Ln=n(rn,on),Dn=Ln.c,On=a(rn,on,$,_),Rn=i(_),qn=c(_),Fn=P(on,$,_),Hn=N(rn,on,_),Wn=k(on,an,X,$,An.get,nn,Rn.add,qn.add,Fn.add,function(){var a=Fn.get();Hn.show(a,nt),a>nt&&(nt=a,localStorage.highScore=nt)});Wn.reset();var zn,Jn,Yn=p(rn,on,an,en,l,_),Xn=!1,Un=f(T,q,S),Kn=(T-rn)/2,Qn=(q-on)/2,Vn=Un.getContext("2d");Vn.translate(Kn,Qn);var Zn=.2,$n=v(rn,on,an,en,Vn,Zn),_n=t(),at=0,nt=parseInt(localStorage.highScore,10);isFinite(nt)||(nt=0);var tt=null,et=!1,rt=document.createElement("div");rt.className=ln,rt.appendChild(Un),rt.appendChild(un),rt.addEventListener("mousedown",function(a){if(et)et=!1;else{if(u())return;Xn||h(a)}}),rt.addEventListener("touchstart",function(a){if(!u()&&!Xn){var n=a.changedTouches[0];tt=n.identifier,h(n)}}),rt.addEventListener("touchmove",function(a){et=!0,a.preventDefault();for(var n=a.changedTouches,t=0;t<n.length;t++){var e=n[t];e.identifier===tt&&d(e)}}),rt.addEventListener("touchend",function(a){et=!0,a.preventDefault();for(var n=a.changedTouches,t=0;t<n.length;t++){var e=n[t];e.identifier===tt&&s(e)}});var it=0,ot=2+Math.ceil(X/2);document.addEventListener("visibilitychange",x),addEventListener("beforeunload",w),addEventListener("mousemove",e),addEventListener("mouseup",r);var lt,ct=setInterval(C,30),st=setInterval(w,3e4);return m(),function(){var a=localStorage.state;if(a){var n=JSON.parse(a);if(n.width==T&&n.height==q&&n.dpp==S){Fn.add(n.score),Wn.setData(n.stillCanvas,g);var t=n.nextBubbleColorName;if(t){var e;e=n.nextBubbleIsInjection?Tn[t].injection:Tn[t].normal,_n=b(rn,on,an,e)}}}}(),{element:rt,destroy:function(){clearInterval(ct),clearInterval(st),removeEventListener("beforeunload",w),removeEventListener("mousemove",e),removeEventListener("mouseup",r),document.removeEventListener("visibilitychange",x),y(lt)}}}function m(a,n,t,e,r,i,o,l){var c=20*l,s=i*c,u=o*c,v={id:Math.random(),shape:r,x:a/2,y:n-t,paint:function(a){r.paint(a,v.x,v.y)},shiftBack:function(n){var e=Math.sqrt(i*i+o*o);v.x-=i*n/e,v.y-=o*n/e;var r=t-v.x;r>0&&(v.x+=2*r);var l=v.x+t-a;l>0&&(v.x-=2*l)},tick:function(){v.x+=s,v.y+=u;var n=t-v.x;n>0&&(v.x+=2*n,i=-i,s=i*c);var e=v.x+t-a;return e>0&&(v.x-=2*e,i=-i,s=i*c),v.y<=t?(v.y=t,!0):void 0}};return v}function p(a,n,t,e,r,i){function o(a){delete l[a.id]}var l={};return{movingBubbles:l,remove:o,add:function(r,o,c){var s=m(a,n,t,e,r,o,c,i);l[s.id]=s},paint:function(a){for(var n in l)l[n].paint(a)},tick:function(){for(var a in l){var n=l[a];n.tick()&&(r(n),o(n))}}}}function g(a,n){function t(a,t,i){var o=n[a];if(o){var l=o[t];!l||r[l.id]||l.shape.isBlack||(i.isAnyColor||l.shape.isAnyColor||l.shape.colorName==i.colorName)&&e(l)}}function e(a){var n=a.colNumber,e=a.rowNumber;r[a.id]=a,i.push(a);var o=a.shape;t(n-2,e,o),t(n+2,e,o),t(n-1,e-1,o),t(n+1,e-1,o),t(n-1,e+1,o),t(n+1,e+1,o)}var r={},i=[];return e(a),i}function b(a,n,t,e){var r=a/2,i=n+t,o=8,l=0,c=2*t/o,s={ready:!1,shape:e,paint:function(a){a.globalAlpha=l/o,e.paint(a,r,i),a.globalAlpha=1},tick:function(){o>l?(l++,i-=c):s.ready=!0}};return s}function w(a){function n(a,n){var e=i[a];if(e){var o=e[n];if(o){var l=o.id;v[l]||(v[l]=!0,delete r[l],t(o))}}}function t(a){var t=a.colNumber,e=a.rowNumber;n(t-1,e-1),n(t+1,e-1),n(t-2,e),n(t+2,e),n(t-1,e+1),n(t+1,e+1)}var e=[],r={},i={};for(var o in a){var l=a[o];i[o]={};for(var c in l){var s=l[c],u=s.rowNumber;u?(i[o][u]=s,r[s.id]=s):e.push(s)}}for(var v={},o=0;o<e.length;o++)t(e[o]);return r}function C(a,n,t,e){var r=6*a,i=r*(t-e)/t,o=i+1,l=document.createElement("canvas");l.width=l.height=2*o;var c=l.getContext("2d");return c.fillStyle=n,c.translate(o,o),c.arc(0,0,i,0,2*Math.PI),c.fill(),l}function x(a,n){for(var t=16,e=[],r=0;t>r;r++)e.push(C(a,n,t,r));return e}function M(){var a=[],n=0;return{add:function(t,e){a.push({chance:t,shape:e}),n+=t},get:function(){var t=Math.random()*n;for(var e in a){var r=a[e];if(t-=r.chance,0>t)return r.shape}}}}function I(a,n){var t=Math.random()*Math.PI*2,e=a+Math.random()*n,r=Math.cos(t)*e,i=Math.sin(t)*e;return[r,i]}function N(a,n,t){function e(){c&&c--,c||(b.visible=!1,b.hiding=!1),u=c/s,v=Math.pow(u,.25)}function r(){s>c?c++:b.showing=!1,u=c/s,v=Math.pow(u,.25)}var i,o,l,c=0,s=24,u=0,v=0,d=48*t,f="bold "+d+"px Arial, sans-serif",h=36*t,m="bold "+h+"px Arial, sans-serif",p=22*t,g=p+"px Arial, sans-serif",b={tick:r,hiding:!1,showing:!1,visible:!1,hide:function(){b.showing=!1,b.tick=e,b.hiding=!0},paint:function(t){t.fillStyle="rgba(0, 0, 0, "+.7*v+")",t.fillRect(0,0,a,n),t.fillStyle="rgba(255, 255, 255, "+v+")",t.textAlign="center",t.textBaseline="top";var e=a/2,r=n/4+n*v/4-1.5*d;t.save(),t.translate(e,r),t.font=g,t.fillText("YOUR SCORE",0,0),t.translate(0,p),t.font=f,t.fillText(i,0,0),t.translate(0,d+p),l?(t.font=m,t.fillStyle="hsl(60, 90%, 70%)",t.fillText("NEW RECORD!",0,0)):(t.font=g,t.fillText("HIGH SCORE",0,0),t.translate(0,p),t.font=f,t.fillText(o,0,0)),t.restore()},show:function(a,n){i=a,o=n,l=i>o,b.visible=!0,b.hiding=!1,b.tick=r,b.showing=!0}};return b}function P(a,n,t){var e=0,r=10*t,i=a-n+10*t,o="bold "+26*t+"px Arial, sans-serif";return{add:function(a){e+=a},get:function(){return e},paint:function(a){a.textBaseline="top",a.font=o,a.textAlign="left",a.fillStyle="#777",a.fillText(e,r,i)},reset:function(){e=0}}}function y(a){for(var n=0;n<a.length;n++){var t=a[n],e=n+Math.floor(Math.random()*(a.length-n));a[n]=a[e],a[e]=t}return a}function S(a,n,t,e,r){var i={colNumber:r,id:Math.random(),rowNumber:e,shape:t,x:a,y:n,paint:function(n){i.shape.paint(n,a,i.y)}};return i}function k(a,n,e,r,i,o,c,s,v,d){function f(a){var n=a.id;P[n]=a,k[a.colNumber][n]=a,h(a)}function h(a){!j.gameOver&&a.rowNumber>=E&&(j.gameOver=!0,d())}function m(a,t){for(var e=n+a*n,l=n-o-I,c=0;t>c;c++){var s=i(),u=S(e,l,s,0,a);f(u),p(u,x+N),e+=r,a+=2}}function p(a,n){var t=a.id;y[t]?y[t].steps+=n:y[t]={steps:n,bubble:a}}function b(a){var n=a.id;delete P[n],delete k[a.colNumber][n]}function C(){for(var a in P){var n=P[a];p(n,x),n.rowNumber++,h(n)}G?m(1,e-1):m(0,e),G=!G,I+=o,N+=x}for(var x=4,M=o/x,I=0,N=0,P={},y={},k={},B=0;2*e-1>B;B++)k[B]={};var E=Math.floor((a-r)/o),G=!1,T=3;window.stillBubbles=P,window.columns=k;var j={gameOver:!1,shift:C,stillBubbles:P,add:function(a){var e=a.y,i=N*M-n,d=Math.round((e+i)/o);e=d*o-i;var h=(d+(G?1:0))%2?n:0,m=a.x;m=Math.round((m-h)/r)*r+h;var C=a.shape,x=C.isInjection;x&&(C=a.shape=C.normalShape);var I=Math.floor(m/n)-1,P=S(m,e,C,d,I);f(P),N&&p(P,N);var y=l(k);if(x){var B=u(P,y);for(var E in B)B[E].shape=C}else{var j=g(P,y);if(j.length>=T){var A=t(y,j),L=2*-(T-1);for(var E in A){var D=A[E];b(D),c(D.x,D.y,D.shape),L+=2}var O=w(k);for(var E in O){var R=O[E];b(R),s(R.x,R.y,R.shape),L+=1}v(L)}}},getData:function(){var a={odd:G,bubbles:[],shiftIndex:N};for(var n in P){var t=P[n],e=t.shape;a.bubbles.push({colNumber:t.colNumber,rowNumber:t.rowNumber,shape:{colorName:e.colorName,isBomb:e.isBomb}})}return a},isOdd:function(){return G},paint:function(a){for(var n in P)P[n].paint(a)},reset:function(){j.gameOver=!1,y={};for(var a in P)delete P[a];for(var a in k){var n=k[a];for(var a in n)delete n[a]}C(),C(),C()},setData:function(a,t){G=a.odd,N=Math.max(0,Math.floor(a.shiftIndex)),isFinite(N)||(N=0),I=N*o;for(var e in P)delete P[e];for(var e in k){var r=k[e];for(var e in r)delete r[e]}for(var e in y)delete y[e];var i=a.bubbles;for(var e in i){var l=i[e],c=t(l.shape);if(c){var s=l.colNumber,u=l.rowNumber,v=n+s*n,d=n+u*o,h=S(v,d,c,u,s);f(h)}}},tick:function(){for(var a in y){var n=y[a];n.steps--,n.bubble.y+=M,n.steps||(delete y[a],a--)}N&&(N--,I-=M)}};return j}function B(a,n,t){function e(){var a=document.createElement("canvas");a.width=a.height=i;for(var t=a.getContext("2d"),e=t.createImageData(i,i),o=0;i>o;o++)for(var l=0;i>l;l++){var c=l-r,s=o-r,u=Math.sqrt(c*c+s*s)/n,v=Math.atan(s/c);0>c&&(v+=Math.PI),v-=.3;var d=0,f=0,h=0;d=Math.abs(v-Math.PI/2)-1,f=-Math.abs(v-Math.PI/3)+2,h=-Math.abs(v-2*Math.PI/3)+2,d=255*Math.max(0,Math.min(1,1-d*u)),f=255*Math.max(0,Math.min(1,1-f*u)),h=255*Math.max(0,Math.min(1,1-h*u)),d=16+223*d/256,f=16+223*f/256,h=16+223*h/256;var m=4*(o*i+l);e.data[m]=d,e.data[m+1]=f,e.data[m+2]=h,e.data[m+3]=255}return t.putImageData(e,0,0),a}var r=n+2,i=Math.floor(2*r),o=document.createElement("canvas");o.width=o.height=i;var l=o.getContext("2d");return l.arc(r,r,n,0,2*Math.PI),l.fill(),l.globalCompositeOperation="source-atop",l.drawImage(e(),0,0),{isAnyColor:!0,colorName:"anyColor",laserGradient:function(){for(var n=l.createLinearGradient(0,0,0,a),t=0;6>=t;t++){var e=t/6,r=360*e,i=.2*e;n.addColorStop(e,"hsla("+r+", 100%, 50%, "+i+")")}return n}(),particleCanvases:t,getParticleCanvases:function(a){for(var n=[],e=0;a>e;e++){var r=Math.floor(Math.random()*t.length);n.push(t[r])}return n},paint:function(a,n,t){a.drawImage(o,n-r,t-r)}}}function E(a,n){var t="hsl(0, 0%, 40%)",e=a+2,r=T(t,"hsl(0, 0%, 15%)",a),i=x(n,t);return{color:t,colorName:"black",isBlack:!0,getParticleCanvases:function(a){for(var n=[],t=0;a>t;t++)n.push(i);return n},paint:function(a,n,t){a.drawImage(r,n-e,t-e)}}}function G(a,n,t){var e="hsl(220, 100%, 70%)",r=n+2,i=T(e,"hsl(220, 100%, 55%)",n),o=i.getContext("2d"),l=x(t,e);return{color:e,colorName:"blue",laserGradient:d(a,o,220,100,70),getParticleCanvases:function(a){for(var n=[],t=0;a>t;t++)n.push(l);return n},paint:function(a,n,t){a.drawImage(i,n-r,t-r)}}}function T(a,n,t){var e=t+2,r=document.createElement("canvas");r.width=r.height=2*e;var i=r.getContext("2d"),o=-t/2,l=i.createRadialGradient(0,o,0,0,o,2*t);return l.addColorStop(0,a),l.addColorStop(.5,n),l.addColorStop(1,a),i.fillStyle=l,i.translate(e,e),i.arc(0,0,t,0,2*Math.PI),i.fillStyle=l,i.fill(),r}function j(a,n,t){var e="hsl(100, 100%, 40%)",r=n+2,i=T(e,"hsl(100, 100%, 30%)",n),o=i.getContext("2d"),l=x(t,e);return{color:e,colorName:"green",laserGradient:d(a,o,100,100,40),getParticleCanvases:function(a){for(var n=[],t=0;a>t;t++)n.push(l);return n},paint:function(a,n,t){a.drawImage(i,n-r,t-r)}}}function A(a,n,t){var e="hsl(5, 100%, 65%)",r=n+2,i=T(e,"hsl(5, 100%, 40%)",n),o=i.getContext("2d"),l=x(t,e);return{color:e,colorName:"red",laserGradient:d(a,o,5,100,65),getParticleCanvases:function(a){for(var n=[],t=0;a>t;t++)n.push(l);return n},paint:function(a,n,t){a.drawImage(i,n-r,t-r)}}}function L(a,n,t){var e="hsl(300, 100%, 60%)",r=n+2,i=T(e,"hsl(300, 100%, 40%)",n),o=i.getContext("2d"),l=x(t,e);return{color:e,colorName:"violet",laserGradient:d(a,o,300,100,60),getParticleCanvases:function(a){for(var n=[],t=0;a>t;t++)n.push(l);return n},paint:function(a,n,t){a.drawImage(i,n-r,t-r)}}}function D(a,n,t){var e="hsl(0, 0%, 90%)",r=n+2,i=T(e,"hsl(0, 0%, 70%)",n),o=i.getContext("2d"),l=x(t,e);return{color:e,colorName:"white",laserGradient:d(a,o,0,0,90),getParticleCanvases:function(a){for(var n=[],t=0;a>t;t++)n.push(l);return n},paint:function(a,n,t){a.drawImage(i,n-r,t-r)}}}function O(a,n,t){var e="hsl(60, 90%, 70%)",r=n+2,i=T(e,"hsl(60, 90%, 40%)",n),o=i.getContext("2d"),l=x(t,e);return{color:e,colorName:"yellow",laserGradient:d(a,o,60,90,70),getParticleCanvases:function(a){for(var n=[],t=0;a>t;t++)n.push(l);return n},paint:function(a,n,t){a.drawImage(i,n-r,t-r)}}}function R(a,n){var t="hsl(220, 100%, 70%)",r=a+2,i=T(t,"hsl(220, 100%, 55%)",a);q(i,a,"hsla(220, 85%, 25%, 0.6)");var o=e(n,t);return{color:t,colorName:"blue",isBomb:!0,getParticleCanvases:function(a){for(var n=[],t=0;a>t;t++)n.push(o);return n},paint:function(a,n,t){a.drawImage(i,n-r,t-r)}}}function q(a,n,t){var e=a.getContext("2d");e.beginPath(),e.arc(0,0,.2*n,0,2*Math.PI),e.fillStyle=t,e.fill();var r=3,i=2*Math.PI/r,o=.6*n,l=Math.PI/3;e.lineWidth=.6*n,e.beginPath(),e.rotate(-Math.PI/2-l/2);for(var c=0;r>c;c++)e.moveTo(o,0),e.arc(0,0,o,0,l),e.rotate(i);e.strokeStyle=t,e.stroke()}function F(a,n){var t="hsl(100, 100%, 40%)",r=a+2,i=T(t,"hsl(100, 100%, 30%)",a);q(i,a,"hsla(100, 85%, 15%, 0.6)");var o=e(n,t);return{color:t,colorName:"green",isBomb:!0,getParticleCanvases:function(a){for(var n=[],t=0;a>t;t++)n.push(o);return n},paint:function(a,n,t){a.drawImage(i,n-r,t-r)}}}function H(a,n){var t="hsl(5, 100%, 65%)",r=a+2,i=T(t,"hsl(5, 100%, 40%)",a);q(i,a,"hsla(5, 85%, 20%, 0.6)");var o=e(n,t);return{color:t,colorName:"red",isBomb:!0,getParticleCanvases:function(a){for(var n=[],t=0;a>t;t++)n.push(o);return n},paint:function(a,n,t){a.drawImage(i,n-r,t-r)}}}function W(a,n){var t="hsl(300, 100%, 60%)",r=a+2,i=T(t,"hsl(300, 100%, 40%)",a);q(i,a,"hsla(300, 85%, 20%, 0.6)");var o=e(n,t);return{color:t,colorName:"violet",isBomb:!0,getParticleCanvases:function(a){for(var n=[],t=0;a>t;t++)n.push(o);return n},paint:function(a,n,t){a.drawImage(i,n-r,t-r)}}}function z(a,n){var t="hsl(0, 0%, 90%)",r=a+2,i=T(t,"hsl(0, 0%, 70%)",a);q(i,a,"hsla(0, 0%, 25%, 0.5)");var o=e(n,t);return{color:t,colorName:"white",isBomb:!0,getParticleCanvases:function(a){for(var n=[],t=0;a>t;t++)n.push(o);return n},paint:function(a,n,t){a.drawImage(i,n-r,t-r)}}}function J(a,n){var t="hsl(60, 90%, 70%)",r=a+2,i=T(t,"hsl(60, 90%, 40%)",a);q(i,a,"hsla(60, 80%, 15%, 0.6)");var o=e(n,t);return{color:t,colorName:"yellow",isBomb:!0,getParticleCanvases:function(a){for(var n=[],t=0;a>t;t++)n.push(o);return n},paint:function(a,n,t){a.drawImage(i,n-r,t-r)}}}function Y(a,n,t,e){var r="hsl(220, 100%, 70%)",i=n+2,o=T(r,"hsl(220, 100%, 55%)",n);return X(o,t,"hsla(220, 85%, 20%, 0.6)"),{color:r,colorName:"blue",getParticleCanvases:e.getParticleCanvases,isInjection:!0,laserGradient:e.laserGradient,normalShape:e,paint:function(a,n,t){a.drawImage(o,n-i,t-i)}}}function X(a,n,t){function e(a,n){i+=a,o+=n,r.lineTo(i,o)}var r=a.getContext("2d"),i=-11,o=-7;r.scale(n,n),r.beginPath(),r.moveTo(i,o),e(4,-4),e(1,1),e(-1,1),e(3.5,3.5),e(3.5,-3.5),e(1,1),e(-1.5,1.5),e(9,9),e(-2.5,2.5),e(3.5,3.5),e(0,2),e(-4.5,-4.5),e(-2.5,2.5),e(-9,-9),e(-1.5,1.5),e(-1,-1),e(3.5,-3.5),e(-3.5,-3.5),e(-1,1),r.closePath(),r.fillStyle=t,r.fill()}function U(a,n,t,e){var r="hsl(100, 100%, 40%)",i=n+2,o=T(r,"hsl(100, 100%, 30%)",n);return X(o,t,"hsla(100, 85%, 10%, 0.6)"),{color:r,colorName:"green",getParticleCanvases:e.getParticleCanvases,isInjection:!0,laserGradient:e.laserGradient,normalShape:e,paint:function(a,n,t){a.drawImage(o,n-i,t-i)}}}function K(a,n,t,e){var r="hsl(5, 100%, 65%)",i=n+2,o=T(r,"hsl(5, 100%, 40%)",n);return X(o,t,"hsla(5, 85%, 15%, 0.6)"),{color:r,colorName:"red",getParticleCanvases:e.getParticleCanvases,isInjection:!0,laserGradient:e.laserGradient,normalShape:e,paint:function(a,n,t){a.drawImage(o,n-i,t-i)}}}function Q(a,n,t,e){var r="hsl(300, 100%, 60%)",i=n+2,o=T(r,"hsl(300, 100%, 40%)",n);return X(o,t,"hsla(300, 85%, 15%, 0.6)"),{color:r,colorName:"violet",getParticleCanvases:e.getParticleCanvases,isInjection:!0,laserGradient:e.laserGradient,normalShape:e,paint:function(a,n,t){a.drawImage(o,n-i,t-i)}}}function V(a,n,t,e){var r="hsl(0, 0%, 90%)",i=n+2,o=T(r,"hsl(0, 0%, 70%)",n);return X(o,t,"hsla(0, 0%, 20%, 0.5)"),{color:r,colorName:"white",getParticleCanvases:e.getParticleCanvases,isInjection:!0,laserGradient:e.laserGradient,normalShape:e,paint:function(a,n,t){a.drawImage(o,n-i,t-i)}}}function Z(a,n,t,e){var r="hsl(60, 90%, 70%)",i=n+2,o=T(r,"hsl(60, 90%, 40%)",n);return X(o,t,"hsla(60, 80%, 10%, 0.6)"),{color:r,colorName:"yellow",getParticleCanvases:e.getParticleCanvases,isInjection:!0,laserGradient:e.laserGradient,normalShape:e,paint:function(a,n,t){a.drawImage(o,n-i,t-i)}}}!function(){function a(){n=h(),t.appendChild(n.element)}var n,t=document.body;a(),addEventListener("resize",function(){n.destroy(),document.body.removeChild(n.element),a()})}()}();
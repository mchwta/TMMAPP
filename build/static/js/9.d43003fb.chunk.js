(this["webpackJsonpdaily-moments"]=this["webpackJsonpdaily-moments"]||[]).push([[9],{154:function(e,o,t){"use strict";t.r(o),t.d(o,"ion_popover",(function(){return b}));var r=t(12),i=t(33),n=t(34),a=t(183),s=t(43),p=t(181),c=t(38),l=t(19),d=(t(27),t(49),function(e,o){var t="top",r="left",i=e.querySelector(".popover-content"),n=i.getBoundingClientRect(),a=n.width,s=n.height,p=e.ownerDocument.defaultView.innerWidth,c=e.ownerDocument.defaultView.innerHeight,d=o&&o.target&&o.target.getBoundingClientRect(),v=null!=d&&"top"in d?d.top:c/2-s/2,h=null!=d&&"left"in d?d.left:p/2,f=d&&d.width||0,b=d&&d.height||0,m=e.querySelector(".popover-arrow"),g=m.getBoundingClientRect(),x=g.width,w=g.height;null==d&&(m.style.display="none");var y={top:v+b,left:h+f/2-x/2},j={top:v+b+(w-1),left:h+f/2-a/2},O=!1,k=!1;j.left<u+25?(O=!0,j.left=u):a+u+j.left+25>p&&(k=!0,j.left=p-a-u,r="right"),v+b+s>c&&v-s>0?(y.top=v-(w+1),j.top=v-s-(w-1),e.className=e.className+" popover-bottom",t="bottom"):v+b+s>c&&(i.style.bottom=u+"%"),m.style.top=y.top+"px",m.style.left=y.left+"px",i.style.top=j.top+"px",i.style.left=j.left+"px",O&&(i.style.left="calc("+j.left+"px + var(--ion-safe-area-left, 0px))"),k&&(i.style.left="calc("+j.left+"px - var(--ion-safe-area-right, 0px))"),i.style.transformOrigin=t+" "+r;var D=Object(l.a)(),E=Object(l.a)(),P=Object(l.a)();return E.addElement(e.querySelector("ion-backdrop")).fromTo("opacity",.01,"var(--backdrop-opacity)").beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),P.addElement(e.querySelector(".popover-wrapper")).fromTo("opacity",.01,1),D.addElement(e).easing("ease").duration(100).addAnimation([E,P])}),u=5,v=function(e){var o=Object(l.a)(),t=Object(l.a)(),r=Object(l.a)();return t.addElement(e.querySelector("ion-backdrop")).fromTo("opacity","var(--backdrop-opacity)",0),r.addElement(e.querySelector(".popover-wrapper")).fromTo("opacity",.99,0),o.addElement(e).easing("ease").duration(500).addAnimation([t,r])},h=function(e,o){var t=e.ownerDocument,r="rtl"===t.dir,i="top",n=r?"right":"left",a=e.querySelector(".popover-content"),s=a.getBoundingClientRect(),p=s.width,c=s.height,d=t.defaultView.innerWidth,u=t.defaultView.innerHeight,v=o&&o.target&&o.target.getBoundingClientRect(),h=null!=v&&"bottom"in v?v.bottom:u/2-c/2,f=null!=v&&"left"in v?r?v.left-p+v.width:v.left:d/2-p/2,b=v&&v.height||0,m={top:h,left:f};m.left<12?(m.left=12,n="left"):p+12+m.left>d&&(m.left=d-p-12,n="right"),h+b+c>u&&h-c>0?(m.top=h-c-b,e.className=e.className+" popover-bottom",i="bottom"):h+b+c>u&&(a.style.bottom="12px");var g=Object(l.a)(),x=Object(l.a)(),w=Object(l.a)(),y=Object(l.a)(),j=Object(l.a)();return x.addElement(e.querySelector("ion-backdrop")).fromTo("opacity",.01,"var(--backdrop-opacity)").beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),w.addElement(e.querySelector(".popover-wrapper")).fromTo("opacity",.01,1),y.addElement(a).beforeStyles({top:m.top+"px",left:m.left+"px","transform-origin":i+" "+n}).fromTo("transform","scale(0.001)","scale(1)"),j.addElement(e.querySelector(".popover-viewport")).fromTo("opacity",.01,1),g.addElement(e).easing("cubic-bezier(0.36,0.66,0.04,1)").duration(300).addAnimation([x,w,y,j])},f=function(e){var o=Object(l.a)(),t=Object(l.a)(),r=Object(l.a)();return t.addElement(e.querySelector("ion-backdrop")).fromTo("opacity","var(--backdrop-opacity)",0),r.addElement(e.querySelector(".popover-wrapper")).fromTo("opacity",.99,0),o.addElement(e).easing("ease").duration(500).addAnimation([t,r])},b=function(){function e(e){var o=this;Object(i.o)(this,e),this.didPresent=Object(i.g)(this,"ionPopoverDidPresent",7),this.willPresent=Object(i.g)(this,"ionPopoverWillPresent",7),this.willDismiss=Object(i.g)(this,"ionPopoverWillDismiss",7),this.didDismiss=Object(i.g)(this,"ionPopoverDidDismiss",7),this.presented=!1,this.keyboardClose=!0,this.backdropDismiss=!0,this.showBackdrop=!0,this.translucent=!1,this.animated=!0,this.onDismiss=function(e){e.stopPropagation(),e.preventDefault(),o.dismiss()},this.onBackdropTap=function(){o.dismiss(void 0,s.a)},this.onLifecycle=function(e){var t=o.usersElement,r=m[e.type];if(t&&r){var i=new CustomEvent(r,{bubbles:!1,cancelable:!1,detail:e.detail});t.dispatchEvent(i)}}}return e.prototype.connectedCallback=function(){Object(s.f)(this.el)},e.prototype.present=function(){return Object(r.a)(this,void 0,void 0,(function(){var e,o,t;return Object(r.c)(this,(function(r){switch(r.label){case 0:if(this.presented)return[2];if(!(e=this.el.querySelector(".popover-content")))throw new Error("container is undefined");return o=Object.assign(Object.assign({},this.componentProps),{popover:this.el}),t=this,[4,Object(a.a)(this.delegate,e,this.component,["popover-viewport",this.el["s-sc"]],o)];case 1:return t.usersElement=r.sent(),[4,Object(c.d)(this.usersElement)];case 2:return r.sent(),[2,Object(s.e)(this,"popoverEnter",d,h,this.event)]}}))}))},e.prototype.dismiss=function(e,o){return Object(r.a)(this,void 0,void 0,(function(){var t;return Object(r.c)(this,(function(r){switch(r.label){case 0:return[4,Object(s.g)(this,e,o,"popoverLeave",v,f,this.event)];case 1:return(t=r.sent())?[4,Object(a.b)(this.delegate,this.usersElement)]:[3,3];case 2:r.sent(),r.label=3;case 3:return[2,t]}}))}))},e.prototype.onDidDismiss=function(){return Object(s.h)(this.el,"ionPopoverDidDismiss")},e.prototype.onWillDismiss=function(){return Object(s.h)(this.el,"ionPopoverWillDismiss")},e.prototype.render=function(){var e,o=Object(n.b)(this),t=this.onLifecycle,r=this.htmlAttributes;return Object(i.j)(i.c,Object.assign({"aria-modal":"true","no-router":!0,tabindex:"-1"},r,{style:{zIndex:""+(2e4+this.overlayIndex)},class:Object.assign(Object.assign({},Object(p.b)(this.cssClass)),(e={},e[o]=!0,e["popover-translucent"]=this.translucent,e)),onIonPopoverDidPresent:t,onIonPopoverWillPresent:t,onIonPopoverWillDismiss:t,onIonPopoverDidDismiss:t,onIonDismiss:this.onDismiss,onIonBackdropTap:this.onBackdropTap}),Object(i.j)("ion-backdrop",{tappable:this.backdropDismiss,visible:this.showBackdrop}),Object(i.j)("div",{tabindex:"0"}),Object(i.j)("div",{class:"popover-wrapper ion-overlay-wrapper"},Object(i.j)("div",{class:"popover-arrow"}),Object(i.j)("div",{class:"popover-content"})),Object(i.j)("div",{tabindex:"0"}))},Object.defineProperty(e.prototype,"el",{get:function(){return Object(i.k)(this)},enumerable:!1,configurable:!0}),e}(),m={ionPopoverDidPresent:"ionViewDidEnter",ionPopoverWillPresent:"ionViewWillEnter",ionPopoverWillDismiss:"ionViewWillLeave",ionPopoverDidDismiss:"ionViewDidLeave"};b.style={ios:'.sc-ion-popover-ios-h{--background:var(--ion-background-color, #fff);--min-width:0;--min-height:0;--max-width:auto;--height:auto;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;color:var(--ion-text-color, #000);z-index:1001}.overlay-hidden.sc-ion-popover-ios-h{display:none}.popover-wrapper.sc-ion-popover-ios{opacity:0;z-index:10}.popover-content.sc-ion-popover-ios{display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:auto;z-index:10}.popover-viewport.sc-ion-popover-ios{--ion-safe-area-top:0px;--ion-safe-area-right:0px;--ion-safe-area-bottom:0px;--ion-safe-area-left:0px}.sc-ion-popover-ios-h{--width:200px;--max-height:90%;--box-shadow:none;--backdrop-opacity:var(--ion-backdrop-opacity, 0.08)}.popover-content.sc-ion-popover-ios{border-radius:10px}.popover-arrow.sc-ion-popover-ios{display:block;position:absolute;width:20px;height:10px;overflow:hidden}.popover-arrow.sc-ion-popover-ios::after{left:3px;top:3px;border-radius:3px;position:absolute;width:14px;height:14px;-webkit-transform:rotate(45deg);transform:rotate(45deg);background:var(--background);content:"";z-index:10}[dir=rtl].sc-ion-popover-ios .popover-arrow.sc-ion-popover-ios::after,[dir=rtl].sc-ion-popover-ios-h .popover-arrow.sc-ion-popover-ios::after,[dir=rtl] .sc-ion-popover-ios-h .popover-arrow.sc-ion-popover-ios::after{left:unset;right:unset;right:3px}.popover-bottom.sc-ion-popover-ios-h .popover-arrow.sc-ion-popover-ios{top:auto;bottom:-10px}.popover-bottom.sc-ion-popover-ios-h .popover-arrow.sc-ion-popover-ios::after{top:-6px}@supports ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))){.popover-translucent.sc-ion-popover-ios-h .popover-content.sc-ion-popover-ios,.popover-translucent.sc-ion-popover-ios-h .popover-arrow.sc-ion-popover-ios::after{background:rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}}',md:".sc-ion-popover-md-h{--background:var(--ion-background-color, #fff);--min-width:0;--min-height:0;--max-width:auto;--height:auto;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;color:var(--ion-text-color, #000);z-index:1001}.overlay-hidden.sc-ion-popover-md-h{display:none}.popover-wrapper.sc-ion-popover-md{opacity:0;z-index:10}.popover-content.sc-ion-popover-md{display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:auto;z-index:10}.popover-viewport.sc-ion-popover-md{--ion-safe-area-top:0px;--ion-safe-area-right:0px;--ion-safe-area-bottom:0px;--ion-safe-area-left:0px}.sc-ion-popover-md-h{--width:250px;--max-height:90%;--box-shadow:0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);--backdrop-opacity:var(--ion-backdrop-opacity, 0.32)}.popover-content.sc-ion-popover-md{border-radius:4px;-webkit-transform-origin:left top;transform-origin:left top}[dir=rtl].sc-ion-popover-md .popover-content.sc-ion-popover-md,[dir=rtl].sc-ion-popover-md-h .popover-content.sc-ion-popover-md,[dir=rtl] .sc-ion-popover-md-h .popover-content.sc-ion-popover-md{-webkit-transform-origin:right top;transform-origin:right top}.popover-viewport.sc-ion-popover-md{-webkit-transition-delay:100ms;transition-delay:100ms}"}},181:function(e,o,t){"use strict";t.d(o,"a",(function(){return n})),t.d(o,"b",(function(){return a})),t.d(o,"c",(function(){return i})),t.d(o,"d",(function(){return p}));var r=t(12),i=function(e,o){return null!==o.closest(e)},n=function(e,o){var t;return"string"===typeof e&&e.length>0?Object.assign(((t={"ion-color":!0})["ion-color-"+e]=!0,t),o):o},a=function(e){var o={};return function(e){return void 0!==e?(Array.isArray(e)?e:e.split(" ")).filter((function(e){return null!=e})).map((function(e){return e.trim()})).filter((function(e){return""!==e})):[]}(e).forEach((function(e){return o[e]=!0})),o},s=/^[a-z][a-z0-9+\-.]*:/,p=function(e,o,t,i){return Object(r.a)(void 0,void 0,void 0,(function(){var n;return Object(r.c)(this,(function(r){return null!=e&&"#"!==e[0]&&!s.test(e)&&(n=document.querySelector("ion-router"))?(null!=o&&o.preventDefault(),[2,n.push(e,t,i)]):[2,!1]}))}))}},183:function(e,o,t){"use strict";t.d(o,"a",(function(){return n})),t.d(o,"b",(function(){return a}));var r=t(12),i=t(27),n=function(e,o,t,n,a){return Object(r.a)(void 0,void 0,void 0,(function(){var s;return Object(r.c)(this,(function(r){switch(r.label){case 0:if(e)return[2,e.attachViewToDom(o,t,a,n)];if("string"!==typeof t&&!(t instanceof HTMLElement))throw new Error("framework delegate is missing");return s="string"===typeof t?o.ownerDocument&&o.ownerDocument.createElement(t):t,n&&n.forEach((function(e){return s.classList.add(e)})),a&&Object.assign(s,a),o.appendChild(s),[4,new Promise((function(e){return Object(i.c)(s,e)}))];case 1:return r.sent(),[2,s]}}))}))},a=function(e,o){if(o){if(e){var t=o.parentElement;return e.removeViewFromDom(t,o)}o.remove()}return Promise.resolve()}}}]);
//# sourceMappingURL=9.d43003fb.chunk.js.map
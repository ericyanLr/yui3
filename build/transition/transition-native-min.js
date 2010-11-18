YUI.add("transition-native",function(b){var j="-webkit-transition",m="WebkitTransition",h="WebkitTransitionProperty",c="-webkit-transition-property",g="-webkit-transition-duration",a="-webkit-transition-timing-function",d="-webkit-transition-delay",k="webkitTransitionEnd",e="onwebkittransitionend",l="WebkitTransform",i={},f=function(){this.init.apply(this,arguments);};f.fx={};f.toggles={};f._hasEnd={};f._toCamel=function(o){o=o.replace(/-([a-z])/gi,function(q,p){return p.toUpperCase();});return o;};f._toHyphen=function(o){o=o.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g,function(s,r,q,p){var t="";if(r){t+="-"+r.toLowerCase();}t+=q;if(p){t+="-"+p.toLowerCase();}return t;});return o;};f._reKeywords=/^(?:node|duration|iterations|easing|delay|on|onstart|onend)$/i;f.useNative=false;if(j in b.config.doc.documentElement.style){f.useNative=true;f.supported=true;}b.Node.DOM_EVENTS[k]=1;f.NAME="transition";f.DEFAULT_EASING="ease";f.DEFAULT_DURATION=0.5;f.DEFAULT_DELAY=0;f._nodeAttrs={};f.prototype={constructor:f,init:function(p,o){var q=this;q._node=p;if(!q._running&&o){q._config=o;p._transition=q;q._duration=("duration" in o)?o.duration:q.constructor.DEFAULT_DURATION;q._delay=("delay" in o)?o.delay:q.constructor.DEFAULT_DELAY;q._easing=o.easing||q.constructor.DEFAULT_EASING;q._count=0;q._running=false;}return q;},addProperty:function(o,q){var s=this,r=this._node,u=b.stamp(r),t=b.one(r),w=f._nodeAttrs[u],v,p;if(!w){w=f._nodeAttrs[u]={};}v=w[o];if(q&&q.value!==undefined){p=q.value;}else{if(q!==undefined){p=q;q=i;}}if(typeof p==="function"){p=p.call(t,t);}if(v&&v.transition){if(v.transition!==s){v.transition._count--;}}s._count++;w[o]={value:p,duration:((typeof q.duration!=="undefined")?q.duration:s._duration)||0.0001,delay:(typeof q.delay!=="undefined")?q.delay:s._delay,easing:q.easing||s._easing,transition:s};},removeProperty:function(q){var p=this,o=f._nodeAttrs[b.stamp(p._node)];if(o&&o[q]){delete o[q];p._count--;}},initAttrs:function(p){var o;if(p.transform&&!p[l]){p[l]=p.transform;delete p.transform;}for(o in p){if(p.hasOwnProperty(o)&&!f._reKeywords.test(o)){this.addProperty(o,p[o]);}}},run:function(s){var r=this,p=r._node,o=r._config,q={type:"transition:start",config:o};if(!r._running){r._running=true;if(o.on&&o.on.start){o.on.start.call(b.one(p),q);}r.initAttrs(r._config);r._callback=s;r._start();}return r;},_start:function(){this._runNative();},_prepDur:function(o){o=parseFloat(o);return o+"s";},_runNative:function(q){var w=this,r=w._node,y=b.stamp(r),p=r.style,u=getComputedStyle(r),C=f._nodeAttrs[y],s="",D=u[c],B=c+": ",v=g+": ",A=a+": ",x=d+": ",t,z,o;if(D!=="all"){B+=D+",";v+=u[g]+",";A+=u[a]+",";x+=u[d]+",";}for(o in C){t=f._toHyphen(o);z=C[o];if(C.hasOwnProperty(o)&&z.transition===w){if(o in r.style){v+=w._prepDur(z.duration)+",";x+=w._prepDur(z.delay)+",";A+=(z.easing)+",";B+=t+",";s+=t+": "+z.value+"; ";}else{this.removeProperty(o);}}}B=B.replace(/,$/,";");v=v.replace(/,$/,";");A=A.replace(/,$/,";");x=x.replace(/,$/,";");if(!f._hasEnd[y]){r.addEventListener(k,w._onNativeEnd,false);f._hasEnd[y]=true;}p.cssText+=B+v+A+x+s;},_end:function(o){var s=this,q=s._node,u=s._callback,p=s._config,r={type:"transition:end",config:p,elapsedTime:o},t=b.one(q);s._running=false;s._callback=null;if(q){if(p.on&&p.on.end){setTimeout(function(){p.on.end.call(t,r);if(u){u.call(t,r);}},1);}else{if(u){setTimeout(function(){u.call(t,r);},1);}}}},_endNative:function(o){var p=this._node,q=p.ownerDocument.defaultView.getComputedStyle(p,"")[c];if(typeof q==="string"){q=q.replace(new RegExp("(?:^|,\\s)"+o+",?"),",");q=q.replace(/^,|,$/,"");p.style[m]=q;}},_onNativeEnd:function(v){var r=this,u=b.stamp(r),o=v,p=f._toCamel(o.propertyName),y=o.elapsedTime,x=f._nodeAttrs[u],w=x[p],s=(w)?w.transition:null,t,q;if(s){s.removeProperty(p);s._endNative(p);q=s._config[p];t={type:"propertyEnd",propertyName:p,elapsedTime:y,config:q};if(q&&q.on&&q.on.end){q.on.end.call(b.one(r),t);}if(s._count<=0){s._end(y);}}},destroy:function(){var o=this;node.removeEventListener(k,o._onNativeEnd,false);o._node=null;}};b.Transition=f;b.TransitionNative=f;b.Node.prototype.transition=function(q,p,u){var o=f._nodeAttrs[b.stamp(this._node)],s=(o)?o.transition||null:null,r,t;if(typeof q==="string"){if(typeof p==="function"){u=p;p=null;}r=f.fx[q];if(p&&typeof p!=="boolean"){p=b.clone(p);for(t in r){if(r.hasOwnProperty(t)){if(!(t in p)){p[t]=r[t];}}}}else{p=r;}}else{u=p;p=q;}if(s&&!s._running){s.init(this,p);}else{s=new f(this._node,p);}s.run(u);return this;};b.Node.prototype.show=function(p,o,q){this._show();if(p&&b.Transition){if(typeof p!=="string"&&!p.push){if(typeof o==="function"){q=o;o=p;}p=this.SHOW_TRANSITION;}this.transition(p,o,q);}return this;};var n=function(p,o,q){return function(){if(o){o.call(p);}if(q){q.apply(p._node,arguments);}};};b.Node.prototype.hide=function(p,o,q){if(p&&b.Transition){if(typeof o==="function"){q=o;o=null;}q=n(this,this._hide,q);if(typeof p!=="string"&&!p.push){if(typeof o==="function"){q=o;o=p;}p=this.HIDE_TRANSITION;}this.transition(p,o,q);}else{this._hide();}return this;};b.NodeList.prototype.transition=function(p,s){var o=this._nodes,q=0,r;while((r=o[q++])){b.one(r).transition(p,s);}return this;};b.Node.prototype.toggleView=function(p,o){var q;this._toggles=this._toggles||[];if(typeof p=="boolean"){o=p;}if(typeof o==="undefined"&&p in this._toggles){o=!this._toggles[p];}o=(o)?1:0;if(o){this._show();}else{q=n(anim,this._hide);}this._toggles[p]=o;this.transition(b.Transition.toggles[p][o],q);};b.NodeList.prototype.toggleView=function(p,s){var o=this._nodes,q=0,r;while((r=o[q++])){b.one(r).toggleView(p,s);}return this;};b.mix(f.fx,{fadeOut:{opacity:0,duration:0.5,easing:"ease-out"},fadeIn:{opacity:1,duration:0.5,easing:"ease-in"},sizeOut:{height:0,width:0,duration:0.75,easing:"ease-out"},sizeIn:{height:function(o){return o.get("scrollHeight")+"px";},width:function(o){return o.get("scrollWidth")+"px";},duration:0.5,easing:"ease-in",on:{start:function(){var o=this.getStyle("overflow");if(o!=="hidden"){this.setStyle("overflow","hidden");
this._transitionOverflow=o;}},end:function(){if(this._transitionOverflow){this.setStyle("overflow",this._transitionOverflow);}}}}});b.mix(f.toggles,{size:["sizeIn","sizeOut"],fade:["fadeOut","fadeIn"]});},"@VERSION@",{requires:["node-base"]});
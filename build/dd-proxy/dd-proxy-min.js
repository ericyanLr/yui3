YUI.add("dd-proxy",function(a,i){var g=a.DD.DDM,b="node",f="dragNode",h="host",c=true,d,e=function(j){e.superclass.constructor.apply(this,arguments);};e.NAME="DDProxy";e.NS="proxy";e.ATTRS={host:{},moveOnEnd:{value:c},hideOnEnd:{value:c},resizeFrame:{value:c},positionProxy:{value:c},borderStyle:{value:"1px solid #808080"},cloneNode:{value:false}};d={_hands:null,_init:function(){if(!g._proxy){g._createFrame();a.on("domready",a.bind(this._init,this));return;}if(!this._hands){this._hands=[];}var l,k,m=this.get(h),j=m.get(f);if(j.compareTo(m.get(b))){if(g._proxy){m.set(f,g._proxy);}}a.each(this._hands,function(n){n.detach();});l=g.on("ddm:start",a.bind(function(){if(g.activeDrag===m){g._setFrame(m);}},this));k=g.on("ddm:end",a.bind(function(){if(m.get("dragging")){if(this.get("moveOnEnd")){m.get(b).setXY(m.lastXY);}if(this.get("hideOnEnd")){m.get(f).setStyle("display","none");}if(this.get("cloneNode")){m.get(f).remove();m.set(f,g._proxy);}}},this));this._hands=[l,k];},initializer:function(){this._init();},destructor:function(){var j=this.get(h);a.each(this._hands,function(k){k.detach();});j.set(f,j.get(b));},clone:function(){var j=this.get(h),l=j.get(b),k=l.cloneNode(true);delete k._yuid;k.setAttribute("id",a.guid());k.setStyle("position","absolute");l.get("parentNode").appendChild(k);j.set(f,k);return k;}};a.namespace("Plugin");a.extend(e,a.Base,d);a.Plugin.DDProxy=e;a.mix(g,{_createFrame:function(){if(!g._proxy){g._proxy=c;var k=a.Node.create("<div></div>"),j=a.one("body");k.setStyles({position:"absolute",display:"none",zIndex:"999",top:"-999px",left:"-999px"});j.prepend(k);k.set("id",a.guid());k.addClass(g.CSS_PREFIX+"-proxy");g._proxy=k;}},_setFrame:function(k){var o=k.get(b),m=k.get(f),j,l="auto";j=g.activeDrag.get("activeHandle");if(j){l=j.getStyle("cursor");}if(l=="auto"){l=g.get("dragCursor");}m.setStyles({visibility:"hidden",display:"block",cursor:l,border:k.proxy.get("borderStyle")});if(k.proxy.get("cloneNode")){m=k.proxy.clone();}if(k.proxy.get("resizeFrame")){m.setStyles({height:o.get("offsetHeight")+"px",width:o.get("offsetWidth")+"px"});}if(k.proxy.get("positionProxy")){m.setXY(k.nodeXY);}m.setStyle("visibility","visible");}});},"@VERSION@",{"requires":["dd-drag"]});
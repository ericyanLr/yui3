YUI.add("selector-css2",function(b,i){var g="parentNode",f="tagName",d="attributes",e="combinator",c="pseudos",a=b.Selector,h={_reRegExpTokens:/([\^\$\?\[\]\*\+\-\.\(\)\|\\])/,SORT_RESULTS:true,_isXML:(function(){var j=(b.config.doc.createElement("div").tagName!=="DIV");return j;}()),shorthand:{"\\#(-?[_a-z0-9]+[-\\w\\uE000]*)":"[id=$1]","\\.(-?[_a-z]+[-\\w\\uE000]*)":"[className~=$1]"},operators:{"":function(k,j){return b.DOM.getAttribute(k,j)!=="";},"~=":"(?:^|\\s+){val}(?:\\s+|$)","|=":"^{val}-?"},pseudos:{"first-child":function(j){return b.DOM._children(j[g])[0]===j;}},_bruteQuery:function(o,s,u){var p=[],j=[],r=a._tokenize(o),n=r[r.length-1],t=b.DOM._getDoc(s),l,k,q,m;if(n){k=n.id;q=n.className;m=n.tagName||"*";if(s.getElementsByTagName){if(k&&(s.all||(s.nodeType===9||b.DOM.inDoc(s)))){j=b.DOM.allById(k,s);}else{if(q){j=s.getElementsByClassName(q);}else{j=s.getElementsByTagName(m);}}}else{l=s.firstChild;while(l){if(l.tagName&&(m==="*"||l.tagName===m)){j.push(l);}l=l.nextSibling||l.firstChild;}}if(j.length){p=a._filterNodes(j,r,u);}}return p;},_filterNodes:function(u,q,s){var z=0,y,A=q.length,t=A-1,p=[],w=u[0],D=w,B=b.Selector.getters,o,x,m,r,k,v,l,C;for(z=0;(D=w=u[z++]);){t=A-1;r=null;testLoop:while(D&&D.tagName){m=q[t];l=m.tests;y=l.length;if(y&&!k){while((C=l[--y])){o=C[1];if(B[C[0]]){v=B[C[0]](D,C[0]);}else{v=D[C[0]];if(C[0]==="tagName"&&!a._isXML){v=v.toUpperCase();}if(typeof v!="string"&&v!==undefined&&v.toString){v=v.toString();}else{if(v===undefined&&D.getAttribute){v=D.getAttribute(C[0],2);}}}if((o==="="&&v!==C[2])||(typeof o!=="string"&&o.test&&!o.test(v))||(!o.test&&typeof o==="function"&&!o(D,C[0],C[2]))){if((D=D[r])){while(D&&(!D.tagName||(m.tagName&&m.tagName!==D.tagName))){D=D[r];}}continue testLoop;}}}t--;if(!k&&(x=m.combinator)){r=x.axis;D=D[r];while(D&&!D.tagName){D=D[r];}if(x.direct){r=null;}}else{p.push(w);if(s){return p;}break;}}}w=D=null;return p;},combinators:{" ":{axis:"parentNode"},">":{axis:"parentNode",direct:true},"+":{axis:"previousSibling",direct:true}},_parsers:[{name:d,re:/^\uE003(-?[a-z]+[\w\-]*)+([~\|\^\$\*!=]=?)?['"]?([^\uE004'"]*)['"]?\uE004/i,fn:function(m,n){var l=m[2]||"",j=a.operators,k=(m[3])?m[3].replace(/\\/g,""):"",o;if((m[1]==="id"&&l==="=")||(m[1]==="className"&&b.config.doc.documentElement.getElementsByClassName&&(l==="~="||l==="="))){n.prefilter=m[1];m[3]=k;n[m[1]]=(m[1]==="id")?m[3]:k;}if(l in j){o=j[l];if(typeof o==="string"){m[3]=k.replace(a._reRegExpTokens,"\\$1");o=new RegExp(o.replace("{val}",m[3]));}m[2]=o;}if(!n.last||n.prefilter!==m[1]){return m.slice(1);}}},{name:f,re:/^((?:-?[_a-z]+[\w-]*)|\*)/i,fn:function(k,l){var j=k[1];if(!a._isXML){j=j.toUpperCase();}l.tagName=j;if(j!=="*"&&(!l.last||l.prefilter)){return[f,"=",j];}if(!l.prefilter){l.prefilter="tagName";}}},{name:e,re:/^\s*([>+~]|\s)\s*/,fn:function(j,k){}},{name:c,re:/^:([\-\w]+)(?:\uE005['"]?([^\uE005]*)['"]?\uE006)*/i,fn:function(j,k){var l=a[c][j[1]];if(l){if(j[2]){j[2]=j[2].replace(/\\/g,"");}return[j[2],l];}else{return false;}}}],_getToken:function(j){return{tagName:null,id:null,className:null,attributes:{},combinator:null,tests:[]};},_tokenize:function(l){l=l||"";l=a._parseSelector(b.Lang.trim(l));var k=a._getToken(),q=l,p=[],r=false,n,o,m,j;outer:do{r=false;for(m=0;(j=a._parsers[m++]);){if((n=j.re.exec(l))){if(j.name!==e){k.selector=l;}l=l.replace(n[0],"");if(!l.length){k.last=true;}if(a._attrFilters[n[1]]){n[1]=a._attrFilters[n[1]];}o=j.fn(n,k);if(o===false){r=false;break outer;}else{if(o){k.tests.push(o);}}if(!l.length||j.name===e){p.push(k);k=a._getToken(k);if(j.name===e){k.combinator=b.Selector.combinators[n[1]];}}r=true;}}}while(r&&l.length);if(!r||l.length){p=[];}return p;},_replaceMarkers:function(j){j=j.replace(/\[/g,"\uE003");j=j.replace(/\]/g,"\uE004");j=j.replace(/\(/g,"\uE005");j=j.replace(/\)/g,"\uE006");return j;},_replaceShorthand:function(j){var k=b.Selector.shorthand,l;for(l in k){if(k.hasOwnProperty(l)){j=j.replace(new RegExp(l,"gi"),k[l]);}}return j;},_parseSelector:function(j){var k=b.Selector._replaceSelector(j),j=k.selector;j=b.Selector._replaceShorthand(j);j=b.Selector._restore("attr",j,k.attrs);j=b.Selector._restore("pseudo",j,k.pseudos);j=b.Selector._replaceMarkers(j);j=b.Selector._restore("esc",j,k.esc);return j;},_attrFilters:{"class":"className","for":"htmlFor"},getters:{href:function(k,j){return b.DOM.getAttribute(k,j);},id:function(k,j){return b.DOM.getId(k);}}};b.mix(b.Selector,h,true);b.Selector.getters.src=b.Selector.getters.rel=b.Selector.getters.href;if(b.Selector.useNative&&b.config.doc.querySelector){b.Selector.shorthand["\\.(-?[_a-z]+[-\\w]*)"]="[class~=$1]";}},"@VERSION@",{"requires":["selector-native"]});
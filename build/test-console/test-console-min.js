YUI.add("test-console",function(c,a){function b(){b.superclass.constructor.apply(this,arguments);}c.namespace("Test").Console=c.extend(b,c.Console,{initializer:function(d){this.on("entry",this._onEntry);this.plug(c.Plugin.ConsoleFilters,{category:c.merge({info:true,pass:false,fail:true,status:false},(d&&d.filters)||{}),defaultVisibility:false,source:{TestRunner:true}});c.Test.Runner.on("complete",c.bind(this._parseCoverage,this));},_parseCoverage:function(){var e=c.Test.Runner.getCoverage();if(!e){return;}var d={lines:{hit:0,miss:0,total:0,percent:0},functions:{hit:0,miss:0,total:0,percent:0}};c.Object.each(e,function(g){d.lines.total+=g.coveredLines;d.lines.hit+=g.calledLines;d.lines.miss+=(g.coveredLines-g.calledLines);d.lines.percent=Math.floor((d.lines.hit/d.lines.total)*100);d.functions.total+=g.coveredFunctions;d.functions.hit+=g.calledFunctions;d.functions.miss+=(g.coveredFunctions-g.calledFunctions);d.functions.percent=Math.floor((d.functions.hit/d.functions.total)*100);});var f="Lines: Hit:"+d.lines.hit+" Missed:"+d.lines.miss+" Total:"+d.lines.total+" Percent:"+d.lines.percent+"%\n";f+="Functions: Hit:"+d.functions.hit+" Missed:"+d.functions.miss+" Total:"+d.functions.total+" Percent:"+d.functions.percent+"%";this.log("Coverage: "+f,"info","TestRunner");},_onEntry:function(d){var f=d.message;if(f.category==="info"&&/\s(?:case|suite)\s|yuitests\d+|began/.test(f.message)){f.category="status";}else{if(f.category==="fail"){this.printBuffer();}}}},{NAME:"testConsole",ATTRS:{entryTemplate:{value:'<div class="{entry_class} {cat_class} {src_class}">'+'<div class="{entry_content_class}">{message}</div>'+"</div>"},height:{value:"350px"},newestOnTop:{value:false},style:{value:"block"},width:{value:c.UA.ie&&c.UA.ie<9?"100%":"inherit"}}});},"@VERSION@",{"requires":["console-filters","test"],"skinnable":true});
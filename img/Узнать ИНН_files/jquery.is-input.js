
(function($){var testTimeout=false;var hintTimeout=false;$.fn.is_input=function(options){var args=arguments;return this.each(function(){var obj=this;var $obj=$(this);switch(options){case'test':return test(obj);case'setRegExp':return setRegExp(obj,args[1]);case'setHint':return setHint(obj,args[1]);}
var defaults={is_input:true,old_value:'',hint:false,regexp:false,filterRegexp:false,onchange:false,onerror:false}
if(this.params&&this.params.is_input)return true;if(obj.tagName!='TEXTAREA'&&(obj.tagName!='INPUT'||obj.type.toUpperCase()!='TEXT'))return true;this.params=$.extend(defaults,options,this.params);$obj.keydown(function(e){if(e.keyCode==17)return true;if(obj.params.time==new Date().getTime())return true;obj.params.time=new Date().getTime();if(testTimeout)return false;if(!obj.params.regexp&&!obj.params.filterRegexp)return true;obj.params.old_value=$obj.val();testTimeout=window.setTimeout(function(){testTimeout=false;test(obj);},10);return true;});$obj.bind("input paste",function(e){if(testTimeout)return true;if(!obj.params.regexp&&!obj.params.filterRegexp)return true;obj.params.old_value=$obj.val();testTimeout=window.setTimeout(function(){testTimeout=false;test(obj);},10);return true;});$obj.bind("blur",function(e){hideHint(obj);});test(obj);});}
function test(obj){var $obj=$(obj);obj=$obj[0];if(!obj.params)return true;var result=true;if(obj.params.filterRegexp){var oldVal=$obj.val();var newVal=oldVal.replace(obj.params.filterRegexp,'');if(newVal!=oldVal){result=false;$obj.val(newVal);}}
if(obj.params.regexp&&!obj.params.regexp.test($obj.val())){result=false;var val=obj.params.old_value;for(var i=val.length-1;i>=0;i--){if(obj.params.regexp.test(val))break;val=val.substr(0,i)+val.substr(i+1);}
$obj.val(val);}
if(result&&obj.params.onchange&&obj.params.old_value!=$obj.val())obj.params.onchange(obj);if(!result&&obj.params.onerror)obj.params.onerror(obj);if(!result&&obj.params.hint)showHint(obj,obj.params.hint);if(result&&obj.params.hint)hideHint(obj);obj.params.old_value='';return result;}
function showHint(obj,hint){var $obj=$(obj);obj=$obj[0];var $element=$('#is_input_hint');if(!$element.length){var html='<div id="is_input_hint"></div>';$('body').append(html);$element=$('#is_input_hint');}
hideHint(obj);var top=$obj.offset().top+$obj.outerHeight()+1;var left=$obj.offset().left;$element.html(htmlEncode(hint,true));if(top+$element.outerHeight()-$(window).scrollTop()>$(window).height()){top-=$obj.outerHeight()+$element.outerHeight()+2;}
$element.css('top',top).css('left',left).show();hintTimeout=window.setTimeout(function(){hintTimeout=false;$('#is_input_hint').hide();},5000);}
function hideHint(obj){if(hintTimeout){window.clearTimeout(hintTimeout);hintTimeout=false;$('#is_input_hint').hide();}}
function setRegExp(obj,regexp){var $obj=$(obj);obj=$obj[0];if(!obj.params)return;obj.params.regexp=regexp;test(obj);}
function setHint(obj,hint){var $obj=$(obj);obj=$obj[0];if(!obj.params)return;obj.params.hint=hint;}
function htmlEncode(s,lineBreaks){var result=s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;");if(lineBreaks)result=result.replace(/\n/g,'<br>');return result;}
function htmlDecode(s){return s.replace(/&quot;/g,"\"").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&");}})(jQuery);
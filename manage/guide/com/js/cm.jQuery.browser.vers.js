
jQuery.browser = {}; 
jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase()); 
jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase()); 
jQuery.browser.opera = /opera/.test(navigator.userAgent.toLowerCase()); 
jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase()); 
jQuery.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase()); 
jQuery.browser.safari = /safari/.test(navigator.userAgent.toLowerCase());

/**********************************************************************************************************
 *  initialize-document 
 **********************************************************************************************************/
$(document).ready(function(e){
    initBody();
});


/**********************************************************************************************************
 *  common-params
 **********************************************************************************************************/
/**
 * 익스플로어 버전 정보 취득 
 */
function get_msie_version(){
    var version='';
    var trident=navigator.userAgent.match(/Trident\/(\d.\d)/i);
    if(trident!=null){
        switch(trident[1]){
            case '3.0': version='7'; break;
            case '4.0': version='8'; break;
            case '5.0': version='9'; break;
            case '6.0': version='10'; break;
			case '6.0': version='11'; break;
        }
    }else{
        version=String(parseInt($.browser.version, 10));
    }
    return version;
}


/**********************************************************************************************************
 *  initialize-body-class 
 **********************************************************************************************************/
/**
 *  browser에 따른 body-tag-class 부여
 */
function initBody(){
    var name='';
    
    if($.browser.msie){
        name='msie'+get_msie_version();
    }else if($.browser.chrome){
        name='chrome';
    }else if($.browser.safari){
        name='safari';
    }else if($.browser.opera){
        name='opera';
    }else if($.browser.mozilla){
        name='firefox';
    }
    //$(document.body).addClass(name);
    $('body').addClass(name);
}

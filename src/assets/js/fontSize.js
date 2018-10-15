// /**
//  * Created by Administrator on 2017/5/22.
//  */
// /*$(function () {
//     var deviceWidth = document.documentElement.clientWidth;
//     console.log("deviceWidth=="+deviceWidth)
//     if(deviceWidth > 750) deviceWidth = 750;
//     document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
// })*/
//

!(function(win, doc) {
    function setFontSize() {
        // 获取window 宽度
        // zepto实现 $(window).width()就是这么干的
        var winWidth = window.innerWidth;
        // console.log("winWidth=="+winWidth)
        // doc.documentElement.style.fontSize = (winWidth / 750) * 100 + 'px' ;

        // 2016-01-13 订正
        // 750宽度以上进行限制 需要css进行配合
        var size = (winWidth / 750) * 100;
        doc.documentElement.style.fontSize = (size < 100 ? size : 100) + 'px';
    }

    var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize';

    var timer = null;

    win.addEventListener(evt, function() {
        clearTimeout(timer);

        timer = setTimeout(setFontSize, 50);
    }, false);

    win.addEventListener("pageshow", function(e) {
        if (e.persisted) {
            clearTimeout(timer);

            timer = setTimeout(setFontSize, 100);
        }
    }, false);

    // 初始化
  setFontSize();


}(window, document));

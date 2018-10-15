
  // 禁止选中
  document.onselectstart = function (event) {
    if (window.event) {
      event = window.event;
    }try {
      var the = event.srcElement;
      if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")){
        return false; } return true;
    } catch (e) {
      return false;
    }
  }

  $(function () {
    setTimeout(function () {
      $(".viewData").on('click', function () {
        var $$ = $('.detailPage');
        $$.removeClass('hide animate-down').addClass('animate-up');
      })

      $('.backMap').on('click', function () {
        $('.detailPage').removeClass('animate-up').addClass('animate-down');
      })
    },300)

  })

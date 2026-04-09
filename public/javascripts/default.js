
var li_onmouseover = function (event) {
  $(this).addClass('hover');
}

var li_mouseout = function (event) {
  $(this).removeClass('hover');
}

var document_onload = function (event) {
  $('#notes li').on(
    'mouseover', li_onmouseover
  ).on(
    'mouseout', li_mouseout
  );
}

$(document).ready(document_onload);
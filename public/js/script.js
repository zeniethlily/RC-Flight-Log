$(function(){
    setTimeout(() => {
        $(".alert").fadeOut("slow");
      }, 3000);
});

$(document).ready(function() {

  const $valueSpan = $('.valueSpan');
  const $value = $('#duration');
  $valueSpan.html($value.val());
  $value.on('input change', () => {

    $valueSpan.html($value.val());
  });
});
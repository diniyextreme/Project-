//Right Section active or not
$('.item-img').click(function() {
    $('.content_box').removeClass('hidden');
    if($(this).hasClass('v1')){
      $('.test').addClass('hidden');
      $('.video1').parent().removeClass('hidden');


    }
    if($(this).hasClass('v2')){
      $('.test').addClass('hidden');
      $('.video2').parent().removeClass('hidden');
    }
    if($(this).hasClass('v3')){
      $('.test').addClass('hidden');
      $('.video3').parent().removeClass('hidden');
    }
    if($(this).hasClass('v4')){
      $('.test').addClass('hidden');
      $('.video4').parent().removeClass('hidden');
    }
    if($(this).hasClass('v5')){
      $('.test').addClass('hidden');
      $('.video5').parent().removeClass('hidden');
    }
    if($(this).hasClass('v6')){
      $('.test').addClass('hidden');
      $('.video6').parent().removeClass('hidden');
    }
});

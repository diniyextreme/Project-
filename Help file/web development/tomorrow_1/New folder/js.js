$('li > a').click(function() {
    $('a').removeClass('active');
    $(this).addClass('active');
});

$(window).on('scroll', function(event) {
    var scrollValue = $(window).scrollTop();
    if (scrollValue > 180) {
         $('.pull-right').addClass('sticky');
         $('.size').addClass('sticky');
    }
    else{
      $('.pull-right').removeClass('sticky');
      $('.size').removeClass('sticky');
    }
});
$('.clear').click(function() {
    $('.input').val("");
    $(this).addClass('hide');
});

function formsubmit() {
    $('.clearInput > span').removeClass('hide');
}

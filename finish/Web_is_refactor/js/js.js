//Right Section active or not
$('.nav-js > li > a').click(function() {
    $('a').removeClass('active');
    $(this).addClass('active');
});
//Right Section active or not
$('.menu').click(function() {
    $('.pull-right1').removeClass('hide');
});
//Make Right section stay on top when scolling
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
//Index
$(window).on('scroll', function(event) {
    var scrollValue = $(window).scrollTop();
      $('.image').removeClass('all_view');
      $('.image_desc_container').removeClass('image_desc_container1');
});
//onclick index
$('.image_pc').click(function() {
  if(  $('.item-title').hasClass('hide')){
    $('.item-title').removeClass('hide');
  }
  else{
      $('.item-title').addClass('hide');
  }

});
//Right Section active or not
$('.microsoft-gold ').click(function() {
  if ($('.microsoft-gold').hasClass('hide')){
      $('.microsoft-gold').removeClass('hide');
      $('.microsoft-gold').addClass('col-lg-3');
      $('.microsoft-gold').removeClass('offset-lg-1');
      $('.microsoft-gold').next('.desc').addClass('hide');
  }
  else{
    $('.microsoft-gold').addClass('hide');
    $(this).removeClass('hide');
    $('.microsoft-gold').addClass('offset-lg-1');
    $('.microsoft-gold').next('.desc').removeClass('hide');
  }
});

$("#contContent > div").click(function(){
    $("#contContent").animate({left: "-=50px"},1000);
});

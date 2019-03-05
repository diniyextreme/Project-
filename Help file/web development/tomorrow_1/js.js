//Right Section active or not
$('li > a').click(function() {
    $('a').removeClass('active');
    $(this).addClass('active');
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
//Clear the value inside text box in left section
$('.clear').click(function() {
    $('.input').val("");
    $(this).addClass('hide');
});
//clear the span in left section when click clear
function formsubmit() {
    $('.clearInput > span').removeClass('hide');
}
//Show input box at the top and hide the navigation
$('#top_btn').click(function() {
$('#navbarSupportedContent').removeClass('navbar-collapse').addClass('hide');
$('.top_form').addClass('top_form_hidden');
$('#top_form1').removeClass('hide').addClass('width_expand');
$('#cancel_btn').removeClass('hide');
});
//hide input box at the top and show navigation
$('#cancel_btn').click(function() {
$('#navbarSupportedContent').addClass('navbar-collapse').removeClass('hide');
$('.top_form').removeClass('top_form_hidden');
$('#top_form1').addClass('hide').removeClass('width90');
$('#cancel_btn').addClass('hide');
});

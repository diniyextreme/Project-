/**position=1;
var test=0;
$(window).on('mousewheel', function(event){
var e=event.deltaY;
if(e>0){

    if(position==1){
      position=3;
      $('.page').removeClass('animation_down');
     $('.page').removeClass('animation_up');
      $('.img_1').parent().addClass('animation_down');
      $('.page').removeClass('active');
      $('.img_3').parent().addClass('active');
      test++;
      console.log(e+" "+test);

    }
    else if(position==3){
      position=2;
      $('.page').removeClass('animation_down');
     $('.page').removeClass('animation_up');
      $('.img_3').parent().addClass('animation_down');
      $('.page').removeClass('active');
      $('.img_2').parent().addClass('active');
      test++;
      console.log(e+" "+test);
    }
    else if(position==2){
      position=1;
      $('.page').removeClass('animation_down');
      $('.page').removeClass('animation_up');
      $('.img_2').parent().addClass('animation_down');
      $('.page').removeClass('active');
      $('.img_1').parent().addClass('active');
      test++;
      console.log(e+" "+test);
    }
}
else{
  if(position==1){
    position=2;
    $('.page').removeClass('animation_down');
    $('.page').removeClass('animation_up');
   $('.img_1').parent().addClass('animation_up');
    $('.page').removeClass('active');
    $('.img_2').parent().addClass('active');
    test++;
    console.log(e+" "+test);
  }
  else if(position==3){
    position=1;
   $('.page').removeClass('animation_down');
    $('.page').removeClass('animation_up');
    $('.img_3').parent().addClass('animation_up');
    $('.page').removeClass('active');
    $('.img_1').parent().addClass('active');
    test++;
    console.log(e+" "+test);
  }
  else if(position==2){
    position=3;
    $('.page').removeClass('animation_down');
    $('.page').removeClass('animation_up');
    $('.img_2').parent().addClass('animation_up');
    $('.page').removeClass('active');
    $('.img_3').parent().addClass('active');
    test++;
    console.log(e+" "+test);
  }
}
});
**/
position=1;
var test=0;
function myFunction(event) {
  var y = event.deltaY;

  if (y > 0) {
    if(position==1){
      position=3;
      $('.page').removeClass('animation_down');
     $('.page').removeClass('animation_up');
      $('.img_1').parent().addClass('animation_down');
      $('.page').removeClass('active');
      $('.img_3').parent().addClass('active');
      test++;
      console.log(y+" "+test);

    }
    else if(position==3){
      position=2;
      $('.page').removeClass('animation_down');
     $('.page').removeClass('animation_up');
      $('.img_3').parent().addClass('animation_down');
      $('.page').removeClass('active');
      $('.img_2').parent().addClass('active');
      test++;
      console.log(y+" "+test);
    }
    else if(position==2){
      position=1;
      $('.page').removeClass('animation_down');
      $('.page').removeClass('animation_up');
      $('.img_2').parent().addClass('animation_down');
      $('.page').removeClass('active');
      $('.img_1').parent().addClass('active');
      test++;
      console.log(y+" "+test);
    }
  } else {

  }

}

/*Right Section active or not
$('.content').click(function() {
 var test = $(this);
 $(test).addClass('animation_down');
 setTimeout(function(){$(test).addClass('hidden');}, 5000);
});*/

document.addEventListener("readystatechange",function(a,b,c){
    var trigger = document.querySelector('.hamburger'),
        overlay=document.querySelector(".overlay"),
        isClosed=false;

        trigger.addEventListener('click',function(){
           
            hamburger_cross();
        })
        

        
        function hamburger_cross() {

        if (isClosed == true) {          
              overlay.style.display='show'
              if(trigger.classList.contains('is-open'))
                trigger.classList.remove('is-open');
            trigger.classList.add('is-closed');

            isClosed = false;
        } else {   
            overlay.style.display='none'
              if(trigger.classList.contains('is-closed'))
                trigger.classList.remove('is-closed');
              trigger.classList.add('is-open');
            isClosed = true;
        }
    }
    document.querySelector('[data-toggle="offcanvas"]').addEventListener("click",function(){

     var x=document.getElementById('wrapper');
     if(x.classList.contains('toggled'))
        x.classList.remove('toggled');
    else
        x.classList.add('toggled');
  });  

});
 
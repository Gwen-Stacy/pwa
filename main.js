// Service Worker
if('serviceWorker' in navigator){
    console.log('puedes usar los service worker en tu navegador');

    navigator.serviceWorker.register('./sw.js')
                            .then(res=> 
                                console.log('serviceworker cargado correctamente.', res))
                             .catch(err=> 
                                console.log('service worker no se ah podido registrar', err));   
}else {
    console.log('no puedes usarlo');
}

$(document).ready(function(){

    $("#menu a").click(function(e){
        e.preventDefault();
        console.log($("#services").offset().top); 
        console.log($("#footer").offset().top); 

        $("html, body").animate({
            scrollTop: $( $(this, 'href')).offset().top
        });
        return false;
    });
});

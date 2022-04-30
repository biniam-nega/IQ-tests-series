$(document).ready(function(){

    setTimeout(function() {
        $('#footer').slideDown();
    }, 1000);

    setTimeout(function() {
        window.location = window.location.href.slice(0, 52).concat('index.html');
    }, 2000);
});

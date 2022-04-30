$(document).ready(function () {
    
    // Save some data in the localStorage
    localStorage.lives = localStorage.lives || 5;
    localStorage.score = localStorage.score || 0;
    localStorage.level = localStorage.level || 1;
    localStorage.hints = localStorage.hints || 5;
    localStorage.addLives = localStorage.addLives || 5;
    localStorage.next = localStorage.next || 5;

    if(localStorage.level == 21) {
        $('#play-btn').addClass('w3-disabled');
    }

    $('#play-btn').click(function(e) {
        if(localStorage.level == 21) {
            e.preventDefault();
            $('#game-finished').show();
            $('#ok-btn').click(function() {
                $('#game-finished').hide();
            });
            return;
        }
    });

});

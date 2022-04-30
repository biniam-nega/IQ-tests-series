$(document).ready(function () {
    $('#score').html(localStorage.score);

    $('#lives').html('');
    for (var i = 0; i < localStorage.lives; i++) {
        $('#lives').html($('#lives').html() + '<img src="multimedia/img/heart-alive.png" width="30" height="30" />');
    }
    for (var i = 0; i < (5 - localStorage.lives); i++) {
        $('#lives').html($('#lives').html() + '<img src="multimedia/img/heart-dead.png" width="30" height="30" />');
    }

    var width = ((localStorage.level - 1) / 20) * 100;
    $('#level').css('width', width + '%');
    $('#level-txt').html((localStorage.level - 1) + '/20');

    // The reset button
    $('#reset-btn').click(function () {
        $('#reset-modal').show();
        $('#ok-btn').click(function () {
            localStorage.clear();
            window.location = window.location.href.slice(0, 52).concat('splash.html');
        });
        $('#cancel-btn').click(function () {
            $('#reset-modal').hide();
        });
    });
});

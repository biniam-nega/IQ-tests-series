// ROBIEL: add a div tag with id c-num-(number of choices). See question number 1 for more elaboration.
// Question #8 and 18 are not done

// Add functionality to the array prototype
Array.prototype.inArray = function (needle) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == needle) {
            return true;
        }
    }
    return false;
}

$(document).ready(function () {

    // Handles the choice type questions
    function handleChoice(qId, ans) {
        var numChoices = /c-num-([0-9]+)/.exec($($('#q' + qId).children()[0]).attr('id'))[1];
        for (var i = 1; i <= numChoices; i++) {
            (function () {
                var index = i;
                $('#q' + qId + ' #c' + index).click(function () {
                    if (index != ans) {
                        wrongAnswer();
                        return;
                    }
                    rightAnswer();
                });
            }());
        }
    }


    function handleSubmit(qId, ans) {
        $('#q' + qId + ' #ans1').click(function () {
            setInterval(function () {
                handleSubmitButton(qId);
            }, 1000);
        });


        function filled(qId) {
            if ($('#q' + qId + ' #ans1').val() != '' && ($('#q' + qId + ' #ans2').length == 0 || $('#q' + qId + ' #ans2').val() != '')) {
                return true;
            }
            return false;
        }

        function handleSubmitButton(qId) {
            if (filled(qId)) {   // if the user entered both the values
                $('#q' + qId + ' #submit').removeClass('w3-disabled');
            }
            else {
                $('#q' + qId + ' #submit').click(function () { });
                $('#q' + qId + ' #submit').addClass('w3-disabled');
            }
        }
        $('#q' + qId + ' #submit').click(function () {
            if (filled(qId)) {
                if (($('#q' + qId + ' #ans1').val() == ans[0]) && ($('#q' + qId + ' #ans2').length == 0 || $('#q' + qId + ' #ans2').val() == ans[1])) {    // correct answer
                    rightAnswer();
                    return;
                }
                wrongAnswer();
                return;
            }
        });
    }

    // create global variables

    // Holds the hints for each question
    var hints = ['Each line moves 45° clockwise from top to bottom.',
        'There are two interwoven sequences. Starting at 19, alternate numbers progress +2, +3, +4, +5. Starting at 20, alternate numbers progress +2, +4, +6, +8.',
        '',
        'All the others are three-digit numbers followed by their square root',
        'Rearrange the digits in the same manner as the above numbers',
        '',
        'Each line of three tiles across and down contains a line in the top corner, a line in the middle, a line in the bottom corner and a black dot.',
        '',
        'There are two alternate sequences. Starting at A, ABcDefGhijK; starting at Z, ZYxWvuTsrqP',
        'each number on the bottom line is the sum of the digits of the number directly above it.',
        'Multiply the number of pair of shoes by 2',
        'The other are pairs albeit starting in a different position',
        '. In the top sequence the numbers progress × 1.5. In the bottom sequence the numbers progress × 2.5.',
        'Looking across and down the contents of the first two tiles are combined to produce the contents of the end tile.',
        '',
        'The rest are the same figure rotated.',
        '',
        '',
        'The lines are moving downwards one notch at a time; when they reach the bottom they return to the top position at the next stage.',
        'You can only light the other items if you light this item'
    ];


    /* Handle the UI */
    // Show lives left
    renderHearts();

    // Show the score
    renderScore();

    // Show the level reached
    $('#level').html('Level ' + localStorage.level);
    $('#q' + localStorage.level).show();

    // The buttons at the bottom
    renderFooterBtns();


    /*
    Question #1
    */
    handleChoice(1, 1);


    /* 
    Question #2
    */
    handleSubmit(2, [22, 24]);

    /* Question 3 */
    handleChoice(3, 4);

    /* Question 4 */
    handleChoice(4, 3);


    /* Question 5 */
    handleSubmit(5, [69237]);


    /* Question 6 */
    handleChoice(6, 3);


    /* Question 7 */
    handleChoice(7, 3);

    /* the table of buttons for question #8 */

    var givens = ['12', '14', '16', '17', '21', '23', '25', '27', '32', '34', '35', '36', '41', '43', '45', '47', '52', '53', '54',
        '56', '61', '63', '65', '67', '72', '74', '76'];
    var values = ['&divide;', 'x', '=', '6', '+', '-', 'x', '+', '+', '-', '4', '=', '&divide;', '+', '-', '&divide;', 'x', '3', '-', '=', '=', '=',
        '=', '=', '&divide;', '+', '='];


    // constructor to render a button
    function Button(value, id) {
        this.render = function () {
            var classes = '';

            // add background-color
            if (givens.inArray(id)) {
                classes += 'w3-light-gray w3-hover-light-gray';
            }
            else {
                if (parseInt(id.slice(0, 1)) % 2 == 0) {
                    classes += 'w3-black w3-hover-black';
                }
                else {
                    classes += 'w3-white w3-hover-light-gray';
                }
            }

            return '<input type="button" class="w3-right-btn w3-border w3-button ' + classes + '" value="' + value + '" id="btn-' + id + '"/>';
        }
    }

    // A constructor for the entire board
    function Board(givens, values) {
        this.renderBoard = function () {
            counter = 0;
            for (var i = 1; i <= 7; i++) {
                for (var j = 1; j <= 7; j++) {
                    var index = '' + i + j;
                    if (givens.inArray(index)) {
                        var button = new Button(values[counter], index)
                        $('#board').html($('#board').html() + button.render());
                        counter++;
                        continue;
                    }
                    var button = new Button('', index);
                    $('#board').html($('#board').html() + button.render());
                }
                $('#board').html($('#board').html() + '<br/>');
            }
        }
    }
    new Board(givens, values).renderBoard();
    var inputs = ['11', '13', '15', '31', '33', '37', '51', '55', '57', '71', '73', '75', '77'];

    function change() {
        if ($(id).val() == '') {
            $(id).val('0');
        }

        if ($(id).val() == '9') {
            $(id).val('');
        } else {
            $(id).val(parseInt($(id).val()) + 1);
        }
        //handles submit button
        for (j = 0; j < inputs.length; j++) {
            if ($('#btn-' + inputs[j]).val() == '') {
                $('#q8 #submit').unbind();
                $('#q8 #submit').addClass('w3-disabled');
                return
            }
        }
        $('#q8 #submit').removeClass('w3-disabled');
        $('#q8 #submit').click(check);
    }

    for (var i = 0; i < inputs.length; i++) {
        (function () {
            var index = i;
            $('#btn-' + inputs[index]).click(function () { id = '#btn-' + inputs[index]; change() });
        }());
    }



    function check() {
        var key_ans = ['9', '3', '2', '6', '1', '3', '3', '6', '3', '5', '5', '2', '3'];
        for (i = 0; i < inputs.length; i++) {
            if ($('#btn-' + inputs[i]).val() != key_ans[i]) {
                //wrong answers
                wrongAnswer();
                return;
            }
            //correct answers
            rightAnswer();
        }
    }


    /* question #9 */
    handleSubmit(9, ['K', 'P']);


    /* question #10 */
    handleChoice(10, 5);


    /* Question 11 */
    handleSubmit(11, [8]);


    /* Question 12 */
    handleChoice(12, 3);


    /* Question 13 */
    handleChoice(13, 2);


    /* Question 14 */
    handleChoice(14, 2);


    /* Question 15 */
    handleChoice(15, 4);


    /* Question 16 */
    handleChoice(16, 4);


    /* Question 17 */
    handleSubmit(17, ['C']);


    /* Question 18 */
    handleSubmit(18, [18, 14]);


    /* Question 19 */
    handleChoice(19, 1);

    /* Question 20 */
    handleChoice(20, 1);


    // When the user is wrong
    function wrongAnswer() {
        $('#wrong-modal').show();
        setTimeout(function () {
            $('#wrong-modal').hide();
        }, 1000);
        localStorage.lives--; // decrement the lives left
        // negate the score
        if (parseInt(localStorage.score) < 10) { // to avoid negative score
            localStorage.score = 0;
        }
        else {
            localStorage.score -= 10;
        }
        zeroLives();
        renderScore();
        renderHearts();
        renderFooterBtns();
    }

    // When the user is right
    function rightAnswer() {
        localStorage.score = parseInt(localStorage.score) + 18;   // Add score
        renderScore();
        localStorage.level++;   // increment the level
        if (localStorage.level != 21) {  // The user hasn't finished the game yet
            $('#hint-answered').html(hints[parseInt(localStorage.level) - 2]);
            $('#message').show();

            // add event listener to the continue button
            $('#continue-btn').click(function () {
                window.location = window.location;
            });
            return;
        }
        $('#final-score').html(localStorage.score);
        $('#game-finished').show();
        $('#finish-btn').click(function () {
            window.location = window.location.href.slice(0, 52).concat('index.html');
        });
    }

    // Render the lives left
    function renderHearts() {
        $('#lives').html('');
        for (var i = 0; i < localStorage.lives; i++) {
            $('#lives').html($('#lives').html() + '<img src="multimedia/img/heart-alive.png" width="30" height="30" />');
        }
        for (var i = 0; i < (5 - localStorage.lives); i++) {
            $('#lives').html($('#lives').html() + '<img src="multimedia/img/heart-dead.png" width="30" height="30" />');
        }
    }

    function zeroLives() {
        if (localStorage.lives == 0) {   // The user has no more lives
            if (!(localStorage.level < 6)) {
                localStorage.level -= 5;
            }
            else {
                localStorage.level = 1;
            }
            localStorage.lives = 5;
            $('#0-lives-level').html(localStorage.level);
            $('#0-lives').show();
            $('#0-lives-btn').click(function () {
                window.location = '';
            });
        }
    }

    function renderScore() {
        $('#score').html(localStorage.score);
    }

    function renderFooterBtns() {
        $('#add-live-btn').removeClass('w3-disabled');
        if (localStorage.hints == 0 || (hints[parseInt(localStorage.level) - 1] == '')) {
            $('#hint-btn').addClass('w3-disabled');
        }
        if (localStorage.addLives == 0 || localStorage.lives == 5) {
            $('#add-live-btn').addClass('w3-disabled');
        }
        if (localStorage.next == 0) {
            $('#next-btn').addClass('w3-disabled');
        }
        $('#hint-txt').html(localStorage.hints);
        $('#add-lives-txt').html(localStorage.addLives);
        $('#next-txt').html(localStorage.next);
    }


    /* 
    Add event listeners to the buttons 
    */
    // show hint button
    $('#hint-btn').click(function () {
        if (parseInt(localStorage.hints) != 0 && (hints[parseInt(localStorage.level) - 1] != '')) {
            $('#hint').html(hints[parseInt(localStorage.level) - 1]);
            $('#hint-modal').show();
            localStorage.hints--;
            renderFooterBtns();
        }
    });

    // add live button
    $('#add-live-btn').click(function () {
        if (localStorage.lives != 5 && localStorage.addLives != 0) {   // If not 0 or 5 lives
            localStorage.lives++;
            localStorage.addLives--;
            renderHearts();
            renderFooterBtns();
        }
    });

    // next level button
    $('#next-btn').click(function () {
        if (localStorage.next != 0) {
            localStorage.level++;
            localStorage.next--;
            window.location = window.location;
        }
    });

});

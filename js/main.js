$('.playnow a').click(
    function(){
      $('.playnow').addClass('hidden')
      $( $(this).attr('href') ).removeClass('hidden')
  }
)



$('.btn-close').click(
  function(){
    document.location.reload();
    // $(this).closest('.quiz').addClass('hidden')
    // $('.playnow').removeClass('hidden')

})



var quiztitle = "Quiz Title";
/**
* Set the information about your questions here. The correct answer string needs to match
* the correct choice exactly, as it does string matching. (case sensitive)
*
*/
var quiz = [
    {
        "question"      :   "In the Circus, whenever one accident happens, it is believed that how many more will follow?",
        "choices"       :   [
                                "Seven",
                                "Five",
                                "Two",
                                "Three"
                            ],
        "correct"       :   "Two",
        "explanation"   :   "People use to, and some still do, believe accidents would always come in threes.",
    },
    {
        "question"      :   "Doing what backstage is said to cause bad luck?",
        "choices"       :   [
                                "Tapping",
                                "Humming",
                                "Whistling",
                                "Singing"
                            ],
        "correct"       :   "Whistling",
        "explanation"   :   "Whistling is believed to cause an accident during the show...and probably followed by two more!",
    },
    {
        "question"      :   "What is it that circus workers should NEVER do anywhere inside the circus tent?",
        "choices"       :   [
                                "Run",
                                "Drink",
                                "Eat",
                                "Sleep"
                            ],
        "correct"       :   "Sleep",
        "explanation"   :   "Back when the Circus was held in tents with dirt floors, the workers believed that if they slept in the tent, the floor would collapse and they would be stuck falling forever.",
    },
    {
        "question"      :   "Once a performer's ____ had been set up backstage, it never would be moved until it was time to head to the next town?",
        "choices"       :   [
                                "Lunch pail",
                                "Wardrobe trunk",
                                "Animal cage",
                                "Shoes"
                            ],
        "correct"       :   "Wardrobe trunk",
        "explanation"   :   "If a performer's wardrobe trunk was moved, he/she believed they'd be fired soon.",
    },
    {
        "question"      :   "The Circus band would play John Sousa's version of the Stars and Stripes Forever in what type of situation?",
        "choices"       :   [
                                "Happy",
                                "Climactic",
                                "Sad",
                                "Emergency"
                            ],
        "correct"       :   "Emergency",
        "explanation"   :   "When something bad happened somewhere in the Big Top, this song was played to warn the performers.",
    },
    {
        "question"      :   "What type of feather would bring bad luck if brought under the Big Top?",
        "choices"       :   [
                                "Peacock feather",
                                "Owl feather",
                                "Dove feather",
                                "Robin feather"
                            ],
        "correct"       :   "Peacock feather",
        "explanation"   :   "If anyone brought a Peacock feather into the tent, terrible things were said to happen. Better start playing the Stars and Stripes Forever to warn the performers!",
    },
];










var currentquestion = 0, score = 0, submt=true, picked;
jQuery(document).ready(function($){
    /**
     * HTML Encoding function for alt tags and attributes to prevent messy
     * data appearing inside tag attributes.
     */
    function htmlEncode(value){
      return $(document.createElement('div')).text(value).html();
    }
    /**
     * This will add the individual choices for each question to the ul#choice-block
     *
     * @param {choices} array The choices from each question
     */
    function addChoices(choices){
        if(typeof choices !== "undefined" && $.type(choices) == "array"){
            $('#choice-block').empty();
            for(var i=0;i<choices.length; i++){
                $(document.createElement('li')).addClass('choice choice-box').attr('data-index', i).text(choices[i]).appendTo('#choice-block');
            }
        }
    }

    /**
     * Resets all of the fields to prepare for next question
     */
    function nextQuestion(){
        submt = true;
        $('#explanation').empty();
        $('#question').text(quiz[currentquestion]['question']);
        $('#pager').text('Question ' + Number(currentquestion + 1) + ' of ' + quiz.length);
        if(quiz[currentquestion].hasOwnProperty('image') && quiz[currentquestion]['image'] != ""){
            if($('#question-image').length == 0){
                $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question'])).insertAfter('#question');
            } else {
                $('#question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question']));
            }
        } else {
            $('#question-image').remove();
        }
        addChoices(quiz[currentquestion]['choices']);
        setupButtons();
    }
    /**
     * After a selection is submitted, checks if its the right answer
     *
     * @param {choice} number The li zero-based index of the choice picked
     */
    function processQuestion(choice){
        if(quiz[currentquestion]['choices'][choice] == quiz[currentquestion]['correct']){
            $('.choice').eq(choice).css({'background-color':'#8dc63f'});
            $('#explanation').html('<strong>Correct!</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
            score++;
        } else {
            $('.choice').eq(choice).css({'background-color':'#ed1c24'});
            $('#explanation').html('<strong>Incorrect.</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
        }
        currentquestion++;
        $('#submitbutton').html('Next Question &raquo;').on('click', function(){
            if(currentquestion == quiz.length){
                endQuiz();

            } else {
                $(this).text('Check Answer').css({'color':'#222'}).off('click');
                nextQuestion();
            }
        })
    }
    /**
     * Sets up the event listeners for each button.
     */
    function setupButtons(){
        $('.choice').on('mouseover', function(){
            $(this).css({'background-color':'#e1e1e1'});
        });
        $('.choice').on('mouseout', function(){
            $(this).css({'background-color':'#fff'});
        })
        $('.choice').on('click', function(){
            picked = $(this).attr('data-index');
            $('.choice').removeAttr('style').off('mouseout mouseover');
            $(this).css({'border-color':'#222','font-weight':700,'background-color':'#c1c1c1'});
            if(submt){
                submt=false;
                $('#submitbutton').css({'color':'#222'}).on('click', function(){
                    $('.choice').off('click');
                    $(this).off('click');
                    processQuestion(picked);
                });
            }
        })
    }

    /**
     * Quiz ends, display a message.
     */
    function endQuiz(){
        $('#explanation').empty();
        $('#question').empty();
        $('#choice-block').empty();
        $('#submitbutton').remove();
        $('#question').text("You got " + score + " out of " + quiz.length + " correct.").css({'text-align':'center', 'font-size':'2em'});
        $(document.createElement('h2')).css({'text-align':'center', 'font-size':'4em'}).text(Math.round(score/quiz.length * 100) + '%').insertAfter('#question');
    }







    /**
     * Runs the first time and creates all of the elements for the quiz
     */
    function init(){

        //add pager and questions
        if(typeof quiz !== "undefined" && $.type(quiz) === "array"){
            //add pager
            $(document.createElement('p')).addClass('pager').attr('id','pager').text('Question 1 of ' + quiz.length).appendTo('#frame');
            //add first question
            $(document.createElement('h2')).addClass('question').attr('id', 'question').text(quiz[0]['question']).appendTo('#frame');
            //add image if present
            if(quiz[0].hasOwnProperty('image') && quiz[0]['image'] != ""){
                $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[0]['image']).attr('alt', htmlEncode(quiz[0]['question'])).appendTo('#frame');
            }
            $(document.createElement('p')).addClass('explanation').attr('id','explanation').html('&nbsp;').appendTo('#frame');

            //questions holder
            $(document.createElement('ul')).attr('id', 'choice-block').appendTo('#frame');

            //add choices
            addChoices(quiz[0]['choices']);

            //add submit button
            $(document.createElement('div')).addClass('choice-box').attr('id', 'submitbutton').text('Check Your Answer').css({'font-weight':700,'color':'#222'}).appendTo('#frame');



            setupButtons();
        }
    }

    init();
});

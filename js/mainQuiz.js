import { personalities } from "./data.js";
import { questions } from "./data.js";

/* this keeps track of which question we're on */
let currentQuestion = 0;

/* we pass a question to our loadQuestion function */
function loadQuestion(question) {
    /* we need to have a variable that keeps track of the element called 'story-text' */
    /* here is the first one */
    const questionText = document.getElementById('question-text');
    /* we need a variable that keeps track of an element called 'story-image' */
    const questionImage = document.getElementById('question-image');
    /* we need a variable that keeps track of an element called 'choices' */
    const choiceContainer = document.getElementById('choices');
    /* we need to set the story-text elements text to the questions text */
    questionText.textContent = questions[question].text;
    /* let's set the story images element source to questions[question].image */
    questionImage.src = questions[question].image;
    /* we need to clear the choices div to make sure no other choices are there */
    choiceContainer.textContent = '';
    /* we need to loop for each choice in the states[question].choices and loop within choice to get each personality*/
    for (const [choice, personality] of Object.entries(questions[question].choices)) {
        /* create a button element */
        const button = document.createElement('button');
        /* populate the text of the button */
        button.textContent = choice;
        button.className = 'choice-button';
        button.onclick = () => changeQuestion(currentQuestion + 1, personality);
        /* append the button to the choices */
        choiceContainer.appendChild(button);
    }

}

function changeQuestion(newQuestion, cats) {
    console.log("state is: " + newQuestion);
    cats.forEach(cat => {
        personalities[cat]++;
        console.log(cat + personalities[cat]);
    });

    currentQuestion = newQuestion;

    if (currentQuestion === 6) {
        endGame();
    } else {
        loadQuestion(currentQuestion);
    }
}

function endGame() {
    let maxCount = 0;
    let maxCat = '';

    for (const [cat, count] of Object.entries(personalities)) {
        if (count > maxCount) {
            maxCount = count;
            maxCat = cat;
        }
    }

    console.log(maxCat);

    const text = document.getElementById('question-text');
    const questionImage = document.getElementById('question-image');
    const choicesContainer = document.getElementById('choices');
    const catImagePath = `lil_images/cats/${maxCat}.png`;

    const img = new Image();
    img.src = catImagePath;
    img.className = 'responsive-image';

    // Once the image is loaded, update the DOM
    img.onload = () => {
        questionImage.src = img.src;
        choicesContainer.style.display = 'none';

        text.textContent = `drumroll... here are your results! (Right click or hold the image to save)`;
    }

}

function startGame() {
    document.querySelector('.title').style.display = 'none';
    document.getElementById('homescreen').style.display = 'none';
    document.querySelector('.start-button').style.display = 'none';
    document.getElementById('game-container').style.display = 'flex';
    loadQuestion(currentQuestion);
}


console.log("Welcome to the Personality Quiz!");
console.log(personalities);
console.log(questions);
window.startGame = startGame;
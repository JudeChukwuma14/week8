const url = 'https://quizmania-api.p.rapidapi.com/trivia';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'a5969c0527msh5eeb0186b57aa82p1289cejsnd5be4ded650f',
        'x-rapidapi-host': 'quizmania-api.p.rapidapi.com'
    }
};

async function fetchQuiz() {
    try {
        const response = await fetch(url, options);
        
        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        displayQuestions(result.results);
    } catch (error) {
        console.error('Error fetching quiz data:', error);
        document.getElementById('quiz').innerHTML = `<p class="text-danger">Error fetching quiz data: ${error.message}. Please try again later.</p>`;
    }
}

function displayQuestions(questions) {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = ''; // Clear previous content

    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('mb-4');
        questionElement.innerHTML = `
            <h4>${index + 1}. ${question.question}</h4>
            ${question.incorrect_answers.concat(question.correct_answer).sort().map(answer => `
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="question${index}" value="${answer}" id="answer${index}-${answer}">
                    <label class="form-check-label" for="answer${index}-${answer}">${answer}</label>
                </div>
            `).join('')}
        `;
        quizContainer.appendChild(questionElement);
    });
}

function calculateScore(questions) {
    let score = 0;
    questions.forEach((question, index) => {
        const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === question.correct_answer) {
            score++;
        }
    });
    return score;
}

document.getElementById('submit').addEventListener('click', () => {
    fetch(url, options)
        .then(response => response.json())
        .then(result => {
            const score = calculateScore(result.results);
            document.getElementById('result').innerHTML = `<h3>Your Score: ${score} out of ${result.results.length}</h3>`;
        })
        .catch(error => {
            console.error('Error calculating score:', error);
            document.getElementById('result').innerHTML = `<p class="text-danger">Error calculating score: ${error.message}. Please try again.</p>`;
        });
});

// Fetch the quiz when the page loads
fetchQuiz();

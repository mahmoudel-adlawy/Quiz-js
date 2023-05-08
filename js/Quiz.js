

export class Quiz {

    constructor(response) {

        this.response = response;
        this.numOFQues = response.length;
        this.currentQuestion = 0;
        this.score = 0
        this.nextBtn = document.getElementById('next');
        this.userAnswer = document.getElementsByName('answers')
        this.nextBtn.addEventListener('click', this.nextQuestion.bind(this))
        this.showQuestion()
    }



    showQuestion() {
        document.getElementById('question').innerHTML = this.response[this.currentQuestion].question;
        document.getElementById('totalAmount').innerHTML = this.numOFQues;
        document.getElementById('current').innerHTML = this.currentQuestion + 1;
        let answers = [this.response[this.currentQuestion].correct_answer, ...this.response[this.currentQuestion].incorrect_answers];
        this.shuffle(answers);

        let cartoona = ``
        for (let i = 0; i < answers.length; i++) {
            cartoona += `
            <div class="form-check">
            <label for="" class="form-check-label">
                <input type="radio" class="form-check-input" name="answers" value="${answers[i]}">
                ${answers[i]}
            </label>
        </div>
            `
        }
        document.getElementById('rowAnswer').innerHTML = cartoona


    }

    shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }
    nextQuestion() {
        if ([...this.userAnswer].filter(ele => ele.checked).length == 1) {
            this.checkuserAnswer();
            this.currentQuestion++;
            if (this.currentQuestion < this.numOFQues) {
                this.showQuestion();
            } else {
                $('#quiz').fadeOut(500, () => {
                    $('#finish').fadeIn(500);
                    document.getElementById('score').innerHTML = this.score;
                    document.getElementById('tryBtn').addEventListener('click', () => {
                        $('#finish').fadeOut(500, () => {
                            $('#setting').fadeIn(500)
                        })
                    })
                })
            }
        } else {
            $('.alert').fadeIn(500, () => {
                $('.alert').fadeOut(500)
            })
        }

    }
    checkuserAnswer() {
        let userAnwser = [...this.userAnswer].filter(ele => ele.checked)[0].value;
        if (userAnwser == this.response[this.currentQuestion].correct_answer) {
            this.score++
            $('#Correct').fadeIn(300, () => {
                $('#Correct').fadeOut(300)
            })
        } else {
            $('#inCorrect').fadeIn(300, () => {
                $('#inCorrect').fadeOut(300)
            })
        }
    }

}
import { Quiz } from "./Quiz.js"

export class Settings {

    constructor() {

        this.categoryELement = document.getElementById('category');
        this.diffucltyElement = document.getElementsByName('difficulty');
        this.numOfQues = document.getElementById('numOfQuestions');
        this.startBtn = document.getElementById('startBtn');

        this.startBtn.addEventListener('click', this.startQuiz.bind(this));

    }


    async startQuiz() {

        let category = this.categoryELement.value;
        let numOfQuestions = this.numOfQues.value;
        let difficulty = [...this.diffucltyElement].find(ele => ele.checked).value;
        let api = `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}`
        
        let response = await this.fetchApi(api);
        if (response.length > 0) {
            $('#setting').fadeOut(500, () => {
                $('#quiz').fadeIn(500);
            })
            let quiz = new Quiz(response);
        } else {
            $('#formAlert').fadeIn(0, () => {
                $('#formAlert').fadeOut(10000)
            })
        }

    }


    async fetchApi(api) {
        let response = await fetch(api);
        let res = await response.json();
        return res.results;
    }


}
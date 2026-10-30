const answerButton = document.getElementById("answer_button");

answerButton.disabled = true;

let questionnaireStartTime;

if (sessionStorage.getItem("experimentStage") === "questionnaire") {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            questionnaireStartTime = startTimer();
            answerButton.disabled = false;
        });
    });
}

answerButton.addEventListener(
    "click",
    ()=>{

        const questions = document.querySelectorAll(".questionnaire_container");

        let hasUnanswered = false;

        questions.forEach(
            (question)=>{
                const selectedAnswer = question.querySelector(
                    'input[type="radio"]:checked'
                );

                console.log(selectedAnswer);

                if(selectedAnswer === null){
                    hasUnanswered = true;
                }
            }
        );

        if(hasUnanswered === true){
            alert("すべての問題に回答してください");
            return;
        }

        answerButton.disabled = true;

        questions.forEach(
            (question)=>{
                const selectedAnswer = question.querySelector(
                    'input[type="radio"]:checked'
                );

                const value = selectedAnswer.value;

                const numericQuestions = [
                    "news_interest",
                    "non_goal_browsing",
                    "search_tendency",
                    "current_search_intent",
                    "list_ui_familiarity",
                    "single_ui_familiarity"
                ];

                let response;

                if(numericQuestions.includes(selectedAnswer.name)){
                    response = Number(value);
                }
                else {
                    response = value;
                }
        
                addLog(
                    "questionnaire_answer",
                    null,
                    {
                        questionName: selectedAnswer.name,
                        response: response
                    }
                );
            }
        );
        console.log("全問回答済み");


        addLog(
                "questionnaire_complete",
                    null,
                    {
                        responseTimeMs: getElapsedTime(questionnaireStartTime),
                        questionCount: questions.length
                    }
                );

        goToNextStage("finish", "finish.html");
    }
);

window.addEventListener("pageshow", () => {
    checkExperimentStage("questionnaire");
});
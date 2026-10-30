const answerButton = document.getElementById("answer_button");

answerButton.disabled = true;

let cognitionStartTime;

if (sessionStorage.getItem("experimentStage") === "cognition") {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            cognitionStartTime = startTimer();
            answerButton.disabled = false;
        });
    });
}

answerButton.addEventListener(
    "click",
    ()=>{
        const questions = document.querySelectorAll(".question_container");

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
        
                addLog(
                    "cognition_answer",
                    null,
                    {
                        questionName: selectedAnswer.name,
                        response: Number(selectedAnswer.value)
                    }
                );
            }
        );
        console.log("全問回答済み");

        addLog(
            "cognition_complete",
            null,
            {
                responseTimeMs: getElapsedTime(cognitionStartTime),
                questionCount: questions.length
            }
        );

        goToNextStage("memory", "memory.html");
    }
);

window.addEventListener("pageshow", () => {
    checkExperimentStage("cognition");
});
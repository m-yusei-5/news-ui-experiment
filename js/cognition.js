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
                const selectedAnswers = question.querySelectorAll(
                    'input[type="radio"]:checked'
                );

                console.log(selectedAnswers);

                if (selectedAnswers.length !== 2) {
                    hasUnanswered = true;
                }
            }
        );

        if(hasUnanswered === true){
            alert("すべての問題に回答してください");
            return;
        }

        answerButton.disabled = true;

        const pattern = JSON.parse(
            sessionStorage.getItem("experimentPattern")
        );

        questions.forEach((question) => {

            const selectedAnswers = question.querySelectorAll(
                'input[type="radio"]:checked'
            );

            selectedAnswers.forEach((selectedAnswer) => {

                const targetPhase = Number(
                    selectedAnswer.name.match(/_phase([12])$/)[1]
                );

                const target = pattern[targetPhase - 1];

                addLog(
                    "cognition_answer",
                    null,
                    {
                        questionName: selectedAnswer.name,
                        response: Number(selectedAnswer.value),
                        targetPhase: targetPhase,
                        targetCondition: target.ui,
                        targetArticleSet: target.set
                    }
                );
            });
        });
        console.log("全問回答済み");

        addLog(
            "cognition_complete",
            null,
            {
                responseTimeMs: getElapsedTime(cognitionStartTime),
                questionCount: questions.length,
                answerCount: questions.length * 2
            }
        );

        goToNextStage("memory", "memory.html");
    }
);

window.addEventListener("pageshow", () => {
    checkExperimentStage("cognition");
});
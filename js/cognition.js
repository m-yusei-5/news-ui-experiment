const answerButton = document.getElementById("answer_button");

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

        window.location.href = "memory.html";
    }
);
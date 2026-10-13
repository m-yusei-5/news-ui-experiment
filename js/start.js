const startButton = document.getElementById("start_button");

startButton.addEventListener(
    "click",
    ()=>{
        let condition;
        if(Math.random()>0.5){
            condition = "list";
        }
        else{
            condition = "single";
        }

        startExperiment(condition);

        if(condition==="list"){
            window.location.href = "list.html"
        }
        else{
            window.location.href = "single.html"
        }
    }
);
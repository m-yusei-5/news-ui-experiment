function getLogs(){
    const savedLogs=
        sessionStorage.getItem(
            "experimentLogs"
        );
    if(savedLogs===null){
        return[];
    }
    return JSON.parse(savedLogs);
}

function addLog(
    eventName,
    articleId=null,
    details={}
){
    const logs=getLogs();

    const startTime = Number(
        sessionStorage.getItem(
            "experimentStartTime"
        )
    );

    const newLog={
        participantId: sessionStorage.getItem("participantId"),
        condition: sessionStorage.getItem("condition"),
        event: eventName,
        articleId: articleId,
        elapsedMs: Date.now() - startTime,
        timestamp: new Date().toISOString(),
        ...details
    };

    logs.push(newLog);
    sessionStorage.setItem(
        "experimentLogs",
        JSON.stringify(logs)
    );
    console.log("追加したログ：",newLog);
}

function startExperiment(condition){

    if(sessionStorage.getItem("participantId")===null){
        sessionStorage.setItem(
            "participantId",
            crypto.randomUUID()
        );
    }

    // 前回の閲覧情報を初期化
    sessionStorage.removeItem("browsingStartTime");
    sessionStorage.removeItem("listScrollPosition");
    sessionStorage.removeItem("singleCurrentArticle");


    const startTime=Date.now();

    sessionStorage.setItem(
        "experimentStartTime",
        startTime
    );

    sessionStorage.setItem(
        "condition",
        condition
    );

    sessionStorage.setItem(
        "experimentLogs",
        JSON.stringify([])
    );

    sessionStorage.setItem("experimentStage", "browsing");

    addLog("experiment_start");
}

// 時間計測を開始する
function startTimer() {
    return Date.now();
}

// 開始時刻からの経過時間を取得する
function getElapsedTime(startTime) {
    return Date.now() - startTime;
}

// 次の実験段階へ進む
function goToNextStage(stage, page) {
    sessionStorage.setItem("experimentStage", stage);
    window.location.replace(page);
}

// 現在の実験段階を確認する
function checkExperimentStage(pageStage) {

    const currentStage =
        sessionStorage.getItem("experimentStage");

    // 正しい画面なら何もしない
    if (currentStage === pageStage) {
        return;
    }

    // 実験段階ごとの移動先
    const pages = {
        browsing: sessionStorage.getItem("condition") === "list"
            ? "list.html"
            : "single.html",
        cognition: "cognition.html",
        memory: "memory.html",
        declaration: "declaration.html",
        questionnaire: "questionnaire.html",
        completed: "finish.html"
    };

    const destination = pages[currentStage];

    // 現在の実験段階に対応する画面へ移動
    if (destination) {
        window.location.replace(destination);
    }
}


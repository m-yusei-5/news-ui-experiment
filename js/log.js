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

    addLog("experiment_start");
}
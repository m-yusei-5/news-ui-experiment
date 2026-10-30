const logs = getLogs();

const visibleLogs = logs.filter(
    (log)=>{
        return log.event === "article_visible";
    }
);

console.log("見られた記事のログ",visibleLogs);

const visibleArticleIds = visibleLogs.map(
    (log)=>{
        return log.articleId;
    }
);

const uniqueVisibleIds =
    [...new Set(visibleArticleIds)];

console.log("見られた記事のID",uniqueVisibleIds);

const testArticles = newsData.filter(
    (news)=>{
        return uniqueVisibleIds.includes(news.id);
    }
);

console.log("見られた記事配列",testArticles);

const dummyArticles = [
    {
        id: "dummy01",
        sourceId: "news01",
        title: "仮のダミー記事1",
        correctAnswer: "unseen"
    },
    {
        id: "dummy02",
        sourceId: "news02",
        title: "仮のダミー記事2",
        correctAnswer: "unseen"
    },
    {
        id: "dummy03",
        sourceId: "news03",
        title: "仮のダミー記事3",
        correctAnswer: "unseen"
    },
    {
        id: "dummy04",
        sourceId: "news04",
        title: "仮のダミー記事4",
        correctAnswer: "unseen"
    },
    {
        id: "dummy05",
        sourceId: "news05",
        title: "仮のダミー記事5",
        correctAnswer: "unseen"
    },
    {
        id: "dummy06",
        sourceId: "news06",
        title: "仮のダミー記事6",
        correctAnswer: "unseen"
    },
    {
        id: "dummy07",
        sourceId: "news07",
        title: "仮のダミー記事7",
        correctAnswer: "unseen"
    },
    {
        id: "dummy08",
        sourceId: "news08",
        title: "仮のダミー記事8",
        correctAnswer: "unseen"
    },
    {
        id: "dummy09",
        sourceId: "news09",
        title: "仮のダミー記事9",
        correctAnswer: "unseen"
    },
    {
        id: "dummy10",
        sourceId: "news10",
        title: "仮のダミー記事10",
        correctAnswer: "unseen"
    },
    {
        id: "dummy11",
        sourceId: "news11",
        title: "仮のダミー記事11",
        correctAnswer: "unseen"
    },
    {
        id: "dummy12",
        sourceId: "news12",
        title: "仮のダミー記事12",
        correctAnswer: "unseen"
    },
    {
        id: "dummy13",
        sourceId: "news13",
        title: "仮のダミー記事13",
        correctAnswer: "unseen"
    },
    {
        id: "dummy14",
        sourceId: "news14",
        title: "仮のダミー記事14",
        correctAnswer: "unseen"
    },
    {
        id: "dummy15",
        sourceId: "news15",
        title: "仮のダミー記事15",
        correctAnswer: "unseen"
    },
    {
        id: "dummy16",
        sourceId: "news16",
        title: "仮のダミー記事16",
        correctAnswer: "unseen"
    },
    {
        id: "dummy17",
        sourceId: "news17",
        title: "仮のダミー記事17",
        correctAnswer: "unseen"
    },
    {
        id: "dummy18",
        sourceId: "news18",
        title: "仮のダミー記事18",
        correctAnswer: "unseen"
    },
    {
        id: "dummy19",
        sourceId: "news19",
        title: "仮のダミー記事19",
        correctAnswer: "unseen"
    },
    {
        id: "dummy20",
        sourceId: "news20",
        title: "仮のダミー記事20",
        correctAnswer: "unseen"
    },
    {
        id: "dummy21",
        sourceId: "news21",
        title: "仮のダミー記事21",
        correctAnswer: "unseen"
    },
    {
        id: "dummy22",
        sourceId: "news22",
        title: "仮のダミー記事22",
        correctAnswer: "unseen"
    },
    {
        id: "dummy23",
        sourceId: "news23",
        title: "仮のダミー記事23",
        correctAnswer: "unseen"
    },
    {
        id: "dummy24",
        sourceId: "news24",
        title: "仮のダミー記事24",
        correctAnswer: "unseen"
    },
    {
        id: "dummy25",
        sourceId: "news25",
        title: "仮のダミー記事25",
        correctAnswer: "unseen"
    },
    {
        id: "dummy26",
        sourceId: "news26",
        title: "仮のダミー記事26",
        correctAnswer: "unseen"
    },
    {
        id: "dummy27",
        sourceId: "news27",
        title: "仮のダミー記事27",
        correctAnswer: "unseen"
    },
    {
        id: "dummy28",
        sourceId: "news28",
        title: "仮のダミー記事28",
        correctAnswer: "unseen"
    },
    {
        id: "dummy29",
        sourceId: "news29",
        title: "仮のダミー記事29",
        correctAnswer: "unseen"
    },
    {
        id: "dummy30",
        sourceId: "news30",
        title: "仮のダミー記事30",
        correctAnswer: "unseen"
    }
];

// 閲覧可能だった記事を再認課題用に変換
const seenArticles = testArticles.map(
    (article) => {
        return {
            id: article.id,
            title: article.title,
            correctAnswer: "seen"
        };
    }
);

// 閲覧可能だった記事をシャッフル
for (let i = seenArticles.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [seenArticles[i], seenArticles[j]] =
        [seenArticles[j], seenArticles[i]];
}

// 最大20件、かつ偶数件を抽出
const count = Math.min(
    Math.floor(seenArticles.length / 2) * 2,
    20
);

const selectedArticles = seenArticles.slice(0, count);

// 半分に分ける
const half = count / 2;

// そのまま出題する元記事
const selectedSeenArticles = selectedArticles.slice(0, half);

// ダミーに置き換える元記事
const dummySourceArticles = selectedArticles.slice(half);

// 対応するダミー記事を取得
const selectedDummyArticles = dummySourceArticles.map(
    (article) => {
        return dummyArticles.find(
            (dummy) => dummy.sourceId === article.id
        );
    }
);

// ダミーが存在するか確認
if (selectedDummyArticles.some((dummy) => !dummy)) {
    throw new Error("対応するダミー記事がありません");
}

// 元記事とダミー記事を結合
const memoryQuestions = [
    ...selectedSeenArticles,
    ...selectedDummyArticles
];

for (let i = memoryQuestions.length - 1; i > 0; i--) {

    const j =
        Math.floor(Math.random() * (i + 1));

    [
        memoryQuestions[i],
        memoryQuestions[j]
    ] = [
        memoryQuestions[j],
        memoryQuestions[i]
    ];
}

console.log("合成した記事配列",memoryQuestions);

const memoryContainer = document.getElementById("memory-container");

memoryQuestions.forEach((article)=>{
    const questionHTML = `
        <main class="memory_question" data-article-id="${article.id}" data-correct-answer="${article.correctAnswer}">   
            <p class="memory_title">「${article.title}」</p>
            <label>
                <input type="radio" name="recognition-${article.id}" value="seen">
                表示されていた
            </label>
            <label>
                <input type="radio" name="recognition-${article.id}" value="unseen">
                表示されていなかった
            </label>
        </main>
    `;
    memoryContainer.insertAdjacentHTML(
        "beforeend",
        questionHTML
    );
});


const answerButton = document.getElementById("answer_button");

answerButton.disabled = true;

let memoryStartTime;

if (sessionStorage.getItem("experimentStage") === "memory") {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            memoryStartTime = startTimer();
            answerButton.disabled = false;
        });
    });
}

answerButton.addEventListener(
    "click",
    ()=>{

        const questions = document.querySelectorAll(".memory_question");

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

        addLog(
                    "memory_complete",
                    null,
                    {
                        responseTimeMs: getElapsedTime(memoryStartTime),
                        questionCount: memoryQuestions.length
                    }
                );

        questions.forEach(
            (question)=>{
                const selectedAnswer = question.querySelector(
                    'input[type="radio"]:checked'
                );                

                const articleId = question.dataset.articleId;

                const correctAnswer = question.dataset.correctAnswer;
        
                addLog(
                    "recognition_answer",
                    articleId,
                    {
                        response: selectedAnswer.value,
                        correctAnswer: correctAnswer
                    }
                );
            }
        );
        console.log("全問回答済み");

        goToNextStage("declaration", "declaration.html");
    }
);

window.addEventListener("pageshow", () => {
    checkExperimentStage("memory");
});










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
    title: "ダミー記事のタイトル1",
    correctAnswer: "unseen"
  },
  {
    id: "dummy02",
    title: "ダミー記事のタイトル2",
    correctAnswer: "unseen"
  },
  {
    id: "dummy03",
    title: "ダミー記事のタイトル2",
    correctAnswer: "unseen"
  },
  {
    id: "dummy04",
    title: "ダミー記事のタイトル2",
    correctAnswer: "unseen"
  },
  {
    id: "dummy05",
    title: "ダミー記事のタイトル2",
    correctAnswer: "unseen"
  },
  {
    id: "dummy06",
    title: "ダミー記事のタイトル2",
    correctAnswer: "unseen"
  },
  {
    id: "dummy07",
    title: "ダミー記事のタイトル2",
    correctAnswer: "unseen"
  },
  {
    id: "dummy08",
    title: "ダミー記事のタイトル2",
    correctAnswer: "unseen"
  },
  {
    id: "dummy09",
    title: "ダミー記事のタイトル2",
    correctAnswer: "unseen"
  },
  {
    id: "dummy10",
    title: "ダミー記事のタイトル2",
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

        window.location.href = "declaration.html";
    }
);










const container = document.getElementById("declaration-container");

// 閲覧ログを取得
const logs = getLogs();

// 画面に表示された記事のログだけ抽出
const visibleLogs = logs.filter(
    (log) => {
        return log.event === "article_visible";
    }
);

// 表示された記事のIDを取得
const visibleArticleIds = visibleLogs.map(
    (log) => {
        return log.articleId;
    }
);

// 重複したIDを削除
const uniqueVisibleIds = [...new Set(visibleArticleIds)];

// 表示された記事だけを抽出
const visibleArticles = newsData.filter(
    (news) => {
        return uniqueVisibleIds.includes(news.id);
    }
);

// 表示された記事だけを自己申告画面に追加
visibleArticles.forEach((news)=>{
    const optionHTML = `
        <label class="article_option" data-article-id="${news.id}">
            <input type = "checkbox" name = "viewedArticle" value = "${news.id}">
            <span class = "article_title">
                ${news.title}
            </span>
        </label>
    `;

    container.insertAdjacentHTML(
        "beforeend",
        optionHTML
    );
});


const answerButton = document.getElementById("answer_button");

answerButton.disabled = true;

let declarationStartTime;

if (sessionStorage.getItem("experimentStage") === "declaration") {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            declarationStartTime = startTimer();
            answerButton.disabled = false;
        });
    });
}


answerButton.addEventListener(
    "click",
    ()=>{
        answerButton.disabled = true;

        const options = document.querySelectorAll(".article_option");

        options.forEach(
            (option)=>{
                const checkbox = option.querySelector(
                    'input[type="checkbox"]'
                );

                const articleId = option.dataset.articleId;

                addLog(
                    "declaration_answer",
                    articleId,
                    {
                        response: checkbox.checked
                    }
                );
            }
        );
        console.log("回答完了");


        addLog(
                "declaration_complete",
                    null,
                    {
                        responseTimeMs: getElapsedTime(declarationStartTime),
                        questionCount: visibleArticles.length
                    }
                );

        goToNextStage("questionnaire", "questionnaire.html");
    }
);

window.addEventListener("pageshow", () => {
    checkExperimentStage("declaration");
});
const container = document.getElementById("declaration-container");

newsData.forEach((news)=>{
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

answerButton.addEventListener(
    "click",
    ()=>{
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

        window.location.href = "questionnaire.html";
    }
);
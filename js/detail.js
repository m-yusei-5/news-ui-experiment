const params = new URLSearchParams(window.location.search);

const articleId = params.get("id");

const condition = params.get("condition");

const detailStartTime=performance.now();

//クリックされた記事とnews-data.jsにある記事を照合して同じidのものをselectedNewsに保存する
const selectedNews = newsData.find((news) => {
  return news.id === articleId;
});

//HTMLの中で本文を並べる場所を探し出す
const detailContainer =document.getElementById("detail_container");

//news-data.jsから選ばれた記事(selectedNews)の中のparagraphsをparagraphHTMLに保存する
//map()で配列にあるそれぞれの要素を別の形に変換し、新しい配列を作る
if (selectedNews) {
  const paragraphHTML = selectedNews.paragraphs
    .map((paragraph) => {
      return `<p>${paragraph}</p>`;
    })
    .join("");

  detailContainer.innerHTML = `
    <article class="detail_article" data_article_id="${selectedNews.id}">
      <h1 class="detail_title">
        ${selectedNews.title}
      </h1>

      <div class="detail_date">
        ${selectedNews.date}
      </div>

      <img class="detail_image ${selectedNews.id}" src="${selectedNews.image}" alt="${selectedNews.title}">

      <div class="detail_paragraph">
        ${paragraphHTML}
      </div>
    </article>
  `;
} else {
  detailContainer.innerHTML = `
    <p>記事が見つかりませんでした。</p>
  `;
}

const backLink =
  document.getElementById("back_link");

if (condition === "list") {
  backLink.href = "list.html";
} 
else{
  backLink.href = "single.html";
}

let detailCloseLogged=false;

function recordDetailClose(){
    if(detailCloseLogged){
        return;
    }

    detailCloseLogged=true;

    const durationMs=Math.round(
        performance.now()-detailStartTime
    );

    addLog(
        "detail_close",
        articleId,
        {
            durationMs: durationMs
        }
    );
}

backLink.addEventListener(
  "click",
  recordDetailClose
);

window.addEventListener(
  "pagehide",
  recordDetailClose
);

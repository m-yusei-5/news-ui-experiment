if (
  !document.hidden &&
  sessionStorage.getItem("experimentStage") === "browsing"
) {
  resumeBrowsingTimer();
}

const params = new URLSearchParams(window.location.search);

const articleId = params.get("id");

const condition = params.get("condition");

let detailActiveStart = Date.now();
let detailActiveTotal = 0;

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
else if(condition === "single"){
  backLink.href = "single.html";
}

let detailCloseLogged = false;

// 詳細画面の計測を停止
function pauseDetailTimer() {
  if (detailActiveStart !== null) {
    detailActiveTotal += Date.now() - detailActiveStart;
    detailActiveStart = null;
  }
}

// 詳細画面の計測を再開
function resumeDetailTimer() {
  if (detailActiveStart === null && !detailCloseLogged) {
    detailActiveStart = Date.now();
  }
}

// 詳細画面の終了を記録
function recordDetailClose() {
  if (detailCloseLogged) {
    return;
  }

  pauseDetailTimer();

  detailCloseLogged = true;

  addLog("detail_close", articleId, {
    durationMs: detailActiveTotal
  });
}

// Safariの表示状態が変化したとき
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    pauseDetailTimer();
    pauseBrowsingTimer();
  } else {
    resumeBrowsingTimer();
    resumeDetailTimer();
  }
});

// 戻るリンクを押したとき
backLink.addEventListener("click", recordDetailClose);

// ページを離れるとき
window.addEventListener("pagehide", () => {
  pauseDetailTimer();
  recordDetailClose();
});

// ページに戻ったとき
window.addEventListener("pageshow", (event) => {
  checkExperimentStage("browsing");

  if (event.persisted && !document.hidden) {
    resumeBrowsingTimer();

    // 履歴から復帰した場合は新しい閲覧として記録
    detailCloseLogged = false;
    detailActiveTotal = 0;
    detailActiveStart = Date.now();

    addLog("detail_open", articleId);
  }
});

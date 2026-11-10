//HTMLのsingle_UIのの
const container =
  document.getElementById("single_container");

currentNewsData.forEach((news) => {
  const articleHTML = `
    <article class="single_page" data-article-id="${news.id}">
      <a class="single_link" href="detail.html?id=${news.id}&condition=single">
          <p class="${news.imageClass}">
            <img class="single_image" src="${news.image}" alt="${news.title}">
          </p>
          <h2 class="single_title">
            ${news.title}
          </h2>
      </a>

      <div class="swipe_guide">
        <div class=swipe_icon>
          ↑
        </div>
        上にスワイプ
      </div>
    </article>
  `;

  container.insertAdjacentHTML(
    "beforeend",
    articleHTML
  );
});

container.insertAdjacentHTML(
    "beforeend",
    `
    <section id="single_container_finish">
        記事は以上で終了です
    </section>
    `
);

const timers=new Map();

const visibleStartTimes = new Map();

function endArticleExposure(articleId){
  const timeId=timers.get(articleId);

  clearTimeout(timeId);

  timers.delete(articleId);

  if (visibleStartTimes.has(articleId)) {

    const startTime =
      visibleStartTimes.get(articleId);

    const duration =
      Date.now() - startTime;

    addLog(
      "article_exposure",
      articleId,
      {
        durationMs: duration
      }
    );

    visibleStartTimes.delete(articleId);
  }
}

function endAllArticleExposure(){
  visibleStartTimes.forEach(
    (startTime,articleId)=>{
      endArticleExposure(articleId);
    }
  );
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const articleId =
          entry.target.dataset.articleId;
      if (
        !document.hidden &&
        sessionStorage.getItem("experimentStage") === "browsing" &&
        entry.intersectionRatio >= 0.5
      )   
      {       
        if (!visibleStartTimes.has(articleId)){
          const timeId = setTimeout(() => {
            if (
              !document.hidden &&
              visibleStartTimes.has(articleId)
            ) {
              addLog("article_visible", articleId);
            }

            timers.delete(articleId);
          }, 1000);

        visibleStartTimes.set(
          articleId,
          Date.now()
        );

        timers.set(articleId,timeId);

        console.log(
          "50%以上表示：",
          articleId
        );
        }
      }

      else{
        endArticleExposure(articleId);
      }
      
    });
  },
  {
    threshold: 0.5
  }
);

const articlePages =
  document.querySelectorAll(".single_page");

function startArticleObserver() {
  articlePages.forEach((page) => {
    observer.observe(page);
  });
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    endAllArticleExposure();
    observer.disconnect();

    pauseBrowsingTimer();
  } else if (
    sessionStorage.getItem("experimentStage") === "browsing"
  ) {
    resumeBrowsingTimer();
    startArticleObserver();
  }
});

//HTMLの中の記事がクリックされたときの記事を把握するため、aタグのclassをすべて探してそれぞれをlinkという変数に一時的に保存する
//そのlinkを参照し、そのlinkに対してクリックされた時にidを取得するためにaタグの一個前のsectionタグをclassを読み込み、pageに保存
//そのsectionタグのdata-article-idをarticleIdに保存する
//ページを移動しても保存されるようにarticleIdをlistCurrentArticleに保存する
const links=document.querySelectorAll(".single_link")
  links.forEach((link) => {
    link.addEventListener("click", () => {
      endAllArticleExposure();

      const page =
      link.closest(".single_page");

      const articleId =
      page.dataset.articleId;

      sessionStorage.setItem(
        "singleCurrentArticle",
        articleId
      );

      addLog(
        "detail_open",
        articleId
      );
    });
  });

//restoreListPositionという関数を作り、中で先ほど保存したlistCurrentArticleを取り出し、savedListPositionに代入する
function restoreSinglePosition(){

  const savedArticleId =
    sessionStorage.getItem(
      "singleCurrentArticle"
    );
  
  //ブラウザが次に画面を描画する前にウィンドウをtopをtargetPageのtopに合わせて、即座に移動させる
  requestAnimationFrame(() => {
    if (savedArticleId!==null) {
      const targetPage = document.querySelector(`.single_page[data-article-id="${savedArticleId}"]`);
      if (targetPage!==null){
        container.scrollTo({
          top: targetPage.offsetTop,
          behavior: "auto"
        });
      }   
    }
    else{
      container.scrollTo({
        top: 0,
        behavior: "auto"
      });
    }

    requestAnimationFrame(() => {
      startArticleObserver();
      if (sessionStorage.getItem("browsingStartTime") === null) {
        sessionStorage.setItem("browsingStartTime", Date.now());
      }

      endButton.disabled = false;
    });
  });
}

const endButton = document.querySelector(".end_button");

endButton.disabled = true;

// ニュース閲覧中の場合だけ初期化する
if (sessionStorage.getItem("experimentStage") === "browsing") {
    restoreSinglePosition();
}


endButton.addEventListener("click", () => {
  const confirmed = window.confirm(
    "ニュースの閲覧を終了しますか？\n終了後はニュース画面に戻れません。"
  );

  if (!confirmed) {
    return;
  }

  endButton.disabled = true;

  endAllArticleExposure();

  addLog("browsing_end", null, {
      browsingTime: getBrowsingTime()
  });

  sessionStorage.setItem("browsingFinished", "true");

  if (sessionStorage.getItem("phase") === "1") {
    startSecondBrowsing();
  } else {
      goToNextStage("cognition", "cognition.html");
  }
});
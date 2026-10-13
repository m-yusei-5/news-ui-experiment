if (sessionStorage.getItem("experimentStartTime") === null) {
  startExperiment("list");

  sessionStorage.setItem(
    "browsingStartTime",
    Date.now()
  );
}

//ニュース記事を並べる位置を取得してcontainerという変数に保存する
const container = document.getElementById("list-container");

//news-date.jsからニュース記事をそれぞれ取り出し、その配置の仕方をarticleHTMLに保存する
newsData.forEach((news) => {
  const articleHTML=`
    <article class="list_page" data-article-id="${news.id}">
      <a class=list_link href="detail.html?id=${news.id}&condition=list">
          <p class="${news.imageClass}">
            <img class=list_image src="${news.image}" alt="">
          </p>

          <h2 class="title">
            ${news.title}
          </h2>
          <div class=list_date>
            ${news.date}
          </div>
      </a>
    </article>
    `
  //containerから位置を参照し、その位置の既存の内容のすぐ後ろにarticleHTML(記事の要素の並べ方)を挿入する
  container.insertAdjacentHTML(
    "beforeend",
    articleHTML
  );
});

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
      if (entry.intersectionRatio >= 0.5) {        
        if (!visibleStartTimes.has(articleId)){
          const timeId=setTimeout(() => {   //１秒後に行う処理の予約
          console.log("1秒経った",articleId);

          addLog(
            "article_visible",
            articleId
          );

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
  document.querySelectorAll(".list_page");

function startArticleObserver() {
  articlePages.forEach((page) => {
    observer.observe(page);
  });
}

const centerStartTimes = new Map();

function endCenterExposure(articleId) {

    if (centerStartTimes.has(articleId)) {

        const startTime =
            centerStartTimes.get(articleId);

        const duration =
            Date.now() - startTime;

        addLog(
          "headline_center_exposure",
          articleId,
          {
            durationMs: duration,
          }
        )

        console.log(
            articleId,
            "中央滞在時間：",
            duration,
        );

        centerStartTimes.delete(articleId);
    }
}

function endAllCenterExposure(){
  centerStartTimes.forEach(
    (startTime,articleId)=>{
      endCenterExposure(articleId);
    }
  );
}

function checkHeadlineCenter(){
  const headlines = document.querySelectorAll(".title");

  headlines.forEach((headline)=>{

    const article = headline.closest(".list_page");

    const articleId = article.dataset.articleId;

    const rect = headline.getBoundingClientRect();

    const headlineCenter = rect.top+rect.height/2;

    const screenHeight = window.innerHeight;

    const centerTop = screenHeight*0.3;

    const centerBottom = screenHeight*0.7;

    if (headlineCenter>=centerTop&&headlineCenter<=centerBottom){     

      // console.log("中央にある");

      if (!centerStartTimes.has(articleId)){

        centerStartTimes.set(articleId,Date.now());

        console.log(articleId,"中央に入った");
      }
    }
    else{
      endCenterExposure(articleId);
    }
  });
}


//HTMLの中の記事がクリックされたときの記事を把握するため、aタグのclassをすべて探してそれぞれをlinkという変数に一時的に保存する
//そのlinkを参照し、そのlinkに対してクリックされた時にidを取得するためにaタグの一個前のsectionタグをclassを読み込み、pageに保存
//そのsectionタグのdata-article-idをarticleIdに保存する
//ページを移動しても保存されるようにarticleIdをlistCurrentArticleに保存する
const links=document.querySelectorAll(".list_link")
  links.forEach((link) => {
    link.addEventListener("click", () => {
      endAllArticleExposure();
      endAllCenterExposure();

      const page =
      link.closest(".list_page");

      const articleId =
      page.dataset.articleId;

      addLog(
        "detail_open",
        articleId
      );
    });
  });

window.addEventListener(
  "scroll",
  () => {
    sessionStorage.setItem(
      "listScrollPosition",
      window.scrollY
    );
  }
);

//restoreListPositionという関数を作り、中で先ほど保存したlistCurrentArticleを取り出し、savedListPositionに代入する
function restoreListPosition(){

  const savedScrollPosition =
    sessionStorage.getItem(
      "listScrollPosition"
    );
  
  //ブラウザが次に画面を描画する前にウィンドウをtopをtargetPageのtopに合わせて、即座に移動させる
  requestAnimationFrame(() => {
    if (savedScrollPosition!==null) {
      window.scrollTo({
        top: Number(savedScrollPosition),
        behavior: "auto"
      });
    }
    else{
      window.scrollTo({
        top: 0,
        behavior: "auto"
      });
    }

    requestAnimationFrame(() => {
      startArticleObserver();
      checkHeadlineCenter();
      window.addEventListener("scroll",checkHeadlineCenter);
    });
  });
}

restoreListPosition();

const endButton = document.querySelector(".end_button");

endButton.addEventListener(
  "click",
  ()=>{
    endAllArticleExposure();
    endAllCenterExposure();

    const browsingStartTime = Number(
      sessionStorage.getItem(
        "browsingStartTime"
      )
    );

    addLog(
      "browsing_end",
      {
        browsingTime: Date.now() - browsingStartTime
      }
    );

    window.location.href =
      "memory.html";
  }
);

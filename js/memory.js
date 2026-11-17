
const logs = getLogs();

const pattern = JSON.parse(
    sessionStorage.getItem("experimentPattern")
);

// 配列をランダムに並べ替える関数
function shuffle(array) {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

// UIごとに露出した記事を取得
function getVisibleArticles(condition) {

    const visibleIds = logs
        .filter((log) => {
            return (
                log.event === "article_visible" &&
                log.condition === condition
            );
        })
        .map((log) => log.articleId);

    const uniqueIds = [...new Set(visibleIds)];

    return newsData.filter((article) => {
        return uniqueIds.includes(article.id);
    });
}

const listArticles = getVisibleArticles("list");
const singleArticles = getVisibleArticles("single");

console.log("一覧型の露出記事", listArticles);
console.log("単一型の露出記事", singleArticles);


const dummyArticles = [
    {
        id: "dummy01",
        title: "丸山隆平主演ミュージカル『ヘドウィグ・アンド・アングリーインチ』メインビジュアル解禁！音楽チームにスガシカオ参加決定",
        correctAnswer: "unseen"
    },
    {
        id: "dummy02",
        title: "日米豪印「インド太平洋構想」を推進、輸出規制の経済的威圧を懸念…首脳会合の共同文書案",
        correctAnswer: "unseen"
    },
    {
        id: "dummy03",
        title: "トルコとカタール、相互防衛協定に署名　域外からの武力攻撃に共同対処へ",
        correctAnswer: "unseen"
    },
    {
        id: "dummy04",
        title: "ゆうちょのファミマATM、2027年1月から順次終了。年末年始はメガバンクのカードでコンビニATMを使うと1回最大330円",
        correctAnswer: "unseen"
    },
    {
        id: "dummy05",
        title: "西畑大吾×深川麻衣が共演！笑わない弁護士とクローゼットに住む幽霊のロマンティックスリラー『僕と彼女の49日』放送決定",
        correctAnswer: "unseen"
    },
    {
        id: "dummy06",
        title: "「腹筋バッキバキ」引退から10か月…角田夏実の肉体美に釘付け「スタイル抜群」驚異の体幹に仰天",
        correctAnswer: "unseen"
    },
    {
        id: "dummy07",
        title: "米カリフォルニア州司法長官がOpenAIを提訴　AIの制御喪失「80回」の責任を法廷で問う",
        correctAnswer: "unseen"
    },
    {
        id: "dummy08",
        title: "古代エジプトの王女は戦士だった？ 博物館の地下で100年眠っていた骨に武器の訓練の跡か",
        correctAnswer: "unseen"
    },
    {
        id: "dummy09",
        title: "トヨタ「シエンタ」26位→5位急上昇！「次に買いたい車ランキング」にみる「普通の日本人」が直面する厳しすぎる現実",
        correctAnswer: "unseen"
    },
    {
        id: "dummy10",
        title: "家庭料理でおもてなし　加賀屋勤務経験の姉妹、和倉で開業　能登の食材魅力伝える",
        correctAnswer: "unseen"
    },
    {
        id: "dummy11",
        title: "中国、10月の主要経済統計で消費と生産の伸び率が縮小　不動産投資もマイナス幅を広げる",
        correctAnswer: "unseen"
    },
    {
        id: "dummy12",
        title: "冬本番前に暖房チェック　古い灯油を使うと危険",
        correctAnswer: "unseen"
    },
    {
        id: "dummy13",
        title: "ＥＵが日本企業の冷延鋼板に２７・９％の反ダンピング関税",
        correctAnswer: "unseen"
    },
    {
        id: "dummy14",
        title: "横綱大の里「腰の寄せがよかった」８連勝　優勝した先場所と同じ９日目に勝ち越し決めた【大相撲九州場所】",
        correctAnswer: "unseen"
    },
    {
        id: "dummy15",
        title: "オープンソース、ローカルLLMの推論エンジン「llama.cpp」が正式版1.0公開",
        correctAnswer: "unseen"
    },
    {
        id: "dummy16",
        title: "塗装が『ボロボロに剥げた水筒』まだ使えるけど ⇒ そういえば…〝画期的なアイデア〟による大変身に「出た！天才！」「こういうアイデアすごい好き」",
        correctAnswer: "unseen"
    },
    {
        id: "dummy17",
        title: "『陥没乳頭』の手術、保険が使えるのはどんな場合？ 再陥没のリスクと医師選びを医師が解説",
        correctAnswer: "unseen"
    },
    {
        id: "dummy18",
        title: "岩手におでんせ　宿泊費割引キャンペーン　予約受け付けスタート",
        correctAnswer: "unseen"
    },
    {
        id: "dummy19",
        title: "アンソロピック、重大な脆弱性の開示を90日から30日に　OSS利用企業の猶予は3分の1",
        correctAnswer: "unseen"
    },
    {
        id: "dummy20",
        title: "桜庭、五味、ミルコ、ボブ・サップ参戦＆入場コールはレニー・ハート！　『UFC 6』PRIDEエクスパンションの概要が公開",
        correctAnswer: "unseen"
    },
    {
        id: "dummy21",
        title: "【阪神】伏見寅威　４年前はＦＡ移籍＆今オフは残留…明かした決断の決め手「どっちも正解」",
        correctAnswer: "unseen"
    },
    {
        id: "dummy22",
        title: "喫煙率、北日本が上位独占　トップ県で見えた「吸う人が多い理由」",
        correctAnswer: "unseen"
    },
    {
        id: "dummy23",
        title: "ワークマンの「シンホッとするインナー」が今季10万点突破の快進撃！凍える極寒まで乗り切る全品1500円以下の実力派",
        correctAnswer: "unseen"
    },
    {
        id: "dummy24",
        title: "工事に訪れた男性をスコップで殴る 女（38）を逮捕 「逮捕が間違っています」と否認 北海道釧路市",
        correctAnswer: "unseen"
    },
    {
        id: "dummy25",
        title: "韓国の国家試験、首席合格者がAI利用を告白　大学入試前に波紋",
        correctAnswer: "unseen"
    },
    {
        id: "dummy26",
        title: "愛三工業　２次仕入れ先のＣＯ２削減支援　１次サプライヤーと協力",
        correctAnswer: "unseen"
    },
    {
        id: "dummy27",
        title: "九十九里沖のCO2海底貯留、事業者と反対住民が会合で意見表明",
        correctAnswer: "unseen"
    },
    {
        id: "dummy28",
        title: "フェラーリF40を彷彿させる爆発的エネルギー　ノーブルM500 カーボンスポーツ（2）　操縦性はポルシェ911より繊細　価格はマクラーレン級",
        correctAnswer: "unseen"
    },
    {
        id: "dummy29",
        title: "SATOH、エネルギーを凝縮した新曲「Gun」配信リリース",
        correctAnswer: "unseen"
    },
    {
        id: "dummy30",
        title: "「新・ガザからの報告」（142）2026年11月15日ーハマス幹部を狙って病院を空爆―",
        correctAnswer: "unseen"
    },
    {
        id: "dummy31",
        title: "AIキー狙う攻撃AIの自走運用、アマゾンが捕捉　LiteLLMやDifyなど公開基盤が標的に",
        correctAnswer: "unseen"
    },
    {
        id: "dummy32",
        title: "絶賛売り切れ中＝世界最小最軽量のフルサイズカメラ「Sigma FP2」実写レビュー＝中にはゴッソリ新技術が詰まっていた!!",
        correctAnswer: "unseen"
    },
    {
        id: "dummy33",
        title: "「これが噂の…」週末女子ゴルフでまさかの反響　ポーズの本人困惑「なに！？笑」「めっちゃ言われる」",
        correctAnswer: "unseen"
    },
    {
        id: "dummy34",
        title: "コーヒーメーカーの新たな売りは「プラスチック不使用」、マイクロプラスチック懸念で続々新製品",
        correctAnswer: "unseen"
    },
    {
        id: "dummy35",
        title: "名古屋市中心部で焼き鳥店など5軒焼く火事　けが人なし　名古屋・東区",
        correctAnswer: "unseen"
    },
    {
        id: "dummy36",
        title: "「会う人全員に可愛いって言ってもらってます！」　niko and …（ニコアンド）の“モカシンブーツ”が大好評　「スリッポン感覚で履けて楽ちん」「休みはほとんど履いて出かけてます」",
        correctAnswer: "unseen"
    }
];


// 両UIの露出記事数の少ない方に合わせる（上限6件）
const questionCount = Math.min(
    listArticles.length,
    singleArticles.length,
    6
);

// 各UIから同数の記事をランダム抽出
const selectedListArticles = shuffle(listArticles).slice(0, questionCount);
const selectedSingleArticles = shuffle(singleArticles).slice(0, questionCount);

// 提示記事を再認課題用に変換

const seenArticles = [
    ...selectedListArticles.map((article) => ({
        id: article.id,
        title: article.title,
        correctAnswer: "seen",
        targetCondition: "list",
        targetPhase: pattern.findIndex(p => p.ui === "list") + 1,
        targetArticleSet: pattern.find(p => p.ui === "list").set
    })),
    ...selectedSingleArticles.map((article) => ({
        id: article.id,
        title: article.title,
        correctAnswer: "seen",
        targetCondition: "single",
        targetPhase: pattern.findIndex(p => p.ui === "single") + 1,
        targetArticleSet: pattern.find(p => p.ui === "single").set
    }))
];


// 実記事と同数のダミー記事を抽出
const dummyCount = seenArticles.length;

const selectedDummyArticles = shuffle(dummyArticles).slice(0, dummyCount);

if (selectedDummyArticles.length < dummyCount) {
    throw new Error("ダミー記事が不足しています");
}

// 合計24問をランダムに並べ替える
const memoryQuestions = shuffle([
    ...seenArticles,
    ...selectedDummyArticles
]);

console.log("記憶課題の出題記事", memoryQuestions);
console.log("一覧型の出題数", selectedListArticles.length);
console.log("単一型の出題数", selectedSingleArticles.length);
console.log("ダミーの出題数", selectedDummyArticles.length);


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

        
        questions.forEach((question, index) => {

            const selectedAnswer = question.querySelector(
                'input[type="radio"]:checked'
            );

            const article = memoryQuestions[index];

            addLog(
                "recognition_answer",
                article.id,
                {
                    response: selectedAnswer.value,
                    correctAnswer: article.correctAnswer,
                    isCorrect: selectedAnswer.value === article.correctAnswer,
                    targetCondition: article.targetCondition ?? null,
                    targetPhase: article.targetPhase ?? null,
                    targetArticleSet: article.targetArticleSet ?? null,
                    questionOrder: index + 1
                }
            );
        });

        console.log("全問回答済み");

        goToNextStage("questionnaire", "questionnaire.html");
    }
);

window.addEventListener("pageshow", () => {
    checkExperimentStage("memory");
});










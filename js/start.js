import { loginAnonymously } from "./firebase.js";

const startButton = document.getElementById("start_button");

// 4つの実験パターン
const patterns = [
    [
        { ui: "list", set: "A" },
        { ui: "single", set: "B" }
    ],
    [
        { ui: "single", set: "B" },
        { ui: "list", set: "A" }
    ],
    [
        { ui: "list", set: "B" },
        { ui: "single", set: "A" }
    ],
    [
        { ui: "single", set: "A" },
        { ui: "list", set: "B" }
    ]
];

startButton.addEventListener("click", async () => {

    startButton.disabled = true;

    try {
        // ① Firebaseで匿名認証
        const user = await loginAnonymously();
        console.log("認証成功：", user.uid);

        // ② 4パターンからランダムに選択
        const patternId = Math.floor(Math.random() * 4);
        const pattern = patterns[patternId];

        // ③ 実験条件を保存
        sessionStorage.setItem("patternId", String(patternId));
        sessionStorage.setItem("experimentPattern", JSON.stringify(pattern));
        sessionStorage.setItem("phase", "1");
        sessionStorage.setItem("articleSet", pattern[0].set);

        // ④ 実験開始情報を記録
        startExperiment(pattern, patternId);;

        // ⑤ 1回目のニュース画面へ移動
        window.location.replace(pattern[0].ui + ".html");

    } catch (error) {
        console.error("匿名認証に失敗しました：", error);
        alert("通信に失敗しました。もう一度お試しください。");
        startButton.disabled = false;
    }
});

window.addEventListener("pageshow", () => {

    const currentStage =
        sessionStorage.getItem("experimentStage");

    // 実験開始前なら何もしない
    if (currentStage === null) {
        return;
    }

    // 実験開始済みなら現在の実験段階へ移動
    checkExperimentStage("start");
});
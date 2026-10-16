import { loginAnonymously } from "./firebase.js";

const startButton = document.getElementById("start_button");

startButton.addEventListener("click", async () => {

    startButton.disabled = true;

    try {
        // ① Firebaseで匿名認証
        const user = await loginAnonymously();
        console.log("認証成功：", user.uid);

        // ② 実験条件をランダムに決定
        let condition;

        if (Math.random() > 0.5) {
            condition = "list";
        } else {
            condition = "single";
        }

        // ③ 実験開始情報を記録
        startExperiment(condition);

        // ④ ニュース画面へ移動
        if (condition === "list") {
            window.location.href = "list.html";
        } else {
            window.location.href = "single.html";
        }

    } catch (error) {
        console.error("匿名認証に失敗しました：", error);
        alert("通信に失敗しました。もう一度お試しください。");
        startButton.disabled = false;
    }
});
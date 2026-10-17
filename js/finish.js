import { saveExperimentData } from "./firebase.js";

async function submitData() {
    // 保存中の画面を表示
    document.getElementById("saving_message").style.display = "block";
    document.getElementById("finish_message").style.display = "none";
    document.getElementById("error_message").style.display = "none";

    try {
        await saveExperimentData();

        // 保存成功
        document.getElementById("saving_message").style.display = "none";
        document.getElementById("finish_message").style.display = "block";

        console.log("実験データの保存に成功しました");

    } catch (error) {
        // 保存失敗
        console.error("実験データの保存に失敗しました：", error);

        document.getElementById("saving_message").style.display = "none";
        document.getElementById("error_message").style.display = "block";
    }
}

// 再試行ボタンを押したとき
document.getElementById("retry_button").addEventListener("click", submitData);

// ページを開いたときに最初の保存を実行
submitData();
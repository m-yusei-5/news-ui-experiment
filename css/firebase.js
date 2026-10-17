// Firebase本体
import { initializeApp } from
    "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";

// Firebase Authentication
import {
    getAuth,
    signInAnonymously
} from
    "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";

// Firebase Firestore 
import {
    getFirestore,
    doc,
    setDoc,
    serverTimestamp
} from
    "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";


// Firebaseプロジェクトの設定
const firebaseConfig = {
    apiKey: "AIzaSyAMcxJ7m-FnkWAD7oIxwEFgmDS4yi4T_mg",
    authDomain: "news-ui-experiment.firebaseapp.com",
    projectId: "news-ui-experiment",
    storageBucket: "news-ui-experiment.firebasestorage.app",
    messagingSenderId: "137141918081",
    appId: "1:137141918081:web:31bf4f995a10844d1bb080"
};


// Firebaseを初期化
const app = initializeApp(firebaseConfig);


// Authenticationを使用
const auth = getAuth(app);

const db = getFirestore(app);


export async function loginAnonymously() {
    const userCredential = await signInAnonymously(auth);
    return userCredential.user;
}

export async function saveExperimentData() {

    // 認証済みユーザーの情報を取得
    const user = auth.currentUser;

    if (!user) {
        throw new Error("認証されていません");
    }

    // sessionStorageから実験ログを取得
    const logs = JSON.parse(
        sessionStorage.getItem("experimentLogs") || "[]"
    );

    // Firestoreに保存するデータ
    const data = {
        participantId: sessionStorage.getItem("participantId"),
        condition: sessionStorage.getItem("condition"),
        logs: logs,
        submittedAt: serverTimestamp()
    };
    // 保存先を指定
    const documentRef = doc(db, "participants", user.uid);

    // Firestoreに保存
    await setDoc(documentRef, data);
}
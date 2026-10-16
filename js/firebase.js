// Firebase本体
import { initializeApp } from
    "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";

// Firebase Authentication
import {
    getAuth,
    signInAnonymously
} from
    "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";


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


export async function loginAnonymously() {
    const userCredential = await signInAnonymously(auth);
    return userCredential.user;
}
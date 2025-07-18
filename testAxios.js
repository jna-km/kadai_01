import axios from "axios";

axios.defaults.baseURL = "http://web"; // nginxサービス名
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Accept"] = "application/json";

const runTest = async () => {
  try {
    console.log("✅ CSRF Cookie取得中...");
    await axios.get("/sanctum/csrf-cookie");
    console.log("✅ CSRF Cookie取得成功");

    console.log("✅ ログイン実行中...");
    const loginResponse = await axios.post("/api/login", {
      email: "user@example.com",
      password: "password",
    });
    console.log("✅ ログイン成功", loginResponse.status, loginResponse.data);

    const token = loginResponse.data.data.access_token; // ← ここ追加
    console.log("✅ アクセストークン:", token);

    console.log("✅ API呼び出し中...");
    const response = await axios.get("/api/my-reservations", {
      headers: {
        Authorization: `Bearer ${token}`, // ← ここ重要
      },
    });
    console.log("✅ APIレスポンス:");
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error("❌ エラー:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
  }
};

runTest();

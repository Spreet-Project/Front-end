// import sweetAlert from "../utils/sweetAlert";
// import { instance } from "../axios/axios";

// export const postLogin = async (post) => {
//   try {
//     const data = await instance.post("/api/login", post);
//     if (data.data.statusCode === 200) {
//       sweetAlert(1000, "success", "로그인 성공");
//     }
//     return data;
//   } catch (error) {
//     sweetAlert(1000, "error", "로그인 실패");
//   }
// };

// export const postSignup = async (post) => {
//   try {
//     const data = await instance.post("/api/signup", post);
//     sweetAlert(1000, "success", "회원가입 성공");
//     return data;
//   } catch (error) {
//     sweetAlert(1000, "error", "회원가입 실패");
//   }
// };

// export const postLogout = async (post) => {
//   try {
//     const data = await instance.post("/api/logout", post);
//     // sweetAlert(1000, "success", "회원가입 성공");
//     return data;
//   } catch (error) {
//     sweetAlert(1000, "error", "로그아웃 실패");
//   }
// };

// export const postSignout = async (post) => {
//   try {
//     const data = await instance.put("/api/withdrawal", post);
//     sweetAlert(1000, "success", "회원탈퇴 성공");
//     return data;
//   } catch (error) {
//     sweetAlert(1000, "error", "로그아웃 실패");
//   }
// };

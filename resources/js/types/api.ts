export type ApiResponse<T> = {
  data: T;
  // 必要に応じて status, message なども追加
};

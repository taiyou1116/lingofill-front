

/**タイムスタンプから日付に変更 @param timestamp タイムスタンプ */
export function createDate(timestamp: string) {
  const date = new Date(Number(timestamp));
  return date.toLocaleString();
}

export const getFormattedDate = () => {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}_${pad(now.getMonth() + 1)}_${pad(now.getDate())}-${pad(now.getHours())}_${pad(now.getMinutes())}_${pad(now.getSeconds())}`;
};

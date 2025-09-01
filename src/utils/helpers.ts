export const formatDate = (date: Date): string => {
  let d = date.getDate().toString().padStart(2, "0");
  let m = (date.getMonth() + 1).toString().padStart(2, "0");
  let y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

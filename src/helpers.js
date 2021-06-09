export default function debounce(func, delay) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(null, args), delay);
  };
}
export function removeHTMLTags(str) {
  return str.replace(/<[^>]*>?/gm, "");
}

import "./styles.css";

const url =
  "https://script.google.com/macros/s/AKfycbxFlQXkvna9jYamLWhTQ1k3cJItWZDvCYoCmLTcN-CJcr7vZw/exec";

let pageNum = 1;
let isLoading = false;

const container = document.querySelector(".section");

container.onscroll = function () {
  if (isLoading) return;
  if (
    container.scrollHeight - Math.round(container.scrollTop) ===
    container.clientHeight
  ) {
    pageNum = pageNum + 1;
    fetchData();
  }
};

async function fetchData() {
  isLoading = true;
  const loading = document.createElement("div");
  loading.textContent = "loading...";
  container.appendChild(loading);
  try {
    const res = await fetch(`${url}?p=${pageNum}`);
    const response = await res.json();
    container.removeChild(loading);
    response.data.posts.forEach((element) => {
      const para = document.createElement("div");
      para.textContent = element[2];
      container.appendChild(para);
    });
  } catch (e) {
  } finally {
    isLoading = false;
  }
}

window.onload = fetchData();

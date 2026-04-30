let currentQuote = "";

const fallbackQuotes = [
  "Believe in yourself.",
  "Success starts with discipline.",
  "Dream big. Start now.",
  "You are stronger than you think.",
  "Progress is progress, no matter how small.",
  "Stay positive. Great things are coming.",
  "Keep going. Your future self will thank you."
];

/* typing effect */
function typeQuote(text) {
  const el = document.getElementById("quote");
  el.textContent = "";

  let i = 0;

  const timer = setInterval(() => {
    el.textContent = text.slice(0, i + 1);
    i++;

    if (i >= text.length) {
      clearInterval(timer);
    }
  }, 22);
}

/* fetch quote */
async function getQuote(){
  try{
    const res = await fetch("https://api.quotable.io/random?tags=inspirational");
    const data = await res.json();

    currentQuote = `${data.content} — ${data.author}`;
    typeQuote(currentQuote);

  }catch(err){

    currentQuote =
      fallbackQuotes[Math.floor(Math.random()*fallbackQuotes.length)];

    typeQuote(currentQuote);
  }
}

/* save favorite */
function saveFavorite(){
  chrome.storage.local.get(["favorites"], (result) => {
    let favs = result.favorites || [];

    if(!favs.includes(currentQuote)){
      favs.unshift(currentQuote);
      chrome.storage.local.set({favorites:favs}, loadFavorites);
    }
  });
}

/* load favorites */
function loadFavorites(){
  chrome.storage.local.get(["favorites"], (result) => {

    const list = document.getElementById("favorites");
    list.innerHTML = "";

    (result.favorites || []).forEach((quote,index) => {
      const li = document.createElement("li");
      li.textContent = quote;
      list.appendChild(li);
    });
  });
}

/* clear all */
function clearFavorites(){
  chrome.storage.local.set({favorites:[]}, loadFavorites);
}

/* listeners */
document.getElementById("newBtn").addEventListener("click", getQuote);
document.getElementById("saveBtn").addEventListener("click", saveFavorite);
document.getElementById("clearBtn").addEventListener("click", clearFavorites);

/* init */
getQuote();
loadFavorites();
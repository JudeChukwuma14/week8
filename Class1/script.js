const API_KEY = "d46abcdca1d64bdea35995464c67c559";
const API_URL = `https://newsapi.org/v2/everything?q=tesla&from=2024-11-11&sortBy=publishedAt&apiKey=${API_KEY}`;

const fetchNews = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`Failed to fetch new: ${res.status}`);
    const data = await res.json();
    displayNews(data.articles);
  } catch (error) {
    console.log("FROM CATCH:",error.message);
  }
};

const displayNews =(articles)=>{
    const newContainer = document.getElementById("newsContianer");
    newContainer.innerHTML = "";
    articles.forEach((item)=>{
        const newItem = document.createElement("div");
        newItem.classList.add("newItem");
        newItem.innerHTML= `
        <h3>${item.title}</h3>
        <img src='${item.urlToImage}' alt="News Image"/>
        <span>PublishedAt:${new Date(item.publishedAt).toLocaleString()}</span>
        <p>${item.content}</p>
        <a href="${item.url}">Read More.....</a>
        `
        newContainer.appendChild(newItem);
    })
}

fetchNews()
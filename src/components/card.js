import axios from "axios";

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  let html = `<div class="card">
                <div class="headline">${article.headline}</div>
                <div class="author">
                  <div class="img-container">
                    <img src=${article.authorPhoto}>
                  </div>
                  <span>By ${article.authorName}</span>
                </div>
              </div>`;

  let placeholder = document.createElement("div");
  placeholder.insertAdjacentHTML("afterbegin", html);

  let cardEl = placeholder.querySelector(".card")
  cardEl.addEventListener("click", function(){
    console.log(cardEl.querySelector(".headline").textContent);
  })

  return cardEl;
};

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it in Postman/HTTPie!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  axios.get("http://localhost:5000/api/articles").then(res => {
    const articlesArr = Object.values(res.data.articles)

    articlesArr.forEach(arr => {
      arr.forEach(article => {
        document.querySelector(selector).append(Card(article))
      })
    })
  })
};

export { Card, cardAppender };

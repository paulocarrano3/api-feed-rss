/**
 * Renders all the news inside the news-container.
 * @param {{title:string, contentSnippet:string, link:string}[]} news Array of items from the RSS feed.
 */
export function displayNews(news){
    
    // Getting News Container 
    const container = document.getElementById("news-container");
    container.innerHTML = "";

    // For each news item
    news.forEach(item =>{
        // Create corresponding article element
        const article = document.createElement("article");
        article.classList.add("news-item");
        article.innerHTML = `
            <h2>${item.title}</h2>
            <p>${item.contentSnippet}</p>
            <a href="${item.link}" target="_blank">Leia mais</a>
        `;

        // Append it to news container
        container.appendChild(article);
    });
}

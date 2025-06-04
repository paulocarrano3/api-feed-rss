import { API_URL } from "../../Utilities/api-url.js";
import { displayNews } from "../Display/displayNews.js";

/**
 * Requests data from the API, validates it and displays the fetched news on screen.
 * @param {string} topic Topic name.
 */
export async function fetchNews(topic = ''){
    let url = API_URL;

    // If topic is valid
    if (topic){
        // Set url to request
        url = `${API_URL}?topic=${encodeURIComponent(topic)}`;
    }
    try{
        // Request filtered data
        const response = await fetch(url);

        // Validating request and getting JSON.
        if (!response.ok) throw new Error(`Erro: ${response.status}`);
        const data = await response.json();
        const newsArray = Array.isArray(data) ? data : data.items;
        if (!Array.isArray(newsArray)){
            throw new Error("A API nao retornou um array de noticias!");
        }

        // Displaying filtered data on screen
        displayNews(newsArray);
    } catch (error){
        console.error("Erro ao buscar noticias:", error);
    }
}

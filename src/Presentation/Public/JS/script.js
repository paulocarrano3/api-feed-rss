import { fetchNews } from "./Fetch/fetchNews.js";
import { loadTopics } from "./Fetch/loadTopics.js";

// Rendering news and topic buttons.
document.addEventListener("DOMContentLoaded", () =>{
    fetchNews();
    loadTopics();
});

import { fetchNews } from "../Fetch/fetchNews.js";

/**
 * Displays subtopics buttons in the 'subtopics' container.
 * @param {Set<string>} subtopics Array of subtopics.
 * @param {number} selectedTopic Current chosen (filtered) topic.
 */
export function displaySubtopics(subtopics, selectedTopic){
    
    // Getting subtopics container (and clearing it)
    const subtopicsContainer = document.getElementById("subtopics");
    subtopicsContainer.innerHTML = "";
    subtopicsContainer.classList.remove("hidden");

    // For each set of subtopics
    subtopics.forEach(subtopic =>{
        if ((selectedTopic === "sounds" && subtopic === "play") || (subtopic === "articles")) return; // Sounds topic is an exception, and doesn't have subtopics to display.
        
        // Creating subtopic button
        const button = document.createElement("button");
        button.textContent = subtopic;
        button.addEventListener("click", () => fetchNews(subtopic));

        // Adding it to screen
        subtopicsContainer.appendChild(button);
    });
}

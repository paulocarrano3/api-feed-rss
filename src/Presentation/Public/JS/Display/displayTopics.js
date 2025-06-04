import { fetchNews } from "../Fetch/fetchNews.js";
import { displaySubtopics } from "./displaySubtopics.js";

/**
 * Current (chosen) topic name.
 */
let selectedTopic = '';

/**
 * Displays all topics and subtopics buttons.
 * @param {Map<string,Set<string>>} topics Map with topics as keys and a set of subtopics as values.
 */
export function displayTopics(topics){
    
    // Getting topics button container
    const topicsContainer = document.getElementById("topics");
    topicsContainer.innerHTML = "";
    
    // For each topic
    topics.forEach((subtopics, topic) =>{
        
        // Creating button
        const button = document.createElement("button");
        button.textContent = topic;
        // Adding click event
        button.addEventListener("click", () =>{
            selectedTopic = topic; //setting current topic
            fetchNews(topic); // request, validate and display topics
            displaySubtopics(subtopics, selectedTopic); //display subtopics
        });
        // Adding button to screen
        topicsContainer.appendChild(button);
    });
}

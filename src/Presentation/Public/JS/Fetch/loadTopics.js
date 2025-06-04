import { API_URL } from "../../Utilities/api-url.js";
import { displayTopics } from "../Display/displayTopics.js";

/**
 * Loads data from the API, extracts topics and subtopics, and renders it on screen.
 */
export async function loadTopics(){
    try{

        // Loading data from the API
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Erro: ${response.status}`); // Error fetching data
        const data = await response.json(); // Converting to JSON
        if (!data.items || !Array.isArray(data.items)){ // Assuring data contains an items array property
            throw new Error("A API nao retornou um array de noticias!");
        }

        // Extracting topics and subtopics
        const topics = new Map();
        data.items.forEach(item =>{
            try{
                const url = new URL(item.link);
                const segments = url.pathname.split('/').filter(Boolean); // Getting segments (separated by '/')
                
                // If URL contains subtopics (number of segments > 2: first is the main topic, the rest are subtopics)
                if (segments.length >= 2 && isNaN(segments[1])){
                    const mainTopic = segments[0];
                    const subTopic = segments[1];
                    
                    // Registering on Map
                    if (!topics.has(mainTopic)){
                        topics.set(mainTopic, new Set());
                    }
                    topics.get(mainTopic).add(subTopic);
                } 
                // If there are no subtopics.
                else if (segments.length >= 1 && isNaN(segments[0])){
                    topics.set(segments[0], new Set());
                }
            } catch (e){
                console.warn("Erro ao processar link:", item.link);
            }
        });

        // Rendering topics.
        displayTopics(topics);
    } catch (error){
        console.error("Erro ao carregar temas:", error);
    }
}

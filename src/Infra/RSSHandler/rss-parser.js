import RSSParser from "rss-parser"

import IRSSHandler from "../../Domain/Interfaces/IRSSHandler.js";

/**
 * RSS Handler that makes use of the rss-parser package.
 */
export default class RSS_Parser extends IRSSHandler
{
    constructor()
    {
        super();
        this.parser = new RSSParser(); 
    }

    async parseUrl(url)
    {
        return await this.parser.parseURL(url);
    }
}
import IService from "../Interfaces/IService.js";

/**
 * Gets RSS Feed Directly from BBC.
 */
export default class GetFeedBBCService extends IService
{
    constructor(RSSHandler)
    {
        super();
        this.RSSHandler = RSSHandler;
    }

    async execute()
    {
        return await this.RSSHandler.parseUrl('http://feeds.bbci.co.uk/news/rss.xml');
    }

}
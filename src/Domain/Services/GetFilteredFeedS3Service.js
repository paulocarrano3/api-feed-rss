import IService from "../Interfaces/IService.js";

/**
 * Gets data from the S3 Bucket and filters it according to a provided topic.
 */
export default class GetFilteredFeedS3Service extends IService
{
    constructor(getFeedS3Service)
    {
        super();
        this.getFeedS3Service = getFeedS3Service;
    }

    async execute(topic)
    {
        let response = await this.getFeedS3Service.execute();
        if(topic !== undefined)
        {
            response = response.items.filter(
            (item)=>
            {
                return item.link.includes(`/${topic}/`);
            });
        }
        return response;
    }

}


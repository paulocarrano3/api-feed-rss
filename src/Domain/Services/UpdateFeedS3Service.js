import IService from "../Interfaces/IService.js";

/**
 * Updates the S3 Bucket with data from BBC. Also exposes that on the log.
 */
export default class UpdateFeedS3Service extends IService
{
    constructor(getFeedBBCService, s3Repository)
    {
        super();
        this.getFeedBBCService = getFeedBBCService;
        this.s3Repository = s3Repository;
    }

    async execute()
    {
        const feed = await this.getFeedBBCService.execute();
        await this.s3Repository.putObject(feed);
        console.log(`[${new Date().toLocaleTimeString()}] S3 Bucket Updated`);
    }

}


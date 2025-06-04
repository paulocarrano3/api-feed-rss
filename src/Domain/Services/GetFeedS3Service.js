import IService from "../Interfaces/IService.js";

/**
 * Gets data directly from the S3 Bucket.
 */
export default class GetFeedS3Service extends IService
{
    constructor(S3Repository)
    {
        super();
        this.S3Repository = S3Repository;
    }

    async execute()
    {
        return await this.S3Repository.getObject();
    }

}


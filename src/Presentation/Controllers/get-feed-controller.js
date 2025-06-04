import GetFeedS3Service from "../../Domain/Services/GetFeedS3Service.js";
import GetFilteredFeedS3Service from "../../Domain/Services/GetFilteredFeedS3Service.js";
import S3Repository from "../../Infra/Repository/S3Repository.js";

/**
 * Handles a request to get a JSON object with content from the RSS feed.
 */
export default async function getFeedController(req, res)
{
    try
    {
        const s3Repo = new S3Repository();
        const getFeedS3Service = new GetFeedS3Service(s3Repo);
        const getFilteredFeedS3Service = new GetFilteredFeedS3Service(getFeedS3Service);

        const {topic} = req.query;
        let response = await getFilteredFeedS3Service.execute(topic);

        res.status(200).send(response);
    }catch(error)
    {
        console.error(error);
        res.status(400).send({msg: 'an error ocurred'});
    }
}
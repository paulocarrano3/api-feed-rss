import * as dotenv from 'dotenv';
import Express from 'express';
import router from './router.js';
import UpdateFeedS3Service from './src/Domain/Services/UpdateFeedS3Service.js';
import GetFeedBBCService from './src/Domain/Services/GetFeedBBCService.js';
import RSS_Parser from './src/Infra/RSSHandler/rss-parser.js';
import S3Repository from './src/Infra/Repository/S3Repository.js';
import * as fs from 'fs';

// Setting Dotenv for Accessing Environment Variables
dotenv.config();

// Creating Express App
const app = new Express();

// Setting Middleware
app.use('/', Express.static('./src/Presentation/Public'));
app.use(router);
app.use(Express.json());

// Updating Utilities
fs.writeFileSync(`src/Presentation/Public/Utilities/api-url.js`, `export const API_URL = '${process.env.URL_SITE}';`);

// Updating BBC Feed
const rssParser = new RSS_Parser();
const getFeedBBCService = new GetFeedBBCService(rssParser);
const s3Repo = new S3Repository();
const updateFeedS3Service = new UpdateFeedS3Service(getFeedBBCService, s3Repo);

setInterval(async () => updateFeedS3Service.execute(), process.env.UPDATE_TIME ?? 120000);

// Listening on Server Port
app.listen(process.env.PORT, '0.0.0.0', ()=>
    {
        console.log(`Server running on port ${process.env.PORT}`);
    });
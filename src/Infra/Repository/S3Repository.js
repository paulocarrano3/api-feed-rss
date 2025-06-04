import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import * as dotenv from "dotenv";

dotenv.config();
/**
 * Accesses the JSON data stored in the S3 Bucket. Requires properly set environment variables.
 */
class S3Repository {
    constructor() {
        this.s3Client = new S3Client({ 
            region: process.env.REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                sessionToken: process.env.AWS_SESSION_TOKEN,
            }
        });

        this.bucketName = process.env.BUCKET_NAME;
        this.key = process.env.KEY;
    }

    async putObject(data) {
        try {
            const command = new PutObjectCommand({
                Bucket: this.bucketName,
                Key: this.key,
                Body: JSON.stringify(data),
                ContentType: "application/json",
            });
            await this.s3Client.send(command);
        } catch (error) {
            console.error("Error:", error);
            throw new Error(`Error: ${error.message}`);
        }
    }

    async getObject() {
        try {
            const command = new GetObjectCommand({
                Bucket: this.bucketName,
                Key: this.key,
            });

            const data = await this.s3Client.send(command);
            const content = await data.Body.transformToString("utf-8");
            return JSON.parse(content);
        } catch (error) {
            console.error("Error:", error);
            throw new Error(`Error: ${error.message}`);
        }
    }
}

export default S3Repository;
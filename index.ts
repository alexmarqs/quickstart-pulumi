import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as fs from "fs";

// Create an AWS resource (S3 Bucket) + serve index.html as a static website
const bucket = new aws.s3.Bucket("my-bucket", {
  website: {
    indexDocument: "index.html",
  },
});

// Add site to S3 Bucket + ACL configs
const bucketObject = new aws.s3.BucketObject("index.html", {
  acl: "public-read",
  contentType: "text/html",
  bucket: bucket,
  content: fs.readFileSync("site/index.html").toString(),
});

// Export the name of the bucket
export const bucketName = bucket.id;

// Export the URL website
export const bucketEndpoint = pulumi.interpolate`http://${bucket.websiteEndpoint}`;

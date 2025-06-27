import { Construct } from "constructs";
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Deployment from 'aws-cdk-lib/aws-s3-deployment'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';


interface StaticWebsiteProps {
bucket?: s3.Bucket;
websiteFolder: string ;

}
export class StaticWebsite extends Construct {
    constructor(scope: Construct, id: string, props: StaticWebsiteProps) {
        super(scope, id);

        const {bucket: bucketProp, websiteFolder} = props;

        let bucket: s3.Bucket;

        if (!bucketProp) {
            bucket = new s3.Bucket(this, 'Bucket', {
                blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            })
        } else {

            bucket = bucketProp
        }


    const distribution = new cloudfront.Distribution(this, 'Distribution', {
  defaultBehavior: {
    origin: origins.S3BucketOrigin.withOriginAccessControl(bucket),
    viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
    cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD,
    cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
    originRequestPolicy: cloudfront.OriginRequestPolicy.CORS_S3_ORIGIN,
    responseHeadersPolicy: cloudfront.ResponseHeadersPolicy.SECURITY_HEADERS
  },
    httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
    priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
    defaultRootObject: 'index.html'  
    });

     const deployment = new s3Deployment.BucketDeployment(this, 'BucketDeployment', {
      sources: [s3Deployment.Source.asset('./src/web')],
      destinationBucket: bucket,
      distribution,
    });
      
}
}
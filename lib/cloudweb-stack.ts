import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StaticWebsite } from './static-website';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CloudwebStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new StaticWebsite(this, 'StaticWebSite', {
      websiteFolder: './src/web',
    });
  }
}

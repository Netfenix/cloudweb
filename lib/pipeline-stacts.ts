import { Duration, pipelines, Stack, StackProps } from "aws-cdk-lib";


export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
      synth: new pipelines.CodePipelineSource.connection('Netfenix1357/static-web', 'main', {
        connectionArn: 'arn:aws:codeconnections:eu-west-1:388857980884:connection/36562b65-e3dd-4f53-b430-d43c6b412d35',
      }),
      commands: ['npm ci', 'npm run build', 'npx cdk synth'],
    });
    
    const cloudWebAwsStage = new CloudWebAwsStage(this, 'CloudWebAwsStage');
        pipeline.addStage(cloudWebAwsStage, {
            pre: [new pipelines.ManualApprovalStep('ManualApproval')]
        });
   
  }
}

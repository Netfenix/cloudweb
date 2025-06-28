
export class CloudWebAwsStage extends Stage{
    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);
    
new CloudWebAwsStack(this, ' CloudWebAwsStack');
  }
}
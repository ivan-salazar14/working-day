import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import * as path from 'path';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

   // Lambda function
    const businessDateLambda = new lambda.Function(this, 'BusinessDateFunction', {
      runtime: lambda.Runtime.NODEJS_22_X,
      code: lambda.Code.fromAsset(path.join(__dirname, '../../'), {
        bundling: {
          image: lambda.Runtime.NODEJS_22_X.bundlingImage,
          command: [
            'bash', '-c',
             'npm install pnpm --no-save --cache /tmp/.npm && ./node_modules/.bin/pnpm install --cache /tmp/.pnpm --no-frozen-lockfile  && ./node_modules/.bin/pnpm run build && cp -r dist/* /asset-output/ && cp package.json /asset-output/'
          ],
          environment: {
            CI: 'true'
          }
        },
      }),
      handler: 'dist/index.handler',
      environment: {
        NODE_ENV: 'production',
      },
    });

    // API Gateway
    const api = new apigateway.RestApi(this, 'BusinessDateApi', {
      restApiName: 'business-date-api',
    });

    const integration = new apigateway.LambdaIntegration(businessDateLambda);
    api.root.addResource('api').addResource('calculate').addMethod('GET', integration);
  }
}
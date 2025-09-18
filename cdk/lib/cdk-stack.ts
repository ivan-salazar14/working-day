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
        exclude: [
          '.git',
          '*.log',
          'cdk',
          'test',
          '.env',
          'src',
          'tsconfig.json',
          '*.md',
          '.gitignore',
          'node_modules/.pnpm',
          'node_modules/**/test*/**',
          'node_modules/**/example*/**',
          'node_modules/**/doc*/**',
          'node_modules/**/*.test.*',
          'node_modules/**/*.spec.*',
          'node_modules/**/*.md',
          'node_modules/**/README*',
          'node_modules/**/CHANGELOG*',
          'node_modules/**/LICENSE*',
          'node_modules/**/.*',
          'node_modules/**/src/**',
          'node_modules/**/lib/**',
          'node_modules/**/dist/**'
        ],
        bundling: {
          image: lambda.Runtime.NODEJS_22_X.bundlingImage,
          command: [
            'bash', '-c',
             'cp -r dist /asset-output/ && cp package.json /asset-output/ && cp -r node_modules /asset-output/'
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
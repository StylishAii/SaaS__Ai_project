import * as cdk from 'aws-cdk-lib';
import { SSTConfig } from 'sst';
import { Bucket, NextjsSite } from 'sst/constructs';

export default {
  config(_input) {
    return {
      name: 'ai-saas',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const bucket = new Bucket(stack, 'images', {
        cors: [
          {
            maxAge: '60 second',
            allowedOrigins: ['*'],
            allowedHeaders: ['*'],
            allowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
          },
        ],
        cdk: {
          bucket: {
            autoDeleteObjects: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
          },
        },
      });

      const site = new NextjsSite(stack, 'site', { bind: [bucket] });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;

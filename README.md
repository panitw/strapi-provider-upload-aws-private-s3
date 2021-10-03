# strapi-provider-upload-aws-s3-private

## Purpose of this package

This package is copied and modified from https://github.com/strapi/strapi/tree/master/packages/strapi-provider-upload-aws-s3 which works great but it forces you to use public S3 bucket. My team needs to upload the content to private S3 bucket with the custom base URL for content access later.

## Configurations

Your configuration is passed down to the provider. (e.g: `new AWS.S3(config)`). You can see the complete list of options [here](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property)

See the [using a provider](https://strapi.io/documentation/developer-docs/latest/development/plugins/upload.html#using-a-provider) documentation for information on installing and using a provider. And see the [environment variables](https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#environment-variables) for setting and using environment variables in your configs.

**Example**

`./config/plugins.js`

```js
module.exports = ({ env }) => ({
  // ...
  upload: {
    provider: 'aws-s3-private',
    providerOptions: {
      baseUrl: env('BASE_URL'), //Base url to be set as the file.url
      path: env('AWS_S3_PATH'), //S3 path under the bucket. It'll be appened to to the baseUrl to generate final url
      accessKeyId: env('AWS_ACCESS_KEY_ID'),
      secretAccessKey: env('AWS_ACCESS_SECRET'),
      region: env('AWS_REGION'),
      params: {
        Bucket: env('AWS_BUCKET'),
      },
    },
  },
  // ...
});
```

## Required AWS Policy Actions
These are the minimum amount of permissions needed for this provider to work. 
```
"Action": [
  "s3:PutObject",
  "s3:GetObject",
  "s3:ListBucket",
  "s3:DeleteObject",
  "s3:PutObjectAcl"
],
```

## Resources

- [License](LICENSE)

## Links

- [Strapi website](https://strapi.io/)
- [Strapi community on Slack](https://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
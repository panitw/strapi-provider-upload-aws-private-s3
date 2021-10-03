'use strict';

const AWS = require('aws-sdk');

module.exports = {
    init(config) {

        const S3 = new AWS.S3({
            apiVersion: '2006-03-01',
            ...config,
        });

        const createFileUrl = (s3Key) => {
            return `${config.baseUrl}/${s3Key}`;
        }

        return {
            upload(file, customParams = {}) {
                return new Promise((resolve, reject) => {
                    // upload file on S3 bucket
                    const path = file.path ? `${file.path}/` : '';
                    const key = `${config.path}/${path}${file.hash}${file.ext}`;
                    S3.upload(
                        {
                            Key: key,
                            Body: Buffer.from(file.buffer, 'binary'),
                            ContentType: file.mime,
                            ...customParams,
                        },
                        (err) => {
                            if (err) {
                                return reject(err);
                            }
                            // set the bucket file url
                            file.url = createFileUrl(key);
                            resolve();
                        }
                    );
                });
            },
            delete(file, customParams = {}) {
                return new Promise((resolve, reject) => {
                    // delete file on S3 bucket
                    const path = file.path ? `${file.path}/` : '';
                    S3.deleteObject(
                        {
                            Key: `${path}${file.hash}${file.ext}`,
                            ...customParams,
                        },
                        (err, data) => {
                            if (err) {
                                return reject(err);
                            }

                            resolve();
                        }
                    );
                });
            },
        };
    },
};
'use strict';

const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
let dynamo = new AWS.DynamoDB.DocumentClient();

function removeDataFromTable(name) {
    const params = {
        Key: {
            name: name
        },
        TableName: process.env.ORANGE_THEORY_MEMBERSHIP_TABLE
    }

    return dynamo
        .delete(params)
        .promise();
};

module.exports = {
    removeDataFromTable
};
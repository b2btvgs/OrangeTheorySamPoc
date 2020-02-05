'use strict';

const AWS = require('aws-sdk');

let dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.saveItem = async params => {
    console.log('actual dynamoDBManager.saveItem initiated');
    return dynamo.put(params).promise().then(() => {
        return params;
    });
};

module.exports.getItem = async params => {
    return dynamo.get(params).promise().then(result => {
        console.log(result);
        return result.Item;
    });
};

module.exports.deleteItem = async params => {
    return dynamo.delete(params).promise().then(result => {
        console.log(result);
        return result.Item;
    });
};
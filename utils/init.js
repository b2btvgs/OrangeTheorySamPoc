'use strict';

const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';

function init() {
    process.env.TABLE_NAME = 'OrangeTheoryMembership';
    process.env.BASE_URL = 'https://jlfftq0h56.execute-api.us-east-1.amazonaws.com/dev/';
}

module.exports = init;
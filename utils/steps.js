'use strict';

const APP_ROOT = '../source/';
const _ = require('lodash');

function viaHandler(event, functionName) {
    const handler = require(`${APP_ROOT}/handler`);
    var context = {};
    var callback = function (err, response) {
        if (err) {
            reject(err);
        } else {
            let contentType = _.get(
                response,
                'headers.Content-Type',
                'application/json'
            );
            if (response.body && contentType === 'application/json') {
                response.body = JSON.parse(response.body);
            }

            resolve(response);
        }
    };
    return handler[functionName](event, context, callback);
}

let invokeAddOTMember = params => {
    let event = {
        body: params
    };
    return viaHandler(event, 'addOTMember');
};

let invokeUpdateOTMember = params => {
    let event = {
        body: params
    };
    return viaHandler(event, 'updateOTMember');
};

let invokeGetOTMember = params => {
    console.log('invokeGetOTMember params is: ' + params);
    let event = {
        pathParameters: {
            memberId: params
        }
    };
    return viaHandler(event, 'getOTMember');
};

let invokeDeleteOTMember = params => {
    console.log('invokeDeleteOTMember params is: ' + params);
    let event = {
        pathParameters: {
            memberId: params
        }
    };
    return viaHandler(event, 'deleteOTMember');
};

module.exports = {
    invokeAddOTMember,
    invokeUpdateOTMember,
    invokeGetOTMember,
    invokeDeleteOTMember
}
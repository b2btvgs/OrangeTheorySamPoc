'use strict';

const uuid = require('uuid');

const dynamoDBManager = require('./dynamoDBManager');
const responseManager = require('./responseManager');

// const TABLE_NAME = process.env.TABLE_NAME;
const TABLE_NAME = 'OrangeTheoryMembership';

const listItems = async params => {
    return dynamo.get(params).promise().then(result => {
        console.log(result);
        return result.Item;
    });
};

module.exports.addOTMember = async (event) => {
    console.log('addOTMember initiated');
    console.log('table name is: ' + TABLE_NAME);

    const memberProfile = JSON.parse(event.body);
    memberProfile.memberId = uuid.v1();
    memberProfile.sortKey = 'MEMBER';
    memberProfile.state_city = memberProfile.state + '_' + memberProfile.city;
    memberProfile.joinedDate = Date.now();
    const tableParams = {
        TableName: TABLE_NAME,
        Item: memberProfile
    }
    const result = await dynamoDBManager.saveItem(tableParams);

    try {
        await dynamoDBManager.saveItem(tableParams);
        return responseManager.success(tableParams);
    } catch (e) {
        return responseManager.failure({ status: false });
    }
}

module.exports.getOTMember = async (event) => {
    console.log('getOTMember initiated');

    const memberId = event.pathParameters.memberId;
    console.log('memberId pmm is: ' + memberId);
    const sortKey = 'MEMBER';

    const tableParams = {
        Key: {
            memberId: memberId,
            sortKey: sortKey,
        },
        TableName: TABLE_NAME
    };

    console.log('tableParams is: ' + JSON.stringify(tableParams));

    try {
        const result = await dynamoDBManager.getItem(tableParams);
        return responseManager.success(result);
    } catch (e) {
        return responseManager.failure({ status: false });
    }
}

module.exports.updateOTMember = async (event) => {
    console.log('updateOTMember initiated');

    const memberProfile = JSON.parse(event.body);
    memberProfile.state_city = memberProfile.state + '_' + memberProfile.city;
    memberProfile.lastUpdateDate = Date.now();
    const tableParams = {
        TableName: TABLE_NAME,
        Item: memberProfile
    }

    try {
        console.log('invoking dynamoDBManager.saveItem');
        const result = await dynamoDBManager.saveItem(tableParams);

        return responseManager.success(result.Item);
        // return responseManager.success(result);
    } catch (e) {
        return responseManager.failure({ status: false });
    }
}

module.exports.deleteOTMember = async (event) => {
    console.log('deleteOTMember initiated');

    const memberId = event.pathParameters.memberId;
    console.log('memberId pmm is: ' + memberId);
    const sortKey = 'MEMBER';

    const tableParams = {
        Key: {
            memberId: memberId,
            sortKey: sortKey,
        },
        TableName: TABLE_NAME
    };

    console.log('tableParams is: ' + JSON.stringify(tableParams));

    const result = await dynamoDBManager.deleteItem(tableParams);

    try {
        const result = await dynamoDBManager.deleteItem(tableParams);
        return responseManager.success(result);
    } catch (e) {
        return responseManager.failure({ status: false });
    }
}

module.exports.listOTMembers = async (event) => {
    console.log('listOTMembers initiated');

    // const memberId = event.pathParameters.memberId;
    // console.log('memberId pmm is: ' + memberId);
    const sortKey = 'MEMBER';

    const tableParams = {
        Key: {
            sortKey: sortKey,
        },
        TableName: TABLE_NAME
    };

    console.log('tableParams is: ' + JSON.stringify(tableParams));

    const result = await listItems(tableParams);

    return {
        statusCode: 200,
        body: JSON.stringify(result),
        headers: {}
    }
}

const AWS = require('aws-sdk');
const uuid = require('uuid');

let dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;

const saveItem = async params => {
    return dynamo.put(params).promise().then(() => {
        return params;
    });
};

const getItem = async params => {
    return dynamo.get(params).promise().then(result => {
        console.log(result);
        return result.Item;
    });
};

const deleteItem = async params => {
    return dynamo.delete(params).promise().then(result => {
        console.log(result);
        return result.Item;
    });
};

const listItems = async params => {
    return dynamo.get(params).promise().then(result => {
        console.log(result);
        return result.Item;
    });
};

module.exports.addOTMember = async (event) => {
    console.log('addOTMember initiated');

    const memberProfile = JSON.parse(event.body);
    memberProfile.memberId = uuid.v1();
    memberProfile.sortKey = 'MEMBER';
    memberProfile.state_city = memberProfile.state + '_' + memberProfile.city;
    memberProfile.joinedDate = Date.now();
    const tableParams = {
        TableName: TABLE_NAME,
        Item: memberProfile
    }
    const result = await saveItem(tableParams);

    return {
        statusCode: 200,
        body: JSON.stringify(result),
        headers: {}
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

    const result = await getItem(tableParams);

    return {
        statusCode: 200,
        body: JSON.stringify(result),
        headers: {}
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
    const result = await saveItem(tableParams);

    return {
        statusCode: 200,
        body: JSON.stringify(result),
        headers: {}
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

    const result = await deleteItem(tableParams);

    return {
        statusCode: 200,
        body: JSON.stringify(result),
        headers: {}
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
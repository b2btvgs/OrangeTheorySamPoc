'use strict';

const init = require('../utils/init');
const handler = require('../source/handler');
const dynamoDBManagerMock = require('../source/dynamoDBManager');
const dynamoDBManager = require('../source/dynamoDBManager');
const steps = require('../utils/steps');

const createParams = {
    "firstName": "Fred",
    "lastName": "Smith",
    "address": "401 BrownThrush Rd",
    "city": "Minneapolis",
    "state": "Minnesota",
    "zipCode": "50405",
    "phone": "6516784956",
    "email": "jsmith@acmelogistics.com"
};

const updateParams = {
    "firstName": "Fred",
    "lastName": "Smith",
    "address": "401 BrownThrush Rd",
    "city": "Minneapolis",
    "state": "Minnesota",
    "zipCode": "50405",
    "phone": "6516784956",
    "email": "jsmith@acmelogistics.com",
    "memberId": "23f7a080-47c2-11ea-9f57-d7a23a2d8a6e",
    "sortKey": "MEMBER",
    "state_city": "Minnesota_Minneapolis",
    "joinedDate": 1580870974088
};

const mockUpdateResponse = {
    "TableName": "OrangeTheoryMembership",
    "Item": {
        "firstName": "Fred",
        "lastName": "Smith",
        "address": "401 BrownThrush Rd",
        "city": "Minneapolis",
        "state": "Minnesota",
        "zipCode": "50405",
        "phone": "6516784956",
        "email": "jsmith@acmelogistics.com",
        "memberId": "23f7a080-47c2-11ea-9f57-d7a23a2d8a6e",
        "sortKey": "MEMBER",
        "state_city": "Minnesota_Minneapolis",
        "joinedDate": 1580870974088,
        "lastUpdateDate": 1580919041570
    }
}

const mockDeleteResponse = {};

describe('Invoke the handler.addOTMember function', () => {

    test('calling addOTMember should call the dynamoDBManager.saveItem function', async () => {
        dynamoDBManagerMock.saveItem = jest.fn();
        var result = await steps.invokeAddOTMember(JSON.stringify(createParams));
        expect(dynamoDBManagerMock.saveItem).toBeCalledTimes(2);
    });

    test('calling addOTMember() should create & return a new memberId', async () => {
        dynamoDBManagerMock.saveItem = jest.fn();
        expect(createParams.memberId).toBe(undefined);
        var result = await steps.invokeAddOTMember(JSON.stringify(createParams));
        expect(result.statusCode).toBe(200);
        expect(result.body).not.toBe(null);
        expect(result.body).not.toBe(undefined);
        const body = JSON.parse(result.body);
        expect(body.TableName).toBe('OrangeTheoryMembership');
        expect(body.Item.memberId).not.toBe(undefined);
        expect(body.Item.memberId.length).toBeGreaterThan(0);
    });
})

describe('Invoke the handler.updateOTMember function', () => {

    test('calling updateOTMember should call the dynamoDBManager.saveItem function', async () => {

        dynamoDBManagerMock.saveItem = jest.fn();
        dynamoDBManagerMock.saveItem.mockReturnValue(mockUpdateResponse);
        const result = await steps.invokeUpdateOTMember(JSON.stringify(updateParams));
        expect(result.statusCode).toBe(200);
        expect(dynamoDBManagerMock.saveItem).toBeCalledTimes(1);
    });

    test('calling updateOTMember() should update & return a member', async () => {
        dynamoDBManagerMock.saveItem = jest.fn();
        dynamoDBManagerMock.saveItem.mockReturnValue(mockUpdateResponse);
        expect(updateParams.memberId).not.toBe(undefined);
        expect(dynamoDBManagerMock.saveItem(updateParams)).toBe(mockUpdateResponse);
        var result = await steps.invokeUpdateOTMember(JSON.stringify(updateParams));
        const body = JSON.parse(result.body);
        expect(result.statusCode).toBe(200);
        expect(body).not.toBe(null);
        expect(body).not.toBe(undefined);
        expect(body.memberId).not.toBe(undefined);
        expect(body.firstName).toBe(mockUpdateResponse.Item.firstName);
        expect(body.lastName).toBe(mockUpdateResponse.Item.lastName);
        expect(body.lastUpdateDate).toBe(mockUpdateResponse.Item.lastUpdateDate);

    });
})

describe('Invoke the handler.getOTMember function', () => {

    test('calling getOTMember should call the dynamoDBManager.getItem function', async () => {
        dynamoDBManagerMock.getItem = jest.fn();
        dynamoDBManagerMock.getItem.mockReturnValue(mockUpdateResponse);
        const result = await steps.invokeGetOTMember(updateParams.memberId);
        expect(result.statusCode).toBe(200);
        expect(dynamoDBManagerMock.getItem).toBeCalledTimes(1);
    });

    test('calling getOTMember() should return a member', async () => {
        dynamoDBManagerMock.getItem = jest.fn();
        dynamoDBManagerMock.getItem.mockReturnValue(mockUpdateResponse);
        expect(updateParams.memberId).not.toBe(undefined);
        expect(dynamoDBManagerMock.getItem(updateParams)).toBe(mockUpdateResponse);
        const result = await steps.invokeGetOTMember(updateParams.memberId);
        const body = JSON.parse(result.body);
        expect(result.statusCode).toBe(200);
        expect(body).not.toBe(null);
        expect(body).not.toBe(undefined);
        expect(body.Item.memberId).not.toBe(undefined);
        expect(body.Item.firstName).toBe(mockUpdateResponse.Item.firstName);
        expect(body.Item.lastName).toBe(mockUpdateResponse.Item.lastName);
        expect(body.Item.lastUpdateDate).toBe(mockUpdateResponse.Item.lastUpdateDate);
    });
})

describe('Invoke the handler.deleteOTMember function', () => {

    test('calling deleteOTMember should call the dynamoDBManager.deleteItem function', async () => {
        dynamoDBManagerMock.deleteItem = jest.fn();
        dynamoDBManagerMock.deleteItem.mockReturnValue(mockUpdateResponse);
        const result = await steps.invokeDeleteOTMember(updateParams.memberId);
        expect(result.statusCode).toBe(200);
        expect(dynamoDBManagerMock.deleteItem).toBeCalledTimes(2);
    });

    test('calling getOTMember() should return a member', async () => {
        dynamoDBManagerMock.deleteItem = jest.fn();
        dynamoDBManagerMock.deleteItem.mockReturnValue(mockDeleteResponse);
        expect(updateParams.memberId).not.toBe(undefined);
        const result = await steps.invokeDeleteOTMember(updateParams.memberId);
        const body = JSON.parse(result.body);
        expect(result.statusCode).toBe(200);
        expect(body).not.toBe(null);
        expect(body).not.toBe(undefined);
        expect(body).toMatchObject(mockDeleteResponse);
    });
})
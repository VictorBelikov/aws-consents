'use strict';
// const { DynamoDB } = require('aws-sdk');

module.exports.saveInDb = async (event) => {
  const documentClient = new DynamoDB.DocumentClient();
  const TABLE_BY = 'country-by-test';
  const TABLE_UA = 'country-ua-test';

  exports.handler = async (event) => {
    try {
      const { phoneNumber, countryCode } = JSON.parse(event.body);
      const uuid = Date.now().toString();
      const channelType = 'SMS';
      const createdAt = new Date().toLocaleDateString();
      let tableDB;

      if (countryCode.toUpperCase() === 'BY') {
        tableDB = TABLE_BY;
      } else if (countryCode.toUpperCase() === 'UA') {
        tableDB = TABLE_UA;
      }

      const consent = {
        TableName: tableDB,
        Item: { uuid, channelType, channelValue: phoneNumber, countryCode: countryCode.toUpperCase(), createdAt },
      };

      await documentClient.put(consent).promise();

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Saved!', orderNumber: orderId }),
        headers: { 'Access-Control-Allow-Origin': '*' },
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: err }),
        headers: { 'Access-Control-Allow-Origin': '*' },
      };
    }
  };
};

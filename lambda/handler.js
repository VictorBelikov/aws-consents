'use strict';

module.exports.saveInDb = async (event) => {
  const { DynamoDB } = require('aws-sdk');
  const documentClient = new DynamoDB.DocumentClient();
  const TABLE_BY = 'country-by-test';
  const TABLE_UA = 'country-ua-test';

  try {
    const { phoneNumber, countryCode } = JSON.parse(event.body);
    const uuid = Date.now().toString();
    const channelType = 'SMS';
    const createdAt = new Date().toLocaleDateString();
    const tableDB = countryCode === 'BY' ? TABLE_BY : TABLE_UA;

    const consent = {
      TableName: tableDB,
      Item: { uuid, channelType, channelValue: phoneNumber, countryCode: countryCode, createdAt },
    };

    await documentClient.put(consent).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Saved!', consentId: uuid }),
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

module.exports.notifyUser = async (event) => {
  console.log(event);
  const { SNS } = require('aws-sdk');
  const sns = new SNS();

  const record = event.Records[0];
  const topicArn = 'arn:aws:sns:us-east-1:658561848756:notifyUser';
  const region = record.eventSourceARN.includes('country-by-test') ? 'BY' : 'UA';

  if (record.eventName === 'INSERT') {
    await sns
      .publish({
        Message: 'Consent was created!',
        Subject: 'Technical information',
        TopicArn: topicArn,
        MessageAttributes: {
          Region: { DataType: 'String', StringValue: region },
        },
      })
      .promise();
  }
  return event;
};

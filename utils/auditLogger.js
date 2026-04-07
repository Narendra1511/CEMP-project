const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const dynamoDb = require("../config/dynamodb");

const logAuditEvent = async ({
  action,
  user_id,
  event_id = null,
  message,
}) => {
  try {
    const params = {
      TableName: process.env.AWS_DYNAMODB_TABLE,
      Item: {
        log_id: Date.now().toString(),
        action,
        user_id: user_id ? String(user_id) : "unknown",
        event_id: event_id ? String(event_id) : null,
        message,
        created_at: new Date().toISOString(),
      },
    };

    await dynamoDb.send(new PutCommand(params));
  } catch (error) {
    console.error("DynamoDB audit log error:", error.message);
  }
};

module.exports = logAuditEvent;
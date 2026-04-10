const { PublishCommand } = require("@aws-sdk/client-sns");
const sns = require("../backend/config/sns");

const sendNotification = async (message) => {
  try {
    const params = {
      TopicArn: process.env.AWS_SNS_TOPIC_ARN,
      Message: message,
      Subject: "CEMP Notification",
    };

    await sns.send(new PublishCommand(params));
    console.log("SNS notification sent");
  } catch (error) {
    console.error("SNS Error:", error.message);
  }
};

module.exports = sendNotification;
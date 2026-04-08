const { PublishCommand } = require("@aws-sdk/client-sns");
const sns = require("../config/sns");

const sendNotification = async (message) => {
  try {
    const params = {
      TopicArn: process.env.AWS_SNS_TOPIC_ARN,
      Message: message,
      Subject: "CEMP Notification",
    };

    await sns.send(new PublishCommand(params));
  } catch (error) {
    console.error("SNS Error:", error.message);
  }
};

module.exports = sendNotification;
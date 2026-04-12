const { PublishCommand } = require("@aws-sdk/client-sns");
const sns = require("../backend/config/sns");

const sendNotification = async (message) => {
  try {
    if (!process.env.AWS_SNS_TOPIC_ARN) {
      console.log("SNS Topic ARN missing");
      return;
    }

    const params = {
      TopicArn: process.env.AWS_SNS_TOPIC_ARN.trim(),
      Message: message,
      Subject: "CEMP Notification",
    };

    const result = await sns.send(new PublishCommand(params));
    console.log("SNS notification sent:", result.MessageId);
  } catch (error) {
    console.error("SNS Error FULL:", error);
  }
};

module.exports = sendNotification;
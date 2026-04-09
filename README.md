# 🌐 Event Management Platform (CEMP)

A cloud-based event management system where users can create, manage, and register for events. The system is built using modern web technologies and deployed using multiple AWS cloud services.

---

## 🚀 Features

* User authentication (Login / Register)
* Create and manage events
* Upload event images using AWS S3
* Register and cancel event participation
* Email notifications using AWS SNS
* Audit logging using AWS DynamoDB
* Monitoring and logging using AWS CloudWatch

---

## 🛠️ Tech Stack

Frontend:

* React.js

Backend:

* Node.js
* Express.js

Database:

* PostgreSQL (Supabase)

---

## ☁️ AWS Services Used

* Amazon EC2 → Hosts backend server
* Amazon S3 → Stores event images
* Amazon DynamoDB → Stores audit logs
* Amazon SNS → Sends notifications
* Amazon CloudWatch → Monitors logs and system activity

---

## 🧱 System Architecture

User → React Frontend → Node.js Backend (EC2) → PostgreSQL (Supabase) → S3 (Image Storage) → DynamoDB (Audit Logs) → SNS (Notifications) → CloudWatch (Monitoring)

---

## ⚙️ Local Setup

Clone repository:
git clone <your-repo-url>

Backend setup:
cd backend
npm install
npm start

Frontend setup:
cd frontend
npm install
npm start

---

## 🔐 Environment Variables

Example .env file:

PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=your_bucket_name
SNS_TOPIC_ARN=your_sns_topic_arn

---

## ☁️ AWS Deployment (EC2 Steps)

Connect to EC2:
ssh -i key.pem ubuntu@your-ec2-ip

Clone project:
git clone <repo-url>
cd CEMP-project/backend

Install dependencies:
npm install

Run backend using PM2:
pm2 start app.js --name cemp-backend
pm2 save
pm2 startup

Update code:
git pull
pm2 restart cemp-backend

---

## 🔄 CI/CD Notes

* GitHub is used for version control
* Code is pushed to GitHub repository
* EC2 pulls latest changes using git pull
* PM2 is used to restart backend automatically
* This ensures continuous deployment workflow

---

## 📊 Monitoring

Application logs are sent to AWS CloudWatch.

Path to check logs:
CloudWatch → Log groups → cemp-logs → backend-out / backend-error

---

## 🧪 Demo Flow

1. User registers in the system
2. User logs in
3. Admin creates an event
4. User registers for the event
5. Event image is stored in S3
6. Notification is sent via SNS
7. Logs are stored in DynamoDB and CloudWatch

---

## 📸 Suggested Report Screenshots

* Home page UI
* Create event page
* S3 bucket showing uploaded images
* DynamoDB table with logs
* SNS topic and subscription
* CloudWatch logs
* EC2 instance running

---

## 🎯 Conclusion

This project demonstrates how multiple AWS cloud services can be integrated to build a scalable, secure, and cloud-native event management system. It combines compute, storage, database, monitoring, and messaging services into one complete solution.

---

## 👨‍💻 Author

Narendra Reddy

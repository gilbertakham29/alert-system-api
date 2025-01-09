# **Request Monitoring System**

This project implements a backend system to monitor and log invalid requests an API endpoint. It tracks repeated failed attempts from the same IP address within a configurable time window and sends alert emails when a threshold is exceeded.

---

## **Features**

- **Invalid Request Detection**: Logs failed requests caused by invalid access tokens.
- **IP Address Tracking**: Tracks the number of failed requests from each IP address.
- **Email Alerts**: Sends alert emails when a threshold of failed attempts is breached.
- **Metrics Logging**: Stores metrics such as IP address, timestamp, and failure reason in a MongoDB database.
- **Fetch Logs**: Provides an endpoint to retrieve all request logs.

## **Tech Stack**

- **Backend Language**: Node.js
- **Framework**: Express
- **Database**: MongoDB
- **Email Service**: Nodemailer with Gmail SMTP
- **Environment Variables**: Managed using `dotenv`

---

## **Installation and Setup**

### **Prerequisites**

1. Node.js installed on your system.
2. MongoDB database running locally or remotely.
3. A Gmail account for sending alert emails.

### **Steps**

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

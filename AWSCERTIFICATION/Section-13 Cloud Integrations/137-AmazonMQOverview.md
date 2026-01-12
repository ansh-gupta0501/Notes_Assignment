# Amazon MQ

- We know SQS and SNS are cloud native services because they are proprietary protocols from AWS. They use their own sets of APIs
- But if you are running traditional application on-premises, you may use open protocols such as **MQTT, AMQP, STOMP, Openwire, WSS.** 
- When you are migration your application to the cloud , you may not want to re-engineer your application to use the SQS and the SNS protocols or APIs, so instead you wanna use the traditional protocols you used to , such as MQTT, AMQP and so on. 
- So for this , you can use Amazon MQ.
- It is a managed message broker service for two technologies **RabbitMQ** and **ActiveMQ**
- So RabbitMQ and ActiveMQ are , for example, on-premises technologies that provide you access to the open protocols mentioned above
- So that we can get a managed version of these brokers onto the cloud.
- Amazon MQ **doesn't scale** as much as SQS or SNS which have sort of infinite scaling 
- And because Amazon MQ runs on servers , you may have server issues, and so you can run Multi-AZ setup with a failover if you want to be highly available
- Amazon MQ comes with both a queue feature so it looks like SQS and topic feature, it looks like SNS as part of a single broker
- So, amazon MQ is going to be used only and only if a company is migrating to the cloud and needs to use one of these open protocols mentioned above

---


The protocols (AMQP, MQTT, STOMP, OpenWire, WebSockets) are **standard ways for applications to send and receive messages** across networks. RabbitMQ and ActiveMQ are **open‑source message brokers** — software that sits in the middle, receives messages from producers, and delivers them to consumers using those protocols.

---

## 🟢 Messaging Protocols (simple explanation)

- **AMQP** (Advanced Message Queuing Protocol)  
  - A widely used standard for enterprise messaging.  
  - Supports features like acknowledgments, routing, and transactions.  
  - Example: A banking app sends payment requests via AMQP to ensure reliable delivery.

- **MQTT** (Message Queuing Telemetry Transport)  
  - Lightweight pub/sub protocol, designed for IoT devices.  
  - Very efficient, works well over low‑bandwidth connections.  
  - Example: Smart home sensors publish temperature readings via MQTT.

- **STOMP** (Simple Text Oriented Messaging Protocol)  
  - Human‑readable, text‑based protocol.  
  - Easy to integrate across different programming languages.  
  - Example: A chat application uses STOMP over WebSockets to deliver messages.

- **OpenWire**  
  - Native protocol for ActiveMQ.  
  - Optimized for Java Message Service (JMS) applications.  
  - Example: Legacy enterprise apps using JMS connect to ActiveMQ via OpenWire.

- **WebSockets (WSS)**  
  - A protocol for two‑way communication over a single TCP connection.  
  - Often used with STOMP or MQTT for browser‑based apps.  
  - Example: A stock trading dashboard updates prices in real time via WebSockets.

---

## 🟢 RabbitMQ
- **What it is:** An open‑source message broker written in Erlang.  
- **Native protocol:** AMQP (but supports others via plugins).  
- **Strengths:**  
  - Flexible routing (exchanges → queues).  
  - Good at balancing workloads across servers.  
  - Rich ecosystem of plugins for monitoring, clustering, and federation.  
- **Industry use:**  
  - Microservices communication in e‑commerce.  
  - IoT backends handling millions of sensor events.  
  - Job distribution systems (e.g., video encoding tasks).  
- **Analogy:** RabbitMQ is like a **post office** that sorts mail (messages) into the right mailboxes (queues) based on routing rules.

---

## 🟢 ActiveMQ
- **What it is:** An open‑source message broker written in Java.  
- **Native protocol:** OpenWire (but supports AMQP, MQTT, STOMP, WebSockets).  
- **Strengths:**  
  - Deep integration with Java/JMS applications.  
  - Durable subscriptions and transactional messaging.  
  - Good for legacy enterprise systems.  
- **Industry use:**  
  - Financial institutions running Java‑based trading apps.  
  - Enterprises migrating legacy JMS systems to the cloud.  
  - Systems needing guaranteed delivery and message persistence.  
- **Analogy:** ActiveMQ is like a **corporate mailroom** designed for big enterprises, with strict rules for how messages are handled and tracked.

---

## 🟢 Simple takeaway
- **Protocols** = the “languages” apps use to talk (AMQP, MQTT, STOMP, OpenWire, WebSockets).  
- **RabbitMQ & ActiveMQ** = the “post offices” that understand those languages and deliver messages reliably.  
- **Amazon MQ** = AWS’s managed version of RabbitMQ/ActiveMQ, so you don’t have to run the servers yourself.

---

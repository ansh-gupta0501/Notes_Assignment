- Go to SQS Console and create a queue
- First we need to select type of queue
    - Standard  
        - At-least-once delivery, message ordering isn't preserved
        - Best-effort ordering
    - FIFO 
        - First-in-first-out delivery, message ordering is preserved
        - Exactly-once processing

- Choose standard 
- Give name to the queue **demo-sqs**
- Under configuration where we can configure maximum message size, visibility to other consumers, and message retention., you can leave it as default
- Alse by default encription is enabled 
- You can also leave Access policy as default
    - In the Access Policy , we can Define who can access your queue.
    - Who can send messages to the queue. Only the queue owner of any specified AWS account , iam user
    - Also we can specify who can receive messages from the queue. Only the queue owner of any specified AWS account , iam user
    - **By default** , only the queue owner can send and receive messages 

- Next is **Redrive Allow policy** which is optional and in this we can tell which source queues can use this queue as the **dead-letter queue**. By default it is disabled
- Next is **dead-letter queue** which is also optional and in this we can Send undeliverable messages to a dead-letter queue. By default it is disabled
- Create queue
- Now we can start sending and receiving messages from it
- We can see how many messages are available , how many messages are in flight, how many messages are delayed

- Now to produce and consume permits, click on **Send and receive messages**
    - In the **message body** , write message you want to send to the queue, so write **Hello World**
    - Other things like message group id , delivery delay , attributes ,are optional 
    - So click on send message 
- Now under recieve messages section , we can see 1 message is available
- Similarly send another message 
- Now we need to poll the queue to receive these messages. So click on poll for messages.
    - This will retrive all the messages for me 
    - When we click on them we can read the body and see other attributes
    - Now when the message processing is done , click on messages and delete them to remove from the queue

---


## 📦 "At least once delivery"
- **Meaning:** Every message you send to a Standard queue will be delivered **at least one time** to a consumer.  
- **Why:** SQS is designed for durability and reliability. It stores messages redundantly across multiple servers.  
- **Implication:** You are guaranteed that your message won’t be lost — but it might be delivered more than once.  

👉 Example:  
You send a message `"Order #123"`.  
- SQS ensures that `"Order #123"` will eventually be delivered to a consumer.  
- Even if there’s a network glitch or retry, SQS will keep trying until it succeeds.  
- So you’ll **never lose the message**, but you might see it more than once.

---

## 🔁 "Duplicates can occur"
- **Meaning:** Because of retries and distributed storage, the same message may be delivered **multiple times** to consumers.  
- **Why:** SQS doesn’t guarantee exactly-once delivery for Standard queues. If a consumer fails to acknowledge (delete) a message before the visibility timeout expires, SQS may redeliver it.  
- **Implication:** Your application must be **idempotent** — able to handle duplicates safely without causing errors.

👉 Example:  
- `"Order #123"` is delivered to the Shipping service.  
- The consumer processes it but fails to delete it before the visibility timeout.  
- SQS assumes it wasn’t processed and delivers `"Order #123"` again.  
- Now the Shipping service sees the same order twice.  
- If the service isn’t idempotent, it might ship the same order twice.  
- Industry practice: Add unique IDs to messages and check before processing.

---

## ✅ Industry Best Practice
- **Standard queues:**  
  - Expect duplicates and out-of-order delivery.  
  - Design consumers to be **idempotent** (safe to process the same message multiple times).  
  - Example: Before shipping, check if `"Order #123"` is already marked as shipped in the database.  

- **FIFO queues:**  
  - Guarantee **exactly-once processing** and strict ordering.  
  - Use when duplicates or out-of-order delivery would break the business logic (e.g., financial transactions).

---

### 🔑 Simple takeaway
- **At least once delivery** = SQS guarantees your message won’t be lost.  
- **Duplicates can occur** = You might get the same message more than once, so your app must handle it safely.  

                                                        
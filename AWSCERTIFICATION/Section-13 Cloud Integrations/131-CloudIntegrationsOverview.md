# Cloud Integration 

- When we have multiple applications , at some point of time they will have to communicate with one another .( microservices, APIs, or separate apps)
- There are two types of patterns to make applications communicate
    - First is **Synchronous communication** in which an application talks to another application
        - For eg, you have created a service to buy something and then you need to talk to a service that ships what has been bought and so therefore you want to integrate the buying service and the shipping service synchronously because it talk directly to one another

        ```
        Buying service <---------------> Shipping service
        ```
        - AWS Example:
        Buying service (EC2 or Lambda) calls Shipping service (API Gateway + Lambda or ECS).Both must scale together.

    - Second is **Asynchronous or event based**  when we have a queue to talk to 
        - For eg, our buying service this time, anytime something is bought will put an order in a queue. And the shipping service will be reading from the queue to get the orders

        ```
        Buying service -----------> Queue -----------> Shipping service
        ```

        - In this we can see your buying service and your shipping service are not directly integrated with one another. They are something called **decouped** because there is a queue in between to talk to
        - This allows us to get some nice integration patterns


- If we get synchronous communication between an application and other one, it could be a problem.
    - For eg, what if you have a sudden spike of traffic? What if you need to encode 1000 videos but usually it's 10?
    - In this case , the service you are talking to may get overwhelmed and you may get an issue to encode these 1000 videos and things may fail
    - So in this case , it is better to decouple your applications and to use something like 
        - **SQS** , which is a **queue model**  (Orders/messages stored until Shipping service consumes them.)
        -  **SNS** , which is a **pub/sub model** (Buying service publishes an event → multiple subscribers (Shipping, Billing, Analytics) all receive it.)
        - **Kinesis** , which is used for **real time data streaming** (Shipping service consumes events in near real-time.Best for continuous data (logs, IoT, clickstreams, video).)

- These services , once they're decoupled , they can scale independently for our applications


## When to Use Which
- Synchronous:
Best for simple, immediate workflows (e.g., login → authentication service).
Use when latency must be minimal and traffic is predictable.

- Asynchronous:
Best for workloads with spikes or multiple consumers.
Example: e-commerce order → notify shipping, billing, inventory, analytics simultaneously.
Use when scalability and decoupling are more important than instant response.
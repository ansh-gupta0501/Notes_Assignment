# System Manager Parameter store

- It is a way for you to store configuration and secrets securely on AWS.
- We can store anything such as API keys, passwords , configurations 
- It is serverless that means you have nothing to provide. It's scalable, and can respond to many API Calls all the time. It's durable and very easy to use
- It's secure because you control access to each parameter in the parameter store using IAM. 
- You configurations can evolve, your parameters can evolve and so therefore you have version tracking and optional encryption.
- In the parameter store, our applications or our users can enter plain text configurations or encrypted configurations in which case it is encrypted with KMS.
- And so therefore ,you can manage and centrally store the configrations of many of your applications in one place. 


# Hands On
- Go to AWS Systems Manager service, and on left hand side there is parameter store
- So create a parameter
    - Enter name **demo-parameter**
    - We have two tier in this
        - Standard (Free)
        Store up to 10,000 standard parameters. Store parameter values up to 4 KB. Parameter policies and sharing with other AWS accounts are not available. No additional charge.
        - Advanced
        Store up to 100,000 advanced parameters. Store parameter values up to 8 KB. Add parameter policies. Share with other AWS accounts. Charges apply.
    - Now we choose type of parameter
        - String: Any string value.
        - StringList: Separate strings using commas.
        - SecureString: Encrypt sensitive data using **KMS keys** from your account or another account.
            - So SecureString is when you want to encrypt something in the parameter store because you're , for example, going to add in API keys or passwords and so on. 
        - We choose string for simplicity
    - Now we choose Data type
        - text
        - aws:Ec2:image 
    - Now in value , write say, **My configuration Parameter**
    - Create parameter
- After creating , we can edit it and make more version of it which is very helpful for tracking over time. 
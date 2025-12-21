# What is CloudFormation
- It is a declarative way of outlining your AWS infrastructure, for any resources and most of them are supported.
- Eg, In cloudformation template , you would say , 
    - I want a security group.
    - I want two EC2 instances that will be using that security group.
    - I also want an S3 bucket
    - I want a load balancer (ELB) in front of all these machines
- Then CloudFormation automatically creates all these things for you , in the right order, with the exact configuration that you specify. 

## Benefits of AWS CloudFormation 
- Infrastructure as Code :- All your infrastructure is as a code .
    - That means you will never ever create resources manually, which is great for control and anytime you do changes to how your AWS cloud is doing, then it needs to be reviewed through code review. 
- Cost :-
    - Each resource within the stack is going to get a tag with an identifier that is going to be similar to all the other resouces creating within the stack.
    - You can also easily estimate the cost of your resources using the cloudformation templates
    - You can have a **saving strategy**. For eg, you can say that in some environment you could automate the deletion of all the templates at 5:00 PM, which will delete all the associated resources with that template. and then recreate it as 9:00 AM or 8:00 AM safely. Therefore you have cost saving because you don't have any resources between 5:00 PM and 8:00 AM.
    - With cloudformation , it is super easy to create and delete resources.
- Productivity 
    - You are able to destroy and recreate infrastructure easily
    - It also generate diagrams for your templates. 
    - There is declarative programming , so you don't need to figure out if you need to create a DynamoDB table first, or an EC2 instance , or all these things together. The cloudFormation template is smart enough to figure out how to do things. 
- Don't re-invent the wheel
    - It means that we can leverage existing templates on the web.
    - We can leverage documentation
- Cloudformation supports almost all AWS resources but sometimes if anything not supported , you can use something called a **custom resource**
    - You define a resource of type Custom::MyResource in your template.
    - CloudFormation then triggers a Lambda function (or another service) whenever the stack is created, updated, or deleted.
    = That Lambda function performs the custom logic—such as creating something CloudFormation doesn’t support yet, calling an external API, or running scripts.

## CloudFormation + Infrastructure Composer
- You can visualize a CloudFormation template using the **Infrastructure Composer Service**
- Example, to visulize a WordPress CloudFormation Stack
- We can see all the resouces and the relations between the components and how they are linked together which is very handy when you want to understand your architecture diagrams

# Some terms 
- Templates:

    - JSON or YAML files that declare resources, properties, and relationships.

    - Core sections include Parameters, Mappings, Conditions, Resources, and Outputs.

- Stacks:

    - A stack is an instance of a template deployed in an account/region.

    - Create, update, and delete as one unit, with rollback on failure.

#### CloudFormation is going to be used when we have infrastructure as code , when we need to repeat an architecture in different environments , different regions or even different AWS accounts
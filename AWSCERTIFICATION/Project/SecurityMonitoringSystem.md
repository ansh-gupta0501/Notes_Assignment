
# Build a Security Monitoring System

**Project Link:** [View Project](http://learn.nextwork.org/projects/aws-security-monitoring)

---

![Image](http://learn.nextwork.org/ecstatic_silver_witty_jackfruit/uploads/aws-security-monitoring_reghtjy)

---

## Introducing Today's Project!

In this project, I will demonstrate how to setup a monitoring system in AWS using CloudTrail, CloudWatch, and SNS. I'm doing this project to learn how security and monitoring services in AWS work, plus have a working system that actually send us emails too.

### Tools and concepts

Services I used were CloudTrail, CloudWatch and SNS. We also used Secret Manager, IAM roles and S3 buckets. Key concepts I learnt include secret storing , Cloudwatch vs CloudTrail, what are notifications and different kinds of endpoints , how to create a cloudwatch and alarm.

### Project reflection

This project took me approximately 3 hours. The most challenging part was to troubleshooting why the email wasn't delivering in our first test. It is diffucult to find error when there is error but there are no error messages or error logs . It was most rewarding to compare cloudtrail SNS notifications .And why we really need to use Cloudwatch and alarms too. 

---

## Create a Secret

Secrets Manager is AWS Security Service for storing secrets i.e, database credentials , account IDs,  API Keys, or anything that is sensitive information that would cause damage/trouble if it got leaked and should not be lying around in a code. 

To set up for my project, I created a secret called TopSecretInfo that contains a string "we need 3 coffees a day to function"

![Image](http://learn.nextwork.org/ecstatic_silver_witty_jackfruit/uploads/aws-security-monitoring_o5p6q7r8)

---

## Set Up CloudTrail

CloudTrail is a monitoring service - It is used to track events and activities in our AWS account. These logs are very helpful for security(detecting suspicious activity), compilance (proving that you're following the rules for something) and troubleshooting (identifying  what happened/changed if something breaks). 

CloudTrail events include types like management, data, insights,  and network activity events. In this project, we set up our trail Management Events because accessing a secrets falls into this category. It is not data event which captures high volume actions performed on resources. Also management events are free to track and AWS lets you to track security operations like this for free.

### Read vs Write Activity

Read API activity involves accessing , reading , opening a resouce. Write API activity involves creating , updating ,deleting a resouce.  For this project, we need both to learn both types of activities, but we really only need the write activity (accessing a secret is considered as Write activity)

---

## Verifying CloudTrail

I retrieved the secret in two ways: First through Secret Manager Console, where we could easily just select a "Retrieve Secret Value" button Second using AWS CLI i.e, running a get-secret-value in CloudShell

To analyze my CloudTrail events, I visited Event History in CloudTrail. I found there was a GetSecretValue event tracked regardless of whethere we did it over CLI or over the console. This tells me cloudfront can definitely see and track when we open our Secret Manger Key. 

![Image](http://learn.nextwork.org/ecstatic_silver_witty_jackfruit/uploads/aws-security-monitoring_s8t9u0v1)

---

## CloudWatch Metrics

CloudWatch Logs is a monitoring service that brings together logs from other AWS services. It's important for monitoring because it helps us to analyze and create alarms for. You get to create insights and get alerted based on events that happen in your account.

CloudTrail's Event History is useful for quickly reading (management) events that happened in the last 90 days while CloudWatch Logs are better for combining and analysing logs from different sources , accessing logs for longer than 90 days, and advance filtering

A CloudWatch metric is a specific way that we count or track events that are in log group. When setting up a metric, the metric value represents how we increment or 'count' an event when it passes our filters (In our case, we want to increment our metric value by 1 whenever our secret is accessed) Default value is used when the event we're tracking does not occur.

![Image](http://learn.nextwork.org/ecstatic_silver_witty_jackfruit/uploads/aws-security-monitoring_a9b0c1d2)

---

## CloudWatch Alarm

A CloudWatch alarm is a feature and alert system in CloudWatch that's designed to "go off" i.e, indicate when certain conditions have been met in our log group. I set my CloudWatch alarm threshold to be about how many times the GetSecretValue event happens in a 5 minute period so the alarm will trigger when the average number of times is above 1.

I created an SNS topic along the way. An SNS topic is like a newsletter / broadcast channel that emails, phone numbers , functions , apps can subscribe to(so they get notified when SNS has a new update to share) My SNS topic is set up to send us an email when our secret gets accessed. 

AWS requires email confirmation because it would not automatically start emailing addresses that we subscribe to an SNS topic.  This helps prevent any unwanted subscriptions for recipicent(people who are receiving those emails)

![Image](http://learn.nextwork.org/ecstatic_silver_witty_jackfruit/uploads/aws-security-monitoring_fsdghstt)

---

## Troubleshooting Notification Errors

To test my monitoring system, I opened and accessed our secret again . The results were not successful - I didn't get any emails/notifications about our secret getting accessed.

When troubleshooting the notification issues I investigated every single part of our monitoring system - whether CloudTrail is picking up on events that are happening when we access our secret, whether cloudtrail is sending logs to cloudwatch, whether the filter is accidentally rejecting the correct events, whether the alarm gets triggered , whether triggering the alarm sends an email.

I initially didn't receive an email before because CloudWatch was configured to use the wrong threshold . Instead of calculating the Average number of times a secret is accessed in a time period , it should be SUM. 

---

## Success!

To validate that our monitoring system can successfully detect and alert when my secret is accessed  I checked my secret value one more time , I received an email within 1-2 minutes of the event . Our alarm in CloudWatch is also in "In alarm " state .

![Image](http://learn.nextwork.org/ecstatic_silver_witty_jackfruit/uploads/aws-security-monitoring_ageraergearge)

---

## Comparing CloudWatch with CloudTrail Notifications

In a project extension, I enabled SNS notification delivery in CloudTrail because this let us evaluate CloudTrail vs CloudWatch for notifying us about events like our secret getting access.

After enabling CloudTrail SNS notifications, my inbox was very quickly filled with new emails from SNS(as it was notified by CloudTrail) In terms of the usefulness of these emails, I thought that I am receiving lots and the logs themselves don't show what happened in terms of management events that occured. We only see that new logs have been stored in our bucket. 

![Image](http://learn.nextwork.org/ecstatic_silver_witty_jackfruit/uploads/aws-security-monitoring_d7e8f9g0)

---

---

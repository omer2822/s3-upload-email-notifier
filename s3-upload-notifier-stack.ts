import { Stack, CfnParameter, StackProps } from 'aws-cdk-lib'
import { Bucket, EventType } from 'aws-cdk-lib/aws-s3'
import { Topic } from 'aws-cdk-lib/aws-sns'
import { SnsDestination }from 'aws-cdk-lib/aws-s3-notifications'
import { EmailSubscription } from 'aws-cdk-lib/aws-sns-subscriptions'
import { Construct } from 'constructs';

// What do we want to accomplish?
// We'd like to be notified via email whenever someone is going to upload an object to a S3 bucket. Perhaps we're teaching an university class and we'd like to be notified whenever someone completes their assignment and uploads it to S3.
// Which CDK constructs can help us with our goal?
// Obviously we're going to need an S3 bucket to upload the objects to. We could use a pre-existing one, but in this example we're going to create a bucket with out stack.
// Next up - since we want to subscribe to an object upload event, we're going to need a SNS (Simple Notification Service) topic to subscribe to and send an email.
// We also need to ensure that S3 will send a notification to that topic whenever there is an object upload event.

export class S3UploadNotifierStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const dataBucket = new Bucket(this, 'DataBucket');
    
    const topic = new Topic(this, 'Topic');

    // Whenever there's an OBJECT_CREATED event, send a notification to SNS topic
    dataBucket.addEventNotification(
      EventType.OBJECT_CREATED,
      new SnsDestination(topic)
    );
    
    // This value is provided as a CloudFormation parameter
    // usage cdk deploy --parameters subscriptionEmail="myemail@email.com"
    const emailAddress = new CfnParameter(this, 'subscriptionEmail');
    
    topic.addSubscription(
      new EmailSubscription(emailAddress.value.toString()) 
    )
  }
}

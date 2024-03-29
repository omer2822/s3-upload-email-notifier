# s3-upload-email-notifier



What do we want to accomplish?
We'd like to be notified via email whenever someone is going to upload an object to a S3 bucket. Perhaps we're teaching an university class and we'd like to be notified whenever someone completes their assignment and uploads it to S3.
Which CDK constructs can help us with our goal?
Obviously we're going to need an S3 bucket to upload the objects to. We could use a pre-existing one, but in this example we're going to create a bucket with out stack.
Next up - since we want to subscribe to an object upload event, we're going to need a SNS (Simple Notification Service) topic to subscribe to and send an email.
We also need to ensure that S3 will send a notification to that topic whenever there is an object upload event.

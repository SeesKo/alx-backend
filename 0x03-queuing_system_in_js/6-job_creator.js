import kue from 'kue';

const queue = kue.createQueue();

// Define the job data
const jobData = {
  phoneNumber: '0123456789',
  message: 'This is the code to verify your account',
};

// Create a job in the queue
const job = queue.create('push_notification_code', jobData)
  .save((err) => {
    if (err) {
      console.error('Error creating job:', err);
    } else {
      console.log(`Notification job created: ${job.id}`);
    }
  });

// Handle job completion
job.on('complete', () => {
  console.log('Notification job completed');
});

// Handle job failure
job.on('failed', (errorMessage) => {
  console.log(`Notification job failed: ${errorMessage}`);
});

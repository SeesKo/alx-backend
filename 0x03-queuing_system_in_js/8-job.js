function createPushNotificationsJobs(jobs, queue) {
  // Check if jobs is an array
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  // Iterate over each job in the jobs array
  jobs.forEach((jobData) => {
    // Create a job in the queue
    const jobQueue = queue.create('push_notification_code_3', jobData);

    // Save the job to the queue and capture the job ID
    jobQueue.save((err) => {
      if (err) {
        console.error('Error saving job:', err);
        return;
      }

      // Log when the job is created
      console.log(`Notification job created: ${jobQueue.id}`);
    });

    // Log when the job is complete
    jobQueue.on('complete', () => {
      console.log(`Notification job ${jobQueue.id} completed`);
    });

    // Log when the job fails
    jobQueue.on('failed', (err) => {
      console.log(`Notification job ${jobQueue.id} failed: ${err.message}`);
    });

    // Log progress of the job
    jobQueue.on('progress', (progress) => {
      console.log(`Notification job ${jobQueue.id} ${progress}% complete`);
    });
  });
}

export default createPushNotificationsJobs;

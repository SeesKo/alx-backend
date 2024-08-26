import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job';

describe('createPushNotificationsJobs', () => {
  let queue;

  // Set up before each test
  beforeEach(() => {
    queue = kue.createQueue();
    queue.testMode = true; // Enter test mode
  });

  // Clean up after each test
  afterEach(async () => {
    await new Promise((resolve, reject) => {
      // Fetch all jobs and remove them
      kue.Job.rangeByState('inactive', 0, -1, 'asc', (err, jobs) => {
        if (err) return reject(err);
        if (jobs.length > 0) {
          // Remove each job manually
          jobs.forEach((job) => job.remove(() => {}));
        }
        resolve();
      });
    });
    queue.testMode = false; // Exit test mode
  });

  it('display an error message if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs({}, queue)).to.throw(Error, 'Jobs is not an array');
  });

  it('create two new jobs in the queue', () => new Promise((done) => {
    const list = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account',
      },
      {
        phoneNumber: '1234567890',
        message: 'Your verification code is 5678',
      },
    ];

    createPushNotificationsJobs(list, queue);

    // Use a small timeout to allow jobs to be enqueued
    setTimeout(() => {
      // Check if the jobs are correctly enqueued
      kue.Job.rangeByState('inactive', 0, -1, 'asc', (err, jobs) => {
        if (err) return done(err);

        // Ensure the length and job type are correct
        expect(jobs).to.be.an('array');
        expect(jobs.length).to.equal(2);

        jobs.forEach((job) => {
          expect(job.type).to.equal('push_notification_code_3');
        });
        done();
      });
    }, 100); // Adjust timeout if necessary
  }));
});

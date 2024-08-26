import express from 'express';
import redis from 'redis';
import kue from 'kue';
import { promisify } from 'util';

// Initialize Express app
const app = express();
const port = 1245;

// Initialize Redis client
const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379,
});

// Promisify Redis functions
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Initialize Kue queue
const queue = kue.createQueue();

// Initial configuration
let reservationEnabled = true;

// Functions for managing available seats
async function reserveSeat(number) {
  await setAsync('available_seats', number);
}

async function getCurrentAvailableSeats() {
  const seats = await getAsync('available_seats');
  return seats ? parseInt(seats, 10) : 0;
}

// Set initial number of available seats
reserveSeat(50);

// Route to get available seats
app.get('/available_seats', async (req, res) => {
  const seats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: seats.toString() });
});

// Route to reserve a seat
app.get('/reserve_seat', async (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: 'Reservations are blocked' });
  }

  const job = queue.create('reserve_seat').save((err) => {
    if (err) {
      return res.json({ status: 'Reservation failed' });
    }
    res.json({ status: 'Reservation in process' });
  });

  job.on('complete', (result) => {
    console.log(`Seat reservation job ${job.id} completed`);
  });

  job.on('failed', (err) => {
    console.log(`Seat reservation job ${job.id} failed: ${err.message}`);
  });
});

// Route to process the queue
app.get('/process', async (req, res) => {
  res.json({ status: 'Queue processing' });

  queue.process('reserve_seat', async (job, done) => {
    try {
      const currentSeats = await getCurrentAvailableSeats();
      if (currentSeats <= 0) {
        reservationEnabled = false;
        return done(new Error('Not enough seats available'));
      }

      await reserveSeat(currentSeats - 1);
      done();
    } catch (error) {
      done(error);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

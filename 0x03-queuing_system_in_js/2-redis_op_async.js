import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient();

// Promisify the Redis methods
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

// Function to set a new school value
async function setNewSchool(schoolName, value) {
  try {
    const result = await setAsync(schoolName, value);
    console.log('Reply:', result);
  } catch (err) {
    console.error(`Error setting value: ${err.message}`);
  }
}

// Function to display the value of a school
async function displaySchoolValue(schoolName) {
  try {
    const value = await getAsync(schoolName);
    console.log(value);
  } catch (err) {
    console.error(`Error fetching value: ${err.message}`);
  }
}

(async () => {
  await displaySchoolValue('Holberton');
  await setNewSchool('HolbertonSanFrancisco', '100');
  await displaySchoolValue('HolbertonSanFrancisco');
})();

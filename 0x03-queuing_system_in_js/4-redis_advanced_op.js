import redis from 'redis';

const client = redis.createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

// Function to create a hash with multiple fields
function createHash() {
  const hashKey = 'HolbertonSchools';
  const schools = {
    Portland: '50',
    Seattle: '80',
    'New York': '20',
    Bogota: '20',
    Cali: '40',
    Paris: '2',
  };

  // Use hset to set multiple fields in a hash
  for (const [field, value] of Object.entries(schools)) {
    client.hset(hashKey, field, value, redis.print);
  }
}

// Function to display the hash
function displayHash() {
  const hashKey = 'HolbertonSchools';

  // Use hgetall to retrieve the hash fields and values
  client.hgetall(hashKey, (err, object) => {
    if (err) {
      console.error(`Error retrieving hash: ${err.message}`);
      return;
    }
    console.log(object);
  });
}

// Create the hash and display it
createHash();
displayHash();

import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

// Create Express app
const app = express();
const port = 1245;

// Create Redis client
const client = redis.createClient();

// Promisify Redis functions
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// List of products
const listProducts = [
  {
    id: 1, name: 'Suitcase 250', price: 50, stock: 4,
  },
  {
    id: 2, name: 'Suitcase 450', price: 100, stock: 10,
  },
  {
    id: 3, name: 'Suitcase 650', price: 350, stock: 2,
  },
  {
    id: 4, name: 'Suitcase 1050', price: 550, stock: 5,
  },
];

// Function to get item by ID
function getItemById(id) {
  return listProducts.find((item) => item.id === parseInt(id, 10));
}

// Route to list all products
app.get('/list_products', (req, res) => {
  const products = listProducts.map((item) => ({
    itemId: item.id,
    itemName: item.name,
    price: item.price,
    initialAvailableQuantity: item.stock,
  }));
  res.json(products);
});

// Route to get product details by ID
app.get('/list_products/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const product = getItemById(itemId);

  if (!product) {
    return res.json({ status: 'Product not found' });
  }

  const reservedStock = await getCurrentReservedStockById(itemId);
  const currentQuantity = product.stock - (reservedStock || 0);

  res.json({
    itemId: product.id,
    itemName: product.name,
    price: product.price,
    initialAvailableQuantity: product.stock,
    currentQuantity,
  });
});

// Route to reserve a product
app.get('/reserve_product/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const product = getItemById(itemId);

  if (!product) {
    return res.json({ status: 'Product not found' });
  }

  const reservedStock = await getCurrentReservedStockById(itemId);
  const currentQuantity = product.stock - (reservedStock || 0);

  if (currentQuantity < 1) {
    return res.json({
      status: 'Not enough stock available',
      itemId,
    });
  }

  await reserveStockById(itemId, (reservedStock || 0) + 1);
  res.json({
    status: 'Reservation confirmed',
    itemId,
  });
});

// Function to reserve stock in Redis
async function reserveStockById(itemId, stock) {
  await setAsync(`item.${itemId}`, stock);
}

// Function to get current reserved stock from Redis
async function getCurrentReservedStockById(itemId) {
  const reservedStock = await getAsync(`item.${itemId}`);
  return reservedStock ? parseInt(reservedStock, 10) : 0;
}

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

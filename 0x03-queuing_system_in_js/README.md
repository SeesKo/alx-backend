# 0x03. Queuing System in JS

## Overview

This project demonstrates how to build a basic queuing system using `Node.js`, `Redis`, and `Kue`. The system includes a simple Express.js application that interacts with a Redis server to manage and process jobs in a queue.

## Requirements

- Ubuntu 18.04
- Node 12.x
- Redis 5.0.7
- Code should use the `js` extension

## Features

- **Redis Integration:** Basic operations with Redis such as setting and getting key-value pairs.
- **Kue Integration:** Job creation and processing with Kue.
- **Express App:** A simple Express.js app that interacts with Redis and manages jobs in the queue.

## Dependencies

The project uses the following dependencies:

- **express:** Fast, unopinionated, minimalist web framework for Node.js.
- **redis:** Redis client library for Node.js.
- **kue:** Priority job queue backed by Redis.
- **babel:** Transpiler for writing next-generation JavaScript.

For development:

- **nodemon:** Monitors for changes in source code and automatically restarts the server.
- **eslint:** Linter for identifying and reporting on patterns in JavaScript.

Refer to the `package.json` file for the complete list.

## License

This project is licensed under the ISC License.

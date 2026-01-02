// Quick script to see what routes are registered
// Run with: node debug-routes.js

require('dotenv').config();
const express = require('express');
const payload = require('payload');

const app = express();

const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: () => {
      console.log('\n📡 Payload initialized. Checking routes...\n');
    }
  });

  // List all registered routes
  console.log('Registered Express Routes:');
  console.log('========================\n');
  
  app._router.stack.forEach((middleware, index) => {
    if (middleware.route) {
      // Routes registered directly on the app
      const methods = Object.keys(middleware.route.methods).join(', ').toUpperCase();
      console.log(`${methods.padEnd(10)} ${middleware.route.path}`);
    } else if (middleware.name === 'router') {
      // Router middleware (like Payload's routes)
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          const methods = Object.keys(handler.route.methods).join(', ').toUpperCase();
          const path = handler.route.path;
          console.log(`${methods.padEnd(10)} ${path}`);
        }
      });
    }
  });

  console.log('\n✅ Done! Look for /api/users/login in the list above.\n');
  process.exit(0);
};

start().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

// // backend/server.js
// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = 3001; // Use any available port

// app.use(cors()); 
// app.use(express.json());

// // Define your routes and APIs here

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// // backend/server.js

// // Mock data for assets
// const assets = [
//     {
//       AssetId: generateRandomId(),
//       ProductId: generateRandomId(),
//       productDetail: generateRandomText(),
//     },
//     {
//       AssetId: generateRandomId(),
//       ProductId: generateRandomId(),
//       productDetail: generateRandomText(),
//     },
//     {
//       AssetId: generateRandomId(),
//       ProductId: generateRandomId(),
//       productDetail: generateRandomText(),
//     },
//     {
//       AssetId: generateRandomId(),
//       ProductId: generateRandomId(),
//       productDetail: generateRandomText(),
//     },
//     // Add more mock data as needed
//   ];
  
//   // Function to generate a random ID (replace with your logic if needed)
//   function generateRandomId() {
//     return Math.random().toString(36).substring(2, 10);
//   }
  
//   // Function to generate random text (replace with your logic if needed)
//   function generateRandomText() {
//     return Math.random().toString(36).substring(2, 15);
//   }

//   app.get('/api/assets', (req, res) => {
//     res.json(assets);
//   });
  
//   app.post('/api/duplicateAsset', (req, res) => {
//     const { assetKey } = req.body;
  
//     // Find and duplicate the selected asset (similar to your previous code)
//     const selectedAsset = assets.find((asset) => asset.AssetId === assetKey);
  
//     if (!selectedAsset) {
//       res.status(404).json({ error: `Asset with key ${assetKey} not found` });
//       return;
//     }
  
//     const newAsset = {
//       AssetId: generateRandomId(),
//       ProductId: generateRandomId(),
//       productDetail: selectedAsset.productDetail,
//     };
  
//     const index = assets.findIndex((asset) => asset.AssetId === assetKey);
//     assets.splice(index + 1, 0, newAsset);
  
//     res.json({ status: 'success', asset: newAsset });
//   });

// server.js (Node.js server)
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors()); 
app.use(express.json());


// Define a route to proxy requests to the Shopify API
app.get('/api/fetchShopifyData', async (req, res) => {
  try {
    const response = await fetch('https://demo-ie.myshopify.com/admin/api/2023-07/themes/160435470652/assets.json', {
      headers: {
        'X-Shopify-Access-Token': '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', // Replace with your Shopify access token
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data from Shopify API: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from Shopify:', error);
    res.status(500).json({ error: 'Failed to fetch data from Shopify' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

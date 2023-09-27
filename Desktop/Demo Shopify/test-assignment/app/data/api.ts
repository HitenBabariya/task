// // // Mock data for assets
// // const initialAssets = [
// //     {
// //       AssetId: generateRandomId(),
// //       ProductId: generateRandomId(),
// //       productDetail: generateRandomText(),
// //     },
// //     {
// //       AssetId: generateRandomId(),
// //       ProductId: generateRandomId(),
// //       productDetail: generateRandomText(),
// //     },
// //     {
// //       AssetId: generateRandomId(),
// //       ProductId: generateRandomId(),
// //       productDetail: generateRandomText(),
// //     },
// //     {
// //       AssetId: generateRandomId(),
// //       ProductId: generateRandomId(),
// //       productDetail: generateRandomText(),
// //     },
// //     // Add more mock data as needed
// //   ];
  
// //   // Function to generate a random ID (replace with your logic if needed)
// //   function generateRandomId() {
// //     return Math.random().toString(36).substring(2, 10);
// //   }
  
// //   // Function to generate random text (replace with your logic if needed)
// //   function generateRandomText() {
// //     return Math.random().toString(36).substring(2, 15);
// //   }
  
// //   // Function to fetch assets (mock data)
// //   export async function fetchAssets() {
// //     return initialAssets;
// //   }
  
// //   // Function to duplicate an asset (mock data)
// //   export async function duplicateAsset({ assetKey, assetdata, setAssets }) {
// //     const selectedAsset = assetdata.find((asset) => asset.AssetId === assetKey);
  
// //     if (!selectedAsset) {
// //       throw new Error(`Asset with key ${assetKey} not found`);
// //     }
  
// //     // Create a new asset with the same content (generate new IDs if needed)
// //     const newAsset = {
// //       AssetId: generateRandomId(),
// //       ProductId: generateRandomId(),
// //       productDetail: selectedAsset.productDetail,
// //     };
  
// //     // Add the new asset below the selected one in the mock data
// //     const index = assetdata.findIndex((asset) => asset.AssetId === assetKey);
// //     assetdata.splice(index + 1, 0, newAsset);
  
// //     // Update the state to trigger a re-render with the new data
// //     setAssets([...assetdata]);
  
// //     return { status: 'success' };
// //   }

// // Install axios in your Remix project if you haven't already
// // npm install axios

// // app/data/api.ts

// import axios from 'axios';

// // Function to fetch assets from the API
// export async function fetchAssets() {
//   try {
//     const response = await axios.get('http://localhost:3001/api/assets');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching assets:', error);
//     throw error;
//   }
// }
// // Function to duplicate an asset using the API
// export async function duplicateAsset({ assetKey }) {
//     try {
//       const response = await axios.post('http://localhost:3001/api/duplicateAsset', { assetKey });
//       return response.data.asset;
//     } catch (error) {
//       console.error('Error duplicating asset:', error);
//       throw error;
//     }
//   }

// data.ts

// Function to fetch data from your server-side proxy
export async function fetchShopifyAssets() {
    try {
      const response = await fetch('/api/fetchShopifyData'); // Request to your server-side proxy
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data from Shopify API: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data from Shopify:', error);
      throw error;
    }
  }
  
  // You can export other data-related functions here if needed
  
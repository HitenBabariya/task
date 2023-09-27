// shopifyApi.js

// Import any necessary libraries
import fetch from 'node-fetch';

// Define the Shopify API endpoint and access token

// const SHOPIFY_API_URL = 'https://demo-ie.myshopify.com/admin/api/2023-07/themes/160435470652/assets.json';
const SHOPIFY_API_URL = 'https://demo-ie.myshopify.com/admin/api/2023-07/themes.json';
const SHOPIFY_ACCESS_TOKEN = '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';

// Function to fetch Shopify assets
export async function fetchShopifyAssets() {
  try {
    const response = await fetch(SHOPIFY_API_URL, {
      method: 'GET',
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Shopify assets');
    }

    const data = await response.json();

    // Find the published theme with "role": "main"
    const publishedTheme = data.themes.find((theme) => theme.role === 'main');

    if (!publishedTheme) {
      throw new Error('Published theme not found');
    }

    const publishedThemeId = publishedTheme.id;
    return publishedThemeId;
  } catch (error) {
    throw error;
  }
}

function generateRandomText() {
      return Math.random().toString(36).substring(2, 15);
    }
export async function fetchAssetsForPublishedTheme(publishedThemeId) {
  try {
    const assetApiUrl = `https://demo-ie.myshopify.com/admin/api/2023-07/themes/${publishedThemeId}/assets.json`;
    
    const response = await fetch(assetApiUrl, {
      method: 'GET',
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch assets for the published theme');
    }

    const data = await response.json();
    return data.assets; // Adjust the property name based on the actual API response structure
  } catch (error) {
    throw error;
  }
}
// export async function hd(){
//   const info=await handleDup();
//   console.log('innnfo',info);
//   return info.asset;
// }

function generateRandomId() {
    return Math.random().toString(6).substring(2, 10);
 }
export async function handleDup(selectedAsset) {
  console.log('sd',selectedAsset);
  // selectedAsset="assets/base.css"
  if (true) {
    // Define the request body with the expected structure
    const requestBody = {
      asset: {
        key: "assets/base.css"+"."+generateRandomId(),
        value:generateRandomText()
      },
    };
    console.log('rb',requestBody)
    try {
      const response = await fetch(
        "https://demo-ie.myshopify.com/admin/api/2023-07/themes/160435470652/assets.json",
        {
          method: "PUT",
          headers: {
            'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
             "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody), // Use the formatted request body
        }
      );
      if (response.ok) {
        // Handle success
        console.log("Asset duplicated successfully!");
        const data = await response.json();
        console.log('put data',data.asset);
        return data.asset; 
      } else {
        // Handle error
        console.error("Error duplicating asset",response);
      }
    } catch (error) {
      console.error("Error duplicating asset:", error);
    }
  }
}
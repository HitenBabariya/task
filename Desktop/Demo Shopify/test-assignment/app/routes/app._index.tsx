// // import React, { useState, useEffect } from 'react';
// // import { LoaderFunction, json } from '@remix-run/node';
// // import { useLoaderData, useSubmit } from '@remix-run/react';
// // import { Page, Button } from '@shopify/polaris';
// // import AssetList from '../components/AssetList';
// // import { fetchAssets, duplicateAsset } from '../data/api';
// // import { Text } from '@shopify/polaris';

// // export const loader = async () => {
// //   // Fetch assets from the mock data
// //   const assets = await fetchAssets();

// //   return json({ assets });
// // };

// // export let action: LoaderFunction = async ({ request }) => {
// //   const { body } = request;
// //   const params = new URLSearchParams(body);

// //   // Handle asset duplication logic
// //   if (params.has('duplicateAsset')) {
// //     const assetKeyToDuplicate = params.get('duplicateAsset');
// //     await duplicateAsset({ assetKey: assetKeyToDuplicate });
// //   }

// //   // Redirect back to the index page after duplication
// //   return json({ status: 'success' }, { status: 303, headers: { Location: '/app' } });
// // };

// // export default function Index() {
// //   const { assets: initialAssets } = useLoaderData();
// //   const [assets, setAssets] = useState(initialAssets);
// //   const [selectedAsset, setSelectedAsset] = useState(null);
// //   const submit = useSubmit();

// //   const handleSelectAsset = (asset) => {
// //     // Update the selected asset when a card is clicked
// //     setSelectedAsset(selectedAsset === asset ? null : asset);
// //   };

// //   const handleDuplicate = async () => {
// //     if (!selectedAsset) {
// //       return;
// //     }

// //     // Submit the form with selectedAsset key to trigger duplication
// //     await duplicateAsset({ assetKey: selectedAsset.AssetId});
// //     setSelectedAsset(null);

// //     // Force re-fetch of assets to display the updated data
// //     const updatedAssets = await fetchAssets();
// //     setAssets(updatedAssets);

// //   };

// //   // Update the assets state when initialAssets change
// //   useEffect(() => {
// //     setAssets(initialAssets);
// //   }, [initialAssets]);

// //   return (
// //     <Page>
// //       <Text variant="headingMd" as="h2">Shopify Task App</Text>
// //       <AssetList assets={assets} selectedAsset={selectedAsset} onSelect={handleSelectAsset} />
// //       <form id="duplicate-asset-form" method="post">
// //         <input type="hidden" name="assetKey" value={selectedAsset ? selectedAsset.AssetId : ''} />
// //         <Button primary disabled={!selectedAsset} onClick={handleDuplicate}>
// //           Duplicate Template
// //         </Button>
// //       </form>
// //     </Page>
// //   );
// // }


// // app/routes/app._index.tsx

// import React, { useState, useEffect } from 'react';
// import { Page } from '@shopify/polaris';
// import AssetList from '../components/AssetList';
// import { fetchShopifyAssets } from '~/data/api';
// export default function Index() {
//   const [shopifyAssets, setShopifyAssets] = useState([]);

//   // Create a utility function to fetch data from Shopify


//   useEffect(() => {
//     // Fetch data from Shopify when the component mounts
//     fetchShopifyAssets()
//       .then((assets) => {
//         // Extract and format the desired information
//         const formattedAssets = assets.map((asset) => ({
//           assetKey: asset.key,
//           themeId: asset.theme_id,
//           updatedAt: asset.updated_at,
//         }));
//         setShopifyAssets(formattedAssets);
//       })
//       .catch((error) => {
//         console.error('Error fetching Shopify assets:', error);
//       });
//   }, []);

//   return (
//     <Page>
//       <AssetList assets={shopifyAssets} />
//     </Page>
//   );
// }

import { useState, useCallback } from "react";
import { json } from "@remix-run/node";
import { useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  VerticalStack,
  Card,
  Button,
  Box,
  Tabs,
  LegacyCard,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { fetchShopifyAssets,fetchAssetsForPublishedTheme ,handleDup} from "~/shopifyapi";// Adjust the path to match your project structure
import { assets } from "build";


// handleDup()
const SHOPIFY_ACCESS_TOKEN = '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';

// const loader = async () => {
//   const [section1, section2, section3] = await Promise.all([
//      fetchSection1(),
//      fetchSection2()
//      fetchSection3()
//   ]);
//   return json({ section1, section2, section3 });
// }
export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  const shop = session.shop
  const apiAccessToken = session.accessToken;
  // TODO: Complete this function to fetch the assets from the Shopify API
  // and return the home, product, and collection templates.
  try {
    // Fetch the published theme's ID
    const publishedThemeId = await fetchShopifyAssets();
    
    // Fetch assets for the published theme
    const fetchedAssets = await fetchAssetsForPublishedTheme(publishedThemeId);
    // console.log("hi",fetchedAssets);
    // console.log('udata',updateddata);
    return json({ assets:fetchedAssets});
  } catch (error) {
    console.error('Error fetching Shopify assets:', error);
    return json({ assets: [] }); // Return an empty array or handle the error as needed
  }

  // return json({ data: {} });
};

export let action = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  const shop = session.shop
  const apiAccessToken = session.accessToken;

  const updateddata=await handleDup();
  console.log('ud',updateddata);
  return json({ updateasset:updateddata});
  // TODO: Complete this function to duplicate the selected asset
  // by creating a new asset with a random key and the same content.
  // format should be if homepage then index.{random10-characters-key}.liquid, collection then collection.{random10-characters-key}.liquid, product then product.{random10-characters-key}.liquid

  return json({ status: 'success' });
};

export default function Index() {
  const {  assets: loadedAssets} = useLoaderData();
  const actionData = useActionData();
   console.log("new data",actionData);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
 
  const submit = useSubmit();


  const handleSelect = (asset) => {
    setSelectedAsset(asset);
  };
  const handleDuplicate = async () => {
    await handleDup(selectedAsset.key);
    // console.log('tttt',hnew);
    // if (selectedAsset) {
    //   // Define the request body with the expected structure
    //   const requestBody = {
    //     asset: {
    //       key: selectedAsset.key,
    //     },
    //   };
  
    //   try {
    //     const response = await fetch(
    //       "https://demo-ie.myshopify.com/admin/api/2023-07/themes/160435372348/assets.json",
    //       {
    //         method: "PUT",
    //         headers: {
    //           'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
    //           // "Content-Type": "application/json",


    //         },
    //         body: JSON.stringify(requestBody), // Use the formatted request body
    //       }
    //     );
    //     if (response.ok) {
    //       // Handle success
    //       console.log("Asset duplicated successfully!");
    //       const data = await response.json();
    //       return data.assets; 
    //     } else {
    //       // Handle error
    //       console.error("Error duplicating asset",response);
    //     }
    //   } catch (error) {
    //     console.error("Error duplicating asset:", error);
    //   }
    // }
  };
  
  const renderCard = () => {
    // TODO: Complete this function to submit the form with the selected asset key and theme ID.
  };

  


  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'homePages',
      content: 'Home Pages',
      accessibilityLabel: 'All customers',
      panelID: 'homePages',
    },
    {
      id: 'collectionPages',
      content: 'Collection Pages',
      panelID: 'collectionPages',
    },
    {
      id: 'productPages',
      content: 'Product Pages',
      panelID: 'productPages',
    }
  ];
  
const data=""
  // TODO: Create the Tabs and Panels components and render the assets inside the Panels.

  return (
    <Page>
      <ui-title-bar title="Remix app template"></ui-title-bar>
      <VerticalStack gap="5">
        <>
          <Card>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
              <LegacyCard.Section title={tabs[selected].content}>
                <p>Tab {selected} selected</p>
                {/* <Box padding="400" width="586px" borderWidth="5px">
                  hi
                </Box> */}
                {loadedAssets&&
                <>
                  {loadedAssets.map((asset) => (
                    // <p>{asset.key}</p>
                    <>
                    <div style={{ marginTop: "10px", cursor: "pointer" ,borderRadius:"5px", borderWidth:"2px"}}
                        onClick={() => handleSelect(asset)}
                        key={asset.key}>
                    <Box
                     className={
                      selectedAsset && selectedAsset.key === asset.key
                        ? "selected-card" // Apply the selected-card class if this card is selected
                        : ""
                    }>
                    <Card>
                    <Text>Asset Key: {asset.key}</Text>
                    <Text>Theme ID: {asset.theme_id}</Text>
                    <Text>Updated At: {asset.updated_at}</Text>
                    </Card>
                    </Box>

                    </div>
                  </>
                  ))}
                </>}
              </LegacyCard.Section>
            </Tabs>
          </Card>
          <form method="post">
            <input type="hidden" name="selectedAssetKey" value={selectedAsset ? selectedAsset.key : ''} />
            <input type="hidden" name="selectedAssetThemeId" value={selectedAsset ? selectedAsset.theme_id : ''} />
            <Button
              primary
              disabled={!selectedAsset}
              onClick={handleDuplicate}
            >
              Duplicate Template
            </Button>
          </form>
        </>
      </VerticalStack>
      <style>{`
        /* Define the CSS for the selected card */
        .selected-card {
          border: 2px solid blue;
          border-radius:5px;
        }
      `}</style>
    </Page>
  );
}

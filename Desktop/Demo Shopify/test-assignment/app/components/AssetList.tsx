// import React from 'react';
// import { VerticalStack } from '@shopify/polaris';
// import AssetCard from './AssetCard';

// function AssetList({ assets, selectedAsset, onSelect }) {
//   return (
//     <VerticalStack>
//       {assets.map((asset) => (
//         <AssetCard
//           key={asset.AssetId}
//           asset={asset}
//           isSelected={selectedAsset === asset}
//           onSelect={() => onSelect(asset)}
//         />
//       ))}
//     </VerticalStack>
//   );
// }

// export default AssetList;

// app/components/AssetList.tsx

import React from 'react';
import AssetCard from './AssetCard';

function AssetList({ assets }) {
  return (
    <div>
      {assets.map((asset, index) => (
        <AssetCard
          key={index} // You can use a more stable key if available
          asset={asset}
        />
      ))}
    </div>
  );
}

export default AssetList;


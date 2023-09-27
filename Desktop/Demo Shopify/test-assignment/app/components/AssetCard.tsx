// import React from 'react';
// import { useState } from 'react';

// function AssetCard({ asset, isSelected, onSelect }) {
//   const cardStyles = {
//     cursor: 'pointer',
//     border: isSelected ? '2px solid #000000' : '2px solid #ccc',
//     borderRadius: '4px',
//     padding: '16px',
//     backgroundColor: isSelected ? '#f0f0f0' : 'white',
//     marginTop: '5px',
//   };

//   const handleCardClick = () => {
//     if (!isSelected) {
//       onSelect();
//     }
//   };

//   return (
//     <div style={cardStyles} onClick={handleCardClick}>
//       <h3>Asset ID:{asset.AssetId}</h3>
//       <p>Product ID: {asset.ProductId}</p>
//       <p>Product Detail: {asset.productDetail}</p>
//       {isSelected && <p>---------This Box is Selected!----------</p>}
//     </div>
//   );
// }

// export default AssetCard;

// app/components/AssetCard.tsx

import React from 'react';

function AssetCard({ asset }) {
  const cardStyles = {
    cursor: 'pointer',
    border: '2px solid #ccc',
    borderRadius: '4px',
    padding: '16px',
    backgroundColor: 'white',
    marginTop: '5px',
  };

  return (
    <div style={cardStyles}>
      <p>Asset Key: {asset.assetKey}</p>
      <p>Theme ID: {asset.themeId}</p>
      <p>Updated At: {asset.updatedAt}</p>
    </div>
  );
}

export default AssetCard;


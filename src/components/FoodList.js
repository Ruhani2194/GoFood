// // src/components/FoodList.js

// import React from 'react';
// import Card from './Card';

// const FoodList = ({ foodItems, search }) => {
//   return (
//     <div>
//       {foodItems.length > 0 ? (
//         foodItems
//           .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
//           .map(filteredItem => (
//             <div key={filteredItem.id} className="col-12 col-md-6 col-lg-3">
//               <Card foodName={filteredItem.name} item={filteredItem} options={filteredItem.options[0]} ImgSrc={filteredItem.img} />
//             </div>
//           ))
//       ) : (
//         <div className="text-center text-light">No Such Data</div>
//       )}
//     </div>
//   );
// };

// export default FoodList;

export function storeDeliveryData(delivery) {
  return {
    type: '@delivery/STORE_DELIVERY_DATA',
    payload: delivery,
  };
}

// export function loadDeliveryRequest(id) {
//   return {
//     type: '@delivery/LOAD_DELIVERY_REQUEST',
//     payload: { id },
//   };
// }

// export function loadDeliverySucccess(deliveryData) {
//   return {
//     type: '@delivery/LOAD_DELIVERY_SUCCESS',
//     payload: { delivery: deliveryData },
//   };
// }

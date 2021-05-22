import produce from 'immer';

const INITIAL_STATE = {
  deliveryDetails: {
    // id: null,
    // product: null,
    // start_date: null,
    // end_date: null,
    // canceled_at: null,
    // created_at: null,
    // stringId: null,
    // start_date_formatted: null,
    // end_date_formatted: null,
    // status: null,
    // recipient: {
    //   id: null,
    //   name: null,
    //   phone: null,
    //   street: null,
    //   number: null,
    //   complement: null,
    //   state: null,
    //   city: null,
    //   zipcode: null,
    //   address: null,
    // },
    // deliveryman: {
    //   id: null,
    //   name: null,
    //   email: null,
    // },
    // avatar: {
    //   id: null,
    //   url: null,
    //   path: null,
    // },
    // signature: {
    //   id: null,
    //   url: null,
    //   path: null,
    // },
  },
};

export default function delivery(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@delivery/STORE_DELIVERY_DATA': {
        draft.deliveryDetails = action.payload;
        break;
      }
      default:
    }
  });
}

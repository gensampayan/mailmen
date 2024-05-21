const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return [...state, 
        { 
          id: action.payload.id, 
          image: action.payload.image,
          title: action.payload.title,
          description: action.payload.description, 
          price: action.payload.price,
          rating: action.payload.rating
        }];
    case "REMOVE_PRODUCT":
      return state.filter((item) => item.id !== action.payload);
    case "SET_CART": 
      return action.payload;
    default:
      return state;
  }
};

export default cartReducer;
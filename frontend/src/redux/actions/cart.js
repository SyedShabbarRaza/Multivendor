// add to cart
export const addTocart = (data) => async (dispatch, getState) => {
  dispatch({
    type: "addTocart",
    payload: data,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};

// remove from cart
export const removeFromcart = (data) => async (dispatch, getState) => {
  dispatch({
    type: "removeFromcart",
    payload: data._id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};
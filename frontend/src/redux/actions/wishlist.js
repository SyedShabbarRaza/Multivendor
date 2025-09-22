// add to wishlist
export const addTowishlist = (data) => async (dispatch, getState) => {
  dispatch({
    type: "addTowishlist",
    payload: data,
  });

  localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));
  return data;
};

// remove from wishlist
export const removeFromwishlist = (data) => async (dispatch, getState) => {
  dispatch({
    type: "removeFromwishlist",
    payload: data._id,
  });
  localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));
  return data;
};
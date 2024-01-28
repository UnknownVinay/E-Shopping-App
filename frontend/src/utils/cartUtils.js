export const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  //calculate items Price
  state.itemsPrice = addDecimal(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  //calculate shipping Price (if order is over $100 then free or else $10 shipping)
  state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);
  //calculate tax Price(12% tax)
  state.taxPrice = addDecimal(Number(0.15 * state.itemsPrice).toFixed(2));
  //calculate total Price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};

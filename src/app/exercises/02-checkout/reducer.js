import produce from "immer";

function reducer(state, action) {
  return produce(state, (draftState) => {
    switch (action.type) {
      case "initial-items": {
        const savedItems = window.localStorage.getItem("cart-items");

        if (savedItems === null) {
          return [];
        }

        return JSON.parse(savedItems);
      }

      case "add-item": {
        const itemIndex = state.findIndex((item) => item.id === action.item.id);

        if (itemIndex !== -1) {
          draftState[itemIndex].quantity += 1;
          window.localStorage.setItem("cart-items", JSON.stringify(draftState));
          return;
        }

        draftState.push({
          ...action.item,
          quantity: 1,
        });
        window.localStorage.setItem("cart-items", JSON.stringify(draftState));

        return;
      }

      case "delete-item": {
        const itemIndex = state.findIndex((item) => item.id === action.item.id);

        draftState.splice(itemIndex, 1);
        window.localStorage.setItem("cart-items", JSON.stringify(draftState));
        return;
      }
    }
  });
}

export default reducer;

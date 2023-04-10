const initialState = [
  {
    id: 0,
    name: "Niharika",
    number: 8106676382,
    email: "niharikachenna567@gmail.com",
  },
  {
    id: 1,
    name: "sathvika",
    number: 8106276382,
    email: "sathvikachenna@gmail.com",
  },
  {
    id: 3,
    name: "swarna",
    number: 9876543210,
    email: "swarnalathachenna@gmail.com",
  },
  {
    id: 4,
    name: "vamshi",
    number: 8309021028,
    email: "vamshikrishna@gmail.com",
  },
];

export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      state = [...state, action.payload];
      return state;
    case "UPDATE_CONTACT":
      const updateState = state.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
      state = updateState;
      return state;
    case "DELETE_CONTACT":
      const deleteState = state.filter(
        (contact) => contact.id !== action.payload && contact
      );
      state = deleteState;
      return state;
    default:
      return state;
  }
};

export const addContact = (contact) => ({
  type: "ADD_CONTACT",
  payload: contact,
});

export const editContact = (contact) => ({
  type: "EDIT_CONTACT",
  payload: contact,
});

export const deleteContact = (contact) => ({
  type: "DELETE_CONTACT",
  payload: contact,
});

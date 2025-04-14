// Redux Action Types
export const SET_USERS = 'SET_USERS';
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

// Redux Action Creators
export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users
});

export const addUser = (user) => ({
  type: ADD_USER,
  payload: { ...user, id: Date.now() }
});

export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user
});

export const deleteUser = (id) => ({
  type: DELETE_USER,
  payload: id
});
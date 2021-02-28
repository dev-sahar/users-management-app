import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [
      {
        key: '1',
        id: 123,
        username: 'Mike',
        phone: 12025550165,
        email: 'mike@gmail.com',
        country: 'United States of America',
        location: '',
        photo: '',
        breif: '',
      },
      {
        key: '2',
        id: 234,
        username: 'John',
        phone: 12025550173,
        email: 'John@gmail.com',
        country: 'United States of America',
        location: '',
        photo: '',
        breif: '',
      },
      {
        key: '3',
        id: 345,
        username: 'Jim',
        phone: 16135550194,
        email: 'Jim@gmail.com',
        country: 'Canada',
        location: '',
        photo: '',
        breif: '',
      },
      {
        key: '4',
        id: 456,
        username: 'Elsa',
        phone: 16135550143,
        email: 'Elsa@gmail.com',
        country: 'Canada',
        location: '',
        photo: '',
        breif: '',
      },
    ],
  },
  reducers: {
    addUser(state, action) {
      state.users.push(action.payload);
    },
    updateUser(state, action) {
      const {
        id,
        username,
        phone,
        email,
        country,
        location,
        photo,
        breif,
      } = action.payload;
      const existingUser = state.users.find((user) => user.id === id);
      if (existingUser) {
        existingUser.username = username;
        existingUser.phone = phone;
        existingUser.email = email;
        existingUser.country = country;
        existingUser.location = location;
        existingUser.photo = photo;
        existingUser.breif = breif;
      }
    },
    deleteUser(state, action) {
      const { id } = action.payload;
      const existingUser = state.users.find((user) => user.id === id);
      if (existingUser) {
        state.users = state.users.filter((user) => user.id !== id);
      }
    },
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;

export default usersSlice.reducer;

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteUser } from '../../redux/usersSlice';

const UsersList = () => {
  const [searchInput, setSearchInput] = useState('');

  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.users);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete user?')) {
      dispatch(deleteUser({ id }));
    } else {
      return;
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <h1>User Management App</h1>
      </div>
      <div className='row'>
        <div className='nine columns'></div>
        <div className='two columns'>
          <Link to='/add-user'>
            <button className='button-primary'>Add user</button>
          </Link>
        </div>
      </div>
      <div className='row'>
        <table className='u-full-width'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Username</th>
              <th>Phone Number</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length &&
              users.map(({ id, username, phone, country }, i) => {
                console.log(country);
                return (
                  <tr key={i}>
                    <td>{id}</td>
                    <td>{username}</td>
                    <td>{phone}</td>
                    <td>{country}</td>
                    <td>
                      <button onClick={() => handleDelete(id)}>Delete</button>
                      <Link to={`/edit-user/${id}`}>
                        <button>Edit</button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;

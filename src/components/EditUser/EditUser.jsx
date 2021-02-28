import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { useState } from 'react';
import { updateUser } from '../../redux/usersSlice';

const EditUser = () => {
  const { id } = useParams();
  const userId = parseInt(id);

  const user = useSelector((state) =>
    state.users.users.find((user) => user.id === userId)
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const [userInfo, setUserInfo] = useState({
    username: user.username,
    phone: user.phone,
    email: user.email,
    country: user.country,
    location: user.location,
    photo: user.photo || '',
    breif: user.breif || '',
  });
  const [error, setError] = useState(null);

  const { username, phone, email, country, location, photo, breif } = userInfo;

  const handleChange = ({ target: { name, value } }) => {
    setUserInfo((userInfoObj) => ({ ...userInfoObj, [name]: value }));
  };

  const handleClick = () => {
    if (username && email) {
      dispatch(
        updateUser({
          id: userId,
          username,
          phone,
          email,
          country,
          location,
          photo: photo || '',
          breif: breif || '',
        })
      );

      setError(null);
      history.push('/');
    } else {
      setError('Fill in all fields');
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <h1>Edit user</h1>
      </div>
      <div className='row'>
        <div className='three columns'>
          <label htmlFor='nameInput'>Username</label>
          <input
            className='u-full-width'
            type='text'
            placeholder='test'
            id='nameInput'
            onChange={handleChange}
            name='username'
            value={username}
          />
          <label htmlFor='emailInput'>Email</label>
          <input
            className='u-full-width'
            type='email'
            placeholder='test@mailbox.com'
            id='emailInput'
            onChange={handleChange}
            name='email'
            value={email}
          />
          {error && error}
          <button onClick={handleClick} className='button-primary'>
            Save user
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;

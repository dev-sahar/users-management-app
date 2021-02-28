import { useDispatch, useSelector } from 'react-redux';
import { useId } from 'react-id-generator';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { fetchCountries } from '../../axios/axios';
import { addUser, updateUser } from '../../redux/usersSlice';

import CurrentLocation from './CurrentLocation';

const AddUser = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const user = useSelector((state) =>
    state.users.users.find((user) => user.id === parseInt(params.id))
  );

  const [userInfo, setUserInfo] = useState({
    username: '',
    phone: '',
    email: '',
    country: '',
    location: '',
    photo: '',
    breif: '',
  });
  const [error, setError] = useState(null);

  const { username, phone, email, country, location, photo, breif } = userInfo;

  useEffect(() => {
    if (params && user) {
      setIsEditing(true);
      setUserInfo({
        username: user.username,
        phone: user.phone,
        email: user.email,
        country: user.country,
        location: user.location,
        photo: user.photo || '',
        breif: user.breif || '',
      });
    } else {
      setIsEditing(false);
    }
  }, [params, user]);

  const [userId] = useId();

  const [countries, setCountries] = useState([]);

  const fetchedCountries = async () => {
    const countries = await fetchCountries();
    setCountries(countries);
  };

  useEffect(() => {
    fetchedCountries();
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setUserInfo((userInfoObj) => ({ ...userInfoObj, [name]: value }));
  };

  const handleClick = () => {
    if (!isEditing) {
      dispatch(
        addUser({
          id: parseInt(userId.substring(2)),
          username,
          phone,
          email,
          country,
          location,
          photo: photo || '',
          breif: breif || '',
        })
      );
    } else {
      const { id } = params;
      const userId = parseInt(id);
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
    }

    setIsEditing(false);
    setError(null);
    history.push('/');
  };

  const getLocationInfo = (childData) => {
    setUserInfo((userInfoObj) => ({ ...userInfoObj, location: childData }));
  };

  return (
    <div className='container'>
      <div className='row'>
        <h1>{!isEditing ? `Add user` : `Edit user`}</h1>
      </div>
      <div className='row'>
        <div className='columns'>
          {/* USERNAME */}
          <label htmlFor='nameInput'>Username</label>
          <input
            className='u-full-width'
            type='text'
            placeholder='username'
            id='nameInput'
            onChange={handleChange}
            name='username'
            value={username}
            required
          />

          {/* PHONE NUMBER */}
          <label htmlFor='phoneInput'>Phone Number</label>
          <input
            className='u-full-width'
            type='number'
            id='phoneInput'
            onChange={handleChange}
            name='phone'
            value={phone}
            required
          />

          {/* EMAIL */}
          <label htmlFor='emailInput'>Email</label>
          <input
            className='u-full-width'
            type='email'
            placeholder='test@mailbox.com'
            id='emailInput'
            onChange={handleChange}
            name='email'
            value={email}
            required
          />

          {/* Country */}
          <label htmlFor='countryInput'>Country</label>
          <select
            className='u-full-width'
            id='countryInput'
            onChange={handleChange}
            name='country'
            value={country}
            required
          >
            {countries.map((country, index) => (
              <option key={index} name='country' value={country}>
                {country}
              </option>
            ))}
          </select>

          {/* Location */}
          <label htmlFor='locationInput'>Location</label>
          <CurrentLocation
            id='locationInput'
            country={country}
            getLocationInfo={getLocationInfo}
          />

          <button onClick={handleClick} className='button-primary'>
            {!isEditing ? `Add user` : `Save user`}
          </button>

          {error && error}
        </div>
      </div>
    </div>
  );
};

export default AddUser;

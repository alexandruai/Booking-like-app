import "./single.scss";
import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";


const Single = () => {

  const location = useLocation();
  const path = location.pathname;
  const { id } = useParams();
  const navigate = useNavigate();
  const [updated, setUpdated] = useState(false);

  const [user, setUser] = useState({
    username: "",
    email: "",
    country: "",
    img: "",
    city: "",
    phone: "",
    password: "",
    isAdmin: false,
  });

  const [hotel, setHotel] = useState({
    name: '',
    type: '',
    city: '',
    address: '',
    distance: '',
    photos: [],
    title: '',
    desc: '',
    rating: 0,
    rooms: [],
    cheapestPrice: 0,
    featured: false,
  });

  const [room, setRoom] = useState({
    title: "",
    price: 0,
    maxPeople: 0,
    desc: "",
    roomNumbers: [],
  });

  useEffect(() => {
    // Fetch hotel data from the backend based on the ID
    if (path.includes('users')) {
      axios.get(`/users/${id}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }

    if (path.includes('hotels')) {
      axios.get(`/hotels/find/${id}`)
        .then(response => {
          setHotel(response.data);
        })
        .catch(error => {
          console.error('Error fetching hotel data:', error);
        });
    }

    if (path.includes('rooms')) {
      axios.get(`/rooms/${id}`)
        .then(response => {
          setRoom(response.data);
        })
        .catch(error => {
          console.error('Error fetching hotel data:', error);
        });
    }

  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (path.includes('users')) {
      setUser({ ...user, [name]: value });
    }

    if (path.includes('hotels')) {
      setHotel(prevState => ({
        ...prevState,
        [name]: value
      }));
    }

    if (path.includes('rooms')) {
      setRoom(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (path.includes('users')) {
      // Send updated hotel data to the backend
      axios.put(`/users/${id}`, user)
        .then(response => {
          console.log('User updated successfully:', response.data);
          navigate('/users'); // Redirect to hotel list page
          setUpdated(true);
        })
        .catch(error => {
          console.error('Error updating user:', error);
        });
    }

    if (path.includes('hotels')) {
      // Send updated hotel data to the backend
      axios.put(`/hotels/${id}`, hotel)
        .then(response => {
          console.log('Hotel updated successfully:', response.data);
          navigate('/hotels'); // Redirect to hotel list page
          setUpdated(true);
        })
        .catch(error => {
          console.error('Error updating hotel:', error);
          setUpdated(false);
        });
    }

    if (path.includes('rooms')) {
      // Send updated hotel data to the backend
      axios.put(`/rooms/${id}`, room)
        .then(response => {
          console.log('Hotel updated successfully:', response.data);
          navigate('/rooms'); // Redirect to hotel list page
          setUpdated(true);
        })
        .catch(error => {
          console.error('Error updating hotel:', error);
          setUpdated(false);
        });
    }
  }

  if (path.includes('users')) {
    return (
      <div className="single">
        <Sidebar />
        <div className="singleContainer">
          <Navbar />
          <div className="top">
            <div className="left">
              <h1 className="title">Information</h1>
              <div className="item">
                <div>
                  <h2>Edit User</h2>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="name">User Id:</label>
                      <div>
                        <span id="id">{user._id}</span>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="username">Username:</label>
                      <div>
                        <input type="text" id="username" name="username" value={user.username} onChange={handleChange} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email">Email:</label>
                      <div>
                        <input type="email" id="email" name="email" value={user.email} onChange={handleChange} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="country">Country:</label>
                      <div>
                        <input type="text" id="country" name="country" value={user.country} onChange={handleChange} />
                      </div>

                    </div>
                    <div>
                      <label htmlFor="img">Image:</label>
                      <div>
                        <input type="text" id="img" name="img" value={user.img} onChange={handleChange} />
                      </div>

                    </div>
                    <div>
                      <label htmlFor="city">City:</label>
                      <div>
                        <input type="text" id="city" name="city" value={user.city} onChange={handleChange} />
                      </div>

                    </div>
                    <div>
                      <label htmlFor="phone">Phone:</label>
                      <div>
                        <input type="text" id="phone" name="phone" value={user.phone} onChange={handleChange} />
                      </div>

                    </div>
                    <div>
                      <label htmlFor="password">Password:</label>
                      <div>
                        <input type="password" id="password" name="password" value={user.password} onChange={handleChange} />
                      </div>

                    </div>
                    <div>
                      <label htmlFor="isAdmin">Admin:</label>
                      <div>
                        <input type="checkbox" id="isAdmin" name="isAdmin" checked={user.isAdmin} onChange={handleChange} />
                      </div>
                    </div>
                    <button type="submit">Update User</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom">
          </div>
        </div>
      </div>
    );
  } else if (path.includes('hotels')) {
    return (
      <div className="single">
        <Sidebar />
        <div className="singleContainer">
          <Navbar />
          <div className="top">
            <div className="left">
              <h1 className="title">Information</h1>
              <div className="item">

                <div>
                  <h2>Edit Hotel</h2>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="name">Hotel Id:</label>
                      <div>
                        <span id="id">{hotel._id}</span>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="name">Name:</label>
                      <div>
                        <input type="text" id="name" name="name" value={hotel.name} onChange={handleChange} />
                      </div>
                    </div>
                    <div>
                      <div>
                        <label htmlFor="type">Type:</label>
                      </div>
                      <div>
                        <input type="text" id="type" name="type" value={hotel.type} onChange={handleChange} />
                      </div>
                    </div>
                    <div>
                      <div>
                        <label htmlFor="type">Title:</label>
                      </div>
                      <div>
                        <input type="text" id="title" name="title" value={hotel.title} onChange={handleChange} />
                      </div>
                    </div>
                    <div>
                      <div>
                        <label htmlFor="city">City:</label>
                      </div>
                      <div>
                        <input type="text" id="city" name="city" value={hotel.city} onChange={handleChange} />
                      </div>
                    </div>
                    <p />
                    <div>
                      <button type="submit">Update Hotel</button>
                      {updated && <div>Updated</div>}
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
          <div className="bottom">
          </div>
        </div>
      </div>
    );
  } else if (path.includes('rooms')) {

    return (
      <div className="single">
        <Sidebar />
        <div className="singleContainer">
          <Navbar />
          <div className="top">
            <div className="left">
              <h1 className="title">Information</h1>
              <div className="item">

                <div>
                  <h2>Edit Room</h2>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="title">Title:</label>
                      <div>
                        <input type="text" id="title" name="title" value={room.title} onChange={handleChange} required />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="price">Price:</label>
                      <div>
                        <input type="number" id="price" name="price" value={room.price} onChange={handleChange} required />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="maxPeople">Max People:</label>
                      <div>
                        <input type="number" id="maxPeople" name="maxPeople" value={room.maxPeople} onChange={handleChange} required />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="desc">Description:</label>
                      <div>
                        <textarea id="desc" name="desc" value={room.desc} onChange={handleChange} required />
                      </div>
                    </div>
                    <div>
                      <button type="submit">Update Room</button>
                      {updated && <div>Updated</div>}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );

  } else {
    // Daca nu exista idul
    return <div>No data to display</div>;
  }
};

export default Single;
import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);
  const [hotels, setHotelList] = useState([]);
  const [saved, setSaved] = useState(false);

  const { data, loading, error } = useFetch("/hotels");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const path = "hotels";
        const { data }  = await axios.get(`/${path}`);
        await setHotelList(data);
        console.log("Ceva trebuie sa iasa")
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
      await axios.post(`/rooms/${hotelId}`, { ...info, roomNumbers });
      setSaved(true);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(info)
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="give comma between room numbers."
                />
              </div>
              <div className="formInput">
                <label>Choose a hotel</label>
                <div>

                </div>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.value)}
                >
                   {loading
                    ? "loading"
                    : hotels &&
                    hotels.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                      ))} 
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
              {saved && <div>Saved</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
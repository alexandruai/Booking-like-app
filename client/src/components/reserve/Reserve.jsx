import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./reserve.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePaymentForm from "../StripePaymentForm";

const stripePromise = loadStripe("your-stripe-public-key");

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { dates } = useContext(SearchContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/hotels/room/${hotelId}`);
        setData(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [hotelId]);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handlePaymentSuccess = async (paymentMethod) => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          return axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
            paymentMethod: paymentMethod.id,
          });
        })
      );
      setOpen(false);
      alert("Payment done. Your reservation has been saved.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("There was an error processing your reservation. Please try again.");
    }
  };

  const handleClick = async () => {
    if (paymentMethod === "cash") {
      await handlePaymentSuccess({ id: "cash" });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="rPayment">
          <span>Select payment method:</span>
          <br />
          <br />
          <select onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
          </select>
        </div>
        {paymentMethod === "card" ? (
          <Elements stripe={stripePromise}>
            <br />
            <StripePaymentForm handlePaymentSuccess={handlePaymentSuccess} />
            <br />
          </Elements>
        ) : (
          <button onClick={handleClick} className="rButton">
            Reserve Now!
          </button>
        )}
      </div>
    </div>
  );
};

export default Reserve;
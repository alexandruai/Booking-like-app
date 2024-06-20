import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useEffect, useState } from 'react';
import axios from 'axios';

const List = () => {

  const [rooms, setRooms] = useState([]);
  //hotels with booked rooms
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/rooms');
        setRooms(response.data);
        const responseHotels = await axios.get('/hotels');
        setHotels(responseHotels.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Hotel Id</TableCell>
            <TableCell className="tableCell">Hotel Name</TableCell>
            <TableCell className="tableCell">Room Id</TableCell>
            <TableCell className="tableCell">Room Number</TableCell>
            <TableCell className="tableCell">Unavailable Dates</TableCell>
            <TableCell className="tableCell">Total Price</TableCell>
            <TableCell className="tableCell">Price/Night</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>            
            <TableCell className="tableCell">City</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map((room) => (
            room.roomNumbers.map((roomNumber) => {

              if (roomNumber.unavailableDates.length > 0) {
                const hotel = hotels.find(hotel => hotel.rooms.some(hotelRooms => hotelRooms === room._id));
                if (hotel) {
                  return (
                    <TableRow key={roomNumber._id}>
                      <TableCell className="tableCell">{hotel._id}</TableCell>
                      <TableCell className="tableCell">{hotel.name}</TableCell>
                      <TableCell className="tableCell">{roomNumber._id}</TableCell>
                      <TableCell className="tableCell">{roomNumber.number}</TableCell>
                      <TableCell className="tableCell">
                        {roomNumber.unavailableDates.map(date =>
                          isNaN(new Date(date)) ? 'Invalid Date' : new Date(date).toLocaleDateString()).join(' - ')};
                      </TableCell>
                      <TableCell className="tableCell">{(room.price * roomNumber.unavailableDates.length) - 1}</TableCell>
                      <TableCell className="tableCell">{room.price}</TableCell>
                      <TableCell className="tableCell">{roomNumber.payments[0].method}</TableCell>
                      <TableCell className="tableCell">{hotel.city}</TableCell>
                    </TableRow>
                  );
                }
              }
              return null;
            })
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
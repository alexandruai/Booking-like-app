import "./datatable.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { data, loading, error } = useFetch(`/${path}`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/${path}`);
        console.log("Ceva trebuie sa iasa")
        await setList(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [path]);

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`/${path}/${id}`);
  //     setList(list.filter((item) => item._id !== id));
  //   } catch (err) { }
  // };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
      setFilteredData(filteredData.filter((item) => item._id !== id));
    } catch (err) { }
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filteredList = list.filter((item) =>
      item._id.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredList);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={path === "hotels" ? `/${path}/find/${params.row._id}` : `/${path}/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Edit</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>

      <div className="search">
        <input type="text" placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <SearchOutlinedIcon />
      </div>

      <DataGrid
        className="datagrid"
        rows={filteredData}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
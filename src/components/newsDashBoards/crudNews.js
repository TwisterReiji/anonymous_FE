import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "../newsDashBoards/crudNew.css";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from "react-router-dom";

export default function CrudNews() {

  const userRows = [
    { id: 1, name: 'Snow', email: 'quangminhpham401@gmail.com', news: "link news" },
    { id: 2, name: 'Lannister', email: 'quangminhpham401@gmail.com', news: "link news" },
    { id: 3, name: 'Lannister', email: 'quangminhpham401@gmail.com', news: "link news" },
    { id: 4, name: 'Stark', email: 'quangminhpham401@gmail.com', news: "link news" },
    { id: 5, name: 'Targaryen', email: 'quangminhpham401@gmail.com', news: "link news" },
    { id: 6, name: 'Melisandre', email: 'quangminhpham401@gmail.com', news: "link news" },
    { id: 7, name: 'Clifford', email: 'quangminhpham401@gmail.com', news: "link news" },
    { id: 8, name: 'Frances', email: 'quangminhpham401@gmail.com', news: "link news" },
    { id: 9, name: 'Roxie', email: 'quangminhpham401@gmail.com', news: "link news" },
  ];

  const [data, setData] = useState(userRows)

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'UserName', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'news', headerName: 'News', width: 200 },
    {
      field: 'action', headerName: 'Action', width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/editor/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon className="userListDelete"
              onClick={() => handleDelete(params.row.id)} />
          </>
        );
      },
    },
  ];
  return (
    <div style={{ height: 500, width: '100%' }}>
      <Link to={"/editor/" }>
        <button className="userListEdit">Set Up News</button>
      </Link>
      <DataGrid rows={data} disableSelectionOnClick columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection />
    </div>
  );
}


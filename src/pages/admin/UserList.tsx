import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { getAllUsers } from "../../lib/actions"; // Adjust path as necessary
import { User } from "../../lib/definitions";

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });

  useEffect(() => {
    getAllUsers()
      .then(response => {
        console.log("API Response:", response);
        setUsers(response);
      })
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  const columns = [
    { field: "username", headerName: "Username", width: 200 },
    { field: "bio", headerName: "Bio", width: 250 },
    { 
      field: "isActive", 
      headerName: "Status", 
      width: 100,
      renderCell: (params:  GridRenderCellParams<User>) => params.value ? 'Active' : 'Inactive'
    },
    { 
      field: "isPublic", 
      headerName: "Visibility", 
      width: 120,
      renderCell: (params:  GridRenderCellParams<User>) => params.value ? 'Public' : 'Private'
    }
  ];

  return (
    <DataGrid 
      rows={users} 
      columns={columns} 
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      pageSizeOptions={[5, 10, 20]} 
      getRowId={(row) => row.username}
    />
  );
};

export default UsersList;

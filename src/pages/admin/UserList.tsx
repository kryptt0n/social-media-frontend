import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { User } from "../../lib/definitions";

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });

  useEffect(() => {
    fetch("/api/admin/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "role", headerName: "Role", width: 150 },
  ];

  return <DataGrid rows={users} columns={columns} paginationModel={paginationModel}
  onPaginationModelChange={setPaginationModel}
  pageSizeOptions={[5, 10, 20]} />;
};

export default UsersList;

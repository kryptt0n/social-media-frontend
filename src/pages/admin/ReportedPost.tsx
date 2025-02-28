import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { Post } from "../../lib/definitions";
import { Button } from "@mui/material";

const ReportedPosts = () => {
  const [reportedPosts, setReportedPosts] = useState<Post[]>([]);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });

  useEffect(() => {
    fetch("/api/admin/reported-posts")
      .then((res) => res.json())
      .then((data) => setReportedPosts(data));
  }, []);

  const handleDelete = (postId: number) => {
    fetch(`/api/admin/posts/${postId}`, {
      method: "DELETE",
    }).then(() => {
      setReportedPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    });
  };

  const handleIgnore = (postId: number) => {
    fetch(`/api/admin/posts/${postId}/ignore`, {
      method: "POST",
    }).then(() => {
      setReportedPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    });
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "content", headerName: "Content", width: 300 },
    { field: "author", headerName: "Author", width: 200 },
    { field: "reports", headerName: "Reports", width: 100 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.id)}
            style={{ marginRight: 10 }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleIgnore(params.row.id)}
          >
            Ignore
          </Button>
        </>
      ),
    },
  ];

  return <DataGrid rows={reportedPosts} columns={columns} paginationModel={paginationModel}
  onPaginationModelChange={setPaginationModel}
  pageSizeOptions={[5, 10, 20]} />;
};

export default ReportedPosts;

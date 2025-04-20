import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {getAllReportedPost, deletePost, deactivateUser} from "../../lib/actions";


type ReportedPostRow = {
  id: number;
  content: string;
  username: string;
  imageUrl: string;
};

const ReportedPosts = () => {
  const [reportedPosts, setReportedPosts] = useState<ReportedPostRow[]>([]);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });
  
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    getAllReportedPost()
      .then(response => {
        const safePosts: ReportedPostRow[] = response.map(post => ({
          id: post.postId,
          content: post.content || 'N/A',
          username: post.username || 'N/A',
          imageUrl: post.imageUrl ? String(post.imageUrl) : 'N/A',
        }));
        setReportedPosts(safePosts);
      })
      .catch(error => console.error("Error fetching posts:", error));
  }, []);

  const handleDelete = (postId: number) => {
      deletePost(postId)
          .then(() => {
      setReportedPosts(prev => prev.filter(post => post.id !== postId));
    });
  };

  const handleDeactivate = (username: string, postId: number) => {
      deactivateUser(username)
    .then(() => {
      setReportedPosts(prev => prev.filter(post => post.id !== postId));
    });
  };

  const handleOpenModal = (url: string) => {
    setSelectedImage(url);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedImage("");
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "content", headerName: "Content", width: 300 },
    { field: "username", headerName: "Author", width: 200 },
    { 
      field: "imageUrl", 
      headerName: "Image", 
      width: 250,
      renderCell: (params: GridRenderCellParams<ReportedPostRow>) => (
        params.row.imageUrl !== 'N/A' ? (
          <Button variant="text" onClick={() => handleOpenModal(params.row.imageUrl)}>
            View Image
          </Button>
        ) : 'N/A'
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params: GridRenderCellParams<ReportedPostRow>) => (
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
            onClick={() => handleDeactivate(params.row.username, params.row.id)}
          >
            Deactivate User
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <DataGrid
        rows={reportedPosts}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20]}
      />

      <Dialog open={open} onClose={handleCloseModal} maxWidth="lg">
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 1,
              top: 1,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <img
            src={selectedImage}
            alt="Selected Post"
            style={{ width: "98%", maxHeight: "50vh", objectFit: "contain" }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReportedPosts;

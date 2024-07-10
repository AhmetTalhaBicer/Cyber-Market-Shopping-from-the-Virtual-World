import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useQuery } from "react-query";
import { getUsers } from "../../../../services/api-services/auth/users/endpoints";
import LoadingModal from "../../../../components/common/Loading";

const Customers = () => {
  const { data: users, isLoading } = useQuery("users", getUsers);

  // Columns for the DataGrid
  const columns = [
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
  ];

  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: 400,
        width: "100%",
        marginTop: 5, // Add some margin at the top
        boxShadow: 3, // Add some shadow for a better look
      }}
    >
      <DataGrid
        rows={users?.data.result || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              page: 1,
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default Customers;

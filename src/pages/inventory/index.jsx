import { useEffect, useState } from "react";
import { Grid, IconButton, Box, Stack } from "@mui/material";
import Overview from "../../components/Overview";
import DataTable from "../../components/DataTable";
import { useGetShirtsQuery, useDeleteShirtMutation, useDeleteImageMutation } from "../../services/tshirtManagementService";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import CustomDialog from "../../components/CustomDialog";
import Searchbar from "../../components/Searchbar";
import OtherActions from "./OtherActions";

export default function Inventory() {
  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, refetch } = useGetShirtsQuery({
    pageIndex: pageIndex * rowsPerPage,
    rowsPerPage,
    searchByName: searchParams.get("search") ?? "",
  });
  
  const [deleteShirt] = useDeleteShirtMutation();
  const [deleteImage] = useDeleteImageMutation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  const columns = [
    {
      label: "Image", formatter: (params) => {
        return (
          <Box component="img" src={params.productImageUrl} sx={{
            width: 80,
            height: "auto",
          }} />
        )
      }
    },
    { id: "name", label: "Name" },
    { id: "design", label: "Design" },
    { id: "size", label: "Size" },
    { id: "color", label: "Color" },
    { id: "unitPrice", label: "Unit Price" },
    { id: "quantityInStock", label: "Quantity in Stock" },
    { id: "categoryName", label: "Category Name", formatter: (params) => {
      return params.category.name;
    }},
    {label: "Actions", formatter: (params) => {
      return (
          <>
          <IconButton onClick={() => {
             navigate(`edit-product/${params.id}`);
          }}>
              <Edit color="secondary" />
          </IconButton>
          <IconButton onClick={() => {
              setOpen(true);
              setId(params.id);
          }}>
              <Delete color="error"/>
          </IconButton>
          </>
      )
  }}
  ];

  const handleChangePage = (event, newPage) => {
    setPageIndex(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPageIndex(0);
  };

  const handleProductDelete = async () => {
    if(!id) return;

    try
    {
      await deleteImage(id);
      await deleteShirt(id);
      refetch();
      setId(null);
      setOpen(false);
    }
    catch(err)
    {
      console.error(err);
    }
  }

  const handleSearchChangeEnd = (value) => {
    setSearchParams({search: value});
  }

  useEffect(() => {
    refetch();
  }, [refetch, pageIndex, rowsPerPage]);

  return (
    <>
      <CustomDialog
        open={open}
        description="This action will delete the product. Do you want to proceed?"
        icon={<Delete color="error" fontSize={"large"} />}
        onConfirm={handleProductDelete}
        onClose={() => setOpen(false)}
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Overview
            overviews={[
              {
                label: "Total T-shirt",
                value: 100,
                sx: { bgcolor: "#f07b53" },
              },
              {
                label: "Total Categories",
                value: 3,
                sx: { bgcolor: "#f4b168" },
              },
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="flex-end" gap={2}>
            <Searchbar onChangeEnd={handleSearchChangeEnd} searchAfter={500} />
            <OtherActions />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          {
              data && 
            data && 
              data && 
              <DataTable
                columns={columns}
                withPagination={true}
                rows={data.tshirts}
                pageIndex={pageIndex}
                rowsPerPage={rowsPerPage}
                total={data.total}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
          }
        </Grid>
      </Grid>
    </>
  );
}

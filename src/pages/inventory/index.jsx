import { useEffect, useState } from "react";
import { Grid, IconButton, Box, Stack } from "@mui/material";
import Overview from "../../components/Overview";
import DataTable from "../../components/DataTable";
import {
  useGetShirtsQuery,
  useDeleteShirtMutation,
  useDeleteImageMutation,
} from "../../services/tshirtManagementService";
import { Delete, Edit, Inventory2 } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import CustomDialog from "../../components/CustomDialog";
import Searchbar from "../../components/Searchbar";
import OtherActions from "./OtherActions";

import QuantityManager from "./QuantityManager";

export default function Inventory() {
  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [productName, setProductName] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, refetch } = useGetShirtsQuery({
    pageIndex: pageIndex * rowsPerPage,
    rowsPerPage,
    searchByName: productName,
  });
  
  const [deleteShirt] = useDeleteShirtMutation();
  const [deleteImage] = useDeleteImageMutation();
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openQuantityEditor, setOpenQuantityEditor] = useState(false);
  const [id, setId] = useState(null);
  const [product, setProduct] = useState(null);

  const columns = [
    {
      label: "Image",
      formatter: (params) => {
        return (
          <Box
            component="img"
            src={params.productImageUrl}
            sx={{
              width: 80,
              height: "auto",
            }}
          />
        );
      },
    },
    { id: "name", label: "Name" },
    { id: "design", label: "Design" },
    { id: "size", label: "Size" },
    { id: "color", label: "Color" },
    { id: "unitPrice", label: "Unit Price" },
    { id: "quantityInStock", label: "Quantity in Stock" },
    {
      id: "categoryName",
      label: "Category Name",
      formatter: (params) => {
        return params.category.name;
      },
    },
    {
      label: "Actions",
      formatter: (params) => {
        return (
          <>
            <IconButton
              onClick={() => {
                setProduct(params);
                setOpenQuantityEditor(true);
              }}
            >
              <Inventory2 color="secondary" />
            </IconButton>
            <IconButton
              onClick={() => {
                navigate(`edit-product/${params.id}`);
              }}
            >
              <Edit color="secondary" />
            </IconButton>
            <IconButton
              onClick={() => {
                setOpenDeleteDialog(true);
                setId(params.id);
              }}
            >
              <Delete color="error" />
            </IconButton>
          </>
        );
      },
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPageIndex(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPageIndex(0);
  };

  const handleProductDelete = async () => {
    if (!id) return;

    try {
      await deleteImage(id);
      await deleteShirt(id);
      refetch();
      setId(null);
      setOpenDeleteDialog(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearchChangeEnd = (value) => {
    setProductName(value);
  };

  useEffect(() => {
    setProductName(searchParams.get("search") ?? "");
  }, []);

  useEffect(() => {
    if (productName.length > 0) setSearchParams({ search: productName });
    else setSearchParams({});
  }, [productName]);

  useEffect(() => {
    refetch();
  }, [refetch, pageIndex, rowsPerPage]);

  return (
    <>
      <CustomDialog
        open={openDeleteDialog}
        description="This action will delete the product. Do you want to proceed?"
        icon={<Delete color="error" fontSize={"large"} />}
        onConfirm={handleProductDelete}
        onClose={() => setOpenDeleteDialog(false)}
      />
      {
        product &&
        <QuantityManager
          open={openQuantityEditor}
          productImage={product.productImageUrl}
          productQuantity={product.quantityInStock}
          productName={product.name}
          onClose={() => setOpenQuantityEditor(false)}
        />
      }
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Overview
            overviews={[
              {
                label: "Total T-shirt",
                value: data ? data.total : "--",
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
            <Searchbar
              value={productName}
              onChangeEnd={handleSearchChangeEnd}
              searchAfter={500}
              placeholder="Search Name"
            />
            <OtherActions />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          {data && data && data && (
            <DataTable
              columns={columns}
              withPagination={true}
              rows={data.tshirts}
              pageIndex={pageIndex}
              rowsPerPage={rowsPerPage}
              total={data.totalQuery}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}

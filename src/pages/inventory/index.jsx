import { useEffect, useState } from "react";
import { Grid, IconButton, Box, Stack, Skeleton } from "@mui/material";
import Overview from "../../components/Overview";
import DataTable from "../../components/DataTable";
import {
  useGetShirtsQuery,
  useDeleteShirtMutation,
  useDeleteImageMutation,
  useUpdateQuantityMutation,
} from "../../services/tshirtManagementService";
import { Delete, Edit, Inventory2 } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import CustomDialog from "../../components/CustomDialog";
import Searchbar from "../../components/Searchbar";
import OtherActions from "./OtherActions";

import QuantityManager from "./QuantityManager";

import { useDispatch } from "react-redux";
import { setBarLoading } from "../../globalSlice";

import { enqueueSnackbar } from 'notistack'

export default function Inventory() {
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [productName, setProductName] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, refetch, isFetching, isLoading } = useGetShirtsQuery({
    pageIndex: pageIndex * rowsPerPage,
    rowsPerPage,
    searchByName: productName,
  });
  
  const [deleteShirt] = useDeleteShirtMutation();
  const [deleteImage] = useDeleteImageMutation();
  const [updateQuantity] = useUpdateQuantityMutation();
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
      dispatch(setBarLoading(true));
      await deleteImage(id);
      await deleteShirt(id);
      dispatch(setBarLoading(false));
      refetch();
      setId(null);
      setOpenDeleteDialog(false);
      enqueueSnackbar("Product deleted sucessfully", { variant: "success" });
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Can't delete product", { variant: "error" });
      dispatch(setBarLoading(false));
    }
  };

  const handleQuantityUpdate = (newQuantity) => {
    const payload = {
      id: product.id,
      model: {
        quantity: newQuantity
      },
    };

    updateQuantity(payload).then(resp => {
      refetch();
      setProduct(null);
      setOpenQuantityEditor(false);
      enqueueSnackbar("Quantity updated sucessfully", { variant: "success" });
    })
    .catch(err => {
      console.error(err);
      enqueueSnackbar("Can't update quantity", { variant: "error" });
    })
  }

  const handleSearchChangeEnd = (value) => {
    setProductName(value);
  };

  useEffect(() => {
    dispatch(setBarLoading(isLoading));

    if(!isLoading && !data)
    {
      enqueueSnackbar("Can't load products", { variant: 'error' })
    }

  }, [isLoading]);

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
          onQuantityUpdate={handleQuantityUpdate}
          onClose={() => setOpenQuantityEditor(false)}
        />
      }
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {
            data ? 
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
            : <Skeleton variant="rectangular" animation="wave" width={400} height={100}/>
          }
        </Grid>
        <Grid item xs={12}>
          {
            !isLoading && data ? 
            <Stack direction="row" justifyContent="flex-end" gap={2}>
              <Searchbar
                value={productName}
                onChangeEnd={handleSearchChangeEnd}
                searchAfter={500}
                placeholder="Search Name"
              />
              <OtherActions />
            </Stack>
            : 
            <Stack direction="row" justifyContent="flex-end" gap={2}>
              <Skeleton variant="rectangular" animation="wave" width={200} height={40}/>
              <Skeleton variant="rectangular" animation="wave" width={150} height={40}/>
            </Stack>
          }
        </Grid>
        <Grid item xs={12}>
          {!isFetching && data ? (
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
          )
          : <Skeleton variant="rectangular" animation="wave" height={300} />
        }
        </Grid>
      </Grid>
    </>
  );
}

import { useState, useEffect } from "react";
import StatCard from "../../components/StatCard";
import {
  Button,
  Grid,
  Stack,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Add, FilterAlt, Info } from "@mui/icons-material";
import Searchbar from "../../components/Searchbar";
import DataTable from "../../components/DataTable";
import {
  useGetTshirtOrdersQuery,
  useUpdateOrderStatusMutation,
  useCreateOrderMutation,
} from "../../services/orderManagementService";
import InfoModal from "../../components/InfoModal";
import CreateOrder from "./CreateOrder";
import { useSearchParams } from "react-router-dom";

export default function Sales() {
  const [infoOpen, setInfoOpen] = useState(false);
  const [customer, setCustomer] = useState({});
  const [currentStatus, setCurrentStatus] = useState(5);
  const [productId, setProductId] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const { data, refetch } = useGetTshirtOrdersQuery({
    searchByProductId: productId,
    statusId: currentStatus,
  });

  const [updateStatus] = useUpdateOrderStatusMutation();
  const [createOrder] = useCreateOrderMutation();
  const [createOrderOpen, setCreateOrderOpen] = useState(false);

  const status = [
    { id: 1, label: "Queue" },
    { id: 2, label: "Processed" },
    { id: 3, label: "Shipped" },
    { id: 4, label: "Delivered" },
    { id: 5, label: "All" },
  ];

  const columns = [
    { id: "productId", label: "Product Id" },
    {
      id: "tshirt",
      label: "Name",
      formatter: (params) => {
        return params.tshirt.name;
      },
    },
    {
      id: "tshirt",
      label: "Size",
      formatter: (params) => {
        return params.tshirt.size;
      },
    },
    {
      id: "tshirt",
      label: "Color",
      formatter: (params) => {
        return params.tshirt.color;
      },
    },
    { id: "unitPrice", label: "Unit Price" },
    { id: "quantity", label: "Quantity" },
    {
      id: "tshirt",
      label: "Category",
      formatter: (params) => {
        return params.tshirt.category.name;
      },
    },
    {
      label: "Status",
      align: "center",
      formatter: (params) => {
        return (
          <Select
            value={params.status.id}
            onChange={(e) =>
              handleStatusChange(params.productId, e.target.value)
            }
            size="small"
            sx={{
              width: 130,
            }}
          >
            {status.map((status) => (
              <MenuItem key={status.id} value={status.id}>
                {status.label}
              </MenuItem>
            ))}
          </Select>
        );
      },
    },
    {
      label: "Info",
      align: "center",
      formatter: (params) => {
        return (
          <IconButton
            color="primary"
            onClick={() => handleClickInfo(params.order.customer)}
          >
            <Info />
          </IconButton>
        );
      },
    },
  ];

  const handleClickInfo = (customer) => {
    setCustomer(customer);
    setInfoOpen(true);
  };

  const handleStatusChange = (productId, statusId) => {
    const payload = {
      id: productId,
      model: {
        statusId,
      },
    };
    updateStatus(payload).then((resp) => {
      refetch();
    });
  };

  const handleFilterStatusChange = (e) => {
    setCurrentStatus(e.target.value);
  };

  const handleCreateOrder = (customer, product, quantity) => {
    const payload = {
      id: customer.id,
      model: {
        orderNumber: 0,
        paymentMethod: "gcash",
        tshirtRequests: [
          {
            tshirtId: product.id,
            quantity: quantity,
          },
        ],
      },
    };

    createOrder(payload).then((resp) => {
      console.log("Order Created!");
      refetch();
      setCreateOrderOpen(false);
    });
  };

  const handleSearchChangeEnd = (value) => {
    setProductId(value);
  };

  useEffect(() => {
    const query = {};

    if(productId.length > 0) 
      query["searchByProductId"] = productId;

    query["statusId"] = currentStatus;

    setSearchParams(query);
    refetch();
  }, [productId, currentStatus]);

  useEffect(() => {
    setProductId(searchParams.get("searchByProductId") ?? "");
    setCurrentStatus(searchParams.get("statusId") ?? 5);
  }, []);

  return (
    <>
      <Stack spacing={2}>
        <Grid container>
          <Grid item xs={6}>
            <StatCard
              label="Total Sales"
              value={data && data.length}
              sx={{
                bgcolor: "success.light",
                maxWidth: 200,
              }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-start"
          >
            <Button
              variant="contained"
              startIcon={<Add />}
              color="secondary"
              sx={{
                textTransform: "capitalize",
              }}
              onClick={() => setCreateOrderOpen(true)}
            >
              Create Order
            </Button>
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Searchbar value={productId} onChangeEnd={handleSearchChangeEnd} searchAfter={500} placeholder="Search Product Id" />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currentStatus}
              label="Filter"
              onChange={handleFilterStatusChange}
              startAdornment={
                <InputAdornment position="start">
                  <FilterAlt />
                </InputAdornment>
              }
              size="small"
            >
              {status.map((status) => (
                <MenuItem key={status.id} value={status.id}>
                  {status.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <DataTable columns={columns} rows={data} />
      </Stack>
      <InfoModal
        title="Customer Info"
        info={customer}
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
      />
      <CreateOrder
        open={createOrderOpen}
        onCreateOrder={handleCreateOrder}
        onClose={() => setCreateOrderOpen(false)}
      />
    </>
  );
}

import { useState, useEffect } from "react";
import {
  Button,
  Stack,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  InputAdornment,
  IconButton,
  Skeleton,
} from "@mui/material";
import { Add, FilterAlt, Info } from "@mui/icons-material";
import Searchbar from "../../components/Searchbar";
import DataTable from "../../components/DataTable";
import {
  useGetTshirtOrdersQuery,
  useUpdateOrderStatusMutation,
  useCreateOrderMutation,
  useGetSaleSummaryQuery,
  useGetSaleSummaryTriggerMutation,
} from "../../services/orderManagementService";
import InfoModal from "../../components/InfoModal";
import CreateOrder from "./CreateOrder";
import { useSearchParams } from "react-router-dom";

import SaleSummary from "./SaleSummary";

import { useDispatch } from "react-redux";
import { setBarLoading } from "../../globalSlice";

import { enqueueSnackbar, closeSnackbar } from 'notistack'

export default function Sales() {
  const dispatch = useDispatch();
  const [infoOpen, setInfoOpen] = useState(false);
  const [customer, setCustomer] = useState({});
  const [currentStatus, setCurrentStatus] = useState(1);
  const [productId, setProductId] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const { data, refetch, isFetching: isFetchingTshirtOrders, isLoading: isLoadingTshirtOrders } = useGetTshirtOrdersQuery({
    searchByProductId: productId,
    statusId: currentStatus,
  });
  const {
    data: saleSummaryData,
    isFetching: isSaleSummaryFetching,
    isLoading: isSaleSummaryLoading,
    refetch: saleSummaryRefetch,
  } = useGetSaleSummaryQuery();
  const [getSaleSummary] = useGetSaleSummaryTriggerMutation();

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
      saleSummaryRefetch();
      const statusName = status.find(item => item.id === statusId)?.label;
      enqueueSnackbar(`Order successlly moved to ${statusName}`, { variant: "success" });
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

    dispatch(setBarLoading(true));
    createOrder(payload).then((resp) => {
      setCreateOrderOpen(false);
      dispatch(setBarLoading(false));
      
      if(resp.error)
      {
        enqueueSnackbar(resp.error.data, { variant: "error" });
        return;
      }

      refetch();
      saleSummaryRefetch();
      enqueueSnackbar("Order created sucessfuly", { variant: "success" });
    })
    .catch(err => {
      console.err(err);
      dispatch(setBarLoading(false));
      enqueueSnackbar("Can't create order", { variant: "error" });
    })
  };

  const handleSearchChangeEnd = (value) => {
    setProductId(value);
  };

  useEffect(() => {
    dispatch(setBarLoading(isLoadingTshirtOrders || isSaleSummaryLoading));

    if(!isLoadingTshirtOrders && !isSaleSummaryLoading && !data && !saleSummaryData)
    {
      enqueueSnackbar("Can't fetch sales", { variant: "error" });
    }

  }, [isLoadingTshirtOrders, isSaleSummaryLoading]);

  useEffect(() => {
    const query = {};

    if (productId.length > 0) query["searchByProductId"] = productId;

    query["statusId"] = currentStatus;

    setSearchParams(query);
    refetch();
  }, [productId, currentStatus]);

  useEffect(() => {
    setProductId(searchParams.get("searchByProductId") ?? "");

    setCurrentStatus(searchParams.get("statusId") ?? 1);
  }, []);

  return (
    <>
      <Stack spacing={3}>
        <SaleSummary
          data={saleSummaryData}
        />
        {data ? (
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Searchbar
              value={productId}
              onChangeEnd={handleSearchChangeEnd}
              searchAfter={500}
              placeholder="Search Product Id"
            />
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
          </Stack>
        ) : (
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={400}
              height={40}
            />
          </Stack>
        )}

        {
          !isFetchingTshirtOrders && data ?
            <DataTable columns={columns} rows={data} />
          : 
          <Skeleton
              variant="rectangular"
              animation="wave"
              width="100%"
              height={300}
            />
        }
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

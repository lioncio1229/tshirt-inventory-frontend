import { useState } from "react";
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
} from "@mui/material";
import { Add, FilterAlt, Person } from "@mui/icons-material";
import Searchbar from "../../components/Searchbar";
import DataTable from "../../components/DataTable";
import { useGetTshirtOrdersQuery, useUpdateOrderStatusMutation } from "../../services/orderManagementService";

export default function Sales() {
  const [currentStatus, setCurrentStatus] = useState(1);
  const {data, refetch} = useGetTshirtOrdersQuery();
  const [updateStatus] = useUpdateOrderStatusMutation();

  const status = [
    { id: 1, label: "Queue" },
    { id: 2, label: "Processed" },
    { id: 3, label: "Shipped" },
    { id: 4, label: "Delivered" },
  ];

  const columns = [
    { id: "productId", label: "Product Id" },
    { id: "tshirt", label: "Name", formatter: (params) => {
      return params.tshirt.name;
    }},
    { id: "tshirt", label: "Size", formatter: (params) => {
      return params.tshirt.size;
    }},
    { id: "tshirt", label: "Color", formatter: (params) => {
      return params.tshirt.color;
    }},
    { id: "unitPrice", label: "Unit Price" },
    { id: "quantity", label: "Quantity" },
    { id: "tshirt", label: "Category", formatter: (params) => {
      return params.tshirt.category.name;
    }},
    { label: "Status", formatter: (params) => {
      return (
        <Select
            value={params.status.id}
            onChange={(e) => handleStatusChange(params.productId, e.target.value)}
            size="small"
            sx={{
              width: 130
            }}
          >
            {status.map((status) => (
              <MenuItem key={status.id} value={status.id}>
                {status.label}
              </MenuItem>
            ))}
          </Select>
      )
    }}
  ];

  const handleStatusChange = (productId, statusId) => {
    const payload = {
      id: productId,
      model: {
        statusId
      },
    }
    updateStatus(payload).then(resp => {
      refetch();
    });
  }

  const handleFilterStatusChange = (e) => {
    setCurrentStatus(e.target.value);
  };

  return (
    <Stack spacing={2}>
      <Grid container>
        <Grid item xs={6}>
          <StatCard
            label="Total Sales"
            value={30}
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
          >
            Create Order
          </Button>
        </Grid>
      </Grid>
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Searchbar/>
        <FormControl sx={{minWidth: 200}}>
          <InputLabel id="demo-simple-select-label">Filter</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentStatus}
            label="Filter"
            onChange={handleFilterStatusChange}
            startAdornment={
                <InputAdornment position="start">
                    <FilterAlt/>
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
      <DataTable
        columns={columns}
        rows={data}
      />
    </Stack>
  );
}

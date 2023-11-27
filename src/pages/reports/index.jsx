import { useEffect } from "react";
import { Stack, Typography, Skeleton, Box, Button } from "@mui/material";
import Statcard from "../../components/StatCard";
import AnalyticsChart from "./AnalyticsChart";
import {
  useGetSummaryQuery,
  useGetTopProductsQuery,
} from "../../services/analyticsService";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setBarLoading } from "../../globalSlice";
import DataTable from "../../components/DataTable";

export default function Reports() {
  const dispatch = useDispatch();
  const {
    data: summary,
    isFetching,
    isLoading,
    refetch: refetchSummary,
  } = useGetSummaryQuery();

  const {
    data: topProducts,
    isFetching: isFetchingTopProducts,
    isLoading: isLoadingTopProducts,
    refetch: refetchTopProducts,
  } = useGetTopProductsQuery();

  const navigate = useNavigate();

  const columns = [
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
    {
      id: "tshirt",
      label: "Category",
      formatter: (params) => {
        return params.tshirt.unitPrice;
      },
    },
    {
      id: "tshirt",
      label: "Category",
      formatter: (params) => {
        return params.tshirt.category.name;
      },
    },
    {
      id: "tshirt",
      label: "Action",
      formatter: (params) => {
        return (
          <Button
            sx={{ textTransform: "capitalize", fontSize: 11 }}
            variant="outlined"
            size="small"
            onClick={() => searchProductInInventory(params.tshirt.name)}
          >
            Search in inventory
          </Button>
        );
      },
    },
  ];

  const searchProductInInventory = (name) => {
    navigate(`/main?search=${name}`);
  };

  useEffect(() => {
    dispatch(setBarLoading(isLoading || isLoadingTopProducts));
  }, [isLoading, isLoadingTopProducts]);

  useEffect(() => {
    refetchSummary();
    refetchTopProducts();
  }, []);

  return (
    <>
      <Stack flexDirection="row" gap={2} mb={2}>
        {!isFetching && summary ? (
          <Statcard
            label="Total Sales"
            value={summary.totalSales}
            sx={{ bgcolor: "primary.main" }}
          />
        ) : (
          <Skeleton width={200} height={100} animation="wave" />
        )}
        {!isFetching && summary ? (
          <Statcard
            label="Revenue"
            value={"P " + summary.revenue}
            sx={{ bgcolor: "success.light" }}
          />
        ) : (
          <Skeleton width={200} height={100} animation="wave" />
        )}
        {/* <Statcard label="Total Products" value={10} sx={{bgcolor: "secondary.dark"}}/> */}
      </Stack>
      <Box>
        <Typography
          fontWeight="600"
          fontSize={20}
          color="primary"
          sx={{ mb: 2 }}
        >
          Top Products
        </Typography>
        {/* {!isFetchingTopProducts && topProducts ? (
          <List sx={{ mt: 1 }}>
          {topProducts.map((item, i) => (
            <ListItem key={i} sx={{ p: 0, pb: 2, color: "grey.800" }}>
              <ListItemText primary={`${i + 1}. ${item.tshirt.name}`} />
              <Button
                sx={{ textTransform: "capitalize", fontSize: 11 }}
                variant="outlined"
                size="small"
                onClick={() => searchProductInInventory(item.tshirt.name)}
              >
                Search in inventory
              </Button>
            </ListItem>
          ))}
        </List>
        ) : (
          
          <Skeleton width="100%" height={200} animation="wave" />
        )} */}

        {!isFetching && topProducts ? (
          <DataTable columns={columns} rows={topProducts} />
        ) : (
          <Skeleton variant="rectangular" animation="wave" height={300} />
        )}
      </Box>
    </>
  );
}

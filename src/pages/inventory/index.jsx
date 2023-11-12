import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Overview from "../../components/Overview";
import Menu from "./Menu";
import DataTable from "../../components/DataTable";
import { useGetShirtsQuery } from "../../services/tshirtManagementService";

export default function Inventory() {
  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data, refetch } = useGetShirtsQuery({ pageIndex: pageIndex * rowsPerPage, rowsPerPage });

  const columns = [
    { id: "name", label: "Name" },
    { id: "design", label: "Design" },
    { id: "size", label: "Size" },
    { id: "color", label: "Color" },
    { id: "unitPrice", label: "Unit Price" },
    { id: "quantityInStock", label: "Quantity in Stock" },
    { id: "categoryName", label: "Category Name" },
  ];

  const menus = [
    {label: "Edit", onClick : (id) => {
      console.log("Edit product: " + id);
    }},
    {label: "Delete", onClick : (id) => {
      console.log("Delete product");
    }}
  ]

  const handleChangePage = (event, newPage) => {
    setPageIndex(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPageIndex(0);
  };

  useEffect(() => {
    refetch();
  }, [refetch, pageIndex, rowsPerPage]);

  return (
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
        <Menu />
      </Grid>
      <Grid item xs={12}>
        {
            data && 
            <DataTable
              columns={columns}
              menus={menus}
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
  );
}

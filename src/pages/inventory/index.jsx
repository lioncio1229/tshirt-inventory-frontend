import { Grid } from "@mui/material";
import Overview from "../../components/Overview";
import Menu from "./Menu";
import DataTable from "../../components/DataTable";
import { useGetShirtsQuery } from "../../services/tshirtManagementService";

export default function Inventory() {

    const {data} = useGetShirtsQuery();

  const columns = [
    { id: "name", label: "Name" },
    { id: "design", label: "Design" },
    { id: "size", label: "Size" },
    { id: "color", label: "Color" },
    { id: "unitPrice", label: "Unit Price" },
    { id: "quantityInStock", label: "Quantity in Stock" },
    { id: "categoryName", label: "Category Name" },
  ];

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
        <DataTable columns={columns} rows={data}/>
      </Grid>
    </Grid>
  );
}

import { useEffect, useState } from "react";
import { Grid, IconButton, Menu, MenuItem, Stack  } from "@mui/material";
import Overview from "../../components/Overview";
import {default as MenuBar} from "./Menu";
import DataTable from "../../components/DataTable";
import { useGetShirtsQuery, useDeleteShirtMutation } from "../../services/tshirtManagementService";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import CustomDialog from "../../components/CustomDialog";

export default function Inventory() {
  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data, refetch } = useGetShirtsQuery({ pageIndex: pageIndex * rowsPerPage, rowsPerPage });
  const [deleteShirt] = useDeleteShirtMutation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const [targetRow, setTargetRow] = useState(null);
  const anchorOpen = Boolean(anchorEl);

  const handleClick = (e, row) => {
    setAnchorEl(e.currentTarget);
    setTargetRow(row);
  };
  const handleClose = (menu) => {
    setAnchorEl(null);
    menu.onClick && menu.onClick(targetRow);
  };

  const columns = [
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
        <IconButton onClick={(e) => handleClick(e, params)}>
          <MoreVert />
        </IconButton>
      )
    }}
  ];

  const menus = [
    {label: "Edit", icon: <Edit color="primary"/>, onClick : (params) => {
      navigate(`edit-product/${params.id}`);
    }},
    {label: "Delete", icon: <Delete color="error"/>, onClick : (params) => {
      setOpen(true);
      setId(params.id);
    }}
  ]

  const handleChangePage = (event, newPage) => {
    setPageIndex(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPageIndex(0);
  };

  const handleProductDelete = () => {
    if(!id) return;

    deleteShirt(id).then(resp => {
      refetch();
      setId(null);
      setOpen(false);
    });
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
          <MenuBar />
        </Grid>
        <Grid item xs={12}>
          {
              data && 
            data && 
              data && 
              <DataTable
                columns={columns}
                menus={menus}
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
      <Menu anchorEl={anchorEl} open={anchorOpen} onClose={handleClose}>
        {
          menus.map((menu, i) => (
            <MenuItem key={i} onClick={() => handleClose(menu)} sx={{minWidth: 150}}>
              <Stack direction="row" gap={2}>
                {menu.icon}
                {menu.label}
              </Stack>
            </MenuItem>
          ))
        }
      </Menu>
    </>
  );
}

import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { IconButton, Menu, MenuItem, Stack } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

export default function DataTable({
  columns,
  rows,
  withPagination,
  pageIndex,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  total,
  menus=[],
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [targetRow, setTargetRow] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e, row) => {
    setAnchorEl(e.currentTarget);
    setTargetRow(row);
  };
  const handleClose = (menu) => {
    setAnchorEl(null);
    menu.onClick && menu.onClick(targetRow);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {
        withPagination &&
        <TablePagination
          rowsPerPageOptions={[10, 20, 50, 100]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={pageIndex}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      }
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns &&
                columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((row, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    {columns.map((column, j) => {
                      if(!column.id)
                      {
                        return (
                          <TableCell key={j} align={column.align}>
                            {column.formatter(row)}
                          </TableCell>
                        )
                      }

                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.formatter ? column.formatter(row) : value}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <IconButton onClick={(e) => handleClick(e, row)}>
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {
        withPagination &&
        <TablePagination
          rowsPerPageOptions={[10, 20, 50, 100]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={pageIndex}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      }
      {
        menus.length > 0 &&
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
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
      }
    </Paper>
  );
}

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

export default function DataTable({
  columns,
  rows,
  withPagination,
  pageIndex,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  total,
}) {
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
                columns.map((column, i) => (
                  <TableCell
                    key={i}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
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
    </Paper>
  );
}

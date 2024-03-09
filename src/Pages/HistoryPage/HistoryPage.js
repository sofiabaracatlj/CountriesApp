import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./HistoryPage.css";
import { useDispatch } from "react-redux";
import { update } from "../../GlobalStore/SearchState";
import { ArrowBack } from "@mui/icons-material";

const HistoryPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //GlobalState
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleClick = (text = "") => {
    if (text) dispatch(update(text));
    navigate("/");
  };

  //Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Build table
  const columns = [
    { id: "date", label: "Date", minWidth: 50 },
    { id: "text", label: "Search", minWidth: 100 },
    { id: "actions", label: "Open Search", minWidth: 50 },
  ];
  var rows = [];

  getHistory();

  function getHistory() {
    rows = JSON.parse(localStorage.getItem("history"));
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  }

  function getCell(columnId, row) {
    const value = row[columnId];
    switch (columnId) {
      case "date":
        return formatDate(value);
      case "actions":
        return (
          //   <Link to="/">
          <Button
            onClick={() => handleClick(row["text"])}
            color="primary"
            variant="contained"
          >
            Search Again
          </Button>
          //   </Link>
        );
      default:
        return value;
    }
  }

  return (
    <div className="container">
      <IconButton
        onClick={() => handleClick()}
        color="dark"
        variant="contained"
      >
        <ArrowBack />
      </IconButton>
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    minWidth={column.minWidth}
                    width={column.width}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                    >
                      {columns.map((column) => {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {getCell(column.id, row)}
                            {/* {column.id === "date" ? formatDate(value) : value} */}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default HistoryPage;

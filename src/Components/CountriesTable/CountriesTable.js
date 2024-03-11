import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const CountriesTable = ({ countries }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  //Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Build Table
  const rows = [];
  const columns = [
    { id: "flag", label: "", minWidth: 30 },
    { id: "name", label: "Name", minWidth: 100 },
    { id: "capital", label: "Capital", minWidth: 100 },
    {
      id: "population",
      label: "Population",
      minWidth: 50,
      align: "left",
    },
    {
      id: "currency",
      label: "Currency",
      minWidth: 50,
      width: 50,
      align: "left",
    },
    {
      id: "language",
      label: "Language",
      minWidth: 100,
      align: "left",
    },
  ];

  createRows();

  function getCurrencies(currencies){
    let currency;
    if(currencies){
      for (const [key, currencyInfo] of Object.entries(currencies)) {
        currency = currency ? currencyInfo + `\n${currencyInfo.name} ${currencyInfo.symbol}` : 
        `${currencyInfo.name} ${currencyInfo.symbol}`;
      }
      return currency
    }
  }
  function getLanguages(languages){
    let language;
    if(languages){
      for (const [key, languageInfo] of Object.entries(languages)) {
        language = language ? `\n${languageInfo}` : 
        `${languageInfo}`;
      }
      return language
    }
  }

  function createRows() {
    countries.forEach((country) => {
      rows.push(
        {
          flag: country.flags.png,
          name: country.name.common,
          capital: country.capital,
          population: country.population.toLocaleString("pt-BR"),
          currency: getCurrencies(country.currencies),
          language: getLanguages(country.languages)
        }
      );
    });
  }

  return (
    (
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
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "flag"
                              ? <img width={40} src={value}/>
                              : value}
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
    )
  );
};

export default CountriesTable;

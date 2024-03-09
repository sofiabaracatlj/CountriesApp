import * as React from "react";
import "./CountriesGrid.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Pagination } from "@mui/material";
import CountryCard from "../CountryCard/CountryCard";

const CountriesGrid = ({ countries }) => {
  const [page, setPage] = React.useState(1);
  const itensPerPage = 9;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {countries.length > 9
            ? countries
                .slice(
                  (page - 1) * itensPerPage,
                  (page - 1) * itensPerPage + itensPerPage
                )
                .map((country, index) => (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <CountryCard country={country}></CountryCard>
                  </Grid>
                ))
            : countries.map((country, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <CountryCard country={country}></CountryCard>
                </Grid>
              ))}
        </Grid>
      </Box>
      <div className="pagination-box">
        <Pagination
          count={Math.floor(countries.length / itensPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
};

export default CountriesGrid;

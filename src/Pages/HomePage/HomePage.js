import React, { useEffect, useState } from "react";
import { TableView, GridView, Search, History } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import "./HomePage.css";
import { getAll, getByName } from "../../Services/CountriesService";
import CountriesTable from "../../Components/CountriesTable/CountriesTable";
import {
  Alert,
  Box,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import CountriesGrid from "../../Components/CountriesGrid/CountriesGrid";
import { useLocation, useHistory, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../GlobalStore/SearchState";

const HomePage = () => {

  const [allCountries, setAllCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [dataView, setDataView] = useState("table");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  //Get search from global state
  const searchStateText = useSelector((state) => state.search.value);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleHistoryButton = () => {
    navigate("/history");
  };

  useEffect(() => {

    getAll()
      .then((res) => {
        setAllCountries(res.data);
        setFilteredCountries(res.data);
        setLoading(false);
      })
      .catch((e) => {
        toggleError();
      });

    if (searchStateText) {
      setSearchText(searchStateText);
      searchByName(searchStateText);
      dispatch(update(""));
    }
  }, []);

  function searchByName(name) {
    setLoading(true);
    if (name) {
      saveHistory(name);
      getByName(name).then((res) => {
        setFilteredCountries(res.data);
        setLoading(false);
      }).catch((e) => {
        toggleError();
      });
    } else {
      if (allCountries) {
        setFilteredCountries(allCountries);
        setLoading(false);
      } else {
        getAll()
          .then((res) => {
            setAllCountries(res.data);
            setFilteredCountries(res.data);
            setLoading(false);
          })
          .catch((e) => {
            toggleError();
          });
      }
    }
  }

  function saveHistory(searchText) {
    let searchInfo = JSON.parse(localStorage.getItem("history")) || [];
    searchInfo.push({
      date: Date.now(),
      text: searchText,
    });

    localStorage.setItem("history", JSON.stringify(searchInfo));
  }

  function toggleError() {
    setLoading(false);
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 5000);
  }

  return (
    <div className="container">
      <div className="config-row">
        <div className="icon-container">
          <TextField
            onKeyDown={(ev) => {
              if (ev.key === "Enter") {
                searchByName(searchText);
              }
            }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            id="outlined-basic"
            label="Pesquise por nome"
            variant="outlined"
          />
          <IconButton
            onClick={() => searchByName(searchText)}
            aria-label="Search"
          >
            <Search />
          </IconButton>
        </div>
        <div className="icon-container">
          <IconButton
            size="large"
            onClick={handleHistoryButton}
            aria-label="Search"
          >
            <History />
          </IconButton>
          <IconButton
            size="large"
            onClick={() => setDataView("table")}
            aria-label="Search"
          >
            <TableView />
          </IconButton>
          <IconButton
            size="large"
            onClick={() => setDataView("grid")}
            aria-label="Search"
          >
            <GridView />
          </IconButton>
        </div>
      </div>

      {loading ? (
        <Box className="center-box">
          <CircularProgress />
        </Box>
      ) : filteredCountries ? (
        dataView == "table" ? (
          <CountriesTable countries={filteredCountries}></CountriesTable>
        ) : (
          <CountriesGrid countries={filteredCountries}></CountriesGrid>
        )
      ) : (
        <Box className="center-box">
          <Typography>
            Sorry, we can't find any country.
            <br />
            Please, try again.
          </Typography>
        </Box>
      )}
      {error ? (
        <Alert className="alert-error" severity="error">
          Sorry, something went wrong.
        </Alert>
      ) : null}
    </div>
  );
};

export default HomePage;

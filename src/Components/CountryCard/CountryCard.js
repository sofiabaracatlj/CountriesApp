import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import "./CountryCard.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

const CountryCard = ({ country }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <div className="card-header">
          <Typography variant="h5" component="div">
            {country.name.common}
          </Typography>
          <img width={80} src={country.flags.png} />
        </div>
        <div className="info-box">
          <div>
            <b>Capital:</b> {country.capital}
          </div>
          <div>
            <b>Population:</b> {country.population.toLocaleString("pt-BR")}
          </div>
          <Divider></Divider>
          <div className="info-box">
            <b>Currency:</b>
            <div className="currency-row currency-header">
                  <span>Name</span> <span>Symbol</span>
                </div>
            {Object.entries(country.currencies).map((currency) => {
              return (
                <div className="currency-row">
                  <span>{currency[1].name}</span> <span>{currency[1].symbol}</span>
                </div>
              );
            })}
          </div>
          <Divider></Divider>
          <div className="info-box">
            <b>Languages:</b>
            {Object.entries(country.languages).map((language) => {
              return <div >{language[1]}</div>;
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CountryCard;

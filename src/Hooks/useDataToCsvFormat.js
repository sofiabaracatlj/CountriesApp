import { useState, useEffect } from "react";
import { mkConfig, generateCsv, download } from "export-to-csv";

function useDataToCsvFormat(recivedData) {
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const csvConfig = mkConfig({ useKeysAsHeaders: true }); 
  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'Capital', key: 'capital' },
    { label: 'Population', key: 'population' },
    { label: 'Currency', key: 'currency' },
    { label: 'Language', key: 'language' },
    
  ];
  

  useEffect(() => {
    console.log("useEffect", data);
    handleStatusChange(data)
  }, [data])
  

  const handleStatusChange = async(newData) => {
    setData(data);
    if(rows.length) setRows([]);
    console.log(data);
    await data.map((country) => {
      console.log(country)
      rows.push({
        "name": country.name.common,
        "capital": country.capital,
        "population": country.population,
        "currency": JSON.stringify(country.currencies),
        "language": JSON.stringify(country.languages),
      })
    });
    console.log(rows)
    if(rows.length){
      const csv = generateCsv(csvConfig)(rows);
      download(csvConfig)(csv)
    }
  }
  
  console.log(headers, rows);

  return [{headers, rows}, setData];
}

export default useDataToCsvFormat;

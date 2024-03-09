import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import HistoryPage from "./Pages/HistoryPage/HistoryPage";
import { createTheme, ThemeProvider } from "@mui/material";
import { grey } from "@mui/material/colors";
import store from "./GlobalStore/Store";
import { Provider } from "react-redux";

const theme = createTheme({
  palette: {
    primary: {
      main: grey[300],
    },
    secondary: {
      main: grey[50],
    },
    dark:{
      main: grey[500]
    }
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
  },
  {
    path: "/history",
    element: <HistoryPage></HistoryPage>,
  },
]);

// const Index = () => {
//   const store = useSearch();

//   return (
//     <Context.provider value={store}>
//       <ThemeProvider theme={theme}>
//         <RouterProvider router={router} />
//       </ThemeProvider>
//     </Context.provider>
//   );
// };

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //   <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
  //   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

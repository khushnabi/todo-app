import React from "react"
import ReactDOM from "react-dom"
import App from "../todoLists/App"
import Axios from "axios";

Axios.defaults.baseURL = "http://localhost:8000/api";

const Root = document.getElementById('root');

ReactDOM.render(<App />, Root)

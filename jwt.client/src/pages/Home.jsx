import { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
    const [data, setData] = useState("default");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        if (data === "default") {
            axios
                .get("https://localhost:7171/api/resources")
                .then((response) => {
                    const data = response.data;

                    setData(data);
                })
                .catch((err) => console.error(err));
        }
    });

    return <div>Home Page {data}</div>;
};

export default HomePage;

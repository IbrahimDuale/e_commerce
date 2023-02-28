import "./Home.css";
import config from "../../configs/config";
import { useEffect } from "react";
const Home = () => {
    useEffect(() => {
        fetch(`${config.api_base_url}/auth/1234?color=blue&id=1234`,
            {
                method: "POST",
                body: JSON.stringify({ "hello": "hello" })
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                //
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])
    return (
        <div className="home">
            {config.title}
        </div>
    )
}

export default Home;
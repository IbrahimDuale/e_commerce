import "./Home.css";
import config from "../../configs/config";
const Home = () => {

    return (
        <div className="home">
            {config.title}
        </div>
    )
}

export default Home;
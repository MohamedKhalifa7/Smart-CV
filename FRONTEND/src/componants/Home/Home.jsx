import { useAuth } from "../../context/Auth/AuthContext";
import HomePart1 from "./homePart1";
import Homepart2 from "./homepart2";
import HomePart3 from "./homePart3";

const Home=()=>{
    const {user}=useAuth()
    const isPro = user?.role === 'pro user';
return (
    <>
    <HomePart1></HomePart1>
    <Homepart2></Homepart2>

    {<HomePart3></HomePart3>}
    </>
)
}
export default Home;
import Carousel from "./Carousel";
import Carousel2 from "./Carousel2"
import Products from "./Products";

const Home = ({addToCart}) => {
    return (
        <div>
            <Carousel2/>
            <Carousel/>
            <Products addToCart={addToCart}/>
        </div>
    );
}
 
export default Home;
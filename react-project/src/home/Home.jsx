// import Swal from "sweetalert2";
// import confetti from "canvas-confetti";
import {useEffect} from "react";
import "./home.css"
import CarouselComponent from "../components/Carousel";


// TODO: logo, redireccionamiento a productos
const Home = () => {

    return (
        <div className="container home">

            <div className="welcome-message">
                <h1>TechnoStore</h1>
                <CarouselComponent />

            </div>
            <div className="" >
                <div className="row mt-4">
                    <div className="col-6 my-4 mb-4">
                        <a href="/usuarios/crear">
                            <img src="../../public/images/img1-home-usuarios.jpg" alt="" className="img-fluid w-100" />
                        </a>
                    </div>
                    <div className="col-6 my-4 align-self-center">
                        <p>Registrate y obtené beneficios exclusivos</p>
                    </div>
                    <div className="col-6 mb-4 align-self-center">
                        <p>Encontrá en TechnoStore los mejores smartphones</p>
                    </div>
                    <div className="col-3 mb-4">
                        <a href="/productos">
                            <img src="../../public/images/img1-home-productos.jpg" alt="" className="img-fluid w-100 img-home-product" />
                        </a>
                        
                    </div>
                    <div className="col-3 mb-4">
                        <a href="/productos">
                            <img src="../../public/images/img2-home-productos.jpg" alt="" className="img-fluid w-100 img-home-product" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

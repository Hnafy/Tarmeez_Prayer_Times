import Card from "./Card";
import "./content.css"
import image1 from "./img/image1.jpg"

export default function Content() {
    return (
        <>
            <div className="carousel">
                <div className="carousel_inner">
                    <div className="container">
                        <div className="card">
                            <Card />
                        </div>
                    </div>
                    <div className="carousel_item__active">
                        <img
                            src={image1}
                            alt="bgImage"
                            className="carousel_img"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}


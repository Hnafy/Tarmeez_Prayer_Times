import Card from "./Card";
import "./content.css"
import image1 from "./img/image1.jpg"

export default function Content() {
    return (
        <>
            <div className="bg">
                <div className="bg_inner">
                    <div className="container">
                        <div className="card">
                            <Card />
                        </div>
                    </div>
                    <div className="bg_item__active">
                        <img
                            src={image1}
                            alt="bgImage"
                            className="bg_img"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}


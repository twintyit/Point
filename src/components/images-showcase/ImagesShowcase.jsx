import React from "react";
import "./ImagesShowcase.css";

const ImagesShowcase = () => {
    return (
        <div className="image-showcase-container">
            <div className="images-showcase-item large"></div>
            <div className="images-showcase-item large"></div>
            <div className="small-container">
                <div className="images-showcase-item small"></div>
                <div className="images-showcase-item small"></div>
            </div>


        </div>
    );
};

export default ImagesShowcase;
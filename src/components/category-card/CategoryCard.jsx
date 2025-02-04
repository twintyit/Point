import React, {useEffect} from "react";
import "./CategoryCard.css"

const CategoryCard = ({ category }) => {

    useEffect(() => {
        console.log(category);
    }, []);

    return (
        <div className="card d-flex flex-column h-100 text-center p-3 align-items-center border-0">

            <div className="icon-card-container d-flex align-content-center">
                <i className="material-icons icon-card p-3">open_with</i>
            </div>

            <h6 className="text-wrap text-center mt-3">{category.name}</h6>
            <div className="tmp"></div>
        </div>
    );
};

export default CategoryCard;
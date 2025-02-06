import React, {useEffect} from "react";
import "./CategoryCard.css"
import {Link} from "react-router-dom";

const CategoryCard = ({ category }) => {

    useEffect(() => {
        console.log(category);
    }, []);

    return (
        <Link key={category.id} to={`/category/${category.id}`} className="card h-100 p-3">

                <div className="icon-card-container d-flex align-content-center">
                    <i className="material-icons icon-card p-3">open_with</i>
                </div>

                <h6 className="text-wrap text-center mt-3">{category.name}</h6>
                <div className="tmp"></div>
        </Link>
    );
};

export default CategoryCard;
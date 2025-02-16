import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import "./CategoryCard.css"

const CategoryCard = ({ category }) => {

    useEffect(() => {
        console.log(category);
    }, []);

    return (
        <Link key={category.id} to={`/category/${category.id}`} className="card-category h-100 p-3">

                <div className="icon-card-container d-flex align-content-center">
                    <i className="material-icons icon-card p-3">open_with</i>
                </div>

                <h6 className="text-category text-wrap text-center mt-3">{category.title}</h6>

        </Link>
    );
};

export default CategoryCard;
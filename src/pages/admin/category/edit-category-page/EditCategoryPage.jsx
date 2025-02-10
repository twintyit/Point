import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {editCategory, getCategoryById, getCategoryProducts} from "../../../../services/apiService.js";
import {useAuth} from "../../../../contexts/AuthContext.jsx";
import Swal from "sweetalert2";
import alertService from "../../../../services/alertService.js";


const CategoryEditForm = () => {

    const {categoryId} = useParams();
    const {authState} = useAuth();
    const [category, setCategory] = useState({});
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const res = await getCategoryById(categoryId);
                setCategory(res.data);
            } catch (error) {
                alertService.error();
            }
        };

        fetchCategoryData();
    },[categoryId])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        if (category.title) {
            formData.append('Title', category.title);
        } else {
            console.error("category.title is missing");
        }

        if (category.slug) {
            formData.append('Slug', category.slug);
        } else {
            console.warn("Slug is empty, defaulting to an empty string");
            formData.append('Slug', "");
        }

        console.log(images[0])

        try {
            if(formData){
                await editCategory(categoryId, formData, authState.token);
                alertService.success();
            }else {
                alertService.error("Заполните корректно данные");
            }
        } catch (error) {
           alertService.error("Что-то пошло не так. Пожалуйста, попробуйте еще раз.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
            <h3 className="mb-4">Редактировать категорию</h3>

            <div className="mb-3">
                <label className="form-label">Название категории:</label>
                <input
                    type="text"
                    name="name"
                    value={category.title || ""}
                    onChange={(e) => {
                        setCategory(prevCategory => ({
                            ...prevCategory,
                            ["title"]: e.target.value
                        }));
                    }}
                    placeholder="Введите название категории"
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Slug:</label>
                <input
                    type="text"
                    name="slug"
                    value={category.slug || ""}
                    onChange={(e) => {
                        setCategory(prevCategory => ({
                            ...prevCategory,
                            ["slug"]: e.target.value
                        }));
                    }}
                    placeholder="Введите Slug категории"
                    className="form-control"
                />
            </div>

            <div className="mb-4">
                <label className="form-label">Изображения:</label>
                <input
                    type="file"
                    onChange={(e)=> {
                        setImages(e.target.files);
                    }}
                    multiple
                    accept="image/*"
                    className="form-control"
                />
            </div>

            <button className="btn btn-success w-100" type="submit">Обновить категорию</button>
        </form>
    );
};

export default CategoryEditForm;
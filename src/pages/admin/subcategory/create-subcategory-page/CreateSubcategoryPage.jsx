import React, {useEffect, useState} from 'react';
import {useAuth} from "../../../../contexts/AuthContext.jsx";
import alertService from "../../../../services/alertService.js";
import './CreateSubcategoryPage.css';
import {createSubcategory, getAllCategories} from "../../../../services/api/categoryService.js";

const CreateSubcategoryPage  = () => {
    const {authState} = useAuth();
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [image, setImage] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const data = await getAllCategories();
                setCategories(data)
            } catch (error) {
                console.error(error);
            }
        }
        fetchCategoryData();
    }, []);

    async function submitSubcategory() {
        const formData = new FormData();
        formData.append("Title", title);
        formData.append("Slug", slug);
        formData.append("CategoryId", selectedCategory);
        if (image) {
            formData.append("Image", image);
        }

        try {
            await createSubcategory(formData, authState.token);
            alertService.success("Подкатегория добавлена!");
        } catch (error) {
            alertService.error("Ошибка при добавлении подкатегории");
        }
    }

    return (

        <form
            id="categoryForm"
            className="p-4 border rounded shadow-sm"
            encType="multipart/form-data"
            onSubmit={(e) => {
                e.preventDefault();
                submitSubcategory();
            }}
        >
            <div className="form-group">
                <label htmlFor="title">Название подкатегории:</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="slug">Slug:</label>
                <input
                    type="text"
                    className="form-control"
                    id="slug"
                    name="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                />
            </div>

            { categories.length > 0 && (
                <div className="form-group">
                    <label htmlFor="category">Категория:</label>
                    <select
                        className="form-control"
                        id="category"
                        name="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        required
                    >
                        <option value="" disabled>Выберите категорию</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div className="form-group">
                <label htmlFor="image">Изображение:</label>
                <input
                    type="file"
                    className="form-control-file"
                    id="image"
                    name="image"
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </div>

            <button type="submit" className="btn btn-primary mt-3">Создать подкатегорию</button>
        </form>
    );
};


export default CreateSubcategoryPage;

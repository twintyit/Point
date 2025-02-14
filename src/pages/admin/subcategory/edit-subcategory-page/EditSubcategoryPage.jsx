import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import {
    updateCategory,
    getCategoryById,
    getSubcategoriesByCategoryId,
    deleteSubcategoryById, getSubcategoryById, getAllCategories, updateSubcategoryById
} from "../../../../services/apiService.js";
import { useAuth } from "../../../../contexts/AuthContext.jsx";
import alertService from "../../../../services/alertService.js";
import "./EditSubcategoryPage.css"

const EditSubcategoryPage = () => {
    const { id } = useParams();
    const { authState } = useAuth();
    const [subcategory, setSubcategory] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSubcategoryById(id);
                setSubcategory(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllCategories();
                setCategories(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        if (subcategory.title) formData.append('Title', subcategory.title);
        if (subcategory.slug) formData.append('Slug', subcategory.slug);
        if (selectedCategory) formData.append('CategoryId', selectedCategory);

        if (image) formData.append('Image', image);

        try {
            await updateSubcategoryById(id, formData, authState.token);
            alertService.success("Подкатегория успешно обновлена!");
        } catch (error) {
            alertService.error("Ошибка при обновлении подкатегории");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
            <h3 className="mb-4">Редактировать подкатегорию</h3>

            <div className="mb-3">
                <label className="form-label">Название подкатегории:</label>
                <input
                    type="text"
                    value={subcategory.title || ""}
                    onChange={(e) => setSubcategory({ ...subcategory, title: e.target.value })}
                    placeholder="Введите название подкатегории"
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Slug:</label>
                <input
                    type="text"
                    value={subcategory.slug || ""}
                    onChange={(e) => setSubcategory({ ...subcategory, slug: e.target.value })}
                    placeholder="Введите Slug категории"
                    className="form-control"
                />
            </div>

            <div className="mb-4">
                <label className="form-label">Категории:</label>
                <select className="form-control" value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="" disabled>Выберите категорию</option>
                    {categories.map((item) => (
                        <option key={item.id} value={item.id}>{item.title}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="form-label">Изображения:</label>
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    accept="image/*"
                    className="form-control"
                />
            </div>

            <button className="btn btn-success w-100" type="submit">Обновить подкатегорию</button>
        </form>
    );
};

export default EditSubcategoryPage;
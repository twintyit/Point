import React, { useEffect, useState } from 'react';
import {Link, useParams} from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext.jsx";
import alertService from "../../../../services/alertService.js";
import {
    deleteSubcategoryById,
    getCategoryById,
    getSubcategoriesByCategoryId,
    updateCategory
} from "../../../../services/api/categoryService.js";

const EditCategoryPage = () => {
    const { categoryId } = useParams();
    const { authState } = useAuth();
    const [category, setCategory] = useState({ title: "", slug: "", subcategories: [] });
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState("");
    const [image, setImage] = useState(null);
    const [dataDeleted, setDataDeleted] = React.useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryData = await getCategoryById(categoryId);
                setCategory(categoryData);
            } catch (error) {
               console.log(error)
            }
        };

        fetchData();
    }, [categoryId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const subcategoriesData = await getSubcategoriesByCategoryId(categoryId);
                setSubcategories(subcategoriesData);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, [categoryId, dataDeleted]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        if (category.title) formData.append('Title', category.title);
        if (category.slug) formData.append('Slug', category.slug);
        if (image) formData.append('Image', image);

        try {
            await updateCategory(categoryId, formData, authState.token);
            alertService.success("Категория успешно обновлена!");
        } catch (error) {
            alertService.error("Ошибка при обновлении категории");
        }
    };

    const handleDeleteSubcategory = async () => {
        if (!selectedSubcategory) return;
        const isConfirmed = await alertService.confirmDelete("Вы точно хотите удалить подкатегорию?");
        if (!isConfirmed) return;

        try {
            await deleteSubcategoryById(selectedSubcategory, authState.token);
            setDataDeleted(!dataDeleted);
            setSelectedSubcategory("");
            alertService.success("Подкатегория удалена");

        } catch (error) {
            alertService.error("Ошибка при удалении подкатегории");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
            <h3 className="mb-4">Редактировать категорию</h3>

            <div className="mb-3">
                <label className="form-label">Название категории:</label>
                <input
                    type="text"
                    value={category.title || ""}
                    onChange={(e) => setCategory({ ...category, title: e.target.value })}
                    placeholder="Введите название категории"
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Slug:</label>
                <input
                    type="text"
                    value={category.slug || ""}
                    onChange={(e) => setCategory({ ...category, slug: e.target.value })}
                    placeholder="Введите Slug категории"
                    className="form-control"
                />
            </div>

            <div className="mb-4">
                <label className="form-label">Подкатегории:</label>
                <select className="form-control" value={selectedSubcategory}
                        onChange={(e) => setSelectedSubcategory(e.target.value)}>
                    <option value="" disabled>Выберите подкатегорию</option>
                    {subcategories.map(sub => (
                        <option key={sub.id} value={sub.id}>{sub.title}</option>
                    ))}
                </select>
                <button
                    className="btn btn-sm btn-danger mt-2"
                    type="button"
                    onClick={handleDeleteSubcategory}
                    disabled={!selectedSubcategory}
                >
                    Удалить
                </button>

                <Link
                    className="btn btn-sm btn-warning mt-2"
                    type="button"
                    to={`/admin/edit-subcategory/${selectedSubcategory}`}
                    style={{
                        pointerEvents: selectedSubcategory ? 'auto' : 'none',
                        opacity: selectedSubcategory ? 1 : 0.5
                    }}
                >
                    Редактировать
                </Link>
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

            <button className="btn btn-success w-100" type="submit">Обновить категорию</button>
        </form>
    );
};

export default EditCategoryPage;
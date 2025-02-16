import React, { useEffect, useState } from 'react';
import { useParams} from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext.jsx";
import alertService from "../../../../services/alertService.js";
import {getBrandById, updateBrand} from "../../../../services/api/brandService.js";

const EditBrandPage = () => {
    const { id } = useParams();
    const { authState } = useAuth();
    const [brand, setBrand] = useState({});
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getBrandById(id);
                setBrand(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        if (brand.title) formData.append('Title', brand.title);
        if (brand.slug) formData.append('Slug', brand.slug);
        if (image) formData.append('Image', image);

        try {
            await updateBrand(id, formData, authState.token);
            alertService.success("Бренд успешно обновлен!");
        } catch (error) {
            alertService.error("Ошибка при обновлении бренда");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
            <h3 className="mb-4">Редактировать бренд</h3>

            <div className="mb-3">
                <label className="form-label">Название бренда:</label>
                <input
                    type="text"
                    value={brand.title || ""}
                    onChange={(e) => setBrand({ ...brand, title: e.target.value })}
                    placeholder="Введите название категории"
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Slug:</label>
                <input
                    type="text"
                    value={brand.slug || ""}
                    onChange={(e) => setBrand({ ...brand, slug: e.target.value })}
                    placeholder="Введите Slug категории"
                    className="form-control"
                />
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

            <button className="btn btn-success w-100" type="submit">Обновить бренд</button>
        </form>
    );
};

export default EditBrandPage;
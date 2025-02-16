import React, {useState} from 'react';
import {useAuth} from "../../../../contexts/AuthContext.jsx";
import alertService from "../../../../services/alertService.js";
import './CreateBrandPage.css';
import {createBrand} from "../../../../services/api/brandService.js";

const CreateBrandPage  = () => {
    const {authState} = useAuth();
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [image, setImage] = useState([]);

    async function submitBrand() {
        const formData = new FormData();
        formData.append("Title", title);
        formData.append("Slug", slug || title);
        if (image) {
            formData.append("Image", image);
        }

        try {
            await createBrand(formData, authState.token);
            alertService.success("Бренд добавлен!");
        } catch (error) {
            alertService.error("Ошибка при добавлении бренда");
        }
    }

    return (

        <form
            id="categoryForm"
            className="p-4 border rounded shadow-sm"
            encType="multipart/form-data"
            onSubmit={(e) => {
                e.preventDefault();
                submitBrand();
            }}
        >
            <div className="form-group">
                <label htmlFor="title">Название бренда:</label>
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

            <div className="form-group">
                <label htmlFor="image">Изображение:</label>
                <input
                    type="file"
                    className="form-control-file"
                    id="image"
                    name="image"
                    onChange={(e)=>  setImage(e.target.files[0])}
                />
            </div>

            <button type="submit" className="btn btn-primary mt-3">Создать бренд</button>
        </form>
    );
};


export default CreateBrandPage;

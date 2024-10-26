import React, {useState} from 'react';

import './AddCategoryPage.css';

const AddCategoryPage  = () => {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);

    const handleFileChange = (event) => {
        setImages(event.target.files);
    };

    async function submitCategory() {
        const formData = new FormData();
        formData.append("name", name); // Изменено на маленькие буквы
        formData.append("slug", slug || ""); // Изменено на маленькие буквы
        formData.append("description", description); // Изменено на маленькие буквы

        // Добавляем изображения
        Array.from(images).forEach((image) => formData.append("images", image)); // Изменено на маленькие буквы

        try {
            const response = await fetch("https://shnurok.azurewebsites.net/api/prod/createcategories", {
                method: "POST",
                headers: {
                    'Authorization': 'C3B90928137C34FACB117C5597DA37EB25509004',

                },
                body: formData, // Разкомментировано
            });

            if (!response.ok) throw new Error("Ошибка при отправке формы");

            const result = await response.json();
            console.log("Ответ сервера:", result);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    }

    return (

        <form
            id="categoryForm"
            className="p-4 border rounded shadow-sm"
            encType="multipart/form-data"
            onSubmit={(e) => {
                e.preventDefault();
                submitCategory();
            }}
        >
            <div className="form-group">
                <label htmlFor="name">Название категории:</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                <label htmlFor="description">Описание:</label>
                <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
            </div>

            <div className="form-group">
                <label htmlFor="images">Изображения:</label>
                <input
                    type="file"
                    className="form-control-file"
                    id="images"
                    name="images"
                    multiple
                    onChange={handleFileChange}
                />
            </div>

            <button type="submit" className="btn btn-primary mt-3">Создать категорию</button>
        </form>
    );
};


export default AddCategoryPage ;

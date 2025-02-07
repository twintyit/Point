import React, {useState} from 'react';
import {useAuth} from "../../../../contexts/AuthContext.jsx";
import './AddCategoryPage.css';
import {addCategory} from "../../../../api/apiFunctions.jsx";

const AddCategoryPage  = () => {
    const {authState} = useAuth();
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [image, setImage] = useState([]);

    // const handleFileChange = (event) => {
    //     setImage(event.target.files);
    // };

    async function submitCategory() {
        // const formData = new FormData();
        // formData.append("title", title); // Изменено на маленькие буквы
        // formData.append("slug", slug || ""); // Изменено на маленькие буквы
        // formData.append("image", image); // Изменено на маленькие буквы
        //
        // try {
        //     const response = await fetch("https://shnurok.azurewebsites.net/api/prod/createcategory", {
        //         method: "POST",
        //         headers: {
        //             'Authorization': authState.token,
        //
        //         },
        //         body: formData,
        //     });
        //
        //
        //     console.log(response);
        //     if (!response.ok) throw new Error("Ошибка при отправке формы");
        //
        //     const result = await response.json();
        //     console.log("Ответ сервера:", result);
        // } catch (error) {
        //     console.error("Ошибка:", error);
        // }

        await addCategory({title, slug, image}, authState.token);
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
                <label htmlFor="title">Название категории:</label>
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
                    type="text"
                    className="form-control"
                    id="image"
                    name="image"
                    onChange={(e) => setImage(e.target.value)}
                />
            </div>

            {/*<div className="form-group">*/}
            {/*    <label htmlFor="image">Изображение:</label>*/}
            {/*    <input*/}
            {/*        type="file"*/}
            {/*        className="form-control-file"*/}
            {/*        id="image"*/}
            {/*        name="image"*/}
            {/*        onChange={handleFileChange}*/}
            {/*    />*/}
            {/*</div>*/}

            <button type="submit" className="btn btn-primary mt-3">Создать категорию</button>
        </form>
    );
};


export default AddCategoryPage;

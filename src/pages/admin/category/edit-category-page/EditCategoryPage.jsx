import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {editCategory, getCategoryName, getCategoryProducts} from "../../../../api/apiFunctions.jsx";
import {useAuth} from "../../../../contexts/AuthContext.jsx";
import Swal from "sweetalert2";


const CategoryEditForm = () => {

    const {categoryId} = useParams();
    const {authState} = useAuth();

//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [slug, setSlug] = useState('');
//     const [images, setImages] = useState([]);
//     const [statusMessage, setStatusMessage] = useState('');
//
//     const handleFileChange = (e) => {
//         setImages(e.target.files);
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log(authState.token)
//         const formData = new FormData();
//         formData.append('categoryId', categoryId); // тут айдишку нужную вставить.
//
//         if (name) formData.append('Name', name);
//         if (description) formData.append('Description', description);
//         if (slug) formData.append('Slug', slug);
//
//         for (let i = 0; i < images.length; i++) {
//             formData.append('Images', images[i]);
//         }
// console.log(formData)
//
//         try {
//             const response = await fetch('https://shnurok.azurewebsites.net/api/prod/updatecategory', {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': authState.token //тут токен
//                 },
//                 body: formData
//             });
//
//             const data = await response.json();
//             setStatusMessage(data.status.message);
//         } catch (error) {
//             setStatusMessage('Ошибка при обновлении категории');
//             console.error('Error updating category:', error);
//         }
//     };
//
//     return (
//         <form onSubmit={handleSubmit} className="category-edit-form">
//             <h3>Редактировать категорию</h3>
//
//             <div>
//                 <label>Название категории:</label>
//                 <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Введите название категории"
//                 />
//             </div>
//
//             <div>
//                 <label>Описание категории:</label>
//                 <textarea
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     placeholder="Введите описание категории"
//                 />
//             </div>
//
//             <div>
//                 <label>Slug:</label>
//                 <input
//                     type="text"
//                     value={slug}
//                     onChange={(e) => setSlug(e.target.value)}
//                     placeholder="Введите Slug категории"
//                 />
//             </div>
//
//             <div>
//                 <label>Изображения:</label>
//                 <input
//                     type="file"
//                     onChange={handleFileChange}
//                     multiple
//                     accept="image/*"
//                 />
//             </div>
//
//             <button type="submit">Обновить категорию</button>
//
//             {statusMessage && <p>{statusMessage}</p>}
//         </form>
//     );

    const [category, setCategory] = useState({});
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                await getCategoryName(categoryId)
                    .then(r=> {
                        setCategory(r.data)
                    });

            } catch (error) {
                console.error('Class: EditCategoryPage. Method: fetchCategoryData', error);
            }
        };

        fetchCategoryData();
    },[categoryId])

    const handleFileChange = (e) => {
         setImages(e.target.files);
     };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log()

        console.log("Category object:", category);
        console.log("Images array:", images);

        const formData = new FormData();

        // Проверяем и добавляем данные в FormData
        if (category.id) {
            formData.append('categoryId', categoryId);
        } else {
            console.error("category.id is missing");
        }

        if (category.name) {
            formData.append('Name', category.name);
        } else {
            console.error("category.name is missing");
        }

        if (category.description) {
            formData.append('Description', category.description);
        } else {
            console.error("category.description is missing");
        }

        if (category.slug) {
            formData.append('Slug', category.slug);
        } else {
            console.warn("Slug is empty, defaulting to an empty string");
            formData.append('Slug', "");
        }

        // Добавляем изображения в FormData

        console.log(images[0])
        for (let i = 0; i < images.length; i++) {
           formData.append('Images', images[i]);
        }

        for (let pair of formData.entries()) {
            console.log(pair[0] + ": " + pair[1]);
        }
console.log(authState.token)
        try {
            if(formData){
                await editCategory(formData, authState.token);
                Swal.fire({
                    icon: 'success',
                    title: 'Успех!',
                    text: 'Операция прошла успешно.',
                    confirmButtonText: 'OK',
                    timer: 1500,
                    timerProgressBar: true,
                });
            }else {
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка!',
                    text: 'Что-то пошло не так. Пожалуйста, попробуйте еще раз.',
                    confirmButtonText: 'OK',

                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Ошибка!',
                text: 'Что-то пошло не так. Пожалуйста, попробуйте еще раз.',
                confirmButtonText: 'OK',
            });
            console.error('Error updating category:', error);
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
                    value={category.name || ""}
                    onChange={(e) => {
                        setCategory(prevCategory => ({
                            ...prevCategory,
                            ["name"]: e.target.value
                        }));
                    }}
                    placeholder="Введите название категории"
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Описание категории:</label>
                <textarea
                    name="description"
                    value={category.description || ""}
                    onChange={(e) => {
                        setCategory(prevCategory => ({
                            ...prevCategory,
                            ["description"]: e.target.value
                        }));
                    }}
                    placeholder="Введите описание категории"
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
                    onChange={handleFileChange}
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
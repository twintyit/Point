import React, {useEffect} from 'react';
import {getCategories,deleteCategory} from "../../../api/apiFunctions.jsx";
import './DeleteCategoryPage.css';
import Swal from 'sweetalert2';
import {useAuth} from "../../../contexts/AuthContext.jsx";

const DeleteCategoryPage = () => {

    const [category, setCategory] = React.useState([]);
    const {authState} = useAuth();

    useEffect(() => {
        const res = async () => {
            await getCategories()
                .then((response) => {setCategory(response.data)})
                .catch((error) => {console.error(error)});
        }
        res();
    },[])

    return (
        <>
            {category.length > 0 && (
                <div className="d-flex flex-column">
                    <div className="d-flex border-bottom p-2 fw-bold">
                        <div className="col-6">Название категории</div>
                        <div className="col-6">Действия</div>
                    </div>
                    {category.map((category, index) => (
                        <div key={index} className="d-flex border-bottom p-2 align-items-center">
                            <div className="col-6">{category.name}</div>
                            <div className="col-6 d-flex">
                                <button
                                    className="btn btn-danger me-2"
                                    onClick={() => {
                                        Swal.fire({
                                            title: 'Вы уверены?',
                                            text: "Это действие нельзя будет отменить!",
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonColor: '#d33',
                                            cancelButtonColor: '#3085d6',
                                            confirmButtonText: 'Да, удалить!',
                                            cancelButtonText: 'Отмена'
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                deleteCategory(authState.token, category.id)
                                                    .then((response) => {
                                                        console.log(response);
                                                        Swal.fire('Удалено!', 'Категория была успешно удалена.', 'success');
                                                    })
                                                    .catch((error) => {
                                                        console.error(error);
                                                        Swal.fire('Ошибка', 'Не удалось удалить категорию.', 'error');
                                                    });
                                            }
                                        });
                                    }}
                                >
                                    Удалить
                                </button>
                                <button className="btn btn-primary">Редактировать</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default DeleteCategoryPage;

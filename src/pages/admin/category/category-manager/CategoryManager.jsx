import React, {useEffect} from 'react';
import { deleteCategory, getCategories} from "../../../../services/apiService.js";
import {useAuth} from "../../../../contexts/AuthContext.jsx";
import {Link} from "react-router-dom";
import alertService from "../../../../services/alertService.js";

const CategoryManager = () => {

    const [category, setCategory] = React.useState([]);
    const [detetedCategorys, setDetetedCategorys] = React.useState([]);

    const [dataDeleted, setDataDeleted] = React.useState(false);
    const {authState} = useAuth();

    useEffect(() => {
        const res = async () => {
            try {
                const response = await getCategories();
                setCategory(response.data);
            }catch (error){
                console.error(error)
            }
        }
        res();
    },[dataDeleted]);

    const onDeleteCategoryButtonClick = async (id) => {
        const shouldDelete = await alertService.confirmDelete();
        if (shouldDelete) {
            try {
                await deleteCategory(authState.token, id);
                alertService.success("Категория удалена!");
                setDataDeleted(!dataDeleted);
            } catch (error) {
                alertService.error("Ошибка при удалении категории");
            }
        }
    }

    return   <>
        <div>
            <div className="d-flex justify-content-center">
                <Link className="btn btn-success" to={`/admin/add-category`}>Добавить категорию</Link>
            </div>
            {category.length > 0 && (
                <div className="d-flex flex-column">
                    <div className="d-flex border-bottom p-2 fw-bold">
                        <div className="col-6">Название категории</div>
                        <div className="col-6">Действия</div>
                    </div>
                    {category.map((category, index) => (
                        <div key={index} className="d-flex border-bottom p-2 align-items-center">
                            <div className="col-6">{category.title}</div>
                            <div className="col-6 d-flex">
                                <button
                                    className="btn btn-danger me-2"
                                    onClick={()=>onDeleteCategoryButtonClick(category.id)}
                                >
                                    Удалить
                                </button>
                                <Link className="btn btn-warning" to={`/admin/category/edit/${category.id}`}>Редактировать</Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/*{category.length > 0 && (*/}
            {/*    <div className="d-flex flex-column">*/}
            {/*        <div className="d-flex border-bottom p-2 fw-bold">*/}
            {/*            <div className="col-6">Название категории</div>*/}
            {/*            <div className="col-6">Действия</div>*/}
            {/*        </div>*/}
            {/*        {category.map((category, index) => (*/}
            {/*            <div key={index} className="d-flex border-bottom p-2 align-items-center">*/}
            {/*                <div className="col-6">{category.title}</div>*/}
            {/*                <div className="col-6 d-flex">*/}
            {/*                    <button*/}
            {/*                        className="btn btn-danger me-2"*/}
            {/*                        onClick={()=>onDeleteCategoryButtonClick(category.id)}*/}
            {/*                    >*/}
            {/*                        Удалить*/}
            {/*                    </button>*/}
            {/*                    <Link className="btn btn-warning" to={`/admin/category/edit/${category.id}`}>Редактировать</Link>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    </>
}

export default CategoryManager;

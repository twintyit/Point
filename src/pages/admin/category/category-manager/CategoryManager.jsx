import React, {useEffect} from 'react';
import {
    deleteCategory,
    getAllCategories, getAllSybCategories,
    getDeletedCategories,
    getSubcategoryById, restoreCategory
} from "../../../../services/apiService.js";
import {useAuth} from "../../../../contexts/AuthContext.jsx";
import {Link} from "react-router-dom";
import alertService from "../../../../services/alertService.js";

const CategoryManager = () => {

    const [categories, setCategories] = React.useState([]);
    const [deletedCategories, setDeletedCategories] = React.useState([]);

    const [dataDeleted, setDataDeleted] = React.useState(false);
    const {authState} = useAuth();

    useEffect(() => {
        const res = async () => {
            try {
                const data = await getAllCategories();
                setCategories(data);
                await getAllSybCategories();
            }catch (error){
                console.error(error)
            }
        }
        res();
    },[dataDeleted]);

    useEffect(() => {
        const res = async () => {
            try {
                const data = await getDeletedCategories();
                setDeletedCategories(data);
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

    const onRestoreCategoryButtonClick = async (id) => {
        const shouldDelete = await alertService.confirmRestore("Вы уверены, что хотите восстановить выбранную категорию?");
        if (shouldDelete) {
            try {
                await restoreCategory(id, authState.token);
                alertService.success("Категория востановлена!");
                setDataDeleted(!dataDeleted);
            } catch (error) {
                alertService.error("Ошибка при восстановлении категории");
            }
        }
    }

    return   <>
        <div>
            <div className="d-flex justify-content-center">
                <Link className="btn btn-success" to={`/admin/create-category`}>Добавить категорию</Link>
                <Link className="btn btn-success" to={`/admin/create-subcategory`}>Добавить подкатегорию</Link>

            </div>
            {categories.length > 0 && (
                <div className="d-flex flex-column">
                    <div className="d-flex border-bottom p-2 fw-bold">
                        <div className="col-6">Название категории</div>
                        <div className="col-6">Действия</div>
                    </div>
                    {categories.map((category, index) => (
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
            {deletedCategories.length > 0 && (
                <div>
                    <h3>Удаленные категории</h3>
                    <div className="d-flex flex-column">
                        <div className="d-flex border-bottom p-2 fw-bold">
                            <div className="col-6">Название категории</div>
                            <div className="col-6">Действия</div>
                        </div>
                        {deletedCategories.map((category, index) => (
                            <div key={index} className="d-flex border-bottom p-2 align-items-center">
                                <div className="col-6">{category.title}</div>
                                <div className="col-6 d-flex">
                                    <button
                                        className="btn btn-primary me-2"
                                         onClick={() => onRestoreCategoryButtonClick(category.id)}
                                    >
                                        Вернуть
                                    </button>
                                    {/*<Link className="btn btn-warning"*/}
                                    {/*     }>Редактировать</Link>*/}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </>
}

export default CategoryManager;

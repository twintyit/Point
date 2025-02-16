import React, {useEffect} from 'react';
import {useAuth} from "../../../../contexts/AuthContext.jsx";
import {Link} from "react-router-dom";
import alertService from "../../../../services/alertService.js";
import "./BrandManager.css"
import {deleteBrand, getAllBrands, getDeletedBrands, restoreBrand} from "../../../../services/api/brandService.js";

const BrandManager = () => {

    const [brands, setBrands] = React.useState([]);
    const [deletedBrands, setDeletedBrands] = React.useState([]);

    const [dataDeleted, setDataDeleted] = React.useState(false);
    const {authState} = useAuth();

    useEffect(() => {
        const res = async () => {
            try {
                const data = await getAllBrands();
                setBrands(data);
            }catch (error){
                console.error(error)
            }
        }
        res();
    },[dataDeleted]);

    useEffect(() => {
        const res = async () => {
            try {
                const data = await getDeletedBrands();
                setDeletedBrands(data);
            }catch (error){
                console.error(error)
            }
        }
        res();
    },[dataDeleted]);


    const onDeleteBrandButtonClick = async (id) => {
        const shouldDelete = await alertService.confirmDelete();
        if (shouldDelete) {
            try {
                await deleteBrand(id, authState.token,);
                alertService.success("Бренд удален!");
                setDataDeleted(!dataDeleted);
            } catch (error) {
                alertService.error("Ошибка при удалении бренда");
            }
        }
    }

    const onRestoreBrandButtonClick = async (id) => {
        const shouldDelete = await alertService.confirmRestore("Вы уверены, что хотите восстановить выбранный бренд?");
        if (shouldDelete) {
            try {
                await restoreBrand(id, authState.token);
                alertService.success("Бренд востановлен!");
                setDataDeleted(!dataDeleted);
            } catch (error) {
                alertService.error("Ошибка при восстановлении бренда");
            }
        }
    }

    return   <>
        <div>
            <div className="d-flex justify-content-center">
                <Link className="btn btn-success" to={`/admin/brand/create`}>Добавить бренд</Link>
            </div>
            {brands.length > 0 && (
                <div className="d-flex flex-column">
                    <div className="d-flex border-bottom p-2 fw-bold">
                        <div className="col-6">Название бренда</div>
                        <div className="col-6">Действия</div>
                    </div>
                    {brands.map((item, index) => (
                        <div key={index} className="d-flex border-bottom p-2 align-items-center">
                            <div className="col-6 d-flex align-items-center">
                                <div className="me-3 brand-img-container">
                                    <img src={item.imgUrl} alt={item.title} className="brand-img"/>
                                </div>
                                <span>{item.title}</span>
                            </div>
                            <div className="col-6 d-flex">
                                <button className="btn btn-danger me-2" onClick={() => onDeleteBrandButtonClick(item.id)}>
                                    Удалить
                                </button>
                                <Link className="btn btn-warning" to={`/admin/brand/edit/${item.id}`}>
                                    Редактировать
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {deletedBrands.length > 0 && (
                <div>
                    <h3>Удаленные бренды</h3>
                    <div className="d-flex flex-column">
                        <div className="d-flex border-bottom p-2 fw-bold">
                            <div className="col-6">Название бренда</div>
                            <div className="col-6">Действия</div>
                        </div>
                        {deletedBrands.map((category, index) => (
                            <div key={index} className="d-flex border-bottom p-2 align-items-center">
                                <div className="col-6">{category.title}</div>
                                <div className="col-6 d-flex">
                                    <button
                                        className="btn btn-primary me-2"
                                        onClick={() => onRestoreBrandButtonClick(category.id)}
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

export default BrandManager;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <div>
                <button className="btn btn-primary"  onClick={() => navigate('/admin/category')}>Категории
                </button>
                <button className="btn btn-primary" onClick={() => navigate('/admin/product')}>Продукты
                </button>
                <button className="btn btn-success" onClick={() => navigate('/admin/brand')}>Бренды
                </button>

                {/*<button className="btn btn-success" onClick={() => navigate('/admin/add-category')}>Добавить категорию*/}
                {/*</button>*/}
                {/*<button className="btn btn-danger" onClick={() => navigate('/admin/delete-product')}>Удалить товар*/}
                {/*</button>*/}
                {/*<button className="btn btn-danger" onClick={() => navigate('/admin/delete-category')}>Удалить категорию*/}
                {/*</button>*/}
            </div>
        </div>
    );
};

export default AdminPanel;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SearchProduct } from '../api/apiFunctions';

const FoundItemsPage = () => {

    const [items, setItems] = useState(null);
    const {text} = useParams();

    useEffect(() => {
       console.log(text);
            const response = SearchProduct(text);
            setItems(response);
        
    }, []);


    return (
        <>
        <div>
                <h3>Cкоро Стас сделает поиск и вы найдете {items}</h3>
        </div>
        </>
    );
};

export default FoundItemsPage;
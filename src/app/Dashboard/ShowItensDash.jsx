'use client';
import api from '../../lib/api';
import { FaBox } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";

import { useEffect, useState } from 'react';

export default function () {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/products');
                const products = res.data;
                setProducts(products);
            } catch (error) {
                console.error('erro', error);
            }
        }; fetchData();
    }, []);


    const totalQuantity = products.reduce((acc, prod) => acc + prod.quantity, 0)
    const totalPrice = products.reduce((ttl, prod) => ttl + prod.price, 0)

    return (
        <div className="flex items-center justify-center gap-2 py-10  bg-gray-100">
            <div className="bg-white p-4 rounded shadow">
                <h1 className={`flex items-center gap-2 ${totalQuantity > 2 ? '' : 'text-red-500'}`}>
                    <FaBox /> Total de produtos: {totalQuantity}
                </h1>
            </div>
            <div className="bg-white p-4 rounded shadow">
                <h1 className='flex items-center gap-2'> <MdAttachMoney className='text-green-500' /> Preço total: {totalPrice}</h1>
            </div>
        </div >
    )
}
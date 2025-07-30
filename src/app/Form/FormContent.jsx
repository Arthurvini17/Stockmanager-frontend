'use client';

import axios from 'axios';
import api from '../../lib/api';
import { useState } from 'react';

//passando os inputs  que irei utilizar
export default function FormContent() {
    const [formData, setFormData] = useState({
        Product_name: '',
        description: '',
        price: '',
        quantity: '',
        category: ''
    });

    //recebendo os valores dos inputs pelo value e name
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    //enviando os dados que foram capturados

    const handleSubmit = async (e) => {
        const payload = {
            ...formData,
            price: Number(formData.price),
            quantity: Number(formData.quantity),
        }

        try {
            const res = await axios.post('http://localhost:3001/products', payload)

        } catch (error) {
            console.error('erro no envio', error)
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div>

                </div>
            </form>
        </div>
    );
}
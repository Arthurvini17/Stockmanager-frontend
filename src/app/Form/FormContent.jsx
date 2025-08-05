'use client';

import axios from 'axios';
import { useState } from 'react';

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
        };

        try {
            const res = await axios.post('https://stockmanager-backend-p2ko.onrender.com/products', payload);
            console.log('Produto adicionado!', res.data);
        } catch (error) {
            console.error('Erro no envio', error);
        }
    };

    return (
        <div className="mt-10 w-full flex justify-center">
            <div className="w-full max-w-xl bg-gray-100/70 p-6 rounded-xl">
                <div className="mb-6">
                    <p className="text-sm text-gray-700">Back to Products</p>
                    <h1 className="text-2xl font-semibold">Add Novo produto</h1>
                    <p className="text-base text-gray-600">Preencha em detalhes para adicionar um novo produto ao seu dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5 bg-white border border-gray-300 p-6 rounded-xl">
                    <div className="col-span-2 flex flex-col">
                        <label htmlFor="Product_name">Nome do produto</label>
                        <input
                            className="border border-gray-200 px-3 py-2 rounded-lg"
                            placeholder="Digite o nome do produto"
                            type="text"
                            name="Product_name"
                            value={formData.Product_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-span-2 flex flex-col">
                        <label htmlFor="description">Descrição</label>
                        <textarea
                            name="description"
                            id="description"
                            placeholder="Coloque a descrição do produto"
                            className="border border-gray-200 px-3 py-2 rounded-lg"
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="col-span-1 flex flex-col">
                        <label htmlFor="price">Preço</label>
                        <input
                            className="border border-gray-200 px-3 py-2 rounded-lg"
                            placeholder="Digite o preço"
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-span-1 flex flex-col">
                        <label htmlFor="quantity">Quantidade</label>
                        <input
                            className="border border-gray-200 px-3 py-2 rounded-lg"
                            placeholder="Digite a quantidade"
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-span-2 flex flex-col">
                        <label htmlFor="category">Categoria</label>
                        <input
                            className="border border-gray-200 px-3 py-2 rounded-lg"
                            placeholder="Digite a categoria"
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-span-2 flex justify-center">
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                            Adicionar Produto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

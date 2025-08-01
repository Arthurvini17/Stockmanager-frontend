'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

export default function EditarProduto() {
    const { id } = useParams();
    const router = useRouter();

    const [formData, setFormData] = useState({
        Product_name: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
    });
    const [errors, setErrors] = useState({});

    // Buscar dados do produto atual
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/products/${id}`);
                const data = res.data;


                setFormData({
                    Product_name: data.Product_name || '',
                    description: data.description || '',
                    price: data.price?.toString() || '',
                    quantity: data.quantity?.toString() || '',
                    category: data.category || '',
                });
            } catch (error) {
                console.error('Erro ao buscar produto:', error);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        // Limpa o erro do campo alterado
        setErrors({
            ...errors,
            [e.target.name]: '',
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.Product_name.trim()) newErrors.Product_name = 'Nome do produto é obrigatório';
        if (!formData.price.trim()) newErrors.price = 'Preço é obrigatório';
        if (!formData.quantity.trim()) newErrors.quantity = 'Quantidade é obrigatória';
        if (!formData.category.trim()) newErrors.category = 'Categoria é obrigatória';
        return newErrors;
    };

    const handleEdit = async (e) => {
        e.preventDefault();

        // Valida o formulário
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const updatedProduct = {
                ...formData,
                price: Number(formData.price),
                quantity: Number(formData.quantity),
            };

            await axios.put(`http://localhost:3001/products/${id}`, updatedProduct);
            router.push('/Products');
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            setErrors({ submit: 'Erro ao atualizar produto. Tente novamente.' });
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Editar Produto</h1>
            {errors.submit && <p className="text-red-500 mb-4">{errors.submit}</p>}
            <form onSubmit={handleEdit} className="grid grid-cols-2 gap-5 bg-white border border-gray-300 p-6 rounded-xl">
                <div className="col-span-2 flex flex-col">
                    <label htmlFor="Product_name">Nome do produto</label>
                    <input
                        className={`border ${errors.Product_name ? 'border-red-500' : 'border-gray-200'} px-3 py-2 rounded-lg`}
                        type="text"
                        name="Product_name"
                        value={formData.Product_name}
                        onChange={handleChange}
                        placeholder="Digite o nome do produto"
                    />
                    {errors.Product_name && <p className="text-red-500 text-sm">{errors.Product_name}</p>}
                </div>

                <div className="col-span-2 flex flex-col">
                    <label htmlFor="description">Descrição</label>
                    <textarea
                        name="description"
                        className="border border-gray-200 px-3 py-2 rounded-lg"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Digite a descrição do produto"
                    />
                </div>

                <div className="col-span-1 flex flex-col">
                    <label htmlFor="price">Preço</label>
                    <input
                        className={`border ${errors.price ? 'border-red-500' : 'border-gray-200'} px-3 py-2 rounded-lg`}
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Digite o preço"
                        step="0.01"
                    />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                </div>

                <div className="col-span-1 flex flex-col">
                    <label htmlFor="quantity">Quantidade</label>
                    <input
                        className={`border ${errors.quantity ? 'border-red-500' : 'border-gray-200'} px-3 py-2 rounded-lg`}
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="Digite a quantidade"
                    />
                    {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
                </div>

                <div className="col-span-2 flex flex-col">
                    <label htmlFor="category">Categoria</label>
                    <input
                        className={`border ${errors.category ? 'border-red-500' : 'border-gray-200'} px-3 py-2 rounded-lg`}
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Digite a categoria"
                    />
                    {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                </div>

                <div className="col-span-2 flex justify-center">
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                        Atualizar produto
                    </button>
                </div>
            </form>
        </div>
    );
}
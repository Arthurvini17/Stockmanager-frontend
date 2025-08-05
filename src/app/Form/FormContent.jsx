'use client'

import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

function SimpleForm() {
    const [formData, setFormData] = useState({
        Product_name: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const onSubmit = async () => {
        const payload = {
            ...formData,
            price: Number(formData.price),
            quantity: Number(formData.quantity),
        }

        try {
            const res = await axios.post(
                'http://localhost:3000/',
                payload
            )
            console.log('Produto adicionado!', res.data)
            alert('Produto adicionado com sucesso!')
        } catch (error) {
            console.error('Erro no envio', error)
            alert('Erro ao adicionar o produto.')
        }
    }

    return (
        <div className="mt-10 w-full flex justify-center">
            <div className="w-full max-w-xl bg-gray-100/70 p-6 rounded-xl">
                <div className="mb-6">
                    <p className="text-sm text-gray-700">Back to Products</p>
                    <h1 className="text-2xl font-semibold">Add Novo produto</h1>
                    <p className="text-base text-gray-600">
                        Preencha em detalhes para adicionar um novo produto ao seu dashboard
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-2 gap-5 bg-white border border-gray-300 p-6 rounded-xl"
                >
                    <div className="col-span-2 flex flex-col">
                        <label htmlFor="Product_name">Nome do produto</label>
                        <input
                            {...register('Product_name', { required: 'Nome é obrigatório' })}
                            className="border border-gray-200 px-3 py-2 rounded-lg"
                            placeholder="Digite o nome do produto"
                            type="text"
                            name="Product_name"
                            value={formData.Product_name}
                            onChange={onChange}
                        />
                        {errors.Product_name && (
                            <p className="text-red-500 text-sm">{errors.Product_name.message}</p>
                        )}
                    </div>

                    <div className="col-span-2 flex flex-col">
                        <label htmlFor="description">Descrição</label>
                        <textarea
                            {...register('description', { required: 'Descrição obrigatória' })}
                            name="description"
                            className="border border-gray-200 px-3 py-2 rounded-lg"
                            value={formData.description}
                            onChange={onChange}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="col-span-1 flex flex-col">
                        <label htmlFor="price">Preço</label>
                        <input
                            {...register('price', { required: 'Preço obrigatório' })}
                            className="border border-gray-200 px-3 py-2 rounded-lg"
                            placeholder="Digite o preço"
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={onChange}
                        />
                        {errors.price && (
                            <p className="text-red-500 text-sm">{errors.price.message}</p>
                        )}
                    </div>

                    <div className="col-span-1 flex flex-col">
                        <label htmlFor="quantity">Quantidade</label>
                        <input
                            {...register('quantity', { required: 'Quantidade obrigatória' })}
                            className="border border-gray-200 px-3 py-2 rounded-lg"
                            placeholder="Digite a quantidade"
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={onChange}
                        />
                        {errors.quantity && (
                            <p className="text-red-500 text-sm">{errors.quantity.message}</p>
                        )}
                    </div>

                    <div className="col-span-2 flex flex-col">
                        <label htmlFor="category">Categoria</label>
                        <input
                            {...register('category', { required: 'Categoria obrigatória' })}
                            className="border border-gray-200 px-3 py-2 rounded-lg"
                            placeholder="Digite a categoria"
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={onChange}
                        />
                        {errors.category && (
                            <p className="text-red-500 text-sm">{errors.category.message}</p>
                        )}
                    </div>

                    <div className="col-span-2 flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Adicionar Produto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

// ⬇️ Aqui está o export principal do arquivo
export default function FormContent() {
    return <SimpleForm />
}

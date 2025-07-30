'use client';

import { useEffect, useState } from 'react';
import api from '../../lib/api';

export default function ProductsContent() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

    //buscando produtos
    useEffect(() => {
        api.get('/products')
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => console.error("Erro ao buscar produtos:", err));
    }, []);

    //buscando api de busca
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/products', {
                    params: { search },
                });
                setProducts(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProducts();
    }, [search]);

    return (
        <div className='w-full mx-auto p-20'>
            <div className=''>
                <div>
                    <h1 className="text-2xl font-bold ">Produtos</h1>
                    <p className='text-md font-light '>Gerencie seu inventario de produtos</p>
                </div>
                <div className='flex  justify-end-safe'>
                    <a href="/Form">
                        <button className='bg-blue-500 p-2 rounded-xl text-white' >+ Add Produto</button>
                    </a>
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Buscar por nome do produto..."
                        className="mb-4 p-2 border-[0.5px] rounded w-full max-w-lg"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
            <table className=" min-w-full table-auto  border-[0.5px] border-gray-300">
                <thead className=''>
                    <tr className='text-center bg-gray-200/50 font-extralight  '>
                        <th className='p-2 py-2 text-start font-light'>PRODUTO</th>
                        <th className='p-2 font-light '>CATEGORIA</th>
                        <th className='p-2 font-light'>PREÇO</th>
                        <th className='p-2 font-light '>QUANTIDADE</th>
                        <th className='p-2 font-light'>AÇÕES</th>

                    </tr>
                </thead>
                <tbody className='rounded-2xl '>
                    {products.map((prod) =>
                        //busca pelo id
                        <tr key={prod.id} className=' text-center  border-[0.5px] border-gray-300'>
                            <td className='p-2  text-start '>{prod.Product_name}</td>
                            <td className='p-2  text-blue-500'>{prod.category}</td>
                            <td className='p-2 '>{prod.price}</td>
                            <td className='p-2'>{prod.quantity}</td>
                            <td className='mx-auto  '><button>Editar</button>
                                <button>Excluir</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

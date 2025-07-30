'use client';

import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";
import api from '../../lib/api';
import { useEffect, useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip,);

export default function ChartContent() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Todas");
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    //recebendo api
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/products');
                setProducts(res.data);
            } catch (error) {
                console.error('Erro ao carregar os dados', error);
            }
        };
        fetchData();
    }, []);

    // Atualiza o gráfico toda vez que os produtos ou a categoria mudam
    useEffect(() => {
        const filteredProducts =
            selectedCategory === "Todas"
                ? products
                : products.filter(prod => prod.category === selectedCategory);

        const labels = filteredProducts.map((prod) => prod.Product_name);
        const quantity = filteredProducts.map((prod) => prod.quantity);

        setChartData({
            labels,
            datasets: [
                {
                    label: 'Quantidade em estoque',
                    data: quantity,
                    backgroundColor: 'rgba(59, 130, 246, 0.6)',
                    borderRadius: 5,
                },
            ],
        });
    }, [products, selectedCategory]);

    //mostrando os dados pela categoria
    const categories = ['Todas', ...new Set(products.map(prod => prod.category))];

    return (
        <div className="w-full max-w-3xl mx-auto bg-white p-4 rounded-xl shadow mt-10">
            <h2 className="text-lg font-semibold mb-4 ">Estoque por Produto</h2>

            <div className="mb-4">
                <label className="mr-2 text-md font-medium">Filtrar por categoria:</label>
                <select
                    className="border border-gray-300 rounded p-1"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {/* percore todas as categorias e mostra no front */}
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            <Bar data={chartData} />
        </div>
    );
}

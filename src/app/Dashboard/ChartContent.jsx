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

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);


export default function ChartContent() {
    const [products, setProducts] = useState([]);
    const [SelectCategory, setSelectedCategory] = useState('Todas');
    const [chartData, SetChartData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        const fetchData = async () => {


            try {
                //puxando os dados pela api
                const res = await api.get('/products');
                const products = res.data;

                //mostrando nome dos produtos
                const labels = products.map((prod) => prod.Product_name);
                //mostrando a quantidade dos produtos
                const quantity = products.map((prod) => prod.quantity)

                SetChartData({
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
            } catch (error) {
                console.error('Erro ao carregar os dados', error)

            }
        };
        fetchData();

    }, []);

    const categories = ['Todas', ...new Set(products.map(prod => prod.category))];


    return (
        <div>
            <div className="w-full max-w-3xl mx-auto bg-white p-4 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-4">Estoque por Produto</h2>
                <Bar data={chartData} />
            </div>
        </div >
    )
}
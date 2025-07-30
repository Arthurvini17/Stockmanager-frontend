'use client';

import { IoStatsChartSharp } from "react-icons/io5";
import { FaBox } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

    return (
        <div>
            <header className="flex  justify-between p-2 items-center   shadow-xl  ">
                <div className=" flex flex-row items-center gap-2 ">
                    <h1 className=" flex items-center gap-2 font-semibold text-xl">
                        <FaBox className="text-base text-blue-500" />
                        StockManager</h1>
                </div>

                <nav className="">
                    <div className="flex flex-row  text-center items-center  gap-5  ">
                        <Link href="/Dashboard">
                            <h2
                                className={`hover:bg-gray-500/50 rounded p-2 flex items-center gap-2 ${pathname === "/Dashboard" ? "bg-blue-400/30 text-blue-800" : ""}`}>
                                <IoStatsChartSharp />
                                Dashboard
                            </h2>
                        </Link>
                        <Link href="/Products">
                            <h2
                                className={`hover:bg-gray-500/50 rounded p-2 flex items-center gap-2 ${pathname === "/Products" ? "bg-blue-400/30 text-blue-800 " : ""}`}>
                                <FaBox className="" />
                                Products
                            </h2>
                        </Link>

                        <Link href="/Form">
                            <h2
                                className={`hover:bg-gray-500/50 rounded p-2 flex items-center gap-2 ${pathname === "/Form" ? "bg-blue-400/30 text-blue-800 " : ""}`}>
                                <FaBox className="" />
                                Add Produto
                            </h2>
                        </Link>

                    </div>
                </nav>
            </header>
        </div >
    )

}
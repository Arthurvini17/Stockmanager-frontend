import { IoStatsChartSharp } from "react-icons/io5";
import { FaBox } from "react-icons/fa";
import Link from "next/link";

export default function Header() {
    return (
        <div>
            <header className="flex  justify-between p-2 items-center   shadow-xl">
                <div className=" flex flex-row items-center gap-2 ">
                    <FaBox className=" text-blue-500" />
                    <h1>  StockManager</h1>
                </div>

                <nav className="">
                    <div className="flex flex-row gap-2 text-center items-center  mx-auto ">
                        <Link href="/Dashboard">
                            <h2 className="hover:bg-gray-500/50 rounded p-2"> <IoStatsChartSharp className="inline-flex text-xs" /> DashBoard</h2>
                        </Link>
                        <h2 className="hover:bg-gray-500/50 rounded p-2"> <FaBox className="inline-flex text-xs " /> Products</h2>
                        <h2 className="hover:bg-gray-500/50 rounded p-2"> + Add Product</h2>
                    </div>
                </nav>
            </header>
        </div>
    )

}
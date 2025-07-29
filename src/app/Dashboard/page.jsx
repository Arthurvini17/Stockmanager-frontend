import Header from "../components/Header";
import ChartContent from "./ChartContent";
import ShowItensDash from "./ShowItensDash";

export default function Dashboard() {
    return (

        <div>
            <Header />
            <ShowItensDash />
            <ChartContent />
        </div>

    )
}
import { useEffect, useState } from "react";
import CategoricalGraph from "./CategoricalGraph";

const TODAY = new Date();
const YEAR = TODAY.getFullYear();
const MONTH = TODAY.getMonth();


export default function Dashboard() {
    const [today, setToday] = useState(new Date());
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());
    const [day, setDay] = useState(new Date().getDate());

    /*
    useEffect(() => {
        console.log(today);
        console.log(today.getFullYear());
        console.log(today.getMonth());
    }, []);
    */

    return (
        <>
            <CategoricalGraph
                date={{
                    today: today,
                    year: year,
                    month: month,
                    day: day,
                }}
            />
        </>
    )
}
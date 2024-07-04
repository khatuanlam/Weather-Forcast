import { Board } from "@components/Board";
import { Card } from "@components/Card";
import Contact from "@components/Contact";
import Search from "@components/Search";
import CONFIG from "@site.config";
import { useState } from "react";
const MainLayout = () => {

    const [city, setCity] = useState('')
    const [data, setData] = useState(null)

    const handleInputChange = (e) => {
        setCity(e.target.value)
    }

    const getForeCast = async () => {
        try {
            const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${CONFIG.API_KEY}&q=${city || CONFIG.City}&days=8`)
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            setData(data);
        } catch (error) {
            console.log('Unable to get data ', error);
        }
    }


    return (
        <div>
            <main className="max-w-7xl min-w-max mx-auto p-4">
                <div className="flex justify-center " >
                    <div className="w-full sm:w-2/5 m-3 ">
                        <Search city={city} handleInputChange={handleInputChange} fetch={getForeCast} />
                        <Contact />
                    </div>
                    <div className="w-full sm:w-3/5 transition-opacity">
                        {data && <> <Board {...data} />
                            <h2 className="text-xl font-bold my-4">4-Day Forecast</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                                {data.forecast.forecastday.map((ft) => (
                                    ft && <Card key={ft.date} forecast={ft} />
                                ))}
                            </div></>
                        }
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MainLayout
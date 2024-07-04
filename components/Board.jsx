export const Board = ({ current, location }) => {
    return (
        <div className="bg-blue-500 text-white p-4 rounded-md shadow-md flex justify-between hover-card">
            <div className="">
                <h2 className="text-xl font-bold"> {location.name} {location.localtime}</h2>
                <p>Temperature: {current.temp_c}°C</p>
                <p>Wind: {current.wind_kph} M/S</p>
                <p>Humidity: {current.humidity}%</p>
            </div>
            <div className="flex-row my-2 mr-10">
                {<img src={current.condition.icon || '@public/apple-touch-icon.png'} alt="weather icon" className="h-24 w-24" />}
                <p className="mt-2 text-center">{current.condition.text}</p>
            </div>
        </div>
    );
}
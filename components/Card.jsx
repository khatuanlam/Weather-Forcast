export const Card = ({ forecast }) => {
    return (
        <div className="bg-gray-500 p-4 rounded-md shadow-md text-white overflow-hidden hover-card">
            <h2 className="head-text">{forecast.date}</h2>
            <div className="flex items-center my-2">
                {<img src={forecast.day.condition.icon || '@public/apple-touch-icon.png'} alt="weather icon" className="h-24 w-24" />}
            </div>
            <p>Temp: {forecast.day.avgtemp_c}°C</p>
            <p>Wind: {forecast.day.maxwind_mph} M/S</p>
            <p>Humidity: {forecast.day.avghumidity}%</p>
        </div>
    );
}
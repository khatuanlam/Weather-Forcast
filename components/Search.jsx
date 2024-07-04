const Search = ({ handleInputChange, city, fetch }) => {
    return (
        <div className="bg-transparent  rounded-md ">
            <label className="block text-gray-700 mb-2 font-bold " htmlFor="city">
                Enter a city name
            </label>
            <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3"
                type="text"
                value={city}
                onChange={handleInputChange}
                placeholder="E.g., New York, London, Tokyo"
            />
            <button onClick={fetch} className="w-full bg-blue-600 text-white p-2 rounded ">
                Search
            </button>
            <div className="text-center my-2 text-gray-500">or</div>
            <button className="w-full bg-gray-500 text-white p-2 rounded">
                Use Current Location
            </button>
        </div>
    );
}

export default Search

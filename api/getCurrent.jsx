const API_KEY = 'b711e5d4093e4927b83100518240307'

export const getCurrentWeather = async (name) => {
    const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${name}`)
    const data = await res.json();
    return {
        props: {
            data
        }
    };
}




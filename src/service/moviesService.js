import api from "./api";

//--API CALLS--
//--Get Popular Movies--
export const getPopularMovies = async( filters = {} ) => {
    try {
        let url = "/movie/popular?";
        if (filters.year) url = `/discover/movie?primary_release_year=${filters.year}`;
        // if (filters.genre) url += `/discover/movie?with_genres=${filters.genre.name}`;

        const response = await api.get(url);
        return response.data.results;
    } catch(error) {
        console.log(error)
        throw new Error("Could not show popular movies. Please try again later. 😔🎬");
    }
}

//--Get Film Details --
export const getFilmDetails = async(id) => {
    try{
        const response = await api.get(`/movie/${id}`);
        return response.data;
    } catch(error) {
        console.log(error)
        throw new Error("Could not show the film details. Please try again later. 😔🎬");
    }
}

//--Load more pages--
export const loadFilmPages = async(page) => {
    try {
        const response = await api.get(`/movie/popular?page=${page}&api_key=${import.meta.env.API_KEY}}`)
        return response.data.results;
    } catch(error) {
        console.log(error)
        throw new Error("No more films available at the moment. Please try again later. 😔🎬");
    }
}
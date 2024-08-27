import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = process.env.REACT_APP_WEATHER_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;
export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query({
      query: (city) => {
        const url = `weather?q=${city}&appid=${apiKey}`;
        console.log(url);
        return url;
      },
    }),
    getWeatherByCoords: builder.query({
      query: ({ lat, lon, units }) => {
        const coordUrl = `weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
        console.log(coordUrl);

        return coordUrl;
      },
    }),
  }),
});
export const { useGetWeatherByCityQuery, useGetWeatherByCoordsQuery } =
  weatherApi;

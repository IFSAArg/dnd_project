import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {BASE_URL} from "../helpers/constants/api.ts";

export const rtkApi = createApi({
    reducerPath: 'api',
    tagTypes: ['Characters', 'mapMarkers', 'locations'],
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    endpoints: () => ({}),
});
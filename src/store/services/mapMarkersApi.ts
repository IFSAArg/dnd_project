import { rtkApi } from "../../API/rtkApi";
import { IMarkerState } from "../../types/mapMarker";

const mapMarkerApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getMarkers: build.query<IMarkerState[], null>({
      query: () => ({
        url: '/mapMarkers',
      }),
      providesTags: (result) => result 
            ? [
                ...result.map(({id}) => ({type: 'mapMarkers' as const, id})),
                {type: 'mapMarkers', id: 'LIST' as const},
            ]
            : [{type: 'mapMarkers', id: 'LIST' as const}],
    }),
    addMarker: build.mutation<null, Partial<IMarkerState>>({
      query: (newMarker) => ({
        url: '/mapMarkers',
        method: 'POST',
        body: newMarker,
      }),
      invalidatesTags: [{type: 'mapMarkers', id: 'LIST'}],
    }),
    deleteMarker: build.mutation<null, string> ({
      query: (markerId) => ({
        url: `mapMarkers/${markerId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{type: 'mapMarkers', id}],
    }),
    updateMarker: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `mapMarkers/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'mapMarkers', id },
      ],
    })
  })
})

export const useGetMarkers = mapMarkerApi.useGetMarkersQuery
export const useAddMarker = mapMarkerApi.useAddMarkerMutation
export const useDeleteMarker = mapMarkerApi.useDeleteMarkerMutation
export const useUpdatePositionMarker = mapMarkerApi.useUpdateMarkerMutation
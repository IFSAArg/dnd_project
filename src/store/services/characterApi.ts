import { ICharacter } from '../../types/characterTypes.js';
import {rtkApi} from "../../API/rtkApi.ts";

const charactersApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getCharacters: build.query<ICharacter[], null>({
            query: () => ({
                url: '/characters',
            }),
            providesTags: (result) => result 
            ? [
                ...result.map(({id}) => ({type: 'Characters' as const, id})),
                {type: 'Characters', id: 'LIST' as const},
            ]
            : [{type: 'Characters', id: 'LIST' as const}],
        }),
        updateCharacters: build.mutation<void, ICharacter>({
            query: (character) => ({
                url: `/characters/${character.id}`,
                method: 'PATCH',
                body: character,
            }),
            invalidatesTags: [{type: 'Characters', id: 'LIST' as const}]
        }),
    }),
});

export const useGetCharacters = charactersApi.useGetCharactersQuery;
export const useUpdateCharacters = charactersApi.useUpdateCharactersMutation;
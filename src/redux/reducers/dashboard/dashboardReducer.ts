import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        allCollaborators: [],
        allDocuments: [],
        importedDocuments: [],
        allChats: [],
    },
    reducers: {
        setCollaborators: (state: any, action: PayloadAction<{allCollaborators: any[]}>) => {
            state.allCollaborators.push(action?.payload);
        },
        setAllDocuments: (state: any, action: PayloadAction<{allDocuments: any[]}>) => {
            state.allDocuments.push(action?.payload);
        },
        setImportedDocs: (state: any, action: PayloadAction<{importedDocuments: any[]}>) => {
            state.importedDocuments.push(action?.payload);
        },
        setAllChats: (state: any, action: PayloadAction<{allChats: any[]}>) => {
            state.allChats.push(action?.payload);
        }
    }
})


export const { setAllChats, setAllDocuments, setCollaborators, setImportedDocs } = dashboardSlice.actions;
export default dashboardSlice.reducer;
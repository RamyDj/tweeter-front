import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value : []
};

export const hashtagsSlice = createSlice({
    name : 'hashtags',
    initialState,
    reducers : {
        setHashtagList : (state, action)=>{
            state.value = action.payload
        }
    }
})

export const {setHashtagList} = hashtagsSlice.actions;
export default hashtagsSlice.reducer;
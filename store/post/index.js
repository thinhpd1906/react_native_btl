import { createSlice } from '@reduxjs/toolkit'

const INIT =  {
    allPosts: {
        posts : null,
        comment : null
    },
    newPosts: {
        post: null,
    },
    comment: null,
    is_post: {
        id: null,
    }
}

export const post = createSlice({
    name: 'post',
    initialState: INIT,
    reducers: {
        getAllPostSuccess: (state, action) => {
            state.allPosts.posts = action.payload;
            return state;
        },
        getNewPostSuccess:(state, action) => {
            state.newPosts.post = action.payload;
            return state;
        },
        getCommentSuccess:(state, action) => {
            state.comment = action.payload;
            return state;
        },
        getIdPostSuccess:(state, action) => {
            state.is_post.post = action.payload;
            return state;
        }
    },
})

export const {
    getAllPostSuccess,
    getNewPostSuccess,
    getCommentSuccess,
    getIdPostSuccess,
} = post.actions;

export default post.reducer;
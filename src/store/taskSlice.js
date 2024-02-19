import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getAlltasks = createAsyncThunk("getAllTasks", async () => {
  const res = await axios.get('http://127.0.0.1:5000/api/tasks')
  const result = res.data
  return result
})

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder.addCase(getAlltasks.pending, (state) => {
      state.loading = true
    })
      .addCase(getAlltasks.fulfilled, (state, action) => {
        state.loading = false
        state.tasks = action.payload
      })
      .addCase(getAlltasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
  }
})
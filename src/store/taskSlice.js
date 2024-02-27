import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getAlltasks = createAsyncThunk("getAllTasks", async () => {
  const res = await axios.get('http://127.0.0.1:5000/api/tasks')
  const result = res.data
  return result
})

export const addNewTask = createAsyncThunk("addNewtask", async (task) => {
  const res = await axios.post('http://127.0.0.1:5000/api/tasks', task, {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  )
  const result = res.data
  return result
})

export const deleteTask = createAsyncThunk("deletetask", async (id) => {
  const res = await axios.delete(`http://127.0.0.1:5000/api/tasks/${id}`
  )
  const result = res.data
  return result
})



export const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: [],
    loading: false,
    message: '',
    error: null
  },
  reducers: {
    rstMsgErr: (state) => {
      if (!state.error) {
        state.message = ''
        state.error = null
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAlltasks.pending, (state) => {
      state.loading = true
    })
      .addCase(getAlltasks.fulfilled, (state, action) => {
        state.loading = false
        state.tasks = action.payload.taskList
        state.message = action.payload.msg
      })
      .addCase(getAlltasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })

    builder.addCase(addNewTask.pending, (state) => {
      state.loading = true
    })
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.loading = false
        // state.tasks.push()
        state.tasks.push(action.payload.newtask)
        state.message = action.payload.msg
      })
      .addCase(addNewTask.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })

    builder.addCase(deleteTask.pending, (state) => {
      state.loading = true
    })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false
        state.tasks = state.tasks.filter((tsk) => (
          tsk.id !== action.payload.taskId
        ))
        state.message = action.payload.msg
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.modal = true
      })
  }
})

export default taskSlice.reducer
export const { rstMsgErr } = taskSlice.actions
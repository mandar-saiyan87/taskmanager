import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getAlltasks = createAsyncThunk("getAllTasks", async () => {
  const res = await axios.get(`${import.meta.env.VITE_APP_API_SRV}/api/tasks`)
  const result = res.data
  return result
})

export const addNewTask = createAsyncThunk("addNewtask", async (task) => {
  const res = await axios.post(`${import.meta.env.VITE_APP_API_SRV}/api/tasks`, task, {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  )
  const result = res.data
  return result
})

export const deleteTask = createAsyncThunk("deletetask", async (id) => {
  const res = await axios.delete(`${import.meta.env.VITE_APP_API_SRV}/api/tasks/${id}`
  )
  const result = res.data
  return result
})


export const editTask = createAsyncThunk("editTask", async (taskItem) => {
  const { taskId, newTask } = taskItem
  const res = await axios.put(`${import.meta.env.VITE_APP_API_SRV}/api/tasks/${taskId}`, newTask)
  const result = res.data
  return result
})


export const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: [],
    loading: false,
    message: '',
    error: null,
    viewType: false,
  },
  reducers: {
    setView: (state) => {
      state.viewType = !state.viewType
    },
    rstMsgErr: (state) => {
      state.message = ''
      state.error = null
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
        state.error = action.error
        state.modal = true
      })

    builder.addCase(editTask.pending, (state) => {
      state.loading = true
    })
      .addCase(editTask.fulfilled, (state, action) => {
        state.loading = false
        const updatedItem = action.payload.updatedTask
        const edited = state.tasks.findIndex((item) => (
          item.id === updatedItem.id
        ))
        state.tasks[edited] = updatedItem
        state.message = action.payload.msg
      })
      .addCase(editTask.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
  }
})

export default taskSlice.reducer
export const { rstMsgErr, setView, setDragged } = taskSlice.actions

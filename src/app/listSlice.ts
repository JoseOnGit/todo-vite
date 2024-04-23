import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface TaskState {
  id: string;
  text: string;
  completed: boolean;
}

export interface ListState {
  list: TaskState[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: ListState = {
  list: [],
  status: "idle",
  error: null,
};

const urlRoot = "http://localhost:8080/tasks";

export const getAllTasksAsync = createAsyncThunk(
  "tasks/getThemAll",
  async () => {
    try {
      const response = await fetch(urlRoot);
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const addNewTasksAsync = createAsyncThunk(
  "tasks/addNewTask",
  async (task) => {
    try {
      const response = await fetch(urlRoot, {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const editTasksAsync = createAsyncThunk(
  "tasks/editTask",
  async (task) => {
    try {
      const response = await fetch(`${urlRoot}/${task.id}`, {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const completeTasksAsync = createAsyncThunk(
  "tasks/completeTask",
  async (id) => {
    try {
      const response = await fetch(`${urlRoot}/${id}/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const incompleteTasksAsync = createAsyncThunk(
  "tasks/completeTask",
  async (id) => {
    try {
      const response = await fetch(`${urlRoot}/${id}/incomplete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const closeTasksAsync = createAsyncThunk(
  "tasks/closeTask",
  async (id) => {
    try {
      const response = await fetch(`${urlRoot}/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const listSlice = createSlice({
  name: "toDoList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasksAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllTasksAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = action.payload;
      })
      .addCase(getAllTasksAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })

      .addCase(addNewTasksAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewTasksAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = [action.payload, ...state.list];
      })
      .addCase(addNewTasksAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })

      .addCase(editTasksAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editTasksAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = state.list.map((task) => {
          if (task.id === action.payload.id) {
            return {
              id: task.id,
              text: action.payload.text,
              completed: task.completed,
            };
          }
          return task;
        });
      })
      .addCase(editTasksAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })

      .addCase(closeTasksAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(closeTasksAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = state.list.filter((task) => task.id !== action.meta.arg);
      })
      .addCase(closeTasksAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })

      .addCase(completeTasksAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(completeTasksAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = state.list.map((task) => {
          if (task.id === action.payload.id) {
            return {
              ...task,
              completed: action.payload.completed,
            };
          }
          return task;
        });
      })
      .addCase(completeTasksAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const listSelector = (state: RootState): TaskState[] =>
  state.toDoList?.list;

export const listLoadingSelector = (state: RootState): string =>
  state.toDoList?.status;

export const listErrorSelector = (state: RootState): string | null =>
  state.toDoList?.error;

export default listSlice.reducer;

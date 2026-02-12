import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  generateRoadmap,
  getRoadmapHistory,
  deleteRoadmap,
  deleteAllRoadmaps,
} from "../../api/roadmapApi";

// ✅ Fetch History
export const fetchRoadmapHistory = createAsyncThunk(
  "roadmap/fetchHistory",
  async (userId, thunkAPI) => {
    try {
      const data = await getRoadmapHistory(userId);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || "Failed to fetch history"
      );
    }
  }
);

// ✅ Generate Roadmap
export const generateRoadmapThunk = createAsyncThunk(
  "roadmap/generate",
  async ({ userId, userEmail, topic, goal }, thunkAPI) => {
    try {
      const data = await generateRoadmap({ userId, userEmail, topic, goal });
      return data.chat; // { roadmap, topic, ... }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || "Failed to generate roadmap"
      );
    }
  }
);

// ✅ Delete One
export const deleteRoadmapThunk = createAsyncThunk(
  "roadmap/deleteOne",
  async (chatId, thunkAPI) => {
    try {
      await deleteRoadmap(chatId);
      return chatId;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || "Failed to delete roadmap"
      );
    }
  }
);

// ✅ Delete All
export const deleteAllRoadmapsThunk = createAsyncThunk(
  "roadmap/deleteAll",
  async (userId, thunkAPI) => {
    try {
      await deleteAllRoadmaps(userId);
      return userId;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || "Failed to delete all roadmaps"
      );
    }
  }
);

const roadmapSlice = createSlice({
  name: "roadmap",
  initialState: {
    roadmap: "",
    history: [],
    loading: false,
    error: null,
  },

  reducers: {
    setRoadmap: (state, action) => {
      state.roadmap = action.payload;
    },
    clearRoadmap: (state) => {
      state.roadmap = "";
    },
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // 🔹 Fetch History
      .addCase(fetchRoadmapHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoadmapHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(fetchRoadmapHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Generate Roadmap
      .addCase(generateRoadmapThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateRoadmapThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.roadmap = action.payload.roadmap;
      })
      .addCase(generateRoadmapThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Delete One
      .addCase(deleteRoadmapThunk.fulfilled, (state, action) => {
        state.history = state.history.filter((x) => x._id !== action.payload);
      })

      // 🔹 Delete All
      .addCase(deleteAllRoadmapsThunk.fulfilled, (state) => {
        state.history = [];
        state.roadmap = "";
      });
  },
});

export const { setRoadmap, clearRoadmap, clearError } = roadmapSlice.actions;
export default roadmapSlice.reducer;
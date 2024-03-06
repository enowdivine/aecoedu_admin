import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = `https://aecoedu-59e5eed6446e.herokuapp.com/api/v1`;

const initialState = {};

export const getEvents = createAsyncThunk("app/getEvents", async (thunkAPI) => {
  try {
    const response = await axios.get(`${base_url}/events`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    const message =
      (error.message && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const getSingleEvent = createAsyncThunk(
  "app/getEvents",
  async (id, thunkAPI) => {
    console.log(id);
    try {
      const response = await axios.get(`${base_url}/events`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createEvent = createAsyncThunk(
  "app/createEvent",
  async (data, thunkAPI) => {
    console.log(data)
    try {
      const response = await axios.post(`${base_url}/events/create`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateEvent = createAsyncThunk(
  "app/updateEvent",
  async (data, thunkAPI) => {
    console.log(data.title)
    try {
      const response = await axios.put(
        `${base_url}/events/update/${data.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "app/deleteEvent",
  async (id, thunkAPI) => {
    try {
      console.log(id);
      const eventId = id;
      console.log(eventId);
      const response = await axios.delete(
        `${base_url}/events/delete/${eventId.id}`
      );
      return response.data;
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
//
// news api funtions
//
export const getNews = createAsyncThunk("app/getNews", async (thunkAPI) => {
  try {
    const response = await axios.get(`${base_url}/news`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;

  } catch (error) {
    const message =
      (error.message && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const getSingleNews = createAsyncThunk(
  "app/getNews",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${base_url}/news/${id}`);
      return response.data;
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createNews = createAsyncThunk(
  "app/createNews",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${base_url}/news/create`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateNews = createAsyncThunk(
  "app/updateNews",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${base_url}/news/update/${data.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteNews = createAsyncThunk(
  "app/deleteEvent",
  async (id, thunkAPI) => {
    console.log(id);
    const newsId = id;
    try {
      const response = await axios.delete(`${base_url}//deletnews/${newsId.id}`);
      return response.data;
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
//
// partner api funtions
//
export const getPartners = createAsyncThunk(
  "app/getPartners",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${base_url}/partners`);
      return response.data;
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSinglePartner = createAsyncThunk(
  "app/getPartner",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${base_url}/partners/${id}`);
      return response.data;
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createPartner = createAsyncThunk(
  "app/createPartners",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${base_url}/partners/create`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePartner = createAsyncThunk(
  "app/updatePartner",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${base_url}/partners/update/${data.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deletePartner = createAsyncThunk(
  "app/deletePartner",
  async (id, thunkAPI) => {
    console.log(id);
    const partnerId = id;
    try {
      const response = await axios.delete(`${base_url}/partners/delete/${partnerId.id}`);
      return response.data;
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
//
// testimony api funtions
//
export const getTestimonies = createAsyncThunk(
  "app/getTestimonials",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${base_url}/testimonials`);
      return response.data;
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSingleTestimony = createAsyncThunk(
  "app/getTestimony",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${base_url}/testimonials/${id}`);
      return response.data;
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createTestimony = createAsyncThunk(
  "app/createTestimony",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${base_url}/testimony/create`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateTestimony = createAsyncThunk(
  "app/updateTestimony",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${base_url}/testimony/update/${data.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteTestimony = createAsyncThunk(
  "app/deleteTestimony",
  async (id, thunkAPI) => {
    console.log(id);
    const TestimonyId = id;
    try {
      const response = await axios.delete(`${base_url}/testimony/delete/${TestimonyId.id}`);
      return response.data;
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
//
// hostCenter api funtions
//
export const getHostCenters = createAsyncThunk(
  "app/getHostCenters",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${base_url}/hostcenters`);
      return response.data;
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSingleHostCenter = createAsyncThunk(
  "app/getHostCenter",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${base_url}/hostcenters/${id}`);
      return response.data;
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createHostCenter = createAsyncThunk(
  "app/createHostCenter",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${base_url}/hostcenters/create`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateHostCenter = createAsyncThunk(
  "app/updateHostCenter",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${base_url}/hostcenters/update/${data.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteHostCenter = createAsyncThunk(
  "app/deleteHostCenter",
  async (id, thunkAPI) => {
    console.log(id);
    const hcId = id;
    try {
      const response = await axios.delete(
        `${base_url}/hostcenters/delete/${hcId.id}`
      );
      return response.data;
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

export const { } = authSlice.actions;

export default authSlice.reducer;

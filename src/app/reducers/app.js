import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = `${process.env.REACT_APP_BASE_URL}/api/${process.env.REACT_APP_API_VERSON}`

const initialState = {};

export const getEvents = createAsyncThunk("app/getEvents", async (thunkAPI) => {
  try {
    const response = await axios.get(`${base_url}/events`);
    return response.data;
  } catch (error) {
    const message =
      (error.message && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const createEvent = createAsyncThunk(
  "app/createEvent",
  async (data, thunkAPI) => {
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
      const response = await axios.delete(
        `${base_url}/events/delete/${id}`
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
    const response = await axios.get(`${base_url}/news`);
    return response.data;
  } catch (error) {
    const message =
      (error.message && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const createNews = createAsyncThunk(
  "app/createNews",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${base_url}/news/create`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
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
        data.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
    try {
      const response = await axios.delete(
        `${base_url}/news/delete/${id}`
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

export const createPartner = createAsyncThunk(
  "app/createPartners",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${base_url}/partners/create`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
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
        data.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
    try {
      const response = await axios.delete(
        `${base_url}/partners/delete/${id}`
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

export const createTestimony = createAsyncThunk(
  "app/createTestimony",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${base_url}/testimonials/create`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
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
        `${base_url}/testimonials/update/${data.id}`,
        data.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
    try {
      const response = await axios.delete(
        `${base_url}/testimonials/delete/${id}`
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

export const createHostCenter = createAsyncThunk(
  "app/createHostCenter",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${base_url}/hostcenters/create`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
        data.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
    try {
      const response = await axios.delete(
        `${base_url}/hostcenters/delete/${id}`
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
export const updateUserEmail = createAsyncThunk(
  "app/updateUserEmail",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(`${base_url}/auth/update/${data.id}`, data, {
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

export const updateUserPassword = createAsyncThunk(
  "app/updateUserPassword",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(`${base_url}/auth/update-password/${data.id}`, data, {
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
//
// article api funtions
//
export const getArticles = createAsyncThunk("app/getArticles", async (thunkAPI) => {
  try {
    const response = await axios.get(`${base_url}/articles`);
    return response.data;
  } catch (error) {
    const message =
      (error.message && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const getSingleArticle = createAsyncThunk("app/getSingleArticle", async (id, thunkAPI) => {
  try {
    const response = await axios.get(`${base_url}/articles/${id}`);
    return response.data;
  } catch (error) {
    const message =
      (error.message && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const createArticle = createAsyncThunk(
  "app/createArticle",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${base_url}/articles/create`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
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

export const updateArticle = createAsyncThunk(
  "app/updateArticle",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${base_url}/articles/update/${data.id}`,
        data.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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

export const deleteArticle = createAsyncThunk(
  "app/deleteArticle",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${base_url}/articles/delete/${id}`
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

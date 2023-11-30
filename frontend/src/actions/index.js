import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import api from "./api";

const PORT = "http://localhost:3001";

export const usePostLogin = () => {
  const queryClient = useQueryClient();

  const postLoginMutation = useMutation(
    (credentials) => postLogin(credentials),
    {
      onSuccess: (data) => {
        window.localStorage.setItem("loginUser", JSON.stringify(data));

        queryClient.invalidateQueries("notes");
        queryClient.invalidateQueries("categories");
      },
    }
  );

  const postLogin = async (credentials) => {
    const { data } = await api.post(`${PORT}/login`, credentials);
    return data;
  };

  const logout = () => {
    window.localStorage.removeItem("loginUser");
    queryClient.invalidateQueries("notes");
    queryClient.invalidateQueries("categories");
  };

  return {
    postLogin: postLoginMutation.mutateAsync,
    logout,
    isLoading: postLoginMutation.isLoading,
    isError: postLoginMutation.isError,
  };
};

export function useGetNotes() {
  return useQuery("notes", async () => {
    const response = await api.get(`${PORT}/notes`);
    return response.data;
  });
}

export function usePostNote() {
  const queryClient = useQueryClient();
  const postNoteMutation = useMutation(
    async ({ title, description, categories }) => {
      const response = await api.post(`${PORT}/notes`, {
        title,
        description,
        categories,
      });
      return response.data;
    }
  );

  const postNote = async ({ title, description, categories }) => {
    await postNoteMutation.mutateAsync({ title, description, categories });

    queryClient.invalidateQueries("notes");
    queryClient.invalidateQueries("categories");
  };

  return {
    postNote,
    isLoading: postNoteMutation.isLoading,
    isError: postNoteMutation.isError,
  };
}

export const usePostUser = () => {
  return useMutation((body) => {
    return axios.post(`${PORT}/users`, body);
  });
};

export function usePutNote() {
  const queryClient = useQueryClient();
  const putNoteMutation = useMutation(
    async ({ id, title, description, archived, categories }) => {
      const response = await api.put(`${PORT}/notes/${id}/`, {
        title,
        description,
        archived,
        categories,
      });
      return response.data;
    }
  );

  const putNote = async ({ id, title, description, archived, categories }) => {
    await putNoteMutation.mutateAsync({
      id,
      title,
      description,
      archived,
      categories,
    });

    queryClient.invalidateQueries("notes");
  };

  return {
    putNote,
    isLoading: putNoteMutation.isLoading,
    isError: putNoteMutation.isError,
    refresh: putNoteMutation.reset,
  };
}

export function usePatchNote() {
  const queryClient = useQueryClient();
  const patchNoteMutation = useMutation(async ({ id, archived }) => {
    const response = await api.patch(`${PORT}/notes/${id}/`, {
      archived,
    });
    return response.data;
  });

  const patchNote = async ({ id, archived }) => {
    await patchNoteMutation.mutateAsync({
      id,
      archived,
    });
    queryClient.invalidateQueries("notes");
  };

  return {
    patchNote,
    isLoading: patchNoteMutation.isLoading,
    isError: patchNoteMutation.isError,
    refresh: patchNoteMutation.reset,
  };
}

export function useDeleteNote() {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation(async (noteId) => {
    const response = await api.delete(`${PORT}/notes/${noteId}`);
    return response.data;
  });

  const deleteNote = async (noteId) => {
    await deleteNoteMutation.mutateAsync(noteId);
    queryClient.invalidateQueries("notes");
  };

  return {
    deleteNote,
    isLoading: deleteNoteMutation.isLoading,
    isError: deleteNoteMutation.isError,
  };
}

export function useGetCategories() {
  return useQuery("categories", async () => {
    const response = await axios.get(`${PORT}/categories`);
    return response.data;
  });
}

export function useGetCategoryById() {
  const categoryByIdMutation = useMutation(async (id) => {
    const response = await axios.get(`${PORT}/categories/${id}`);
    return response.data;
  });

  const getCategoryById = async (id) => {
    return await categoryByIdMutation.mutateAsync(id);
  };

  return {
    getCategoryById,
    isLoading: categoryByIdMutation.isLoading,
    isError: categoryByIdMutation.isError,
  };
}

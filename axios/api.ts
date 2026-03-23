import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { handleError } from './error';
import api from './instance';
import { Header_types, TaskCreation, TaskQuery, UserTask_types } from '@/types/type';
import Toast from 'react-native-toast-message';
type ApiResponse<T> = {
  success: boolean;
  data: T;
};
export const UsepostAddHeading = () => {
  const queryClient = useQueryClient();

  const addheadingFn = async (title: string) => {
    const res = await api.post('/heading', {
      title: title,
    });
    return res;
  };

  return useMutation({
    mutationFn: addheadingFn,

    mutationKey: ['heading'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['heading'] });


      queryClient.invalidateQueries({ queryKey: ['logs'] });


    },
  });
};

export const UseDeleteHeading = () => {
  const queryClient = useQueryClient();

  const deletefn = async (id: string) => {
    const res = await api.delete(`/heading/${id}`);
    return res;
  };

  return useMutation({
    mutationFn: deletefn,

    mutationKey: ['heading'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['heading'] });
      queryClient.invalidateQueries({ queryKey: ['alltask'] });
      queryClient.invalidateQueries({ queryKey: ['logs'] });

      Toast.show({
        type: 'success',
        text1: 'Heading Deleted Successfully',
      });
    },
    onError: (error) => {
      return handleError(error);
    },
  });
};

export const UseUpdateHeading = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Header_types>) => {
      const res = await api.put(`/heading/${data.id}`, data);
      return res;
    },

    mutationKey: ['editheading'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['heading'] });
      queryClient.invalidateQueries({ queryKey: ['logs'] });
      Toast.show({
        type: 'success',
        text1: 'Heading Updated Successfully',
      })
    },
    onError: (error) => {
      return handleError(error);
    },
  });
};

export const UseGetHeading = () => {
  return useQuery({
    queryKey: ['heading'],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Header_types[]>>('/heading');
      // console.log(res);
      return res.data.data;
    },
  });
};

// export const UseGetTask = () => {
//   return useQuery({
//     queryKey: ['task','heading'],
//     queryFn: async () => {
//       const res = await api.get<ApiResponse<Task[]>>('/task');
//       // console.log(res);
//       return res.data.data;
//     },
//   });
// };

export const UsePostTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TaskCreation) => {
      const res = await api.post('/task', data);
      // console.log(res);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['heading'] });
      queryClient.invalidateQueries({ queryKey: ['alltask'] });
      queryClient.invalidateQueries({ queryKey: ['logs'] });
    },
  });
};

type TaskStatusUpdate = {
  id: string;
  currentStatus: 'NOT_STARTED' | 'STARTED' | 'COMPLETED' | 'CANCELLED';
};

export const UsePutUpdateStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TaskStatusUpdate) => {
      const res = await api.put(`/task/status/${data.id}`, data);
      // console.log(res);

      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['heading'] });
      queryClient.invalidateQueries({ queryKey: ['alltask'] });
      queryClient.invalidateQueries({ queryKey: ['logs'] });

    },
  });
};

type TaskLink = {
  taskId: string;
  links: { url: string; linkType?: string }[];
};

export const UsePostTaskLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TaskLink) => {
      const res = await api.post('/task/link', data);
      // console.log(res);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['heading'] });
      queryClient.invalidateQueries({ queryKey: ['alltask'] });
      queryClient.invalidateQueries({ queryKey: ['logs'] });
    },
    mutationKey: ['taskLink'],
  });
};

export const UseDeleteTaskLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/task/link/${id}`);
      // console.log(res);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['heading'] });
      // queryClient.invalidateQueries({ queryKey: ['alltask'] });
    
      queryClient.invalidateQueries({ queryKey: ['logs'] });
    },
    mutationKey: ['taskLink'],
  });
};

interface UpdateLink {
  id: string;
  url?: string;
  linkType?: string;
}
export const UsePutUpdateTaskLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateLink) => {
      const res = await api.put(`/task/link/${data.id}`, data);
      // console.log(res);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['heading'] });
      queryClient.invalidateQueries({ queryKey: ['alltask'] });
      queryClient.invalidateQueries({ queryKey: ['logs'] });
    },
    mutationKey: ['taskLink'],
  });
};

export const UseGetAllTasks = ({
  search,
  headingId,
  status,
  date,
  page,
  limit,
  userId,
}: TaskQuery) => {
  return useQuery({
    queryKey: ['alltask', search, headingId, status, date, page, limit, userId],
    queryFn: async () => {
      const res = await api.get<ApiResponse<UserTask_types[]>>('/task/all', {
        params: {
          search: search,
          headingId: headingId,
          status: status,
          date: date,
          page: page,
          limit: limit,
          userId: userId,
        },
      });
      // console.log(res);
      return res.data.data;
    },
  });
};

type FilteredHeaderType = {
  id: string;
  title: string;
};

export const UseGetUniqeHeaders = () => {
  return useQuery({
    queryKey: ['uniqeheaders'],
    queryFn: async () => {
      const res = await api.get<ApiResponse<FilteredHeaderType[]>>('/headings/unique');
      // console.log(res);
      return res.data.data;
    },
  });
};

export const UseDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/task/${id}`);
      // console.log(res);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['heading'] });
      queryClient.invalidateQueries({ queryKey: ['alltask'] });
      queryClient.invalidateQueries({ queryKey: ['logs'] });
    },
  });
};

interface TaskWithLink {
  userId: string;
  heading: string;
  task: {
    // headerId: string;
    description?: string;
    // createdAt: Date;
  };
  links?: {
    url: string;
    linkType: string;
  }[];
}

export const UsePostTaskWithLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TaskWithLink) => {
      const res = await api.post('/task-with-link', data);
      // console.log(res);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['heading'] });
      queryClient.invalidateQueries({ queryKey: ['alltask'] });
      queryClient.invalidateQueries({ queryKey: ['logs'] });
    },
  });
};

type TaskUpdateType = {
  id: string;
  description: string;
};

export const UsePutTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TaskUpdateType) => {
      const res = await api.put(`/task/${data.id}`, data);
      // console.log(res);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['heading'] });
      queryClient.invalidateQueries({ queryKey: ['alltask'] });
      queryClient.invalidateQueries({ queryKey: ['logs'] });
    },
  });
};

export const UseGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await api.get<ApiResponse<{ id: string; name: string }[]>>('/users');
      // console.log(res);
      return res.data.data;
    },
  });
};



// export type activity_log={
//   id: string;
//   userI: string;
//   entityId: string;
//   entityType: string;
//   status: string;
//   message: string;
//   timestamp: string;
//   metadata: Record<string, unknown>;
// 
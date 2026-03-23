export type TaskLink = {
  id: string;
  url: string;
  linkType: string;
};

export type Task = {
  id: string;
  headerId?: string;
  description: string;
  currentStatus: 'NOT_STARTED' | 'STARTED' | 'COMPLETED' | 'CANCELLED';
  last_update: Date;
  links: TaskLink[];
};
export type TasksGroup = {
  id: string;
  heading: string;
  createdAt: Date;
  tasks: Task[];
};

export type UserTask_types = {
  id: string;
  name: string;
  headings: {
    id: string;
    title: string;
    tasks: {
      id: string;
      description: string;
      currentStatus: 'NOT_STARTED' | 'STARTED' | 'COMPLETED' | 'CANCELLED';
      last_update: Date;
      links: {
        id: string;
        url: string;
        linkType: string;
      }[];
    }[];
  }[];
};

export type TaskCreation = {
  headingId: string;
  description: string;
  links?: { url: string; linkType: string }[];
};

export type Header_types = {
  id: string;
  heading: string;
  createdAt: Date;
  tasks: Task[];
};

export type TaskQuery = {
  search?: string;
  headingId?: string;
  status?: string;
  date?: string;
  // toDate?: string;
  userId?: string;
  page?: number;
  limit?: number;
};

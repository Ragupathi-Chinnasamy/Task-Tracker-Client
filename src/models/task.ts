import { z } from "zod";
import { GetReq, createdOrModifiedUser } from ".";
import { TaskStatuses, TaskTypes } from "@src/utils/enums";

export const createTaskFormInput = z.object({
  title: z
    .string()
    .min(1, "Title should not be empty")
    .max(30, "Title should not exceed 30 characters"),
  description: z
    .string()
    .min(1, "Description should not be empty")
    .max(200, "Description should not exceed 200 characters"),
  projectId: z.string().refine(
    (value) => {
      const trimmedValue = value.trim();
      return (
        trimmedValue.length > 0 &&
        trimmedValue !== "0" &&
        !isNaN(Number(trimmedValue))
      );
    },
    {
      message: "Project associated should not be empty",
    }
  ),
  typeId: z.nativeEnum(TaskTypes, {
    errorMap: () => {
      return { message: "Task type should not be empty" };
    },
  }),
  taskAssigneeId: z.array(z.string()).refine((arr) => arr.length > 0, {
    message: "Task assignee should not be empty",
  }),
  file: z.instanceof(File).array().optional(),
});

export const updateTaskFormInput = createTaskFormInput.extend({
  statusId: z.nativeEnum(TaskStatuses, {
    errorMap: () => {
      return { message: "Task status should not be empty" };
    },
  }),
});

export const updateTaskInputSchema = updateTaskFormInput.extend({
  taskId: z.number().positive(),
});

export type CreateTaskInput = z.infer<typeof createTaskFormInput>;
export type UpdateTaskInput = z.infer<typeof updateTaskInputSchema>;

export interface CreateTaskReq {
  title: string;
  description: string;
  projectId: string;
  typeId: string;
  taskAssigneeId: number[] | string[];
  file?: File[];
}

export interface UpdateTaskReq extends CreateTaskReq {
  taskId: string;
  statusId: string;
}

export interface GetTask extends GetReq {
  projectId: number;
  typeId: number;
  statusId: number;
  assigneeId: number;
}

type taskAssignees = {
  user: {
    id: number;
    firstName: string;
    lastName: string;
  };
};

type taskImages = {
  id: number;
  image: string;
};

export type TaskRes = {
  id: number;
  title: string;
  description: string;
  projectId: number;
  typeId: number;
  statusId: number;
  createdUserId: number | null;
  modifiedUserId: null | number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  project: {
    id: number;
    title: string;
  };
  status: {
    id: number;
    status: string;
  };
  type: {
    id: number;
    type: string;
  };
  taskAssignees: taskAssignees[];
  taskImages: taskImages[];
  createdByUser: createdOrModifiedUser | null;
  modifiedByUser: createdOrModifiedUser | null;
};

export type TaskTypeRes = {
  id: number;
  type: string;
  isActive: true;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
};

export type TaskStatusRes = {
  id: number;
  status: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
};

import { z } from "zod";
import { CreatedOrModifiedUser } from ".";

export const projectFormInput = z.object({
  title: z
    .string()
    .min(1, "Title should not be empty")
    .max(30, "Title should not exceed 30 characters"),
  description: z
    .string()
    .min(1, "Description should not be empty")
    .max(200, "Description should not exceed 200 characters"),
});

export const updateProjectInputSchema = projectFormInput.extend({
  projectId: z.number().positive(),
});

export type CreateProjectInput = z.infer<typeof projectFormInput>;
export type UpdateProjectInput = z.infer<typeof updateProjectInputSchema>;

export type ProjectRes = {
  id: number;
  title: string;
  description: string;
  createdUserId: number;
  modifiedUserId: null | number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  createdUser: CreatedOrModifiedUser | null;
  modifiedUser: null | CreatedOrModifiedUser;
};

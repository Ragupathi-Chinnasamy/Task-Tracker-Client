import { z } from "zod";
import { Role } from "@src/utils/enums";
import { ProjectRes, CreatedOrModifiedUser } from ".";
import { RoleRes } from "./role";

export const createUserFormInput = z.object({
  firstName: z.string().min(1, "Firstname should not be empty").trim(),
  lastName: z.string().min(1, "Lastname should not be empty").trim(),
  email: z.string().email().trim(),
  mobile: z
    .string()
    .min(10, "Mobile number should be atleat 10 digits")
    .max(13),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters long" })
    .max(30, { message: "Password must be at most 30 characters long" })
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
  roleId: z.nativeEnum(Role, {
    errorMap: () => {
      return { message: "User role should not be empty" };
    },
  }),
});

export const updateUserFormInput = createUserFormInput.omit({
  password: true,
});

export const updateUserInputSchema = updateUserFormInput.extend({
  userId: z.number(),
});

export type CreateUserInput = z.infer<typeof createUserFormInput>;
export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;

export type UserRes = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  roleId: number;
  createdUserId: number | null;
  modifiedUserId: number | null;
  isActive: true;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdByUser: CreatedOrModifiedUser | null;
  modifiedByUser: CreatedOrModifiedUser | null;
  createdProjects: ProjectRes[];
  role: RoleRes;
};

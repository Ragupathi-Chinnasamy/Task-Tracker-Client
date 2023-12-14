import { showNotification } from "@mantine/notifications";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import apiClient from "./ApiClient";
import { GetTask } from "@src/models/task";
import { LoginInput } from "@src/models/auth";
import {
  CreateProjectInput,
  Generic,
  GetReq,
  RoleRes,
  UpdateProjectInput,
} from "@src/models";
import { CreateUserInput, UpdateUserInput } from "@src/models/user-model";

export class ApiProvider {
  constructor(private readonly server: typeof apiClient) {}

  showAlertNotification(message: string, success: boolean) {
    showNotification({
      color: success ? "#4b5563" : "#dc2626",
      title: success ? "Success" : "Error",
      message,
    });
  }

  showAxiosErrorAlert(error: unknown | Error) {
    let message = "Something went wrong";
    if (error instanceof AxiosError && error.response) {
      message = error.response.data?.message ?? message;
    } else {
      message = String(error);
    }
    this.showAlertNotification(message, false);
  }

  isRequestSuccess(reqStatus: number): boolean {
    return (
      reqStatus === HttpStatusCode.Created || reqStatus === HttpStatusCode.Ok
    );
  }

  extractMessage(response: AxiosResponse) {
    const message: string = response.data?.message ?? "";
    return message;
  }

  extractData(response: AxiosResponse) {
    const data = response?.data?.data ?? [];
    return data;
  }

  async login(loginData: LoginInput) {
    try {
      const response = await apiClient.post("auth", loginData);
      const message = this.extractMessage(response);
      if (this.isRequestSuccess(response?.status)) {
        const data = response?.data?.data;
        this.showAlertNotification(message, true);
        return { status: true, data };
      } else {
        this.showAlertNotification(message, false);
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async fetchDashBoardData() {
    try {
      const response = await apiClient.get("dashboard");
      if (this.isRequestSuccess(response.status)) {
        const data = response?.data?.data;
        return { isSuccess: true, data };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
      return { isSuccess: false };
    }
  }

  async createProject(createProjectData: CreateProjectInput) {
    try {
      const response = await apiClient.post("project", createProjectData);
      const message = this.extractMessage(response);
      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async fetchProjectData(getProjectData: GetReq) {
    try {
      const response = await this.server.get("project", {
        params: getProjectData,
      });
      if (this.isRequestSuccess(response.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async updateProject(updateProjectType: UpdateProjectInput) {
    try {
      const response = await apiClient.patch("project", {
        ...updateProjectType,
        projectId: Number(updateProjectType.projectId),
      });
      const message = this.extractMessage(response);
      if (this.isRequestSuccess(response.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async fetchRoleData(getRoleData: GetReq) {
    try {
      const response = await this.server.get<Generic<RoleRes>>("role", {
        params: getRoleData,
      });
      if (this.isRequestSuccess(response?.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async createUser(createUserData: CreateUserInput) {
    try {
      const response = await this.server.post("user", {
        ...createUserData,
        roleId: Number(createUserData.roleId),
      });
      const message = this.extractMessage(response);

      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async fetchUserData(getUserData: GetReq) {
    try {
      const response = await this.server.get("user", {
        params: getUserData,
      });
      if (this.isRequestSuccess(response?.status)) {
        const data = this.extractData(response);
        return { isSuccess: true, data };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async updateUser(updateUserData: UpdateUserInput) {
    try {
      console.log(updateUserData);

      const response = await this.server.patch("user", {
        ...updateUserData,
        roleId: Number(updateUserData.roleId),
      });
      const message = this.extractMessage(response);
      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async fetchTaskTypeData(getTaskTypeData: GetReq) {
    try {
      const response = await this.server.get("taskType", {
        params: getTaskTypeData,
      });
      if (this.isRequestSuccess(response?.status)) {
        return { isSuccess: true, data: this.extractData(response) };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async fetchTaskStatusData(getTaskStatusData: GetReq) {
    try {
      const response = await this.server.get("taskStatus", {
        params: getTaskStatusData,
      });
      if (this.isRequestSuccess(response?.status)) {
        return { isSuccess: true, data: this.extractData(response) };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async createTask(taskData: FormData) {
    try {
      const response = await this.server.post("task", taskData);
      const message = this.extractMessage(response);
      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
        return false;
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async fetchTaskData(getTaskData: GetTask) {
    try {
      const response = await this.server.get("task", {
        params: getTaskData,
      });
      if (this.isRequestSuccess(response.status)) {
        return { isSuccess: true, data: this.extractData(response) };
      } else {
        return { isSuccess: false };
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async updateTask(updateTaskData: FormData) {
    try {
      const response = await this.server.patch("task", updateTaskData);
      const message = this.extractMessage(response);
      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }

  async deleteImage(fileName: string) {
    try {
      const response = await this.server.post("task/image", { fileName });
      const message = this.extractMessage(response);
      if (this.isRequestSuccess(response?.status)) {
        this.showAlertNotification(message, true);
        return true;
      } else {
        this.showAlertNotification(message, false);
      }
    } catch (error) {
      this.showAxiosErrorAlert(error);
    }
  }
}

const apiProvider = new ApiProvider(apiClient);

export default apiProvider;

import axios, { AxiosError, AxiosInstance } from "axios";
import { CreateReport } from "./UtilTypes";
import FormData from "form-data";

export class TARS {
  private apiClient: AxiosInstance;
  private createReportEndpoint: string;
  private addTestStepEndpoint: string;
  private saveReportEndpoint: string;
  private token: string;
  private project: string;
  private tool: string;
  private activity: string;
  private author: string;

  constructor(
    baseUrl: string,
    project: string,
    tool: string,
    activity: string,
    author: string
  ) {
    this.createReportEndpoint = "api/create-report";
    this.addTestStepEndpoint = "api/add-test-step";
    this.saveReportEndpoint = "api/save-report";
    this.project = project;
    this.tool = tool;
    this.activity = activity;
    this.author = author;

    this.apiClient = axios.create({
      baseURL: baseUrl,
    });
  }

  async createReport(scenarioName: string, testCaseName: string) {
    const reportData: CreateReport = {
      project: this.project,
      scenario: scenarioName,
      test_case: testCaseName,
      tool: this.tool,
      activity: this.activity,
      author: this.author,
    };

    try {
      const response = await this.apiClient.post(
        this.createReportEndpoint,
        reportData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      this.token = response.data.data.token;
    } catch (e) {
      const error = e as AxiosError;

      this.errorHandling(error);
    }
  }

  async addTestStep(formData: FormData) {
    try {
      await this.apiClient.post(this.addTestStepEndpoint, formData, {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (e) {
      const error = e as AxiosError;
      this.errorHandling(error);
    }
  }

  async saveReport() {
    try {
      await this.apiClient.post(
        this.saveReportEndpoint,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (e) {
      const error = e as AxiosError;

      this.errorHandling(error);
    }
  }

  private errorHandling(error: AxiosError) {
    if (error.response) {
      console.log(error.response.data);

      throw error;
    }

    if (error.code === "ECONNREFUSED") {
      throw error;
    }
  }
}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';

interface ExtendedAxiosConfig extends AxiosRequestConfig {
  baseUrlKey?: 'API1' | 'API2';
}

@Injectable()
export class AxiosUtil {
  constructor(private readonly configService: ConfigService) {}

  private getAxiosInstance(baseUrlKey?: 'API1' | 'API2'): AxiosInstance {
    const baseUrl =
      baseUrlKey === 'API2'
        ? this.configService.getOrThrow<string>('API_BASE_URL_2')
        : this.configService.getOrThrow<string>('API_BASE_URL');

    return axios.create({ baseURL: baseUrl });
  }

  async get<T>(
    url: string,
    config?: ExtendedAxiosConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      const instance = this.getAxiosInstance(config?.baseUrlKey);
      return await instance.get<T>(url, config);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async post<T>(
    url: string,
    data?: any,
    config?: ExtendedAxiosConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      const instance = this.getAxiosInstance(config?.baseUrlKey);
      return await instance.post<T>(url, data, config);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async put<T>(
    url: string,
    data?: any,
    config?: ExtendedAxiosConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      const instance = this.getAxiosInstance(config?.baseUrlKey);
      return await instance.put<T>(url, data, config);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete<T>(
    url: string,
    config?: ExtendedAxiosConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      const instance = this.getAxiosInstance(config?.baseUrlKey);
      return await instance.delete<T>(url, config);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

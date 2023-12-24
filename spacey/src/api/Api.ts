/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface DsAppStatus {
  id?: number;
  status?: string;
}

export interface DsLoginReq {
  login?: string;
  password?: string;
}

export interface DsLoginResp {
  access_token?: string;
  expires_in?: number;
  token_type?: string;
}

export interface DsRegisterReq {
  /** лучше назвать то же самое что login */
  name?: string;
  pass?: string;
  phone?: string;
  secondName?: string;
  userName?: string;
}

export interface DsShip {
  description?: string;
  id?: number;
  image_url?: string;
  is_delete?: boolean;
  rocket?: string;
  title?: string;
  type?: string;
}

export interface DsShipToAppReq {
  id_ship?: number;
}

export interface DsDeleteFlight {
  idApp?: number;
  idShip?: number;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8080" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title SpaceY
 * @version 1.0
 * @license AS IS (NO WARRANTY)
 * @baseUrl http://localhost:8080
 * @contact API Support <bitop@spatecon.ru> (https://vk.com/bmstu_schedule)
 *
 * Starship's flights
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Удалить космолет из заявки
     *
     * @tags Полет
     * @name ApplicationDelete
     * @summary Удалить космолет из заявки
     * @request DELETE:/api/application
     * @secure
     */
    applicationDelete: (request: DsDeleteFlight, params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/api/application`,
        method: "DELETE",
        body: request,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Изменение статуса заявки на удален
     *
     * @tags Заявки
     * @name ApplicationDelete2
     * @summary Меняем статус заявки на удален
     * @request DELETE:/api/application/{id}
     * @originalName applicationDelete
     * @duplicate
     * @secure
     */
    applicationDelete2: (id: number, params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/api/application/${id}`,
        method: "DELETE",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Получение заявки с услугами
     *
     * @tags Заявки
     * @name ApplicationDetail
     * @summary Одна заявка
     * @request GET:/api/application/{id}
     * @secure
     */
    applicationDetail: (id: number, params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/api/application/${id}`,
        method: "GET",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Изменение статуса заявки на принят или отклонен
     *
     * @tags Заявки
     * @name ApplicationAdminUpdate
     * @summary Меняем статус заявки на принят или отклонен
     * @request PUT:/api/application/admin
     * @secure
     */
    applicationAdminUpdate: (request: DsAppStatus, params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/api/application/admin`,
        method: "PUT",
        body: request,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Изменение статуса заявки на сформирован
     *
     * @tags Заявки
     * @name ApplicationClientUpdate
     * @summary Меняем статус заявки на сформирован
     * @request PUT:/api/application/client
     * @secure
     */
    applicationClientUpdate: (request: DsAppStatus, params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/api/application/client`,
        method: "PUT",
        body: request,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Получение списка заявок
     *
     * @tags Заявки
     * @name ApplicationsList
     * @summary Список заявок
     * @request GET:/api/applications
     * @secure
     */
    applicationsList: (
      query?: {
        /** Фильтрация по статусу */
        status?: string;
        /** Фильтрация по дате начала */
        date?: string;
        /** Фильтрация по дате конца */
        date_end?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, string>({
        path: `/api/applications`,
        method: "GET",
        query: query,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Установить космодром вылета
     *
     * @tags Полет
     * @name FlightsCosmodromBeginUpdate
     * @summary Установить космодром вылета
     * @request PUT:/api/flights/cosmodrom/begin
     * @secure
     */
    flightsCosmodromBeginUpdate: (params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/api/flights/cosmodrom/begin`,
        method: "PUT",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Установить космодром прилета
     *
     * @tags Полет
     * @name FlightsCosmodromEndUpdate
     * @summary Установить космодром прилета
     * @request PUT:/api/flights/cosmodrom/end
     * @secure
     */
    flightsCosmodromEndUpdate: (params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/api/flights/cosmodrom/end`,
        method: "PUT",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить список космодромов
     *
     * @tags Полет
     * @name FlightsCosmodromsList
     * @summary Получить список космодромов
     * @request GET:/api/flights/cosmodroms
     * @secure
     */
    flightsCosmodromsList: (params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/api/flights/cosmodroms`,
        method: "GET",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Установить дату полета
     *
     * @tags Полет
     * @name FlightsDateUpdate
     * @summary Установить дату полета
     * @request PUT:/api/flights/date
     * @secure
     */
    flightsDateUpdate: (params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/api/flights/date`,
        method: "PUT",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Аутентификация пользователя.
     *
     * @tags Пользователи
     * @name LoginCreate
     * @summary Аутентификация пользователя
     * @request POST:/api/login
     */
    loginCreate: (request: DsLoginReq, params: RequestParams = {}) =>
      this.request<DsLoginResp, string>({
        path: `/api/login`,
        method: "POST",
        body: request,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Завершение сеанса текущего пользователя.
     *
     * @tags Пользователи
     * @name LogoutList
     * @summary Выход пользователя
     * @request GET:/api/logout
     * @secure
     */
    logoutList: (params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/api/logout`,
        method: "GET",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Получение списка кораблей
     *
     * @tags Корабли
     * @name ShipsList
     * @summary Список кораблей
     * @request GET:/api/ships
     */
    shipsList: (
      query?: {
        /** Фильтрация поиска */
        search?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, string>({
        path: `/api/ships`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Создание космического корабля
     *
     * @tags Корабли
     * @name ShipsCreate
     * @summary Создание корабля
     * @request POST:/api/ships
     * @secure
     */
    shipsCreate: (newShip: DsShip, params: RequestParams = {}) =>
      this.request<DsShip, string>({
        path: `/api/ships`,
        method: "POST",
        body: newShip,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Изменение информации о корабле
     *
     * @tags Корабли
     * @name ShipsUpdate
     * @summary Изменение информации о корабле
     * @request PUT:/api/ships
     * @secure
     */
    shipsUpdate: (updateShip: DsShip, params: RequestParams = {}) =>
      this.request<DsShip, string>({
        path: `/api/ships`,
        method: "PUT",
        body: updateShip,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Удаление космического корабля
     *
     * @tags Корабли
     * @name ShipsDelete
     * @summary Удаление космического корабля
     * @request DELETE:/api/ships/{id}
     * @secure
     */
    shipsDelete: (id: string, params: RequestParams = {}) =>
      this.request<DsShip, string>({
        path: `/api/ships/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Получение информации о корабле по его идентификатору
     *
     * @tags Корабли
     * @name ShipsDetail
     * @summary Получение информации о корабле
     * @request GET:/api/ships/{id}
     */
    shipsDetail: (id: number, params: RequestParams = {}) =>
      this.request<Record<string, any>, string>({
        path: `/api/ships/${id}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Создание или обновление заявки с добавлением услуги
     *
     * @tags Корабли
     * @name ShipsApplicationCreate
     * @summary Добавление услуги в заявку или создание новой заявки и добавление в нее услуги
     * @request POST:/api/ships/application
     * @secure
     */
    shipsApplicationCreate: (request: DsShipToAppReq, params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/api/ships/application`,
        method: "POST",
        body: request,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Загрузка изображения для корабля
     *
     * @tags Корабли
     * @name ShipsImageUpdate
     * @summary Загрузка изображения для корабля
     * @request PUT:/api/ships/image
     * @secure
     */
    shipsImageUpdate: (
      data: {
        /**
         * Изображение в формате файла
         * @format binary
         */
        file: File;
        /** Идентификатор корабля */
        id: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<DsShip, string>({
        path: `/api/ships/image`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Регистрация нового пользователя.
     *
     * @tags Пользователи
     * @name SignUpCreate
     * @summary Регистрация пользователя
     * @request POST:/api/sign_up
     */
    signUpCreate: (request: DsRegisterReq, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/api/sign_up`,
        method: "POST",
        body: request,
        type: ContentType.Json,
        ...params,
      }),
  };
}

/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface NEmergencyCase {
  patientId?: string | null;
  gender?: string | null;
  name?: string | null;
  surname?: string | null;
  otherIdentifier?: string | null;
  fathersName?: string | null;
  erAge?: string | null;
  erProselefsi?: string | null;
  erOros?: string | null;
  erAllo?: string | null;
  histSymptom?: string | null;
  histSmoker?: string | null;
  histAlergic?: string | null;
  histLoimodi?: string | null;
  trauma?: string | null;
  vitalTime?: string | null;
  vitalPulses?: string | null;
  vitalAP?: string | null;
  vitalInhale?: string | null;
  vitalSpo2?: string | null;
  vitalT?: string | null;
  derma?: string | null;
  erComments?: string | null;
  genikiSimeiologia?: string | null;
  genOther?: string | null;
  xeirourgikiSimeiologia?: string | null;
  neurologikiSimeiologia?: string | null;
  neuroParesi?: string | null;
  neuroHmipligia?: string | null;
  neuroSergApoleiaSineidisis?: string | null;
  neuroSergAnoiktoiOfthalmoi?: string | null;
  neuroSergKalyteriProforikiApantisi?: string | null;
  neuroSergKalyteriKinitikiApantisi?: string | null;
  neuroSergKoresMegethosDeksi?: string | null;
  neuroSergKoresMegethosAristero?: string | null;
  neuroSergKoresAntidrasiDeksi?: string | null;
  neuroSergKoresAntidrasiAristero?: string | null;
  neuroSergSynoloVathmwn?: string | null;
  cardioThorakikoAlgos?: string | null;
  cardioXaraktiras?: string | null;
  cardioEnarxi?: string | null;
  cardioDiarkeia?: string | null;
  cardioanapneustikiSimeiologia?: string | null;
  psychoDiathesi?: string | null;
  psychoSymperifora?: string | null;
  psychoSkepseis?: string | null;
}

export interface NPatient {
  name?: string | null;
  surname?: string | null;
  fathersName?: string | null;
  ssn?: string | null;
  mobilePhone?: string | null;
  homephone?: string | null;
  /** @format date-time */
  birthDate?: string | null;
  id?: string | null;
  otherIdentifier?: string | null;
  nationalityId?: string | null;
  gender?: string | null;
  sex?: string | null;
  addressStreet?: string | null;
  addressZip?: string | null;
  workPhone?: string | null;
  insuranceName?: string | null;
  lang?: string | null;
  /** @format int32 */
  age?: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title NoAH API
 * @version v1
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Configuration
     * @name ConfigurationGetConfigurationList
     * @summary Returns object of current configuration.
     * @request GET:/api/Configuration/GetConfiguration
     */
    configurationGetConfigurationList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Configuration/GetConfiguration`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Configuration
     * @name ConfigurationSetConfigurationCreate
     * @summary Stores object of user - modified configuration.
     * @request POST:/api/Configuration/SetConfiguration
     */
    configurationSetConfigurationCreate: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/Configuration/SetConfiguration`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags LoginAPI
     * @name LoginApiInitList
     * @summary Instantiates a new user session, reads configuration settings, and creates necessary directories.
     * @request GET:/api/LoginAPI/Init
     */
    loginApiInitList: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/LoginAPI/Init`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags LoginAPI
     * @name LoginApiLoginList
     * @summary Performs login.
     * @request GET:/api/LoginAPI/Login
     */
    loginApiLoginList: (
      query?: {
        user?: string;
        password?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/LoginAPI/Login`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags LoginAPI
     * @name LoginApiLoginOfflineList
     * @summary Performs offline login by setting appropriate flags.
     * @request GET:/api/LoginAPI/LoginOffline
     */
    loginApiLoginOfflineList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/LoginAPI/LoginOffline`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Main
     * @name MainInitList
     * @summary Initializes the application by checking user login status, starting timers, and fetching recovered session - if present.
     * @request GET:/api/Main/Init
     */
    mainInitList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Main/Init`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Main
     * @name MainSetRecoverySessionList
     * @summary Set a recovery session chosen by the user among a list of saved sessions.
     * @request GET:/api/Main/SetRecoverySession
     */
    mainSetRecoverySessionList: (
      query?: {
        sessionID?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/Main/SetRecoverySession`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Main
     * @name MainGetBatteryStatusList
     * @summary get battery status
     * @request GET:/api/Main/GetBatteryStatus
     */
    mainGetBatteryStatusList: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/Main/GetBatteryStatus`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Main
     * @name MainAddMoreFilesList
     * @summary Add more files to the recovery session
     * @request GET:/api/Main/AddMoreFiles
     */
    mainAddMoreFilesList: (data: string[], params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/Main/AddMoreFiles`,
        method: "GET",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Main
     * @name MainNewEmergencyCaseCreate
     * @summary Submits a new emergency case to the server.
     * @request POST:/api/Main/NewEmergencyCase
     */
    mainNewEmergencyCaseCreate: (
      data: NEmergencyCase,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/Main/NewEmergencyCase`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Main
     * @name MainGetEfimeriesList
     * @summary Gets doctors's availabilities for emergency consultations.
     * @request GET:/api/Main/GetEfimeries
     */
    mainGetEfimeriesList: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/Main/GetEfimeries`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Main
     * @name MainScanDocumentList
     * @summary Scan a single page document using the scanner.
     * @request GET:/api/Main/ScanDocument
     */
    mainScanDocumentList: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/Main/ScanDocument`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Main
     * @name MainSearchPatientCreate
     * @summary Allows user to search for a patient using first name and / or last name
     * @request POST:/api/Main/SearchPatient
     */
    mainSearchPatientCreate: (data: NPatient, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/Main/SearchPatient`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Main
     * @name MainAddPatientCreate
     * @summary Allows user to search for a patient using first name and / or last name
     * @request POST:/api/Main/AddPatient
     */
    mainAddPatientCreate: (data: NPatient, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/Main/AddPatient`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
}

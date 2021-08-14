export interface ResponseRO {
  // Is request success?
  success: boolean;

  // Message
  message: string;

  // Response code
  statusCode: number;

  // Response content
  data?: Record<string, any> | string | number;

  // Response errors
  errors?: Array<string>;

  // Version
  version?: string | null;
}

interface PaginationData<T> {
  total: number;

  records: Array<T>;
}

// 分页返回
export interface PaginationRO extends ResponseRO {
  // Response content
  data?: PaginationData<unknown>;
}
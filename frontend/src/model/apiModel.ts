export type InfoType = {
  count: number | null;
};

export type ApiResponseType<T> = {
  info: InfoType;
  data: T;
};

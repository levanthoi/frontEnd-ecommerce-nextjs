export interface IAuthRootState<T> {
  data?: Array<T> | null;
  row?: T | null;
  isLoading?: boolean;
  isLogged?: boolean;
  message?: string;
  success?: boolean;
}

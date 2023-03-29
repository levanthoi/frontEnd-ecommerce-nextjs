export interface IAuthRootState<T> {
  data?: Array<T> | null;
  isLoading?: boolean;
  isLogged?: boolean;
  message: string;
}

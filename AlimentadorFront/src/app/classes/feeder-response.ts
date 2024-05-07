export class FeederResponse<T> {
  status: string;
  data: T;

  constructor(status: string, data: T) {
    this.status = status;
    this.data = data;
  }
}

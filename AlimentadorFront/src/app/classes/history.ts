export class History {
  constructor(
    public feederId: string,
    public updateDate: Date,
    public stock: number,
    public bowl: number
  ) {}
}

export class HistoryData {
  constructor(public history: History[]) {}
}

export class HistoryResponse {
  constructor(public status: string, public data: HistoryData) {}
}

export enum DataType {
  Hourly = 'hourly',
  Daily = 'daily',
  Monthly = 'monthly',
  Yearly = 'yearly',
}


export type APIResponse = {
  data: {
    dataType: DataType
    x_labels: string[]
    totals: {
      kwh: number
      pecentage: number
      trees: number
      cos: number
    }
  }
}
export enum DataType {
  Hourly = 'hourly',
  Daily = 'daily',
  Monthly = 'monthly',
  Yearly = 'yearly',
}


export type APIResponse = {
  data: {
    data_type: DataType
    x_labels: string[],
    generation?: number[],
    expected?: number[]
    totals: {
      kwh: number
      percentage: number
      trees: number
      co2: number
    }
  }
}
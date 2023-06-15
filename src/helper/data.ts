import { TChartData } from "../components/LineChart";
import { APIResponse, DataType } from "../types/data";
import { convertIntoHours, convertIntoMonths } from "./time";

function check(data: APIResponse["data"], type: DataType) {
  if (data.data_type !== type) {
    throw new Error(`Data type invalido, recebeu: ${data.data_type}`)
  }
  if (data.x_labels.length !== data.generation?.length) {
    throw new Error('Eixos não combinam')
  }
}

export function generateGraphByHour(data: APIResponse["data"]): Array<TChartData> {
  check(data, DataType.Hourly)

  return data.x_labels.map((xl, i) =>
    ({ x: convertIntoHours(xl), y: data.generation![i] })
  )
}
export function generateGraphByMonth(data: APIResponse["data"]): Array<TChartData> {
  check(data, DataType.Monthly)

  return data.x_labels.map((xl, i) =>
    ({ x: convertIntoMonths(xl), y: data.generation![i] })
  )
}
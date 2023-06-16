import { TChartData } from "../components/LineChart";
import { APIResponse, DataType } from "../types/data";
import { convertIntoDays, convertIntoHours, convertIntoMonths, convertIntoYears } from "./time";

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

  if (data.expected?.length === 1) {
    data.expected = Array(data.generation?.length).fill(data.expected[0])
  }

  return data.x_labels.map((xl, i) =>
    ({ x: convertIntoHours(xl), y: data.generation![i], target: data.expected![i] })
  )
}
export function generateGraphByDaily(data: APIResponse["data"]): Array<TChartData> {
  check(data, DataType.Daily)

  return data.x_labels.map((xl, i) =>
    ({ x: convertIntoDays(xl), y: data.generation![i], target: data.expected![i] })
  )
}
export function generateGraphByMonth(data: APIResponse["data"]): Array<TChartData> {
  check(data, DataType.Monthly)

  return data.x_labels.map((xl, i) =>
    ({ x: convertIntoMonths(xl), y: Math.round(data.generation![i]), target: data.expected![i] })
  )
}
export function generateGraphByYearly(data: APIResponse["data"]): Array<TChartData> {
  check(data, DataType.Yearly)

  return data.x_labels.map((xl, i) =>
    ({ x: convertIntoYears(xl), y: Math.round(data.generation![i]), target: data.expected![i] })
  )
}
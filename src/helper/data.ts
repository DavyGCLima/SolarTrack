import { TChartData } from "../components/LineChart";
import { APIResponse, DataType } from "../types/data";
import { convertIntoHours } from "./time";

export function generateGraphByHour(data: APIResponse["data"]): Array<TChartData> {
  if (data.data_type !== DataType.Hourly) {
    throw new Error(`Data type invalido, recebeu: ${data.data_type}`)
  }
  if (data.x_labels.length !== data.generation?.length) {
    throw new Error('Eixos não combinam')
  }

  return data.x_labels.map((xl, i) =>
    ({ x: convertIntoHours(xl), y: data.generation![i] })
  )
}
import { APIResponse, DataType } from "../../types/data";
import mockedData from '../../../mock/mock'

export async function requestData({ type = DataType.Daily }: { type?: DataType }): Promise<APIResponse> {
  const base = {
    [DataType.Daily]: mockedData.mockDataDaily,
    [DataType.Hourly]: mockedData.mockDataHourly,
    [DataType.Monthly]: mockedData.mockDataMonthly,
    [DataType.Yearly]: mockedData.mockDataYearly
  }
  return new Promise((resolve, reject) => {
    console.log('calling :>> ', type);
    resolve({ data: base[(type as DataType)] })
  })
}
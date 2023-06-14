import { APIResponse } from "../types/data";

export async function requestData(): Promise<APIResponse> {
  return fetch('https://y-plants-api.bravedesert-7b0b5672.westus2.azurecontainerapps.io/plant/generation/test-2023?dataType=yearly', {
    headers: {
      Authorization: 'Bearer HeDKyixt_yMhR4TOvL4HNktaOxga-mgLkUcF'
    }
  }).then(res => res.json())
}
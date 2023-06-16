/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import { render, screen, waitFor } from '@testing-library/react-native';
import HeaderWithScroll from '../src/components/Header';
import mockedData from '../mock/mock'
import FilterChart from '../src/components/FilterChart';


test('Check render of the Head', () => {
  const header = render(<HeaderWithScroll data={mockedData.mockDataHourly} />)

  expect(header.getByTestId('line-chart-container')).toBeDefined();
})

test('Check request API', async () => {
  let component
  await waitFor(() => {
    component = render<typeof FilterChart>(<FilterChart />)
  })

  expect(component).toBeDefined()
  expect(component!.getByTestId('line-chart-container')).toBeDefined();

})

test('Check if dropdown exists', async () => {
  await waitFor(() => {
    render<typeof FilterChart>(<FilterChart />)
  })

  const dropDown = screen.getByText('Mês')
  expect(dropDown).toBeDefined()
})

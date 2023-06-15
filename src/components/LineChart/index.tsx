import { FC, useMemo } from 'react'
import { Chart, VerticalAxis, HorizontalAxis, Line, Area } from 'react-native-responsive-linechart'

export type TChartData = {
  x: number,
  y: number
}

export type TLineChart = {
  data: Array<TChartData>
}

const data1 = [
  { x: -2, y: 1 },
  { x: -1, y: 0 },
  { x: 8, y: 13 },
  { x: 9, y: 11.5 },
  { x: 10, y: 12 }
]

const LineChart: FC<TLineChart> = ({ data = data1 }) => {

  const yValues = useMemo(() => data.map(item => item.y), [data])
  const xValues = useMemo(() => data.map(item => item.x), [data])

  return (
    <Chart
      style={{ height: 200, width: '100%', backgroundColor: 'white', margin: '2.5%' }}
      xDomain={{ min: Math.min(...xValues), max: Math.max(...xValues) }}
      yDomain={{ min: Math.min(...yValues), max: Math.max(...yValues) }}
      padding={{ left: 20, top: 10, bottom: 10, right: 10 }}
      data={data}
    >
      <VerticalAxis tickCount={yValues.length} />
      <HorizontalAxis tickValues={xValues} />
      <Area theme={{ gradient: { from: { color: 'green' }, to: { color: 'white', opacity: 0.4 } } }} />
      <Line smoothing="cubic-spline" theme={{
        stroke: { color: 'green', width: 3 },
        scatter: { default: { width: 4, height: 4, rx: 2 } }
      }} />
    </Chart>
  )
}

export default LineChart
import { FC } from 'react'
import { Chart, VerticalAxis, HorizontalAxis, Line, Area } from 'react-native-responsive-linechart'

export type TLineChart = {
}

const data1 = [
  { x: -2, y: 1 },
  { x: -1, y: 0 },
  { x: 8, y: 13 },
  { x: 9, y: 11.5 },
  { x: 10, y: 12 }
]

const data2 = [
  { x: -2, y: 15 },
  { x: -1, y: 10 },
  { x: 0, y: 12 },
  { x: 1, y: 7 },
  { x: 8, y: 12 },
  { x: 9, y: 13.5 },
  { x: 10, y: 18 }
]

const LineChart: FC<TLineChart> = ({ }) => {
  return (
    <Chart
      style={{ height: 200, width: '100%', backgroundColor: 'white' }}
      xDomain={{ min: -2, max: 10 }}
      yDomain={{ min: -2, max: 20 }}
      padding={{ left: 20, top: 10, bottom: 10, right: 10 }}
    >
      <VerticalAxis tickValues={[0, 4, 8, 12, 16, 20]} />
      <HorizontalAxis tickCount={3} />
      <Area data={data1} theme={{ gradient: { from: { color: 'green' }, to: { color: 'white', opacity: 0.4 } } }} />
      <Line data={data1} smoothing="cubic-spline" theme={{
        stroke: { color: 'green', width: 3 },
        scatter: { default: { width: 4, height: 4, rx: 2 } }
      }} />
    </Chart>
  )
}

export default LineChart
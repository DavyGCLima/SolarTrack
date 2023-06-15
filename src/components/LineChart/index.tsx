import { FC, useMemo } from 'react'
import { Dimensions, useColorScheme } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export type TChartData = {
  x: string,
  y: number
}

export type TLineChart = {
  data: Array<TChartData>
}

const data1 = [
  { x: "-2", y: 1 },
  { x: "-1", y: 0 },
  { x: "8", y: 12 },
  { x: "9", y: 11.5 },
  { x: "10", y: 12 }
]

const LineChartCustom: FC<TLineChart> = ({ data = data1 }) => {

  const isDarkMode = useColorScheme() === 'dark';

  const yValues = useMemo(() => data?.map(item => item.y) ?? [], [data])
  const xValues = useMemo(() => data?.map(item => item.x) ?? [], [data])

  return (
    <LineChart
      data={{
        labels: xValues,
        datasets: [
          {
            data: yValues
          }
        ]
      }}
      width={Dimensions.get("window").width} // from react-native
      height={220}
      yAxisLabel="Kwh "
      yAxisInterval={1} // optional, defaults to 1
      xAxisLabel='h'
      chartConfig={{
        backgroundColor: "white",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        }
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
    />
  )
}

export default LineChartCustom
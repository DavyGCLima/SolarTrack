import { FC, useMemo } from 'react'
import { Dimensions, View, useColorScheme } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { DataType } from '../../types/data'

export type TChartData = {
  x: string,
  y: number
}

export type TLineChart = {
  data: Array<TChartData>
  dataType: DataType
}

const data1 = [
  { x: "-2", y: 1 },
  { x: "-1", y: 0 },
  { x: "8", y: 12 },
  { x: "9", y: 11.5 },
  { x: "10", y: 12 }
]

const LineChartCustom: FC<TLineChart> = ({ data = data1, dataType }) => {

  const isDarkMode = useColorScheme() === 'dark';

  const yValues = useMemo(() => data?.map(item => item.y) ?? [], [data])
  const xValues = useMemo(() => data?.map(item => item.x) ?? [], [data])
  const hidenElements = useMemo(() => {
    if (dataType === DataType.Daily) {
      return xValues.map((el, index) => index % 2 === 0 ? index : null).filter(i => Number.isInteger(i))
    }

    return []
  }, [data, dataType])


  const getXLbel = useMemo(
    () => {
      const base = {
        [DataType.Hourly]: 'h',
        [DataType.Monthly]: '',
        [DataType.Daily]: '',
        [DataType.Yearly]: ''
      }
      return base[dataType]
    },
    [data],
  )


  return (
    <View style={{}}>
      <LineChart
        data={{
          labels: xValues,
          datasets: [
            {
              data: yValues
            }
          ]
        }}
        width={Dimensions.get("window").width}
        height={dataType !== DataType.Hourly ? 300 : 220}
        yAxisLabel="Kwh "
        yAxisInterval={1}
        xAxisLabel={getXLbel}
        verticalLabelRotation={dataType !== DataType.Hourly ? 45 : 0}
        horizontalLabelRotation={dataType !== DataType.Hourly ? -30 : 0}
        withDots={dataType === DataType.Hourly ? true : false}
        chartConfig={{
          backgroundColor: "white",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 0
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#f8c76c"
          }
        }}
        bezier
        hidePointsAtIndex={hidenElements}
        style={{
          marginVertical: 8,
          borderRadius: 0,
        }}
      />
    </View>
  )
}

export default LineChartCustom
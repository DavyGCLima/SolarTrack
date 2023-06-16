import { FC, useCallback, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, useColorScheme } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { APIResponse, DataType } from '../../types/data';
import { requestData } from '../../service/api';
import LineChart, { TChartData } from '../LineChart';
import { generateGraphByDaily, generateGraphByHour, generateGraphByMonth, generateGraphByYearly } from '../../helper/data';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export type TFilterChart = {};

const FilterChart: FC<TFilterChart> = ({ }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const [filter, setFilter] = useState(DataType.Monthly)

  const [data, setData] = useState<APIResponse['data']>();

  useEffect(() => {
    async function getData() {
      try {
        const response = await requestData({ type: filter });
        // console.group(`Filter: ${filter}`)
        // console.log(`response.data ==>`, JSON.stringify(response.data, null, 2))
        // console.groupEnd()
        if (response.data) {
          setData(response.data);
        }
      } catch (error) {
        console.error('error ==>', JSON.stringify(error, null, 2));
      }
    }
    getData();
  }, [filter])

  const callRequestByFilter = useCallback(
    (props: APIResponse['data']): TChartData[] => {
      const base = {
        [DataType.Hourly]: generateGraphByHour,
        [DataType.Monthly]: generateGraphByMonth,
        [DataType.Daily]: generateGraphByDaily,
        [DataType.Yearly]: generateGraphByYearly
      }
      return base[filter](props)
    },
    [data],
  )

  return (
    <View style={styles(isDarkMode).container}>
      <SelectDropdown
        testID="dataTypeDropdown"
        data={[
          { label: 'Hora', value: DataType.Hourly },
          { label: 'Dia', value: DataType.Daily },
          { label: 'Mês', value: DataType.Monthly },
          { label: 'Ano', value: DataType.Yearly },
        ]}
        defaultValue={{ label: 'Mês', value: DataType.Monthly }}
        onSelect={(selectedItem) => {
          setFilter(selectedItem.value)
        }}
        buttonTextAfterSelection={(selectedItem) => selectedItem.label}
        rowTextForSelection={(item) => item.label}
        buttonStyle={styles(isDarkMode).dropdown}
      />
      {data ? <>
        <View style={styles(isDarkMode).extraData}>
          <Text style={styles(isDarkMode).text}>🌳 Salvas: {Math.floor(data?.totals.trees)}</Text>
          <Text style={styles(isDarkMode).text}>🍃 CO2: {Math.floor(data?.totals.co2)}</Text>
        </View>
        <Text style={styles(isDarkMode).chartTitle}>☀ Produção</Text>
        <LineChart data={callRequestByFilter(data)} dataType={data.data_type} />
      </> : null}


    </View>
  )
};

const styles = (isDarkMode = false) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: Dimensions.get("window").width,
    minHeight: 250,
    paddingTop: 24,
    backgroundColor: isDarkMode ? Colors.dark : Colors.white
  },
  extraData: {
    width: Dimensions.get("window").width,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 16,
    marginBottom: 16
  },
  text: {
    fontSize: 16,
    color: isDarkMode ? Colors.white : Colors.dark
  },
  chartTitle: {
    width: Dimensions.get("window").width,
    padding: 10,
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 16,
    color: isDarkMode ? Colors.white : Colors.dark
  },
  dropdown: {
    borderRadius: 8
  }
});

export default FilterChart;

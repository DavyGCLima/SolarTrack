import { FC, useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { APIResponse, DataType } from '../../types/data';
import { requestData } from '../../service/api';
import LineChart, { TChartData } from '../LineChart';
import { generateGraphByDaily, generateGraphByHour, generateGraphByMonth, generateGraphByYearly } from '../../helper/data';

export type TFilterChart = {};

const FilterChart: FC<TFilterChart> = ({ }) => {

  const [filter, setFilter] = useState(DataType.Monthly)

  const [data, setData] = useState<APIResponse['data']>();

  useEffect(() => {
    async function getData() {
      try {
        const response = await requestData({ type: filter });
        console.group(`Filter: ${filter}`)
        console.log(`response.data ==>`, JSON.stringify(response.data, null, 2))
        console.groupEnd()
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
    <View style={styles.container}>
      <SelectDropdown
        data={[
          { label: 'Hora', value: DataType.Hourly },
          { label: 'Dia', value: DataType.Daily },
          { label: 'Mês', value: DataType.Monthly },
          { label: 'Ano', value: DataType.Yearly },
        ]}
        onSelect={(selectedItem) => {
          setFilter(selectedItem.value)
        }}
        buttonTextAfterSelection={(selectedItem) => selectedItem.label}
        rowTextForSelection={(item) => item.label}
      />
      {data ? <LineChart data={callRequestByFilter(data)} dataType={data.data_type} /> : null}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    minHeight: 250
  }
});

export default FilterChart;

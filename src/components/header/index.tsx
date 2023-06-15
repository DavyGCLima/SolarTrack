import React, {FC, useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { APIResponse, DataType } from '../../types/data';
import { generateGraphByHour, generateGraphByMonth } from '../../helper/data';
import LineChartCustom from '../LineChart';

const HeaderWithScroll: FC<{data?: APIResponse['data']}> = ({data}) => {
  const kwh = useMemo(() => data?.totals.kwh ?? 0, [data]);
  const capacity = useMemo(() => data?.totals.percentage ?? 0, [data]);
  const co2 = useMemo(() => data?.totals.co2 ?? Infinity, [data]);
  const trees = useMemo(() => data?.totals.trees ?? 0, [data]);

  return (
    <View style={[styles.container, { backgroundColor: kwh > 1 ? 'green' : 'red' }]}>
      <Text style={[styles.title, styles.whiteColor]}>Solar Track</Text>
      <Text
        style={[styles.subTitle]}>
        {kwh > 1 ? `Gerando ${Math.round(kwh)} Kwh` : 'Produção parada!'}
      </Text>
      <View style={[styles.thirdLine]}>
        <Text style={styles.whiteColor}>Capacidade {Math.round(capacity)}%</Text>
        <Text style={styles.whiteColor}>CO2 {Math.round(co2)}</Text>
      </View>
      <View style={styles.treesLine}>
        <Text style={styles.whiteColor}>Arvores: {trees}</Text>
      </View>

      {data ? <LineChartCustom data={generateGraphByHour(data)} dataType={DataType.Hourly} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  whiteColor: {
    color: 'white'
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    width: '100%',
    textAlign: 'center',
  },
  thirdLine: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  treesLine: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  }
});

export default HeaderWithScroll;

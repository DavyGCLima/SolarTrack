import React, {FC, useMemo} from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { APIResponse, DataType } from '../../types/data';
import { generateGraphByHour, generateGraphByMonth } from '../../helper/data';
import LineChartCustom from '../LineChart';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const HeaderWithScroll: FC<{data?: APIResponse['data']}> = ({data}) => {
  const kwh = useMemo(() => data?.totals.kwh ?? 0, [data]);
  const capacity = useMemo(() => data?.totals.percentage ?? 0, [data]);
  const co2 = useMemo(() => data?.totals.co2 ?? Infinity, [data]);
  const trees = useMemo(() => data?.totals.trees ?? 0, [data]);

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={[styles(isDarkMode).container, { backgroundColor: kwh > 1 ? 'green' : 'red' }]}>
      <Text style={[styles(isDarkMode).title]}>Solar Track</Text>
      <Text
        style={[styles(isDarkMode).subTitle]}>
        {kwh > 1 ? `☀ Gerando ${Math.round(kwh)} Kwh` : 'Produção parada!'}
      </Text>
      <View style={styles(isDarkMode).square}>
        <View style={[styles(isDarkMode).thirdLine]}>
          <Text style={styles(isDarkMode).whiteColor}>📈 Capacidade {Math.round(capacity)}%</Text>
          <Text style={styles(isDarkMode).whiteColor}>🍃 CO2 {Math.round(co2)}</Text>
        </View>
        <View style={styles(isDarkMode).treesLine}>
          <Text style={styles(isDarkMode).whiteColor}>🌳 Arvores salvas: {trees}</Text>
        </View>
      </View>

      {data ? <LineChartCustom data={generateGraphByHour(data)} dataType={DataType.Hourly} /> : null}
    </View>
  );
};

const styles = (isDarkMode = false) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  square: {
    width: '90%',
    borderRadius: 8,
    backgroundColor: isDarkMode ? Colors.dark : Colors.white,
    marginTop: 8,
    paddingTop: 8,
    paddingBottom: 8,
  },
  whiteColor: {
    color: isDarkMode ? Colors.white : Colors.dark
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white'
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

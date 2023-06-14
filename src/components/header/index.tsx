import React, {FC, useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {APIResponse} from '../../types/data';

const HeaderWithScroll: FC<{data?: APIResponse['data']}> = ({data}) => {
  const kwh = useMemo(() => data?.totals.kwh ?? 0, [data]);

  return (
    <View style={styles.container}>
      <Text style={[styles.title]}>Solar Track</Text>
      <Text
        style={[styles.subTitle, {backgroundColor: kwh > 1 ? 'green' : 'red'}]}>
        {kwh > 1 ? `Gerando ${kwh}Kwh` : 'Produção parada!'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
});

export default HeaderWithScroll;

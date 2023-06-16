import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import {requestData} from './src/service/api';
import HeaderWithScroll from './src/components/Header';
import Section from './src/components/Section';
import { APIResponse, DataType } from './src/types/data';
import FilterChart from './src/components/FilterChart';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [data, setData] = useState<APIResponse['data']>();

  useEffect(() => {
    async function getData() {
      try {
        const response = await requestData({ type: DataType.Hourly });
        if (response.data) {
          setData(response.data);
        }
      } catch (error) {
        console.error('error ==>', JSON.stringify(error, null, 2));
      }
    }
    getData();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <HeaderWithScroll data={data} />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.dark : Colors.white,
          }}>
          <Section title="Acompanhe">
            <FilterChart />
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;

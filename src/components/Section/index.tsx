import {PropsWithChildren} from 'react';
import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

export default function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles(isDarkMode).sectionContainer}>
      <Text
        style={[
          styles(isDarkMode).sectionTitle,
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles(isDarkMode).sectionDescription,
          ,
        ]}>
        {children}
      </Text>
    </View>
  );
}

const styles = (isDarkMode = false) => StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    backgroundColor: isDarkMode ? Colors.dark : Colors.white,
  },
  sectionTitle: {
    paddingHorizontal: 24,
    fontSize: 24,
    fontWeight: '600',
    color: isDarkMode ? Colors.white : Colors.drak,

  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

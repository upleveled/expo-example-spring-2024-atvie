import { Pacifico_400Regular, useFonts } from '@expo-google-fonts/pacifico';
import { Slot, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import { colors } from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: 40,
  },
  slot: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
  },
});

function routeMapping(pathname: string) {
  switch (pathname) {
    case '/':
      return 'Guest List';
    case '/add-guest':
      return 'Add Guest';
    default:
      return '';
  }
}

export default function HomeLayout() {
  const pathname = usePathname();
  const label = routeMapping(pathname);
  const [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Header label={label} />
      <StatusBar style="auto" />
      <View style={styles.slot}>
        <Slot />
      </View>
    </View>
  );
}

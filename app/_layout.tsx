import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins';
import Constants from 'expo-constants';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { colors } from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  slot: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: Constants.statusBarHeight + 20,
    paddingBottom: 30,
  },
});

export default function HomeLayout() {
  const [loaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.slot}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="guests/[id]"
            options={{
              presentation: 'modal',
              title: '',
              animation: 'slide_from_bottom',
              headerTintColor: colors.text,
              headerStyle: {
                backgroundColor: colors.background,
              },
            }}
          />
        </Stack>
      </View>
    </View>
  );
}

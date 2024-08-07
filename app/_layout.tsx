import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins';
import Constants from 'expo-constants';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { TabBarIcon } from '../components/TabBarIcon';
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
    paddingBottom: 20,
  },
});

function BackButton() {
  return (
    <Pressable
      style={{
        padding: 10,
      }}
      onPress={() => router.back()}
    >
      <TabBarIcon name="chevron-down" color={colors.text} />
    </Pressable>
  );
}

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
              headerRight: Platform.OS === 'ios' ? BackButton : undefined,
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

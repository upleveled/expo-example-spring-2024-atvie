import Constants from 'expo-constants';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.cardBackground,
    width: '100%',
  },
  container: {
    paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight + 10,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: colors.text,
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'Pacifico_400Regular',
  },
  logo: {
    width: 50,
    height: 50,
  },
});

type Props = {
  label: string;
};

export default function Header(props: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.label}>{props.label}</Text>
      </View>
    </SafeAreaView>
  );
}

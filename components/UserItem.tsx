import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: colors.text,
    fontFamily: 'Poppins_400Regular',
  },
  card: {
    backgroundColor: colors.cardBackground,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 30,
    marginBottom: 30,
  },
});

type Props = {
  user: {
    firstName: string;
    lastName: string;
  };
};

export default function UserItem({ user }: Props) {
  const { firstName, lastName } = user;

  return (
    <View style={styles.card}>
      <Text style={styles.text}>
        {firstName} {lastName}
      </Text>
    </View>
  );
}

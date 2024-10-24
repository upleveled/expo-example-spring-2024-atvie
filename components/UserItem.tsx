import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';
import { Guest } from '../migrations/00000-createTableGuests';

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.cardBackground,
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 30,
    marginBottom: 30,
    borderColor: colors.cardShadow,
    borderWidth: 0.5,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
    textAlign: 'left',
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
      <Text style={styles.center}>
        {firstName} {lastName}
      </Text>
    </View>
  );
}

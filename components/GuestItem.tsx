import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';
import { Guest } from '../database/guests';

const styles = StyleSheet.create({
  right: {
    textAlign: 'right',
    fontSize: 10,
    color: colors.text,
  },
  center: {
    textAlign: 'center',
    color: colors.text,
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
  guest: Guest;
};

export default function GuestItem({ guest }: Props) {
  const { id, firstName, lastName, attending } = guest;

  const openGuest = () => {
    router.push({
      pathname: `/guests/[id]`,
      params: { id },
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={openGuest}>
      <Text style={styles.center}>
        {firstName} {lastName}
      </Text>
      <Text style={styles.right}>{attending ? 'Coming!' : 'Not coming.'}</Text>
    </TouchableOpacity>
  );
}

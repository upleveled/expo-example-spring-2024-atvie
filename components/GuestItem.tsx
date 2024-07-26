import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/colors';
import { Guest } from '../migrations/00000-createTableGuests';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  info: {
    marginLeft: 16,
  },
  name: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    color: colors.text,
  },
  status: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 14,
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginLeft: 16,
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
    <TouchableOpacity style={styles.container} onPress={openGuest}>
      <View key={`user-${id}`} style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.avatar}>
            <Image
              source={{ uri: '/placeholder-user.jpg' }}
              style={styles.avatarImage}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>
              {firstName} {lastName}
            </Text>
            <Text style={styles.status}>
              {attending ? 'Attending' : 'Not Attending'}
            </Text>
          </View>
        </View>
        <View style={styles.actions}>
          <Switch
            value={attending}
            onValueChange={() => {}}
            trackColor={{ false: colors.textSecondary, true: colors.switch }}
            thumbColor={colors.text}
          />
          <TouchableOpacity style={styles.button}>
            <Ionicons
              name="trash-outline"
              size={24}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

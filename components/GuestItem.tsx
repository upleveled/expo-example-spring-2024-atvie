import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/colors';
import { Guest } from '../migrations/00000-createTableGuests';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.textSecondary,
    marginRight: 8,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  info: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    color: colors.text,
  },
  attending: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 14,
    color: colors.textSecondary,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
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
      pathname: `/guests/[guestId]`,
      params: { guestId: id },
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={openGuest}>
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Image
            style={styles.avatarImage}
            source={{
              uri: `https://res.cloudinary.com/trueque-image/image/upload/v1713269496/guest-${id}.webp`,
            }}
            placeholder={require('../assets/candidate-default.avif')}
            placeholderContentFit="cover"
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            {firstName} {lastName}
          </Text>
          <Text style={styles.attending}>
            {attending ? 'Attending' : 'Not Attending'}
          </Text>
        </View>
        <View style={styles.actionContainer}>
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

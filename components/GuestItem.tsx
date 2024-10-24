import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import placeholder from '../assets/candidate-default.avif';
import { colors } from '../constants/colors';
import type { Guest } from '../migrations/00000-createTableGuests';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: colors.textSecondary,
  },
  actionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginLeft: 16,
  },
});

type Props = {
  guest: Guest;
  setIsStale: (isStale: boolean) => void;
};

export default function GuestItem({ guest, setIsStale }: Props) {
  const { id, firstName, lastName, attending } = guest;

  return (
    <Link href={`/guests/${id}`} asChild>
      <Pressable>
        <View style={styles.card}>
          <View style={styles.avatar}>
            <Image
              style={styles.avatarImage}
              source={{
                uri: `https://res.cloudinary.com/trueque-image/image/upload/v1713269496/guest-${id}.webp`,
              }}
              placeholder={placeholder}
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
          <View style={styles.actionWrapper}>
            <Switch
              value={attending}
              onValueChange={async () => {
                await fetch(`/api/${id}`, {
                  method: 'PUT',
                  body: JSON.stringify({
                    firstName,
                    lastName,
                    attending: !attending,
                  }),
                });

                setIsStale(true);
              }}
              trackColor={{ false: colors.textSecondary, true: colors.switch }}
              thumbColor={colors.text}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                await fetch(`/api/${id}`, {
                  method: 'DELETE',
                });

                setIsStale(true);
              }}
            >
              <Ionicons
                name="trash-outline"
                size={24}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { Guest } from '../../migrations/00000-createTableGuests';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.text,
    overflow: 'hidden',
    marginBottom: 16,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: colors.text,
  },
  main: {
    alignItems: 'center',
    gap: 12,
  },

  textSecondary: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: colors.textSecondary,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 80,
    gap: 200,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.text,
    fontSize: 18,
  },
});

export default function Component() {
  const { id } = useLocalSearchParams();

  const [guest, setGuest] = useState<Guest>();

  // Dynamic import of images
  // const imageContext = require.context('../../assets', false, /\.(avif)$/);

  useEffect(() => {
    async function loadGuest() {
      try {
        if (typeof id !== 'string') {
          return;
        }
        const response = await fetch(`/${id}`);
        const fetchedGuest = await response.json();
        setGuest(fetchedGuest.guest);
      } catch (error) {
        console.error('Error fetching guest', error);
      }
    }
    loadGuest().catch(console.error);
  }, [id]);

  if (!guest) {
    return null;
  }

  if (typeof id !== 'string') {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        {/* Use dynamic import of images
        <Image
          style={styles.avatar}
          source={imageContext(`./guest-${id}.avif`)}
          alt="profile picture"
        /> */}
        <Image
          style={styles.avatarImage}
          source={{
            uri: `https://res.cloudinary.com/trueque-image/image/upload/v1713269496/guest-${id}.webp`,
          }}
          placeholder={require('../../assets/candidate-default.avif')}
          placeholderContentFit="cover"
        />
      </View>
      <View style={styles.main}>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {guest.firstName} {guest.lastName}
        </Text>

        <Text style={styles.textSecondary}>
          {guest.attending ? 'Attending' : 'Not attending'}
        </Text>
        <Switch value={true} onValueChange={() => {}} />
      </View>
      <View style={styles.buttonRow}>
        <Pressable style={styles.button} onPress={() => {}}>
          <Ionicons name="create-outline" size={36} color={colors.text} />
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={async () => {
            await fetch(`/${id}`, {
              method: 'DELETE',
            });
            router.replace('/');
          }}
        >
          <Ionicons name="trash-outline" size={36} color={colors.text} />
        </Pressable>
      </View>
    </View>
  );
}

import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors } from '../../constants/colors';

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
  input: {
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
  },
  edit: {
    textAlign: 'right',
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default function GuestPage() {
  const { guestId } = useLocalSearchParams();

  const [edit, setEdit] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [attending, setAttending] = useState<boolean>(false);

  // Dynamic import of images
  // const imageContext = require.context('../../assets', false, /\.(avif)$/);

  useEffect(() => {
    async function loadGuest() {
      try {
        if (typeof guestId !== 'string') {
          return;
        }
        const response = await fetch(`/api/${guestId}`);
        const fetchedGuest = await response.json();
        setFirstName(fetchedGuest.guest.firstName);
        setLastName(fetchedGuest.guest.lastName);
        setAttending(fetchedGuest.guest.attending);
      } catch (error) {
        console.error('Error fetching guest', error);
      }
    }
    loadGuest().catch(console.error);
  }, [guestId]);

  if (!firstName || !lastName || typeof attending !== 'boolean') {
    return null;
  }

  if (typeof guestId !== 'string') {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        {/* Use dynamic import of images
        <Image
          style={styles.avatar}
          source={imageContext(`./guest-${guestId}.avif`)}
          alt="profile picture"
        /> */}
        <Image
          style={styles.avatarImage}
          source={{
            uri: `https://res.cloudinary.com/trueque-image/image/upload/v1713269496/guest-${guestId}.webp`,
          }}
          placeholder={require('../../assets/candidate-default.avif')}
          placeholderContentFit="cover"
        />
      </View>
      {edit ? (
        <View style={styles.flex}>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First Name"
          />
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last Name"
          />
          <Switch value={attending} onValueChange={setAttending} />
          <Pressable
            style={styles.button}
            onPress={async () => {
              await fetch(`/api/${guestId}`, {
                method: 'PUT',
                body: JSON.stringify({
                  firstName,
                  lastName,
                  attending,
                }),
              });
              setEdit(false);
            }}
          >
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <View style={styles.main}>
            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
              {firstName} {lastName}
            </Text>

            <Text style={styles.textSecondary}>
              {attending ? 'Attending' : 'Not attending'}
            </Text>
            <Switch value={attending} onValueChange={() => {}} />
          </View>
          <View style={styles.buttonRow}>
            <Pressable
              style={styles.button}
              onPress={() => {
                setEdit(true);
              }}
            >
              <Ionicons name="create-outline" size={36} color={colors.text} />
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={async () => {
                await fetch(`/api/${guestId}`, {
                  method: 'DELETE',
                });
                router.replace('/');
              }}
            >
              <Ionicons name="trash-outline" size={36} color={colors.text} />
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import placeholder from '../../assets/candidate-default.avif';
import { colors } from '../../constants/colors';
import type { GuestResponseBodyGet } from '../api/[guestId]+api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingLeft: 10,
    paddingRight: 10,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
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
  textContainer: {
    alignItems: 'center',
    gap: 12,
  },
  textSecondary: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: colors.textSecondary,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 80,
    gap: 200,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 30,
    backgroundColor: colors.text,
    padding: 12,
    borderRadius: 12,
    shadowColor: colors.white,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: '100%',
  },
  buttonText: {
    fontFamily: 'Poppins_400Regular',
    color: colors.cardBackground,
    textAlign: 'center',
    fontSize: 18,
  },
  label: {
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    color: colors.text,
    backgroundColor: colors.background,
    borderColor: colors.textSecondary,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  inputFocused: {
    borderColor: colors.white,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
});

export default function GuestPage() {
  const { guestId } = useLocalSearchParams();

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [attending, setAttending] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | undefined>();

  // Dynamic import of images
  // const imageContext = require.context('../../assets', false, /\.(avif)$/);

  useFocusEffect(
    useCallback(() => {
      async function loadGuest() {
        if (typeof guestId !== 'string') {
          return;
        }

        const response = await fetch(`/api/${guestId}`);
        const body: GuestResponseBodyGet = await response.json();

        if ('guest' in body) {
          setFirstName(body.guest.firstName);
          setLastName(body.guest.lastName);
          setAttending(body.guest.attending);
        }
      }

      loadGuest().catch((error) => {
        console.error(error);
      });
    }, [guestId]),
  );

  if (typeof guestId !== 'string') {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        {/* Use dynamic import of images */}
        {/* <Image
          style={styles.avatar}
          source={imageContext(`./guest-${guestId}.avif`)}
          alt="profile picture"
        /> */}
        <Image
          style={styles.avatarImage}
          source={{
            uri: `https://res.cloudinary.com/trueque-image/image/upload/v1713269496/guest-${guestId}.webp`,
          }}
          placeholder={placeholder}
          placeholderContentFit="cover"
        />
      </View>
      {isEditing ? (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'firstName' && styles.inputFocused,
              ]}
              value={firstName}
              onChangeText={setFirstName}
              onFocus={() => setFocusedInput('firstName')}
              onBlur={() => setFocusedInput(undefined)}
            />
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'lastName' && styles.inputFocused,
              ]}
              value={lastName}
              onChangeText={setLastName}
              onFocus={() => setFocusedInput('lastName')}
              onBlur={() => setFocusedInput(undefined)}
            />
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { opacity: pressed ? 0.5 : 1 },
            ]}
            onPress={async () => {
              await fetch(`/api/${guestId}`, {
                method: 'PUT',
                body: JSON.stringify({
                  firstName,
                  lastName,
                  attending,
                }),
              });

              setIsEditing(false);
              router.replace('/');
            }}
          >
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </>
      ) : (
        <>
          <View style={styles.textContainer}>
            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
              {firstName} {lastName}
            </Text>

            <Text style={styles.textSecondary}>
              {attending ? 'Attending' : 'Not attending'}
            </Text>
            <Switch
              value={attending}
              onValueChange={async () => {
                await fetch(`/api/${guestId}`, {
                  method: 'PUT',
                  body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    attending: !attending,
                  }),
                });
                setIsEditing(false);
                router.replace('/');
              }}
            />
          </View>
          <View style={styles.iconContainer}>
            <Pressable
              style={styles.icon}
              onPress={() => {
                setIsEditing(true);
              }}
            >
              <Ionicons name="create-outline" size={36} color={colors.text} />
            </Pressable>
            <Pressable
              style={styles.icon}
              onPress={async () => {
                await fetch(`/api/${guestId}`, {
                  method: 'DELETE',
                });
                setIsEditing(false);
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

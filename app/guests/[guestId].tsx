import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from 'expo-image';
import { Link, router, useLocalSearchParams } from 'expo-router';
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
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.text,
    fontSize: 20,
  },
  profilePicture: {
    width: 200,
    height: 200,
  },
  input: {
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
  },
  button: {
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    textAlign: 'center',
    backgroundColor: colors.cardBackground,
    fontSize: 24,
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

export default function Guests() {
  const { id } = useLocalSearchParams();

  const [edit, setEdit] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [attending, setAttending] = useState<boolean>(false);

  const imageContext = require.context('../../assets', false, /\.(avif)$/);

  useEffect(() => {
    async function loadGuest() {
      try {
        if (typeof id !== 'string') {
          return;
        }
        const response = await fetch(`/${id}`);
        const fetchedGuest = await response.json();
        setFirstName(fetchedGuest.guest.firstName);
        setLastName(fetchedGuest.guest.lastName);
        setAttending(fetchedGuest.guest.attending);
      } catch (error) {
        console.error('Error fetching guest', error);
      }
    }
    loadGuest().catch(console.error);
  }, [id]);

  if (!firstName || !lastName) {
    return null;
  }

  if (typeof id !== 'string') {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.profilePicture}
        source={imageContext(`./guest-${id}.avif`)}
        alt="profile picture"
      />
      <Image
        style={styles.profilePicture}
        source={{
          uri: `https://res.cloudinary.com/trueque-image/image/upload/v1713269496/guest-${id}.webp`,
        }}
        alt="profile picture"
      />
      {edit ? (
        <>
          <TextInput
            style={styles.input}
            onChangeText={setFirstName}
            placeholder="First Name"
            value={firstName}
          />
          <TextInput
            style={styles.input}
            onChangeText={setLastName}
            placeholder="First Name"
            value={lastName}
          />
          <View style={styles.flex}>
            <Text>Attending?</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              onValueChange={setAttending}
              value={attending}
            />
          </View>
          <Pressable
            style={({ pressed }) => [
              {
                width: '100%',
                opacity: pressed ? 0.5 : 1,
              },
            ]}
            onPress={async () => {
              await fetch(`/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                  firstName,
                  lastName,
                  attending,
                }),
              });
              setEdit(false);
              router.push({
                pathname: `/guests/[id]`,
                params: { id },
              });
            }}
          >
            <Text style={styles.button}>Update Guest</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={styles.text}>
            {firstName} {lastName}
          </Text>
          <Text style={styles.text}>
            {attending ? 'Attending' : 'Not attending'}
          </Text>
          <Pressable
            style={({ pressed }) => [
              {
                width: '100%',
                opacity: pressed ? 0.5 : 1,
              },
            ]}
            onPress={() => {
              setEdit(!edit);
            }}
          >
            <Text style={styles.edit}>
              <AntDesign name="edit" size={32} color="black" />
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                width: '100%',
                opacity: pressed ? 0.5 : 1,
              },
            ]}
            onPress={async () => {
              await fetch(`/${id}`, {
                method: 'DELETE',
              });
              router.push('/');
            }}
          >
            <Text style={styles.button}>Delete Guest</Text>
          </Pressable>
        </>
      )}

      <Link style={styles.button} href="/">
        Back
      </Link>
    </View>
  );
}

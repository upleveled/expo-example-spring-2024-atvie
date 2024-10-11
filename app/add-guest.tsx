import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput } from 'react-native';
import { colors } from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default function NewGuest() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
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
        placeholder="Last Name"
        value={lastName}
      />
      <Pressable
        style={({ pressed }) => [
          {
            width: '100%',
            opacity: pressed ? 0.5 : 1,
          },
        ]}
        onPress={async () => {
          await fetch(`/api/guests`, {
            method: 'POST',
            body: JSON.stringify({
              firstName,
              lastName,
            }),
          });
          router.push('/');
        }}
      >
        <Text style={styles.button}>Add Guest</Text>
      </Pressable>
      <Link href="/" style={styles.button}>
        Back to List
      </Link>
    </>
  );
}

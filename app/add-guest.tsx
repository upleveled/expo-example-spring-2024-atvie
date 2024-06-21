import { Link } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
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
      <Link
        href={`/?firstName=${firstName}&lastName=${lastName}`}
        style={styles.button}
      >
        Add Guest
      </Link>
      <Link href="/" style={styles.button}>
        Back to List
      </Link>
    </>
  );
}

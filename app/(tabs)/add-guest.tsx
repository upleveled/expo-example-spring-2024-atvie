import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Snackbar from '../../components/Snackbar';
import { colors } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.background,
    alignItems: 'center',
    width: '100%',
  },
  addGuestContainer: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    width: '100%',
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
  inputError: {
    borderColor: colors.red,
  },
  button: {
    marginTop: 30,
    backgroundColor: colors.cardBackground,
    padding: 10,
    borderRadius: 12,
    color: colors.text,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    width: '100%',
  },
  text: {
    fontFamily: 'Poppins_400Regular',
    color: colors.text,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default function NewGuest() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState('');
  const [errorInput, setErrorInput] = useState({
    firstName: false,
    lastName: false,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addGuestContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={[
            styles.input,
            focusedInput === 'firstName' && styles.inputFocused,
            errorInput.firstName && styles.inputError,
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
            errorInput.lastName && styles.inputError,
          ]}
          value={lastName}
          onChangeText={setLastName}
          onFocus={() => setFocusedInput('lastName')}
          onBlur={() => setFocusedInput(undefined)}
        />
      </View>
      <Pressable
        style={({ pressed }) => [styles.button, { opacity: pressed ? 0.5 : 1 }]}
        onPress={async () => {
          if (!firstName && !lastName) {
            setErrorMessage('First and last name required');
            setErrorInput({ firstName: true, lastName: true });
            return;
          }
          if (!lastName) {
            setErrorMessage('Last name is required');
            setErrorInput({ firstName: false, lastName: true });
            return;
          }
          if (!firstName) {
            setErrorMessage('First name is required');
            setErrorInput({ firstName: true, lastName: false });
            return;
          }

          try {
            const response = await fetch('/guests', {
              method: 'POST',
              body: JSON.stringify({ firstName, lastName }),
            });

            if (!response.ok) {
              let newErrorMessage = 'Error creating guest';
              try {
                const responseBody = await response.json();
                if ('error' in responseBody) {
                  newErrorMessage = responseBody.error;
                }
              } catch {}
              setErrorMessage(newErrorMessage);
              return;
            }

            setFirstName('');
            setLastName('');
            setErrorInput({ firstName: false, lastName: false });
            router.push('/');
          } catch {}
        }}
      >
        <Text style={styles.text}>Add Guest</Text>
      </Pressable>
      {!!errorMessage && (
        <Snackbar
          actionText="Dismiss"
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </SafeAreaView>
  );
}
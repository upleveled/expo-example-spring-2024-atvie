import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
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
  button: {
    marginTop: 30,
    backgroundColor: colors.text,
    padding: 12,
    borderRadius: 12,
    shadowColor: colors.white,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    width: '100%',
  },
  text: {
    fontFamily: 'Poppins_400Regular',
    color: colors.cardBackground,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default function NewGuest() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | undefined>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addGuestContainer}>
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
        style={({ pressed }) => [styles.button, { opacity: pressed ? 0.5 : 1 }]}
        onPress={async () => {
          const response = await fetch('/api/guests', {
            method: 'POST',
            body: JSON.stringify({ firstName, lastName, attending: false }),
          });

          if (!response.ok) {
            let errorMessage = 'Error creating guest';
            try {
              const body: { error: string } = await response.json();
              if (body.error) {
                errorMessage = body.error;
              }
            } catch {}

            Alert.alert('Error', errorMessage, [{ text: 'OK' }]);
            return;
          }

          setFirstName('');
          setLastName('');
          router.push('/error');
        }}
      >
        <Text style={styles.text}>Add Guest</Text>
      </Pressable>
    </SafeAreaView>
  );
}

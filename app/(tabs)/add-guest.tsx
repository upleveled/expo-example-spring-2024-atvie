import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.background,
  },
  addGuestContainer: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.background,
    borderColor: colors.textSecondary,
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addGuestContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          {
            width: '100%',
            opacity: pressed ? 0.5 : 1,
          },
        ]}
        onPress={async () => {
          await fetch(`/guests`, {
            method: 'POST',
            body: JSON.stringify({
              firstName,
              lastName,
            }),
          });
          setFirstName('');
          setLastName('');
          router.push('/');
        }}
      >
        <Text style={styles.text}>Add Guest</Text>
      </Pressable>
    </SafeAreaView>
  );
}

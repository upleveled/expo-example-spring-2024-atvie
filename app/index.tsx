import { Pacifico_400Regular, useFonts } from '@expo-google-fonts/pacifico';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import GuestItem from '../components/GuestItem';
import { colors } from '../constants/colors';
import { Guest } from '../migrations/00000-createTableGuests';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    height: '100%',
  },
  text: {
    color: colors.text,
  },
  list: {
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

const renderItem = (item: { item: Guest }) => <GuestItem guest={item.item} />;

export default function App() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  useEffect(() => {
    async function getGuests() {
      const response = await fetch('/api/guests', {
        headers: {
          Cookie: 'name=value',
        },
      });
      const data = await response.json();

      setGuests(data.guests);
    }

    getGuests().catch((error) => {
      console.error(error);
    });
  }, []);

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <FlatList
          style={styles.list}
          data={guests}
          renderItem={renderItem}
          keyExtractor={(item: Guest) => String(item.id)}
        />
        <Link style={styles.button} href="/add-guest">
          Add Guest
        </Link>
      </View>
    );
  }
}

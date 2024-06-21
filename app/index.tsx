import { Pacifico_400Regular, useFonts } from '@expo-google-fonts/pacifico';
import { Link, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import GuestItem from '../components/GuestItem';
import { colors } from '../constants/colors';

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

export const guestList: Guest[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    attending: true,
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    attending: false,
  },
];
type Guest = {
  id: string;
  firstName: string;
  lastName: string;
  deadline?: string;
  attending: boolean;
};

const renderItem = (item: { item: Guest }) => <GuestItem guest={item.item} />;

export default function App() {
  const { id, firstName, lastName } = useLocalSearchParams<{
    id?: Guest['id'];
    firstName?: Guest['firstName'];
    lastName?: Guest['lastName'];
  }>();
  console.log(firstName, lastName);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  useEffect(() => {
    async function getGuests() {
      const response = await fetch('/guests', {
        headers: {
          Cookie: 'name=value',
        },
      });
      const data = await response.json();

      setGuests(data.guests);
    }

    async function postGuest(guest: { firstName: string; lastName: string }) {
      const response = await fetch(`/guests`, {
        method: 'POST',
        body: JSON.stringify({
          firstName: guest.firstName,
          lastName: guest.lastName,
        }),
      });
      const newGuest: Guest = await response.json();
      setGuests((g) => [...g, newGuest]);
    }

    if (typeof firstName === 'string' && typeof lastName === 'string') {
      postGuest({ firstName, lastName }).catch(console.error);
    } else {
      getGuests().catch((error) => {
        console.error(error);
      });
    }
  }, [firstName, lastName]);

  useEffect(() => {
    async function deleteGuest(guestId: string) {
      await fetch(`/${guestId}`, {
        method: 'DELETE',
      });
      setGuests((g) => g.filter((guest) => guest.id !== id));
    }
    if (typeof id === 'string') {
      deleteGuest(id).catch(console.error);
    }
  }, [id]);

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <FlatList
          style={styles.list}
          data={guestList}
          renderItem={renderItem}
          keyExtractor={(item: Guest) => item.id}
        />
        <Link style={styles.button} href="/add-guest">
          Add Guest
        </Link>
      </View>
    );
  }
}

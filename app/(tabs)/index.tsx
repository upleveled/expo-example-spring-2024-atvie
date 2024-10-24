import { Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import GuestItem from '../../components/GuestItem';
import { colors } from '../../constants/colors';
import type { Guest } from '../../migrations/00000-createTableGuests';

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
  },
});

export default function App() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  // const renderItem = (item: { item: Guest }) => <UserItem user={item.item} />;

  const renderItem = (item: { item: Guest }) => (
    <GuestItem guest={item.item} guests={guests} setGuests={setGuests} />
  );

  useEffect(() => {
    async function getGuests() {
      const response = await fetch('/api/guests', {
        headers: {
          Cookie: 'name=value',
        },
      });
      const body: { guests: Guest[] } = await response.json();

      setGuests(body.guests);
    }

    getGuests().catch((error) => {
      console.error(error);
    });
  }, []);

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.list}
          data={guests}
          renderItem={renderItem}
          keyExtractor={(item: Guest) => String(item.id)}
        />
      </SafeAreaView>
    );
  }
}

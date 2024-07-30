import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    backgroundColor: colors.red,
    bottom: 15,
    width: '100%',
  },
  messageText: {
    fontSize: 16,
    color: colors.white,
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.white,
  },
});

type Props = {
  actionText: string;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
};

function Snackbar({ actionText, errorMessage, setErrorMessage }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      setIsVisible(true);
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [errorMessage]);

  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.messageText}>{errorMessage}</Text>
      {!!actionText && (
        <TouchableOpacity
          onPress={() => {
            setIsVisible(false);
            setErrorMessage('');
          }}
        >
          <Text style={styles.actionText}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default Snackbar;

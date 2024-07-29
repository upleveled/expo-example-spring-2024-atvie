import React, { useEffect, useState } from 'react';
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

export default function Snackbar({
  actionText,
  errorMessage,
  setErrorMessage,
}: {
  actionText: string;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
        setErrorMessage('');
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [isVisible]);

  useEffect(() => {
    setIsVisible(true);
  }, [errorMessage]);

  return (
    isVisible && (
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
    )
  );
}

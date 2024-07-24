import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '../../components/TabBarIcon';
import { colors } from '../../constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.text,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          paddingTop: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Guest List',
          tabBarIcon: ({ color, focused }) =>
            TabBarIcon({ name: focused ? 'list' : 'list-outline', color }),
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="add-guest"
        options={{
          title: 'Add Guest',
          tabBarIcon: ({ color, focused }) =>
            TabBarIcon({ name: focused ? 'add' : 'add-outline', color }),
        }}
      />
    </Tabs>
  );
}

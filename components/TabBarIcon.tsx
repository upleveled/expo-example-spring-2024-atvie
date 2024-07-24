import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { type ComponentProps } from 'react';

export function TabBarIcon({
  style,
  color,
  name,
}: IconProps<ComponentProps<typeof Ionicons>['name']>) {
  return (
    <Ionicons
      size={28}
      style={[{ marginBottom: -3 }, style]}
      color={color}
      name={name}
    />
  );
}

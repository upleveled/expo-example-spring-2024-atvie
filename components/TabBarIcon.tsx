import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import Ionicons from '@expo/vector-icons/Ionicons';
import { type ComponentProps } from 'react';

export function TabBarIcon({
  style,
  color,
  name,
}: IconProps<ComponentProps<typeof Ionicons>['name']>) {
  return (
    <Ionicons
      size={32}
      style={[{ marginBottom: -3, fontFamily: 'Poppins_400Regular' }, style]}
      color={color}
      name={name}
    />
  );
}

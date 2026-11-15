import { Image, ImageStyle } from 'expo-image';
import { StyleProp } from 'react-native';

const ICON_MAP = {
  'location-pin': require('@/assets/icons/location-pin.svg'),
  shield: require('@/assets/icons/shield.svg'),
  'alert-triangle': require('@/assets/icons/alert-triangle.svg'),
  droplets: require('@/assets/icons/droplets.svg'),
  thermometer: require('@/assets/icons/thermometer.svg'),
  'cloud-lightning': require('@/assets/icons/cloud-lightning.svg'),
  'cloud-rain': require('@/assets/icons/cloud-rain.svg'),
  radar: require('@/assets/icons/radar.svg'),
  calendar: require('@/assets/icons/calendar.svg'),
  home: require('@/assets/icons/home.svg'),
  map: require('@/assets/icons/map.svg'),
  bell: require('@/assets/icons/bell.svg'),
  analytics: require('@/assets/icons/analytics.svg'),
  settings: require('@/assets/icons/settings.svg'),
} as const;

export type IconName = keyof typeof ICON_MAP;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: StyleProp<ImageStyle>;
}

export function Icon({ name, size = 20, color = '#F8FAFC', style }: IconProps) {
  const source = ICON_MAP[name];

  return (
    <Image
      source={source}
      style={[{ width: size, height: size }, style]}
      tintColor={color}
      contentFit="contain"
      transition={0}
      cachePolicy="memory"
    />
  );
}

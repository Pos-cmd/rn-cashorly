import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { ONBOARDING_FONT_FAMILY } from '@/lib/constants/onboarding-typography';

interface AuthRowProps {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
}

const AuthRow = ({
  label,
  icon,
  onPress,
  backgroundColor,
  textColor,
}: AuthRowProps) => {
  return (
    <Pressable 
      onPress={onPress} className="h-22 rounded-md px-8 flex-row items-center"
      style={({pressed }) => (
        {
          opacity: pressed ? 0.85 : 1,
          backgroundColor,
        }
    )} >
      <View className="w-8 items-center">{icon}</View>
      <Text className="ml-8 text-base leading-5" style={{
        color: textColor,
        fontFamily: ONBOARDING_FONT_FAMILY.regular,
      }}>{ label }</Text>
    </Pressable>
  )
}

export default AuthRow

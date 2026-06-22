import useAuthTheme from '@/hooks/use-auth-theme';
import { ONBOARDING_FONT_FAMILY } from '@/lib/constants/onboarding-typography';
import React from 'react';
import { Pressable, Text } from 'react-native';

interface AuthPrimaryButtonProps {
  onPress: () => void;
  label: string;
  disabled?: boolean
}

const AuthPrimaryButton = ({
  onPress,
  label,
  disabled
}: AuthPrimaryButtonProps) => {
  const { colors } = useAuthTheme()


  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className='h-16.25 rounded-full items-center justify-center'
      style={({ pressed }) => ({
        opacity: pressed || disabled ? 0.85 : 1,
        backgroundColor: colors.buttonBackground
      })}
    >
      <Text className="text-h5 leading-5" style={{
        color: colors.textInverse,
        fontFamily: ONBOARDING_FONT_FAMILY.bold,
      }}>
        {label}
      </Text>
    </Pressable>
  )
}

export default AuthPrimaryButton

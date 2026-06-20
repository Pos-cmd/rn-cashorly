import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable } from 'react-native';

interface OnboardingNextButtonProps {
  onPress: () => void;
}

const OnboardingNextButton = ({ onPress }: OnboardingNextButtonProps) => {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Next onboarding step"
      onPress={onPress}
      className="w-17.5 h-17.5 rounded-full bg-brand-green-500 items-center justify-center"
      style={({ pressed }) => ({
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <Ionicons name="chevron-forward-outline" size={32} color="#FFFFFF" />
    </Pressable>
  )
}

export default OnboardingNextButton

import { View, Text } from 'react-native'
import React from 'react'
import { useThemeColor } from 'heroui-native';
import { ONBOARDING_FONT_FAMILY } from '@/lib/constants/onboarding-typography';

interface OnboardingContentCardProps {
  title: string;
  description: string;
  headingTop: number;
  headingWidth: number;
  bottomInset: number;
  children?: React.ReactNode;
}

const CARD_BOTTOM_PADDING = 20;

const OnboardingContentCard = ({
  title,
  description,
  headingTop,
  headingWidth,
  bottomInset,
  children,
}: OnboardingContentCardProps) => {
  const surfaceColor = useThemeColor('surface');
  const titleColor = useThemeColor('foreground');
  const descriptionColor = useThemeColor('muted');

  return (
    <View className="w-full h-full rounded-t-lg items-center" style={{
      paddingTop: headingTop,
      paddingBottom: bottomInset + CARD_BOTTOM_PADDING,
      backgroundColor: surfaceColor,
    }}>
      <View className="items-center gap-2.5" style={{ width: headingWidth}}>
        <Text 
          className="text-h2 leading-8.75 text-center" 
          style={{ 
            fontFamily: ONBOARDING_FONT_FAMILY.bold, 
            color: titleColor 
            }}>
              { title }
        </Text>
        <Text 
          className="text-body-sm leading-3.75 text-center" 
          style={{ 
            fontFamily: ONBOARDING_FONT_FAMILY.regular, 
            color: descriptionColor 
            }}>
              { description }
        </Text>
      </View>
      {children}
    </View>
  )
}

export default OnboardingContentCard

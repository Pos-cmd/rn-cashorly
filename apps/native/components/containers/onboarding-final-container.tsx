import { ONBOARDING_FONT_FAMILY } from '@/lib/constants/onboarding-typography';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useThemeColor, useToast } from 'heroui-native';
import React from 'react';
import { Image, ImageSourcePropType, Text, useWindowDimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AuthRow from '../base/auth-row';

interface OnboardingFinalContainerProps {
  imageSource: ImageSourcePropType;
  bottomInset: number;
}

const OnboardingFinalContainer = ({
  imageSource,
  bottomInset,
}: OnboardingFinalContainerProps) => {
  const router = useRouter();

  const { width } = useWindowDimensions();
  const { toast } = useToast();
  const dangerColor = useThemeColor("danger");
  const accentColor = useThemeColor("accent");
  const surfaceColor = useThemeColor("surface");
  const textColor = useThemeColor("foreground");
  const mutedTextColor = useThemeColor("muted");
  const rowBackgroundColor = useThemeColor("surface-secondary");
  const rowTextColor = useThemeColor("surface-foreground");
  const separatorColor = useThemeColor("separator");
  const actionIconBackgroundColor = useThemeColor("foreground");
  const actionIconColor = useThemeColor("background");
  const heroWidth = Math.min(350, width - 36);
  const heroHeight = Math.round(heroWidth * 0.62);
  const socialProviders = [
    {
      label: "Register with Google",
      provider: "Google",
      iconName: "logo-google" as const,
      iconSize: 30,
      iconColor: dangerColor,
    },
    {
      label: "Register with Apple",
      provider: "Apple",
      iconName: "logo-apple" as const,
      iconSize: 32,
      iconColor: textColor,
    },
    {
      label: "Register with Facebook",
      provider: "Facebook",
      iconName: "logo-facebook" as const,
      iconSize: 30,
      iconColor: accentColor,
    },
  ];

  const handleSocialPress = (provider: string) => {
    toast.show({
      label: `${provider} auth coming soon`,
      variant: "default",
    });
  };

  return (
    <View className="flex-1 bg-brand-green-500">
      <View className="px-4.5 pt-13.5">
        <Image
          source={imageSource}
          resizeMode="contain"
          style={{
            width: heroWidth,
            height: heroHeight,
            alignSelf: "center",
            borderRadius: 30,
          }}
        />
      </View>
      <View className="mt-4 flex-1 rounded-t-lg" style={{ backgroundColor: surfaceColor }}>
        <ScrollView
          contentInsetAdjustmentBehavior="never"
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 42,
            paddingBottom: bottomInset + 2,
            gap: 14,
          }}
        >
          <View className="px-2 items-center gap-2.5">
            <Text
              className="text-h2 leading-8.75 text-center"
              style={{
                color: textColor,
                fontFamily: ONBOARDING_FONT_FAMILY.bold,
              }}>
              Welcome to Cashory
            </Text>

            <Text className="text-body-sm leading-3.75 text-center" style={{
              color: mutedTextColor,
              fontFamily: ONBOARDING_FONT_FAMILY.regular,
            }}>
              Create new entries, log income, and track expenses all in one place.
            </Text>
          </View>

          <View className="mt-4 gap-3">
            <AuthRow
              label="Login with Email"
              onPress={() => router.push('/sign-in')}
              backgroundColor={rowBackgroundColor}
              textColor={rowTextColor}
              icon={
                <View
                  className="w-8 h-8 rounded-full items-center justify-center"
                  style={{
                    backgroundColor: actionIconBackgroundColor,
                  }}
                >
                  <Ionicons name="arrow-forward" size={20} color={actionIconColor} />
                </View>
              }
            />

            {socialProviders.map((provider, index) => {
              return (
                <AuthRow
                  key={provider.provider}
                  label={provider.label}
                  onPress={() => handleSocialPress(provider.provider)}
                  backgroundColor={rowBackgroundColor}
                  textColor={rowTextColor}
                  icon={
                    <Ionicons
                      name={provider.iconName}
                      size={provider.iconSize}
                      color={provider.iconColor}
                    />
                  }
                />
                )
              })
            }

            <View className="mt-2 flex-row items-center">
              <View
                className="h-px flex-1"
                style={{ backgroundColor: separatorColor }}
              />
              <Text
                className="px-4 text-body-sm leading-3.75"
                style={{
                  fontFamily: ONBOARDING_FONT_FAMILY.regular,
                  color: mutedTextColor,
                }}
              >
                Or Register with
              </Text>
              <View
                className="h-px flex-1"
                style={{ backgroundColor: separatorColor }}
              />
            </View>

            <AuthRow
              label="Register with Email"
              onPress={() => router.push('/sign-up')}
              backgroundColor={rowBackgroundColor}
              textColor={rowTextColor}
              icon={
                <Ionicons
                  name="mail"
                  size={28}
                  color={socialProviders[0].iconColor}
                />
              }
            />
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default OnboardingFinalContainer

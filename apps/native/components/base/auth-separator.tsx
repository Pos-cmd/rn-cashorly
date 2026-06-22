import useAuthTheme from "@/hooks/use-auth-theme";
import { ONBOARDING_FONT_FAMILY } from "@/lib/constants/onboarding-typography";
import React from "react";
import { Text, View } from "react-native";

export default function AuthSeparator({
  label = "Or Use With",
}: {
  label?: string;
}) {
  const { colors } = useAuthTheme();
  return (
    <View className="mt-2 flex-row items-center">
      <View
        className="h-px flex-1"
        style={{ backgroundColor: colors.separator }}
      />
      <Text
        className="px-4 text-body-sm leading-3.75"
        style={{
          fontFamily: ONBOARDING_FONT_FAMILY.regular,
          color: colors.separator,
        }}
      >
        {label}
      </Text>
      <View
        className="h-px flex-1"
        style={{ backgroundColor: colors.separator }}
      />
    </View>
  );
}

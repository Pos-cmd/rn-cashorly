import { useAuthSession } from '@/hooks/use-auth-session'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import OnboardingSplashContainer from '@/components/containers/onboarding-splash-container'
import { useThemeColor } from 'heroui-native'
import OnboardingTemplate from '@/components/templates/onboarding-template'

const index = () => {
  const router = useRouter()
  const { data: session, isPending } = useAuthSession();

  const backgroundColor = useThemeColor('background');

  useEffect(() => {
    if (!isPending && session?.data?.user) {
      const user = session.data.user;

      // TODO: redirect to home if user is logged in
    }
  }, [isPending, session, router])

  if(isPending) return (
    <>
      <StatusBar style="auto" />
      <OnboardingSplashContainer message="Cashory makes managing your cash a breeze, so you can focus on what matters most." />
    </>
  );

  return <OnboardingTemplate />
}

export default index

import { useAuthSession } from '@/hooks/use-auth-session'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

const index = () => {
  const router = useRouter()
  const { data: session, isPending } = useAuthSession();

  useEffect(() => {
    if (!isPending && session?.data?.user) {
      const user = session.data.user;

      // TODO: redirect to home if user is logged in
    }
  }, [isPending, session, router])

  if(isPending) return (
    <>
      <StatusBar style="auto" />
    </>
  );

  return (
    <View>
      <Text>index</Text>
    </View>
  )
}

export default index

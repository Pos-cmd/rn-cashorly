import OnboardingFlow from '@/components/templates/onboarding-flow'
import { useAuthSession } from '@/hooks/use-auth-session'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect } from 'react'

const Onboarding = () => {
  const router = useRouter()

  const params = useLocalSearchParams()
  const { data: session } = useAuthSession()

  const userData = {
    name: (params.name as string) || session?.data?.user?.name || '',
    email: (params.email as string) || session?.data?.user?.email || '',
  }

  useEffect(() => {
    const user = session?.data?.user
    
    if (!user) {
      router.replace('/sign-in')

      return
    }

  }, [session, router])

  if (!session?.data?.user) {
    return null
  }

  const handleOnComplete = () => {
    // Navigation is handled inside OnboardingFlow -> SuccessModal
  }

  return (
    <OnboardingFlow userData={userData} onComplete={handleOnComplete} />
  )
}

export default Onboarding

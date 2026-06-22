import { useCompletedOnboarding, useUpdateProfile } from '@/hooks/use-auth-session'
import { useToast } from 'heroui-native'
import React, { useState } from 'react'
import ProfileSetup from '../containers/onboarding/profile-setup'
import SelectCountry from '../containers/onboarding/select-country'
import { SuccessModal } from '../containers/onboarding/success-modal'

interface OnboardingFlowProps {
  userData: {
    name: string
    email: string
  }
  onComplete: () => void
}

type OnboardingStep = 'country' | 'profile' | 'success'

export default function OnboardingFlow({
  userData,
  onComplete,
}: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('country')
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const { toast } = useToast()

  const updateProfile = useUpdateProfile()
  const completedOnboarding = useCompletedOnboarding()

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country)
    setCurrentStep('profile')
  }

  const handleProfileCompleted = async (profileData: any) => {
    try {
      await updateProfile.mutateAsync(profileData)

      await completedOnboarding.mutateAsync()

      setShowSuccessModal(true)
    } catch (error) {
      console.log("Failed to update profile:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Failed to update profile. Please try again."

      toast.show({
        label: errorMessage,
        variant: "danger",
      })
    }
  }

  const handleBack = () => {
    if (currentStep === 'profile') {
      setCurrentStep('country')
    }
  }

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false)
    onComplete();
  }

  return (
    <>
      {
        currentStep === 'country' && (
          <SelectCountry onNext={handleCountrySelect} onBack={() => { }} />
        )
      }

      {
        currentStep === 'profile' && selectedCountry && (
          <ProfileSetup
            userData={userData}
            country={selectedCountry}
            onNext={handleProfileCompleted}
            onBack={handleBack}
          />
        )
      }

      <SuccessModal visible={showSuccessModal} onClose={handleSuccessModalClose} />
    </>
  )
}

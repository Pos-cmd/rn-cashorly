import OnboardingSplashContainer from "@/components/containers/onboarding-splash-container";
import OnboardingTemplate from "@/components/templates/onboarding-template";
import { usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { useAuthSession } from "../hooks/use-auth-session";

export default function Index() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = useAuthSession();

  useEffect(() => {
    if (pathname !== "/") return;

    if (!isPending && session?.data?.user) {
      const user = session.data.user;

      if (user?.onboardingCompleted) {
        router.replace("/(drawer)/(tabs)");
      } else {
        router.replace("/onboarding");
      }
    }
  }, [isPending, session, router, pathname]);

  if (isPending) {
    return (
      <>
        <StatusBar style="auto" />
        <OnboardingSplashContainer message="Cashory makes managing your money simple, secure, and smart" />
      </>
    );
  }
  return <OnboardingTemplate />;
}

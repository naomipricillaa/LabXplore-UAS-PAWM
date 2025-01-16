import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import useCachedResources from "@/hooks/useCachedResources";
import { StyleSheet } from "react-native";
import { useState } from "react";
import supabase from "../app/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const colorScheme = useColorScheme();
  const isLoadingComplete = useCachedResources();
  const router = useRouter();

  useEffect(() => {
    if (isLoadingComplete) {
      SplashScreen.hideAsync();
      
      // Check initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        if (!session) {
          router.replace("/(tabs)/");
        }
      });

      // Set up auth state listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        if (!session) {
          router.replace("/(tabs)/");
        }
      });

      // Cleanup subscription
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isLoadingComplete]);

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
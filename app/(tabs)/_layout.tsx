import { useRouter, Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { useEffect } from "react";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import supabase from "../lib/supabase";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      router.replace("/(tabs)/");
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarButton: () => null, // Menyembunyikan tab dari navigasi
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          tabBarButton: () => null, // Menyembunyikan tab dari navigasi
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          title: "Signup",
          tabBarButton: () => null, // Menyembunyikan tab dari navigasi
        }}
      />
      <Tabs.Screen
        name="material"
        options={{
          title: "Material",
          tabBarButton: () => null, // Hides tab button
        }}
      />
      <Tabs.Screen
        name="landing"
        options={{
          title: "Landing",
          tabBarButton: () => null, // Menyembunyikan tab dari navigasi
        }}
      />
      <Tabs.Screen
        name="calculator"
        options={{
          title: "Calculator",
          tabBarButton: () => null, // Hides tab button
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarButton: () => null, // Hides tab button
        }}
      />
    </Tabs>
  );
}

import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import AppGradient from "@/components/AppGradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors, { primaryColor } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Button, useTheme } from "react-native-paper";

const index = () => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/images/welcome-screen-image.jpg")}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <AppGradient
          // Background Linear Gradient
          colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}
        >
          <SafeAreaView style={{ flex: 1, justifyContent: "flex-end" }}>
            <View style={styles.contentWrapper}>
              <Text style={styles.title}>
                Theo dõi vị trí của những người trong nhóm
              </Text>

              <View style={styles.buttonsWrapper}>
                <Button
                  mode="contained"
                  onPress={() => router.push("/sign-in")}
                >
                  Đăng nhập
                </Button>
                <Button
                  mode="outlined"
                  onPress={() => router.push("/sign-up")}
                  style={{ borderColor: theme.colors.primary }}
                >
                  <Text style={{ color: 'white' }}>
                  Đăng ký
                  </Text>
                </Button>
              </View>
            </View>
            <StatusBar style="light" translucent={false} />
          </SafeAreaView>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(75, 75, 75, 0.8)",
  },
  contentWrapper: {
    rowGap: 20,
  },
  title: {
    color: Colors.dark.text,
    fontSize: 27,
    fontWeight: 600,
    textAlign: "center",
  },
  buttonsWrapper: {
    rowGap: 15,
  },
  loginButton: {
    backgroundColor: primaryColor,
  },
  signupButton: {
    backgroundColor: "transparent",
    borderColor: Colors.dark.text,
    borderWidth: 1,
  },
});

export default index;

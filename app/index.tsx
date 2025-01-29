import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import AppGradient from "@/components/AppGradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors, { primaryColor } from "@/constants/Colors";
import CustomButton from "@/components/CustomButton";

const index = () => {
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
                <CustomButton
                  title="Đăng nhập"
                  onPress={() => {
                    console.log("clicked");
                  }}
                  containerStyles={styles.loginButton}
                />

                <CustomButton
                  title="Đăng ký"
                  onPress={() => {
                    console.log("clicked");
                  }}
                  containerStyles={styles.signupButton}
                />
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

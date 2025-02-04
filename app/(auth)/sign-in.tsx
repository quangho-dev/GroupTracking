import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import {
  Button,
  HelperText,
  TextInput,
  useTheme,
  Text,
} from "react-native-paper";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { supabase } from "@/lib/supabase";
import { Link, router } from "expo-router";
import { Toast } from "toastify-react-native";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Email không đúng định dạng")
      .required("Bắt buộc nhập email"),
    password: yup.string().required("Bắt buộc nhập mật khẩu"),
  })
  .required();

interface IFormInputs {
  email: string;
  password: string;
}

const SignIn = () => {
  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (!error) {
        Toast.success("Đăng nhập thành công!");

        router.replace("/(home)");

        return;
      }

      Toast.error("Email hoặc mật khẩu đăng nhập không đúng");
    } catch (error) {
      Toast.error("Đã xảy ra lỗi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <View style={styles.formWrapper}>
        <View style={styles.inputsWrapper}>
          <View>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="outlined"
                  label="Email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.email}
                />
              )}
            />
            {errors.email && (
              <HelperText type="error" visible={!!errors.email}>
                {errors?.email?.message}
              </HelperText>
            )}
          </View>

          <View>
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="outlined"
                  label="Mật khẩu"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.password}
                />
              )}
            />
            {errors.password && (
              <HelperText type="error" visible={!!errors.password}>
                {errors?.password?.message}
              </HelperText>
            )}
          </View>
        </View>

        <Button
          icon="send"
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || loading}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>

        <Text variant="bodyLarge" style={{ textAlign: "center" }}>
          Bạn chưa có tài khoản?{" "}
          <Link href="/sign-up" style={{ color: theme.colors.primary }}>
            Đăng ký
          </Link>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    marginTop: 150,
    textAlign: "center",
    fontSize: 25,
    fontWeight: 600,
  },
  formWrapper: {
    marginTop: 100,
    rowGap: 20,
  },
  fieldLabel: {},
  inputsWrapper: {
    rowGap: 10,
  },
});

export default SignIn;

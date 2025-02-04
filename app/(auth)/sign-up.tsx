import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import {
  Button,
  HelperText,
  TextInput,
  Text,
  useTheme,
} from "react-native-paper";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, router } from "expo-router";
import { supabase } from "@/lib/supabase";
import { Toast } from "toastify-react-native";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Email không đúng định dạng")
      .required("Bắt buộc nhập email"),
    password: yup
      .string()
      .required("Bắt buộc nhập mật khẩu")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: yup
      .string()
      .required("Vui lòng nhập lại mật khẩu")
      .oneOf([yup.ref("password")], "Mật khẩu không trùng khớp"),
  })
  .required();

interface IFormInputs {
  email: string;
  password: string;
}

const SignUp = () => {
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
      confirmPassword: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    setLoading(true);

    try {
      await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      router.replace("/(home)");

      Toast.success("Tạo tài khoản thành công");
    } catch (error) {
      Toast.error("Đã xảy ra lỗi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký</Text>

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

          <View>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="outlined"
                  label="Xác nhận mật khẩu"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.confirmPassword}
                />
              )}
            />
            {errors.confirmPassword && (
              <HelperText type="error" visible={!!errors.confirmPassword}>
                {errors?.confirmPassword?.message}
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
          {loading ? "Đang tạo..." : "Tạo tài khoản"}
        </Button>

        <Text variant="bodyLarge" style={{ textAlign: "center" }}>
          Bạn đã có tài khoản?{" "}
          <Link href="/sign-in" style={{ color: theme.colors.primary }}>
            Đăng nhập
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

export default SignUp;

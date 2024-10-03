import { createUser } from "@/actions/user";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";

import { images } from "@/constants";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import React from "react";
import { useCallback, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import Mail from "react-native-vector-icons/Entypo";
import UserCircle from "react-native-vector-icons/FontAwesome";
import Locked from "react-native-vector-icons/Fontisto";

const SignUp = () => {
  const { signUp, setActive, isLoaded } = useSignUp();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  }, [isLoaded, signUp, form.email, form.password, setActive]);

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        const addToFirebase = await createUser(
          completeSignUp.createdUserId ?? "",
          form.fullName,
          form.email,
          form.password
        );
        if (addToFirebase?.status === 200) {
          router.replace("/(root)/(tabs)/home");
          ToastAndroid.show(String(addToFirebase?.message), ToastAndroid.SHORT);
        } else {
          ToastAndroid.show(String(addToFirebase?.message), ToastAndroid.SHORT);
        }
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  if (pendingVerification) {
    return (
      <ScrollView className="flex-1 bg-[#8fad44]">
        <View className="p-7 mt-40">
          <View className="p-5 border-4 rounded-3xl bg-white border-[#5e7119]">
            <Image source={images.logoAuth} className="w-60 h-20 self-center" />
            <Text className="font-semibold text-2xl text-center mb-4 mt-8 text-[#5e7119]">
              VERIFY EMAIL
            </Text>
            <InputField
              icon={<Locked color="#5e7119" size={18} name="locked" />}
              placeholder="OTP Code"
              onChangeText={(value) => setCode(value)}
            />
            <CustomButton
              title="Continue"
              onPress={onPressVerify}
              className="mt-6"
              bgVariant="success"
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView className="flex-1 bg-[#8fad44]">
      <View className="p-7 mt-40">
        <View className="p-5 border-4 rounded-3xl bg-white border-[#5e7119]">
          <Image source={images.logoAuth} className="w-60 h-20 self-center" />
          <Text className="font-semibold text-2xl text-center mb-4 mt-8 text-[#5e7119]">
            SIGN UP
          </Text>
          <InputField
            icon={<UserCircle color="#5e7119" size={18} name="user-circle" />}
            placeholder="Full Name"
            value={form.fullName}
            onChangeText={(value) => setForm({ ...form, fullName: value })}
          />
          <InputField
            icon={<Mail color="#5e7119" size={18} name="mail" />}
            placeholder="Email"
            textContentType="emailAddress"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            icon={<Locked color="#5e7119" size={18} name="locked" />}
            placeholder="Password"
            isPassword
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <InputField
            icon={<Locked color="#5e7119" size={18} name="locked" />}
            placeholder="Confirm Password"
            isPassword
            value={form.confirmPassword}
            onChangeText={(value) =>
              setForm({ ...form, confirmPassword: value })
            }
          />
          <CustomButton
            title="Sign Up"
            onPress={onSignUpPress}
            className="mt-6"
            bgVariant="success"
          />
          <Link
            href="/sign-in"
            className="text-md text-center text-general-200 mt-5"
          >
            Already have an account?{" "}
            <Text className="font-semibold text-[#5e7119]">Login</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from '../components/CustomButton';
import { Redirect, router } from "expo-router";

export default function App() {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className="flex-1 justify-center items-center">
          <CustomButton 
          title="Continue with Email"
          handlePress={() => router.push('/sign-in')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

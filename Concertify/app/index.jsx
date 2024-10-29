import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from '../components/CustomButton';
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function App() {
  const {isLoading,isLoggedIn} = useGlobalContext();
  if(!isLoading && isLoggedIn) return <Redirect href="/home" />
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

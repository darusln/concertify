import { View, Text } from 'react-native';
import React from 'react';
import { useGlobalContext } from '@/context/GlobalProvider'

const Home = () => {
  const { user} = useGlobalContext();
  console.log('user data: ', user)

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-lg text-black">Welcome to Concertify</Text>
      <Text> {user?.username || 'User'}</Text>
    </View>
  );
}

export default Home;

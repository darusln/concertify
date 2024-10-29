import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';

const TabIcon = ({ icon, color, focused }) => {
  return (
    <View>
      <Image
        source={icon}
        style={{
          width: 24,
          height: 24,
          tintColor: focused ? color : 'gray', // Optional to change color when focused
        }}
      />
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={require('@/assets/icons/home.png')} 
                color={color}
                focused={focused}
              />
            ),
            
          }}
        />
         <Tabs.Screen
          name="chat"
          options={{
            title: 'Chat',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={require('@/assets/icons/chat.png')} 
                color={color}
                focused={focused}
              />
            ),
            
          }}
        />
          <Tabs.Screen
          name="concerts"
          options={{
            title: 'Concerts',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={require('@/assets/icons/concert.png')} 
                color={color}
                focused={focused}
              />
            ),
            
          }}
        />
         
        {/* Add more screens if needed */}
      </Tabs>
    </>
  );
};

export default TabsLayout;

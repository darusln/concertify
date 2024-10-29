import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const CustomButton = ({ title, handlePress, containerStyles, isLoading}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`bg-[#571bcd] py-3 px-6 rounded-lg ${containerStyles} ${isLoading ? "opacity-50" : "" }`}
      disabled={isLoading}
    >
      <Text className="text-white text-lg text-center">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

// {} <-object
// `` <- backtick when u want to use dynamic variables
// ${} <- for variables
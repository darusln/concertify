import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
import { icons } from '../constants';


const FormField = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
  
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false); 
  
    return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text>{title}</Text>
      <View 
       style={[
        styles.inputContainer,
        { borderColor: isFocused ? '#bb1fbb' : '#ccc' }, // Change border color based on focus
      ]}
      >
    <TextInput
      style={{ flex: 1, fontSize: 16, color: '#000'}}
    value={value}
    placeholder={placeholder}
    onChangeText={handleChangeText}
    secureTextEntry={title === 'Password' && !showPassword} // hide password
    onFocus={() => setIsFocused(true)}   // Change border color on focus
          onBlur={() => setIsFocused(false)}    // Revert border color to gray on blur
          {...props}
    />
     {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyehide}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    paddingHorizontal: 16,
    height: 56,
  },
});


export default FormField
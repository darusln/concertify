import { View, Text, TextInput } from 'react-native'
import React, {useState} from 'react'


const FormField = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
  
    const [showPassword, setShowPassword] = useState(false)
  
    return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text>{title}</Text>
      <View className=" border-2 border-purple-500 w-full h-16 px-4 focus:border-red-500 items-center flex-row">
    <TextInput
    className="flex-1 text-black text-base"
    value={value}
    placeholder={placeholder}
    onChangeText={handleChangeText}
    secureTextEntry={title === 'Password' && !showPassword} // hide password
    />
      </View>
    </View>
  )
}

export default FormField
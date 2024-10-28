import { View, Text, ScrollView, Alert } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField.jsx'
import CustomButton from '../../components/CustomButton'
import {Link, router} from 'expo-router'
import { auth } from '../../services/firebaseConfig.js'; 
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
    const [form, setForm] =useState({
        email: '',
        password: ''
    })

    const[isSubmitting, setIsSubmitting] = useState(false)

    const submit = async() => {
        if(!form.email || !form.password){
            Alert.alert('Error', 'Please fill in all the fields')
          }
      
          setIsSubmitting(true);
          try{
            await signInWithEmailAndPassword(auth, form.email, form.password);
            console.log('User signed in successfully')
            router.replace('/home')
          }catch (error) {
            console.error("Error signing in: ", error);
            setErrorMessage(error.message)
          }finally{
            setIsSubmitting(false)
          }
    }
  return (
   <SafeAreaView className="h-full">
    <ScrollView>
        <View className="w-full justofy-center h-full px-4 my-6">
            <Text>
                Log in to Concerify
            </Text>
            <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"          
            />
             <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e})}
            otherStyles="mt-7"   
            />

            <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
            />
            <View className="justify-center pt-5 flex-row gap-2">
               <Text>Don't have an account?</Text> 
                <Link href="/sign-up"
                className="text-blue-500"
                > Sign Up</Link>

            </View>

        </View>
    </ScrollView>
   </SafeAreaView>
  )
}

export default SignIn
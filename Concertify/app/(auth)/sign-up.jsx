import { View, Text, ScrollView, Alert } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField.jsx'
import CustomButton from '../../components/CustomButton'
import {Link} from 'expo-router'
import { auth, db } from '../../services/firebaseConfig.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { router } from 'expo-router';

const SignUp = () => {
    const [form, setForm] =useState({
        username:'',
        email: '',
        password: ''
    })

    const[isSubmitting, setIsSubmitting] = useState(false)

    const submit = async() => {
        if(!form.username || !form.email || !form.password){
            Alert.alert('Error', 'Please fill in all the fields')
        }
        setIsSubmitting(true);
        try{
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                form.email,
                form.password
            );
            const user = userCredential.user;

            try {
              const docRef = await setDoc(doc(db, "users", userCredential?.user?.uid), {
                username: form.username,
                 email: form.email,
                 password: form.password,
                 userId: userCredential?.user?.uid,
                 createAt: new Date(),
              });
        }catch (e){
                console.error("Error adding document: ", e)
        }
        console.log("User created and data added to firebase")
        router.replace('/home')
    }catch(error){
        console.error("Error signing up", error.message)
    }finally{
        setIsSubmitting(false)
    }
};

  return (
   <SafeAreaView className="h-full">
    <ScrollView>
        <View className="w-full justofy-center h-full px-4 my-6">
            <Text>
                Sign Up to Concerify
            </Text>
            <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({...form, username: e})}
            otherStyles="mt-10"
            keyboardType="email-address"          
            />
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
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
            />
            <View className="justify-center pt-5 flex-row gap-2">
               <Text>Have an account already?</Text> 
                <Link href="/sign-in"
                className="text-blue-500"
                > Sign In</Link>

            </View>

        </View>
    </ScrollView>
   </SafeAreaView>
  )
}

export default SignUp
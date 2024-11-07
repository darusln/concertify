import React, { useState, KeyboardAvoidingView } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from "expo-linear-gradient";
import { Text, TextInput, View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { images } from "../constants";
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { FIREBASE_AUTH, FIRESTORE_DB} from '../services/firebaseConfig'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from  'firebase/auth'
import { setDoc, doc } from 'firebase/firestore';

const LogIn = () => {
  const [isSignIn, setIsSignIn] = useState(true); 

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, isLoading] = useState(false);

  const submitSignin = async() => {
    if(!email || !password){
        Alert.alert('Error', 'Please fill in all the fields')
      }
      isLoading(true);
      console.log(email);
      console.log(password);
      try{
        await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
        console.log('User signed in successfully')
        router.replace('./(tabs)/home')
      }catch (error) {
        console.error("Error signing in: ", error);
      }finally{
        isLoading(false)
      }
  }

  const submitSignUp = async() => {
    if(!username || !email || !password){
      Alert.alert('Error', 'Please fill in all the fields')
    }
    isLoading(true);
    try{
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = userCredential.user;

      try {
        const docRef = await setDoc(doc(FIRESTORE_DB, "users", userCredential?.user?.uid), {
          username: username,
          email: email,
          password: password,
          userId: userCredential?.user?.uid,
          reateAt: new Date(),
        });
      }catch (e){
          console.error("Error adding document: ", e)
      }
      console.log("User created and data added to firebase")
      router.replace('./(tabs)/home')
    }catch(error){
      console.error("Error signing up", error.message)
    }finally{
      isLoading(false)
    }
  }

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
      setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={images.crowd}
        style={styles.background}
      >
        <LinearGradient 
          colors={["transparent", "#040306"]}
          style={styles.gradientOverlay}
        />
      </ImageBackground>

      <SafeAreaView style={styles.contentContainer}>
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            onPress={() => setIsSignIn(true)} 
            style={[styles.tab, isSignIn && styles.activeTab]}
          >
            <Text style={[styles.tabText, isSignIn && styles.activeTabText]}>SIGN IN</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setIsSignIn(false)} 
            style={[styles.tab, !isSignIn && styles.activeTab]}
          >
            <Text style={[styles.tabText, !isSignIn && styles.activeTabText]}>SIGN UP</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>{isSignIn ? "Login to Concertify!" : "Sign Up for Concertify!"}</Text>

        {isSignIn ? 
        (
          // sign in 
          <>
            <View style={styles.inputContainer}>
              <TextInput 
                value={email}
                style={styles.input}
                placeholder="Email or username"
                placeholderTextColor="#999"
                onChangeText={(text) => setEmail(text)}
              />
              <FontAwesome name="envelope" size={20} color="#999" style={styles.icon} />
            </View>

            <View style={styles.inputContainer}>
              <TextInput 
                value={password}
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={showPassword}
              />
              <MaterialIcons 
                name={showPassword ? 'visibility-off' : 'visibility'}
                size={20} 
                color="#999" 
                style={styles.icon}
                onPress={toggleShowPassword}
              />
            </View>

            <TouchableOpacity 
              onPress={submitSignin}
              isLoading={loading}
              style={styles.loginButton}>
              <Text style={styles.loginButtonText}>LOG IN</Text>
            </TouchableOpacity>
          </>
        ) : 
        (
          // sign up 
          <>
            <View style={styles.inputContainer}>
              <TextInput 
                value={username}
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#999"
                onChangeText={(text) => setUsername(text)}
              />
              <FontAwesome 
                name="user" 
                size={20} 
                color="#999" 
                style={styles.icon} 
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput 
                value={email}
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                onChangeText={(text) => setEmail(text)}
              />
              <FontAwesome 
                name="envelope" 
                size={20} 
                color="#999" 
                style={styles.icon}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput 
                value={password}
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                onChangeText={(text) => setPassword(text)}
                secureTextEntry // hide the password
              />
              <MaterialIcons 
                name="lock" 
                size={20} 
                color="#999" 
                style={styles.icon} 
              />
            </View>

            <TouchableOpacity
              onPress={submitSignUp} 
              style={styles.loginButton}>
              <Text style={styles.loginButtonText}>SIGN UP</Text>
            </TouchableOpacity>
          </>
        )}

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>
            {isSignIn ? "Don't have an account?" : "Already have an account?"} 
          </Text>
          <TouchableOpacity 
            onPress={() => setIsSignIn(!isSignIn)} style={styles.signupLink}>
            <Text style={styles.signupLink}>
              {isSignIn ? "Sign up" : "Sign in"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040306',
  },
  background: {
    width: '100%',
    height: '70%',
    position: 'absolute',
    top: 0,
  },
  gradientOverlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
  },
  contentContainer: {
    flex: 1,
    marginTop: 160,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '40%',
    paddingHorizontal: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#A64D79', 
  },
  tabText: {
    fontSize: 18,
    color: '#999',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '100%',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    color: '#fff',
  },
  icon: {
    marginLeft: 10,
  },
  loginButton: {
    backgroundColor: '#A64D79', 
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 20,
  },
  signupText: {
    color: '#999',
    fontSize: 16,
  },
  signupLink: {
    color: '#A64D79', 
    fontWeight: 'bold',
    marginLeft: 6,
    fontSize: 16,
  },
});

export default LogIn;

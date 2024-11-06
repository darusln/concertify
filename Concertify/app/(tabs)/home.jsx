import { View, Text, FlatList, Image, TouchableOpacity, ScrollView  } from 'react-native'
import React , {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter, router } from 'expo-router'; 
import { LinearGradient } from "expo-linear-gradient";
import { collection, getDoc, getDocs } from 'firebase/firestore';
import {db} from '../../services/firebaseConfig'

const HomeTab = () => {
  const router = useRouter();
  const [concerts, setConcerts] = useState([])

  const fetchConcerts = async () =>{
    try{
      const snapshot = await getDocs(collection(db, 'concerts'))
      const concertsData = snapshot.docs.map(doc =>({
        id: doc.id,
        ...doc.data()
      }))
      setConcerts(concertsData)
    } catch(error){
      console.error("Error fetching concerts: ", error)
    }
  }

  useEffect(() =>{
   fetchConcerts()
  }, [])

  const greetingMessage = () => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      return "Good Morning";
    } else if (currentTime < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  const message = greetingMessage();

  const navigateToProfile = () => {
    router.push('/profile'); 
  };

  const renderConcertItem = ({item}) => (
    <TouchableOpacity
       className="flex-row items-center bg-white shadow rounded-lg mb-3 p-4"
        onPress={() => router.push({
          pathname: '/concert-details',
          params: { id: item.id },
        })} // Navigate to concert details
        >
          <Image
          source={{uri:item.photoUrl}}
          className="w-16 h-16 rounded-lg"
          resizeMode="cover"/>
           <View className="ml-4 flex-1">
          <Text className="text-lg font-semibold">{item.name}</Text>
          <Text className="text-sm text-gray-500">{item.artist}</Text>
        </View>

    </TouchableOpacity>
    
  )

  return (
    <LinearGradient 
      colors={['#040306', '#131624']}
      style={{ flex: 1 }} 
    >
      <SafeAreaView className="flex my-6 px-4 space-y-6">
          <View className="flex justify-between items-start flex-row mb-6">
              <Text className="text-2xl font-bold text-white" style={{ marginTop: 3, marginHorizontal: 15 }}>
                  {message}, Mara 
              </Text>
            
              <View >
                <TouchableOpacity onPress={navigateToProfile} style={{ marginBottom: 5, marginRight: 15}} > 
                  <MaterialCommunityIcons
                    name="account-circle" 
                    size={30}
                    color="white"
                  />
                  </TouchableOpacity>
              </View>
          </View>
      
          <View>
            <Text
              style={{
                color: "white",
                fontSize: 19,
                fontWeight: "bold",
                marginHorizontal: 20,
                marginTop: 10,
              }}
            >
              Your Concerts
            </Text>
            <FlatList
              data={concerts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderConcertItem}
            >

            </FlatList>


          </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default HomeTab
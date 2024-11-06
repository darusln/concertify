import { View, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';

const ConcertDetails = () => {
      const [concert, setConcert] = useState(null);
      const { id } = useLocalSearchParams(); 

      const fetchConcertDetails = async () => {
        try {
          const docRef = doc(db, 'concerts', id); // Reference to the document in 'locations' collection
          const docSnap = await getDoc(docRef);
    
          if (docSnap.exists()) {
            setConcert({ id: docSnap.id, ...docSnap.data() });
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching location:", error);
        }
      };
    
      useEffect(() => {
        console.log("Concert ID:", id); // Check if `id` is correct
        if (id) {
          fetchConcertDetails();
        }
      }, [id]);

      if (!concert) {
        return (
          <View>
            <Text>Loading...</Text> 
          </View>
        );
      }
  return (
    <View>
        <Image source={{ uri: concert.photoUrl }} className="w-full h-48" resizeMode="cover" />
       <Text className="text-2xl font-bold">{concert.name}</Text>
       <Text className="text-lg">{concert.artist}</Text>
    </View>
  )
}

export default ConcertDetails
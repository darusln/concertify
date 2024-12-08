import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, Image, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FIREBASE_AUTH ,FIRESTORE_DB } from '../../services/firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const Concert = () => {
  const { concertId, name, photoUrl, location, date, time, description } = useLocalSearchParams();
  const router = useRouter();

  const goToConcertPage = () =>{
    onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        const userDocRef = doc(FIRESTORE_DB, 'users', user.uid);
        
        try {
          await updateDoc(userDocRef, {
            concerts: arrayUnion(concertId)
          });
          router.dismiss(1);
          router.push({
            pathname: '/concertPage',
            params: { concertId: concertId },
          });
        } catch (error) {
          console.error("Error adding concert to user's data:", error);
        }
      } else {
        router.replace('./login'); // If user is logged out, redirect to login
      }
    })
  }

  return (
    <LinearGradient colors={['#040306', '#131624']} style={{ flex: 1 }}>
      <ScrollView style={styles.scrollContent}>
        <SafeAreaView style={styles.container}>
          <View style={styles.imageContainer}>
            {photoUrl ? (
              <Image source={{ uri: photoUrl }} style={styles.largeImage} />
            ) : (
              <Text style={styles.errorText}>Image not found</Text>
            )}
            <LinearGradient
              colors={['transparent', 'rgba(1, 1, 1, 1.7)']}
              style={styles.overlay}>
              <View style={styles.overlayContent}>
                  <Text style={styles.name}>{name}</Text>
                  <View style={styles.dateBadge}>
                  <Text style={styles.dateText}>{date || 'Date not available'}</Text>
                  </View>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Icon name="map-marker" size={22} color="#fff"/>
              <Text style={styles.infoText}>{location || 'Location not available'}</Text>
            </View>
          </View>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Icon name="clock-outline" size={22} color="#fff" />
              <Text style={styles.infoText}>{`${date || 'Date not available'} at ${time || 'Time not available'} UTC+2`}</Text>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>
              {`${description}`}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.checkInButton} onPress={goToConcertPage}>
              <Text style={styles.checkInText}>Check-in</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    scrollContent: {
      paddingBottom: 20, 
    },
    imageContainer: {
        width: '100%',
        height: 300,
        marginBottom: 20,
        position: 'relative',
    },
    largeImage: {
        width: '100%',
        height: '120%',
        borderRadius: 20,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 20,
        bottom: -60
    },
    overlayContent: {
        position: 'absolute',
        bottom: 10,
        left: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    dateBadge: {
        backgroundColor: '#9DBDFF',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 10,
    },
    dateText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    infoContainer: {
        width: '100%',
        backgroundColor: '#171B2C',
        borderRadius: 20,
        padding: 10,
        justifyContent: 'space-between',
        marginTop: 10,
        top: 40
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    infoText: {
        color: '#fff',
        fontSize: 14,
        marginLeft: 10,
    },
    descriptionContainer: {
        marginTop: 60,
        paddingHorizontal: 10,
        width: '100%',
    },
    descriptionTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    descriptionText: {
        color: '#aaa',
        fontSize: 16,
        lineHeight: 22,
        textAlign: 'justify'
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 20,
    },
    buttonContainer: {
      marginTop: 20,
      alignItems: 'center',
    },
    checkInButton: {
      backgroundColor: '#6A1E55',
      paddingVertical: 20,
      paddingHorizontal: 30,
      borderRadius: 15,
      alignItems: 'center',
      marginTop: 10,
      marginBottom:10
    },
    checkInText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
    },
});

export default Concert;

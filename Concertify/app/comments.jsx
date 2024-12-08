import React, { useState, useEffect } from 'react';
import { router, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { Text, FlatList, TextInput, StyleSheet, View, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../services/firebaseConfig';
import { collection, addDoc, onSnapshot, orderBy, query, updateDoc, doc, getDoc,arrayUnion, arrayRemove, increment } from 'firebase/firestore';

const CommentTab = ({ route }) => {
  // Get postId from route parameters
  const { concertId, postId, postUsername, postContent, currentUsername } = useLocalSearchParams();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const userId = FIREBASE_AUTH.currentUser?.uid;
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    //console.log(postTime);
    const commentsRef = collection(FIRESTORE_DB, 'concerts', concertId, 'threads', postId, 'comments');
    const commentsQuery = query(commentsRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
      const fetchedComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(fetchedComments);
    });
    

    return () => unsubscribe(); // Clean up subscription on unmount
  }, [concertId, postId]);

  const addComment = async (text) => {
    try {
      await addDoc(collection(FIRESTORE_DB, 'concerts', concertId, 'threads', postId, 'comments'), {
        username: currentUsername,
        content: text,
        timestamp: new Date(),
        likes: 0,
        likedBy: []
      });

      setComment('');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const renderCommentItem = ({ item }) => {
    const isLiked = item.likedBy?.includes(userId);
    
    return (
      <View style={styles.commentContainer}>
        <View style={styles.commentUserContainer}>
          <Text style={styles.commentUser}>{item.username}</Text>
          <Text style={styles.timestamp}>{new Date(item.timestamp.seconds * 1000).toLocaleString()}</Text>
        </View>
        <Text style={styles.commentContent}>{item.content}</Text>
        <View style={styles.likeContainer}>
          <TouchableOpacity
            onPress={() => handleLikeToggle(item.id, isLiked)}
            style={[styles.likeButton, isLiked ? styles.liked : null]}
          >
            <Text style={styles.likeButtonText}>{isLiked ? 'Unlike' : 'Like'}</Text>
          </TouchableOpacity>
          <Text style={styles.likeCount}>{item.likes} {item.likes === 1 ? 'Like' : 'Likes'}</Text>
        </View>
      </View>
    );
  };
  // Render each comment item
  
  return (
    <LinearGradient colors={['#040306', '#131624']} style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1, marginBottom: 30 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <SafeAreaView style={styles.container}>
          <View style={styles.postContainer}>
            <Text style={styles.postUser}>{postUsername}</Text>
            <Text style={styles.postContent}>{postContent}</Text>
          </View>
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={renderCommentItem}
            contentContainerStyle={styles.commentList}
            onScrollBeginDrag={() => Keyboard.dismiss()}
            initialNumToRender={5}  
            maxToRenderPerBatch={10}
          />

          {/* Input and Post Button at the Bottom */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Respond to post"
              placeholderTextColor="#ccc"
              value={comment}
              onChangeText={(text) => setComment(text)}
            />
            <TouchableOpacity
              onPress={() => addComment(comment)}
              style={styles.commentButton}
              disabled={!currentUsername || !comment.trim()}
            >
              <Text style={styles.commentButtonText}>Comment</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postContainer: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
  },
  postUser: {
    marginBottom: 5,
    alignContent: 'center',
    color: '#aaa',
    fontSize: 18,
    fontWeight: 'bold',
  },
  postContent: {
    color: '#fff',
    fontSize: 23,
    marginBottom: 5,
  },
  commentList: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  commentContainer: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
  },
  commentUserContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  commentUser: {
    color: '#aaa',
    fontSize: 15,
    fontWeight: 'bold',
  },
  commentContent: {
    color: '#fff',
    fontSize: 19,
    marginBottom: 5,
  },
  timestamp: {
    color: '#bbb',
    fontSize: 12,
  },
  likeContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  likeButton: {
    backgroundColor: '#A64D79',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  liked: {
    backgroundColor: '#FF69B4',  // Different color for liked state
  },
  likeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  likeCount: {
    color: '#ccc',
    fontSize: 14,
    flex: 3,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 2,
    left: 4,
    right: 4,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#333',
    paddingHorizontal: 15,
    borderRadius: 20,
    borderColor: 'white',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: '#fff',
    backgroundColor: '#333',
    borderRadius: 10,
    fontSize: 16,
    marginRight: 10,
  },
  commentButton: {
    backgroundColor: '#A64D79',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  commentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CommentTab;

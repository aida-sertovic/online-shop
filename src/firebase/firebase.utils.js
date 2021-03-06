import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
        apiKey: "AIzaSyDE_xgwZA3YbOhBz32PaTSvQhYO1K4nBWw",
        authDomain: "online-shop-af18f.firebaseapp.com",
        projectId: "online-shop-af18f",
        storageBucket: "online-shop-af18f.appspot.com",
        messagingSenderId: "885367535599",
        appId: "1:885367535599:web:5e1146b7804dcb303ce81a",
        measurementId: "G-PLJ9P1CTM3"
      };
firebase.initializeApp(config);

      export const createUserProfileDocument = async (userAuth, additionalData) => {
        if (!userAuth) return;
      
        const userRef = firestore.doc(`users/${userAuth.uid}`);
      
        const snapShot = await userRef.get();
      
        if (!snapShot.exists) {
          const { displayName, email } = userAuth;
          const createdAt = new Date();
          try {
            await userRef.set({
              displayName,
              email,
              createdAt,
              ...additionalData
            });
          } catch (error) {
            console.log('error creating user', error.message);
          }
        }
      
        return userRef;
      };

      export const addCollectionAndDocuments = async (collectionKey, objectstoAdd) => {
        const collectionRef = firestore.collection(collectionKey);

        const batch = firestore.batch();
        objectstoAdd.forEach(obj => {
          const newDocRef = collectionRef.doc();
          batch.set(newDocRef, obj);
        });

       return await batch.commit(); 
      };

      export const convertCollectionsSnapshotToMap = (collections) => {
        const transformedCollection = collections.docs.map(doc => {
          const { title, items} = doc.data();
          return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
          };
        });
        
        return transformedCollection.reduce((accumulator, collection) => {
          accumulator[collection.title.toLowerCase()] = collection;
          return accumulator;
        }, {})
      }
      
      export const auth = firebase.auth();
      export const firestore = firebase.firestore();
      
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      export const signInWithGoogle = () => auth.signInWithPopup(provider);
      
      export default firebase;
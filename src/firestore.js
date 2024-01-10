import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { db } from './firebase';

const uid = localStorage.getItem('uid');
const docRef = doc(db, 'users', uid);
console.log('loading');

export function makingDataBase() {
  const userSlice = useSelector((store) => store.userSlice);
  console.log(userSlice);
  const { email, password, fvrtList, wishList } = userSlice;

  // creating document
  async function createDoc() {
    const docData = {
      email,
      password,
      fvrtList,
      wishList,
    };
    console.log('data waiting');
    await setDoc(docRef, docData);
    console.log('data stored');
  }

  // checking if the document with uid exit or not
  getDoc(docRef)
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        console.log('Document exists!');
        createDoc();
      } else {
        console.log('Document does not exist.');
        createDoc();
      }
    })
    .catch((error) => {
      console.error('Error checking document:', error);
    });
}

// modifying a favorite to the database
export async function modifyFvrtList() {
  console.log('updating value');
  try {
    await updateDoc(docRef, {
      fvrtList: arrayUnion('newFavorite1', 'newFavorite2'), // Insert values
    //   fvrtList: arrayRemove('newFavorite1', 'newFavorite2'), // Remove a value
    });
    console.log('fvrtList updated successfully!');
  } catch (error) {
    console.error('Error updating fvrtList:', error);
  }
}

// Add a wishlist to the database
export async function modifyWishList() {
  console.log('updating value');
  try {
    await updateDoc(docRef, {
      wishList: arrayUnion('newFavorite1', 'newFavorite2'), // Insert values
    //   WishList: arrayRemove('newFavorite1', 'newFavorite2'), // Remove a value
    });
    console.log('WishList updated successfully!');
  } catch (error) {
    console.error('Error updating fvrtList:', error);
  }
}

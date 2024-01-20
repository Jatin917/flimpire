/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { db } from './firebase';
import { setFvrtList } from './features/AuthSlice';

export function useMakingDatabase(email, password, wishList, fvrtList) {
  const uid = localStorage.getItem('uid');
  console.log('uid is', uid);
  console.log('makingDataBase');
  const docRef = doc(db, 'users', uid);
  // creating document
  async function createDoc() {
    console.log('createDoc');
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

  // checking if the document with uid exist or not
  console.log('docRef');
  getDoc(docRef)
    .then((docSnapshot) => {
      console.log(docSnapshot.exists());
      if (docSnapshot.exists()) {
        console.log(docSnapshot.data());
      } else {
        console.log('Document does not exist.');
        createDoc();
      }
    })
    .catch((error) => {
      console.error('Error checking document:', error);
    });
}

// // Add a wishlist to the database
// export async function modifyWishList() {
//   console.log('updating value');
//   try {
//     await updateDoc(docRef, {
//       wishList: arrayUnion('newFavorite1', 'newFavorite2'), // Insert values
//     //   WishList: arrayRemove('newFavorite1', 'newFavorite2'), // Remove a value
//     });
//     console.log('WishList updated successfully!');
//   } catch (error) {
//     console.error('Error updating fvrtList:', error);
//   }
// }

// making a funtion to check if the doc exist or not
export async function docChecker() {
  try {
    const uid = localStorage.getItem('uid');
    if (!uid) {
      console.log('No UID found in localStorage.');
      return false;
    }

    const docRef = doc(db, 'users', uid);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      console.log('Document data:', docSnapshot.data());
      return true;
    }
    console.log('Document does not exist.');
    return false;
  } catch (error) {
    console.error('Error checking document:', error);
    throw error; // or handle it as needed
  }
}

export async function fetchDocumentData(documentId) {
  const documentRef = doc(db, 'users', documentId);

  try {
    const documentSnapshot = await getDoc(documentRef);

    if (documentSnapshot.exists()) {
      return documentSnapshot.data(); // Return the document data
    }
    console.log('Document does not exist');
    return null; // Return null or an appropriate value
  } catch (error) {
    console.error('Error getting document:', error);
    throw error; // Rethrow the error for the caller to handle
  }
}

// modifying a favorite to the database
// eslint-disable-next-line no-unused-vars, consistent-return
export async function addToFvrtList(id) {
  const uid = localStorage.getItem('uid');
  const docRef = doc(db, 'users', uid);
  console.log('updating value');
  try {
    // id exist
    if (id) {
      await updateDoc(docRef, {
        fvrtList: arrayUnion(id), // Insert values
      });
      console.log('fvrtList updated successfully!');
    // eslint-disable-next-line brace-style
    }
  } catch (error) {
    console.error('Error updating fvrtList:', error);
  }
}

// removing from a list
// eslint-disable-next-line consistent-return
export async function removeFromFvrtList(id) {
  const uid = localStorage.getItem('uid');
  const docRef = doc(db, 'users', uid);
  console.log('updating value');
  try {
    // id exist
    if (id) {
      await updateDoc(docRef, {
        fvrtList: arrayRemove(id), // Insert values
      });
      console.log('fvrtList updated successfully!');
    // eslint-disable-next-line brace-style
    }
    // id is not given while calling function
    else {
      // return data
      // const data = docChecker(docRef);
      // return data;
    }
  } catch (error) {
    console.error('Error updating fvrtList:', error);
  }
}

// // eslint-disable-next-line no-unused-vars, consistent-return
// export async function addToWishList(id) {
//   const uid = localStorage.getItem('uid');
//   const docRef = doc(db, 'users', uid);
//   console.log('updating value');
//   try {
//     // id exist
//     if (id) {
//       await updateDoc(docRef, {
//         wishList: arrayUnion(id), // Insert values
//       });
//       console.log('wishList updated successfully!');
//     // eslint-disable-next-line brace-style
//     }
//   } catch (error) {
//     console.error('Error updating wishList:', error);
//   }
// }

// // removing from a list
// // eslint-disable-next-line consistent-return
// export async function removeFromWishList(id) {
//   const uid = localStorage.getItem('uid');
//   const docRef = doc(db, 'users', uid);
//   console.log('updating value');
//   try {
//     // id exist
//     if (id) {
//       await updateDoc(docRef, {
//         wishList: arrayRemove(id), // Insert values
//       });
//       console.log('wishList updated successfully!');
//     // eslint-disable-next-line brace-style
//     }
//     // id is not given while calling function
//     else {
//       // return data
//       // const data = docChecker(docRef);
//       // return data;
//     }
//   } catch (error) {
//     console.error('Error updating wishList:', error);
//   }
// }

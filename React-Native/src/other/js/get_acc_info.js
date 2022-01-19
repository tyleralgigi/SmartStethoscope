import { get, getDatabase, ref } from 'firebase/database';
import { auth } from './firebase';

export const get_acc_info = (user) => {
    const db = getDatabase();
    const reference = ref(db, 'users/' + user.uid);
      get(reference, ).then((snapshot) => {
        if (snapshot.exists()) {
          return({
            email: snapshot.val().email,
            first_name: snapshot.val().first_name,
            last_name: snapshot.val().last_name,
            acc_type: snapshot.val().acc_type,
          });
        } else {
          console.log("No data available");
          signOut(auth);
        }
      }).catch((error) => {
        console.error(error);
      });
}
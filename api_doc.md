**get_acc_info**
----
  <_retrieves the givens users metadata (firstname, lastname, email...). Returns an OBJECT_>

* **Method:**

   `GET`

*  **URL Params**

   **Required:**
 
   `user=[Firebase auth user]`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{email: johnsmith@email.com, first_name: Smith, last_name: John, acc_type: [Patient, HCP]}`
 
* **Error Response:**

  * **Code:** Firebase Error <br />
    **Content:** Check for more info https://firebase.google.com/docs/reference/admin/error-handling

* **Sample Call:**

  ```ReactNative
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
  ```

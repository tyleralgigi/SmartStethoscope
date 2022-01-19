*Backend Documentation*

**Database Structure**
----
<_Each user is stored By UID_>
  ```json
    {"UID":{
        "name":"String",
        "acc_type":"String",
        "email":"String",
        //If acc_type is Patient
        "recording":["String"],
        //If acc_type is HCP
        "Patients":["UID"]
      }
    }
  ```
* **UID**
  <_This is the user id automatically gernerated by Firebase when a user creates an account_>
  
* **Acc Types**
  `Patient` | `HCP` _Heath Care Provider_

* **Recordings**
  <_This is an array of S3 bucket urls to each of the users audio recordings `firstname_lastname_bodyPart_#.mp3`_>


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

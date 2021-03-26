// ########## COLLEGE START ###########

const dbCollegeManager = (() => {
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  //firebase.analytics();

  var db = firebase.firestore();

  const getUniqueKey = () => {
    var dt = new Date();
    return dt.getUTCMilliseconds();
  };

  // Get College collection
  const getColleges = (collegeObj) => {
    db.collection("colleges")
      //.where("name", "==", "abc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          return doc.data();
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  // Add College collection
  const addNewCollege = (collegeObj) => {
    console.log(collegeObj);
  };

  // Add College collection
  const updateCollege = (collegeObj) => {
    console.log(collegeObj);
  };

  // Add College collection
  const removeCollege = (uniqueKey) => {
    console.log(uniqueKey);
  };

  return {
    getUniqueKey,
    getColleges,
    addNewCollege,
    updateCollege,
    removeCollege,
  };
})();

// ########## COLLEGE END ##########

// ########## APPLICATION START ###########

const dbFileManager = (() => {
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }

  const storageService = firebase.storage();
  const storageRef = storageService.ref();

  const getUniqueKey = () => {
    var dt = new Date();
    return dt.getUTCMilliseconds();
  };

  // Get College collection
  const uploadFileTask = (folder, selectedFile) => {
    var dt = new Date();
    const uploadTask = storageRef
      .child(
        `${folder}/${
          dt.getFullYear() +
          "_" +
          dt.getMonth() +
          "_" +
          dt.getDate() +
          "_" +
          dt.getHours() +
          "_" +
          dt.getMinutes() +
          "_" +
          dt.getMilliseconds()
        }_${selectedFile.name}`
      )
      .put(selectedFile);
    return uploadTask;
  };

  return {
    uploadFileTask,
  };
})();

// ########## APPLICATION END ##########

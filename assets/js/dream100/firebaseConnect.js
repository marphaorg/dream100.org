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
  const getCollege = (id) => {
    var dbTask = db.collection("colleges").doc(id).get();
    return dbTask;
  };

  // Get College collection
  const getColleges = () => {
    var dbTask = db
      .collection("colleges")
      //.where("name", "==", "abc")
      .get();
    return dbTask;
  };

  // Add College collection
  const addNewCollege = (collegeObj) => {
    // Add a new document in collection "cities"
    var dbTask = db.collection("colleges").add({
      name_en: collegeObj.name_en,
      name_np: collegeObj.name_np,
      address_en: collegeObj.address_en,
      address_np: collegeObj.address_np,
      rm_en: collegeObj.rm_en,
      rm_np: collegeObj.rm_np,
      desc_en: collegeObj.desc_en,
      desc_np: collegeObj.desc_np,
      subjects: collegeObj.subjects,
    });
    return dbTask;
  };

  // Add College collection
  const updateCollege = (id, collegeObj) => {
    var collegeRef = db.collection("cities").doc(id);
    // Set the "capital" field of the city 'DC'
    return collegeRef.update({
      name_en: collegeObj.name_en,
      name_np: collegeObj.name_np,
      address_en: collegeObj.address_en,
      address_np: collegeObj.address_np,
      rm_en: collegeObj.rm_en,
      rm_np: collegeObj.rm_np,
      desc_en: collegeObj.desc_en,
      desc_np: collegeObj.desc_np,
      subjects: collegeObj.subjects,
    });
  };

  // Add College collection
  const removeCollege = (uniqueKey) => {
    console.log(uniqueKey);
  };

  return {
    getUniqueKey,
    getCollege,
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

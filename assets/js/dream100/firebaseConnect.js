// ########## COLLEGE START ###########

const dbCollegeManager = (() => {
  //firebase.analytics();

  var db = firebase.firestore();

  const getUniqueKey = () => {
    var dt = new Date();
    return dt.getUTCMilliseconds();
  };

  // Get College collection
  const getCollege = (code) => {
    var dbTask = db.collection("colleges").where("code", "==", code).get();
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
    // Add a new document in collection "college"
    var dbTask = db.collection("colleges").add({
      code: collegeObj.code,
      name_en: collegeObj.name_en,
      name_np: collegeObj.name_np,
      address_en: collegeObj.address_en,
      address_np: collegeObj.address_np,
      municipality: collegeObj.municipality,
      phone: collegeObj.phone,
      email: collegeObj.email,
      website: collegeObj.website,
      desc_en: collegeObj.desc_en,
      desc_np: collegeObj.desc_np,
      plus_two: collegeObj.plus_two,
      bachelors: collegeObj.bachelors,
      masters: collegeObj.masters,
      diploma: collegeObj.diploma,
      updated_date: collegeObj.updated_date,
    });
    return dbTask;
  };

  // Add College collection
  const updateCollege = (id, collegeObj) => {
    var collegeRef = db.collection("colleges").doc(id);
    return collegeRef.update({
      name_en: collegeObj.name_en,
      name_np: collegeObj.name_np,
      address_en: collegeObj.address_en,
      address_np: collegeObj.address_np,
      municipality: collegeObj.municipality,
      phone: collegeObj.phone,
      email: collegeObj.email,
      website: collegeObj.website,
      desc_en: collegeObj.desc_en,
      desc_np: collegeObj.desc_np,
      plus_two: collegeObj.plus_two,
      bachelors: collegeObj.bachelors,
      masters: collegeObj.masters,
      diploma: collegeObj.diploma,
      updated_date: collegeObj.updated_date,
    });
  };

  // Remove College from collection
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

// ########## COLLEGE START ###########

const dbCollegeManager = (() => {
  //firebase.analytics();

  var db = firebase.firestore();

  // Get College collection
  const getCollege = (code) => {
    var dbTask = db.collection("colleges").where("code", "==", code).get();
    return dbTask;
  };

  // Get College collection
  const getColleges = () => {
    var dbTask = db.collection("colleges").orderBy("name_en").get();
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
  var db = firebase.firestore();

  const storageService = firebase.storage();
  const storageRef = storageService.ref();

  // Get Upload stats
  const getApplicationStats = (folder) => {
    var task = db.collection(folder);
    return task;
  };

  // Get College collection
  const uploadFileTask = (folder, selectedFile) => {
    var dt = new Date();
    var fullFileName = `${folder}/${
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
    }_${selectedFile.name}`;
    const uploadTask = storageRef.child(fullFileName).put(selectedFile);

    //track upload in collection
    var dbTask = db.collection(folder).add({
      application_id: "not-assigned",
      filename: fullFileName,
      application_date: dt,
      reviewed: false,
      reviewed_date: "",
      verified: false,
      verified_date: "",
      approved: false,
      group: "",
      approved_date: "",
      got_admitted: false,
      admitted_date: "",
      note: "",
      updated_date: dt,
    });

    return uploadTask;
  };

  return {
    getApplicationStats,
    uploadFileTask,
  };
})();

// ########## APPLICATION END ##########

// ########## LOOK UP START ###########

const dbLookUpManager = (() => {
  //firebase.analytics();

  var db = firebase.firestore();

  // Get Look Up collection item
  const getLookUp = (collection, code) => {
    var items = getLookUps(collection);
    items.forEach(function (item, index) {
      //console.log("[" + index + "]: " + item.code);
      if (JSON.stringify(item.code) === JSON.stringify(code)) {
        console.log(item);
        return item;
      }
    });
    return null;
  };

  // Get Look Up collection
  const getLookUps = (collection) => {
    var items = [];

    // Retrieve the object from storage
    var retrievedObject = localStorage.getItem(collection);
    if (retrievedObject) {
      items = JSON.parse(retrievedObject || "[]");
    } else {
      db.collection(collection)
        .orderBy("code")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var d = doc.data();
            d["docId"] = d.id;
            items.push(d);
          });

          // Put the object into storage
          localStorage.setItem(collection, JSON.stringify(items));
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
    return items;
  };

  // Add College collection
  const addNewItem = (collection, item) => {
    // Add a new document in collection "college"
    var dbTask = db.collection(collection).add({
      code: item.code,
      name_en: item.name_en,
      name_np: item.name_np,
      updated_date: item.updated_date,
    });
    //clear local storage for lookup
    localStorage.removeItem(collection);
    return dbTask;
  };

  // Add College collection
  const updateItem = (collection, docId, item) => {
    var itemRef = db.collection(collection).doc(docId);

    //clear local storage for lookup
    localStorage.removeItem(collection);

    return itemRef.update({
      name_en: item.name_en,
      name_np: item.name_np,
      updated_date: item.updated_date,
    });
  };

  // Remove item from collection
  const removeItem = (collection, docId) => {
    //clear local storage for lookup
    localStorage.removeItem(collection);

    return db.collection(collection).doc(docId).delete();
  };

  return {
    getLookUp,
    getLookUps,
    addNewItem,
    updateItem,
    removeItem,
  };
})();

// ########## LOOK UP END ##########

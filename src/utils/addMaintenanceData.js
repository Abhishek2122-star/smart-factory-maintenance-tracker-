// src/utils/addMaintenanceData.js
import { db, storage } from "../Firebase/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const addMaintenanceRecord = async (data, imageFile) => {
  try {
    let imageUrl = "";

    // Upload image if provided
    if (imageFile) {
      const imageRef = ref(storage, `maintenance_images/${Date.now()}_${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    // Store record in Firestore
    await addDoc(collection(db, "maintenanceRecords"), {
      equipment: data.equipment,
      description: data.description,
      status: data.status,
      date: Timestamp.now(),
      imageUrl: imageUrl,
    });

    return { success: true, message: "Maintenance record added successfully!" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

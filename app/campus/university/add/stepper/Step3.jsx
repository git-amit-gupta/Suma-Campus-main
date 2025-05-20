import ReExt from "@sencha/reext";
import React, { useEffect, useRef, useState } from "react";
import { ToastGreen, ToastRed } from "../../../../common/Toast";
import { useRouter, useSearchParams } from "next/navigation";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "@/firebase/firebaseConfig";
import { useMediaQuery } from "@/app/common/hook";

function Step3({ handleBack, setValue, value, stepValues }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  let editId = searchParams.get("edit");
  const [imageFiles, setImageFiles] = useState([]);
  const isMobile = useMediaQuery("(max-width: 599px)");

  const imageFilesRef = useRef(imageFiles);

  useEffect(() => {
    if (value?.length > 0) {
      setImageFiles(value);
    }
  }, [value]);

  // Apply 'multiple' attribute after rendering the file input
  useEffect(() => {
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.setAttribute("multiple", "multiple"); // Enable multiple file selection
      fileInput.setAttribute("accept", "image/*"); // Accept only image files
    }
  }, []);

  useEffect(() => {
    imageFilesRef.current = imageFiles;
  }, [imageFiles]);

  // Delete image by ID
  const handleDeleteImage = (id) => {
    setImageFiles((prevFiles) => prevFiles.filter((img) => img.id !== id));
  };

  async function handleNextStep(formValue) {
    let gallery = formValue;

    let newObj = {
      ...stepValues?.step1Value,
      status: stepValues?.step1Value?.status,
      logo: stepValues?.step1Value?.logo || "",
      courses: stepValues?.step2Value,
      gallery: formValue,
    };

    try {
      if (gallery.length > 0) {
        if (editId) {
          const docRef = doc(db, "university", editId);
          await updateDoc(docRef, newObj);
        } else {
          await addDoc(collection(db, "university"), newObj);
        }

        ToastGreen("Successfully submitted 🥳🥳");
        router.push("/campus/university");
      } else {
        ToastRed("Upload Failed", "Please select one file");
      }
    } catch (error) {
      ToastRed(
        "Upload Failed",
        "Error sending files to DB, Upload File with size less than 10 kb"
      );
    } finally {
      setImageFiles([]); // Clear uploaded images
    }
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div
      className={`flex-1 flex  ${
        isMobile ? "w-full mt-5 mb-5" : "w-80 mt-10 mb-10"
      }`}
    >
      <ReExt
        xtype="form"
        config={{
          // title: "My Form",
          width: "100%",
          height: 400,
          bodyPadding: 16,
          dockedItems: {
            dock: "bottom",
            xtype: "toolbar",
            items: [
              {
                text: "Cancel",
                iconCls: "x-fa fa-times",
                handler: () => router.push("/campus/university"),
              },
              "->",
              {
                text: "Back",
                iconCls: "x-fa fa-chevron-circle-left",
                handler: handleBack,
              },
              {
                text: "Submit",
                iconCls: "x-fa fa-check-circle",

                handler: function () {
                  handleNextStep(imageFilesRef.current);
                },
              },
            ],
          },
        }}
      >
        {/* Upload Button */}
        <ReExt
          xtype="filefield"
          config={{
            fieldLabel: "Upload Images",
            buttonText: "Select Images",
            name: "gallery",
            listeners: {
              change: (fileField, value) => {
                const input = fileField.fileInputEl.dom;

                if (input.files.length > 0) {
                  const filesArray = Array.from(input.files);

                  // Convert files to base64
                  Promise.all(filesArray.map((file) => convertToBase64(file)))
                    .then((base64Images) => {
                      const newFiles = base64Images.map((base64, index) => ({
                        id: Date.now() + Math.random(),
                        base64, // ✅ Store Base64 instead of Object URL
                      }));

                      setImageFiles((prevFiles) => [...prevFiles, ...newFiles]);
                      // console.log("Selected Base64 Images:", newFiles); // Debugging output
                    })
                    .catch((error) => {
                      console.error("Error converting files to base64:", error);
                    });
                } else {
                  console.log("No files selected.");
                }
              },
            },
          }}
        />

        {/* Image Preview with Delete Icon */}
        <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap" }}>
          {imageFiles.length > 0 &&
            imageFiles?.map((img, index) => (
              <div
                key={img?.id}
                style={{
                  position: "relative",
                  margin: "5px",
                  width: "120px",
                  height: "120px",
                }}
              >
                {/* Close (Delete) Icon */}
                <span
                  onClick={() => handleDeleteImage(img?.id)}
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    backgroundColor: "#ff4d4f",
                    color: "#fff",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 0 5px rgba(0,0,0,0.3)",
                    fontWeight: "bold",
                  }}
                >
                  ×
                </span>

                {/* Image Thumbnail */}
                <img
                  src={img?.base64 || img.url}
                  alt="Uploaded Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
            ))}
        </div>
      </ReExt>
    </div>
  );
}

export default Step3;

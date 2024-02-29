import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import ImageUploader from "../../components/Input/ImageUploader";
import { createHostCenter } from "../../app/reducers/app";

const INITIAL_HOSTCENTER_OBJ = {
  images: [], // Use an array for multiple images
  title: "",
  desc: "",
  link: "",
};

const hostcenter_images = [
  // Array of objects containing details for initial images (optional)
  { id: 0, title: "Image", image: "", isDefault: true }, // Optional flag for default image
  { id: 1, title: "Logo", logo: "", isDefault: true },
];

function AddHostCenterModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hostcenterObj, sethostcenterObj] = useState(INITIAL_HOSTCENTER_OBJ);

  // Function to validate image format and size
  const validateImage = (file) => {
    const allowedExtensions = ["jpeg", "jpg", "png"];
    const maxSize = 1024 * 1024; // 1 MB
    const extension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      setErrorMessage(
        "Invalid image format. Please upload a JPEG, JPG, or PNG file."
      );
      return false;
    }
    if (file.size > maxSize) {
      setErrorMessage("Image size exceeds the maximum limit of 1 MB.");
      return false;
    }
    return true;
  };

  const handleImageUpload = (imageObj) => {
    if (!validateImage(imageObj.file)) {
      return; // Early return if validation fails
    }
    sethostcenterObj({
      ...hostcenterObj,
      images: [...hostcenterObj.images, imageObj.data],
    });
  };

  // Function to update other form values
  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    sethostcenterObj({ ...hostcenterObj, [updateType]: value });
  };

  const handleCreateHostCenter = async () => {
    try {
      if (
        hostcenterObj.title &&
        hostcenterObj.desc &&
        hostcenterObj.link 
      ) {
        setLoading(true);
        const newHostCenterObj = {
          ...hostcenterObj,

          image: hostcenterObj.images[0]?.data,
          logo: hostcenterObj.images[1]?.data,
        };
        console.log(newHostCenterObj)
        await dispatch(createHostCenter(newHostCenterObj)).then((res) => {
          if (res.meta.requestStatus === "rejected") {
            dispatch(
              showNotification({
                message: res.payload,
                status: 1,
              })
            );
            setLoading(false);
            return;
          } else {
            dispatch(
              showNotification({
                message: res.payload.message,
                status: 1,
              })
            );
            setLoading(false);
            return;
          }
        });
      } else {
        setErrorMessage("All fields and at least one image are required!");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={hostcenterObj.title}
        updateType="title"
        containerStyle="mt-4"
        labelTitle="Title"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={hostcenterObj.link}
        updateType="link"
        containerStyle="mt-4"
        labelTitle="Link"
        updateFormValue={updateFormValue}
      />{" "}
      {hostcenter_images.map((HCI) => (
        <ImageUploader
          key={HCI.id} // Provide a unique key for each component instance
          labelTitle={`${HCI.title}`}
          containerStyle="my-custom-style" // Optional style customization
          defaultValue={HCI.image} // Provide initial image value if available
          updateFormValue={handleImageUpload}
          updateType={hostcenter_images} // Update type specific to each testimony
        />
      ))}
      {/* <ImageUploader
        labelTitle="Upload an image"
        containerStyle="my-4"
        defaultValue={hostcenterObj.image}
        updateFormValue={handleImageUpload}
        updateType="image"
      />
      <ImageUploader
        labelTitle="Upload an image"
        containerStyle="my-4"
        defaultValue={hostcenterObj.logo}
        updateFormValue={handleImageUpload}
        updateType="image"
      /> */}
      <TextAreaInput
        labelTitle="Enter host discription"
        labelStyle="text-lg"
        type="text"
        containerStyle="my-4"
        defaultValue={hostcenterObj.desc}
        placeholder="Type description here"
        updateFormValue={updateFormValue}
        updateType="message"
      />
      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={() => handleCreateHostCenter()}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AddHostCenterModalBody;

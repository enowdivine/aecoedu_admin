import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import { addNewRoom } from "./roomSlice";
import ImageUploader from "../../components/Input/ImageUploader";
import MultiSelect from "../../components/Input/MultiSelect";

const INITIAL_ROOM_OBJ = {
  name: "",
  amount: "",
  size: "",
  capacity: "",
  bed: "",
  service: "",
};

function AddRoomModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [roomObj, setroomObj] = useState(INITIAL_ROOM_OBJ);

  const saveNewRoom = () => {
    if (roomObj.name.trim() === "") return setErrorMessage("Name is required!");
    else if (roomObj.amount.trim() === "")
      return setErrorMessage("Amount id is required!");
    else if (roomObj.size.trim() === "")
      return setErrorMessage("Size id is required!");
    else if (roomObj.capacity.trim() === "")
      return setErrorMessage("Capacity id is required!");
    else {
      let newroomObj = {
        id: 7,
        amount: roomObj.amount,
        name: roomObj.name,
        size: roomObj.size,
        capacity: roomObj.capacity,
        bed: roomObj.bed,
        service: roomObj.service,
      };
      dispatch(addNewRoom({ newroomObj }));
      dispatch(showNotification({ message: "New room Added!", status: 1 }));
      closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setroomObj({ ...roomObj, [updateType]: value });
  };

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (newOptions) => {
    setSelectedOptions(newOptions);
  };
    const handleImageUpload = (value) => {
      console.log(value);
      // handle the uploaded image here
    };

  return (
    <>
      <InputText
        type="text"
        defaultValue={roomObj.name}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="Name"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={roomObj.amount}
        updateType="amount"
        containerStyle="mt-4"
        labelTitle="Amount"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={roomObj.size}
        updateType="size"
        containerStyle="mt-4"
        labelTitle="Size"
        updateFormValue={updateFormValue}
      />
      {/* <SelectBox
        labelTitle="Select options"
        defaultValue={selectedOptions}
        options={options}
        containerStyle="my-4 w-full"
        placeholder="Select options"
        labelStyle="text-lg"
        updateType="options"
        updateFormValue={handleSelectChange}
      /> */}
      <MultiSelect
        labelTitle="Select Options"
        options={[
          { label: "television", value: "TV" },
          { label: "miniFridge", value: "mini Fridge" },
          { label: "Radio", value: "Radio" },
          { label: "Heater", value: "heater" },
        ]}
        selectedOptions={["option1", "option3"]}
        updateFormValue={updateFormValue}
      />

      <InputText
        type="number"
        defaultValue={roomObj.capacity}
        updateType="capacity"
        containerStyle="mt-4 w-25"
        labelTitle="Capacity"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="number"
        defaultValue={roomObj.bed}
        updateType="bed"
        containerStyle="mt-4 w-25"
        labelTitle="Number Of Bed"
        updateFormValue={updateFormValue}
      />
      <ImageUploader
        labelTitle="Upload an image"
        containerStyle="my-4"
        defaultValue=""
        updateFormValue={handleImageUpload}
        updateType="image"
      />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button className="btn btn-primary px-6" onClick={() => saveNewRoom()}>
          Save
        </button>
      </div>
    </>
  );
}

export default AddRoomModalBody;

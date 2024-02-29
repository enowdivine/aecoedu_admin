import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import { createEvent, getSingleEvent } from "../../app/reducers/app";

const INITIAL_EVENT_OBJ = {
  title: "",
  category: "",
  date: "",
  link: "",
  eventTime: "",
  location: "",
  details: "",
};

function AddEventModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [eventObj, setEventObj] = useState(INITIAL_EVENT_OBJ);

  const handleCreateEvent = async () => {
    try {
      if (
        eventObj.title &&
        eventObj.location &&
        eventObj.link &&
        eventObj.eventTime &&
        eventObj.details &&
        eventObj.category &&
        eventObj.date
      ) {
        setLoading(true);
        const newEventObj = {
          title: eventObj.title,
          category: eventObj.category,
          date: eventObj.date,
          link: eventObj.link,
          eventTime: eventObj.eventTime,
          location: eventObj.location,
          details: eventObj.details,
        };
        await dispatch(createEvent(newEventObj)).then((res) => {
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
        dispatch(
          showNotification({ message: "All field are required!", status: 1 })
        );
        return;
      }
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setEventObj({ ...eventObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={eventObj.title}
        updateType="title"
        containerStyle="mt-4"
        labelTitle="Title"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={eventObj.location}
        updateType="location"
        containerStyle="mt-4"
        labelTitle="Location"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={eventObj.category}
        updateType="category"
        containerStyle="mt-4"
        labelTitle="Category"
        updateFormValue={updateFormValue}
      />
     
      <InputText
        type="date"
        defaultValue={eventObj.date}
        updateType="date"
        containerStyle="mt-4"
        labelTitle="Date"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={eventObj.link}
        updateType="link"
        containerStyle="mt-4"
        labelTitle="Link"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={eventObj.eventTime}
        updateType="eventTime"
        containerStyle="mt-4"
        labelTitle="Event Time"
        updateFormValue={updateFormValue}
      />

      <TextAreaInput
        labelTitle="Event Details"
        labelStyle="text-lg"
        type="text"
        containerStyle="my-4"
        defaultValue={eventObj.details}
        placeholder="Type your detail here"
        updateFormValue={updateFormValue}
        updateType="details"
      />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={() => handleCreateEvent()}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AddEventModalBody;


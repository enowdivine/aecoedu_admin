import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import ToogleInput from "../../components/Input/ToogleInput";
import TitleCard from "../../components/Cards/TitleCard";
import { showNotification } from "../common/headerSlice";
import { getSingleEvent, updateEvent } from "../../app/reducers/app";
import { useParams } from "react-router-dom";

const INITIAL_EVENT_OBJ = {
  title: "",
  category: "",
  date: "",
  link: "",
  eventTime: "",
  location: "",
  details: "",
};

function ShowEventModalBody() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [eventObj, setEventObj] = useState(INITIAL_EVENT_OBJ);
  const { id } = useParams();
  console.log(id);
  console.log(eventObj);

  const handleGetSingleEvent = async (id) => {
    try {
      await dispatch(getSingleEvent(id)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          dispatch(
            showNotification({
              message: res.payload,
              status: 1,
            })
          );
          setLoading(false);
          return;
        }
        setEventObj(res.payload);
        return;
      });
    } catch (error) {
      console.error(error);
      return;
    }
  };

  useEffect(() => {
    handleGetSingleEvent(id);
  }, []);

  // Call API to update profile settings changes

 const handleUpdate = async () => {
   setLoading(true);
   
   const updatedEventObj = {
     id: id,
     title: eventObj.title,
     category: eventObj.category,
     date: eventObj.date,
     link: eventObj.link,
     eventTime: eventObj.eventTime,
     location: eventObj.location,
     details: eventObj.details,
   };

   try {
     const res = await dispatch(updateEvent(updatedEventObj));
     if (res.meta.requestStatus === "rejected") {
       dispatchNotification(res.payload, 1);
     } else {
       dispatchNotification(res.payload.message, 1);
     }
   } catch (error) {
     console.error(error);
   } finally {
     setLoading(false);
   }
 };

 const dispatchNotification = (message, status) => {
   dispatch(showNotification({ message, status }));
 };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setEventObj({ ...eventObj, [updateType]: value });
  };

  return (
    <>
      <div className="sm:mx-32">
        <TitleCard title="Profile Settings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <InputText
              labelTitle="Title"
              defaultValue={eventObj.title}
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="Category"
              defaultValue={eventObj.category}
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="Location"
              defaultValue={eventObj.location}
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="Event Time"
              defaultValue={eventObj.eventTime}
              updateFormValue={updateFormValue}
            />
            <InputText
              type="date"
              labelTitle="Date"
              defaultValue={eventObj.date}
              updateFormValue={updateFormValue}
            />
            <InputText
              type="url"
              labelTitle="Link"
              defaultValue={eventObj.link}
              updateFormValue={updateFormValue}
            />
            <TextAreaInput
              labelTitle="Details"
              defaultValue={eventObj.details}
              updateFormValue={updateFormValue}
            />
          </div>
          <div className="divider"></div>
          <div className="mt-16">
            <button
              className="btn btn-primary float-right"
              onClick={() => handleUpdate()}
            >
              Update
            </button>
          </div>
        </TitleCard>
      </div>
    </>
  );
}

export default ShowEventModalBody;

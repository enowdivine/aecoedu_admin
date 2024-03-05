import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import ToogleInput from "../../components/Input/ToogleInput";
import TitleCard from "../../components/Cards/TitleCard";
import { showNotification } from "../common/headerSlice";
import { getSingleTestimony } from "../../app/reducers/app";
import { useParams } from "react-router-dom";
import ImageUploader from "../../components/Input/ImageUploader";

const INITIAL_TESTIMONY_OBJ = {
  image: "",
  title: "",
  desc: "",
  school: "",
  rating: "",
};

function ShowTestimony() {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [TestimonyObj, setTestimonyObj] = useState(INITIAL_TESTIMONY_OBJ);
  const [testimonies, setTestimonies] = useState([]);

  console.log(testimonies);

  const handleGetTestimony = async () => {
    try {
      await dispatch(getSingleTestimony()).then((res) => {
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
        setTestimonies(res.payload);
        return;
      });
    } catch (error) {
      console.error(error);
      return;
    }
  };

  useEffect(() => {
    handleGetTestimony();
  }, []);

  // Call API to update profile settings changes

  const handleUpdate = async () => {
    try {
      if (
        // eventObj.category &&
        TestimonyObj.image &&
        TestimonyObj.title &&
        TestimonyObj.desc &&
        TestimonyObj.school &&
        TestimonyObj.rating
      ) {
        setLoading(true);
        const newTestimonyObj = {
          image: TestimonyObj.image,
          title: TestimonyObj.title,
          desc: TestimonyObj.desc,
          school: TestimonyObj.school,
          rating: TestimonyObj.rating,
        };
        await dispatch(createTestimony(newTestimonyObj)).then((res) => {
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
    setTestimonyObj({ ...TestimonyObj, [updateType]: value });
  };

  return (
    <>
      <div className="sm:mx-32">
        <TitleCard title="Profile Settings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <InputText
              type="text"
              defaultValue={TestimonyObj.title}
              updateType="title"
              containerStyle="mt-4"
              labelTitle="Title"
              updateFormValue={updateFormValue}
            />
            <InputText
              type="text"
              defaultValue={TestimonyObj.school}
              updateType="shool"
              containerStyle="mt-4"
              labelTitle="School"
              updateFormValue={updateFormValue}
            />
            <InputText
              type="number"
              defaultValue={TestimonyObj.rating}
              updateType="rating"
              containerStyle="mt-4"
              labelTitle="Rating"
              updateFormValue={updateFormValue}
            />
            <ImageUploader
              labelTitle="Upload an image"
              containerStyle="my-4"
              defaultValue={TestimonyObj.image}
              updateFormValue={handleImageUpload}
              updateType="image"
            />
            <TextAreaInput
              labelTitle="Enter your Testimony"
              labelStyle="text-lg"
              type="text"
              containerStyle="my-4"
              defaultValue={TestimonyObj.desc}
              placeholder="Type your testimony here"
              updateFormValue={updateFormValue}
              updateType="description"
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

export default ShowTestimony;

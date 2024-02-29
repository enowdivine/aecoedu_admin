import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import ToogleInput from "../../components/Input/ToogleInput";
import TitleCard from "../../components/Cards/TitleCard";
import { showNotification } from "../common/headerSlice";
import { getSingleNews } from "../../app/reducers/app";
import { useParams } from "react-router-dom";
import ImageUploader from "../../components/Input/ImageUploader";

const INITIAL_NEWS_OBJ = {
  image: "",
  title: "",
  desc: "",
  link: "",
};

function ShowNews() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newsObj, setnewsObj] = useState(INITIAL_NEWS_OBJ);

  const handleGetNews = async () => {
    try {
      await dispatch(getSingleNews()).then((res) => {
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
        setnewsObj(res.payload);
        return;
      });
    } catch (error) {
      console.error(error);
      return;
    }
  };

  useEffect(() => {
    handleGetNews();
  }, []);

  // Call API to update profile settings changes

  const handleUpdate = async () => {
    try {
      if (
        // eventObj.category &&
        newsObj.image &&
        newsObj.title &&
        newsObj.link &&
        newsObj.desc
      ) {
        setLoading(true);
        const newNewsObj = {
          image: newsObj.image,
          title: newsObj.title,
          desc: newsObj.desc,
          link: newsObj.link,
        };
        await dispatch(createNews(newNewsObj)).then((res) => {
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
                status: 2,
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
    setnewsObj({ ...newsObj, [updateType]: value });
  };

  return (
    <>
      <div className="sm:mx-32">
        <TitleCard title="Profile Settings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <InputText
              labelTitle="Title"
              defaultValue={hostcenterObj.title}
              updateFormValue={updateFormValue}
            />
            <ImageUploader
              labelTitle="image"
              updateFormValue={updateFormValue}
              defaultValue={hostcenterObj.image}
            />
            <InputText
              type="url"
              labelTitle="Link"
              defaultValue={hostcenterObj.link}
              updateFormValue={updateFormValue}
            />
            <TextAreaInput
              labelTitle="Details"
              defaultValue={hostcenterObj.desc}
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

export default ShowNews;

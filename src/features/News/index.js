import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import { showNotification } from "../common/headerSlice";
import SearchBar from "../../components/Input/SearchBar";
import { getNews } from "../../app/reducers/app";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewsModal = () => {
    dispatch(
      openModal({
        title: "Add New News",
        bodyType: MODAL_BODY_TYPES.ADD_NEW_NEWS,
      })
    );
  };

  return (
    <div className="">
      <SearchBar />

      <button
        className="btn mx-3 px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewsModal()}
      >
        Add New
      </button>
    </div>
  );
};

function News() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);

  console.log(news);

  const handleGetNews = async () => {
    try {
      await dispatch(getNews()).then((res) => {
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
        setNews(res.payload);
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

  const deleteCurrentNews = (id) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this News?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.EVENT_NEWS,
          id,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Current News"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* room List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Description</th>
                <th>link</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {news.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No records found
                  </td>
                </tr>
              ) : (
                news?.map((news) => (
                  <tr key={news._id}>
                    <td>
                      <div>
                        <img src={news.image} alt="mews image" />
                      </div>
                    </td>
                    <td>
                      <div className="font-bold">{news.title}</div>
                    </td>
                    <td>{news.desc}</td>
                    <td>{news.link}</td>
                    <td>
                      <Link
                        to={`/news/show/${news._id}`}
                        className="btn btn-square btn-ghost"
                      >
                        <EyeIcon className="w-5" />
                      </Link>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentNews(news._id)}
                      >
                        <TrashIcon className="w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default News;

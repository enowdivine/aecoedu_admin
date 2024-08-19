import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import { showNotification } from "../common/headerSlice";
// import SearchBar from "../../components/Input/SearchBar";
import { getNews } from "../../app/reducers/app";
import { FilterFunnction } from "../../components/TableFilter/FilterFunction";

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
      {/* <SearchBar /> */}
      <input
        type="text"
        className="input input-bordered w-50 mt-2"
        placeholder="Search text"
        onKeyUp={(e) => FilterFunnction(0, e.target)}
      />

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

  const deleteCurrentNews = (item) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete ${item.title}?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.NEWS_DELETE,
          item,
        },
      })
    );
  };

  const updateCurrentItem = (item) => {
    dispatch(
      openModal({
        title: "Update News",
        bodyType: MODAL_BODY_TYPES.UPDATE_NEWS,
        extraObject: {
          item,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="News"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* room List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full" id="dataTable">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
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
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-circle w-12 h-12">
                            <img
                              src={`${process.env.REACT_APP_BASE_URL}${news.image}`}
                              alt={news.title}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-bold">{news.title}</div>
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => updateCurrentItem(news)}
                      >
                        <PencilSquareIcon className="w-5" />
                      </button>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentNews(news)}
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

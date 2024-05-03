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
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
// import { showNotification } from "../common/headerSlice";
import { getArticles } from "../../app/reducers/app";
import { FilterFunnction } from "../../components/TableFilter/FilterFunction";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewsModal = () => {
    dispatch(
      openModal({
        title: "Add New Article",
        bodyType: MODAL_BODY_TYPES.ADD_NEW_ARTICLE,
      })
    );
  };

  return (
    <div className="">
      {/* <SearchBar /> */}
      <input type="text" className="input input-bordered w-50 mt-2" placeholder="Search text"
        onKeyUp={(e) => FilterFunnction(0, e.target)} />

      <button
        className="btn mx-3 px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewsModal()}
      >
        Add New
      </button>
    </div>
  );
};

function Articles() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);

  const handleGetData = async () => {
    try {
      await dispatch(getArticles()).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          setLoading(false);
          return;
        }
        setArticles(res.payload);
        return;
      });
    } catch (error) {
      console.error(error);
      return;
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  const deleteCurrentItem = (item) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete ${item.title}?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.ARTICLE_DELETE,
          item,
        },
      })
    );
  };

  const updateCurrentItem = (item) => {
    dispatch(
      openModal({
        title: "Update Article",
        bodyType: MODAL_BODY_TYPES.UPDATE_ARTICLE,
        extraObject: {
          item,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Articles"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* room List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full" id="dataTable">
            <thead>
              <tr>
                <th>Title & Image</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {articles.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No records found
                  </td>
                </tr>
              ) : (
                articles?.map((article) => (
                  <tr key={article._id}>
                    <td>
                      <div className="flex items-center space-x-3 w-[400px] mr-[-200px] ">
                        <div className="avatar">
                          <div className="mask mask-circle w-12 h-12">
                            <img
                              src={`${process.env.REACT_APP_BASE_URL}/uploads/gallery/${article?.image[0]}`}
                              alt="Image"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{article.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="">{article.category}</td>
                    <td>
                      <a
                        className="btn btn-square btn-ghost"
                        href={`/app/articles/${article._id}`}
                      >
                        <EyeIcon className="w-5" />
                      </a>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => updateCurrentItem(article)}
                      >
                        <PencilSquareIcon className="w-5" />
                      </button>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentItem(article)}
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

export default Articles;

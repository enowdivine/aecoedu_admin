import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Jobs from "../../features/Jobs";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Jobs" }));
  }, []);

  return <Jobs />;
}

export default InternalPage;

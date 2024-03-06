import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Testimony from "../../features/Testimony";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Testimonials" }));
  }, []);

  return <Testimony />;
}

export default InternalPage;

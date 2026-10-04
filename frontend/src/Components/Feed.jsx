import axios from "axios";
import { Base_Url } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import FeedCard from "./FeedCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(Base_Url + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  if (feed.length === 0)
    return (
      <div className="text-center text-3xl font-bold my-4 ">
        No New User Available!
      </div>
    );


  return (
    //have done this otherwise it will give the error if the feed is not present.
    feed && (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-3xl">
          <FeedCard user={feed[0]} />
        </div>
      </div>
    )
  );
};

export default Feed;

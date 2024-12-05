import { useEffect } from "react";
import Tweet from "../components/TweetContent";
import { useTweet } from "../api/tweets";

const MainPage: React.FC = () => {
  const { fetchTweets, tweets } = useTweet();

  useEffect(() => {
    fetchTweets();
  }, [fetchTweets]);

  const u = localStorage.getItem("userInfo");
  const localUser = JSON.parse(String(u));

  const leftCol = tweets.filter((_, index) => index % 2 === 0);
  const rightCol = tweets.filter((_, index) => index % 2 !== 0);

  return (
    <div>
      <h1 className="px-4 text-xl">Welcome {localUser.username}</h1>
      <div className="px-4 my-4">
        {tweets.length ? (
          <h2>Check out the new content. See anything you like?</h2>
        ) : (
          <h2>No posts yet? Create one. </h2>
        )}
      </div>

      <div className=" grid lg:grid-cols-2 gap-5 relative">
        <div className="space-y-5">
          {leftCol.map((tweet) => (
            <Tweet tweet={tweet} key={tweet._id} />
          ))}
        </div>
        <div className="space-y-5">
          {rightCol.map((tweet) => (
            <Tweet tweet={tweet} key={tweet._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;

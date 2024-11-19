import { MdOutlineModeEditOutline } from "react-icons/md";
import Tweet from "../components/TweetContent";
import AuthModal from "../components/Auth/AuthModal";
import EditUserForm from "../components/EditUserForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTweet } from "../api/tweets";
import { useUser } from "../api/users";
import { currentDummyUser, defaultImage } from "../utils";

const ProfilePage: React.FC = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { users } = useUser();
  const { fetchTweets, tweets } = useTweet();
  const user = users.find((u) => u._id === id);

  useEffect(() => {
    fetchTweets();
  }, [fetchTweets]);

  return (
    <section className="flex flex-col">
      <div
        className="relative hover:opacity-70 cursor-pointer"
        onClick={() => {
          if (id === currentDummyUser) {
              setOpenEdit(true)}}
          }
        
      >
        <img
          className="h-[200px] w-full object-cover object-center "
          src={
            user?.banner ||
            "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt=""
        />
        {id === currentDummyUser && (
          <p className="absolute flex gap-2 top-1/2 left-1/2 items-center transform -translate-x-1/2 -translate-y-1/2 font-semibold text-xl sm:text-4xl">
            Edit Profile
            <MdOutlineModeEditOutline />
          </p>
        )}
      </div>

      <div className="flex items-center my-3 p-4">
        <img
          className="w-[70px] h-[60px] md:w-[90px] md:h-[80px] object-cover object-center rounded-full"
          src={user?.avatar || defaultImage}
          alt=""
        />
        <div className="ml-4 w-full">
          <h3 className="text-xl">
            {user?.firstName} {user?.lastName}
          </h3>
          <h3 className="text">@{user?.username}</h3>

          <div className="flex gap-2  sm:flex-row">
            <p> {user?.followers?.length} followers</p>
            <p> {0} following </p>
          </div>
        </div>
      </div>
      <div className="border-t ">
        <h3 className="text-3xl text-center my-5">Your Posts</h3>
        <section className="grid gap-3 my-2">
          {tweets
            .filter((tweet) => tweet.userId === id)
            .map((userTweet, index) => (
              <Tweet tweet={userTweet} key={userTweet._id + index} />
            ))}
        </section>
      </div>
      <AuthModal isOpen={openEdit} setIsOpen={setOpenEdit}>
        <EditUserForm setOpen={setOpenEdit} />
      </AuthModal>
    </section>
  );
};

export default ProfilePage;

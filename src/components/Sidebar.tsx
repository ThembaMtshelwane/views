import { useState } from "react";
import { FaPowerOff, FaXTwitter } from "react-icons/fa6";
import { GiFeather } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import AuthModal from "./Auth/AuthModal";
import CreateTweet from "./CreateTweet";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { currentDummyUser } from "../utils";
import { useUser } from "../api/users";
import { defaultUser } from "../definitions";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const Sidebar: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const [openCreateTweet, setOpenCreateTweet] = useState(false);
  const { logoutUser, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const data = await logoutUser();
    // if (data?.success) {
    // await setUser(defaultUser);
    navigate("/");
    // }
  };
  return (
    <>
      {isOpen && (
        <section className="fixed  z-10 bg-opacity-50  md:hidden bg-black h-screen inset-0">
          <section className="w-[180px] bg-secondary fixed top-0 h-screen flex flex-col">
            <section className="h-[50vh] my-auto space-y-4">
              <div
                className="text-2xl cursor-pointer hover:scale-105 p-4 flex justify-around items-center"
                onClick={() => setIsOpen(false)}
              >
                <IoClose />
                <h2>Close</h2>
              </div>
              <Link
                to="/index"
                className="text-2xl cursor-pointer hover:scale-105 p-4  flex justify-around items-center "
                onClick={() => setIsOpen(false)}
              >
                <FaXTwitter />
                <h2>Home</h2>
              </Link>
              {/* <div className="text-2xl cursor-pointer hover:scale-105 p-4  flex justify-around items-center">
                <IoSearch />
                <h2>Search</h2>
              </div> */}
              <Link
                to={`/index/profile/${currentDummyUser}`}
                className="text-2xl cursor-pointer hover:scale-105 p-4  flex justify-around items-center"
                onClick={() => setIsOpen(false)}
              >
                <CgProfile />
                <h2>Profile</h2>
              </Link>
              <div
                className="text-2xl cursor-pointer hover:scale-105 p-4  flex justify-around items-center"
                onClick={() => {
                  setOpenCreateTweet(!openCreateTweet);
                  setIsOpen(false);
                }}
              >
                <GiFeather />
                <h2>Tweet</h2>
              </div>
            </section>
          </section>
        </section>
      )}

      <div className="hidden border md:flex flex-col w-fit h-[240px] fixed left-5 z-40 top-1/4 mx-2 justify-between py-6 p-4 rounded-3xl">
        <Link to="/index" className="text-xl">
          <FaXTwitter />
        </Link>
        {/* <Link to="" className="text-xl cursor-pointer">
          <IoSearch />
        </Link> */}
        <Link
          to={`/index/profile/${currentDummyUser}`}
          className="text-2xl cursor-pointer"
        >
          <CgProfile />
        </Link>
        <Link
          to={`/index/profile/${currentDummyUser}`}
          className="text-2xl cursor-pointer"
          onClick={handleLogOut}
        >
          <FaPowerOff />
        </Link>
        <div
          className="text-xl cursor-pointer"
          onClick={() => setOpenCreateTweet(!openCreateTweet)}
        >
          <GiFeather />
        </div>
      </div>
      <AuthModal isOpen={openCreateTweet} setIsOpen={setOpenCreateTweet}>
        <CreateTweet />
      </AuthModal>
    </>
  );
};

export default Sidebar;

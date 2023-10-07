import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import RecentCard from "./components/RecentCard";
import RecentDocument from "./components/RecentDocument";
// import globalService from "../../services";
// import { useDispatch } from "react-redux";
// import { setUsers } from "../../redux/reducers/users/userReducers";
// import NotificationService from "../../services/notification.service";

const index = () => {
  // const [loading, setLoading] = useState(false);
  // const userService = new globalService();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   setLoading(true);
  //   userService
  //     .getUsers()
  //     .then((data) => {
  //       console.log("all users", data);
  //       setLoading(false);
  //       dispatch(setUsers(data));
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       NotificationService.error({
  //         message: "Failed!",
  //         addedText: "could not fetch users",
  //       });
  //       console.error("Error fetching users:", error);
  //     });
  // }, []);

  return (
    <div className="h-[100vh] w-full overflow-y-auto pb-[8rem]">
      <h1 className="md:text-[34px] text-[26px] font-bold px-5">
        Welcome Olanrewaju!
      </h1>
      <Card />
      <RecentCard />
      <RecentDocument />
    </div>
  );
};

export default index;

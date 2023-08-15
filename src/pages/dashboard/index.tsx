import React, { useEffect } from "react";
import Card from "./components/Card";
import RecentCard from "./components/RecentCard";
import RecentDocument from "./components/RecentDocument";
import globalService from "@/services";
import { useDispatch } from "react-redux";
import { setUsers } from "@/redux/reducers/users/userReducers";

const index = () => {
  const userService = new globalService();
  const dispatch = useDispatch();

  useEffect(() => {
    try{
      getAllUsers();
    }catch(err){
      console.log(err)
    }
   
   }, [])

  const getAllUsers = () => {
    userService.getUsers()
        .then((data) => {
          // setUserData(data);
          console.log('all users', data)
          dispatch(setUsers(data));
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
  }


  return (
    <div className="h-[100vh] w-full overflow-y-auto pb-[8rem]">
      <h1 className="md:text-[34px] text-[26px] font-bold px-5">Welcome Olanrewaju!</h1>
      <Card />
      <RecentCard />
      <RecentDocument />
    </div>
  );
};

export default index;

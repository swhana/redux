import { useEffect } from "react";
import Users from "../components/Users";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../modules/users";
import { Preloader } from "../lib/PreloadContext";

const UsersContainer = () => {
  const users = useSelector(state => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    //이미 users에 대한 정보가 있으면 API호출을 하지않음
    if (users) return;
    dispatch(getUsers());
  }, [dispatch, users]);

  return (
    <>
      <Users users={users} />
      <Preloader resolve={() => dispatch(getUsers())} />
    </>
  );

};

export default UsersContainer;
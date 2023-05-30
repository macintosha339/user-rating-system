import { useDispatch } from "react-redux";
import { removeUser } from "../modules/RatedUserList/store/ratedUsersSlice";
import { loadMoreUsers } from "../modules/UserList/store/usersSlice";
import User from "../interfaces/user";

export const useRemoveFromRatedToUserList = () => {
  const dispatch = useDispatch();

  const deleteUser = (user: User): void => {
    dispatch(removeUser(user.id));
    dispatch(loadMoreUsers([user]));
  };

  return deleteUser;
};
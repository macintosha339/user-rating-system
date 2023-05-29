import { useDispatch } from "react-redux";
import { removeUser } from "../store/usersSlice";
import { incrementRating, decrementRating } from "../store/ratedUsersSlice";
import User from "../interfaces/user";

export const useRateUser = () => {
  const dispatch = useDispatch();

  const incrementRatingUser = (user: User): void => {
    dispatch(removeUser(user.id));
    dispatch(incrementRating(user));
  };

  const decrementRatingUser = (user: User): void => {
    dispatch(removeUser(user.id));
    dispatch(decrementRating(user));
  };

  return { incrementRatingUser, decrementRatingUser };
};
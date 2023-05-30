import { useDispatch } from "react-redux";
import { fetchUsers } from "../api/usersApi";
import User from "../../../interfaces/user";
import { AnyAction } from "redux";
import { ERROR } from "../constants";

interface UseActionOptions {
    action: (data: User[]) => AnyAction;
}

export const useAction = ({ action }: UseActionOptions) => {
  const dispatch = useDispatch();

  const handleAction = async () => {
    try {
        const data = await fetchUsers();
        dispatch(action(data));
        console.log(action(data).type);
      } catch (error) {
        console.log(ERROR, error);
      }
  };

  return handleAction;
};
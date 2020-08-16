import { combineReducers } from "redux";
import tutorial from "./tutorials/reducer";
import user from "./user/reducer";
import mentor from "./mentor/reducer";

export default combineReducers({
    tutorial,
    user,
    mentor,
});

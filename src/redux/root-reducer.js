import { combineReducers } from "redux";
import tutorial from "./tutorials/reducer";
import user from "./user/reducer";
import mentor from "./mentor/reducer";
import chat from "./chat/reducer";

export default combineReducers({
    tutorial,
    user,
    mentor,
    chat,
});

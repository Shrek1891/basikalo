import type {User} from "../../../types/types.ts";


const setSelectedUserAction = (state: { selectedUser: User | null }, action: { payload: User | null }) => {
    state.selectedUser = action.payload;
};

export default setSelectedUserAction;
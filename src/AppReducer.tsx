import AppState, { SideNavStatus } from "./AppState";
import { Action, Actions } from "./Actions";

const appReducer = (state: AppState, action: Action) => {
    console.log(action);
    switch (action.type) {
        case Actions.SideNavOpen:                
            return { SideNav : SideNavStatus.Open };
        case Actions.SideNavClosed:                
            return { SideNav : SideNavStatus.Closed };
        case Actions.FavFoodAdded:                
            return { Name : action.payload.Name, FavFood: action.payload.FavFood };
       
    }
}

export default appReducer;
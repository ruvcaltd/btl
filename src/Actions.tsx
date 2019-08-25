import { SideNavStatus } from "./AppState";

export class Action{
    type:Actions = Actions.None;
    payload:any;
}

export enum Actions{
    None,
    SideNavOpen,
    SideNavClosed,
    FavFoodAdded,
}
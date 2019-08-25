export default class AppState{
    SideNav: SideNavStatus = SideNavStatus.Open;

    Name: string="";
    FavFood:string="";
}

export enum SideNavStatus{
    Open,
    Closed,
    HalfOpen
}
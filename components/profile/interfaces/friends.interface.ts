export interface IGetRequestedFriends {
    index: number;
    count: number;
  }
  export interface IGetUserFriends {
    index: number;
    count: number;
    user_id: string | string[];
  }
  export interface IGetSuggestedFriends {
    index: number;
    count: number;
  }
  export interface ISetAcceptFriend {
    user_id: string;
    is_accept: string;
  }
  
  export interface ISetRequestFriend {
    user_id: string;
  }
  
  export interface IDeleteRequestFriend {
    user_id: string;
  }
  
  export interface IUnfriend {
    user_id: string;
  }
  
  export interface IRequestedFriends {
    id: string;
    username: string;
    avatar: string;
    same_friends: string;
    created: string;
  }
  
  export interface IUserFriends {
    id: string;
    username: string;
    avatar: string;
    same_friends: string;
    created: string;
  }
  
  export interface ISuggestedFriends {
    id: string;
    username: string;
    avatar: string;
    same_friends: string;
    created: string;
  }
  
  export interface IDataFriends {
    friends: IUserFriends[];
    total: string;
  }
  
export interface ILoggedInUser {
  userProfile: {
    _id: string;
    email: string;
    name: string;
    isPhoneVerified: number;
    isEmailVerified: number;
    date_of_add: number;
    last_updated: number;
  };
}

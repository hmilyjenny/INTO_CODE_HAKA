const initialState = {
    token: null,
    userName: null,
    isRegistering:false,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null,
    role:null,
    channels:[],
    expire:false
};

const authReducer = (state = initialState,action) =>{
  return state;
};
export default authReducer;
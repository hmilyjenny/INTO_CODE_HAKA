const initialState = {
    token: null,
    userId:'571de929402e83a30b0b4408',
    userName: 'Jason',
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
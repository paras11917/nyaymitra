// export const host = "http://localhost:5000";
export const host = "https://nyaymitra.onrender.com";
export const pyserver = "https://nyaymitra-rec-server.onrender.com";
export const recommandLawyerRoute = `${pyserver}/recommadlawyer`
export const signinRoute =    `${host}/api/auth/signin`;
export const preSignupRoute = `${host}/api/auth/signup`;
export const logoutRoute =    `${host}/api/auth/logout`;
export const activateRoute = `${host}/api/auth/activate`
export const updateUserRoute = `${host}/api/auth/update`;

export const allUsersRoute = `${host}/api/user/all`;
export const sendRequestRoute = `${host}/api/user/sendRequest`;
export const acceptRequestRoute = `${host}/api/user/acceptRequest`
export const getConnectionsRoute = `${host}/api/user/connections`;
export const uploadImageRoute = `${host}/api/user/avatar`;
export const userRoute = `${host}/api/user`
export const requestsRoute = `${host}/api/user/requests`

export const allLawyersRoute = `${host}/api/lawyer/all`;
export const getLawyerRoute = `${host}/api/lawyer`;

export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const recieveMessageRoute = `${host}/api/messages/getmsg`;

export const createPostRoute = `${host}/api/post/create`;
export const getAllPostRoute = `${host}/api/post/all`;
export const getPostRoute = `${host}/api/post`;
export const photoRoute = `${host}/api/post/photo`;
import { useContext } from 'react';

import AuthContext from '../context/index.js';

const useAuth = () => useContext(AuthContext);

export default useAuth;

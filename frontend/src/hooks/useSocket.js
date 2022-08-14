import { useContext } from 'react';

import ApiContext from '../context/apiContext.js';

const useSocket = () => useContext(ApiContext);

export default useSocket;

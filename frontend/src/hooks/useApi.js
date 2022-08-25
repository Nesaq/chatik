import { useContext } from 'react';

import ApiContext from '../context/apiContext.js';

const useApi = () => useContext(ApiContext);

export default useApi;

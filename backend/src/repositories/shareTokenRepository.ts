import { v4 } from 'uuid';

const shareToken = v4();

export const getToken = () => shareToken;

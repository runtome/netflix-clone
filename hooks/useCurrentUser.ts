import useSWR from 'swr';

import fatcher from '../lib/fatcher';

const useCurrentUser = () => {
    const { data , error, isLoading, mutate } = useSWR('/api/current', fatcher)

    return{
        data,
        error,
        isLoading,
        mutate
    }
};

export default useCurrentUser;
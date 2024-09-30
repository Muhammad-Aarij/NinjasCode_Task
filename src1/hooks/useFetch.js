import { useEffect, useState } from "react";
import axios from "axios";


function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const refetch = async () => {
        try {

            var config = {
                method: 'get',
                url: `${url}`,
            };

            const response = await axios(config)
            setData(response?.data)

        } catch (error) {
            setError(error)

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        
        refetch()

        return () => {
            setData(null)
            setLoading(true)
            setError(null)
        }
    }, [url]);

    return { data, loading, error, refetch };
}

export default useFetch;
// useWards.js
import { useState, useEffect } from 'react';

const useWards = (districtCode) => {
    const [wards, setWards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!districtCode) return;

        fetch(`https://provinces.open-api.vn/api/w/`)
            .then(response => response.json())
            .then(data => {
                setWards(data.filter(ward => ward.district_code.toString() === districtCode.toString()));
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [districtCode]);

    return { wards, loading, error };
};

export default useWards;

// useDistricts.js
import { useState, useEffect } from 'react';

const useDistricts = (provinceCode) => {
    const [districts, setDistricts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!provinceCode) return;

        console.log(provinceCode);

        fetch(`https://provinces.open-api.vn/api/d/`)
            .then(response => response.json())
            .then(data => {
                setDistricts(data.filter(district => {
                    return district.province_code.toString() === provinceCode.toString();
                }));
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [provinceCode]);

    return { districts, loading, error };
};

export default useDistricts;

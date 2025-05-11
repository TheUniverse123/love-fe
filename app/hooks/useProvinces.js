'use client';
import { useState, useEffect } from 'react';

const useProvinces = () => {
    const [provinces, setProvinces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://provinces.open-api.vn/api/p")
            .then(response => response.json())
            .then(data => {
                setProvinces(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []);

    return { provinces, loading, error };
};

export default useProvinces;

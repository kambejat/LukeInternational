import { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const FacilityTable = () => {
    const [facilities, setFacilities] = useState([]);
    const [filteredFacilities, setFilteredFacilities] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchFacilities();
    }, []);

    const fetchFacilities = async () => {
        try {
            const response = await axios.get('api/v2/facilities/');
            setFacilities(response.data);
            setFilteredFacilities(response.data);
        } catch (error) {
            console.error('Error fetching facilities:', error);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        const filtered = facilities.filter((facility) =>
            facility.facility_name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredFacilities(filtered);
    };

    const handleArchive = async (id) => {
        try {
            await axios.put(`api/v2/facilities/${id}/archive`);
            // Refresh facilities after archiving
            fetchFacilities();
        } catch (error) {
            console.error('Error archiving facility:', error);
        }
    };

    const columns = [
        { field: 'facility_name', headerName: 'Facility Name', flex: 1 },
        { field: 'district_id', headerName: 'District ID', flex: 1 },
        { field: 'owner_id', headerName: 'Owner ID', flex: 1 },
        {
            field: 'archive',
            headerName: 'Archive',
            flex: 1,
            renderCell: (params) => (
                <button onClick={() => handleArchive(params.row.id)}>Archive</button>
            ),
        },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search by facility name" />
            <DataGrid rows={filteredFacilities} columns={columns} pageSize={5} />
        </div>
    );
};

export default FacilityTable;

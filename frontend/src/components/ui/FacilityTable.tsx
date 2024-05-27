import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useAuth from '../context/useAuth';

interface Facility {
    id: number;
    facility_name: string;
    district_id: number;
    owner_id: number;
}

const FacilityTable: React.FC = () => {
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [filteredFacilities, setFilteredFacilities] = useState<Facility[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [user, token] = useAuth();
    useEffect(() => {
        fetchFacilities();
    }, []);

    const fetchFacilities = async () => {
        try {
            const response = await axios.get<Facility[]>('api/v2/facilities/');
            const facilitiesWithIds = response.data.map((facility, index) => ({
                ...facility,
                id: index + 1, // Generate a unique id for each facility
            }));
            setFacilities(facilitiesWithIds);
            setFilteredFacilities(facilitiesWithIds);
        } catch (error) {
            console.error('Error fetching facilities:', error);
        }
    };
    

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        const filtered = facilities.filter((facility) =>
            facility.facility_name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredFacilities(filtered);
    };

    const handleArchive = async (id: number) => {
        try {
            await axios.put(`api/v2/facilities/${id}/archive`);
            // Refresh facilities after archiving
            fetchFacilities();
        } catch (error) {
            console.error('Error archiving facility:', error);
        }
    };

    const columns: GridColDef[] = [
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
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search by facility name"
            />
            <DataGrid rows={filteredFacilities} columns={columns}  />
        </div>
    );
};

export default FacilityTable;

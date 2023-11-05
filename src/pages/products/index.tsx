import { supabase } from '@/utils/supabase';
import { Box, Container, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const Products = () => {
    const [data, setData] = useState<any>([])

    const fetchdata = async () => {
        const data = await supabase.from('products').select('*')
        setData(data.data)
    }
    useEffect(() => {
        fetchdata()
    }, [])

    const handleDelete = async (id: any) => {
        await supabase.from('products').delete().eq('id', id).then(() => fetchdata())
    }
    const columns = useColumns({ handleDelete })
    return (
        <Container>
            <Typography variant='h5' mb={2}>Products</Typography>
            <Box sx={{ height: 631, m: '0 auto' }}>
                {data && data.length > 0 ?
                    <DataGrid
                        rows={data}
                        columns={columns as any}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            },
                        }}
                        pageSizeOptions={[10]}
                        checkboxSelection
                        disableRowSelectionOnClick
                    /> : <Stack justifyContent={'center'} alignItems={'center'}>No Products Founds</Stack>}
            </Box>
        </Container>
    )
}

const useColumns = ({ handleDelete }: any) => [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        flex: 1,
    },
    {
        field: 'price',
        headerName: 'Price',
        width: 150,
        flex: 1,
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        type: 'number',
        width: 100,
        flex: 1,
        align: 'left',
        headerAlign: 'left'
    },
    {
        field: 'brand',
        headerName: 'Brand',
        sortable: false,
        width: 150,
        flex: 1,
    },
    {
        field: 'action',
        headerName: 'Actions',
        sortable: false,
        width: 150,
        flex: 1,
        renderCell: ({ row }: any) => {
            return (
                <Stack>
                    <DeleteIcon sx={{ cursor: 'pointer' }} onClick={() => handleDelete(row.id)} />
                </Stack>
            )
        }
    },
];



export default Products

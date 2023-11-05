import { CATEGORIES } from '@/constants';
import { supabase } from '@/utils/supabase';
import { Autocomplete, Box, Button, Container, Stack, TextField } from '@mui/material'
import { useFormik } from 'formik';
import Image from 'next/image';
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import * as  yup from 'yup'
import LoadingButton from '@mui/lab/LoadingButton';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

export const AddProductForm = () => {
    const [files, setFiles] = useState<File[]>([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [] },
        onDrop: acceptedFiles => {
            // Map through the accepted files to add previews
            const filesWithPreviews = acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }));
            setFiles(prevFiles => [...prevFiles, ...filesWithPreviews]);
        }
    });

    const thumbs = files.map(file => (
        <div style={thumb as any} key={file.name}>
            <div style={thumbInner}>
                <Image
                    src={(file as any).preview}
                    onLoad={() => { URL.revokeObjectURL((file as any).preview) }}
                    alt={"img-1"}
                    width={100}
                    height={100}
                />
            </div>
        </div>
    ));

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL((file as any).preview));
    }, [files]);

    const { handleChange, values: { name, price, quantity, description, category, brand }, setFieldValue, resetForm, handleSubmit, isSubmitting } = useFormik({
        initialValues: {
            name: '',
            price: '',
            quantity: '',
            description: '',
            category: null,
            brand: ''
        },
        validationSchema: yup.object().shape({
            name: yup.string().required(),
            price: yup.string().required(),
            quantity: yup.string().required(),
            description: yup.string().required(),
            category: yup.object().shape({
                id: yup.number().required(),
                label: yup.string().required(),
                value: yup.string().required()
            }).required(),
            brand: yup.string().required()
        }),
        onSubmit: async ({ name, price, quantity, description, category, brand }) => {
            let id = ''
            let images: any = []
            await supabase.auth.getSession().then((session) => {
                id = session.data.session?.user.id as string
            })
            if (files.length > 0) {
                await Promise.all(files.map(async (file) => {
                    await supabase.storage.from('products').upload(`public/${id}/${file?.name}`, file, {
                        cacheControl: '3600',
                        upsert: false
                    }).then(async res => {
                        images = [...images, res.data?.path]
                    })
                }))
                await supabase.from('products').insert({
                    name, price, quantity, description, category: (category as unknown as { id: number, label: string, value: string })?.value, brand, images
                }).then(() => {
                    resetForm()
                    setFiles([])
                })
            }
        }
    })
    return (
        <Container maxWidth="sm" sx={{ pb: 1 }}>
            <Box sx={{ minHeight: 180, background: '#eaeaea', borderRadius: 4, padding: 4 }} >
                <div style={{ minHeight: 180, width: '100%' }} {...getRootProps({ className: 'dropzone' })}>
                    <input  {...getInputProps()} />
                    <Stack justifyContent={'space-between'} height={'100%'}>
                        <p style={{ alignSelf: 'center' }}>Drag n drop some files here, or click to select files</p>
                        <aside style={thumbsContainer as any}>
                            {thumbs}
                        </aside>
                    </Stack>
                </div>
            </Box>
            <Stack mt={2} spacing={3}>
                <TextField id="basic-outlined" variant='outlined' placeholder='Name' onChange={handleChange('name')} value={name} fullWidth />
                <TextField id="basic-outlined" variant='outlined' type='number' placeholder='Price' onChange={handleChange('price')} value={price} fullWidth />
                <TextField id="basic-outlined" variant='outlined' type='number' placeholder='Quantity' onChange={handleChange('quantity')} value={quantity} fullWidth />
                <TextField id="basic-outlined" variant='outlined' placeholder='Brand' onChange={handleChange('brand')} value={brand} fullWidth />
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={CATEGORIES as any}
                    fullWidth
                    renderInput={(params) => <TextField {...params} label="Category" />}
                    onChange={(_: SyntheticEvent, newValue: string | null) => setFieldValue('category', newValue)}
                    value={category}
                />

                <TextField id="basic-outlined" variant='outlined' placeholder='Description' multiline
                    rows={4} fullWidth onChange={handleChange('description')} value={description} />
                <LoadingButton loading={isSubmitting} variant='contained' sx={{ marginBottom: 2 }} onClick={() => handleSubmit()}>
                    Add Product
                </LoadingButton>
            </Stack>
        </Container >
    )
}

import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';

const TokenTransferForm = ({ setSubmitted }) => {
    const [tokenAddress, setTokenAddress] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [customText, setCustomText] = useState('');


    const handleTokenAddressChange = (event) => {
        setTokenAddress(event.target.value);
    };

    const handleUserAddressChange = (event) => {
        setUserAddress(event.target.value);
    }

    const handleCustomTextChange = (event) => {
        setCustomText(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!tokenAddress) {
            alert('All fields are required!');
            return;
        }
        setSubmitted({ tokenAddress, userAddress, customText });
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <TextField
                label="ERC20 Token Address"
                variant="outlined"
                onChange={handleTokenAddressChange}
                value={tokenAddress}
                required
            />
            <TextField
                label="USER Address"
                variant="outlined"
                onChange={handleUserAddressChange}
                value={userAddress}
                required
            />
            <TextField
                label="Custom Text"
                variant="outlined"
                onChange={handleCustomTextChange}
                value={customText}
                required
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
            >
                GO
            </Button>
        </Box>
    );
};

export default TokenTransferForm;
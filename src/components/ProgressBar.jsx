import React, { useEffect, useState } from 'react'
import { TextField, IconButton, InputAdornment, LinearProgress, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { ethers } from 'ethers';

function ProgressBar({ token, user }) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState('ERC20 TOKEN PROGRESS');
    const [progress, setProgress] = useState(0);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setIsEditing(false);
        }
    };

    const startProgress = async () => {
        const erc20Abi = [
            "function transfer(address to, uint amount) returns (bool success)",
            "function decimals() view returns (uint8)",
            "function balanceOf(address owner) view returns (uint balance)"
        ];

        const provider = new ethers.JsonRpcProvider('https://base-rpc.publicnode.com')
        // const provider = new ethers.JsonRpcProvider('https://base-sepolia-rpc.publicnode.com')
        const erc20 = new ethers.Contract(token, erc20Abi, provider)
        const decimals = await erc20.decimals()
        const initialBalance = await erc20.balanceOf(user);
        const formattedBalance = ethers.formatUnits(initialBalance, decimals);

        const intervalId = setInterval(async () => {
            const newBalance = await erc20.balanceOf(user);
            const newFormattedBalance = ethers.formatUnits(newBalance, decimals);
            const diff = formattedBalance - newFormattedBalance;
            const newProgress = (diff / formattedBalance) * 100;
            setProgress(newProgress);
            console.log('newProgress', newProgress);
        }, 1000);


        return () => clearInterval(intervalId);
    }

    useEffect(() => {
        startProgress()
    }, [token])

    return (
        <div>
            {!isEditing ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '8px', color: 'black', fontWeight: 'bold', fontSize: 20 }}>{text}</span>
                    <IconButton onClick={handleEditClick} size="small">
                        <EditIcon fontSize="small" />
                    </IconButton>
                </div>
            ) : (
                <TextField
                    size="small"
                    value={text}
                    onChange={handleTextChange}
                    onKeyPress={handleKeyPress}
                    onBlur={() => setIsEditing(false)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setIsEditing(false)} size="small">
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    autoFocus
                />
            )}
            <LinearProgress variant="determinate" value={progress} style={{ width: '800px', height: '20px', marginTop: 20 }} />
            <Typography sx={{ mt: 2, color: 'black', fontWeight: 'bold' }} variant="body2">{`${Math.round(progress)}%`}</Typography>

        </div>
    );
}

export default ProgressBar
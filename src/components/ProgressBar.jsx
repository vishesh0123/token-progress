import React, { useEffect, useState } from 'react'
import { TextField, IconButton, InputAdornment, LinearProgress, Typography, Box } from '@mui/material';
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
            "function balanceOf(address owner) view returns (uint balance)",
            "function totalSupply() view returns (uint256)"
        ];


        const provider = new ethers.JsonRpcProvider('https://base-rpc.publicnode.com')
        // const provider = new ethers.JsonRpcProvider('https://base-sepolia-rpc.publicnode.com')
        const erc20 = new ethers.Contract(token, erc20Abi, provider)
        const decimals = await erc20.decimals()
        const initialSupply = await erc20.totalSupply()
        const formattedSupply = ethers.formatUnits(initialSupply, decimals);

        const intervalId = setInterval(async () => {
            const newBalance = await erc20.balanceOf(user);
            const newFormattedBalance = ethers.formatUnits(newBalance, decimals);
            const newProgress = (newFormattedBalance / formattedSupply) * 100;
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
            <Box sx={{ padding: 0 }}>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        mt: 3,
                        width: '800px',
                        height: 25,
                        borderRadius: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Light background for progress track
                        '& .MuiLinearProgress-bar': {
                            borderRadius: 1,
                            backgroundColor: '#4caf50', // A green color for the progress indicator
                            boxShadow: `
              inset 0 2px 4px rgba(255, 255, 255, 0.3), // Soft white glow
              inset 0 -2px 4px rgba(0, 0, 0, 0.1)      // Subtle inner shadow for depth
            `,
                            transition: 'width 0.4s ease-in-out',
                        },
                    }}
                />
            </Box>
            <Typography sx={{ mt: 2, color: 'black', fontWeight: 'bold' }} variant="body2">{`${Math.round(progress)}%`}</Typography>

        </div>
    );
}

export default ProgressBar
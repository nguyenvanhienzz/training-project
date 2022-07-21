import { styled } from '@material-ui/core';
import { Select } from '@mui/material';

export const StyledTableCell = styled(Select)(() => ({
    color: '#fff',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'clip',
    maxWidth: 300,
    cursor: 'pointer',
    '&:hover': {
        color: '#fff',
    },
}));

import { styled, TableCell } from '@material-ui/core';

export const StyledTableCell = styled(TableCell)(() => ({
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

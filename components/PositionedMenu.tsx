import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteGroupDialog from './deleteGroupDialog';
import { Group } from '../types/types';

type PositionedMenuProps = {
    handleEdit: Function
    handleDelete: Function
    data: Group
}

export default function PositionedMenu(props: PositionedMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

    return (
        <div >
            <IconButton aria-label="more" id="positioned-button"
                aria-controls={open ? 'positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="positioned-menu"
                aria-labelledby="positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={() => {
                    props.handleEdit()
                    handleClose()
                }}>Edit</MenuItem>
                <MenuItem onClick={() => {
                    setOpenDeleteDialog(true)
                    handleClose()
                }} >Delete</MenuItem>
            </Menu>
            <DeleteGroupDialog openDialog={openDeleteDialog} onClose={() => { setOpenDeleteDialog(false) }} handleSubmitData={() => {
                props.handleDelete()
            }} data={props.data} />
        </div>
    );
}


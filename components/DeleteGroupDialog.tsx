
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Group, Item } from '../types/types';
import ChipsArray from './ChipsArray';

type DeleteGroupDialogProps = {
    openDialog: boolean
    onClose: Function
    data?: Group
    handleSubmitData: Function
}

export default function DeleteGroupDialog(props: DeleteGroupDialogProps) {
    const handleSubmitData = async () => {
        props.handleSubmitData(props.data?.id)
        props.onClose();
    }

    return <Dialog open={props.openDialog} onClose={() => props.onClose()}>
        <DialogTitle>Delete {props.data?.name}</DialogTitle>
        <DialogContent>
            <Typography>
                Are you sure you want to delete {props.data?.name}
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => props.onClose()}>Cancel</Button>
            <Button color="error" onClick={() => {
                handleSubmitData()
            }}>Delete</Button>
        </DialogActions>
    </Dialog>
}


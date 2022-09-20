
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';


import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { Group, Item } from '../types/types';
import { deleteGroup, updateGroup } from '../api/user';
import Paper from '@mui/material/Paper';
import DoneIcon from '@mui/icons-material/Close';
import ChipsArray from './ChipsArray';

type EditGroupDialogProps = {
    openDialog: boolean
    onClose: Function
    data?: Group
    handleSubmitData: Function
}


export default function EditGroupDialog(props: EditGroupDialogProps) {

    const [name, setName] = useState<string | undefined>(props.data?.name)
    const [description, setDescription] = useState<string | undefined>(props.data?.description)
    const [people, setPeople] = useState<Item[] | undefined>(props.data?.people)
    const [roles, setRoles] = useState<Item[] | undefined>(props.data?.roles)

    useEffect(() => {
        initializeValues()
    }, [])

    const initializeValues = () => {
        setName(props.data?.name)
        setDescription(props.data?.description)
        setPeople(props.data?.people)
        setRoles(props.data?.roles)
    }

    const submitData = async () => {
        props.onClose();
        const newData = {
            id: props.data?.id,
            name,
            description,
            people,
            roles
        }
        props.handleSubmitData(newData);
    }

    const handleRolesToggle = (data: Item) => {
        const itemIndex = roles?.findIndex((item) => item.id == data.id)
        setRoles(roles?.map((item, index) => {
            if (index == itemIndex) {
                item.active = !item.active
            }
            return item
        }))
    }

    const handlePeopleToggle = (data: Item) => {
        const itemIndex = people?.findIndex((item) => item.id == data.id)
        setPeople(people?.map((item, index) => {
            if (index == itemIndex) {
                item.active = !item.active
            }
            return item
        }))
    }
    return <Dialog open={props.openDialog} onClose={() => props.onClose()}>
        <DialogTitle>Edit {props.data?.name}</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                fullWidth
                value={name}
                onChange={(e) => { setName(e.target.value) }} />
            <TextField
                margin="dense"
                id="description"
                label="Description"
                fullWidth
                multiline
                value={description}
                onChange={(e) => { setDescription(e.target.value) }} />
            {props.data?.people !== undefined && <> <Typography>
                People
            </Typography>

                <ChipsArray items={people} handleToggle={(data: Item) => { handlePeopleToggle(data) }} /></>
            }
            {props.data?.roles !== undefined && <>  <Typography>
                Roles
            </Typography>

                <ChipsArray items={roles} handleToggle={(data: Item) => { handleRolesToggle(data) }} /></>
            }

        </DialogContent>
        <DialogActions>
            <Button onClick={() => props.onClose()}>Cancel</Button>
            <Button onClick={() => {
                submitData()
            }}>Submit</Button>
        </DialogActions>
    </Dialog>
}


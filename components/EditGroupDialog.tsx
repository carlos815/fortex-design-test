
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
import { useData } from '../contexts/dataContext';

type EditGroupDialogProps = {
    openDialog: boolean
    onClose: Function
    data?: Group
    handleSubmitData: Function
}

export default function EditGroupDialog(props: EditGroupDialogProps) {
    const [name, setName] = useState<string | undefined>(props.data?.name)
    const [nameError, setNameError] = useState(false)
    const [nameErrorMessage, setNameErrorMessage] = useState<string | null>()
    const [description, setDescription] = useState<string | undefined>(props.data?.description)
    const [people, setPeople] = useState<Item[] | undefined>(props.data?.people)
    const [roles, setRoles] = useState<Item[] | undefined>(props.data?.roles)

    const { data } = useData()

    useEffect(() => {
        if (props.openDialog) {
            initializeValues()
        }
    }, [props.openDialog])

    const initializeValues = () => {
        setName(props.data?.name)
        setDescription(props.data?.description)
        setPeople(props.data?.people)
        setRoles(props.data?.roles)
        setNameError(false)
        setNameErrorMessage(null)
    }

    const handleSubmitData = async () => {

        const nameChanged = props.data?.name != name

        if (nameChanged) {
            const duplicatedName = data.findIndex((group: Group) => {
                return group.name == name
            }) != -1

            if (duplicatedName) {
                setNameError(true)
                setNameErrorMessage("This name is already in use")
                return
            } else {
                setNameError(false)
            }
        }

        if (name == "") {
            console.log("the name is empty")
            setNameError(true)
            setNameErrorMessage("The name field can't be empty")
            return
        }

        const newData = {
            id: props.data?.id,
            name,
            description,
            people,
            roles
        }

        props.handleSubmitData(newData)
        props.onClose();
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
                error={nameError}
                helperText={nameErrorMessage}
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
                handleSubmitData()
            }}>Submit</Button>
        </DialogActions>
    </Dialog>
}


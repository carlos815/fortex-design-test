


import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { Group, Item } from '../types/types';
import { deleteGroup, updateGroup } from '../api/user';
import Paper from '@mui/material/Paper';
import DoneIcon from '@mui/icons-material/Close';


export default function ChipsArray(props: { items: Item[] | undefined, handleToggle?: Function, simple?: boolean }) {
    return (
        <Paper
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0,
                m: 0,
                width: "100%"
            }}
            elevation={0}
            component="ul"
        >
            {props.items && props.items.map((data) => {
                let icon;

                return (
                    <div style={{ padding: 4 }} key={data.id}>
                        {props.simple ? <Chip
                            icon={icon}
                            label={data.name}
                            // color={data.active ? "primary" : "default"}
                            variant={data.active ? "filled" : "outlined"}
                            size="small"
                        />



                            : <Chip
                                icon={icon}
                                label={data.name}
                                color={data.active ? "primary" : "default"}
                                variant={data.active ? "filled" : "outlined"}
                                onDelete={() => { props.handleToggle && props.handleToggle(data) }}
                                deleteIcon={data.active ? <DoneIcon /> : <DoneIcon style={{ display: "none" }} />}
                                onClick={() => { props.handleToggle && props.handleToggle(data) }} />}
                    </div>

                );
            })}

        </Paper>
    );
}
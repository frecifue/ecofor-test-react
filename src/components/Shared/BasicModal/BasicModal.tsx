import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React, { type ReactNode } from 'react'

type Props = {
    title: string;
    children: ReactNode;
    open: boolean;
    onClose: ()=> void;
}

export default function BasicModal({title, open, onClose, children} : Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}

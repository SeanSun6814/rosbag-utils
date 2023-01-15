import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MonacoEditor from "@uiw/react-monacoeditor";
import { useParams } from "react-router-dom";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80vw",
    height: "80vh",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 0,
};

export default function ModalViewCode(props) {
    return (
        <div>
            <Modal open={props.open} onClose={() => props.setOpen(() => false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <MonacoEditor
                        language={props.language}
                        value={props.content}
                        options={{
                            theme: "vs-dark",
                        }}
                    />
                </Box>
            </Modal>
        </div>
    );
}

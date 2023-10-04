import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import style from "./Modals.module.scss";
import { AuthForm } from "../";

function Modals({ type, handleModalClose }) {
    return (
        <>
            <Modal open={type === "login"} onClose={handleModalClose}>
                <Box className={style.formContainer}>
                    <AuthForm formType={type} handleModalClose={handleModalClose} />
                </Box>
            </Modal>
            <Modal open={type === "register"} onClose={handleModalClose}>
                <Box className={style.formContainer}>
                    <AuthForm formType={type} handleModalClose={handleModalClose} />
                </Box>
            </Modal>
        </>
    );
}

export default Modals;

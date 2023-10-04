import styles from "./Home.module.scss";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Modals } from "../../components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { isAuthSelector } from "../../Redux/slices/auth";

function Home() {
    const isAuth = useSelector(isAuthSelector);
    const userEmail = useSelector((state) => state.auth.userEmail);

    const [showModalType, setShowModalType] = useState(null);
    return (
        <div className={styles.container}>
            {isAuth && (
                <>
                    <Typography variant="h3" color="initial">
                        You are logined in
                    </Typography>
                    <Typography variant="h3" color="initial">
                        Your email is: {userEmail}
                    </Typography>
                </>
            )}
            <div className={styles.buttonsContainer}>
                {isAuth ? (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => console.log("Log out")}
                    >
                        Logout
                    </Button>
                ) : (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setShowModalType("login")}
                        >
                            Login
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setShowModalType("register")}
                        >
                            Register
                        </Button>
                    </>
                )}
                <Modals
                    type={showModalType}
                    handleModalClose={() => setShowModalType(null)}
                />
            </div>
        </div>
    );
}

export default Home;

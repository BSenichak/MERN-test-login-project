import { useForm } from "react-hook-form";
import style from "./AuthForm.module.scss";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { registration } from "../../Redux/slices/auth";

function AuthForm({ formType, handleModalClose }) {
    const dispatch = useDispatch();
    const isRegisterForm = formType === "register";
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (values) => {
        const data = await dispatch(
            isRegisterForm ? registration(values) : console.table(data)
        );
        if (!data.payload) {
            alert(`${isRegisterForm ? "Register" : "Login"} failed!`);
        }
        if ("token" in data.payload) {
            localStorage.setItem("token", data.payload.token);
        }
        handleModalClose();
    };
    return (
        <>
            <Typography
                variant="h2"
                className={style.formTitle}
                color={"black"}
                sx={{ marginBottom: "16px" }}
            >
                {isRegisterForm ? "Register" : "Login"}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
                <TextField
                    label="Email"
                    type="email"
                    {...register("email", {
                        required: "Email field is required",
                    })}
                    error={Boolean(errors?.email?.message)}
                    helperText={errors?.email ? "Email field is required" : ""}
                />
                <TextField
                    label="Password"
                    type="password"
                    {...register("password", {
                        required: "Password should be bigger 5 symbols",
                        minLength: 5,
                    })}
                    error={Boolean(errors?.password?.message)}
                    helperText={
                        errors?.password ? "Password field is requireda" : ""
                    }
                />
                <Button
                    disabled={!isValid}
                    variant="contained"
                    color="secondary"
                    type="submit"
                    sx={{ mt: "16px" }}
                >
                    Submit
                </Button>
            </form>
        </>
    );
}

export default AuthForm;

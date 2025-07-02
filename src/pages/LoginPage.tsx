import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    const handleLogin = () => {
        if (username === "admin" && password === "password") {
            localStorage.setItem("token", "true");
            navigate("/home");
        } else {
            setError("Invalid username or password");
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                handleLogin();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [username, password]);

    return (
        <Box sx={{ width: 300, margin: "auto", paddingTop: 5 }}>
            <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>Login</Typography>
            {error && <Alert sx={{ marginBottom: 2 }} severity="error">{error}</Alert>}
            <TextField
                fullWidth
                label="Username"
                value={username}
                sx={{ marginBottom: 2 }}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                fullWidth
                type="password"
                label="Password"
                sx={{ marginBottom: 2 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" fullWidth onClick={handleLogin}>Login</Button>
        </Box>
    );
};
export default LoginPage;

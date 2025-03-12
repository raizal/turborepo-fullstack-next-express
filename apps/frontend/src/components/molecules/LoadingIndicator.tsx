import { CircularProgress } from "@mui/material";

export const LoadingIndicator = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress
        size={24}
        />
    </div>
  );
};
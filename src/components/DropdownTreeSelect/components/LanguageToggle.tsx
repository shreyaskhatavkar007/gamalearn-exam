import { Box, Button } from '@mui/material';

export const LanguageToggle = ({ currentDir, setDir }: {
  currentDir: 'ltr' | 'rtl',
  setDir: (dir: 'ltr' | 'rtl') => void
}) => (
  <Box display="flex" gap={1}>
    <Button
      variant={currentDir === 'ltr' ? 'contained' : 'text'}
      onClick={() => setDir('ltr')}
      sx={{
        minWidth: 32,
        padding: '2px 6px',
        fontSize: '0.75rem',
        borderRadius: 1,
      }}
    >
      EN
    </Button>
    <Button
      variant={currentDir === 'rtl' ? 'contained' : 'text'}
      onClick={() => setDir('rtl')}
      sx={{
        minWidth: 32,
        padding: '2px 6px',
        fontSize: '0.75rem',
        borderRadius: 1,
      }}
    >
      AR
    </Button>
  </Box>
);
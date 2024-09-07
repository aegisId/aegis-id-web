import SocialButtons from '../components/SocialButtons';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logo from '../assets/agies.png';

export default function Home() {
  return (
    <div className="home">
      <header style={styles.header}>
        <Box display="flex" alignItems="center">
          <img 
            src={logo} 
            alt="Agies Labs logo" 
            style={styles.logo} 
          /> 
        </Box>
        <Button variant="contained" color="primary" >
          Connect Wallet
        </Button>
      </header>
      <main style={styles.mainContent}>
        <SocialButtons />
      </main>
    </div>
  );
}

// Basic inline styling for the elements
const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#000',
    color: '#fff',
  },
  logo: {
    height: '40px', // Adjust size as needed
  },
//   button: {
//     backgroundColor: '#61dafb',
//   },
  mainContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 80px)', // Full height minus header
  },
};

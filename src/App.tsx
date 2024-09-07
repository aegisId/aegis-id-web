import './App.css';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;



// import React, { useState } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   CardActions,
//   Grid,
//   Container,
//   ThemeProvider,
//   createTheme,
//   CssBaseline,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   List,
//   ListItem,
//   ListItemText,
//   IconButton
// } from '@mui/material';
// import {
//   Close as CloseIcon,
//   People as PeopleIcon,
//   Fingerprint as FingerprintIcon,
//   Security as SecurityIcon,
//   Timeline as TimelineIcon
// } from '@mui/icons-material';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#3AAFA9',
//     },
//     secondary: {
//       main: '#2B7A78',
//     },
//     background: {
//       default: '#DEF2F1',
//       paper: '#FEFFFF',
//     },
//     text: {
//       primary: '#17252A',
//       secondary: '#2B7A78',
//     },
//   },
// });

// interface Category {
//   id: string;
//   title: string;
//   description: string;
//   modalTitle: string;
//   modalDescription: string;
//   steps: string[];
//   points: number;
//   icon: React.ReactNode;
// }

// const categories: Category[] = [
//   {
//     id: 'social',
//     title: 'Social Media',
//     description: 'Verify your online presence',
//     modalTitle: 'Social Media Attestation',
//     modalDescription: 'Verify your social media accounts to prove your online presence.',
//     steps: ['Connect your social media accounts', 'Verify ownership', 'Receive attestation'],
//     points: 50,
//     icon: <PeopleIcon fontSize="large" />,
//   },
//   {
//     id: 'biometrics',
//     title: 'Biometrics',
//     description: 'Prove your unique identity',
//     modalTitle: 'Biometrics and Liveliness Attestation',
//     modalDescription: 'Prove your unique identity through biometric verification.',
//     steps: ['Scan your face', 'Perform liveliness check', 'Receive attestation'],
//     points: 100,
//     icon: <FingerprintIcon fontSize="large" />,
//   },
//   {
//     id: 'kyc',
//     title: 'Import KYC',
//     description: 'Utilize existing verifications',
//     modalTitle: 'Import KYC Attestation',
//     modalDescription: 'Import your existing KYC verification for quick identity proof.',
//     steps: ['Select KYC provider', 'Authorize data transfer', 'Receive attestation'],
//     points: 75,
//     icon: <SecurityIcon fontSize="large" />,
//   },
//   {
//     id: 'onchain',
//     title: 'On-chain Activity',
//     description: 'Showcase your blockchain interactions',
//     modalTitle: 'On-chain Activity Attestation',
//     modalDescription: 'Showcase your blockchain interactions and prove your on-chain presence.',
//     steps: ['Connect your wallet', 'Analyze on-chain activity', 'Receive attestation'],
//     points: 60,
//     icon: <TimelineIcon fontSize="large" />,
//   },
// ];

// interface AttestationModalProps {
//   category: Category | null;
//   open: boolean;
//   onClose: () => void;
// }

// const AttestationModal: React.FC<AttestationModalProps> = ({ category, open, onClose }) => {
//   if (!category) return null;

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>
//         {category.modalTitle}
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{ position: 'absolute', right: 8, top: 8 }}
//         >
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent>
//         <DialogContentText>{category.modalDescription}</DialogContentText>
//         <List>
//           {category.steps.map((step, index) => (
//             <ListItem key={index}>
//               <ListItemText primary={`${index + 1}. ${step}`} />
//             </ListItem>
//           ))}
//         </List>
//         <Typography variant="body1" gutterBottom>
//           Points available: <strong>{category.points}</strong>
//         </Typography>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Cancel
//         </Button>
//         <Button onClick={onClose} color="primary" variant="contained">
//           Start Verification
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// const App: React.FC = () => {
//   const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <AppBar position="static" color="transparent" elevation={0}>
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             Aegis
//           </Typography>
//           <Button color="inherit">About</Button>
//           <Button color="inherit">Contact</Button>
//         </Toolbar>
//       </AppBar>
//       <Container maxWidth="lg" sx={{ mt: 4 }}>
//         <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
//           Decentralized Identity Attestations
//         </Typography>
//         <Typography variant="h5" align="center" color="textSecondary" paragraph>
//           Secure your digital identity with blockchain-powered attestations
//         </Typography>
//         <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', margin: '2rem 0' }}>
//           <Button variant="contained" color="primary" size="large">
//             Connect Wallet
//           </Button>
//           <Button variant="outlined" color="primary" size="large">
//             Get API
//           </Button>
//         </div>
//         <Grid container spacing={4}>
//           {categories.map((category) => (
//             <Grid item key={category.id} xs={12} sm={6} md={3}>
//               <Card
//                 sx={{
//                   height: '100%',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   transition: '0.3s',
//                   '&:hover': {
//                     transform: 'translateY(-5px)',
//                     boxShadow: 3,
//                   },
//                 }}
//               >
//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
//                     {category.icon}
//                   </div>
//                   <Typography gutterBottom variant="h5" component="h2" align="center">
//                     {category.title}
//                   </Typography>
//                   <Typography align="center">
//                     {category.description}
//                   </Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button
//                     size="small"
//                     color="primary"
//                     fullWidth
//                     onClick={() => setSelectedCategory(category)}
//                   >
//                     Learn More
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//       <AttestationModal
//         category={selectedCategory}
//         open={Boolean(selectedCategory)}
//         onClose={() => setSelectedCategory(null)}
//       />
//     </ThemeProvider>
//   );
// };

// export default App;

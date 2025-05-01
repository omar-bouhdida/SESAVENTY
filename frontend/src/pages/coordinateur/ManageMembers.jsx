import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Box,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';
import MembersList from '../../components/coordinateur/MembersList';
import MembershipRequestsList from '../../components/coordinateur/MembershipRequestsList';

const ManageMembers = () => {
  const { clubId } = useParams();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Typography variant="h5" gutterBottom>
          Gestion des membres
        </Typography>

        <Paper sx={{ mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Membres" />
            <Tab label="Demandes d'adhésion" />
          </Tabs>

          <Box p={3}>
            {activeTab === 0 && (
              <MembersList clubId={clubId} />
            )}
            {activeTab === 1 && (
              <MembershipRequestsList clubId={clubId} />
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ManageMembers;
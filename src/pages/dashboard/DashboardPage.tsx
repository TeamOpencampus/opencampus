import { Box, Button } from '@chakra-ui/react';
import { useAuthActions } from '../../_actions/auth.action';
import { RequireAuth } from '../../_components/RequireAuth';

export function DashboardPage() {
  const authAction = useAuthActions();
  // const profile = useProfile();
  // useEffect(() => {
  //   profile.isCreated().then((res) => console.log(`Have Profile: ${res}`));
  // }, []);
  return (
    <RequireAuth>
      <Box>
        <Button onClick={authAction.logOut}>Log Out</Button>
      </Box>
    </RequireAuth>
  );
}

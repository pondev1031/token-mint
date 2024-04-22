import { Suspense } from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

const Spinner = () => {
    return (
        <Stack sx={{ position: 'fixed', top: '0', left: '0', zIndex: '1000', width: '100%' }} >
            <LinearProgress sx={{ color: 'inherit' }} />
        </Stack>
    )
}

const Loadable = (Component) => (props) =>
(
    <Suspense fallback={<Spinner />}>
        <Component {...props} />
    </Suspense>
);

export default Loadable;

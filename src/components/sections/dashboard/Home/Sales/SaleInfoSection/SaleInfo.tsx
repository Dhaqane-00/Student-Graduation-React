import { ReactElement } from 'react';
import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import Image from 'components/base/Image';
// import { useBreakpoints } from 'providers/BreakpointsProvider';

type SaleInfoProps = {
  image?: string;
  title: string;
  sales: string;
  increment: number;
  date?: string;
};

const SaleInfo = ({ image, title, sales, increment, date }: SaleInfoProps): ReactElement => {
  // const { between } = useBreakpoints();

  return (
    <Card
      sx={(theme) => ({
        boxShadow: theme.shadows[4],
        // flexDirection: between('md', 'lg') ? 'column' : 'row',
        // alignItems: between('md', 'lg') ? 'flex-start' : 'center',
        width: 1,
      })}
    >
      <CardMedia
        sx={{
          maxWidth: 70,
          maxHeight: 70,
        }}
      >
        <Image src={`${image}`} width={1} height={1} />
      </CardMedia>
      <CardContent
        sx={{
          flex: '1 1 auto',
          padding: 0,
          ':last-child': {
            paddingBottom: 0,
          },
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <Typography variant="subtitle1" component="p" minWidth={100} color="text.primary">
            {title}
          </Typography>
          <Typography variant="body2" component="p" color="text.secondary">
            {date}
          </Typography>
        </Stack>
        <Typography variant="body1" component="p" color="text.secondary">
          ${sales}
        </Typography>
        <Stack
          direction={{ xs: 'row', sm: 'column', md: 'row' }}
          alignItems={{ md: 'center' }}
          mt={{ xs: 0, sm: 1, md: 0 }}
          gap={1}
          minWidth={150}
          color="primary.main"
        >
          <IconifyIcon icon="ph:trend-up-fill" width={18} height={18} />
          <Typography variant="body1">{`+${increment}%`} last month</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SaleInfo;

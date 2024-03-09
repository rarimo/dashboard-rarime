import { time } from '@distributedlab/tools'
import { Button, Paper, Stack, Typography, useTheme } from '@mui/material'

import { LineChart, PageTitles } from '@/common'

const weeklyData = [
  {
    label: '2024-01-01',
    value: 120.12,
  },
  {
    label: '2024-01-02',
    value: 136.63,
  },
  {
    label: '2024-01-03',
    value: 130.12,
  },
  {
    label: '2024-01-04',
    value: 140.63,
  },
  {
    label: '2024-01-05',
    value: 154.12,
  },
  {
    label: '2024-01-06',
    value: 150.63,
  },
  {
    label: '2024-01-07',
    value: 160.12,
  },
]

export default function Analytics() {
  const { palette } = useTheme()

  return (
    <Stack spacing={8}>
      <PageTitles title={'Wallet Analytics'} />
      <Paper component={Stack} spacing={6}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Stack spacing={2}>
            <Typography variant='body3' color={palette.text.secondary}>
              Total RMO
            </Typography>
            <Typography variant='h4'>120.591</Typography>
            <Typography variant='caption2' color={palette.text.secondary}>
              ≈ $4,506.40{' '}
              <Typography variant='caption2' color={palette.success.dark}>
                (+$345, Today)
              </Typography>
            </Typography>
          </Stack>
          <Stack direction='row' spacing={1} alignItems='center'>
            <Button color='secondary' size='medium'>
              7D
            </Button>
            <Button
              color='secondary'
              size='medium'
              sx={{ bgcolor: 'transparent', color: palette.text.secondary }}
            >
              1M
            </Button>
            <Button
              color='secondary'
              size='medium'
              sx={{ bgcolor: 'transparent', color: palette.text.secondary }}
            >
              3M
            </Button>
            <Button
              color='secondary'
              size='medium'
              sx={{ bgcolor: 'transparent', color: palette.text.secondary }}
            >
              ALL
            </Button>
          </Stack>
        </Stack>

        <LineChart
          data={weeklyData}
          height={400}
          labelFormatter={label => time(label).format('D MMM')}
          valueFormatter={value => `${value} (RMO)`}
        />
      </Paper>
    </Stack>
  )
}

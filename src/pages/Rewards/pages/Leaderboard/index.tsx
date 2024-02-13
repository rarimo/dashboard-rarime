import { Divider, Grid, Stack, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import { NavLink } from 'react-router-dom'

import { UserAvatar } from '@/common'
import { RoutePaths } from '@/enums'
import { useIdentityState } from '@/store'
import { UiButton, UiIcon } from '@/ui'

// TODO: experimental, replace with formatter
function formatDid(value: string, maxLength = 16) {
  const startLength = Math.floor(maxLength / 2)
  const endLength = maxLength - startLength

  const did = value.replace('did:iden3:readonly:', '')
  return did.length > maxLength ? did.slice(0, startLength) + '...' + did.slice(-endLength) : did
}

export default function Leaderboard() {
  const { palette, spacing } = useTheme()
  const { userDid } = useIdentityState()

  const participants = [
    {
      id: 'did:iden3:readonly:mhQHvqmvimneVHCL5EufeZvfzigRt',
      points: 25345,
    },
    {
      id: 'did:iden3:readonly:mi1QKgywFcFD7d35QRaHwd6b6Cxy',
      points: 25123,
    },
    {
      id: 'did:iden3:readonly:mmaJ5kAjbGLRVcfqwsMPi7kHK1f',
      points: 23402,
    },
    {
      id: 'did:iden3:readonly:mhQHvqmvimneVHCL5EufeZvfzigRv',
      points: 21502,
    },
    {
      id: 'did:iden3:readonly:mi1QKgywFcFD7d35QRaHwd6b6Cxb',
      points: 20420,
    },
    {
      id: 'did:iden3:readonly:mmaJ5kAjbGLRVcfqwsMPi7kHK1a',
      points: 19499,
    },
    {
      id: 'did:iden3:readonly:mi1QKgywFcFD7d35QRaHwd6b6Cxe',
      points: 8992,
    },
    {
      id: 'did:iden3:readonly:ahQHvqmvimneVHCL5EufeZvfzigRt',
      points: 8150,
    },
    {
      id: 'did:iden3:readonly:whQHvqmvimneVHCL5EufeZvfzigRt',
      points: 4520,
    },
    {
      id: 'did:iden3:readonly:mhQHvqmvimneVHCL5EufeZvfzigRa',
      points: 1402,
    },
  ]

  const myParticipant = {
    position: 291,
    points: 381,
  }

  const getLeaderIcon = (index: number) => {
    if (index === 0) {
      return '🥇'
    }
    if (index === 1) {
      return '🥈'
    }
    if (index === 2) {
      return '🥉'
    }
    return ''
  }

  return (
    <Stack spacing={6}>
      <UiButton
        component={NavLink}
        to={RoutePaths.Rewards}
        variant='text'
        color='secondary'
        size='small'
        startIcon={<UiIcon componentName={'chevronLeft'} size={5} />}
        sx={{ width: 'fit-content' }}
      >
        Go Back
      </UiButton>

      <Stack
        p={6}
        spacing={4}
        bgcolor={palette.background.light}
        border={1}
        borderColor={palette.additional.layerBorder}
        borderRadius={4}
      >
        <Typography variant='subtitle3'>Leaderboard</Typography>
        <Stack spacing={4}>
          <Grid container spacing={16}>
            <Grid item xs={2}>
              <Typography variant='overline3' color={palette.text.secondary}>
                Place
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='overline3' color={palette.text.secondary}>
                User DID
              </Typography>
            </Grid>
            <Grid item xs={4} justifySelf={'end'} textAlign={'right'}>
              <Typography variant='overline3' color={palette.text.secondary}>
                Reserved
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          {participants.map((participant, index) => (
            <Stack spacing={4} key={participant.id}>
              <Grid container spacing={16}>
                <Grid item xs={2}>
                  <Stack
                    justifyContent={'center'}
                    alignItems={'center'}
                    bgcolor={index <= 2 ? palette.primary.main : undefined}
                    color={index <= 2 ? palette.common.black : palette.text.primary}
                    width={spacing(8)}
                    height={spacing(8)}
                    borderRadius={250}
                  >
                    <Typography variant='subtitle4'>{index + 1}</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack direction={'row'} alignItems={'center'} spacing={2}>
                    <UserAvatar userDid={participant.id} size={5} />
                    <Typography variant='subtitle4'>
                      {`${formatDid(participant.id, 24)} ${getLeaderIcon(index)}`}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={4} textAlign={'right'}>
                  <Typography
                    variant='subtitle4'
                    px={4}
                    py={1}
                    bgcolor={palette.action.active}
                    borderRadius={12}
                  >
                    {new Intl.NumberFormat().format(participant.points)}
                  </Typography>
                </Grid>
              </Grid>
              {index !== participants.length - 1 && <Divider />}
            </Stack>
          ))}

          <Box bgcolor={palette.action.active} px={6} py={4} mx={-6} borderRadius={2}>
            <Grid container spacing={16} alignItems={'center'}>
              <Grid item xs={2}>
                <Stack
                  justifyContent={'center'}
                  alignItems={'center'}
                  width={spacing(8)}
                  height={spacing(8)}
                  borderRadius={250}
                  bgcolor={palette.background.paper}
                >
                  <Typography variant='subtitle5'>{myParticipant.position}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack direction={'row'} alignItems={'center'} spacing={4}>
                  <Stack direction={'row'} alignItems={'center'} spacing={2}>
                    <UserAvatar userDid={userDid} size={5} />
                    <Typography variant='subtitle4'>{formatDid(userDid, 24)}</Typography>
                  </Stack>
                  <Typography
                    variant='overline3'
                    px={1.5}
                    py={0.5}
                    borderRadius={25}
                    color={palette.text.secondary}
                    bgcolor={palette.action.hover}
                  >
                    You
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={4} textAlign={'right'}>
                <Typography
                  variant='subtitle4'
                  px={4}
                  py={1}
                  bgcolor={palette.action.active}
                  borderRadius={12}
                >
                  {new Intl.NumberFormat().format(myParticipant.points)}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  )
}

import {
  Button,
  CircularProgress,
  Dialog,
  DialogProps,
  Divider,
  FormControl,
  Stack,
  useTheme,
} from '@mui/material'
import { useCallback } from 'react'
import { Controller } from 'react-hook-form'

import { withdrawPoints } from '@/api/modules/points'
import { BusEvents } from '@/enums'
import { bus, ErrorHandler } from '@/helpers'
import { useForm } from '@/hooks'
import { useIdentityState } from '@/store'
import { UiDrawerActions, UiDrawerContent, UiDrawerTitle, UiTextField } from '@/ui'

import ClaimBalances from './ClaimBalances'
import ClaimWarning from './ClaimWarning'

type Props = DialogProps & {
  reservedBalance: number
  walletBalance: number
  onClaim: () => void
}

enum FieldNames {
  Amount = 'amount',
}

const DEFAULT_VALUES = {
  [FieldNames.Amount]: '',
}

export default function ClaimModal({ reservedBalance, walletBalance, onClaim, ...rest }: Props) {
  const { spacing } = useTheme()
  const { userDid } = useIdentityState()

  // TODO: Replace with real data
  const isLevelReached = false

  const { handleSubmit, control, isFormDisabled, getErrorMessage, disableForm, enableForm } =
    useForm(DEFAULT_VALUES, yup =>
      yup.object().shape({
        [FieldNames.Amount]: yup.number().required().min(1).max(reservedBalance),
      }),
    )

  const submit = useCallback(
    async (formData: typeof DEFAULT_VALUES) => {
      disableForm()

      try {
        await withdrawPoints(
          userDid,
          Number(formData[FieldNames.Amount]),
          // TODO: Replace with real Rarimo address
          'rarimo',
        )
        bus.emit(BusEvents.success, {
          message: `Claimed ${formData[FieldNames.Amount]} RMO`,
        })
        onClaim()
      } catch (error) {
        ErrorHandler.process(error)
      }

      enableForm()
    },
    [disableForm, enableForm, onClaim, userDid],
  )

  return (
    <Dialog
      {...rest}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit(submit),
        sx: { width: spacing(110) },
      }}
    >
      <UiDrawerTitle onClose={rest.onClose}>Claim RMO</UiDrawerTitle>
      <UiDrawerContent>
        <Stack spacing={5}>
          {!isLevelReached && <ClaimWarning onAction={e => rest.onClose?.(e, 'escapeKeyDown')} />}
          <ClaimBalances reservedBalance={reservedBalance} walletBalance={walletBalance} />
          <Controller
            name={FieldNames.Amount}
            control={control}
            render={({ field }) => (
              <FormControl>
                <UiTextField
                  {...field}
                  label='Claim amount'
                  placeholder='Enter amount'
                  errorMessage={getErrorMessage(FieldNames.Amount)}
                  disabled={isFormDisabled}
                  InputProps={{
                    endAdornment: (
                      <Stack direction={'row'} spacing={4} alignItems={'center'}>
                        <Divider orientation='vertical' flexItem />
                        <Button
                          variant='text'
                          size='medium'
                          color='secondary'
                          onClick={() => field.onChange(reservedBalance)}
                        >
                          MAX
                        </Button>
                      </Stack>
                    ),
                  }}
                />
              </FormControl>
            )}
          />
        </Stack>
      </UiDrawerContent>
      <UiDrawerActions>
        <Stack spacing={2}>
          <Button type='submit' fullWidth disabled={!isLevelReached}>
            Claim
          </Button>
          <Button
            color='secondary'
            fullWidth
            sx={{ bgcolor: 'transparent' }}
            onClick={e => rest.onClose?.(e, 'escapeKeyDown')}
          >
            Cancel
          </Button>
        </Stack>
      </UiDrawerActions>

      {isFormDisabled && (
        <Stack
          justifyContent={'center'}
          alignItems={'center'}
          position={'absolute'}
          top={0}
          left={0}
          bottom={0}
          right={0}
          bgcolor={theme => theme.palette.background.light}
        >
          <CircularProgress color={'inherit'} />
        </Stack>
      )}
    </Dialog>
  )
}

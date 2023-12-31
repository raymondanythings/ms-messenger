import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import useSocket from '@/hooks/use-socket'
import { USER_UNIQUE_KEY } from '@/constants'
import { SocketContext } from './providers/socket-provier'
import { Input } from '@/components/ui/input'
import { Button } from './ui/button'
import { User } from 'lucide-react'

interface UserSettingParams {
  nickname: string
}

const UserSetting = () => {
  const [open, setOpen] = useState(false)
  const { setInfo } = useContext(SocketContext)
  const { socket } = useSocket({
    nsp: '/',
  })

  const form = useForm<UserSettingParams>()
  const setNickname = useCallback(
    (nickname: string) => {
      setInfo?.({ id: socket.id, nickname: nickname })
      form.setValue('nickname', nickname)
    },
    [setInfo, socket.id],
  )
  const onSubmit = (data: UserSettingParams) => {
    // TYPE_ALIAS : data => client.data
    socket.emit('USER_SETTING', data, (data: UserSettingParams) => {
      setNickname(data.nickname)
      open && setOpen(false)
    })
  }

  useEffect(() => {
    socket.emit(
      'USER_JOIN',
      localStorage.getItem(USER_UNIQUE_KEY),
      // TYPE_ALIAS : user => UserModel
      (user: any) => {
        localStorage.setItem(USER_UNIQUE_KEY, user.id)
        if (user.nickname) {
          setNickname(user.nickname)
        }
      },
    )
  }, [])

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="shadow-none">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Form {...form}>
          <form
            className="flex flex-col space-y-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nickname</FormLabel>
                  <Input className="col-span-3" {...field} />
                  <FormDescription>Set your nickname</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserSetting

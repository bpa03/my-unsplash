import * as React from 'react'
import {screen, renderHook, act} from '@testing-library/react'
import UnauthorizedModalServiceProvider, {useUnauthorizedModal} from '@/features/auth/components/unauthorized-modal'

const wrapper = ({children}: {children: React.ReactNode}) => (
  <UnauthorizedModalServiceProvider>
    {children}
  </UnauthorizedModalServiceProvider>
)

describe('Unauthorized Modal Service', () => {
  test('Should render and open the modal', () => {
    const {result} = renderHook(() => useUnauthorizedModal(), {wrapper})
    act(() => result.current.openModal())
    expect(screen.getByText('The session has expired. Please login')).toBeInTheDocument()
  })
  test('Should execute the callback on open the modal', () => {
    const handleOnOpen = jest.fn()
    const {result} = renderHook(() => useUnauthorizedModal(), {wrapper})
    act(() => result.current.openModal(handleOnOpen))
    expect(handleOnOpen).toHaveBeenCalledTimes(1)
  })
})

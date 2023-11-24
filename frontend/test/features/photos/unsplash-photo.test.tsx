import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UnsplashPhoto from '@/features/photos/components/unsplash-photo'
import {ChakraUiProvider} from '@/providers/chakra-ui'

export const wrapper = ({children}: {children: React.ReactNode}) => (
  <ChakraUiProvider>
    {children}
  </ChakraUiProvider>
)

const defaultProps = {
  src: 'https://images.unsplash.com/photo-1700451761281-fa705b64935d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjQ4Nzh8MHwxfGFsbHwyfHx8fHx8Mnx8MTcwMDc3MDg1MHw&ixlib=rb-4.0.3&q=80&w=1080',
  alt: 'unsplash-image.jpg',
  isDownloading: false,
  onDownload: () => {},
  onOpenSaveModal: () => {},
  userIsLogged: false
}

describe('Save Photo Form component', () => {
  test('Should render Unsplash photo component', async () => {
    render(<UnsplashPhoto {...defaultProps} />, {wrapper})
    expect(screen.getByRole('figure')).toBeInTheDocument()
    expect(screen.getByText(/loading.../i)).toBeInTheDocument()

    const image: HTMLImageElement = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    expect(image.alt).toBe(defaultProps.alt)
  })
  test('Not should render save button if user is not logged', () => {
    render(<UnsplashPhoto {...defaultProps} />, {wrapper})

    const saveButton = screen.queryByRole('button', {name: /save photo/i})
    expect(saveButton).not.toBeInTheDocument()
  })
  test('Should render save button if user is logged', () => {
    render(<UnsplashPhoto {...defaultProps} userIsLogged />, {wrapper})
    expect(screen.getByRole('button', {name: /save photo/i})).toBeInTheDocument()
  })
  test('Should call onOpenSaveModal UI event', async () => {
    const handleOpenSaveModal = jest.fn()
    render(<UnsplashPhoto {...defaultProps} onOpenSaveModal={handleOpenSaveModal} userIsLogged/>, {wrapper})

    await userEvent.click(screen.getByRole('button', {name: /save photo/i}))
    expect(handleOpenSaveModal).toHaveBeenCalledTimes(1)
  })
  test('Should call onDownload UI event', async () => {
    const handleDownload = jest.fn()
    render(<UnsplashPhoto {...defaultProps} onDownload={handleDownload} />, {wrapper})

    await userEvent.click(screen.getByRole('button', {name: /download photo/i}))
    expect(handleDownload).toHaveBeenCalledTimes(1)
  })
  test('download button should be disabled if the isDownloading prop is true', () => {
    render(<UnsplashPhoto {...defaultProps} isDownloading />, {wrapper})
    expect(screen.getByRole('button', {name: /download photo/i})).toHaveAttribute('aria-disabled', 'true')
  })
})

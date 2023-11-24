import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProfilePhoto from '@/features/photos/components/profile-photo'
import {ChakraUiProvider} from '@/providers/chakra-ui'

export const wrapper = ({children}: {children: React.ReactNode}) => (
  <ChakraUiProvider>
    {children}
  </ChakraUiProvider>
)

const defaultProps = {
  imageUrl: 'https://images.unsplash.com/photo-1700451761281-fa705b64935d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjQ4Nzh8MHwxfGFsbHwyfHx8fHx8Mnx8MTcwMDc3MDg1MHw&ixlib=rb-4.0.3&q=80&w=1080',
  alt: 'unsplash-image.jpg',
  description: 'This is my super description',
  onRemove: () => {},
  isRemoving: false
}

describe('Profile Photo Card component', () => {
  test('Should render profile photo card component', () => {
    render(<ProfilePhoto {...defaultProps} />, {wrapper})
    expect(screen.getByRole('figure')).toBeInTheDocument()
    expect(screen.getByText(/loading.../i)).toBeInTheDocument()

    const image: HTMLImageElement = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    expect(image.alt).toBe(defaultProps.alt)
    expect(screen.getByRole('button', {name: /remove photo/i})).toBeInTheDocument()
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument()
  })
  test('Remove button should be disabled if isRemoving prop is true', async () => {
    const handleRemove = jest.fn()
    render(<ProfilePhoto {...defaultProps} onRemove={handleRemove} isRemoving />, {wrapper})
    const removeButton = screen.getByRole('button', {name: /remove photo/i})

    await userEvent.click(removeButton)
    expect(removeButton).toHaveAttribute('aria-disabled', 'true')
    expect(handleRemove).toHaveBeenCalledTimes(0)
  })
  test('Should call onRemove UI event', async () => {
    const handleRemove = jest.fn()
    render(<ProfilePhoto {...defaultProps} onRemove={handleRemove} />, {wrapper})
    const removeButton = screen.getByRole('button', {name: /remove photo/i})

    await userEvent.click(removeButton)
    expect(handleRemove).toHaveBeenCalledTimes(1)
  })
})

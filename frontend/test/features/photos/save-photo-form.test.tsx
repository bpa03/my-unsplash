import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SavePhotoForm from '@/features/photos/components/save-photo-form'

const defaultProps = {
  loading: false,
  onSubmit: () => {},
  imageUrl: 'http://unsplash.api/image/12345'
}

describe('Save Photo Form component', () => {
  test('Should render form', () => {
    render(<SavePhotoForm {...defaultProps} />)
    
    const descriptionInput = screen.getByLabelText('Description')
    expect(descriptionInput).toBeInTheDocument()
    
    const UrlInput: HTMLInputElement = screen.getByLabelText('URL')
    expect(UrlInput).toBeInTheDocument()
    expect(UrlInput).toHaveAttribute('aria-disabled', 'true')
    expect(UrlInput.value).toBe(defaultProps.imageUrl)

    const submitButton = screen.getByRole('button', {name: /save/i})
    expect(submitButton).toBeInTheDocument()
  })
  test('Should validate inputs and show error validations messages', async () => {
    render(<SavePhotoForm {...defaultProps} />)

    const submitButton = screen.getByRole('button', {name: /save/i})
    await userEvent.click(submitButton)

    expect(screen.getByText(/description is required/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Description')).toHaveAttribute('aria-invalid', 'true')
  })
  test('Submit button should be disabled if the load is pending', () => {
    render(<SavePhotoForm {...defaultProps} loading />)

    const submitButton = screen.getByRole('button', {name: /save/i})
    expect(submitButton).toHaveAttribute('aria-disabled', 'true')
  })
  test('onSubmit callback event should be called', async () => {
    const handleSubmit = jest.fn()
    const descriptionValue = 'super description of my photo'

    render(<SavePhotoForm {...defaultProps} onSubmit={handleSubmit} />)
    await userEvent.type(screen.getByLabelText('Description'), descriptionValue)
    await userEvent.click(screen.getByRole('button', {name: /save/i}))

    expect(handleSubmit).toHaveBeenCalledTimes(1)
    expect(handleSubmit).toHaveBeenCalledWith({description: descriptionValue, imageUrl: defaultProps.imageUrl})
  })
})

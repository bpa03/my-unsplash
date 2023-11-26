import {setupWorker} from 'msw/browser'
import {unsplashHandlers} from './unsplash'
import {apiHandlers} from './api'

export const worker = setupWorker(...unsplashHandlers, ...apiHandlers)

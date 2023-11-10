import {ListOfImages} from './list-of-images'
import {imagesRepository} from '../repositories'

export const listOfImages = new ListOfImages(imagesRepository)

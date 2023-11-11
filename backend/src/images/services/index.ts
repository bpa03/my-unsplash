import {ListOfImages} from './list-of-images'
import {SaveImage} from './save-image'
import {imagesRepository} from '../repositories'

export const listOfImages = new ListOfImages(imagesRepository)
export const saveImage = new SaveImage(imagesRepository)

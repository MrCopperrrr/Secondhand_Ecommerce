import databaseService from './database.services.js'

class CategoryService {
  async getAllCategories() {
    const categories = await databaseService.categories.find().toArray()
    return categories
  }

  async getAllSubCategories() {
    const subCategories = await databaseService.subCategories.find().toArray()
    return subCategories
  }
}

const categoryService = new CategoryService()
export default categoryService

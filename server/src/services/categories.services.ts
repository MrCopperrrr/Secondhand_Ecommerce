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

  async getCategoryTree() {
    const categories = await databaseService.categories.aggregate([
      {
        $lookup: {
          from: 'sub_categories',
          localField: '_id',
          foreignField: 'parent_id',
          as: 'subs'
        }
      }
    ]).toArray();
    return categories;
  }
}

const categoryService = new CategoryService()
export default categoryService

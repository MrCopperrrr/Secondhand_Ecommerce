import { Request, Response } from 'express'
import categoryService from '../services/categories.services.js'

export const getCategoriesController = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories()
    res.status(200).json({ categories })
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi lấy danh mục' })
  }
}

export const getSubCategoriesController = async (req: Request, res: Response) => {
  try {
    const subCategories = await categoryService.getAllSubCategories()
    res.status(200).json({ sub_categories: subCategories })
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi lấy sub-categories' })
  }
}

export const getCategoryTreeController = async (req: Request, res: Response) => {
  try {
    const tree = await categoryService.getCategoryTree()
    res.status(200).json({ categories: tree })
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi lấy cây danh mục' })
  }
}

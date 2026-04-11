import { Request, Response } from 'express'
import commonService from '../services/common.services.js'

export const getProvincesController = async (req: Request, res: Response) => {
  try {
    const result = await commonService.getProvinces()
    return res.json({
      message: 'Lấy danh sách tỉnh thành thành công',
      result
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Lỗi khi lấy danh sách tỉnh thành',
      error
    })
  }
}
export const getFilterOptionsController = async (req: Request, res: Response) => {
  try {
    const result = await commonService.getFilterOptions()
    return res.json({
      message: 'Lấy danh sách khu vực thành công',
      result
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Lỗi khi lấy danh sách khu vực',
      error
    })
  }
}

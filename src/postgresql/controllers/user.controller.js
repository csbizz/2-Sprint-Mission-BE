import { TypeError } from '../../error.js';

export class UserController {
  constructor(userService) {
    this.service = userService;
  }

  getUsersDev = async (req, res) => {
    const orderBy = req.query.orderBy || 'recent';
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const keyword = req.query.keyword || '';

    if (isNaN(page) || isNaN(pageSize)) {
      throw new TypeError('page and pageSize should be an integer');
    }

    const resBody = await this.service.getUsersAndCount({
      orderBy,
      page,
      pageSize,
      keyword,
    });

    res.json(resBody);
  };
}

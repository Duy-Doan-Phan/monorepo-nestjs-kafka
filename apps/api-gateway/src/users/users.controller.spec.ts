import { UsersController } from './users.controller'
import { UsersService } from './users.service'

describe('UsersController', () => {
  let usersController: UsersController
  let usersService: UsersService

  beforeEach(() => {
    // usersService = new UsersService()
    usersController = new UsersController(usersService)
  })

  describe('getAll', () => {
    it('should return an array of users', async () => {
      const result = ['test']
      // jest.spyOn(usersService, 'findAll').mockImplementation(() => result)

      expect(usersController.getAll()).toBe(result)
    })
  })
})

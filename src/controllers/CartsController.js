
class CartsController {
    async index(req, res){
        return res.status(200).json({ foo: 'bar'})
    }
}

export default new CartsController()
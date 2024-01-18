import { Router, Request, Response} from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send({message: 'Router'});
  });

router.post('/login', (req: Request, res: Response) => {
    res.send({message: 'Login'});
  });

router.post('/register', (req: Request, res: Response) => {
    res.send({message: 'Register'});
  });
router.delete('/delete/:id', (req: Request, res: Response) => {
    res.send({message: 'Delete'});
  });
module.exports = router;
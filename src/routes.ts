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

router.patch('/password/:id', (req: Request, res: Response) => {
    res.send({message: 'Password'});
});

router.patch('/email/:id', (req: Request, res: Response) => {
    res.send({message: 'Email'});
});
    
module.exports = router;
```typescript
import { Router } from 'express';
import ReservationsController from '../controllers/reservations.controller';

const router = Router();
const reservationsController = new ReservationsController();

router.post('/', reservationsController.create);
router.get('/', reservationsController.getAll);
router.get('/:id', reservationsController.getById);
router.patch('/:id', reservationsController.update);
router.delete('/:id', reservationsController.delete);

export default router;

```
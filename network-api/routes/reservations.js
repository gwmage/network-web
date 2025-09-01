```typescript
import { Router } from 'express';
import ReservationsController from '../controllers/reservations.controller';
import { celebrate, Joi } from 'celebrate';

const router = Router();
const reservationsController = new ReservationsController();

// ... other routes

router.delete(
  '/:id',
  celebrate({
    params: Joi.object({
      id: Joi.string().required(),
    }),
    body: Joi.object({
      cancellationReason: Joi.string().optional(),
    }),
  }),
  reservationsController.cancel
);

export default router;

```
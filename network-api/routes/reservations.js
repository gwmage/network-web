```typescript
import { Router } from 'express';
import ReservationsController from '../controllers/reservations.controller';
import { celebrate, Joi } from 'celebrate';

const router = Router();
const reservationsController = new ReservationsController();

// ... (Existing routes)

router.delete(
  '/:id',
  celebrate({
    params: Joi.object({
      id: Joi.string().required(),
    }),
    body: Joi.object({
      reason: Joi.string().allow(''), // Allow optional reason
    }).unknown(true), // Allow other unknown properties for future extensibility
  }),
  reservationsController.cancel
);


export default router;

```
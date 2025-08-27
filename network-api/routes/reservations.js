```typescript
import { Router } from 'express';
import ReservationsController from '../controllers/reservations.controller';
import { celebrate, Joi } from 'celebrate';

const router = Router();
const reservationsController = new ReservationsController();

router.post(
  '/',
  celebrate({
    body: Joi.object({
      restaurantId: Joi.string().required(),
      userId: Joi.string().required(),
      reservationTime: Joi.date().required(),
      numberOfGuests: Joi.number().integer().min(1).required(),
      // ... other fields as needed
    }),
  }),
  reservationsController.create
);

router.get('/', reservationsController.getAll);

router.get(
  '/:id',
  celebrate({
    params: Joi.object({
      id: Joi.string().required(),
    }),
  }),
  reservationsController.getById
);

router.patch(
  '/:id',
  celebrate({
    params: Joi.object({
      id: Joi.string().required(),
    }),
    body: Joi.object({
      // ... fields that can be updated
      restaurantId: Joi.string(),
      reservationTime: Joi.date(),
      numberOfGuests: Joi.number().integer().min(1),
    }),
  }),
  reservationsController.update
);


router.delete(
  '/:id',
  celebrate({
    params: Joi.object({
      id: Joi.string().required(),
    }),
  }),
  reservationsController.delete
);

export default router;

```
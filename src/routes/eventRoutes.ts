import { Router } from 'express';
import {
  listEvents,
  viewEvent,
  addEvent,
  createEvent,
  editEvent,
  updateEvent,
  deleteEvent
} from '../controllers/eventController';

const router = Router();

router.get('/', listEvents);
router.get('/event/:id', viewEvent);
router.get('/add-event', addEvent);
router.post('/add-event', createEvent);
router.get('/edit-event/:id', editEvent);
router.post('/edit-event/:id', updateEvent);
router.post('/delete-event/:id', deleteEvent);

export default router;

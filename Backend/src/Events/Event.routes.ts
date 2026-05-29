import { Router } from "express";
import EventController from "./Event.controller";

const router = Router();

router.get("/", EventController.getEvents);
router.get("/:eventId", EventController.getEventById);
router.patch("/", EventController.createEvent);
router.put("/event/:eventId", EventController.editEvent);
router.delete("/event/:eventId", EventController.deleteEvent);

export default router;
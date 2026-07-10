import { Router } from "express";
import EventController from "./Event.controller";

const router = Router();

router.get("/", EventController.getEvents);
router.get("/user", EventController.getEventsByUser);
router.get("/:eventId", EventController.getEventById);
router.post("/", EventController.createEvent);
router.patch("/event/:eventId", EventController.editEvent);
router.delete("/event/:eventId", EventController.deleteEvent);

export default router;
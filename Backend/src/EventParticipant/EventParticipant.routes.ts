import { Router } from "express";
import EventParticipantController from "./EventParticipant.controller";

const router = Router();

router.post("/event/:eventId", EventParticipantController.joinEvent);
router.delete("/event/:eventId", EventParticipantController.leaveEvent);

export default router;
import { checkUserAccess } from "../../middlewares/checkUserAccess";
import {
  loginUser,
} from "../../controllers/auth";
import { Router, RequestHandler } from "express";
import { getTimeEntryCompletion } from "../../controllers/ai-complete";

const router = Router();
//post api's
router.get("/ai-complete/time-entry", getTimeEntryCompletion as RequestHandler);



export default router;

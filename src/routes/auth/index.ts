import { checkUserAccess } from "../../middlewares/checkUserAccess";
import {
  loginUser,
} from "../../controllers/auth";
import { Router, RequestHandler } from "express";

const router = Router();
//post api's
router.post("/login", loginUser as RequestHandler);



export default router;

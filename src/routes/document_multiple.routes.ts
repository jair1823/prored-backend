import { Router } from "express";
import Photos_Controller from "../controllers/documentsControllers/photos.controller";
import uploadMultiple from "../lib/saveFileMultiple";

const router = Router();

router.post("/photo", uploadMultiple, Photos_Controller.insertPhotos);

export default router;
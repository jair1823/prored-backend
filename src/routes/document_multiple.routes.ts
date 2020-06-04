import { Router } from "express";
import Photos_Controller from "../controllers/documentsControllers/photos.controller";
import uploadMultiple from "../lib/saveFileMultiple";

const router = Router();

router.post("/photo", uploadMultiple, Photos_Controller.insertPhotos);
router.delete("/photo/:id", Photos_Controller.deletePhoto);
router.get("/photo/:id", Photos_Controller.getPhoto);
router.get("/photo/activity/:id", Photos_Controller.getPhotosActivity);

export default router;
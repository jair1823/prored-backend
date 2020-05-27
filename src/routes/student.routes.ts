import { Router } from 'express';
import Student_Controller from '../controllers/student.controller'
import upload from "../lib/saveFile";

const router = Router();

router.get('/student', Student_Controller.getStudents);
router.get('/student/:dni', Student_Controller.getStudentByDni);

router.get('/student_all', Student_Controller.getStudentsAll);
router.get('/student_all/:dni', Student_Controller.getStudentByDniAll);

router.get('/student_basic', Student_Controller.getStudentsBasic);

router.post('/student', Student_Controller.createStudent);
router.put('/student/:dni', Student_Controller.updateStudent);

router.put('/student/:dni/disable', Student_Controller.disableStudent);
router.put('/student/:dni/enable', Student_Controller.enableStudent);

router.get('/student/profile/:profile', Student_Controller.getstudentbyprofile);
router.get('/student/:dni/status', Student_Controller.getStudentStatus);

router.post('/studentcv/', upload, Student_Controller.insertCV);
router.put('/studentcv/', upload, Student_Controller.updateCV);
router.delete('/studentcv/:dni', Student_Controller.deleteCV);
router.get('/studentcv/:dni', Student_Controller.getStudentCV);

router.put('/student/:dni/careers', Student_Controller.updateCareersForStudent);
router.put('/student/:dni/languages', Student_Controller.updateLanguagesForStudent);
router.put('/student/:dni/networks', Student_Controller.updateNetworksForStudent);
router.put('/student/:dni/associated_careers', Student_Controller.updateAssoCareersForStudent);

export default router;


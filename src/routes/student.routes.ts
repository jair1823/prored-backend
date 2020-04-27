import { Router } from 'express';
import Student_Controller from '../controllers/student.controller'

const router = Router();

router.get('/student', Student_Controller.getStudents);
router.get('/student/:dni', Student_Controller.getStudentByDni);

router.get('/student_all', Student_Controller.getStudentsAll);
router.get('/student_all/:dni', Student_Controller.getStudentByDniAll);

router.post('/student', Student_Controller.createStudent);
router.put('/student/:dni', Student_Controller.updateStudent);

router.put('/student/:dni/disable', Student_Controller.disableStudent);
router.put('/student/:dni/enable', Student_Controller.enableStudent);

router.post('/student/:dni/career', Student_Controller.addCareer);
router.delete('/student/:dni/career', Student_Controller.removeCareer);

router.post('/student/:dni/language', Student_Controller.addLanguage);
router.delete('/student/:dni/language', Student_Controller.removeLanguage);

router.post('/student/:dni/network', Student_Controller.addNetwork);
router.delete('/student/:dni/network', Student_Controller.removeNetwork);

router.post('/student/:dni/associated_career', Student_Controller.addAssociatedCareer);
router.delete('/student/:dni/associated_career', Student_Controller.removeAssociatedCareer);

router.get('/student/profile/:profile', Student_Controller.getstudentbyprofile);
router.get('/student/:dni/status', Student_Controller.getStudentStatus);
export default router;


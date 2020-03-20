import { Router } from 'express';
import {
    getStudents,
    getStudentByDni,
    createStudent,
    addCareer,
    removeCareer,
    addLanguage,
    removeLanguage,
    addNetwork,
    removeNetwork,
    addAssociatedCareer,
    removeAssociatedCareer,
    updateStudent,
    disableStudent,
    enableStudent,
    getstudentbyprofile,
    getStudentByDniAll,
    getStudentsAll,
    getStudentStatus
} from '../controllers/student.controller';
const router = Router();

router.get('/student', getStudents);
router.get('/student/:dni', getStudentByDni);

router.get('/student_all', getStudentsAll);
router.get('/student_all/:dni', getStudentByDniAll);

router.post('/student', createStudent);
router.put('/student/:dni', updateStudent);

router.put('/student/:dni/disable', disableStudent);
router.put('/student/:dni/enable', enableStudent);

router.post('/student/:dni/career', addCareer);
router.delete('/student/:dni/career', removeCareer);

router.post('/student/:dni/language', addLanguage);
router.delete('/student/:dni/language', removeLanguage);

router.post('/student/:dni/network', addNetwork);
router.delete('/student/:dni/network', removeNetwork);

router.post('/student/:dni/associated_career', addAssociatedCareer);
router.delete('/student/:dni/associated_career', removeAssociatedCareer);

router.get('/student/profile/:profile', getstudentbyprofile);
router.get('/student/:dni/status', getStudentStatus);
export default router;
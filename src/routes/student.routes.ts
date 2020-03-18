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
    enableStudent
} from '../controllers/student.controller';
const router = Router();

router.get('/student', getStudents);
router.get('/student/:dni', getStudentByDni);
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
export default router;
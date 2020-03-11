import { Router } from 'express'
import { getStudents, getStudentByDni, createStudent } from '../controllers/student.controller'
const router = Router();

router.get('/student', getStudents);
router.get('/student/:dni', getStudentByDni);
router.post('/student', createStudent);

export default router;
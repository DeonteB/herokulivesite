import express from 'express';
const router = express.Router();

// import controller instance
import { DisplayLoginPage, DisplayRegisterPage, ProcessLoginPage, ProcessLogoutPage, ProcessRegisterPage} from '../Controllers/auth';

/*              AUTHENTICATION ROUTES              */
/* GET login page. */

router.get('/login', DisplayLoginPage);

router.post('/login', ProcessLoginPage);
/* GET registers page. */
router.get('/register', DisplayRegisterPage);
/* process the registers request. */
router.post('/register',  ProcessRegisterPage);
/* process the logout request. */
router.get('/logout', ProcessLogoutPage);

/* tempary*/
/********************************             */


/* */
export default router;

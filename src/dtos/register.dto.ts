/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterBody:
 *       type: object
 *       required:
 *         - name
 *         - surname
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: John
 *         surname:
 *           type: string
 *           example: Doe
 *         middlename:
 *           type: string
 *           example: Smith
 *         email:
 *           type: string
 *           example: john.doe@example.com
 *         username:
 *           type: string
 *           example: johndoe
 *         password:
 *           type: string
 *           example: secret
 */
export interface RegisterBody {
  name: string;
  surname: string;
  middlename?: string;
  email: string;
  username?: string;
  password: string;
}